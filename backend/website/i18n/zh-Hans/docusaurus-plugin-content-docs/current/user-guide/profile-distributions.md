---
sidebar_position: 3
---

# Profile åˆ†å‘ï¼šå…±äº«å®Œæ•´ Agent

**Profile åˆ†å‘**å°†ä¸€ä¸ªå®Œæ•´çš„ Zed agentâ€”â€”ä¸ªæ€§ã€æŠ€èƒ½ã€cron ä»»åŠ¡ã€MCP è¿žæŽ¥ã€é…ç½®â€”â€”æ‰“åŒ…ä¸ºä¸€ä¸ª git ä»“åº“ã€‚ä»»ä½•æœ‰æƒè®¿é—®è¯¥ä»“åº“çš„äººéƒ½å¯ä»¥ç”¨ä¸€æ¡å‘½ä»¤å®‰è£…æ•´ä¸ª agentï¼Œå°±åœ°æ›´æ–°ï¼Œå¹¶ä¿æŒè‡ªå·±çš„è®°å¿†ã€ä¼šè¯å’Œ API å¯†é’¥ä¸å—å½±å“ã€‚

å¦‚æžœè¯´ [profile](./profiles.md) æ˜¯æœ¬åœ° agentï¼Œé‚£ä¹ˆåˆ†å‘å°±æ˜¯è®©è¯¥ agent å¯å…±äº«çš„å½¢å¼ã€‚

## è¿™æ„å‘³ç€ä»€ä¹ˆ

åœ¨åˆ†å‘åŠŸèƒ½å‡ºçŽ°ä¹‹å‰ï¼Œå…±äº«ä¸€ä¸ª Zed agent æ„å‘³ç€è¦å‘é€ï¼š

1. ä½ çš„ SOUL.md
2. éœ€è¦å®‰è£…çš„æŠ€èƒ½åˆ—è¡¨
3. åŽ»æŽ‰å¯†é’¥çš„ config.yaml
4. æŽ¥å…¥äº†å“ªäº› MCP æœåŠ¡å™¨çš„è¯´æ˜Ž
5. ä½ è®¾ç½®çš„æ‰€æœ‰ cron ä»»åŠ¡
6. éœ€è¦è®¾ç½®å“ªäº›çŽ¯å¢ƒå˜é‡çš„è¯´æ˜Ž

â€¦â€¦ç„¶åŽç¥ˆç¥·å¯¹æ–¹èƒ½æ­£ç¡®ç»„è£…ã€‚æ¯æ¬¡ç‰ˆæœ¬å‡çº§æˆ–ä¿®å¤ bug éƒ½æ„å‘³ç€é‡å¤è¿™ä¸€è¿‡ç¨‹ã€‚

æœ‰äº†åˆ†å‘åŠŸèƒ½ï¼Œè¿™ä¸€åˆ‡éƒ½å­˜æ”¾åœ¨ä¸€ä¸ª git ä»“åº“ä¸­ï¼š

```
my-research-agent/
â”œâ”€â”€ distribution.yaml    # manifest: name, version, env-var requirements
â”œâ”€â”€ SOUL.md              # the agent's personality / system prompt
â”œâ”€â”€ config.yaml          # model, temperature, reasoning, tool defaults
â”œâ”€â”€ skills/              # bundled skills that come with the agent
â”œâ”€â”€ cron/                # scheduled tasks the agent runs
â””â”€â”€ mcp.json             # MCP servers the agent connects to
```

æŽ¥æ”¶æ–¹è¿è¡Œï¼š

```bash
zed profile install github.com/you/my-research-agent --alias
```

â€¦â€¦ä»–ä»¬å°±æ‹¥æœ‰äº†å®Œæ•´çš„ agentã€‚å¡«å…¥è‡ªå·±çš„ API å¯†é’¥ï¼ˆ`.env.EXAMPLE` â†’ `.env`ï¼‰ï¼Œå³å¯è¿è¡Œ `my-research-agent chat`ï¼Œæˆ–é€šè¿‡ Telegram / Discord / Slack / ä»»ä½• gateway å¹³å°ä¸Žå…¶äº¤äº’ã€‚å½“ä½ æŽ¨é€æ–°ç‰ˆæœ¬æ—¶ï¼Œä»–ä»¬è¿è¡Œ `zed profile update my-research-agent` å³å¯æ‹‰å–ä½ çš„æ›´æ”¹â€”â€”ä»–ä»¬çš„è®°å¿†å’Œä¼šè¯ä¿æŒä¸å˜ã€‚

## ä¸ºä»€ä¹ˆé€‰æ‹© gitï¼Ÿ

æˆ‘ä»¬è€ƒè™‘è¿‡ tarballã€HTTP å½’æ¡£ã€è‡ªå®šä¹‰æ ¼å¼ï¼Œä½†éƒ½æ¯”ä¸ä¸Š gitï¼š

- **ä½œè€…æ— éœ€æž„å»ºæ­¥éª¤ã€‚** æŽ¨é€åˆ° GitHubï¼Œç”¨æˆ·å³å¯å®‰è£…ã€‚æ²¡æœ‰"æ‰“åŒ…ã€ä¸Šä¼ ã€æ›´æ–°ç´¢å¼•"çš„å¾ªçŽ¯ã€‚
- **æ ‡ç­¾ã€åˆ†æ”¯å’Œæäº¤æœ¬èº«å°±æ˜¯ç‰ˆæœ¬ç®¡ç†ç³»ç»Ÿã€‚** æŽ¨é€ä¸€ä¸ª tag å°±èƒ½å®Œæˆå…¶ä»–å·¥å…·éœ€è¦"æ‰“åŒ… + ä¸Šä¼ å‘å¸ƒ"æ‰èƒ½åšåˆ°çš„äº‹ã€‚
- **æ›´æ–°åªéœ€ fetchã€‚** ä¸éœ€è¦é‡æ–°ä¸‹è½½æ•´ä¸ªå½’æ¡£ã€‚
- **é€æ˜Žã€‚** ç”¨æˆ·å¯ä»¥æµè§ˆä»“åº“ã€é˜…è¯»ç‰ˆæœ¬é—´çš„ diffã€æ issueã€fork åŽè‡ªå®šä¹‰ã€‚
- **ç§æœ‰ä»“åº“å¼€ç®±å³ç”¨ã€‚** SSH å¯†é’¥ã€`git credential` helperã€GitHub CLI å­˜å‚¨çš„å‡­æ®â€”â€”ç»ˆç«¯å·²é…ç½®å¥½çš„ä»»ä½•è®¤è¯æ–¹å¼éƒ½èƒ½é€æ˜Žç”Ÿæ•ˆã€‚
- **å¯å¤çŽ°æ€§å³ commit SHAã€‚** ä¸Ž pip å’Œ npm çš„è®°å½•æ–¹å¼ç›¸åŒã€‚

æƒè¡¡ä¹‹å¤„ï¼šæŽ¥æ”¶æ–¹éœ€è¦å®‰è£… gitã€‚åœ¨ 2026 å¹´è¿è¡Œ Zed çš„ä»»ä½•æœºå™¨ä¸Šï¼Œè¿™å·²æ˜¯æ—¢æˆäº‹å®žã€‚

## ä»€ä¹ˆæ—¶å€™åº”è¯¥ä½¿ç”¨åˆ†å‘ï¼Ÿ

é€‚åˆçš„åœºæ™¯ï¼š

- **ä½ è¦å…±äº«ä¸€ä¸ªä¸“ç”¨ agent**â€”â€”åˆè§„ç›‘æŽ§å™¨ã€ä»£ç å®¡æŸ¥å‘˜ã€ç ”ç©¶åŠ©æ‰‹ã€å®¢æœæœºå™¨äººâ€”â€”ç»™å›¢é˜Ÿæˆ–ç¤¾åŒºã€‚
- **ä½ è¦å°†åŒä¸€ä¸ª agent éƒ¨ç½²åˆ°å¤šå°æœºå™¨**ï¼Œä¸æƒ³æ¯æ¬¡æ‰‹åŠ¨å¤åˆ¶æ–‡ä»¶ã€‚
- **ä½ åœ¨è¿­ä»£ä¸€ä¸ª agent**ï¼Œå¸Œæœ›æŽ¥æ”¶æ–¹ç”¨ä¸€æ¡å‘½ä»¤å°±èƒ½èŽ·å–æ–°ç‰ˆæœ¬ã€‚
- **ä½ åœ¨å°† agent ä½œä¸ºäº§å“æž„å»º**â€”â€”æœ‰ä¸»è§çš„é»˜è®¤é…ç½®ã€ç²¾é€‰æŠ€èƒ½ã€è°ƒä¼˜çš„ promptï¼ˆæç¤ºè¯ï¼‰â€”â€”ä¾›ä»–äººä½œä¸ºèµ·ç‚¹ä½¿ç”¨ã€‚

ä¸é€‚åˆçš„åœºæ™¯ï¼š

- **ä½ åªæƒ³åœ¨è‡ªå·±çš„æœºå™¨ä¸Šå¤‡ä»½ä¸€ä¸ª profileã€‚** ä½¿ç”¨ [`zed profile export` / `import`](../reference/profile-commands.md#zed-profile-export)â€”â€”é‚£æ­£æ˜¯è¿™ä¸¤ä¸ªå‘½ä»¤çš„ç”¨é€”ã€‚
- **ä½ æƒ³éš agent ä¸€èµ·å…±äº« API å¯†é’¥ã€‚** `auth.json` å’Œ `.env` è¢«åˆ»æ„æŽ’é™¤åœ¨åˆ†å‘ä¹‹å¤–ã€‚æ¯ä¸ªå®‰è£…è€…ä½¿ç”¨è‡ªå·±çš„å‡­æ®ã€‚
- **ä½ æƒ³å…±äº«è®°å¿† / ä¼šè¯ / å¯¹è¯åŽ†å²ã€‚** è¿™äº›æ˜¯ç”¨æˆ·æ•°æ®ï¼Œä¸æ˜¯åˆ†å‘å†…å®¹ï¼Œæ°¸è¿œä¸ä¼šè¢«å‘é€ã€‚

## ç”Ÿå‘½å‘¨æœŸï¼šä»Žä½œè€…åˆ°å®‰è£…è€…å†åˆ°æ›´æ–°

ä»¥ä¸‹æ˜¯å®Œæ•´çš„ç«¯åˆ°ç«¯æµç¨‹ï¼Œé€‰æ‹©ä½ å…³å¿ƒçš„ä¸€ä¾§é˜…è¯»ã€‚

---

## ä½œè€…ç¯‡ï¼šå‘å¸ƒåˆ†å‘

### ç¬¬ä¸€æ­¥â€”â€”ä»Žä¸€ä¸ªå¯ç”¨çš„ profile å¼€å§‹

åƒæž„å»ºå…¶ä»– profile ä¸€æ ·æž„å»ºå¹¶æ‰“ç£¨ agentï¼š

```bash
zed profile create research-bot
research-bot setup                    # configure model, API keys
# Edit ~/.zed/profiles/research-bot/SOUL.md
# Install skills, wire up MCP servers, schedule cron jobs, etc.
research-bot chat                     # dogfood until it feels right
```

### ç¬¬äºŒæ­¥â€”â€”æ·»åŠ  `distribution.yaml`

åˆ›å»º `~/.zed/profiles/research-bot/distribution.yaml`ï¼š

```yaml
name: research-bot
version: 1.0.0
description: "Autonomous research assistant with arXiv and web tools"
zed_requires: ">=0.12.0"
author: "Your Name"
license: "MIT"

# Tell installers which env vars the agent needs. These are checked against
# the installer's shell and existing .env file so they don't get nagged
# about keys they already have configured.
env_requires:
  - name: OPENAI_API_KEY
    description: "OpenAI API key (for model access)"
    required: true
  - name: SERPAPI_KEY
    description: "SerpAPI key for web search"
    required: false
    default: ""
```

è¿™å°±æ˜¯å®Œæ•´çš„ manifestã€‚é™¤ `name` å¤–ï¼Œæ¯ä¸ªå­—æ®µéƒ½æœ‰åˆç†çš„é»˜è®¤å€¼ã€‚

### ç¬¬ä¸‰æ­¥â€”â€”æŽ¨é€åˆ° git ä»“åº“

```bash
cd ~/.zed/profiles/research-bot
git init
git add .
git commit -m "v1.0.0"
git remote add origin git@github.com:you/research-bot.git
git tag v1.0.0
git push -u origin main --tags
```

è¯¥ä»“åº“çŽ°åœ¨å°±æ˜¯ä¸€ä¸ªåˆ†å‘ã€‚ä»»ä½•æœ‰è®¿é—®æƒé™çš„äººéƒ½å¯ä»¥å®‰è£…å®ƒã€‚

:::note
git ä»“åº“åŒ…å« **profile ç›®å½•ä¸­é™¤å·²ä»Žåˆ†å‘ä¸­æŽ’é™¤çš„å†…å®¹ä¹‹å¤–çš„æ‰€æœ‰å†…å®¹**ï¼š`auth.json`ã€`.env`ã€`memories/`ã€`sessions/`ã€`state.db*`ã€`logs/`ã€`workspace/`ã€`*_cache/`ã€`local/`ã€‚è¿™äº›æ–‡ä»¶ä¿ç•™åœ¨ä½ çš„æœºå™¨ä¸Šã€‚ä½ ä¹Ÿå¯ä»¥æ·»åŠ  `.gitignore` æ¥æŽ’é™¤å…¶ä»–è·¯å¾„ã€‚
:::

### ç¬¬å››æ­¥â€”â€”ä¸ºç‰ˆæœ¬å‘å¸ƒæ‰“æ ‡ç­¾

æ¯å½“ agent è¾¾åˆ°ç¨³å®šçŠ¶æ€æ—¶ï¼Œå‡çº§ç‰ˆæœ¬å·å¹¶æ‰“æ ‡ç­¾ï¼š

```bash
# Edit distribution.yaml: version: 1.1.0
git add distribution.yaml SOUL.md skills/
git commit -m "v1.1.0: tighter research SOUL, add arxiv skill"
git tag v1.1.0
git push --tags
```

è¿è¡Œ `zed profile update research-bot` çš„æŽ¥æ”¶æ–¹å°†æ‹‰å–æœ€æ–°ç‰ˆæœ¬ã€‚

### ä»“åº“ç»“æž„ç¤ºä¾‹

ä¸€ä¸ªå®Œæ•´çš„åˆ†å‘ä»“åº“ï¼š

```
research-bot/
â”œâ”€â”€ distribution.yaml            # required
â”œâ”€â”€ SOUL.md                      # strongly recommended
â”œâ”€â”€ config.yaml                  # model, provider, tool defaults
â”œâ”€â”€ mcp.json                     # MCP server connections
â”œâ”€â”€ skills/
â”‚   â”œâ”€â”€ arxiv-search/SKILL.md
â”‚   â”œâ”€â”€ paper-summarization/SKILL.md
â”‚   â””â”€â”€ citation-lookup/SKILL.md
â”œâ”€â”€ cron/
â”‚   â””â”€â”€ weekly-digest.json       # scheduled tasks
â””â”€â”€ README.md                    # human-facing description (optional)
```

### åˆ†å‘æ‰€æœ‰æƒ vs ç”¨æˆ·æ‰€æœ‰æƒ

å½“å®‰è£…è€…æ›´æ–°åˆ°æ–°ç‰ˆæœ¬æ—¶ï¼ŒæŸäº›å†…å®¹ä¼šè¢«æ›¿æ¢ï¼ˆä½œè€…çš„é¢†åŸŸï¼‰ï¼ŒæŸäº›å†…å®¹ä¿æŒä¸å˜ï¼ˆå®‰è£…è€…çš„é¢†åŸŸï¼‰ã€‚é»˜è®¤è§„åˆ™ï¼š

| ç±»åˆ« | è·¯å¾„ | æ›´æ–°æ—¶ |
|---|---|---|
| **åˆ†å‘æ‰€æœ‰** | `SOUL.md`ã€`config.yaml`ã€`mcp.json`ã€`skills/`ã€`cron/`ã€`distribution.yaml` | ä»Žæ–°å…‹éš†ä¸­æ›¿æ¢ |
| **é…ç½®è¦†ç›–** | `config.yaml` | é»˜è®¤å®žé™…ä¿ç•™â€”â€”å®‰è£…è€…å¯èƒ½å·²è°ƒæ•´æ¨¡åž‹æˆ– providerã€‚æ›´æ–°æ—¶ä¼ å…¥ `--force-config` å¯é‡ç½®ã€‚ |
| **ç”¨æˆ·æ‰€æœ‰** | `memories/`ã€`sessions/`ã€`state.db*`ã€`auth.json`ã€`.env`ã€`logs/`ã€`workspace/`ã€`plans/`ã€`home/`ã€`*_cache/`ã€`local/` | æ°¸ä¸è§¦ç¢° |

ä½ å¯ä»¥åœ¨ manifest ä¸­è¦†ç›–åˆ†å‘æ‰€æœ‰åˆ—è¡¨ï¼š

```yaml
distribution_owned:
  - SOUL.md
  - skills/research/            # only my research skills; other installed skills stay
  - cron/digest.json
```

çœç•¥æ—¶ï¼Œä¸Šè¿°é»˜è®¤è§„åˆ™ç”Ÿæ•ˆâ€”â€”å¤§å¤šæ•°åˆ†å‘éƒ½é€‚ç”¨ã€‚

---

## å®‰è£…è€…ç¯‡ï¼šä½¿ç”¨åˆ†å‘

### å®‰è£…

```bash
zed profile install github.com/you/research-bot --alias
```

æ‰§è¡Œè¿‡ç¨‹ï¼š

1. å°†ä»“åº“å…‹éš†åˆ°ä¸´æ—¶ç›®å½•ã€‚
2. è¯»å– `distribution.yaml`ï¼Œæ˜¾ç¤º manifestï¼ˆåç§°ã€ç‰ˆæœ¬ã€æè¿°ã€ä½œè€…ã€æ‰€éœ€çŽ¯å¢ƒå˜é‡ï¼‰ã€‚
3. å¯¹ç…§ä½ çš„ shell çŽ¯å¢ƒå’Œç›®æ ‡ profile çŽ°æœ‰çš„ `.env` æ£€æŸ¥æ¯ä¸ªå¿…éœ€çš„çŽ¯å¢ƒå˜é‡ï¼Œæ ‡è®°ä¸º `âœ“ set` æˆ– `needs setting`ï¼Œè®©ä½ æ¸…æ¥šéœ€è¦é…ç½®å“ªäº›å†…å®¹ã€‚
4. è¯·æ±‚ç¡®è®¤ã€‚ä¼ å…¥ `-y` / `--yes` å¯è·³è¿‡ã€‚
5. å°†åˆ†å‘æ‰€æœ‰çš„æ–‡ä»¶å¤åˆ¶åˆ° `~/.zed/profiles/research-bot/`ï¼ˆæˆ– manifest ä¸­ `name` è§£æžåˆ°çš„ä½ç½®ï¼‰ã€‚
6. å†™å…¥ `.env.EXAMPLE`ï¼Œå…¶ä¸­æ‰€éœ€å¯†é’¥ä»¥æ³¨é‡Šå½¢å¼åˆ—å‡ºâ€”â€”å¤åˆ¶ä¸º `.env` å¹¶å¡«å…¥ã€‚
7. ä½¿ç”¨ `--alias` æ—¶ï¼Œåˆ›å»ºä¸€ä¸ª wrapperï¼Œä½¿ä½ å¯ä»¥ç›´æŽ¥è¿è¡Œ `research-bot chat`ã€‚

### æ¥æºç±»åž‹

ä»»ä½• git URL å‡å¯ä½¿ç”¨ï¼š

```bash
# GitHub shorthand
zed profile install github.com/you/research-bot

# Full HTTPS
zed profile install https://github.com/you/research-bot.git

# SSH
zed profile install git@github.com:you/research-bot.git

# Self-hosted, GitLab, Gitea, Forgejo â€” any Git host
zed profile install https://git.example.com/team/research-bot.git

# Private repo using your configured git auth
zed profile install git@github.com:your-org/internal-bot.git

# Local directory during development (no git push needed)
zed profile install ~/my-profile-in-progress/
```

### è¦†ç›– profile åç§°

ä¸¤ä¸ªç”¨æˆ·å¸Œæœ›ä»¥ä¸åŒçš„ profile åç§°ä½¿ç”¨åŒä¸€ä¸ªåˆ†å‘ï¼š

```bash
# Alice
zed profile install github.com/acme/support-bot --name support-us --alias
# Bobï¼ˆåŒä¸€åˆ†å‘ï¼Œä¸åŒæœ¬åœ°åç§°ï¼‰
zed profile install github.com/acme/support-bot --name support-eu --alias
```

### å¡«å†™çŽ¯å¢ƒå˜é‡

å®‰è£…åŽï¼Œagent çš„ profile ä¸­åŒ…å«ä¸€ä¸ª `.env.EXAMPLE`ï¼š

```
# Environment variables required by this Zed distribution.
# Copy to `.env` and fill in your own values before running.

# OpenAI API key (for model access)
# (required)
OPENAI_API_KEY=

# SerpAPI key for web search
# (optional)
# SERPAPI_KEY=
```

å¤åˆ¶å®ƒï¼š

```bash
cp ~/.zed/profiles/research-bot/.env.EXAMPLE ~/.zed/profiles/research-bot/.env
# Edit .env, paste your real keys
```

å·²åœ¨ä½ çš„ shell çŽ¯å¢ƒä¸­å­˜åœ¨çš„å¿…éœ€å¯†é’¥ï¼ˆä¾‹å¦‚åœ¨ `~/.zshrc` ä¸­ export çš„ `OPENAI_API_KEY`ï¼‰åœ¨å®‰è£…æ—¶ä¼šè¢«æ ‡è®°ä¸º `âœ“ set`â€”â€”æ— éœ€åœ¨ `.env` ä¸­é‡å¤å¡«å†™ã€‚

### æŸ¥çœ‹å·²å®‰è£…å†…å®¹

```bash
zed profile info research-bot
```

æ˜¾ç¤ºï¼š

```
Distribution: research-bot
Version:      1.0.0
Description:  Autonomous research assistant with arXiv and web tools
Author:       Your Name
Requires:     Zed >=0.12.0
Source:       https://github.com/you/research-bot
Installed:    2026-05-08T17:04:32+00:00

Environment variables:
  OPENAI_API_KEY (required) â€” OpenAI API key (for model access)
  SERPAPI_KEY (optional) â€” SerpAPI key for web search
```

`zed profile list` è¿˜ä¼šæ˜¾ç¤º `Distribution` åˆ—ï¼Œè®©ä½ ä¸€çœ¼çœ‹å‡ºå“ªäº› profile æ¥è‡ªä»“åº“ï¼Œå“ªäº›æ˜¯æ‰‹åŠ¨æž„å»ºçš„ï¼š

```
 Profile          Model                        Gateway      Alias        Distribution
 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 â—†default         claude-sonnet-4              stopped      â€”            â€”
  coder           gpt-5                        stopped      coder        â€”
  research-bot    claude-opus-4                stopped      research-bot research-bot@1.0.0
  telemetry       claude-sonnet-4              running      telemetry    telemetry@2.3.1
```

### æ›´æ–°

```bash
zed profile update research-bot
```

æ‰§è¡Œè¿‡ç¨‹ï¼š

1. ä»Žè®°å½•çš„æ¥æº URL é‡æ–°å…‹éš†ä»“åº“ã€‚
2. æ›¿æ¢åˆ†å‘æ‰€æœ‰çš„æ–‡ä»¶ï¼ˆSOULã€skillsã€cronã€mcp.jsonï¼‰ã€‚
3. **ä¿ç•™**ä½ çš„ `config.yaml`â€”â€”ä½ å¯èƒ½å·²è°ƒæ•´äº†æ¨¡åž‹ã€temperature æˆ–å…¶ä»–è®¾ç½®ã€‚ä¼ å…¥ `--force-config` å¯è¦†ç›–ã€‚
4. **æ°¸ä¸è§¦ç¢°**ç”¨æˆ·æ•°æ®ï¼šè®°å¿†ã€ä¼šè¯ã€authã€`.env`ã€æ—¥å¿—ã€stateã€‚

ä¸éœ€è¦é‡æ–°ä¸‹è½½æ•´ä¸ªå½’æ¡£ï¼Œä¸ä¼šè¦†ç›–ä½ å¯¹é…ç½®çš„æœ¬åœ°ä¿®æ”¹ï¼Œä¸ä¼šåˆ é™¤ä½ çš„å¯¹è¯åŽ†å²ã€‚

### åˆ é™¤

```bash
zed profile delete research-bot
```

åˆ é™¤ç¡®è®¤æç¤ºä¼šåœ¨è¦æ±‚ä½ ç¡®è®¤ä¹‹å‰æ˜¾ç¤ºåˆ†å‘ä¿¡æ¯ï¼š

```
Profile: research-bot
Path:    ~/.zed/profiles/research-bot
Model:   claude-opus-4 (anthropic)
Skills:  12
Distribution: research-bot@1.0.0
Installed from: https://github.com/you/research-bot

This will permanently delete:
  â€¢ All config, API keys, memories, sessions, skills, cron jobs
  â€¢ Command alias (~/.local/bin/research-bot)

Type 'research-bot' to confirm:
```

è¿™æ ·ä½ å°±ä¸ä¼šåœ¨ä¸çŸ¥é“ agent æ¥æºæˆ–æ— æ³•é‡æ–°å®‰è£…çš„æƒ…å†µä¸‹æ„å¤–åˆ é™¤å®ƒã€‚

---

## ä½¿ç”¨åœºæ™¯ä¸Žæ¨¡å¼

### ä¸ªäººï¼šè·¨æœºå™¨åŒæ­¥åŒä¸€ä¸ª agent

ä½ åœ¨ç¬”è®°æœ¬ä¸Šæž„å»ºäº†ä¸€ä¸ªç ”ç©¶åŠ©æ‰‹ï¼Œæƒ³åœ¨å·¥ä½œç«™ä¸Šä½¿ç”¨åŒä¸€ä¸ª agentã€‚

```bash
# ç¬”è®°æœ¬
cd ~/.zed/profiles/research-bot
git init && git add . && git commit -m "initial"
git remote add origin git@github.com:you/research-bot.git
git push -u origin main

# å·¥ä½œç«™
zed profile install github.com/you/research-bot --alias
# å¡«å†™ .envï¼Œå®Œæˆã€‚
```

åœ¨ç¬”è®°æœ¬ä¸Šçš„ä»»ä½•è¿­ä»£ï¼ˆ`git commit && push`ï¼‰éƒ½å¯ä»¥é€šè¿‡ `zed profile update research-bot` åŒæ­¥åˆ°å·¥ä½œç«™ã€‚è®°å¿†æŒ‰æœºå™¨ç‹¬ç«‹ä¿å­˜â€”â€”ç¬”è®°æœ¬è®°ä½è‡ªå·±çš„å¯¹è¯ï¼Œå·¥ä½œç«™è®°ä½è‡ªå·±çš„ï¼Œäº’ä¸å¹²æ‰°ã€‚

### å›¢é˜Ÿï¼šå‘å¸ƒç»è¿‡å®¡æ ¸çš„å†…éƒ¨ agent

ä½ çš„å·¥ç¨‹å›¢é˜Ÿéœ€è¦ä¸€ä¸ªå…±äº«çš„ PR å®¡æŸ¥æœºå™¨äººï¼Œå…·æœ‰ç‰¹å®šçš„ SOULã€ç‰¹å®šçš„æŠ€èƒ½ï¼Œä»¥åŠä¸€ä¸ªå¯¹æ¯ä¸ª PR è¿è¡Œå®¡æŸ¥çš„ cron ä»»åŠ¡ã€‚

```bash
# å·¥ç¨‹è´Ÿè´£äºº
cd ~/.zed/profiles/pr-reviewer
# ... build and tune ...
git init && git add . && git commit -m "v1.0 PR reviewer"
git tag v1.0.0
git push -u origin main --tags    # push to your company's internal Git host

# æ¯ä½å·¥ç¨‹å¸ˆ
zed profile install git@github.com:your-org/pr-reviewer.git --alias
# å¡«å†™ .envï¼Œä½¿ç”¨è‡ªå·±çš„ API å¯†é’¥ï¼ˆè´¹ç”¨ç”±è‡ªå·±æ‰¿æ‹…ï¼‰ï¼Œ.env.EXAMPLE æŒ‡æ˜Žäº†æ‰€éœ€å†…å®¹
pr-reviewer chat
```

å½“è´Ÿè´£äººå‘å¸ƒ v1.1ï¼ˆæ›´å¥½çš„ SOULã€æ–°æŠ€èƒ½ï¼‰æ—¶ï¼Œå·¥ç¨‹å¸ˆè¿è¡Œ `zed profile update pr-reviewer`ï¼Œæ‰€æœ‰äººåœ¨å‡ åˆ†é’Ÿå†…å°±èƒ½ç”¨ä¸Šæ–°ç‰ˆæœ¬ã€‚

### ç¤¾åŒºï¼šå‘å¸ƒå…¬å¼€ agent

ä½ æž„å»ºäº†ä¸€äº›æ–°é¢–çš„ä¸œè¥¿â€”â€”ä¹Ÿè®¸æ˜¯"Polymarket äº¤æ˜“å‘˜"ã€"å­¦æœ¯è®ºæ–‡æ‘˜è¦å™¨"æˆ–"Minecraft æœåŠ¡å™¨è¿ç»´åŠ©æ‰‹"ã€‚ä½ æƒ³åˆ†äº«å®ƒã€‚

```bash
# ä½ 
cd ~/.zed/profiles/polymarket-trader
# åœ¨ä»“åº“æ ¹ç›®å½•å†™ä¸€ä¸ªå®Œæ•´çš„ README.mdâ€”â€”GitHub ä¼šåœ¨ä»“åº“é¡µé¢å±•ç¤ºå®ƒ
git init && git add . && git commit -m "v1.0"
git tag v1.0.0
# å‘å¸ƒåˆ°å…¬å¼€ GitHub ä»“åº“
git remote add origin https://github.com/you/zed-polymarket-trader.git
git push -u origin main --tags

# ä»»ä½•äºº
zed profile install github.com/you/zed-polymarket-trader --alias
```

å‘æŽ¨åˆ†äº«å®‰è£…å‘½ä»¤ã€‚å°è¯•çš„äººä¼šç»™ä½ æ issue å’Œ PRã€‚æƒ³è¦è‡ªå®šä¹‰çš„äººå¯ä»¥ forkâ€”â€”ä¸Žå¤§å®¶å·²ç†Ÿæ‚‰çš„ git å·¥ä½œæµå®Œå…¨ç›¸åŒã€‚

### äº§å“ï¼šå‘å¸ƒæœ‰ä¸»è§çš„ agent

ä½ åœ¨ Zed ä¹‹ä¸Šæž„å»ºäº†äº§å“â€”â€”ä¹Ÿè®¸æ˜¯åˆè§„ç›‘æŽ§æ¡†æž¶ã€å®¢æœæŠ€æœ¯æ ˆã€ç‰¹å®šé¢†åŸŸçš„ç ”ç©¶å¹³å°ã€‚ä½ æƒ³ä»¥äº§å“å½¢å¼åˆ†å‘å®ƒã€‚

```yaml
# distribution.yaml
name: telemetry-harness
version: 2.3.1
description: "Compliance telemetry harness â€” monitors and reviews regulated workflows"
zed_requires: ">=0.13.0"
author: "Acme Compliance Inc."
license: "Commercial"

env_requires:
  - name: ACME_API_KEY
    description: "Your Acme Compliance license key (email support@acme.com)"
    required: true
  - name: OPENAI_API_KEY
    description: "OpenAI API key for model access"
    required: true
  - name: GRAPHITI_MCP_URL
    description: "URL for your Graphiti knowledge graph instance"
    required: false
    default: "http://127.0.0.1:8000/sse"
```

ä½ çš„å®¢æˆ·é€šè¿‡ä¸€æ¡å‘½ä»¤å®Œæˆå®‰è£…ï¼›å®‰è£…é¢„è§ˆä¼šå‘Šè¯‰ä»–ä»¬éœ€è¦å‡†å¤‡å“ªäº›å¯†é’¥ï¼›ä½ æ‰“ä¸Šæ–° tag çš„é‚£ä¸€åˆ»æ›´æ–°å°±èƒ½æŽ¨å‡ºï¼›ä»–ä»¬çš„åˆè§„æ•°æ®ï¼ˆ`memories/`ã€`sessions/`ï¼‰æ°¸è¿œä¸ä¼šç¦»å¼€ä»–ä»¬çš„æœºå™¨ã€‚

### ä¸´æ—¶ï¼šåœ¨å…±äº«åŸºç¡€è®¾æ–½ä¸Šè¿è¡Œä¸€æ¬¡æ€§è„šæœ¬

ä½ æ˜¯è¿ç»´è´Ÿè´£äººï¼Œéœ€è¦ä¸€ä¸ªä¸´æ—¶ agent æ¥è¯Šæ–­ç”Ÿäº§äº‹æ•…â€”â€”ä¸€ä¸ªé¢„è®¾å¥½ SOULã€é…å¤‡æ­£ç¡®å·¥å…·å’Œ MCP è¿žæŽ¥çš„ agentâ€”â€”åœ¨ä¸‰ä½å€¼ç­å·¥ç¨‹å¸ˆçš„ç¬”è®°æœ¬ä¸Šè¿è¡Œä¸€å‘¨ã€‚

```bash
# ä½ 
# æž„å»º profileï¼Œæäº¤ï¼ŒæŽ¨é€åˆ°ç§æœ‰ä»“åº“
git push -u origin main

# æ¯ä½å€¼ç­äººå‘˜
zed profile install git@github.com:your-org/incident-2026-q2.git --alias

# äº‹æ•…è§£å†³â€”â€”æ¸…ç†
zed profile delete incident-2026-q2
```

å®‰è£…-åˆ é™¤çš„æˆæœ¬è¶³å¤Ÿä½Žï¼Œå¯ä»¥å½“ä½œä¸€æ¬¡æ€§å·¥å…·ä½¿ç”¨ã€‚

---

## å®žç”¨æŠ€å·§

### å›ºå®šåˆ°ç‰¹å®šç‰ˆæœ¬

:::note
Git ref å›ºå®šï¼ˆ`#v1.2.0`ï¼‰å·²åœ¨è§„åˆ’ä¸­ï¼Œä½†ä¸åœ¨åˆå§‹ç‰ˆæœ¬ä¸­â€”â€”ç›®å‰å®‰è£…æ—¶è·Ÿè¸ªé»˜è®¤åˆ†æ”¯ã€‚é€šè¿‡ `zed profile info <name>` æŸ¥çœ‹å·²å®‰è£…ç‰ˆæœ¬ï¼Œåœ¨å‡†å¤‡å¥½ä¹‹å‰æš‚ç¼“æ›´æ–°ã€‚
:::

### æŸ¥çœ‹å½“å‰ç‰ˆæœ¬ä¸Žæœ€æ–°ç‰ˆæœ¬

```bash
# ä½ å·²å®‰è£…çš„ç‰ˆæœ¬
zed profile info research-bot | grep Version

# ä¸Šæ¸¸æœ€æ–°ç‰ˆæœ¬ï¼ˆä¸å®‰è£…ï¼‰
git ls-remote --tags https://github.com/you/research-bot | tail -5
```

### åœ¨æ›´æ–°æ—¶ä¿ç•™æœ¬åœ°é…ç½®è‡ªå®šä¹‰

é»˜è®¤çš„æ›´æ–°è¡Œä¸ºå·²ç»åšåˆ°è¿™ä¸€ç‚¹ï¼š`config.yaml` ä¼šè¢«ä¿ç•™ã€‚ä¸ºäº†å®‰å…¨èµ·è§ï¼Œå°†æœ¬åœ°è°ƒæ•´å†™å…¥åˆ†å‘ä¸æ‹¥æœ‰çš„æ–‡ä»¶ï¼š

```yaml
# ~/.zed/profiles/research-bot/local/my-overrides.yaml
# (distribution never touches local/)
```

â€¦â€¦å¹¶åœ¨ `config.yaml` æˆ– SOUL ä¸­æŒ‰éœ€å¼•ç”¨ã€‚

### å¼ºåˆ¶å…¨æ–°é‡è£…

```bash
# å½»åº•åˆ é™¤å¹¶é‡æ–°å®‰è£…ï¼ˆè®°å¿†/ä¼šè¯ä¹Ÿä¼šä¸¢å¤±ï¼‰
zed profile delete research-bot --yes
zed profile install github.com/you/research-bot --alias

# æ›´æ–°åˆ°å½“å‰ mainï¼Œä½†å°† config.yaml é‡ç½®ä¸ºåˆ†å‘é»˜è®¤å€¼
zed profile update research-bot --force-config --yes
```

### Fork å¹¶è‡ªå®šä¹‰

æ ‡å‡† git å·¥ä½œæµâ€”â€”åˆ†å‘å°±æ˜¯ä»“åº“ï¼š

```bash
# åœ¨ GitHub ä¸Š fork ä»“åº“ï¼Œç„¶åŽå®‰è£…ä½ çš„ fork
zed profile install github.com/yourname/forked-research-bot --alias

# åœ¨ ~/.zed/profiles/forked-research-bot/ ä¸­æœ¬åœ°è¿­ä»£
# ç¼–è¾‘ SOUL.mdï¼Œæäº¤ï¼ŒæŽ¨é€åˆ°ä½ çš„ fork
# ä¸Šæ¸¸å˜æ›´ï¼šç”¨å¸¸è§„æ–¹å¼åˆå¹¶åˆ°ä½ çš„ fork
```

### æŽ¨é€å‰æµ‹è¯•åˆ†å‘

åœ¨ä½œè€…æœºå™¨ä¸Šï¼š

```bash
# ä»Žæœ¬åœ°ç›®å½•å®‰è£…ï¼ˆæ— éœ€ git pushï¼‰
zed profile install ~/.zed/profiles/research-bot --name research-bot-test --alias

# è°ƒæ•´ã€åˆ é™¤ã€é‡æ–°å®‰è£…ï¼Œç›´åˆ°æ»¡æ„
zed profile delete research-bot-test --yes
zed profile install ~/.zed/profiles/research-bot --name research-bot-test
```

---

## åˆ†å‘ä¸­æ°¸è¿œä¸åŒ…å«çš„å†…å®¹

å³ä½¿ä½œè€…ä¸å°å¿ƒå°†ä»¥ä¸‹è·¯å¾„æäº¤åˆ°ä»“åº“ï¼Œå®‰è£…å™¨ä¹Ÿä¼šç¡¬æ€§æŽ’é™¤å®ƒä»¬ã€‚æ²¡æœ‰ä»»ä½•é…ç½®é€‰é¡¹å¯ä»¥è¦†ç›–æ­¤è¡Œä¸ºâ€”â€”è¿™æ˜¯ç»è¿‡å›žå½’æµ‹è¯•çš„ä¸å˜é‡ï¼š

- `auth.json` â€” OAuth tokenã€å¹³å°å‡­æ®
- `.env` â€” API å¯†é’¥ã€å¯†é’¥ä¿¡æ¯
- `memories/` â€” å¯¹è¯è®°å¿†
- `sessions/` â€” å¯¹è¯åŽ†å²
- `state.db`ã€`state.db-shm`ã€`state.db-wal` â€” ä¼šè¯å…ƒæ•°æ®
- `logs/` â€” agent å’Œé”™è¯¯æ—¥å¿—
- `workspace/` â€” ç”Ÿæˆçš„å·¥ä½œæ–‡ä»¶
- `plans/` â€” è‰ç¨¿è®¡åˆ’
- `home/` â€” Docker åŽç«¯ä¸­ç”¨æˆ·çš„ home æŒ‚è½½
- `*_cache/` â€” å›¾ç‰‡ / éŸ³é¢‘ / æ–‡æ¡£ç¼“å­˜
- `local/` â€” ç”¨æˆ·ä¿ç•™çš„è‡ªå®šä¹‰å‘½åç©ºé—´

å…‹éš†åˆ†å‘æ—¶ï¼Œè¿™äº›å†…å®¹æ ¹æœ¬ä¸å­˜åœ¨ã€‚æ›´æ–°æ—¶ï¼Œå®ƒä»¬ä¿æŒåŽŸæ ·ã€‚å¦‚æžœä½ åœ¨äº”å°æœºå™¨ä¸Šå®‰è£…äº†åŒä¸€ä¸ªåˆ†å‘ï¼Œä½ å°±æ‹¥æœ‰äº”å¥—ç‹¬ç«‹çš„æ­¤ç±»æ•°æ®â€”â€”æ¯å°æœºå™¨å„ä¸€ä»½ã€‚

## å®‰å…¨ä¸Žä¿¡ä»»

Profile åˆ†å‘é»˜è®¤ä¸å¸¦ç­¾åã€‚ä½ ä¿¡ä»»çš„æ˜¯ï¼š

- **git æ‰˜ç®¡å¹³å°**ï¼ˆGitHub / GitLab / å…¶ä»–å¹³å°ï¼‰èƒ½å¤Ÿæä¾›ä½œè€…æŽ¨é€çš„åŽŸå§‹å†…å®¹ã€‚
- **ä½œè€…**ä¸ä¼šå‘å¸ƒæ¶æ„çš„ SOULã€æŠ€èƒ½æˆ– cron ä»»åŠ¡ã€‚

æ¥è‡ªåˆ†å‘çš„ cron ä»»åŠ¡**ä¸ä¼šè‡ªåŠ¨è°ƒåº¦**â€”â€”å®‰è£…å™¨ä¼šæ‰“å° `zed -p <name> cron list`ï¼Œä½ éœ€è¦æ˜¾å¼å¯ç”¨å®ƒä»¬ã€‚SOUL.md å’ŒæŠ€èƒ½åœ¨ä½ å¼€å§‹ä¸Ž profile å¯¹è¯åŽç«‹å³ç”Ÿæ•ˆï¼Œå› æ­¤å¦‚æžœä½ ä»Žä¸ç†Ÿæ‚‰çš„æ¥æºå®‰è£…ï¼Œè¯·åœ¨ç¬¬ä¸€æ¬¡è¿è¡Œå‰é˜…è¯»å®ƒä»¬ã€‚

ç²—ç•¥ç±»æ¯”ï¼šå®‰è£…åˆ†å‘å°±åƒå®‰è£…æµè§ˆå™¨æ‰©å±•æˆ– VS Code æ‰©å±•ã€‚ä½Žæ‘©æ“¦ã€é«˜æƒé™ï¼Œä¿¡ä»»æ¥æºã€‚å¯¹äºŽå…¬å¸å†…éƒ¨åˆ†å‘ï¼Œä½¿ç”¨ç§æœ‰ä»“åº“å’Œä½ çŽ°æœ‰çš„ git è®¤è¯â€”â€”æ— éœ€é¢å¤–é…ç½®ã€‚

æœªæ¥ç‰ˆæœ¬å¯èƒ½ä¼šæ·»åŠ ç­¾åã€å¸¦æœ‰å·²è§£æž commit SHA çš„ lockfileï¼ˆ`.distribution-lock.yaml`ï¼‰ï¼Œä»¥åŠåœ¨åº”ç”¨æ›´æ–°å‰æ‰“å° diff çš„ `--dry-run` æ ‡å¿—ã€‚è¿™äº›åŠŸèƒ½ç›®å‰å°šæœªå‘å¸ƒã€‚

## åº•å±‚å®žçŽ°

æœ‰å…³å®žçŽ°ç»†èŠ‚ã€ç²¾ç¡®çš„ CLI è¡Œä¸ºå’Œæ‰€æœ‰æ ‡å¿—ï¼Œè¯·å‚é˜… [Profile å‘½ä»¤å‚è€ƒ](../reference/profile-commands.md#distribution-commands)ã€‚

ç®€è¦è¯´æ˜Žï¼š

- `install`ã€`update`ã€`info` ä½äºŽ `zed profile` ä¸‹â€”â€”ä¸æ˜¯ç‹¬ç«‹çš„å‘½ä»¤æ ‘ã€‚
- manifest æ ¼å¼ä¸º YAMLï¼Œschema æžç®€ï¼ˆä»… `name` ä¸ºå¿…å¡«ï¼‰ã€‚
- å®‰è£…å™¨ä½¿ç”¨ä½ æœ¬åœ°çš„ `git` äºŒè¿›åˆ¶æ–‡ä»¶è¿›è¡Œå…‹éš†ï¼Œå› æ­¤ shell å·²å¤„ç†çš„ä»»ä½•è®¤è¯ï¼ˆSSH å¯†é’¥ã€credential helperï¼‰éƒ½èƒ½é€æ˜Žç”Ÿæ•ˆã€‚
- å…‹éš†å®ŒæˆåŽï¼Œ`.git/` ä¼šè¢«å‰¥ç¦»â€”â€”å·²å®‰è£…çš„ profile æœ¬èº«ä¸æ˜¯ git checkoutï¼Œé¿å…äº†"ä¸å°å¿ƒå°† `.env` æäº¤åˆ°åˆ†å‘ git åŽ†å²"çš„é™·é˜±ã€‚
- ä¿ç•™çš„ profile åç§°ï¼ˆ`zed`ã€`test`ã€`tmp`ã€`root`ã€`sudo`ï¼‰åœ¨å®‰è£…æ—¶ä¼šè¢«æ‹’ç»ï¼Œä»¥é¿å…ä¸Žå¸¸è§äºŒè¿›åˆ¶æ–‡ä»¶å†²çªã€‚

## å¦è¯·å‚é˜…

- [Profilesï¼šè¿è¡Œå¤šä¸ª Agent](./profiles.md) â€” åŸºç¡€æ¦‚å¿µ
- [Profile å‘½ä»¤å‚è€ƒ](../reference/profile-commands.md) â€” æ¯ä¸ªæ ‡å¿—ã€æ¯ä¸ªé€‰é¡¹
- [`zed profile export` / `import`](../reference/profile-commands.md#zed-profile-export) â€” æœ¬åœ°å¤‡ä»½ / æ¢å¤ï¼ˆéžåˆ†å‘ï¼‰
- [åœ¨ Zed ä¸­ä½¿ç”¨ SOUL](../guides/use-soul-with-zed.md) â€” ç¼–å†™ä¸ªæ€§
- [ä¸ªæ€§ä¸Ž SOUL](./features/personality.md) â€” SOUL åœ¨ agent ä¸­çš„ä½œç”¨
- [æŠ€èƒ½ç›®å½•](../reference/skills-catalog.md) â€” å¯æ‰“åŒ…çš„æŠ€èƒ½
