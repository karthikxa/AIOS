---
sidebar_position: 2
title: "Skills ç³»ç»Ÿ"
description: "æŒ‰éœ€åŠ è½½çš„çŸ¥è¯†æ–‡æ¡£â€”â€”æ¸è¿›å¼æŠ«éœ²ã€agent ç®¡ç†çš„ skills ä»¥åŠ Skills Hub"
---

# Skills ç³»ç»Ÿ

Skills æ˜¯ agent åœ¨éœ€è¦æ—¶å¯ä»¥åŠ è½½çš„æŒ‰éœ€çŸ¥è¯†æ–‡æ¡£ã€‚å®ƒä»¬éµå¾ª**æ¸è¿›å¼æŠ«éœ²**ï¼ˆprogressive disclosureï¼‰æ¨¡å¼ä»¥æœ€å°åŒ– token ç”¨é‡ï¼Œå¹¶å…¼å®¹ [agentskills.io](https://agentskills.io/specification) å¼€æ”¾æ ‡å‡†ã€‚

æ‰€æœ‰ skills å­˜æ”¾åœ¨ **`~/.zed/skills/`** ä¸­â€”â€”è¿™æ˜¯ä¸»ç›®å½•å’Œå”¯ä¸€å¯ä¿¡æ¥æºã€‚å…¨æ–°å®‰è£…æ—¶ï¼Œæ†ç»‘çš„ skills ä¼šä»Žä»“åº“å¤åˆ¶è¿‡æ¥ã€‚é€šè¿‡ Hub å®‰è£…å’Œ agent åˆ›å»ºçš„ skills ä¹Ÿå­˜æ”¾åœ¨æ­¤å¤„ã€‚agent å¯ä»¥ä¿®æ”¹æˆ–åˆ é™¤ä»»ä½• skillã€‚

ä½ ä¹Ÿå¯ä»¥è®© Zed æŒ‡å‘**å¤–éƒ¨ skill ç›®å½•**â€”â€”ä¸Žæœ¬åœ°ç›®å½•ä¸€èµ·æ‰«æçš„é¢å¤–æ–‡ä»¶å¤¹ã€‚å‚è§ä¸‹æ–¹çš„[å¤–éƒ¨ Skill ç›®å½•](#external-skill-directories)ã€‚

å¦è¯·å‚é˜…ï¼š

- [æ†ç»‘ Skills ç›®å½•](/reference/skills-catalog)
- [å®˜æ–¹å¯é€‰ Skills ç›®å½•](/reference/optional-skills-catalog)

## ä½¿ç”¨ Skills

æ¯ä¸ªå·²å®‰è£…çš„ skill éƒ½ä¼šè‡ªåŠ¨ä½œä¸ºæ–œæ å‘½ä»¤å¯ç”¨ï¼š

```bash
# åœ¨ CLI æˆ–ä»»ä½•æ¶ˆæ¯å¹³å°ä¸­ï¼š
/gif-search funny cats
/axolotl help me fine-tune Llama 3 on my dataset
/github-pr-workflow create a PR for the auth refactor
/plan design a rollout for migrating our auth provider

# åªè¾“å…¥ skill åç§°å³å¯åŠ è½½å®ƒï¼Œå¹¶è®© agent è¯¢é—®ä½ çš„éœ€æ±‚ï¼š
/excalidraw
```

æ†ç»‘çš„ `plan` skill æ˜¯ä¸€ä¸ªå¾ˆå¥½çš„ç¤ºä¾‹ã€‚è¿è¡Œ `/plan [request]` ä¼šåŠ è½½è¯¥ skill çš„æŒ‡ä»¤ï¼Œå‘ŠçŸ¥ Zed åœ¨éœ€è¦æ—¶æ£€æŸ¥ä¸Šä¸‹æ–‡ã€ç¼–å†™ markdown å®žçŽ°è®¡åˆ’è€Œéžç›´æŽ¥æ‰§è¡Œä»»åŠ¡ï¼Œå¹¶å°†ç»“æžœä¿å­˜åœ¨ç›¸å¯¹äºŽå½“å‰å·¥ä½œåŒº/åŽç«¯å·¥ä½œç›®å½•çš„ `.zed/plans/` ä¸‹ã€‚

ä½ ä¹Ÿå¯ä»¥é€šè¿‡è‡ªç„¶å¯¹è¯ä¸Ž skills äº¤äº’ï¼š

```bash
zed chat --toolsets skills -q "What skills do you have?"
zed chat --toolsets skills -q "Show me the axolotl skill"
```

## æ¸è¿›å¼æŠ«éœ²

Skills ä½¿ç”¨ä¸€ç§èŠ‚çœ token çš„åŠ è½½æ¨¡å¼ï¼š

```
Level 0: skills_list()           â†’ [{name, description, category}, ...]   (~3k tokens)
Level 1: skill_view(name)        â†’ Full content + metadata       (varies)
Level 2: skill_view(name, path)  â†’ Specific reference file       (varies)
```

agent åªåœ¨çœŸæ­£éœ€è¦æ—¶æ‰åŠ è½½å®Œæ•´çš„ skill å†…å®¹ã€‚

## SKILL.md æ ¼å¼

```markdown
---
name: my-skill
description: Brief description of what this skill does
version: 1.0.0
platforms: [macos, linux]     # Optional â€” restrict to specific OS platforms
metadata:
  zed:
    tags: [python, automation]
    category: devops
    fallback_for_toolsets: [web]    # Optional â€” conditional activation (see below)
    requires_toolsets: [terminal]   # Optional â€” conditional activation (see below)
    config:                          # Optional â€” config.yaml settings
      - key: my.setting
        description: "What this controls"
        default: "value"
        prompt: "Prompt for setup"
---

# Skill Title

## When to Use
Trigger conditions for this skill.

## Procedure
1. Step one
2. Step two

## Pitfalls
- Known failure modes and fixes

## Verification
How to confirm it worked.
```

### å¹³å°ç‰¹å®š Skills

Skills å¯ä»¥ä½¿ç”¨ `platforms` å­—æ®µå°†è‡ªèº«é™åˆ¶åœ¨ç‰¹å®šæ“ä½œç³»ç»Ÿä¸Šï¼š

| å€¼ | åŒ¹é… |
|-------|---------|
| `macos` | macOSï¼ˆDarwinï¼‰ |
| `linux` | Linux |
| `windows` | Windows |

```yaml
platforms: [macos]            # macOS only (e.g., iMessage, Apple Reminders, FindMy)
platforms: [macos, linux]     # macOS and Linux
```

è®¾ç½®åŽï¼Œè¯¥ skill ä¼šåœ¨ä¸å…¼å®¹çš„å¹³å°ä¸Šè‡ªåŠ¨ä»Žç³»ç»Ÿæç¤ºè¯ã€`skills_list()` å’Œæ–œæ å‘½ä»¤ä¸­éšè—ã€‚è‹¥çœç•¥ï¼Œåˆ™åœ¨æ‰€æœ‰å¹³å°ä¸ŠåŠ è½½ã€‚

## Skill è¾“å‡ºä¸Žåª’ä½“ä¼ é€’

å½“ skill å“åº”ï¼ˆæˆ–ä»»ä½• agent å“åº”ï¼‰åŒ…å«æŒ‡å‘åª’ä½“æ–‡ä»¶çš„è£¸ç»å¯¹è·¯å¾„æ—¶â€”â€”ä¾‹å¦‚ `/home/user/screenshots/diagram.png`â€”â€”gateway ä¼šè‡ªåŠ¨æ£€æµ‹åˆ°å®ƒï¼Œå°†å…¶ä»Žå¯è§æ–‡æœ¬ä¸­å‰¥ç¦»ï¼Œå¹¶ä»¥åŽŸç”Ÿæ–¹å¼å°†æ–‡ä»¶ä¼ é€’ç»™ç”¨æˆ·çš„èŠå¤©ç•Œé¢ï¼ˆTelegram å›¾ç‰‡ã€Discord é™„ä»¶ç­‰ï¼‰ï¼Œè€Œä¸æ˜¯åœ¨æ¶ˆæ¯ä¸­ç•™ä¸‹åŽŸå§‹è·¯å¾„ã€‚

å¯¹äºŽéŸ³é¢‘ï¼Œ`[[audio_as_voice]]` æŒ‡ä»¤ä¼šå°†éŸ³é¢‘æ–‡ä»¶æå‡ä¸ºåœ¨æ”¯æŒè¯¥åŠŸèƒ½çš„å¹³å°ï¼ˆTelegramã€WhatsAppï¼‰ä¸Šçš„åŽŸç”Ÿè¯­éŸ³æ¶ˆæ¯æ°”æ³¡ã€‚

### å¼ºåˆ¶æ–‡æ¡£å¼ä¼ é€’ï¼š`[[as_document]]`

æœ‰æ—¶ä½ éœ€è¦ä¸Žå†…è”é¢„è§ˆ**ç›¸å**çš„æ•ˆæžœï¼šä½ å¸Œæœ›æ–‡ä»¶ä½œä¸ºå¯ä¸‹è½½é™„ä»¶ä¼ é€’ï¼Œè€Œä¸æ˜¯ç»è¿‡é‡æ–°åŽ‹ç¼©çš„å›¾ç‰‡æ°”æ³¡ã€‚å…¸åž‹ç¤ºä¾‹æ˜¯é«˜åˆ†è¾¨çŽ‡æˆªå›¾æˆ–å›¾è¡¨â€”â€”Telegram çš„ `sendPhoto` ä¼šå°†å…¶é‡æ–°åŽ‹ç¼©è‡³çº¦ 200 KBã€1280 pxï¼Œä¸¥é‡å½±å“å¯è¯»æ€§ã€‚é€šè¿‡ `sendDocument` å‘é€çš„ 1-2 MB PNG åˆ™ä¿ç•™åŽŸå§‹å­—èŠ‚å®Œæ•´æ— æŸã€‚

å¦‚æžœå“åº”ï¼ˆæˆ–å…¶ä¸­ä»»ä½•æ–‡æœ¬â€”â€”é€šå¸¸æ˜¯æœ€åŽä¸€è¡Œï¼‰åŒ…å«å­—é¢æŒ‡ä»¤ `[[as_document]]`ï¼Œåˆ™ä»Žè¯¥å“åº”ä¸­æå–çš„æ¯ä¸ªåª’ä½“è·¯å¾„éƒ½ä¼šä½œä¸ºæ–‡æ¡£/æ–‡ä»¶é™„ä»¶ä¼ é€’ï¼Œè€Œä¸æ˜¯å›¾ç‰‡æ°”æ³¡ï¼š

```
Here is your rendered chart:

/home/user/.zed/cache/chart-q4-2025.png

[[as_document]]
```

è¯¥æŒ‡ä»¤åœ¨ä¼ é€’å‰ä¼šè¢«å‰¥ç¦»ï¼Œç”¨æˆ·ä¸ä¼šçœ‹åˆ°å®ƒã€‚ç²’åº¦æœ‰æ„è®¾è®¡ä¸ºæ¯ä¸ªå“åº”å…¨æœ‰æˆ–å…¨æ— ï¼šå‘å‡ºä¸€æ¬¡ `[[as_document]]`ï¼ŒåŒä¸€å“åº”ä¸­çš„æ¯ä¸ªå›¾ç‰‡è·¯å¾„éƒ½ä¼šä½œä¸ºæ–‡æ¡£ä¼ é€’ã€‚è¿™ä¸Ž `[[audio_as_voice]]` çš„ä½œç”¨èŒƒå›´ä¸€è‡´ã€‚

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä»Ž skill ä¸­ä½¿ç”¨å®ƒï¼š

- ä½ ç”Ÿæˆäº†ç”¨æˆ·éœ€è¦ä½œä¸ºæ–‡ä»¶çš„æˆªå›¾æˆ–å›¾è¡¨ï¼ˆç”¨äºŽåœ¨å…¶ä»–å·¥å…·ä¸­ç¼–è¾‘ã€å­˜æ¡£ã€å®Œæ•´åˆ†äº«ï¼‰ã€‚
- é»˜è®¤çš„æœ‰æŸé¢„è§ˆä¼šé®è”½ç»†èŠ‚ï¼ˆå°å­—ä½“ã€åƒç´ ç²¾ç¡®çš„å›¾è¡¨ã€å¯¹é¢œè‰²æ•æ„Ÿçš„æ¸²æŸ“ï¼‰ã€‚

æ²¡æœ‰å•ç‹¬æ–‡æ¡£è·¯å¾„çš„å¹³å°ï¼ˆå¦‚ SMSï¼‰ä¼šå›žé€€åˆ°å…¶æ”¯æŒçš„ä»»ä½•é™„ä»¶æœºåˆ¶ã€‚

### æ¡ä»¶æ¿€æ´»ï¼ˆFallback Skillsï¼‰

Skills å¯ä»¥æ ¹æ®å½“å‰ä¼šè¯ä¸­å¯ç”¨çš„å·¥å…·è‡ªåŠ¨æ˜¾ç¤ºæˆ–éšè—è‡ªèº«ã€‚è¿™å¯¹äºŽ**fallback skills**ï¼ˆå›žé€€ skillsï¼‰æœ€ä¸ºæœ‰ç”¨â€”â€”ä»…åœ¨é«˜çº§å·¥å…·ä¸å¯ç”¨æ—¶æ‰åº”å‡ºçŽ°çš„å…è´¹æˆ–æœ¬åœ°æ›¿ä»£æ–¹æ¡ˆã€‚

```yaml
metadata:
  zed:
    fallback_for_toolsets: [web]      # Show ONLY when these toolsets are unavailable
    requires_toolsets: [terminal]     # Show ONLY when these toolsets are available
    fallback_for_tools: [web_search]  # Show ONLY when these specific tools are unavailable
    requires_tools: [terminal]        # Show ONLY when these specific tools are available
```

| å­—æ®µ | è¡Œä¸º |
|-------|----------|
| `fallback_for_toolsets` | å½“åˆ—å‡ºçš„ toolsets å¯ç”¨æ—¶ï¼Œskill **éšè—**ã€‚ä¸å¯ç”¨æ—¶æ˜¾ç¤ºã€‚ |
| `fallback_for_tools` | åŒä¸Šï¼Œä½†æ£€æŸ¥å•ä¸ªå·¥å…·è€Œéž toolsetsã€‚ |
| `requires_toolsets` | å½“åˆ—å‡ºçš„ toolsets ä¸å¯ç”¨æ—¶ï¼Œskill **éšè—**ã€‚å¯ç”¨æ—¶æ˜¾ç¤ºã€‚ |
| `requires_tools` | åŒä¸Šï¼Œä½†æ£€æŸ¥å•ä¸ªå·¥å…·ã€‚ |

**ç¤ºä¾‹ï¼š** å†…ç½®çš„ `duckduckgo-search` skill ä½¿ç”¨ `fallback_for_toolsets: [web]`ã€‚å½“ä½ è®¾ç½®äº† `FIRECRAWL_API_KEY` æ—¶ï¼Œweb toolset å¯ç”¨ï¼Œagent ä½¿ç”¨ `web_search`â€”â€”DuckDuckGo skill ä¿æŒéšè—ã€‚å¦‚æžœ API key ç¼ºå¤±ï¼Œweb toolset ä¸å¯ç”¨ï¼ŒDuckDuckGo skill ä¼šè‡ªåŠ¨ä½œä¸º fallback å‡ºçŽ°ã€‚

æ²¡æœ‰ä»»ä½•æ¡ä»¶å­—æ®µçš„ skills è¡Œä¸ºä¸Žä¹‹å‰å®Œå…¨ç›¸åŒâ€”â€”å§‹ç»ˆæ˜¾ç¤ºã€‚

## åŠ è½½æ—¶çš„å®‰å…¨è®¾ç½®

Skills å¯ä»¥å£°æ˜Žæ‰€éœ€çš„çŽ¯å¢ƒå˜é‡ï¼Œè€Œä¸ä¼šä»Žå‘çŽ°åˆ—è¡¨ä¸­æ¶ˆå¤±ï¼š

```yaml
required_environment_variables:
  - name: TENOR_API_KEY
    prompt: Tenor API key
    help: Get a key from https://developers.google.com/tenor
    required_for: full functionality
```

å½“é‡åˆ°ç¼ºå¤±çš„å€¼æ—¶ï¼ŒZed ä»…åœ¨æœ¬åœ° CLI ä¸­å®žé™…åŠ è½½ skill æ—¶æ‰ä¼šå®‰å…¨åœ°è¯·æ±‚è¾“å…¥ã€‚ä½ å¯ä»¥è·³è¿‡è®¾ç½®å¹¶ç»§ç»­ä½¿ç”¨è¯¥ skillã€‚æ¶ˆæ¯å¹³å°ä¸ä¼šåœ¨èŠå¤©ä¸­è¯·æ±‚å¯†é’¥â€”â€”å®ƒä»¬ä¼šå‘Šè¯‰ä½ æ”¹ç”¨æœ¬åœ°çš„ `zed setup` æˆ– `~/.zed/.env`ã€‚

ä¸€æ—¦è®¾ç½®ï¼Œå£°æ˜Žçš„çŽ¯å¢ƒå˜é‡ä¼š**è‡ªåŠ¨ä¼ é€’**åˆ° `execute_code` å’Œ `terminal` æ²™ç®±â€”â€”skill çš„è„šæœ¬å¯ä»¥ç›´æŽ¥ä½¿ç”¨ `$TENOR_API_KEY`ã€‚å¯¹äºŽéž skill çš„çŽ¯å¢ƒå˜é‡ï¼Œä½¿ç”¨ `terminal.env_passthrough` é…ç½®é€‰é¡¹ã€‚è¯¦æƒ…å‚è§[çŽ¯å¢ƒå˜é‡ä¼ é€’](/user-guide/security#environment-variable-passthrough)ã€‚

### Skill é…ç½®è®¾ç½®

Skills è¿˜å¯ä»¥å£°æ˜Žå­˜å‚¨åœ¨ `config.yaml` ä¸­çš„éžå¯†é’¥é…ç½®è®¾ç½®ï¼ˆè·¯å¾„ã€åå¥½é¡¹ï¼‰ï¼š

```yaml
metadata:
  zed:
    config:
      - key: myplugin.path
        description: Path to the plugin data directory
        default: "~/myplugin-data"
        prompt: Plugin data directory path
```

è®¾ç½®å­˜å‚¨åœ¨ config.yaml çš„ `skills.config` ä¸‹ã€‚`zed config migrate` ä¼šæç¤ºé…ç½®æœªè®¾ç½®çš„é¡¹ï¼Œ`zed config show` ä¼šæ˜¾ç¤ºå®ƒä»¬ã€‚å½“ skill åŠ è½½æ—¶ï¼Œå…¶è§£æžåŽçš„é…ç½®å€¼ä¼šæ³¨å…¥åˆ°ä¸Šä¸‹æ–‡ä¸­ï¼Œagent ä¼šè‡ªåŠ¨çŸ¥æ™“å·²é…ç½®çš„å€¼ã€‚

è¯¦æƒ…å‚è§ [Skill è®¾ç½®](/user-guide/configuration#skill-settings) å’Œ[åˆ›å»º Skillsâ€”â€”é…ç½®è®¾ç½®](/developer-guide/creating-skills#config-settings-configyaml)ã€‚

## Skill ç›®å½•ç»“æž„

```text
~/.zed/skills/                  # Single source of truth
â”œâ”€â”€ mlops/                         # Category directory
â”‚   â”œâ”€â”€ axolotl/
â”‚   â”‚   â”œâ”€â”€ SKILL.md               # Main instructions (required)
â”‚   â”‚   â”œâ”€â”€ references/            # Additional docs
â”‚   â”‚   â”œâ”€â”€ templates/             # Output formats
â”‚   â”‚   â”œâ”€â”€ scripts/               # Helper scripts callable from the skill
â”‚   â”‚   â””â”€â”€ assets/                # Supplementary files
â”‚   â””â”€â”€ vllm/
â”‚       â””â”€â”€ SKILL.md
â”œâ”€â”€ devops/
â”‚   â””â”€â”€ deploy-k8s/                # Agent-created skill
â”‚       â”œâ”€â”€ SKILL.md
â”‚       â””â”€â”€ references/
â”œâ”€â”€ .hub/                          # Skills Hub state
â”‚   â”œâ”€â”€ lock.json
â”‚   â”œâ”€â”€ quarantine/
â”‚   â””â”€â”€ audit.log
â””â”€â”€ .bundled_manifest              # Tracks seeded bundled skills
```

## å¤–éƒ¨ Skill ç›®å½•

å¦‚æžœä½ åœ¨ Zed ä¹‹å¤–ç»´æŠ¤ skillsâ€”â€”ä¾‹å¦‚ï¼Œä¾›å¤šä¸ª AI å·¥å…·ä½¿ç”¨çš„å…±äº« `~/.agents/skills/` ç›®å½•â€”â€”ä½ å¯ä»¥å‘Šè¯‰ Zed ä¹Ÿæ‰«æè¿™äº›ç›®å½•ã€‚

åœ¨ `~/.zed/config.yaml` çš„ `skills` éƒ¨åˆ†ä¸‹æ·»åŠ  `external_dirs`ï¼š

```yaml
skills:
  external_dirs:
    - ~/.agents/skills
    - /home/shared/team-skills
    - ${SKILLS_REPO}/skills
```

è·¯å¾„æ”¯æŒ `~` å±•å¼€å’Œ `${VAR}` çŽ¯å¢ƒå˜é‡æ›¿æ¢ã€‚

### å·¥ä½œåŽŸç†

- **æœ¬åœ°åˆ›å»ºï¼Œå°±åœ°æ›´æ–°**ï¼šæ–°çš„ agent åˆ›å»ºçš„ skills å†™å…¥ `~/.zed/skills/`ã€‚çŽ°æœ‰ skills åœ¨æ‰¾åˆ°çš„ä½ç½®è¢«ä¿®æ”¹ï¼ŒåŒ…æ‹¬ `external_dirs` ä¸‹çš„ skillsï¼Œå½“ agent ä½¿ç”¨ `skill_manage` æ“ä½œï¼ˆå¦‚ `patch`ã€`edit`ã€`write_file`ã€`remove_file` æˆ– `delete`ï¼‰æ—¶ã€‚
- **å¤–éƒ¨ç›®å½•ä¸æ˜¯å†™ä¿æŠ¤è¾¹ç•Œ**ï¼šå¦‚æžœå¤–éƒ¨ skill ç›®å½•å¯¹ Zed è¿›ç¨‹å¯å†™ï¼Œagent ç®¡ç†çš„ skill æ›´æ–°å¯ä»¥ä¿®æ”¹è¯¥ç›®å½•ä¸­çš„æ–‡ä»¶ã€‚å¦‚æžœå…±äº«çš„å¤–éƒ¨ skills å¿…é¡»ä¿æŒåªè¯»ï¼Œè¯·ä½¿ç”¨æ–‡ä»¶ç³»ç»Ÿæƒé™æˆ–å•ç‹¬çš„ profile/toolset è®¾ç½®ã€‚
- **æœ¬åœ°ä¼˜å…ˆ**ï¼šå¦‚æžœåŒä¸€ skill åç§°åŒæ—¶å­˜åœ¨äºŽæœ¬åœ°ç›®å½•å’Œå¤–éƒ¨ç›®å½•ä¸­ï¼Œæœ¬åœ°ç‰ˆæœ¬ä¼˜å…ˆã€‚
- **å®Œæ•´é›†æˆ**ï¼šå¤–éƒ¨ skills å‡ºçŽ°åœ¨ç³»ç»Ÿæç¤ºè¯ç´¢å¼•ã€`skills_list`ã€`skill_view` ä»¥åŠ `/skill-name` æ–œæ å‘½ä»¤ä¸­â€”â€”ä¸Žæœ¬åœ° skills æ— å¼‚ã€‚
- **ä¸å­˜åœ¨çš„è·¯å¾„ä¼šè¢«é™é»˜è·³è¿‡**ï¼šå¦‚æžœé…ç½®çš„ç›®å½•ä¸å­˜åœ¨ï¼ŒZed ä¼šå¿½ç•¥å®ƒè€Œä¸æŠ¥é”™ã€‚é€‚ç”¨äºŽå¯èƒ½ä¸åœ¨æ¯å°æœºå™¨ä¸Šéƒ½å­˜åœ¨çš„å¯é€‰å…±äº«ç›®å½•ã€‚

### ç¤ºä¾‹

```text
~/.zed/skills/               # Local (primary, read-write)
â”œâ”€â”€ devops/deploy-k8s/
â”‚   â””â”€â”€ SKILL.md
â””â”€â”€ mlops/axolotl/
    â””â”€â”€ SKILL.md

~/.agents/skills/               # External (shared, mutable if writable)
â”œâ”€â”€ my-custom-workflow/
â”‚   â””â”€â”€ SKILL.md
â””â”€â”€ team-conventions/
    â””â”€â”€ SKILL.md
```

æ‰€æœ‰å››ä¸ª skills éƒ½å‡ºçŽ°åœ¨ä½ çš„ skill ç´¢å¼•ä¸­ã€‚å¦‚æžœä½ åœ¨æœ¬åœ°åˆ›å»ºä¸€ä¸ªåä¸º `my-custom-workflow` çš„æ–° skillï¼Œå®ƒä¼šé®è”½å¤–éƒ¨ç‰ˆæœ¬ã€‚

## Skill æ†ç»‘åŒ…

Skill æ†ç»‘åŒ…æ˜¯å°†å¤šä¸ª skills å½’ç»„åœ¨å•ä¸ªæ–œæ å‘½ä»¤ä¸‹çš„å°åž‹ YAML æ–‡ä»¶ã€‚å½“ä½ è¿è¡Œ `/<bundle-name>` æ—¶ï¼Œæ†ç»‘åŒ…ä¸­åˆ—å‡ºçš„æ¯ä¸ª skill éƒ½ä¼šåŒæ—¶åŠ è½½â€”â€”å½“æŸä¸ªç‰¹å®šä»»åŠ¡æ€»æ˜¯å—ç›ŠäºŽåŒä¸€ç»„ skills æ—¶éžå¸¸æœ‰ç”¨ã€‚

### å¿«é€Ÿç¤ºä¾‹

```bash
# ä¸ºåŽç«¯åŠŸèƒ½å¼€å‘åˆ›å»ºä¸€ä¸ªæ†ç»‘åŒ…
zed bundles create backend-dev \
  --skill github-code-review \
  --skill test-driven-development \
  --skill github-pr-workflow \
  -d "Backend feature work â€” review, test, PR workflow"
```

ç„¶åŽåœ¨ CLI æˆ–ä»»ä½• gateway å¹³å°ä¸­ï¼š

```
/backend-dev refactor the auth middleware
```

agent æŽ¥æ”¶åˆ°æ‰€æœ‰ä¸‰ä¸ª skills åŠ è½½åˆ°ä¸€æ¡ç”¨æˆ·æ¶ˆæ¯ä¸­ï¼Œæ–œæ å‘½ä»¤åŽçš„ä»»ä½•æ–‡æœ¬éƒ½ä½œä¸ºç”¨æˆ·æŒ‡ä»¤é™„åŠ ã€‚

### YAML æ¨¡å¼

æ†ç»‘åŒ…å­˜æ”¾åœ¨ **`~/.zed/skill-bundles/<slug>.yaml`** ä¸­ï¼Œæ ¼å¼å¦‚ä¸‹ï¼š

```yaml
name: backend-dev
description: Backend feature work â€” review, test, PR workflow.
skills:
  - github-code-review
  - test-driven-development
  - github-pr-workflow
instruction: |
  Always start by writing failing tests, then implement.
  Open the PR through the standard workflow with co-author tags.
```

å­—æ®µè¯´æ˜Žï¼š
- `name`ï¼ˆå¯é€‰â€”â€”é»˜è®¤ä¸ºæ–‡ä»¶åä¸»å¹²ï¼‰â€”â€”æ†ç»‘åŒ…çš„æ˜¾ç¤ºåç§°ã€‚è§„èŒƒåŒ–ä¸ºè¿žå­—ç¬¦ slug ç”¨äºŽæ–œæ å‘½ä»¤ï¼ˆ`Backend Dev` â†’ `/backend-dev`ï¼‰ã€‚
- `description`ï¼ˆå¯é€‰ï¼‰â€”â€”åœ¨ `/bundles` å’Œ `zed bundles list` ä¸­æ˜¾ç¤ºçš„ç®€çŸ­æ–‡æœ¬ã€‚
- `skills`ï¼ˆå¿…å¡«ï¼Œéžç©ºåˆ—è¡¨ï¼‰â€”â€”skill åç§°æˆ–ç›¸å¯¹äºŽä½ çš„ skills ç›®å½•çš„è·¯å¾„ã€‚ä½¿ç”¨ä¸Ž `/<skill-name>` ç›¸åŒçš„æ ‡è¯†ç¬¦ã€‚
- `instruction`ï¼ˆå¯é€‰ï¼‰â€”â€”é™„åŠ åœ¨åŠ è½½çš„ skill å†…å®¹å‰çš„é¢å¤–æŒ‡å¯¼ã€‚é€‚ç”¨äºŽå›ºåŒ–"æˆ‘ä»¬æ€»æ˜¯è¿™æ ·ä¸€èµ·ä½¿ç”¨è¿™äº› skills"çš„æ–¹å¼ã€‚

### ç®¡ç†æ†ç»‘åŒ…

```bash
# åˆ—å‡ºæ‰€æœ‰å·²å®‰è£…çš„æ†ç»‘åŒ…
zed bundles list

# æŸ¥çœ‹æŸä¸ªæ†ç»‘åŒ…
zed bundles show backend-dev

# äº¤äº’å¼åˆ›å»ºæ†ç»‘åŒ…ï¼ˆçœç•¥ --skill æ ‡å¿—ä»¥é€è¡Œè¾“å…¥ï¼‰
zed bundles create research

# è¦†ç›–çŽ°æœ‰æ†ç»‘åŒ…
zed bundles create backend-dev --skill ... --force

# åˆ é™¤æ†ç»‘åŒ…
zed bundles delete backend-dev

# é‡æ–°æ‰«æ ~/.zed/skill-bundles/ å¹¶æŠ¥å‘Šå˜æ›´
zed bundles reload
```

åœ¨èŠå¤©ä¼šè¯ä¸­ï¼Œ`/bundles` ä¼šåˆ—å‡ºæ¯ä¸ªå·²å®‰è£…çš„æ†ç»‘åŒ…åŠå…¶ skillsã€‚

### è¡Œä¸º

- **å½“ slug å†²çªæ—¶ï¼Œæ†ç»‘åŒ…ä¼˜å…ˆäºŽå•ä¸ª skillsã€‚** å¦‚æžœä½ å°†æ†ç»‘åŒ…å‘½åä¸º `research`ï¼ŒåŒæ—¶ä¹Ÿæœ‰ä¸€ä¸ªåä¸º `research` çš„ skillï¼Œ`/research` ä¼šè°ƒç”¨æ†ç»‘åŒ…ã€‚è¿™æ˜¯æœ‰æ„ä¸ºä¹‹â€”â€”ä½ é€šè¿‡å‘½åé€‰æ‹©äº†æ†ç»‘åŒ…ã€‚
- **ç¼ºå¤±çš„ skills ä¼šè¢«è·³è¿‡ï¼Œè€Œä¸æ˜¯è‡´å‘½é”™è¯¯ã€‚** å¦‚æžœæ†ç»‘åŒ…åˆ—å‡ºäº† `skill-foo` ä½†ä½ æœªå®‰è£…å®ƒï¼Œæ†ç»‘åŒ…ä»ä¼šåŠ è½½èƒ½è§£æžçš„ skillsï¼Œagent ä¼šæ”¶åˆ°ä¸€æ¡åˆ—å‡ºè·³è¿‡å†…å®¹çš„è¯´æ˜Žã€‚
- **æ†ç»‘åŒ…åœ¨æ¯ä¸ªç•Œé¢éƒ½æœ‰æ•ˆ**â€”â€”äº¤äº’å¼ CLIã€TUIã€ä»ªè¡¨æ¿èŠå¤©ä»¥åŠæ¯ä¸ª gateway å¹³å°ï¼ˆTelegramã€Discordã€Slackâ€¦â€¦ï¼‰â€”â€”å› ä¸ºè°ƒåº¦ä¸Žå•ä¸ª skill å‘½ä»¤é›†ä¸­åœ¨åŒä¸€ä½ç½®ã€‚
- **æ†ç»‘åŒ…ä¸ä¼šä½¿ prompt ç¼“å­˜å¤±æ•ˆã€‚** å®ƒä»¬åœ¨è°ƒç”¨æ—¶ç”Ÿæˆä¸€æ¡æ–°çš„ç”¨æˆ·æ¶ˆæ¯ï¼Œä¸Ž `/<skill-name>` çš„æ–¹å¼ç›¸åŒâ€”â€”ä¸ä¿®æ”¹ç³»ç»Ÿæç¤ºè¯ã€‚

### æ†ç»‘åŒ…ä¼˜äºŽé€ä¸ªæ‰‹åŠ¨å®‰è£… skill çš„åœºæ™¯

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨æ†ç»‘åŒ…ï¼š
- ä½ æ€»æ˜¯ä¸ºæŸä¸ªé‡å¤ä»»åŠ¡é…å¯¹ç›¸åŒçš„ skillsï¼ˆ`/backend-dev`ã€`/release-prep`ã€`/incident-response`ï¼‰ã€‚
- ä½ æƒ³è¦æ¯”ä¾æ¬¡è¾“å…¥å¤šä¸ª `/skill` è°ƒç”¨æ›´ç®€æ´çš„å¿ƒæ™ºæ¨¡åž‹ã€‚
- ä½ æƒ³é€šè¿‡å°†æ†ç»‘åŒ… YAML æäº¤åˆ°å…±äº« dotfiles ä»“åº“å¹¶ç¬¦å·é“¾æŽ¥åˆ° `~/.zed/skill-bundles/` æ¥å‘å¸ƒå›¢é˜ŸèŒƒå›´çš„"ä»»åŠ¡é…ç½®æ–‡ä»¶"ã€‚

æ†ç»‘åŒ…åªæ˜¯ä¸€ä¸ª YAML åˆ«åâ€”â€”å®ƒä¸ä¼šä¸ºä½ å®‰è£… skillsã€‚Skills æœ¬èº«å¿…é¡»å·²ç»å­˜åœ¨ï¼ˆåœ¨ `~/.zed/skills/` æˆ–å¤–éƒ¨ skill ç›®å½•ä¸­ï¼‰ã€‚å¦åˆ™æ†ç»‘åŒ…è°ƒç”¨åªä¼šè·³è¿‡ç¼ºå¤±çš„ skillsã€‚

## Agent ç®¡ç†çš„ Skillsï¼ˆskill_manage å·¥å…·ï¼‰

agent å¯ä»¥é€šè¿‡ `skill_manage` å·¥å…·åˆ›å»ºã€æ›´æ–°å’Œåˆ é™¤è‡ªå·±çš„ skillsã€‚è¿™æ˜¯ agent çš„**ç¨‹åºæ€§è®°å¿†**â€”â€”å½“å®ƒæ‰¾åˆ°ä¸€ä¸ªéžå¹³å‡¡çš„å·¥ä½œæµæ—¶ï¼Œå®ƒä¼šå°†è¯¥æ–¹æ³•ä¿å­˜ä¸º skill ä»¥ä¾›å°†æ¥å¤ç”¨ã€‚

### Agent åˆ›å»º Skills çš„æ—¶æœº

- æˆåŠŸå®Œæˆå¤æ‚ä»»åŠ¡åŽï¼ˆ5+ æ¬¡å·¥å…·è°ƒç”¨ï¼‰
- é‡åˆ°é”™è¯¯æˆ–æ­»è·¯å¹¶æ‰¾åˆ°å¯è¡Œè·¯å¾„æ—¶
- ç”¨æˆ·çº æ­£äº†å…¶æ–¹æ³•æ—¶
- å‘çŽ°äº†éžå¹³å‡¡çš„å·¥ä½œæµæ—¶

### æ“ä½œ

| æ“ä½œ | ç”¨é€” | å…³é”®å‚æ•° |
|--------|---------|------------|
| `create` | ä»Žå¤´åˆ›å»ºæ–° skill | `name`ã€`content`ï¼ˆå®Œæ•´ SKILL.mdï¼‰ã€å¯é€‰ `category` |
| `patch` | é’ˆå¯¹æ€§ä¿®å¤ï¼ˆé¦–é€‰ï¼‰ | `name`ã€`old_string`ã€`new_string` |
| `edit` | é‡å¤§ç»“æž„æ€§é‡å†™ | `name`ã€`content`ï¼ˆå®Œæ•´ SKILL.md æ›¿æ¢ï¼‰ |
| `delete` | å®Œå…¨åˆ é™¤ä¸€ä¸ª skill | `name` |
| `write_file` | æ·»åŠ /æ›´æ–°æ”¯æŒæ–‡ä»¶ | `name`ã€`file_path`ã€`file_content` |
| `remove_file` | åˆ é™¤æ”¯æŒæ–‡ä»¶ | `name`ã€`file_path` |

:::tip
`patch` æ“ä½œæ˜¯æ›´æ–°çš„é¦–é€‰æ–¹å¼â€”â€”å®ƒæ¯” `edit` æ›´èŠ‚çœ tokenï¼Œå› ä¸ºå·¥å…·è°ƒç”¨ä¸­åªå‡ºçŽ°å˜æ›´çš„æ–‡æœ¬ã€‚
:::

## Skills Hub

ä»Žåœ¨çº¿æ³¨å†Œè¡¨ã€`skills.sh`ã€ç›´æŽ¥çš„çŸ¥å skill ç«¯ç‚¹ä»¥åŠå®˜æ–¹å¯é€‰ skills ä¸­æµè§ˆã€æœç´¢ã€å®‰è£…å’Œç®¡ç† skillsã€‚

### å¸¸ç”¨å‘½ä»¤

```bash
zed skills browse                              # Browse all hub skills (official first)
zed skills browse --source official            # Browse only official optional skills
zed skills search kubernetes                   # Search all sources
zed skills search react --source skills-sh     # Search the skills.sh directory
zed skills search https://mintlify.com/docs --source well-known
zed skills inspect openai/skills/k8s           # Preview before installing
zed skills install openai/skills/k8s           # Install with security scan
zed skills install official/security/1password
zed skills install skills-sh/vercel-labs/json-render/json-render-react --force
zed skills install well-known:https://mintlify.com/docs/.well-known/skills/mintlify
zed skills install https://sharethis.chat/SKILL.md              # Direct URL (single-file SKILL.md)
zed skills install https://example.com/SKILL.md --name my-skill # Override name when frontmatter has none
zed skills list --source hub                   # List hub-installed skills
zed skills check                               # Check installed hub skills for upstream updates
zed skills update                              # Reinstall hub skills with upstream changes when needed
zed skills audit                               # Re-scan all hub skills for security
zed skills uninstall k8s                       # Remove a hub skill
zed skills reset google-workspace              # Un-stick a bundled skill from "user-modified" (see below)
zed skills reset google-workspace --restore    # Also restore the bundled version, deleting your local edits
zed skills publish skills/my-skill --to github --repo owner/repo
zed skills snapshot export setup.json          # Export skill config
zed skills tap add myorg/skills-repo           # Add a custom GitHub source
```

### æ”¯æŒçš„ hub æ¥æº

| æ¥æº | ç¤ºä¾‹ | è¯´æ˜Ž |
|--------|---------|-------|
| `official` | `official/security/1password` | Zed éšé™„çš„å¯é€‰ skillsã€‚ |
| `skills-sh` | `skills-sh/vercel-labs/agent-skills/vercel-react-best-practices` | å¯é€šè¿‡ `zed skills search <query> --source skills-sh` æœç´¢ã€‚å½“ skills.sh slug ä¸Žä»“åº“æ–‡ä»¶å¤¹ä¸åŒæ—¶ï¼ŒZed ä¼šè§£æžåˆ«åå¼ skillsã€‚ |
| `well-known` | `well-known:https://mintlify.com/docs/.well-known/skills/mintlify` | ç›´æŽ¥ä»Žç½‘ç«™çš„ `/.well-known/skills/index.json` æä¾›çš„ skillsã€‚ä½¿ç”¨ç«™ç‚¹æˆ–æ–‡æ¡£ URL æœç´¢ã€‚ |
| `url` | `https://sharethis.chat/SKILL.md` | æŒ‡å‘å•æ–‡ä»¶ `SKILL.md` çš„ç›´æŽ¥ HTTP(S) URLã€‚åç§°è§£æžé¡ºåºï¼šfrontmatter â†’ URL slug â†’ äº¤äº’å¼æç¤º â†’ `--name` æ ‡å¿—ã€‚ |
| `github` | `openai/skills/k8s` | ç›´æŽ¥ä»Ž GitHub ä»“åº“/è·¯å¾„å®‰è£…ä»¥åŠåŸºäºŽ GitHub çš„è‡ªå®šä¹‰ tapã€‚ |
| `clawhub`ã€`lobehub`ã€`browse-sh`ã€`claude-marketplace` | æ¥æºç‰¹å®šæ ‡è¯†ç¬¦ | ç¤¾åŒºæˆ–å¸‚åœºé›†æˆã€‚ |

### é›†æˆçš„ hub å’Œæ³¨å†Œè¡¨

Zed ç›®å‰ä¸Žä»¥ä¸‹ skills ç”Ÿæ€ç³»ç»Ÿå’Œå‘çŽ°æ¥æºé›†æˆï¼š

#### 1. å®˜æ–¹å¯é€‰ skillsï¼ˆ`official`ï¼‰

è¿™äº› skills åœ¨ Zed ä»“åº“ä¸­ç»´æŠ¤ï¼Œä»¥å†…ç½®ä¿¡ä»»çº§åˆ«å®‰è£…ã€‚

- ç›®å½•ï¼š[å®˜æ–¹å¯é€‰ Skills ç›®å½•](../../reference/optional-skills-catalog)
- ä»“åº“ä¸­çš„æ¥æºï¼š`optional-skills/`
- ç¤ºä¾‹ï¼š

```bash
zed skills browse --source official
zed skills install official/security/1password
```

#### 2. skills.shï¼ˆ`skills-sh`ï¼‰

è¿™æ˜¯ Vercel çš„å…¬å…± skills ç›®å½•ã€‚Zed å¯ä»¥ç›´æŽ¥æœç´¢å®ƒã€æŸ¥çœ‹ skill è¯¦æƒ…é¡µã€è§£æžåˆ«åå¼ slugï¼Œå¹¶ä»Žåº•å±‚æºä»“åº“å®‰è£…ã€‚

- ç›®å½•ï¼š[skills.sh](https://skills.sh/)
- CLI/å·¥å…·ä»“åº“ï¼š[vercel-labs/skills](https://github.com/vercel-labs/skills)
- Vercel å®˜æ–¹ skills ä»“åº“ï¼š[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- ç¤ºä¾‹ï¼š

```bash
zed skills search react --source skills-sh
zed skills inspect skills-sh/vercel-labs/json-render/json-render-react
zed skills install skills-sh/vercel-labs/json-render/json-render-react --force
```

#### 3. Well-known skill ç«¯ç‚¹ï¼ˆ`well-known`ï¼‰

è¿™æ˜¯åŸºäºŽ URL çš„å‘çŽ°æœºåˆ¶ï¼Œæ¥è‡ªå‘å¸ƒ `/.well-known/skills/index.json` çš„ç«™ç‚¹ã€‚å®ƒä¸æ˜¯å•ä¸€çš„é›†ä¸­å¼ hubâ€”â€”å®ƒæ˜¯ä¸€ç§ Web å‘çŽ°çº¦å®šã€‚

- ç¤ºä¾‹å®žæ—¶ç«¯ç‚¹ï¼š[Mintlify docs skills index](https://mintlify.com/docs/.well-known/skills/index.json)
- å‚è€ƒæœåŠ¡å™¨å®žçŽ°ï¼š[vercel-labs/skills-handler](https://github.com/vercel-labs/skills-handler)
- ç¤ºä¾‹ï¼š

```bash
zed skills search https://mintlify.com/docs --source well-known
zed skills inspect well-known:https://mintlify.com/docs/.well-known/skills/mintlify
zed skills install well-known:https://mintlify.com/docs/.well-known/skills/mintlify
```

#### 4. ç›´æŽ¥ GitHub skillsï¼ˆ`github`ï¼‰

Zed å¯ä»¥ç›´æŽ¥ä»Ž GitHub ä»“åº“å’ŒåŸºäºŽ GitHub çš„ tap å®‰è£…ã€‚å½“ä½ å·²çŸ¥ä»“åº“/è·¯å¾„æˆ–æƒ³æ·»åŠ è‡ªå·±çš„è‡ªå®šä¹‰æºä»“åº“æ—¶éžå¸¸æœ‰ç”¨ã€‚

é»˜è®¤ tapï¼ˆæ— éœ€ä»»ä½•è®¾ç½®å³å¯æµè§ˆï¼‰ï¼š
- [openai/skills](https://github.com/openai/skills)
- [anthropics/skills](https://github.com/anthropics/skills)
- [huggingface/skills](https://github.com/huggingface/skills)
- [NVIDIA/skills](https://github.com/NVIDIA/skills) â€” NVIDIA å®˜æ–¹éªŒè¯çš„æŠ€èƒ½ï¼ˆå¸¦ç­¾å `skill.oms.sig` ä¸Žæ²»ç†ç”¨ `skill-card.md`ï¼‰
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)
- [garrytan/gstack](https://github.com/garrytan/gstack)

- ç¤ºä¾‹ï¼š

```bash
zed skills install openai/skills/k8s
zed skills tap add myorg/skills-repo
```

#### 5. ClawHubï¼ˆ`clawhub`ï¼‰

ä½œä¸ºç¤¾åŒºæ¥æºé›†æˆçš„ç¬¬ä¸‰æ–¹ skills å¸‚åœºã€‚

- ç«™ç‚¹ï¼š[clawhub.ai](https://clawhub.ai/)
- Zed æ¥æº idï¼š`clawhub`

#### 6. Claude å¸‚åœºå¼ä»“åº“ï¼ˆ`claude-marketplace`ï¼‰

Zed æ”¯æŒå‘å¸ƒ Claude å…¼å®¹æ’ä»¶/å¸‚åœºæ¸…å•çš„å¸‚åœºä»“åº“ã€‚

å·²çŸ¥é›†æˆæ¥æºåŒ…æ‹¬ï¼š
- [anthropics/skills](https://github.com/anthropics/skills)
- [aiskillstore/marketplace](https://github.com/aiskillstore/marketplace)

Zed æ¥æº idï¼š`claude-marketplace`

#### 7. LobeHubï¼ˆ`lobehub`ï¼‰

Zed å¯ä»¥ä»Ž LobeHub çš„å…¬å…±ç›®å½•ä¸­æœç´¢å¹¶å°† agent æ¡ç›®è½¬æ¢ä¸ºå¯å®‰è£…çš„ Zed skillsã€‚

- ç«™ç‚¹ï¼š[LobeHub](https://lobehub.com/)
- å…¬å…± agents ç´¢å¼•ï¼š[chat-agents.lobehub.com](https://chat-agents.lobehub.com/)
- åŽç«¯ä»“åº“ï¼š[lobehub/lobe-chat-agents](https://github.com/lobehub/lobe-chat-agents)
- Zed æ¥æº idï¼š`lobehub`

#### 8. browse.shï¼ˆ`browse-sh`ï¼‰

Zed ä¸Ž [browse.sh](https://browse.sh) é›†æˆï¼Œè¿™æ˜¯ Browserbase çš„ç›®å½•ï¼ŒåŒ…å« 200+ ä¸ªé’ˆå¯¹ç‰¹å®šç«™ç‚¹çš„æµè§ˆå™¨è‡ªåŠ¨åŒ– SKILL.md æ–‡ä»¶ï¼ˆAirbnbã€Amazonã€arXivã€12306.cnã€Etsyã€Xero ç­‰ï¼‰ã€‚æ¯ä¸ª skill æè¿°å¦‚ä½•ç«¯åˆ°ç«¯é©±åŠ¨ä¸€ä¸ªç½‘ç«™ï¼Œé€‚åˆä¸Ž Zed çš„æµè§ˆå™¨å·¥å…·ä»¥åŠä½ å·²å®‰è£…çš„ä»»ä½•æµè§ˆå™¨è‡ªåŠ¨åŒ– skills é…åˆä½¿ç”¨ã€‚

- ç«™ç‚¹ï¼š[browse.sh](https://browse.sh/)
- ç›®å½• APIï¼š`https://browse.sh/api/skills`
- Zed æ¥æº idï¼š`browse-sh`
- ä¿¡ä»»çº§åˆ«ï¼š`community`

```bash
zed skills search airbnb --source browse-sh
zed skills inspect browse-sh/airbnb.com/search-listings-ddgioa
zed skills install browse-sh/airbnb.com/search-listings-ddgioa
```

æ ‡è¯†ç¬¦ä½¿ç”¨ `browse-sh/<hostname>/<task-id>` çš„å½¢å¼ï¼Œä¸Ž browse.sh ç›®å½•å…¬å¼€çš„ slug åŒ¹é…ã€‚å†…å®¹é€šè¿‡æ¯ä¸ª skill çš„è¯¦æƒ…ç«¯ç‚¹ï¼ˆ`/api/skills/<slug>` â†’ `skillMdUrl`ï¼‰è§£æžï¼Œè€Œä¸æ˜¯é€šè¿‡ç›®å½•çš„ GitHub `sourceUrl`ã€‚

#### 9. ç›´æŽ¥ URLï¼ˆ`url`ï¼‰

ç›´æŽ¥ä»Žä»»ä½• HTTP(S) URL å®‰è£…å•æ–‡ä»¶ `SKILL.md`â€”â€”å½“ä½œè€…åœ¨è‡ªå·±çš„ç«™ç‚¹ä¸Šæ‰˜ç®¡ skill æ—¶éžå¸¸æœ‰ç”¨ï¼ˆæ—  hub åˆ—è¡¨ï¼Œæ— éœ€è¾“å…¥ GitHub è·¯å¾„ï¼‰ã€‚Zed èŽ·å– URLï¼Œè§£æž YAML frontmatterï¼Œè¿›è¡Œå®‰å…¨æ‰«æå¹¶å®‰è£…ã€‚

- Zed æ¥æº idï¼š`url`
- æ ‡è¯†ç¬¦ï¼šURL æœ¬èº«ï¼ˆæ— éœ€å‰ç¼€ï¼‰
- èŒƒå›´ï¼š**ä»…é™å•æ–‡ä»¶ `SKILL.md`**ã€‚åŒ…å« `references/` æˆ– `scripts/` çš„å¤šæ–‡ä»¶ skills éœ€è¦æ¸…å•ï¼Œåº”é€šè¿‡ä¸Šè¿°å…¶ä»–æ¥æºä¹‹ä¸€å‘å¸ƒã€‚

```bash
zed skills install https://sharethis.chat/SKILL.md
zed skills install https://example.com/my-skill/SKILL.md --category productivity
```

åç§°è§£æžé¡ºåºï¼š
1. SKILL.md YAML frontmatter ä¸­çš„ `name:` å­—æ®µï¼ˆæŽ¨èâ€”â€”æ¯ä¸ªæ ¼å¼è‰¯å¥½çš„ skill éƒ½æœ‰ï¼‰ã€‚
2. URL è·¯å¾„ä¸­çš„çˆ¶ç›®å½•åç§°ï¼ˆä¾‹å¦‚ `.../my-skill/SKILL.md` â†’ `my-skill`ï¼Œæˆ– `.../my-skill.md` â†’ `my-skill`ï¼‰ï¼Œå½“å®ƒæ˜¯æœ‰æ•ˆæ ‡è¯†ç¬¦ï¼ˆ`^[a-z][a-z0-9_-]*$`ï¼‰æ—¶ã€‚
3. åœ¨æœ‰ TTY çš„ç»ˆç«¯ä¸Šçš„äº¤äº’å¼æç¤ºã€‚
4. åœ¨éžäº¤äº’å¼ç•Œé¢ï¼ˆTUI å†…çš„ `/skills install` æ–œæ å‘½ä»¤ã€gateway å¹³å°ã€è„šæœ¬ï¼‰ä¸Šï¼Œç»™å‡ºæŒ‡å‘ `--name` è¦†ç›–çš„æ¸…æ™°é”™è¯¯ã€‚

```bash
# Frontmatter æ²¡æœ‰åç§°ä¸” URL slug æ— æ„ä¹‰â€”â€”æ‰‹åŠ¨æä¾›ï¼š
zed skills install https://example.com/SKILL.md --name sharethis-chat

# æˆ–åœ¨èŠå¤©ä¼šè¯ä¸­ï¼š
/skills install https://example.com/SKILL.md --name sharethis-chat
```

ä¿¡ä»»çº§åˆ«å§‹ç»ˆä¸º `community`â€”â€”ä¸Žæ‰€æœ‰å…¶ä»–æ¥æºä¸€æ ·è¿è¡Œç›¸åŒçš„å®‰å…¨æ‰«æã€‚URL ä½œä¸ºå®‰è£…æ ‡è¯†ç¬¦å­˜å‚¨ï¼Œå› æ­¤å½“ä½ æƒ³åˆ·æ–°æ—¶ï¼Œ`zed skills update` ä¼šè‡ªåŠ¨ä»ŽåŒä¸€ URL é‡æ–°èŽ·å–ã€‚

### å®‰å…¨æ‰«æä¸Ž `--force`

æ‰€æœ‰é€šè¿‡ hub å®‰è£…çš„ skills éƒ½ç»è¿‡**å®‰å…¨æ‰«æå™¨**æ£€æŸ¥ï¼Œæ£€æµ‹æ•°æ®æ³„éœ²ã€prompt æ³¨å…¥ã€ç ´åæ€§å‘½ä»¤ã€ä¾›åº”é“¾ä¿¡å·åŠå…¶ä»–å¨èƒã€‚

`zed skills inspect ...` çŽ°åœ¨è¿˜ä¼šåœ¨å¯ç”¨æ—¶æ˜¾ç¤ºä¸Šæ¸¸å…ƒæ•°æ®ï¼š
- ä»“åº“ URL
- skills.sh è¯¦æƒ…é¡µ URL
- å®‰è£…å‘½ä»¤
- æ¯å‘¨å®‰è£…é‡
- ä¸Šæ¸¸å®‰å…¨å®¡è®¡çŠ¶æ€
- well-known ç´¢å¼•/ç«¯ç‚¹ URL

å½“ä½ å·²å®¡æŸ¥ç¬¬ä¸‰æ–¹ skill å¹¶å¸Œæœ›è¦†ç›–éžå±é™©æ€§ç­–ç•¥é˜»æ­¢æ—¶ï¼Œä½¿ç”¨ `--force`ï¼š

```bash
zed skills install skills-sh/anthropics/skills/pdf --force
```

é‡è¦è¡Œä¸ºï¼š
- `--force` å¯ä»¥è¦†ç›–è°¨æ…Ž/è­¦å‘Šç±»å‘çŽ°çš„ç­–ç•¥é˜»æ­¢ã€‚
- `--force` **ä¸èƒ½**è¦†ç›– `dangerous` æ‰«æç»“è®ºã€‚
- å®˜æ–¹å¯é€‰ skillsï¼ˆ`official/...`ï¼‰è¢«è§†ä¸ºå†…ç½®ä¿¡ä»»ï¼Œä¸æ˜¾ç¤ºç¬¬ä¸‰æ–¹è­¦å‘Šé¢æ¿ã€‚

### ä¿¡ä»»çº§åˆ«

| çº§åˆ« | æ¥æº | ç­–ç•¥ |
|-------|--------|--------|
| `builtin` | éš Zed é™„å¸¦ | å§‹ç»ˆå—ä¿¡ä»» |
| `official` | ä»“åº“ä¸­çš„ `optional-skills/` | å†…ç½®ä¿¡ä»»ï¼Œæ— ç¬¬ä¸‰æ–¹è­¦å‘Š |
| `trusted` | å—ä¿¡ä»»çš„æ³¨å†Œè¡¨/ä»“åº“ï¼Œå¦‚ `openai/skills`ã€`anthropics/skills`ã€`huggingface/skills`ã€`NVIDIA/skills` | æ¯”ç¤¾åŒºæ¥æºæ›´å®½æ¾çš„ç­–ç•¥ |
| `community` | å…¶ä»–æ‰€æœ‰æ¥æºï¼ˆ`skills.sh`ã€well-known ç«¯ç‚¹ã€è‡ªå®šä¹‰ GitHub ä»“åº“ã€å¤§å¤šæ•°å¸‚åœºï¼‰ | éžå±é™©æ€§å‘çŽ°å¯ç”¨ `--force` è¦†ç›–ï¼›`dangerous` ç»“è®ºä¿æŒé˜»æ­¢ |

### æ›´æ–°ç”Ÿå‘½å‘¨æœŸ

hub çŽ°åœ¨è·Ÿè¸ªè¶³å¤Ÿçš„æ¥æºä¿¡æ¯ä»¥é‡æ–°æ£€æŸ¥å·²å®‰è£… skills çš„ä¸Šæ¸¸å‰¯æœ¬ï¼š

```bash
zed skills check          # Report which installed hub skills changed upstream
zed skills update         # Reinstall only the skills with updates available
zed skills update react   # Update one specific installed hub skill
```

è¿™ä½¿ç”¨å­˜å‚¨çš„æ¥æºæ ‡è¯†ç¬¦åŠ ä¸Šå½“å‰ä¸Šæ¸¸æ†ç»‘åŒ…å†…å®¹å“ˆå¸Œæ¥æ£€æµ‹æ¼‚ç§»ã€‚

:::tip GitHub é€ŸçŽ‡é™åˆ¶
Skills hub æ“ä½œä½¿ç”¨ GitHub APIï¼Œæœªè®¤è¯ç”¨æˆ·çš„é€ŸçŽ‡é™åˆ¶ä¸ºæ¯å°æ—¶ 60 æ¬¡è¯·æ±‚ã€‚å¦‚æžœåœ¨å®‰è£…æˆ–æœç´¢æ—¶çœ‹åˆ°é€ŸçŽ‡é™åˆ¶é”™è¯¯ï¼Œè¯·åœ¨ `.env` æ–‡ä»¶ä¸­è®¾ç½® `GITHUB_TOKEN` ä»¥å°†é™åˆ¶æé«˜åˆ°æ¯å°æ—¶ 5,000 æ¬¡è¯·æ±‚ã€‚å‘ç”Ÿæ­¤æƒ…å†µæ—¶ï¼Œé”™è¯¯æ¶ˆæ¯ä¼šåŒ…å«å¯æ“ä½œçš„æç¤ºã€‚
:::

### å‘å¸ƒè‡ªå®šä¹‰ skill tap

å¦‚æžœä½ æƒ³åˆ†äº«ä¸€ç»„ç²¾é€‰çš„ skillsâ€”â€”ä¸ºä½ çš„å›¢é˜Ÿã€ç»„ç»‡æˆ–å…¬å¼€åˆ†äº«â€”â€”ä½ å¯ä»¥å°†å®ƒä»¬å‘å¸ƒä¸º **tap**ï¼šå…¶ä»– Zed ç”¨æˆ·é€šè¿‡ `zed skills tap add <owner/repo>` æ·»åŠ çš„ GitHub ä»“åº“ã€‚æ— éœ€æœåŠ¡å™¨ï¼Œæ— éœ€æ³¨å†Œè¡¨æ³¨å†Œï¼Œæ— éœ€å‘å¸ƒæµæ°´çº¿ã€‚åªéœ€ä¸€ä¸ªåŒ…å« `SKILL.md` æ–‡ä»¶çš„ç›®å½•ã€‚

#### ä»“åº“å¸ƒå±€

tap æ˜¯ä»»ä½• GitHub ä»“åº“ï¼ˆå…¬å¼€æˆ–ç§æœ‰â€”â€”ç§æœ‰ä»“åº“éœ€è¦ `GITHUB_TOKEN`ï¼‰ï¼Œå¸ƒå±€å¦‚ä¸‹ï¼š

```
owner/repo
â”œâ”€â”€ skills/                       # default path; configurable per-tap
â”‚   â”œâ”€â”€ my-workflow/
â”‚   â”‚   â”œâ”€â”€ SKILL.md              # required
â”‚   â”‚   â”œâ”€â”€ references/           # optional supporting files
â”‚   â”‚   â”œâ”€â”€ templates/
â”‚   â”‚   â””â”€â”€ scripts/
â”‚   â”œâ”€â”€ another-skill/
â”‚   â”‚   â””â”€â”€ SKILL.md
â”‚   â””â”€â”€ third-skill/
â”‚       â””â”€â”€ SKILL.md
â””â”€â”€ README.md                     # optional but helpful
```

è§„åˆ™ï¼š
- æ¯ä¸ª skill å­˜æ”¾åœ¨ tap æ ¹è·¯å¾„ï¼ˆé»˜è®¤ `skills/`ï¼‰ä¸‹çš„ç‹¬ç«‹ç›®å½•ä¸­ã€‚
- ç›®å½•åæˆä¸º skill çš„å®‰è£… slugã€‚
- æ¯ä¸ª skill ç›®å½•å¿…é¡»åŒ…å«ä¸€ä¸ªå¸¦æœ‰æ ‡å‡† [SKILL.md frontmatter](#skillmd-format) çš„ `SKILL.md`ï¼ˆ`name`ã€`description`ï¼Œä»¥åŠå¯é€‰çš„ `metadata.zed.tags`ã€`version`ã€`author`ã€`platforms`ã€`metadata.zed.config`ï¼‰ã€‚
- `references/`ã€`templates/`ã€`scripts/`ã€`assets/` ç­‰å­ç›®å½•åœ¨å®‰è£…æ—¶ä¸Ž `SKILL.md` ä¸€èµ·ä¸‹è½½ã€‚
- ç›®å½•åä»¥ `.` æˆ– `_` å¼€å¤´çš„ skills ä¼šè¢«å¿½ç•¥ã€‚

Zed é€šè¿‡åˆ—å‡º tap è·¯å¾„çš„æ¯ä¸ªå­ç›®å½•å¹¶æŽ¢æµ‹æ¯ä¸ªç›®å½•ä¸­çš„ `SKILL.md` æ¥å‘çŽ° skillsã€‚

#### æœ€å° tap ç¤ºä¾‹

```
my-org/zed-skills
â””â”€â”€ skills/
    â””â”€â”€ deploy-runbook/
        â””â”€â”€ SKILL.md
```

`skills/deploy-runbook/SKILL.md`ï¼š

```markdown
---
name: deploy-runbook
description: Our deployment runbook â€” services, rollback, Slack channels
version: 1.0.0
author: My Org Platform Team
metadata:
  zed:
    tags: [deployment, runbook, internal]
---

# Deploy Runbook

Step 1: ...
```

å°†å…¶æŽ¨é€åˆ° GitHub åŽï¼Œä»»ä½• Zed ç”¨æˆ·éƒ½å¯ä»¥è®¢é˜…å¹¶å®‰è£…ï¼š

```bash
zed skills tap add my-org/zed-skills
zed skills search deploy
zed skills install my-org/zed-skills/deploy-runbook
```

#### éžé»˜è®¤è·¯å¾„

å¦‚æžœä½ çš„ skills ä¸åœ¨ `skills/` ä¸‹ï¼ˆå½“ä½ å‘çŽ°æœ‰é¡¹ç›®æ·»åŠ  `skills/` å­æ ‘æ—¶å¾ˆå¸¸è§ï¼‰ï¼Œè¯·ç¼–è¾‘ `~/.zed/.hub/taps.json` ä¸­çš„ tap æ¡ç›®ï¼š

```json
{
  "taps": [
    {"repo": "my-org/platform-docs", "path": "internal/skills/"}
  ]
}
```

`zed skills tap add` CLI é»˜è®¤å°†æ–° tap çš„ `path` è®¾ä¸º `"skills/"`ï¼›å¦‚æžœéœ€è¦ä¸åŒè·¯å¾„ï¼Œè¯·ç›´æŽ¥ç¼–è¾‘è¯¥æ–‡ä»¶ã€‚`zed skills tap list` æ˜¾ç¤ºæ¯ä¸ª tap çš„æœ‰æ•ˆè·¯å¾„ã€‚

#### ç›´æŽ¥å®‰è£…å•ä¸ª skillsï¼ˆæ— éœ€æ·»åŠ  tapï¼‰

ç”¨æˆ·ä¹Ÿå¯ä»¥ä»Žä»»ä½•å…¬å¼€ GitHub ä»“åº“å®‰è£…å•ä¸ª skillï¼Œè€Œæ— éœ€å°†æ•´ä¸ªä»“åº“æ·»åŠ ä¸º tapï¼š

```bash
zed skills install owner/repo/skills/my-workflow
```

å½“ä½ æƒ³åˆ†äº«ä¸€ä¸ª skill è€Œä¸è¦æ±‚ç”¨æˆ·è®¢é˜…ä½ çš„æ•´ä¸ªæ³¨å†Œè¡¨æ—¶éžå¸¸æœ‰ç”¨ã€‚

#### tap çš„ä¿¡ä»»çº§åˆ«

æ–° tap é»˜è®¤åˆ†é… `community` ä¿¡ä»»çº§åˆ«ã€‚ä»Žä¸­å®‰è£…çš„ skills ç»è¿‡æ ‡å‡†å®‰å…¨æ‰«æï¼Œé¦–æ¬¡å®‰è£…æ—¶æ˜¾ç¤ºç¬¬ä¸‰æ–¹è­¦å‘Šé¢æ¿ã€‚å¦‚æžœä½ çš„ç»„ç»‡æˆ–å¹¿æ³›å—ä¿¡ä»»çš„æ¥æºåº”èŽ·å¾—æ›´é«˜ä¿¡ä»»ï¼Œè¯·å°†å…¶ä»“åº“æ·»åŠ åˆ° `tools/skills_hub.py` ä¸­çš„ `TRUSTED_REPOS`ï¼ˆéœ€è¦ Zed æ ¸å¿ƒ PRï¼‰ã€‚

#### Tap ç®¡ç†

```bash
zed skills tap list                                # show all configured taps
zed skills tap add myorg/skills-repo               # add (default path: skills/)
zed skills tap remove myorg/skills-repo            # remove
```

åœ¨è¿è¡Œä¸­çš„ä¼šè¯å†…ï¼š

```
/skills tap list
/skills tap add myorg/skills-repo
/skills tap remove myorg/skills-repo
```

Tap å­˜å‚¨åœ¨ `~/.zed/.hub/taps.json` ä¸­ï¼ˆæŒ‰éœ€åˆ›å»ºï¼‰ã€‚

## æ†ç»‘ skill æ›´æ–°ï¼ˆ`zed skills reset`ï¼‰

Zed åœ¨ä»“åº“çš„ `skills/` ä¸­é™„å¸¦ä¸€ç»„æ†ç»‘ skillsã€‚åœ¨å®‰è£…æ—¶ä»¥åŠæ¯æ¬¡ `zed update` æ—¶ï¼ŒåŒæ­¥è¿‡ç¨‹ä¼šå°†è¿™äº› skills å¤åˆ¶åˆ° `~/.zed/skills/` ä¸­ï¼Œå¹¶åœ¨ `~/.zed/skills/.bundled_manifest` è®°å½•ä¸€ä¸ªæ¸…å•ï¼Œå°†æ¯ä¸ª skill åç§°æ˜ å°„åˆ°åŒæ­¥æ—¶çš„å†…å®¹å“ˆå¸Œï¼ˆ**origin hash**ï¼‰ã€‚

æ¯æ¬¡åŒæ­¥æ—¶ï¼ŒZed é‡æ–°è®¡ç®—æœ¬åœ°å‰¯æœ¬çš„å“ˆå¸Œå¹¶ä¸Ž origin hash æ¯”è¾ƒï¼š

- **æœªæ›´æ”¹** â†’ å¯ä»¥å®‰å…¨æ‹‰å–ä¸Šæ¸¸å˜æ›´ï¼Œå¤åˆ¶æ–°çš„æ†ç»‘ç‰ˆæœ¬ï¼Œè®°å½•æ–°çš„ origin hashã€‚
- **å·²æ›´æ”¹** â†’ è§†ä¸º**ç”¨æˆ·ä¿®æ”¹**å¹¶æ°¸ä¹…è·³è¿‡ï¼Œå› æ­¤ä½ çš„ç¼–è¾‘ä¸ä¼šè¢«è¦†ç›–ã€‚

è¿™ç§ä¿æŠ¤æœºåˆ¶å¾ˆå¥½ï¼Œä½†æœ‰ä¸€ä¸ªæ£˜æ‰‹çš„è¾¹ç¼˜æƒ…å†µã€‚å¦‚æžœä½ ç¼–è¾‘äº†ä¸€ä¸ªæ†ç»‘ skillï¼ŒåŽæ¥æƒ³é€šè¿‡ä»Ž `~/.zed/zed-agent/skills/` å¤åˆ¶ç²˜è´´æ¥æ”¾å¼ƒæ›´æ”¹å¹¶å›žåˆ°æ†ç»‘ç‰ˆæœ¬ï¼Œæ¸…å•ä»ç„¶ä¿å­˜ç€ä¸Šæ¬¡æˆåŠŸåŒæ­¥æ—¶çš„*æ—§* origin hashã€‚ä½ æ–°å¤åˆ¶ç²˜è´´çš„å†…å®¹ï¼ˆå½“å‰æ†ç»‘å“ˆå¸Œï¼‰ä¸Žé‚£ä¸ªè¿‡æ—¶çš„ origin hash ä¸åŒ¹é…ï¼Œå› æ­¤åŒæ­¥ç»§ç»­å°†å…¶æ ‡è®°ä¸ºç”¨æˆ·ä¿®æ”¹ã€‚

`zed skills reset` æ˜¯è§£å†³æ­¤é—®é¢˜çš„æ–¹æ³•ï¼š

```bash
# å®‰å…¨ï¼šæ¸…é™¤æ­¤ skill çš„æ¸…å•æ¡ç›®ã€‚ä½ å½“å‰çš„å‰¯æœ¬è¢«ä¿ç•™ï¼Œ
# ä½†ä¸‹æ¬¡åŒæ­¥ä¼šé‡æ–°ä»¥å…¶ä¸ºåŸºå‡†ï¼Œä½¿æœªæ¥çš„æ›´æ–°æ­£å¸¸å·¥ä½œã€‚
zed skills reset google-workspace

# å®Œå…¨æ¢å¤ï¼šåŒæ—¶åˆ é™¤ä½ çš„æœ¬åœ°å‰¯æœ¬å¹¶é‡æ–°å¤åˆ¶å½“å‰æ†ç»‘ç‰ˆæœ¬ã€‚
# å½“ä½ æƒ³è¦æ¢å¤åŽŸå§‹ä¸Šæ¸¸ skill æ—¶ä½¿ç”¨æ­¤é€‰é¡¹ã€‚
zed skills reset google-workspace --restore

# éžäº¤äº’å¼ï¼ˆä¾‹å¦‚åœ¨è„šæœ¬æˆ– TUI æ¨¡å¼ä¸­ï¼‰â€”â€”è·³è¿‡ --restore ç¡®è®¤ã€‚
zed skills reset google-workspace --restore --yes
```

åŒæ ·çš„å‘½ä»¤ä¹Ÿå¯ä»¥ä½œä¸ºæ–œæ å‘½ä»¤åœ¨èŠå¤©ä¸­ä½¿ç”¨ï¼š

```text
/skills reset google-workspace
/skills reset google-workspace --restore
```

:::note Profiles
æ¯ä¸ª profile åœ¨å…¶è‡ªå·±çš„ `ZED_HOME` ä¸‹æœ‰è‡ªå·±çš„ `.bundled_manifest`ï¼Œå› æ­¤ `zed -p coder skills reset <name>` åªå½±å“è¯¥ profileã€‚
:::

### æ–œæ å‘½ä»¤ï¼ˆåœ¨èŠå¤©ä¸­ï¼‰

æ‰€æœ‰ç›¸åŒçš„å‘½ä»¤éƒ½å¯ä»¥ä½¿ç”¨ `/skills` æ‰§è¡Œï¼š

```text
/skills browse
/skills search react --source skills-sh
/skills search https://mintlify.com/docs --source well-known
/skills inspect skills-sh/vercel-labs/json-render/json-render-react
/skills install openai/skills/skill-creator --force
/skills check
/skills update
/skills reset google-workspace
/skills list
```

å®˜æ–¹å¯é€‰ skills ä»ä½¿ç”¨ `official/security/1password` å’Œ `official/migration/openclaw-migration` ç­‰æ ‡è¯†ç¬¦ã€‚
