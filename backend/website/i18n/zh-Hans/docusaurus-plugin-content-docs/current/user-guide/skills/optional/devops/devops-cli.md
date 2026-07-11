---
title: "Inference Sh Cli â€” é€šè¿‡ inference è¿è¡Œ 150+ AI åº”ç”¨"
sidebar_label: "Inference Sh Cli"
description: "é€šè¿‡ inference è¿è¡Œ 150+ AI åº”ç”¨"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Inference Sh Cli

é€šè¿‡ inference.sh CLIï¼ˆinfshï¼‰è¿è¡Œ 150+ AI åº”ç”¨â€”â€”å›¾åƒç”Ÿæˆã€è§†é¢‘åˆ›ä½œã€LLMã€æœç´¢ã€3Dã€ç¤¾äº¤è‡ªåŠ¨åŒ–ã€‚ä½¿ç”¨ç»ˆç«¯å·¥å…·ã€‚è§¦å‘è¯ï¼šinference.shã€infshã€ai appsã€fluxã€veoã€image generationã€video generationã€seedreamã€seedanceã€tavily

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰â€”â€”ä½¿ç”¨ `zed skills install official/devops/cli` å®‰è£… |
| è·¯å¾„ | `optional-skills/devops/cli` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | okaris |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `AI`, `image-generation`, `video`, `LLM`, `search`, `inference`, `FLUX`, `Veo`, `Claude` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è¯¥ skill è¢«è§¦å‘æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# inference.sh CLI

é€šè¿‡ç®€å•çš„ CLI åœ¨äº‘ç«¯è¿è¡Œ 150+ AI åº”ç”¨ã€‚æ— éœ€ GPUã€‚

æ‰€æœ‰å‘½ä»¤å‡ä½¿ç”¨**ç»ˆç«¯å·¥å…·**æ¥è¿è¡Œ `infsh` å‘½ä»¤ã€‚

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¦æ±‚ç”Ÿæˆå›¾åƒï¼ˆFLUXã€Reveã€Seedreamã€Grokã€Gemini imageï¼‰
- ç”¨æˆ·è¦æ±‚ç”Ÿæˆè§†é¢‘ï¼ˆVeoã€Wanã€Seedanceã€OmniHumanï¼‰
- ç”¨æˆ·è¯¢é—® inference.sh æˆ– infsh
- ç”¨æˆ·å¸Œæœ›è¿è¡Œ AI åº”ç”¨è€Œæ— éœ€ç®¡ç†å„ä¸ªæä¾›å•†çš„ API
- ç”¨æˆ·è¦æ±‚ AI é©±åŠ¨çš„æœç´¢ï¼ˆTavilyã€Exaï¼‰
- ç”¨æˆ·éœ€è¦ç”Ÿæˆå¤´åƒ/å£åž‹åŒæ­¥

## å‰ç½®æ¡ä»¶

`infsh` CLI å¿…é¡»å·²å®‰è£…å¹¶å®Œæˆè®¤è¯ã€‚ä½¿ç”¨ä»¥ä¸‹å‘½ä»¤æ£€æŸ¥ï¼š

```bash
infsh me
```

å¦‚æœªå®‰è£…ï¼š

```bash
curl -fsSL https://cli.inference.sh | sh
infsh login
```

å®Œæ•´å®‰è£…è¯¦æƒ…è¯·å‚é˜… `references/authentication.md`ã€‚

## å·¥ä½œæµç¨‹

### 1. å§‹ç»ˆå…ˆæœç´¢

ä¸è¦çŒœæµ‹åº”ç”¨åç§°â€”â€”å§‹ç»ˆé€šè¿‡æœç´¢æ‰¾åˆ°æ­£ç¡®çš„åº”ç”¨ IDï¼š

```bash
infsh app list --search flux
infsh app list --search video
infsh app list --search image
```

### 2. è¿è¡Œåº”ç”¨

ä½¿ç”¨æœç´¢ç»“æžœä¸­çš„ç²¾ç¡®åº”ç”¨ IDã€‚å§‹ç»ˆä½¿ç”¨ `--json` èŽ·å–æœºå™¨å¯è¯»çš„è¾“å‡ºï¼š

```bash
infsh app run <app-id> --input '{"prompt": "your prompt here"}' --json
```

### 3. è§£æžè¾“å‡º

JSON è¾“å‡ºåŒ…å«æŒ‡å‘ç”Ÿæˆåª’ä½“çš„ URLã€‚ä½¿ç”¨ `MEDIA:<url>` æ ¼å¼å°†å…¶å‘ˆçŽ°ç»™ç”¨æˆ·ä»¥å†…è”æ˜¾ç¤ºã€‚

## å¸¸ç”¨å‘½ä»¤

### å›¾åƒç”Ÿæˆ

```bash
# æœç´¢å›¾åƒåº”ç”¨
infsh app list --search image

# FLUX Dev with LoRA
infsh app run falai/flux-dev-lora --input '{"prompt": "sunset over mountains", "num_images": 1}' --json

# Gemini å›¾åƒç”Ÿæˆ
infsh app run google/gemini-2-5-flash-image --input '{"prompt": "futuristic city", "num_images": 1}' --json

# Seedream (ByteDance)
infsh app run bytedance/seedream-5-lite --input '{"prompt": "nature scene"}' --json

# Grok Imagine (xAI)
infsh app run xai/grok-imagine-image --input '{"prompt": "abstract art"}' --json
```

### è§†é¢‘ç”Ÿæˆ

```bash
# æœç´¢è§†é¢‘åº”ç”¨
infsh app list --search video

# Veo 3.1 (Google)
infsh app run google/veo-3-1-fast --input '{"prompt": "drone shot of coastline"}' --json

# Seedance (ByteDance)
infsh app run bytedance/seedance-1-5-pro --input '{"prompt": "dancing figure", "resolution": "1080p"}' --json

# Wan 2.5
infsh app run falai/wan-2-5 --input '{"prompt": "person walking through city"}' --json
```

### æœ¬åœ°æ–‡ä»¶ä¸Šä¼ 

CLI ä¼šåœ¨æä¾›è·¯å¾„æ—¶è‡ªåŠ¨ä¸Šä¼ æœ¬åœ°æ–‡ä»¶ï¼š

```bash
# æ”¾å¤§æœ¬åœ°å›¾åƒ
infsh app run falai/topaz-image-upscaler --input '{"image": "/path/to/photo.jpg", "upscale_factor": 2}' --json

# ä»Žæœ¬åœ°æ–‡ä»¶ç”Ÿæˆå›¾ç”Ÿè§†é¢‘
infsh app run falai/wan-2-5-i2v --input '{"image": "/path/to/image.png", "prompt": "make it move"}' --json

# å¸¦éŸ³é¢‘çš„å¤´åƒ
infsh app run bytedance/omnihuman-1-5 --input '{"audio": "/path/to/audio.mp3", "image": "/path/to/face.jpg"}' --json
```

### æœç´¢ä¸Žç ”ç©¶

```bash
infsh app list --search search
infsh app run tavily/tavily-search --input '{"query": "latest AI news"}' --json
infsh app run exa/exa-search --input '{"query": "machine learning papers"}' --json
```

### å…¶ä»–ç±»åˆ«

```bash
# 3D ç”Ÿæˆ
infsh app list --search 3d

# éŸ³é¢‘ / TTS
infsh app list --search tts

# Twitter/X è‡ªåŠ¨åŒ–
infsh app list --search twitter
```

## æ³¨æ„äº‹é¡¹

1. **ä¸è¦çŒœæµ‹åº”ç”¨ ID**â€”â€”å§‹ç»ˆå…ˆè¿è¡Œ `infsh app list --search <term>`ã€‚åº”ç”¨ ID ä¼šå˜æ›´ï¼Œæ–°åº”ç”¨ä¹Ÿä¼šé¢‘ç¹æ·»åŠ ã€‚
2. **å§‹ç»ˆä½¿ç”¨ `--json`**â€”â€”åŽŸå§‹è¾“å‡ºéš¾ä»¥è§£æžã€‚`--json` æ ‡å¿—æä¾›åŒ…å« URL çš„ç»“æž„åŒ–è¾“å‡ºã€‚
3. **æ£€æŸ¥è®¤è¯çŠ¶æ€**â€”â€”å¦‚æžœå‘½ä»¤å› è®¤è¯é”™è¯¯å¤±è´¥ï¼Œè¯·è¿è¡Œ `infsh login` æˆ–ç¡®è®¤ `INFSH_API_KEY` å·²è®¾ç½®ã€‚
4. **é•¿æ—¶é—´è¿è¡Œçš„åº”ç”¨**â€”â€”è§†é¢‘ç”Ÿæˆå¯èƒ½éœ€è¦ 30-120 ç§’ã€‚ç»ˆç«¯å·¥å…·çš„è¶…æ—¶æ—¶é—´åº”è¯¥è¶³å¤Ÿï¼Œä½†è¯·æå‰å‘ŠçŸ¥ç”¨æˆ·å¯èƒ½éœ€è¦ç­‰å¾…ç‰‡åˆ»ã€‚
5. **è¾“å…¥æ ¼å¼**â€”â€”`--input` æ ‡å¿—æŽ¥å— JSON å­—ç¬¦ä¸²ã€‚è¯·ç¡®ä¿æ­£ç¡®è½¬ä¹‰å¼•å·ã€‚

## å‚è€ƒæ–‡æ¡£

- `references/authentication.md` â€” å®‰è£…ã€ç™»å½•ã€API å¯†é’¥
- `references/app-discovery.md` â€” æœç´¢å’Œæµè§ˆåº”ç”¨ç›®å½•
- `references/running-apps.md` â€” è¿è¡Œåº”ç”¨ã€è¾“å…¥æ ¼å¼ã€è¾“å‡ºå¤„ç†
- `references/cli-reference.md` â€” å®Œæ•´ CLI å‘½ä»¤å‚è€ƒ
