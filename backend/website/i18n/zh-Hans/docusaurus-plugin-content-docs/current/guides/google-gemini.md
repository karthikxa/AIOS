---
sidebar_position: 16
title: "Google Gemini"
description: "å°† Zed Agent ä¸Ž Google Gemini é…åˆä½¿ç”¨â€”â€”åŽŸç”Ÿ AI Studio APIã€API å¯†é’¥é…ç½®ã€OAuth é€‰é¡¹ã€å·¥å…·è°ƒç”¨ã€æµå¼ä¼ è¾“åŠé…é¢è¯´æ˜Ž"
---

# Google Gemini

Zed Agent é€šè¿‡ **Google AI Studio / Gemini API** åŽŸç”Ÿæ”¯æŒ Google Geminiâ€”â€”è€Œéž OpenAI å…¼å®¹ç«¯ç‚¹ã€‚è¿™ä½¿ Zed èƒ½å¤Ÿå°†å…¶å†…éƒ¨ OpenAI æ ¼å¼çš„æ¶ˆæ¯å’Œå·¥å…·å¾ªçŽ¯è½¬æ¢ä¸º Gemini åŽŸç”Ÿçš„ `generateContent` APIï¼ŒåŒæ—¶ä¿ç•™å·¥å…·è°ƒç”¨ã€æµå¼ä¼ è¾“ã€å¤šæ¨¡æ€è¾“å…¥ä»¥åŠ Gemini ç‰¹æœ‰çš„å“åº”å…ƒæ•°æ®ã€‚

Zed è¿˜æ”¯æŒç‹¬ç«‹çš„ **Google Geminiï¼ˆOAuthï¼‰** providerï¼Œä½¿ç”¨ä¸Ž Google Gemini CLI ç›¸åŒçš„ Cloud Code Assist åŽç«¯ã€‚å¦‚éœ€æœ€ä½Žé£Žé™©çš„å®˜æ–¹ API è·¯å¾„ï¼Œè¯·ä½¿ç”¨ API å¯†é’¥ providerï¼ˆ`gemini`ï¼‰ã€‚

## å‰ææ¡ä»¶

- **Google AI Studio API å¯†é’¥** â€” åœ¨ [aistudio.google.com/apikey](https://aistudio.google.com/apikey) åˆ›å»º
- **å·²å¯ç”¨è®¡è´¹çš„ Google Cloud é¡¹ç›®** â€” æŽ¨èç”¨äºŽ Agent åœºæ™¯ã€‚Gemini å…è´¹å±‚çº§å¯¹é•¿æ—¶é—´è¿è¡Œçš„ Agent ä¼šè¯è€Œè¨€é…é¢è¿‡å°ï¼Œå› ä¸º Zed æ¯æ¬¡ç”¨æˆ·äº¤äº’å¯èƒ½å‘èµ·å¤šæ¬¡æ¨¡åž‹è°ƒç”¨ã€‚
- **å·²å®‰è£… Zed** â€” åŽŸç”Ÿ Gemini provider æ— éœ€é¢å¤–å®‰è£… Python åŒ…ã€‚

:::tip API å¯†é’¥è·¯å¾„
è®¾ç½® `GOOGLE_API_KEY` æˆ– `GEMINI_API_KEY`ã€‚Zed å¯¹ `gemini` provider ä¼šåŒæ—¶æ£€æŸ¥è¿™ä¸¤ä¸ªåç§°ã€‚
:::

## å¿«é€Ÿå¼€å§‹

```bash
# æ·»åŠ  Gemini API å¯†é’¥
echo "GOOGLE_API_KEY=..." >> ~/.zed/.env

# é€‰æ‹© Gemini ä½œä¸º provider
zed model
# â†’ é€‰æ‹© "More providers..." â†’ "Google AI Studio"
# â†’ Zed æ£€æŸ¥å¯†é’¥å±‚çº§å¹¶æ˜¾ç¤º Gemini æ¨¡åž‹åˆ—è¡¨
# â†’ é€‰æ‹©ä¸€ä¸ªæ¨¡åž‹

# å¼€å§‹å¯¹è¯
zed chat
```

å¦‚æžœä½ åå¥½ç›´æŽ¥ç¼–è¾‘é…ç½®æ–‡ä»¶ï¼Œè¯·ä½¿ç”¨åŽŸç”Ÿ Gemini API åŸºç¡€ URLï¼š

```yaml
model:
  default: gemini-3-flash-preview
  provider: gemini
  base_url: https://generativelanguage.googleapis.com/v1beta
```

## é…ç½®

è¿è¡Œ `zed model` åŽï¼Œ`~/.zed/config.yaml` å°†åŒ…å«ï¼š

```yaml
model:
  default: gemini-3-flash-preview
  provider: gemini
  base_url: https://generativelanguage.googleapis.com/v1beta
```

`~/.zed/.env` ä¸­ï¼š

```bash
GOOGLE_API_KEY=...
```

### åŽŸç”Ÿ Gemini API

æŽ¨èä½¿ç”¨çš„ç«¯ç‚¹ä¸ºï¼š

```text
https://generativelanguage.googleapis.com/v1beta
```

Zed æ£€æµ‹åˆ°è¯¥ç«¯ç‚¹åŽä¼šåˆ›å»ºåŽŸç”Ÿ Gemini é€‚é…å™¨ã€‚åœ¨å†…éƒ¨ï¼ŒZed ä»ä»¥ OpenAI æ ¼å¼ç»´æŠ¤ Agent å¾ªçŽ¯ï¼Œç„¶åŽå°†æ¯ä¸ªè¯·æ±‚è½¬æ¢ä¸º Gemini åŽŸç”Ÿ schemaï¼š

- `messages[]` â†’ Gemini `contents[]`
- ç³»ç»Ÿæç¤ºï¼ˆsystem promptï¼‰â†’ Gemini `systemInstruction`
- å·¥å…· schema â†’ Gemini `functionDeclarations`
- å·¥å…·ç»“æžœ â†’ Gemini `functionResponse` éƒ¨åˆ†
- æµå¼å“åº” â†’ ä¾› Zed å¾ªçŽ¯ä½¿ç”¨çš„ OpenAI æ ¼å¼æµå¼æ•°æ®å—

:::note Gemini 3 æ€ç»´ç­¾å
å¯¹äºŽ Gemini 3 çš„å·¥å…·è°ƒç”¨ï¼ŒZed ä¼šä¿ç•™é™„åŠ åœ¨å‡½æ•°è°ƒç”¨éƒ¨åˆ†çš„ `thoughtSignature` å€¼ï¼Œå¹¶åœ¨ä¸‹ä¸€ä¸ªå·¥å…·è½®æ¬¡ä¸­é‡æ”¾ã€‚è¿™è¦†ç›–äº†å¤šæ­¥éª¤ Agent å·¥ä½œæµä¸­éªŒè¯å…³é”®è·¯å¾„çš„éœ€æ±‚ã€‚

Gemini 3 ä¹Ÿå¯èƒ½åœ¨å…¶ä»–å“åº”éƒ¨åˆ†é™„åŠ æ€ç»´ç­¾åã€‚Zed çš„åŽŸç”Ÿé€‚é…å™¨ç›®å‰é’ˆå¯¹ Agent å·¥å…·å¾ªçŽ¯è¿›è¡Œäº†ä¼˜åŒ–ï¼Œå°šæœªä»¥å®Œæ•´çš„éƒ¨åˆ†çº§ä¿çœŸåº¦é‡æ”¾æ‰€æœ‰éžå·¥å…·è°ƒç”¨ç­¾åã€‚
:::

### ä¼˜å…ˆä½¿ç”¨åŽŸç”Ÿç«¯ç‚¹

Google è¿˜æä¾›äº† OpenAI å…¼å®¹ç«¯ç‚¹ï¼š

```text
https://generativelanguage.googleapis.com/v1beta/openai/
```

å¯¹äºŽ Zed Agent ä¼šè¯ï¼Œè¯·ä¼˜å…ˆä½¿ç”¨ä¸Šè¿°åŽŸç”Ÿ Gemini ç«¯ç‚¹ã€‚Zed å†…ç½®åŽŸç”Ÿ Gemini é€‚é…å™¨ï¼Œå¯å°†å¤šè½®å·¥å…·è°ƒç”¨ã€å·¥å…·è°ƒç”¨ç»“æžœã€æµå¼ä¼ è¾“ã€å¤šæ¨¡æ€è¾“å…¥ä»¥åŠ Gemini å“åº”å…ƒæ•°æ®ç›´æŽ¥æ˜ å°„åˆ° Gemini çš„ `generateContent` APIã€‚OpenAI å…¼å®¹ç«¯ç‚¹åœ¨ä½ æ˜Žç¡®éœ€è¦ OpenAI API å…¼å®¹æ€§æ—¶ä»ç„¶æœ‰ç”¨ã€‚

å¦‚æžœä½ ä¹‹å‰å°† `GEMINI_BASE_URL` è®¾ç½®ä¸º `/openai` URLï¼Œè¯·å°†å…¶åˆ é™¤æˆ–ä¿®æ”¹ï¼š

```bash
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
```

### OAuth Provider

Zed è¿˜æä¾› `google-gemini-cli` providerï¼š

```bash
zed model
# â†’ é€‰æ‹© "Google Gemini (OAuth)"
```

è¯¥æ–¹å¼ä½¿ç”¨æµè§ˆå™¨ PKCE ç™»å½•å’Œ Cloud Code Assist åŽç«¯ã€‚å¯¹äºŽå¸Œæœ›ä½¿ç”¨ Gemini CLI é£Žæ ¼ OAuth çš„ç”¨æˆ·å¯èƒ½æœ‰ç”¨ï¼Œä½† Zed ä¼šæ˜¾ç¤ºæ˜Žç¡®è­¦å‘Šï¼Œå› ä¸º Google å¯èƒ½å°†ç¬¬ä¸‰æ–¹è½¯ä»¶ä½¿ç”¨ Gemini CLI OAuth å®¢æˆ·ç«¯çš„è¡Œä¸ºè§†ä¸ºè¿åæ”¿ç­–ã€‚å¯¹äºŽç”Ÿäº§çŽ¯å¢ƒæˆ–æœ€ä½Žé£Žé™©ä½¿ç”¨åœºæ™¯ï¼Œè¯·ä¼˜å…ˆä½¿ç”¨ä¸Šè¿° API å¯†é’¥ providerã€‚

## å¯ç”¨æ¨¡åž‹

`zed model` é€‰æ‹©å™¨æ˜¾ç¤º Zed provider æ³¨å†Œè¡¨ä¸­ç»´æŠ¤çš„ Gemini æ¨¡åž‹ã€‚å¸¸è§é€‰é¡¹åŒ…æ‹¬ï¼š

| æ¨¡åž‹ | ID | è¯´æ˜Ž |
|------|----|------|
| Gemini 3.1 Pro Preview | `gemini-3.1-pro-preview` | å¯ç”¨æ—¶æœ€å¼ºå¤§çš„é¢„è§ˆæ¨¡åž‹ |
| Gemini 3 Pro Preview | `gemini-3-pro-preview` | å¼ºå¤§çš„æŽ¨ç†å’Œç¼–ç æ¨¡åž‹ |
| Gemini 3 Flash Preview | `gemini-3-flash-preview` | æŽ¨èçš„é»˜è®¤é€‰é¡¹ï¼Œé€Ÿåº¦ä¸Žèƒ½åŠ›å‡è¡¡ |
| Gemini 3.1 Flash Lite Preview | `gemini-3.1-flash-lite-preview` | å¯ç”¨æ—¶é€Ÿåº¦æœ€å¿«ã€æˆæœ¬æœ€ä½Žçš„é€‰é¡¹ |

æ¨¡åž‹å¯ç”¨æ€§ä¼šéšæ—¶é—´å˜åŒ–ã€‚å¦‚æžœæŸä¸ªæ¨¡åž‹æ¶ˆå¤±æˆ–æœªå¯¹ä½ çš„å¯†é’¥å¯ç”¨ï¼Œè¯·é‡æ–°è¿è¡Œ `zed model` å¹¶ä»Žå½“å‰åˆ—è¡¨ä¸­é€‰æ‹©ã€‚

:::info æ¨¡åž‹ ID
å½“ `provider: gemini` æ—¶ï¼Œè¯·ä½¿ç”¨ Gemini åŽŸç”Ÿæ¨¡åž‹ IDï¼Œå¦‚ `gemini-3-flash-preview`ï¼Œè€Œéž OpenRouter é£Žæ ¼çš„ IDï¼ˆå¦‚ `google/gemini-3-flash-preview`ï¼‰ã€‚
:::

### æœ€æ–°åˆ«å

Google ä¸º Pro å’Œ Flash Gemini ç³»åˆ—å‘å¸ƒäº†æ»šåŠ¨åˆ«åã€‚å½“ä½ å¸Œæœ› Google è‡ªåŠ¨å‡çº§æ¨¡åž‹è€Œæ— éœ€ä¿®æ”¹ Zed é…ç½®æ—¶ï¼Œ`gemini-pro-latest` å’Œ `gemini-flash-latest` éžå¸¸å®žç”¨ã€‚

| åˆ«å | å½“å‰æŒ‡å‘ | è¯´æ˜Ž |
|------|----------|------|
| `gemini-pro-latest` | æœ€æ–° Gemini Pro æ¨¡åž‹ | éœ€è¦ Google å½“å‰ Pro é»˜è®¤å€¼æ—¶çš„æœ€ä½³é€‰æ‹© |
| `gemini-flash-latest` | æœ€æ–° Gemini Flash æ¨¡åž‹ | éœ€è¦ Google å½“å‰ Flash é»˜è®¤å€¼æ—¶çš„æœ€ä½³é€‰æ‹© |

```yaml
model:
  default: gemini-pro-latest
  provider: gemini
  base_url: https://generativelanguage.googleapis.com/v1beta
```

å¦‚æžœéœ€è¦ä¸¥æ ¼çš„å¯å¤çŽ°æ€§ï¼Œè¯·ä¼˜å…ˆä½¿ç”¨æ˜Žç¡®çš„æ¨¡åž‹ IDï¼Œå¦‚ `gemini-3.1-pro-preview` æˆ– `gemini-3-flash-preview`ã€‚

### é€šè¿‡ Gemini API ä½¿ç”¨ Gemma

Google ä¹Ÿé€šè¿‡ Gemini API æä¾› Gemma æ¨¡åž‹ã€‚Zed å°†è¿™äº›æ¨¡åž‹è¯†åˆ«ä¸º Google æ¨¡åž‹ï¼Œä½†ä¼šåœ¨é»˜è®¤æ¨¡åž‹é€‰æ‹©å™¨ä¸­éšè—åžåé‡æžä½Žçš„ Gemma æ¡ç›®ï¼Œä»¥é˜²æ–°ç”¨æˆ·åœ¨é•¿æ—¶é—´è¿è¡Œçš„ Agent ä¼šè¯ä¸­æ„å¤–é€‰æ‹©è¯„ä¼°å±‚çº§çš„æ¨¡åž‹ã€‚

å¸¸ç”¨è¯„ä¼° ID åŒ…æ‹¬ï¼š

| æ¨¡åž‹ | ID | è¯´æ˜Ž |
|------|----|------|
| Gemma 4 31B IT | `gemma-4-31b-it` | è¾ƒå¤§çš„ Gemma æ¨¡åž‹ï¼›é€‚ç”¨äºŽå…¼å®¹æ€§å’Œè´¨é‡è¯„ä¼° |
| Gemma 4 26B A4B IT | `gemma-4-26b-a4b-it` | å¯ç”¨æ—¶çš„è¾ƒå°æ´»è·ƒå‚æ•°å˜ä½“ |

è¿™äº›æ¨¡åž‹æœ€é€‚åˆä½œä¸º Gemini API å¯†é’¥çš„è¯„ä¼°é€‰é¡¹ã€‚Google çš„ Gemma API å®šä»·ä»…é™å…è´¹å±‚çº§ï¼Œä¸Žç”Ÿäº§çº§ Gemini æ¨¡åž‹ç›¸æ¯”ä½¿ç”¨ä¸Šé™è¾ƒä½Žï¼Œå› æ­¤æŒç»­çš„ Zed Agent ä½¿ç”¨é€šå¸¸åº”åˆ‡æ¢åˆ°ä»˜è´¹ Gemini æ¨¡åž‹ã€è‡ªæ‰˜ç®¡éƒ¨ç½²æˆ–å…·æœ‰é€‚å½“é…é¢çš„å…¶ä»– providerã€‚

å¦‚éœ€ä½¿ç”¨é€‰æ‹©å™¨ä¸­éšè—çš„ Gemma æ¨¡åž‹ï¼Œè¯·ç›´æŽ¥åœ¨é…ç½®ä¸­æŒ‡å®šï¼š

```yaml
model:
  default: gemma-4-31b-it
  provider: gemini
  base_url: https://generativelanguage.googleapis.com/v1beta
```

## ä¼šè¯ä¸­é€”åˆ‡æ¢æ¨¡åž‹

åœ¨å¯¹è¯ä¸­ä½¿ç”¨ `/model` å‘½ä»¤ï¼š

```text
/model gemini-3-flash-preview
/model gemini-flash-latest
/model gemini-3-pro-preview
/model gemini-pro-latest
/model gemma-4-31b-it
/model gemini-3.1-flash-lite-preview
```

å¦‚æžœå°šæœªé…ç½® Geminiï¼Œè¯·é€€å‡ºä¼šè¯å¹¶å…ˆè¿è¡Œ `zed model`ã€‚`/model` ç”¨äºŽåœ¨å·²é…ç½®çš„ provider å’Œæ¨¡åž‹ä¹‹é—´åˆ‡æ¢ï¼Œä¸ä¼šæ”¶é›†æ–°çš„ API å¯†é’¥ã€‚

## è¯Šæ–­

```bash
zed doctor
```

doctor å‘½ä»¤æ£€æŸ¥ï¼š

- `GOOGLE_API_KEY` æˆ– `GEMINI_API_KEY` æ˜¯å¦å¯ç”¨
- `google-gemini-cli` çš„ Gemini OAuth å‡­æ®æ˜¯å¦å­˜åœ¨
- å·²é…ç½®çš„ provider å‡­æ®æ˜¯å¦å¯ä»¥è§£æž

å¦‚éœ€æŸ¥çœ‹ OAuth é…é¢ä½¿ç”¨æƒ…å†µï¼Œè¯·åœ¨ Zed ä¼šè¯ä¸­è¿è¡Œï¼š

```text
/gquota
```

`/gquota` é€‚ç”¨äºŽ `google-gemini-cli` OAuth providerï¼Œä¸é€‚ç”¨äºŽ AI Studio API å¯†é’¥ providerã€‚

## Gatewayï¼ˆæ¶ˆæ¯å¹³å°ï¼‰

Gemini å¯ä¸Žæ‰€æœ‰ Zed gateway å¹³å°é…åˆä½¿ç”¨ï¼ˆTelegramã€Discordã€Slackã€WhatsAppã€LINEã€é£žä¹¦ç­‰ï¼‰ã€‚å°† Gemini é…ç½®ä¸ºä½ çš„ providerï¼Œç„¶åŽæ­£å¸¸å¯åŠ¨ gatewayï¼š

```bash
zed gateway setup
zed gateway start
```

gateway è¯»å– `config.yaml` å¹¶ä½¿ç”¨ç›¸åŒçš„ Gemini provider é…ç½®ã€‚

## æ•…éšœæŽ’æŸ¥

### "Gemini native client requires an API key"

Zed æ‰¾ä¸åˆ°å¯ç”¨çš„ API å¯†é’¥ã€‚è¯·å°†ä»¥ä¸‹ä»»ä¸€é¡¹æ·»åŠ åˆ° `~/.zed/.env`ï¼š

```bash
GOOGLE_API_KEY=...
# æˆ–
GEMINI_API_KEY=...
```

ç„¶åŽé‡æ–°è¿è¡Œ `zed model`ã€‚

### "This Google API key is on the free tier"

Zed åœ¨è®¾ç½®æœŸé—´ä¼šæŽ¢æµ‹ Gemini API å¯†é’¥ã€‚ç”±äºŽå·¥å…·è°ƒç”¨ã€é‡è¯•ã€åŽ‹ç¼©å’Œè¾…åŠ©ä»»åŠ¡å¯èƒ½éœ€è¦å¤šæ¬¡æ¨¡åž‹è°ƒç”¨ï¼Œå…è´¹å±‚çº§é…é¢åœ¨å°‘æ•°å‡ è½® Agent äº¤äº’åŽå³å¯è€—å°½ã€‚

è¯·ä¸ºä¸Žå¯†é’¥å…³è”çš„ Google Cloud é¡¹ç›®å¯ç”¨è®¡è´¹ï¼Œå¿…è¦æ—¶é‡æ–°ç”Ÿæˆå¯†é’¥ï¼Œç„¶åŽè¿è¡Œï¼š

```bash
zed model
```

### "404 model not found"

æ‰€é€‰æ¨¡åž‹å¯¹ä½ çš„è´¦å·ã€åœ°åŒºæˆ–å¯†é’¥ä¸å¯ç”¨ã€‚é‡æ–°è¿è¡Œ `zed model` å¹¶ä»Žå½“å‰åˆ—è¡¨ä¸­é€‰æ‹©å…¶ä»– Gemini æ¨¡åž‹ã€‚

### Gemma æ¨¡åž‹æœªæ˜¾ç¤ºåœ¨ `zed model` ä¸­

Zed é»˜è®¤å¯èƒ½ä¼šåœ¨é€‰æ‹©å™¨ä¸­éšè—ä½Žåžåé‡çš„ Gemma æ¨¡åž‹ã€‚å¦‚æžœä½ æœ‰æ„è¯„ä¼°æŸä¸ªæ¨¡åž‹ï¼Œè¯·ç›´æŽ¥åœ¨ `~/.zed/config.yaml` ä¸­è®¾ç½®æ¨¡åž‹ IDã€‚

### Gemma å‡ºçŽ° "429 quota exceeded"

é€šè¿‡ Gemini API æä¾›çš„ Gemma æ¨¡åž‹é€‚åˆè¯„ä¼°ä½¿ç”¨ï¼Œä½†å…¶ Gemini API å…è´¹å±‚çº§ä¸Šé™è¾ƒä½Žã€‚è¯·å°†å…¶ç”¨äºŽå…¼å®¹æ€§æµ‹è¯•ï¼Œç„¶åŽåˆ‡æ¢åˆ°ä»˜è´¹ Gemini æ¨¡åž‹æˆ–å…¶ä»– provider ä»¥è¿›è¡ŒæŒç»­çš„ Agent ä¼šè¯ã€‚

### å·²é…ç½® OpenAI å…¼å®¹ç«¯ç‚¹

æ£€æŸ¥ `~/.zed/.env` ä¸­æ˜¯å¦å­˜åœ¨ï¼š

```bash
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
```

å°†å…¶ä¿®æ”¹ä¸ºåŽŸç”Ÿç«¯ç‚¹æˆ–åˆ é™¤è¯¥è¦†ç›–é¡¹ï¼š

```bash
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
```

### OAuth ç™»å½•è­¦å‘Š

`google-gemini-cli` provider ä½¿ç”¨ Gemini CLI / Cloud Code Assist OAuth æµç¨‹ã€‚Zed åœ¨å¯åŠ¨å‰ä¼šå‘å‡ºè­¦å‘Šï¼Œå› ä¸ºè¿™ä¸Žå®˜æ–¹ AI Studio API å¯†é’¥è·¯å¾„ä¸åŒã€‚å¦‚éœ€å®˜æ–¹ API å¯†é’¥é›†æˆï¼Œè¯·ä½¿ç”¨ `provider: gemini` é…åˆ `GOOGLE_API_KEY`ã€‚

### å·¥å…·è°ƒç”¨å›  schema é”™è¯¯è€Œå¤±è´¥

å‡çº§ Zed å¹¶é‡æ–°è¿è¡Œ `zed model`ã€‚åŽŸç”Ÿ Gemini é€‚é…å™¨ä¼šé’ˆå¯¹ Gemini æ›´ä¸¥æ ¼çš„å‡½æ•°å£°æ˜Žæ ¼å¼å¯¹å·¥å…· schema è¿›è¡Œæ¸…ç†ï¼›æ—§ç‰ˆæœ¬æˆ–è‡ªå®šä¹‰ç«¯ç‚¹å¯èƒ½ä¸æ”¯æŒæ­¤åŠŸèƒ½ã€‚

## ç›¸å…³é“¾æŽ¥

- [AI Providers](/integrations/providers)
- [Configuration](/user-guide/configuration)
- [Fallback Providers](/user-guide/features/fallback-providers)
- [AWS Bedrock](/guides/aws-bedrock) â€” ä½¿ç”¨ AWS å‡­æ®çš„åŽŸç”Ÿäº‘ provider é›†æˆ