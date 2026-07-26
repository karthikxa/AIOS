'use strict';
const http = require('http');
const { WebSocket, WebSocketServer } = require('ws');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const TMP = path.join(process.env.TEMP || 'C:\\Users\\balur\\AppData\\Local\\Temp', 'hermes-verify-001.json');
const PORT = 3201;
let validTicket = null;

const server = http.createServer((req, res) => {
  if (req.url === '/api/ticket' && req.method === 'POST') {
    validTicket = crypto.randomUUID();
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ sessionId: crypto.randomUUID(), ticket: validTicket }));
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
  const ticket = url.searchParams.get('ticket');
  if (!ticket || ticket !== validTicket) {
    send(ws, { type: 'error', message: 'Unauthorized' });
    ws.close(4401, 'Unauthorized');
    return;
  }
  send(ws, { type: 'ready', sessionId: url.searchParams.get('session') || 'new' });
});

server.listen(PORT, '127.0.0.1', async () => {
  const results = {};

  const httpGet = (p) => new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port: PORT, path: p }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });

  const ticketRes = await httpGet('/api/ticket');
  let ticketObj = {};
  try { ticketObj = JSON.parse(ticketRes.body || '{}'); } catch (_) {}

  const happy = await new Promise((resolve) => {
    const ws = new WebSocket(`ws://127.0.0.1:${PORT}?session=${encodeURIComponent(ticketObj.sessionId)}&ticket=${encodeURIComponent(ticketObj.ticket)}`);
    ws.on('open', () => resolve({ event: 'open' }));
    ws.on('message', (m) => resolve({ event: 'message', body: JSON.parse(m.toString()) }));
    ws.on('close', (c, r) => resolve({ event: 'close', code: c, reason: r.toString() }));
  });

  const fail = await new Promise((resolve) => {
    const ws = new WebSocket(`ws://127.0.0.1:${PORT}?session=bad&ticket=bad`);
    ws.on('open', () => resolve({ event: 'open' }));
    ws.on('message', (m) => resolve({ event: 'message', body: JSON.parse(m.toString()) }));
    ws.on('close', (c, r) => resolve({ event: 'close', code: c, reason: r.toString() }));
  });

  results.ticket = ticketRes.status === 200 && !!ticketObj.ticket;
  results.happyReady = happy.event === 'message' && happy.body?.type === 'ready';
  results.failUnauthorized = fail.event === 'close' && fail.code === 4401;

  fs.writeFileSync(TMP, JSON.stringify(results, null, 2));
  server.close();
  process.exit(results.ticket && results.happyReady && results.failUnauthorized ? 0 : 1);
});
