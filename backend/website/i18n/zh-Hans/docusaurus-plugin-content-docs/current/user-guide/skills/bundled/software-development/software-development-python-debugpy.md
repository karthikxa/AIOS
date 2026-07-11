---
title: "Python Debugpy â€” è°ƒè¯• Pythonï¼špdb REPL + debugpy è¿œç¨‹ï¼ˆDAPï¼‰"
sidebar_label: "Python Debugpy"
description: "è°ƒè¯• Pythonï¼špdb REPL + debugpy è¿œç¨‹ï¼ˆDAPï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Python Debugpy

è°ƒè¯• Pythonï¼špdb REPL + debugpy è¿œç¨‹ï¼ˆDAPï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/software-development/python-debugpy` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `debugging`, `python`, `pdb`, `debugpy`, `breakpoints`, `dap`, `post-mortem` |
| ç›¸å…³ skill | [`systematic-debugging`](/user-guide/skills/bundled/software-development/software-development-systematic-debugging), [`node-inspect-debugger`](/user-guide/skills/bundled/software-development/software-development-node-inspect-debugger), [`debugging-zed-tui-commands`](/user-guide/skills/bundled/software-development/software-development-debugging-zed-tui-commands) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Python è°ƒè¯•å™¨ï¼ˆpdb + debugpyï¼‰

## æ¦‚è¿°

ä¸‰ç§å·¥å…·ï¼ŒæŒ‰åœºæ™¯é€‰æ‹©ï¼š

| å·¥å…· | é€‚ç”¨åœºæ™¯ |
|---|---|
| **`breakpoint()` + pdb** | æœ¬åœ°ã€äº¤äº’å¼ã€æœ€ç®€å•ã€‚åœ¨æºç ä¸­æ·»åŠ  `breakpoint()`ï¼Œæ­£å¸¸è¿è¡Œï¼Œåœ¨è¯¥è¡Œè¿›å…¥ REPLã€‚ |
| **`python -m pdb`** | æ— éœ€ä¿®æ”¹æºç ï¼Œç›´æŽ¥åœ¨ pdb ä¸‹å¯åŠ¨å·²æœ‰è„šæœ¬ã€‚é€‚åˆå¿«é€ŸæŽ¢æŸ¥ã€‚ |
| **`debugpy`** | è¿œç¨‹ / æ— å¤´ / "é™„åŠ åˆ°å·²è¿è¡Œè¿›ç¨‹"ã€‚ä½¿ç”¨ DAP åè®®ï¼Œå¯ä»Žç»ˆç«¯è„šæœ¬åŒ–æ“ä½œï¼Œé€‚ç”¨äºŽé•¿æœŸè¿è¡Œçš„è¿›ç¨‹ï¼ˆgatewayã€daemonã€PTY å­è¿›ç¨‹ï¼‰ã€‚ |

**ä»Ž `breakpoint()` å¼€å§‹ã€‚** è¿™æ˜¯æœ€ä½Žæˆæœ¬çš„å¯è¡Œæ–¹æ¡ˆã€‚

## ä½¿ç”¨æ—¶æœº

- æµ‹è¯•å¤±è´¥ï¼Œä½† traceback æ— æ³•è¯´æ˜ŽæŸä¸ªå€¼ä¸ºä½•å‡ºé”™
- éœ€è¦é€æ­¥æ‰§è¡ŒæŸä¸ªå‡½æ•°å¹¶è§‚å¯Ÿé›†åˆçš„å˜åŒ–
- é•¿æœŸè¿è¡Œçš„è¿›ç¨‹ï¼ˆzed gatewayã€tui_gatewayï¼‰å‡ºçŽ°å¼‚å¸¸ä¸”æ— æ³•é‡å¯
- äº‹åŽåˆ†æžï¼ˆpost-mortemï¼‰ï¼šå¼‚å¸¸åœ¨ç±»ç”Ÿäº§ä»£ç ä¸­è§¦å‘ï¼Œéœ€è¦æ£€æŸ¥å´©æºƒçŽ°åœºçš„å±€éƒ¨å˜é‡
- å­è¿›ç¨‹ / å­è¿›ç¨‹ï¼ˆPython `_SlashWorker`ã€PTY bridge workerï¼‰æ‰æ˜¯å®žé™…çš„ bug æ‰€åœ¨

**ä¸é€‚ç”¨äºŽï¼š** `print()` / `logging.debug` ä¸€åˆ†é’Ÿå†…èƒ½è§£å†³çš„é—®é¢˜ï¼Œæˆ– `pytest -vv --tb=long --showlocals` å·²ç»èƒ½æ­ç¤ºçš„é—®é¢˜ã€‚

## pdb å¿«é€Ÿå‚è€ƒ

åœ¨ä»»æ„ pdb æç¤ºç¬¦ï¼ˆ`(Pdb)`ï¼‰ä¸‹ï¼š

| å‘½ä»¤ | æ“ä½œ |
|---|---|
| `h` / `h cmd` | å¸®åŠ© |
| `n` | ä¸‹ä¸€è¡Œï¼ˆæ­¥è¿‡ï¼‰ |
| `s` | æ­¥å…¥ |
| `r` | ä»Žå½“å‰å‡½æ•°è¿”å›ž |
| `c` | ç»§ç»­æ‰§è¡Œ |
| `unt N` | ç»§ç»­æ‰§è¡Œç›´åˆ°ç¬¬ N è¡Œ |
| `j N` | è·³è½¬åˆ°ç¬¬ N è¡Œï¼ˆä»…é™åŒä¸€å‡½æ•°ï¼‰ |
| `l` / `ll` | åˆ—å‡ºå½“å‰è¡Œé™„è¿‘çš„æºç  / å®Œæ•´å‡½æ•° |
| `w` | å½“å‰ä½ç½®ï¼ˆè°ƒç”¨æ ˆè·Ÿè¸ªï¼‰ |
| `u` / `d` | åœ¨è°ƒç”¨æ ˆä¸­ä¸Šç§» / ä¸‹ç§» |
| `a` | æ‰“å°å½“å‰å‡½æ•°çš„å‚æ•° |
| `p expr` / `pp expr` | æ‰“å° / æ ¼å¼åŒ–æ‰“å°è¡¨è¾¾å¼ |
| `display expr` | æ¯æ¬¡åœæ­¢æ—¶è‡ªåŠ¨æ‰“å° expr |
| `b file:line` | è®¾ç½®æ–­ç‚¹ |
| `b func` | åœ¨å‡½æ•°å…¥å£å¤„æ–­ç‚¹ |
| `b file:line, cond` | æ¡ä»¶æ–­ç‚¹ |
| `cl N` | æ¸…é™¤æ–­ç‚¹ N |
| `tbreak file:line` | ä¸€æ¬¡æ€§æ–­ç‚¹ |
| `!stmt` | æ‰§è¡Œä»»æ„ Python è¯­å¥ï¼ˆåŒ…æ‹¬èµ‹å€¼ï¼‰ |
| `interact` | åœ¨å½“å‰ä½œç”¨åŸŸä¸­è¿›å…¥å®Œæ•´ Python REPLï¼ˆCtrl+D é€€å‡ºï¼‰ |
| `q` | é€€å‡º |

`interact` å‘½ä»¤æœ€ä¸ºå¼ºå¤§â€”â€”å¯ä»¥å¯¼å…¥ä»»ä½•æ¨¡å—ã€æ£€æŸ¥å¤æ‚å¯¹è±¡ï¼Œç”šè‡³è°ƒç”¨ä¼šæ”¹å˜çŠ¶æ€çš„æ–¹æ³•ã€‚å±€éƒ¨å˜é‡é»˜è®¤åªè¯»ï¼›åœ¨ `(Pdb)` æç¤ºç¬¦ä¸‹ä½¿ç”¨ `!x = 42` è¿›è¡Œä¿®æ”¹ã€‚

## æ–¹æ¡ˆ 1ï¼šæœ¬åœ°æ–­ç‚¹

æœ€ç®€å•ã€‚ç¼–è¾‘æ–‡ä»¶ï¼š

```python
def compute(x, y):
    result = some_helper(x)
    breakpoint()           # <-- åœ¨æ­¤å¤„è¿›å…¥ pdb
    return result + y
```

æ­£å¸¸è¿è¡Œä»£ç ã€‚ä½ å°†åœ¨ `breakpoint()` æ‰€åœ¨è¡Œåœä¸‹ï¼Œå¯å®Œæ•´è®¿é—®å±€éƒ¨å˜é‡ã€‚

**æäº¤å‰åŠ¡å¿…åˆ é™¤ `breakpoint()`ã€‚** ä½¿ç”¨ `git diff` æˆ– pre-commit grepï¼š
```bash
rg -n 'breakpoint\(\)' --type py
```

## æ–¹æ¡ˆ 2ï¼šåœ¨ pdb ä¸‹å¯åŠ¨è„šæœ¬ï¼ˆæ— éœ€ä¿®æ”¹æºç ï¼‰

```bash
python -m pdb path/to/script.py arg1 arg2
# åœåœ¨è„šæœ¬ç¬¬ä¸€è¡Œ
(Pdb) b path/to/script.py:42
(Pdb) c
```

## æ–¹æ¡ˆ 3ï¼šè°ƒè¯• pytest æµ‹è¯•

zed æµ‹è¯•è¿è¡Œå™¨å’Œ pytest å‡æ”¯æŒä»¥ä¸‹æ–¹å¼ï¼š

```bash
# åœ¨å¤±è´¥æ—¶ï¼ˆæˆ–ä»»ä½•å¼‚å¸¸æŠ›å‡ºæ—¶ï¼‰è¿›å…¥ pdbï¼š
scripts/run_tests.sh tests/path/to/test_file.py::test_name --pdb

# åœ¨æµ‹è¯•å¼€å§‹æ—¶è¿›å…¥ pdbï¼š
scripts/run_tests.sh tests/path/to/test_file.py::test_name --trace

# åœ¨ traceback ä¸­æ˜¾ç¤ºå±€éƒ¨å˜é‡ï¼Œä¸ä½¿ç”¨ pdbï¼š
scripts/run_tests.sh tests/path/to/test_file.py --showlocals --tb=long
```

æ³¨æ„ï¼š`scripts/run_tests.sh` é»˜è®¤ä½¿ç”¨ xdistï¼ˆ`-n 4`ï¼‰ï¼Œpdb åœ¨ xdist ä¸‹**æ— æ³•æ­£å¸¸å·¥ä½œ**ã€‚è¯·æ·»åŠ  `-p no:xdist` æˆ–ä½¿ç”¨ `-n 0` è¿è¡Œå•ä¸ªæµ‹è¯•ï¼š

```bash
scripts/run_tests.sh tests/foo_test.py::test_bar --pdb -p no:xdist
# æˆ–
source .venv/bin/activate
python -m pytest tests/foo_test.py::test_bar --pdb
```

è¿™ä¼šç»•è¿‡å°é—­çŽ¯å¢ƒä¿è¯â€”â€”è°ƒè¯•æ—¶å¯ä»¥æŽ¥å—ï¼Œä½†æŽ¨é€å‰è¯·åœ¨ wrapper ä¸‹é‡æ–°è¿è¡Œä»¥ç¡®è®¤ã€‚

## æ–¹æ¡ˆ 4ï¼šå¯¹ä»»æ„å¼‚å¸¸è¿›è¡Œäº‹åŽåˆ†æž

```python
import pdb, sys
try:
    run_the_thing()
except Exception:
    pdb.post_mortem(sys.exc_info()[2])
```

æˆ–å¯¹æ•´ä¸ªè„šæœ¬è¿›è¡ŒåŒ…è£…ï¼š

```bash
python -m pdb -c continue script.py
# å´©æºƒæ—¶ï¼Œpdb æ•èŽ·å¼‚å¸¸å¹¶åœåœ¨å¼‚å¸¸æ‰€åœ¨å¸§
```

æˆ–åœ¨ repl/jupyter ä¸­è®¾ç½®å…¨å±€ hookï¼š

```python
import sys
def excepthook(etype, value, tb):
    import pdb; pdb.post_mortem(tb)
sys.excepthook = excepthook
```

## æ–¹æ¡ˆ 5ï¼šä½¿ç”¨ debugpy è¿›è¡Œè¿œç¨‹è°ƒè¯•ï¼ˆé™„åŠ åˆ°è¿è¡Œä¸­çš„è¿›ç¨‹ï¼‰

é€‚ç”¨äºŽé•¿æœŸè¿è¡Œçš„è¿›ç¨‹ï¼šZed gatewayã€tui_gatewayã€daemonï¼Œæˆ–å·²å‡ºçŽ°å¼‚å¸¸ä¸”æ— æ³•å¹²å‡€é‡å¯çš„è¿›ç¨‹ã€‚

### å®‰è£…

```bash
source /home/bb/zed-agent/.venv/bin/activate
pip install debugpy
```

### æ¨¡å¼ Aï¼šä¿®æ”¹æºç â€”â€”è¿›ç¨‹åœ¨å¯åŠ¨æ—¶ç­‰å¾…è°ƒè¯•å™¨

åœ¨å…¥å£ç‚¹é¡¶éƒ¨é™„è¿‘ï¼ˆæˆ–è¦è°ƒè¯•çš„å‡½æ•°å†…éƒ¨ï¼‰æ·»åŠ ï¼š

```python
import debugpy
debugpy.listen(("127.0.0.1", 5678))
print("debugpy listening on 5678, waiting for client...", flush=True)
debugpy.wait_for_client()
debugpy.breakpoint()       # å¯é€‰ï¼šé™„åŠ åŽç«‹å³æš‚åœ
```

å¯åŠ¨è¿›ç¨‹ï¼›å®ƒå°†é˜»å¡žåœ¨ `wait_for_client()`ã€‚

### æ¨¡å¼ Bï¼šæ— éœ€ä¿®æ”¹æºç â€”â€”ä½¿ç”¨ `-m debugpy` å¯åŠ¨

```bash
python -m debugpy --listen 127.0.0.1:5678 --wait-for-client your_script.py arg1
```

æ¨¡å—å…¥å£çš„ç­‰æ•ˆå†™æ³•ï¼š

```bash
python -m debugpy --listen 127.0.0.1:5678 --wait-for-client -m your.module
```

### æ¨¡å¼ Cï¼šé™„åŠ åˆ°å·²è¿è¡Œçš„è¿›ç¨‹

éœ€è¦ PID ä»¥åŠåœ¨ç›®æ ‡çŽ¯å¢ƒä¸­é¢„è£… debugpyï¼š

```bash
python -m debugpy --listen 127.0.0.1:5678 --pid <pid>
# debugpy æ³¨å…¥åˆ°ç›®æ ‡è¿›ç¨‹ä¸­ï¼Œç„¶åŽæŒ‰ä»¥ä¸‹æ–¹å¼è¿žæŽ¥å®¢æˆ·ç«¯ã€‚
```

æŸäº›å†…æ ¸ / å®‰å…¨é…ç½®ä¼šé˜»æ­¢åŸºäºŽ ptrace çš„æ³¨å…¥ï¼ˆ`/proc/sys/kernel/yama/ptrace_scope`ï¼‰ã€‚ä¿®å¤æ–¹æ³•ï¼š
```bash
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
```

### ä»Žç»ˆç«¯è¿žæŽ¥å®¢æˆ·ç«¯

æœ€ç®€ä¾¿çš„ç»ˆç«¯ä¾§ DAP å®¢æˆ·ç«¯æ˜¯ VS Code CLI æˆ–ä¸€ä¸ªå°è„šæœ¬ã€‚åœ¨ Zed å†…éƒ¨æœ‰ä¸¤ä¸ªå®žç”¨é€‰é¡¹ï¼š

**é€‰é¡¹ 1ï¼š`debugpy` è‡ªå¸¦ CLI REPL** â€” å¹¶éžå®˜æ–¹åŠŸèƒ½ï¼Œè€Œæ˜¯ä¸€ä¸ªå°åž‹ DAP å®¢æˆ·ç«¯è„šæœ¬ï¼š

```python
# /tmp/dap_client.py
import socket, json, itertools, time, sys

HOST, PORT = "127.0.0.1", 5678
s = socket.create_connection((HOST, PORT))
seq = itertools.count(1)

def send(msg):
    msg["seq"] = next(seq)
    body = json.dumps(msg).encode()
    s.sendall(f"Content-Length: {len(body)}\r\n\r\n".encode() + body)

def recv():
    header = b""
    while b"\r\n\r\n" not in header:
        header += s.recv(1)
    length = int(header.decode().split("Content-Length:")[1].split("\r\n")[0].strip())
    body = b""
    while len(body) < length:
        body += s.recv(length - len(body))
    return json.loads(body)

send({"type": "request", "command": "initialize", "arguments": {"adapterID": "python"}})
print(recv())
send({"type": "request", "command": "attach", "arguments": {}})
print(recv())
send({"type": "request", "command": "setBreakpoints",
      "arguments": {"source": {"path": sys.argv[1]},
                    "breakpoints": [{"line": int(sys.argv[2])}]}})
print(recv())
send({"type": "request", "command": "configurationDone"})
# ... å¾ªçŽ¯è¯»å–äº‹ä»¶å¹¶å‘é€ continue/stepIn ç­‰å‘½ä»¤
```

ç”¨äºŽä¸€æ¬¡æ€§è‡ªåŠ¨åŒ–å°šå¯ï¼Œä½†ä½œä¸ºäº¤äº’å¼ UX ä½“éªŒè¾ƒå·®ã€‚

**é€‰é¡¹ 2ï¼šä»Ž VS Code / Cursor / Zed é™„åŠ ** â€” å¦‚æžœç”¨æˆ·å·²æ‰“å¼€å…¶ä¸­ä¸€ä¸ªï¼Œå¯æ·»åŠ  `launch.json`ï¼š

```json
{
  "name": "Attach to Zed",
  "type": "debugpy",
  "request": "attach",
  "connect": { "host": "127.0.0.1", "port": 5678 },
  "justMyCode": false,
  "pathMappings": [
    { "localRoot": "${workspaceFolder}", "remoteRoot": "/home/bb/zed-agent" }
  ]
}
```

**é€‰é¡¹ 3ï¼šæ”¾å¼ƒ DAPï¼Œä½¿ç”¨ `remote-pdb`** â€” é€šå¸¸è¿™æ‰æ˜¯ç»ˆç«¯ agent çœŸæ­£éœ€è¦çš„ï¼š

```bash
pip install remote-pdb
```

åœ¨ä»£ç ä¸­ï¼š
```python
from remote_pdb import set_trace
set_trace(host="127.0.0.1", port=4444)   # é˜»å¡žç›´åˆ°è¿žæŽ¥
```

ç„¶åŽåœ¨ç»ˆç«¯ä¸­ï¼š
```bash
nc 127.0.0.1 4444
# èŽ·å¾—ä¸€ä¸ª (Pdb) æç¤ºç¬¦ï¼Œä¸Žæœ¬åœ°è°ƒè¯•å®Œå…¨ä¸€è‡´ã€‚
```

å½“ `debugpy` çš„ DAP åè®®è¿‡äºŽç¹é‡æ—¶ï¼Œ`remote-pdb` æ˜¯æœ€é€‚åˆ agent çš„é€‰æ‹©ã€‚ä»…åœ¨ç¡®å®žéœ€è¦ IDE é›†æˆæ—¶æ‰ä½¿ç”¨ `debugpy`ã€‚

## è°ƒè¯• Zed ç‰¹å®šè¿›ç¨‹

### æµ‹è¯•
å‚è§æ–¹æ¡ˆ 3ã€‚å§‹ç»ˆæ·»åŠ  `-p no:xdist` æˆ–åœ¨ä¸ä½¿ç”¨ xdist çš„æƒ…å†µä¸‹è¿è¡Œå•ä¸ªæµ‹è¯•ã€‚

### `run_agent.py` / CLI â€” ä¸€æ¬¡æ€§è¿è¡Œ
æœ€ç®€å•ï¼šåœ¨å¯ç–‘è¡Œé™„è¿‘æ·»åŠ  `breakpoint()`ï¼Œç„¶åŽæ­£å¸¸è¿è¡Œ `zed`ã€‚æŽ§åˆ¶æƒå°†åœ¨æš‚åœç‚¹è¿”å›žåˆ°ä½ çš„ç»ˆç«¯ã€‚

### `tui_gateway` å­è¿›ç¨‹ï¼ˆç”± `zed --tui` å¯åŠ¨ï¼‰
gateway ä½œä¸º Node TUI çš„å­è¿›ç¨‹è¿è¡Œã€‚å¯é€‰æ–¹æ¡ˆï¼š

**A. ä¿®æ”¹ gateway æºç ï¼š**
```python
# tui_gateway/server.pyï¼Œåœ¨ serve() é¡¶éƒ¨é™„è¿‘
import debugpy
debugpy.listen(("127.0.0.1", 5678))
debugpy.wait_for_client()
```
å¯åŠ¨ `zed --tui`ã€‚TUI å°†æ˜¾ç¤ºä¸ºå†»ç»“çŠ¶æ€ï¼ˆå…¶åŽç«¯æ­£åœ¨ç­‰å¾…ï¼‰ã€‚é™„åŠ å®¢æˆ·ç«¯åŽï¼Œæ‰§è¡Œåœ¨ä½  `continue` æ—¶æ¢å¤ã€‚

**B. åœ¨ç‰¹å®šå¤„ç†å™¨ä¸­ä½¿ç”¨ `remote-pdb`ï¼š**
```python
from remote_pdb import set_trace
set_trace(host="127.0.0.1", port=4444)   # åœ¨ä½ æƒ³æ•èŽ·çš„ RPC å¤„ç†å™¨ä¸­
```
ä»Ž TUI è§¦å‘å¯¹åº”çš„ slash å‘½ä»¤ï¼Œç„¶åŽåœ¨å¦ä¸€ä¸ªç»ˆç«¯ä¸­æ‰§è¡Œ `nc 127.0.0.1 4444`ã€‚

### `_SlashWorker` å­è¿›ç¨‹
ç›¸åŒæ¨¡å¼â€”â€”åœ¨ worker çš„ `exec` è·¯å¾„ä¸­ä½¿ç”¨ `remote-pdb` çš„ `set_trace()`ã€‚è¯¥ worker åœ¨å¤šæ¬¡ slash å‘½ä»¤é—´æŒç»­å­˜åœ¨ï¼Œå› æ­¤ç¬¬ä¸€æ¬¡è§¦å‘ä¼šé˜»å¡žç›´åˆ°ä½ è¿žæŽ¥ï¼›åŽç»­ slash å‘½ä»¤æ­£å¸¸é€šè¿‡ï¼Œé™¤éžä½ é‡æ–°è®¾ç½®æ–­ç‚¹ã€‚

### Gatewayï¼ˆ`gateway/run.py`ï¼‰
é•¿æœŸè¿è¡Œã€‚åœ¨å¤„ç†å™¨ä¸­ä½¿ç”¨ `remote-pdb`ï¼Œæˆ–è€…å¦‚æžœä½ æœ¬æ¥å°±è¦é‡å¯ gatewayï¼Œåˆ™ä½¿ç”¨å¸¦ `--wait-for-client` çš„ `debugpy`ã€‚

## å¸¸è§é™·é˜±

1. **pdb åœ¨ pytest-xdist ä¸‹é™é»˜å¤±æ•ˆã€‚** ä½ ä¸ä¼šçœ‹åˆ°æç¤ºç¬¦ï¼Œæµ‹è¯•åªä¼šæŒ‚èµ·ã€‚å§‹ç»ˆä½¿ç”¨ `-p no:xdist` æˆ– `-n 0`ã€‚

2. **`breakpoint()` åœ¨ CI / éž TTY çŽ¯å¢ƒä¸­ä¼šæŒ‚èµ·è¿›ç¨‹ã€‚** æœ¬åœ°ä½¿ç”¨æ²¡é—®é¢˜ï¼›æ°¸è¿œä¸è¦æäº¤å®ƒã€‚æ·»åŠ  pre-commit grep ä½œä¸ºå®‰å…¨ç½‘ã€‚

3. **`PYTHONBREAKPOINT=0`** ä¼šç¦ç”¨æ‰€æœ‰ `breakpoint()` è°ƒç”¨ã€‚å¦‚æžœæ–­ç‚¹æœªè§¦å‘ï¼Œè¯·æ£€æŸ¥çŽ¯å¢ƒå˜é‡ï¼š
   ```bash
   echo $PYTHONBREAKPOINT
   ```

4. **`debugpy.listen` ä»…åœ¨åŒæ—¶è°ƒç”¨ `wait_for_client()` æ—¶æ‰ä¼šé˜»å¡žã€‚** ä¸è°ƒç”¨çš„è¯ï¼Œæ‰§è¡Œä¼šç»§ç»­ï¼Œä½ çš„ç¬¬ä¸€ä¸ªæ–­ç‚¹å¯èƒ½åœ¨å®¢æˆ·ç«¯é™„åŠ ä¹‹å‰å°±å·²è§¦å‘ã€‚

5. **åœ¨åŠ å›ºå†…æ ¸ä¸Šé™„åŠ åˆ° PID ä¼šå¤±è´¥ã€‚** `ptrace_scope=1`ï¼ˆUbuntu é»˜è®¤å€¼ï¼‰ä»…å…è®¸å¯¹åŒç”¨æˆ·çš„å­è¿›ç¨‹è¿›è¡Œ ptraceã€‚è§£å†³æ–¹æ³•ï¼š`echo 0 > /proc/sys/kernel/yama/ptrace_scope`ï¼ˆéœ€è¦ root æƒé™ï¼‰ï¼Œæˆ–ä»Žä¸€å¼€å§‹å°±åœ¨ `debugpy` ä¸‹å¯åŠ¨ã€‚

6. **çº¿ç¨‹ã€‚** `pdb` åªè°ƒè¯•å½“å‰çº¿ç¨‹ã€‚å¯¹äºŽå¤šçº¿ç¨‹ä»£ç ï¼Œä½¿ç”¨ `debugpy`ï¼ˆæ”¯æŒçº¿ç¨‹æ„ŸçŸ¥çš„ DAPï¼‰æˆ–ä¸ºæ¯ä¸ªçº¿ç¨‹è®¾ç½® `threading.settrace()`ã€‚

7. **asyncioã€‚** `pdb` å¯åœ¨åç¨‹ä¸­å·¥ä½œï¼Œä½†åœ¨ pdb å†…éƒ¨ä½¿ç”¨ `await` éœ€è¦ Python 3.13+ æˆ–åœ¨æ—§ç‰ˆæœ¬çš„ `interact` æ¨¡å¼ä¸‹ä½¿ç”¨ `await`ã€‚å¯¹äºŽ 3.11/3.12ï¼Œä½¿ç”¨ `asyncio.run_coroutine_threadsafe` æŠ€å·§ï¼Œæˆ–é€šè¿‡ `asyncio.ensure_future` é…åˆ `!stmt` æ–¹å¼è¿›è¡Œ awaitã€‚

8. **`scripts/run_tests.sh` ä¼šå‰¥ç¦»å‡­æ®å¹¶è®¾ç½® `HOME=<tmpdir>`ã€‚** å¦‚æžœä½ çš„ bug ä¾èµ–ç”¨æˆ·é…ç½®æˆ–çœŸå®ž API å¯†é’¥ï¼Œåœ¨ wrapper ä¸‹å°†æ— æ³•å¤çŽ°ã€‚å…ˆç”¨åŽŸå§‹ `pytest` å¤çŽ°ï¼Œå†åœ¨ wrapper ä¸‹ç¡®è®¤ã€‚

9. **fork / å¤šè¿›ç¨‹ã€‚** pdb ä¸ä¼šè·Ÿéš forkã€‚æ¯ä¸ªå­è¿›ç¨‹éœ€è¦è‡ªå·±çš„ `breakpoint()` æˆ– `set_trace()`ã€‚å¯¹äºŽ Zed å­ agentï¼Œæ¯æ¬¡åªè°ƒè¯•ä¸€ä¸ªè¿›ç¨‹ã€‚

## éªŒè¯æ¸…å•

- [ ] `pip install debugpy` åŽç¡®è®¤ï¼š`python -c "import debugpy; print(debugpy.__version__)"`
- [ ] å¯¹äºŽè¿œç¨‹è°ƒè¯•ï¼Œç¡®è®¤ç«¯å£ç¡®å®žåœ¨ç›‘å¬ï¼š`ss -tlnp | grep 5678`
- [ ] ç¬¬ä¸€ä¸ªæ–­ç‚¹ç¡®å®žè§¦å‘ï¼ˆå¦‚æžœæ²¡æœ‰ï¼Œå¯èƒ½æ˜¯ `PYTHONBREAKPOINT=0`ã€åœ¨ xdist ä¸‹è¿è¡Œï¼Œæˆ–æ‰§è¡Œåœ¨é™„åŠ å‰å·²ç»“æŸï¼‰
- [ ] `where` / `w` æ˜¾ç¤ºé¢„æœŸçš„è°ƒç”¨æ ˆ
- [ ] è°ƒè¯•åŽæ¸…ç†ï¼šå·²æäº¤ä»£ç ä¸­æ— æ®‹ç•™çš„ `breakpoint()` / `set_trace()` / `debugpy.listen`
  ```bash
  rg -n 'breakpoint\(\)|set_trace\(|debugpy\.listen' --type py
  ```

## ä¸€æ¬¡æ€§é€ŸæŸ¥æ–¹æ¡ˆ

**"ä¸ºä»€ä¹ˆè¿™ä¸ª dict ç¼ºå°‘æŸä¸ªé”®ï¼Ÿ"**
```python
# åœ¨ KeyError å‘ç”Ÿå¤„ä¸Šæ–¹æ·»åŠ 
breakpoint()
# ç„¶åŽåœ¨ pdb ä¸­ï¼š
(Pdb) pp d
(Pdb) pp list(d.keys())
(Pdb) w                # æˆ‘ä»¬æ˜¯æ€Žä¹ˆåˆ°è¿™é‡Œçš„
```

**"è¿™ä¸ªæµ‹è¯•å•ç‹¬è¿è¡Œé€šè¿‡ï¼Œä½†åœ¨æµ‹è¯•å¥—ä»¶ä¸­å¤±è´¥ã€‚"**
```bash
scripts/run_tests.sh tests/the_test.py --pdb -p no:xdist
# ä½†å¦‚æžœåªæœ‰ä¸Žå…¶ä»–æµ‹è¯•ä¸€èµ·è¿è¡Œæ‰å¤±è´¥ï¼š
source .venv/bin/activate
python -m pytest tests/ -x --pdb -p no:xdist
# çŽ°åœ¨å®ƒä¼šåœ¨çŠ¶æ€ç§¯ç´¯åŽçš„ç¡®åˆ‡å¤±è´¥æµ‹è¯•å¤„è§¦å‘ pdbã€‚
```

**"æˆ‘çš„å¼‚æ­¥å¤„ç†å™¨å‘ç”Ÿæ­»é”ã€‚"**
```python
# åœ¨å¤„ç†å™¨å…¥å£å¤„æ·»åŠ 
import remote_pdb; remote_pdb.set_trace(host="127.0.0.1", port=4444)
```
è§¦å‘å¤„ç†å™¨ã€‚æ‰§è¡Œ `nc 127.0.0.1 4444`ï¼Œç„¶åŽç”¨ `w` æŸ¥çœ‹æŒ‚èµ·çš„å¸§ï¼Œç”¨ `!import asyncio; asyncio.all_tasks()` æŸ¥çœ‹å…¶ä»–å¾…å¤„ç†ä»»åŠ¡ã€‚

**"å¯¹ Ink å­è¿›ç¨‹ / subprocess ä¸­çš„å´©æºƒè¿›è¡Œäº‹åŽåˆ†æžã€‚"**
```bash
PYTHONFAULTHANDLER=1 python -m pdb -c continue path/to/entrypoint.py
# å´©æºƒæ—¶ï¼Œpdb åœåœ¨å¼‚å¸¸æ‰€åœ¨å¸§ï¼Œå¯è®¿é—®å®Œæ•´å±€éƒ¨å˜é‡
```
