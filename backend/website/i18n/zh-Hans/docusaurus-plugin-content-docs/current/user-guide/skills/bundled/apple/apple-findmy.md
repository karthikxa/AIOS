---
title: "Findmy â€” é€šè¿‡ FindMy è¿½è¸ª Apple è®¾å¤‡/AirTag"
sidebar_label: "Findmy"
description: "é€šè¿‡ FindMy è¿½è¸ª Apple è®¾å¤‡/AirTag"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Findmy

åœ¨ macOS ä¸Šé€šè¿‡ FindMy.app è¿½è¸ª Apple è®¾å¤‡/AirTagã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/apple/findmy` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | macos |
| æ ‡ç­¾ | `FindMy`, `AirTag`, `location`, `tracking`, `macOS`, `Apple` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Find Myï¼ˆAppleï¼‰

åœ¨ macOS ä¸Šé€šè¿‡ FindMy.app è¿½è¸ª Apple è®¾å¤‡å’Œ AirTagã€‚ç”±äºŽ Apple æœªæä¾› FindMy çš„ CLIï¼Œæ­¤ skill ä½¿ç”¨ AppleScript æ‰“å¼€åº”ç”¨å¹¶é€šè¿‡æˆªå›¾è¯»å–è®¾å¤‡ä½ç½®ã€‚

## å‰ææ¡ä»¶

- **macOS**ï¼Œå·²å®‰è£… Find My åº”ç”¨å¹¶ç™»å½• iCloud
- è®¾å¤‡/AirTag å·²åœ¨ Find My ä¸­æ³¨å†Œ
- ç»ˆç«¯å·²èŽ·å¾—å±å¹•å½•åˆ¶æƒé™ï¼ˆç³»ç»Ÿè®¾ç½® â†’ éšç§ä¸Žå®‰å…¨ â†’ å±å¹•å½•åˆ¶ï¼‰
- **å¯é€‰ä½†æŽ¨è**ï¼šå®‰è£… `peekaboo` ä»¥èŽ·å¾—æ›´å¥½çš„ UI è‡ªåŠ¨åŒ–ä½“éªŒï¼š
  `brew install steipete/tap/peekaboo`

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¯¢é—®"æˆ‘çš„[è®¾å¤‡/çŒ«/é’¥åŒ™/åŒ…]åœ¨å“ªé‡Œï¼Ÿ"
- è¿½è¸ª AirTag ä½ç½®
- æŸ¥çœ‹è®¾å¤‡ä½ç½®ï¼ˆiPhoneã€iPadã€Macã€AirPodsï¼‰
- éšæ—¶é—´ç›‘æŽ§å® ç‰©æˆ–ç‰©å“çš„ç§»åŠ¨è½¨è¿¹ï¼ˆAirTag å·¡é€»è·¯çº¿ï¼‰

## æ–¹æ³•ä¸€ï¼šAppleScript + æˆªå›¾ï¼ˆåŸºç¡€æ–¹å¼ï¼‰

### æ‰“å¼€ FindMy å¹¶å¯¼èˆª

```bash
# æ‰“å¼€ Find My åº”ç”¨
osascript -e 'tell application "FindMy" to activate'

# ç­‰å¾…åŠ è½½
sleep 3

# å¯¹ Find My çª—å£æˆªå›¾
screencapture -w -o /tmp/findmy.png
```

ç„¶åŽä½¿ç”¨ `vision_analyze` è¯»å–æˆªå›¾ï¼š
```
vision_analyze(image_url="/tmp/findmy.png", question="What devices/items are shown and what are their locations?")
```

### åˆ‡æ¢æ ‡ç­¾é¡µ

```bash
# åˆ‡æ¢åˆ°"è®¾å¤‡"æ ‡ç­¾é¡µ
osascript -e '
tell application "System Events"
    tell process "FindMy"
        click button "Devices" of toolbar 1 of window 1
    end tell
end tell'

# åˆ‡æ¢åˆ°"ç‰©å“"æ ‡ç­¾é¡µï¼ˆAirTagï¼‰
osascript -e '
tell application "System Events"
    tell process "FindMy"
        click button "Items" of toolbar 1 of window 1
    end tell
end tell'
```

## æ–¹æ³•äºŒï¼šPeekaboo UI è‡ªåŠ¨åŒ–ï¼ˆæŽ¨èï¼‰

å¦‚æžœå·²å®‰è£… `peekaboo`ï¼Œå¯ä½¿ç”¨å®ƒè¿›è¡Œæ›´å¯é çš„ UI äº¤äº’ï¼š

```bash
# æ‰“å¼€ Find My
osascript -e 'tell application "FindMy" to activate'
sleep 3

# æ•èŽ·å¹¶æ ‡æ³¨ UI
peekaboo see --app "FindMy" --annotate --path /tmp/findmy-ui.png

# é€šè¿‡å…ƒç´  ID ç‚¹å‡»ç‰¹å®šè®¾å¤‡/ç‰©å“
peekaboo click --on B3 --app "FindMy"

# æ•èŽ·è¯¦æƒ…è§†å›¾
peekaboo image --app "FindMy" --path /tmp/findmy-detail.png
```

ç„¶åŽä½¿ç”¨ vision è¿›è¡Œåˆ†æžï¼š
```
vision_analyze(image_url="/tmp/findmy-detail.png", question="What is the location shown for this device/item? Include address and coordinates if visible.")
```

## å·¥ä½œæµï¼šéšæ—¶é—´è¿½è¸ª AirTag ä½ç½®

ç”¨äºŽç›‘æŽ§ AirTagï¼ˆä¾‹å¦‚è¿½è¸ªçŒ«çš„å·¡é€»è·¯çº¿ï¼‰ï¼š

```bash
# 1. æ‰“å¼€ FindMy å¹¶åˆ‡æ¢åˆ°"ç‰©å“"æ ‡ç­¾é¡µ
osascript -e 'tell application "FindMy" to activate'
sleep 3

# 2. ç‚¹å‡» AirTag ç‰©å“ï¼ˆä¿æŒé¡µé¢åœç•™â€”â€”AirTag ä»…åœ¨é¡µé¢å¤„äºŽæ´»è·ƒæ˜¾ç¤ºçŠ¶æ€æ—¶æ‰æ›´æ–°ï¼‰

# 3. å®šæœŸæ•èŽ·ä½ç½®
while true; do
    screencapture -w -o /tmp/findmy-$(date +%H%M%S).png
    sleep 300  # æ¯ 5 åˆ†é’Ÿä¸€æ¬¡
done
```

ä½¿ç”¨ vision åˆ†æžæ¯å¼ æˆªå›¾ä»¥æå–åæ ‡ï¼Œç„¶åŽæ±‡æ€»æˆè·¯çº¿ã€‚

## é™åˆ¶

- FindMy **æ²¡æœ‰ CLI æˆ– API**â€”â€”å¿…é¡»ä½¿ç”¨ UI è‡ªåŠ¨åŒ–
- AirTag ä»…åœ¨ FindMy é¡µé¢å¤„äºŽæ´»è·ƒæ˜¾ç¤ºçŠ¶æ€æ—¶æ‰æ›´æ–°ä½ç½®
- ä½ç½®ç²¾åº¦å–å†³äºŽ FindMy ç½‘ç»œä¸­é™„è¿‘çš„ Apple è®¾å¤‡
- æˆªå›¾éœ€è¦å±å¹•å½•åˆ¶æƒé™
- AppleScript UI è‡ªåŠ¨åŒ–å¯èƒ½åœ¨ä¸åŒ macOS ç‰ˆæœ¬é—´å¤±æ•ˆ

## è§„åˆ™

1. è¿½è¸ª AirTag æ—¶ä¿æŒ FindMy åº”ç”¨åœ¨å‰å°ï¼ˆæœ€å°åŒ–åŽæ›´æ–°å°†åœæ­¢ï¼‰
2. ä½¿ç”¨ `vision_analyze` è¯»å–æˆªå›¾å†…å®¹â€”â€”ä¸è¦å°è¯•ç›´æŽ¥è§£æžåƒç´ 
3. å¦‚éœ€æŒç»­è¿½è¸ªï¼Œä½¿ç”¨ cronjob å®šæœŸæ•èŽ·å¹¶è®°å½•ä½ç½®
4. å°Šé‡éšç§â€”â€”ä»…è¿½è¸ªç”¨æˆ·æœ¬äººæ‹¥æœ‰çš„è®¾å¤‡/ç‰©å“