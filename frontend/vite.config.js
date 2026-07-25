/**
 * vite.config.js
 *
 * Dashboard dev server — everything LOCAL except LLM proxy (Render).
 *
 * /v1/* → http://127.0.0.1:8642  (local backend — AIAgent with tools, memory, skills)
 * /api/* → http://127.0.0.1:8642  (local backend)
 * /oauth/* → http://127.0.0.1:8642 (local backend — Google OAuth)
 * /agent/* → http://127.0.0.1:8765 (local desktop agent)
 * /kasm/* → http://127.0.0.1:6901  (KasmVNC noVNC)
 * LLM proxy stays on Render: server-llm-1-0r64.onrender.com
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
    port: 8001,
    proxy: {
      // Route /v1 to local backend (AIAgent with tools, memory, skills)
      '/v1': {
        target: 'http://127.0.0.1:8642',
        changeOrigin: true,
      },
      // Route /api to local backend
      '/api': {
        target: 'http://127.0.0.1:8642',
        changeOrigin: true,
      },
      // Route /oauth to local backend
      '/oauth': {
        target: 'http://127.0.0.1:8642',
        changeOrigin: true,
      },
      // Route /agent to local Desktop Agent (Computer mode)
      '/agent': {
        target: 'http://127.0.0.1:8765',
        changeOrigin: true,
      },
      // Proxy KasmVNC (noVNC on port 6901) — no auth, plain HTTP
      '/kasm': {
        target: 'http://127.0.0.1:6901',
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
    },
    headers: {
      'Content-Security-Policy': "default-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com blob:; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: http://localhost:* http://127.0.0.1:* https://localhost:* https://*.hf.space; media-src 'self' blob: https://*.hf.space; connect-src 'self' http://localhost:* http://127.0.0.1:* https://localhost:* ws://localhost:* wss://localhost:* wss://*.localhost:* https://cdn.jsdelivr.net https://accounts.google.com https://oauth2.googleapis.com https://*.hf.space https://*.onrender.com; frame-src 'self' blob: https://localhost:* http://localhost:* https://*.hf.space https://*.onrender.com; form-action 'self' https://accounts.google.com;",
    },
  },
};

