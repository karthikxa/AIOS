---
sidebar_position: 5
title: "Microsoft Teams"
description: "å°† Zed Agent è®¾ç½®ä¸º Microsoft Teams æœºå™¨äºº"
---

# Microsoft Teams è®¾ç½®

å°† Zed Agent ä½œä¸ºæœºå™¨äººæŽ¥å…¥ Microsoft Teamsã€‚ä¸Ž Slack çš„ Socket Mode ä¸åŒï¼ŒTeams é€šè¿‡è°ƒç”¨**å…¬å¼€ HTTPS webhook**ï¼ˆé’©å­ï¼‰æ¥æŠ•é€’æ¶ˆæ¯ï¼Œå› æ­¤ä½ çš„å®žä¾‹éœ€è¦ä¸€ä¸ªå¯å…¬å¼€è®¿é—®çš„ç«¯ç‚¹â€”â€”æœ¬åœ°å¼€å‘æ—¶ä½¿ç”¨å¼€å‘éš§é“ï¼Œç”Ÿäº§çŽ¯å¢ƒä½¿ç”¨çœŸå®žåŸŸåã€‚

å¦‚æžœä½ éœ€è¦çš„æ˜¯æ¥è‡ª Microsoft Graph äº‹ä»¶çš„ä¼šè®®æ‘˜è¦ï¼Œè€Œéžæ™®é€šçš„æœºå™¨äººå¯¹è¯ï¼Œè¯·ä½¿ç”¨ä¸“ç”¨è®¾ç½®é¡µé¢ï¼š[Teams ä¼šè®®](/user-guide/messaging/teams-meetings)ã€‚

## æœºå™¨äººçš„å“åº”æ–¹å¼

| åœºæ™¯ | è¡Œä¸º |
|------|------|
| **ä¸ªäººèŠå¤©ï¼ˆç§ä¿¡ï¼‰** | æœºå™¨äººå“åº”æ¯ä¸€æ¡æ¶ˆæ¯ï¼Œæ— éœ€ @æåŠã€‚ |
| **ç¾¤èŠ** | æœºå™¨äººä»…åœ¨è¢« @æåŠæ—¶å“åº”ã€‚ |
| **é¢‘é“** | æœºå™¨äººä»…åœ¨è¢« @æåŠæ—¶å“åº”ã€‚ |

Teams å°† @æåŠä½œä¸ºæ™®é€šæ¶ˆæ¯æŠ•é€’ï¼Œå…¶ä¸­åŒ…å« `<at>BotName</at>` æ ‡ç­¾ï¼ŒZed åœ¨å¤„ç†å‰ä¼šè‡ªåŠ¨åŽ»é™¤è¿™äº›æ ‡ç­¾ã€‚

---

## ç¬¬ä¸€æ­¥ï¼šå®‰è£… Teams CLI

`@microsoft/teams.cli` å¯è‡ªåŠ¨å®Œæˆæœºå™¨äººæ³¨å†Œï¼Œæ— éœ€è¿›å…¥ Azure é—¨æˆ·ã€‚

```bash
npm install -g @microsoft/teams.cli@preview
teams login
```

éªŒè¯ç™»å½•çŠ¶æ€å¹¶æŸ¥æ‰¾ä½ è‡ªå·±çš„ AAD å¯¹è±¡ IDï¼ˆ`TEAMS_ALLOWED_USERS` éœ€è¦ç”¨åˆ°ï¼‰ï¼š

```bash
teams status --verbose
```

---

## ç¬¬äºŒæ­¥ï¼šæš´éœ² Webhook ç«¯å£

Teams æ— æ³•å‘ `localhost` æŠ•é€’æ¶ˆæ¯ã€‚æœ¬åœ°å¼€å‘æ—¶ï¼Œä½¿ç”¨ä»»æ„éš§é“å·¥å…·èŽ·å–ä¸€ä¸ªå…¬å¼€çš„ HTTPS URLã€‚é»˜è®¤ç«¯å£ä¸º `3978`ï¼Œå¦‚éœ€æ›´æ”¹å¯é€šè¿‡ `TEAMS_PORT` è®¾ç½®ã€‚

```bash
# devtunnelï¼ˆMicrosoft å®˜æ–¹ï¼‰
devtunnel create zed-bot --allow-anonymous
devtunnel port create zed-bot -p 3978 --protocol https  # å¦‚å·²ä¿®æ”¹ TEAMS_PORTï¼Œè¯·æ›¿æ¢ 3978
devtunnel host zed-bot

# ngrok
ngrok http 3978  # å¦‚å·²ä¿®æ”¹ TEAMS_PORTï¼Œè¯·æ›¿æ¢ 3978

# cloudflared
cloudflared tunnel --url http://localhost:3978  # å¦‚å·²ä¿®æ”¹ TEAMS_PORTï¼Œè¯·æ›¿æ¢ 3978
```

ä»Žè¾“å‡ºä¸­å¤åˆ¶ `https://` URLâ€”â€”ä¸‹ä¸€æ­¥ä¼šç”¨åˆ°ã€‚å¼€å‘æœŸé—´ä¿æŒéš§é“è¿è¡Œã€‚

ç”Ÿäº§çŽ¯å¢ƒè¯·å°†æœºå™¨äººç«¯ç‚¹æŒ‡å‘æœåŠ¡å™¨çš„å…¬å¼€åŸŸåï¼ˆå‚è§[ç”Ÿäº§éƒ¨ç½²](#production-deployment)ï¼‰ã€‚

---

## ç¬¬ä¸‰æ­¥ï¼šåˆ›å»ºæœºå™¨äºº

```bash
teams app create \
  --name "Zed" \
  --endpoint "https://<your-tunnel-url>/api/messages"
```

CLI ä¼šè¾“å‡ºä½ çš„ `CLIENT_ID`ã€`CLIENT_SECRET` å’Œ `TENANT_ID`ï¼Œä»¥åŠç¬¬å…­æ­¥æ‰€éœ€çš„å®‰è£…é“¾æŽ¥ã€‚è¯·ä¿å­˜å®¢æˆ·ç«¯å¯†é’¥â€”â€”å®ƒä¸ä¼šå†æ¬¡æ˜¾ç¤ºã€‚

---

## ç¬¬å››æ­¥ï¼šé…ç½®çŽ¯å¢ƒå˜é‡

æ·»åŠ åˆ° `~/.zed/.env`ï¼š

```bash
# å¿…å¡«
TEAMS_CLIENT_ID=<your-client-id>
TEAMS_CLIENT_SECRET=<your-client-secret>
TEAMS_TENANT_ID=<your-tenant-id>

# é™åˆ¶ç‰¹å®šç”¨æˆ·è®¿é—®ï¼ˆæŽ¨èï¼‰
# ä½¿ç”¨ `teams status --verbose` èŽ·å– AAD å¯¹è±¡ ID
TEAMS_ALLOWED_USERS=<your-aad-object-id>
```

---

## ç¬¬äº”æ­¥ï¼šå¯åŠ¨ Gateway

```bash
ZED_UID=$(id -u) ZED_GID=$(id -g) docker compose up -d gateway
```

æ­¤å‘½ä»¤å¯åŠ¨ gatewayã€‚é»˜è®¤ webhook ç«¯å£ä¸º `3978`ï¼ˆå¯é€šè¿‡ `TEAMS_PORT` è¦†ç›–ï¼‰ã€‚æ£€æŸ¥è¿è¡ŒçŠ¶æ€ï¼š

```bash
curl http://localhost:3978/health   # åº”è¿”å›žï¼šok
docker logs -f zed
```

æŸ¥æ‰¾ä»¥ä¸‹æ—¥å¿—ï¼š
```
[teams] Webhook server listening on 0.0.0.0:3978/api/messages
```

---

## ç¬¬å…­æ­¥ï¼šåœ¨ Teams ä¸­å®‰è£…åº”ç”¨

```bash
teams app get <teamsAppId> --install-link
```

åœ¨æµè§ˆå™¨ä¸­æ‰“å¼€è¾“å‡ºçš„é“¾æŽ¥â€”â€”å®ƒä¼šç›´æŽ¥åœ¨ Teams å®¢æˆ·ç«¯ä¸­æ‰“å¼€ã€‚å®‰è£…å®ŒæˆåŽï¼Œå‘æœºå™¨äººå‘é€ä¸€æ¡ç§ä¿¡ï¼Œå³å¯å¼€å§‹ä½¿ç”¨ã€‚

---

## é…ç½®å‚è€ƒ

### çŽ¯å¢ƒå˜é‡

| å˜é‡ | è¯´æ˜Ž |
|------|------|
| `TEAMS_CLIENT_ID` | Azure AD åº”ç”¨ï¼ˆå®¢æˆ·ç«¯ï¼‰ID |
| `TEAMS_CLIENT_SECRET` | Azure AD å®¢æˆ·ç«¯å¯†é’¥ |
| `TEAMS_TENANT_ID` | Azure AD ç§Ÿæˆ· ID |
| `TEAMS_ALLOWED_USERS` | å…è®¸ä½¿ç”¨æœºå™¨äººçš„ AAD å¯¹è±¡ IDï¼Œé€—å·åˆ†éš” |
| `TEAMS_ALLOW_ALL_USERS` | è®¾ä¸º `true` å¯è·³è¿‡ç™½åå•ï¼Œå…è®¸æ‰€æœ‰äººä½¿ç”¨ |
| `TEAMS_HOME_CHANNEL` | ç”¨äºŽ cron/ä¸»åŠ¨æ¶ˆæ¯æŠ•é€’çš„ä¼šè¯ ID |
| `TEAMS_HOME_CHANNEL_NAME` | ä¸»é¢‘é“çš„æ˜¾ç¤ºåç§° |
| `TEAMS_PORT` | Webhook ç«¯å£ï¼ˆé»˜è®¤ï¼š`3978`ï¼‰ |

### config.yaml

ä¹Ÿå¯é€šè¿‡ `~/.zed/config.yaml` è¿›è¡Œé…ç½®ï¼š

```yaml
platforms:
  teams:
    enabled: true
    extra:
      client_id: "your-client-id"
      client_secret: "your-secret"
      tenant_id: "your-tenant-id"
      port: 3978
```

---

## åŠŸèƒ½ç‰¹æ€§

### äº¤äº’å¼å®¡æ‰¹å¡ç‰‡

å½“ Agent éœ€è¦æ‰§è¡Œå¯èƒ½å­˜åœ¨é£Žé™©çš„å‘½ä»¤æ—¶ï¼Œå®ƒä¼šå‘é€ä¸€å¼ å¸¦æœ‰å››ä¸ªæŒ‰é’®çš„ Adaptive Cardï¼Œè€Œä¸æ˜¯è¦æ±‚ä½ è¾“å…¥ `/approve`ï¼š

- **Allow Once**â€”â€”ä»…æ‰¹å‡†æ­¤æ¬¡ç‰¹å®šå‘½ä»¤
- **Allow Session**â€”â€”åœ¨æœ¬æ¬¡ä¼šè¯æœŸé—´æ‰¹å‡†æ­¤æ¨¡å¼
- **Always Allow**â€”â€”æ°¸ä¹…æ‰¹å‡†æ­¤æ¨¡å¼
- **Deny**â€”â€”æ‹’ç»è¯¥å‘½ä»¤

ç‚¹å‡»æŒ‰é’®å³å¯å†…è”å®Œæˆå®¡æ‰¹ï¼Œå¡ç‰‡ä¼šè¢«æ›¿æ¢ä¸ºå†³ç­–ç»“æžœã€‚

### ä¼šè®®æ‘˜è¦æŠ•é€’ï¼ˆTeams ä¼šè®® Pipelineï¼‰

å½“ [Teams ä¼šè®® pipeline æ’ä»¶](/user-guide/messaging/msgraph-webhook)å¯ç”¨åŽï¼Œæ­¤é€‚é…å™¨åŒæ—¶è´Ÿè´£ä¼šè®®æ‘˜è¦çš„å‡ºç«™æŠ•é€’â€”â€”ä¸€ä¸ª Teams é›†æˆé¢ï¼Œè€Œéžä¸¤ä¸ªã€‚ä¼šè®®è½¬å½•æ‘˜è¦ç”ŸæˆåŽï¼Œå†™å…¥å™¨ä¼šå°†æ‘˜è¦å‘å¸ƒåˆ°ä½ æŒ‡å®šçš„ Teams ç›®æ ‡ã€‚

Pipeline æ‘˜è¦æŠ•é€’åœ¨ `teams` å¹³å°æ¡ç›®ä¸‹ä¸Žæœºå™¨äººé…ç½®å¹¶åˆ—é…ç½®ï¼š

```yaml
platforms:
  teams:
    enabled: true
    extra:
      # çŽ°æœ‰æœºå™¨äººé…ç½®ï¼ˆclient_idã€client_secretã€tenant_idã€portï¼‰...

      # ä¼šè®®æ‘˜è¦æŠ•é€’ï¼ˆä»…åœ¨ teams_pipeline æ’ä»¶å¯ç”¨æ—¶ç”Ÿæ•ˆï¼‰
      delivery_mode: "graph"       # æˆ– "incoming_webhook"
      # å¯¹äºŽ delivery_mode: graph â€” é€‰æ‹©å…¶ä¸­ä¸€é¡¹ï¼š
      chat_id: "19:meeting_..."    # å‘å¸ƒåˆ° Teams èŠå¤©
      # team_id: "..."             # æˆ–å‘å¸ƒåˆ°é¢‘é“
      # channel_id: "..."
      # access_token: "..."        # å¯é€‰ï¼›å›žé€€åˆ° MSGRAPH_* åº”ç”¨å‡­æ®
      # å¯¹äºŽ delivery_mode: incoming_webhookï¼š
      # incoming_webhook_url: "https://outlook.office.com/webhook/..."
```

| æ¨¡å¼ | é€‚ç”¨åœºæ™¯ | æƒè¡¡ |
|------|----------|------|
| `incoming_webhook` | ä½¿ç”¨ Teams ç”Ÿæˆçš„é™æ€ URLï¼Œç®€å•åœ°å°†æ‘˜è¦å‘å¸ƒåˆ°æŸä¸ªé¢‘é“ã€‚ | ä¸æ”¯æŒå›žå¤çº¿ç¨‹å’Œè¡¨æƒ…å›žåº”ï¼Œæ˜¾ç¤ºä¸º webhook é…ç½®çš„èº«ä»½ã€‚ |
| `graph` | é€šè¿‡ Microsoft Graph ä»¥æœºå™¨äººèº«ä»½å‘å¸ƒå¸¦çº¿ç¨‹çš„é¢‘é“å¸–å­æˆ– 1:1/ç¾¤èŠæ¶ˆæ¯ã€‚ | éœ€è¦å®Œæˆ [Graph åº”ç”¨æ³¨å†Œ](/guides/microsoft-graph-app-registration)ï¼Œå¹¶å…·å¤‡ `ChannelMessage.Send`ï¼ˆé¢‘é“ï¼‰æˆ– `Chat.ReadWrite.All`ï¼ˆèŠå¤©ï¼‰åº”ç”¨æƒé™ã€‚ |

å¦‚æžœ `teams_pipeline` æ’ä»¶**æœªå¯ç”¨**ï¼Œè¿™äº›è®¾ç½®ä¸ä¼šç”Ÿæ•ˆâ€”â€”å®ƒä»¬ä»…åœ¨ pipeline è¿è¡Œæ—¶ç»‘å®šåˆ° Graph webhook å…¥å£æ—¶æ‰ä¼šæ¿€æ´»ã€‚

---

## ç”Ÿäº§éƒ¨ç½²

å¯¹äºŽæ°¸ä¹…æœåŠ¡å™¨ï¼Œè·³è¿‡ devtunnelï¼Œä½¿ç”¨æœåŠ¡å™¨çš„å…¬å¼€ HTTPS ç«¯ç‚¹æ³¨å†Œæœºå™¨äººï¼š

```bash
teams app create \
  --name "Zed" \
  --endpoint "https://your-domain.com/api/messages"
```

å¦‚æžœæœºå™¨äººå·²åˆ›å»ºï¼Œåªéœ€æ›´æ–°ç«¯ç‚¹ï¼š

```bash
teams app update --id <teamsAppId> --endpoint "https://your-domain.com/api/messages"
```

ç¡®ä¿ä½ é…ç½®çš„ç«¯å£ï¼ˆ`TEAMS_PORT`ï¼Œé»˜è®¤ `3978`ï¼‰å¯ä»Žäº’è”ç½‘è®¿é—®ï¼Œä¸” TLS è¯ä¹¦æœ‰æ•ˆâ€”â€”Teams ä¼šæ‹’ç»è‡ªç­¾åè¯ä¹¦ã€‚

---

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | è§£å†³æ–¹æ¡ˆ |
|------|----------|
| `health` ç«¯ç‚¹æ­£å¸¸ä½†æœºå™¨äººä¸å“åº” | æ£€æŸ¥éš§é“æ˜¯å¦ä»åœ¨è¿è¡Œï¼Œä»¥åŠæœºå™¨äººçš„æ¶ˆæ¯ç«¯ç‚¹æ˜¯å¦ä¸Žéš§é“ URL åŒ¹é… |
| æ—¥å¿—ä¸­å‡ºçŽ° `KeyError: 'teams'` | é‡å¯å®¹å™¨â€”â€”æ­¤é—®é¢˜å·²åœ¨å½“å‰ç‰ˆæœ¬ä¸­ä¿®å¤ |
| æœºå™¨äººå“åº”æ—¶å‡ºçŽ°è®¤è¯é”™è¯¯ | éªŒè¯ `TEAMS_CLIENT_ID`ã€`TEAMS_CLIENT_SECRET` å’Œ `TEAMS_TENANT_ID` æ˜¯å¦å‡å·²æ­£ç¡®è®¾ç½® |
| `No inference provider configured` | æ£€æŸ¥ `~/.zed/.env` ä¸­æ˜¯å¦è®¾ç½®äº† `ANTHROPIC_API_KEY`ï¼ˆæˆ–å…¶ä»–æä¾›å•†å¯†é’¥ï¼‰ |
| æœºå™¨äººæ”¶åˆ°æ¶ˆæ¯ä½†å¿½ç•¥å®ƒä»¬ | ä½ çš„ AAD å¯¹è±¡ ID å¯èƒ½ä¸åœ¨ `TEAMS_ALLOWED_USERS` ä¸­ã€‚è¿è¡Œ `teams status --verbose` æŸ¥æ‰¾ |
| éš§é“ URL åœ¨é‡å¯åŽå˜æ›´ | ä½¿ç”¨å‘½åéš§é“ï¼ˆ`devtunnel create zed-bot`ï¼‰æ—¶ï¼Œdevtunnel URL æ˜¯æŒä¹…çš„ã€‚ngrok å’Œ cloudflared æ¯æ¬¡è¿è¡Œéƒ½ä¼šç”Ÿæˆæ–° URLï¼ˆé™¤éžä½ æœ‰ä»˜è´¹è®¡åˆ’ï¼‰â€”â€”URL å˜æ›´æ—¶è¯·ç”¨ `teams app update` æ›´æ–°æœºå™¨äººç«¯ç‚¹ |
| Teams æ˜¾ç¤º"æ­¤æœºå™¨äººæœªå“åº”" | Webhook è¿”å›žäº†é”™è¯¯ã€‚æ£€æŸ¥ `docker logs zed` ä¸­çš„é”™è¯¯å †æ ˆ |
| æ—¥å¿—ä¸­å‡ºçŽ° `[teams] Failed to connect` | SDK è®¤è¯å¤±è´¥ã€‚ä»”ç»†æ£€æŸ¥å‡­æ®ï¼Œå¹¶ç¡®è®¤ç§Ÿæˆ· ID ä¸Ž `teams login` æ—¶ä½¿ç”¨çš„è´¦æˆ·åŒ¹é… |

---

## å®‰å…¨æ€§

:::warning
**åŠ¡å¿…è®¾ç½® `TEAMS_ALLOWED_USERS`**ï¼Œå¡«å…¥æŽˆæƒç”¨æˆ·çš„ AAD å¯¹è±¡ IDã€‚å¦åˆ™ï¼Œä»»ä½•èƒ½æ‰¾åˆ°æˆ–å®‰è£…ä½ çš„æœºå™¨äººçš„äººéƒ½å¯ä»¥ä¸Žå…¶äº¤äº’ã€‚

å°† `TEAMS_CLIENT_SECRET` è§†åŒå¯†ç å¯¹å¾…â€”â€”å®šæœŸé€šè¿‡ Azure é—¨æˆ·æˆ– Teams CLI è¿›è¡Œè½®æ¢ã€‚
:::

- å°†å‡­æ®å­˜å‚¨åœ¨æƒé™ä¸º `600` çš„ `~/.zed/.env` ä¸­ï¼ˆ`chmod 600 ~/.zed/.env`ï¼‰
- æœºå™¨äººä»…æŽ¥å— `TEAMS_ALLOWED_USERS` ä¸­ç”¨æˆ·çš„æ¶ˆæ¯ï¼›æœªæŽˆæƒçš„æ¶ˆæ¯ä¼šè¢«é™é»˜ä¸¢å¼ƒ
- ä½ çš„å…¬å¼€ç«¯ç‚¹ï¼ˆ`/api/messages`ï¼‰ç”± Teams Bot Framework è¿›è¡Œè®¤è¯â€”â€”ä¸å«æœ‰æ•ˆ JWT çš„è¯·æ±‚ä¼šè¢«æ‹’ç»

## ç›¸å…³æ–‡æ¡£

- [Teams ä¼šè®®](/user-guide/messaging/teams-meetings)
- [è¿è¥ Teams ä¼šè®® Pipeline](/guides/operate-teams-meeting-pipeline)