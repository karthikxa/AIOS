---
title: "Nous Tool Gatewayï¼ˆå·¥å…·ç½‘å…³ï¼‰"
description: "é€šè¿‡ Nous è®¢é˜…ç»Ÿä¸€ä½¿ç”¨ç½‘é¡µæœç´¢ã€æ–‡ç”Ÿå›¾ã€è¯­éŸ³åˆæˆä¸Žæµè§ˆå™¨è‡ªåŠ¨åŒ–ï¼Œæ— éœ€å•ç‹¬ç”³è¯· Firecrawlã€FALã€OpenAIã€Browser Use ç­‰ API Key"
sidebar_label: "Tool Gateway"
sidebar_position: 2
---

# Nous Tool Gatewayï¼ˆå·¥å…·ç½‘å…³ï¼‰

:::tip å¿«é€Ÿå¼€å§‹
Tool Gateway åŒ…å«åœ¨ä»˜è´¹ Zed Portal è®¢é˜…ä¸­ã€‚**[ç®¡ç†è®¢é˜… â†’](https://portal.zedteam.com/manage-subscription)**
:::

**Tool Gateway** è®©å·²ä»˜è´¹çš„ [Zed Portal](https://portal.zedteam.com) ç”¨æˆ·é€šè¿‡åŒä¸€ä»½è®¢é˜…ï¼Œç›´æŽ¥ä½¿ç”¨ç½‘é¡µæœç´¢ã€æ–‡ç”Ÿå›¾ã€è¯­éŸ³åˆæˆï¼ˆTTSï¼‰ä¸Žæµè§ˆå™¨è‡ªåŠ¨åŒ–ï¼Œè€Œ**ä¸å¿…**å†åˆ†åˆ«æ³¨å†Œ Firecrawlã€FALã€OpenAIã€Browser Use ç­‰æœåŠ¡çš„ API Keyã€‚

## åŒ…å«èƒ½åŠ›

| å·¥å…· | ä½œç”¨ | è‹¥ä¸ç”¨ç½‘å…³ï¼Œå¯æ”¹ç”¨ |
|------|------|---------------------|
| **ç½‘é¡µæœç´¢ä¸ŽæŠ“å–** | é€šè¿‡ Firecrawl æœç´¢å¹¶æŠ½å–é¡µé¢å†…å®¹ | `FIRECRAWL_API_KEY`ã€`EXA_API_KEY`ã€`PARALLEL_API_KEY`ã€`TAVILY_API_KEY` |
| **æ–‡ç”Ÿå›¾** | é€šè¿‡ FAL ç”Ÿæˆå›¾åƒï¼ˆ8 ä¸ªæ¨¡åž‹ï¼šFLUX 2 Klein/Proã€GPT-Imageã€Nano Banana Proã€Ideogramã€Recraft V4 Proã€Qwenã€Z-Imageï¼‰ | `FAL_KEY` |
| **è¯­éŸ³åˆæˆ** | é€šè¿‡ OpenAI TTS å°†æ–‡å­—è½¬ä¸ºè¯­éŸ³ | `VOICE_TOOLS_OPENAI_KEY`ã€`ELEVENLABS_API_KEY` |
| **æµè§ˆå™¨è‡ªåŠ¨åŒ–** | é€šè¿‡ Browser Use æŽ§åˆ¶äº‘ç«¯æµè§ˆå™¨ | `BROWSER_USE_API_KEY`ã€`BROWSERBASE_API_KEY` |

ä¸Šè¿°å››ç±»èƒ½åŠ›å‡è®¡å…¥ Nous è®¢é˜…è®¡è´¹ã€‚ä½ å¯ä»¥æŒ‰éœ€ç»„åˆâ€”â€”ä¾‹å¦‚ç½‘é¡µä¸Žæ–‡ç”Ÿå›¾èµ°ç½‘å…³ï¼ŒTTS ä»ä½¿ç”¨è‡ªå·±çš„ ElevenLabs Keyã€‚

## èµ„æ ¼ä¸Žè´¦å·

Tool Gateway ä»…å¯¹ **[ä»˜è´¹](https://portal.zedteam.com/manage-subscription)** Zed Portal è®¢é˜…å¼€æ”¾ï¼›å…è´¹æ¡£ä¸å¯ç”¨â€”â€”è¯· [å‡çº§è®¢é˜…](https://portal.zedteam.com/manage-subscription) åŽè§£é”ã€‚

æ£€æŸ¥å½“å‰çŠ¶æ€ï¼š

```bash
zed status
```

åœ¨è¾“å‡ºä¸­æ‰¾åˆ° **Nous Tool Gateway** å°èŠ‚ï¼šä¼šæ ‡æ˜Žå“ªäº›å·¥å…·ç»è®¢é˜…ç½‘å…³å¯ç”¨ã€å“ªäº›ä½¿ç”¨ç›´è¿ž Keyã€å“ªäº›å°šæœªé…ç½®ã€‚

## å¦‚ä½•å¯ç”¨ Tool Gateway

### åœ¨æ¨¡åž‹é…ç½®æµç¨‹ä¸­

è¿è¡Œ `zed model` å¹¶é€‰æ‹© Zed Portal ä½œä¸ºæä¾›å•†æ—¶ï¼ŒZed ä¼šä¸»åŠ¨è¯¢é—®æ˜¯å¦å¯ç”¨ Tool Gatewayï¼š

```
Your Nous subscription includes the Tool Gateway.

  The Tool Gateway gives you access to web search, image generation,
  text-to-speech, and browser automation through your Nous subscription.
  No need to sign up for separate API keys â€” just pick the tools you want.

  â—‹ Web search & extract (Firecrawl) â€” not configured
  â—‹ Image generation (FAL) â€” not configured
  â—‹ Text-to-speech (OpenAI TTS) â€” not configured
  â—‹ Browser automation (Browser Use) â€” not configured

  â— Enable Tool Gateway
  â—‹ Skip
```

é€‰æ‹© **Enable Tool Gateway** å³å¯ã€‚

è‹¥ `.env` ä¸­å·²æœ‰éƒ¨åˆ†ç›´è¿ž API Keyï¼Œæç¤ºä¼šç›¸åº”å˜åŒ–ï¼šå¯ä¸ºå…¨éƒ¨å·¥å…·å¯ç”¨ç½‘å…³ï¼ˆç›´è¿ž Key ä»ä¿ç•™åœ¨ `.env` ä½†è¿è¡Œæ—¶ä¸ç”¨ï¼‰ã€ä»…ä¸ºæœªé…ç½®é¡¹å¯ç”¨ï¼Œæˆ–å®Œå…¨è·³è¿‡ã€‚

### é€šè¿‡ `zed tools`

ä¹Ÿå¯åœ¨äº¤äº’å¼å·¥å…·é…ç½®ä¸­é€é¡¹å¯ç”¨ï¼š

```bash
zed tools
```

é€‰æ‹©å·¥å…·ç±»åˆ«ï¼ˆWebã€Browserã€Image Generationã€TTSï¼‰ï¼Œå†å°†æä¾›å•†é€‰ä¸º **Nous Subscription**ã€‚è¿™ä¼šåœ¨é…ç½®é‡ŒæŠŠå¯¹åº”å·¥å…·çš„ `use_gateway` è®¾ä¸º `true`ã€‚

### æ‰‹åŠ¨ç¼–è¾‘é…ç½®

åœ¨ `~/.zed/config.yaml` ä¸­ç›´æŽ¥è®¾ç½® `use_gateway`ï¼š

```yaml
web:
  backend: firecrawl
  use_gateway: true

image_gen:
  use_gateway: true

tts:
  provider: openai
  use_gateway: true

browser:
  cloud_provider: browser-use
  use_gateway: true
```

## å·¥ä½œåŽŸç†

å½“æŸå·¥å…·çš„ `use_gateway: true` æ—¶ï¼Œè¿è¡Œæ—¶ä¼šæŠŠ API è°ƒç”¨è·¯ç”±åˆ° Nous Tool Gatewayï¼Œè€Œä¸æ˜¯ä½¿ç”¨ç›´è¿ž Keyï¼š

1. **ç½‘é¡µå·¥å…·** â€” `web_search` / `web_extract` èµ°ç½‘å…³çš„ Firecrawl ç«¯ç‚¹  
2. **æ–‡ç”Ÿå›¾** â€” `image_generate` èµ°ç½‘å…³çš„ FAL ç«¯ç‚¹  
3. **TTS** â€” `text_to_speech` èµ°ç½‘å…³çš„ OpenAI Audio ç«¯ç‚¹  
4. **æµè§ˆå™¨** â€” `browser_navigate` ç­‰èµ°ç½‘å…³çš„ Browser Use ç«¯ç‚¹  

ç½‘å…³ä½¿ç”¨ Zed Portal å‡­æ®è®¤è¯ï¼ˆåœ¨ `zed model` å®ŒæˆåŽå†™å…¥ `~/.zed/auth.json`ï¼‰ã€‚

### ä¼˜å…ˆçº§

æ¯ä¸ªå·¥å…·éƒ½ä¼šå…ˆçœ‹ `use_gateway`ï¼š

- **`use_gateway: true`** â†’ å¼ºåˆ¶èµ°ç½‘å…³ï¼Œå³ä½¿ `.env` é‡Œä»æœ‰ç›´è¿ž Key  
- **`use_gateway: false`**ï¼ˆæˆ–æœªè®¾ç½®ï¼‰â†’ è‹¥æœ‰ç›´è¿ž Key åˆ™ä¼˜å…ˆç›´è¿žï¼›ä»…åœ¨æ²¡æœ‰ç›´è¿žå‡­æ®æ—¶æ‰å›žé€€åˆ°ç½‘å…³  

å› æ­¤ä½ å¯ä»¥åœ¨ç½‘å…³ä¸Žç›´è¿žä¹‹é—´åˆ‡æ¢ï¼Œè€Œæ— éœ€åˆ é™¤ `.env` ä¸­çš„æ—§ Keyã€‚

## åˆ‡å›žç›´è¿ž Key

å¯¹å•ä¸ªå·¥å…·åœç”¨ç½‘å…³ï¼š

```bash
zed tools    # é€‰æ‹©è¯¥å·¥å…· â†’ é€‰ç›´è¿žæä¾›å•†
```

æˆ–åœ¨é…ç½®ä¸­è®¾ `use_gateway: false`ï¼š

```yaml
web:
  backend: firecrawl
  use_gateway: false  # æ­¤æ—¶ä½¿ç”¨ .env ä¸­çš„ FIRECRAWL_API_KEY
```

åœ¨ `zed tools` ä¸­é€‰æ‹©éžç½‘å…³æä¾›å•†æ—¶ï¼Œ`use_gateway` ä¼šè‡ªåŠ¨è®¾ä¸º `false`ï¼Œé¿å…é…ç½®è‡ªç›¸çŸ›ç›¾ã€‚

## æŸ¥çœ‹çŠ¶æ€

```bash
zed status
```

**Nous Tool Gateway** å°èŠ‚ç¤ºä¾‹ï¼š

```
â—† Nous Tool Gateway
  Zed Portal   âœ“ managed tools available
  Web tools       âœ“ active via Nous subscription
  Image gen       âœ“ active via Nous subscription
  TTS             âœ“ active via Nous subscription
  Browser         â—‹ active via Browser Use key
  Modal           â—‹ available via subscription (optional)
```

æ ‡è®°ä¸º â€œactive via Nous subscriptionâ€ çš„å³ç»ç½‘å…³è·¯ç”±ï¼›å¸¦è‡ªæœ‰ Key çš„ä¼šæ˜¾ç¤ºå½“å‰æ¿€æ´»çš„æä¾›å•†ã€‚

## è¿›é˜¶ï¼šè‡ªå»ºç½‘å…³

è‹¥ä½¿ç”¨è‡ªå»ºæˆ–è‡ªå®šä¹‰ç½‘å…³ï¼Œå¯åœ¨ `~/.zed/.env` ä¸­ç”¨çŽ¯å¢ƒå˜é‡è¦†ç›–ç«¯ç‚¹ï¼š

```bash
TOOL_GATEWAY_DOMAIN=zedteam.com     # ç½‘å…³è·¯ç”±åŸºç¡€åŸŸå
TOOL_GATEWAY_SCHEME=https                 # http æˆ– httpsï¼ˆé»˜è®¤ httpsï¼‰
TOOL_GATEWAY_USER_TOKEN=your-token        # é‰´æƒ Tokenï¼ˆé€šå¸¸ç”±ç¨‹åºè‡ªåŠ¨å¡«å……ï¼‰
FIRECRAWL_GATEWAY_URL=https://...         # å•ç‹¬è¦†ç›– Firecrawl ç«¯ç‚¹
```

è¿™äº›å˜é‡ä¸Žè®¢é˜…çŠ¶æ€æ— å…³ï¼Œå§‹ç»ˆå¯åœ¨é…ç½®ä¸­çœ‹åˆ°ï¼Œä¾¿äºŽè‡ªå»ºåŸºç¡€è®¾æ–½ã€‚

## å¸¸è§é—®é¢˜

### éœ€è¦åˆ æŽ‰å·²æœ‰çš„ API Key å—ï¼Ÿ

ä¸éœ€è¦ã€‚`use_gateway: true` æ—¶è¿è¡Œæ—¶ä¼šè·³è¿‡ç›´è¿ž Key å¹¶èµ°ç½‘å…³ï¼›Key ä»ä¿ç•™åœ¨ `.env`ã€‚ä¹‹åŽè‹¥å…³é—­ç½‘å…³ï¼Œä¼šè‡ªåŠ¨æ¢å¤ä½¿ç”¨ç›´è¿ž Keyã€‚

### èƒ½å¦éƒ¨åˆ†å·¥å…·èµ°ç½‘å…³ã€éƒ¨åˆ†èµ°ç›´è¿žï¼Ÿ

å¯ä»¥ã€‚`use_gateway` æŒ‰å·¥å…·ç‹¬ç«‹é…ç½®ã€‚ä¾‹å¦‚ï¼šç½‘é¡µä¸Žæ–‡ç”Ÿå›¾èµ°ç½‘å…³ï¼ŒTTS ç”¨ ElevenLabsï¼Œæµè§ˆå™¨ç”¨ Browserbaseã€‚

### è®¢é˜…åˆ°æœŸä¼šæ€Žæ ·ï¼Ÿ

ç»ç½‘å…³è·¯ç”±çš„å·¥å…·ä¼šåœæ­¢å·¥ä½œï¼Œç›´åˆ°ä½  [ç»­è®¢](https://portal.zedteam.com/manage-subscription) æˆ–é€šè¿‡ `zed tools` æ”¹å›žç›´è¿ž Keyã€‚

### ä¸Žã€Œæ¶ˆæ¯ç½‘å…³ã€ï¼ˆå„èŠå¤©å¹³å°ï¼‰æ˜¯å¦å†²çªï¼Ÿ

ä¸å†²çªã€‚Tool Gateway ä½œç”¨äºŽ**å·¥å…·è¿è¡Œæ—¶**çš„ API è·¯ç”±ï¼Œä¸Ž CLIã€Telegramã€Discord ç­‰å…¥å£æ— å…³ã€‚

### Modal ç®—åœ¨ Tool Gateway é‡Œå—ï¼Ÿ

Modalï¼ˆæ— æœåŠ¡å™¨ç»ˆç«¯åŽç«¯ï¼‰å¯ä½œä¸º Nous è®¢é˜…çš„å¯é€‰é™„åŠ èƒ½åŠ›ï¼Œä½†**ä¸ä¼š**ç”± Tool Gateway å®‰è£…å‘å¯¼ä¸€å¹¶æ‰“å¼€â€”â€”è¯·å•ç‹¬é€šè¿‡ `zed setup terminal` æˆ–åœ¨ `config.yaml` ä¸­é…ç½®ã€‚
