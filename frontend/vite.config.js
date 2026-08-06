/**
 * vite.config.js
 *
 * Dashboard dev server — single-port architecture via backend on port 8642.
 *
 * /v1/* → http://127.0.0.1:8642  (LLM proxy)
 * /api/* → http://127.0.0.1:8642  (backend API + desktop agent proxy)
 * /oauth/* → http://127.0.0.1:8642 (Google OAuth)
 * /desktop/* → http://127.0.0.1:8642 (VNC proxy + MJPEG stream)
 * /kasm/* → http://127.0.0.1:8642  (legacy KasmVNC proxy)
 * LLM proxy stays on Render: https://server-llm-1.onrender.com
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
    port: Number(process.env.FRONTEND_PORT) || 8001,
    proxy: (() => {
      const backend = process.env.BACKEND_URL || 'http://127.0.0.1:8642';
      const p = {};
      for (const route of ['/v1', '/api', '/oauth']) p[route] = { target: backend, changeOrigin: true };
      for (const route of ['/desktop', '/kasm']) p[route] = { target: backend, changeOrigin: true, ws: true };
      return p;
    })(),
    headers: {
      'Content-Security-Policy': "default-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com blob:; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: http://localhost:* http://127.0.0.1:* https://localhost:*; media-src 'self' blob:; connect-src 'self' blob: ws://localhost:* wss://localhost:* https://cdn.jsdelivr.net https://accounts.google.com https://oauth2.googleapis.com; frame-src 'self' blob:; form-action 'self' https://accounts.google.com;",
    },
  },
};
