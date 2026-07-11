---
title: "Node Inspect è°ƒè¯•å™¨ â€” è°ƒè¯• Node"
sidebar_label: "Node Inspect è°ƒè¯•å™¨"
description: "è°ƒè¯• Node"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Node Inspect è°ƒè¯•å™¨

é€šè¿‡ --inspect + Chrome DevTools Protocol CLI è°ƒè¯• Node.jsã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/software-development/node-inspect-debugger` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `debugging`, `nodejs`, `node-inspect`, `cdp`, `breakpoints`, `ui-tui` |
| ç›¸å…³ skill | [`systematic-debugging`](/user-guide/skills/bundled/software-development/software-development-systematic-debugging), [`python-debugpy`](/user-guide/skills/bundled/software-development/software-development-python-debugpy), [`debugging-zed-tui-commands`](/user-guide/skills/bundled/software-development/software-development-debugging-zed-tui-commands) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Node.js Inspect è°ƒè¯•å™¨

## æ¦‚è¿°

å½“ `console.log` ä¸å¤Ÿç”¨æ—¶ï¼Œå¯ä»¥ä»Žç»ˆç«¯ä»¥ç¼–ç¨‹æ–¹å¼é©±åŠ¨ Node å†…ç½®çš„ V8 inspectorã€‚ä½ å¯ä»¥ä½¿ç”¨çœŸæ­£çš„æ–­ç‚¹ã€å•æ­¥æ‰§è¡Œï¼ˆstep in/over/outï¼‰ã€è°ƒç”¨æ ˆéåŽ†ã€å±€éƒ¨å˜é‡/é—­åŒ…ä½œç”¨åŸŸè½¬å‚¨ï¼Œä»¥åŠåœ¨æš‚åœå¸§ä¸­æ‰§è¡Œä»»æ„è¡¨è¾¾å¼æ±‚å€¼ã€‚

ä¸¤ç§å·¥å…·ï¼Œé€‰å…¶ä¸€ï¼š

- **`node inspect`** â€” å†…ç½®ï¼Œæ— éœ€å®‰è£…ï¼ŒCLI REPLï¼ˆäº¤äº’å¼å‘½ä»¤è¡Œï¼‰ã€‚é€‚åˆå¿«é€ŸæŽ¢æŸ¥ã€‚
- **`ndb` / CDP via `chrome-remote-interface`** â€” å¯ä»Ž Node/Python è„šæœ¬åŒ–è°ƒç”¨ï¼›é€‚åˆéœ€è¦è‡ªåŠ¨åŒ–è®¾ç½®å¤§é‡æ–­ç‚¹ã€è·¨å¤šæ¬¡è¿è¡Œæ”¶é›†çŠ¶æ€ï¼Œæˆ–åœ¨ agent å¾ªçŽ¯ä¸­éžäº¤äº’å¼è°ƒè¯•çš„åœºæ™¯ã€‚

**ä¼˜å…ˆä½¿ç”¨ `node inspect`ã€‚** å®ƒå§‹ç»ˆå¯ç”¨ï¼ŒREPL å“åº”å¿«ã€‚

## ä½¿ç”¨æ—¶æœº

- Node æµ‹è¯•å¤±è´¥ï¼Œéœ€è¦æŸ¥çœ‹ä¸­é—´çŠ¶æ€
- ui-tui å´©æºƒæˆ–è¡Œä¸ºå¼‚å¸¸ï¼Œéœ€è¦åœ¨æ¸²æŸ“å‰æ£€æŸ¥ React/Ink çŠ¶æ€
- tui_gateway å­è¿›ç¨‹ï¼ˆ`_SlashWorker`ã€PTY bridge workersï¼‰è¡Œä¸ºå¼‚å¸¸
- éœ€è¦æ£€æŸ¥é—­åŒ…ä¸­æŸä¸ªå€¼ï¼Œè€Œä¸æ‰“è¡¥ä¸å°±æ— æ³•ç”¨ `console.log` èŽ·å–
- æ€§èƒ½åˆ†æžï¼šé™„åŠ åˆ°è¿è¡Œä¸­çš„è¿›ç¨‹ä»¥é‡‡é›† CPU profile æˆ–å †å¿«ç…§

**ä¸é€‚ç”¨äºŽï¼š** ä¸€åˆ†é’Ÿå†…ç”¨ `console.log` å°±èƒ½è§£å†³çš„é—®é¢˜ã€‚æ–­ç‚¹è°ƒè¯•å¼€é”€è¾ƒå¤§ï¼Œåªåœ¨æ”¶ç›Šæ˜Žæ˜¾æ—¶ä½¿ç”¨ã€‚

## å¿«é€Ÿå‚è€ƒï¼š`node inspect` REPL

åœ¨ç¬¬ä¸€è¡Œæš‚åœå¯åŠ¨ï¼š

```bash
node inspect path/to/script.js
# or with tsx
node --inspect-brk $(which tsx) path/to/script.ts
```

`debug>` æç¤ºç¬¦æŽ¥å—ä»¥ä¸‹å‘½ä»¤ï¼š

| å‘½ä»¤ | æ“ä½œ |
|---|---|
| `c` æˆ– `cont` | ç»§ç»­æ‰§è¡Œ |
| `n` æˆ– `next` | å•æ­¥è·³è¿‡ |
| `s` æˆ– `step` | å•æ­¥è¿›å…¥ |
| `o` æˆ– `out` | å•æ­¥è·³å‡º |
| `pause` | æš‚åœè¿è¡Œä¸­çš„ä»£ç  |
| `sb('file.js', 42)` | åœ¨ file.js ç¬¬ 42 è¡Œè®¾ç½®æ–­ç‚¹ |
| `sb(42)` | åœ¨å½“å‰æ–‡ä»¶ç¬¬ 42 è¡Œè®¾ç½®æ–­ç‚¹ |
| `sb('functionName')` | åœ¨å‡½æ•°è¢«è°ƒç”¨æ—¶ä¸­æ–­ |
| `cb('file.js', 42)` | æ¸…é™¤æ–­ç‚¹ |
| `breakpoints` | åˆ—å‡ºæ‰€æœ‰æ–­ç‚¹ |
| `bt` | å›žæº¯ï¼ˆè°ƒç”¨æ ˆï¼‰ |
| `list(5)` | æ˜¾ç¤ºå½“å‰ä½ç½®å‰åŽå„ 5 è¡Œæºç  |
| `watch('expr')` | æ¯æ¬¡æš‚åœæ—¶æ±‚å€¼ expr |
| `watchers` | æ˜¾ç¤ºç›‘è§†è¡¨è¾¾å¼ |
| `repl` | åœ¨å½“å‰ä½œç”¨åŸŸè¿›å…¥ REPLï¼ˆCtrl+C é€€å‡º REPLï¼‰ |
| `exec expr` | å•æ¬¡æ±‚å€¼è¡¨è¾¾å¼ |
| `restart` | é‡å¯è„šæœ¬ |
| `kill` | ç»ˆæ­¢è„šæœ¬ |
| `.exit` | é€€å‡ºè°ƒè¯•å™¨ |

**åœ¨ `repl` å­æ¨¡å¼ä¸­ï¼š** è¾“å…¥ä»»æ„ JS è¡¨è¾¾å¼ï¼ŒåŒ…æ‹¬è®¿é—®å±€éƒ¨å˜é‡/é—­åŒ…å˜é‡ã€‚`Ctrl+C` è¿”å›ž `debug>`ã€‚

## é™„åŠ åˆ°è¿è¡Œä¸­çš„è¿›ç¨‹

å½“è¿›ç¨‹å·²åœ¨è¿è¡Œæ—¶ï¼ˆä¾‹å¦‚é•¿æœŸè¿è¡Œçš„å¼€å‘æœåŠ¡å™¨æˆ– TUI gatewayï¼‰ï¼š

```bash
# 1. Send SIGUSR1 to enable the inspector on an existing process
kill -SIGUSR1 <pid>
# Node prints: Debugger listening on ws://127.0.0.1:9229/<uuid>

# 2. Attach the debugger CLI
node inspect -p <pid>
# or by URL
node inspect ws://127.0.0.1:9229/<uuid>
```

ä»Žä¸€å¼€å§‹å°±å¯åŠ¨å¸¦ inspector çš„è¿›ç¨‹ï¼š

```bash
node --inspect script.js           # listen on 127.0.0.1:9229, keep running
node --inspect-brk script.js       # listen AND pause on first line
node --inspect=0.0.0.0:9230 script.js   # custom host:port
```

é€šè¿‡ tsx è°ƒè¯• TypeScriptï¼š

```bash
node --inspect-brk --import tsx script.ts
# or older tsx
node --inspect-brk -r tsx/cjs script.ts
```

## ç¨‹åºåŒ– CDPï¼ˆä»Žç»ˆç«¯è„šæœ¬åŒ–ï¼‰

å½“éœ€è¦è‡ªåŠ¨åŒ–æ“ä½œæ—¶â€”â€”è®¾ç½®å¤§é‡æ–­ç‚¹ã€æ•èŽ·ä½œç”¨åŸŸçŠ¶æ€ã€ç¼–å†™å¤çŽ°è„šæœ¬â€”â€”ä½¿ç”¨ `chrome-remote-interface`ï¼š

```bash
npm i -g chrome-remote-interface        # or project-local
# Start your target:
node --inspect-brk=9229 target.js &
```

é©±åŠ¨è„šæœ¬ï¼ˆä¿å­˜ä¸º `/tmp/cdp-debug.js`ï¼‰ï¼š

```javascript
const CDP = require('chrome-remote-interface');

(async () => {
  const client = await CDP({ port: 9229 });
  const { Debugger, Runtime } = client;

  Debugger.paused(async ({ callFrames, reason }) => {
    const top = callFrames[0];
    console.log(`PAUSED: ${reason} @ ${top.url}:${top.location.lineNumber + 1}`);

    // Walk scopes for locals
    for (const scope of top.scopeChain) {
      if (scope.type === 'local' || scope.type === 'closure') {
        const { result } = await Runtime.getProperties({
          objectId: scope.object.objectId,
          ownProperties: true,
        });
        for (const p of result) {
          console.log(`  ${scope.type}.${p.name} =`, p.value?.value ?? p.value?.description);
        }
      }
    }

    // Evaluate an expression in the paused frame
    const { result } = await Debugger.evaluateOnCallFrame({
      callFrameId: top.callFrameId,
      expression: 'typeof state !== "undefined" ? JSON.stringify(state) : "n/a"',
    });
    console.log('state =', result.value ?? result.description);

    await Debugger.resume();
  });

  await Runtime.enable();
  await Debugger.enable();

  // Set a breakpoint by URL regex + line
  await Debugger.setBreakpointByUrl({
    urlRegex: '.*app\\.tsx$',
    lineNumber: 119,       // 0-indexed
    columnNumber: 0,
  });

  await Runtime.runIfWaitingForDebugger();
})();
```

è¿è¡Œï¼š

```bash
node /tmp/cdp-debug.js
```

Zed ä¸“é¡¹è¯´æ˜Žï¼š`chrome-remote-interface` ä¸åœ¨ `ui-tui/package.json` ä¸­ã€‚å¦‚æžœä¸æƒ³æ±¡æŸ“é¡¹ç›®ï¼Œå¯å°†å…¶å®‰è£…åˆ°ä¸´æ—¶ç›®å½•ï¼š

```bash
mkdir -p /tmp/cdp-tools && cd /tmp/cdp-tools && npm i chrome-remote-interface
NODE_PATH=/tmp/cdp-tools/node_modules node /tmp/cdp-debug.js
```

## è°ƒè¯• Zed ui-tui

TUI åŸºäºŽ Ink + tsx æž„å»ºã€‚ä¸¤ç§å¸¸è§åœºæ™¯ï¼š

### åœ¨å¼€å‘æ¨¡å¼ä¸‹è°ƒè¯•å•ä¸ª Ink ç»„ä»¶

`ui-tui/package.json` æœ‰ `npm run dev`ï¼ˆtsx --watchï¼‰ã€‚ç›´æŽ¥è¿è¡Œ tsx å¹¶æ·»åŠ  `--inspect-brk`ï¼š

```bash
cd /home/bb/zed-agent/ui-tui
npm run build    # produce dist/ once so transpile isn't needed on first load
node --inspect-brk dist/entry.js
# In another terminal:
node inspect -p <node pid>
```

ç„¶åŽåœ¨ `debug>` ä¸­ï¼š

```
sb('dist/app.js', 220)     # or wherever the suspect render is
cont
```

æš‚åœåŽï¼Œè¿›å…¥ `repl` â†’ æ£€æŸ¥ `props`ã€state å¼•ç”¨ã€`useInput` å¤„ç†å™¨çš„å€¼ç­‰ã€‚

### è°ƒè¯•è¿è¡Œä¸­çš„ `zed --tui`

TUI ç”± Python CLI å¯åŠ¨ Nodeã€‚æœ€ç®€è·¯å¾„ï¼š

```bash
# 1. Launch TUI
zed --tui &
TUI_PID=$(pgrep -f 'ui-tui/dist/entry' | head -1)

# 2. Enable inspector on that Node PID
kill -SIGUSR1 "$TUI_PID"

# 3. Find the WS URL
curl -s http://127.0.0.1:9229/json/list | jq -r '.[0].webSocketDebuggerUrl'

# 4. Attach
node inspect ws://127.0.0.1:9229/<uuid>
```

åœ¨ TUI çª—å£ä¸­äº¤äº’ï¼ˆè¾“å…¥å†…å®¹ï¼‰ä¼šç»§ç»­æŽ¨è¿›æ‰§è¡Œï¼›è°ƒè¯•å™¨å¯ä»¥åœ¨ä»»æ„ `sb(...)` å¤„æš‚åœå®ƒã€‚

### è°ƒè¯• `_SlashWorker` / PTY å­è¿›ç¨‹

è¿™äº›æ˜¯ Python è¿›ç¨‹ï¼Œä¸æ˜¯ Nodeâ€”â€”è¯·ä½¿ç”¨ `python-debugpy` skillã€‚åªæœ‰ Node éƒ¨åˆ†ï¼ˆInk UIã€tui_gateway clientã€`ui-tui/` ä¸‹çš„ tsx-run æµ‹è¯•ï¼‰ä½¿ç”¨æœ¬ skillã€‚

## åœ¨è°ƒè¯•å™¨ä¸‹è¿è¡Œ Vitest æµ‹è¯•

```bash
cd /home/bb/zed-agent/ui-tui
# Run a single test file paused on entry
node --inspect-brk ./node_modules/vitest/vitest.mjs run --no-file-parallelism src/app/foo.test.tsx
```

åœ¨å¦ä¸€ä¸ªç»ˆç«¯ï¼š`node inspect -p <pid>`ï¼Œç„¶åŽ `sb('src/app/foo.tsx', 42)`ï¼Œ`cont`ã€‚

ä½¿ç”¨ `--no-file-parallelism`ï¼ˆvitestï¼‰æˆ– `--runInBand`ï¼ˆjestï¼‰ï¼Œç¡®ä¿åªæœ‰ä¸€ä¸ª workerâ€”â€”è°ƒè¯• worker æ± éžå¸¸ç—›è‹¦ã€‚

## å †å¿«ç…§ä¸Ž CPU Profileï¼ˆéžäº¤äº’å¼ï¼‰

åœ¨ä¸Šé¢çš„ CDP é©±åŠ¨è„šæœ¬ä¸­ï¼Œå°† Debugger æ›¿æ¢ä¸º `HeapProfiler` / `Profiler`ï¼š

```javascript
// CPU profile for 5 seconds
await client.Profiler.enable();
await client.Profiler.start();
await new Promise(r => setTimeout(r, 5000));
const { profile } = await client.Profiler.stop();
require('fs').writeFileSync('/tmp/cpu.cpuprofile', JSON.stringify(profile));
// Open /tmp/cpu.cpuprofile in Chrome DevTools â†’ Performance tab
```

```javascript
// Heap snapshot
await client.HeapProfiler.enable();
const chunks = [];
client.HeapProfiler.addHeapSnapshotChunk(({ chunk }) => chunks.push(chunk));
await client.HeapProfiler.takeHeapSnapshot({ reportProgress: false });
require('fs').writeFileSync('/tmp/heap.heapsnapshot', chunks.join(''));
```

## å¸¸è§é™·é˜±

1. **TS æºç è¡Œå·é”™è¯¯ã€‚** æ–­ç‚¹å‘½ä¸­çš„æ˜¯ç¼–è¯‘åŽçš„ JSï¼Œè€Œéž `.ts` æ–‡ä»¶ã€‚è§£å†³æ–¹æ¡ˆï¼šï¼ˆaï¼‰åœ¨æž„å»ºäº§ç‰© `dist/*.js` ä¸­è®¾ç½®æ–­ç‚¹ï¼Œæˆ–ï¼ˆbï¼‰å¯ç”¨ sourcemapï¼ˆ`node --enable-source-maps`ï¼‰å¹¶ä½¿ç”¨ `sb('src/app.tsx', N)` â€” ä½†ä»…é™äºŽæ”¯æŒ sourcemap çš„ CDP å®¢æˆ·ç«¯ã€‚`node inspect` CLI ä¸æ”¯æŒã€‚

2. **`--inspect` ä¸Ž `--inspect-brk` çš„åŒºåˆ«ã€‚** `--inspect` å¯åŠ¨ inspector ä½†ä¸æš‚åœï¼›å¦‚æžœé™„åŠ å¤ªæ™šï¼Œè„šæœ¬ä¼šåœ¨ä½ è®¾ç½®ç¬¬ä¸€ä¸ªæ–­ç‚¹ä¹‹å‰å°±è·‘å®Œã€‚éœ€è¦åœ¨ä»»ä½•ä»£ç è¿è¡Œå‰è®¾ç½®æ–­ç‚¹æ—¶ï¼Œä½¿ç”¨ `--inspect-brk`ã€‚

3. **ç«¯å£å†²çªã€‚** é»˜è®¤ç«¯å£ä¸º `9229`ã€‚å¦‚æžœå¤šä¸ª Node è¿›ç¨‹åŒæ—¶å¼€å¯ inspectorï¼Œä¼ å…¥ `--inspect=0`ï¼ˆéšæœºç«¯å£ï¼‰å¹¶ä»Ž `/json/list` è¯»å–å®žé™… URLï¼š
   ```bash
   curl -s http://127.0.0.1:9229/json/list   # lists all inspectable targets on the host
   ```

4. **å­è¿›ç¨‹ã€‚** çˆ¶è¿›ç¨‹ä¸Šçš„ `--inspect` ä¸ä¼š inspect å…¶å­è¿›ç¨‹ã€‚ä½¿ç”¨ `NODE_OPTIONS='--inspect-brk' node parent.js` å°†å…¶ä¼ æ’­åˆ°æ¯ä¸ªå­è¿›ç¨‹ï¼›æ³¨æ„å®ƒä»¬éƒ½éœ€è¦å”¯ä¸€ç«¯å£ï¼ˆç»§æ‰¿ `NODE_OPTIONS='--inspect'` æ—¶ Node ä¼šè‡ªåŠ¨é€’å¢žç«¯å£å·ï¼‰ã€‚

5. **åŽå°è¿›ç¨‹è¢«æ€æ­»ã€‚** åœ¨ç›®æ ‡è¿›ç¨‹æš‚åœæ—¶ `Ctrl+C` é€€å‡º `node inspect`ï¼Œç›®æ ‡è¿›ç¨‹ä¼šä¿æŒæš‚åœçŠ¶æ€ã€‚è¯·å…ˆæ‰§è¡Œ `cont`ï¼Œæˆ–æ˜¾å¼ `kill` ç›®æ ‡è¿›ç¨‹ã€‚

6. **åœ¨ agent ç»ˆç«¯ä¸­è¿è¡Œ `node inspect`ã€‚** å®ƒæ˜¯ä¸€ä¸ª PTY å‹å¥½çš„ REPLã€‚åœ¨ Zed ä¸­ï¼Œä½¿ç”¨ `terminal(pty=true)` æˆ– `background=true` + `process(action='submit', data='...')` å¯åŠ¨å®ƒã€‚éž PTY å‰å°æ¨¡å¼é€‚ç”¨äºŽå•æ¬¡å‘½ä»¤ï¼Œä½†ä¸é€‚åˆäº¤äº’å¼å•æ­¥è°ƒè¯•ã€‚

7. **å®‰å…¨æ€§ã€‚** `--inspect=0.0.0.0:9229` ä¼šæš´éœ²ä»»æ„ä»£ç æ‰§è¡Œèƒ½åŠ›ã€‚é™¤éžå¤„äºŽéš”ç¦»ç½‘ç»œï¼Œå¦åˆ™å§‹ç»ˆç»‘å®šåˆ° `127.0.0.1`ï¼ˆé»˜è®¤å€¼ï¼‰ã€‚

## éªŒè¯æ¸…å•

å»ºç«‹è°ƒè¯•ä¼šè¯åŽï¼ŒéªŒè¯ä»¥ä¸‹å†…å®¹ï¼š

- [ ] `curl -s http://127.0.0.1:9229/json/list` è¿”å›žçš„æ­£æ˜¯é¢„æœŸç›®æ ‡
- [ ] ç¬¬ä¸€ä¸ªæ–­ç‚¹ç¡®å®žå‘½ä¸­ï¼ˆè‹¥æœªå‘½ä¸­ï¼Œå¯èƒ½æ˜¯æ¼åŠ äº† `--inspect-brk`ï¼Œæˆ–é™„åŠ æ—¶æ‰§è¡Œå·²å®Œæˆï¼‰
- [ ] æš‚åœæ—¶çš„æºç åˆ—è¡¨æ˜¾ç¤ºæ­£ç¡®æ–‡ä»¶ï¼ˆä¸åŒ¹é… = sourcemap é—®é¢˜ï¼Œè§é™·é˜± 1ï¼‰
- [ ] åœ¨ `repl` ä¸­æ‰§è¡Œ `exec process.pid` è¿”å›žä½ æƒ³é™„åŠ çš„ PID

## ä¸€é”®é…æ–¹

**"ä¸ºä»€ä¹ˆè¿™ä¸ªå˜é‡åœ¨ç¬¬ X è¡Œæ˜¯ undefinedï¼Ÿ"**
```bash
node --inspect-brk script.js &
node inspect -p $!
# debug>
sb('script.js', X)
cont
# paused. Now:
repl
> myVariable
> Object.keys(this)
```

**"è¿›å…¥è¿™ä¸ªå‡½æ•°çš„è°ƒç”¨è·¯å¾„æ˜¯ä»€ä¹ˆï¼Ÿ"**
```
debug> sb('suspectFn')
debug> cont
# paused on entry
debug> bt
```

**"è¿™ä¸ª async é“¾æŒ‚ä½äº†â€”â€”åœ¨å“ªé‡Œï¼Ÿ"**
```
# Start with --inspect (no -brk), let it run to the hang, then:
debug> pause
debug> bt
# Now you see the stuck frame
```
