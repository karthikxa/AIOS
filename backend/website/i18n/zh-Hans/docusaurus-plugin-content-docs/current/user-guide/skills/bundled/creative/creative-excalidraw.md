---
title: "Excalidraw â€” æ‰‹ç»˜é£Žæ ¼ Excalidraw JSON å›¾è¡¨ï¼ˆæž¶æž„å›¾ã€æµç¨‹å›¾ã€æ—¶åºå›¾ï¼‰"
sidebar_label: "Excalidraw"
description: "æ‰‹ç»˜é£Žæ ¼ Excalidraw JSON å›¾è¡¨ï¼ˆæž¶æž„å›¾ã€æµç¨‹å›¾ã€æ—¶åºå›¾ï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Excalidraw

æ‰‹ç»˜é£Žæ ¼ Excalidraw JSON å›¾è¡¨ï¼ˆæž¶æž„å›¾ã€æµç¨‹å›¾ã€æ—¶åºå›¾ï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/creative/excalidraw` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Excalidraw`, `Diagrams`, `Flowcharts`, `Architecture`, `Visualization`, `JSON` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Excalidraw å›¾è¡¨ Skill

é€šè¿‡ç¼–å†™æ ‡å‡† Excalidraw å…ƒç´  JSON å¹¶ä¿å­˜ä¸º `.excalidraw` æ–‡ä»¶æ¥åˆ›å»ºå›¾è¡¨ã€‚è¿™äº›æ–‡ä»¶å¯ä»¥ç›´æŽ¥æ‹–æ”¾åˆ° [excalidraw.com](https://excalidraw.com) è¿›è¡ŒæŸ¥çœ‹å’Œç¼–è¾‘ã€‚æ— éœ€è´¦å·ã€æ— éœ€ API å¯†é’¥ã€æ— éœ€æ¸²æŸ“åº“â€”â€”åªéœ€ JSONã€‚

## ä½¿ç”¨åœºæ™¯

ç”Ÿæˆ `.excalidraw` æ–‡ä»¶ï¼Œç”¨äºŽæž¶æž„å›¾ã€æµç¨‹å›¾ã€æ—¶åºå›¾ã€æ¦‚å¿µå›¾ç­‰ã€‚æ–‡ä»¶å¯åœ¨ excalidraw.com æ‰“å¼€ï¼Œæˆ–ä¸Šä¼ ä»¥èŽ·å–å¯åˆ†äº«é“¾æŽ¥ã€‚

## å·¥ä½œæµç¨‹

1. **åŠ è½½æ­¤ skill**ï¼ˆå·²å®Œæˆï¼‰
2. **ç¼–å†™å…ƒç´  JSON**â€”â€”ä¸€ä¸ª Excalidraw å…ƒç´ å¯¹è±¡æ•°ç»„
3. **ä¿å­˜æ–‡ä»¶**â€”â€”ä½¿ç”¨ `write_file` åˆ›å»º `.excalidraw` æ–‡ä»¶
4. **å¯é€‰ä¸Šä¼ **â€”â€”é€šè¿‡ `terminal` è¿è¡Œ `scripts/upload.py` èŽ·å–å¯åˆ†äº«é“¾æŽ¥

### ä¿å­˜å›¾è¡¨

å°†å…ƒç´ æ•°ç»„åŒ…è£¹åœ¨æ ‡å‡† `.excalidraw` ä¿¡å°ä¸­ï¼Œå¹¶ä½¿ç”¨ `write_file` ä¿å­˜ï¼š

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "zed-agent",
  "elements": [ ...your elements array here... ],
  "appState": {
    "viewBackgroundColor": "#ffffff"
  }
}
```

ä¿å­˜åˆ°ä»»æ„è·¯å¾„ï¼Œä¾‹å¦‚ `~/diagrams/my_diagram.excalidraw`ã€‚

### ä¸Šä¼ ä»¥èŽ·å–å¯åˆ†äº«é“¾æŽ¥

é€šè¿‡ç»ˆç«¯è¿è¡Œä½äºŽæ­¤ skill çš„ `scripts/` ç›®å½•ä¸­çš„ä¸Šä¼ è„šæœ¬ï¼š

```bash
python skills/diagramming/excalidraw/scripts/upload.py ~/diagrams/my_diagram.excalidraw
```

æ­¤è„šæœ¬å°†ä¸Šä¼ åˆ° excalidraw.comï¼ˆæ— éœ€è´¦å·ï¼‰å¹¶æ‰“å°å¯åˆ†äº«çš„ URLã€‚éœ€è¦å®‰è£… `cryptography` pip åŒ…ï¼ˆ`pip install cryptography`ï¼‰ã€‚

---

## å…ƒç´ æ ¼å¼å‚è€ƒ

### å¿…å¡«å­—æ®µï¼ˆæ‰€æœ‰å…ƒç´ ï¼‰
`type`ã€`id`ï¼ˆå”¯ä¸€å­—ç¬¦ä¸²ï¼‰ã€`x`ã€`y`ã€`width`ã€`height`

### é»˜è®¤å€¼ï¼ˆå¯çœç•¥â€”â€”ä¼šè‡ªåŠ¨åº”ç”¨ï¼‰
- `strokeColor`: `"#1e1e1e"`
- `backgroundColor`: `"transparent"`
- `fillStyle`: `"solid"`
- `strokeWidth`: `2`
- `roughness`: `1`ï¼ˆæ‰‹ç»˜é£Žæ ¼ï¼‰
- `opacity`: `100`

ç”»å¸ƒèƒŒæ™¯ä¸ºç™½è‰²ã€‚

### å…ƒç´ ç±»åž‹

**çŸ©å½¢ï¼ˆRectangleï¼‰**ï¼š
```json
{ "type": "rectangle", "id": "r1", "x": 100, "y": 100, "width": 200, "height": 100 }
```
- `roundness: { "type": 3 }` è¡¨ç¤ºåœ†è§’
- `backgroundColor: "#a5d8ff"`, `fillStyle: "solid"` è¡¨ç¤ºå¡«å……è‰²

**æ¤­åœ†ï¼ˆEllipseï¼‰**ï¼š
```json
{ "type": "ellipse", "id": "e1", "x": 100, "y": 100, "width": 150, "height": 150 }
```

**è±å½¢ï¼ˆDiamondï¼‰**ï¼š
```json
{ "type": "diamond", "id": "d1", "x": 100, "y": 100, "width": 150, "height": 150 }
```

**å¸¦æ ‡ç­¾çš„å½¢çŠ¶ï¼ˆå®¹å™¨ç»‘å®šï¼‰**â€”â€”åˆ›å»ºä¸€ä¸ªç»‘å®šåˆ°å½¢çŠ¶çš„æ–‡æœ¬å…ƒç´ ï¼š

> **è­¦å‘Šï¼š** ä¸è¦åœ¨å½¢çŠ¶ä¸Šä½¿ç”¨ `"label": { "text": "..." }`ã€‚è¿™ä¸æ˜¯æœ‰æ•ˆçš„ Excalidraw å±žæ€§ï¼Œä¼šè¢«é™é»˜å¿½ç•¥ï¼Œå¯¼è‡´å½¢çŠ¶æ˜¾ç¤ºä¸ºç©ºç™½ã€‚å¿…é¡»ä½¿ç”¨ä¸‹æ–¹çš„å®¹å™¨ç»‘å®šæ–¹å¼ã€‚

å½¢çŠ¶éœ€è¦åœ¨ `boundElements` ä¸­åˆ—å‡ºæ–‡æœ¬ï¼Œæ–‡æœ¬éœ€è¦é€šè¿‡ `containerId` åå‘æŒ‡å‘å½¢çŠ¶ï¼š
```json
{ "type": "rectangle", "id": "r1", "x": 100, "y": 100, "width": 200, "height": 80,
  "roundness": { "type": 3 }, "backgroundColor": "#a5d8ff", "fillStyle": "solid",
  "boundElements": [{ "id": "t_r1", "type": "text" }] },
{ "type": "text", "id": "t_r1", "x": 105, "y": 110, "width": 190, "height": 25,
  "text": "Hello", "fontSize": 20, "fontFamily": 1, "strokeColor": "#1e1e1e",
  "textAlign": "center", "verticalAlign": "middle",
  "containerId": "r1", "originalText": "Hello", "autoResize": true }
```
- é€‚ç”¨äºŽçŸ©å½¢ã€æ¤­åœ†ã€è±å½¢
- è®¾ç½® `containerId` åŽï¼ŒExcalidraw ä¼šè‡ªåŠ¨å°†æ–‡æœ¬å±…ä¸­
- æ–‡æœ¬çš„ `x`/`y`/`width`/`height` ä¸ºè¿‘ä¼¼å€¼â€”â€”Excalidraw åŠ è½½æ—¶ä¼šé‡æ–°è®¡ç®—
- `originalText` åº”ä¸Ž `text` ä¿æŒä¸€è‡´
- å§‹ç»ˆåŒ…å« `fontFamily: 1`ï¼ˆVirgil æ‰‹ç»˜å­—ä½“ï¼‰

**å¸¦æ ‡ç­¾çš„ç®­å¤´**â€”â€”åŒæ ·ä½¿ç”¨å®¹å™¨ç»‘å®šæ–¹å¼ï¼š
```json
{ "type": "arrow", "id": "a1", "x": 300, "y": 150, "width": 200, "height": 0,
  "points": [[0,0],[200,0]], "endArrowhead": "arrow",
  "boundElements": [{ "id": "t_a1", "type": "text" }] },
{ "type": "text", "id": "t_a1", "x": 370, "y": 130, "width": 60, "height": 20,
  "text": "connects", "fontSize": 16, "fontFamily": 1, "strokeColor": "#1e1e1e",
  "textAlign": "center", "verticalAlign": "middle",
  "containerId": "a1", "originalText": "connects", "autoResize": true }
```

**ç‹¬ç«‹æ–‡æœ¬**ï¼ˆä»…ç”¨äºŽæ ‡é¢˜å’Œæ³¨é‡Šâ€”â€”æ— å®¹å™¨ï¼‰ï¼š
```json
{ "type": "text", "id": "t1", "x": 150, "y": 138, "text": "Hello", "fontSize": 20,
  "fontFamily": 1, "strokeColor": "#1e1e1e", "originalText": "Hello", "autoResize": true }
```
- `x` ä¸ºå·¦è¾¹ç¼˜ã€‚è‹¥è¦åœ¨ä½ç½® `cx` å¤„å±…ä¸­ï¼š`x = cx - (text.length * fontSize * 0.5) / 2`
- ä¸è¦ä¾èµ– `textAlign` æˆ– `width` æ¥å®šä½

**ç®­å¤´ï¼ˆArrowï¼‰**ï¼š
```json
{ "type": "arrow", "id": "a1", "x": 300, "y": 150, "width": 200, "height": 0,
  "points": [[0,0],[200,0]], "endArrowhead": "arrow" }
```
- `points`ï¼šç›¸å¯¹äºŽå…ƒç´  `x`ã€`y` çš„ `[dx, dy]` åç§»é‡
- `endArrowhead`ï¼š`null` | `"arrow"` | `"bar"` | `"dot"` | `"triangle"`
- `strokeStyle`ï¼š`"solid"`ï¼ˆé»˜è®¤ï¼‰| `"dashed"` | `"dotted"`

### ç®­å¤´ç»‘å®šï¼ˆå°†ç®­å¤´è¿žæŽ¥åˆ°å½¢çŠ¶ï¼‰

```json
{
  "type": "arrow", "id": "a1", "x": 300, "y": 150, "width": 150, "height": 0,
  "points": [[0,0],[150,0]], "endArrowhead": "arrow",
  "startBinding": { "elementId": "r1", "fixedPoint": [1, 0.5] },
  "endBinding": { "elementId": "r2", "fixedPoint": [0, 0.5] }
}
```

`fixedPoint` åæ ‡ï¼š`top=[0.5,0]`ã€`bottom=[0.5,1]`ã€`left=[0,0.5]`ã€`right=[1,0.5]`

### ç»˜åˆ¶é¡ºåºï¼ˆz è½´é¡ºåºï¼‰
- æ•°ç»„é¡ºåº = z è½´é¡ºåºï¼ˆç¬¬ä¸€ä¸ª = æœ€åº•å±‚ï¼Œæœ€åŽä¸€ä¸ª = æœ€é¡¶å±‚ï¼‰
- æŒ‰é¡ºåºé€æ­¥è¾“å‡ºï¼šèƒŒæ™¯åŒºåŸŸ â†’ å½¢çŠ¶ â†’ å…¶ç»‘å®šæ–‡æœ¬ â†’ å…¶ç®­å¤´ â†’ ä¸‹ä¸€ä¸ªå½¢çŠ¶
- é”™è¯¯åšæ³•ï¼šæ‰€æœ‰çŸ©å½¢ï¼Œç„¶åŽæ‰€æœ‰æ–‡æœ¬ï¼Œç„¶åŽæ‰€æœ‰ç®­å¤´
- æ­£ç¡®åšæ³•ï¼šbg_zone â†’ shape1 â†’ text_for_shape1 â†’ arrow1 â†’ arrow_label_text â†’ shape2 â†’ text_for_shape2 â†’ ...
- å§‹ç»ˆå°†ç»‘å®šæ–‡æœ¬å…ƒç´ ç´§æŽ¥åœ¨å…¶å®¹å™¨å½¢çŠ¶ä¹‹åŽ

### å°ºå¯¸è§„èŒƒ

**å­—ä½“å¤§å°ï¼š**
- æ­£æ–‡æ–‡æœ¬ã€æ ‡ç­¾ã€æè¿°çš„æœ€å° `fontSize`ï¼š**16**
- æ ‡é¢˜å’Œå¤§æ ‡é¢˜çš„æœ€å° `fontSize`ï¼š**20**
- æ¬¡è¦æ³¨é‡Šçš„æœ€å° `fontSize`ï¼š**14**ï¼ˆè°¨æ…Žä½¿ç”¨ï¼‰
- ç»ä¸ä½¿ç”¨ä½ŽäºŽ 14 çš„ `fontSize`

**å…ƒç´ å°ºå¯¸ï¼š**
- å¸¦æ ‡ç­¾çš„çŸ©å½¢/æ¤­åœ†æœ€å°å°ºå¯¸ï¼š120x60
- å…ƒç´ ä¹‹é—´è‡³å°‘ç•™ 20-30px é—´è·
- ä¼˜å…ˆä½¿ç”¨æ•°é‡å°‘ã€å°ºå¯¸å¤§çš„å…ƒç´ ï¼Œè€Œéžå¤§é‡ç»†å°å…ƒç´ 

### é¢œè‰²è°ƒè‰²æ¿

å®Œæ•´é¢œè‰²è¡¨è§ `references/colors.md`ã€‚å¿«é€Ÿå‚è€ƒï¼š

| ç”¨é€” | å¡«å……è‰² | åå…­è¿›åˆ¶ |
|-----|-----------|-----|
| ä¸»è¦ / è¾“å…¥ | æµ…è“è‰² | `#a5d8ff` |
| æˆåŠŸ / è¾“å‡º | æµ…ç»¿è‰² | `#b2f2bb` |
| è­¦å‘Š / å¤–éƒ¨ | æµ…æ©™è‰² | `#ffd8a8` |
| å¤„ç† / ç‰¹æ®Š | æµ…ç´«è‰² | `#d0bfff` |
| é”™è¯¯ / å…³é”® | æµ…çº¢è‰² | `#ffc9c9` |
| å¤‡æ³¨ / å†³ç­– | æµ…é»„è‰² | `#fff3bf` |
| å­˜å‚¨ / æ•°æ® | æµ…é’è‰² | `#c3fae8` |

### ä½¿ç”¨æŠ€å·§
- åœ¨æ•´ä¸ªå›¾è¡¨ä¸­ä¿æŒä¸€è‡´çš„é¢œè‰²è°ƒè‰²æ¿
- **æ–‡æœ¬å¯¹æ¯”åº¦è‡³å…³é‡è¦**â€”â€”ä¸è¦åœ¨ç™½è‰²èƒŒæ™¯ä¸Šä½¿ç”¨æµ…ç°è‰²ã€‚ç™½è‰²èƒŒæ™¯ä¸Šæ–‡æœ¬é¢œè‰²æœ€ä½Žå€¼ï¼š`#757575`
- ä¸è¦åœ¨æ–‡æœ¬ä¸­ä½¿ç”¨ emojiâ€”â€”Excalidraw çš„å­—ä½“æ— æ³•æ¸²æŸ“
- æ·±è‰²æ¨¡å¼å›¾è¡¨ï¼Œè§ `references/dark-mode.md`
- æ›´å¤šç¤ºä¾‹ï¼Œè§ `references/examples.md`