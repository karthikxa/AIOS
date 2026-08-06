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

function removeCorruptedDb(resolvedPath: string): void {
  const exts = ['', '-wal', '-shm'];
  for (const ext of exts) {
    const p = resolvedPath + ext;
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch { /* ignore */ }
    }
  }
}

export function initDb(dbPath?: string): Database.Database {
  const resolvedPath = dbPath ?? DB_PATH;
  const isMemory = resolvedPath === ':memory:';

  if (!isMemory) {
    const dataDir = path.dirname(resolvedPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  try {
    db = new Database(resolvedPath);
    if (!isMemory) db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    // Verify the database is not corrupted
    db.pragma('integrity_check');
  } catch (err: any) {
    if (err?.code === 'SQLITE_CORRUPT' || err?.message?.includes('malformed')) {
      console.warn(`[db] Database corrupted at ${resolvedPath} — removing and recreating`);
      removeCorruptedDb(resolvedPath);
      db = new Database(resolvedPath);
      if (!isMemory) db.pragma('journal_mode = WAL');
      db.pragma('foreign_keys = ON');
    } else {
      throw err;
    }
  }

  migrateDbSchema(db);

  console.log(`Database initialized at ${resolvedPath}`);
  return db;
}

export function getUnifiedApiKey(): string {
  const db = getDb();
  const row = db.prepare("SELECT value FROM settings WHERE key = 'unified_api_key'").get() as { value: string } | undefined;
  return row?.value ?? '';
}

export function regenerateUnifiedKey(): string {
  const db = getDb();
  const key = `freellmapi-${crypto.randomBytes(24).toString('hex')}`;
  const info = db.prepare(
    "INSERT INTO settings (key, value) VALUES ('unified_api_key', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  ).run(key);
  if (info.changes === 0) {
    console.warn('[db] regenerateUnifiedKey: INSERT/UPDATE affected 0 rows');
  }
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
