import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';

const DB = 'C:/Users/balur/Downloads/AVDE/freellmapi/server/data/freeapi.db';
// The current ENCRYPTION_KEY from freellmapi/.env
const ENC_KEY = '1ed55210131f43e8be47b40f7493e6c052b68eed0d1f49d98dcc04b4f68fdc57';

const db = new DatabaseSync(DB);
const allKeys = db.prepare('SELECT id, platform, label, status, encrypted_key, iv, auth_tag FROM api_keys').all();

console.log(`\nTotal keys: ${allKeys.length}`);

let badCount = 0;
let goodCount = 0;

for (const row of allKeys) {
  // Try to decrypt with current key
  let decryptOk = false;
  try {
    if (row.encrypted_key && row.iv && row.auth_tag) {
      const keyBuf = Buffer.from(ENC_KEY, 'hex');
      const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuf, Buffer.from(String(row.iv), 'hex'), { authTagLength: 16 });
      decipher.setAuthTag(Buffer.from(String(row.auth_tag), 'hex'));
      let dec = decipher.update(String(row.encrypted_key), 'hex', 'utf8');
      dec += decipher.final('utf8');
      decryptOk = true;
      console.log(`  ✅ [${row.id}] ${row.platform} | "${row.label}" | status=${row.status} | key=${dec.substring(0,8)}...`);
      goodCount++;
    } else {
      // No encrypted data — still "valid" (no-key provider with empty key)
      console.log(`  ⚠️  [${row.id}] ${row.platform} | "${row.label}" | no encrypted data | status=${row.status}`);
      goodCount++;
    }
  } catch (e) {
    console.log(`  ❌ [${row.id}] ${row.platform} | "${row.label}" | DECRYPT FAILED: ${e.message}`);
    badCount++;
    // Delete the broken entry
    db.prepare('DELETE FROM api_keys WHERE id = ?').run(row.id);
    console.log(`     → DELETED`);
  }
}

console.log(`\nSummary: ${goodCount} good, ${badCount} deleted`);
if (badCount > 0) {
  console.log('\n✓ Broken keys removed. Refresh http://localhost:5173 to see clean state.');
  console.log('  Re-add any keys that were removed if needed.');
}

db.close();
