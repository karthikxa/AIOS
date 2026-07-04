---
sidebar_position: 10
title: "æ•™ç¨‹ï¼šGitHub PR å®¡æŸ¥ Agent"
description: "æž„å»ºä¸€ä¸ªè‡ªåŠ¨åŒ– AI ä»£ç å®¡æŸ¥å™¨ï¼Œç›‘æŽ§ä½ çš„ä»“åº“ã€å®¡æŸ¥ Pull Request å¹¶è‡ªåŠ¨å‘é€åé¦ˆâ€”â€”å…¨ç¨‹æ— éœ€äººå·¥å¹²é¢„"
---

# æ•™ç¨‹ï¼šæž„å»º GitHub PR å®¡æŸ¥ Agent

**é—®é¢˜æ‰€åœ¨ï¼š** å›¢é˜Ÿæäº¤ PR çš„é€Ÿåº¦æ¯”ä½ å®¡æŸ¥çš„é€Ÿåº¦è¿˜å¿«ã€‚PR ç­‰å¾…æ•°å¤©æ— äººé—®æ´¥ã€‚åˆçº§å¼€å‘è€…å› ä¸ºæ²¡äººæ£€æŸ¥è€Œåˆå¹¶äº†æœ‰ bug çš„ä»£ç ã€‚ä½ æ¯å¤©æ—©ä¸Šéƒ½åœ¨è¿½èµ¶ diffï¼Œè€Œä¸æ˜¯åœ¨å†™æ–°åŠŸèƒ½ã€‚

**è§£å†³æ–¹æ¡ˆï¼š** ä¸€ä¸ªå…¨å¤©å€™ç›‘æŽ§ä½ çš„ä»“åº“çš„ AI agentï¼Œå¯¹æ¯ä¸ªæ–° PR è¿›è¡Œ bugã€å®‰å…¨é—®é¢˜å’Œä»£ç è´¨é‡å®¡æŸ¥ï¼Œå¹¶å‘ä½ å‘é€æ‘˜è¦â€”â€”è¿™æ ·ä½ åªéœ€æŠŠæ—¶é—´èŠ±åœ¨çœŸæ­£éœ€è¦äººå·¥åˆ¤æ–­çš„ PR ä¸Šã€‚

**ä½ å°†æž„å»ºçš„å†…å®¹ï¼š**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                                                                   â”‚
â”‚   Cron Timer  â”€â”€â–¶  Zed Agent  â”€â”€â–¶  GitHub API  â”€â”€â–¶  Review     â”‚
â”‚   (every 2h)       + gh CLI           (PR diffs)       delivery   â”‚
â”‚                    + skill                             (Telegram, â”‚
â”‚                    + memory                            Discord,   â”‚
â”‚                                                        local)     â”‚
â”‚                                                                   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

æœ¬æŒ‡å—ä½¿ç”¨ **cron ä»»åŠ¡**æŒ‰è®¡åˆ’è½®è¯¢ PRâ€”â€”æ— éœ€æœåŠ¡å™¨æˆ–å…¬å¼€ç«¯ç‚¹ï¼Œåœ¨ NAT å’Œé˜²ç«å¢™åŽé¢åŒæ ·å¯ç”¨ã€‚

:::tip æƒ³è¦å®žæ—¶å®¡æŸ¥ï¼Ÿ
å¦‚æžœä½ æœ‰å¯ç”¨çš„å…¬å¼€ç«¯ç‚¹ï¼Œè¯·æŸ¥çœ‹[ä½¿ç”¨ Webhook è‡ªåŠ¨åŒ– GitHub PR è¯„è®º](./webhook-github-pr-review.md)â€”â€”GitHub ä¼šåœ¨ PR è¢«æ‰“å¼€æˆ–æ›´æ–°æ—¶ç«‹å³å‘ Zed æŽ¨é€äº‹ä»¶ã€‚
:::

---

## å‰ææ¡ä»¶

- **å·²å®‰è£… Zed Agent** â€” å‚è§[å®‰è£…æŒ‡å—](/getting-started/installation)
- **Gateway å·²è¿è¡Œ**ï¼ˆç”¨äºŽ cron ä»»åŠ¡ï¼‰ï¼š
  ```bash
  zed gateway install   # Install as a service
  # or
  zed gateway           # Run in foreground
  ```
- **å·²å®‰è£…å¹¶è®¤è¯ GitHub CLIï¼ˆ`gh`ï¼‰**ï¼š
  ```bash
  # Install
  brew install gh        # macOS
  sudo apt install gh    # Ubuntu/Debian

  # Authenticate
  gh auth login
  ```
- **å·²é…ç½®æ¶ˆæ¯é€šçŸ¥**ï¼ˆå¯é€‰ï¼‰â€” [Telegram](/user-guide/messaging/telegram) æˆ– [Discord](/user-guide/messaging/discord)

:::tip æ²¡æœ‰æ¶ˆæ¯é€šçŸ¥ï¼Ÿæ²¡å…³ç³»
ä½¿ç”¨ `deliver: "local"` å°†å®¡æŸ¥ç»“æžœä¿å­˜åˆ° `~/.zed/cron/output/`ã€‚åœ¨æŽ¥å…¥é€šçŸ¥ä¹‹å‰ç”¨äºŽæµ‹è¯•éžå¸¸æ–¹ä¾¿ã€‚
:::

---

## ç¬¬ä¸€æ­¥ï¼šéªŒè¯é…ç½®

ç¡®ä¿ Zed å¯ä»¥è®¿é—® GitHubã€‚å¯åŠ¨å¯¹è¯ï¼š

```bash
zed
```

ç”¨ä¸€ä¸ªç®€å•å‘½ä»¤æµ‹è¯•ï¼š

```
Run: gh pr list --repo NousResearch/zed-agent --state open --limit 3
```

ä½ åº”è¯¥èƒ½çœ‹åˆ°ä¸€ä¸ªå¼€æ”¾ PR çš„åˆ—è¡¨ã€‚å¦‚æžœæˆåŠŸï¼Œå°±å¯ä»¥ç»§ç»­äº†ã€‚

---

## ç¬¬äºŒæ­¥ï¼šæ‰‹åŠ¨è¯•å®¡ä¸€ä¸ª PR

ä»åœ¨å¯¹è¯ä¸­ï¼Œè®© Zed å®¡æŸ¥ä¸€ä¸ªçœŸå®žçš„ PRï¼š

```
Review this pull request. Read the diff, check for bugs, security issues,
and code quality. Be specific about line numbers and quote problematic code.

Run: gh pr diff 3888 --repo NousResearch/zed-agent
```

Zed å°†ä¼šï¼š
1. æ‰§è¡Œ `gh pr diff` èŽ·å–ä»£ç å˜æ›´
2. é€šè¯»æ•´ä¸ª diff
3. ç”ŸæˆåŒ…å«å…·ä½“å‘çŽ°çš„ç»“æž„åŒ–å®¡æŸ¥æŠ¥å‘Š

å¦‚æžœä½ å¯¹å®¡æŸ¥è´¨é‡æ»¡æ„ï¼Œå°±å¯ä»¥å¼€å§‹è‡ªåŠ¨åŒ–äº†ã€‚

---

## ç¬¬ä¸‰æ­¥ï¼šåˆ›å»ºå®¡æŸ¥ Skill

Skill ä¸º Zed æä¾›ä¸€è‡´çš„å®¡æŸ¥å‡†åˆ™ï¼Œåœ¨ä¼šè¯å’Œ cron è¿è¡Œä¹‹é—´æŒä¹…ä¿å­˜ã€‚æ²¡æœ‰ skillï¼Œå®¡æŸ¥è´¨é‡ä¼šå‚å·®ä¸é½ã€‚

```bash
mkdir -p ~/.zed/skills/code-review
```

åˆ›å»º `~/.zed/skills/code-review/SKILL.md`ï¼š

```markdown
---
name: code-review
description: Review pull requests for bugs, security issues, and code quality
---

# Code Review Guidelines

When reviewing a pull request:

## What to Check
1. **Bugs** â€” Logic errors, off-by-one, null/undefined handling
2. **Security** â€” Injection, auth bypass, secrets in code, SSRF
3. **Performance** â€” N+1 queries, unbounded loops, memory leaks
4. **Style** â€” Naming conventions, dead code, missing error handling
5. **Tests** â€” Are changes tested? Do tests cover edge cases?

## Output Format
For each finding:
- **File:Line** â€” exact location
- **Severity** â€” Critical / Warning / Suggestion
- **What's wrong** â€” one sentence
- **Fix** â€” how to fix it

## Rules
- Be specific. Quote the problematic code.
- Don't flag style nitpicks unless they affect readability.
- If the PR looks good, say so. Don't invent problems.
- End with: APPROVE / REQUEST_CHANGES / COMMENT
```

éªŒè¯æ˜¯å¦å·²åŠ è½½â€”â€”å¯åŠ¨ `zed`ï¼Œä½ åº”è¯¥èƒ½åœ¨å¯åŠ¨æ—¶çš„ skill åˆ—è¡¨ä¸­çœ‹åˆ° `code-review`ã€‚

---

## ç¬¬å››æ­¥ï¼šæ•™ä¼šå®ƒä½ çš„å›¢é˜Ÿè§„èŒƒ

è¿™æ‰æ˜¯è®©å®¡æŸ¥å™¨çœŸæ­£æœ‰ç”¨çš„å…³é”®ã€‚å¯åŠ¨ä¸€ä¸ªä¼šè¯ï¼Œå‘ Zed ä¼ æŽˆä½ çš„å›¢é˜Ÿæ ‡å‡†ï¼š

```
Remember: In our backend repo, we use Python with FastAPI.
All endpoints must have type annotations and Pydantic models.
We don't allow raw SQL â€” only SQLAlchemy ORM.
Test files go in tests/ and must use pytest fixtures.
```

```
Remember: In our frontend repo, we use TypeScript with React.
No `any` types allowed. All components must have props interfaces.
We use React Query for data fetching, never useEffect for API calls.
```

è¿™äº›è®°å¿†ä¼šæ°¸ä¹…ä¿å­˜â€”â€”å®¡æŸ¥å™¨æ— éœ€æ¯æ¬¡æé†’å°±ä¼šè‡ªåŠ¨æ‰§è¡Œä½ çš„è§„èŒƒã€‚

---

## ç¬¬äº”æ­¥ï¼šåˆ›å»ºè‡ªåŠ¨åŒ– Cron ä»»åŠ¡

çŽ°åœ¨æŠŠæ‰€æœ‰å†…å®¹ä¸²è”èµ·æ¥ã€‚åˆ›å»ºä¸€ä¸ªæ¯ 2 å°æ—¶è¿è¡Œä¸€æ¬¡çš„ cron ä»»åŠ¡ï¼š

```bash
zed cron create "0 */2 * * *" \
  "Check for new open PRs and review them.

Repos to monitor:
- myorg/backend-api
- myorg/frontend-app

Steps:
1. Run: gh pr list --repo REPO --state open --limit 5 --json number,title,author,createdAt
2. For each PR created or updated in the last 4 hours:
   - Run: gh pr diff NUMBER --repo REPO
   - Review the diff using the code-review guidelines
3. Format output as:

## PR Reviews â€” today

### [repo] #[number]: [title]
**Author:** [name] | **Verdict:** APPROVE/REQUEST_CHANGES/COMMENT
[findings]

If no new PRs found, say: No new PRs to review." \
  --name "pr-review" \
  --deliver telegram \
  --skill code-review
```

éªŒè¯ä»»åŠ¡å·²è°ƒåº¦ï¼š

```bash
zed cron list
```

### å…¶ä»–å¸¸ç”¨è°ƒåº¦è®¡åˆ’

| è®¡åˆ’ | è§¦å‘æ—¶æœº |
|------|----------|
| `0 */2 * * *` | æ¯ 2 å°æ—¶ |
| `0 9,13,17 * * 1-5` | å·¥ä½œæ—¥æ¯å¤©ä¸‰æ¬¡ |
| `0 9 * * 1` | æ¯å‘¨ä¸€æ—©ä¸Šæ±‡æ€» |
| `30m` | æ¯ 30 åˆ†é’Ÿï¼ˆé«˜æµé‡ä»“åº“ï¼‰ |

---

## ç¬¬å…­æ­¥ï¼šæŒ‰éœ€æ‰‹åŠ¨è§¦å‘

ä¸æƒ³ç­‰å¾…è°ƒåº¦ï¼Ÿæ‰‹åŠ¨è§¦å‘ï¼š

```bash
zed cron run pr-review
```

æˆ–åœ¨å¯¹è¯ä¼šè¯ä¸­ï¼š

```
/cron run pr-review
```

---

## è¿›é˜¶ç”¨æ³•

### ç›´æŽ¥åœ¨ GitHub ä¸Šå‘å¸ƒå®¡æŸ¥è¯„è®º

ä¸å°†ç»“æžœå‘é€åˆ° Telegramï¼Œè€Œæ˜¯è®© agent ç›´æŽ¥åœ¨ PR ä¸Šè¯„è®ºï¼š

åœ¨ä½ çš„ cron promptï¼ˆæç¤ºè¯ï¼‰ä¸­æ·»åŠ ï¼š

```
After reviewing, post your review:
- For issues: gh pr review NUMBER --repo REPO --comment --body "YOUR_REVIEW"
- For critical issues: gh pr review NUMBER --repo REPO --request-changes --body "YOUR_REVIEW"
- For clean PRs: gh pr review NUMBER --repo REPO --approve --body "Looks good"
```

:::caution
ç¡®ä¿ `gh` ä½¿ç”¨çš„ token å…·æœ‰ `repo` æƒé™èŒƒå›´ã€‚å®¡æŸ¥è¯„è®ºå°†ä»¥ `gh` å½“å‰è®¤è¯çš„ç”¨æˆ·èº«ä»½å‘å¸ƒã€‚
:::

### æ¯å‘¨ PR çœ‹æ¿

åˆ›å»ºä¸€ä¸ªæ¯å‘¨ä¸€æ—©ä¸Šçš„ä»“åº“æ¦‚è§ˆï¼š

```bash
zed cron create "0 9 * * 1" \
  "Generate a weekly PR dashboard:
- myorg/backend-api
- myorg/frontend-app
- myorg/infra

For each repo show:
1. Open PR count and oldest PR age
2. PRs merged this week
3. Stale PRs (older than 5 days)
4. PRs with no reviewer assigned

Format as a clean summary." \
  --name "weekly-dashboard" \
  --deliver telegram
```

### å¤šä»“åº“ç›‘æŽ§

åœ¨ prompt ä¸­æ·»åŠ æ›´å¤šä»“åº“å³å¯æ‰©å±•è§„æ¨¡ã€‚Agent ä¼šæŒ‰é¡ºåºå¤„ç†å®ƒä»¬â€”â€”æ— éœ€é¢å¤–é…ç½®ã€‚

---

## æ•…éšœæŽ’æŸ¥

### "gh: command not found"
Gateway åœ¨ç²¾ç®€çŽ¯å¢ƒä¸­è¿è¡Œã€‚è¯·ç¡®ä¿ `gh` åœ¨ç³»ç»Ÿ PATH ä¸­ï¼Œç„¶åŽé‡å¯ gatewayã€‚

### å®¡æŸ¥ç»“æžœè¿‡äºŽæ³›æ³›
1. æ·»åŠ  `code-review` skillï¼ˆç¬¬ä¸‰æ­¥ï¼‰
2. é€šè¿‡ memoryï¼ˆè®°å¿†ï¼‰å‘ Zed ä¼ æŽˆä½ çš„å›¢é˜Ÿè§„èŒƒï¼ˆç¬¬å››æ­¥ï¼‰
3. å®ƒå¯¹ä½ çš„æŠ€æœ¯æ ˆäº†è§£è¶Šå¤šï¼Œå®¡æŸ¥è´¨é‡è¶Šå¥½

### Cron ä»»åŠ¡æœªè¿è¡Œ
```bash
zed gateway status    # Is the gateway running?
zed cron list         # Is the job enabled?
```

### é€ŸçŽ‡é™åˆ¶
GitHub å¯¹å·²è®¤è¯ç”¨æˆ·æ¯å°æ—¶å…è®¸ 5,000 æ¬¡ API è¯·æ±‚ã€‚æ¯æ¬¡ PR å®¡æŸ¥çº¦æ¶ˆè€— 3-5 æ¬¡è¯·æ±‚ï¼ˆåˆ—è¡¨ + diff + å¯é€‰è¯„è®ºï¼‰ã€‚å³ä½¿æ¯å¤©å®¡æŸ¥ 100 ä¸ª PRï¼Œä¹Ÿè¿œä½ŽäºŽé™åˆ¶ã€‚

---

## ä¸‹ä¸€æ­¥

- **[åŸºäºŽ Webhook çš„ PR å®¡æŸ¥](./webhook-github-pr-review.md)** â€” åœ¨ PR è¢«æ‰“å¼€æ—¶ç«‹å³èŽ·å¾—å®¡æŸ¥ï¼ˆéœ€è¦å…¬å¼€ç«¯ç‚¹ï¼‰
- **[æ¯æ—¥ç®€æŠ¥ Bot](/guides/daily-briefing-bot)** â€” å°† PR å®¡æŸ¥ä¸Žä½ çš„æ™¨é—´èµ„è®¯æ‘˜è¦ç»“åˆ
- **[æž„å»º Plugin](/guides/build-a-zed-plugin)** â€” å°†å®¡æŸ¥é€»è¾‘å°è£…ä¸ºå¯å…±äº«çš„ plugin
- **[Profiles](/user-guide/profiles)** â€” è¿è¡Œä¸€ä¸ªä¸“å±žå®¡æŸ¥å™¨ profileï¼Œæ‹¥æœ‰ç‹¬ç«‹çš„ memory å’Œé…ç½®
- **[Fallback Providers](/user-guide/features/fallback-providers)** â€” ç¡®ä¿åœ¨æŸä¸ª provider ä¸å¯ç”¨æ—¶å®¡æŸ¥ä»»åŠ¡ä»èƒ½æ­£å¸¸è¿è¡Œ