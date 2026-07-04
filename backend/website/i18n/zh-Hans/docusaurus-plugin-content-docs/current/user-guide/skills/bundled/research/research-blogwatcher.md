---
title: "Blogwatcher â€” é€šè¿‡ blogwatcher-cli å·¥å…·ç›‘æŽ§åšå®¢å’Œ RSS/Atom è®¢é˜…æº"
sidebar_label: "Blogwatcher"
description: "é€šè¿‡ blogwatcher-cli å·¥å…·ç›‘æŽ§åšå®¢å’Œ RSS/Atom è®¢é˜…æº"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Blogwatcher

é€šè¿‡ blogwatcher-cli å·¥å…·ç›‘æŽ§åšå®¢å’Œ RSS/Atom è®¢é˜…æºã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/research/blogwatcher` |
| ç‰ˆæœ¬ | `2.0.0` |
| ä½œè€… | JulienTant (fork of Hyaxia/blogwatcher) |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `RSS`, `Blogs`, `Feed-Reader`, `Monitoring` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Blogwatcher

ä½¿ç”¨ `blogwatcher-cli` å·¥å…·è¿½è¸ªåšå®¢å’Œ RSS/Atom è®¢é˜…æºçš„æ›´æ–°ã€‚æ”¯æŒè‡ªåŠ¨è®¢é˜…æºå‘çŽ°ã€HTML æŠ“å–å›žé€€ã€OPML å¯¼å…¥ï¼Œä»¥åŠæ–‡ç« å·²è¯»/æœªè¯»ç®¡ç†ã€‚

## å®‰è£…

é€‰æ‹©ä»¥ä¸‹ä»»ä¸€æ–¹å¼ï¼š

- **Goï¼š** `go install github.com/JulienTant/blogwatcher-cli/cmd/blogwatcher-cli@latest`
- **Dockerï¼š** `docker run --rm -v blogwatcher-cli:/data ghcr.io/julientant/blogwatcher-cli`
- **äºŒè¿›åˆ¶æ–‡ä»¶ï¼ˆLinux amd64ï¼‰ï¼š** `curl -sL https://github.com/JulienTant/blogwatcher-cli/releases/latest/download/blogwatcher-cli_linux_amd64.tar.gz | tar xz -C /usr/local/bin blogwatcher-cli`
- **äºŒè¿›åˆ¶æ–‡ä»¶ï¼ˆLinux arm64ï¼‰ï¼š** `curl -sL https://github.com/JulienTant/blogwatcher-cli/releases/latest/download/blogwatcher-cli_linux_arm64.tar.gz | tar xz -C /usr/local/bin blogwatcher-cli`
- **äºŒè¿›åˆ¶æ–‡ä»¶ï¼ˆmacOS Apple Siliconï¼‰ï¼š** `curl -sL https://github.com/JulienTant/blogwatcher-cli/releases/latest/download/blogwatcher-cli_darwin_arm64.tar.gz | tar xz -C /usr/local/bin blogwatcher-cli`
- **äºŒè¿›åˆ¶æ–‡ä»¶ï¼ˆmacOS Intelï¼‰ï¼š** `curl -sL https://github.com/JulienTant/blogwatcher-cli/releases/latest/download/blogwatcher-cli_darwin_amd64.tar.gz | tar xz -C /usr/local/bin blogwatcher-cli`

æ‰€æœ‰å‘å¸ƒç‰ˆæœ¬ï¼šhttps://github.com/JulienTant/blogwatcher-cli/releases

### Docker æŒä¹…åŒ–å­˜å‚¨

é»˜è®¤æƒ…å†µä¸‹ï¼Œæ•°æ®åº“ä½äºŽ `~/.blogwatcher-cli/blogwatcher-cli.db`ã€‚åœ¨ Docker ä¸­ï¼Œå®¹å™¨é‡å¯åŽæ•°æ®ä¼šä¸¢å¤±ã€‚ä½¿ç”¨ `BLOGWATCHER_DB` æˆ–æŒ‚è½½å·æ¥æŒä¹…åŒ–æ•°æ®ï¼š

```bash
# å‘½åå·ï¼ˆæœ€ç®€å•ï¼‰
docker run --rm -v blogwatcher-cli:/data -e BLOGWATCHER_DB=/data/blogwatcher-cli.db ghcr.io/julientant/blogwatcher-cli scan

# ä¸»æœºç»‘å®šæŒ‚è½½
docker run --rm -v /path/on/host:/data -e BLOGWATCHER_DB=/data/blogwatcher-cli.db ghcr.io/julientant/blogwatcher-cli scan
```

### ä»ŽåŽŸç‰ˆ blogwatcher è¿ç§»

å¦‚æžœä»Ž `Hyaxia/blogwatcher` å‡çº§ï¼Œè¯·ç§»åŠ¨æ•°æ®åº“æ–‡ä»¶ï¼š

```bash
mv ~/.blogwatcher/blogwatcher.db ~/.blogwatcher-cli/blogwatcher-cli.db
```

äºŒè¿›åˆ¶æ–‡ä»¶åå·²ä»Ž `blogwatcher` æ›´æ”¹ä¸º `blogwatcher-cli`ã€‚

## å¸¸ç”¨å‘½ä»¤

### ç®¡ç†åšå®¢

- æ·»åŠ åšå®¢ï¼š`blogwatcher-cli add "My Blog" https://example.com`
- æŒ‡å®šè®¢é˜…æºæ·»åŠ ï¼š`blogwatcher-cli add "My Blog" https://example.com --feed-url https://example.com/feed.xml`
- ä½¿ç”¨ HTML æŠ“å–æ·»åŠ ï¼š`blogwatcher-cli add "My Blog" https://example.com --scrape-selector "article h2 a"`
- åˆ—å‡ºå·²è¿½è¸ªåšå®¢ï¼š`blogwatcher-cli blogs`
- ç§»é™¤åšå®¢ï¼š`blogwatcher-cli remove "My Blog" --yes`
- ä»Ž OPML å¯¼å…¥ï¼š`blogwatcher-cli import subscriptions.opml`

### æ‰«æä¸Žé˜…è¯»

- æ‰«ææ‰€æœ‰åšå®¢ï¼š`blogwatcher-cli scan`
- æ‰«æå•ä¸ªåšå®¢ï¼š`blogwatcher-cli scan "My Blog"`
- åˆ—å‡ºæœªè¯»æ–‡ç« ï¼š`blogwatcher-cli articles`
- åˆ—å‡ºæ‰€æœ‰æ–‡ç« ï¼š`blogwatcher-cli articles --all`
- æŒ‰åšå®¢ç­›é€‰ï¼š`blogwatcher-cli articles --blog "My Blog"`
- æŒ‰åˆ†ç±»ç­›é€‰ï¼š`blogwatcher-cli articles --category "Engineering"`
- æ ‡è®°æ–‡ç« ä¸ºå·²è¯»ï¼š`blogwatcher-cli read 1`
- æ ‡è®°æ–‡ç« ä¸ºæœªè¯»ï¼š`blogwatcher-cli unread 1`
- å…¨éƒ¨æ ‡è®°ä¸ºå·²è¯»ï¼š`blogwatcher-cli read-all`
- æ ‡è®°æŸåšå®¢å…¨éƒ¨å·²è¯»ï¼š`blogwatcher-cli read-all --blog "My Blog" --yes`

## çŽ¯å¢ƒå˜é‡

æ‰€æœ‰æ ‡å¿—å‡å¯é€šè¿‡å¸¦ `BLOGWATCHER_` å‰ç¼€çš„çŽ¯å¢ƒå˜é‡è®¾ç½®ï¼š

| å˜é‡ | æè¿° |
|---|---|
| `BLOGWATCHER_DB` | SQLite æ•°æ®åº“æ–‡ä»¶è·¯å¾„ |
| `BLOGWATCHER_WORKERS` | å¹¶å‘æ‰«æ worker æ•°é‡ï¼ˆé»˜è®¤ï¼š8ï¼‰ |
| `BLOGWATCHER_SILENT` | æ‰«ææ—¶ä»…è¾“å‡º"scan done" |
| `BLOGWATCHER_YES` | è·³è¿‡ç¡®è®¤æç¤º |
| `BLOGWATCHER_CATEGORY` | æŒ‰åˆ†ç±»ç­›é€‰æ–‡ç« çš„é»˜è®¤å€¼ |

## ç¤ºä¾‹è¾“å‡º

```
$ blogwatcher-cli blogs
Tracked blogs (1):

  xkcd
    URL: https://xkcd.com
    Feed: https://xkcd.com/atom.xml
    Last scanned: 2026-04-03 10:30
```

```
$ blogwatcher-cli scan
Scanning 1 blog(s)...

  xkcd
    Source: RSS | Found: 4 | New: 4

Found 4 new article(s) total!
```

```
$ blogwatcher-cli articles
Unread articles (2):

  [1] [new] Barrel - Part 13
       Blog: xkcd
       URL: https://xkcd.com/3095/
       Published: 2026-04-02
       Categories: Comics, Science

  [2] [new] Volcano Fact
       Blog: xkcd
       URL: https://xkcd.com/3094/
       Published: 2026-04-01
       Categories: Comics
```

## æ³¨æ„äº‹é¡¹

- æœªæä¾› `--feed-url` æ—¶ï¼Œè‡ªåŠ¨ä»Žåšå®¢ä¸»é¡µå‘çŽ° RSS/Atom è®¢é˜…æºã€‚
- è‹¥ RSS å¤±è´¥ä¸”å·²é…ç½® `--scrape-selector`ï¼Œåˆ™å›žé€€è‡³ HTML æŠ“å–ã€‚
- RSS/Atom è®¢é˜…æºä¸­çš„åˆ†ç±»ä¼šè¢«å­˜å‚¨ï¼Œå¯ç”¨äºŽç­›é€‰æ–‡ç« ã€‚
- æ”¯æŒä»Ž Feedlyã€Inoreaderã€NewsBlur ç­‰å¯¼å‡ºçš„ OPML æ–‡ä»¶æ‰¹é‡å¯¼å…¥åšå®¢ã€‚
- æ•°æ®åº“é»˜è®¤å­˜å‚¨äºŽ `~/.blogwatcher-cli/blogwatcher-cli.db`ï¼ˆå¯é€šè¿‡ `--db` æˆ– `BLOGWATCHER_DB` è¦†ç›–ï¼‰ã€‚
- ä½¿ç”¨ `blogwatcher-cli <command> --help` æŸ¥çœ‹æ‰€æœ‰æ ‡å¿—å’Œé€‰é¡¹ã€‚