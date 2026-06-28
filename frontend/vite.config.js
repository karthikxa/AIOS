/**
 * vite.config.js
 *
 * Dashboard dev server — permanently wired to Zed Pro (freellmapi).
 *
 * /v1/* → http://127.0.0.1:3002  (freellmapi local port, no auth required)
 * /api/* → http://127.0.0.1:3000 (deploy server, production only)
 *
 * Port 3002 is freellmapi's loopback-only port. It has no API-key auth
 * because only local processes can reach 127.0.0.1 — OS-level security.
 * No keys, no config, no restarts needed. Permanently connected.
 */

export default {
  root: '.',
  server: {
    port: 8000,
    proxy: {
      // Route /v1 to zed-agent backend (runs AIAgent loop on port 8642)
      '/v1': {
        target: 'http://127.0.0.1:8642',
        changeOrigin: true,
      },
      // Route /api to zed-agent backend (for sessions, skills, status)
      '/api': {
        target: 'http://127.0.0.1:8642',
        changeOrigin: true,
      },
      // Route /oauth to zed-agent backend (Google OAuth connect + callback + status)
      '/oauth': {
        target: 'http://127.0.0.1:8642',
        changeOrigin: true,
      },
      // Route /agent to Desktop Agent (Computer mode: inject instruction, check status)
      '/agent': {
        target: 'http://127.0.0.1:8765',
        changeOrigin: true,
      },
      // Proxy VNC (noVNC on port 6901) — no auth, plain HTTP
      '/kasm': {
        target: 'http://127.0.0.1:6902',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/kasm/, '') || '/',
      },
      // Proxy Windows Desktop API (port 7777) — screenshot + input for AI agent
      '/desktop': {
        target: 'http://127.0.0.1:7777',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/desktop/, ''),
      },
    },
    headers: {
      'Content-Security-Policy': "default-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com blob:; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://localhost:6901 https://localhost:6902 https://localhost:* http://localhost:6902; connect-src 'self' http://localhost:* http://127.0.0.1:* https://localhost:* ws://localhost:* wss://localhost:* https://cdn.jsdelivr.net https://accounts.google.com https://oauth2.googleapis.com; frame-src 'self' blob: https://localhost:* http://localhost:*; form-action 'self' https://accounts.google.com;",
    },
  },
};

