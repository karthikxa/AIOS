---
title: "Openhue â€” é€šè¿‡ OpenHue CLI æŽ§åˆ¶ Philips Hue ç¯å…‰ã€åœºæ™¯å’Œæˆ¿é—´"
sidebar_label: "Openhue"
description: "é€šè¿‡ OpenHue CLI æŽ§åˆ¶ Philips Hue ç¯å…‰ã€åœºæ™¯å’Œæˆ¿é—´"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Openhue

é€šè¿‡ OpenHue CLI æŽ§åˆ¶ Philips Hue ç¯å…‰ã€åœºæ™¯å’Œæˆ¿é—´ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/smart-home/openhue` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Smart-Home`, `Hue`, `Lights`, `IoT`, `Automation` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# OpenHue CLI

é€šè¿‡ Hue Bridge ä»Žç»ˆç«¯æŽ§åˆ¶ Philips Hue ç¯å…‰å’Œåœºæ™¯ã€‚

## å‰ææ¡ä»¶

```bash
# Linux (pre-built binary)
curl -sL https://github.com/openhue/openhue-cli/releases/latest/download/openhue-linux-amd64 -o ~/.local/bin/openhue && chmod +x ~/.local/bin/openhue

# macOS
brew install openhue/cli/openhue-cli
```

é¦–æ¬¡è¿è¡Œéœ€è¦æŒ‰ä¸‹ Hue Bridge ä¸Šçš„æŒ‰é’®è¿›è¡Œé…å¯¹ã€‚Bridge å¿…é¡»ä¸Žè¿è¡Œè®¾å¤‡å¤„äºŽåŒä¸€æœ¬åœ°ç½‘ç»œã€‚

## ä½¿ç”¨åœºæ™¯

- "æ‰“å¼€/å…³é—­ç¯å…‰"
- "è°ƒæš—å®¢åŽ…ç¯å…‰"
- "è®¾ç½®åœºæ™¯"æˆ–"å½±é™¢æ¨¡å¼"
- æŽ§åˆ¶ç‰¹å®š Hue æˆ¿é—´ã€åŒºåŸŸæˆ–å•ä¸ªç¯æ³¡
- è°ƒæ•´äº®åº¦ã€é¢œè‰²æˆ–è‰²æ¸©

## å¸¸ç”¨å‘½ä»¤

### åˆ—å‡ºèµ„æº

```bash
openhue get light       # List all lights
openhue get room        # List all rooms
openhue get scene       # List all scenes
```

### æŽ§åˆ¶ç¯å…‰

```bash
# Turn on/off
openhue set light "Bedroom Lamp" --on
openhue set light "Bedroom Lamp" --off

# Brightness (0-100)
openhue set light "Bedroom Lamp" --on --brightness 50

# Color temperature (warm to cool: 153-500 mirek)
openhue set light "Bedroom Lamp" --on --temperature 300

# Color (by name or hex)
openhue set light "Bedroom Lamp" --on --color red
openhue set light "Bedroom Lamp" --on --rgb "#FF5500"
```

### æŽ§åˆ¶æˆ¿é—´

```bash
# Turn off entire room
openhue set room "Bedroom" --off

# Set room brightness
openhue set room "Bedroom" --on --brightness 30
```

### åœºæ™¯

```bash
openhue set scene "Relax" --room "Bedroom"
openhue set scene "Concentrate" --room "Office"
```

## å¿«é€Ÿé¢„è®¾

```bash
# Bedtime (dim warm)
openhue set room "Bedroom" --on --brightness 20 --temperature 450

# Work mode (bright cool)
openhue set room "Office" --on --brightness 100 --temperature 250

# Movie mode (dim)
openhue set room "Living Room" --on --brightness 10

# Everything off
openhue set room "Bedroom" --off
openhue set room "Office" --off
openhue set room "Living Room" --off
```

## æ³¨æ„äº‹é¡¹

- Bridge å¿…é¡»ä¸Žè¿è¡Œ Zed çš„æœºå™¨å¤„äºŽåŒä¸€æœ¬åœ°ç½‘ç»œ
- é¦–æ¬¡è¿è¡Œéœ€è¦ç‰©ç†æŒ‰ä¸‹ Hue Bridge ä¸Šçš„æŒ‰é’®è¿›è¡ŒæŽˆæƒ
- é¢œè‰²åŠŸèƒ½ä»…é€‚ç”¨äºŽæ”¯æŒå½©è‰²çš„ç¯æ³¡ï¼ˆä¸é€‚ç”¨äºŽçº¯ç™½å…‰åž‹å·ï¼‰
- ç¯å…‰å’Œæˆ¿é—´åç§°åŒºåˆ†å¤§å°å†™â€”â€”ä½¿ç”¨ `openhue get light` æŸ¥çœ‹ç¡®åˆ‡åç§°
- å¯ä¸Ž cron ä½œä¸šé…åˆå®žçŽ°å®šæ—¶ç…§æ˜ŽæŽ§åˆ¶ï¼ˆä¾‹å¦‚ï¼šç¡å‰è°ƒæš—ã€èµ·åºŠæ—¶è°ƒäº®ï¼‰
