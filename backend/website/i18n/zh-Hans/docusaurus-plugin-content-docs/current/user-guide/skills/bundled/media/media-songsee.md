---
title: "Songsee â€” é€šè¿‡ CLI ç”ŸæˆéŸ³é¢‘é¢‘è°±å›¾/ç‰¹å¾ï¼ˆmelã€chromaã€MFCCï¼‰"
sidebar_label: "Songsee"
description: "é€šè¿‡ CLI ç”ŸæˆéŸ³é¢‘é¢‘è°±å›¾/ç‰¹å¾ï¼ˆmelã€chromaã€MFCCï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Songsee

é€šè¿‡ CLI ç”ŸæˆéŸ³é¢‘é¢‘è°±å›¾/ç‰¹å¾ï¼ˆmelã€chromaã€MFCCï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/media/songsee` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Audio`, `Visualization`, `Spectrogram`, `Music`, `Analysis` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# songsee

ä»ŽéŸ³é¢‘æ–‡ä»¶ç”Ÿæˆé¢‘è°±å›¾ï¼ˆspectrogramï¼‰åŠå¤šé¢æ¿éŸ³é¢‘ç‰¹å¾å¯è§†åŒ–å›¾ã€‚

## å‰ç½®æ¡ä»¶

éœ€è¦å®‰è£… [Go](https://go.dev/doc/install)ï¼š
```bash
go install github.com/steipete/songsee/cmd/songsee@latest
```

å¯é€‰ï¼šå®‰è£… `ffmpeg` ä»¥æ”¯æŒ WAV/MP3 ä»¥å¤–çš„æ ¼å¼ã€‚

## å¿«é€Ÿå¼€å§‹

```bash
# åŸºæœ¬é¢‘è°±å›¾
songsee track.mp3

# ä¿å­˜åˆ°æŒ‡å®šæ–‡ä»¶
songsee track.mp3 -o spectrogram.png

# å¤šé¢æ¿å¯è§†åŒ–ç½‘æ ¼
songsee track.mp3 --viz spectrogram,mel,chroma,hpss,selfsim,loudness,tempogram,mfcc,flux

# æ—¶é—´åˆ‡ç‰‡ï¼ˆä»Ž 12.5s å¼€å§‹ï¼ŒæŒç»­ 8sï¼‰
songsee track.mp3 --start 12.5 --duration 8 -o slice.jpg

# ä»Ž stdin è¯»å–
cat track.mp3 | songsee - --format png -o out.png
```

## å¯è§†åŒ–ç±»åž‹

ä½¿ç”¨ `--viz` å¹¶ä»¥é€—å·åˆ†éš”å¤šä¸ªå€¼ï¼š

| ç±»åž‹ | æè¿° |
|------|-------------|
| `spectrogram` | æ ‡å‡†é¢‘çŽ‡é¢‘è°±å›¾ |
| `mel` | Mel å°ºåº¦é¢‘è°±å›¾ |
| `chroma` | éŸ³é«˜ç±»åˆ«åˆ†å¸ƒ |
| `hpss` | è°æ³¢/æ‰“å‡»ä¹åˆ†ç¦» |
| `selfsim` | è‡ªç›¸ä¼¼çŸ©é˜µ |
| `loudness` | éšæ—¶é—´å˜åŒ–çš„å“åº¦ |
| `tempogram` | èŠ‚æ‹ä¼°è®¡ |
| `mfcc` | Mel é¢‘çŽ‡å€’è°±ç³»æ•° |
| `flux` | é¢‘è°±é€šé‡ï¼ˆèµ·å§‹ç‚¹æ£€æµ‹ï¼‰ |

å¤šä¸ª `--viz` ç±»åž‹å°†ä»¥ç½‘æ ¼å½¢å¼æ¸²æŸ“ä¸ºå•å¼ å›¾åƒã€‚

## å¸¸ç”¨æ ‡å¿—

| æ ‡å¿— | æè¿° |
|------|-------------|
| `--viz` | å¯è§†åŒ–ç±»åž‹ï¼ˆé€—å·åˆ†éš”ï¼‰ |
| `--style` | è‰²å½©è°ƒè‰²æ¿ï¼š`classic`ã€`magma`ã€`inferno`ã€`viridis`ã€`gray` |
| `--width` / `--height` | è¾“å‡ºå›¾åƒå°ºå¯¸ |
| `--window` / `--hop` | FFT çª—å£å’Œè·³è·ƒå¤§å° |
| `--min-freq` / `--max-freq` | é¢‘çŽ‡èŒƒå›´è¿‡æ»¤ |
| `--start` / `--duration` | éŸ³é¢‘æ—¶é—´åˆ‡ç‰‡ |
| `--format` | è¾“å‡ºæ ¼å¼ï¼š`jpg` æˆ– `png` |
| `-o` | è¾“å‡ºæ–‡ä»¶è·¯å¾„ |

## æ³¨æ„äº‹é¡¹

- WAV å’Œ MP3 åŽŸç”Ÿè§£ç ï¼›å…¶ä»–æ ¼å¼éœ€è¦ `ffmpeg`
- è¾“å‡ºå›¾åƒå¯ä½¿ç”¨ `vision_analyze` è¿›è¡Œæ£€æŸ¥ï¼Œä»¥å®žçŽ°è‡ªåŠ¨åŒ–éŸ³é¢‘åˆ†æž
- é€‚ç”¨äºŽæ¯”è¾ƒéŸ³é¢‘è¾“å‡ºã€è°ƒè¯•åˆæˆè¿‡ç¨‹æˆ–è®°å½•éŸ³é¢‘å¤„ç†æµæ°´çº¿