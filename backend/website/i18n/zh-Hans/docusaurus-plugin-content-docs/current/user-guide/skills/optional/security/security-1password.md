---
title: "1Password â€” è®¾ç½®å¹¶ä½¿ç”¨ 1Password CLI (op)"
sidebar_label: "1Password"
description: "è®¾ç½®å¹¶ä½¿ç”¨ 1Password CLI (op)"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# 1Password

è®¾ç½®å¹¶ä½¿ç”¨ 1Password CLI (op)ã€‚é€‚ç”¨äºŽå®‰è£… CLIã€å¯ç”¨æ¡Œé¢åº”ç”¨é›†æˆã€ç™»å½•ï¼Œä»¥åŠä¸ºå‘½ä»¤è¯»å–/æ³¨å…¥å¯†é’¥çš„åœºæ™¯ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/security/1password` å®‰è£… |
| è·¯å¾„ | `optional-skills/security/1password` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | arceus77-7ï¼Œç”± Zed Agent å¢žå¼º |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `security`, `secrets`, `1password`, `op`, `cli` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# 1Password CLI

å½“ç”¨æˆ·å¸Œæœ›é€šè¿‡ 1Password ç®¡ç†å¯†é’¥ï¼Œè€Œéžä½¿ç”¨æ˜Žæ–‡çŽ¯å¢ƒå˜é‡æˆ–æ–‡ä»¶æ—¶ï¼Œä½¿ç”¨æ­¤ skillã€‚

## å‰ç½®è¦æ±‚

- 1Password è´¦æˆ·
- å·²å®‰è£… 1Password CLIï¼ˆ`op`ï¼‰
- ä»¥ä¸‹ä¹‹ä¸€ï¼šæ¡Œé¢åº”ç”¨é›†æˆã€æœåŠ¡è´¦æˆ·ä»¤ç‰Œï¼ˆ`OP_SERVICE_ACCOUNT_TOKEN`ï¼‰æˆ– Connect æœåŠ¡å™¨
- `tmux` å¯ç”¨ï¼Œç”¨äºŽåœ¨ Zed ç»ˆç«¯è°ƒç”¨æœŸé—´ä¿æŒç¨³å®šçš„å·²è®¤è¯ä¼šè¯ï¼ˆä»…é™æ¡Œé¢åº”ç”¨æµç¨‹ï¼‰

## ä½¿ç”¨åœºæ™¯

- å®‰è£…æˆ–é…ç½® 1Password CLI
- ä½¿ç”¨ `op signin` ç™»å½•
- è¯»å–å½¢å¦‚ `op://Vault/Item/field` çš„å¯†é’¥å¼•ç”¨
- ä½¿ç”¨ `op inject` å°†å¯†é’¥æ³¨å…¥é…ç½®/æ¨¡æ¿
- é€šè¿‡ `op run` ä»¥å¯†é’¥çŽ¯å¢ƒå˜é‡è¿è¡Œå‘½ä»¤

## è®¤è¯æ–¹å¼

### æœåŠ¡è´¦æˆ·ï¼ˆæŽ¨èç”¨äºŽ Zedï¼‰

åœ¨ `~/.zed/.env` ä¸­è®¾ç½® `OP_SERVICE_ACCOUNT_TOKEN`ï¼ˆskill é¦–æ¬¡åŠ è½½æ—¶ä¼šæç¤ºè¾“å…¥ï¼‰ã€‚
æ— éœ€æ¡Œé¢åº”ç”¨ã€‚æ”¯æŒ `op read`ã€`op inject`ã€`op run`ã€‚

```bash
export OP_SERVICE_ACCOUNT_TOKEN="your-token-here"
op whoami  # verify â€” should show Type: SERVICE_ACCOUNT
```

### æ¡Œé¢åº”ç”¨é›†æˆï¼ˆäº¤äº’å¼ï¼‰

1. åœ¨ 1Password æ¡Œé¢åº”ç”¨ä¸­å¯ç”¨ï¼šè®¾ç½® â†’ å¼€å‘è€… â†’ ä¸Ž 1Password CLI é›†æˆ
2. ç¡®ä¿åº”ç”¨å·²è§£é”
3. è¿è¡Œ `op signin` å¹¶é€šè¿‡ç”Ÿç‰©è¯†åˆ«æç¤ºæŽˆæƒ

### Connect æœåŠ¡å™¨ï¼ˆè‡ªæ‰˜ç®¡ï¼‰

```bash
export OP_CONNECT_HOST="http://localhost:8080"
export OP_CONNECT_TOKEN="your-connect-token"
```

## è®¾ç½®æ­¥éª¤

1. å®‰è£… CLIï¼š

```bash
# macOS
brew install 1password-cli

# Linux (official package/install docs)
# See references/get-started.md for distro-specific links.

# Windows (winget)
winget install AgileBits.1Password.CLI
```

2. éªŒè¯ï¼š

```bash
op --version
```

3. é€‰æ‹©ä¸Šè¿°è®¤è¯æ–¹å¼ä¹‹ä¸€å¹¶è¿›è¡Œé…ç½®ã€‚

## Zed æ‰§è¡Œæ¨¡å¼ï¼ˆæ¡Œé¢åº”ç”¨æµç¨‹ï¼‰

Zed ç»ˆç«¯å‘½ä»¤é»˜è®¤ä¸ºéžäº¤äº’å¼ï¼Œä¸”åœ¨å¤šæ¬¡è°ƒç”¨ä¹‹é—´å¯èƒ½ä¸¢å¤±è®¤è¯ä¸Šä¸‹æ–‡ã€‚
è‹¥è¦åœ¨æ¡Œé¢åº”ç”¨é›†æˆä¸‹å¯é ä½¿ç”¨ `op`ï¼Œè¯·åœ¨ä¸“ç”¨ tmux ä¼šè¯ä¸­æ‰§è¡Œç™»å½•å’Œå¯†é’¥æ“ä½œã€‚

æ³¨æ„ï¼šä½¿ç”¨ `OP_SERVICE_ACCOUNT_TOKEN` æ—¶**æ— éœ€**æ­¤æ“ä½œ â€” ä»¤ç‰Œä¼šåœ¨ç»ˆç«¯è°ƒç”¨ä¹‹é—´è‡ªåŠ¨æŒä¹…åŒ–ã€‚

```bash
SOCKET_DIR="${TMPDIR:-/tmp}/zed-tmux-sockets"
mkdir -p "$SOCKET_DIR"
SOCKET="$SOCKET_DIR/zed-op.sock"
SESSION="op-auth-$(date +%Y%m%d-%H%M%S)"

tmux -S "$SOCKET" new -d -s "$SESSION" -n shell

# Sign in (approve in desktop app when prompted)
tmux -S "$SOCKET" send-keys -t "$SESSION":0.0 -- "eval \"\$(op signin --account my.1password.com)\"" Enter

# Verify auth
tmux -S "$SOCKET" send-keys -t "$SESSION":0.0 -- "op whoami" Enter

# Example read
tmux -S "$SOCKET" send-keys -t "$SESSION":0.0 -- "op read 'op://Private/Npmjs/one-time password?attribute=otp'" Enter

# Capture output when needed
tmux -S "$SOCKET" capture-pane -p -J -t "$SESSION":0.0 -S -200

# Cleanup
tmux -S "$SOCKET" kill-session -t "$SESSION"
```

## å¸¸ç”¨æ“ä½œ

### è¯»å–å¯†é’¥

```bash
op read "op://app-prod/db/password"
```

### èŽ·å– OTP

```bash
op read "op://app-prod/npm/one-time password?attribute=otp"
```

### æ³¨å…¥æ¨¡æ¿

```bash
echo "db_password: {{ op://app-prod/db/password }}" | op inject
```

### ä»¥å¯†é’¥çŽ¯å¢ƒå˜é‡è¿è¡Œå‘½ä»¤

```bash
export DB_PASSWORD="op://app-prod/db/password"
op run -- sh -c '[ -n "$DB_PASSWORD" ] && echo "DB_PASSWORD is set" || echo "DB_PASSWORD missing"'
```

## ä½¿ç”¨é™åˆ¶

- é™¤éžç”¨æˆ·æ˜Žç¡®è¯·æ±‚è¯¥å€¼ï¼Œå¦åˆ™ä¸å¾—å°†åŽŸå§‹å¯†é’¥æ‰“å°ç»™ç”¨æˆ·ã€‚
- ä¼˜å…ˆä½¿ç”¨ `op run` / `op inject`ï¼Œè€Œéžå°†å¯†é’¥å†™å…¥æ–‡ä»¶ã€‚
- è‹¥å‘½ä»¤æŠ¥é”™"account is not signed in"ï¼Œè¯·åœ¨åŒä¸€ tmux ä¼šè¯ä¸­é‡æ–°è¿è¡Œ `op signin`ã€‚
- è‹¥æ¡Œé¢åº”ç”¨é›†æˆä¸å¯ç”¨ï¼ˆæ— å¤´çŽ¯å¢ƒ/CIï¼‰ï¼Œè¯·ä½¿ç”¨æœåŠ¡è´¦æˆ·ä»¤ç‰Œæµç¨‹ã€‚

## CI / æ— å¤´çŽ¯å¢ƒè¯´æ˜Ž

éžäº¤äº’å¼ä½¿ç”¨æ—¶ï¼Œè¯·é€šè¿‡ `OP_SERVICE_ACCOUNT_TOKEN` è¿›è¡Œè®¤è¯ï¼Œé¿å…ä½¿ç”¨äº¤äº’å¼ `op signin`ã€‚
æœåŠ¡è´¦æˆ·éœ€è¦ CLI v2.18.0+ã€‚

## å‚è€ƒèµ„æ–™

- `references/get-started.md`
- `references/cli-examples.md`
- https://developer.1password.com/docs/cli/
- https://developer.1password.com/docs/service-accounts/