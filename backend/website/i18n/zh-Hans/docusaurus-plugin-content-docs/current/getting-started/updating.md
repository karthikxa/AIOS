---
sidebar_position: 3
title: "æ›´æ–°ä¸Žå¸è½½"
description: "å¦‚ä½•å°† Zed Agent æ›´æ–°è‡³æœ€æ–°ç‰ˆæœ¬æˆ–å°†å…¶å¸è½½"
---

# æ›´æ–°ä¸Žå¸è½½

## æ›´æ–°

### Git å®‰è£…æ–¹å¼

ä½¿ç”¨å•æ¡å‘½ä»¤æ›´æ–°è‡³æœ€æ–°ç‰ˆæœ¬ï¼š

```bash
zed update
```

æ­¤å‘½ä»¤ä¼šä»Ž `main` æ‹‰å–æœ€æ–°ä»£ç ã€æ›´æ–°ä¾èµ–é¡¹ï¼Œå¹¶æç¤ºä½ é…ç½®è‡ªä¸Šæ¬¡æ›´æ–°ä»¥æ¥æ–°å¢žçš„é€‰é¡¹ã€‚

### pip å®‰è£…æ–¹å¼

PyPI å‘å¸ƒç‰ˆæœ¬è·Ÿè¸ª**å¸¦æ ‡ç­¾çš„ç‰ˆæœ¬**ï¼ˆä¸»ç‰ˆæœ¬å’Œæ¬¡ç‰ˆæœ¬å‘å¸ƒï¼‰ï¼Œè€Œéž `main` ä¸Šçš„æ¯æ¬¡æäº¤ã€‚æ£€æŸ¥æ›´æ–°å¹¶å‡çº§ï¼š

```bash
zed update --check    # æŸ¥çœ‹ PyPI ä¸Šæ˜¯å¦æœ‰æ›´æ–°çš„ç‰ˆæœ¬
zed update            # æ‰§è¡Œ pip install --upgrade zed-agent
```

æˆ–æ‰‹åŠ¨æ‰§è¡Œï¼š

```bash
pip install --upgrade zed-agent    # æˆ–ï¼šuv pip install --upgrade zed-agent
```

:::tip
`zed update` ä¼šè‡ªåŠ¨æ£€æµ‹æ–°çš„é…ç½®é€‰é¡¹å¹¶æç¤ºä½ æ·»åŠ ã€‚å¦‚æžœè·³è¿‡äº†è¯¥æç¤ºï¼Œå¯æ‰‹åŠ¨è¿è¡Œ `zed config check` æŸ¥çœ‹ç¼ºå¤±çš„é€‰é¡¹ï¼Œå†è¿è¡Œ `zed config migrate` ä»¥äº¤äº’æ–¹å¼æ·»åŠ ã€‚
:::

### æ›´æ–°è¿‡ç¨‹ï¼ˆGit å®‰è£…æ–¹å¼ï¼‰

è¿è¡Œ `zed update` æ—¶ï¼Œå°†ä¾æ¬¡æ‰§è¡Œä»¥ä¸‹æ­¥éª¤ï¼š

1. **é…å¯¹æ•°æ®å¿«ç…§** â€” ä¿å­˜ä¸€ä»½è½»é‡çº§çš„æ›´æ–°å‰çŠ¶æ€å¿«ç…§ï¼ˆæ¶µç›– `~/.zed/pairing/`ã€é£žä¹¦è¯„è®ºè§„åˆ™åŠå…¶ä»–è¿è¡Œæ—¶ä¿®æ”¹çš„çŠ¶æ€æ–‡ä»¶ï¼‰ã€‚å¯é€šè¿‡ [å¿«ç…§ä¸Žå›žæ»š](../user-guide/checkpoints-and-rollback.md) ä¸­æè¿°çš„å¿«ç…§æ¢å¤æµç¨‹è¿›è¡Œæ¢å¤ï¼Œæˆ–ä»Ž Zed å†™å…¥ `~/.zed/` ç›®å½•æ—çš„æœ€æ–°å¿«é€Ÿå¿«ç…§ zip æ–‡ä»¶ä¸­æå–ã€‚
2. **Git pull** â€” ä»Ž `main` åˆ†æ”¯æ‹‰å–æœ€æ–°ä»£ç å¹¶æ›´æ–°å­æ¨¡å—
3. **ä¾èµ–å®‰è£…** â€” è¿è¡Œ `uv pip install -e ".[all]"` ä»¥èŽ·å–æ–°å¢žæˆ–å˜æ›´çš„ä¾èµ–é¡¹
4. **é…ç½®è¿ç§»** â€” æ£€æµ‹è‡ªå½“å‰ç‰ˆæœ¬ä»¥æ¥æ–°å¢žçš„é…ç½®é€‰é¡¹å¹¶æç¤ºè®¾ç½®
5. **Gateway è‡ªåŠ¨é‡å¯** â€” æ›´æ–°å®ŒæˆåŽåˆ·æ–°æ­£åœ¨è¿è¡Œçš„ gatewayï¼Œä½¿æ–°ä»£ç ç«‹å³ç”Ÿæ•ˆã€‚ç”±æœåŠ¡ç®¡ç†çš„ gatewayï¼ˆLinux ä¸Šçš„ systemdã€macOS ä¸Šçš„ launchdï¼‰é€šè¿‡æœåŠ¡ç®¡ç†å™¨é‡å¯ï¼›æ‰‹åŠ¨å¯åŠ¨çš„ gateway åœ¨ Zed èƒ½å°†è¿è¡Œä¸­çš„ PID æ˜ å°„å›žæŸä¸ª profile æ—¶ä¼šè‡ªåŠ¨é‡æ–°å¯åŠ¨ã€‚

### ä»…é¢„è§ˆï¼š`zed update --check`

æƒ³åœ¨æ‹‰å–å‰ç¡®è®¤æ˜¯å¦æœ‰æ›´æ–°ï¼Ÿè¿è¡Œ `zed update --check` â€” å¯¹äºŽ Git å®‰è£…æ–¹å¼ï¼Œå®ƒä¼šèŽ·å–å¹¶ä¸Ž `origin/main` æ¯”è¾ƒæäº¤ï¼›å¯¹äºŽ pip å®‰è£…æ–¹å¼ï¼Œå®ƒä¼šæŸ¥è¯¢ PyPI ä¸Šçš„æœ€æ–°ç‰ˆæœ¬ã€‚ä¸ä¿®æ”¹ä»»ä½•æ–‡ä»¶ï¼Œä¸é‡å¯ gatewayã€‚é€‚åˆåœ¨ä»¥"æ˜¯å¦æœ‰æ›´æ–°"ä¸ºæ¡ä»¶çš„è„šæœ¬å’Œ cron ä»»åŠ¡ä¸­ä½¿ç”¨ã€‚

### å®Œæ•´æ›´æ–°å‰å¤‡ä»½ï¼š`--backup`

å¯¹äºŽé«˜ä»·å€¼ profileï¼ˆç”Ÿäº§çŽ¯å¢ƒ gatewayã€å›¢é˜Ÿå…±äº«å®‰è£…ï¼‰ï¼Œå¯é€‰æ‹©åœ¨æ‹‰å–å‰å¯¹ `ZED_HOME`ï¼ˆé…ç½®ã€è®¤è¯ã€ä¼šè¯ã€æŠ€èƒ½ã€é…å¯¹æ•°æ®ï¼‰è¿›è¡Œå®Œæ•´å¤‡ä»½ï¼š

```bash
zed update --backup
```

æˆ–å°†å…¶è®¾ä¸ºæ¯æ¬¡è¿è¡Œçš„é»˜è®¤è¡Œä¸ºï¼š

```yaml
# ~/.zed/config.yaml
updates:
  pre_update_backup: true
```

`--backup` åœ¨æ—©æœŸç‰ˆæœ¬ä¸­æ˜¯å§‹ç»ˆå¼€å¯çš„è¡Œä¸ºï¼Œä½†åœ¨å¤§åž‹ home ç›®å½•ä¸Šä¼šç»™æ¯æ¬¡æ›´æ–°å¢žåŠ æ•°åˆ†é’Ÿæ—¶é—´ï¼Œå› æ­¤çŽ°å·²æ”¹ä¸ºæŒ‰éœ€å¯ç”¨ã€‚ä¸Šè¿°è½»é‡çº§é…å¯¹æ•°æ®å¿«ç…§ä»ä¼šæ— æ¡ä»¶æ‰§è¡Œã€‚

### Windowsï¼šå¦ä¸€ä¸ª `zed.exe` æ­£åœ¨è¿è¡Œ

åœ¨ Windows ä¸Šï¼Œå¦‚æžœ `zed update` æ£€æµ‹åˆ°å¦ä¸€ä¸ª `zed.exe` è¿›ç¨‹æŒæœ‰ venv å…¥å£ç‚¹å¯æ‰§è¡Œæ–‡ä»¶çš„å¥æŸ„ï¼Œå®ƒå°†æ‹’ç»è¿è¡Œ â€” æœ€å¸¸è§çš„æƒ…å†µæ˜¯ Zed Desktop åº”ç”¨å¯åŠ¨çš„åŽç«¯è¿›ç¨‹ã€å¦ä¸€ä¸ªç»ˆç«¯ä¸­æ‰“å¼€çš„ `zed` REPLï¼Œæˆ–æ­£åœ¨è¿è¡Œçš„ gatewayï¼š

```
$ zed update
âœ— Another zed.exe is running:
    PID 12345  zed.exe

  Updating now would fail to overwrite ...\venv\Scripts\zed.exe because
  Windows blocks REPLACE on a running executable.

  Close Zed Desktop, exit any open `zed` REPLs, and
  stop the gateway (`zed gateway stop`) before retrying.
  Override with `zed update --force` if you've already
  confirmed those processes will not write to the venv.
```

å…³é—­åˆ—å‡ºçš„è¿›ç¨‹åŽé‡è¯•ã€‚å¦‚æžœä½ ç¡®å®šå¹¶å‘è¿›ç¨‹ä¸ä¼šé€ æˆå¹²æ‰°ï¼ˆæžå°‘è§ â€” é€šå¸¸ä»…åœ¨æ€æ¯’è½¯ä»¶ shim è¢«è¯¯åˆ¤æ—¶æœ‰ç”¨ï¼‰ï¼Œå¯ä¼ å…¥ `--force` è·³è¿‡æ£€æŸ¥ã€‚æ­¤æ—¶æ›´æ–°ç¨‹åºä»ä¼šä»¥æŒ‡æ•°é€€é¿æ–¹å¼é‡è¯• `.exe` é‡å‘½åæ“ä½œï¼Œå¯¹äºŽé¡½å›ºçš„æ–‡ä»¶é”ï¼Œä¼šé€šè¿‡ `MoveFileEx(MOVEFILE_DELAY_UNTIL_REBOOT)` å°†æ›¿æ¢æ“ä½œå®‰æŽ’åœ¨ä¸‹æ¬¡é‡å¯æ—¶æ‰§è¡Œï¼Œä»¥ç¡®ä¿æ›´æ–°èƒ½å¤Ÿå®Œæˆã€‚

é¢„æœŸè¾“å‡ºå¦‚ä¸‹ï¼š

```
$ zed update
Updating Zed Agent...
ðŸ“¥ Pulling latest code...
Already up to date.  (or: Updating abc1234..def5678)
ðŸ“¦ Updating dependencies...
âœ… Dependencies updated
ðŸ” Checking for new config options...
âœ… Config is up to date  (or: Found 2 new options â€” running migration...)
ðŸ”„ Restarting gateways...
âœ… Gateway restarted
âœ… Zed Agent updated successfully!
```

### æ›´æ–°åŽå»ºè®®çš„éªŒè¯æ­¥éª¤

`zed update` å¤„ç†ä¸»è¦çš„æ›´æ–°æµç¨‹ï¼Œä½†å¿«é€ŸéªŒè¯å¯ç¡®è®¤ä¸€åˆ‡æ­£å¸¸è½åœ°ï¼š

1. `git status --short` â€” è‹¥å·¥ä½œæ ‘å‡ºçŽ°æ„å¤–çš„è„çŠ¶æ€ï¼Œè¯·åœ¨ç»§ç»­å‰æ£€æŸ¥
2. `zed doctor` â€” æ£€æŸ¥é…ç½®ã€ä¾èµ–é¡¹å’ŒæœåŠ¡å¥åº·çŠ¶æ€
3. `zed --version` â€” ç¡®è®¤ç‰ˆæœ¬å·²æŒ‰é¢„æœŸæ›´æ–°
4. å¦‚æžœä½¿ç”¨ gatewayï¼š`zed gateway status`
5. å¦‚æžœ `doctor` æŠ¥å‘Š npm audit é—®é¢˜ï¼šåœ¨æ ‡è®°çš„ç›®å½•ä¸­è¿è¡Œ `npm audit fix`

:::warning æ›´æ–°åŽå·¥ä½œæ ‘å‡ºçŽ°è„çŠ¶æ€
å¦‚æžœ `zed update` åŽ `git status --short` æ˜¾ç¤ºæ„å¤–å˜æ›´ï¼Œè¯·åœ¨ç»§ç»­å‰åœä¸‹æ¥æ£€æŸ¥ã€‚è¿™é€šå¸¸æ„å‘³ç€æœ¬åœ°ä¿®æ”¹è¢«é‡æ–°åº”ç”¨åˆ°äº†æ›´æ–°åŽçš„ä»£ç ä¹‹ä¸Šï¼Œæˆ–ä¾èµ–æ­¥éª¤åˆ·æ–°äº†é”æ–‡ä»¶ã€‚
:::

### ç»ˆç«¯åœ¨æ›´æ–°ä¸­é€”æ–­å¼€è¿žæŽ¥

`zed update` é’ˆå¯¹æ„å¤–ç»ˆç«¯æ–­å¼€è¿›è¡Œäº†ä¿æŠ¤ï¼š

- æ›´æ–°ä¼šå¿½ç•¥ `SIGHUP`ï¼Œå› æ­¤å…³é—­ SSH ä¼šè¯æˆ–ç»ˆç«¯çª—å£ä¸å†ä¼šåœ¨å®‰è£…ä¸­é€”ç»ˆæ­¢å®ƒã€‚`pip` å’Œ `git` å­è¿›ç¨‹ç»§æ‰¿æ­¤ä¿æŠ¤ï¼Œå› æ­¤ Python çŽ¯å¢ƒä¸ä¼šå› è¿žæŽ¥æ–­å¼€è€Œå¤„äºŽåŠå®‰è£…çŠ¶æ€ã€‚
- æ›´æ–°è¿è¡ŒæœŸé—´ï¼Œæ‰€æœ‰è¾“å‡ºä¼šåŒæ­¥é•œåƒåˆ° `~/.zed/logs/update.log`ã€‚å¦‚æžœç»ˆç«¯æ¶ˆå¤±ï¼Œé‡æ–°è¿žæŽ¥åŽæ£€æŸ¥æ—¥å¿—ï¼Œç¡®è®¤æ›´æ–°æ˜¯å¦å®Œæˆä»¥åŠ gateway é‡å¯æ˜¯å¦æˆåŠŸï¼š

```bash
tail -f ~/.zed/logs/update.log
```

- `Ctrl-C`ï¼ˆSIGINTï¼‰å’Œç³»ç»Ÿå…³æœºï¼ˆSIGTERMï¼‰ä»ä¼šè¢«å“åº” â€” è¿™äº›æ˜¯ä¸»åŠ¨å–æ¶ˆæ“ä½œï¼Œè€Œéžæ„å¤–ä¸­æ–­ã€‚

ä½ ä¸å†éœ€è¦å°† `zed update` åŒ…è£¹åœ¨ `screen` æˆ– `tmux` ä¸­æ¥åº”å¯¹ç»ˆç«¯æ–­å¼€ã€‚

### æŸ¥çœ‹å½“å‰ç‰ˆæœ¬

```bash
zed version
```

ä¸Ž [GitHub releases é¡µé¢](https://github.com/NousResearch/zed-agent/releases) ä¸Šçš„æœ€æ–°ç‰ˆæœ¬è¿›è¡Œæ¯”è¾ƒã€‚

### ä»Žæ¶ˆæ¯å¹³å°æ›´æ–°

ä½ ä¹Ÿå¯ä»¥ç›´æŽ¥ä»Ž Telegramã€Discordã€Slackã€WhatsApp æˆ– Teams å‘é€ä»¥ä¸‹å‘½ä»¤è¿›è¡Œæ›´æ–°ï¼š

```
/update
```

æ­¤å‘½ä»¤ä¼šæ‹‰å–æœ€æ–°ä»£ç ã€æ›´æ–°ä¾èµ–é¡¹å¹¶é‡å¯æ­£åœ¨è¿è¡Œçš„ gatewayã€‚Bot åœ¨é‡å¯æœŸé—´ä¼šçŸ­æš‚ä¸‹çº¿ï¼ˆé€šå¸¸ä¸º 5â€“15 ç§’ï¼‰ï¼Œä¹‹åŽæ¢å¤æœåŠ¡ã€‚

### æ‰‹åŠ¨æ›´æ–°

å¦‚æžœä½ æ˜¯æ‰‹åŠ¨å®‰è£…çš„ï¼ˆæœªä½¿ç”¨å¿«é€Ÿå®‰è£…è„šæœ¬ï¼‰ï¼š

```bash
cd /path/to/zed-agent
export VIRTUAL_ENV="$(pwd)/venv"

# Pull latest code
git pull origin main

# Reinstall (picks up new dependencies)
uv pip install -e ".[all]"

# Check for new config options
zed config check
zed config migrate   # Interactively add any missing options
```

### å›žæ»šè¯´æ˜Ž

å¦‚æžœæ›´æ–°å¼•å…¥äº†é—®é¢˜ï¼Œå¯ä»¥å›žæ»šåˆ°ä¹‹å‰çš„ç‰ˆæœ¬ï¼š

```bash
cd /path/to/zed-agent

# List recent versions
git log --oneline -10

# Roll back to a specific commit
git checkout <commit-hash>
uv pip install -e ".[all]"

# Restart the gateway if running
zed gateway restart
```

å›žæ»šåˆ°ç‰¹å®šå‘å¸ƒæ ‡ç­¾ï¼š

```bash
git checkout v0.6.0
uv pip install -e ".[all]"
```

:::warning
å¦‚æžœæ–°å¢žäº†é…ç½®é€‰é¡¹ï¼Œå›žæ»šå¯èƒ½å¯¼è‡´é…ç½®ä¸å…¼å®¹ã€‚å›žæ»šåŽè¿è¡Œ `zed config check`ï¼Œå¦‚æžœé‡åˆ°é”™è¯¯ï¼Œè¯·ä»Ž `config.yaml` ä¸­åˆ é™¤æ— æ³•è¯†åˆ«çš„é€‰é¡¹ã€‚
:::

### Nix ç”¨æˆ·æ³¨æ„äº‹é¡¹

å¦‚æžœä½ é€šè¿‡ Nix flake å®‰è£…ï¼Œæ›´æ–°ç”± Nix åŒ…ç®¡ç†å™¨è´Ÿè´£ï¼š

```bash
# Update the flake input
nix flake update zed-agent

# Or rebuild with the latest
nix profile upgrade zed-agent
```

Nix å®‰è£…æ˜¯ä¸å¯å˜çš„ â€” å›žæ»šç”± Nix çš„ generation ç³»ç»Ÿå¤„ç†ï¼š

```bash
nix profile rollback
```

è¯¦æƒ…å‚è§ [Nix å®‰è£…](./nix-setup.md)ã€‚

---

## å¸è½½

### Git å®‰è£…æ–¹å¼

```bash
zed uninstall
```

å¸è½½ç¨‹åºä¼šæä¾›é€‰é¡¹ï¼Œè®©ä½ ä¿ç•™é…ç½®æ–‡ä»¶ï¼ˆ`~/.zed/`ï¼‰ä»¥ä¾¿å°†æ¥é‡æ–°å®‰è£…ã€‚

### pip å®‰è£…æ–¹å¼

```bash
pip uninstall zed-agent
rm -rf ~/.zed            # å¯é€‰ â€” å¦‚è®¡åˆ’é‡æ–°å®‰è£…åˆ™ä¿ç•™
```

### æ‰‹åŠ¨å¸è½½

```bash
rm -f ~/.local/bin/zed
rm -rf /path/to/zed-agent
rm -rf ~/.zed            # å¯é€‰ â€” å¦‚è®¡åˆ’é‡æ–°å®‰è£…åˆ™ä¿ç•™
```

:::info
å¦‚æžœä½ å°† gateway å®‰è£…ä¸ºç³»ç»ŸæœåŠ¡ï¼Œè¯·å…ˆåœæ­¢å¹¶ç¦ç”¨å®ƒï¼š
```bash
zed gateway stop
# Linux: systemctl --user disable zed-gateway
# macOS: launchctl remove ai.zed.gateway
```
:::