# ä¼šè¯å­˜å‚¨

Zed Agent ä½¿ç”¨ SQLite æ•°æ®åº“ï¼ˆ`~/.zed/state.db`ï¼‰è·¨ CLI å’Œ gateway ä¼šè¯æŒä¹…åŒ–ä¼šè¯å…ƒæ•°æ®ã€å®Œæ•´æ¶ˆæ¯åŽ†å²åŠæ¨¡åž‹é…ç½®ã€‚è¿™æ›¿ä»£äº†æ—©æœŸçš„é€ä¼šè¯ JSONL æ–‡ä»¶æ–¹æ¡ˆã€‚

æºæ–‡ä»¶ï¼š`zed_state.py`


## æž¶æž„æ¦‚è§ˆ

```
~/.zed/state.db (SQLite, WAL mode)
â”œâ”€â”€ sessions              â€” ä¼šè¯å…ƒæ•°æ®ã€token è®¡æ•°ã€è®¡è´¹ä¿¡æ¯
â”œâ”€â”€ messages              â€” æ¯ä¸ªä¼šè¯çš„å®Œæ•´æ¶ˆæ¯åŽ†å²
â”œâ”€â”€ messages_fts          â€” FTS5 è™šæ‹Ÿè¡¨ï¼ˆcontent + tool_name + tool_callsï¼‰
â”œâ”€â”€ messages_fts_trigram  â€” ä½¿ç”¨ trigram tokenizer çš„ FTS5 è™šæ‹Ÿè¡¨ï¼ˆCJK / å­ä¸²æœç´¢ï¼‰
â”œâ”€â”€ state_meta            â€” é”®å€¼å…ƒæ•°æ®è¡¨
â””â”€â”€ schema_version        â€” å•è¡Œè¡¨ï¼Œè·Ÿè¸ªè¿ç§»çŠ¶æ€
```

å…³é”®è®¾è®¡å†³ç­–ï¼š
- **WAL æ¨¡å¼**ï¼šæ”¯æŒå¹¶å‘è¯»å– + å•å†™å…¥ï¼ˆgateway å¤šå¹³å°ï¼‰
- **FTS5 è™šæ‹Ÿè¡¨**ï¼šè·¨æ‰€æœ‰ä¼šè¯æ¶ˆæ¯çš„å¿«é€Ÿå…¨æ–‡æœç´¢
- **ä¼šè¯è¡€ç¼˜**ï¼šé€šè¿‡ `parent_session_id` é“¾å®žçŽ°ï¼ˆåŽ‹ç¼©è§¦å‘çš„ä¼šè¯åˆ†å‰²ï¼‰
- **æ¥æºæ ‡è®°**ï¼ˆ`cli`ã€`telegram`ã€`discord` ç­‰ï¼‰ï¼šç”¨äºŽå¹³å°è¿‡æ»¤
- æ‰¹é‡è¿è¡Œå™¨å’Œ RL è½¨è¿¹ä¸å­˜å‚¨äºŽæ­¤ï¼ˆç‹¬ç«‹ç³»ç»Ÿï¼‰


## SQLite Schema

### Sessions è¡¨

```sql
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    user_id TEXT,
    model TEXT,
    model_config TEXT,
    system_prompt TEXT,
    parent_session_id TEXT,
    started_at REAL NOT NULL,
    ended_at REAL,
    end_reason TEXT,
    message_count INTEGER DEFAULT 0,
    tool_call_count INTEGER DEFAULT 0,
    input_tokens INTEGER DEFAULT 0,
    output_tokens INTEGER DEFAULT 0,
    cache_read_tokens INTEGER DEFAULT 0,
    cache_write_tokens INTEGER DEFAULT 0,
    reasoning_tokens INTEGER DEFAULT 0,
    billing_provider TEXT,
    billing_base_url TEXT,
    billing_mode TEXT,
    estimated_cost_usd REAL,
    actual_cost_usd REAL,
    cost_status TEXT,
    cost_source TEXT,
    pricing_version TEXT,
    title TEXT,
    api_call_count INTEGER DEFAULT 0,
    FOREIGN KEY (parent_session_id) REFERENCES sessions(id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_source ON sessions(source);
CREATE INDEX IF NOT EXISTS idx_sessions_parent ON sessions(parent_session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(started_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_title_unique
    ON sessions(title) WHERE title IS NOT NULL;
```

### Messages è¡¨

```sql
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    role TEXT NOT NULL,
    content TEXT,
    tool_call_id TEXT,
    tool_calls TEXT,
    tool_name TEXT,
    timestamp REAL NOT NULL,
    token_count INTEGER,
    finish_reason TEXT,
    reasoning TEXT,
    reasoning_content TEXT,
    reasoning_details TEXT,
    codex_reasoning_items TEXT,
    codex_message_items TEXT
);

CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, timestamp);
```

è¯´æ˜Žï¼š
- `tool_calls` ä»¥ JSON å­—ç¬¦ä¸²å­˜å‚¨ï¼ˆåºåˆ—åŒ–çš„ tool call å¯¹è±¡åˆ—è¡¨ï¼‰
- `reasoning_details`ã€`codex_reasoning_items` å’Œ `codex_message_items` ä»¥ JSON å­—ç¬¦ä¸²å­˜å‚¨
- `reasoning` å­˜å‚¨æä¾›å•†æš´éœ²çš„åŽŸå§‹æŽ¨ç†æ–‡æœ¬
- æ—¶é—´æˆ³ä¸º Unix epoch æµ®ç‚¹æ•°ï¼ˆ`time.time()`ï¼‰

### FTS5 å…¨æ–‡æœç´¢

```sql
CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts USING fts5(
    content,
    content=messages,
    content_rowid=id
);
```

FTS5 è¡¨é€šè¿‡ä¸‰ä¸ªè§¦å‘å™¨ä¸Ž `messages` è¡¨ä¿æŒåŒæ­¥ï¼Œåˆ†åˆ«åœ¨ INSERTã€UPDATE å’Œ DELETE æ—¶è§¦å‘ï¼š

```sql
CREATE TRIGGER IF NOT EXISTS messages_fts_insert AFTER INSERT ON messages BEGIN
    INSERT INTO messages_fts(rowid, content) VALUES (new.id, new.content);
END;

CREATE TRIGGER IF NOT EXISTS messages_fts_delete AFTER DELETE ON messages BEGIN
    INSERT INTO messages_fts(messages_fts, rowid, content)
        VALUES('delete', old.id, old.content);
END;

CREATE TRIGGER IF NOT EXISTS messages_fts_update AFTER UPDATE ON messages BEGIN
    INSERT INTO messages_fts(messages_fts, rowid, content)
        VALUES('delete', old.id, old.content);
    INSERT INTO messages_fts(rowid, content) VALUES (new.id, new.content);
END;
```


## Schema ç‰ˆæœ¬ä¸Žè¿ç§»

å½“å‰ schema ç‰ˆæœ¬ï¼š**11**

`schema_version` è¡¨å­˜å‚¨å•ä¸ªæ•´æ•°ã€‚ç®€å•çš„åˆ—æ·»åŠ ç”± `_reconcile_columns()` å£°æ˜Žå¼å¤„ç†ï¼ˆå¯¹æ¯”å®žæ—¶åˆ—ä¸Ž `SCHEMA_SQL` å¹¶ ADD ç¼ºå¤±åˆ—ï¼‰ã€‚ç‰ˆæœ¬é—¨æŽ§é“¾ä¿ç•™ç”¨äºŽæ— æ³•å£°æ˜Žå¼è¡¨è¾¾çš„æ•°æ®è¿ç§»åŠç´¢å¼•/FTS å˜æ›´ï¼š

| ç‰ˆæœ¬ | å˜æ›´ |
|------|------|
| 1 | åˆå§‹ schemaï¼ˆsessionsã€messagesã€FTS5ï¼‰ |
| 2 | å‘ messages æ·»åŠ  `finish_reason` åˆ— |
| 3 | å‘ sessions æ·»åŠ  `title` åˆ— |
| 4 | åœ¨ `title` ä¸Šæ·»åŠ å”¯ä¸€ç´¢å¼•ï¼ˆå…è®¸ NULLï¼Œéž NULL å¿…é¡»å”¯ä¸€ï¼‰ |
| 5 | æ·»åŠ è®¡è´¹åˆ—ï¼š`cache_read_tokens`ã€`cache_write_tokens`ã€`reasoning_tokens`ã€`billing_provider`ã€`billing_base_url`ã€`billing_mode`ã€`estimated_cost_usd`ã€`actual_cost_usd`ã€`cost_status`ã€`cost_source`ã€`pricing_version` |
| 6 | å‘ messages æ·»åŠ æŽ¨ç†åˆ—ï¼š`reasoning`ã€`reasoning_details`ã€`codex_reasoning_items` |
| 7 | å‘ messages æ·»åŠ  `reasoning_content` åˆ— |
| 8 | å‘ sessions æ·»åŠ  `api_call_count` åˆ— |
| 9 | å‘ messages æ·»åŠ  `codex_message_items` åˆ—ï¼Œç”¨äºŽ Codex Responses æ¶ˆæ¯ id/phase é‡æ”¾ |
| 10 | æ·»åŠ  `messages_fts_trigram` è™šæ‹Ÿè¡¨ï¼ˆtrigram tokenizerï¼Œç”¨äºŽ CJK / å­ä¸²æœç´¢ï¼‰å¹¶å›žå¡«çŽ°æœ‰è¡Œ |
| 11 | é‡æ–°ç´¢å¼• `messages_fts` å’Œ `messages_fts_trigram` ä»¥è¦†ç›– `tool_name` + `tool_calls`ï¼Œä»Žå¤–éƒ¨å†…å®¹æ¨¡å¼åˆ‡æ¢ä¸ºå†…è”æ¨¡å¼ï¼›åˆ é™¤æ—§è§¦å‘å™¨å¹¶å›žå¡«æ‰€æœ‰æ¶ˆæ¯è¡Œ |

å£°æ˜Žå¼åˆ—æ·»åŠ ä½¿ç”¨ `ALTER TABLE ADD COLUMN`ï¼ŒåŒ…è£¹åœ¨ try/except ä¸­ä»¥å¤„ç†åˆ—å·²å­˜åœ¨çš„æƒ…å†µï¼ˆå¹‚ç­‰ï¼‰ã€‚æ¯ä¸ªæˆåŠŸçš„è¿ç§»å—å®ŒæˆåŽç‰ˆæœ¬å·é€’å¢žã€‚


## å†™å…¥ç«žäº‰å¤„ç†

å¤šä¸ª zed è¿›ç¨‹ï¼ˆgateway + CLI ä¼šè¯ + worktree agentï¼‰å…±äº«åŒä¸€ä¸ª `state.db`ã€‚`SessionDB` ç±»é€šè¿‡ä»¥ä¸‹æ–¹å¼å¤„ç†å†™å…¥ç«žäº‰ï¼š

- **çŸ­ SQLite è¶…æ—¶**ï¼ˆ1 ç§’ï¼‰ï¼Œè€Œéžé»˜è®¤çš„ 30 ç§’
- **åº”ç”¨å±‚é‡è¯•**ï¼Œå¸¦éšæœºæŠ–åŠ¨ï¼ˆ20â€“150msï¼Œæœ€å¤š 15 æ¬¡é‡è¯•ï¼‰
- **BEGIN IMMEDIATE** äº‹åŠ¡ï¼Œåœ¨äº‹åŠ¡å¼€å§‹æ—¶æš´éœ²é”ç«žäº‰
- **å®šæœŸ WAL checkpoint**ï¼Œæ¯ 50 æ¬¡æˆåŠŸå†™å…¥æ‰§è¡Œä¸€æ¬¡ï¼ˆPASSIVE æ¨¡å¼ï¼‰

è¿™é¿å…äº†"æŠ¤å«æ•ˆåº”"â€”â€”SQLite ç¡®å®šæ€§å†…éƒ¨é€€é¿ä¼šå¯¼è‡´æ‰€æœ‰ç«žäº‰å†™å…¥è€…åœ¨ç›¸åŒé—´éš”é‡è¯•ã€‚

```
_WRITE_MAX_RETRIES = 15
_WRITE_RETRY_MIN_S = 0.020   # 20ms
_WRITE_RETRY_MAX_S = 0.150   # 150ms
_CHECKPOINT_EVERY_N_WRITES = 50
```


## å¸¸ç”¨æ“ä½œ

### åˆå§‹åŒ–

```python
from zed_state import SessionDB

db = SessionDB()                           # é»˜è®¤ï¼š~/.zed/state.db
db = SessionDB(db_path=Path("/tmp/test.db"))  # è‡ªå®šä¹‰è·¯å¾„
```

### åˆ›å»ºå’Œç®¡ç†ä¼šè¯

```python
# åˆ›å»ºæ–°ä¼šè¯
db.create_session(
    session_id="sess_abc123",
    source="cli",
    model="anthropic/claude-sonnet-4.6",
    user_id="user_1",
    parent_session_id=None,  # æˆ–ç”¨äºŽè¡€ç¼˜è¿½è¸ªçš„ä¸Šä¸€ä¸ªä¼šè¯ ID
)

# ç»“æŸä¼šè¯
db.end_session("sess_abc123", end_reason="user_exit")

# é‡æ–°æ‰“å¼€ä¼šè¯ï¼ˆæ¸…é™¤ ended_at/end_reasonï¼‰
db.reopen_session("sess_abc123")
```

### å­˜å‚¨æ¶ˆæ¯

```python
msg_id = db.append_message(
    session_id="sess_abc123",
    role="assistant",
    content="Here's the answer...",
    tool_calls=[{"id": "call_1", "function": {"name": "terminal", "arguments": "{}"}}],
    token_count=150,
    finish_reason="stop",
    reasoning="Let me think about this...",
)
```

### æ£€ç´¢æ¶ˆæ¯

```python
# åŒ…å«æ‰€æœ‰å…ƒæ•°æ®çš„åŽŸå§‹æ¶ˆæ¯
messages = db.get_messages("sess_abc123")

# OpenAI å¯¹è¯æ ¼å¼ï¼ˆç”¨äºŽ API é‡æ”¾ï¼‰
conversation = db.get_messages_as_conversation("sess_abc123")
# è¿”å›žï¼š[{"role": "user", "content": "..."}, {"role": "assistant", ...}]
```

### ä¼šè¯æ ‡é¢˜

```python
# è®¾ç½®æ ‡é¢˜ï¼ˆéž NULL æ ‡é¢˜ä¸­å¿…é¡»å”¯ä¸€ï¼‰
db.set_session_title("sess_abc123", "Fix Docker Build")

# æŒ‰æ ‡é¢˜è§£æžï¼ˆè¿”å›žè¡€ç¼˜ä¸­æœ€æ–°çš„ï¼‰
session_id = db.resolve_session_by_title("Fix Docker Build")

# è‡ªåŠ¨ç”Ÿæˆè¡€ç¼˜ä¸­çš„ä¸‹ä¸€ä¸ªæ ‡é¢˜
next_title = db.get_next_title_in_lineage("Fix Docker Build")
# è¿”å›žï¼š"Fix Docker Build #2"
```


## å…¨æ–‡æœç´¢

`search_messages()` æ–¹æ³•æ”¯æŒ FTS5 æŸ¥è¯¢è¯­æ³•ï¼Œå¹¶è‡ªåŠ¨å¯¹ç”¨æˆ·è¾“å…¥è¿›è¡Œæ¸…ç†ã€‚

### åŸºæœ¬æœç´¢

```python
results = db.search_messages("docker deployment")
```

### FTS5 æŸ¥è¯¢è¯­æ³•

| è¯­æ³• | ç¤ºä¾‹ | å«ä¹‰ |
|------|------|------|
| å…³é”®è¯ | `docker deployment` | ä¸¤ä¸ªè¯å‡åŒ…å«ï¼ˆéšå¼ ANDï¼‰ |
| å¼•å·çŸ­è¯­ | `"exact phrase"` | ç²¾ç¡®çŸ­è¯­åŒ¹é… |
| å¸ƒå°” OR | `docker OR kubernetes` | ä»»ä¸€è¯ |
| å¸ƒå°” NOT | `python NOT java` | æŽ’é™¤è¯ |
| å‰ç¼€ | `deploy*` | å‰ç¼€åŒ¹é… |

### è¿‡æ»¤æœç´¢

```python
# ä»…æœç´¢ CLI ä¼šè¯
results = db.search_messages("error", source_filter=["cli"])

# æŽ’é™¤ gateway ä¼šè¯
results = db.search_messages("bug", exclude_sources=["telegram", "discord"])

# ä»…æœç´¢ç”¨æˆ·æ¶ˆæ¯
results = db.search_messages("help", role_filter=["user"])
```

### æœç´¢ç»“æžœæ ¼å¼

æ¯æ¡ç»“æžœåŒ…å«ï¼š
- `id`ã€`session_id`ã€`role`ã€`timestamp`
- `snippet` â€” FTS5 ç”Ÿæˆçš„ç‰‡æ®µï¼Œå¸¦ `>>>match<<<` æ ‡è®°
- `context` â€” åŒ¹é…å‰åŽå„ 1 æ¡æ¶ˆæ¯ï¼ˆå†…å®¹æˆªæ–­è‡³ 200 å­—ç¬¦ï¼‰
- `source`ã€`model`ã€`session_started` â€” æ¥è‡ªçˆ¶ä¼šè¯

`_sanitize_fts5_query()` æ–¹æ³•å¤„ç†è¾¹ç¼˜æƒ…å†µï¼š
- åŽ»é™¤ä¸åŒ¹é…çš„å¼•å·å’Œç‰¹æ®Šå­—ç¬¦
- å°†å«è¿žå­—ç¬¦çš„è¯åŒ…è£¹åœ¨å¼•å·ä¸­ï¼ˆ`chat-send` â†’ `"chat-send"`ï¼‰
- ç§»é™¤æ‚¬ç©ºçš„å¸ƒå°”è¿ç®—ç¬¦ï¼ˆ`hello AND` â†’ `hello`ï¼‰


## ä¼šè¯è¡€ç¼˜

ä¼šè¯å¯é€šè¿‡ `parent_session_id` å½¢æˆé“¾ã€‚è¿™å‘ç”Ÿåœ¨ gateway ä¸­ä¸Šä¸‹æ–‡åŽ‹ç¼©è§¦å‘ä¼šè¯åˆ†å‰²æ—¶ã€‚

### æŸ¥è¯¢ï¼šæŸ¥æ‰¾ä¼šè¯è¡€ç¼˜

```sql
-- æŸ¥æ‰¾ä¼šè¯çš„æ‰€æœ‰ç¥–å…ˆ
WITH RECURSIVE lineage AS (
    SELECT * FROM sessions WHERE id = ?
    UNION ALL
    SELECT s.* FROM sessions s
    JOIN lineage l ON s.id = l.parent_session_id
)
SELECT id, title, started_at, parent_session_id FROM lineage;

-- æŸ¥æ‰¾ä¼šè¯çš„æ‰€æœ‰åŽä»£
WITH RECURSIVE descendants AS (
    SELECT * FROM sessions WHERE id = ?
    UNION ALL
    SELECT s.* FROM sessions s
    JOIN descendants d ON s.parent_session_id = d.id
)
SELECT id, title, started_at FROM descendants;
```

### æŸ¥è¯¢ï¼šå¸¦é¢„è§ˆçš„æœ€è¿‘ä¼šè¯

```sql
SELECT s.*,
    COALESCE(
        (SELECT SUBSTR(m.content, 1, 63)
         FROM messages m
         WHERE m.session_id = s.id AND m.role = 'user' AND m.content IS NOT NULL
         ORDER BY m.timestamp, m.id LIMIT 1),
        ''
    ) AS preview,
    COALESCE(
        (SELECT MAX(m2.timestamp) FROM messages m2 WHERE m2.session_id = s.id),
        s.started_at
    ) AS last_active
FROM sessions s
ORDER BY s.started_at DESC
LIMIT 20;
```

### æŸ¥è¯¢ï¼šToken ä½¿ç”¨ç»Ÿè®¡

```sql
-- æŒ‰æ¨¡åž‹ç»Ÿè®¡æ€» token æ•°
SELECT model,
       COUNT(*) as session_count,
       SUM(input_tokens) as total_input,
       SUM(output_tokens) as total_output,
       SUM(estimated_cost_usd) as total_cost
FROM sessions
WHERE model IS NOT NULL
GROUP BY model
ORDER BY total_cost DESC;

-- token ä½¿ç”¨é‡æœ€é«˜çš„ä¼šè¯
SELECT id, title, model, input_tokens + output_tokens AS total_tokens,
       estimated_cost_usd
FROM sessions
ORDER BY total_tokens DESC
LIMIT 10;
```


## å¯¼å‡ºä¸Žæ¸…ç†

```python
# å¯¼å‡ºå•ä¸ªä¼šè¯åŠå…¶æ¶ˆæ¯
data = db.export_session("sess_abc123")

# å¯¼å‡ºæ‰€æœ‰ä¼šè¯ï¼ˆå«æ¶ˆæ¯ï¼‰ä¸ºå­—å…¸åˆ—è¡¨
all_data = db.export_all(source="cli")

# åˆ é™¤æ—§ä¼šè¯ï¼ˆä»…åˆ é™¤å·²ç»“æŸçš„ä¼šè¯ï¼‰
deleted_count = db.prune_sessions(older_than_days=90)
deleted_count = db.prune_sessions(older_than_days=30, source="telegram")

# æ¸…é™¤æ¶ˆæ¯ä½†ä¿ç•™ä¼šè¯è®°å½•
db.clear_messages("sess_abc123")

# åˆ é™¤ä¼šè¯åŠæ‰€æœ‰æ¶ˆæ¯
db.delete_session("sess_abc123")
```


## æ•°æ®åº“ä½ç½®

é»˜è®¤è·¯å¾„ï¼š`~/.zed/state.db`

è¯¥è·¯å¾„ç”± `zed_constants.get_zed_home()` æŽ¨å¯¼ï¼Œé»˜è®¤è§£æžä¸º `~/.zed/`ï¼Œæˆ– `ZED_HOME` çŽ¯å¢ƒå˜é‡çš„å€¼ã€‚

æ•°æ®åº“æ–‡ä»¶ã€WAL æ–‡ä»¶ï¼ˆ`state.db-wal`ï¼‰å’Œå…±äº«å†…å­˜æ–‡ä»¶ï¼ˆ`state.db-shm`ï¼‰å‡åˆ›å»ºäºŽåŒä¸€ç›®å½•ã€‚
