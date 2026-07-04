---
title: "Scrapling"
sidebar_label: "Scrapling"
description: "ä½¿ç”¨ Scrapling è¿›è¡Œç½‘é¡µæŠ“å–â€”â€”HTTP èŽ·å–ã€éšèº«æµè§ˆå™¨è‡ªåŠ¨åŒ–ã€Cloudflare ç»•è¿‡åŠé€šè¿‡ CLI å’Œ Python è¿›è¡Œçˆ¬è™«æŠ“å–"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Scrapling

ä½¿ç”¨ Scrapling è¿›è¡Œç½‘é¡µæŠ“å–â€”â€”HTTP èŽ·å–ã€éšèº«æµè§ˆå™¨è‡ªåŠ¨åŒ–ã€Cloudflare ç»•è¿‡åŠé€šè¿‡ CLI å’Œ Python è¿›è¡Œçˆ¬è™«æŠ“å–ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰â€”â€”ä½¿ç”¨ `zed skills install official/research/scrapling` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/scrapling` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | FEUAZUR |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Web Scraping`, `Browser`, `Cloudflare`, `Stealth`, `Crawling`, `Spider` |
| ç›¸å…³ skill | [`duckduckgo-search`](/user-guide/skills/optional/research/research-duckduckgo-search), [`domain-intel`](/user-guide/skills/optional/research/research-domain-intel) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Scrapling

[Scrapling](https://github.com/D4Vinci/Scrapling) æ˜¯ä¸€ä¸ªå…·å¤‡åæœºå™¨äººç»•è¿‡ã€éšèº«æµè§ˆå™¨è‡ªåŠ¨åŒ–å’Œçˆ¬è™«æ¡†æž¶çš„ç½‘é¡µæŠ“å–æ¡†æž¶ã€‚å®ƒæä¾›ä¸‰ç§èŽ·å–ç­–ç•¥ï¼ˆHTTPã€åŠ¨æ€ JSã€éšèº«/Cloudflareï¼‰ä»¥åŠå®Œæ•´çš„ CLIã€‚

**æœ¬ skill ä»…ä¾›æ•™è‚²å’Œç ”ç©¶ç›®çš„ä½¿ç”¨ã€‚** ç”¨æˆ·å¿…é¡»éµå®ˆå½“åœ°åŠå›½é™…æ•°æ®æŠ“å–æ³•å¾‹ï¼Œå¹¶å°Šé‡ç½‘ç«™æœåŠ¡æ¡æ¬¾ã€‚

## ä½¿ç”¨åœºæ™¯

- æŠ“å–é™æ€ HTML é¡µé¢ï¼ˆæ¯”æµè§ˆå™¨å·¥å…·æ›´å¿«ï¼‰
- æŠ“å–éœ€è¦çœŸå®žæµè§ˆå™¨çš„ JS æ¸²æŸ“é¡µé¢
- ç»•è¿‡ Cloudflare Turnstile æˆ–æœºå™¨äººæ£€æµ‹
- ä½¿ç”¨çˆ¬è™«æŠ“å–å¤šä¸ªé¡µé¢
- å½“å†…ç½® `web_extract` å·¥å…·æ— æ³•è¿”å›žæ‰€éœ€æ•°æ®æ—¶

## å®‰è£…

```bash
pip install "scrapling[all]"
scrapling install
```

æœ€å°å®‰è£…ï¼ˆä»… HTTPï¼Œæ— æµè§ˆå™¨ï¼‰ï¼š
```bash
pip install scrapling
```

ä»…å«æµè§ˆå™¨è‡ªåŠ¨åŒ–ï¼š
```bash
pip install "scrapling[fetchers]"
scrapling install
```

## å¿«é€Ÿå‚è€ƒ

| æ–¹å¼ | ç±» | ä½¿ç”¨åœºæ™¯ |
|----------|-------|----------|
| HTTP | `Fetcher` / `FetcherSession` | é™æ€é¡µé¢ã€APIã€å¿«é€Ÿæ‰¹é‡è¯·æ±‚ |
| åŠ¨æ€ | `DynamicFetcher` / `DynamicSession` | JS æ¸²æŸ“å†…å®¹ã€SPA |
| éšèº« | `StealthyFetcher` / `StealthySession` | Cloudflareã€åæœºå™¨äººä¿æŠ¤ç«™ç‚¹ |
| çˆ¬è™« | `Spider` | è·Ÿéšé“¾æŽ¥çš„å¤šé¡µé¢æŠ“å– |

## CLI ç”¨æ³•

### æå–é™æ€é¡µé¢

```bash
scrapling extract get 'https://example.com' output.md
```

ä½¿ç”¨ CSS é€‰æ‹©å™¨å’Œæµè§ˆå™¨æ¨¡æ‹Ÿï¼š

```bash
scrapling extract get 'https://example.com' output.md \
  --css-selector '.content' \
  --impersonate 'chrome'
```

### æå– JS æ¸²æŸ“é¡µé¢

```bash
scrapling extract fetch 'https://example.com' output.md \
  --css-selector '.dynamic-content' \
  --disable-resources \
  --network-idle
```

### æå– Cloudflare ä¿æŠ¤é¡µé¢

```bash
scrapling extract stealthy-fetch 'https://protected-site.com' output.html \
  --solve-cloudflare \
  --block-webrtc \
  --hide-canvas
```

### POST è¯·æ±‚

```bash
scrapling extract post 'https://example.com/api' output.json \
  --json '{"query": "search term"}'
```

### è¾“å‡ºæ ¼å¼

è¾“å‡ºæ ¼å¼ç”±æ–‡ä»¶æ‰©å±•åå†³å®šï¼š
- `.html` â€”â€” åŽŸå§‹ HTML
- `.md` â€”â€” è½¬æ¢ä¸º Markdown
- `.txt` â€”â€” çº¯æ–‡æœ¬
- `.json` / `.jsonl` â€”â€” JSON

## Pythonï¼šHTTP æŠ“å–

### å•æ¬¡è¯·æ±‚

```python
from scrapling.fetchers import Fetcher

page = Fetcher.get('https://quotes.toscrape.com/')
quotes = page.css('.quote .text::text').getall()
for q in quotes:
    print(q)
```

### Sessionï¼ˆæŒä¹…åŒ– Cookieï¼‰

```python
from scrapling.fetchers import FetcherSession

with FetcherSession(impersonate='chrome') as session:
    page = session.get('https://example.com/', stealthy_headers=True)
    links = page.css('a::attr(href)').getall()
    for link in links[:5]:
        sub = session.get(link)
        print(sub.css('h1::text').get())
```

### POST / PUT / DELETE

```python
page = Fetcher.post('https://api.example.com/data', json={"key": "value"})
page = Fetcher.put('https://api.example.com/item/1', data={"name": "updated"})
page = Fetcher.delete('https://api.example.com/item/1')
```

### ä½¿ç”¨ä»£ç†

```python
page = Fetcher.get('https://example.com', proxy='http://user:pass@proxy:8080')
```

## Pythonï¼šåŠ¨æ€é¡µé¢ï¼ˆJS æ¸²æŸ“ï¼‰

é€‚ç”¨äºŽéœ€è¦æ‰§è¡Œ JavaScript çš„é¡µé¢ï¼ˆSPAã€æ‡’åŠ è½½å†…å®¹ï¼‰ï¼š

```python
from scrapling.fetchers import DynamicFetcher

page = DynamicFetcher.fetch('https://example.com', headless=True)
data = page.css('.js-loaded-content::text').getall()
```

### ç­‰å¾…ç‰¹å®šå…ƒç´ 

```python
page = DynamicFetcher.fetch(
    'https://example.com',
    wait_selector=('.results', 'visible'),
    network_idle=True,
)
```

### ç¦ç”¨èµ„æºä»¥æå‡é€Ÿåº¦

é˜»æ­¢å­—ä½“ã€å›¾ç‰‡ã€åª’ä½“ã€æ ·å¼è¡¨ï¼ˆé€Ÿåº¦æå‡çº¦ 25%ï¼‰ï¼š

```python
from scrapling.fetchers import DynamicSession

with DynamicSession(headless=True, disable_resources=True, network_idle=True) as session:
    page = session.fetch('https://example.com')
    items = page.css('.item::text').getall()
```

### è‡ªå®šä¹‰é¡µé¢è‡ªåŠ¨åŒ–

```python
from playwright.sync_api import Page
from scrapling.fetchers import DynamicFetcher

def scroll_and_click(page: Page):
    page.mouse.wheel(0, 3000)
    page.wait_for_timeout(1000)
    page.click('button.load-more')
    page.wait_for_selector('.extra-results')

page = DynamicFetcher.fetch('https://example.com', page_action=scroll_and_click)
results = page.css('.extra-results .item::text').getall()
```

## Pythonï¼šéšèº«æ¨¡å¼ï¼ˆåæœºå™¨äººç»•è¿‡ï¼‰

é€‚ç”¨äºŽ Cloudflare ä¿æŠ¤æˆ–é«˜åº¦æŒ‡çº¹è¯†åˆ«çš„ç«™ç‚¹ï¼š

```python
from scrapling.fetchers import StealthyFetcher

page = StealthyFetcher.fetch(
    'https://protected-site.com',
    headless=True,
    solve_cloudflare=True,
    block_webrtc=True,
    hide_canvas=True,
)
content = page.css('.protected-content::text').getall()
```

### éšèº« Session

```python
from scrapling.fetchers import StealthySession

with StealthySession(headless=True, solve_cloudflare=True) as session:
    page1 = session.fetch('https://protected-site.com/page1')
    page2 = session.fetch('https://protected-site.com/page2')
```

## å…ƒç´ é€‰æ‹©

æ‰€æœ‰ fetcher å‡è¿”å›žä¸€ä¸ª `Selector` å¯¹è±¡ï¼ŒåŒ…å«ä»¥ä¸‹æ–¹æ³•ï¼š

### CSS é€‰æ‹©å™¨

```python
page.css('h1::text').get()              # ç¬¬ä¸€ä¸ª h1 æ–‡æœ¬
page.css('a::attr(href)').getall()      # æ‰€æœ‰é“¾æŽ¥ href
page.css('.quote .text::text').getall() # åµŒå¥—é€‰æ‹©
```

### XPath

```python
page.xpath('//div[@class="content"]/text()').getall()
page.xpath('//a/@href').getall()
```

### Find æ–¹æ³•

```python
page.find_all('div', class_='quote')       # æŒ‰æ ‡ç­¾ + å±žæ€§æŸ¥æ‰¾
page.find_by_text('Read more', tag='a')    # æŒ‰æ–‡æœ¬å†…å®¹æŸ¥æ‰¾
page.find_by_regex(r'\$\d+\.\d{2}')       # æŒ‰æ­£åˆ™è¡¨è¾¾å¼æŸ¥æ‰¾
```

### ç›¸ä¼¼å…ƒç´ 

æŸ¥æ‰¾å…·æœ‰ç›¸ä¼¼ç»“æž„çš„å…ƒç´ ï¼ˆé€‚ç”¨äºŽå•†å“åˆ—è¡¨ç­‰ï¼‰ï¼š

```python
first_product = page.css('.product')[0]
all_similar = first_product.find_similar()
```

### å¯¼èˆª

```python
el = page.css('.target')[0]
el.parent                # çˆ¶å…ƒç´ 
el.children              # å­å…ƒç´ 
el.next_sibling          # ä¸‹ä¸€ä¸ªå…„å¼Ÿå…ƒç´ 
el.prev_sibling          # ä¸Šä¸€ä¸ªå…„å¼Ÿå…ƒç´ 
```

## Pythonï¼šçˆ¬è™«æ¡†æž¶

é€‚ç”¨äºŽè·Ÿéšé“¾æŽ¥çš„å¤šé¡µé¢æŠ“å–ï¼š

```python
from scrapling.spiders import Spider, Request, Response

class QuotesSpider(Spider):
    name = "quotes"
    start_urls = ["https://quotes.toscrape.com/"]
    concurrent_requests = 10
    download_delay = 1

    async def parse(self, response: Response):
        for quote in response.css('.quote'):
            yield {
                "text": quote.css('.text::text').get(),
                "author": quote.css('.author::text').get(),
                "tags": quote.css('.tag::text').getall(),
            }

        next_page = response.css('.next a::attr(href)').get()
        if next_page:
            yield response.follow(next_page)

result = QuotesSpider().start()
print(f"Scraped {len(result.items)} quotes")
result.items.to_json("quotes.json")
```

### å¤š Session çˆ¬è™«

å°†è¯·æ±‚è·¯ç”±åˆ°ä¸åŒçš„ fetcher ç±»åž‹ï¼š

```python
from scrapling.fetchers import FetcherSession, AsyncStealthySession

class SmartSpider(Spider):
    name = "smart"
    start_urls = ["https://example.com/"]

    def configure_sessions(self, manager):
        manager.add("fast", FetcherSession(impersonate="chrome"))
        manager.add("stealth", AsyncStealthySession(headless=True), lazy=True)

    async def parse(self, response: Response):
        for link in response.css('a::attr(href)').getall():
            if "protected" in link:
                yield Request(link, sid="stealth")
            else:
                yield Request(link, sid="fast", callback=self.parse)
```

### æš‚åœ/æ¢å¤æŠ“å–

```python
spider = QuotesSpider(crawldir="./crawl_checkpoint")
spider.start()  # æŒ‰ Ctrl+C æš‚åœï¼Œé‡æ–°è¿è¡Œä»¥ä»Žæ£€æŸ¥ç‚¹æ¢å¤
```

## æ³¨æ„äº‹é¡¹

- **éœ€è¦å®‰è£…æµè§ˆå™¨**ï¼špip å®‰è£…åŽè¿è¡Œ `scrapling install`â€”â€”å¦åˆ™ `DynamicFetcher` å’Œ `StealthyFetcher` å°†æ— æ³•ä½¿ç”¨
- **è¶…æ—¶**ï¼šDynamicFetcher/StealthyFetcher çš„è¶…æ—¶å•ä½ä¸º**æ¯«ç§’**ï¼ˆé»˜è®¤ 30000ï¼‰ï¼ŒFetcher çš„è¶…æ—¶å•ä½ä¸º**ç§’**
- **Cloudflare ç»•è¿‡**ï¼š`solve_cloudflare=True` ä¼šå¢žåŠ  5-15 ç§’çš„èŽ·å–æ—¶é—´â€”â€”ä»…åœ¨å¿…è¦æ—¶å¯ç”¨
- **èµ„æºå ç”¨**ï¼šStealthyFetcher è¿è¡ŒçœŸå®žæµè§ˆå™¨â€”â€”é™åˆ¶å¹¶å‘ä½¿ç”¨é‡
- **æ³•å¾‹åˆè§„**ï¼šæŠ“å–å‰åŠ¡å¿…æ£€æŸ¥ robots.txt å’Œç½‘ç«™æœåŠ¡æ¡æ¬¾ã€‚æœ¬åº“ä»…ä¾›æ•™è‚²å’Œç ”ç©¶ç›®çš„ä½¿ç”¨
- **Python ç‰ˆæœ¬**ï¼šéœ€è¦ Python 3.10+