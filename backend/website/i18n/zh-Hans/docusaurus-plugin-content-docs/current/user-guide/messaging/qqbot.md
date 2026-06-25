# QQ Bot

é€šè¿‡**å®˜æ–¹ QQ Bot APIï¼ˆv2ï¼‰**å°† Zed æŽ¥å…¥ QQâ€”â€”æ”¯æŒç§èŠï¼ˆC2Cï¼‰ã€ç¾¤ç»„ @-æåŠã€é¢‘é“åŠç›´æŽ¥æ¶ˆæ¯ï¼Œå¹¶å…·å¤‡è¯­éŸ³è½¬å†™åŠŸèƒ½ã€‚

## æ¦‚è¿°

QQ Bot é€‚é…å™¨ä½¿ç”¨[å®˜æ–¹ QQ Bot API](https://bot.q.qq.com/wiki/develop/api-v2/) å®žçŽ°ä»¥ä¸‹åŠŸèƒ½ï¼š

- é€šè¿‡æŒä¹… **WebSocket** è¿žæŽ¥è‡³ QQ Gatewayï¼ˆç½‘å…³ï¼‰æŽ¥æ”¶æ¶ˆæ¯
- é€šè¿‡ **REST API** å‘é€æ–‡æœ¬å’Œ Markdown å›žå¤
- ä¸‹è½½å¹¶å¤„ç†å›¾ç‰‡ã€è¯­éŸ³æ¶ˆæ¯åŠæ–‡ä»¶é™„ä»¶
- ä½¿ç”¨è…¾è®¯å†…ç½® ASR æˆ–å¯é…ç½®çš„ STTï¼ˆè¯­éŸ³è½¬æ–‡å­—ï¼‰æä¾›å•†è½¬å†™è¯­éŸ³æ¶ˆæ¯

## å‰ææ¡ä»¶

1. **QQ Bot åº”ç”¨** â€” åœ¨ [q.qq.com](https://q.qq.com) æ³¨å†Œï¼š
   - åˆ›å»ºæ–°åº”ç”¨å¹¶è®°å½•æ‚¨çš„ **App ID** å’Œ **App Secret**
   - å¯ç”¨æ‰€éœ€ intentï¼ˆæ„å›¾ï¼‰ï¼šC2C æ¶ˆæ¯ã€ç¾¤ç»„ @-æ¶ˆæ¯ã€é¢‘é“æ¶ˆæ¯
   - åœ¨æ²™ç›’æ¨¡å¼ä¸‹é…ç½®æœºå™¨äººä»¥è¿›è¡Œæµ‹è¯•ï¼Œæˆ–å‘å¸ƒè‡³ç”Ÿäº§çŽ¯å¢ƒ

2. **ä¾èµ–é¡¹** â€” é€‚é…å™¨éœ€è¦ `aiohttp` å’Œ `httpx`ï¼š
   ```bash
   pip install aiohttp httpx
   ```

## é…ç½®

### äº¤äº’å¼è®¾ç½®

```bash
zed gateway setup
```

ä»Žå¹³å°åˆ—è¡¨ä¸­é€‰æ‹© **QQ Bot** å¹¶æŒ‰æç¤ºæ“ä½œã€‚

### æ‰‹åŠ¨é…ç½®

åœ¨ `~/.zed/.env` ä¸­è®¾ç½®æ‰€éœ€çŽ¯å¢ƒå˜é‡ï¼š

```bash
QQ_APP_ID=your-app-id
QQ_CLIENT_SECRET=your-app-secret
```

## çŽ¯å¢ƒå˜é‡

| å˜é‡ | æè¿° | é»˜è®¤å€¼ |
|---|---|---|
| `QQ_APP_ID` | QQ Bot App IDï¼ˆå¿…å¡«ï¼‰ | â€” |
| `QQ_CLIENT_SECRET` | QQ Bot App Secretï¼ˆå¿…å¡«ï¼‰ | â€” |
| `QQBOT_HOME_CHANNEL` | ç”¨äºŽ cron/é€šçŸ¥æŠ•é€’çš„ OpenID | â€” |
| `QQBOT_HOME_CHANNEL_NAME` | ä¸»é¢‘é“æ˜¾ç¤ºåç§° | `Home` |
| `QQ_ALLOWED_USERS` | å…è®¸ç§èŠè®¿é—®çš„ç”¨æˆ· OpenID åˆ—è¡¨ï¼ˆé€—å·åˆ†éš”ï¼‰ | å¼€æ”¾ï¼ˆæ‰€æœ‰ç”¨æˆ·ï¼‰ |
| `QQ_GROUP_ALLOWED_USERS` | å…è®¸ç¾¤ç»„è®¿é—®çš„ç¾¤ç»„ OpenID åˆ—è¡¨ï¼ˆé€—å·åˆ†éš”ï¼‰ | â€” |
| `QQ_ALLOW_ALL_USERS` | è®¾ä¸º `true` ä»¥å…è®¸æ‰€æœ‰ç§èŠ | `false` |
| `QQ_PORTAL_HOST` | è¦†ç›– QQ portal ä¸»æœºï¼ˆæ²™ç›’è·¯ç”±è®¾ä¸º `sandbox.q.qq.com`ï¼‰ | `q.qq.com` |
| `QQ_STT_API_KEY` | è¯­éŸ³è½¬æ–‡å­—æä¾›å•†çš„ API å¯†é’¥ | â€” |
| `QQ_STT_BASE_URL` | ï¼ˆä¸ç›´æŽ¥è¯»å–â€”â€”è¯·åœ¨ `config.yaml` ä¸­è®¾ç½® `platforms.qqbot.extra.stt.baseUrl`ï¼‰ | n/a |
| `QQ_STT_MODEL` | STT æ¨¡åž‹åç§° | `glm-asr` |

## é«˜çº§é…ç½®

å¦‚éœ€ç²¾ç»†æŽ§åˆ¶ï¼Œå¯åœ¨ `~/.zed/config.yaml` ä¸­æ·»åŠ å¹³å°è®¾ç½®ï¼š

```yaml
platforms:
  qqbot:
    enabled: true
    extra:
      app_id: "your-app-id"
      client_secret: "your-secret"
      markdown_support: true       # enable QQ markdown (msg_type 2). Config-only; no env-var equivalent.
      dm_policy: "open"          # open | allowlist | disabled
      allow_from:
        - "user_openid_1"
      group_policy: "open"       # open | allowlist | disabled
      group_allow_from:
        - "group_openid_1"
      stt:
        provider: "zai"          # zai (GLM-ASR), openai (Whisper), etc.
        baseUrl: "https://open.bigmodel.cn/api/coding/paas/v4"
        apiKey: "your-stt-key"
        model: "glm-asr"
```

## è¯­éŸ³æ¶ˆæ¯ï¼ˆSTTï¼‰

è¯­éŸ³è½¬å†™åˆ†ä¸¤ä¸ªé˜¶æ®µè¿›è¡Œï¼š

1. **QQ å†…ç½® ASR**ï¼ˆå…è´¹ï¼Œå§‹ç»ˆä¼˜å…ˆå°è¯•ï¼‰â€”â€”QQ åœ¨è¯­éŸ³æ¶ˆæ¯é™„ä»¶ä¸­æä¾› `asr_refer_text`ï¼Œä½¿ç”¨è…¾è®¯è‡ªæœ‰è¯­éŸ³è¯†åˆ«
2. **å·²é…ç½®çš„ STT æä¾›å•†**ï¼ˆå¤‡ç”¨ï¼‰â€”â€”è‹¥ QQ çš„ ASR æœªè¿”å›žæ–‡æœ¬ï¼Œé€‚é…å™¨å°†è°ƒç”¨å…¼å®¹ OpenAI çš„ STT APIï¼š

   - **æ™ºè°±/GLMï¼ˆzaiï¼‰**ï¼šé»˜è®¤æä¾›å•†ï¼Œä½¿ç”¨ `glm-asr` æ¨¡åž‹
   - **OpenAI Whisper**ï¼šè®¾ç½® `QQ_STT_BASE_URL` å’Œ `QQ_STT_MODEL`
   - ä»»ä½•å…¼å®¹ OpenAI çš„ STT ç«¯ç‚¹

## æ•…éšœæŽ’æŸ¥

### æœºå™¨äººç«‹å³æ–­å¼€è¿žæŽ¥ï¼ˆå¿«é€Ÿæ–­è¿žï¼‰

é€šå¸¸åŽŸå› å¦‚ä¸‹ï¼š
- **App ID / Secret æ— æ•ˆ** â€” åœ¨ q.qq.com ä»”ç»†æ ¸å¯¹æ‚¨çš„å‡­æ®
- **ç¼ºå°‘æƒé™** â€” ç¡®ä¿æœºå™¨äººå·²å¯ç”¨æ‰€éœ€ intent
- **ä»…é™æ²™ç›’çš„æœºå™¨äºº** â€” è‹¥æœºå™¨äººå¤„äºŽæ²™ç›’æ¨¡å¼ï¼Œåªèƒ½æŽ¥æ”¶æ¥è‡ª QQ æ²™ç›’æµ‹è¯•é¢‘é“çš„æ¶ˆæ¯

### è¯­éŸ³æ¶ˆæ¯æœªè¢«è½¬å†™

1. æ£€æŸ¥é™„ä»¶æ•°æ®ä¸­æ˜¯å¦å­˜åœ¨ QQ å†…ç½®çš„ `asr_refer_text`
2. è‹¥ä½¿ç”¨è‡ªå®šä¹‰ STT æä¾›å•†ï¼ŒéªŒè¯ `QQ_STT_API_KEY` æ˜¯å¦æ­£ç¡®è®¾ç½®
3. æŸ¥çœ‹ gateway æ—¥å¿—ä¸­çš„ STT é”™è¯¯ä¿¡æ¯

### æ¶ˆæ¯æœªé€è¾¾

- åœ¨ q.qq.com éªŒè¯æœºå™¨äººçš„ **intent** æ˜¯å¦å·²å¯ç”¨
- è‹¥ç§èŠè®¿é—®å—é™ï¼Œæ£€æŸ¥ `QQ_ALLOWED_USERS`
- å¯¹äºŽç¾¤ç»„æ¶ˆæ¯ï¼Œç¡®ä¿æœºå™¨äººè¢« **@æåŠ**ï¼ˆç¾¤ç»„ç­–ç•¥å¯èƒ½éœ€è¦åŠ å…¥ç™½åå•ï¼‰
- æ£€æŸ¥ `QQBOT_HOME_CHANNEL` ä»¥ç¡®è®¤ cron/é€šçŸ¥æŠ•é€’é…ç½®

### è¿žæŽ¥é”™è¯¯

- ç¡®ä¿å·²å®‰è£… `aiohttp` å’Œ `httpx`ï¼š`pip install aiohttp httpx`
- æ£€æŸ¥ä¸Ž `api.sgroup.qq.com` åŠ WebSocket gateway çš„ç½‘ç»œè¿žé€šæ€§
- æŸ¥çœ‹ gateway æ—¥å¿—ä»¥èŽ·å–è¯¦ç»†é”™è¯¯ä¿¡æ¯å’Œé‡è¿žè¡Œä¸º