---
title: "Gif Search â€” é€šè¿‡ curl + jq æœç´¢/ä¸‹è½½ Tenor GIF"
sidebar_label: "Gif Search"
description: "é€šè¿‡ curl + jq æœç´¢/ä¸‹è½½ Tenor GIF"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Gif Search

é€šè¿‡ curl + jq æœç´¢/ä¸‹è½½ Tenor GIFã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/media/gif-search` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `GIF`, `Media`, `Search`, `Tenor`, `API` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# GIF Searchï¼ˆTenor APIï¼‰

é€šè¿‡ Tenor API ä½¿ç”¨ curl ç›´æŽ¥æœç´¢å’Œä¸‹è½½ GIFï¼Œæ— éœ€é¢å¤–å·¥å…·ã€‚

## ä½¿ç”¨åœºæ™¯

é€‚ç”¨äºŽæŸ¥æ‰¾ååº” GIFã€åˆ›å»ºè§†è§‰å†…å®¹ä»¥åŠåœ¨èŠå¤©ä¸­å‘é€ GIFã€‚

## é…ç½®

åœ¨çŽ¯å¢ƒä¸­è®¾ç½® Tenor API å¯†é’¥ï¼ˆæ·»åŠ åˆ° `~/.zed/.env`ï¼‰ï¼š

```bash
TENOR_API_KEY=your_key_here
```

åœ¨ https://developers.google.com/tenor/guides/quickstart å…è´¹èŽ·å– API å¯†é’¥ â€”â€” Google Cloud Console Tenor API å¯†é’¥å…è´¹ä¸”å…·æœ‰è¾ƒé«˜çš„é€ŸçŽ‡é™åˆ¶ã€‚

## å‰ç½®æ¡ä»¶

- `curl` å’Œ `jq`ï¼ˆmacOS/Linux æ ‡å‡†å·¥å…·ï¼‰
- `TENOR_API_KEY` çŽ¯å¢ƒå˜é‡

## æœç´¢ GIF

```bash
# æœç´¢å¹¶èŽ·å– GIF URL
curl -s "https://tenor.googleapis.com/v2/search?q=thumbs+up&limit=5&key=${TENOR_API_KEY}" | jq -r '.results[].media_formats.gif.url'

# èŽ·å–è¾ƒå°çš„é¢„è§ˆç‰ˆæœ¬
curl -s "https://tenor.googleapis.com/v2/search?q=nice+work&limit=3&key=${TENOR_API_KEY}" | jq -r '.results[].media_formats.tinygif.url'
```

## ä¸‹è½½ GIF

```bash
# æœç´¢å¹¶ä¸‹è½½æŽ’åç¬¬ä¸€çš„ç»“æžœ
URL=$(curl -s "https://tenor.googleapis.com/v2/search?q=celebration&limit=1&key=${TENOR_API_KEY}" | jq -r '.results[0].media_formats.gif.url')
curl -sL "$URL" -o celebration.gif
```

## èŽ·å–å®Œæ•´å…ƒæ•°æ®

```bash
curl -s "https://tenor.googleapis.com/v2/search?q=cat&limit=3&key=${TENOR_API_KEY}" | jq '.results[] | {title: .title, url: .media_formats.gif.url, preview: .media_formats.tinygif.url, dimensions: .media_formats.gif.dims}'
```

## API å‚æ•°

| å‚æ•° | è¯´æ˜Ž |
|-----------|-------------|
| `q` | æœç´¢æŸ¥è¯¢ï¼ˆç©ºæ ¼ç”¨ `+` è¿›è¡Œ URL ç¼–ç ï¼‰ |
| `limit` | æœ€å¤§ç»“æžœæ•°ï¼ˆ1-50ï¼Œé»˜è®¤ 20ï¼‰ |
| `key` | API å¯†é’¥ï¼ˆæ¥è‡ª `$TENOR_API_KEY` çŽ¯å¢ƒå˜é‡ï¼‰ |
| `media_filter` | è¿‡æ»¤æ ¼å¼ï¼š`gif`ã€`tinygif`ã€`mp4`ã€`tinymp4`ã€`webm` |
| `contentfilter` | å®‰å…¨çº§åˆ«ï¼š`off`ã€`low`ã€`medium`ã€`high` |
| `locale` | è¯­è¨€ï¼š`en_US`ã€`es`ã€`fr` ç­‰ |

## å¯ç”¨åª’ä½“æ ¼å¼

æ¯ä¸ªç»“æžœåœ¨ `.media_formats` ä¸‹åŒ…å«å¤šç§æ ¼å¼ï¼š

| æ ¼å¼ | ä½¿ç”¨åœºæ™¯ |
|--------|----------|
| `gif` | å®Œæ•´è´¨é‡ GIF |
| `tinygif` | å°åž‹é¢„è§ˆ GIF |
| `mp4` | è§†é¢‘ç‰ˆæœ¬ï¼ˆæ–‡ä»¶ä½“ç§¯æ›´å°ï¼‰ |
| `tinymp4` | å°åž‹é¢„è§ˆè§†é¢‘ |
| `webm` | WebM è§†é¢‘ |
| `nanogif` | å¾®åž‹ç¼©ç•¥å›¾ |

## æ³¨æ„äº‹é¡¹

- å¯¹æŸ¥è¯¢è¿›è¡Œ URL ç¼–ç ï¼šç©ºæ ¼ç”¨ `+`ï¼Œç‰¹æ®Šå­—ç¬¦ç”¨ `%XX`
- åœ¨èŠå¤©ä¸­å‘é€æ—¶ï¼Œ`tinygif` URL æ›´è½»é‡
- GIF URL å¯ç›´æŽ¥ç”¨äºŽ markdownï¼š`![alt](https://github.com/zedteam/zed-agent/blob/main/skills/media/gif-search/url)`
