---
sidebar_position: 2
---

# Profilesï¼šè¿è¡Œå¤šä¸ª Agent

åœ¨åŒä¸€å°æœºå™¨ä¸Šè¿è¡Œå¤šä¸ªç‹¬ç«‹çš„ Zed agentâ€”â€”æ¯ä¸ª agent æ‹¥æœ‰å„è‡ªçš„é…ç½®ã€API å¯†é’¥ã€è®°å¿†ã€ä¼šè¯ã€æŠ€èƒ½å’Œ gateway çŠ¶æ€ã€‚

## ä»€ä¹ˆæ˜¯ profileï¼Ÿ

profile æ˜¯ä¸€ä¸ªç‹¬ç«‹çš„ Zed ä¸»ç›®å½•ã€‚æ¯ä¸ª profile æ‹¥æœ‰è‡ªå·±çš„ç›®å½•ï¼Œå…¶ä¸­åŒ…å«å„è‡ªçš„ `config.yaml`ã€`.env`ã€`SOUL.md`ã€è®°å¿†ã€ä¼šè¯ã€æŠ€èƒ½ã€cron ä»»åŠ¡å’ŒçŠ¶æ€æ•°æ®åº“ã€‚profile è®©ä½ å¯ä»¥ä¸ºä¸åŒç”¨é€”è¿è¡Œç‹¬ç«‹çš„ agentâ€”â€”ç¼–ç¨‹åŠ©æ‰‹ã€ä¸ªäººæœºå™¨äººã€ç ”ç©¶ agentâ€”â€”è€Œä¸ä¼šæ··æ·† Zed çŠ¶æ€ã€‚

åˆ›å»º profile åŽï¼Œå®ƒä¼šè‡ªåŠ¨æˆä¸ºç‹¬ç«‹çš„å‘½ä»¤ã€‚åˆ›å»ºåä¸º `coder` çš„ profileï¼Œä½ ç«‹å³å°±æ‹¥æœ‰äº† `coder chat`ã€`coder setup`ã€`coder gateway start` ç­‰å‘½ä»¤ã€‚

## å¿«é€Ÿå¼€å§‹

```bash
zed profile create coder       # åˆ›å»º profile + "coder" å‘½ä»¤åˆ«å
coder setup                       # é…ç½® API å¯†é’¥å’Œæ¨¡åž‹
coder chat                        # å¼€å§‹å¯¹è¯
```

å°±è¿™äº›ã€‚`coder` çŽ°åœ¨æ˜¯æ‹¥æœ‰ç‹¬ç«‹é…ç½®ã€è®°å¿†å’ŒçŠ¶æ€çš„ Zed profileã€‚

## åˆ›å»º profile

### ç©ºç™½ profile

```bash
zed profile create mybot
```

åˆ›å»ºä¸€ä¸ªé¢„ç½®äº†å†…ç½®æŠ€èƒ½çš„å…¨æ–° profileã€‚è¿è¡Œ `mybot setup` é…ç½® API å¯†é’¥ã€æ¨¡åž‹å’Œ gateway tokenã€‚

å¦‚æžœä½ è®¡åˆ’å°†æ­¤ profile ç”¨ä½œ kanbanï¼ˆçœ‹æ¿ï¼‰å·¥ä½œèŠ‚ç‚¹ï¼ˆæˆ–å¸Œæœ› kanban ç¼–æŽ’å™¨å°†ä»»åŠ¡è·¯ç”±åˆ°å®ƒï¼‰ï¼Œåœ¨åˆ›å»ºæ—¶ä¼ å…¥ `--description "<è§’è‰²>"` ä»¥ä¾¿ç¼–æŽ’å™¨äº†è§£å…¶èƒ½åŠ›ï¼š

```bash
zed profile create researcher --description "Reads source code and external docs, writes findings."
```

ä½ ä¹Ÿå¯ä»¥ç¨åŽé€šè¿‡ `zed profile describe` è®¾ç½®æˆ–è‡ªåŠ¨ç”Ÿæˆæè¿°â€”â€”å®Œæ•´è·¯ç”±æ¨¡åž‹è¯·å‚é˜… [Kanban æŒ‡å—](./features/kanban#auto-vs-manual-orchestration)ã€‚

### ä»…å…‹éš†é…ç½®ï¼ˆ`--clone`ï¼‰

```bash
zed profile create work --clone
```

å°†å½“å‰ profile çš„ `config.yaml`ã€`.env`ã€`SOUL.md` å’Œ skills å¤åˆ¶åˆ°æ–° profileã€‚API å¯†é’¥ã€æ¨¡åž‹å’Œèƒ½åŠ›ç›¸åŒï¼Œä½†ä¼šè¯å’Œè®°å¿†æ˜¯å…¨æ–°çš„ã€‚ç¼–è¾‘ `~/.zed/profiles/work/.env` å¯ä½¿ç”¨ä¸åŒçš„ API å¯†é’¥ï¼Œç¼–è¾‘ `~/.zed/profiles/work/SOUL.md` å¯è®¾ç½®ä¸åŒçš„äººæ ¼ã€‚

### å…‹éš†å…¨éƒ¨å†…å®¹ï¼ˆ`--clone-all`ï¼‰

```bash
zed profile create backup --clone-all
```

å¤åˆ¶**æ‰€æœ‰å†…å®¹**â€”â€”é…ç½®ã€API å¯†é’¥ã€äººæ ¼ã€è®°å¿†ã€æŠ€èƒ½ã€cron ä»»åŠ¡ã€æ’ä»¶ã€‚ä¼šæŽ’é™¤æ¯ä¸ª profile è‡ªå·±çš„åŽ†å²æ•°æ®ï¼ˆä¼šè¯åŽ†å²ã€`state.db`ã€`backups/`ã€`state-snapshots/`ã€`checkpoints/`ï¼‰ï¼Œè¿™äº›æ•°æ®å±žäºŽæº profile ä¸”å¯èƒ½è¾¾åˆ°æ•°å GBã€‚è‹¥è¦åŒ…å«åŽ†å²çš„å®Œæ•´å¤‡ä»½ï¼Œè¯·ä½¿ç”¨ `zed profile export` æˆ– `zed backup`ã€‚

### ä»ŽæŒ‡å®š profile å…‹éš†

```bash
zed profile create work --clone-from coder
```

`--clone-from <source>` ä¼šç›´æŽ¥é€‰æ‹©æº profileï¼Œå¹¶éšå«æ‰§è¡Œ config/skills/SOUL å…‹éš†ã€‚è‹¥è¦å®Œæ•´å¤åˆ¶è¯¥æº profileï¼Œè¯·ä¸Ž `--clone-all` ç»„åˆä½¿ç”¨ï¼š

```bash
zed profile create work-backup --clone-from coder --clone-all
```

:::tip Honcho è®°å¿† + profiles
å¯ç”¨ Honcho åŽï¼Œå…‹éš†æ“ä½œä¼šè‡ªåŠ¨ä¸ºæ–° profile åˆ›å»ºä¸“å±ž AI å¯¹ç­‰ä½“ï¼ŒåŒæ—¶å…±äº«åŒä¸€ç”¨æˆ·å·¥ä½œåŒºã€‚æ¯ä¸ª profile æž„å»ºå„è‡ªçš„è§‚å¯Ÿè®°å½•å’Œèº«ä»½æ ‡è¯†ã€‚è¯¦è§ [Honchoâ€”â€”å¤š agent / Profiles](./features/memory-providers.md#honcho)ã€‚
:::

## ä½¿ç”¨ profile

### å‘½ä»¤åˆ«å

æ¯ä¸ª profile åœ¨ `~/.local/bin/<name>` è‡ªåŠ¨èŽ·å¾—ä¸€ä¸ªå‘½ä»¤åˆ«åï¼š

```bash
coder chat                    # ä¸Ž coder agent å¯¹è¯
coder setup                   # é…ç½® coder çš„è®¾ç½®
coder gateway start           # å¯åŠ¨ coder çš„ gateway
coder doctor                  # æ£€æŸ¥ coder çš„å¥åº·çŠ¶æ€
coder skills list             # åˆ—å‡º coder çš„æŠ€èƒ½
coder config set model.default anthropic/claude-sonnet-4
```

åˆ«åæ”¯æŒæ‰€æœ‰ zed å­å‘½ä»¤â€”â€”åº•å±‚å®žé™…ä¸Šæ˜¯ `zed -p <name>`ã€‚

### `-p` æ ‡å¿—

ä½ ä¹Ÿå¯ä»¥é€šè¿‡ä»»æ„å‘½ä»¤æ˜¾å¼æŒ‡å®š profileï¼š

```bash
zed -p coder chat
zed --profile=coder doctor
zed chat -p coder -q "hello"    # å¯åœ¨ä»»æ„ä½ç½®ä½¿ç”¨
```

### ç²˜æ€§é»˜è®¤å€¼ï¼ˆ`zed profile use`ï¼‰

```bash
zed profile use coder
zed chat                   # çŽ°åœ¨æŒ‡å‘ coder
zed tools                  # é…ç½® coder çš„å·¥å…·
zed profile use default    # åˆ‡æ¢å›žé»˜è®¤
```

è®¾ç½®é»˜è®¤å€¼åŽï¼Œæ™®é€š `zed` å‘½ä»¤å°†æŒ‡å‘è¯¥ profileã€‚ç±»ä¼¼äºŽ `kubectl config use-context`ã€‚

### äº†è§£å½“å‰æ‰€åœ¨ profile

CLI å§‹ç»ˆæ˜¾ç¤ºå½“å‰æ´»è·ƒçš„ profileï¼š

- **æç¤ºç¬¦**ï¼šæ˜¾ç¤º `coder â¯` è€Œéž `â¯`
- **å¯åŠ¨æ¨ªå¹…**ï¼šå¯åŠ¨æ—¶æ˜¾ç¤º `Profile: coder`
- **`zed profile`**ï¼šæ˜¾ç¤ºå½“å‰ profile åç§°ã€è·¯å¾„ã€æ¨¡åž‹ã€gateway çŠ¶æ€

## Profile vs å·¥ä½œåŒº vs æ²™ç®±

profile å¸¸ä¸Žå·¥ä½œåŒºæˆ–æ²™ç®±æ··æ·†ï¼Œä½†å®ƒä»¬æ˜¯ä¸åŒçš„æ¦‚å¿µï¼š

- **profile** ä¸º Zed æä¾›ç‹¬ç«‹çš„çŠ¶æ€ç›®å½•ï¼š`config.yaml`ã€`.env`ã€`SOUL.md`ã€ä¼šè¯ã€è®°å¿†ã€æ—¥å¿—ã€cron ä»»åŠ¡å’Œ gateway çŠ¶æ€ã€‚
- **å·¥ä½œåŒº**æˆ–**å·¥ä½œç›®å½•**æ˜¯ç»ˆç«¯å‘½ä»¤çš„èµ·å§‹ä½ç½®ï¼Œç”± `terminal.cwd` å•ç‹¬æŽ§åˆ¶ã€‚
- **æ²™ç®±**ç”¨äºŽé™åˆ¶æ–‡ä»¶ç³»ç»Ÿè®¿é—®ã€‚profile **ä¸**å¯¹ agent è¿›è¡Œæ²™ç®±éš”ç¦»ã€‚

åœ¨é»˜è®¤çš„ `local` ç»ˆç«¯åŽç«¯ï¼Œagent ä»æ‹¥æœ‰ä¸Žä½ çš„ç”¨æˆ·è´¦æˆ·ç›¸åŒçš„æ–‡ä»¶ç³»ç»Ÿè®¿é—®æƒé™ã€‚profile ä¸ä¼šé˜»æ­¢å…¶è®¿é—® profile ç›®å½•ä¹‹å¤–çš„æ–‡ä»¶å¤¹ã€‚

å¦‚æžœä½ å¸Œæœ› profile é»˜è®¤åœ¨ç‰¹å®šé¡¹ç›®æ–‡ä»¶å¤¹ä¸­å¯åŠ¨ï¼Œè¯·åœ¨è¯¥ profile çš„ `config.yaml` ä¸­è®¾ç½®ç»å¯¹è·¯å¾„çš„ `terminal.cwd`ï¼š

```yaml
terminal:
  backend: local
  cwd: /absolute/path/to/project
```

åœ¨ local åŽç«¯ä½¿ç”¨ `cwd: "."` è¡¨ç¤º"Zed å¯åŠ¨æ—¶æ‰€åœ¨çš„ç›®å½•"ï¼Œè€Œéž"profile ç›®å½•"ã€‚

å¦è¯·æ³¨æ„ï¼š

- `SOUL.md` å¯ä»¥å¼•å¯¼æ¨¡åž‹ï¼Œä½†ä¸èƒ½å¼ºåˆ¶é™å®šå·¥ä½œåŒºè¾¹ç•Œã€‚
- `SOUL.md` çš„æ›´æ”¹åœ¨æ–°ä¼šè¯ä¸­ä¼šç”Ÿæ•ˆã€‚çŽ°æœ‰ä¼šè¯å¯èƒ½ä»åœ¨ä½¿ç”¨æ—§çš„ promptï¼ˆæç¤ºè¯ï¼‰çŠ¶æ€ã€‚
- è¯¢é—®æ¨¡åž‹"ä½ åœ¨å“ªä¸ªç›®å½•ï¼Ÿ"å¹¶ä¸æ˜¯å¯é çš„éš”ç¦»æµ‹è¯•ã€‚å¦‚æžœä½ éœ€è¦å·¥å…·æœ‰å¯é¢„æµ‹çš„èµ·å§‹ç›®å½•ï¼Œè¯·æ˜¾å¼è®¾ç½® `terminal.cwd`ã€‚

## è¿è¡Œ gateway

æ¯ä¸ª profile ä»¥ç‹¬ç«‹è¿›ç¨‹è¿è¡Œå„è‡ªçš„ gatewayï¼Œä½¿ç”¨å„è‡ªçš„ bot tokenï¼š

```bash
coder gateway start           # å¯åŠ¨ coder çš„ gateway
assistant gateway start       # å¯åŠ¨ assistant çš„ gatewayï¼ˆç‹¬ç«‹è¿›ç¨‹ï¼‰
```

### ä¸åŒçš„ bot token

æ¯ä¸ª profile æœ‰å„è‡ªçš„ `.env` æ–‡ä»¶ã€‚åœ¨å„æ–‡ä»¶ä¸­é…ç½®ä¸åŒçš„ Telegram/Discord/Slack bot tokenï¼š

```bash
# ç¼–è¾‘ coder çš„ token
nano ~/.zed/profiles/coder/.env

# ç¼–è¾‘ assistant çš„ token
nano ~/.zed/profiles/assistant/.env
```

### å®‰å…¨æ€§ï¼štoken é”

å¦‚æžœä¸¤ä¸ª profile æ„å¤–ä½¿ç”¨äº†ç›¸åŒçš„ bot tokenï¼Œç¬¬äºŒä¸ª gateway å°†è¢«é˜»æ­¢å¹¶æ˜¾ç¤ºæ˜Žç¡®çš„é”™è¯¯ä¿¡æ¯ï¼ŒæŒ‡å‡ºå†²çªçš„ profileã€‚æ”¯æŒ Telegramã€Discordã€Slackã€WhatsApp å’Œ Signalã€‚

### æŒä¹…åŒ–æœåŠ¡

```bash
coder gateway install         # åˆ›å»º zed-gateway-coder systemd/launchd æœåŠ¡
assistant gateway install     # åˆ›å»º zed-gateway-assistant æœåŠ¡
```

æ¯ä¸ª profile æ‹¥æœ‰ç‹¬ç«‹çš„æœåŠ¡åç§°ï¼Œå„è‡ªç‹¬ç«‹è¿è¡Œã€‚

:::note åœ¨å®˜æ–¹ Docker é•œåƒä¸­
å„ profile çš„ gateway ç”± [s6-overlay](https://github.com/just-containers/s6-overlay)ï¼ˆå®¹å™¨ä¸­çš„ PID 1ï¼‰ç›‘ç®¡ï¼Œå› æ­¤ `zed profile create <name>` ä¼šè‡ªåŠ¨åœ¨ `/run/service/gateway-<name>/` æ³¨å†Œ s6 æœåŠ¡æ§½ã€‚`zed -p <name> gateway start/stop/restart` ä¼šè°ƒåº¦åˆ° `s6-svc` è€Œéžç›´æŽ¥å¯åŠ¨è£¸è¿›ç¨‹â€”â€”å´©æºƒåŽè‡ªåŠ¨é‡å¯ï¼Œ`docker restart` ä¼šä¿ç•™ä¹‹å‰è¿è¡Œçš„ gateway é›†åˆã€‚è¯¦è§ [å„ profile gateway ç›‘ç®¡](/user-guide/docker#per-profile-gateway-supervision)ã€‚
:::

## é…ç½® profile

æ¯ä¸ª profile æ‹¥æœ‰å„è‡ªçš„ï¼š

- **`config.yaml`** â€” æ¨¡åž‹ã€æä¾›å•†ã€å·¥å…·é›†åŠæ‰€æœ‰è®¾ç½®
- **`.env`** â€” API å¯†é’¥ã€bot token
- **`SOUL.md`** â€” äººæ ¼ä¸ŽæŒ‡ä»¤

```bash
coder config set model.default anthropic/claude-sonnet-4
echo "You are a focused coding assistant." > ~/.zed/profiles/coder/SOUL.md
```

å¦‚æžœä½ å¸Œæœ›æ­¤ profile é»˜è®¤åœ¨ç‰¹å®šé¡¹ç›®ä¸­å·¥ä½œï¼Œè¿˜éœ€è®¾ç½®å…¶ `terminal.cwd`ï¼š

```bash
coder config set terminal.cwd /absolute/path/to/project
```

## æ›´æ–°

`zed update` æ‹‰å–ä¸€æ¬¡ä»£ç ï¼ˆå…±äº«ï¼‰ï¼Œå¹¶è‡ªåŠ¨å°†æ–°çš„å†…ç½®æŠ€èƒ½åŒæ­¥åˆ°**æ‰€æœ‰** profileï¼š

```bash
zed update
# â†’ Code updated (12 commits)
# â†’ Skills synced: default (up to date), coder (+2 new), assistant (+2 new)
```

ç”¨æˆ·ä¿®æ”¹è¿‡çš„æŠ€èƒ½ä¸ä¼šè¢«è¦†ç›–ã€‚

## ç®¡ç† profile

```bash
zed profile list           # æ˜¾ç¤ºæ‰€æœ‰ profile åŠå…¶çŠ¶æ€
zed profile show coder     # æ˜¾ç¤ºæŸä¸ª profile çš„è¯¦ç»†ä¿¡æ¯
zed profile rename coder dev-bot   # é‡å‘½åï¼ˆåŒæ­¥æ›´æ–°åˆ«åå’ŒæœåŠ¡ï¼‰
zed profile export coder   # å¯¼å‡ºä¸º coder.tar.gz
zed profile import coder.tar.gz   # ä»Žå½’æ¡£æ–‡ä»¶å¯¼å…¥
```

## åˆ é™¤ profile

```bash
zed profile delete coder
```

æ­¤æ“ä½œå°†åœæ­¢ gatewayã€ç§»é™¤ systemd/launchd æœåŠ¡ã€ç§»é™¤å‘½ä»¤åˆ«åå¹¶åˆ é™¤æ‰€æœ‰ profile æ•°æ®ã€‚ç³»ç»Ÿä¼šè¦æ±‚ä½ è¾“å…¥ profile åç§°ä»¥ç¡®è®¤ã€‚

ä½¿ç”¨ `--yes` è·³è¿‡ç¡®è®¤ï¼š`zed profile delete coder --yes`

:::note
ä½ æ— æ³•åˆ é™¤é»˜è®¤ profileï¼ˆ`~/.zed`ï¼‰ã€‚å¦‚éœ€åˆ é™¤æ‰€æœ‰å†…å®¹ï¼Œè¯·ä½¿ç”¨ `zed uninstall`ã€‚
:::

## Tab è¡¥å…¨

```bash
# Bash
eval "$(zed completion bash)"

# Zsh
eval "$(zed completion zsh)"
```

å°†è¯¥è¡Œæ·»åŠ åˆ° `~/.bashrc` æˆ– `~/.zshrc` ä»¥å¯ç”¨æŒä¹…è¡¥å…¨ã€‚æ”¯æŒè¡¥å…¨ `-p` åŽçš„ profile åç§°ã€profile å­å‘½ä»¤åŠé¡¶çº§å‘½ä»¤ã€‚

## å·¥ä½œåŽŸç†

profile ä½¿ç”¨ `ZED_HOME` çŽ¯å¢ƒå˜é‡ã€‚è¿è¡Œ `coder chat` æ—¶ï¼ŒåŒ…è£…è„šæœ¬åœ¨å¯åŠ¨ zed å‰å°† `ZED_HOME` è®¾ç½®ä¸º `~/.zed/profiles/coder`ã€‚ç”±äºŽä»£ç åº“ä¸­ 119+ ä¸ªæ–‡ä»¶é€šè¿‡ `get_zed_home()` è§£æžè·¯å¾„ï¼ŒZed çŠ¶æ€ä¼šè‡ªåŠ¨é™å®šåœ¨ profile ç›®å½•èŒƒå›´å†…â€”â€”åŒ…æ‹¬é…ç½®ã€ä¼šè¯ã€è®°å¿†ã€æŠ€èƒ½ã€çŠ¶æ€æ•°æ®åº“ã€gateway PIDã€æ—¥å¿—å’Œ cron ä»»åŠ¡ã€‚

è¿™ä¸Žç»ˆç«¯å·¥ä½œç›®å½•æ˜¯åˆ†å¼€çš„ã€‚å·¥å…·æ‰§è¡Œä»Ž `terminal.cwd` å¼€å§‹ï¼ˆæˆ–åœ¨ local åŽç«¯ä½¿ç”¨ `cwd: "."` æ—¶ä»Žå¯åŠ¨ç›®å½•å¼€å§‹ï¼‰ï¼Œè€Œéžè‡ªåŠ¨ä»Ž `ZED_HOME` å¼€å§‹ã€‚

é»˜è®¤ profile å°±æ˜¯ `~/.zed` æœ¬èº«ã€‚æ— éœ€è¿ç§»â€”â€”çŽ°æœ‰å®‰è£…çš„å·¥ä½œæ–¹å¼å®Œå…¨ä¸å˜ã€‚

## å°† profile ä½œä¸ºå‘è¡Œç‰ˆå…±äº«

ä½ åœ¨ä¸€å°æœºå™¨ä¸Šæž„å»ºçš„ profile å¯ä»¥æ‰“åŒ…ä¸º **git ä»“åº“**ï¼Œå¹¶é€šè¿‡ä¸€æ¡å‘½ä»¤å®‰è£…åˆ°å¦ä¸€å°æœºå™¨â€”â€”ä½ è‡ªå·±çš„å·¥ä½œç«™ã€å›¢é˜Ÿæˆå‘˜çš„ç¬”è®°æœ¬ï¼Œæˆ–ç¤¾åŒºç”¨æˆ·çš„çŽ¯å¢ƒã€‚å…±äº«åŒ…åŒ…å« SOULã€é…ç½®ã€æŠ€èƒ½ã€cron ä»»åŠ¡å’Œ MCP è¿žæŽ¥ã€‚å‡­æ®ã€è®°å¿†å’Œä¼šè¯ä¿æŒå„æœºå™¨ç‹¬ç«‹ã€‚

```bash
# ä»Ž git ä»“åº“å®‰è£…å®Œæ•´ agent
zed profile install github.com/you/research-bot --alias

# å½“ä½œè€…å‘å¸ƒæ–°ç‰ˆæœ¬æ—¶æ›´æ–°ï¼ˆä¿ç•™ä½ çš„è®°å¿†å’Œ .envï¼‰
zed profile update research-bot
```

å®Œæ•´æŒ‡å—è¯·å‚é˜… **[Profile å‘è¡Œç‰ˆï¼šå…±äº«å®Œæ•´ Agent](./profile-distributions.md)**â€”â€”åŒ…æ‹¬ç¼–å†™ã€å‘å¸ƒã€æ›´æ–°è¯­ä¹‰ã€å®‰å…¨æ¨¡åž‹å’Œä½¿ç”¨åœºæ™¯ã€‚
