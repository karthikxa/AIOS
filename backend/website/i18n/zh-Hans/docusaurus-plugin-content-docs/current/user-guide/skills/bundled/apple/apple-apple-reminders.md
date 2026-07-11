---
title: "Apple Reminders â€” é€šè¿‡ remindctl ç®¡ç† Apple Remindersï¼šæ·»åŠ ã€åˆ—å‡ºã€å®Œæˆ"
sidebar_label: "Apple Reminders"
description: "é€šè¿‡ remindctl ç®¡ç† Apple Remindersï¼šæ·»åŠ ã€åˆ—å‡ºã€å®Œæˆ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Apple Reminders

é€šè¿‡ remindctl ç®¡ç† Apple Remindersï¼šæ·»åŠ ã€åˆ—å‡ºã€å®Œæˆã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/apple/apple-reminders` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | macos |
| æ ‡ç­¾ | `Reminders`, `tasks`, `todo`, `macOS`, `Apple` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Apple Reminders

ä½¿ç”¨ `remindctl` ç›´æŽ¥ä»Žç»ˆç«¯ç®¡ç† Apple Remindersã€‚ä»»åŠ¡é€šè¿‡ iCloud åœ¨æ‰€æœ‰ Apple è®¾å¤‡é—´åŒæ­¥ã€‚

## å‰ææ¡ä»¶

- å®‰è£…äº† Reminders.app çš„ **macOS**
- å®‰è£…ï¼š`brew install steipete/tap/remindctl`
- åœ¨æç¤ºæ—¶æŽˆäºˆ Reminders æƒé™
- æ£€æŸ¥ï¼š`remindctl status` / è¯·æ±‚æŽˆæƒï¼š`remindctl authorize`

## ä½•æ—¶ä½¿ç”¨

- ç”¨æˆ·æåˆ°"æé†’"æˆ–"Reminders åº”ç”¨"
- åˆ›å»ºå¸¦æœ‰æˆªæ­¢æ—¥æœŸä¸”éœ€åŒæ­¥åˆ° iOS çš„ä¸ªäººå¾…åŠžäº‹é¡¹
- ç®¡ç† Apple Reminders åˆ—è¡¨
- ç”¨æˆ·å¸Œæœ›ä»»åŠ¡å‡ºçŽ°åœ¨å…¶ iPhone/iPad ä¸Š

## ä½•æ—¶ä¸ä½¿ç”¨

- è°ƒåº¦ agent æé†’ â†’ æ”¹ç”¨ cronjob å·¥å…·
- æ—¥åŽ†äº‹ä»¶ â†’ ä½¿ç”¨ Apple Calendar æˆ– Google Calendar
- é¡¹ç›®ä»»åŠ¡ç®¡ç† â†’ ä½¿ç”¨ GitHub Issuesã€Notion ç­‰
- ç”¨æˆ·è¯´"æé†’æˆ‘"ä½†æ„æŒ‡ agent æé†’ â†’ å…ˆè¡Œç¡®è®¤

## å¿«é€Ÿå‚è€ƒ

### æŸ¥çœ‹æé†’

```bash
remindctl                    # ä»Šæ—¥æé†’
remindctl today              # ä»Šå¤©
remindctl tomorrow           # æ˜Žå¤©
remindctl week               # æœ¬å‘¨
remindctl overdue            # å·²é€¾æœŸ
remindctl all                # å…¨éƒ¨
remindctl 2026-01-04         # æŒ‡å®šæ—¥æœŸ
```

### ç®¡ç†åˆ—è¡¨

```bash
remindctl list               # åˆ—å‡ºæ‰€æœ‰åˆ—è¡¨
remindctl list Work          # æ˜¾ç¤ºæŒ‡å®šåˆ—è¡¨
remindctl list Projects --create    # åˆ›å»ºåˆ—è¡¨
remindctl list Work --delete        # åˆ é™¤åˆ—è¡¨
```

### åˆ›å»ºæé†’

```bash
remindctl add "Buy milk"
remindctl add --title "Call mom" --list Personal --due tomorrow
remindctl add --title "Meeting prep" --due "2026-02-15 09:00"
```

### å®Œæˆ / åˆ é™¤

```bash
remindctl complete 1 2 3          # æŒ‰ ID å®Œæˆ
remindctl delete 4A83 --force     # æŒ‰ ID åˆ é™¤
```

### è¾“å‡ºæ ¼å¼

```bash
remindctl today --json       # JSON æ ¼å¼ï¼Œç”¨äºŽè„šæœ¬å¤„ç†
remindctl today --plain      # TSV æ ¼å¼
remindctl today --quiet      # ä»…æ˜¾ç¤ºæ•°é‡
```

## æ—¥æœŸæ ¼å¼

`--due` åŠæ—¥æœŸç­›é€‰å™¨æŽ¥å—ä»¥ä¸‹æ ¼å¼ï¼š
- `today`ã€`tomorrow`ã€`yesterday`
- `YYYY-MM-DD`
- `YYYY-MM-DD HH:mm`
- ISO 8601ï¼ˆ`2026-01-04T12:34:56Z`ï¼‰

## è§„åˆ™

1. å½“ç”¨æˆ·è¯´"æé†’æˆ‘"æ—¶ï¼Œéœ€ç¡®è®¤ï¼šæ˜¯ Apple Remindersï¼ˆåŒæ­¥åˆ°æ‰‹æœºï¼‰è¿˜æ˜¯ agent cronjob æé†’
2. åˆ›å»ºæé†’å‰å§‹ç»ˆç¡®è®¤æé†’å†…å®¹å’Œæˆªæ­¢æ—¥æœŸ
3. ä½¿ç”¨ `--json` è¿›è¡Œç¨‹åºåŒ–è§£æž
