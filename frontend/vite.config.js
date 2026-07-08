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

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default {
  root: '.',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    port: 8000,
    proxy: {
      // Route /v1 to cloud LLM proxy (Render)
      '/v1': {
        target: 'https://server-llm-1.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      // Route /api to cloud backend (Render)
      '/api': {
        target: 'https://backend-server-6ghr.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      // Route /oauth to cloud backend (Render)
      '/oauth': {
        target: 'https://backend-server-6ghr.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      // Route /agent to local Desktop Agent (Computer mode)
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
      // Proxy Sandbox (port 8080) — browser API + VNC + screenshots
      '/sandbox': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/sandbox/, '') || '/',
      },
      // Direct VNC WebSocket proxy for live streaming
      '/vncws': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => '/websockify',
      },
    },
    headers: {
      'Content-Security-Policy': "default-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com blob:; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: http://localhost:* http://127.0.0.1:* https://localhost:* https://*.hf.space; media-src 'self' blob: https://*.hf.space; connect-src 'self' http://localhost:* http://127.0.0.1:* https://localhost:* ws://localhost:* wss://localhost:* wss://*.localhost:* https://cdn.jsdelivr.net https://accounts.google.com https://oauth2.googleapis.com https://*.hf.space; frame-src 'self' blob: https://localhost:* http://localhost:* https://*.hf.space; form-action 'self' https://accounts.google.com;",
    },
  },
};

