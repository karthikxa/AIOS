---
sidebar_position: 6
title: "Event Hooks"
description: "åœ¨å…³é”®ç”Ÿå‘½å‘¨æœŸèŠ‚ç‚¹è¿è¡Œè‡ªå®šä¹‰ä»£ç â€”â€”è®°å½•æ´»åŠ¨ã€å‘é€å‘Šè­¦ã€æŽ¨é€åˆ° webhook"
---

# Event Hooks

Zed æœ‰ä¸‰å¥— hook ç³»ç»Ÿï¼Œå¯åœ¨å…³é”®ç”Ÿå‘½å‘¨æœŸèŠ‚ç‚¹è¿è¡Œè‡ªå®šä¹‰ä»£ç ï¼š

| ç³»ç»Ÿ | æ³¨å†Œæ–¹å¼ | è¿è¡ŒçŽ¯å¢ƒ | ä½¿ç”¨åœºæ™¯ |
|------|---------|---------|---------|
| **[Gateway hooks](#gateway-event-hooks)** | `~/.zed/hooks/` ä¸‹çš„ `HOOK.yaml` + `handler.py` | ä»… Gateway | æ—¥å¿—ã€å‘Šè­¦ã€webhook |
| **[Plugin hooks](#plugin-hooks)** | [æ’ä»¶](/user-guide/features/plugins)ä¸­çš„ `ctx.register_hook()` | CLI + Gateway | å·¥å…·æ‹¦æˆªã€æŒ‡æ ‡é‡‡é›†ã€æŠ¤æ  |
| **[Shell hooks](#shell-hooks)** | `~/.zed/config.yaml` ä¸­ `hooks:` å—æŒ‡å‘çš„ shell è„šæœ¬ | CLI + Gateway | ç”¨äºŽé˜»æ–­ã€è‡ªåŠ¨æ ¼å¼åŒ–ã€ä¸Šä¸‹æ–‡æ³¨å…¥çš„å³æ’å³ç”¨è„šæœ¬ |

ä¸‰å¥—ç³»ç»Ÿå‡ä¸ºéžé˜»å¡žå¼â€”â€”ä»»ä½• hook ä¸­çš„é”™è¯¯éƒ½ä¼šè¢«æ•èŽ·å¹¶è®°å½•ï¼Œä¸ä¼šå¯¼è‡´ agent å´©æºƒã€‚

## Gateway Event Hooks

Gateway hooks åœ¨ gateway è¿è¡ŒæœŸé—´ï¼ˆTelegramã€Discordã€Slackã€WhatsAppã€Teamsï¼‰è‡ªåŠ¨è§¦å‘ï¼Œä¸ä¼šé˜»å¡žä¸» agent ç®¡é“ã€‚

### åˆ›å»º Hook

æ¯ä¸ª hook æ˜¯ `~/.zed/hooks/` ä¸‹çš„ä¸€ä¸ªç›®å½•ï¼ŒåŒ…å«ä¸¤ä¸ªæ–‡ä»¶ï¼š

```text
~/.zed/hooks/
â””â”€â”€ my-hook/
    â”œâ”€â”€ HOOK.yaml      # å£°æ˜Žè¦ç›‘å¬çš„äº‹ä»¶
    â””â”€â”€ handler.py     # Python å¤„ç†å‡½æ•°
```

#### HOOK.yaml

```yaml
name: my-hook
description: Log all agent activity to a file
events:
  - agent:start
  - agent:end
  - agent:step
```

`events` åˆ—è¡¨å†³å®šå“ªäº›äº‹ä»¶ä¼šè§¦å‘ä½ çš„å¤„ç†å™¨ã€‚å¯ä»¥è®¢é˜…ä»»æ„äº‹ä»¶ç»„åˆï¼ŒåŒ…æ‹¬ `command:*` è¿™æ ·çš„é€šé…ç¬¦ã€‚

#### handler.py

```python
import json
from datetime import datetime
from pathlib import Path

LOG_FILE = Path.home() / ".zed" / "hooks" / "my-hook" / "activity.log"

async def handle(event_type: str, context: dict):
    """Called for each subscribed event. Must be named 'handle'."""
    entry = {
        "timestamp": datetime.now().isoformat(),
        "event": event_type,
        **context,
    }
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(entry) + "\n")
```

**å¤„ç†å™¨è§„åˆ™ï¼š**
- å¿…é¡»å‘½åä¸º `handle`
- æŽ¥æ”¶ `event_type`ï¼ˆå­—ç¬¦ä¸²ï¼‰å’Œ `context`ï¼ˆå­—å…¸ï¼‰
- å¯ä»¥æ˜¯ `async def` æˆ–æ™®é€š `def`â€”â€”ä¸¤è€…å‡å¯
- é”™è¯¯ä¼šè¢«æ•èŽ·å¹¶è®°å½•ï¼Œä¸ä¼šå¯¼è‡´ agent å´©æºƒ

### å¯ç”¨äº‹ä»¶

| äº‹ä»¶ | è§¦å‘æ—¶æœº | Context é”® |
|------|---------|-----------|
| `gateway:startup` | Gateway è¿›ç¨‹å¯åŠ¨ | `platforms`ï¼ˆæ´»è·ƒå¹³å°åç§°åˆ—è¡¨ï¼‰ |
| `session:start` | æ–°æ¶ˆæ¯ä¼šè¯åˆ›å»º | `platform`ã€`user_id`ã€`session_id`ã€`session_key` |
| `session:end` | ä¼šè¯ç»“æŸï¼ˆé‡ç½®å‰ï¼‰ | `platform`ã€`user_id`ã€`session_key` |
| `session:reset` | ç”¨æˆ·æ‰§è¡Œ `/new` æˆ– `/reset` | `platform`ã€`user_id`ã€`session_key` |
| `agent:start` | Agent å¼€å§‹å¤„ç†æ¶ˆæ¯ | `platform`ã€`user_id`ã€`session_id`ã€`message` |
| `agent:step` | å·¥å…·è°ƒç”¨å¾ªçŽ¯çš„æ¯æ¬¡è¿­ä»£ | `platform`ã€`user_id`ã€`session_id`ã€`iteration`ã€`tool_names` |
| `agent:end` | Agent å®Œæˆå¤„ç† | `platform`ã€`user_id`ã€`session_id`ã€`message`ã€`response` |
| `command:*` | ä»»æ„æ–œæ å‘½ä»¤æ‰§è¡Œ | `platform`ã€`user_id`ã€`command`ã€`args` |

#### é€šé…ç¬¦åŒ¹é…

æ³¨å†Œäº† `command:*` çš„å¤„ç†å™¨ä¼šåœ¨ä»»ä½• `command:` äº‹ä»¶ï¼ˆ`command:model`ã€`command:reset` ç­‰ï¼‰è§¦å‘æ—¶æ‰§è¡Œã€‚é€šè¿‡å•ä¸ªè®¢é˜…å³å¯ç›‘æŽ§æ‰€æœ‰æ–œæ å‘½ä»¤ã€‚

### ç¤ºä¾‹

#### Telegram é•¿ä»»åŠ¡å‘Šè­¦

å½“ agent æ‰§è¡Œè¶…è¿‡ 10 æ­¥æ—¶å‘è‡ªå·±å‘é€æ¶ˆæ¯ï¼š

```yaml
# ~/.zed/hooks/long-task-alert/HOOK.yaml
name: long-task-alert
description: Alert when agent is taking many steps
events:
  - agent:step
```

```python
# ~/.zed/hooks/long-task-alert/handler.py
import os
import httpx

THRESHOLD = 10
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_HOME_CHANNEL")

async def handle(event_type: str, context: dict):
    iteration = context.get("iteration", 0)
    if iteration == THRESHOLD and BOT_TOKEN and CHAT_ID:
        tools = ", ".join(context.get("tool_names", []))
        text = f"âš ï¸ Agent has been running for {iteration} steps. Last tools: {tools}"
        async with httpx.AsyncClient() as client:
            await client.post(
                f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
                json={"chat_id": CHAT_ID, "text": text},
            )
```

#### å‘½ä»¤ä½¿ç”¨æ—¥å¿—è®°å½•å™¨

è¿½è¸ªå“ªäº›æ–œæ å‘½ä»¤è¢«ä½¿ç”¨ï¼š

```yaml
# ~/.zed/hooks/command-logger/HOOK.yaml
name: command-logger
description: Log slash command usage
events:
  - command:*
```

```python
# ~/.zed/hooks/command-logger/handler.py
import json
from datetime import datetime
from pathlib import Path

LOG = Path.home() / ".zed" / "logs" / "command_usage.jsonl"

def handle(event_type: str, context: dict):
    LOG.parent.mkdir(parents=True, exist_ok=True)
    entry = {
        "ts": datetime.now().isoformat(),
        "command": context.get("command"),
        "args": context.get("args"),
        "platform": context.get("platform"),
        "user": context.get("user_id"),
    }
    with open(LOG, "a") as f:
        f.write(json.dumps(entry) + "\n")
```

#### ä¼šè¯å¼€å§‹ Webhook

æ–°ä¼šè¯æ—¶ POST åˆ°å¤–éƒ¨æœåŠ¡ï¼š

```yaml
# ~/.zed/hooks/session-webhook/HOOK.yaml
name: session-webhook
description: Notify external service on new sessions
events:
  - session:start
  - session:reset
```

```python
# ~/.zed/hooks/session-webhook/handler.py
import httpx

WEBHOOK_URL = "https://your-service.example.com/zed-events"

async def handle(event_type: str, context: dict):
    async with httpx.AsyncClient() as client:
        await client.post(WEBHOOK_URL, json={
            "event": event_type,
            **context,
        }, timeout=5)
```

### æ•™ç¨‹ï¼šBOOT.mdâ€”â€”æ¯æ¬¡ Gateway å¯åŠ¨æ—¶è¿è¡Œå¯åŠ¨æ£€æŸ¥æ¸…å•

è¿™æ˜¯ç¤¾åŒºä¸­æµè¡Œçš„ä¸€ç§æ¨¡å¼ï¼šåœ¨ `~/.zed/BOOT.md` æ”¾ç½®ä¸€ä¸ª Markdown æ£€æŸ¥æ¸…å•ï¼Œè®© agent åœ¨æ¯æ¬¡ gateway å¯åŠ¨æ—¶æ‰§è¡Œä¸€æ¬¡ã€‚é€‚ç”¨äºŽ"æ¯æ¬¡å¯åŠ¨æ—¶æ£€æŸ¥éš”å¤œ cron å¤±è´¥æƒ…å†µï¼Œè‹¥æœ‰å¤±è´¥åˆ™åœ¨ Discord ä¸Šé€šçŸ¥æˆ‘"ï¼Œæˆ–"æ±‡æ€»è¿‡åŽ» 24 å°æ—¶çš„ deploy.log å¹¶å‘å¸ƒåˆ° Slack #ops"ç­‰åœºæ™¯ã€‚

æœ¬æ•™ç¨‹å±•ç¤ºå¦‚ä½•ä»¥ç”¨æˆ·è‡ªå®šä¹‰ hook çš„æ–¹å¼è‡ªè¡Œæž„å»ºã€‚Zed ä¸å†…ç½® BOOT.md hookâ€”â€”ä½ å¯ä»¥ç²¾ç¡®é…ç½®è‡ªå·±æƒ³è¦çš„è¡Œä¸ºã€‚

#### æˆ‘ä»¬è¦æž„å»ºä»€ä¹ˆ

1. åœ¨ `~/.zed/BOOT.md` æ”¾ç½®ä¸€ä¸ªåŒ…å«è‡ªç„¶è¯­è¨€å¯åŠ¨æŒ‡ä»¤çš„æ–‡ä»¶ã€‚
2. ä¸€ä¸ªç›‘å¬ `gateway:startup` çš„ gateway hookï¼Œå®ƒä¼šç”Ÿæˆä¸€ä¸ªä¸€æ¬¡æ€§ agentï¼Œä½¿ç”¨ gateway å·²è§£æžçš„æ¨¡åž‹å’Œå‡­æ®ï¼Œæ‰§è¡Œ BOOT.md ä¸­çš„æŒ‡ä»¤ã€‚
3. ä¸€ä¸ª `[SILENT]` çº¦å®šï¼Œè®© agent åœ¨æ²¡æœ‰å†…å®¹éœ€è¦æ±‡æŠ¥æ—¶é€‰æ‹©ä¸å‘é€æ¶ˆæ¯ã€‚

#### ç¬¬ä¸€æ­¥ï¼šç¼–å†™æ£€æŸ¥æ¸…å•

åˆ›å»º `~/.zed/BOOT.md`ã€‚åƒç»™äººç±»åŠ©æ‰‹ä¸‹è¾¾æŒ‡ä»¤ä¸€æ ·ç¼–å†™ï¼š

```markdown
# Startup Checklist

1. Run `zed cron list` and check if any scheduled jobs failed overnight.
2. If any failed, send a summary to Discord #ops using the `send_message` tool.
3. Check if `/opt/app/deploy.log` has any ERROR lines from the last 24 hours. If yes, summarize them and include in the same Discord message.
4. If nothing went wrong, reply with only `[SILENT]` so no message is sent.
```

Agent å°†æ­¤å†…å®¹ä½œä¸º promptï¼ˆæç¤ºè¯ï¼‰çš„ä¸€éƒ¨åˆ†ï¼Œå› æ­¤ä»»ä½•å¯ä»¥ç”¨è‡ªç„¶è¯­è¨€æè¿°çš„å†…å®¹éƒ½å¯ä»¥â€”â€”å·¥å…·è°ƒç”¨ã€shell å‘½ä»¤ã€å‘é€æ¶ˆæ¯ã€æ±‡æ€»æ–‡ä»¶ã€‚

#### ç¬¬äºŒæ­¥ï¼šåˆ›å»º hook

```text
~/.zed/hooks/boot-md/
â”œâ”€â”€ HOOK.yaml
â””â”€â”€ handler.py
```

**`~/.zed/hooks/boot-md/HOOK.yaml`**

```yaml
name: boot-md
description: Run ~/.zed/BOOT.md on gateway startup
events:
  - gateway:startup
```

**`~/.zed/hooks/boot-md/handler.py`**

```python
"""Run ~/.zed/BOOT.md on every gateway startup."""

import logging
import threading
from pathlib import Path

logger = logging.getLogger("hooks.boot-md")

BOOT_FILE = Path.home() / ".zed" / "BOOT.md"


def _build_prompt(content: str) -> str:
    return (
        "You are running a startup boot checklist. Follow the instructions "
        "below exactly.\n\n"
        "---\n"
        f"{content}\n"
        "---\n\n"
        "Execute each instruction. Use the send_message tool to deliver any "
        "messages to platforms like Discord or Slack.\n"
        "If nothing needs attention and there is nothing to report, reply "
        "with ONLY: [SILENT]"
    )


def _run_boot_agent(content: str) -> None:
    """Spawn a one-shot agent and execute the checklist.

    Uses the gateway's resolved model and runtime credentials so this works
    against custom endpoints, aggregators, and OAuth-based providers alike.
    """
    try:
        from gateway.run import _resolve_gateway_model, _resolve_runtime_agent_kwargs
        from run_agent import AIAgent

        agent = AIAgent(
            model=_resolve_gateway_model(),
            **_resolve_runtime_agent_kwargs(),
            platform="gateway",
            quiet_mode=True,
            skip_context_files=True,
            skip_memory=True,
            max_iterations=20,
        )
        result = agent.run_conversation(_build_prompt(content))
        response = result.get("final_response", "")
        if response and "[SILENT]" not in response:
            logger.info("boot-md completed: %s", response[:200])
        else:
            logger.info("boot-md completed (nothing to report)")
    except Exception as e:
        logger.error("boot-md agent failed: %s", e)


async def handle(event_type: str, context: dict) -> None:
    if not BOOT_FILE.exists():
        return
    content = BOOT_FILE.read_text(encoding="utf-8").strip()
    if not content:
        return

    logger.info("Running BOOT.md (%d chars)", len(content))

    # Background thread so gateway startup isn't blocked on a full agent turn.
    thread = threading.Thread(
        target=_run_boot_agent,
        args=(content,),
        name="boot-md",
        daemon=True,
    )
    thread.start()
```

ä¸¤ä¸ªå…³é”®è¡Œï¼š

- `_resolve_gateway_model()` è¯»å– gateway å½“å‰é…ç½®çš„æ¨¡åž‹ã€‚
- `_resolve_runtime_agent_kwargs()` ä»¥ä¸Žæ™®é€š gateway è½®æ¬¡ç›¸åŒçš„æ–¹å¼è§£æž provider å‡­æ®â€”â€”åŒ…æ‹¬ API å¯†é’¥ã€base URLã€OAuth token å’Œå‡­æ®æ± ã€‚

è‹¥ä¸ä½¿ç”¨è¿™ä¸¤è¡Œï¼Œè£¸ `AIAgent()` ä¼šå›žé€€åˆ°å†…ç½®é»˜è®¤å€¼ï¼Œå¹¶åœ¨ä»»ä½•éžé»˜è®¤ç«¯ç‚¹ä¸Šè¿”å›ž 401ã€‚

#### ç¬¬ä¸‰æ­¥ï¼šæµ‹è¯•

é‡å¯ gatewayï¼š

```bash
zed gateway restart
```

æŸ¥çœ‹æ—¥å¿—ï¼š

```bash
zed logs --follow --level INFO | grep boot-md
```

ä½ åº”è¯¥çœ‹åˆ° `Running BOOT.md (N chars)`ï¼ŒéšåŽæ˜¯ `boot-md completed: ...`ï¼ˆagent æ‰§è¡Œå†…å®¹çš„æ‘˜è¦ï¼‰æˆ– `boot-md completed (nothing to report)`ï¼ˆagent å›žå¤äº† `[SILENT]`ï¼‰ã€‚

åˆ é™¤ `~/.zed/BOOT.md` å³å¯ç¦ç”¨æ£€æŸ¥æ¸…å•â€”â€”hook ä¿æŒåŠ è½½çŠ¶æ€ï¼Œä½†åœ¨æ–‡ä»¶ä¸å­˜åœ¨æ—¶ä¼šé™é»˜è·³è¿‡ã€‚

#### æ‰©å±•æ­¤æ¨¡å¼

- **æ„ŸçŸ¥è°ƒåº¦çš„æ£€æŸ¥æ¸…å•ï¼š** åœ¨ BOOT.md æŒ‡ä»¤ä¸­åŸºäºŽ `datetime.now().weekday()` è¿›è¡Œåˆ¤æ–­ï¼ˆ"å¦‚æžœæ˜¯å‘¨ä¸€ï¼Œè¿˜éœ€æ£€æŸ¥æ¯å‘¨éƒ¨ç½²æ—¥å¿—"ï¼‰ã€‚æŒ‡ä»¤æ˜¯è‡ªç”±æ ¼å¼æ–‡æœ¬ï¼Œagent èƒ½æŽ¨ç†çš„å†…å®¹éƒ½å¯ä»¥ä½¿ç”¨ã€‚
- **å¤šä¸ªæ£€æŸ¥æ¸…å•ï¼š** å°† hook æŒ‡å‘ä¸åŒæ–‡ä»¶ï¼ˆ`STARTUP.md`ã€`MORNING.md` ç­‰ï¼‰ï¼Œå¹¶ä¸ºæ¯ä¸ªæ–‡ä»¶æ³¨å†Œç‹¬ç«‹çš„ hook ç›®å½•ã€‚
- **éž agent å˜ä½“ï¼š** å¦‚æžœä¸éœ€è¦å®Œæ•´çš„ agent å¾ªçŽ¯ï¼Œå®Œå…¨è·³è¿‡ `AIAgent`ï¼Œç›´æŽ¥é€šè¿‡ `httpx` åœ¨å¤„ç†å™¨ä¸­å‘é€å›ºå®šé€šçŸ¥ã€‚æ›´è½»é‡ã€æ›´å¿«é€Ÿï¼Œä¸”æ—  provider ä¾èµ–ã€‚

#### ä¸ºä»€ä¹ˆè¿™ä¸æ˜¯å†…ç½®åŠŸèƒ½

Zed æ—©æœŸç‰ˆæœ¬å°†æ­¤ä½œä¸ºå†…ç½® hook å‘å¸ƒï¼Œæ¯æ¬¡ gateway å¯åŠ¨æ—¶éƒ½ä¼šé™é»˜ç”Ÿæˆä¸€ä¸ªä½¿ç”¨è£¸é»˜è®¤å€¼çš„ agentã€‚è¿™è®©ä½¿ç”¨è‡ªå®šä¹‰ç«¯ç‚¹çš„ç”¨æˆ·æ„Ÿåˆ°æ„å¤–ï¼Œä¹Ÿè®©ä¸çŸ¥é“å®ƒåœ¨è¿è¡Œçš„ç”¨æˆ·æ— ä»Žå¯Ÿè§‰ã€‚å°†å…¶ä½œä¸ºæ–‡æ¡£åŒ–æ¨¡å¼ä¿ç•™â€”â€”ç”±ä½ åœ¨ hooks ç›®å½•ä¸­æž„å»ºâ€”â€”æ„å‘³ç€ä½ èƒ½æ¸…æ¥šåœ°çœ‹åˆ°å®ƒçš„è¡Œä¸ºï¼Œå¹¶é€šè¿‡ç¼–å†™æ–‡ä»¶æ¥é€‰æ‹©å¯ç”¨ã€‚

### å·¥ä½œåŽŸç†

1. Gateway å¯åŠ¨æ—¶ï¼Œ`HookRegistry.discover_and_load()` æ‰«æ `~/.zed/hooks/`
2. æ¯ä¸ªåŒ…å« `HOOK.yaml` + `handler.py` çš„å­ç›®å½•éƒ½ä¼šè¢«åŠ¨æ€åŠ è½½
3. å¤„ç†å™¨æŒ‰å…¶å£°æ˜Žçš„äº‹ä»¶æ³¨å†Œ
4. åœ¨æ¯ä¸ªç”Ÿå‘½å‘¨æœŸèŠ‚ç‚¹ï¼Œ`hooks.emit()` è§¦å‘æ‰€æœ‰åŒ¹é…çš„å¤„ç†å™¨
5. ä»»ä½•å¤„ç†å™¨ä¸­çš„é”™è¯¯éƒ½ä¼šè¢«æ•èŽ·å¹¶è®°å½•â€”â€”æŸåçš„ hook æ°¸è¿œä¸ä¼šå¯¼è‡´ agent å´©æºƒ

:::info
Gateway hooks ä»…åœ¨ **gateway**ï¼ˆTelegramã€Discordã€Slackã€WhatsAppã€Teamsï¼‰ä¸­è§¦å‘ã€‚CLI ä¸åŠ è½½ gateway hooksã€‚å¦‚éœ€åœ¨æ‰€æœ‰çŽ¯å¢ƒä¸­ç”Ÿæ•ˆçš„ hookï¼Œè¯·ä½¿ç”¨ [plugin hooks](#plugin-hooks)ã€‚
:::

## Plugin Hooks

[æ’ä»¶](/user-guide/features/plugins)å¯ä»¥æ³¨å†Œåœ¨ **CLI å’Œ gateway** ä¼šè¯ä¸­å‡ä¼šè§¦å‘çš„ hookã€‚è¿™äº› hook é€šè¿‡æ’ä»¶ `register()` å‡½æ•°ä¸­çš„ `ctx.register_hook()` ä»¥ç¼–ç¨‹æ–¹å¼æ³¨å†Œã€‚

```python
def register(ctx):
    ctx.register_hook("pre_tool_call", my_tool_observer)
    ctx.register_hook("post_tool_call", my_tool_logger)
    ctx.register_hook("pre_llm_call", my_memory_callback)
    ctx.register_hook("post_llm_call", my_sync_callback)
    ctx.register_hook("on_session_start", my_init_callback)
    ctx.register_hook("on_session_end", my_cleanup_callback)
```

**æ‰€æœ‰ hook çš„é€šç”¨è§„åˆ™ï¼š**

- å›žè°ƒæŽ¥æ”¶**å…³é”®å­—å‚æ•°**ã€‚å§‹ç»ˆæŽ¥å— `**kwargs` ä»¥ä¿æŒå‘å‰å…¼å®¹æ€§â€”â€”æœªæ¥ç‰ˆæœ¬å¯èƒ½ä¼šåœ¨ä¸ç ´åæ’ä»¶çš„æƒ…å†µä¸‹æ·»åŠ æ–°å‚æ•°ã€‚
- å¦‚æžœå›žè°ƒ**å´©æºƒ**ï¼Œä¼šè¢«è®°å½•å¹¶è·³è¿‡ã€‚å…¶ä»– hook å’Œ agent ç»§ç»­æ­£å¸¸è¿è¡Œã€‚è¡Œä¸ºå¼‚å¸¸çš„æ’ä»¶æ°¸è¿œä¸ä¼šç ´å agentã€‚
- ä¸¤ä¸ª hook çš„è¿”å›žå€¼ä¼šå½±å“è¡Œä¸ºï¼š[`pre_tool_call`](#pre_tool_call) å¯ä»¥**é˜»æ–­**å·¥å…·ï¼Œ[`pre_llm_call`](#pre_llm_call) å¯ä»¥**æ³¨å…¥ä¸Šä¸‹æ–‡**åˆ° LLM è°ƒç”¨ä¸­ã€‚å…¶ä»–æ‰€æœ‰ hook å‡ä¸ºå³å‘å³å¿˜çš„è§‚å¯Ÿè€…ã€‚

### å¿«é€Ÿå‚è€ƒ

| Hook | è§¦å‘æ—¶æœº | è¿”å›žå€¼ |
|------|---------|-------|
| [`pre_tool_call`](#pre_tool_call) | ä»»æ„å·¥å…·æ‰§è¡Œå‰ | `{"action": "block", "message": str}` ç”¨äºŽå¦å†³è°ƒç”¨ |
| [`post_tool_call`](#post_tool_call) | ä»»æ„å·¥å…·è¿”å›žåŽ | å¿½ç•¥ |
| [`pre_llm_call`](#pre_llm_call) | æ¯è½®ä¸€æ¬¡ï¼Œå·¥å…·è°ƒç”¨å¾ªçŽ¯å‰ | `{"context": str}` ç”¨äºŽåœ¨ç”¨æˆ·æ¶ˆæ¯å‰è¿½åŠ ä¸Šä¸‹æ–‡ |
| [`post_llm_call`](#post_llm_call) | æ¯è½®ä¸€æ¬¡ï¼Œå·¥å…·è°ƒç”¨å¾ªçŽ¯åŽ | å¿½ç•¥ |
| [`on_session_start`](#on_session_start) | æ–°ä¼šè¯åˆ›å»ºï¼ˆä»…ç¬¬ä¸€è½®ï¼‰ | å¿½ç•¥ |
| [`on_session_end`](#on_session_end) | ä¼šè¯ç»“æŸ | å¿½ç•¥ |
| [`on_session_finalize`](#on_session_finalize) | CLI/gateway é”€æ¯æ´»è·ƒä¼šè¯ï¼ˆåˆ·æ–°ã€ä¿å­˜ã€ç»Ÿè®¡ï¼‰ | å¿½ç•¥ |
| [`on_session_reset`](#on_session_reset) | Gateway æ¢å…¥æ–°ä¼šè¯ keyï¼ˆå¦‚ `/new`ã€`/reset`ï¼‰ | å¿½ç•¥ |
| [`subagent_stop`](#subagent_stop) | `delegate_task` å­ agent é€€å‡º | å¿½ç•¥ |
| [`pre_gateway_dispatch`](#pre_gateway_dispatch) | Gateway æ”¶åˆ°ç”¨æˆ·æ¶ˆæ¯ï¼Œè®¤è¯å’Œåˆ†å‘å‰ | `{"action": "skip" \| "rewrite" \| "allow", ...}` ç”¨äºŽå½±å“æµç¨‹ |
| [`pre_approval_request`](#pre_approval_request) | å±é™©å‘½ä»¤éœ€è¦ç”¨æˆ·å®¡æ‰¹ï¼Œæç¤º/é€šçŸ¥å‘é€å‰ | å¿½ç•¥ |
| [`post_approval_response`](#post_approval_response) | ç”¨æˆ·å“åº”å®¡æ‰¹æç¤ºï¼ˆæˆ–è¶…æ—¶ï¼‰ | å¿½ç•¥ |
| [`transform_tool_result`](#transform_tool_result) | ä»»æ„å·¥å…·è¿”å›žåŽï¼Œç»“æžœäº¤è¿˜ç»™æ¨¡åž‹å‰ | `str` æ›¿æ¢ç»“æžœï¼Œ`None` ä¿æŒä¸å˜ |
| [`transform_terminal_output`](#transform_terminal_output) | `terminal` å·¥å…·å†…éƒ¨ï¼Œæˆªæ–­/ANSI å‰¥ç¦»/è„±æ•å‰ | `str` æ›¿æ¢åŽŸå§‹è¾“å‡ºï¼Œ`None` ä¿æŒä¸å˜ |
| [`transform_llm_output`](#transform_llm_output) | å·¥å…·è°ƒç”¨å¾ªçŽ¯å®ŒæˆåŽï¼Œæœ€ç»ˆå“åº”äº¤ä»˜å‰ | `str` æ›¿æ¢å“åº”æ–‡æœ¬ï¼Œ`None`/ç©ºå€¼ä¿æŒä¸å˜ |

---

### `pre_tool_call`

åœ¨æ¯æ¬¡å·¥å…·æ‰§è¡Œ**ä¹‹å‰ç«‹å³**è§¦å‘â€”â€”å†…ç½®å·¥å…·å’Œæ’ä»¶å·¥å…·å‡é€‚ç”¨ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(tool_name: str, args: dict, task_id: str, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `tool_name` | `str` | å³å°†æ‰§è¡Œçš„å·¥å…·åç§°ï¼ˆå¦‚ `"terminal"`ã€`"web_search"`ã€`"read_file"`ï¼‰ |
| `args` | `dict` | æ¨¡åž‹ä¼ é€’ç»™å·¥å…·çš„å‚æ•° |
| `task_id` | `str` | ä¼šè¯/ä»»åŠ¡æ ‡è¯†ç¬¦ã€‚æœªè®¾ç½®æ—¶ä¸ºç©ºå­—ç¬¦ä¸²ã€‚ |

**è§¦å‘ä½ç½®ï¼š** `model_tools.py` ä¸­çš„ `handle_function_call()` å†…ï¼Œå·¥å…·å¤„ç†å™¨è¿è¡Œå‰ã€‚æ¯æ¬¡å·¥å…·è°ƒç”¨è§¦å‘ä¸€æ¬¡â€”â€”è‹¥æ¨¡åž‹å¹¶è¡Œè°ƒç”¨ 3 ä¸ªå·¥å…·ï¼Œåˆ™è§¦å‘ 3 æ¬¡ã€‚

**è¿”å›žå€¼â€”â€”å¦å†³è°ƒç”¨ï¼š**

```python
return {"action": "block", "message": "Reason the tool call was blocked"}
```

Agent ä»¥ `message` ä½œä¸ºè¿”å›žç»™æ¨¡åž‹çš„é”™è¯¯çŸ­è·¯è¯¥å·¥å…·è°ƒç”¨ã€‚ç¬¬ä¸€ä¸ªåŒ¹é…çš„ block æŒ‡ä»¤ç”Ÿæ•ˆï¼ˆPython æ’ä»¶ä¼˜å…ˆï¼Œç„¶åŽæ˜¯ shell hooksï¼‰ã€‚ä»»ä½•å…¶ä»–è¿”å›žå€¼å‡è¢«å¿½ç•¥ï¼Œå› æ­¤ä»…ä½œè§‚å¯Ÿç”¨é€”çš„çŽ°æœ‰å›žè°ƒæ— éœ€ä¿®æ”¹ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** æ—¥å¿—è®°å½•ã€å®¡è®¡è¿½è¸ªã€å·¥å…·è°ƒç”¨è®¡æ•°ã€é˜»æ–­å±é™©æ“ä½œã€é€ŸçŽ‡é™åˆ¶ã€æŒ‰ç”¨æˆ·ç­–ç•¥æ‰§è¡Œã€‚

**ç¤ºä¾‹â€”â€”å·¥å…·è°ƒç”¨å®¡è®¡æ—¥å¿—ï¼š**

```python
import json, logging
from datetime import datetime

logger = logging.getLogger(__name__)

def audit_tool_call(tool_name, args, task_id, **kwargs):
    logger.info("TOOL_CALL session=%s tool=%s args=%s",
                task_id, tool_name, json.dumps(args)[:200])

def register(ctx):
    ctx.register_hook("pre_tool_call", audit_tool_call)
```

**ç¤ºä¾‹â€”â€”å¯¹å±é™©å·¥å…·å‘å‡ºè­¦å‘Šï¼š**

```python
DANGEROUS = {"terminal", "write_file", "patch"}

def warn_dangerous(tool_name, **kwargs):
    if tool_name in DANGEROUS:
        print(f"âš  Executing potentially dangerous tool: {tool_name}")

def register(ctx):
    ctx.register_hook("pre_tool_call", warn_dangerous)
```

---

### `post_tool_call`

åœ¨æ¯æ¬¡å·¥å…·æ‰§è¡Œè¿”å›ž**ä¹‹åŽç«‹å³**è§¦å‘ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(tool_name: str, args: dict, result: str, task_id: str,
                duration_ms: int, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `tool_name` | `str` | åˆšåˆšæ‰§è¡Œçš„å·¥å…·åç§° |
| `args` | `dict` | æ¨¡åž‹ä¼ é€’ç»™å·¥å…·çš„å‚æ•° |
| `result` | `str` | å·¥å…·çš„è¿”å›žå€¼ï¼ˆå§‹ç»ˆä¸º JSON å­—ç¬¦ä¸²ï¼‰ |
| `task_id` | `str` | ä¼šè¯/ä»»åŠ¡æ ‡è¯†ç¬¦ã€‚æœªè®¾ç½®æ—¶ä¸ºç©ºå­—ç¬¦ä¸²ã€‚ |
| `duration_ms` | `int` | å·¥å…·åˆ†å‘è€—æ—¶ï¼Œå•ä½æ¯«ç§’ï¼ˆä½¿ç”¨ `time.monotonic()` åœ¨ `registry.dispatch()` å‰åŽæµ‹é‡ï¼‰ã€‚ |

**è§¦å‘ä½ç½®ï¼š** `model_tools.py` ä¸­çš„ `handle_function_call()` å†…ï¼Œå·¥å…·å¤„ç†å™¨è¿”å›žåŽã€‚æ¯æ¬¡å·¥å…·è°ƒç”¨è§¦å‘ä¸€æ¬¡ã€‚è‹¥å·¥å…·æŠ›å‡ºæœªå¤„ç†å¼‚å¸¸ï¼Œ**ä¸ä¼š**è§¦å‘ï¼ˆé”™è¯¯è¢«æ•èŽ·å¹¶ä»¥é”™è¯¯ JSON å­—ç¬¦ä¸²è¿”å›žï¼Œ`post_tool_call` ä»¥è¯¥é”™è¯¯å­—ç¬¦ä¸²ä½œä¸º `result` è§¦å‘ï¼‰ã€‚

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** è®°å½•å·¥å…·ç»“æžœã€æŒ‡æ ‡é‡‡é›†ã€è¿½è¸ªå·¥å…·æˆåŠŸ/å¤±è´¥çŽ‡ã€å»¶è¿Ÿä»ªè¡¨ç›˜ã€æŒ‰å·¥å…·é¢„ç®—å‘Šè­¦ã€ç‰¹å®šå·¥å…·å®Œæˆæ—¶å‘é€é€šçŸ¥ã€‚

**ç¤ºä¾‹â€”â€”è¿½è¸ªå·¥å…·ä½¿ç”¨æŒ‡æ ‡ï¼š**

```python
from collections import Counter, defaultdict
import json

_tool_counts = Counter()
_error_counts = Counter()
_latency_ms = defaultdict(list)

def track_metrics(tool_name, result, duration_ms=0, **kwargs):
    _tool_counts[tool_name] += 1
    _latency_ms[tool_name].append(duration_ms)
    try:
        parsed = json.loads(result)
        if "error" in parsed:
            _error_counts[tool_name] += 1
    except (json.JSONDecodeError, TypeError):
        pass

def register(ctx):
    ctx.register_hook("post_tool_call", track_metrics)
```

---

### `pre_llm_call`

**æ¯è½®è§¦å‘ä¸€æ¬¡**ï¼Œåœ¨å·¥å…·è°ƒç”¨å¾ªçŽ¯å¼€å§‹å‰ã€‚è¿™æ˜¯**å”¯ä¸€ä¸€ä¸ªè¿”å›žå€¼ä¼šè¢«ä½¿ç”¨çš„ hook**â€”â€”å®ƒå¯ä»¥å°†ä¸Šä¸‹æ–‡æ³¨å…¥å½“å‰è½®æ¬¡çš„ç”¨æˆ·æ¶ˆæ¯ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(session_id: str, user_message: str, conversation_history: list,
                is_first_turn: bool, model: str, platform: str, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `session_id` | `str` | å½“å‰ä¼šè¯çš„å”¯ä¸€æ ‡è¯†ç¬¦ |
| `user_message` | `str` | æœ¬è½®ç”¨æˆ·çš„åŽŸå§‹æ¶ˆæ¯ï¼ˆæŠ€èƒ½æ³¨å…¥å‰ï¼‰ |
| `conversation_history` | `list` | å®Œæ•´æ¶ˆæ¯åˆ—è¡¨çš„å‰¯æœ¬ï¼ˆOpenAI æ ¼å¼ï¼š`[{"role": "user", "content": "..."}]`ï¼‰ |
| `is_first_turn` | `bool` | æ–°ä¼šè¯çš„ç¬¬ä¸€è½®ä¸º `True`ï¼ŒåŽç»­è½®æ¬¡ä¸º `False` |
| `model` | `str` | æ¨¡åž‹æ ‡è¯†ç¬¦ï¼ˆå¦‚ `"anthropic/claude-sonnet-4.6"`ï¼‰ |
| `platform` | `str` | ä¼šè¯è¿è¡ŒçŽ¯å¢ƒï¼š`"cli"`ã€`"telegram"`ã€`"discord"` ç­‰ |

**è§¦å‘ä½ç½®ï¼š** `run_agent.py` ä¸­çš„ `run_conversation()` å†…ï¼Œä¸Šä¸‹æ–‡åŽ‹ç¼©åŽã€ä¸» `while` å¾ªçŽ¯å‰ã€‚æ¯æ¬¡ `run_conversation()` è°ƒç”¨è§¦å‘ä¸€æ¬¡ï¼ˆå³æ¯ä¸ªç”¨æˆ·è½®æ¬¡ä¸€æ¬¡ï¼‰ï¼Œè€Œéžå·¥å…·å¾ªçŽ¯å†…æ¯æ¬¡ API è°ƒç”¨è§¦å‘ä¸€æ¬¡ã€‚

**è¿”å›žå€¼ï¼š** è‹¥å›žè°ƒè¿”å›žåŒ…å« `"context"` é”®çš„å­—å…¸ï¼Œæˆ–éžç©ºçš„æ™®é€šå­—ç¬¦ä¸²ï¼Œè¯¥æ–‡æœ¬ä¼šè¿½åŠ åˆ°å½“å‰è½®æ¬¡çš„ç”¨æˆ·æ¶ˆæ¯ã€‚è¿”å›ž `None` è¡¨ç¤ºä¸æ³¨å…¥ã€‚

```python
# æ³¨å…¥ä¸Šä¸‹æ–‡
return {"context": "Recalled memories:\n- User likes Python\n- Working on zed-agent"}

# æ™®é€šå­—ç¬¦ä¸²ï¼ˆç­‰æ•ˆï¼‰
return "Recalled memories:\n- User likes Python"

# ä¸æ³¨å…¥
return None
```

**ä¸Šä¸‹æ–‡æ³¨å…¥ä½ç½®ï¼š** å§‹ç»ˆæ³¨å…¥åˆ°**ç”¨æˆ·æ¶ˆæ¯**ï¼Œè€Œéžç³»ç»Ÿ promptã€‚è¿™ä¿ç•™äº† prompt ç¼“å­˜â€”â€”ç³»ç»Ÿ prompt åœ¨å„è½®æ¬¡é—´ä¿æŒä¸å˜ï¼Œå·²ç¼“å­˜çš„ token å¾—ä»¥å¤ç”¨ã€‚ç³»ç»Ÿ prompt æ˜¯ Zed çš„é¢†åŸŸï¼ˆæ¨¡åž‹æŒ‡å¯¼ã€å·¥å…·æ‰§è¡Œã€ä¸ªæ€§ã€æŠ€èƒ½ï¼‰ã€‚æ’ä»¶åœ¨ç”¨æˆ·è¾“å…¥æ—è¾¹è´¡çŒ®ä¸Šä¸‹æ–‡ã€‚

æ‰€æœ‰æ³¨å…¥çš„ä¸Šä¸‹æ–‡å‡ä¸º**ä¸´æ—¶æ€§çš„**â€”â€”ä»…åœ¨ API è°ƒç”¨æ—¶æ·»åŠ ã€‚å¯¹è¯åŽ†å²ä¸­çš„åŽŸå§‹ç”¨æˆ·æ¶ˆæ¯ä¸ä¼šè¢«ä¿®æ”¹ï¼Œä¹Ÿä¸ä¼šæŒä¹…åŒ–åˆ°ä¼šè¯æ•°æ®åº“ã€‚

å½“**å¤šä¸ªæ’ä»¶**è¿”å›žä¸Šä¸‹æ–‡æ—¶ï¼Œå…¶è¾“å‡ºæŒ‰æ’ä»¶å‘çŽ°é¡ºåºï¼ˆæŒ‰ç›®å½•åå­—æ¯é¡ºåºï¼‰ä»¥åŒæ¢è¡Œç¬¦è¿žæŽ¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** è®°å¿†å¬å›žã€RAG ä¸Šä¸‹æ–‡æ³¨å…¥ã€æŠ¤æ ã€æ¯è½®åˆ†æžã€‚

**ç¤ºä¾‹â€”â€”è®°å¿†å¬å›žï¼š**

```python
import httpx

MEMORY_API = "https://your-memory-api.example.com"

def recall(session_id, user_message, is_first_turn, **kwargs):
    try:
        resp = httpx.post(f"{MEMORY_API}/recall", json={
            "session_id": session_id,
            "query": user_message,
        }, timeout=3)
        memories = resp.json().get("results", [])
        if not memories:
            return None
        text = "Recalled context:\n" + "\n".join(f"- {m['text']}" for m in memories)
        return {"context": text}
    except Exception:
        return None

def register(ctx):
    ctx.register_hook("pre_llm_call", recall)
```

**ç¤ºä¾‹â€”â€”æŠ¤æ ï¼š**

```python
POLICY = "Never execute commands that delete files without explicit user confirmation."

def guardrails(**kwargs):
    return {"context": POLICY}

def register(ctx):
    ctx.register_hook("pre_llm_call", guardrails)
```

---

### `post_llm_call`

**æ¯è½®è§¦å‘ä¸€æ¬¡**ï¼Œåœ¨å·¥å…·è°ƒç”¨å¾ªçŽ¯å®Œæˆä¸” agent äº§ç”Ÿæœ€ç»ˆå“åº”åŽã€‚ä»…åœ¨**æˆåŠŸ**çš„è½®æ¬¡è§¦å‘â€”â€”è‹¥è½®æ¬¡è¢«ä¸­æ–­åˆ™ä¸è§¦å‘ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(session_id: str, user_message: str, assistant_response: str,
                conversation_history: list, model: str, platform: str, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `session_id` | `str` | å½“å‰ä¼šè¯çš„å”¯ä¸€æ ‡è¯†ç¬¦ |
| `user_message` | `str` | æœ¬è½®ç”¨æˆ·çš„åŽŸå§‹æ¶ˆæ¯ |
| `assistant_response` | `str` | Agent æœ¬è½®çš„æœ€ç»ˆæ–‡æœ¬å“åº” |
| `conversation_history` | `list` | è½®æ¬¡å®ŒæˆåŽå®Œæ•´æ¶ˆæ¯åˆ—è¡¨çš„å‰¯æœ¬ |
| `model` | `str` | æ¨¡åž‹æ ‡è¯†ç¬¦ |
| `platform` | `str` | ä¼šè¯è¿è¡ŒçŽ¯å¢ƒ |

**è§¦å‘ä½ç½®ï¼š** `run_agent.py` ä¸­çš„ `run_conversation()` å†…ï¼Œå·¥å…·å¾ªçŽ¯ä»¥æœ€ç»ˆå“åº”é€€å‡ºåŽã€‚å— `if final_response and not interrupted` ä¿æŠ¤â€”â€”å› æ­¤å½“ç”¨æˆ·åœ¨è½®æ¬¡ä¸­é€”ä¸­æ–­ï¼Œæˆ– agent åœ¨æœªäº§ç”Ÿå“åº”çš„æƒ…å†µä¸‹è¾¾åˆ°è¿­ä»£ä¸Šé™æ—¶ï¼Œ**ä¸ä¼š**è§¦å‘ã€‚

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** å°†å¯¹è¯æ•°æ®åŒæ­¥åˆ°å¤–éƒ¨è®°å¿†ç³»ç»Ÿã€è®¡ç®—å“åº”è´¨é‡æŒ‡æ ‡ã€è®°å½•è½®æ¬¡æ‘˜è¦ã€è§¦å‘åŽç»­æ“ä½œã€‚

**ç¤ºä¾‹â€”â€”åŒæ­¥åˆ°å¤–éƒ¨è®°å¿†ï¼š**

```python
import httpx

MEMORY_API = "https://your-memory-api.example.com"

def sync_memory(session_id, user_message, assistant_response, **kwargs):
    try:
        httpx.post(f"{MEMORY_API}/store", json={
            "session_id": session_id,
            "user": user_message,
            "assistant": assistant_response,
        }, timeout=5)
    except Exception:
        pass  # best-effort

def register(ctx):
    ctx.register_hook("post_llm_call", sync_memory)
```

**ç¤ºä¾‹â€”â€”è¿½è¸ªå“åº”é•¿åº¦ï¼š**

```python
import logging
logger = logging.getLogger(__name__)

def log_response_length(session_id, assistant_response, model, **kwargs):
    logger.info("RESPONSE session=%s model=%s chars=%d",
                session_id, model, len(assistant_response or ""))

def register(ctx):
    ctx.register_hook("post_llm_call", log_response_length)
```

---

### `on_session_start`

åœ¨å…¨æ–°ä¼šè¯åˆ›å»ºæ—¶è§¦å‘**ä¸€æ¬¡**ã€‚åœ¨ä¼šè¯å»¶ç»­æ—¶**ä¸ä¼š**è§¦å‘ï¼ˆç”¨æˆ·åœ¨å·²æœ‰ä¼šè¯ä¸­å‘é€ç¬¬äºŒæ¡æ¶ˆæ¯æ—¶ï¼‰ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(session_id: str, model: str, platform: str, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `session_id` | `str` | æ–°ä¼šè¯çš„å”¯ä¸€æ ‡è¯†ç¬¦ |
| `model` | `str` | æ¨¡åž‹æ ‡è¯†ç¬¦ |
| `platform` | `str` | ä¼šè¯è¿è¡ŒçŽ¯å¢ƒ |

**è§¦å‘ä½ç½®ï¼š** `run_agent.py` ä¸­çš„ `run_conversation()` å†…ï¼Œæ–°ä¼šè¯ç¬¬ä¸€è½®æœŸé—´â€”â€”å…·ä½“åœ¨ç³»ç»Ÿ prompt æž„å»ºåŽã€å·¥å…·å¾ªçŽ¯å¼€å§‹å‰ã€‚æ£€æŸ¥æ¡ä»¶ä¸º `if not conversation_history`ï¼ˆæ— åŽ†å²æ¶ˆæ¯ = æ–°ä¼šè¯ï¼‰ã€‚

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** åˆå§‹åŒ–ä¼šè¯çº§çŠ¶æ€ã€é¢„çƒ­ç¼“å­˜ã€å‘å¤–éƒ¨æœåŠ¡æ³¨å†Œä¼šè¯ã€è®°å½•ä¼šè¯å¼€å§‹ã€‚

**ç¤ºä¾‹â€”â€”åˆå§‹åŒ–ä¼šè¯ç¼“å­˜ï¼š**

```python
_session_caches = {}

def init_session(session_id, model, platform, **kwargs):
    _session_caches[session_id] = {
        "model": model,
        "platform": platform,
        "tool_calls": 0,
        "started": __import__("datetime").datetime.now().isoformat(),
    }

def register(ctx):
    ctx.register_hook("on_session_start", init_session)
```

---

### `on_session_end`

åœ¨æ¯æ¬¡ `run_conversation()` è°ƒç”¨**ç»“æŸæ—¶**è§¦å‘ï¼Œæ— è®ºç»“æžœå¦‚ä½•ã€‚è‹¥ç”¨æˆ·åœ¨ agent å¤„ç†è¿‡ç¨‹ä¸­é€€å‡ºï¼Œä¹Ÿä¼šä»Ž CLI çš„é€€å‡ºå¤„ç†å™¨è§¦å‘ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(session_id: str, completed: bool, interrupted: bool,
                model: str, platform: str, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `session_id` | `str` | ä¼šè¯çš„å”¯ä¸€æ ‡è¯†ç¬¦ |
| `completed` | `bool` | Agent äº§ç”Ÿæœ€ç»ˆå“åº”æ—¶ä¸º `True`ï¼Œå¦åˆ™ä¸º `False` |
| `interrupted` | `bool` | è½®æ¬¡è¢«ä¸­æ–­æ—¶ä¸º `True`ï¼ˆç”¨æˆ·å‘é€æ–°æ¶ˆæ¯ã€`/stop` æˆ–é€€å‡ºï¼‰ |
| `model` | `str` | æ¨¡åž‹æ ‡è¯†ç¬¦ |
| `platform` | `str` | ä¼šè¯è¿è¡ŒçŽ¯å¢ƒ |

**è§¦å‘ä½ç½®ï¼š** ä¸¤å¤„ï¼š
1. **`run_agent.py`** â€” æ¯æ¬¡ `run_conversation()` è°ƒç”¨ç»“æŸæ—¶ï¼Œæ‰€æœ‰æ¸…ç†å®ŒæˆåŽã€‚å§‹ç»ˆè§¦å‘ï¼Œå³ä½¿è½®æ¬¡å‡ºé”™ã€‚
2. **`cli.py`** â€” CLI çš„ atexit å¤„ç†å™¨ä¸­ï¼Œä½†**ä»…å½“** agent åœ¨é€€å‡ºæ—¶å¤„äºŽå¤„ç†ä¸­çŠ¶æ€ï¼ˆ`_agent_running=True`ï¼‰ã€‚è¿™æ•èŽ·äº†å¤„ç†è¿‡ç¨‹ä¸­çš„ Ctrl+C å’Œ `/exit`ã€‚æ­¤æ—¶ `completed=False`ï¼Œ`interrupted=True`ã€‚

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** åˆ·æ–°ç¼“å†²åŒºã€å…³é—­è¿žæŽ¥ã€æŒä¹…åŒ–ä¼šè¯çŠ¶æ€ã€è®°å½•ä¼šè¯æ—¶é•¿ã€æ¸…ç† `on_session_start` ä¸­åˆå§‹åŒ–çš„èµ„æºã€‚

**ç¤ºä¾‹â€”â€”åˆ·æ–°å¹¶æ¸…ç†ï¼š**

```python
_session_caches = {}

def cleanup_session(session_id, completed, interrupted, **kwargs):
    cache = _session_caches.pop(session_id, None)
    if cache:
        # Flush accumulated data to disk or external service
        status = "completed" if completed else ("interrupted" if interrupted else "failed")
        print(f"Session {session_id} ended: {status}, {cache['tool_calls']} tool calls")

def register(ctx):
    ctx.register_hook("on_session_end", cleanup_session)
```

**ç¤ºä¾‹â€”â€”ä¼šè¯æ—¶é•¿è¿½è¸ªï¼š**

```python
import time, logging
logger = logging.getLogger(__name__)

_start_times = {}

def on_start(session_id, **kwargs):
    _start_times[session_id] = time.time()

def on_end(session_id, completed, interrupted, **kwargs):
    start = _start_times.pop(session_id, None)
    if start:
        duration = time.time() - start
        logger.info("SESSION_DURATION session=%s seconds=%.1f completed=%s interrupted=%s",
                     session_id, duration, completed, interrupted)

def register(ctx):
    ctx.register_hook("on_session_start", on_start)
    ctx.register_hook("on_session_end", on_end)
```

---

### `on_session_finalize`

å½“ CLI æˆ– gateway **é”€æ¯**æ´»è·ƒä¼šè¯æ—¶è§¦å‘â€”â€”ä¾‹å¦‚ç”¨æˆ·æ‰§è¡Œ `/new`ã€gateway GC äº†ç©ºé—²ä¼šè¯ï¼Œæˆ– CLI åœ¨ agent æ´»è·ƒæ—¶é€€å‡ºã€‚è¿™æ˜¯åœ¨ä¼šè¯èº«ä»½æ¶ˆå¤±å‰åˆ·æ–°ä¸Žè¯¥ä¼šè¯ç»‘å®šçŠ¶æ€çš„æœ€åŽæœºä¼šã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(session_id: str | None, platform: str, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `session_id` | `str` æˆ– `None` | å³å°†é”€æ¯çš„ä¼šè¯ IDã€‚è‹¥æ— æ´»è·ƒä¼šè¯åˆ™å¯èƒ½ä¸º `None`ã€‚ |
| `platform` | `str` | `"cli"` æˆ–æ¶ˆæ¯å¹³å°åç§°ï¼ˆ`"telegram"`ã€`"discord"` ç­‰ï¼‰ã€‚ |

**è§¦å‘ä½ç½®ï¼š** `cli.py`ï¼ˆ`/new` / CLI é€€å‡ºæ—¶ï¼‰å’Œ `gateway/run.py`ï¼ˆä¼šè¯é‡ç½®æˆ– GC æ—¶ï¼‰ã€‚åœ¨ gateway ä¾§å§‹ç»ˆä¸Ž `on_session_reset` é…å¯¹ã€‚

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** åœ¨ä¼šè¯ ID è¢«ä¸¢å¼ƒå‰æŒä¹…åŒ–æœ€ç»ˆä¼šè¯æŒ‡æ ‡ã€å…³é—­æ¯ä¼šè¯èµ„æºã€å‘å‡ºæœ€ç»ˆé¥æµ‹äº‹ä»¶ã€æŽ’ç©ºé˜Ÿåˆ—å†™å…¥ã€‚

---

### `on_session_reset`

å½“ gateway ä¸ºæ´»è·ƒèŠå¤©**æ¢å…¥æ–°ä¼šè¯ key** æ—¶è§¦å‘â€”â€”ç”¨æˆ·è°ƒç”¨äº† `/new`ã€`/reset`ã€`/clear`ï¼Œæˆ–é€‚é…å™¨åœ¨ç©ºé—²çª—å£åŽé€‰æ‹©äº†æ–°ä¼šè¯ã€‚è¿™è®©æ’ä»¶èƒ½åœ¨ä¸ç­‰å¾…ä¸‹ä¸€ä¸ª `on_session_start` çš„æƒ…å†µä¸‹å“åº”å¯¹è¯çŠ¶æ€å·²è¢«æ¸…é™¤è¿™ä¸€äº‹å®žã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(session_id: str, platform: str, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `session_id` | `str` | æ–°ä¼šè¯çš„ IDï¼ˆå·²è½®æ¢ä¸ºæ–°å€¼ï¼‰ã€‚ |
| `platform` | `str` | æ¶ˆæ¯å¹³å°åç§°ã€‚ |

**è§¦å‘ä½ç½®ï¼š** `gateway/run.py` ä¸­ï¼Œæ–°ä¼šè¯ key åˆ†é…åŽã€ä¸‹ä¸€æ¡å…¥ç«™æ¶ˆæ¯å¤„ç†å‰ç«‹å³è§¦å‘ã€‚åœ¨ gateway ä¾§ï¼Œé¡ºåºä¸ºï¼š`on_session_finalize(old_id)` â†’ åˆ‡æ¢ â†’ `on_session_reset(new_id)` â†’ ç¬¬ä¸€æ¡å…¥ç«™æ¶ˆæ¯æ—¶çš„ `on_session_start(new_id)`ã€‚

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** é‡ç½®ä»¥ `session_id` ä¸ºé”®çš„æ¯ä¼šè¯ç¼“å­˜ã€å‘å‡º"ä¼šè¯å·²è½®æ¢"åˆ†æžäº‹ä»¶ã€åˆå§‹åŒ–æ–°çŠ¶æ€æ¡¶ã€‚

---

å‚è§ **[æž„å»ºæ’ä»¶æŒ‡å—](/guides/build-a-zed-plugin)**ï¼ŒèŽ·å–åŒ…å«å·¥å…· schemaã€å¤„ç†å™¨å’Œé«˜çº§ hook æ¨¡å¼çš„å®Œæ•´æ¼”ç»ƒã€‚

---

### `subagent_stop`

`delegate_task` å®ŒæˆåŽï¼Œ**æ¯ä¸ªå­ agent è§¦å‘ä¸€æ¬¡**ã€‚æ— è®ºä½ å§”æ‰˜äº†å•ä¸ªä»»åŠ¡è¿˜æ˜¯ä¸‰ä¸ªä»»åŠ¡çš„æ‰¹æ¬¡ï¼Œæ­¤ hook å¯¹æ¯ä¸ªå­ agent å„è§¦å‘ä¸€æ¬¡ï¼Œåœ¨çˆ¶çº¿ç¨‹ä¸Šä¸²è¡Œæ‰§è¡Œã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(parent_session_id: str, child_role: str | None,
                child_summary: str | None, child_status: str,
                duration_ms: int, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `parent_session_id` | `str` | å§”æ‰˜çˆ¶ agent çš„ä¼šè¯ ID |
| `child_role` | `str \| None` | å­ agent ä¸Šè®¾ç½®çš„ç¼–æŽ’è§’è‰²æ ‡ç­¾ï¼ˆè‹¥åŠŸèƒ½æœªå¯ç”¨åˆ™ä¸º `None`ï¼‰ |
| `child_summary` | `str \| None` | å­ agent è¿”å›žç»™çˆ¶ agent çš„æœ€ç»ˆå“åº” |
| `child_status` | `str` | `"completed"`ã€`"failed"`ã€`"interrupted"` æˆ– `"error"` |
| `duration_ms` | `int` | è¿è¡Œå­ agent çš„æŒ‚é’Ÿæ—¶é—´ï¼Œå•ä½æ¯«ç§’ |

**è§¦å‘ä½ç½®ï¼š** `tools/delegate_tool.py` ä¸­ï¼Œ`ThreadPoolExecutor.as_completed()` æŽ’ç©ºæ‰€æœ‰å­ future åŽã€‚è§¦å‘è¢«ç¼–æŽ’åˆ°çˆ¶çº¿ç¨‹ï¼Œå› æ­¤ hook ä½œè€…æ— éœ€è€ƒè™‘å¹¶å‘å›žè°ƒæ‰§è¡Œé—®é¢˜ã€‚

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** è®°å½•ç¼–æŽ’æ´»åŠ¨ã€ä¸ºè®¡è´¹ç´¯è®¡å­ agent æ—¶é•¿ã€å†™å…¥å§”æ‰˜åŽå®¡è®¡è®°å½•ã€‚

**ç¤ºä¾‹â€”â€”è®°å½•ç¼–æŽ’å™¨æ´»åŠ¨ï¼š**

```python
import logging
logger = logging.getLogger(__name__)

def log_subagent(parent_session_id, child_role, child_status, duration_ms, **kwargs):
    logger.info(
        "SUBAGENT parent=%s role=%s status=%s duration_ms=%d",
        parent_session_id, child_role, child_status, duration_ms,
    )

def register(ctx):
    ctx.register_hook("subagent_stop", log_subagent)
```

:::info
åœ¨å¤§é‡å§”æ‰˜åœºæ™¯ä¸‹ï¼ˆå¦‚ç¼–æŽ’å™¨è§’è‰² Ã— 5 ä¸ªå¶èŠ‚ç‚¹ Ã— åµŒå¥—æ·±åº¦ï¼‰ï¼Œ`subagent_stop` æ¯è½®ä¼šè§¦å‘å¤šæ¬¡ã€‚ä¿æŒå›žè°ƒå¿«é€Ÿæ‰§è¡Œï¼›å°†è€—æ—¶æ“ä½œæŽ¨é€åˆ°åŽå°é˜Ÿåˆ—ã€‚
:::

---

### `pre_gateway_dispatch`

åœ¨ gateway ä¸­ï¼Œ**æ¯æ¡å…¥ç«™ `MessageEvent` è§¦å‘ä¸€æ¬¡**ï¼Œåœ¨å†…éƒ¨äº‹ä»¶å®ˆå«ä¹‹åŽã€è®¤è¯/é…å¯¹å’Œ agent åˆ†å‘**ä¹‹å‰**ã€‚è¿™æ˜¯ gateway çº§æ¶ˆæ¯æµç­–ç•¥ï¼ˆåªå¬ä¸å›žçª—å£ã€äººå·¥æŽ¥ç®¡ã€æŒ‰èŠå¤©è·¯ç”±ç­‰ï¼‰çš„æ‹¦æˆªç‚¹ï¼Œè¿™äº›ç­–ç•¥ä¸é€‚åˆæ”¾åœ¨ä»»ä½•å•ä¸€å¹³å°é€‚é…å™¨ä¸­ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(event, gateway, session_store, **kwargs):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `event` | `MessageEvent` | æ ‡å‡†åŒ–çš„å…¥ç«™æ¶ˆæ¯ï¼ˆåŒ…å« `.text`ã€`.source`ã€`.message_id`ã€`.internal` ç­‰ï¼‰ã€‚ |
| `gateway` | `GatewayRunner` | æ´»è·ƒçš„ gateway è¿è¡Œå™¨ï¼Œæ’ä»¶å¯è°ƒç”¨ `gateway.adapters[platform].send(...)` è¿›è¡Œæ—è·¯å›žå¤ï¼ˆæ‰€æœ‰è€…é€šçŸ¥ç­‰ï¼‰ã€‚ |
| `session_store` | `SessionStore` | ç”¨äºŽé€šè¿‡ `session_store.append_to_transcript(...)` é™é»˜æ‘„å…¥è½¬å½•ã€‚ |

**è§¦å‘ä½ç½®ï¼š** `gateway/run.py` ä¸­çš„ `GatewayRunner._handle_message()` å†…ï¼Œ`is_internal` è®¡ç®—åŽç«‹å³è§¦å‘ã€‚**å†…éƒ¨äº‹ä»¶å®Œå…¨è·³è¿‡æ­¤ hook**ï¼ˆå®ƒä»¬æ˜¯ç³»ç»Ÿç”Ÿæˆçš„â€”â€”åŽå°è¿›ç¨‹å®Œæˆç­‰â€”â€”ä¸å¾—è¢«é¢å‘ç”¨æˆ·çš„ç­–ç•¥æ‹¦æˆªï¼‰ã€‚

**è¿”å›žå€¼ï¼š** `None` æˆ–å­—å…¸ã€‚ç¬¬ä¸€ä¸ªè¢«è¯†åˆ«çš„ action å­—å…¸ç”Ÿæ•ˆï¼›å…¶ä½™æ’ä»¶ç»“æžœè¢«å¿½ç•¥ã€‚æ’ä»¶å›žè°ƒä¸­çš„å¼‚å¸¸ä¼šè¢«æ•èŽ·å¹¶è®°å½•ï¼›gateway åœ¨å‡ºé”™æ—¶å§‹ç»ˆå›žé€€åˆ°æ­£å¸¸åˆ†å‘ã€‚

| è¿”å›žå€¼ | æ•ˆæžœ |
|-------|------|
| `{"action": "skip", "reason": "..."}` | ä¸¢å¼ƒæ¶ˆæ¯â€”â€”æ—  agent å›žå¤ã€æ— é…å¯¹æµç¨‹ã€æ— è®¤è¯ã€‚å‡å®šæ’ä»¶å·²å¤„ç†ï¼ˆå¦‚é™é»˜æ‘„å…¥åˆ°è½¬å½•ï¼‰ã€‚ |
| `{"action": "rewrite", "text": "new text"}` | æ›¿æ¢ `event.text`ï¼Œç„¶åŽä»¥ä¿®æ”¹åŽçš„äº‹ä»¶ç»§ç»­æ­£å¸¸åˆ†å‘ã€‚é€‚ç”¨äºŽå°†ç¼“å†²çš„çŽ¯å¢ƒæ¶ˆæ¯åˆå¹¶ä¸ºå•ä¸ª promptã€‚ |
| `{"action": "allow"}` / `None` | æ­£å¸¸åˆ†å‘â€”â€”è¿è¡Œå®Œæ•´çš„è®¤è¯/é…å¯¹/agent å¾ªçŽ¯é“¾ã€‚ |

**ä½¿ç”¨åœºæ™¯ï¼š** åªå¬ä¸å›žçš„ç¾¤èŠï¼ˆä»…åœ¨è¢« @ æ—¶å“åº”ï¼›å°†çŽ¯å¢ƒæ¶ˆæ¯ç¼“å†²ä¸ºä¸Šä¸‹æ–‡ï¼‰ï¼›äººå·¥æŽ¥ç®¡ï¼ˆæ‰€æœ‰è€…æ‰‹åŠ¨å¤„ç†èŠå¤©æ—¶é™é»˜æ‘„å…¥å®¢æˆ·æ¶ˆæ¯ï¼‰ï¼›æŒ‰ profile é€ŸçŽ‡é™åˆ¶ï¼›ç­–ç•¥é©±åŠ¨çš„è·¯ç”±ã€‚

**ç¤ºä¾‹â€”â€”é™é»˜ä¸¢å¼ƒæœªæŽˆæƒçš„ç§ä¿¡ï¼Œä¸è§¦å‘é…å¯¹ä»£ç ï¼š**

```python
def deny_unauthorized_dms(event, **kwargs):
    src = event.source
    if src.chat_type == "dm" and not _is_approved_user(src.user_id):
        return {"action": "skip", "reason": "unauthorized-dm"}
    return None

def register(ctx):
    ctx.register_hook("pre_gateway_dispatch", deny_unauthorized_dms)
```

**ç¤ºä¾‹â€”â€”åœ¨è¢«æåŠæ—¶å°†çŽ¯å¢ƒæ¶ˆæ¯ç¼“å†²é‡å†™ä¸ºå•ä¸ª promptï¼š**

```python
_buffers = {}

def buffer_or_rewrite(event, **kwargs):
    key = (event.source.platform, event.source.chat_id)
    buf = _buffers.setdefault(key, [])
    if _bot_mentioned(event.text):
        combined = "\n".join(buf + [event.text])
        buf.clear()
        return {"action": "rewrite", "text": combined}
    buf.append(event.text)
    return {"action": "skip", "reason": "ambient-buffered"}

def register(ctx):
    ctx.register_hook("pre_gateway_dispatch", buffer_or_rewrite)
```

---

### `pre_approval_request`

åœ¨å®¡æ‰¹è¯·æ±‚å‘ç”¨æˆ·å±•ç¤º**ä¹‹å‰ç«‹å³**è§¦å‘â€”â€”è¦†ç›–æ‰€æœ‰ç•Œé¢ï¼šäº¤äº’å¼ CLIã€Ink TUIã€gateway å¹³å°ï¼ˆTelegramã€Discordã€Slackã€WhatsAppã€Matrix ç­‰ï¼‰ä»¥åŠ ACP å®¢æˆ·ç«¯ï¼ˆVS Codeã€Zedã€JetBrainsï¼‰ã€‚

è¿™æ˜¯æŽ¥å…¥è‡ªå®šä¹‰é€šçŸ¥å™¨çš„æ­£ç¡®ä½ç½®â€”â€”ä¾‹å¦‚å¼¹å‡ºå…è®¸/æ‹’ç»é€šçŸ¥çš„ macOS èœå•æ åº”ç”¨ï¼Œæˆ–è®°å½•æ¯ä¸ªå¸¦ä¸Šä¸‹æ–‡å®¡æ‰¹è¯·æ±‚çš„å®¡è®¡æ—¥å¿—ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(
    command: str,
    description: str,
    pattern_key: str,
    pattern_keys: list[str],
    session_key: str,
    surface: str,
    **kwargs,
):
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `command` | `str` | ç­‰å¾…å®¡æ‰¹çš„ shell å‘½ä»¤ |
| `description` | `str` | å‘½ä»¤è¢«æ ‡è®°çš„äººç±»å¯è¯»åŽŸå› ï¼ˆå¤šä¸ªæ¨¡å¼åŒ¹é…æ—¶åˆå¹¶ï¼‰ |
| `pattern_key` | `str` | è§¦å‘å®¡æ‰¹çš„ä¸»è¦æ¨¡å¼é”®ï¼ˆå¦‚ `"rm_rf"`ã€`"sudo"`ï¼‰ |
| `pattern_keys` | `list[str]` | æ‰€æœ‰åŒ¹é…çš„æ¨¡å¼é”® |
| `session_key` | `str` | ä¼šè¯æ ‡è¯†ç¬¦ï¼Œç”¨äºŽæŒ‰èŠå¤©é™å®šé€šçŸ¥èŒƒå›´ |
| `surface` | `str` | äº¤äº’å¼ CLI/TUI æç¤ºä¸º `"cli"`ï¼Œå¼‚æ­¥å¹³å°å®¡æ‰¹ä¸º `"gateway"` |

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚æ­¤å¤„çš„ hook ä»…ä½œè§‚å¯Ÿç”¨é€”ï¼›ä¸èƒ½å¦å†³æˆ–é¢„å…ˆå›žç­”å®¡æ‰¹ã€‚ä½¿ç”¨ [`pre_tool_call`](#pre_tool_call) åœ¨å·¥å…·åˆ°è¾¾å®¡æ‰¹ç³»ç»Ÿå‰é˜»æ–­å®ƒã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** æ¡Œé¢é€šçŸ¥ã€æŽ¨é€å‘Šè­¦ã€å®¡è®¡æ—¥å¿—ã€Slack webhookã€å‡çº§è·¯ç”±ã€æŒ‡æ ‡ã€‚

**ç¤ºä¾‹â€”â€”macOS æ¡Œé¢é€šçŸ¥ï¼š**

```python
import subprocess

def notify_approval(command, description, session_key, **kwargs):
    title = "Zed needs approval"
    body = f"{description}: {command[:80]}"
    subprocess.Popen([
        "osascript", "-e",
        f'display notification "{body}" with title "{title}"',
    ])

def register(ctx):
    ctx.register_hook("pre_approval_request", notify_approval)
```

---

### `post_approval_response`

åœ¨ç”¨æˆ·å“åº”å®¡æ‰¹æç¤ºï¼ˆæˆ–æç¤ºè¶…æ—¶ï¼‰**ä¹‹åŽ**è§¦å‘ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(
    command: str,
    description: str,
    pattern_key: str,
    pattern_keys: list[str],
    session_key: str,
    surface: str,
    choice: str,
    **kwargs,
):
```

ä¸Ž `pre_approval_request` ç›¸åŒçš„ kwargsï¼Œå¦åŠ ï¼š

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `choice` | `str` | `"once"`ã€`"session"`ã€`"always"`ã€`"deny"` æˆ– `"timeout"` ä¹‹ä¸€ |

**è¿”å›žå€¼ï¼š** å¿½ç•¥ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** å…³é—­å¯¹åº”çš„æ¡Œé¢é€šçŸ¥ã€åœ¨å®¡è®¡æ—¥å¿—ä¸­è®°å½•æœ€ç»ˆå†³å®šã€æ›´æ–°æŒ‡æ ‡ã€æŽ¨è¿›é€ŸçŽ‡é™åˆ¶å™¨ã€‚

```python
def log_decision(command, choice, session_key, **kwargs):
    logger.info("approval %s: %s for session %s", choice, command[:60], session_key)

def register(ctx):
    ctx.register_hook("post_approval_response", log_decision)
```

---

### `transform_tool_result`

åœ¨å·¥å…·è¿”å›ž**ä¹‹åŽ**ã€ç»“æžœè¿½åŠ åˆ°å¯¹è¯**ä¹‹å‰**è§¦å‘ã€‚å…è®¸æ’ä»¶é‡å†™**ä»»æ„**å·¥å…·çš„ç»“æžœå­—ç¬¦ä¸²â€”â€”ä¸ä»…é™äºŽç»ˆç«¯è¾“å‡ºâ€”â€”åœ¨æ¨¡åž‹çœ‹åˆ°ä¹‹å‰è¿›è¡Œå¤„ç†ã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(
    tool_name: str,
    arguments: dict,
    result: str,
    task_id: str | None,
    **kwargs,
) -> str | None:
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `tool_name` | `str` | äº§ç”Ÿç»“æžœçš„å·¥å…·ï¼ˆ`read_file`ã€`web_extract`ã€`delegate_task` ç­‰ï¼‰ã€‚ |
| `arguments` | `dict` | æ¨¡åž‹è°ƒç”¨å·¥å…·æ—¶ä¼ å…¥çš„å‚æ•°ã€‚ |
| `result` | `str` | å·¥å…·çš„åŽŸå§‹ç»“æžœå­—ç¬¦ä¸²ï¼Œæˆªæ–­å’Œ ANSI å‰¥ç¦»åŽã€‚ |
| `task_id` | `str \| None` | åœ¨ RL/åŸºå‡†æµ‹è¯•çŽ¯å¢ƒä¸­è¿è¡Œæ—¶çš„ä»»åŠ¡/ä¼šè¯ IDã€‚ |

**è¿”å›žå€¼ï¼š** `str` æ›¿æ¢ç»“æžœï¼ˆè¿”å›žçš„å­—ç¬¦ä¸²å³æ¨¡åž‹çœ‹åˆ°çš„å†…å®¹ï¼‰ï¼Œ`None` ä¿æŒä¸å˜ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** ä»Ž `web_extract` è¾“å‡ºä¸­è„±æ•ç»„ç»‡ç‰¹å®šçš„ PIIã€ä¸ºé•¿ JSON å·¥å…·å“åº”æ·»åŠ æ‘˜è¦å¤´ã€å‘ `read_file` ç»“æžœæ³¨å…¥æ£€ç´¢å¢žå¼ºæç¤ºã€å°† `delegate_task` å­ agent æŠ¥å‘Šé‡å†™ä¸ºé¡¹ç›®ç‰¹å®š schemaã€‚

```python
import re
SECRET = re.compile(r"sk-[A-Za-z0-9]{32,}")

def redact_secrets(tool_name, result, **kwargs):
    if SECRET.search(result):
        return SECRET.sub("[REDACTED]", result)
    return None

def register(ctx):
    ctx.register_hook("transform_tool_result", redact_secrets)
```

é€‚ç”¨äºŽæ‰€æœ‰å·¥å…·ã€‚ä»…é’ˆå¯¹ç»ˆç«¯è¾“å‡ºçš„é‡å†™è¯·å‚è§ä¸‹æ–¹çš„ `transform_terminal_output`â€”â€”å®ƒèŒƒå›´æ›´çª„ï¼Œåœ¨ç®¡é“ä¸­è¿è¡Œæ›´æ—©ï¼ˆæˆªæ–­å‰ã€è„±æ•å‰ï¼‰ã€‚

---

### `transform_terminal_output`

åœ¨ `terminal` å·¥å…·çš„å‰å°è¾“å‡ºç®¡é“å†…è§¦å‘ï¼Œåœ¨é»˜è®¤çš„ 50 KB æˆªæ–­ã€ANSI å‰¥ç¦»å’Œå¯†é’¥è„±æ•**ä¹‹å‰**ã€‚å…è®¸æ’ä»¶åœ¨ä»»ä½•ä¸‹æ¸¸å¤„ç†ä¹‹å‰é‡å†™ shell å‘½ä»¤çš„åŽŸå§‹ stdout/stderrã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(
    command: str,
    output: str,
    exit_code: int,
    cwd: str,
    task_id: str | None,
    **kwargs,
) -> str | None:
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `command` | `str` | äº§ç”Ÿè¾“å‡ºçš„ shell å‘½ä»¤ã€‚ |
| `output` | `str` | åŽŸå§‹åˆå¹¶çš„ stdout/stderrï¼ˆå¯èƒ½éžå¸¸å¤§â€”â€”æˆªæ–­åœ¨ hook ä¹‹åŽå‘ç”Ÿï¼‰ã€‚ |
| `exit_code` | `int` | è¿›ç¨‹é€€å‡ºç ã€‚ |
| `cwd` | `str` | å‘½ä»¤è¿è¡Œçš„å·¥ä½œç›®å½•ã€‚ |

**è¿”å›žå€¼ï¼š** `str` æ›¿æ¢è¾“å‡ºï¼Œ`None` ä¿æŒä¸å˜ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** ä¸ºäº§ç”Ÿå¤§é‡è¾“å‡ºçš„å‘½ä»¤æ³¨å…¥æ‘˜è¦ï¼ˆ`du -ah`ã€`find`ã€`tree`ï¼‰ã€ç”¨é¡¹ç›®ç‰¹å®šæ ‡è®°æ ‡æ³¨è¾“å‡ºä»¥ä¾¿ä¸‹æ¸¸ hook å¤„ç†ã€å‰¥ç¦»åœ¨è¿è¡Œé—´æŠ–åŠ¨å¹¶ç ´å prompt ç¼“å­˜çš„è®¡æ—¶å™ªå£°ã€‚

```python
def summarize_find(command, output, **kwargs):
    if command.startswith("find ") and len(output) > 50_000:
        lines = output.count("\n")
        head = "\n".join(output.splitlines()[:40])
        return f"{head}\n\n[summary: {lines} paths total, showing first 40]"
    return None

def register(ctx):
    ctx.register_hook("transform_terminal_output", summarize_find)
```

ä¸Ž `transform_tool_result`ï¼ˆè¦†ç›–æ‰€æœ‰å…¶ä»–å·¥å…·ï¼‰é…åˆä½¿ç”¨æ•ˆæžœæ›´ä½³ã€‚

---

### `transform_llm_output`

**æ¯è½®è§¦å‘ä¸€æ¬¡**ï¼Œåœ¨å·¥å…·è°ƒç”¨å¾ªçŽ¯å®Œæˆä¸”æ¨¡åž‹äº§ç”Ÿæœ€ç»ˆå“åº”åŽã€è¯¥å“åº”äº¤ä»˜ç»™ç”¨æˆ·ï¼ˆCLIã€gateway æˆ–ç¨‹åºè°ƒç”¨æ–¹ï¼‰**ä¹‹å‰**ã€‚å…è®¸æ’ä»¶ä½¿ç”¨ç»å…¸ç¼–ç¨‹æ–¹æ³•é‡å†™ assistant çš„æœ€ç»ˆæ–‡æœ¬â€”â€”æ— éœ€ä¸º SOUL é£Žæ ¼æ–‡æœ¬æˆ–æŠ€èƒ½é©±åŠ¨çš„è½¬æ¢æ¶ˆè€—é¢å¤–æŽ¨ç† tokenã€‚

**å›žè°ƒç­¾åï¼š**

```python
def my_callback(
    response_text: str,
    session_id: str,
    model: str,
    platform: str,
    **kwargs,
) -> str | None:
```

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----|------|------|
| `response_text` | `str` | æœ¬è½® assistant çš„æœ€ç»ˆå“åº”æ–‡æœ¬ã€‚ |
| `session_id` | `str` | æœ¬æ¬¡å¯¹è¯çš„ä¼šè¯ IDï¼ˆä¸€æ¬¡æ€§è¿è¡Œæ—¶å¯èƒ½ä¸ºç©ºï¼‰ã€‚ |
| `model` | `str` | äº§ç”Ÿå“åº”çš„æ¨¡åž‹åç§°ï¼ˆå¦‚ `anthropic/claude-sonnet-4.6`ï¼‰ã€‚ |
| `platform` | `str` | äº¤ä»˜å¹³å°ï¼ˆ`cli`ã€`telegram`ã€`discord` ç­‰ï¼›æœªè®¾ç½®æ—¶ä¸ºç©ºï¼‰ã€‚ |

**è¿”å›žå€¼ï¼š** éžç©º `str` æ›¿æ¢å“åº”æ–‡æœ¬ï¼Œ`None` æˆ–ç©ºå­—ç¬¦ä¸²ä¿æŒä¸å˜ã€‚å½“å¤šä¸ªæ’ä»¶æ³¨å†Œæ—¶ï¼Œ**ç¬¬ä¸€ä¸ªéžç©ºå­—ç¬¦ä¸²ç”Ÿæ•ˆ**â€”â€”ä¸Ž `transform_tool_result` ä¿æŒä¸€è‡´ã€‚

**ä½¿ç”¨åœºæ™¯ï¼š** åº”ç”¨ä¸ªæ€§/è¯æ±‡è½¬æ¢ï¼ˆæµ·ç›—è…”ã€æµ·ç»µå®å®ä½“ï¼‰ã€ä»Žæœ€ç»ˆæ–‡æœ¬ä¸­è„±æ•ç”¨æˆ·ç‰¹å®šæ ‡è¯†ç¬¦ã€è¿½åŠ é¡¹ç›®ç‰¹å®šç­¾åé¡µè„šã€åœ¨ä¸æ¶ˆè€— SOUL æŒ‡ä»¤ token çš„æƒ…å†µä¸‹æ‰§è¡Œå†…éƒ¨é£Žæ ¼æŒ‡å—ã€‚

```python
import os, re

def spongebob(response_text, **kwargs):
    if os.environ.get("SPONGEBOB_MODE") != "on":
        return None  # pass through unchanged
    return re.sub(r"!", "!! Tartar sauce!", response_text)

def register(ctx):
    ctx.register_hook("transform_llm_output", spongebob)
```

æ­¤ hook å—éžç©ºã€éžä¸­æ–­å“åº”ä¿æŠ¤â€”â€”ä¸ä¼šåœ¨åœæ­¢æŒ‰é’®ä¸­æ–­æˆ–ç©ºè½®æ¬¡æ—¶è§¦å‘ã€‚å¼‚å¸¸ä¼šè¢«è®°å½•ä¸ºè­¦å‘Šï¼Œä¸ä¼šä¸­æ–­ agent æ‰§è¡Œã€‚

---

## Shell Hooks

åœ¨ `cli-config.yaml` ä¸­å£°æ˜Ž shell è„šæœ¬ hookï¼ŒZed ä¼šåœ¨å¯¹åº”çš„æ’ä»¶ hook äº‹ä»¶è§¦å‘æ—¶å°†å…¶ä½œä¸ºå­è¿›ç¨‹è¿è¡Œâ€”â€”åœ¨ CLI å’Œ gateway ä¼šè¯ä¸­å‡é€‚ç”¨ã€‚æ— éœ€ç¼–å†™ Python æ’ä»¶ã€‚

å½“ä½ å¸Œæœ›ç”¨ä¸€ä¸ªå³æ’å³ç”¨çš„å•æ–‡ä»¶è„šæœ¬ï¼ˆBashã€Python æˆ–ä»»ä½•å¸¦ shebang çš„è„šæœ¬ï¼‰æ¥å®žçŽ°ä»¥ä¸‹åŠŸèƒ½æ—¶ï¼Œä½¿ç”¨ shell hooksï¼š

- **é˜»æ–­å·¥å…·è°ƒç”¨** â€” æ‹’ç»å±é™©çš„ `terminal` å‘½ä»¤ã€æ‰§è¡ŒæŒ‰ç›®å½•ç­–ç•¥ã€è¦æ±‚å¯¹ç ´åæ€§çš„ `write_file` / `patch` æ“ä½œè¿›è¡Œå®¡æ‰¹ã€‚
- **å·¥å…·è°ƒç”¨åŽè¿è¡Œ** â€” è‡ªåŠ¨æ ¼å¼åŒ– agent åˆšå†™å…¥çš„ Python æˆ– TypeScript æ–‡ä»¶ã€è®°å½• API è°ƒç”¨ã€è§¦å‘ CI å·¥ä½œæµã€‚
- **å‘ä¸‹ä¸€ä¸ª LLM è½®æ¬¡æ³¨å…¥ä¸Šä¸‹æ–‡** â€” åœ¨ç”¨æˆ·æ¶ˆæ¯å‰è¿½åŠ  `git status` è¾“å‡ºã€å½“å‰æ˜ŸæœŸå‡ æˆ–æ£€ç´¢åˆ°çš„æ–‡æ¡£ï¼ˆå‚è§ [`pre_llm_call`](#pre_llm_call)ï¼‰ã€‚
- **è§‚å¯Ÿç”Ÿå‘½å‘¨æœŸäº‹ä»¶** â€” åœ¨å­ agent å®Œæˆï¼ˆ`subagent_stop`ï¼‰æˆ–ä¼šè¯å¼€å§‹ï¼ˆ`on_session_start`ï¼‰æ—¶å†™å…¥æ—¥å¿—è¡Œã€‚

Shell hooks é€šè¿‡åœ¨ CLI å¯åŠ¨ï¼ˆ`zed_cli/main.py`ï¼‰å’Œ gateway å¯åŠ¨ï¼ˆ`gateway/run.py`ï¼‰æ—¶è°ƒç”¨ `agent.shell_hooks.register_from_config(cfg)` æ¥æ³¨å†Œã€‚å®ƒä»¬ä¸Ž Python æ’ä»¶ hook è‡ªç„¶ç»„åˆâ€”â€”ä¸¤è€…éƒ½æµç»åŒä¸€ä¸ªåˆ†å‘å™¨ã€‚

### å¯¹æ¯”ä¸€è§ˆ

| ç»´åº¦ | Shell hooks | [Plugin hooks](#plugin-hooks) | [Gateway hooks](#gateway-event-hooks) |
|------|-------------|-------------------------------|---------------------------------------|
| å£°æ˜Žä½ç½® | `~/.zed/config.yaml` ä¸­çš„ `hooks:` å— | æ’ä»¶ `plugin.yaml` ä¸­çš„ `register()` | `HOOK.yaml` + `handler.py` ç›®å½• |
| å­˜æ”¾ä½ç½® | `~/.zed/agent-hooks/`ï¼ˆçº¦å®šï¼‰ | `~/.zed/plugins/<name>/` | `~/.zed/hooks/<name>/` |
| è¯­è¨€ | ä»»æ„ï¼ˆBashã€Pythonã€Go äºŒè¿›åˆ¶ç­‰ï¼‰ | ä»… Python | ä»… Python |
| è¿è¡ŒçŽ¯å¢ƒ | CLI + Gateway | CLI + Gateway | ä»… Gateway |
| äº‹ä»¶ | `VALID_HOOKS`ï¼ˆå« `subagent_stop`ï¼‰ | `VALID_HOOKS` | Gateway ç”Ÿå‘½å‘¨æœŸï¼ˆ`gateway:startup`ã€`agent:*`ã€`command:*`ï¼‰ |
| å¯é˜»æ–­å·¥å…·è°ƒç”¨ | æ˜¯ï¼ˆ`pre_tool_call`ï¼‰ | æ˜¯ï¼ˆ`pre_tool_call`ï¼‰ | å¦ |
| å¯æ³¨å…¥ LLM ä¸Šä¸‹æ–‡ | æ˜¯ï¼ˆ`pre_llm_call`ï¼‰ | æ˜¯ï¼ˆ`pre_llm_call`ï¼‰ | å¦ |
| æŽˆæƒ | æ¯ä¸ª `(event, command)` å¯¹é¦–æ¬¡ä½¿ç”¨æ—¶æç¤º | éšå¼ï¼ˆPython æ’ä»¶ä¿¡ä»»ï¼‰ | éšå¼ï¼ˆç›®å½•ä¿¡ä»»ï¼‰ |
| è¿›ç¨‹é—´éš”ç¦» | æ˜¯ï¼ˆå­è¿›ç¨‹ï¼‰ | å¦ï¼ˆè¿›ç¨‹å†…ï¼‰ | å¦ï¼ˆè¿›ç¨‹å†…ï¼‰ |

### é…ç½® schema

```yaml
hooks:
  <event_name>:                  # Must be in VALID_HOOKS
    - matcher: "<regex>"         # Optional; used for pre/post_tool_call only
      command: "<shell command>" # Required; runs via shlex.split, shell=False
      timeout: <seconds>         # Optional; default 60, capped at 300

hooks_auto_accept: false         # See "Consent model" below
```

äº‹ä»¶åç§°å¿…é¡»æ˜¯ [plugin hook äº‹ä»¶](#plugin-hooks)ä¹‹ä¸€ï¼›æ‹¼å†™é”™è¯¯ä¼šäº§ç”Ÿ"ä½ æ˜¯å¦æƒ³è¾“å…¥ Xï¼Ÿ"è­¦å‘Šå¹¶è¢«è·³è¿‡ã€‚å•ä¸ªæ¡ç›®ä¸­çš„æœªçŸ¥é”®ä¼šè¢«å¿½ç•¥ï¼›ç¼ºå°‘ `command` ä¼šè·³è¿‡å¹¶å‘å‡ºè­¦å‘Šã€‚`timeout > 300` ä¼šè¢«æˆªæ–­å¹¶å‘å‡ºè­¦å‘Šã€‚

### JSON é€šä¿¡åè®®

æ¯æ¬¡äº‹ä»¶è§¦å‘æ—¶ï¼ŒZed ä¸ºæ¯ä¸ªåŒ¹é…çš„ hookï¼ˆåœ¨ matcher å…è®¸çš„æƒ…å†µä¸‹ï¼‰ç”Ÿæˆä¸€ä¸ªå­è¿›ç¨‹ï¼Œå°† JSON è½½è·é€šè¿‡ **stdin** ä¼ å…¥ï¼Œå¹¶ä»Ž **stdout** è¯»å– JSON å“åº”ã€‚

**stdinâ€”â€”è„šæœ¬æŽ¥æ”¶çš„è½½è·ï¼š**

```json
{
  "hook_event_name": "pre_tool_call",
  "tool_name":       "terminal",
  "tool_input":      {"command": "rm -rf /"},
  "session_id":      "sess_abc123",
  "cwd":             "/home/user/project",
  "extra":           {"task_id": "...", "tool_call_id": "..."}
}
```

å¯¹äºŽéžå·¥å…·äº‹ä»¶ï¼ˆ`pre_llm_call`ã€`subagent_stop`ã€ä¼šè¯ç”Ÿå‘½å‘¨æœŸï¼‰ï¼Œ`tool_name` å’Œ `tool_input` ä¸º `null`ã€‚`extra` å­—å…¸æºå¸¦æ‰€æœ‰äº‹ä»¶ç‰¹å®šçš„ kwargsï¼ˆ`user_message`ã€`conversation_history`ã€`child_role`ã€`duration_ms` ç­‰ï¼‰ã€‚ä¸å¯åºåˆ—åŒ–çš„å€¼ä¼šè¢«å­—ç¬¦ä¸²åŒ–è€Œéžçœç•¥ã€‚

**stdoutâ€”â€”å¯é€‰å“åº”ï¼š**

```jsonc
// Block a pre_tool_call (both shapes accepted; normalised internally):
{"decision": "block", "reason":  "Forbidden: rm -rf"}   // Claude-Code style
{"action":   "block", "message": "Forbidden: rm -rf"}   // Zed-canonical

// Inject context for pre_llm_call:
{"context": "Today is Friday, 2026-04-17"}

// Silent no-op â€” any empty / non-matching output is fine:
```

æ ¼å¼é”™è¯¯çš„ JSONã€éžé›¶é€€å‡ºç å’Œè¶…æ—¶ä¼šè®°å½•è­¦å‘Šï¼Œä½†æ°¸è¿œä¸ä¼šä¸­æ­¢ agent å¾ªçŽ¯ã€‚

### å®žé™…ç¤ºä¾‹

#### 1. æ¯æ¬¡å†™å…¥åŽè‡ªåŠ¨æ ¼å¼åŒ– Python æ–‡ä»¶

```yaml
# ~/.zed/config.yaml
hooks:
  post_tool_call:
    - matcher: "write_file|patch"
      command: "~/.zed/agent-hooks/auto-format.sh"
```

```bash
#!/usr/bin/env bash
# ~/.zed/agent-hooks/auto-format.sh
payload="$(cat -)"
path=$(echo "$payload" | jq -r '.tool_input.path // empty')
[[ "$path" == *.py ]] && command -v black >/dev/null && black "$path" 2>/dev/null
printf '{}\n'
```

Agent çš„ä¸Šä¸‹æ–‡å†…æ–‡ä»¶è§†å›¾**ä¸ä¼š**è‡ªåŠ¨é‡æ–°è¯»å–â€”â€”é‡æ–°æ ¼å¼åŒ–ä»…å½±å“ç£ç›˜ä¸Šçš„æ–‡ä»¶ã€‚åŽç»­çš„ `read_file` è°ƒç”¨ä¼šè¯»å–æ ¼å¼åŒ–åŽçš„ç‰ˆæœ¬ã€‚

#### 2. é˜»æ–­ç ´åæ€§ `terminal` å‘½ä»¤

```yaml
hooks:
  pre_tool_call:
    - matcher: "terminal"
      command: "~/.zed/agent-hooks/block-rm-rf.sh"
      timeout: 5
```

```bash
#!/usr/bin/env bash
# ~/.zed/agent-hooks/block-rm-rf.sh
payload="$(cat -)"
cmd=$(echo "$payload" | jq -r '.tool_input.command // empty')
if echo "$cmd" | grep -qE 'rm[[:space:]]+-rf?[[:space:]]+/'; then
  printf '{"decision": "block", "reason": "blocked: rm -rf / is not permitted"}\n'
else
  printf '{}\n'
fi
```

#### 3. å‘æ¯è½®æ³¨å…¥ `git status`ï¼ˆClaude-Code `UserPromptSubmit` ç­‰æ•ˆï¼‰

```yaml
hooks:
  pre_llm_call:
    - command: "~/.zed/agent-hooks/inject-cwd-context.sh"
```

```bash
#!/usr/bin/env bash
# ~/.zed/agent-hooks/inject-cwd-context.sh
cat - >/dev/null   # discard stdin payload
if status=$(git status --porcelain 2>/dev/null) && [[ -n "$status" ]]; then
  jq --null-input --arg s "$status" \
     '{context: ("Uncommitted changes in cwd:\n" + $s)}'
else
  printf '{}\n'
fi
```

Claude Code çš„ `UserPromptSubmit` äº‹ä»¶åœ¨ Zed ä¸­æ²¡æœ‰å¯¹åº”çš„ç‹¬ç«‹äº‹ä»¶â€”â€”`pre_llm_call` åœ¨ç›¸åŒä½ç½®è§¦å‘ï¼Œä¸”å·²æ”¯æŒä¸Šä¸‹æ–‡æ³¨å…¥ã€‚åœ¨æ­¤ä½¿ç”¨å³å¯ã€‚

#### 4. è®°å½•æ¯æ¬¡å­ agent å®Œæˆ

```yaml
hooks:
  subagent_stop:
    - command: "~/.zed/agent-hooks/log-orchestration.sh"
```

```bash
#!/usr/bin/env bash
# ~/.zed/agent-hooks/log-orchestration.sh
log=~/.zed/logs/orchestration.log
jq -c '{ts: now, parent: .session_id, extra: .extra}' < /dev/stdin >> "$log"
printf '{}\n'
```

### æŽˆæƒæ¨¡åž‹

æ¯ä¸ªå”¯ä¸€çš„ `(event, command)` å¯¹åœ¨ Zed é¦–æ¬¡é‡åˆ°æ—¶ä¼šæç¤ºç”¨æˆ·å®¡æ‰¹ï¼Œç„¶åŽå°†å†³å®šæŒä¹…åŒ–åˆ° `~/.zed/shell-hooks-allowlist.json`ã€‚åŽç»­è¿è¡Œï¼ˆCLI æˆ– gatewayï¼‰è·³è¿‡æç¤ºã€‚

ä¸‰ç§æ–¹å¼å¯ç»•è¿‡äº¤äº’å¼æç¤ºâ€”â€”æ»¡è¶³å…¶ä¸€å³å¯ï¼š

1. CLI ä¸Šçš„ `--accept-hooks` æ ‡å¿—ï¼ˆå¦‚ `zed --accept-hooks chat`ï¼‰
2. `ZED_ACCEPT_HOOKS=1` çŽ¯å¢ƒå˜é‡
3. `cli-config.yaml` ä¸­çš„ `hooks_auto_accept: true`

éž TTY è¿è¡Œï¼ˆgatewayã€cronã€CIï¼‰éœ€è¦è¿™ä¸‰ç§æ–¹å¼ä¹‹ä¸€â€”â€”å¦åˆ™ä»»ä½•æ–°æ·»åŠ çš„ hook ä¼šé™é»˜ä¿æŒæœªæ³¨å†ŒçŠ¶æ€å¹¶è®°å½•è­¦å‘Šã€‚

**è„šæœ¬ç¼–è¾‘è¢«é™é»˜ä¿¡ä»»ã€‚** å…è®¸åˆ—è¡¨ä»¥ç²¾ç¡®çš„å‘½ä»¤å­—ç¬¦ä¸²ä¸ºé”®ï¼Œè€Œéžè„šæœ¬çš„å“ˆå¸Œå€¼ï¼Œå› æ­¤ç¼–è¾‘ç£ç›˜ä¸Šçš„è„šæœ¬ä¸ä¼šä½¿æŽˆæƒå¤±æ•ˆã€‚`zed hooks doctor` ä¼šæ ‡è®° mtime æ¼‚ç§»ï¼Œä»¥ä¾¿ä½ å‘çŽ°ç¼–è¾‘å¹¶å†³å®šæ˜¯å¦é‡æ–°å®¡æ‰¹ã€‚

### `zed hooks` CLI

| å‘½ä»¤ | åŠŸèƒ½ |
|------|------|
| `zed hooks list` | åˆ—å‡ºå·²é…ç½®çš„ hookï¼ŒåŒ…å« matcherã€è¶…æ—¶å’ŒæŽˆæƒçŠ¶æ€ |
| `zed hooks test <event> [--for-tool X] [--payload-file F]` | å¯¹åˆæˆè½½è·è§¦å‘æ‰€æœ‰åŒ¹é…çš„ hook å¹¶æ‰“å°è§£æžåŽçš„å“åº” |
| `zed hooks revoke <command>` | åˆ é™¤æ‰€æœ‰åŒ¹é… `<command>` çš„å…è®¸åˆ—è¡¨æ¡ç›®ï¼ˆä¸‹æ¬¡é‡å¯åŽç”Ÿæ•ˆï¼‰ |
| `zed hooks doctor` | å¯¹æ¯ä¸ªå·²é…ç½®çš„ hook æ£€æŸ¥ï¼šæ‰§è¡Œä½ã€å…è®¸åˆ—è¡¨çŠ¶æ€ã€mtime æ¼‚ç§»ã€JSON è¾“å‡ºæœ‰æ•ˆæ€§å’Œå¤§è‡´æ‰§è¡Œæ—¶é—´ |

### å®‰å…¨æ€§

Shell hooks ä»¥**ä½ çš„å®Œæ•´ç”¨æˆ·å‡­æ®**è¿è¡Œâ€”â€”ä¸Ž cron æ¡ç›®æˆ– shell åˆ«åçš„ä¿¡ä»»è¾¹ç•Œç›¸åŒã€‚å°† `config.yaml` ä¸­çš„ `hooks:` å—è§†ä¸ºç‰¹æƒé…ç½®ï¼š

- åªå¼•ç”¨ä½ è‡ªå·±ç¼–å†™æˆ–å®Œæ•´å®¡æŸ¥è¿‡çš„è„šæœ¬ã€‚
- å°†è„šæœ¬ä¿å­˜åœ¨ `~/.zed/agent-hooks/` å†…ï¼Œä¾¿äºŽå®¡è®¡è·¯å¾„ã€‚
- æ‹‰å–å…±äº«é…ç½®åŽé‡æ–°è¿è¡Œ `zed hooks doctor`ï¼Œåœ¨æ–°æ·»åŠ çš„ hook æ³¨å†Œå‰å‘çŽ°å®ƒä»¬ã€‚
- å¦‚æžœä½ çš„ config.yaml åœ¨å›¢é˜Ÿä¸­è¿›è¡Œç‰ˆæœ¬æŽ§åˆ¶ï¼Œå®¡æŸ¥ä¿®æ”¹ `hooks:` éƒ¨åˆ†çš„ PR æ—¶åº”ä¸Žå®¡æŸ¥ CI é…ç½®ä¸€æ ·ä¸¥æ ¼ã€‚

### é¡ºåºä¸Žä¼˜å…ˆçº§

Python æ’ä»¶ hook å’Œ shell hook éƒ½æµç»åŒä¸€ä¸ª `invoke_hook()` åˆ†å‘å™¨ã€‚Python æ’ä»¶å…ˆæ³¨å†Œï¼ˆ`discover_and_load()`ï¼‰ï¼Œshell hook åŽæ³¨å†Œï¼ˆ`register_from_config()`ï¼‰ï¼Œå› æ­¤åœ¨å¹³å±€æƒ…å†µä¸‹ Python `pre_tool_call` çš„ block å†³å®šä¼˜å…ˆã€‚ç¬¬ä¸€ä¸ªæœ‰æ•ˆçš„ block ç”Ÿæ•ˆâ€”â€”èšåˆå™¨åœ¨ä»»ä½•å›žè°ƒäº§ç”Ÿå¸¦éžç©º message çš„ `{"action": "block", "message": str}` æ—¶ç«‹å³è¿”å›žã€‚