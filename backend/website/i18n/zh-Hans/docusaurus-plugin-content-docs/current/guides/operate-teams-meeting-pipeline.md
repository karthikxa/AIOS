---
title: "æ“ä½œ Teams ä¼šè®®æµæ°´çº¿"
description: "Microsoft Teams ä¼šè®®æµæ°´çº¿çš„è¿è¡Œæ‰‹å†Œã€ä¸Šçº¿æ£€æŸ¥æ¸…å•åŠæ“ä½œå‘˜å·¥ä½œè¡¨"
---

# æ“ä½œ Teams ä¼šè®®æµæ°´çº¿

æœ¬æŒ‡å—é€‚ç”¨äºŽå·²é€šè¿‡ [Teams Meetings](/user-guide/messaging/teams-meetings) å¯ç”¨è¯¥åŠŸèƒ½ä¹‹åŽçš„æ“ä½œé˜¶æ®µã€‚

æœ¬é¡µå†…å®¹ï¼š
- æ“ä½œå‘˜ CLI æµç¨‹
- æ—¥å¸¸è®¢é˜…ç»´æŠ¤
- æ•…éšœæŽ’æŸ¥
- ä¸Šçº¿æ£€æŸ¥
- ä¸Šçº¿å·¥ä½œè¡¨

## æ ¸å¿ƒæ“ä½œå‘˜å‘½ä»¤

### éªŒè¯é…ç½®å¿«ç…§

```bash
zed teams-pipeline validate
```

æ¯æ¬¡é…ç½®å˜æ›´åŽé¦–å…ˆæ‰§è¡Œæ­¤å‘½ä»¤ã€‚

### æ£€æŸ¥ token å¥åº·çŠ¶æ€

```bash
zed teams-pipeline token-health
zed teams-pipeline token-health --force-refresh
```

å½“æ€€ç–‘ authï¼ˆè®¤è¯ï¼‰çŠ¶æ€è¿‡æœŸæ—¶ï¼Œä½¿ç”¨ `--force-refresh`ã€‚

### æ£€æŸ¥è®¢é˜…

```bash
zed teams-pipeline subscriptions
```

### ç»­æœŸå³å°†åˆ°æœŸçš„è®¢é˜…

```bash
zed teams-pipeline maintain-subscriptions
zed teams-pipeline maintain-subscriptions --dry-run
```

### è‡ªåŠ¨åŒ–è®¢é˜…ç»­æœŸï¼ˆç”Ÿäº§çŽ¯å¢ƒå¿…é¡»é…ç½®ï¼‰

**Microsoft Graph è®¢é˜…æœ€å¤š 72 å°æ—¶åŽè¿‡æœŸã€‚** è‹¥æ— ä»»ä½•ç»­æœŸæ“ä½œï¼Œä¼šè®®é€šçŸ¥å°†åœ¨ 3 å¤©åŽé™é»˜åœæ­¢ï¼Œæµæ°´çº¿çœ‹èµ·æ¥åƒæ˜¯"æ•…éšœ"ã€‚è¿™æ˜¯æ‰€æœ‰åŸºäºŽ Graph çš„é›†æˆä¸­æœ€å¸¸è§çš„è¿ç»´æ•…éšœæ¨¡å¼ã€‚

ä½ **å¿…é¡»**æŒ‰è®¡åˆ’è¿è¡Œ `maintain-subscriptions`ã€‚ä»Žä»¥ä¸‹ä¸‰ç§æ–¹å¼ä¸­é€‰æ‹©ä¸€ç§ï¼š

#### æ–¹å¼ä¸€ï¼šZed cronï¼ˆè‹¥å·²è¿è¡Œ Zed gatewayï¼ŒæŽ¨èæ­¤æ–¹å¼ï¼‰

Zed å†…ç½® cron è°ƒåº¦å™¨ã€‚`--no-agent` æ¨¡å¼ä»¥è„šæœ¬ä½œä¸ºä»»åŠ¡æ‰§è¡Œï¼ˆè€Œéžä½¿ç”¨ LLMï¼‰ï¼Œ`--script` å¿…é¡»æŒ‡å‘ `~/.zed/scripts/` ä¸‹çš„æ–‡ä»¶ã€‚é¦–å…ˆåˆ›å»ºè„šæœ¬ï¼š

```bash
mkdir -p ~/.zed/scripts
cat > ~/.zed/scripts/maintain-teams-subscriptions.sh <<'EOF'
#!/usr/bin/env bash
exec zed teams-pipeline maintain-subscriptions
EOF
chmod +x ~/.zed/scripts/maintain-teams-subscriptions.sh
```

ç„¶åŽæ³¨å†Œä¸€ä¸ªæ¯ 12 å°æ—¶è¿è¡Œä¸€æ¬¡çš„çº¯è„šæœ¬ cron ä»»åŠ¡ï¼ˆç›¸å¯¹äºŽ 72 å°æ—¶è¿‡æœŸçª—å£æœ‰ 6 å€ä½™é‡ï¼‰ï¼š

```bash
zed cron create "0 */12 * * *" \
  --name "teams-pipeline-maintain-subscriptions" \
  --no-agent \
  --script maintain-teams-subscriptions.sh \
  --deliver local
```

éªŒè¯æ³¨å†Œæƒ…å†µå¹¶æŸ¥çœ‹ä¸‹æ¬¡è¿è¡Œæ—¶é—´ï¼š

```bash
zed cron list
zed cron status        # è°ƒåº¦å™¨çŠ¶æ€
```

#### æ–¹å¼äºŒï¼šsystemd timerï¼ˆæŽ¨èç”¨äºŽ Linux ç”Ÿäº§éƒ¨ç½²ï¼‰

åˆ›å»º `/etc/systemd/system/zed-teams-pipeline-maintain.service`ï¼š

```ini
[Unit]
Description=Zed Teams pipeline subscription maintenance
After=network-online.target

[Service]
Type=oneshot
User=zed
EnvironmentFile=/etc/zed/env
ExecStart=/usr/local/bin/zed teams-pipeline maintain-subscriptions
```

ä»¥åŠ `/etc/systemd/system/zed-teams-pipeline-maintain.timer`ï¼š

```ini
[Unit]
Description=Run Zed Teams pipeline subscription maintenance every 12 hours

[Timer]
OnBootSec=5min
OnUnitActiveSec=12h
Persistent=true

[Install]
WantedBy=timers.target
```

å¯ç”¨ï¼š

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now zed-teams-pipeline-maintain.timer
systemctl list-timers zed-teams-pipeline-maintain.timer
```

#### æ–¹å¼ä¸‰ï¼šæ™®é€š crontab

```cron
0 */12 * * * /usr/local/bin/zed teams-pipeline maintain-subscriptions >> /var/log/zed/teams-pipeline-maintain.log 2>&1
```

ç¡®ä¿ cron çŽ¯å¢ƒä¸­åŒ…å« `MSGRAPH_*` å‡­æ®ã€‚æœ€ç®€å•çš„æ–¹æ³•ï¼šåœ¨ crontab è°ƒç”¨çš„åŒ…è£…è„šæœ¬é¡¶éƒ¨ source `~/.zed/.env`ã€‚

#### éªŒè¯ç»­æœŸæ˜¯å¦æ­£å¸¸å·¥ä½œ

è®¾ç½®å¥½è®¡åˆ’ä»»åŠ¡åŽï¼Œåœ¨é¦–æ¬¡è®¡åˆ’è¿è¡ŒåŽæ£€æŸ¥ç»­æœŸæ´»åŠ¨ï¼š

```bash
zed teams-pipeline subscriptions   # åº”æ˜¾ç¤º expirationDateTime å·²æŽ¨è¿›
zed teams-pipeline maintain-subscriptions --dry-run   # å¤§å¤šæ•°æ—¶å€™åº”æ˜¾ç¤º"0 expiring soon"
```

å¦‚æžœä½ å‘çŽ° Graph webhook åœ¨æ°å¥½çº¦ 72 å°æ—¶åŽç¥žç§˜åœ°"åœæ­¢å·¥ä½œ"ï¼Œè¿™æ˜¯é¦–å…ˆè¦æ£€æŸ¥çš„åœ°æ–¹ï¼šç»­æœŸä»»åŠ¡æ˜¯å¦å®žé™…è¿è¡Œäº†ï¼Ÿ

### æŸ¥çœ‹æœ€è¿‘çš„ä»»åŠ¡

```bash
zed teams-pipeline list
zed teams-pipeline list --status failed
zed teams-pipeline show <job-id>
```

### é‡æ”¾å·²å­˜å‚¨çš„ä»»åŠ¡

```bash
zed teams-pipeline run <job-id>
```

### å¹²è¿è¡Œä¼šè®®äº§ç‰©æ‹‰å–

```bash
zed teams-pipeline fetch --meeting-id <meeting-id>
zed teams-pipeline fetch --join-web-url "<join-url>"
```

## æ—¥å¸¸è¿è¡Œæ‰‹å†Œ

### é¦–æ¬¡è®¾ç½®åŽ

æŒ‰é¡ºåºæ‰§è¡Œï¼š

```bash
zed teams-pipeline validate
zed teams-pipeline token-health --force-refresh
zed teams-pipeline subscriptions
```

ç„¶åŽè§¦å‘æˆ–ç­‰å¾…ä¸€ä¸ªçœŸå®žçš„ä¼šè®®äº‹ä»¶ï¼Œå¹¶ç¡®è®¤ï¼š

```bash
zed teams-pipeline list
zed teams-pipeline show <job-id>
```

### æ¯æ—¥æˆ–å®šæœŸæ£€æŸ¥

- è¿è¡Œ `zed teams-pipeline maintain-subscriptions --dry-run`
- æ£€æŸ¥ `zed teams-pipeline list --status failed`
- ç¡®è®¤ Teams æŠ•é€’ç›®æ ‡ä»ä¸ºæ­£ç¡®çš„èŠå¤©æˆ–é¢‘é“

### å˜æ›´ webhook URL æˆ–æŠ•é€’ç›®æ ‡å‰

- æ›´æ–°å…¬å…±é€šçŸ¥ URL æˆ– Teams ç›®æ ‡é…ç½®
- è¿è¡Œ `zed teams-pipeline validate`
- ç»­æœŸæˆ–é‡æ–°åˆ›å»ºå—å½±å“çš„è®¢é˜…
- ç¡®è®¤æ–°äº‹ä»¶è½å…¥é¢„æœŸçš„æŽ¥æ”¶ç«¯

## æ•…éšœæŽ’æŸ¥

### æœªåˆ›å»ºä»»ä½•ä»»åŠ¡

æ£€æŸ¥ï¼š
- `msgraph_webhook` æ˜¯å¦å·²å¯ç”¨
- å…¬å…±é€šçŸ¥ URL æ˜¯å¦æŒ‡å‘ `/msgraph/webhook`
- è®¢é˜…ä¸­çš„ client state æ˜¯å¦ä¸Ž `MSGRAPH_WEBHOOK_CLIENT_STATE` åŒ¹é…
- è®¢é˜…æ˜¯å¦åœ¨è¿œç«¯ä»ç„¶å­˜åœ¨ä¸”æœªè¿‡æœŸ

### ä»»åŠ¡åœç•™åœ¨é‡è¯•çŠ¶æ€æˆ–åœ¨æ‘˜è¦ç”Ÿæˆå‰å¤±è´¥

æ£€æŸ¥ï¼š
- è½¬å½•æƒé™åŠå¯ç”¨æ€§
- å½•åˆ¶æƒé™åŠäº§ç‰©å¯ç”¨æ€§
- è‹¥å¯ç”¨äº†å½•åˆ¶å›žé€€ï¼Œæ£€æŸ¥ `ffmpeg` æ˜¯å¦å¯ç”¨
- Graph token å¥åº·çŠ¶æ€

### æ‘˜è¦å·²ç”Ÿæˆä½†æœªæŠ•é€’åˆ° Teams

æ£€æŸ¥ï¼š
- `platforms.teams.enabled: true`
- `delivery_mode`
- webhook æ¨¡å¼ä¸‹çš„ `incoming_webhook_url`
- Graph æ¨¡å¼ä¸‹çš„ `chat_id` æˆ– `team_id` åŠ  `channel_id`
- è‹¥ä½¿ç”¨ Graph å‘å¸–ï¼Œæ£€æŸ¥ Teams auth é…ç½®

### é‡å¤æˆ–æ„å¤–çš„é‡æ”¾

æ£€æŸ¥ï¼š
- æ˜¯å¦æ‰‹åŠ¨é€šè¿‡ `zed teams-pipeline run` é‡æ”¾äº†ä»»åŠ¡
- è¯¥ä¼šè®®çš„ sink è®°å½•æ˜¯å¦å·²å­˜åœ¨
- æ˜¯å¦åœ¨æœ¬åœ°é…ç½®ä¸­æœ‰æ„å¯ç”¨äº†é‡å‘è·¯å¾„

## ä¸Šçº¿æ£€æŸ¥æ¸…å•

- [ ] Graph å‡­æ®å·²å­˜åœ¨ä¸”æ­£ç¡®
- [ ] `msgraph_webhook` å·²å¯ç”¨ä¸”å¯ä»Žå…¬ç½‘è®¿é—®
- [ ] `MSGRAPH_WEBHOOK_CLIENT_STATE` å·²è®¾ç½®ä¸”ä¸Žè®¢é˜…åŒ¹é…
- [ ] è½¬å½•è®¢é˜…å·²åˆ›å»º
- [ ] è‹¥éœ€è¦ STT å›žé€€ï¼Œå½•åˆ¶è®¢é˜…å·²åˆ›å»º
- [ ] è‹¥å¯ç”¨å½•åˆ¶å›žé€€ï¼Œ`ffmpeg` å·²å®‰è£…
- [ ] Teams å‡ºç«™æŠ•é€’ç›®æ ‡å·²é…ç½®å¹¶éªŒè¯
- [ ] Notion å’Œ Linear æŽ¥æ”¶ç«¯ä»…åœ¨å®žé™…éœ€è¦æ—¶é…ç½®
- [ ] `zed teams-pipeline validate` è¿”å›ž OK å¿«ç…§
- [ ] `zed teams-pipeline token-health --force-refresh` æ‰§è¡ŒæˆåŠŸ
- [ ] **`maintain-subscriptions` å·²é…ç½®è®¡åˆ’ä»»åŠ¡**ï¼ˆZed cronã€systemd timer æˆ– crontabâ€”â€”å‚è§[è‡ªåŠ¨åŒ–è®¢é˜…ç»­æœŸ](#automating-subscription-renewal-required-for-production)ï¼‰ã€‚è‹¥æœªé…ç½®ï¼ŒGraph è®¢é˜…å°†åœ¨ 72 å°æ—¶å†…é™é»˜è¿‡æœŸã€‚
- [ ] ä¸€ä¸ªçœŸå®žçš„ç«¯åˆ°ç«¯ä¼šè®®äº‹ä»¶å·²ç”Ÿæˆå­˜å‚¨ä»»åŠ¡
- [ ] è‡³å°‘ä¸€æ¡æ‘˜è¦å·²åˆ°è¾¾é¢„æœŸçš„æŠ•é€’æŽ¥æ”¶ç«¯

## æŠ•é€’æ¨¡å¼å†³ç­–æŒ‡å—

| æ¨¡å¼ | é€‚ç”¨åœºæ™¯ | æƒè¡¡ |
|------|----------|----------|
| `incoming_webhook` | ä»…éœ€ç®€å•åœ°å‘ Teams å‘å¸– | é…ç½®æœ€ç®€å•ï¼ŒæŽ§åˆ¶è¾ƒå°‘ |
| `graph` | éœ€è¦é€šè¿‡ Graph å‘é¢‘é“æˆ–èŠå¤©å‘å¸– | æŽ§åˆ¶æ›´å¤šï¼Œauth å’Œç›®æ ‡é…ç½®æ›´å¤æ‚ |

## æ“ä½œå‘˜å·¥ä½œè¡¨

ä¸Šçº¿å‰å¡«å†™ï¼š

| é¡¹ç›® | å€¼ |
|------|-------|
| å…¬å…±é€šçŸ¥ URL | |
| Graph ç§Ÿæˆ· ID | |
| Graph å®¢æˆ·ç«¯ ID | |
| Webhook client state | |
| è½¬å½•èµ„æºè®¢é˜… | |
| å½•åˆ¶èµ„æºè®¢é˜… | |
| Teams æŠ•é€’æ¨¡å¼ | |
| Teams èŠå¤© ID æˆ–å›¢é˜Ÿ/é¢‘é“ | |
| Notion æ•°æ®åº“ ID | |
| Linear å›¢é˜Ÿ ID | |
| Store è·¯å¾„è¦†ç›–ï¼ˆå¦‚æœ‰ï¼‰ | |
| æ¯æ—¥æ£€æŸ¥è´Ÿè´£äºº | |

## å˜æ›´å®¡æŸ¥å·¥ä½œè¡¨

å˜æ›´éƒ¨ç½²å‰ä½¿ç”¨ï¼š

| é—®é¢˜ | ç­”æ¡ˆ |
|----------|--------|
| æ˜¯å¦æ­£åœ¨å˜æ›´å…¬å…± webhook URLï¼Ÿ | |
| æ˜¯å¦æ­£åœ¨è½®æ¢ Graph å‡­æ®ï¼Ÿ | |
| æ˜¯å¦æ­£åœ¨å˜æ›´ Teams æŠ•é€’æ¨¡å¼ï¼Ÿ | |
| æ˜¯å¦æ­£åœ¨è¿ç§»åˆ°æ–°çš„ Teams èŠå¤©æˆ–é¢‘é“ï¼Ÿ | |
| è®¢é˜…æ˜¯å¦éœ€è¦é‡æ–°åˆ›å»ºæˆ–ç»­æœŸï¼Ÿ | |
| æ˜¯å¦éœ€è¦é‡æ–°è¿›è¡Œç«¯åˆ°ç«¯éªŒè¯ï¼Ÿ | |

## ç›¸å…³æ–‡æ¡£

- [Teams Meetings è®¾ç½®](/user-guide/messaging/teams-meetings)
- [Microsoft Teams bot è®¾ç½®](/user-guide/messaging/teams)
