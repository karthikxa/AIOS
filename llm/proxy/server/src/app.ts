import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { keysRouter } from './routes/keys.js';
import { modelsRouter } from './routes/models.js';
import { proxyRouter } from './routes/proxy.js';
import { responsesRouter } from './routes/responses.js';
import { fallbackRouter } from './routes/fallback.js';
import { profilesRouter } from './routes/profiles.js';
import { embeddingsRouter } from './routes/embeddings.js';
import { analyticsRouter } from './routes/analytics.js';
import { healthRouter } from './routes/health.js';
import { settingsRouter } from './routes/settings.js';
import { premiumRouter } from './routes/premium.js';
import { authRouter } from './routes/auth.js';
import { requireAuth } from './middleware/requireAuth.js';
import { createProxyRateLimiter } from './middleware/rateLimit.js';
import { errorHandler } from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_DASHBOARD_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://[::1]:5173',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'http://[::1]:8000',
];

function getAllowedCorsOrigins() {
  const configuredOrigins = (process.env.DASHBOARD_ORIGINS ?? '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  return new Set([...DEFAULT_DASHBOARD_ORIGINS, ...configuredOrigins]);
}

export function createApp() {
  const app = express();
  const allowedCorsOrigins = getAllowedCorsOrigins();

  // Trust one level of proxy (Docker, nginx, etc.) so req.ip reflects the real
  // client IP. Needed for per-IP rate limiting to work behind a reverse proxy.
  // Override via TRUST_PROXY_DEPTH env (e.g., TRUST_PROXY_DEPTH=2).
  // Set TRUST_PROXY_DEPTH=0 to disable (no proxy).
  const rawDepth = process.env.TRUST_PROXY_DEPTH;
  const trustDepth = rawDepth !== undefined ? Number(rawDepth) : 1;
  app.set('trust proxy', Number.isFinite(trustDepth) && trustDepth >= 0 ? trustDepth : 1);

  // CSP intentionally disabled — the SPA bundles inline styles and the OG
  // image is loaded from the same origin; enabling helmet's default CSP
  // breaks the React build's hashed-asset loader. HSTS off because this is
  // a single-user local proxy, served over HTTP on localhost. Both should
  // stay disabled unless someone serves the proxy over HTTPS publicly
  // (which is also not a supported deployment — see README).
  app.use(helmet({ contentSecurityPolicy: false, hsts: false }));
  app.use(cors({
    origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      callback(null, !origin || allowedCorsOrigins.has(origin));
    },
  }));
  // 10mb: code agents (OpenCode, AionUI, Qwen Code) ship very large system
  // prompts + tool schemas + repo context; 1mb cut their sessions off
  // mid-conversation with an opaque 413. (#200)
  app.use(express.json({ limit: '10mb' }));

  // Dashboard auth (#35): /api/auth/{status,setup,login} bootstrap without a
  // session; everything else under /api/* requires a logged-in dashboard user.
  // The /v1 proxy keeps its own unified-API-key auth and is NOT gated here.
  app.use('/api/auth', authRouter);

  // API routes — all admin endpoints sit behind requireAuth.
  app.use('/api/keys', requireAuth, keysRouter);
  app.use('/api/models', requireAuth, modelsRouter);
  app.use('/api/profiles', requireAuth, profilesRouter);
  app.use('/api/fallback', requireAuth, fallbackRouter);
  app.use('/api/embeddings', requireAuth, embeddingsRouter);
  app.use('/api/analytics', requireAuth, analyticsRouter);
  app.use('/api/health', requireAuth, healthRouter);
  app.use('/api/settings', requireAuth, settingsRouter);
  app.use('/api/premium', requireAuth, premiumRouter);

  // OpenAI-compatible proxy. Per-IP rate limiting (#35 item #6) runs first so
  // it throttles unauthenticated brute-force / flood attempts before any
  // routing work. Tune via PROXY_RATE_LIMIT_RPM; 0 disables it.
  app.use('/v1', createProxyRateLimiter());
  app.use('/v1', proxyRouter);
  // OpenAI Responses API shim (Codex CLI requires wire_api="responses"; see #96)
  app.use('/v1', responsesRouter);

  // Health check
  app.get('/api/ping', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Error handler (for API routes)
  app.use(errorHandler);

  // Serve client static files (after API error handler). CLIENT_DIST lets
  // embedders relocate the built dashboard (e.g. the desktop app ships it in
  // extraResources, where the __dirname-relative path can't reach).
  // Guard against CLIENT_DIST="." exposing the entire CWD.
  let clientDist: string;
  const envDist = process.env.CLIENT_DIST;
  if (envDist && envDist.trim()) {
    const resolved = path.resolve(envDist.trim());
    // Only trust the resolved path if it contains index.html (i.e. it's the
    // actual dashboard build output, not the CWD or some other directory).
    clientDist = fs.existsSync(path.join(resolved, 'index.html')) ? resolved : path.resolve(__dirname, '../../client/dist');
    if (clientDist !== resolved) {
      console.warn(`[app] Ignored CLIENT_DIST="${envDist}" — no index.html found in ${resolved}, falling back to default`);
    }
  } else {
    clientDist = path.resolve(__dirname, '../../client/dist');
  }
  app.use(express.static(clientDist));
  // SPA fallback — serve index.html for non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/v1/')) {
      next();
      return;
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });

  return app;
}

/**
 * createLocalApp — a minimal Express app for the loopback-only port (LOCAL_PORT, default 3002).
 *
 * SECURITY MODEL:
 *   This app has NO API-key authentication on /v1 routes. It is ONLY bound
 *   to 127.0.0.1, so only processes running on the same machine can reach it.
 *   External clients (other machines, internet) cannot — the OS rejects their
 *   packets before they even reach Node.
 *
 *   This is the same model used by MySQL's Unix socket, Redis's `bind 127.0.0.1`,
 *   and PostgreSQL's trust auth for localhost.
 *
 *   DO NOT bind this app to 0.0.0.0 or any external interface.
 */
export function createLocalApp() {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false, hsts: false }));
  // Allow all origins — loopback-only binding is the security boundary
  app.use(cors({ origin: true }));
  app.use(express.json({ limit: '10mb' }));

  // Health ping — Dashboard uses this to check local connectivity
  app.get('/api/ping', (_req, res) => {
    res.json({ status: 'ok', mode: 'local', timestamp: new Date().toISOString() });
  });

  // /v1 routes — NO unified-API-key auth, NO per-IP rate limiting
  // Security is provided entirely by binding to 127.0.0.1 only
  app.use('/v1', proxyRouter);
  app.use('/v1', responsesRouter);

  app.use(errorHandler);
  return app;
}
