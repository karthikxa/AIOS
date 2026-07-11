---
title: "é›†æˆ"
sidebar_label: "æ¦‚è§ˆ"
sidebar_position: 0
---

# é›†æˆ

Zed Agent å¯è¿žæŽ¥å¤–éƒ¨ç³»ç»Ÿï¼Œç”¨äºŽ AI æŽ¨ç†ã€å·¥å…·æœåŠ¡å™¨ã€IDE å·¥ä½œæµã€ç¨‹åºåŒ–è®¿é—®ç­‰ã€‚è¿™äº›é›†æˆæ‰©å±•äº† Zed çš„èƒ½åŠ›è¾¹ç•Œä¸Žè¿è¡ŒçŽ¯å¢ƒã€‚

## AI æä¾›å•†ä¸Žè·¯ç”±

Zed å¼€ç®±å³æ”¯æŒå¤šä¸ª AI æŽ¨ç†æä¾›å•†ã€‚ä½¿ç”¨ `zed model` è¿›è¡Œäº¤äº’å¼é…ç½®ï¼Œæˆ–åœ¨ `config.yaml` ä¸­ç›´æŽ¥è®¾ç½®ã€‚

- **[AI æä¾›å•†](/user-guide/features/provider-routing)** â€” OpenRouterã€Anthropicã€OpenAIã€Google ä»¥åŠä»»ä½•å…¼å®¹ OpenAI çš„ç«¯ç‚¹ã€‚Zed ä¼šè‡ªåŠ¨æ£€æµ‹æ¯ä¸ªæä¾›å•†çš„èƒ½åŠ›ï¼ŒåŒ…æ‹¬è§†è§‰ã€æµå¼ä¼ è¾“å’Œå·¥å…·è°ƒç”¨ã€‚
- **[æä¾›å•†è·¯ç”±](/user-guide/features/provider-routing)** â€” ç²¾ç»†æŽ§åˆ¶å“ªäº›åº•å±‚æä¾›å•†å¤„ç†ä½ çš„ OpenRouter è¯·æ±‚ã€‚é€šè¿‡æŽ’åºã€ç™½åå•ã€é»‘åå•å’Œæ˜¾å¼ä¼˜å…ˆçº§æŽ’åºï¼Œåœ¨æˆæœ¬ã€é€Ÿåº¦æˆ–è´¨é‡ä¹‹é—´ä¼˜åŒ–ã€‚
- **[å¤‡ç”¨æä¾›å•†](/user-guide/features/fallback-providers)** â€” å½“ä¸»æ¨¡åž‹é‡åˆ°é”™è¯¯æ—¶ï¼Œè‡ªåŠ¨æ•…éšœè½¬ç§»åˆ°å¤‡ç”¨ LLM æä¾›å•†ã€‚åŒ…æ‹¬ä¸»æ¨¡åž‹å›žé€€ï¼Œä»¥åŠç”¨äºŽè§†è§‰ã€åŽ‹ç¼©å’Œç½‘é¡µæå–çš„ç‹¬ç«‹è¾…åŠ©ä»»åŠ¡å›žé€€ã€‚

## å·¥å…·æœåŠ¡å™¨ï¼ˆMCPï¼‰

- **[MCP æœåŠ¡å™¨](/user-guide/features/mcp)** â€” é€šè¿‡ Model Context Protocol å°† Zed è¿žæŽ¥åˆ°å¤–éƒ¨å·¥å…·æœåŠ¡å™¨ã€‚æ— éœ€ç¼–å†™åŽŸç”Ÿ Zed å·¥å…·ï¼Œå³å¯è®¿é—®æ¥è‡ª GitHubã€æ•°æ®åº“ã€æ–‡ä»¶ç³»ç»Ÿã€æµè§ˆå™¨æ ˆã€å†…éƒ¨ API ç­‰çš„å·¥å…·ã€‚æ”¯æŒ stdio å’Œ SSE ä¸¤ç§ä¼ è¾“æ–¹å¼ã€æŒ‰æœåŠ¡å™¨è¿‡æ»¤å·¥å…·ï¼Œä»¥åŠå…·å¤‡èƒ½åŠ›æ„ŸçŸ¥çš„èµ„æº/prompt æ³¨å†Œã€‚

## ç½‘é¡µæœç´¢åŽç«¯

`web_search` å’Œ `web_extract` å·¥å…·æ”¯æŒå››ä¸ªåŽç«¯æä¾›å•†ï¼Œé€šè¿‡ `config.yaml` æˆ– `zed tools` é…ç½®ï¼š

| åŽç«¯ | çŽ¯å¢ƒå˜é‡ | æœç´¢ | æå– | çˆ¬å– |
|---------|---------|--------|---------|-------|
| **Firecrawl**ï¼ˆé»˜è®¤ï¼‰ | `FIRECRAWL_API_KEY` | âœ” | âœ” | âœ” |
| **Parallel** | `PARALLEL_API_KEY` | âœ” | âœ” | â€” |
| **Tavily** | `TAVILY_API_KEY` | âœ” | âœ” | âœ” |
| **Exa** | `EXA_API_KEY` | âœ” | âœ” | â€” |

å¿«é€Ÿé…ç½®ç¤ºä¾‹ï¼š

```yaml
web:
  backend: firecrawl    # firecrawl | searxng | brave-free | ddgs | tavily | exa | parallel | xai
```

è‹¥æœªè®¾ç½® `web.backend`ï¼ŒåŽç«¯å°†æ ¹æ®å¯ç”¨çš„ API key è‡ªåŠ¨æ£€æµ‹ã€‚ä¹Ÿæ”¯æŒé€šè¿‡ `FIRECRAWL_API_URL` ä½¿ç”¨è‡ªæ‰˜ç®¡çš„ Firecrawlã€‚

## æµè§ˆå™¨è‡ªåŠ¨åŒ–

Zed å†…ç½®å®Œæ•´çš„æµè§ˆå™¨è‡ªåŠ¨åŒ–åŠŸèƒ½ï¼Œæä¾›å¤šç§åŽç«¯é€‰é¡¹ï¼Œç”¨äºŽç½‘ç«™å¯¼èˆªã€è¡¨å•å¡«å†™å’Œä¿¡æ¯æå–ï¼š

- **Browserbase** â€” æ‰˜ç®¡äº‘ç«¯æµè§ˆå™¨ï¼Œå…·å¤‡åæœºå™¨äººå·¥å…·ã€CAPTCHA è§£å†³å’Œä½å®…ä»£ç†
- **Browser Use** â€” å¤‡é€‰äº‘ç«¯æµè§ˆå™¨æä¾›å•†
- **æœ¬åœ° Chromium ç³» CDP** â€” ä½¿ç”¨ `/browser connect` è¿žæŽ¥æ­£åœ¨è¿è¡Œçš„ Chromeã€Braveã€Chromium æˆ– Edge æµè§ˆå™¨
- **æœ¬åœ° Chromium** â€” é€šè¿‡ `agent-browser` CLI ä½¿ç”¨æ— å¤´æœ¬åœ°æµè§ˆå™¨

è¯¦è§[æµè§ˆå™¨è‡ªåŠ¨åŒ–](/user-guide/features/browser)çš„é…ç½®ä¸Žä½¿ç”¨è¯´æ˜Žã€‚

## è¯­éŸ³ä¸Ž TTS æä¾›å•†

è·¨æ‰€æœ‰æ¶ˆæ¯å¹³å°çš„æ–‡å­—è½¬è¯­éŸ³ä¸Žè¯­éŸ³è½¬æ–‡å­—ï¼š

| æä¾›å•† | è´¨é‡ | è´¹ç”¨ | API Key |
|----------|---------|------|---------|
| **Edge TTS**ï¼ˆé»˜è®¤ï¼‰ | è‰¯å¥½ | å…è´¹ | æ— éœ€ |
| **ElevenLabs** | ä¼˜ç§€ | ä»˜è´¹ | `ELEVENLABS_API_KEY` |
| **OpenAI TTS** | è‰¯å¥½ | ä»˜è´¹ | `VOICE_TOOLS_OPENAI_KEY` |
| **MiniMax** | è‰¯å¥½ | ä»˜è´¹ | `MINIMAX_API_KEY` |
| **NeuTTS** | è‰¯å¥½ | å…è´¹ | æ— éœ€ |

è¯­éŸ³è½¬æ–‡å­—æ”¯æŒå…­ä¸ªæä¾›å•†ï¼šæœ¬åœ° faster-whisperï¼ˆå…è´¹ï¼Œè®¾å¤‡ç«¯è¿è¡Œï¼‰ã€æœ¬åœ°å‘½ä»¤å°è£…å™¨ã€Groqã€OpenAI Whisper APIã€Mistral å’Œ xAIã€‚è¯­éŸ³æ¶ˆæ¯è½¬å½•æ”¯æŒ Telegramã€Discordã€WhatsApp åŠå…¶ä»–æ¶ˆæ¯å¹³å°ã€‚è¯¦è§[è¯­éŸ³ä¸Ž TTS](/user-guide/features/tts) å’Œ[è¯­éŸ³æ¨¡å¼](/user-guide/features/voice-mode)ã€‚

## IDE ä¸Žç¼–è¾‘å™¨é›†æˆ

- **[IDE é›†æˆï¼ˆACPï¼‰](/user-guide/features/acp)** â€” åœ¨å…¼å®¹ ACP çš„ç¼–è¾‘å™¨ï¼ˆå¦‚ VS Codeã€Zed å’Œ JetBrainsï¼‰ä¸­ä½¿ç”¨ Zed Agentã€‚Zed ä½œä¸º ACP æœåŠ¡å™¨è¿è¡Œï¼Œåœ¨ç¼–è¾‘å™¨å†…æ¸²æŸ“èŠå¤©æ¶ˆæ¯ã€å·¥å…·æ´»åŠ¨ã€æ–‡ä»¶å·®å¼‚å’Œç»ˆç«¯å‘½ä»¤ã€‚

## ç¨‹åºåŒ–è®¿é—®

- **[API æœåŠ¡å™¨](/user-guide/features/api-server)** â€” å°† Zed æš´éœ²ä¸ºå…¼å®¹ OpenAI çš„ HTTP ç«¯ç‚¹ã€‚ä»»ä½•æ”¯æŒ OpenAI æ ¼å¼çš„å‰ç«¯â€”â€”Open WebUIã€LobeChatã€LibreChatã€NextChatã€ChatBoxâ€”â€”å‡å¯è¿žæŽ¥å¹¶å°† Zed ä½œä¸ºåŽç«¯ä½¿ç”¨ï¼Œäº«æœ‰å…¶å®Œæ•´å·¥å…·é›†ã€‚

## è®°å¿†ä¸Žä¸ªæ€§åŒ–

- **[å†…ç½®è®°å¿†](/user-guide/features/memory)** â€” é€šè¿‡ `MEMORY.md` å’Œ `USER.md` æ–‡ä»¶å®žçŽ°æŒä¹…åŒ–ã€ç²¾é€‰è®°å¿†ã€‚Agent ç»´æŠ¤æœ‰ç•Œçš„ä¸ªäººç¬”è®°å’Œç”¨æˆ·ç”»åƒæ•°æ®å­˜å‚¨ï¼Œè·¨ä¼šè¯ä¿ç•™ã€‚
- **[è®°å¿†æä¾›å•†](/user-guide/features/memory-providers)** â€” æŽ¥å…¥å¤–éƒ¨è®°å¿†åŽç«¯ä»¥å®žçŽ°æ›´æ·±åº¦çš„ä¸ªæ€§åŒ–ã€‚æ”¯æŒå…«ä¸ªæä¾›å•†ï¼šHonchoï¼ˆè¾©è¯æŽ¨ç†ï¼‰ã€OpenVikingï¼ˆåˆ†å±‚æ£€ç´¢ï¼‰ã€Mem0ï¼ˆäº‘ç«¯æå–ï¼‰ã€Hindsightï¼ˆçŸ¥è¯†å›¾è°±ï¼‰ã€Holographicï¼ˆæœ¬åœ° SQLiteï¼‰ã€RetainDBï¼ˆæ··åˆæœç´¢ï¼‰ã€ByteRoverï¼ˆåŸºäºŽ CLIï¼‰å’Œ Supermemoryã€‚

## æ¶ˆæ¯å¹³å°

Zed å¯ä½œä¸º gatewayï¼ˆç½‘å…³ï¼‰æœºå™¨äººè¿è¡ŒäºŽ 19+ ä¸ªæ¶ˆæ¯å¹³å°ï¼Œå‡é€šè¿‡åŒä¸€ `gateway` å­ç³»ç»Ÿé…ç½®ï¼š

- **[Telegram](/user-guide/messaging/telegram)**ã€**[Discord](/user-guide/messaging/discord)**ã€**[Slack](/user-guide/messaging/slack)**ã€**[WhatsApp](/user-guide/messaging/whatsapp)**ã€**[Signal](/user-guide/messaging/signal)**ã€**[Matrix](/user-guide/messaging/matrix)**ã€**[Mattermost](/user-guide/messaging/mattermost)**ã€**[Email](/user-guide/messaging/email)**ã€**[SMS](/user-guide/messaging/sms)**ã€**[DingTalk](/user-guide/messaging/dingtalk)**ã€**[Feishu/Lark](/user-guide/messaging/feishu)**ã€**[WeCom](/user-guide/messaging/wecom)**ã€**[WeCom Callback](/user-guide/messaging/wecom-callback)**ã€**[Weixin](/user-guide/messaging/weixin)**ã€**[BlueBubbles](/user-guide/messaging/bluebubbles)**ã€**[QQ Bot](/user-guide/messaging/qqbot)**ã€**[Yuanbao](/user-guide/messaging/yuanbao)**ã€**[Home Assistant](/user-guide/messaging/homeassistant)**ã€**[Microsoft Teams](/user-guide/messaging/teams)**ã€**[Webhooks](/user-guide/messaging/webhooks)**

å¹³å°å¯¹æ¯”è¡¨å’Œé…ç½®æŒ‡å—è¯¦è§[æ¶ˆæ¯ Gateway æ¦‚è§ˆ](/user-guide/messaging)ã€‚

## å®¶åº­è‡ªåŠ¨åŒ–

- **[Home Assistant](/user-guide/messaging/homeassistant)** â€” é€šè¿‡å››ä¸ªä¸“ç”¨å·¥å…·ï¼ˆ`ha_list_entities`ã€`ha_get_state`ã€`ha_list_services`ã€`ha_call_service`ï¼‰æŽ§åˆ¶æ™ºèƒ½å®¶å±…è®¾å¤‡ã€‚é…ç½® `HASS_TOKEN` åŽï¼ŒHome Assistant å·¥å…·é›†å°†è‡ªåŠ¨æ¿€æ´»ã€‚

## æ’ä»¶

- **[æ’ä»¶ç³»ç»Ÿ](/user-guide/features/plugins)** â€” æ— éœ€ä¿®æ”¹æ ¸å¿ƒä»£ç ï¼Œé€šè¿‡è‡ªå®šä¹‰å·¥å…·ã€ç”Ÿå‘½å‘¨æœŸ hookï¼ˆé’©å­ï¼‰å’Œ CLI å‘½ä»¤æ‰©å±• Zedã€‚æ’ä»¶ä»Ž `~/.zed/plugins/`ã€é¡¹ç›®æœ¬åœ° `.zed/plugins/` ä»¥åŠé€šè¿‡ pip å®‰è£…çš„å…¥å£ç‚¹è‡ªåŠ¨å‘çŽ°ã€‚
- **[æž„å»ºæ’ä»¶](/guides/build-a-zed-plugin)** â€” åˆ›å»ºåŒ…å«å·¥å…·ã€hook å’Œ CLI å‘½ä»¤çš„ Zed æ’ä»¶çš„åˆ†æ­¥æŒ‡å—ã€‚

## è®­ç»ƒä¸Žè¯„ä¼°

- **[æ‰¹å¤„ç†](/user-guide/features/batch-processing)** â€” å¹¶è¡Œè·¨æ•°ç™¾ä¸ª promptï¼ˆæç¤ºè¯ï¼‰è¿è¡Œ Agentï¼Œç”Ÿæˆç»“æž„åŒ–çš„ ShareGPT æ ¼å¼è½¨è¿¹æ•°æ®ï¼Œç”¨äºŽè®­ç»ƒæ•°æ®ç”Ÿæˆæˆ–è¯„ä¼°ã€‚
