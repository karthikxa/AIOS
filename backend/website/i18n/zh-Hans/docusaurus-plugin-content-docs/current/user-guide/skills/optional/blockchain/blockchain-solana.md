---
title: "Solana"
sidebar_label: "Solana"
description: "ä½¿ç”¨ USD å®šä»·æŸ¥è¯¢ Solana åŒºå—é“¾æ•°æ®â€”â€”é’±åŒ…ä½™é¢ã€å¸¦ä»·å€¼çš„ä»£å¸æŠ•èµ„ç»„åˆã€äº¤æ˜“è¯¦æƒ…ã€NFTã€å·¨é²¸æ£€æµ‹åŠå®žæ—¶ç½‘ç»œçŠ¶æ€..."
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Solana

ä½¿ç”¨ USD å®šä»·æŸ¥è¯¢ Solana åŒºå—é“¾æ•°æ®â€”â€”é’±åŒ…ä½™é¢ã€å¸¦ä»·å€¼çš„ä»£å¸æŠ•èµ„ç»„åˆã€äº¤æ˜“è¯¦æƒ…ã€NFTã€å·¨é²¸æ£€æµ‹åŠå®žæ—¶ç½‘ç»œçŠ¶æ€ã€‚ä½¿ç”¨ Solana RPC + CoinGeckoï¼Œæ— éœ€ API å¯†é’¥ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/blockchain/solana` å®‰è£… |
| è·¯å¾„ | `optional-skills/blockchain/solana` |
| ç‰ˆæœ¬ | `0.2.0` |
| ä½œè€… | Deniz Alagoz (gizdusum)ï¼Œç”± Zed Agent å¢žå¼º |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Solana`, `Blockchain`, `Crypto`, `Web3`, `RPC`, `DeFi`, `NFT` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Solana åŒºå—é“¾ Skill

é€šè¿‡ CoinGecko æŸ¥è¯¢é™„å¸¦ USD å®šä»·çš„ Solana é“¾ä¸Šæ•°æ®ã€‚
8 ä¸ªå‘½ä»¤ï¼šé’±åŒ…æŠ•èµ„ç»„åˆã€ä»£å¸ä¿¡æ¯ã€äº¤æ˜“è®°å½•ã€æ´»åŠ¨è®°å½•ã€NFTã€
å·¨é²¸æ£€æµ‹ã€ç½‘ç»œçŠ¶æ€åŠä»·æ ¼æŸ¥è¯¢ã€‚

æ— éœ€ API å¯†é’¥ã€‚ä»…ä½¿ç”¨ Python æ ‡å‡†åº“ï¼ˆurllibã€jsonã€argparseï¼‰ã€‚

---

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·æŸ¥è¯¢ Solana é’±åŒ…ä½™é¢ã€ä»£å¸æŒä»“æˆ–æŠ•èµ„ç»„åˆä»·å€¼
- ç”¨æˆ·æƒ³é€šè¿‡ç­¾åæŸ¥çœ‹æŸç¬”å…·ä½“äº¤æ˜“
- ç”¨æˆ·æƒ³èŽ·å– SPL ä»£å¸å…ƒæ•°æ®ã€ä»·æ ¼ã€ä¾›åº”é‡æˆ–æŒä»“å¤§æˆ·
- ç”¨æˆ·æƒ³æŸ¥çœ‹æŸåœ°å€çš„è¿‘æœŸäº¤æ˜“åŽ†å²
- ç”¨æˆ·æƒ³æŸ¥çœ‹æŸé’±åŒ…æŒæœ‰çš„ NFT
- ç”¨æˆ·æƒ³æŸ¥æ‰¾å¤§é¢ SOL è½¬è´¦ï¼ˆå·¨é²¸æ£€æµ‹ï¼‰
- ç”¨æˆ·æƒ³äº†è§£ Solana ç½‘ç»œå¥åº·çŠ¶æ€ã€TPSã€epoch æˆ– SOL ä»·æ ¼
- ç”¨æˆ·è¯¢é—®"BONK/JUP/SOL çš„ä»·æ ¼æ˜¯å¤šå°‘ï¼Ÿ"

---

## å‰ç½®æ¡ä»¶

è¾…åŠ©è„šæœ¬ä»…ä½¿ç”¨ Python æ ‡å‡†åº“ï¼ˆurllibã€jsonã€argparseï¼‰ï¼Œæ— éœ€å¤–éƒ¨åŒ…ã€‚

ä»·æ ¼æ•°æ®æ¥è‡ª CoinGecko å…è´¹ APIï¼ˆæ— éœ€å¯†é’¥ï¼Œé€ŸçŽ‡é™åˆ¶çº¦ä¸ºæ¯åˆ†é’Ÿ 10-30 æ¬¡è¯·æ±‚ï¼‰ã€‚å¦‚éœ€æ›´å¿«æŸ¥è¯¢ï¼Œè¯·ä½¿ç”¨ `--no-prices` æ ‡å¿—ã€‚

---

## å¿«é€Ÿå‚è€ƒ

RPC ç«¯ç‚¹ï¼ˆé»˜è®¤ï¼‰ï¼šhttps://api.mainnet-beta.solana.com
è¦†ç›–æ–¹å¼ï¼šexport SOLANA_RPC_URL=https://your-private-rpc.com

è¾…åŠ©è„šæœ¬è·¯å¾„ï¼š~/.zed/skills/blockchain/solana/scripts/solana_client.py

```
python3 solana_client.py wallet   <address> [--limit N] [--all] [--no-prices]
python3 solana_client.py tx       <signature>
python3 solana_client.py token    <mint_address>
python3 solana_client.py activity <address> [--limit N]
python3 solana_client.py nft      <address>
python3 solana_client.py whales   [--min-sol N]
python3 solana_client.py stats
python3 solana_client.py price    <mint_or_symbol>
```

---

## æ“ä½œæ­¥éª¤

### 0. çŽ¯å¢ƒæ£€æŸ¥

```bash
python3 --version

# å¯é€‰ï¼šè®¾ç½®ç§æœ‰ RPC ä»¥èŽ·å¾—æ›´å¥½çš„é€ŸçŽ‡é™åˆ¶
export SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"

# ç¡®è®¤è¿žé€šæ€§
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py stats
```

### 1. é’±åŒ…æŠ•èµ„ç»„åˆ

èŽ·å– SOL ä½™é¢ã€å¸¦ USD ä»·å€¼çš„ SPL ä»£å¸æŒä»“ã€NFT æ•°é‡åŠæŠ•èµ„ç»„åˆæ€»å€¼ã€‚ä»£å¸æŒ‰ä»·å€¼æŽ’åºï¼Œè¿‡æ»¤ç²‰å°˜ï¼ˆdustï¼‰ï¼Œå·²çŸ¥ä»£å¸æŒ‰åç§°æ ‡æ³¨ï¼ˆBONKã€JUPã€USDC ç­‰ï¼‰ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py \
  wallet 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
```

æ ‡å¿—è¯´æ˜Žï¼š
- `--limit N` â€” æ˜¾ç¤ºå‰ N ä¸ªä»£å¸ï¼ˆé»˜è®¤ï¼š20ï¼‰
- `--all` â€” æ˜¾ç¤ºæ‰€æœ‰ä»£å¸ï¼Œä¸è¿‡æ»¤ç²‰å°˜ï¼Œä¸é™æ•°é‡
- `--no-prices` â€” è·³è¿‡ CoinGecko ä»·æ ¼æŸ¥è¯¢ï¼ˆæ›´å¿«ï¼Œä»… RPCï¼‰

è¾“å‡ºå†…å®¹ï¼šSOL ä½™é¢ + USD ä»·å€¼ã€æŒ‰ä»·å€¼æŽ’åºçš„ä»£å¸åˆ—è¡¨åŠä»·æ ¼ã€ç²‰å°˜æ•°é‡ã€NFT æ‘˜è¦ã€USD æŠ•èµ„ç»„åˆæ€»å€¼ã€‚

### 2. äº¤æ˜“è¯¦æƒ…

é€šè¿‡ base58 ç­¾åæŸ¥çœ‹å®Œæ•´äº¤æ˜“ä¿¡æ¯ï¼Œæ˜¾ç¤º SOL å’Œ USD çš„ä½™é¢å˜åŒ–ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py \
  tx 5j7s8K...your_signature_here
```

è¾“å‡ºå†…å®¹ï¼šslotã€æ—¶é—´æˆ³ã€æ‰‹ç»­è´¹ã€çŠ¶æ€ã€ä½™é¢å˜åŒ–ï¼ˆSOL + USDï¼‰ã€ç¨‹åºè°ƒç”¨ã€‚

### 3. ä»£å¸ä¿¡æ¯

èŽ·å– SPL ä»£å¸å…ƒæ•°æ®ã€å½“å‰ä»·æ ¼ã€å¸‚å€¼ã€ä¾›åº”é‡ã€ç²¾åº¦ã€é“¸é€ /å†»ç»“æƒé™åŠå‰ 5 å¤§æŒä»“åœ°å€ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py \
  token DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
```

è¾“å‡ºå†…å®¹ï¼šåç§°ã€ç¬¦å·ã€ç²¾åº¦ã€ä¾›åº”é‡ã€ä»·æ ¼ã€å¸‚å€¼ã€å‰ 5 å¤§æŒä»“åœ°å€åŠå æ¯”ã€‚

### 4. è¿‘æœŸæ´»åŠ¨

åˆ—å‡ºæŸåœ°å€çš„è¿‘æœŸäº¤æ˜“ï¼ˆé»˜è®¤ï¼šæœ€è¿‘ 10 æ¡ï¼Œæœ€å¤šï¼š25 æ¡ï¼‰ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py \
  activity 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM --limit 25
```

### 5. NFT æŠ•èµ„ç»„åˆ

åˆ—å‡ºæŸé’±åŒ…æŒæœ‰çš„ NFTï¼ˆå¯å‘å¼åˆ¤æ–­ï¼šamount=1 ä¸” decimals=0 çš„ SPL ä»£å¸ï¼‰ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py \
  nft 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
```

æ³¨æ„ï¼šæ­¤å¯å‘å¼æ–¹æ³•æ— æ³•æ£€æµ‹åŽ‹ç¼© NFTï¼ˆcNFTï¼‰ã€‚

### 6. å·¨é²¸æ£€æµ‹å™¨

æ‰«ææœ€æ–°åŒºå—ä¸­çš„å¤§é¢ SOL è½¬è´¦åŠå…¶ USD ä»·å€¼ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py \
  whales --min-sol 500
```

æ³¨æ„ï¼šä»…æ‰«ææœ€æ–°åŒºå—â€”â€”ä¸ºæ—¶é—´ç‚¹å¿«ç…§ï¼ŒéžåŽ†å²æ•°æ®ã€‚

### 7. ç½‘ç»œçŠ¶æ€

å®žæ—¶ Solana ç½‘ç»œå¥åº·çŠ¶æ€ï¼šå½“å‰ slotã€epochã€TPSã€ä¾›åº”é‡ã€éªŒè¯è€…ç‰ˆæœ¬ã€SOL ä»·æ ¼åŠå¸‚å€¼ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py stats
```

### 8. ä»·æ ¼æŸ¥è¯¢

é€šè¿‡é“¸é€ åœ°å€æˆ–å·²çŸ¥ç¬¦å·å¿«é€ŸæŸ¥è¯¢ä»»æ„ä»£å¸ä»·æ ¼ã€‚

```bash
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py price BONK
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py price JUP
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py price SOL
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py price DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
```

å·²çŸ¥ç¬¦å·ï¼šSOLã€USDCã€USDTã€BONKã€JUPã€WETHã€JTOã€mSOLã€stSOLã€
PYTHã€HNTã€RNDRã€WENã€Wã€TNSRã€DRIFTã€bSOLã€JLPã€WIFã€MEWã€BOMEã€PENGUã€‚

---

## æ³¨æ„äº‹é¡¹

- **CoinGecko é€ŸçŽ‡é™åˆ¶** â€” å…è´¹å¥—é¤çº¦æ¯åˆ†é’Ÿ 10-30 æ¬¡è¯·æ±‚ã€‚ä»·æ ¼æŸ¥è¯¢æ¯ä¸ªä»£å¸æ¶ˆè€— 1 æ¬¡è¯·æ±‚ã€‚æŒæœ‰å¤§é‡ä»£å¸çš„é’±åŒ…å¯èƒ½æ— æ³•èŽ·å–æ‰€æœ‰ä»£å¸ä»·æ ¼ã€‚å¦‚éœ€æé€Ÿï¼Œè¯·ä½¿ç”¨ `--no-prices`ã€‚
- **å…¬å…± RPC é€ŸçŽ‡é™åˆ¶** â€” Solana ä¸»ç½‘å…¬å…± RPC å¯¹è¯·æ±‚æœ‰é™åˆ¶ã€‚ç”Ÿäº§çŽ¯å¢ƒè¯·å°† SOLANA_RPC_URL è®¾ç½®ä¸ºç§æœ‰ç«¯ç‚¹ï¼ˆHeliusã€QuickNodeã€Tritonï¼‰ã€‚
- **NFT æ£€æµ‹ä¸ºå¯å‘å¼** â€” amount=1 ä¸” decimals=0ã€‚åŽ‹ç¼© NFTï¼ˆcNFTï¼‰å’Œ Token-2022 NFT ä¸ä¼šå‡ºçŽ°ã€‚
- **å·¨é²¸æ£€æµ‹å™¨ä»…æ‰«ææœ€æ–°åŒºå—** â€” éžåŽ†å²æ•°æ®ï¼Œç»“æžœå› æŸ¥è¯¢æ—¶åˆ»è€Œå¼‚ã€‚
- **äº¤æ˜“åŽ†å²** â€” å…¬å…± RPC ä¿ç•™çº¦ 2 å¤©çš„æ•°æ®ï¼Œè¾ƒæ—§çš„äº¤æ˜“å¯èƒ½ä¸å¯ç”¨ã€‚
- **ä»£å¸åç§°** â€” çº¦ 25 ä¸ªçŸ¥åä»£å¸æŒ‰åç§°æ ‡æ³¨ï¼Œå…¶ä»–ä»£å¸æ˜¾ç¤ºç¼©å†™é“¸é€ åœ°å€ã€‚å¦‚éœ€å®Œæ•´ä¿¡æ¯ï¼Œè¯·ä½¿ç”¨ `token` å‘½ä»¤ã€‚
- **429 é‡è¯•** â€” RPC å’Œ CoinGecko è°ƒç”¨åœ¨é‡åˆ°é€ŸçŽ‡é™åˆ¶é”™è¯¯æ—¶å‡ä¼šä»¥æŒ‡æ•°é€€é¿æ–¹å¼æœ€å¤šé‡è¯• 2 æ¬¡ã€‚

---

## éªŒè¯

```bash
# åº”è¾“å‡ºå½“å‰ Solana slotã€TPS åŠ SOL ä»·æ ¼
python3 ~/.zed/skills/blockchain/solana/scripts/solana_client.py stats
```
