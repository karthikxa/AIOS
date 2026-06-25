---
title: "Arxiv â€” é€šè¿‡å…³é”®è¯ã€ä½œè€…ã€åˆ†ç±»æˆ– ID æœç´¢ arXiv è®ºæ–‡"
sidebar_label: "Arxiv"
description: "é€šè¿‡å…³é”®è¯ã€ä½œè€…ã€åˆ†ç±»æˆ– ID æœç´¢ arXiv è®ºæ–‡"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Arxiv

é€šè¿‡å…³é”®è¯ã€ä½œè€…ã€åˆ†ç±»æˆ– ID æœç´¢ arXiv è®ºæ–‡ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/research/arxiv` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Research`, `Arxiv`, `Papers`, `Academic`, `Science`, `API` |
| ç›¸å…³ skill | [`ocr-and-documents`](/user-guide/skills/bundled/productivity/productivity-ocr-and-documents) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# arXiv å­¦æœ¯ç ”ç©¶

é€šè¿‡ arXiv å…è´¹ REST API æœç´¢å¹¶èŽ·å–å­¦æœ¯è®ºæ–‡ã€‚æ— éœ€ API keyï¼Œæ— éœ€é¢å¤–ä¾èµ–â€”â€”ä»…ä½¿ç”¨ curlã€‚

## å¿«é€Ÿå‚è€ƒ

| æ“ä½œ | å‘½ä»¤ |
|--------|---------|
| æœç´¢è®ºæ–‡ | `curl "https://export.arxiv.org/api/query?search_query=all:QUERY&max_results=5"` |
| èŽ·å–æŒ‡å®šè®ºæ–‡ | `curl "https://export.arxiv.org/api/query?id_list=2402.03300"` |
| é˜…è¯»æ‘˜è¦ï¼ˆç½‘é¡µï¼‰ | `web_extract(urls=["https://arxiv.org/abs/2402.03300"])` |
| é˜…è¯»å®Œæ•´è®ºæ–‡ï¼ˆPDFï¼‰ | `web_extract(urls=["https://arxiv.org/pdf/2402.03300"])` |

## æœç´¢è®ºæ–‡

API è¿”å›ž Atom XML æ ¼å¼æ•°æ®ã€‚å¯ä½¿ç”¨ `grep`/`sed` è§£æžï¼Œæˆ–é€šè¿‡ç®¡é“ä¼ ç»™ `python3` èŽ·å¾—æ•´æ´è¾“å‡ºã€‚

### åŸºæœ¬æœç´¢

```bash
curl -s "https://export.arxiv.org/api/query?search_query=all:GRPO+reinforcement+learning&max_results=5"
```

### æ•´æ´è¾“å‡ºï¼ˆå°† XML è§£æžä¸ºå¯è¯»æ ¼å¼ï¼‰

```bash
curl -s "https://export.arxiv.org/api/query?search_query=all:GRPO+reinforcement+learning&max_results=5&sortBy=submittedDate&sortOrder=descending" | python3 -c "
import sys, xml.etree.ElementTree as ET
ns = {'a': 'http://www.w3.org/2005/Atom'}
root = ET.parse(sys.stdin).getroot()
for i, entry in enumerate(root.findall('a:entry', ns)):
    title = entry.find('a:title', ns).text.strip().replace('\n', ' ')
    arxiv_id = entry.find('a:id', ns).text.strip().split('/abs/')[-1]
    published = entry.find('a:published', ns).text[:10]
    authors = ', '.join(a.find('a:name', ns).text for a in entry.findall('a:author', ns))
    summary = entry.find('a:summary', ns).text.strip()[:200]
    cats = ', '.join(c.get('term') for c in entry.findall('a:category', ns))
    print(f'{i+1}. [{arxiv_id}] {title}')
    print(f'   Authors: {authors}')
    print(f'   Published: {published} | Categories: {cats}')
    print(f'   Abstract: {summary}...')
    print(f'   PDF: https://arxiv.org/pdf/{arxiv_id}')
    print()
"
```

## æœç´¢æŸ¥è¯¢è¯­æ³•

| å‰ç¼€ | æœç´¢èŒƒå›´ | ç¤ºä¾‹ |
|--------|----------|---------|
| `all:` | æ‰€æœ‰å­—æ®µ | `all:transformer+attention` |
| `ti:` | æ ‡é¢˜ | `ti:large+language+models` |
| `au:` | ä½œè€… | `au:vaswani` |
| `abs:` | æ‘˜è¦ | `abs:reinforcement+learning` |
| `cat:` | åˆ†ç±» | `cat:cs.AI` |
| `co:` | å¤‡æ³¨ | `co:accepted+NeurIPS` |

### å¸ƒå°”è¿ç®—ç¬¦

```
# ANDï¼ˆä½¿ç”¨ + æ—¶çš„é»˜è®¤è¡Œä¸ºï¼‰
search_query=all:transformer+attention

# OR
search_query=all:GPT+OR+all:BERT

# AND NOT
search_query=all:language+model+ANDNOT+all:vision

# ç²¾ç¡®çŸ­è¯­
search_query=ti:"chain+of+thought"

# ç»„åˆä½¿ç”¨
search_query=au:hinton+AND+cat:cs.LG
```

## æŽ’åºä¸Žåˆ†é¡µ

| å‚æ•° | é€‰é¡¹ |
|-----------|---------|
| `sortBy` | `relevance`, `lastUpdatedDate`, `submittedDate` |
| `sortOrder` | `ascending`, `descending` |
| `start` | ç»“æžœåç§»é‡ï¼ˆä»Ž 0 å¼€å§‹ï¼‰ |
| `max_results` | ç»“æžœæ•°é‡ï¼ˆé»˜è®¤ 10ï¼Œæœ€å¤§ 30000ï¼‰ |

```bash
# cs.AI åˆ†ç±»ä¸‹æœ€æ–°çš„ 10 ç¯‡è®ºæ–‡
curl -s "https://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=10"
```

## èŽ·å–æŒ‡å®šè®ºæ–‡

```bash
# é€šè¿‡ arXiv ID
curl -s "https://export.arxiv.org/api/query?id_list=2402.03300"

# å¤šç¯‡è®ºæ–‡
curl -s "https://export.arxiv.org/api/query?id_list=2402.03300,2401.12345,2403.00001"
```

## ç”Ÿæˆ BibTeX

èŽ·å–è®ºæ–‡å…ƒæ•°æ®åŽï¼Œç”Ÿæˆ BibTeX æ¡ç›®ï¼š

&#123;% raw %&#125;
```bash
curl -s "https://export.arxiv.org/api/query?id_list=1706.03762" | python3 -c "
import sys, xml.etree.ElementTree as ET
ns = {'a': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom'}
root = ET.parse(sys.stdin).getroot()
entry = root.find('a:entry', ns)
if entry is None: sys.exit('Paper not found')
title = entry.find('a:title', ns).text.strip().replace('\n', ' ')
authors = ' and '.join(a.find('a:name', ns).text for a in entry.findall('a:author', ns))
year = entry.find('a:published', ns).text[:4]
raw_id = entry.find('a:id', ns).text.strip().split('/abs/')[-1]
cat = entry.find('arxiv:primary_category', ns)
primary = cat.get('term') if cat is not None else 'cs.LG'
last_name = entry.find('a:author', ns).find('a:name', ns).text.split()[-1]
print(f'@article{{{last_name}{year}_{raw_id.replace(\".\", \"\")},')
print(f'  title     = {{{title}}},')
print(f'  author    = {{{authors}}},')
print(f'  year      = {{{year}}},')
print(f'  eprint    = {{{raw_id}}},')
print(f'  archivePrefix = {{arXiv}},')
print(f'  primaryClass  = {{{primary}}},')
print(f'  url       = {{https://arxiv.org/abs/{raw_id}}}')
print('}')
"
```
&#123;% endraw %&#125;

## é˜…è¯»è®ºæ–‡å†…å®¹

æ‰¾åˆ°è®ºæ–‡åŽï¼ŒæŒ‰ä»¥ä¸‹æ–¹å¼é˜…è¯»ï¼š

```
# æ‘˜è¦é¡µï¼ˆé€Ÿåº¦å¿«ï¼ŒåŒ…å«å…ƒæ•°æ®å’Œæ‘˜è¦ï¼‰
web_extract(urls=["https://arxiv.org/abs/2402.03300"])

# å®Œæ•´è®ºæ–‡ï¼ˆPDF â†’ é€šè¿‡ Firecrawl è½¬ä¸º markdownï¼‰
web_extract(urls=["https://arxiv.org/pdf/2402.03300"])
```

æœ¬åœ° PDF å¤„ç†è¯·å‚é˜… `ocr-and-documents` skillã€‚

## å¸¸ç”¨åˆ†ç±»

| åˆ†ç±» | é¢†åŸŸ |
|----------|-------|
| `cs.AI` | äººå·¥æ™ºèƒ½ |
| `cs.CL` | è®¡ç®—ä¸Žè¯­è¨€ï¼ˆNLPï¼‰ |
| `cs.CV` | è®¡ç®—æœºè§†è§‰ |
| `cs.LG` | æœºå™¨å­¦ä¹  |
| `cs.CR` | å¯†ç å­¦ä¸Žå®‰å…¨ |
| `stat.ML` | æœºå™¨å­¦ä¹ ï¼ˆç»Ÿè®¡ï¼‰ |
| `math.OC` | ä¼˜åŒ–ä¸ŽæŽ§åˆ¶ |
| `physics.comp-ph` | è®¡ç®—ç‰©ç† |

å®Œæ•´åˆ—è¡¨ï¼šhttps://arxiv.org/category_taxonomy

## è¾…åŠ©è„šæœ¬

`scripts/search_arxiv.py` è„šæœ¬è´Ÿè´£å¤„ç† XML è§£æžå¹¶æä¾›æ•´æ´è¾“å‡ºï¼š

```bash
python scripts/search_arxiv.py "GRPO reinforcement learning"
python scripts/search_arxiv.py "transformer attention" --max 10 --sort date
python scripts/search_arxiv.py --author "Yann LeCun" --max 5
python scripts/search_arxiv.py --category cs.AI --sort date
python scripts/search_arxiv.py --id 2402.03300
python scripts/search_arxiv.py --id 2402.03300,2401.12345
```

æ— éœ€é¢å¤–ä¾èµ–â€”â€”ä»…ä½¿ç”¨ Python æ ‡å‡†åº“ã€‚

---

## Semantic Scholarï¼ˆå¼•ç”¨ã€ç›¸å…³è®ºæ–‡ã€ä½œè€…ä¸»é¡µï¼‰

arXiv ä¸æä¾›å¼•ç”¨æ•°æ®æˆ–æŽ¨èåŠŸèƒ½ã€‚è¯·ä½¿ç”¨ **Semantic Scholar API**â€”â€”å…è´¹ï¼ŒåŸºæœ¬ä½¿ç”¨æ— éœ€ API keyï¼ˆ1 æ¬¡è¯·æ±‚/ç§’ï¼‰ï¼Œè¿”å›ž JSON æ ¼å¼ã€‚

### èŽ·å–è®ºæ–‡è¯¦æƒ…åŠå¼•ç”¨ä¿¡æ¯

```bash
# é€šè¿‡ arXiv ID
curl -s "https://api.semanticscholar.org/graph/v1/paper/arXiv:2402.03300?fields=title,authors,citationCount,referenceCount,influentialCitationCount,year,abstract" | python3 -m json.tool

# é€šè¿‡ Semantic Scholar è®ºæ–‡ ID æˆ– DOI
curl -s "https://api.semanticscholar.org/graph/v1/paper/DOI:10.1234/example?fields=title,citationCount"
```

### èŽ·å–å¼•ç”¨è¯¥è®ºæ–‡çš„æ–‡çŒ®ï¼ˆè¢«å¼•æƒ…å†µï¼‰

```bash
curl -s "https://api.semanticscholar.org/graph/v1/paper/arXiv:2402.03300/citations?fields=title,authors,year,citationCount&limit=10" | python3 -m json.tool
```

### èŽ·å–è¯¥è®ºæ–‡çš„å‚è€ƒæ–‡çŒ®ï¼ˆå¼•ç”¨æƒ…å†µï¼‰

```bash
curl -s "https://api.semanticscholar.org/graph/v1/paper/arXiv:2402.03300/references?fields=title,authors,year,citationCount&limit=10" | python3 -m json.tool
```

### æœç´¢è®ºæ–‡ï¼ˆarXiv æœç´¢çš„æ›¿ä»£æ–¹æ¡ˆï¼Œè¿”å›ž JSONï¼‰

```bash
curl -s "https://api.semanticscholar.org/graph/v1/paper/search?query=GRPO+reinforcement+learning&limit=5&fields=title,authors,year,citationCount,externalIds" | python3 -m json.tool
```

### èŽ·å–è®ºæ–‡æŽ¨è

```bash
curl -s -X POST "https://api.semanticscholar.org/recommendations/v1/papers/" \
  -H "Content-Type: application/json" \
  -d '{"positivePaperIds": ["arXiv:2402.03300"], "negativePaperIds": []}' | python3 -m json.tool
```

### ä½œè€…ä¸»é¡µ

```bash
curl -s "https://api.semanticscholar.org/graph/v1/author/search?query=Yann+LeCun&fields=name,hIndex,citationCount,paperCount" | python3 -m json.tool
```

### å¸¸ç”¨ Semantic Scholar å­—æ®µ

`title`ã€`authors`ã€`year`ã€`abstract`ã€`citationCount`ã€`referenceCount`ã€`influentialCitationCount`ã€`isOpenAccess`ã€`openAccessPdf`ã€`fieldsOfStudy`ã€`publicationVenue`ã€`externalIds`ï¼ˆåŒ…å« arXiv IDã€DOI ç­‰ï¼‰

---

## å®Œæ•´ç ”ç©¶å·¥ä½œæµ

1. **å‘çŽ°è®ºæ–‡**ï¼š`python scripts/search_arxiv.py "your topic" --sort date --max 10`
2. **è¯„ä¼°å½±å“åŠ›**ï¼š`curl -s "https://api.semanticscholar.org/graph/v1/paper/arXiv:ID?fields=citationCount,influentialCitationCount"`
3. **é˜…è¯»æ‘˜è¦**ï¼š`web_extract(urls=["https://arxiv.org/abs/ID"])`
4. **é˜…è¯»å®Œæ•´è®ºæ–‡**ï¼š`web_extract(urls=["https://arxiv.org/pdf/ID"])`
5. **æŸ¥æ‰¾ç›¸å…³å·¥ä½œ**ï¼š`curl -s "https://api.semanticscholar.org/graph/v1/paper/arXiv:ID/references?fields=title,citationCount&limit=20"`
6. **èŽ·å–æŽ¨è**ï¼šå‘ Semantic Scholar æŽ¨èæŽ¥å£å‘é€ POST è¯·æ±‚
7. **è¿½è¸ªä½œè€…**ï¼š`curl -s "https://api.semanticscholar.org/graph/v1/author/search?query=NAME"`

## é€ŸçŽ‡é™åˆ¶

| API | é€ŸçŽ‡ | è®¤è¯ |
|-----|------|------|
| arXiv | çº¦ 1 æ¬¡è¯·æ±‚ / 3 ç§’ | æ— éœ€è®¤è¯ |
| Semantic Scholar | 1 æ¬¡è¯·æ±‚ / ç§’ | æ— éœ€è®¤è¯ï¼ˆæœ‰ API key å¯è¾¾ 100 æ¬¡/ç§’ï¼‰ |

## æ³¨æ„äº‹é¡¹

- arXiv è¿”å›ž Atom XMLâ€”â€”ä½¿ç”¨è¾…åŠ©è„šæœ¬æˆ–è§£æžä»£ç ç‰‡æ®µèŽ·å¾—æ•´æ´è¾“å‡º
- Semantic Scholar è¿”å›ž JSONâ€”â€”é€šè¿‡ç®¡é“ä¼ ç»™ `python3 -m json.tool` æå‡å¯è¯»æ€§
- arXiv ID æ ¼å¼ï¼šæ—§æ ¼å¼ï¼ˆ`hep-th/0601001`ï¼‰ä¸Žæ–°æ ¼å¼ï¼ˆ`2402.03300`ï¼‰
- PDFï¼š`https://arxiv.org/pdf/{id}` â€” æ‘˜è¦ï¼š`https://arxiv.org/abs/{id}`
- HTMLï¼ˆå¦‚æœ‰ï¼‰ï¼š`https://arxiv.org/html/{id}`
- æœ¬åœ° PDF å¤„ç†è¯·å‚é˜… `ocr-and-documents` skill

## ID ç‰ˆæœ¬æŽ§åˆ¶

- `arxiv.org/abs/1706.03762` å§‹ç»ˆè§£æžä¸º**æœ€æ–°**ç‰ˆæœ¬
- `arxiv.org/abs/1706.03762v1` æŒ‡å‘æŸä¸ª**ç‰¹å®š**ä¸å¯å˜ç‰ˆæœ¬
- ç”Ÿæˆå¼•ç”¨æ—¶ï¼Œè¯·ä¿ç•™ä½ å®žé™…é˜…è¯»çš„ç‰ˆæœ¬åŽç¼€ï¼Œä»¥é˜²å¼•ç”¨æ¼‚ç§»ï¼ˆåŽç»­ç‰ˆæœ¬å¯èƒ½å¯¹å†…å®¹æœ‰é‡å¤§ä¿®æ”¹ï¼‰
- API çš„ `<id>` å­—æ®µè¿”å›žå¸¦ç‰ˆæœ¬å·çš„ URLï¼ˆä¾‹å¦‚ `http://arxiv.org/abs/1706.03762v7`ï¼‰

## å·²æ’¤å›žè®ºæ–‡

è®ºæ–‡æäº¤åŽå¯èƒ½è¢«æ’¤å›žã€‚å‘ç”Ÿè¿™ç§æƒ…å†µæ—¶ï¼š
- `<summary>` å­—æ®µä¼šåŒ…å«æ’¤å›žå£°æ˜Žï¼ˆæ³¨æ„æŸ¥æ‰¾ "withdrawn" æˆ– "retracted" å­—æ ·ï¼‰
- å…ƒæ•°æ®å­—æ®µå¯èƒ½ä¸å®Œæ•´
- åœ¨å°†æŸæ¡ç»“æžœè§†ä¸ºæœ‰æ•ˆè®ºæ–‡ä¹‹å‰ï¼Œè¯·åŠ¡å¿…æ£€æŸ¥æ‘˜è¦å†…å®¹