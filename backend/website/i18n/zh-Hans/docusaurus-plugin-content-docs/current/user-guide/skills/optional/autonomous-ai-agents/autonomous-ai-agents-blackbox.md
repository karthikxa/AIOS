---
title: "Blackbox â€” å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Blackbox AI CLI ä»£ç†"
sidebar_label: "Blackbox"
description: "å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Blackbox AI CLI ä»£ç†"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Blackbox

å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Blackbox AI CLI ä»£ç†ã€‚è¿™æ˜¯ä¸€ä¸ªå†…ç½®è¯„åˆ¤æœºåˆ¶çš„å¤šæ¨¡åž‹ä»£ç†ï¼Œå¯å°†ä»»åŠ¡åˆ†å‘ç»™å¤šä¸ª LLM å¹¶é€‰å‡ºæœ€ä½³ç»“æžœã€‚éœ€è¦å®‰è£… blackbox CLI åŠ Blackbox AI API å¯†é’¥ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/autonomous-ai-agents/blackbox` å®‰è£… |
| è·¯å¾„ | `optional-skills/autonomous-ai-agents/blackbox` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent (Zed Team) |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Coding-Agent`, `Blackbox`, `Multi-Agent`, `Judge`, `Multi-Model` |
| ç›¸å…³ skill | [`claude-code`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-claude-code), [`codex`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-codex), [`zed-agent`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-zed-agent) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ä»£ç†åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Blackbox CLI

é€šè¿‡ Zed ç»ˆç«¯å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ [Blackbox AI](https://www.blackbox.ai/)ã€‚Blackbox æ˜¯ä¸€ä¸ªå¤šæ¨¡åž‹ç¼–ç ä»£ç† CLIï¼Œå¯å°†ä»»åŠ¡åˆ†å‘ç»™å¤šä¸ª LLMï¼ˆClaudeã€Codexã€Geminiã€Blackbox Proï¼‰ï¼Œå¹¶ä½¿ç”¨è¯„åˆ¤æœºåˆ¶é€‰å‡ºæœ€ä½³å®žçŽ°ã€‚

è¯¥ CLI ä¸º[å¼€æºé¡¹ç›®](https://github.com/blackboxaicode/cli)ï¼ˆGPL-3.0ï¼ŒTypeScriptï¼Œfork è‡ª Gemini CLIï¼‰ï¼Œæ”¯æŒäº¤äº’å¼ä¼šè¯ã€éžäº¤äº’å¼å•æ¬¡æ‰§è¡Œã€æ£€æŸ¥ç‚¹ï¼ˆcheckpointingï¼‰ã€MCP ä»¥åŠè§†è§‰æ¨¡åž‹åˆ‡æ¢ã€‚

## å‰ç½®æ¡ä»¶

- å·²å®‰è£… Node.js 20+
- å·²å®‰è£… Blackbox CLIï¼š`npm install -g @blackboxai/cli`
- æˆ–ä»Žæºç å®‰è£…ï¼š
  ```
  git clone https://github.com/blackboxaicode/cli.git
  cd cli && npm install && npm install -g .
  ```
- ä»Ž [app.blackbox.ai/dashboard](https://app.blackbox.ai/dashboard) èŽ·å– API å¯†é’¥
- é…ç½®ï¼šè¿è¡Œ `blackbox configure` å¹¶è¾“å…¥ API å¯†é’¥
- åœ¨ç»ˆç«¯è°ƒç”¨ä¸­ä½¿ç”¨ `pty=true` â€” Blackbox CLI æ˜¯äº¤äº’å¼ç»ˆç«¯åº”ç”¨

## å•æ¬¡ä»»åŠ¡

```
terminal(command="blackbox --prompt 'Add JWT authentication with refresh tokens to the Express API'", workdir="/path/to/project", pty=true)
```

å¿«é€Ÿä¸´æ—¶å·¥ä½œï¼š
```
terminal(command="cd $(mktemp -d) && git init && blackbox --prompt 'Build a REST API for todos with SQLite'", pty=true)
```

## åŽå°æ¨¡å¼ï¼ˆé•¿æ—¶ä»»åŠ¡ï¼‰

å¯¹äºŽéœ€è¦æ•°åˆ†é’Ÿçš„ä»»åŠ¡ï¼Œä½¿ç”¨åŽå°æ¨¡å¼ä»¥ä¾¿ç›‘æŽ§è¿›åº¦ï¼š

```
# Start in background with PTY
terminal(command="blackbox --prompt 'Refactor the auth module to use OAuth 2.0'", workdir="~/project", background=true, pty=true)
# Returns session_id

# Monitor progress
process(action="poll", session_id="<id>")
process(action="log", session_id="<id>")

# Send input if Blackbox asks a question
process(action="submit", session_id="<id>", data="yes")

# Kill if needed
process(action="kill", session_id="<id>")
```

## æ£€æŸ¥ç‚¹ä¸Žæ¢å¤

Blackbox CLI å†…ç½®æ£€æŸ¥ç‚¹æ”¯æŒï¼Œå¯æš‚åœå¹¶æ¢å¤ä»»åŠ¡ï¼š

```
# After a task completes, Blackbox shows a checkpoint tag
# Resume with a follow-up task:
terminal(command="blackbox --resume-checkpoint 'task-abc123-2026-03-06' --prompt 'Now add rate limiting to the endpoints'", workdir="~/project", pty=true)
```

## ä¼šè¯å‘½ä»¤

åœ¨äº¤äº’å¼ä¼šè¯ä¸­ï¼Œå¯ä½¿ç”¨ä»¥ä¸‹å‘½ä»¤ï¼š

| å‘½ä»¤ | æ•ˆæžœ |
|---------|--------|
| `/compress` | åŽ‹ç¼©å¯¹è¯åŽ†å²ä»¥èŠ‚çœ token |
| `/clear` | æ¸…é™¤åŽ†å²å¹¶é‡æ–°å¼€å§‹ |
| `/stats` | æŸ¥çœ‹å½“å‰ token ç”¨é‡ |
| `Ctrl+C` | å–æ¶ˆå½“å‰æ“ä½œ |

## PR å®¡æŸ¥

å…‹éš†åˆ°ä¸´æ—¶ç›®å½•ä»¥é¿å…ä¿®æ”¹å·¥ä½œæ ‘ï¼š

```
terminal(command="REVIEW=$(mktemp -d) && git clone https://github.com/user/repo.git $REVIEW && cd $REVIEW && gh pr checkout 42 && blackbox --prompt 'Review this PR against main. Check for bugs, security issues, and code quality.'", pty=true)
```

## å¹¶è¡Œå·¥ä½œ

ä¸ºç‹¬ç«‹ä»»åŠ¡å¯åŠ¨å¤šä¸ª Blackbox å®žä¾‹ï¼š

```
terminal(command="blackbox --prompt 'Fix the login bug'", workdir="/tmp/issue-1", background=true, pty=true)
terminal(command="blackbox --prompt 'Add unit tests for auth'", workdir="/tmp/issue-2", background=true, pty=true)

# Monitor all
process(action="list")
```

## å¤šæ¨¡åž‹æ¨¡å¼

Blackbox çš„ç‹¬ç‰¹åŠŸèƒ½æ˜¯å°†åŒä¸€ä»»åŠ¡åˆ†å‘ç»™å¤šä¸ªæ¨¡åž‹å¹¶å¯¹ç»“æžœè¿›è¡Œè¯„åˆ¤ã€‚é€šè¿‡ `blackbox configure` é…ç½®è¦ä½¿ç”¨çš„æ¨¡åž‹ â€” é€‰æ‹©å¤šä¸ªæä¾›å•†ä»¥å¯ç”¨ Chairman/judge å·¥ä½œæµï¼ŒCLI å°†è¯„ä¼°ä¸åŒæ¨¡åž‹çš„è¾“å‡ºå¹¶é€‰å‡ºæœ€ä½³ç»“æžœã€‚

## å…³é”®å‚æ•°

| å‚æ•° | æ•ˆæžœ |
|------|--------|
| `--prompt "task"` | éžäº¤äº’å¼å•æ¬¡æ‰§è¡Œ |
| `--resume-checkpoint "tag"` | ä»Žå·²ä¿å­˜çš„æ£€æŸ¥ç‚¹æ¢å¤ |
| `--yolo` | è‡ªåŠ¨æ‰¹å‡†æ‰€æœ‰æ“ä½œå’Œæ¨¡åž‹åˆ‡æ¢ |
| `blackbox session` | å¯åŠ¨äº¤äº’å¼èŠå¤©ä¼šè¯ |
| `blackbox configure` | æ›´æ”¹è®¾ç½®ã€æä¾›å•†ã€æ¨¡åž‹ |
| `blackbox info` | æ˜¾ç¤ºç³»ç»Ÿä¿¡æ¯ |

## è§†è§‰æ”¯æŒ

Blackbox è‡ªåŠ¨æ£€æµ‹è¾“å…¥ä¸­çš„å›¾åƒï¼Œå¹¶å¯åˆ‡æ¢è‡³å¤šæ¨¡æ€åˆ†æžã€‚VLM æ¨¡å¼ï¼š
- `"once"` â€” ä»…é’ˆå¯¹å½“å‰æŸ¥è¯¢åˆ‡æ¢æ¨¡åž‹
- `"session"` â€” åœ¨æ•´ä¸ªä¼šè¯æœŸé—´åˆ‡æ¢
- `"persist"` â€” ä¿æŒå½“å‰æ¨¡åž‹ï¼ˆä¸åˆ‡æ¢ï¼‰

## Token é™åˆ¶

é€šè¿‡ `.blackboxcli/settings.json` æŽ§åˆ¶ token ç”¨é‡ï¼š
```json
{
  "sessionTokenLimit": 32000
}
```

## è§„åˆ™

1. **å§‹ç»ˆä½¿ç”¨ `pty=true`** â€” Blackbox CLI æ˜¯äº¤äº’å¼ç»ˆç«¯åº”ç”¨ï¼Œæ²¡æœ‰ PTY å°†ä¼šæŒ‚èµ·
2. **ä½¿ç”¨ `workdir`** â€” ç¡®ä¿ä»£ç†ä¸“æ³¨äºŽæ­£ç¡®çš„ç›®å½•
3. **é•¿ä»»åŠ¡ä½¿ç”¨åŽå°æ¨¡å¼** â€” ä½¿ç”¨ `background=true` å¹¶é€šè¿‡ `process` å·¥å…·ç›‘æŽ§
4. **ä¸è¦å¹²é¢„** â€” ä½¿ç”¨ `poll`/`log` ç›‘æŽ§ï¼Œä¸è¦å› ä¸ºé€Ÿåº¦æ…¢å°±ç»ˆæ­¢ä¼šè¯
5. **æŠ¥å‘Šç»“æžœ** â€” å®ŒæˆåŽæ£€æŸ¥å˜æ›´å†…å®¹å¹¶å‘ç”¨æˆ·æ±‡æ€»
6. **ç§¯åˆ†éœ€è¦èŠ±é’±** â€” Blackbox ä½¿ç”¨ç§¯åˆ†åˆ¶ï¼›å¤šæ¨¡åž‹æ¨¡å¼æ¶ˆè€—ç§¯åˆ†æ›´å¿«
7. **æ£€æŸ¥å‰ç½®æ¡ä»¶** â€” åœ¨å°è¯•å§”æ‰˜å‰ç¡®è®¤ `blackbox` CLI å·²å®‰è£…