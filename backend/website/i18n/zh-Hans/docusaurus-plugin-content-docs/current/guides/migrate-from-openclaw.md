---
sidebar_position: 10
title: "ä»Ž OpenClaw è¿ç§»"
description: "å°† OpenClaw / Clawdbot é…ç½®è¿ç§»åˆ° Zed Agent çš„å®Œæ•´æŒ‡å—â€”â€”åŒ…æ‹¬è¿ç§»å†…å®¹ã€é…ç½®é”®æ˜ å°„åŠè¿ç§»åŽçš„æ£€æŸ¥äº‹é¡¹ã€‚"
---

# ä»Ž OpenClaw è¿ç§»

`zed claw migrate` å°†ä½ çš„ OpenClawï¼ˆæˆ–æ—§ç‰ˆ Clawdbot/Moldbotï¼‰é…ç½®å¯¼å…¥ Zedã€‚æœ¬æŒ‡å—è¯¦ç»†è¯´æ˜Žè¿ç§»å†…å®¹ã€é…ç½®é”®æ˜ å°„ä»¥åŠè¿ç§»åŽçš„éªŒè¯æ­¥éª¤ã€‚

## å¿«é€Ÿå¼€å§‹

```bash
# é¢„è§ˆåŽè¿ç§»ï¼ˆå§‹ç»ˆå…ˆæ˜¾ç¤ºé¢„è§ˆï¼Œå†è¦æ±‚ç¡®è®¤ï¼‰
zed claw migrate

# ä»…é¢„è§ˆï¼Œä¸åšä»»ä½•æ›´æ”¹
zed claw migrate --dry-run

# å®Œæ•´è¿ç§»ï¼ŒåŒ…å« API å¯†é’¥ï¼Œè·³è¿‡ç¡®è®¤
zed claw migrate --preset full --migrate-secrets --yes
```

è¿ç§»æ“ä½œåœ¨æ‰§è¡Œä»»ä½•æ›´æ”¹å‰ï¼Œå§‹ç»ˆä¼šæ˜¾ç¤ºå®Œæ•´çš„å¯¼å…¥é¢„è§ˆã€‚è¯·æ£€æŸ¥åˆ—è¡¨åŽç¡®è®¤ç»§ç»­ã€‚

é»˜è®¤ä»Ž `~/.openclaw/` è¯»å–ã€‚æ—§ç‰ˆ `~/.clawdbot/` æˆ– `~/.moltbot/` ç›®å½•ä¼šè¢«è‡ªåŠ¨æ£€æµ‹ï¼Œæ—§ç‰ˆé…ç½®æ–‡ä»¶åï¼ˆ`clawdbot.json`ã€`moltbot.json`ï¼‰åŒç†ã€‚

## é€‰é¡¹

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--dry-run` | ä»…é¢„è§ˆâ€”â€”æ˜¾ç¤ºå°†è¿ç§»çš„å†…å®¹åŽåœæ­¢ã€‚ |
| `--preset <name>` | `full`ï¼ˆæ‰€æœ‰å…¼å®¹è®¾ç½®ï¼‰æˆ– `user-data`ï¼ˆæŽ’é™¤åŸºç¡€è®¾æ–½é…ç½®ï¼‰ã€‚ä¸¤ç§é¢„è®¾é»˜è®¤å‡ä¸å¯¼å…¥å¯†é’¥â€”â€”éœ€æ˜¾å¼ä¼ å…¥ `--migrate-secrets`ã€‚ |
| `--overwrite` | å†²çªæ—¶è¦†ç›–å·²æœ‰ Zed æ–‡ä»¶ï¼ˆé»˜è®¤ï¼šè®¡åˆ’å­˜åœ¨å†²çªæ—¶æ‹’ç»æ‰§è¡Œï¼‰ã€‚ |
| `--migrate-secrets` | åŒ…å« API å¯†é’¥ã€‚å³ä½¿ä½¿ç”¨ `--preset full` ä¹Ÿéœ€è¦æ˜¾å¼æŒ‡å®šâ€”â€”æ²¡æœ‰ä»»ä½•é¢„è®¾ä¼šé™é»˜å¯¼å…¥å¯†é’¥ã€‚ |
| `--no-backup` | è·³è¿‡è¿ç§»å‰å¯¹ `~/.zed/` çš„ zip å¿«ç…§å¤‡ä»½ï¼ˆé»˜è®¤åœ¨æ‰§è¡Œå‰å†™å…¥å•ä¸ªè¿˜åŽŸç‚¹å½’æ¡£ï¼Œä½äºŽ `~/.zed/backups/pre-migration-*.zip`ï¼›å¯é€šè¿‡ `zed import` è¿˜åŽŸï¼‰ã€‚ |
| `--source <path>` | è‡ªå®šä¹‰ OpenClaw ç›®å½•ã€‚ |
| `--workspace-target <path>` | `AGENTS.md` çš„æ”¾ç½®ä½ç½®ã€‚ |
| `--skill-conflict <mode>` | `skip`ï¼ˆé»˜è®¤ï¼‰ã€`overwrite` æˆ– `rename`ã€‚ |
| `--yes` | è·³è¿‡é¢„è§ˆåŽçš„ç¡®è®¤æç¤ºã€‚ |

## è¿ç§»å†…å®¹

### Personaï¼ˆè§’è‰²è®¾å®šï¼‰ã€è®°å¿†ä¸ŽæŒ‡ä»¤

| å†…å®¹ | OpenClaw æ¥æº | Zed ç›®æ ‡ | å¤‡æ³¨ |
|------|----------------|-------------------|-------|
| Persona | `workspace/SOUL.md` | `~/.zed/SOUL.md` | ç›´æŽ¥å¤åˆ¶ |
| å·¥ä½œåŒºæŒ‡ä»¤ | `workspace/AGENTS.md` | `--workspace-target` ä¸­çš„ `AGENTS.md` | éœ€è¦ `--workspace-target` æ ‡å¿— |
| é•¿æœŸè®°å¿† | `workspace/MEMORY.md` | `~/.zed/memories/MEMORY.md` | è§£æžä¸ºæ¡ç›®ï¼Œä¸ŽçŽ°æœ‰å†…å®¹åˆå¹¶å¹¶åŽ»é‡ï¼Œä½¿ç”¨ `Â§` åˆ†éš”ç¬¦ |
| ç”¨æˆ·æ¡£æ¡ˆ | `workspace/USER.md` | `~/.zed/memories/USER.md` | ä¸Žè®°å¿†ç›¸åŒçš„æ¡ç›®åˆå¹¶é€»è¾‘ |
| æ¯æ—¥è®°å¿†æ–‡ä»¶ | `workspace/memory/*.md` | `~/.zed/memories/MEMORY.md` | æ‰€æœ‰æ¯æ—¥æ–‡ä»¶åˆå¹¶è‡³ä¸»è®°å¿† |

å·¥ä½œåŒºæ–‡ä»¶è¿˜ä¼šåœ¨ `workspace.default/` å’Œ `workspace-main/` ä½œä¸ºå¤‡ç”¨è·¯å¾„è¿›è¡Œæ£€æµ‹ï¼ˆOpenClaw åœ¨è¿‘æœŸç‰ˆæœ¬ä¸­å°† `workspace/` é‡å‘½åä¸º `workspace-main/`ï¼Œå¤š Agent é…ç½®ä¸‹ä½¿ç”¨ `workspace-{agentId}`ï¼‰ã€‚

### Skillsï¼ˆæŠ€èƒ½ï¼Œ4 ä¸ªæ¥æºï¼‰

| æ¥æº | OpenClaw ä½ç½® | Zed ç›®æ ‡ |
|--------|------------------|-------------------|
| å·¥ä½œåŒº skills | `workspace/skills/` | `~/.zed/skills/openclaw-imports/` |
| æ‰˜ç®¡/å…±äº« skills | `~/.openclaw/skills/` | `~/.zed/skills/openclaw-imports/` |
| ä¸ªäººè·¨é¡¹ç›® skills | `~/.agents/skills/` | `~/.zed/skills/openclaw-imports/` |
| é¡¹ç›®çº§å…±äº« skills | `workspace/.agents/skills/` | `~/.zed/skills/openclaw-imports/` |

Skill å†²çªç”± `--skill-conflict` å¤„ç†ï¼š`skip` ä¿ç•™çŽ°æœ‰ Zed skillï¼Œ`overwrite` æ›¿æ¢ï¼Œ`rename` åˆ›å»ºå¸¦ `-imported` åŽç¼€çš„å‰¯æœ¬ã€‚

### æ¨¡åž‹ä¸Ž Provider é…ç½®

| å†…å®¹ | OpenClaw é…ç½®è·¯å¾„ | Zed ç›®æ ‡ | å¤‡æ³¨ |
|------|---------------------|-------------------|-------|
| é»˜è®¤æ¨¡åž‹ | `agents.defaults.model` | `config.yaml` â†’ `model` | å¯ä¸ºå­—ç¬¦ä¸²æˆ– `{primary, fallbacks}` å¯¹è±¡ |
| è‡ªå®šä¹‰ providers | `models.providers.*` | `config.yaml` â†’ `custom_providers` | æ˜ å°„ `baseUrl`ã€`apiType`/`api`â€”â€”åŒæ—¶å¤„ç†çŸ­æ ¼å¼ï¼ˆ"openai"ã€"anthropic"ï¼‰å’Œå¸¦è¿žå­—ç¬¦æ ¼å¼ï¼ˆ"openai-completions"ã€"anthropic-messages"ã€"google-generative-ai"ï¼‰ |
| Provider API å¯†é’¥ | `models.providers.*.apiKey` | `~/.zed/.env` | éœ€è¦ `--migrate-secrets`ã€‚å‚è§ä¸‹æ–¹ [API å¯†é’¥è§£æž](#api-key-resolution) |

### Agent è¡Œä¸º

| å†…å®¹ | OpenClaw é…ç½®è·¯å¾„ | Zed é…ç½®è·¯å¾„ | æ˜ å°„è§„åˆ™ |
|------|---------------------|-------------------|---------|
| æœ€å¤§è½®æ¬¡ | `agents.defaults.timeoutSeconds` | `agent.max_turns` | `timeoutSeconds / 10`ï¼Œä¸Šé™ 200 |
| è¯¦ç»†æ¨¡å¼ | `agents.defaults.verboseDefault` | `agent.verbose` | "off" / "on" / "full" |
| æŽ¨ç†å¼ºåº¦ | `agents.defaults.thinkingDefault` | `agent.reasoning_effort` | "always"/"high"/"xhigh" â†’ "high"ï¼Œ"auto"/"medium"/"adaptive" â†’ "medium"ï¼Œ"off"/"low"/"none"/"minimal" â†’ "low" |
| åŽ‹ç¼© | `agents.defaults.compaction.mode` | `compression.enabled` | "off" â†’ falseï¼Œå…¶ä»– â†’ true |
| åŽ‹ç¼©æ¨¡åž‹ | `agents.defaults.compaction.model` | `compression.summary_model` | ç›´æŽ¥å­—ç¬¦ä¸²å¤åˆ¶ |
| äººå·¥å»¶è¿Ÿ | `agents.defaults.humanDelay.mode` | `human_delay.mode` | "natural" / "custom" / "off" |
| äººå·¥å»¶è¿Ÿæ—¶é—´ | `agents.defaults.humanDelay.minMs` / `.maxMs` | `human_delay.min_ms` / `.max_ms` | ç›´æŽ¥å¤åˆ¶ |
| æ—¶åŒº | `agents.defaults.userTimezone` | `timezone` | ç›´æŽ¥å­—ç¬¦ä¸²å¤åˆ¶ |
| æ‰§è¡Œè¶…æ—¶ | `tools.exec.timeoutSec` | `terminal.timeout` | ç›´æŽ¥å¤åˆ¶ï¼ˆå­—æ®µåä¸º `timeoutSec`ï¼Œéž `timeout`ï¼‰ |
| Docker æ²™ç®± | `agents.defaults.sandbox.backend` | `terminal.backend` | "docker" â†’ "docker" |
| Docker é•œåƒ | `agents.defaults.sandbox.docker.image` | `terminal.docker_image` | ç›´æŽ¥å¤åˆ¶ |

### ä¼šè¯é‡ç½®ç­–ç•¥

| OpenClaw é…ç½®è·¯å¾„ | Zed é…ç½®è·¯å¾„ | å¤‡æ³¨ |
|---------------------|-------------------|-------|
| `session.reset.mode` | `session_reset.mode` | "daily"ã€"idle" æˆ–ä¸¤è€… |
| `session.reset.atHour` | `session_reset.at_hour` | æ¯æ—¥é‡ç½®çš„å°æ—¶ï¼ˆ0â€“23ï¼‰ |
| `session.reset.idleMinutes` | `session_reset.idle_minutes` | ä¸æ´»è·ƒåˆ†é’Ÿæ•° |

æ³¨æ„ï¼šOpenClaw è¿˜æœ‰ `session.resetTriggers`ï¼ˆç®€å•å­—ç¬¦ä¸²æ•°ç»„ï¼Œå¦‚ `["daily", "idle"]`ï¼‰ã€‚è‹¥ç»“æž„åŒ–çš„ `session.reset` ä¸å­˜åœ¨ï¼Œè¿ç§»å°†å›žé€€åˆ°ä»Ž `resetTriggers` æŽ¨æ–­ã€‚

### MCP æœåŠ¡å™¨

| OpenClaw å­—æ®µ | Zed å­—æ®µ | å¤‡æ³¨ |
|----------------|-------------|-------|
| `mcp.servers.*.command` | `mcp_servers.*.command` | stdio ä¼ è¾“ |
| `mcp.servers.*.args` | `mcp_servers.*.args` | |
| `mcp.servers.*.env` | `mcp_servers.*.env` | |
| `mcp.servers.*.cwd` | `mcp_servers.*.cwd` | |
| `mcp.servers.*.url` | `mcp_servers.*.url` | HTTP/SSE ä¼ è¾“ |
| `mcp.servers.*.tools.include` | `mcp_servers.*.tools.include` | å·¥å…·è¿‡æ»¤ |
| `mcp.servers.*.tools.exclude` | `mcp_servers.*.tools.exclude` | |

### TTSï¼ˆæ–‡å­—è½¬è¯­éŸ³ï¼‰

TTS è®¾ç½®ä»Ž OpenClaw é…ç½®çš„**ä¸¤ä¸ª**ä½ç½®è¯»å–ï¼Œä¼˜å…ˆçº§å¦‚ä¸‹ï¼š

1. `messages.tts.providers.{provider}.*`ï¼ˆè§„èŒƒä½ç½®ï¼‰
2. é¡¶å±‚ `talk.providers.{provider}.*`ï¼ˆå¤‡ç”¨ï¼‰
3. æ—§ç‰ˆæ‰å¹³é”® `messages.tts.{provider}.*`ï¼ˆæœ€æ—§æ ¼å¼ï¼‰

| å†…å®¹ | Zed ç›®æ ‡ |
|------|-------------------|
| Provider åç§° | `config.yaml` â†’ `tts.provider` |
| ElevenLabs voice ID | `config.yaml` â†’ `tts.elevenlabs.voice_id` |
| ElevenLabs model ID | `config.yaml` â†’ `tts.elevenlabs.model_id` |
| OpenAI æ¨¡åž‹ | `config.yaml` â†’ `tts.openai.model` |
| OpenAI è¯­éŸ³ | `config.yaml` â†’ `tts.openai.voice` |
| Edge TTS è¯­éŸ³ | `config.yaml` â†’ `tts.edge.voice`ï¼ˆOpenClaw å°† "edge" é‡å‘½åä¸º "microsoft"â€”â€”ä¸¤è€…å‡å¯è¯†åˆ«ï¼‰ |
| TTS èµ„æºæ–‡ä»¶ | `~/.zed/tts/`ï¼ˆæ–‡ä»¶å¤åˆ¶ï¼‰ |

### æ¶ˆæ¯å¹³å°

| å¹³å° | OpenClaw é…ç½®è·¯å¾„ | Zed `.env` å˜é‡ | å¤‡æ³¨ |
|----------|---------------------|----------------------|-------|
| Telegram | `channels.telegram.botToken` æˆ– `.accounts.default.botToken` | `TELEGRAM_BOT_TOKEN` | Token å¯ä¸ºå­—ç¬¦ä¸²æˆ– [SecretRef](#secretref-handling)ï¼Œæ”¯æŒæ‰å¹³å’Œ accounts ä¸¤ç§å¸ƒå±€ |
| Telegram | `credentials/telegram-default-allowFrom.json` | `TELEGRAM_ALLOWED_USERS` | ä»Ž `allowFrom[]` æ•°ç»„é€—å·æ‹¼æŽ¥ |
| Discord | `channels.discord.token` æˆ– `.accounts.default.token` | `DISCORD_BOT_TOKEN` | |
| Discord | `channels.discord.allowFrom` æˆ– `.accounts.default.allowFrom` | `DISCORD_ALLOWED_USERS` | |
| Slack | `channels.slack.botToken` æˆ– `.accounts.default.botToken` | `SLACK_BOT_TOKEN` | |
| Slack | `channels.slack.appToken` æˆ– `.accounts.default.appToken` | `SLACK_APP_TOKEN` | |
| Slack | `channels.slack.allowFrom` æˆ– `.accounts.default.allowFrom` | `SLACK_ALLOWED_USERS` | |
| WhatsApp | `channels.whatsapp.allowFrom` æˆ– `.accounts.default.allowFrom` | `WHATSAPP_ALLOWED_USERS` | é€šè¿‡ Baileys äºŒç»´ç é…å¯¹è®¤è¯â€”â€”è¿ç§»åŽéœ€é‡æ–°é…å¯¹ |
| Signal | `channels.signal.account` æˆ– `.accounts.default.account` | `SIGNAL_ACCOUNT` | |
| Signal | `channels.signal.httpUrl` æˆ– `.accounts.default.httpUrl` | `SIGNAL_HTTP_URL` | |
| Signal | `channels.signal.allowFrom` æˆ– `.accounts.default.allowFrom` | `SIGNAL_ALLOWED_USERS` | |
| Matrix | `channels.matrix.accessToken` æˆ– `.accounts.default.accessToken` | `MATRIX_ACCESS_TOKEN` | ä½¿ç”¨ `accessToken`ï¼ˆéž `botToken`ï¼‰ |
| Mattermost | `channels.mattermost.botToken` æˆ– `.accounts.default.botToken` | `MATTERMOST_BOT_TOKEN` | |

### å…¶ä»–é…ç½®

| å†…å®¹ | OpenClaw è·¯å¾„ | Zed è·¯å¾„ | å¤‡æ³¨ |
|------|-------------|-------------|-------|
| å®¡æ‰¹æ¨¡å¼ | `approvals.exec.mode` | `config.yaml` â†’ `approvals.mode` | "auto"â†’"off"ï¼Œ"always"â†’"manual"ï¼Œ"smart"â†’"smart" |
| å‘½ä»¤ç™½åå• | `exec-approvals.json` | `config.yaml` â†’ `command_allowlist` | æ¨¡å¼åˆå¹¶å¹¶åŽ»é‡ |
| æµè§ˆå™¨ CDP URL | `browser.cdpUrl` | `config.yaml` â†’ `browser.cdp_url` | |
| æµè§ˆå™¨æ— å¤´æ¨¡å¼ | `browser.headless` | `config.yaml` â†’ `browser.headless` | |
| Brave æœç´¢å¯†é’¥ | `tools.web.search.brave.apiKey` | `.env` â†’ `BRAVE_API_KEY` | éœ€è¦ `--migrate-secrets` |
| Gateway è®¤è¯ token | `gateway.auth.token` | `.env` â†’ `ZED_GATEWAY_TOKEN` | éœ€è¦ `--migrate-secrets` |
| å·¥ä½œç›®å½• | `agents.defaults.workspace` | `.env` â†’ `MESSAGING_CWD` | |

### å·²å½’æ¡£ï¼ˆæ— å¯¹åº” Zed ç­‰æ•ˆé¡¹ï¼‰

ä»¥ä¸‹å†…å®¹ä¿å­˜è‡³ `~/.zed/migration/openclaw/<timestamp>/archive/` ä¾›äººå·¥å®¡æŸ¥ï¼š

| å†…å®¹ | å½’æ¡£æ–‡ä»¶ | åœ¨ Zed ä¸­çš„é‡å»ºæ–¹å¼ |
|------|-------------|--------------------------|
| `IDENTITY.md` | `archive/workspace/IDENTITY.md` | åˆå¹¶è‡³ `SOUL.md` |
| `TOOLS.md` | `archive/workspace/TOOLS.md` | Zed å†…ç½®å·¥å…·è¯´æ˜Ž |
| `HEARTBEAT.md` | `archive/workspace/HEARTBEAT.md` | ä½¿ç”¨ cron ä½œä¸šæ‰§è¡Œå‘¨æœŸæ€§ä»»åŠ¡ |
| `BOOTSTRAP.md` | `archive/workspace/BOOTSTRAP.md` | ä½¿ç”¨ä¸Šä¸‹æ–‡æ–‡ä»¶æˆ– skills |
| Cron ä½œä¸š | `archive/cron-config.json` | é€šè¿‡ `zed cron create` é‡å»º |
| æ’ä»¶ | `archive/plugins-config.json` | å‚è§ [æ’ä»¶æŒ‡å—](/user-guide/features/hooks) |
| Hooks/webhooks | `archive/hooks-config.json` | ä½¿ç”¨ `zed webhook` æˆ– gateway hooks |
| è®°å¿†åŽç«¯ | `archive/memory-backend-config.json` | é€šè¿‡ `zed honcho` é…ç½® |
| Skills æ³¨å†Œè¡¨ | `archive/skills-registry-config.json` | ä½¿ç”¨ `zed skills config` |
| UI/èº«ä»½ | `archive/ui-identity-config.json` | ä½¿ç”¨ `/skin` å‘½ä»¤ |
| æ—¥å¿— | `archive/logging-diagnostics-config.json` | åœ¨ `config.yaml` æ—¥å¿—éƒ¨åˆ†è®¾ç½® |
| å¤š Agent åˆ—è¡¨ | `archive/agents-list.json` | ä½¿ç”¨ Zed profiles |
| é¢‘é“ç»‘å®š | `archive/bindings.json` | æŒ‰å¹³å°æ‰‹åŠ¨é…ç½® |
| å¤æ‚é¢‘é“é…ç½® | `archive/channels-deep-config.json` | æ‰‹åŠ¨é…ç½®å„å¹³å° |

## API å¯†é’¥è§£æž

å¯ç”¨ `--migrate-secrets` æ—¶ï¼ŒAPI å¯†é’¥æŒ‰ä»¥ä¸‹ä¼˜å…ˆçº§ä»Ž**å››ä¸ªæ¥æº**æ”¶é›†ï¼š

1. **é…ç½®å€¼** â€” `openclaw.json` ä¸­çš„ `models.providers.*.apiKey` åŠ TTS provider å¯†é’¥
2. **çŽ¯å¢ƒæ–‡ä»¶** â€” `~/.openclaw/.env`ï¼ˆå¦‚ `OPENROUTER_API_KEY`ã€`ANTHROPIC_API_KEY` ç­‰ï¼‰
3. **é…ç½® env å­å¯¹è±¡** â€” `openclaw.json` â†’ `"env"` æˆ– `"env"."vars"`ï¼ˆéƒ¨åˆ†é…ç½®å°†å¯†é’¥å­˜äºŽæ­¤å¤„è€Œéžå•ç‹¬çš„ `.env` æ–‡ä»¶ï¼‰
4. **è®¤è¯æ¡£æ¡ˆ** â€” `~/.openclaw/agents/main/agent/auth-profiles.json`ï¼ˆæ¯ä¸ª Agent çš„å‡­æ®ï¼‰

é…ç½®å€¼ä¼˜å…ˆçº§æœ€é«˜ï¼ŒåŽç»­æ¥æºä¾æ¬¡å¡«è¡¥å‰©ä½™ç©ºç¼ºã€‚

### æ”¯æŒçš„å¯†é’¥ç›®æ ‡

`OPENROUTER_API_KEY`ã€`OPENAI_API_KEY`ã€`ANTHROPIC_API_KEY`ã€`DEEPSEEK_API_KEY`ã€`GEMINI_API_KEY`ã€`ZAI_API_KEY`ã€`MINIMAX_API_KEY`ã€`ELEVENLABS_API_KEY`ã€`TELEGRAM_BOT_TOKEN`ã€`VOICE_TOOLS_OPENAI_KEY`

ä¸åœ¨æ­¤ç™½åå•ä¸­çš„å¯†é’¥ä¸€å¾‹ä¸ä¼šè¢«å¤åˆ¶ã€‚

## SecretRef å¤„ç†

OpenClaw é…ç½®ä¸­ token å’Œ API å¯†é’¥çš„å€¼æ”¯æŒä¸‰ç§æ ¼å¼ï¼š

```json
// çº¯å­—ç¬¦ä¸²
"channels": { "telegram": { "botToken": "123456:ABC-DEF..." } }

// çŽ¯å¢ƒå˜é‡æ¨¡æ¿
"channels": { "telegram": { "botToken": "${TELEGRAM_BOT_TOKEN}" } }

// SecretRef å¯¹è±¡
"channels": { "telegram": { "botToken": { "source": "env", "id": "TELEGRAM_BOT_TOKEN" } } }
```

è¿ç§»ä¼šè§£æžæ‰€æœ‰ä¸‰ç§æ ¼å¼ã€‚å¯¹äºŽçŽ¯å¢ƒå˜é‡æ¨¡æ¿å’Œ `source: "env"` çš„ SecretRef å¯¹è±¡ï¼Œä¼šä»Ž `~/.openclaw/.env` å’Œ `openclaw.json` çš„ env å­å¯¹è±¡ä¸­æŸ¥æ‰¾å€¼ã€‚`source: "file"` æˆ– `source: "exec"` çš„ SecretRef å¯¹è±¡æ— æ³•è‡ªåŠ¨è§£æžâ€”â€”è¿ç§»ä¼šå¯¹æ­¤å‘å‡ºè­¦å‘Šï¼Œç›¸å…³å€¼éœ€é€šè¿‡ `zed config set` æ‰‹åŠ¨æ·»åŠ è‡³ Zedã€‚

## è¿ç§»åŽ

1. **æ£€æŸ¥è¿ç§»æŠ¥å‘Š** â€” å®ŒæˆåŽæ‰“å°ï¼ŒåŒ…å«å·²è¿ç§»ã€å·²è·³è¿‡å’Œå†²çªé¡¹çš„è®¡æ•°ã€‚

2. **å®¡æŸ¥å½’æ¡£æ–‡ä»¶** â€” `~/.zed/migration/openclaw/<timestamp>/archive/` ä¸­çš„æ‰€æœ‰å†…å®¹éœ€è¦äººå·¥å¤„ç†ã€‚

3. **å¼€å¯æ–°ä¼šè¯** â€” å¯¼å…¥çš„ skills å’Œè®°å¿†æ¡ç›®åœ¨æ–°ä¼šè¯ä¸­ç”Ÿæ•ˆï¼Œå½“å‰ä¼šè¯ä¸å—å½±å“ã€‚

4. **éªŒè¯ API å¯†é’¥** â€” è¿è¡Œ `zed status` æ£€æŸ¥ provider è®¤è¯çŠ¶æ€ã€‚

5. **æµ‹è¯•æ¶ˆæ¯å¹³å°** â€” è‹¥è¿ç§»äº†å¹³å° tokenï¼Œé‡å¯ gatewayï¼š`systemctl --user restart zed-gateway`

6. **æ£€æŸ¥ä¼šè¯ç­–ç•¥** â€” éªŒè¯ `zed config get session_reset` æ˜¯å¦ç¬¦åˆé¢„æœŸã€‚

7. **é‡æ–°é…å¯¹ WhatsApp** â€” WhatsApp ä½¿ç”¨äºŒç»´ç é…å¯¹ï¼ˆBaileysï¼‰ï¼Œä¸æ”¯æŒ token è¿ç§»ã€‚è¿è¡Œ `zed whatsapp` è¿›è¡Œé…å¯¹ã€‚

8. **æ¸…ç†å½’æ¡£** â€” ç¡®è®¤ä¸€åˆ‡æ­£å¸¸åŽï¼Œè¿è¡Œ `zed claw cleanup` å°†æ®‹ç•™çš„ OpenClaw ç›®å½•é‡å‘½åä¸º `.pre-migration/`ï¼ˆé˜²æ­¢çŠ¶æ€æ··æ·†ï¼‰ã€‚

## æ•…éšœæŽ’æŸ¥

### "OpenClaw directory not found"

è¿ç§»ä¾æ¬¡æ£€æŸ¥ `~/.openclaw/`ã€`~/.clawdbot/`ã€`~/.moltbot/`ã€‚è‹¥ä½ çš„å®‰è£…è·¯å¾„ä¸åŒï¼Œè¯·ä½¿ç”¨ `--source /path/to/your/openclaw`ã€‚

### "No provider API keys found"

æ ¹æ® OpenClaw ç‰ˆæœ¬ä¸åŒï¼Œå¯†é’¥å¯èƒ½å­˜å‚¨åœ¨å¤šä¸ªä½ç½®ï¼š`openclaw.json` ä¸­ `models.providers.*.apiKey` å†…è”ã€`~/.openclaw/.env`ã€`openclaw.json` çš„ `"env"` å­å¯¹è±¡ï¼Œæˆ– `agents/main/agent/auth-profiles.json`ã€‚è¿ç§»ä¼šæ£€æŸ¥æ‰€æœ‰å››ä¸ªä½ç½®ã€‚è‹¥å¯†é’¥ä½¿ç”¨ `source: "file"` æˆ– `source: "exec"` çš„ SecretRefï¼Œåˆ™æ— æ³•è‡ªåŠ¨è§£æžâ€”â€”è¯·é€šè¿‡ `zed config set` æ‰‹åŠ¨æ·»åŠ ã€‚

### è¿ç§»åŽ skills æœªå‡ºçŽ°

å¯¼å…¥çš„ skills ä½äºŽ `~/.zed/skills/openclaw-imports/`ã€‚å¼€å¯æ–°ä¼šè¯åŽç”Ÿæ•ˆï¼Œæˆ–è¿è¡Œ `/skills` éªŒè¯æ˜¯å¦å·²åŠ è½½ã€‚

### TTS è¯­éŸ³æœªè¿ç§»

OpenClaw åœ¨ä¸¤å¤„å­˜å‚¨ TTS è®¾ç½®ï¼š`messages.tts.providers.*` å’Œé¡¶å±‚ `talk` é…ç½®ã€‚è¿ç§»ä¼šæ£€æŸ¥ä¸¤å¤„ã€‚è‹¥ä½ çš„ voice ID æ˜¯é€šè¿‡ OpenClaw UI è®¾ç½®çš„ï¼ˆå­˜å‚¨è·¯å¾„ä¸åŒï¼‰ï¼Œå¯èƒ½éœ€è¦æ‰‹åŠ¨è®¾ç½®ï¼š`zed config set tts.elevenlabs.voice_id YOUR_VOICE_ID`ã€‚