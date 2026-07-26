'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const JOBS = path.join(__dirname, 'jobs.json');
const SECRET = 'spike-secret';

function sign(obj) {
  const payload = `${obj.id}\x00${obj.prompt}\x00${obj.schedule.expr}`;
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
}

function writeJobs(jobs) {
  fs.writeFileSync(JOBS, JSON.stringify({ jobs }, null, 2));
}

function readJobs() {
  return JSON.parse(fs.readFileSync(JOBS, 'utf8')).jobs;
}

function verifyJob(job) {
  const expected = sign(job);
  return job._hmac === expected;
}

try {
  fs.unlinkSync(JOBS);
} catch (_) {}
const jobs = [
  { id: '1', name: 'ok', enabled: true, schedule: { kind: 'cron', expr: '* * * * *' }, prompt: 'hello', _hmac: '' },
];
writeJobs(jobs);

const loaded = readJobs();
const okSign = sign(loaded[0]);
loaded[0]._hmac = okSign;
writeJobs(loaded);

const again = readJobs();
console.log('signed-valid', verifyJob(again[0]));

again[0].prompt = 'tampered';
console.log('tampered-invalid', verifyJob(again[0]));

const unsigned = JSON.parse(fs.readFileSync(JOBS, 'utf8')).jobs;
unsigned[0]._hmac = '';
console.log('unsigned-invalid', verifyJob(unsigned[0]));
