---
sidebar_position: 4
title: "è´¡çŒ®æŒ‡å—"
description: "å¦‚ä½•ä¸º Zed Agent åšè´¡çŒ® â€” å¼€å‘çŽ¯å¢ƒé…ç½®ã€ä»£ç é£Žæ ¼ã€PR æµç¨‹"
---

# è´¡çŒ®æŒ‡å—

æ„Ÿè°¢æ‚¨ä¸º Zed Agent åšè´¡çŒ®ï¼æœ¬æŒ‡å—æ¶µç›–å¼€å‘çŽ¯å¢ƒé…ç½®ã€ä»£ç åº“ç»“æž„è¯´æ˜Žä»¥åŠ PR åˆå¹¶æµç¨‹ã€‚

## è´¡çŒ®ä¼˜å…ˆçº§

æˆ‘ä»¬æŒ‰ä»¥ä¸‹é¡ºåºè¯„ä¼°è´¡çŒ®ä»·å€¼ï¼š

1. **Bug ä¿®å¤** â€” å´©æºƒã€é”™è¯¯è¡Œä¸ºã€æ•°æ®ä¸¢å¤±
2. **è·¨å¹³å°å…¼å®¹æ€§** â€” macOSã€ä¸åŒ Linux å‘è¡Œç‰ˆã€WSL2
3. **å®‰å…¨åŠ å›º** â€” shell æ³¨å…¥ã€promptï¼ˆæç¤ºè¯ï¼‰æ³¨å…¥ã€è·¯å¾„ç©¿è¶Š
4. **æ€§èƒ½ä¸Žå¥å£®æ€§** â€” é‡è¯•é€»è¾‘ã€é”™è¯¯å¤„ç†ã€ä¼˜é›…é™çº§
5. **æ–° skill** â€” å…·æœ‰å¹¿æ³›ç”¨é€”çš„ skillï¼ˆå‚è§ [åˆ›å»º Skill](creating-skills.md)ï¼‰
6. **æ–°å·¥å…·** â€” æžå°‘éœ€è¦ï¼›å¤§å¤šæ•°èƒ½åŠ›åº”ä»¥ skill å½¢å¼å®žçŽ°
7. **æ–‡æ¡£** â€” ä¿®æ­£ã€è¯´æ˜Žã€æ–°ç¤ºä¾‹

## å¸¸è§è´¡çŒ®è·¯å¾„

- æž„å»ºè‡ªå®šä¹‰/æœ¬åœ°å·¥å…·è€Œä¸ä¿®æ”¹ Zed æ ¸å¿ƒï¼Ÿä»Ž [æž„å»º Zed æ’ä»¶](../guides/build-a-zed-plugin.md) å¼€å§‹
- ä¸º Zed æœ¬èº«æž„å»ºæ–°çš„å†…ç½®æ ¸å¿ƒå·¥å…·ï¼Ÿä»Ž [æ·»åŠ å·¥å…·](./adding-tools.md) å¼€å§‹
- æž„å»ºæ–°çš„ skillï¼Ÿä»Ž [åˆ›å»º Skill](./creating-skills.md) å¼€å§‹
- æž„å»ºæ–°çš„æŽ¨ç†æä¾›å•†ï¼Ÿä»Ž [æ·»åŠ æä¾›å•†](./adding-providers.md) å¼€å§‹

## å¼€å‘çŽ¯å¢ƒé…ç½®

### å‰ç½®è¦æ±‚

| è¦æ±‚ | è¯´æ˜Ž |
|-------------|-------|
| **Git** | éœ€å®‰è£… `git-lfs` æ‰©å±• |
| **Python 3.11+** | è‹¥æœªå®‰è£…ï¼Œuv ä¼šè‡ªåŠ¨å®‰è£… |
| **uv** | é«˜é€Ÿ Python åŒ…ç®¡ç†å™¨ï¼ˆ[å®‰è£…](https://docs.astral.sh/uv/)ï¼‰ |
| **Node.js 20+** | å¯é€‰ â€” æµè§ˆå™¨å·¥å…·å’Œ WhatsApp bridge éœ€è¦ï¼ˆä¸Žæ ¹ç›®å½• `package.json` engines å­—æ®µä¸€è‡´ï¼‰ |

### ä½¿ç”¨æ ‡å‡†å®‰è£…å™¨

å¯¹å¤§å¤šæ•°è´¡çŒ®è€…æ¥è¯´ï¼Œæœ€å¥½çš„å¼€å‘å¯åŠ¨æ–¹å¼å’Œç”¨æˆ·å®‰è£…æ–¹å¼ç›¸åŒï¼šè¿è¡Œæ ‡å‡†å®‰è£…å™¨ï¼Œç„¶åŽåœ¨å®ƒå…‹éš†å‡ºçš„ä»“åº“é‡Œå¼€å‘ã€‚å®‰è£…å™¨ä¼šåˆ›å»º Zed venvã€é…ç½® `zed` å‘½ä»¤ã€ä¸º `zed update` å†™å…¥å®‰è£…æ–¹å¼æ ‡è®°ï¼Œå¹¶æŠŠå®Œæ•´ git é¡¹ç›®å…‹éš†åˆ° `$ZED_HOME/zed-agent`ï¼ˆé€šå¸¸æ˜¯ `~/.zed/zed-agent`ï¼‰ã€‚è¿™æ ·ä½ çš„å¼€å‘çŽ¯å¢ƒä¼šå’Œ CLIã€updaterã€lazy dependency installerã€gatewayã€docs é»˜è®¤å‡è®¾çš„å¸ƒå±€ä¸€è‡´ã€‚

```bash
curl -fsSL https://zed-agent.nousresearch.com/install.sh | bash
cd "${ZED_HOME:-$HOME/.zed}/zed-agent"

# åœ¨æ ‡å‡†å®‰è£…åŸºç¡€ä¸Šæ·»åŠ å¼€å‘/æµ‹è¯• extrasã€‚
uv pip install -e ".[all,dev]"

# å¯é€‰ï¼šæµè§ˆå™¨å·¥å…· / docs site dependenciesã€‚
npm install
```

ä¹‹åŽä»Žè¿™ä¸ª checkout åˆ›å»ºåˆ†æ”¯å¹¶è¿è¡Œæµ‹è¯•ï¼š

```bash
git checkout -b fix/description
scripts/run_tests.sh
```

### æ‰‹åŠ¨å…‹éš†å¤‡ç”¨è·¯å¾„

åªæœ‰åœ¨ä½ æ˜Žç¡®ä¸æƒ³ä½¿ç”¨ Zed managed install layout æ—¶æ‰ä½¿ç”¨è¿™ç§æ–¹å¼ï¼ˆä¾‹å¦‚å®¹å™¨æˆ– CI job é‡Œçš„ä¸´æ—¶ cloneï¼‰ã€‚å¦‚æžœè¿™æ ·å®‰è£…ï¼Œè¯·ç¡®ä¿è¿è¡Œçš„æ˜¯è¿™ä¸ª venv é‡Œçš„ `zed` entrypointï¼›è¿è¡Œç³»ç»Ÿ `python3 -m zed_cli.main` å¯èƒ½ä¼šåŠ è½½æ— å…³çš„ç³»ç»Ÿ Python åŒ…ã€‚

```bash
git clone https://github.com/NousResearch/zed-agent.git
cd zed-agent

# ä½¿ç”¨ Python 3.11 åˆ›å»ºè™šæ‹ŸçŽ¯å¢ƒ
uv venv venv --python 3.11
export VIRTUAL_ENV="$(pwd)/venv"

# å®‰è£…æ‰€æœ‰æ‰©å±•ï¼ˆmessagingã€cronã€CLI èœå•ã€å¼€å‘å·¥å…·ï¼‰
uv pip install -e ".[all,dev]"

# å¯é€‰ï¼šæµè§ˆå™¨å·¥å…·
npm install
```

### é…ç½®å¼€å‘çŽ¯å¢ƒ

```bash
mkdir -p ~/.zed/{cron,sessions,logs,memories,skills}
cp cli-config.yaml.example ~/.zed/config.yaml
touch ~/.zed/.env

# è‡³å°‘æ·»åŠ ä¸€ä¸ª LLM æä¾›å•†å¯†é’¥ï¼š
echo 'OPENROUTER_API_KEY=sk-or-v1-your-key' >> ~/.zed/.env
```

### è¿è¡Œ

```bash
# æ ‡å‡†å®‰è£…å™¨å·²ç»æŠŠ `zed` æ”¾åˆ°äº† PATH ä¸Šã€‚
zed doctor
zed chat -q "Hello"
```

å¦‚æžœä½ ä½¿ç”¨äº†æ‰‹åŠ¨å…‹éš†å¤‡ç”¨è·¯å¾„ï¼Œå¯ä»¥åœ¨ checkout ä¸­è¿è¡Œ `./zed`ï¼Œæˆ–æ˜¾å¼æŠŠè¿™ä¸ª clone çš„ venv é“¾æŽ¥åˆ° PATHï¼š

```bash
mkdir -p ~/.local/bin
ln -sf "$(pwd)/venv/bin/zed" ~/.local/bin/zed
```

### è¿è¡Œæµ‹è¯•

```bash
scripts/run_tests.sh
```

## ä»£ç é£Žæ ¼

- **PEP 8**ï¼Œå…è®¸åˆç†ä¾‹å¤–ï¼ˆä¸å¼ºåˆ¶é™åˆ¶è¡Œé•¿åº¦ï¼‰
- **æ³¨é‡Š**ï¼šä»…åœ¨è§£é‡Šéžæ˜¾è€Œæ˜“è§çš„æ„å›¾ã€æƒè¡¡å–èˆæˆ– API ç‰¹æ®Šè¡Œä¸ºæ—¶æ·»åŠ 
- **é”™è¯¯å¤„ç†**ï¼šæ•èŽ·å…·ä½“å¼‚å¸¸ã€‚å¯¹äºŽæ„å¤–é”™è¯¯ï¼Œä½¿ç”¨ `logger.warning()`/`logger.error()` å¹¶è®¾ç½® `exc_info=True`
- **è·¨å¹³å°**ï¼šä¸å¾—å‡è®¾ Unix çŽ¯å¢ƒï¼ˆè§ä¸‹æ–‡ï¼‰
- **Profile å®‰å…¨è·¯å¾„**ï¼šä¸å¾—ç¡¬ç¼–ç  `~/.zed` â€” ä»£ç è·¯å¾„ä½¿ç”¨ `zed_constants` ä¸­çš„ `get_zed_home()`ï¼Œé¢å‘ç”¨æˆ·çš„æ¶ˆæ¯ä½¿ç”¨ `display_zed_home()`ã€‚å®Œæ•´è§„åˆ™å‚è§ [AGENTS.md](https://github.com/NousResearch/zed-agent/blob/main/AGENTS.md#profiles-multi-instance-support)ã€‚

## è·¨å¹³å°å…¼å®¹æ€§

Zed å®˜æ–¹æ”¯æŒ **Linuxã€macOSã€WSL2 ä»¥åŠåŽŸç”Ÿ Windowsï¼ˆé€šè¿‡ PowerShell å®‰è£…ï¼‰**ã€‚åŽŸç”Ÿ Windows ä½¿ç”¨ [Git for Windows](https://git-scm.com/download/win) æä¾›çš„ Git Bash æ‰§è¡Œ shell å‘½ä»¤ã€‚éƒ¨åˆ†åŠŸèƒ½ä¾èµ– POSIX å†…æ ¸åŽŸè¯­ï¼Œå·²åšæ¡ä»¶é™åˆ¶ï¼šdashboard å†…åµŒçš„ PTY ç»ˆç«¯é¢æ¿ï¼ˆ`/chat` æ ‡ç­¾é¡µï¼‰ä»…æ”¯æŒ WSL2ã€‚å¦‚æžœæ‚¨ä¸»è¦åœ¨ Windows ä¸Šå¼€å‘ï¼ŒæŽ¨é€å‰è¯·è¿è¡Œ Windows é™·é˜±ï¼ˆfootgunï¼‰lintï¼ˆ`scripts/check-windows-footguns.py`ï¼‰ã€‚

è´¡çŒ®ä»£ç æ—¶ï¼Œè¯·éµå®ˆä»¥ä¸‹è§„åˆ™ï¼š

- **ä¸å¾—æ·»åŠ æœªåŠ ä¿æŠ¤çš„ `signal.SIGKILL` å¼•ç”¨ã€‚** Windows ä¸Šæœªå®šä¹‰è¯¥ä¿¡å·ã€‚è¯·é€šè¿‡ `gateway.status.terminate_pid(pid, force=True)`ï¼ˆé›†ä¸­å¼åŽŸè¯­ï¼ŒWindows ä¸Šæ‰§è¡Œ `taskkill /T /F`ï¼ŒPOSIX ä¸Šå‘é€ SIGKILLï¼‰è·¯ç”±ï¼Œæˆ–ä½¿ç”¨ `getattr(signal, "SIGKILL", signal.SIGTERM)` å›žé€€ã€‚
- **åœ¨ `os.kill(pid, 0)` æŽ¢æµ‹æ—¶åŒæ—¶æ•èŽ· `OSError` å’Œ `ProcessLookupError`ã€‚** Windows å¯¹å·²æ¶ˆå¤±çš„ PID æŠ›å‡º `OSError`ï¼ˆWinError 87ï¼Œ"å‚æ•°ä¸æ­£ç¡®"ï¼‰ï¼Œè€Œéž `ProcessLookupError`ã€‚
- **ä¸å¾—å¼ºåˆ¶ç»ˆç«¯ä½¿ç”¨ POSIX è¯­ä¹‰ã€‚** `os.setsid`ã€`os.killpg`ã€`os.getpgid`ã€`os.fork` åœ¨ Windows ä¸Šå‡ä¼šæŠ›å‡ºå¼‚å¸¸ â€” ä½¿ç”¨ `if sys.platform != "win32":` æˆ– `if os.name != "nt":` è¿›è¡Œæ¡ä»¶åˆ¤æ–­ã€‚
- **æ‰“å¼€æ–‡ä»¶æ—¶æ˜¾å¼æŒ‡å®š `encoding="utf-8"`ã€‚** Windows ä¸Š Python é»˜è®¤ä½¿ç”¨ç³»ç»ŸåŒºåŸŸè®¾ç½®ï¼ˆé€šå¸¸ä¸º cp1252ï¼‰ï¼Œå¤„ç†éžæ‹‰ä¸å­—ç¬¦æ—¶ä¼šå‡ºçŽ°ä¹±ç æˆ–å´©æºƒã€‚
- **ä½¿ç”¨ `pathlib.Path` / `os.path.join`ï¼Œä¸å¾—æ‰‹åŠ¨ç”¨ `/` æ‹¼æŽ¥è·¯å¾„ã€‚** è¿™å¯¹æˆ‘ä»¬æž„é€ åŽä¼ ç»™å­è¿›ç¨‹çš„å­—ç¬¦ä¸²å°¤ä¸ºé‡è¦ï¼Œè€Œéž OS è¿”å›žç»™æˆ‘ä»¬çš„å­—ç¬¦ä¸²ã€‚

å…³é”®æ¨¡å¼ï¼š

### 1. `termios` å’Œ `fcntl` ä»…é€‚ç”¨äºŽ Unix

å§‹ç»ˆåŒæ—¶æ•èŽ· `ImportError` å’Œ `NotImplementedError`ï¼š

```python
try:
    from simple_term_menu import TerminalMenu
    menu = TerminalMenu(options)
    idx = menu.show()
except (ImportError, NotImplementedError):
    # å›žé€€ï¼šç¼–å·èœå•
    for i, opt in enumerate(options):
        print(f"  {i+1}. {opt}")
    idx = int(input("Choice: ")) - 1
```

### 2. æ–‡ä»¶ç¼–ç 

æŸäº›çŽ¯å¢ƒå¯èƒ½ä»¥éž UTF-8 ç¼–ç ä¿å­˜ `.env` æ–‡ä»¶ï¼š

```python
try:
    load_dotenv(env_path)
except UnicodeDecodeError:
    load_dotenv(env_path, encoding="latin-1")
```

### 3. è¿›ç¨‹ç®¡ç†

`os.setsid()`ã€`os.killpg()` ä»¥åŠä¿¡å·å¤„ç†åœ¨å„å¹³å°é—´å­˜åœ¨å·®å¼‚ï¼š

```python
import platform
if platform.system() != "Windows":
    kwargs["preexec_fn"] = os.setsid
```

### 4. è·¯å¾„åˆ†éš”ç¬¦

ä½¿ç”¨ `pathlib.Path` ä»£æ›¿ç”¨ `/` è¿›è¡Œå­—ç¬¦ä¸²æ‹¼æŽ¥ã€‚

## å®‰å…¨æ³¨æ„äº‹é¡¹

Zed æ‹¥æœ‰ç»ˆç«¯è®¿é—®æƒé™ï¼Œå®‰å…¨è‡³å…³é‡è¦ã€‚

### çŽ°æœ‰ä¿æŠ¤æŽªæ–½

| å±‚çº§ | å®žçŽ°æ–¹å¼ |
|-------|---------------|
| **sudo å¯†ç ç®¡é“** | ä½¿ç”¨ `shlex.quote()` é˜²æ­¢ shell æ³¨å…¥ |
| **å±é™©å‘½ä»¤æ£€æµ‹** | `tools/approval.py` ä¸­çš„æ­£åˆ™è¡¨è¾¾å¼æ¨¡å¼ï¼Œé…åˆç”¨æˆ·å®¡æ‰¹æµç¨‹ |
| **Cron prompt æ³¨å…¥** | æ‰«æå™¨é˜»æ–­æŒ‡ä»¤è¦†ç›–æ¨¡å¼ |
| **å†™å…¥æ‹’ç»åˆ—è¡¨** | å—ä¿æŠ¤è·¯å¾„é€šè¿‡ `os.path.realpath()` è§£æžï¼Œé˜²æ­¢ç¬¦å·é“¾æŽ¥ç»•è¿‡ |
| **Skill å®ˆå«** | å¯¹ hub å®‰è£…çš„ skill è¿›è¡Œå®‰å…¨æ‰«æ |
| **ä»£ç æ‰§è¡Œæ²™ç®±** | å­è¿›ç¨‹è¿è¡Œæ—¶å‰¥ç¦» API å¯†é’¥ |
| **å®¹å™¨åŠ å›º** | Dockerï¼šåˆ é™¤æ‰€æœ‰ capabilityï¼Œç¦æ­¢æƒé™æå‡ï¼Œé™åˆ¶ PID æ•°é‡ |

### è´¡çŒ®å®‰å…¨æ•æ„Ÿä»£ç 

- å°†ç”¨æˆ·è¾“å…¥æ’å…¥ shell å‘½ä»¤æ—¶ï¼Œå§‹ç»ˆä½¿ç”¨ `shlex.quote()`
- è®¿é—®æŽ§åˆ¶æ£€æŸ¥å‰ï¼Œä½¿ç”¨ `os.path.realpath()` è§£æžç¬¦å·é“¾æŽ¥
- ä¸å¾—è®°å½•å¯†é’¥ä¿¡æ¯
- åœ¨å·¥å…·æ‰§è¡Œå‘¨å›´æ•èŽ·å®½æ³›å¼‚å¸¸
- è‹¥æ‚¨çš„å˜æ›´æ¶‰åŠæ–‡ä»¶è·¯å¾„æˆ–è¿›ç¨‹ï¼Œè¯·åœ¨æ‰€æœ‰å¹³å°ä¸Šæµ‹è¯•

## Pull Request æµç¨‹

### åˆ†æ”¯å‘½å

```
fix/description        # Bug ä¿®å¤
feat/description       # æ–°åŠŸèƒ½
docs/description       # æ–‡æ¡£
test/description       # æµ‹è¯•
refactor/description   # ä»£ç é‡æž„
```

### æäº¤å‰æ£€æŸ¥

1. **è¿è¡Œæµ‹è¯•**ï¼š`pytest tests/ -v`
2. **æ‰‹åŠ¨æµ‹è¯•**ï¼šè¿è¡Œ `zed` å¹¶éªŒè¯æ‚¨ä¿®æ”¹çš„ä»£ç è·¯å¾„
3. **æ£€æŸ¥è·¨å¹³å°å½±å“**ï¼šè€ƒè™‘ macOS å’Œä¸åŒ Linux å‘è¡Œç‰ˆ
4. **ä¿æŒ PR èšç„¦**ï¼šæ¯ä¸ª PR åªåŒ…å«ä¸€ä¸ªé€»è¾‘å˜æ›´

### PR æè¿°

è¯·åŒ…å«ï¼š
- **å˜æ›´å†…å®¹**åŠ**å˜æ›´åŽŸå› **
- **æµ‹è¯•æ–¹æ³•**
- **æµ‹è¯•å¹³å°**
- å…³è” issue å¼•ç”¨

### Commit æ¶ˆæ¯

æˆ‘ä»¬ä½¿ç”¨ [Conventional Commits](https://www.conventionalcommits.org/)ï¼š

```
<type>(<scope>): <description>
```

| ç±»åž‹ | é€‚ç”¨åœºæ™¯ |
|------|---------|
| `fix` | Bug ä¿®å¤ |
| `feat` | æ–°åŠŸèƒ½ |
| `docs` | æ–‡æ¡£ |
| `test` | æµ‹è¯• |
| `refactor` | ä»£ç é‡æž„ |
| `chore` | æž„å»ºã€CIã€ä¾èµ–æ›´æ–° |

Scope èŒƒå›´ï¼š`cli`ã€`gateway`ã€`tools`ã€`skills`ã€`agent`ã€`install`ã€`whatsapp`ã€`security`

ç¤ºä¾‹ï¼š
```
fix(cli): prevent crash in save_config_value when model is a string
feat(gateway): add WhatsApp multi-user session isolation
fix(security): prevent shell injection in sudo password piping
```

## æŠ¥å‘Šé—®é¢˜

- ä½¿ç”¨ [GitHub Issues](https://github.com/NousResearch/zed-agent/issues)
- è¯·åŒ…å«ï¼šæ“ä½œç³»ç»Ÿã€Python ç‰ˆæœ¬ã€Zed ç‰ˆæœ¬ï¼ˆ`zed version`ï¼‰ã€å®Œæ•´é”™è¯¯å †æ ˆ
- åŒ…å«å¤çŽ°æ­¥éª¤
- åˆ›å»ºå‰è¯·æ£€æŸ¥æ˜¯å¦å·²æœ‰é‡å¤ issue
- å®‰å…¨æ¼æ´žè¯·ç§ä¸‹æŠ¥å‘Š

## ç¤¾åŒº

- **Discord**ï¼š[discord.gg/NousResearch](https://discord.gg/NousResearch)
- **GitHub Discussions**ï¼šç”¨äºŽè®¾è®¡ææ¡ˆå’Œæž¶æž„è®¨è®º
- **Skills Hub**ï¼šä¸Šä¼ ä¸“ä¸š skill å¹¶ä¸Žç¤¾åŒºå…±äº«

## è®¸å¯è¯

æäº¤è´¡çŒ®å³è¡¨ç¤ºæ‚¨åŒæ„æ‚¨çš„è´¡çŒ®å°†ä»¥ [MIT è®¸å¯è¯](https://github.com/NousResearch/zed-agent/blob/main/LICENSE) æŽˆæƒã€‚