---
title: "Pinggy Tunnel â€” é€šè¿‡ Pinggy å®žçŽ°é›¶å®‰è£… SSH localhost éš§é“"
sidebar_label: "Pinggy Tunnel"
description: "é€šè¿‡ Pinggy å®žçŽ°é›¶å®‰è£… SSH localhost éš§é“"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Pinggy Tunnel

é€šè¿‡ Pinggy å®žçŽ°é›¶å®‰è£… SSH localhost éš§é“ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/devops/pinggy-tunnel` å®‰è£… |
| è·¯å¾„ | `optional-skills/devops/pinggy-tunnel` |
| ç‰ˆæœ¬ | `0.1.0` |
| ä½œè€… | Teknium (teknium1), Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Pinggy`, `Tunnel`, `Networking`, `SSH`, `Webhook`, `Localhost` |
| ç›¸å…³ skill | `cloudflared-quick-tunnel`, [`webhook-subscriptions`](/user-guide/skills/bundled/devops/devops-webhook-subscriptions) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Pinggy Tunnel Skill

ä½¿ç”¨ Pinggy SSH åå‘éš§é“å°†æœ¬åœ°æœåŠ¡ï¼ˆå¼€å‘æœåŠ¡å™¨ã€webhook æŽ¥æ”¶å™¨ã€MCP ç«¯ç‚¹ã€æ¼”ç¤ºï¼‰æš´éœ²åˆ°å…¬å…±äº’è”ç½‘ã€‚æ— éœ€å®‰è£…ä»»ä½•å®ˆæŠ¤è¿›ç¨‹â€”â€”ç”¨æˆ·çš„æ ‡å‡† SSH å®¢æˆ·ç«¯è¿žæŽ¥åˆ° `a.pinggy.io:443`ï¼ŒPinggy è¿”å›žä¸€ä¸ªå…¬å…± HTTP/HTTPS URLã€‚

å…è´¹å¥—é¤ï¼š60 åˆ†é’Ÿéš§é“ï¼Œéšæœºå­åŸŸåï¼Œæ— éœ€æ³¨å†Œã€‚Pro å¥—é¤ï¼ˆ$3/æœˆï¼‰éœ€è¦ tokenï¼ŒæŒ‰éœ€é€‰ç”¨ã€‚

## ä½¿ç”¨æ—¶æœº

- ç”¨æˆ·è¦æ±‚"æš´éœ²æœ¬åœ°æœåŠ¡"ã€"åˆ†äº«æˆ‘çš„å¼€å‘æœåŠ¡å™¨"ã€"å°†æ­¤ URL å…¬å¼€"ã€"éš§é“ç«¯å£ N"ã€"ä¸º webhook èŽ·å–å…¬å…± URL"
- åœ¨æœ¬åœ°ä»»åŠ¡æœŸé—´éœ€è¦æŽ¥æ”¶ webhook å›žè°ƒï¼ˆStripeã€GitHubã€Discordã€AgentMailï¼‰
- ä¸Žè¿œç¨‹æ–¹åˆ†äº«ä¸€æ¬¡æ€§ HTTP æ¼”ç¤ºï¼ˆMCP æœåŠ¡å™¨ã€Ollama/vLLM ç«¯ç‚¹ã€ä»ªè¡¨ç›˜ï¼‰
- ä¸»æœºæœ‰ SSH ä½†æ²¡æœ‰ `cloudflared` / `ngrok` äºŒè¿›åˆ¶æ–‡ä»¶ï¼Œå®‰è£…ä¸€ä¸ªåˆæ˜¾å¾—å¤šä½™

å¦‚æžœä¸»æœºå·²é…ç½® `cloudflared`ï¼Œä¼˜å…ˆä½¿ç”¨ `cloudflared-quick-tunnel` skillâ€”â€”Cloudflare å¿«é€Ÿéš§é“ä¸ä¼šåœ¨ 60 åˆ†é’ŸåŽè¿‡æœŸã€‚

## å‰ææ¡ä»¶

- PATH ä¸­æœ‰ `ssh`ï¼ˆ`ssh -V`ï¼‰ã€‚Linuxã€macOS å’Œ Windows 10+ é»˜è®¤è‡ªå¸¦ã€‚æ— éœ€å…¶ä»–å®‰è£…ã€‚
- éš§é“å¯åŠ¨å‰ï¼Œæœ¬åœ°æœåŠ¡å·²åœ¨ `127.0.0.1:<port>` ä¸Šç›‘å¬ã€‚Pinggy ä¼šè¿”å›ž URLï¼Œä½†åœ¨æœ¬åœ°æºæœåŠ¡å¯åŠ¨ä¹‹å‰è®¿é—®ä¼šè¿”å›ž 502ã€‚

å¯é€‰ï¼š

- `PINGGY_TOKEN` çŽ¯å¢ƒå˜é‡ï¼Œç”¨äºŽä»˜è´¹ Pro åŠŸèƒ½ï¼ˆæŒä¹…å­åŸŸåã€è‡ªå®šä¹‰åŸŸåã€å¤šéš§é“ã€æ—  60 åˆ†é’Ÿé™åˆ¶ï¼‰ã€‚å…è´¹å¥—é¤æ— éœ€å‡­æ®ã€‚

## å¿«é€Ÿå‚è€ƒ

```bash
# ç«¯å£ 8000 çš„æ™®é€š HTTP/HTTPS éš§é“ï¼ˆå…è´¹å¥—é¤ï¼‰
ssh -p 443 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 \
    -R0:localhost:8000 free@a.pinggy.io

# TCP éš§é“ï¼ˆæ•°æ®åº“ã€åŽŸå§‹ SSH ç­‰ï¼‰
ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:5432 tcp@a.pinggy.io

# TLS éš§é“ï¼ˆPinggy æ— æ³•è§£å¯†â€”â€”åœ¨æºç«¯è‡ªå¸¦è¯ä¹¦ï¼‰
ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:443 tls@a.pinggy.io

# Basic auth è®¤è¯ï¼ˆb:user:passï¼‰
ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:8000 \
    "b:admin:secret+free@a.pinggy.io"

# Bearer token è®¤è¯ï¼ˆk:tokenï¼‰
ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:8000 \
    "k:mysecrettoken+free@a.pinggy.io"

# IP ç™½åå•ï¼ˆw:CIDRï¼‰
ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:8000 \
    "w:203.0.113.0/24+free@a.pinggy.io"

# å¯ç”¨ CORS + å¼ºåˆ¶ HTTPS é‡å®šå‘
ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:8000 \
    "co+x:https+free@a.pinggy.io"

# Pro å¥—é¤ï¼ˆæŒä¹… URLï¼Œæ—  60 åˆ†é’Ÿé™åˆ¶ï¼‰
ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:8000 "$PINGGY_TOKEN+a.pinggy.io"
```

## æ“ä½œæµç¨‹â€”â€”å¯åŠ¨éš§é“å¹¶èŽ·å– URL

æ¨¡åž‹åº”ä½¿ç”¨ `terminal` å·¥å…·ã€‚éš§é“åœ¨å…±äº«æœŸé—´å¿…é¡»ä¿æŒå­˜æ´»ï¼Œå› æ­¤ä»¥åŽå°è¿›ç¨‹æ–¹å¼è¿è¡Œï¼Œå¹¶ä»Ž stdout è§£æžå…¬å…± URLã€‚

### 1. ç¡®è®¤æœ¬åœ°æºæœåŠ¡å·²å¯åŠ¨

```bash
curl -sI http://127.0.0.1:8000/ | head -1
# æœŸæœ›è¿”å›ž HTTP/1.x 200ï¼ˆæˆ–ä»»ä½•éžè¿žæŽ¥æ‹’ç»çš„å“åº”ï¼‰
```

å¦‚æžœå°šæ— æœåŠ¡åœ¨ç›‘å¬ï¼Œå…ˆå¯åŠ¨å®ƒï¼ˆä¾‹å¦‚ `python3 -m http.server 8000 --bind 127.0.0.1`ï¼‰ã€‚Pinggy ä¼šæ­£å¸¸è¿”å›ž URLï¼Œä½†åœ¨æœ¬åœ°æºæœåŠ¡å¯åŠ¨ä¹‹å‰ç”¨æˆ·ä¼šçœ‹åˆ° 502ã€‚

### 2. ä»¥åŽå°è¿›ç¨‹æ–¹å¼å¯åŠ¨éš§é“

ä½¿ç”¨ `terminal(background=True)` å¹¶å°†è¾“å‡ºæ•èŽ·åˆ°æ—¥å¿—æ–‡ä»¶ï¼ˆPinggy åœ¨ stdout æ‰“å° URL åŽä¿æŒè¿žæŽ¥ï¼‰ï¼š

```bash
LOG=/tmp/pinggy-8000.log
nohup ssh -p 443 \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -o ServerAliveInterval=30 \
    -o ServerAliveCountMax=3 \
    -R0:localhost:8000 free@a.pinggy.io \
    > "$LOG" 2>&1 &
echo $! > /tmp/pinggy-8000.pid
```

`StrictHostKeyChecking=no` + `UserKnownHostsFile=/dev/null` è·³è¿‡é¦–æ¬¡è¿è¡Œçš„ä¸»æœºå¯†é’¥ç¡®è®¤æç¤ºã€‚`ServerAliveInterval=30` é˜²æ­¢ SSH ä¼šè¯å› ç©ºé—² NAT è€Œè¢«æ–­å¼€ã€‚

### 3. ä»Žæ—¥å¿—ä¸­è§£æž URL

```bash
sleep 4
grep -oE 'https://[a-z0-9-]+\.[a-z]+\.pinggy\.link' /tmp/pinggy-8000.log | head -1
```

é¢„æœŸè¾“å‡ºå¦‚ä¸‹ï¼š

```
You are not authenticated.
Your tunnel will expire in 60 minutes.
http://yqycl-98-162-69-48.a.free.pinggy.link
https://yqycl-98-162-69-48.a.free.pinggy.link
```

å°† `https://...pinggy.link` URL æä¾›ç»™ç”¨æˆ·ã€‚

### 4. éªŒè¯

```bash
curl -sI https://<the-url>/ | head -3
# æœŸæœ›è¿”å›ž 200/302/æœ¬åœ°æºæœåŠ¡å®žé™…è¿”å›žçš„çŠ¶æ€ç 
```

å¦‚æžœè¿”å›ž `502 Bad Gateway`ï¼Œè¯´æ˜Ž SSH ä¼šè¯å·²å»ºç«‹ä½†æœ¬åœ°æºæœåŠ¡æœªåœ¨ç›‘å¬â€”â€”å…ˆä¿®å¤æ­¥éª¤ 1ã€‚

### 5. å…³é—­éš§é“

```bash
kill "$(cat /tmp/pinggy-8000.pid)"
# æˆ–è€…ï¼Œå¦‚æžœ pid æ–‡ä»¶ä¸¢å¤±ï¼š
pkill -f 'ssh -p 443 .* free@a\.pinggy\.io'
```

å¦‚æžœæœ‰æ¥è‡ª `terminal(background=True)` çš„ session_idï¼Œä¼˜å…ˆä½¿ç”¨ `process(action='kill', session_id=...)`ã€‚

## é€šè¿‡ç”¨æˆ·åå…³é”®å­—è¿›è¡Œè®¿é—®æŽ§åˆ¶

Pinggy å°†æŽ§åˆ¶æ ‡å¿—ä»¥ `+` åˆ†éš”å †å åˆ° SSH ç”¨æˆ·åä¸­ã€‚å½“ `user@host` å‚æ•°åŒ…å« `+` æ—¶ï¼Œå§‹ç»ˆç”¨å¼•å·æ‹¬èµ·æ•´ä¸ªå‚æ•°ï¼š

| å…³é”®å­— | æ•ˆæžœ |
|---------|--------|
| `b:user:pass` | HTTP Basic auth è®¤è¯é—¨æŽ§ |
| `k:token` | Bearer token è¯·æ±‚å¤´é—¨æŽ§ï¼ˆ`Authorization: Bearer <token>`ï¼‰ |
| `w:CIDR` | IP ç™½åå•ï¼ˆå•ä¸ª IP æˆ– CIDRï¼Œå¯é‡å¤ä½¿ç”¨ï¼‰ |
| `co` | æ·»åŠ  `Access-Control-Allow-Origin: *`ï¼ˆCORSï¼‰ |
| `x:https` | å¼ºåˆ¶ HTTPSâ€”â€”è‡ªåŠ¨å°† HTTP é‡å®šå‘åˆ° HTTPS |
| `a:Name:Value` | æ·»åŠ è¯·æ±‚å¤´ |
| `u:Name:Value` | æ›´æ–°è¯·æ±‚å¤´ |
| `r:Name` | åˆ é™¤è¯·æ±‚å¤´ |
| `qr` | å°† URL çš„äºŒç»´ç æ‰“å°åˆ° stdoutï¼ˆä¾¿äºŽç§»åŠ¨ç«¯åˆ†äº«ï¼‰ |

å¯è‡ªç”±ç»„åˆï¼š`"b:admin:secret+co+x:https+free@a.pinggy.io"`ã€‚

## Web è°ƒè¯•å™¨ï¼ˆå¯é€‰ï¼‰

Pinggy å¯å°†å…¥ç«™æµé‡é•œåƒåˆ° `localhost:4300` ä»¥ä¾›æ£€æŸ¥ã€‚åœ¨ SSH å‘½ä»¤ä¸­æ·»åŠ æœ¬åœ°è½¬å‘ï¼š

```bash
ssh -p 443 -L4300:localhost:4300 -R0:localhost:8000 free@a.pinggy.io
```

ç„¶åŽåœ¨æµè§ˆå™¨ä¸­æ‰“å¼€ `http://localhost:4300`ï¼ŒæŸ¥çœ‹å®žæ—¶è¯·æ±‚/å“åº”å¯¹ã€‚

## æ³¨æ„äº‹é¡¹

- **å…è´¹å¥—é¤æœ‰ 60 åˆ†é’Ÿç¡¬æ€§é™åˆ¶ã€‚** SSH ä¼šè¯åœ¨ 60 åˆ†é’Ÿæ—¶ç»ˆæ­¢ï¼ŒURL å¤±æ•ˆã€‚å¦‚éœ€æ›´é•¿æ—¶é—´çš„å…±äº«ï¼Œä½¿ç”¨ `PINGGY_TOKEN`ï¼ˆProï¼‰æˆ–ç”¨ shell å¾ªçŽ¯è‡ªåŠ¨é‡å¯ï¼ˆæ³¨æ„å…è´¹å¥—é¤æ¯æ¬¡é‡å¯ URL éƒ½ä¼šå˜åŒ–ï¼‰ã€‚
- **å…è´¹å¥—é¤ URL æ˜¯éšæœºçš„ï¼Œé‡å¯åŽä¼šå˜åŒ–ã€‚** ä¸è¦æ”¶è—ï¼Œä¸è¦ç²˜è´´åˆ°é…ç½®æ–‡ä»¶ä¸­ã€‚æ¯æ¬¡éƒ½ä»Žæ—¥å¿—é‡æ–°è§£æžã€‚
- **åŒä¸€æº IP çš„å¹¶å‘å…è´¹éš§é“é™åˆ¶ä¸ºä¸€ä¸ªã€‚** ä»ŽåŒä¸€å°æœºå™¨å¯åŠ¨ç¬¬äºŒä¸ªéš§é“é€šå¸¸ä¼šç»ˆæ­¢ç¬¬ä¸€ä¸ªã€‚Pro å¥—é¤å–æ¶ˆæ­¤é™åˆ¶ã€‚
- **ç”¨æˆ·åä¸­çš„ `+` å¿…é¡»åŠ å¼•å·ã€‚** è£¸å‘½ä»¤ `ssh ... b:admin:secret+free@a.pinggy.io` åœ¨ bash ä¸­å¯ä»¥å·¥ä½œï¼Œä½†åœ¨å°† `+` è§†ä¸ºç‰¹æ®Šå­—ç¬¦çš„ shell ä¸­æˆ–ä»¥ç¼–ç¨‹æ–¹å¼ç»„è£…æ—¶ä¼šå‡ºé”™ã€‚å§‹ç»ˆç”¨åŒå¼•å·æ‹¬èµ·ã€‚
- **ä¸åŠ è®¿é—®æŽ§åˆ¶æ ‡å¿—ä¸è¦éš§é“ä»»ä½•æ•æ„Ÿå†…å®¹ã€‚** è£¸ HTTP éš§é“å¯¹ä»»ä½•çŸ¥é“ URL çš„äººéƒ½å¯è®¿é—®ã€‚å¯¹éžå…¬å¼€æœåŠ¡ä½¿ç”¨ `b:`ã€`k:` æˆ– `w:`ã€‚
- **`process(action='log')` å¯èƒ½ä¼šé—æ¼ SSH banner è¾“å‡ºã€‚** Pinggy æ‰“å° URL åŽ SSH ä¼šè¯è¿›å…¥äº¤äº’æ¨¡å¼ã€‚å§‹ç»ˆé‡å®šå‘åˆ°æ—¥å¿—æ–‡ä»¶å¹¶ç›´æŽ¥ `grep` æ–‡ä»¶â€”â€”ä¸Ž `cloudflared-quick-tunnel` ç›¸åŒçš„æ¨¡å¼ã€‚
- **é¦–æ¬¡è¿è¡Œæ—¶çš„ä¸»æœºå¯†é’¥æç¤ºã€‚** é»˜è®¤ OpenSSH é…ç½®ä¼šè¦æ±‚ç”¨æˆ·æŽ¥å— Pinggy çš„ä¸»æœºå¯†é’¥ã€‚æ— äººå€¼å®ˆè¿è¡Œæ—¶å§‹ç»ˆä¼ å…¥ `-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`ã€‚
- **TCP å’Œ TLS éš§é“è¿”å›ž `<subdomain>.a.pinggy.online:<port>` å¯¹ï¼Œè€Œéž https URLã€‚** ä½¿ç”¨ä¸åŒçš„æ­£åˆ™è¡¨è¾¾å¼è§£æžï¼ˆ`tcp://` åŠ ç«¯å£ï¼‰ã€‚ä¸è¦å‡è®¾æ¯ä¸ª Pinggy éš§é“éƒ½æ˜¯ HTTPã€‚
- **Pro æ¨¡å¼éœ€è¦å°† token ä½œä¸ºç”¨æˆ·åï¼Œè€Œéžæ ‡å¿—ã€‚** ä½¿ç”¨ `"$PINGGY_TOKEN+a.pinggy.io"`ï¼ˆæ—  `free@`ï¼‰ã€‚ä½¿ç”¨ token è¿˜å¯ä»¥æ·»åŠ  `:persistent` èŽ·å¾—ç¨³å®šå­åŸŸåâ€”â€”å‚è§ `pinggy.io/docs/`ã€‚

## ç¤ºä¾‹é…æ–¹

å°†æœ¬åœ°æºæœåŠ¡ä¸Ž Pinggy éš§é“ç»“åˆçš„å¤åˆæ¨¡å¼ã€‚æ¯ä¸ªé…æ–¹å‡è‡ªåŒ…å«â€”â€”å¯åŠ¨æºæœåŠ¡ã€å¯åŠ¨éš§é“ã€è§£æž URLã€è¿”å›žç»™ç”¨æˆ·ã€‚

### é…æ–¹ 1â€”â€”æŽ¥æ”¶ webhook å›žè°ƒ

å½“å¤–éƒ¨æœåŠ¡ï¼ˆStripeã€GitHubã€Discordã€AgentMail ç­‰ï¼‰éœ€è¦åœ¨æœ¬åœ°ä»»åŠ¡æœŸé—´ POST åˆ°å…¬å¼€å¯è¾¾çš„ URL æ—¶ä½¿ç”¨ã€‚

```bash
# 1. ç®€æ˜“æ•èŽ·æœåŠ¡å™¨ï¼šæ¯ä¸ªè¯·æ±‚éƒ½è¿½åŠ åˆ° /tmp/webhook-hits.log
cat >/tmp/webhook-server.py <<'PY'
import http.server, json, datetime, pathlib
LOG = pathlib.Path("/tmp/webhook-hits.log")
class H(http.server.BaseHTTPRequestHandler):
    def _capture(self):
        n = int(self.headers.get("content-length") or 0)
        body = self.rfile.read(n).decode("utf-8", "replace") if n else ""
        rec = {"t": datetime.datetime.utcnow().isoformat(), "path": self.path,
               "method": self.command, "headers": dict(self.headers), "body": body}
        with LOG.open("a") as f: f.write(json.dumps(rec) + "\n")
        self.send_response(200); self.send_header("content-type","application/json")
        self.end_headers(); self.wfile.write(b'{"ok":true}\n')
    def do_GET(self): self._capture()
    def do_POST(self): self._capture()
    def log_message(self,*a,**k): pass
http.server.HTTPServer(("127.0.0.1", 18080), H).serve_forever()
PY
nohup python3 /tmp/webhook-server.py >/tmp/webhook-server.log 2>&1 &
echo $! >/tmp/webhook-server.pid

# 2. éš§é“â€”â€”ä½¿ç”¨ bearer token é—¨æŽ§ï¼Œé˜²æ­¢æ— å…³è¯·æ±‚æ±¡æŸ“æ•èŽ·æ—¥å¿—
nohup ssh -p 443 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    -o ServerAliveInterval=30 \
    -R0:localhost:18080 "k:$(openssl rand -hex 12)+free@a.pinggy.io" \
    >/tmp/webhook-pinggy.log 2>&1 &
echo $! >/tmp/webhook-pinggy.pid
sleep 5
URL=$(grep -oE 'https://[a-z0-9-]+\.[a-z]+\.pinggy\.link' /tmp/webhook-pinggy.log | head -1)
echo "Webhook URL: $URL"

# 3. åœ¨ agent å·¥ä½œæœŸé—´ï¼Œç›‘è§†è¯·æ±‚åˆ°è¾¾
tail -f /tmp/webhook-hits.log
```

å°† `$URL` æä¾›ç»™éœ€è¦è°ƒç”¨ä½ çš„æœåŠ¡ã€‚å…³é—­ï¼š`kill $(cat /tmp/webhook-server.pid) $(cat /tmp/webhook-pinggy.pid)`ã€‚

### é…æ–¹ 2â€”â€”é€šè¿‡ HTTP/SSE æš´éœ² MCP æœåŠ¡å™¨

å½“è¿œç¨‹ MCP å®¢æˆ·ç«¯ï¼ˆå¦ä¸€å°æœºå™¨ä¸Šçš„ Claude Desktopã€é˜Ÿå‹çš„ç¼–è¾‘å™¨ç­‰ï¼‰éœ€è¦è®¿é—®æœ¬åœ°è¿è¡Œçš„ MCP æœåŠ¡å™¨æ—¶ä½¿ç”¨ã€‚ä»…é€‚ç”¨äºŽä½¿ç”¨ HTTP transport çš„ MCP æœåŠ¡å™¨â€”â€”stdio æ¨¡å¼çš„æœåŠ¡å™¨æ— æ³•è¢«éš§é“ã€‚

```bash
# 1. ä»¥ HTTP æ¨¡å¼å¯åŠ¨ MCP æœåŠ¡å™¨ï¼ˆç¤ºä¾‹ï¼šç«¯å£ 8765 ä¸Šçš„ FastMCP æœåŠ¡å™¨ï¼‰
nohup python3 my_mcp_server.py --transport http --port 8765 \
    >/tmp/mcp-server.log 2>&1 &
echo $! >/tmp/mcp-server.pid

# 2. ä½¿ç”¨ bearer token å»ºç«‹éš§é“â€”â€”MCP æµé‡ä¸åº”å¯¹äº’è”ç½‘å¼€æ”¾
TOKEN=$(openssl rand -hex 16)
nohup ssh -p 443 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    -o ServerAliveInterval=30 \
    -R0:localhost:8765 "k:$TOKEN+free@a.pinggy.io" \
    >/tmp/mcp-pinggy.log 2>&1 &
echo $! >/tmp/mcp-pinggy.pid
sleep 5
URL=$(grep -oE 'https://[a-z0-9-]+\.[a-z]+\.pinggy\.link' /tmp/mcp-pinggy.log | head -1)
echo "MCP URL: $URL"
echo "Bearer token: $TOKEN"
```

è¿œç¨‹å®¢æˆ·ç«¯ä½¿ç”¨ `Authorization: Bearer $TOKEN` è¿žæŽ¥åˆ° `$URL`ã€‚Zed åŽŸç”Ÿ MCP å®¢æˆ·ç«¯é…ç½®ï¼š`{"transport": "http", "url": "<URL>", "headers": {"Authorization": "Bearer <TOKEN>"}}`ã€‚

### é…æ–¹ 3â€”â€”æš´éœ²æœ¬åœ° LLM ç«¯ç‚¹ï¼ˆOllama / vLLM / llama.cppï¼‰

ä¸Žè¿œç¨‹è°ƒç”¨æ–¹ï¼ˆå¦ä¸€ä¸ª agentã€æ‰‹æœºã€é˜Ÿå‹ï¼‰å…±äº«æœ¬åœ°æ¨¡åž‹ã€‚Ollama ç›‘å¬ `:11434`ï¼ŒvLLM å’Œ llama.cpp é€šå¸¸ç›‘å¬ `:8000`ã€‚

```bash
# å‰æï¼šæ¨¡åž‹æœåŠ¡å™¨å·²åœ¨ 127.0.0.1:11434 ä¸Šè¿è¡Œï¼ˆOllama é»˜è®¤ç«¯å£ï¼‰
TOKEN=$(openssl rand -hex 16)
nohup ssh -p 443 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    -o ServerAliveInterval=30 \
    -R0:localhost:11434 "k:$TOKEN+co+free@a.pinggy.io" \
    >/tmp/llm-pinggy.log 2>&1 &
echo $! >/tmp/llm-pinggy.pid
sleep 5
URL=$(grep -oE 'https://[a-z0-9-]+\.[a-z]+\.pinggy\.link' /tmp/llm-pinggy.log | head -1)
echo "Endpoint: $URL"
echo "Token:    $TOKEN"

# éªŒè¯
curl -s "$URL/api/tags" -H "Authorization: Bearer $TOKEN" | head
```

`co` å¯ç”¨ CORSï¼Œä½¿æµè§ˆå™¨è°ƒç”¨æ–¹å¯ä»¥è®¿é—®ç«¯ç‚¹ã€‚çº¯åŽç«¯è°ƒç”¨æ–¹å¯åŽ»æŽ‰ `co`ã€‚å¯¹äºŽå…¼å®¹ OpenAI çš„ vLLM/llama.cpp ç«¯ç‚¹ï¼Œè°ƒç”¨æ–¹ä½¿ç”¨åŸºç¡€ URL `$URL/v1` åŠ  `Authorization: Bearer $TOKEN`â€”â€”ä½†è¯·æ³¨æ„ Pinggy ä¸ä¼šä¿®æ”¹è¯·æ±‚ä½“ä¸­çš„ä»»ä½•å†…å®¹ï¼Œå› æ­¤æœ¬åœ°æœåŠ¡å™¨å®žé™…ä¸Šä¼šçœ‹åˆ° Pinggy çš„ tokenï¼›æœ¬åœ°æœåŠ¡å™¨åº”é…ç½®ä¸ºå¿½ç•¥è®¤è¯ï¼ˆå®ƒå·²åœ¨ `127.0.0.1` ä¸Šï¼‰ï¼Œè®© Pinggy è´Ÿè´£é—¨æŽ§ã€‚

### é…æ–¹ 4â€”â€”ç”¨ä¸€æ¬¡æ€§å¯†ç å…±äº«å¼€å‘æœåŠ¡å™¨

æœ€å¿«çš„"è®©é˜Ÿå‹è®¿é—®æˆ‘æ­£åœ¨è¿è¡Œçš„åº”ç”¨"æ¨¡å¼ã€‚éšæœºå¯†ç ï¼Œæ‰“å°ä¸€æ¬¡ï¼ŒCtrl-C åŽç»ˆæ­¢ã€‚

```bash
PASS=$(openssl rand -base64 12 | tr -d '+/=' | head -c 12)
echo "Dev server password: $PASS"
ssh -p 443 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    -o ServerAliveInterval=30 \
    -R0:localhost:3000 "b:dev:$PASS+co+x:https+free@a.pinggy.io"
# URL æ‰“å°åˆ°ç»ˆç«¯ã€‚åˆ†äº« URL + å¯†ç ã€‚Ctrl-C å…³é—­éš§é“ã€‚
```

`b:dev:$PASS` ä½¿ç”¨ HTTP Basic auth å¯¹ URL è¿›è¡Œé—¨æŽ§ã€‚`x:https` å¼ºåˆ¶ TLSã€‚`co` ä¸º SPA å‰ç«¯æ·»åŠ  CORSã€‚

## éªŒè¯

```bash
# ç«¯åˆ°ç«¯ï¼šå¯åŠ¨ä¸€ä¸ªç®€å•çš„æºæœåŠ¡ï¼Œå»ºç«‹éš§é“ï¼Œè®¿é—®å®ƒï¼Œç„¶åŽå…³é—­
python3 -m http.server 18000 --bind 127.0.0.1 >/tmp/origin.log 2>&1 &
ORIGIN_PID=$!

nohup ssh -p 443 \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -R0:localhost:18000 free@a.pinggy.io >/tmp/pinggy-verify.log 2>&1 &
SSH_PID=$!

sleep 5
URL=$(grep -oE 'https://[a-z0-9-]+\.[a-z]+\.pinggy\.link' /tmp/pinggy-verify.log | head -1)
echo "URL: $URL"
curl -sI "$URL/" | head -1

kill "$SSH_PID" "$ORIGIN_PID"
```

é¢„æœŸç»“æžœï¼šä¸€ä¸ª `pinggy.link` URL ä»¥åŠ curl è¿”å›žçš„ `HTTP/2 200`ã€‚
