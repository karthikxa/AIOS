---
title: "Codex â€” å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenAI Codex CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PRï¼‰"
sidebar_label: "Codex"
description: "å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenAI Codex CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PRï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Codex

å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenAI Codex CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PRï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/autonomous-ai-agents/codex` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Coding-Agent`, `Codex`, `OpenAI`, `Code-Review`, `Refactoring` |
| ç›¸å…³ skill | [`claude-code`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-claude-code), [`zed-agent`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-zed-agent) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Codex CLI

é€šè¿‡ Zed ç»ˆç«¯å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ [Codex](https://github.com/openai/codex)ã€‚Codex æ˜¯ OpenAI çš„è‡ªä¸»ç¼–ç  agent CLIã€‚

## ä½¿ç”¨åœºæ™¯

- åŠŸèƒ½å¼€å‘
- é‡æž„
- PR å®¡æŸ¥
- æ‰¹é‡é—®é¢˜ä¿®å¤

éœ€è¦ codex CLI å’Œä¸€ä¸ª git ä»“åº“ã€‚

## å‰ç½®æ¡ä»¶

- å·²å®‰è£… Codexï¼š`npm install -g @openai/codex`
- å·²é…ç½® OpenAI è®¤è¯ï¼š`OPENAI_API_KEY` æˆ–é€šè¿‡ Codex CLI ç™»å½•æµç¨‹èŽ·å–çš„ Codex OAuth å‡­è¯
- **å¿…é¡»åœ¨ git ä»“åº“å†…è¿è¡Œ** â€” Codex æ‹’ç»åœ¨ git ä»“åº“å¤–è¿è¡Œ
- ç»ˆç«¯è°ƒç”¨ä¸­ä½¿ç”¨ `pty=true` â€” Codex æ˜¯ä¸€ä¸ªäº¤äº’å¼ç»ˆç«¯åº”ç”¨

å¯¹äºŽ Zed æœ¬èº«ï¼Œ`model.provider: openai-codex` ä¼šåœ¨æ‰§è¡Œ `zed auth add openai-codex` åŽä½¿ç”¨ `~/.zed/auth.json` ä¸­ Zed ç®¡ç†çš„ Codex OAuthã€‚å¯¹äºŽç‹¬ç«‹çš„ Codex CLIï¼Œæœ‰æ•ˆçš„ CLI OAuth ä¼šè¯å¯èƒ½å­˜å‚¨åœ¨ `~/.codex/auth.json` ä¸­ï¼›ä¸è¦ä»…å‡­ç¼ºå°‘ `OPENAI_API_KEY` å°±è®¤ä¸º Codex è®¤è¯ç¼ºå¤±ã€‚

## å•æ¬¡ä»»åŠ¡

```
terminal(command="codex exec 'Add dark mode toggle to settings'", workdir="~/project", pty=true)
```

ç”¨äºŽä¸´æ—¶å·¥ä½œï¼ˆCodex éœ€è¦ git ä»“åº“ï¼‰ï¼š
```
terminal(command="cd $(mktemp -d) && git init && codex exec 'Build a snake game in Python'", pty=true)
```

## åŽå°æ¨¡å¼ï¼ˆé•¿æ—¶ä»»åŠ¡ï¼‰

```
# Start in background with PTY
terminal(command="codex exec --full-auto 'Refactor the auth module'", workdir="~/project", background=true, pty=true)
# Returns session_id

# Monitor progress
process(action="poll", session_id="<id>")
process(action="log", session_id="<id>")

# Send input if Codex asks a question
process(action="submit", session_id="<id>", data="yes")

# Kill if needed
process(action="kill", session_id="<id>")
```

## å…³é”®æ ‡å¿—

| æ ‡å¿— | æ•ˆæžœ |
|------|--------|
| `exec "prompt"` | å•æ¬¡æ‰§è¡Œï¼Œå®ŒæˆåŽé€€å‡º |
| `--full-auto` | æ²™ç®±æ¨¡å¼ï¼Œè‡ªåŠ¨æ‰¹å‡†å·¥ä½œåŒºå†…çš„æ–‡ä»¶å˜æ›´ |
| `--yolo` | æ— æ²™ç®±ï¼Œæ— éœ€å®¡æ‰¹ï¼ˆæœ€å¿«ï¼Œé£Žé™©æœ€é«˜ï¼‰ |

## PR å®¡æŸ¥

å…‹éš†åˆ°ä¸´æ—¶ç›®å½•ä»¥å®‰å…¨å®¡æŸ¥ï¼š

```
terminal(command="REVIEW=$(mktemp -d) && git clone https://github.com/user/repo.git $REVIEW && cd $REVIEW && gh pr checkout 42 && codex review --base origin/main", pty=true)
```

## ä½¿ç”¨ Worktree å¹¶è¡Œä¿®å¤é—®é¢˜

```
# Create worktrees
terminal(command="git worktree add -b fix/issue-78 /tmp/issue-78 main", workdir="~/project")
terminal(command="git worktree add -b fix/issue-99 /tmp/issue-99 main", workdir="~/project")

# Launch Codex in each
terminal(command="codex --yolo exec 'Fix issue #78: <description>. Commit when done.'", workdir="/tmp/issue-78", background=true, pty=true)
terminal(command="codex --yolo exec 'Fix issue #99: <description>. Commit when done.'", workdir="/tmp/issue-99", background=true, pty=true)

# Monitor
process(action="list")

# After completion, push and create PRs
terminal(command="cd /tmp/issue-78 && git push -u origin fix/issue-78")
terminal(command="gh pr create --repo user/repo --head fix/issue-78 --title 'fix: ...' --body '...'")

# Cleanup
terminal(command="git worktree remove /tmp/issue-78", workdir="~/project")
```

## æ‰¹é‡ PR å®¡æŸ¥

```
# Fetch all PR refs
terminal(command="git fetch origin '+refs/pull/*/head:refs/remotes/origin/pr/*'", workdir="~/project")

# Review multiple PRs in parallel
terminal(command="codex exec 'Review PR #86. git diff origin/main...origin/pr/86'", workdir="~/project", background=true, pty=true)
terminal(command="codex exec 'Review PR #87. git diff origin/main...origin/pr/87'", workdir="~/project", background=true, pty=true)

# Post results
terminal(command="gh pr comment 86 --body '<review>'", workdir="~/project")
```

## è§„åˆ™

1. **å§‹ç»ˆä½¿ç”¨ `pty=true`** â€” Codex æ˜¯äº¤äº’å¼ç»ˆç«¯åº”ç”¨ï¼Œæ²¡æœ‰ PTY ä¼šæŒ‚èµ·
2. **éœ€è¦ git ä»“åº“** â€” Codex ä¸èƒ½åœ¨ git ç›®å½•å¤–è¿è¡Œã€‚ä¸´æ—¶å·¥ä½œè¯·ä½¿ç”¨ `mktemp -d && git init`
3. **å•æ¬¡ä»»åŠ¡ä½¿ç”¨ `exec`** â€” `codex exec "prompt"` è¿è¡ŒåŽå¹²å‡€é€€å‡º
4. **æž„å»ºæ—¶ä½¿ç”¨ `--full-auto`** â€” åœ¨æ²™ç®±å†…è‡ªåŠ¨æ‰¹å‡†å˜æ›´
5. **é•¿æ—¶ä»»åŠ¡ä½¿ç”¨åŽå°æ¨¡å¼** â€” ä½¿ç”¨ `background=true` å¹¶é€šè¿‡ `process` å·¥å…·ç›‘æŽ§
6. **ä¸è¦å¹²é¢„** â€” ä½¿ç”¨ `poll`/`log` ç›‘æŽ§ï¼Œå¯¹é•¿æ—¶è¿è¡Œä»»åŠ¡ä¿æŒè€å¿ƒ
7. **å¹¶è¡Œæ‰§è¡Œæ²¡é—®é¢˜** â€” å¯åŒæ—¶è¿è¡Œå¤šä¸ª Codex è¿›ç¨‹å¤„ç†æ‰¹é‡å·¥ä½œ
