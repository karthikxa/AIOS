---
title: "Nano Pdf â€” é€šè¿‡ nano-pdf CLI ç¼–è¾‘ PDF æ–‡æœ¬/é”™åˆ«å­—/æ ‡é¢˜ï¼ˆè‡ªç„¶è¯­è¨€ promptï¼‰"
sidebar_label: "Nano Pdf"
description: "é€šè¿‡ nano-pdf CLI ç¼–è¾‘ PDF æ–‡æœ¬/é”™åˆ«å­—/æ ‡é¢˜ï¼ˆè‡ªç„¶è¯­è¨€ promptï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Nano Pdf

é€šè¿‡ nano-pdf CLI ç¼–è¾‘ PDF æ–‡æœ¬/é”™åˆ«å­—/æ ‡é¢˜ï¼ˆè‡ªç„¶è¯­è¨€ promptï¼ˆæç¤ºè¯ï¼‰ï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/productivity/nano-pdf` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `PDF`, `Documents`, `Editing`, `NLP`, `Productivity` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# nano-pdf

ä½¿ç”¨è‡ªç„¶è¯­è¨€æŒ‡ä»¤ç¼–è¾‘ PDFã€‚æŒ‡å®šé¡µé¢å¹¶æè¿°éœ€è¦ä¿®æ”¹çš„å†…å®¹ã€‚

## å‰ç½®æ¡ä»¶

```bash
# Install with uv (recommended â€” already available in Zed)
uv pip install nano-pdf

# Or with pip
pip install nano-pdf
```

## ç”¨æ³•

```bash
nano-pdf edit <file.pdf> <page_number> "<instruction>"
```

## ç¤ºä¾‹

```bash
# Change a title on page 1
nano-pdf edit deck.pdf 1 "Change the title to 'Q3 Results' and fix the typo in the subtitle"

# Update a date on a specific page
nano-pdf edit report.pdf 3 "Update the date from January to February 2026"

# Fix content
nano-pdf edit contract.pdf 2 "Change the client name from 'Acme Corp' to 'Acme Industries'"
```

## æ³¨æ„äº‹é¡¹

- é¡µç å¯èƒ½ä»Ž 0 æˆ– 1 å¼€å§‹ï¼Œå…·ä½“å–å†³äºŽç‰ˆæœ¬â€”â€”å¦‚æžœç¼–è¾‘å‘½ä¸­äº†é”™è¯¯çš„é¡µé¢ï¼Œè¯·ç”¨ Â±1 é‡è¯•
- ç¼–è¾‘åŽåŠ¡å¿…éªŒè¯è¾“å‡ºçš„ PDFï¼ˆä½¿ç”¨ `read_file` æ£€æŸ¥æ–‡ä»¶å¤§å°ï¼Œæˆ–ç›´æŽ¥æ‰“å¼€æŸ¥çœ‹ï¼‰
- è¯¥å·¥å…·åº•å±‚ä½¿ç”¨ LLMâ€”â€”éœ€è¦ API å¯†é’¥ï¼ˆè¿è¡Œ `nano-pdf --help` æŸ¥çœ‹é…ç½®è¯´æ˜Žï¼‰
- é€‚åˆæ–‡æœ¬å†…å®¹ä¿®æ”¹ï¼›å¤æ‚çš„ç‰ˆå¼è°ƒæ•´å¯èƒ½éœ€è¦å…¶ä»–æ–¹æ¡ˆ