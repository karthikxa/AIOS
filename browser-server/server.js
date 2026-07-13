const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const DEFAULT_MAX_SESSIONS = 1;
const DEFAULT_RECONNECT_GRACE_MS = 2 * 60 * 1000;
const DEFAULT_MAX_IDLE_MS = 60 * 60 * 1000;
const DEFAULT_HEARTBEAT_MS = 30 * 1000;

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function createBrowserServer(options = {}) {
  const maxSessions = positiveInteger(options.maxSessions ?? process.env.MAX_SESSIONS, DEFAULT_MAX_SESSIONS);
  const reconnectGraceMs = positiveInteger(
    options.reconnectGraceMs ?? process.env.RECONNECT_GRACE_MS,
    DEFAULT_RECONNECT_GRACE_MS,
  );
  const maxIdleMs = positiveInteger(options.maxIdleMs ?? process.env.MAX_IDLE_MS, DEFAULT_MAX_IDLE_MS);
  const heartbeatMs = positiveInteger(options.heartbeatMs ?? process.env.HEARTBEAT_MS, DEFAULT_HEARTBEAT_MS);

  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });
  const sessions = new Map();

  function createSession() {
    const now = Date.now();
    return {
      id: uuidv4(),
      status: 'initializing',
      currentUrl: 'about:blank',
      createdAt: now,
      lastActivityAt: now,
      clients: new Set(),
      cleanupTimer: null,
    };
  }

  function clearSessionCleanup(session) {
    if (session.cleanupTimer) {
      clearTimeout(session.cleanupTimer);
      session.cleanupTimer = null;
    }
  }

  function removeSession(session, reason) {
    clearSessionCleanup(session);
    if (sessions.delete(session.id)) {
      console.log(`[Session] ${session.id} removed (${reason})`);
    }
  }

  function scheduleSessionCleanup(session) {
    clearSessionCleanup(session);
    session.status = 'reconnecting';
    session.lastActivityAt = Date.now();
    session.cleanupTimer = setTimeout(() => {
      if (session.clients.size === 0) {
        removeSession(session, 'reconnect grace period elapsed');
      }
    }, reconnectGraceMs);
    session.cleanupTimer.unref?.();
  }

  function send(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  function broadcastToSession(session, message, { except } = {}) {
    const data = JSON.stringify(message);
    for (const client of session.clients) {
      if (client !== except && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  }

  function attachClient(session, ws) {
    clearSessionCleanup(session);
    session.clients.add(ws);
    session.status = 'active';
    session.lastActivityAt = Date.now();
    ws.isAlive = true;
  }

  // Health checks intentionally reflect the stream relay's availability.  A
  // disconnected client is not a failed session: it has a grace period to
  // reattach after browser refreshes or a transient network change.
  app.get('/health', (req, res) => {
    let activeSessions = 0;
    let connectedClients = 0;
    for (const session of sessions.values()) {
      if (session.status === 'active') activeSessions += 1;
      connectedClients += session.clients.size;
    }
    res.json({
      status: 'ok',
      activeSessions,
      connectedClients,
      reservedSessions: sessions.size,
      maxSessions,
      uptime: process.uptime(),
    });
  });

  app.get('/session/:id', (req, res) => {
    const session = sessions.get(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    return res.json({
      id: session.id,
      status: session.status,
      url: session.currentUrl,
      createdAt: session.createdAt,
      lastActivityAt: session.lastActivityAt,
      connectedClients: session.clients.size,
    });
  });

  app.post('/session', (req, res) => {
    if (sessions.size >= maxSessions) {
      return res.status(503).json({ error: 'Server at capacity' });
    }
    const session = createSession();
    sessions.set(session.id, session);
    return res.json({ sessionId: session.id, status: session.status });
  });

  async function handleMessage(session, msg, ws) {
    session.lastActivityAt = Date.now();

    switch (msg.type) {
      case 'navigate':
        session.currentUrl = msg.url;
        broadcastToSession(session, { type: 'navigate', url: msg.url });
        break;
      case 'mouse':
        broadcastToSession(session, {
          type: 'mouse', event: msg.event, x: msg.x, y: msg.y, button: msg.button || 0,
        });
        break;
      case 'keyboard':
        broadcastToSession(session, {
          type: 'keyboard', event: msg.event, key: msg.key, code: msg.code, modifiers: msg.modifiers || {},
        });
        break;
      case 'scroll':
        broadcastToSession(session, { type: 'scroll', deltaX: msg.deltaX || 0, deltaY: msg.deltaY || 0 });
        break;
      case 'resize':
        broadcastToSession(session, { type: 'resize', width: msg.width, height: msg.height });
        break;
      case 'screenshot':
        broadcastToSession(session, { type: 'screenshot_request', quality: msg.quality || 80 });
        break;
      case 'frame':
        // A renderer sends frames while viewers receive them.  Never echo a
        // frame back to its source: it doubles work and can stall a slow peer.
        broadcastToSession(session, { type: 'frame', data: msg.data, timestamp: Date.now() }, { except: ws });
        break;
      case 'ping':
        send(ws, { type: 'pong', timestamp: Date.now() });
        break;
      default:
        send(ws, { type: 'error', message: `Unknown message type: ${msg.type}` });
    }
  }

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const requestedSessionId = url.searchParams.get('session');
    let session = requestedSessionId ? sessions.get(requestedSessionId) : null;

    if (requestedSessionId && !session) {
      send(ws, { type: 'error', code: 'session_not_found', message: 'Session not found or expired' });
      ws.close(4404, 'Session not found');
      return;
    }

    if (!session) {
      if (sessions.size >= maxSessions) {
        send(ws, { type: 'error', code: 'at_capacity', message: 'Server at capacity' });
        ws.close(4429, 'Server at capacity');
        return;
      }
      session = createSession();
      sessions.set(session.id, session);
      send(ws, { type: 'session_created', sessionId: session.id });
    }

    console.log(`[WS] Client attached to session: ${session.id}`);
    attachClient(session, ws);
    send(ws, {
      type: 'ready',
      sessionId: session.id,
      status: session.status,
      currentUrl: session.currentUrl,
    });

    ws.on('pong', () => {
      ws.isAlive = true;
      session.lastActivityAt = Date.now();
    });

    ws.on('message', async (data) => {
      try {
        const msg = JSON.parse(data.toString());
        await handleMessage(session, msg, ws);
      } catch (error) {
        console.error('[WS] Message error:', error.message);
        send(ws, { type: 'error', message: error.message });
      }
    });

    ws.on('error', (error) => {
      console.warn(`[WS] Client error for ${session.id}: ${error.message}`);
    });

    ws.on('close', () => {
      // A page refresh commonly opens its replacement socket before this old
      // socket finishes closing.  Only remove this exact socket; do not mark a
      // newly attached client disconnected.
      session.clients.delete(ws);
      session.lastActivityAt = Date.now();
      if (session.clients.size === 0) {
        console.log(`[WS] Session awaiting reattach: ${session.id}`);
        scheduleSessionCleanup(session);
      }
    });
  });

  const heartbeatTimer = setInterval(() => {
    for (const ws of wss.clients) {
      if (ws.isAlive === false) {
        ws.terminate();
        continue;
      }
      ws.isAlive = false;
      ws.ping();
    }
  }, heartbeatMs);
  heartbeatTimer.unref?.();

  const staleSessionTimer = setInterval(() => {
    const now = Date.now();
    for (const session of sessions.values()) {
      if (session.clients.size === 0 && now - session.lastActivityAt > maxIdleMs) {
        removeSession(session, 'maximum idle time elapsed');
      }
    }
  }, Math.min(maxIdleMs, 60 * 1000));
  staleSessionTimer.unref?.();

  function close(callback) {
    clearInterval(heartbeatTimer);
    clearInterval(staleSessionTimer);
    for (const session of sessions.values()) clearSessionCleanup(session);
    wss.close(() => server.close(callback));
  }

  return { app, server, wss, sessions, close };
}

if (require.main === module) {
  const { server } = createBrowserServer();
  const port = process.env.PORT || 3000;
  server.listen(port, '0.0.0.0', () => {
    console.log(`Browser server running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
  });
}

module.exports = { createBrowserServer };
