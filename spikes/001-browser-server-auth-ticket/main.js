'use strict';

const http = require('http');
const { WebSocket, WebSocketServer } = require('ws');

const PORT = 3199;
let validTicket = null;

const server = http.createServer((req, res) => {
  if (req.url === '/api/ticket' && req.method === 'POST') {
    const sessionId = require('crypto').randomUUID();
    validTicket = require('crypto').randomUUID();
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ sessionId, ticket: validTicket }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ server });

function send(ws, msg) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
}

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedSessionId = url.searchParams.get('session');
  const ticket = url.searchParams.get('ticket');

  if (!ticket || ticket !== validTicket) {
    send(ws, { type: 'error', message: 'Unauthorized' });
    ws.close(4401, 'Unauthorized');
    return;
  }

  send(ws, { type: 'ready', sessionId: requestedSessionId || 'new' });
  ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.type === 'ping') send(ws, { type: 'pong', ts: Date.now() });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`SPIKE 001 listening on http://127.0.0.1:${PORT}`);
});
