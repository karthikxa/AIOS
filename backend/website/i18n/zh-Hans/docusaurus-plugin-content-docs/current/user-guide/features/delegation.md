---
sidebar_position: 7
title: "å­æ™ºèƒ½ä½“å§”æ´¾"
description: "ä½¿ç”¨ delegate_task ä¸ºå¹¶è¡Œå·¥ä½œæµç”Ÿæˆéš”ç¦»çš„å­æ™ºèƒ½ä½“"
---

# å­æ™ºèƒ½ä½“å§”æ´¾

`delegate_task` å·¥å…·ä¼šç”Ÿæˆå…·æœ‰éš”ç¦»ä¸Šä¸‹æ–‡ã€å—é™å·¥å…·é›†å’Œç‹¬ç«‹ç»ˆç«¯ä¼šè¯çš„å­ AIAgent å®žä¾‹ã€‚æ¯ä¸ªå­æ™ºèƒ½ä½“èŽ·å¾—å…¨æ–°çš„å¯¹è¯å¹¶ç‹¬ç«‹è¿è¡Œâ€”â€”åªæœ‰å…¶æœ€ç»ˆæ‘˜è¦ä¼šè¿›å…¥çˆ¶æ™ºèƒ½ä½“çš„ä¸Šä¸‹æ–‡ã€‚

## å•ä»»åŠ¡

```python
delegate_task(
    goal="Debug why tests fail",
    context="Error: assertion in test_foo.py line 42",
    toolsets=["terminal", "file"]
)
```

## å¹¶è¡Œæ‰¹å¤„ç†

é»˜è®¤æœ€å¤š 3 ä¸ªå¹¶å‘å­æ™ºèƒ½ä½“ï¼ˆå¯é…ç½®ï¼Œæ— ç¡¬æ€§ä¸Šé™ï¼‰ï¼š

```python
delegate_task(tasks=[
    {"goal": "Research topic A", "toolsets": ["web"]},
    {"goal": "Research topic B", "toolsets": ["web"]},
    {"goal": "Fix the build", "toolsets": ["terminal", "file"]}
])
```

## å­æ™ºèƒ½ä½“ä¸Šä¸‹æ–‡çš„å·¥ä½œæ–¹å¼

:::warning å…³é”®ï¼šå­æ™ºèƒ½ä½“ä¸€æ— æ‰€çŸ¥
å­æ™ºèƒ½ä½“ä»¥**å…¨æ–°å¯¹è¯**å¯åŠ¨ã€‚å®ƒä»¬å¯¹çˆ¶æ™ºèƒ½ä½“çš„å¯¹è¯åŽ†å²ã€ä¹‹å‰çš„å·¥å…·è°ƒç”¨æˆ–å§”æ´¾å‰è®¨è®ºçš„ä»»ä½•å†…å®¹ä¸€æ— æ‰€çŸ¥ã€‚å­æ™ºèƒ½ä½“çš„å”¯ä¸€ä¸Šä¸‹æ–‡æ¥è‡ªçˆ¶æ™ºèƒ½ä½“è°ƒç”¨ `delegate_task` æ—¶å¡«å†™çš„ `goal` å’Œ `context` å­—æ®µã€‚
:::

è¿™æ„å‘³ç€çˆ¶æ™ºèƒ½ä½“å¿…é¡»åœ¨è°ƒç”¨ä¸­ä¼ é€’å­æ™ºèƒ½ä½“æ‰€éœ€çš„**ä¸€åˆ‡**ä¿¡æ¯ï¼š

```python
# BAD - subagent has no idea what "the error" is
delegate_task(goal="Fix the error")

# GOOD - subagent has all context it needs
delegate_task(
    goal="Fix the TypeError in api/handlers.py",
    context="""The file api/handlers.py has a TypeError on line 47:
    'NoneType' object has no attribute 'get'.
    The function process_request() receives a dict from parse_body(),
    but parse_body() returns None when Content-Type is missing.
    The project is at /home/user/myproject and uses Python 3.11."""
)
```

å­æ™ºèƒ½ä½“ä¼šæ”¶åˆ°ä¸€ä¸ªåŸºäºŽä½ çš„ goal å’Œ context æž„å»ºçš„ä¸“æ³¨ç³»ç»Ÿ promptï¼ˆæç¤ºè¯ï¼‰ï¼ŒæŒ‡ç¤ºå…¶å®Œæˆä»»åŠ¡å¹¶æä¾›ç»“æž„åŒ–æ‘˜è¦ï¼ŒåŒ…æ‹¬æ‰€åšçš„äº‹æƒ…ã€å‘çŽ°çš„å†…å®¹ã€ä¿®æ”¹çš„æ–‡ä»¶ä»¥åŠé‡åˆ°çš„é—®é¢˜ã€‚

## å®žé™…ç¤ºä¾‹

### å¹¶è¡Œç ”ç©¶

åŒæ—¶ç ”ç©¶å¤šä¸ªä¸»é¢˜å¹¶æ”¶é›†æ‘˜è¦ï¼š

```python
delegate_task(tasks=[
    {
        "goal": "Research the current state of WebAssembly in 2025",
        "context": "Focus on: browser support, non-browser runtimes, language support",
        "toolsets": ["web"]
    },
    {
        "goal": "Research the current state of RISC-V adoption in 2025",
        "context": "Focus on: server chips, embedded systems, software ecosystem",
        "toolsets": ["web"]
    },
    {
        "goal": "Research quantum computing progress in 2025",
        "context": "Focus on: error correction breakthroughs, practical applications, key players",
        "toolsets": ["web"]
    }
])
```

### ä»£ç å®¡æŸ¥ + ä¿®å¤

å°†å®¡æŸ¥å¹¶ä¿®å¤çš„å·¥ä½œæµå§”æ´¾ç»™å…¨æ–°ä¸Šä¸‹æ–‡ï¼š

```python
delegate_task(
    goal="Review the authentication module for security issues and fix any found",
    context="""Project at /home/user/webapp.
    Auth module files: src/auth/login.py, src/auth/jwt.py, src/auth/middleware.py.
    The project uses Flask, PyJWT, and bcrypt.
    Focus on: SQL injection, JWT validation, password handling, session management.
    Fix any issues found and run the test suite (pytest tests/auth/).""",
    toolsets=["terminal", "file"]
)
```

### å¤šæ–‡ä»¶é‡æž„

å°†ä¼šå¤§é‡å ç”¨çˆ¶æ™ºèƒ½ä½“ä¸Šä¸‹æ–‡çš„å¤§åž‹é‡æž„ä»»åŠ¡å§”æ´¾å‡ºåŽ»ï¼š

```python
delegate_task(
    goal="Refactor all Python files in src/ to replace print() with proper logging",
    context="""Project at /home/user/myproject.
    Use the 'logging' module with logger = logging.getLogger(__name__).
    Replace print() calls with appropriate log levels:
    - print(f"Error: ...") -> logger.error(...)
    - print(f"Warning: ...") -> logger.warning(...)
    - print(f"Debug: ...") -> logger.debug(...)
    - Other prints -> logger.info(...)
    Don't change print() in test files or CLI output.
    Run pytest after to verify nothing broke.""",
    toolsets=["terminal", "file"]
)
```

## æ‰¹å¤„ç†æ¨¡å¼è¯¦æƒ…

å½“ä½ æä¾› `tasks` æ•°ç»„æ—¶ï¼Œå­æ™ºèƒ½ä½“ä¼šä½¿ç”¨çº¿ç¨‹æ± **å¹¶è¡Œ**è¿è¡Œï¼š

- **æœ€å¤§å¹¶å‘æ•°ï¼š** é»˜è®¤ 3 ä¸ªä»»åŠ¡ï¼ˆå¯é€šè¿‡ `delegation.max_concurrent_children` æˆ–çŽ¯å¢ƒå˜é‡ `DELEGATION_MAX_CONCURRENT_CHILDREN` é…ç½®ï¼›æœ€ä½Žä¸º 1ï¼Œæ— ç¡¬æ€§ä¸Šé™ï¼‰ã€‚è¶…å‡ºé™åˆ¶çš„æ‰¹æ¬¡ä¼šè¿”å›žå·¥å…·é”™è¯¯ï¼Œè€Œä¸æ˜¯è¢«é™é»˜æˆªæ–­ã€‚
- **çº¿ç¨‹æ± ï¼š** ä½¿ç”¨ `ThreadPoolExecutor`ï¼Œä»¥é…ç½®çš„å¹¶å‘é™åˆ¶ä½œä¸ºæœ€å¤§å·¥ä½œçº¿ç¨‹æ•°
- **è¿›åº¦æ˜¾ç¤ºï¼š** åœ¨ CLI æ¨¡å¼ä¸‹ï¼Œæ ‘å½¢è§†å›¾ä¼šå®žæ—¶æ˜¾ç¤ºæ¯ä¸ªå­æ™ºèƒ½ä½“çš„å·¥å…·è°ƒç”¨ï¼Œå¹¶é™„å¸¦æ¯ä¸ªä»»åŠ¡çš„å®Œæˆè¡Œã€‚åœ¨ gateway æ¨¡å¼ä¸‹ï¼Œè¿›åº¦ä¼šè¢«æ‰¹é‡æ±‡æ€»å¹¶è½¬å‘ç»™çˆ¶æ™ºèƒ½ä½“çš„è¿›åº¦å›žè°ƒ
- **ç»“æžœæŽ’åºï¼š** ç»“æžœæŒ‰ä»»åŠ¡ç´¢å¼•æŽ’åºï¼Œä¸Žè¾“å…¥é¡ºåºä¸€è‡´ï¼Œä¸å—å®Œæˆé¡ºåºå½±å“
- **ä¸­æ–­ä¼ æ’­ï¼š** ä¸­æ–­çˆ¶æ™ºèƒ½ä½“ï¼ˆä¾‹å¦‚å‘é€æ–°æ¶ˆæ¯ï¼‰ä¼šä¸­æ–­æ‰€æœ‰æ´»è·ƒçš„å­æ™ºèƒ½ä½“

å•ä»»åŠ¡å§”æ´¾ç›´æŽ¥è¿è¡Œï¼Œæ— çº¿ç¨‹æ± å¼€é”€ã€‚

## æ¨¡åž‹è¦†ç›–

ä½ å¯ä»¥é€šè¿‡ `config.yaml` ä¸ºå­æ™ºèƒ½ä½“é…ç½®ä¸åŒçš„æ¨¡åž‹â€”â€”é€‚ç”¨äºŽå°†ç®€å•ä»»åŠ¡å§”æ´¾ç»™æ›´ä¾¿å®œ/æ›´å¿«çš„æ¨¡åž‹ï¼š

```yaml
# In ~/.zed/config.yaml
delegation:
  model: "google/gemini-flash-2.0"    # Cheaper model for subagents
  provider: "openrouter"              # Optional: route subagents to a different provider
```

å¦‚æžœçœç•¥ï¼Œå­æ™ºèƒ½ä½“å°†ä½¿ç”¨ä¸Žçˆ¶æ™ºèƒ½ä½“ç›¸åŒçš„æ¨¡åž‹ã€‚

## å·¥å…·é›†é€‰æ‹©å»ºè®®

`toolsets` å‚æ•°æŽ§åˆ¶å­æ™ºèƒ½ä½“å¯ä»¥è®¿é—®çš„å·¥å…·ã€‚æ ¹æ®ä»»åŠ¡é€‰æ‹©ï¼š

| å·¥å…·é›†æ¨¡å¼ | ä½¿ç”¨åœºæ™¯ |
|----------------|----------|
| `["terminal", "file"]` | ä»£ç å·¥ä½œã€è°ƒè¯•ã€æ–‡ä»¶ç¼–è¾‘ã€æž„å»º |
| `["web"]` | ç ”ç©¶ã€äº‹å®žæ ¸æŸ¥ã€æ–‡æ¡£æŸ¥é˜… |
| `["terminal", "file", "web"]` | å…¨æ ˆä»»åŠ¡ï¼ˆé»˜è®¤ï¼‰ |
| `["file"]` | åªè¯»åˆ†æžã€æ— éœ€æ‰§è¡Œçš„ä»£ç å®¡æŸ¥ |
| `["terminal"]` | ç³»ç»Ÿç®¡ç†ã€è¿›ç¨‹ç®¡ç† |

æ— è®ºä½ æŒ‡å®šä»€ä¹ˆï¼ŒæŸäº›å·¥å…·é›†å¯¹å­æ™ºèƒ½ä½“å§‹ç»ˆè¢«å±è”½ï¼š
- `delegation` â€” å¯¹å¶å­å­æ™ºèƒ½ä½“å±è”½ï¼ˆé»˜è®¤ï¼‰ã€‚`role="orchestrator"` çš„å­æ™ºèƒ½ä½“å¯ä¿ç•™ï¼Œå— `max_spawn_depth` çº¦æŸâ€”â€”å‚è§ä¸‹æ–¹[æ·±åº¦é™åˆ¶ä¸ŽåµŒå¥—ç¼–æŽ’](#depth-limit-and-nested-orchestration)ã€‚
- `clarify` â€” å­æ™ºèƒ½ä½“æ— æ³•ä¸Žç”¨æˆ·äº¤äº’
- `memory` â€” ä¸å¯å†™å…¥å…±äº«æŒä¹…å†…å­˜
- `code_execution` â€” å­æ™ºèƒ½ä½“åº”é€æ­¥æŽ¨ç†
- `send_message` â€” æ— è·¨å¹³å°å‰¯ä½œç”¨ï¼ˆä¾‹å¦‚å‘é€ Telegram æ¶ˆæ¯ï¼‰

## æœ€å¤§è¿­ä»£æ¬¡æ•°

æ¯ä¸ªå­æ™ºèƒ½ä½“éƒ½æœ‰è¿­ä»£æ¬¡æ•°é™åˆ¶ï¼ˆé»˜è®¤ï¼š50ï¼‰ï¼ŒæŽ§åˆ¶å…¶å¯è¿›è¡Œçš„å·¥å…·è°ƒç”¨è½®æ¬¡ï¼š

```python
delegate_task(
    goal="Quick file check",
    context="Check if /etc/nginx/nginx.conf exists and print its first 10 lines",
    max_iterations=10  # Simple task, don't need many turns
)
```

## å­æ™ºèƒ½ä½“è¶…æ—¶

é»˜è®¤æƒ…å†µä¸‹ï¼Œå­æ™ºèƒ½ä½“**æ²¡æœ‰æŒ‚é’Ÿè¶…æ—¶é™åˆ¶**ã€‚å­æ™ºèƒ½ä½“åªä¼šå› å…¶å®žé™…æ‰§è¡Œçš„æ“ä½œè€Œå¤±è´¥â€”â€”API é”™è¯¯ã€å·¥å…·é”™è¯¯æˆ–è¾¾åˆ°è¿­ä»£é¢„ç®—ä¸Šé™â€”â€”è€Œä¸ä¼šè¢«å§”æ´¾å±‚é¢çš„è®¡æ—¶å™¨ç»ˆæ­¢ã€‚æ—©æœŸç‰ˆæœ¬æ›¾è®¾æœ‰ç¡¬æ€§ä¸Šé™ï¼ˆ300 ç§’ï¼ŒåŽä¸º 600 ç§’ï¼‰ï¼Œä½†è¿™ä¼šåœ¨ä»»åŠ¡æ‰§è¡Œè¿‡ç¨‹ä¸­è¯¯æ€æ­£å¸¸å·¥ä½œçš„å­æ™ºèƒ½ä½“ï¼šæ·±åº¦ä»£ç å®¡æŸ¥ã€å¤§è§„æ¨¡ç ”ç©¶åˆ†å‘ä»¥åŠæ…¢é€ŸæŽ¨ç†æ¨¡åž‹ç»å¸¸éœ€è¦è¶…è¿‡ 10 åˆ†é’Ÿï¼Œè€Œå®ƒä»¬å…¨ç¨‹éƒ½åœ¨ç¨³å®šæŽ¨è¿›ã€‚

çœŸæ­£å¡æ­»çš„å­æ™ºèƒ½ä½“ä»ä¼šè¢«æ£€æµ‹åˆ°ï¼šå½“å­æ™ºèƒ½ä½“æ²¡æœ‰ä»»ä½•è¿›å±•ï¼ˆæ—  API è°ƒç”¨ã€æ— å·¥å…·å¯åŠ¨ï¼‰æ—¶ï¼Œå¿ƒè·³é™ˆæ—§åº¦ç›‘æŽ§ä¼šåœæ­¢åˆ·æ–°çˆ¶æ™ºèƒ½ä½“çš„æ´»åŠ¨çŠ¶æ€ï¼Œä»Žè€Œè®©ç½‘å…³çš„ä¸æ´»åŠ¨è¶…æ—¶æœºåˆ¶å¯¹çœŸæ­£å¡æ­»çš„å·¥ä½œè¿›ç¨‹ç”Ÿæ•ˆã€‚

å¦‚æžœä»éœ€è¦ç¡¬æ€§ä¸Šé™ï¼ˆä¾‹å¦‚å¯¹æ— äººå€¼å®ˆçš„ cron é©±åŠ¨å§”æ´¾è¿›è¡Œæˆæœ¬æŽ§åˆ¶ï¼‰ï¼Œå¯æŒ‰å®‰è£…å®žä¾‹é€‰æ‹©å¯ç”¨ï¼š

```yaml
delegation:
  child_timeout_seconds: 0     # é»˜è®¤ï¼š0 = æ— è¶…æ—¶
  # child_timeout_seconds: 1800  # é€‰æ‹©å¯ç”¨çš„ç¡¬æ€§ä¸Šé™ï¼ˆä¸‹é™ 30 ç§’ï¼‰
```

æ­£å€¼ä¼šå¯¹æ¯ä¸ªå­æ™ºèƒ½ä½“å¼ºåˆ¶æ‰§è¡ŒæŒ‚é’Ÿæ—¶é—´ç¡¬é™åˆ¶ï¼›`0` æˆ–è´Ÿå€¼è¡¨ç¤ºç¦ç”¨ã€‚

:::tip é›¶è°ƒç”¨è¶…æ—¶æ—¶çš„è¯Šæ–­è½¬å‚¨
åœ¨é…ç½®äº†ç¡¬æ€§ä¸Šé™çš„æƒ…å†µä¸‹ï¼Œå¦‚æžœå­æ™ºèƒ½ä½“åœ¨**é›¶æ¬¡** API è°ƒç”¨çš„æƒ…å†µä¸‹è¶…æ—¶ï¼ˆé€šå¸¸åŽŸå› ï¼šprovider ä¸å¯è¾¾ã€è®¤è¯å¤±è´¥æˆ–å·¥å…· schema è¢«æ‹’ç»ï¼‰ï¼Œ`delegate_task` ä¼šå°†ç»“æž„åŒ–è¯Šæ–­ä¿¡æ¯å†™å…¥ `~/.zed/logs/subagent-timeout-<session>-<timestamp>.log`ï¼Œå…¶ä¸­åŒ…å«å­æ™ºèƒ½ä½“çš„é…ç½®å¿«ç…§ã€å‡­æ®è§£æžè¿½è¸ªä»¥åŠæ—©æœŸé”™è¯¯æ¶ˆæ¯ã€‚æ¯”ä¹‹å‰çš„é™é»˜è¶…æ—¶è¡Œä¸ºæ›´æ˜“äºŽå®šä½æ ¹å› ã€‚
:::

## ç›‘æŽ§è¿è¡Œä¸­çš„å­æ™ºèƒ½ä½“ï¼ˆ`/agents`ï¼‰

TUI æä¾› `/agents` æµ®å±‚ï¼ˆåˆ«å `/tasks`ï¼‰ï¼Œå°†é€’å½’ `delegate_task` æ‰‡å‡ºè½¬åŒ–ä¸ºä¸€çº§å®¡è®¡ç•Œé¢ï¼š

- è¿è¡Œä¸­å’Œæœ€è¿‘å®Œæˆçš„å­æ™ºèƒ½ä½“çš„å®žæ—¶æ ‘å½¢è§†å›¾ï¼ŒæŒ‰çˆ¶æ™ºèƒ½ä½“åˆ†ç»„
- æ¯ä¸ªåˆ†æ”¯çš„è´¹ç”¨ã€token å’Œå·²è§¦åŠæ–‡ä»¶çš„æ±‡æ€»
- ç»ˆæ­¢å’Œæš‚åœæŽ§åˆ¶â€”â€”å¯åœ¨ä¸ä¸­æ–­å…¶å…„å¼Ÿæ™ºèƒ½ä½“çš„æƒ…å†µä¸‹å–æ¶ˆç‰¹å®šå­æ™ºèƒ½ä½“
- äº‹åŽå›žé¡¾ï¼šå³ä½¿å­æ™ºèƒ½ä½“å·²è¿”å›žçˆ¶æ™ºèƒ½ä½“ï¼Œä¹Ÿå¯é€è½®æŸ¥çœ‹å…¶åŽ†å²è®°å½•

ç»å…¸ CLI ä»…å°† `/agents` æ‰“å°ä¸ºæ–‡æœ¬æ‘˜è¦ï¼›TUI æ‰æ˜¯æµ®å±‚çœŸæ­£å‘æŒ¥ä½œç”¨çš„åœ°æ–¹ã€‚å‚è§ [TUI â€” æ–œæ å‘½ä»¤](/user-guide/tui#slash-commands)ã€‚

## æ·±åº¦é™åˆ¶ä¸ŽåµŒå¥—ç¼–æŽ’ {#depth-limit-and-nested-orchestration}

é»˜è®¤æƒ…å†µä¸‹ï¼Œå§”æ´¾æ˜¯**æ‰å¹³çš„**ï¼šçˆ¶æ™ºèƒ½ä½“ï¼ˆæ·±åº¦ 0ï¼‰ç”Ÿæˆå­æ™ºèƒ½ä½“ï¼ˆæ·±åº¦ 1ï¼‰ï¼Œè€Œè¿™äº›å­æ™ºèƒ½ä½“æ— æ³•è¿›ä¸€æ­¥å§”æ´¾ã€‚è¿™å¯é˜²æ­¢å¤±æŽ§çš„é€’å½’å§”æ´¾ã€‚

å¯¹äºŽå¤šé˜¶æ®µå·¥ä½œæµï¼ˆç ”ç©¶ â†’ ç»¼åˆï¼Œæˆ–å¯¹å­é—®é¢˜è¿›è¡Œå¹¶è¡Œç¼–æŽ’ï¼‰ï¼Œçˆ¶æ™ºèƒ½ä½“å¯ä»¥ç”Ÿæˆ**ç¼–æŽ’è€…**å­æ™ºèƒ½ä½“ï¼Œè¿™äº›å­æ™ºèƒ½ä½“*å¯ä»¥*å§”æ´¾è‡ªå·±çš„å·¥ä½œçº¿ç¨‹ï¼š

```python
delegate_task(
    goal="Survey three code review approaches and recommend one",
    role="orchestrator",  # Allows this child to spawn its own workers
    context="...",
)
```

- `role="leaf"`ï¼ˆé»˜è®¤ï¼‰ï¼šå­æ™ºèƒ½ä½“æ— æ³•è¿›ä¸€æ­¥å§”æ´¾â€”â€”ä¸Žæ‰å¹³å§”æ´¾è¡Œä¸ºç›¸åŒã€‚
- `role="orchestrator"`ï¼šå­æ™ºèƒ½ä½“ä¿ç•™ `delegation` å·¥å…·é›†ã€‚å— `delegation.max_spawn_depth` çº¦æŸï¼ˆé»˜è®¤ **1** = æ‰å¹³ï¼Œå› æ­¤åœ¨é»˜è®¤è®¾ç½®ä¸‹ `role="orchestrator"` æ— æ•ˆï¼‰ã€‚å°† `max_spawn_depth` æé«˜åˆ° 2 å¯å…è®¸ç¼–æŽ’è€…å­æ™ºèƒ½ä½“ç”Ÿæˆå¶å­å­™æ™ºèƒ½ä½“ï¼›è®¾ä¸º 3 åˆ™å…è®¸ä¸‰å±‚ï¼ˆä¸Šé™ï¼‰ã€‚
- `delegation.orchestrator_enabled: false`ï¼šå…¨å±€å¼€å…³ï¼Œæ— è®º `role` å‚æ•°å¦‚ä½•ï¼Œå¼ºåˆ¶æ‰€æœ‰å­æ™ºèƒ½ä½“ä¸º `leaf`ã€‚

**è´¹ç”¨è­¦å‘Šï¼š** åœ¨ `max_spawn_depth: 3` å’Œ `max_concurrent_children: 3` çš„æƒ…å†µä¸‹ï¼Œæ ‘å¯è¾¾åˆ° 3Ã—3Ã—3 = 27 ä¸ªå¹¶å‘å¶å­æ™ºèƒ½ä½“ã€‚æ¯å¢žåŠ ä¸€å±‚éƒ½ä¼šæˆå€å¢žåŠ å¼€é”€â€”â€”è¯·è°¨æ…Žæé«˜ `max_spawn_depth`ã€‚

## ç”Ÿå‘½å‘¨æœŸä¸ŽæŒä¹…æ€§

:::warning delegate_task æ˜¯åŒæ­¥çš„â€”â€”ä¸å…·å¤‡æŒä¹…æ€§
`delegate_task` åœ¨**çˆ¶æ™ºèƒ½ä½“çš„å½“å‰è½®æ¬¡å†…**è¿è¡Œã€‚å®ƒä¼šé˜»å¡žçˆ¶æ™ºèƒ½ä½“ï¼Œç›´åˆ°æ‰€æœ‰å­æ™ºèƒ½ä½“å®Œæˆï¼ˆæˆ–è¢«å–æ¶ˆï¼‰ã€‚å®ƒ**ä¸æ˜¯**åŽå°ä»»åŠ¡é˜Ÿåˆ—ï¼š

- å¦‚æžœçˆ¶æ™ºèƒ½ä½“è¢«ä¸­æ–­ï¼ˆç”¨æˆ·å‘é€æ–°æ¶ˆæ¯ã€`/stop`ã€`/new`ï¼‰ï¼Œæ‰€æœ‰æ´»è·ƒçš„å­æ™ºèƒ½ä½“éƒ½ä¼šè¢«å–æ¶ˆå¹¶è¿”å›ž `status="interrupted"`ã€‚å…¶è¿›è¡Œä¸­çš„å·¥ä½œå°†è¢«ä¸¢å¼ƒã€‚
- å­æ™ºèƒ½ä½“åœ¨çˆ¶æ™ºèƒ½ä½“è½®æ¬¡ç»“æŸåŽ**ä¸ä¼š**ç»§ç»­è¿è¡Œã€‚
- è¢«å–æ¶ˆçš„å­æ™ºèƒ½ä½“ä¼šè¿”å›žç»“æž„åŒ–ç»“æžœï¼ˆ`status="interrupted"`ï¼Œ`exit_reason="interrupted"`ï¼‰ï¼Œä½†ç”±äºŽçˆ¶æ™ºèƒ½ä½“ä¹Ÿè¢«ä¸­æ–­ï¼Œè¯¥ç»“æžœé€šå¸¸ä¸ä¼šå‡ºçŽ°åœ¨ç”¨æˆ·å¯è§çš„å›žå¤ä¸­ã€‚

å¯¹äºŽå¿…é¡»åœ¨ä¸­æ–­åŽå­˜æ´»æˆ–è¶…å‡ºå½“å‰è½®æ¬¡çš„**æŒä¹…é•¿æ—¶é—´è¿è¡Œå·¥ä½œ**ï¼Œè¯·ä½¿ç”¨ï¼š

- `cronjob`ï¼ˆaction=`create`ï¼‰â€”â€”è°ƒåº¦ç‹¬ç«‹çš„æ™ºèƒ½ä½“è¿è¡Œï¼›ä¸å—çˆ¶æ™ºèƒ½ä½“è½®æ¬¡ä¸­æ–­å½±å“ã€‚
- `terminal(background=True, notify_on_complete=True)`â€”â€”é•¿æ—¶é—´è¿è¡Œçš„ shell å‘½ä»¤ï¼Œåœ¨æ™ºèƒ½ä½“æ‰§è¡Œå…¶ä»–æ“ä½œæ—¶æŒç»­è¿è¡Œã€‚
:::

## å…³é”®ç‰¹æ€§

- æ¯ä¸ªå­æ™ºèƒ½ä½“èŽ·å¾—å…¶**ç‹¬ç«‹çš„ç»ˆç«¯ä¼šè¯**ï¼ˆä¸Žçˆ¶æ™ºèƒ½ä½“åˆ†ç¦»ï¼‰
- **åµŒå¥—å§”æ´¾ä¸ºå¯é€‰é¡¹**â€”â€”åªæœ‰ `role="orchestrator"` çš„å­æ™ºèƒ½ä½“å¯ä»¥è¿›ä¸€æ­¥å§”æ´¾ï¼Œä¸”ä»…åœ¨ `max_spawn_depth` ä»Žé»˜è®¤å€¼ 1ï¼ˆæ‰å¹³ï¼‰æé«˜åŽæ‰ç”Ÿæ•ˆã€‚å¯é€šè¿‡ `orchestrator_enabled: false` å…¨å±€ç¦ç”¨ã€‚
- å¶å­å­æ™ºèƒ½ä½“**ä¸èƒ½**è°ƒç”¨ï¼š`delegate_task`ã€`clarify`ã€`memory`ã€`send_message`ã€`execute_code`ã€‚ç¼–æŽ’è€…å­æ™ºèƒ½ä½“ä¿ç•™ `delegate_task`ï¼Œä½†ä»ä¸èƒ½ä½¿ç”¨å…¶ä»–å››ä¸ªã€‚
- **ä¸­æ–­ä¼ æ’­**â€”â€”ä¸­æ–­çˆ¶æ™ºèƒ½ä½“ä¼šä¸­æ–­æ‰€æœ‰æ´»è·ƒçš„å­æ™ºèƒ½ä½“ï¼ˆåŒ…æ‹¬ç¼–æŽ’è€…ä¸‹çš„å­™æ™ºèƒ½ä½“ï¼‰
- åªæœ‰æœ€ç»ˆæ‘˜è¦è¿›å…¥çˆ¶æ™ºèƒ½ä½“çš„ä¸Šä¸‹æ–‡ï¼Œä¿æŒ token ä½¿ç”¨é«˜æ•ˆ
- å­æ™ºèƒ½ä½“ç»§æ‰¿çˆ¶æ™ºèƒ½ä½“çš„ **API å¯†é’¥ã€provider é…ç½®å’Œå‡­æ®æ± **ï¼ˆæ”¯æŒåœ¨é€ŸçŽ‡é™åˆ¶æ—¶è½®æ¢å¯†é’¥ï¼‰

## delegate_task ä¸Ž execute_code å¯¹æ¯”

| å› ç´  | delegate_task | execute_code |
|--------|--------------|-------------|
| **æŽ¨ç†** | å®Œæ•´ LLM æŽ¨ç†å¾ªçŽ¯ | ä»… Python ä»£ç æ‰§è¡Œ |
| **ä¸Šä¸‹æ–‡** | å…¨æ–°éš”ç¦»å¯¹è¯ | æ— å¯¹è¯ï¼Œä»…è„šæœ¬ |
| **å·¥å…·è®¿é—®** | æ‰€æœ‰éžå±è”½å·¥å…·ï¼Œå…·å¤‡æŽ¨ç†èƒ½åŠ› | é€šè¿‡ RPC è®¿é—® 7 ä¸ªå·¥å…·ï¼Œæ— æŽ¨ç† |
| **å¹¶è¡Œæ€§** | é»˜è®¤ 3 ä¸ªå¹¶å‘å­æ™ºèƒ½ä½“ï¼ˆå¯é…ç½®ï¼‰ | å•è„šæœ¬ |
| **æœ€é€‚åˆ** | éœ€è¦åˆ¤æ–­åŠ›çš„å¤æ‚ä»»åŠ¡ | æœºæ¢°å¼å¤šæ­¥éª¤æµæ°´çº¿ |
| **Token è´¹ç”¨** | è¾ƒé«˜ï¼ˆå®Œæ•´ LLM å¾ªçŽ¯ï¼‰ | è¾ƒä½Žï¼ˆä»…è¿”å›ž stdoutï¼‰ |
| **ç”¨æˆ·äº¤äº’** | æ— ï¼ˆå­æ™ºèƒ½ä½“æ— æ³•æ¾„æ¸…ï¼‰ | æ—  |

**ç»éªŒæ³•åˆ™ï¼š** å½“å­ä»»åŠ¡éœ€è¦æŽ¨ç†ã€åˆ¤æ–­æˆ–å¤šæ­¥éª¤é—®é¢˜è§£å†³æ—¶ï¼Œä½¿ç”¨ `delegate_task`ã€‚å½“éœ€è¦æœºæ¢°å¼æ•°æ®å¤„ç†æˆ–è„šæœ¬åŒ–å·¥ä½œæµæ—¶ï¼Œä½¿ç”¨ `execute_code`ã€‚

## é…ç½®

```yaml
# In ~/.zed/config.yaml
delegation:
  max_iterations: 50                        # Max turns per child (default: 50)
  # max_concurrent_children: 3              # Parallel children per batch (default: 3)
  # max_spawn_depth: 1                      # Tree depth (1-3, default 1 = flat). Raise to 2 to allow orchestrator children to spawn leaves; 3 for three levels.
  # orchestrator_enabled: true              # Disable to force all children to leaf role.
  model: "google/gemini-3-flash-preview"             # Optional provider/model override
  provider: "openrouter"                             # Optional built-in provider
  api_mode: anthropic_messages                       # optional; auto-detected from base_url for anthropic_messages endpoints

# Or use a direct custom endpoint instead of provider:
delegation:
  model: "qwen2.5-coder"
  base_url: "http://localhost:1234/v1"
  api_key: "local-key"
  # api_mode: "anthropic_messages"  # Optional. Wire protocol override for base_url ("chat_completions", "codex_responses", or "anthropic_messages"). Empty = auto-detect from URL (e.g. /anthropic suffix). Set explicitly for endpoints the heuristic can't classify (Azure AI Foundry, MiniMax, Zhipu GLM, LiteLLM proxies, â€¦).
```

å½“ `base_url` æŒ‡å‘ Anthropic å…¼å®¹ç«¯ç‚¹æ—¶â€”â€”ä¾‹å¦‚è·¯å¾„ä»¥ `/anthropic` ç»“å°¾ã€Azure Foundry Claude è·¯ç”±æˆ– MiniMax `/anthropic` ä»£ç†â€”â€”`api_mode` ä¼šè¢«è‡ªåŠ¨æ£€æµ‹ä¸º `anthropic_messages`ï¼Œå­æ™ºèƒ½ä½“æ— éœ€ä»»ä½•é…ç½®å³å¯ä½¿ç”¨æ­£ç¡®çš„ä¼ è¾“æ ¼å¼ã€‚å½“è‡ªåŠ¨æ£€æµ‹ç»“æžœæœ‰è¯¯æ—¶ï¼ˆç½•è§ï¼‰ï¼Œè¯·æ˜¾å¼è®¾ç½® `api_mode`ã€‚

:::tip
æ™ºèƒ½ä½“ä¼šæ ¹æ®ä»»åŠ¡å¤æ‚åº¦è‡ªåŠ¨å¤„ç†å§”æ´¾ã€‚ä½ æ— éœ€æ˜Žç¡®è¦æ±‚å®ƒè¿›è¡Œå§”æ´¾â€”â€”å®ƒä¼šåœ¨åˆé€‚æ—¶è‡ªè¡Œå†³å®šã€‚
:::