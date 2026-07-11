---
title: "Stocks â€” é€šè¿‡ Yahoo èŽ·å–è‚¡ç¥¨æŠ¥ä»·ã€åŽ†å²ã€æœç´¢ã€æ¯”è¾ƒåŠåŠ å¯†è´§å¸æ•°æ®"
sidebar_label: "Stocks"
description: "é€šè¿‡ Yahoo èŽ·å–è‚¡ç¥¨æŠ¥ä»·ã€åŽ†å²ã€æœç´¢ã€æ¯”è¾ƒåŠåŠ å¯†è´§å¸æ•°æ®"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Stocks

é€šè¿‡ Yahoo èŽ·å–è‚¡ç¥¨æŠ¥ä»·ã€åŽ†å²ã€æœç´¢ã€æ¯”è¾ƒåŠåŠ å¯†è´§å¸æ•°æ®ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/finance/stocks` å®‰è£… |
| è·¯å¾„ | `optional-skills/finance/stocks` |
| ç‰ˆæœ¬ | `0.1.0` |
| ä½œè€… | Mibay (Mibayy), Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Stocks`, `Finance`, `Market`, `Crypto`, `Investing` |
| ç›¸å…³ skill | [`dcf-model`](/user-guide/skills/optional/finance/finance-dcf-model), [`comps-analysis`](/user-guide/skills/optional/finance/finance-comps-analysis), [`lbo-model`](/user-guide/skills/optional/finance/finance-lbo-model) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Stocks Skill

é€šè¿‡ Yahoo Finance æä¾›åªè¯»å¸‚åœºæ•°æ®ã€‚äº”ä¸ªå‘½ä»¤ï¼š`quote`ã€`search`ã€
`history`ã€`compare`ã€`crypto`ã€‚ä»…ä½¿ç”¨ Python æ ‡å‡†åº“â€”â€”æ— éœ€ API keyï¼Œæ— éœ€ pip
å®‰è£…ã€‚Yahoo çš„æŽ¥å£ä¸ºéžå®˜æ–¹æŽ¥å£ï¼Œå¯èƒ½å­˜åœ¨é¢‘çŽ‡é™åˆ¶æˆ–å‘ç”Ÿå˜æ›´ã€‚

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¯¢é—®å½“å‰è‚¡ç¥¨ä»·æ ¼ï¼ˆAAPLã€TSLAã€MSFT ç­‰ï¼‰
- ç”¨æˆ·å¸Œæœ›é€šè¿‡å…¬å¸åç§°æŸ¥æ‰¾è‚¡ç¥¨ä»£ç 
- ç”¨æˆ·éœ€è¦ OHLCV åŽ†å²æ•°æ®æˆ–æŸæ—¥æœŸèŒƒå›´å†…çš„è¡¨çŽ°
- ç”¨æˆ·å¸Œæœ›å¹¶æŽ’æ¯”è¾ƒå¤šä¸ªè‚¡ç¥¨ä»£ç 
- ç”¨æˆ·è¯¢é—®åŠ å¯†è´§å¸ä»·æ ¼ï¼ˆBTCã€ETHã€SOL ç­‰ï¼‰

## å‰ç½®æ¡ä»¶

ä»…éœ€ Python 3.8+ æ ‡å‡†åº“ã€‚å¯é€‰ï¼šè®¾ç½® `ALPHA_VANTAGE_KEY` ä»¥åœ¨ Yahoo çš„ crumb ä¿æŠ¤å­—æ®µè¿”å›ž null æ—¶è¡¥å…… `market_cap`ã€`pe_ratio` åŠ 52 å‘¨é«˜ä½Žç‚¹æ•°æ®ã€‚å…è´¹ key ç”³è¯·ï¼šhttps://www.alphavantage.co/support/#api-key

## è¿è¡Œæ–¹å¼

é€šè¿‡ `terminal` å·¥å…·è°ƒç”¨ã€‚å®‰è£…å®ŒæˆåŽï¼š

```
SCRIPT=~/.zed/skills/finance/stocks/scripts/stocks_client.py
python3 $SCRIPT quote AAPL
```

æ‰€æœ‰è¾“å‡ºå‡ä¸º stdout ä¸Šçš„ JSONâ€”â€”å¦‚éœ€åˆ‡ç‰‡å¤„ç†ï¼Œå¯é€šè¿‡ç®¡é“ä¼ ç»™ `jq`ã€‚

## å¿«é€Ÿå‚è€ƒ

```
python3 $SCRIPT quote AAPL
python3 $SCRIPT quote AAPL MSFT GOOGL TSLA
python3 $SCRIPT search "Tesla"
python3 $SCRIPT history NVDA --range 6mo
python3 $SCRIPT compare AAPL MSFT GOOGL
python3 $SCRIPT crypto BTC ETH SOL
```

## å‘½ä»¤

### `quote SYMBOL [SYMBOL2 ...]`

å½“å‰ä»·æ ¼ã€æ¶¨è·Œé¢ã€æ¶¨è·Œå¹…ã€æˆäº¤é‡ã€52 å‘¨é«˜ä½Žç‚¹ã€‚

### `search QUERY`

é€šè¿‡å…¬å¸åç§°æŸ¥æ‰¾è‚¡ç¥¨ä»£ç ã€‚è¿”å›žå‰ 5 æ¡ç»“æžœï¼šä»£ç ã€åç§°ã€äº¤æ˜“æ‰€ã€ç±»åž‹ã€‚

### `history SYMBOL [--range RANGE]`

æ¯æ—¥ OHLCV æ•°æ®åŠç»Ÿè®¡ä¿¡æ¯ï¼ˆæœ€å°å€¼ã€æœ€å¤§å€¼ã€å‡å€¼ã€æ€»å›žæŠ¥çŽ‡ %ï¼‰ã€‚æ—¶é—´èŒƒå›´ï¼š`1mo`ã€
`3mo`ã€`6mo`ã€`1y`ã€`5y`ã€‚é»˜è®¤ï¼š`1mo`ã€‚

### `compare SYMBOL1 SYMBOL2 [...]`

å¹¶æŽ’å¯¹æ¯”ï¼šä»·æ ¼ã€æ¶¨è·Œå¹…ã€52 å‘¨è¡¨çŽ°ã€‚

### `crypto SYMBOL [SYMBOL2 ...]`

åŠ å¯†è´§å¸ä»·æ ¼ã€‚ä¼ å…¥ `BTC`ï¼ˆè„šæœ¬ä¼šè‡ªåŠ¨è¿½åŠ  `-USD`ï¼‰ã€‚

## æ³¨æ„äº‹é¡¹

- Yahoo Finance çš„ API ä¸ºéžå®˜æ–¹æŽ¥å£ã€‚æŽ¥å£å¯èƒ½åœ¨æœªé€šçŸ¥çš„æƒ…å†µä¸‹å‘ç”Ÿå˜æ›´æˆ–è§¦å‘é¢‘çŽ‡é™åˆ¶â€”â€”å¦‚æžœè¯·æ±‚å¼€å§‹å¤±è´¥ï¼ŒåŽŸå› å³åœ¨äºŽæ­¤ã€‚
- å½“ Yahoo çš„ crumb ä¼šè¯æœªå»ºç«‹æ—¶ï¼Œ`quote` å‘½ä»¤ä¸­çš„ `market_cap` å’Œ `pe_ratio` å¯èƒ½è¿”å›ž nullã€‚è®¾ç½® `ALPHA_VANTAGE_KEY` å¯è¿›è¡Œè¡¥å……ã€‚
- æ‰¹é‡è¯·æ±‚ä¹‹é—´è¯·æ·»åŠ é€‚å½“å»¶è¿Ÿï¼Œä»¥é¿å…è§¦å‘é¢‘çŽ‡é™åˆ¶ã€‚
- æœ¬ skill ä¸ºåªè¯»â€”â€”ä¸æ”¯æŒä¸‹å•ï¼Œä¸é›†æˆè´¦æˆ·ã€‚

## éªŒè¯

```
python3 ~/.zed/skills/finance/stocks/scripts/stocks_client.py quote AAPL
```

è¿”å›žåŒ…å« `symbol: "AAPL"` åŠæ•°å€¼åž‹ `price` å­—æ®µçš„ JSON å¯¹è±¡ã€‚
