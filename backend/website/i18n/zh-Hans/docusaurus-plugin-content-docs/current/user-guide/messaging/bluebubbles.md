# BlueBubblesï¼ˆiMessageï¼‰

é€šè¿‡ [BlueBubbles](https://bluebubbles.app/) å°† Zed è¿žæŽ¥è‡³ Apple iMessageâ€”â€”è¿™æ˜¯ä¸€æ¬¾å…è´¹ã€å¼€æºçš„ macOS æœåŠ¡ç«¯ï¼Œå¯å°† iMessage æ¡¥æŽ¥è‡³ä»»æ„è®¾å¤‡ã€‚

## å‰ææ¡ä»¶

- ä¸€å°**å§‹ç»ˆå¼€æœºçš„ Mac**ï¼Œè¿è¡Œ [BlueBubbles Server](https://bluebubbles.app/)
- è¯¥ Mac ä¸Šçš„ Messages.app å·²ç™»å½• Apple ID
- BlueBubbles Server v1.0.0+ï¼ˆwebhook éœ€è¦æ­¤ç‰ˆæœ¬ï¼‰
- Zed ä¸Ž BlueBubbles æœåŠ¡ç«¯ä¹‹é—´çš„ç½‘ç»œè¿žé€šæ€§

## é…ç½®æ­¥éª¤

### 1. å®‰è£… BlueBubbles Server

ä»Ž [bluebubbles.app](https://bluebubbles.app/) ä¸‹è½½å¹¶å®‰è£…ã€‚å®Œæˆè®¾ç½®å‘å¯¼â€”â€”ä½¿ç”¨ Apple ID ç™»å½•ï¼Œå¹¶é…ç½®è¿žæŽ¥æ–¹å¼ï¼ˆæœ¬åœ°ç½‘ç»œã€Ngrokã€Cloudflare æˆ–åŠ¨æ€ DNSï¼‰ã€‚

### 2. èŽ·å–æœåŠ¡ç«¯ URL å’Œå¯†ç 

åœ¨ BlueBubbles Server â†’ **Settings â†’ API** ä¸­ï¼Œè®°å½•ï¼š
- **Server URL**ï¼ˆä¾‹å¦‚ `http://192.168.1.10:1234`ï¼‰
- **Server Password**

### 3. é…ç½® Zed

è¿è¡Œè®¾ç½®å‘å¯¼ï¼š

```bash
zed gateway setup
```

é€‰æ‹© **BlueBubbles (iMessage)** å¹¶è¾“å…¥æœåŠ¡ç«¯ URL å’Œå¯†ç ã€‚

æˆ–ç›´æŽ¥åœ¨ `~/.zed/.env` ä¸­è®¾ç½®çŽ¯å¢ƒå˜é‡ï¼š

```bash
BLUEBUBBLES_SERVER_URL=http://192.168.1.10:1234
BLUEBUBBLES_PASSWORD=your-server-password
```

### 4. æŽˆæƒç”¨æˆ·

é€‰æ‹©ä»¥ä¸‹ä»»ä¸€æ–¹å¼ï¼š

**DM é…å¯¹ï¼ˆæŽ¨èï¼‰ï¼š**
å½“æœ‰äººå‘ä½ çš„ iMessage å‘é€æ¶ˆæ¯æ—¶ï¼ŒZed ä¼šè‡ªåŠ¨å‘å…¶å‘é€é…å¯¹ç ã€‚ä½¿ç”¨ä»¥ä¸‹å‘½ä»¤æ‰¹å‡†ï¼š
```bash
zed pairing approve bluebubbles <CODE>
```
ä½¿ç”¨ `zed pairing list` æŸ¥çœ‹å¾…å¤„ç†çš„é…å¯¹ç å’Œå·²æŽˆæƒç”¨æˆ·ã€‚

**é¢„æŽˆæƒç‰¹å®šç”¨æˆ·**ï¼ˆåœ¨ `~/.zed/.env` ä¸­ï¼‰ï¼š
```bash
BLUEBUBBLES_ALLOWED_USERS=user@icloud.com,+15551234567
```

**å¼€æ”¾è®¿é—®**ï¼ˆåœ¨ `~/.zed/.env` ä¸­ï¼‰ï¼š
```bash
BLUEBUBBLES_ALLOW_ALL_USERS=true
```

### 5. å¯åŠ¨ Gateway

```bash
zed gateway run
```

Zed å°†è¿žæŽ¥è‡³ä½ çš„ BlueBubbles æœåŠ¡ç«¯ï¼Œæ³¨å†Œ webhookï¼Œå¹¶å¼€å§‹ç›‘å¬ iMessage æ¶ˆæ¯ã€‚

## å·¥ä½œåŽŸç†

```
iMessage â†’ Messages.app â†’ BlueBubbles Server â†’ Webhook â†’ Zed
Zed â†’ BlueBubbles REST API â†’ Messages.app â†’ iMessage
```

- **å…¥ç«™ï¼š** æ–°æ¶ˆæ¯åˆ°è¾¾æ—¶ï¼ŒBlueBubbles å‘æœ¬åœ°ç›‘å¬å™¨å‘é€ webhook äº‹ä»¶ã€‚æ— éœ€è½®è¯¢â€”â€”å³æ—¶é€è¾¾ã€‚
- **å‡ºç«™ï¼š** Zed é€šè¿‡ BlueBubbles REST API å‘é€æ¶ˆæ¯ã€‚
- **åª’ä½“ï¼š** åŒå‘æ”¯æŒå›¾ç‰‡ã€è¯­éŸ³æ¶ˆæ¯ã€è§†é¢‘å’Œæ–‡æ¡£ã€‚å…¥ç«™é™„ä»¶ä¼šè¢«ä¸‹è½½å¹¶åœ¨æœ¬åœ°ç¼“å­˜ï¼Œä¾› Agent å¤„ç†ã€‚

## çŽ¯å¢ƒå˜é‡

| å˜é‡ | å¿…å¡« | é»˜è®¤å€¼ | è¯´æ˜Ž |
|----------|----------|---------|-------------|
| `BLUEBUBBLES_SERVER_URL` | æ˜¯ | â€” | BlueBubbles æœåŠ¡ç«¯ URL |
| `BLUEBUBBLES_PASSWORD` | æ˜¯ | â€” | æœåŠ¡ç«¯å¯†ç  |
| `BLUEBUBBLES_WEBHOOK_HOST` | å¦ | `127.0.0.1` | Webhook ç›‘å¬å™¨ç»‘å®šåœ°å€ |
| `BLUEBUBBLES_WEBHOOK_PORT` | å¦ | `8645` | Webhook ç›‘å¬å™¨ç«¯å£ |
| `BLUEBUBBLES_WEBHOOK_PATH` | å¦ | `/bluebubbles-webhook` | Webhook URL è·¯å¾„ |
| `BLUEBUBBLES_HOME_CHANNEL` | å¦ | â€” | cron æŠ•é€’ä½¿ç”¨çš„æ‰‹æœºå·/é‚®ç®± |
| `BLUEBUBBLES_ALLOWED_USERS` | å¦ | â€” | é€—å·åˆ†éš”çš„æŽˆæƒç”¨æˆ·åˆ—è¡¨ |
| `BLUEBUBBLES_ALLOW_ALL_USERS` | å¦ | `false` | å…è®¸æ‰€æœ‰ç”¨æˆ· |

è‡ªåŠ¨å°†æ¶ˆæ¯æ ‡è®°ä¸ºå·²è¯»ç”± `~/.zed/config.yaml` ä¸­ `platforms.bluebubbles.extra` ä¸‹çš„ `send_read_receipts` é”®æŽ§åˆ¶ï¼ˆé»˜è®¤å€¼ï¼š`true`ï¼‰ã€‚è¯¥é€‰é¡¹æ²¡æœ‰å¯¹åº”çš„çŽ¯å¢ƒå˜é‡ã€‚

## åŠŸèƒ½ç‰¹æ€§

### æ–‡å­—æ¶ˆæ¯
å‘é€å’ŒæŽ¥æ”¶ iMessageã€‚Markdown ä¼šè‡ªåŠ¨åŽ»é™¤ï¼Œä»¥ç¡®ä¿çº¯æ–‡æœ¬çš„æ•´æ´å‘ˆçŽ°ã€‚

### å¯Œåª’ä½“
- **å›¾ç‰‡ï¼š** ç…§ç‰‡åœ¨ iMessage å¯¹è¯ä¸­åŽŸç”Ÿæ˜¾ç¤º
- **è¯­éŸ³æ¶ˆæ¯ï¼š** éŸ³é¢‘æ–‡ä»¶ä»¥ iMessage è¯­éŸ³æ¶ˆæ¯å½¢å¼å‘é€
- **è§†é¢‘ï¼š** è§†é¢‘é™„ä»¶
- **æ–‡æ¡£ï¼š** æ–‡ä»¶ä»¥ iMessage é™„ä»¶å½¢å¼å‘é€

### Tapback ååº”
æ”¯æŒå–œçˆ±ã€ç‚¹èµžã€è¸©ã€å¤§ç¬‘ã€å¼ºè°ƒå’Œç–‘é—®ç­‰ååº”ã€‚éœ€è¦ BlueBubbles [Private API helper](https://docs.bluebubbles.app/helper-bundle/installation)ã€‚

### æ­£åœ¨è¾“å…¥æŒ‡ç¤ºå™¨
Agent å¤„ç†æ¶ˆæ¯æœŸé—´ï¼ŒiMessage å¯¹è¯ä¸­ä¼šæ˜¾ç¤º"æ­£åœ¨è¾“å…¥â€¦â€¦"ã€‚éœ€è¦ Private APIã€‚

### å·²è¯»å›žæ‰§
å¤„ç†æ¶ˆæ¯åŽè‡ªåŠ¨æ ‡è®°ä¸ºå·²è¯»ã€‚éœ€è¦ Private APIã€‚

### èŠå¤©å¯»å€
ä½ å¯ä»¥é€šè¿‡é‚®ç®±æˆ–æ‰‹æœºå·å¯»å€èŠå¤©â€”â€”Zed ä¼šè‡ªåŠ¨å°†å…¶è§£æžä¸º BlueBubbles èŠå¤© GUIDï¼Œæ— éœ€ä½¿ç”¨åŽŸå§‹ GUID æ ¼å¼ã€‚

## Private API

éƒ¨åˆ†åŠŸèƒ½éœ€è¦ BlueBubbles [Private API helper](https://docs.bluebubbles.app/helper-bundle/installation)ï¼š
- Tapback ååº”
- æ­£åœ¨è¾“å…¥æŒ‡ç¤ºå™¨
- å·²è¯»å›žæ‰§
- é€šè¿‡åœ°å€åˆ›å»ºæ–°èŠå¤©

ä¸ä½¿ç”¨ Private API æ—¶ï¼ŒåŸºæœ¬æ–‡å­—æ¶ˆæ¯å’Œåª’ä½“åŠŸèƒ½ä»å¯æ­£å¸¸ä½¿ç”¨ã€‚

## æ•…éšœæŽ’æŸ¥

### "Cannot reach server"
- ç¡®è®¤æœåŠ¡ç«¯ URL æ­£ç¡®ä¸” Mac å·²å¼€æœº
- æ£€æŸ¥ BlueBubbles Server æ˜¯å¦æ­£åœ¨è¿è¡Œ
- ç¡®ä¿ç½‘ç»œè¿žé€šï¼ˆé˜²ç«å¢™ã€ç«¯å£è½¬å‘ï¼‰

### æ¶ˆæ¯æœªé€è¾¾
- æ£€æŸ¥ webhook æ˜¯å¦å·²åœ¨ BlueBubbles Server â†’ Settings â†’ API â†’ Webhooks ä¸­æ³¨å†Œ
- ç¡®è®¤ webhook URL å¯ä»Ž Mac è®¿é—®
- æŸ¥çœ‹ `zed logs gateway` ä¸­çš„ webhook é”™è¯¯ï¼ˆæˆ–ä½¿ç”¨ `zed logs -f` å®žæ—¶è·Ÿè¸ªï¼‰

### "Private API helper not connected"
- å®‰è£… Private API helperï¼š[docs.bluebubbles.app](https://docs.bluebubbles.app/helper-bundle/installation)
- ä¸å®‰è£…ä¹Ÿå¯ä½¿ç”¨åŸºæœ¬æ¶ˆæ¯åŠŸèƒ½â€”â€”ä»…ååº”ã€æ­£åœ¨è¾“å…¥å’Œå·²è¯»å›žæ‰§éœ€è¦å®ƒ
