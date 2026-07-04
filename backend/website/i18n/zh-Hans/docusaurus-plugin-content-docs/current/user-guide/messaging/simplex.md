# SimpleX Chat

[SimpleX Chat](https://simplex.chat/) æ˜¯ä¸€ä¸ªç§å¯†çš„åŽ»ä¸­å¿ƒåŒ–å³æ—¶é€šè®¯å¹³å°ï¼Œç”¨æˆ·å®Œå…¨æŽŒæŽ§è‡ªå·±çš„è”ç³»äººå’Œç¾¤ç»„ã€‚ä¸Žå…¶ä»–å¹³å°ä¸åŒï¼ŒSimpleX ä¸åˆ†é…ä»»ä½•æŒä¹…ç”¨æˆ· IDâ€”â€”æ¯ä¸ªè”ç³»äººåœ¨å»ºç«‹è¿žæŽ¥æ—¶ç”±ç³»ç»Ÿç”Ÿæˆä¸€ä¸ªä¸é€æ˜Žçš„å†…éƒ¨ IDï¼Œè¿™ä½¿å…¶æˆä¸ºç›®å‰éšç§æ€§æœ€å¼ºçš„å³æ—¶é€šè®¯å·¥å…·ä¹‹ä¸€ã€‚

## å‰ææ¡ä»¶

- å·²å®‰è£…å¹¶ä»¥å®ˆæŠ¤è¿›ç¨‹æ–¹å¼è¿è¡Œçš„ **simplex-chat** CLI
- Python åŒ… **websockets**ï¼ˆ`pip install websockets`ï¼‰

## å®‰è£… simplex-chat

ä»Ž [simplex-chat GitHub releases](https://github.com/simplex-chat/simplex-chat/releases) é¡µé¢ä¸‹è½½æœ€æ–°ç‰ˆæœ¬ï¼š

```bash
# Linux / macOS binary
curl -L https://github.com/simplex-chat/simplex-chat/releases/latest/download/simplex-chat-ubuntu-22_04-x86-64 -o simplex-chat
chmod +x simplex-chat
```

SimpleX Chat é¡¹ç›®æœªå‘å¸ƒèŠå¤©å®¢æˆ·ç«¯çš„é¢„æž„å»º Docker é•œåƒï¼›å¦‚éœ€åœ¨ Docker ä¸‹è¿è¡Œï¼Œè¯·ä»Ž [simplex-chat ä»“åº“](https://github.com/simplex-chat/simplex-chat) æºç æž„å»ºã€‚

## å¯åŠ¨å®ˆæŠ¤è¿›ç¨‹

```bash
simplex-chat -p 5225
```

å®ˆæŠ¤è¿›ç¨‹é»˜è®¤åœ¨ `ws://127.0.0.1:5225` ä¸Šç›‘å¬ WebSocket è¿žæŽ¥ã€‚

## é…ç½® Zed

### é€šè¿‡è®¾ç½®å‘å¯¼

```bash
zed gateway setup
```

é€‰æ‹© **SimpleX Chat** å¹¶æŒ‰æç¤ºæ“ä½œã€‚

### é€šè¿‡çŽ¯å¢ƒå˜é‡

å°†ä»¥ä¸‹å†…å®¹æ·»åŠ åˆ° `~/.zed/.env`ï¼š

```
SIMPLEX_WS_URL=ws://127.0.0.1:5225
SIMPLEX_ALLOWED_USERS=<contact-id-1>,<contact-id-2>
SIMPLEX_HOME_CHANNEL=<contact-id>
```

| å˜é‡ | æ˜¯å¦å¿…å¡« | è¯´æ˜Ž |
|---|---|---|
| `SIMPLEX_WS_URL` | æ˜¯ | simplex-chat å®ˆæŠ¤è¿›ç¨‹çš„ WebSocket URL |
| `SIMPLEX_ALLOWED_USERS` | å»ºè®®å¡«å†™ | å…è®¸ä½¿ç”¨ Agent çš„è”ç³»äºº IDï¼Œä»¥é€—å·åˆ†éš” |
| `SIMPLEX_ALLOW_ALL_USERS` | å¯é€‰ | è®¾ä¸º `true` ä»¥å…è®¸æ‰€æœ‰è”ç³»äººï¼ˆè¯·è°¨æ…Žä½¿ç”¨ï¼‰ |
| `SIMPLEX_HOME_CHANNEL` | å¯é€‰ | cron ä»»åŠ¡æŠ•é€’çš„é»˜è®¤è”ç³»äºº ID |
| `SIMPLEX_HOME_CHANNEL_NAME` | å¯é€‰ | ä¸»é¢‘é“çš„å¯è¯»æ ‡ç­¾ |

## æŸ¥æ‰¾è”ç³»äºº ID

å¯åŠ¨å®ˆæŠ¤è¿›ç¨‹åŽï¼Œä¸Žä½ çš„ Agent è”ç³»äººå¼€å¯ä¸€æ®µå¯¹è¯ã€‚è”ç³»äºº ID å°†å‡ºçŽ°åœ¨ä¼šè¯æ—¥å¿—ä¸­ï¼Œæˆ–é€šè¿‡ `zed send_message action=list` æŸ¥çœ‹ã€‚

## æŽˆæƒ

é»˜è®¤æƒ…å†µä¸‹**æ‰€æœ‰è”ç³»äººå‡è¢«æ‹’ç»è®¿é—®**ã€‚ä½ å¿…é¡»é€‰æ‹©ä»¥ä¸‹æ–¹å¼ä¹‹ä¸€ï¼š

1. å°† `SIMPLEX_ALLOWED_USERS` è®¾ç½®ä¸ºä»¥é€—å·åˆ†éš”çš„è”ç³»äºº ID åˆ—è¡¨ï¼Œæˆ–
2. ä½¿ç”¨ **DM é…å¯¹**â€”â€”å‘ Bot å‘é€ä»»æ„æ¶ˆæ¯ï¼ŒBot å°†å›žå¤ä¸€ä¸ªé…å¯¹ç ã€‚é€šè¿‡ `zed pairing approve simplex <CODE>` è¾“å…¥è¯¥é…å¯¹ç ã€‚

## åœ¨ cron ä»»åŠ¡ä¸­ä½¿ç”¨ SimpleX

```python
cronjob(
    action="create",
    schedule="every 1h",
    deliver="simplex",          # uses SIMPLEX_HOME_CHANNEL
    prompt="Check for alerts and summarise."
)
```

æˆ–æŒ‡å®šç‰¹å®šè”ç³»äººï¼š

```python
send_message(target="simplex:<contact-id>", message="Done!")
```

## éšç§è¯´æ˜Ž

- SimpleX ä»Žä¸æš´éœ²æ‰‹æœºå·æˆ–ç”µå­é‚®ä»¶åœ°å€â€”â€”è”ç³»äººä½¿ç”¨ä¸é€æ˜Ž ID æ ‡è¯†
- Zed ä¸Žå®ˆæŠ¤è¿›ç¨‹ä¹‹é—´çš„è¿žæŽ¥ä¸ºæœ¬åœ° WebSocketï¼ˆ`ws://127.0.0.1:5225`ï¼‰â€”â€”æ•°æ®ä¸ä¼šç¦»å¼€ä½ çš„æœºå™¨
- æ¶ˆæ¯åœ¨åˆ°è¾¾å®ˆæŠ¤è¿›ç¨‹ä¹‹å‰å·²ç”± SimpleX åè®®è¿›è¡Œç«¯åˆ°ç«¯åŠ å¯†

## æ•…éšœæŽ’æŸ¥

**"Cannot reach daemon"** â€” ç¡®ä¿ `simplex-chat -p 5225` æ­£åœ¨è¿è¡Œï¼Œä¸”ç«¯å£ä¸Ž `SIMPLEX_WS_URL` ä¸€è‡´ã€‚

**"websockets not installed"** â€” è¿è¡Œ `pip install websockets`ã€‚

**æ¶ˆæ¯æœªæ”¶åˆ°** â€” æ£€æŸ¥è¯¥è”ç³»äººçš„ ID æ˜¯å¦å·²åŠ å…¥ `SIMPLEX_ALLOWED_USERS`ï¼Œæˆ–é€šè¿‡ DM é…å¯¹æ–¹å¼æ‰¹å‡†è¯¥è”ç³»äººã€‚