---
title: "Jupyter Live Kernel â€” é€šè¿‡å®žæ—¶ Jupyter å†…æ ¸è¿›è¡Œè¿­ä»£å¼ Python å¼€å‘ï¼ˆhamelnbï¼‰"
sidebar_label: "Jupyter Live Kernel"
description: "é€šè¿‡å®žæ—¶ Jupyter å†…æ ¸è¿›è¡Œè¿­ä»£å¼ Python å¼€å‘ï¼ˆhamelnbï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Jupyter Live Kernel

é€šè¿‡å®žæ—¶ Jupyter å†…æ ¸è¿›è¡Œè¿­ä»£å¼ Python å¼€å‘ï¼ˆhamelnbï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/data-science/jupyter-live-kernel` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `jupyter`, `notebook`, `repl`, `data-science`, `exploration`, `iterative` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Jupyter Live Kernelï¼ˆhamelnbï¼‰

é€šè¿‡å®žæ—¶ Jupyter å†…æ ¸ä¸ºä½ æä¾›ä¸€ä¸ª**æœ‰çŠ¶æ€çš„ Python REPL**ï¼ˆäº¤äº’å¼è§£é‡Šå™¨ï¼‰ã€‚å˜é‡åœ¨å¤šæ¬¡æ‰§è¡Œä¹‹é—´æŒä¹…ä¿ç•™ã€‚å½“ä½ éœ€è¦é€æ­¥æž„å»ºçŠ¶æ€ã€æŽ¢ç´¢ APIã€æ£€æŸ¥ DataFrame æˆ–è¿­ä»£å¤æ‚ä»£ç æ—¶ï¼Œè¯·ä½¿ç”¨æ­¤å·¥å…·è€Œéž `execute_code`ã€‚

## ä½•æ—¶ä½¿ç”¨æœ¬ Skill ä¸Žå…¶ä»–å·¥å…·

| å·¥å…· | ä½¿ç”¨åœºæ™¯ |
|------|----------|
| **æœ¬ skill** | è¿­ä»£å¼æŽ¢ç´¢ã€è·¨æ­¥éª¤ä¿æŒçŠ¶æ€ã€æ•°æ®ç§‘å­¦ã€æœºå™¨å­¦ä¹ ã€"è¯•è¯•çœ‹å†æ£€æŸ¥" |
| `execute_code` | éœ€è¦è®¿é—® Zed å·¥å…·ï¼ˆweb_searchã€æ–‡ä»¶æ“ä½œï¼‰çš„ä¸€æ¬¡æ€§è„šæœ¬ã€‚æ— çŠ¶æ€ã€‚ |
| `terminal` | Shell å‘½ä»¤ã€æž„å»ºã€å®‰è£…ã€gitã€è¿›ç¨‹ç®¡ç† |

**ç»éªŒæ³•åˆ™ï¼š** å¦‚æžœä½ ä¼šä¸ºæŸä¸ªä»»åŠ¡æ‰“å¼€ Jupyter notebookï¼Œå°±ä½¿ç”¨æœ¬ skillã€‚

## å‰ç½®æ¡ä»¶

1. å¿…é¡»å®‰è£… **uv**ï¼ˆæ£€æŸ¥ï¼š`which uv`ï¼‰
2. å¿…é¡»å®‰è£… **JupyterLab**ï¼š`uv tool install jupyterlab`
3. å¿…é¡»æœ‰ä¸€ä¸ªæ­£åœ¨è¿è¡Œçš„ Jupyter æœåŠ¡å™¨ï¼ˆå‚è§ä¸‹æ–¹"è®¾ç½®"éƒ¨åˆ†ï¼‰

## è®¾ç½®

hamelnb è„šæœ¬ä½ç½®ï¼š
```
SCRIPT="$HOME/.agent-skills/hamelnb/skills/jupyter-live-kernel/scripts/jupyter_live_kernel.py"
```

å¦‚æžœå°šæœªå…‹éš†ï¼š
```
git clone https://github.com/hamelsmu/hamelnb.git ~/.agent-skills/hamelnb
```

### å¯åŠ¨ JupyterLab

æ£€æŸ¥æ˜¯å¦å·²æœ‰æœåŠ¡å™¨åœ¨è¿è¡Œï¼š
```
uv run "$SCRIPT" servers
```

å¦‚æžœæœªæ‰¾åˆ°æœåŠ¡å™¨ï¼Œå¯åŠ¨ä¸€ä¸ªï¼š
```
jupyter-lab --no-browser --port=8888 --notebook-dir=$HOME/notebooks \
  --IdentityProvider.token='' --ServerApp.password='' > /tmp/jupyter.log 2>&1 &
sleep 3
```

æ³¨æ„ï¼šå·²ç¦ç”¨ token/password ä»¥ä¾›æœ¬åœ° agent è®¿é—®ã€‚æœåŠ¡å™¨ä»¥æ— å¤´æ¨¡å¼è¿è¡Œã€‚

### ä¸º REPL ä½¿ç”¨åˆ›å»º Notebook

å¦‚æžœä½ åªéœ€è¦ä¸€ä¸ª REPLï¼ˆæ— éœ€çŽ°æœ‰ notebookï¼‰ï¼Œåˆ›å»ºä¸€ä¸ªæœ€å°åŒ–çš„ notebook æ–‡ä»¶ï¼š
```
mkdir -p ~/notebooks
```
å†™å…¥ä¸€ä¸ªåŒ…å«ä¸€ä¸ªç©ºä»£ç å•å…ƒæ ¼çš„æœ€å° .ipynb JSON æ–‡ä»¶ï¼Œç„¶åŽé€šè¿‡ Jupyter REST API å¯åŠ¨ä¸€ä¸ªå†…æ ¸ä¼šè¯ï¼š
```
curl -s -X POST http://127.0.0.1:8888/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"path":"scratch.ipynb","type":"notebook","name":"scratch.ipynb","kernel":{"name":"python3"}}'
```

## æ ¸å¿ƒå·¥ä½œæµ

æ‰€æœ‰å‘½ä»¤å‡è¿”å›žç»“æž„åŒ– JSONã€‚å§‹ç»ˆä½¿ç”¨ `--compact` ä»¥èŠ‚çœ tokenã€‚

### 1. å‘çŽ°æœåŠ¡å™¨å’Œ notebook

```
uv run "$SCRIPT" servers --compact
uv run "$SCRIPT" notebooks --compact
```

### 2. æ‰§è¡Œä»£ç ï¼ˆä¸»è¦æ“ä½œï¼‰

```
uv run "$SCRIPT" execute --path <notebook.ipynb> --code '<python code>' --compact
```

çŠ¶æ€åœ¨å¤šæ¬¡ execute è°ƒç”¨ä¹‹é—´æŒä¹…ä¿ç•™ã€‚å˜é‡ã€å¯¼å…¥ã€å¯¹è±¡å‡ä¼šä¿ç•™ã€‚

å¤šè¡Œä»£ç å¯ä½¿ç”¨ `$'...'` å¼•å·è¯­æ³•ï¼š
```
uv run "$SCRIPT" execute --path scratch.ipynb --code $'import os\nfiles = os.listdir(".")\nprint(f"Found {len(files)} files")' --compact
```

### 3. æ£€æŸ¥å®žæ—¶å˜é‡

```
uv run "$SCRIPT" variables --path <notebook.ipynb> list --compact
uv run "$SCRIPT" variables --path <notebook.ipynb> preview --name <varname> --compact
```

### 4. ç¼–è¾‘ notebook å•å…ƒæ ¼

```
# æŸ¥çœ‹å½“å‰å•å…ƒæ ¼
uv run "$SCRIPT" contents --path <notebook.ipynb> --compact

# æ’å…¥æ–°å•å…ƒæ ¼
uv run "$SCRIPT" edit --path <notebook.ipynb> insert \
  --at-index <N> --cell-type code --source '<code>' --compact

# æ›¿æ¢å•å…ƒæ ¼æºç ï¼ˆä½¿ç”¨ contents è¾“å‡ºä¸­çš„ cell-idï¼‰
uv run "$SCRIPT" edit --path <notebook.ipynb> replace-source \
  --cell-id <id> --source '<new code>' --compact

# åˆ é™¤å•å…ƒæ ¼
uv run "$SCRIPT" edit --path <notebook.ipynb> delete --cell-id <id> --compact
```

### 5. éªŒè¯ï¼ˆé‡å¯å¹¶å…¨éƒ¨è¿è¡Œï¼‰

ä»…åœ¨ç”¨æˆ·è¦æ±‚è¿›è¡Œå¹²å‡€éªŒè¯ï¼Œæˆ–ä½ éœ€è¦ç¡®è®¤ notebook èƒ½ä»Žå¤´åˆ°å°¾è¿è¡Œæ—¶ä½¿ç”¨ï¼š

```
uv run "$SCRIPT" restart-run-all --path <notebook.ipynb> --save-outputs --compact
```

## å®žè·µç»éªŒæç¤º

1. **æœåŠ¡å™¨å¯åŠ¨åŽé¦–æ¬¡æ‰§è¡Œå¯èƒ½è¶…æ—¶** â€”â€” å†…æ ¸éœ€è¦ç‰‡åˆ»æ—¶é—´åˆå§‹åŒ–ã€‚å¦‚æžœè¶…æ—¶ï¼Œé‡è¯•å³å¯ã€‚

2. **å†…æ ¸ Python æ˜¯ JupyterLab çš„ Python** â€”â€” åŒ…å¿…é¡»å®‰è£…åœ¨è¯¥çŽ¯å¢ƒä¸­ã€‚å¦‚éœ€é¢å¤–çš„åŒ…ï¼Œè¯·å…ˆå°†å…¶å®‰è£…åˆ° JupyterLab å·¥å…·çŽ¯å¢ƒä¸­ã€‚

3. **`--compact` æ ‡å¿—å¯æ˜¾è‘—èŠ‚çœ token** â€”â€” å§‹ç»ˆä½¿ç”¨å®ƒã€‚ä¸åŠ æ­¤æ ‡å¿—æ—¶ JSON è¾“å‡ºå¯èƒ½éžå¸¸å†—é•¿ã€‚

4. **çº¯ REPL ä½¿ç”¨æ—¶**ï¼Œåˆ›å»ºä¸€ä¸ª scratch.ipynbï¼Œæ— éœ€å…³å¿ƒå•å…ƒæ ¼ç¼–è¾‘ã€‚åå¤ä½¿ç”¨ `execute` å³å¯ã€‚

5. **å‚æ•°é¡ºåºå¾ˆé‡è¦** â€”â€” å­å‘½ä»¤æ ‡å¿—ï¼ˆå¦‚ `--path`ï¼‰å¿…é¡»æ”¾åœ¨å­å­å‘½ä»¤**ä¹‹å‰**ã€‚ä¾‹å¦‚ï¼š`variables --path nb.ipynb list`ï¼Œè€Œéž `variables list --path nb.ipynb`ã€‚

6. **å¦‚æžœä¼šè¯å°šä¸å­˜åœ¨**ï¼Œéœ€è¦é€šè¿‡ REST API å¯åŠ¨ä¸€ä¸ªï¼ˆå‚è§"è®¾ç½®"éƒ¨åˆ†ï¼‰ã€‚æ²¡æœ‰å®žæ—¶å†…æ ¸ä¼šè¯ï¼Œå·¥å…·æ— æ³•æ‰§è¡Œä»£ç ã€‚

7. **é”™è¯¯ä»¥ JSON å½¢å¼è¿”å›ž**ï¼ŒåŒ…å« traceback â€”â€” è¯»å– `ename` å’Œ `evalue` å­—æ®µä»¥äº†è§£å‡ºé”™åŽŸå› ã€‚

8. **å¶å‘çš„ websocket è¶…æ—¶** â€”â€” æŸäº›æ“ä½œï¼ˆå°¤å…¶æ˜¯å†…æ ¸é‡å¯åŽï¼‰é¦–æ¬¡å°è¯•å¯èƒ½è¶…æ—¶ã€‚åœ¨ä¸ŠæŠ¥é—®é¢˜å‰å…ˆé‡è¯•ä¸€æ¬¡ã€‚

## è¶…æ—¶é»˜è®¤å€¼

è„šæœ¬æ¯æ¬¡æ‰§è¡Œçš„é»˜è®¤è¶…æ—¶ä¸º 30 ç§’ã€‚å¯¹äºŽé•¿æ—¶é—´è¿è¡Œçš„æ“ä½œï¼Œä¼ å…¥ `--timeout 120`ã€‚åˆå§‹è®¾ç½®æˆ–å¤§é‡è®¡ç®—æ—¶ï¼Œå»ºè®®ä½¿ç”¨è¾ƒå®½æ¾çš„è¶…æ—¶å€¼ï¼ˆ60 ç§’ä»¥ä¸Šï¼‰ã€‚
