---
title: "Zed Agent â€” é…ç½®ã€æ‰©å±•æˆ–è´¡çŒ® Zed Agent"
sidebar_label: "Zed Agent"
description: "é…ç½®ã€æ‰©å±•æˆ–è´¡çŒ® Zed Agent"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Zed Agent

é…ç½®ã€æ‰©å±•æˆ–è´¡çŒ® Zed Agentã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/autonomous-ai-agents/zed-agent` |
| ç‰ˆæœ¬ | `2.1.0` |
| ä½œè€… | Zed Agent + Teknium |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `zed`, `setup`, `configuration`, `multi-agent`, `spawning`, `cli`, `gateway`, `development` |
| ç›¸å…³ skill | [`claude-code`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-claude-code), [`codex`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-codex), [`opencode`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-opencode) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Zed Agent

Zed Agent æ˜¯ Zed Team å¼€å‘çš„å¼€æº AI agent æ¡†æž¶ï¼Œå¯åœ¨ç»ˆç«¯ã€æ¶ˆæ¯å¹³å°å’Œ IDE ä¸­è¿è¡Œã€‚å®ƒä¸Ž Claude Codeï¼ˆAnthropicï¼‰ã€Codexï¼ˆOpenAIï¼‰å’Œ OpenClaw åŒå±žä¸€ç±»â€”â€”ä½¿ç”¨å·¥å…·è°ƒç”¨ï¼ˆtool callingï¼‰ä¸Žç³»ç»Ÿäº¤äº’çš„è‡ªä¸»ç¼–ç å’Œä»»åŠ¡æ‰§è¡Œ agentã€‚Zed æ”¯æŒä»»æ„ LLM æä¾›å•†ï¼ˆOpenRouterã€Anthropicã€OpenAIã€DeepSeekã€æœ¬åœ°æ¨¡åž‹åŠ 15+ å…¶ä»–æä¾›å•†ï¼‰ï¼Œå¯åœ¨ Linuxã€macOS å’Œ WSL ä¸Šè¿è¡Œã€‚

Zed çš„å·®å¼‚åŒ–ç‰¹æ€§ï¼š

- **é€šè¿‡ skill è‡ªæˆ‘æå‡** â€” Zed é€šè¿‡å°†å¯å¤ç”¨æµç¨‹ä¿å­˜ä¸º skill æ¥ä»Žç»éªŒä¸­å­¦ä¹ ã€‚å½“å®ƒè§£å†³å¤æ‚é—®é¢˜ã€å‘çŽ°å·¥ä½œæµæˆ–è¢«çº æ­£æ—¶ï¼Œå¯ä»¥å°†è¯¥çŸ¥è¯†æŒä¹…åŒ–ä¸º skill æ–‡æ¡£ï¼ŒåŠ è½½åˆ°æœªæ¥çš„ä¼šè¯ä¸­ã€‚skill éšæ—¶é—´ç§¯ç´¯ï¼Œä½¿ agent åœ¨ä½ çš„ç‰¹å®šä»»åŠ¡å’ŒçŽ¯å¢ƒä¸­è¡¨çŽ°è¶Šæ¥è¶Šå¥½ã€‚
- **è·¨ä¼šè¯æŒä¹…è®°å¿†** â€” è®°ä½ä½ æ˜¯è°ã€ä½ çš„åå¥½ã€çŽ¯å¢ƒç»†èŠ‚å’Œç»éªŒæ•™è®­ã€‚å¯æ’æ‹”çš„è®°å¿†åŽç«¯ï¼ˆå†…ç½®ã€Honchoã€Mem0 ç­‰ï¼‰è®©ä½ é€‰æ‹©è®°å¿†çš„å·¥ä½œæ–¹å¼ã€‚
- **å¤šå¹³å° gateway** â€” åŒä¸€ä¸ª agent åœ¨ Telegramã€Discordã€Slackã€WhatsAppã€Signalã€Matrixã€Email åŠ 10+ å…¶ä»–å¹³å°ä¸Šè¿è¡Œï¼Œå…·å¤‡å®Œæ•´å·¥å…·è®¿é—®æƒé™ï¼Œè€Œä¸ä»…ä»…æ˜¯èŠå¤©ã€‚
- **æä¾›å•†æ— å…³** â€” åœ¨å·¥ä½œæµä¸­é€”åˆ‡æ¢æ¨¡åž‹å’Œæä¾›å•†ï¼Œæ— éœ€æ›´æ”¹å…¶ä»–ä»»ä½•å†…å®¹ã€‚å‡­è¯æ± è‡ªåŠ¨è½®æ¢å¤šä¸ª API keyã€‚
- **Profilesï¼ˆé…ç½®æ–‡ä»¶ï¼‰** â€” è¿è¡Œå¤šä¸ªç‹¬ç«‹çš„ Zed å®žä¾‹ï¼Œå„è‡ªæ‹¥æœ‰éš”ç¦»çš„é…ç½®ã€ä¼šè¯ã€skill å’Œè®°å¿†ã€‚
- **å¯æ‰©å±•** â€” æ’ä»¶ã€MCP æœåŠ¡å™¨ã€è‡ªå®šä¹‰å·¥å…·ã€webhook è§¦å‘å™¨ã€cron è°ƒåº¦ä»¥åŠå®Œæ•´çš„ Python ç”Ÿæ€ç³»ç»Ÿã€‚

äººä»¬å°† Zed ç”¨äºŽè½¯ä»¶å¼€å‘ã€ç ”ç©¶ã€ç³»ç»Ÿç®¡ç†ã€æ•°æ®åˆ†æžã€å†…å®¹åˆ›ä½œã€å®¶åº­è‡ªåŠ¨åŒ–ï¼Œä»¥åŠä»»ä½•å—ç›ŠäºŽå…·æœ‰æŒä¹…ä¸Šä¸‹æ–‡å’Œå®Œæ•´ç³»ç»Ÿè®¿é—®æƒé™çš„ AI agent çš„åœºæ™¯ã€‚

**æ­¤ skill å¸®åŠ©ä½ é«˜æ•ˆä½¿ç”¨ Zed Agent** â€” åŒ…æ‹¬è®¾ç½®ã€é…ç½®åŠŸèƒ½ã€ç”Ÿæˆé¢å¤–çš„ agent å®žä¾‹ã€æŽ’æŸ¥é—®é¢˜ã€æ‰¾åˆ°æ­£ç¡®çš„å‘½ä»¤å’Œè®¾ç½®ï¼Œä»¥åŠåœ¨éœ€è¦æ‰©å±•æˆ–è´¡çŒ®æ—¶ç†è§£ç³»ç»Ÿçš„å·¥ä½œåŽŸç†ã€‚

**æ–‡æ¡£ï¼š** https://zed-agent.zedteam.com/docs/

## å¿«é€Ÿå¼€å§‹

```bash
# å®‰è£…
curl -fsSL https://zed-agent.zedteam.com/install.sh | bash

# äº¤äº’å¼èŠå¤©ï¼ˆé»˜è®¤ï¼‰
zed

# å•æ¬¡æŸ¥è¯¢
zed chat -q "What is the capital of France?"

# è®¾ç½®å‘å¯¼
zed setup

# æ›´æ”¹æ¨¡åž‹/æä¾›å•†
zed model

# å¥åº·æ£€æŸ¥
zed doctor
```

---

## CLI å‚è€ƒ

### å…¨å±€æ ‡å¿—

```
zed [flags] [command]

  --version, -V             Show version
  --resume, -r SESSION      Resume session by ID or title
  --continue, -c [NAME]     Resume by name, or most recent session
  --worktree, -w            Isolated git worktree mode (parallel agents)
  --skills, -s SKILL        Preload skills (comma-separate or repeat)
  --profile, -p NAME        Use a named profile
  --yolo                    Skip dangerous command approval
  --pass-session-id         Include session ID in system prompt
```

æ— å­å‘½ä»¤æ—¶é»˜è®¤ä¸º `chat`ã€‚

### Chat

```
zed chat [flags]
  -q, --query TEXT          Single query, non-interactive
  -m, --model MODEL         Model (e.g. anthropic/claude-sonnet-4)
  -t, --toolsets LIST       Comma-separated toolsets
  --provider PROVIDER       Force provider (openrouter, anthropic, nous, etc.)
  -v, --verbose             Verbose output
  -Q, --quiet               Suppress banner, spinner, tool previews
  --checkpoints             Enable filesystem checkpoints (/rollback)
  --source TAG              Session source tag (default: cli)
```

### é…ç½®

```
zed setup [section]      Interactive wizard (model|terminal|gateway|tools|agent)
zed model                Interactive model/provider picker
zed config               View current config
zed config edit          Open config.yaml in $EDITOR
zed config set KEY VAL   Set a config value
zed config path          Print config.yaml path
zed config env-path      Print .env path
zed config check         Check for missing/outdated config
zed config migrate       Update config with new options
zed auth                 äº¤äº’å¼å‡­æ®ç®¡ç†å™¨
zed auth add PROVIDER    æ·»åŠ  OAuth æˆ– API key å‡­æ®ï¼ˆä¾‹å¦‚ nousã€openai-codexã€qwen-oauthï¼‰
zed auth list            åˆ—å‡ºå·²å­˜å‚¨çš„å‡­æ®
zed auth remove PROVIDER ç§»é™¤å·²å­˜å‚¨çš„å‡­æ®
zed doctor [--fix]       Check dependencies and config
zed status [--all]       Show component status
```

### å·¥å…·ä¸Ž Skill

```
zed tools                Interactive tool enable/disable (curses UI)
zed tools list           Show all tools and status
zed tools enable NAME    Enable a toolset
zed tools disable NAME   Disable a toolset

zed skills list          List installed skills
zed skills search QUERY  Search the skills hub
zed skills install ID    Install a skill (ID can be a hub identifier OR a direct https://â€¦/SKILL.md URL; pass --name to override when frontmatter has no name)
zed skills inspect ID    Preview without installing
zed skills config        Enable/disable skills per platform
zed skills check         Check for updates
zed skills update        Update outdated skills
zed skills uninstall N   Remove a hub skill
zed skills publish PATH  Publish to registry
zed skills browse        Browse all available skills
zed skills tap add REPO  Add a GitHub repo as skill source
```

### MCP æœåŠ¡å™¨

```
zed mcp serve            Run Zed as an MCP server
zed mcp add NAME         Add an MCP server (--url or --command)
zed mcp remove NAME      Remove an MCP server
zed mcp list             List configured servers
zed mcp test NAME        Test connection
zed mcp configure NAME   Toggle tool selection
```

### Gatewayï¼ˆæ¶ˆæ¯å¹³å°ï¼‰

```
zed gateway run          Start gateway foreground
zed gateway install      Install as background service
zed gateway start/stop   Control the service
zed gateway restart      Restart the service
zed gateway status       Check status
zed gateway setup        Configure platforms
```

æ”¯æŒçš„å¹³å°ï¼šTelegramã€Discordã€Slackã€WhatsAppã€Signalã€Emailã€SMSã€Matrixã€Mattermostã€Home Assistantã€DingTalkã€Feishuã€WeComã€BlueBubblesï¼ˆiMessageï¼‰ã€Weixinï¼ˆWeChatï¼‰ã€API Serverã€Webhooksã€‚Open WebUI é€šè¿‡ API Server é€‚é…å™¨è¿žæŽ¥ã€‚

å¹³å°æ–‡æ¡£ï¼šhttps://zed-agent.zedteam.com/docs/user-guide/messaging/

### ä¼šè¯

```
zed sessions list        List recent sessions
zed sessions browse      Interactive picker
zed sessions export OUT  Export to JSONL
zed sessions rename ID T Rename a session
zed sessions delete ID   Delete a session
zed sessions prune       Clean up old sessions (--older-than N days)
zed sessions stats       Session store statistics
```

### Cron ä»»åŠ¡

```
zed cron list            List jobs (--all for disabled)
zed cron create SCHED    Create: '30m', 'every 2h', '0 9 * * *'
zed cron edit ID         Edit schedule, prompt, delivery
zed cron pause/resume ID Control job state
zed cron run ID          Trigger on next tick
zed cron remove ID       Delete a job
zed cron status          Scheduler status
```

### Webhook

```
zed webhook subscribe N  Create route at /webhooks/<name>
zed webhook list         List subscriptions
zed webhook remove NAME  Remove a subscription
zed webhook test NAME    Send a test POST
```

### Profiles

```
zed profile list         List all profiles
zed profile create NAME  Create (--clone, --clone-all, --clone-from)
zed profile use NAME     Set sticky default
zed profile delete NAME  Delete a profile
zed profile show NAME    Show details
zed profile alias NAME   Manage wrapper scripts
zed profile rename A B   Rename a profile
zed profile export NAME  Export to tar.gz
zed profile import FILE  Import from archive
```

### å‡­è¯æ± 

```
zed auth add             Interactive credential wizard
zed auth list [PROVIDER] List pooled credentials
zed auth remove P INDEX  Remove by provider + index
zed auth reset PROVIDER  Clear exhaustion status
```

### å…¶ä»–

```
zed insights [--days N]  Usage analytics
zed update               Update to latest version
zed pairing list/approve/revoke  DM authorization
zed plugins list/install/remove  Plugin management
zed honcho setup/status  Honcho memory integration (requires honcho plugin)
zed memory setup/status/off  Memory provider config
zed completion bash|zsh  Shell completions
zed acp                  ACP server (IDE integration)
zed claw migrate         Migrate from OpenClaw
zed uninstall            Uninstall Zed
```

---

## æ–œæ å‘½ä»¤ï¼ˆä¼šè¯å†…ï¼‰

åœ¨äº¤äº’å¼èŠå¤©ä¼šè¯ä¸­è¾“å…¥è¿™äº›å‘½ä»¤ã€‚æ–°å‘½ä»¤ä¼šä¸å®šæœŸä¸Šçº¿ï¼›å¦‚æžœä»¥ä¸‹å†…å®¹çœ‹èµ·æ¥è¿‡æ—¶ï¼Œè¯·åœ¨ä¼šè¯å†…è¿è¡Œ `/help` èŽ·å–æƒå¨åˆ—è¡¨ï¼Œæˆ–æŸ¥çœ‹[å®žæ—¶æ–œæ å‘½ä»¤å‚è€ƒ](https://zed-agent.zedteam.com/docs/reference/slash-commands)ã€‚å‘½ä»¤æ³¨å†Œè¡¨çš„æƒå¨æ¥æºæ˜¯ `zed_cli/commands.py` â€” æ¯ä¸ªæ¶ˆè´¹æ–¹ï¼ˆè‡ªåŠ¨è¡¥å…¨ã€Telegram èœå•ã€Slack æ˜ å°„ã€`/help`ï¼‰å‡ä»Žä¸­æ´¾ç”Ÿã€‚

### ä¼šè¯æŽ§åˆ¶
```
/new (/reset)        Fresh session
/clear               Clear screen + new session (CLI)
/retry               Resend last message
/undo                Remove last exchange
/title [name]        Name the session
/compress            Manually compress context
/stop                Kill background processes
/rollback [N]        Restore filesystem checkpoint
/snapshot [sub]      Create or restore state snapshots of Zed config/state (CLI)
/background <prompt> Run prompt in background
/queue <prompt>      Queue for next turn
/steer <prompt>      Inject a message after the next tool call without interrupting
/agents (/tasks)     Show active agents and running tasks
/resume [name]       Resume a named session
/goal [text|sub]     Set a standing goal Zed works on across turns until achieved
                     (subcommands: status, pause, resume, clear)
/redraw              Force a full UI repaint (CLI)
```

### é…ç½®
```
/config              Show config (CLI)
/model [name]        Show or change model
/personality [name]  Set personality
/reasoning [level]   Set reasoning (none|minimal|low|medium|high|xhigh|show|hide)
/verbose             Cycle: off â†’ new â†’ all â†’ verbose
/voice [on|off|tts]  Voice mode
/yolo                Toggle approval bypass
/busy [sub]          Control what Enter does while Zed is working (CLI)
                     (subcommands: queue, steer, interrupt, status)
/indicator [style]   Pick the TUI busy-indicator style (CLI)
                     (styles: kaomoji, emoji, unicode, ascii)
/footer [on|off]     Toggle gateway runtime-metadata footer on final replies
/skin [name]         Change theme (CLI)
/statusbar           Toggle status bar (CLI)
```

### å·¥å…·ä¸Ž Skill
```
/tools               Manage tools (CLI)
/toolsets            List toolsets (CLI)
/skills              Search/install skills (CLI)
/skill <name>        Load a skill into session
/reload-skills       Re-scan ~/.zed/skills/ for added/removed skills
/reload              Reload .env variables into the running session (CLI)
/reload-mcp          Reload MCP servers
/cron                Manage cron jobs (CLI)
/curator [sub]       Background skill maintenance (status, run, pin, archive, â€¦)
/kanban [sub]        Multi-profile collaboration board (tasks, links, comments)
/plugins             List plugins (CLI)
```

### Gateway
```
/approve             Approve a pending command (gateway)
/deny                Deny a pending command (gateway)
/restart             Restart gateway (gateway)
/sethome             Set current chat as home channel (gateway)
/update              Update Zed to latest (gateway)
/topic [sub]         Enable or inspect Telegram DM topic sessions (gateway)
/platforms (/gateway) Show platform connection status (gateway)
```

### å®žç”¨å·¥å…·
```
/branch (/fork)      Branch the current session
/fast                Toggle priority/fast processing
/browser             Open CDP browser connection
/history             Show conversation history (CLI)
/save                Save conversation to file (CLI)
/copy [N]            Copy the last assistant response to clipboard (CLI)
/paste               Attach clipboard image (CLI)
/image               Attach local image file (CLI)
```

### ä¿¡æ¯
```
/help                Show commands
/commands [page]     Browse all commands (gateway)
/usage               Token usage
/insights [days]     Usage analytics
/gquota              Show Google Gemini Code Assist quota usage (CLI)
/status              Session info (gateway)
/profile             Active profile info
/debug               Upload debug report (system info + logs) and get shareable links
```

### é€€å‡º
```
/quit (/exit, /q)    Exit CLI
```

---

## å…³é”®è·¯å¾„ä¸Žé…ç½®

```
~/.zed/config.yaml       Main configuration
~/.zed/.env              API keys and secrets
$ZED_HOME/skills/        Installed skills
~/.zed/sessions/         Session transcripts
~/.zed/logs/             Gateway and error logs
~/.zed/auth.json         OAuth tokens and credential pools
~/.zed/zed-agent/     Source code (if git-installed)
```

Profiles ä½¿ç”¨ `~/.zed/profiles/<name>/`ï¼Œå¸ƒå±€ç›¸åŒã€‚

### é…ç½®èŠ‚

ä½¿ç”¨ `zed config edit` æˆ– `zed config set section.key value` ç¼–è¾‘ã€‚

| èŠ‚ | é”®é€‰é¡¹ |
|---------|-------------|
| `model` | `default`, `provider`, `base_url`, `api_key`, `context_length` |
| `agent` | `max_turns` (90), `tool_use_enforcement` |
| `terminal` | `backend` (local/docker/ssh/modal), `cwd`, `timeout` (180) |
| `compression` | `enabled`, `threshold` (0.50), `target_ratio` (0.20) |
| `display` | `skin`, `tool_progress`, `show_reasoning`, `show_cost` |
| `stt` | `enabled`, `provider` (local/groq/openai/mistral) |
| `tts` | `provider` (edge/elevenlabs/openai/minimax/mistral/neutts) |
| `memory` | `memory_enabled`, `user_profile_enabled`, `provider` |
| `security` | `tirith_enabled`, `website_blocklist` |
| `delegation` | `model`, `provider`, `base_url`, `api_key`, `max_iterations` (50), `reasoning_effort` |
| `checkpoints` | `enabled`, `max_snapshots` (50) |

å®Œæ•´é…ç½®å‚è€ƒï¼šhttps://zed-agent.zedteam.com/docs/user-guide/configuration

### æä¾›å•†

æ”¯æŒ 20+ ä¸ªæä¾›å•†ã€‚é€šè¿‡ `zed model` æˆ– `zed setup` è®¾ç½®ã€‚

| æä¾›å•† | è®¤è¯æ–¹å¼ | Key çŽ¯å¢ƒå˜é‡ |
|----------|------|-------------|
| OpenRouter | API key | `OPENROUTER_API_KEY` |
| Anthropic | API key | `ANTHROPIC_API_KEY` |
| Zed Portal | OAuth | `zed auth` |
| OpenAI Codex | OAuth | `zed auth` |
| GitHub Copilot | Token | `COPILOT_GITHUB_TOKEN` |
| Google Gemini | API key | `GOOGLE_API_KEY` æˆ– `GEMINI_API_KEY` |
| DeepSeek | API key | `DEEPSEEK_API_KEY` |
| xAI / Grok | API key | `XAI_API_KEY` |
| Hugging Face | Token | `HF_TOKEN` |
| Z.AI / GLM | API key | `GLM_API_KEY` |
| MiniMax | API key | `MINIMAX_API_KEY` |
| MiniMax CN | API key | `MINIMAX_CN_API_KEY` |
| Kimi / Moonshot | API key | `KIMI_API_KEY` |
| Alibaba / DashScope | API key | `DASHSCOPE_API_KEY` |
| Xiaomi MiMo | API key | `XIAOMI_API_KEY` |
| Kilo Code | API key | `KILOCODE_API_KEY` |
| OpenCode Zen | API key | `OPENCODE_ZEN_API_KEY` |
| OpenCode Go | API key | `OPENCODE_GO_API_KEY` |
| Qwen OAuth | OAuth | `zed auth add qwen-oauth` |
| è‡ªå®šä¹‰ç«¯ç‚¹ | é…ç½® | `config.yaml` ä¸­çš„ `model.base_url` + `model.api_key` |
| GitHub Copilot ACP | å¤–éƒ¨ | `COPILOT_CLI_PATH` æˆ– Copilot CLI |

å®Œæ•´æä¾›å•†æ–‡æ¡£ï¼šhttps://zed-agent.zedteam.com/docs/integrations/providers

### Toolset

é€šè¿‡ `zed tools`ï¼ˆäº¤äº’å¼ï¼‰æˆ– `zed tools enable/disable NAME` å¯ç”¨/ç¦ç”¨ã€‚

| Toolset | æä¾›çš„åŠŸèƒ½ |
|---------|-----------------|
| `web` | ç½‘é¡µæœç´¢å’Œå†…å®¹æå– |
| `search` | ä»…ç½‘é¡µæœç´¢ï¼ˆ`web` çš„å­é›†ï¼‰ |
| `browser` | æµè§ˆå™¨è‡ªåŠ¨åŒ–ï¼ˆBrowserbaseã€Camofox æˆ–æœ¬åœ° Chromiumï¼‰ |
| `terminal` | Shell å‘½ä»¤å’Œè¿›ç¨‹ç®¡ç† |
| `file` | æ–‡ä»¶è¯»/å†™/æœç´¢/è¡¥ä¸ |
| `code_execution` | æ²™ç®± Python æ‰§è¡Œ |
| `vision` | å›¾åƒåˆ†æž |
| `image_gen` | AI å›¾åƒç”Ÿæˆ |
| `video` | è§†é¢‘åˆ†æžå’Œç”Ÿæˆ |
| `tts` | æ–‡å­—è½¬è¯­éŸ³ |
| `skills` | Skill æµè§ˆå’Œç®¡ç† |
| `memory` | è·¨ä¼šè¯æŒä¹…è®°å¿† |
| `session_search` | æœç´¢åŽ†å²å¯¹è¯ |
| `delegation` | å­ agent ä»»åŠ¡å§”æ´¾ |
| `cronjob` | å®šæ—¶ä»»åŠ¡ç®¡ç† |
| `clarify` | å‘ç”¨æˆ·æé—®æ¾„æ¸… |
| `messaging` | è·¨å¹³å°æ¶ˆæ¯å‘é€ |
| `todo` | ä¼šè¯å†…ä»»åŠ¡è§„åˆ’å’Œè·Ÿè¸ª |
| `kanban` | å¤š agent å·¥ä½œé˜Ÿåˆ—å·¥å…·ï¼ˆä»…é™ workerï¼‰ |
| `debugging` | é¢å¤–çš„å†…çœ/è°ƒè¯•å·¥å…·ï¼ˆé»˜è®¤å…³é—­ï¼‰ |
| `safe` | æœ€å°åŒ–ã€ä½Žé£Žé™©å·¥å…·é›†ï¼Œç”¨äºŽå—é™ä¼šè¯ |
| `spotify` | Spotify æ’­æ”¾å’Œæ’­æ”¾åˆ—è¡¨æŽ§åˆ¶ |
| `homeassistant` | æ™ºèƒ½å®¶å±…æŽ§åˆ¶ï¼ˆé»˜è®¤å…³é—­ï¼‰ |
| `discord` | Discord é›†æˆå·¥å…· |
| `discord_admin` | Discord ç®¡ç†/å®¡æ ¸å·¥å…· |
| `feishu_doc` | é£žä¹¦æ–‡æ¡£å·¥å…· |
| `feishu_drive` | é£žä¹¦äº‘ç›˜å·¥å…· |
| `yuanbao` | å…ƒå®é›†æˆå·¥å…· |
| `rl` | å¼ºåŒ–å­¦ä¹ å·¥å…·ï¼ˆé»˜è®¤å…³é—­ï¼‰ |
| `moa` | Mixture of Agentsï¼ˆé»˜è®¤å…³é—­ï¼‰ |

å®Œæ•´æžšä¸¾ä½äºŽ `toolsets.py` çš„ `TOOLSETS` å­—å…¸ä¸­ï¼›`_ZED_CORE_TOOLS` æ˜¯å¤§å¤šæ•°å¹³å°ç»§æ‰¿çš„é»˜è®¤å·¥å…·åŒ…ã€‚

å·¥å…·å˜æ›´åœ¨ `/reset`ï¼ˆæ–°ä¼šè¯ï¼‰åŽç”Ÿæ•ˆã€‚ä¸ºä¿ç•™ prompt ç¼“å­˜ï¼Œå˜æ›´**ä¸ä¼š**åœ¨å¯¹è¯ä¸­é€”ç”Ÿæ•ˆã€‚

---

## å®‰å…¨ä¸Žéšç§å¼€å…³

å¸¸è§çš„"ä¸ºä»€ä¹ˆ Zed å¯¹æˆ‘çš„è¾“å‡º/å·¥å…·è°ƒç”¨/å‘½ä»¤åšäº† Xï¼Ÿ"å¼€å…³â€”â€”ä»¥åŠæ›´æ”¹å®ƒä»¬çš„ç¡®åˆ‡å‘½ä»¤ã€‚å…¶ä¸­å¤§å¤šæ•°éœ€è¦æ–°ä¼šè¯ï¼ˆèŠå¤©ä¸­çš„ `/reset`ï¼Œæˆ–å¯åŠ¨æ–°çš„ `zed` è°ƒç”¨ï¼‰ï¼Œå› ä¸ºå®ƒä»¬åœ¨å¯åŠ¨æ—¶åªè¯»å–ä¸€æ¬¡ã€‚

### å·¥å…·è¾“å‡ºä¸­çš„å¯†é’¥è„±æ•

å¯†é’¥è„±æ•**é»˜è®¤å…³é—­** â€” å·¥å…·è¾“å‡ºï¼ˆç»ˆç«¯ stdoutã€`read_file`ã€ç½‘é¡µå†…å®¹ã€å­ agent æ‘˜è¦ç­‰ï¼‰ä¸ç»ä¿®æ”¹ç›´æŽ¥ä¼ é€’ã€‚å¦‚æžœç”¨æˆ·å¸Œæœ› Zed åœ¨ API keyã€token å’Œå¯†é’¥è¿›å…¥å¯¹è¯ä¸Šä¸‹æ–‡å’Œæ—¥å¿—ä¹‹å‰è‡ªåŠ¨å±è”½å®ƒä»¬ï¼š

```bash
zed config set security.redact_secrets true       # å…¨å±€å¯ç”¨
```

**éœ€è¦é‡å¯ã€‚** `security.redact_secrets` åœ¨å¯¼å…¥æ—¶å¿«ç…§ â€” åœ¨ä¼šè¯ä¸­é€”åˆ‡æ¢ï¼ˆä¾‹å¦‚é€šè¿‡å·¥å…·è°ƒç”¨æ‰§è¡Œ `export ZED_REDACT_SECRETS=true`ï¼‰å¯¹æ­£åœ¨è¿è¡Œçš„è¿›ç¨‹**ä¸ä¼š**ç”Ÿæ•ˆã€‚å‘ŠçŸ¥ç”¨æˆ·åœ¨ç»ˆç«¯è¿è¡Œ `zed config set security.redact_secrets true`ï¼Œç„¶åŽå¯åŠ¨æ–°ä¼šè¯ã€‚è¿™æ˜¯æœ‰æ„ä¸ºä¹‹â€”â€”é˜²æ­¢ LLM åœ¨ä»»åŠ¡ä¸­é€”è‡ªè¡Œåˆ‡æ¢è¯¥å¼€å…³ã€‚

å†æ¬¡ç¦ç”¨ï¼š
```bash
zed config set security.redact_secrets false
```

### Gateway æ¶ˆæ¯ä¸­çš„ PII è„±æ•

ä¸Žå¯†é’¥è„±æ•åˆ†å¼€ã€‚å¯ç”¨åŽï¼Œgateway åœ¨ä¸Šä¸‹æ–‡åˆ°è¾¾æ¨¡åž‹ä¹‹å‰å¯¹ç”¨æˆ· ID è¿›è¡Œå“ˆå¸Œå¤„ç†å¹¶ä»Žä¼šè¯ä¸Šä¸‹æ–‡ä¸­åŽ»é™¤ç”µè¯å·ç ï¼š

```bash
zed config set privacy.redact_pii true    # å¯ç”¨
zed config set privacy.redact_pii false   # ç¦ç”¨ï¼ˆé»˜è®¤ï¼‰
```

### å‘½ä»¤å®¡æ‰¹æç¤º

é»˜è®¤æƒ…å†µä¸‹ï¼ˆ`approvals.mode: manual`ï¼‰ï¼ŒZed åœ¨è¿è¡Œè¢«æ ‡è®°ä¸ºç ´åæ€§çš„ shell å‘½ä»¤ï¼ˆ`rm -rf`ã€`git reset --hard` ç­‰ï¼‰ä¹‹å‰ä¼šæç¤ºç”¨æˆ·ã€‚æ¨¡å¼å¦‚ä¸‹ï¼š

- `manual` â€” å§‹ç»ˆæç¤ºï¼ˆé»˜è®¤ï¼‰
- `smart` â€” ä½¿ç”¨è¾…åŠ© LLM è‡ªåŠ¨æ‰¹å‡†ä½Žé£Žé™©å‘½ä»¤ï¼Œå¯¹é«˜é£Žé™©å‘½ä»¤æç¤º
- `off` â€” è·³è¿‡æ‰€æœ‰å®¡æ‰¹æç¤ºï¼ˆç­‰åŒäºŽ `--yolo`ï¼‰

```bash
zed config set approvals.mode smart       # æŽ¨èçš„æŠ˜ä¸­æ–¹æ¡ˆ
zed config set approvals.mode off         # ç»•è¿‡ä¸€åˆ‡ï¼ˆä¸æŽ¨èï¼‰
```

å•æ¬¡è°ƒç”¨ç»•è¿‡ï¼ˆä¸æ›´æ”¹é…ç½®ï¼‰ï¼š
- `zed --yolo â€¦`
- `export ZED_YOLO_MODE=1`

æ³¨æ„ï¼šYOLO / `approvals.mode: off` **ä¸ä¼š**å…³é—­å¯†é’¥è„±æ•ã€‚ä¸¤è€…ç›¸äº’ç‹¬ç«‹ã€‚

### Shell hook å…è®¸åˆ—è¡¨

æŸäº› shell hook é›†æˆåœ¨è§¦å‘å‰éœ€è¦æ˜Žç¡®åŠ å…¥å…è®¸åˆ—è¡¨ã€‚é€šè¿‡ `~/.zed/shell-hooks-allowlist.json` ç®¡ç†â€”â€”åœ¨ hook é¦–æ¬¡å°è¯•è¿è¡Œæ—¶ä»¥äº¤äº’æ–¹å¼æç¤ºã€‚

### ç¦ç”¨ web/browser/image-gen å·¥å…·

è¦å®Œå…¨é˜»æ­¢æ¨¡åž‹è®¿é—®ç½‘ç»œæˆ–åª’ä½“å·¥å…·ï¼Œæ‰“å¼€ `zed tools` å¹¶æŒ‰å¹³å°åˆ‡æ¢ã€‚åœ¨ä¸‹æ¬¡ä¼šè¯ï¼ˆ`/reset`ï¼‰åŽç”Ÿæ•ˆã€‚å‚è§ä¸Šæ–¹çš„å·¥å…·ä¸Ž Skill éƒ¨åˆ†ã€‚

---

## è¯­éŸ³ä¸Žè½¬å½•

### STTï¼ˆè¯­éŸ³ â†’ æ–‡å­—ï¼‰

æ¥è‡ªæ¶ˆæ¯å¹³å°çš„è¯­éŸ³æ¶ˆæ¯ä¼šè‡ªåŠ¨è½¬å½•ã€‚

æä¾›å•†ä¼˜å…ˆçº§ï¼ˆè‡ªåŠ¨æ£€æµ‹ï¼‰ï¼š
1. **æœ¬åœ° faster-whisper** â€” å…è´¹ï¼Œæ— éœ€ API keyï¼š`pip install faster-whisper`
2. **Groq Whisper** â€” å…è´¹å¥—é¤ï¼šè®¾ç½® `GROQ_API_KEY`
3. **OpenAI Whisper** â€” ä»˜è´¹ï¼šè®¾ç½® `VOICE_TOOLS_OPENAI_KEY`
4. **Mistral Voxtral** â€” è®¾ç½® `MISTRAL_API_KEY`

é…ç½®ï¼š
```yaml
stt:
  enabled: true
  provider: local        # local, groq, openai, mistral
  local:
    model: base          # tiny, base, small, medium, large-v3
```

### TTSï¼ˆæ–‡å­— â†’ è¯­éŸ³ï¼‰

| æä¾›å•† | çŽ¯å¢ƒå˜é‡ | å…è´¹ï¼Ÿ |
|----------|---------|-------|
| Edge TTS | æ—  | æ˜¯ï¼ˆé»˜è®¤ï¼‰ |
| ElevenLabs | `ELEVENLABS_API_KEY` | å…è´¹å¥—é¤ |
| OpenAI | `VOICE_TOOLS_OPENAI_KEY` | ä»˜è´¹ |
| MiniMax | `MINIMAX_API_KEY` | ä»˜è´¹ |
| Mistral (Voxtral) | `MISTRAL_API_KEY` | ä»˜è´¹ |
| NeuTTSï¼ˆæœ¬åœ°ï¼‰ | æ— ï¼ˆ`pip install neutts[all]` + `espeak-ng`ï¼‰ | å…è´¹ |

è¯­éŸ³å‘½ä»¤ï¼š`/voice on`ï¼ˆè¯­éŸ³å¯¹è¯­éŸ³ï¼‰ã€`/voice tts`ï¼ˆå§‹ç»ˆè¯­éŸ³ï¼‰ã€`/voice off`ã€‚

---

## ç”Ÿæˆé¢å¤–çš„ Zed å®žä¾‹

å°†é¢å¤–çš„ Zed è¿›ç¨‹ä½œä¸ºå®Œå…¨ç‹¬ç«‹çš„å­è¿›ç¨‹è¿è¡Œâ€”â€”æ‹¥æœ‰ç‹¬ç«‹çš„ä¼šè¯ã€å·¥å…·å’ŒçŽ¯å¢ƒã€‚

### ä½•æ—¶ä½¿ç”¨æ­¤æ–¹å¼ vs delegate_task

| | `delegate_task` | ç”Ÿæˆ `zed` è¿›ç¨‹ |
|-|-----------------|--------------------------|
| éš”ç¦»æ€§ | ç‹¬ç«‹å¯¹è¯ï¼Œå…±äº«è¿›ç¨‹ | å®Œå…¨ç‹¬ç«‹è¿›ç¨‹ |
| æŒç»­æ—¶é—´ | åˆ†é’Ÿçº§ï¼ˆå—çˆ¶å¾ªçŽ¯é™åˆ¶ï¼‰ | å°æ—¶/å¤© |
| å·¥å…·è®¿é—® | çˆ¶å·¥å…·çš„å­é›† | å®Œæ•´å·¥å…·è®¿é—® |
| äº¤äº’æ€§ | å¦ | æ˜¯ï¼ˆPTY æ¨¡å¼ï¼‰ |
| ä½¿ç”¨åœºæ™¯ | å¿«é€Ÿå¹¶è¡Œå­ä»»åŠ¡ | é•¿æ—¶é—´è‡ªä¸»ä»»åŠ¡ |

### å•æ¬¡æ¨¡å¼

```
terminal(command="zed chat -q 'Research GRPO papers and write summary to ~/research/grpo.md'", timeout=300)

# é•¿ä»»åŠ¡åŽå°è¿è¡Œï¼š
terminal(command="zed chat -q 'Set up CI/CD for ~/myapp'", background=true)
```

### äº¤äº’å¼ PTY æ¨¡å¼ï¼ˆé€šè¿‡ tmuxï¼‰

Zed ä½¿ç”¨ prompt_toolkitï¼Œéœ€è¦çœŸå®žç»ˆç«¯ã€‚ä½¿ç”¨ tmux è¿›è¡Œäº¤äº’å¼ç”Ÿæˆï¼š

```
# å¯åŠ¨
terminal(command="tmux new-session -d -s agent1 -x 120 -y 40 'zed'", timeout=10)

# ç­‰å¾…å¯åŠ¨ï¼Œç„¶åŽå‘é€æ¶ˆæ¯
terminal(command="sleep 8 && tmux send-keys -t agent1 'Build a FastAPI auth service' Enter", timeout=15)

# è¯»å–è¾“å‡º
terminal(command="sleep 20 && tmux capture-pane -t agent1 -p", timeout=5)

# å‘é€åŽç»­æ¶ˆæ¯
terminal(command="tmux send-keys -t agent1 'Add rate limiting middleware' Enter", timeout=5)

# é€€å‡º
terminal(command="tmux send-keys -t agent1 '/exit' Enter && sleep 2 && tmux kill-session -t agent1", timeout=10)
```

### å¤š Agent åè°ƒ

```
# Agent Aï¼šåŽç«¯
terminal(command="tmux new-session -d -s backend -x 120 -y 40 'zed -w'", timeout=10)
terminal(command="sleep 8 && tmux send-keys -t backend 'Build REST API for user management' Enter", timeout=15)

# Agent Bï¼šå‰ç«¯
terminal(command="tmux new-session -d -s frontend -x 120 -y 40 'zed -w'", timeout=10)
terminal(command="sleep 8 && tmux send-keys -t frontend 'Build React dashboard for user management' Enter", timeout=15)

# æ£€æŸ¥è¿›åº¦ï¼Œåœ¨ä¸¤è€…ä¹‹é—´ä¼ é€’ä¸Šä¸‹æ–‡
terminal(command="tmux capture-pane -t backend -p | tail -30", timeout=5)
terminal(command="tmux send-keys -t frontend 'Here is the API schema from the backend agent: ...' Enter", timeout=5)
```

### ä¼šè¯æ¢å¤

```
# æ¢å¤æœ€è¿‘çš„ä¼šè¯
terminal(command="tmux new-session -d -s resumed 'zed --continue'", timeout=10)

# æ¢å¤ç‰¹å®šä¼šè¯
terminal(command="tmux new-session -d -s resumed 'zed --resume 20260225_143052_a1b2c3'", timeout=10)
```

### æç¤º

- **å¿«é€Ÿå­ä»»åŠ¡ä¼˜å…ˆä½¿ç”¨ `delegate_task`** â€” æ¯”ç”Ÿæˆå®Œæ•´è¿›ç¨‹å¼€é”€æ›´å°
- **ç”Ÿæˆç¼–è¾‘ä»£ç çš„ agent æ—¶ä½¿ç”¨ `-w`ï¼ˆworktree æ¨¡å¼ï¼‰** â€” é˜²æ­¢ git å†²çª
- **ä¸ºå•æ¬¡æ¨¡å¼è®¾ç½®è¶…æ—¶** â€” å¤æ‚ä»»åŠ¡å¯èƒ½éœ€è¦ 5-10 åˆ†é’Ÿ
- **fire-and-forget ä½¿ç”¨ `zed chat -q`** â€” æ— éœ€ PTY
- **äº¤äº’å¼ä¼šè¯ä½¿ç”¨ tmux** â€” åŽŸå§‹ PTY æ¨¡å¼ä¸Ž prompt_toolkit å­˜åœ¨ `\r` vs `\n` é—®é¢˜
- **å®šæ—¶ä»»åŠ¡ä½¿ç”¨ `cronjob` å·¥å…·è€Œéžç”Ÿæˆè¿›ç¨‹** â€” å¤„ç†æŠ•é€’å’Œé‡è¯•

---

## æŒä¹…åŒ–ä¸ŽåŽå°ç³»ç»Ÿ

å››ä¸ªç³»ç»Ÿä¸Žä¸»å¯¹è¯å¾ªçŽ¯å¹¶è¡Œè¿è¡Œã€‚æ­¤å¤„ä¸ºå¿«é€Ÿå‚è€ƒï¼›å®Œæ•´å¼€å‘è€…è¯´æ˜Žä½äºŽ `AGENTS.md`ï¼Œé¢å‘ç”¨æˆ·çš„æ–‡æ¡£ä½äºŽ `website/docs/user-guide/features/`ã€‚

### å§”æ´¾ï¼ˆ`delegate_task`ï¼‰

åŒæ­¥å­ agent ç”Ÿæˆâ€”â€”çˆ¶ agent ç­‰å¾…å­ agent çš„æ‘˜è¦åŽå†ç»§ç»­è‡ªèº«å¾ªçŽ¯ã€‚éš”ç¦»çš„ä¸Šä¸‹æ–‡å’Œç»ˆç«¯ä¼šè¯ã€‚

- **å•ä¸ªï¼š** `delegate_task(goal, context, toolsets)`ã€‚
- **æ‰¹é‡ï¼š** `delegate_task(tasks=[{goal, ...}, ...])` å¹¶è¡Œè¿è¡Œå­ä»»åŠ¡ï¼Œä¸Šé™ç”± `delegation.max_concurrent_children`ï¼ˆé»˜è®¤ 3ï¼‰æŽ§åˆ¶ã€‚
- **è§’è‰²ï¼š** `leaf`ï¼ˆé»˜è®¤ï¼›ä¸èƒ½å†å§”æ´¾ï¼‰vs `orchestrator`ï¼ˆå¯ä»¥ç”Ÿæˆè‡ªå·±çš„ workerï¼Œå— `delegation.max_spawn_depth` é™åˆ¶ï¼‰ã€‚
- **éžæŒä¹…åŒ–ã€‚** å¦‚æžœçˆ¶ agent è¢«ä¸­æ–­ï¼Œå­ agent ä¼šè¢«å–æ¶ˆã€‚å¯¹äºŽå¿…é¡»åœ¨å½“å‰è½®æ¬¡ä¹‹åŽç»§ç»­çš„å·¥ä½œï¼Œä½¿ç”¨ `cronjob` æˆ– `terminal(background=True, notify_on_complete=True)`ã€‚

é…ç½®ï¼š`config.yaml` ä¸­çš„ `delegation.*`ã€‚

### Cronï¼ˆå®šæ—¶ä»»åŠ¡ï¼‰

æŒä¹…åŒ–è°ƒåº¦å™¨â€”â€”`cron/jobs.py` + `cron/scheduler.py`ã€‚é€šè¿‡ `cronjob` å·¥å…·ã€`zed cron` CLIï¼ˆ`list`ã€`add`ã€`edit`ã€`pause`ã€`resume`ã€`run`ã€`remove`ï¼‰æˆ– `/cron` æ–œæ å‘½ä»¤é©±åŠ¨ã€‚

- **è°ƒåº¦æ ¼å¼ï¼š** æŒç»­æ—¶é—´ï¼ˆ`"30m"`ã€`"2h"`ï¼‰ã€"every" çŸ­è¯­ï¼ˆ`"every monday 9am"`ï¼‰ã€5 å­—æ®µ cronï¼ˆ`"0 9 * * *"`ï¼‰æˆ– ISO æ—¶é—´æˆ³ã€‚
- **æ¯ä»»åŠ¡é€‰é¡¹ï¼š** `skills`ã€`model`/`provider` è¦†ç›–ã€`script`ï¼ˆé¢„è¿è¡Œæ•°æ®æ”¶é›†ï¼›`no_agent=True` ä½¿è„šæœ¬æˆä¸ºæ•´ä¸ªä»»åŠ¡ï¼‰ã€`context_from`ï¼ˆå°†ä»»åŠ¡ A çš„è¾“å‡ºé“¾æŽ¥åˆ°ä»»åŠ¡ Bï¼‰ã€`workdir`ï¼ˆåœ¨ç‰¹å®šç›®å½•ä¸­è¿è¡Œï¼ŒåŠ è½½å…¶ `AGENTS.md` / `CLAUDE.md`ï¼‰ã€å¤šå¹³å°æŠ•é€’ã€‚
- **ä¸å˜é‡ï¼š** æ¯æ¬¡è¿è¡Œ 3 åˆ†é’Ÿç¡¬ä¸­æ–­ï¼Œ`.tick.lock` æ–‡ä»¶é˜²æ­¢è·¨è¿›ç¨‹é‡å¤ tickï¼Œcron ä¼šè¯é»˜è®¤ä¼ é€’ `skip_memory=True`ï¼Œcron æŠ•é€’ä½¿ç”¨é¡µçœ‰/é¡µè„šæ¡†æž¶è€Œéžé•œåƒåˆ°ç›®æ ‡ gateway ä¼šè¯ï¼ˆä¿æŒè§’è‰²äº¤æ›¿å®Œæ•´ï¼‰ã€‚

ç”¨æˆ·æ–‡æ¡£ï¼šhttps://zed-agent.zedteam.com/docs/user-guide/features/cron

### Curatorï¼ˆskill ç”Ÿå‘½å‘¨æœŸï¼‰

agent åˆ›å»ºçš„ skill çš„åŽå°ç»´æŠ¤ã€‚è·Ÿè¸ªä½¿ç”¨æƒ…å†µï¼Œå°†é—²ç½® skill æ ‡è®°ä¸ºè¿‡æ—¶ï¼Œå½’æ¡£è¿‡æ—¶çš„ skillï¼Œä¿ç•™è¿è¡Œå‰çš„ tar.gz å¤‡ä»½ä»¥é˜²æ•°æ®ä¸¢å¤±ã€‚

- **CLIï¼š** `zed curator <verb>` â€” `status`ã€`run`ã€`pause`ã€`resume`ã€`pin`ã€`unpin`ã€`archive`ã€`restore`ã€`prune`ã€`backup`ã€`rollback`ã€‚
- **æ–œæ å‘½ä»¤ï¼š** `/curator <subcommand>` ä¸Ž CLI å¯¹åº”ã€‚
- **èŒƒå›´ï¼š** ä»…å¤„ç† `created_by: "agent"` æ¥æºçš„ skillã€‚å†…ç½®å’Œ hub å®‰è£…çš„ skill ä¸åœ¨èŒƒå›´å†…ã€‚**ä»Žä¸åˆ é™¤** â€” æœ€å…·ç ´åæ€§çš„æ“ä½œæ˜¯å½’æ¡£ã€‚å·²å›ºå®šçš„ skill ä¸å—ä»»ä½•è‡ªåŠ¨è½¬æ¢å’Œä»»ä½• LLM å®¡æŸ¥çš„å½±å“ã€‚
- **é¥æµ‹ï¼š** `~/.zed/skills/.usage.json` ä¸­çš„ sidecar ä¿å­˜æ¯ä¸ª skill çš„ `use_count`ã€`view_count`ã€`patch_count`ã€`last_activity_at`ã€`state`ã€`pinned`ã€‚

é…ç½®ï¼š`curator.*`ï¼ˆ`enabled`ã€`interval_hours`ã€`min_idle_hours`ã€`stale_after_days`ã€`archive_after_days`ã€`backup.*`ï¼‰ã€‚
ç”¨æˆ·æ–‡æ¡£ï¼šhttps://zed-agent.zedteam.com/docs/user-guide/features/curator

### Kanbanï¼ˆå¤š agent å·¥ä½œé˜Ÿåˆ—ï¼‰

ç”¨äºŽå¤š profile/å¤š worker åä½œçš„æŒä¹…åŒ– SQLite çœ‹æ¿ï¼ˆkanbanï¼‰ã€‚ç”¨æˆ·é€šè¿‡ `zed kanban <verb>` é©±åŠ¨ï¼›è°ƒåº¦å™¨ç”Ÿæˆçš„ worker çœ‹åˆ°ç”± `ZED_KANBAN_TASK` æŽ§åˆ¶çš„ä¸“æ³¨ `kanban_*` toolsetï¼Œorchestrator profile å¯ä»¥é€‰æ‹©åŠ å…¥æ›´å¹¿æ³›çš„ `kanban` toolsetã€‚æ™®é€šä¼šè¯é™¤éžé…ç½®ï¼Œå¦åˆ™æ²¡æœ‰ä»»ä½• `kanban_*` schema å ç”¨ã€‚

- **CLI åŠ¨è¯ï¼ˆå¸¸ç”¨ï¼‰ï¼š** `init`ã€`create`ã€`list`ï¼ˆåˆ«å `ls`ï¼‰ã€`show`ã€`assign`ã€`link`ã€`unlink`ã€`comment`ã€`complete`ã€`block`ã€`unblock`ã€`archive`ã€`tail`ã€‚ä¸å¸¸ç”¨ï¼š`watch`ã€`stats`ã€`runs`ã€`log`ã€`dispatch`ã€`daemon`ã€`gc`ã€‚
- **Worker/orchestrator toolsetï¼š** `kanban_show`ã€`kanban_complete`ã€`kanban_block`ã€`kanban_heartbeat`ã€`kanban_comment`ã€`kanban_create`ã€`kanban_link`ï¼›åœ¨è°ƒåº¦å™¨ç”Ÿæˆçš„ä»»åŠ¡ä¹‹å¤–æ˜¾å¼å¯ç”¨ `kanban` toolset çš„ profile è¿˜å¯èŽ·å¾— `kanban_list` å’Œ `kanban_unblock` ç”¨äºŽçœ‹æ¿è·¯ç”±ã€‚
- **è°ƒåº¦å™¨** é»˜è®¤åœ¨ gateway å†…è¿è¡Œï¼ˆ`kanban.dispatch_in_gateway: true`ï¼‰â€”â€”å›žæ”¶è¿‡æœŸè®¤é¢†ã€æŽ¨è¿›å°±ç»ªä»»åŠ¡ã€åŽŸå­è®¤é¢†ã€ç”Ÿæˆå·²åˆ†é…çš„ profileã€‚åœ¨é…ç½®çš„ `kanban.failure_limit` æ¬¡è¿žç»­éžæˆåŠŸå°è¯•åŽè‡ªåŠ¨é˜»å¡žä»»åŠ¡ï¼ˆé»˜è®¤ï¼š2ï¼‰ã€‚
- **éš”ç¦»ï¼š** çœ‹æ¿æ˜¯ç¡¬è¾¹ç•Œï¼ˆworker åœ¨çŽ¯å¢ƒä¸­å›ºå®š `ZED_KANBAN_BOARD`ï¼‰ï¼›ç§Ÿæˆ·æ˜¯çœ‹æ¿å†…ç”¨äºŽå·¥ä½œåŒºè·¯å¾„å’Œè®°å¿†é”®éš”ç¦»çš„è½¯å‘½åç©ºé—´ã€‚

ç”¨æˆ·æ–‡æ¡£ï¼šhttps://zed-agent.zedteam.com/docs/user-guide/features/kanban

---

## Windows ç‰¹æœ‰é—®é¢˜

Zed åœ¨ Windows ä¸ŠåŽŸç”Ÿè¿è¡Œï¼ˆPowerShellã€cmdã€Windows Terminalã€git-bash minttyã€VS Code é›†æˆç»ˆç«¯ï¼‰ã€‚å¤§å¤šæ•°åŠŸèƒ½å¼€ç®±å³ç”¨ï¼Œä½† Win32 å’Œ POSIX ä¹‹é—´æœ‰ä¸€äº›å·®å¼‚æ›¾ç»™æˆ‘ä»¬å¸¦æ¥éº»çƒ¦â€”â€”é‡åˆ°æ–°é—®é¢˜æ—¶è¯·åœ¨æ­¤è®°å½•ï¼Œä»¥å…ä¸‹ä¸€ä¸ªäººï¼ˆæˆ–ä¸‹ä¸€ä¸ªä¼šè¯ï¼‰é‡æ–°è¸©å‘ã€‚

### è¾“å…¥/é”®ç»‘å®š

**Alt+Enter ä¸æ’å…¥æ¢è¡Œã€‚** Windows Terminal åœ¨ç»ˆç«¯å±‚æ‹¦æˆª Alt+Enter ä»¥åˆ‡æ¢å…¨å±â€”â€”è¯¥æŒ‰é”®æ°¸è¿œä¸ä¼šåˆ°è¾¾ prompt_toolkitã€‚è¯·æ”¹ç”¨ **Ctrl+Enter**ã€‚Windows Terminal å°† Ctrl+Enter ä½œä¸º LFï¼ˆ`c-j`ï¼‰ä¼ é€’ï¼Œä¸Žæ™®é€š Enterï¼ˆ`c-m` / CRï¼‰ä¸åŒï¼ŒCLI ä»…åœ¨ `win32` ä¸Šå°† `c-j` ç»‘å®šåˆ°æ¢è¡Œæ’å…¥ï¼ˆå‚è§ `_bind_prompt_submit_keys` + `cli.py` ä¸­ä»…é™ Windows çš„ `c-j` ç»‘å®šï¼‰ã€‚å‰¯ä½œç”¨ï¼šåœ¨ Windows ä¸Šï¼ŒåŽŸå§‹ Ctrl+J æŒ‰é”®ä¹Ÿä¼šæ’å…¥æ¢è¡Œâ€”â€”è¿™æ˜¯ä¸å¯é¿å…çš„ï¼Œå› ä¸º Windows Terminal åœ¨ Win32 æŽ§åˆ¶å° API å±‚å°† Ctrl+Enter å’Œ Ctrl+J æŠ˜å ä¸ºç›¸åŒçš„é”®ç ã€‚Windows ä¸Š Ctrl+J æ²¡æœ‰å†²çªçš„ç»‘å®šï¼Œå› æ­¤è¿™æ˜¯æ— å®³çš„å‰¯ä½œç”¨ã€‚

mintty / git-bash è¡Œä¸ºç›¸åŒï¼ˆAlt+Enter å…¨å±ï¼‰ï¼Œé™¤éžä½ åœ¨é€‰é¡¹ â†’ é”®ä¸­ç¦ç”¨ Alt+Fn å¿«æ·é”®ã€‚ç›´æŽ¥ä½¿ç”¨ Ctrl+Enter æ›´ç®€å•ã€‚

**è¯Šæ–­é”®ç»‘å®šã€‚** è¿è¡Œ `python scripts/keystroke_diagnostic.py`ï¼ˆä»“åº“æ ¹ç›®å½•ï¼‰å¯æŸ¥çœ‹ prompt_toolkit åœ¨å½“å‰ç»ˆç«¯ä¸­å¦‚ä½•è¯†åˆ«æ¯ä¸ªæŒ‰é”®ã€‚å¯å›žç­”"Shift+Enter æ˜¯å¦ä½œä¸ºç‹¬ç«‹é”®ä¼ å…¥ï¼Ÿ"ï¼ˆå‡ ä¹Žä»Žä¸â€”â€”å¤§å¤šæ•°ç»ˆç«¯å°†å…¶æŠ˜å ä¸ºæ™®é€š Enterï¼‰æˆ–"æˆ‘çš„ç»ˆç«¯ä¸º Ctrl+Enter å‘é€ä»€ä¹ˆå­—èŠ‚åºåˆ—ï¼Ÿ"ç­‰é—®é¢˜ã€‚Ctrl+Enter = c-j è¿™ä¸€äº‹å®žå°±æ˜¯é€šè¿‡æ­¤æ–¹å¼ç¡®è®¤çš„ã€‚

### é…ç½®/æ–‡ä»¶

**é¦–æ¬¡è¿è¡Œæ—¶ HTTP 400 "No models provided"ã€‚** `config.yaml` ä¿å­˜æ—¶å¸¦æœ‰ UTF-8 BOMï¼ˆWindows åº”ç”¨å†™å…¥æ—¶å¸¸è§ï¼‰ã€‚é‡æ–°ä¿å­˜ä¸ºä¸å¸¦ BOM çš„ UTF-8ã€‚`zed config edit` å†™å…¥æ—¶ä¸å¸¦ BOMï¼›æ‰‹åŠ¨åœ¨è®°äº‹æœ¬ä¸­ç¼–è¾‘æ˜¯å¸¸è§åŽŸå› ã€‚

### `execute_code` / æ²™ç®±

**WinError 10106**ï¼ˆ"æ— æ³•åŠ è½½æˆ–åˆå§‹åŒ–è¯·æ±‚çš„æœåŠ¡æä¾›å•†"ï¼‰æ¥è‡ªæ²™ç®±å­è¿›ç¨‹â€”â€”å®ƒæ— æ³•åˆ›å»º `AF_INET` socketï¼Œå› æ­¤å›žé€€çš„ loopback-TCP RPC åœ¨ `connect()` ä¹‹å‰å¤±è´¥ã€‚æ ¹æœ¬åŽŸå› é€šå¸¸**ä¸æ˜¯**æŸåçš„ Winsock LSPï¼›è€Œæ˜¯ Zed è‡ªèº«çš„çŽ¯å¢ƒæ¸…ç†å™¨ä»Žå­è¿›ç¨‹çŽ¯å¢ƒä¸­åˆ é™¤äº† `SYSTEMROOT` / `WINDIR` / `COMSPEC`ã€‚Python çš„ `socket` æ¨¡å—éœ€è¦ `SYSTEMROOT` æ¥å®šä½ `mswsock.dll`ã€‚é€šè¿‡ `tools/code_execution_tool.py` ä¸­çš„ `_WINDOWS_ESSENTIAL_ENV_VARS` å…è®¸åˆ—è¡¨ä¿®å¤ã€‚å¦‚æžœä»ç„¶é‡åˆ°æ­¤é—®é¢˜ï¼Œåœ¨ `execute_code` å—å†… echo `os.environ` ä»¥ç¡®è®¤ `SYSTEMROOT` å·²è®¾ç½®ã€‚å®Œæ•´è¯Šæ–­æ–¹æ¡ˆè§ `references/execute-code-sandbox-env-windows.md`ã€‚

### æµ‹è¯•/è´¡çŒ®

**`scripts/run_tests.sh` åœ¨ Windows ä¸Šæ— æ³•ç›´æŽ¥ä½¿ç”¨** â€” å®ƒæŸ¥æ‰¾ POSIX venv å¸ƒå±€ï¼ˆ`.venv/bin/activate`ï¼‰ã€‚Zed å®‰è£…çš„ venv ä½äºŽ `venv/Scripts/`ï¼Œä¹Ÿæ²¡æœ‰ pip æˆ– pytestï¼ˆä¸ºå‡å°å®‰è£…ä½“ç§¯è€Œç²¾ç®€ï¼‰ã€‚è§£å†³æ–¹æ¡ˆï¼šå°† `pytest + pytest-xdist + pyyaml` å®‰è£…åˆ°ç³»ç»Ÿ Python 3.11 ç”¨æˆ·ç«™ç‚¹ï¼Œç„¶åŽè®¾ç½® `PYTHONPATH` ç›´æŽ¥è°ƒç”¨ pytestï¼š

```bash
"/c/Program Files/Python311/python" -m pip install --user pytest pytest-xdist pyyaml
export PYTHONPATH="$(pwd)"
"/c/Program Files/Python311/python" -m pytest tests/foo/test_bar.py -v --tb=short -n 0
```

ä½¿ç”¨ `-n 0` è€Œéž `-n 4` â€” `pyproject.toml` çš„é»˜è®¤ `addopts` å·²åŒ…å« `-n`ï¼Œä¸” wrapper çš„ CI ä¸€è‡´æ€§ä¿è¯ä¸é€‚ç”¨äºŽéž POSIX çŽ¯å¢ƒã€‚

**ä»… POSIX çš„æµ‹è¯•éœ€è¦è·³è¿‡å®ˆå«ã€‚** ä»£ç åº“ä¸­å·²æœ‰çš„å¸¸è§æ ‡è®°ï¼š
- ç¬¦å·é“¾æŽ¥â€”â€”Windows ä¸Šéœ€è¦æå‡æƒé™
- `0o600` æ–‡ä»¶æ¨¡å¼â€”â€”POSIX æ¨¡å¼ä½åœ¨ NTFS ä¸Šé»˜è®¤ä¸å¼ºåˆ¶æ‰§è¡Œ
- `signal.SIGALRM`â€”â€”ä»… Unixï¼ˆå‚è§ `tests/conftest.py::_enforce_test_timeout`ï¼‰
- Winsock / Windows ç‰¹æœ‰å›žå½’â€”â€”`@pytest.mark.skipif(sys.platform != "win32", ...)`

ä½¿ç”¨çŽ°æœ‰çš„è·³è¿‡æ¨¡å¼é£Žæ ¼ï¼ˆ`sys.platform == "win32"` æˆ– `sys.platform.startswith("win")`ï¼‰ä»¥ä¸Žæµ‹è¯•å¥—ä»¶å…¶ä½™éƒ¨åˆ†ä¿æŒä¸€è‡´ã€‚

### è·¯å¾„/æ–‡ä»¶ç³»ç»Ÿ

**è¡Œå°¾ã€‚** Git å¯èƒ½è­¦å‘Š `LF will be replaced by CRLF the next time Git touches it`ã€‚è¿™æ˜¯å¤–è§‚é—®é¢˜â€”â€”ä»“åº“çš„ `.gitattributes` ä¼šè§„èŒƒåŒ–ã€‚ä¸è¦è®©ç¼–è¾‘å™¨è‡ªåŠ¨å°†å·²æäº¤çš„ POSIX æ¢è¡Œæ–‡ä»¶è½¬æ¢ä¸º CRLFã€‚

**æ­£æ–œæ å‡ ä¹Žåœ¨æ‰€æœ‰åœ°æ–¹éƒ½æœ‰æ•ˆã€‚** `C:/Users/...` è¢«æ¯ä¸ª Zed å·¥å…·å’Œå¤§å¤šæ•° Windows API æŽ¥å—ã€‚åœ¨ä»£ç å’Œæ—¥å¿—ä¸­ä¼˜å…ˆä½¿ç”¨æ­£æ–œæ â€”â€”é¿å…åœ¨ bash ä¸­è½¬ä¹‰åæ–œæ ã€‚

---

## æ•…éšœæŽ’æŸ¥

### è¯­éŸ³ä¸å·¥ä½œ
1. æ£€æŸ¥ `config.yaml` ä¸­ `stt.enabled: true`
2. éªŒè¯æä¾›å•†ï¼š`pip install faster-whisper` æˆ–è®¾ç½® API key
3. åœ¨ gateway ä¸­ï¼š`/restart`ã€‚åœ¨ CLI ä¸­ï¼šé€€å‡ºå¹¶é‡æ–°å¯åŠ¨ã€‚

### å·¥å…·ä¸å¯ç”¨
1. `zed tools` â€” æ£€æŸ¥ toolset æ˜¯å¦ä¸ºä½ çš„å¹³å°å¯ç”¨
2. æŸäº›å·¥å…·éœ€è¦çŽ¯å¢ƒå˜é‡ï¼ˆæ£€æŸ¥ `.env`ï¼‰
3. å¯ç”¨å·¥å…·åŽæ‰§è¡Œ `/reset`

### æ¨¡åž‹/æä¾›å•†é—®é¢˜
1. `zed doctor` â€” æ£€æŸ¥é…ç½®å’Œä¾èµ–
2. `zed auth` â€” é‡æ–°è®¤è¯ OAuth æä¾›å•†ï¼ˆæˆ– `zed auth add <provider>`ï¼‰
3. æ£€æŸ¥ `.env` ä¸­æ˜¯å¦æœ‰æ­£ç¡®çš„ API key
4. **Copilot 403**ï¼š`gh auth login` çš„ token **ä¸é€‚ç”¨äºŽ** Copilot APIã€‚å¿…é¡»é€šè¿‡ `zed model` â†’ GitHub Copilot ä½¿ç”¨ Copilot ä¸“ç”¨ OAuth è®¾å¤‡ç æµç¨‹ã€‚

### å˜æ›´æœªç”Ÿæ•ˆ
- **å·¥å…·/skillï¼š** `/reset` ä»¥æ›´æ–°åŽçš„ toolset å¯åŠ¨æ–°ä¼šè¯
- **é…ç½®å˜æ›´ï¼š** åœ¨ gateway ä¸­ï¼š`/restart`ã€‚åœ¨ CLI ä¸­ï¼šé€€å‡ºå¹¶é‡æ–°å¯åŠ¨ã€‚
- **ä»£ç å˜æ›´ï¼š** é‡å¯ CLI æˆ– gateway è¿›ç¨‹

### Skill æœªæ˜¾ç¤º
1. `zed skills list` â€” éªŒè¯å·²å®‰è£…
2. `zed skills config` â€” æ£€æŸ¥å¹³å°å¯ç”¨çŠ¶æ€
3. æ˜¾å¼åŠ è½½ï¼š`/skill name` æˆ– `zed -s name`

### Gateway é—®é¢˜
é¦–å…ˆæ£€æŸ¥æ—¥å¿—ï¼š
```bash
grep -i "failed to send\|error" ~/.zed/logs/gateway.log | tail -20
```

å¸¸è§ gateway é—®é¢˜ï¼š
- **SSH æ³¨é”€åŽ gateway åœæ­¢**ï¼šå¯ç”¨ lingerï¼š`sudo loginctl enable-linger $USER`
- **WSL2 å…³é—­åŽ gateway åœæ­¢**ï¼šWSL2 éœ€è¦ `/etc/wsl.conf` ä¸­çš„ `systemd=true` æ‰èƒ½ä½¿ systemd æœåŠ¡å·¥ä½œã€‚æ²¡æœ‰å®ƒï¼Œgateway å›žé€€åˆ° `nohup`ï¼ˆä¼šè¯å…³é—­æ—¶åœæ­¢ï¼‰ã€‚
- **Gateway å´©æºƒå¾ªçŽ¯**ï¼šé‡ç½®å¤±è´¥çŠ¶æ€ï¼š`systemctl --user reset-failed zed-gateway`

### å¹³å°ç‰¹å®šé—®é¢˜
- **Discord bot é™é»˜**ï¼šå¿…é¡»åœ¨ Bot â†’ Privileged Gateway Intents ä¸­å¯ç”¨ **Message Content Intent**ã€‚
- **Slack bot ä»…åœ¨ç§ä¿¡ä¸­å·¥ä½œ**ï¼šå¿…é¡»è®¢é˜… `message.channels` äº‹ä»¶ã€‚æ²¡æœ‰å®ƒï¼Œbot ä¼šå¿½ç•¥å…¬å…±é¢‘é“ã€‚
- **Windows ç‰¹æœ‰é—®é¢˜**ï¼ˆ`Alt+Enter` æ¢è¡Œã€WinError 10106ã€UTF-8 BOM é…ç½®ã€æµ‹è¯•å¥—ä»¶ã€è¡Œå°¾ï¼‰ï¼šå‚è§ä¸Šæ–¹ä¸“é—¨çš„ **Windows ç‰¹æœ‰é—®é¢˜** éƒ¨åˆ†ã€‚

### è¾…åŠ©æ¨¡åž‹ä¸å·¥ä½œ
å¦‚æžœ `auxiliary` ä»»åŠ¡ï¼ˆè§†è§‰ã€åŽ‹ç¼©ï¼‰é™é»˜å¤±è´¥ï¼Œ`auto` æä¾›å•†æ‰¾ä¸åˆ°åŽç«¯ã€‚è¯·è®¾ç½® `OPENROUTER_API_KEY` æˆ– `GOOGLE_API_KEY`ï¼Œæˆ–æ˜¾å¼é…ç½®æ¯ä¸ªè¾…åŠ©ä»»åŠ¡çš„æä¾›å•†ï¼š
```bash
zed config set auxiliary.vision.provider <your_provider>
zed config set auxiliary.vision.model <model_name>
```

---

## æŸ¥æ‰¾èµ„æº

| æŸ¥æ‰¾å†…å®¹... | ä½ç½® |
|----------------|----------|
| é…ç½®é€‰é¡¹ | `zed config edit` æˆ–[é…ç½®æ–‡æ¡£](https://zed-agent.zedteam.com/docs/user-guide/configuration) |
| å¯ç”¨å·¥å…· | `zed tools list` æˆ–[å·¥å…·å‚è€ƒ](https://zed-agent.zedteam.com/docs/reference/tools-reference) |
| æ–œæ å‘½ä»¤ | ä¼šè¯å†… `/help` æˆ–[æ–œæ å‘½ä»¤å‚è€ƒ](https://zed-agent.zedteam.com/docs/reference/slash-commands) |
| Skill ç›®å½• | `zed skills browse` æˆ–[Skill ç›®å½•](https://zed-agent.zedteam.com/docs/reference/skills-catalog) |
| æä¾›å•†è®¾ç½® | `zed model` æˆ–[æä¾›å•†æŒ‡å—](https://zed-agent.zedteam.com/docs/integrations/providers) |
| å¹³å°è®¾ç½® | `zed gateway setup` æˆ–[æ¶ˆæ¯æ–‡æ¡£](https://zed-agent.zedteam.com/docs/user-guide/messaging/) |
| MCP æœåŠ¡å™¨ | `zed mcp list` æˆ–[MCP æŒ‡å—](https://zed-agent.zedteam.com/docs/user-guide/features/mcp) |
| Profiles | `zed profile list` æˆ–[Profiles æ–‡æ¡£](https://zed-agent.zedteam.com/docs/user-guide/profiles) |
| Cron ä»»åŠ¡ | `zed cron list` æˆ–[Cron æ–‡æ¡£](https://zed-agent.zedteam.com/docs/user-guide/features/cron) |
| è®°å¿† | `zed memory status` æˆ–[è®°å¿†æ–‡æ¡£](https://zed-agent.zedteam.com/docs/user-guide/features/memory) |
| çŽ¯å¢ƒå˜é‡ | `zed config env-path` æˆ–[çŽ¯å¢ƒå˜é‡å‚è€ƒ](https://zed-agent.zedteam.com/docs/reference/environment-variables) |
| CLI å‘½ä»¤ | `zed --help` æˆ–[CLI å‚è€ƒ](https://zed-agent.zedteam.com/docs/reference/cli-commands) |
| Gateway æ—¥å¿— | `~/.zed/logs/gateway.log` |
| ä¼šè¯æ–‡ä»¶ | `~/.zed/sessions/` æˆ– `zed sessions browse` |
| æºä»£ç  | `~/.zed/zed-agent/` |

---

## è´¡çŒ®è€…å¿«é€Ÿå‚è€ƒ

é¢å‘å¶å°”è´¡çŒ®è€…å’Œ PR ä½œè€…ã€‚å®Œæ•´å¼€å‘è€…æ–‡æ¡£ï¼šhttps://zed-agent.zedteam.com/docs/developer-guide/

### é¡¹ç›®ç»“æž„

<!-- ascii-guard-ignore -->
```
zed-agent/
â”œâ”€â”€ run_agent.py          # AIAgent â€” core conversation loop
â”œâ”€â”€ model_tools.py        # Tool discovery and dispatch
â”œâ”€â”€ toolsets.py           # Toolset definitions
â”œâ”€â”€ cli.py                # Interactive CLI (ZedCLI)
â”œâ”€â”€ zed_state.py       # SQLite session store
â”œâ”€â”€ agent/                # Prompt builder, context compression, memory, model routing, credential pooling, skill dispatch
â”œâ”€â”€ zed_cli/           # CLI subcommands, config, setup, commands
â”‚   â”œâ”€â”€ commands.py       # Slash command registry (CommandDef)
â”‚   â”œâ”€â”€ config.py         # DEFAULT_CONFIG, env var definitions
â”‚   â””â”€â”€ main.py           # CLI entry point and argparse
â”œâ”€â”€ tools/                # One file per tool
â”‚   â””â”€â”€ registry.py       # Central tool registry
â”œâ”€â”€ gateway/              # Messaging gateway
â”‚   â””â”€â”€ platforms/        # Platform adapters (telegram, discord, etc.)
â”œâ”€â”€ cron/                 # Job scheduler
â”œâ”€â”€ tests/                # ~3000 pytest tests
â””â”€â”€ website/              # Docusaurus docs site
```
<!-- ascii-guard-ignore-end -->

é…ç½®ï¼š`~/.zed/config.yaml`ï¼ˆè®¾ç½®ï¼‰ã€`~/.zed/.env`ï¼ˆAPI keyï¼‰ã€‚

### æ·»åŠ å·¥å…·ï¼ˆ3 ä¸ªæ–‡ä»¶ï¼‰

**1. åˆ›å»º `tools/your_tool.py`ï¼š**
```python
import json, os
from tools.registry import registry

def check_requirements() -> bool:
    return bool(os.getenv("EXAMPLE_API_KEY"))

def example_tool(param: str, task_id: str = None) -> str:
    return json.dumps({"success": True, "data": "..."})

registry.register(
    name="example_tool",
    toolset="example",
    schema={"name": "example_tool", "description": "...", "parameters": {...}},
    handler=lambda args, **kw: example_tool(
        param=args.get("param", ""), task_id=kw.get("task_id")),
    check_fn=check_requirements,
    requires_env=["EXAMPLE_API_KEY"],
)
```

**2. æ·»åŠ åˆ° `toolsets.py`** â†’ `_ZED_CORE_TOOLS` åˆ—è¡¨ã€‚

è‡ªåŠ¨å‘çŽ°ï¼šä»»ä½•åŒ…å«é¡¶å±‚ `registry.register()` è°ƒç”¨çš„ `tools/*.py` æ–‡ä»¶éƒ½ä¼šè‡ªåŠ¨å¯¼å…¥â€”â€”æ— éœ€æ‰‹åŠ¨åˆ—å‡ºã€‚

æ‰€æœ‰å¤„ç†å™¨å¿…é¡»è¿”å›ž JSON å­—ç¬¦ä¸²ã€‚è·¯å¾„ä½¿ç”¨ `get_zed_home()`ï¼Œæ°¸è¿œä¸è¦ç¡¬ç¼–ç  `~/.zed`ã€‚

### æ·»åŠ æ–œæ å‘½ä»¤

1. åœ¨ `zed_cli/commands.py` çš„ `COMMAND_REGISTRY` ä¸­æ·»åŠ  `CommandDef`
2. åœ¨ `cli.py` â†’ `process_command()` ä¸­æ·»åŠ å¤„ç†å™¨
3. ï¼ˆå¯é€‰ï¼‰åœ¨ `gateway/run.py` ä¸­æ·»åŠ  gateway å¤„ç†å™¨

æ‰€æœ‰æ¶ˆè´¹æ–¹ï¼ˆå¸®åŠ©æ–‡æœ¬ã€è‡ªåŠ¨è¡¥å…¨ã€Telegram èœå•ã€Slack æ˜ å°„ï¼‰å‡è‡ªåŠ¨ä»Žä¸­å¤®æ³¨å†Œè¡¨æ´¾ç”Ÿã€‚

### Agent å¾ªçŽ¯ï¼ˆé«˜å±‚æ¦‚è¿°ï¼‰

```
run_conversation():
  1. Build system prompt
  2. Loop while iterations < max:
     a. Call LLM (OpenAI-format messages + tool schemas)
     b. If tool_calls â†’ dispatch each via handle_function_call() â†’ append results â†’ continue
     c. If text response â†’ return
  3. Context compression triggers automatically near token limit
```

### æµ‹è¯•

```bash
python -m pytest tests/ -o 'addopts=' -q   # å®Œæ•´å¥—ä»¶
python -m pytest tests/tools/ -q            # ç‰¹å®šåŒºåŸŸ
```

- æµ‹è¯•è‡ªåŠ¨å°† `ZED_HOME` é‡å®šå‘åˆ°ä¸´æ—¶ç›®å½•â€”â€”æ°¸è¿œä¸ä¼šè§¦åŠçœŸå®žçš„ `~/.zed/`
- æŽ¨é€ä»»ä½•å˜æ›´å‰è¿è¡Œå®Œæ•´å¥—ä»¶
- ä½¿ç”¨ `-o 'addopts='` æ¸…é™¤ä»»ä½•å†…ç½®çš„ pytest æ ‡å¿—

**Windows è´¡çŒ®è€…ï¼š** `scripts/run_tests.sh` ç›®å‰æŸ¥æ‰¾ POSIX venvï¼ˆ`.venv/bin/activate` / `venv/bin/activate`ï¼‰ï¼Œåœ¨ Windows ä¸Šä¼šæŠ¥é”™ï¼Œå› ä¸ºå¸ƒå±€æ˜¯ `venv/Scripts/activate` + `python.exe`ã€‚Zed å®‰è£…çš„ venv ä½äºŽ `venv/Scripts/`ï¼Œä¹Ÿæ²¡æœ‰ `pip` æˆ– `pytest`â€”â€”ä¸ºç»ˆç«¯ç”¨æˆ·å®‰è£…ä½“ç§¯è€Œç²¾ç®€ã€‚è§£å†³æ–¹æ¡ˆï¼šå°† pytest + pytest-xdist + pyyaml å®‰è£…åˆ°ç³»ç»Ÿ Python 3.11 ç”¨æˆ·ç«™ç‚¹ï¼ˆ`/c/Program Files/Python311/python -m pip install --user pytest pytest-xdist pyyaml`ï¼‰ï¼Œç„¶åŽç›´æŽ¥è¿è¡Œæµ‹è¯•ï¼š

```bash
export PYTHONPATH="$(pwd)"
"/c/Program Files/Python311/python" -m pytest tests/tools/test_foo.py -v --tb=short -n 0
```

ä½¿ç”¨ `-n 0`ï¼ˆè€Œéž `-n 4`ï¼‰ï¼Œå› ä¸º `pyproject.toml` çš„é»˜è®¤ `addopts` å·²åŒ…å« `-n`ï¼Œä¸” wrapper çš„ CI ä¸€è‡´æ€§ä¿è¯ä¸é€‚ç”¨äºŽéž POSIX çŽ¯å¢ƒã€‚

**è·¨å¹³å°æµ‹è¯•å®ˆå«ï¼š** ä½¿ç”¨ä»… POSIX ç³»ç»Ÿè°ƒç”¨çš„æµ‹è¯•éœ€è¦è·³è¿‡æ ‡è®°ã€‚ä»£ç åº“ä¸­å·²æœ‰çš„å¸¸è§æ ‡è®°ï¼š
- ç¬¦å·é“¾æŽ¥åˆ›å»º â†’ `@pytest.mark.skipif(sys.platform == "win32", reason="Symlinks require elevated privileges on Windows")`ï¼ˆå‚è§ `tests/cron/test_cron_script.py`ï¼‰
- POSIX æ–‡ä»¶æ¨¡å¼ï¼ˆ0o600 ç­‰ï¼‰â†’ `@pytest.mark.skipif(sys.platform.startswith("win"), reason="POSIX mode bits not enforced on Windows")`ï¼ˆå‚è§ `tests/zed_cli/test_auth_toctou_file_modes.py`ï¼‰
- `signal.SIGALRM` â†’ ä»… Unixï¼ˆå‚è§ `tests/conftest.py::_enforce_test_timeout`ï¼‰
- å®žæ—¶ Winsock / Windows ç‰¹æœ‰å›žå½’æµ‹è¯• â†’ `@pytest.mark.skipif(sys.platform != "win32", reason="Windows-specific regression")`

**ä»… monkeypatch `sys.platform` æ˜¯ä¸å¤Ÿçš„**ï¼Œå½“è¢«æµ‹ä»£ç è¿˜è°ƒç”¨ `platform.system()` / `platform.release()` / `platform.mac_ver()` æ—¶ã€‚è¿™äº›å‡½æ•°ç‹¬ç«‹é‡æ–°è¯»å–çœŸå®ž OSï¼Œå› æ­¤åœ¨ Windows runner ä¸Šå°† `sys.platform = "linux"` çš„æµ‹è¯•ä»ä¼šçœ‹åˆ° `platform.system() == "Windows"` å¹¶èµ° Windows åˆ†æ”¯ã€‚éœ€è¦åŒæ—¶ patch ä¸‰è€…ï¼š

```python
monkeypatch.setattr(sys, "platform", "linux")
monkeypatch.setattr(platform, "system", lambda: "Linux")
monkeypatch.setattr(platform, "release", lambda: "6.8.0-generic")
```

å‚è§ `tests/agent/test_prompt_builder.py::TestEnvironmentHints` ä¸­çš„å®Œæ•´ç¤ºä¾‹ã€‚

### æ‰©å±•ç³»ç»Ÿ prompt çš„æ‰§è¡ŒçŽ¯å¢ƒå—

å…³äºŽå®¿ä¸» OSã€ç”¨æˆ· homeã€cwdã€ç»ˆç«¯åŽç«¯å’Œ shellï¼ˆWindows ä¸Šçš„ bash vs PowerShellï¼‰çš„äº‹å®žæ€§æŒ‡å¯¼ä»Ž `agent/prompt_builder.py::build_environment_hints()` è¾“å‡ºã€‚WSL æç¤ºå’Œæ¯ä¸ªåŽç«¯çš„æŽ¢æµ‹é€»è¾‘ä¹Ÿåœ¨æ­¤å¤„ã€‚çº¦å®šï¼š

- **æœ¬åœ°ç»ˆç«¯åŽç«¯** â†’ è¾“å‡ºå®¿ä¸»ä¿¡æ¯ï¼ˆOSã€`$HOME`ã€cwdï¼‰+ Windows ç‰¹æœ‰è¯´æ˜Žï¼ˆhostname â‰  usernameï¼Œ`terminal` ä½¿ç”¨ bash è€Œéž PowerShellï¼‰ã€‚
- **è¿œç¨‹ç»ˆç«¯åŽç«¯**ï¼ˆ`_REMOTE_TERMINAL_BACKENDS` ä¸­çš„ä»»ä½•å†…å®¹ï¼š`docker, singularity, modal, daytona, ssh, managed_modal`ï¼‰â†’ **å®Œå…¨æŠ‘åˆ¶**å®¿ä¸»ä¿¡æ¯ï¼Œä»…æè¿°åŽç«¯ã€‚é€šè¿‡ `tools.environments.get_environment(...).execute(...)` åœ¨åŽç«¯å†…è¿è¡Œå®žæ—¶ `uname`/`whoami`/`pwd` æŽ¢æµ‹ï¼Œæ¯è¿›ç¨‹ç¼“å­˜åœ¨ `_BACKEND_PROBE_CACHE` ä¸­ï¼ŒæŽ¢æµ‹è¶…æ—¶æ—¶ä½¿ç”¨é™æ€å›žé€€ã€‚
- **prompt ç¼–å†™çš„å…³é”®äº‹å®žï¼š** å½“ `TERMINAL_ENV != "local"` æ—¶ï¼Œ*æ¯ä¸ª*æ–‡ä»¶å·¥å…·ï¼ˆ`read_file`ã€`write_file`ã€`patch`ã€`search_files`ï¼‰éƒ½åœ¨åŽç«¯å®¹å™¨å†…è¿è¡Œï¼Œè€Œéžå®¿ä¸»ä¸Šã€‚åœ¨è¿™ç§æƒ…å†µä¸‹ï¼Œç³»ç»Ÿ prompt ç»ä¸èƒ½æè¿°å®¿ä¸»â€”â€”agent æ— æ³•è®¿é—®å®ƒã€‚

å®Œæ•´è®¾è®¡è¯´æ˜Žã€ç¡®åˆ‡è¾“å‡ºå­—ç¬¦ä¸²å’Œæµ‹è¯•é™·é˜±ï¼š`references/prompt-builder-environment-hints.md`ã€‚

**é‡æž„å®‰å…¨æ¨¡å¼ï¼ˆPOSIX ç­‰ä»·å®ˆå«ï¼‰ï¼š** å½“ä½ å°†å†…è”é€»è¾‘æå–åˆ°æ·»åŠ  Windows/å¹³å°ç‰¹å®šè¡Œä¸ºçš„è¾…åŠ©å‡½æ•°æ—¶ï¼Œåœ¨æµ‹è¯•æ–‡ä»¶ä¸­ä¿ç•™ä¸€ä¸ª `_legacy_<name>` oracle å‡½æ•°ï¼Œå®ƒæ˜¯æ—§ä»£ç çš„é€å­—å‰¯æœ¬ï¼Œç„¶åŽå¯¹å…¶è¿›è¡Œå‚æ•°åŒ–å·®å¼‚æ¯”è¾ƒã€‚ç¤ºä¾‹ï¼š`tests/tools/test_code_execution_windows_env.py::TestPosixEquivalence`ã€‚è¿™é”å®šäº† POSIX è¡Œä¸ºé€ä½ç›¸åŒçš„ä¸å˜é‡ï¼Œå¹¶ä½¿ä»»ä½•æœªæ¥çš„åå·®ä»¥æ¸…æ™°çš„å·®å¼‚æ˜Žæ˜¾å¤±è´¥ã€‚

### æäº¤çº¦å®š

```
type: concise subject line

Optional body.
```

ç±»åž‹ï¼š`fix:`ã€`feat:`ã€`refactor:`ã€`docs:`ã€`chore:`

### å…³é”®è§„åˆ™

- **æ°¸è¿œä¸è¦ç ´å prompt ç¼“å­˜** â€” ä¸è¦åœ¨å¯¹è¯ä¸­é€”æ›´æ”¹ä¸Šä¸‹æ–‡ã€å·¥å…·æˆ–ç³»ç»Ÿ prompt
- **æ¶ˆæ¯è§’è‰²äº¤æ›¿** â€” æ°¸è¿œä¸è¦è¿žç»­å‡ºçŽ°ä¸¤æ¡ assistant æˆ–ä¸¤æ¡ user æ¶ˆæ¯
- æ‰€æœ‰è·¯å¾„ä½¿ç”¨ `zed_constants` ä¸­çš„ `get_zed_home()`ï¼ˆprofile å®‰å…¨ï¼‰
- é…ç½®å€¼æ”¾å…¥ `config.yaml`ï¼Œå¯†é’¥æ”¾å…¥ `.env`
- æ–°å·¥å…·éœ€è¦ `check_fn`ï¼Œä»¥ä¾¿ä»…åœ¨æ»¡è¶³è¦æ±‚æ—¶æ‰æ˜¾ç¤º
