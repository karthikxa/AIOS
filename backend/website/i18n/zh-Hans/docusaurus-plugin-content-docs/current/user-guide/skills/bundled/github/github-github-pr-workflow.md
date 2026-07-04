---
title: "Github Pr Workflow â€” GitHub PR ç”Ÿå‘½å‘¨æœŸï¼šåˆ†æ”¯ã€æäº¤ã€å¼€å¯ã€CIã€åˆå¹¶"
sidebar_label: "Github Pr Workflow"
description: "GitHub PR ç”Ÿå‘½å‘¨æœŸï¼šåˆ†æ”¯ã€æäº¤ã€å¼€å¯ã€CIã€åˆå¹¶"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Github Pr Workflow

GitHub PR ç”Ÿå‘½å‘¨æœŸï¼šåˆ†æ”¯ã€æäº¤ã€å¼€å¯ã€CIã€åˆå¹¶ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/github/github-pr-workflow` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `GitHub`, `Pull-Requests`, `CI/CD`, `Git`, `Automation`, `Merge` |
| ç›¸å…³ skill | [`github-auth`](/user-guide/skills/bundled/github/github-github-auth), [`github-code-review`](/user-guide/skills/bundled/github/github-github-code-review) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# GitHub Pull Request å·¥ä½œæµ

ç®¡ç† PR ç”Ÿå‘½å‘¨æœŸçš„å®Œæ•´æŒ‡å—ã€‚æ¯ä¸ªç« èŠ‚ä¼˜å…ˆå±•ç¤º `gh` æ–¹å¼ï¼Œå†ç»™å‡ºé€‚ç”¨äºŽæ—  `gh` çŽ¯å¢ƒçš„ `git` + `curl` å¤‡ç”¨æ–¹æ¡ˆã€‚

## å‰ææ¡ä»¶

- å·²é€šè¿‡ GitHub è®¤è¯ï¼ˆå‚è§ `github-auth` skillï¼‰
- ä½äºŽå«æœ‰ GitHub è¿œç¨‹ä»“åº“çš„ git ä»“åº“ä¸­

### å¿«é€Ÿè®¤è¯æ£€æµ‹

```bash
# Determine which method to use throughout this workflow
if command -v gh &>/dev/null && gh auth status &>/dev/null; then
  AUTH="gh"
else
  AUTH="git"
  # Ensure we have a token for API calls
  if [ -z "$GITHUB_TOKEN" ]; then
    if [ -f ~/.zed/.env ] && grep -q "^GITHUB_TOKEN=" ~/.zed/.env; then
      GITHUB_TOKEN=$(grep "^GITHUB_TOKEN=" ~/.zed/.env | head -1 | cut -d= -f2 | tr -d '\n\r')
    elif grep -q "github.com" ~/.git-credentials 2>/dev/null; then
      GITHUB_TOKEN=$(grep "github.com" ~/.git-credentials 2>/dev/null | head -1 | sed 's|https://[^:]*:\([^@]*\)@.*|\1|')
    fi
  fi
fi
echo "Using: $AUTH"
```

### ä»Ž Git è¿œç¨‹åœ°å€æå– Owner/Repo

è®¸å¤š `curl` å‘½ä»¤éœ€è¦ `owner/repo`ã€‚ä»Ž git è¿œç¨‹åœ°å€ä¸­æå–ï¼š

```bash
# Works for both HTTPS and SSH remote URLs
REMOTE_URL=$(git remote get-url origin)
OWNER_REPO=$(echo "$REMOTE_URL" | sed -E 's|.*github\.com[:/]||; s|\.git$||')
OWNER=$(echo "$OWNER_REPO" | cut -d/ -f1)
REPO=$(echo "$OWNER_REPO" | cut -d/ -f2)
echo "Owner: $OWNER, Repo: $REPO"
```

---

## 1. åˆ›å»ºåˆ†æ”¯

æ­¤éƒ¨åˆ†ä¸ºçº¯ `git` æ“ä½œâ€”â€”ä¸¤ç§æ–¹å¼å®Œå…¨ç›¸åŒï¼š

```bash
# Make sure you're up to date
git fetch origin
git checkout main && git pull origin main

# Create and switch to a new branch
git checkout -b feat/add-user-authentication
```

åˆ†æ”¯å‘½åè§„èŒƒï¼š
- `feat/description` â€” æ–°åŠŸèƒ½
- `fix/description` â€” ç¼ºé™·ä¿®å¤
- `refactor/description` â€” ä»£ç é‡æž„
- `docs/description` â€” æ–‡æ¡£
- `ci/description` â€” CI/CD å˜æ›´

## 2. æäº¤å˜æ›´

ä½¿ç”¨ agent çš„æ–‡ä»¶å·¥å…·ï¼ˆ`write_file`ã€`patch`ï¼‰è¿›è¡Œä¿®æ”¹ï¼Œç„¶åŽæäº¤ï¼š

```bash
# Stage specific files
git add src/auth.py src/models/user.py tests/test_auth.py

# Commit with a conventional commit message
git commit -m "feat: add JWT-based user authentication

- Add login/register endpoints
- Add User model with password hashing
- Add auth middleware for protected routes
- Add unit tests for auth flow"
```

æäº¤ä¿¡æ¯æ ¼å¼ï¼ˆConventional Commitsï¼‰ï¼š
```
type(scope): short description

Longer explanation if needed. Wrap at 72 characters.
```

ç±»åž‹ï¼š`feat`ã€`fix`ã€`refactor`ã€`docs`ã€`test`ã€`ci`ã€`chore`ã€`perf`

## 3. æŽ¨é€åˆ†æ”¯å¹¶åˆ›å»º PR

### æŽ¨é€åˆ†æ”¯ï¼ˆä¸¤ç§æ–¹å¼ç›¸åŒï¼‰

```bash
git push -u origin HEAD
```

### åˆ›å»º PR

**ä½¿ç”¨ ghï¼š**

```bash
gh pr create \
  --title "feat: add JWT-based user authentication" \
  --body "## Summary
- Adds login and register API endpoints
- JWT token generation and validation

## Test Plan
- [ ] Unit tests pass

Closes #42"
```

é€‰é¡¹ï¼š`--draft`ã€`--reviewer user1,user2`ã€`--label "enhancement"`ã€`--base develop`

**ä½¿ç”¨ git + curlï¼š**

```bash
BRANCH=$(git branch --show-current)

curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$OWNER/$REPO/pulls \
  -d "{
    \"title\": \"feat: add JWT-based user authentication\",
    \"body\": \"## Summary\nAdds login and register API endpoints.\n\nCloses #42\",
    \"head\": \"$BRANCH\",
    \"base\": \"main\"
  }"
```

å“åº” JSON ä¸­åŒ…å« PR çš„ `number`â€”â€”è¯·ä¿å­˜ä»¥ä¾›åŽç»­å‘½ä»¤ä½¿ç”¨ã€‚

è‹¥è¦åˆ›å»ºè‰ç¨¿ PRï¼Œåœ¨ JSON body ä¸­æ·»åŠ  `"draft": true`ã€‚

## 4. ç›‘æŽ§ CI çŠ¶æ€

### æ£€æŸ¥ CI çŠ¶æ€

**ä½¿ç”¨ ghï¼š**

```bash
# One-shot check
gh pr checks

# Watch until all checks finish (polls every 10s)
gh pr checks --watch
```

**ä½¿ç”¨ git + curlï¼š**

```bash
# Get the latest commit SHA on the current branch
SHA=$(git rev-parse HEAD)

# Query the combined status
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/commits/$SHA/status \
  | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(f\"Overall: {data['state']}\")
for s in data.get('statuses', []):
    print(f\"  {s['context']}: {s['state']} - {s.get('description', '')}\")"

# Also check GitHub Actions check runs (separate endpoint)
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/commits/$SHA/check-runs \
  | python3 -c "
import sys, json
data = json.load(sys.stdin)
for cr in data.get('check_runs', []):
    print(f\"  {cr['name']}: {cr['status']} / {cr['conclusion'] or 'pending'}\")"
```

### è½®è¯¢ç›´è‡³å®Œæˆï¼ˆgit + curlï¼‰

```bash
# Simple polling loop â€” check every 30 seconds, up to 10 minutes
SHA=$(git rev-parse HEAD)
for i in $(seq 1 20); do
  STATUS=$(curl -s \
    -H "Authorization: token $GITHUB_TOKEN" \
    https://api.github.com/repos/$OWNER/$REPO/commits/$SHA/status \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['state'])")
  echo "Check $i: $STATUS"
  if [ "$STATUS" = "success" ] || [ "$STATUS" = "failure" ] || [ "$STATUS" = "error" ]; then
    break
  fi
  sleep 30
done
```

## 5. è‡ªåŠ¨ä¿®å¤ CI å¤±è´¥

å½“ CI å¤±è´¥æ—¶ï¼Œè¿›è¡Œè¯Šæ–­å¹¶ä¿®å¤ã€‚æ­¤å¾ªçŽ¯é€‚ç”¨äºŽä¸¤ç§è®¤è¯æ–¹å¼ã€‚

### ç¬¬ä¸€æ­¥ï¼šèŽ·å–å¤±è´¥è¯¦æƒ…

**ä½¿ç”¨ ghï¼š**

```bash
# List recent workflow runs on this branch
gh run list --branch $(git branch --show-current) --limit 5

# View failed logs
gh run view <RUN_ID> --log-failed
```

**ä½¿ç”¨ git + curlï¼š**

```bash
BRANCH=$(git branch --show-current)

# List workflow runs on this branch
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO/actions/runs?branch=$BRANCH&per_page=5" \
  | python3 -c "
import sys, json
runs = json.load(sys.stdin)['workflow_runs']
for r in runs:
    print(f\"Run {r['id']}: {r['name']} - {r['conclusion'] or r['status']}\")"

# Get failed job logs (download as zip, extract, read)
RUN_ID=<run_id>
curl -s -L \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/actions/runs/$RUN_ID/logs \
  -o /tmp/ci-logs.zip
cd /tmp && unzip -o ci-logs.zip -d ci-logs && cat ci-logs/*.txt
```

### ç¬¬äºŒæ­¥ï¼šä¿®å¤å¹¶æŽ¨é€

å®šä½é—®é¢˜åŽï¼Œä½¿ç”¨æ–‡ä»¶å·¥å…·ï¼ˆ`patch`ã€`write_file`ï¼‰è¿›è¡Œä¿®å¤ï¼š

```bash
git add <fixed_files>
git commit -m "fix: resolve CI failure in <check_name>"
git push
```

### ç¬¬ä¸‰æ­¥ï¼šéªŒè¯

ä½¿ç”¨ç¬¬ 4 èŠ‚ä¸­çš„å‘½ä»¤é‡æ–°æ£€æŸ¥ CI çŠ¶æ€ã€‚

### è‡ªåŠ¨ä¿®å¤å¾ªçŽ¯æ¨¡å¼

å½“è¢«è¦æ±‚è‡ªåŠ¨ä¿®å¤ CI æ—¶ï¼Œéµå¾ªä»¥ä¸‹å¾ªçŽ¯ï¼š

1. æ£€æŸ¥ CI çŠ¶æ€ â†’ è¯†åˆ«å¤±è´¥é¡¹
2. è¯»å–å¤±è´¥æ—¥å¿— â†’ ç†è§£é”™è¯¯åŽŸå› 
3. ä½¿ç”¨ `read_file` + `patch`/`write_file` â†’ ä¿®å¤ä»£ç 
4. `git add . && git commit -m "fix: ..." && git push`
5. ç­‰å¾… CI â†’ é‡æ–°æ£€æŸ¥çŠ¶æ€
6. è‹¥ä»å¤±è´¥åˆ™é‡å¤ï¼ˆæœ€å¤š 3 æ¬¡ï¼Œä¹‹åŽè¯¢é—®ç”¨æˆ·ï¼‰

## 6. åˆå¹¶

**ä½¿ç”¨ ghï¼š**

```bash
# Squash merge + delete branch (cleanest for feature branches)
gh pr merge --squash --delete-branch

# Enable auto-merge (merges when all checks pass)
gh pr merge --auto --squash --delete-branch
```

**ä½¿ç”¨ git + curlï¼š**

```bash
PR_NUMBER=<number>

# Merge the PR via API (squash)
curl -s -X PUT \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER/merge \
  -d "{
    \"merge_method\": \"squash\",
    \"commit_title\": \"feat: add user authentication (#$PR_NUMBER)\"
  }"

# Delete the remote branch after merge
BRANCH=$(git branch --show-current)
git push origin --delete $BRANCH

# Switch back to main locally
git checkout main && git pull origin main
git branch -d $BRANCH
```

åˆå¹¶æ–¹å¼ï¼š`"merge"`ï¼ˆåˆå¹¶æäº¤ï¼‰ã€`"squash"`ã€`"rebase"`

### å¯ç”¨è‡ªåŠ¨åˆå¹¶ï¼ˆcurlï¼‰

```bash
# Auto-merge requires the repo to have it enabled in settings.
# This uses the GraphQL API since REST doesn't support auto-merge.
PR_NODE_ID=$(curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['node_id'])")

curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/graphql \
  -d "{\"query\": \"mutation { enablePullRequestAutoMerge(input: {pullRequestId: \\\"$PR_NODE_ID\\\", mergeMethod: SQUASH}) { clientMutationId } }\"}"
```

## 7. å®Œæ•´å·¥ä½œæµç¤ºä¾‹

```bash
# 1. Start from clean main
git checkout main && git pull origin main

# 2. Branch
git checkout -b fix/login-redirect-bug

# 3. (Agent makes code changes with file tools)

# 4. Commit
git add src/auth/login.py tests/test_login.py
git commit -m "fix: correct redirect URL after login

Preserves the ?next= parameter instead of always redirecting to /dashboard."

# 5. Push
git push -u origin HEAD

# 6. Create PR (picks gh or curl based on what's available)
# ... (see Section 3)

# 7. Monitor CI (see Section 4)

# 8. Merge when green (see Section 6)
```

## å¸¸ç”¨ PR å‘½ä»¤å‚è€ƒ

| æ“ä½œ | gh | git + curl |
|--------|-----|-----------|
| åˆ—å‡ºæˆ‘çš„ PR | `gh pr list --author @me` | `curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$OWNER/$REPO/pulls?state=open"` |
| æŸ¥çœ‹ PR diff | `gh pr diff` | `git diff main...HEAD`ï¼ˆæœ¬åœ°ï¼‰æˆ– `curl -H "Accept: application/vnd.github.diff" ...` |
| æ·»åŠ è¯„è®º | `gh pr comment N --body "..."` | `curl -X POST .../issues/N/comments -d '{"body":"..."}'` |
| è¯·æ±‚å®¡æŸ¥ | `gh pr edit N --add-reviewer user` | `curl -X POST .../pulls/N/requested_reviewers -d '{"reviewers":["user"]}'` |
| å…³é—­ PR | `gh pr close N` | `curl -X PATCH .../pulls/N -d '{"state":"closed"}'` |
| æ£€å‡ºä»–äººçš„ PR | `gh pr checkout N` | `git fetch origin pull/N/head:pr-N && git checkout pr-N` |