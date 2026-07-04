---
sidebar_position: 9
sidebar_label: "Build a Plugin"
title: "æž„å»º Zed æ’ä»¶"
description: "é€æ­¥æŒ‡å—ï¼šæž„å»ºåŒ…å«å·¥å…·ã€é’©å­ã€æ•°æ®æ–‡ä»¶å’ŒæŠ€èƒ½çš„å®Œæ•´ Zed æ’ä»¶"
---

# æž„å»º Zed æ’ä»¶

æœ¬æŒ‡å—ä»Žé›¶å¼€å§‹æž„å»ºä¸€ä¸ªå®Œæ•´çš„ Zed æ’ä»¶ã€‚å®ŒæˆåŽï¼Œä½ å°†æ‹¥æœ‰ä¸€ä¸ªåŒ…å«å¤šä¸ªå·¥å…·ã€ç”Ÿå‘½å‘¨æœŸé’©å­ï¼ˆhookï¼‰ã€éšé™„æ•°æ®æ–‡ä»¶å’Œæ†ç»‘æŠ€èƒ½çš„å¯ç”¨æ’ä»¶â€”â€”æ¶µç›–æ’ä»¶ç³»ç»Ÿæ”¯æŒçš„æ‰€æœ‰åŠŸèƒ½ã€‚

:::info ä¸ç¡®å®šéœ€è¦å“ªä»½æŒ‡å—ï¼Ÿ
Zed æœ‰å¤šç§ä¸åŒçš„å¯æ’æ‹”æŽ¥å£â€”â€”æœ‰äº›ä½¿ç”¨ Python `register_*` APIï¼Œå¦ä¸€äº›æ˜¯é…ç½®é©±åŠ¨æˆ–æ”¾å…¥æŒ‡å®šç›®å½•å³å¯ç”Ÿæ•ˆã€‚è¯·å…ˆæŸ¥é˜…ä¸‹è¡¨ï¼š

| å¦‚æžœä½ æƒ³æ·»åŠ â€¦ | è¯·é˜…è¯» |
|---|---|
| è‡ªå®šä¹‰å·¥å…·ã€é’©å­ã€æ–œæ å‘½ä»¤ã€æŠ€èƒ½æˆ– CLI å­å‘½ä»¤ | **æœ¬æŒ‡å—**ï¼ˆé€šç”¨æ’ä»¶æŽ¥å£ï¼‰ |
| **LLM / æŽ¨ç†åŽç«¯**ï¼ˆæ–°æä¾›å•†ï¼‰ | [æ¨¡åž‹æä¾›å•†æ’ä»¶](/developer-guide/model-provider-plugin) |
| **ç½‘å…³é¢‘é“**ï¼ˆDiscord/Telegram/IRC/Teams ç­‰ï¼‰ | [æ·»åŠ å¹³å°é€‚é…å™¨](/developer-guide/adding-platform-adapters) |
| **è®°å¿†åŽç«¯**ï¼ˆHoncho/Mem0/Supermemory ç­‰ï¼‰ | [è®°å¿†æä¾›å•†æ’ä»¶](/developer-guide/memory-provider-plugin) |
| **ä¸Šä¸‹æ–‡åŽ‹ç¼©å¼•æ“Ž** | [ä¸Šä¸‹æ–‡å¼•æ“Žæ’ä»¶](/developer-guide/context-engine-plugin) |
| **å›¾åƒç”ŸæˆåŽç«¯** | [å›¾åƒç”Ÿæˆæä¾›å•†æ’ä»¶](/developer-guide/image-gen-provider-plugin) |
| **è§†é¢‘ç”ŸæˆåŽç«¯** | [è§†é¢‘ç”Ÿæˆæä¾›å•†æ’ä»¶](/developer-guide/video-gen-provider-plugin) |
| **TTS åŽç«¯**ï¼ˆä»»æ„ CLIâ€”â€”Piperã€VoxCPMã€Kokoroã€å£°éŸ³å…‹éš†ç­‰ï¼‰ | [TTS è‡ªå®šä¹‰å‘½ä»¤æä¾›å•†](/user-guide/features/tts#custom-command-providers)â€”â€”é…ç½®é©±åŠ¨ï¼Œæ— éœ€ Python |
| **STT åŽç«¯**ï¼ˆè‡ªå®šä¹‰ whisper / ASR CLIï¼‰ | [è¯­éŸ³æ¶ˆæ¯è½¬å½•](/user-guide/features/tts#voice-message-transcription-stt)â€”â€”å°† `ZED_LOCAL_STT_COMMAND` è®¾ç½®ä¸º shell æ¨¡æ¿ |
| **é€šè¿‡ MCP æŽ¥å…¥å¤–éƒ¨å·¥å…·**ï¼ˆæ–‡ä»¶ç³»ç»Ÿã€GitHubã€Linearã€ä»»æ„ MCP æœåŠ¡å™¨ï¼‰ | [MCP](/user-guide/features/mcp)â€”â€”åœ¨ `config.yaml` ä¸­å£°æ˜Ž `mcp_servers.<name>` |
| **ç½‘å…³äº‹ä»¶é’©å­**ï¼ˆåœ¨å¯åŠ¨ã€ä¼šè¯äº‹ä»¶ã€å‘½ä»¤æ—¶è§¦å‘ï¼‰ | [äº‹ä»¶é’©å­](/user-guide/features/hooks#gateway-event-hooks)â€”â€”å°† `HOOK.yaml` + `handler.py` æ”¾å…¥ `~/.zed/hooks/<name>/` |
| **Shell é’©å­**ï¼ˆåœ¨äº‹ä»¶å‘ç”Ÿæ—¶è¿è¡Œ shell å‘½ä»¤ï¼‰ | [Shell é’©å­](/user-guide/features/hooks#shell-hooks)â€”â€”åœ¨ `config.yaml` çš„ `hooks:` ä¸‹å£°æ˜Ž |
| **é¢å¤–æŠ€èƒ½æ¥æº**ï¼ˆè‡ªå®šä¹‰ GitHub ä»“åº“ã€ç§æœ‰æŠ€èƒ½ç´¢å¼•ï¼‰ | [æŠ€èƒ½](/user-guide/features/skills)â€”â€”`zed skills tap add <repo>` Â· [å‘å¸ƒ tap](/user-guide/features/skills#publishing-a-custom-skill-tap) |
| ä¸€æµçš„**æ ¸å¿ƒ**æŽ¨ç†æä¾›å•†ï¼ˆéžæ’ä»¶ï¼‰ | [æ·»åŠ æä¾›å•†](/developer-guide/adding-providers) |

æŸ¥çœ‹å®Œæ•´çš„[å¯æ’æ‹”æŽ¥å£è¡¨](/user-guide/features/plugins#pluggable-interfaces--where-to-go-for-each)ï¼ŒèŽ·å–æ¯ç§æ‰©å±•æŽ¥å£çš„æ±‡æ€»è§†å›¾ï¼ŒåŒ…æ‹¬é…ç½®é©±åŠ¨ï¼ˆTTSã€STTã€MCPã€shell é’©å­ï¼‰å’Œæ”¾å…¥ç›®å½•ï¼ˆç½‘å…³é’©å­ï¼‰ä¸¤ç§æ–¹å¼ã€‚
:::

## ä½ å°†æž„å»ºä»€ä¹ˆ

ä¸€ä¸ª**è®¡ç®—å™¨**æ’ä»¶ï¼ŒåŒ…å«ä¸¤ä¸ªå·¥å…·ï¼š
- `calculate`â€”â€”è®¡ç®—æ•°å­¦è¡¨è¾¾å¼ï¼ˆ`2**16`ã€`sqrt(144)`ã€`pi * 5**2`ï¼‰
- `unit_convert`â€”â€”åœ¨å•ä½ä¹‹é—´è½¬æ¢ï¼ˆ`100 F â†’ 37.78 C`ã€`5 km â†’ 3.11 mi`ï¼‰

å¦å¤–è¿˜æœ‰ä¸€ä¸ªè®°å½•æ¯æ¬¡å·¥å…·è°ƒç”¨çš„é’©å­ï¼Œä»¥åŠä¸€ä¸ªæ†ç»‘çš„æŠ€èƒ½æ–‡ä»¶ã€‚

## ç¬¬ä¸€æ­¥ï¼šåˆ›å»ºæ’ä»¶ç›®å½•

```bash
mkdir -p ~/.zed/plugins/calculator
cd ~/.zed/plugins/calculator
```

## ç¬¬äºŒæ­¥ï¼šç¼–å†™æ¸…å•æ–‡ä»¶

åˆ›å»º `plugin.yaml`ï¼š

```yaml
name: calculator
version: 1.0.0
description: Math calculator â€” evaluate expressions and convert units
provides_tools:
  - calculate
  - unit_convert
provides_hooks:
  - post_tool_call
```

è¿™å‘Šè¯‰ Zedï¼š"æˆ‘æ˜¯ä¸€ä¸ªåä¸º calculator çš„æ’ä»¶ï¼Œæˆ‘æä¾›å·¥å…·å’Œé’©å­ã€‚" `provides_tools` å’Œ `provides_hooks` å­—æ®µæ˜¯æ’ä»¶æ³¨å†Œå†…å®¹çš„åˆ—è¡¨ã€‚

å¯é€‰å­—æ®µç¤ºä¾‹ï¼š
```yaml
author: Your Name
requires_env:          # æ ¹æ®çŽ¯å¢ƒå˜é‡å†³å®šæ˜¯å¦åŠ è½½ï¼›å®‰è£…æ—¶ä¼šæç¤ºç”¨æˆ·
  - SOME_API_KEY       # ç®€å•æ ¼å¼â€”â€”ç¼ºå¤±æ—¶æ’ä»¶ç¦ç”¨
  - name: OTHER_KEY    # å¯Œæ ¼å¼â€”â€”å®‰è£…æ—¶æ˜¾ç¤ºæè¿°/URL
    description: "Key for the Other service"
    url: "https://other.com/keys"
    secret: true
```

## ç¬¬ä¸‰æ­¥ï¼šç¼–å†™å·¥å…· schema

åˆ›å»º `schemas.py`â€”â€”è¿™æ˜¯ LLM è¯»å–ä»¥å†³å®šä½•æ—¶è°ƒç”¨ä½ çš„å·¥å…·çš„å†…å®¹ï¼š

```python
"""Tool schemas â€” what the LLM sees."""

CALCULATE = {
    "name": "calculate",
    "description": (
        "Evaluate a mathematical expression and return the result. "
        "Supports arithmetic (+, -, *, /, **), functions (sqrt, sin, cos, "
        "log, abs, round, floor, ceil), and constants (pi, e). "
        "Use this for any math the user asks about."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "expression": {
                "type": "string",
                "description": "Math expression to evaluate (e.g., '2**10', 'sqrt(144)')",
            },
        },
        "required": ["expression"],
    },
}

UNIT_CONVERT = {
    "name": "unit_convert",
    "description": (
        "Convert a value between units. Supports length (m, km, mi, ft, in), "
        "weight (kg, lb, oz, g), temperature (C, F, K), data (B, KB, MB, GB, TB), "
        "and time (s, min, hr, day)."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "value": {
                "type": "number",
                "description": "The numeric value to convert",
            },
            "from_unit": {
                "type": "string",
                "description": "Source unit (e.g., 'km', 'lb', 'F', 'GB')",
            },
            "to_unit": {
                "type": "string",
                "description": "Target unit (e.g., 'mi', 'kg', 'C', 'MB')",
            },
        },
        "required": ["value", "from_unit", "to_unit"],
    },
}
```

**schema ä¸ºä½•é‡è¦ï¼š** `description` å­—æ®µå†³å®šäº† LLM ä½•æ—¶ä½¿ç”¨ä½ çš„å·¥å…·ã€‚è¯·æ˜Žç¡®è¯´æ˜Žå·¥å…·çš„åŠŸèƒ½å’Œä½¿ç”¨æ—¶æœºã€‚`parameters` å®šä¹‰äº† LLM ä¼ å…¥çš„å‚æ•°ã€‚

## ç¬¬å››æ­¥ï¼šç¼–å†™å·¥å…·å¤„ç†å™¨

åˆ›å»º `tools.py`â€”â€”è¿™æ˜¯ LLM è°ƒç”¨å·¥å…·æ—¶å®žé™…æ‰§è¡Œçš„ä»£ç ï¼š

```python
"""Tool handlers â€” the code that runs when the LLM calls each tool."""

import json
import math

# Safe globals for expression evaluation â€” no file/network access
_SAFE_MATH = {
    "abs": abs, "round": round, "min": min, "max": max,
    "pow": pow, "sqrt": math.sqrt, "sin": math.sin, "cos": math.cos,
    "tan": math.tan, "log": math.log, "log2": math.log2, "log10": math.log10,
    "floor": math.floor, "ceil": math.ceil,
    "pi": math.pi, "e": math.e,
    "factorial": math.factorial,
}


def calculate(args: dict, **kwargs) -> str:
    """Evaluate a math expression safely.

    Rules for handlers:
    1. Receive args (dict) â€” the parameters the LLM passed
    2. Do the work
    3. Return a JSON string â€” ALWAYS, even on error
    4. Accept **kwargs for forward compatibility
    """
    expression = args.get("expression", "").strip()
    if not expression:
        return json.dumps({"error": "No expression provided"})

    try:
        result = eval(expression, {"__builtins__": {}}, _SAFE_MATH)
        return json.dumps({"expression": expression, "result": result})
    except ZeroDivisionError:
        return json.dumps({"expression": expression, "error": "Division by zero"})
    except Exception as e:
        return json.dumps({"expression": expression, "error": f"Invalid: {e}"})


# Conversion tables â€” values are in base units
_LENGTH = {"m": 1, "km": 1000, "mi": 1609.34, "ft": 0.3048, "in": 0.0254, "cm": 0.01}
_WEIGHT = {"kg": 1, "g": 0.001, "lb": 0.453592, "oz": 0.0283495}
_DATA = {"B": 1, "KB": 1024, "MB": 1024**2, "GB": 1024**3, "TB": 1024**4}
_TIME = {"s": 1, "ms": 0.001, "min": 60, "hr": 3600, "day": 86400}


def _convert_temp(value, from_u, to_u):
    # Normalize to Celsius
    c = {"F": (value - 32) * 5/9, "K": value - 273.15}.get(from_u, value)
    # Convert to target
    return {"F": c * 9/5 + 32, "K": c + 273.15}.get(to_u, c)


def unit_convert(args: dict, **kwargs) -> str:
    """Convert between units."""
    value = args.get("value")
    from_unit = args.get("from_unit", "").strip()
    to_unit = args.get("to_unit", "").strip()

    if value is None or not from_unit or not to_unit:
        return json.dumps({"error": "Need value, from_unit, and to_unit"})

    try:
        # Temperature
        if from_unit.upper() in {"C","F","K"} and to_unit.upper() in {"C","F","K"}:
            result = _convert_temp(float(value), from_unit.upper(), to_unit.upper())
            return json.dumps({"input": f"{value} {from_unit}", "result": round(result, 4),
                             "output": f"{round(result, 4)} {to_unit}"})

        # Ratio-based conversions
        for table in (_LENGTH, _WEIGHT, _DATA, _TIME):
            lc = {k.lower(): v for k, v in table.items()}
            if from_unit.lower() in lc and to_unit.lower() in lc:
                result = float(value) * lc[from_unit.lower()] / lc[to_unit.lower()]
                return json.dumps({"input": f"{value} {from_unit}",
                                 "result": round(result, 6),
                                 "output": f"{round(result, 6)} {to_unit}"})

        return json.dumps({"error": f"Cannot convert {from_unit} â†’ {to_unit}"})
    except Exception as e:
        return json.dumps({"error": f"Conversion failed: {e}"})
```

**å¤„ç†å™¨çš„å…³é”®è§„åˆ™ï¼š**
1. **ç­¾åï¼š** `def my_handler(args: dict, **kwargs) -> str`
2. **è¿”å›žå€¼ï¼š** å§‹ç»ˆè¿”å›ž JSON å­—ç¬¦ä¸²ã€‚æˆåŠŸå’Œé”™è¯¯å‡å¦‚æ­¤ã€‚
3. **ä¸è¦æŠ›å‡ºå¼‚å¸¸ï¼š** æ•èŽ·æ‰€æœ‰å¼‚å¸¸ï¼Œæ”¹ä¸ºè¿”å›žé”™è¯¯ JSONã€‚
4. **æŽ¥å— `**kwargs`ï¼š** Zed æœªæ¥å¯èƒ½ä¼ å…¥é¢å¤–ä¸Šä¸‹æ–‡ã€‚

## ç¬¬äº”æ­¥ï¼šç¼–å†™æ³¨å†Œä»£ç 

åˆ›å»º `__init__.py`â€”â€”å°† schema ä¸Žå¤„ç†å™¨è¿žæŽ¥èµ·æ¥ï¼š

```python
"""Calculator plugin â€” registration."""

import logging

from . import schemas, tools

logger = logging.getLogger(__name__)

# Track tool usage via hooks
_call_log = []

def _on_post_tool_call(tool_name, args, result, task_id, **kwargs):
    """Hook: runs after every tool call (not just ours)."""
    _call_log.append({"tool": tool_name, "session": task_id})
    if len(_call_log) > 100:
        _call_log.pop(0)
    logger.debug("Tool called: %s (session %s)", tool_name, task_id)


def register(ctx):
    """Wire schemas to handlers and register hooks."""
    ctx.register_tool(name="calculate",    toolset="calculator",
                      schema=schemas.CALCULATE,    handler=tools.calculate)
    ctx.register_tool(name="unit_convert", toolset="calculator",
                      schema=schemas.UNIT_CONVERT, handler=tools.unit_convert)

    # This hook fires for ALL tool calls, not just ours
    ctx.register_hook("post_tool_call", _on_post_tool_call)
```

**`register()` çš„ä½œç”¨ï¼š**
- åœ¨å¯åŠ¨æ—¶æ°å¥½è°ƒç”¨ä¸€æ¬¡
- `ctx.register_tool()` å°†ä½ çš„å·¥å…·æ”¾å…¥æ³¨å†Œè¡¨â€”â€”æ¨¡åž‹ç«‹å³å¯è§
- `ctx.register_hook()` è®¢é˜…ç”Ÿå‘½å‘¨æœŸäº‹ä»¶
- `ctx.register_cli_command()` æ³¨å†Œ CLI å­å‘½ä»¤ï¼ˆä¾‹å¦‚ `zed my-plugin <subcommand>`ï¼‰
- `ctx.register_command()` æ³¨å†Œä¼šè¯å†…æ–œæ å‘½ä»¤ï¼ˆä¾‹å¦‚åœ¨ CLI / ç½‘å…³èŠå¤©ä¸­è¾“å…¥ `/myplugin <args>`ï¼‰â€”â€”è¯¦è§ä¸‹æ–¹[æ³¨å†Œæ–œæ å‘½ä»¤](#register-slash-commands)
- `ctx.dispatch_tool(name, arguments)` â€”â€”ä»¥çˆ¶ä»£ç†çš„ä¸Šä¸‹æ–‡ï¼ˆå®¡æ‰¹ã€å‡­è¯ã€task_id è‡ªåŠ¨è¿žæŽ¥ï¼‰è°ƒç”¨ä»»æ„å…¶ä»–å·¥å…·ï¼ˆå†…ç½®æˆ–æ¥è‡ªå…¶ä»–æ’ä»¶ï¼‰ã€‚é€‚ç”¨äºŽéœ€è¦ç›´æŽ¥è°ƒç”¨ `terminal`ã€`read_file` æˆ–å…¶ä»–å·¥å…·çš„æ–œæ å‘½ä»¤å¤„ç†å™¨ï¼Œæ•ˆæžœç­‰åŒäºŽæ¨¡åž‹ç›´æŽ¥è°ƒç”¨ã€‚
- å¦‚æžœæ­¤å‡½æ•°å´©æºƒï¼Œæ’ä»¶å°†è¢«ç¦ç”¨ï¼Œä½† Zed ç»§ç»­æ­£å¸¸è¿è¡Œ

**`dispatch_tool` ç¤ºä¾‹â€”â€”æ‰§è¡Œå·¥å…·çš„æ–œæ å‘½ä»¤ï¼š**

```python
def handle_scan(ctx, argstr):
    """Implement /scan by invoking the terminal tool through the registry."""
    result = ctx.dispatch_tool("terminal", {"command": f"find . -name '{argstr}'"})
    return result  # returned to the caller's chat UI

def register(ctx):
    ctx.register_command("scan", handle_scan, help="Find files matching a glob")
```

è¢«åˆ†å‘çš„å·¥å…·ä¼šç»è¿‡æ­£å¸¸çš„å®¡æ‰¹ã€è„±æ•å’Œé¢„ç®—æµç¨‹â€”â€”è¿™æ˜¯çœŸå®žçš„å·¥å…·è°ƒç”¨ï¼Œè€Œéžç»•è¿‡è¿™äº›æµç¨‹çš„æ·å¾„ã€‚

## ç¬¬å…­æ­¥ï¼šæµ‹è¯•

å¯åŠ¨ Zedï¼š

```bash
zed
```

ä½ åº”è¯¥åœ¨å¯åŠ¨æ¨ªå¹…çš„å·¥å…·åˆ—è¡¨ä¸­çœ‹åˆ° `calculator: calculate, unit_convert`ã€‚

å°è¯•ä»¥ä¸‹æç¤ºè¯ï¼ˆpromptï¼‰ï¼š
```
What's 2 to the power of 16?
Convert 100 fahrenheit to celsius
What's the square root of 2 times pi?
How many gigabytes is 1.5 terabytes?
```

æ£€æŸ¥æ’ä»¶çŠ¶æ€ï¼š
```
/plugins
```

è¾“å‡ºï¼š
```
Plugins (1):
  âœ“ calculator v1.0.0 (2 tools, 1 hooks)
```

### è°ƒè¯•æ’ä»¶å‘çŽ°é—®é¢˜

å¦‚æžœä½ çš„æ’ä»¶æ²¡æœ‰å‡ºçŽ°ï¼Œæˆ–å‡ºçŽ°äº†ä½†æœªåŠ è½½â€”â€”è®¾ç½® `ZED_PLUGINS_DEBUG=1` å¯åœ¨ stderr èŽ·å–è¯¦ç»†çš„å‘çŽ°æ—¥å¿—ï¼š

```bash
ZED_PLUGINS_DEBUG=1 zed plugins list
```

ä½ å°†çœ‹åˆ°æ¯ä¸ªæ’ä»¶æ¥æºï¼ˆå†…ç½®ã€ç”¨æˆ·ã€é¡¹ç›®ã€entry-pointsï¼‰çš„ä»¥ä¸‹ä¿¡æ¯ï¼š

- æ‰«æäº†å“ªäº›ç›®å½•ï¼Œæ¯ä¸ªç›®å½•äº§å‡ºäº†å¤šå°‘ä¸ªæ¸…å•
- æ¯ä¸ªæ¸…å•ï¼šè§£æžåŽçš„é”®ã€åç§°ã€ç±»åž‹ã€æ¥æºã€ç£ç›˜è·¯å¾„
- è·³è¿‡åŽŸå› ï¼š`disabled via config`ã€`not enabled in config`ã€`exclusive plugin`ã€`no plugin.yaml, depth cap reached`
- åŠ è½½æ—¶ï¼šæ­£åœ¨å¯¼å…¥çš„æ’ä»¶ï¼Œä»¥åŠ `register(ctx)` æ³¨å†Œå†…å®¹çš„å•è¡Œæ‘˜è¦ï¼ˆå·¥å…·ã€é’©å­ã€æ–œæ å‘½ä»¤ã€CLI å‘½ä»¤ï¼‰
- è§£æžå¤±è´¥æ—¶ï¼šå¼‚å¸¸çš„å®Œæ•´å †æ ˆè·Ÿè¸ªï¼ˆYAML æ‰«æå™¨é”™è¯¯ç­‰ï¼‰
- `register()` å¤±è´¥æ—¶ï¼šæŒ‡å‘ `__init__.py` ä¸­æŠ›å‡ºå¼‚å¸¸çš„è¡Œçš„å®Œæ•´å †æ ˆè·Ÿè¸ª

åŒæ ·çš„æ—¥å¿—å§‹ç»ˆå†™å…¥ `~/.zed/logs/agent.log`ï¼Œå¤±è´¥æ—¶ä¸º WARNING çº§åˆ«ï¼Œè®¾ç½®çŽ¯å¢ƒå˜é‡æ—¶ä¸º DEBUG çº§åˆ«ï¼ˆå…¨éƒ¨å†…å®¹ï¼‰ã€‚å¦‚æžœæ— æ³•ä½¿ç”¨çŽ¯å¢ƒå˜é‡è¿è¡Œï¼ˆä¾‹å¦‚ä»Žç½‘å…³å†…éƒ¨ï¼‰ï¼Œå¯ä»¥æ”¹ä¸ºè¿½è¸ªæ—¥å¿—æ–‡ä»¶ï¼š

```bash
zed logs --level WARNING | grep -i plugin
```

æ’ä»¶æœªå‡ºçŽ°çš„å¸¸è§åŽŸå› ï¼š

- **æœªåœ¨é…ç½®ä¸­å¯ç”¨**â€”â€”æ’ä»¶éœ€è¦æ‰‹åŠ¨å¯ç”¨ã€‚è¿è¡Œ `zed plugins enable <name>`ï¼ˆåç§°æ¥è‡ª `plugins list` è¾“å‡ºï¼ŒåµŒå¥—å¸ƒå±€ä¸‹å¯èƒ½æ˜¯ `<category>/<plugin>`ï¼‰ã€‚
- **ç›®å½•ç»“æž„é”™è¯¯**â€”â€”å¿…é¡»æ˜¯ `~/.zed/plugins/<plugin-name>/plugin.yaml`ï¼ˆæ‰å¹³ï¼‰æˆ– `~/.zed/plugins/<category>/<plugin-name>/plugin.yaml`ï¼ˆä¸€çº§åˆ†ç±»åµŒå¥—ï¼Œæœ€å¤šï¼‰ã€‚æ›´æ·±å±‚çš„ç›®å½•ä¼šè¢«å¿½ç•¥ã€‚
- **ç¼ºå°‘ `__init__.py`**â€”â€”æ’ä»¶ç›®å½•éœ€è¦åŒæ—¶åŒ…å« `plugin.yaml` å’Œå¸¦æœ‰ `register(ctx)` å‡½æ•°çš„ `__init__.py`ã€‚
- **`kind` é”™è¯¯**â€”â€”ç½‘å…³é€‚é…å™¨éœ€è¦åœ¨æ¸…å•ä¸­è®¾ç½® `kind: platform`ã€‚è®°å¿†æä¾›å•†ä¼šè¢«è‡ªåŠ¨æ£€æµ‹ä¸º `kind: exclusive`ï¼Œå¹¶é€šè¿‡ `memory.provider` é…ç½®è·¯ç”±ï¼Œè€Œéž `plugins.enabled`ã€‚

## æ’ä»¶çš„æœ€ç»ˆç»“æž„

```
~/.zed/plugins/calculator/
â”œâ”€â”€ plugin.yaml      # "æˆ‘æ˜¯ calculatorï¼Œæˆ‘æä¾›å·¥å…·å’Œé’©å­"
â”œâ”€â”€ __init__.py      # è¿žæŽ¥ï¼šschema â†’ å¤„ç†å™¨ï¼Œæ³¨å†Œé’©å­
â”œâ”€â”€ schemas.py       # LLM è¯»å–çš„å†…å®¹ï¼ˆæè¿° + å‚æ•°è§„æ ¼ï¼‰
â””â”€â”€ tools.py         # å®žé™…è¿è¡Œçš„ä»£ç ï¼ˆcalculateã€unit_convert å‡½æ•°ï¼‰
```

å››ä¸ªæ–‡ä»¶ï¼ŒèŒè´£æ¸…æ™°ï¼š
- **æ¸…å•**å£°æ˜Žæ’ä»¶æ˜¯ä»€ä¹ˆ
- **Schema** å‘ LLM æè¿°å·¥å…·
- **å¤„ç†å™¨**å®žçŽ°å®žé™…é€»è¾‘
- **æ³¨å†Œ**å°†ä¸€åˆ‡è¿žæŽ¥èµ·æ¥

## æ’ä»¶è¿˜èƒ½åšä»€ä¹ˆï¼Ÿ

### éšé™„æ•°æ®æ–‡ä»¶

å°†ä»»æ„æ–‡ä»¶æ”¾å…¥æ’ä»¶ç›®å½•ï¼Œå¹¶åœ¨å¯¼å…¥æ—¶è¯»å–ï¼š

```python
# In tools.py or __init__.py
from pathlib import Path

_PLUGIN_DIR = Path(__file__).parent
_DATA_FILE = _PLUGIN_DIR / "data" / "languages.yaml"

with open(_DATA_FILE) as f:
    _DATA = yaml.safe_load(f)
```

### æ†ç»‘æŠ€èƒ½

æ’ä»¶å¯ä»¥éšé™„æŠ€èƒ½æ–‡ä»¶ï¼Œä»£ç†é€šè¿‡ `skill_view("plugin:skill")` åŠ è½½ã€‚åœ¨ `__init__.py` ä¸­æ³¨å†Œï¼š

```
~/.zed/plugins/my-plugin/
â”œâ”€â”€ __init__.py
â”œâ”€â”€ plugin.yaml
â””â”€â”€ skills/
    â”œâ”€â”€ my-workflow/
    â”‚   â””â”€â”€ SKILL.md
    â””â”€â”€ my-checklist/
        â””â”€â”€ SKILL.md
```

```python
from pathlib import Path

def register(ctx):
    skills_dir = Path(__file__).parent / "skills"
    for child in sorted(skills_dir.iterdir()):
        skill_md = child / "SKILL.md"
        if child.is_dir() and skill_md.exists():
            ctx.register_skill(child.name, skill_md)
```

ä»£ç†çŽ°åœ¨å¯ä»¥é€šè¿‡å‘½åç©ºé—´åç§°åŠ è½½ä½ çš„æŠ€èƒ½ï¼š

```python
skill_view("my-plugin:my-workflow")   # â†’ æ’ä»¶ç‰ˆæœ¬
skill_view("my-workflow")              # â†’ å†…ç½®ç‰ˆæœ¬ï¼ˆä¸å—å½±å“ï¼‰
```

**å…³é”®ç‰¹æ€§ï¼š**
- æ’ä»¶æŠ€èƒ½æ˜¯**åªè¯»**çš„â€”â€”å®ƒä»¬ä¸ä¼šè¿›å…¥ `~/.zed/skills/`ï¼Œä¹Ÿæ— æ³•é€šè¿‡ `skill_manage` ç¼–è¾‘ã€‚
- æ’ä»¶æŠ€èƒ½**ä¸ä¼š**åˆ—åœ¨ç³»ç»Ÿæç¤ºè¯çš„ `<available_skills>` ç´¢å¼•ä¸­â€”â€”éœ€è¦æ˜¾å¼åŠ è½½ã€‚
- è£¸æŠ€èƒ½åç§°ä¸å—å½±å“â€”â€”å‘½åç©ºé—´é˜²æ­¢ä¸Žå†…ç½®æŠ€èƒ½å†²çªã€‚
- ä»£ç†åŠ è½½æ’ä»¶æŠ€èƒ½æ—¶ï¼Œä¼šåœ¨å‰é¢æ·»åŠ ä¸€ä¸ªæ†ç»‘ä¸Šä¸‹æ–‡æ¨ªå¹…ï¼Œåˆ—å‡ºåŒä¸€æ’ä»¶çš„å…„å¼ŸæŠ€èƒ½ã€‚

:::tip æ—§ç‰ˆæ¨¡å¼
æ—§çš„ `shutil.copy2` æ¨¡å¼ï¼ˆå°†æŠ€èƒ½å¤åˆ¶åˆ° `~/.zed/skills/`ï¼‰ä»ç„¶æœ‰æ•ˆï¼Œä½†å­˜åœ¨ä¸Žå†…ç½®æŠ€èƒ½åç§°å†²çªçš„é£Žé™©ã€‚æ–°æ’ä»¶è¯·ä¼˜å…ˆä½¿ç”¨ `ctx.register_skill()`ã€‚
:::

### æ ¹æ®çŽ¯å¢ƒå˜é‡å†³å®šæ˜¯å¦å¯ç”¨

å¦‚æžœä½ çš„æ’ä»¶éœ€è¦ API å¯†é’¥ï¼š

```yaml
# plugin.yaml â€” ç®€å•æ ¼å¼ï¼ˆå‘åŽå…¼å®¹ï¼‰
requires_env:
  - WEATHER_API_KEY
```

å¦‚æžœ `WEATHER_API_KEY` æœªè®¾ç½®ï¼Œæ’ä»¶å°†è¢«ç¦ç”¨å¹¶æ˜¾ç¤ºæ¸…æ™°çš„æç¤ºä¿¡æ¯ã€‚ä¸ä¼šå´©æºƒï¼Œä»£ç†ä¸­ä¹Ÿä¸ä¼šæŠ¥é”™â€”â€”åªä¼šæ˜¾ç¤º"Plugin weather disabled (missing: WEATHER_API_KEY)"ã€‚

ç”¨æˆ·è¿è¡Œ `zed plugins install` æ—¶ï¼Œä¼š**äº¤äº’å¼æç¤º**è¾“å…¥ä»»ä½•ç¼ºå¤±çš„ `requires_env` å˜é‡ã€‚å€¼ä¼šè‡ªåŠ¨ä¿å­˜åˆ° `.env`ã€‚

ä¸ºäº†èŽ·å¾—æ›´å¥½çš„å®‰è£…ä½“éªŒï¼Œä½¿ç”¨å¸¦æœ‰æè¿°å’Œæ³¨å†Œ URL çš„å¯Œæ ¼å¼ï¼š

```yaml
# plugin.yaml â€” å¯Œæ ¼å¼
requires_env:
  - name: WEATHER_API_KEY
    description: "API key for OpenWeather"
    url: "https://openweathermap.org/api"
    secret: true
```

| å­—æ®µ | å¿…å¡« | æè¿° |
|-------|----------|-------------|
| `name` | æ˜¯ | çŽ¯å¢ƒå˜é‡åç§° |
| `description` | å¦ | å®‰è£…æç¤ºæ—¶æ˜¾ç¤ºç»™ç”¨æˆ· |
| `url` | å¦ | èŽ·å–å‡­è¯çš„åœ°å€ |
| `secret` | å¦ | è‹¥ä¸º `true`ï¼Œè¾“å…¥æ—¶éšè—ï¼ˆç±»ä¼¼å¯†ç å­—æ®µï¼‰ |

ä¸¤ç§æ ¼å¼å¯åœ¨åŒä¸€åˆ—è¡¨ä¸­æ··ç”¨ã€‚å·²è®¾ç½®çš„å˜é‡ä¼šè¢«é™é»˜è·³è¿‡ã€‚

### æ‡’åŠ è½½å¯é€‰ Python ä¾èµ–

å¦‚æžœä½ çš„æ’ä»¶å°è£…äº†ä¸€ä¸ªå¹¶éžæ‰€æœ‰ç”¨æˆ·éƒ½ä¼šå®‰è£…çš„ SDKï¼ˆä¾›åº”å•† SDKã€é‡åž‹ ML åº“ã€å¹³å°ç‰¹å®šåŒ…ï¼‰ï¼Œä¸è¦åœ¨æ¨¡å—é¡¶éƒ¨ `import` å®ƒã€‚åœ¨å·¥å…·å¤„ç†å™¨å†…éƒ¨ä½¿ç”¨ `tools.lazy_deps.ensure(...)` è¾…åŠ©å‡½æ•°â€”â€”Zed ä¼šåœ¨é¦–æ¬¡ä½¿ç”¨æ—¶å®‰è£…è¯¥åŒ…ï¼Œå¹¶å—ç”¨æˆ· `security.allow_lazy_installs` é…ç½®çš„æŽ§åˆ¶ã€‚

```python
# tools.py
from tools.lazy_deps import ensure, FeatureUnavailable

def my_tool_handler(args, **kwargs):
    try:
        ensure("my-plugin.my-backend")   # key must be in LAZY_DEPS
    except FeatureUnavailable as exc:
        return {"error": str(exc)}

    import my_backend_sdk   # safe now
    ...
```

æ¥è‡ª `tools/lazy_deps.py` å®‰å…¨æ¨¡åž‹çš„ä¸¤æ¡è§„åˆ™ï¼š

| è§„åˆ™ | åŽŸå›  |
|---|---|
| ä½ çš„åŠŸèƒ½é”®å¿…é¡»å‡ºçŽ°åœ¨å†…ç½®çš„ `LAZY_DEPS` å…è®¸åˆ—è¡¨ä¸­ | é˜²æ­¢æ¶æ„é…ç½®è¯±ä½¿ Zed å®‰è£…ä»»æ„åŒ…â€”â€”åªæœ‰ Zed è‡ªèº«éšé™„çš„è§„æ ¼æ‰ç¬¦åˆæ¡ä»¶ |
| è§„æ ¼ä»…é™ PyPI åŒ…å | ä¸å…è®¸ `--index-url`ã€`git+https://` æˆ– `file:` è·¯å¾„ã€‚åœ¨å…è®¸åˆ—è¡¨æ¡ç›®ä¸­ä½¿ç”¨ PEP 440 å›ºå®šç‰ˆæœ¬ï¼ˆ`"my-sdk>=1.2,<2"`ï¼‰ |

å¯¹äºŽé€šè¿‡ pip åˆ†å‘çš„ç¬¬ä¸‰æ–¹æ’ä»¶ï¼Œåœ¨ä½ è‡ªå·±çš„ `pyproject.toml` ä¸­å°†å¯é€‰ä¾èµ–å£°æ˜Žä¸º `[project.optional-dependencies]` extrasï¼Œå¹¶å‘ŠçŸ¥ç”¨æˆ·æ‰§è¡Œ `pip install your-plugin[backend]`â€”â€”è¯¥è·¯å¾„ä¸ç»è¿‡ `lazy_deps`ã€‚æ‡’åŠ è½½å®‰è£…æœ€é€‚åˆ**å†…ç½®**æ’ä»¶ï¼Œå› ä¸ºå¯¹æ¯æ¬¡å®‰è£…éƒ½å¼ºåˆ¶ä¾èµ–ä¼šå¢žåŠ  Zed åŸºç¡€å®‰è£…çš„ä½“ç§¯ã€‚

å½“å…¨å±€è®¾ç½® `security.allow_lazy_installs: false` æ—¶ï¼Œ`ensure()` ä¼šç«‹å³æŠ›å‡º `FeatureUnavailable` å¹¶é™„å¸¦ä¿®å¤æç¤ºâ€”â€”ä½ çš„æ’ä»¶åº”æ•èŽ·è¯¥å¼‚å¸¸å¹¶ä¼˜é›…é™çº§ï¼ˆè¿”å›žé”™è¯¯ç»“æžœï¼Œè€Œéžè®©å·¥å…·å¾ªçŽ¯å´©æºƒï¼‰ã€‚

### æ¡ä»¶å·¥å…·å¯ç”¨æ€§

å¯¹äºŽä¾èµ–å¯é€‰åº“çš„å·¥å…·ï¼š

```python
ctx.register_tool(
    name="my_tool",
    schema={...},
    handler=my_handler,
    check_fn=lambda: _has_optional_lib(),  # False = å·¥å…·å¯¹æ¨¡åž‹éšè—
)
```

### è¦†ç›–å†…ç½®å·¥å…·

è¦ç”¨ä½ è‡ªå·±çš„å®žçŽ°æ›¿æ¢å†…ç½®å·¥å…·ï¼ˆä¾‹å¦‚å°†é»˜è®¤æµè§ˆå™¨å·¥å…·æ›¿æ¢ä¸ºæœ‰å¤´ Chrome CDP åŽç«¯ï¼Œæˆ–å°† `web_search` æ›¿æ¢ä¸ºè‡ªå®šä¹‰ä¼ä¸šç´¢å¼•ï¼‰ï¼Œä¼ å…¥ `override=True`ï¼š

```python
def register(ctx):
    ctx.register_tool(
        name="browser_navigate",             # ä¸Žå†…ç½®å·¥å…·åŒå
        toolset="plugin_my_browser",         # ä½ è‡ªå·±çš„ toolset å‘½åç©ºé—´
        schema={...},
        handler=my_custom_navigate,
        override=True,                       # æ˜¾å¼å¯ç”¨è¦†ç›–
    )
```

ä¸åŠ  `override=True` æ—¶ï¼Œæ³¨å†Œè¡¨ä¼šæ‹’ç»ä»»ä½•ä¼šé®è”½æ¥è‡ªä¸åŒ toolset çš„å·²æœ‰å·¥å…·çš„æ³¨å†Œâ€”â€”è¿™é˜²æ­¢äº†æ„å¤–è¦†ç›–ã€‚è¦†ç›–æ“ä½œä¼šä»¥ INFO çº§åˆ«è®°å½•æ—¥å¿—ï¼Œå¯åœ¨ `~/.zed/logs/agent.log` ä¸­å®¡è®¡ã€‚æ’ä»¶åœ¨å†…ç½®å·¥å…·ä¹‹åŽåŠ è½½ï¼Œå› æ­¤æ³¨å†Œé¡ºåºæ˜¯æ­£ç¡®çš„ï¼šä½ çš„å¤„ç†å™¨ä¼šæ›¿æ¢å†…ç½®å¤„ç†å™¨ã€‚

### æ³¨å†Œå¤šä¸ªé’©å­

```python
def register(ctx):
    ctx.register_hook("pre_tool_call", before_any_tool)
    ctx.register_hook("post_tool_call", after_any_tool)
    ctx.register_hook("pre_llm_call", inject_memory)
    ctx.register_hook("on_session_start", on_new_session)
    ctx.register_hook("on_session_end", on_session_end)
```

### é’©å­å‚è€ƒ

æ¯ä¸ªé’©å­çš„å®Œæ•´æ–‡æ¡£è§**[äº‹ä»¶é’©å­å‚è€ƒ](/user-guide/features/hooks#plugin-hooks)**â€”â€”å›žè°ƒç­¾åã€å‚æ•°è¡¨ã€è§¦å‘æ—¶æœºå’Œç¤ºä¾‹ã€‚ä»¥ä¸‹æ˜¯æ‘˜è¦ï¼š

| é’©å­ | è§¦å‘æ—¶æœº | å›žè°ƒç­¾å | è¿”å›žå€¼ |
|------|-----------|-------------------|---------|
| [`pre_tool_call`](/user-guide/features/hooks#pre_tool_call) | ä»»æ„å·¥å…·æ‰§è¡Œå‰ | `tool_name: str, args: dict, task_id: str` | å¿½ç•¥ |
| [`post_tool_call`](/user-guide/features/hooks#post_tool_call) | ä»»æ„å·¥å…·è¿”å›žåŽ | `tool_name: str, args: dict, result: str, task_id: str, duration_ms: int` | å¿½ç•¥ |
| [`pre_llm_call`](/user-guide/features/hooks#pre_llm_call) | æ¯è½®ä¸€æ¬¡ï¼Œå·¥å…·è°ƒç”¨å¾ªçŽ¯å‰ | `session_id: str, user_message: str, conversation_history: list, is_first_turn: bool, model: str, platform: str` | [ä¸Šä¸‹æ–‡æ³¨å…¥](#pre_llm_call-context-injection) |
| [`post_llm_call`](/user-guide/features/hooks#post_llm_call) | æ¯è½®ä¸€æ¬¡ï¼Œå·¥å…·è°ƒç”¨å¾ªçŽ¯åŽï¼ˆä»…æˆåŠŸè½®æ¬¡ï¼‰ | `session_id: str, user_message: str, assistant_response: str, conversation_history: list, model: str, platform: str` | å¿½ç•¥ |
| [`on_session_start`](/user-guide/features/hooks#on_session_start) | æ–°ä¼šè¯åˆ›å»ºï¼ˆä»…ç¬¬ä¸€è½®ï¼‰ | `session_id: str, model: str, platform: str` | å¿½ç•¥ |
| [`on_session_end`](/user-guide/features/hooks#on_session_end) | æ¯æ¬¡ `run_conversation` è°ƒç”¨ç»“æŸ + CLI é€€å‡º | `session_id: str, completed: bool, interrupted: bool, model: str, platform: str` | å¿½ç•¥ |
| [`on_session_finalize`](/user-guide/features/hooks#on_session_finalize) | CLI/ç½‘å…³é”€æ¯æ´»è·ƒä¼šè¯ | `session_id: str \| None, platform: str` | å¿½ç•¥ |
| [`on_session_reset`](/user-guide/features/hooks#on_session_reset) | ç½‘å…³åˆ‡æ¢æ–°ä¼šè¯é”®ï¼ˆ`/new`ã€`/reset`ï¼‰ | `session_id: str, platform: str` | å¿½ç•¥ |

å¤§å¤šæ•°é’©å­æ˜¯å³å‘å³å¿˜çš„è§‚å¯Ÿè€…â€”â€”å…¶è¿”å›žå€¼è¢«å¿½ç•¥ã€‚ä¾‹å¤–æ˜¯ `pre_llm_call`ï¼Œå®ƒå¯ä»¥å‘å¯¹è¯ä¸­æ³¨å…¥ä¸Šä¸‹æ–‡ã€‚

æ‰€æœ‰å›žè°ƒéƒ½åº”æŽ¥å— `**kwargs` ä»¥ä¿æŒå‘å‰å…¼å®¹æ€§ã€‚å¦‚æžœé’©å­å›žè°ƒå´©æºƒï¼Œä¼šè¢«è®°å½•æ—¥å¿—å¹¶è·³è¿‡ã€‚å…¶ä»–é’©å­å’Œä»£ç†ç»§ç»­æ­£å¸¸è¿è¡Œã€‚

### `pre_llm_call` ä¸Šä¸‹æ–‡æ³¨å…¥

è¿™æ˜¯å”¯ä¸€ä¸€ä¸ªè¿”å›žå€¼æœ‰æ„ä¹‰çš„é’©å­ã€‚å½“ `pre_llm_call` å›žè°ƒè¿”å›žåŒ…å« `"context"` é”®çš„å­—å…¸ï¼ˆæˆ–çº¯å­—ç¬¦ä¸²ï¼‰æ—¶ï¼ŒZed ä¼šå°†è¯¥æ–‡æœ¬æ³¨å…¥**å½“å‰è½®æ¬¡çš„ç”¨æˆ·æ¶ˆæ¯**ä¸­ã€‚è¿™æ˜¯è®°å¿†æ’ä»¶ã€RAG é›†æˆã€æŠ¤æ ä»¥åŠä»»ä½•éœ€è¦å‘æ¨¡åž‹æä¾›é¢å¤–ä¸Šä¸‹æ–‡çš„æ’ä»¶æ‰€ä½¿ç”¨çš„æœºåˆ¶ã€‚

#### è¿”å›žæ ¼å¼

```python
# åŒ…å« context é”®çš„å­—å…¸
return {"context": "Recalled memories:\n- User prefers dark mode\n- Last project: zed-agent"}

# çº¯å­—ç¬¦ä¸²ï¼ˆç­‰åŒäºŽä¸Šé¢çš„å­—å…¸å½¢å¼ï¼‰
return "Recalled memories:\n- User prefers dark mode"

# è¿”å›ž None æˆ–ä¸è¿”å›ž â†’ ä¸æ³¨å…¥ï¼ˆä»…è§‚å¯Ÿï¼‰
return None
```

ä»»ä½•éž Noneã€éžç©ºçš„è¿”å›žå€¼ï¼Œåªè¦åŒ…å« `"context"` é”®ï¼ˆæˆ–ä¸ºéžç©ºçº¯å­—ç¬¦ä¸²ï¼‰ï¼Œéƒ½ä¼šè¢«æ”¶é›†å¹¶è¿½åŠ åˆ°å½“å‰è½®æ¬¡çš„ç”¨æˆ·æ¶ˆæ¯ä¸­ã€‚

#### æ³¨å…¥çš„å·¥ä½œåŽŸç†

æ³¨å…¥çš„ä¸Šä¸‹æ–‡è¿½åŠ åˆ°**ç”¨æˆ·æ¶ˆæ¯**ï¼Œè€Œéžç³»ç»Ÿæç¤ºè¯ï¼ˆsystem promptï¼‰ã€‚è¿™æ˜¯æœ‰æ„ä¸ºä¹‹çš„è®¾è®¡ï¼š

- **ä¿ç•™æç¤ºè¯ç¼“å­˜**â€”â€”ç³»ç»Ÿæç¤ºè¯åœ¨å„è½®æ¬¡ä¹‹é—´ä¿æŒä¸å˜ã€‚Anthropic å’Œ OpenRouter ä¼šç¼“å­˜ç³»ç»Ÿæç¤ºè¯å‰ç¼€ï¼Œä¿æŒå…¶ç¨³å®šå¯åœ¨å¤šè½®å¯¹è¯ä¸­èŠ‚çœ 75% ä»¥ä¸Šçš„è¾“å…¥ tokenã€‚å¦‚æžœæ’ä»¶ä¿®æ”¹ç³»ç»Ÿæç¤ºè¯ï¼Œæ¯è½®éƒ½ä¼šç¼“å­˜æœªå‘½ä¸­ã€‚
- **ä¸´æ—¶æ€§**â€”â€”æ³¨å…¥ä»…åœ¨ API è°ƒç”¨æ—¶å‘ç”Ÿã€‚ä¼šè¯åŽ†å²ä¸­çš„åŽŸå§‹ç”¨æˆ·æ¶ˆæ¯ä¸ä¼šè¢«ä¿®æ”¹ï¼Œä¹Ÿä¸ä¼šæŒä¹…åŒ–åˆ°ä¼šè¯æ•°æ®åº“ã€‚
- **ç³»ç»Ÿæç¤ºè¯æ˜¯ Zed çš„é¢†åœ°**â€”â€”å®ƒåŒ…å«æ¨¡åž‹ç‰¹å®šçš„æŒ‡å¯¼ã€å·¥å…·æ‰§è¡Œè§„åˆ™ã€ä¸ªæ€§æŒ‡ä»¤å’Œç¼“å­˜çš„æŠ€èƒ½å†…å®¹ã€‚æ’ä»¶åœ¨ç”¨æˆ·è¾“å…¥æ—è¾¹è´¡çŒ®ä¸Šä¸‹æ–‡ï¼Œè€Œéžä¿®æ”¹ä»£ç†çš„æ ¸å¿ƒæŒ‡ä»¤ã€‚

#### ç¤ºä¾‹ï¼šè®°å¿†å¬å›žæ’ä»¶

```python
"""Memory plugin â€” recalls relevant context from a vector store."""

import httpx

MEMORY_API = "https://your-memory-api.example.com"

def recall_context(session_id, user_message, is_first_turn, **kwargs):
    """Called before each LLM turn. Returns recalled memories."""
    try:
        resp = httpx.post(f"{MEMORY_API}/recall", json={
            "session_id": session_id,
            "query": user_message,
        }, timeout=3)
        memories = resp.json().get("results", [])
        if not memories:
            return None  # nothing to inject

        text = "Recalled context from previous sessions:\n"
        text += "\n".join(f"- {m['text']}" for m in memories)
        return {"context": text}
    except Exception:
        return None  # fail silently, don't break the agent

def register(ctx):
    ctx.register_hook("pre_llm_call", recall_context)
```

#### ç¤ºä¾‹ï¼šæŠ¤æ æ’ä»¶

```python
"""Guardrails plugin â€” enforces content policies."""

POLICY = """You MUST follow these content policies for this session:
- Never generate code that accesses the filesystem outside the working directory
- Always warn before executing destructive operations
- Refuse requests involving personal data extraction"""

def inject_guardrails(**kwargs):
    """Injects policy text into every turn."""
    return {"context": POLICY}

def register(ctx):
    ctx.register_hook("pre_llm_call", inject_guardrails)
```

#### ç¤ºä¾‹ï¼šä»…è§‚å¯Ÿé’©å­ï¼ˆä¸æ³¨å…¥ï¼‰

```python
"""Analytics plugin â€” tracks turn metadata without injecting context."""

import logging
logger = logging.getLogger(__name__)

def log_turn(session_id, user_message, model, is_first_turn, **kwargs):
    """Fires before each LLM call. Returns None â€” no context injected."""
    logger.info("Turn: session=%s model=%s first=%s msg_len=%d",
                session_id, model, is_first_turn, len(user_message or ""))
    # No return â†’ no injection

def register(ctx):
    ctx.register_hook("pre_llm_call", log_turn)
```

#### å¤šä¸ªæ’ä»¶è¿”å›žä¸Šä¸‹æ–‡

å½“å¤šä¸ªæ’ä»¶ä»Ž `pre_llm_call` è¿”å›žä¸Šä¸‹æ–‡æ—¶ï¼Œå®ƒä»¬çš„è¾“å‡ºä»¥åŒæ¢è¡Œç¬¦è¿žæŽ¥ï¼Œä¸€èµ·è¿½åŠ åˆ°ç”¨æˆ·æ¶ˆæ¯ä¸­ã€‚é¡ºåºéµå¾ªæ’ä»¶å‘çŽ°é¡ºåºï¼ˆæŒ‰æ’ä»¶ç›®å½•åç§°å­—æ¯æŽ’åºï¼‰ã€‚

### æ³¨å†Œ CLI å‘½ä»¤

æ’ä»¶å¯ä»¥æ·»åŠ è‡ªå·±çš„ `zed <plugin>` å­å‘½ä»¤æ ‘ï¼š

```python
def _my_command(args):
    """Handler for zed my-plugin <subcommand>."""
    sub = getattr(args, "my_command", None)
    if sub == "status":
        print("All good!")
    elif sub == "config":
        print("Current config: ...")
    else:
        print("Usage: zed my-plugin <status|config>")

def _setup_argparse(subparser):
    """Build the argparse tree for zed my-plugin."""
    subs = subparser.add_subparsers(dest="my_command")
    subs.add_parser("status", help="Show plugin status")
    subs.add_parser("config", help="Show plugin config")
    subparser.set_defaults(func=_my_command)

def register(ctx):
    ctx.register_tool(...)
    ctx.register_cli_command(
        name="my-plugin",
        help="Manage my plugin",
        setup_fn=_setup_argparse,
        handler_fn=_my_command,
    )
```

æ³¨å†ŒåŽï¼Œç”¨æˆ·å¯ä»¥è¿è¡Œ `zed my-plugin status`ã€`zed my-plugin config` ç­‰å‘½ä»¤ã€‚

**è®°å¿†æä¾›å•†æ’ä»¶**ä½¿ç”¨åŸºäºŽçº¦å®šçš„æ–¹å¼ï¼šåœ¨æ’ä»¶çš„ `cli.py` æ–‡ä»¶ä¸­æ·»åŠ  `register_cli(subparser)` å‡½æ•°ã€‚è®°å¿†æ’ä»¶å‘çŽ°ç³»ç»Ÿä¼šè‡ªåŠ¨æ‰¾åˆ°å®ƒâ€”â€”æ— éœ€è°ƒç”¨ `ctx.register_cli_command()`ã€‚è¯¦è§[è®°å¿†æä¾›å•†æ’ä»¶æŒ‡å—](/developer-guide/memory-provider-plugin#adding-cli-commands)ã€‚

**æ´»è·ƒæä¾›å•†é™åˆ¶ï¼š** è®°å¿†æ’ä»¶ CLI å‘½ä»¤ä»…åœ¨å…¶æä¾›å•†æ˜¯é…ç½®ä¸­æ´»è·ƒçš„ `memory.provider` æ—¶æ‰ä¼šå‡ºçŽ°ã€‚å¦‚æžœç”¨æˆ·å°šæœªè®¾ç½®ä½ çš„æä¾›å•†ï¼Œä½ çš„ CLI å‘½ä»¤ä¸ä¼šå‡ºçŽ°åœ¨å¸®åŠ©è¾“å‡ºä¸­ã€‚

### æ³¨å†Œæ–œæ å‘½ä»¤

æ’ä»¶å¯ä»¥æ³¨å†Œä¼šè¯å†…æ–œæ å‘½ä»¤â€”â€”ç”¨æˆ·åœ¨å¯¹è¯ä¸­è¾“å…¥çš„å‘½ä»¤ï¼ˆå¦‚ `/lcm status` æˆ– `/ping`ï¼‰ã€‚è¿™äº›å‘½ä»¤åœ¨ CLI å’Œç½‘å…³ï¼ˆTelegramã€Discord ç­‰ï¼‰ä¸­å‡å¯ä½¿ç”¨ã€‚

```python
def _handle_status(raw_args: str) -> str:
    """Handler for /mystatus â€” called with everything after the command name."""
    if raw_args.strip() == "help":
        return "Usage: /mystatus [help|check]"
    return "Plugin status: all systems nominal"

def register(ctx):
    ctx.register_command(
        "mystatus",
        handler=_handle_status,
        description="Show plugin status",
    )
```

æ³¨å†ŒåŽï¼Œç”¨æˆ·å¯ä»¥åœ¨ä»»æ„ä¼šè¯ä¸­è¾“å…¥ `/mystatus`ã€‚è¯¥å‘½ä»¤ä¼šå‡ºçŽ°åœ¨è‡ªåŠ¨è¡¥å…¨ã€`/help` è¾“å‡ºå’Œ Telegram æœºå™¨äººèœå•ä¸­ã€‚

**ç­¾åï¼š** `ctx.register_command(name: str, handler: Callable, description: str = "")`

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----------|------|-------------|
| `name` | `str` | ä¸å«å‰å¯¼æ–œæ çš„å‘½ä»¤åç§°ï¼ˆä¾‹å¦‚ `"lcm"`ã€`"mystatus"`ï¼‰ |
| `handler` | `Callable[[str], str \| None]` | ä»¥åŽŸå§‹å‚æ•°å­—ç¬¦ä¸²è°ƒç”¨ã€‚ä¹Ÿå¯ä»¥æ˜¯ `async`ã€‚ |
| `description` | `str` | æ˜¾ç¤ºåœ¨ `/help`ã€è‡ªåŠ¨è¡¥å…¨å’Œ Telegram æœºå™¨äººèœå•ä¸­ |

**ä¸Ž `register_cli_command()` çš„ä¸»è¦åŒºåˆ«ï¼š**

| | `register_command()` | `register_cli_command()` |
|---|---|---|
| è°ƒç”¨æ–¹å¼ | ä¼šè¯ä¸­çš„ `/name` | ç»ˆç«¯ä¸­çš„ `zed name` |
| é€‚ç”¨èŒƒå›´ | CLI ä¼šè¯ã€Telegramã€Discord ç­‰ | ä»…ç»ˆç«¯ |
| å¤„ç†å™¨æŽ¥æ”¶ | åŽŸå§‹å‚æ•°å­—ç¬¦ä¸² | argparse `Namespace` |
| ä½¿ç”¨åœºæ™¯ | è¯Šæ–­ã€çŠ¶æ€æŸ¥è¯¢ã€å¿«é€Ÿæ“ä½œ | å¤æ‚å­å‘½ä»¤æ ‘ã€è®¾ç½®å‘å¯¼ |

**å†²çªä¿æŠ¤ï¼š** å¦‚æžœæ’ä»¶å°è¯•æ³¨å†Œä¸Žå†…ç½®å‘½ä»¤ï¼ˆ`help`ã€`model`ã€`new` ç­‰ï¼‰å†²çªçš„åç§°ï¼Œæ³¨å†Œä¼šè¢«é™é»˜æ‹’ç»å¹¶è®°å½•è­¦å‘Šæ—¥å¿—ã€‚å†…ç½®å‘½ä»¤å§‹ç»ˆä¼˜å…ˆã€‚

**å¼‚æ­¥å¤„ç†å™¨ï¼š** ç½‘å…³åˆ†å‘ä¼šè‡ªåŠ¨æ£€æµ‹å¹¶ await å¼‚æ­¥å¤„ç†å™¨ï¼Œå› æ­¤å¯ä»¥ä½¿ç”¨åŒæ­¥æˆ–å¼‚æ­¥å‡½æ•°ï¼š

```python
async def _handle_check(raw_args: str) -> str:
    result = await some_async_operation()
    return f"Check result: {result}"

def register(ctx):
    ctx.register_command("check", handler=_handle_check, description="Run async check")
```

### ä»Žæ–œæ å‘½ä»¤åˆ†å‘å·¥å…·

éœ€è¦ç¼–æŽ’å·¥å…·çš„æ–œæ å‘½ä»¤å¤„ç†å™¨ï¼ˆç”Ÿæˆå­ä»£ç† `delegate_task`ã€è°ƒç”¨ `file_edit` ç­‰ï¼‰åº”ä½¿ç”¨ `ctx.dispatch_tool()`ï¼Œè€Œéžæ·±å…¥æ¡†æž¶å†…éƒ¨ã€‚çˆ¶ä»£ç†ä¸Šä¸‹æ–‡ï¼ˆå·¥ä½œåŒºæç¤ºã€spinnerã€æ¨¡åž‹ç»§æ‰¿ï¼‰ä¼šè‡ªåŠ¨è¿žæŽ¥ã€‚

```python
def register(ctx):
    def _handle_deliver(raw_args: str):
        result = ctx.dispatch_tool(
            "delegate_task",
            {
                "goal": raw_args,
                "toolsets": ["terminal", "file", "web"],
            },
        )
        return result

    ctx.register_command(
        "deliver",
        handler=_handle_deliver,
        description="Delegate a goal to a subagent",
    )
```

**ç­¾åï¼š** `ctx.dispatch_tool(name: str, args: dict, *, parent_agent=None) -> str`

| å‚æ•° | ç±»åž‹ | æè¿° |
|-----------|------|-------------|
| `name` | `str` | å·¥å…·æ³¨å†Œè¡¨ä¸­çš„å·¥å…·åç§°ï¼ˆä¾‹å¦‚ `"delegate_task"`ã€`"file_edit"`ï¼‰ |
| `args` | `dict` | å·¥å…·å‚æ•°ï¼Œä¸Žæ¨¡åž‹å‘é€çš„æ ¼å¼ç›¸åŒ |
| `parent_agent` | `Agent \| None` | å¯é€‰è¦†ç›–ã€‚çœç•¥æ—¶ä»Žå½“å‰ CLI ä»£ç†è§£æžï¼ˆç½‘å…³æ¨¡å¼ä¸‹ä¼˜é›…é™çº§ï¼‰ |

**è¿è¡Œæ—¶è¡Œä¸ºï¼š**

- **CLI æ¨¡å¼ï¼š** `parent_agent` ä»Žæ´»è·ƒçš„ CLI ä»£ç†è§£æžï¼Œå·¥ä½œåŒºæç¤ºã€spinner å’Œæ¨¡åž‹é€‰æ‹©æŒ‰é¢„æœŸç»§æ‰¿ã€‚
- **ç½‘å…³æ¨¡å¼ï¼š** æ²¡æœ‰ CLI ä»£ç†ï¼Œå·¥å…·ä¼˜é›…é™çº§â€”â€”å·¥ä½œåŒºä»Ž `TERMINAL_CWD` è¯»å–ï¼Œä¸æ˜¾ç¤º spinnerã€‚
- **æ˜¾å¼è¦†ç›–ï¼š** å¦‚æžœè°ƒç”¨è€…æ˜¾å¼ä¼ å…¥ `parent_agent=`ï¼Œåˆ™å°Šé‡è¯¥å€¼ï¼Œä¸ä¼šè¢«è¦†ç›–ã€‚

è¿™æ˜¯ä»Žæ’ä»¶å‘½ä»¤åˆ†å‘å·¥å…·çš„å…¬å¼€ç¨³å®šæŽ¥å£ã€‚æ’ä»¶ä¸åº”è®¿é—® `ctx._cli_ref.agent` æˆ–ç±»ä¼¼çš„ç§æœ‰çŠ¶æ€ã€‚

:::tip
æœ¬æŒ‡å—æ¶µç›–**é€šç”¨æ’ä»¶**ï¼ˆå·¥å…·ã€é’©å­ã€æ–œæ å‘½ä»¤ã€CLI å‘½ä»¤ï¼‰ã€‚ä»¥ä¸‹å„èŠ‚ç®€è¦ä»‹ç»æ¯ç§ä¸“ç”¨æ’ä»¶ç±»åž‹çš„ç¼–å†™æ¨¡å¼ï¼›æ¯èŠ‚å‡é“¾æŽ¥åˆ°å…¶å®Œæ•´æŒ‡å—ä»¥èŽ·å–å­—æ®µå‚è€ƒå’Œç¤ºä¾‹ã€‚
:::

## ä¸“ç”¨æ’ä»¶ç±»åž‹

Zed åœ¨é€šç”¨æŽ¥å£ä¹‹å¤–è¿˜æœ‰äº”ç§ä¸“ç”¨æ’ä»¶ç±»åž‹ã€‚æ¯ç§éƒ½ä»¥ç›®å½•å½¢å¼å­˜æ”¾åœ¨ `plugins/<category>/<name>/`ï¼ˆå†…ç½®ï¼‰æˆ– `~/.zed/plugins/<category>/<name>/`ï¼ˆç”¨æˆ·ï¼‰ä¸‹ã€‚å„ç±»åˆ«çš„çº¦å®šä¸åŒâ€”â€”é€‰æ‹©ä½ éœ€è¦çš„ç±»åž‹ï¼Œç„¶åŽé˜…è¯»å…¶å®Œæ•´æŒ‡å—ã€‚

### æ¨¡åž‹æä¾›å•†æ’ä»¶â€”â€”æ·»åŠ  LLM åŽç«¯

åœ¨ `plugins/model-providers/<name>/` ä¸‹æ”¾ç½®ä¸€ä¸ªé…ç½®æ–‡ä»¶ï¼š

```python
# plugins/model-providers/acme/__init__.py
from providers import register_provider
from providers.base import ProviderProfile

register_provider(ProviderProfile(
    name="acme",
    aliases=("acme-inference",),
    display_name="Acme Inference",
    env_vars=("ACME_API_KEY", "ACME_BASE_URL"),
    base_url="https://api.acme.example.com/v1",
    auth_type="api_key",
    default_aux_model="acme-small-fast",
    fallback_models=("acme-large-v3", "acme-medium-v3"),
))
```

```yaml
# plugins/model-providers/acme/plugin.yaml
name: acme-provider
kind: model-provider
version: 1.0.0
description: Acme Inference â€” OpenAI-compatible direct API
```

åœ¨ä»»ä½•è°ƒç”¨ `get_provider_profile()` æˆ– `list_providers()` çš„åœ°æ–¹é¦–æ¬¡ä½¿ç”¨æ—¶æ‡’åŠ è½½å‘çŽ°â€”â€”`auth.py`ã€`config.py`ã€`doctor.py`ã€`models.py`ã€`runtime_provider.py` å’Œ chat_completions ä¼ è¾“å±‚ä¼šè‡ªåŠ¨è¿žæŽ¥ã€‚ç”¨æˆ·æ’ä»¶æŒ‰åç§°è¦†ç›–å†…ç½®æ’ä»¶ã€‚

**å®Œæ•´æŒ‡å—ï¼š** [æ¨¡åž‹æä¾›å•†æ’ä»¶](/developer-guide/model-provider-plugin)â€”â€”å­—æ®µå‚è€ƒã€å¯è¦†ç›–é’©å­ï¼ˆ`prepare_messages`ã€`build_extra_body`ã€`build_api_kwargs_extras`ã€`fetch_models`ï¼‰ã€api_mode é€‰æ‹©ã€è®¤è¯ç±»åž‹ã€æµ‹è¯•ã€‚

### å¹³å°æ’ä»¶â€”â€”æ·»åŠ ç½‘å…³é¢‘é“

åœ¨ `plugins/platforms/<name>/` ä¸‹æ”¾ç½®é€‚é…å™¨ï¼š

```python
# plugins/platforms/myplatform/adapter.py
from gateway.platforms.base import BasePlatformAdapter

class MyPlatformAdapter(BasePlatformAdapter):
    async def connect(self): ...
    async def send(self, chat_id, text): ...
    async def disconnect(self): ...

def check_requirements():
    import os
    return bool(os.environ.get("MYPLATFORM_TOKEN"))

def _env_enablement():
    import os
    tok = os.getenv("MYPLATFORM_TOKEN", "").strip()
    if not tok:
        return None
    return {"token": tok}

def register(ctx):
    ctx.register_platform(
        name="myplatform",
        label="MyPlatform",
        adapter_factory=lambda cfg: MyPlatformAdapter(cfg),
        check_fn=check_requirements,
        required_env=["MYPLATFORM_TOKEN"],
        # ä»ŽçŽ¯å¢ƒå˜é‡è‡ªåŠ¨å¡«å…… PlatformConfig.extraï¼Œä½¿ä»…çŽ¯å¢ƒå˜é‡çš„è®¾ç½®
        # åœ¨ `zed gateway status` ä¸­æ˜¾ç¤ºï¼Œæ— éœ€ SDK å®žä¾‹åŒ–ã€‚
        env_enablement_fn=_env_enablement,
        # å¯ç”¨ cron æŠ•é€’ï¼š`deliver=myplatform` è·¯ç”±åˆ°æ­¤å˜é‡ã€‚
        cron_deliver_env_var="MYPLATFORM_HOME_CHANNEL",
        emoji="ðŸ’¬",
        platform_hint="You are chatting via MyPlatform. Keep responses concise.",
    )
```

```yaml
# plugins/platforms/myplatform/plugin.yaml
name: myplatform-platform
label: MyPlatform
kind: platform
version: 1.0.0
description: MyPlatform gateway adapter
requires_env:
  - name: MYPLATFORM_TOKEN
    description: "Bot token from the MyPlatform console"
    password: true
optional_env:
  - name: MYPLATFORM_HOME_CHANNEL
    description: "Default channel for cron delivery"
    password: false
```

**å®Œæ•´æŒ‡å—ï¼š** [æ·»åŠ å¹³å°é€‚é…å™¨](/developer-guide/adding-platform-adapters)â€”â€”å®Œæ•´çš„ `BasePlatformAdapter` çº¦å®šã€æ¶ˆæ¯è·¯ç”±ã€è®¤è¯é™åˆ¶ã€è®¾ç½®å‘å¯¼é›†æˆã€‚å‚è€ƒ `plugins/platforms/irc/` èŽ·å–ä»…ä½¿ç”¨æ ‡å‡†åº“çš„å¯ç”¨ç¤ºä¾‹ã€‚

### è®°å¿†æä¾›å•†æ’ä»¶â€”â€”æ·»åŠ è·¨ä¼šè¯çŸ¥è¯†åŽç«¯

åœ¨ `plugins/memory/<name>/` ä¸‹å®žçŽ° `MemoryProvider`ï¼š

```python
# plugins/memory/my-memory/__init__.py
from agent.memory_provider import MemoryProvider

class MyMemoryProvider(MemoryProvider):
    @property
    def name(self) -> str:
        return "my-memory"

    def is_available(self) -> bool:
        import os
        return bool(os.environ.get("MY_MEMORY_API_KEY"))

    def initialize(self, session_id: str, **kwargs) -> None:
        self._session_id = session_id

    def sync_turn(self, user_message, assistant_response, **kwargs) -> None:
        ...

    def prefetch(self, query: str, **kwargs) -> str | None:
        ...

def register(ctx):
    ctx.register_memory_provider(MyMemoryProvider())
```

è®°å¿†æä¾›å•†æ˜¯å•é€‰çš„â€”â€”åŒä¸€æ—¶é—´åªæœ‰ä¸€ä¸ªå¤„äºŽæ´»è·ƒçŠ¶æ€ï¼Œé€šè¿‡ `config.yaml` ä¸­çš„ `memory.provider` é€‰æ‹©ã€‚

**å®Œæ•´æŒ‡å—ï¼š** [è®°å¿†æä¾›å•†æ’ä»¶](/developer-guide/memory-provider-plugin)â€”â€”å®Œæ•´çš„ `MemoryProvider` ABCã€çº¿ç¨‹çº¦å®šã€é…ç½®æ–‡ä»¶éš”ç¦»ã€é€šè¿‡ `cli.py` æ³¨å†Œ CLI å‘½ä»¤ã€‚

### ä¸Šä¸‹æ–‡å¼•æ“Žæ’ä»¶â€”â€”æ›¿æ¢ä¸Šä¸‹æ–‡åŽ‹ç¼©å™¨

```python
# plugins/context_engine/my-engine/__init__.py
from agent.context_engine import ContextEngine

class MyContextEngine(ContextEngine):
    @property
    def name(self) -> str:
        return "my-engine"

    def should_compress(self, messages, model) -> bool: ...
    def compress(self, messages, model) -> list[dict]: ...

def register(ctx):
    ctx.register_context_engine(MyContextEngine())
```

ä¸Šä¸‹æ–‡å¼•æ“Žæ˜¯å•é€‰çš„â€”â€”é€šè¿‡ `config.yaml` ä¸­çš„ `context.engine` é€‰æ‹©ã€‚

**å®Œæ•´æŒ‡å—ï¼š** [ä¸Šä¸‹æ–‡å¼•æ“Žæ’ä»¶](/developer-guide/context-engine-plugin)ã€‚

### å›¾åƒç”ŸæˆåŽç«¯

åœ¨ `plugins/image_gen/<name>/` ä¸‹æ”¾ç½®æä¾›å•†ï¼š

```python
# plugins/image_gen/my-imggen/__init__.py
from agent.image_gen_provider import ImageGenProvider

class MyImageGenProvider(ImageGenProvider):
    @property
    def name(self) -> str:
        return "my-imggen"

    def is_available(self) -> bool: ...
    def generate(self, prompt: str, **kwargs) -> str: ...   # returns image path

def register(ctx):
    ctx.register_image_gen_provider(MyImageGenProvider())
```

```yaml
# plugins/image_gen/my-imggen/plugin.yaml
name: my-imggen
kind: backend
version: 1.0.0
description: Custom image generation backend
```

**å®Œæ•´æŒ‡å—ï¼š** [å›¾åƒç”Ÿæˆæä¾›å•†æ’ä»¶](/developer-guide/image-gen-provider-plugin)â€”â€”å®Œæ•´çš„ `ImageGenProvider` ABCã€`list_models()` / `get_setup_schema()` å…ƒæ•°æ®ã€`success_response()`/`error_response()` è¾…åŠ©å‡½æ•°ã€base64 ä¸Ž URL è¾“å‡ºã€ç”¨æˆ·è¦†ç›–ã€pip åˆ†å‘ã€‚

**å‚è€ƒç¤ºä¾‹ï¼š** `plugins/image_gen/openai/`ï¼ˆDALL-E / GPT-Image via OpenAI SDKï¼‰ã€`plugins/image_gen/openai-codex/`ã€`plugins/image_gen/xai/`ï¼ˆGrok å›¾åƒç”Ÿæˆï¼‰ã€‚

## éž Python æ‰©å±•æŽ¥å£

Zed ä¹ŸæŽ¥å—å®Œå…¨ä¸æ˜¯ Python æ’ä»¶çš„æ‰©å±•ã€‚è¿™äº›åœ¨[å¯æ’æ‹”æŽ¥å£è¡¨](/user-guide/features/plugins#pluggable-interfaces--where-to-go-for-each)ä¸­æœ‰æ‰€å±•ç¤ºï¼›ä»¥ä¸‹å„èŠ‚ç®€è¦ä»‹ç»æ¯ç§ç¼–å†™æ–¹å¼ã€‚

### MCP æœåŠ¡å™¨â€”â€”æ³¨å†Œå¤–éƒ¨å·¥å…·

Model Context Protocolï¼ˆMCPï¼‰æœåŠ¡å™¨æ— éœ€ä»»ä½• Python æ’ä»¶å³å¯å°†è‡ªå·±çš„å·¥å…·æ³¨å†Œåˆ° Zedã€‚åœ¨ `~/.zed/config.yaml` ä¸­å£°æ˜Žï¼š

```yaml
mcp_servers:
  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    timeout: 120

  linear:
    url: "https://mcp.linear.app/sse"
    auth:
      type: "oauth"
```

Zed åœ¨å¯åŠ¨æ—¶è¿žæŽ¥åˆ°æ¯ä¸ªæœåŠ¡å™¨ï¼Œåˆ—å‡ºå…¶å·¥å…·ï¼Œå¹¶ä¸Žå†…ç½®å·¥å…·ä¸€èµ·æ³¨å†Œã€‚LLM çœ‹åˆ°å®ƒä»¬çš„æ–¹å¼ä¸Žå…¶ä»–å·¥å…·å®Œå…¨ç›¸åŒã€‚**å®Œæ•´æŒ‡å—ï¼š** [MCP](/user-guide/features/mcp)ã€‚

### ç½‘å…³äº‹ä»¶é’©å­â€”â€”åœ¨ç”Ÿå‘½å‘¨æœŸäº‹ä»¶æ—¶è§¦å‘

å°†æ¸…å•å’Œå¤„ç†å™¨æ”¾å…¥ `~/.zed/hooks/<name>/`ï¼š

```yaml
# ~/.zed/hooks/long-task-alert/HOOK.yaml
name: long-task-alert
description: Send a push notification when a long task finishes
events:
  - agent:end
```

```python
# ~/.zed/hooks/long-task-alert/handler.py
async def handle(event_type: str, context: dict) -> None:
    if context.get("duration_seconds", 0) > 120:
        # send notification â€¦
        pass
```

äº‹ä»¶åŒ…æ‹¬ `gateway:startup`ã€`session:start`ã€`session:end`ã€`session:reset`ã€`agent:start`ã€`agent:step`ã€`agent:end` ä»¥åŠé€šé…ç¬¦ `command:*`ã€‚é’©å­ä¸­çš„é”™è¯¯ä¼šè¢«æ•èŽ·å¹¶è®°å½•æ—¥å¿—â€”â€”å®ƒä»¬ä¸ä¼šé˜»å¡žä¸»æµç¨‹ã€‚

**å®Œæ•´æŒ‡å—ï¼š** [ç½‘å…³äº‹ä»¶é’©å­](/user-guide/features/hooks#gateway-event-hooks)ã€‚

### Shell é’©å­â€”â€”åœ¨å·¥å…·è°ƒç”¨æ—¶è¿è¡Œ shell å‘½ä»¤

å¦‚æžœä½ åªæƒ³åœ¨å·¥å…·è§¦å‘æ—¶è¿è¡Œè„šæœ¬ï¼ˆé€šçŸ¥ã€å®¡è®¡æ—¥å¿—ã€æ¡Œé¢æé†’ã€è‡ªåŠ¨æ ¼å¼åŒ–ï¼‰ï¼Œåœ¨ `config.yaml` ä¸­ä½¿ç”¨ shell é’©å­â€”â€”æ— éœ€ Pythonï¼š

```yaml
hooks:
  - event: post_tool_call
    command: "notify-send 'Tool ran: {tool_name}'"
    when:
      tools: [terminal, patch, write_file]
```

æ”¯æŒä¸Ž Python æ’ä»¶é’©å­ç›¸åŒçš„æ‰€æœ‰äº‹ä»¶ï¼ˆ`pre_tool_call`ã€`post_tool_call`ã€`pre_llm_call`ã€`post_llm_call`ã€`on_session_start`ã€`on_session_end`ã€`pre_gateway_dispatch`ï¼‰ï¼Œä»¥åŠç”¨äºŽ `pre_tool_call` é˜»æ–­å†³ç­–çš„ç»“æž„åŒ– JSON è¾“å‡ºã€‚

**å®Œæ•´æŒ‡å—ï¼š** [Shell é’©å­](/user-guide/features/hooks#shell-hooks)ã€‚

### æŠ€èƒ½æ¥æºâ€”â€”æ·»åŠ è‡ªå®šä¹‰æŠ€èƒ½æ³¨å†Œè¡¨

å¦‚æžœä½ ç»´æŠ¤äº†ä¸€ä¸ªæŠ€èƒ½ GitHub ä»“åº“ï¼ˆæˆ–æƒ³ä»Žå†…ç½®æ¥æºä¹‹å¤–çš„ç¤¾åŒºç´¢å¼•æ‹‰å–ï¼‰ï¼Œå°†å…¶æ·»åŠ ä¸º **tap**ï¼š

```bash
zed skills tap add myorg/skills-repo
zed skills search my-workflow --source myorg/skills-repo
zed skills install myorg/skills-repo/my-workflow
```

å‘å¸ƒä½ è‡ªå·±çš„ tap åªéœ€ä¸€ä¸ªåŒ…å« `skills/<skill-name>/SKILL.md` ç›®å½•çš„ GitHub ä»“åº“â€”â€”æ— éœ€æœåŠ¡å™¨æˆ–æ³¨å†Œè¡¨æ³¨å†Œã€‚

**å®Œæ•´æŒ‡å—ï¼š** [æŠ€èƒ½ä¸­å¿ƒ](/user-guide/features/skills#skills-hub) Â· [å‘å¸ƒè‡ªå®šä¹‰ tap](/user-guide/features/skills#publishing-a-custom-skill-tap)ï¼ˆä»“åº“ç»“æž„ã€æœ€å°ç¤ºä¾‹ã€éžé»˜è®¤è·¯å¾„ã€ä¿¡ä»»çº§åˆ«ï¼‰ã€‚

### é€šè¿‡å‘½ä»¤æ¨¡æ¿æŽ¥å…¥ TTS / STT

ä»»ä½•è¯»å†™éŸ³é¢‘æˆ–æ–‡æœ¬çš„ CLI éƒ½å¯ä»¥é€šè¿‡ `config.yaml` æŽ¥å…¥â€”â€”æ— éœ€ Python ä»£ç ï¼š

```yaml
tts:
  provider: voxcpm
  providers:
    voxcpm:
      type: command
      command: "voxcpm --ref ~/voice.wav --text-file {input_path} --out {output_path}"
      output_format: mp3
      voice_compatible: true
```

å¯¹äºŽ STTï¼Œå°† `ZED_LOCAL_STT_COMMAND` æŒ‡å‘ä¸€ä¸ª shell æ¨¡æ¿ã€‚æ”¯æŒçš„å ä½ç¬¦ï¼š`{input_path}`ã€`{output_path}`ã€`{format}`ã€`{voice}`ã€`{model}`ã€`{speed}`ï¼ˆTTSï¼‰ï¼›`{input_path}`ã€`{output_dir}`ã€`{language}`ã€`{model}`ï¼ˆSTTï¼‰ã€‚ä»»ä½•ä¸Žè·¯å¾„äº¤äº’çš„ CLI éƒ½è‡ªåŠ¨æˆä¸ºæ’ä»¶ã€‚

**å®Œæ•´æŒ‡å—ï¼š** [TTS è‡ªå®šä¹‰å‘½ä»¤æä¾›å•†](/user-guide/features/tts#custom-command-providers) Â· [STT](/user-guide/features/tts#voice-message-transcription-stt)ã€‚

## é€šè¿‡ pip åˆ†å‘

å¦‚éœ€å…¬å¼€åˆ†äº«æ’ä»¶ï¼Œåœ¨ä½ çš„ Python åŒ…ä¸­æ·»åŠ  entry pointï¼š

```toml
# pyproject.toml
[project.entry-points."zed_agent.plugins"]
my-plugin = "my_plugin_package"
```

```bash
pip install zed-plugin-calculator
# ä¸‹æ¬¡ zed å¯åŠ¨æ—¶è‡ªåŠ¨å‘çŽ°æ’ä»¶
```

## ä¸º NixOS åˆ†å‘

å¦‚æžœä½ æä¾›äº†å¸¦æœ‰ entry points çš„ `pyproject.toml`ï¼ŒNixOS ç”¨æˆ·å¯ä»¥å£°æ˜Žå¼å®‰è£…ä½ çš„æ’ä»¶ï¼š

**Entry-point æ’ä»¶**ï¼ˆæŽ¨èç”¨äºŽåˆ†å‘ï¼‰ï¼š
```nix
# User's configuration.nix
services.zed-agent.extraPythonPackages = [
  (pkgs.python312Packages.buildPythonPackage {
    pname = "my-plugin";
    version = "1.0.0";
    src = pkgs.fetchFromGitHub {
      owner = "you";
      repo = "zed-my-plugin";
      rev = "v1.0.0";
      hash = "sha256-...";  # nix-prefetch-url --unpack
    };
    format = "pyproject";
    build-system = [ pkgs.python312Packages.setuptools ];
  })
];
```

**ç›®å½•æ’ä»¶**ï¼ˆæ— éœ€ `pyproject.toml`ï¼‰ï¼š
```nix
services.zed-agent.extraPlugins = [
  (pkgs.fetchFromGitHub {
    owner = "you";
    repo = "zed-my-plugin";
    rev = "v1.0.0";
    hash = "sha256-...";
  })
];
```

å®Œæ•´æ–‡æ¡£ï¼ˆåŒ…æ‹¬ overlay ç”¨æ³•å’Œå†²çªæ£€æŸ¥ï¼‰è§ [Nix è®¾ç½®æŒ‡å—](/getting-started/nix-setup#plugins)ã€‚

## å¸¸è§é”™è¯¯

**å¤„ç†å™¨æœªè¿”å›ž JSON å­—ç¬¦ä¸²ï¼š**
```python
# é”™è¯¯â€”â€”è¿”å›žäº†å­—å…¸
def handler(args, **kwargs):
    return {"result": 42}

# æ­£ç¡®â€”â€”è¿”å›ž JSON å­—ç¬¦ä¸²
def handler(args, **kwargs):
    return json.dumps({"result": 42})
```

**å¤„ç†å™¨ç­¾åç¼ºå°‘ `**kwargs`ï¼š**
```python
# é”™è¯¯â€”â€”Zed ä¼ å…¥é¢å¤–ä¸Šä¸‹æ–‡æ—¶ä¼šæŠ¥é”™
def handler(args):
    ...

# æ­£ç¡®
def handler(args, **kwargs):
    ...
```

**å¤„ç†å™¨æŠ›å‡ºå¼‚å¸¸ï¼š**
```python
# é”™è¯¯â€”â€”å¼‚å¸¸ä¼ æ’­ï¼Œå·¥å…·è°ƒç”¨å¤±è´¥
def handler(args, **kwargs):
    result = 1 / int(args["value"])  # ZeroDivisionError!
    return json.dumps({"result": result})

# æ­£ç¡®â€”â€”æ•èŽ·å¼‚å¸¸å¹¶è¿”å›žé”™è¯¯ JSON
def handler(args, **kwargs):
    try:
        result = 1 / int(args.get("value", 0))
        return json.dumps({"result": result})
    except Exception as e:
        return json.dumps({"error": str(e)})
```

**Schema æè¿°è¿‡äºŽæ¨¡ç³Šï¼š**
```python
# å·®â€”â€”æ¨¡åž‹ä¸çŸ¥é“ä½•æ—¶ä½¿ç”¨
"description": "Does stuff"

# å¥½â€”â€”æ¨¡åž‹æ¸…æ¥šåœ°çŸ¥é“ä½•æ—¶ä»¥åŠå¦‚ä½•ä½¿ç”¨
"description": "Evaluate a mathematical expression. Use for arithmetic, trig, logarithms. Supports: +, -, *, /, **, sqrt, sin, cos, log, pi, e."
```