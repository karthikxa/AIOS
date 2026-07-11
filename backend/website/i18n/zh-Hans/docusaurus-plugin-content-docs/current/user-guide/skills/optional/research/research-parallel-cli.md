---
title: "Parallel Cli"
sidebar_label: "Parallel Cli"
description: "å¯é€‰çš„ä¾›åº”å•†æŠ€èƒ½ï¼Œç”¨äºŽ Parallel CLI â€” é¢å‘ agent çš„ç½‘ç»œæœç´¢ã€æå–ã€æ·±åº¦ç ”ç©¶ã€æ•°æ®ä¸°å¯Œã€FindAll å’Œç›‘æŽ§"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Parallel Cli

å¯é€‰çš„ä¾›åº”å•†æŠ€èƒ½ï¼Œç”¨äºŽ Parallel CLI â€” é¢å‘ agent çš„ç½‘ç»œæœç´¢ã€æå–ã€æ·±åº¦ç ”ç©¶ã€æ•°æ®ä¸°å¯Œã€FindAll å’Œç›‘æŽ§ã€‚ä¼˜å…ˆä½¿ç”¨ JSON è¾“å‡ºå’Œéžäº¤äº’å¼æµç¨‹ã€‚

## æŠ€èƒ½å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/research/parallel-cli` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/parallel-cli` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Research`, `Web`, `Search`, `Deep-Research`, `Enrichment`, `CLI` |
| ç›¸å…³æŠ€èƒ½ | [`duckduckgo-search`](/user-guide/skills/optional/research/research-duckduckgo-search), [`mcporter`](/user-guide/skills/optional/mcp/mcp-mcporter) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤æŠ€èƒ½æ—¶åŠ è½½çš„å®Œæ•´æŠ€èƒ½å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨æŠ€èƒ½æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Parallel CLI

å½“ç”¨æˆ·æ˜Žç¡®è¦æ±‚ä½¿ç”¨ Parallelï¼Œæˆ–ç»ˆç«¯åŽŸç”Ÿå·¥ä½œæµèƒ½ä»Ž Parallel çš„ä¾›åº”å•†ä¸“å±žæŠ€æœ¯æ ˆä¸­å—ç›Šæ—¶ï¼ˆåŒ…æ‹¬ç½‘ç»œæœç´¢ã€æå–ã€æ·±åº¦ç ”ç©¶ã€æ•°æ®ä¸°å¯Œã€å®žä½“å‘çŽ°æˆ–ç›‘æŽ§ï¼‰ï¼Œè¯·ä½¿ç”¨ `parallel-cli`ã€‚

è¿™æ˜¯ä¸€ä¸ªå¯é€‰çš„ç¬¬ä¸‰æ–¹å·¥ä½œæµï¼Œä¸æ˜¯ Zed çš„æ ¸å¿ƒèƒ½åŠ›ã€‚

é‡è¦è¯´æ˜Žï¼š
- Parallel æ˜¯ä»˜è´¹æœåŠ¡ï¼Œæä¾›å…è´¹å¥—é¤ï¼Œå¹¶éžå®Œå…¨å…è´¹çš„æœ¬åœ°å·¥å…·ã€‚
- å®ƒä¸Ž Zed åŽŸç”Ÿçš„ `web_search` / `web_extract` å­˜åœ¨åŠŸèƒ½é‡å ï¼Œå› æ­¤ä¸è¦åœ¨æ™®é€šæŸ¥è¯¢ä¸­ä¼˜å…ˆä½¿ç”¨å®ƒã€‚
- å½“ç”¨æˆ·æ˜Žç¡®æåŠ Parallelï¼Œæˆ–éœ€è¦ Parallel ç‰¹æœ‰çš„æ•°æ®ä¸°å¯Œã€FindAll æˆ–ç›‘æŽ§å·¥ä½œæµæ—¶ï¼Œä¼˜å…ˆä½¿ç”¨æ­¤æŠ€èƒ½ã€‚

`parallel-cli` ä¸“ä¸º agent è®¾è®¡ï¼š
- é€šè¿‡ `--json` è¾“å‡º JSON
- éžäº¤äº’å¼å‘½ä»¤æ‰§è¡Œ
- ä½¿ç”¨ `--no-wait`ã€`status` å’Œ `poll` å¤„ç†å¼‚æ­¥é•¿æ—¶ä»»åŠ¡
- é€šè¿‡ `--previous-interaction-id` è¿›è¡Œä¸Šä¸‹æ–‡é“¾å¼è°ƒç”¨
- åœ¨å•ä¸€ CLI ä¸­é›†æˆæœç´¢ã€æå–ã€ç ”ç©¶ã€æ•°æ®ä¸°å¯Œã€å®žä½“å‘çŽ°å’Œç›‘æŽ§

## ä½¿ç”¨æ—¶æœº

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä¼˜å…ˆä½¿ç”¨æ­¤æŠ€èƒ½ï¼š
- ç”¨æˆ·æ˜Žç¡®æåŠ Parallel æˆ– `parallel-cli`
- ä»»åŠ¡éœ€è¦æ¯”ç®€å•å•æ¬¡æœç´¢/æå–æ›´ä¸°å¯Œçš„å·¥ä½œæµ
- éœ€è¦å¯å¯åŠ¨å¹¶ç¨åŽè½®è¯¢çš„å¼‚æ­¥æ·±åº¦ç ”ç©¶ä»»åŠ¡
- éœ€è¦ç»“æž„åŒ–æ•°æ®ä¸°å¯Œã€FindAll å®žä½“å‘çŽ°æˆ–ç›‘æŽ§

åœ¨æœªæ˜Žç¡®è¦æ±‚ Parallel çš„æƒ…å†µä¸‹è¿›è¡Œå¿«é€Ÿå•æ¬¡æŸ¥è¯¢æ—¶ï¼Œä¼˜å…ˆä½¿ç”¨ Zed åŽŸç”Ÿçš„ `web_search` / `web_extract`ã€‚

## å®‰è£…

é€‰æ‹©å½“å‰çŽ¯å¢ƒä¸­ä¾µå…¥æ€§æœ€å°çš„å®‰è£…æ–¹å¼ã€‚

### Homebrew

```bash
brew install parallel-web/tap/parallel-cli
```

### npm

```bash
npm install -g parallel-web-cli
```

### Python åŒ…

```bash
pip install "parallel-web-tools[cli]"
```

### ç‹¬ç«‹å®‰è£…ç¨‹åº

```bash
curl -fsSL https://parallel.ai/install.sh | bash
```

å¦‚æžœéœ€è¦éš”ç¦»çš„ Python å®‰è£…ï¼Œä¹Ÿå¯ä»¥ä½¿ç”¨ `pipx`ï¼š

```bash
pipx install "parallel-web-tools[cli]"
pipx ensurepath
```

## è®¤è¯

äº¤äº’å¼ç™»å½•ï¼š

```bash
parallel-cli login
```

æ— å¤´æ¨¡å¼ / SSH / CIï¼š

```bash
parallel-cli login --device
```

API å¯†é’¥çŽ¯å¢ƒå˜é‡ï¼š

```bash
export PARALLEL_API_KEY="***"
```

éªŒè¯å½“å‰è®¤è¯çŠ¶æ€ï¼š

```bash
parallel-cli auth
```

å¦‚æžœè®¤è¯éœ€è¦æµè§ˆå™¨äº¤äº’ï¼Œè¯·ä½¿ç”¨ `pty=true` è¿è¡Œã€‚

## æ ¸å¿ƒè§„åˆ™

1. éœ€è¦æœºå™¨å¯è¯»è¾“å‡ºæ—¶ï¼Œå§‹ç»ˆä¼˜å…ˆä½¿ç”¨ `--json`ã€‚
2. ä¼˜å…ˆä½¿ç”¨æ˜¾å¼å‚æ•°å’Œéžäº¤äº’å¼æµç¨‹ã€‚
3. å¯¹äºŽé•¿æ—¶ä»»åŠ¡ï¼Œä½¿ç”¨ `--no-wait`ï¼Œç„¶åŽè°ƒç”¨ `status` / `poll`ã€‚
4. ä»…å¼•ç”¨ CLI è¾“å‡ºä¸­è¿”å›žçš„ URLã€‚
5. å½“åŽç»­å¯èƒ½æœ‰è¿½é—®æ—¶ï¼Œå°†å¤§åž‹ JSON è¾“å‡ºä¿å­˜åˆ°ä¸´æ—¶æ–‡ä»¶ã€‚
6. ä»…å¯¹çœŸæ­£çš„é•¿æ—¶å·¥ä½œæµä½¿ç”¨åŽå°è¿›ç¨‹ï¼›å¦åˆ™åœ¨å‰å°è¿è¡Œã€‚
7. é™¤éžç”¨æˆ·æ˜Žç¡®è¦æ±‚ Parallel æˆ–éœ€è¦ Parallel ä¸“å±žå·¥ä½œæµï¼Œå¦åˆ™ä¼˜å…ˆä½¿ç”¨ Zed åŽŸç”Ÿå·¥å…·ã€‚

## å¿«é€Ÿå‚è€ƒ

<!-- ascii-guard-ignore -->
```text
parallel-cli
â”œâ”€â”€ auth
â”œâ”€â”€ login
â”œâ”€â”€ logout
â”œâ”€â”€ search
â”œâ”€â”€ extract / fetch
â”œâ”€â”€ research run|status|poll|processors
â”œâ”€â”€ enrich run|status|poll|plan|suggest|deploy
â”œâ”€â”€ findall run|ingest|status|poll|result|enrich|extend|schema|cancel
â””â”€â”€ monitor create|list|get|update|delete|events|event-group|simulate
```
<!-- ascii-guard-ignore-end -->

## å¸¸ç”¨æ ‡å¿—ä¸Žæ¨¡å¼

å¸¸ç”¨æ ‡å¿—ï¼š
- `--json` ç”¨äºŽç»“æž„åŒ–è¾“å‡º
- `--no-wait` ç”¨äºŽå¼‚æ­¥ä»»åŠ¡
- `--previous-interaction-id <id>` ç”¨äºŽå¤ç”¨æ—©æœŸä¸Šä¸‹æ–‡çš„åŽç»­ä»»åŠ¡
- `--max-results <n>` ç”¨äºŽé™åˆ¶æœç´¢ç»“æžœæ•°é‡
- `--mode one-shot|agentic` ç”¨äºŽæŽ§åˆ¶æœç´¢è¡Œä¸º
- `--include-domains domain1.com,domain2.com`
- `--exclude-domains domain1.com,domain2.com`
- `--after-date YYYY-MM-DD`

åœ¨æ–¹ä¾¿æ—¶ä»Ž stdin è¯»å–ï¼š

```bash
echo "What is the latest funding for Anthropic?" | parallel-cli search - --json
echo "Research question" | parallel-cli research run - --json
```

## æœç´¢

ç”¨äºŽèŽ·å–å¸¦ç»“æž„åŒ–ç»“æžœçš„å½“å‰ç½‘ç»œæŸ¥è¯¢ã€‚

```bash
parallel-cli search "What is Anthropic's latest AI model?" --json
parallel-cli search "SEC filings for Apple" --include-domains sec.gov --json
parallel-cli search "bitcoin price" --after-date 2026-01-01 --max-results 10 --json
parallel-cli search "latest browser benchmarks" --mode one-shot --json
parallel-cli search "AI coding agent enterprise reviews" --mode agentic --json
```

å¸¸ç”¨çº¦æŸï¼š
- `--include-domains` ç¼©å°å¯ä¿¡æ¥æºèŒƒå›´
- `--exclude-domains` è¿‡æ»¤å™ªå£°åŸŸå
- `--after-date` æŒ‰æ—¶æ•ˆæ€§è¿‡æ»¤
- `--max-results` éœ€è¦æ›´å¹¿æ³›è¦†ç›–æ—¶ä½¿ç”¨

å¦‚æžœé¢„è®¡æœ‰åŽç»­è¿½é—®ï¼Œä¿å­˜è¾“å‡ºï¼š

```bash
parallel-cli search "latest React 19 changes" --json -o /tmp/react-19-search.json
```

æ±‡æ€»ç»“æžœæ—¶ï¼š
- ä»¥ç­”æ¡ˆå¼€å¤´
- åŒ…å«æ—¥æœŸã€åç§°å’Œå…·ä½“äº‹å®ž
- ä»…å¼•ç”¨è¿”å›žçš„æ¥æº
- ä¸å¾—ç¼–é€  URL æˆ–æ¥æºæ ‡é¢˜

## æå–

ç”¨äºŽä»Ž URL ä¸­æå–å¹²å‡€å†…å®¹æˆ– markdownã€‚

```bash
parallel-cli extract https://example.com --json
parallel-cli extract https://company.com --objective "Find pricing info" --json
parallel-cli extract https://example.com --full-content --json
parallel-cli fetch https://example.com --json
```

å½“é¡µé¢å†…å®¹å®½æ³›è€Œåªéœ€è¦å…¶ä¸­æŸä¸€éƒ¨åˆ†ä¿¡æ¯æ—¶ï¼Œä½¿ç”¨ `--objective`ã€‚

## æ·±åº¦ç ”ç©¶

ç”¨äºŽå¯èƒ½è€—æ—¶çš„å¤šæ­¥éª¤æ·±åº¦ç ”ç©¶ä»»åŠ¡ã€‚

å¸¸ç”¨å¤„ç†å™¨çº§åˆ«ï¼š
- `lite` / `base` ç”¨äºŽæ›´å¿«ã€æ›´ç»æµŽçš„å¤„ç†
- `core` / `pro` ç”¨äºŽæ›´å…¨é¢çš„ç»¼åˆåˆ†æž
- `ultra` ç”¨äºŽæœ€é‡é‡çº§çš„ç ”ç©¶ä»»åŠ¡

### åŒæ­¥æ¨¡å¼

```bash
parallel-cli research run \
  "Compare the leading AI coding agents by pricing, model support, and enterprise controls" \
  --processor core \
  --json
```

### å¼‚æ­¥å¯åŠ¨ + è½®è¯¢

```bash
parallel-cli research run \
  "Compare the leading AI coding agents by pricing, model support, and enterprise controls" \
  --processor ultra \
  --no-wait \
  --json

parallel-cli research status trun_xxx --json
parallel-cli research poll trun_xxx --json
parallel-cli research processors --json
```

### ä¸Šä¸‹æ–‡é“¾å¼è°ƒç”¨ / åŽç»­è¿½é—®

```bash
parallel-cli research run "What are the top AI coding agents?" --json
parallel-cli research run \
  "What enterprise controls does the top-ranked one offer?" \
  --previous-interaction-id trun_xxx \
  --json
```

æŽ¨èçš„ Zed å·¥ä½œæµï¼š
1. ä½¿ç”¨ `--no-wait --json` å¯åŠ¨
2. æ•èŽ·è¿”å›žçš„è¿è¡Œ/ä»»åŠ¡ ID
3. å¦‚æžœç”¨æˆ·å¸Œæœ›ç»§ç»­å…¶ä»–å·¥ä½œï¼Œç»§ç»­æŽ¨è¿›
4. ç¨åŽè°ƒç”¨ `status` æˆ– `poll`
5. ä½¿ç”¨è¿”å›žæ¥æºä¸­çš„å¼•ç”¨æ±‡æ€»æœ€ç»ˆæŠ¥å‘Š

## æ•°æ®ä¸°å¯Œï¼ˆEnrichmentï¼‰

å½“ç”¨æˆ·æœ‰ CSV/JSON/è¡¨æ ¼è¾“å…¥å¹¶å¸Œæœ›é€šè¿‡ç½‘ç»œç ”ç©¶æŽ¨æ–­é¢å¤–åˆ—æ—¶ä½¿ç”¨ã€‚

### å»ºè®®åˆ—

```bash
parallel-cli enrich suggest "Find the CEO and annual revenue" --json
```

### è§„åˆ’é…ç½®

```bash
parallel-cli enrich plan -o config.yaml
```

### å†…è”æ•°æ®

```bash
parallel-cli enrich run \
  --data '[{"company": "Anthropic"}, {"company": "Mistral"}]' \
  --intent "Find headquarters and employee count" \
  --json
```

### éžäº¤äº’å¼æ–‡ä»¶è¿è¡Œ

```bash
parallel-cli enrich run \
  --source-type csv \
  --source companies.csv \
  --target enriched.csv \
  --source-columns '[{"name": "company", "description": "Company name"}]' \
  --intent "Find the CEO and annual revenue"
```

### YAML é…ç½®è¿è¡Œ

```bash
parallel-cli enrich run config.yaml
```

### çŠ¶æ€ / è½®è¯¢

```bash
parallel-cli enrich status <task_group_id> --json
parallel-cli enrich poll <task_group_id> --json
```

åœ¨éžäº¤äº’å¼æ“ä½œæ—¶ï¼Œä½¿ç”¨æ˜¾å¼ JSON æ•°ç»„å®šä¹‰åˆ—ã€‚
åœ¨æŠ¥å‘ŠæˆåŠŸå‰éªŒè¯è¾“å‡ºæ–‡ä»¶ã€‚

## FindAll

å½“ç”¨æˆ·éœ€è¦å‘çŽ°æ•°æ®é›†è€Œéžç®€çŸ­ç­”æ¡ˆæ—¶ï¼Œç”¨äºŽç½‘ç»œè§„æ¨¡çš„å®žä½“å‘çŽ°ã€‚

```bash
parallel-cli findall run "Find AI coding agent startups with enterprise offerings" --json
parallel-cli findall run "AI startups in healthcare" -n 25 --json
parallel-cli findall status <run_id> --json
parallel-cli findall poll <run_id> --json
parallel-cli findall result <run_id> --json
parallel-cli findall schema <run_id> --json
```

å½“ç”¨æˆ·éœ€è¦ä¸€ç»„å¯ä¾›åŽç»­å®¡æŸ¥ã€è¿‡æ»¤æˆ–æ•°æ®ä¸°å¯Œçš„å®žä½“é›†åˆæ—¶ï¼Œè¿™æ¯”æ™®é€šæœç´¢æ›´åˆé€‚ã€‚

## ç›‘æŽ§ï¼ˆMonitorï¼‰

ç”¨äºŽéšæ—¶é—´æŽ¨ç§»çš„æŒç»­å˜æ›´æ£€æµ‹ã€‚

```bash
parallel-cli monitor list --json
parallel-cli monitor get <monitor_id> --json
parallel-cli monitor events <monitor_id> --json
parallel-cli monitor delete <monitor_id> --json
```

åˆ›å»ºé€šå¸¸æ˜¯æ•æ„ŸçŽ¯èŠ‚ï¼Œå› ä¸ºé¢‘çŽ‡å’ŒæŽ¨é€æ–¹å¼å¾ˆé‡è¦ï¼š

```bash
parallel-cli monitor create --help
```

å½“ç”¨æˆ·å¸Œæœ›å¯¹æŸä¸ªé¡µé¢æˆ–æ¥æºè¿›è¡Œå‘¨æœŸæ€§è·Ÿè¸ªè€Œéžä¸€æ¬¡æ€§æŠ“å–æ—¶ä½¿ç”¨ã€‚

## æŽ¨èçš„ Zed ä½¿ç”¨æ¨¡å¼

### å¿«é€Ÿç­”æ¡ˆä¸Žå¼•ç”¨
1. è¿è¡Œ `parallel-cli search ... --json`
2. è§£æžæ ‡é¢˜ã€URLã€æ—¥æœŸã€æ‘˜å½•
3. ä»…ä½¿ç”¨è¿”å›žçš„ URL è¿›è¡Œå†…è”å¼•ç”¨å¹¶æ±‡æ€»

### URL è°ƒæŸ¥
1. è¿è¡Œ `parallel-cli extract URL --json`
2. å¦‚æœ‰éœ€è¦ï¼Œä½¿ç”¨ `--objective` æˆ– `--full-content` é‡æ–°è¿è¡Œ
3. å¼•ç”¨æˆ–æ±‡æ€»æå–çš„ markdown

### é•¿æ—¶ç ”ç©¶å·¥ä½œæµ
1. è¿è¡Œ `parallel-cli research run ... --no-wait --json`
2. å­˜å‚¨è¿”å›žçš„ ID
3. ç»§ç»­å…¶ä»–å·¥ä½œæˆ–å®šæœŸè½®è¯¢
4. ä½¿ç”¨å¼•ç”¨æ±‡æ€»æœ€ç»ˆæŠ¥å‘Š

### ç»“æž„åŒ–æ•°æ®ä¸°å¯Œå·¥ä½œæµ
1. æ£€æŸ¥è¾“å…¥æ–‡ä»¶å’Œåˆ—
2. ä½¿ç”¨ `enrich suggest` æˆ–æä¾›æ˜¾å¼çš„ä¸°å¯Œåˆ—å®šä¹‰
3. è¿è¡Œ `enrich run`
4. å¦‚æœ‰éœ€è¦ï¼Œè½®è¯¢ç­‰å¾…å®Œæˆ
5. åœ¨æŠ¥å‘ŠæˆåŠŸå‰éªŒè¯è¾“å‡ºæ–‡ä»¶

## é”™è¯¯å¤„ç†ä¸Žé€€å‡ºç 

CLI æ–‡æ¡£ä¸­å®šä¹‰çš„é€€å‡ºç ï¼š
- `0` æˆåŠŸ
- `2` è¾“å…¥é”™è¯¯
- `3` è®¤è¯é”™è¯¯
- `4` API é”™è¯¯
- `5` è¶…æ—¶

é‡åˆ°è®¤è¯é”™è¯¯æ—¶ï¼š
1. æ£€æŸ¥ `parallel-cli auth`
2. ç¡®è®¤ `PARALLEL_API_KEY` å·²è®¾ç½®ï¼Œæˆ–è¿è¡Œ `parallel-cli login` / `parallel-cli login --device`
3. éªŒè¯ `parallel-cli` åœ¨ `PATH` ä¸­

## ç»´æŠ¤

æ£€æŸ¥å½“å‰è®¤è¯ / å®‰è£…çŠ¶æ€ï¼š

```bash
parallel-cli auth
parallel-cli --help
```

æ›´æ–°å‘½ä»¤ï¼š

```bash
parallel-cli update
pip install --upgrade parallel-web-tools
parallel-cli config auto-update-check off
```

## æ³¨æ„äº‹é¡¹

- é™¤éžç”¨æˆ·æ˜Žç¡®è¦æ±‚äººç±»å¯è¯»æ ¼å¼ï¼Œå¦åˆ™ä¸è¦çœç•¥ `--json`ã€‚
- ä¸è¦å¼•ç”¨ CLI è¾“å‡ºä¸­æœªå‡ºçŽ°çš„æ¥æºã€‚
- `login` å¯èƒ½éœ€è¦ PTY/æµè§ˆå™¨äº¤äº’ã€‚
- çŸ­æ—¶ä»»åŠ¡ä¼˜å…ˆåœ¨å‰å°æ‰§è¡Œï¼›ä¸è¦è¿‡åº¦ä½¿ç”¨åŽå°è¿›ç¨‹ã€‚
- å¯¹äºŽå¤§åž‹ç»“æžœé›†ï¼Œå°† JSON ä¿å­˜åˆ° `/tmp/*.json`ï¼Œè€Œä¸æ˜¯å°†æ‰€æœ‰å†…å®¹å¡žå…¥ä¸Šä¸‹æ–‡ã€‚
- å½“ Zed åŽŸç”Ÿå·¥å…·å·²ç»è¶³å¤Ÿæ—¶ï¼Œä¸è¦é™é»˜åœ°é€‰æ‹© Parallelã€‚
- è¯·è®°ä½ï¼Œè¿™æ˜¯ä¸€ä¸ªä¾›åº”å•†å·¥ä½œæµï¼Œé€šå¸¸éœ€è¦è´¦æˆ·è®¤è¯ï¼Œä¸”è¶…å‡ºå…è´¹å¥—é¤åŽéœ€è¦ä»˜è´¹ä½¿ç”¨ã€‚
