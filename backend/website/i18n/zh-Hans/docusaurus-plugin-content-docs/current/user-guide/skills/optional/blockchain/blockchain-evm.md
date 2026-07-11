---
title: "Evm â€” åªè¯» EVM å®¢æˆ·ç«¯ï¼šè·¨ 8 æ¡é“¾çš„é’±åŒ…ã€ä»£å¸ã€Gas"
sidebar_label: "Evm"
description: "åªè¯» EVM å®¢æˆ·ç«¯ï¼šè·¨ 8 æ¡é“¾çš„é’±åŒ…ã€ä»£å¸ã€Gas"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Evm

åªè¯» EVM å®¢æˆ·ç«¯ï¼šè·¨ 8 æ¡é“¾çš„é’±åŒ…ã€ä»£å¸ã€Gasã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/blockchain/evm` å®‰è£… |
| è·¯å¾„ | `optional-skills/blockchain/evm` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Mibayy (@Mibayy), youssefea (@youssefea), ethernet8023 (@ethernet8023), Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `EVM`, `Ethereum`, `BNB`, `BSC`, `Base`, `Arbitrum`, `Polygon`, `Optimism`, `Avalanche`, `zkSync`, `Blockchain`, `Crypto`, `Web3`, `DeFi`, `NFT`, `ENS`, `Whale`, `Security` |
| ç›¸å…³ skill | [`solana`](/user-guide/skills/optional/blockchain/blockchain-solana) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# EVM Blockchain Skill

è·¨ 8 æ¡é“¾æŸ¥è¯¢ EVM å…¼å®¹åŒºå—é“¾æ•°æ®ï¼Œæ”¯æŒ USD å®šä»·ã€‚
14 ä¸ªå‘½ä»¤ï¼šé’±åŒ…æŠ•èµ„ç»„åˆã€ä»£å¸ä¿¡æ¯ã€äº¤æ˜“è®°å½•ã€æ´»åŠ¨åŽ†å²ã€Gas è¿½è¸ªå™¨ã€
ç½‘ç»œç»Ÿè®¡ã€ä»·æ ¼æŸ¥è¯¢ã€å¤šé“¾æ‰«æã€å·¨é²¸æ£€æµ‹ã€ENS è§£æžã€
æŽˆæƒæ£€æŸ¥å™¨ã€åˆçº¦æ£€æŸ¥å™¨å’Œäº¤æ˜“è§£ç å™¨ã€‚

æ”¯æŒ 8 æ¡é“¾ï¼šEthereumã€BNB Chain (BSC)ã€Baseã€Arbitrum Oneã€Polygonã€
Optimismã€Avalanche (C-Chain)ã€zkSync Eraã€‚

æ— éœ€ API å¯†é’¥ã€‚é›¶å¤–éƒ¨ä¾èµ– â€” ä»…ä½¿ç”¨ Python æ ‡å‡†åº“
ï¼ˆurllibã€jsonã€argparseã€threadingï¼‰ã€‚

> **å–ä»£ç‹¬ç«‹çš„ `base` skillã€‚** Base ä¸“å±žä»£å¸ï¼ˆAEROã€DEGENã€
> TOSHIã€BRETTã€WELLã€cbETHã€cbBTCã€wstETHã€rETHï¼‰ä»¥åŠåŽŸå…ˆä½äºŽ
> `optional-skills/blockchain/base/` ä¸‹çš„æ‰€æœ‰ Base RPC åŠŸèƒ½å·²æ•´åˆ
> è‡³æœ¬ skillã€‚å¯¹ä»»æ„å‘½ä»¤ä¼ å…¥ `--chain base` å³å¯è¦†ç›– Baseã€‚

---

## ä½¿ç”¨åœºæ™¯
- ç”¨æˆ·æŸ¥è¯¢ä»»æ„ EVM é“¾ä¸Šçš„é’±åŒ…ä½™é¢æˆ–æŠ•èµ„ç»„åˆ
- ç”¨æˆ·å¸Œæœ›åŒæ—¶æ£€æŸ¥åŒä¸€é’±åŒ…åœ¨æ‰€æœ‰é“¾ä¸Šçš„æƒ…å†µ
- ç”¨æˆ·æƒ³é€šè¿‡äº¤æ˜“å“ˆå¸Œæ£€æŸ¥æŸç¬”äº¤æ˜“ï¼ˆæˆ–è§£ç å…¶æ“ä½œå†…å®¹ï¼‰
- ç”¨æˆ·æƒ³æŸ¥è¯¢ ERC-20 ä»£å¸çš„å…ƒæ•°æ®ã€ä»·æ ¼ã€ä¾›åº”é‡æˆ–å¸‚å€¼
- ç”¨æˆ·æƒ³æŸ¥çœ‹æŸåœ°å€çš„è¿‘æœŸäº¤æ˜“åŽ†å²
- ç”¨æˆ·æƒ³æŸ¥è¯¢å½“å‰ Gas ä»·æ ¼æˆ–æ¯”è¾ƒå„é“¾æ‰‹ç»­è´¹
- ç”¨æˆ·æƒ³åœ¨è¿‘æœŸåŒºå—ä¸­æŸ¥æ‰¾å¤§é¢å·¨é²¸è½¬è´¦
- ç”¨æˆ·æƒ³è§£æž ENS åç§°ï¼ˆå¦‚ vitalik.ethï¼‰æˆ–åå‘æŸ¥è¯¢åœ°å€
- ç”¨æˆ·æƒ³æ£€æŸ¥åˆçº¦æ˜¯å¦å­˜åœ¨å±é™©çš„ä»£å¸æŽˆæƒ
- ç”¨æˆ·æƒ³æ£€æŸ¥æ™ºèƒ½åˆçº¦ï¼ˆæ˜¯å¦ä¸ºä»£ç†åˆçº¦ï¼ŸERC-20ï¼ŸERC-721ï¼Ÿå­—èŠ‚ç å¤§å°ï¼Ÿï¼‰
- ç”¨æˆ·æƒ³åœ¨äº¤æ˜“å‰æ¯”è¾ƒå„é“¾ Gas è´¹ç”¨

---

## å‰ç½®æ¡ä»¶
ä»…éœ€ Python 3.8+ æ ‡å‡†åº“ï¼Œæ— éœ€ pip å®‰è£…ã€‚
å®šä»·ï¼šCoinGecko å…è´¹ APIï¼ˆæœ‰é€ŸçŽ‡é™åˆ¶ï¼Œçº¦ 10-30 æ¬¡è¯·æ±‚/åˆ†é’Ÿï¼‰ã€‚
ENSï¼šensideas.com å…¬å…± APIã€‚
äº¤æ˜“è§£ç ï¼š4byte.directory å…¬å…± APIã€‚

è¦†ç›– RPC ç«¯ç‚¹ï¼š`export EVM_RPC_URL=https://your-rpc.com`

è¾…åŠ©è„šæœ¬è·¯å¾„ï¼š`~/.zed/skills/blockchain/evm/scripts/evm_client.py`

---

## å¿«é€Ÿå‚è€ƒ

```
SCRIPT=~/.zed/skills/blockchain/evm/scripts/evm_client.py

# ç½‘ç»œä¸Žä»·æ ¼
python3 $SCRIPT stats                            # Ethereum ç»Ÿè®¡
python3 $SCRIPT stats --chain arbitrum           # Arbitrum ç»Ÿè®¡
python3 $SCRIPT compare                          # å…¨éƒ¨ 8 æ¡é“¾çš„ Gas + ä»·æ ¼

# é’±åŒ…
python3 $SCRIPT wallet 0xd8dA...96045            # æŠ•èµ„ç»„åˆï¼ˆETH + ERC-20ï¼‰
python3 $SCRIPT wallet 0xd8dA...96045 --chain bsc
python3 $SCRIPT multichain 0xd8dA...96045        # åŒä¸€é’±åŒ…åœ¨æ‰€æœ‰é“¾ä¸Šçš„æƒ…å†µ

# ä»£å¸ä¸Žä»·æ ¼
python3 $SCRIPT price ETH
python3 $SCRIPT price 0xdAC1...1ec7              # é€šè¿‡åˆçº¦åœ°å€æŸ¥è¯¢
python3 $SCRIPT token 0xdAC1...1ec7              # ERC-20 å…ƒæ•°æ® + å¸‚å€¼

# äº¤æ˜“
python3 $SCRIPT tx 0x5c50...f060                 # äº¤æ˜“è¯¦æƒ…
python3 $SCRIPT decode 0x5c50...f060             # è§£ç è¾“å…¥æ•°æ®ï¼ˆ4byte.directoryï¼‰
python3 $SCRIPT activity 0xd8dA...96045          # è¿‘æœŸäº¤æ˜“

# Gas
python3 $SCRIPT gas                              # Gas ä»·æ ¼ + è´¹ç”¨ä¼°ç®—
python3 $SCRIPT gas --chain optimism

# å®‰å…¨
python3 $SCRIPT allowance 0xd8dA...96045         # å±é™©çš„ ERC-20 æŽˆæƒ
python3 $SCRIPT contract 0xdAC1...1ec7           # åˆçº¦æ£€æŸ¥ï¼ˆä»£ç†åˆçº¦ï¼Ÿæ ‡å‡†ï¼Ÿï¼‰

# ENS
python3 $SCRIPT ens vitalik.eth                  # åç§° -> åœ°å€ + ä¸ªäººèµ„æ–™
python3 $SCRIPT ens 0xd8dA...96045               # åœ°å€ -> ENS åç§°

# å·¨é²¸æ£€æµ‹
python3 $SCRIPT whale                            # å¤§é¢è½¬è´¦ï¼ˆæœ€è¿‘ 20 ä¸ªåŒºå—ï¼Œ>$10kï¼‰
python3 $SCRIPT whale --blocks 50 --min-usd 100000 --chain arbitrum
```

---

## æ“ä½œæµç¨‹

### 0. çŽ¯å¢ƒæ£€æŸ¥
```bash
python3 --version   # éœ€è¦ 3.8+
python3 ~/.zed/skills/blockchain/evm/scripts/evm_client.py stats
```

### 1. é’±åŒ…æŠ•èµ„ç»„åˆ
åŽŸç”Ÿä½™é¢ + å·²çŸ¥ ERC-20 ä»£å¸ï¼ŒæŒ‰ USD ä»·å€¼æŽ’åºã€‚
```bash
python3 $SCRIPT wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
python3 $SCRIPT wallet 0xd8dA... --chain bsc --no-prices   # æ›´å¿«
```

### 2. å¤šé“¾æ‰«æ
ä½¿ç”¨å¤šçº¿ç¨‹åŒæ—¶æ‰«æåŒä¸€åœ°å€åœ¨å…¨éƒ¨ 8 æ¡é“¾ä¸Šçš„æƒ…å†µã€‚
```bash
python3 $SCRIPT multichain 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```
è¾“å‡ºï¼šæ¯æ¡é“¾çš„åŽŸç”Ÿä½™é¢ + ä»£å¸æŒä»“ + USD æ€»è®¡ã€‚

### 3. æ¯”è¾ƒï¼ˆGas + ä»·æ ¼ï¼‰
å¹¶è¡ŒæŸ¥è¯¢å…¨éƒ¨ 8 æ¡é“¾ï¼Œæ˜¾ç¤ºæœ€ä¾¿å®œ/æœ€è´µçš„é“¾ã€‚
```bash
python3 $SCRIPT compare
```

### 4. äº¤æ˜“è¯¦æƒ…ä¸Žè§£ç 
```bash
python3 $SCRIPT tx 0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060
python3 $SCRIPT decode 0x5c504ed...   # æ˜¾ç¤ºäººç±»å¯è¯»çš„å‡½æ•°ç­¾å
```
è§£ç ä½¿ç”¨ 4byte.directory å°† 0xa9059cbb è½¬æ¢ä¸º transfer(address,uint256)ã€‚

### 5. ENS è§£æž
```bash
python3 $SCRIPT ens vitalik.eth          # -> 0xd8dA... + å¤´åƒ + ç¤¾äº¤é“¾æŽ¥
python3 $SCRIPT ens 0xd8dA...96045       # -> vitalik.eth
```

### 6. æŽˆæƒæ£€æŸ¥å™¨ï¼ˆå®‰å…¨ï¼‰
æ£€æŸ¥å·²æŽˆäºˆå·²çŸ¥ DEX/è·¨é“¾æ¡¥åˆçº¦çš„ ERC-20 æŽˆæƒã€‚
```bash
python3 $SCRIPT allowance 0xYourWallet
```
å°†æ— é™é¢æŽˆæƒæ ‡è®°ä¸ºé«˜é£Žé™©ã€‚

### 7. åˆçº¦æ£€æŸ¥å™¨
```bash
python3 $SCRIPT contract 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48   # USDCï¼ˆä»£ç†åˆçº¦ï¼‰
python3 $SCRIPT contract 0xdAC17F958D2ee523a2206206994597C13D831ec7   # USDTï¼ˆERC-20ï¼‰
```
æ£€æµ‹ï¼šä»£ç†åˆçº¦ï¼ˆEIP-1967/EIP-1167ï¼‰ã€ERC-20ã€ERC-721ã€ERC-165ã€‚æ˜¾ç¤ºå­—èŠ‚ç å¤§å°åŠä»£ç†åˆçº¦çš„å®žçŽ°åœ°å€ã€‚

### 8. å·¨é²¸æ£€æµ‹
```bash
python3 $SCRIPT whale                                    # ETHï¼Œæœ€è¿‘ 20 ä¸ªåŒºå—ï¼Œ>$10k
python3 $SCRIPT whale --blocks 50 --min-usd 50000 --chain bsc
```

### 9. Gas è¿½è¸ªå™¨
```bash
python3 $SCRIPT gas
python3 $SCRIPT gas --chain polygon
```
æ˜¾ç¤º gwei ä»·æ ¼ + ä»¥ä¸‹æ“ä½œçš„ USD è´¹ç”¨ï¼šè½¬è´¦ã€ERC-20 è½¬è´¦ã€æŽˆæƒã€å…‘æ¢ã€NFT é“¸é€ ã€NFT è½¬è´¦ã€‚

---

## æ”¯æŒçš„é“¾
| é”®        | åç§°           | åŽŸç”Ÿä»£å¸ | Chain ID |
|-----------|----------------|--------|----------|
| ethereum  | Ethereum       | ETH    | 1        |
| bsc       | BNB Chain      | BNB    | 56       |
| base      | Base           | ETH    | 8453     |
| arbitrum  | Arbitrum One   | ETH    | 42161    |
| polygon   | Polygon        | POL    | 137      |
| optimism  | Optimism       | ETH    | 10       |
| avalanche | Avalanche C    | AVAX   | 43114    |
| zksync    | zkSync Era     | ETH    | 324      |

---

## æ³¨æ„äº‹é¡¹
- CoinGecko å…è´¹å¥—é¤ï¼šçº¦ 10-30 æ¬¡è¯·æ±‚/åˆ†é’Ÿã€‚ä½¿ç”¨ `--no-prices` å¯åŠ å¿«é’±åŒ…æ‰«æé€Ÿåº¦ã€‚
- å…¬å…± RPC å¯èƒ½é™é€Ÿã€‚ç”Ÿäº§çŽ¯å¢ƒè¯·å°† EVM_RPC_URL è®¾ç½®ä¸ºç§æœ‰ç«¯ç‚¹ã€‚
- `wallet` å’Œ `allowance` ä»…æ£€æŸ¥å·²çŸ¥ä»£å¸åˆ—è¡¨ï¼ˆæ¯æ¡é“¾çº¦ 30 ä¸ªä»£å¸ï¼‰ã€‚å¦‚éœ€å®Œæ•´ä»£å¸å‘çŽ°ï¼Œè¯·ä½¿ç”¨åŒºå—æµè§ˆå™¨ã€‚
- `activity` ä»…æ‰«æè¿‘æœŸåŒºå—ï¼ˆæœ€å¤š 200 ä¸ªï¼‰ã€‚å¦‚éœ€å®Œæ•´åŽ†å²è®°å½•ï¼Œè¯·ä½¿ç”¨ Etherscan APIã€‚
- `multichain` è¿è¡Œ 8 ä¸ªå¹¶è¡Œçº¿ç¨‹ â€” å¯èƒ½è§¦å‘å…¬å…± RPC çš„é€ŸçŽ‡é™åˆ¶ã€‚
- ENS è§£æžä¾èµ–å•ä¸€å…¬å…±ç«¯ç‚¹ï¼ˆensideas.com / ens.vitalik.caï¼‰ï¼Œæ— å¤‡ç”¨æ–¹æ¡ˆã€‚è‹¥è¯¥ç«¯ç‚¹ä¸å¯ç”¨ï¼Œ`ens` å‘½ä»¤å°†å¤±è´¥ â€” ç¨åŽé‡è¯•æˆ–ä½¿ç”¨åŒºå—æµè§ˆå™¨ã€‚
- äº¤æ˜“è§£ç ä¾èµ–å•ä¸€å…¬å…±ç«¯ç‚¹ï¼ˆ4byte.directoryï¼‰ï¼Œæ— å¤‡ç”¨æ–¹æ¡ˆã€‚æ•°æ®åº“ä¸­æœªæ”¶å½•çš„é€‰æ‹©å™¨å°†æ˜¾ç¤ºä¸º `unknown`ã€‚
- **L2 Gas ä¼°ç®—ä»…ä¸º L2 æ‰§è¡Œè´¹ç”¨ã€‚** åœ¨ Baseã€Arbitrumã€Optimismã€zkSync ç­‰ rollup ä¸Šï¼Œå®žé™…äº¤æ˜“è´¹ç”¨è¿˜åŒ…å«å–å†³äºŽ calldata å¤§å°å’Œå½“å‰ L1 Gas ä»·æ ¼çš„ L1 æ•°æ®å‘å¸ƒè´¹ç”¨ã€‚`gas` å‘½ä»¤ä¸ä¼°ç®—è¯¥ L1 éƒ¨åˆ†ã€‚å¯¹äºŽ Baseï¼Œè¯·å‚é˜…ç½‘ç»œçš„ L1 è´¹ç”¨é¢„è¨€æœºï¼ˆåˆçº¦ `0x420000000000000000000000000000000000000F`ï¼‰ã€‚
- åœ°å€/äº¤æ˜“å“ˆå¸Œè¾“å…¥ä¼šéªŒè¯ 0x å‰ç¼€ + æ­£ç¡®é•¿åº¦ + åå…­è¿›åˆ¶æ ¼å¼ï¼Œä½†**ä¸**å¼ºåˆ¶æ‰§è¡Œ EIP-55 æ ¡éªŒå’Œå¤§å°å†™ï¼ˆRPC ç«¯ç‚¹æŽ¥å—ä»»æ„å¤§å°å†™çš„åå…­è¿›åˆ¶ï¼‰ã€‚

---

## éªŒè¯
```bash
# åº”è¾“å‡ºå½“å‰åŒºå—ã€Gas ä»·æ ¼ã€ETH ä»·æ ¼
python3 ~/.zed/skills/blockchain/evm/scripts/evm_client.py stats

# åº”å°† vitalik.eth è§£æžä¸º 0xd8dA...
python3 ~/.zed/skills/blockchain/evm/scripts/evm_client.py ens vitalik.eth
```
