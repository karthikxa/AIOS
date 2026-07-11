---
title: "Agentmail â€” é€šè¿‡ AgentMail ä¸º Agent æä¾›ä¸“å±žç”µå­é‚®ä»¶æ”¶ä»¶ç®±"
sidebar_label: "Agentmail"
description: "é€šè¿‡ AgentMail ä¸º Agent æä¾›ä¸“å±žç”µå­é‚®ä»¶æ”¶ä»¶ç®±"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Agentmail

é€šè¿‡ AgentMail ä¸º Agent æä¾›ä¸“å±žç”µå­é‚®ä»¶æ”¶ä»¶ç®±ã€‚ä½¿ç”¨ Agent ä¸“å±žç”µå­é‚®ä»¶åœ°å€ï¼ˆä¾‹å¦‚ zed-agent@agentmail.toï¼‰è‡ªä¸»å‘é€ã€æŽ¥æ”¶å’Œç®¡ç†ç”µå­é‚®ä»¶ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/email/agentmail` å®‰è£… |
| è·¯å¾„ | `optional-skills/email/agentmail` |
| ç‰ˆæœ¬ | `1.0.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `email`, `communication`, `agentmail`, `mcp` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ Agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# AgentMail â€” Agent ä¸“å±žç”µå­é‚®ä»¶æ”¶ä»¶ç®±

## å‰ç½®è¦æ±‚

- **AgentMail API å¯†é’¥**ï¼ˆå¿…éœ€ï¼‰â€” åœ¨ https://console.agentmail.to æ³¨å†Œï¼ˆå…è´¹å¥—é¤ï¼š3 ä¸ªæ”¶ä»¶ç®±ï¼Œæ¯æœˆ 3,000 å°é‚®ä»¶ï¼›ä»˜è´¹å¥—é¤èµ·ä»· $20/æœˆï¼‰
- Node.js 18+ï¼ˆç”¨äºŽ MCP æœåŠ¡å™¨ï¼‰

## ä½¿ç”¨åœºæ™¯
åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨æ­¤ skillï¼š
- ä¸º Agent æä¾›ä¸“å±žç”µå­é‚®ä»¶åœ°å€
- ä»£è¡¨ Agent è‡ªä¸»å‘é€ç”µå­é‚®ä»¶
- æŽ¥æ”¶å¹¶è¯»å–ä¼ å…¥é‚®ä»¶
- ç®¡ç†é‚®ä»¶çº¿ç¨‹å’Œå¯¹è¯
- é€šè¿‡ç”µå­é‚®ä»¶æ³¨å†ŒæœåŠ¡æˆ–è¿›è¡Œèº«ä»½éªŒè¯
- é€šè¿‡ç”µå­é‚®ä»¶ä¸Žå…¶ä»– Agent æˆ–äººç±»è¿›è¡Œé€šä¿¡

æ­¤ skill **ä¸é€‚ç”¨äºŽ**è¯»å–ç”¨æˆ·çš„ä¸ªäººé‚®ä»¶ï¼ˆè¯·ä½¿ç”¨ himalaya æˆ– Gmailï¼‰ã€‚
AgentMail ä¸º Agent æä¾›ç‹¬ç«‹çš„èº«ä»½å’Œæ”¶ä»¶ç®±ã€‚

## é…ç½®

### 1. èŽ·å– API å¯†é’¥
- è®¿é—® https://console.agentmail.to
- åˆ›å»ºè´¦æˆ·å¹¶ç”Ÿæˆ API å¯†é’¥ï¼ˆä»¥ `am_` å¼€å¤´ï¼‰

### 2. é…ç½® MCP æœåŠ¡å™¨
æ·»åŠ è‡³ `~/.zed/config.yaml`ï¼ˆç²˜è´´å®žé™…å¯†é’¥ â€” MCP çŽ¯å¢ƒå˜é‡ä¸ä¼šä»Ž .env å±•å¼€ï¼‰ï¼š
```yaml
mcp_servers:
  agentmail:
    command: "npx"
    args: ["-y", "agentmail-mcp"]
    env:
      AGENTMAIL_API_KEY: "am_your_key_here"
```

### 3. é‡å¯ Zed
```bash
zed
```
æ‰€æœ‰ 11 ä¸ª AgentMail å·¥å…·çŽ°å·²è‡ªåŠ¨å¯ç”¨ã€‚

## å¯ç”¨å·¥å…·ï¼ˆé€šè¿‡ MCPï¼‰

| å·¥å…· | æè¿° |
|------|-------------|
| `list_inboxes` | åˆ—å‡ºæ‰€æœ‰ Agent æ”¶ä»¶ç®± |
| `get_inbox` | èŽ·å–ç‰¹å®šæ”¶ä»¶ç®±çš„è¯¦ç»†ä¿¡æ¯ |
| `create_inbox` | åˆ›å»ºæ–°æ”¶ä»¶ç®±ï¼ˆèŽ·å¾—çœŸå®žç”µå­é‚®ä»¶åœ°å€ï¼‰ |
| `delete_inbox` | åˆ é™¤æ”¶ä»¶ç®± |
| `list_threads` | åˆ—å‡ºæ”¶ä»¶ç®±ä¸­çš„é‚®ä»¶çº¿ç¨‹ |
| `get_thread` | èŽ·å–ç‰¹å®šé‚®ä»¶çº¿ç¨‹ |
| `send_message` | å‘é€æ–°é‚®ä»¶ |
| `reply_to_message` | å›žå¤å·²æœ‰é‚®ä»¶ |
| `forward_message` | è½¬å‘é‚®ä»¶ |
| `update_message` | æ›´æ–°é‚®ä»¶æ ‡ç­¾/çŠ¶æ€ |
| `get_attachment` | ä¸‹è½½é‚®ä»¶é™„ä»¶ |

## æ“ä½œæµç¨‹

### åˆ›å»ºæ”¶ä»¶ç®±å¹¶å‘é€é‚®ä»¶
1. åˆ›å»ºä¸“å±žæ”¶ä»¶ç®±ï¼š
   - ä½¿ç”¨ `create_inbox` å¹¶æŒ‡å®šç”¨æˆ·åï¼ˆä¾‹å¦‚ `zed-agent`ï¼‰
   - Agent èŽ·å¾—åœ°å€ï¼š`zed-agent@agentmail.to`
2. å‘é€é‚®ä»¶ï¼š
   - ä½¿ç”¨ `send_message`ï¼Œä¼ å…¥ `inbox_id`ã€`to`ã€`subject`ã€`text`
3. æ£€æŸ¥å›žå¤ï¼š
   - ä½¿ç”¨ `list_threads` æŸ¥çœ‹ä¼ å…¥å¯¹è¯
   - ä½¿ç”¨ `get_thread` è¯»å–ç‰¹å®šçº¿ç¨‹

### æ£€æŸ¥ä¼ å…¥é‚®ä»¶
1. ä½¿ç”¨ `list_inboxes` æŸ¥æ‰¾æ”¶ä»¶ç®± ID
2. ä½¿ç”¨ `list_threads` å¹¶ä¼ å…¥æ”¶ä»¶ç®± ID æŸ¥çœ‹å¯¹è¯
3. ä½¿ç”¨ `get_thread` è¯»å–çº¿ç¨‹åŠå…¶æ¶ˆæ¯

### å›žå¤é‚®ä»¶
1. ä½¿ç”¨ `get_thread` èŽ·å–çº¿ç¨‹
2. ä½¿ç”¨ `reply_to_message`ï¼Œä¼ å…¥æ¶ˆæ¯ ID å’Œå›žå¤å†…å®¹

## ç¤ºä¾‹å·¥ä½œæµ

**æ³¨å†ŒæœåŠ¡ï¼š**
```
1. create_inbox (username: "signup-bot")
2. ä½¿ç”¨è¯¥æ”¶ä»¶ç®±åœ°å€åœ¨æœåŠ¡ä¸Šæ³¨å†Œ
3. list_threads æ£€æŸ¥éªŒè¯é‚®ä»¶
4. get_thread è¯»å–éªŒè¯ç 
```

**Agent å¯¹äººç±»çš„å¤–å‘è”ç³»ï¼š**
```
1. create_inbox (username: "zed-outreach")
2. send_message (to: user@example.com, subject: "Hello", text: "...")
3. list_threads æ£€æŸ¥å›žå¤
```

## æ³¨æ„äº‹é¡¹
- å…è´¹å¥—é¤é™åˆ¶ä¸º 3 ä¸ªæ”¶ä»¶ç®±ï¼Œæ¯æœˆ 3,000 å°é‚®ä»¶
- å…è´¹å¥—é¤é‚®ä»¶æ¥è‡ª `@agentmail.to` åŸŸåï¼ˆä»˜è´¹å¥—é¤æ”¯æŒè‡ªå®šä¹‰åŸŸåï¼‰
- MCP æœåŠ¡å™¨éœ€è¦ Node.jsï¼ˆ18+ï¼‰ï¼ˆ`npx -y agentmail-mcp`ï¼‰
- å¿…é¡»å®‰è£… `mcp` Python åŒ…ï¼š`pip install mcp`
- å®žæ—¶å…¥ç«™é‚®ä»¶ï¼ˆwebhookï¼‰éœ€è¦å…¬ç½‘æœåŠ¡å™¨ â€” ä¸ªäººä½¿ç”¨æ—¶å»ºè®®æ”¹ç”¨ `list_threads` è½®è¯¢é…åˆ cronjob

## éªŒè¯
é…ç½®å®ŒæˆåŽï¼Œä½¿ç”¨ä»¥ä¸‹å‘½ä»¤æµ‹è¯•ï¼š
```
zed --toolsets mcp -q "Create an AgentMail inbox called test-agent and tell me its email address"
```
åº”è¿”å›žæ–°æ”¶ä»¶ç®±çš„åœ°å€ã€‚

## å‚è€ƒèµ„æ–™
- AgentMail æ–‡æ¡£ï¼šhttps://docs.agentmail.to/
- AgentMail æŽ§åˆ¶å°ï¼šhttps://console.agentmail.to
- AgentMail MCP ä»“åº“ï¼šhttps://github.com/agentmail-to/agentmail-mcp
- å®šä»·ï¼šhttps://www.agentmail.to/pricing
