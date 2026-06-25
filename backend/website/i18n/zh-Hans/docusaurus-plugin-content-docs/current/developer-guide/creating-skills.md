---
sidebar_position: 3
title: "åˆ›å»º Skill"
description: "å¦‚ä½•ä¸º Zed Agent åˆ›å»º skillâ€”â€”SKILL.md æ ¼å¼ã€è§„èŒƒä¸Žå‘å¸ƒ"
---

# åˆ›å»º Skill

Skill æ˜¯ä¸º Zed Agent æ·»åŠ æ–°èƒ½åŠ›çš„é¦–é€‰æ–¹å¼ã€‚ä¸Ž tool ç›¸æ¯”ï¼Œskill æ›´æ˜“äºŽåˆ›å»ºï¼Œæ— éœ€ä¿®æ”¹ agent ä»£ç ï¼Œä¸”å¯ä¸Žç¤¾åŒºå…±äº«ã€‚

## åº”è¯¥åˆ›å»º Skill è¿˜æ˜¯ Toolï¼Ÿ

ä»¥ä¸‹æƒ…å†µåˆ›å»º **Skill**ï¼š
- è¯¥èƒ½åŠ›å¯é€šè¿‡æŒ‡ä»¤ + shell å‘½ä»¤ + çŽ°æœ‰ tool æ¥å®žçŽ°
- å°è£…äº† agent å¯é€šè¿‡ `terminal` æˆ– `web_extract` è°ƒç”¨çš„å¤–éƒ¨ CLI æˆ– API
- ä¸éœ€è¦å°†è‡ªå®šä¹‰ Python é›†æˆæˆ– API key ç®¡ç†å†…ç½®åˆ° agent ä¸­
- ç¤ºä¾‹ï¼šarXiv æœç´¢ã€git å·¥ä½œæµã€Docker ç®¡ç†ã€PDF å¤„ç†ã€é€šè¿‡ CLI å·¥å…·å‘é€é‚®ä»¶

ä»¥ä¸‹æƒ…å†µåˆ›å»º **Tool**ï¼š
- éœ€è¦ä¸Ž API keyã€è®¤è¯æµç¨‹æˆ–å¤šç»„ä»¶é…ç½®è¿›è¡Œç«¯åˆ°ç«¯é›†æˆ
- éœ€è¦æ¯æ¬¡ç²¾ç¡®æ‰§è¡Œçš„è‡ªå®šä¹‰å¤„ç†é€»è¾‘
- å¤„ç†äºŒè¿›åˆ¶æ•°æ®ã€æµå¼ä¼ è¾“æˆ–å®žæ—¶äº‹ä»¶
- ç¤ºä¾‹ï¼šæµè§ˆå™¨è‡ªåŠ¨åŒ–ã€TTSã€è§†è§‰åˆ†æž

## Skill ç›®å½•ç»“æž„

å†…ç½® skill ä½äºŽ `skills/` ç›®å½•ä¸‹ï¼ŒæŒ‰ç±»åˆ«ç»„ç»‡ã€‚å®˜æ–¹å¯é€‰ skill åœ¨ `optional-skills/` ä¸­ä½¿ç”¨ç›¸åŒç»“æž„ï¼š

```text
skills/
â”œâ”€â”€ research/
â”‚   â””â”€â”€ arxiv/
â”‚       â”œâ”€â”€ SKILL.md              # å¿…éœ€ï¼šä¸»è¦æŒ‡ä»¤
â”‚       â””â”€â”€ scripts/              # å¯é€‰ï¼šè¾…åŠ©è„šæœ¬
â”‚           â””â”€â”€ search_arxiv.py
â”œâ”€â”€ productivity/
â”‚   â””â”€â”€ ocr-and-documents/
â”‚       â”œâ”€â”€ SKILL.md
â”‚       â”œâ”€â”€ scripts/
â”‚       â””â”€â”€ references/
â””â”€â”€ ...
```

## SKILL.md æ ¼å¼

```markdown
---
name: my-skill
description: Brief description (shown in skill search results)
version: 1.0.0
author: Your Name
license: MIT
platforms: [macos, linux]          # Optional â€” restrict to specific OS platforms
                                   #   Valid: macos, linux, windows
                                   #   Omit to load on all platforms (default)
metadata:
  zed:
    tags: [Category, Subcategory, Keywords]
    related_skills: [other-skill-name]
    requires_toolsets: [web]            # Optional â€” only show when these toolsets are active
    requires_tools: [web_search]        # Optional â€” only show when these tools are available
    fallback_for_toolsets: [browser]    # Optional â€” hide when these toolsets are active
    fallback_for_tools: [browser_navigate]  # Optional â€” hide when these tools exist
    config:                              # Optional â€” config.yaml settings the skill needs
      - key: my.setting
        description: "What this setting controls"
        default: "sensible-default"
        prompt: "Display prompt for setup"
required_environment_variables:          # Optional â€” env vars the skill needs
  - name: MY_API_KEY
    prompt: "Enter your API key"
    help: "Get one at https://example.com"
    required_for: "API access"
---

# Skill Title

Brief intro.

## When to Use
Trigger conditions â€” when should the agent load this skill?

## Quick Reference
Table of common commands or API calls.

## Procedure
Step-by-step instructions the agent follows.

## Pitfalls
Known failure modes and how to handle them.

## Verification
How the agent confirms it worked.
```

### å¹³å°ä¸“å±ž Skill

Skill å¯é€šè¿‡ `platforms` å­—æ®µå°†è‡ªèº«é™åˆ¶åœ¨ç‰¹å®šæ“ä½œç³»ç»Ÿä¸Šï¼š

```yaml
platforms: [macos]            # ä»… macOSï¼ˆä¾‹å¦‚ iMessageã€Apple Remindersï¼‰
platforms: [macos, linux]     # macOS å’Œ Linux
platforms: [windows]          # ä»… Windows
```

è®¾ç½®åŽï¼Œè¯¥ skill ä¼šåœ¨ä¸å…¼å®¹çš„å¹³å°ä¸Šè‡ªåŠ¨ä»Žç³»ç»Ÿ promptï¼ˆæç¤ºè¯ï¼‰ã€`skills_list()` å’Œæ–œæ å‘½ä»¤ä¸­éšè—ã€‚è‹¥çœç•¥æˆ–ç•™ç©ºï¼Œåˆ™åœ¨æ‰€æœ‰å¹³å°ä¸ŠåŠ è½½ï¼ˆå‘åŽå…¼å®¹ï¼‰ã€‚

### æ¡ä»¶å¼ Skill æ¿€æ´»

Skill å¯å£°æ˜Žå¯¹ç‰¹å®š tool æˆ– toolset çš„ä¾èµ–ï¼Œä»¥æŽ§åˆ¶è¯¥ skill æ˜¯å¦å‡ºçŽ°åœ¨å½“å‰ä¼šè¯çš„ç³»ç»Ÿ prompt ä¸­ã€‚

```yaml
metadata:
  zed:
    requires_toolsets: [web]           # è‹¥ web toolset æœªæ¿€æ´»åˆ™éšè—
    requires_tools: [web_search]       # è‹¥ web_search tool ä¸å¯ç”¨åˆ™éšè—
    fallback_for_toolsets: [browser]   # è‹¥ browser toolset å·²æ¿€æ´»åˆ™éšè—
    fallback_for_tools: [browser_navigate]  # è‹¥ browser_navigate å¯ç”¨åˆ™éšè—
```

| å­—æ®µ | è¡Œä¸º |
|-------|----------|
| `requires_toolsets` | å½“åˆ—å‡ºçš„**ä»»æ„** toolset **ä¸**å¯ç”¨æ—¶ï¼Œskill **éšè—** |
| `requires_tools` | å½“åˆ—å‡ºçš„**ä»»æ„** tool **ä¸**å¯ç”¨æ—¶ï¼Œskill **éšè—** |
| `fallback_for_toolsets` | å½“åˆ—å‡ºçš„**ä»»æ„** toolset **å·²**å¯ç”¨æ—¶ï¼Œskill **éšè—** |
| `fallback_for_tools` | å½“åˆ—å‡ºçš„**ä»»æ„** tool **å·²**å¯ç”¨æ—¶ï¼Œskill **éšè—** |

**`fallback_for_*` ä½¿ç”¨åœºæ™¯ï¼š** åˆ›å»ºä¸€ä¸ªåœ¨ä¸»è¦ tool ä¸å¯ç”¨æ—¶ä½œä¸ºæ›¿ä»£æ–¹æ¡ˆçš„ skillã€‚ä¾‹å¦‚ï¼Œå¸¦æœ‰ `fallback_for_tools: [web_search]` çš„ `duckduckgo-search` skill ä»…åœ¨æœªé…ç½®éœ€è¦ API key çš„ web search tool æ—¶æ˜¾ç¤ºã€‚

**`requires_*` ä½¿ç”¨åœºæ™¯ï¼š** åˆ›å»ºä»…åœ¨ç‰¹å®š tool å­˜åœ¨æ—¶æ‰æœ‰æ„ä¹‰çš„ skillã€‚ä¾‹å¦‚ï¼Œå¸¦æœ‰ `requires_toolsets: [web]` çš„ç½‘é¡µæŠ“å–å·¥ä½œæµ skill åœ¨ web tool è¢«ç¦ç”¨æ—¶ä¸ä¼šå‡ºçŽ°åœ¨ prompt ä¸­ã€‚

### çŽ¯å¢ƒå˜é‡è¦æ±‚

Skill å¯å£°æ˜Žæ‰€éœ€çš„çŽ¯å¢ƒå˜é‡ã€‚å½“é€šè¿‡ `skill_view` åŠ è½½ skill æ—¶ï¼Œå…¶æ‰€éœ€å˜é‡ä¼šè‡ªåŠ¨æ³¨å†Œï¼Œä»¥ä¾¿é€ä¼ ï¼ˆpassthroughï¼‰åˆ°æ²™ç®±æ‰§è¡ŒçŽ¯å¢ƒï¼ˆterminalã€execute_codeï¼‰ä¸­ã€‚

```yaml
required_environment_variables:
  - name: TENOR_API_KEY
    prompt: "Tenor API key"               # æç¤ºç”¨æˆ·æ—¶æ˜¾ç¤º
    help: "Get your key at https://tenor.com"  # å¸®åŠ©æ–‡æœ¬æˆ– URL
    required_for: "GIF search functionality"   # å“ªä¸ªåŠŸèƒ½éœ€è¦æ­¤å˜é‡
```

æ¯ä¸ªæ¡ç›®æ”¯æŒï¼š
- `name`ï¼ˆå¿…éœ€ï¼‰â€”â€”çŽ¯å¢ƒå˜é‡åç§°
- `prompt`ï¼ˆå¯é€‰ï¼‰â€”â€”å‘ç”¨æˆ·è¯¢é—®å€¼æ—¶çš„æç¤ºæ–‡æœ¬
- `help`ï¼ˆå¯é€‰ï¼‰â€”â€”èŽ·å–è¯¥å€¼çš„å¸®åŠ©æ–‡æœ¬æˆ– URL
- `required_for`ï¼ˆå¯é€‰ï¼‰â€”â€”æè¿°å“ªä¸ªåŠŸèƒ½éœ€è¦æ­¤å˜é‡

ç”¨æˆ·ä¹Ÿå¯åœ¨ `config.yaml` ä¸­æ‰‹åŠ¨é…ç½®é€ä¼ å˜é‡ï¼š

```yaml
terminal:
  env_passthrough:
    - MY_CUSTOM_VAR
    - ANOTHER_VAR
```

macOS ä¸“å±ž skill ç¤ºä¾‹è¯·å‚è§ `skills/apple/`ã€‚

## åŠ è½½æ—¶çš„å®‰å…¨é…ç½®

å½“ skill éœ€è¦ API key æˆ– token æ—¶ï¼Œä½¿ç”¨ `required_environment_variables`ã€‚ç¼ºå°‘å€¼**ä¸ä¼š**å°† skill ä»Žå‘çŽ°åˆ—è¡¨ä¸­éšè—ã€‚Zed ä¼šåœ¨æœ¬åœ° CLI åŠ è½½ skill æ—¶å®‰å…¨åœ°æç¤ºç”¨æˆ·è¾“å…¥ã€‚

```yaml
required_environment_variables:
  - name: TENOR_API_KEY
    prompt: Tenor API key
    help: Get a key from https://developers.google.com/tenor
    required_for: full functionality
```

ç”¨æˆ·å¯ä»¥è·³è¿‡é…ç½®å¹¶ç»§ç»­åŠ è½½ skillã€‚Zed ä¸ä¼šå°†åŽŸå§‹å¯†é’¥å€¼æš´éœ²ç»™æ¨¡åž‹ã€‚Gateway å’Œæ¶ˆæ¯ä¼šè¯ä¼šæ˜¾ç¤ºæœ¬åœ°é…ç½®æŒ‡å¼•ï¼Œè€Œä¸æ˜¯åœ¨å¸¦å†…æ”¶é›†å¯†é’¥ã€‚

:::tip æ²™ç®±é€ä¼ 
åŠ è½½ skill æ—¶ï¼Œå·²è®¾ç½®çš„ `required_environment_variables` ä¼š**è‡ªåŠ¨é€ä¼ **åˆ° `execute_code` å’Œ `terminal` æ²™ç®±â€”â€”åŒ…æ‹¬ Docker å’Œ Modal ç­‰è¿œç¨‹åŽç«¯ã€‚Skill çš„è„šæœ¬æ— éœ€ç”¨æˆ·é¢å¤–é…ç½®å³å¯è®¿é—® `$TENOR_API_KEY`ï¼ˆæˆ– Python ä¸­çš„ `os.environ["TENOR_API_KEY"]`ï¼‰ã€‚è¯¦è§ [çŽ¯å¢ƒå˜é‡é€ä¼ ](/user-guide/security#environment-variable-passthrough)ã€‚
:::

æ—§ç‰ˆ `prerequisites.env_vars` ä½œä¸ºå‘åŽå…¼å®¹çš„åˆ«åä»å—æ”¯æŒã€‚

### Config é…ç½®é¡¹ï¼ˆconfig.yamlï¼‰

Skill å¯å£°æ˜Žéžå¯†é’¥é…ç½®é¡¹ï¼Œè¿™äº›é…ç½®é¡¹å­˜å‚¨åœ¨ `config.yaml` çš„ `skills.config` å‘½åç©ºé—´ä¸‹ã€‚ä¸ŽçŽ¯å¢ƒå˜é‡ï¼ˆå­˜å‚¨å¯†é’¥ï¼‰ä¸åŒï¼Œconfig é…ç½®é¡¹ç”¨äºŽè·¯å¾„ã€åå¥½è®¾ç½®åŠå…¶ä»–éžæ•æ„Ÿå€¼ã€‚

```yaml
metadata:
  zed:
    config:
      - key: myplugin.path
        description: Path to the plugin data directory
        default: "~/myplugin-data"
        prompt: Plugin data directory path
      - key: myplugin.domain
        description: Domain the plugin operates on
        default: ""
        prompt: Plugin domain (e.g., AI/ML research)
```

æ¯ä¸ªæ¡ç›®æ”¯æŒï¼š
- `key`ï¼ˆå¿…éœ€ï¼‰â€”â€”é…ç½®é¡¹çš„ç‚¹è·¯å¾„ï¼ˆä¾‹å¦‚ `myplugin.path`ï¼‰
- `description`ï¼ˆå¿…éœ€ï¼‰â€”â€”è¯´æ˜Žè¯¥é…ç½®é¡¹çš„ä½œç”¨
- `default`ï¼ˆå¯é€‰ï¼‰â€”â€”ç”¨æˆ·æœªé…ç½®æ—¶çš„é»˜è®¤å€¼
- `prompt`ï¼ˆå¯é€‰ï¼‰â€”â€”`zed config migrate` æ—¶æ˜¾ç¤ºçš„æç¤ºæ–‡æœ¬ï¼›è‹¥æœªè®¾ç½®åˆ™å›žé€€åˆ° `description`

**å·¥ä½œåŽŸç†ï¼š**

1. **å­˜å‚¨ï¼š** å€¼å†™å…¥ `config.yaml` çš„ `skills.config.<key>` ä¸‹ï¼š
   ```yaml
   skills:
     config:
       myplugin:
         path: ~/my-data
   ```

2. **å‘çŽ°ï¼š** `zed config migrate` æ‰«ææ‰€æœ‰å·²å¯ç”¨çš„ skillï¼Œæ‰¾å‡ºæœªé…ç½®çš„é¡¹å¹¶æç¤ºç”¨æˆ·ã€‚é…ç½®é¡¹ä¹Ÿä¼šåœ¨ `zed config show` çš„"Skill Settings"éƒ¨åˆ†æ˜¾ç¤ºã€‚

3. **è¿è¡Œæ—¶æ³¨å…¥ï¼š** Skill åŠ è½½æ—¶ï¼Œå…¶ config å€¼ä¼šè¢«è§£æžå¹¶è¿½åŠ åˆ° skill æ¶ˆæ¯ä¸­ï¼š
   ```
   [Skill config (from ~/.zed/config.yaml):
     myplugin.path = /home/user/my-data
   ]
   ```
   Agent æ— éœ€è‡ªè¡Œè¯»å– `config.yaml` å³å¯çœ‹åˆ°å·²é…ç½®çš„å€¼ã€‚

4. **æ‰‹åŠ¨é…ç½®ï¼š** ç”¨æˆ·ä¹Ÿå¯ç›´æŽ¥è®¾ç½®å€¼ï¼š
   ```bash
   zed config set skills.config.myplugin.path ~/my-data
   ```

:::tip å¦‚ä½•é€‰æ‹©
å¯¹ API keyã€token åŠå…¶ä»–**å¯†é’¥**ä½¿ç”¨ `required_environment_variables`ï¼ˆå­˜å‚¨åœ¨ `~/.zed/.env`ï¼Œä¸å‘æ¨¡åž‹å±•ç¤ºï¼‰ã€‚å¯¹**è·¯å¾„ã€åå¥½è®¾ç½®åŠéžæ•æ„Ÿé…ç½®**ä½¿ç”¨ `config`ï¼ˆå­˜å‚¨åœ¨ `config.yaml`ï¼Œåœ¨ config show ä¸­å¯è§ï¼‰ã€‚
:::

### å‡­è¯æ–‡ä»¶è¦æ±‚ï¼ˆOAuth token ç­‰ï¼‰

ä½¿ç”¨ OAuth æˆ–åŸºäºŽæ–‡ä»¶çš„å‡­è¯çš„ skill å¯å£°æ˜Žéœ€è¦æŒ‚è½½åˆ°è¿œç¨‹æ²™ç®±çš„æ–‡ä»¶ã€‚è¿™é€‚ç”¨äºŽä»¥**æ–‡ä»¶**å½¢å¼å­˜å‚¨çš„å‡­è¯ï¼ˆè€ŒéžçŽ¯å¢ƒå˜é‡ï¼‰â€”â€”é€šå¸¸æ˜¯ç”±é…ç½®è„šæœ¬ç”Ÿæˆçš„ OAuth token æ–‡ä»¶ã€‚

```yaml
required_credential_files:
  - path: google_token.json
    description: Google OAuth2 token (created by setup script)
  - path: google_client_secret.json
    description: Google OAuth2 client credentials
```

æ¯ä¸ªæ¡ç›®æ”¯æŒï¼š
- `path`ï¼ˆå¿…éœ€ï¼‰â€”â€”ç›¸å¯¹äºŽ `~/.zed/` çš„æ–‡ä»¶è·¯å¾„
- `description`ï¼ˆå¯é€‰ï¼‰â€”â€”è¯´æ˜Žè¯¥æ–‡ä»¶çš„ç”¨é€”åŠåˆ›å»ºæ–¹å¼

åŠ è½½æ—¶ï¼ŒZed ä¼šæ£€æŸ¥è¿™äº›æ–‡ä»¶æ˜¯å¦å­˜åœ¨ã€‚ç¼ºå°‘æ–‡ä»¶ä¼šè§¦å‘ `setup_needed`ã€‚å·²å­˜åœ¨çš„æ–‡ä»¶ä¼šè‡ªåŠ¨ï¼š
- **æŒ‚è½½åˆ° Docker** å®¹å™¨ä¸­ä½œä¸ºåªè¯»ç»‘å®šæŒ‚è½½
- **åŒæ­¥åˆ° Modal** æ²™ç®±ï¼ˆåœ¨åˆ›å»ºæ—¶åŠæ¯æ¬¡å‘½ä»¤å‰åŒæ­¥ï¼Œå› æ­¤ä¼šè¯ä¸­é€”çš„ OAuth ä¹Ÿèƒ½æ­£å¸¸å·¥ä½œï¼‰
- åœ¨**æœ¬åœ°**åŽç«¯æ— éœ€ä»»ä½•ç‰¹æ®Šå¤„ç†å³å¯ä½¿ç”¨

:::tip å¦‚ä½•é€‰æ‹©
å¯¹ç®€å•çš„ API key å’Œ tokenï¼ˆå­˜å‚¨åœ¨ `~/.zed/.env` ä¸­çš„å­—ç¬¦ä¸²ï¼‰ä½¿ç”¨ `required_environment_variables`ã€‚å¯¹ OAuth token æ–‡ä»¶ã€å®¢æˆ·ç«¯å¯†é’¥ã€æœåŠ¡è´¦å· JSONã€è¯ä¹¦æˆ–ä»»ä½•ä»¥ç£ç›˜æ–‡ä»¶å½¢å¼å­˜åœ¨çš„å‡­è¯ä½¿ç”¨ `required_credential_files`ã€‚
:::

å®Œæ•´ç¤ºä¾‹è¯·å‚è§ `skills/productivity/google-workspace/SKILL.md`ï¼Œå…¶ä¸­åŒæ—¶ä½¿ç”¨äº†ä¸¤è€…ã€‚

## Skill è§„èŒƒ

### æ— å¤–éƒ¨ä¾èµ–

ä¼˜å…ˆä½¿ç”¨æ ‡å‡†åº“ Pythonã€curl ä»¥åŠçŽ°æœ‰ Zed toolï¼ˆ`web_extract`ã€`terminal`ã€`read_file`ï¼‰ã€‚è‹¥ç¡®å®žéœ€è¦ä¾èµ–é¡¹ï¼Œè¯·åœ¨ skill ä¸­è®°å½•å®‰è£…æ­¥éª¤ã€‚

### æ¸è¿›å¼æŠ«éœ²

å°†æœ€å¸¸è§çš„å·¥ä½œæµæ”¾åœ¨æœ€å‰é¢ã€‚è¾¹ç¼˜æƒ…å†µå’Œé«˜çº§ç”¨æ³•æ”¾åœ¨åº•éƒ¨ã€‚è¿™æ ·å¯ä»¥é™ä½Žå¸¸è§ä»»åŠ¡çš„ token æ¶ˆè€—ã€‚

### åŒ…å«è¾…åŠ©è„šæœ¬

å¯¹äºŽ XML/JSON è§£æžæˆ–å¤æ‚é€»è¾‘ï¼Œè¯·åœ¨ `scripts/` ä¸­åŒ…å«è¾…åŠ©è„šæœ¬â€”â€”ä¸è¦æ¯æ¬¡éƒ½æœŸæœ› LLM å†…è”ç¼–å†™è§£æžå™¨ã€‚

### ä»¥æ–‡æ¡£å½¢å¼ä¼ é€’åª’ä½“ï¼ˆ`[[as_document]]`ï¼‰

å¦‚æžœ skill ç”Ÿæˆé«˜åˆ†è¾¨çŽ‡æˆªå›¾ã€å›¾è¡¨æˆ–ä»»ä½•æœ‰æŸé¢„è§ˆåŽ‹ç¼©ä¼šé€ æˆæŸå¤±çš„å›¾ç‰‡ï¼Œè¯·åœ¨å“åº”ä¸­æŸå¤„ï¼ˆé€šå¸¸æ˜¯æœ€åŽä¸€è¡Œï¼‰è¾“å‡ºå­—é¢æŒ‡ä»¤ `[[as_document]]`ã€‚Gateway ä¼šåŽ»é™¤è¯¥æŒ‡ä»¤ï¼Œå¹¶å°†è¯¥å“åº”ä¸­æ‰€æœ‰æå–çš„åª’ä½“è·¯å¾„ä»¥å¯ä¸‹è½½æ–‡ä»¶é™„ä»¶çš„å½¢å¼ä¼ é€’ï¼Œè€Œéžå†…è”å›¾ç‰‡æ°”æ³¡ã€‚å®Œæ•´è¯­ä¹‰è¯·å‚è§ [Skill è¾“å‡ºä¸Žåª’ä½“ä¼ é€’](../user-guide/features/skills.md#skill-output-and-media-delivery)ã€‚

#### åœ¨ SKILL.md ä¸­å¼•ç”¨å†…ç½®è„šæœ¬

Skill åŠ è½½æ—¶ï¼Œæ¿€æ´»æ¶ˆæ¯ä¼šå°† skill ç›®å½•çš„ç»å¯¹è·¯å¾„ä»¥ `[Skill directory: /abs/path]` çš„å½¢å¼æš´éœ²ï¼ŒåŒæ—¶åœ¨ SKILL.md æ­£æ–‡ä¸­æ›¿æ¢ä¸¤ä¸ªæ¨¡æ¿ tokenï¼š

| Token | æ›¿æ¢ä¸º |
|---|---|
| `${ZED_SKILL_DIR}` | skill ç›®å½•çš„ç»å¯¹è·¯å¾„ |
| `${ZED_SESSION_ID}` | å½“å‰ä¼šè¯ IDï¼ˆè‹¥æ— ä¼šè¯åˆ™ä¿ç•™åŽŸæ ·ï¼‰ |

å› æ­¤ï¼ŒSKILL.md å¯ä»¥ç›´æŽ¥å‘ŠçŸ¥ agent è¿è¡Œå†…ç½®è„šæœ¬ï¼š

```markdown
To analyse the input, run:

    node ${ZED_SKILL_DIR}/scripts/analyse.js <input>
```

Agent çœ‹åˆ°æ›¿æ¢åŽçš„ç»å¯¹è·¯å¾„ï¼Œå¹¶ä½¿ç”¨ `terminal` tool æ‰§è¡Œå·²å°±ç»ªçš„å‘½ä»¤â€”â€”æ— éœ€è·¯å¾„è®¡ç®—ï¼Œæ— éœ€é¢å¤–çš„ `skill_view` å¾€è¿”ã€‚å¯åœ¨ `config.yaml` ä¸­è®¾ç½® `skills.template_vars: false` å…¨å±€ç¦ç”¨æ›¿æ¢ã€‚

#### å†…è” shell ç‰‡æ®µï¼ˆéœ€æ‰‹åŠ¨å¼€å¯ï¼‰

Skill ä¹Ÿå¯åœ¨ SKILL.md æ­£æ–‡ä¸­åµŒå…¥ä»¥ `` !`cmd` `` å½¢å¼ç¼–å†™çš„å†…è” shell ç‰‡æ®µã€‚å¯ç”¨åŽï¼Œæ¯ä¸ªç‰‡æ®µçš„ stdout ä¼šåœ¨ agent è¯»å–å‰å†…è”åˆ°æ¶ˆæ¯ä¸­ï¼Œä»Žè€Œè®© skill æ³¨å…¥åŠ¨æ€ä¸Šä¸‹æ–‡ï¼š

```markdown
Current date: !`date -u +%Y-%m-%d`
Git branch: !`git -C ${ZED_SKILL_DIR} rev-parse --abbrev-ref HEAD`
```

æ­¤åŠŸèƒ½**é»˜è®¤å…³é—­**â€”â€”SKILL.md ä¸­çš„ä»»ä½•ç‰‡æ®µéƒ½ä¼šåœ¨æœªç»å®¡æ‰¹çš„æƒ…å†µä¸‹åœ¨å®¿ä¸»æœºä¸Šè¿è¡Œï¼Œå› æ­¤ä»…å¯¹ä½ ä¿¡ä»»çš„ skill æ¥æºå¯ç”¨ï¼š

```yaml
# config.yaml
skills:
  inline_shell: true
  inline_shell_timeout: 10   # æ¯ä¸ªç‰‡æ®µçš„è¶…æ—¶ç§’æ•°
```

ç‰‡æ®µä»¥ skill ç›®å½•ä¸ºå·¥ä½œç›®å½•è¿è¡Œï¼Œè¾“å‡ºä¸Šé™ä¸º 4000 ä¸ªå­—ç¬¦ã€‚å¤±è´¥ï¼ˆè¶…æ—¶ã€éžé›¶é€€å‡ºï¼‰ä¼šæ˜¾ç¤ºä¸ºç®€çŸ­çš„ `[inline-shell error: ...]` æ ‡è®°ï¼Œè€Œä¸ä¼šå¯¼è‡´æ•´ä¸ª skill ä¸­æ–­ã€‚

### æµ‹è¯•

è¿è¡Œ skill å¹¶éªŒè¯ agent æ˜¯å¦æ­£ç¡®éµå¾ªæŒ‡ä»¤ï¼š

```bash
zed chat --toolsets skills -q "Use the X skill to do Y"
```

## Skill åº”æ”¾åœ¨å“ªé‡Œï¼Ÿ

å†…ç½® skillï¼ˆä½äºŽ `skills/`ï¼‰éšæ¯æ¬¡ Zed å®‰è£…ä¸€èµ·å‘å¸ƒï¼Œåº”å¯¹**å¤§å¤šæ•°ç”¨æˆ·å¹¿æ³›æœ‰ç”¨**ï¼š

- æ–‡æ¡£å¤„ç†ã€ç½‘é¡µç ”ç©¶ã€å¸¸è§å¼€å‘å·¥ä½œæµã€ç³»ç»Ÿç®¡ç†
- è¢«å¹¿æ³›äººç¾¤å®šæœŸä½¿ç”¨

å¦‚æžœä½ çš„ skill æ˜¯å®˜æ–¹çš„ä¸”æœ‰ç”¨ï¼Œä½†å¹¶éžæ‰€æœ‰äººéƒ½éœ€è¦ï¼ˆä¾‹å¦‚ä»˜è´¹æœåŠ¡é›†æˆã€é‡é‡çº§ä¾èµ–ï¼‰ï¼Œè¯·æ”¾å…¥ **`optional-skills/`**â€”â€”å®ƒéšä»“åº“ä¸€èµ·å‘å¸ƒï¼Œå¯é€šè¿‡ `zed skills browse` å‘çŽ°ï¼ˆæ ‡è®°ä¸º"official"ï¼‰ï¼Œå¹¶ä»¥å†…ç½®ä¿¡ä»»çº§åˆ«å®‰è£…ã€‚

å¦‚æžœä½ çš„ skill æ˜¯ä¸“ä¸šåŒ–çš„ã€ç¤¾åŒºè´¡çŒ®çš„æˆ–å°ä¼—çš„ï¼Œæ›´é€‚åˆæ”¾åœ¨ **Skills Hub**â€”â€”å°†å…¶ä¸Šä¼ åˆ°æ³¨å†Œè¡¨å¹¶é€šè¿‡ `zed skills install` åˆ†äº«ã€‚

## å‘å¸ƒ Skill

### å‘å¸ƒåˆ° Skills Hub

```bash
zed skills publish skills/my-skill --to github --repo owner/repo
```

### å‘å¸ƒåˆ°è‡ªå®šä¹‰ä»“åº“

å°†ä½ çš„ä»“åº“æ·»åŠ ä¸º tapï¼š

```bash
zed skills tap add owner/repo
```

ç”¨æˆ·éšåŽå¯ä»Žä½ çš„ä»“åº“æœç´¢å¹¶å®‰è£…ã€‚

## å®‰å…¨æ‰«æ

æ‰€æœ‰ä»Ž hub å®‰è£…çš„ skill éƒ½ä¼šç»è¿‡å®‰å…¨æ‰«æå™¨æ£€æŸ¥ï¼š

- æ•°æ®æ³„éœ²æ¨¡å¼
- Prompt æ³¨å…¥å°è¯•
- ç ´åæ€§å‘½ä»¤
- Shell æ³¨å…¥

ä¿¡ä»»çº§åˆ«ï¼š
- `builtin`â€”â€”éš Zed ä¸€èµ·å‘å¸ƒï¼ˆå§‹ç»ˆå—ä¿¡ä»»ï¼‰
- `official`â€”â€”æ¥è‡ªä»“åº“ä¸­çš„ `optional-skills/`ï¼ˆå†…ç½®ä¿¡ä»»ï¼Œæ— ç¬¬ä¸‰æ–¹è­¦å‘Šï¼‰
- `trusted`â€”â€”æ¥è‡ª openai/skillsã€anthropics/skillsã€huggingface/skills
- `community`â€”â€”éžå±é™©å‘çŽ°å¯é€šè¿‡ `--force` è¦†ç›–ï¼›`dangerous` åˆ¤å®šä»ä¼šè¢«é˜»æ­¢

Zed çŽ°åœ¨å¯ä»¥é€šè¿‡å¤šç§å¤–éƒ¨å‘çŽ°æ¨¡åž‹ä½¿ç”¨ç¬¬ä¸‰æ–¹ skillï¼š
- ç›´æŽ¥ GitHub æ ‡è¯†ç¬¦ï¼ˆä¾‹å¦‚ `openai/skills/k8s`ï¼‰
- `skills.sh` æ ‡è¯†ç¬¦ï¼ˆä¾‹å¦‚ `skills-sh/vercel-labs/json-render/json-render-react`ï¼‰
- ä»Ž `/.well-known/skills/index.json` æä¾›çš„çŸ¥åç«¯ç‚¹

å¦‚æžœä½ å¸Œæœ› skill æ— éœ€ GitHub ä¸“å±žå®‰è£…å™¨å³å¯è¢«å‘çŽ°ï¼Œé™¤äº†åœ¨ä»“åº“æˆ–å¸‚åœºä¸­å‘å¸ƒå¤–ï¼Œè¿˜å¯ä»¥è€ƒè™‘é€šè¿‡çŸ¥åç«¯ç‚¹æä¾›æœåŠ¡ã€‚