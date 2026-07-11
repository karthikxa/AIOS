---
sidebar_position: 17
title: "LINE"
description: "å°† Zed Agent è®¾ç½®ä¸º LINE Messaging API æœºå™¨äºº"
---

# LINE é…ç½®

é€šè¿‡å®˜æ–¹ LINE Messaging API å°† Zed Agent ä½œä¸º [LINE](https://line.me/) æœºå™¨äººè¿è¡Œã€‚é€‚é…å™¨ä»¥æ†ç»‘å¹³å°æ’ä»¶çš„å½¢å¼å­˜æ”¾äºŽ `plugins/platforms/line/` â€” æ— éœ€ä¿®æ”¹æ ¸å¿ƒä»£ç ï¼Œåƒå…¶ä»–å¹³å°ä¸€æ ·å¯ç”¨å³å¯ã€‚

LINE æ˜¯æ—¥æœ¬ã€å°æ¹¾å’Œæ³°å›½çš„ä¸»æµå³æ—¶é€šè®¯åº”ç”¨ã€‚å¦‚æžœä½ çš„ç”¨æˆ·åœ¨è¿™äº›åœ°åŒºï¼Œè¿™å°±æ˜¯ä»–ä»¬ä¸Žä½ æ²Ÿé€šçš„æ–¹å¼ã€‚

## æœºå™¨äººå“åº”æ–¹å¼

| åœºæ™¯ | è¡Œä¸º |
|---------|----------|
| **1:1 èŠå¤©**ï¼ˆ`U` å¼€å¤´ IDï¼‰ | å“åº”æ¯æ¡æ¶ˆæ¯ |
| **ç¾¤èŠ**ï¼ˆ`C` å¼€å¤´ IDï¼‰ | ä»…å½“ç¾¤ç»„åœ¨ç™½åå•ä¸­æ—¶å“åº” |
| **å¤šäººæˆ¿é—´**ï¼ˆ`R` å¼€å¤´ IDï¼‰ | ä»…å½“æˆ¿é—´åœ¨ç™½åå•ä¸­æ—¶å“åº” |

å…¥ç«™çš„æ–‡æœ¬ã€å›¾ç‰‡ã€éŸ³é¢‘ã€è§†é¢‘ã€æ–‡ä»¶ã€è´´çº¸å’Œä½ç½®ä¿¡æ¯å‡å¯å¤„ç†ã€‚å‡ºç«™æ–‡æœ¬ä¼˜å…ˆä½¿ç”¨**å…è´¹ reply token**ï¼ˆå•æ¬¡ä½¿ç”¨ï¼Œæœ‰æ•ˆæœŸçº¦ 60 ç§’ï¼‰ï¼Œtoken è¿‡æœŸåŽå›žé€€è‡³è®¡è´¹çš„ Push APIã€‚

---

## ç¬¬ä¸€æ­¥ï¼šåˆ›å»º LINE Messaging API é¢‘é“

1. å‰å¾€ [LINE Developers Console](https://developers.line.biz/console/)ã€‚
2. åˆ›å»ºä¸€ä¸ª Providerï¼Œç„¶åŽåœ¨å…¶ä¸‹åˆ›å»ºä¸€ä¸ª **Messaging API** é¢‘é“ã€‚
3. åœ¨é¢‘é“çš„ **Basic settings** æ ‡ç­¾é¡µä¸­ï¼Œå¤åˆ¶ **Channel secret**ã€‚
4. åœ¨ **Messaging API** æ ‡ç­¾é¡µä¸­ï¼Œæ»šåŠ¨è‡³ **Channel access token (long-lived)** å¹¶ç‚¹å‡» **Issue**ï¼Œå¤åˆ¶è¯¥ tokenã€‚
5. åœ¨ **Messaging API** æ ‡ç­¾é¡µä¸­ï¼ŒåŒæ—¶ç¦ç”¨ **Auto-reply messages** å’Œ **Greeting messages**ï¼Œé¿å…ä¸Žæœºå™¨äººå›žå¤å†²çªã€‚

---

## ç¬¬äºŒæ­¥ï¼šæš´éœ² webhook ç«¯å£

LINE é€šè¿‡å…¬ç½‘ HTTPS æŽ¨é€ webhookã€‚é»˜è®¤ç«¯å£ä¸º `8646` â€” å¦‚éœ€ä¿®æ”¹ï¼Œå¯é€šè¿‡ `LINE_PORT` è¦†ç›–ã€‚

```bash
# Cloudflare Tunnelï¼ˆæŽ¨èç”¨äºŽç”Ÿäº§çŽ¯å¢ƒ â€” å›ºå®šä¸»æœºåï¼‰
cloudflared tunnel --url http://localhost:8646

# ngrokï¼ˆé€‚åˆå¼€å‘çŽ¯å¢ƒï¼‰
ngrok http 8646

# devtunnel
devtunnel create zed-line --allow-anonymous
devtunnel port create zed-line -p 8646 --protocol https
devtunnel host zed-line
```

å¤åˆ¶ `https://...` URL â€” ç¨åŽå°†å…¶è®¾ç½®ä¸º webhook URLã€‚**ä¿æŒéš§é“è¿è¡Œ**ä»¥ä¾¿æµ‹è¯•ã€‚ç”Ÿäº§çŽ¯å¢ƒè¯·é…ç½®å›ºå®šçš„ Cloudflare å‘½åéš§é“ï¼Œé¿å…é‡å¯åŽ webhook URL å˜æ›´ã€‚

---

## ç¬¬ä¸‰æ­¥ï¼šé…ç½® Zed

åœ¨ `~/.zed/.env` ä¸­æ·»åŠ ï¼š

```env
LINE_CHANNEL_ACCESS_TOKEN=YOUR_LONG_LIVED_TOKEN
LINE_CHANNEL_SECRET=YOUR_CHANNEL_SECRET

# ç™½åå• â€” è‡³å°‘å¡«å†™å…¶ä¸­ä¸€é¡¹ï¼ˆå¼€å‘çŽ¯å¢ƒå¯ä½¿ç”¨ LINE_ALLOW_ALL_USERS=trueï¼‰
LINE_ALLOWED_USERS=U1234567890abcdef...           # é€—å·åˆ†éš”çš„ U å¼€å¤´ ID
LINE_ALLOWED_GROUPS=C1234567890abcdef...          # å¯é€‰çš„ç¾¤ç»„ ID
LINE_ALLOWED_ROOMS=R1234567890abcdef...           # å¯é€‰çš„æˆ¿é—´ ID

# å‘é€å›¾ç‰‡ / éŸ³é¢‘ / è§†é¢‘æ—¶å¿…å¡« â€” éš§é“è§£æžåˆ°çš„å…¬ç½‘ HTTPS åŸºç¡€ URL
# æœªè®¾ç½®æ—¶ï¼Œsend_image/voice/video å°†æ‹’ç»æ‰§è¡Œ
LINE_PUBLIC_URL=https://my-tunnel.example.com
```

ç„¶åŽåœ¨ `~/.zed/config.yaml` ä¸­ï¼š

```yaml
gateway:
  platforms:
    line:
      enabled: true
```

è¿™å°±å¤Ÿäº† â€” `gateway/config.py` ä¸­çš„æ†ç»‘æ’ä»¶æ‰«æä¼šè‡ªåŠ¨è¯†åˆ« `plugins/platforms/line/`ã€‚æ— éœ€ç¼–è¾‘ `Platform.LINE` æžšä¸¾ï¼Œæ— éœ€æ³¨å†Œ `_create_adapter`ã€‚

---

## ç¬¬å››æ­¥ï¼šè®¾ç½® webhook URL

å›žåˆ° LINE æŽ§åˆ¶å°ï¼š

1. æ‰“å¼€ä½ çš„é¢‘é“ â†’ **Messaging API** æ ‡ç­¾é¡µã€‚
2. åœ¨ **Webhook settings** â†’ **Webhook URL** ä¸‹ï¼Œç²˜è´´ `https://<your-tunnel>/line/webhook`ï¼ˆæ³¨æ„ `/line/webhook` è·¯å¾„ â€” é€‚é…å™¨åœ¨æ­¤ç›‘å¬ï¼‰ã€‚
3. ç‚¹å‡» **Verify**ã€‚LINE ä¼š ping è¯¥ URLï¼Œä½ åº”çœ‹åˆ° 200 å“åº”ã€‚
4. å°† **Use webhook** åˆ‡æ¢ä¸º **On**ã€‚

---

## ç¬¬äº”æ­¥ï¼šè¿è¡Œ gateway

```bash
zed gateway
```

Agent æ—¥å¿—æ˜¾ç¤ºï¼š

```
LINE: webhook listening on 0.0.0.0:8646/line/webhook (public: https://my-tunnel.example.com)
```

ä»Ž LINE åº”ç”¨å°†æœºå™¨äººæ·»åŠ ä¸ºå¥½å‹ï¼ˆæ‰«æé¢‘é“ **Messaging API** æ ‡ç­¾é¡µä¸­çš„äºŒç»´ç ï¼‰ï¼Œç„¶åŽå‘é€ä¸€æ¡æ¶ˆæ¯ã€‚

---

## LLM å“åº”ç¼“æ…¢

LINE çš„ reply token ä¸ºå•æ¬¡ä½¿ç”¨ï¼Œåœ¨å…¥ç«™äº‹ä»¶å‘ç”ŸåŽçº¦ 60 ç§’è¿‡æœŸã€‚LLM å“åº”è¿‡æ…¢æ—¶å°†æ— æ³•åŠæ—¶å›žå¤ï¼Œé€šå¸¸ä¼šè¢«è¿«è°ƒç”¨ä»˜è´¹çš„ Push APIã€‚

å½“ LLM è¿è¡Œæ—¶é—´è¶…è¿‡ `LINE_SLOW_RESPONSE_THRESHOLD` ç§’ï¼ˆé»˜è®¤ `45`ï¼‰æ—¶ï¼Œé€‚é…å™¨ä¼šæ¶ˆè€—åŽŸå§‹ reply tokenï¼Œå‘é€ä¸€ä¸ª **Template Buttons** æ°”æ³¡ï¼š

> ðŸ¤” Still thinking. Tap below to fetch the answer when it's ready.
>
> [ Get answer ]

ç”¨æˆ·åœ¨æ–¹ä¾¿æ—¶ç‚¹å‡» **Get answer** â€” è¯¥ postback ä¼šå¸¦æ¥ä¸€ä¸ª*æ–°çš„* reply tokenï¼Œé€‚é…å™¨ç”¨å®ƒå‘é€ç¼“å­˜çš„ç­”æ¡ˆï¼ˆä»ç„¶å…è´¹ï¼‰ã€‚

çŠ¶æ€æœºï¼š`PENDING â†’ READY â†’ DELIVERED`ï¼Œä»¥åŠ `ERROR`ï¼ˆç”¨äºŽå·²å–æ¶ˆçš„è¿è¡Œ â€” æ‰§è¡Œ `/stop` åŽï¼Œå­¤ç«‹çš„ PENDING çŠ¶æ€ä¼šè§£æžä¸º"Run was interrupted before completion."ï¼Œé¿å…æŒä¹…æŒ‰é’®å¾ªçŽ¯è§¦å‘ï¼‰ã€‚

å¦‚éœ€ç¦ç”¨ postback æŒ‰é’®å¹¶å§‹ç»ˆå›žé€€è‡³ Push APIï¼š

```env
LINE_SLOW_RESPONSE_THRESHOLD=0
```

ä¸ºä½¿ postback æµç¨‹å¯é è§¦å‘ï¼Œè¯·æŠ‘åˆ¶å¯èƒ½åœ¨é˜ˆå€¼å‰æ¶ˆè€— reply token çš„å†—ä½™è¾“å‡ºï¼š

```yaml
# ~/.zed/config.yaml
display:
  interim_assistant_messages: false
  platforms:
    line:
      tool_progress: off
```

---

## Cron / é€šçŸ¥æŽ¨é€

```env
LINE_HOME_CHANNEL=Uxxxxxxxxxxxxxxxxxxxx     # é»˜è®¤æŽ¨é€ç›®æ ‡
```

è®¾ç½®äº† `deliver: line` çš„ Cron ä»»åŠ¡ä¼šè·¯ç”±è‡³ `LINE_HOME_CHANNEL`ã€‚é€‚é…å™¨å†…ç½®ç‹¬ç«‹çš„ä»… Push å‘é€å™¨ï¼Œå› æ­¤å³ä½¿ cron åœ¨ç‹¬ç«‹è¿›ç¨‹ä¸­è¿è¡Œï¼Œä¹Ÿèƒ½æ­£å¸¸å·¥ä½œã€‚

---

## çŽ¯å¢ƒå˜é‡å‚è€ƒ

| å˜é‡ | æ˜¯å¦å¿…å¡« | é»˜è®¤å€¼ | è¯´æ˜Ž |
|---|---|---|---|
| `LINE_CHANNEL_ACCESS_TOKEN` | æ˜¯ | â€” | é•¿æœŸæœ‰æ•ˆçš„é¢‘é“è®¿é—® token |
| `LINE_CHANNEL_SECRET` | æ˜¯ | â€” | Channel secretï¼ˆç”¨äºŽ HMAC-SHA256 webhook éªŒè¯ï¼‰ |
| `LINE_HOST` | å¦ | `0.0.0.0` | Webhook ç»‘å®šä¸»æœº |
| `LINE_PORT` | å¦ | `8646` | Webhook ç»‘å®šç«¯å£ |
| `LINE_PUBLIC_URL` | åª’ä½“å‘é€æ—¶å¿…å¡« | â€” | å…¬ç½‘ HTTPS åŸºç¡€ URLï¼›å‘é€å›¾ç‰‡/éŸ³é¢‘/è§†é¢‘æ—¶å¿…é¡»è®¾ç½® |
| `LINE_ALLOWED_USERS` | ä¸‰é€‰ä¸€ | â€” | é€—å·åˆ†éš”çš„ç”¨æˆ· IDï¼ˆU å¼€å¤´ï¼‰ |
| `LINE_ALLOWED_GROUPS` | ä¸‰é€‰ä¸€ | â€” | é€—å·åˆ†éš”çš„ç¾¤ç»„ IDï¼ˆC å¼€å¤´ï¼‰ |
| `LINE_ALLOWED_ROOMS` | ä¸‰é€‰ä¸€ | â€” | é€—å·åˆ†éš”çš„æˆ¿é—´ IDï¼ˆR å¼€å¤´ï¼‰ |
| `LINE_ALLOW_ALL_USERS` | ä»…å¼€å‘çŽ¯å¢ƒ | `false` | å®Œå…¨è·³è¿‡ç™½åå•éªŒè¯ |
| `LINE_HOME_CHANNEL` | å¦ | â€” | é»˜è®¤ cron / é€šçŸ¥æŽ¨é€ç›®æ ‡ |
| `LINE_SLOW_RESPONSE_THRESHOLD` | å¦ | `45` | è§¦å‘ postback æŒ‰é’®çš„ç­‰å¾…ç§’æ•°ï¼ˆ`0` = ç¦ç”¨ï¼‰ |
| `LINE_PENDING_TEXT` | å¦ | "ðŸ¤” Still thinkingâ€¦" | postback æŒ‰é’®æ—æ˜¾ç¤ºçš„æ°”æ³¡æ–‡æœ¬ |
| `LINE_BUTTON_LABEL` | å¦ | "Get answer" | æŒ‰é’®æ ‡ç­¾ |
| `LINE_DELIVERED_TEXT` | å¦ | "Already replied âœ…" | å†æ¬¡ç‚¹å‡»å·²é€è¾¾æŒ‰é’®æ—¶çš„å›žå¤ |
| `LINE_INTERRUPTED_TEXT` | å¦ | "Run was interrupted before completion." | ç‚¹å‡» `/stop` å­¤ç«‹æŒ‰é’®æ—¶çš„å›žå¤ |

---

## æ•…éšœæŽ’æŸ¥

**webhook éªŒè¯æ—¶æç¤º"invalid signature"ã€‚** `Channel secret` å¤åˆ¶æœ‰è¯¯ï¼Œæˆ–éš§é“é‡å†™äº†è¯·æ±‚ä½“ã€‚è¯·å…ˆç”¨ `curl -i https://<tunnel>/line/webhook/health` éªŒè¯ â€” åº”è¿”å›ž `{"status":"ok","platform":"line"}`ã€‚

**æœºå™¨äººåœ¨ç¾¤ç»„ä¸­æ”¶ä¸åˆ°æ¶ˆæ¯ã€‚** æ£€æŸ¥ `LINE_ALLOWED_GROUPS` æ˜¯å¦åŒ…å«å¯¹åº”çš„ `C...` ç¾¤ç»„ IDã€‚å¦‚éœ€æŸ¥æ‰¾ç¾¤ç»„ IDï¼Œå‘é€ä¸€æ¡æµ‹è¯•æ¶ˆæ¯åŽåœ¨ `~/.zed/logs/gateway.log` ä¸­æœç´¢ `LINE: rejecting unauthorized source` â€” è¢«æ‹’ç»çš„ source å­—å…¸ä¸­åŒ…å«ç›¸å…³ IDã€‚

**`send_image` æŠ¥é”™"LINE_PUBLIC_URL must be set"ã€‚** LINE Messaging API ä¸æŽ¥å—äºŒè¿›åˆ¶ä¸Šä¼  â€” å›¾ç‰‡ã€éŸ³é¢‘å’Œè§†é¢‘å¿…é¡»æ˜¯å¯è®¿é—®çš„ HTTPS URLã€‚å°† `LINE_PUBLIC_URL` è®¾ç½®ä¸ºéš§é“çš„å…¬ç½‘ä¸»æœºåï¼Œé€‚é…å™¨ä¼šè‡ªåŠ¨ä»Ž `/line/media/<token>/<filename>` æä¾›æ–‡ä»¶æœåŠ¡ã€‚

**postback æŒ‰é’®å§‹ç»ˆä¸å‡ºçŽ°ã€‚** è¦ä¹ˆ LLM çš„å“åº”é€Ÿåº¦å¿«äºŽ `LINE_SLOW_RESPONSE_THRESHOLD`ï¼Œè¦ä¹ˆå…¶ä»–æ°”æ³¡ï¼ˆå·¥å…·è¿›åº¦ã€æµå¼è¾“å‡ºï¼‰å·²æå‰æ¶ˆè€—äº† reply tokenã€‚å‚è§"LLM å“åº”ç¼“æ…¢"ä¸­çš„æŠ‘åˆ¶é…ç½®ã€‚

**"already in use by another profile"ã€‚** åŒä¸€ä¸ªé¢‘é“è®¿é—® token å·²è¢«å¦ä¸€ä¸ªè¿è¡Œä¸­çš„ Zed profile å ç”¨ã€‚è¯·åœæ­¢å¦ä¸€ä¸ª gatewayï¼Œæˆ–ä½¿ç”¨ç‹¬ç«‹çš„é¢‘é“ã€‚

---

## é™åˆ¶

* **æ°”æ³¡ä¸Žé•¿åº¦ä¸Šé™ã€‚** æ¯ä¸ª LINE æ–‡æœ¬æ°”æ³¡æœ€å¤š 5000 ä¸ªå­—ç¬¦ã€‚è¶…é•¿å“åº”ä¼šåœ¨æ¯æ¬¡ Reply/Push è°ƒç”¨ä¸­æŒ‰çº¦ 4500 ä¸ªå­—ç¬¦æ™ºèƒ½åˆ†å—ï¼ˆæœ€å¤š 5 ä¸ªæ°”æ³¡ï¼‰ï¼Œå¹¶å°½å¯èƒ½åœ¨è‡ªç„¶è¾¹ç•Œå¤„åˆ‡åˆ†ã€‚
* **ä¸æ”¯æŒåŽŸç”Ÿæ¶ˆæ¯ç¼–è¾‘ã€‚** LINE æ²¡æœ‰ç¼–è¾‘æ¶ˆæ¯çš„ API â€” æµå¼å“åº”å§‹ç»ˆå‘é€æ–°æ°”æ³¡ï¼Œä¸ä¼šç¼–è¾‘å·²æœ‰æ°”æ³¡ã€‚
* **ä¸æ”¯æŒ Markdown æ¸²æŸ“ã€‚** ç²—ä½“ï¼ˆ`**`ï¼‰ã€æ–œä½“ï¼ˆ`*`ï¼‰ã€ä»£ç å—å’Œæ ‡é¢˜å‡ä»¥å­—é¢å­—ç¬¦æ˜¾ç¤ºã€‚é€‚é…å™¨åœ¨å‘é€å‰ä¼šå°†å…¶å‰¥ç¦»ï¼›URL ä¼šè¢«ä¿ç•™ï¼ˆ`[label](url)` è½¬æ¢ä¸º `label (url)`ï¼‰ã€‚
* **åŠ è½½æŒ‡ç¤ºå™¨ä»…é™ç§èŠã€‚** LINE å¯¹ç¾¤ç»„å’Œæˆ¿é—´æ‹’ç» chat/loading APIï¼Œå› æ­¤è¾“å…¥æŒ‡ç¤ºå™¨ä»…åœ¨ 1:1 èŠå¤©ä¸­æ˜¾ç¤ºã€‚
