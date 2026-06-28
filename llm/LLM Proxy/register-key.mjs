import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.resolve(__dirname, 'server/data/freeapi.db'));
const keys = db.prepare('SELECT id, platform, enabled, status, base_url FROM api_keys').all();
console.log(JSON.stringify(keys, null, 2));
db.close();
