---
sidebar_position: 3
title: 'å­¦ä¹ è·¯å¾„'
description: 'æ ¹æ®æ‚¨çš„ç»éªŒæ°´å¹³å’Œç›®æ ‡ï¼Œé€‰æ‹©é€‚åˆæ‚¨çš„ Zed Agent æ–‡æ¡£å­¦ä¹ è·¯å¾„ã€‚'
---

# å­¦ä¹ è·¯å¾„

Zed Agent åŠŸèƒ½ä¸°å¯Œâ€”â€”CLI åŠ©æ‰‹ã€Telegram/Discord æœºå™¨äººã€ä»»åŠ¡è‡ªåŠ¨åŒ–ã€å¼ºåŒ–å­¦ä¹ è®­ç»ƒç­‰ã€‚æœ¬é¡µå¸®åŠ©æ‚¨æ ¹æ®è‡ªèº«ç»éªŒæ°´å¹³å’Œç›®æ ‡ï¼Œç¡®å®šä»Žå“ªé‡Œå¼€å§‹ã€é˜…è¯»å“ªäº›å†…å®¹ã€‚

:::tip ä»Žè¿™é‡Œå¼€å§‹
å¦‚æžœæ‚¨å°šæœªå®‰è£… Zed Agentï¼Œè¯·å…ˆé˜…è¯»[å®‰è£…æŒ‡å—](/getting-started/installation)ï¼Œç„¶åŽå®Œæˆ[å¿«é€Ÿå…¥é—¨](/getting-started/quickstart)ã€‚ä»¥ä¸‹å†…å®¹å‡å‡è®¾æ‚¨å·²å®Œæˆå®‰è£…ã€‚
:::

## å¦‚ä½•ä½¿ç”¨æœ¬é¡µ

- **å·²çŸ¥è‡ªå·±çš„æ°´å¹³ï¼Ÿ** è·³è½¬è‡³[æŒ‰ç»éªŒæ°´å¹³](#by-experience-level)è¡¨æ ¼ï¼ŒæŒ‰ç…§å¯¹åº”å±‚çº§çš„é˜…è¯»é¡ºåºè¿›è¡Œã€‚
- **æœ‰æ˜Žç¡®ç›®æ ‡ï¼Ÿ** è·³è‡³[æŒ‰ä½¿ç”¨åœºæ™¯](#by-use-case)ï¼Œæ‰¾åˆ°åŒ¹é…çš„åœºæ™¯ã€‚
- **éšä¾¿æµè§ˆï¼Ÿ** æŸ¥çœ‹[ä¸»è¦åŠŸèƒ½](#key-features-at-a-glance)è¡¨æ ¼ï¼Œå¿«é€Ÿäº†è§£ Zed Agent çš„å…¨éƒ¨èƒ½åŠ›ã€‚

## æŒ‰ç»éªŒæ°´å¹³

| æ°´å¹³ | ç›®æ ‡ | æŽ¨èé˜…è¯» | é¢„è®¡æ—¶é—´ |
|---|---|---|---|
| **åˆçº§** | å¿«é€Ÿä¸Šæ‰‹ï¼Œè¿›è¡ŒåŸºæœ¬å¯¹è¯ï¼Œä½¿ç”¨å†…ç½®å·¥å…· | [å®‰è£…](/getting-started/installation) â†’ [å¿«é€Ÿå…¥é—¨](/getting-started/quickstart) â†’ [CLI ç”¨æ³•](/user-guide/cli) â†’ [é…ç½®](/user-guide/configuration) | çº¦ 1 å°æ—¶ |
| **ä¸­çº§** | æ­å»ºæ¶ˆæ¯æœºå™¨äººï¼Œä½¿ç”¨è®°å¿†ã€cron ä»»åŠ¡ã€æŠ€èƒ½ç­‰é«˜çº§åŠŸèƒ½ | [ä¼šè¯](/user-guide/sessions) â†’ [æ¶ˆæ¯](/user-guide/messaging) â†’ [å·¥å…·](/user-guide/features/tools) â†’ [æŠ€èƒ½](/user-guide/features/skills) â†’ [è®°å¿†](/user-guide/features/memory) â†’ [Cron](/user-guide/features/cron) | çº¦ 2â€“3 å°æ—¶ |
| **é«˜çº§** | æž„å»ºè‡ªå®šä¹‰å·¥å…·ã€åˆ›å»ºæŠ€èƒ½ã€ä½¿ç”¨å¼ºåŒ–å­¦ä¹ è®­ç»ƒæ¨¡åž‹ã€å‚ä¸Žé¡¹ç›®è´¡çŒ® | [æž¶æž„](/developer-guide/architecture) â†’ [æ·»åŠ å·¥å…·](/developer-guide/adding-tools) â†’ [åˆ›å»ºæŠ€èƒ½](/developer-guide/creating-skills) â†’ [å¼ºåŒ–å­¦ä¹ è®­ç»ƒ](/user-guide/features/rl-training) â†’ [è´¡çŒ®æŒ‡å—](/developer-guide/contributing) | çº¦ 4â€“6 å°æ—¶ |

## æŒ‰ä½¿ç”¨åœºæ™¯

é€‰æ‹©ä¸Žæ‚¨ç›®æ ‡åŒ¹é…çš„åœºæ™¯ï¼Œæ¯ä¸ªåœºæ™¯å‡æŒ‰æŽ¨èé¡ºåºé“¾æŽ¥åˆ°ç›¸å…³æ–‡æ¡£ã€‚

### "æˆ‘æƒ³è¦ä¸€ä¸ª CLI ç¼–ç¨‹åŠ©æ‰‹"

å°† Zed Agent ç”¨ä½œäº¤äº’å¼ç»ˆç«¯åŠ©æ‰‹ï¼Œç”¨äºŽç¼–å†™ã€å®¡æŸ¥å’Œè¿è¡Œä»£ç ã€‚

1. [å®‰è£…](/getting-started/installation)
2. [å¿«é€Ÿå…¥é—¨](/getting-started/quickstart)
3. [CLI ç”¨æ³•](/user-guide/cli)
4. [ä»£ç æ‰§è¡Œ](/user-guide/features/code-execution)
5. [ä¸Šä¸‹æ–‡æ–‡ä»¶](/user-guide/features/context-files)
6. [æŠ€å·§ä¸Žçªé—¨](/guides/tips)

:::tip
é€šè¿‡ä¸Šä¸‹æ–‡æ–‡ä»¶å°†æ–‡ä»¶ç›´æŽ¥ä¼ å…¥å¯¹è¯ã€‚Zed Agent å¯ä»¥è¯»å–ã€ç¼–è¾‘å¹¶è¿è¡Œæ‚¨é¡¹ç›®ä¸­çš„ä»£ç ã€‚
:::

### "æˆ‘æƒ³è¦ä¸€ä¸ª Telegram/Discord æœºå™¨äºº"

å°† Zed Agent éƒ¨ç½²ä¸ºæ‚¨å¸¸ç”¨æ¶ˆæ¯å¹³å°ä¸Šçš„æœºå™¨äººã€‚

1. [å®‰è£…](/getting-started/installation)
2. [é…ç½®](/user-guide/configuration)
3. [æ¶ˆæ¯æ¦‚è§ˆ](/user-guide/messaging)
4. [Telegram é…ç½®](/user-guide/messaging/telegram)
5. [Discord é…ç½®](/user-guide/messaging/discord)
6. [è¯­éŸ³æ¨¡å¼](/user-guide/features/voice-mode)
7. [åœ¨ Zed ä¸­ä½¿ç”¨è¯­éŸ³æ¨¡å¼](/guides/use-voice-mode-with-zed)
8. [å®‰å…¨](/user-guide/security)

å®Œæ•´é¡¹ç›®ç¤ºä¾‹è¯·å‚é˜…ï¼š
- [æ¯æ—¥ç®€æŠ¥æœºå™¨äºº](/guides/daily-briefing-bot)
- [å›¢é˜Ÿ Telegram åŠ©æ‰‹](/guides/team-telegram-assistant)

### "æˆ‘æƒ³è‡ªåŠ¨åŒ–ä»»åŠ¡"

è°ƒåº¦å‘¨æœŸæ€§ä»»åŠ¡ã€è¿è¡Œæ‰¹å¤„ç†ä½œä¸šï¼Œæˆ–å°†å¤šä¸ª agent åŠ¨ä½œä¸²è”èµ·æ¥ã€‚

1. [å¿«é€Ÿå…¥é—¨](/getting-started/quickstart)
2. [Cron è°ƒåº¦](/user-guide/features/cron)
3. [æ‰¹å¤„ç†](/user-guide/features/batch-processing)
4. [å§”æ´¾](/user-guide/features/delegation)
5. [Hooks](/user-guide/features/hooks)

:::tip
Cron ä»»åŠ¡è®© Zed Agent æŒ‰è®¡åˆ’æ‰§è¡Œä»»åŠ¡â€”â€”æ¯æ—¥æ‘˜è¦ã€å®šæœŸæ£€æŸ¥ã€è‡ªåŠ¨æŠ¥å‘Šâ€”â€”æ— éœ€æ‚¨åœ¨åœºã€‚
:::

### "æˆ‘æƒ³æž„å»ºè‡ªå®šä¹‰å·¥å…·/æŠ€èƒ½"

é€šè¿‡è‡ªå®šä¹‰å·¥å…·å’Œå¯å¤ç”¨æŠ€èƒ½åŒ…æ‰©å±• Zed Agentã€‚

1. [æ’ä»¶](/user-guide/features/plugins)
2. [æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin)
3. [å·¥å…·æ¦‚è§ˆ](/user-guide/features/tools)
4. [æŠ€èƒ½æ¦‚è§ˆ](/user-guide/features/skills)
5. [MCPï¼ˆæ¨¡åž‹ä¸Šä¸‹æ–‡åè®®ï¼‰](/user-guide/features/mcp)
6. [æž¶æž„](/developer-guide/architecture)
7. [æ·»åŠ å·¥å…·](/developer-guide/adding-tools)
8. [åˆ›å»ºæŠ€èƒ½](/developer-guide/creating-skills)

:::tip
å¯¹äºŽå¤§å¤šæ•°è‡ªå®šä¹‰å·¥å…·çš„åˆ›å»ºï¼Œå»ºè®®ä»Žæ’ä»¶å¼€å§‹ã€‚[æ·»åŠ å·¥å…·](/developer-guide/adding-tools)é¡µé¢é¢å‘ Zed æ ¸å¿ƒå†…ç½®å¼€å‘ï¼Œè€Œéžå¸¸è§„ç”¨æˆ·/è‡ªå®šä¹‰å·¥å…·è·¯å¾„ã€‚
:::

### "æˆ‘æƒ³è®­ç»ƒæ¨¡åž‹"

ä½¿ç”¨å¼ºåŒ–å­¦ä¹ ï¼ˆRLï¼‰é€šè¿‡ Zed Agent å†…ç½®çš„ RL è®­ç»ƒæµæ°´çº¿å¯¹æ¨¡åž‹è¡Œä¸ºè¿›è¡Œå¾®è°ƒã€‚

1. [å¿«é€Ÿå…¥é—¨](/getting-started/quickstart)
2. [é…ç½®](/user-guide/configuration)
3. [å¼ºåŒ–å­¦ä¹ è®­ç»ƒ](/user-guide/features/rl-training)
4. [Provider è·¯ç”±](/user-guide/features/provider-routing)
5. [æž¶æž„](/developer-guide/architecture)

:::tip
å¼ºåŒ–å­¦ä¹ è®­ç»ƒåœ¨æ‚¨å·²äº†è§£ Zed Agent å¦‚ä½•å¤„ç†å¯¹è¯å’Œå·¥å…·è°ƒç”¨çš„åŸºç¡€ä¸Šæ•ˆæžœæœ€ä½³ã€‚å¦‚æžœæ‚¨æ˜¯æ–°æ‰‹ï¼Œè¯·å…ˆå®Œæˆåˆçº§è·¯å¾„ã€‚
:::

### "æˆ‘æƒ³å°†å…¶ä½œä¸º Python åº“ä½¿ç”¨"

ä»¥ç¼–ç¨‹æ–¹å¼å°† Zed Agent é›†æˆåˆ°æ‚¨è‡ªå·±çš„ Python åº”ç”¨ä¸­ã€‚

1. [å®‰è£…](/getting-started/installation)
2. [å¿«é€Ÿå…¥é—¨](/getting-started/quickstart)
3. [Python åº“æŒ‡å—](/guides/python-library)
4. [æž¶æž„](/developer-guide/architecture)
5. [å·¥å…·](/user-guide/features/tools)
6. [ä¼šè¯](/user-guide/sessions)

## ä¸»è¦åŠŸèƒ½ä¸€è§ˆ

ä¸ç¡®å®šæœ‰å“ªäº›åŠŸèƒ½ï¼Ÿä»¥ä¸‹æ˜¯ä¸»è¦åŠŸèƒ½çš„å¿«é€Ÿç›®å½•ï¼š

| åŠŸèƒ½ | è¯´æ˜Ž | é“¾æŽ¥ |
|---|---|---|
| **å·¥å…·** | Agent å¯è°ƒç”¨çš„å†…ç½®å·¥å…·ï¼ˆæ–‡ä»¶ I/Oã€æœç´¢ã€Shell ç­‰ï¼‰ | [å·¥å…·](/user-guide/features/tools) |
| **æŠ€èƒ½** | å¯å®‰è£…çš„æ’ä»¶åŒ…ï¼Œç”¨äºŽæ·»åŠ æ–°èƒ½åŠ› | [æŠ€èƒ½](/user-guide/features/skills) |
| **è®°å¿†** | è·¨ä¼šè¯çš„æŒä¹…åŒ–è®°å¿† | [è®°å¿†](/user-guide/features/memory) |
| **ä¸Šä¸‹æ–‡æ–‡ä»¶** | å°†æ–‡ä»¶å’Œç›®å½•ä¼ å…¥å¯¹è¯ | [ä¸Šä¸‹æ–‡æ–‡ä»¶](/user-guide/features/context-files) |
| **MCP** | é€šè¿‡æ¨¡åž‹ä¸Šä¸‹æ–‡åè®®è¿žæŽ¥å¤–éƒ¨å·¥å…·æœåŠ¡å™¨ | [MCP](/user-guide/features/mcp) |
| **Cron** | è°ƒåº¦å‘¨æœŸæ€§ agent ä»»åŠ¡ | [Cron](/user-guide/features/cron) |
| **å§”æ´¾** | ç”Ÿæˆå­ agent ä»¥å¹¶è¡Œå¤„ç†å·¥ä½œ | [å§”æ´¾](/user-guide/features/delegation) |
| **ä»£ç æ‰§è¡Œ** | è¿è¡Œä»¥ç¼–ç¨‹æ–¹å¼è°ƒç”¨ Zed å·¥å…·çš„ Python è„šæœ¬ | [ä»£ç æ‰§è¡Œ](/user-guide/features/code-execution) |
| **æµè§ˆå™¨** | ç½‘é¡µæµè§ˆä¸ŽæŠ“å– | [æµè§ˆå™¨](/user-guide/features/browser) |
| **Hooks** | äº‹ä»¶é©±åŠ¨çš„å›žè°ƒä¸Žä¸­é—´ä»¶ | [Hooks](/user-guide/features/hooks) |
| **æ‰¹å¤„ç†** | æ‰¹é‡å¤„ç†å¤šä¸ªè¾“å…¥ | [æ‰¹å¤„ç†](/user-guide/features/batch-processing) |
| **å¼ºåŒ–å­¦ä¹ è®­ç»ƒ** | ä½¿ç”¨å¼ºåŒ–å­¦ä¹ å¾®è°ƒæ¨¡åž‹ | [å¼ºåŒ–å­¦ä¹ è®­ç»ƒ](/user-guide/features/rl-training) |
| **Provider è·¯ç”±** | åœ¨å¤šä¸ª LLM provider ä¹‹é—´è·¯ç”±è¯·æ±‚ | [Provider è·¯ç”±](/user-guide/features/provider-routing) |

## ä¸‹ä¸€æ­¥é˜…è¯»

æ ¹æ®æ‚¨å½“å‰æ‰€å¤„é˜¶æ®µï¼š

- **åˆšå®Œæˆå®‰è£…ï¼Ÿ** â†’ å‰å¾€[å¿«é€Ÿå…¥é—¨](/getting-started/quickstart)ï¼Œè¿è¡Œæ‚¨çš„ç¬¬ä¸€æ¬¡å¯¹è¯ã€‚
- **å®Œæˆäº†å¿«é€Ÿå…¥é—¨ï¼Ÿ** â†’ é˜…è¯» [CLI ç”¨æ³•](/user-guide/cli)å’Œ[é…ç½®](/user-guide/configuration)ï¼Œè‡ªå®šä¹‰æ‚¨çš„è®¾ç½®ã€‚
- **å·²ç†Ÿæ‚‰åŸºç¡€ï¼Ÿ** â†’ æŽ¢ç´¢[å·¥å…·](/user-guide/features/tools)ã€[æŠ€èƒ½](/user-guide/features/skills)å’Œ[è®°å¿†](/user-guide/features/memory)ï¼Œé‡Šæ”¾ agent çš„å…¨éƒ¨èƒ½åŠ›ã€‚
- **ä¸ºå›¢é˜Ÿéƒ¨ç½²ï¼Ÿ** â†’ é˜…è¯»[å®‰å…¨](/user-guide/security)å’Œ[ä¼šè¯](/user-guide/sessions)ï¼Œäº†è§£è®¿é—®æŽ§åˆ¶ä¸Žå¯¹è¯ç®¡ç†ã€‚
- **å‡†å¤‡å¥½å¼€å‘äº†ï¼Ÿ** â†’ è¿›å…¥[å¼€å‘è€…æŒ‡å—](/developer-guide/architecture)ï¼Œäº†è§£å†…éƒ¨æœºåˆ¶å¹¶å¼€å§‹è´¡çŒ®ã€‚
- **æƒ³è¦å®žé™…ç¤ºä¾‹ï¼Ÿ** â†’ æŸ¥çœ‹[æŒ‡å—](/guides/tips)éƒ¨åˆ†ï¼ŒèŽ·å–çœŸå®žé¡¹ç›®æ¡ˆä¾‹å’ŒæŠ€å·§ã€‚

:::tip
æ‚¨æ— éœ€é˜…è¯»æ‰€æœ‰å†…å®¹ã€‚é€‰æ‹©ä¸Žæ‚¨ç›®æ ‡åŒ¹é…çš„è·¯å¾„ï¼ŒæŒ‰é¡ºåºè·Ÿéšé“¾æŽ¥ï¼Œå³å¯å¿«é€Ÿä¸Šæ‰‹ã€‚éšæ—¶å¯ä»¥å›žåˆ°æœ¬é¡µå¯»æ‰¾ä¸‹ä¸€æ­¥ã€‚
:::
