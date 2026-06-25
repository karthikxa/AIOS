---
title: "Mcporter"
sidebar_label: "Mcporter"
description: "ä½¿ç”¨ mcporter CLI åˆ—å‡ºã€é…ç½®ã€è®¤è¯å¹¶ç›´æŽ¥è°ƒç”¨ MCP æœåŠ¡å™¨/å·¥å…·ï¼ˆHTTP æˆ– stdioï¼‰ï¼ŒåŒ…æ‹¬ä¸´æ—¶æœåŠ¡å™¨ã€é…ç½®ç¼–è¾‘åŠ CLI/ç±»åž‹ç”Ÿæˆç­‰åŠŸèƒ½ã€‚"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Mcporter

ä½¿ç”¨ mcporter CLI åˆ—å‡ºã€é…ç½®ã€è®¤è¯å¹¶ç›´æŽ¥è°ƒç”¨ MCP æœåŠ¡å™¨/å·¥å…·ï¼ˆHTTP æˆ– stdioï¼‰ï¼ŒåŒ…æ‹¬ä¸´æ—¶æœåŠ¡å™¨ã€é…ç½®ç¼–è¾‘åŠ CLI/ç±»åž‹ç”Ÿæˆç­‰åŠŸèƒ½ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mcp/mcporter` å®‰è£… |
| è·¯å¾„ | `optional-skills/mcp/mcporter` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `MCP`, `Tools`, `API`, `Integrations`, `Interop` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# mcporter

ä½¿ç”¨ `mcporter` ç›´æŽ¥ä»Žç»ˆç«¯å‘çŽ°ã€è°ƒç”¨å¹¶ç®¡ç† [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) æœåŠ¡å™¨å’Œå·¥å…·ã€‚

## å‰ç½®æ¡ä»¶

éœ€è¦ Node.jsï¼š
```bash
# æ— éœ€å®‰è£…ï¼ˆé€šè¿‡ npx è¿è¡Œï¼‰
npx mcporter list

# æˆ–å…¨å±€å®‰è£…
npm install -g mcporter
```

## å¿«é€Ÿå¼€å§‹

```bash
# åˆ—å‡ºæ­¤æœºå™¨ä¸Šå·²é…ç½®çš„ MCP æœåŠ¡å™¨
mcporter list

# åˆ—å‡ºæŒ‡å®šæœåŠ¡å™¨çš„å·¥å…·åŠ schema è¯¦æƒ…
mcporter list <server> --schema

# è°ƒç”¨å·¥å…·
mcporter call <server.tool> key=value
```

## å‘çŽ° MCP æœåŠ¡å™¨

mcporter ä¼šè‡ªåŠ¨å‘çŽ°æœºå™¨ä¸Šå…¶ä»– MCP å®¢æˆ·ç«¯ï¼ˆClaude Desktopã€Cursor ç­‰ï¼‰å·²é…ç½®çš„æœåŠ¡å™¨ã€‚å¦‚éœ€æŸ¥æ‰¾æ–°æœåŠ¡å™¨ï¼Œå¯æµè§ˆ [mcpfinder.dev](https://mcpfinder.dev) æˆ– [mcp.so](https://mcp.so) ç­‰æ³¨å†Œè¡¨ï¼Œç„¶åŽä»¥ä¸´æ—¶æ–¹å¼è¿žæŽ¥ï¼š

```bash
# é€šè¿‡ URL è¿žæŽ¥ä»»æ„ MCP æœåŠ¡å™¨ï¼ˆæ— éœ€é…ç½®ï¼‰
mcporter list --http-url https://some-mcp-server.com --name my_server

# æˆ–ä¸´æ—¶è¿è¡Œ stdio æœåŠ¡å™¨
mcporter list --stdio "npx -y @modelcontextprotocol/server-filesystem" --name fs
```

## è°ƒç”¨å·¥å…·

```bash
# key=value è¯­æ³•
mcporter call linear.list_issues team=ENG limit:5

# å‡½æ•°è¯­æ³•
mcporter call "linear.create_issue(title: \"Bug fix needed\")"

# ä¸´æ—¶ HTTP æœåŠ¡å™¨ï¼ˆæ— éœ€é…ç½®ï¼‰
mcporter call https://api.example.com/mcp.fetch url=https://example.com

# ä¸´æ—¶ stdio æœåŠ¡å™¨
mcporter call --stdio "bun run ./server.ts" scrape url=https://example.com

# JSON è½½è·
mcporter call <server.tool> --args '{"limit": 5}'

# æœºå™¨å¯è¯»è¾“å‡ºï¼ˆæŽ¨èç”¨äºŽ Zedï¼‰
mcporter call <server.tool> key=value --output json
```

## è®¤è¯ä¸Žé…ç½®

```bash
# å¯¹æœåŠ¡å™¨è¿›è¡Œ OAuth ç™»å½•
mcporter auth <server | url> [--reset]

# ç®¡ç†é…ç½®
mcporter config list
mcporter config get <key>
mcporter config add <server>
mcporter config remove <server>
mcporter config import <path>
```

é…ç½®æ–‡ä»¶ä½ç½®ï¼š`./config/mcporter.json`ï¼ˆå¯é€šè¿‡ `--config` è¦†ç›–ï¼‰ã€‚

## Daemonï¼ˆå®ˆæŠ¤è¿›ç¨‹ï¼‰

ç”¨äºŽæŒä¹…åŒ–æœåŠ¡å™¨è¿žæŽ¥ï¼š
```bash
mcporter daemon start
mcporter daemon status
mcporter daemon stop
mcporter daemon restart
```

## ä»£ç ç”Ÿæˆ

```bash
# ä¸º MCP æœåŠ¡å™¨ç”Ÿæˆ CLI åŒ…è£…å™¨
mcporter generate-cli --server <name>
mcporter generate-cli --command <url>

# æ£€æŸ¥å·²ç”Ÿæˆçš„ CLI
mcporter inspect-cli <path> [--json]

# ç”Ÿæˆ TypeScript ç±»åž‹/å®¢æˆ·ç«¯
mcporter emit-ts <server> --mode client
mcporter emit-ts <server> --mode types
```

## æ³¨æ„äº‹é¡¹

- ä½¿ç”¨ `--output json` èŽ·å–ç»“æž„åŒ–è¾“å‡ºï¼Œä¾¿äºŽè§£æž
- ä¸´æ—¶æœåŠ¡å™¨ï¼ˆHTTP URL æˆ– `--stdio` å‘½ä»¤ï¼‰æ— éœ€ä»»ä½•é…ç½®å³å¯ä½¿ç”¨ï¼Œé€‚åˆä¸€æ¬¡æ€§è°ƒç”¨
- OAuth è®¤è¯å¯èƒ½éœ€è¦äº¤äº’å¼æµè§ˆå™¨æµç¨‹ â€” å¦‚æœ‰éœ€è¦ï¼Œè¯·ä½¿ç”¨ `terminal(command="mcporter auth <server>", pty=true)`