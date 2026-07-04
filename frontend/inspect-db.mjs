import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('C:/Users/balur/Downloads/AVDE/freellmapi/server/data/freeapi.db');

// Show all current keys
const allKeys = db.prepare('SELECT id, platform, label, status, enabled, encrypted_key FROM api_keys').all();
console.log(`Total keys in DB: ${allKeys.length}`);
allKeys.forEach(k => {
  const hasKey = k.encrypted_key && String(k.encrypted_key).length > 0;
  console.log(`  [${k.id}] ${k.platform} | status=${k.status} | enabled=${k.enabled} | hasEncryptedKey=${hasKey} | label="${k.label}"`);
});
db.close();
