const assert = require('node:assert/strict');
const test = require('node:test');
const WebSocket = require('ws');
const { createBrowserServer } = require('./server');

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const messages = [];
    ws.once('error', reject);
    ws.on('message', (data) => messages.push(JSON.parse(data.toString())));
    ws.once('open', () => resolve({ ws, messages }));
  });
}

function waitForMessage(messages, type) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 1_000;
    const poll = () => {
      const message = messages.find((item) => item.type === type);
      if (message) return resolve(message);
      if (Date.now() >= deadline) return reject(new Error(`Timed out waiting for ${type}`));
      setTimeout(poll, 5);
    };
    poll();
  });
}

function waitForCondition(predicate, description) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 1_000;
    const poll = () => {
      if (predicate()) return resolve();
      if (Date.now() >= deadline) return reject(new Error(`Timed out waiting for ${description}`));
      setTimeout(poll, 5);
    };
    poll();
  });
}

test('a replacement WebSocket keeps a session active after the old socket closes', async (t) => {
  const service = createBrowserServer({ reconnectGraceMs: 50, heartbeatMs: 10_000 });
  await new Promise((resolve) => service.server.listen(0, '127.0.0.1', resolve));
  const { port } = service.server.address();
  const baseUrl = `ws://127.0.0.1:${port}`;

  t.after(async () => {
    for (const ws of service.wss.clients) ws.terminate();
    await new Promise((resolve) => service.close(resolve));
  });

  const first = await connect(baseUrl);
  const created = await waitForMessage(first.messages, 'session_created');
  await waitForMessage(first.messages, 'ready');

  const replacement = await connect(`${baseUrl}/?session=${encodeURIComponent(created.sessionId)}`);
  await waitForMessage(replacement.messages, 'ready');
  first.ws.close();
  await new Promise((resolve) => first.ws.once('close', resolve));
  await waitForCondition(
    () => service.sessions.get(created.sessionId)?.clients.size === 1,
    'the server to release the old socket',
  );

  const session = service.sessions.get(created.sessionId);
  assert.equal(session.status, 'active');
  assert.equal(session.clients.size, 1);
  assert.equal(replacement.ws.readyState, WebSocket.OPEN);
});
