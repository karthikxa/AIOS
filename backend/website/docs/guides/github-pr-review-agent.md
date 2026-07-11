---
sidebar_position: 10
title: "Tutorial: GitHub PR Review Agent"
description: "Build an automated AI code reviewer that monitors your repos, reviews pull requests, and delivers feedback â€” hands-free"
---

# Tutorial: Build a GitHub PR Review Agent

**The problem:** Your team opens PRs faster than you can review them. PRs sit for days waiting for eyeballs. Junior devs merge bugs because nobody had time to check. You spend your mornings catching up on diffs instead of building.

**The solution:** An AI agent that watches your repos around the clock, reviews every new PR for bugs, security issues, and code quality, and sends you a summary â€” so you only spend time on PRs that actually need human judgment.

**What you'll build:**

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

This guide uses **cron jobs** to poll for PRs on a schedule â€” no server or public endpoint needed. Works behind NAT and firewalls.

:::tip Want real-time reviews instead?
If you have a public endpoint available, check out [Automated GitHub PR Comments with Webhooks](./webhook-github-pr-review.md) â€” GitHub pushes events to Zed instantly when PRs are opened or updated.
:::

---

## Prerequisites

- **Zed Agent installed** â€” see the [Installation guide](/getting-started/installation)
- **Gateway running** for cron jobs:
  ```bash
  zed gateway install   # Install as a service
  # or
  zed gateway           # Run in foreground
  ```
- **GitHub CLI (`gh`) installed and authenticated**:
  ```bash
  # Install
  brew install gh        # macOS
  sudo apt install gh    # Ubuntu/Debian

  # Authenticate
  gh auth login
  ```
- **Messaging configured** (optional) â€” [Telegram](/user-guide/messaging/telegram) or [Discord](/user-guide/messaging/discord)

:::tip No messaging? No problem
Use `deliver: "local"` to save reviews to `~/.zed/cron/output/`. Great for testing before wiring up notifications.
:::

---

## Step 1: Verify the Setup

Make sure Zed can access GitHub. Start a chat:

```bash
zed
```

Test with a simple command:

```
Run: gh pr list --repo zedteam/zed-agent --state open --limit 3
```

You should see a list of open PRs. If this works, you're ready.

---

## Step 2: Try a Manual Review

Still in the chat, ask Zed to review a real PR:

```
Review this pull request. Read the diff, check for bugs, security issues,
and code quality. Be specific about line numbers and quote problematic code.

Run: gh pr diff 3888 --repo zedteam/zed-agent
```

Zed will:
1. Execute `gh pr diff` to fetch the code changes
2. Read through the entire diff
3. Produce a structured review with specific findings

If you're happy with the quality, time to automate it.

---

## Step 3: Create a Review Skill

A skill gives Zed consistent review guidelines that persist across sessions and cron runs. Without one, review quality varies.

```bash
mkdir -p ~/.zed/skills/code-review
```

Create `~/.zed/skills/code-review/SKILL.md`:

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

Verify it loaded â€” start `zed` and you should see `code-review` in the skills list at startup.

---

## Step 4: Teach It Your Conventions

This is what makes the reviewer actually useful. Start a session and teach Zed your team's standards:

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

These memories persist forever â€” the reviewer will enforce your conventions without being told each time.

---

## Step 5: Create the Automated Cron Job

Now wire it all together. Create a cron job that runs every 2 hours:

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

Verify it's scheduled:

```bash
zed cron list
```

### Other useful schedules

| Schedule | When |
|----------|------|
| `0 */2 * * *` | Every 2 hours |
| `0 9,13,17 * * 1-5` | Three times a day, weekdays only |
| `0 9 * * 1` | Weekly Monday morning roundup |
| `30m` | Every 30 minutes (high-traffic repos) |

---

## Step 6: Run It On Demand

Don't want to wait for the schedule? Trigger it manually:

```bash
zed cron run pr-review
```

Or from within a chat session:

```
/cron run pr-review
```

---

## Going Further

### Post Reviews Directly to GitHub

Instead of delivering to Telegram, have the agent comment on the PR itself:

Add this to your cron prompt:

```
After reviewing, post your review:
- For issues: gh pr review NUMBER --repo REPO --comment --body "YOUR_REVIEW"
- For critical issues: gh pr review NUMBER --repo REPO --request-changes --body "YOUR_REVIEW"
- For clean PRs: gh pr review NUMBER --repo REPO --approve --body "Looks good"
```

:::caution
Make sure `gh` has a token with `repo` scope. Reviews are posted as whoever `gh` is authenticated as.
:::

### Weekly PR Dashboard

Create a Monday morning overview of all your repos:

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

### Multi-Repo Monitoring

Scale up by adding more repos to the prompt. The agent processes them sequentially â€” no extra setup needed.

---

## Troubleshooting

### "gh: command not found"
The gateway runs in a minimal environment. Ensure `gh` is in the system PATH and restart the gateway.

### Reviews are too generic
1. Add the `code-review` skill (Step 3)
2. Teach Zed your conventions via memory (Step 4)
3. The more context it has about your stack, the better the reviews

### Cron job doesn't run
```bash
zed gateway status    # Is the gateway running?
zed cron list         # Is the job enabled?
```

### Rate limits
GitHub allows 5,000 API requests/hour for authenticated users. Each PR review uses ~3-5 requests (list + diff + optional comments). Even reviewing 100 PRs/day stays well within limits.

---

## What's Next?

- **[Webhook-Based PR Reviews](./webhook-github-pr-review.md)** â€” get instant reviews when PRs are opened (requires a public endpoint)
- **[Daily Briefing Bot](/guides/daily-briefing-bot)** â€” combine PR reviews with your morning news digest
- **[Build a Plugin](/guides/build-a-zed-plugin)** â€” wrap the review logic into a shareable plugin
- **[Profiles](/user-guide/profiles)** â€” run a dedicated reviewer profile with its own memory and config
- **[Fallback Providers](/user-guide/features/fallback-providers)** â€” ensure reviews run even when one provider is down
