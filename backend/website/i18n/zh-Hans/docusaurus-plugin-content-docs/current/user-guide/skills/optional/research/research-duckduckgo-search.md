---
title: "Duckduckgo Search â€” é€šè¿‡ DuckDuckGo å…è´¹æœç´¢ç½‘ç»œ â€” æ–‡æœ¬ã€æ–°é—»ã€å›¾ç‰‡ã€è§†é¢‘"
sidebar_label: "Duckduckgo Search"
description: "é€šè¿‡ DuckDuckGo å…è´¹æœç´¢ç½‘ç»œ â€” æ–‡æœ¬ã€æ–°é—»ã€å›¾ç‰‡ã€è§†é¢‘"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Duckduckgo Search

é€šè¿‡ DuckDuckGo å…è´¹æœç´¢ç½‘ç»œ â€” æ–‡æœ¬ã€æ–°é—»ã€å›¾ç‰‡ã€è§†é¢‘ã€‚æ— éœ€ API å¯†é’¥ã€‚å·²å®‰è£…æ—¶ä¼˜å…ˆä½¿ç”¨ `ddgs` CLIï¼›ä»…åœ¨ç¡®è®¤å½“å‰è¿è¡Œæ—¶ä¸­ `ddgs` å¯ç”¨åŽï¼Œæ‰ä½¿ç”¨ Python DDGS åº“ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/research/duckduckgo-search` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/duckduckgo-search` |
| ç‰ˆæœ¬ | `1.3.0` |
| ä½œè€… | gamedevCloudy |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `search`, `duckduckgo`, `web-search`, `free`, `fallback` |
| ç›¸å…³ skill | [`arxiv`](/user-guide/skills/bundled/research/research-arxiv) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# DuckDuckGo Search

ä½¿ç”¨ DuckDuckGo è¿›è¡Œå…è´¹ç½‘ç»œæœç´¢ã€‚**æ— éœ€ API å¯†é’¥ã€‚**

å½“ `web_search` ä¸å¯ç”¨æˆ–ä¸é€‚ç”¨æ—¶ï¼ˆä¾‹å¦‚æœªè®¾ç½® `FIRECRAWL_API_KEY`ï¼‰ï¼Œä¼˜å…ˆä½¿ç”¨æ­¤ skillã€‚ä¹Ÿå¯åœ¨æ˜Žç¡®éœ€è¦ DuckDuckGo ç»“æžœæ—¶ä½œä¸ºç‹¬ç«‹æœç´¢è·¯å¾„ä½¿ç”¨ã€‚

## æ£€æµ‹æµç¨‹

åœ¨é€‰æ‹©æ–¹æ¡ˆå‰ï¼Œå…ˆæ£€æŸ¥å®žé™…å¯ç”¨çš„å·¥å…·ï¼š

```bash
# Check CLI availability
command -v ddgs >/dev/null && echo "DDGS_CLI=installed" || echo "DDGS_CLI=missing"
```

å†³ç­–æ ‘ï¼š
1. è‹¥ `ddgs` CLI å·²å®‰è£…ï¼Œä¼˜å…ˆä½¿ç”¨ `terminal` + `ddgs`
2. è‹¥ `ddgs` CLI æœªå®‰è£…ï¼Œä¸è¦å‡è®¾ `execute_code` èƒ½å¯¼å…¥ `ddgs`
3. è‹¥ç”¨æˆ·æ˜Žç¡®éœ€è¦ DuckDuckGoï¼Œå…ˆåœ¨ç›¸å…³çŽ¯å¢ƒä¸­å®‰è£… `ddgs`
4. å¦åˆ™å›žé€€åˆ°å†…ç½®çš„ web/browser å·¥å…·

é‡è¦è¿è¡Œæ—¶è¯´æ˜Žï¼š
- Terminal ä¸Ž `execute_code` æ˜¯ç‹¬ç«‹çš„è¿è¡Œæ—¶
- shell ä¸­å®‰è£…æˆåŠŸä¸ä»£è¡¨ `execute_code` èƒ½å¯¼å…¥ `ddgs`
- æ°¸è¿œä¸è¦å‡è®¾ `execute_code` å†…å·²é¢„è£…ç¬¬ä¸‰æ–¹ Python åŒ…

## å®‰è£…

ä»…åœ¨æ˜Žç¡®éœ€è¦ DuckDuckGo æœç´¢ä¸”è¿è¡Œæ—¶å°šæœªæä¾›æ—¶ï¼Œæ‰å®‰è£… `ddgs`ã€‚

```bash
# Python package + CLI entrypoint
pip install ddgs

# Verify CLI
ddgs --help
```

è‹¥å·¥ä½œæµä¾èµ– Python å¯¼å…¥ï¼Œè¯·åœ¨ä½¿ç”¨ `from ddgs import DDGS` å‰ï¼Œå…ˆéªŒè¯è¯¥è¿è¡Œæ—¶èƒ½å¦å¯¼å…¥ `ddgs`ã€‚

## æ–¹æ³•ä¸€ï¼šCLI æœç´¢ï¼ˆæŽ¨èï¼‰

å½“ `ddgs` å‘½ä»¤å­˜åœ¨æ—¶ï¼Œé€šè¿‡ `terminal` ä½¿ç”¨å®ƒã€‚è¿™æ˜¯æŽ¨èè·¯å¾„ï¼Œå› ä¸ºå®ƒé¿å…äº†å‡è®¾ `execute_code` æ²™ç®±ä¸­å·²å®‰è£… `ddgs` Python åŒ…ã€‚

```bash
# Text search
ddgs text -q "python async programming" -m 5

# News search
ddgs news -q "artificial intelligence" -m 5

# Image search
ddgs images -q "landscape photography" -m 10

# Video search
ddgs videos -q "python tutorial" -m 5

# With region filter
ddgs text -q "best restaurants" -m 5 -r us-en

# Recent results only (d=day, w=week, m=month, y=year)
ddgs text -q "latest AI news" -m 5 -t w

# JSON output for parsing
ddgs text -q "fastapi tutorial" -m 5 -o json
```

### CLI å‚æ•°

| å‚æ•° | è¯´æ˜Ž | ç¤ºä¾‹ |
|------|-------------|---------|
| `-q` | æŸ¥è¯¢è¯ â€” **å¿…å¡«** | `-q "search terms"` |
| `-m` | æœ€å¤§ç»“æžœæ•° | `-m 5` |
| `-r` | åœ°åŒº | `-r us-en` |
| `-t` | æ—¶é—´èŒƒå›´ | `-t w`ï¼ˆä¸€å‘¨ï¼‰ |
| `-s` | å®‰å…¨æœç´¢ | `-s off` |
| `-o` | è¾“å‡ºæ ¼å¼ | `-o json` |

## æ–¹æ³•äºŒï¼šPython APIï¼ˆä»…åœ¨éªŒè¯åŽä½¿ç”¨ï¼‰

ä»…åœ¨ç¡®è®¤ `ddgs` å·²å®‰è£…äºŽè¯¥è¿è¡Œæ—¶åŽï¼Œæ‰åœ¨ `execute_code` æˆ–å…¶ä»– Python è¿è¡Œæ—¶ä¸­ä½¿ç”¨ `DDGS` ç±»ã€‚ä¸è¦é»˜è®¤è®¤ä¸º `execute_code` åŒ…å«ç¬¬ä¸‰æ–¹åŒ…ã€‚

æ­£ç¡®è¡¨è¿°ï¼š
- "åœ¨å®‰è£…æˆ–ç¡®è®¤åŒ…å¯ç”¨åŽï¼Œåœ¨ `execute_code` ä¸­ä½¿ç”¨ `ddgs`"

é¿å…è¡¨è¿°ï¼š
- "`execute_code` åŒ…å« `ddgs`"
- "DuckDuckGo æœç´¢åœ¨ `execute_code` ä¸­é»˜è®¤å¯ç”¨"

**é‡è¦ï¼š** `max_results` å¿…é¡»å§‹ç»ˆä»¥**å…³é”®å­—å‚æ•°**å½¢å¼ä¼ å…¥ â€” æ‰€æœ‰æ–¹æ³•ä¸­ä»¥ä½ç½®å‚æ•°ä¼ å…¥å‡ä¼šæŠ¥é”™ã€‚

### æ–‡æœ¬æœç´¢

é€‚ç”¨åœºæ™¯ï¼šé€šç”¨ç ”ç©¶ã€å…¬å¸ä¿¡æ¯ã€æ–‡æ¡£æŸ¥è¯¢ã€‚

```python
from ddgs import DDGS

with DDGS() as ddgs:
    for r in ddgs.text("python async programming", max_results=5):
        print(r["title"])
        print(r["href"])
        print(r.get("body", "")[:200])
        print()
```

è¿”å›žå­—æ®µï¼š`title`ã€`href`ã€`body`

### æ–°é—»æœç´¢

é€‚ç”¨åœºæ™¯ï¼šæ—¶äº‹åŠ¨æ€ã€çªå‘æ–°é—»ã€æœ€æ–°æ›´æ–°ã€‚

```python
from ddgs import DDGS

with DDGS() as ddgs:
    for r in ddgs.news("AI regulation 2026", max_results=5):
        print(r["date"], "-", r["title"])
        print(r.get("source", ""), "|", r["url"])
        print(r.get("body", "")[:200])
        print()
```

è¿”å›žå­—æ®µï¼š`date`ã€`title`ã€`body`ã€`url`ã€`image`ã€`source`

### å›¾ç‰‡æœç´¢

é€‚ç”¨åœºæ™¯ï¼šè§†è§‰å‚è€ƒã€äº§å“å›¾ç‰‡ã€ç¤ºæ„å›¾ã€‚

```python
from ddgs import DDGS

with DDGS() as ddgs:
    for r in ddgs.images("semiconductor chip", max_results=5):
        print(r["title"])
        print(r["image"])
        print(r.get("thumbnail", ""))
        print(r.get("source", ""))
        print()
```

è¿”å›žå­—æ®µï¼š`title`ã€`image`ã€`thumbnail`ã€`url`ã€`height`ã€`width`ã€`source`

### è§†é¢‘æœç´¢

é€‚ç”¨åœºæ™¯ï¼šæ•™ç¨‹ã€æ¼”ç¤ºã€è®²è§£è§†é¢‘ã€‚

```python
from ddgs import DDGS

with DDGS() as ddgs:
    for r in ddgs.videos("FastAPI tutorial", max_results=5):
        print(r["title"])
        print(r.get("content", ""))
        print(r.get("duration", ""))
        print(r.get("provider", ""))
        print(r.get("published", ""))
        print()
```

è¿”å›žå­—æ®µï¼š`title`ã€`content`ã€`description`ã€`duration`ã€`provider`ã€`published`ã€`statistics`ã€`uploader`

### å¿«é€Ÿå‚è€ƒ

| æ–¹æ³• | é€‚ç”¨åœºæ™¯ | å…³é”®å­—æ®µ |
|--------|----------|------------|
| `text()` | é€šç”¨ç ”ç©¶ã€å…¬å¸ä¿¡æ¯ | title, href, body |
| `news()` | æ—¶äº‹åŠ¨æ€ã€æœ€æ–°æ›´æ–° | date, title, source, body, url |
| `images()` | è§†è§‰å†…å®¹ã€ç¤ºæ„å›¾ | title, image, thumbnail, url |
| `videos()` | æ•™ç¨‹ã€æ¼”ç¤º | title, content, duration, provider |

## å·¥ä½œæµï¼šå…ˆæœç´¢åŽæå–

DuckDuckGo è¿”å›žæ ‡é¢˜ã€URL å’Œæ‘˜è¦ï¼Œè€Œéžå®Œæ•´é¡µé¢å†…å®¹ã€‚å¦‚éœ€èŽ·å–å®Œæ•´é¡µé¢å†…å®¹ï¼Œå…ˆæœç´¢ï¼Œå†ç”¨ `web_extract`ã€browser å·¥å…·æˆ– curl æå–æœ€ç›¸å…³çš„ URLã€‚

CLI ç¤ºä¾‹ï¼š

```bash
ddgs text -q "fastapi deployment guide" -m 3 -o json
```

Python ç¤ºä¾‹ï¼Œä»…åœ¨ç¡®è®¤è¯¥è¿è¡Œæ—¶å·²å®‰è£… `ddgs` åŽä½¿ç”¨ï¼š

```python
from ddgs import DDGS

with DDGS() as ddgs:
    results = list(ddgs.text("fastapi deployment guide", max_results=3))
    for r in results:
        print(r["title"], "->", r["href"])
```

ç„¶åŽä½¿ç”¨ `web_extract` æˆ–å…¶ä»–å†…å®¹èŽ·å–å·¥å…·æå–æœ€ä½³ URL çš„å†…å®¹ã€‚

## é™åˆ¶

- **é¢‘çŽ‡é™åˆ¶**ï¼šå¤§é‡å¿«é€Ÿè¯·æ±‚åŽï¼ŒDuckDuckGo å¯èƒ½è¿›è¡Œé™æµã€‚å¦‚æœ‰éœ€è¦ï¼Œåœ¨å¤šæ¬¡æœç´¢ä¹‹é—´æ·»åŠ çŸ­æš‚å»¶è¿Ÿã€‚
- **æ— å†…å®¹æå–**ï¼š`ddgs` è¿”å›žæ‘˜è¦ï¼Œè€Œéžå®Œæ•´é¡µé¢å†…å®¹ã€‚å¦‚éœ€å®Œæ•´æ–‡ç« /é¡µé¢ï¼Œè¯·ä½¿ç”¨ `web_extract`ã€browser å·¥å…·æˆ– curlã€‚
- **ç»“æžœè´¨é‡**ï¼šæ€»ä½“è‰¯å¥½ï¼Œä½†å¯é…ç½®æ€§ä¸å¦‚ Firecrawl çš„æœç´¢ã€‚
- **å¯ç”¨æ€§**ï¼šDuckDuckGo å¯èƒ½å±è”½æ¥è‡ªéƒ¨åˆ†äº‘ IP çš„è¯·æ±‚ã€‚è‹¥æœç´¢è¿”å›žç©ºç»“æžœï¼Œè¯·å°è¯•ä¸åŒå…³é”®è¯æˆ–ç­‰å¾…å‡ ç§’åŽé‡è¯•ã€‚
- **å­—æ®µå¯å˜æ€§**ï¼šä¸åŒç»“æžœæˆ– `ddgs` ç‰ˆæœ¬é—´è¿”å›žå­—æ®µå¯èƒ½æœ‰æ‰€ä¸åŒã€‚å¯¹å¯é€‰å­—æ®µä½¿ç”¨ `.get()` ä»¥é¿å… `KeyError`ã€‚
- **ç‹¬ç«‹è¿è¡Œæ—¶**ï¼šåœ¨ terminal ä¸­æˆåŠŸå®‰è£… `ddgs` ä¸ä»£è¡¨ `execute_code` èƒ½è‡ªåŠ¨å¯¼å…¥å®ƒã€‚

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | å¯èƒ½åŽŸå›  | å¤„ç†æ–¹å¼ |
|---------|--------------|------------|
| `ddgs: command not found` | CLI æœªå®‰è£…åœ¨ shell çŽ¯å¢ƒä¸­ | å®‰è£… `ddgs`ï¼Œæˆ–æ”¹ç”¨å†…ç½® web/browser å·¥å…· |
| `ModuleNotFoundError: No module named 'ddgs'` | Python è¿è¡Œæ—¶æœªå®‰è£…è¯¥åŒ… | åœ¨å‡†å¤‡å¥½è¯¥è¿è¡Œæ—¶ä¹‹å‰ï¼Œä¸è¦åœ¨å…¶ä¸­ä½¿ç”¨ Python DDGS |
| æœç´¢æ— ç»“æžœ | ä¸´æ—¶é™æµæˆ–æŸ¥è¯¢è¯ä¸ä½³ | ç­‰å¾…å‡ ç§’åŽé‡è¯•ï¼Œæˆ–è°ƒæ•´æŸ¥è¯¢è¯ |
| CLI æ­£å¸¸ä½† `execute_code` å¯¼å…¥å¤±è´¥ | Terminal ä¸Ž `execute_code` æ˜¯ä¸åŒçš„è¿è¡Œæ—¶ | ç»§ç»­ä½¿ç”¨ CLIï¼Œæˆ–å•ç‹¬å‡†å¤‡ Python è¿è¡Œæ—¶ |

## å¸¸è§é™·é˜±

- **`max_results` ä»…æ”¯æŒå…³é”®å­—å‚æ•°**ï¼š`ddgs.text("query", 5)` ä¼šæŠ¥é”™ï¼Œè¯·ä½¿ç”¨ `ddgs.text("query", max_results=5)`ã€‚
- **ä¸è¦å‡è®¾ CLI å·²å­˜åœ¨**ï¼šä½¿ç”¨å‰å…ˆæ£€æŸ¥ `command -v ddgs`ã€‚
- **ä¸è¦å‡è®¾ `execute_code` èƒ½å¯¼å…¥ `ddgs`**ï¼šé™¤éžè¯¥è¿è¡Œæ—¶å·²å•ç‹¬å‡†å¤‡ï¼Œå¦åˆ™ `from ddgs import DDGS` å¯èƒ½æŠ›å‡º `ModuleNotFoundError`ã€‚
- **åŒ…å**ï¼šè¯¥åŒ…åä¸º `ddgs`ï¼ˆåŽŸå `duckduckgo-search`ï¼‰ï¼Œä½¿ç”¨ `pip install ddgs` å®‰è£…ã€‚
- **ä¸è¦æ··æ·† `-q` å’Œ `-m`**ï¼ˆCLIï¼‰ï¼š`-q` ç”¨äºŽæŸ¥è¯¢è¯ï¼Œ`-m` ç”¨äºŽæœ€å¤§ç»“æžœæ•°ã€‚
- **ç©ºç»“æžœ**ï¼šè‹¥ `ddgs` è¿”å›žç©ºç»“æžœï¼Œå¯èƒ½æ˜¯è¢«é™æµã€‚ç­‰å¾…å‡ ç§’åŽé‡è¯•ã€‚

## éªŒè¯ç‰ˆæœ¬

å·²é’ˆå¯¹ `ddgs==9.11.2` è¯­ä¹‰éªŒè¯ç¤ºä¾‹ã€‚Skill æŒ‡å—çŽ°å°† CLI å¯ç”¨æ€§ä¸Ž Python å¯¼å…¥å¯ç”¨æ€§è§†ä¸ºç‹¬ç«‹é—®é¢˜ï¼Œä»¥ç¡®ä¿æ–‡æ¡£åŒ–çš„å·¥ä½œæµä¸Žå®žé™…è¿è¡Œæ—¶è¡Œä¸ºä¸€è‡´ã€‚
