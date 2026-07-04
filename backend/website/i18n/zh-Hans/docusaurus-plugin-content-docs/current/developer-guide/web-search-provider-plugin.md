---
sidebar_position: 12
title: "ç½‘é¡µæœç´¢æä¾›å•†æ’ä»¶"
description: "å¦‚ä½•ä¸º Zed Agent æž„å»ºç½‘é¡µæœç´¢/æå–/çˆ¬å–åŽç«¯æ’ä»¶"
---

# æž„å»ºç½‘é¡µæœç´¢æä¾›å•†æ’ä»¶

ç½‘é¡µæœç´¢æä¾›å•†æ’ä»¶æ³¨å†Œä¸€ä¸ªåŽç«¯ï¼Œç”¨äºŽå¤„ç† `web_search`ã€`web_extract` ä»¥åŠï¼ˆå¯é€‰çš„ï¼‰æ·±åº¦çˆ¬å–å·¥å…·è°ƒç”¨ã€‚å†…ç½®æä¾›å•†â€”â€”Firecrawlã€SearXNGã€Tavilyã€Exaã€Parallelã€Brave Searchï¼ˆå…è´¹å±‚ï¼‰å’Œ DDGSâ€”â€”å‡ä»¥æ’ä»¶å½¢å¼å­˜æ”¾äºŽ `plugins/web/<name>/` ç›®å½•ä¸‹ã€‚ä½ å¯ä»¥åœ¨è¯¥ç›®å½•æ—æ–°å»ºä¸€ä¸ªç›®å½•æ¥æ·»åŠ æ–°æä¾›å•†ï¼Œæˆ–è¦†ç›–å·²æœ‰çš„å†…ç½®æä¾›å•†ã€‚

:::tip
ç½‘é¡µæœç´¢æ˜¯ Zed æ”¯æŒçš„å¤šç§**åŽç«¯æ’ä»¶**ä¹‹ä¸€ã€‚å…¶ä»–æ’ä»¶ï¼ˆå„æœ‰å…¶ ABCï¼‰åŒ…æ‹¬ï¼š[å›¾åƒç”Ÿæˆæä¾›å•†æ’ä»¶](/developer-guide/image-gen-provider-plugin)ã€[è§†é¢‘ç”Ÿæˆæä¾›å•†æ’ä»¶](/developer-guide/video-gen-provider-plugin)ã€[è®°å¿†æä¾›å•†æ’ä»¶](/developer-guide/memory-provider-plugin)ã€[ä¸Šä¸‹æ–‡å¼•æ“Žæ’ä»¶](/developer-guide/context-engine-plugin)å’Œ[æ¨¡åž‹æä¾›å•†æ’ä»¶](/developer-guide/model-provider-plugin)ã€‚é€šç”¨å·¥å…·/hook/CLI æ’ä»¶è¯·å‚é˜…[æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin)ã€‚
:::

## å‘çŽ°æœºåˆ¶

Zed åœ¨ä¸‰ä¸ªä½ç½®æ‰«æç½‘é¡µæœç´¢åŽç«¯ï¼š

1. **å†…ç½®** â€” `<repo>/plugins/web/<name>/`ï¼ˆä»¥ `kind: backend` è‡ªåŠ¨åŠ è½½ï¼Œå§‹ç»ˆå¯ç”¨ï¼‰
2. **ç”¨æˆ·** â€” `~/.zed/plugins/web/<name>/`ï¼ˆé€šè¿‡ `plugins.enabled` æˆ– `zed plugins enable <name>` æŒ‰éœ€å¯ç”¨ï¼‰
3. **Pip** â€” å£°æ˜Žäº† `zed_agent.plugins` å…¥å£ç‚¹çš„åŒ…

æ¯ä¸ªæ’ä»¶çš„ `register(ctx)` å‡½æ•°è°ƒç”¨ `ctx.register_web_search_provider(...)` â€”â€”å°†å®žä¾‹æ³¨å†Œåˆ° `agent/web_search_registry.py` ä¸­çš„æ³¨å†Œè¡¨ã€‚å„èƒ½åŠ›çš„æ´»è·ƒæä¾›å•†ç”±é…ç½®å†³å®šï¼š

| èƒ½åŠ› | é…ç½®é”® | å›žé€€è‡³ |
|---|---|---|
| `web_search` | `web.search_backend` | `web.backend` |
| `web_extract` | `web.extract_backend` | `web.backend` |
| `web_extract` å†…çš„æ·±åº¦çˆ¬å–æ¨¡å¼ | `web.extract_backend` | `web.backend` |

è‹¥ä¸¤ä¸ªé”®å‡æœªè®¾ç½®ï¼ŒZed å°†æ ¹æ®çŽ¯å¢ƒä¸­å­˜åœ¨çš„ API key/URL è‡ªåŠ¨æ£€æµ‹åŽç«¯ã€‚`zed tools` ä¼šå¼•å¯¼ç”¨æˆ·å®Œæˆé€‰æ‹©ã€‚

## ç›®å½•ç»“æž„

```
plugins/web/my-backend/
â”œâ”€â”€ __init__.py     # register() å…¥å£ç‚¹
â”œâ”€â”€ provider.py     # WebSearchProvider å­ç±»
â””â”€â”€ plugin.yaml     # åŒ…å« kind: backend å’Œ provides_web_providers çš„æ¸…å•æ–‡ä»¶
```

`brave_free/` å’Œ `ddgs/` æ˜¯ä»£ç åº“ä¸­æœ€å°çš„å‚è€ƒå®žçŽ°â€”â€”`brave_free` æ˜¯éœ€è¦ API key çš„çº¯æœç´¢æä¾›å•†ï¼Œ`ddgs` æ˜¯æ— éœ€ key ä¸”æ‡’åŠ è½½ SDK çš„æä¾›å•†ã€‚

## WebSearchProvider ABC

ç»§æ‰¿ `agent.web_search_provider.WebSearchProvider`ã€‚å”¯ä¸€å¿…é¡»å®žçŽ°çš„æˆå‘˜æ˜¯ `name`ã€`is_available()`ï¼Œä»¥åŠä½ æ‰€å®žçŽ°çš„ `search()` / `extract()` / `crawl()` ä¸­çš„ç›¸åº”æ–¹æ³•ã€‚

```python
# plugins/web/my-backend/provider.py
from __future__ import annotations

import os
from typing import Any, Dict, List

from agent.web_search_provider import WebSearchProvider


class MyBackendWebSearchProvider(WebSearchProvider):
    """Minimal search-only provider against the My Backend HTTP API."""

    @property
    def name(self) -> str:
        # Stable id used in web.search_backend / web.extract_backend / web.backend
        # config keys. Lowercase, no spaces; hyphens permitted.
        return "my-backend"

    @property
    def display_name(self) -> str:
        # Human label shown in `zed tools`. Defaults to `name`.
        return "My Backend"

    def is_available(self) -> bool:
        # Cheap check â€” env var present, optional dep importable, etc.
        # MUST NOT make network calls (runs on every `zed tools` paint).
        return bool(os.getenv("MY_BACKEND_API_KEY", "").strip())

    def supports_search(self) -> bool:
        return True

    def supports_extract(self) -> bool:
        return False

    def search(self, query: str, limit: int = 5) -> Dict[str, Any]:
        import httpx

        api_key = os.environ["MY_BACKEND_API_KEY"]
        try:
            resp = httpx.get(
                "https://api.example.com/search",
                params={"q": query, "count": max(1, min(int(limit), 20))},
                headers={"Authorization": f"Bearer {api_key}"},
                timeout=15,
            )
            resp.raise_for_status()
            data = resp.json()
        except httpx.HTTPError as exc:
            return {"success": False, "error": str(exc)}

        # Response shape is fixed â€” see "Response shape" below.
        return {
            "success": True,
            "data": {
                "web": [
                    {
                        "title": item.get("title", ""),
                        "url": item.get("url", ""),
                        "description": item.get("snippet", ""),
                        "position": idx + 1,
                    }
                    for idx, item in enumerate(data.get("results", []))
                ],
            },
        }
```

```python
# plugins/web/my-backend/__init__.py
from plugins.web.my_backend.provider import MyBackendWebSearchProvider


def register(ctx) -> None:
    """Plugin entry point â€” called once at load time."""
    ctx.register_web_search_provider(MyBackendWebSearchProvider())
```

## plugin.yaml

```yaml
name: web-my-backend
version: 1.0.0
description: "My Backend web search â€” Bearer-auth REST API"
author: Your Name
kind: backend
provides_web_providers:
  - my-backend
requires_env:
  - MY_BACKEND_API_KEY
```

| é”® | ç”¨é€” |
|---|---|
| `kind: backend` | å°†æ’ä»¶è·¯ç”±è‡³åŽç«¯åŠ è½½è·¯å¾„ |
| `provides_web_providers` | è¯¥æ’ä»¶æ³¨å†Œçš„æä¾›å•† `name` åˆ—è¡¨â€”â€”åœ¨ `register()` è¿è¡Œä¹‹å‰ï¼ŒåŠ è½½å™¨å³å¯é€šè¿‡æ­¤å­—æ®µåœ¨ `zed tools` ä¸­å…¬ç¤ºæ’ä»¶ |
| `requires_env` | åœ¨ `zed plugins install` æœŸé—´è¿›è¡Œäº¤äº’å¼å‡­æ®æç¤ºï¼ˆå¯Œæ ¼å¼è¯´æ˜Žå‚è§[æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin#gate-on-environment-variables)ï¼‰ |

## ABC å‚è€ƒ

å®Œæ•´å¥‘çº¦ä½äºŽ `agent/web_search_provider.py`ã€‚å¯è¦†ç›–çš„æ–¹æ³•å¦‚ä¸‹ï¼š

| æˆå‘˜ | å¿…é¡» | é»˜è®¤å€¼ | ç”¨é€” |
|---|---|---|---|
| `name` | âœ… | â€” | åœ¨ `web.*_backend` é…ç½®ä¸­ä½¿ç”¨çš„ç¨³å®š id |
| `display_name` | â€” | `name` | åœ¨ `zed tools` ä¸­æ˜¾ç¤ºçš„æ ‡ç­¾ |
| `is_available()` | âœ… | â€” | è½»é‡å¯ç”¨æ€§æ£€æŸ¥â€”â€”çŽ¯å¢ƒå˜é‡ã€å¯é€‰ä¾èµ–ç­‰ |
| `supports_search()` | â€” | `True` | `web_search` è·¯ç”±çš„èƒ½åŠ›æ ‡å¿— |
| `supports_extract()` | â€” | `False` | `web_extract` è·¯ç”±çš„èƒ½åŠ›æ ‡å¿— |
| `search(query, limit)` | æ¡ä»¶å¿…é¡» | æŠ›å‡ºå¼‚å¸¸ | å½“ `supports_search()` è¿”å›ž `True` æ—¶å¿…é¡»å®žçŽ° |
| `extract(urls, **kwargs)` | æ¡ä»¶å¿…é¡» | æŠ›å‡ºå¼‚å¸¸ | å½“ `supports_extract()` è¿”å›ž `True` æ—¶å¿…é¡»å®žçŽ° |

æä¾›å•†å¯ä»¥åœ¨å•ä¸ªç±»ä¸­å£°æ˜Žå¤šç§èƒ½åŠ›â€”â€”Firecrawlã€Tavilyã€Exa å’Œ Parallel å‡å®žçŽ°äº†æœç´¢å’Œæå–ä¸¤ç§èƒ½åŠ›ã€‚Brave Search å’Œ DDGS ä»…æ”¯æŒæœç´¢ï¼›SearXNG ä¹Ÿä»…æ”¯æŒæœç´¢ï¼Œå¹¶æœ‰æ–‡æ¡£è¯´æ˜Žçš„"ä¸Žæå–æä¾›å•†é…å¯¹ä½¿ç”¨"å·¥ä½œæµã€‚

## å“åº”æ ¼å¼

å·¥å…·åŒ…è£…å™¨æœŸæœ›å›ºå®šçš„å“åº”ä¿¡å°ï¼ˆenvelopeï¼‰ï¼Œä»¥é¿å…åœ¨ä¸åŒåŽç«¯ä¹‹é—´è¿›è¡Œè½¬æ¢ã€‚

**æœç´¢æˆåŠŸï¼š**

```python
{
    "success": True,
    "data": {
        "web": [
            {"title": str, "url": str, "description": str, "position": int},
            ...
        ],
    },
}
```

**æå–æˆåŠŸï¼š**

```python
{
    "success": True,
    "data": [
        {
            "url": str,
            "title": str,
            "content": str,
            "raw_content": str,
            "metadata": dict,    # optional
            "error": str,        # optional, only on per-URL failure
        },
        ...
    ],
}
```

**ä»»æ„èƒ½åŠ›ï¼Œå¤±è´¥æ—¶ï¼š**

```python
{"success": False, "error": "human-readable message"}
```

`search()` å’Œ `extract()` å‡å¯å®šä¹‰ä¸º `async def`â€”â€”è°ƒåº¦å™¨é€šè¿‡ `inspect.iscoroutinefunction` æ£€æµ‹åç¨‹å‡½æ•°å¹¶ç›¸åº”åœ°è¿›è¡Œ awaitã€‚å¯¹äºŽå°åž‹åŽç«¯ï¼Œæ‰§è¡Œé˜»å¡ž I/Oï¼ˆHTTPã€SDK è°ƒç”¨ï¼‰çš„åŒæ­¥å®žçŽ°ä¹Ÿå®Œå…¨å¯è¡Œï¼›è°ƒåº¦å™¨ä¼šå¤„ç†çº¿ç¨‹è°ƒåº¦ã€‚

## èƒ½åŠ›æ ‡å¿—

Zed æ ¹æ® `supports_*` æ ‡å¿—å°†è°ƒç”¨è·¯ç”±è‡³æ­£ç¡®çš„æä¾›å•†ã€‚ä¸€ç§å¸¸è§çš„å¤šæä¾›å•†é…ç½®ï¼š

```yaml
# ~/.zed/config.yaml
web:
  search_backend: "brave-free"     # çº¯æœç´¢ï¼Œé€Ÿåº¦å¿«ï¼Œæ¯æœˆå…è´¹ 2k æ¬¡
  extract_backend: "firecrawl"     # æå– + çˆ¬å–ï¼Œä»˜è´¹é…é¢
```

å½“ `web.search_backend` æˆ– `web.extract_backend` æœªè®¾ç½®æ—¶ï¼Œå‡å›žé€€è‡³ `web.backend`ã€‚è‹¥è¯¥é¡¹ä¹Ÿæœªè®¾ç½®ï¼ŒZed å°†æ ¹æ®çŽ¯å¢ƒå˜é‡çš„å­˜åœ¨æƒ…å†µï¼Œé€‰å–ç¬¬ä¸€ä¸ªæ”¯æŒæ‰€è¯·æ±‚èƒ½åŠ›çš„å¯ç”¨æä¾›å•†ã€‚

å¦‚æžœä½ çš„æä¾›å•†åªæ”¯æŒä¸€ç§èƒ½åŠ›ï¼Œå°†å…¶ä»–æ ‡å¿—ä¿æŒé»˜è®¤å€¼ï¼ˆ`False`ï¼‰å³å¯ï¼Œæ³¨å†Œè¡¨ä¼šåœ¨å¯¹åº”å·¥å…·è°ƒç”¨æ—¶è·³è¿‡å®ƒâ€”â€”å½“ç”¨æˆ·ä»…å°† X ç”¨äºŽæœç´¢è€Œè¦æ±‚ agent è¿›è¡Œæå–æ—¶ï¼Œä¸ä¼šçœ‹åˆ°è¯¯å¯¼æ€§çš„"æä¾›å•† X å¤±è´¥"é”™è¯¯ã€‚

## Zed å¦‚ä½•å°†å…¶æŽ¥å…¥å·¥å…·

`web_search` å’Œ `web_extract` å·¥å…·ä½äºŽ `tools/web_tools.py`ã€‚è°ƒç”¨æ—¶æ‰§è¡Œä»¥ä¸‹æ­¥éª¤ï¼š

1. è¯»å–ç›¸å…³é…ç½®é”®ï¼ˆ`web_search` å¯¹åº” `web.search_backend`ï¼Œ`web_extract` å¯¹åº” `web.extract_backend`ï¼‰
2. å‘æ³¨å†Œè¡¨æŸ¥è¯¢å…·æœ‰è¯¥ `name` çš„æä¾›å•†
3. æ£€æŸ¥ `is_available()` åŠå¯¹åº”çš„ `supports_*()` æ ‡å¿—
4. è°ƒåº¦è‡³ `search()` / `extract()` / `crawl()`ï¼Œè‹¥æ–¹æ³•ä¸ºåç¨‹åˆ™è¿›è¡Œ await
5. å°†å“åº”ä¿¡å° JSON åºåˆ—åŒ–åŽè¿”å›žç»™ LLM

é”™è¯¯ä»¥å·¥å…·ç»“æžœçš„å½¢å¼å‘ˆçŽ°ï¼›LLM å†³å®šå¦‚ä½•è§£é‡Šã€‚è‹¥æ²¡æœ‰æä¾›å•†è¢«æ³¨å†Œï¼ˆæˆ–æ‰€æœ‰å¯ç”¨æä¾›å•†å‡æœªé€šè¿‡èƒ½åŠ›æ£€æŸ¥ï¼‰ï¼Œå·¥å…·å°†è¿”å›žä¸€æ¡æŒ‡å‘ `zed tools` çš„å‹å¥½é”™è¯¯ä¿¡æ¯ã€‚

## æ‡’åŠ è½½å¯é€‰ä¾èµ–

å¦‚æžœä½ çš„æä¾›å•†å°è£…äº†ç¬¬ä¸‰æ–¹ SDKï¼ˆå¦‚ DDGS å°è£…äº† `ddgs` åŒ…ï¼‰ï¼Œè¯·å‹¿åœ¨æ¨¡å—é¡¶å±‚ `import`ã€‚åœ¨ `is_available()` æˆ– `search()` å†…éƒ¨ä½¿ç”¨ `tools.lazy_deps.ensure(...)` â€”â€”Zed å°†åœ¨é¦–æ¬¡ä½¿ç”¨æ—¶å®‰è£…è¯¥åŒ…ï¼Œå¹¶å— `security.allow_lazy_installs` æŽ§åˆ¶ã€‚å®‰å…¨æ¨¡åž‹è¯¦è§[æž„å»º Zed æ’ä»¶ â†’ æ‡’åŠ è½½](/guides/build-a-zed-plugin#lazy-install-optional-python-dependencies)ã€‚

## å‚è€ƒå®žçŽ°

- **`plugins/web/brave_free/`** â€” å°åž‹ã€éœ€è¦ API key çš„çº¯æœç´¢ HTTP æä¾›å•†ã€‚é€‚åˆä½œä¸ºèµ·å§‹æ¨¡æ¿ã€‚
- **`plugins/web/ddgs/`** â€” æ— éœ€ keyã€æ‡’åŠ è½½ SDK çš„æä¾›å•†ã€‚é€‚ç”¨äºŽå°è£… Python åŒ…çš„åŽç«¯ã€‚
- **`plugins/web/firecrawl/`** â€” å®Œæ•´çš„å¤šèƒ½åŠ›æä¾›å•†ï¼ˆæœç´¢ + æå– + çˆ¬å–ï¼‰ï¼Œæ”¯æŒå¤šç§æ ¼å¼æ¨¡å¼ã€‚
- **`plugins/web/searxng/`** â€” è‡ªæ‰˜ç®¡ã€é€šè¿‡ URL é…ç½®ã€æ— éœ€è®¤è¯çš„åŽç«¯ã€‚
- **`plugins/web/xai/`** â€” é€šè¿‡ Grok æœåŠ¡ç«¯ `web_search` å·¥å…·å®žçŽ°çš„ LLM é©±åŠ¨æœç´¢ã€‚å±•ç¤ºäº†å¦‚ä½•å¤ç”¨çŽ°æœ‰çš„ OAuth/çŽ¯å¢ƒå˜é‡å‡­æ®ï¼ˆ`tools/xai_http.py`ï¼‰è€Œæ— éœ€æ–°å¢žçŽ¯å¢ƒå˜é‡ï¼Œä»¥åŠå¦‚ä½•ç¼–å†™éµå®ˆæ— ç½‘ç»œè°ƒç”¨çº¦å®šçš„è½»é‡ `is_available()`ã€‚

## é€šè¿‡ pip åˆ†å‘

```toml
# pyproject.toml
[project.entry-points."zed_agent.plugins"]
my-backend-web = "my_backend_web_package"
```

`my_backend_web_package` å¿…é¡»æš´éœ²é¡¶å±‚ `register` å‡½æ•°ã€‚å®Œæ•´é…ç½®è¯´æ˜Žå‚è§é€šç”¨æ’ä»¶æŒ‡å—ä¸­çš„[é€šè¿‡ pip åˆ†å‘](/guides/build-a-zed-plugin#distribute-via-pip)ã€‚

## ç›¸å…³é¡µé¢

- [ç½‘é¡µæœç´¢](/user-guide/features/web-search) â€” é¢å‘ç”¨æˆ·çš„åŠŸèƒ½æ–‡æ¡£åŠå„åŽç«¯é…ç½®è¯´æ˜Ž
- [æ’ä»¶æ¦‚è§ˆ](/user-guide/features/plugins) â€” æ‰€æœ‰æ’ä»¶ç±»åž‹ä¸€è§ˆ
- [æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin) â€” é€šç”¨å·¥å…·/hook/æ–œæ å‘½ä»¤æŒ‡å—