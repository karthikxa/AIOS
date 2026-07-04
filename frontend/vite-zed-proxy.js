/**
 * vite-zed-proxy.js
 *
 * Vite plugin: auto-injects the freellmapi unified API key into /v1 proxy
 * requests using Vite's proxyRequest hook (http-proxy level).
 *
 * PERMANENT & KEY-ROTATION-PROOF:
 * - Key is read from the DB on each request (cached 30s)
 * - Works even if the key regenerates — no restart required
 * - No hardcoding anywhere
 */

import { createRequire } from 'module';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = resolve(__dirname, '../freellmapi/server/data/freeapi.db');

let _db = null;
let cachedKey = null;
let cacheExpiry = 0;

function openDb() {
  if (_db) return _db;
  try {
    if (!existsSync(DB_PATH)) return null;
    // Load better-sqlite3 from freellmapi's own node_modules
    const req = createRequire(resolve(__dirname, '../freellmapi/server/package.json'));
    const Database = req('better-sqlite3');
    _db = new Database(DB_PATH, { readonly: true });
    return _db;
  } catch (e) {
    console.warn('[zed-proxy] Cannot open DB:', e.message);
    return null;
  }
}

function getUnifiedKey() {
  const now = Date.now();
  if (cachedKey && now < cacheExpiry) return cachedKey;
  try {
    const db = openDb();
    if (!db) return null;
    const row = db.prepare("SELECT value FROM settings WHERE key = 'unified_api_key'").get();
    if (row?.value) {
      cachedKey = row.value;
      cacheExpiry = now + 30_000;
      console.log('[zed-proxy] Loaded unified API key from DB');
      return cachedKey;
    }
  } catch (e) {
    _db = null; // reset so we retry next call
    console.warn('[zed-proxy] Failed to read key:', e.message);
  }
  return null;
}

export function zedProxyPlugin() {
  return {
    name: 'zed-proxy-auth',
    config() {
      return {
        server: {
          proxy: {
            '/v1': {
              target: 'http://127.0.0.1:3001',
              changeOrigin: true,
              configure(proxy) {
                // Intercept at http-proxy level — this is where headers are set
                // BEFORE the request is forwarded upstream.
                proxy.on('proxyReq', (proxyReq, req) => {
                  const key = getUnifiedKey();
                  if (key) {
                    proxyReq.setHeader('Authorization', `Bearer ${key}`);
                  } else {
                    console.warn('[zed-proxy] No key available — /v1 request will fail auth');
                  }
                });
              },
            },
            '/api': {
              target: 'http://127.0.0.1:3000',
              changeOrigin: true,
            },
          },
        },
      };
    },
  };
}
