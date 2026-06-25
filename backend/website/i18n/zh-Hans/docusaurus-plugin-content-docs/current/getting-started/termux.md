---
sidebar_position: 3
title: "Android / Termux"
description: "é€šè¿‡ Termux åœ¨ Android æ‰‹æœºä¸Šç›´æŽ¥è¿è¡Œ Zed Agent"
---

# åœ¨ Android ä¸Šé€šè¿‡ Termux è¿è¡Œ Zed

è¿™æ˜¯åœ¨ Android æ‰‹æœºä¸Šé€šè¿‡ [Termux](https://termux.dev/) ç›´æŽ¥è¿è¡Œ Zed Agent çš„å·²éªŒè¯è·¯å¾„ã€‚

å®ƒä¸ºä½ æä¾›æ‰‹æœºä¸Šå¯ç”¨çš„æœ¬åœ° CLIï¼Œä»¥åŠç›®å‰å·²çŸ¥å¯åœ¨ Android ä¸Šå¹²å‡€å®‰è£…çš„æ ¸å¿ƒæ‰©å±•åŠŸèƒ½ã€‚

## å·²éªŒè¯è·¯å¾„æ”¯æŒå“ªäº›åŠŸèƒ½ï¼Ÿ

å·²éªŒè¯çš„ Termux å®‰è£…åŒ…å«ï¼š
- Zed CLI
- cron æ”¯æŒ
- PTYï¼ˆä¼ªç»ˆç«¯ï¼‰/åŽå°ç»ˆç«¯æ”¯æŒ
- Telegram gateway æ”¯æŒï¼ˆæ‰‹åŠ¨ / å°½åŠ›è€Œä¸ºçš„åŽå°è¿è¡Œï¼‰
- MCP æ”¯æŒ
- Honcho è®°å¿†æ”¯æŒ
- ACP æ”¯æŒ

å…·ä½“å¯¹åº”ä»¥ä¸‹å‘½ä»¤ï¼š

```bash
python -m pip install -e '.[termux]' -c constraints-termux.txt
```

## å“ªäº›åŠŸèƒ½å°šæœªçº³å…¥å·²éªŒè¯è·¯å¾„ï¼Ÿ

éƒ¨åˆ†åŠŸèƒ½ä»ä¾èµ–æ¡Œé¢/æœåŠ¡å™¨é£Žæ ¼çš„ä¾èµ–é¡¹ï¼Œè¿™äº›ä¾èµ–é¡¹å°šæœªä¸º Android å‘å¸ƒï¼Œæˆ–å°šæœªåœ¨æ‰‹æœºä¸ŠéªŒè¯ï¼š

- `.[all]` ç›®å‰ä¸æ”¯æŒ Android
- `voice` æ‰©å±•è¢« `faster-whisper -> ctranslate2` é˜»å¡žï¼Œ`ctranslate2` æœªå‘å¸ƒ Android wheel åŒ…
- è‡ªåŠ¨æµè§ˆå™¨ / Playwright å¼•å¯¼åœ¨ Termux å®‰è£…ç¨‹åºä¸­è¢«è·³è¿‡
- åŸºäºŽ Docker çš„ç»ˆç«¯éš”ç¦»åœ¨ Termux å†…ä¸å¯ç”¨
- Android å¯èƒ½ä»ä¼šæŒ‚èµ· Termux åŽå°ä»»åŠ¡ï¼Œå› æ­¤ gateway æŒä¹…åŒ–æ˜¯å°½åŠ›è€Œä¸ºï¼Œè€Œéžæ­£å¸¸çš„æ‰˜ç®¡æœåŠ¡

è¿™å¹¶ä¸å¦¨ç¢ Zed ä½œä¸ºæ‰‹æœºåŽŸç”Ÿ CLI agent æ­£å¸¸å·¥ä½œâ€”â€”åªæ˜¯æ„å‘³ç€æŽ¨èçš„ç§»åŠ¨ç«¯å®‰è£…æœ‰æ„æ¯”æ¡Œé¢/æœåŠ¡å™¨å®‰è£…æ›´ç²¾ç®€ã€‚

---

## æ–¹å¼ä¸€ï¼šä¸€è¡Œå®‰è£…å‘½ä»¤

Zed çŽ°å·²å†…ç½® Termux æ„ŸçŸ¥çš„å®‰è£…è·¯å¾„ï¼š

```bash
curl -fsSL https://zed-agent.nousresearch.com/install.sh | bash
```

åœ¨ Termux ä¸Šï¼Œå®‰è£…ç¨‹åºä¼šè‡ªåŠ¨ï¼š
- ä½¿ç”¨ `pkg` å®‰è£…ç³»ç»ŸåŒ…
- ä½¿ç”¨ `python -m venv` åˆ›å»ºè™šæ‹ŸçŽ¯å¢ƒ
- ä¼˜å…ˆå°è¯•è¾ƒå¤§çš„ `.[termux-all]` æ‰©å±•ï¼Œå¤±è´¥åŽå›žé€€åˆ°è¾ƒå°çš„ `.[termux]` æ‰©å±•ï¼ˆå†æ¬¡å¤±è´¥åˆ™è¿›è¡ŒåŸºç¡€å®‰è£…ï¼‰â€”â€”curl å®‰è£…ç¨‹åºè‡ªåŠ¨æŒ‰æ­¤é¡ºåºæ‰§è¡Œ
- å°† `zed` é“¾æŽ¥åˆ° `$PREFIX/bin`ï¼Œä½¿å…¶ä¿ç•™åœ¨ Termux PATH ä¸­
- è·³è¿‡æœªç»éªŒè¯çš„æµè§ˆå™¨ / WhatsApp å¼•å¯¼

å¦‚æžœä½ éœ€è¦æ˜¾å¼å‘½ä»¤æˆ–éœ€è¦è°ƒè¯•å¤±è´¥çš„å®‰è£…ï¼Œè¯·ä½¿ç”¨ä¸‹æ–¹çš„æ‰‹åŠ¨å®‰è£…è·¯å¾„ã€‚

---

## æ–¹å¼äºŒï¼šæ‰‹åŠ¨å®‰è£…ï¼ˆå®Œå…¨æ˜¾å¼ï¼‰

### 1. æ›´æ–° Termux å¹¶å®‰è£…ç³»ç»ŸåŒ…

```bash
pkg update
pkg install -y git python clang rust make pkg-config libffi openssl nodejs ripgrep ffmpeg
```

å„åŒ…ç”¨é€”è¯´æ˜Žï¼š
- `python` â€” è¿è¡Œæ—¶ + è™šæ‹ŸçŽ¯å¢ƒæ”¯æŒ
- `git` â€” å…‹éš†/æ›´æ–°ä»“åº“
- `clang`ã€`rust`ã€`make`ã€`pkg-config`ã€`libffi`ã€`openssl` â€” åœ¨ Android ä¸Šæž„å»ºéƒ¨åˆ† Python ä¾èµ–æ‰€éœ€
- `nodejs` â€” å¯é€‰çš„ Node è¿è¡Œæ—¶ï¼Œç”¨äºŽå·²éªŒè¯æ ¸å¿ƒè·¯å¾„ä¹‹å¤–çš„å®žéªŒ
- `ripgrep` â€” å¿«é€Ÿæ–‡ä»¶æœç´¢
- `ffmpeg` â€” åª’ä½“ / TTS è½¬æ¢

### 2. å…‹éš† Zed

```bash
git clone https://github.com/NousResearch/zed-agent.git
cd zed-agent
```

### 3. åˆ›å»ºè™šæ‹ŸçŽ¯å¢ƒ

```bash
python -m venv venv
source venv/bin/activate
export ANDROID_API_LEVEL="$(getprop ro.build.version.sdk)"
python -m pip install --upgrade pip setuptools wheel
```

`ANDROID_API_LEVEL` å¯¹äºŽåŸºäºŽ Rust / maturin çš„åŒ…ï¼ˆå¦‚ `jiter`ï¼‰éžå¸¸é‡è¦ã€‚

### 4. å®‰è£…å·²éªŒè¯çš„ Termux åŒ…

```bash
python -m pip install -e '.[termux]' -c constraints-termux.txt
```

å¦‚æžœä½ åªéœ€è¦æœ€å°åŒ–çš„æ ¸å¿ƒ agentï¼Œä»¥ä¸‹å‘½ä»¤åŒæ ·æœ‰æ•ˆï¼š

```bash
python -m pip install -e '.' -c constraints-termux.txt
```

### 5. å°† `zed` æ·»åŠ åˆ° Termux PATH

```bash
ln -sf "$PWD/venv/bin/zed" "$PREFIX/bin/zed"
```

`$PREFIX/bin` åœ¨ Termux ä¸­å·²é»˜è®¤åœ¨ PATH ä¸­ï¼Œå› æ­¤è¿™æ ·åšå¯ä»¥è®© `zed` å‘½ä»¤åœ¨æ–° shell ä¸­æŒç»­å¯ç”¨ï¼Œæ— éœ€æ¯æ¬¡é‡æ–°æ¿€æ´»è™šæ‹ŸçŽ¯å¢ƒã€‚

### 6. éªŒè¯å®‰è£…

```bash
zed version
zed doctor
```

### 7. å¯åŠ¨ Zed

```bash
zed
```

---

## æŽ¨èçš„åŽç»­é…ç½®

### é…ç½®æ¨¡åž‹

```bash
zed model
```

æˆ–ç›´æŽ¥åœ¨ `~/.zed/.env` ä¸­è®¾ç½®å¯†é’¥ã€‚

### ç¨åŽé‡æ–°è¿è¡Œå®Œæ•´çš„äº¤äº’å¼è®¾ç½®å‘å¯¼

```bash
zed setup
```

### æ‰‹åŠ¨å®‰è£…å¯é€‰çš„ Node ä¾èµ–

å·²éªŒè¯çš„ Termux è·¯å¾„æœ‰æ„è·³è¿‡ Node/æµè§ˆå™¨å¼•å¯¼ã€‚å¦‚æžœä½ ä¹‹åŽæƒ³å°è¯•æµè§ˆå™¨å·¥å…·ï¼š

```bash
pkg install nodejs-lts
npm install
```

æµè§ˆå™¨å·¥å…·ä¼šè‡ªåŠ¨å°† Termux ç›®å½•ï¼ˆ`/data/data/com.termux/files/usr/bin`ï¼‰çº³å…¥ PATH æœç´¢ï¼Œå› æ­¤æ— éœ€é¢å¤–é…ç½® PATH å³å¯å‘çŽ° `agent-browser` å’Œ `npx`ã€‚

åœ¨å¦æœ‰æ–‡æ¡£è¯´æ˜Žä¹‹å‰ï¼Œè¯·å°† Android ä¸Šçš„æµè§ˆå™¨ / WhatsApp å·¥å…·è§†ä¸ºå®žéªŒæ€§åŠŸèƒ½ã€‚

---

## æ•…éšœæŽ’æŸ¥

### å®‰è£… `.[all]` æ—¶å‡ºçŽ° `No solution found`

æ”¹ç”¨å·²éªŒè¯çš„ Termux åŒ…ï¼š

```bash
python -m pip install -e '.[termux]' -c constraints-termux.txt
```

å½“å‰é˜»å¡žåŽŸå› æ˜¯ `voice` æ‰©å±•ï¼š
- `voice` ä¾èµ– `faster-whisper`
- `faster-whisper` ä¾èµ– `ctranslate2`
- `ctranslate2` æœªå‘å¸ƒ Android wheel åŒ…

### `uv pip install` åœ¨ Android ä¸Šå¤±è´¥

æ”¹ç”¨æ ‡å‡†åº“ venv + `pip` çš„ Termux è·¯å¾„ï¼š

```bash
python -m venv venv
source venv/bin/activate
export ANDROID_API_LEVEL="$(getprop ro.build.version.sdk)"
python -m pip install --upgrade pip setuptools wheel
python -m pip install -e '.[termux]' -c constraints-termux.txt
```

### `jiter` / `maturin` æŠ¥é”™æç¤ºç¼ºå°‘ `ANDROID_API_LEVEL`

åœ¨å®‰è£…å‰æ˜¾å¼è®¾ç½® API çº§åˆ«ï¼š

```bash
export ANDROID_API_LEVEL="$(getprop ro.build.version.sdk)"
python -m pip install -e '.[termux]' -c constraints-termux.txt
```

### `zed doctor` æç¤ºç¼ºå°‘ ripgrep æˆ– Node

ä½¿ç”¨ Termux åŒ…å®‰è£…ï¼š

```bash
pkg install ripgrep nodejs
```

### å®‰è£… Python åŒ…æ—¶æž„å»ºå¤±è´¥

ç¡®ä¿å·²å®‰è£…æž„å»ºå·¥å…·é“¾ï¼š

```bash
pkg install clang rust make pkg-config libffi openssl
```

ç„¶åŽé‡è¯•ï¼š

```bash
python -m pip install -e '.[termux]' -c constraints-termux.txt
```

---

## æ‰‹æœºä¸Šçš„å·²çŸ¥é™åˆ¶

- Docker åŽç«¯ä¸å¯ç”¨
- é€šè¿‡ `faster-whisper` è¿›è¡Œçš„æœ¬åœ°è¯­éŸ³è½¬å½•åœ¨å·²éªŒè¯è·¯å¾„ä¸­ä¸å¯ç”¨
- å®‰è£…ç¨‹åºæœ‰æ„è·³è¿‡æµè§ˆå™¨è‡ªåŠ¨åŒ–é…ç½®
- éƒ¨åˆ†å¯é€‰æ‰©å±•å¯èƒ½å¯ç”¨ï¼Œä½†ç›®å‰ä»… `.[termux]` å’Œ `.[termux-all]` è¢«è®°å½•ä¸ºå·²éªŒè¯çš„ Android å®‰è£…åŒ…

å¦‚æžœä½ é‡åˆ°æ–°çš„ Android ç‰¹å®šé—®é¢˜ï¼Œè¯·åœ¨ GitHub ä¸Šæäº¤ issueï¼Œå¹¶é™„ä¸Šï¼š
- ä½ çš„ Android ç‰ˆæœ¬
- `termux-info`
- `python --version`
- `zed doctor`
- ç¡®åˆ‡çš„å®‰è£…å‘½ä»¤åŠå®Œæ•´é”™è¯¯è¾“å‡º