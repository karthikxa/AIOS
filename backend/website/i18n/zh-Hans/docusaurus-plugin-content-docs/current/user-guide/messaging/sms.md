---
sidebar_position: 8
sidebar_label: "SMS (Twilio)"
title: "SMS (Twilio)"
description: "é€šè¿‡ Twilio å°† Zed Agent è®¾ç½®ä¸º SMS èŠå¤©æœºå™¨äºº"
---

# SMS è®¾ç½®ï¼ˆTwilioï¼‰

Zed é€šè¿‡ [Twilio](https://www.twilio.com/) API æŽ¥å…¥ SMSã€‚ç”¨æˆ·å‘ä½ çš„ Twilio ç”µè¯å·ç å‘é€çŸ­ä¿¡ï¼Œå³å¯èŽ·å¾— AI å›žå¤â€”â€”ä¸Ž Telegram æˆ– Discord çš„å¯¹è¯ä½“éªŒç›¸åŒï¼Œä½†é€šè¿‡æ ‡å‡†çŸ­ä¿¡è¿›è¡Œã€‚

:::info å…±äº«å‡­æ®
SMS gatewayï¼ˆç½‘å…³ï¼‰ä¸Žå¯é€‰çš„ [telephony skill](/reference/skills-catalog) å…±äº«å‡­æ®ã€‚å¦‚æžœä½ å·²ä¸ºè¯­éŸ³é€šè¯æˆ–å•æ¬¡ SMS é…ç½®äº† Twilioï¼Œè¯¥ gateway å¯ç›´æŽ¥ä½¿ç”¨ç›¸åŒçš„ `TWILIO_ACCOUNT_SID`ã€`TWILIO_AUTH_TOKEN` å’Œ `TWILIO_PHONE_NUMBER`ã€‚
:::

---

## å‰ææ¡ä»¶

- **Twilio è´¦æˆ·** â€” [åœ¨ twilio.com æ³¨å†Œ](https://www.twilio.com/try-twilio)ï¼ˆæä¾›å…è´¹è¯•ç”¨ï¼‰
- **å…·å¤‡ SMS åŠŸèƒ½çš„ Twilio ç”µè¯å·ç **
- **å¯å…¬å¼€è®¿é—®çš„æœåŠ¡å™¨** â€” Twilio åœ¨æ”¶åˆ° SMS æ—¶ä¼šå‘ä½ çš„æœåŠ¡å™¨å‘é€ webhook
- **aiohttp** â€” `pip install 'zed-agent[sms]'`

---

## ç¬¬ä¸€æ­¥ï¼šèŽ·å– Twilio å‡­æ®

1. å‰å¾€ [Twilio æŽ§åˆ¶å°](https://console.twilio.com/)
2. ä»Žä»ªè¡¨æ¿å¤åˆ¶ä½ çš„ **Account SID** å’Œ **Auth Token**
3. å‰å¾€ **Phone Numbers â†’ Manage â†’ Active Numbers**ï¼Œè®°å½• E.164 æ ¼å¼çš„ç”µè¯å·ç ï¼ˆä¾‹å¦‚ `+15551234567`ï¼‰

---

## ç¬¬äºŒæ­¥ï¼šé…ç½® Zed

### äº¤äº’å¼è®¾ç½®ï¼ˆæŽ¨èï¼‰

```bash
zed gateway setup
```

ä»Žå¹³å°åˆ—è¡¨ä¸­é€‰æ‹© **SMS (Twilio)**ï¼Œå‘å¯¼å°†æç¤ºä½ è¾“å…¥å‡­æ®ã€‚

### æ‰‹åŠ¨è®¾ç½®

åœ¨ `~/.zed/.env` ä¸­æ·»åŠ ï¼š

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567

# å®‰å…¨ï¼šé™åˆ¶ç‰¹å®šç”µè¯å·ç ï¼ˆæŽ¨èï¼‰
SMS_ALLOWED_USERS=+15559876543,+15551112222

# å¯é€‰ï¼šä¸º cron ä»»åŠ¡æŠ•é€’è®¾ç½®ä¸»é¢‘é“
SMS_HOME_CHANNEL=+15559876543
```

---

## ç¬¬ä¸‰æ­¥ï¼šé…ç½® Twilio Webhook

Twilio éœ€è¦çŸ¥é“å°†ä¼ å…¥æ¶ˆæ¯å‘é€åˆ°å“ªé‡Œã€‚åœ¨ [Twilio æŽ§åˆ¶å°](https://console.twilio.com/) ä¸­ï¼š

1. å‰å¾€ **Phone Numbers â†’ Manage â†’ Active Numbers**
2. ç‚¹å‡»ä½ çš„ç”µè¯å·ç 
3. åœ¨ **Messaging â†’ A MESSAGE COMES IN** ä¸‹ï¼Œè®¾ç½®ï¼š
   - **Webhook**ï¼š`https://your-server:8080/webhooks/twilio`
   - **HTTP Method**ï¼š`POST`

:::tip æš´éœ²ä½ çš„ Webhook
å¦‚æžœä½ åœ¨æœ¬åœ°è¿è¡Œ Zedï¼Œè¯·ä½¿ç”¨éš§é“å·¥å…·æš´éœ² webhookï¼š

```bash
# ä½¿ç”¨ cloudflared
cloudflared tunnel --url http://localhost:8080

# ä½¿ç”¨ ngrok
ngrok http 8080
```

å°†ç”Ÿæˆçš„å…¬ç½‘ URL è®¾ç½®ä¸ºä½ çš„ Twilio webhookã€‚
:::

**å°† `SMS_WEBHOOK_URL` è®¾ç½®ä¸ºä½ åœ¨ Twilio ä¸­é…ç½®çš„ç›¸åŒ URLã€‚** è¿™æ˜¯ Twilio ç­¾åéªŒè¯æ‰€å¿…éœ€çš„â€”â€”å¦‚æžœæœªè®¾ç½®ï¼Œé€‚é…å™¨å°†æ‹’ç»å¯åŠ¨ï¼š

```bash
# å¿…é¡»ä¸Ž Twilio æŽ§åˆ¶å°ä¸­çš„ webhook URL ä¸€è‡´
SMS_WEBHOOK_URL=https://your-server:8080/webhooks/twilio
```

webhook ç«¯å£é»˜è®¤ä¸º `8080`ï¼Œå¯é€šè¿‡ä»¥ä¸‹æ–¹å¼è¦†ç›–ï¼š

```bash
SMS_WEBHOOK_PORT=3000
```

---

## ç¬¬å››æ­¥ï¼šå¯åŠ¨ Gateway

```bash
zed gateway
```

ä½ åº”è¯¥çœ‹åˆ°ï¼š

```
[sms] Twilio webhook server listening on 127.0.0.1:8080, from: +1555***4567
```

å¦‚æžœçœ‹åˆ° `Refusing to start: SMS_WEBHOOK_URL is required`ï¼Œè¯·å°† `SMS_WEBHOOK_URL` è®¾ç½®ä¸ºä½ åœ¨ Twilio æŽ§åˆ¶å°ä¸­é…ç½®çš„å…¬ç½‘ URLï¼ˆå‚è§ç¬¬ä¸‰æ­¥ï¼‰ã€‚

å‘ä½ çš„ Twilio å·ç å‘é€çŸ­ä¿¡â€”â€”Zed å°†é€šè¿‡ SMS å›žå¤ã€‚

---

## çŽ¯å¢ƒå˜é‡

| å˜é‡ | æ˜¯å¦å¿…å¡« | è¯´æ˜Ž |
|----------|----------|-------------|
| `TWILIO_ACCOUNT_SID` | æ˜¯ | Twilio Account SIDï¼ˆä»¥ `AC` å¼€å¤´ï¼‰ |
| `TWILIO_AUTH_TOKEN` | æ˜¯ | Twilio Auth Tokenï¼ˆåŒæ—¶ç”¨äºŽ webhook ç­¾åéªŒè¯ï¼‰ |
| `TWILIO_PHONE_NUMBER` | æ˜¯ | ä½ çš„ Twilio ç”µè¯å·ç ï¼ˆE.164 æ ¼å¼ï¼‰ |
| `SMS_WEBHOOK_URL` | æ˜¯ | ç”¨äºŽ Twilio ç­¾åéªŒè¯çš„å…¬ç½‘ URLâ€”â€”å¿…é¡»ä¸Ž Twilio æŽ§åˆ¶å°ä¸­çš„ webhook URL ä¸€è‡´ |
| `SMS_WEBHOOK_PORT` | å¦ | Webhook ç›‘å¬ç«¯å£ï¼ˆé»˜è®¤ï¼š`8080`ï¼‰ |
| `SMS_WEBHOOK_HOST` | å¦ | Webhook ç»‘å®šåœ°å€ï¼ˆé»˜è®¤ï¼š`127.0.0.1`ï¼‰ |
| `SMS_INSECURE_NO_SIGNATURE` | å¦ | è®¾ä¸º `true` å¯ç¦ç”¨ç­¾åéªŒè¯ï¼ˆä»…é™æœ¬åœ°å¼€å‘â€”â€”**ä¸é€‚ç”¨äºŽç”Ÿäº§çŽ¯å¢ƒ**ï¼‰ |
| `SMS_ALLOWED_USERS` | å¦ | å…è®¸èŠå¤©çš„ E.164 æ ¼å¼ç”µè¯å·ç ï¼Œé€—å·åˆ†éš” |
| `SMS_ALLOW_ALL_USERS` | å¦ | è®¾ä¸º `true` å…è®¸æ‰€æœ‰äººï¼ˆä¸æŽ¨èï¼‰ |
| `SMS_HOME_CHANNEL` | å¦ | ç”¨äºŽ cron ä»»åŠ¡ï¼é€šçŸ¥æŠ•é€’çš„ç”µè¯å·ç  |
| `SMS_HOME_CHANNEL_NAME` | å¦ | ä¸»é¢‘é“çš„æ˜¾ç¤ºåç§°ï¼ˆé»˜è®¤ï¼š`Home`ï¼‰ |

---

## SMS ç‰¹æœ‰è¡Œä¸º

- **çº¯æ–‡æœ¬** â€” Markdown ä¼šè¢«è‡ªåŠ¨å‰¥ç¦»ï¼Œå› ä¸º SMS ä¼šå°†å…¶æ¸²æŸ“ä¸ºå­—é¢å­—ç¬¦
- **1600 å­—ç¬¦é™åˆ¶** â€” è¾ƒé•¿çš„å›žå¤ä¼šåœ¨è‡ªç„¶è¾¹ç•Œå¤„ï¼ˆæ¢è¡Œç¬¦ï¼Œå…¶æ¬¡æ˜¯ç©ºæ ¼ï¼‰æ‹†åˆ†ä¸ºå¤šæ¡æ¶ˆæ¯
- **é˜²å›žå£°** â€” æ¥è‡ªä½ è‡ªå·± Twilio å·ç çš„æ¶ˆæ¯å°†è¢«å¿½ç•¥ï¼Œä»¥é˜²æ­¢å¾ªçŽ¯
- **ç”µè¯å·ç è„±æ•** â€” æ—¥å¿—ä¸­çš„ç”µè¯å·ç ä¼šè¢«è„±æ•å¤„ç†ä»¥ä¿æŠ¤éšç§

---

## å®‰å…¨

### Webhook ç­¾åéªŒè¯

Zed é€šè¿‡éªŒè¯ `X-Twilio-Signature` å¤´ï¼ˆHMAC-SHA1ï¼‰æ¥ç¡®è®¤å…¥ç«™ webhook ç¡®å®žæ¥è‡ª Twilioï¼Œé˜²æ­¢æ”»å‡»è€…æ³¨å…¥ä¼ªé€ æ¶ˆæ¯ã€‚

**`SMS_WEBHOOK_URL` ä¸ºå¿…å¡«é¡¹ã€‚** å°†å…¶è®¾ç½®ä¸ºä½ åœ¨ Twilio æŽ§åˆ¶å°ä¸­é…ç½®çš„å…¬ç½‘ URLï¼Œå¦åˆ™é€‚é…å™¨å°†æ‹’ç»å¯åŠ¨ã€‚

å¦‚éœ€åœ¨æœ¬åœ°å¼€å‘æ—¶ä¸ä½¿ç”¨å…¬ç½‘ URLï¼Œå¯ç¦ç”¨éªŒè¯ï¼š

```bash
# ä»…é™æœ¬åœ°å¼€å‘â€”â€”ä¸é€‚ç”¨äºŽç”Ÿäº§çŽ¯å¢ƒ
SMS_INSECURE_NO_SIGNATURE=true
```

### ç”¨æˆ·ç™½åå•

**Gateway é»˜è®¤æ‹’ç»æ‰€æœ‰ç”¨æˆ·ã€‚** è¯·é…ç½®ç™½åå•ï¼š

```bash
# æŽ¨èï¼šé™åˆ¶ç‰¹å®šç”µè¯å·ç 
SMS_ALLOWED_USERS=+15559876543,+15551112222

# æˆ–å…è®¸æ‰€æœ‰äººï¼ˆå¯¹äºŽå…·æœ‰ç»ˆç«¯è®¿é—®æƒé™çš„æœºå™¨äººï¼Œä¸æŽ¨èï¼‰
SMS_ALLOW_ALL_USERS=true
```

:::warning
SMS æ²¡æœ‰å†…ç½®åŠ å¯†ã€‚é™¤éžä½ äº†è§£ç›¸å…³å®‰å…¨é£Žé™©ï¼Œå¦åˆ™ä¸è¦é€šè¿‡ SMS è¿›è¡Œæ•æ„Ÿæ“ä½œã€‚å¯¹äºŽæ•æ„Ÿåœºæ™¯ï¼Œè¯·ä¼˜å…ˆä½¿ç”¨ Signal æˆ– Telegramã€‚
:::

---

## æ•…éšœæŽ’æŸ¥

### æ¶ˆæ¯æœªåˆ°è¾¾

1. æ£€æŸ¥ Twilio webhook URL æ˜¯å¦æ­£ç¡®ä¸”å¯å…¬å¼€è®¿é—®
2. éªŒè¯ `TWILIO_ACCOUNT_SID` å’Œ `TWILIO_AUTH_TOKEN` æ˜¯å¦æ­£ç¡®
3. åœ¨ Twilio æŽ§åˆ¶å° â†’ **Monitor â†’ Logs â†’ Messaging** ä¸­æŸ¥çœ‹æŠ•é€’é”™è¯¯
4. ç¡®ä¿ä½ çš„ç”µè¯å·ç åœ¨ `SMS_ALLOWED_USERS` ä¸­ï¼ˆæˆ–è®¾ç½® `SMS_ALLOW_ALL_USERS=true`ï¼‰

### å›žå¤æœªå‘é€

1. æ£€æŸ¥ `TWILIO_PHONE_NUMBER` æ˜¯å¦æ­£ç¡®è®¾ç½®ï¼ˆE.164 æ ¼å¼ï¼Œå¸¦ `+`ï¼‰
2. éªŒè¯ä½ çš„ Twilio è´¦æˆ·æ˜¯å¦æœ‰æ”¯æŒ SMS çš„å·ç 
3. æŸ¥çœ‹ Zed gateway æ—¥å¿—ä¸­çš„ Twilio API é”™è¯¯

### Webhook ç«¯å£å†²çª

å¦‚æžœ 8080 ç«¯å£å·²è¢«å ç”¨ï¼Œè¯·æ›´æ”¹ç«¯å£ï¼š

```bash
SMS_WEBHOOK_PORT=3001
```

å¹¶åœ¨ Twilio æŽ§åˆ¶å°ä¸­æ›´æ–° webhook URL ä»¥åŒ¹é…æ–°ç«¯å£ã€‚