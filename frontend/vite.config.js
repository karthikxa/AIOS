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
      // Route /agent to Super Agent HITL server (Computer mode: inject instruction, check status)
      '/agent': {
        target: 'http://127.0.0.1:9002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agent/, ''),
      },
    },
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' http://localhost:* http://127.0.0.1:* https://accounts.google.com https://oauth2.googleapis.com; form-action 'self' https://accounts.google.com;",
    },
  },
};
