---
sidebar_position: 1
title: "é€šè¿‡ Zed Portal è¿è¡Œ Zed Agent"
description: "å®Œæ•´æ“ä½œæŒ‡å—ï¼šè®¢é˜…ã€é…ç½®ã€åˆ‡æ¢æ¨¡åž‹ã€å¯ç”¨ gateway å·¥å…·å¹¶éªŒè¯è·¯ç”±"
---

# é€šè¿‡ Zed Portal è¿è¡Œ Zed Agent

æœ¬æŒ‡å—å¸¦ä½ ä»Žå¤´åˆ°å°¾å®Œæˆåœ¨ [Zed Portal](https://portal.zedteam.com) è®¢é˜…ä¸‹è¿è¡Œ Zed Agent çš„å…¨è¿‡ç¨‹â€”â€”ä»Žæ³¨å†Œè´¦å·åˆ°éªŒè¯æ¯ä¸ªå·¥å…·çš„è·¯ç”±æ˜¯å¦æ­£ç¡®ã€‚å¦‚æžœä½ åªæƒ³äº†è§£ Portal çš„æ¦‚è¿°åŠè®¢é˜…å†…å®¹ï¼Œè¯·å‚é˜… [Zed Portal é›†æˆé¡µé¢](/integrations/nous-portal)ã€‚æœ¬é¡µæ˜¯æ“ä½œæ­¥éª¤è„šæœ¬ã€‚

## å‰ææ¡ä»¶

- å·²å®‰è£… Zed Agentï¼ˆ[å¿«é€Ÿå…¥é—¨](/getting-started/quickstart)ï¼‰
- åœ¨ä½ æ­£åœ¨é…ç½®çš„æœºå™¨ä¸Šæœ‰å¯ç”¨çš„æµè§ˆå™¨ï¼ˆæˆ– SSH ç«¯å£è½¬å‘â€”â€”å‚è§ [OAuth over SSH](/guides/oauth-over-ssh)ï¼‰
- çº¦ 5 åˆ†é’Ÿæ—¶é—´

ä½ **ä¸éœ€è¦**ï¼šOpenAI å¯†é’¥ã€Anthropic å¯†é’¥ã€Firecrawl è´¦å·ã€FAL è´¦å·ã€Browser Use è´¦å·ï¼Œæˆ–ä»»ä½•å…¶ä»–æŒ‰ä¾›åº”å•†åˆ†é…çš„å‡­è¯ã€‚è¿™æ­£æ˜¯ Portal çš„æ„ä¹‰æ‰€åœ¨ã€‚

## 1. èŽ·å–è®¢é˜…

æ‰“å¼€ [portal.zedteam.com/manage-subscription](https://portal.zedteam.com/manage-subscription)ï¼Œæ³¨å†Œå¹¶é€‰æ‹©ä¸€ä¸ªå¥—é¤ã€‚

å·²è®¢é˜…ï¼Ÿè·³è‡³ç¬¬ 2 æ­¥ã€‚

## 2. è¿è¡Œä¸€é”®é…ç½®

```bash
zed setup --portal
```

è¿™æ¡å‘½ä»¤ä¼šå®Œæˆäº”ä»¶äº‹ï¼š

1. æ‰“å¼€æµè§ˆå™¨è·³è½¬è‡³ portal.zedteam.com è¿›è¡Œ OAuth ç™»å½•
2. å°† refresh token å­˜å‚¨è‡³ `~/.zed/auth.json`
3. åœ¨ `~/.zed/config.yaml` ä¸­è®¾ç½® `model.provider: nous`
4. é€‰æ‹©ä¸€ä¸ªé»˜è®¤çš„ agentic æ¨¡åž‹ï¼ˆ`anthropic/claude-sonnet-4.6` æˆ–ç±»ä¼¼æ¨¡åž‹ï¼‰
5. ä¸ºç½‘é¡µæœç´¢ã€å›¾åƒç”Ÿæˆã€TTS å’Œæµè§ˆå™¨è‡ªåŠ¨åŒ–å¼€å¯ Tool Gateway

å‘½ä»¤æ‰§è¡Œå®Œæ¯•åŽï¼Œä½ å°†å›žåˆ°ç»ˆç«¯ï¼Œå¯ä»¥ç›´æŽ¥å¼€å§‹å¯¹è¯ã€‚

### å¦‚æžœæˆ‘é€šè¿‡ SSH è¿žæŽ¥åˆ°æœåŠ¡å™¨æ€Žä¹ˆåŠžï¼Ÿ

OAuth éœ€è¦æµè§ˆå™¨ï¼Œä½† loopback å›žè°ƒè¿è¡Œåœ¨ Zed æ‰€åœ¨çš„æœºå™¨ä¸Šã€‚æœ‰ä¸¤ç§æ–¹æ¡ˆï¼š

```bash
# æ–¹æ¡ˆ Aï¼šSSH ç«¯å£è½¬å‘ï¼ˆæŽ¨èï¼‰
ssh -N -L 8642:127.0.0.1:8642 user@remote-host    # åœ¨æœ¬åœ°ç»ˆç«¯æ‰§è¡Œ
zed setup --portal                              # åœ¨è¿œç¨‹æœºå™¨ä¸Šæ‰§è¡Œï¼Œåœ¨æœ¬åœ°æµè§ˆå™¨ä¸­æ‰“å¼€æ‰“å°å‡ºçš„ URL

# æ–¹æ¡ˆ Bï¼šæ‰‹åŠ¨ç²˜è´´ï¼ˆé€‚ç”¨äºŽ Cloud Shellã€Codespacesã€EC2 Instance Connectï¼‰
zed auth add nous --type oauth --manual-paste
# ç„¶åŽé‡æ–°è¿è¡Œ `zed setup --portal` ä»¥è¿žæŽ¥ provider + gateway
```

å®Œæ•´æ“ä½œè¯´æ˜Žï¼ˆåŒ…æ‹¬ ProxyJump é“¾ã€mosh/tmux å’Œ ControlMaster æ³¨æ„äº‹é¡¹ï¼‰è¯·å‚é˜… [OAuth over SSH / è¿œç¨‹ä¸»æœº](/guides/oauth-over-ssh)ã€‚

## 3. éªŒè¯é…ç½®æ˜¯å¦æˆåŠŸ

```bash
zed portal info
```

ä½ åº”è¯¥çœ‹åˆ°ï¼š

```
  Zed Portal
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  Auth:    âœ“ logged in
  Portal:  https://portal.zedteam.com
  Model:   âœ“ using Nous as inference provider

  Tool Gateway
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  Web search & extract  via Zed Portal
  Image generation      via Zed Portal
  Text-to-speech        via Zed Portal
  Browser automation    via Zed Portal
```

å¦‚æžœä»»ä½•ä¸€è¡Œæ˜¾ç¤ºçš„ä¸æ˜¯"via Zed Portal"ï¼Œæˆ–è€… auth è¡Œæ˜¾ç¤º"not logged in"ï¼Œè¯·è·³è‡³ä¸‹æ–¹çš„[æ•…éšœæŽ’æŸ¥](#troubleshooting)ã€‚

## 4. è¿è¡Œç¬¬ä¸€æ¬¡å¯¹è¯

```bash
zed chat
```

å°è¯•ä¸€ä¸ªåŒæ—¶è°ƒç”¨æ¨¡åž‹å’Œ Tool Gateway çš„è¯·æ±‚ï¼š

```
Hey, search the web for "Zed Agent release notes" and summarize the top 3 hits.
```

ä½ åº”è¯¥çœ‹åˆ° Zed è°ƒç”¨ `web_search`ï¼ˆé€šè¿‡ gateway ç”± Firecrawl æä¾›æ”¯æŒï¼‰å¹¶è¿”å›žæ‘˜è¦ã€‚å¦‚æžœæœç´¢æ­£å¸¸æ‰§è¡Œä¸”å“åº”å†…å®¹åˆç†ï¼Œè¯´æ˜Žé…ç½®å®Œæˆâ€”â€”Portal å·²ç«¯åˆ°ç«¯è¿žé€šã€‚

## 5. é€‰æ‹©ä½ å®žé™…éœ€è¦çš„æ¨¡åž‹

`zed setup --portal` ä¼šåœ¨è®¾ç½®è¿‡ç¨‹ä¸­è®©ä½ é€‰æ‹©æ¨¡åž‹ï¼Œä½†è®¢é˜…çš„æ„ä¹‰åœ¨äºŽå¯ä»¥è®¿é—®å®Œæ•´çš„æ¨¡åž‹ç›®å½•â€”â€”éšæ—¶å¯åœ¨ä¼šè¯ä¸­ä½¿ç”¨ `/model` åˆ‡æ¢ï¼š

```bash
/model anthropic/claude-sonnet-4.6     # æœ€ä½³é€šç”¨ agentic æ¨¡åž‹
/model openai/gpt-5.4                  # å¼ºæŽ¨ç† + å·¥å…·è°ƒç”¨
/model google/gemini-2.5-pro           # è¶…å¤§ä¸Šä¸‹æ–‡çª—å£
/model deepseek/deepseek-v3.2          # é«˜æ€§ä»·æ¯”ç¼–ç¨‹æ¨¡åž‹
/model anthropic/claude-opus-4.6       # å¤„ç†å¤æ‚é—®é¢˜çš„é‡é‡çº§æ¨¡åž‹
```

æˆ–è€…æ‰“å¼€é€‰æ‹©å™¨æµè§ˆï¼š

```bash
/model
```

æ°¸ä¹…è®¾ç½®ä¸åŒçš„é»˜è®¤æ¨¡åž‹ï¼š

```bash
# åœ¨ç»ˆç«¯ä¸­ï¼Œåœ¨ä»»ä½•ä¼šè¯ä¹‹å¤–æ‰§è¡Œ
zed config set model.default anthropic/claude-sonnet-4.6
```

### ä¸è¦åœ¨ agent ä»»åŠ¡ä¸­ä½¿ç”¨ Zed-4

Zed-4-70B å’Œ Zed-4-405B åœ¨ Portal ä¸Šä»¥å¤§å¹…æŠ˜æ‰£æä¾›ï¼Œä½†å®ƒä»¬æ˜¯**å¯¹è¯/æŽ¨ç†æ¨¡åž‹**ï¼Œå¹¶éžé’ˆå¯¹å·¥å…·è°ƒç”¨ä¼˜åŒ–çš„æ¨¡åž‹ã€‚å®ƒä»¬åœ¨å¤šæ­¥éª¤ agent å¾ªçŽ¯ä¸­è¡¨çŽ°ä¸ä½³ã€‚è¯·é€šè¿‡ [Nous Chat](https://chat.zedteam.com) å°†å®ƒä»¬ç”¨äºŽå¯¹è¯/ç ”ç©¶å·¥ä½œï¼Œæˆ–é€šè¿‡[è®¢é˜…ä»£ç†](/user-guide/features/subscription-proxy)ä»Žéž agent å·¥å…·ä¸­ä½¿ç”¨ã€‚å¯¹äºŽ Zed Agent æœ¬èº«ï¼Œè¯·åšæŒä½¿ç”¨ä¸Šè¿°å‰æ²¿ agentic æ¨¡åž‹ã€‚

Portal çš„[ä¿¡æ¯é¡µé¢](https://portal.zedteam.com/info)ä¹Ÿæœ‰æ­¤è¯´æ˜Žâ€”â€”è¿™æ˜¯ Nous å®˜æ–¹æŒ‡å¯¼ï¼Œå¹¶éžä»…ä»£è¡¨ Zed ä¸€æ–¹çš„æ„è§ã€‚

## 6. ï¼ˆå¯é€‰ï¼‰è‡ªå®šä¹‰ Tool Gateway è·¯ç”±

gateway æ˜¯æŒ‰å·¥å…·é€‰æ‹©å¯ç”¨çš„ï¼Œè€Œéžå…¨éƒ¨å¼€å¯æˆ–å…¨éƒ¨å…³é—­ã€‚å¦‚æžœä½ å·²æœ‰ Browserbase è´¦å·å¹¶å¸Œæœ›ç»§ç»­ä½¿ç”¨ï¼ŒåŒæ—¶å°†ç½‘é¡µæœç´¢å’Œå›¾åƒç”Ÿæˆè·¯ç”±è‡³ Nousï¼Œè¿™æ˜¯æ”¯æŒçš„ï¼š

```bash
zed tools
# â†’ Web search       â†’ "Nous Subscription"     ï¼ˆæŽ¨èï¼‰
# â†’ Image generation â†’ "Nous Subscription"     ï¼ˆæŽ¨èï¼‰
# â†’ Browser          â†’ "Browserbase"           ï¼ˆä½ è‡ªå·±çš„å¯†é’¥ï¼‰
# â†’ TTS              â†’ "Nous Subscription"     ï¼ˆæŽ¨èï¼‰
```

ä½¿ç”¨ä»¥ä¸‹å‘½ä»¤éªŒè¯ä½ çš„æ··åˆé…ç½®ï¼š

```bash
zed portal tools
```

ä½ å°†çœ‹åˆ°æ¯ä¸ªå·¥å…·çš„è·¯ç”±æƒ…å†µâ€”â€”é€šè¿‡è®¢é˜…è·¯ç”±çš„å·¥å…·æ˜¾ç¤º `via Zed Portal`ï¼Œä½¿ç”¨ä½ è‡ªå·±å¯†é’¥çš„å·¥å…·æ˜¾ç¤ºåˆä½œæ–¹åç§°ï¼ˆ`browserbase`ã€`firecrawl` ç­‰ï¼‰ã€‚

## 7. ï¼ˆå¯é€‰ï¼‰å¯ç”¨è¯­éŸ³æ¨¡å¼

ç”±äºŽ Tool Gateway åŒ…å« OpenAI TTSï¼Œæ— éœ€å•ç‹¬çš„ OpenAI å¯†é’¥å³å¯ä½¿ç”¨[è¯­éŸ³æ¨¡å¼](/user-guide/features/voice-mode)ï¼š

```bash
zed setup voice
# â†’ ä¸º TTS é€‰æ‹© "Nous Subscription"
# â†’ é€‰æ‹©è¯­éŸ³è½¬æ–‡å­—åŽç«¯ï¼ˆæœ¬åœ° faster-whisper å…è´¹ï¼Œæ— éœ€é…ç½®ï¼‰
```

ä¹‹åŽåœ¨ä»»ä½•æ¶ˆæ¯å¹³å°ä¼šè¯ä¸­ï¼ˆTelegramã€Discordã€Signal ç­‰ï¼‰ï¼Œå‘é€è¯­éŸ³æ¶ˆæ¯ï¼ŒZed å°†è½¬å½•å†…å®¹ã€ç”Ÿæˆå›žå¤å¹¶ä»¥åˆæˆè¯­éŸ³å›žå¤â€”â€”å…¨éƒ¨é€šè¿‡ä½ çš„ Portal è®¢é˜…å®Œæˆã€‚

## 8. ï¼ˆå¯é€‰ï¼‰Cron å®šæ—¶ä»»åŠ¡ä¸Žå¸¸é©»å·¥ä½œæµ

Portal è®¢é˜…å¯¹ [cron å®šæ—¶ä»»åŠ¡](/user-guide/features/cron)å’Œ[æ‰¹å¤„ç†](/user-guide/features/batch-processing)çš„æ”¯æŒæ–¹å¼ä¸Žäº¤äº’å¼å¯¹è¯ç›¸åŒâ€”â€”OAuth refresh token ä¼šè‡ªåŠ¨å¤ç”¨ã€‚æ— éœ€é¢å¤–é…ç½®ï¼Œç›´æŽ¥å®‰æŽ’ cron ä»»åŠ¡ï¼Œè´¹ç”¨å°†è®¡å…¥ä½ çš„è®¢é˜…ã€‚

```bash
zed cron add "Daily AI news summary" "every day at 9am" \
  "Search the web for top AI news and summarize the 5 most important stories"
```

è¯¥ cron ä»»åŠ¡æ— äººå€¼å®ˆè¿è¡Œï¼Œè°ƒç”¨æ¨¡åž‹ã€ç½‘é¡µæœç´¢å’Œæ‘˜è¦ç”Ÿæˆï¼Œå…¨éƒ¨é€šè¿‡ä½ çš„ Portal è®¢é˜…å®Œæˆã€‚

## Profiles ä¸Žå¤šç”¨æˆ·é…ç½®

å¦‚æžœä½ ä½¿ç”¨ [Zed profiles](/user-guide/profiles)ï¼ˆä¾‹å¦‚æ¯ä¸ªé¡¹ç›®å•ç‹¬ä¸€å¥—é…ç½®ï¼‰ï¼ŒPortal refresh token ä¼šé€šè¿‡å…±äº« token å­˜å‚¨è‡ªåŠ¨åœ¨æ‰€æœ‰ profiles ä¹‹é—´å…±äº«ã€‚åœ¨ä»»æ„ profile ä¸Šç™»å½•ä¸€æ¬¡ï¼Œå…¶ä½™ profiles ä¼šè‡ªåŠ¨èŽ·å–ã€‚

å¯¹äºŽå¤šäººå…±ç”¨ä¸€å°æœºå™¨çš„å›¢é˜Ÿåœºæ™¯ï¼Œæ¯ä¸ªäººæœ‰è‡ªå·±çš„ Portal è´¦å· â†’ æ¯ä¸ª home ç›®å½•ä¿å­˜å„è‡ªçš„ `~/.zed/auth.json` â†’ ç”¨æˆ·ä¹‹é—´ä¸å…±äº« tokenã€‚è¿™æ˜¯æ­£ç¡®çš„è¾¹ç•Œåˆ’åˆ†ã€‚

## æ•…éšœæŽ’æŸ¥

### è¿è¡Œ `zed setup --portal` åŽï¼Œ`zed portal info` æ˜¾ç¤º"not logged in"

OAuth æµç¨‹æœªå®Œæˆã€‚é‡æ–°è¿è¡Œï¼š

```bash
zed portal
```

å¦‚æžœæµè§ˆå™¨æœªæ‰“å¼€æˆ–å›žè°ƒå¤±è´¥ï¼Œä½ å¯èƒ½åœ¨è¿œç¨‹/æ— å¤´ä¸»æœºä¸Šâ€”â€”å‚è§ [OAuth over SSH](/guides/oauth-over-ssh) äº†è§£ç«¯å£è½¬å‘å’Œæ‰‹åŠ¨ç²˜è´´çš„è§£å†³æ–¹æ¡ˆã€‚

### "Model: currently openrouter"ï¼ˆæˆ–å…¶ä»– providerï¼‰è€Œéž"using Nous as inference provider"

æœ¬åœ°é…ç½®å‘ç”Ÿäº†åç§»ã€‚OAuth æˆåŠŸï¼Œä½† `model.provider` ä»æŒ‡å‘å…¶ä»– providerã€‚ä¿®å¤æ–¹æ³•ï¼š

```bash
zed config set model.provider nous
```

æˆ–ä»¥äº¤äº’æ–¹å¼ï¼š

```bash
zed model
# é€‰æ‹© Zed Portal
```

ä½¿ç”¨ `zed portal info` é‡æ–°éªŒè¯ã€‚

### Tool Gateway å·¥å…·æ˜¾ç¤ºåˆä½œæ–¹åç§°è€Œéž"via Zed Portal"

æŒ‰å·¥å…·çš„é…ç½®è¦†ç›–äº† gateway è®¾ç½®ã€‚è¿è¡Œï¼š

```bash
zed tools
# å¯¹éœ€è¦é€šè¿‡ gateway è·¯ç”±çš„å·¥å…·é€‰æ‹© "Nous Subscription"
```

éƒ¨åˆ†ç”¨æˆ·ä¼šæœ‰æ„æ··åˆä½¿ç”¨â€”â€”ä¾‹å¦‚ç½‘é¡µæœç´¢é€šè¿‡ Nous è·¯ç”±ï¼Œä½†æµè§ˆå™¨ä½¿ç”¨è‡ªå·±çš„ Browserbase å¯†é’¥ã€‚å¦‚æžœè¿™æ˜¯æœ‰æ„ä¸ºä¹‹ï¼Œä¿æŒä¸å˜å³å¯ã€‚å¦‚æžœä¸æ˜¯ï¼Œæ­¤å‘½ä»¤å¯ä¿®å¤ã€‚

### ä¼šè¯ä¸­é€”å‡ºçŽ°"Re-authentication required"

ä½ çš„ Portal refresh token å·²å¤±æ•ˆï¼ˆå¯†ç æ›´æ”¹ã€æ‰‹åŠ¨æ’¤é”€ã€ä¼šè¯è¿‡æœŸï¼‰ã€‚è¯¥ token çŽ°å·²åœ¨æœ¬åœ°è¢«éš”ç¦»ï¼Œä»¥é˜² Zed æ— é™é‡è¯•ã€‚é‡æ–°ç™»å½•å³å¯ï¼š

```bash
zed auth add nous
```

æˆåŠŸé‡æ–°ç™»å½•åŽï¼Œéš”ç¦»çŠ¶æ€ä¼šè‡ªåŠ¨è§£é™¤ã€‚

### æˆ‘æƒ³è¦çš„æ¨¡åž‹ä¸åœ¨ `/model` é€‰æ‹©å™¨ä¸­

Portal ç›®å½•é•œåƒäº† OpenRouter çš„æ¨¡åž‹åˆ—è¡¨ï¼ˆ300+ ä¸ªï¼‰ã€‚å¦‚æžœæŸä¸ªæ¨¡åž‹ç¼ºå¤±ï¼Œå°è¯•ç›´æŽ¥è¾“å…¥ OpenRouter é£Žæ ¼çš„ slugï¼š

```bash
/model anthropic/claude-opus-4.6
/model openai/o1-2025-12-17
```

å¦‚æžœæŸä¸ªæ¨¡åž‹ç¡®å®žä¸å¯ç”¨ï¼Œè¯·[æäº¤ issue](https://github.com/zedteam/zed-agent/issues)â€”â€”å¤§å¤šæ•°ç¼ºå¤±æ˜¯æˆ‘ä»¬å¯ä»¥æ›´æ–°çš„è·¯ç”±é…ç½®é—®é¢˜ã€‚

### è´¦å•æœªå‡ºçŽ°åœ¨æˆ‘çš„ Portal è´¦å·ä¸­

`zed portal info` ä¼šå‘Šè¯‰ä½ æ˜¯å¦çœŸçš„åœ¨é€šè¿‡ Portal è·¯ç”±ï¼Œè¿˜æ˜¯ä½¿ç”¨äº†å…¶ä»– providerã€‚å¸¸è§åŽŸå› ï¼š

- `model.provider` è®¾ç½®ä¸º `openrouter`/`anthropic`/ç­‰ï¼Œè€Œéž `nous`
- OAuth refresh å¤±è´¥åŽå›žé€€åˆ°äº†å…¶ä»–å·²é…ç½®çš„ provider
- å­˜åœ¨å¤šä¸ª Zed profilesï¼Œä½ ä½¿ç”¨çš„æ˜¯é”™è¯¯çš„é‚£ä¸ªï¼ˆæ£€æŸ¥ `zed profile current`ï¼‰

### æƒ³è¦æ’¤é”€å¹¶é‡æ–°å¼€å§‹

```bash
zed auth remove nous       # æ¸…é™¤æœ¬åœ° refresh token
# ç„¶åŽé‡æ–°è¿è¡Œ setupï¼Œæˆ–åœ¨ Portal ç½‘é¡µç•Œé¢å–æ¶ˆè®¢é˜…
```

## ç”¨å…·ä½“æ•°å­—è¯´æ˜Ž Portal çš„ä»·å€¼

| ä¸ä½¿ç”¨ Portal | ä½¿ç”¨ Portal |
|----------------|-------------|
| 1 ä¸ª OpenRouter / Anthropic / OpenAI å¯†é’¥å†™å…¥ `.env` | 1 ä¸ª OAuth refresh tokenï¼Œæ— éœ€ `.env` å¯†é’¥ |
| 1 ä¸ª Firecrawl å¯†é’¥ç”¨äºŽç½‘é¡µæœç´¢ | ç½‘é¡µæœç´¢é€šè¿‡ gateway è·¯ç”± |
| 1 ä¸ª FAL å¯†é’¥ç”¨äºŽå›¾åƒç”Ÿæˆ | å›¾åƒç”Ÿæˆé€šè¿‡ gateway è·¯ç”± |
| 1 ä¸ª Browser Use / Browserbase å¯†é’¥ç”¨äºŽæµè§ˆå™¨ | æµè§ˆå™¨é€šè¿‡ gateway è·¯ç”± |
| 1 ä¸ª OpenAI å¯†é’¥ç”¨äºŽ TTS / è¯­éŸ³æ¨¡å¼ | TTS é€šè¿‡ gateway è·¯ç”± |
| 5 ä¸ªç‹¬ç«‹çš„æŽ§åˆ¶å°ã€å……å€¼ã€å‘ç¥¨ | 1 ä¸ªè®¢é˜…ï¼Œ1 å¼ å‘ç¥¨ |
| è·¨æœºå™¨ï¼šå¤åˆ¶å…¨éƒ¨ 5 ä¸ªå¯†é’¥ | è·¨æœºå™¨ï¼šé‡æ–° OAuth ä¸€æ¬¡ |

è¿™å°±æ˜¯ Portal çš„ä»·å€¼ã€‚å¦‚æžœä½ æœ¬æ¥å°±åœ¨ä½¿ç”¨å…¶ä¸­ä¸¤ä¸ªä»¥ä¸Šçš„åŽç«¯ï¼Œè®¢é˜…è´¹ç”¨è‡ªç„¶å°±å›žæ¥äº†ã€‚

## å¦è¯·å‚é˜…

- **[Zed Portal é›†æˆé¡µé¢](/integrations/nous-portal)** â€” è®¢é˜…å†…å®¹æ¦‚è¿°
- **[Tool Gateway](/user-guide/features/tool-gateway)** â€” æ¯ä¸ª gateway è·¯ç”±å·¥å…·çš„å®Œæ•´è¯´æ˜Ž
- **[è®¢é˜…ä»£ç†](/user-guide/features/subscription-proxy)** â€” åœ¨éž Zed å·¥å…·ä¸­ä½¿ç”¨ä½ çš„ Portal è®¢é˜…
- **[è¯­éŸ³æ¨¡å¼](/user-guide/features/voice-mode)** â€” åœ¨ Portal è®¢é˜…ä¸Šé…ç½®è¯­éŸ³å¯¹è¯
- **[OAuth over SSH](/guides/oauth-over-ssh)** â€” è¿œç¨‹/æ— å¤´ä¸»æœºç™»å½•æ–¹æ¡ˆ
- **[Profiles](/user-guide/profiles)** â€” åœ¨å¤šä¸ª Zed é…ç½®ä¹‹é—´å…±äº«ä¸€ä¸ª Portal ç™»å½•
