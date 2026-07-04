---
sidebar_position: 7
title: "Docker"
description: "åœ¨ Docker ä¸­è¿è¡Œ Zed Agent ä»¥åŠå°† Docker ç”¨ä½œç»ˆç«¯åŽç«¯"
---

# Zed Agent â€” Docker

Docker ä¸Ž Zed Agent çš„äº¤é›†æœ‰ä¸¤ç§æˆªç„¶ä¸åŒçš„æ–¹å¼ï¼š

1. **åœ¨ Docker ä¸­è¿è¡Œ Zed** â€” agent æœ¬èº«åœ¨å®¹å™¨å†…è¿è¡Œï¼ˆæœ¬é¡µçš„ä¸»è¦å†…å®¹ï¼‰
2. **Docker ä½œä¸ºç»ˆç«¯åŽç«¯** â€” agent åœ¨å®¿ä¸»æœºä¸Šè¿è¡Œï¼Œä½†å°†æ¯æ¡å‘½ä»¤åœ¨å•ä¸ªæŒä¹…åŒ– Docker æ²™ç®±å®¹å™¨ä¸­æ‰§è¡Œï¼Œè¯¥å®¹å™¨åœ¨å·¥å…·è°ƒç”¨ã€`/new` å’Œå­ agent ä¹‹é—´ä¿æŒå­˜æ´»ï¼Œç›´è‡³ Zed è¿›ç¨‹ç»“æŸï¼ˆå‚è§ [é…ç½® â†’ Docker åŽç«¯](./configuration.md#docker-backend)ï¼‰

æœ¬é¡µä»‹ç»é€‰é¡¹ 1ã€‚å®¹å™¨å°†æ‰€æœ‰ç”¨æˆ·æ•°æ®ï¼ˆé…ç½®ã€API å¯†é’¥ã€ä¼šè¯ã€æŠ€èƒ½ã€è®°å¿†ï¼‰å­˜å‚¨åœ¨ä»Žå®¿ä¸»æœºæŒ‚è½½äºŽ `/opt/data` çš„å•ä¸ªç›®å½•ä¸­ã€‚é•œåƒæœ¬èº«æ˜¯æ— çŠ¶æ€çš„ï¼Œå¯é€šè¿‡æ‹‰å–æ–°ç‰ˆæœ¬è¿›è¡Œå‡çº§è€Œä¸ä¼šä¸¢å¤±ä»»ä½•é…ç½®ã€‚

## å¿«é€Ÿå¼€å§‹

å¦‚æžœè¿™æ˜¯ä½ ç¬¬ä¸€æ¬¡è¿è¡Œ Zed Agentï¼Œè¯·åœ¨å®¿ä¸»æœºä¸Šåˆ›å»ºä¸€ä¸ªæ•°æ®ç›®å½•ï¼Œå¹¶ä»¥äº¤äº’æ–¹å¼å¯åŠ¨å®¹å™¨ä»¥è¿è¡Œè®¾ç½®å‘å¯¼ï¼š

```sh
mkdir -p ~/.zed
docker run -it --rm \
  -v ~/.zed:/opt/data \
  nousresearch/zed-agent setup
```

è¿™å°†è¿›å…¥è®¾ç½®å‘å¯¼ï¼Œå‘å¯¼ä¼šæç¤ºä½ è¾“å…¥ API å¯†é’¥å¹¶å°†å…¶å†™å…¥ `~/.zed/.env`ã€‚ä½ åªéœ€æ‰§è¡Œä¸€æ¬¡ã€‚å¼ºçƒˆå»ºè®®æ­¤æ—¶ä¸º gateway é…ç½®ä¸€ä¸ªèŠå¤©ç³»ç»Ÿã€‚

## ä»¥ gateway æ¨¡å¼è¿è¡Œ

é…ç½®å®ŒæˆåŽï¼Œå°†å®¹å™¨ä½œä¸ºæŒä¹…åŒ– gatewayï¼ˆTelegramã€Discordã€Slackã€WhatsApp ç­‰ï¼‰åœ¨åŽå°è¿è¡Œï¼š

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  nousresearch/zed-agent gateway run
```

ç«¯å£ 8642 æš´éœ² gateway çš„ [OpenAI å…¼å®¹ API æœåŠ¡å™¨](./features/api-server.md)å’Œå¥åº·æ£€æŸ¥ç«¯ç‚¹ã€‚å¦‚æžœä½ åªä½¿ç”¨èŠå¤©å¹³å°ï¼ˆTelegramã€Discord ç­‰ï¼‰ï¼Œè¯¥ç«¯å£æ˜¯å¯é€‰çš„ï¼›ä½†å¦‚æžœä½ å¸Œæœ› dashboard æˆ–å¤–éƒ¨å·¥å…·è®¿é—® gatewayï¼Œåˆ™å¿…é¡»å¼€æ”¾ã€‚

æ³¨æ„ï¼šAPI æœåŠ¡å™¨éœ€è®¾ç½® `API_SERVER_ENABLED=true` æ‰ä¼šå¯ç”¨ã€‚è‹¥è¦åœ¨å®¹å™¨å†…å°†å…¶æš´éœ²è‡³ `127.0.0.1` ä»¥å¤–ï¼Œè¿˜éœ€è®¾ç½® `API_SERVER_HOST=0.0.0.0` å’Œ `API_SERVER_KEY`ï¼ˆæœ€å°‘ 8 ä¸ªå­—ç¬¦â€”â€”å¯ç”¨ `openssl rand -hex 32` ç”Ÿæˆï¼‰ã€‚ç¤ºä¾‹ï¼š

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  -e API_SERVER_ENABLED=true \
  -e API_SERVER_HOST=0.0.0.0 \
  -e API_SERVER_KEY="$(openssl rand -hex 32)" \
  -e API_SERVER_CORS_ORIGINS='*' \
  nousresearch/zed-agent gateway run
```

åœ¨é¢å‘äº’è”ç½‘çš„æœºå™¨ä¸Šå¼€æ”¾ä»»ä½•ç«¯å£éƒ½å­˜åœ¨å®‰å…¨é£Žé™©ã€‚é™¤éžä½ äº†è§£ç›¸å…³é£Žé™©ï¼Œå¦åˆ™ä¸åº”è¿™æ ·åšã€‚

## è¿è¡Œ dashboard

å†…ç½® Web dashboard ä½œä¸ºå¯é€‰çš„å­è¿›ç¨‹åœ¨ä¸Ž gateway ç›¸åŒçš„å®¹å™¨å†…è¿è¡Œã€‚è®¾ç½® `ZED_DASHBOARD=1` å¯åœ¨å®¹å™¨å›žçŽ¯åœ°å€ï¼ˆ`127.0.0.1`ï¼‰ä¸Šé»˜è®¤è¿è¡Œ dashboardï¼š

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  -e ZED_DASHBOARD=1 \
  nousresearch/zed-agent gateway run
```

å…¥å£ç‚¹åœ¨ `exec` ä¸»å‘½ä»¤ä¹‹å‰ï¼Œä»¥éž root ç”¨æˆ· `zed` åœ¨åŽå°å¯åŠ¨ `zed dashboard`ã€‚Dashboard è¾“å‡ºåœ¨ `docker logs` ä¸­ä»¥ `[dashboard]` ä¸ºå‰ç¼€ï¼Œä¾¿äºŽä¸Ž gateway æ—¥å¿—åŒºåˆ†ã€‚

| çŽ¯å¢ƒå˜é‡ | æè¿° | é»˜è®¤å€¼ |
|---------------------|-------------|---------|
| `ZED_DASHBOARD` | è®¾ä¸º `1`ï¼ˆæˆ– `true` / `yes`ï¼‰ä»¥åœ¨ä¸»å‘½ä»¤æ—å¯åŠ¨ dashboard | *ï¼ˆæœªè®¾ç½®â€”â€”ä¸å¯åŠ¨ dashboardï¼‰* |
| `ZED_DASHBOARD_HOST` | dashboard HTTP æœåŠ¡å™¨çš„ç»‘å®šåœ°å€ | `127.0.0.1` |
| `ZED_DASHBOARD_PORT` | dashboard HTTP æœåŠ¡å™¨çš„ç«¯å£ | `9119` |
| `ZED_DASHBOARD_INSECURE` | è®¾ä¸º `1`ï¼ˆæˆ– `true` / `yes`ï¼‰ä»¥åœ¨ä¸å¯ç”¨ OAuth é‰´æƒé—¨æŽ§çš„æƒ…å†µä¸‹ç»‘å®šã€‚ä»…åœ¨å¯ä¿¡ç½‘ç»œï¼ˆä¸”é€šè¿‡æ²¡æœ‰ OAuth å¥‘çº¦çš„åå‘ä»£ç†æ—¶ï¼‰ä½¿ç”¨â€”â€”dashboard ä¼šæš´éœ² API å¯†é’¥ä¸Žä¼šè¯æ•°æ® | *ï¼ˆæœªè®¾ç½®â€”â€”å½“æ³¨å†Œäº† `DashboardAuthProvider` æ—¶å¯ç”¨é—¨æŽ§ï¼‰* |

é»˜è®¤æƒ…å†µä¸‹ï¼Œdashboard ä¿æŒåœ¨å›žçŽ¯åœ°å€ï¼ˆ`127.0.0.1`ï¼‰ï¼Œä»¥é¿å…å°†
Web ç•Œé¢æš´éœ²åˆ°ç½‘ç»œã€‚è‹¥è¦æœ‰æ„å‘å¸ƒï¼Œè¯·è®¾ç½®
`ZED_DASHBOARD_HOST=0.0.0.0`ã€‚å½“ä»¥ä¸‹ä¸¤é¡¹åŒæ—¶æ»¡è¶³æ—¶ï¼Œ
dashboard çš„ OAuth é‰´æƒé—¨æŽ§ä¼šè‡ªåŠ¨å¯ç”¨ï¼š

1. ç»‘å®šåœ°å€ä¸ºéžå›žçŽ¯åœ°å€ï¼Œ**ä¸”**
2. æ³¨å†Œäº†ä¸€ä¸ª `DashboardAuthProvider` æ’ä»¶ã€‚

æ†ç»‘çš„ `dashboard_auth/nous` æä¾›è€…ä¼šåœ¨è®¾ç½®
`ZED_DASHBOARD_OAUTH_CLIENT_ID` æ—¶è‡ªåŠ¨æ¿€æ´»ï¼ˆå‚è§
[Web Dashboard â†’ é‰´æƒ](features/web-dashboard.md)ï¼‰ã€‚é—¨æŽ§å¯ç”¨åŽï¼Œ
æµè§ˆå™¨è°ƒç”¨æ–¹ä¼šå…ˆè¢«é‡å®šå‘åˆ°æ‰€é…ç½®é—¨æˆ·çš„ OAuth æµï¼Œç„¶åŽæ‰èƒ½
è®¿é—®ä»»ä½•å—ä¿æŠ¤è·¯ç”±ã€‚

å¦‚æžœæœªæ³¨å†Œæä¾›è€…ä¸”ç»‘å®šä¸ºéžå›žçŽ¯åœ°å€ï¼Œdashboard **ä¼šåœ¨å¯åŠ¨æ—¶
å¤±è´¥å…³é—­**ï¼Œå¹¶ç»™å‡ºæŒ‡å‘ç¼ºå¤±çŽ¯å¢ƒå˜é‡çš„å…·ä½“é”™è¯¯ä¿¡æ¯ã€‚è¦æ˜¾å¼
é€€å‡ºé—¨æŽ§â€”â€”ç”¨äºŽä¸ä½¿ç”¨ OAuth å¥‘çº¦ã€é€šè¿‡ä½ è‡ªå·±çš„åå‘ä»£ç†éƒ¨ç½²
åœ¨å¯ä¿¡å±€åŸŸç½‘ä¸­çš„åœºæ™¯â€”â€”è¯·è®¾ç½® `ZED_DASHBOARD_INSECURE=1`ã€‚
è¿™ä¼šæ¢å¤æ—§çš„â€œæ— é‰´æƒï¼Œä½†å‘å‡ºå‘Šè­¦â€æ¨¡å¼ï¼Œä¹Ÿæ˜¯å”¯ä¸€å¯ä»¥ç¦ç”¨é—¨æŽ§çš„
è·¯å¾„ï¼›ç»‘å®šåœ°å€ä¸å†éšå¼å†³å®š `--insecure`ã€‚

:::note
dashboard åœ¨å®¹å™¨å†…ä½œä¸ºå—ç›‘ç®¡çš„ s6 æœåŠ¡è¿è¡Œã€‚å¦‚æžœ
dashboard è¿›ç¨‹å´©æºƒï¼Œs6-overlay ä¼šåœ¨çŸ­æš‚é€€é¿åŽè‡ªåŠ¨
é‡å¯å®ƒâ€”â€”ä½ ä¼šçœ‹åˆ°æ–°çš„ PIDï¼Œæ— éœ€é‡å¯å®¹å™¨ã€‚æ—¥å¿—å’Œå´©æºƒè¾“å‡ºå¯é€šè¿‡
`docker logs <container>` æŸ¥çœ‹ï¼ˆs6 å°†æœåŠ¡çš„ stdout/stderr è½¬å‘è‡³æ­¤ï¼‰ã€‚

å½“ç‹¬ç«‹çš„ dashboard å®¹å™¨ä¸Žå®¿ä¸»æœºå…±äº« PID ä¸Žç½‘ç»œå‘½åç©ºé—´æ—¶ï¼ˆä¾‹å¦‚ `network_mode: host`ï¼Œæ­£å¦‚ä»“åº“è‡ªå¸¦çš„ `docker-compose.yml` ä¸­çš„ `dashboard` æœåŠ¡é‚£æ ·ï¼‰ï¼Œ**æ˜¯**æ”¯æŒå°† dashboard ä½œä¸ºç‹¬ç«‹å®¹å™¨è¿è¡Œçš„ã€‚å…¶ gateway å­˜æ´»æ£€æµ‹éœ€è¦ä¸Ž gateway è¿›ç¨‹å…±äº« PID å‘½åç©ºé—´ï¼Œå› æ­¤è¯¥é™åˆ¶ä»…é€‚ç”¨äºŽåœ¨éš”ç¦»çš„ bridge ç½‘ç»œå®¹å™¨ä¸­ã€ä¸”æœªå…±äº« PID å‘½åç©ºé—´çš„ dashboardã€‚
:::

## äº¤äº’å¼è¿è¡Œï¼ˆCLI èŠå¤©ï¼‰

å¯¹å·²æœ‰æ•°æ®ç›®å½•æ‰“å¼€äº¤äº’å¼èŠå¤©ä¼šè¯ï¼š

```sh
docker run -it --rm \
  -v ~/.zed:/opt/data \
  nousresearch/zed-agent
```

æˆ–è€…ï¼Œå¦‚æžœä½ å·²é€šè¿‡ Docker Desktop ç­‰æ–¹å¼åœ¨è¿è¡Œä¸­çš„å®¹å™¨å†…æ‰“å¼€äº†ç»ˆç«¯ï¼Œç›´æŽ¥è¿è¡Œï¼š

```sh
/opt/zed/.venv/bin/zed
```

## æŒä¹…åŒ–å·

`/opt/data` å·æ˜¯æ‰€æœ‰ Zed çŠ¶æ€çš„å”¯ä¸€æ•°æ®æ¥æºã€‚å®ƒæ˜ å°„åˆ°å®¿ä¸»æœºçš„ `~/.zed/` ç›®å½•ï¼ŒåŒ…å«ï¼š

| è·¯å¾„ | å†…å®¹ |
|------|----------|
| `.env` | API å¯†é’¥å’Œæœºå¯† |
| `config.yaml` | æ‰€æœ‰ Zed é…ç½® |
| `SOUL.md` | Agent ä¸ªæ€§/èº«ä»½ |
| `sessions/` | å¯¹è¯åŽ†å² |
| `memories/` | æŒä¹…åŒ–è®°å¿†å­˜å‚¨ |
| `skills/` | å·²å®‰è£…çš„æŠ€èƒ½ |
| `cron/` | å®šæ—¶ä»»åŠ¡å®šä¹‰ |
| `hooks/` | äº‹ä»¶ hook |
| `logs/` | è¿è¡Œæ—¶æ—¥å¿— |
| `skins/` | è‡ªå®šä¹‰ CLI çš®è‚¤ |

:::warning
åˆ‡å‹¿åŒæ—¶å¯¹åŒä¸€æ•°æ®ç›®å½•è¿è¡Œä¸¤ä¸ª Zed **gateway** å®¹å™¨â€”â€”ä¼šè¯æ–‡ä»¶å’Œè®°å¿†å­˜å‚¨ä¸æ”¯æŒå¹¶å‘å†™å…¥ã€‚
:::

## å¤š profile æ”¯æŒ

Zed æ”¯æŒ[å¤šä¸ª profile](../reference/profile-commands.md)â€”â€”ç‹¬ç«‹çš„ `~/.zed/` ç›®å½•ï¼Œè®©ä½ å¯ä»¥ä»Žå•ä¸ªå®‰è£…è¿è¡Œç‹¬ç«‹çš„ agentï¼ˆä¸åŒçš„ SOULã€æŠ€èƒ½ã€è®°å¿†ã€ä¼šè¯ã€å‡­æ®ï¼‰ã€‚**åœ¨ Docker ä¸‹è¿è¡Œæ—¶ï¼Œä¸å»ºè®®ä½¿ç”¨ Zed å†…ç½®çš„å¤š profile åŠŸèƒ½ã€‚**

æŽ¨èçš„æ¨¡å¼æ˜¯**æ¯ä¸ª profile ä¸€ä¸ªå®¹å™¨**ï¼Œæ¯ä¸ªå®¹å™¨å°†å„è‡ªçš„å®¿ä¸»æœºç›®å½•ç»‘å®šæŒ‚è½½ä¸º `/opt/data`ï¼š

```sh
# å·¥ä½œ profile
docker run -d \
  --name zed-work \
  --restart unless-stopped \
  -v ~/.zed-work:/opt/data \
  -p 8642:8642 \
  nousresearch/zed-agent gateway run

# ä¸ªäºº profile
docker run -d \
  --name zed-personal \
  --restart unless-stopped \
  -v ~/.zed-personal:/opt/data \
  -p 8643:8642 \
  nousresearch/zed-agent gateway run
```

åœ¨ Docker ä¸­ä½¿ç”¨ç‹¬ç«‹å®¹å™¨è€Œéž profile çš„åŽŸå› ï¼š

- **éš”ç¦»æ€§** â€” æ¯ä¸ªå®¹å™¨æœ‰ç‹¬ç«‹çš„æ–‡ä»¶ç³»ç»Ÿã€è¿›ç¨‹è¡¨å’Œèµ„æºé™åˆ¶ã€‚ä¸€ä¸ª profile ä¸­çš„å´©æºƒã€ä¾èµ–å˜æ›´æˆ–å¤±æŽ§ä¼šè¯ä¸ä¼šå½±å“å¦ä¸€ä¸ªã€‚
- **ç‹¬ç«‹ç”Ÿå‘½å‘¨æœŸ** â€” å¯ç‹¬ç«‹å‡çº§ã€é‡å¯ã€æš‚åœæˆ–å›žæ»šæ¯ä¸ª agentï¼ˆ`docker restart zed-work` ä¸ä¼šå½±å“ `zed-personal`ï¼‰ã€‚
- **æ¸…æ™°çš„ç«¯å£å’Œç½‘ç»œéš”ç¦»** â€” æ¯ä¸ª gateway ç»‘å®šå„è‡ªçš„å®¿ä¸»æœºç«¯å£ï¼›èŠå¤©å¹³å°æˆ– API æœåŠ¡å™¨ä¹‹é—´ä¸å­˜åœ¨ä¸²æ‰°é£Žé™©ã€‚
- **æ›´ç®€å•çš„å¿ƒæ™ºæ¨¡åž‹** â€” å®¹å™¨å³ profileã€‚å¤‡ä»½ã€è¿ç§»å’Œæƒé™ç®¡ç†éƒ½è·Ÿéšç»‘å®šæŒ‚è½½çš„ç›®å½•ï¼Œæ— éœ€è®°ä½é¢å¤–çš„ `--profile` æ ‡å¿—ã€‚
- **é¿å…å¹¶å‘å†™å…¥é£Žé™©** â€” ä¸Šè¿°å…³äºŽä¸å¾—å¯¹åŒä¸€æ•°æ®ç›®å½•è¿è¡Œä¸¤ä¸ª gateway çš„è­¦å‘ŠåŒæ ·é€‚ç”¨äºŽå•ä¸ªå®¹å™¨å†…çš„ profileã€‚

åœ¨ Docker Compose ä¸­ï¼Œåªéœ€ä¸ºæ¯ä¸ª profile å£°æ˜Žä¸€ä¸ªæœåŠ¡ï¼Œä½¿ç”¨ä¸åŒçš„ `container_name`ã€`volumes` å’Œ `ports`ï¼š

```yaml
services:
  zed-work:
    image: nousresearch/zed-agent:latest
    container_name: zed-work
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"
    volumes:
      - ~/.zed-work:/opt/data

  zed-personal:
    image: nousresearch/zed-agent:latest
    container_name: zed-personal
    restart: unless-stopped
    command: gateway run
    ports:
      - "8643:8642"
    volumes:
      - ~/.zed-personal:/opt/data
```

## çŽ¯å¢ƒå˜é‡è½¬å‘

API å¯†é’¥ä»Žå®¹å™¨å†…çš„ `/opt/data/.env` è¯»å–ã€‚ä½ ä¹Ÿå¯ä»¥ç›´æŽ¥ä¼ é€’çŽ¯å¢ƒå˜é‡ï¼š

```sh
docker run -it --rm \
  -v ~/.zed:/opt/data \
  -e ANTHROPIC_API_KEY="sk-ant-..." \
  -e OPENAI_API_KEY="sk-..." \
  nousresearch/zed-agent
```

ç›´æŽ¥ä¼ å…¥çš„ `-e` æ ‡å¿—ä¼šè¦†ç›– `.env` ä¸­çš„å€¼ã€‚è¿™å¯¹äºŽä¸å¸Œæœ›å°†å¯†é’¥å†™å…¥ç£ç›˜çš„ CI/CD æˆ–å¯†é’¥ç®¡ç†å™¨é›†æˆéžå¸¸æœ‰ç”¨ã€‚

:::note å¯»æ‰¾ Docker ä½œä¸º**ç»ˆç«¯åŽç«¯**çš„è¯´æ˜Žï¼Ÿ
æœ¬é¡µä»‹ç»åœ¨ Docker å†…è¿è¡Œ Zed æœ¬èº«ã€‚å¦‚æžœä½ å¸Œæœ› Zed åœ¨ Docker æ²™ç®±å®¹å™¨å†…æ‰§è¡Œ agent çš„ `terminal` / `execute_code` è°ƒç”¨ï¼ˆæ¯ä¸ª Zed è¿›ç¨‹å¯¹åº”ä¸€ä¸ªæŒä¹…å®¹å™¨ï¼‰ï¼Œé‚£æ˜¯å¦ä¸€ä¸ªé…ç½®å—â€”â€”`terminal.backend: docker` åŠ ä¸Š `terminal.docker_image`ã€`terminal.docker_volumes`ã€`terminal.docker_forward_env`ã€`terminal.docker_run_as_host_user` å’Œ `terminal.docker_extra_args`ã€‚å®Œæ•´é…ç½®è¯·å‚è§ [é…ç½® â†’ Docker åŽç«¯](configuration.md#docker-backend)ã€‚
:::

## Docker Compose ç¤ºä¾‹

å¯¹äºŽåŒæ—¶è¿è¡Œ gateway å’Œ dashboard çš„æŒä¹…åŒ–éƒ¨ç½²ï¼Œä½¿ç”¨ `docker-compose.yaml` æ›´ä¸ºæ–¹ä¾¿ï¼š

```yaml
services:
  zed:
    image: nousresearch/zed-agent:latest
    container_name: zed
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"   # gateway API
      - "9119:9119"   # dashboardï¼ˆä»…åœ¨ ZED_DASHBOARD=1 æ—¶ç”Ÿæ•ˆï¼‰
    volumes:
      - ~/.zed:/opt/data
    environment:
      - ZED_DASHBOARD=1
      # å–æ¶ˆæ³¨é‡Šä»¥ç›´æŽ¥è½¬å‘ç‰¹å®šçŽ¯å¢ƒå˜é‡è€Œéžä½¿ç”¨ .env æ–‡ä»¶ï¼š
      # - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      # - OPENAI_API_KEY=${OPENAI_API_KEY}
      # - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: "2.0"
```

ä½¿ç”¨ `docker compose up -d` å¯åŠ¨ï¼Œä½¿ç”¨ `docker compose logs -f` æŸ¥çœ‹æ—¥å¿—ã€‚Dashboard è¾“å‡ºä»¥ `[dashboard]` ä¸ºå‰ç¼€ï¼Œä¾¿äºŽä»Ž gateway æ—¥å¿—ä¸­è¿‡æ»¤ã€‚

## èµ„æºé™åˆ¶

Zed å®¹å™¨éœ€è¦é€‚é‡èµ„æºã€‚æŽ¨èæœ€ä½Žé…ç½®ï¼š

| èµ„æº | æœ€ä½Ž | æŽ¨è |
|----------|---------|-------------|
| å†…å­˜ | 1 GB | 2â€“4 GB |
| CPU | 1 æ ¸ | 2 æ ¸ |
| ç£ç›˜ï¼ˆæ•°æ®å·ï¼‰ | 500 MB | 2+ GBï¼ˆéšä¼šè¯/æŠ€èƒ½å¢žé•¿ï¼‰ |

æµè§ˆå™¨è‡ªåŠ¨åŒ–ï¼ˆPlaywright/Chromiumï¼‰æ˜¯æœ€è€—å†…å­˜çš„åŠŸèƒ½ã€‚å¦‚æžœä¸éœ€è¦æµè§ˆå™¨å·¥å…·ï¼Œ1 GB å³å¯ã€‚å¯ç”¨æµè§ˆå™¨å·¥å…·æ—¶ï¼Œè¯·è‡³å°‘åˆ†é… 2 GBã€‚

åœ¨ Docker ä¸­è®¾ç½®é™åˆ¶ï¼š

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  --memory=4g --cpus=2 \
  -v ~/.zed:/opt/data \
  nousresearch/zed-agent gateway run
```

## Dockerfile è¯´æ˜Ž

å®˜æ–¹é•œåƒåŸºäºŽ `debian:13.4`ï¼ŒåŒ…å«ï¼š

- Python 3 åŠæ‰€æœ‰ Zed ä¾èµ–ï¼ˆ`uv pip install -e ".[all]"`ï¼‰
- Node.js + npmï¼ˆç”¨äºŽæµè§ˆå™¨è‡ªåŠ¨åŒ–å’Œ WhatsApp æ¡¥æŽ¥ï¼‰
- Playwright ä¸Ž Chromiumï¼ˆ`npx playwright install --with-deps chromium --only-shell`ï¼‰
- ripgrepã€ffmpegã€git å’Œ `xz-utils` ä½œä¸ºç³»ç»Ÿå·¥å…·
- **`docker-cli`** â€” ä½¿å®¹å™¨å†…è¿è¡Œçš„ agent å¯ä»¥é©±åŠ¨å®¿ä¸»æœºçš„ Docker å®ˆæŠ¤è¿›ç¨‹ï¼ˆç»‘å®šæŒ‚è½½ `/var/run/docker.sock` ä»¥å¯ç”¨ï¼‰ï¼Œç”¨äºŽ `docker build`ã€`docker run`ã€å®¹å™¨æ£€æŸ¥ç­‰æ“ä½œ
- **`openssh-client`** â€” ä»Žå®¹å™¨å†…å¯ç”¨ [SSH ç»ˆç«¯åŽç«¯](/user-guide/configuration#ssh-backend)ã€‚SSH åŽç«¯è°ƒç”¨ç³»ç»Ÿ `ssh` äºŒè¿›åˆ¶æ–‡ä»¶ï¼›è‹¥ç¼ºå°‘æ­¤ç»„ä»¶ï¼Œåœ¨å®¹å™¨åŒ–å®‰è£…ä¸­ä¼šé™é»˜å¤±è´¥
- WhatsApp æ¡¥æŽ¥ï¼ˆ`scripts/whatsapp-bridge/`ï¼‰
- **[`s6-overlay`](https://github.com/just-containers/s6-overlay) v3** ä½œä¸º PID 1ï¼ˆæ›¿ä»£æ—§ç‰ˆ `tini`ï¼‰â€”â€”ç›‘ç®¡ dashboard å’Œå„ profile gatewayï¼Œå´©æºƒåŽè‡ªåŠ¨é‡å¯ï¼Œå›žæ”¶åƒµå°¸å­è¿›ç¨‹ï¼Œå¹¶è½¬å‘ä¿¡å·

å®¹å™¨çš„ `ENTRYPOINT` æ˜¯ s6-overlay çš„ `/init`ã€‚å¯åŠ¨æ—¶ï¼š
1. ä»¥ root èº«ä»½è¿è¡Œ `/etc/cont-init.d/01-zed-setup`ï¼ˆå³ `docker/stage2-hook.sh`ï¼‰ï¼šå¯é€‰çš„ UID/GID é‡æ˜ å°„ã€ä¿®å¤å·æ‰€æœ‰æƒã€é¦–æ¬¡å¯åŠ¨æ—¶åˆå§‹åŒ– `.env` / `config.yaml` / `SOUL.md`ã€åŒæ­¥å†…ç½®æŠ€èƒ½ã€‚
2. è¿è¡Œ `/etc/cont-init.d/02-reconcile-profiles`ï¼ˆå³ `zed_cli.container_boot`ï¼‰ï¼šéåŽ† `$ZED_HOME/profiles/<name>/`ï¼Œåœ¨ `/run/service/gateway-<profile>/` ä¸‹é‡å»ºå„ profile çš„ gateway s6 æœåŠ¡æ§½ï¼Œå¹¶ä»…è‡ªåŠ¨å¯åŠ¨ä¸Šæ¬¡è®°å½•çŠ¶æ€ä¸º `running` çš„ profileï¼ˆå‚è§ [Per-profile gateway ç›‘ç®¡](#per-profile-gateway-supervision)ï¼‰ã€‚
3. å¯åŠ¨é™æ€çš„ `main-zed` å’Œ `dashboard` s6-rc æœåŠ¡ã€‚
4. å°†å®¹å™¨çš„ CMD ä½œä¸ºä¸»ç¨‹åº execï¼ˆ`/opt/zed/docker/main-wrapper.sh`ï¼‰ï¼Œæ ¹æ®ç”¨æˆ·ä¼ ç»™ `docker run` çš„å‚æ•°è¿›è¡Œè·¯ç”±ï¼š
   - æ— å‚æ•° â†’ `zed`ï¼ˆé»˜è®¤ï¼‰
   - ç¬¬ä¸€ä¸ªå‚æ•°æ˜¯ PATH ä¸Šçš„å¯æ‰§è¡Œæ–‡ä»¶ï¼ˆå¦‚ `sleep`ã€`bash`ï¼‰â†’ ç›´æŽ¥ exec
   - å…¶ä»–æƒ…å†µ â†’ `zed <args>`ï¼ˆå­å‘½ä»¤é€ä¼ ï¼‰
   ä¸»ç¨‹åºé€€å‡ºæ—¶å®¹å™¨é€€å‡ºï¼Œå¹¶ä½¿ç”¨å…¶é€€å‡ºç ã€‚

:::warning ä¸Ž pre-s6 é•œåƒçš„ç ´åæ€§å˜æ›´
å®¹å™¨ ENTRYPOINT çŽ°åœ¨æ˜¯ `/init`ï¼ˆs6-overlayï¼‰ï¼Œè€Œéž `/usr/bin/tini`ã€‚æ‰€æœ‰äº”ç§å·²è®°å½•çš„ `docker run` è°ƒç”¨æ¨¡å¼ï¼ˆæ— å‚æ•°ã€`chat -q "â€¦"`ã€`sleep infinity`ã€`bash`ã€`--tui`ï¼‰çš„è¡Œä¸ºä¸ŽåŸºäºŽ tini çš„é•œåƒå®Œå…¨ç›¸åŒã€‚å¦‚æžœä½ æœ‰ä¾èµ– tini ç‰¹å®šä¿¡å·è¡Œä¸ºæˆ–ç¡¬ç¼–ç  `/usr/bin/tini --` è°ƒç”¨çš„ä¸‹æ¸¸å°è£…ï¼Œè¯·å›ºå®šåˆ°ä¹‹å‰çš„é•œåƒæ ‡ç­¾ã€‚
:::

:::warning æƒé™æ¨¡åž‹
é™¤éžä½ åœ¨å‘½ä»¤é“¾ä¸­ä¿ç•™ `/init`ï¼ˆæˆ–ç­‰æ•ˆçš„æ—§ç‰ˆ `docker/entrypoint.sh` shimï¼Œå®ƒä¼šè½¬å‘åˆ° stage2 hookï¼‰ï¼Œå¦åˆ™ä¸è¦è¦†ç›–é•œåƒå…¥å£ç‚¹ã€‚s6-overlay çš„ `/init` ä»¥ root è¿è¡Œï¼Œä»¥ä¾¿åœ¨é¦–æ¬¡å¯åŠ¨æ—¶å¯¹å·æ‰§è¡Œ chownï¼Œç„¶åŽé€šè¿‡ `s6-setuidgid` ä¸ºæ¯ä¸ªå—ç›‘ç®¡çš„æœåŠ¡**ä»¥åŠ**ä¸»ç¨‹åºé™æƒè‡³ `zed` ç”¨æˆ·ã€‚åœ¨å®˜æ–¹é•œåƒå†…ä»¥ root å¯åŠ¨ `zed gateway run` é»˜è®¤ä¼šè¢«æ‹’ç»ï¼Œå› ä¸ºè¿™å¯èƒ½åœ¨ `/opt/data` ä¸­ç•™ä¸‹ root æ‰€æœ‰çš„æ–‡ä»¶ï¼Œå¯¼è‡´åŽç»­ dashboard æˆ– gateway å¯åŠ¨å¤±è´¥ã€‚ä»…åœ¨ä½ æœ‰æ„æŽ¥å—è¯¥é£Žé™©æ—¶æ‰è®¾ç½® `ZED_ALLOW_ROOT_GATEWAY=1`ã€‚
:::

### Per-profile gateway ç›‘ç®¡

åœ¨å®¹å™¨å†…ï¼Œæ¯ä¸ªé€šè¿‡ `zed profile create <name>` åˆ›å»ºçš„ profile éƒ½ä¼šè‡ªåŠ¨åœ¨ `/run/service/gateway-<name>/` æ³¨å†Œä¸€ä¸ªå— s6 ç›‘ç®¡çš„ gateway æœåŠ¡ã€‚ä½ åœ¨å®¿ä¸»æœºä¸Šè¿è¡Œçš„ç”Ÿå‘½å‘¨æœŸå‘½ä»¤åœ¨æ­¤åŒæ ·é€‚ç”¨ï¼š

```sh
zed profile create coder            # æ³¨å†Œ gateway-coder s6 æ§½
zed -p coder gateway start          # s6-svc -u  â†’ å—ç›‘ç®¡çš„ gateway
zed -p coder gateway stop           # s6-svc -d  â†’ æœåŠ¡åœæ­¢
zed -p coder gateway restart        # s6-svc -t  â†’ å‘ supervisor å‘é€ SIGTERM
zed profile delete coder            # æ‹†é™¤ s6 æ§½
```

**ç›¸æ¯” pre-s6 é•œåƒçš„ç›‘ç®¡ä¼˜åŠ¿ï¼š**

- Gateway å´©æºƒåŽç”± `s6-supervise` åœ¨çº¦ 1 ç§’é€€é¿åŽè‡ªåŠ¨é‡å¯ã€‚
- Dashboard å´©æºƒåŽè‡ªåŠ¨é‡å¯ï¼ˆè®¾ç½® `ZED_DASHBOARD=1` ä»¥å¯åŠ¨ï¼‰ã€‚
- `docker restart` ä¿ç•™è¿è¡Œä¸­çš„ gatewayï¼šcont-init åè°ƒå™¨è¯»å– `$ZED_HOME/profiles/<name>/gateway_state.json`ï¼Œè‹¥ä¸Šæ¬¡è®°å½•çŠ¶æ€ä¸º `running` åˆ™æ¢å¤è¯¥æ§½ã€‚å·²åœæ­¢çš„ gateway ä¿æŒåœæ­¢çŠ¶æ€ã€‚
- å„ profile çš„ gateway æ—¥å¿—æŒä¹…åŒ–äºŽ `$ZED_HOME/logs/gateways/<profile>/current`ï¼ˆç”± `s6-log` è½®è½¬ï¼‰ï¼Œåè°ƒå™¨çš„æ“ä½œè®°å½•åœ¨æ¯æ¬¡å¯åŠ¨æ—¶è¿½åŠ åˆ° `$ZED_HOME/logs/container-boot.log`ã€‚

åœ¨å®¹å™¨å†…æ‰§è¡Œ `zed status` ä¼šæ˜¾ç¤º `Manager: s6 (container supervisor)`ã€‚ä½¿ç”¨ `/command/s6-svstat /run/service/gateway-<name>` æŸ¥çœ‹åŽŸå§‹ supervisor çŠ¶æ€ï¼ˆæ³¨æ„ `/command/` ä»…åœ¨ç›‘ç®¡æ ‘è¿›ç¨‹çš„ PATH ä¸­ï¼›ä»Ž `docker exec` è°ƒç”¨æ—¶è¯·ä¼ å…¥ç»å¯¹è·¯å¾„ï¼‰ã€‚

## å‡çº§

æ‹‰å–æœ€æ–°é•œåƒå¹¶é‡å»ºå®¹å™¨ã€‚ä½ çš„æ•°æ®ç›®å½•ä¸å—å½±å“ã€‚

```sh
docker pull nousresearch/zed-agent:latest
docker rm -f zed
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  nousresearch/zed-agent gateway run
```

æˆ–ä½¿ç”¨ Docker Composeï¼š

```sh
docker compose pull
docker compose up -d
```

## æŠ€èƒ½ä¸Žå‡­æ®æ–‡ä»¶

å½“ä½¿ç”¨ Docker ä½œä¸ºæ‰§è¡ŒçŽ¯å¢ƒæ—¶ï¼ˆä¸æ˜¯ä¸Šè¿°æ–¹æ³•ï¼Œè€Œæ˜¯ agent åœ¨ Docker æ²™ç®±å†…è¿è¡Œå‘½ä»¤â€”â€”å‚è§ [é…ç½® â†’ Docker åŽç«¯](./configuration.md#docker-backend)ï¼‰ï¼ŒZed ä¸ºæ‰€æœ‰å·¥å…·è°ƒç”¨å¤ç”¨å•ä¸ªé•¿æœŸè¿è¡Œçš„å®¹å™¨ï¼Œå¹¶è‡ªåŠ¨å°†æŠ€èƒ½ç›®å½•ï¼ˆ`~/.zed/skills/`ï¼‰å’ŒæŠ€èƒ½å£°æ˜Žçš„æ‰€æœ‰å‡­æ®æ–‡ä»¶ä»¥åªè¯»å·çš„å½¢å¼ç»‘å®šæŒ‚è½½åˆ°è¯¥å®¹å™¨ä¸­ã€‚æŠ€èƒ½è„šæœ¬ã€æ¨¡æ¿å’Œå¼•ç”¨åœ¨æ²™ç®±å†…æ— éœ€æ‰‹åŠ¨é…ç½®å³å¯ä½¿ç”¨ï¼Œç”±äºŽå®¹å™¨åœ¨ Zed è¿›ç¨‹çš„æ•´ä¸ªç”Ÿå‘½å‘¨æœŸå†…æŒç»­å­˜åœ¨ï¼Œä½ å®‰è£…çš„ä»»ä½•ä¾èµ–æˆ–å†™å…¥çš„æ–‡ä»¶éƒ½ä¼šåœ¨ä¸‹æ¬¡å·¥å…·è°ƒç”¨æ—¶ä¿ç•™ã€‚

SSH å’Œ Modal åŽç«¯ä¹Ÿä¼šè¿›è¡Œç›¸åŒçš„åŒæ­¥â€”â€”æŠ€èƒ½å’Œå‡­æ®æ–‡ä»¶åœ¨æ¯æ¬¡å‘½ä»¤æ‰§è¡Œå‰é€šè¿‡ rsync æˆ– Modal mount API ä¸Šä¼ ã€‚

## åœ¨å®¹å™¨ä¸­å®‰è£…æ›´å¤šå·¥å…·

å®˜æ–¹é•œåƒé¢„è£…äº†ä¸€å¥—ç²¾é€‰å·¥å…·ï¼ˆå‚è§ [Dockerfile è¯´æ˜Ž](#what-the-dockerfile-does)ï¼‰ï¼Œä½†å¹¶éž agent å¯èƒ½éœ€è¦çš„æ¯ä¸ªå·¥å…·éƒ½å·²é¢„è£…ã€‚ä»¥ä¸‹æ˜¯äº”ç§æŽ¨èæ–¹å¼ï¼ŒæŒ‰å·¥ä½œé‡å’ŒæŒä¹…æ€§é€’å¢žæŽ’åˆ—ã€‚

### npm æˆ– Python å·¥å…·â€”â€”ä½¿ç”¨ `npx` æˆ– `uvx`

å¯¹äºŽå‘å¸ƒåˆ° npm æˆ– PyPI çš„ä»»ä½•å·¥å…·ï¼ŒæŒ‡ç¤º Zed é€šè¿‡ `npx`ï¼ˆnpmï¼‰æˆ– `uvx`ï¼ˆPythonï¼‰è¿è¡Œï¼Œå¹¶å°†è¯¥å‘½ä»¤è®°å…¥å…¶æŒä¹…è®°å¿†ã€‚å¦‚æžœå·¥å…·éœ€è¦é…ç½®æ–‡ä»¶æˆ–å‡­æ®ï¼ŒæŒ‡ç¤ºå…¶å°†è¿™äº›æ–‡ä»¶æ”¾åœ¨ `/opt/data` ä¸‹ï¼ˆå¦‚ `/opt/data/<tool>/config.yaml`ï¼‰ã€‚

ä¾èµ–æŒ‰éœ€èŽ·å–å¹¶åœ¨å®¹å™¨ç”Ÿå‘½å‘¨æœŸå†…ç¼“å­˜ã€‚å†™å…¥ `/opt/data` çš„é…ç½®åœ¨å®¹å™¨é‡å¯åŽä»ç„¶å­˜åœ¨ï¼Œå› ä¸ºå®ƒä½äºŽç»‘å®šæŒ‚è½½çš„å®¿ä¸»æœºç›®å½•ä¸Šã€‚åŒ…ç¼“å­˜æœ¬èº«åœ¨ `docker rm` åŽä¼šé‡å»ºï¼Œä½† `npx` å’Œ `uvx` ä¼šåœ¨ä¸‹æ¬¡è¿è¡Œå·¥å…·æ—¶é€æ˜Žåœ°é‡æ–°èŽ·å–ã€‚

### å…¶ä»–å·¥å…·ï¼ˆapt åŒ…ã€äºŒè¿›åˆ¶æ–‡ä»¶ï¼‰â€”â€”å®‰è£…å¹¶è®°ä½

å¯¹äºŽ npm æˆ– PyPI ä¹‹å¤–çš„å·¥å…·â€”â€”`apt` åŒ…ã€é¢„æž„å»ºäºŒè¿›åˆ¶æ–‡ä»¶ã€é•œåƒä¸­æœªåŒ…å«çš„è¯­è¨€è¿è¡Œæ—¶â€”â€”æŒ‡ç¤º Zed å¦‚ä½•å®‰è£…ï¼ˆå¦‚ `apt-get update && apt-get install -y <package>`ï¼‰ï¼Œå¹¶å‘ŠçŸ¥å®ƒè®°ä½è¯¥å®‰è£…å‘½ä»¤ã€‚å·¥å…·åœ¨å®¹å™¨å‰©ä½™ç”Ÿå‘½å‘¨æœŸå†…æŒç»­å¯ç”¨ï¼ŒZed åœ¨å®¹å™¨é‡å¯åŽä¸‹æ¬¡éœ€è¦è¯¥å·¥å…·æ—¶ä¼šé‡æ–°è¿è¡Œå®‰è£…å‘½ä»¤ã€‚

è¿™ç§æ–¹å¼é€‚åˆå®‰è£…å¿«é€Ÿä¸”å¶å°”ä½¿ç”¨çš„å·¥å…·ã€‚å¯¹äºŽé¢‘ç¹ä½¿ç”¨çš„å·¥å…·ï¼Œå»ºè®®é‡‡ç”¨ä¸‹ä¸€ç§æ–¹å¼ã€‚

### æŒä¹…å®‰è£…â€”â€”æž„å»ºæ´¾ç”Ÿé•œåƒ

å½“å·¥å…·å¿…é¡»åœ¨æ¯æ¬¡å®¹å™¨å¯åŠ¨æ—¶ç«‹å³å¯ç”¨ä¸”æ— éœ€é‡æ–°å®‰è£…å»¶è¿Ÿæ—¶ï¼Œæž„å»ºä¸€ä¸ªç»§æ‰¿è‡ª `nousresearch/zed-agent` å¹¶åœ¨å±‚ä¸­å®‰è£…è¯¥å·¥å…·çš„æ–°é•œåƒï¼š

```dockerfile
FROM nousresearch/zed-agent:latest

USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends <your-package> \
    && rm -rf /var/lib/apt/lists/*
USER zed
```

æž„å»ºå¹¶æ›¿æ¢å®˜æ–¹é•œåƒä½¿ç”¨ï¼š

```sh
docker build -t my-zed:latest .
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  my-zed:latest gateway run
```

å…¥å£ç‚¹è„šæœ¬å’Œ `/opt/data` è¯­ä¹‰åŽŸæ ·ç»§æ‰¿ï¼Œæœ¬é¡µå…¶ä½™å†…å®¹ä»ç„¶é€‚ç”¨ã€‚æ‹‰å–æ›´æ–°çš„ä¸Šæ¸¸ `nousresearch/zed-agent` æ—¶è®°å¾—é‡æ–°æž„å»ºé•œåƒã€‚

### å¤æ‚å·¥å…·æˆ–å¤šæœåŠ¡æ ˆâ€”â€”è¿è¡Œ sidecar å®¹å™¨

å¯¹äºŽè‡ªå¸¦æœåŠ¡ï¼ˆæ•°æ®åº“ã€Web æœåŠ¡å™¨ã€é˜Ÿåˆ—ã€æ— å¤´æµè§ˆå™¨é›†ç¾¤ï¼‰æˆ–è¿‡äºŽåºžå¤§è€Œä¸é€‚åˆæ”¾åœ¨ Zed å®¹å™¨å†…çš„å·¥å…·ï¼Œå°†å…¶ä½œä¸ºç‹¬ç«‹å®¹å™¨è¿è¡Œåœ¨å…±äº« Docker ç½‘ç»œä¸Šã€‚Zed é€šè¿‡å®¹å™¨åç§°è®¿é—® sidecarï¼Œä¸Žè®¿é—®æœ¬åœ°æŽ¨ç†æœåŠ¡å™¨çš„æ–¹å¼ç›¸åŒï¼ˆå‚è§ [è¿žæŽ¥æœ¬åœ°æŽ¨ç†æœåŠ¡å™¨](#connecting-to-local-inference-servers-vllm-ollama-etc)ï¼‰ã€‚

```yaml
services:
  zed:
    image: nousresearch/zed-agent:latest
    container_name: zed
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"
    volumes:
      - ~/.zed:/opt/data
    networks:
      - zed-net

  my-tool:
    image: example/my-tool:latest
    container_name: my-tool
    restart: unless-stopped
    networks:
      - zed-net

networks:
  zed-net:
    driver: bridge
```

åœ¨ Zed å®¹å™¨å†…ï¼Œsidecar å¯é€šè¿‡ `http://my-tool:<port>` è®¿é—®ï¼ˆæˆ–å…¶æä¾›çš„ä»»ä½•åè®®ï¼‰ã€‚è¿™ç§æ¨¡å¼ä½¿æ¯ä¸ªæœåŠ¡çš„ç”Ÿå‘½å‘¨æœŸã€èµ„æºé™åˆ¶å’Œå‡çº§èŠ‚å¥ä¿æŒç‹¬ç«‹ï¼Œé¿å…å› å•ä¸ªå·¥å…·çš„ä¾èµ–è€Œä½¿ Zed é•œåƒè‡ƒè‚¿ã€‚

### å¹¿æ³›æœ‰ç”¨çš„å·¥å…·â€”â€”æäº¤ issue æˆ– pull request

å¦‚æžœæŸä¸ªå·¥å…·å¯èƒ½å¯¹å¤§å¤šæ•° Zed Agent ç”¨æˆ·æœ‰ç”¨ï¼Œè€ƒè™‘å°†å…¶è´¡çŒ®åˆ°ä¸Šæ¸¸ï¼Œè€Œä¸æ˜¯åœ¨ç§æœ‰æ´¾ç”Ÿé•œåƒä¸­ç»´æŠ¤ã€‚åœ¨ [zed-agent ä»“åº“](https://github.com/NousResearch/zed-agent)æäº¤ issue æˆ– pull requestï¼Œæè¿°è¯¥å·¥å…·åŠå…¶ä½¿ç”¨åœºæ™¯ã€‚è¢«çº³å…¥å®˜æ–¹é•œåƒçš„å·¥å…·æƒ åŠæ‰€æœ‰ç”¨æˆ·ï¼Œå¹¶é¿å…äº†ç»´æŠ¤ä¸‹æ¸¸ fork çš„å¼€é”€ã€‚

## è¿žæŽ¥æœ¬åœ°æŽ¨ç†æœåŠ¡å™¨ï¼ˆvLLMã€Ollama ç­‰ï¼‰

åœ¨ Docker ä¸­è¿è¡Œ Zed ä¸”æŽ¨ç†æœåŠ¡å™¨ï¼ˆvLLMã€Ollamaã€text-generation-inference ç­‰ï¼‰ä¹Ÿåœ¨å®¿ä¸»æœºæˆ–å¦ä¸€ä¸ªå®¹å™¨ä¸­è¿è¡Œæ—¶ï¼Œç½‘ç»œé…ç½®éœ€è¦é¢å¤–æ³¨æ„ã€‚

### Docker Composeï¼ˆæŽ¨èï¼‰

å°†ä¸¤ä¸ªæœåŠ¡æ”¾åœ¨åŒä¸€ Docker ç½‘ç»œä¸Šã€‚è¿™æ˜¯æœ€å¯é çš„æ–¹å¼ï¼š

```yaml
services:
  vllm:
    image: vllm/vllm-openai:latest
    container_name: vllm
    command: >
      --model Qwen/Qwen2.5-7B-Instruct
      --served-model-name my-model
      --host 0.0.0.0
      --port 8000
    ports:
      - "8000:8000"
    networks:
      - zed-net
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]

  zed:
    image: nousresearch/zed-agent:latest
    container_name: zed
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"
    volumes:
      - ~/.zed:/opt/data
    networks:
      - zed-net

networks:
  zed-net:
    driver: bridge
```

ç„¶åŽåœ¨ `~/.zed/config.yaml` ä¸­ï¼Œä½¿ç”¨**å®¹å™¨åç§°**ä½œä¸ºä¸»æœºåï¼š

```yaml
model:
  provider: custom
  model: my-model
  base_url: http://vllm:8000/v1
  api_key: "none"
```

:::tip å…³é”®ç‚¹
- ä½¿ç”¨**å®¹å™¨åç§°**ï¼ˆ`vllm`ï¼‰ä½œä¸ºä¸»æœºåâ€”â€”è€Œéž `localhost` æˆ– `127.0.0.1`ï¼Œå®ƒä»¬æŒ‡å‘ Zed å®¹å™¨æœ¬èº«ã€‚
- `model` å€¼å¿…é¡»ä¸Žä¼ ç»™ vLLM çš„ `--served-model-name` ä¸€è‡´ã€‚
- å°† `api_key` è®¾ä¸ºä»»æ„éžç©ºå­—ç¬¦ä¸²ï¼ˆvLLM è¦æ±‚è¯¥è¯·æ±‚å¤´ï¼Œä½†é»˜è®¤ä¸éªŒè¯å…¶å€¼ï¼‰ã€‚
- `base_url` æœ«å°¾**ä¸è¦**åŠ æ–œæ ã€‚
:::

### ç‹¬ç«‹ Docker runï¼ˆæ—  Composeï¼‰

å¦‚æžœæŽ¨ç†æœåŠ¡å™¨ç›´æŽ¥åœ¨å®¿ä¸»æœºä¸Šè¿è¡Œï¼ˆä¸åœ¨ Docker ä¸­ï¼‰ï¼Œåœ¨ macOS/Windows ä¸Šä½¿ç”¨ `host.docker.internal`ï¼Œåœ¨ Linux ä¸Šä½¿ç”¨ `--network host`ï¼š

**macOS / Windowsï¼š**

```sh
docker run -d \
  --name zed \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  nousresearch/zed-agent gateway run
```

```yaml
# config.yaml
model:
  provider: custom
  model: my-model
  base_url: http://host.docker.internal:8000/v1
  api_key: "none"
```

**Linuxï¼ˆhost ç½‘ç»œï¼‰ï¼š**

```sh
docker run -d \
  --name zed \
  --network host \
  -v ~/.zed:/opt/data \
  nousresearch/zed-agent gateway run
```

```yaml
# config.yaml
model:
  provider: custom
  model: my-model
  base_url: http://127.0.0.1:8000/v1
  api_key: "none"
```

:::warning ä½¿ç”¨ `--network host` æ—¶ï¼Œ`-p` æ ‡å¿—ä¼šè¢«å¿½ç•¥â€”â€”æ‰€æœ‰å®¹å™¨ç«¯å£ç›´æŽ¥æš´éœ²åœ¨å®¿ä¸»æœºä¸Šã€‚
:::

### éªŒè¯è¿žé€šæ€§

ä»Ž Zed å®¹å™¨å†…éƒ¨ç¡®è®¤æŽ¨ç†æœåŠ¡å™¨å¯è¾¾ï¼š

```sh
docker exec zed curl -s http://vllm:8000/v1/models
```

ä½ åº”è¯¥çœ‹åˆ°åˆ—å‡ºå·²æœåŠ¡æ¨¡åž‹çš„ JSON å“åº”ã€‚å¦‚æžœå¤±è´¥ï¼Œè¯·æ£€æŸ¥ï¼š

1. ä¸¤ä¸ªå®¹å™¨æ˜¯å¦åœ¨åŒä¸€ Docker ç½‘ç»œä¸Šï¼ˆ`docker network inspect zed-net`ï¼‰
2. æŽ¨ç†æœåŠ¡å™¨æ˜¯å¦ç›‘å¬ `0.0.0.0` è€Œéž `127.0.0.1`
3. ç«¯å£å·æ˜¯å¦åŒ¹é…

### Ollama

Ollama çš„é…ç½®æ–¹å¼ç›¸åŒã€‚å¦‚æžœ Ollama åœ¨å®¿ä¸»æœºä¸Šè¿è¡Œï¼Œä½¿ç”¨ `host.docker.internal:11434`ï¼ˆmacOS/Windowsï¼‰æˆ– `127.0.0.1:11434`ï¼ˆLinux ä½¿ç”¨ `--network host`ï¼‰ã€‚å¦‚æžœ Ollama åœ¨åŒä¸€ Docker ç½‘ç»œçš„ç‹¬ç«‹å®¹å™¨ä¸­è¿è¡Œï¼š

```yaml
model:
  provider: custom
  model: llama3
  base_url: http://ollama:11434/v1
  api_key: "none"
```

## æ•…éšœæŽ’æŸ¥

### å®¹å™¨ç«‹å³é€€å‡º

æ£€æŸ¥æ—¥å¿—ï¼š`docker logs zed`ã€‚å¸¸è§åŽŸå› ï¼š
- `.env` æ–‡ä»¶ç¼ºå¤±æˆ–æ— æ•ˆâ€”â€”å…ˆä»¥äº¤äº’æ–¹å¼è¿è¡Œä»¥å®Œæˆè®¾ç½®
- å¼€æ”¾ç«¯å£æ—¶å­˜åœ¨ç«¯å£å†²çª

### "Permission denied" é”™è¯¯

å®¹å™¨çš„ stage2 hook é€šè¿‡ `s6-setuidgid` åœ¨æ¯ä¸ªå—ç›‘ç®¡çš„æœåŠ¡å†…å°†æƒé™é™è‡³éž root ç”¨æˆ· `zed`ï¼ˆUID 10000ï¼‰ã€‚å¦‚æžœå®¿ä¸»æœºçš„ `~/.zed/` ç”±ä¸åŒ UID æ‹¥æœ‰ï¼Œè¯·è®¾ç½® `ZED_UID`/`ZED_GID` ä»¥åŒ¹é…å®¿ä¸»æœºç”¨æˆ·ï¼Œæˆ–ç¡®ä¿æ•°æ®ç›®å½•å¯å†™ï¼š

```sh
chmod -R 755 ~/.zed
```

### æµè§ˆå™¨å·¥å…·æ— æ³•ä½¿ç”¨

Playwright éœ€è¦å…±äº«å†…å­˜ã€‚åœ¨ Docker run å‘½ä»¤ä¸­æ·»åŠ  `--shm-size=1g`ï¼š

```sh
docker run -d \
  --name zed \
  --shm-size=1g \
  -v ~/.zed:/opt/data \
  nousresearch/zed-agent gateway run
```

### ç½‘ç»œé—®é¢˜åŽ gateway æ— æ³•é‡è¿ž

`--restart unless-stopped` æ ‡å¿—å¯å¤„ç†å¤§å¤šæ•°çž¬æ—¶æ•…éšœã€‚å¦‚æžœ gateway å¡ä½ï¼Œé‡å¯å®¹å™¨ï¼š

```sh
docker restart zed
```

### æ£€æŸ¥å®¹å™¨å¥åº·çŠ¶æ€

```sh
docker logs --tail 50 zed          # æœ€è¿‘æ—¥å¿—
docker run -it --rm nousresearch/zed-agent:latest version     # éªŒè¯ç‰ˆæœ¬
docker stats zed                    # èµ„æºä½¿ç”¨æƒ…å†µ
```