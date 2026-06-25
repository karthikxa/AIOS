---
sidebar_position: 8
title: "ç¨‹åºåŒ–é›†æˆ"
description: "ä»Žå¤–éƒ¨ç¨‹åºé©±åŠ¨ zed-agent çš„ä¸‰ç§åè®®ï¼šACPã€TUI gateway JSON-RPC ä»¥åŠå…¼å®¹ OpenAI çš„ HTTP API"
---

# ç¨‹åºåŒ–é›†æˆ

Zed æä¾›ä¸‰ç§åè®®ï¼Œä¾›å¤–éƒ¨ç¨‹åºé©±åŠ¨ agentâ€”â€”IDE æ’ä»¶ã€è‡ªå®šä¹‰ UIã€CI æµæ°´çº¿ã€åµŒå…¥å¼å­ agentã€‚æ ¹æ®ä½ çš„ä¼ è¾“æ–¹å¼å’Œæ¶ˆè´¹ç«¯é€‰æ‹©åˆé€‚çš„åè®®ã€‚

| åè®® | ä¼ è¾“æ–¹å¼ | é€‚ç”¨åœºæ™¯ | å®šä¹‰ä½ç½® |
|----------|-----------|----------|------------|
| **ACP** | JSON-RPC over stdio | å·²æ”¯æŒ [Agent Client Protocol](https://github.com/zed-industries/agent-client-protocol) çš„ IDE å®¢æˆ·ç«¯ï¼ˆVS Codeã€Zedã€JetBrainsï¼‰ | `acp_adapter/` |
| **TUI gateway** | JSON-RPC over stdioï¼ˆæˆ– WebSocketï¼‰ | éœ€è¦ç²¾ç»†æŽ§åˆ¶ä¼šè¯ã€slash å‘½ä»¤ã€å®¡æ‰¹åŠæµå¼äº‹ä»¶çš„è‡ªå®šä¹‰å®¿ä¸» | `tui_gateway/server.py` |
| **API server** | HTTP + Server-Sent Events | å…¼å®¹ OpenAI çš„å‰ç«¯ï¼ˆOpen WebUIã€LobeChatã€LibreChatâ€¦â€¦ï¼‰åŠè¯­è¨€æ— å…³çš„ Web å®¢æˆ·ç«¯ | `gateway/platforms/api_server.py` |

ä¸‰ç§åè®®å‡é©±åŠ¨åŒä¸€ä¸ª `AIAgent` æ ¸å¿ƒï¼ŒåŒºåˆ«ä»…åœ¨äºŽçº¿è·¯æ ¼å¼å’Œæ‰€æš´éœ²çš„åŠŸèƒ½é›†ã€‚

---

## ACPï¼ˆAgent Client Protocolï¼‰

`zed acp` å¯åŠ¨ä¸€ä¸ªåŸºäºŽ stdio çš„ JSON-RPC æœåŠ¡å™¨ï¼Œä½¿ç”¨ ACP åè®®ã€‚å·²åœ¨ VS Codeï¼ˆZed Industries çš„ ACP æ‰©å±•ï¼‰ã€Zed ä»¥åŠæ‰€æœ‰å®‰è£…äº† ACP æ’ä»¶çš„ JetBrains IDE ä¸­æŠ•å…¥ç”Ÿäº§ä½¿ç”¨ã€‚

æš´éœ²çš„èƒ½åŠ›ï¼šä¼šè¯åˆ›å»ºã€promptï¼ˆæç¤ºè¯ï¼‰æäº¤ã€æµå¼ agent æ¶ˆæ¯å—ã€å·¥å…·è°ƒç”¨äº‹ä»¶ã€æƒé™è¯·æ±‚ã€ä¼šè¯ forkã€å–æ¶ˆåŠèº«ä»½éªŒè¯ã€‚å·¥å…·è¾“å‡ºä¼šè¢«æ¸²æŸ“ä¸º IDE å¯ç†è§£çš„ ACP `Diff`/`ToolCall` å†…å®¹å—ã€‚

å®Œæ•´ç”Ÿå‘½å‘¨æœŸã€äº‹ä»¶æ¡¥æŽ¥åŠå®¡æ‰¹æµç¨‹ï¼š[ACP å†…éƒ¨æœºåˆ¶](./acp-internals)ã€‚

```bash
zed acp                  # åœ¨ stdio ä¸Šæä¾› ACP æœåŠ¡
zed acp --bootstrap      # æ‰“å°é€‚ç”¨äºŽæ”¯æŒ ACP çš„ IDE çš„å®‰è£…ä»£ç ç‰‡æ®µ
```

---

## TUI Gateway JSON-RPC

`tui_gateway/server.py` æ˜¯ Ink TUIï¼ˆ`zed --tui`ï¼‰å’ŒåµŒå…¥å¼ä»ªè¡¨æ¿ PTY æ¡¥æŽ¥æ‰€ä½¿ç”¨çš„åè®®ã€‚ä»»ä½•å¤–éƒ¨å®¿ä¸»å‡å¯é€šè¿‡ stdioï¼ˆæˆ–ç»ç”± `tui_gateway/ws.py` çš„ WebSocketï¼‰ä½¿ç”¨ç›¸åŒåè®®ã€‚

### æ–¹æ³•ç›®å½•ï¼ˆç²¾é€‰ï¼‰

```
prompt.submit           prompt.background       session.steer
session.create          session.list            session.interrupt
session.history         session.compress        session.branch
session.title           session.usage           session.status
clarify.respond         sudo.respond            secret.respond
approval.respond        config.set / config.get commands.catalog
command.resolve         command.dispatch        cli.exec
reload.mcp              reload.env              process.stop
delegation.status       subagent.interrupt      spawn_tree.save / list / load
terminal.resize         clipboard.paste         image.attach
```

### æµå¼è¿”å›žçš„äº‹ä»¶

`message.delta`ã€`message.complete`ã€`tool.start`ã€`tool.progress`ã€`tool.complete`ã€`approval.request`ã€`clarify.request`ã€`sudo.request`ã€`secret.request`ã€`gateway.ready`ï¼Œä»¥åŠä¼šè¯ç”Ÿå‘½å‘¨æœŸå’Œé”™è¯¯äº‹ä»¶ã€‚

### Pi é£Žæ ¼ RPC æ˜ å°„

Pi-mono RPC è§„èŒƒï¼ˆ[issue #360](https://github.com/NousResearch/zed-agent/issues/360)ï¼‰ä¸­çš„æ¯æ¡å‘½ä»¤å‡æœ‰å¯¹åº”çš„ TUI gateway ç­‰ä»·é¡¹ï¼š

| Pi å‘½ä»¤ | Zed ç­‰ä»·é¡¹ |
|------------|-------------------|
| `prompt` | `prompt.submit`ï¼ˆæˆ– ACP `session/prompt`ï¼‰ |
| `steer` | `session.steer` |
| `follow_up` | åœ¨å½“å‰è½®æ¬¡ç»“æŸåŽæŽ’é˜Ÿçš„ `prompt.submit` |
| `abort` | `session.interrupt` |
| `set_model` | é€šè¿‡ `command.dispatch` æ‰§è¡Œ `/model <provider:model>`ï¼ˆä¼šè¯ä¸­é€”ç”Ÿæ•ˆï¼ŒæŒä¹…åŒ–ï¼‰ |
| `compact` | `session.compress` |
| `get_state` | `session.status` |
| `get_messages` | `session.history` |
| `switch_session` | `session.resume` |
| `fork` | `session.branch` |
| `ui_request` / `ui_response` | `clarify.respond` / `sudo.respond` / `secret.respond` / `approval.respond` |

---

## å…¼å®¹ OpenAI çš„ API Server

`gateway/platforms/api_server.py` é€šè¿‡ HTTP æš´éœ² Zedï¼Œä¾›ä»»ä½•å·²æ”¯æŒ OpenAI æ ¼å¼çš„å®¢æˆ·ç«¯ä½¿ç”¨ã€‚é€‚ç”¨äºŽéœ€è¦ Web å‰ç«¯ã€curl é©±åŠ¨çš„ CI è¿è¡Œå™¨æˆ–éž Python æ¶ˆè´¹ç«¯çš„åœºæ™¯ã€‚

ç«¯ç‚¹ï¼š

```
POST /v1/chat/completions        OpenAI Chat Completionsï¼ˆé€šè¿‡ SSE æµå¼ä¼ è¾“ï¼‰
POST /v1/responses               OpenAI Responses APIï¼ˆæœ‰çŠ¶æ€ï¼‰
POST /v1/runs                    å¯åŠ¨ä¸€æ¬¡è¿è¡Œï¼Œè¿”å›ž run_idï¼ˆ202ï¼‰
GET  /v1/runs/{id}               è¿è¡ŒçŠ¶æ€
GET  /v1/runs/{id}/events        ç”Ÿå‘½å‘¨æœŸäº‹ä»¶çš„ SSE æµ
POST /v1/runs/{id}/approval      è§£å†³å¾…å¤„ç†çš„å®¡æ‰¹
POST /v1/runs/{id}/stop          ä¸­æ–­è¿è¡Œ
GET  /v1/capabilities            æœºå™¨å¯è¯»çš„åŠŸèƒ½æ ‡å¿—
GET  /v1/models                  åˆ—å‡º zed-agent
GET  /health, /health/detailed
```

é…ç½®ã€è¯·æ±‚å¤´ï¼ˆ`X-Zed-Session-Id`ã€`X-Zed-Session-Key`ï¼‰åŠå‰ç«¯æŽ¥å…¥ï¼š[API Server](../user-guide/features/api-server)ã€‚

---

## è¯¥é€‰å“ªä¸ªï¼Ÿ

- **æ­£åœ¨ç¼–å†™ IDE æ’ä»¶ï¼Œä¸” IDE å·²æ”¯æŒ ACP** â†’ é€‰ ACPã€‚IDE ä¾§æ— éœ€ä»»ä½•åè®®å·¥ä½œã€‚
- **æ­£åœ¨ç¼–å†™è‡ªå®šä¹‰æ¡Œé¢ / Web / TUI å®¿ä¸»ï¼Œä¸”éœ€è¦ Zed çš„å…¨éƒ¨åŠŸèƒ½**ï¼ˆslash å‘½ä»¤ã€å®¡æ‰¹ã€clarifyã€å¤š agentã€ä¼šè¯åˆ†æ”¯ï¼‰â†’ é€‰ TUI gateway JSON-RPCã€‚
- **éœ€è¦ä»»æ„å…¼å®¹ OpenAI çš„å‰ç«¯ã€è¯­è¨€æ— å…³çš„ HTTP å®¢æˆ·ç«¯æˆ– curl é©±åŠ¨çš„è‡ªåŠ¨åŒ–** â†’ é€‰ API serverã€‚
- **éœ€è¦åœ¨ Python è¿›ç¨‹å†…åµŒå…¥ï¼Œä¸æƒ³å¯åŠ¨å­è¿›ç¨‹** â†’ ç›´æŽ¥å¯¼å…¥ `run_agent.AIAgent`ã€‚å‚è§ [Agent Loop](./agent-loop)ã€‚

---

## æ¨¡åž‹çƒ­åˆ‡æ¢

ä¼šè¯ä¸­é€”åˆ‡æ¢æ¨¡åž‹åœ¨æ‰€æœ‰æŽ¥å…¥æ–¹å¼ä¸Šå‡å¯ç”¨â€”â€”åº•å±‚å‡ä¸º `/model` slash å‘½ä»¤ã€‚

- **CLI / TUIï¼š** `/model claude-sonnet-4` æˆ– `/model openrouter:anthropic/claude-sonnet-4.6`
- **TUI gateway RPCï¼š** ä½¿ç”¨ `{"command": "/model claude-sonnet-4"}` è°ƒç”¨ `command.dispatch`
- **ACPï¼š** IDE å°† slash å‘½ä»¤ä½œä¸º prompt å‘é€ï¼Œagent è´Ÿè´£åˆ†å‘
- **API serverï¼š** åœ¨è¯·æ±‚ä½“ä¸­åŒ…å« `model` å­—æ®µï¼Œæˆ–è®¾ç½® `X-Zed-Model`

å†…ç½® provider æ„ŸçŸ¥è§£æžï¼ˆç›¸åŒçš„æ¨¡åž‹åç§°ä¼šæ ¹æ®å½“å‰ provider è‡ªåŠ¨é€‰æ‹©æ­£ç¡®æ ¼å¼ï¼‰ã€‚å‚è§ `zed_cli/model_switch.py`ã€‚

---

## å…³äºŽ `--mode rpc` çš„è¯´æ˜Ž

Zed æ²¡æœ‰ `--mode rpc` æ ‡å¿—ã€‚ä¸Šè¿°ä¸‰ç§åè®®å·²è¦†ç›–æ‰€æœ‰ä½¿ç”¨åœºæ™¯â€”â€”ACP ç”¨äºŽ IDE åè®®å®¢æˆ·ç«¯ï¼ŒTUI gateway ç”¨äºŽ stdio JSON-RPC å®¿ä¸»ï¼ŒAPI server ç”¨äºŽ HTTPã€‚å¦‚æžœä½ å‘çŽ°ä¸Šè¿°åè®®å‡æ— æ³•æ»¡è¶³çš„çœŸå®žéœ€æ±‚ï¼Œè¯·æäº¤ issue å¹¶è¯´æ˜Žä½ æ­£åœ¨æž„å»ºçš„å…·ä½“æ¶ˆè´¹ç«¯ã€‚