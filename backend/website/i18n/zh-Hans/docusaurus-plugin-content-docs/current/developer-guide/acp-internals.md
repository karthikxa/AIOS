---
sidebar_position: 2
title: "ACP å†…éƒ¨æœºåˆ¶"
description: "ACP é€‚é…å™¨çš„å·¥ä½œåŽŸç†ï¼šç”Ÿå‘½å‘¨æœŸã€ä¼šè¯ã€äº‹ä»¶æ¡¥æŽ¥ã€å®¡æ‰¹æµç¨‹ä¸Žå·¥å…·æ¸²æŸ“"
---

# ACP å†…éƒ¨æœºåˆ¶

ACP é€‚é…å™¨å°† Zed çš„åŒæ­¥ `AIAgent` å°è£…ä¸ºå¼‚æ­¥ JSON-RPC stdio æœåŠ¡å™¨ã€‚

å…³é”®å®žçŽ°æ–‡ä»¶ï¼š

- `acp_adapter/entry.py`
- `acp_adapter/server.py`
- `acp_adapter/session.py`
- `acp_adapter/events.py`
- `acp_adapter/permissions.py`
- `acp_adapter/tools.py`
- `acp_adapter/auth.py`
- `acp_registry/agent.json`

## å¯åŠ¨æµç¨‹

```text
zed acp / zed-acp / python -m acp_adapter
  -> acp_adapter.entry.main()
  -> parse --version / --check / --setup before server startup
  -> load ~/.zed/.env
  -> configure stderr logging
  -> construct ZedACPAgent
  -> acp.run_agent(agent, use_unstable_protocol=True)
```

Zed ACP Registry è·¯å¾„é€šè¿‡ `uvx --from 'zed-agent[acp]==<version>' zed-acp` å¯åŠ¨åŒä¸€é€‚é…å™¨ï¼ŒæŒ‡å‘ `zed-agent` PyPI å‘å¸ƒåŒ…ã€‚

stdout ä¿ç•™ç”¨äºŽ ACP JSON-RPC ä¼ è¾“ã€‚äººç±»å¯è¯»çš„æ—¥å¿—è¾“å‡ºè‡³ stderrã€‚

## ä¸»è¦ç»„ä»¶

### `ZedACPAgent`

`acp_adapter/server.py` å®žçŽ° ACP agent åè®®ã€‚

èŒè´£ï¼š

- åˆå§‹åŒ– / è®¤è¯
- æ–°å»º/åŠ è½½/æ¢å¤/fork/åˆ—å‡º/å–æ¶ˆä¼šè¯æ–¹æ³•
- promptï¼ˆæç¤ºè¯ï¼‰æ‰§è¡Œ
- ä¼šè¯æ¨¡åž‹åˆ‡æ¢
- å°†åŒæ­¥ AIAgent å›žè°ƒæŽ¥å…¥ ACP å¼‚æ­¥é€šçŸ¥

### `SessionManager`

`acp_adapter/session.py` è·Ÿè¸ªæ´»è·ƒçš„ ACP ä¼šè¯ã€‚

æ¯ä¸ªä¼šè¯å­˜å‚¨ï¼š

- `session_id`
- `agent`
- `cwd`
- `model`
- `history`
- `cancel_event`

ç®¡ç†å™¨çº¿ç¨‹å®‰å…¨ï¼Œæ”¯æŒï¼š

- create
- get
- remove
- fork
- list
- cleanup
- cwd æ›´æ–°

### äº‹ä»¶æ¡¥æŽ¥

`acp_adapter/events.py` å°† AIAgent å›žè°ƒè½¬æ¢ä¸º ACP `session_update` äº‹ä»¶ã€‚

å·²æ¡¥æŽ¥çš„å›žè°ƒï¼š

- `tool_progress_callback`
- `thinking_callback`ï¼ˆå½“å‰åœ¨ ACP æ¡¥æŽ¥ä¸­è®¾ç½®ä¸º `None`â€”â€”æŽ¨ç†å†…å®¹é€šè¿‡ `step_callback` è½¬å‘ï¼‰
- `step_callback`

ç”±äºŽ `AIAgent` åœ¨å·¥ä½œçº¿ç¨‹ä¸­è¿è¡Œï¼Œè€Œ ACP I/O ä½äºŽä¸»äº‹ä»¶å¾ªçŽ¯ï¼Œæ¡¥æŽ¥ä½¿ç”¨ï¼š

```python
asyncio.run_coroutine_threadsafe(...)
```

### æƒé™æ¡¥æŽ¥

`acp_adapter/permissions.py` å°†å±é™©ç»ˆç«¯å®¡æ‰¹ prompt é€‚é…ä¸º ACP æƒé™è¯·æ±‚ã€‚

æ˜ å°„å…³ç³»ï¼š

- `allow_once` -> Zed `once`
- `allow_always` -> Zed `always`
- æ‹’ç»é€‰é¡¹ -> Zed `deny`

è¶…æ—¶å’Œæ¡¥æŽ¥å¤±è´¥é»˜è®¤æ‹’ç»ã€‚

### å·¥å…·æ¸²æŸ“è¾…åŠ©

`acp_adapter/tools.py` å°† Zed å·¥å…·æ˜ å°„åˆ° ACP å·¥å…·ç±»åž‹ï¼Œå¹¶æž„å»ºé¢å‘ç¼–è¾‘å™¨çš„å†…å®¹ã€‚

ç¤ºä¾‹ï¼š

- `patch` / `write_file` -> æ–‡ä»¶ diff
- `terminal` -> shell å‘½ä»¤æ–‡æœ¬
- `read_file` / `search_files` -> æ–‡æœ¬é¢„è§ˆ
- å¤§åž‹ç»“æžœ -> æˆªæ–­æ–‡æœ¬å—ï¼ˆä¿éšœ UI å®‰å…¨ï¼‰

## ä¼šè¯ç”Ÿå‘½å‘¨æœŸ

```text
new_session(cwd)
  -> create SessionState
  -> create AIAgent(platform="acp", enabled_toolsets=["zed-acp"])
  -> bind task_id/session_id to cwd override

prompt(..., session_id)
  -> extract text from ACP content blocks
  -> reset cancel event
  -> install callbacks + approval bridge
  -> run AIAgent in ThreadPoolExecutor
  -> update session history
  -> emit final agent message chunk
```

### å–æ¶ˆ

`cancel(session_id)`ï¼š

- è®¾ç½®ä¼šè¯å–æ¶ˆäº‹ä»¶
- åœ¨å¯ç”¨æ—¶è°ƒç”¨ `agent.interrupt()`
- ä½¿ prompt å“åº”è¿”å›ž `stop_reason="cancelled"`

### Fork

`fork_session()` å°†æ¶ˆæ¯åŽ†å²æ·±æ‹·è´è‡³æ–°çš„æ´»è·ƒä¼šè¯ï¼Œåœ¨ä¿ç•™å¯¹è¯çŠ¶æ€çš„åŒæ—¶ä¸º fork åˆ†é…ç‹¬ç«‹çš„ session ID å’Œ cwdã€‚

## Provider/è®¤è¯è¡Œä¸º

ACP ä¸å®žçŽ°è‡ªå·±çš„è®¤è¯å­˜å‚¨ã€‚

è€Œæ˜¯å¤ç”¨ Zed çš„è¿è¡Œæ—¶è§£æžå™¨ï¼š

- `acp_adapter/auth.py`
- `zed_cli/runtime_provider.py`

å› æ­¤ ACP é€šå‘Šå¹¶ä½¿ç”¨å½“å‰é…ç½®çš„ Zed provider/å‡­æ®ã€‚å®ƒè¿˜å§‹ç»ˆé€šå‘Šä¸€ä¸ªç»ˆç«¯ setup è®¤è¯æ–¹æ³•ï¼ˆ`zed-setup`ï¼Œå‚æ•° `--setup`ï¼‰ï¼Œä»¥ä¾¿é¦–æ¬¡è¿è¡Œçš„ registry å®¢æˆ·ç«¯åœ¨å¯åŠ¨æ­£å¸¸ ACP ä¼šè¯å‰å¯ä»¥æ‰“å¼€ Zed çš„äº¤äº’å¼æ¨¡åž‹/provider é…ç½®ã€‚

## å·¥ä½œç›®å½•ç»‘å®š

ACP ä¼šè¯æºå¸¦ç¼–è¾‘å™¨ cwdã€‚

ä¼šè¯ç®¡ç†å™¨é€šè¿‡ä»»åŠ¡ä½œç”¨åŸŸçš„ç»ˆç«¯/æ–‡ä»¶è¦†ç›–å°†è¯¥ cwd ç»‘å®šåˆ° ACP session IDï¼Œä½¿æ–‡ä»¶å’Œç»ˆç«¯å·¥å…·ç›¸å¯¹äºŽç¼–è¾‘å™¨å·¥ä½œåŒºè¿è¡Œã€‚

## é‡å¤åŒåå·¥å…·è°ƒç”¨

äº‹ä»¶æ¡¥æŽ¥æŒ‰å·¥å…·åç§°ä»¥ FIFO é˜Ÿåˆ—è·Ÿè¸ªå·¥å…· IDï¼Œè€Œéžæ¯ä¸ªåç§°ä»…ä¿ç•™ä¸€ä¸ª IDã€‚è¿™å¯¹ä»¥ä¸‹åœºæ™¯è‡³å…³é‡è¦ï¼š

- å¹¶è¡ŒåŒåè°ƒç”¨
- å•æ­¥å†…é‡å¤åŒåè°ƒç”¨

è‹¥ä¸ä½¿ç”¨ FIFO é˜Ÿåˆ—ï¼Œå®Œæˆäº‹ä»¶å°†é™„åŠ åˆ°é”™è¯¯çš„å·¥å…·è°ƒç”¨ä¸Šã€‚

## å®¡æ‰¹å›žè°ƒæ¢å¤

ACP åœ¨ prompt æ‰§è¡ŒæœŸé—´ä¸´æ—¶åœ¨ç»ˆç«¯å·¥å…·ä¸Šå®‰è£…å®¡æ‰¹å›žè°ƒï¼Œæ‰§è¡Œå®ŒæˆåŽæ¢å¤ä¹‹å‰çš„å›žè°ƒã€‚è¿™é¿å…äº†å°† ACP ä¼šè¯ç‰¹å®šçš„å®¡æ‰¹å¤„ç†å™¨æ°¸ä¹…å…¨å±€å®‰è£…ã€‚

## å½“å‰é™åˆ¶

- ACP ä¼šè¯æŒä¹…åŒ–è‡³å…±äº«çš„ `~/.zed/state.db`ï¼ˆSessionDBï¼‰ï¼Œåœ¨è¿›ç¨‹é‡å¯åŽé€æ˜Žæ¢å¤ï¼›å®ƒä»¬ä¼šå‡ºçŽ°åœ¨ `session_search` ä¸­
- éžæ–‡æœ¬ prompt å—åœ¨è¯·æ±‚æ–‡æœ¬æå–æ—¶å½“å‰è¢«å¿½ç•¥
- ç¼–è¾‘å™¨ç‰¹å®šçš„ UX å›  ACP å®¢æˆ·ç«¯å®žçŽ°è€Œå¼‚

## ç›¸å…³æ–‡ä»¶

- `tests/acp/` â€” ACP æµ‹è¯•å¥—ä»¶
- `toolsets.py` â€” `zed-acp` toolset å®šä¹‰
- `zed_cli/main.py` â€” `zed acp` CLI å­å‘½ä»¤
- `pyproject.toml` â€” `[acp]` å¯é€‰ä¾èµ– + `zed-acp` è„šæœ¬
