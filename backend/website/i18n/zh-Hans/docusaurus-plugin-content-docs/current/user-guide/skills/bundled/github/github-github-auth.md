---
title: "Github Auth â€” GitHub auth setup: HTTPS tokens, SSH keys, gh CLI login"
sidebar_label: "Github Auth"
description: "GitHub auth è®¾ç½®ï¼šHTTPS ä»¤ç‰Œã€SSH å¯†é’¥ã€gh CLI ç™»å½•"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Github Auth

GitHub auth è®¾ç½®ï¼šHTTPS ä»¤ç‰Œã€SSH å¯†é’¥ã€gh CLI ç™»å½•ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/github/github-auth` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `GitHub`, `Authentication`, `Git`, `gh-cli`, `SSH`, `Setup` |
| ç›¸å…³ skill | [`github-pr-workflow`](/user-guide/skills/bundled/github/github-github-pr-workflow), [`github-code-review`](/user-guide/skills/bundled/github/github-github-code-review), [`github-issues`](/user-guide/skills/bundled/github/github-github-issues), [`github-repo-management`](/user-guide/skills/bundled/github/github-github-repo-management) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# GitHub è®¤è¯è®¾ç½®

æ­¤ skill ç”¨äºŽé…ç½®è®¤è¯ï¼Œä½¿ agent èƒ½å¤Ÿæ“ä½œ GitHub ä»“åº“ã€PRã€issue å’Œ CIã€‚æ¶µç›–ä¸¤æ¡è·¯å¾„ï¼š

- **`git`ï¼ˆå§‹ç»ˆå¯ç”¨ï¼‰** â€” ä½¿ç”¨ HTTPS ä¸ªäººè®¿é—®ä»¤ç‰Œï¼ˆpersonal access tokenï¼‰æˆ– SSH å¯†é’¥
- **`gh` CLIï¼ˆå¦‚å·²å®‰è£…ï¼‰** â€” æ›´ä¸°å¯Œçš„ GitHub API è®¿é—®ï¼Œè®¤è¯æµç¨‹æ›´ç®€å•

## æ£€æµ‹æµç¨‹

å½“ç”¨æˆ·è¦æ±‚ä½ æ“ä½œ GitHub æ—¶ï¼Œé¦–å…ˆæ‰§è¡Œä»¥ä¸‹æ£€æŸ¥ï¼š

```bash
# Check what's available
git --version
gh --version 2>/dev/null || echo "gh not installed"

# Check if already authenticated
gh auth status 2>/dev/null || echo "gh not authenticated"
git config --global credential.helper 2>/dev/null || echo "no git credential helper"
```

**å†³ç­–æ ‘ï¼š**
1. è‹¥ `gh auth status` æ˜¾ç¤ºå·²è®¤è¯ â†’ ç›´æŽ¥ä½¿ç”¨ `gh` å¤„ç†æ‰€æœ‰æ“ä½œ
2. è‹¥ `gh` å·²å®‰è£…ä½†æœªè®¤è¯ â†’ ä½¿ç”¨ä¸‹æ–¹"gh auth"æ–¹æ³•
3. è‹¥ `gh` æœªå®‰è£… â†’ ä½¿ç”¨ä¸‹æ–¹"ä»… git"æ–¹æ³•ï¼ˆæ— éœ€ sudoï¼‰

---

## æ–¹æ³•ä¸€ï¼šä»… Git è®¤è¯ï¼ˆæ—  ghï¼Œæ—  sudoï¼‰

é€‚ç”¨äºŽä»»ä½•å·²å®‰è£… `git` çš„æœºå™¨ï¼Œæ— éœ€ root æƒé™ã€‚

### é€‰é¡¹ Aï¼šHTTPS é…åˆä¸ªäººè®¿é—®ä»¤ç‰Œï¼ˆæŽ¨èï¼‰

æœ€é€šç”¨çš„æ–¹æ³•â€”â€”é€‚ç”¨äºŽæ‰€æœ‰çŽ¯å¢ƒï¼Œæ— éœ€ SSH é…ç½®ã€‚

**ç¬¬ä¸€æ­¥ï¼šåˆ›å»ºä¸ªäººè®¿é—®ä»¤ç‰Œ**

å‘ŠçŸ¥ç”¨æˆ·è®¿é—®ï¼š**https://github.com/settings/tokens**

- ç‚¹å‡»"Generate new token (classic)"
- å¡«å†™åç§°ï¼Œå¦‚"zed-agent"
- é€‰æ‹©æƒé™èŒƒå›´ï¼ˆscopeï¼‰ï¼š
  - `repo`ï¼ˆå®Œæ•´ä»“åº“è®¿é—®â€”â€”è¯»ã€å†™ã€æŽ¨é€ã€PRï¼‰
  - `workflow`ï¼ˆè§¦å‘å’Œç®¡ç† GitHub Actionsï¼‰
  - `read:org`ï¼ˆå¦‚éœ€æ“ä½œç»„ç»‡ä»“åº“ï¼‰
- è®¾ç½®æœ‰æ•ˆæœŸï¼ˆ90 å¤©æ˜¯åˆç†çš„é»˜è®¤å€¼ï¼‰
- å¤åˆ¶ä»¤ç‰Œâ€”â€”æ­¤åŽä¸ä¼šå†æ¬¡æ˜¾ç¤º

**ç¬¬äºŒæ­¥ï¼šé…ç½® git å­˜å‚¨ä»¤ç‰Œ**

```bash
# Set up the credential helper to cache credentials
# "store" saves to ~/.git-credentials in plaintext (simple, persistent)
git config --global credential.helper store

# Now do a test operation that triggers auth â€” git will prompt for credentials
# Username: <their-github-username>
# Password: <paste the personal access token, NOT their GitHub password>
git ls-remote https://github.com/<their-username>/<any-repo>.git
```

é¦–æ¬¡è¾“å…¥å‡­æ®åŽï¼Œå°†è¢«ä¿å­˜å¹¶åœ¨åŽç»­æ‰€æœ‰æ“ä½œä¸­å¤ç”¨ã€‚

**æ›¿ä»£æ–¹æ¡ˆï¼šcache helperï¼ˆå‡­æ®åœ¨å†…å­˜ä¸­è¿‡æœŸï¼‰**

```bash
# Cache in memory for 8 hours (28800 seconds) instead of saving to disk
git config --global credential.helper 'cache --timeout=28800'
```

**æ›¿ä»£æ–¹æ¡ˆï¼šç›´æŽ¥å°†ä»¤ç‰Œå†™å…¥è¿œç¨‹ URLï¼ˆæŒ‰ä»“åº“è®¾ç½®ï¼‰**

```bash
# Embed token in the remote URL (avoids credential prompts entirely)
git remote set-url origin https://<username>:<token>@github.com/<owner>/<repo>.git
```

**ç¬¬ä¸‰æ­¥ï¼šé…ç½® git èº«ä»½ä¿¡æ¯**

```bash
# Required for commits â€” set name and email
git config --global user.name "Their Name"
git config --global user.email "their-email@example.com"
```

**ç¬¬å››æ­¥ï¼šéªŒè¯**

```bash
# Test push access (this should work without any prompts now)
git ls-remote https://github.com/<their-username>/<any-repo>.git

# Verify identity
git config --global user.name
git config --global user.email
```

### é€‰é¡¹ Bï¼šSSH å¯†é’¥è®¤è¯

é€‚åˆåå¥½ SSH æˆ–å·²æœ‰å¯†é’¥çš„ç”¨æˆ·ã€‚

**ç¬¬ä¸€æ­¥ï¼šæ£€æŸ¥çŽ°æœ‰ SSH å¯†é’¥**

```bash
ls -la ~/.ssh/id_*.pub 2>/dev/null || echo "No SSH keys found"
```

**ç¬¬äºŒæ­¥ï¼šå¦‚éœ€åˆ™ç”Ÿæˆå¯†é’¥**

```bash
# Generate an ed25519 key (modern, secure, fast)
ssh-keygen -t ed25519 -C "their-email@example.com" -f ~/.ssh/id_ed25519 -N ""

# Display the public key for them to add to GitHub
cat ~/.ssh/id_ed25519.pub
```

å‘ŠçŸ¥ç”¨æˆ·åœ¨ä»¥ä¸‹åœ°å€æ·»åŠ å…¬é’¥ï¼š**https://github.com/settings/keys**
- ç‚¹å‡»"New SSH key"
- ç²˜è´´å…¬é’¥å†…å®¹
- å¡«å†™æ ‡é¢˜ï¼Œå¦‚"zed-agent-&lt;machine-name>"

**ç¬¬ä¸‰æ­¥ï¼šæµ‹è¯•è¿žæŽ¥**

```bash
ssh -T git@github.com
# Expected: "Hi <username>! You've successfully authenticated..."
```

**ç¬¬å››æ­¥ï¼šé…ç½® git ä½¿ç”¨ SSH è®¿é—® GitHub**

```bash
# Rewrite HTTPS GitHub URLs to SSH automatically
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

**ç¬¬äº”æ­¥ï¼šé…ç½® git èº«ä»½ä¿¡æ¯**

```bash
git config --global user.name "Their Name"
git config --global user.email "their-email@example.com"
```

---

## æ–¹æ³•äºŒï¼šgh CLI è®¤è¯

è‹¥å·²å®‰è£… `gh`ï¼Œä¸€æ­¥å³å¯å®Œæˆ API è®¿é—®å’Œ git å‡­æ®é…ç½®ã€‚

### æµè§ˆå™¨äº¤äº’ç™»å½•ï¼ˆæ¡Œé¢çŽ¯å¢ƒï¼‰

```bash
gh auth login
# Select: GitHub.com
# Select: HTTPS
# Authenticate via browser
```

### åŸºäºŽä»¤ç‰Œç™»å½•ï¼ˆæ— å¤´çŽ¯å¢ƒ / SSH æœåŠ¡å™¨ï¼‰

```bash
echo "<THEIR_TOKEN>" | gh auth login --with-token

# Set up git credentials through gh
gh auth setup-git
```

### éªŒè¯

```bash
gh auth status
```

---

## ä¸ä½¿ç”¨ gh è°ƒç”¨ GitHub API

å½“ `gh` ä¸å¯ç”¨æ—¶ï¼Œä»å¯ä½¿ç”¨ `curl` é…åˆä¸ªäººè®¿é—®ä»¤ç‰Œè®¿é—®å®Œæ•´çš„ GitHub APIã€‚å…¶ä»– GitHub skill çš„é™çº§æ–¹æ¡ˆå‡é‡‡ç”¨æ­¤æ–¹å¼ã€‚

### ä¸º API è°ƒç”¨è®¾ç½®ä»¤ç‰Œ

```bash
# Option 1: Export as env var (preferred â€” keeps it out of commands)
export GITHUB_TOKEN="<token>"

# Then use in curl calls:
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user
```

### ä»Ž Git å‡­æ®ä¸­æå–ä»¤ç‰Œ

è‹¥å·²é€šè¿‡ `credential.helper store` é…ç½® git å‡­æ®ï¼Œå¯æå–ä»¤ç‰Œï¼š

```bash
# Read from git credential store
grep "github.com" ~/.git-credentials 2>/dev/null | head -1 | sed 's|https://[^:]*:\([^@]*\)@.*|\1|'
```

### è¾…åŠ©å‡½æ•°ï¼šæ£€æµ‹è®¤è¯æ–¹å¼

åœ¨ä»»ä½• GitHub å·¥ä½œæµå¼€å§‹æ—¶ä½¿ç”¨æ­¤æ¨¡å¼ï¼š

```bash
# Try gh first, fall back to git + curl
if command -v gh &>/dev/null && gh auth status &>/dev/null; then
  echo "AUTH_METHOD=gh"
elif [ -n "$GITHUB_TOKEN" ]; then
  echo "AUTH_METHOD=curl"
elif [ -f ~/.zed/.env ] && grep -q "^GITHUB_TOKEN=" ~/.zed/.env; then
  export GITHUB_TOKEN=$(grep "^GITHUB_TOKEN=" ~/.zed/.env | head -1 | cut -d= -f2 | tr -d '\n\r')
  echo "AUTH_METHOD=curl"
elif grep -q "github.com" ~/.git-credentials 2>/dev/null; then
  export GITHUB_TOKEN=$(grep "github.com" ~/.git-credentials | head -1 | sed 's|https://[^:]*:\([^@]*\)@.*|\1|')
  echo "AUTH_METHOD=curl"
else
  echo "AUTH_METHOD=none"
  echo "Need to set up authentication first"
fi
```

---

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | è§£å†³æ–¹æ¡ˆ |
|---------|----------|
| `git push` è¦æ±‚è¾“å…¥å¯†ç  | GitHub å·²ç¦ç”¨å¯†ç è®¤è¯ã€‚è¯·ä½¿ç”¨ä¸ªäººè®¿é—®ä»¤ç‰Œä½œä¸ºå¯†ç ï¼Œæˆ–åˆ‡æ¢è‡³ SSH |
| `remote: Permission to X denied` | ä»¤ç‰Œå¯èƒ½ç¼ºå°‘ `repo` scopeâ€”â€”è¯·é‡æ–°ç”Ÿæˆå¹¶é€‰æ‹©æ­£ç¡®çš„ scope |
| `fatal: Authentication failed` | ç¼“å­˜çš„å‡­æ®å¯èƒ½å·²è¿‡æœŸâ€”â€”è¿è¡Œ `git credential reject` åŽé‡æ–°è®¤è¯ |
| `ssh: connect to host github.com port 22: Connection refused` | å°è¯•é€šè¿‡ HTTPS ç«¯å£ä½¿ç”¨ SSHï¼šåœ¨ `~/.ssh/config` ä¸­ä¸º `Host github.com` æ·»åŠ  `Port 443` å’Œ `Hostname ssh.github.com` |
| å‡­æ®ä¸æŒä¹… | æ£€æŸ¥ `git config --global credential.helper`â€”â€”å¿…é¡»ä¸º `store` æˆ– `cache` |
| å¤šä¸ª GitHub è´¦å· | åœ¨ `~/.ssh/config` ä¸­ä¸ºä¸åŒä¸»æœºåˆ«åé…ç½®ä¸åŒ SSH å¯†é’¥ï¼Œæˆ–ä½¿ç”¨æŒ‰ä»“åº“è®¾ç½®çš„å‡­æ® URL |
| `gh: command not found` ä¸”æ—  sudo | ä½¿ç”¨ä¸Šæ–¹æ–¹æ³•ä¸€ï¼ˆä»… gitï¼‰â€”â€”æ— éœ€å®‰è£…ä»»ä½•è½¯ä»¶ |