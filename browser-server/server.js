const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Store active sessions
const sessions = new Map();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    activeSessions: sessions.size,
    maxSessions: 1,
    uptime: process.uptime()
  });
});

// Session info endpoint
app.get('/session/:id', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json({
    id: session.id,
    status: session.status,
    url: session.currentUrl,
    createdAt: session.createdAt
  });
});

// Create new session
app.post('/session', (req, res) => {
  if (sessions.size >= 1) {
    return res.status(503).json({ error: 'Server at capacity' });
  }

  const sessionId = uuidv4();
  sessions.set(sessionId, {
    id: sessionId,
    status: 'initializing',
    currentUrl: 'about:blank',
    createdAt: Date.now(),
    ws: null
  });

  res.json({ sessionId, status: 'initializing' });
});

// WebSocket connection for live streaming
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const sessionId = url.searchParams.get('session');

  console.log(`[WS] Client connected for session: ${sessionId}`);

  let session = sessionId ? sessions.get(sessionId) : null;

  if (!session) {
    // Create new session if none specified
    if (sessions.size >= 1) {
      ws.send(JSON.stringify({ type: 'error', message: 'Server at capacity' }));
      ws.close();
      return;
    }

    const newId = uuidv4();
    session = {
      id: newId,
      status: 'initializing',
      currentUrl: 'about:blank',
      createdAt: Date.now(),
      ws: ws
    };
    sessions.set(newId, session);
    ws.send(JSON.stringify({ type: 'session_created', sessionId: newId }));
  } else {
    session.ws = ws;
  }

  session.status = 'active';

  // Send initial state
  ws.send(JSON.stringify({
    type: 'ready',
    sessionId: session.id,
    status: session.status
  }));

  // Handle messages from client
  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      await handleMessage(session, msg, ws);
    } catch (e) {
      console.error('[WS] Error:', e.message);
      ws.send(JSON.stringify({ type: 'error', message: e.message }));
    }
  });

  // Handle disconnect
  ws.on('close', () => {
    console.log(`[WS] Client disconnected from session: ${session.id}`);
    session.status = 'disconnected';
    session.ws = null;

    // Clean up after 30 seconds
    setTimeout(() => {
      if (session.status === 'disconnected') {
        sessions.delete(session.id);
        console.log(`[WS] Session ${session.id} cleaned up`);
      }
    }, 30000);
  });
});

// Handle incoming messages
async function handleMessage(session, msg, ws) {
  switch (msg.type) {
    case 'navigate':
      session.currentUrl = msg.url;
      broadcastToSession(session, {
        type: 'navigate',
        url: msg.url
      });
      break;

    case 'mouse':
      broadcastToSession(session, {
        type: 'mouse',
        event: msg.event, // down, up, move
        x: msg.x,
        y: msg.y,
        button: msg.button || 0
      });
      break;

    case 'keyboard':
      broadcastToSession(session, {
        type: 'keyboard',
        event: msg.event, // down, up
        key: msg.key,
        code: msg.code,
        modifiers: msg.modifiers || {}
      });
      break;

    case 'scroll':
      broadcastToSession(session, {
        type: 'scroll',
        deltaX: msg.deltaX || 0,
        deltaY: msg.deltaY || 0
      });
      break;

    case 'resize':
      broadcastToSession(session, {
        type: 'resize',
        width: msg.width,
        height: msg.height
      });
      break;

    case 'screenshot':
      // Request a screenshot from the VNC client
      broadcastToSession(session, {
        type: 'screenshot_request',
        quality: msg.quality || 80
      });
      break;

    case 'frame':
      // Frame data from VNC client (forward to web client)
      ws.send(JSON.stringify({
        type: 'frame',
        data: msg.data,
        timestamp: Date.now()
      }));
      break;

    case 'ping':
      ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
      break;
  }
}

// Broadcast message to all clients in a session
function broadcastToSession(session, message) {
  const data = JSON.stringify(message);
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
}

// Clean up stale sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.createdAt > 3600000) { // 1 hour
      sessions.delete(id);
      console.log(`[Cleanup] Session ${id} expired`);
    }
  }
}, 60000);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Browser server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
