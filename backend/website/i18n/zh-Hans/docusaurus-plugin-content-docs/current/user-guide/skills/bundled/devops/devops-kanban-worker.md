---
title: "Kanban Worker â€” Zed Kanban worker çš„é™·é˜±ã€ç¤ºä¾‹ä¸Žè¾¹ç•Œæƒ…å†µ"
sidebar_label: "Kanban Worker"
description: "Zed Kanban worker çš„é™·é˜±ã€ç¤ºä¾‹ä¸Žè¾¹ç•Œæƒ…å†µ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Kanban Worker

Zed Kanban worker çš„é™·é˜±ã€ç¤ºä¾‹ä¸Žè¾¹ç•Œæƒ…å†µã€‚ç”Ÿå‘½å‘¨æœŸæœ¬èº«ä¼šè‡ªåŠ¨æ³¨å…¥åˆ°æ¯ä¸ª worker çš„ç³»ç»Ÿ promptï¼ˆæç¤ºè¯ï¼‰ä¸­ï¼Œä½œä¸º `KANBAN_GUIDANCE`ï¼ˆæ¥è‡ª `agent/prompt_builder.py`ï¼‰ï¼›å½“ä½ éœ€è¦æ·±å…¥äº†è§£ç‰¹å®šåœºæ™¯æ—¶ï¼ŒåŠ è½½æ­¤ skill å³å¯ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/devops/kanban-worker` |
| ç‰ˆæœ¬ | `2.0.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `kanban`, `multi-agent`, `collaboration`, `workflow`, `pitfalls` |
| ç›¸å…³ skill | [`kanban-orchestrator`](/user-guide/skills/bundled/devops/devops-kanban-orchestrator) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Kanban Worker â€” é™·é˜±ä¸Žç¤ºä¾‹

> ä½ çœ‹åˆ°æ­¤ skillï¼Œæ˜¯å› ä¸º Zed Kanban è°ƒåº¦å™¨ä»¥ `--skills kanban-worker` å‚æ•°å°†ä½ ä½œä¸º worker æ´¾ç”Ÿâ€”â€”å®ƒä¼šä¸ºæ¯ä¸ªè¢«æ´¾å‘çš„ worker è‡ªåŠ¨åŠ è½½ã€‚**ç”Ÿå‘½å‘¨æœŸ**ï¼ˆ6 ä¸ªæ­¥éª¤ï¼šorient â†’ work â†’ heartbeat â†’ block/completeï¼‰ä¹Ÿå­˜åœ¨äºŽè‡ªåŠ¨æ³¨å…¥åˆ°ä½ ç³»ç»Ÿ prompt ä¸­çš„ `KANBAN_GUIDANCE` å—é‡Œã€‚æ­¤ skill æ˜¯æ›´æ·±å±‚çš„ç»†èŠ‚ï¼šè‰¯å¥½çš„äº¤æŽ¥å½¢å¼ã€é‡è¯•è¯Šæ–­ã€è¾¹ç•Œæƒ…å†µã€‚

## å·¥ä½œåŒºå¤„ç†

ä½ çš„å·¥ä½œåŒºç±»åž‹å†³å®šäº†ä½ åœ¨ `$ZED_KANBAN_WORKSPACE` å†…éƒ¨çš„è¡Œä¸ºæ–¹å¼ï¼š

| ç±»åž‹ | å«ä¹‰ | æ“ä½œæ–¹å¼ |
|---|---|---|
| `scratch` | å…¨æ–°çš„ä¸´æ—¶ç›®å½•ï¼Œä»…ä¾›ä½ ä½¿ç”¨ | è‡ªç”±è¯»å†™ï¼›ä»»åŠ¡å½’æ¡£åŽä¼šè¢« GC å›žæ”¶ã€‚ |
| `dir:<path>` | å…±äº«çš„æŒä¹…åŒ–ç›®å½• | å…¶ä»–è¿è¡Œå®žä¾‹ä¼šè¯»å–ä½ å†™å…¥çš„å†…å®¹ã€‚å°†å…¶è§†ä¸ºé•¿æœŸçŠ¶æ€ã€‚è·¯å¾„ä¿è¯ä¸ºç»å¯¹è·¯å¾„ï¼ˆå†…æ ¸æ‹’ç»ç›¸å¯¹è·¯å¾„ï¼‰ã€‚ |
| `worktree` | ä½äºŽå·²è§£æžè·¯å¾„çš„ Git worktree | è‹¥ `.git` ä¸å­˜åœ¨ï¼Œå…ˆä»Žä¸»ä»“åº“æ‰§è¡Œ `git worktree add <path> <branch>`ï¼Œç„¶åŽ cd è¿›åŽ»æ­£å¸¸å·¥ä½œã€‚åœ¨æ­¤æäº¤å·¥ä½œã€‚ |

## ç§Ÿæˆ·éš”ç¦»

è‹¥ `$ZED_TENANT` å·²è®¾ç½®ï¼Œåˆ™è¯¥ä»»åŠ¡å±žäºŽæŸä¸ªç§Ÿæˆ·å‘½åç©ºé—´ã€‚åœ¨è¯»å†™æŒä¹…åŒ–å†…å­˜æ—¶ï¼Œè¯·ä¸ºå†…å­˜æ¡ç›®æ·»åŠ ç§Ÿæˆ·å‰ç¼€ï¼Œä»¥é˜²ä¸Šä¸‹æ–‡è·¨ç§Ÿæˆ·æ³„æ¼ï¼š

- æ­£ç¡®ï¼š`business-a: Acme is our biggest customer`
- é”™è¯¯ï¼ˆä¼šæ³„æ¼ï¼‰ï¼š`Acme is our biggest customer`

## è‰¯å¥½çš„ summary + metadata å½¢å¼

`kanban_complete(summary=..., metadata=...)` çš„äº¤æŽ¥æ–¹å¼æ˜¯ä¸‹æ¸¸ worker è¯»å–ä½ å·¥ä½œæˆæžœçš„é€”å¾„ã€‚ä»¥ä¸‹æ˜¯æœ‰æ•ˆçš„æ¨¡å¼ï¼š

**ç¼–ç ä»»åŠ¡ï¼š**
```python
kanban_complete(
    summary="shipped rate limiter â€” token bucket, keys on user_id with IP fallback, 14 tests pass",
    metadata={
        "changed_files": ["rate_limiter.py", "tests/test_rate_limiter.py"],
        "tests_run": 14,
        "tests_passed": 14,
        "decisions": ["user_id primary, IP fallback for unauthenticated requests"],
    },
)
```

**éœ€è¦äººå·¥å®¡æŸ¥çš„ç¼–ç ä»»åŠ¡ï¼ˆreview-requiredï¼‰ï¼š**

å¯¹äºŽå¤§å¤šæ•°æ¶‰åŠä»£ç å˜æ›´çš„ä»»åŠ¡ï¼Œåœ¨äººå·¥å®¡æŸ¥è€…è¿‡ç›®ä¹‹å‰ï¼Œå·¥ä½œå¹¶æœªçœŸæ­£*å®Œæˆ*ã€‚åº”ä½¿ç”¨ block è€Œéž completeï¼Œå¹¶åœ¨ `reason` å‰åŠ  `review-required: ` å‰ç¼€ï¼Œä»¥ä¾¿ä»ªè¡¨æ¿å°†è¯¥è¡Œæ ‡è®°ä¸ºå¾…å®¡æŸ¥ã€‚å…ˆå°†ç»“æž„åŒ–å…ƒæ•°æ®ï¼ˆå˜æ›´æ–‡ä»¶ã€æµ‹è¯•è®¡æ•°ã€diff/PR urlï¼‰å†™å…¥ commentï¼Œå› ä¸º `kanban_block` åªæºå¸¦äººç±»å¯è¯»çš„åŽŸå› â€”â€”comment æ˜¯æŒä¹…åŒ–æ³¨é‡Šçš„æ¸ é“ã€‚å®¡æŸ¥è€…å¯æ‰§è¡Œ `zed kanban unblock <id>` æ‰¹å‡†ï¼ˆè¿™ä¼šæºå¸¦ comment çº¿ç¨‹é‡æ–°æ´¾ç”Ÿä½ ä»¥å¤„ç†åŽç»­äº‹é¡¹ï¼‰ï¼Œæˆ–é€šè¿‡å¦ä¸€æ¡ comment è¦æ±‚ä¿®æ”¹ã€‚

```python
import json

kanban_comment(
    body="review-required handoff:\n" + json.dumps({
        "changed_files": ["rate_limiter.py", "tests/test_rate_limiter.py"],
        "tests_run": 14,
        "tests_passed": 14,
        "diff_path": "/path/to/worktree",  # or PR url if pushed
        "decisions": ["user_id primary, IP fallback for unauthenticated requests"],
    }, indent=2),
)
kanban_block(
    reason="review-required: rate limiter shipped, 14/14 tests pass â€” needs eyes on the user_id/IP fallback choice before merging",
)
```

ä»…åœ¨ä»»åŠ¡çœŸæ­£ç»ˆç»“æ—¶ä½¿ç”¨ `kanban_complete`â€”â€”ä¾‹å¦‚å•è¡Œæ‹¼å†™ä¿®å¤ã€æ— åŠŸèƒ½å½±å“çš„æ–‡æ¡£å˜æ›´ï¼Œæˆ–äº§å‡ºç‰©æœ¬èº«å³ä¸ºæˆæžœçš„ç ”ç©¶ä»»åŠ¡ã€‚

**ç ”ç©¶ä»»åŠ¡ï¼š**
```python
kanban_complete(
    summary="3 competing libraries reviewed; vLLM wins on throughput, SGLang on latency, Tensorrt-LLM on memory efficiency",
    metadata={
        "sources_read": 12,
        "recommendation": "vLLM",
        "benchmarks": {"vllm": 1.0, "sglang": 0.87, "trtllm": 0.72},
    },
)
```

**å®¡æŸ¥ä»»åŠ¡ï¼š**
```python
kanban_complete(
    summary="reviewed PR #123; 2 blocking issues found (SQL injection in /search, missing CSRF on /settings)",
    metadata={
        "pr_number": 123,
        "findings": [
            {"severity": "critical", "file": "api/search.py", "line": 42, "issue": "raw SQL concat"},
            {"severity": "high", "file": "api/settings.py", "issue": "missing CSRF middleware"},
        ],
        "approved": False,
    },
)
```

è¯·å°† `metadata` çš„ç»“æž„è®¾è®¡ä¸ºä¸‹æ¸¸è§£æžå™¨ï¼ˆå®¡æŸ¥è€…ã€èšåˆå™¨ã€è°ƒåº¦å™¨ï¼‰æ— éœ€é‡æ–°é˜…è¯»ä½ çš„æ–‡å­—æè¿°å³å¯ç›´æŽ¥ä½¿ç”¨ã€‚

## è®¤é¢†ä½ å®žé™…åˆ›å»ºçš„å¡ç‰‡

è‹¥ä½ çš„è¿è¡Œäº§ç”Ÿäº†æ–°çš„ kanban ä»»åŠ¡ï¼ˆé€šè¿‡ `kanban_create`ï¼‰ï¼Œè¯·åœ¨ `kanban_complete` çš„ `created_cards` ä¸­ä¼ å…¥è¿™äº› idã€‚å†…æ ¸ä¼šéªŒè¯æ¯ä¸ª id æ˜¯å¦å­˜åœ¨ä¸”ç”±ä½ çš„ profile åˆ›å»ºï¼›ä»»ä½•å¹»æž„çš„ id éƒ½ä¼šå¯¼è‡´å®Œæˆæ“ä½œè¢«é˜»æ–­ï¼Œå¹¶é™„å¸¦é”™è¯¯åˆ—è¡¨è¯´æ˜Žé—®é¢˜æ‰€åœ¨ï¼Œä¸”è¢«æ‹’ç»çš„å°è¯•ä¼šæ°¸ä¹…è®°å½•åœ¨ä»»åŠ¡çš„äº‹ä»¶æ—¥å¿—ä¸­ã€‚**åªåˆ—å‡ºä½ ä»ŽæˆåŠŸçš„ `kanban_create` è¿”å›žå€¼ä¸­æ•èŽ·çš„ idâ€”â€”ç»ä¸å‡­ç©ºæé€  idï¼Œç»ä¸ç²˜è´´æ¥è‡ªæ—©æœŸè¿è¡Œçš„ idï¼Œç»ä¸è®¤é¢†å…¶ä»– worker åˆ›å»ºçš„å¡ç‰‡ã€‚**

```python
# æ­£ç¡® â€” æ•èŽ·è¿”å›žå€¼ï¼Œç„¶åŽè®¤é¢†ã€‚
c1 = kanban_create(title="remediate SQL injection", assignee="security-worker")
c2 = kanban_create(title="fix CSRF middleware", assignee="web-worker")

kanban_complete(
    summary="Review done; spawned remediations for both findings.",
    metadata={"pr_number": 123, "approved": False},
    created_cards=[c1["task_id"], c2["task_id"]],
)
```

```python
# é”™è¯¯ â€” è®¤é¢†æ²¡æœ‰æ•èŽ·è¿”å›žå€¼çš„ idã€‚
kanban_complete(
    summary="Created remediation cards t_a1b2c3d4, t_deadbeef",  # å¹»æž„
    created_cards=["t_a1b2c3d4", "t_deadbeef"],                   # â†’ é—¨æŽ§æ‹’ç»
)
```

è‹¥ `kanban_create` è°ƒç”¨å¤±è´¥ï¼ˆå¼‚å¸¸ã€tool_errorï¼‰ï¼Œåˆ™å¡ç‰‡æœªè¢«åˆ›å»ºâ€”â€”ä¸è¦ä¸ºå…¶åŒ…å«å¹»æž„ idã€‚é‡è¯•åˆ›å»ºï¼Œæˆ–çœç•¥è¯¥ id å¹¶åœ¨ summary ä¸­è¯´æ˜Žå¤±è´¥æƒ…å†µã€‚æ•£æ–‡æ‰«æé˜¶æ®µä¹Ÿä¼šæ•èŽ·ä½ è‡ªç”±æ ¼å¼ summary ä¸­æ— æ³•è§£æžçš„ `t_<hex>` å¼•ç”¨ï¼›è¿™äº›ä¸ä¼šé˜»æ–­å®Œæˆæ“ä½œï¼Œä½†ä¼šåœ¨ä»ªè¡¨æ¿çš„ä»»åŠ¡ä¸Šæ˜¾ç¤ºä¸ºå»ºè®®æ€§è­¦å‘Šã€‚

## èƒ½å¿«é€Ÿå¾—åˆ°å›žåº”çš„ block åŽŸå› 

å·®ï¼š`"stuck"` â€” äººç±»æ²¡æœ‰ä»»ä½•ä¸Šä¸‹æ–‡ã€‚

å¥½ï¼šä¸€å¥è¯è¯´æ˜Žä½ éœ€è¦çš„å…·ä½“å†³ç­–ã€‚å°†æ›´é•¿çš„ä¸Šä¸‹æ–‡ä½œä¸º comment ç•™ä¸‹ã€‚

```python
kanban_comment(
    task_id=os.environ["ZED_KANBAN_TASK"],
    body="Full context: I have user IPs from Cloudflare headers but some users are behind NATs with thousands of peers. Keying on IP alone causes false positives.",
)
kanban_block(reason="Rate limit key choice: IP (simple, NAT-unsafe) or user_id (requires auth, skips anonymous endpoints)?")
```

block æ¶ˆæ¯æ˜¯ä»ªè¡¨æ¿/gateway é€šçŸ¥å™¨ä¸­æ˜¾ç¤ºçš„å†…å®¹ã€‚comment æ˜¯äººç±»æ‰“å¼€ä»»åŠ¡æ—¶é˜…è¯»çš„æ·±å±‚ä¸Šä¸‹æ–‡ã€‚

## å€¼å¾—å‘é€çš„ heartbeat

å¥½çš„ heartbeat åº”è¯´æ˜Žè¿›åº¦ï¼š`"epoch 12/50, loss 0.31"`ã€`"scanned 1.2M/2.4M rows"`ã€`"uploaded 47/120 videos"`ã€‚

å·®çš„ heartbeatï¼š`"still working"`ã€ç©º notesã€äºšç§’çº§é—´éš”ã€‚æœ€å¤šæ¯éš”å‡ åˆ†é’Ÿå‘é€ä¸€æ¬¡ï¼›å¯¹äºŽçº¦ 2 åˆ†é’Ÿä»¥å†…çš„ä»»åŠ¡å¯å®Œå…¨è·³è¿‡ã€‚

## é‡è¯•åœºæ™¯

è‹¥ä½ æ‰“å¼€ä»»åŠ¡åŽ `kanban_show` è¿”å›žçš„ `runs: [...]` ä¸­åŒ…å«ä¸€ä¸ªæˆ–å¤šä¸ªå·²å…³é—­çš„è¿è¡Œï¼Œè¯´æ˜Žä½ æ˜¯ä¸€æ¬¡é‡è¯•ã€‚å…ˆå‰è¿è¡Œçš„ `outcome` / `summary` / `error` ä¼šå‘Šè¯‰ä½ å“ªé‡Œå‡ºäº†é—®é¢˜ã€‚ä¸è¦é‡å¤é‚£æ¡è·¯å¾„ã€‚å…¸åž‹çš„é‡è¯•è¯Šæ–­ï¼š

- `outcome: "timed_out"` â€” ä¸Šæ¬¡å°è¯•è¾¾åˆ°äº† `max_runtime_seconds`ã€‚ä½ å¯èƒ½éœ€è¦å°†å·¥ä½œåˆ†å—æˆ–ç¼©çŸ­ã€‚
- `outcome: "crashed"` â€” OOM æˆ–æ®µé”™è¯¯ã€‚å‡å°‘å†…å­˜å ç”¨ã€‚
- `outcome: "spawn_failed"` + `error: "..."` â€” é€šå¸¸æ˜¯ profile é…ç½®é—®é¢˜ï¼ˆç¼ºå°‘å‡­è¯ã€é”™è¯¯çš„ PATHï¼‰ã€‚é€šè¿‡ `kanban_block` è¯¢é—®äººç±»ï¼Œè€Œä¸æ˜¯ç›²ç›®é‡è¯•ã€‚
- `outcome: "reclaimed"` + `summary: "task archived..."` â€” æ“ä½œå‘˜åœ¨ä¸Šæ¬¡è¿è¡ŒæœŸé—´å°†ä»»åŠ¡å½’æ¡£ï¼›ä½ å¯èƒ½æ ¹æœ¬ä¸åº”è¯¥åœ¨è¿è¡Œï¼Œè¯·ä»”ç»†æ£€æŸ¥çŠ¶æ€ã€‚
- `outcome: "blocked"` â€” ä¸Šæ¬¡å°è¯•è¢«é˜»æ–­ï¼›è§£é™¤é˜»æ–­çš„ comment çŽ°åœ¨åº”è¯¥å·²åœ¨çº¿ç¨‹ä¸­ã€‚

## ç¦æ­¢äº‹é¡¹

- ä¸è¦ç”¨ `delegate_task` æ›¿ä»£ `kanban_create`ã€‚`delegate_task` ç”¨äºŽä½ çš„è¿è¡Œå†…éƒ¨çš„çŸ­æœŸæŽ¨ç†å­ä»»åŠ¡ï¼›`kanban_create` ç”¨äºŽè·¨ agent çš„ã€è¶…å‡ºå•æ¬¡ API å¾ªçŽ¯çš„äº¤æŽ¥ã€‚
- ä¸è¦ä¿®æ”¹ `$ZED_KANBAN_WORKSPACE` ä¹‹å¤–çš„æ–‡ä»¶ï¼Œé™¤éžä»»åŠ¡æ­£æ–‡æ˜Žç¡®è¦æ±‚ã€‚
- ä¸è¦åˆ›å»ºåˆ†é…ç»™è‡ªå·±çš„åŽç»­ä»»åŠ¡â€”â€”åˆ†é…ç»™åˆé€‚çš„ä¸“å®¶ã€‚
- ä¸è¦å®Œæˆä¸€ä¸ªä½ å®žé™…ä¸Šæ²¡æœ‰å®Œæˆçš„ä»»åŠ¡ã€‚æ”¹ä¸º block å®ƒã€‚

## é™·é˜±

**ä»»åŠ¡çŠ¶æ€å¯èƒ½åœ¨è°ƒåº¦ä¸Žå¯åŠ¨ä¹‹é—´å‘ç”Ÿå˜åŒ–ã€‚** ä»Žè°ƒåº¦å™¨è®¤é¢†ä»»åŠ¡åˆ°ä½ çš„è¿›ç¨‹å®žé™…å¯åŠ¨ä¹‹é—´ï¼Œä»»åŠ¡å¯èƒ½å·²è¢« blockã€é‡æ–°åˆ†é…æˆ–å½’æ¡£ã€‚å§‹ç»ˆå…ˆæ‰§è¡Œ `kanban_show`ã€‚è‹¥å…¶æŠ¥å‘Š `blocked` æˆ– `archived`ï¼Œè¯·åœæ­¢â€”â€”ä½ ä¸åº”è¯¥åœ¨è¿è¡Œã€‚

**å·¥ä½œåŒºå¯èƒ½å­˜åœ¨è¿‡æœŸäº§ç‰©ã€‚** å°¤å…¶æ˜¯ `dir:` å’Œ `worktree` å·¥ä½œåŒºå¯èƒ½åŒ…å«æ¥è‡ªå…ˆå‰è¿è¡Œçš„æ–‡ä»¶ã€‚é˜…è¯» comment çº¿ç¨‹â€”â€”å®ƒé€šå¸¸ä¼šè§£é‡Šä½ ä¸ºä½•å†æ¬¡è¿è¡Œä»¥åŠå·¥ä½œåŒºå¤„äºŽä½•ç§çŠ¶æ€ã€‚

**å½“æŒ‡å¯¼å·²å¯ç”¨æ—¶ï¼Œä¸è¦ä¾èµ– CLIã€‚** `kanban_*` å·¥å…·å¯åœ¨æ‰€æœ‰ç»ˆç«¯åŽç«¯ï¼ˆDockerã€Modalã€SSHï¼‰ä¸Šå·¥ä½œã€‚ä»Žä½ çš„ç»ˆç«¯å·¥å…·æ‰§è¡Œ `zed kanban <verb>` åœ¨å®¹å™¨åŒ–åŽç«¯ä¸­ä¼šå¤±è´¥ï¼Œå› ä¸º CLI æœªå®‰è£…åœ¨é‚£é‡Œã€‚å¦‚æœ‰ç–‘é—®ï¼Œä½¿ç”¨å·¥å…·ã€‚

## CLI å›žé€€ï¼ˆç”¨äºŽè„šæœ¬ï¼‰

æ¯ä¸ªå·¥å…·éƒ½æœ‰å¯¹åº”çš„ CLI ç­‰ä»·å‘½ä»¤ï¼Œä¾›äººå·¥æ“ä½œå‘˜å’Œè„šæœ¬ä½¿ç”¨ï¼š
- `kanban_show` â†” `zed kanban show <id> --json`
- `kanban_complete` â†” `zed kanban complete <id> --summary "..." --metadata '{...}'`
- `kanban_block` â†” `zed kanban block <id> "reason"`
- `kanban_create` â†” `zed kanban create "title" --assignee <profile> [--parent <id>]`
- ç­‰ç­‰ã€‚

åœ¨ agent å†…éƒ¨ä½¿ç”¨å·¥å…·ï¼›CLI ä¾›ç»ˆç«¯å‰çš„äººç±»ä½¿ç”¨ã€‚