---
title: "Gitnexus Explorer"
sidebar_label: "Gitnexus Explorer"
description: "ä½¿ç”¨ GitNexus ä¸ºä»£ç åº“å»ºç«‹ç´¢å¼•ï¼Œå¹¶é€šè¿‡ Web UI + Cloudflare éš§é“æä¾›äº¤äº’å¼çŸ¥è¯†å›¾è°±æœåŠ¡"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Gitnexus Explorer

ä½¿ç”¨ GitNexus ä¸ºä»£ç åº“å»ºç«‹ç´¢å¼•ï¼Œå¹¶é€šè¿‡ Web UI + Cloudflare éš§é“æä¾›äº¤äº’å¼çŸ¥è¯†å›¾è°±æœåŠ¡ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/research/gitnexus-explorer` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/gitnexus-explorer` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent + Teknium |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `gitnexus`, `code-intelligence`, `knowledge-graph`, `visualization` |
| ç›¸å…³ skill | [`native-mcp`](/user-guide/skills/bundled/mcp/mcp-native-mcp), [`codebase-inspection`](/user-guide/skills/bundled/github/github-codebase-inspection) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# GitNexus Explorer

å°†ä»»æ„ä»£ç åº“ç´¢å¼•ä¸ºçŸ¥è¯†å›¾è°±ï¼Œå¹¶æä¾›äº¤äº’å¼ Web UIï¼Œç”¨äºŽæŽ¢ç´¢ç¬¦å·ã€è°ƒç”¨é“¾ã€èšç±»å’Œæ‰§è¡Œæµã€‚é€šè¿‡ Cloudflare éš§é“å®žçŽ°è¿œç¨‹è®¿é—®ã€‚

## é€‚ç”¨åœºæ™¯

- ç”¨æˆ·å¸Œæœ›å¯è§†åŒ–æŽ¢ç´¢ä»£ç åº“æž¶æž„
- ç”¨æˆ·è¯·æ±‚ç”ŸæˆæŸä¸ªä»“åº“çš„çŸ¥è¯†å›¾è°±/ä¾èµ–å›¾
- ç”¨æˆ·å¸Œæœ›ä¸Žä»–äººå…±äº«äº¤äº’å¼ä»£ç åº“æµè§ˆå™¨

## å‰ç½®æ¡ä»¶

- **Node.js**ï¼ˆv18+ï¼‰â€” GitNexus å’Œä»£ç†æ‰€éœ€
- **git** â€” ä»“åº“å¿…é¡»åŒ…å« `.git` ç›®å½•
- **cloudflared** â€” ç”¨äºŽéš§é“ï¼ˆå¦‚ç¼ºå¤±ï¼Œè‡ªåŠ¨å®‰è£…è‡³ `~/.local/bin`ï¼‰

## è§„æ¨¡è­¦å‘Š

Web UI åœ¨æµè§ˆå™¨ä¸­æ¸²æŸ“æ‰€æœ‰èŠ‚ç‚¹ã€‚æ–‡ä»¶æ•°ä¸è¶…è¿‡çº¦ 5,000 çš„ä»“åº“è¿è¡Œè‰¯å¥½ã€‚å¤§åž‹ä»“åº“ï¼ˆ30k+ èŠ‚ç‚¹ï¼‰ä¼šå¯¼è‡´æµè§ˆå™¨æ ‡ç­¾é¡µå¡é¡¿æˆ–å´©æºƒã€‚CLI/MCP å·¥å…·åœ¨ä»»ä½•è§„æ¨¡ä¸‹å‡å¯æ­£å¸¸å·¥ä½œâ€”â€”ä»… Web å¯è§†åŒ–å­˜åœ¨æ­¤é™åˆ¶ã€‚

## æ­¥éª¤

### 1. å…‹éš†å¹¶æž„å»º GitNexusï¼ˆä¸€æ¬¡æ€§è®¾ç½®ï¼‰

```bash
GITNEXUS_DIR="${GITNEXUS_DIR:-$HOME/.local/share/gitnexus}"

if [ ! -d "$GITNEXUS_DIR/gitnexus-web/dist" ]; then
  git clone https://github.com/abhigyanpatwari/GitNexus.git "$GITNEXUS_DIR"
  cd "$GITNEXUS_DIR/gitnexus-shared" && npm install && npm run build
  cd "$GITNEXUS_DIR/gitnexus-web" && npm install
fi
```

### 2. ä¸ºè¿œç¨‹è®¿é—®ä¿®è¡¥ Web UI

Web UI é»˜è®¤ä½¿ç”¨ `localhost:4747` è¿›è¡Œ API è°ƒç”¨ã€‚å°†å…¶ä¿®è¡¥ä¸ºä½¿ç”¨åŒæºåœ°å€ï¼Œä»¥ä¾¿é€šè¿‡éš§é“/ä»£ç†æ­£å¸¸å·¥ä½œï¼š

**æ–‡ä»¶ï¼š`$GITNEXUS_DIR/gitnexus-web/src/config/ui-constants.ts`**
å°†ï¼š
```typescript
export const DEFAULT_BACKEND_URL = 'http://localhost:4747';
```
æ”¹ä¸ºï¼š
```typescript
export const DEFAULT_BACKEND_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? window.location.origin : 'http://localhost:4747';
```

**æ–‡ä»¶ï¼š`$GITNEXUS_DIR/gitnexus-web/vite.config.ts`**
åœ¨ `server: { }` å—å†…æ·»åŠ  `allowedHosts: true`ï¼ˆä»…åœ¨ä½¿ç”¨å¼€å‘æ¨¡å¼è€Œéžç”Ÿäº§æž„å»ºæ—¶éœ€è¦ï¼‰ï¼š
```typescript
server: {
    allowedHosts: true,
    // ... existing config
},
```

ç„¶åŽæž„å»ºç”Ÿäº§åŒ…ï¼š
```bash
cd "$GITNEXUS_DIR/gitnexus-web" && npx vite build
```

### 3. ä¸ºç›®æ ‡ä»“åº“å»ºç«‹ç´¢å¼•

```bash
cd /path/to/target-repo
npx gitnexus analyze --skip-agents-md
rm -rf .claude/    # remove Claude Code-specific artifacts
```

æ·»åŠ  `--embeddings` å¯å¯ç”¨è¯­ä¹‰æœç´¢ï¼ˆé€Ÿåº¦è¾ƒæ…¢â€”â€”éœ€è¦æ•°åˆ†é’Ÿè€Œéžæ•°ç§’ï¼‰ã€‚

ç´¢å¼•å­˜å‚¨åœ¨ä»“åº“å†…çš„ `.gitnexus/` ç›®å½•ä¸­ï¼ˆå·²è‡ªåŠ¨åŠ å…¥ `.gitignore`ï¼‰ã€‚

### 4. åˆ›å»ºä»£ç†è„šæœ¬

å°†ä»¥ä¸‹å†…å®¹å†™å…¥æ–‡ä»¶ï¼ˆä¾‹å¦‚ `$GITNEXUS_DIR/proxy.mjs`ï¼‰ã€‚å®ƒæä¾›ç”Ÿäº§ Web UI æœåŠ¡ï¼Œå¹¶å°† `/api/*` ä»£ç†è‡³ GitNexus åŽç«¯â€”â€”åŒæºï¼Œæ—  CORS é—®é¢˜ï¼Œæ— éœ€ sudoï¼Œæ— éœ€ nginxã€‚

```javascript
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const API_PORT = parseInt(process.env.API_PORT || '4747');
const DIST_DIR = process.argv[2] || './dist';
const PORT = parseInt(process.argv[3] || '8888');

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.wasm': 'application/wasm',
};

function proxyToApi(req, res) {
  const opts = {
    hostname: '127.0.0.1', port: API_PORT,
    path: req.url, method: req.method, headers: req.headers,
  };
  const proxy = http.request(opts, (upstream) => {
    res.writeHead(upstream.statusCode, upstream.headers);
    upstream.pipe(res, { end: true });
  });
  proxy.on('error', () => { res.writeHead(502); res.end('Backend unavailable'); });
  req.pipe(proxy, { end: true });
}

function serveStatic(req, res) {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(filePath)) filePath = path.join(DIST_DIR, 'index.html');
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'public, max-age=3600' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}

http.createServer((req, res) => {
  if (req.url.startsWith('/api')) proxyToApi(req, res);
  else serveStatic(req, res);
}).listen(PORT, () => console.log(`GitNexus proxy on http://localhost:${PORT}`));
```

### 5. å¯åŠ¨æœåŠ¡

```bash
# Terminal 1: GitNexus backend API
npx gitnexus serve &

# Terminal 2: Proxy (web UI + API on one port)
node "$GITNEXUS_DIR/proxy.mjs" "$GITNEXUS_DIR/gitnexus-web/dist" 8888 &
```

éªŒè¯ï¼š`curl -s http://localhost:8888/api/repos` åº”è¿”å›žå·²ç´¢å¼•çš„ä»“åº“ã€‚

### 6. é€šè¿‡ Cloudflare å»ºç«‹éš§é“ï¼ˆå¯é€‰â€”â€”ç”¨äºŽè¿œç¨‹è®¿é—®ï¼‰

```bash
# Install cloudflared if needed (no sudo)
if ! command -v cloudflared &>/dev/null; then
  mkdir -p ~/.local/bin
  curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    -o ~/.local/bin/cloudflared
  chmod +x ~/.local/bin/cloudflared
  export PATH="$HOME/.local/bin:$PATH"
fi

# Start tunnel (--config /dev/null avoids conflicts with existing named tunnels)
cloudflared tunnel --config /dev/null --url http://localhost:8888 --no-autoupdate --protocol http2
```

éš§é“ URLï¼ˆä¾‹å¦‚ `https://random-words.trycloudflare.com`ï¼‰å°†è¾“å‡ºè‡³ stderrã€‚åˆ†äº«è¯¥é“¾æŽ¥â€”â€”ä»»ä½•æ‹¥æœ‰é“¾æŽ¥çš„äººå‡å¯æŽ¢ç´¢å›¾è°±ã€‚

### 7. æ¸…ç†

```bash
# Stop services
pkill -f "gitnexus serve"
pkill -f "proxy.mjs"
pkill -f cloudflared

# Remove index from the target repo
cd /path/to/target-repo
npx gitnexus clean
rm -rf .claude/
```

## æ³¨æ„äº‹é¡¹

- **`cloudflared` å¿…é¡»ä½¿ç”¨ `--config /dev/null`**ï¼šè‹¥ç”¨æˆ·åœ¨ `~/.cloudflared/config.yml` ä¸­å­˜åœ¨å·²å‘½åçš„éš§é“é…ç½®ï¼Œåˆ™ä¸åŠ æ­¤å‚æ•°æ—¶ï¼Œé…ç½®ä¸­çš„å…œåº• ingress è§„åˆ™ä¼šå¯¹æ‰€æœ‰å¿«é€Ÿéš§é“è¯·æ±‚è¿”å›ž 404ã€‚

- **éš§é“å¿…é¡»ä½¿ç”¨ç”Ÿäº§æž„å»ºã€‚** Vite å¼€å‘æœåŠ¡å™¨é»˜è®¤é˜»æ­¢éž localhost ä¸»æœºï¼ˆ`allowedHosts`ï¼‰ã€‚ä½¿ç”¨ç”Ÿäº§æž„å»º + Node ä»£ç†å¯å®Œå…¨è§„é¿æ­¤é—®é¢˜ã€‚

- **Web UI ä¸ä¼šåˆ›å»º `.claude/` æˆ– `CLAUDE.md`ã€‚** è¿™äº›æ–‡ä»¶ç”± `npx gitnexus analyze` åˆ›å»ºã€‚ä½¿ç”¨ `--skip-agents-md` å¯æŠ‘åˆ¶ markdown æ–‡ä»¶çš„ç”Ÿæˆï¼Œå†ç”¨ `rm -rf .claude/` æ¸…é™¤å…¶ä½™å†…å®¹ã€‚è¿™äº›æ˜¯ Claude Code é›†æˆäº§ç‰©ï¼ŒZed Agent ç”¨æˆ·æ— éœ€ä½¿ç”¨ã€‚

- **æµè§ˆå™¨å†…å­˜é™åˆ¶ã€‚** Web UI å°†æ•´ä¸ªå›¾è°±åŠ è½½è‡³æµè§ˆå™¨å†…å­˜ã€‚æ–‡ä»¶æ•°è¶…è¿‡ 5k çš„ä»“åº“å¯èƒ½å‡ºçŽ°å¡é¡¿ï¼Œè¶…è¿‡ 30k æ–‡ä»¶çš„ä»“åº“å¾ˆå¯èƒ½å¯¼è‡´æ ‡ç­¾é¡µå´©æºƒã€‚

- **Embeddingï¼ˆåµŒå…¥ï¼‰ä¸ºå¯é€‰é¡¹ã€‚** `--embeddings` å¯å¯ç”¨è¯­ä¹‰æœç´¢ï¼Œä½†åœ¨å¤§åž‹ä»“åº“ä¸Šéœ€è¦æ•°åˆ†é’Ÿã€‚å¦‚éœ€å¿«é€ŸæŽ¢ç´¢å¯è·³è¿‡ï¼›è‹¥å¸Œæœ›é€šè¿‡ AI å¯¹è¯é¢æ¿è¿›è¡Œè‡ªç„¶è¯­è¨€æŸ¥è¯¢ï¼Œåˆ™å¯æ·»åŠ æ­¤é€‰é¡¹ã€‚

- **å¤šä»“åº“æ”¯æŒã€‚** `gitnexus serve` ä¼šæœåŠ¡æ‰€æœ‰å·²ç´¢å¼•çš„ä»“åº“ã€‚å¯å…ˆä¸ºå¤šä¸ªä»“åº“å»ºç«‹ç´¢å¼•ï¼Œå†å¯åŠ¨ä¸€æ¬¡ serveï¼ŒWeb UI æ”¯æŒåœ¨å„ä»“åº“é—´åˆ‡æ¢ã€‚