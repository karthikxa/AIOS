---
title: "Hyperframes"
sidebar_label: "Hyperframes"
description: "ä½¿ç”¨ HyperFrames åˆ›å»ºåŸºäºŽ HTML çš„è§†é¢‘åˆæˆã€åŠ¨ç”»æ ‡é¢˜å¡ã€ç¤¾äº¤å åŠ å±‚ã€å¸¦å­—å¹•çš„å¯¹è¯è§†é¢‘ã€éŸ³é¢‘å“åº”è§†è§‰æ•ˆæžœå’Œç€è‰²å™¨è½¬åœº..."
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Hyperframes

ä½¿ç”¨ HyperFrames åˆ›å»ºåŸºäºŽ HTML çš„è§†é¢‘åˆæˆã€åŠ¨ç”»æ ‡é¢˜å¡ã€ç¤¾äº¤å åŠ å±‚ã€å¸¦å­—å¹•çš„å¯¹è¯è§†é¢‘ã€éŸ³é¢‘å“åº”è§†è§‰æ•ˆæžœå’Œç€è‰²å™¨è½¬åœºã€‚HTML æ˜¯è§†é¢‘çš„å”¯ä¸€çœŸå®žæ¥æºã€‚å½“ç”¨æˆ·éœ€è¦ä»Ž HTML åˆæˆæ¸²æŸ“ MP4/WebMã€åœ¨åª’ä½“ä¸Šæ·»åŠ æ–‡å­—/Logo/å›¾è¡¨åŠ¨ç”»ã€å°†å­—å¹•ä¸ŽéŸ³é¢‘åŒæ­¥ã€éœ€è¦ TTS æ—ç™½ï¼Œæˆ–å°†ç½‘ç«™è½¬æ¢ä¸ºè§†é¢‘æ—¶ä½¿ç”¨æœ¬æŠ€èƒ½ã€‚

## æŠ€èƒ½å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/creative/hyperframes` å®‰è£… |
| è·¯å¾„ | `optional-skills/creative/hyperframes` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | heygen-com |
| è®¸å¯è¯ | Apache-2.0 |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `creative`, `video`, `animation`, `html`, `gsap`, `motion-graphics` |
| ç›¸å…³æŠ€èƒ½ | [`manim-video`](/user-guide/skills/bundled/creative/creative-manim-video), [`meme-generation`](/user-guide/skills/optional/creative/creative-meme-generation) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æœ¬æŠ€èƒ½æ—¶åŠ è½½çš„å®Œæ•´æŠ€èƒ½å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨æŠ€èƒ½æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# HyperFrames

HTML æ˜¯è§†é¢‘çš„å”¯ä¸€çœŸå®žæ¥æºã€‚åˆæˆï¼ˆcompositionï¼‰æ˜¯ä¸€ä¸ªå¸¦æœ‰ `data-*` å±žæ€§ç”¨äºŽè®¡æ—¶ã€GSAP æ—¶é—´è½´ç”¨äºŽåŠ¨ç”»ã€CSS ç”¨äºŽå¤–è§‚çš„ HTML æ–‡ä»¶ã€‚HyperFrames å¼•æ“Žé€å¸§æ•èŽ·é¡µé¢ï¼Œå¹¶é€šè¿‡ FFmpeg ç¼–ç ä¸º MP4/WebMã€‚

**ä¸Ž `manim-video` çš„äº’è¡¥å…³ç³»ï¼š** æ•°å­¦/å‡ ä½•è®²è§£ï¼ˆæ–¹ç¨‹å¼ã€3B1B é£Žæ ¼ï¼‰ä½¿ç”¨ `manim-video`ã€‚åŠ¨æ€å›¾å½¢ã€å¸¦å­—å¹•çš„å¯¹è¯è§†é¢‘ã€äº§å“æ¼”ç¤ºã€ç¤¾äº¤å åŠ å±‚ã€ç€è‰²å™¨è½¬åœºï¼Œä»¥åŠä»»ä½•ç”±çœŸå®žè§†é¢‘/éŸ³é¢‘åª’ä½“é©±åŠ¨çš„å†…å®¹ä½¿ç”¨ `hyperframes`ã€‚

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¦æ±‚ä»Žæ–‡æœ¬ã€è„šæœ¬æˆ–ç½‘ç«™æ¸²æŸ“è§†é¢‘
- åŠ¨ç”»æ ‡é¢˜å¡ã€ä¸‹ä¸‰åˆ†ä¹‹ä¸€å­—å¹•æ¡æˆ–æŽ’ç‰ˆç‰‡å¤´
- å¸¦å­—å¹•çš„æ—ç™½è§†é¢‘ï¼ˆTTS + å­—å¹•ä¸Žæ³¢å½¢åŒæ­¥ï¼‰
- éŸ³é¢‘å“åº”è§†è§‰æ•ˆæžœï¼ˆèŠ‚æ‹åŒæ­¥ã€é¢‘è°±æ¡ã€è„‰å†²å‘å…‰ï¼‰
- åœºæ™¯é—´è½¬åœºï¼ˆäº¤å‰æ·¡å…¥æ·¡å‡ºã€åˆ’åƒã€ç€è‰²å™¨æ‰­æ›²ã€é—ªç™½ï¼‰
- ç¤¾äº¤å åŠ å±‚ï¼ˆInstagram/TikTok/YouTube é£Žæ ¼ï¼‰
- ç½‘ç«™è½¬è§†é¢‘æµç¨‹ï¼ˆæ•èŽ· URLï¼Œç”Ÿæˆå®£ä¼ ç‰‡ï¼‰
- ä»»ä½•éœ€è¦ç¡®å®šæ€§æ¸²æŸ“ä¸ºè§†é¢‘æ–‡ä»¶çš„ HTML/CSS/JS åŠ¨ç”»

**ä¸é€‚ç”¨**æœ¬æŠ€èƒ½çš„åœºæ™¯ï¼š
- çº¯æ•°å­¦/æ–¹ç¨‹å¼åŠ¨ç”»ï¼ˆâ†’ `manim-video`ï¼‰
- å›¾åƒç”Ÿæˆæˆ–è¡¨æƒ…åŒ…ï¼ˆâ†’ `meme-generation`ï¼Œå›¾åƒæ¨¡åž‹ï¼‰
- å®žæ—¶è§†é¢‘ä¼šè®®æˆ–ç›´æ’­

## å¿«é€Ÿå‚è€ƒ

```bash
npx hyperframes init my-video               # åˆå§‹åŒ–é¡¹ç›®è„šæ‰‹æž¶
cd my-video
npx hyperframes lint                        # é¢„è§ˆ/æ¸²æŸ“å‰éªŒè¯
npx hyperframes preview                     # å®žæ—¶çƒ­é‡è½½æµè§ˆå™¨é¢„è§ˆï¼ˆç«¯å£ 3002ï¼‰
npx hyperframes render --output final.mp4   # æ¸²æŸ“ä¸º MP4
npx hyperframes doctor                      # è¯Šæ–­çŽ¯å¢ƒé—®é¢˜
```

æ¸²æŸ“å‚æ•°ï¼š`--quality draft|standard|high` Â· `--fps 24|30|60` Â· `--format mp4|webm` Â· `--docker`ï¼ˆå¯å¤çŽ°ï¼‰Â· `--strict`ã€‚

å®Œæ•´ CLI å‚è€ƒï¼š[references/cli.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/cli.md)ã€‚

## åˆå§‹è®¾ç½®ï¼ˆä¸€æ¬¡æ€§ï¼‰

```bash
bash "$(dirname "$(find ~/.zed/skills -path '*/hyperframes/SKILL.md' 2>/dev/null | head -1)")/scripts/setup.sh"
```

è¯¥è„šæœ¬æ‰§è¡Œä»¥ä¸‹æ“ä½œï¼š
1. éªŒè¯ Node.js >= 22 å’Œ FFmpeg å·²å®‰è£…ï¼ˆè‹¥æœªå®‰è£…åˆ™æ‰“å°ä¿®å¤è¯´æ˜Žï¼‰ã€‚
2. å…¨å±€å®‰è£… `hyperframes` CLIï¼ˆ`npm install -g hyperframes@>=0.4.2`ï¼‰ã€‚
3. é€šè¿‡ Puppeteer é¢„ç¼“å­˜ `chrome-headless-shell` â€” **å¿…éœ€**ï¼Œç”¨äºŽé€šè¿‡ Chrome çš„ `HeadlessExperimental.beginFrame` æ•èŽ·è·¯å¾„å®žçŽ°æœ€é«˜è´¨é‡æ¸²æŸ“ã€‚
4. è¿è¡Œ `npx hyperframes doctor` å¹¶æŠ¥å‘Šç»“æžœã€‚

è‹¥è®¾ç½®å¤±è´¥ï¼Œè¯·å‚é˜… [references/troubleshooting.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/troubleshooting.md)ã€‚

## æ“ä½œæµç¨‹

### 1. ç¼–å†™ HTML å‰å…ˆè§„åˆ’

åœ¨æŽ¥è§¦ä»£ç ä¹‹å‰ï¼Œä»Žé«˜å±‚æ¬¡é˜æ˜Žï¼š
- **å†…å®¹** â€” å™äº‹å¼§çº¿ã€å…³é”®æ—¶åˆ»ã€æƒ…æ„ŸèŠ‚æ‹
- **ç»“æž„** â€” åˆæˆã€è½¨é“ï¼ˆè§†é¢‘/éŸ³é¢‘/å åŠ å±‚ï¼‰ã€æ—¶é•¿
- **è§†è§‰æ ‡è¯†** â€” é¢œè‰²ã€å­—ä½“ã€åŠ¨æ€é£Žæ ¼ï¼ˆçˆ†ç‚¸æ„Ÿ / ç”µå½±æ„Ÿ / æµç•… / æŠ€æœ¯æ„Ÿï¼‰
- **ä¸»å¸§** â€” æ¯ä¸ªåœºæ™¯ä¸­æœ€å¤šå…ƒç´ åŒæ—¶å¯è§çš„æ—¶åˆ»ã€‚è¿™æ˜¯ä½ é¦–å…ˆè¦æž„å»ºçš„é™æ€å¸ƒå±€ã€‚

**è§†è§‰æ ‡è¯†å…³å¡ï¼ˆç¡¬æ€§å…³å¡ï¼‰ã€‚** åœ¨ç¼–å†™ä»»ä½•åˆæˆ HTML ä¹‹å‰ï¼Œå¿…é¡»å…ˆå®šä¹‰è§†è§‰æ ‡è¯†ã€‚**ä¸å¾—**ä½¿ç”¨é»˜è®¤æˆ–é€šç”¨é¢œè‰²ç¼–å†™åˆæˆï¼ˆ`#333`ã€`#3b82f6`ã€`Roboto` æ˜¯è·³è¿‡æ­¤æ­¥éª¤çš„æ˜Žæ˜¾æ ‡å¿—ï¼‰ã€‚æŒ‰é¡ºåºæ£€æŸ¥ï¼š

1. **é¡¹ç›®æ ¹ç›®å½•æœ‰ `DESIGN.md`ï¼Ÿ** â†’ ä½¿ç”¨å…¶ä¸­ç²¾ç¡®çš„é¢œè‰²ã€å­—ä½“ã€åŠ¨æ€è§„åˆ™å’Œ"ç¦æ­¢äº‹é¡¹"çº¦æŸã€‚
2. **ç”¨æˆ·æŒ‡å®šäº†é£Žæ ¼**ï¼ˆå¦‚"Swiss Pulse"ã€"æš—é»‘ç§‘æŠ€æ„Ÿ"ã€"å¥¢ä¾ˆå“ç‰Œ"ï¼‰ï¼Ÿ â†’ ç”Ÿæˆä¸€ä¸ªåŒ…å« `## Style Prompt`ã€`## Colors`ï¼ˆ3-5 ä¸ªå¸¦è§’è‰²çš„åå…­è¿›åˆ¶è‰²å€¼ï¼‰ã€`## Typography`ï¼ˆ1-2 ä¸ªå­—ä½“æ—ï¼‰ã€`## What NOT to Do`ï¼ˆ3-5 ä¸ªåæ¨¡å¼ï¼‰çš„æœ€å° `DESIGN.md`ã€‚
3. **ä»¥ä¸Šå‡æ— ï¼Ÿ** â†’ åœ¨ç¼–å†™ä»»ä½• HTML ä¹‹å‰å…ˆæé—® 3 ä¸ªé—®é¢˜ï¼š
   - æ°›å›´ï¼Ÿï¼ˆçˆ†ç‚¸æ„Ÿ / ç”µå½±æ„Ÿ / æµç•… / æŠ€æœ¯æ„Ÿ / æ··ä¹± / æ¸©æš–ï¼‰
   - æµ…è‰²è¿˜æ˜¯æ·±è‰²ç”»å¸ƒï¼Ÿ
   - æ˜¯å¦æœ‰å“ç‰Œé¢œè‰²ã€å­—ä½“æˆ–è§†è§‰å‚è€ƒï¼Ÿ

   ç„¶åŽæ ¹æ®ç­”æ¡ˆç”Ÿæˆ `DESIGN.md`ã€‚æ¯ä¸ªåˆæˆçš„è°ƒè‰²æ¿å’ŒæŽ’ç‰ˆéƒ½å¿…é¡»è¿½æº¯åˆ° `DESIGN.md` æˆ–ç”¨æˆ·çš„æ˜Žç¡®æŒ‡ç¤ºã€‚

### 2. åˆå§‹åŒ–è„šæ‰‹æž¶

```bash
npx hyperframes init my-video --non-interactive
```

æ¨¡æ¿ï¼š`blank`ã€`warm-grain`ã€`play-mode`ã€`swiss-grid`ã€`vignelli`ã€`decision-tree`ã€`kinetic-type`ã€`product-promo`ã€`nyt-graph`ã€‚ä¼ å…¥ `--example <name>` é€‰æ‹©æ¨¡æ¿ï¼Œ`--video clip.mp4` æˆ– `--audio track.mp3` ä»¥åª’ä½“æ–‡ä»¶ä¸ºèµ·ç‚¹ã€‚

### 3. å…ˆå¸ƒå±€ï¼ŒåŽåŠ¨ç”»

å…ˆä¸º**ä¸»å¸§**ç¼–å†™é™æ€ HTML+CSS â€” æš‚ä¸æ·»åŠ  GSAPã€‚`.scene-content` å®¹å™¨å¿…é¡»å¡«æ»¡åœºæ™¯ï¼ˆ`width:100%; height:100%; padding:Npx`ï¼‰ï¼Œä½¿ç”¨ `display:flex` + `gap`ã€‚ç”¨ padding å°†å†…å®¹å‘å†…æŽ¨ â€” æ°¸è¿œä¸è¦åœ¨å†…å®¹å®¹å™¨ä¸Šä½¿ç”¨ `position: absolute; top: Npx`ï¼ˆå†…å®¹é«˜äºŽå‰©ä½™ç©ºé—´æ—¶ä¼šæº¢å‡ºï¼‰ã€‚

åªæœ‰åœ¨ä¸»å¸§çœ‹èµ·æ¥æ­£ç¡®ä¹‹åŽï¼Œæ‰æ·»åŠ  `gsap.from()` å…¥åœºåŠ¨ç”»ï¼ˆ**å‘** CSS ä½ç½®åŠ¨ç”»ï¼‰å’Œ `gsap.to()` é€€åœºåŠ¨ç”»ï¼ˆ**ä»Ž** CSS ä½ç½®åŠ¨ç”»ï¼‰ã€‚

å®Œæ•´çš„ data å±žæ€§ schema å’Œåˆæˆè§„åˆ™è§ [references/composition.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/composition.md)ã€‚

### 4. ä½¿ç”¨ GSAP åˆ¶ä½œåŠ¨ç”»

æ¯ä¸ªåˆæˆå¿…é¡»ï¼š
- æ³¨å†Œå…¶æ—¶é—´è½´ï¼š`window.__timelines["<composition-id>"] = tl`
- åˆå§‹æš‚åœï¼š`gsap.timeline({ paused: true })` â€” æ’­æ”¾å™¨æŽ§åˆ¶æ’­æ”¾
- ä½¿ç”¨æœ‰é™çš„ `repeat` å€¼ï¼ˆç¦æ­¢ `repeat: -1` â€” ä¼šç ´åæ•èŽ·å¼•æ“Žï¼‰ã€‚è®¡ç®—æ–¹å¼ï¼š`repeat: Math.ceil(duration / cycleDuration) - 1`ã€‚
- å…·æœ‰ç¡®å®šæ€§ â€” ç¦æ­¢ `Math.random()`ã€`Date.now()` æˆ–æŒ‚é’Ÿé€»è¾‘ã€‚å¦‚éœ€ä¼ªéšæœºæ•°ï¼Œä½¿ç”¨å¸¦ç§å­çš„ PRNGã€‚
- åŒæ­¥æž„å»º â€” æ—¶é—´è½´æž„å»ºè¿‡ç¨‹ä¸­ç¦æ­¢ `async`/`await`ã€`setTimeout` æˆ– Promiseã€‚

æ ¸å¿ƒ GSAP APIï¼ˆtweenã€easeã€staggerã€timelineï¼‰è§ [references/gsap.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/gsap.md)ã€‚

### 5. åœºæ™¯é—´è½¬åœº

å¤šåœºæ™¯åˆæˆéœ€è¦è½¬åœºã€‚è§„åˆ™ï¼š
1. **åœºæ™¯é—´å§‹ç»ˆä½¿ç”¨è½¬åœº** â€” ç¦æ­¢è·³åˆ‡ã€‚
2. **æ¯ä¸ªåœºæ™¯å…ƒç´ å§‹ç»ˆä½¿ç”¨å…¥åœºåŠ¨ç”»**ï¼ˆ`gsap.from(...)`ï¼‰ã€‚
3. **é™¤æœ€åŽä¸€ä¸ªåœºæ™¯å¤–ï¼Œç¦æ­¢ä½¿ç”¨é€€åœºåŠ¨ç”»** â€” è½¬åœºæœ¬èº«å°±æ˜¯é€€å‡ºã€‚
4. æœ€åŽä¸€ä¸ªåœºæ™¯å¯ä»¥æ·¡å‡ºã€‚

ä½¿ç”¨ `npx hyperframes add <transition-name>` å®‰è£…ç€è‰²å™¨è½¬åœºï¼ˆ`flash-through-white`ã€`liquid-wipe` ç­‰ï¼‰ã€‚å®Œæ•´åˆ—è¡¨ï¼š`npx hyperframes add --list`ã€‚

### 6. éŸ³é¢‘ã€å­—å¹•ã€TTSã€éŸ³é¢‘å“åº”ã€é«˜äº®

- **éŸ³é¢‘ï¼š** å§‹ç»ˆä½¿ç”¨ç‹¬ç«‹çš„ `<audio>` å…ƒç´ ï¼ˆè§†é¢‘ä½¿ç”¨ `muted playsinline`ï¼‰ã€‚
- **TTSï¼š** `npx hyperframes tts "è„šæœ¬æ–‡æœ¬" --voice af_nova --output narration.wav`ã€‚ä½¿ç”¨ `--list` åˆ—å‡ºå¯ç”¨éŸ³è‰²ã€‚éŸ³è‰² ID é¦–å­—æ¯ç¼–ç è¯­è¨€ï¼ˆ`a`/`b`=è‹±è¯­ï¼Œ`e`=è¥¿ç­ç‰™è¯­ï¼Œ`f`=æ³•è¯­ï¼Œ`j`=æ—¥è¯­ï¼Œ`z`=æ™®é€šè¯ç­‰ï¼‰â€” CLI è‡ªåŠ¨æŽ¨æ–­éŸ³ç´ åŒ–ï¼ˆphonemizerï¼‰è¯­è¨€çŽ¯å¢ƒï¼›ä»…åœ¨éœ€è¦è¦†ç›–æ—¶ä¼ å…¥ `--lang`ã€‚éžè‹±è¯­éŸ³ç´ åŒ–éœ€è¦ç³»ç»Ÿçº§å®‰è£… `espeak-ng`ã€‚
- **å­—å¹•ï¼š** `npx hyperframes transcribe narration.wav` â†’ è¯çº§è½¬å½•ã€‚æ ¹æ®è½¬å½•å†…å®¹çš„è¯­æ°”é€‰æ‹©æ ·å¼ï¼ˆhype / corporate / tutorial / storytelling / social â€” è§ `references/features.md` ä¸­çš„è¡¨æ ¼ï¼‰ã€‚**è¯­è¨€è§„åˆ™ï¼š** é™¤éžç¡®è®¤éŸ³é¢‘ä¸ºè‹±è¯­ï¼Œå¦åˆ™æ°¸è¿œä¸è¦ä½¿ç”¨ `.en` whisper æ¨¡åž‹ â€” `.en` ä¼šå°†éžè‹±è¯­éŸ³é¢‘ç¿»è¯‘è€Œéžè½¬å½•ã€‚æ¯ä¸ªå­—å¹•ç»„åœ¨å…¶é€€å‡º tween ä¹‹åŽå¿…é¡»æœ‰ä¸€ä¸ªç¡¬æ€§çš„ `tl.set(el, { opacity: 0, visibility: "hidden" }, group.end)` æ¸…é™¤ â€” å¦åˆ™å­—å¹•ç»„ä¼šæ³„æ¼åˆ°åŽç»­ç»„ä¸­ä¿æŒå¯è§ã€‚
- **éŸ³é¢‘å“åº”è§†è§‰æ•ˆæžœï¼š** é¢„å…ˆæå–éŸ³é¢‘é¢‘æ®µï¼ˆä½Žé¢‘ / ä¸­é¢‘ / é«˜é¢‘ï¼‰ï¼Œå¹¶åœ¨æ—¶é—´è½´å†…é€šè¿‡ `for` å¾ªçŽ¯çš„ `tl.call(draw, [], f / fps)` é€å¸§é‡‡æ · â€” å•ä¸ªé•¿ tween **ä¸ä¼š**å“åº”éŸ³é¢‘ã€‚å°†ä½Žé¢‘æ˜ å°„åˆ° `scale`ï¼ˆè„‰å†²ï¼‰ï¼Œé«˜é¢‘æ˜ å°„åˆ° `textShadow`/`boxShadow`ï¼ˆå‘å…‰ï¼‰ï¼Œæ•´ä½“æŒ¯å¹…æ˜ å°„åˆ° `opacity`/`y`/`backgroundColor`ã€‚é¿å…å‡è¡¡å™¨æ¡å½¢å›¾çš„é™ˆè¯æ»¥è°ƒ â€” è®©å†…å®¹å¼•å¯¼è§†è§‰ï¼Œè®©éŸ³é¢‘é©±åŠ¨å…¶è¡Œä¸ºã€‚
- **æ ‡è®°å¼é«˜äº®ï¼š** æ–‡å­—å¼ºè°ƒçš„é«˜äº®ã€åœ†åœˆã€çˆ†ç‚¸ã€æ¶‚é¸¦ã€åˆ’é™¤æ•ˆæžœå‡ä¸ºç¡®å®šæ€§ CSS+GSAP â€” è§ `references/features.md#marker-highlighting`ã€‚å®Œå…¨å¯å¯»å€ï¼Œæ— åŠ¨ç”» SVG æ»¤é•œã€‚
- **åœºæ™¯è½¬åœºï¼š** æ¯ä¸ªå¤šåœºæ™¯åˆæˆå¿…é¡»ä½¿ç”¨è½¬åœºï¼ˆç¦æ­¢è·³åˆ‡ï¼‰ã€‚ä»Ž CSS åŽŸè¯­ï¼ˆæŽ¨å…¥æ»‘åŠ¨ã€æ¨¡ç³Šäº¤å‰æ·¡å…¥æ·¡å‡ºã€ç¼©æ”¾ç©¿è¶Šã€äº¤é”™å—ï¼‰æˆ–ç€è‰²å™¨è½¬åœºï¼ˆ`flash-through-white`ã€`liquid-wipe`ã€`cross-warp-morph`ã€`chromatic-split` ç­‰ï¼Œé€šè¿‡ `npx hyperframes add` å®‰è£…ï¼‰ä¸­é€‰æ‹©ã€‚æ°›å›´å’Œèƒ½é‡å¯¹ç…§è¡¨è§ `references/features.md#transitions`ã€‚åŒä¸€åˆæˆä¸­ä¸å¾—æ··ç”¨ CSS è½¬åœºå’Œç€è‰²å™¨è½¬åœºã€‚

### 7. Lintã€éªŒè¯ã€æ£€æŸ¥ã€é¢„è§ˆã€æ¸²æŸ“

```bash
npx hyperframes lint              # æ•èŽ·ç¼ºå¤±çš„ data-composition-idã€é‡å è½¨é“ã€æœªæ³¨å†Œçš„æ—¶é—´è½´
npx hyperframes validate          # åœ¨ 5 ä¸ªæ—¶é—´æˆ³è¿›è¡Œ WCAG å¯¹æ¯”åº¦å®¡è®¡
npx hyperframes inspect           # è§†è§‰å¸ƒå±€å®¡è®¡ â€” æº¢å‡ºã€å¸§å¤–å…ƒç´ ã€è¢«é®æŒ¡çš„æ–‡å­—
npx hyperframes preview           # å®žæ—¶æµè§ˆå™¨é¢„è§ˆ
npx hyperframes render --quality draft --output draft.mp4    # å¿«é€Ÿè¿­ä»£
npx hyperframes render --quality high --output final.mp4     # æœ€ç»ˆäº¤ä»˜
```

`hyperframes validate` å¯¹æ¯ä¸ªæ–‡å­—å…ƒç´ åŽæ–¹çš„èƒŒæ™¯åƒç´ è¿›è¡Œé‡‡æ ·ï¼Œå¹¶å¯¹å¯¹æ¯”åº¦ä½ŽäºŽ 4.5:1ï¼ˆå¤§æ–‡å­—ä¸º 3:1ï¼‰çš„æƒ…å†µå‘å‡ºè­¦å‘Šã€‚`hyperframes inspect` æ˜¯å¸ƒå±€ä¾§çš„é…å¥—å·¥å…· â€” åœ¨å¤šä¸ªæ—¶é—´æˆ³è¿è¡Œé¡µé¢ï¼Œæ ‡è®°é™æ€ lint æ— æ³•å‘çŽ°çš„é—®é¢˜ï¼ˆä»…åœ¨ 4.5s æ—¶è¶…å‡ºå®‰å…¨åŒºåŸŸçš„å­—å¹•æ¢è¡Œã€æ ‡é¢˜ä¸ºæœ€é•¿å˜ä½“æ—¶æº¢å‡ºçš„å¡ç‰‡ã€è¢«è½¬åœºç€è‰²å™¨é®æŒ¡çš„å…ƒç´ ï¼‰ã€‚å¯¹äºŽåŒ…å«å¯¹è¯æ°”æ³¡ã€å¡ç‰‡ã€å­—å¹•æˆ–ç´§å‡‘æŽ’ç‰ˆçš„åˆæˆï¼ŒåŠ¡å¿…è¿è¡Œ `inspect`ã€‚

### 8. ç½‘ç«™è½¬è§†é¢‘ï¼ˆè‹¥ç”¨æˆ·æä¾› URLï¼‰

ä½¿ç”¨ [references/website-to-video.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/website-to-video.md) ä¸­çš„ 7 æ­¥æ•èŽ·è½¬è§†é¢‘å·¥ä½œæµï¼šæ•èŽ· â†’ DESIGN.md â†’ SCRIPT.md â†’ åˆ†é•œ â†’ åˆæˆ â†’ æ¸²æŸ“ â†’ äº¤ä»˜ã€‚

## å¸¸è§é™·é˜±

- **`HeadlessExperimental.beginFrame' wasn't found`** â€” Chromium 147+ ç§»é™¤äº†æ­¤åè®®ã€‚ç¡®ä¿ä½¿ç”¨ `hyperframes@>=0.4.2`ï¼ˆè‡ªåŠ¨æ£€æµ‹å¹¶å›žé€€åˆ°æˆªå›¾æ¨¡å¼ï¼‰ã€‚åº”æ€¥æ–¹æ¡ˆï¼š`export PRODUCER_FORCE_SCREENSHOT=true`ã€‚å‚è§ [hyperframes#294](https://github.com/heygen-com/hyperframes/issues/294) å’Œ [references/troubleshooting.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/troubleshooting.md)ã€‚
- **ç³»ç»Ÿ Chromeï¼ˆéž `chrome-headless-shell`ï¼‰** â€” æ¸²æŸ“ä¼šæŒ‚èµ· 120 ç§’åŽè¶…æ—¶ã€‚è¿è¡Œ `npx puppeteer browsers install chrome-headless-shell`ï¼ˆsetup.sh å·²å¤„ç†æ­¤æ­¥éª¤ï¼‰ã€‚`hyperframes doctor` ä¼šæŠ¥å‘Šå°†ä½¿ç”¨å“ªä¸ªäºŒè¿›åˆ¶æ–‡ä»¶ã€‚
- **ä»»ä½•åœ°æ–¹å‡ºçŽ° `repeat: -1`** â€” ä¼šç ´åæ•èŽ·å¼•æ“Žã€‚å§‹ç»ˆè®¡ç®—æœ‰é™çš„ repeat æ¬¡æ•°ã€‚
- **åœ¨ç¨åŽå…¥åœºçš„ clip å…ƒç´ ä¸Šä½¿ç”¨ `gsap.set()`** â€” é¡µé¢åŠ è½½æ—¶è¯¥å…ƒç´ ä¸å­˜åœ¨ã€‚æ”¹ä¸ºåœ¨æ—¶é—´è½´å†…ä½¿ç”¨ `tl.set(selector, vars, timePosition)`ï¼Œä½ç½®åœ¨è¯¥ clip çš„ `data-start` å¤„æˆ–ä¹‹åŽã€‚
- **å†…å®¹æ–‡å­—ä¸­ä½¿ç”¨ `<br>`** â€” å¼ºåˆ¶æ¢è¡Œä¸äº†è§£æ¸²æŸ“å­—ä½“å®½åº¦ï¼Œå¯¼è‡´è‡ªç„¶æ¢è¡Œ + `<br>` åŒé‡æ¢è¡Œã€‚ä½¿ç”¨ `max-width` è®©æ–‡å­—è‡ªç„¶æ¢è¡Œã€‚ä¾‹å¤–ï¼šæ¯ä¸ªå•è¯åˆ»æ„ç‹¬å ä¸€è¡Œçš„çŸ­å±•ç¤ºæ ‡é¢˜ã€‚
- **å¯¹ `visibility` æˆ– `display` è¿›è¡ŒåŠ¨ç”»** â€” GSAP æ— æ³•å¯¹è¿™äº›å±žæ€§è¿›è¡Œ tweenã€‚ä½¿ç”¨ `autoAlpha`ï¼ˆåŒæ—¶å¤„ç† visibility å’Œ opacityï¼‰ã€‚
- **è°ƒç”¨ `video.play()` æˆ– `audio.play()`** â€” æ¡†æž¶æ‹¥æœ‰æ’­æ”¾æŽ§åˆ¶æƒã€‚æ°¸è¿œä¸è¦è‡ªè¡Œè°ƒç”¨è¿™äº›æ–¹æ³•ã€‚
- **å¼‚æ­¥æž„å»ºæ—¶é—´è½´** â€” æ•èŽ·å¼•æ“Žåœ¨é¡µé¢åŠ è½½åŽåŒæ­¥è¯»å– `window.__timelines`ã€‚æ°¸è¿œä¸è¦å°†æ—¶é—´è½´æž„å»ºåŒ…è£¹åœ¨ `async`ã€`setTimeout` æˆ– Promise ä¸­ã€‚
- **ç‹¬ç«‹ `index.html` åŒ…è£¹åœ¨ `<template>` ä¸­** â€” ä¼šå¯¹æµè§ˆå™¨éšè—æ‰€æœ‰å†…å®¹ã€‚åªæœ‰é€šè¿‡ `data-composition-src` åŠ è½½çš„**å­åˆæˆ**æ‰ä½¿ç”¨ `<template>`ã€‚
- **å°†è§†é¢‘ç”¨äºŽéŸ³é¢‘** â€” å§‹ç»ˆä½¿ç”¨é™éŸ³çš„ `<video>` + ç‹¬ç«‹çš„ `<audio>`ã€‚

## éªŒè¯

æ¸²æŸ“å‰åŽå‡éœ€æ‰§è¡Œï¼š

1. **Lint + validate + inspect é€šè¿‡ï¼š** `npx hyperframes lint --strict && npx hyperframes validate && npx hyperframes inspect`ï¼ˆlint æ•èŽ·ç»“æž„é—®é¢˜ï¼Œvalidate æ•èŽ·å¯¹æ¯”åº¦é—®é¢˜ï¼Œinspect æ•èŽ·è§†è§‰å¸ƒå±€/æº¢å‡ºé—®é¢˜ â€” è‹¥å‡ºçŽ°è­¦å‘Šè¯·å‚é˜… troubleshooting.mdï¼‰ã€‚
2. **åŠ¨ç”»ç¼–æŽ’** â€” å¯¹äºŽæ–°åˆæˆæˆ–é‡å¤§åŠ¨ç”»å˜æ›´ï¼Œè¿è¡ŒåŠ¨ç”»æ˜ å°„ã€‚`npx hyperframes init` ä¼šå°†æŠ€èƒ½è„šæœ¬å¤åˆ¶åˆ°é¡¹ç›®ä¸­ï¼Œå› æ­¤è·¯å¾„ä¸ºé¡¹ç›®æœ¬åœ°è·¯å¾„ï¼š
   ```bash
   node skills/hyperframes/scripts/animation-map.mjs <composition-dir> \
     --out <composition-dir>/.hyperframes/anim-map
   ```
   è¾“å‡ºå•ä¸ª `animation-map.json`ï¼ŒåŒ…å«æ¯ä¸ª tween çš„æ‘˜è¦ã€ASCII ç”˜ç‰¹æ—¶é—´è½´ã€stagger æ£€æµ‹ã€æ­»åŒºï¼ˆè¶…è¿‡ 1 ç§’æ— åŠ¨ç”»ï¼‰ã€å…ƒç´ ç”Ÿå‘½å‘¨æœŸå’Œæ ‡è®°ï¼ˆ`offscreen`ã€`collision`ã€`invisible`ã€`paced-fast` &lt;0.2sã€`paced-slow` >2sï¼‰ã€‚æ‰«ææ‘˜è¦å’Œæ ‡è®° â€” é€ä¸€ä¿®å¤æˆ–è¯´æ˜ŽåŽŸå› ã€‚å°å¹…ç¼–è¾‘å¯è·³è¿‡ã€‚
3. **æ–‡ä»¶å­˜åœ¨ä¸”éžé›¶ï¼š** `ls -lh final.mp4`ã€‚
4. **æ—¶é•¿ä¸Ž `data-duration` åŒ¹é…ï¼š** `ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 final.mp4`ã€‚
5. **è§†è§‰æ£€æŸ¥ï¼š** æå–åˆæˆä¸­é—´å¸§ï¼š`ffmpeg -i final.mp4 -ss 00:00:05 -vframes 1 preview.png`ã€‚
6. **è‹¥é¢„æœŸæœ‰éŸ³é¢‘ï¼Œç¡®è®¤éŸ³é¢‘å­˜åœ¨ï¼š** `ffprobe -v error -show_streams -select_streams a -of default=nw=1:nk=1 final.mp4 | head -1`ã€‚

è‹¥ `hyperframes render` å¤±è´¥ï¼Œè¿è¡Œ `npx hyperframes doctor` å¹¶åœ¨æŠ¥å‘Šé—®é¢˜æ—¶é™„ä¸Šå…¶è¾“å‡ºã€‚

## å‚è€ƒèµ„æ–™

- [composition.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/composition.md) â€” data å±žæ€§ã€æ—¶é—´è½´å¥‘çº¦ã€ä¸å¯è¿åçš„è§„åˆ™ã€æŽ’ç‰ˆ/èµ„æºè§„åˆ™
- [cli.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/cli.md) â€” æ‰€æœ‰ CLI å‘½ä»¤ï¼ˆinitã€captureã€lintã€validateã€inspectã€previewã€renderã€transcribeã€ttsã€doctorã€browserã€infoã€upgradeã€benchmarkï¼‰
- [gsap.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/gsap.md) â€” HyperFrames çš„ GSAP æ ¸å¿ƒ APIï¼ˆtweenã€easeã€staggerã€timelineã€matchMediaï¼‰
- [features.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/features.md) â€” å­—å¹•ã€TTSã€éŸ³é¢‘å“åº”ã€æ ‡è®°é«˜äº®ã€è½¬åœºï¼ˆæŒ‰éœ€åŠ è½½ï¼‰
- [website-to-video.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/website-to-video.md) â€” 7 æ­¥æ•èŽ·è½¬è§†é¢‘å·¥ä½œæµ
- [troubleshooting.md](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/creative/hyperframes/references/troubleshooting.md) â€” OpenClaw ä¿®å¤ã€çŽ¯å¢ƒå˜é‡ã€å¸¸è§æ¸²æŸ“é”™è¯¯