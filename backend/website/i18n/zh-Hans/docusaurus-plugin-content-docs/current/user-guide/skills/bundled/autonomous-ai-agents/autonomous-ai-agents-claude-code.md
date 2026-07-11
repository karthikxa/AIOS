---
title: "Claude Code â€” å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Claude Code CLIï¼ˆåŠŸèƒ½ã€PRï¼‰"
sidebar_label: "Claude Code"
description: "å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Claude Code CLIï¼ˆåŠŸèƒ½ã€PRï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Claude Code

å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Claude Code CLIï¼ˆåŠŸèƒ½ã€PRï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/autonomous-ai-agents/claude-code` |
| ç‰ˆæœ¬ | `2.2.0` |
| ä½œè€… | Zed Agent + Teknium |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Coding-Agent`, `Claude`, `Anthropic`, `Code-Review`, `Refactoring`, `PTY`, `Automation` |
| ç›¸å…³ skill | [`codex`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-codex), [`zed-agent`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-zed-agent), [`opencode`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-opencode) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Claude Code â€” Zed ç¼–æŽ’æŒ‡å—

é€šè¿‡ Zed ç»ˆç«¯å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ [Claude Code](https://code.claude.com/docs/en/cli-reference)ï¼ˆAnthropic çš„è‡ªä¸»ç¼–ç  agent CLIï¼‰ã€‚Claude Code v2.x å¯ä»¥è‡ªä¸»è¯»å–æ–‡ä»¶ã€ç¼–å†™ä»£ç ã€è¿è¡Œ shell å‘½ä»¤ã€æ´¾ç”Ÿå­ agent å¹¶ç®¡ç† git å·¥ä½œæµã€‚

## å‰ç½®æ¡ä»¶

- **å®‰è£…ï¼š** `npm install -g @anthropic-ai/claude-code`
- **è®¤è¯ï¼š** è¿è¡Œä¸€æ¬¡ `claude` ä»¥ç™»å½•ï¼ˆPro/Max ä½¿ç”¨æµè§ˆå™¨ OAuthï¼Œæˆ–è®¾ç½® `ANTHROPIC_API_KEY`ï¼‰
- **æŽ§åˆ¶å°è®¤è¯ï¼š** `claude auth login --console` ç”¨äºŽ API key è®¡è´¹
- **SSO è®¤è¯ï¼š** `claude auth login --sso` ç”¨äºŽä¼ä¸šç‰ˆ
- **æ£€æŸ¥çŠ¶æ€ï¼š** `claude auth status`ï¼ˆJSONï¼‰æˆ– `claude auth status --text`ï¼ˆäººç±»å¯è¯»ï¼‰
- **å¥åº·æ£€æŸ¥ï¼š** `claude doctor` â€” æ£€æŸ¥è‡ªåŠ¨æ›´æ–°å™¨å’Œå®‰è£…å¥åº·çŠ¶æ€
- **ç‰ˆæœ¬æ£€æŸ¥ï¼š** `claude --version`ï¼ˆéœ€è¦ v2.x+ï¼‰
- **æ›´æ–°ï¼š** `claude update` æˆ– `claude upgrade`

## ä¸¤ç§ç¼–æŽ’æ¨¡å¼

Zed ä»¥ä¸¤ç§æ ¹æœ¬ä¸åŒçš„æ–¹å¼ä¸Ž Claude Code äº¤äº’ã€‚è¯·æ ¹æ®ä»»åŠ¡é€‰æ‹©åˆé€‚çš„æ¨¡å¼ã€‚

### æ¨¡å¼ä¸€ï¼šPrint æ¨¡å¼ï¼ˆ`-p`ï¼‰â€” éžäº¤äº’å¼ï¼ˆå¤§å¤šæ•°ä»»åŠ¡çš„é¦–é€‰ï¼‰

Print æ¨¡å¼è¿è¡Œä¸€æ¬¡æ€§ä»»åŠ¡ï¼Œè¿”å›žç»“æžœåŽé€€å‡ºã€‚æ— éœ€ PTYï¼ˆä¼ªç»ˆç«¯ï¼‰ï¼Œæ— äº¤äº’å¼æç¤ºã€‚è¿™æ˜¯æœ€ç®€æ´çš„é›†æˆæ–¹å¼ã€‚

```
terminal(command="claude -p 'Add error handling to all API calls in src/' --allowedTools 'Read,Edit' --max-turns 10", workdir="/path/to/project", timeout=120)
```

**ä½•æ—¶ä½¿ç”¨ print æ¨¡å¼ï¼š**
- ä¸€æ¬¡æ€§ç¼–ç ä»»åŠ¡ï¼ˆä¿®å¤ bugã€æ·»åŠ åŠŸèƒ½ã€é‡æž„ï¼‰
- CI/CD è‡ªåŠ¨åŒ–å’Œè„šæœ¬
- ä½¿ç”¨ `--json-schema` è¿›è¡Œç»“æž„åŒ–æ•°æ®æå–
- ç®¡é“è¾“å…¥å¤„ç†ï¼ˆ`cat file | claude -p "analyze this"`ï¼‰
- ä»»ä½•ä¸éœ€è¦å¤šè½®å¯¹è¯çš„ä»»åŠ¡

**Print æ¨¡å¼è·³è¿‡æ‰€æœ‰äº¤äº’å¼å¯¹è¯æ¡†** â€” æ— å·¥ä½œåŒºä¿¡ä»»æç¤ºï¼Œæ— æƒé™ç¡®è®¤ã€‚è¿™ä½¿å…¶éžå¸¸é€‚åˆè‡ªåŠ¨åŒ–åœºæ™¯ã€‚

### æ¨¡å¼äºŒï¼šé€šè¿‡ tmux çš„äº¤äº’å¼ PTY â€” å¤šè½®ä¼šè¯

äº¤äº’æ¨¡å¼æä¾›å®Œæ•´çš„å¯¹è¯å¼ REPLï¼ˆäº¤äº’å¼è§£é‡Šå™¨ï¼‰ï¼Œå¯ä»¥å‘é€åŽç»­ promptã€ä½¿ç”¨æ–œæ å‘½ä»¤ï¼Œå¹¶å®žæ—¶è§‚å¯Ÿ Claude çš„å·¥ä½œè¿‡ç¨‹ã€‚**éœ€è¦ tmux ç¼–æŽ’ã€‚**

```
# å¯åŠ¨ tmux ä¼šè¯
terminal(command="tmux new-session -d -s claude-work -x 140 -y 40")

# åœ¨å…¶ä¸­å¯åŠ¨ Claude Code
terminal(command="tmux send-keys -t claude-work 'cd /path/to/project && claude' Enter")

# ç­‰å¾…å¯åŠ¨ï¼Œç„¶åŽå‘é€ä»»åŠ¡
# ï¼ˆç­‰å¾…çº¦ 3-5 ç§’æ˜¾ç¤ºæ¬¢è¿Žç•Œé¢ï¼‰
terminal(command="sleep 5 && tmux send-keys -t claude-work 'Refactor the auth module to use JWT tokens' Enter")

# é€šè¿‡æ•èŽ·é¢æ¿ç›‘æŽ§è¿›åº¦
terminal(command="sleep 15 && tmux capture-pane -t claude-work -p -S -50")

# å‘é€åŽç»­ä»»åŠ¡
terminal(command="tmux send-keys -t claude-work 'Now add unit tests for the new JWT code' Enter")

# å®ŒæˆåŽé€€å‡º
terminal(command="tmux send-keys -t claude-work '/exit' Enter")
```

**ä½•æ—¶ä½¿ç”¨äº¤äº’æ¨¡å¼ï¼š**
- å¤šè½®è¿­ä»£å·¥ä½œï¼ˆé‡æž„ â†’ å®¡æŸ¥ â†’ ä¿®å¤ â†’ æµ‹è¯•å¾ªçŽ¯ï¼‰
- éœ€è¦äººå·¥ä»‹å…¥å†³ç­–çš„ä»»åŠ¡
- æŽ¢ç´¢æ€§ç¼–ç ä¼šè¯
- éœ€è¦ä½¿ç”¨ Claude æ–œæ å‘½ä»¤æ—¶ï¼ˆ`/compact`ã€`/review`ã€`/model`ï¼‰

## PTY å¯¹è¯æ¡†å¤„ç†ï¼ˆäº¤äº’æ¨¡å¼çš„å…³é”®ï¼‰

Claude Code åœ¨é¦–æ¬¡å¯åŠ¨æ—¶æœ€å¤šä¼šæ˜¾ç¤ºä¸¤ä¸ªç¡®è®¤å¯¹è¯æ¡†ã€‚**å¿…é¡»**é€šè¿‡ tmux send-keys å¤„ç†è¿™äº›å¯¹è¯æ¡†ã€‚

### å¯¹è¯æ¡†ä¸€ï¼šå·¥ä½œåŒºä¿¡ä»»ï¼ˆé¦–æ¬¡è®¿é—®æŸç›®å½•æ—¶ï¼‰
```
â¯ 1. Yes, I trust this folder    â† é»˜è®¤ï¼ˆç›´æŽ¥æŒ‰ Enterï¼‰
  2. No, exit
```
**å¤„ç†æ–¹å¼ï¼š** `tmux send-keys -t <session> Enter` â€” é»˜è®¤é€‰é¡¹æ­£ç¡®ã€‚

### å¯¹è¯æ¡†äºŒï¼šç»•è¿‡æƒé™è­¦å‘Šï¼ˆä»…åœ¨ä½¿ç”¨ --dangerously-skip-permissions æ—¶ï¼‰
```
â¯ 1. No, exit                    â† é»˜è®¤ï¼ˆé”™è¯¯é€‰é¡¹ï¼ï¼‰
  2. Yes, I accept
```
**å¤„ç†æ–¹å¼ï¼š** å¿…é¡»å…ˆå‘ä¸‹å¯¼èˆªï¼Œå†æŒ‰ Enterï¼š
```
tmux send-keys -t <session> Down && sleep 0.3 && tmux send-keys -t <session> Enter
```

### å¥å£®çš„å¯¹è¯æ¡†å¤„ç†æ¨¡å¼
```
# ä½¿ç”¨æƒé™ç»•è¿‡å¯åŠ¨
terminal(command="tmux send-keys -t claude-work 'claude --dangerously-skip-permissions \"your task\"' Enter")

# å¤„ç†ä¿¡ä»»å¯¹è¯æ¡†ï¼ˆæŒ‰ Enter é€‰æ‹©é»˜è®¤çš„"Yes"ï¼‰
terminal(command="sleep 4 && tmux send-keys -t claude-work Enter")

# å¤„ç†æƒé™å¯¹è¯æ¡†ï¼ˆæŒ‰ Down å†æŒ‰ Enter é€‰æ‹©"Yes, I accept"ï¼‰
terminal(command="sleep 3 && tmux send-keys -t claude-work Down && sleep 0.3 && tmux send-keys -t claude-work Enter")

# ç­‰å¾… Claude å·¥ä½œ
terminal(command="sleep 15 && tmux capture-pane -t claude-work -p -S -60")
```

**æ³¨æ„ï¼š** æŸä¸ªç›®å½•é¦–æ¬¡æŽ¥å—ä¿¡ä»»åŽï¼Œä¿¡ä»»å¯¹è¯æ¡†ä¸ä¼šå†æ¬¡å‡ºçŽ°ã€‚åªæœ‰æƒé™å¯¹è¯æ¡†ä¼šåœ¨æ¯æ¬¡ä½¿ç”¨ `--dangerously-skip-permissions` æ—¶é‡å¤å‡ºçŽ°ã€‚

## CLI å­å‘½ä»¤

| å­å‘½ä»¤ | ç”¨é€” |
|------------|---------|
| `claude` | å¯åŠ¨äº¤äº’å¼ REPL |
| `claude "query"` | ä»¥åˆå§‹ prompt å¯åŠ¨ REPL |
| `claude -p "query"` | Print æ¨¡å¼ï¼ˆéžäº¤äº’å¼ï¼Œå®ŒæˆåŽé€€å‡ºï¼‰ |
| `cat file \| claude -p "query"` | é€šè¿‡ç®¡é“ä¼ å…¥å†…å®¹ä½œä¸º stdin ä¸Šä¸‹æ–‡ |
| `claude -c` | ç»§ç»­æ­¤ç›®å½•ä¸­æœ€è¿‘çš„å¯¹è¯ |
| `claude -r "id"` | é€šè¿‡ ID æˆ–åç§°æ¢å¤ç‰¹å®šä¼šè¯ |
| `claude auth login` | ç™»å½•ï¼ˆæ·»åŠ  `--console` ç”¨äºŽ API è®¡è´¹ï¼Œ`--sso` ç”¨äºŽä¼ä¸šç‰ˆï¼‰ |
| `claude auth status` | æ£€æŸ¥ç™»å½•çŠ¶æ€ï¼ˆè¿”å›ž JSONï¼›`--text` ä¸ºäººç±»å¯è¯»æ ¼å¼ï¼‰ |
| `claude mcp add <name> -- <cmd>` | æ·»åŠ  MCP æœåŠ¡å™¨ |
| `claude mcp list` | åˆ—å‡ºå·²é…ç½®çš„ MCP æœåŠ¡å™¨ |
| `claude mcp remove <name>` | ç§»é™¤ MCP æœåŠ¡å™¨ |
| `claude agents` | åˆ—å‡ºå·²é…ç½®çš„ agent |
| `claude doctor` | å¯¹å®‰è£…å’Œè‡ªåŠ¨æ›´æ–°å™¨è¿è¡Œå¥åº·æ£€æŸ¥ |
| `claude update` / `claude upgrade` | å°† Claude Code æ›´æ–°åˆ°æœ€æ–°ç‰ˆæœ¬ |
| `claude remote-control` | å¯åŠ¨æœåŠ¡å™¨ä»¥ä»Ž claude.ai æˆ–ç§»åŠ¨åº”ç”¨æŽ§åˆ¶ Claude |
| `claude install [target]` | å®‰è£…åŽŸç”Ÿæž„å»ºï¼ˆstableã€latest æˆ–ç‰¹å®šç‰ˆæœ¬ï¼‰ |
| `claude setup-token` | è®¾ç½®é•¿æœŸè®¤è¯ tokenï¼ˆéœ€è¦è®¢é˜…ï¼‰ |
| `claude plugin` / `claude plugins` | ç®¡ç† Claude Code æ’ä»¶ |
| `claude auto-mode` | æ£€æŸ¥è‡ªåŠ¨æ¨¡å¼åˆ†ç±»å™¨é…ç½® |

## Print æ¨¡å¼æ·±åº¦è§£æž

### ç»“æž„åŒ– JSON è¾“å‡º
```
terminal(command="claude -p 'Analyze auth.py for security issues' --output-format json --max-turns 5", workdir="/project", timeout=120)
```

è¿”å›žåŒ…å«ä»¥ä¸‹å­—æ®µçš„ JSON å¯¹è±¡ï¼š
```json
{
  "type": "result",
  "subtype": "success",
  "result": "The analysis text...",
  "session_id": "75e2167f-...",
  "num_turns": 3,
  "total_cost_usd": 0.0787,
  "duration_ms": 10276,
  "stop_reason": "end_turn",
  "terminal_reason": "completed",
  "usage": { "input_tokens": 5, "output_tokens": 603, ... },
  "modelUsage": { "claude-sonnet-4-6": { "costUSD": 0.078, "contextWindow": 200000 } }
}
```

**å…³é”®å­—æ®µï¼š** `session_id` ç”¨äºŽæ¢å¤ä¼šè¯ï¼Œ`num_turns` è¡¨ç¤º agentic å¾ªçŽ¯æ¬¡æ•°ï¼Œ`total_cost_usd` ç”¨äºŽè´¹ç”¨è¿½è¸ªï¼Œ`subtype` ç”¨äºŽæˆåŠŸ/é”™è¯¯æ£€æµ‹ï¼ˆ`success`ã€`error_max_turns`ã€`error_budget`ï¼‰ã€‚

### æµå¼ JSON è¾“å‡º
å¦‚éœ€å®žæ—¶ token æµå¼ä¼ è¾“ï¼Œä½¿ç”¨ `stream-json` é…åˆ `--verbose`ï¼š
```
terminal(command="claude -p 'Write a summary' --output-format stream-json --verbose --include-partial-messages", timeout=60)
```

è¿”å›žæ¢è¡Œç¬¦åˆ†éš”çš„ JSON äº‹ä»¶ã€‚ä½¿ç”¨ jq è¿‡æ»¤å®žæ—¶æ–‡æœ¬ï¼š
```
claude -p "Explain X" --output-format stream-json --verbose --include-partial-messages | \
  jq -rj 'select(.type == "stream_event" and .event.delta.type? == "text_delta") | .event.delta.text'
```

æµäº‹ä»¶åŒ…å« `system/api_retry`ï¼Œå¸¦æœ‰ `attempt`ã€`max_retries` å’Œ `error` å­—æ®µï¼ˆä¾‹å¦‚ `rate_limit`ã€`billing_error`ï¼‰ã€‚

### åŒå‘æµå¼ä¼ è¾“
å¦‚éœ€å®žæ—¶è¾“å…¥å’Œè¾“å‡ºæµå¼ä¼ è¾“ï¼š
```
claude -p "task" --input-format stream-json --output-format stream-json --replay-user-messages
```
`--replay-user-messages` åœ¨ stdout ä¸Šé‡æ–°å‘å‡ºç”¨æˆ·æ¶ˆæ¯ä»¥ä¾›ç¡®è®¤ã€‚

### ç®¡é“è¾“å…¥
```
# é€šè¿‡ç®¡é“ä¼ å…¥æ–‡ä»¶è¿›è¡Œåˆ†æž
terminal(command="cat src/auth.py | claude -p 'Review this code for bugs' --max-turns 1", timeout=60)

# é€šè¿‡ç®¡é“ä¼ å…¥å¤šä¸ªæ–‡ä»¶
terminal(command="cat src/*.py | claude -p 'Find all TODO comments' --max-turns 1", timeout=60)

# é€šè¿‡ç®¡é“ä¼ å…¥å‘½ä»¤è¾“å‡º
terminal(command="git diff HEAD~3 | claude -p 'Summarize these changes' --max-turns 1", timeout=60)
```

### ä½¿ç”¨ JSON Schema è¿›è¡Œç»“æž„åŒ–æå–
```
terminal(command="claude -p 'List all functions in src/' --output-format json --json-schema '{\"type\":\"object\",\"properties\":{\"functions\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}}},\"required\":[\"functions\"]}' --max-turns 5", workdir="/project", timeout=90)
```

ä»Ž JSON ç»“æžœä¸­è§£æž `structured_output`ã€‚Claude åœ¨è¿”å›žå‰ä¼šæ ¹æ® schema éªŒè¯è¾“å‡ºã€‚

### ä¼šè¯ç»­æŽ¥
```
# å¼€å§‹ä¸€ä¸ªä»»åŠ¡
terminal(command="claude -p 'Start refactoring the database layer' --output-format json --max-turns 10 > /tmp/session.json", workdir="/project", timeout=180)

# ä½¿ç”¨ä¼šè¯ ID æ¢å¤
terminal(command="claude -p 'Continue and add connection pooling' --resume $(cat /tmp/session.json | python3 -c 'import json,sys; print(json.load(sys.stdin)[\"session_id\"])') --max-turns 5", workdir="/project", timeout=120)

# æˆ–æ¢å¤åŒä¸€ç›®å½•ä¸­æœ€è¿‘çš„ä¼šè¯
terminal(command="claude -p 'What did you do last time?' --continue --max-turns 1", workdir="/project", timeout=30)

# æ´¾ç”Ÿä¼šè¯ï¼ˆæ–° IDï¼Œä¿ç•™åŽ†å²ï¼‰
terminal(command="claude -p 'Try a different approach' --resume <id> --fork-session --max-turns 10", workdir="/project", timeout=120)
```

### CI/è„šæœ¬çš„ç²¾ç®€æ¨¡å¼
```
terminal(command="claude --bare -p 'Run all tests and report failures' --allowedTools 'Read,Bash' --max-turns 10", workdir="/project", timeout=180)
```

`--bare` è·³è¿‡ hookã€æ’ä»¶ã€MCP å‘çŽ°å’Œ CLAUDE.md åŠ è½½ã€‚å¯åŠ¨æœ€å¿«ã€‚éœ€è¦ `ANTHROPIC_API_KEY`ï¼ˆè·³è¿‡ OAuthï¼‰ã€‚

åœ¨ç²¾ç®€æ¨¡å¼ä¸‹é€‰æ‹©æ€§åŠ è½½ä¸Šä¸‹æ–‡ï¼š
| è¦åŠ è½½çš„å†…å®¹ | æ ‡å¿— |
|---------|------|
| ç³»ç»Ÿ prompt è¿½åŠ å†…å®¹ | `--append-system-prompt "text"` æˆ– `--append-system-prompt-file path` |
| è®¾ç½® | `--settings <file-or-json>` |
| MCP æœåŠ¡å™¨ | `--mcp-config <file-or-json>` |
| è‡ªå®šä¹‰ agent | `--agents '<json>'` |

### è¿‡è½½æ—¶çš„å¤‡ç”¨æ¨¡åž‹
```
terminal(command="claude -p 'task' --fallback-model haiku --max-turns 5", timeout=90)
```
å½“é»˜è®¤æ¨¡åž‹è¿‡è½½æ—¶è‡ªåŠ¨åˆ‡æ¢åˆ°æŒ‡å®šæ¨¡åž‹ï¼ˆä»…é™ print æ¨¡å¼ï¼‰ã€‚

## å®Œæ•´ CLI æ ‡å¿—å‚è€ƒ

### ä¼šè¯ä¸ŽçŽ¯å¢ƒ
| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `-p, --print` | éžäº¤äº’å¼ä¸€æ¬¡æ€§æ¨¡å¼ï¼ˆå®ŒæˆåŽé€€å‡ºï¼‰ |
| `-c, --continue` | æ¢å¤å½“å‰ç›®å½•ä¸­æœ€è¿‘çš„å¯¹è¯ |
| `-r, --resume <id>` | é€šè¿‡ ID æˆ–åç§°æ¢å¤ç‰¹å®šä¼šè¯ï¼ˆæ—  ID æ—¶æ˜¾ç¤ºäº¤äº’å¼é€‰æ‹©å™¨ï¼‰ |
| `--fork-session` | æ¢å¤æ—¶åˆ›å»ºæ–°ä¼šè¯ ID è€Œéžå¤ç”¨åŽŸå§‹ ID |
| `--session-id <uuid>` | ä¸ºå¯¹è¯ä½¿ç”¨ç‰¹å®š UUID |
| `--no-session-persistence` | ä¸å°†ä¼šè¯ä¿å­˜åˆ°ç£ç›˜ï¼ˆä»…é™ print æ¨¡å¼ï¼‰ |
| `--add-dir <paths...>` | æŽˆäºˆ Claude è®¿é—®é¢å¤–å·¥ä½œç›®å½•çš„æƒé™ |
| `-w, --worktree [name]` | åœ¨ `.claude/worktrees/<name>` å¤„çš„éš”ç¦» git worktree ä¸­è¿è¡Œ |
| `--tmux` | ä¸º worktree åˆ›å»º tmux ä¼šè¯ï¼ˆéœ€è¦ `--worktree`ï¼‰ |
| `--ide` | å¯åŠ¨æ—¶è‡ªåŠ¨è¿žæŽ¥åˆ°æœ‰æ•ˆçš„ IDE |
| `--chrome` / `--no-chrome` | å¯ç”¨/ç¦ç”¨ Chrome æµè§ˆå™¨é›†æˆä»¥è¿›è¡Œ Web æµ‹è¯• |
| `--from-pr [number]` | æ¢å¤ä¸Žç‰¹å®š GitHub PR å…³è”çš„ä¼šè¯ |
| `--file <specs...>` | å¯åŠ¨æ—¶ä¸‹è½½çš„æ–‡ä»¶èµ„æºï¼ˆæ ¼å¼ï¼š`file_id:relative_path`ï¼‰ |

### æ¨¡åž‹ä¸Žæ€§èƒ½
| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `--model <alias>` | æ¨¡åž‹é€‰æ‹©ï¼š`sonnet`ã€`opus`ã€`haiku` æˆ–å®Œæ•´åç§°å¦‚ `claude-sonnet-4-6` |
| `--effort <level>` | æŽ¨ç†æ·±åº¦ï¼š`low`ã€`medium`ã€`high`ã€`max`ã€`auto` |
| `--max-turns <n>` | é™åˆ¶ agentic å¾ªçŽ¯æ¬¡æ•°ï¼ˆä»…é™ print æ¨¡å¼ï¼›é˜²æ­¢å¤±æŽ§ï¼‰ |
| `--max-budget-usd <n>` | ä»¥ç¾Žå…ƒä¸ºå•ä½é™åˆ¶ API èŠ±è´¹ï¼ˆä»…é™ print æ¨¡å¼ï¼‰ |
| `--fallback-model <model>` | é»˜è®¤æ¨¡åž‹è¿‡è½½æ—¶è‡ªåŠ¨åˆ‡æ¢ï¼ˆä»…é™ print æ¨¡å¼ï¼‰ |
| `--betas <betas...>` | åœ¨ API è¯·æ±‚ä¸­åŒ…å«çš„ beta å¤´ï¼ˆä»…é™ API key ç”¨æˆ·ï¼‰ |

### æƒé™ä¸Žå®‰å…¨
| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `--dangerously-skip-permissions` | è‡ªåŠ¨æ‰¹å‡†æ‰€æœ‰å·¥å…·ä½¿ç”¨ï¼ˆæ–‡ä»¶å†™å…¥ã€bashã€ç½‘ç»œç­‰ï¼‰ |
| `--allow-dangerously-skip-permissions` | å°†ç»•è¿‡ä½œä¸º*é€‰é¡¹*å¯ç”¨ï¼Œä½†ä¸é»˜è®¤å¯ç”¨ |
| `--permission-mode <mode>` | `default`ã€`acceptEdits`ã€`plan`ã€`auto`ã€`dontAsk`ã€`bypassPermissions` |
| `--allowedTools <tools...>` | ç™½åå•ç‰¹å®šå·¥å…·ï¼ˆé€—å·æˆ–ç©ºæ ¼åˆ†éš”ï¼‰ |
| `--disallowedTools <tools...>` | é»‘åå•ç‰¹å®šå·¥å…· |
| `--tools <tools...>` | è¦†ç›–å†…ç½®å·¥å…·é›†ï¼ˆ`""` = æ— ï¼Œ`"default"` = å…¨éƒ¨ï¼Œæˆ–å·¥å…·åç§°ï¼‰ |

### è¾“å‡ºä¸Žè¾“å…¥æ ¼å¼
| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `--output-format <fmt>` | `text`ï¼ˆé»˜è®¤ï¼‰ã€`json`ï¼ˆå•ä¸ªç»“æžœå¯¹è±¡ï¼‰ã€`stream-json`ï¼ˆæ¢è¡Œç¬¦åˆ†éš”ï¼‰ |
| `--input-format <fmt>` | `text`ï¼ˆé»˜è®¤ï¼‰æˆ– `stream-json`ï¼ˆå®žæ—¶æµå¼è¾“å…¥ï¼‰ |
| `--json-schema <schema>` | å¼ºåˆ¶è¾“å‡ºç¬¦åˆ schema çš„ç»“æž„åŒ– JSON |
| `--verbose` | å®Œæ•´çš„é€è½®è¾“å‡º |
| `--include-partial-messages` | åœ¨æ¶ˆæ¯å—åˆ°è¾¾æ—¶åŒ…å«éƒ¨åˆ†æ¶ˆæ¯ï¼ˆstream-json + printï¼‰ |
| `--replay-user-messages` | åœ¨ stdout ä¸Šé‡æ–°å‘å‡ºç”¨æˆ·æ¶ˆæ¯ï¼ˆstream-json åŒå‘ï¼‰ |

### ç³»ç»Ÿ Prompt ä¸Žä¸Šä¸‹æ–‡
| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `--append-system-prompt <text>` | **è¿½åŠ **åˆ°é»˜è®¤ç³»ç»Ÿ promptï¼ˆä¿ç•™å†…ç½®èƒ½åŠ›ï¼‰ |
| `--append-system-prompt-file <path>` | **è¿½åŠ **æ–‡ä»¶å†…å®¹åˆ°é»˜è®¤ç³»ç»Ÿ prompt |
| `--system-prompt <text>` | **æ›¿æ¢**æ•´ä¸ªç³»ç»Ÿ promptï¼ˆé€šå¸¸å»ºè®®ä½¿ç”¨ --appendï¼‰ |
| `--system-prompt-file <path>` | ç”¨æ–‡ä»¶å†…å®¹**æ›¿æ¢**ç³»ç»Ÿ prompt |
| `--bare` | è·³è¿‡ hookã€æ’ä»¶ã€MCP å‘çŽ°ã€CLAUDE.mdã€OAuthï¼ˆå¯åŠ¨æœ€å¿«ï¼‰ |
| `--agents '<json>'` | ä»¥ JSON å½¢å¼åŠ¨æ€å®šä¹‰è‡ªå®šä¹‰å­ agent |
| `--mcp-config <path>` | ä»Ž JSON æ–‡ä»¶åŠ è½½ MCP æœåŠ¡å™¨ï¼ˆå¯é‡å¤ä½¿ç”¨ï¼‰ |
| `--strict-mcp-config` | ä»…ä½¿ç”¨ `--mcp-config` ä¸­çš„ MCP æœåŠ¡å™¨ï¼Œå¿½ç•¥æ‰€æœ‰å…¶ä»– MCP é…ç½® |
| `--settings <file-or-json>` | ä»Ž JSON æ–‡ä»¶æˆ–å†…è” JSON åŠ è½½é¢å¤–è®¾ç½® |
| `--setting-sources <sources>` | é€—å·åˆ†éš”çš„åŠ è½½æ¥æºï¼š`user`ã€`project`ã€`local` |
| `--plugin-dir <paths...>` | ä»…åœ¨æœ¬æ¬¡ä¼šè¯ä¸­ä»Žç›®å½•åŠ è½½æ’ä»¶ |
| `--disable-slash-commands` | ç¦ç”¨æ‰€æœ‰ skill/æ–œæ å‘½ä»¤ |

### è°ƒè¯•
| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `-d, --debug [filter]` | å¯ç”¨è°ƒè¯•æ—¥å¿—ï¼Œå¯é€‰ç±»åˆ«è¿‡æ»¤å™¨ï¼ˆä¾‹å¦‚ `"api,hooks"`ã€`"!1p,!file"`ï¼‰ |
| `--debug-file <path>` | å°†è°ƒè¯•æ—¥å¿—å†™å…¥æ–‡ä»¶ï¼ˆéšå¼å¯ç”¨è°ƒè¯•æ¨¡å¼ï¼‰ |

### Agent å›¢é˜Ÿ
| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `--teammate-mode <mode>` | agent å›¢é˜Ÿçš„æ˜¾ç¤ºæ–¹å¼ï¼š`auto`ã€`in-process` æˆ– `tmux` |
| `--brief` | å¯ç”¨ `SendUserMessage` å·¥å…·ç”¨äºŽ agent é—´é€šä¿¡ |

### --allowedTools / --disallowedTools çš„å·¥å…·åç§°è¯­æ³•
```
Read                    # æ‰€æœ‰æ–‡ä»¶è¯»å–
Edit                    # æ–‡ä»¶ç¼–è¾‘ï¼ˆçŽ°æœ‰æ–‡ä»¶ï¼‰
Write                   # æ–‡ä»¶åˆ›å»ºï¼ˆæ–°æ–‡ä»¶ï¼‰
Bash                    # æ‰€æœ‰ shell å‘½ä»¤
Bash(git *)             # ä»… git å‘½ä»¤
Bash(git commit *)      # ä»… git commit å‘½ä»¤
Bash(npm run lint:*)    # ä½¿ç”¨é€šé…ç¬¦çš„æ¨¡å¼åŒ¹é…
WebSearch               # Web æœç´¢èƒ½åŠ›
WebFetch                # Web é¡µé¢æŠ“å–
mcp__<server>__<tool>   # ç‰¹å®š MCP å·¥å…·
```

## è®¾ç½®ä¸Žé…ç½®

### è®¾ç½®ä¼˜å…ˆçº§ï¼ˆä»Žé«˜åˆ°ä½Žï¼‰
1. **CLI æ ‡å¿—** â€” è¦†ç›–æ‰€æœ‰è®¾ç½®
2. **æœ¬åœ°é¡¹ç›®ï¼š** `.claude/settings.local.json`ï¼ˆä¸ªäººï¼Œå·² gitignoreï¼‰
3. **é¡¹ç›®ï¼š** `.claude/settings.json`ï¼ˆå…±äº«ï¼Œgit è·Ÿè¸ªï¼‰
4. **ç”¨æˆ·ï¼š** `~/.claude/settings.json`ï¼ˆå…¨å±€ï¼‰

### è®¾ç½®ä¸­çš„æƒé™
```json
{
  "permissions": {
    "allow": ["Bash(npm run lint:*)", "WebSearch", "Read"],
    "ask": ["Write(*.ts)", "Bash(git push*)"],
    "deny": ["Read(.env)", "Bash(rm -rf *)"]
  }
}
```

### è®°å¿†æ–‡ä»¶ï¼ˆCLAUDE.mdï¼‰å±‚çº§
1. **å…¨å±€ï¼š** `~/.claude/CLAUDE.md` â€” é€‚ç”¨äºŽæ‰€æœ‰é¡¹ç›®
2. **é¡¹ç›®ï¼š** `./CLAUDE.md` â€” é¡¹ç›®ç‰¹å®šä¸Šä¸‹æ–‡ï¼ˆgit è·Ÿè¸ªï¼‰
3. **æœ¬åœ°ï¼š** `.claude/CLAUDE.local.md` â€” ä¸ªäººé¡¹ç›®è¦†ç›–ï¼ˆå·² gitignoreï¼‰

åœ¨äº¤äº’æ¨¡å¼ä¸­ä½¿ç”¨ `#` å‰ç¼€å¿«é€Ÿæ·»åŠ åˆ°è®°å¿†ï¼š`# Always use 2-space indentation`ã€‚

## äº¤äº’ä¼šè¯ï¼šæ–œæ å‘½ä»¤

### ä¼šè¯ä¸Žä¸Šä¸‹æ–‡
| å‘½ä»¤ | ç”¨é€” |
|---------|---------|
| `/help` | æ˜¾ç¤ºæ‰€æœ‰å‘½ä»¤ï¼ˆåŒ…æ‹¬è‡ªå®šä¹‰å’Œ MCP å‘½ä»¤ï¼‰ |
| `/compact [focus]` | åŽ‹ç¼©ä¸Šä¸‹æ–‡ä»¥èŠ‚çœ tokenï¼›CLAUDE.md åœ¨åŽ‹ç¼©åŽä¿ç•™ã€‚ä¾‹å¦‚ `/compact focus on auth logic` |
| `/clear` | æ¸…é™¤å¯¹è¯åŽ†å²ï¼Œé‡æ–°å¼€å§‹ |
| `/context` | ä»¥å½©è‰²ç½‘æ ¼å¯è§†åŒ–ä¸Šä¸‹æ–‡ä½¿ç”¨æƒ…å†µå¹¶æä¾›ä¼˜åŒ–å»ºè®® |
| `/cost` | æŸ¥çœ‹ token ä½¿ç”¨æƒ…å†µï¼ŒåŒ…å«æŒ‰æ¨¡åž‹å’Œç¼“å­˜å‘½ä¸­çš„ç»†åˆ† |
| `/resume` | åˆ‡æ¢åˆ°æˆ–æ¢å¤ä¸åŒçš„ä¼šè¯ |
| `/rewind` | å›žé€€åˆ°å¯¹è¯æˆ–ä»£ç ä¸­çš„ä¸Šä¸€ä¸ªæ£€æŸ¥ç‚¹ |
| `/btw <question>` | æé—®é™„å¸¦é—®é¢˜è€Œä¸å¢žåŠ ä¸Šä¸‹æ–‡æˆæœ¬ |
| `/status` | æ˜¾ç¤ºç‰ˆæœ¬ã€è¿žæŽ¥çŠ¶æ€å’Œä¼šè¯ä¿¡æ¯ |
| `/todos` | åˆ—å‡ºå¯¹è¯ä¸­è·Ÿè¸ªçš„å¾…åŠžäº‹é¡¹ |
| `/exit` æˆ– `Ctrl+D` | ç»“æŸä¼šè¯ |

### å¼€å‘ä¸Žå®¡æŸ¥
| å‘½ä»¤ | ç”¨é€” |
|---------|---------|
| `/review` | è¯·æ±‚å¯¹å½“å‰æ›´æ”¹è¿›è¡Œä»£ç å®¡æŸ¥ |
| `/security-review` | å¯¹å½“å‰æ›´æ”¹æ‰§è¡Œå®‰å…¨åˆ†æž |
| `/plan [description]` | è¿›å…¥ Plan æ¨¡å¼å¹¶è‡ªåŠ¨å¯åŠ¨ä»»åŠ¡è§„åˆ’ |
| `/loop [interval]` | åœ¨ä¼šè¯ä¸­å®‰æŽ’å®šæœŸä»»åŠ¡ |
| `/batch` | è‡ªåŠ¨åˆ›å»º worktree ç”¨äºŽå¤§åž‹å¹¶è¡Œæ›´æ”¹ï¼ˆ5-30 ä¸ª worktreeï¼‰ |

### é…ç½®ä¸Žå·¥å…·
| å‘½ä»¤ | ç”¨é€” |
|---------|---------|
| `/model [model]` | åœ¨ä¼šè¯ä¸­é€”åˆ‡æ¢æ¨¡åž‹ï¼ˆä½¿ç”¨æ–¹å‘é”®è°ƒæ•´ effortï¼‰ |
| `/effort [level]` | è®¾ç½®æŽ¨ç† effortï¼š`low`ã€`medium`ã€`high`ã€`max` æˆ– `auto` |
| `/init` | åˆ›å»º CLAUDE.md æ–‡ä»¶ç”¨äºŽé¡¹ç›®è®°å¿† |
| `/memory` | æ‰“å¼€ CLAUDE.md è¿›è¡Œç¼–è¾‘ |
| `/config` | æ‰“å¼€äº¤äº’å¼è®¾ç½®é…ç½® |
| `/permissions` | æŸ¥çœ‹/æ›´æ–°å·¥å…·æƒé™ |
| `/agents` | ç®¡ç†ä¸“ç”¨å­ agent |
| `/mcp` | ç®¡ç† MCP æœåŠ¡å™¨çš„äº¤äº’å¼ UI |
| `/add-dir` | æ·»åŠ é¢å¤–å·¥ä½œç›®å½•ï¼ˆé€‚ç”¨äºŽ monorepoï¼‰ |
| `/usage` | æ˜¾ç¤ºè®¡åˆ’é™åˆ¶å’Œé€ŸçŽ‡é™åˆ¶çŠ¶æ€ |
| `/voice` | å¯ç”¨æŒ‰é”®è¯´è¯è¯­éŸ³æ¨¡å¼ï¼ˆ20 ç§è¯­è¨€ï¼›æŒ‰ä½ Space å½•éŸ³ï¼Œæ¾å¼€å‘é€ï¼‰ |
| `/release-notes` | ç‰ˆæœ¬å‘å¸ƒè¯´æ˜Žçš„äº¤äº’å¼é€‰æ‹©å™¨ |

### è‡ªå®šä¹‰æ–œæ å‘½ä»¤
åˆ›å»º `.claude/commands/<name>.md`ï¼ˆé¡¹ç›®å…±äº«ï¼‰æˆ– `~/.claude/commands/<name>.md`ï¼ˆä¸ªäººï¼‰ï¼š

```markdown
# .claude/commands/deploy.md
Run the deploy pipeline:
1. Run all tests
2. Build the Docker image
3. Push to registry
4. Update the $ARGUMENTS environment (default: staging)
```

ç”¨æ³•ï¼š`/deploy production` â€” `$ARGUMENTS` å°†è¢«ç”¨æˆ·è¾“å…¥æ›¿æ¢ã€‚

### Skillsï¼ˆè‡ªç„¶è¯­è¨€è°ƒç”¨ï¼‰
ä¸Žæ–œæ å‘½ä»¤ï¼ˆæ‰‹åŠ¨è°ƒç”¨ï¼‰ä¸åŒï¼Œ`.claude/skills/` ä¸­çš„ skill æ˜¯ markdown æŒ‡å—ï¼Œå½“ä»»åŠ¡åŒ¹é…æ—¶ Claude ä¼šé€šè¿‡è‡ªç„¶è¯­è¨€è‡ªåŠ¨è°ƒç”¨ï¼š

```markdown
# .claude/skills/database-migration.md
When asked to create or modify database migrations:
1. Use Alembic for migration generation
2. Always create a rollback function
3. Test migrations against a local database copy
```

## äº¤äº’ä¼šè¯ï¼šé”®ç›˜å¿«æ·é”®

### é€šç”¨æŽ§åˆ¶
| æŒ‰é”® | æ“ä½œ |
|-----|--------|
| `Ctrl+C` | å–æ¶ˆå½“å‰è¾“å…¥æˆ–ç”Ÿæˆ |
| `Ctrl+D` | é€€å‡ºä¼šè¯ |
| `Ctrl+R` | åå‘æœç´¢å‘½ä»¤åŽ†å² |
| `Ctrl+B` | å°†è¿è¡Œä¸­çš„ä»»åŠ¡ç§»è‡³åŽå° |
| `Ctrl+V` | å°†å›¾ç‰‡ç²˜è´´åˆ°å¯¹è¯ä¸­ |
| `Ctrl+O` | è½¬å½•æ¨¡å¼ â€” æŸ¥çœ‹ Claude çš„æ€è€ƒè¿‡ç¨‹ |
| `Ctrl+G` æˆ– `Ctrl+X Ctrl+E` | åœ¨å¤–éƒ¨ç¼–è¾‘å™¨ä¸­æ‰“å¼€ prompt |
| `Esc Esc` | å›žé€€å¯¹è¯æˆ–ä»£ç çŠ¶æ€/æ€»ç»“ |

### æ¨¡å¼åˆ‡æ¢
| æŒ‰é”® | æ“ä½œ |
|-----|--------|
| `Shift+Tab` | å¾ªçŽ¯åˆ‡æ¢æƒé™æ¨¡å¼ï¼ˆæ™®é€š â†’ è‡ªåŠ¨æŽ¥å— â†’ è®¡åˆ’ï¼‰ |
| `Alt+P` | åˆ‡æ¢æ¨¡åž‹ |
| `Alt+T` | åˆ‡æ¢æ€è€ƒæ¨¡å¼ |
| `Alt+O` | åˆ‡æ¢å¿«é€Ÿæ¨¡å¼ |

### å¤šè¡Œè¾“å…¥
| æŒ‰é”® | æ“ä½œ |
|-----|--------|
| `\` + `Enter` | å¿«é€Ÿæ¢è¡Œ |
| `Shift+Enter` | æ¢è¡Œï¼ˆå¤‡é€‰ï¼‰ |
| `Ctrl+J` | æ¢è¡Œï¼ˆå¤‡é€‰ï¼‰ |

### è¾“å…¥å‰ç¼€
| å‰ç¼€ | æ“ä½œ |
|--------|--------|
| `!` | ç›´æŽ¥æ‰§è¡Œ bashï¼Œç»•è¿‡ AIï¼ˆä¾‹å¦‚ `!npm test`ï¼‰ã€‚å•ç‹¬ä½¿ç”¨ `!` å¯åˆ‡æ¢ shell æ¨¡å¼ã€‚ |
| `@` | é€šè¿‡è‡ªåŠ¨è¡¥å…¨å¼•ç”¨æ–‡ä»¶/ç›®å½•ï¼ˆä¾‹å¦‚ `@./src/api/`ï¼‰ |
| `#` | å¿«é€Ÿæ·»åŠ åˆ° CLAUDE.md è®°å¿†ï¼ˆä¾‹å¦‚ `# Use 2-space indentation`ï¼‰ |
| `/` | æ–œæ å‘½ä»¤ |

### ä¸“ä¸šæŠ€å·§ï¼š"ultrathink"
åœ¨ prompt ä¸­ä½¿ç”¨å…³é”®è¯ "ultrathink" å¯åœ¨è¯¥è½®æ¬¡èŽ·å¾—æœ€å¤§æŽ¨ç† effortã€‚æ— è®ºå½“å‰ `/effort` è®¾ç½®å¦‚ä½•ï¼Œè¿™éƒ½ä¼šè§¦å‘æœ€æ·±å±‚çš„æ€è€ƒæ¨¡å¼ã€‚

## PR å®¡æŸ¥æ¨¡å¼

### å¿«é€Ÿå®¡æŸ¥ï¼ˆPrint æ¨¡å¼ï¼‰
```
terminal(command="cd /path/to/repo && git diff main...feature-branch | claude -p 'Review this diff for bugs, security issues, and style problems. Be thorough.' --max-turns 1", timeout=60)
```

### æ·±åº¦å®¡æŸ¥ï¼ˆäº¤äº’å¼ + Worktreeï¼‰
```
terminal(command="tmux new-session -d -s review -x 140 -y 40")
terminal(command="tmux send-keys -t review 'cd /path/to/repo && claude -w pr-review' Enter")
terminal(command="sleep 5 && tmux send-keys -t review Enter")  # ä¿¡ä»»å¯¹è¯æ¡†
terminal(command="sleep 2 && tmux send-keys -t review 'Review all changes vs main. Check for bugs, security issues, race conditions, and missing tests.' Enter")
terminal(command="sleep 30 && tmux capture-pane -t review -p -S -60")
```

### é€šè¿‡ PR ç¼–å·å®¡æŸ¥
```
terminal(command="claude -p 'Review this PR thoroughly' --from-pr 42 --max-turns 10", workdir="/path/to/repo", timeout=120)
```

### Claude Worktree é…åˆ tmux
```
terminal(command="claude -w feature-x --tmux", workdir="/path/to/repo")
```
åœ¨ `.claude/worktrees/feature-x` åˆ›å»ºéš”ç¦»çš„ git worktreeï¼Œå¹¶ä¸ºå…¶åˆ›å»º tmux ä¼šè¯ã€‚æœ‰ iTerm2 æ—¶ä½¿ç”¨åŽŸç”Ÿé¢æ¿ï¼›æ·»åŠ  `--tmux=classic` ä½¿ç”¨ä¼ ç»Ÿ tmuxã€‚

## å¹¶è¡Œ Claude å®žä¾‹

åŒæ—¶è¿è¡Œå¤šä¸ªç‹¬ç«‹çš„ Claude ä»»åŠ¡ï¼š

```
# ä»»åŠ¡ä¸€ï¼šä¿®å¤åŽç«¯
terminal(command="tmux new-session -d -s task1 -x 140 -y 40 && tmux send-keys -t task1 'cd ~/project && claude -p \"Fix the auth bug in src/auth.py\" --allowedTools \"Read,Edit\" --max-turns 10' Enter")

# ä»»åŠ¡äºŒï¼šç¼–å†™æµ‹è¯•
terminal(command="tmux new-session -d -s task2 -x 140 -y 40 && tmux send-keys -t task2 'cd ~/project && claude -p \"Write integration tests for the API endpoints\" --allowedTools \"Read,Write,Bash\" --max-turns 15' Enter")

# ä»»åŠ¡ä¸‰ï¼šæ›´æ–°æ–‡æ¡£
terminal(command="tmux new-session -d -s task3 -x 140 -y 40 && tmux send-keys -t task3 'cd ~/project && claude -p \"Update README.md with the new API endpoints\" --allowedTools \"Read,Edit\" --max-turns 5' Enter")

# ç›‘æŽ§æ‰€æœ‰ä»»åŠ¡
terminal(command="sleep 30 && for s in task1 task2 task3; do echo '=== '$s' ==='; tmux capture-pane -t $s -p -S -5 2>/dev/null; done")
```

## CLAUDE.md â€” é¡¹ç›®ä¸Šä¸‹æ–‡æ–‡ä»¶

Claude Code è‡ªåŠ¨ä»Žé¡¹ç›®æ ¹ç›®å½•åŠ è½½ `CLAUDE.md`ã€‚ä½¿ç”¨å®ƒæ¥æŒä¹…åŒ–é¡¹ç›®ä¸Šä¸‹æ–‡ï¼š

```markdown
# Project: My API

## Architecture
- FastAPI backend with SQLAlchemy ORM
- PostgreSQL database, Redis cache
- pytest for testing with 90% coverage target

## Key Commands
- `make test` â€” run full test suite
- `make lint` â€” ruff + mypy
- `make dev` â€” start dev server on :8000

## Code Standards
- Type hints on all public functions
- Docstrings in Google style
- 2-space indentation for YAML, 4-space for Python
- No wildcard imports
```

**è¦å…·ä½“ã€‚** ä¸è¦å†™"å†™å¥½ä»£ç "ï¼Œè€Œåº”å†™"JS ä½¿ç”¨ 2 ç©ºæ ¼ç¼©è¿›"æˆ–"æµ‹è¯•æ–‡ä»¶ä»¥ `.test.ts` åŽç¼€å‘½å"ã€‚å…·ä½“çš„æŒ‡ä»¤å¯ä»¥å‡å°‘çº é”™å¾ªçŽ¯ã€‚

### è§„åˆ™ç›®å½•ï¼ˆæ¨¡å—åŒ– CLAUDE.mdï¼‰
å¯¹äºŽè§„åˆ™è¾ƒå¤šçš„é¡¹ç›®ï¼Œä½¿ç”¨è§„åˆ™ç›®å½•ä»£æ›¿å•ä¸€åºžå¤§çš„ CLAUDE.mdï¼š
- **é¡¹ç›®è§„åˆ™ï¼š** `.claude/rules/*.md` â€” å›¢é˜Ÿå…±äº«ï¼Œgit è·Ÿè¸ª
- **ç”¨æˆ·è§„åˆ™ï¼š** `~/.claude/rules/*.md` â€” ä¸ªäººï¼Œå…¨å±€

è§„åˆ™ç›®å½•ä¸­çš„æ¯ä¸ª `.md` æ–‡ä»¶éƒ½ä½œä¸ºé¢å¤–ä¸Šä¸‹æ–‡åŠ è½½ã€‚è¿™æ¯”å°†æ‰€æœ‰å†…å®¹å¡žè¿›å•ä¸ª CLAUDE.md æ›´æ•´æ´ã€‚

### è‡ªåŠ¨è®°å¿†
Claude è‡ªåŠ¨å°†å­¦åˆ°çš„é¡¹ç›®ä¸Šä¸‹æ–‡å­˜å‚¨åœ¨ `~/.claude/projects/<project>/memory/` ä¸­ã€‚
- **é™åˆ¶ï¼š** æ¯ä¸ªé¡¹ç›® 25KB æˆ– 200 è¡Œ
- è¿™ä¸Ž CLAUDE.md åˆ†å¼€ â€” è¿™æ˜¯ Claude è‡ªå·±å…³äºŽé¡¹ç›®çš„ç¬”è®°ï¼Œè·¨ä¼šè¯ç§¯ç´¯

## è‡ªå®šä¹‰å­ Agent

åœ¨ `.claude/agents/`ï¼ˆé¡¹ç›®ï¼‰ã€`~/.claude/agents/`ï¼ˆä¸ªäººï¼‰ä¸­å®šä¹‰ä¸“ç”¨ agentï¼Œæˆ–é€šè¿‡ `--agents` CLI æ ‡å¿—ï¼ˆä¼šè¯ï¼‰å®šä¹‰ï¼š

### Agent ä½ç½®ä¼˜å…ˆçº§
1. `.claude/agents/` â€” é¡¹ç›®çº§ï¼Œå›¢é˜Ÿå…±äº«
2. `--agents` CLI æ ‡å¿— â€” ä¼šè¯ç‰¹å®šï¼ŒåŠ¨æ€
3. `~/.claude/agents/` â€” ç”¨æˆ·çº§ï¼Œä¸ªäºº

### åˆ›å»º Agent
```markdown
# .claude/agents/security-reviewer.md
---
name: security-reviewer
description: Security-focused code review
model: opus
tools: [Read, Bash]
---
You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication/authorization flaws
- Secrets in code
- Unsafe deserialization
```

è°ƒç”¨æ–¹å¼ï¼š`@security-reviewer review the auth module`

### é€šè¿‡ CLI åŠ¨æ€å®šä¹‰ Agent
```
terminal(command="claude --agents '{\"reviewer\": {\"description\": \"Reviews code\", \"prompt\": \"You are a code reviewer focused on performance\"}}' -p 'Use @reviewer to check auth.py'", timeout=120)
```

Claude å¯ä»¥ç¼–æŽ’å¤šä¸ª agentï¼š"Use @db-expert to optimize queries, then @security to audit the changes."

## Hook â€” äº‹ä»¶è§¦å‘è‡ªåŠ¨åŒ–

åœ¨ `.claude/settings.json`ï¼ˆé¡¹ç›®ï¼‰æˆ– `~/.claude/settings.json`ï¼ˆå…¨å±€ï¼‰ä¸­é…ç½®ï¼š

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write(*.py)",
      "hooks": [{"type": "command", "command": "ruff check --fix $CLAUDE_FILE_PATHS"}]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{"type": "command", "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rm -rf'; then echo 'Blocked!' && exit 2; fi"}]
    }],
    "Stop": [{
      "hooks": [{"type": "command", "command": "echo 'Claude finished a response' >> /tmp/claude-activity.log"}]
    }]
  }
}
```

### å…¨éƒ¨ 8 ç§ Hook ç±»åž‹
| Hook | è§¦å‘æ—¶æœº | å¸¸è§ç”¨é€” |
|------|--------------|------------|
| `UserPromptSubmit` | Claude å¤„ç†ç”¨æˆ· prompt ä¹‹å‰ | è¾“å…¥éªŒè¯ã€æ—¥å¿—è®°å½• |
| `PreToolUse` | å·¥å…·æ‰§è¡Œä¹‹å‰ | å®‰å…¨é—¨æŽ§ã€é˜»æ­¢å±é™©å‘½ä»¤ï¼ˆexit 2 = é˜»æ­¢ï¼‰ |
| `PostToolUse` | å·¥å…·å®Œæˆä¹‹åŽ | è‡ªåŠ¨æ ¼å¼åŒ–ä»£ç ã€è¿è¡Œ linter |
| `Notification` | æƒé™è¯·æ±‚æˆ–ç­‰å¾…è¾“å…¥æ—¶ | æ¡Œé¢é€šçŸ¥ã€å‘Šè­¦ |
| `Stop` | Claude å®Œæˆå“åº”æ—¶ | å®Œæˆæ—¥å¿—è®°å½•ã€çŠ¶æ€æ›´æ–° |
| `SubagentStop` | å­ agent å®Œæˆæ—¶ | Agent ç¼–æŽ’ |
| `PreCompact` | ä¸Šä¸‹æ–‡è®°å¿†è¢«æ¸…é™¤ä¹‹å‰ | å¤‡ä»½ä¼šè¯è½¬å½• |
| `SessionStart` | ä¼šè¯å¼€å§‹æ—¶ | åŠ è½½å¼€å‘ä¸Šä¸‹æ–‡ï¼ˆä¾‹å¦‚ `git status`ï¼‰ |

### Hook çŽ¯å¢ƒå˜é‡
| å˜é‡ | å†…å®¹ |
|----------|---------|
| `CLAUDE_PROJECT_DIR` | å½“å‰é¡¹ç›®è·¯å¾„ |
| `CLAUDE_FILE_PATHS` | æ­£åœ¨ä¿®æ”¹çš„æ–‡ä»¶ |
| `CLAUDE_TOOL_INPUT` | å·¥å…·å‚æ•°ï¼ˆJSON æ ¼å¼ï¼‰ |

### å®‰å…¨ Hook ç¤ºä¾‹
```json
{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{"type": "command", "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE 'rm -rf|git push.*--force|:(){ :|:& };:'; then echo 'Dangerous command blocked!' && exit 2; fi"}]
  }]
}
```

## MCP é›†æˆ

ä¸ºæ•°æ®åº“ã€API å’ŒæœåŠ¡æ·»åŠ å¤–éƒ¨å·¥å…·æœåŠ¡å™¨ï¼š

```
# GitHub é›†æˆ
terminal(command="claude mcp add -s user github -- npx @modelcontextprotocol/server-github", timeout=30)

# PostgreSQL æŸ¥è¯¢
terminal(command="claude mcp add -s local postgres -- npx @anthropic-ai/server-postgres --connection-string postgresql://localhost/mydb", timeout=30)

# Puppeteer ç”¨äºŽ Web æµ‹è¯•
terminal(command="claude mcp add puppeteer -- npx @anthropic-ai/server-puppeteer", timeout=30)
```

### MCP ä½œç”¨åŸŸ
| æ ‡å¿— | ä½œç”¨åŸŸ | å­˜å‚¨ä½ç½® |
|------|-------|---------|
| `-s user` | å…¨å±€ï¼ˆæ‰€æœ‰é¡¹ç›®ï¼‰ | `~/.claude.json` |
| `-s local` | æ­¤é¡¹ç›®ï¼ˆä¸ªäººï¼‰ | `.claude/settings.local.json`ï¼ˆå·² gitignoreï¼‰ |
| `-s project` | æ­¤é¡¹ç›®ï¼ˆå›¢é˜Ÿå…±äº«ï¼‰ | `.claude/settings.json`ï¼ˆgit è·Ÿè¸ªï¼‰ |

### Print/CI æ¨¡å¼ä¸­çš„ MCP
```
terminal(command="claude --bare -p 'Query database' --mcp-config mcp-servers.json --strict-mcp-config", timeout=60)
```
`--strict-mcp-config` å¿½ç•¥é™¤ `--mcp-config` ä»¥å¤–çš„æ‰€æœ‰ MCP æœåŠ¡å™¨ã€‚

åœ¨å¯¹è¯ä¸­å¼•ç”¨ MCP èµ„æºï¼š`@github:issue://123`

### MCP é™åˆ¶ä¸Žè°ƒä¼˜
- **å·¥å…·æè¿°ï¼š** æ¯ä¸ªæœåŠ¡å™¨çš„å·¥å…·æè¿°å’ŒæœåŠ¡å™¨æŒ‡ä»¤ä¸Šé™ä¸º 2KB
- **ç»“æžœå¤§å°ï¼š** é»˜è®¤æœ‰ä¸Šé™ï¼›ä½¿ç”¨ `maxResultSizeChars` æ³¨è§£å…è®¸æœ€å¤š **500K** å­—ç¬¦çš„å¤§åž‹è¾“å‡º
- **è¾“å‡º tokenï¼š** `export MAX_MCP_OUTPUT_TOKENS=50000` â€” é™åˆ¶ MCP æœåŠ¡å™¨çš„è¾“å‡ºä»¥é˜²æ­¢ä¸Šä¸‹æ–‡æ³›æ»¥
- **ä¼ è¾“æ–¹å¼ï¼š** `stdio`ï¼ˆæœ¬åœ°è¿›ç¨‹ï¼‰ã€`http`ï¼ˆè¿œç¨‹ï¼‰ã€`sse`ï¼ˆæœåŠ¡å™¨å‘é€äº‹ä»¶ï¼‰

## ç›‘æŽ§äº¤äº’ä¼šè¯

### è¯»å– TUI çŠ¶æ€
```
# å®šæœŸæ•èŽ·ä»¥æ£€æŸ¥ Claude æ˜¯å¦ä»åœ¨å·¥ä½œæˆ–ç­‰å¾…è¾“å…¥
terminal(command="tmux capture-pane -t dev -p -S -10")
```

æ³¨æ„ä»¥ä¸‹æŒ‡ç¤ºç¬¦ï¼š
- åº•éƒ¨çš„ `â¯` = ç­‰å¾…æ‚¨çš„è¾“å…¥ï¼ˆClaude å·²å®Œæˆæˆ–æ­£åœ¨æé—®ï¼‰
- `â—` è¡Œ = Claude æ­£åœ¨ä¸»åŠ¨ä½¿ç”¨å·¥å…·ï¼ˆè¯»å–ã€å†™å…¥ã€è¿è¡Œå‘½ä»¤ï¼‰
- `âµâµ bypass permissions on` = çŠ¶æ€æ æ˜¾ç¤ºæƒé™æ¨¡å¼
- `â— medium Â· /effort` = çŠ¶æ€æ ä¸­çš„å½“å‰ effort çº§åˆ«
- `ctrl+o to expand` = å·¥å…·è¾“å‡ºè¢«æˆªæ–­ï¼ˆå¯åœ¨äº¤äº’æ¨¡å¼ä¸­å±•å¼€ï¼‰

### ä¸Šä¸‹æ–‡çª—å£å¥åº·çŠ¶æ€
åœ¨äº¤äº’æ¨¡å¼ä¸­ä½¿ç”¨ `/context` æŸ¥çœ‹ä¸Šä¸‹æ–‡ä½¿ç”¨æƒ…å†µçš„å½©è‰²ç½‘æ ¼ã€‚å…³é”®é˜ˆå€¼ï¼š
- **&lt; 70%** â€” æ­£å¸¸è¿è¡Œï¼Œå®Œæ•´ç²¾åº¦
- **70-85%** â€” ç²¾åº¦å¼€å§‹ä¸‹é™ï¼Œè€ƒè™‘ä½¿ç”¨ `/compact`
- **> 85%** â€” å¹»è§‰é£Žé™©æ˜¾è‘—ä¸Šå‡ï¼Œä½¿ç”¨ `/compact` æˆ– `/clear`

## çŽ¯å¢ƒå˜é‡

| å˜é‡ | æ•ˆæžœ |
|----------|--------|
| `ANTHROPIC_API_KEY` | ç”¨äºŽè®¤è¯çš„ API keyï¼ˆOAuth çš„æ›¿ä»£æ–¹æ¡ˆï¼‰ |
| `CLAUDE_CODE_EFFORT_LEVEL` | é»˜è®¤ effortï¼š`low`ã€`medium`ã€`high`ã€`max` æˆ– `auto` |
| `MAX_THINKING_TOKENS` | é™åˆ¶æ€è€ƒ token æ•°é‡ï¼ˆè®¾ä¸º `0` å®Œå…¨ç¦ç”¨æ€è€ƒï¼‰ |
| `MAX_MCP_OUTPUT_TOKENS` | é™åˆ¶ MCP æœåŠ¡å™¨çš„è¾“å‡ºï¼ˆé»˜è®¤å€¼ä¸å›ºå®šï¼›ä¾‹å¦‚è®¾ä¸º `50000`ï¼‰ |
| `CLAUDE_CODE_NO_FLICKER=1` | å¯ç”¨å¤‡ç”¨å±å¹•æ¸²æŸ“ä»¥æ¶ˆé™¤ç»ˆç«¯é—ªçƒ |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | ä»Žå­è¿›ç¨‹ä¸­æ¸…é™¤å‡­æ®ä»¥æé«˜å®‰å…¨æ€§ |

## æˆæœ¬ä¸Žæ€§èƒ½å»ºè®®

1. **åœ¨ print æ¨¡å¼ä¸­ä½¿ç”¨ `--max-turns`** ä»¥é˜²æ­¢å¤±æŽ§å¾ªçŽ¯ã€‚å¤§å¤šæ•°ä»»åŠ¡ä»Ž 5-10 å¼€å§‹ã€‚
2. **ä½¿ç”¨ `--max-budget-usd`** è®¾ç½®æˆæœ¬ä¸Šé™ã€‚æ³¨æ„ï¼šç³»ç»Ÿ prompt ç¼“å­˜åˆ›å»ºçš„æœ€ä½Žæˆæœ¬çº¦ä¸º $0.05ã€‚
3. **ç®€å•ä»»åŠ¡ä½¿ç”¨ `--effort low`**ï¼ˆæ›´å¿«ã€æ›´ä¾¿å®œï¼‰ã€‚å¤æ‚æŽ¨ç†ä½¿ç”¨ `high` æˆ– `max`ã€‚
4. **CI/è„šæœ¬ä½¿ç”¨ `--bare`** ä»¥è·³è¿‡æ’ä»¶/hook å‘çŽ°å¼€é”€ã€‚
5. **ä½¿ç”¨ `--allowedTools`** é™åˆ¶ä¸ºä»»åŠ¡å®žé™…éœ€è¦çš„å·¥å…·ï¼ˆä¾‹å¦‚ä»…å®¡æŸ¥æ—¶ä½¿ç”¨ `Read`ï¼‰ã€‚
6. **åœ¨äº¤äº’ä¼šè¯ä¸­ä½¿ç”¨ `/compact`** å½“ä¸Šä¸‹æ–‡å˜å¤§æ—¶ã€‚
7. **ä½¿ç”¨ç®¡é“è¾“å…¥** è€Œéžè®© Claude è¯»å–æ–‡ä»¶ï¼Œå½“æ‚¨åªéœ€è¦åˆ†æžå·²çŸ¥å†…å®¹æ—¶ã€‚
8. **ç®€å•ä»»åŠ¡ä½¿ç”¨ `--model haiku`**ï¼ˆæ›´ä¾¿å®œï¼‰ï¼Œå¤æ‚å¤šæ­¥éª¤å·¥ä½œä½¿ç”¨ `--model opus`ã€‚
9. **åœ¨ print æ¨¡å¼ä¸­ä½¿ç”¨ `--fallback-model haiku`** ä»¥ä¼˜é›…å¤„ç†æ¨¡åž‹è¿‡è½½ã€‚
10. **ä¸ºä¸åŒä»»åŠ¡å¼€å¯æ–°ä¼šè¯** â€” ä¼šè¯æŒç»­ 5 å°æ—¶ï¼›æ–°é²œä¸Šä¸‹æ–‡æ›´é«˜æ•ˆã€‚
11. **åœ¨ CI ä¸­ä½¿ç”¨ `--no-session-persistence`** ä»¥é¿å…åœ¨ç£ç›˜ä¸Šç§¯ç´¯å·²ä¿å­˜çš„ä¼šè¯ã€‚

## é™·é˜±ä¸Žæ³¨æ„äº‹é¡¹

1. **äº¤äº’æ¨¡å¼éœ€è¦ tmux** â€” Claude Code æ˜¯å®Œæ•´çš„ TUI åº”ç”¨ã€‚åœ¨ Zed ç»ˆç«¯ä¸­å•ç‹¬ä½¿ç”¨ `pty=true` å¯ä»¥å·¥ä½œï¼Œä½† tmux æä¾›äº† `capture-pane` ç”¨äºŽç›‘æŽ§å’Œ `send-keys` ç”¨äºŽè¾“å…¥ï¼Œè¿™å¯¹ç¼–æŽ’è‡³å…³é‡è¦ã€‚
2. **`--dangerously-skip-permissions` å¯¹è¯æ¡†é»˜è®¤ä¸º"No, exit"** â€” å¿…é¡»æŒ‰ Down å†æŒ‰ Enter æ‰èƒ½æŽ¥å—ã€‚Print æ¨¡å¼ï¼ˆ`-p`ï¼‰å®Œå…¨è·³è¿‡æ­¤æ­¥éª¤ã€‚
3. **`--max-budget-usd` æœ€ä½Žçº¦ä¸º $0.05** â€” ä»…ç³»ç»Ÿ prompt ç¼“å­˜åˆ›å»ºå°±éœ€è¦è¿™ä¹ˆå¤šã€‚è®¾ç½®æ›´ä½Žä¼šç«‹å³æŠ¥é”™ã€‚
4. **`--max-turns` ä»…é™ print æ¨¡å¼** â€” åœ¨äº¤äº’ä¼šè¯ä¸­è¢«å¿½ç•¥ã€‚
5. **Claude å¯èƒ½ä½¿ç”¨ `python` è€Œéž `python3`** â€” åœ¨æ²¡æœ‰ `python` ç¬¦å·é“¾æŽ¥çš„ç³»ç»Ÿä¸Šï¼ŒClaude çš„ bash å‘½ä»¤é¦–æ¬¡ä¼šå¤±è´¥ï¼Œä½†å®ƒä¼šè‡ªæˆ‘çº æ­£ã€‚
6. **ä¼šè¯æ¢å¤éœ€è¦ç›¸åŒç›®å½•** â€” `--continue` æŸ¥æ‰¾å½“å‰å·¥ä½œç›®å½•ä¸­æœ€è¿‘çš„ä¼šè¯ã€‚
7. **`--json-schema` éœ€è¦è¶³å¤Ÿçš„ `--max-turns`** â€” Claude å¿…é¡»å…ˆè¯»å–æ–‡ä»¶æ‰èƒ½ç”Ÿæˆç»“æž„åŒ–è¾“å‡ºï¼Œè¿™éœ€è¦å¤šè½®æ¬¡ã€‚
8. **ä¿¡ä»»å¯¹è¯æ¡†æ¯ä¸ªç›®å½•åªå‡ºçŽ°ä¸€æ¬¡** â€” ä»…é¦–æ¬¡å‡ºçŽ°ï¼Œä¹‹åŽç¼“å­˜ã€‚
9. **åŽå° tmux ä¼šè¯ä¼šæŒç»­å­˜åœ¨** â€” å®ŒæˆåŽå§‹ç»ˆä½¿ç”¨ `tmux kill-session -t <name>` æ¸…ç†ã€‚
10. **æ–œæ å‘½ä»¤ï¼ˆå¦‚ `/commit`ï¼‰ä»…åœ¨äº¤äº’æ¨¡å¼ä¸‹æœ‰æ•ˆ** â€” åœ¨ `-p` æ¨¡å¼ä¸­ï¼Œç”¨è‡ªç„¶è¯­è¨€æè¿°ä»»åŠ¡ã€‚
11. **`--bare` è·³è¿‡ OAuth** â€” éœ€è¦ `ANTHROPIC_API_KEY` çŽ¯å¢ƒå˜é‡æˆ–è®¾ç½®ä¸­çš„ `apiKeyHelper`ã€‚
12. **ä¸Šä¸‹æ–‡é€€åŒ–æ˜¯çœŸå®žå­˜åœ¨çš„** â€” ä¸Šä¸‹æ–‡çª—å£ä½¿ç”¨çŽ‡è¶…è¿‡ 70% æ—¶ï¼ŒAI è¾“å‡ºè´¨é‡ä¼šæ˜Žæ˜¾ä¸‹é™ã€‚ä½¿ç”¨ `/context` ç›‘æŽ§å¹¶ä¸»åŠ¨ä½¿ç”¨ `/compact`ã€‚

## Zed Agent è§„åˆ™

1. **å•ä¸€ä»»åŠ¡ä¼˜å…ˆä½¿ç”¨ print æ¨¡å¼ï¼ˆ`-p`ï¼‰** â€” æ›´ç®€æ´ï¼Œæ— éœ€å¤„ç†å¯¹è¯æ¡†ï¼Œè¾“å‡ºç»“æž„åŒ–
2. **å¤šè½®äº¤äº’å·¥ä½œä½¿ç”¨ tmux** â€” ç¼–æŽ’ TUI çš„å”¯ä¸€å¯é æ–¹å¼
3. **å§‹ç»ˆè®¾ç½® `workdir`** â€” è®© Claude ä¸“æ³¨äºŽæ­£ç¡®çš„é¡¹ç›®ç›®å½•
4. **åœ¨ print æ¨¡å¼ä¸­è®¾ç½® `--max-turns`** â€” é˜²æ­¢æ— é™å¾ªçŽ¯å’Œå¤±æŽ§æˆæœ¬
5. **ç›‘æŽ§ tmux ä¼šè¯** â€” ä½¿ç”¨ `tmux capture-pane -t <session> -p -S -50` æ£€æŸ¥è¿›åº¦
6. **æ³¨æ„ `â¯` æç¤ºç¬¦** â€” è¡¨ç¤º Claude æ­£åœ¨ç­‰å¾…è¾“å…¥ï¼ˆå·²å®Œæˆæˆ–æ­£åœ¨æé—®ï¼‰
7. **æ¸…ç† tmux ä¼šè¯** â€” å®ŒæˆåŽå…³é—­å®ƒä»¬ä»¥é¿å…èµ„æºæ³„æ¼
8. **å‘ç”¨æˆ·æŠ¥å‘Šç»“æžœ** â€” å®ŒæˆåŽæ€»ç»“ Claude åšäº†ä»€ä¹ˆä»¥åŠå‘ç”Ÿäº†ä»€ä¹ˆå˜åŒ–
9. **ä¸è¦ç»ˆæ­¢æ…¢é€Ÿä¼šè¯** â€” Claude å¯èƒ½æ­£åœ¨è¿›è¡Œå¤šæ­¥éª¤å·¥ä½œï¼›æ£€æŸ¥è¿›åº¦è€Œéžç›´æŽ¥ç»ˆæ­¢
10. **ä½¿ç”¨ `--allowedTools`** â€” å°†èƒ½åŠ›é™åˆ¶ä¸ºä»»åŠ¡å®žé™…éœ€è¦çš„å·¥å…·
