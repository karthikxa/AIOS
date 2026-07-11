---
title: "Teams Meeting Pipeline"
sidebar_label: "Teams Meeting Pipeline"
description: "é€šè¿‡ Zed CLI æ“ä½œ Teams ä¼šè®®æ‘˜è¦æµæ°´çº¿ â€” æ€»ç»“ä¼šè®®ã€æ£€æŸ¥æµæ°´çº¿çŠ¶æ€ã€é‡æ”¾ä»»åŠ¡ã€ç®¡ç† Microsoft Graph è®¢é˜…"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Teams Meeting Pipeline

é€šè¿‡ Zed CLI æ“ä½œ Teams ä¼šè®®æ‘˜è¦æµæ°´çº¿ â€” æ€»ç»“ä¼šè®®ã€æ£€æŸ¥æµæ°´çº¿çŠ¶æ€ã€é‡æ”¾ä»»åŠ¡ã€ç®¡ç† Microsoft Graph è®¢é˜…ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/productivity/teams-meeting-pipeline` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Agent + Teknium |
| è®¸å¯è¯ | MIT |
| æ ‡ç­¾ | `Teams`, `Microsoft Graph`, `Meetings`, `Productivity`, `Operations` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Teams Meeting Pipeline

å½“ç”¨æˆ·è¯¢é—® Microsoft Teams ä¼šè®®æ‘˜è¦ã€è½¬å½•æ–‡æœ¬ã€å½•åˆ¶å†…å®¹ã€è¡ŒåŠ¨é¡¹ã€Graph è®¢é˜…ï¼Œæˆ–ä»»ä½•ä¸Ž Teams ä¼šè®®æµæ°´çº¿ç›¸å…³çš„è¿ç»´é—®é¢˜æ—¶ï¼Œä½¿ç”¨æ­¤ skillã€‚æ”¯æŒä»»æ„è¯­è¨€ â€” ä»¥ä¸‹è§¦å‘ç¤ºä¾‹å¹¶éžå®Œæ•´åˆ—è¡¨ã€‚

æ‰€æœ‰é¢å‘è¿ç»´äººå‘˜çš„æ“ä½œå‡é€šè¿‡ç»ˆç«¯å·¥å…·æ‰§è¡Œ `zed teams-pipeline` å­å‘½ä»¤å®Œæˆã€‚æ­¤æµæ°´çº¿æ²¡æœ‰æ–°çš„æ¨¡åž‹å·¥å…· â€” CLI æ˜¯å”¯ä¸€æ“ä½œç•Œé¢ã€‚

## ä½¿ç”¨åœºæ™¯

ç”¨æˆ·å¸Œæœ›ï¼š
- æ€»ç»“ Teams ä¼šè®® / æå–è¡ŒåŠ¨é¡¹ / èŽ·å–ä¼šè®®è®°å½•
- æ£€æŸ¥æµæ°´çº¿çŠ¶æ€ã€æŸ¥çœ‹å·²å­˜å‚¨çš„ä¼šè®®ä»»åŠ¡ï¼Œæˆ–æŸ¥çœ‹è¿‘æœŸä¼šè®®
- é‡æ”¾ / é‡æ–°è¿è¡Œå¤±è´¥æˆ–éœ€è¦é‡æ–°ç”Ÿæˆæ‘˜è¦çš„å·²å­˜å‚¨ä»»åŠ¡
- åœ¨æ›´æ”¹çŽ¯å¢ƒå˜é‡æˆ–é…ç½®åŽéªŒè¯ Microsoft Graph è®¾ç½®
- æŽ’æŸ¥"ä¼šè®®æ‘˜è¦æœªé€è¾¾"æˆ–"æ–°ä¼šè®®æœªè¢«é‡‡é›†"ç­‰é—®é¢˜
- ç®¡ç† Graph webhook è®¢é˜…ï¼ˆåˆ›å»ºã€ç»­æœŸã€åˆ é™¤ã€æŸ¥çœ‹ï¼‰
- è®¾ç½®è‡ªåŠ¨è®¢é˜…ç»­æœŸï¼ˆå‚è§ä¸‹æ–¹æ³¨æ„äº‹é¡¹ï¼‰

å¤šè¯­è¨€è§¦å‘ç¤ºä¾‹ï¼ˆéžå®Œæ•´åˆ—è¡¨ï¼‰ï¼š
- è‹±è¯­ï¼š"summarize the Teams meeting"ã€"pipeline status"ã€"replay job X"
- åœŸè€³å…¶è¯­ï¼š"Teams meeting Ã¶zetle"ã€"action item Ã§Ä±kar"ã€"toplantÄ± notu"ã€"pipeline durumu"ã€"replay job"

## å‰ç½®æ¡ä»¶

ä½¿ç”¨æµæ°´çº¿å‰ï¼Œè¯·ç¡®è®¤ä»¥ä¸‹å˜é‡å·²åœ¨ `~/.zed/.env` ä¸­è®¾ç½®ï¼š

```bash
MSGRAPH_TENANT_ID=...
MSGRAPH_CLIENT_ID=...
MSGRAPH_CLIENT_SECRET=...
```

å¦‚æœ‰ç¼ºå¤±ï¼Œè¯·å°†ç”¨æˆ·å¼•å¯¼è‡³ `/docs/guides/microsoft-graph-app-registration` çš„ Azure åº”ç”¨æ³¨å†ŒæŒ‡å— â€” æµæ°´çº¿æ­£å¸¸è¿è¡Œéœ€è¦ä¸€ä¸ªå·²èŽ·å¾—ç®¡ç†å‘˜æŽˆæƒçš„ Azure AD åº”ç”¨æ³¨å†Œï¼Œå¹¶é…ç½®ç›¸åº”çš„ Graph åº”ç”¨æƒé™ã€‚

## å‘½ä»¤å‚è€ƒ

### çŠ¶æ€ä¸Žæ£€æŸ¥ï¼ˆä»Žè¿™é‡Œå¼€å§‹ï¼‰

```bash
zed teams-pipeline validate              # é…ç½®å¿«ç…§ â€” æ¯æ¬¡å˜æ›´åŽé¦–å…ˆè¿è¡Œ
zed teams-pipeline token-health          # Graph token çŠ¶æ€
zed teams-pipeline token-health --force-refresh   # å¼ºåˆ¶é‡æ–°èŽ·å– token
zed teams-pipeline list                  # è¿‘æœŸä¼šè®®ä»»åŠ¡
zed teams-pipeline list --status failed  # ä»…æ˜¾ç¤ºå¤±è´¥ä»»åŠ¡
zed teams-pipeline show <job-id>         # æŸ¥çœ‹æŸä¸ªä»»åŠ¡çš„å®Œæ•´è¯¦æƒ…
zed teams-pipeline subscriptions         # å½“å‰ Graph webhook è®¢é˜…
```

### é‡æ–°è¿è¡Œ / è°ƒè¯•

```bash
zed teams-pipeline run <job-id>          # é‡æ”¾å·²å­˜å‚¨ä»»åŠ¡ï¼ˆé‡æ–°ç”Ÿæˆæ‘˜è¦å¹¶é‡æ–°æŠ•é€’ï¼‰
zed teams-pipeline fetch --meeting-id <id>   # è¯•è¿è¡Œï¼šè§£æžä¼šè®®åŠè½¬å½•æ–‡æœ¬ï¼Œä¸æŒä¹…åŒ–
zed teams-pipeline fetch --join-web-url "<url>"   # é€šè¿‡åŠ å…¥é“¾æŽ¥è¿›è¡Œè¯•è¿è¡Œ
```

### è®¢é˜…ç®¡ç†

```bash
zed teams-pipeline subscribe \
  --resource communications/onlineMeetings/getAllTranscripts \
  --notification-url https://<your-public-host>/msgraph/webhook \
  --client-state "$MSGRAPH_WEBHOOK_CLIENT_STATE"

zed teams-pipeline renew-subscription <sub-id> --expiration <iso-8601>
zed teams-pipeline delete-subscription <sub-id>
zed teams-pipeline maintain-subscriptions            # ç»­æœŸå³å°†åˆ°æœŸçš„è®¢é˜…
zed teams-pipeline maintain-subscriptions --dry-run  # æ˜¾ç¤ºå°†è¢«ç»­æœŸçš„å†…å®¹
```

## å¸¸è§é—®é¢˜å†³ç­–æ ‘

- ç”¨æˆ·é—®"ä¸ºä»€ä¹ˆä»Šå¤©çš„ä¼šè®®æ²¡æœ‰æ”¶åˆ°æ‘˜è¦ï¼Ÿ" â†’ å…ˆæ‰§è¡Œ `list --status failed`ï¼Œå†å¯¹ç›¸å…³è¡Œæ‰§è¡Œ `show <job-id>`ã€‚å¦‚æžœä»»åŠ¡æ ¹æœ¬ä¸å­˜åœ¨ï¼Œæ£€æŸ¥ `subscriptions` â€” webhook å¯èƒ½å·²è¿‡æœŸï¼ˆå‚è§ä¸‹æ–¹æ³¨æ„äº‹é¡¹ï¼‰ã€‚
- ç”¨æˆ·é—®"è®¾ç½®æ˜¯å¦æ­£å¸¸ï¼Ÿ" â†’ ä¾æ¬¡æ‰§è¡Œ `validate`ã€`token-health`ã€`subscriptions`ã€‚ä¸‰é¡¹å‡é€šè¿‡åŽï¼Œå‘èµ·ä¸€æ¬¡æµ‹è¯•ä¼šè®®ï¼Œå¹¶æ£€æŸ¥ `list` æ˜¯å¦å‡ºçŽ°æ–°è¡Œã€‚
- ç”¨æˆ·é—®"é‡æ–°è¿è¡Œä¼šè®® X çš„æ‘˜è¦" â†’ æ‰§è¡Œ `list` æ‰¾åˆ°ä»»åŠ¡ IDï¼Œæ‰§è¡Œ `run <job-id>` è¿›è¡Œé‡æ”¾ã€‚è‹¥å†æ¬¡å¤±è´¥ï¼Œæ‰§è¡Œ `show <job-id>` æŸ¥çœ‹é”™è¯¯ï¼Œå¹¶ç”¨ `fetch --meeting-id` å¯¹åˆ¶å“è§£æžè¿›è¡Œè¯•è¿è¡Œã€‚
- ç”¨æˆ·é—®"å°†ä¼šè®® X åŠ å…¥æµæ°´çº¿" â†’ é€šå¸¸æ— éœ€æ‰‹åŠ¨æ“ä½œ â€” æµæ°´çº¿ç”±è®¢é˜…é©±åŠ¨ï¼Œè€ŒéžæŒ‰å•æ¬¡ä¼šè®®è§¦å‘ã€‚å¦‚æžœç”¨æˆ·å¸Œæœ›å¯¹æŸä¸ªåŽ†å²ä¼šè®®ç”Ÿæˆæ‘˜è¦ï¼Œä½¿ç”¨ `fetch` æ‹‰å–è½¬å½•æ–‡æœ¬ï¼Œå¹¶åœ¨ä»»åŠ¡åˆ›å»ºåŽæ‰§è¡Œ `run`ã€‚

## å…³é”®æ³¨æ„äº‹é¡¹ï¼šGraph è®¢é˜… 72 å°æ—¶åŽè¿‡æœŸ

Microsoft Graph å°† webhook è®¢é˜…ä¸Šé™è®¾ä¸º 72 å°æ—¶ï¼Œä¸”**ä¸ä¼šè‡ªåŠ¨ç»­æœŸ**ã€‚å¦‚æžœæœªè°ƒåº¦ `maintain-subscriptions`ï¼Œæ‰‹åŠ¨åˆ›å»ºè®¢é˜… 3 å¤©åŽä¼šè®®é€šçŸ¥å°†é™é»˜åœæ­¢ã€‚

å½“ç”¨æˆ·åé¦ˆ"æ˜¨å¤©æµæ°´çº¿è¿˜æ­£å¸¸ï¼Œä»Šå¤©æ²¡æœ‰ä»»ä½•å†…å®¹è¿›æ¥"æ—¶ï¼š
1. æ‰§è¡Œ `zed teams-pipeline subscriptions` â€” å¦‚æžœç»“æžœä¸ºç©ºï¼Œæˆ–æ‰€æœ‰æ¡ç›®çš„ `expirationDateTime` å‡å·²è¿‡æœŸï¼Œå³ä¸ºåŽŸå› æ‰€åœ¨ã€‚
2. æŒ‰ä¸Šæ–¹ç¤ºä¾‹ä½¿ç”¨ `subscribe` é‡æ–°åˆ›å»ºè®¢é˜…ã€‚
3. **ç«‹å³è®¾ç½®è‡ªåŠ¨ç»­æœŸ**ï¼Œå¯é€šè¿‡ `zed cron add`ã€systemd timer æˆ–æ™®é€š crontab å®žçŽ°ã€‚è¿ç»´æ‰‹å†Œ `/docs/guides/operate-teams-meeting-pipeline#automating-subscription-renewal-required-for-production` æä¾›äº†ä¸‰ç§æ–¹æ¡ˆçš„å®Œæ•´è¯´æ˜Žã€‚12 å°æ—¶é—´éš”æ˜¯å®‰å…¨çš„ï¼ˆç›¸å¯¹ 72 å°æ—¶ä¸Šé™æœ‰ 6 å€ä½™é‡ï¼‰ã€‚

## å…¶ä»–æ³¨æ„äº‹é¡¹

- **è½¬å½•æ–‡æœ¬å°šæœªå°±ç»ªã€‚** Teams åœ¨ä¼šè®®ç»“æŸåŽéœ€è¦ä¸€æ®µæ—¶é—´æ‰èƒ½ç”Ÿæˆè½¬å½•åˆ¶å“ã€‚å¯¹åˆšç»“æŸçš„ä¼šè®®æ‰§è¡Œ `fetch --meeting-id` å¯èƒ½è¿”å›žç©ºç»“æžœã€‚ç­‰å¾… 2-5 åˆ†é’ŸåŽé‡è¯•ï¼Œæˆ–è®© Graph webhook è‡ªç„¶é©±åŠ¨é‡‡é›†ã€‚
- **æŠ•é€’æ¨¡å¼ä¸åŒ¹é…ã€‚** å¦‚æžœæ‘˜è¦å·²ç”Ÿæˆï¼ˆ`list` æ˜¾ç¤ºæˆåŠŸï¼‰ä½† Teams ä¸­æœªæ”¶åˆ°ä»»ä½•å†…å®¹ï¼Œæ£€æŸ¥ `platforms.teams.extra.delivery_mode` åŠå¯¹åº”çš„ç›®æ ‡é…ç½®ï¼ˆ`incoming_webhook_url` æˆ– `chat_id` æˆ– `team_id`+`channel_id`ï¼‰ã€‚å†™å…¥å™¨ä»Ž config.yaml æˆ– `TEAMS_*` çŽ¯å¢ƒå˜é‡ä¸­è¯»å–è¿™äº›é…ç½®ã€‚
- **Graph åº”ç”¨æƒé™ã€‚** token èŽ·å–æ­£å¸¸ï¼ˆ`token-health` é€šè¿‡ï¼‰ï¼Œä½† Graph API è°ƒç”¨è¿”å›ž 401/403ï¼ŒåŽŸå› æ˜¯æƒé™å·²æ·»åŠ ä½†æœªé‡æ–°æŽˆäºˆç®¡ç†å‘˜åŒæ„ã€‚è¯·ç”¨æˆ·é‡æ–°è¿›å…¥ Azure é—¨æˆ·ä¸­çš„åº”ç”¨æ³¨å†Œé¡µé¢ï¼Œå†æ¬¡ç‚¹å‡»"æŽˆäºˆç®¡ç†å‘˜åŒæ„"ã€‚

## ç›¸å…³æ–‡æ¡£

å½“ç”¨æˆ·éœ€è¦æ¯”æœ¬ skill æ›´æ·±å…¥çš„å†…å®¹æ—¶ï¼Œè¯·å°†å…¶å¼•å¯¼è‡³ä»¥ä¸‹èµ„æºï¼š
- Azure åº”ç”¨æ³¨å†Œæ“ä½œæŒ‡å—ï¼š`/docs/guides/microsoft-graph-app-registration`
- å®Œæ•´æµæ°´çº¿è®¾ç½®ï¼š`/docs/user-guide/messaging/teams-meetings`
- è¿ç»´æ‰‹å†Œï¼ˆç»­æœŸè‡ªåŠ¨åŒ–ã€æ•…éšœæŽ’æŸ¥ã€ä¸Šçº¿æ£€æŸ¥æ¸…å•ï¼‰ï¼š`/docs/guides/operate-teams-meeting-pipeline`
- Webhook ç›‘å¬å™¨è®¾ç½®ï¼š`/docs/user-guide/messaging/msgraph-webhook`
