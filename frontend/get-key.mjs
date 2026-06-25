import Database from 'better-sqlite3';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../freellmapi/server/data/freeapi.db');

if (existsSync(dbPath)) {
  try {
    const db = new Database(dbPath, { readonly: true });
    const row = db.prepare("SELECT value FROM settings WHERE key = 'unified_api_key'").get();
    db.close();
    if (row && row.value) {
      process.stdout.write(row.value);
      process.exit(0);
    }
  } catch (e) {
    // fallthrough
  }
}
process.stdout.write('');
process.exit(0);
