---
title: "Hyperliquid â€” Hyperliquid å¸‚åœºæ•°æ®ã€è´¦æˆ·åŽ†å²ã€äº¤æ˜“å¤ç›˜"
sidebar_label: "Hyperliquid"
description: "Hyperliquid å¸‚åœºæ•°æ®ã€è´¦æˆ·åŽ†å²ã€äº¤æ˜“å¤ç›˜"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Hyperliquid

Hyperliquid å¸‚åœºæ•°æ®ã€è´¦æˆ·åŽ†å²ã€äº¤æ˜“å¤ç›˜ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/blockchain/hyperliquid` å®‰è£… |
| è·¯å¾„ | `optional-skills/blockchain/hyperliquid` |
| ç‰ˆæœ¬ | `0.1.0` |
| ä½œè€… | Hugo Sequier (Hugo-SEQUIER), Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Hyperliquid`, `Blockchain`, `Crypto`, `Trading`, `Perpetuals`, `Spot`, `DeFi` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Hyperliquid Skill

é€šè¿‡å…¬å¼€çš„ `/info` ç«¯ç‚¹æŸ¥è¯¢ Hyperliquid å¸‚åœºå’Œè´¦æˆ·æ•°æ®ã€‚
åªè¯» â€” æ— éœ€ API keyï¼Œæ— éœ€ç­¾åï¼Œä¸æ”¯æŒä¸‹å•ã€‚

12 ä¸ªå‘½ä»¤ï¼š`dexs`ã€`markets`ã€`spots`ã€`candles`ã€`funding`ã€`l2`ã€`state`ã€
`spot-balances`ã€`fills`ã€`orders`ã€`review`ã€`export`ã€‚ä»…ä½¿ç”¨æ ‡å‡†åº“
ï¼ˆ`urllib`ã€`json`ã€`argparse`ï¼‰ã€‚

---

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¯·æ±‚ Hyperliquid æ°¸ç»­åˆçº¦æˆ–çŽ°è´§å¸‚åœºæ•°æ®ã€K çº¿ã€èµ„é‡‘è´¹çŽ‡æˆ– L2 ç›˜å£
- ç”¨æˆ·å¸Œæœ›æŸ¥çœ‹é’±åŒ…çš„æ°¸ç»­ä»“ä½ã€çŽ°è´§ä½™é¢ã€æˆäº¤è®°å½•æˆ–æŒ‚å•
- ç”¨æˆ·å¸Œæœ›ç»“åˆè¿‘æœŸæˆäº¤ä¸Žå¸‚åœºèƒŒæ™¯è¿›è¡Œäº¤æ˜“åŽå¤ç›˜
- ç”¨æˆ·å¸Œæœ›æŸ¥çœ‹ builder éƒ¨ç½²çš„æ°¸ç»­ DEX æˆ– HIP-3 å¸‚åœº
- ç”¨æˆ·å¸Œæœ›å¯¼å‡ºæ ‡å‡†åŒ–çš„ K çº¿ + èµ„é‡‘è´¹çŽ‡ JSON æ•°æ®ç”¨äºŽå›žæµ‹å‡†å¤‡

---

## å‰ç½®æ¡ä»¶

ä»…ä½¿ç”¨æ ‡å‡†åº“ â€” æ— éœ€å¤–éƒ¨åŒ…ï¼Œæ— éœ€ API keyã€‚

è„šæœ¬ä»Ž `~/.zed/.env` è¯»å–ä¸¤ä¸ªå¯é€‰é»˜è®¤å€¼ï¼š

- `HYPERLIQUID_API_URL` â€” é»˜è®¤ä¸º `https://api.hyperliquid.xyz`ã€‚è®¾ç½®ä¸º
  `https://api.hyperliquid-testnet.xyz` å¯åˆ‡æ¢è‡³æµ‹è¯•ç½‘ã€‚
- `HYPERLIQUID_USER_ADDRESS` â€” `state`ã€`spot-balances`ã€`fills`ã€`orders` å’Œ `review` çš„é»˜è®¤åœ°å€ã€‚è‹¥æœªè®¾ç½®ï¼Œåˆ™å°†åœ°å€ä½œä¸ºç¬¬ä¸€ä¸ªä½ç½®å‚æ•°ä¼ å…¥ã€‚

å½“å‰å·¥ä½œç›®å½•ä¸­çš„é¡¹ç›® `.env` æ–‡ä»¶ä½œä¸ºå¼€å‘çŽ¯å¢ƒçš„å¤‡ç”¨é…ç½®ã€‚

è¾…åŠ©è„šæœ¬ï¼š`~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py`

---

## è¿è¡Œæ–¹å¼

é€šè¿‡ `terminal` å·¥å…·è°ƒç”¨ï¼š

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py <command> [args]
```

åœ¨ä»»æ„å‘½ä»¤åŽæ·»åŠ  `--json` å¯èŽ·å¾—æœºå™¨å¯è¯»è¾“å‡ºã€‚

---

## å¿«é€Ÿå‚è€ƒ

```bash
hyperliquid_client.py dexs
hyperliquid_client.py markets [--dex DEX] [--limit N] [--sort volume|oi|funding_abs|change_abs|name]
hyperliquid_client.py spots [--limit N]
hyperliquid_client.py candles <coin> [--interval 1h] [--hours 24] [--limit N]
hyperliquid_client.py funding <coin> [--hours 72] [--limit N]
hyperliquid_client.py l2 <coin> [--levels N]
hyperliquid_client.py state [address] [--dex DEX]
hyperliquid_client.py spot-balances [address] [--limit N]
hyperliquid_client.py fills [address] [--hours N] [--limit N] [--aggregate-by-time]
hyperliquid_client.py orders [address] [--limit N]
hyperliquid_client.py review [address] [--coin COIN] [--hours N] [--fills N]
hyperliquid_client.py export <coin> [--interval 1h] [--hours N] [--output PATH]
```

å¯¹äºŽ `state`ã€`spot-balances`ã€`fills`ã€`orders` å’Œ `review`ï¼Œå½“ `~/.zed/.env` ä¸­è®¾ç½®äº† `HYPERLIQUID_USER_ADDRESS` æ—¶ï¼Œåœ°å€å‚æ•°ä¸ºå¯é€‰ã€‚

---

## æ“ä½œæµç¨‹

### 1. å‘çŽ° DEX å’Œå¸‚åœº

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py dexs

python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  markets --limit 15 --sort volume

python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  spots --limit 15
```

- `--dex` ä»…é€‚ç”¨äºŽæ°¸ç»­åˆçº¦ç«¯ç‚¹ï¼›çœç•¥åˆ™ä½¿ç”¨ç¬¬ä¸€ä¸ªæ°¸ç»­ DEXã€‚
- çŽ°è´§äº¤æ˜“å¯¹å¯èƒ½æ˜¾ç¤ºä¸º `PURR/USDC` æˆ–åˆ«åå¦‚ `@107`ã€‚
- HIP-3 å¸‚åœºçš„å¸ç§åç§°å¸¦æœ‰ DEX å‰ç¼€ï¼Œä¾‹å¦‚ `mydex:BTC`ã€‚

### 2. æ‹‰å–åŽ†å²å¸‚åœºæ•°æ®

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  candles BTC --interval 1h --hours 72 --limit 48

python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  funding BTC --hours 168 --limit 30
```

æ—¶é—´èŒƒå›´ç«¯ç‚¹æ”¯æŒåˆ†é¡µã€‚å¯¹äºŽè¾ƒå¤§çš„æ—¶é—´çª—å£ï¼Œå¯ä½¿ç”¨æ›´æ™šçš„ `startTime` é‡å¤è¯·æ±‚ï¼Œæˆ–ä½¿ç”¨ä¸‹æ–¹çš„ `export` å‘½ä»¤ã€‚

### 3. æŸ¥çœ‹å®žæ—¶ç›˜å£

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  l2 BTC --levels 10
```

å½“ç”¨æˆ·è¯¢é—®ç›˜å£æ·±åº¦ã€è¿‘æœŸæµåŠ¨æ€§æˆ–å¤§å•å¸‚åœºå†²å‡»æ—¶ä½¿ç”¨ã€‚

### 4. æŸ¥çœ‹è´¦æˆ·ä¿¡æ¯

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  state 0xabc...

python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  spot-balances
```

`state` è¿”å›žæ°¸ç»­ä»“ä½ï¼›`spot-balances` è¿”å›žçŽ°è´§æŒä»“ã€‚
é€‚ç”¨äºŽ"æˆ‘çš„ä»“ä½æƒ…å†µå¦‚ä½•"ã€"æˆ‘æŒæœ‰ä»€ä¹ˆ"ã€"å¯æçŽ°é‡‘é¢æ˜¯å¤šå°‘"ç­‰é—®é¢˜ã€‚

### 5. æŸ¥çœ‹æˆäº¤è®°å½•å’ŒæŒ‚å•

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  fills 0xabc... --hours 72 --limit 25

python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  orders --limit 25
```

### 6. ç”Ÿæˆäº¤æ˜“å¤ç›˜æŠ¥å‘Š

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  review 0xabc... --hours 72 --fills 50

python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  review --coin BTC --hours 168
```

æŠ¥å‘ŠåŒ…å«å·²å®žçŽ° PnLã€æ‰‹ç»­è´¹ã€ç›ˆäºæ¬¡æ•°ã€å¸ç§æ˜Žç»†ã€æ¯ä¸ªäº¤æ˜“æ°¸ç»­åˆçº¦çš„å¸‚åœºè¶‹åŠ¿å’Œå¹³å‡èµ„é‡‘è´¹çŽ‡ï¼Œä»¥åŠå¯å‘å¼åˆ†æžï¼ˆæ‰‹ç»­è´¹æ‹–ç´¯ã€é›†ä¸­åº¦ã€é€†åŠ¿äºæŸï¼‰ã€‚

æ·±åº¦äº¤æ˜“åŽåˆ†æžæµç¨‹ï¼šå…ˆç”¨ `review` æ‰¾å‡ºé—®é¢˜å¸ç§æˆ–æ—¶é—´æ®µ â†’ æ‹‰å–è¯¥æ—¶æ®µçš„ `fills` å’Œ `orders` â†’ æ‹‰å–æ¯ä¸ªäº¤æ˜“å¸ç§çš„ `candles` å’Œ `funding` â†’ å°†å†³ç­–è´¨é‡ä¸Žç»“æžœè´¨é‡åˆ†å¼€è¯„åˆ¤ã€‚

### 7. å¯¼å‡ºå¯å¤ç”¨æ•°æ®é›†

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  export BTC --interval 1h --hours 168 --output ./btc-1h-7d.json

python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  export BTC --interval 15m --hours 72 --end-time-ms 1760000000000
```

è¾“å‡º JSON åŒ…å«ï¼šschema ç‰ˆæœ¬ã€æ•°æ®æºå…ƒæ•°æ®ã€ç²¾ç¡®æ—¶é—´çª—å£ã€æ ‡å‡†åŒ– K çº¿è¡Œã€æ ‡å‡†åŒ–èµ„é‡‘è´¹çŽ‡è¡Œã€æ±‡æ€»ç»Ÿè®¡ã€‚ä½¿ç”¨ `--end-time-ms` å¯èŽ·å¾—å¯å¤çŽ°çš„æ—¶é—´çª—å£ã€‚

---

## æ³¨æ„äº‹é¡¹

- å…¬å¼€ info ç«¯ç‚¹æœ‰é€ŸçŽ‡é™åˆ¶ã€‚å¤§èŒƒå›´åŽ†å²æŸ¥è¯¢å¯èƒ½è¿”å›žæˆªæ–­çš„æ—¶é—´çª—å£ï¼›è¯·ä½¿ç”¨æ›´æ™šçš„ `startTime` å€¼è¿­ä»£è¯·æ±‚ã€‚
- `fills --hours ...` ä½¿ç”¨ `userFillsByTime`ï¼Œä»…æš´éœ²è¿‘æœŸæ»šåŠ¨çª—å£ â€” ä¸æ”¯æŒå®Œæ•´åŽ†å²å½’æ¡£ã€‚
- `historicalOrders` ä»…è¿”å›žè¿‘æœŸè®¢å•ï¼Œä¸æ”¯æŒå®Œæ•´å¯¼å‡ºã€‚
- `review` å‘½ä»¤åŸºäºŽå¯å‘å¼åˆ†æžã€‚ä»…å‡­æˆäº¤è®°å½•æ— æ³•è¿˜åŽŸäº¤æ˜“æ„å›¾ã€ä¸‹å•è´¨é‡æˆ–çœŸå®žæ»‘ç‚¹ã€‚
- `export` å‘½ä»¤è¾“å‡ºæ ‡å‡†åŒ–æ•°æ®é›†ï¼Œè€Œéžå›žæµ‹å¼•æ“Žã€‚ä»éœ€è‡ªè¡Œæž„å»ºæ»‘ç‚¹/æˆäº¤æ¨¡åž‹ã€‚
- çŽ°è´§åˆ«åå¦‚ `@107` æ˜¯æœ‰æ•ˆæ ‡è¯†ç¬¦ï¼Œå³ä½¿ UI æ˜¾ç¤ºçš„æ˜¯æ›´å‹å¥½çš„åç§°ã€‚
- `l2` æ˜¯æŸä¸€æ—¶åˆ»çš„å¿«ç…§ï¼Œä¸æ˜¯æ—¶é—´åºåˆ—ã€‚

---

## éªŒè¯

```bash
python3 ~/.zed/skills/blockchain/hyperliquid/scripts/hyperliquid_client.py \
  markets --limit 5
```

åº”è¾“å‡ºæŒ‰ 24 å°æ—¶åä¹‰æˆäº¤é‡æŽ’åçš„ Hyperliquid æ°¸ç»­åˆçº¦å¸‚åœºå‰äº”åã€‚
