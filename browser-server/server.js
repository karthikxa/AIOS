const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');
const http = require('http');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const DEFAULT_MAX_SESSIONS = 1;
const DEFAULT_RECONNECT_GRACE_MS = 2 * 60 * 1000;
const DEFAULT_MAX_IDLE_MS = 60 * 60 * 1000;
const DEFAULT_HEARTBEAT_MS = 30 * 1000;

// HMAC secret for session tickets. In production, set BROWSER_SERVER_SECRET.
// If not set, a random secret is generated at startup (resets on restart).
const HMAC_SECRET = process.env.BROWSER_SERVER_SECRET || crypto.randomBytes(32).toString('hex');

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function signTicket(sessionId, createdAt) {
  const payload = `${sessionId}|${createdAt}`;
  return crypto.createHmac('sha256', HMAC_SECRET).update(payload).digest('hex');
}

function verifyTicket(sessionId, createdAt, ticket) {
  const expected = signTicket(sessionId, createdAt);
  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(ticket, 'hex'));
  } catch {
    return false;
  }
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
  app.use(express.json());
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });
  const sessions = new Map();

  function createSession() {
    const now = Date.now();
    const id = uuidv4();
    return {
      id,
      ticket: signTicket(id, now),
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

  // ── HTTP routes ───────────────────────────────────────────────────────

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

  // GET /session/:id — returns session info WITHOUT the ticket (safe for querying)
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

  // POST /session — creates a new session and returns the HMAC ticket.
  // The ticket MUST be provided when connecting via WebSocket.
  app.post('/session', (req, res) => {
    if (sessions.size >= maxSessions) {
      return res.status(503).json({ error: 'Server at capacity' });
    }
    const session = createSession();
    sessions.set(session.id, session);
    console.log(`[Session] Created: ${session.id}`);
    return res.json({
      sessionId: session.id,
      ticket: session.ticket,
      status: session.status,
    });
  });

  // ── WebSocket handler ─────────────────────────────────────────────────

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
    const ticket = url.searchParams.get('ticket');
    let session = requestedSessionId ? sessions.get(requestedSessionId) : null;

    if (requestedSessionId && !session) {
      send(ws, { type: 'error', code: 'session_not_found', message: 'Session not found or expired' });
      ws.close(4404, 'Session not found');
      return;
    }

    // ── Ticket validation ──────────────────────────────────────────────
    if (session) {
      // Attaching to an existing session requires a valid HMAC ticket
      if (!ticket || !verifyTicket(session.id, session.createdAt, ticket)) {
        console.warn(`[WS] Invalid ticket for session ${session.id} — rejecting`);
        send(ws, { type: 'error', code: 'unauthorized', message: 'Invalid or missing session ticket' });
        ws.close(4401, 'Unauthorized');
        return;
      }
    }

    if (!session) {
      if (sessions.size >= maxSessions) {
        send(ws, { type: 'error', code: 'at_capacity', message: 'Server at capacity' });
        ws.close(4429, 'Server at capacity');
        return;
      }
      session = createSession();
      sessions.set(session.id, session);
      // Send the ticket back so the client can reconnect later
      send(ws, { type: 'session_created', sessionId: session.id, ticket: session.ticket });
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
      session.clients.delete(ws);
      session.lastActivityAt = Date.now();
      if (session.clients.size === 0) {
        console.log(`[WS] Session awaiting reattach: ${session.id}`);
        scheduleSessionCleanup(session);
      }
    });
  });

  // ── Timers ───────────────────────────────────────────────────────────

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
    console.log(`Session creation: POST http://localhost:${port}/session`);
  });
}

module.exports = { createBrowserServer };
