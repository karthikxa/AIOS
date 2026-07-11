---
title: "Oss Forensics â€” GitHub ä»“åº“çš„ä¾›åº”é“¾è°ƒæŸ¥ã€è¯æ®æ¢å¤ä¸Žå–è¯åˆ†æž"
sidebar_label: "Oss Forensics"
description: "GitHub ä»“åº“çš„ä¾›åº”é“¾è°ƒæŸ¥ã€è¯æ®æ¢å¤ä¸Žå–è¯åˆ†æž"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Oss Forensics

GitHub ä»“åº“çš„ä¾›åº”é“¾è°ƒæŸ¥ã€è¯æ®æ¢å¤ä¸Žå–è¯åˆ†æžã€‚
æ¶µç›–å·²åˆ é™¤æäº¤çš„æ¢å¤ã€å¼ºåˆ¶æŽ¨é€æ£€æµ‹ã€IOC æå–ã€å¤šæºè¯æ®æ”¶é›†ã€
å‡è®¾å½¢æˆä¸ŽéªŒè¯ï¼Œä»¥åŠç»“æž„åŒ–å–è¯æŠ¥å‘Šç”Ÿæˆã€‚
çµæ„Ÿæ¥æºäºŽ RAPTOR çš„ 1800+ è¡Œ OSS Forensics ç³»ç»Ÿã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/security/oss-forensics` å®‰è£… |
| è·¯å¾„ | `optional-skills/security/oss-forensics` |
| å¹³å° | linux, macos, windows |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# OSS å®‰å…¨å–è¯ Skill

ä¸€ä¸ªç”¨äºŽç ”ç©¶å¼€æºä¾›åº”é“¾æ”»å‡»çš„ 7 é˜¶æ®µå¤š agent è°ƒæŸ¥æ¡†æž¶ã€‚
æ”¹ç¼–è‡ª RAPTOR çš„å–è¯ç³»ç»Ÿã€‚æ¶µç›– GitHub Archiveã€Wayback Machineã€GitHub APIã€
æœ¬åœ° git åˆ†æžã€IOC æå–ã€åŸºäºŽè¯æ®çš„å‡è®¾å½¢æˆä¸ŽéªŒè¯ï¼Œä»¥åŠæœ€ç»ˆå–è¯æŠ¥å‘Šç”Ÿæˆã€‚

---

## âš ï¸ åå¹»è§‰ï¼ˆAnti-Hallucinationï¼‰é˜²æŠ¤è§„åˆ™

åœ¨æ¯ä¸ªè°ƒæŸ¥æ­¥éª¤å‰å¿…é¡»é˜…è¯»è¿™äº›è§„åˆ™ã€‚è¿åè¿™äº›è§„åˆ™å°†ä½¿æŠ¥å‘Šå¤±æ•ˆã€‚

1. **è¯æ®ä¼˜å…ˆåŽŸåˆ™**ï¼šä»»ä½•æŠ¥å‘Šã€å‡è®¾æˆ–æ‘˜è¦ä¸­çš„æ¯ä¸€é¡¹å£°æ˜Žéƒ½å¿…é¡»å¼•ç”¨è‡³å°‘ä¸€ä¸ªè¯æ® IDï¼ˆ`EV-XXXX`ï¼‰ã€‚ç¦æ­¢æ— å¼•ç”¨çš„æ–­è¨€ã€‚
2. **èŒè´£è¾¹ç•Œ**ï¼šæ¯ä¸ªå­ agentï¼ˆè°ƒæŸ¥å‘˜ï¼‰åªæœ‰ä¸€ä¸ªæ•°æ®æºï¼Œä¸å¾—æ··ç”¨ã€‚GH Archive è°ƒæŸ¥å‘˜ä¸æŸ¥è¯¢ GitHub APIï¼Œåä¹‹äº¦ç„¶ã€‚èŒè´£è¾¹ç•Œæ˜¯ç¡¬æ€§è§„å®šã€‚
3. **äº‹å®žä¸Žå‡è®¾åˆ†ç¦»**ï¼šæ‰€æœ‰æœªç»éªŒè¯çš„æŽ¨æ–­å¿…é¡»æ ‡æ³¨ `[HYPOTHESIS]`ã€‚åªæœ‰ç»åŽŸå§‹æ¥æºéªŒè¯çš„é™ˆè¿°æ‰å¯ä½œä¸ºäº‹å®žè¡¨è¿°ã€‚
4. **ç¦æ­¢æé€ è¯æ®**ï¼šå‡è®¾éªŒè¯å™¨å¿…é¡»æœºæ¢°åœ°æ£€æŸ¥æ¯ä¸ªè¢«å¼•ç”¨çš„è¯æ® ID åœ¨è¯æ®åº“ä¸­ç¡®å®žå­˜åœ¨ï¼Œç„¶åŽæ‰èƒ½æŽ¥å—å‡è®¾ã€‚
5. **åé©³éœ€æœ‰è¯æ®**ï¼šé©³æ–¥ä¸€ä¸ªå‡è®¾å¿…é¡»æä¾›å…·ä½“çš„ã€æœ‰è¯æ®æ”¯æ’‘çš„åé©³è®ºç‚¹ã€‚"æœªæ‰¾åˆ°è¯æ®"ä¸è¶³ä»¥æŽ¨ç¿»å‡è®¾â€”â€”è¿™åªèƒ½ä½¿å‡è®¾å˜ä¸ºä¸ç¡®å®šçŠ¶æ€ã€‚
6. **SHA/URL åŒé‡éªŒè¯**ï¼šä»»ä½•ä½œä¸ºè¯æ®å¼•ç”¨çš„æäº¤ SHAã€URL æˆ–å¤–éƒ¨æ ‡è¯†ç¬¦ï¼Œå¿…é¡»åœ¨è¢«æ ‡è®°ä¸ºå·²éªŒè¯ä¹‹å‰ä»Žè‡³å°‘ä¸¤ä¸ªæ¥æºç‹¬ç«‹ç¡®è®¤ã€‚
7. **å¯ç–‘ä»£ç è§„åˆ™**ï¼šç»ä¸åœ¨æœ¬åœ°è¿è¡Œè¢«è°ƒæŸ¥ä»“åº“ä¸­å‘çŽ°çš„ä»£ç ã€‚ä»…è¿›è¡Œé™æ€åˆ†æžï¼Œæˆ–åœ¨æ²™ç®±çŽ¯å¢ƒä¸­ä½¿ç”¨ `execute_code`ã€‚
8. **å¯†é’¥è„±æ•**ï¼šè°ƒæŸ¥è¿‡ç¨‹ä¸­å‘çŽ°çš„ä»»ä½• API å¯†é’¥ã€token æˆ–å‡­æ®å¿…é¡»åœ¨æœ€ç»ˆæŠ¥å‘Šä¸­è„±æ•å¤„ç†ï¼Œä»…åœ¨å†…éƒ¨æ—¥å¿—ä¸­è®°å½•ã€‚

---

## ç¤ºä¾‹åœºæ™¯

- **åœºæ™¯ Aï¼šä¾èµ–æ··æ·†**ï¼šæ¶æ„åŒ… `internal-lib-v2` ä»¥æ›´é«˜ç‰ˆæœ¬å·ä¸Šä¼ è‡³ NPMï¼Œé«˜äºŽå†…éƒ¨ç‰ˆæœ¬ã€‚è°ƒæŸ¥å‘˜éœ€è¿½è¸ªè¯¥åŒ…é¦–æ¬¡å‡ºçŽ°çš„æ—¶é—´ï¼Œä»¥åŠç›®æ ‡ä»“åº“ä¸­æ˜¯å¦æœ‰ PushEvent å°† `package.json` æ›´æ–°ä¸ºè¯¥ç‰ˆæœ¬ã€‚
- **åœºæ™¯ Bï¼šç»´æŠ¤è€…è´¦æˆ·æŽ¥ç®¡**ï¼šä¸€åé•¿æœŸè´¡çŒ®è€…çš„è´¦æˆ·è¢«ç”¨äºŽæŽ¨é€å¸¦æœ‰åŽé—¨çš„ `.github/workflows/build.yml`ã€‚è°ƒæŸ¥å‘˜åœ¨è¯¥ç”¨æˆ·é•¿æœŸä¸æ´»è·ƒæˆ–æ¥è‡ªæ–° IP/ä½ç½®ï¼ˆå¦‚å¯é€šè¿‡ BigQuery æ£€æµ‹ï¼‰ä¹‹åŽï¼ŒæŸ¥æ‰¾å…¶ PushEventã€‚
- **åœºæ™¯ Cï¼šå¼ºåˆ¶æŽ¨é€éšè—**ï¼šå¼€å‘è€…æ„å¤–æäº¤äº†ç”Ÿäº§çŽ¯å¢ƒå¯†é’¥ï¼ŒéšåŽå¼ºåˆ¶æŽ¨é€ä»¥"ä¿®å¤"ã€‚è°ƒæŸ¥å‘˜ä½¿ç”¨ `git fsck` å’Œ GH Archive æ¢å¤åŽŸå§‹æäº¤ SHAï¼Œå¹¶éªŒè¯æ³„éœ²å†…å®¹ã€‚

---

> **è·¯å¾„çº¦å®š**ï¼šåœ¨æœ¬ skill ä¸­ï¼Œ`SKILL_DIR` æŒ‡æœ¬ skill å®‰è£…ç›®å½•çš„æ ¹ç›®å½•ï¼ˆåŒ…å«æ­¤ `SKILL.md` çš„æ–‡ä»¶å¤¹ï¼‰ã€‚åŠ è½½ skill æ—¶ï¼Œè¯·å°† `SKILL_DIR` è§£æžä¸ºå®žé™…è·¯å¾„â€”â€”ä¾‹å¦‚ `~/.zed/skills/security/oss-forensics/` æˆ–å¯¹åº”çš„ `optional-skills/` è·¯å¾„ã€‚æ‰€æœ‰è„šæœ¬å’Œæ¨¡æ¿å¼•ç”¨å‡ç›¸å¯¹äºŽè¯¥ç›®å½•ã€‚

## é˜¶æ®µ 0ï¼šåˆå§‹åŒ–

1. åˆ›å»ºè°ƒæŸ¥å·¥ä½œç›®å½•ï¼š
   ```bash
   mkdir investigation_$(echo "REPO_NAME" | tr '/' '_')
   cd investigation_$(echo "REPO_NAME" | tr '/' '_')
   ```
2. åˆå§‹åŒ–è¯æ®åº“ï¼š
   ```bash
   python3 SKILL_DIR/scripts/evidence-store.py --store evidence.json list
   ```
3. å¤åˆ¶å–è¯æŠ¥å‘Šæ¨¡æ¿ï¼š
   ```bash
   cp SKILL_DIR/templates/forensic-report.md ./investigation-report.md
   ```
4. åˆ›å»º `iocs.md` æ–‡ä»¶ï¼Œç”¨äºŽè¿½è¸ªå‘çŽ°çš„å…¥ä¾µæŒ‡æ ‡ï¼ˆIndicators of Compromiseï¼ŒIOCï¼‰ã€‚
5. è®°å½•è°ƒæŸ¥å¼€å§‹æ—¶é—´ã€ç›®æ ‡ä»“åº“åŠè°ƒæŸ¥ç›®æ ‡è¯´æ˜Žã€‚

---

## é˜¶æ®µ 1ï¼šPrompt è§£æžä¸Ž IOC æå–

**ç›®æ ‡**ï¼šä»Žç”¨æˆ·è¯·æ±‚ä¸­æå–æ‰€æœ‰ç»“æž„åŒ–è°ƒæŸ¥ç›®æ ‡ã€‚

**æ“ä½œ**ï¼š
- è§£æžç”¨æˆ· promptï¼ˆæç¤ºè¯ï¼‰ï¼Œæå–ï¼š
  - ç›®æ ‡ä»“åº“ï¼ˆ`owner/repo`ï¼‰
  - ç›®æ ‡å‚ä¸Žè€…ï¼ˆGitHub ç”¨æˆ·åã€ç”µå­é‚®ä»¶åœ°å€ï¼‰
  - å…³æ³¨çš„æ—¶é—´çª—å£ï¼ˆæäº¤æ—¥æœŸèŒƒå›´ã€PR æ—¶é—´æˆ³ï¼‰
  - æä¾›çš„å…¥ä¾µæŒ‡æ ‡ï¼šæäº¤ SHAã€æ–‡ä»¶è·¯å¾„ã€åŒ…åã€IP åœ°å€ã€åŸŸåã€API å¯†é’¥/tokenã€æ¶æ„ URL
  - ä»»ä½•å…³è”çš„ä¾›åº”å•†å®‰å…¨æŠ¥å‘Šæˆ–åšå®¢æ–‡ç« 

**å·¥å…·**ï¼šä»…æŽ¨ç†ï¼Œæˆ–å¯¹å¤§æ®µæ–‡æœ¬ä½¿ç”¨ `execute_code` è¿›è¡Œæ­£åˆ™æå–ã€‚

**è¾“å‡º**ï¼šå°†æå–çš„ IOC å¡«å…¥ `iocs.md`ã€‚æ¯ä¸ª IOC å¿…é¡»åŒ…å«ï¼š
- ç±»åž‹ï¼ˆä»Žä»¥ä¸‹é€‰æ‹©ï¼šCOMMIT_SHAã€FILE_PATHã€API_KEYã€SECRETã€IP_ADDRESSã€DOMAINã€PACKAGE_NAMEã€ACTOR_USERNAMEã€MALICIOUS_URLã€OTHERï¼‰
- å€¼
- æ¥æºï¼ˆç”¨æˆ·æä¾›ã€æŽ¨æ–­å¾—å‡ºï¼‰

**å‚è€ƒ**ï¼šIOC åˆ†ç±»æ³•è§ [evidence-types.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/evidence-types.md)ã€‚

---

## é˜¶æ®µ 2ï¼šå¹¶è¡Œè¯æ®æ”¶é›†

ä½¿ç”¨ `delegate_task`ï¼ˆæ‰¹é‡æ¨¡å¼ï¼Œæœ€å¤š 3 ä¸ªå¹¶å‘ï¼‰æ´¾ç”Ÿæœ€å¤š 5 ä¸ªä¸“ä¸šè°ƒæŸ¥å‘˜å­ agentã€‚æ¯ä¸ªè°ƒæŸ¥å‘˜åªæœ‰**ä¸€ä¸ªæ•°æ®æº**ï¼Œä¸å¾—æ··ç”¨ã€‚

> **ç¼–æŽ’å™¨æ³¨æ„**ï¼šåœ¨æ¯ä¸ªå§”æ‰˜ä»»åŠ¡çš„ `context` å­—æ®µä¸­ä¼ å…¥é˜¶æ®µ 1 çš„ IOC åˆ—è¡¨å’Œè°ƒæŸ¥æ—¶é—´çª—å£ã€‚

---

### è°ƒæŸ¥å‘˜ 1ï¼šæœ¬åœ° Git è°ƒæŸ¥å‘˜

**èŒè´£è¾¹ç•Œ**ï¼šä»…æŸ¥è¯¢**æœ¬åœ° Git ä»“åº“**ï¼Œä¸è°ƒç”¨ä»»ä½•å¤–éƒ¨ APIã€‚

**æ“ä½œ**ï¼š
```bash
# å…‹éš†ä»“åº“
git clone https://github.com/OWNER/REPO.git target_repo && cd target_repo

# å®Œæ•´æäº¤æ—¥å¿—ï¼ˆå«ç»Ÿè®¡ä¿¡æ¯ï¼‰
git log --all --full-history --stat --format="%H|%ae|%an|%ai|%s" > ../git_log.txt

# æ£€æµ‹å¼ºåˆ¶æŽ¨é€è¯æ®ï¼ˆå­¤ç«‹/æ‚¬ç©ºæäº¤ï¼‰
git fsck --lost-found --unreachable 2>&1 | grep commit > ../dangling_commits.txt

# æ£€æŸ¥ reflog ä¸­çš„åŽ†å²é‡å†™
git reflog --all > ../reflog.txt

# åˆ—å‡ºæ‰€æœ‰åˆ†æ”¯ï¼ŒåŒ…æ‹¬å·²åˆ é™¤çš„è¿œç¨‹å¼•ç”¨
git branch -a -v > ../branches.txt

# æŸ¥æ‰¾å¯ç–‘çš„å¤§åž‹äºŒè¿›åˆ¶æ–‡ä»¶æ·»åŠ 
git log --all --diff-filter=A --name-only --format="%H %ai" -- "*.so" "*.dll" "*.exe" "*.bin" > ../binary_additions.txt

# æ£€æŸ¥ GPG ç­¾åå¼‚å¸¸
git log --show-signature --format="%H %ai %aN" > ../signature_check.txt 2>&1
```

**éœ€æ”¶é›†çš„è¯æ®**ï¼ˆé€šè¿‡ `python3 SKILL_DIR/scripts/evidence-store.py add` æ·»åŠ ï¼‰ï¼š
- æ¯ä¸ªæ‚¬ç©ºæäº¤ SHA â†’ ç±»åž‹ï¼š`git`
- å¼ºåˆ¶æŽ¨é€è¯æ®ï¼ˆreflog æ˜¾ç¤ºåŽ†å²é‡å†™ï¼‰â†’ ç±»åž‹ï¼š`git`
- å·²éªŒè¯è´¡çŒ®è€…çš„æœªç­¾åæäº¤ â†’ ç±»åž‹ï¼š`git`
- å¯ç–‘äºŒè¿›åˆ¶æ–‡ä»¶æ·»åŠ  â†’ ç±»åž‹ï¼š`git`

**å‚è€ƒ**ï¼šè®¿é—®å¼ºåˆ¶æŽ¨é€æäº¤çš„æ–¹æ³•è§ [recovery-techniques.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/recovery-techniques.md)ã€‚

---

### è°ƒæŸ¥å‘˜ 2ï¼šGitHub API è°ƒæŸ¥å‘˜

**èŒè´£è¾¹ç•Œ**ï¼šä»…æŸ¥è¯¢ **GitHub REST API**ï¼Œä¸åœ¨æœ¬åœ°è¿è¡Œ git å‘½ä»¤ã€‚

**æ“ä½œ**ï¼š
```bash
# æäº¤ï¼ˆåˆ†é¡µï¼‰
curl -s "https://api.github.com/repos/OWNER/REPO/commits?per_page=100" > api_commits.json

# Pull Requestï¼ˆå«å·²å…³é—­/å·²åˆ é™¤ï¼‰
curl -s "https://api.github.com/repos/OWNER/REPO/pulls?state=all&per_page=100" > api_prs.json

# Issues
curl -s "https://api.github.com/repos/OWNER/REPO/issues?state=all&per_page=100" > api_issues.json

# è´¡çŒ®è€…åŠåä½œè€…å˜æ›´
curl -s "https://api.github.com/repos/OWNER/REPO/contributors" > api_contributors.json

# ä»“åº“äº‹ä»¶ï¼ˆæœ€è¿‘ 300 æ¡ï¼‰
curl -s "https://api.github.com/repos/OWNER/REPO/events?per_page=100" > api_events.json

# æŸ¥çœ‹ç‰¹å®šå¯ç–‘æäº¤ SHA çš„è¯¦æƒ…
curl -s "https://api.github.com/repos/OWNER/REPO/git/commits/SHA" > commit_detail.json

# Releases
curl -s "https://api.github.com/repos/OWNER/REPO/releases?per_page=100" > api_releases.json

# æ£€æŸ¥ç‰¹å®šæäº¤æ˜¯å¦å­˜åœ¨ï¼ˆå¼ºåˆ¶æŽ¨é€çš„æäº¤åœ¨ commits/ å¯èƒ½è¿”å›ž 404ï¼Œä½†åœ¨ git/commits/ å¯èƒ½æˆåŠŸï¼‰
curl -s "https://api.github.com/repos/OWNER/REPO/commits/SHA" | jq .sha
```

**äº¤å‰æ¯”å¯¹ç›®æ ‡**ï¼ˆå°†å·®å¼‚æ ‡è®°ä¸ºè¯æ®ï¼‰ï¼š
- PR å­˜åœ¨äºŽå½’æ¡£ä¸­ä½† API ä¸­ç¼ºå¤± â†’ åˆ é™¤è¯æ®
- è´¡çŒ®è€…å‡ºçŽ°åœ¨å½’æ¡£äº‹ä»¶ä¸­ä½†ä¸åœ¨è´¡çŒ®è€…åˆ—è¡¨ä¸­ â†’ æƒé™æ’¤é”€è¯æ®
- æäº¤å‡ºçŽ°åœ¨å½’æ¡£ PushEvent ä¸­ä½†ä¸åœ¨ API æäº¤åˆ—è¡¨ä¸­ â†’ å¼ºåˆ¶æŽ¨é€/åˆ é™¤è¯æ®

**å‚è€ƒ**ï¼šGH äº‹ä»¶ç±»åž‹è§ [evidence-types.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/evidence-types.md)ã€‚

---

### è°ƒæŸ¥å‘˜ 3ï¼šWayback Machine è°ƒæŸ¥å‘˜

**èŒè´£è¾¹ç•Œ**ï¼šä»…æŸ¥è¯¢ **Wayback Machine CDX API**ï¼Œä¸ä½¿ç”¨ GitHub APIã€‚

**ç›®æ ‡**ï¼šæ¢å¤å·²åˆ é™¤çš„ GitHub é¡µé¢ï¼ˆREADMEã€issuesã€PRã€releasesã€wiki é¡µé¢ï¼‰ã€‚

**æ“ä½œ**ï¼š
```bash
# æœç´¢ä»“åº“ä¸»é¡µçš„å½’æ¡£å¿«ç…§
curl -s "https://web.archive.org/cdx/search/cdx?url=github.com/OWNER/REPO&output=json&limit=100&from=YYYYMMDD&to=YYYYMMDD" > wayback_main.json

# æœç´¢ç‰¹å®šå·²åˆ é™¤ issue
curl -s "https://web.archive.org/cdx/search/cdx?url=github.com/OWNER/REPO/issues/NUM&output=json&limit=50" > wayback_issue_NUM.json

# æœç´¢ç‰¹å®šå·²åˆ é™¤ PR
curl -s "https://web.archive.org/cdx/search/cdx?url=github.com/OWNER/REPO/pull/NUM&output=json&limit=50" > wayback_pr_NUM.json

# èŽ·å–é¡µé¢çš„æœ€ä½³å¿«ç…§
# ä½¿ç”¨ Wayback Machine URLï¼šhttps://web.archive.org/web/TIMESTAMP/ORIGINAL_URL
# ç¤ºä¾‹ï¼šhttps://web.archive.org/web/20240101000000*/github.com/OWNER/REPO

# é«˜çº§ï¼šæœç´¢å·²åˆ é™¤çš„ releases/tags
curl -s "https://web.archive.org/cdx/search/cdx?url=github.com/OWNER/REPO/releases/tag/*&output=json" > wayback_tags.json

# é«˜çº§ï¼šæœç´¢åŽ†å² wiki å˜æ›´
curl -s "https://web.archive.org/cdx/search/cdx?url=github.com/OWNER/REPO/wiki/*&output=json" > wayback_wiki.json
```

**éœ€æ”¶é›†çš„è¯æ®**ï¼š
- å·²åˆ é™¤ issue/PR çš„å½’æ¡£å¿«ç…§åŠå…¶å†…å®¹
- æ˜¾ç¤ºå˜æ›´çš„åŽ†å² README ç‰ˆæœ¬
- å­˜åœ¨äºŽå½’æ¡£ä¸­ä½†åœ¨å½“å‰ GitHub çŠ¶æ€ä¸­ç¼ºå¤±çš„å†…å®¹è¯æ®

**å‚è€ƒ**ï¼šCDX API å‚æ•°è§ [github-archive-guide.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/github-archive-guide.md)ã€‚

---

### è°ƒæŸ¥å‘˜ 4ï¼šGH Archive / BigQuery è°ƒæŸ¥å‘˜

**èŒè´£è¾¹ç•Œ**ï¼šä»…é€šè¿‡ **BigQuery** æŸ¥è¯¢ **GitHub Archive**ã€‚è¿™æ˜¯æ‰€æœ‰å…¬å¼€ GitHub äº‹ä»¶çš„é˜²ç¯¡æ”¹è®°å½•ã€‚

> **å‰ææ¡ä»¶**ï¼šéœ€è¦å…·æœ‰ BigQuery è®¿é—®æƒé™çš„ Google Cloud å‡­æ®ï¼ˆ`gcloud auth application-default login`ï¼‰ã€‚å¦‚ä¸å¯ç”¨ï¼Œè·³è¿‡æ­¤è°ƒæŸ¥å‘˜å¹¶åœ¨æŠ¥å‘Šä¸­æ³¨æ˜Žã€‚

**æˆæœ¬ä¼˜åŒ–è§„åˆ™**ï¼ˆå¼ºåˆ¶æ‰§è¡Œï¼‰ï¼š
1. æ¯æ¬¡æŸ¥è¯¢å‰å¿…é¡»å…ˆè¿è¡Œ `--dry_run` ä»¥ä¼°ç®—æˆæœ¬ã€‚
2. ä½¿ç”¨ `_TABLE_SUFFIX` æŒ‰æ—¥æœŸèŒƒå›´è¿‡æ»¤ï¼Œæœ€å°åŒ–æ‰«ææ•°æ®é‡ã€‚
3. åª SELECT æ‰€éœ€åˆ—ã€‚
4. é™¤éžè¿›è¡Œèšåˆï¼Œå¦åˆ™æ·»åŠ  LIMITã€‚

```bash
# æ¨¡æ¿ï¼šå®‰å…¨çš„ BigQuery æŸ¥è¯¢ï¼Œç”¨äºŽæŸ¥è¯¢ OWNER/REPO çš„ PushEvent
bq query --use_legacy_sql=false --dry_run "
SELECT created_at, actor.login, payload.commits, payload.before, payload.head,
       payload.size, payload.distinct_size
FROM \`githubarchive.month.*\`
WHERE _TABLE_SUFFIX BETWEEN 'YYYYMM' AND 'YYYYMM'
  AND type = 'PushEvent'
  AND repo.name = 'OWNER/REPO'
LIMIT 1000
"
# å¦‚æžœæˆæœ¬å¯æŽ¥å—ï¼ŒåŽ»æŽ‰ --dry_run é‡æ–°è¿è¡Œ

# æ£€æµ‹å¼ºåˆ¶æŽ¨é€ï¼šdistinct_size ä¸ºé›¶çš„ PushEvent è¡¨ç¤ºæäº¤è¢«å¼ºåˆ¶æ“¦é™¤
# payload.distinct_size = 0 AND payload.size > 0 â†’ å¼ºåˆ¶æŽ¨é€æŒ‡æ ‡

# æ£€æŸ¥å·²åˆ é™¤åˆ†æ”¯äº‹ä»¶
bq query --use_legacy_sql=false "
SELECT created_at, actor.login, payload.ref, payload.ref_type
FROM \`githubarchive.month.*\`
WHERE _TABLE_SUFFIX BETWEEN 'YYYYMM' AND 'YYYYMM'
  AND type = 'DeleteEvent'
  AND repo.name = 'OWNER/REPO'
LIMIT 200
"
```

**éœ€æ”¶é›†çš„è¯æ®**ï¼š
- å¼ºåˆ¶æŽ¨é€äº‹ä»¶ï¼ˆpayload.size > 0ï¼Œpayload.distinct_size = 0ï¼‰
- åˆ†æ”¯/æ ‡ç­¾çš„ DeleteEvent
- å¯ç–‘ CI/CD è‡ªåŠ¨åŒ–çš„ WorkflowRunEvent
- åœ¨ git æ—¥å¿—å‡ºçŽ°"ç©ºç™½"ä¹‹å‰çš„ PushEventï¼ˆåŽ†å²é‡å†™è¯æ®ï¼‰

**å‚è€ƒ**ï¼šæ‰€æœ‰ 12 ç§äº‹ä»¶ç±»åž‹åŠæŸ¥è¯¢æ¨¡å¼è§ [github-archive-guide.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/github-archive-guide.md)ã€‚

---

### è°ƒæŸ¥å‘˜ 5ï¼šIOC å¯ŒåŒ–è°ƒæŸ¥å‘˜

**èŒè´£è¾¹ç•Œ**ï¼šä»…ä½¿ç”¨**è¢«åŠ¨å…¬å¼€æ¥æº**å¯¹é˜¶æ®µ 1 ä¸­çš„**çŽ°æœ‰ IOC** è¿›è¡Œå¯ŒåŒ–ã€‚ä¸æ‰§è¡Œç›®æ ‡ä»“åº“ä¸­çš„ä»»ä½•ä»£ç ã€‚

**æ“ä½œ**ï¼š
- å¯¹æ¯ä¸ªæäº¤ SHAï¼šå°è¯•é€šè¿‡ç›´æŽ¥ GitHub URLï¼ˆ`github.com/OWNER/REPO/commit/SHA.patch`ï¼‰æ¢å¤
- å¯¹æ¯ä¸ªåŸŸå/IPï¼šæ£€æŸ¥è¢«åŠ¨ DNSã€WHOIS è®°å½•ï¼ˆé€šè¿‡ `web_extract` è®¿é—®å…¬å¼€ WHOIS æœåŠ¡ï¼‰
- å¯¹æ¯ä¸ªåŒ…åï¼šæ£€æŸ¥ npm/PyPI ä¸­æ˜¯å¦æœ‰åŒ¹é…çš„æ¶æ„åŒ…æŠ¥å‘Š
- å¯¹æ¯ä¸ª actor ç”¨æˆ·åï¼šæ£€æŸ¥ GitHub ä¸ªäººèµ„æ–™ã€è´¡çŒ®åŽ†å²ã€è´¦æˆ·æ³¨å†Œæ—¶é—´
- ä½¿ç”¨ 3 ç§æ–¹æ³•æ¢å¤å¼ºåˆ¶æŽ¨é€çš„æäº¤ï¼ˆè§ [recovery-techniques.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/recovery-techniques.md)ï¼‰

---

## é˜¶æ®µ 3ï¼šè¯æ®æ•´åˆ

æ‰€æœ‰è°ƒæŸ¥å‘˜å®ŒæˆåŽï¼š

1. è¿è¡Œ `python3 SKILL_DIR/scripts/evidence-store.py --store evidence.json list` æŸ¥çœ‹æ‰€æœ‰å·²æ”¶é›†è¯æ®ã€‚
2. å¯¹æ¯æ¡è¯æ®ï¼ŒéªŒè¯ `content_sha256` å“ˆå¸Œå€¼ä¸ŽåŽŸå§‹æ¥æºä¸€è‡´ã€‚
3. æŒ‰ä»¥ä¸‹ç»´åº¦å¯¹è¯æ®åˆ†ç»„ï¼š
   - **æ—¶é—´çº¿**ï¼šå°†æ‰€æœ‰å¸¦æ—¶é—´æˆ³çš„è¯æ®æŒ‰æ—¶é—´é¡ºåºæŽ’åˆ—
   - **å‚ä¸Žè€…**ï¼šæŒ‰ GitHub ç”¨æˆ·åæˆ–ç”µå­é‚®ä»¶åˆ†ç»„
   - **IOC**ï¼šå°†è¯æ®ä¸Žå…¶å…³è”çš„ IOC é“¾æŽ¥
4. è¯†åˆ«**å·®å¼‚**ï¼šå­˜åœ¨äºŽä¸€ä¸ªæ¥æºä½†åœ¨å¦ä¸€ä¸ªæ¥æºä¸­ç¼ºå¤±çš„æ¡ç›®ï¼ˆå…³é”®åˆ é™¤æŒ‡æ ‡ï¼‰ã€‚
5. å°†è¯æ®æ ‡è®°ä¸º `[VERIFIED]`ï¼ˆå·²ä»Ž 2 ä¸ªä»¥ä¸Šç‹¬ç«‹æ¥æºç¡®è®¤ï¼‰æˆ– `[UNVERIFIED]`ï¼ˆä»…å•ä¸€æ¥æºï¼‰ã€‚

---

## é˜¶æ®µ 4ï¼šå‡è®¾å½¢æˆ

ä¸€ä¸ªå‡è®¾å¿…é¡»ï¼š
- é™ˆè¿°å…·ä½“å£°æ˜Žï¼ˆä¾‹å¦‚ï¼š"å‚ä¸Žè€… X äºŽæŸæ—¥æœŸå¯¹ BRANCH è¿›è¡Œå¼ºåˆ¶æŽ¨é€ä»¥æ“¦é™¤æäº¤ SHA"ï¼‰
- å¼•ç”¨è‡³å°‘ 2 ä¸ªæ”¯æŒå®ƒçš„è¯æ® IDï¼ˆ`EV-XXXX`ã€`EV-YYYY`ï¼‰
- æŒ‡æ˜Žå“ªäº›è¯æ®å¯ä»¥æŽ¨ç¿»å®ƒ
- åœ¨éªŒè¯ä¹‹å‰æ ‡æ³¨ `[HYPOTHESIS]`

**å¸¸è§å‡è®¾æ¨¡æ¿**ï¼ˆè§ [investigation-templates.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/investigation-templates.md)ï¼‰ï¼š
- ç»´æŠ¤è€…è´¦æˆ·è¢«æ”»é™·ï¼šåˆæ³•è´¦æˆ·åœ¨è¢«æŽ¥ç®¡åŽç”¨äºŽæ³¨å…¥æ¶æ„ä»£ç 
- ä¾èµ–æ··æ·†ï¼šåŒ…åæŠ¢æ³¨ä»¥æ‹¦æˆªå®‰è£…
- CI/CD æ³¨å…¥ï¼šæ¶æ„ workflow å˜æ›´ä»¥åœ¨æž„å»ºæœŸé—´è¿è¡Œä»£ç 
- ä»¿å†’å‘½åï¼ˆTyposquattingï¼‰ï¼šé’ˆå¯¹æ‹¼å†™é”™è¯¯è€…çš„é«˜åº¦ç›¸ä¼¼åŒ…å
- å‡­æ®æ³„éœ²ï¼štoken/å¯†é’¥æ„å¤–æäº¤åŽå¼ºåˆ¶æŽ¨é€ä»¥æ“¦é™¤

å¯¹æ¯ä¸ªå‡è®¾ï¼Œæ´¾ç”Ÿä¸€ä¸ª `delegate_task` å­ agentï¼Œåœ¨ç¡®è®¤ä¹‹å‰å°è¯•å¯»æ‰¾åé©³è¯æ®ã€‚

---

## é˜¶æ®µ 5ï¼šå‡è®¾éªŒè¯

éªŒè¯å™¨å­ agent å¿…é¡»æœºæ¢°åœ°æ£€æŸ¥ï¼š

1. å¯¹æ¯ä¸ªå‡è®¾ï¼Œæå–æ‰€æœ‰è¢«å¼•ç”¨çš„è¯æ® IDã€‚
2. éªŒè¯æ¯ä¸ª ID åœ¨ `evidence.json` ä¸­å­˜åœ¨ï¼ˆå¦‚æœ‰ä»»ä½• ID ç¼ºå¤±åˆ™ç¡¬æ€§å¤±è´¥ â†’ å‡è®¾å› å¯èƒ½æé€ è€Œè¢«æ‹’ç»ï¼‰ã€‚
3. éªŒè¯æ¯æ¡ `[VERIFIED]` è¯æ®å·²ä»Ž 2 ä¸ªä»¥ä¸Šæ¥æºç¡®è®¤ã€‚
4. æ£€æŸ¥é€»è¾‘ä¸€è‡´æ€§ï¼šè¯æ®æ‰€æç»˜çš„æ—¶é—´çº¿æ˜¯å¦æ”¯æŒè¯¥å‡è®¾ï¼Ÿ
5. æ£€æŸ¥æ›¿ä»£è§£é‡Šï¼šç›¸åŒçš„è¯æ®æ¨¡å¼æ˜¯å¦å¯èƒ½æºäºŽè‰¯æ€§åŽŸå› ï¼Ÿ

**è¾“å‡º**ï¼š
- `VALIDATED`ï¼šæ‰€æœ‰è¯æ®å·²å¼•ç”¨ã€å·²éªŒè¯ã€é€»è¾‘ä¸€è‡´ï¼Œä¸”ä¸å­˜åœ¨åˆç†çš„æ›¿ä»£è§£é‡Šã€‚
- `INCONCLUSIVE`ï¼šè¯æ®æ”¯æŒå‡è®¾ï¼Œä½†å­˜åœ¨æ›¿ä»£è§£é‡Šæˆ–è¯æ®ä¸è¶³ã€‚
- `REJECTED`ï¼šè¯æ® ID ç¼ºå¤±ã€å°†æœªéªŒè¯è¯æ®ä½œä¸ºäº‹å®žå¼•ç”¨ã€æ£€æµ‹åˆ°é€»è¾‘ä¸ä¸€è‡´ã€‚

è¢«æ‹’ç»çš„å‡è®¾åé¦ˆè‡³é˜¶æ®µ 4 è¿›è¡Œä¿®æ­£ï¼ˆæœ€å¤š 3 æ¬¡è¿­ä»£ï¼‰ã€‚

---

## é˜¶æ®µ 6ï¼šæœ€ç»ˆæŠ¥å‘Šç”Ÿæˆ

ä½¿ç”¨ [forensic-report.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/templates/forensic-report.md) ä¸­çš„æ¨¡æ¿å¡«å†™ `investigation-report.md`ã€‚

**å¿…å¡«ç« èŠ‚**ï¼š
- æ‰§è¡Œæ‘˜è¦ï¼šä¸€æ®µå¼ç»“è®ºï¼ˆå·²è¢«æ”»é™· / å¹²å‡€ / ä¸ç¡®å®šï¼‰ï¼Œå«ç½®ä¿¡åº¦ç­‰çº§
- æ—¶é—´çº¿ï¼šæ‰€æœ‰é‡è¦äº‹ä»¶çš„æ—¶é—´é¡ºåºé‡å»ºï¼Œå«è¯æ®å¼•ç”¨
- å·²éªŒè¯å‡è®¾ï¼šæ¯æ¡å‡è®¾å«çŠ¶æ€åŠæ”¯æŒè¯æ® ID
- è¯æ®æ³¨å†Œè¡¨ï¼šæ‰€æœ‰ `EV-XXXX` æ¡ç›®çš„è¡¨æ ¼ï¼Œå«æ¥æºã€ç±»åž‹å’ŒéªŒè¯çŠ¶æ€
- IOC åˆ—è¡¨ï¼šæ‰€æœ‰æå–å’Œå¯ŒåŒ–çš„å…¥ä¾µæŒ‡æ ‡
- è¯æ®ä¿ç®¡é“¾ï¼šè¯æ®çš„æ”¶é›†æ–¹å¼ã€æ¥æºåŠæ”¶é›†æ—¶é—´æˆ³
- å»ºè®®ï¼šå¦‚æ£€æµ‹åˆ°æ”»é™·ï¼Œæä¾›å³æ—¶ç¼“è§£æŽªæ–½ï¼›ä»¥åŠç›‘æŽ§å»ºè®®

**æŠ¥å‘Šè§„åˆ™**ï¼š
- æ¯é¡¹äº‹å®žå£°æ˜Žå¿…é¡»è‡³å°‘æœ‰ä¸€ä¸ª `[EV-XXXX]` å¼•ç”¨
- æ‰§è¡Œæ‘˜è¦å¿…é¡»è¯´æ˜Žç½®ä¿¡åº¦ç­‰çº§ï¼ˆé«˜ / ä¸­ / ä½Žï¼‰
- æ‰€æœ‰å¯†é’¥/å‡­æ®å¿…é¡»è„±æ•ä¸º `[REDACTED]`

---

## é˜¶æ®µ 7ï¼šå®Œæˆ

1. è¿è¡Œæœ€ç»ˆè¯æ®ç»Ÿè®¡ï¼š`python3 SKILL_DIR/scripts/evidence-store.py --store evidence.json list`
2. å½’æ¡£å®Œæ•´è°ƒæŸ¥ç›®å½•ã€‚
3. å¦‚ç¡®è®¤å­˜åœ¨æ”»é™·ï¼š
   - åˆ—å‡ºå³æ—¶ç¼“è§£æŽªæ–½ï¼ˆè½®æ¢å‡­æ®ã€å›ºå®šä¾èµ–å“ˆå¸Œã€é€šçŸ¥å—å½±å“ç”¨æˆ·ï¼‰
   - è¯†åˆ«å—å½±å“çš„ç‰ˆæœ¬/åŒ…
   - æ³¨æ˜ŽæŠ«éœ²ä¹‰åŠ¡ï¼ˆå¦‚ä¸ºå…¬å¼€åŒ…ï¼šä¸ŽåŒ…æ³¨å†Œè¡¨åè°ƒï¼‰
4. å‘ç”¨æˆ·å‘ˆçŽ°æœ€ç»ˆ `investigation-report.md`ã€‚

---

## é“å¾·ä½¿ç”¨å‡†åˆ™

æœ¬ skill ä¸“ä¸º**é˜²å¾¡æ€§å®‰å…¨è°ƒæŸ¥**è€Œè®¾è®¡â€”â€”ä¿æŠ¤å¼€æºè½¯ä»¶å…å—ä¾›åº”é“¾æ”»å‡»ã€‚ä¸å¾—ç”¨äºŽï¼š

- **éªšæ‰°æˆ–è·Ÿè¸ª**è´¡çŒ®è€…æˆ–ç»´æŠ¤è€…
- **äººè‚‰æœç´¢ï¼ˆDoxingï¼‰**â€”â€”å°† GitHub æ´»åŠ¨ä¸ŽçœŸå®žèº«ä»½å…³è”ç”¨äºŽæ¶æ„ç›®çš„
- **ç«žäº‰æƒ…æŠ¥**â€”â€”æœªç»æŽˆæƒè°ƒæŸ¥ä¸“æœ‰æˆ–å†…éƒ¨ä»“åº“
- **è™šå‡æŒ‡æŽ§**â€”â€”åœ¨æ²¡æœ‰ç»è¿‡éªŒè¯çš„è¯æ®çš„æƒ…å†µä¸‹å‘å¸ƒè°ƒæŸ¥ç»“æžœï¼ˆå‚è§åå¹»è§‰é˜²æŠ¤è§„åˆ™ï¼‰

è°ƒæŸ¥åº”éµå¾ª**æœ€å°ä¾µå…¥åŽŸåˆ™**ï¼šä»…æ”¶é›†éªŒè¯æˆ–åé©³å‡è®¾æ‰€å¿…éœ€çš„è¯æ®ã€‚å‘å¸ƒç»“æžœæ—¶ï¼Œéµå¾ªè´Ÿè´£ä»»æŠ«éœ²å®žè·µï¼Œåœ¨å…¬å¼€æŠ«éœ²å‰ä¸Žå—å½±å“çš„ç»´æŠ¤è€…åè°ƒã€‚

å¦‚æžœè°ƒæŸ¥æ­ç¤ºäº†çœŸå®žçš„æ”»é™·ï¼Œè¯·éµå¾ªåè°ƒæ¼æ´žæŠ«éœ²æµç¨‹ï¼š
1. é¦–å…ˆç§ä¸‹é€šçŸ¥ä»“åº“ç»´æŠ¤è€…
2. ç»™äºˆåˆç†çš„ä¿®å¤æ—¶é—´ï¼ˆé€šå¸¸ä¸º 90 å¤©ï¼‰
3. å¦‚æ¶‰åŠå·²å‘å¸ƒåŒ…ï¼Œä¸ŽåŒ…æ³¨å†Œè¡¨ï¼ˆnpmã€PyPI ç­‰ï¼‰åè°ƒ
4. å¦‚é€‚ç”¨ï¼Œæäº¤ CVE

---

## API é€ŸçŽ‡é™åˆ¶

GitHub REST API å¼ºåˆ¶æ‰§è¡Œé€ŸçŽ‡é™åˆ¶ï¼Œå¦‚ä¸åŠ ä»¥ç®¡ç†ï¼Œå°†ä¸­æ–­å¤§åž‹è°ƒæŸ¥ã€‚

**å·²è®¤è¯è¯·æ±‚**ï¼š5,000 æ¬¡/å°æ—¶ï¼ˆéœ€è¦ `GITHUB_TOKEN` çŽ¯å¢ƒå˜é‡æˆ– `gh` CLI è®¤è¯ï¼‰
**æœªè®¤è¯è¯·æ±‚**ï¼š60 æ¬¡/å°æ—¶ï¼ˆä¸é€‚ç”¨äºŽè°ƒæŸ¥ï¼‰

**æœ€ä½³å®žè·µ**ï¼š
- å§‹ç»ˆè¿›è¡Œè®¤è¯ï¼š`export GITHUB_TOKEN=ghp_...` æˆ–ä½¿ç”¨ `gh` CLIï¼ˆè‡ªåŠ¨è®¤è¯ï¼‰
- ä½¿ç”¨æ¡ä»¶è¯·æ±‚ï¼ˆ`If-None-Match` / `If-Modified-Since` è¯·æ±‚å¤´ï¼‰ï¼Œé¿å…å¯¹æœªå˜æ›´æ•°æ®æ¶ˆè€—é…é¢
- å¯¹åˆ†é¡µç«¯ç‚¹ï¼ŒæŒ‰é¡ºåºèŽ·å–æ‰€æœ‰é¡µé¢â€”â€”ä¸è¦å¯¹åŒä¸€ç«¯ç‚¹å¹¶è¡Œè¯·æ±‚
- æ£€æŸ¥ `X-RateLimit-Remaining` å“åº”å¤´ï¼›å¦‚ä½ŽäºŽ 100ï¼Œæš‚åœè‡³ `X-RateLimit-Reset` æ—¶é—´æˆ³
- BigQuery æœ‰å…¶è‡ªèº«é…é¢ï¼ˆå…è´¹å±‚æ¯æ—¥ 10 TiBï¼‰â€”â€”å§‹ç»ˆå…ˆè¿›è¡Œ dry-run
- Wayback Machine CDX APIï¼šæ— æ­£å¼é€ŸçŽ‡é™åˆ¶ï¼Œä½†è¯·ä¿æŒç¤¼è²Œï¼ˆæœ€å¤š 1-2 æ¬¡è¯·æ±‚/ç§’ï¼‰

å¦‚åœ¨è°ƒæŸ¥ä¸­é€”é­é‡é€ŸçŽ‡é™åˆ¶ï¼Œå°†éƒ¨åˆ†ç»“æžœè®°å½•åˆ°è¯æ®åº“ä¸­ï¼Œå¹¶åœ¨æŠ¥å‘Šä¸­æ³¨æ˜Žè¯¥é™åˆ¶ã€‚

---

## å‚è€ƒèµ„æ–™

- [github-archive-guide.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/github-archive-guide.md) â€” BigQuery æŸ¥è¯¢ã€CDX APIã€12 ç§äº‹ä»¶ç±»åž‹
- [evidence-types.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/evidence-types.md) â€” IOC åˆ†ç±»æ³•ã€è¯æ®æ¥æºç±»åž‹ã€è§‚å¯Ÿç±»åž‹
- [recovery-techniques.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/recovery-techniques.md) â€” æ¢å¤å·²åˆ é™¤çš„æäº¤ã€PRã€issues
- [investigation-templates.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/references/investigation-templates.md) â€” æŒ‰æ”»å‡»ç±»åž‹é¢„ç½®çš„å‡è®¾æ¨¡æ¿
- [evidence-store.py](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/scripts/evidence-store.py) â€” ç”¨äºŽç®¡ç†è¯æ® JSON åº“çš„ CLI å·¥å…·
- [forensic-report.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/security/oss-forensics/templates/forensic-report.md) â€” ç»“æž„åŒ–æŠ¥å‘Šæ¨¡æ¿
