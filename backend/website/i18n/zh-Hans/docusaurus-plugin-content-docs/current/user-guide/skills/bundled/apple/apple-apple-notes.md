---
title: "Apple Notes â€” é€šè¿‡ memo CLI ç®¡ç† Apple Notesï¼šåˆ›å»ºã€æœç´¢ã€ç¼–è¾‘"
sidebar_label: "Apple Notes"
description: "é€šè¿‡ memo CLI ç®¡ç† Apple Notesï¼šåˆ›å»ºã€æœç´¢ã€ç¼–è¾‘"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Apple Notes

é€šè¿‡ memo CLI ç®¡ç† Apple Notesï¼šåˆ›å»ºã€æœç´¢ã€ç¼–è¾‘ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/apple/apple-notes` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | macos |
| æ ‡ç­¾ | `Notes`, `Apple`, `macOS`, `note-taking` |
| ç›¸å…³ skill | [`obsidian`](/user-guide/skills/bundled/note-taking/note-taking-obsidian) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Apple Notes

ä½¿ç”¨ `memo` ç›´æŽ¥ä»Žç»ˆç«¯ç®¡ç† Apple Notesã€‚ç¬”è®°é€šè¿‡ iCloud åœ¨æ‰€æœ‰ Apple è®¾å¤‡é—´åŒæ­¥ã€‚

## å‰ç½®æ¡ä»¶

- **macOS** å¹¶å®‰è£… Notes.app
- å®‰è£…ï¼š`brew tap antoniorodr/memo && brew install antoniorodr/memo/memo`
- åœ¨æç¤ºæ—¶æŽˆäºˆ Notes.app çš„è‡ªåŠ¨åŒ–è®¿é—®æƒé™ï¼ˆç³»ç»Ÿè®¾ç½® â†’ éšç§ â†’ è‡ªåŠ¨åŒ–ï¼‰

## ä½¿ç”¨æ—¶æœº

- ç”¨æˆ·è¦æ±‚åˆ›å»ºã€æŸ¥çœ‹æˆ–æœç´¢ Apple Notes
- å°†ä¿¡æ¯ä¿å­˜åˆ° Notes.app ä»¥å®žçŽ°è·¨è®¾å¤‡è®¿é—®
- å°†ç¬”è®°æ•´ç†åˆ°æ–‡ä»¶å¤¹ä¸­
- å°†ç¬”è®°å¯¼å‡ºä¸º Markdown/HTML

## ä¸é€‚ç”¨æ—¶æœº

- Obsidian vault ç®¡ç† â†’ ä½¿ç”¨ `obsidian` skill
- Bear Notes â†’ ç‹¬ç«‹åº”ç”¨ï¼ˆæ­¤å¤„ä¸æ”¯æŒï¼‰
- ä»…ä¾› agent å†…éƒ¨ä½¿ç”¨çš„å¿«é€Ÿç¬”è®° â†’ æ”¹ç”¨ `memory` å·¥å…·

## å¿«é€Ÿå‚è€ƒ

### æŸ¥çœ‹ç¬”è®°

```bash
memo notes                        # åˆ—å‡ºæ‰€æœ‰ç¬”è®°
memo notes -f "Folder Name"       # æŒ‰æ–‡ä»¶å¤¹ç­›é€‰
memo notes -s "query"             # æœç´¢ç¬”è®°ï¼ˆæ¨¡ç³ŠåŒ¹é…ï¼‰
```

### åˆ›å»ºç¬”è®°

```bash
memo notes -a                     # äº¤äº’å¼ç¼–è¾‘å™¨
memo notes -a "Note Title"        # å¿«é€Ÿæ·»åŠ å¹¶æŒ‡å®šæ ‡é¢˜
```

### ç¼–è¾‘ç¬”è®°

```bash
memo notes -e                     # äº¤äº’å¼é€‰æ‹©å¹¶ç¼–è¾‘
```

### åˆ é™¤ç¬”è®°

```bash
memo notes -d                     # äº¤äº’å¼é€‰æ‹©å¹¶åˆ é™¤
```

### ç§»åŠ¨ç¬”è®°

```bash
memo notes -m                     # å°†ç¬”è®°ç§»åŠ¨åˆ°æ–‡ä»¶å¤¹ï¼ˆäº¤äº’å¼ï¼‰
```

### å¯¼å‡ºç¬”è®°

```bash
memo notes -ex                    # å¯¼å‡ºä¸º HTML/Markdown
```

## é™åˆ¶

- æ— æ³•ç¼–è¾‘åŒ…å«å›¾ç‰‡æˆ–é™„ä»¶çš„ç¬”è®°
- äº¤äº’å¼æç¤ºéœ€è¦ç»ˆç«¯è®¿é—®æƒé™ï¼ˆå¦‚æœ‰éœ€è¦è¯·ä½¿ç”¨ pty=trueï¼‰
- ä»…é™ macOS â€” éœ€è¦ Apple Notes.app

## è§„åˆ™

1. å½“ç”¨æˆ·éœ€è¦è·¨è®¾å¤‡åŒæ­¥ï¼ˆiPhone/iPad/Macï¼‰æ—¶ï¼Œä¼˜å…ˆä½¿ç”¨ Apple Notes
2. å¯¹ä¸éœ€è¦åŒæ­¥çš„ agent å†…éƒ¨ç¬”è®°ï¼Œä½¿ç”¨ `memory` å·¥å…·
3. å¯¹ä»¥ Markdown ä¸ºæ ¸å¿ƒçš„çŸ¥è¯†ç®¡ç†ï¼Œä½¿ç”¨ `obsidian` skill