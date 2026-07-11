---
title: "Openclaw Migration â€” å°†ç”¨æˆ·çš„ OpenClaw è‡ªå®šä¹‰é…ç½®è¿ç§»åˆ° Zed Agent"
sidebar_label: "Openclaw Migration"
description: "å°†ç”¨æˆ·çš„ OpenClaw è‡ªå®šä¹‰é…ç½®è¿ç§»åˆ° Zed Agent"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Openclaw Migration

å°†ç”¨æˆ·çš„ OpenClaw è‡ªå®šä¹‰é…ç½®è¿ç§»åˆ° Zed Agentã€‚ä»Ž `~/.openclaw` å¯¼å…¥ Zed å…¼å®¹çš„è®°å¿†ã€`SOUL.md`ã€å‘½ä»¤ç™½åå•ã€ç”¨æˆ·æŠ€èƒ½åŠæ‰€é€‰å·¥ä½œåŒºèµ„äº§ï¼Œå¹¶ç²¾ç¡®æŠ¥å‘Šæ— æ³•è¿ç§»çš„å†…å®¹åŠåŽŸå› ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/migration/openclaw-migration` å®‰è£… |
| è·¯å¾„ | `optional-skills/migration/openclaw-migration` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent (Zed Team) |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Migration`, `OpenClaw`, `Zed`, `Memory`, `Persona`, `Import` |
| ç›¸å…³ skill | [`zed-agent`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-zed-agent) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# OpenClaw -> Zed è¿ç§»

å½“ç”¨æˆ·å¸Œæœ›ä»¥æœ€å°‘çš„æ‰‹åŠ¨æ¸…ç†å°†å…¶ OpenClaw é…ç½®è¿ç§»åˆ° Zed Agent æ—¶ï¼Œä½¿ç”¨æ­¤ skillã€‚

## CLI å‘½ä»¤

å¦‚éœ€å¿«é€Ÿã€éžäº¤äº’å¼è¿ç§»ï¼Œä½¿ç”¨å†…ç½® CLI å‘½ä»¤ï¼š

```bash
zed claw migrate              # Full interactive migration
zed claw migrate --dry-run    # Preview what would be migrated
zed claw migrate --preset user-data   # Migrate without secrets
zed claw migrate --overwrite  # Overwrite existing conflicts
zed claw migrate --source /custom/path/.openclaw  # Custom source
```

CLI å‘½ä»¤è¿è¡Œä¸Žä¸‹æ–‡æ‰€è¿°ç›¸åŒçš„è¿ç§»è„šæœ¬ã€‚å½“éœ€è¦äº¤äº’å¼ã€å¼•å¯¼å¼è¿ç§»å¹¶æ”¯æŒ dry-runï¼ˆé¢„è§ˆï¼‰å’Œé€é¡¹å†²çªè§£å†³æ—¶ï¼Œè¯·é€šè¿‡ agent ä½¿ç”¨æ­¤ skillã€‚

**é¦–æ¬¡è®¾ç½®ï¼š** `zed setup` å‘å¯¼ä¼šè‡ªåŠ¨æ£€æµ‹ `~/.openclaw`ï¼Œå¹¶åœ¨é…ç½®å¼€å§‹å‰æä¾›è¿ç§»é€‰é¡¹ã€‚

## æ­¤ skill çš„åŠŸèƒ½

å®ƒä½¿ç”¨ `scripts/openclaw_to_zed.py` æ¥ï¼š

- å°† `SOUL.md` å¯¼å…¥ Zed ä¸»ç›®å½•ï¼Œä¿å­˜ä¸º `SOUL.md`
- å°† OpenClaw çš„ `MEMORY.md` å’Œ `USER.md` è½¬æ¢ä¸º Zed è®°å¿†æ¡ç›®
- å°† OpenClaw å‘½ä»¤å®¡æ‰¹æ¨¡å¼åˆå¹¶åˆ° Zed `command_allowlist`
- è¿ç§» Zed å…¼å®¹çš„æ¶ˆæ¯è®¾ç½®ï¼Œä¾‹å¦‚ `TELEGRAM_ALLOWED_USERS` å’Œ `MESSAGING_CWD`
- å°† OpenClaw skill å¤åˆ¶åˆ° `~/.zed/skills/openclaw-imports/`
- å¯é€‰åœ°å°† OpenClaw å·¥ä½œåŒºæŒ‡ä»¤æ–‡ä»¶å¤åˆ¶åˆ°æ‰€é€‰ Zed å·¥ä½œåŒº
- å°†å…¼å®¹çš„å·¥ä½œåŒºèµ„äº§ï¼ˆå¦‚ `workspace/tts/`ï¼‰é•œåƒåˆ° `~/.zed/tts/`
- å½’æ¡£æ²¡æœ‰ç›´æŽ¥ Zed ç›®æ ‡çš„éžæœºå¯†æ–‡æ¡£
- ç”Ÿæˆç»“æž„åŒ–æŠ¥å‘Šï¼Œåˆ—å‡ºå·²è¿ç§»é¡¹ã€å†²çªé¡¹ã€è·³è¿‡é¡¹åŠåŽŸå› 

## è·¯å¾„è§£æž

è¾…åŠ©è„šæœ¬ä½äºŽæ­¤ skill ç›®å½•ä¸‹ï¼š

- `scripts/openclaw_to_zed.py`

ä»Ž Skills Hub å®‰è£…æ­¤ skill åŽï¼Œé€šå¸¸ä½äºŽï¼š

- `~/.zed/skills/migration/openclaw-migration/scripts/openclaw_to_zed.py`

è¯·å‹¿çŒœæµ‹æ›´çŸ­çš„è·¯å¾„ï¼Œå¦‚ `~/.zed/skills/openclaw-migration/...`ã€‚

è¿è¡Œè¾…åŠ©è„šæœ¬å‰ï¼š

1. ä¼˜å…ˆä½¿ç”¨ `~/.zed/skills/migration/openclaw-migration/` ä¸‹çš„å·²å®‰è£…è·¯å¾„ã€‚
2. å¦‚æžœè¯¥è·¯å¾„å¤±è´¥ï¼Œæ£€æŸ¥å·²å®‰è£…çš„ skill ç›®å½•ï¼Œå¹¶ç›¸å¯¹äºŽå·²å®‰è£…çš„ `SKILL.md` è§£æžè„šæœ¬è·¯å¾„ã€‚
3. ä»…åœ¨å·²å®‰è£…ä½ç½®ç¼ºå¤±æˆ– skill è¢«æ‰‹åŠ¨ç§»åŠ¨æ—¶ï¼Œæ‰ä½¿ç”¨ `find` ä½œä¸ºå¤‡ç”¨æ–¹æ¡ˆã€‚
4. è°ƒç”¨ç»ˆç«¯å·¥å…·æ—¶ï¼Œä¸è¦ä¼ å…¥ `workdir: "~"`ã€‚è¯·ä½¿ç”¨ç»å¯¹ç›®å½•ï¼ˆå¦‚ç”¨æˆ·ä¸»ç›®å½•ï¼‰ï¼Œæˆ–å®Œå…¨çœç•¥ `workdir`ã€‚

ä½¿ç”¨ `--migrate-secrets` æ—¶ï¼Œè¿˜å°†å¯¼å…¥ä¸€å°ç»„ Zed å…¼å®¹çš„ç™½åå• secretï¼Œç›®å‰åŒ…æ‹¬ï¼š

- `TELEGRAM_BOT_TOKEN`

## é»˜è®¤å·¥ä½œæµ

1. é¦–å…ˆé€šè¿‡ dry run è¿›è¡Œæ£€æŸ¥ã€‚
2. å‘ˆçŽ°ç®€æ´æ‘˜è¦ï¼Œè¯´æ˜Žå“ªäº›å†…å®¹å¯ä»¥è¿ç§»ã€å“ªäº›ä¸èƒ½è¿ç§»ã€å“ªäº›å°†è¢«å½’æ¡£ã€‚
3. å¦‚æžœ `clarify` å·¥å…·å¯ç”¨ï¼Œä½¿ç”¨å®ƒå¤„ç†ç”¨æˆ·å†³ç­–ï¼Œè€Œéžè¦æ±‚è‡ªç”±æ ¼å¼çš„æ–‡å­—å›žå¤ã€‚
4. å¦‚æžœ dry run å‘çŽ°å·²å¯¼å…¥ skill ç›®å½•å­˜åœ¨å†²çªï¼Œåœ¨æ‰§è¡Œå‰è¯¢é—®å¤„ç†æ–¹å¼ã€‚
5. åœ¨æ‰§è¡Œå‰ï¼Œè¯·ç”¨æˆ·åœ¨ä¸¤ç§æ”¯æŒçš„è¿ç§»æ¨¡å¼ä¸­é€‰æ‹©ä¸€ç§ã€‚
6. ä»…åœ¨ç”¨æˆ·å¸Œæœ›è¿ç§»å·¥ä½œåŒºæŒ‡ä»¤æ–‡ä»¶æ—¶ï¼Œæ‰è¯¢é—®ç›®æ ‡å·¥ä½œåŒºè·¯å¾„ã€‚
7. ä½¿ç”¨åŒ¹é…çš„ preset å’Œæ ‡å¿—æ‰§è¡Œè¿ç§»ã€‚
8. æ±‡æ€»ç»“æžœï¼Œé‡ç‚¹è¯´æ˜Žï¼š
   - å·²è¿ç§»çš„å†…å®¹
   - å·²å½’æ¡£å¾…æ‰‹åŠ¨å®¡æŸ¥çš„å†…å®¹
   - å·²è·³è¿‡çš„å†…å®¹åŠåŽŸå› 

## ç”¨æˆ·äº¤äº’åè®®

Zed CLI æ”¯æŒ `clarify` å·¥å…·è¿›è¡Œäº¤äº’å¼æç¤ºï¼Œä½†æœ‰ä»¥ä¸‹é™åˆ¶ï¼š

- æ¯æ¬¡åªèƒ½å¤„ç†ä¸€ä¸ªé€‰æ‹©
- æœ€å¤š 4 ä¸ªé¢„å®šä¹‰é€‰é¡¹
- è‡ªåŠ¨æä¾› `Other` è‡ªç”±æ–‡æœ¬é€‰é¡¹

å®ƒ**ä¸**æ”¯æŒåœ¨å•ä¸ªæç¤ºä¸­è¿›è¡ŒçœŸæ­£çš„å¤šé€‰å¤é€‰æ¡†æ“ä½œã€‚

æ¯æ¬¡ `clarify` è°ƒç”¨ï¼š

- å¿…é¡»åŒ…å«éžç©ºçš„ `question`
- ä»…å¯¹çœŸå®žå¯é€‰æç¤ºåŒ…å« `choices`
- `choices` é™åˆ¶ä¸º 2-4 ä¸ªçº¯å­—ç¬¦ä¸²é€‰é¡¹
- ä¸å¾—è¾“å‡ºå ä½ç¬¦æˆ–æˆªæ–­é€‰é¡¹ï¼Œå¦‚ `...`
- ä¸å¾—åœ¨é€‰é¡¹ä¸­å¡«å……æˆ–æ·»åŠ é¢å¤–ç©ºç™½
- ä¸å¾—åœ¨é—®é¢˜ä¸­åŒ…å«è™šå‡è¡¨å•å­—æ®µï¼Œå¦‚ `åœ¨æ­¤è¾“å…¥ç›®å½•`ã€ç©ºç™½è¡Œæˆ–ä¸‹åˆ’çº¿ `_____`
- å¯¹äºŽå¼€æ”¾å¼è·¯å¾„é—®é¢˜ï¼Œåªè¯¢é—®çº¯æ–‡æœ¬å¥å­ï¼›ç”¨æˆ·åœ¨é¢æ¿ä¸‹æ–¹çš„æ™®é€š CLI æç¤ºç¬¦ä¸­è¾“å…¥

å¦‚æžœ `clarify` è°ƒç”¨è¿”å›žé”™è¯¯ï¼Œæ£€æŸ¥é”™è¯¯æ–‡æœ¬ï¼Œä¿®æ­£ payloadï¼Œå¹¶ä½¿ç”¨æœ‰æ•ˆçš„ `question` å’Œå¹²å‡€çš„ choices é‡è¯•ä¸€æ¬¡ã€‚

å½“ `clarify` å¯ç”¨ä¸” dry run æ­ç¤ºä»»ä½•éœ€è¦ç”¨æˆ·å†³ç­–çš„æƒ…å†µæ—¶ï¼Œ**ä¸‹ä¸€ä¸ªåŠ¨ä½œå¿…é¡»æ˜¯ `clarify` å·¥å…·è°ƒç”¨**ã€‚
ä¸å¾—ä»¥å¦‚ä¸‹æ™®é€šåŠ©æ‰‹æ¶ˆæ¯ç»“æŸå¯¹è¯ï¼š

- "è®©æˆ‘æ¥å‘ˆçŽ°é€‰é¡¹"
- "æ‚¨å¸Œæœ›æ€Žä¹ˆåšï¼Ÿ"
- "ä»¥ä¸‹æ˜¯é€‰é¡¹"

å¦‚æžœéœ€è¦ç”¨æˆ·å†³ç­–ï¼Œåœ¨ç”Ÿæˆæ›´å¤šæ–‡å­—ä¹‹å‰é€šè¿‡ `clarify` æ”¶é›†ã€‚
å¦‚æžœå­˜åœ¨å¤šä¸ªæœªè§£å†³çš„å†³ç­–ï¼Œä¸è¦åœ¨å®ƒä»¬ä¹‹é—´æ’å…¥è§£é‡Šæ€§åŠ©æ‰‹æ¶ˆæ¯ã€‚æ”¶åˆ°ä¸€ä¸ª `clarify` å“åº”åŽï¼Œä¸‹ä¸€ä¸ªåŠ¨ä½œé€šå¸¸åº”æ˜¯ä¸‹ä¸€ä¸ªå¿…è¦çš„ `clarify` è°ƒç”¨ã€‚

å½“ dry run æŠ¥å‘Šä»¥ä¸‹æƒ…å†µæ—¶ï¼Œå°† `workspace-agents` è§†ä¸ºæœªè§£å†³çš„å†³ç­–ï¼š

- `kind="workspace-agents"`
- `status="skipped"`
- åŽŸå› åŒ…å« `No workspace target was provided`

åœ¨è¿™ç§æƒ…å†µä¸‹ï¼Œå¿…é¡»åœ¨æ‰§è¡Œå‰è¯¢é—®å·¥ä½œåŒºæŒ‡ä»¤é—®é¢˜ã€‚ä¸å¾—é™é»˜åœ°å°†å…¶è§†ä¸ºè·³è¿‡çš„å†³ç­–ã€‚

ç”±äºŽä¸Šè¿°é™åˆ¶ï¼Œä½¿ç”¨ä»¥ä¸‹ç®€åŒ–å†³ç­–æµç¨‹ï¼š

1. å¯¹äºŽ `SOUL.md` å†²çªï¼Œä½¿ç”¨ `clarify`ï¼Œé€‰é¡¹å¦‚ï¼š
   - `keep existing`
   - `overwrite with backup`
   - `review first`
2. å¦‚æžœ dry run æ˜¾ç¤ºä¸€ä¸ªæˆ–å¤šä¸ª `kind="skill"` é¡¹çš„ `status="conflict"`ï¼Œä½¿ç”¨ `clarify`ï¼Œé€‰é¡¹å¦‚ï¼š
   - `keep existing skills`
   - `overwrite conflicting skills with backup`
   - `import conflicting skills under renamed folders`
3. å¯¹äºŽå·¥ä½œåŒºæŒ‡ä»¤ï¼Œä½¿ç”¨ `clarify`ï¼Œé€‰é¡¹å¦‚ï¼š
   - `skip workspace instructions`
   - `copy to a workspace path`
   - `decide later`
4. å¦‚æžœç”¨æˆ·é€‰æ‹©å¤åˆ¶å·¥ä½œåŒºæŒ‡ä»¤ï¼Œè¿½åŠ ä¸€ä¸ªå¼€æ”¾å¼ `clarify` é—®é¢˜ï¼Œè¦æ±‚æä¾›**ç»å¯¹è·¯å¾„**ã€‚
5. å¦‚æžœç”¨æˆ·é€‰æ‹© `skip workspace instructions` æˆ– `decide later`ï¼Œç»§ç»­æ‰§è¡Œè€Œä¸æ·»åŠ  `--workspace-target`ã€‚
5. å¯¹äºŽè¿ç§»æ¨¡å¼ï¼Œä½¿ç”¨ `clarify`ï¼Œæä¾›ä»¥ä¸‹ 3 ä¸ªé€‰é¡¹ï¼š
   - `user-data only`
   - `full compatible migration`
   - `cancel`
6. `user-data only` è¡¨ç¤ºï¼šè¿ç§»ç”¨æˆ·æ•°æ®å’Œå…¼å®¹é…ç½®ï¼Œä½†**ä¸**å¯¼å…¥ç™½åå• secretã€‚
7. `full compatible migration` è¡¨ç¤ºï¼šè¿ç§»ç›¸åŒçš„å…¼å®¹ç”¨æˆ·æ•°æ®ï¼Œå¹¶åœ¨å­˜åœ¨æ—¶å¯¼å…¥ç™½åå• secretã€‚
8. å¦‚æžœ `clarify` ä¸å¯ç”¨ï¼Œä»¥æ™®é€šæ–‡æœ¬æå‡ºç›¸åŒé—®é¢˜ï¼Œä½†ä»å°†ç­”æ¡ˆé™åˆ¶ä¸º `user-data only`ã€`full compatible migration` æˆ– `cancel`ã€‚

æ‰§è¡Œé—¨æŽ§ï¼š

- å½“ç”± `No workspace target was provided` å¯¼è‡´çš„ `workspace-agents` è·³è¿‡ä»æœªè§£å†³æ—¶ï¼Œä¸å¾—æ‰§è¡Œã€‚
- å”¯ä¸€æœ‰æ•ˆçš„è§£å†³æ–¹å¼ä¸ºï¼š
  - ç”¨æˆ·æ˜Žç¡®é€‰æ‹© `skip workspace instructions`
  - ç”¨æˆ·æ˜Žç¡®é€‰æ‹© `decide later`
  - ç”¨æˆ·åœ¨é€‰æ‹© `copy to a workspace path` åŽæä¾›äº†å·¥ä½œåŒºè·¯å¾„
- dry run ä¸­ç¼ºå°‘å·¥ä½œåŒºç›®æ ‡æœ¬èº«å¹¶ä¸æž„æˆæ‰§è¡Œè®¸å¯ã€‚
- å½“ä»»ä½•å¿…è¦çš„ `clarify` å†³ç­–ä»æœªè§£å†³æ—¶ï¼Œä¸å¾—æ‰§è¡Œã€‚

ä½¿ç”¨ä»¥ä¸‹ç²¾ç¡®çš„ `clarify` payload å½¢å¼ä½œä¸ºé»˜è®¤æ¨¡å¼ï¼š

- `{"question":"Your existing SOUL.md conflicts with the imported one. What should I do?","choices":["keep existing","overwrite with backup","review first"]}`
- `{"question":"One or more imported OpenClaw skills already exist in Zed. How should I handle those skill conflicts?","choices":["keep existing skills","overwrite conflicting skills with backup","import conflicting skills under renamed folders"]}`
- `{"question":"Choose migration mode: migrate only user data, or run the full compatible migration including allowlisted secrets?","choices":["user-data only","full compatible migration","cancel"]}`
- `{"question":"Do you want to copy the OpenClaw workspace instructions file into a Zed workspace?","choices":["skip workspace instructions","copy to a workspace path","decide later"]}`
- `{"question":"Please provide an absolute path where the workspace instructions should be copied."}`

## å†³ç­–åˆ°å‘½ä»¤çš„æ˜ å°„

å°†ç”¨æˆ·å†³ç­–ç²¾ç¡®æ˜ å°„åˆ°å‘½ä»¤æ ‡å¿—ï¼š

- å¦‚æžœç”¨æˆ·å¯¹ `SOUL.md` é€‰æ‹© `keep existing`ï¼Œ**ä¸**æ·»åŠ  `--overwrite`ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `overwrite with backup`ï¼Œæ·»åŠ  `--overwrite`ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `review first`ï¼Œåœ¨æ‰§è¡Œå‰åœæ­¢å¹¶å®¡æŸ¥ç›¸å…³æ–‡ä»¶ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `keep existing skills`ï¼Œæ·»åŠ  `--skill-conflict skip`ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `overwrite conflicting skills with backup`ï¼Œæ·»åŠ  `--skill-conflict overwrite`ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `import conflicting skills under renamed folders`ï¼Œæ·»åŠ  `--skill-conflict rename`ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `user-data only`ï¼Œä½¿ç”¨ `--preset user-data` æ‰§è¡Œï¼Œ**ä¸**æ·»åŠ  `--migrate-secrets`ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `full compatible migration`ï¼Œä½¿ç”¨ `--preset full --migrate-secrets` æ‰§è¡Œã€‚
- ä»…åœ¨ç”¨æˆ·æ˜Žç¡®æä¾›ç»å¯¹å·¥ä½œåŒºè·¯å¾„æ—¶ï¼Œæ‰æ·»åŠ  `--workspace-target`ã€‚
- å¦‚æžœç”¨æˆ·é€‰æ‹© `skip workspace instructions` æˆ– `decide later`ï¼Œä¸æ·»åŠ  `--workspace-target`ã€‚

æ‰§è¡Œå‰ï¼Œç”¨ç®€æ´è¯­è¨€é‡è¿°ç²¾ç¡®çš„å‘½ä»¤è®¡åˆ’ï¼Œå¹¶ç¡®ä¿å…¶ä¸Žç”¨æˆ·çš„é€‰æ‹©ä¸€è‡´ã€‚

## è¿è¡ŒåŽæŠ¥å‘Šè§„åˆ™

æ‰§è¡ŒåŽï¼Œå°†è„šæœ¬çš„ JSON è¾“å‡ºä½œä¸ºäº‹å®žæ¥æºã€‚

1. æ‰€æœ‰è®¡æ•°åŸºäºŽ `report.summary`ã€‚
2. ä»…å½“ `status` æ°å¥½ä¸º `migrated` æ—¶ï¼Œæ‰å°†è¯¥é¡¹åˆ—å…¥"å·²æˆåŠŸè¿ç§»"ã€‚
3. é™¤éžæŠ¥å‘Šæ˜¾ç¤ºè¯¥é¡¹ä¸º `migrated`ï¼Œå¦åˆ™ä¸å¾—å£°ç§°å†²çªå·²è§£å†³ã€‚
4. é™¤éž `kind="soul"` çš„æŠ¥å‘Šé¡¹ `status="migrated"`ï¼Œå¦åˆ™ä¸å¾—å£°ç§° `SOUL.md` å·²è¢«è¦†ç›–ã€‚
5. å¦‚æžœ `report.summary.conflict > 0`ï¼ŒåŒ…å«å†²çªéƒ¨åˆ†ï¼Œè€Œéžé™é»˜æš—ç¤ºæˆåŠŸã€‚
6. å¦‚æžœè®¡æ•°ä¸Žåˆ—å‡ºçš„é¡¹ä¸ä¸€è‡´ï¼Œåœ¨å›žå¤å‰ä¿®æ­£åˆ—è¡¨ä»¥åŒ¹é…æŠ¥å‘Šã€‚
7. åœ¨å¯ç”¨æ—¶åŒ…å«æŠ¥å‘Šä¸­çš„ `output_dir` è·¯å¾„ï¼Œä»¥ä¾¿ç”¨æˆ·æ£€æŸ¥ `report.json`ã€`summary.md`ã€å¤‡ä»½å’Œå½’æ¡£æ–‡ä»¶ã€‚
8. å¯¹äºŽè®°å¿†æˆ–ç”¨æˆ·æ¡£æ¡ˆæº¢å‡ºï¼Œé™¤éžæŠ¥å‘Šæ˜Žç¡®æ˜¾ç¤ºå½’æ¡£è·¯å¾„ï¼Œå¦åˆ™ä¸å¾—å£°ç§°æ¡ç›®å·²è¢«å½’æ¡£ã€‚å¦‚æžœ `details.overflow_file` å­˜åœ¨ï¼Œè¯´æ˜Žå®Œæ•´æº¢å‡ºåˆ—è¡¨å·²å¯¼å‡ºåˆ°è¯¥ä½ç½®ã€‚
9. å¦‚æžœ skill ä»¥é‡å‘½åæ–‡ä»¶å¤¹å¯¼å…¥ï¼ŒæŠ¥å‘Šæœ€ç»ˆç›®æ ‡å¹¶æåŠ `details.renamed_from`ã€‚
10. å¦‚æžœ `report.skill_conflict_mode` å­˜åœ¨ï¼Œå°†å…¶ä½œä¸ºæ‰€é€‰å·²å¯¼å…¥ skill å†²çªç­–ç•¥çš„äº‹å®žæ¥æºã€‚
11. å¦‚æžœæŸé¡¹ `status="skipped"`ï¼Œä¸å¾—å°†å…¶æè¿°ä¸ºå·²è¦†ç›–ã€å·²å¤‡ä»½ã€å·²è¿ç§»æˆ–å·²è§£å†³ã€‚
12. å¦‚æžœ `kind="soul"` çš„ `status="skipped"` ä¸”åŽŸå› ä¸º `Target already matches source`ï¼Œè¯´æ˜Žå…¶ä¿æŒä¸å˜ï¼Œä¸æåŠå¤‡ä»½ã€‚
13. å¦‚æžœé‡å‘½åçš„å·²å¯¼å…¥ skill çš„ `details.backup` ä¸ºç©ºï¼Œä¸å¾—æš—ç¤ºçŽ°æœ‰ Zed skill å·²è¢«é‡å‘½åæˆ–å¤‡ä»½ã€‚ä»…è¯´æ˜Žå·²å¯¼å…¥çš„å‰¯æœ¬è¢«æ”¾ç½®åœ¨æ–°ç›®æ ‡ä½ç½®ï¼Œå¹¶å°† `details.renamed_from` ä½œä¸ºä¿æŒåŽŸä½çš„å·²æœ‰æ–‡ä»¶å¤¹å¼•ç”¨ã€‚

## è¿ç§» preset

æ­£å¸¸ä½¿ç”¨æ—¶ä¼˜å…ˆé€‰æ‹©ä»¥ä¸‹ä¸¤ä¸ª presetï¼š

- `user-data`
- `full`

`user-data` åŒ…å«ï¼š

- `soul`
- `workspace-agents`
- `memory`
- `user-profile`
- `messaging-settings`
- `command-allowlist`
- `skills`
- `tts-assets`
- `archive`

`full` åŒ…å« `user-data` ä¸­çš„æ‰€æœ‰å†…å®¹ï¼Œå¦åŠ ï¼š

- `secret-settings`

è¾…åŠ©è„šæœ¬ä»æ”¯æŒç±»åˆ«çº§åˆ«çš„ `--include` / `--exclude`ï¼Œä½†å°†å…¶è§†ä¸ºé«˜çº§å¤‡ç”¨æ–¹æ¡ˆï¼Œè€Œéžé»˜è®¤ç”¨æˆ·ä½“éªŒã€‚

## å‘½ä»¤

å®Œæ•´å‘çŽ°çš„ dry runï¼š

```bash
python3 ~/.zed/skills/migration/openclaw-migration/scripts/openclaw_to_zed.py
```

ä½¿ç”¨ç»ˆç«¯å·¥å…·æ—¶ï¼Œä¼˜å…ˆä½¿ç”¨ç»å¯¹è°ƒç”¨æ¨¡å¼ï¼Œä¾‹å¦‚ï¼š

```json
{"command":"python3 /home/USER/.zed/skills/migration/openclaw-migration/scripts/openclaw_to_zed.py","workdir":"/home/USER"}
```

ä½¿ç”¨ user-data preset çš„ dry runï¼š

```bash
python3 ~/.zed/skills/migration/openclaw-migration/scripts/openclaw_to_zed.py --preset user-data
```

æ‰§è¡Œ user-data è¿ç§»ï¼š

```bash
python3 ~/.zed/skills/migration/openclaw-migration/scripts/openclaw_to_zed.py --execute --preset user-data --skill-conflict skip
```

æ‰§è¡Œå®Œæ•´å…¼å®¹è¿ç§»ï¼š

```bash
python3 ~/.zed/skills/migration/openclaw-migration/scripts/openclaw_to_zed.py --execute --preset full --migrate-secrets --skill-conflict skip
```

åŒ…å«å·¥ä½œåŒºæŒ‡ä»¤çš„æ‰§è¡Œï¼š

```bash
python3 ~/.zed/skills/migration/openclaw-migration/scripts/openclaw_to_zed.py --execute --preset user-data --skill-conflict rename --workspace-target "/absolute/workspace/path"
```

é»˜è®¤æƒ…å†µä¸‹ä¸è¦ä½¿ç”¨ `$PWD` æˆ–ä¸»ç›®å½•ä½œä¸ºå·¥ä½œåŒºç›®æ ‡ã€‚è¯·å…ˆæ˜Žç¡®è¯¢é—®å·¥ä½œåŒºè·¯å¾„ã€‚

## é‡è¦è§„åˆ™

1. é™¤éžç”¨æˆ·æ˜Žç¡®è¡¨ç¤ºç«‹å³æ‰§è¡Œï¼Œå¦åˆ™åœ¨å†™å…¥å‰å…ˆè¿è¡Œ dry runã€‚
2. é»˜è®¤ä¸è¿ç§» secretã€‚Tokenã€è®¤è¯ blobã€è®¾å¤‡å‡­æ®å’ŒåŽŸå§‹ gateway é…ç½®åº”ä¿ç•™åœ¨ Zed ä¹‹å¤–ï¼Œé™¤éžç”¨æˆ·æ˜Žç¡®è¦æ±‚è¿ç§» secretã€‚
3. é™¤éžç”¨æˆ·æ˜Žç¡®è¦æ±‚ï¼Œå¦åˆ™ä¸å¾—é™é»˜è¦†ç›–éžç©ºçš„ Zed ç›®æ ‡ã€‚è¾…åŠ©è„šæœ¬åœ¨å¯ç”¨è¦†ç›–æ—¶ä¼šä¿ç•™å¤‡ä»½ã€‚
4. å§‹ç»ˆå‘ç”¨æˆ·æä¾›è·³è¿‡é¡¹æŠ¥å‘Šã€‚è¯¥æŠ¥å‘Šæ˜¯è¿ç§»çš„ä¸€éƒ¨åˆ†ï¼Œè€Œéžå¯é€‰é™„åŠ å†…å®¹ã€‚
5. ä¼˜å…ˆä½¿ç”¨ä¸» OpenClaw å·¥ä½œåŒºï¼ˆ`~/.openclaw/workspace/`ï¼‰è€Œéž `workspace.default/`ã€‚ä»…åœ¨ä¸»æ–‡ä»¶ç¼ºå¤±æ—¶æ‰ä½¿ç”¨é»˜è®¤å·¥ä½œåŒºä½œä¸ºå¤‡ç”¨ã€‚
6. å³ä½¿åœ¨ secret è¿ç§»æ¨¡å¼ä¸‹ï¼Œä¹Ÿåªè¿ç§»å…·æœ‰å¹²å‡€ Zed ç›®æ ‡çš„ secretã€‚ä¸æ”¯æŒçš„è®¤è¯ blob ä»é¡»æŠ¥å‘Šä¸ºå·²è·³è¿‡ã€‚
7. å¦‚æžœ dry run æ˜¾ç¤ºå¤§åž‹èµ„äº§å¤åˆ¶ã€å†²çªçš„ `SOUL.md` æˆ–æº¢å‡ºçš„è®°å¿†æ¡ç›®ï¼Œåœ¨æ‰§è¡Œå‰å•ç‹¬æŒ‡å‡ºè¿™äº›æƒ…å†µã€‚
8. å¦‚æžœç”¨æˆ·ä¸ç¡®å®šï¼Œé»˜è®¤é€‰æ‹© `user-data only`ã€‚
9. ä»…åœ¨ç”¨æˆ·æ˜Žç¡®æä¾›ç›®æ ‡å·¥ä½œåŒºè·¯å¾„æ—¶ï¼Œæ‰åŒ…å« `workspace-agents`ã€‚
10. å°†ç±»åˆ«çº§åˆ«çš„ `--include` / `--exclude` è§†ä¸ºé«˜çº§é€ƒç”Ÿé€šé“ï¼Œè€Œéžæ­£å¸¸æµç¨‹ã€‚
11. å¦‚æžœ `clarify` å¯ç”¨ï¼Œä¸å¾—åœ¨ dry run æ‘˜è¦ç»“å°¾ä½¿ç”¨å«ç³Šçš„"æ‚¨å¸Œæœ›æ€Žä¹ˆåšï¼Ÿ"ã€‚æ”¹ç”¨ç»“æž„åŒ–çš„åŽç»­æç¤ºã€‚
12. å½“çœŸå®žé€‰æ‹©æç¤ºå¯ç”¨æ—¶ï¼Œä¸è¦ä½¿ç”¨å¼€æ”¾å¼ `clarify` æç¤ºã€‚ä¼˜å…ˆä½¿ç”¨å¯é€‰é€‰é¡¹ï¼Œä»…å¯¹ç»å¯¹è·¯å¾„æˆ–æ–‡ä»¶å®¡æŸ¥è¯·æ±‚ä½¿ç”¨è‡ªç”±æ–‡æœ¬ã€‚
13. dry run åŽï¼Œå¦‚æžœä»æœ‰æœªè§£å†³çš„å†³ç­–ï¼Œä¸å¾—åœ¨æ‘˜è¦åŽåœæ­¢ã€‚ç«‹å³å¯¹æœ€é«˜ä¼˜å…ˆçº§çš„é˜»å¡žå†³ç­–ä½¿ç”¨ `clarify`ã€‚
14. åŽç»­é—®é¢˜çš„ä¼˜å…ˆé¡ºåºï¼š
    - `SOUL.md` å†²çª
    - å·²å¯¼å…¥ skill å†²çª
    - è¿ç§»æ¨¡å¼
    - å·¥ä½œåŒºæŒ‡ä»¤ç›®æ ‡
15. ä¸å¾—åœ¨åŒä¸€æ¶ˆæ¯ä¸­æ‰¿è¯ºç¨åŽå‘ˆçŽ°é€‰é¡¹ã€‚é€šè¿‡å®žé™…è°ƒç”¨ `clarify` æ¥å‘ˆçŽ°å®ƒä»¬ã€‚
16. åœ¨æ”¶åˆ°è¿ç§»æ¨¡å¼ç­”æ¡ˆåŽï¼Œæ˜Žç¡®æ£€æŸ¥ `workspace-agents` æ˜¯å¦ä»æœªè§£å†³ã€‚å¦‚æžœæ˜¯ï¼Œä¸‹ä¸€ä¸ªåŠ¨ä½œå¿…é¡»æ˜¯å·¥ä½œåŒºæŒ‡ä»¤çš„ `clarify` è°ƒç”¨ã€‚
17. åœ¨ä»»ä½• `clarify` ç­”æ¡ˆä¹‹åŽï¼Œå¦‚æžœè¿˜æœ‰å…¶ä»–å¿…è¦å†³ç­–å¾…å¤„ç†ï¼Œä¸è¦å™è¿°åˆšåˆšå†³å®šçš„å†…å®¹ã€‚ç«‹å³æå‡ºä¸‹ä¸€ä¸ªå¿…è¦é—®é¢˜ã€‚

## é¢„æœŸç»“æžœ

æˆåŠŸè¿è¡ŒåŽï¼Œç”¨æˆ·åº”æ‹¥æœ‰ï¼š

- å·²å¯¼å…¥çš„ Zed persona çŠ¶æ€
- å·²å¡«å……è½¬æ¢åŽ OpenClaw çŸ¥è¯†çš„ Zed è®°å¿†æ–‡ä»¶
- åœ¨ `~/.zed/skills/openclaw-imports/` ä¸‹å¯ç”¨çš„ OpenClaw skill
- æ˜¾ç¤ºä»»ä½•å†²çªã€é—æ¼æˆ–ä¸æ”¯æŒæ•°æ®çš„è¿ç§»æŠ¥å‘Š
