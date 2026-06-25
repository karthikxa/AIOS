---
sidebar_position: 6
title: "Teams ä¼šè®®"
description: "ä½¿ç”¨ Microsoft Graph webhook é…ç½® Microsoft Teams ä¼šè®®æ‘˜è¦æµæ°´çº¿"
---

# Microsoft Teams ä¼šè®®

å½“ä½ å¸Œæœ› Zed æŽ¥æ”¶ Microsoft Graph ä¼šè®®äº‹ä»¶ã€ä¼˜å…ˆèŽ·å–è½¬å½•æ–‡æœ¬ã€åœ¨æ— å¯ç”¨è½¬å½•æ—¶å›žé€€åˆ°å½•éŸ³åŠ  STTï¼ˆè¯­éŸ³è½¬æ–‡å­—ï¼‰ï¼Œå¹¶å°†ç»“æž„åŒ–æ‘˜è¦è¾“å‡ºåˆ°ä¸‹æ¸¸ sink æ—¶ï¼Œè¯·ä½¿ç”¨ Teams ä¼šè®®æµæ°´çº¿ã€‚

æœ¬é¡µé‡ç‚¹ä»‹ç»é…ç½®ä¸Žå¯ç”¨ï¼š
- Graph å‡­æ®
- webhook ç›‘å¬å™¨é…ç½®
- Teams æŠ•é€’æ¨¡å¼
- æµæ°´çº¿é…ç½®ç»“æž„

å…³äºŽä¸Šçº¿åŽçš„æ—¥å¸¸è¿ç»´ã€ä¸Šçº¿æ£€æŸ¥åŠè¿ç»´å·¥ä½œè¡¨ï¼Œè¯·å‚é˜…ä¸“é¡¹æŒ‡å—ï¼š[è¿ç»´ Teams ä¼šè®®æµæ°´çº¿](/guides/operate-teams-meeting-pipeline)ã€‚

## åŠŸèƒ½è¯´æ˜Ž

è¯¥æµæ°´çº¿ï¼š
1. æŽ¥æ”¶ Microsoft Graph webhook äº‹ä»¶
2. è§£æžä¼šè®®å¹¶ä¼˜å…ˆä½¿ç”¨è½¬å½•æ–‡ä»¶
3. åœ¨æ— å¯ç”¨è½¬å½•æ—¶å›žé€€åˆ°å½•éŸ³ä¸‹è½½åŠ  STT
4. åœ¨æœ¬åœ°å­˜å‚¨æŒä¹…åŒ–ä»»åŠ¡çŠ¶æ€å’Œ sink è®°å½•
5. å¯å°†æ‘˜è¦å†™å…¥ Notionã€Linear å’Œ Microsoft Teams

è¿ç»´æ“ä½œé€šè¿‡ CLI å®Œæˆï¼ˆ`teams-pipeline` å­å‘½ä»¤ç”± `teams_pipeline` æ’ä»¶æ³¨å†Œâ€”â€”é€šè¿‡ `zed plugins enable teams_pipeline` å¯ç”¨ï¼Œæˆ–åœ¨ `config.yaml` ä¸­è®¾ç½® `plugins.enabled: [teams_pipeline]`ï¼‰ï¼š

```bash
zed teams-pipeline validate
zed teams-pipeline list
zed teams-pipeline maintain-subscriptions
```

## å‰ææ¡ä»¶

å¯ç”¨ä¼šè®®æµæ°´çº¿å‰ï¼Œè¯·ç¡®ä¿å·²å…·å¤‡ï¼š

- å¯æ­£å¸¸è¿è¡Œçš„ Zed å®‰è£…
- è‹¥éœ€è¦ Teams å‡ºç«™æŠ•é€’ï¼Œéœ€å®ŒæˆçŽ°æœ‰çš„ [Microsoft Teams bot é…ç½®](/user-guide/messaging/teams)
- å…·å¤‡è®¢é˜…æ‰€éœ€ä¼šè®®èµ„æºæƒé™çš„ Microsoft Graph åº”ç”¨å‡­æ®
- Microsoft Graph å¯è°ƒç”¨çš„å…¬ç½‘ HTTPS URLï¼Œç”¨äºŽ webhook æŠ•é€’
- è‹¥éœ€è¦å½•éŸ³åŠ  STT å›žé€€ï¼Œéœ€å®‰è£… `ffmpeg`

## ç¬¬ä¸€æ­¥ï¼šæ·»åŠ  Microsoft Graph å‡­æ®

å°† Graph åº”ç”¨å‡­æ®æ·»åŠ åˆ° `~/.zed/.env`ï¼š

```bash
MSGRAPH_TENANT_ID=<tenant-id>
MSGRAPH_CLIENT_ID=<client-id>
MSGRAPH_CLIENT_SECRET=<client-secret>
```

è¿™äº›å‡­æ®ç”¨äºŽï¼š
- Graph å®¢æˆ·ç«¯åŸºç¡€å±‚
- è®¢é˜…ç»´æŠ¤å‘½ä»¤
- ä¼šè®®è§£æžå’Œæ–‡ä»¶èŽ·å–
- æœªæä¾›ä¸“ç”¨ Teams è®¿é—®ä»¤ç‰Œæ—¶ï¼Œé€šè¿‡ Graph è¿›è¡Œ Teams å‡ºç«™æŠ•é€’

## ç¬¬äºŒæ­¥ï¼šå¯ç”¨ Graph Webhook ç›‘å¬å™¨

webhook ç›‘å¬å™¨æ˜¯ä¸€ä¸ªåä¸º `msgraph_webhook` çš„ gateway å¹³å°ã€‚è‡³å°‘éœ€è¦å¯ç”¨å®ƒå¹¶è®¾ç½®ä¸€ä¸ª client state å€¼ï¼š

```bash
MSGRAPH_WEBHOOK_ENABLED=true
MSGRAPH_WEBHOOK_PORT=8646
MSGRAPH_WEBHOOK_CLIENT_STATE=<random-shared-secret>
MSGRAPH_WEBHOOK_ACCEPTED_RESOURCES=communications/onlineMeetings
```

ç›‘å¬å™¨æš´éœ²ä»¥ä¸‹ç«¯ç‚¹ï¼š
- `/msgraph/webhook` ç”¨äºŽæŽ¥æ”¶ Graph é€šçŸ¥
- `/health` ç”¨äºŽç®€å•å¥åº·æ£€æŸ¥

ä½ éœ€è¦å°†å…¬ç½‘ HTTPS ç«¯ç‚¹è·¯ç”±åˆ°è¯¥ç›‘å¬å™¨ã€‚ä¾‹å¦‚ï¼Œè‹¥ä½ çš„å…¬ç½‘åŸŸåä¸º `https://ops.example.com`ï¼ŒGraph é€šçŸ¥ URL é€šå¸¸ä¸ºï¼š

```text
https://ops.example.com/msgraph/webhook
```

## ç¬¬ä¸‰æ­¥ï¼šé…ç½® Teams æŠ•é€’ä¸Žæµæ°´çº¿è¡Œä¸º

ä¼šè®®æµæ°´çº¿ä»ŽçŽ°æœ‰çš„ `teams` å¹³å°æ¡ç›®è¯»å–è¿è¡Œæ—¶é…ç½®ã€‚æµæ°´çº¿ä¸“å±žå‚æ•°ä½äºŽ `teams.extra.meeting_pipeline` ä¸‹ã€‚Teams å‡ºç«™æŠ•é€’ä»ä½¿ç”¨å¸¸è§„ Teams å¹³å°é…ç½®ã€‚

`~/.zed/config.yaml` ç¤ºä¾‹ï¼š

```yaml
platforms:
  msgraph_webhook:
    enabled: true
    extra:
      port: 8646
      client_state: "replace-me"
      accepted_resources:
        - "communications/onlineMeetings"

  teams:
    enabled: true
    extra:
      client_id: "your-teams-client-id"
      client_secret: "your-teams-client-secret"
      tenant_id: "your-teams-tenant-id"

      # outbound summary delivery
      delivery_mode: "graph" # or incoming_webhook
      team_id: "team-id"
      channel_id: "channel-id"
      # incoming_webhook_url: "https://..."

      meeting_pipeline:
        transcript_min_chars: 80
        transcript_required: false
        transcription_fallback: true
        ffmpeg_extract_audio: true
        notion:
          enabled: false
        linear:
          enabled: false
```

## Teams æŠ•é€’æ¨¡å¼

æµæ°´çº¿åœ¨çŽ°æœ‰ Teams æ’ä»¶å†…æ”¯æŒä¸¤ç§ Teams æ‘˜è¦æŠ•é€’æ¨¡å¼ã€‚

### `incoming_webhook`

å½“ä½ å¸Œæœ›é€šè¿‡ç®€å•çš„ webhook å°†æ¶ˆæ¯å‘é€åˆ° Teamsï¼Œè€Œæ— éœ€é€šè¿‡ Graph åˆ›å»ºé¢‘é“æ¶ˆæ¯æ—¶ï¼Œä½¿ç”¨æ­¤æ¨¡å¼ã€‚

æ‰€éœ€é…ç½®ï¼š

```yaml
platforms:
  teams:
    enabled: true
    extra:
      delivery_mode: "incoming_webhook"
      incoming_webhook_url: "https://..."
```

### `graph`

å½“ä½ å¸Œæœ› Zed é€šè¿‡ Microsoft Graph å°†æ‘˜è¦å‘é€åˆ° Teams èŠå¤©æˆ–é¢‘é“æ—¶ï¼Œä½¿ç”¨æ­¤æ¨¡å¼ã€‚

æ”¯æŒçš„ç›®æ ‡ï¼š
- `chat_id`
- `team_id` + `channel_id`
- çŽ°æœ‰ Teams å¹³å°çš„ `team_id` + `home_channel` å›žé€€

ç¤ºä¾‹ï¼š

```yaml
platforms:
  teams:
    enabled: true
    extra:
      delivery_mode: "graph"
      team_id: "team-id"
      channel_id: "channel-id"
```

## ç¬¬å››æ­¥ï¼šå¯åŠ¨ Gateway

æ›´æ–°é…ç½®åŽæ­£å¸¸å¯åŠ¨ Zedï¼š

```bash
zed gateway run
```

è‹¥ä½ åœ¨ Docker ä¸­è¿è¡Œ Zedï¼ŒæŒ‰çŽ°æœ‰éƒ¨ç½²æ–¹å¼å¯åŠ¨ gateway å³å¯ã€‚

æ£€æŸ¥ç›‘å¬å™¨ï¼š

```bash
curl http://localhost:8646/health
```

## ç¬¬äº”æ­¥ï¼šåˆ›å»º Graph è®¢é˜…

ä½¿ç”¨æ’ä»¶ CLI åˆ›å»ºå’ŒæŸ¥çœ‹è®¢é˜…ã€‚

ç¤ºä¾‹ï¼š

```bash
zed teams-pipeline subscribe \
  --resource communications/onlineMeetings/getAllTranscripts \
  --notification-url https://ops.example.com/msgraph/webhook \
  --client-state "$MSGRAPH_WEBHOOK_CLIENT_STATE"

zed teams-pipeline subscribe \
  --resource communications/onlineMeetings/getAllRecordings \
  --notification-url https://ops.example.com/msgraph/webhook \
  --client-state "$MSGRAPH_WEBHOOK_CLIENT_STATE"
```

:::warning Graph è®¢é˜…åœ¨ 72 å°æ—¶åŽè¿‡æœŸ

Microsoft Graph å°† webhook è®¢é˜…ä¸Šé™è®¾ä¸º 72 å°æ—¶ï¼Œä¸”ä¸ä¼šè‡ªåŠ¨ç»­æœŸã€‚ä½ **å¿…é¡»**åœ¨ä¸Šçº¿å‰è°ƒåº¦ `zed teams-pipeline maintain-subscriptions`ï¼Œå¦åˆ™é€šçŸ¥å°†åœ¨æ‰‹åŠ¨åˆ›å»ºè®¢é˜…ä¸‰å¤©åŽé™é»˜åœæ­¢ã€‚è¯·å‚é˜…è¿ç»´æ‰‹å†Œä¸­çš„[è‡ªåŠ¨åŒ–è®¢é˜…ç»­æœŸ](/guides/operate-teams-meeting-pipeline#automating-subscription-renewal-required-for-production)â€”â€”æä¾›ä¸‰ç§æ–¹æ¡ˆï¼ˆZed cronã€systemd timerã€æ™®é€š crontabï¼‰ã€‚

:::

å…³äºŽè®¢é˜…ç»´æŠ¤å’Œä¸Šçº¿åŽçš„è¿ç»´æµç¨‹ï¼Œè¯·ç»§ç»­é˜…è¯»æŒ‡å—ï¼š[è¿ç»´ Teams ä¼šè®®æµæ°´çº¿](/guides/operate-teams-meeting-pipeline)ã€‚

## éªŒè¯

è¿è¡Œå†…ç½®éªŒè¯å¿«ç…§ï¼š

```bash
zed teams-pipeline validate
```

å¸¸ç”¨è¾…åŠ©æ£€æŸ¥ï¼š

```bash
zed teams-pipeline token-health
zed teams-pipeline subscriptions
```

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | æ£€æŸ¥é¡¹ |
|---------|---------------|
| Graph webhook éªŒè¯å¤±è´¥ | ç¡®è®¤å…¬ç½‘ URL æ­£ç¡®ä¸”å¯è®¿é—®ï¼Œå¹¶ç¡®è®¤ Graph è°ƒç”¨çš„è·¯å¾„ä¸º `/msgraph/webhook` |
| `zed teams-pipeline list` ä¸­æœªå‡ºçŽ°ä»»åŠ¡ | ç¡®è®¤ `msgraph_webhook` å·²å¯ç”¨ï¼Œä¸”è®¢é˜…æŒ‡å‘æ­£ç¡®çš„é€šçŸ¥ URL |
| è½¬å½•ä¼˜å…ˆä»ŽæœªæˆåŠŸ | æ£€æŸ¥è½¬å½•èµ„æºçš„ Graph æƒé™ï¼Œä»¥åŠè¯¥ä¼šè®®æ˜¯å¦å­˜åœ¨è½¬å½•æ–‡ä»¶ |
| å½•éŸ³å›žé€€å¤±è´¥ | ç¡®è®¤å·²å®‰è£… `ffmpeg`ï¼Œä¸” Graph åº”ç”¨å¯è®¿é—®å½•éŸ³æ–‡ä»¶ |
| Teams æ‘˜è¦æŠ•é€’å¤±è´¥ | é‡æ–°æ£€æŸ¥ `delivery_mode`ã€ç›®æ ‡ ID åŠ Teams è®¤è¯é…ç½® |

## ç›¸å…³æ–‡æ¡£

- [Microsoft Teams bot é…ç½®](/user-guide/messaging/teams)
- [è¿ç»´ Teams ä¼šè®®æµæ°´çº¿](/guides/operate-teams-meeting-pipeline)