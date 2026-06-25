---
title: "Osint Investigation"
sidebar_label: "Osint Investigation"
description: "å…¬å¼€è®°å½• OSINT è°ƒæŸ¥æ¡†æž¶ â€” SEC EDGAR æ–‡ä»¶ã€USAspending åˆåŒã€å‚è®®é™¢æ¸¸è¯´ã€OFAC åˆ¶è£ã€ICIJ ç¦»å²¸æ³„éœ²ã€çº½çº¦å¸‚æˆ¿äº§è®°å½•ï¼ˆACRISï¼‰ã€OpenCorporates æ³¨å†Œä¿¡æ¯ã€CourtListener æ³•é™¢è®°å½•ã€Wayback Machine å­˜æ¡£ã€Wikipedia + Wikidataã€GDELT æ–°é—»ç›‘æŽ§ã€‚è·¨æ¥æºå®žä½“è§£æžã€äº¤å‰é“¾æŽ¥åˆ†æžã€æ—¶åºå…³è”ã€è¯æ®é“¾ã€‚ä»…ä½¿ç”¨ Python æ ‡å‡†åº“ã€‚"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Osint Investigation

å…¬å¼€è®°å½• OSINTï¼ˆå¼€æºæƒ…æŠ¥ï¼‰è°ƒæŸ¥æ¡†æž¶ â€” SEC EDGAR æ–‡ä»¶ã€USAspending åˆåŒã€å‚è®®é™¢æ¸¸è¯´ã€OFAC åˆ¶è£ã€ICIJ ç¦»å²¸æ³„éœ²ã€çº½çº¦å¸‚æˆ¿äº§è®°å½•ï¼ˆACRISï¼‰ã€OpenCorporates æ³¨å†Œä¿¡æ¯ã€CourtListener æ³•é™¢è®°å½•ã€Wayback Machine å­˜æ¡£ã€Wikipedia + Wikidataã€GDELT æ–°é—»ç›‘æŽ§ã€‚è·¨æ¥æºå®žä½“è§£æžã€äº¤å‰é“¾æŽ¥åˆ†æžã€æ—¶åºå…³è”ã€è¯æ®é“¾ã€‚ä»…ä½¿ç”¨ Python æ ‡å‡†åº“ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/research/osint-investigation` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/osint-investigation` |
| ç‰ˆæœ¬ | `0.1.0` |
| ä½œè€… | Zed Agentï¼ˆæ”¹ç¼–è‡ª ShinMegamiBoson/OpenPlanterï¼ŒMIT è®¸å¯ï¼‰|
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `osint`, `investigation`, `public-records`, `sec`, `sanctions`, `corporate-registry`, `property`, `courts`, `due-diligence`, `journalism` |
| ç›¸å…³ skill | [`domain-intel`](/user-guide/skills/optional/research/research-domain-intel), [`arxiv`](/user-guide/skills/bundled/research/research-arxiv) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# OSINT è°ƒæŸ¥ â€” å…¬å¼€è®°å½•äº¤å‰æ ¸æŸ¥

å…¬å¼€è®°å½• OSINT è°ƒæŸ¥æ¡†æž¶ï¼šæ”¿åºœåˆåŒã€ä¼ä¸šæ–‡ä»¶ã€æ¸¸è¯´ã€åˆ¶è£ã€ç¦»å²¸æ³„éœ²ã€æˆ¿äº§è®°å½•ã€æ³•é™¢è®°å½•ã€ç½‘ç»œå­˜æ¡£ã€çŸ¥è¯†åº“åŠå…¨çƒæ–°é—»ã€‚è·¨å¼‚æž„æ¥æºè§£æžå®žä½“ï¼Œä»¥æ˜¾å¼ç½®ä¿¡åº¦æž„å»ºäº¤å‰é“¾æŽ¥ï¼Œè¿è¡Œç»Ÿè®¡æ—¶åºæ£€éªŒï¼Œå¹¶ç”Ÿæˆç»“æž„åŒ–è¯æ®é“¾ã€‚

**ä»…ä½¿ç”¨ Python æ ‡å‡†åº“ã€‚** é›¶å®‰è£…ã€‚æ”¯æŒ Linuxã€macOSã€Windowsã€‚å¤§å¤šæ•°æ¥æºæ— éœ€ API å¯†é’¥ï¼ˆOpenCorporates æœ‰å¯é€‰çš„å…è´¹ tokenï¼Œå¯æé«˜é€ŸçŽ‡é™åˆ¶ï¼‰ã€‚

æ”¹ç¼–è‡ª MIT è®¸å¯çš„ ShinMegamiBoson/OpenPlanter é¡¹ç›®ï¼›æ‰©å±•è¦†ç›–äº†åŽŸé¡¹ç›®æœªæ¶‰åŠçš„èº«ä»½/æˆ¿äº§/è¯‰è®¼/å­˜æ¡£/æ–°é—»æ¥æºã€‚

## ä½•æ—¶ä½¿ç”¨æ­¤ skill

å½“ç”¨æˆ·è¯·æ±‚ä»¥ä¸‹å†…å®¹æ—¶ä½¿ç”¨ï¼š

- "è¿½è¸ªèµ„é‡‘æµå‘" â€” æ”¿åºœåˆåŒã€æ¸¸è¯´ â†’ ç«‹æ³•ã€åˆ¶è£
- ä¼ä¸šå°½èŒè°ƒæŸ¥ â€” è°æŽ§åˆ¶å…¬å¸ Xã€åœ¨å“ªé‡Œæ³¨å†Œã€è°æ‹…ä»»è‘£äº‹ä¼šæˆå‘˜ã€æäº¤äº†å“ªäº›æ–‡ä»¶
- åˆ¶è£ç­›æŸ¥ â€” å®žä½“ X æ˜¯å¦åœ¨ OFAC SDN åå•æˆ– ICIJ ç¦»å²¸æ³„éœ²ä¸­
- æƒé’±äº¤æ˜“è°ƒæŸ¥ â€” æœ‰ç¦»å²¸å…³è”çš„æ‰¿åŒ…å•†ã€èµ¢å¾—åˆåŒçš„æ¸¸è¯´å®¢æˆ·
- æˆ¿äº§æ‰€æœ‰æƒ â€” æŒ‰å§“åæˆ–åœ°å€æŸ¥æ‰¾å·²è®°å½•çš„å¥‘çº¦/æŠµæŠ¼ï¼ˆçº½çº¦å¸‚ï¼›å…¶ä»–åŽ¿è¯·ç”¨æˆ·æŸ¥é˜…ç›¸å…³è®°å½•æœºæž„ï¼‰
- è¯‰è®¼åŽ†å² â€” æŸ¥æ‰¾è”é‚¦åŠå·žæ³•é™¢æ„è§å’Œ PACER æ¡ˆå·
- è·¨æ¥æºå®žä½“è§£æžï¼ˆå‘½åå­˜åœ¨å·®å¼‚ï¼Œå¦‚ LLC åŽç¼€ã€ç¼©å†™ï¼‰
- ä»¥æ˜¾å¼ç½®ä¿¡åº¦æž„å»ºè¯æ®é“¾
- "å…³äºŽ X æœ‰å“ªäº›æŠ¥é“" â€” å›½é™…æ–°é—»ï¼ˆGDELTï¼‰+ Wikipedia å™è¿° + Wayback Machine æ¢å¤å¤±æ•ˆ URL

**ä¸é€‚ç”¨**æ­¤ skill çš„åœºæ™¯ï¼š

- é€šç”¨ç½‘ç»œç ”ç©¶ â†’ `web_search` / `web_extract`
- åŸŸå/åŸºç¡€è®¾æ–½ OSINT â†’ `domain-intel` skill
- å­¦æœ¯æ–‡çŒ® â†’ `arxiv` skill
- ç¤¾äº¤åª’ä½“è´¦å·å‘çŽ° â†’ `sherlock` skillï¼ˆå¯é€‰ï¼‰
- ç¾Žå›½**è”é‚¦**ç«žé€‰è´¢åŠ¡ â€” FEC åœ¨æ­¤å¤„æœ‰æ„ä¸è¦†ç›–ï¼ˆå…è´¹ DEMO_KEY å±‚çº§çš„ API å¯¹ä¸´æ—¶è´¡çŒ®è€…å§“åæŸ¥è¯¢ä¸å¯é ï¼‰ã€‚è”é‚¦ææ¬¾è¯·ç›´æŽ¥å¼•å¯¼ç”¨æˆ·è®¿é—® https://www.fec.gov/data/ã€‚

## å·¥ä½œæµç¨‹

Agent é€šè¿‡ `terminal` å·¥å…·è¿è¡Œè„šæœ¬ã€‚`SKILL_DIR` æ˜¯å­˜æ”¾æ­¤ SKILL.md çš„ç›®å½•ã€‚

### 1. ç¡®å®šé€‚ç”¨çš„æ•°æ®æ¥æº

é˜…è¯»æ•°æ®æ¥æº wiki æ¡ç›®ä»¥è§„åˆ’è°ƒæŸ¥ï¼š

```
ls SKILL_DIR/references/sources/

# è”é‚¦è´¢åŠ¡ / ç›‘ç®¡
cat SKILL_DIR/references/sources/sec-edgar.md       # ä¼ä¸šæ–‡ä»¶
cat SKILL_DIR/references/sources/usaspending.md     # è”é‚¦åˆåŒ
cat SKILL_DIR/references/sources/senate-ld.md       # æ¸¸è¯´
cat SKILL_DIR/references/sources/ofac-sdn.md        # åˆ¶è£
cat SKILL_DIR/references/sources/icij-offshore.md   # ç¦»å²¸æ³„éœ²

# èº«ä»½ / æˆ¿äº§ / è¯‰è®¼ / å­˜æ¡£ / æ–°é—»
cat SKILL_DIR/references/sources/nyc-acris.md       # çº½çº¦å¸‚æˆ¿äº§è®°å½•
cat SKILL_DIR/references/sources/opencorporates.md  # å…¨çƒä¼ä¸šæ³¨å†Œä¿¡æ¯
cat SKILL_DIR/references/sources/courtlistener.md   # æ³•é™¢è®°å½•ï¼ˆè”é‚¦ + å·žï¼‰
cat SKILL_DIR/references/sources/wayback.md         # Wayback Machine å­˜æ¡£
cat SKILL_DIR/references/sources/wikipedia.md       # Wikipedia + Wikidata
cat SKILL_DIR/references/sources/gdelt.md           # å…¨çƒæ–°é—»ç›‘æŽ§
```

æ¯ä¸ªæ¡ç›®éµå¾ª 9 èŠ‚æ¨¡æ¿ï¼šæ‘˜è¦ã€è®¿é—®ã€schemaã€è¦†ç›–èŒƒå›´ã€äº¤å‰å¼•ç”¨é”®ã€æ•°æ®è´¨é‡ã€èŽ·å–æ–¹å¼ã€æ³•å¾‹è¯´æ˜Žã€å‚è€ƒèµ„æ–™ã€‚

**äº¤å‰å¼•ç”¨æ½œåŠ›**éƒ¨åˆ†åˆ—å‡ºäº†æ¥æºä¹‹é—´çš„å…³è”é”® â€” ä¼˜å…ˆé˜…è¯»è¿™éƒ¨åˆ†ä»¥é€‰æ‹©åˆé€‚çš„é…å¯¹ã€‚

### 2. èŽ·å–æ•°æ®

æ¯ä¸ªæ¥æºåœ¨ `SKILL_DIR/scripts/` ä¸­éƒ½æœ‰ä»…ä½¿ç”¨æ ‡å‡†åº“çš„æŠ“å–è„šæœ¬ï¼š

**è”é‚¦è´¢åŠ¡ / ç›‘ç®¡**

```bash
# SEC EDGAR æ–‡ä»¶ï¼ˆä¼ä¸šæŠ«éœ²ï¼‰
python3 SKILL_DIR/scripts/fetch_sec_edgar.py --cik 0000320193 \
    --types 10-K,10-Q --out data/edgar_filings.csv

# USAspending è”é‚¦åˆåŒ
python3 SKILL_DIR/scripts/fetch_usaspending.py --recipient "EXAMPLE CORP" \
    --fy 2024 --out data/contracts.csv

# å‚è®®é™¢ LD-1 / LD-2 æ¸¸è¯´æŠ«éœ²
python3 SKILL_DIR/scripts/fetch_senate_ld.py --client "EXAMPLE CORP" \
    --year 2024 --out data/lobbying.csv

# OFAC SDN åˆ¶è£åå•ï¼ˆå®Œæ•´å¿«ç…§ï¼‰
python3 SKILL_DIR/scripts/fetch_ofac_sdn.py --out data/ofac_sdn.csv

# ICIJ ç¦»å²¸æ³„éœ² â€” é¦–æ¬¡ä½¿ç”¨æ—¶ä¸‹è½½çº¦ 70 MB æ‰¹é‡ CSVï¼Œ
# ä¹‹åŽåœ¨æœ¬åœ°æœç´¢ã€‚ç¼“å­˜ 30 å¤©ï¼Œå­˜å‚¨äºŽ
# $ZED_OSINT_CACHE/icij/ï¼ˆé»˜è®¤ï¼š~/.cache/zed-osint/icij/ï¼‰ã€‚
python3 SKILL_DIR/scripts/fetch_icij_offshore.py --entity "EXAMPLE CORP" \
    --out data/icij.csv
```

**èº«ä»½ / æˆ¿äº§ / è¯‰è®¼ / å­˜æ¡£ / æ–°é—»**

```bash
# çº½çº¦å¸‚æˆ¿äº§è®°å½•ï¼ˆå¥‘çº¦ã€æŠµæŠ¼ã€ç•™ç½®æƒï¼‰â€” é€šè¿‡ Socrata è®¿é—® ACRIS
python3 SKILL_DIR/scripts/fetch_nyc_acris.py --name "SMITH, JOHN" \
    --out data/acris.csv
python3 SKILL_DIR/scripts/fetch_nyc_acris.py --address "571 HUDSON" \
    --out data/acris_addr.csv

# OpenCorporates â€” 130+ å¸æ³•ç®¡è¾–åŒºä¼ä¸šæ³¨å†Œä¿¡æ¯
# ï¼ˆéœ€è¦å…è´¹ tokenï¼›è®¾ç½® OPENCORPORATES_API_TOKEN æˆ–ä¼ å…¥ --tokenï¼‰
python3 SKILL_DIR/scripts/fetch_opencorporates.py --query "Example Corp" \
    --jurisdiction us_ny --out data/opencorporates.csv

# CourtListener â€” è”é‚¦ + å·žæ³•é™¢æ„è§ã€PACER æ¡ˆå·
python3 SKILL_DIR/scripts/fetch_courtlistener.py --query "Smith v. Example Corp" \
    --type opinions --out data/courts.csv

# Wayback Machine â€” åŽ†å²ç½‘é¡µå¿«ç…§
python3 SKILL_DIR/scripts/fetch_wayback.py --url "example.com" \
    --match host --collapse digest --out data/wayback.csv

# Wikipedia + Wikidata â€” å™è¿°æ€§ä¼ è®° + ç»“æž„åŒ–äº‹å®ž
# è®¾ç½® ZED_OSINT_UA=your-app/1.0 (your@email) ä»¥æ ‡è¯†è‡ªèº«
python3 SKILL_DIR/scripts/fetch_wikipedia.py --query "Bill Gates" \
    --out data/wp.csv

# GDELT â€” 100+ è¯­è¨€å…¨çƒæ–°é—»ï¼Œçº¦ 2015 å¹´è‡³ä»Š
python3 SKILL_DIR/scripts/fetch_gdelt.py --query '"Example Corp"' \
    --timespan 1y --out data/gdelt.csv
```

æ‰€æœ‰è¾“å‡ºå‡ä¸ºå¸¦æ ‡é¢˜è¡Œçš„æ ‡å‡†åŒ– CSVã€‚è„šæœ¬å¯å¹‚ç­‰é‡å¤è¿è¡Œã€‚

å½“ç§äººä¸ªäººä¸ä¼šå‡ºçŽ°åœ¨æŸæ¥æºä¸­æ—¶ï¼ˆä¾‹å¦‚éžä¸Šå¸‚å…¬å¸äººå‘˜ä¸åœ¨ SEC EDGAR ä¸­ï¼Œéžè”é‚¦æ‰¿åŒ…å•†ä¸åœ¨ USAspending ä¸­ï¼Œéžæ¸¸è¯´å®¢æˆ·ä¸åœ¨å‚è®®é™¢ LDA ä¸­ï¼‰ï¼Œè„šæœ¬è¿”å›ž 0 è¡Œå¹¶ç»™å‡ºæ˜Žç¡®è­¦å‘Šï¼Œè€Œä¸æ˜¯é™é»˜å†™å…¥ç©º CSVã€‚EDGAR ä¼šç‰¹åˆ«æ ‡è®°å…¬å¸åç§°è§£æžå™¨åŒ¹é…åˆ°çš„æ˜¯ä¸ªäºº Form 3/4/5 ç”³æŠ¥äººè€Œéžä¼ä¸šæ³¨å†Œäººçš„æƒ…å†µã€‚

é€ŸçŽ‡é™åˆ¶è¯´æ˜Žè§å„æ¥æºçš„ wiki æ¡ç›®ã€‚é»˜è®¤æŠ“å–å™¨åœ¨åˆ†é¡µè¯·æ±‚ä¹‹é—´ä¼šç¤¼è²Œåœ°ä¼‘çœ ã€‚**API å¯†é’¥å¯æé«˜æ”¯æŒå®ƒä»¬çš„æ¥æºçš„é€ŸçŽ‡é™åˆ¶**ï¼ˆ`SEC_USER_AGENT`ã€`SENATE_LDA_TOKEN`ã€`OPENCORPORATES_API_TOKEN`ã€`COURTLISTENER_TOKEN`ï¼‰ã€‚æ‰€æœ‰è„šæœ¬ä¼šç«‹å³å°† 429 å“åº”åŠä¸Šæ¸¸é…é¢æ¶ˆæ¯å‘ˆçŽ°ç»™ç”¨æˆ·ï¼Œä»¥ä¾¿ç”¨æˆ·çŸ¥é“éœ€è¦é™é€Ÿæˆ–æä¾›å¯†é’¥ã€‚

### 3. è·¨æ¥æºå®žä½“è§£æž

è§„èŒƒåŒ–åç§°å¹¶åœ¨ä¸¤ä¸ª CSV æ–‡ä»¶ä¹‹é—´æŸ¥æ‰¾åŒ¹é…ï¼š

```bash
# å°†æ¸¸è¯´å®¢æˆ·ï¼ˆå‚è®®é™¢ LDAï¼‰ä¸ŽåˆåŒå—ç›Šäººï¼ˆUSAspendingï¼‰è¿›è¡ŒåŒ¹é…
python3 SKILL_DIR/scripts/entity_resolution.py \
    --left  data/lobbying.csv   --left-name-col  client_name \
    --right data/contracts.csv  --right-name-col recipient_name \
    --out data/cross_links.csv
```

ä¸‰ä¸ªåŒ¹é…å±‚çº§ï¼Œé™„å¸¦æ˜¾å¼ç½®ä¿¡åº¦ï¼š

| å±‚çº§ | æ–¹æ³• | ç½®ä¿¡åº¦ |
|------|--------|------------|
| `exact` | åŽ»é™¤åŽç¼€/æ ‡ç‚¹åŽè§„èŒƒåŒ–å­—ç¬¦ä¸²ç›¸ç­‰ | é«˜ |
| `fuzzy` | æŽ’åºè¯å…ƒç›¸ç­‰ï¼ˆè¯è¢‹åŒ¹é…ï¼‰ | ä¸­ |
| `token_overlap` | â‰¥60% è¯å…ƒé‡å ï¼Œâ‰¥2 ä¸ªå…±äº«è¯å…ƒï¼Œè¯å…ƒ â‰¥4 ä¸ªå­—ç¬¦ | ä½Ž |

è¾“å‡º `cross_links.csv` åˆ—ï¼š`match_type, confidence, left_name, right_name, left_normalized, right_normalized, left_row, right_row`ã€‚

### 4. ç»Ÿè®¡æ—¶åºå…³è”ï¼ˆå¯é€‰ï¼‰

æ£€éªŒä¸¤ä¸ªæ—¶é—´åºåˆ—æ˜¯å¦å­˜åœ¨å¯ç–‘çš„æ—¶é—´èšé›† â€” ä¾‹å¦‚æ¸¸è¯´æ–‡ä»¶æäº¤æ—¶é—´ä¸ŽåˆåŒæŽˆäºˆæ—¶é—´æŽ¥è¿‘ â€” ä½¿ç”¨ç½®æ¢æ£€éªŒï¼ˆpermutation testï¼‰ï¼š

```bash
python3 SKILL_DIR/scripts/timing_analysis.py \
    --donations data/lobbying.csv --donation-date-col filing_date \
        --donation-amount-col income --donation-donor-col client_name \
        --donation-recipient-col registrant_name \
    --contracts data/contracts.csv --contract-date-col award_date \
        --contract-vendor-col recipient_name \
    --cross-links data/cross_links.csv \
    --permutations 1000 \
    --out data/timing.json
```

è„šæœ¬çš„åˆ—æ ‡å¿—æ˜¯æœ‰æ„è®¾è®¡ä¸ºé€šç”¨çš„ â€” åŽŸå·¥å…·æ˜¯ä¸ºææ¬¾ä¸ŽåˆåŒæŽˆäºˆåœºæ™¯ç¼–å†™çš„ï¼Œä½†å®ƒé€‚ç”¨äºŽä»»ä½•é€šè¿‡äº¤å‰é“¾æŽ¥å…³è”çš„ï¼ˆäº‹ä»¶ï¼Œæ”¶æ¬¾æ–¹ï¼‰æ—¶é—´åºåˆ—ã€‚é›¶å‡è®¾ï¼šäº‹ä»¶æ—¶åºä¸ŽåˆåŒæŽˆäºˆæ—¥æœŸæ— å…³ã€‚å•å°¾ p å€¼ = ç½®æ¢ä¸­å¹³å‡æœ€è¿‘åˆåŒè·ç¦» â‰¤ è§‚æµ‹å€¼çš„æ¯”ä¾‹ã€‚æ¯ä¸ªï¼ˆä»˜æ¬¾æ–¹ï¼Œä¾›åº”å•†ï¼‰é…å¯¹è‡³å°‘éœ€è¦ 3 ä¸ªäº‹ä»¶æ‰èƒ½è¿è¡Œæ£€éªŒã€‚

### 5. æž„å»ºè°ƒæŸ¥ç»“æžœ JSONï¼ˆè¯æ®é“¾ï¼‰

```bash
python3 SKILL_DIR/scripts/build_findings.py \
    --cross-links data/cross_links.csv \
    --timing data/timing.json \
    --out data/findings.json
```

æ¯æ¡è°ƒæŸ¥ç»“æžœåŒ…å« `id, title, severity, confidence, summary, evidence[], sources[]`ã€‚æ¯ä¸ªè¯æ®é¡¹æŒ‡å‘æ¥æº CSV ä¸­çš„å…·ä½“è¡Œã€‚ç”¨æˆ·ï¼ˆæˆ–åŽç»­ agentï¼‰å¯ä»¥å¯¹ç…§æ¥æºéªŒè¯æ¯é¡¹å£°æ˜Žã€‚

## ç½®ä¿¡åº¦ä¸Žè¯æ®è§„èŒƒ

è¿™æ˜¯è¯¥ skill çš„æ ¸å¿ƒè§„åˆ™ã€‚å‘ŠçŸ¥ç”¨æˆ·ï¼š

- æ¯é¡¹å£°æ˜Žå¿…é¡»å¯è¿½æº¯è‡³å…·ä½“è®°å½•ã€‚ä¸å¾—æœ‰æ— ä¾æ®çš„æ–­è¨€ã€‚
- ç½®ä¿¡åº¦å±‚çº§éšå£°æ˜Žä¼ é€’ã€‚`match_type=fuzzy` è¡¨ç¤º"å¯èƒ½"ï¼Œè€Œéž"å·²ç¡®è®¤"ã€‚
- å®žä½“è§£æžäº§ç”Ÿçš„æ˜¯å€™é€‰ç»“æžœï¼Œè€Œéžç»“è®ºã€‚"ACME LLC"ä¸Ž"Acme Holdings Group"ä¹‹é—´çš„ `fuzzy` åŒ¹é…æ˜¯çº¿ç´¢ï¼Œä¸æ˜¯äº‹å®žã€‚
- ç»Ÿè®¡æ˜¾è‘—æ€§ â‰  è¿è§„è¡Œä¸ºã€‚p &lt; 0.05 æ„å‘³ç€è¯¥æ—¶åºæ¨¡å¼åœ¨é›¶å‡è®¾ä¸‹ä¸å¤ªå¯èƒ½å‡ºçŽ°ï¼Œå¹¶ä¸èƒ½è¯æ˜Žè…è´¥ã€‚
- æ­¤å¤„æ‰€æœ‰æ•°æ®æ¥æºå‡ä¸ºå…¬å¼€è®°å½•ï¼Œä½†ä»å¯èƒ½åŒ…å«ä¸å‡†ç¡®ä¿¡æ¯ã€è¿‡æ—¶ä¿¡æ¯æˆ–å·²ç¼–è¾‘å†…å®¹ï¼ˆGDPRã€å°å­˜è®°å½•ï¼‰ã€‚

## æ·»åŠ æ–°æ•°æ®æ¥æº

ä½¿ç”¨æ¨¡æ¿ï¼š

```bash
cp SKILL_DIR/templates/source-template.md \
    SKILL_DIR/references/sources/<your-source>.md
```

å¡«å†™å…¨éƒ¨ 9 ä¸ªéƒ¨åˆ†ã€‚åœ¨ `scripts/` ä¸­ç¼–å†™ä»…ä½¿ç”¨æ ‡å‡†åº“çš„ `fetch_<source>.py` è„šæœ¬ï¼Œè¾“å‡ºæ ‡å‡†åŒ– CSVã€‚åœ¨ä¸Šæ–¹"ä½•æ—¶ä½¿ç”¨"éƒ¨åˆ†æ›´æ–°æ¥æºåˆ—è¡¨ã€‚

## å·¥å…·åŠå…¶é™åˆ¶

- `entity_resolution.py` ä¸ä½¿ç”¨å¤–éƒ¨æ¨¡ç³ŠåŒ¹é…åº“ï¼ˆæ—  rapidfuzzï¼Œæ—  jellyfishï¼‰ã€‚è¯è¢‹åŒ¹é…æ˜¯æ­¤å¤„çš„ä¸Šé™ã€‚å¦‚éœ€ Levenshtein è·ç¦»ã€éŸ³è¯‘æˆ–éŸ³ç´ åŒ¹é…ï¼Œè¯·å•ç‹¬ pip å®‰è£…ã€‚
- `timing_analysis.py` ä½¿ç”¨ Python çš„ `random` æ¨¡å—è¿›è¡Œç½®æ¢ã€‚å¦‚éœ€å¯å¤çŽ°æ€§ï¼Œè¯·ä¼ å…¥ `--seed N`ã€‚
- `fetch_*.py` è„šæœ¬ä½¿ç”¨ `urllib.request` å¹¶éµå®ˆ `Retry-After` å¤´ã€‚å¤§é‡æ‰¹é‡ä½¿ç”¨ä»å¯èƒ½è¿åæœåŠ¡æ¡æ¬¾ â€” è¯·å…ˆé˜…è¯»å„æ¥æºçš„æ³•å¾‹è¯´æ˜Žéƒ¨åˆ†ã€‚

## æ³•å¾‹è¯´æ˜Ž

æ‰€æœ‰ç¬¬ä¸€é˜¶æ®µæ¥æºå‡ä¸ºå…¬å¼€è®°å½•ã€‚æ ¹æ®å„è‡ªçš„è®¿é—®æ¡æ¬¾ï¼ˆFOIAã€å…¬å¼€è®°å½•æ³•ã€ICIJ æ˜Žç¡®å‘å¸ƒã€OFAC å…¬å¼€æ•°æ®ï¼‰ï¼Œå…è®¸æ‰¹é‡èŽ·å–ã€‚ä½†æ˜¯ï¼š

- éƒ¨åˆ†æ¥æºé€ŸçŽ‡é™åˆ¶è¾ƒä¸ºä¸¥æ ¼ã€‚è¯·éµå®ˆå…¶å“åº”å¤´ã€‚
- éƒ¨åˆ†æ¥æºä¼šç¼–è¾‘æ³¨å†Œäººä¿¡æ¯ï¼ˆWHOIS çš„ GDPR åˆè§„ã€å°å­˜æ–‡ä»¶ï¼‰ã€‚
- äº¤å‰å¼•ç”¨å…¬å¼€è®°å½•ä»¥è¯†åˆ«ç§äººä¸ªäººå¯èƒ½å­˜åœ¨ä¼¦ç†å½±å“ã€‚è¯¥ skill ç”Ÿæˆçš„æ˜¯è¯æ®é“¾ï¼Œè€ŒéžæŒ‡æŽ§ã€‚