# Kanban æ•™ç¨‹

Zed Kanban ç³»ç»Ÿæ‰€è®¾è®¡çš„å››ä¸ªä½¿ç”¨åœºæ™¯çš„å®Œæ•´æ¼”ç¤ºï¼Œéœ€åœ¨æµè§ˆå™¨ä¸­æ‰“å¼€ dashboardã€‚å¦‚æžœä½ è¿˜æ²¡æœ‰é˜…è¯» [Kanban æ¦‚è¿°](./kanban)ï¼Œè¯·å…ˆä»Žé‚£é‡Œå¼€å§‹â€”â€”æœ¬æ–‡å‡è®¾ä½ å·²äº†è§£ taskï¼ˆä»»åŠ¡ï¼‰ã€runï¼ˆè¿è¡Œï¼‰ã€assigneeï¼ˆè´Ÿè´£äººï¼‰å’Œ dispatcherï¼ˆè°ƒåº¦å™¨ï¼‰çš„æ¦‚å¿µã€‚

## å‡†å¤‡å·¥ä½œ

```bash
zed kanban init           # å¯é€‰ï¼›é¦–æ¬¡æ‰§è¡Œ `zed kanban <ä»»ä½•å‘½ä»¤>` ä¼šè‡ªåŠ¨åˆå§‹åŒ–
zed dashboard             # åœ¨æµè§ˆå™¨ä¸­æ‰“å¼€ http://127.0.0.1:9119
# ç‚¹å‡»å·¦ä¾§å¯¼èˆªæ ä¸­çš„ Kanban
```

dashboard æ˜¯**ä½ **è§‚å¯Ÿç³»ç»Ÿæœ€ä¾¿æ·çš„åœ°æ–¹ã€‚dispatcher ç”Ÿæˆçš„ agent worker ä¸ä¼šçœ‹åˆ° dashboard æˆ– CLIâ€”â€”å®ƒä»¬é€šè¿‡ä¸“ç”¨çš„ `kanban_*` [å·¥å…·é›†](./kanban#how-workers-interact-with-the-board)ï¼ˆ`kanban_show`ã€`kanban_list`ã€`kanban_complete`ã€`kanban_block`ã€`kanban_heartbeat`ã€`kanban_comment`ã€`kanban_create`ã€`kanban_link`ã€`kanban_unblock`ï¼‰æ¥æ“ä½œçœ‹æ¿ã€‚ä¸‰ä¸ªç•Œé¢â€”â€”dashboardã€CLIã€worker å·¥å…·â€”â€”éƒ½é€šè¿‡åŒä¸€ä¸ªæ¯çœ‹æ¿ç‹¬ç«‹çš„ SQLite æ•°æ®åº“ï¼ˆé»˜è®¤çœ‹æ¿ä¸º `~/.zed/kanban.db`ï¼ŒåŽç»­åˆ›å»ºçš„ä»»æ„çœ‹æ¿ä¸º `~/.zed/kanban/boards/<slug>/kanban.db`ï¼‰è¿›è¡Œè·¯ç”±ï¼Œå› æ­¤æ— è®ºå˜æ›´æ¥è‡ªå“ªä¸€ä¾§ï¼Œæ¯ä¸ªçœ‹æ¿çš„æ•°æ®å§‹ç»ˆä¸€è‡´ã€‚

æœ¬æ•™ç¨‹å…¨ç¨‹ä½¿ç”¨ `default` çœ‹æ¿ã€‚å¦‚æžœä½ éœ€è¦å¤šä¸ªéš”ç¦»é˜Ÿåˆ—ï¼ˆæ¯ä¸ªé¡¹ç›®/ä»“åº“/é¢†åŸŸä¸€ä¸ªï¼‰ï¼Œè¯·å‚é˜…æ¦‚è¿°ä¸­çš„[çœ‹æ¿ï¼ˆå¤šé¡¹ç›®ï¼‰](./kanban#boards-multi-project)â€”â€”ç›¸åŒçš„ CLI/dashboard/worker æµç¨‹é€‚ç”¨äºŽæ¯ä¸ªçœ‹æ¿ï¼Œä¸” worker åœ¨ç‰©ç†ä¸Šæ— æ³•çœ‹åˆ°å…¶ä»–çœ‹æ¿ä¸Šçš„ä»»åŠ¡ã€‚

åœ¨æœ¬æ•™ç¨‹ä¸­ï¼Œ**æ ‡æ³¨ä¸º `bash` çš„ä»£ç å—æ˜¯*ä½ *è¿è¡Œçš„å‘½ä»¤ã€‚** æ ‡æ³¨ä¸º `# worker tool calls` çš„ä»£ç å—æ˜¯ç”Ÿæˆçš„ worker æ¨¡åž‹å‘å‡ºçš„å·¥å…·è°ƒç”¨â€”â€”å±•ç¤ºåœ¨è¿™é‡Œæ˜¯ä¸ºäº†è®©ä½ èƒ½ç«¯åˆ°ç«¯åœ°äº†è§£æ•´ä¸ªå¾ªçŽ¯ï¼Œè€Œä¸æ˜¯è®©ä½ è‡ªå·±åŽ»è¿è¡Œå®ƒä»¬ã€‚

## çœ‹æ¿æ¦‚è§ˆ

![Kanban board overview](/img/kanban-tutorial/01-board-overview.png)

ä»Žå·¦åˆ°å³å…±å…­åˆ—ï¼š

- **Triageï¼ˆåˆ†ç±»ï¼‰** â€” åŽŸå§‹æƒ³æ³•ã€‚é»˜è®¤æƒ…å†µä¸‹ï¼Œdispatcher ä¼šå¯¹æ­¤å¤„çš„ä»»åŠ¡è‡ªåŠ¨è¿è¡Œ**åˆ†è§£å™¨**ï¼ˆorchestrator é©±åŠ¨çš„æ‰‡å‡ºï¼‰ï¼šå®ƒè¯»å–ä½ çš„ profile åå†Œå’Œæè¿°ï¼Œç”Ÿæˆä¸€å¼ å­ä»»åŠ¡å›¾ï¼Œå°†ä»»åŠ¡è·¯ç”±ç»™æœ€åˆé€‚çš„ä¸“å®¶ï¼ŒåŒæ—¶ä¿æŒåŽŸå§‹ä»»åŠ¡ä½œä¸ºçˆ¶ä»»åŠ¡å­˜æ´»ï¼Œä»¥ä¾¿åœ¨æ‰€æœ‰å­ä»»åŠ¡å®ŒæˆåŽ orchestrator é‡æ–°å”¤é†’æ¥åˆ¤æ–­å®Œæˆæƒ…å†µã€‚ç‚¹å‡» kanban é¡µé¢é¡¶éƒ¨çš„ **Orchestration: Auto/Manual** åˆ‡æ¢æŒ‰é’®æ¥åˆ‡æ¢æ¨¡å¼ã€‚åœ¨ Manual æ¨¡å¼ä¸‹ï¼ˆæˆ–æ²¡æœ‰ orchestrator profile çš„é…ç½®ä¸­ï¼‰ï¼Œç‚¹å‡»å¡ç‰‡ä¸Šçš„ **âš— Decompose**ï¼Œæˆ–è¿è¡Œ `zed kanban decompose <id>` / `/kanban decompose <id>`ã€‚å¯¹äºŽä¸éœ€è¦æ‰‡å‡ºçš„å•ä¸ªä»»åŠ¡ï¼Œ**âœ¨ Specify** ä¼šè¿›è¡Œä¸€æ¬¡æ€§è§„æ ¼é‡å†™ï¼ˆç›®æ ‡ã€æ–¹æ³•ã€éªŒæ”¶æ ‡å‡†ï¼‰å¹¶å°†ä»»åŠ¡æå‡åˆ° `todo`ã€‚åœ¨ `config.yaml` çš„ `auxiliary.kanban_decomposer` å’Œ `auxiliary.triage_specifier` ä¸‹é…ç½®ç›¸å…³æ¨¡åž‹ã€‚å‚è§ä¸» Kanban æŒ‡å—ä¸­çš„[è‡ªåŠ¨ä¸Žæ‰‹åŠ¨ç¼–æŽ’](./kanban#auto-vs-manual-orchestration)ã€‚
- **Todoï¼ˆå¾…åŠžï¼‰** â€” å·²åˆ›å»ºä½†ç­‰å¾…ä¾èµ–é¡¹ï¼Œæˆ–å°šæœªåˆ†é…ã€‚
- **Readyï¼ˆå°±ç»ªï¼‰** â€” å·²åˆ†é…ï¼Œç­‰å¾… dispatcher è®¤é¢†ã€‚
- **In progressï¼ˆè¿›è¡Œä¸­ï¼‰** â€” worker æ­£åœ¨ä¸»åŠ¨æ‰§è¡Œä»»åŠ¡ã€‚å¼€å¯"Lanes by profile"ï¼ˆé»˜è®¤å¼€å¯ï¼‰æ—¶ï¼Œæ­¤åˆ—æŒ‰è´Ÿè´£äººåˆ†ç»„ï¼Œè®©ä½ ä¸€çœ¼çœ‹å‡ºæ¯ä¸ª worker æ­£åœ¨åšä»€ä¹ˆã€‚
- **Blockedï¼ˆé˜»å¡žï¼‰** â€” worker è¯·æ±‚äººå·¥è¾“å…¥ï¼Œæˆ–ç†”æ–­å™¨è§¦å‘ã€‚
- **Doneï¼ˆå®Œæˆï¼‰** â€” å·²å®Œæˆã€‚

é¡¶éƒ¨æ æä¾›æœç´¢ã€ç§Ÿæˆ·å’Œè´Ÿè´£äººçš„ç­›é€‰å™¨ï¼Œä»¥åŠ `Lanes by profile` åˆ‡æ¢æŒ‰é’®å’Œ `Nudge dispatcher` æŒ‰é’®â€”â€”åŽè€…ä¼šç«‹å³æ‰§è¡Œä¸€æ¬¡è°ƒåº¦ tickï¼Œè€Œæ— éœ€ç­‰å¾…å®ˆæŠ¤è¿›ç¨‹çš„ä¸‹ä¸€ä¸ªé—´éš”ã€‚ç‚¹å‡»ä»»æ„å¡ç‰‡ä¼šåœ¨å³ä¾§æ‰“å¼€å…¶è¯¦æƒ…æŠ½å±‰ã€‚

### å¹³é“ºè§†å›¾

å¦‚æžœ profile æ³³é“æ˜¾ç¤ºè¿‡äºŽå˜ˆæ‚ï¼Œå…³é—­"Lanes by profile"ï¼ŒIn Progress åˆ—ä¼šæŠ˜å ä¸ºæŒ‰è®¤é¢†æ—¶é—´æŽ’åºçš„å•ä¸€å¹³é“ºåˆ—è¡¨ï¼š

![Board with lanes by profile off](/img/kanban-tutorial/02-board-flat.png)

## åœºæ™¯ä¸€ â€” ç‹¬ç«‹å¼€å‘è€…äº¤ä»˜åŠŸèƒ½

ä½ æ­£åœ¨å¼€å‘ä¸€ä¸ªåŠŸèƒ½ã€‚ç»å…¸æµç¨‹ï¼šè®¾è®¡ schemaã€å®žçŽ° APIã€ç¼–å†™æµ‹è¯•ã€‚ä¸‰ä¸ªä»»åŠ¡ï¼Œå…·æœ‰çˆ¶â†’å­ä¾èµ–å…³ç³»ã€‚

```bash
SCHEMA=$(zed kanban create "Design auth schema" \
    --assignee backend-dev --tenant auth-project --priority 2 \
    --body "Design the user/session/token schema for the auth module." \
    --json | jq -r .id)

API=$(zed kanban create "Implement auth API endpoints" \
    --assignee backend-dev --tenant auth-project --priority 2 \
    --parent $SCHEMA \
    --body "POST /register, POST /login, POST /refresh, POST /logout." \
    --json | jq -r .id)

zed kanban create "Write auth integration tests" \
    --assignee qa-dev --tenant auth-project --priority 2 \
    --parent $API \
    --body "Cover happy path, wrong password, expired token, concurrent refresh."
```

ç”±äºŽ `API` ä»¥ `SCHEMA` ä¸ºçˆ¶ä»»åŠ¡ï¼Œ`tests` ä»¥ `API` ä¸ºçˆ¶ä»»åŠ¡ï¼Œåªæœ‰ `SCHEMA` ä»Ž `ready` çŠ¶æ€å¼€å§‹ã€‚å…¶ä»–ä¸¤ä¸ªä»»åŠ¡åœ¨ `todo` ä¸­ç­‰å¾…ï¼Œç›´åˆ°å…¶çˆ¶ä»»åŠ¡å®Œæˆã€‚è¿™æ­£æ˜¯ä¾èµ–æå‡å¼•æ“Žåœ¨å‘æŒ¥ä½œç”¨â€”â€”åœ¨æœ‰ API å¯æµ‹è¯•ä¹‹å‰ï¼Œä¸ä¼šæœ‰å…¶ä»– worker åŽ»æŽ¥æ‰‹æµ‹è¯•ç¼–å†™å·¥ä½œã€‚

åœ¨ä¸‹ä¸€æ¬¡ dispatcher tick æ—¶ï¼ˆé»˜è®¤ 60 ç§’ï¼Œæˆ–ç‚¹å‡» **Nudge dispatcher** ç«‹å³è§¦å‘ï¼‰ï¼Œ`backend-dev` profile ä¼šä»¥ `ZED_KANBAN_TASK=$SCHEMA` ä½œä¸ºçŽ¯å¢ƒå˜é‡ç”Ÿæˆä¸€ä¸ª workerã€‚ä»¥ä¸‹æ˜¯è¯¥ worker åœ¨ agent å†…éƒ¨çš„å·¥å…·è°ƒç”¨å¾ªçŽ¯ï¼š

```python
# worker tool calls â€” NOT commands you run
kanban_show()
# â†’ è¿”å›ž titleã€bodyã€worker_contextã€parentsã€prior attemptsã€comments

# ï¼ˆworker è¯»å– worker_contextï¼Œä½¿ç”¨ç»ˆç«¯/æ–‡ä»¶å·¥å…·è®¾è®¡ schemaï¼Œ
#   ç¼–å†™è¿ç§»è„šæœ¬ï¼Œè¿è¡Œè‡ªèº«æ£€æŸ¥ï¼Œæäº¤â€”â€”çœŸæ­£çš„å·¥ä½œåœ¨è¿™é‡Œå‘ç”Ÿï¼‰

kanban_heartbeat(note="schema drafted, writing migrations now")

kanban_complete(
    summary="users(id, email, pw_hash), sessions(id, user_id, jti, expires_at); "
            "refresh tokens stored as sessions with type='refresh'",
    metadata={
        "changed_files": ["migrations/001_users.sql", "migrations/002_sessions.sql"],
        "decisions": ["bcrypt for hashing", "JWT for session tokens",
                      "7-day refresh, 15-min access"],
    },
)
```

`kanban_show` é»˜è®¤å°† `task_id` è®¾ä¸º `$ZED_KANBAN_TASK`ï¼Œå› æ­¤ worker æ— éœ€çŸ¥é“è‡ªå·±çš„ idã€‚`kanban_complete` å°† summary å’Œ metadata å†™å…¥å½“å‰ `task_runs` è¡Œï¼Œå…³é—­è¯¥ runï¼Œå¹¶å°†ä»»åŠ¡è½¬æ¢ä¸º `done`â€”â€”å…¨éƒ¨é€šè¿‡ `kanban_db` ä»¥åŽŸå­æ–¹å¼å®Œæˆã€‚

å½“ `SCHEMA` è¿›å…¥ `done` çŠ¶æ€æ—¶ï¼Œä¾èµ–å¼•æ“Žä¼šè‡ªåŠ¨å°† `API` æå‡ä¸º `ready`ã€‚API worker è®¤é¢†ä»»åŠ¡åŽï¼Œè°ƒç”¨ `kanban_show()` æ—¶ä¼šçœ‹åˆ° `SCHEMA` çš„ summary å’Œ metadata é™„åŠ åœ¨çˆ¶ä»»åŠ¡äº¤æŽ¥ä¿¡æ¯ä¸­â€”â€”å› æ­¤å®ƒæ— éœ€é‡æ–°é˜…è¯»å†—é•¿çš„è®¾è®¡æ–‡æ¡£å°±èƒ½äº†è§£ schema çš„å†³ç­–ã€‚

åœ¨çœ‹æ¿ä¸Šç‚¹å‡»å·²å®Œæˆçš„ schema ä»»åŠ¡ï¼ŒæŠ½å±‰ä¼šæ˜¾ç¤ºæ‰€æœ‰ä¿¡æ¯ï¼š

![Solo dev â€” completed schema task drawer](/img/kanban-tutorial/03-drawer-schema-task.png)

åº•éƒ¨çš„ Run History éƒ¨åˆ†æ˜¯å…³é”®æ–°å¢žå†…å®¹ã€‚ä¸€æ¬¡å°è¯•ï¼šç»“æžœ `completed`ï¼Œworker `@backend-dev`ï¼Œè€—æ—¶ã€æ—¶é—´æˆ³ï¼Œä»¥åŠå®Œæ•´çš„äº¤æŽ¥ summaryã€‚metadata å—ï¼ˆ`changed_files`ã€`decisions`ï¼‰ä¹Ÿå­˜å‚¨åœ¨ run ä¸Šï¼Œå¹¶ä¼šå‘ˆçŽ°ç»™è¯»å–è¯¥çˆ¶ä»»åŠ¡çš„ä»»ä½•ä¸‹æ¸¸ workerã€‚

ä½ å¯ä»¥éšæ—¶åœ¨ç»ˆç«¯æ£€æŸ¥ç›¸åŒçš„æ•°æ®â€”â€”ä»¥ä¸‹å‘½ä»¤æ˜¯**ä½ **æŸ¥çœ‹çœ‹æ¿ï¼Œè€Œéž worker æ‰§è¡Œï¼š

```bash
zed kanban show $SCHEMA
zed kanban runs $SCHEMA
# #  OUTCOME       PROFILE       ELAPSED  STARTED
# 1  completed     backend-dev        0s  2026-04-27 19:34
#     â†’ users(id, email, pw_hash), sessions(id, user_id, jti, expires_at); refresh tokens ...
```

## åœºæ™¯äºŒ â€” é›†ç¾¤å¹¶è¡Œå¤„ç†

ä½ æœ‰ä¸‰ä¸ª workerï¼ˆç¿»è¯‘å‘˜ã€è½¬å½•å‘˜ã€æ–‡æ¡ˆæ’°å†™å‘˜ï¼‰å’Œä¸€æ‰¹ç›¸äº’ç‹¬ç«‹çš„ä»»åŠ¡ã€‚ä½ å¸Œæœ›ä¸‰è€…å¹¶è¡Œæ‹‰å–ä»»åŠ¡å¹¶äº§ç”Ÿå¯è§è¿›å±•ã€‚è¿™æ˜¯æœ€ç®€å•çš„ kanban ä½¿ç”¨åœºæ™¯ï¼Œä¹Ÿæ˜¯æœ€åˆè®¾è®¡æ‰€ä¼˜åŒ–çš„åœºæ™¯ã€‚

åˆ›å»ºå·¥ä½œä»»åŠ¡ï¼š

```bash
for lang in Spanish French German; do
    zed kanban create "Translate homepage to $lang" \
        --assignee translator --tenant content-ops
done
for i in 1 2 3 4 5; do
    zed kanban create "Transcribe Q3 customer call #$i" \
        --assignee transcriber --tenant content-ops
done
for sku in 1001 1002 1003 1004; do
    zed kanban create "Generate product description: SKU-$sku" \
        --assignee copywriter --tenant content-ops
done
```

å¯åŠ¨ gateway ç„¶åŽç¦»å¼€â€”â€”å®ƒæ‰˜ç®¡å†…åµŒçš„ dispatcherï¼Œ
åœ¨åŒä¸€ä¸ª kanban.db ä¸Šå¤„ç†ä¸‰ä¸ªä¸“å®¶ profile çš„ä»»åŠ¡ï¼š

```bash
zed gateway start
```

çŽ°åœ¨å°†çœ‹æ¿ç­›é€‰åˆ° `content-ops`ï¼ˆæˆ–ç›´æŽ¥æœç´¢"Transcribe"ï¼‰ï¼Œä½ ä¼šçœ‹åˆ°ï¼š

![Fleet view filtered to transcribe tasks](/img/kanban-tutorial/07-fleet-transcribes.png)

ä¸¤ä¸ªè½¬å½•ä»»åŠ¡å·²å®Œæˆï¼Œä¸€ä¸ªæ­£åœ¨è¿è¡Œï¼Œä¸¤ä¸ªå°±ç»ªç­‰å¾…ä¸‹ä¸€æ¬¡ dispatcher tickã€‚In Progress åˆ—æŒ‰ profile åˆ†ç»„ï¼ˆ"Lanes by profile"é»˜è®¤å¼€å¯ï¼‰ï¼Œè®©ä½ æ— éœ€æ‰«ææ··åˆåˆ—è¡¨å³å¯çœ‹åˆ°æ¯ä¸ª worker çš„å½“å‰ä»»åŠ¡ã€‚dispatcher ä¼šåœ¨å½“å‰ä»»åŠ¡å®ŒæˆåŽç«‹å³å°†ä¸‹ä¸€ä¸ªå°±ç»ªä»»åŠ¡æå‡ä¸ºè¿è¡Œä¸­ã€‚ä¸‰ä¸ªå®ˆæŠ¤è¿›ç¨‹å¹¶è¡Œå¤„ç†ä¸‰ä¸ªè´Ÿè´£äººæ± ï¼Œæ•´ä¸ªå†…å®¹é˜Ÿåˆ—æ— éœ€è¿›ä¸€æ­¥äººå·¥å¹²é¢„å³å¯æ¸…ç©ºã€‚

**åœºæ™¯ä¸€ä¸­å…³äºŽç»“æž„åŒ–äº¤æŽ¥çš„æ‰€æœ‰å†…å®¹åœ¨è¿™é‡ŒåŒæ ·é€‚ç”¨ã€‚** å®Œæˆä¸€æ¬¡é€šè¯çš„ç¿»è¯‘ worker ä¼šå‘å‡º `kanban_complete(summary="translated 4 pages, style matched existing marketing voice", metadata={"duration_seconds": 720, "tokens_used": 2100})`â€”â€”å¯¹åˆ†æžä»¥åŠä¾èµ–æ­¤ä»»åŠ¡çš„ä»»ä½•ä¸‹æ¸¸ä»»åŠ¡éƒ½å¾ˆæœ‰ä»·å€¼ã€‚

## åœºæ™¯ä¸‰ â€” è§’è‰²æµæ°´çº¿ä¸Žé‡è¯•

è¿™æ­£æ˜¯ Kanban ç›¸æ¯”æ™®é€š TODO åˆ—è¡¨çš„ä»·å€¼æ‰€åœ¨ã€‚PM ç¼–å†™è§„æ ¼è¯´æ˜Žï¼Œå·¥ç¨‹å¸ˆå®žçŽ°ï¼Œå®¡æŸ¥è€…æ‹’ç»ç¬¬ä¸€æ¬¡å°è¯•ï¼Œå·¥ç¨‹å¸ˆä¿®æ”¹åŽå†æ¬¡å°è¯•ï¼Œå®¡æŸ¥è€…æ‰¹å‡†ã€‚

dashboard è§†å›¾ï¼ŒæŒ‰ `auth-project` ç­›é€‰ï¼š

![Pipeline view for a multi-role feature](/img/kanban-tutorial/08-pipeline-auth.png)

ä¸‰ä¸ªé˜¶æ®µçš„é“¾æ¡ä¸€ç›®äº†ç„¶ï¼š`Spec: password reset flow`ï¼ˆDONEï¼Œpmï¼‰ã€`Implement password reset flow`ï¼ˆDONEï¼Œbackend-devï¼‰ã€`Review password reset PR`ï¼ˆREADYï¼Œreviewerï¼‰ã€‚æ¯ä¸ªä»»åŠ¡åº•éƒ¨éƒ½æœ‰ç»¿è‰²çš„çˆ¶ä»»åŠ¡ï¼Œä»¥åŠä½œä¸ºä¾èµ–é¡¹çš„å­ä»»åŠ¡ã€‚

æœ€æœ‰è¶£çš„æ˜¯å®žçŽ°ä»»åŠ¡ï¼Œå› ä¸ºå®ƒç»åŽ†äº†é˜»å¡žå’Œé‡è¯•ã€‚ä»¥ä¸‹æ˜¯å®Œæ•´çš„ä¸‰ agent åä½œæµç¨‹ï¼Œä»¥æ¯ä¸ª worker æ¨¡åž‹å‘å‡ºçš„å·¥å…·è°ƒç”¨å½¢å¼å±•ç¤ºï¼š

```python
# --- PM worker åœ¨ $SPEC ä¸Šç”Ÿæˆå¹¶ç¼–å†™éªŒæ”¶æ ‡å‡† ---
# worker tool calls
kanban_show()
kanban_complete(
    summary="spec approved; POST /forgot-password sends email, "
            "GET /reset/:token renders form, POST /reset applies new password",
    metadata={"acceptance": [
        "expired token returns 410",
        "reused last-3 password returns 400 with message",
        "successful reset invalidates all active sessions",
    ]},
)
# â†’ $SPEC å®Œæˆï¼›$IMPL è‡ªåŠ¨ä»Ž todo æå‡ä¸º ready

# --- å·¥ç¨‹å¸ˆ worker åœ¨ $IMPL ä¸Šç”Ÿæˆï¼ˆç¬¬ä¸€æ¬¡å°è¯•ï¼‰---
# worker tool calls
kanban_show()   # åœ¨ worker_context ä¸­è¯»å– $SPEC çš„ summary å’Œ acceptance metadata
# ï¼ˆå·¥ç¨‹å¸ˆç¼–å†™ä»£ç ï¼Œè¿è¡Œæµ‹è¯•ï¼Œå¼€å¯ PRï¼‰
# å®¡æŸ¥è€…åé¦ˆåˆ°æ¥â€”â€”å·¥ç¨‹å¸ˆè®¤ä¸ºé—®é¢˜æœ‰æ•ˆå¹¶é˜»å¡žä»»åŠ¡
kanban_block(
    reason="Review: password strength check missing, reset link isn't "
           "single-use (can be replayed within 30min)",
)
# â†’ $IMPL è½¬æ¢ä¸º blockedï¼›run 1 ä»¥ outcome='blocked' å…³é—­
```

çŽ°åœ¨ä½ ï¼ˆäººç±»ï¼Œæˆ–å•ç‹¬çš„ reviewer profileï¼‰è¯»å–é˜»å¡žåŽŸå› ï¼Œåˆ¤æ–­ä¿®å¤æ–¹å‘æ˜Žç¡®ï¼Œä»Ž dashboard çš„"Unblock"æŒ‰é’®è§£é™¤é˜»å¡žâ€”â€”æˆ–é€šè¿‡ CLI/æ–œæ å‘½ä»¤ï¼š

```bash
zed kanban unblock $IMPL
# æˆ–åœ¨èŠå¤©ä¸­ï¼š/kanban unblock $IMPL
```

dispatcher å°† `$IMPL` æå‡å›ž `ready`ï¼Œå¹¶åœ¨ä¸‹ä¸€æ¬¡ tick æ—¶é‡æ–°ç”Ÿæˆ `backend-dev` workerã€‚è¿™ç¬¬äºŒæ¬¡ç”Ÿæˆæ˜¯åŒä¸€ä»»åŠ¡ä¸Šçš„**æ–° run**ï¼š

```python
# --- å·¥ç¨‹å¸ˆ worker åœ¨ $IMPL ä¸Šç”Ÿæˆï¼ˆç¬¬äºŒæ¬¡å°è¯•ï¼‰---
# worker tool calls
kanban_show()
# â†’ worker_context çŽ°åœ¨åŒ…å« run 1 çš„é˜»å¡žåŽŸå› ï¼Œå› æ­¤è¯¥ worker çŸ¥é“
#   éœ€è¦ä¿®å¤å“ªä¸¤ä¸ªé—®é¢˜ï¼Œè€Œæ— éœ€é‡æ–°é˜…è¯»æ•´ä¸ªè§„æ ¼è¯´æ˜Ž
# ï¼ˆå·¥ç¨‹å¸ˆæ·»åŠ  zxcvbn æ£€æŸ¥ï¼Œä½¿é‡ç½®ä»¤ç‰Œå˜ä¸ºä¸€æ¬¡æ€§ï¼Œé‡æ–°è¿è¡Œæµ‹è¯•ï¼‰
kanban_complete(
    summary="added zxcvbn strength check, reset tokens are now single-use "
            "(stored + deleted on success)",
    metadata={
        "changed_files": [
            "auth/reset.py",
            "auth/tests/test_reset.py",
            "migrations/003_single_use_reset_tokens.sql",
        ],
        "tests_run": 11,
        "review_iteration": 2,
    },
)
```

ç‚¹å‡»å®žçŽ°ä»»åŠ¡ï¼ŒæŠ½å±‰æ˜¾ç¤º**ä¸¤æ¬¡å°è¯•**ï¼š

![Implementation task with two runs â€” blocked then completed](/img/kanban-tutorial/04b-drawer-retry-history-scrolled.png)

- **Run 1** â€” `@backend-dev` æ ‡è®°ä¸º `blocked`ã€‚å®¡æŸ¥åé¦ˆç´§è·Ÿåœ¨ç»“æžœä¸‹æ–¹ï¼š"password strength check missing, reset link isn't single-use (can be replayed within 30min)"ã€‚
- **Run 2** â€” `@backend-dev` æ ‡è®°ä¸º `completed`ã€‚å…¨æ–°çš„ summaryï¼Œå…¨æ–°çš„ metadataã€‚

æ¯ä¸ª run åœ¨ `task_runs` ä¸­éƒ½æ˜¯ç‹¬ç«‹çš„ä¸€è¡Œï¼Œæœ‰è‡ªå·±çš„ outcomeã€summary å’Œ metadataã€‚é‡è¯•åŽ†å²ä¸æ˜¯å åŠ åœ¨"æœ€æ–°çŠ¶æ€"ä»»åŠ¡ä¹‹ä¸Šçš„æ¦‚å¿µæ€§é™„åŠ ç‰©â€”â€”å®ƒæ˜¯ä¸»è¦çš„æ•°æ®è¡¨ç¤ºå½¢å¼ã€‚å½“é‡è¯•çš„ worker æ‰“å¼€ä»»åŠ¡æ—¶ï¼Œ`build_worker_context` ä¼šå‘å…¶å±•ç¤ºä¹‹å‰çš„å°è¯•ï¼Œå› æ­¤ç¬¬äºŒæ¬¡ worker èƒ½çœ‹åˆ°ç¬¬ä¸€æ¬¡è¢«é˜»å¡žçš„åŽŸå› ï¼Œå¹¶é’ˆå¯¹æ€§åœ°è§£å†³é‚£äº›å…·ä½“é—®é¢˜ï¼Œè€Œä¸æ˜¯ä»Žå¤´é‡æ¥ã€‚

å®¡æŸ¥è€…æŽ¥ä¸‹æ¥è®¤é¢†ä»»åŠ¡ã€‚å½“ä»–ä»¬æ‰“å¼€ `Review password reset PR` æ—¶ï¼Œä¼šçœ‹åˆ°ï¼š

![Reviewer's drawer view of the pipeline](/img/kanban-tutorial/09-drawer-pipeline-review.png)

çˆ¶ä»»åŠ¡é“¾æŽ¥æŒ‡å‘å·²å®Œæˆçš„å®žçŽ°ä»»åŠ¡ã€‚å½“å®¡æŸ¥è€…çš„ worker åœ¨ `Review password reset PR` ä¸Šç”Ÿæˆå¹¶è°ƒç”¨ `kanban_show()` æ—¶ï¼Œè¿”å›žçš„ `worker_context` åŒ…å«çˆ¶ä»»åŠ¡æœ€è¿‘ä¸€æ¬¡å·²å®Œæˆ run çš„ summary å’Œ metadataâ€”â€”å› æ­¤å®¡æŸ¥è€…åœ¨æŸ¥çœ‹ diff ä¹‹å‰å°±å·²è¯»åˆ°"added zxcvbn strength check, reset tokens are now single-use"ï¼Œå¹¶æŽŒæ¡äº†å˜æ›´æ–‡ä»¶åˆ—è¡¨ã€‚

## åœºæ™¯å›› â€” ç†”æ–­å™¨ä¸Žå´©æºƒæ¢å¤

çœŸå®žçš„ worker ä¼šå¤±è´¥ã€‚ç¼ºå°‘å‡­è¯ã€OOM ç»ˆæ­¢ã€çž¬æ—¶ç½‘ç»œé”™è¯¯ã€‚dispatcher æœ‰ä¸¤é“é˜²çº¿ï¼š**ç†”æ–­å™¨**ï¼ˆcircuit breakerï¼‰åœ¨è¿žç»­ N æ¬¡å¤±è´¥åŽè‡ªåŠ¨é˜»å¡žä»»åŠ¡ï¼Œé˜²æ­¢çœ‹æ¿æ— é™æŠ–åŠ¨ï¼›**å´©æºƒæ£€æµ‹**ï¼ˆcrash detectionï¼‰åœ¨ worker PID äºŽ TTL åˆ°æœŸå‰æ¶ˆå¤±æ—¶å›žæ”¶ä»»åŠ¡ã€‚

### ç†”æ–­å™¨ â€” æŒç»­æ€§å¤±è´¥

ä¸€ä¸ªå›  profile çŽ¯å¢ƒä¸­æœªè®¾ç½® `AWS_ACCESS_KEY_ID` è€Œæ— æ³•ç”Ÿæˆ worker çš„éƒ¨ç½²ä»»åŠ¡ï¼š

```bash
zed kanban create "Deploy to staging (missing creds)" \
    --assignee deploy-bot --tenant ops \
    --max-retries 3
```

dispatcher å°è¯•ç”Ÿæˆ workerã€‚ç”Ÿæˆå¤±è´¥ï¼ˆ`RuntimeError: AWS_ACCESS_KEY_ID not set`ï¼‰ã€‚dispatcher é‡Šæ”¾è®¤é¢†ï¼Œé€’å¢žå¤±è´¥è®¡æ•°å™¨ï¼Œå¹¶åœ¨ä¸‹ä¸€æ¬¡ tick é‡è¯•ã€‚ç”±äºŽæœ¬ç¤ºä¾‹è®¾ç½®äº† `--max-retries 3`ï¼Œåœ¨ä¸‰æ¬¡è¿žç»­å¤±è´¥åŽç†”æ–­å™¨è§¦å‘ï¼šä»»åŠ¡è¿›å…¥ `blocked` çŠ¶æ€ï¼Œoutcome ä¸º `gave_up`ã€‚å¦‚æžœçœç•¥è¯¥æ ‡å¿—ï¼ŒZed ä½¿ç”¨ `kanban.failure_limit`ï¼ˆé»˜è®¤å€¼ï¼š2ï¼‰ã€‚åœ¨äººå·¥è§£é™¤é˜»å¡žä¹‹å‰ä¸å†é‡è¯•ã€‚

ç‚¹å‡»è¢«é˜»å¡žçš„ä»»åŠ¡ï¼š

![Circuit breaker â€” 2 spawn_failed + 1 gave_up](/img/kanban-tutorial/11-drawer-gave-up.png)

ä¸‰ä¸ª runï¼Œ`error` å­—æ®µå‡ä¸ºç›¸åŒé”™è¯¯ã€‚å‰ä¸¤ä¸ªä¸º `spawn_failed`ï¼ˆå¯é‡è¯•ï¼‰ï¼Œç¬¬ä¸‰ä¸ªä¸º `gave_up`ï¼ˆç»ˆæ­¢ï¼‰ã€‚ä¸Šæ–¹çš„äº‹ä»¶æ—¥å¿—æ˜¾ç¤ºå®Œæ•´åºåˆ—ï¼š`created â†’ claimed â†’ spawn_failed â†’ claimed â†’ spawn_failed â†’ claimed â†’ gave_up`ã€‚

åœ¨ç»ˆç«¯ï¼š

```bash
zed kanban runs t_ef5d
# #   OUTCOME        PROFILE        ELAPSED  STARTED
# 1   spawn_failed   deploy-bot          0s  2026-04-27 19:34
#       ! AWS_ACCESS_KEY_ID not set in deploy-bot env
# 2   spawn_failed   deploy-bot          0s  2026-04-27 19:34
#       ! AWS_ACCESS_KEY_ID not set in deploy-bot env
# 3   gave_up        deploy-bot          0s  2026-04-27 19:34
#       ! AWS_ACCESS_KEY_ID not set in deploy-bot env
```

å¦‚æžœæŽ¥å…¥äº† Telegram/Discord/Slackï¼Œgateway ä¼šåœ¨ `gave_up` äº‹ä»¶æ—¶å‘é€é€šçŸ¥ï¼Œè®©ä½ æ— éœ€ä¸»åŠ¨æ£€æŸ¥çœ‹æ¿å°±èƒ½å¾—çŸ¥æ•…éšœã€‚

### å´©æºƒæ¢å¤ â€” worker åœ¨è¿è¡Œä¸­é€”æ­»äº¡

æœ‰æ—¶ç”ŸæˆæˆåŠŸï¼Œä½† worker è¿›ç¨‹åœ¨ä¹‹åŽæ­»äº¡â€”â€”æ®µé”™è¯¯ã€OOMã€`systemctl stop`ã€‚dispatcher è½®è¯¢ `kill(pid, 0)` æ£€æµ‹åˆ°æ­»äº¡çš„ pidï¼›è®¤é¢†é‡Šæ”¾ï¼Œä»»åŠ¡å›žåˆ° `ready`ï¼Œä¸‹ä¸€æ¬¡ tick å°†å…¶åˆ†é…ç»™æ–°çš„ workerã€‚

ç§å­æ•°æ®ä¸­çš„ç¤ºä¾‹æ˜¯ä¸€ä¸ªå› å†…å­˜ä¸è¶³è€Œè¿è¡Œå¤±è´¥çš„è¿ç§»ä»»åŠ¡ï¼š

```bash
# Worker è®¤é¢†ï¼Œå¼€å§‹æ‰«æ 240 ä¸‡è¡Œï¼Œåœ¨çº¦ 230 ä¸‡è¡Œæ—¶è¢« OOM ç»ˆæ­¢
# Dispatcher æ£€æµ‹åˆ°æ­»äº¡çš„ pidï¼Œé‡Šæ”¾è®¤é¢†ï¼Œé€’å¢žå°è¯•è®¡æ•°å™¨
# ä½¿ç”¨åˆ†å—ç­–ç•¥é‡è¯•æˆåŠŸ
```

æŠ½å±‰æ˜¾ç¤ºå®Œæ•´çš„ä¸¤æ¬¡å°è¯•åŽ†å²ï¼š

![Crash and recovery â€” 1 crashed + 1 completed](/img/kanban-tutorial/06-drawer-crash-recovery.png)

Run 1 â€” `crashed`ï¼Œé”™è¯¯ä¸º `OOM kill at row 2.3M (process 99999 gone)`ã€‚Run 2 â€” `completed`ï¼Œmetadata ä¸­åŒ…å« `"strategy": "chunked with LIMIT + WHERE id > last_id"`ã€‚é‡è¯•çš„ worker åœ¨å…¶ä¸Šä¸‹æ–‡ä¸­çœ‹åˆ°äº† run 1 çš„å´©æºƒä¿¡æ¯ï¼Œå¹¶é€‰æ‹©äº†æ›´å®‰å…¨çš„ç­–ç•¥ï¼›metadata è®©æœªæ¥çš„è§‚å¯Ÿè€…ï¼ˆæˆ–äº‹åŽåˆ†æžæ’°å†™è€…ï¼‰èƒ½æ¸…æ¥šåœ°çœ‹åˆ°å‘ç”Ÿäº†ä»€ä¹ˆå˜åŒ–ã€‚

## ç»“æž„åŒ–äº¤æŽ¥ â€” `summary` å’Œ `metadata` çš„é‡è¦æ€§

åœ¨ä¸Šè¿°æ¯ä¸ªåœºæ™¯ä¸­ï¼Œworker åœ¨ç»“æŸæ—¶éƒ½è°ƒç”¨äº† `kanban_complete(summary=..., metadata=...)`ã€‚è¿™ä¸æ˜¯è£…é¥°æ€§çš„â€”â€”å®ƒæ˜¯å·¥ä½œæµå„é˜¶æ®µä¹‹é—´çš„ä¸»è¦äº¤æŽ¥é€šé“ã€‚

å½“ä»»åŠ¡ B ä¸Šçš„ worker è¢«ç”Ÿæˆå¹¶è°ƒç”¨ `kanban_show()` æ—¶ï¼Œè¿”å›žçš„ `worker_context` åŒ…å«ï¼š

- B çš„**å…ˆå‰å°è¯•**ï¼ˆä¹‹å‰çš„ runï¼šoutcomeã€summaryã€errorã€metadataï¼‰ï¼Œè®©é‡è¯•çš„ worker ä¸ä¼šé‡è¹ˆå¤±è´¥çš„è·¯å¾„ã€‚
- **çˆ¶ä»»åŠ¡ç»“æžœ** â€” å¯¹äºŽæ¯ä¸ªçˆ¶ä»»åŠ¡ï¼Œæœ€è¿‘ä¸€æ¬¡å·²å®Œæˆ run çš„ summary å’Œ metadataâ€”â€”è®©ä¸‹æ¸¸ worker èƒ½çœ‹åˆ°ä¸Šæ¸¸å·¥ä½œçš„åŽŸå› å’Œæ–¹å¼ã€‚

è¿™å–ä»£äº†å¹³é¢ kanban ç³»ç»Ÿä¸­"ç¿»æŸ¥è¯„è®ºå’Œå·¥ä½œè¾“å‡º"çš„ç¹çæµç¨‹ã€‚PM åœ¨è§„æ ¼è¯´æ˜Žçš„ metadata ä¸­ç¼–å†™éªŒæ”¶æ ‡å‡†ï¼Œå·¥ç¨‹å¸ˆçš„ worker åœ¨çˆ¶ä»»åŠ¡äº¤æŽ¥ä¸­ä»¥ç»“æž„åŒ–å½¢å¼çœ‹åˆ°å®ƒä»¬ã€‚å·¥ç¨‹å¸ˆè®°å½•è¿è¡Œäº†å“ªäº›æµ‹è¯•ä»¥åŠé€šè¿‡äº†å¤šå°‘ï¼Œå®¡æŸ¥è€…çš„ worker åœ¨æ‰“å¼€ diff ä¹‹å‰å°±å·²æŽŒæ¡è¯¥åˆ—è¡¨ã€‚

æ‰¹é‡å…³é—­ä¿æŠ¤çš„å­˜åœ¨æ­£æ˜¯å› ä¸ºè¿™äº›æ•°æ®æ˜¯æŒ‰ run å­˜å‚¨çš„ã€‚`zed kanban complete a b c --summary X`ï¼ˆä½ ï¼Œä»Ž CLI æ‰§è¡Œï¼‰ä¼šè¢«æ‹’ç»â€”â€”å°†ç›¸åŒçš„ summary å¤åˆ¶ç²˜è´´åˆ°ä¸‰ä¸ªä»»åŠ¡å‡ ä¹Žæ€»æ˜¯é”™è¯¯çš„ã€‚ä¸å¸¦äº¤æŽ¥æ ‡å¿—çš„æ‰¹é‡å…³é—­ä»ç„¶é€‚ç”¨äºŽå¸¸è§çš„"æˆ‘å®Œæˆäº†ä¸€å †è¡Œæ”¿ä»»åŠ¡"åœºæ™¯ã€‚å·¥å…·ç•Œé¢æ ¹æœ¬ä¸æä¾›æ‰¹é‡å˜ä½“ï¼›`kanban_complete` å§‹ç»ˆæ˜¯å•ä»»åŠ¡æ“ä½œï¼ŒåŽŸå› ç›¸åŒã€‚

## æ£€æŸ¥å½“å‰æ­£åœ¨è¿è¡Œçš„ä»»åŠ¡

ä½œä¸ºè¡¥å……â€”â€”ä»¥ä¸‹æ˜¯ä¸€ä¸ªä»åœ¨æ‰§è¡Œä¸­çš„ä»»åŠ¡çš„æŠ½å±‰è§†å›¾ï¼ˆåœºæ™¯ä¸€ä¸­çš„ API å®žçŽ°ï¼Œå·²è¢« `backend-dev` è®¤é¢†ä½†å°šæœªå®Œæˆï¼‰ï¼š

![Claimed, in-flight task](/img/kanban-tutorial/10-drawer-in-flight.png)

çŠ¶æ€ä¸º `Running`ã€‚æ´»è·ƒçš„ run å‡ºçŽ°åœ¨ Run History éƒ¨åˆ†ï¼Œoutcome ä¸º `active`ï¼Œæ²¡æœ‰ `ended_at`ã€‚å¦‚æžœè¯¥ worker æ­»äº¡æˆ–è¶…æ—¶ï¼Œdispatcher ä¼šä»¥ç›¸åº”çš„ outcome å…³é—­æ­¤ runï¼Œå¹¶åœ¨ä¸‹ä¸€æ¬¡è®¤é¢†æ—¶å¼€å¯æ–°çš„ runâ€”â€”å°è¯•è®°å½•æ°¸è¿œä¸ä¼šæ¶ˆå¤±ã€‚

## åŽç»­æ­¥éª¤

- [Kanban æ¦‚è¿°](./kanban) â€” å®Œæ•´çš„æ•°æ®æ¨¡åž‹ã€äº‹ä»¶è¯æ±‡è¡¨å’Œ CLI å‚è€ƒã€‚
- `zed kanban --help` â€” æ‰€æœ‰å­å‘½ä»¤ï¼Œæ‰€æœ‰æ ‡å¿—ã€‚
- `zed kanban watch --kinds completed,gave_up,timed_out` â€” åœ¨æ•´ä¸ªçœ‹æ¿ä¸Šå®žæ—¶æµå¼è¾“å‡ºç»ˆç«¯äº‹ä»¶ã€‚
- `zed kanban notify-subscribe <task> --platform telegram --chat-id <id>` â€” å½“ç‰¹å®šä»»åŠ¡å®Œæˆæ—¶é€šè¿‡ gateway æŽ¥æ”¶æŽ¨é€é€šçŸ¥ã€‚
