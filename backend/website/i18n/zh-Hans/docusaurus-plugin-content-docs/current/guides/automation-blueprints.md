---
sidebar_position: 15
title: "è‡ªåŠ¨åŒ–è“å›¾"
description: "å¼€ç®±å³ç”¨çš„è‡ªåŠ¨åŒ–è“å›¾â€”â€”å®šæ—¶ä»»åŠ¡ã€GitHub äº‹ä»¶è§¦å‘ã€API webhook åŠå¤šæŠ€èƒ½å·¥ä½œæµ"
---

# è‡ªåŠ¨åŒ–è“å›¾

å¸¸è§è‡ªåŠ¨åŒ–æ¨¡å¼çš„å¤åˆ¶ç²˜è´´è“å›¾ã€‚æ¯ä¸ªè“å›¾ä½¿ç”¨ Zed å†…ç½®çš„ [cron è°ƒåº¦å™¨](/user-guide/features/cron) å®žçŽ°åŸºäºŽæ—¶é—´çš„è§¦å‘ï¼Œä½¿ç”¨ [webhook å¹³å°](/user-guide/messaging/webhooks) å®žçŽ°äº‹ä»¶é©±åŠ¨è§¦å‘ã€‚

æ‰€æœ‰è“å›¾é€‚ç”¨äºŽ**ä»»æ„æ¨¡åž‹**â€”â€”ä¸ç»‘å®šå•ä¸€æä¾›å•†ã€‚

å¦‚éœ€å¸¦è¡¨å•çš„å‚æ•°åŒ–è“å›¾ï¼ˆæ— éœ€æ‰‹å†™ cron è¯­æ³•ï¼‰ï¼Œè¯·å‚é˜…[è‡ªåŠ¨åŒ–è“å›¾ç›®å½•](/reference/automation-blueprints-catalog)ã€‚

:::tip ä¸‰ç§è§¦å‘ç±»åž‹
| è§¦å‘æ–¹å¼ | æ–¹å¼ | å·¥å…· |
|---------|-----|------|
| **å®šæ—¶** | æŒ‰å‘¨æœŸè¿è¡Œï¼ˆæ¯å°æ—¶ã€æ¯æ™šã€æ¯å‘¨ï¼‰ | `cronjob` å·¥å…·æˆ– `/cron` æ–œæ å‘½ä»¤ |
| **GitHub äº‹ä»¶** | PR å¼€å¯ã€æŽ¨é€ã€issueã€CI ç»“æžœæ—¶è§¦å‘ | Webhook å¹³å°ï¼ˆ`zed webhook subscribe`ï¼‰ |
| **API è°ƒç”¨** | å¤–éƒ¨æœåŠ¡å‘ä½ çš„ç«¯ç‚¹ POST JSON | Webhook å¹³å°ï¼ˆconfig.yaml è·¯ç”±æˆ– `zed webhook subscribe`ï¼‰ |

ä¸‰ç§æ–¹å¼å‡æ”¯æŒæŠ•é€’åˆ° Telegramã€Discordã€Slackã€SMSã€é‚®ä»¶ã€GitHub è¯„è®ºæˆ–æœ¬åœ°æ–‡ä»¶ã€‚
:::

---

## å¼€å‘å·¥ä½œæµ

### æ¯æ™šå¾…åŠžäº‹é¡¹åˆ†ç±»

æ¯æ™šè‡ªåŠ¨å¯¹æ–° issue è¿›è¡Œæ ‡ç­¾åˆ†ç±»ã€ä¼˜å…ˆçº§æŽ’åºå’Œæ‘˜è¦æ±‡æ€»ï¼Œå¹¶å°†æ‘˜è¦æŠ•é€’åˆ°å›¢é˜Ÿé¢‘é“ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯æ™šï¼‰

```bash
zed cron create "0 2 * * *" \
  "You are a project manager triaging the NousResearch/zed-agent GitHub repo.

1. Run: gh issue list --repo NousResearch/zed-agent --state open --json number,title,labels,author,createdAt --limit 30
2. Identify issues opened in the last 24 hours
3. For each new issue:
   - Suggest a priority label (P0-critical, P1-high, P2-medium, P3-low)
   - Suggest a category label (bug, feature, docs, security)
   - Write a one-line triage note
4. Summarize: total open issues, new today, breakdown by priority

Format as a clean digest. If no new issues, respond with [SILENT]." \
  --name "Nightly backlog triage" \
  --deliver telegram
```

### è‡ªåŠ¨ PR ä»£ç å®¡æŸ¥

PR å¼€å¯æ—¶è‡ªåŠ¨è¿›è¡Œå®¡æŸ¥ï¼Œå¹¶ç›´æŽ¥åœ¨ PR ä¸Šå‘å¸ƒå®¡æŸ¥è¯„è®ºã€‚

**è§¦å‘æ–¹å¼ï¼š** GitHub webhook

**æ–¹å¼ Aâ€”â€”åŠ¨æ€è®¢é˜…ï¼ˆCLIï¼‰ï¼š**

```bash
zed webhook subscribe github-pr-review \
  --events "pull_request" \
  --prompt "Review this pull request:
Repository: {repository.full_name}
PR #{pull_request.number}: {pull_request.title}
Author: {pull_request.user.login}
Action: {action}
Diff URL: {pull_request.diff_url}

Fetch the diff with: curl -sL {pull_request.diff_url}

Review for:
- Security issues (injection, auth bypass, secrets in code)
- Performance concerns (N+1 queries, unbounded loops, memory leaks)
- Code quality (naming, duplication, error handling)
- Missing tests for new behavior

Post a concise review. If the PR is a trivial docs/typo change, say so briefly." \
  --skill github-code-review \
  --deliver github_comment
```

**æ–¹å¼ Bâ€”â€”é™æ€è·¯ç”±ï¼ˆconfig.yamlï¼‰ï¼š**

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644
      secret: "your-global-secret"
      routes:
        github-pr-review:
          events: ["pull_request"]
          secret: "github-webhook-secret"
          prompt: |
            Review PR #{pull_request.number}: {pull_request.title}
            Repository: {repository.full_name}
            Author: {pull_request.user.login}
            Diff URL: {pull_request.diff_url}
            Review for security, performance, and code quality.
          skills: ["github-code-review"]
          deliver: "github_comment"
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{pull_request.number}"
```

ç„¶åŽåœ¨ GitHub ä¸­ï¼š**Settings â†’ Webhooks â†’ Add webhook** â†’ Payload URLï¼š`http://your-server:8644/webhooks/github-pr-review`ï¼ŒContent typeï¼š`application/json`ï¼ŒSecretï¼š`github-webhook-secret`ï¼ŒEventsï¼š**Pull requests**ã€‚

### æ–‡æ¡£åå·®æ£€æµ‹

æ¯å‘¨æ‰«æå·²åˆå¹¶çš„ PRï¼Œæ‰¾å‡ºéœ€è¦æ›´æ–°æ–‡æ¡£çš„ API å˜æ›´ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯å‘¨ï¼‰

```bash
zed cron create "0 9 * * 1" \
  "Scan the NousResearch/zed-agent repo for documentation drift.

1. Run: gh pr list --repo NousResearch/zed-agent --state merged --json number,title,files,mergedAt --limit 30
2. Filter to PRs merged in the last 7 days
3. For each merged PR, check if it modified:
   - Tool schemas (tools/*.py) â€” may need docs/reference/tools-reference.md update
   - CLI commands (zed_cli/commands.py, zed_cli/main.py) â€” may need docs/reference/cli-commands.md update
   - Config options (zed_cli/config.py) â€” may need docs/user-guide/configuration.md update
   - Environment variables â€” may need docs/reference/environment-variables.md update
4. Cross-reference: for each code change, check if the corresponding docs page was also updated in the same PR

Report any gaps where code changed but docs didn't. If everything is in sync, respond with [SILENT]." \
  --name "Docs drift detection" \
  --deliver telegram
```

### ä¾èµ–å®‰å…¨å®¡è®¡

æ¯æ—¥æ‰«æé¡¹ç›®ä¾èµ–ä¸­çš„å·²çŸ¥æ¼æ´žã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯æ—¥ï¼‰

```bash
zed cron create "0 6 * * *" \
  "Run a dependency security audit on the zed-agent project.

1. cd ~/.zed/zed-agent && source .venv/bin/activate
2. Run: pip audit --format json 2>/dev/null || pip audit 2>&1
3. Run: npm audit --json 2>/dev/null (in website/ directory if it exists)
4. Check for any CVEs with CVSS score >= 7.0

If vulnerabilities found:
- List each one with package name, version, CVE ID, severity
- Check if an upgrade is available
- Note if it's a direct dependency or transitive

If no vulnerabilities, respond with [SILENT]." \
  --name "Dependency audit" \
  --deliver telegram
```

---

## DevOps ä¸Žç›‘æŽ§

### éƒ¨ç½²éªŒè¯

æ¯æ¬¡éƒ¨ç½²åŽè§¦å‘å†’çƒŸæµ‹è¯•ã€‚CI/CD æµæ°´çº¿åœ¨éƒ¨ç½²å®Œæˆæ—¶å‘ webhook POST è¯·æ±‚ã€‚

**è§¦å‘æ–¹å¼ï¼š** API è°ƒç”¨ï¼ˆwebhookï¼‰

```bash
zed webhook subscribe deploy-verify \
  --events "deployment" \
  --prompt "A deployment just completed:
Service: {service}
Environment: {environment}
Version: {version}
Deployed by: {deployer}

Run these verification steps:
1. Check if the service is responding: curl -s -o /dev/null -w '%{http_code}' {health_url}
2. Search recent logs for errors: check the deployment payload for any error indicators
3. Verify the version matches: curl -s {health_url}/version

Report: deployment status (healthy/degraded/failed), response time, any errors found.
If healthy, keep it brief. If degraded or failed, provide detailed diagnostics." \
  --deliver telegram
```

ä½ çš„ CI/CD æµæ°´çº¿è§¦å‘æ–¹å¼ï¼š

```bash
curl -X POST http://your-server:8644/webhooks/deploy-verify \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: sha256=$(echo -n '{"service":"api","environment":"prod","version":"2.1.0","deployer":"ci","health_url":"https://api.example.com/health"}' | openssl dgst -sha256 -hmac 'your-secret' | cut -d' ' -f2)" \
  -d '{"service":"api","environment":"prod","version":"2.1.0","deployer":"ci","health_url":"https://api.example.com/health"}'
```

### å‘Šè­¦åˆ†ç±»

å°†ç›‘æŽ§å‘Šè­¦ä¸Žè¿‘æœŸå˜æ›´å…³è”ï¼Œèµ·è‰å“åº”æ–¹æ¡ˆã€‚é€‚ç”¨äºŽ Datadogã€PagerDutyã€Grafana æˆ–ä»»ä½•èƒ½ POST JSON çš„å‘Šè­¦ç³»ç»Ÿã€‚

**è§¦å‘æ–¹å¼ï¼š** API è°ƒç”¨ï¼ˆwebhookï¼‰

```bash
zed webhook subscribe alert-triage \
  --prompt "Monitoring alert received:
Alert: {alert.name}
Severity: {alert.severity}
Service: {alert.service}
Message: {alert.message}
Timestamp: {alert.timestamp}

Investigate:
1. Search the web for known issues with this error pattern
2. Check if this correlates with any recent deployments or config changes
3. Draft a triage summary with:
   - Likely root cause
   - Suggested first response steps
   - Escalation recommendation (P1-P4)

Be concise. This goes to the on-call channel." \
  --deliver slack
```

### å¯ç”¨æ€§ç›‘æŽ§

æ¯ 30 åˆ†é’Ÿæ£€æŸ¥ä¸€æ¬¡ç«¯ç‚¹ï¼Œä»…åœ¨æœåŠ¡å®•æœºæ—¶å‘é€é€šçŸ¥ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯ 30 åˆ†é’Ÿï¼‰

```python title="~/.zed/scripts/check-uptime.py"
import urllib.request, json, time

ENDPOINTS = [
    {"name": "API", "url": "https://api.example.com/health"},
    {"name": "Web", "url": "https://www.example.com"},
    {"name": "Docs", "url": "https://docs.example.com"},
]

results = []
for ep in ENDPOINTS:
    try:
        start = time.time()
        req = urllib.request.Request(ep["url"], headers={"User-Agent": "Zed-Monitor/1.0"})
        resp = urllib.request.urlopen(req, timeout=10)
        elapsed = round((time.time() - start) * 1000)
        results.append({"name": ep["name"], "status": resp.getcode(), "ms": elapsed})
    except Exception as e:
        results.append({"name": ep["name"], "status": "DOWN", "error": str(e)})

down = [r for r in results if r.get("status") == "DOWN" or (isinstance(r.get("status"), int) and r["status"] >= 500)]
if down:
    print("OUTAGE DETECTED")
    for r in down:
        print(f"  {r['name']}: {r.get('error', f'HTTP {r[\"status\"]}')} ")
    print(f"\nAll results: {json.dumps(results, indent=2)}")
else:
    print("NO_ISSUES")
```

```bash
zed cron create "every 30m" \
  "If the script reports OUTAGE DETECTED, summarize which services are down and suggest likely causes. If NO_ISSUES, respond with [SILENT]." \
  --script ~/.zed/scripts/check-uptime.py \
  --name "Uptime monitor" \
  --deliver telegram
```

---

## ç ”ç©¶ä¸Žæƒ…æŠ¥

### ç«žå“ä»“åº“ä¾¦å¯Ÿ

ç›‘æŽ§ç«žå“ä»“åº“ä¸­æœ‰ä»·å€¼çš„ PRã€åŠŸèƒ½å’Œæž¶æž„å†³ç­–ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯æ—¥ï¼‰

```bash
zed cron create "0 8 * * *" \
  "Scout these AI agent repositories for notable activity in the last 24 hours:

Repos to check:
- anthropics/claude-code
- openai/codex
- All-Hands-AI/OpenHands
- Aider-AI/aider

For each repo:
1. gh pr list --repo <repo> --state all --json number,title,author,createdAt,mergedAt --limit 15
2. gh issue list --repo <repo> --state open --json number,title,labels,createdAt --limit 10

Focus on:
- New features being developed
- Architectural changes
- Integration patterns we could learn from
- Security fixes that might affect us too

Skip routine dependency bumps and CI fixes. If nothing notable, respond with [SILENT].
If there are findings, organize by repo with brief analysis of each item." \
  --skill competitive-pr-scout \
  --name "Competitor scout" \
  --deliver telegram
```

### AI æ–°é—»æ‘˜è¦

æ¯å‘¨æ±‡æ€» AI/ML é¢†åŸŸåŠ¨æ€ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯å‘¨ï¼‰

```bash
zed cron create "0 9 * * 1" \
  "Generate a weekly AI news digest covering the past 7 days:

1. Search the web for major AI announcements, model releases, and research breakthroughs
2. Search for trending ML repositories on GitHub
3. Check arXiv for highly-cited papers on language models and agents

Structure:
## Headlines (3-5 major stories)
## Notable Papers (2-3 papers with one-sentence summaries)
## Open Source (interesting new repos or major releases)
## Industry Moves (funding, acquisitions, launches)

Keep each item to 1-2 sentences. Include links. Total under 600 words." \
  --name "Weekly AI digest" \
  --deliver telegram
```

### è®ºæ–‡æ‘˜è¦ä¸Žç¬”è®°

æ¯æ—¥æ‰«æ arXiv å¹¶å°†æ‘˜è¦ä¿å­˜åˆ°ç¬”è®°ç³»ç»Ÿã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯æ—¥ï¼‰

```bash
zed cron create "0 8 * * *" \
  "Search arXiv for the 3 most interesting papers on 'language model reasoning' OR 'tool-use agents' from the past day. For each paper, create an Obsidian note with the title, authors, abstract summary, key contribution, and potential relevance to Zed Agent development." \
  --skill arxiv --skill obsidian \
  --name "Paper digest" \
  --deliver local
```

---

## GitHub äº‹ä»¶è‡ªåŠ¨åŒ–

### Issue è‡ªåŠ¨æ‰“æ ‡ç­¾

è‡ªåŠ¨å¯¹æ–° issue æ‰“æ ‡ç­¾å¹¶å›žå¤ã€‚

**è§¦å‘æ–¹å¼ï¼š** GitHub webhook

```bash
zed webhook subscribe github-issues \
  --events "issues" \
  --prompt "New GitHub issue received:
Repository: {repository.full_name}
Issue #{issue.number}: {issue.title}
Author: {issue.user.login}
Action: {action}
Body: {issue.body}
Labels: {issue.labels}

If this is a new issue (action=opened):
1. Read the issue title and body carefully
2. Suggest appropriate labels (bug, feature, docs, security, question)
3. If it's a bug report, check if you can identify the affected component from the description
4. Post a helpful initial response acknowledging the issue

If this is a label or assignment change, respond with [SILENT]." \
  --deliver github_comment
```

### CI å¤±è´¥åˆ†æž

åˆ†æž CI å¤±è´¥åŽŸå› å¹¶åœ¨ PR ä¸Šå‘å¸ƒè¯Šæ–­ä¿¡æ¯ã€‚

**è§¦å‘æ–¹å¼ï¼š** GitHub webhook

```yaml
# config.yaml route
platforms:
  webhook:
    enabled: true
    extra:
      routes:
        ci-failure:
          events: ["check_run"]
          secret: "ci-secret"
          prompt: |
            CI check failed:
            Repository: {repository.full_name}
            Check: {check_run.name}
            Status: {check_run.conclusion}
            PR: #{check_run.pull_requests.0.number}
            Details URL: {check_run.details_url}

            If conclusion is "failure":
            1. Fetch the log from the details URL if accessible
            2. Identify the likely cause of failure
            3. Suggest a fix
            If conclusion is "success", respond with [SILENT].
          deliver: "github_comment"
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{check_run.pull_requests.0.number}"
```

### è·¨ä»“åº“è‡ªåŠ¨ç§»æ¤å˜æ›´

æŸä»“åº“ PR åˆå¹¶åŽï¼Œè‡ªåŠ¨å°†ç­‰æ•ˆå˜æ›´ç§»æ¤åˆ°å¦ä¸€ä¸ªä»“åº“ã€‚

**è§¦å‘æ–¹å¼ï¼š** GitHub webhook

```bash
zed webhook subscribe auto-port \
  --events "pull_request" \
  --prompt "PR merged in the source repository:
Repository: {repository.full_name}
PR #{pull_request.number}: {pull_request.title}
Author: {pull_request.user.login}
Action: {action}
Merge commit: {pull_request.merge_commit_sha}

If action is 'closed' and pull_request.merged is true:
1. Fetch the diff: curl -sL {pull_request.diff_url}
2. Analyze what changed
3. Determine if this change needs to be ported to the Go SDK equivalent
4. If yes, create a branch, apply the equivalent changes, and open a PR on the target repo
5. Reference the original PR in the new PR description

If action is not 'closed' or not merged, respond with [SILENT]." \
  --skill github-pr-workflow \
  --deliver log
```

---

## ä¸šåŠ¡è¿è¥

### Stripe æ”¯ä»˜ç›‘æŽ§

è·Ÿè¸ªæ”¯ä»˜äº‹ä»¶å¹¶æ±‡æ€»å¤±è´¥æƒ…å†µã€‚

**è§¦å‘æ–¹å¼ï¼š** API è°ƒç”¨ï¼ˆwebhookï¼‰

```bash
zed webhook subscribe stripe-payments \
  --events "payment_intent.succeeded,payment_intent.payment_failed,charge.dispute.created" \
  --prompt "Stripe event received:
Event type: {type}
Amount: {data.object.amount} cents ({data.object.currency})
Customer: {data.object.customer}
Status: {data.object.status}

For payment_intent.payment_failed:
- Identify the failure reason from {data.object.last_payment_error}
- Suggest whether this is a transient issue (retry) or permanent (contact customer)

For charge.dispute.created:
- Flag as urgent
- Summarize the dispute details

For payment_intent.succeeded:
- Brief confirmation only

Keep responses concise for the ops channel." \
  --deliver slack
```

### æ¯æ—¥è¥æ”¶æ‘˜è¦

æ¯å¤©æ—©æ™¨æ±‡æ€»å…³é”®ä¸šåŠ¡æŒ‡æ ‡ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯æ—¥ï¼‰

```bash
zed cron create "0 8 * * *" \
  "Generate a morning business metrics summary.

Search the web for:
1. Current Bitcoin and Ethereum prices
2. S&P 500 status (pre-market or previous close)
3. Any major tech/AI industry news from the last 12 hours

Format as a brief morning briefing, 3-4 bullet points max.
Deliver as a clean, scannable message." \
  --name "Morning briefing" \
  --deliver telegram
```

---

## å¤šæŠ€èƒ½å·¥ä½œæµ

### å®‰å…¨å®¡è®¡æµæ°´çº¿

ç»„åˆå¤šä¸ªæŠ€èƒ½ï¼Œæ¯å‘¨è¿›è¡Œå…¨é¢å®‰å…¨å®¡æŸ¥ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯å‘¨ï¼‰

```bash
zed cron create "0 3 * * 0" \
  "Run a comprehensive security audit of the zed-agent codebase.

1. Check for dependency vulnerabilities (pip audit, npm audit)
2. Search the codebase for common security anti-patterns:
   - Hardcoded secrets or API keys
   - SQL injection vectors (string formatting in queries)
   - Path traversal risks (user input in file paths without validation)
   - Unsafe deserialization (pickle.loads, yaml.load without SafeLoader)
3. Review recent commits (last 7 days) for security-relevant changes
4. Check if any new environment variables were added without being documented

Write a security report with findings categorized by severity (Critical, High, Medium, Low).
If nothing found, report a clean bill of health." \
  --skill codebase-security-audit \
  --name "Weekly security audit" \
  --deliver telegram
```

### å†…å®¹æµæ°´çº¿

æŒ‰è®¡åˆ’ç ”ç©¶ã€èµ·è‰å¹¶å‡†å¤‡å†…å®¹ã€‚

**è§¦å‘æ–¹å¼ï¼š** å®šæ—¶ï¼ˆæ¯å‘¨ï¼‰

```bash
zed cron create "0 10 * * 3" \
  "Research and draft a technical blog post outline about a trending topic in AI agents.

1. Search the web for the most discussed AI agent topics this week
2. Pick the most interesting one that's relevant to open-source AI agents
3. Create an outline with:
   - Hook/intro angle
   - 3-4 key sections
   - Technical depth appropriate for developers
   - Conclusion with actionable takeaway
4. Save the outline to ~/drafts/blog-$(date +%Y%m%d).md

Keep the outline to ~300 words. This is a starting point, not a finished post." \
  --name "Blog outline" \
  --deliver local
```

---

## å¿«é€Ÿå‚è€ƒ

### Cron è°ƒåº¦è¯­æ³•

| è¡¨è¾¾å¼ | å«ä¹‰ |
|-----------|---------|
| `every 30m` | æ¯ 30 åˆ†é’Ÿ |
| `every 2h` | æ¯ 2 å°æ—¶ |
| `0 2 * * *` | æ¯å¤©å‡Œæ™¨ 2:00 |
| `0 9 * * 1` | æ¯å‘¨ä¸€ä¸Šåˆ 9:00 |
| `0 9 * * 1-5` | å·¥ä½œæ—¥ä¸Šåˆ 9:00 |
| `0 3 * * 0` | æ¯å‘¨æ—¥å‡Œæ™¨ 3:00 |
| `0 */6 * * *` | æ¯ 6 å°æ—¶ |

### æŠ•é€’ç›®æ ‡

| ç›®æ ‡ | å‚æ•° | è¯´æ˜Ž |
|--------|------|-------|
| å½“å‰ä¼šè¯ | `--deliver origin` | é»˜è®¤â€”â€”æŠ•é€’åˆ°ä»»åŠ¡åˆ›å»ºæ‰€åœ¨çš„ä½ç½® |
| æœ¬åœ°æ–‡ä»¶ | `--deliver local` | ä¿å­˜è¾“å‡ºï¼Œä¸å‘é€é€šçŸ¥ |
| Telegram | `--deliver telegram` | ä¸»é¢‘é“ï¼Œæˆ–ç”¨ `telegram:CHAT_ID` æŒ‡å®šç‰¹å®šä¼šè¯ |
| Discord | `--deliver discord` | ä¸»é¢‘é“ï¼Œæˆ–ç”¨ `discord:CHANNEL_ID` æŒ‡å®š |
| Slack | `--deliver slack` | ä¸»é¢‘é“ |
| SMS | `--deliver sms:+15551234567` | ç›´æŽ¥å‘é€åˆ°æ‰‹æœºå· |
| æŒ‡å®šè¯é¢˜ | `--deliver telegram:-100123:456` | Telegram è®ºå›è¯é¢˜ |

### Webhook æ¨¡æ¿å˜é‡

| å˜é‡ | è¯´æ˜Ž |
|----------|-------------|
| `{pull_request.title}` | PR æ ‡é¢˜ |
| `{issue.number}` | Issue ç¼–å· |
| `{repository.full_name}` | `owner/repo` |
| `{action}` | äº‹ä»¶åŠ¨ä½œï¼ˆopenedã€closed ç­‰ï¼‰ |
| `{__raw__}` | å®Œæ•´ JSON payloadï¼ˆæˆªæ–­è‡³ 4000 å­—ç¬¦ï¼‰ |
| `{sender.login}` | è§¦å‘äº‹ä»¶çš„ GitHub ç”¨æˆ· |

### [SILENT] æ¨¡å¼

å½“ cron ä»»åŠ¡çš„å“åº”åŒ…å« `[SILENT]` æ—¶ï¼ŒæŠ•é€’å°†è¢«æŠ‘åˆ¶ã€‚ä½¿ç”¨æ­¤æ¨¡å¼å¯é¿å…åœ¨æ— äº‹å‘ç”Ÿæ—¶äº§ç”Ÿé€šçŸ¥å™ªéŸ³ï¼š

```
If nothing noteworthy happened, respond with [SILENT].
```

è¿™æ ·åªæœ‰å½“ Agent æœ‰å†…å®¹éœ€è¦æ±‡æŠ¥æ—¶ï¼Œä½ æ‰ä¼šæ”¶åˆ°é€šçŸ¥ã€‚