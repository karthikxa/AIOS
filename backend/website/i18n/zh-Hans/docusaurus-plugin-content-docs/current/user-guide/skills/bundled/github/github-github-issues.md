---
title: "Github Issues â€” é€šè¿‡ gh æˆ– REST åˆ›å»ºã€åˆ†ç±»ã€æ ‡è®°ã€åˆ†é… GitHub Issues"
sidebar_label: "Github Issues"
description: "é€šè¿‡ gh æˆ– REST åˆ›å»ºã€åˆ†ç±»ã€æ ‡è®°ã€åˆ†é… GitHub Issues"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Github Issues

é€šè¿‡ gh æˆ– REST åˆ›å»ºã€åˆ†ç±»ã€æ ‡è®°ã€åˆ†é… GitHub Issuesã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/github/github-issues` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `GitHub`, `Issues`, `Project-Management`, `Bug-Tracking`, `Triage` |
| ç›¸å…³ skills | [`github-auth`](/user-guide/skills/bundled/github/github-github-auth), [`github-pr-workflow`](/user-guide/skills/bundled/github/github-github-pr-workflow) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# GitHub Issues ç®¡ç†

åˆ›å»ºã€æœç´¢ã€åˆ†ç±»å’Œç®¡ç† GitHub Issuesã€‚æ¯ä¸ªç« èŠ‚å…ˆå±•ç¤º `gh` å‘½ä»¤ï¼Œå†å±•ç¤º `curl` å¤‡ç”¨æ–¹æ¡ˆã€‚

## å‰ææ¡ä»¶

- å·²é€šè¿‡ GitHub è®¤è¯ï¼ˆå‚è§ `github-auth` skillï¼‰
- ä½äºŽå«æœ‰ GitHub è¿œç¨‹ä»“åº“çš„ git ä»“åº“å†…ï¼Œæˆ–æ˜¾å¼æŒ‡å®šä»“åº“

### è®¾ç½®

```bash
if command -v gh &>/dev/null && gh auth status &>/dev/null; then
  AUTH="gh"
else
  AUTH="git"
  if [ -z "$GITHUB_TOKEN" ]; then
    if [ -f ~/.zed/.env ] && grep -q "^GITHUB_TOKEN=" ~/.zed/.env; then
      GITHUB_TOKEN=$(grep "^GITHUB_TOKEN=" ~/.zed/.env | head -1 | cut -d= -f2 | tr -d '\n\r')
    elif grep -q "github.com" ~/.git-credentials 2>/dev/null; then
      GITHUB_TOKEN=$(grep "github.com" ~/.git-credentials 2>/dev/null | head -1 | sed 's|https://[^:]*:\([^@]*\)@.*|\1|')
    fi
  fi
fi

REMOTE_URL=$(git remote get-url origin)
OWNER_REPO=$(echo "$REMOTE_URL" | sed -E 's|.*github\.com[:/]||; s|\.git$||')
OWNER=$(echo "$OWNER_REPO" | cut -d/ -f1)
REPO=$(echo "$OWNER_REPO" | cut -d/ -f2)
```

---

## 1. æŸ¥çœ‹ Issues

**ä½¿ç”¨ ghï¼š**

```bash
gh issue list
gh issue list --state open --label "bug"
gh issue list --assignee @me
gh issue list --search "authentication error" --state all
gh issue view 42
```

**ä½¿ç”¨ curlï¼š**

```bash
# åˆ—å‡ºå¼€æ”¾çš„ issues
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO/issues?state=open&per_page=20" \
  | python3 -c "
import sys, json
for i in json.load(sys.stdin):
    if 'pull_request' not in i:  # GitHub API returns PRs in /issues too
        labels = ', '.join(l['name'] for l in i['labels'])
        print(f\"#{i['number']:5}  {i['state']:6}  {labels:30}  {i['title']}\")"

# æŒ‰æ ‡ç­¾è¿‡æ»¤
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO/issues?state=open&labels=bug&per_page=20" \
  | python3 -c "
import sys, json
for i in json.load(sys.stdin):
    if 'pull_request' not in i:
        print(f\"#{i['number']}  {i['title']}\")"

# æŸ¥çœ‹ç‰¹å®š issue
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/42 \
  | python3 -c "
import sys, json
i = json.load(sys.stdin)
labels = ', '.join(l['name'] for l in i['labels'])
assignees = ', '.join(a['login'] for a in i['assignees'])
print(f\"#{i['number']}: {i['title']}\")
print(f\"State: {i['state']}  Labels: {labels}  Assignees: {assignees}\")
print(f\"Author: {i['user']['login']}  Created: {i['created_at']}\")
print(f\"\n{i['body']}\")"

# æœç´¢ issues
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/search/issues?q=authentication+error+repo:$OWNER/$REPO" \
  | python3 -c "
import sys, json
for i in json.load(sys.stdin)['items']:
    print(f\"#{i['number']}  {i['state']:6}  {i['title']}\")"
```

## 2. åˆ›å»º Issues

**ä½¿ç”¨ ghï¼š**

```bash
gh issue create \
  --title "Login redirect ignores ?next= parameter" \
  --body "## Description
After logging in, users always land on /dashboard.

## Steps to Reproduce
1. Navigate to /settings while logged out
2. Get redirected to /login?next=/settings
3. Log in
4. Actual: redirected to /dashboard (should go to /settings)

## Expected Behavior
Respect the ?next= query parameter." \
  --label "bug,backend" \
  --assignee "username"
```

**ä½¿ç”¨ curlï¼š**

```bash
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues \
  -d '{
    "title": "Login redirect ignores ?next= parameter",
    "body": "## Description\nAfter logging in, users always land on /dashboard.\n\n## Steps to Reproduce\n1. Navigate to /settings while logged out\n2. Get redirected to /login?next=/settings\n3. Log in\n4. Actual: redirected to /dashboard\n\n## Expected Behavior\nRespect the ?next= query parameter.",
    "labels": ["bug", "backend"],
    "assignees": ["username"]
  }'
```

### Bug æŠ¥å‘Šæ¨¡æ¿

```
## Bug Description
<What's happening>

## Steps to Reproduce
1. <step>
2. <step>

## Expected Behavior
<What should happen>

## Actual Behavior
<What actually happens>

## Environment
- OS: <os>
- Version: <version>
```

### åŠŸèƒ½è¯·æ±‚æ¨¡æ¿

```
## Feature Description
<What you want>

## Motivation
<Why this would be useful>

## Proposed Solution
<How it could work>

## Alternatives Considered
<Other approaches>
```

## 3. ç®¡ç† Issues

### æ·»åŠ /ç§»é™¤æ ‡ç­¾

**ä½¿ç”¨ ghï¼š**

```bash
gh issue edit 42 --add-label "priority:high,bug"
gh issue edit 42 --remove-label "needs-triage"
```

**ä½¿ç”¨ curlï¼š**

```bash
# æ·»åŠ æ ‡ç­¾
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/42/labels \
  -d '{"labels": ["priority:high", "bug"]}'

# ç§»é™¤æ ‡ç­¾
curl -s -X DELETE \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/42/labels/needs-triage

# åˆ—å‡ºä»“åº“ä¸­å¯ç”¨çš„æ ‡ç­¾
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/labels \
  | python3 -c "
import sys, json
for l in json.load(sys.stdin):
    print(f\"  {l['name']:30}  {l.get('description', '')}\")"
```

### åˆ†é…

**ä½¿ç”¨ ghï¼š**

```bash
gh issue edit 42 --add-assignee username
gh issue edit 42 --add-assignee @me
```

**ä½¿ç”¨ curlï¼š**

```bash
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/42/assignees \
  -d '{"assignees": ["username"]}'
```

### è¯„è®º

**ä½¿ç”¨ ghï¼š**

```bash
gh issue comment 42 --body "Investigated â€” root cause is in auth middleware. Working on a fix."
```

**ä½¿ç”¨ curlï¼š**

```bash
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/42/comments \
  -d '{"body": "Investigated â€” root cause is in auth middleware. Working on a fix."}'
```

### å…³é—­ä¸Žé‡æ–°å¼€å¯

**ä½¿ç”¨ ghï¼š**

```bash
gh issue close 42
gh issue close 42 --reason "not planned"
gh issue reopen 42
```

**ä½¿ç”¨ curlï¼š**

```bash
# å…³é—­
curl -s -X PATCH \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/42 \
  -d '{"state": "closed", "state_reason": "completed"}'

# é‡æ–°å¼€å¯
curl -s -X PATCH \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/42 \
  -d '{"state": "open"}'
```

### å°† Issues å…³è”åˆ° PR

å½“ PR åˆå¹¶æ—¶ï¼Œè‹¥ PR æ­£æ–‡ä¸­åŒ…å«ä»¥ä¸‹å…³é”®è¯ï¼Œå¯¹åº” issue å°†è‡ªåŠ¨å…³é—­ï¼š

```
Closes #42
Fixes #42
Resolves #42
```

ä»Ž issue åˆ›å»ºåˆ†æ”¯ï¼š

**ä½¿ç”¨ ghï¼š**

```bash
gh issue develop 42 --checkout
```

**ä½¿ç”¨ gitï¼ˆæ‰‹åŠ¨ç­‰æ•ˆæ–¹å¼ï¼‰ï¼š**

```bash
git checkout main && git pull origin main
git checkout -b fix/issue-42-login-redirect
```

## 4. Issue åˆ†ç±»å·¥ä½œæµ

å½“è¢«è¦æ±‚å¯¹ issues è¿›è¡Œåˆ†ç±»æ—¶ï¼š

1. **åˆ—å‡ºæœªåˆ†ç±»çš„ issuesï¼š**

```bash
# ä½¿ç”¨ gh
gh issue list --label "needs-triage" --state open

# ä½¿ç”¨ curl
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO/issues?labels=needs-triage&state=open" \
  | python3 -c "
import sys, json
for i in json.load(sys.stdin):
    if 'pull_request' not in i:
        print(f\"#{i['number']}  {i['title']}\")"
```

2. **é˜…è¯»å¹¶åˆ†ç±»**æ¯ä¸ª issueï¼ˆæŸ¥çœ‹è¯¦æƒ…ï¼Œç†è§£ bug æˆ–åŠŸèƒ½éœ€æ±‚ï¼‰

3. **æ·»åŠ æ ‡ç­¾å’Œä¼˜å…ˆçº§**ï¼ˆå‚è§ä¸Šæ–¹"ç®¡ç† Issues"ç« èŠ‚ï¼‰

4. **åˆ†é…è´Ÿè´£äºº**ï¼ˆè‹¥å½’å±žæ˜Žç¡®ï¼‰

5. **å¦‚æœ‰éœ€è¦ï¼Œæ·»åŠ åˆ†ç±»è¯´æ˜Žè¯„è®º**

## 5. æ‰¹é‡æ“ä½œ

å¯¹äºŽæ‰¹é‡æ“ä½œï¼Œå¯å°† API è°ƒç”¨ä¸Ž shell è„šæœ¬ç»“åˆä½¿ç”¨ï¼š

**ä½¿ç”¨ ghï¼š**

```bash
# å…³é—­æ‰€æœ‰å¸¦ç‰¹å®šæ ‡ç­¾çš„ issues
gh issue list --label "wontfix" --json number --jq '.[].number' | \
  xargs -I {} gh issue close {} --reason "not planned"
```

**ä½¿ç”¨ curlï¼š**

```bash
# åˆ—å‡ºå¸¦æŸæ ‡ç­¾çš„ issue ç¼–å·ï¼Œç„¶åŽé€ä¸€å…³é—­
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO/issues?labels=wontfix&state=open" \
  | python3 -c "import sys,json; [print(i['number']) for i in json.load(sys.stdin)]" \
  | while read num; do
    curl -s -X PATCH \
      -H "Authorization: token $GITHUB_TOKEN" \
      https://api.github.com/repos/$OWNER/$REPO/issues/$num \
      -d '{"state": "closed", "state_reason": "not_planned"}'
    echo "Closed #$num"
  done
```

## å¿«é€Ÿå‚è€ƒè¡¨

| æ“ä½œ | gh | curl ç«¯ç‚¹ |
|--------|-----|--------------|
| åˆ—å‡º issues | `gh issue list` | `GET /repos/{o}/{r}/issues` |
| æŸ¥çœ‹ issue | `gh issue view N` | `GET /repos/{o}/{r}/issues/N` |
| åˆ›å»º issue | `gh issue create ...` | `POST /repos/{o}/{r}/issues` |
| æ·»åŠ æ ‡ç­¾ | `gh issue edit N --add-label ...` | `POST /repos/{o}/{r}/issues/N/labels` |
| åˆ†é… | `gh issue edit N --add-assignee ...` | `POST /repos/{o}/{r}/issues/N/assignees` |
| è¯„è®º | `gh issue comment N --body ...` | `POST /repos/{o}/{r}/issues/N/comments` |
| å…³é—­ | `gh issue close N` | `PATCH /repos/{o}/{r}/issues/N` |
| æœç´¢ | `gh issue list --search "..."` | `GET /search/issues?q=...` |