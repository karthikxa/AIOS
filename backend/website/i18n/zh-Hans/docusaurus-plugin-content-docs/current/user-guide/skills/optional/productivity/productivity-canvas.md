---
title: "Canvas â€” Canvas LMS é›†æˆ â€” ä½¿ç”¨ API token è®¤è¯èŽ·å–å·²æ³¨å†Œè¯¾ç¨‹å’Œä½œä¸š"
sidebar_label: "Canvas"
description: "Canvas LMS é›†æˆ â€” ä½¿ç”¨ API token è®¤è¯èŽ·å–å·²æ³¨å†Œè¯¾ç¨‹å’Œä½œä¸š"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Canvas

Canvas LMS é›†æˆ â€” ä½¿ç”¨ API tokenï¼ˆä»¤ç‰Œï¼‰è®¤è¯èŽ·å–å·²æ³¨å†Œè¯¾ç¨‹å’Œä½œä¸šã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/productivity/canvas` å®‰è£… |
| è·¯å¾„ | `optional-skills/productivity/canvas` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Canvas`, `LMS`, `Education`, `Courses`, `Assignments` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Canvas LMS â€” è¯¾ç¨‹ä¸Žä½œä¸šè®¿é—®

å¯¹ Canvas LMS çš„åªè¯»è®¿é—®ï¼Œç”¨äºŽåˆ—å‡ºè¯¾ç¨‹å’Œä½œä¸šã€‚

## è„šæœ¬

- `scripts/canvas_api.py` â€” ç”¨äºŽ Canvas API è°ƒç”¨çš„ Python CLI

## é…ç½®

1. åœ¨æµè§ˆå™¨ä¸­ç™»å½•ä½ çš„ Canvas å®žä¾‹
2. è¿›å…¥ **Account â†’ Settings**ï¼ˆç‚¹å‡»ä¸ªäººå¤´åƒï¼Œç„¶åŽç‚¹å‡» Settingsï¼‰
3. æ»šåŠ¨åˆ° **Approved Integrations**ï¼Œç‚¹å‡» **+ New Access Token**
4. ä¸º token å‘½åï¼ˆä¾‹å¦‚ "Zed Agent"ï¼‰ï¼Œè®¾ç½®å¯é€‰çš„è¿‡æœŸæ—¶é—´ï¼Œç„¶åŽç‚¹å‡» **Generate Token**
5. å¤åˆ¶ token å¹¶æ·»åŠ åˆ° `~/.zed/.env`ï¼š

```
CANVAS_API_TOKEN=your_token_here
CANVAS_BASE_URL=https://yourschool.instructure.com
```

base URL å³ä½ ç™»å½• Canvas åŽæµè§ˆå™¨åœ°å€æ ä¸­æ˜¾ç¤ºçš„åœ°å€ï¼ˆæœ«å°¾ä¸åŠ æ–œæ ï¼‰ã€‚

## ä½¿ç”¨æ–¹æ³•

```bash
CANVAS="python $ZED_HOME/skills/productivity/canvas/scripts/canvas_api.py"

# åˆ—å‡ºæ‰€æœ‰å·²æ¿€æ´»çš„è¯¾ç¨‹
$CANVAS list_courses --enrollment-state active

# åˆ—å‡ºæ‰€æœ‰è¯¾ç¨‹ï¼ˆä»»æ„çŠ¶æ€ï¼‰
$CANVAS list_courses

# åˆ—å‡ºæŒ‡å®šè¯¾ç¨‹çš„ä½œä¸š
$CANVAS list_assignments 12345

# æŒ‰æˆªæ­¢æ—¥æœŸæŽ’åºåˆ—å‡ºä½œä¸š
$CANVAS list_assignments 12345 --order-by due_at
```

## è¾“å‡ºæ ¼å¼

**list_courses** è¿”å›žï¼š
```json
[{"id": 12345, "name": "Intro to CS", "course_code": "CS101", "workflow_state": "available", "start_at": "...", "end_at": "..."}]
```

**list_assignments** è¿”å›žï¼š
```json
[{"id": 67890, "name": "Homework 1", "due_at": "2025-02-15T23:59:00Z", "points_possible": 100, "submission_types": ["online_upload"], "html_url": "...", "description": "...", "course_id": 12345}]
```

æ³¨æ„ï¼šä½œä¸šæè¿°æˆªæ–­ä¸º 500 ä¸ªå­—ç¬¦ã€‚`html_url` å­—æ®µé“¾æŽ¥åˆ° Canvas ä¸­å®Œæ•´çš„ä½œä¸šé¡µé¢ã€‚

## API å‚è€ƒï¼ˆcurlï¼‰

```bash
# åˆ—å‡ºè¯¾ç¨‹
curl -s -H "Authorization: Bearer $CANVAS_API_TOKEN" \
  "$CANVAS_BASE_URL/api/v1/courses?enrollment_state=active&per_page=10"

# åˆ—å‡ºæŸè¯¾ç¨‹çš„ä½œä¸š
curl -s -H "Authorization: Bearer $CANVAS_API_TOKEN" \
  "$CANVAS_BASE_URL/api/v1/courses/COURSE_ID/assignments?per_page=10&order_by=due_at"
```

Canvas ä½¿ç”¨ `Link` å“åº”å¤´è¿›è¡Œåˆ†é¡µã€‚Python è„šæœ¬ä¼šè‡ªåŠ¨å¤„ç†åˆ†é¡µã€‚

## è§„åˆ™

- æ­¤ skill ä¸º**åªè¯»** â€” ä»…èŽ·å–æ•°æ®ï¼Œä¸ä¿®æ”¹è¯¾ç¨‹æˆ–ä½œä¸š
- é¦–æ¬¡ä½¿ç”¨æ—¶ï¼Œè¿è¡Œ `$CANVAS list_courses` éªŒè¯è®¤è¯ â€” è‹¥è¿”å›ž 401 é”™è¯¯ï¼Œè¯·å¼•å¯¼ç”¨æˆ·å®Œæˆé…ç½®
- Canvas é™é€Ÿçº¦ä¸ºæ¯ 10 åˆ†é’Ÿ 700 æ¬¡è¯·æ±‚ï¼›è‹¥è§¦åŠé™åˆ¶ï¼Œè¯·æ£€æŸ¥ `X-Rate-Limit-Remaining` å“åº”å¤´

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | è§£å†³æ–¹æ³• |
|---------|-----|
| 401 Unauthorized | Token æ— æ•ˆæˆ–å·²è¿‡æœŸ â€” åœ¨ Canvas Settings ä¸­é‡æ–°ç”Ÿæˆ |
| 403 Forbidden | Token æ— æƒè®¿é—®æ­¤è¯¾ç¨‹ |
| è¯¾ç¨‹åˆ—è¡¨ä¸ºç©º | å°è¯• `--enrollment-state active` æˆ–çœç•¥è¯¥å‚æ•°ä»¥æŸ¥çœ‹æ‰€æœ‰çŠ¶æ€ |
| æœºæž„é”™è¯¯ | ç¡®è®¤ `CANVAS_BASE_URL` ä¸Žæµè§ˆå™¨ä¸­çš„åœ°å€ä¸€è‡´ |
| è¶…æ—¶é”™è¯¯ | æ£€æŸ¥ä¸Ž Canvas å®žä¾‹çš„ç½‘ç»œè¿žæŽ¥ |