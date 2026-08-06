import crypto from 'crypto';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { migrateDbSchema } from './migrations.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '../../data/freeapi.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return db;
}

export function resetCorruptedDb(dbPath?: string): Database.Database {
  const resolvedPath = dbPath ?? DB_PATH;
  const isMemory = resolvedPath === ':memory:';
  console.warn(`[db] Resetting malformed database file at ${resolvedPath}...`);
  try {
    if (db) {
      try { db.close(); } catch {}
    }
    if (!isMemory && fs.existsSync(resolvedPath)) {
      fs.unlinkSync(resolvedPath);
      if (fs.existsSync(`${resolvedPath}-wal`)) fs.unlinkSync(`${resolvedPath}-wal`);
      if (fs.existsSync(`${resolvedPath}-shm`)) fs.unlinkSync(`${resolvedPath}-shm`);
    }
  } catch (err) {
    console.error('[db] Error cleaning up malformed DB files:', err);
  }
  db = new Database(resolvedPath);
  if (!isMemory) db.pragma('journal_mode = WAL');
  db.pragma('busy_timeout = 5000');
  db.pragma('foreign_keys = ON');
  migrateDbSchema(db);
  return db;
}

export function initDb(dbPath?: string): Database.Database {
  const resolvedPath = dbPath ?? DB_PATH;
  try {
    return resetCorruptedDb(resolvedPath);
  } catch (err: any) {
    console.error('[db] Error initializing DB, forcing reset:', err);
    return resetCorruptedDb(resolvedPath);
  }
}

export function getUnifiedApiKey(): string {
  // Allow overriding via env var — set UNIFIED_API_KEY in Render/production
  // to change the key without re-deploying or touching the database.
  const envKey = process.env.UNIFIED_API_KEY?.trim();
  if (envKey) return envKey;

  const db = getDb();
  const row = db.prepare("SELECT value FROM settings WHERE key = 'unified_api_key'").get() as { value: string };
  return row.value;
}

export function regenerateUnifiedKey(): string {
  const db = getDb();
  const key = `freellmapi-${crypto.randomBytes(24).toString('hex')}`;
  db.prepare("UPDATE settings SET value = ? WHERE key = 'unified_api_key'").run(key);
  return key;
}

// Generic key/value settings accessors (used by routing strategy, etc.).
export function getSetting(key: string): string | undefined {
  const db = getDb();
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
  return row?.value;
}

export function setSetting(key: string, value: string): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(key, value);
}
