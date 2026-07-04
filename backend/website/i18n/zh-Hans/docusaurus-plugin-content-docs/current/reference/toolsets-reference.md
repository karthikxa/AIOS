---
sidebar_position: 4
title: "å·¥å…·é›†å‚è€ƒ"
description: "Zed æ ¸å¿ƒã€å¤åˆã€å¹³å°åŠåŠ¨æ€å·¥å…·é›†å‚è€ƒ"
---

# å·¥å…·é›†å‚è€ƒ

å·¥å…·é›†ï¼ˆToolsetï¼‰æ˜¯å·¥å…·çš„å‘½åé›†åˆï¼Œç”¨äºŽæŽ§åˆ¶ agent å¯ä»¥æ‰§è¡Œçš„æ“ä½œã€‚å®ƒæ˜¯æŒ‰å¹³å°ã€æŒ‰ä¼šè¯æˆ–æŒ‰ä»»åŠ¡é…ç½®å·¥å…·å¯ç”¨æ€§çš„ä¸»è¦æœºåˆ¶ã€‚

## å·¥å…·é›†çš„å·¥ä½œåŽŸç†

æ¯ä¸ªå·¥å…·æ°å¥½å±žäºŽä¸€ä¸ªå·¥å…·é›†ã€‚å¯ç”¨æŸä¸ªå·¥å…·é›†åŽï¼Œè¯¥é›†åˆä¸­çš„æ‰€æœ‰å·¥å…·éƒ½å°†å¯¹ agent å¯ç”¨ã€‚å·¥å…·é›†åˆ†ä¸ºä¸‰ç§ç±»åž‹ï¼š

- **æ ¸å¿ƒï¼ˆCoreï¼‰** â€” ä¸€ç»„ç›¸å…³å·¥å…·çš„é€»è¾‘åˆ†ç»„ï¼ˆä¾‹å¦‚ï¼Œ`file` åŒ…å« `read_file`ã€`write_file`ã€`patch`ã€`search_files`ï¼‰
- **å¤åˆï¼ˆCompositeï¼‰** â€” å°†å¤šä¸ªæ ¸å¿ƒå·¥å…·é›†ç»„åˆç”¨äºŽå¸¸è§åœºæ™¯ï¼ˆä¾‹å¦‚ï¼Œ`debugging` åŒ…å« fileã€terminal å’Œ web å·¥å…·ï¼‰
- **å¹³å°ï¼ˆPlatformï¼‰** â€” é’ˆå¯¹ç‰¹å®šéƒ¨ç½²çŽ¯å¢ƒçš„å®Œæ•´å·¥å…·é…ç½®ï¼ˆä¾‹å¦‚ï¼Œ`zed-cli` æ˜¯äº¤äº’å¼ CLI ä¼šè¯çš„é»˜è®¤é…ç½®ï¼‰

## é…ç½®å·¥å…·é›†

### æŒ‰ä¼šè¯ï¼ˆCLIï¼‰

```bash
zed chat --toolsets web,file,terminal
zed chat --toolsets debugging        # composite â€” expands to file + terminal + web
zed chat --toolsets all              # everything
```

### æŒ‰å¹³å°ï¼ˆconfig.yamlï¼‰

```yaml
toolsets:
  - zed-cli          # default for CLI
  # - zed-telegram   # override for Telegram gateway
```

### äº¤äº’å¼ç®¡ç†

```bash
zed tools                            # curses UI to enable/disable per platform
```

æˆ–åœ¨ä¼šè¯ä¸­ï¼š

```
/tools list
/tools disable browser
/tools enable homeassistant
```

## æ ¸å¿ƒå·¥å…·é›†

| å·¥å…·é›† | å·¥å…· | ç”¨é€” |
|--------|------|------|
| `browser` | `browser_back`, `browser_cdp`, `browser_click`, `browser_console`, `browser_dialog`, `browser_get_images`, `browser_navigate`, `browser_press`, `browser_scroll`, `browser_snapshot`, `browser_type`, `browser_vision`, `web_search` | æ ¸å¿ƒæµè§ˆå™¨è‡ªåŠ¨åŒ–ã€‚åŒ…å« `web_search` ä½œä¸ºå¿«é€ŸæŸ¥è¯¢çš„å¤‡ç”¨æ–¹æ¡ˆã€‚`browser_cdp` å’Œ `browser_dialog` åœ¨è¿è¡Œæ—¶å—é™â€”â€”ä»…åœ¨ä¼šè¯å¯åŠ¨æ—¶ CDP ç«¯ç‚¹å¯è¾¾ï¼ˆé€šè¿‡ `/browser connect`ã€`browser.cdp_url` é…ç½®ã€Browserbase æˆ– Camofoxï¼‰æ—¶æ‰æ³¨å†Œã€‚`browser_dialog` ä¸Ž `browser_snapshot` åœ¨é™„åŠ  CDP supervisor æ—¶æ·»åŠ çš„ `pending_dialogs` å’Œ `frame_tree` å­—æ®µé…åˆä½¿ç”¨ã€‚ |
| `clarify` | `clarify` | å½“ agent éœ€è¦æ¾„æ¸…æ—¶å‘ç”¨æˆ·æé—®ã€‚ |
| `code_execution` | `execute_code` | è¿è¡Œä»¥ç¼–ç¨‹æ–¹å¼è°ƒç”¨ Zed å·¥å…·çš„ Python è„šæœ¬ã€‚ |
| `cronjob` | `cronjob` | è°ƒåº¦å’Œç®¡ç†å‘¨æœŸæ€§ä»»åŠ¡ã€‚ |
| `debugging` | å¤åˆï¼ˆ`file` + `terminal` + `web`ï¼‰ | è°ƒè¯•å¥—ä»¶â€”â€”æ–‡ä»¶ã€è¿›ç¨‹/ç»ˆç«¯ã€ç½‘é¡µæå–/æœç´¢ã€‚ |
| `delegation` | `delegate_task` | ç”Ÿæˆéš”ç¦»çš„å­ agent å®žä¾‹ä»¥å¹¶è¡Œæ‰§è¡Œå·¥ä½œã€‚ |
| `discord` | `discord` | æ ¸å¿ƒ Discord æ–‡æœ¬/åµŒå…¥/ç§ä¿¡æ“ä½œï¼ˆä»…é™ gatewayï¼‰ã€‚åœ¨ `zed-discord` å·¥å…·é›†ä¸Šæ¿€æ´»ã€‚ |
| `discord_admin` | `discord_admin` | Discord ç®¡ç†æ“ä½œï¼ˆå°ç¦ã€è§’è‰²å˜æ›´ã€é¢‘é“ç®¡ç†ï¼‰ã€‚åœ¨ `zed-discord` å·¥å…·é›†ä¸Šæ¿€æ´»ï¼›éœ€è¦ bot æŒæœ‰ç›¸å…³ Discord æƒé™ã€‚ |
| `feishu_doc` | `feishu_doc_read` | è¯»å–é£žä¹¦/Lark æ–‡æ¡£å†…å®¹ã€‚ç”±é£žä¹¦æ–‡æ¡£è¯„è®ºæ™ºèƒ½å›žå¤å¤„ç†å™¨ä½¿ç”¨ã€‚ |
| `feishu_drive` | `feishu_drive_add_comment`, `feishu_drive_list_comments`, `feishu_drive_list_comment_replies`, `feishu_drive_reply_comment` | é£žä¹¦/Lark äº‘ç›˜è¯„è®ºæ“ä½œã€‚ä»…é™è¯„è®º agent ä½¿ç”¨ï¼›ä¸åœ¨ `zed-cli` æˆ–å…¶ä»–æ¶ˆæ¯å·¥å…·é›†ä¸Šæš´éœ²ã€‚ |
| `file` | `patch`, `read_file`, `search_files`, `write_file` | æ–‡ä»¶è¯»å–ã€å†™å…¥ã€æœç´¢å’Œç¼–è¾‘ã€‚ |
| `homeassistant` | `ha_call_service`, `ha_get_state`, `ha_list_entities`, `ha_list_services` | é€šè¿‡ Home Assistant è¿›è¡Œæ™ºèƒ½å®¶å±…æŽ§åˆ¶ã€‚ä»…åœ¨è®¾ç½® `HASS_TOKEN` æ—¶å¯ç”¨ã€‚ |
| `computer_use` | `computer_use` | é€šè¿‡ cua-driver è¿›è¡ŒåŽå° macOS æ¡Œé¢æŽ§åˆ¶â€”â€”ä¸æŠ¢å å…‰æ ‡/ç„¦ç‚¹ã€‚é€‚ç”¨äºŽä»»ä½•æ”¯æŒå·¥å…·è°ƒç”¨çš„æ¨¡åž‹ã€‚ä»…é™ macOSï¼›éœ€è¦ `cua-driver` åœ¨ `$PATH` ä¸­ã€‚ |
| `image_gen` | `image_generate` | é€šè¿‡ FAL.ai è¿›è¡Œæ–‡æœ¬ç”Ÿæˆå›¾åƒï¼ˆæ”¯æŒå¯é€‰çš„ OpenAI / xAI åŽç«¯ï¼‰ã€‚ |
| `video_gen` | `video_generate` | é€šè¿‡æ’ä»¶æ³¨å†Œçš„åŽç«¯ï¼ˆxAI Grok-Imagineã€FAL.ai Veo 3.1 / Pixverse v6 / Kling O3ï¼‰è¿›è¡Œæ–‡æœ¬ç”Ÿæˆè§†é¢‘å’Œå›¾åƒç”Ÿæˆè§†é¢‘ã€‚ä¼ å…¥ `image_url` å¯å¯¹å›¾åƒè¿›è¡ŒåŠ¨ç”»åŒ–ï¼›çœç•¥åˆ™ä¸ºæ–‡æœ¬ç”Ÿæˆè§†é¢‘ã€‚ |
| `kanban` | `kanban_block`, `kanban_comment`, `kanban_complete`, `kanban_create`, `kanban_heartbeat`, `kanban_link`, `kanban_list`, `kanban_show`, `kanban_unblock` | å¤š agent åè°ƒå·¥å…·ã€‚ä¸ºè°ƒåº¦å™¨ç”Ÿæˆçš„ä»»åŠ¡å·¥ä½œè€…ï¼ˆ`ZED_KANBAN_TASK`ï¼‰ä»¥åŠæ˜¾å¼å¯ç”¨ `kanban` å·¥å…·é›†çš„ profile æ³¨å†Œã€‚å·¥ä½œè€…å¯æ ‡è®°ä»»åŠ¡å®Œæˆã€é˜»å¡žã€å¿ƒè·³ã€è¯„è®ºä»¥åŠåˆ›å»º/å…³è”åŽç»­ä»»åŠ¡ï¼›ç¼–æŽ’å™¨ profile è¿˜é¢å¤–èŽ·å¾—çœ‹æ¿è·¯ç”±å·¥å…·ï¼Œå¦‚ list/unblockã€‚ |
| `memory` | `memory` | æŒä¹…åŒ–è·¨ä¼šè¯è®°å¿†ç®¡ç†ã€‚ |
| `messaging` | `send_message` | åœ¨ä¼šè¯ä¸­å‘å…¶ä»–å¹³å°ï¼ˆTelegramã€Discord ç­‰ï¼‰å‘é€æ¶ˆæ¯ã€‚ |
| `moa` | `mixture_of_agents` | é€šè¿‡ Mixture of Agents å®žçŽ°å¤šæ¨¡åž‹å…±è¯†ã€‚ |
| `safe` | `image_generate`, `vision_analyze`, `web_extract`, `web_search`ï¼ˆé€šè¿‡ `includes`ï¼‰ | åªè¯»ç ”ç©¶ + åª’ä½“ç”Ÿæˆã€‚æ— æ–‡ä»¶å†™å…¥ã€æ— ç»ˆç«¯ã€æ— ä»£ç æ‰§è¡Œã€‚ |
| `search` | `web_search` | ä»…ç½‘é¡µæœç´¢ï¼ˆä¸å«æå–ï¼‰ã€‚ |
| `session_search` | `session_search` | æœç´¢åŽ†å²ä¼šè¯è®°å½•ã€‚ |
| `skills` | `skill_manage`, `skill_view`, `skills_list` | æŠ€èƒ½çš„å¢žåˆ æ”¹æŸ¥ä¸Žæµè§ˆã€‚ |
| `spotify` | `spotify_albums`, `spotify_devices`, `spotify_library`, `spotify_playback`, `spotify_playlists`, `spotify_queue`, `spotify_search` | åŽŸç”Ÿ Spotify æŽ§åˆ¶ï¼ˆæ’­æ”¾ã€é˜Ÿåˆ—ã€æœç´¢ã€æ’­æ”¾åˆ—è¡¨ã€ä¸“è¾‘ã€éŸ³ä¹åº“ï¼‰ã€‚ç”±å†…ç½® `spotify` æ’ä»¶æ³¨å†Œã€‚ |
| `terminal` | `process`, `terminal` | Shell å‘½ä»¤æ‰§è¡Œå’ŒåŽå°è¿›ç¨‹ç®¡ç†ã€‚ |
| `todo` | `todo` | ä¼šè¯å†…ä»»åŠ¡åˆ—è¡¨ç®¡ç†ã€‚ |
| `tts` | `text_to_speech` | æ–‡æœ¬è½¬è¯­éŸ³éŸ³é¢‘ç”Ÿæˆã€‚ |
| `vision` | `vision_analyze` | é€šè¿‡è§†è§‰èƒ½åŠ›æ¨¡åž‹è¿›è¡Œå›¾åƒåˆ†æžã€‚ |
| `video` | `video_analyze` | è§†é¢‘åˆ†æžä¸Žç†è§£å·¥å…·ï¼ˆéœ€æ‰‹åŠ¨å¯ç”¨ï¼Œä¸åœ¨é»˜è®¤å·¥å…·é›†ä¸­â€”â€”é€šè¿‡ `--toolsets` æ˜¾å¼æ·»åŠ ï¼‰ã€‚ |
| `web` | `web_extract`, `web_search` | ç½‘é¡µæœç´¢å’Œé¡µé¢å†…å®¹æå–ã€‚ |
| `x_search` | `x_search` | é€šè¿‡ xAI å†…ç½®çš„ `x_search` Responses å·¥å…·æœç´¢ Xï¼ˆTwitterï¼‰å¸–å­å’Œè¯é¢˜ã€‚é»˜è®¤å…³é—­ï¼›é€šè¿‡ `zed tools` å¯ç”¨ã€‚ä»…åœ¨é…ç½®äº† xAI å‡­æ®ï¼ˆSuperGrok OAuth æˆ– `XAI_API_KEY`ï¼‰æ—¶æ³¨å†Œ schemaã€‚ |
| `yuanbao` | `yb_query_group_info`, `yb_query_group_members`, `yb_search_sticker`, `yb_send_dm`, `yb_send_sticker` | å…ƒå®ç§ä¿¡/ç¾¤ç»„æ“ä½œå’Œè¡¨æƒ…åŒ…æœç´¢ã€‚ä»…åœ¨ `zed-yuanbao` ä¸Šæ³¨å†Œã€‚ |

## å¹³å°å·¥å…·é›†

å¹³å°å·¥å…·é›†å®šä¹‰äº†éƒ¨ç½²ç›®æ ‡çš„å®Œæ•´å·¥å…·é…ç½®ã€‚å¤§å¤šæ•°æ¶ˆæ¯å¹³å°ä½¿ç”¨ä¸Ž `zed-cli` ç›¸åŒçš„é…ç½®ï¼š

| å·¥å…·é›† | ä¸Ž `zed-cli` çš„å·®å¼‚ |
|--------|------------------------|
| `zed-cli` | å®Œæ•´å·¥å…·é›†â€”â€”äº¤äº’å¼ CLI ä¼šè¯çš„é»˜è®¤é…ç½®ã€‚åŒ…å« fileã€terminalã€webã€browserã€memoryã€skillsã€visionã€image_genã€todoã€ttsã€delegationã€code_executionã€cronjobã€session_searchã€clarify å’Œ `safe`ï¼ˆåªè¯»ï¼‰å¥—ä»¶ï¼Œä»¥åŠæ ‡å‡†æ¶ˆæ¯å·¥å…·ã€‚ |
| `zed-acp` | ç§»é™¤äº† `clarify`ã€`cronjob`ã€`image_generate`ã€`send_message`ã€`text_to_speech` ä»¥åŠå…¨éƒ¨å››ä¸ª Home Assistant å·¥å…·ã€‚ä¸“æ³¨äºŽ IDE çŽ¯å¢ƒä¸­çš„ç¼–ç ä»»åŠ¡ã€‚ |
| `zed-api-server` | ç§»é™¤äº† `clarify`ã€`send_message` å’Œ `text_to_speech`ã€‚ä¿ç•™å…¶ä»–æ‰€æœ‰å·¥å…·â€”â€”é€‚ç”¨äºŽæ— æ³•è¿›è¡Œç”¨æˆ·äº¤äº’çš„ç¨‹åºåŒ–è®¿é—®åœºæ™¯ã€‚ |
| `zed-cron` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-telegram` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-discord` | åœ¨ `zed-cli` åŸºç¡€ä¸Šæ·»åŠ äº† `discord` å’Œ `discord_admin`ã€‚ |
| `zed-slack` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-whatsapp` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-signal` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-matrix` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-mattermost` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-email` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-sms` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-bluebubbles` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-dingtalk` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-feishu` | æ·»åŠ äº†äº”ä¸ª `feishu_doc_*` / `feishu_drive_*` å·¥å…·ï¼ˆä»…ç”±æ–‡æ¡£è¯„è®ºå¤„ç†å™¨ä½¿ç”¨ï¼Œä¸ç”¨äºŽå¸¸è§„èŠå¤©é€‚é…å™¨ï¼‰ã€‚ |
| `zed-qqbot` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-wecom` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-wecom-callback` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-weixin` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-yuanbao` | åœ¨ `zed-cli` åŸºç¡€ä¸Šæ·»åŠ äº†äº”ä¸ª `yb_*` å·¥å…·ï¼ˆç§ä¿¡/ç¾¤ç»„/è¡¨æƒ…åŒ…ï¼‰ã€‚ |
| `zed-homeassistant` | ä¸Ž `zed-cli` ç›¸åŒï¼ˆHome Assistant å·¥å…·é»˜è®¤å·²å­˜åœ¨ï¼Œåœ¨è®¾ç½® `HASS_TOKEN` æ—¶æ¿€æ´»ï¼‰ã€‚ |
| `zed-webhook` | ä¸Ž `zed-cli` ç›¸åŒã€‚ |
| `zed-gateway` | å†…éƒ¨ gateway ç¼–æŽ’å™¨å·¥å…·é›†â€”â€”æ‰€æœ‰ `zed-<platform>` å·¥å…·é›†çš„å¹¶é›†ï¼›å½“ gateway éœ€è¦æŽ¥å—ä»»æ„æ¶ˆæ¯æ¥æºæ—¶ä½¿ç”¨ã€‚ |

## åŠ¨æ€å·¥å…·é›†

### MCP server å·¥å…·é›†

æ¯ä¸ªå·²é…ç½®çš„ MCP server åœ¨è¿è¡Œæ—¶ä¼šç”Ÿæˆä¸€ä¸ª `mcp-<server>` å·¥å…·é›†ã€‚ä¾‹å¦‚ï¼Œè‹¥é…ç½®äº† `github` MCP serverï¼Œåˆ™ä¼šåˆ›å»ºåŒ…å«è¯¥ server æ‰€æœ‰æš´éœ²å·¥å…·çš„ `mcp-github` å·¥å…·é›†ã€‚

```yaml
# config.yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
```

è¿™å°†åˆ›å»ºä¸€ä¸ª `mcp-github` å·¥å…·é›†ï¼Œå¯åœ¨ `--toolsets` æˆ–å¹³å°é…ç½®ä¸­å¼•ç”¨ã€‚

### æ’ä»¶å·¥å…·é›†

æ’ä»¶å¯åœ¨åˆå§‹åŒ–æœŸé—´é€šè¿‡ `ctx.register_tool()` æ³¨å†Œè‡ªå·±çš„å·¥å…·é›†ã€‚è¿™äº›å·¥å…·é›†ä¸Žå†…ç½®å·¥å…·é›†å¹¶åˆ—æ˜¾ç¤ºï¼Œå¯ä»¥ç”¨ç›¸åŒæ–¹å¼å¯ç”¨/ç¦ç”¨ã€‚

### è‡ªå®šä¹‰å·¥å…·é›†

åœ¨ `config.yaml` ä¸­å®šä¹‰è‡ªå®šä¹‰å·¥å…·é›†ï¼Œä»¥åˆ›å»ºé¡¹ç›®ä¸“å±žçš„å·¥å…·é›†åˆï¼š

```yaml
toolsets:
  - zed-cli
custom_toolsets:
  data-science:
    - file
    - terminal
    - code_execution
    - web
    - vision
```

### é€šé…ç¬¦

- `all` æˆ– `*` â€” å±•å¼€ä¸ºæ‰€æœ‰å·²æ³¨å†Œçš„å·¥å…·é›†ï¼ˆå†…ç½® + åŠ¨æ€ + æ’ä»¶ï¼‰

## ä¸Ž `zed tools` çš„å…³ç³»

`zed tools` å‘½ä»¤æä¾›åŸºäºŽ curses çš„ UIï¼Œç”¨äºŽæŒ‰å¹³å°åˆ‡æ¢å•ä¸ªå·¥å…·çš„å¯ç”¨/ç¦ç”¨çŠ¶æ€ã€‚è¯¥æ“ä½œåœ¨å·¥å…·çº§åˆ«è¿›è¡Œï¼ˆæ¯”å·¥å…·é›†æ›´ç»†ç²’åº¦ï¼‰ï¼Œå¹¶æŒä¹…åŒ–åˆ° `config.yaml`ã€‚å³ä½¿å·¥å…·é›†å·²å¯ç”¨ï¼Œè¢«ç¦ç”¨çš„å·¥å…·ä¹Ÿä¼šè¢«è¿‡æ»¤æŽ‰ã€‚

å¦è¯·å‚é˜…ï¼š[å·¥å…·å‚è€ƒ](./tools-reference.md)ï¼ŒèŽ·å–æ‰€æœ‰å•ä¸ªå·¥å…·åŠå…¶å‚æ•°çš„å®Œæ•´åˆ—è¡¨ã€‚