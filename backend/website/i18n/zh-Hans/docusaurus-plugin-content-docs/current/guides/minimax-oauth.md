---
sidebar_position: 15
title: "MiniMax OAuth"
description: "é€šè¿‡æµè§ˆå™¨ OAuth ç™»å½• MiniMaxï¼Œåœ¨ Zed Agent ä¸­ä½¿ç”¨ MiniMax-M2.7 æ¨¡åž‹â€”â€”æ— éœ€ API å¯†é’¥"
---

# MiniMax OAuth

Zed Agent é€šè¿‡åŸºäºŽæµè§ˆå™¨çš„ OAuth ç™»å½•æµç¨‹æ”¯æŒ **MiniMax**ï¼Œä½¿ç”¨ä¸Ž [MiniMax é—¨æˆ·](https://www.minimax.io) ç›¸åŒçš„å‡­æ®ã€‚æ— éœ€ API å¯†é’¥æˆ–ä¿¡ç”¨å¡â€”â€”ç™»å½•ä¸€æ¬¡ï¼ŒZed å³å¯è‡ªåŠ¨åˆ·æ–°æ‚¨çš„ä¼šè¯ã€‚

è¯¥ä¼ è¾“å±‚å¤ç”¨äº† `anthropic_messages` é€‚é…å™¨ï¼ˆMiniMax åœ¨ `/anthropic` è·¯å¾„æš´éœ²äº†ä¸€ä¸ªå…¼å®¹ Anthropic Messages çš„ç«¯ç‚¹ï¼‰ï¼Œå› æ­¤æ‰€æœ‰çŽ°æœ‰çš„å·¥å…·è°ƒç”¨ã€æµå¼ä¼ è¾“å’Œä¸Šä¸‹æ–‡åŠŸèƒ½æ— éœ€ä»»ä½•é€‚é…å™¨æ”¹åŠ¨å³å¯æ­£å¸¸ä½¿ç”¨ã€‚

## æ¦‚è§ˆ

| é¡¹ç›® | å€¼ |
|------|-------|
| Provider ID | `minimax-oauth` |
| æ˜¾ç¤ºåç§° | MiniMax (OAuth) |
| è®¤è¯ç±»åž‹ | æµè§ˆå™¨ OAuthï¼ˆPKCE è®¾å¤‡ç æµç¨‹ï¼‰ |
| ä¼ è¾“å±‚ | å…¼å®¹ Anthropic Messagesï¼ˆ`anthropic_messages`ï¼‰ |
| æ¨¡åž‹ | `MiniMax-M2.7`ã€`MiniMax-M2.7-highspeed` |
| å…¨çƒç«¯ç‚¹ | `https://api.minimax.io/anthropic` |
| ä¸­å›½ç«¯ç‚¹ | `https://api.minimaxi.com/anthropic` |
| éœ€è¦çŽ¯å¢ƒå˜é‡ | å¦ï¼ˆ`MINIMAX_API_KEY` **ä¸**ç”¨äºŽæ­¤ providerï¼‰ |

## å‰ææ¡ä»¶

- Python 3.9+
- å·²å®‰è£… Zed Agent
- åœ¨ [minimax.io](https://www.minimax.io)ï¼ˆå…¨çƒï¼‰æˆ– [minimaxi.com](https://www.minimaxi.com)ï¼ˆä¸­å›½ï¼‰æ³¨å†Œçš„ MiniMax è´¦æˆ·
- æœ¬åœ°æœºå™¨ä¸Šå¯ç”¨çš„æµè§ˆå™¨ï¼ˆè¿œç¨‹ä¼šè¯è¯·ä½¿ç”¨ `--no-browser`ï¼‰

## å¿«é€Ÿå¼€å§‹

```bash
# å¯åŠ¨ provider å’Œæ¨¡åž‹é€‰æ‹©å™¨
zed model
# â†’ ä»Ž provider åˆ—è¡¨ä¸­é€‰æ‹© "MiniMax (OAuth)"
# â†’ Zed åœ¨æµè§ˆå™¨ä¸­æ‰“å¼€ MiniMax æŽˆæƒé¡µé¢
# â†’ åœ¨æµè§ˆå™¨ä¸­æ‰¹å‡†è®¿é—®
# â†’ é€‰æ‹©æ¨¡åž‹ï¼ˆMiniMax-M2.7 æˆ– MiniMax-M2.7-highspeedï¼‰
# â†’ å¼€å§‹å¯¹è¯

zed
```

é¦–æ¬¡ç™»å½•åŽï¼Œå‡­æ®å°†å­˜å‚¨åœ¨ `~/.zed/auth.json` ä¸‹ï¼Œå¹¶åœ¨æ¯æ¬¡ä¼šè¯å‰è‡ªåŠ¨åˆ·æ–°ã€‚

## æ‰‹åŠ¨ç™»å½•

æ‚¨å¯ä»¥åœ¨ä¸ç»è¿‡æ¨¡åž‹é€‰æ‹©å™¨çš„æƒ…å†µä¸‹è§¦å‘ç™»å½•ï¼š

```bash
zed auth add minimax-oauth
```

### ä¸­å›½åŒºåŸŸ

å¦‚æžœæ‚¨çš„è´¦æˆ·åœ¨ä¸­å›½å¹³å°ï¼ˆ`minimaxi.com`ï¼‰ï¼Œè¯·æ”¹ç”¨ä¸­å›½åŒºåŸŸ OAuth provider id `minimax-cn`ï¼Œæˆ–è·³è¿‡ OAuth ç›´æŽ¥é…ç½® `MINIMAX_CN_API_KEY` / `MINIMAX_CN_BASE_URL`ã€‚æ—§ç‰ˆæ–‡æ¡£ä¸­æè¿°çš„ `--region cn` æ ‡å¿—**æœª**æŽ¥å…¥ CLI çš„å‚æ•°è§£æžå™¨ï¼›è¯·æ”¹ç”¨ `minimax-cn` providerï¼š

```bash
zed auth add minimax-cn --type oauth   # å¦‚æžœæ‚¨çš„ä¸­å›½è´¦æˆ·æ”¯æŒ OAuth
# æˆ–æ›´ç®€å•çš„æ–¹å¼ï¼š
echo 'MINIMAX_CN_API_KEY=your-key' >> ~/.zed/.env
```

### è¿œç¨‹/æ— å¤´ä¼šè¯

åœ¨æ²¡æœ‰æµè§ˆå™¨çš„æœåŠ¡å™¨æˆ–å®¹å™¨ä¸Šï¼š

```bash
zed auth add minimax-oauth --no-browser
```

Zed å°†æ‰“å°éªŒè¯ URL å’Œç”¨æˆ·ç â€”â€”åœ¨ä»»æ„è®¾å¤‡ä¸Šæ‰“å¼€è¯¥ URLï¼Œå¹¶åœ¨æç¤ºæ—¶è¾“å…¥ç”¨æˆ·ç ã€‚

## OAuth æµç¨‹

Zed é’ˆå¯¹ MiniMax OAuth ç«¯ç‚¹å®žçŽ°äº† PKCE è®¾å¤‡ç æµç¨‹ï¼š

1. Zed ç”Ÿæˆ PKCE verifier/challenge å¯¹å’Œä¸€ä¸ªéšæœº state å€¼ã€‚
2. æºå¸¦ challenge å‘ `{base_url}/oauth/code` å‘é€ POST è¯·æ±‚ï¼ŒèŽ·å– `user_code` å’Œ `verification_uri`ã€‚
3. æµè§ˆå™¨æ‰“å¼€ `verification_uri`ã€‚å¦‚æœ‰æç¤ºï¼Œè¾“å…¥ `user_code`ã€‚
4. Zed è½®è¯¢ `{base_url}/oauth/token`ï¼Œç›´åˆ°ä»¤ç‰Œåˆ°è¾¾ï¼ˆæˆ–è¶…è¿‡æˆªæ­¢æ—¶é—´ï¼‰ã€‚
5. ä»¤ç‰Œï¼ˆ`access_token`ã€`refresh_token`ã€è¿‡æœŸæ—¶é—´ï¼‰ä»¥ `minimax-oauth` ä¸ºé”®ä¿å­˜åˆ° `~/.zed/auth.json`ã€‚

ä»¤ç‰Œåˆ·æ–°ï¼ˆæ ‡å‡† OAuth `refresh_token` æŽˆæƒï¼‰åœ¨æ¯æ¬¡ä¼šè¯å¯åŠ¨æ—¶è‡ªåŠ¨æ‰§è¡Œï¼Œå½“ access token è·è¿‡æœŸä¸è¶³ 60 ç§’æ—¶è§¦å‘ã€‚

## æ£€æŸ¥ç™»å½•çŠ¶æ€

```bash
zed doctor
```

`â—† Auth Providers` éƒ¨åˆ†å°†æ˜¾ç¤ºï¼š

```
âœ“ MiniMax OAuth  (logged in, region=global)
```

æˆ–è€…ï¼Œå¦‚æžœæœªç™»å½•ï¼š

```
âš  MiniMax OAuth  (not logged in)
```

## åˆ‡æ¢æ¨¡åž‹

```bash
zed model
# â†’ é€‰æ‹© "MiniMax (OAuth)"
# â†’ ä»Žæ¨¡åž‹åˆ—è¡¨ä¸­é€‰æ‹©
```

æˆ–ç›´æŽ¥è®¾ç½®æ¨¡åž‹ï¼š

```bash
zed config set model MiniMax-M2.7
zed config set provider minimax-oauth
```

## é…ç½®å‚è€ƒ

ç™»å½•åŽï¼Œ`~/.zed/config.yaml` å°†åŒ…å«ç±»ä¼¼å¦‚ä¸‹çš„æ¡ç›®ï¼š

```yaml
model:
  default: MiniMax-M2.7
  provider: minimax-oauth
  base_url: https://api.minimax.io/anthropic
```

### åŒºåŸŸç«¯ç‚¹

| Provider id | é—¨æˆ· | æŽ¨ç†ç«¯ç‚¹ |
|-------------|--------|-------------------|
| `minimax-oauth`ï¼ˆå…¨çƒï¼‰ | `https://api.minimax.io` | `https://api.minimax.io/anthropic` |
| `minimax-cn`ï¼ˆä¸­å›½ï¼‰ | `https://api.minimaxi.com` | `https://api.minimaxi.com/anthropic` |

### Provider åˆ«å

ä»¥ä¸‹æ‰€æœ‰åˆ«åå‡è§£æžä¸º `minimax-oauth`ï¼š

```bash
zed --provider minimax-oauth    # è§„èŒƒåç§°
zed --provider minimax-portal   # åˆ«å
zed --provider minimax-global   # åˆ«å
zed --provider minimax_oauth    # åˆ«åï¼ˆä¸‹åˆ’çº¿å½¢å¼ï¼‰
```

## çŽ¯å¢ƒå˜é‡

`minimax-oauth` provider **ä¸**ä½¿ç”¨ `MINIMAX_API_KEY` æˆ– `MINIMAX_BASE_URL`ã€‚è¿™äº›å˜é‡ä»…ç”¨äºŽåŸºäºŽ API å¯†é’¥çš„ `minimax` å’Œ `minimax-cn` providerã€‚

| å˜é‡ | ä½œç”¨ |
|----------|--------|
| `MINIMAX_API_KEY` | ä»…ç”¨äºŽ `minimax` providerâ€”â€”å¯¹ `minimax-oauth` æ— æ•ˆ |
| `MINIMAX_CN_API_KEY` | ä»…ç”¨äºŽ `minimax-cn` providerâ€”â€”å¯¹ `minimax-oauth` æ— æ•ˆ |

è¦å°† `minimax-oauth` è®¾ä¸ºæ´»è·ƒ providerï¼Œè¯·åœ¨ `config.yaml` ä¸­è®¾ç½® `model.provider: minimax-oauth`ï¼ˆä½¿ç”¨ `zed setup` è¿›è¡Œå¼•å¯¼å¼é…ç½®ï¼‰ï¼Œæˆ–åœ¨å•æ¬¡è°ƒç”¨æ—¶ä¼ å…¥ `--provider minimax-oauth`ï¼š

```bash
zed --provider minimax-oauth
```

## æ¨¡åž‹

| æ¨¡åž‹ | æœ€é€‚åˆ |
|-------|----------|
| `MiniMax-M2.7` | é•¿ä¸Šä¸‹æ–‡æŽ¨ç†ã€å¤æ‚å·¥å…·è°ƒç”¨ |
| `MiniMax-M2.7-highspeed` | ä½Žå»¶è¿Ÿã€è½»é‡ä»»åŠ¡ã€è¾…åŠ©è°ƒç”¨ |

ä¸¤ä¸ªæ¨¡åž‹å‡æ”¯æŒæœ€å¤š 200,000 ä¸ª token çš„ä¸Šä¸‹æ–‡ã€‚

å½“ `minimax-oauth` ä¸ºä¸» provider æ—¶ï¼Œ`MiniMax-M2.7-highspeed` ä¹Ÿä¼šè‡ªåŠ¨ç”¨ä½œè§†è§‰å’Œå§”æ‰˜ä»»åŠ¡çš„è¾…åŠ©æ¨¡åž‹ã€‚

## æ•…éšœæŽ’æŸ¥

### ä»¤ç‰Œå·²è¿‡æœŸâ€”â€”æœªè‡ªåŠ¨é‡æ–°ç™»å½•

Zed åœ¨æ¯æ¬¡ä¼šè¯å¯åŠ¨æ—¶ï¼Œè‹¥ access token è·è¿‡æœŸä¸è¶³ 60 ç§’åˆ™åˆ·æ–°ä»¤ç‰Œã€‚å¦‚æžœ access token å·²ç»è¿‡æœŸï¼ˆä¾‹å¦‚é•¿æ—¶é—´ç¦»çº¿åŽï¼‰ï¼Œåˆ·æ–°å°†åœ¨ä¸‹ä¸€æ¬¡è¯·æ±‚æ—¶è‡ªåŠ¨è§¦å‘ã€‚å¦‚æžœåˆ·æ–°å¤±è´¥å¹¶è¿”å›ž `refresh_token_reused` æˆ– `invalid_grant`ï¼ŒZed ä¼šå°†ä¼šè¯æ ‡è®°ä¸ºéœ€è¦é‡æ–°ç™»å½•ã€‚

å½“åˆ·æ–°å¤±è´¥ä¸ºç»ˆæ€ï¼ˆHTTP 4xxã€`invalid_grant`ã€æŽˆæƒå·²æ’¤é”€ç­‰ï¼‰æ—¶ï¼ŒZed å°† refresh token æ ‡è®°ä¸ºå¤±æ•ˆå¹¶åœ¨æœ¬åœ°éš”ç¦»ï¼Œé¿å…æŒç»­é‡æ”¾æ³¨å®šå¤±è´¥çš„äº¤æ¢ã€‚Agent ä¼šæ˜¾ç¤ºä¸€æ¡"éœ€è¦é‡æ–°è®¤è¯"çš„æ¶ˆæ¯ï¼Œå¹¶åœ¨æ‚¨å†æ¬¡ç™»å½•ä¹‹å‰ä¿æŒç­‰å¾…ã€‚

**è§£å†³æ–¹æ³•ï¼š** å†æ¬¡è¿è¡Œ `zed auth add minimax-oauth` ä»¥å¼€å§‹å…¨æ–°ç™»å½•ã€‚ä¸‹ä¸€æ¬¡æˆåŠŸäº¤æ¢åŽéš”ç¦»çŠ¶æ€å°†è‡ªåŠ¨æ¸…é™¤ã€‚

### æŽˆæƒè¶…æ—¶

è®¾å¤‡ç æµç¨‹æœ‰æœ‰é™çš„è¿‡æœŸçª—å£ã€‚å¦‚æžœæ‚¨æœªåœ¨è§„å®šæ—¶é—´å†…æ‰¹å‡†ç™»å½•ï¼ŒZed å°†æŠ›å‡ºè¶…æ—¶é”™è¯¯ã€‚

**è§£å†³æ–¹æ³•ï¼š** é‡æ–°è¿è¡Œ `zed auth add minimax-oauth`ï¼ˆæˆ– `zed model`ï¼‰ã€‚æµç¨‹å°†é‡æ–°å¼€å§‹ã€‚

### State ä¸åŒ¹é…ï¼ˆå¯èƒ½çš„ CSRFï¼‰

Zed æ£€æµ‹åˆ°æŽˆæƒæœåŠ¡å™¨è¿”å›žçš„ `state` å€¼ä¸Žå…¶å‘é€çš„å€¼ä¸åŒ¹é…ã€‚

**è§£å†³æ–¹æ³•ï¼š** é‡æ–°è¿è¡Œç™»å½•ã€‚å¦‚æžœé—®é¢˜æŒç»­ï¼Œè¯·æ£€æŸ¥æ˜¯å¦æœ‰ä»£ç†æˆ–é‡å®šå‘æ­£åœ¨ä¿®æ”¹ OAuth å“åº”ã€‚

### ä»Žè¿œç¨‹æœåŠ¡å™¨ç™»å½•

å¦‚æžœ `zed` æ— æ³•æ‰“å¼€æµè§ˆå™¨çª—å£ï¼Œè¯·ä½¿ç”¨ `--no-browser`ï¼š

```bash
zed auth add minimax-oauth --no-browser
```

Zed å°†æ‰“å° URL å’Œç”¨æˆ·ç ã€‚åœ¨ä»»æ„è®¾å¤‡ä¸Šæ‰“å¼€è¯¥ URL å¹¶åœ¨é‚£é‡Œå®Œæˆæµç¨‹ã€‚

### è¿è¡Œæ—¶å‡ºçŽ°"æœªç™»å½• MiniMax OAuth"é”™è¯¯

auth å­˜å‚¨ä¸­æ²¡æœ‰ `minimax-oauth` çš„å‡­æ®ã€‚æ‚¨å°šæœªç™»å½•ï¼Œæˆ–å‡­æ®æ–‡ä»¶å·²è¢«åˆ é™¤ã€‚

**è§£å†³æ–¹æ³•ï¼š** è¿è¡Œ `zed model` å¹¶é€‰æ‹© MiniMax (OAuth)ï¼Œæˆ–è¿è¡Œ `zed auth add minimax-oauth`ã€‚

## é€€å‡ºç™»å½•

è¦ç§»é™¤å·²å­˜å‚¨çš„ MiniMax OAuth å‡­æ®ï¼š

```bash
zed auth remove minimax-oauth
```

## å¦è¯·å‚é˜…

- [AI Providers å‚è€ƒ](../integrations/providers.md)
- [çŽ¯å¢ƒå˜é‡](../reference/environment-variables.md)
- [é…ç½®](../user-guide/configuration.md)
- [zed doctor](../reference/cli-commands.md)
