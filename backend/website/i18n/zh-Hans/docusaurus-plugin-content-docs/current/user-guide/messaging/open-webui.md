---
sidebar_position: 8
title: "Open WebUI"
description: "é€šè¿‡ OpenAI å…¼å®¹ API æœåŠ¡å™¨å°† Open WebUI è¿žæŽ¥åˆ° Zed Agent"
---

# Open WebUI é›†æˆ

[Open WebUI](https://github.com/open-webui/open-webui)ï¼ˆ126kâ˜…ï¼‰æ˜¯æœ€å—æ¬¢è¿Žçš„è‡ªæ‰˜ç®¡ AI èŠå¤©ç•Œé¢ã€‚å€ŸåŠ© Zed Agent å†…ç½®çš„ API æœåŠ¡å™¨ï¼Œä½ å¯ä»¥å°† Open WebUI ç”¨ä½œ agent çš„ç²¾ç¾Ž Web å‰ç«¯â€”â€”å®Œæ•´æ”¯æŒå¯¹è¯ç®¡ç†ã€ç”¨æˆ·è´¦æˆ·å’ŒçŽ°ä»£èŠå¤©ç•Œé¢ã€‚

## æž¶æž„

```mermaid
flowchart LR
    A["Open WebUI<br/>æµè§ˆå™¨ UI<br/>ç«¯å£ 3000"]
    B["zed-agent<br/>gateway API æœåŠ¡å™¨<br/>ç«¯å£ 8642"]
    A -->|POST /v1/chat/completions| B
    B -->|SSE æµå¼å“åº”| A
```

Open WebUI è¿žæŽ¥ Zed Agent çš„ API æœåŠ¡å™¨ï¼Œæ–¹å¼ä¸Žè¿žæŽ¥ OpenAI å®Œå…¨ç›¸åŒã€‚Zed ä½¿ç”¨å…¶å®Œæ•´å·¥å…·é›†â€”â€”ç»ˆç«¯ã€æ–‡ä»¶æ“ä½œã€ç½‘ç»œæœç´¢ã€è®°å¿†ã€æŠ€èƒ½â€”â€”å¤„ç†è¯·æ±‚å¹¶è¿”å›žæœ€ç»ˆå“åº”ã€‚

:::important è¿è¡Œæ—¶ä½ç½®
API æœåŠ¡å™¨æ˜¯ä¸€ä¸ª **Zed agent è¿è¡Œæ—¶**ï¼Œè€Œéžçº¯ LLM ä»£ç†ã€‚å¯¹äºŽæ¯ä¸ªè¯·æ±‚ï¼ŒZed ä¼šåœ¨ API æœåŠ¡å™¨æ‰€åœ¨ä¸»æœºä¸Šåˆ›å»ºä¸€ä¸ªæœåŠ¡ç«¯ `AIAgent`ã€‚å·¥å…·è°ƒç”¨åœ¨è¯¥ API æœåŠ¡å™¨è¿è¡Œçš„ä½ç½®æ‰§è¡Œã€‚

ä¾‹å¦‚ï¼Œå¦‚æžœç¬”è®°æœ¬ç”µè„‘å°† Open WebUI æˆ–å…¶ä»– OpenAI å…¼å®¹å®¢æˆ·ç«¯æŒ‡å‘è¿œç¨‹æœºå™¨ä¸Šçš„ Zed API æœåŠ¡å™¨ï¼Œåˆ™ `pwd`ã€æ–‡ä»¶å·¥å…·ã€æµè§ˆå™¨å·¥å…·ã€æœ¬åœ° MCP å·¥å…·åŠå…¶ä»–å·¥ä½œåŒºå·¥å…·å°†åœ¨è¿œç¨‹ API æœåŠ¡å™¨ä¸»æœºä¸Šè¿è¡Œï¼Œè€Œéžåœ¨ç¬”è®°æœ¬ç”µè„‘ä¸Šã€‚
:::

Open WebUI ä¸Ž Zed ä¹‹é—´æ˜¯æœåŠ¡å™¨åˆ°æœåŠ¡å™¨çš„é€šä¿¡ï¼Œå› æ­¤æ­¤é›†æˆæ— éœ€é…ç½® `API_SERVER_CORS_ORIGINS`ã€‚

## å¿«é€Ÿè®¾ç½®

### æœ¬åœ°ä¸€é”®å¼•å¯¼ï¼ˆmacOS/Linuxï¼Œæ— éœ€ Dockerï¼‰

å¦‚æžœä½ å¸Œæœ›åœ¨æœ¬åœ°å°† Zed ä¸Ž Open WebUI è¿žæŽ¥å¹¶ä½¿ç”¨å¯å¤ç”¨çš„å¯åŠ¨å™¨ï¼Œè¯·è¿è¡Œï¼š

```bash
cd ~/.zed/zed-agent
bash scripts/setup_open_webui.sh
```

è„šæœ¬æ‰§è¡Œå†…å®¹ï¼š

- ç¡®ä¿ `~/.zed/.env` åŒ…å« `API_SERVER_ENABLED`ã€`API_SERVER_HOST`ã€`API_SERVER_KEY`ã€`API_SERVER_PORT` å’Œ `API_SERVER_MODEL_NAME`
- é‡å¯ Zed gateway ä»¥å¯åŠ¨ API æœåŠ¡å™¨
- å°† Open WebUI å®‰è£…åˆ° `~/.local/open-webui-venv`
- åœ¨ `~/.local/bin/start-open-webui-zed.sh` å†™å…¥å¯åŠ¨å™¨
- åœ¨ macOS ä¸Šå®‰è£… `launchd` ç”¨æˆ·æœåŠ¡ï¼›åœ¨æ”¯æŒ `systemd --user` çš„ Linux ä¸Šå®‰è£…ç”¨æˆ·æœåŠ¡

é»˜è®¤å€¼ï¼š

- Zed APIï¼š`http://127.0.0.1:8642/v1`
- Open WebUIï¼š`http://127.0.0.1:8080`
- å‘ Open WebUI å…¬å‘Šçš„æ¨¡åž‹åç§°ï¼š`Zed Agent`

å¸¸ç”¨è¦†ç›–å‚æ•°ï¼š

```bash
OPEN_WEBUI_NAME='My Zed UI' \
OPEN_WEBUI_ENABLE_SIGNUP=true \
ZED_API_MODEL_NAME='My Zed Agent' \
bash scripts/setup_open_webui.sh
```

åœ¨ Linux ä¸Šï¼Œè‡ªåŠ¨åŽå°æœåŠ¡è®¾ç½®éœ€è¦å¯ç”¨çš„ `systemd --user` ä¼šè¯ã€‚å¦‚æžœä½ åœ¨æ— å¤´ SSH æœºå™¨ä¸Šå¹¶å¸Œæœ›è·³è¿‡æœåŠ¡å®‰è£…ï¼Œè¯·è¿è¡Œï¼š

```bash
OPEN_WEBUI_ENABLE_SERVICE=false bash scripts/setup_open_webui.sh
```

### 1. å¯ç”¨ API æœåŠ¡å™¨

```bash
zed config set API_SERVER_ENABLED true
zed config set API_SERVER_KEY your-secret-key
```

`zed config set` ä¼šè‡ªåŠ¨å°†æ ‡å¿—è·¯ç”±åˆ° `config.yaml`ï¼Œå°†å¯†é’¥è·¯ç”±åˆ° `~/.zed/.env`ã€‚å¦‚æžœ gateway å·²åœ¨è¿è¡Œï¼Œè¯·é‡å¯ä»¥ä½¿æ›´æ”¹ç”Ÿæ•ˆï¼š

```bash
zed gateway stop && zed gateway
```

### 2. å¯åŠ¨ Zed Agent gateway

```bash
zed gateway
```

ä½ åº”è¯¥çœ‹åˆ°ï¼š

```
[API Server] API server listening on http://127.0.0.1:8642
```

### 3. éªŒè¯ API æœåŠ¡å™¨å¯è®¿é—®

```bash
curl -s http://127.0.0.1:8642/health
# {"status": "ok", ...}

curl -s -H "Authorization: Bearer your-secret-key" http://127.0.0.1:8642/v1/models
# {"object":"list","data":[{"id":"zed-agent", ...}]}
```

å¦‚æžœ `/health` å¤±è´¥ï¼Œè¯´æ˜Ž gateway æœªåŠ è½½ `API_SERVER_ENABLED=true`â€”â€”é‡å¯å®ƒã€‚å¦‚æžœ `/v1/models` è¿”å›ž `401`ï¼Œè¯´æ˜Žä½ çš„ `Authorization` å¤´ä¸Ž `API_SERVER_KEY` ä¸åŒ¹é…ã€‚

### 4. å¯åŠ¨ Open WebUI

```bash
docker run -d -p 3000:8080 \
  -e OPENAI_API_BASE_URL=http://host.docker.internal:8642/v1 \
  -e OPENAI_API_KEY=your-secret-key \
  -e ENABLE_OLLAMA_API=false \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

`ENABLE_OLLAMA_API=false` ä¼šç¦ç”¨é»˜è®¤çš„ Ollama åŽç«¯ï¼Œå¦åˆ™å®ƒä¼šæ˜¾ç¤ºä¸ºç©ºå¹¶å¹²æ‰°æ¨¡åž‹é€‰æ‹©å™¨ã€‚å¦‚æžœä½ ç¡®å®žåœ¨åŒæ—¶è¿è¡Œ Ollamaï¼Œå¯ä»¥çœç•¥æ­¤å‚æ•°ã€‚

é¦–æ¬¡å¯åŠ¨éœ€è¦ 15â€“30 ç§’ï¼šOpen WebUI åœ¨ç¬¬ä¸€æ¬¡å¯åŠ¨æ—¶ä¼šä¸‹è½½ sentence-transformer embeddingï¼ˆåµŒå…¥ï¼‰æ¨¡åž‹ï¼ˆçº¦ 150MBï¼‰ã€‚è¯·ç­‰å¾… `docker logs open-webui` è¾“å‡ºç¨³å®šåŽå†æ‰“å¼€ UIã€‚

### 5. æ‰“å¼€ UI

è®¿é—® **http://localhost:3000** ã€‚åˆ›å»ºç®¡ç†å‘˜è´¦æˆ·ï¼ˆç¬¬ä¸€ä¸ªç”¨æˆ·å°†æˆä¸ºç®¡ç†å‘˜ï¼‰ã€‚ä½ åº”è¯¥èƒ½åœ¨æ¨¡åž‹ä¸‹æ‹‰åˆ—è¡¨ä¸­çœ‹åˆ°ä½ çš„ agentï¼ˆä»¥ä½ çš„ profile å‘½åï¼Œé»˜è®¤ profile åˆ™æ˜¾ç¤ºä¸º **zed-agent**ï¼‰ã€‚å¼€å§‹èŠå¤©å§ï¼

## Docker Compose è®¾ç½®

å¦‚éœ€æ›´æŒä¹…çš„è®¾ç½®ï¼Œåˆ›å»º `docker-compose.yml`ï¼š

```yaml
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
    environment:
      - OPENAI_API_BASE_URL=http://host.docker.internal:8642/v1
      - OPENAI_API_KEY=your-secret-key
      - ENABLE_OLLAMA_API=false
    extra_hosts:
      - "host.docker.internal:host-gateway"
    restart: always

volumes:
  open-webui:
```

ç„¶åŽï¼š

```bash
docker compose up -d
```

## é€šè¿‡ç®¡ç†å‘˜ UI é…ç½®

å¦‚æžœä½ æ›´å€¾å‘äºŽé€šè¿‡ UI è€ŒéžçŽ¯å¢ƒå˜é‡é…ç½®è¿žæŽ¥ï¼š

1. åœ¨ **http://localhost:3000** ç™»å½• Open WebUI
2. ç‚¹å‡»ä½ çš„**å¤´åƒ** â†’ **Admin Settings**
3. è¿›å…¥ **Connections**
4. åœ¨ **OpenAI API** ä¸‹ï¼Œç‚¹å‡»**æ‰³æ‰‹å›¾æ ‡**ï¼ˆManageï¼‰
5. ç‚¹å‡» **+ Add New Connection**
6. å¡«å†™ï¼š
   - **URL**ï¼š`http://host.docker.internal:8642/v1`
   - **API Key**ï¼šä¸Ž Zed ä¸­ `API_SERVER_KEY` å®Œå…¨ç›¸åŒçš„å€¼
7. ç‚¹å‡»**å¯¹å‹¾**éªŒè¯è¿žæŽ¥
8. **ä¿å­˜**

ä½ çš„ agent æ¨¡åž‹çŽ°åœ¨åº”å‡ºçŽ°åœ¨æ¨¡åž‹ä¸‹æ‹‰åˆ—è¡¨ä¸­ï¼ˆä»¥ä½ çš„ profile å‘½åï¼Œé»˜è®¤ profile åˆ™æ˜¾ç¤ºä¸º **zed-agent**ï¼‰ã€‚

:::warning
çŽ¯å¢ƒå˜é‡ä»…åœ¨ Open WebUI **é¦–æ¬¡å¯åŠ¨**æ—¶ç”Ÿæ•ˆã€‚æ­¤åŽï¼Œè¿žæŽ¥è®¾ç½®å­˜å‚¨åœ¨å…¶å†…éƒ¨æ•°æ®åº“ä¸­ã€‚å¦‚éœ€åŽç»­ä¿®æ”¹ï¼Œè¯·ä½¿ç”¨ç®¡ç†å‘˜ UIï¼Œæˆ–åˆ é™¤ Docker å·åŽé‡æ–°å¯åŠ¨ã€‚
:::

## API ç±»åž‹ï¼šChat Completions ä¸Ž Responses

Open WebUI è¿žæŽ¥åŽç«¯æ—¶æ”¯æŒä¸¤ç§ API æ¨¡å¼ï¼š

| æ¨¡å¼ | æ ¼å¼ | ä½¿ç”¨åœºæ™¯ |
|------|--------|-------------|
| **Chat Completions**ï¼ˆé»˜è®¤ï¼‰ | `/v1/chat/completions` | æŽ¨èã€‚å¼€ç®±å³ç”¨ã€‚ |
| **Responses**ï¼ˆå®žéªŒæ€§ï¼‰ | `/v1/responses` | é€šè¿‡ `previous_response_id` å®žçŽ°æœåŠ¡ç«¯å¯¹è¯çŠ¶æ€ã€‚ |

### ä½¿ç”¨ Chat Completionsï¼ˆæŽ¨èï¼‰

è¿™æ˜¯é»˜è®¤æ¨¡å¼ï¼Œæ— éœ€é¢å¤–é…ç½®ã€‚Open WebUI å‘é€æ ‡å‡† OpenAI æ ¼å¼è¯·æ±‚ï¼ŒZed Agent ç›¸åº”å“åº”ã€‚æ¯ä¸ªè¯·æ±‚åŒ…å«å®Œæ•´çš„å¯¹è¯åŽ†å²ã€‚

### ä½¿ç”¨ Responses API

å¯ç”¨ Responses API æ¨¡å¼ï¼š

1. è¿›å…¥ **Admin Settings** â†’ **Connections** â†’ **OpenAI** â†’ **Manage**
2. ç¼–è¾‘ä½ çš„ zed-agent è¿žæŽ¥
3. å°† **API Type** ä»Ž "Chat Completions" æ”¹ä¸º **"Responses (Experimental)"**
4. ä¿å­˜

ä½¿ç”¨ Responses API æ—¶ï¼ŒOpen WebUI ä»¥ Responses æ ¼å¼å‘é€è¯·æ±‚ï¼ˆ`input` æ•°ç»„ + `instructions`ï¼‰ï¼ŒZed Agent å¯é€šè¿‡ `previous_response_id` åœ¨å¤šè½®å¯¹è¯ä¸­ä¿ç•™å®Œæ•´çš„å·¥å…·è°ƒç”¨åŽ†å²ã€‚å½“ `stream: true` æ—¶ï¼ŒZed è¿˜ä¼šæµå¼ä¼ è¾“ç¬¦åˆè§„èŒƒçš„ `function_call` å’Œ `function_call_output` äº‹ä»¶ï¼Œè¿™ä½¿å¾—æ”¯æŒ Responses äº‹ä»¶æ¸²æŸ“çš„å®¢æˆ·ç«¯èƒ½å¤Ÿå±•ç¤ºè‡ªå®šä¹‰ç»“æž„åŒ–å·¥å…·è°ƒç”¨ UIã€‚

:::note
Open WebUI ç›®å‰å³ä½¿åœ¨ Responses æ¨¡å¼ä¸‹ä¹Ÿåœ¨å®¢æˆ·ç«¯ç®¡ç†å¯¹è¯åŽ†å²â€”â€”å®ƒåœ¨æ¯ä¸ªè¯·æ±‚ä¸­å‘é€å®Œæ•´çš„æ¶ˆæ¯åŽ†å²ï¼Œè€Œéžä½¿ç”¨ `previous_response_id`ã€‚Responses æ¨¡å¼ç›®å‰çš„ä¸»è¦ä¼˜åŠ¿åœ¨äºŽç»“æž„åŒ–äº‹ä»¶æµï¼šæ–‡æœ¬å¢žé‡ã€`function_call` å’Œ `function_call_output` äº‹ä»¶ä»¥ OpenAI Responses SSE äº‹ä»¶å½¢å¼åˆ°è¾¾ï¼Œè€Œéž Chat Completions åˆ†å—ã€‚
:::

## å·¥ä½œåŽŸç†

å½“ä½ åœ¨ Open WebUI ä¸­å‘é€æ¶ˆæ¯æ—¶ï¼š

1. Open WebUI å‘é€åŒ…å«ä½ çš„æ¶ˆæ¯å’Œå¯¹è¯åŽ†å²çš„ `POST /v1/chat/completions` è¯·æ±‚
2. Zed Agent ä½¿ç”¨ API æœåŠ¡å™¨çš„ profileã€æ¨¡åž‹/æä¾›å•†é…ç½®ã€è®°å¿†ã€æŠ€èƒ½å’Œå·²é…ç½®çš„ API æœåŠ¡å™¨å·¥å…·é›†ï¼Œåœ¨æœåŠ¡ç«¯åˆ›å»ºä¸€ä¸ª `AIAgent` å®žä¾‹
3. Agent å¤„ç†ä½ çš„è¯·æ±‚â€”â€”å®ƒå¯èƒ½åœ¨ API æœåŠ¡å™¨ä¸»æœºä¸Šè°ƒç”¨å·¥å…·ï¼ˆç»ˆç«¯ã€æ–‡ä»¶æ“ä½œã€ç½‘ç»œæœç´¢ç­‰ï¼‰
4. å·¥å…·æ‰§è¡Œæ—¶ï¼Œ**å†…è”è¿›åº¦æ¶ˆæ¯ä¼šæµå¼ä¼ è¾“åˆ° UI**ï¼Œè®©ä½ å®žæ—¶çœ‹åˆ° agent çš„æ“ä½œï¼ˆä¾‹å¦‚ `` `ðŸ’» ls -la` ``ã€`` `ðŸ” Python 3.12 release` ``ï¼‰
5. Agent çš„æœ€ç»ˆæ–‡æœ¬å“åº”æµå¼è¿”å›žç»™ Open WebUI
6. Open WebUI åœ¨èŠå¤©ç•Œé¢ä¸­æ˜¾ç¤ºå“åº”

ä½ çš„ agent å¯ä»¥è®¿é—®è¯¥ API æœåŠ¡å™¨ Zed å®žä¾‹æ‰€æ‹¥æœ‰çš„ç›¸åŒå·¥å…·å’Œèƒ½åŠ›ã€‚å¦‚æžœ API æœåŠ¡å™¨æ˜¯è¿œç¨‹çš„ï¼Œè¿™äº›å·¥å…·ä¹Ÿæ˜¯è¿œç¨‹çš„ã€‚

å¦‚æžœä½ ä»Šå¤©éœ€è¦å·¥å…·åœ¨**æœ¬åœ°**å·¥ä½œåŒºè¿è¡Œï¼Œè¯·åœ¨æœ¬åœ°è¿è¡Œ Zed å¹¶å°†å…¶æŒ‡å‘çº¯ LLM æä¾›å•†æˆ–çº¯ OpenAI å…¼å®¹æ¨¡åž‹ä»£ç†ï¼ˆä¾‹å¦‚ vLLMã€LiteLLMã€Ollamaã€llama.cppã€OpenAIã€OpenRouter ç­‰ï¼‰ã€‚"è¿œç¨‹å¤§è„‘ã€æœ¬åœ°æ‰§è¡Œ"çš„åˆ†ç¦»è¿è¡Œæ—¶æ¨¡å¼æ­£åœ¨ [#18715](https://github.com/NousResearch/zed-agent/issues/18715) ä¸­è·Ÿè¸ªï¼›è¿™ä¸æ˜¯å½“å‰ API æœåŠ¡å™¨çš„è¡Œä¸ºã€‚

:::tip å·¥å…·è¿›åº¦
å¯ç”¨æµå¼ä¼ è¾“ï¼ˆé»˜è®¤ï¼‰åŽï¼Œå·¥å…·è¿è¡Œæ—¶ä½ ä¼šçœ‹åˆ°ç®€çŸ­çš„å†…è”æŒ‡ç¤ºâ€”â€”å·¥å…· emoji åŠå…¶å…³é”®å‚æ•°ã€‚è¿™äº›å†…å®¹åœ¨ agent æœ€ç»ˆç­”æ¡ˆä¹‹å‰å‡ºçŽ°åœ¨å“åº”æµä¸­ï¼Œè®©ä½ äº†è§£åŽå°æ­£åœ¨å‘ç”Ÿçš„äº‹æƒ…ã€‚
:::

## é…ç½®å‚è€ƒ

### Zed Agentï¼ˆAPI æœåŠ¡å™¨ï¼‰

| å˜é‡ | é»˜è®¤å€¼ | æè¿° |
|----------|---------|-------------|
| `API_SERVER_ENABLED` | `false` | å¯ç”¨ API æœåŠ¡å™¨ |
| `API_SERVER_PORT` | `8642` | HTTP æœåŠ¡å™¨ç«¯å£ |
| `API_SERVER_HOST` | `127.0.0.1` | ç»‘å®šåœ°å€ |
| `API_SERVER_KEY` | _ï¼ˆå¿…å¡«ï¼‰_ | ç”¨äºŽè®¤è¯çš„ Bearer tokenï¼ˆä»¤ç‰Œï¼‰ã€‚éœ€ä¸Ž `OPENAI_API_KEY` åŒ¹é…ã€‚ |

### Open WebUI

| å˜é‡ | æè¿° |
|----------|-------------|
| `OPENAI_API_BASE_URL` | Zed Agent çš„ API URLï¼ˆåŒ…å« `/v1`ï¼‰ |
| `OPENAI_API_KEY` | ä¸èƒ½ä¸ºç©ºã€‚éœ€ä¸Žä½ çš„ `API_SERVER_KEY` åŒ¹é…ã€‚ |

## æ•…éšœæŽ’æŸ¥

### ä¸‹æ‹‰åˆ—è¡¨ä¸­æ²¡æœ‰æ¨¡åž‹

- **æ£€æŸ¥ URL æ˜¯å¦æœ‰ `/v1` åŽç¼€**ï¼š`http://host.docker.internal:8642/v1`ï¼ˆä¸åªæ˜¯ `:8642`ï¼‰
- **éªŒè¯ gateway æ˜¯å¦è¿è¡Œ**ï¼š`curl http://localhost:8642/health` åº”è¿”å›ž `{"status": "ok"}`
- **æ£€æŸ¥æ¨¡åž‹åˆ—è¡¨**ï¼š`curl -H "Authorization: Bearer your-secret-key" http://localhost:8642/v1/models` åº”è¿”å›žåŒ…å« `zed-agent` çš„åˆ—è¡¨
- **Docker ç½‘ç»œ**ï¼šåœ¨ Docker å†…éƒ¨ï¼Œ`localhost` æŒ‡å®¹å™¨æœ¬èº«ï¼Œè€Œéžä½ çš„ä¸»æœºã€‚è¯·ä½¿ç”¨ `host.docker.internal` æˆ– `--network=host`ã€‚
- **ç©º Ollama åŽç«¯é®æŒ¡é€‰æ‹©å™¨**ï¼šå¦‚æžœä½ çœç•¥äº† `ENABLE_OLLAMA_API=false`ï¼ŒOpen WebUI ä¼šåœ¨ä½ çš„ Zed æ¨¡åž‹ä¸Šæ–¹æ˜¾ç¤ºä¸€ä¸ªç©ºçš„ Ollama åŒºåŸŸã€‚è¯·ä½¿ç”¨ `-e ENABLE_OLLAMA_API=false` é‡å¯å®¹å™¨ï¼Œæˆ–åœ¨ **Admin Settings â†’ Connections** ä¸­ç¦ç”¨ Ollamaã€‚

### è¿žæŽ¥æµ‹è¯•é€šè¿‡ä½†æ¨¡åž‹æ— æ³•åŠ è½½

è¿™å‡ ä¹Žæ€»æ˜¯å› ä¸ºç¼ºå°‘ `/v1` åŽç¼€ã€‚Open WebUI çš„è¿žæŽ¥æµ‹è¯•åªæ˜¯åŸºæœ¬çš„è¿žé€šæ€§æ£€æŸ¥â€”â€”å®ƒä¸éªŒè¯æ¨¡åž‹åˆ—è¡¨æ˜¯å¦æ­£å¸¸å·¥ä½œã€‚

### å“åº”è€—æ—¶å¾ˆé•¿

Zed Agent å¯èƒ½åœ¨ç”Ÿæˆæœ€ç»ˆå“åº”ä¹‹å‰æ‰§è¡Œäº†å¤šæ¬¡å·¥å…·è°ƒç”¨ï¼ˆè¯»å–æ–‡ä»¶ã€è¿è¡Œå‘½ä»¤ã€æœç´¢ç½‘ç»œï¼‰ã€‚å¯¹äºŽå¤æ‚æŸ¥è¯¢ï¼Œè¿™æ˜¯æ­£å¸¸çŽ°è±¡ã€‚å“åº”ä¼šåœ¨ agent å®ŒæˆåŽä¸€æ¬¡æ€§å‡ºçŽ°ã€‚

### "Invalid API key" é”™è¯¯

ç¡®ä¿ Open WebUI ä¸­çš„ `OPENAI_API_KEY` ä¸Ž Zed Agent ä¸­çš„ `API_SERVER_KEY` åŒ¹é…ã€‚

:::warning
Open WebUI åœ¨é¦–æ¬¡å¯åŠ¨åŽä¼šå°† OpenAI å…¼å®¹è¿žæŽ¥è®¾ç½®æŒä¹…åŒ–åˆ°å…¶è‡ªèº«æ•°æ®åº“ä¸­ã€‚å¦‚æžœä½ åœ¨ç®¡ç†å‘˜ UI ä¸­è¯¯ä¿å­˜äº†é”™è¯¯çš„å¯†é’¥ï¼Œä»…ä¿®æ”¹çŽ¯å¢ƒå˜é‡æ˜¯ä¸å¤Ÿçš„â€”â€”è¯·åœ¨ **Admin Settings â†’ Connections** ä¸­æ›´æ–°æˆ–åˆ é™¤å·²ä¿å­˜çš„è¿žæŽ¥ï¼Œæˆ–é‡ç½® Open WebUI æ•°æ®ç›®å½•/æ•°æ®åº“ã€‚
:::

## å¤šç”¨æˆ·è®¾ç½®ä¸Ž Profiles

è¦ä¸ºæ¯ä¸ªç”¨æˆ·è¿è¡Œç‹¬ç«‹çš„ Zed å®žä¾‹â€”â€”å„è‡ªæ‹¥æœ‰ç‹¬ç«‹çš„é…ç½®ã€è®°å¿†å’ŒæŠ€èƒ½â€”â€”è¯·ä½¿ç”¨ [profiles](/user-guide/profiles)ã€‚æ¯ä¸ª profile åœ¨ä¸åŒç«¯å£ä¸Šè¿è¡Œè‡ªå·±çš„ API æœåŠ¡å™¨ï¼Œå¹¶è‡ªåŠ¨å°† profile åç§°ä½œä¸ºæ¨¡åž‹åç§°å…¬å‘Šç»™ Open WebUIã€‚

### 1. åˆ›å»º profiles å¹¶é…ç½® API æœåŠ¡å™¨

`API_SERVER_*` æ˜¯çŽ¯å¢ƒå˜é‡ï¼Œè€Œéž YAML é…ç½®é”®ï¼Œå› æ­¤è¯·å°†å®ƒä»¬å†™å…¥æ¯ä¸ª profile çš„ `.env`ã€‚é€‰æ‹©é»˜è®¤å¹³å°èŒƒå›´ä¹‹å¤–çš„ç«¯å£ï¼ˆ`8644` æ˜¯ webhook é€‚é…å™¨ï¼Œ`8645` æ˜¯ wecom-callbackï¼Œ`8646` æ˜¯ msgraph-webhookï¼‰ï¼Œä¾‹å¦‚ `8650+`ï¼š

```bash
zed profile create alice
cat >> ~/.zed/profiles/alice/.env <<EOF
API_SERVER_ENABLED=true
API_SERVER_PORT=8650
API_SERVER_KEY=alice-secret
EOF

zed profile create bob
cat >> ~/.zed/profiles/bob/.env <<EOF
API_SERVER_ENABLED=true
API_SERVER_PORT=8651
API_SERVER_KEY=bob-secret
EOF
```

### 2. å¯åŠ¨å„ gateway

```bash
zed -p alice gateway &
zed -p bob gateway &
```

### 3. åœ¨ Open WebUI ä¸­æ·»åŠ è¿žæŽ¥

åœ¨ **Admin Settings** â†’ **Connections** â†’ **OpenAI API** â†’ **Manage** ä¸­ï¼Œä¸ºæ¯ä¸ª profile æ·»åŠ ä¸€ä¸ªè¿žæŽ¥ï¼š

| è¿žæŽ¥ | URL | API Key |
|-----------|-----|---------|
| Alice | `http://host.docker.internal:8650/v1` | `alice-secret` |
| Bob | `http://host.docker.internal:8651/v1` | `bob-secret` |

æ¨¡åž‹ä¸‹æ‹‰åˆ—è¡¨å°†æ˜¾ç¤º `alice` å’Œ `bob` ä½œä¸ºç‹¬ç«‹æ¨¡åž‹ã€‚ä½ å¯ä»¥é€šè¿‡ç®¡ç†å‘˜é¢æ¿å°†æ¨¡åž‹åˆ†é…ç»™ Open WebUI ç”¨æˆ·ï¼Œä¸ºæ¯ä¸ªç”¨æˆ·æä¾›å…¶ç‹¬ç«‹çš„ Zed agentã€‚

:::tip è‡ªå®šä¹‰æ¨¡åž‹åç§°
æ¨¡åž‹åç§°é»˜è®¤ä¸º profile åç§°ã€‚å¦‚éœ€è¦†ç›–ï¼Œè¯·åœ¨ profile çš„ `.env` ä¸­è®¾ç½® `API_SERVER_MODEL_NAME`ï¼š
```bash
zed -p alice config set API_SERVER_MODEL_NAME "Alice's Agent"
```
:::

## Linux Dockerï¼ˆæ—  Docker Desktopï¼‰

åœ¨æ²¡æœ‰ Docker Desktop çš„ Linux ä¸Šï¼Œ`host.docker.internal` é»˜è®¤æ— æ³•è§£æžã€‚å¯é€‰æ–¹æ¡ˆï¼š

```bash
# æ–¹æ¡ˆ 1ï¼šæ·»åŠ ä¸»æœºæ˜ å°„
docker run --add-host=host.docker.internal:host-gateway ...

# æ–¹æ¡ˆ 2ï¼šä½¿ç”¨ä¸»æœºç½‘ç»œ
docker run --network=host -e OPENAI_API_BASE_URL=http://localhost:8642/v1 ...

# æ–¹æ¡ˆ 3ï¼šä½¿ç”¨ Docker bridge IP
docker run -e OPENAI_API_BASE_URL=http://172.17.0.1:8642/v1 ...
```