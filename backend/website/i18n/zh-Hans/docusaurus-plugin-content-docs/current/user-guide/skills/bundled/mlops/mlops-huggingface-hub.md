---
title: "Huggingface Hub â€” HuggingFace hf CLIï¼šæœç´¢/ä¸‹è½½/ä¸Šä¼ æ¨¡åž‹ã€æ•°æ®é›†"
sidebar_label: "Huggingface Hub"
description: "HuggingFace hf CLIï¼šæœç´¢/ä¸‹è½½/ä¸Šä¼ æ¨¡åž‹ã€æ•°æ®é›†"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Huggingface Hub

HuggingFace hf CLIï¼šæœç´¢/ä¸‹è½½/ä¸Šä¼ æ¨¡åž‹ã€æ•°æ®é›†ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/mlops/huggingface-hub` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Hugging Face |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Hugging Face CLIï¼ˆ`hf`ï¼‰å‚è€ƒæŒ‡å—

`hf` å‘½ä»¤æ˜¯ä¸Ž Hugging Face Hub äº¤äº’çš„çŽ°ä»£å‘½ä»¤è¡Œç•Œé¢ï¼Œæä¾›ç®¡ç†ä»“åº“ã€æ¨¡åž‹ã€æ•°æ®é›†å’Œ Spaces çš„å·¥å…·ã€‚

> **é‡è¦ï¼š** `hf` å‘½ä»¤å–ä»£äº†çŽ°å·²å¼ƒç”¨çš„ `huggingface-cli` å‘½ä»¤ã€‚

## å¿«é€Ÿå¼€å§‹
*   **å®‰è£…ï¼š** `curl -LsSf https://hf.co/cli/install.sh | bash -s`
*   **å¸®åŠ©ï¼š** ä½¿ç”¨ `hf --help` æŸ¥çœ‹æ‰€æœ‰å¯ç”¨åŠŸèƒ½åŠå®žé™…ç¤ºä¾‹ã€‚
*   **è®¤è¯ï¼š** æŽ¨èé€šè¿‡ `HF_TOKEN` çŽ¯å¢ƒå˜é‡æˆ– `--token` æ ‡å¿—è¿›è¡Œè®¤è¯ã€‚

---

## æ ¸å¿ƒå‘½ä»¤

### é€šç”¨æ“ä½œ
*   `hf download REPO_ID`ï¼šä»Ž Hub ä¸‹è½½æ–‡ä»¶ã€‚
*   `hf upload REPO_ID`ï¼šä¸Šä¼ æ–‡ä»¶/æ–‡ä»¶å¤¹ï¼ˆæŽ¨èç”¨äºŽå•æ¬¡æäº¤ï¼‰ã€‚
*   `hf upload-large-folder REPO_ID LOCAL_PATH`ï¼šæŽ¨èç”¨äºŽå¤§åž‹ç›®å½•çš„å¯æ¢å¤ä¸Šä¼ ã€‚
*   `hf sync`ï¼šåœ¨æœ¬åœ°ç›®å½•ä¸Žå­˜å‚¨æ¡¶ä¹‹é—´åŒæ­¥æ–‡ä»¶ã€‚
*   `hf env` / `hf version`ï¼šæŸ¥çœ‹çŽ¯å¢ƒå’Œç‰ˆæœ¬è¯¦æƒ…ã€‚

### è®¤è¯ï¼ˆ`hf auth`ï¼‰
*   `login` / `logout`ï¼šä½¿ç”¨æ¥è‡ª [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) çš„ token ç®¡ç†ä¼šè¯ã€‚
*   `list` / `switch`ï¼šç®¡ç†å¹¶åˆ‡æ¢å¤šä¸ªå·²å­˜å‚¨çš„è®¿é—® tokenã€‚
*   `whoami`ï¼šæŸ¥çœ‹å½“å‰ç™»å½•è´¦æˆ·ã€‚

### ä»“åº“ç®¡ç†ï¼ˆ`hf repos`ï¼‰
*   `create` / `delete`ï¼šåˆ›å»ºæˆ–æ°¸ä¹…åˆ é™¤ä»“åº“ã€‚
*   `duplicate`ï¼šå°†æ¨¡åž‹ã€æ•°æ®é›†æˆ– Space å…‹éš†åˆ°æ–° IDã€‚
*   `move`ï¼šåœ¨å‘½åç©ºé—´ä¹‹é—´è¿ç§»ä»“åº“ã€‚
*   `branch` / `tag`ï¼šç®¡ç†ç±» Git å¼•ç”¨ã€‚
*   `delete-files`ï¼šä½¿ç”¨æ¨¡å¼åŒ¹é…åˆ é™¤ç‰¹å®šæ–‡ä»¶ã€‚

---

## ä¸“é¡¹ Hub äº¤äº’

### æ•°æ®é›†ä¸Žæ¨¡åž‹
*   **æ•°æ®é›†ï¼š** `hf datasets list`ã€`info` ä»¥åŠ `parquet`ï¼ˆåˆ—å‡º parquet URLï¼‰ã€‚
*   **SQL æŸ¥è¯¢ï¼š** `hf datasets sql SQL` â€” é€šè¿‡ DuckDB å¯¹æ•°æ®é›† parquet URL æ‰§è¡ŒåŽŸå§‹ SQLã€‚
*   **æ¨¡åž‹ï¼š** `hf models list` å’Œ `info`ã€‚
*   **è®ºæ–‡ï¼š** `hf papers list` â€” æŸ¥çœ‹æ¯æ—¥è®ºæ–‡ã€‚

### è®¨è®ºä¸Ž Pull Requestï¼ˆ`hf discussions`ï¼‰
*   ç®¡ç† Hub è´¡çŒ®çš„å®Œæ•´ç”Ÿå‘½å‘¨æœŸï¼š`list`ã€`create`ã€`info`ã€`comment`ã€`close`ã€`reopen` å’Œ `rename`ã€‚
*   `diff`ï¼šæŸ¥çœ‹ PR ä¸­çš„å˜æ›´ã€‚
*   `merge`ï¼šå®Œæˆ pull request åˆå¹¶ã€‚

### åŸºç¡€è®¾æ–½ä¸Žè®¡ç®—
*   **Endpointsï¼š** éƒ¨ç½²å’Œç®¡ç†æŽ¨ç†ç«¯ç‚¹ï¼ˆ`deploy`ã€`pause`ã€`resume`ã€`scale-to-zero`ã€`catalog`ï¼‰ã€‚
*   **Jobsï¼š** åœ¨ HF åŸºç¡€è®¾æ–½ä¸Šè¿è¡Œè®¡ç®—ä»»åŠ¡ã€‚åŒ…æ‹¬ `hf jobs uv`ï¼ˆç”¨äºŽè¿è¡Œå¸¦å†…è”ä¾èµ–çš„ Python è„šæœ¬ï¼‰å’Œ `stats`ï¼ˆç”¨äºŽèµ„æºç›‘æŽ§ï¼‰ã€‚
*   **Spacesï¼š** ç®¡ç†äº¤äº’å¼åº”ç”¨ã€‚åŒ…æ‹¬ `dev-mode` å’Œ `hot-reload`ï¼Œå¯åœ¨ä¸å®Œå…¨é‡å¯çš„æƒ…å†µä¸‹çƒ­æ›´æ–° Python æ–‡ä»¶ã€‚

### å­˜å‚¨ä¸Žè‡ªåŠ¨åŒ–
*   **Bucketsï¼š** å®Œæ•´çš„ç±» S3 å­˜å‚¨æ¡¶ç®¡ç†ï¼ˆ`create`ã€`cp`ã€`mv`ã€`rm`ã€`sync`ï¼‰ã€‚
*   **Cacheï¼ˆç¼“å­˜ï¼‰ï¼š** ä½¿ç”¨ `list`ã€`prune`ï¼ˆåˆ é™¤å·²åˆ†ç¦»çš„ä¿®è®¢ç‰ˆæœ¬ï¼‰å’Œ `verify`ï¼ˆæ ¡éªŒå’Œæ£€æŸ¥ï¼‰ç®¡ç†æœ¬åœ°å­˜å‚¨ã€‚
*   **Webhooksï¼š** é€šè¿‡ç®¡ç† Hub webhookï¼ˆ`create`ã€`watch`ã€`enable`/`disable`ï¼‰è‡ªåŠ¨åŒ–å·¥ä½œæµã€‚
*   **Collectionsï¼š** å°† Hub æ¡ç›®æ•´ç†åˆ°é›†åˆä¸­ï¼ˆ`add-item`ã€`update`ã€`list`ï¼‰ã€‚

---

## é«˜çº§ç”¨æ³•ä¸ŽæŠ€å·§

### å…¨å±€æ ‡å¿—
*   `--format json`ï¼šç”Ÿæˆé€‚åˆè‡ªåŠ¨åŒ–çš„æœºå™¨å¯è¯»è¾“å‡ºã€‚
*   `-q` / `--quiet`ï¼šå°†è¾“å‡ºé™åˆ¶ä¸ºä»…æ˜¾ç¤º IDã€‚

### æ‰©å±•ä¸Ž Skills
*   **æ‰©å±•ï¼š** é€šè¿‡ GitHub ä»“åº“ä½¿ç”¨ `hf extensions install REPO_ID` æ‰©å±• CLI åŠŸèƒ½ã€‚
*   **Skillsï¼š** ä½¿ç”¨ `hf skills add` ç®¡ç† AI åŠ©æ‰‹ skillã€‚