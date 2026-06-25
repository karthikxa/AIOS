import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('C:/Users/balur/Downloads/AVDE/freellmapi/server/data/freeapi.db');
const row = db.prepare("SELECT value FROM settings WHERE key = 'unified_api_key'").get();
db.close();
process.stdout.write(row?.value ?? '');
