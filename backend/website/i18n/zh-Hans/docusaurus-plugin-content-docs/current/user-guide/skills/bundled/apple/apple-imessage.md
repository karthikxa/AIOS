---
title: "Imessage â€” é€šè¿‡ macOS ä¸Šçš„ imsg CLI å‘é€å’ŒæŽ¥æ”¶ iMessages/SMS"
sidebar_label: "Imessage"
description: "é€šè¿‡ macOS ä¸Šçš„ imsg CLI å‘é€å’ŒæŽ¥æ”¶ iMessages/SMS"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Imessage

é€šè¿‡ macOS ä¸Šçš„ imsg CLI å‘é€å’ŒæŽ¥æ”¶ iMessages/SMSã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/apple/imessage` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | macos |
| æ ‡ç­¾ | `iMessage`, `SMS`, `messaging`, `macOS`, `Apple` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# iMessage

ä½¿ç”¨ `imsg` é€šè¿‡ macOS Messages.app è¯»å–å’Œå‘é€ iMessage/SMSã€‚

## å‰ææ¡ä»¶

- **macOS** ä¸” Messages.app å·²ç™»å½•
- å®‰è£…ï¼š`brew install steipete/tap/imsg`
- åœ¨ç»ˆç«¯æŽˆäºˆå®Œå…¨ç£ç›˜è®¿é—®æƒé™ï¼ˆç³»ç»Ÿè®¾ç½® â†’ éšç§ä¸Žå®‰å…¨ â†’ å®Œå…¨ç£ç›˜è®¿é—®ï¼‰
- åœ¨æç¤ºæ—¶æŽˆäºˆ Messages.app çš„è‡ªåŠ¨åŒ–æƒé™

## ä½•æ—¶ä½¿ç”¨

- ç”¨æˆ·è¯·æ±‚å‘é€ iMessage æˆ–çŸ­ä¿¡
- è¯»å– iMessage å¯¹è¯åŽ†å²
- æŸ¥çœ‹ Messages.app æœ€è¿‘çš„èŠå¤©è®°å½•
- å‘é€è‡³ç”µè¯å·ç æˆ– Apple ID

## ä½•æ—¶ä¸ä½¿ç”¨

- Telegram/Discord/Slack/WhatsApp æ¶ˆæ¯ â†’ ä½¿ç”¨ç›¸åº”çš„ gateway é¢‘é“
- ç¾¤èŠç®¡ç†ï¼ˆæ·»åŠ /ç§»é™¤æˆå‘˜ï¼‰â†’ ä¸æ”¯æŒ
- æ‰¹é‡/ç¾¤å‘æ¶ˆæ¯ â†’ å§‹ç»ˆå…ˆä¸Žç”¨æˆ·ç¡®è®¤

## å¿«é€Ÿå‚è€ƒ

### åˆ—å‡ºèŠå¤©

```bash
imsg chats --limit 10 --json
```

### æŸ¥çœ‹åŽ†å²è®°å½•

```bash
# é€šè¿‡èŠå¤© ID
imsg history --chat-id 1 --limit 20 --json

# åŒ…å«é™„ä»¶ä¿¡æ¯
imsg history --chat-id 1 --limit 20 --attachments --json
```

### å‘é€æ¶ˆæ¯

```bash
# ä»…æ–‡æœ¬
imsg send --to "+14155551212" --text "Hello!"

# å¸¦é™„ä»¶
imsg send --to "+14155551212" --text "Check this out" --file /path/to/image.jpg

# å¼ºåˆ¶ä½¿ç”¨ iMessage æˆ– SMS
imsg send --to "+14155551212" --text "Hi" --service imessage
imsg send --to "+14155551212" --text "Hi" --service sms
```

### ç›‘å¬æ–°æ¶ˆæ¯

```bash
imsg watch --chat-id 1 --attachments
```

## æœåŠ¡é€‰é¡¹

- `--service imessage` â€” å¼ºåˆ¶ä½¿ç”¨ iMessageï¼ˆè¦æ±‚æ”¶ä»¶äººå·²å¼€å¯ iMessageï¼‰
- `--service sms` â€” å¼ºåˆ¶ä½¿ç”¨ SMSï¼ˆç»¿è‰²æ°”æ³¡ï¼‰
- `--service auto` â€” ç”± Messages.app è‡ªåŠ¨å†³å®šï¼ˆé»˜è®¤ï¼‰

## è§„åˆ™

1. **å‘é€å‰å§‹ç»ˆç¡®è®¤æ”¶ä»¶äººå’Œæ¶ˆæ¯å†…å®¹**
2. **æœªç»ç”¨æˆ·æ˜Žç¡®æ‰¹å‡†ï¼Œä¸å¾—å‘æœªçŸ¥å·ç å‘é€æ¶ˆæ¯**
3. **é™„ä»¶å‰éªŒè¯æ–‡ä»¶è·¯å¾„**æ˜¯å¦å­˜åœ¨
4. **ä¸è¦åˆ·å±** â€” è‡ªè¡ŒæŽ§åˆ¶å‘é€é¢‘çŽ‡

## ç¤ºä¾‹å·¥ä½œæµ

ç”¨æˆ·ï¼š"å‘çŸ­ä¿¡å‘Šè¯‰å¦ˆå¦ˆæˆ‘ä¼šæ™šåˆ°"

```bash
# 1. æ‰¾åˆ°å¦ˆå¦ˆçš„èŠå¤©
imsg chats --limit 20 --json | jq '.[] | select(.displayName | contains("Mom"))'

# 2. ä¸Žç”¨æˆ·ç¡®è®¤ï¼š"æ‰¾åˆ° Momï¼Œå·ç ä¸º +1555123456ã€‚é€šè¿‡ iMessage å‘é€'I'll be late'ï¼Ÿ"

# 3. ç¡®è®¤åŽå‘é€
imsg send --to "+1555123456" --text "I'll be late"
```