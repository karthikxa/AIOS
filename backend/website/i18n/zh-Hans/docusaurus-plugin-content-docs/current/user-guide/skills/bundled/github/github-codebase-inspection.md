---
title: "ä»£ç åº“æ£€æŸ¥ â€” ä½¿ç”¨ pygount æ£€æŸ¥ä»£ç åº“ï¼šä»£ç è¡Œæ•°ã€è¯­è¨€ã€å æ¯”"
sidebar_label: "ä»£ç åº“æ£€æŸ¥"
description: "ä½¿ç”¨ pygount æ£€æŸ¥ä»£ç åº“ï¼šä»£ç è¡Œæ•°ã€è¯­è¨€ã€å æ¯”"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# ä»£ç åº“æ£€æŸ¥

ä½¿ç”¨ pygount æ£€æŸ¥ä»£ç åº“ï¼šä»£ç è¡Œæ•°ã€è¯­è¨€ã€å æ¯”ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/github/codebase-inspection` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `LOC`, `Code Analysis`, `pygount`, `Codebase`, `Metrics`, `Repository` |
| ç›¸å…³ skill | [`github-repo-management`](/user-guide/skills/bundled/github/github-github-repo-management) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# ä½¿ç”¨ pygount è¿›è¡Œä»£ç åº“æ£€æŸ¥

ä½¿ç”¨ `pygount` åˆ†æžä»“åº“çš„ä»£ç è¡Œæ•°ã€è¯­è¨€åˆ†å¸ƒã€æ–‡ä»¶æ•°é‡åŠä»£ç ä¸Žæ³¨é‡Šçš„æ¯”ä¾‹ã€‚

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¯·æ±‚ç»Ÿè®¡ LOCï¼ˆlines of codeï¼Œä»£ç è¡Œæ•°ï¼‰
- ç”¨æˆ·éœ€è¦ä»“åº“çš„è¯­è¨€åˆ†å¸ƒæƒ…å†µ
- ç”¨æˆ·è¯¢é—®ä»£ç åº“çš„è§„æ¨¡æˆ–ç»„æˆ
- ç”¨æˆ·éœ€è¦ä»£ç ä¸Žæ³¨é‡Šçš„æ¯”ä¾‹
- ä¸€èˆ¬æ€§çš„"è¿™ä¸ªä»“åº“æœ‰å¤šå¤§"é—®é¢˜

## å‰ç½®æ¡ä»¶

```bash
pip install --break-system-packages pygount 2>/dev/null || pip install pygount
```

## 1. åŸºæœ¬æ‘˜è¦ï¼ˆæœ€å¸¸ç”¨ï¼‰

èŽ·å–åŒ…å«æ–‡ä»¶æ•°é‡ã€ä»£ç è¡Œæ•°å’Œæ³¨é‡Šè¡Œæ•°çš„å®Œæ•´è¯­è¨€åˆ†å¸ƒï¼š

```bash
cd /path/to/repo
pygount --format=summary \
  --folders-to-skip=".git,node_modules,venv,.venv,__pycache__,.cache,dist,build,.next,.tox,.eggs,*.egg-info" \
  .
```

**é‡è¦ï¼š** å§‹ç»ˆä½¿ç”¨ `--folders-to-skip` æŽ’é™¤ä¾èµ–/æž„å»ºç›®å½•ï¼Œå¦åˆ™ pygount ä¼šéåŽ†è¿™äº›ç›®å½•ï¼Œå¯¼è‡´è¿è¡Œæ—¶é—´æžé•¿ç”šè‡³å¡æ­»ã€‚

## 2. å¸¸ç”¨ç›®å½•æŽ’é™¤é¡¹

æ ¹æ®é¡¹ç›®ç±»åž‹è¿›è¡Œè°ƒæ•´ï¼š

```bash
# Python é¡¹ç›®
--folders-to-skip=".git,venv,.venv,__pycache__,.cache,dist,build,.tox,.eggs,.mypy_cache"

# JavaScript/TypeScript é¡¹ç›®
--folders-to-skip=".git,node_modules,dist,build,.next,.cache,.turbo,coverage"

# é€šç”¨å…œåº•
--folders-to-skip=".git,node_modules,venv,.venv,__pycache__,.cache,dist,build,.next,.tox,vendor,third_party"
```

## 3. æŒ‰ç‰¹å®šè¯­è¨€è¿‡æ»¤

```bash
# ä»…ç»Ÿè®¡ Python æ–‡ä»¶
pygount --suffix=py --format=summary .

# ä»…ç»Ÿè®¡ Python å’Œ YAML
pygount --suffix=py,yaml,yml --format=summary .
```

## 4. é€æ–‡ä»¶è¯¦ç»†è¾“å‡º

```bash
# é»˜è®¤æ ¼å¼æ˜¾ç¤ºæ¯ä¸ªæ–‡ä»¶çš„è¯¦ç»†ä¿¡æ¯
pygount --folders-to-skip=".git,node_modules,venv" .

# æŒ‰ä»£ç è¡Œæ•°æŽ’åºï¼ˆé€šè¿‡ç®¡é“ä¼ ç»™ sortï¼‰
pygount --folders-to-skip=".git,node_modules,venv" . | sort -t$'\t' -k1 -nr | head -20
```

## 5. è¾“å‡ºæ ¼å¼

```bash
# æ‘˜è¦è¡¨æ ¼ï¼ˆé»˜è®¤æŽ¨èï¼‰
pygount --format=summary .

# JSON è¾“å‡ºï¼Œé€‚åˆç¨‹åºåŒ–å¤„ç†
pygount --format=json .

# ç®¡é“å‹å¥½ï¼šè¯­è¨€ã€æ–‡ä»¶æ•°ã€ä»£ç è¡Œã€æ–‡æ¡£è¡Œã€ç©ºè¡Œã€å­—ç¬¦ä¸²è¡Œ
pygount --format=summary . 2>/dev/null
```

## 6. ç»“æžœè§£è¯»

æ‘˜è¦è¡¨æ ¼å„åˆ—è¯´æ˜Žï¼š
- **Language** â€” æ£€æµ‹åˆ°çš„ç¼–ç¨‹è¯­è¨€
- **Files** â€” è¯¥è¯­è¨€çš„æ–‡ä»¶æ•°é‡
- **Code** â€” å®žé™…ä»£ç è¡Œæ•°ï¼ˆå¯æ‰§è¡Œ/å£°æ˜Žæ€§è¯­å¥ï¼‰
- **Comment** â€” æ³¨é‡Šæˆ–æ–‡æ¡£è¡Œæ•°
- **%** â€” å æ€»é‡çš„ç™¾åˆ†æ¯”

ç‰¹æ®Šä¼ªè¯­è¨€ï¼š
- `__empty__` â€” ç©ºæ–‡ä»¶
- `__binary__` â€” äºŒè¿›åˆ¶æ–‡ä»¶ï¼ˆå›¾ç‰‡ã€ç¼–è¯‘äº§ç‰©ç­‰ï¼‰
- `__generated__` â€” è‡ªåŠ¨ç”Ÿæˆçš„æ–‡ä»¶ï¼ˆå¯å‘å¼æ£€æµ‹ï¼‰
- `__duplicate__` â€” å†…å®¹å®Œå…¨ç›¸åŒçš„æ–‡ä»¶
- `__unknown__` â€” æ— æ³•è¯†åˆ«çš„æ–‡ä»¶ç±»åž‹

## æ³¨æ„äº‹é¡¹

1. **å§‹ç»ˆæŽ’é™¤ .gitã€node_modulesã€venv** â€” ä¸ä½¿ç”¨ `--folders-to-skip` æ—¶ï¼Œpygount ä¼šéåŽ†æ‰€æœ‰å†…å®¹ï¼Œåœ¨å¤§åž‹ä¾èµ–æ ‘ä¸Šå¯èƒ½è€—æ—¶æ•°åˆ†é’Ÿç”šè‡³å¡æ­»ã€‚
2. **Markdown æ˜¾ç¤º 0 ä»£ç è¡Œ** â€” pygount å°†æ‰€æœ‰ Markdown å†…å®¹å½’ç±»ä¸ºæ³¨é‡Šè€Œéžä»£ç ï¼Œè¿™æ˜¯é¢„æœŸè¡Œä¸ºã€‚
3. **JSON æ–‡ä»¶ä»£ç è¡Œæ•°åä½Ž** â€” pygount ç»Ÿè®¡ JSON è¡Œæ•°æ—¶å¯èƒ½è¾ƒä¸ºä¿å®ˆï¼Œå¦‚éœ€ç²¾ç¡®ç»Ÿè®¡ JSON è¡Œæ•°ï¼Œè¯·ç›´æŽ¥ä½¿ç”¨ `wc -l`ã€‚
4. **å¤§åž‹ monorepo** â€” å¯¹äºŽéžå¸¸å¤§çš„ä»“åº“ï¼Œå»ºè®®ä½¿ç”¨ `--suffix` æŒ‡å®šç›®æ ‡è¯­è¨€ï¼Œè€Œéžæ‰«æå…¨éƒ¨å†…å®¹ã€‚
