---
title: "Opencode â€” å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenCode CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PR å®¡æŸ¥ï¼‰"
sidebar_label: "Opencode"
description: "å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenCode CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PR å®¡æŸ¥ï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Opencode

å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenCode CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PR å®¡æŸ¥ï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/autonomous-ai-agents/opencode` |
| ç‰ˆæœ¬ | `1.2.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Coding-Agent`, `OpenCode`, `Autonomous`, `Refactoring`, `Code-Review` |
| ç›¸å…³ skill | [`claude-code`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-claude-code), [`codex`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-codex), [`zed-agent`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-zed-agent) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# OpenCode CLI

ä½¿ç”¨ [OpenCode](https://opencode.ai) ä½œä¸ºç”± Zed ç»ˆç«¯/è¿›ç¨‹å·¥å…·ç¼–æŽ’çš„è‡ªä¸»ç¼–ç å·¥ä½œå™¨ã€‚OpenCode æ˜¯ä¸€ä¸ªæ”¯æŒå¤š providerã€å¼€æºçš„ AI ç¼–ç  agentï¼Œå…·å¤‡ TUIï¼ˆç»ˆç«¯ç”¨æˆ·ç•Œé¢ï¼‰å’Œ CLIã€‚

## é€‚ç”¨åœºæ™¯

- ç”¨æˆ·æ˜Žç¡®è¦æ±‚ä½¿ç”¨ OpenCode
- éœ€è¦å¤–éƒ¨ç¼–ç  agent æ¥å®žçŽ°/é‡æž„/å®¡æŸ¥ä»£ç 
- éœ€è¦é•¿æ—¶é—´è¿è¡Œçš„ç¼–ç ä¼šè¯å¹¶å®šæœŸæ£€æŸ¥è¿›åº¦
- éœ€è¦åœ¨éš”ç¦»çš„å·¥ä½œç›®å½•/worktree ä¸­å¹¶è¡Œæ‰§è¡Œä»»åŠ¡

## å‰ç½®æ¡ä»¶

- å·²å®‰è£… OpenCodeï¼š`npm i -g opencode-ai@latest` æˆ– `brew install anomalyco/tap/opencode`
- å·²é…ç½®è®¤è¯ï¼š`opencode auth login` æˆ–è®¾ç½® provider çŽ¯å¢ƒå˜é‡ï¼ˆOPENROUTER_API_KEY ç­‰ï¼‰
- éªŒè¯ï¼š`opencode auth list` åº”æ˜¾ç¤ºè‡³å°‘ä¸€ä¸ª provider
- ä»£ç ä»»åŠ¡æŽ¨èä½¿ç”¨ Git ä»“åº“
- äº¤äº’å¼ TUI ä¼šè¯éœ€è¦ `pty=true`

## äºŒè¿›åˆ¶æ–‡ä»¶è§£æžï¼ˆé‡è¦ï¼‰

Shell çŽ¯å¢ƒå¯èƒ½ä¼šè§£æžåˆ°ä¸åŒçš„ OpenCode äºŒè¿›åˆ¶æ–‡ä»¶ã€‚å¦‚æžœä½ çš„ç»ˆç«¯ä¸Ž Zed çš„è¡Œä¸ºä¸ä¸€è‡´ï¼Œè¯·æ£€æŸ¥ï¼š

```
terminal(command="which -a opencode")
terminal(command="opencode --version")
```

å¦‚æœ‰éœ€è¦ï¼Œå¯å›ºå®šä½¿ç”¨æ˜Žç¡®çš„äºŒè¿›åˆ¶è·¯å¾„ï¼š

```
terminal(command="$HOME/.opencode/bin/opencode run '...'", workdir="~/project", pty=true)
```

## å•æ¬¡ä»»åŠ¡

ä½¿ç”¨ `opencode run` æ‰§è¡Œæœ‰è¾¹ç•Œçš„éžäº¤äº’å¼ä»»åŠ¡ï¼š

```
terminal(command="opencode run 'Add retry logic to API calls and update tests'", workdir="~/project")
```

ä½¿ç”¨ `-f` é™„åŠ ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼š

```
terminal(command="opencode run 'Review this config for security issues' -f config.yaml -f .env.example", workdir="~/project")
```

ä½¿ç”¨ `--thinking` æ˜¾ç¤ºæ¨¡åž‹æ€è€ƒè¿‡ç¨‹ï¼š

```
terminal(command="opencode run 'Debug why tests fail in CI' --thinking", workdir="~/project")
```

å¼ºåˆ¶æŒ‡å®šç‰¹å®šæ¨¡åž‹ï¼š

```
terminal(command="opencode run 'Refactor auth module' --model openrouter/anthropic/claude-sonnet-4", workdir="~/project")
```

## äº¤äº’å¼ä¼šè¯ï¼ˆåŽå°è¿è¡Œï¼‰

å¯¹äºŽéœ€è¦å¤šè½®äº¤äº’çš„è¿­ä»£å·¥ä½œï¼Œåœ¨åŽå°å¯åŠ¨ TUIï¼š

```
terminal(command="opencode", workdir="~/project", background=true, pty=true)
# è¿”å›ž session_id

# å‘é€ promptï¼ˆæç¤ºè¯ï¼‰
process(action="submit", session_id="<id>", data="Implement OAuth refresh flow and add tests")

# ç›‘æŽ§è¿›åº¦
process(action="poll", session_id="<id>")
process(action="log", session_id="<id>")

# å‘é€åŽç»­è¾“å…¥
process(action="submit", session_id="<id>", data="Now add error handling for token expiry")

# å¹²å‡€é€€å‡º â€” Ctrl+C
process(action="write", session_id="<id>", data="\x03")
# æˆ–ç›´æŽ¥ç»ˆæ­¢è¿›ç¨‹
process(action="kill", session_id="<id>")
```

**é‡è¦ï¼š** ä¸è¦ä½¿ç”¨ `/exit`â€”â€”å®ƒä¸æ˜¯æœ‰æ•ˆçš„ OpenCode å‘½ä»¤ï¼Œä¼šæ‰“å¼€ agent é€‰æ‹©å™¨å¯¹è¯æ¡†ã€‚è¯·ä½¿ç”¨ Ctrl+Cï¼ˆ`\x03`ï¼‰æˆ– `process(action="kill")` é€€å‡ºã€‚

### TUI å¿«æ·é”®

| æŒ‰é”® | æ“ä½œ |
|-----|--------|
| `Enter` | æäº¤æ¶ˆæ¯ï¼ˆå¦‚æœ‰éœ€è¦å¯æŒ‰ä¸¤æ¬¡ï¼‰ |
| `Tab` | åœ¨ agent ä¹‹é—´åˆ‡æ¢ï¼ˆbuild/planï¼‰ |
| `Ctrl+P` | æ‰“å¼€å‘½ä»¤é¢æ¿ |
| `Ctrl+X L` | åˆ‡æ¢ä¼šè¯ |
| `Ctrl+X M` | åˆ‡æ¢æ¨¡åž‹ |
| `Ctrl+X N` | æ–°å»ºä¼šè¯ |
| `Ctrl+X E` | æ‰“å¼€ç¼–è¾‘å™¨ |
| `Ctrl+C` | é€€å‡º OpenCode |

### æ¢å¤ä¼šè¯

é€€å‡ºåŽï¼ŒOpenCode ä¼šæ‰“å°ä¼šè¯ IDã€‚ä½¿ç”¨ä»¥ä¸‹å‘½ä»¤æ¢å¤ï¼š

```
terminal(command="opencode -c", workdir="~/project", background=true, pty=true)  # ç»§ç»­ä¸Šæ¬¡ä¼šè¯
terminal(command="opencode -s ses_abc123", workdir="~/project", background=true, pty=true)  # æŒ‡å®šä¼šè¯
```

## å¸¸ç”¨æ ‡å¿—

| æ ‡å¿— | ç”¨é€” |
|------|-----|
| `run 'prompt'` | å•æ¬¡æ‰§è¡ŒåŽé€€å‡º |
| `--continue` / `-c` | ç»§ç»­ä¸Šæ¬¡ OpenCode ä¼šè¯ |
| `--session <id>` / `-s` | ç»§ç»­æŒ‡å®šä¼šè¯ |
| `--agent <name>` | é€‰æ‹© OpenCode agentï¼ˆbuild æˆ– planï¼‰ |
| `--model provider/model` | å¼ºåˆ¶ä½¿ç”¨æŒ‡å®šæ¨¡åž‹ |
| `--format json` | æœºå™¨å¯è¯»çš„è¾“å‡º/äº‹ä»¶ |
| `--file <path>` / `-f` | å‘æ¶ˆæ¯é™„åŠ æ–‡ä»¶ |
| `--thinking` | æ˜¾ç¤ºæ¨¡åž‹æ€è€ƒå— |
| `--variant <level>` | æŽ¨ç†å¼ºåº¦ï¼ˆhighã€maxã€minimalï¼‰ |
| `--title <name>` | ä¸ºä¼šè¯å‘½å |
| `--attach <url>` | è¿žæŽ¥åˆ°æ­£åœ¨è¿è¡Œçš„ opencode æœåŠ¡å™¨ |

## æ“ä½œæµç¨‹

1. éªŒè¯å·¥å…·å°±ç»ªçŠ¶æ€ï¼š
   - `terminal(command="opencode --version")`
   - `terminal(command="opencode auth list")`
2. å¯¹äºŽæœ‰è¾¹ç•Œçš„ä»»åŠ¡ï¼Œä½¿ç”¨ `opencode run '...'`ï¼ˆæ— éœ€ ptyï¼‰ã€‚
3. å¯¹äºŽè¿­ä»£ä»»åŠ¡ï¼Œä½¿ç”¨ `background=true, pty=true` å¯åŠ¨ `opencode`ã€‚
4. ä½¿ç”¨ `process(action="poll"|"log")` ç›‘æŽ§é•¿æ—¶é—´è¿è¡Œçš„ä»»åŠ¡ã€‚
5. å¦‚æžœ OpenCode è¯·æ±‚è¾“å…¥ï¼Œé€šè¿‡ `process(action="submit", ...)` å“åº”ã€‚
6. ä½¿ç”¨ `process(action="write", data="\x03")` æˆ– `process(action="kill")` é€€å‡ºï¼Œåˆ‡å‹¿ä½¿ç”¨ `/exit`ã€‚
7. å‘ç”¨æˆ·æ±‡æ€»æ–‡ä»¶å˜æ›´ã€æµ‹è¯•ç»“æžœåŠåŽç»­æ­¥éª¤ã€‚

## PR å®¡æŸ¥å·¥ä½œæµ

OpenCode å†…ç½® PR å‘½ä»¤ï¼š

```
terminal(command="opencode pr 42", workdir="~/project", pty=true)
```

æˆ–åœ¨ä¸´æ—¶å…‹éš†ä¸­å®¡æŸ¥ä»¥å®žçŽ°éš”ç¦»ï¼š

```
terminal(command="REVIEW=$(mktemp -d) && git clone https://github.com/user/repo.git $REVIEW && cd $REVIEW && opencode run 'Review this PR vs main. Report bugs, security risks, test gaps, and style issues.' -f $(git diff origin/main --name-only | head -20 | tr '\n' ' ')", pty=true)
```

## å¹¶è¡Œå·¥ä½œæ¨¡å¼

ä½¿ç”¨ç‹¬ç«‹çš„å·¥ä½œç›®å½•/worktree é¿å…å†²çªï¼š

```
terminal(command="opencode run 'Fix issue #101 and commit'", workdir="/tmp/issue-101", background=true, pty=true)
terminal(command="opencode run 'Add parser regression tests and commit'", workdir="/tmp/issue-102", background=true, pty=true)
process(action="list")
```

## ä¼šè¯ä¸Žæˆæœ¬ç®¡ç†

åˆ—å‡ºåŽ†å²ä¼šè¯ï¼š

```
terminal(command="opencode session list")
```

æŸ¥çœ‹ token ç”¨é‡å’Œè´¹ç”¨ï¼š

```
terminal(command="opencode stats")
terminal(command="opencode stats --days 7 --models anthropic/claude-sonnet-4")
```

## æ³¨æ„äº‹é¡¹

- äº¤äº’å¼ `opencode`ï¼ˆTUIï¼‰ä¼šè¯éœ€è¦ `pty=true`ã€‚`opencode run` å‘½ä»¤**ä¸éœ€è¦** ptyã€‚
- `/exit` **ä¸æ˜¯**æœ‰æ•ˆå‘½ä»¤â€”â€”å®ƒä¼šæ‰“å¼€ agent é€‰æ‹©å™¨ã€‚è¯·ä½¿ç”¨ Ctrl+C é€€å‡º TUIã€‚
- PATH ä¸åŒ¹é…å¯èƒ½å¯¼è‡´é€‰æ‹©é”™è¯¯çš„ OpenCode äºŒè¿›åˆ¶æ–‡ä»¶/æ¨¡åž‹é…ç½®ã€‚
- å¦‚æžœ OpenCode çœ‹èµ·æ¥å¡ä½äº†ï¼Œåœ¨ç»ˆæ­¢å‰å…ˆæ£€æŸ¥æ—¥å¿—ï¼š
  - `process(action="log", session_id="<id>")`
- é¿å…å¤šä¸ªå¹¶è¡Œ OpenCode ä¼šè¯å…±äº«åŒä¸€å·¥ä½œç›®å½•ã€‚
- åœ¨ TUI ä¸­å¯èƒ½éœ€è¦æŒ‰ä¸¤æ¬¡ Enter æ‰èƒ½æäº¤ï¼ˆç¬¬ä¸€æ¬¡ç¡®è®¤æ–‡æœ¬ï¼Œç¬¬äºŒæ¬¡å‘é€ï¼‰ã€‚

## éªŒè¯

å†’çƒŸæµ‹è¯•ï¼š

```
terminal(command="opencode run 'Respond with exactly: OPENCODE_SMOKE_OK'")
```

æˆåŠŸæ ‡å‡†ï¼š
- è¾“å‡ºåŒ…å« `OPENCODE_SMOKE_OK`
- å‘½ä»¤é€€å‡ºæ—¶æ—  provider/æ¨¡åž‹é”™è¯¯
- å¯¹äºŽä»£ç ä»»åŠ¡ï¼šé¢„æœŸæ–‡ä»¶å·²å˜æ›´ä¸”æµ‹è¯•é€šè¿‡

## è§„åˆ™

1. å•æ¬¡è‡ªåŠ¨åŒ–ä»»åŠ¡ä¼˜å…ˆä½¿ç”¨ `opencode run`â€”â€”æ›´ç®€å•ä¸”æ— éœ€ ptyã€‚
2. ä»…åœ¨éœ€è¦è¿­ä»£æ—¶ä½¿ç”¨äº¤äº’å¼åŽå°æ¨¡å¼ã€‚
3. å§‹ç»ˆå°† OpenCode ä¼šè¯é™å®šåœ¨å•ä¸ªä»“åº“/å·¥ä½œç›®å½•å†…ã€‚
4. å¯¹äºŽé•¿æ—¶é—´ä»»åŠ¡ï¼Œä»Ž `process` æ—¥å¿—ä¸­æä¾›è¿›åº¦æ›´æ–°ã€‚
5. æŠ¥å‘Šå…·ä½“ç»“æžœï¼ˆæ–‡ä»¶å˜æ›´ã€æµ‹è¯•æƒ…å†µã€å‰©ä½™é£Žé™©ï¼‰ã€‚
6. ä½¿ç”¨ Ctrl+C æˆ– kill é€€å‡ºäº¤äº’å¼ä¼šè¯ï¼Œåˆ‡å‹¿ä½¿ç”¨ `/exit`ã€‚