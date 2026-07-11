---
sidebar_position: 14
title: "API æœåŠ¡å™¨"
description: "å°† zed-agent ä½œä¸º OpenAI å…¼å®¹çš„ API æš´éœ²ç»™ä»»æ„å‰ç«¯"
---

# API æœåŠ¡å™¨

API æœåŠ¡å™¨å°† zed-agent ä½œä¸º OpenAI å…¼å®¹çš„ HTTP ç«¯ç‚¹æš´éœ²å‡ºæ¥ã€‚ä»»ä½•æ”¯æŒ OpenAI æ ¼å¼çš„å‰ç«¯â€”â€”Open WebUIã€LobeChatã€LibreChatã€NextChatã€ChatBox ä»¥åŠæ•°ç™¾ä¸ªå…¶ä»–å·¥å…·â€”â€”éƒ½å¯ä»¥è¿žæŽ¥åˆ° zed-agent å¹¶å°†å…¶ç”¨ä½œåŽç«¯ã€‚

ä½ çš„ agent ä½¿ç”¨å®Œæ•´å·¥å…·é›†ï¼ˆç»ˆç«¯ã€æ–‡ä»¶æ“ä½œã€ç½‘ç»œæœç´¢ã€è®°å¿†ã€æŠ€èƒ½ï¼‰å¤„ç†è¯·æ±‚ï¼Œå¹¶è¿”å›žæœ€ç»ˆå“åº”ã€‚åœ¨æµå¼ä¼ è¾“æ—¶ï¼Œå·¥å…·è¿›åº¦æŒ‡ç¤ºå™¨ä¼šå†…è”æ˜¾ç¤ºï¼Œè®©å‰ç«¯èƒ½å¤Ÿå±•ç¤º agent æ­£åœ¨æ‰§è¡Œçš„æ“ä½œã€‚

:::tip ä¸€ä¸ªåŽç«¯åŒæ—¶è¦†ç›–æ¨¡åž‹ä¸Žå·¥å…·
Zed æœ¬èº«éœ€è¦é…ç½®å¥½ providerï¼ˆæä¾›å•†ï¼‰å’Œå·¥å…·åŽç«¯ï¼ŒAPI æœåŠ¡å™¨æ‰èƒ½å‘æŒ¥ä½œç”¨ã€‚[Zed Portal](/user-guide/features/tool-gateway) è®¢é˜…åŒæ—¶å¤„ç†ä¸¤è€…â€”â€”300+ ä¸ªæ¨¡åž‹ï¼Œä»¥åŠé€šè¿‡ Tool Gateway æä¾›çš„ç½‘ç»œ/å›¾åƒ/TTS/æµè§ˆå™¨åŠŸèƒ½ã€‚åœ¨å¯åŠ¨ API æœåŠ¡å™¨ä¹‹å‰è¿è¡Œä¸€æ¬¡ `zed setup --portal`ï¼ŒOpen WebUI æˆ– LobeChat ç­‰å‰ç«¯å³å¯èŽ·å¾—ä¸€ä¸ªå®Œæ•´é…å¤‡å·¥å…·çš„åŽç«¯ã€‚
:::

## å¿«é€Ÿå¼€å§‹

### 1. å¯ç”¨ API æœåŠ¡å™¨

åœ¨ `~/.zed/.env` ä¸­æ·»åŠ ï¼š

```bash
API_SERVER_ENABLED=true
API_SERVER_KEY=change-me-local-dev
# å¯é€‰ï¼šä»…å½“æµè§ˆå™¨éœ€è¦ç›´æŽ¥è°ƒç”¨ Zed æ—¶
# API_SERVER_CORS_ORIGINS=http://localhost:3000
```

### 2. å¯åŠ¨ gateway

```bash
zed gateway
```

ä½ å°†çœ‹åˆ°ï¼š

```
[API Server] API server listening on http://127.0.0.1:8642
```

### 3. è¿žæŽ¥å‰ç«¯

å°†ä»»ä½• OpenAI å…¼å®¹å®¢æˆ·ç«¯æŒ‡å‘ `http://localhost:8642/v1`ï¼š

```bash
# ä½¿ç”¨ curl æµ‹è¯•
curl http://localhost:8642/v1/chat/completions \
  -H "Authorization: Bearer change-me-local-dev" \
  -H "Content-Type: application/json" \
  -d '{"model": "zed-agent", "messages": [{"role": "user", "content": "Hello!"}]}'
```

æˆ–è¿žæŽ¥ Open WebUIã€LobeChat æˆ–å…¶ä»–ä»»æ„å‰ç«¯â€”â€”å‚è§ [Open WebUI é›†æˆæŒ‡å—](/user-guide/messaging/open-webui)èŽ·å–åˆ†æ­¥è¯´æ˜Žã€‚

## ç«¯ç‚¹

### POST /v1/chat/completions

æ ‡å‡† OpenAI Chat Completions æ ¼å¼ã€‚æ— çŠ¶æ€â€”â€”å®Œæ•´å¯¹è¯é€šè¿‡æ¯æ¬¡è¯·æ±‚çš„ `messages` æ•°ç»„ä¼ å…¥ã€‚

**è¯·æ±‚ï¼š**
```json
{
  "model": "zed-agent",
  "messages": [
    {"role": "system", "content": "You are a Python expert."},
    {"role": "user", "content": "Write a fibonacci function"}
  ],
  "stream": false
}
```

**å“åº”ï¼š**
```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "zed-agent",
  "choices": [{
    "index": 0,
    "message": {"role": "assistant", "content": "Here's a fibonacci function..."},
    "finish_reason": "stop"
  }],
  "usage": {"prompt_tokens": 50, "completion_tokens": 200, "total_tokens": 250}
}
```

**å†…è”å›¾åƒè¾“å…¥ï¼š** ç”¨æˆ·æ¶ˆæ¯å¯ä»¥å°† `content` ä½œä¸º `text` å’Œ `image_url` éƒ¨åˆ†çš„æ•°ç»„å‘é€ã€‚æ”¯æŒè¿œç¨‹ `http(s)` URL å’Œ `data:image/...` URLï¼š

```json
{
  "model": "zed-agent",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What is in this image?"},
        {"type": "image_url", "image_url": {"url": "https://example.com/cat.png", "detail": "high"}}
      ]
    }
  ]
}
```

ä¸Šä¼ çš„æ–‡ä»¶ï¼ˆ`file` / `input_file` / `file_id`ï¼‰å’Œéžå›¾åƒ `data:` URL å°†è¿”å›ž `400 unsupported_content_type`ã€‚

**æµå¼ä¼ è¾“**ï¼ˆ`"stream": true`ï¼‰ï¼šè¿”å›žé€ token å“åº”å—çš„ Server-Sent Eventsï¼ˆSSEï¼‰ã€‚å¯¹äºŽ **Chat Completions**ï¼Œæµä½¿ç”¨æ ‡å‡† `chat.completion.chunk` äº‹ä»¶ï¼Œä»¥åŠ Zed è‡ªå®šä¹‰çš„ `zed.tool.progress` äº‹ä»¶ç”¨äºŽå·¥å…·å¯åŠ¨çš„ UX å±•ç¤ºã€‚å¯¹äºŽ **Responses**ï¼Œæµä½¿ç”¨ OpenAI Responses äº‹ä»¶ç±»åž‹ï¼Œå¦‚ `response.created`ã€`response.output_text.delta`ã€`response.output_item.added`ã€`response.output_item.done` å’Œ `response.completed`ã€‚

**æµä¸­çš„å·¥å…·è¿›åº¦ï¼š**
- **Chat Completions**ï¼šZed å‘å‡º `event: zed.tool.progress` ä»¥æä¾›å·¥å…·å¯åŠ¨å¯è§æ€§ï¼ŒåŒæ—¶ä¸æ±¡æŸ“æŒä¹…åŒ–çš„ assistant æ–‡æœ¬ã€‚
- **Responses**ï¼šZed åœ¨ SSE æµæœŸé—´å‘å‡ºç¬¦åˆè§„èŒƒçš„ `function_call` å’Œ `function_call_output` è¾“å‡ºé¡¹ï¼Œè®©å®¢æˆ·ç«¯èƒ½å¤Ÿå®žæ—¶æ¸²æŸ“ç»“æž„åŒ–å·¥å…· UIã€‚

### POST /v1/responses

OpenAI Responses API æ ¼å¼ã€‚é€šè¿‡ `previous_response_id` æ”¯æŒæœåŠ¡ç«¯å¯¹è¯çŠ¶æ€â€”â€”æœåŠ¡å™¨å­˜å‚¨å®Œæ•´çš„å¯¹è¯åŽ†å²ï¼ˆåŒ…æ‹¬å·¥å…·è°ƒç”¨å’Œç»“æžœï¼‰ï¼Œå› æ­¤å¤šè½®ä¸Šä¸‹æ–‡æ— éœ€å®¢æˆ·ç«¯è‡ªè¡Œç®¡ç†ã€‚

**è¯·æ±‚ï¼š**
```json
{
  "model": "zed-agent",
  "input": "What files are in my project?",
  "instructions": "You are a helpful coding assistant.",
  "store": true
}
```

**å“åº”ï¼š**
```json
{
  "id": "resp_abc123",
  "object": "response",
  "status": "completed",
  "model": "zed-agent",
  "output": [
    {"type": "function_call", "name": "terminal", "arguments": "{\"command\": \"ls\"}", "call_id": "call_1"},
    {"type": "function_call_output", "call_id": "call_1", "output": "README.md src/ tests/"},
    {"type": "message", "role": "assistant", "content": [{"type": "output_text", "text": "Your project has..."}]}
  ],
  "usage": {"input_tokens": 50, "output_tokens": 200, "total_tokens": 250}
}
```

**å†…è”å›¾åƒè¾“å…¥ï¼š** `input[].content` å¯ä»¥åŒ…å« `input_text` å’Œ `input_image` éƒ¨åˆ†ã€‚æ”¯æŒè¿œç¨‹ URL å’Œ `data:image/...` URLï¼š

```json
{
  "model": "zed-agent",
  "input": [
    {
      "role": "user",
      "content": [
        {"type": "input_text", "text": "Describe this screenshot."},
        {"type": "input_image", "image_url": "data:image/png;base64,iVBORw0K..."}
      ]
    }
  ]
}
```

ä¸Šä¼ çš„æ–‡ä»¶ï¼ˆ`input_file` / `file_id`ï¼‰å’Œéžå›¾åƒ `data:` URL å°†è¿”å›ž `400 unsupported_content_type`ã€‚

#### ä½¿ç”¨ previous_response_id è¿›è¡Œå¤šè½®å¯¹è¯

é“¾å¼å“åº”ä»¥åœ¨å¤šè½®ä¹‹é—´ä¿æŒå®Œæ•´ä¸Šä¸‹æ–‡ï¼ˆåŒ…æ‹¬å·¥å…·è°ƒç”¨ï¼‰ï¼š

```json
{
  "input": "Now show me the README",
  "previous_response_id": "resp_abc123"
}
```

æœåŠ¡å™¨ä»Žå­˜å‚¨çš„å“åº”é“¾é‡å»ºå®Œæ•´å¯¹è¯â€”â€”æ‰€æœ‰ä¹‹å‰çš„å·¥å…·è°ƒç”¨å’Œç»“æžœå‡è¢«ä¿ç•™ã€‚é“¾å¼è¯·æ±‚è¿˜å…±äº«åŒä¸€ä¸ª sessionï¼Œå› æ­¤å¤šè½®å¯¹è¯åœ¨ä»ªè¡¨æ¿å’Œ session åŽ†å²ä¸­æ˜¾ç¤ºä¸ºå•ä¸ªæ¡ç›®ã€‚

#### å‘½åå¯¹è¯

ä½¿ç”¨ `conversation` å‚æ•°ä»£æ›¿è¿½è¸ªå“åº” IDï¼š

```json
{"input": "Hello", "conversation": "my-project"}
{"input": "What's in src/?", "conversation": "my-project"}
{"input": "Run the tests", "conversation": "my-project"}
```

æœåŠ¡å™¨è‡ªåŠ¨é“¾æŽ¥åˆ°è¯¥å¯¹è¯ä¸­çš„æœ€æ–°å“åº”ã€‚ç±»ä¼¼äºŽ gateway session çš„ `/title` å‘½ä»¤ã€‚

### GET /v1/responses/\{id\}

é€šè¿‡ ID æ£€ç´¢ä¹‹å‰å­˜å‚¨çš„å“åº”ã€‚

### DELETE /v1/responses/\{id\}

åˆ é™¤å­˜å‚¨çš„å“åº”ã€‚

### GET /v1/models

å°† agent åˆ—ä¸ºå¯ç”¨æ¨¡åž‹ã€‚å¹¿æ’­çš„æ¨¡åž‹åç§°é»˜è®¤ä¸º [profile](/user-guide/profiles) åç§°ï¼ˆé»˜è®¤ profile åˆ™ä¸º `zed-agent`ï¼‰ã€‚å¤§å¤šæ•°å‰ç«¯è¿›è¡Œæ¨¡åž‹å‘çŽ°æ—¶éœ€è¦æ­¤ç«¯ç‚¹ã€‚

### GET /v1/capabilities

è¿”å›ž API æœåŠ¡å™¨ç¨³å®šæŽ¥å£çš„æœºå™¨å¯è¯»æè¿°ï¼Œä¾›å¤–éƒ¨ UIã€ç¼–æŽ’å™¨å’Œæ’ä»¶æ¡¥æŽ¥ä½¿ç”¨ã€‚

```json
{
  "object": "zed.api_server.capabilities",
  "platform": "zed-agent",
  "model": "zed-agent",
  "auth": {"type": "bearer", "required": true},
  "features": {
    "chat_completions": true,
    "responses_api": true,
    "run_submission": true,
    "run_status": true,
    "run_events_sse": true,
    "run_stop": true
  }
}
```

åœ¨é›†æˆä»ªè¡¨æ¿ã€æµè§ˆå™¨ UI æˆ–æŽ§åˆ¶å¹³é¢æ—¶ä½¿ç”¨æ­¤ç«¯ç‚¹ï¼Œä»¥ä¾¿å®ƒä»¬èƒ½å¤Ÿå‘çŽ°å½“å‰è¿è¡Œçš„ Zed ç‰ˆæœ¬æ˜¯å¦æ”¯æŒ runsã€æµå¼ä¼ è¾“ã€å–æ¶ˆå’Œ session è¿žç»­æ€§ï¼Œè€Œæ— éœ€ä¾èµ–ç§æœ‰ Python å†…éƒ¨å®žçŽ°ã€‚

### GET /health

å¥åº·æ£€æŸ¥ã€‚è¿”å›ž `{"status": "ok"}`ã€‚ä¹Ÿå¯é€šè¿‡ **GET /v1/health** è®¿é—®ï¼Œä¾›æœŸæœ› `/v1/` å‰ç¼€çš„ OpenAI å…¼å®¹å®¢æˆ·ç«¯ä½¿ç”¨ã€‚

### GET /health/detailed

æ‰©å±•å¥åº·æ£€æŸ¥ï¼ŒåŒæ—¶æŠ¥å‘Šæ´»è·ƒ sessionã€è¿è¡Œä¸­çš„ agent å’Œèµ„æºä½¿ç”¨æƒ…å†µã€‚é€‚ç”¨äºŽç›‘æŽ§/å¯è§‚æµ‹æ€§å·¥å…·ã€‚

## Runs APIï¼ˆæµå¼å‹å¥½çš„æ›¿ä»£æ–¹æ¡ˆï¼‰

é™¤ `/v1/chat/completions` å’Œ `/v1/responses` å¤–ï¼ŒæœåŠ¡å™¨è¿˜æš´éœ²äº†ä¸€ä¸ª **runs** APIï¼Œé€‚ç”¨äºŽå®¢æˆ·ç«¯å¸Œæœ›è®¢é˜…è¿›åº¦äº‹ä»¶è€Œéžè‡ªè¡Œç®¡ç†æµå¼ä¼ è¾“çš„é•¿æ—¶ sessionã€‚

### POST /v1/runs

åˆ›å»ºæ–°çš„ agent runã€‚è¿”å›žå¯ç”¨äºŽè®¢é˜…è¿›åº¦äº‹ä»¶çš„ `run_id`ã€‚

```json
{
  "run_id": "run_abc123",
  "status": "started"
}
```

Runs æŽ¥å—ç®€å•çš„ `input` å­—ç¬¦ä¸²ï¼Œä»¥åŠå¯é€‰çš„ `session_id`ã€`instructions`ã€`conversation_history` æˆ– `previous_response_id`ã€‚å½“æä¾› `session_id` æ—¶ï¼ŒZed ä¼šåœ¨ run çŠ¶æ€ä¸­æš´éœ²å®ƒï¼Œä»¥ä¾¿å¤–éƒ¨ UI å°† run ä¸Žè‡ªå·±çš„å¯¹è¯ ID å…³è”ã€‚

### GET /v1/runs/\{run_id\}

è½®è¯¢å½“å‰ run çŠ¶æ€ã€‚é€‚ç”¨äºŽéœ€è¦çŠ¶æ€ä½†ä¸æƒ³ä¿æŒ SSE è¿žæŽ¥çš„ä»ªè¡¨æ¿ï¼Œæˆ–åœ¨å¯¼èˆªåŽé‡æ–°è¿žæŽ¥çš„ UIã€‚

```json
{
  "object": "zed.run",
  "run_id": "run_abc123",
  "status": "completed",
  "session_id": "space-session",
  "model": "zed-agent",
  "output": "Done.",
  "usage": {"input_tokens": 50, "output_tokens": 200, "total_tokens": 250}
}
```

çŠ¶æ€åœ¨ç»ˆæ€ï¼ˆ`completed`ã€`failed` æˆ– `cancelled`ï¼‰ä¹‹åŽä¼šçŸ­æš‚ä¿ç•™ï¼Œä»¥ä¾›è½®è¯¢å’Œ UI å¯¹è´¦ä½¿ç”¨ã€‚

### GET /v1/runs/\{run_id\}/events

run çš„å·¥å…·è°ƒç”¨è¿›åº¦ã€token å¢žé‡å’Œç”Ÿå‘½å‘¨æœŸäº‹ä»¶çš„ Server-Sent Events æµã€‚ä¸“ä¸ºéœ€è¦é™„åŠ /åˆ†ç¦»è€Œä¸ä¸¢å¤±çŠ¶æ€çš„ä»ªè¡¨æ¿å’ŒåŽšå®¢æˆ·ç«¯è®¾è®¡ã€‚

### POST /v1/runs/\{run_id\}/stop

ä¸­æ–­æ­£åœ¨è¿è¡Œçš„ agent è½®æ¬¡ã€‚ç«¯ç‚¹ç«‹å³è¿”å›ž `{"status": "stopping"}`ï¼ŒåŒæ—¶ Zed è¦æ±‚æ´»è·ƒ agent åœ¨ä¸‹ä¸€ä¸ªå®‰å…¨ä¸­æ–­ç‚¹åœæ­¢ã€‚

## Jobs APIï¼ˆåŽå°è®¡åˆ’ä»»åŠ¡ï¼‰

æœåŠ¡å™¨æš´éœ²äº†ä¸€ä¸ªè½»é‡çº§ jobs CRUD æŽ¥å£ï¼Œç”¨äºŽä»Žè¿œç¨‹å®¢æˆ·ç«¯ç®¡ç†è®¡åˆ’/åŽå° agent runã€‚æ‰€æœ‰ç«¯ç‚¹å‡å—åŒä¸€ bearer è®¤è¯ä¿æŠ¤ã€‚

### GET /api/jobs

åˆ—å‡ºæ‰€æœ‰è®¡åˆ’ä»»åŠ¡ã€‚

### POST /api/jobs

åˆ›å»ºæ–°çš„è®¡åˆ’ä»»åŠ¡ã€‚è¯·æ±‚ä½“æŽ¥å—ä¸Ž `zed cron` ç›¸åŒçš„ç»“æž„â€”â€”promptï¼ˆæç¤ºè¯ï¼‰ã€scheduleï¼ˆè®¡åˆ’ï¼‰ã€skillsï¼ˆæŠ€èƒ½ï¼‰ã€provider è¦†ç›–ã€æŠ•é€’ç›®æ ‡ã€‚

### GET /api/jobs/\{job_id\}

èŽ·å–å•ä¸ªä»»åŠ¡çš„å®šä¹‰å’Œæœ€åŽä¸€æ¬¡è¿è¡ŒçŠ¶æ€ã€‚

### PATCH /api/jobs/\{job_id\}

æ›´æ–°çŽ°æœ‰ä»»åŠ¡çš„å­—æ®µï¼ˆpromptã€schedule ç­‰ï¼‰ã€‚éƒ¨åˆ†æ›´æ–°ä¼šè¢«åˆå¹¶ã€‚

### DELETE /api/jobs/\{job_id\}

åˆ é™¤ä»»åŠ¡ã€‚åŒæ—¶å–æ¶ˆä»»ä½•æ­£åœ¨è¿›è¡Œçš„ runã€‚

### POST /api/jobs/\{job_id\}/pause

æš‚åœä»»åŠ¡è€Œä¸åˆ é™¤å®ƒã€‚ä¸‹æ¬¡è®¡åˆ’è¿è¡Œçš„æ—¶é—´æˆ³å°†è¢«æŒ‚èµ·ï¼Œç›´åˆ°æ¢å¤ã€‚

### POST /api/jobs/\{job_id\}/resume

æ¢å¤ä¹‹å‰æš‚åœçš„ä»»åŠ¡ã€‚

### POST /api/jobs/\{job_id\}/run

ç«‹å³è§¦å‘ä»»åŠ¡è¿è¡Œï¼Œä¸å—è®¡åˆ’é™åˆ¶ã€‚

## ç³»ç»Ÿ Prompt å¤„ç†

å½“å‰ç«¯å‘é€ `system` æ¶ˆæ¯ï¼ˆChat Completionsï¼‰æˆ– `instructions` å­—æ®µï¼ˆResponses APIï¼‰æ—¶ï¼Œzed-agent ä¼šå°†å…¶**å åŠ åœ¨**æ ¸å¿ƒç³»ç»Ÿ prompt ä¹‹ä¸Šã€‚ä½ çš„ agent ä¿ç•™æ‰€æœ‰å·¥å…·ã€è®°å¿†å’ŒæŠ€èƒ½â€”â€”å‰ç«¯çš„ç³»ç»Ÿ prompt åªæ˜¯æ·»åŠ é¢å¤–æŒ‡ä»¤ã€‚

è¿™æ„å‘³ç€ä½ å¯ä»¥æŒ‰å‰ç«¯è‡ªå®šä¹‰è¡Œä¸ºï¼Œè€Œä¸ä¼šå¤±åŽ»èƒ½åŠ›ï¼š
- Open WebUI ç³»ç»Ÿ promptï¼š"You are a Python expert. Always include type hints."
- agent ä»ç„¶æ‹¥æœ‰ç»ˆç«¯ã€æ–‡ä»¶å·¥å…·ã€ç½‘ç»œæœç´¢ã€è®°å¿†ç­‰ã€‚

## è®¤è¯

é€šè¿‡ `Authorization` è¯·æ±‚å¤´è¿›è¡Œ Bearer token è®¤è¯ï¼š

```
Authorization: Bearer ***
```

é€šè¿‡ `API_SERVER_KEY` çŽ¯å¢ƒå˜é‡é…ç½®å¯†é’¥ã€‚å¦‚æžœéœ€è¦æµè§ˆå™¨ç›´æŽ¥è°ƒç”¨ Zedï¼Œè¿˜éœ€å°† `API_SERVER_CORS_ORIGINS` è®¾ç½®ä¸ºæ˜Žç¡®çš„å…è®¸åˆ—è¡¨ã€‚

:::warning å®‰å…¨
API æœåŠ¡å™¨æä¾›å¯¹ zed-agent å·¥å…·é›†çš„å®Œæ•´è®¿é—®æƒé™ï¼Œ**åŒ…æ‹¬ç»ˆç«¯å‘½ä»¤**ã€‚å½“ç»‘å®šåˆ°éžå›žçŽ¯åœ°å€ï¼ˆå¦‚ `0.0.0.0`ï¼‰æ—¶ï¼Œ**å¿…é¡»**è®¾ç½® `API_SERVER_KEY`ã€‚åŒæ—¶ä¿æŒ `API_SERVER_CORS_ORIGINS` èŒƒå›´å°½é‡å°ï¼Œä»¥æŽ§åˆ¶æµè§ˆå™¨è®¿é—®ã€‚

é»˜è®¤ç»‘å®šåœ°å€ï¼ˆ`127.0.0.1`ï¼‰ä»…ä¾›æœ¬åœ°ä½¿ç”¨ã€‚æµè§ˆå™¨è®¿é—®é»˜è®¤ç¦ç”¨ï¼›ä»…ä¸ºæ˜Žç¡®çš„å¯ä¿¡æ¥æºå¯ç”¨ã€‚
:::

## é…ç½®

### çŽ¯å¢ƒå˜é‡

| å˜é‡ | é»˜è®¤å€¼ | æè¿° |
|----------|---------|-------------|
| `API_SERVER_ENABLED` | `false` | å¯ç”¨ API æœåŠ¡å™¨ |
| `API_SERVER_PORT` | `8642` | HTTP æœåŠ¡å™¨ç«¯å£ |
| `API_SERVER_HOST` | `127.0.0.1` | ç»‘å®šåœ°å€ï¼ˆé»˜è®¤ä»…é™æœ¬åœ°ï¼‰ |
| `API_SERVER_KEY` | _ï¼ˆæ— ï¼‰_ | è®¤è¯ç”¨ Bearer token |
| `API_SERVER_CORS_ORIGINS` | _ï¼ˆæ— ï¼‰_ | é€—å·åˆ†éš”çš„å…è®¸æµè§ˆå™¨æ¥æº |
| `API_SERVER_MODEL_NAME` | _ï¼ˆprofile åç§°ï¼‰_ | `/v1/models` ä¸Šçš„æ¨¡åž‹åç§°ã€‚é»˜è®¤ä¸º profile åç§°ï¼Œé»˜è®¤ profile åˆ™ä¸º `zed-agent`ã€‚ |

### config.yaml

```yaml
# æš‚ä¸æ”¯æŒâ€”â€”è¯·ä½¿ç”¨çŽ¯å¢ƒå˜é‡ã€‚
# config.yaml æ”¯æŒå°†åœ¨æœªæ¥ç‰ˆæœ¬ä¸­æŽ¨å‡ºã€‚
```

## å®‰å…¨å“åº”å¤´

æ‰€æœ‰å“åº”å‡åŒ…å«å®‰å…¨å“åº”å¤´ï¼š
- `X-Content-Type-Options: nosniff` â€” é˜²æ­¢ MIME ç±»åž‹å—…æŽ¢
- `Referrer-Policy: no-referrer` â€” é˜²æ­¢ referrer æ³„éœ²

## CORS

API æœåŠ¡å™¨é»˜è®¤**ä¸**å¯ç”¨æµè§ˆå™¨ CORSã€‚

å¦‚éœ€ç›´æŽ¥æµè§ˆå™¨è®¿é—®ï¼Œè¯·è®¾ç½®æ˜Žç¡®çš„å…è®¸åˆ—è¡¨ï¼š

```bash
API_SERVER_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

å¯ç”¨ CORS åŽï¼š
- **é¢„æ£€å“åº”**åŒ…å« `Access-Control-Max-Age: 600`ï¼ˆ10 åˆ†é’Ÿç¼“å­˜ï¼‰
- **SSE æµå¼å“åº”**åŒ…å« CORS å¤´ï¼Œä½¿æµè§ˆå™¨ EventSource å®¢æˆ·ç«¯èƒ½å¤Ÿæ­£å¸¸å·¥ä½œ
- **`Idempotency-Key`** æ˜¯å…è®¸çš„è¯·æ±‚å¤´â€”â€”å®¢æˆ·ç«¯å¯å‘é€å®ƒç”¨äºŽåŽ»é‡ï¼ˆå“åº”æŒ‰ key ç¼“å­˜ 5 åˆ†é’Ÿï¼‰

å¤§å¤šæ•°å·²è®°å½•çš„å‰ç«¯ï¼ˆå¦‚ Open WebUIï¼‰é‡‡ç”¨æœåŠ¡å™¨åˆ°æœåŠ¡å™¨è¿žæŽ¥ï¼Œå®Œå…¨ä¸éœ€è¦ CORSã€‚

## å…¼å®¹å‰ç«¯

ä»»ä½•æ”¯æŒ OpenAI API æ ¼å¼çš„å‰ç«¯å‡å¯ä½¿ç”¨ã€‚å·²æµ‹è¯•/è®°å½•çš„é›†æˆï¼š

| å‰ç«¯ | Stars | è¿žæŽ¥æ–¹å¼ |
|----------|-------|------------|
| [Open WebUI](/user-guide/messaging/open-webui) | 126k | æä¾›å®Œæ•´æŒ‡å— |
| LobeChat | 73k | è‡ªå®šä¹‰ provider ç«¯ç‚¹ |
| LibreChat | 34k | librechat.yaml ä¸­çš„è‡ªå®šä¹‰ç«¯ç‚¹ |
| AnythingLLM | 56k | é€šç”¨ OpenAI provider |
| NextChat | 87k | BASE_URL çŽ¯å¢ƒå˜é‡ |
| ChatBox | 39k | API Host è®¾ç½® |
| Jan | 26k | è¿œç¨‹æ¨¡åž‹é…ç½® |
| HF Chat-UI | 8k | OPENAI_BASE_URL |
| big-AGI | 7k | è‡ªå®šä¹‰ç«¯ç‚¹ |
| OpenAI Python SDK | â€” | `OpenAI(base_url="http://localhost:8642/v1")` |
| curl | â€” | ç›´æŽ¥ HTTP è¯·æ±‚ |

## ä½¿ç”¨ Profiles çš„å¤šç”¨æˆ·è®¾ç½®

è¦ä¸ºå¤šä¸ªç”¨æˆ·æä¾›å„è‡ªéš”ç¦»çš„ Zed å®žä¾‹ï¼ˆç‹¬ç«‹çš„é…ç½®ã€è®°å¿†ã€æŠ€èƒ½ï¼‰ï¼Œè¯·ä½¿ç”¨ [profiles](/user-guide/profiles)ï¼š

```bash
# ä¸ºæ¯ä¸ªç”¨æˆ·åˆ›å»º profile
zed profile create alice
zed profile create bob

# åœ¨ä¸åŒç«¯å£ä¸Šé…ç½®æ¯ä¸ª profile çš„ API æœåŠ¡å™¨ã€‚API_SERVER_* æ˜¯çŽ¯å¢ƒå˜é‡
# ï¼ˆä¸æ˜¯ config.yaml é”®ï¼‰ï¼Œå› æ­¤å°†å®ƒä»¬å†™å…¥æ¯ä¸ª profile çš„ .envï¼š
cat >> ~/.zed/profiles/alice/.env <<EOF
API_SERVER_ENABLED=true
API_SERVER_PORT=8643
API_SERVER_KEY=alice-secret
EOF

cat >> ~/.zed/profiles/bob/.env <<EOF
API_SERVER_ENABLED=true
API_SERVER_PORT=8644
API_SERVER_KEY=bob-secret
EOF

# å¯åŠ¨æ¯ä¸ª profile çš„ gateway
zed -p alice gateway &
zed -p bob gateway &
```

æ¯ä¸ª profile çš„ API æœåŠ¡å™¨è‡ªåŠ¨å°† profile åç§°ä½œä¸ºæ¨¡åž‹ ID å¹¿æ’­ï¼š

- `http://localhost:8643/v1/models` â†’ æ¨¡åž‹ `alice`
- `http://localhost:8644/v1/models` â†’ æ¨¡åž‹ `bob`

åœ¨ Open WebUI ä¸­ï¼Œå°†æ¯ä¸ªæ·»åŠ ä¸ºå•ç‹¬çš„è¿žæŽ¥ã€‚æ¨¡åž‹ä¸‹æ‹‰åˆ—è¡¨æ˜¾ç¤º `alice` å’Œ `bob` ä½œä¸ºä¸åŒæ¨¡åž‹ï¼Œæ¯ä¸ªå‡ç”±å®Œå…¨éš”ç¦»çš„ Zed å®žä¾‹æ”¯æŒã€‚è¯¦è§ [Open WebUI æŒ‡å—](/user-guide/messaging/open-webui#multi-user-setup-with-profiles)ã€‚

## é™åˆ¶

- **å“åº”å­˜å‚¨** â€” å­˜å‚¨çš„å“åº”ï¼ˆç”¨äºŽ `previous_response_id`ï¼‰æŒä¹…åŒ–åœ¨ SQLite ä¸­ï¼Œgateway é‡å¯åŽä»ç„¶å­˜åœ¨ã€‚æœ€å¤šå­˜å‚¨ 100 ä¸ªå“åº”ï¼ˆLRU æ·˜æ±°ï¼‰ã€‚
- **ä¸æ”¯æŒæ–‡ä»¶ä¸Šä¼ ** â€” ä¸¤ä¸ªç«¯ç‚¹ï¼ˆ`/v1/chat/completions` å’Œ `/v1/responses`ï¼‰å‡æ”¯æŒå†…è”å›¾åƒï¼Œä½†ä¸æ”¯æŒé€šè¿‡ API ä¸Šä¼ æ–‡ä»¶ï¼ˆ`file`ã€`input_file`ã€`file_id`ï¼‰å’Œéžå›¾åƒæ–‡æ¡£è¾“å…¥ã€‚
- **model å­—æ®µä»…ä¸ºå±•ç¤ºç”¨é€”** â€” è¯·æ±‚ä¸­çš„ `model` å­—æ®µä¼šè¢«æŽ¥å—ï¼Œä½†å®žé™…ä½¿ç”¨çš„ LLM æ¨¡åž‹åœ¨æœåŠ¡ç«¯çš„ config.yaml ä¸­é…ç½®ã€‚

## ä»£ç†æ¨¡å¼

API æœåŠ¡å™¨è¿˜ä½œä¸º **gateway ä»£ç†æ¨¡å¼**çš„åŽç«¯ã€‚å½“å¦ä¸€ä¸ª Zed gateway å®žä¾‹é…ç½®äº†æŒ‡å‘æ­¤ API æœåŠ¡å™¨çš„ `GATEWAY_PROXY_URL` æ—¶ï¼Œå®ƒä¼šå°†æ‰€æœ‰æ¶ˆæ¯è½¬å‘åˆ°è¿™é‡Œï¼Œè€Œä¸æ˜¯è¿è¡Œè‡ªå·±çš„ agentã€‚è¿™æ”¯æŒåˆ†ç¦»éƒ¨ç½²â€”â€”ä¾‹å¦‚ï¼Œä¸€ä¸ªå¤„ç† Matrix E2EE çš„ Docker å®¹å™¨å°†è¯·æ±‚ä¸­ç»§åˆ°å®¿ä¸»æœºä¾§çš„ agentã€‚

å®Œæ•´è®¾ç½®æŒ‡å—å‚è§ [Matrix ä»£ç†æ¨¡å¼](/user-guide/messaging/matrix#proxy-mode-e2ee-on-macos)ã€‚
