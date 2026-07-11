---
title: "Zed Agent Skill ç¼–å†™â€”â€”åœ¨ä»“åº“ä¸­ç¼–å†™ SKILL"
sidebar_label: "Zed Agent Skill ç¼–å†™"
description: "åœ¨ä»“åº“ä¸­ç¼–å†™ SKILL.md"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Zed Agent Skill ç¼–å†™

ç¼–å†™ä»“åº“å†… SKILL.mdï¼šfrontmatterï¼ˆå‰ç½®å…ƒæ•°æ®ï¼‰ã€éªŒè¯å™¨ã€ç»“æž„ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/software-development/zed-agent-skill-authoring` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `skills`, `authoring`, `zed-agent`, `conventions`, `skill-md` |
| ç›¸å…³ skill | [`writing-plans`](/user-guide/skills/bundled/software-development/software-development-writing-plans), [`requesting-code-review`](/user-guide/skills/bundled/software-development/software-development-requesting-code-review) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# ç¼–å†™ Zed-Agent Skillsï¼ˆä»“åº“å†…ï¼‰

## æ¦‚è¿°

SKILL.md å¯ä»¥å­˜æ”¾åœ¨ä¸¤ä¸ªä½ç½®ï¼š

1. **ç”¨æˆ·æœ¬åœ°ï¼š** `~/.zed/skills/<maybe-category>/<name>/SKILL.md` â€” ä¸ªäººä½¿ç”¨ï¼Œä¸å…±äº«ã€‚é€šè¿‡ `skill_manage(action='create')` åˆ›å»ºã€‚
2. **ä»“åº“å†…ï¼ˆæœ¬ skill è®¨è®ºæ­¤æƒ…å†µï¼‰ï¼š** `/home/bb/zed-agent/skills/<category>/<name>/SKILL.md` â€” å·²æäº¤ï¼ŒéšåŒ…ä¸€èµ·å‘å¸ƒã€‚ä½¿ç”¨ `write_file` + `git add`ã€‚`skill_manage(action='create')` **ä¸**é’ˆå¯¹æ­¤ç›®å½•æ ‘ã€‚

## ä½¿ç”¨æ—¶æœº

- ç”¨æˆ·è¦æ±‚ä½ "åœ¨æ­¤åˆ†æ”¯ / ä»“åº“ / æäº¤ä¸­"æ·»åŠ ä¸€ä¸ª skill
- ä½ æ­£åœ¨æäº¤ä¸€ä¸ªåº”éš zed-agent ä¸€èµ·å‘å¸ƒçš„å¯å¤ç”¨å·¥ä½œæµ
- ä½ æ­£åœ¨ç¼–è¾‘ `/home/bb/zed-agent/skills/` ä¸‹çš„çŽ°æœ‰ skillï¼ˆå°æ”¹åŠ¨ç”¨ `patch`ï¼Œé‡å†™ç”¨ `write_file`ï¼›`skill_manage` å¯¹ä»“åº“å†… skill çš„ `patch` ä»æœ‰æ•ˆï¼Œä½† `create` æ— æ•ˆï¼‰

## å¿…éœ€çš„ Frontmatter

çœŸå®žæ¥æºï¼š`tools/skill_manager_tool.py::_validate_frontmatter`ã€‚ç¡¬æ€§è¦æ±‚ï¼š

- ä»¥ `---` ä½œä¸ºé¦–å­—èŠ‚å¼€å¤´ï¼ˆæ— å‰å¯¼ç©ºè¡Œï¼‰ã€‚
- åœ¨æ­£æ–‡å‰ä»¥ `\n---\n` ç»“æŸã€‚
- å¯è§£æžä¸º YAML æ˜ å°„ã€‚
- å­˜åœ¨ `name` å­—æ®µã€‚
- å­˜åœ¨ `description` å­—æ®µï¼Œä¸” â‰¤ **1024 ä¸ªå­—ç¬¦**ï¼ˆ`MAX_DESCRIPTION_LENGTH`ï¼‰ã€‚
- å…³é—­ `---` åŽæœ‰éžç©ºæ­£æ–‡ã€‚

`skills/software-development/` ä¸‹æ¯ä¸ª skill ä½¿ç”¨çš„å¯¹ç­‰åŒ¹é…æ ¼å¼ï¼š

```yaml
---
name: my-skill-name               # å°å†™ï¼Œè¿žå­—ç¬¦ï¼Œâ‰¤64 ä¸ªå­—ç¬¦ï¼ˆMAX_NAME_LENGTHï¼‰
description: Use when <trigger>. <one-line behavior>.
version: 1.0.0
author: Zed Agent
license: MIT
metadata:
  zed:
    tags: [short, descriptive, tags]
    related_skills: [other-skill, another-skill]
---
```

`version` / `author` / `license` / `metadata` ä¸å—éªŒè¯å™¨å¼ºåˆ¶çº¦æŸï¼Œä½†æ¯ä¸ªåŒç±» skill éƒ½æœ‰è¿™äº›å­—æ®µâ€”â€”çœç•¥ä¼šä½¿ä½ çš„ skill æ˜¾å¾—æ ¼æ ¼ä¸å…¥ã€‚

## å¤§å°é™åˆ¶

- Descriptionï¼šâ‰¤ 1024 ä¸ªå­—ç¬¦ï¼ˆå¼ºåˆ¶æ‰§è¡Œï¼‰ã€‚
- å®Œæ•´ SKILL.mdï¼šâ‰¤ 100,000 ä¸ªå­—ç¬¦ï¼ˆå¼ºåˆ¶æ‰§è¡Œä¸º `MAX_SKILL_CONTENT_CHARS`ï¼Œçº¦ 36k tokenï¼‰ã€‚
- `software-development/` ä¸­çš„åŒç±» skill å¤§å°åœ¨ **8-14k å­—ç¬¦**ä¹‹é—´ã€‚ä»¥æ­¤ä¸ºç›®æ ‡èŒƒå›´ã€‚è‹¥è¶…è¿‡ 20kï¼Œè¯·æ‹†åˆ†ä¸º `references/*.md` å¹¶åœ¨ SKILL.md ä¸­å¼•ç”¨ã€‚

## å¯¹ç­‰åŒ¹é…ç»“æž„

æ¯ä¸ªä»“åº“å†… skill å¤§è‡´éµå¾ªä»¥ä¸‹ç»“æž„ï¼š

```
# <Title>

## Overview
One or two paragraphs: what and why.

## When to Use
- Bulleted triggers
- "Don't use for:" counter-triggers

## <Topic sections specific to the skill>
- Quick-reference tables are common
- Code blocks with exact commands
- Zed-specific recipes (tests via scripts/run_tests.sh, ui-tui paths, etc.)

## Common Pitfalls
Numbered list of mistakes and their fixes.

## Verification Checklist
- [ ] Checkbox list of post-action verifications

## One-Shot Recipes (optional)
Named scenarios â†’ concrete command sequences.
```

å¹¶éžæ¯ä¸ªç« èŠ‚éƒ½æ˜¯å¿…éœ€çš„ï¼Œä½† `Overview` + `When to Use` + å¯æ“ä½œæ­£æ–‡ + å¸¸è§é—®é¢˜è‡³å°‘è¦æœ‰ï¼Œskill æ‰èƒ½ä¸ŽåŒç±»çœ‹é½ã€‚

## ç›®å½•æ”¾ç½®

```
skills/<category>/<skill-name>/SKILL.md
```

ä»“åº“ä¸­çŽ°æœ‰çš„åˆ†ç±»ï¼ˆé€šè¿‡ `ls skills/` ç¡®è®¤ï¼‰ï¼š`autonomous-ai-agents`ã€`creative`ã€`data-science`ã€`devops`ã€`dogfood`ã€`email`ã€`gaming`ã€`github`ã€`leisure`ã€`mcp`ã€`media`ã€`mlops/*`ã€`note-taking`ã€`productivity`ã€`red-teaming`ã€`research`ã€`smart-home`ã€`social-media`ã€`software-development`ã€‚

é€‰æ‹©æœ€æŽ¥è¿‘çš„çŽ°æœ‰åˆ†ç±»ã€‚ä¸è¦éšæ„åˆ›å»ºæ–°çš„é¡¶çº§åˆ†ç±»ã€‚

## å·¥ä½œæµ

1. **è°ƒæŸ¥åŒç±» skill**ï¼Œä½äºŽç›®æ ‡åˆ†ç±»ä¸‹ï¼š
   ```
   ls skills/<category>/
   ```
   é˜…è¯» 2-3 ä¸ªåŒç±» SKILL.md æ–‡ä»¶ï¼Œä»¥åŒ¹é…è¯­æ°”å’Œç»“æž„ã€‚
2. **å¦‚æœ‰ç–‘é—®ï¼Œæ£€æŸ¥ `tools/skill_manager_tool.py` ä¸­çš„éªŒè¯å™¨çº¦æŸã€‚**
3. **èµ·è‰**ï¼Œä½¿ç”¨ `write_file` å†™å…¥ `skills/<category>/<name>/SKILL.md`ã€‚
4. **æœ¬åœ°éªŒè¯**ï¼š
   ```python
   import yaml, re, pathlib
   content = pathlib.Path("skills/<category>/<name>/SKILL.md").read_text()
   assert content.startswith("---")
   m = re.search(r'\n---\s*\n', content[3:])
   fm = yaml.safe_load(content[3:m.start()+3])
   assert "name" in fm and "description" in fm
   assert len(fm["description"]) <= 1024
   assert len(content) <= 100_000
   ```
5. **Git add + commit**ï¼Œåœ¨å½“å‰æ´»è·ƒåˆ†æ”¯ä¸Šã€‚
6. **æ³¨æ„ï¼š** å½“å‰ä¼šè¯çš„ skill åŠ è½½å™¨å·²ç¼“å­˜â€”â€”`skill_view` / `skills_list` åœ¨æ–°ä¼šè¯å¼€å§‹å‰ä¸ä¼šçœ‹åˆ°æ–° skillã€‚è¿™æ˜¯é¢„æœŸè¡Œä¸ºï¼Œä¸æ˜¯ bugã€‚

## äº¤å‰å¼•ç”¨å…¶ä»– Skill

`metadata.zed.related_skills` åœ¨åŠ è½½æ—¶ä¼šåˆå¹¶ä¸¤ä¸ªç›®å½•æ ‘ï¼ˆä»“åº“å†… `skills/` å’Œ `~/.zed/skills/`ï¼‰ã€‚ä½ **å¯ä»¥**ä»Žä»“åº“å†… skill å¼•ç”¨ç”¨æˆ·æœ¬åœ° skillï¼Œä½†å¯¹äºŽå…¨æ–°å…‹éš†ä»“åº“çš„å…¶ä»–ç”¨æˆ·ï¼Œè¯¥å¼•ç”¨æ— æ³•è§£æžã€‚ä»“åº“å†… skill ä¼˜å…ˆåªå¼•ç”¨ä»“åº“å†… skillã€‚å¦‚æžœæŸä¸ªé¢‘ç¹è¢«å¼•ç”¨çš„ skill ä»…å­˜åœ¨äºŽ `~/.zed/skills/`ï¼Œè¯·è€ƒè™‘å°†å…¶æå‡åˆ°ä»“åº“ä¸­ã€‚

## ç¼–è¾‘çŽ°æœ‰ä»“åº“å†… Skill

- **å°æ”¹åŠ¨ï¼ˆä¿®æ­£é”™åˆ«å­—ã€æ·»åŠ å¸¸è§é—®é¢˜ã€æ”¶ç´§è§¦å‘æ¡ä»¶ï¼‰ï¼š** `skill_manage(action='patch', name=..., old_string=..., new_string=...)` å¯¹ä»“åº“å†… skill åŒæ ·æœ‰æ•ˆã€‚
- **å¤§è§„æ¨¡é‡å†™ï¼š** ä½¿ç”¨ `write_file` å†™å…¥å®Œæ•´ SKILL.mdã€‚`skill_manage(action='edit')` ä¹Ÿå¯ä»¥ï¼Œä½†éœ€è¦æä¾›å®Œæ•´çš„æ–°å†…å®¹ã€‚
- **æ·»åŠ æ”¯æŒæ–‡ä»¶ï¼š** ä½¿ç”¨ `write_file` å†™å…¥ `skills/<category>/<name>/references/<file>.md`ã€`templates/<file>` æˆ– `scripts/<file>`ã€‚`skill_manage(action='write_file')` ä¹Ÿå¯ä»¥ï¼Œå¹¶ä¼šå¼ºåˆ¶æ‰§è¡Œ references/templates/scripts/assets å­ç›®å½•ç™½åå•ã€‚
- **å§‹ç»ˆæäº¤**ç¼–è¾‘â€”â€”ä»“åº“å†… skill æ˜¯æºç ï¼Œä¸æ˜¯è¿è¡Œæ—¶çŠ¶æ€ã€‚

## å¸¸è§é—®é¢˜

1. **å¯¹ä»“åº“å†… skill ä½¿ç”¨ `skill_manage(action='create')`ã€‚** å®ƒä¼šå†™å…¥ `~/.zed/skills/`ï¼Œè€Œéžä»“åº“ç›®å½•æ ‘ã€‚ä»“åº“å†…åˆ›å»ºè¯·ä½¿ç”¨ `write_file`ã€‚

2. **`---` å‰æœ‰å‰å¯¼ç©ºç™½ã€‚** éªŒè¯å™¨æ£€æŸ¥ `content.startswith("---")`ï¼›ä»»ä½•å‰å¯¼ç©ºè¡Œæˆ– BOM éƒ½ä¼šå¯¼è‡´éªŒè¯å¤±è´¥ã€‚

3. **Description è¿‡äºŽæ³›æ³›ã€‚** åŒç±» skill çš„ description ä»¥"Use when ..."å¼€å¤´ï¼Œæè¿°çš„æ˜¯*è§¦å‘ç±»åˆ«*ï¼Œè€Œéžå•ä¸€ä»»åŠ¡ã€‚"Use when debugging X" ä¼˜äºŽ "Debug X"ã€‚

4. **å¿˜è®°æ·»åŠ  author/license/metadata å—ã€‚** éªŒè¯å™¨ä¸å¼ºåˆ¶è¦æ±‚ï¼Œä½†æ¯ä¸ªåŒç±» skill éƒ½æœ‰ï¼›çœç•¥ä¼šä½¿ skill çœ‹èµ·æ¥æœªå®Œæˆã€‚

5. **ç¼–å†™äº†ä¸ŽåŒç±»é‡å¤çš„ skillã€‚** åˆ›å»ºå‰å…ˆæ‰§è¡Œ `ls skills/<category>/` å¹¶æ‰“å¼€ 2-3 ä¸ªåŒç±» skillã€‚ä¼˜å…ˆæ‰©å±•çŽ°æœ‰ skillï¼Œè€Œéžåˆ›å»ºåŠŸèƒ½ç‹­çª„çš„å…„å¼Ÿ skillã€‚

6. **æœŸæœ›å½“å‰ä¼šè¯èƒ½çœ‹åˆ°æ–° skillã€‚** ä¸ä¼šã€‚skill åŠ è½½å™¨åœ¨ä¼šè¯å¼€å§‹æ—¶åˆå§‹åŒ–ã€‚è¯·åœ¨æ–°ä¼šè¯ä¸­éªŒè¯ï¼Œæˆ–é€šè¿‡ `skill_view` ä½¿ç”¨ç²¾ç¡®è·¯å¾„è¿›è¡ŒéªŒè¯ã€‚

7. **é“¾æŽ¥åˆ°ä»“åº“ä¸­ä¸å­˜åœ¨çš„ skillã€‚** `related_skills: [some-user-local-skill]` å¯¹ä½ æœ‰æ•ˆï¼Œä½†å¯¹å…¶ä»–å…‹éš†ç”¨æˆ·ä¼šå¤±æ•ˆã€‚ä¼˜å…ˆåªä½¿ç”¨ä»“åº“å†…é“¾æŽ¥ã€‚

## éªŒè¯æ¸…å•

- [ ] æ–‡ä»¶ä½äºŽ `skills/<category>/<name>/SKILL.md`ï¼ˆä¸åœ¨ `~/.zed/skills/` ä¸­ï¼‰
- [ ] Frontmatter ä»Žå­—èŠ‚ 0 ä»¥ `---` å¼€å¤´ï¼Œä»¥ `\n---\n` ç»“æŸ
- [ ] `name`ã€`description`ã€`version`ã€`author`ã€`license`ã€`metadata.zed.{tags, related_skills}` å‡å·²å¡«å†™
- [ ] Name â‰¤ 64 ä¸ªå­—ç¬¦ï¼Œå°å†™åŠ è¿žå­—ç¬¦
- [ ] Description â‰¤ 1024 ä¸ªå­—ç¬¦ï¼Œä¸”ä»¥"Use when ..."å¼€å¤´
- [ ] æ–‡ä»¶æ€»å¤§å° â‰¤ 100,000 ä¸ªå­—ç¬¦ï¼ˆç›®æ ‡ 8-15kï¼‰
- [ ] ç»“æž„ï¼š`# Title` â†’ `## Overview` â†’ `## When to Use` â†’ æ­£æ–‡ â†’ `## Common Pitfalls` â†’ `## Verification Checklist`
- [ ] `related_skills` ä¸­çš„å¼•ç”¨åœ¨ä»“åº“å†…å¯è§£æžï¼ˆæˆ–æ˜Žç¡®å…è®¸ä¸ºç”¨æˆ·æœ¬åœ°ï¼‰
- [ ] å·²åœ¨ç›®æ ‡åˆ†æ”¯ä¸Šå®Œæˆ `git add skills/<category>/<name>/ && git commit`
