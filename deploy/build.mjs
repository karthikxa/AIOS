import { cpSync, existsSync, mkdirSync, rmSync, readFileSync, writeFileSync, readdirSync, statSync, copyFileSync } from 'fs';
import { spawnSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DEPLOY = __dirname;
const SKIP = (f) => !f.includes('node_modules') && !f.includes('.git') && !f.endsWith('.map');

function cpSyncRobust(src, dest, filter) {
  if (filter && !filter(src)) return;
  const stats = statSync(src);
  if (stats.isDirectory()) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    const files = readdirSync(src);
    for (const file of files) {
      cpSyncRobust(join(src, file), join(dest, file), filter);
    }
  } else {
    try {
      copyFileSync(src, dest);
    } catch (err) {
      console.warn(`[build] Warning: Could not copy/overwrite ${src} to ${dest} (${err.message})`);
    }
  }
}

console.log('[build] Copying Dashboard...');
const dashSrc = join(ROOT, 'frontend');
const dashDst = join(DEPLOY, 'dashboard');
if (existsSync(dashDst)) {
  try {
    rmSync(dashDst, { recursive: true });
  } catch (e) {
    console.warn('[build] Warning: Could not remove old dashboard directory, overwriting instead.');
  }
}
mkdirSync(dashDst, { recursive: true });
cpSyncRobust(dashSrc, dashDst, SKIP);

console.log('[build] Copying freellmapi (built)...');
const flmSrc = join(ROOT, 'LLM', 'LLM Proxy', 'server');
const flmDst = join(DEPLOY, 'freellmapi', 'server');
if (existsSync(flmDst)) {
  try {
    rmSync(flmDst, { recursive: true });
  } catch (e) {
    console.warn('[build] Warning: Could not remove old freellmapi server directory, overwriting instead.');
  }
}
mkdirSync(join(DEPLOY, 'freellmapi'), { recursive: true });
cpSyncRobust(flmSrc, flmDst, (f) => !f.includes('node_modules') && !f.includes('.git'));

// Strip workspace type-only package dependency in the production package.json copy
const pkgPath = join(flmDst, 'package.json');
if (existsSync(pkgPath)) {
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  if (pkg.dependencies && pkg.dependencies['@freellmapi/shared']) {
    delete pkg.dependencies['@freellmapi/shared'];
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
  }
}

console.log('[build] Installing freellmapi deps...');
const r = spawnSync('npm', ['install', '--production'], { cwd: flmDst, stdio: 'inherit', shell: true });
if (r.error || r.status !== 0) {
  console.warn(`[build] Warning: npm install failed or directory locked (${r.error ? r.error.message : 'exit code ' + r.status}). Continuing anyway since dependencies might already exist.`);
}

console.log('\n[build] Done! Deploy with:');
console.log('  cd deploy');
console.log('  UNIFIED_API_KEY=your-key node server.mjs\n');
