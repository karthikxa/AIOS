/**
 * seed-free-providers.mjs
 * 
 * Seeds freellmapi with all free/keyless providers so Zed Pro chat
 * works immediately with zero configuration.
 * 
 * Providers seeded:
 *   - Pollinations  (anonymous, free, no key needed)
 *   - Kilo Gateway  (anonymous, free, no key needed)
 *   - LLM7          (free public API, no key needed)
 *   - OVH AI        (free tier, no key needed)
 * 
 * Run: node --experimental-sqlite seed-free-providers.mjs
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────────────────────────
const DB_PATH   = resolve(__dirname, '../freellmapi/server/data/freeapi.db');
const ENV_PATH  = resolve(__dirname, '../freellmapi/.env');

// Read ENCRYPTION_KEY from .env
function readEncryptionKey() {
  if (!existsSync(ENV_PATH)) throw new Error('.env not found: ' + ENV_PATH);
  const content = readFileSync(ENV_PATH, 'utf8');
  const match = content.match(/^ENCRYPTION_KEY\s*=\s*([a-fA-F0-9]{64})/m);
  if (!match) throw new Error('ENCRYPTION_KEY not found in .env — must be 64 hex chars');
  return match[1];
}

function encrypt(text, keyHex) {
  const key = Buffer.from(keyHex, 'hex');
  const iv  = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let enc = cipher.update(text, 'utf8', 'hex');
  enc += cipher.final('hex');
  return {
    encrypted: enc,
    iv:        iv.toString('hex'),
    authTag:   cipher.getAuthTag().toString('hex'),
  };
}

// ── Providers to seed ────────────────────────────────────────────────────────
const FREE_PROVIDERS = [
  { platform: 'pollinations', label: 'Pollinations (free)' },
  { platform: 'kilo',         label: 'Kilo Gateway (free)' },
  { platform: 'llm7',         label: 'LLM7 (free)'         },
  { platform: 'ovh',          label: 'OVH AI (free)'       },
];

// ── Main ─────────────────────────────────────────────────────────────────────
const keyHex = readEncryptionKey();
console.log('✓ Read ENCRYPTION_KEY from .env');

const db = new DatabaseSync(DB_PATH);
let added = 0, skipped = 0;

for (const { platform, label } of FREE_PROVIDERS) {
  // Check if already exists and healthy
  const existing = db.prepare(
    "SELECT id, status FROM api_keys WHERE platform = ? LIMIT 1"
  ).get(platform);

  if (existing) {
    // Re-enable if disabled, reset status to 'unknown' so health checker re-tests
    db.prepare(
      "UPDATE api_keys SET enabled = 1, status = 'unknown', label = ? WHERE id = ?"
    ).run(label, existing.id);
    console.log(`  ↻ ${platform} — already exists, re-enabled (id=${existing.id})`);
    skipped++;
    continue;
  }

  // Keyless providers store a 'no-key' sentinel, encrypted with the current key
  const { encrypted, iv, authTag } = encrypt('no-key', keyHex);
  const result = db.prepare(`
    INSERT INTO api_keys (platform, label, encrypted_key, iv, auth_tag, status, enabled)
    VALUES (?, ?, ?, ?, ?, 'unknown', 1)
  `).run(platform, label, encrypted, iv, authTag);

  console.log(`  ✅ Added ${platform} — "${label}" (id=${result.lastInsertRowid})`);
  added++;
}

db.close();

console.log(`\nDone: ${added} added, ${skipped} updated.`);
console.log('Restart freellmapi (or wait 5 min) for the health checker to verify them.');
console.log('Then refresh http://localhost:8000 — Zed Pro chat will work!\n');
