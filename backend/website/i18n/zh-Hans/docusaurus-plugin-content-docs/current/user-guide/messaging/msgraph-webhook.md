---
sidebar_position: 23
title: "Microsoft Graph Webhook ç›‘å¬å™¨"
description: "åœ¨ Zed ä¸­æŽ¥æ”¶ Microsoft Graph å˜æ›´é€šçŸ¥ï¼ˆä¼šè®®ã€æ—¥åŽ†ã€èŠå¤©ç­‰ï¼‰"
---

# Microsoft Graph Webhook ç›‘å¬å™¨

`msgraph_webhook` gateway å¹³å°æ˜¯ä¸€ä¸ªå…¥ç«™äº‹ä»¶ç›‘å¬å™¨ã€‚å®ƒæ˜¯ Zed æŽ¥æ”¶æ¥è‡ª Microsoft Graph çš„**å˜æ›´é€šçŸ¥**çš„æ–¹å¼â€”â€”"ä¸€ä¸ª Teams ä¼šè®®å·²ç»“æŸ"ã€"æ­¤èŠå¤©ä¸­æ”¶åˆ°äº†ä¸€æ¡æ–°æ¶ˆæ¯"ã€"æ­¤æ—¥åŽ†äº‹ä»¶å·²æ›´æ–°"ã€‚ä¸Ž `teams` å¹³å°ï¼ˆç”¨æˆ·å‘å…¶å‘é€æ¶ˆæ¯çš„èŠå¤©æœºå™¨äººï¼‰ä¸åŒâ€”â€”æ­¤å¹³å°æ˜¯ M365 å‘ŠçŸ¥ Zed æŸäº‹å·²å‘ç”Ÿï¼Œè€Œéžæ¥è‡ªç”¨æˆ·çš„æ¶ˆæ¯ã€‚

ç›®å‰ä¸»è¦çš„æ¶ˆè´¹è€…æ˜¯ Teams ä¼šè®®æ‘˜è¦æµæ°´çº¿ï¼šGraph åœ¨ä¼šè®®äº§ç”Ÿè½¬å½•æ–‡æœ¬æ—¶å‘å‡ºé€šçŸ¥ï¼Œæµæ°´çº¿èŽ·å–è¯¥å†…å®¹ï¼ŒZed å°†æ‘˜è¦å‘å›ž Teamsã€‚å…¶ä»– Graph èµ„æºï¼ˆ`/chats/.../messages`ã€`/users/.../events`ï¼‰ä½¿ç”¨åŒä¸€ç›‘å¬å™¨â€”â€”æµæ°´çº¿æ¶ˆè´¹è€…é€šè¿‡å„è‡ªçš„ PR æŽ¥å…¥ã€‚

## å‰ææ¡ä»¶

- Microsoft Graph åº”ç”¨å‡­æ®â€”â€”[æ³¨å†Œ Microsoft Graph åº”ç”¨ç¨‹åº](/guides/microsoft-graph-app-registration)
- ä¸€ä¸ª Microsoft Graph å¯è®¿é—®çš„**å…¬å¼€ HTTPS URL**ï¼ˆGraph ä¸ä¼šè°ƒç”¨ç§æœ‰ç«¯ç‚¹ï¼‰ã€‚æµ‹è¯•æ—¶å¯ä½¿ç”¨ dev tunnelï¼›ç”Ÿäº§çŽ¯å¢ƒéœ€è¦å…·æœ‰æœ‰æ•ˆè¯ä¹¦çš„çœŸå®žåŸŸåã€‚
- ä¸€ä¸ªå¼ºå…±äº«å¯†é’¥ï¼Œç”¨ä½œ `clientState` çš„å€¼ã€‚ä½¿ç”¨ `openssl rand -hex 32` ç”Ÿæˆï¼Œå¹¶ä»¥ `MSGRAPH_WEBHOOK_CLIENT_STATE` å†™å…¥ `~/.zed/.env`ã€‚

## å¿«é€Ÿå¼€å§‹

æœ€å°åŒ– `~/.zed/config.yaml`ï¼š

```yaml
platforms:
  msgraph_webhook:
    enabled: true
    extra:
      port: 8646
      client_state: "replace-with-a-strong-secret"
      accepted_resources:
        - "communications/onlineMeetings"
```

æˆ–é€šè¿‡ `~/.zed/.env` ä¸­çš„çŽ¯å¢ƒå˜é‡ï¼ˆå¯åŠ¨æ—¶è‡ªåŠ¨åˆå¹¶ï¼‰ï¼š

```bash
MSGRAPH_WEBHOOK_ENABLED=true
MSGRAPH_WEBHOOK_PORT=8646
MSGRAPH_WEBHOOK_CLIENT_STATE=<generate-with-openssl-rand-hex-32>
MSGRAPH_WEBHOOK_ACCEPTED_RESOURCES=communications/onlineMeetings
```

å¯åŠ¨ gatewayï¼š`zed gateway run`ã€‚ç›‘å¬å™¨æš´éœ²ä»¥ä¸‹ç«¯ç‚¹ï¼š

- `POST /msgraph/webhook` â€” æ¥è‡ª Graph çš„å˜æ›´é€šçŸ¥
- `GET /msgraph/webhook?validationToken=...` â€” Graph è®¢é˜…éªŒè¯æ¡æ‰‹
- `GET /health` â€” å°±ç»ªæŽ¢é’ˆï¼ŒåŒ…å«å·²æŽ¥å—/é‡å¤è®¡æ•°å™¨

å°†ç›‘å¬å™¨å…¬å¼€æš´éœ²ï¼ˆåå‘ä»£ç†ã€dev tunnelã€ingressï¼‰ã€‚Graph è®¢é˜…çš„é€šçŸ¥ URL ä¸ºä½ çš„å…¬å¼€ HTTPS æºåœ°å€åŠ ä¸Š `/msgraph/webhook`ï¼š

```
https://ops.example.com/msgraph/webhook
```

## é…ç½®

æ‰€æœ‰è®¾ç½®ä½äºŽ `platforms.msgraph_webhook.extra` ä¸‹ï¼š

| è®¾ç½® | é»˜è®¤å€¼ | è¯´æ˜Ž |
|------|--------|------|
| `host` | `0.0.0.0` | HTTP ç›‘å¬å™¨çš„ç»‘å®šåœ°å€ã€‚ |
| `port` | `8646` | ç»‘å®šç«¯å£ã€‚ |
| `webhook_path` | `/msgraph/webhook` | Graph POST è¯·æ±‚çš„ URL è·¯å¾„ã€‚ |
| `health_path` | `/health` | å°±ç»ªç«¯ç‚¹ã€‚ |
| `client_state` | â€” | Graph åœ¨æ¯æ¡é€šçŸ¥ä¸­å›žä¼ çš„å…±äº«å¯†é’¥ã€‚ä½¿ç”¨ `hmac.compare_digest` è¿›è¡Œæ¯”è¾ƒâ€”â€”ä½¿ç”¨ `openssl rand -hex 32` ç”Ÿæˆã€‚ |
| `accepted_resources` | `[]`ï¼ˆæŽ¥å—å…¨éƒ¨ï¼‰ | Graph èµ„æºè·¯å¾„/æ¨¡å¼çš„ç™½åå•ã€‚æœ«å°¾ `*` ä½œä¸ºå‰ç¼€åŒ¹é…ã€‚å¯å®¹å¿å¼€å¤´çš„ `/`ã€‚ç¤ºä¾‹ï¼š`["communications/onlineMeetings", "chats/*/messages"]`ã€‚ |
| `max_seen_receipts` | `5000` | é€šçŸ¥ ID çš„åŽ»é‡ç¼“å­˜å¤§å°ã€‚è¾¾åˆ°ä¸Šé™æ—¶æ·˜æ±°æœ€æ—§çš„æ¡ç›®ã€‚ |
| `allowed_source_cidrs` | `[]`ï¼ˆå…è®¸å…¨éƒ¨ï¼‰ | å¯é€‰çš„æº IP ç™½åå•ã€‚è§ä¸‹æ–‡ã€‚ |

å¤§å¤šæ•°è®¾ç½®ä¹Ÿæœ‰å¯¹åº”çš„çŽ¯å¢ƒå˜é‡ï¼ˆ`MSGRAPH_WEBHOOK_*`ï¼‰ï¼Œåœ¨ gateway å¯åŠ¨æ—¶åˆå¹¶åˆ°é…ç½®ä¸­ï¼ˆä¾‹å¤–æ˜¯ `host`ï¼Œå®ƒä»…å¯é€šè¿‡é…ç½®æ–‡ä»¶è®¾ç½®â€”â€”å‚è§ä¸Šæ–¹è¯´æ˜Žï¼‰â€”â€”å‚è§[çŽ¯å¢ƒå˜é‡å‚è€ƒ](/reference/environment-variables#microsoft-graph-teams-meetings)ã€‚

## å®‰å…¨åŠ å›º

### clientState æ˜¯ä¸»è¦çš„è®¤è¯æ£€æŸ¥

æ¯æ¡ Graph é€šçŸ¥éƒ½åŒ…å«ä½ åœ¨è®¢é˜…æ—¶æ³¨å†Œçš„ `clientState` å­—ç¬¦ä¸²ã€‚ç›‘å¬å™¨ä½¿ç”¨æ—¶åºå®‰å…¨æ¯”è¾ƒæ‹’ç»ä»»ä½• `clientState` ä¸åŒ¹é…çš„é€šçŸ¥ã€‚è¿™æ˜¯ Microsoft çš„å®˜æ–¹æœºåˆ¶â€”â€”è¯·å°†è¯¥å€¼è§†ä¸ºå¼ºå…±äº«å¯†é’¥ã€‚

å¦‚æžœæœªè®¾ç½® `client_state`ï¼Œç›‘å¬å™¨å°†æŽ¥å—æ‰€æœ‰æ ¼å¼æ­£ç¡®çš„ POST è¯·æ±‚ã€‚**ç”Ÿäº§çŽ¯å¢ƒä¸­è¯·å‹¿åœ¨æœªè®¾ç½®çš„æƒ…å†µä¸‹è¿è¡Œã€‚**

### æº IP ç™½åå•ï¼ˆç”Ÿäº§éƒ¨ç½²ï¼‰

åœ¨ç”Ÿäº§çŽ¯å¢ƒä¸­ï¼Œå°†ç›‘å¬å™¨é™åˆ¶ä¸º Microsoft å…¬å¸ƒçš„ Graph webhook æº IP èŒƒå›´ã€‚Microsoft åœ¨ [Office 365 IP åœ°å€å’Œ URL Web æœåŠ¡](https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges)ä¸­è®°å½•äº†å‡ºå£èŒƒå›´ã€‚é…ç½®æ–¹å¼å¦‚ä¸‹ï¼š

```yaml
platforms:
  msgraph_webhook:
    enabled: true
    extra:
      client_state: "..."
      allowed_source_cidrs:
        - "52.96.0.0/14"
        - "52.104.0.0/14"
        # ...æ·»åŠ å½“å‰ Microsoft 365 "Common" + "Teams" ç±»åˆ«çš„å‡ºå£èŒƒå›´
```

æˆ–é€šè¿‡çŽ¯å¢ƒå˜é‡ï¼š

```bash
MSGRAPH_WEBHOOK_ALLOWED_SOURCE_CIDRS="52.96.0.0/14,52.104.0.0/14"
```

ç©ºç™½åå• = æŽ¥å—æ¥è‡ªä»»ä½•åœ°å€çš„è¯·æ±‚ï¼ˆé»˜è®¤ï¼›ä¿ç•™ dev tunnel å·¥ä½œæµï¼‰ã€‚æ— æ•ˆçš„ CIDR å­—ç¬¦ä¸²ä¼šè®°å½•è­¦å‘Šå¹¶è¢«å¿½ç•¥ã€‚**è¯·æ¯å­£åº¦å®¡æŸ¥ Microsoft IP åˆ—è¡¨**â€”â€”å®ƒä¼šå˜æ›´ã€‚

### HTTPS ç»ˆæ­¢

ç›‘å¬å™¨ä½¿ç”¨çº¯ HTTPã€‚åœ¨ä½ çš„åå‘ä»£ç†ï¼ˆCaddyã€Nginxã€Cloudflare Tunnelã€AWS ALBï¼‰å¤„ç»ˆæ­¢ TLSï¼Œå¹¶é€šè¿‡æœ¬åœ°ç½‘ç»œä»£ç†åˆ°ç›‘å¬å™¨ã€‚Graph æ‹’ç»å‘éž HTTPS ç«¯ç‚¹æŠ•é€’ï¼Œå› æ­¤æ¥è‡ª Graph çš„æœªåŠ å¯†æµé‡ä¸å­˜åœ¨å¯è¾¾è·¯å¾„ã€‚

### å“åº”è§„èŒƒ

æˆåŠŸæ—¶ï¼Œç›‘å¬å™¨è¿”å›ž `202 Accepted` ä¸”å“åº”ä½“ä¸ºç©ºâ€”â€”å†…éƒ¨è®¡æ•°å™¨ä¸ä¼šå‡ºçŽ°åœ¨å“åº”ä¸­ã€‚è¿ç»´äººå‘˜å¯é€šè¿‡ `/health` è§‚å¯Ÿè®¡æ•°ã€‚

çŠ¶æ€ç è¯´æ˜Žï¼š

| ç»“æžœ | çŠ¶æ€ç  |
|------|--------|
| é€šçŸ¥å·²æŽ¥å—æˆ–å·²åŽ»é‡ | 202 |
| éªŒè¯æ¡æ‰‹ï¼ˆå¸¦ `validationToken` çš„ GETï¼‰ | 200ï¼ˆåŽŸæ ·å›žä¼  tokenï¼‰ |
| æ‰¹æ¬¡ä¸­æ‰€æœ‰æ¡ç›®çš„ clientState å‡å¤±è´¥ | 403 |
| JSON æ ¼å¼é”™è¯¯ / ç¼ºå°‘ `value` æ•°ç»„ / æœªçŸ¥èµ„æº | 400 |
| æº IP ä¸åœ¨ç™½åå•ä¸­ | 403 |
| ä¸å¸¦ `validationToken` çš„è£¸ GET | 400 |

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | æ£€æŸ¥é¡¹ |
|------|--------|
| Graph è®¢é˜…éªŒè¯å¤±è´¥ | å…¬å¼€ URL å¯è®¿é—®ï¼Œ`/msgraph/webhook` è·¯å¾„åŒ¹é…ï¼Œå¸¦ `validationToken` çš„ GET åœ¨ 10 ç§’å†…ä»¥ `text/plain` åŽŸæ ·å›žä¼  tokenã€‚ |
| é€šçŸ¥ POST æˆåŠŸä½†æ— å†…å®¹è¢«æ‘„å– | `client_state` ä¸Žè®¢é˜…æ—¶æ³¨å†Œçš„å€¼ä¸€è‡´ã€‚å¦‚å€¼å·²æ¼‚ç§»ï¼Œé‡æ–°è¿è¡Œ `openssl rand -hex 32` å¹¶åˆ›å»ºæ–°è®¢é˜…ã€‚æ£€æŸ¥ `accepted_resources` æ˜¯å¦åŒ…å« Graph å‘é€çš„èµ„æºè·¯å¾„ã€‚ |
| æ¯æ¡é€šçŸ¥å‡è¿”å›ž 403 | `clientState` ä¸åŒ¹é…ï¼ˆä¼ªé€ ï¼Œæˆ–è®¢é˜…æ—¶ä½¿ç”¨äº†ä¸åŒçš„å€¼ï¼‰ã€‚ä½¿ç”¨ `zed teams-pipeline subscribe --client-state "$MSGRAPH_WEBHOOK_CLIENT_STATE" ...` é‡æ–°åˆ›å»ºè®¢é˜…ï¼ˆéšæµæ°´çº¿è¿è¡Œæ—¶ PR ä¸€åŒå‘å¸ƒï¼‰ã€‚ |
| ç›‘å¬å™¨å·²å¯åŠ¨ï¼Œä½† `curl http://localhost:8646/health` æŒ‚èµ· | ç«¯å£ç»‘å®šå†²çªã€‚æ£€æŸ¥ `ss -tlnp \| grep 8646`ï¼Œå¦‚æœ‰éœ€è¦æ›´æ”¹ `port:`ã€‚ |
| æ¥è‡ª Microsoft çš„çœŸå®ž Graph è¯·æ±‚è¿”å›ž 403 | æº IP ç™½åå•èŒƒå›´è¿‡çª„ã€‚ä¸´æ—¶ç§»é™¤ `allowed_source_cidrs`ï¼Œç¡®è®¤æµé‡æ­£å¸¸åŽï¼Œå°†åˆ—è¡¨æ‰©å±•è‡³åŒ…å«å½“å‰ Microsoft å‡ºå£èŒƒå›´ã€‚ |

## ç›¸å…³æ–‡æ¡£

- [æ³¨å†Œ Microsoft Graph åº”ç”¨ç¨‹åº](/guides/microsoft-graph-app-registration) â€” Azure åº”ç”¨æ³¨å†Œå‰ææ¡ä»¶
- [çŽ¯å¢ƒå˜é‡ â†’ Microsoft Graph](/reference/environment-variables#microsoft-graph-teams-meetings) â€” å®Œæ•´çŽ¯å¢ƒå˜é‡åˆ—è¡¨
- [Microsoft Teams æœºå™¨äººè®¾ç½®](/user-guide/messaging/teams) â€” å…è®¸ç”¨æˆ·åœ¨ Teams ä¸­ä¸Ž Zed èŠå¤©çš„å¦ä¸€å¹³å°