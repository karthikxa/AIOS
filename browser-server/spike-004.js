'use strict';
const http = require('http');

const API_KEY = 'test-api-key';
let lastAuthHeader = null;

const server = http.createServer((req, res) => {
  lastAuthHeader = req.headers.authorization || null;
  const auth = req.headers.authorization || '';
  if ((req.url === '/oauth/token' || req.url === '/oauth/debug') && auth !== `Bearer ${API_KEY}`) {
    res.writeHead(403);
    res.end('Unauthorized');
    return;
  }
  if (req.url === '/oauth/google/callback') {
    res.writeHead(200);
    res.end('callback-ok');
    return;
  }
  res.writeHead(200);
  res.end('ok');
});

function request(path, authHeader) {
  return new Promise((resolve, reject) => {
    const headers = {};
    if (authHeader) headers.authorization = authHeader;
    http.get({ hostname: '127.0.0.1', port: 3198, path, headers }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body, authHeader }));
    }).on('error', reject);
  });
}

server.listen(3198, '127.0.0.1', async () => {
  const a = await request('/oauth/token', `Bearer ${API_KEY}`);
  console.log('token-auth', a.status, a.body);
  const b = await request('/oauth/token', null);
  console.log('token-noauth', b.status, b.body);
  const c = await request('/oauth/debug', 'Bearer bad');
  console.log('debug-bad', c.status, c.body);
  const d = await request('/oauth/google/callback', null);
  console.log('callback-public', d.status, d.body);
  server.close();
});
