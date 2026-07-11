---
title: "Searxng Search â€” é€šè¿‡ SearXNG å…è´¹å…ƒæœç´¢ â€” èšåˆ 70+ æœç´¢å¼•æ“Žçš„ç»“æžœ"
sidebar_label: "Searxng Search"
description: "é€šè¿‡ SearXNG å…è´¹å…ƒæœç´¢ â€” èšåˆ 70+ æœç´¢å¼•æ“Žçš„ç»“æžœ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Searxng Search

é€šè¿‡ SearXNG å…è´¹å…ƒæœç´¢ï¼ˆmeta-searchï¼‰â€”â€”èšåˆ 70+ æœç´¢å¼•æ“Žçš„ç»“æžœã€‚å¯è‡ªæ‰˜ç®¡æˆ–ä½¿ç”¨å…¬å…±å®žä¾‹ã€‚æ— éœ€ API å¯†é’¥ã€‚å½“ web æœç´¢å·¥å…·é›†ä¸å¯ç”¨æ—¶è‡ªåŠ¨å›žé€€ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/research/searxng-search` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/searxng-search` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | zed-agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `search`, `searxng`, `meta-search`, `self-hosted`, `free`, `fallback` |
| ç›¸å…³ skill | [`duckduckgo-search`](/user-guide/skills/optional/research/research-duckduckgo-search), [`domain-intel`](/user-guide/skills/optional/research/research-domain-intel) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# SearXNG Search

ä½¿ç”¨ [SearXNG](https://searxng.org/) è¿›è¡Œå…è´¹å…ƒæœç´¢â€”â€”è¿™æ˜¯ä¸€ä¸ªæ³¨é‡éšç§çš„è‡ªæ‰˜ç®¡æœç´¢èšåˆå™¨ï¼Œå¯åŒæ—¶æŸ¥è¯¢ 70+ æœç´¢å¼•æ“Žã€‚

ä½¿ç”¨å…¬å…±å®žä¾‹æ—¶**æ— éœ€ API å¯†é’¥**ã€‚ä¹Ÿå¯è‡ªæ‰˜ç®¡ä»¥èŽ·å¾—å®Œå…¨æŽ§åˆ¶æƒã€‚å½“ä¸» web æœç´¢å·¥å…·é›†ï¼ˆ`FIRECRAWL_API_KEY`ï¼‰æœªé…ç½®æ—¶ï¼Œè‡ªåŠ¨ä½œä¸ºå›žé€€æ–¹æ¡ˆå‡ºçŽ°ã€‚

## é…ç½®

SearXNG éœ€è¦ä¸€ä¸ª `SEARXNG_URL` çŽ¯å¢ƒå˜é‡ï¼ŒæŒ‡å‘ä½ çš„ SearXNG å®žä¾‹ï¼š

```bash
# å…¬å…±å®žä¾‹ï¼ˆæ— éœ€ä»»ä½•è®¾ç½®ï¼‰
SEARXNG_URL=https://searxng.example.com

# è‡ªæ‰˜ç®¡ SearXNG
SEARXNG_URL=http://localhost:8888
```

å¦‚æžœæœªé…ç½®å®žä¾‹ï¼Œæ­¤ skill ä¸å¯ç”¨ï¼Œagent å°†å›žé€€åˆ°å…¶ä»–æœç´¢é€‰é¡¹ã€‚

## æ£€æµ‹æµç¨‹

åœ¨é€‰æ‹©æ–¹æ¡ˆä¹‹å‰ï¼Œå…ˆæ£€æŸ¥å®žé™…å¯ç”¨çš„å†…å®¹ï¼š

```bash
# æ£€æŸ¥ SEARXNG_URL æ˜¯å¦å·²è®¾ç½®ä¸”å®žä¾‹å¯è®¿é—®
curl -s --max-time 5 "${SEARXNG_URL}/search?q=test&format=json" | head -c 200
```

å†³ç­–æ ‘ï¼š
1. å¦‚æžœ `SEARXNG_URL` å·²è®¾ç½®ä¸”å®žä¾‹å“åº”ï¼Œåˆ™ä½¿ç”¨ SearXNG
2. å¦‚æžœ `SEARXNG_URL` æœªè®¾ç½®æˆ–ä¸å¯è®¿é—®ï¼Œåˆ™å›žé€€åˆ°å…¶ä»–å¯ç”¨æœç´¢å·¥å…·
3. å¦‚æžœç”¨æˆ·æ˜Žç¡®éœ€è¦ SearXNGï¼Œå¸®åŠ©ä»–ä»¬æ­å»ºå®žä¾‹æˆ–æ‰¾åˆ°å…¬å…±å®žä¾‹

## æ–¹æ³•ä¸€ï¼šé€šè¿‡ curl ä½¿ç”¨ CLIï¼ˆæŽ¨èï¼‰

é€šè¿‡ `terminal` ä½¿ç”¨ `curl` è°ƒç”¨ SearXNG JSON APIã€‚è¿™æ ·å¯ä»¥é¿å…å‡è®¾å®‰è£…äº†ç‰¹å®šçš„ Python åŒ…ã€‚

```bash
# æ–‡æœ¬æœç´¢ï¼ˆJSON è¾“å‡ºï¼‰
curl -s --max-time 10 \
  "${SEARXNG_URL}/search?q=python+async+programming&format=json&engines=google,bing&limit=10"

# å…³é—­å®‰å…¨æœç´¢
curl -s --max-time 10 \
  "${SEARXNG_URL}/search?q=example&format=json&safesearch=0"

# æŒ‡å®šåˆ†ç±»ï¼ˆgeneralã€newsã€science ç­‰ï¼‰
curl -s --max-time 10 \
  "${SEARXNG_URL}/search?q=AI+news&format=json&categories=news"
```

### å¸¸ç”¨ CLI å‚æ•°

| å‚æ•° | è¯´æ˜Ž | ç¤ºä¾‹ |
|------|-------------|---------|
| `q` | æŸ¥è¯¢å­—ç¬¦ä¸²ï¼ˆURL ç¼–ç ï¼‰ | `q=python+async` |
| `format` | è¾“å‡ºæ ¼å¼ï¼š`json`ã€`csv`ã€`rss` | `format=json` |
| `engines` | é€—å·åˆ†éš”çš„å¼•æ“Žåç§° | `engines=google,bing,ddg` |
| `limit` | æ¯ä¸ªå¼•æ“Žçš„æœ€å¤§ç»“æžœæ•°ï¼ˆé»˜è®¤ 10ï¼‰ | `limit=5` |
| `categories` | æŒ‰åˆ†ç±»è¿‡æ»¤ | `categories=news,science` |
| `safesearch` | 0=æ— ï¼Œ1=é€‚ä¸­ï¼Œ2=ä¸¥æ ¼ | `safesearch=0` |
| `time_range` | è¿‡æ»¤ï¼š`day`ã€`week`ã€`month`ã€`year` | `time_range=week` |

### è§£æž JSON ç»“æžœ

```bash
# ä»Ž JSON ä¸­æå–æ ‡é¢˜å’Œ URL
curl -s --max-time 10 "${SEARXNG_URL}/search?q=fastapi&format=json&limit=5" \
  | python3 -c "
import json, sys
data = json.load(sys.stdin)
for r in data.get('results', []):
    print(r.get('title',''))
    print(r.get('url',''))
    print(r.get('content','')[:200])
    print()
"
```

æ¯æ¡ç»“æžœè¿”å›žï¼š`title`ã€`url`ã€`content`ï¼ˆæ‘˜è¦ï¼‰ã€`engine`ã€`parsed_url`ã€`img_src`ã€`thumbnail`ã€`author`ã€`published_date`

## æ–¹æ³•äºŒï¼šé€šè¿‡ `requests` ä½¿ç”¨ Python API

ç›´æŽ¥ä»Ž Python ä½¿ç”¨ `requests` åº“è°ƒç”¨ SearXNG REST APIï¼š

```python
import os, requests, urllib.parse

base_url = os.environ.get("SEARXNG_URL", "")
if not base_url:
    raise RuntimeError("SEARXNG_URL is not set")

query = "fastapi deployment guide"
params = {
    "q": query,
    "format": "json",
    "limit": 5,
    "engines": "google,bing",
}

resp = requests.get(f"{base_url}/search", params=params, timeout=10)
resp.raise_for_status()
data = resp.json()

for r in data.get("results", []):
    print(r["title"])
    print(r["url"])
    print(r.get("content", "")[:200])
    print()
```

## æ–¹æ³•ä¸‰ï¼šsearxng-data Python åŒ…

å¦‚éœ€æ›´ç»“æž„åŒ–çš„è®¿é—®ï¼Œå®‰è£… `searxng-data` åŒ…ï¼š

```bash
pip install searxng-data
```

```python
from searxng_data import engines

# åˆ—å‡ºå¯ç”¨å¼•æ“Ž
print(engines.list_engines())
```

æ³¨æ„ï¼šæ­¤åŒ…ä»…æä¾›å¼•æ“Žå…ƒæ•°æ®ï¼Œä¸æä¾›æœç´¢ API æœ¬èº«ã€‚

## è‡ªæ‰˜ç®¡ SearXNG

è¿è¡Œä½ è‡ªå·±çš„ SearXNG å®žä¾‹ï¼š

```bash
# ä½¿ç”¨ Docker
docker run -d -p 8888:8080 \
  -v $(pwd)/searxng:/etc/searxng \
  searxng/searxng:latest

# ç„¶åŽè®¾ç½®
SEARXNG_URL=http://localhost:8888
```

æˆ–é€šè¿‡ pip å®‰è£…ï¼š
```bash
pip install searxng
# ç¼–è¾‘ /etc/searxng/settings.yml
searxng-run
```

å…¬å…± SearXNG å®žä¾‹å¯åœ¨ä»¥ä¸‹åœ°å€æ‰¾åˆ°ï¼š
- `https://searxng.example.com`ï¼ˆæ›¿æ¢ä¸ºä»»æ„å…¬å…±å®žä¾‹ï¼‰

## å·¥ä½œæµï¼šå…ˆæœç´¢åŽæå–

SearXNG è¿”å›žæ ‡é¢˜ã€URL å’Œæ‘˜è¦â€”â€”è€Œéžå®Œæ•´é¡µé¢å†…å®¹ã€‚è¦èŽ·å–å®Œæ•´é¡µé¢å†…å®¹ï¼Œå…ˆæœç´¢ï¼Œç„¶åŽä½¿ç”¨ `web_extract`ã€æµè§ˆå™¨å·¥å…·æˆ– `curl` æå–æœ€ç›¸å…³çš„ URLã€‚

```bash
# æœç´¢ç›¸å…³é¡µé¢
curl -s "${SEARXNG_URL}/search?q=fastapi+deployment&format=json&limit=3"
# è¾“å‡ºï¼šåŒ…å«æ ‡é¢˜å’Œ URL çš„ç»“æžœåˆ—è¡¨

# ç„¶åŽä½¿ç”¨ web_extract æå–æœ€ä½³ URL
```

## é™åˆ¶

- **å®žä¾‹å¯ç”¨æ€§**ï¼šå¦‚æžœ SearXNG å®žä¾‹å®•æœºæˆ–ä¸å¯è®¿é—®ï¼Œæœç´¢å°†å¤±è´¥ã€‚å§‹ç»ˆæ£€æŸ¥ `SEARXNG_URL` å·²è®¾ç½®ä¸”å®žä¾‹å¯è®¿é—®ã€‚
- **æ— å†…å®¹æå–**ï¼šSearXNG è¿”å›žæ‘˜è¦ï¼Œè€Œéžå®Œæ•´é¡µé¢å†…å®¹ã€‚ä½¿ç”¨ `web_extract`ã€æµè§ˆå™¨å·¥å…·æˆ– `curl` èŽ·å–å®Œæ•´æ–‡ç« ã€‚
- **é€ŸçŽ‡é™åˆ¶**ï¼šéƒ¨åˆ†å…¬å…±å®žä¾‹ä¼šé™åˆ¶è¯·æ±‚ã€‚è‡ªæ‰˜ç®¡å¯é¿å…æ­¤é—®é¢˜ã€‚
- **å¼•æ“Žè¦†ç›–èŒƒå›´**ï¼šå¯ç”¨å¼•æ“Žå–å†³äºŽ SearXNG å®žä¾‹çš„é…ç½®ï¼Œéƒ¨åˆ†å¼•æ“Žå¯èƒ½è¢«ç¦ç”¨ã€‚
- **ç»“æžœæ—¶æ•ˆæ€§**ï¼šå…ƒæœç´¢èšåˆå¤–éƒ¨å¼•æ“Žâ€”â€”ç»“æžœæ—¶æ•ˆæ€§å–å†³äºŽè¿™äº›å¼•æ“Žã€‚

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | å¯èƒ½åŽŸå›  | å¤„ç†æ–¹å¼ |
|---------|--------------|------------|
| `SEARXNG_URL` æœªè®¾ç½® | æœªé…ç½®å®žä¾‹ | ä½¿ç”¨å…¬å…± SearXNG å®žä¾‹æˆ–è‡ªè¡Œæ­å»º |
| è¿žæŽ¥è¢«æ‹’ç» | å®žä¾‹æœªè¿è¡Œæˆ– URL é”™è¯¯ | æ£€æŸ¥ URL æ˜¯å¦æ­£ç¡®ä¸”å®žä¾‹æ­£åœ¨è¿è¡Œ |
| ç»“æžœä¸ºç©º | å®žä¾‹å±è”½äº†è¯¥æŸ¥è¯¢ | å°è¯•å…¶ä»–å®žä¾‹æˆ–è‡ªæ‰˜ç®¡ |
| å“åº”ç¼“æ…¢ | å…¬å…±å®žä¾‹è´Ÿè½½è¿‡é«˜ | è‡ªæ‰˜ç®¡æˆ–ä½¿ç”¨è´Ÿè½½è¾ƒä½Žçš„å…¬å…±å®žä¾‹ |
| ä¸æ”¯æŒ `json` æ ¼å¼ | SearXNG ç‰ˆæœ¬è¿‡æ—§ | å°è¯• `format=rss` æˆ–å‡çº§ SearXNG |

## æ³¨æ„äº‹é¡¹

- **åŠ¡å¿…è®¾ç½® `SEARXNG_URL`**ï¼šæ²¡æœ‰å®ƒï¼Œæ­¤ skill æ— æ³•è¿è¡Œã€‚
- **å¯¹æŸ¥è¯¢è¿›è¡Œ URL ç¼–ç **ï¼šcurl ä¸­çš„ç©ºæ ¼å’Œç‰¹æ®Šå­—ç¬¦å¿…é¡»è¿›è¡Œ URL ç¼–ç ï¼Œæˆ–åœ¨ Python ä¸­ä½¿ç”¨ `urllib.parse.quote()`ã€‚
- **ä½¿ç”¨ `format=json`**ï¼šé»˜è®¤æ ¼å¼å¯èƒ½ä¸æ˜¯æœºå™¨å¯è¯»çš„ã€‚å§‹ç»ˆæ˜Žç¡®è¯·æ±‚ JSONã€‚
- **è®¾ç½®è¶…æ—¶**ï¼šå§‹ç»ˆä½¿ç”¨ `--max-time` æˆ– `timeout=`ï¼Œä»¥é¿å…åœ¨å®žä¾‹ä¸å¯è®¿é—®æ—¶æŒ‚èµ·ã€‚
- **è‡ªæ‰˜ç®¡æœ€ä½³**ï¼šå…¬å…±å®žä¾‹å¯èƒ½å®•æœºã€é™é€Ÿæˆ–å±è”½è¯·æ±‚ã€‚è‡ªæ‰˜ç®¡å®žä¾‹æ›´å¯é ã€‚

## å®žä¾‹å‘çŽ°

å¦‚æžœ `SEARXNG_URL` æœªè®¾ç½®ä¸”ç”¨æˆ·è¯¢é—® SearXNGï¼Œå¸®åŠ©ä»–ä»¬ï¼š
1. æ‰¾åˆ°å…¬å…± SearXNG å®žä¾‹ï¼ˆæœç´¢"public searxng instance"ï¼‰
2. ä½¿ç”¨ Docker æˆ– pip æ­å»ºè‡ªå·±çš„å®žä¾‹

å…¬å…±å®žä¾‹åˆ—è¡¨ï¼šhttps://searxng.org/
