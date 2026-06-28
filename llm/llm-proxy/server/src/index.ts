import './env.js';
import { createApp, createLocalApp } from './app.js';
import { initDb, getSetting } from './db/index.js';
import { seedFreeProviders } from './db/seedFreeProviders.js';
import { startHealthChecker } from './services/health.js';
import { applyProxyUrl, applyProxyEnabled, applyProxyBypass } from './lib/proxy.js';
import { startCatalogSync } from './services/catalog-sync.js';

const PORT = process.env.PORT ?? 3001;
// Dual-stack ('::') by default so the dashboard is reachable over both IPv4
// and IPv6 (e.g. IPv6-enabled Docker networks — #180). Hosts with IPv6
// disabled fall back to IPv4-only below; HOST overrides the default outright.
const HOST = process.env.HOST ?? '::';

// Local-only port: no authentication required. Bound exclusively to 127.0.0.1
// so only local processes (Dashboard dev server, deploy server) can reach it.
// Set LOCAL_PORT=0 to disable. Default: 3002.
const LOCAL_PORT_RAW = process.env.LOCAL_PORT ?? '3002';
const LOCAL_PORT = LOCAL_PORT_RAW === '0' ? null : Number(LOCAL_PORT_RAW);

async function main() {
  // initDb() runs migrations which calls initEncryptionKey() internally
  const db = initDb();

  // ── Permanent free provider seeding ────────────────────────────────────
  // Pollinations, Kilo, LLM7, OVH seeded on every boot — idempotent.
  // Zed Pro chat works with zero user configuration.
  seedFreeProviders();

  // Load the persisted proxy settings from the DB (env var wins if set).
  // Must happen after initDb so the settings table is ready.
  applyProxyUrl(getSetting('proxy_url') ?? '');
  applyProxyEnabled(getSetting('proxy_enabled') !== '0'); // default: enabled
  applyProxyBypass(getSetting('proxy_bypass') ?? '');

  const app = createApp();

  const onReady = (host: string) => () => {
    const display = host.includes(':') ? `[${host}]` : host;
    console.log(`Server running on http://${display}:${PORT}`);
    console.log(`Proxy endpoint: http://${display}:${PORT}/v1/chat/completions`);
    startHealthChecker();
    startCatalogSync();
  };

  const server = app.listen(Number(PORT), HOST, onReady(HOST));
  server.on('error', (err: NodeJS.ErrnoException) => {
    // The default '::' bind fails where IPv6 is disabled (kernel
    // ipv6.disable=1 and the like) — retry IPv4-only rather than dying.
    // Anything else (EADDRINUSE, an explicit HOST that can't bind) keeps the
    // fail-fast posture documented in main().catch below.
    if (!process.env.HOST && (err.code === 'EAFNOSUPPORT' || err.code === 'EADDRNOTAVAIL')) {
      console.warn('[server] IPv6 unavailable on this host — falling back to 0.0.0.0 (IPv4-only)');
      app.listen(Number(PORT), '0.0.0.0', onReady('0.0.0.0'));
      return;
    }
    console.error('\n[server] Failed to start:\n  ' + (err?.message ?? err) + '\n');
    process.exit(1);
  });

  // ── Local-only port (no auth) ───────────────────────────────────────────
  // Bound exclusively to 127.0.0.1. The Dashboard dev server proxies /v1
  // here so Zed Pro chat works with zero key configuration.
  if (LOCAL_PORT) {
    const localApp = createLocalApp();
    const localServer = localApp.listen(LOCAL_PORT, '127.0.0.1', () => {
      console.log(`Local proxy (no-auth) on http://127.0.0.1:${LOCAL_PORT}/v1/chat/completions`);
    });
    localServer.on('error', (err: NodeJS.ErrnoException) => {
      // Non-fatal — the main server is already running. Warn and continue.
      console.warn(`[server] Local port ${LOCAL_PORT} unavailable: ${err.message}`);
    });
  }
}

main().catch((err) => {
  // A boot failure (e.g. a missing production ENCRYPTION_KEY) must exit
  // non-zero rather than leaving a half-initialized process that never starts
  // listening — that silent state is what surfaces in the client as
  // "Can't reach the server".
  console.error('\n[server] Failed to start:\n  ' + (err?.message ?? err) + '\n');
  process.exit(1);
});
