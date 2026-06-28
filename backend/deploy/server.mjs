import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import crypto from 'crypto';
import Database from 'better-sqlite3';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '.env') });

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const FREELM_PORT = 3001;
const FREELM_DIR = join(__dirname, 'freellmapi', 'server');
const DASHBOARD_DIR = join(__dirname, 'dashboard');

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

function getApiKey() {
  const envKey = process.env.UNIFIED_API_KEY;
  if (envKey) return envKey;
  try {
    const dbPath = join(FREELM_DIR, 'data', 'freeapi.db');
    if (existsSync(dbPath)) {
      const db = new Database(dbPath);
      const row = db.prepare("SELECT value FROM settings WHERE key = 'unified_api_key'").get();
      db.close();
      if (row) return row.value;
    }
  } catch (e) {
    console.warn('[server] Failed to read API key from DB:', e.message);
  }
  console.error('[server] No UNIFIED_API_KEY set in .env or DB. Set UNIFIED_API_KEY in deploy/.env');
  process.exit(1);
}

// ── Start freellmapi ───────────────────────────────────────────────────
console.log('[server] Starting freellmapi on port ' + FREELM_PORT + '...');

const freellmapi = spawn('node', ['dist/index.js'], {
  cwd: FREELM_DIR,
  env: {
    ...process.env,
    PORT: String(FREELM_PORT),
    CLIENT_DIST: '',
    HOST: '127.0.0.1',
    DASHBOARD_ORIGINS: `http://localhost:${PORT}`,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex'),
  },
  stdio: ['pipe', 'pipe', 'pipe'],
});

freellmapi.stdout.on('data', (d) => process.stdout.write(d));
freellmapi.stderr.on('data', (d) => process.stderr.write(d));
freellmapi.on('exit', (code) => {
  console.error(`[server] freellmapi exited with code ${code}. Restarting in 2s...`);
  setTimeout(() => process.exit(1), 2000);
});

process.on('unhandledRejection', (err) => {
  console.error('[server] Unhandled rejection:', err);
});

function waitForFreellmapi(retries = 30) {
  return new Promise((resolve, reject) => {
    const tryConnect = (n) => {
      const probe = spawn('node', ['-e', `
        require('http').get('http://127.0.0.1:${FREELM_PORT}/api/ping', (r) => {
          process.exit(r.statusCode === 200 ? 0 : 1);
        }).on('error', () => process.exit(1));
      `], { stdio: 'ignore' });
      probe.on('exit', (code) => {
        if (code === 0) resolve();
        else if (n <= 0) reject(new Error('freellmapi not ready'));
        else setTimeout(() => tryConnect(n - 1), 1000);
      });
    };
    setTimeout(() => tryConnect(retries), 1000);
  });
}

await waitForFreellmapi();
const API_KEY = getApiKey();
console.log('[server] freellmapi ready');

// ── Express App ─────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Plugin OAuth routes
const { createPluginRouter } = await import('./plugins-oauth.mjs');
const redirectBase = `http://localhost:${PORT}`;
app.use('/api/plugins', createPluginRouter(redirectBase));

// Proxy /v1/* to freellmapi with auth
app.use('/v1', async (req, res) => {
  const targetUrl = `http://127.0.0.1:${FREELM_PORT}${req.originalUrl}`;
  const body = req.method === 'GET' ? undefined : JSON.stringify(req.body);
  try {
    const resp = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body,
    });
    const safeHeaders = ['content-type', 'content-length', 'cache-control', 'connection', 'x-accel-buffering'];
    resp.headers.forEach((v, k) => {
      if (safeHeaders.includes(k.toLowerCase())) res.setHeader(k, v);
    });
    res.status(resp.status);
    if (resp.body) for await (const chunk of resp.body) res.write(chunk);
    res.end();
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// Serve Dashboard static files
app.use(express.static(DASHBOARD_DIR, {
  setHeaders(res, path) {
    const ext = extname(path);
    if (MIME[ext]) res.setHeader('Content-Type', MIME[ext]);
    res.setHeader('Cache-Control', 'no-cache');
  },
}));

// SPA fallback
app.use((req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/v1/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  const fb = join(DASHBOARD_DIR, 'index.html');
  if (existsSync(fb)) {
    res.setHeader('Content-Type', 'text/html');
    res.send(readFileSync(fb));
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  AVDE Platform running at http://0.0.0.0:${PORT}`);
  console.log(`  Dashboard: http://localhost:${PORT}`);
  console.log(`  API:       http://localhost:${PORT}/v1/chat/completions`);
  console.log(`  Plugins:   http://localhost:${PORT}/api/plugins`);
  console.log(`  Token budget: 1.8B per key, resets every 3 days\n`);
});
