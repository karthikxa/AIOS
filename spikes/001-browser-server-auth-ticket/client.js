const http = require('http');
const WebSocket = require('ws');

function postTicket() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({});
    const req = http.request({ hostname: '127.0.0.1', port: 3199, path: '/api/ticket', method: 'POST', headers: { 'content-length': Buffer.byteLength(data) } }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run(){
  const ticketObj = await postTicket();
  console.log('TICKET', JSON.stringify(ticketObj));

  const happy = new WebSocket(`ws://127.0.0.1:3199?session=${encodeURIComponent(ticketObj.sessionId)}&ticket=${encodeURIComponent(ticketObj.ticket)}`);
  happy.on('open', () => console.log('HAPPY open'));
  happy.on('message', m => console.log('HAPPY msg', m.toString()));
  happy.on('close', (c,r) => console.log('HAPPY close', c, r.toString()));
  setTimeout(() => happy.close(), 500);

  setTimeout(async () => {
    const fail = new WebSocket('ws://127.0.0.1:3199?session=bad&ticket=bad');
    fail.on('open', () => console.log('FAIL open'));
    fail.on('message', m => console.log('FAIL msg', m.toString()));
    fail.on('close', (c,r) => console.log('FAIL close', c, r.toString()));
    setTimeout(() => fail.close(), 500);
  }, 700);
}
run();
