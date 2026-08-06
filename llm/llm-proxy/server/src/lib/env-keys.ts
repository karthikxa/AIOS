/**
 * env-keys.ts — load provider API keys from environment variables at startup,
 * and auto-seed keyless sentinel rows for providers that need no API key.
 *
 * Set any of these in Render (or your .env) to override / add a provider key
 * without touching the database or re-deploying:
 *
 *   PROVIDER_GOOGLE_KEY=AIza...
 *   PROVIDER_OPENROUTER_KEY=sk-or-...
 *   PROVIDER_GROQ_KEY=gsk_...
 *   PROVIDER_CEREBRAS_KEY=...
 *   PROVIDER_MISTRAL_KEY=...
 *   PROVIDER_NVIDIA_KEY=...
 *   PROVIDER_COHERE_KEY=...
 *   PROVIDER_CLOUDFLARE_KEY=...
 *   PROVIDER_HUGGINGFACE_KEY=...
 *   PROVIDER_ZHIPU_KEY=...
 *   PROVIDER_GITHUB_KEY=...
 *   PROVIDER_OPENCODE_KEY=...
 *
 * Respects explicit user deletion preferences stored in settings (`deleted_platform_<platform>`).
 * A provider that the user explicitly removed (DELETE from /keys page) will NEVER be re-added
 * automatically, even if it's keyless or has a PROVIDER_*_KEY env var set.
 */

import { getDb } from '../db/index.js';
import { encrypt, decrypt } from '../lib/crypto.js';

export const PLATFORM_ENV_MAP: Record<string, string> = {
  google:      'PROVIDER_GOOGLE_KEY',
  openrouter:  'PROVIDER_OPENROUTER_KEY',
  groq:        'PROVIDER_GROQ_KEY',
  cerebras:    'PROVIDER_CEREBRAS_KEY',
  mistral:     'PROVIDER_MISTRAL_KEY',
  nvidia:      'PROVIDER_NVIDIA_KEY',
  cohere:      'PROVIDER_COHERE_KEY',
  cloudflare:  'PROVIDER_CLOUDFLARE_KEY',
  huggingface: 'PROVIDER_HUGGINGFACE_KEY',
  zhipu:       'PROVIDER_ZHIPU_KEY',
  github:      'PROVIDER_GITHUB_KEY',
  opencode:    'PROVIDER_OPENCODE_KEY',
};

/**
 * Keyless platforms: providers that work without any API key.
 * These are auto-seeded on first boot (empty DB) but NEVER re-seeded
 * if the user has explicitly removed them via the /keys page.
 */
const KEYLESS_PLATFORMS = ['kilo', 'pollinations', 'ovh'] as const;

/** Returns true if the user has explicitly deleted this platform. */
function isUserDeleted(platform: string): boolean {
  const db = getDb();
  const row = db.prepare(
    'SELECT value FROM settings WHERE key = ?'
  ).get(`deleted_platform_${platform}`) as { value: string } | undefined;
  return row?.value === '1';
}

/**
 * Auto-seed keyless provider sentinel rows on first boot.
 *
 * - Only inserts if the platform has NO existing api_keys row (fresh DB).
 * - SKIPS platforms the user has explicitly deleted (`deleted_platform_*` flag).
 * - Safe to call on every boot — INSERT OR IGNORE prevents duplicates.
 */
export function applyKeylessProviders(): void {
  const db = getDb();
  let seeded = 0;

  for (const platform of KEYLESS_PLATFORMS) {
    // Respect explicit user deletion — never re-add what they removed
    if (isUserDeleted(platform)) {
      console.log(`[env-keys] Skipping keyless ${platform} — user explicitly removed this provider.`);
      continue;
    }

    // Only seed if there's no row yet (don't re-insert if already present)
    const existing = db.prepare(
      'SELECT id FROM api_keys WHERE platform = ? LIMIT 1'
    ).get(platform) as { id: number } | undefined;

    if (existing) continue; // already configured — don't touch it

    // Insert a sentinel 'no-key' row so routing sees this platform as active
    const { encrypted, iv, authTag } = encrypt('no-key');
    db.prepare(
      "INSERT OR IGNORE INTO api_keys (platform, label, encrypted_key, iv, auth_tag, status, enabled) VALUES (?, '', ?, ?, ?, 'unknown', 1)"
    ).run(platform, encrypted, iv, authTag);
    console.log(`[env-keys] Auto-seeded keyless provider: ${platform}`);
    seeded++;
  }

  if (seeded > 0) {
    console.log(`[env-keys] Seeded ${seeded} keyless provider(s).`);
  }
}

export function applyEnvProviderKeys(): void {
  const db = getDb();
  let applied = 0;

  for (const [platform, envVar] of Object.entries(PLATFORM_ENV_MAP)) {
    const rawKey = process.env[envVar]?.trim();
    if (!rawKey) continue;

    // Respect explicit user deletion — never re-add what they removed
    if (isUserDeleted(platform)) {
      console.log(`[env-keys] Skipping ${platform} — user explicitly removed this provider.`);
      continue;
    }

    const { encrypted, iv, authTag } = encrypt(rawKey);

    const existing = db.prepare(
      'SELECT id, encrypted_key, iv, auth_tag FROM api_keys WHERE platform = ? LIMIT 1'
    ).get(platform) as { id: number; encrypted_key: string; iv: string; auth_tag: string } | undefined;

    if (existing) {
      let needsUpdate = false;
      try {
        const currentDecrypted = decrypt(existing.encrypted_key, existing.iv, existing.auth_tag);
        if (currentDecrypted !== rawKey) {
          needsUpdate = true;
        }
      } catch {
        // Decryption failed — update key with current encryption key
        needsUpdate = true;
      }

      if (needsUpdate) {
        db.prepare(
          "UPDATE api_keys SET encrypted_key = ?, iv = ?, auth_tag = ?, status = 'unknown', enabled = 1 WHERE id = ?"
        ).run(encrypted, iv, authTag, existing.id);
        console.log(`[env-keys] Updated/healed key for platform: ${platform}`);
        applied++;
      }
    } else {
      db.prepare(
        "INSERT INTO api_keys (platform, label, encrypted_key, iv, auth_tag, status, enabled) VALUES (?, '', ?, ?, ?, 'unknown', 1)"
      ).run(platform, encrypted, iv, authTag);
      console.log(`[env-keys] Added key for platform: ${platform}`);
      applied++;
    }
  }

  if (applied > 0) {
    console.log(`[env-keys] Applied/healed ${applied} provider key(s) from environment variables.`);
  }
}
