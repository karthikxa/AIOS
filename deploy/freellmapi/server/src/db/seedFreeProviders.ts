/**
 * seedFreeProviders.ts
 *
 * Auto-seeds all free/keyless providers on every freellmapi boot.
 *
 * This is how Zed Pro chat works with ZERO user configuration:
 *   - Called from index.ts right after initDb() + initEncryptionKey()
 *   - Idempotent: safe to call on every restart (skips already-present entries)
 *   - Providers are permanently available — no dashboard visits, no scripts
 *
 * FREE PROVIDERS (no API key required):
 *   pollinations  — anonymous OpenAI-compatible endpoint (text.pollinations.ai)
 *   kilo          — Kilo Gateway anonymous tier
 *   llm7          — LLM7.io free public API
 *   ovh           — OVH AI Endpoints free tier
 */

import { getDb } from './index.js';
import { encrypt } from '../lib/crypto.js';

const FREE_PLATFORMS = [
  { platform: 'pollinations', label: 'Pollinations (free · no key)' },
  { platform: 'kilo',         label: 'Kilo Gateway (free · no key)' },
  { platform: 'llm7',         label: 'LLM7 (free · no key)'         },
  { platform: 'ovh',          label: 'OVH AI (free · no key)'       },
] as const;

/**
 * Ensure all free/keyless providers have an active entry in api_keys.
 * Called on every server boot — completely idempotent.
 */
export function seedFreeProviders(): void {
  const db = getDb();

  let added = 0;

  for (const { platform, label } of FREE_PLATFORMS) {
    const existing = db.prepare(
      'SELECT id, enabled FROM api_keys WHERE platform = ? LIMIT 1'
    ).get(platform) as { id: number; enabled: number } | undefined;

    if (existing) {
      // Already there — make sure it's enabled (user may have disabled it)
      if (!existing.enabled) {
        db.prepare("UPDATE api_keys SET enabled = 1, status = 'unknown' WHERE id = ?")
          .run(existing.id);
      }
      continue;
    }

    // Insert with 'no-key' sentinel — keyless providers don't use the key
    // value during actual requests (auth header is omitted), but we still
    // encrypt it so the schema stays consistent and the health checker can
    // run validateKey() without special-casing.
    const { encrypted, iv, authTag } = encrypt('no-key');

    db.prepare(`
      INSERT INTO api_keys (platform, label, encrypted_key, iv, auth_tag, status, enabled)
      VALUES (?, ?, ?, ?, ?, 'unknown', 1)
    `).run(platform, label, encrypted, iv, authTag);

    added++;
  }

  if (added > 0) {
    console.log(`[seed] Auto-seeded ${added} free provider(s): ${FREE_PLATFORMS.map(p => p.platform).join(', ')}`);
  } else {
    console.log(`[seed] Free providers ready: ${FREE_PLATFORMS.map(p => p.platform).join(', ')}`);
  }
}
