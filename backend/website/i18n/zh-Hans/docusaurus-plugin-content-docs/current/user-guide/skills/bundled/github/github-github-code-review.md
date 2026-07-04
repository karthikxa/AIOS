---
title: "Github Code Review â€” é€šè¿‡ gh æˆ– REST å®¡æŸ¥ PRï¼šå·®å¼‚å¯¹æ¯”ã€è¡Œå†…è¯„è®º"
sidebar_label: "Github Code Review"
description: "é€šè¿‡ gh æˆ– REST å®¡æŸ¥ PRï¼šå·®å¼‚å¯¹æ¯”ã€è¡Œå†…è¯„è®º"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Github Code Review

é€šè¿‡ gh æˆ– REST å®¡æŸ¥ PRï¼šå·®å¼‚å¯¹æ¯”ã€è¡Œå†…è¯„è®ºã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/github/github-code-review` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `GitHub`, `Code-Review`, `Pull-Requests`, `Git`, `Quality` |
| ç›¸å…³ skill | [`github-auth`](/user-guide/skills/bundled/github/github-github-auth), [`github-pr-workflow`](/user-guide/skills/bundled/github/github-github-pr-workflow) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# GitHub Code Review

åœ¨æŽ¨é€å‰å¯¹æœ¬åœ°å˜æ›´æ‰§è¡Œä»£ç å®¡æŸ¥ï¼Œæˆ–å®¡æŸ¥ GitHub ä¸Šçš„å¼€æ”¾ PRã€‚æ­¤ skill å¤§éƒ¨åˆ†åŠŸèƒ½ä½¿ç”¨çº¯ `git` å‘½ä»¤â€”â€”`gh`/`curl` çš„åŒºåˆ«ä»…åœ¨ PR çº§åˆ«çš„äº¤äº’ä¸­æ‰æœ‰æ„ä¹‰ã€‚

## å‰ç½®æ¡ä»¶

- å·²é€šè¿‡ GitHub èº«ä»½éªŒè¯ï¼ˆå‚è§ `github-auth` skillï¼‰
- ä½äºŽ git ä»“åº“å†…éƒ¨

### è®¾ç½®ï¼ˆç”¨äºŽ PR äº¤äº’ï¼‰

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

## 1. å®¡æŸ¥æœ¬åœ°å˜æ›´ï¼ˆæŽ¨é€å‰ï¼‰

æ­¤éƒ¨åˆ†ä¸ºçº¯ `git` æ“ä½œâ€”â€”é€‚ç”¨äºŽæ‰€æœ‰çŽ¯å¢ƒï¼Œæ— éœ€ APIã€‚

### èŽ·å–å·®å¼‚

```bash
# å·²æš‚å­˜çš„å˜æ›´ï¼ˆå³å°†æäº¤çš„å†…å®¹ï¼‰
git diff --staged

# ç›¸å¯¹äºŽ main çš„æ‰€æœ‰å˜æ›´ï¼ˆPR å°†åŒ…å«çš„å†…å®¹ï¼‰
git diff main...HEAD

# ä»…æ˜¾ç¤ºæ–‡ä»¶å
git diff main...HEAD --name-only

# ç»Ÿè®¡æ‘˜è¦ï¼ˆæ¯ä¸ªæ–‡ä»¶çš„æ’å…¥/åˆ é™¤è¡Œæ•°ï¼‰
git diff main...HEAD --stat
```

### å®¡æŸ¥ç­–ç•¥

1. **å…ˆäº†è§£å…¨å±€ï¼š**

```bash
git diff main...HEAD --stat
git log main..HEAD --oneline
```

2. **é€æ–‡ä»¶å®¡æŸ¥**â€”â€”ä½¿ç”¨ `read_file` æŸ¥çœ‹å·²å˜æ›´æ–‡ä»¶çš„å®Œæ•´ä¸Šä¸‹æ–‡ï¼Œå¹¶é€šè¿‡å·®å¼‚äº†è§£å…·ä½“æ”¹åŠ¨ï¼š

```bash
git diff main...HEAD -- src/auth/login.py
```

3. **æ£€æŸ¥å¸¸è§é—®é¢˜ï¼š**

```bash
# é—ç•™çš„è°ƒè¯•è¯­å¥ã€TODOã€console.log ç­‰
git diff main...HEAD | grep -n "print(\|console\.log\|TODO\|FIXME\|HACK\|XXX\|debugger"

# æ„å¤–æš‚å­˜çš„å¤§æ–‡ä»¶
git diff main...HEAD --stat | sort -t'|' -k2 -rn | head -10

# å¯†é’¥æˆ–å‡­æ®æ¨¡å¼
git diff main...HEAD | grep -in "password\|secret\|api_key\|token.*=\|private_key"

# åˆå¹¶å†²çªæ ‡è®°
git diff main...HEAD | grep -n "<<<<<<\|>>>>>>\|======="
```

4. **å‘ç”¨æˆ·å‘ˆçŽ°ç»“æž„åŒ–åé¦ˆã€‚**

### å®¡æŸ¥è¾“å‡ºæ ¼å¼

å®¡æŸ¥æœ¬åœ°å˜æ›´æ—¶ï¼ŒæŒ‰ä»¥ä¸‹ç»“æž„å‘ˆçŽ°ç»“æžœï¼š

```
## Code Review Summary

### Critical
- **src/auth.py:45** â€” SQL injection: user input passed directly to query.
  Suggestion: Use parameterized queries.

### Warnings
- **src/models/user.py:23** â€” Password stored in plaintext. Use bcrypt or argon2.
- **src/api/routes.py:112** â€” No rate limiting on login endpoint.

### Suggestions
- **src/utils/helpers.py:8** â€” Duplicates logic in `src/core/utils.py:34`. Consolidate.
- **tests/test_auth.py** â€” Missing edge case: expired token test.

### Looks Good
- Clean separation of concerns in the middleware layer
- Good test coverage for the happy path
```

---

## 2. å®¡æŸ¥ GitHub ä¸Šçš„ Pull Request

### æŸ¥çœ‹ PR è¯¦æƒ…

**ä½¿ç”¨ ghï¼š**

```bash
gh pr view 123
gh pr diff 123
gh pr diff 123 --name-only
```

**ä½¿ç”¨ git + curlï¼š**

```bash
PR_NUMBER=123

# èŽ·å– PR è¯¦æƒ…
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER \
  | python3 -c "
import sys, json
pr = json.load(sys.stdin)
print(f\"Title: {pr['title']}\")
print(f\"Author: {pr['user']['login']}\")
print(f\"Branch: {pr['head']['ref']} -> {pr['base']['ref']}\")
print(f\"State: {pr['state']}\")
print(f\"Body:\n{pr['body']}\")"

# åˆ—å‡ºå·²å˜æ›´æ–‡ä»¶
curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER/files \
  | python3 -c "
import sys, json
for f in json.load(sys.stdin):
    print(f\"{f['status']:10} +{f['additions']:-4} -{f['deletions']:-4}  {f['filename']}\")"
```

### åœ¨æœ¬åœ°æ£€å‡º PR è¿›è¡Œå®Œæ•´å®¡æŸ¥

æ­¤æ“ä½œä½¿ç”¨çº¯ `git`â€”â€”æ— éœ€ `gh`ï¼š

```bash
# èŽ·å– PR åˆ†æ”¯å¹¶æ£€å‡º
git fetch origin pull/123/head:pr-123
git checkout pr-123

# çŽ°åœ¨å¯ä»¥ä½¿ç”¨ read_fileã€search_filesã€è¿è¡Œæµ‹è¯•ç­‰

# æŸ¥çœ‹ä¸ŽåŸºç¡€åˆ†æ”¯çš„å·®å¼‚
git diff main...pr-123
```

**ä½¿ç”¨ ghï¼ˆå¿«æ·æ–¹å¼ï¼‰ï¼š**

```bash
gh pr checkout 123
```

### åœ¨ PR ä¸Šç•™ä¸‹è¯„è®º

**é€šç”¨ PR è¯„è®ºâ€”â€”ä½¿ç”¨ ghï¼š**

```bash
gh pr comment 123 --body "Overall looks good, a few suggestions below."
```

**é€šç”¨ PR è¯„è®ºâ€”â€”ä½¿ç”¨ curlï¼š**

```bash
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/issues/$PR_NUMBER/comments \
  -d '{"body": "Overall looks good, a few suggestions below."}'
```

### ç•™ä¸‹è¡Œå†…å®¡æŸ¥è¯„è®º

**å•æ¡è¡Œå†…è¯„è®ºâ€”â€”ä½¿ç”¨ ghï¼ˆé€šè¿‡ APIï¼‰ï¼š**

```bash
HEAD_SHA=$(gh pr view 123 --json headRefOid --jq '.headRefOid')

gh api repos/$OWNER/$REPO/pulls/123/comments \
  --method POST \
  -f body="This could be simplified with a list comprehension." \
  -f path="src/auth/login.py" \
  -f commit_id="$HEAD_SHA" \
  -f line=45 \
  -f side="RIGHT"
```

**å•æ¡è¡Œå†…è¯„è®ºâ€”â€”ä½¿ç”¨ curlï¼š**

```bash
# èŽ·å– head commit SHA
HEAD_SHA=$(curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['head']['sha'])")

curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER/comments \
  -d "{
    \"body\": \"This could be simplified with a list comprehension.\",
    \"path\": \"src/auth/login.py\",
    \"commit_id\": \"$HEAD_SHA\",
    \"line\": 45,
    \"side\": \"RIGHT\"
  }"
```

### æäº¤æ­£å¼å®¡æŸ¥ï¼ˆæ‰¹å‡† / è¯·æ±‚å˜æ›´ï¼‰

**ä½¿ç”¨ ghï¼š**

```bash
gh pr review 123 --approve --body "LGTM!"
gh pr review 123 --request-changes --body "See inline comments."
gh pr review 123 --comment --body "Some suggestions, nothing blocking."
```

**ä½¿ç”¨ curlâ€”â€”åŽŸå­æ€§æäº¤åŒ…å«å¤šæ¡è¯„è®ºçš„å®¡æŸ¥ï¼š**

```bash
HEAD_SHA=$(curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['head']['sha'])")

curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER/reviews \
  -d "{
    \"commit_id\": \"$HEAD_SHA\",
    \"event\": \"COMMENT\",
    \"body\": \"Code review from Zed Agent\",
    \"comments\": [
      {\"path\": \"src/auth.py\", \"line\": 45, \"body\": \"Use parameterized queries to prevent SQL injection.\"},
      {\"path\": \"src/models/user.py\", \"line\": 23, \"body\": \"Hash passwords with bcrypt before storing.\"},
      {\"path\": \"tests/test_auth.py\", \"line\": 1, \"body\": \"Add test for expired token edge case.\"}
    ]
  }"
```

äº‹ä»¶å€¼ï¼š`"APPROVE"`ã€`"REQUEST_CHANGES"`ã€`"COMMENT"`

`line` å­—æ®µæŒ‡æ–‡ä»¶*æ–°ç‰ˆæœ¬*ä¸­çš„è¡Œå·ã€‚å¯¹äºŽå·²åˆ é™¤çš„è¡Œï¼Œä½¿ç”¨ `"side": "LEFT"`ã€‚

---

## 3. å®¡æŸ¥æ¸…å•

æ‰§è¡Œä»£ç å®¡æŸ¥ï¼ˆæœ¬åœ°æˆ– PRï¼‰æ—¶ï¼Œç³»ç»Ÿæ€§åœ°æ£€æŸ¥ä»¥ä¸‹å†…å®¹ï¼š

### æ­£ç¡®æ€§
- ä»£ç æ˜¯å¦å®žçŽ°äº†å…¶å£°ç§°çš„åŠŸèƒ½ï¼Ÿ
- è¾¹ç•Œæƒ…å†µæ˜¯å¦å·²å¤„ç†ï¼ˆç©ºè¾“å…¥ã€nullã€å¤§æ•°æ®ã€å¹¶å‘è®¿é—®ï¼‰ï¼Ÿ
- é”™è¯¯è·¯å¾„æ˜¯å¦ä¼˜é›…å¤„ç†ï¼Ÿ

### å®‰å…¨æ€§
- æ— ç¡¬ç¼–ç çš„å¯†é’¥ã€å‡­æ®æˆ– API key
- å¯¹ç”¨æˆ·è¾“å…¥è¿›è¡ŒéªŒè¯
- æ—  SQL æ³¨å…¥ã€XSS æˆ–è·¯å¾„éåŽ†
- åœ¨éœ€è¦çš„åœ°æ–¹è¿›è¡Œèº«ä»½éªŒè¯/æŽˆæƒæ£€æŸ¥

### ä»£ç è´¨é‡
- å‘½åæ¸…æ™°ï¼ˆå˜é‡ã€å‡½æ•°ã€ç±»ï¼‰
- æ— ä¸å¿…è¦çš„å¤æ‚æ€§æˆ–è¿‡æ—©æŠ½è±¡
- DRYâ€”â€”æ— åº”æå–çš„é‡å¤é€»è¾‘
- å‡½æ•°èŒè´£å•ä¸€

### æµ‹è¯•
- æ–°ä»£ç è·¯å¾„æ˜¯å¦å·²æµ‹è¯•ï¼Ÿ
- æ­£å¸¸è·¯å¾„å’Œé”™è¯¯æƒ…å†µæ˜¯å¦å·²è¦†ç›–ï¼Ÿ
- æµ‹è¯•æ˜¯å¦å¯è¯»ä¸”å¯ç»´æŠ¤ï¼Ÿ

### æ€§èƒ½
- æ—  N+1 æŸ¥è¯¢æˆ–ä¸å¿…è¦çš„å¾ªçŽ¯
- åœ¨é€‚å½“ä½ç½®ä½¿ç”¨ç¼“å­˜
- å¼‚æ­¥ä»£ç è·¯å¾„ä¸­æ— é˜»å¡žæ“ä½œ

### æ–‡æ¡£
- å…¬å…± API å·²æ–‡æ¡£åŒ–
- éžæ˜¾è€Œæ˜“è§çš„é€»è¾‘æœ‰æ³¨é‡Šè¯´æ˜Ž"ä¸ºä»€ä¹ˆ"
- è‹¥è¡Œä¸ºå‘ç”Ÿå˜åŒ–ï¼ŒREADME å·²æ›´æ–°

---

## 4. æŽ¨é€å‰å®¡æŸ¥å·¥ä½œæµ

å½“ç”¨æˆ·è¦æ±‚"å®¡æŸ¥ä»£ç "æˆ–"æŽ¨é€å‰æ£€æŸ¥"æ—¶ï¼š

1. `git diff main...HEAD --stat`â€”â€”äº†è§£å˜æ›´èŒƒå›´
2. `git diff main...HEAD`â€”â€”é˜…è¯»å®Œæ•´å·®å¼‚
3. å¯¹æ¯ä¸ªå·²å˜æ›´çš„æ–‡ä»¶ï¼Œå¦‚éœ€æ›´å¤šä¸Šä¸‹æ–‡åˆ™ä½¿ç”¨ `read_file`
4. åº”ç”¨ä¸Šè¿°å®¡æŸ¥æ¸…å•
5. æŒ‰ç»“æž„åŒ–æ ¼å¼å‘ˆçŽ°ç»“æžœï¼ˆCritical / Warnings / Suggestions / Looks Goodï¼‰
6. è‹¥å‘çŽ°ä¸¥é‡é—®é¢˜ï¼Œåœ¨ç”¨æˆ·æŽ¨é€å‰ä¸»åŠ¨æå‡ºä¿®å¤

---

## 5. PR å®¡æŸ¥å·¥ä½œæµï¼ˆç«¯åˆ°ç«¯ï¼‰

å½“ç”¨æˆ·è¦æ±‚"å®¡æŸ¥ PR #N"ã€"æŸ¥çœ‹è¿™ä¸ª PR"ï¼Œæˆ–æä¾› PR URL æ—¶ï¼ŒæŒ‰ä»¥ä¸‹æ­¥éª¤æ‰§è¡Œï¼š

### ç¬¬ä¸€æ­¥ï¼šè®¾ç½®çŽ¯å¢ƒ

```bash
source "${ZED_HOME:-$HOME/.zed}/skills/github/github-auth/scripts/gh-env.sh"
# æˆ–è¿è¡Œæœ¬ skill é¡¶éƒ¨çš„å†…è”è®¾ç½®ä»£ç å—
```

### ç¬¬äºŒæ­¥ï¼šæ”¶é›† PR ä¸Šä¸‹æ–‡

èŽ·å– PR å…ƒæ•°æ®ã€æè¿°å’Œå·²å˜æ›´æ–‡ä»¶åˆ—è¡¨ï¼Œåœ¨æ·±å…¥ä»£ç ä¹‹å‰äº†è§£å˜æ›´èŒƒå›´ã€‚

**ä½¿ç”¨ ghï¼š**
```bash
gh pr view 123
gh pr diff 123 --name-only
gh pr checks 123
```

**ä½¿ç”¨ curlï¼š**
```bash
PR_NUMBER=123

# PR è¯¦æƒ…ï¼ˆæ ‡é¢˜ã€ä½œè€…ã€æè¿°ã€åˆ†æ”¯ï¼‰
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$GH_OWNER/$GH_REPO/pulls/$PR_NUMBER

# å¸¦è¡Œæ•°ç»Ÿè®¡çš„å·²å˜æ›´æ–‡ä»¶
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$GH_OWNER/$GH_REPO/pulls/$PR_NUMBER/files
```

### ç¬¬ä¸‰æ­¥ï¼šåœ¨æœ¬åœ°æ£€å‡º PR

è¿™æ ·å¯ä»¥å®Œæ•´ä½¿ç”¨ `read_file`ã€`search_files`ï¼Œä»¥åŠè¿è¡Œæµ‹è¯•çš„èƒ½åŠ›ã€‚

```bash
git fetch origin pull/$PR_NUMBER/head:pr-$PR_NUMBER
git checkout pr-$PR_NUMBER
```

### ç¬¬å››æ­¥ï¼šé˜…è¯»å·®å¼‚å¹¶ç†è§£å˜æ›´

```bash
# ä¸ŽåŸºç¡€åˆ†æ”¯çš„å®Œæ•´å·®å¼‚
git diff main...HEAD

# å¯¹äºŽå¤§åž‹ PRï¼Œé€æ–‡ä»¶æŸ¥çœ‹
git diff main...HEAD --name-only
# ç„¶åŽå¯¹æ¯ä¸ªæ–‡ä»¶ï¼š
git diff main...HEAD -- path/to/file.py
```

å¯¹æ¯ä¸ªå·²å˜æ›´çš„æ–‡ä»¶ï¼Œä½¿ç”¨ `read_file` æŸ¥çœ‹å˜æ›´å‘¨å›´çš„å®Œæ•´ä¸Šä¸‹æ–‡â€”â€”ä»…å‡­å·®å¼‚å¯èƒ½é—æ¼åªæœ‰åœ¨å‘¨å›´ä»£ç ä¸­æ‰èƒ½å‘çŽ°çš„é—®é¢˜ã€‚

### ç¬¬äº”æ­¥ï¼šåœ¨æœ¬åœ°è¿è¡Œè‡ªåŠ¨åŒ–æ£€æŸ¥ï¼ˆå¦‚é€‚ç”¨ï¼‰

```bash
# è‹¥æœ‰æµ‹è¯•å¥—ä»¶ï¼Œè¿è¡Œæµ‹è¯•
python -m pytest 2>&1 | tail -20
# æˆ–ï¼šnpm test, cargo test, go test ./..., ç­‰

# è‹¥å·²é…ç½®ï¼Œè¿è¡Œ linter
ruff check . 2>&1 | head -30
# æˆ–ï¼šeslint, clippy, ç­‰
```

### ç¬¬å…­æ­¥ï¼šåº”ç”¨å®¡æŸ¥æ¸…å•ï¼ˆç¬¬ 3 èŠ‚ï¼‰

é€ä¸€æ£€æŸ¥æ¯ä¸ªç±»åˆ«ï¼šæ­£ç¡®æ€§ã€å®‰å…¨æ€§ã€ä»£ç è´¨é‡ã€æµ‹è¯•ã€æ€§èƒ½ã€æ–‡æ¡£ã€‚

### ç¬¬ä¸ƒæ­¥ï¼šå°†å®¡æŸ¥ç»“æžœå‘å¸ƒåˆ° GitHub

æ±‡æ€»ç»“æžœå¹¶ä»¥æ­£å¼å®¡æŸ¥å½¢å¼æäº¤ï¼Œé™„å¸¦è¡Œå†…è¯„è®ºã€‚

**ä½¿ç”¨ ghï¼š**
```bash
# è‹¥æ— é—®é¢˜â€”â€”æ‰¹å‡†
gh pr review $PR_NUMBER --approve --body "Reviewed by Zed Agent. Code looks clean â€” good test coverage, no security concerns."

# è‹¥å‘çŽ°é—®é¢˜â€”â€”è¯·æ±‚å˜æ›´å¹¶é™„è¡Œå†…è¯„è®º
gh pr review $PR_NUMBER --request-changes --body "Found a few issues â€” see inline comments."
```

**ä½¿ç”¨ curlâ€”â€”åŽŸå­æ€§æäº¤åŒ…å«å¤šæ¡è¡Œå†…è¯„è®ºçš„å®¡æŸ¥ï¼š**
```bash
HEAD_SHA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$GH_OWNER/$GH_REPO/pulls/$PR_NUMBER \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['head']['sha'])")

# æž„å»ºå®¡æŸ¥ JSONâ€”â€”event ä¸º APPROVEã€REQUEST_CHANGES æˆ– COMMENT
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$GH_OWNER/$GH_REPO/pulls/$PR_NUMBER/reviews \
  -d "{
    \"commit_id\": \"$HEAD_SHA\",
    \"event\": \"REQUEST_CHANGES\",
    \"body\": \"## Zed Agent Review\n\nFound 2 issues, 1 suggestion. See inline comments.\",
    \"comments\": [
      {\"path\": \"src/auth.py\", \"line\": 45, \"body\": \"ðŸ”´ **Critical:** User input passed directly to SQL query â€” use parameterized queries.\"},
      {\"path\": \"src/models.py\", \"line\": 23, \"body\": \"âš ï¸ **Warning:** Password stored without hashing.\"},
      {\"path\": \"src/utils.py\", \"line\": 8, \"body\": \"ðŸ’¡ **Suggestion:** This duplicates logic in core/utils.py:34.\"}
    ]
  }"
```

### ç¬¬å…«æ­¥ï¼šåŒæ—¶å‘å¸ƒæ‘˜è¦è¯„è®º

é™¤è¡Œå†…è¯„è®ºå¤–ï¼Œè¿˜éœ€ç•™ä¸‹é¡¶å±‚æ‘˜è¦ï¼Œè®© PR ä½œè€…ä¸€ç›®äº†ç„¶åœ°äº†è§£å…¨è²Œã€‚ä½¿ç”¨ `references/review-output-template.md` ä¸­çš„å®¡æŸ¥è¾“å‡ºæ ¼å¼ã€‚

**ä½¿ç”¨ ghï¼š**
```bash
gh pr comment $PR_NUMBER --body "$(cat <<'EOF'
## Code Review Summary

**Verdict: Changes Requested** (2 issues, 1 suggestion)

### ðŸ”´ Critical
- **src/auth.py:45** â€” SQL injection vulnerability

### âš ï¸ Warnings
- **src/models.py:23** â€” Plaintext password storage

### ðŸ’¡ Suggestions
- **src/utils.py:8** â€” Duplicated logic, consider consolidating

### âœ… Looks Good
- Clean API design
- Good error handling in the middleware layer

---
*Reviewed by Zed Agent*
EOF
)"
```

### ç¬¬ä¹æ­¥ï¼šæ¸…ç†

```bash
git checkout main
git branch -D pr-$PR_NUMBER
```

### å†³ç­–ï¼šæ‰¹å‡† vs è¯·æ±‚å˜æ›´ vs è¯„è®º

- **æ‰¹å‡†ï¼ˆApproveï¼‰**â€”â€”æ— ä¸¥é‡æˆ–è­¦å‘Šçº§åˆ«çš„é—®é¢˜ï¼Œä»…æœ‰æ¬¡è¦å»ºè®®æˆ–å®Œå…¨é€šè¿‡
- **è¯·æ±‚å˜æ›´ï¼ˆRequest Changesï¼‰**â€”â€”å­˜åœ¨ä»»ä½•åœ¨åˆå¹¶å‰åº”ä¿®å¤çš„ä¸¥é‡æˆ–è­¦å‘Šçº§åˆ«é—®é¢˜
- **è¯„è®ºï¼ˆCommentï¼‰**â€”â€”æœ‰è§‚å¯Ÿå’Œå»ºè®®ï¼Œä½†æ— é˜»å¡žæ€§é—®é¢˜ï¼ˆåœ¨ä¸ç¡®å®šæˆ– PR ä¸ºè‰ç¨¿æ—¶ä½¿ç”¨ï¼‰