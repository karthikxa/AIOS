---
sidebar_position: 12
title: "ä½¿ç”¨ Skills"
description: "æŸ¥æ‰¾ã€å®‰è£…ã€ä½¿ç”¨å’Œåˆ›å»º skillsâ€”â€”æŒ‰éœ€åŠ è½½çš„çŸ¥è¯†æ–‡æ¡£ï¼Œç”¨äºŽæ•™ä¼š Zed æ–°çš„å·¥ä½œæµç¨‹"
---

# ä½¿ç”¨ Skills

Skillsï¼ˆæŠ€èƒ½ï¼‰æ˜¯æŒ‰éœ€åŠ è½½çš„çŸ¥è¯†æ–‡æ¡£ï¼Œç”¨äºŽæ•™ä¼š Zed å¦‚ä½•å¤„ç†ç‰¹å®šä»»åŠ¡â€”â€”ä»Žç”Ÿæˆ ASCII è‰ºæœ¯åˆ°ç®¡ç† GitHub PRã€‚æœ¬æŒ‡å—ä»‹ç»æ—¥å¸¸ä½¿ç”¨æ–¹æ³•ã€‚

å®Œæ•´æŠ€æœ¯å‚è€ƒè¯·è§ [Skills ç³»ç»Ÿ](/user-guide/features/skills)ã€‚

---

## æŸ¥æ‰¾ Skills

æ¯ä¸ª Zed å®‰è£…éƒ½å†…ç½®äº†æ†ç»‘çš„ skillsã€‚æŸ¥çœ‹å¯ç”¨åˆ—è¡¨ï¼š

```bash
# åœ¨ä»»æ„èŠå¤©ä¼šè¯ä¸­ï¼š
/skills

# æˆ–é€šè¿‡ CLIï¼š
zed skills list
```

è¾“å‡ºåŒ…å«åç§°å’Œæè¿°çš„ç´§å‡‘åˆ—è¡¨ï¼š

```
ascii-art         Generate ASCII art using pyfiglet, cowsay, boxes...
arxiv             Search and retrieve academic papers from arXiv...
github-pr-workflow Full PR lifecycle â€” create branches, commit...
plan              Plan mode â€” inspect context, write a markdown...
excalidraw        Create hand-drawn style diagrams using Excalidraw...
```

### æœç´¢ Skill

```bash
# æŒ‰å…³é”®è¯æœç´¢
/skills search docker
/skills search music
```

### Skills Hub

å®˜æ–¹å¯é€‰ skillsï¼ˆè¾ƒé‡æˆ–å°ä¼—ã€é»˜è®¤æœªæ¿€æ´»çš„ skillsï¼‰å¯é€šè¿‡ Hub èŽ·å–ï¼š

```bash
# æµè§ˆå®˜æ–¹å¯é€‰ skills
/skills browse

# æœç´¢ Hub
/skills search blockchain
```

---

## ä½¿ç”¨ Skill

æ¯ä¸ªå·²å®‰è£…çš„ skill è‡ªåŠ¨æˆä¸ºä¸€ä¸ªæ–œæ å‘½ä»¤ã€‚ç›´æŽ¥è¾“å…¥å…¶åç§°å³å¯ï¼š

```bash
# åŠ è½½ skill å¹¶æŒ‡å®šä»»åŠ¡
/ascii-art Make a banner that says "HELLO WORLD"
/plan Design a REST API for a todo app
/github-pr-workflow Create a PR for the auth refactor

# åªè¾“å…¥ skill åç§°ï¼ˆä¸å¸¦ä»»åŠ¡ï¼‰ä¼šåŠ è½½å®ƒå¹¶è®©ä½ æè¿°éœ€æ±‚
/excalidraw
```

ä½ ä¹Ÿå¯ä»¥é€šè¿‡è‡ªç„¶å¯¹è¯è§¦å‘ skillsâ€”â€”å‘Šè¯‰ Zed ä½¿ç”¨æŸä¸ªç‰¹å®š skillï¼Œå®ƒä¼šé€šè¿‡ `skill_view` å·¥å…·åŠ è½½ã€‚

### æ¸è¿›å¼åŠ è½½

Skills é‡‡ç”¨ token é«˜æ•ˆçš„åŠ è½½æ¨¡å¼ï¼Œagent ä¸ä¼šä¸€æ¬¡æ€§åŠ è½½æ‰€æœ‰å†…å®¹ï¼š

1. **`skills_list()`** â€” æ‰€æœ‰ skills çš„ç´§å‡‘åˆ—è¡¨ï¼ˆçº¦ 3k tokensï¼‰ï¼Œåœ¨ä¼šè¯å¼€å§‹æ—¶åŠ è½½ã€‚
2. **`skill_view(name)`** â€” å•ä¸ª skill çš„å®Œæ•´ SKILL.md å†…å®¹ï¼Œåœ¨ agent åˆ¤æ–­éœ€è¦è¯¥ skill æ—¶åŠ è½½ã€‚
3. **`skill_view(name, file_path)`** â€” skill å†…çš„ç‰¹å®šå‚è€ƒæ–‡ä»¶ï¼Œä»…åœ¨éœ€è¦æ—¶åŠ è½½ã€‚

è¿™æ„å‘³ç€ skills åœ¨çœŸæ­£è¢«ä½¿ç”¨ä¹‹å‰ä¸æ¶ˆè€—ä»»ä½• tokensã€‚

---

## ä»Ž Hub å®‰è£…

å®˜æ–¹å¯é€‰ skills éš Zed ä¸€èµ·å‘å¸ƒï¼Œä½†é»˜è®¤æœªæ¿€æ´»ï¼Œéœ€æ˜¾å¼å®‰è£…ï¼š

```bash
# å®‰è£…å®˜æ–¹å¯é€‰ skill
zed skills install official/research/arxiv

# åœ¨èŠå¤©ä¼šè¯ä¸­ä»Ž Hub å®‰è£…
/skills install official/creative/songwriting-and-ai-music

# ç›´æŽ¥ä»Žä»»æ„ HTTP(S) URL å®‰è£…å•æ–‡ä»¶ SKILL.md
zed skills install https://sharethis.chat/SKILL.md
/skills install https://example.com/SKILL.md --name my-skill
```

å®‰è£…è¿‡ç¨‹ï¼š
1. skill ç›®å½•è¢«å¤åˆ¶åˆ° `~/.zed/skills/`
2. å‡ºçŽ°åœ¨ `skills_list` è¾“å‡ºä¸­
3. æˆä¸ºå¯ç”¨çš„æ–œæ å‘½ä»¤

:::tip
å·²å®‰è£…çš„ skills åœ¨æ–°ä¼šè¯ä¸­ç”Ÿæ•ˆã€‚å¦‚éœ€åœ¨å½“å‰ä¼šè¯ä¸­ç«‹å³ä½¿ç”¨ï¼Œå¯ç”¨ `/reset` å¼€å¯æ–°ä¼šè¯ï¼Œæˆ–æ·»åŠ  `--now` å‚æ•°ç«‹å³ä½¿ prompt ç¼“å­˜å¤±æ•ˆï¼ˆä¸‹ä¸€è½®ä¼šæ¶ˆè€—æ›´å¤š tokensï¼‰ã€‚
:::

### éªŒè¯å®‰è£…

```bash
# ç¡®è®¤å·²å®‰è£…
zed skills list | grep arxiv

# æˆ–åœ¨èŠå¤©ä¸­
/skills search arxiv
```

---

## æ’ä»¶æä¾›çš„ Skills

æ’ä»¶å¯ä»¥ä½¿ç”¨å‘½åç©ºé—´åç§°ï¼ˆ`plugin:skill`ï¼‰æ†ç»‘è‡ªå·±çš„ skillsï¼Œä»¥é¿å…ä¸Žå†…ç½® skills å‘ç”Ÿåç§°å†²çªã€‚

```bash
# é€šè¿‡é™å®šåç§°åŠ è½½æ’ä»¶ skill
skill_view("superpowers:writing-plans")

# åŒåçš„å†…ç½® skill ä¸å—å½±å“
skill_view("writing-plans")
```

æ’ä»¶ skills **ä¸ä¼š**åˆ—åœ¨ç³»ç»Ÿ prompt ä¸­ï¼Œä¹Ÿä¸å‡ºçŽ°åœ¨ `skills_list` ä¸­ã€‚å®ƒä»¬æ˜¯æŒ‰éœ€åŠ è½½çš„â€”â€”å½“ä½ çŸ¥é“æŸä¸ªæ’ä»¶æä¾›äº†æŸä¸ª skill æ—¶ï¼Œæ˜¾å¼åŠ è½½å®ƒã€‚åŠ è½½åŽï¼Œagent ä¼šçœ‹åˆ°ä¸€ä¸ªæ¨ªå¹…ï¼Œåˆ—å‡ºåŒä¸€æ’ä»¶çš„å…¶ä»– skillsã€‚

å…³äºŽå¦‚ä½•åœ¨è‡ªå·±çš„æ’ä»¶ä¸­æ†ç»‘ skillsï¼Œè¯·å‚è§ [æž„å»º Zed æ’ä»¶ â†’ æ†ç»‘ skills](/guides/build-a-zed-plugin#bundle-skills)ã€‚

---

## é…ç½® Skill è®¾ç½®

éƒ¨åˆ† skills åœ¨ frontmatter ä¸­å£°æ˜Žäº†æ‰€éœ€çš„é…ç½®ï¼š

```yaml
metadata:
  zed:
    config:
      - key: tenor.api_key
        description: "Tenor API key for GIF search"
        prompt: "Enter your Tenor API key"
        url: "https://developers.google.com/tenor/guides/quickstart"
```

å½“å¸¦æœ‰é…ç½®çš„ skill é¦–æ¬¡åŠ è½½æ—¶ï¼ŒZed ä¼šæç¤ºä½ è¾“å…¥ç›¸åº”å€¼ï¼Œå¹¶å°†å…¶å­˜å‚¨åœ¨ `config.yaml` çš„ `skills.config.*` ä¸‹ã€‚

é€šè¿‡ CLI ç®¡ç† skill é…ç½®ï¼š

```bash
# å¯¹ç‰¹å®š skill è¿›è¡Œäº¤äº’å¼é…ç½®
zed skills config gif-search

# æŸ¥çœ‹æ‰€æœ‰ skill é…ç½®
zed config get skills.config
```

---

## åˆ›å»ºè‡ªå·±çš„ Skill

Skills åªæ˜¯å¸¦æœ‰ YAML frontmatter çš„ Markdown æ–‡ä»¶ï¼Œåˆ›å»ºä¸€ä¸ªä¸è¶…è¿‡äº”åˆ†é’Ÿã€‚

### 1. åˆ›å»ºç›®å½•

```bash
mkdir -p ~/.zed/skills/my-category/my-skill
```

### 2. ç¼–å†™ SKILL.md

```markdown title="~/.zed/skills/my-category/my-skill/SKILL.md"
---
name: my-skill
description: Brief description of what this skill does
version: 1.0.0
metadata:
  zed:
    tags: [my-tag, automation]
    category: my-category
---

# My Skill

## When to Use
Use this skill when the user asks about [specific topic] or needs to [specific task].

## Procedure
1. First, check if [prerequisite] is available
2. Run `command --with-flags`
3. Parse the output and present results

## Pitfalls
- Common failure: [description]. Fix: [solution]
- Watch out for [edge case]

## Verification
Run `check-command` to confirm the result is correct.
```

### 3. æ·»åŠ å‚è€ƒæ–‡ä»¶ï¼ˆå¯é€‰ï¼‰

Skills å¯ä»¥åŒ…å« agent æŒ‰éœ€åŠ è½½çš„è¾…åŠ©æ–‡ä»¶ï¼š

```
my-skill/
â”œâ”€â”€ SKILL.md                    # ä¸» skill æ–‡æ¡£
â”œâ”€â”€ references/
â”‚   â”œâ”€â”€ api-docs.md             # agent å¯æŸ¥é˜…çš„ API å‚è€ƒ
â”‚   â””â”€â”€ examples.md             # ç¤ºä¾‹è¾“å…¥/è¾“å‡º
â”œâ”€â”€ templates/
â”‚   â””â”€â”€ config.yaml             # agent å¯ä½¿ç”¨çš„æ¨¡æ¿æ–‡ä»¶
â””â”€â”€ scripts/
    â””â”€â”€ setup.sh                # agent å¯æ‰§è¡Œçš„è„šæœ¬
```

åœ¨ SKILL.md ä¸­å¼•ç”¨è¿™äº›æ–‡ä»¶ï¼š

```markdown
For API details, load the reference: `skill_view("my-skill", "references/api-docs.md")`
```

### 4. æµ‹è¯•

å¼€å¯æ–°ä¼šè¯å¹¶æµ‹è¯•ä½ çš„ skillï¼š

```bash
zed chat -q "/my-skill help me with the thing"
```

Skill ä¼šè‡ªåŠ¨å‡ºçŽ°â€”â€”æ— éœ€æ³¨å†Œã€‚æ”¾å…¥ `~/.zed/skills/` å³å¯ç«‹å³ç”Ÿæ•ˆã€‚

:::info
Agent ä¹Ÿå¯ä»¥ä½¿ç”¨ `skill_manage` è‡ªè¡Œåˆ›å»ºå’Œæ›´æ–° skillsã€‚è§£å†³å¤æ‚é—®é¢˜åŽï¼ŒZed å¯èƒ½ä¼šä¸»åŠ¨æè®®å°†è¯¥æ–¹æ³•ä¿å­˜ä¸º skillï¼Œä»¥ä¾¿ä¸‹æ¬¡ä½¿ç”¨ã€‚
:::

---

## æŒ‰å¹³å°ç®¡ç† Skills

æŽ§åˆ¶å“ªäº› skills åœ¨å“ªäº›å¹³å°ä¸Šå¯ç”¨ï¼š

```bash
zed skills
```

è¿™ä¼šæ‰“å¼€ä¸€ä¸ªäº¤äº’å¼ TUIï¼Œä½ å¯ä»¥æŒ‰å¹³å°ï¼ˆCLIã€Telegramã€Discord ç­‰ï¼‰å¯ç”¨æˆ–ç¦ç”¨ skillsã€‚å½“ä½ å¸Œæœ›æŸäº› skills ä»…åœ¨ç‰¹å®šåœºæ™¯ä¸‹å¯ç”¨æ—¶éžå¸¸æœ‰ç”¨â€”â€”ä¾‹å¦‚ï¼Œåœ¨ Telegram ä¸Šç¦ç”¨å¼€å‘ç±» skillsã€‚

---

## Skills ä¸Ž Memory çš„åŒºåˆ«

ä¸¤è€…éƒ½è·¨ä¼šè¯æŒä¹…åŒ–ï¼Œä½†ç”¨é€”ä¸åŒï¼š

| | Skills | Memory |
|---|---|---|
| **å†…å®¹** | ç¨‹åºæ€§çŸ¥è¯†â€”â€”å¦‚ä½•åšäº‹ | äº‹å®žæ€§çŸ¥è¯†â€”â€”äº‹ç‰©æ˜¯ä»€ä¹ˆ |
| **æ—¶æœº** | æŒ‰éœ€åŠ è½½ï¼Œä»…åœ¨ç›¸å…³æ—¶åŠ è½½ | è‡ªåŠ¨æ³¨å…¥æ¯ä¸ªä¼šè¯ |
| **å¤§å°** | å¯ä»¥è¾ƒå¤§ï¼ˆæ•°ç™¾è¡Œï¼‰ | åº”ä¿æŒç´§å‡‘ï¼ˆä»…å…³é”®äº‹å®žï¼‰ |
| **å¼€é”€** | åŠ è½½å‰é›¶ tokens | å°‘é‡ä½†æŒç»­çš„ token å¼€é”€ |
| **ç¤ºä¾‹** | "å¦‚ä½•éƒ¨ç½²åˆ° Kubernetes" | "ç”¨æˆ·åå¥½æ·±è‰²æ¨¡å¼ï¼Œä½äºŽ PST æ—¶åŒº" |
| **åˆ›å»ºè€…** | ä½ ã€agent æˆ–ä»Ž Hub å®‰è£… | Agentï¼ŒåŸºäºŽå¯¹è¯å†…å®¹ |

**ç»éªŒæ³•åˆ™ï¼š** å¦‚æžœä½ ä¼šæŠŠå®ƒå†™è¿›å‚è€ƒæ–‡æ¡£ï¼Œå®ƒå°±æ˜¯ skillï¼›å¦‚æžœä½ ä¼šæŠŠå®ƒå†™åœ¨ä¾¿åˆ©è´´ä¸Šï¼Œå®ƒå°±æ˜¯ memoryã€‚

---

## ä½¿ç”¨æŠ€å·§

**ä¿æŒ skills èšç„¦ã€‚** è¯•å›¾æ¶µç›–"æ‰€æœ‰ DevOps"çš„ skill ä¼šè¿‡äºŽå†—é•¿ä¸”æ¨¡ç³Šã€‚ä¸“æ³¨äºŽ"å°† Python åº”ç”¨éƒ¨ç½²åˆ° Fly.io"çš„ skill æ‰è¶³å¤Ÿå…·ä½“ï¼ŒçœŸæ­£æœ‰ç”¨ã€‚

**è®© agent åˆ›å»º skillsã€‚** å®Œæˆå¤æ‚çš„å¤šæ­¥éª¤ä»»åŠ¡åŽï¼ŒZed é€šå¸¸ä¼šä¸»åŠ¨æè®®å°†è¯¥æ–¹æ³•ä¿å­˜ä¸º skillã€‚æŽ¥å—å®ƒâ€”â€”è¿™äº›ç”± agent ç¼–å†™çš„ skills ä¼šæ•æ‰åˆ°å®Œæ•´çš„å·¥ä½œæµç¨‹ï¼ŒåŒ…æ‹¬è¿‡ç¨‹ä¸­å‘çŽ°çš„å„ç§å‘ã€‚

**ä½¿ç”¨åˆ†ç±»ç›®å½•ã€‚** å°† skills æ•´ç†åˆ°å­ç›®å½•ä¸­ï¼ˆ`~/.zed/skills/devops/`ã€`~/.zed/skills/research/` ç­‰ï¼‰ï¼Œä¿æŒåˆ—è¡¨æ•´æ´ï¼Œå¹¶å¸®åŠ© agent æ›´å¿«æ‰¾åˆ°ç›¸å…³ skillsã€‚

**åŠæ—¶æ›´æ–°è¿‡æ—¶çš„ skillsã€‚** å¦‚æžœä½¿ç”¨æŸä¸ª skill æ—¶é‡åˆ°å®ƒæœªè¦†ç›–çš„é—®é¢˜ï¼Œå‘Šè¯‰ Zed ç”¨ä½ å­¦åˆ°çš„å†…å®¹æ›´æ–°è¯¥ skillã€‚ä¸ç»´æŠ¤çš„ skills ä¼šæˆä¸ºè´Ÿæ‹…ã€‚

---

*å®Œæ•´çš„ skills å‚è€ƒâ€”â€”frontmatter å­—æ®µã€æ¡ä»¶æ¿€æ´»ã€å¤–éƒ¨ç›®å½•ç­‰â€”â€”è¯·è§ [Skills ç³»ç»Ÿ](/user-guide/features/skills)ã€‚*