---
sidebar_position: 2
title: "æ·»åŠ å·¥å…·"
description: "å¦‚ä½•å‘ Zed Agent æ·»åŠ æ–°å·¥å…·â€”â€”schemaã€handlerã€æ³¨å†Œä¸Ž toolset"
---

# æ·»åŠ å·¥å…·

åœ¨ç¼–å†™å·¥å…·ä¹‹å‰ï¼Œå…ˆé—®è‡ªå·±ï¼š**è¿™æ˜¯å¦åº”è¯¥æ˜¯ä¸€ä¸ª [skill](creating-skills.md)ï¼Ÿ**

:::warning ä»…é™å†…ç½®æ ¸å¿ƒå·¥å…·
æœ¬é¡µé¢ç”¨äºŽå‘ä»“åº“æœ¬èº«æ·»åŠ  **Zed å†…ç½®å·¥å…·**ã€‚
å¦‚æžœä½ æƒ³è¦ä¸ªäººä¸“ç”¨ã€é¡¹ç›®æœ¬åœ°æˆ–å…¶ä»–è‡ªå®šä¹‰å·¥å…·ï¼Œè€Œä¸ä¿®æ”¹ Zed æ ¸å¿ƒï¼Œè¯·ä½¿ç”¨æ’ä»¶æ–¹å¼ï¼š

- [æ’ä»¶](/user-guide/features/plugins)
- [æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin)

å¤§å¤šæ•°è‡ªå®šä¹‰å·¥å…·åˆ›å»ºåœºæ™¯é»˜è®¤ä½¿ç”¨æ’ä»¶ã€‚åªæœ‰å½“ä½ æ˜Žç¡®å¸Œæœ›åœ¨ `tools/` å’Œ `toolsets.py` ä¸­å‘å¸ƒæ–°çš„å†…ç½®å·¥å…·æ—¶ï¼Œæ‰éµå¾ªæœ¬é¡µé¢ã€‚
:::

ä»¥ä¸‹æƒ…å†µåº”åˆ›å»º **Skill**ï¼šè¯¥èƒ½åŠ›å¯ä»¥é€šè¿‡æŒ‡ä»¤ + shell å‘½ä»¤ + çŽ°æœ‰å·¥å…·æ¥å®žçŽ°ï¼ˆå¦‚ arXiv æœç´¢ã€git å·¥ä½œæµã€Docker ç®¡ç†ã€PDF å¤„ç†ï¼‰ã€‚

ä»¥ä¸‹æƒ…å†µåº”åˆ›å»º **Tool**ï¼šéœ€è¦ä¸Ž API å¯†é’¥è¿›è¡Œç«¯åˆ°ç«¯é›†æˆã€è‡ªå®šä¹‰å¤„ç†é€»è¾‘ã€äºŒè¿›åˆ¶æ•°æ®å¤„ç†æˆ–æµå¼ä¼ è¾“ï¼ˆå¦‚æµè§ˆå™¨è‡ªåŠ¨åŒ–ã€TTSã€è§†è§‰åˆ†æžï¼‰ã€‚

## æ¦‚è¿°

æ·»åŠ ä¸€ä¸ªå·¥å…·æ¶‰åŠ **2 ä¸ªæ–‡ä»¶**ï¼š

1. **`tools/your_tool.py`** â€” handlerã€schemaã€check å‡½æ•°ã€`registry.register()` è°ƒç”¨
2. **`toolsets.py`** â€” å°†å·¥å…·åç§°æ·»åŠ åˆ° `_ZED_CORE_TOOLS`ï¼ˆæˆ–ç‰¹å®š toolsetï¼‰

ä»»ä½•åŒ…å«é¡¶å±‚ `registry.register()` è°ƒç”¨çš„ `tools/*.py` æ–‡ä»¶éƒ½ä¼šåœ¨å¯åŠ¨æ—¶è¢«è‡ªåŠ¨å‘çŽ°â€”â€”æ— éœ€æ‰‹åŠ¨ç»´æŠ¤å¯¼å…¥åˆ—è¡¨ã€‚

## ç¬¬ä¸€æ­¥ï¼šåˆ›å»ºå†…ç½®å·¥å…·æ–‡ä»¶

æ¯ä¸ªå·¥å…·æ–‡ä»¶éµå¾ªç›¸åŒçš„ç»“æž„ï¼š

```python
# tools/weather_tool.py
"""Weather Tool -- look up current weather for a location."""

import json
import os
import logging

logger = logging.getLogger(__name__)


# --- Availability check ---

def check_weather_requirements() -> bool:
    """Return True if the tool's dependencies are available."""
    return bool(os.getenv("WEATHER_API_KEY"))


# --- Handler ---

def weather_tool(location: str, units: str = "metric") -> str:
    """Fetch weather for a location. Returns JSON string."""
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        return json.dumps({"error": "WEATHER_API_KEY not configured"})
    try:
        # ... call weather API ...
        return json.dumps({"location": location, "temp": 22, "units": units})
    except Exception as e:
        return json.dumps({"error": str(e)})


# --- Schema ---

WEATHER_SCHEMA = {
    "name": "weather",
    "description": "Get current weather for a location.",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City name or coordinates (e.g. 'London' or '51.5,-0.1')"
            },
            "units": {
                "type": "string",
                "enum": ["metric", "imperial"],
                "description": "Temperature units (default: metric)",
                "default": "metric"
            }
        },
        "required": ["location"]
    }
}


# --- Registration ---

from tools.registry import registry

registry.register(
    name="weather",
    toolset="weather",
    schema=WEATHER_SCHEMA,
    handler=lambda args, **kw: weather_tool(
        location=args.get("location", ""),
        units=args.get("units", "metric")),
    check_fn=check_weather_requirements,
    requires_env=["WEATHER_API_KEY"],
)
```

### å…³é”®è§„åˆ™

:::danger é‡è¦
- Handler **å¿…é¡»**è¿”å›ž JSON å­—ç¬¦ä¸²ï¼ˆé€šè¿‡ `json.dumps()`ï¼‰ï¼Œä¸å¾—è¿”å›žåŽŸå§‹ dict
- é”™è¯¯**å¿…é¡»**ä»¥ `{"error": "message"}` å½¢å¼è¿”å›žï¼Œä¸å¾—æŠ›å‡ºå¼‚å¸¸
- `check_fn` åœ¨æž„å»ºå·¥å…·å®šä¹‰æ—¶è¢«è°ƒç”¨â€”â€”è‹¥è¿”å›ž `False`ï¼Œè¯¥å·¥å…·å°†è¢«é™é»˜æŽ’é™¤
- `handler` æŽ¥æ”¶ `(args: dict, **kwargs)`ï¼Œå…¶ä¸­ `args` æ˜¯ LLM çš„å·¥å…·è°ƒç”¨å‚æ•°
:::

## ç¬¬äºŒæ­¥ï¼šå°†å†…ç½®å·¥å…·æ·»åŠ åˆ° Toolset

åœ¨ `toolsets.py` ä¸­æ·»åŠ å·¥å…·åç§°ï¼š

```python
# If it should be available on all platforms (CLI + messaging):
_ZED_CORE_TOOLS = [
    ...
    "weather",  # <-- add here
]

# Or create a new standalone toolset:
"weather": {
    "description": "Weather lookup tools",
    "tools": ["weather"],
    "includes": []
},
```

## ~~ç¬¬ä¸‰æ­¥ï¼šæ·»åŠ å‘çŽ°å¯¼å…¥~~ï¼ˆä¸å†éœ€è¦ï¼‰

åŒ…å«é¡¶å±‚ `registry.register()` è°ƒç”¨çš„å·¥å…·æ¨¡å—ä¼šç”± `tools/registry.py` ä¸­çš„ `discover_builtin_tools()` è‡ªåŠ¨å‘çŽ°ã€‚æ— éœ€æ‰‹åŠ¨ç»´æŠ¤å¯¼å…¥åˆ—è¡¨â€”â€”åªéœ€åœ¨ `tools/` ä¸­åˆ›å»ºæ–‡ä»¶ï¼Œå¯åŠ¨æ—¶å³å¯è‡ªåŠ¨åŠ è½½ã€‚

## å¼‚æ­¥ Handler

å¦‚æžœä½ çš„ handler éœ€è¦å¼‚æ­¥ä»£ç ï¼Œä½¿ç”¨ `is_async=True` æ ‡è®°ï¼š

```python
async def weather_tool_async(location: str) -> str:
    async with aiohttp.ClientSession() as session:
        ...
    return json.dumps(result)

registry.register(
    name="weather",
    toolset="weather",
    schema=WEATHER_SCHEMA,
    handler=lambda args, **kw: weather_tool_async(args.get("location", "")),
    check_fn=check_weather_requirements,
    is_async=True,  # registry calls _run_async() automatically
)
```

registry ä¼šé€æ˜Žåœ°å¤„ç†å¼‚æ­¥æ¡¥æŽ¥â€”â€”ä½ æ— éœ€è‡ªå·±è°ƒç”¨ `asyncio.run()`ã€‚

## éœ€è¦ task_id çš„ Handler

ç®¡ç†æ¯ä¸ªä¼šè¯çŠ¶æ€çš„å·¥å…·é€šè¿‡ `**kwargs` æŽ¥æ”¶ `task_id`ï¼š

```python
def _handle_weather(args, **kw):
    task_id = kw.get("task_id")
    return weather_tool(args.get("location", ""), task_id=task_id)

registry.register(
    name="weather",
    ...
    handler=_handle_weather,
)
```

## Agent å¾ªçŽ¯æ‹¦æˆªå·¥å…·

æŸäº›å·¥å…·ï¼ˆ`todo`ã€`memory`ã€`session_search`ã€`delegate_task`ï¼‰éœ€è¦è®¿é—®æ¯ä¸ªä¼šè¯çš„ agent çŠ¶æ€ã€‚è¿™äº›å·¥å…·åœ¨åˆ°è¾¾ registry ä¹‹å‰ä¼šè¢« `run_agent.py` æ‹¦æˆªã€‚registry ä»ç„¶ä¿å­˜å®ƒä»¬çš„ schemaï¼Œä½†å¦‚æžœç»•è¿‡æ‹¦æˆªï¼Œ`dispatch()` ä¼šè¿”å›žä¸€ä¸ªå›žé€€é”™è¯¯ã€‚

## å¯é€‰ï¼šSetup Wizard é›†æˆ

å¦‚æžœä½ çš„å·¥å…·éœ€è¦ API å¯†é’¥ï¼Œå°†å…¶æ·»åŠ åˆ° `zed_cli/config.py`ï¼š

```python
OPTIONAL_ENV_VARS = {
    ...
    "WEATHER_API_KEY": {
        "description": "Weather API key for weather lookup",
        "prompt": "Weather API key",
        "url": "https://weatherapi.com/",
        "tools": ["weather"],
        "password": True,
    },
}
```

## æ£€æŸ¥æ¸…å•

- [ ] å·²åˆ›å»ºåŒ…å« handlerã€schemaã€check å‡½æ•°å’Œæ³¨å†Œè°ƒç”¨çš„å·¥å…·æ–‡ä»¶
- [ ] å·²åœ¨ `toolsets.py` ä¸­æ·»åŠ åˆ°é€‚å½“çš„ toolset
- [ ] å·²ç¡®è®¤è¯¥å·¥å…·ç¡®å®žåº”ä¸ºå†…ç½®/æ ¸å¿ƒå·¥å…·è€Œéžæ’ä»¶
- [ ] Handler è¿”å›ž JSON å­—ç¬¦ä¸²ï¼Œé”™è¯¯ä»¥ `{"error": "..."}` å½¢å¼è¿”å›ž
- [ ] å¯é€‰ï¼šå·²å°† API å¯†é’¥æ·»åŠ åˆ° `zed_cli/config.py` çš„ `OPTIONAL_ENV_VARS`
- [ ] å¯é€‰ï¼šå·²æ·»åŠ åˆ° `toolset_distributions.py` ä»¥æ”¯æŒæ‰¹é‡å¤„ç†
- [ ] å·²é€šè¿‡ `zed chat -q "Use the weather tool for London"` æµ‹è¯•
