---
sidebar_position: 7
---

# Profile å‘½ä»¤å‚è€ƒ

æœ¬é¡µæ¶µç›–æ‰€æœ‰ä¸Ž [Zed profiles](../user-guide/profiles.md) ç›¸å…³çš„å‘½ä»¤ã€‚é€šç”¨ CLI å‘½ä»¤è¯·å‚é˜… [CLI å‘½ä»¤å‚è€ƒ](./cli-commands.md)ã€‚

## `zed profile`

```bash
zed profile <subcommand>
```

ç®¡ç† profile çš„é¡¶çº§å‘½ä»¤ã€‚ä¸å¸¦å­å‘½ä»¤è¿è¡Œ `zed profile` å°†æ˜¾ç¤ºå¸®åŠ©ä¿¡æ¯ã€‚

| å­å‘½ä»¤ | æè¿° |
|------------|-------------|
| `list` | åˆ—å‡ºæ‰€æœ‰ profileã€‚ |
| `use` | è®¾ç½®å½“å‰æ´»è·ƒï¼ˆé»˜è®¤ï¼‰profileã€‚ |
| `create` | åˆ›å»ºæ–° profileã€‚ |
| `delete` | åˆ é™¤ profileã€‚ |
| `show` | æ˜¾ç¤º profile è¯¦æƒ…ã€‚ |
| `alias` | é‡æ–°ç”Ÿæˆ profile çš„ shell aliasã€‚ |
| `rename` | é‡å‘½å profileã€‚ |
| `export` | å°† profile å¯¼å‡ºä¸º tar.gz å½’æ¡£æ–‡ä»¶ã€‚ |
| `import` | ä»Ž tar.gz å½’æ¡£æ–‡ä»¶å¯¼å…¥ profileã€‚ |
| `install` | ä»Ž git URL æˆ–æœ¬åœ°ç›®å½•å®‰è£… profile å‘è¡Œç‰ˆã€‚å‚è§ [Profile å‘è¡Œç‰ˆ](../user-guide/profile-distributions.md)ã€‚ |
| `update` | é‡æ–°æ‹‰å–å‘è¡Œç‰ˆç®¡ç†çš„ profile å¹¶é‡æ–°åº”ç”¨å…¶ bundleã€‚ |
| `info` | æ˜¾ç¤º profile çš„å‘è¡Œç‰ˆå…ƒæ•°æ®ï¼ˆæ¥æº URLã€commitã€æœ€åŽæ›´æ–°æ—¶é—´ï¼‰ã€‚ |

## `zed profile list`

```bash
zed profile list
```

åˆ—å‡ºæ‰€æœ‰ profileã€‚å½“å‰æ´»è·ƒçš„ profile ä»¥ `*` æ ‡è®°ã€‚

**ç¤ºä¾‹ï¼š**

```bash
$ zed profile list
  default
* work
  dev
  personal
```

æ— é€‰é¡¹ã€‚

## `zed profile use`

```bash
zed profile use <name>
```

å°† `<name>` è®¾ä¸ºæ´»è·ƒ profileã€‚æ­¤åŽæ‰€æœ‰ `zed` å‘½ä»¤ï¼ˆä¸å¸¦ `-p`ï¼‰éƒ½å°†ä½¿ç”¨è¯¥ profileã€‚

| å‚æ•° | æè¿° |
|----------|-------------|
| `<name>` | è¦æ¿€æ´»çš„ profile åç§°ã€‚ä½¿ç”¨ `default` å¯è¿”å›žåŸºç¡€ profileã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
zed profile use work
zed profile use default
```

## `zed profile create`

```bash
zed profile create <name> [options]
```

åˆ›å»ºæ–° profileã€‚

| å‚æ•° / é€‰é¡¹ | æè¿° |
|-------------------|-------------|
| `<name>` | æ–° profile çš„åç§°ã€‚å¿…é¡»æ˜¯åˆæ³•çš„ç›®å½•åï¼ˆå­—æ¯æ•°å­—ã€è¿žå­—ç¬¦ã€ä¸‹åˆ’çº¿ï¼‰ã€‚ |
| `--clone` | ä»Žå½“å‰ profile å¤åˆ¶ `config.yaml`ã€`.env`ã€`SOUL.md` å’Œ skillsã€‚ |
| `--clone-all` | ä»Žå½“å‰ profile å¤åˆ¶æ‰€æœ‰å†…å®¹ï¼ˆconfigã€memoriesã€skillsã€cronã€pluginsï¼‰ã€‚ä¼šæŽ’é™¤æ¯ä¸ª profile è‡ªå·±çš„åŽ†å²æ•°æ®ï¼šsessionsã€`state.db`ã€backupsã€state-snapshotsã€checkpointsã€‚ |
| `--clone-from <profile>` | ä»ŽæŒ‡å®š profile å…‹éš† config/skills/SOULï¼Œè€Œéžå½“å‰ profileã€‚é™¤éžä¸Ž `--clone-all` é…åˆä½¿ç”¨ï¼Œå¦åˆ™ä¼šéšå« `--clone`ã€‚ |
| `--no-alias` | è·³è¿‡ wrapper è„šæœ¬åˆ›å»ºã€‚ |
| `--description "<text>"` | ä¸€åˆ°ä¸¤å¥è¯æè¿°è¯¥ profile çš„ç”¨é€”ã€‚ä¾› kanban ç¼–æŽ’å™¨æ ¹æ®è§’è‰²è€Œéžä»…å‡­ profile åç§°æ¥è·¯ç”±ä»»åŠ¡ã€‚å¯è·³è¿‡ï¼Œç¨åŽé€šè¿‡ `zed profile describe` æ·»åŠ ã€‚æŒä¹…åŒ–ä¿å­˜åœ¨ `<profile_dir>/profile.yaml` ä¸­ã€‚ |
| `--no-skills` | åˆ›å»ºä¸€ä¸ª**ç©º** profileï¼Œä¸å¯ç”¨ä»»ä½•å†…ç½® skillã€‚ä¼šåœ¨ profile ç›®å½•ä¸­å†™å…¥ `.no-bundled-skills` æ ‡è®°ï¼Œä½¿åŽç»­ `zed update` ä¸å†é‡æ–°æ¤å…¥å†…ç½® skill é›†ï¼Œä¸”æ‹’ç»ä¸Ž `--clone`ã€`--clone-from` æˆ– `--clone-all` ç»„åˆä½¿ç”¨ï¼ˆå› ä¸ºè¿™äº›é€‰é¡¹ä¼šå¤åˆ¶ skillï¼‰ã€‚é€‚ç”¨äºŽä¸åº”ç»§æ‰¿å®Œæ•´ skill ç›®å½•çš„çª„åŒ–ç¼–æŽ’å™¨ profile æˆ–æ²™ç®± profileã€‚ |

åˆ›å»º profile **ä¸ä¼š**å°†è¯¥ profile ç›®å½•è®¾ä¸ºç»ˆç«¯å‘½ä»¤çš„é»˜è®¤é¡¹ç›®/å·¥ä½œç›®å½•ã€‚å¦‚éœ€è®©æŸä¸ª profile ä»Žç‰¹å®šé¡¹ç›®ç›®å½•å¯åŠ¨ï¼Œè¯·åœ¨è¯¥ profile çš„ `config.yaml` ä¸­è®¾ç½® `terminal.cwd`ã€‚

**ç¤ºä¾‹ï¼š**

```bash
# ç©ºç™½ profile â€” éœ€è¦å®Œæ•´é…ç½®
zed profile create mybot

# ä»…ä»Žå½“å‰ profile å…‹éš† config
zed profile create work --clone

# ä»Žå½“å‰ profile å…‹éš†æ‰€æœ‰å†…å®¹
zed profile create backup --clone-all

# ä»ŽæŒ‡å®š profile å…‹éš† config
zed profile create work2 --clone-from work

# ä»ŽæŒ‡å®š profile å…‹éš†æ‰€æœ‰å†…å®¹
zed profile create work2-backup --clone-from work --clone-all
```

## `zed profile describe`

```bash
zed profile describe [<name>] [options]
```

è¯»å–æˆ–è®¾ç½® profile çš„æè¿°ã€‚æè¿°ç”± kanban ç¼–æŽ’å™¨ä½¿ç”¨ï¼Œç”¨äºŽæ ¹æ®æ¯ä¸ª profile çš„èƒ½åŠ›è·¯ç”±ä»»åŠ¡ï¼Œè€Œéžä»…å‡­ profile åç§°çŒœæµ‹ã€‚æŒä¹…åŒ–ä¿å­˜åœ¨ `<profile_dir>/profile.yaml` ä¸­ï¼Œé‡å¯åŽä»æœ‰æ•ˆï¼Œå¹¶ä¸Ž gateway å…±äº«ã€‚

ä¸å¸¦ä»»ä½•æ ‡å¿—æ—¶ï¼Œæ‰“å°å½“å‰æè¿°ï¼ˆè‹¥ä¸ºç©ºåˆ™æ˜¾ç¤º `(no description set for '<name>')`ï¼‰ã€‚

| å‚æ•° / é€‰é¡¹ | æè¿° |
|-------------------|-------------|
| `<name>` | è¦æè¿°çš„ profileã€‚é™¤éžä½¿ç”¨ `--all --auto`ï¼Œå¦åˆ™å¿…å¡«ã€‚ |
| `--text "<text>"` | å°†æè¿°è®¾ç½®ä¸ºæ­¤ç²¾ç¡®æ–‡æœ¬ï¼ˆç”¨æˆ·ç¼–å†™ï¼‰ã€‚è¦†ç›–å·²æœ‰æè¿°ã€‚ |
| `--auto` | é€šè¿‡è¾…åŠ© LLM è‡ªåŠ¨ç”Ÿæˆ 1-2 å¥æè¿°ï¼Œä¾æ®ä¸ºè¯¥ profile å·²å®‰è£…çš„ skillã€é…ç½®çš„æ¨¡åž‹å’Œåç§°ã€‚åœ¨ `config.yaml` çš„ `auxiliary.profile_describer` ä¸‹é…ç½®æ¨¡åž‹ã€‚è‡ªåŠ¨ç”Ÿæˆçš„æè¿°ä¼šæ ‡è®° `description_auto: true`ï¼Œä»¥ä¾¿ dashboard æ ‡è®°ä¾›å®¡æŸ¥ã€‚ |
| `--overwrite` | ä¸Ž `--auto` é…åˆä½¿ç”¨æ—¶ï¼Œä¹Ÿæ›¿æ¢ç”¨æˆ·ç¼–å†™çš„æè¿°ï¼ˆé»˜è®¤ï¼šè·³è¿‡å·²æ˜Žç¡®è®¾ç½®æè¿°çš„ profileï¼‰ã€‚ |
| `--all` | ä¸Ž `--auto` é…åˆä½¿ç”¨æ—¶ï¼Œæ‰«ææ‰€æœ‰ç¼ºå°‘æè¿°çš„ profileã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
# è¯»å–å½“å‰æè¿°
zed profile describe researcher

# æ˜¾å¼è®¾ç½®æè¿°
zed profile describe researcher --text "Reads source code and writes findings."

# è®© LLM ç”Ÿæˆæè¿°
zed profile describe researcher --auto

# ä¸ºæ‰€æœ‰æ²¡æœ‰æè¿°çš„ profile å¡«å……æè¿°
zed profile describe --all --auto
```

## `zed profile delete`

```bash
zed profile delete <name> [options]
```

åˆ é™¤ profile å¹¶ç§»é™¤å…¶ shell aliasã€‚

| å‚æ•° / é€‰é¡¹ | æè¿° |
|-------------------|-------------|
| `<name>` | è¦åˆ é™¤çš„ profileã€‚ |
| `--yes`, `-y` | è·³è¿‡ç¡®è®¤æç¤ºã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
zed profile delete mybot
zed profile delete mybot --yes
```

:::warning
æ­¤æ“ä½œå°†æ°¸ä¹…åˆ é™¤ profile çš„æ•´ä¸ªç›®å½•ï¼ŒåŒ…æ‹¬æ‰€æœ‰ configã€memoriesã€sessions å’Œ skillsã€‚æ— æ³•åˆ é™¤å½“å‰æ´»è·ƒçš„ profileã€‚
:::

## `zed profile show`

```bash
zed profile show <name>
```

æ˜¾ç¤º profile çš„è¯¦ç»†ä¿¡æ¯ï¼ŒåŒ…æ‹¬å…¶ä¸»ç›®å½•ã€é…ç½®çš„æ¨¡åž‹ã€gateway çŠ¶æ€ã€skill æ•°é‡å’Œé…ç½®æ–‡ä»¶çŠ¶æ€ã€‚

æ­¤å¤„æ˜¾ç¤ºçš„æ˜¯ profile çš„ Zed ä¸»ç›®å½•ï¼Œè€Œéžç»ˆç«¯å·¥ä½œç›®å½•ã€‚ç»ˆç«¯å‘½ä»¤ä»Ž `terminal.cwd` å¯åŠ¨ï¼ˆæˆ–åœ¨æœ¬åœ°åŽç«¯ `cwd: "."` æ—¶ä»Žå¯åŠ¨ç›®å½•å¯åŠ¨ï¼‰ã€‚

| å‚æ•° | æè¿° |
|----------|-------------|
| `<name>` | è¦æŸ¥çœ‹çš„ profileã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
$ zed profile show work
Profile: work
Path:    ~/.zed/profiles/work
Model:   anthropic/claude-sonnet-4 (anthropic)
Gateway: stopped
Skills:  12
.env:    exists
SOUL.md: exists
Alias:   ~/.local/bin/work
```

## `zed profile alias`

```bash
zed profile alias <name> [options]
```

é‡æ–°ç”Ÿæˆä½äºŽ `~/.local/bin/<name>` çš„ shell alias è„šæœ¬ã€‚é€‚ç”¨äºŽ alias è¢«æ„å¤–åˆ é™¤ï¼Œæˆ–ç§»åŠ¨ Zed å®‰è£…ç›®å½•åŽéœ€è¦æ›´æ–°çš„æƒ…å†µã€‚

| å‚æ•° / é€‰é¡¹ | æè¿° |
|-------------------|-------------|
| `<name>` | è¦åˆ›å»º/æ›´æ–° alias çš„ profileã€‚ |
| `--remove` | ç§»é™¤ wrapper è„šæœ¬è€Œéžåˆ›å»ºã€‚ |
| `--name <alias>` | è‡ªå®šä¹‰ alias åç§°ï¼ˆé»˜è®¤ï¼šprofile åç§°ï¼‰ã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
zed profile alias work
# åˆ›å»º/æ›´æ–° ~/.local/bin/work

zed profile alias work --name mywork
# åˆ›å»º ~/.local/bin/mywork

zed profile alias work --remove
# ç§»é™¤ wrapper è„šæœ¬
```

## `zed profile rename`

```bash
zed profile rename <old-name> <new-name>
```

é‡å‘½å profileï¼ŒåŒæ—¶æ›´æ–°ç›®å½•å’Œ shell aliasã€‚

| å‚æ•° | æè¿° |
|----------|-------------|
| `<old-name>` | å½“å‰ profile åç§°ã€‚ |
| `<new-name>` | æ–° profile åç§°ã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
zed profile rename mybot assistant
# ~/.zed/profiles/mybot â†’ ~/.zed/profiles/assistant
# ~/.local/bin/mybot â†’ ~/.local/bin/assistant
```

## `zed profile export`

```bash
zed profile export <name> [options]
```

å°† profile å¯¼å‡ºä¸ºåŽ‹ç¼©çš„ tar.gz å½’æ¡£æ–‡ä»¶ã€‚

| å‚æ•° / é€‰é¡¹ | æè¿° |
|-------------------|-------------|
| `<name>` | è¦å¯¼å‡ºçš„ profileã€‚ |
| `-o`, `--output <path>` | è¾“å‡ºæ–‡ä»¶è·¯å¾„ï¼ˆé»˜è®¤ï¼š`<name>.tar.gz`ï¼‰ã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
zed profile export work
# åœ¨å½“å‰ç›®å½•åˆ›å»º work.tar.gz

zed profile export work -o ./work-2026-03-29.tar.gz
```

## `zed profile import`

```bash
zed profile import <archive> [options]
```

ä»Ž tar.gz å½’æ¡£æ–‡ä»¶å¯¼å…¥ profileã€‚

| å‚æ•° / é€‰é¡¹ | æè¿° |
|-------------------|-------------|
| `<archive>` | è¦å¯¼å…¥çš„ tar.gz å½’æ¡£æ–‡ä»¶è·¯å¾„ã€‚ |
| `--name <name>` | å¯¼å…¥åŽçš„ profile åç§°ï¼ˆé»˜è®¤ï¼šä»Žå½’æ¡£æ–‡ä»¶æŽ¨æ–­ï¼‰ã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
zed profile import ./work-2026-03-29.tar.gz
# ä»Žå½’æ¡£æ–‡ä»¶æŽ¨æ–­ profile åç§°

zed profile import ./work-2026-03-29.tar.gz --name work-restored
```

## å‘è¡Œç‰ˆå‘½ä»¤

:::tip
**åˆæ¬¡æŽ¥è§¦å‘è¡Œç‰ˆï¼Ÿ** è¯·å…ˆé˜…è¯» [Profile å‘è¡Œç‰ˆç”¨æˆ·æŒ‡å—](../user-guide/profile-distributions.md) â€” å…¶ä¸­é€šè¿‡å®Œæ•´ç¤ºä¾‹ä»‹ç»äº†åŽŸå› ã€æ—¶æœºå’Œæ–¹æ³•ã€‚ä»¥ä¸‹ç« èŠ‚æ˜¯åœ¨ä½ å·²çŸ¥éœ€æ±‚æ—¶ä½¿ç”¨çš„ç®€æ˜Ž CLI å‚è€ƒã€‚
:::

å‘è¡Œç‰ˆå°† profile è½¬å˜ä¸ºå¯å…±äº«ã€æœ‰ç‰ˆæœ¬çš„åˆ¶å“ï¼Œä»¥ **git ä»“åº“**å½¢å¼å‘å¸ƒã€‚æŽ¥æ”¶æ–¹åªéœ€ä¸€æ¡å‘½ä»¤å³å¯å®‰è£…å‘è¡Œç‰ˆï¼Œå¹¶å¯åœ¨ä¸å½±å“æœ¬åœ° memoriesã€sessions æˆ–å‡­æ®çš„æƒ…å†µä¸‹å°±åœ°æ›´æ–°ã€‚

`auth.json` å’Œ `.env` æ°¸è¿œä¸å±žäºŽå‘è¡Œç‰ˆçš„ä¸€éƒ¨åˆ† â€” å®ƒä»¬ä¿ç•™åœ¨å®‰è£…ç”¨æˆ·çš„æœºå™¨ä¸Šã€‚

æŽ¥æ”¶æ–¹çš„ç”¨æˆ·æ•°æ®ï¼ˆmemoriesã€sessionsã€authã€å¯¹ `.env` çš„è‡ªæœ‰ç¼–è¾‘ï¼‰åœ¨åˆæ¬¡å®‰è£…å’ŒåŽç»­æ›´æ–°ä¸­å§‹ç»ˆå¾—åˆ°ä¿ç•™ã€‚

:::info
`zed profile export` / `import` ä»æ˜¯åœ¨**æœ¬æœºè¿›è¡Œ profile æœ¬åœ°å¤‡ä»½å’Œæ¢å¤**çš„æ­£ç¡®å‘½ä»¤ã€‚å‘è¡Œç‰ˆï¼ˆ`install` / `update` / `info`ï¼‰æ˜¯ç‹¬ç«‹æ¦‚å¿µï¼šé€šè¿‡ git åˆ†å‘ profileï¼Œä¾›ä»–äººå®‰è£…ã€‚
:::

### `zed profile install`

```bash
zed profile install <source> [--name <name>] [--alias] [--force] [--yes]
```

ä»Ž git URL æˆ–æœ¬åœ°ç›®å½•å®‰è£… profile å‘è¡Œç‰ˆã€‚

| é€‰é¡¹ | æè¿° |
|--------|-------------|
| `<source>` | Git URLï¼ˆ`github.com/user/repo`ã€`https://...`ã€`git@...`ã€`ssh://`ã€`git://`ï¼‰æˆ–åŒ…å« `distribution.yaml` çš„æœ¬åœ°ç›®å½•æ ¹è·¯å¾„ã€‚ |
| `--name NAME` | è¦†ç›– manifest ä¸­çš„ profile åç§°ã€‚ |
| `--alias` | åŒæ—¶åˆ›å»º shell wrapperï¼ˆä¾‹å¦‚ `telemetry` â†’ `zed -p telemetry`ï¼‰ã€‚ |
| `--force` | è¦†ç›–åŒåçš„å·²æœ‰ profileã€‚ç”¨æˆ·æ•°æ®ä»ä¼šä¿ç•™ã€‚ |
| `-y`, `--yes` | è·³è¿‡ manifest é¢„è§ˆç¡®è®¤æç¤ºã€‚ |

å®‰è£…ç¨‹åºä¼šæ˜¾ç¤º manifestã€åˆ—å‡ºæ‰€éœ€çš„çŽ¯å¢ƒå˜é‡ï¼Œå¹¶åœ¨è¯¢é—®ç¡®è®¤å‰æç¤º cron ä»»åŠ¡ä¿¡æ¯ã€‚æ‰€éœ€çŽ¯å¢ƒå˜é‡ä¼šå†™å…¥ `.env.EXAMPLE` æ–‡ä»¶ï¼Œå¤åˆ¶ä¸º `.env` åŽå¡«å†™å³å¯ã€‚

**ç¤ºä¾‹ï¼š**

```bash
# ä»Ž GitHub ä»“åº“å®‰è£…ï¼ˆç®€å†™ï¼‰
zed profile install github.com/kyle/telemetry-distribution --alias

# ä»Žå®Œæ•´ HTTPS git URL å®‰è£…
zed profile install https://github.com/kyle/telemetry-distribution.git

# ä»Ž SSH å®‰è£…
zed profile install git@github.com:kyle/telemetry-distribution.git

# å¼€å‘æ—¶ä»Žæœ¬åœ°ç›®å½•å®‰è£…
zed profile install ./telemetry/
```

### `zed profile update`

```bash
zed profile update <name> [--force-config] [--yes]
```

ä»Žè®°å½•çš„æ¥æºé‡æ–°å…‹éš†å‘è¡Œç‰ˆå¹¶åº”ç”¨æ›´æ–°ã€‚å‘è¡Œç‰ˆæ‰€æœ‰çš„æ–‡ä»¶ï¼ˆSOUL.mdã€skills/ã€cron/ã€mcp.jsonï¼‰ä¼šè¢«è¦†ç›–ï¼›ç”¨æˆ·æ•°æ®ï¼ˆmemoriesã€sessionsã€authã€.envï¼‰ä¸ä¼šè¢«ä¿®æ”¹ã€‚

é»˜è®¤ä¿ç•™ `config.yaml` ä»¥ä¿æŒæœ¬åœ°è¦†ç›–è®¾ç½®ã€‚ä¼ å…¥ `--force-config` å¯å°†å…¶é‡ç½®ä¸ºå‘è¡Œç‰ˆé™„å¸¦çš„ configã€‚

### `zed profile info`

```bash
zed profile info <name>
```

æ‰“å° profile çš„å‘è¡Œç‰ˆ manifest â€” åç§°ã€ç‰ˆæœ¬ã€æ‰€éœ€ Zed ç‰ˆæœ¬ã€ä½œè€…ã€çŽ¯å¢ƒå˜é‡è¦æ±‚ã€æ¥æº URL/è·¯å¾„ï¼Œä»¥åŠå‘è¡Œç‰ˆæœ€åŽä¸€æ¬¡ `install` æˆ– `update` æ—¶è®°å½•çš„ `Installed:` æ—¶é—´æˆ³ã€‚é€‚ç”¨äºŽå®‰è£…å‰æ£€æŸ¥å…±äº« profile çš„éœ€æ±‚ï¼Œä»¥åŠå‘çŽ°"è¯¥ profile å·²å®‰è£… 6 ä¸ªæœˆæœªæ›´æ–°"ç­‰æƒ…å†µã€‚

`zed profile list` ä¹Ÿä¼šåœ¨ `Distribution` åˆ—ä¸­æ˜¾ç¤ºå‘è¡Œç‰ˆåç§°å’Œç‰ˆæœ¬ï¼Œ`zed profile show <name>` / `delete <name>` ä¼šæ˜¾ç¤ºæ¥æº URLï¼Œè®©ä½ ä¸€çœ¼çœ‹å‡ºå“ªäº› profile æ¥è‡ª git ä»“åº“ï¼Œå“ªäº›æ˜¯æœ¬åœ°åˆ›å»ºçš„ã€‚

### ç§æœ‰å‘è¡Œç‰ˆ

ç§æœ‰ git ä»“åº“æ— éœ€é¢å¤–é…ç½®å³å¯ä½œä¸ºå‘è¡Œç‰ˆæ¥æº â€” å®‰è£…æ—¶ä¼šè°ƒç”¨ç³»ç»Ÿçš„ `git` äºŒè¿›åˆ¶æ–‡ä»¶ï¼Œå› æ­¤ shell å·²é…ç½®çš„ä»»ä½•è®¤è¯æ–¹å¼ï¼ˆSSH å¯†é’¥ã€`git credential` helperã€GitHub CLI å­˜å‚¨çš„ HTTPS å‡­æ®ï¼‰å‡å¯é€æ˜Žç”Ÿæ•ˆã€‚

```bash
# ä½¿ç”¨ SSH å¯†é’¥ï¼Œä¸Žæ™®é€š `git clone` ç›¸åŒ
zed profile install git@github.com:your-org/internal-assistant.git

# ä½¿ç”¨ git credential helper
zed profile install https://github.com/your-org/internal-assistant.git
```

å¦‚æžœå…‹éš†æ—¶åœ¨ç»ˆç«¯äº¤äº’å¼æç¤ºè¾“å…¥å‡­æ®ï¼Œè¯¥æç¤ºä¼šæ­£å¸¸æ˜¾ç¤ºã€‚è¯·å…ˆæŒ‰ç…§å¯¹åŒä¸€ä»“åº“æ‰§è¡Œ `git clone` çš„æ–¹å¼é…ç½®å¥½è®¤è¯ï¼Œå†æ‰§è¡Œå®‰è£…ã€‚

### å‘è¡Œç‰ˆ manifestï¼ˆ`distribution.yaml`ï¼‰

æ¯ä¸ªå‘è¡Œç‰ˆåœ¨å…¶ä»“åº“æ ¹ç›®å½•éƒ½æœ‰ä¸€ä¸ª `distribution.yaml`ï¼š

```yaml
name: telemetry
version: 0.1.0
description: "Compliance monitoring harness"
zed_requires: ">=0.12.0"
author: "Your Name"
license: "MIT"
env_requires:
  - name: OPENAI_API_KEY
    description: "OpenAI API key"
    required: true
  - name: GRAPHITI_MCP_URL
    description: "Memory graph URL"
    required: false
    default: "http://127.0.0.1:8000/sse"
distribution_owned:   # optional; defaults to SOUL.md, config.yaml,
                      #   mcp.json, skills/, cron/, distribution.yaml
  - SOUL.md
  - skills/compliance/
  - cron/
```

`zed_requires` æ”¯æŒ `>=`ã€`<=`ã€`==`ã€`!=`ã€`>`ã€`<`ï¼Œæˆ–è£¸ç‰ˆæœ¬å·ï¼ˆè§†ä¸º `>=`ï¼‰ã€‚è‹¥å½“å‰ Zed ç‰ˆæœ¬ä¸æ»¡è¶³è§„æ ¼ï¼Œå®‰è£…å°†å¤±è´¥å¹¶ç»™å‡ºæ˜Žç¡®é”™è¯¯ã€‚

`distribution_owned` ä¸ºå¯é€‰é¡¹ã€‚è‹¥è®¾ç½®ï¼Œæ›´æ–°æ—¶ä»…æ›¿æ¢è¿™äº›è·¯å¾„ï¼›profile ä¸­çš„å…¶ä»–å†…å®¹ä¿æŒç”¨æˆ·æ‰€æœ‰ã€‚è‹¥çœç•¥ï¼Œåˆ™åº”ç”¨ä¸Šè¿°é»˜è®¤å€¼ã€‚

### å‘å¸ƒå‘è¡Œç‰ˆ

ç¼–å†™å‘è¡Œç‰ˆå°±æ˜¯ä¸€æ¬¡ git pushï¼š

1. åœ¨ä½ çš„ profile ç›®å½•ä¸­åˆ›å»º `distribution.yaml`ï¼Œè‡³å°‘åŒ…å« `name` å’Œ `version`ã€‚
2. åˆå§‹åŒ– git ä»“åº“ï¼ˆæˆ–ä½¿ç”¨å·²æœ‰ä»“åº“ï¼‰ï¼ŒæŽ¨é€åˆ° GitHub / GitLab / ä»»ä½• Zed å¯å…‹éš†çš„æ‰˜ç®¡å¹³å°ã€‚
3. å‘ŠçŸ¥æŽ¥æ”¶æ–¹è¿è¡Œ `zed profile install <your-repo-url>`ã€‚

ä½¿ç”¨ git tag è¿›è¡Œç‰ˆæœ¬åŒ–å‘å¸ƒ â€” å…‹éš† `HEAD` çš„æŽ¥æ”¶æ–¹å°†èŽ·å¾—æœ€æ–°çŠ¶æ€ï¼Œä½ ä¹Ÿå¯ä»¥éšæ—¶åœ¨ manifest ä¸­æ›´æ–° `version:`ã€‚

## `zed -p` / `zed --profile`

```bash
zed -p <name> <command> [options]
zed --profile <name> <command> [options]
```

å…¨å±€æ ‡å¿—ï¼Œç”¨äºŽåœ¨ä¸æ›´æ”¹é»˜è®¤ profile çš„æƒ…å†µä¸‹ï¼Œåœ¨æŒ‡å®š profile ä¸‹è¿è¡Œä»»æ„ Zed å‘½ä»¤ã€‚ä»…åœ¨è¯¥å‘½ä»¤æ‰§è¡ŒæœŸé—´è¦†ç›–æ´»è·ƒ profileã€‚

| é€‰é¡¹ | æè¿° |
|--------|-------------|
| `-p <name>`, `--profile <name>` | æœ¬æ¬¡å‘½ä»¤ä½¿ç”¨çš„ profileã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
zed -p work chat -q "Check the server status"
zed --profile dev gateway start
zed -p personal skills list
zed -p work config edit
```

## `zed completion`

```bash
zed completion <shell>
```

ç”Ÿæˆ shell è¡¥å…¨è„šæœ¬ã€‚åŒ…å«å¯¹ profile åç§°å’Œ profile å­å‘½ä»¤çš„è¡¥å…¨ã€‚

| å‚æ•° | æè¿° |
|----------|-------------|
| `<shell>` | è¦ç”Ÿæˆè¡¥å…¨è„šæœ¬çš„ shellï¼š`bash`ã€`zsh` æˆ– `fish`ã€‚ |

**ç¤ºä¾‹ï¼š**

```bash
# å®‰è£…è¡¥å…¨è„šæœ¬
zed completion bash >> ~/.bashrc
zed completion zsh >> ~/.zshrc
zed completion fish > ~/.config/fish/completions/zed.fish

# é‡æ–°åŠ è½½ shell
source ~/.bashrc
```

å®‰è£…åŽï¼ŒTab è¡¥å…¨é€‚ç”¨äºŽï¼š
- `zed profile <TAB>` â€” å­å‘½ä»¤ï¼ˆlistã€useã€create ç­‰ï¼‰
- `zed profile use <TAB>` â€” profile åç§°
- `zed -p <TAB>` â€” profile åç§°

## å¦è¯·å‚é˜…

- [Profiles ç”¨æˆ·æŒ‡å—](../user-guide/profiles.md)
- [CLI å‘½ä»¤å‚è€ƒ](./cli-commands.md)
- [FAQ â€” Profiles ç« èŠ‚](./faq.md#profiles)
