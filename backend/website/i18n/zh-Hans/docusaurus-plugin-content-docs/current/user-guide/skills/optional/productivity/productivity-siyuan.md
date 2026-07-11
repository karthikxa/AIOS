---
title: "Siyuan"
sidebar_label: "Siyuan"
description: "é€šè¿‡ curl è°ƒç”¨ SiYuan Note APIï¼Œåœ¨è‡ªæ‰˜ç®¡çŸ¥è¯†åº“ä¸­æœç´¢ã€è¯»å–ã€åˆ›å»ºå’Œç®¡ç†å—ä¸Žæ–‡æ¡£"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Siyuan

é€šè¿‡ curl è°ƒç”¨ SiYuan Note APIï¼Œåœ¨è‡ªæ‰˜ç®¡çŸ¥è¯†åº“ä¸­æœç´¢ã€è¯»å–ã€åˆ›å»ºå’Œç®¡ç†å—ä¸Žæ–‡æ¡£ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/productivity/siyuan` å®‰è£… |
| è·¯å¾„ | `optional-skills/productivity/siyuan` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | FEUAZUR |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `SiYuan`, `Notes`, `Knowledge Base`, `PKM`, `API` |
| ç›¸å…³ skill | [`obsidian`](/user-guide/skills/bundled/note-taking/note-taking-obsidian), [`notion`](/user-guide/skills/bundled/productivity/productivity-notion) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# SiYuan Note API

é€šè¿‡ curl è°ƒç”¨ [SiYuan](https://github.com/siyuan-note/siyuan) å†…æ ¸ APIï¼Œåœ¨è‡ªæ‰˜ç®¡çŸ¥è¯†åº“ä¸­æœç´¢ã€è¯»å–ã€åˆ›å»ºã€æ›´æ–°å’Œåˆ é™¤å—ä¸Žæ–‡æ¡£ã€‚æ— éœ€é¢å¤–å·¥å…· â€” åªéœ€ curl å’Œ API tokenã€‚

## å‰ææ¡ä»¶

1. å®‰è£…å¹¶è¿è¡Œ SiYuanï¼ˆæ¡Œé¢ç‰ˆæˆ– Dockerï¼‰
2. èŽ·å– API tokenï¼š**è®¾ç½® > å…³äºŽ > API token**
3. å°†å…¶å­˜å‚¨åœ¨ `~/.zed/.env` ä¸­ï¼š
   ```
   SIYUAN_TOKEN=your_token_here
   SIYUAN_URL=http://127.0.0.1:6806
   ```
   è‹¥æœªè®¾ç½®ï¼Œ`SIYUAN_URL` é»˜è®¤ä¸º `http://127.0.0.1:6806`ã€‚

## API åŸºç¡€

æ‰€æœ‰ SiYuan API è°ƒç”¨å‡ä¸º **POST è¯·æ±‚ï¼Œæºå¸¦ JSON è¯·æ±‚ä½“**ã€‚æ¯ä¸ªè¯·æ±‚éµå¾ªä»¥ä¸‹æ¨¡å¼ï¼š

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/..." \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"param": "value"}'
```

å“åº”ä¸º JSONï¼Œç»“æž„å¦‚ä¸‹ï¼š
```json
{"code": 0, "msg": "", "data": { ... }}
```
`code: 0` è¡¨ç¤ºæˆåŠŸã€‚å…¶ä»–å€¼å‡ä¸ºé”™è¯¯ â€” è¯·æ£€æŸ¥ `msg` èŽ·å–è¯¦æƒ…ã€‚

**ID æ ¼å¼ï¼š** SiYuan ID å½¢å¦‚ `20210808180117-6v0mkxr`ï¼ˆ14 ä½æ—¶é—´æˆ³ + 7 ä½å­—æ¯æ•°å­—å­—ç¬¦ï¼‰ã€‚

## å¿«é€Ÿå‚è€ƒ

| æ“ä½œ | ç«¯ç‚¹ |
|-----------|----------|
| å…¨æ–‡æœç´¢ | `/api/search/fullTextSearchBlock` |
| SQL æŸ¥è¯¢ | `/api/query/sql` |
| è¯»å–å— | `/api/block/getBlockKramdown` |
| è¯»å–å­å— | `/api/block/getChildBlocks` |
| èŽ·å–è·¯å¾„ | `/api/filetree/getHPathByID` |
| èŽ·å–å±žæ€§ | `/api/attr/getBlockAttrs` |
| åˆ—å‡ºç¬”è®°æœ¬ | `/api/notebook/lsNotebooks` |
| åˆ—å‡ºæ–‡æ¡£ | `/api/filetree/listDocsByPath` |
| åˆ›å»ºç¬”è®°æœ¬ | `/api/notebook/createNotebook` |
| åˆ›å»ºæ–‡æ¡£ | `/api/filetree/createDocWithMd` |
| è¿½åŠ å— | `/api/block/appendBlock` |
| æ›´æ–°å— | `/api/block/updateBlock` |
| é‡å‘½åæ–‡æ¡£ | `/api/filetree/renameDocByID` |
| è®¾ç½®å±žæ€§ | `/api/attr/setBlockAttrs` |
| åˆ é™¤å— | `/api/block/deleteBlock` |
| åˆ é™¤æ–‡æ¡£ | `/api/filetree/removeDocByID` |
| å¯¼å‡ºä¸º Markdown | `/api/export/exportMdContent` |

## å¸¸ç”¨æ“ä½œ

### æœç´¢ï¼ˆå…¨æ–‡ï¼‰

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/search/fullTextSearchBlock" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "meeting notes", "page": 0}' | jq '.data.blocks[:5]'
```

### æœç´¢ï¼ˆSQLï¼‰

ç›´æŽ¥æŸ¥è¯¢å—æ•°æ®åº“ã€‚ä»… SELECT è¯­å¥æ˜¯å®‰å…¨çš„ã€‚

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/query/sql" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"stmt": "SELECT id, content, type, box FROM blocks WHERE content LIKE '\''%keyword%'\'' AND type='\''p'\'' LIMIT 20"}' | jq '.data'
```

å¸¸ç”¨åˆ—ï¼š`id`ã€`parent_id`ã€`root_id`ã€`box`ï¼ˆç¬”è®°æœ¬ IDï¼‰ã€`path`ã€`content`ã€`type`ã€`subtype`ã€`created`ã€`updated`ã€‚

### è¯»å–å—å†…å®¹

ä»¥ Kramdownï¼ˆç±» Markdownï¼‰æ ¼å¼è¿”å›žå—å†…å®¹ã€‚

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/block/getBlockKramdown" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "20210808180117-6v0mkxr"}' | jq '.data.kramdown'
```

### è¯»å–å­å—

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/block/getChildBlocks" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "20210808180117-6v0mkxr"}' | jq '.data'
```

### èŽ·å–äººç±»å¯è¯»è·¯å¾„

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/filetree/getHPathByID" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "20210808180117-6v0mkxr"}' | jq '.data'
```

### èŽ·å–å—å±žæ€§

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/attr/getBlockAttrs" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "20210808180117-6v0mkxr"}' | jq '.data'
```

### åˆ—å‡ºç¬”è®°æœ¬

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/notebook/lsNotebooks" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.data.notebooks[] | {id, name, closed}'
```

### åˆ—å‡ºç¬”è®°æœ¬ä¸­çš„æ–‡æ¡£

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/filetree/listDocsByPath" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"notebook": "NOTEBOOK_ID", "path": "/"}' | jq '.data.files[] | {id, name}'
```

### åˆ›å»ºæ–‡æ¡£

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/filetree/createDocWithMd" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "notebook": "NOTEBOOK_ID",
    "path": "/Meeting Notes/2026-03-22",
    "markdown": "# Meeting Notes\n\n- Discussed project timeline\n- Assigned tasks"
  }' | jq '.data'
```

### åˆ›å»ºç¬”è®°æœ¬

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/notebook/createNotebook" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My New Notebook"}' | jq '.data.notebook.id'
```

### å‘æ–‡æ¡£è¿½åŠ å—

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/block/appendBlock" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "parentID": "DOCUMENT_OR_BLOCK_ID",
    "data": "New paragraph added at the end.",
    "dataType": "markdown"
  }' | jq '.data'
```

å¦æœ‰ï¼š`/api/block/prependBlock`ï¼ˆå‚æ•°ç›¸åŒï¼Œåœ¨å¼€å¤´æ’å…¥ï¼‰å’Œ `/api/block/insertBlock`ï¼ˆä½¿ç”¨ `previousID` ä»£æ›¿ `parentID`ï¼Œåœ¨æŒ‡å®šå—ä¹‹åŽæ’å…¥ï¼‰ã€‚

### æ›´æ–°å—å†…å®¹

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/block/updateBlock" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "BLOCK_ID",
    "data": "Updated content here.",
    "dataType": "markdown"
  }' | jq '.data'
```

### é‡å‘½åæ–‡æ¡£

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/filetree/renameDocByID" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "DOCUMENT_ID", "title": "New Title"}'
```

### è®¾ç½®å—å±žæ€§

è‡ªå®šä¹‰å±žæ€§å¿…é¡»ä»¥ `custom-` ä¸ºå‰ç¼€ï¼š

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/attr/setBlockAttrs" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "BLOCK_ID",
    "attrs": {
      "custom-status": "reviewed",
      "custom-priority": "high"
    }
  }'
```

### åˆ é™¤å—

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/block/deleteBlock" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "BLOCK_ID"}'
```

åˆ é™¤æ•´ä¸ªæ–‡æ¡£ï¼šä½¿ç”¨ `/api/filetree/removeDocByID`ï¼Œå‚æ•°ä¸º `{"id": "DOC_ID"}`ã€‚
åˆ é™¤ç¬”è®°æœ¬ï¼šä½¿ç”¨ `/api/notebook/removeNotebook`ï¼Œå‚æ•°ä¸º `{"notebook": "NOTEBOOK_ID"}`ã€‚

### å°†æ–‡æ¡£å¯¼å‡ºä¸º Markdown

```bash
curl -s -X POST "${SIYUAN_URL:-http://127.0.0.1:6806}/api/export/exportMdContent" \
  -H "Authorization: Token $SIYUAN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "DOCUMENT_ID"}' | jq -r '.data.content'
```

## å—ç±»åž‹

SQL æŸ¥è¯¢ä¸­å¸¸è§çš„ `type` å€¼ï¼š

| ç±»åž‹ | æè¿° |
|------|-------------|
| `d` | æ–‡æ¡£ï¼ˆæ ¹å—ï¼‰ |
| `p` | æ®µè½ |
| `h` | æ ‡é¢˜ |
| `l` | åˆ—è¡¨ |
| `i` | åˆ—è¡¨é¡¹ |
| `c` | ä»£ç å— |
| `m` | æ•°å­¦å— |
| `t` | è¡¨æ ¼ |
| `b` | å¼•ç”¨å— |
| `s` | è¶…çº§å— |
| `html` | HTML å— |

## æ³¨æ„äº‹é¡¹

- **æ‰€æœ‰ç«¯ç‚¹å‡ä¸º POST** â€” å³ä½¿æ˜¯åªè¯»æ“ä½œä¹Ÿä¸ä¾‹å¤–ã€‚ä¸è¦ä½¿ç”¨ GETã€‚
- **SQL å®‰å…¨æ€§**ï¼šä»…ä½¿ç”¨ SELECT æŸ¥è¯¢ã€‚INSERT/UPDATE/DELETE/DROP æœ‰å±é™©ï¼Œç»ä¸åº”å‘é€ã€‚
- **ID æ ¡éªŒ**ï¼šID åŒ¹é…æ¨¡å¼ `YYYYMMDDHHmmss-xxxxxxx`ã€‚ä¸ç¬¦åˆæ­¤æ¨¡å¼çš„åº”äºˆä»¥æ‹’ç»ã€‚
- **é”™è¯¯å“åº”**ï¼šå¤„ç† `data` ä¹‹å‰ï¼Œå§‹ç»ˆæ£€æŸ¥å“åº”ä¸­çš„ `code != 0`ã€‚
- **å¤§åž‹æ–‡æ¡£**ï¼šå—å†…å®¹å’Œå¯¼å‡ºç»“æžœå¯èƒ½éžå¸¸å¤§ã€‚SQL ä¸­ä½¿ç”¨ `LIMIT`ï¼Œå¹¶é€šè¿‡ `jq` ç®¡é“ä»…æå–æ‰€éœ€å†…å®¹ã€‚
- **ç¬”è®°æœ¬ ID**ï¼šæ“ä½œç‰¹å®šç¬”è®°æœ¬æ—¶ï¼Œå…ˆé€šè¿‡ `lsNotebooks` èŽ·å–å…¶ IDã€‚

## æ›¿ä»£æ–¹æ¡ˆï¼šMCP Server

å¦‚æžœæ‚¨æ›´å€¾å‘äºŽä½¿ç”¨åŽŸç”Ÿé›†æˆè€Œéž curlï¼Œå¯å®‰è£… SiYuan MCP serverï¼š

```yaml
# In ~/.zed/config.yaml under mcp_servers:
mcp_servers:
  siyuan:
    command: npx
    args: ["-y", "@porkll/siyuan-mcp"]
    env:
      SIYUAN_TOKEN: "your_token"
      SIYUAN_URL: "http://127.0.0.1:6806"
```
