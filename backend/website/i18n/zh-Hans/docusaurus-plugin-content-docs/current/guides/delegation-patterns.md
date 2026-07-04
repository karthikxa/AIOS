---
sidebar_position: 13
title: "å§”æ‰˜ä¸Žå¹¶è¡Œå·¥ä½œ"
description: "ä½•æ—¶ä»¥åŠå¦‚ä½•ä½¿ç”¨å­ä»£ç†å§”æ‰˜â€”â€”å¹¶è¡Œç ”ç©¶ã€ä»£ç å®¡æŸ¥å’Œå¤šæ–‡ä»¶å·¥ä½œçš„æ¨¡å¼"
---

# å§”æ‰˜ä¸Žå¹¶è¡Œå·¥ä½œ

Zed å¯ä»¥ç”Ÿæˆéš”ç¦»çš„å­ä»£ç†æ¥å¹¶è¡Œå¤„ç†ä»»åŠ¡ã€‚æ¯ä¸ªå­ä»£ç†æ‹¥æœ‰ç‹¬ç«‹çš„å¯¹è¯ã€ç»ˆç«¯ä¼šè¯å’Œå·¥å…·é›†ã€‚åªæœ‰æœ€ç»ˆæ‘˜è¦ä¼šè¿”å›žâ€”â€”ä¸­é—´å·¥å…·è°ƒç”¨ä¸ä¼šè¿›å…¥ä½ çš„ä¸Šä¸‹æ–‡çª—å£ã€‚

å®Œæ•´åŠŸèƒ½å‚è€ƒï¼Œè¯·å‚é˜…[å­ä»£ç†å§”æ‰˜](/user-guide/features/delegation)ã€‚

---

## ä½•æ—¶å§”æ‰˜

**é€‚åˆå§”æ‰˜çš„åœºæ™¯ï¼š**
- æŽ¨ç†å¯†é›†åž‹å­ä»»åŠ¡ï¼ˆè°ƒè¯•ã€ä»£ç å®¡æŸ¥ã€ç ”ç©¶ç»¼åˆï¼‰
- ä¼šç”¨ä¸­é—´æ•°æ®æ·¹æ²¡ä¸Šä¸‹æ–‡çš„ä»»åŠ¡
- å¹¶è¡Œç‹¬ç«‹å·¥ä½œæµï¼ˆåŒæ—¶è¿›è¡Œç ”ç©¶ A å’Œç ”ç©¶ Bï¼‰
- éœ€è¦ä»£ç†ä»¥æ— åè§æ–¹å¼å¤„ç†çš„å…¨æ–°ä¸Šä¸‹æ–‡ä»»åŠ¡

**ä½¿ç”¨å…¶ä»–æ–¹å¼çš„åœºæ™¯ï¼š**
- å•æ¬¡å·¥å…·è°ƒç”¨ â†’ ç›´æŽ¥ä½¿ç”¨å·¥å…·
- æ­¥éª¤é—´æœ‰é€»è¾‘çš„æœºæ¢°æ€§å¤šæ­¥éª¤å·¥ä½œ â†’ `execute_code`
- éœ€è¦ç”¨æˆ·äº¤äº’çš„ä»»åŠ¡ â†’ å­ä»£ç†æ— æ³•ä½¿ç”¨ `clarify`
- å¿«é€Ÿæ–‡ä»¶ç¼–è¾‘ â†’ ç›´æŽ¥æ“ä½œ
- å¿…é¡»åœ¨å½“å‰è½®æ¬¡ç»“æŸåŽç»§ç»­è¿è¡Œçš„æŒä¹…æ€§é•¿ä»»åŠ¡ â†’ `cronjob` æˆ– `terminal(background=True, notify_on_complete=True)`ã€‚`delegate_task` æ˜¯**åŒæ­¥**çš„ï¼šè‹¥çˆ¶è½®æ¬¡è¢«ä¸­æ–­ï¼Œæ´»è·ƒçš„å­ä»£ç†å°†è¢«å–æ¶ˆï¼Œå…¶å·¥ä½œå°†è¢«ä¸¢å¼ƒã€‚

---

## æ¨¡å¼ï¼šå¹¶è¡Œç ”ç©¶

åŒæ—¶ç ”ç©¶ä¸‰ä¸ªä¸»é¢˜å¹¶èŽ·å–ç»“æž„åŒ–æ‘˜è¦ï¼š

```
å¹¶è¡Œç ”ç©¶ä»¥ä¸‹ä¸‰ä¸ªä¸»é¢˜ï¼š
1. WebAssembly åœ¨æµè§ˆå™¨ä¹‹å¤–çš„çŽ°çŠ¶
2. 2025 å¹´ RISC-V æœåŠ¡å™¨èŠ¯ç‰‡çš„é‡‡ç”¨æƒ…å†µ
3. é‡å­è®¡ç®—çš„å®žé™…åº”ç”¨

é‡ç‚¹å…³æ³¨è¿‘æœŸè¿›å±•å’Œå…³é”®å‚ä¸Žè€…ã€‚
```

åœ¨åŽå°ï¼ŒZed ä½¿ç”¨ï¼š

```python
delegate_task(tasks=[
    {
        "goal": "Research WebAssembly outside the browser in 2025",
        "context": "Focus on: runtimes (Wasmtime, Wasmer), cloud/edge use cases, WASI progress",
        "toolsets": ["web"]
    },
    {
        "goal": "Research RISC-V server chip adoption",
        "context": "Focus on: server chips shipping, cloud providers adopting, software ecosystem",
        "toolsets": ["web"]
    },
    {
        "goal": "Research practical quantum computing applications",
        "context": "Focus on: error correction breakthroughs, real-world use cases, key companies",
        "toolsets": ["web"]
    }
])
```

ä¸‰ä¸ªä»»åŠ¡å¹¶å‘è¿è¡Œã€‚æ¯ä¸ªå­ä»£ç†ç‹¬ç«‹æœç´¢ç½‘ç»œå¹¶è¿”å›žæ‘˜è¦ã€‚çˆ¶ä»£ç†éšåŽå°†å®ƒä»¬ç»¼åˆæˆä¸€ä»½è¿žè´¯çš„ç®€æŠ¥ã€‚

---

## æ¨¡å¼ï¼šä»£ç å®¡æŸ¥

å°†å®‰å…¨å®¡æŸ¥å§”æ‰˜ç»™ä¸€ä¸ªå…¨æ–°ä¸Šä¸‹æ–‡çš„å­ä»£ç†ï¼Œè®©å®ƒä»¥æ— å…ˆå…¥ä¹‹è§çš„æ–¹å¼å®¡æŸ¥ä»£ç ï¼š

```
å®¡æŸ¥ src/auth/ ä¸­çš„è®¤è¯æ¨¡å—ï¼Œæ£€æŸ¥å®‰å…¨é—®é¢˜ã€‚
æ£€æŸ¥ SQL æ³¨å…¥ã€JWT éªŒè¯é—®é¢˜ã€å¯†ç å¤„ç†
å’Œä¼šè¯ç®¡ç†ã€‚ä¿®å¤å‘çŽ°çš„é—®é¢˜å¹¶è¿è¡Œæµ‹è¯•ã€‚
```

å…³é”®åœ¨äºŽ `context` å­—æ®µâ€”â€”å®ƒå¿…é¡»åŒ…å«å­ä»£ç†æ‰€éœ€çš„ä¸€åˆ‡ä¿¡æ¯ï¼š

```python
delegate_task(
    goal="Review src/auth/ for security issues and fix any found",
    context="""Project at /home/user/webapp. Python 3.11, Flask, PyJWT, bcrypt.
    Auth files: src/auth/login.py, src/auth/jwt.py, src/auth/middleware.py
    Test command: pytest tests/auth/ -v
    Focus on: SQL injection, JWT validation, password hashing, session management.
    Fix issues found and verify tests pass.""",
    toolsets=["terminal", "file"]
)
```

:::warning ä¸Šä¸‹æ–‡é—®é¢˜
å­ä»£ç†å¯¹ä½ çš„å¯¹è¯**ä¸€æ— æ‰€çŸ¥**ã€‚å®ƒä»¬ä»Žå®Œå…¨ç©ºç™½çš„çŠ¶æ€å¼€å§‹ã€‚å¦‚æžœä½ å§”æ‰˜"ä¿®å¤æˆ‘ä»¬è®¨è®ºçš„é‚£ä¸ª bug"ï¼Œå­ä»£ç†æ ¹æœ¬ä¸çŸ¥é“ä½ æŒ‡çš„æ˜¯å“ªä¸ª bugã€‚åŠ¡å¿…æ˜Žç¡®ä¼ é€’æ–‡ä»¶è·¯å¾„ã€é”™è¯¯ä¿¡æ¯ã€é¡¹ç›®ç»“æž„å’Œçº¦æŸæ¡ä»¶ã€‚
:::

---

## æ¨¡å¼ï¼šæ¯”è¾ƒå¤‡é€‰æ–¹æ¡ˆ

å¹¶è¡Œè¯„ä¼°åŒä¸€é—®é¢˜çš„å¤šç§è§£å†³æ–¹æ¡ˆï¼Œç„¶åŽé€‰å‡ºæœ€ä½³æ–¹æ¡ˆï¼š

```
æˆ‘éœ€è¦ä¸º Django åº”ç”¨æ·»åŠ å…¨æ–‡æœç´¢ã€‚å¹¶è¡Œè¯„ä¼°ä¸‰ç§æ–¹æ¡ˆï¼š
1. PostgreSQL tsvectorï¼ˆå†…ç½®ï¼‰
2. é€šè¿‡ django-elasticsearch-dsl ä½¿ç”¨ Elasticsearch
3. é€šè¿‡ meilisearch-python ä½¿ç”¨ Meilisearch

å¯¹æ¯ç§æ–¹æ¡ˆè¯„ä¼°ï¼šé…ç½®å¤æ‚åº¦ã€æŸ¥è¯¢èƒ½åŠ›ã€èµ„æºéœ€æ±‚
å’Œç»´æŠ¤å¼€é”€ã€‚æ¯”è¾ƒåŽæŽ¨èä¸€ç§ã€‚
```

æ¯ä¸ªå­ä»£ç†ç‹¬ç«‹ç ”ç©¶ä¸€ä¸ªé€‰é¡¹ã€‚ç”±äºŽå®ƒä»¬ç›¸äº’éš”ç¦»ï¼Œä¸å­˜åœ¨äº¤å‰å¹²æ‰°â€”â€”æ¯é¡¹è¯„ä¼°éƒ½åŸºäºŽè‡ªèº«çš„ä¼˜ç¼ºç‚¹ã€‚çˆ¶ä»£ç†èŽ·å–å…¨éƒ¨ä¸‰ä»½æ‘˜è¦åŽè¿›è¡Œæ¯”è¾ƒã€‚

---

## æ¨¡å¼ï¼šå¤šæ–‡ä»¶é‡æž„

å°†å¤§åž‹é‡æž„ä»»åŠ¡æ‹†åˆ†ç»™å¹¶è¡Œå­ä»£ç†ï¼Œæ¯ä¸ªå­ä»£ç†è´Ÿè´£ä»£ç åº“çš„ä¸åŒéƒ¨åˆ†ï¼š

```python
delegate_task(tasks=[
    {
        "goal": "Refactor all API endpoint handlers to use the new response format",
        "context": """Project at /home/user/api-server.
        Files: src/handlers/users.py, src/handlers/auth.py, src/handlers/billing.py
        Old format: return {"data": result, "status": "ok"}
        New format: return APIResponse(data=result, status=200).to_dict()
        Import: from src.responses import APIResponse
        Run tests after: pytest tests/handlers/ -v""",
        "toolsets": ["terminal", "file"]
    },
    {
        "goal": "Update all client SDK methods to handle the new response format",
        "context": """Project at /home/user/api-server.
        Files: sdk/python/client.py, sdk/python/models.py
        Old parsing: result = response.json()["data"]
        New parsing: result = response.json()["data"] (same key, but add status code checking)
        Also update sdk/python/tests/test_client.py""",
        "toolsets": ["terminal", "file"]
    },
    {
        "goal": "Update API documentation to reflect the new response format",
        "context": """Project at /home/user/api-server.
        Docs at: docs/api/. Format: Markdown with code examples.
        Update all response examples from old format to new format.
        Add a 'Response Format' section to docs/api/overview.md explaining the schema.""",
        "toolsets": ["terminal", "file"]
    }
])
```

:::tip
æ¯ä¸ªå­ä»£ç†æ‹¥æœ‰ç‹¬ç«‹çš„ç»ˆç«¯ä¼šè¯ã€‚åªè¦å®ƒä»¬ç¼–è¾‘ä¸åŒçš„æ–‡ä»¶ï¼Œå°±å¯ä»¥åœ¨åŒä¸€é¡¹ç›®ç›®å½•ä¸­å·¥ä½œè€Œäº’ä¸å¹²æ‰°ã€‚å¦‚æžœä¸¤ä¸ªå­ä»£ç†å¯èƒ½ä¿®æ”¹åŒä¸€æ–‡ä»¶ï¼Œè¯·åœ¨å¹¶è¡Œå·¥ä½œå®ŒæˆåŽè‡ªè¡Œå¤„ç†è¯¥æ–‡ä»¶ã€‚
:::

---

## æ¨¡å¼ï¼šå…ˆæ”¶é›†åŽåˆ†æž

ä½¿ç”¨ `execute_code` è¿›è¡Œæœºæ¢°æ€§æ•°æ®æ”¶é›†ï¼Œç„¶åŽå§”æ‰˜æŽ¨ç†å¯†é›†åž‹åˆ†æžï¼š

```python
# ç¬¬ä¸€æ­¥ï¼šæœºæ¢°æ€§æ”¶é›†ï¼ˆæ­¤å¤„ execute_code æ›´åˆé€‚â€”â€”æ— éœ€æŽ¨ç†ï¼‰
execute_code("""
from zed_tools import web_search, web_extract

results = []
for query in ["AI funding Q1 2026", "AI startup acquisitions 2026", "AI IPOs 2026"]:
    r = web_search(query, limit=5)
    for item in r["data"]["web"]:
        results.append({"title": item["title"], "url": item["url"], "desc": item["description"]})

# Extract full content from top 5 most relevant
urls = [r["url"] for r in results[:5]]
content = web_extract(urls)

# Save for the analysis step
import json
with open("/tmp/ai-funding-data.json", "w") as f:
    json.dump({"search_results": results, "extracted": content["results"]}, f)
print(f"Collected {len(results)} results, extracted {len(content['results'])} pages")
""")

# ç¬¬äºŒæ­¥ï¼šæŽ¨ç†å¯†é›†åž‹åˆ†æžï¼ˆæ­¤å¤„å§”æ‰˜æ›´åˆé€‚ï¼‰
delegate_task(
    goal="Analyze AI funding data and write a market report",
    context="""Raw data at /tmp/ai-funding-data.json contains search results and
    extracted web pages about AI funding, acquisitions, and IPOs in Q1 2026.
    Write a structured market report: key deals, trends, notable players,
    and outlook. Focus on deals over $100M.""",
    toolsets=["terminal", "file"]
)
```

è¿™é€šå¸¸æ˜¯æœ€é«˜æ•ˆçš„æ¨¡å¼ï¼š`execute_code` ä»¥ä½Žæˆæœ¬å¤„ç† 10 ä½™æ¬¡é¡ºåºå·¥å…·è°ƒç”¨ï¼Œç„¶åŽå­ä»£ç†åœ¨å¹²å‡€çš„ä¸Šä¸‹æ–‡ä¸­å®Œæˆå•æ¬¡é«˜æˆæœ¬æŽ¨ç†ä»»åŠ¡ã€‚

---

## å·¥å…·é›†é€‰æ‹©

æ ¹æ®å­ä»£ç†çš„éœ€æ±‚é€‰æ‹©å·¥å…·é›†ï¼š

| ä»»åŠ¡ç±»åž‹ | å·¥å…·é›† | åŽŸå›  |
|-----------|----------|-----|
| ç½‘ç»œç ”ç©¶ | `["web"]` | ä»… web_search + web_extract |
| ä»£ç å·¥ä½œ | `["terminal", "file"]` | Shell è®¿é—® + æ–‡ä»¶æ“ä½œ |
| å…¨æ ˆ | `["terminal", "file", "web"]` | é™¤æ¶ˆæ¯åŠŸèƒ½å¤–çš„å…¨éƒ¨å·¥å…· |
| åªè¯»åˆ†æž | `["file"]` | åªèƒ½è¯»å–æ–‡ä»¶ï¼Œæ—  Shell |

é™åˆ¶å·¥å…·é›†å¯ä½¿å­ä»£ç†ä¿æŒä¸“æ³¨ï¼Œå¹¶é˜²æ­¢æ„å¤–å‰¯ä½œç”¨ï¼ˆä¾‹å¦‚ç ”ç©¶å­ä»£ç†æ‰§è¡Œ Shell å‘½ä»¤ï¼‰ã€‚

---

## çº¦æŸæ¡ä»¶

- **é»˜è®¤ 3 ä¸ªå¹¶è¡Œä»»åŠ¡**ï¼šæ‰¹æ¬¡é»˜è®¤å¹¶å‘ 3 ä¸ªå­ä»£ç†ï¼ˆå¯é€šè¿‡ config.yaml ä¸­çš„ `delegation.max_concurrent_children` é…ç½®ï¼Œæ— ç¡¬æ€§ä¸Šé™ï¼Œæœ€ä½Žä¸º 1ï¼‰
- **åµŒå¥—å§”æ‰˜éœ€æ˜¾å¼å¯ç”¨**ï¼šå¶å­å­ä»£ç†ï¼ˆé»˜è®¤ï¼‰æ— æ³•è°ƒç”¨ `delegate_task`ã€`clarify`ã€`memory`ã€`send_message` æˆ– `execute_code`ã€‚ç¼–æŽ’å™¨å­ä»£ç†ï¼ˆ`role="orchestrator"`ï¼‰ä¿ç•™ `delegate_task` ä»¥æ”¯æŒè¿›ä¸€æ­¥å§”æ‰˜ï¼Œä½†ä»…åœ¨ `delegation.max_spawn_depth` é«˜äºŽé»˜è®¤å€¼ 1 æ—¶ç”Ÿæ•ˆï¼ˆæ”¯æŒ 1-3ï¼‰ï¼›å…¶ä½™å››é¡¹ä»è¢«ç¦ç”¨ã€‚å¯é€šè¿‡ `delegation.orchestrator_enabled: false` å…¨å±€ç¦ç”¨ã€‚

### è°ƒæ•´å¹¶å‘æ•°ä¸Žæ·±åº¦

| é…ç½®é¡¹ | é»˜è®¤å€¼ | èŒƒå›´ | æ•ˆæžœ |
|--------|---------|-------|--------|
| `max_concurrent_children` | 3 | >=1 | æ¯æ¬¡ `delegate_task` è°ƒç”¨çš„å¹¶è¡Œæ‰¹æ¬¡å¤§å° |
| `max_spawn_depth` | 1 | 1-3 | å¯è¿›ä¸€æ­¥ç”Ÿæˆå­ä»£ç†çš„å§”æ‰˜å±‚çº§æ•° |

ç¤ºä¾‹ï¼šè¿è¡Œ 30 ä¸ªå¹¶è¡Œ worker å¹¶å¯ç”¨åµŒå¥—å­ä»£ç†ï¼š

```yaml
delegation:
  max_concurrent_children: 30
  max_spawn_depth: 2
```

- **ç‹¬ç«‹ç»ˆç«¯** â€” æ¯ä¸ªå­ä»£ç†æ‹¥æœ‰ç‹¬ç«‹çš„ç»ˆç«¯ä¼šè¯ï¼Œå…·æœ‰ç‹¬ç«‹çš„å·¥ä½œç›®å½•å’ŒçŠ¶æ€
- **æ— å¯¹è¯åŽ†å²** â€” å­ä»£ç†åªèƒ½çœ‹åˆ°çˆ¶ä»£ç†è°ƒç”¨ `delegate_task` æ—¶ä¼ å…¥çš„ `goal` å’Œ `context`
- **é»˜è®¤ 50 æ¬¡è¿­ä»£** â€” å¯¹ç®€å•ä»»åŠ¡è®¾ç½®è¾ƒä½Žçš„ `max_iterations` ä»¥èŠ‚çœæˆæœ¬
- **éžæŒä¹…æ€§** â€” `delegate_task` æ˜¯åŒæ­¥çš„ï¼Œåœ¨çˆ¶è½®æ¬¡å†…è¿è¡Œã€‚è‹¥çˆ¶è½®æ¬¡è¢«ä¸­æ–­ï¼ˆæ–°ç”¨æˆ·æ¶ˆæ¯ã€`/stop`ã€`/new`ï¼‰ï¼Œæ‰€æœ‰æ´»è·ƒå­ä»£ç†å°†è¢«å–æ¶ˆï¼ˆ`status="interrupted"`ï¼‰ï¼Œå…¶å·¥ä½œå°†è¢«ä¸¢å¼ƒã€‚å¯¹äºŽå¿…é¡»åœ¨å½“å‰è½®æ¬¡ç»“æŸåŽç»§ç»­è¿è¡Œçš„å·¥ä½œï¼Œè¯·ä½¿ç”¨ `cronjob` æˆ– `terminal(background=True, notify_on_complete=True)`ã€‚

---

## æŠ€å·§

**ç›®æ ‡è¦å…·ä½“ã€‚** "ä¿®å¤ bug"è¿‡äºŽæ¨¡ç³Šã€‚"ä¿®å¤ api/handlers.py ç¬¬ 47 è¡Œçš„ TypeErrorï¼Œè¯¥é”™è¯¯ç”± parse_body() å‘ process_request() è¿”å›ž None å¼•èµ·"æ‰èƒ½ç»™å­ä»£ç†è¶³å¤Ÿçš„ä¿¡æ¯ã€‚

**åŒ…å«æ–‡ä»¶è·¯å¾„ã€‚** å­ä»£ç†ä¸äº†è§£ä½ çš„é¡¹ç›®ç»“æž„ã€‚åŠ¡å¿…æä¾›ç›¸å…³æ–‡ä»¶çš„ç»å¯¹è·¯å¾„ã€é¡¹ç›®æ ¹ç›®å½•å’Œæµ‹è¯•å‘½ä»¤ã€‚

**åˆ©ç”¨å§”æ‰˜å®žçŽ°ä¸Šä¸‹æ–‡éš”ç¦»ã€‚** æœ‰æ—¶ä½ éœ€è¦å…¨æ–°çš„è§†è§’ã€‚å§”æ‰˜è¿«ä½¿ä½ æ¸…æ™°åœ°é˜è¿°é—®é¢˜ï¼Œè€Œå­ä»£ç†ä¼šåœ¨æ²¡æœ‰å¯¹è¯ä¸­ç§¯ç´¯çš„å‡è®¾å‰æä¸‹å¤„ç†å®ƒã€‚

**æ ¸éªŒç»“æžœã€‚** å­ä»£ç†çš„æ‘˜è¦åªæ˜¯æ‘˜è¦ã€‚å¦‚æžœå­ä»£ç†è¯´"ä¿®å¤äº† bug ä¸”æµ‹è¯•é€šè¿‡"ï¼Œè¯·è‡ªè¡Œè¿è¡Œæµ‹è¯•æˆ–æŸ¥çœ‹ diff æ¥éªŒè¯ã€‚

---

*å®Œæ•´çš„å§”æ‰˜å‚è€ƒâ€”â€”æ‰€æœ‰å‚æ•°ã€ACP é›†æˆå’Œé«˜çº§é…ç½®â€”â€”è¯·å‚é˜…[å­ä»£ç†å§”æ‰˜](/user-guide/features/delegation)ã€‚*