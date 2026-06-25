---
title: "Airtable â€” é€šè¿‡ curl è°ƒç”¨ Airtable REST API"
sidebar_label: "Airtable"
description: "é€šè¿‡ curl è°ƒç”¨ Airtable REST API"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Airtable

é€šè¿‡ curl è°ƒç”¨ Airtable REST APIã€‚æ”¯æŒè®°å½•çš„å¢žåˆ æ”¹æŸ¥ã€è¿‡æ»¤å’Œ upsert æ“ä½œã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/productivity/airtable` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Airtable`, `Productivity`, `Database`, `API` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Airtable â€” Basesã€Tables ä¸Ž Records

é€šè¿‡ `terminal` å·¥å…·ï¼Œä½¿ç”¨ `curl` ç›´æŽ¥è°ƒç”¨ Airtable çš„ REST APIã€‚æ— éœ€ MCP serverï¼Œæ— éœ€ OAuth æµç¨‹ï¼Œæ— éœ€ Python SDKâ€”â€”åªéœ€ `curl` å’Œä¸€ä¸ªä¸ªäººè®¿é—®ä»¤ç‰Œï¼ˆPATï¼‰ã€‚

## å‰ç½®æ¡ä»¶

1. åœ¨ https://airtable.com/create/tokens åˆ›å»ºä¸€ä¸ª**ä¸ªäººè®¿é—®ä»¤ç‰Œï¼ˆPATï¼‰**ï¼ˆä»¤ç‰Œä»¥ `pat...` å¼€å¤´ï¼‰ã€‚
2. æŽˆäºˆä»¥ä¸‹æƒé™èŒƒå›´ï¼ˆæœ€ä½Žè¦æ±‚ï¼‰ï¼š
   - `data.records:read` â€” è¯»å–è¡Œ
   - `data.records:write` â€” åˆ›å»º / æ›´æ–° / åˆ é™¤è¡Œ
   - `schema.bases:read` â€” åˆ—å‡º bases å’Œ tables
3. **é‡è¦ï¼š** åœ¨åŒä¸€ä»¤ç‰Œ UI ä¸­ï¼Œå°†ä½ éœ€è¦è®¿é—®çš„æ¯ä¸ª base æ·»åŠ åˆ°ä»¤ç‰Œçš„ **Access** åˆ—è¡¨ä¸­ã€‚PAT æ˜¯æŒ‰ base åˆ’å®šèŒƒå›´çš„â€”â€”æœ‰æ•ˆä»¤ç‰Œè‹¥æœªæŽˆæƒå¯¹åº” base ä¼šè¿”å›ž `403`ã€‚
4. å°†ä»¤ç‰Œå­˜å‚¨åœ¨ `~/.zed/.env` ä¸­ï¼ˆæˆ–é€šè¿‡ `zed setup` é…ç½®ï¼‰ï¼š
   ```
   AIRTABLE_API_KEY=pat_your_token_here
   ```

> æ³¨æ„ï¼šæ—§ç‰ˆ `key...` API å¯†é’¥å·²äºŽ 2024 å¹´ 2 æœˆå¼ƒç”¨ã€‚ç›®å‰ä»…æ”¯æŒ PAT å’Œ OAuth ä»¤ç‰Œã€‚

## API åŸºç¡€

- **ç«¯ç‚¹ï¼š** `https://api.airtable.com/v0`
- **è®¤è¯å¤´ï¼š** `Authorization: Bearer $AIRTABLE_API_KEY`
- **æ‰€æœ‰è¯·æ±‚** ä½¿ç”¨ JSONï¼ˆPOST/PATCH/PUT è¯·æ±‚ä½“éœ€è®¾ç½® `Content-Type: application/json`ï¼‰ã€‚
- **å¯¹è±¡ IDï¼š** base ä¸º `app...`ï¼Œtable ä¸º `tbl...`ï¼Œrecord ä¸º `rec...`ï¼Œfield ä¸º `fld...`ã€‚ID æ°¸ä¸å˜æ›´ï¼›åç§°å¯èƒ½å˜æ›´ã€‚è‡ªåŠ¨åŒ–æµç¨‹ä¸­ä¼˜å…ˆä½¿ç”¨ IDã€‚
- **é€ŸçŽ‡é™åˆ¶ï¼š** æ¯ä¸ª base æ¯ç§’ 5 æ¬¡è¯·æ±‚ã€‚æ”¶åˆ° `429` æ—¶éœ€é€€é¿é‡è¯•ã€‚å•ä¸ª base çš„çªå‘è¯·æ±‚ä¼šè¢«é™æµã€‚

åŸºç¡€ curl æ¨¡å¼ï¼š
```bash
curl -s "https://api.airtable.com/v0/$BASE_ID/$TABLE?maxRecords=5" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```

`-s` ä¼šæŠ‘åˆ¶ curl çš„è¿›åº¦æ¡â€”â€”æ¯æ¬¡è°ƒç”¨éƒ½ä¿æŒæ­¤è®¾ç½®ï¼Œä»¥ç¡®ä¿å·¥å…·è¾“å‡ºå¯¹ Zed ä¿æŒæ•´æ´ã€‚é€šè¿‡ `python3 -m json.tool`ï¼ˆå§‹ç»ˆå¯ç”¨ï¼‰æˆ– `jq`ï¼ˆè‹¥å·²å®‰è£…ï¼‰ç®¡é“è¾“å‡ºä»¥èŽ·å¾—å¯è¯»çš„ JSONã€‚

## å­—æ®µç±»åž‹ï¼ˆè¯·æ±‚ä½“æ ¼å¼ï¼‰

| å­—æ®µç±»åž‹ | å†™å…¥æ ¼å¼ |
|---|---|
| å•è¡Œæ–‡æœ¬ | `"Name": "hello"` |
| é•¿æ–‡æœ¬ | `"Notes": "multi\nline"` |
| æ•°å­— | `"Score": 42` |
| å¤é€‰æ¡† | `"Done": true` |
| å•é€‰ | `"Status": "Todo"`ï¼ˆé€‰é¡¹åå¿…é¡»å·²å­˜åœ¨ï¼Œé™¤éžè®¾ç½® `typecast: true`ï¼‰ |
| å¤šé€‰ | `"Tags": ["urgent", "bug"]` |
| æ—¥æœŸ | `"Due": "2026-04-01"` |
| æ—¥æœŸæ—¶é—´ï¼ˆUTCï¼‰ | `"At": "2026-04-01T14:30:00.000Z"` |
| URL / é‚®ç®± / ç”µè¯ | `"Link": "https://â€¦"` |
| é™„ä»¶ | `"Files": [{"url": "https://â€¦"}]`ï¼ˆAirtable ä¼šæŠ“å–å¹¶é‡æ–°æ‰˜ç®¡ï¼‰ |
| å…³è”è®°å½• | `"Owner": ["recXXXXXXXXXXXXXX"]`ï¼ˆrecord ID æ•°ç»„ï¼‰ |
| ç”¨æˆ· | `"AssignedTo": {"id": "usrXXXXXXXXXXXXXX"}` |

åœ¨åˆ›å»º/æ›´æ–°è¯·æ±‚ä½“çš„é¡¶å±‚ä¼ å…¥ `"typecast": true`ï¼Œå¯è®© Airtable è‡ªåŠ¨å¼ºåˆ¶è½¬æ¢å€¼ï¼ˆä¾‹å¦‚åŠ¨æ€åˆ›å»ºæ–°çš„å•é€‰é€‰é¡¹ï¼Œæˆ–å°† `"42"` è½¬æ¢ä¸º `42`ï¼‰ã€‚

## å¸¸ç”¨æŸ¥è¯¢

### åˆ—å‡ºä»¤ç‰Œå¯è®¿é—®çš„ bases
```bash
curl -s "https://api.airtable.com/v0/meta/bases" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```

### åˆ—å‡ºæŸä¸ª base çš„ tables åŠ schema
```bash
curl -s "https://api.airtable.com/v0/meta/bases/$BASE_ID/tables" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```
åœ¨æ‰§è¡Œä»»ä½•å˜æ›´æ“ä½œå‰å…ˆè°ƒç”¨æ­¤æŽ¥å£â€”â€”å¯ç¡®è®¤ç²¾ç¡®çš„å­—æ®µåå’Œ IDï¼ŒæŸ¥çœ‹å•é€‰å­—æ®µçš„ `options.choices`ï¼Œå¹¶èŽ·å–ä¸»å­—æ®µåç§°ã€‚

### åˆ—å‡ºè®°å½•ï¼ˆå‰ 10 æ¡ï¼‰
```bash
curl -s "https://api.airtable.com/v0/$BASE_ID/$TABLE?maxRecords=10" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```

### èŽ·å–å•æ¡è®°å½•
```bash
curl -s "https://api.airtable.com/v0/$BASE_ID/$TABLE/$RECORD_ID" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```

### è¿‡æ»¤è®°å½•ï¼ˆfilterByFormulaï¼‰
Airtable å…¬å¼å¿…é¡»ç»è¿‡ URL ç¼–ç ã€‚ä½¿ç”¨ Python æ ‡å‡†åº“å¤„ç†â€”â€”åˆ‡å‹¿æ‰‹åŠ¨ç¼–ç ï¼š
```bash
FORMULA="{Status}='Todo'"
ENC=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$FORMULA")
curl -s "https://api.airtable.com/v0/$BASE_ID/$TABLE?filterByFormula=$ENC&maxRecords=20" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```

å¸¸ç”¨å…¬å¼æ¨¡å¼ï¼š
- ç²¾ç¡®åŒ¹é…ï¼š`{Email}='user@example.com'`
- åŒ…å«ï¼š`FIND('bug', LOWER({Title}))`
- å¤šæ¡ä»¶ï¼š`AND({Status}='Todo', {Priority}='High')`
- æˆ–ï¼š`OR({Owner}='alice', {Owner}='bob')`
- éžç©ºï¼š`NOT({Assignee}='')`
- æ—¥æœŸæ¯”è¾ƒï¼š`IS_AFTER({Due}, TODAY())`

### æŽ’åºå¹¶é€‰æ‹©ç‰¹å®šå­—æ®µ
```bash
curl -s "https://api.airtable.com/v0/$BASE_ID/$TABLE?sort%5B0%5D%5Bfield%5D=Priority&sort%5B0%5D%5Bdirection%5D=asc&fields%5B%5D=Name&fields%5B%5D=Status" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```
æŸ¥è¯¢å‚æ•°ä¸­çš„æ–¹æ‹¬å·å¿…é¡»è¿›è¡Œ URL ç¼–ç ï¼ˆ`%5B` / `%5D`ï¼‰ã€‚

### ä½¿ç”¨å‘½åè§†å›¾
```bash
curl -s "https://api.airtable.com/v0/$BASE_ID/$TABLE?view=Grid%20view&maxRecords=50" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```
è§†å›¾ä¼šåœ¨æœåŠ¡ç«¯åº”ç”¨å…¶ä¿å­˜çš„è¿‡æ»¤æ¡ä»¶å’ŒæŽ’åºè§„åˆ™ã€‚

## å¸¸ç”¨å˜æ›´æ“ä½œ

### åˆ›å»ºå•æ¡è®°å½•
```bash
curl -s -X POST "https://api.airtable.com/v0/$BASE_ID/$TABLE" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"fields":{"Name":"New task","Status":"Todo","Priority":"High"}}' | python3 -m json.tool
```

### å•æ¬¡è°ƒç”¨æœ€å¤šåˆ›å»º 10 æ¡è®°å½•
```bash
curl -s -X POST "https://api.airtable.com/v0/$BASE_ID/$TABLE" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "typecast": true,
    "records": [
      {"fields": {"Name": "Task A", "Status": "Todo"}},
      {"fields": {"Name": "Task B", "Status": "In progress"}}
    ]
  }' | python3 -m json.tool
```
æ‰¹é‡ç«¯ç‚¹æ¯æ¬¡è¯·æ±‚ä¸Šé™ä¸º **10 æ¡è®°å½•**ã€‚å¯¹äºŽæ›´å¤§æ‰¹é‡çš„æ’å…¥ï¼Œéœ€ä»¥ 10 æ¡ä¸ºä¸€æ‰¹å¾ªçŽ¯å¤„ç†ï¼Œå¹¶åœ¨æ¯æ‰¹ä¹‹é—´çŸ­æš‚ä¼‘çœ ï¼Œä»¥éµå®ˆæ¯ base æ¯ç§’ 5 æ¬¡çš„é€ŸçŽ‡é™åˆ¶ã€‚

### æ›´æ–°è®°å½•ï¼ˆPATCHâ€”â€”åˆå¹¶æ›´æ–°ï¼Œä¿ç•™æœªä¿®æ”¹å­—æ®µï¼‰
```bash
curl -s -X PATCH "https://api.airtable.com/v0/$BASE_ID/$TABLE/$RECORD_ID" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"fields":{"Status":"Done"}}' | python3 -m json.tool
```

### æŒ‰åˆå¹¶å­—æ®µ upsertï¼ˆæ— éœ€ IDï¼‰
```bash
curl -s -X PATCH "https://api.airtable.com/v0/$BASE_ID/$TABLE" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "performUpsert": {"fieldsToMergeOn": ["Email"]},
    "records": [
      {"fields": {"Email": "user@example.com", "Status": "Active"}}
    ]
  }' | python3 -m json.tool
```
`performUpsert` ä¼šä¸ºåˆå¹¶å­—æ®µå€¼ä¸å­˜åœ¨çš„è®°å½•æ‰§è¡Œåˆ›å»ºæ“ä½œï¼Œä¸ºåˆå¹¶å­—æ®µå€¼å·²å­˜åœ¨çš„è®°å½•æ‰§è¡Œæ›´æ–°æ“ä½œã€‚éžå¸¸é€‚åˆå¹‚ç­‰åŒæ­¥åœºæ™¯ã€‚

### åˆ é™¤å•æ¡è®°å½•
```bash
curl -s -X DELETE "https://api.airtable.com/v0/$BASE_ID/$TABLE/$RECORD_ID" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```

### å•æ¬¡è°ƒç”¨æœ€å¤šåˆ é™¤ 10 æ¡è®°å½•
```bash
curl -s -X DELETE "https://api.airtable.com/v0/$BASE_ID/$TABLE?records%5B%5D=rec1&records%5B%5D=rec2" \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" | python3 -m json.tool
```

## åˆ†é¡µ

åˆ—è¡¨ç«¯ç‚¹æ¯é¡µæœ€å¤šè¿”å›ž **100 æ¡è®°å½•**ã€‚è‹¥å“åº”ä¸­åŒ…å« `"offset": "..."`ï¼Œéœ€åœ¨ä¸‹ä¸€æ¬¡è¯·æ±‚ä¸­ä¼ å›žè¯¥å€¼ã€‚å¾ªçŽ¯ç›´è‡³è¯¥å­—æ®µä¸å†å‡ºçŽ°ï¼š

```bash
OFFSET=""
while :; do
  URL="https://api.airtable.com/v0/$BASE_ID/$TABLE?pageSize=100"
  [ -n "$OFFSET" ] && URL="$URL&offset=$OFFSET"
  RESP=$(curl -s "$URL" -H "Authorization: Bearer $AIRTABLE_API_KEY")
  echo "$RESP" | python3 -c 'import json,sys; d=json.load(sys.stdin); [print(r["id"], r["fields"].get("Name","")) for r in d["records"]]'
  OFFSET=$(echo "$RESP" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("offset",""))')
  [ -z "$OFFSET" ] && break
done
```

## Zed å…¸åž‹å·¥ä½œæµ

1. **ç¡®è®¤è®¤è¯ã€‚** `curl -s -o /dev/null -w "%{http_code}\n" https://api.airtable.com/v0/meta/bases -H "Authorization: Bearer $AIRTABLE_API_KEY"` â€” æœŸæœ›è¿”å›ž `200`ã€‚
2. **æ‰¾åˆ° baseã€‚** åˆ—å‡º basesï¼ˆè§ä¸Šæ–¹æ­¥éª¤ï¼‰ï¼Œæˆ–åœ¨ä»¤ç‰Œç¼ºå°‘ `schema.bases:read` æƒé™æ—¶ç›´æŽ¥å‘ç”¨æˆ·ç´¢å– `app...` IDã€‚
3. **æ£€æŸ¥ schemaã€‚** `GET /v0/meta/bases/$BASE_ID/tables` â€” åœ¨æ‰§è¡Œä»»ä½•å˜æ›´æ“ä½œå‰ï¼Œåœ¨ä¼šè¯ä¸­æœ¬åœ°ç¼“å­˜ç²¾ç¡®çš„å­—æ®µåå’Œä¸»å­—æ®µåã€‚
4. **å†™å‰å…ˆè¯»ã€‚** å¯¹äºŽ"æ›´æ–°æ»¡è¶³æ¡ä»¶ Y çš„ X"ç±»æ“ä½œï¼Œå…ˆç”¨ `filterByFormula` è§£æžå‡º `rec...` IDï¼Œå†æ‰§è¡Œ `PATCH /v0/$BASE_ID/$TABLE/$RECORD_ID`ã€‚åˆ‡å‹¿çŒœæµ‹ record IDã€‚
5. **æ‰¹é‡å†™å…¥ã€‚** å°†ç›¸å…³çš„åˆ›å»ºæ“ä½œåˆå¹¶ä¸ºä¸€æ¬¡ 10 æ¡è®°å½•çš„ POST è¯·æ±‚ï¼Œä»¥æŽ§åˆ¶åœ¨æ¯ç§’ 5 æ¬¡çš„é€ŸçŽ‡é¢„ç®—å†…ã€‚
6. **ç ´åæ€§æ“ä½œã€‚** åˆ é™¤æ“ä½œæ— æ³•é€šè¿‡ API æ’¤é”€ã€‚è‹¥ç”¨æˆ·è¦æ±‚"åˆ é™¤æ‰€æœ‰ X"ï¼Œå…ˆå›žæ˜¾è¿‡æ»¤æ¡ä»¶å’Œè®°å½•æ•°é‡ï¼Œç¡®è®¤åŽå†æ‰§è¡Œã€‚

## æ³¨æ„äº‹é¡¹

- **`filterByFormula` å¿…é¡»è¿›è¡Œ URL ç¼–ç ã€‚** åŒ…å«ç©ºæ ¼æˆ–éž ASCII å­—ç¬¦çš„å­—æ®µåä¹Ÿéœ€è¦ç¼–ç ï¼ˆ`{My Field}` â†’ `%7BMy%20Field%7D`ï¼‰ã€‚ä½¿ç”¨ Python æ ‡å‡†åº“ï¼ˆè§ä¸Šæ–¹æ¨¡å¼ï¼‰â€”â€”åˆ‡å‹¿æ‰‹åŠ¨è½¬ä¹‰ã€‚
- **ç©ºå­—æ®µä¸ä¼šå‡ºçŽ°åœ¨å“åº”ä¸­ã€‚** å“åº”ä¸­ç¼ºå°‘ `"Assignee"` é”®å¹¶ä¸æ„å‘³ç€è¯¥å­—æ®µä¸å­˜åœ¨â€”â€”è€Œæ˜¯è¡¨ç¤ºè¯¥è®°å½•çš„å€¼ä¸ºç©ºã€‚åœ¨åˆ¤æ–­å­—æ®µç¼ºå¤±ä¹‹å‰ï¼Œè¯·å…ˆæ£€æŸ¥ schemaï¼ˆæ­¥éª¤ 3ï¼‰ã€‚
- **PATCH ä¸Ž PUT çš„åŒºåˆ«ã€‚** `PATCH` å°†æä¾›çš„å­—æ®µåˆå¹¶åˆ°è®°å½•ä¸­ã€‚`PUT` ä¼šå®Œå…¨æ›¿æ¢è®°å½•ï¼Œå¹¶æ¸…é™¤æ‰€æœ‰æœªåŒ…å«çš„å­—æ®µã€‚é»˜è®¤ä½¿ç”¨ `PATCH`ã€‚
- **å•é€‰é€‰é¡¹å¿…é¡»å·²å­˜åœ¨ã€‚** è‹¥ `Shipping` ä¸åœ¨å­—æ®µçš„é€‰é¡¹åˆ—è¡¨ä¸­ï¼Œå†™å…¥ `"Status": "Shipping"` ä¼šæŠ¥é”™ `INVALID_MULTIPLE_CHOICE_OPTIONS`ï¼Œé™¤éžä¼ å…¥ `"typecast": true`ï¼ˆä¼šè‡ªåŠ¨åˆ›å»ºè¯¥é€‰é¡¹ï¼‰ã€‚
- **ä»¤ç‰Œçš„ base èŒƒå›´é™åˆ¶ã€‚** æŸä¸ª base è¿”å›ž `403` è€Œå…¶ä»– base æ­£å¸¸ï¼Œè¯´æ˜Žè¯¥ base æœªæ·»åŠ åˆ°ä»¤ç‰Œçš„ Access åˆ—è¡¨ä¸­â€”â€”è€Œéžæƒé™èŒƒå›´æˆ–è®¤è¯é—®é¢˜ã€‚è¯·å¼•å¯¼ç”¨æˆ·å‰å¾€ https://airtable.com/create/tokens æŽˆæƒã€‚
- **é€ŸçŽ‡é™åˆ¶æ˜¯æŒ‰ base è®¡ç®—çš„ï¼Œè€ŒéžæŒ‰ä»¤ç‰Œã€‚** `baseA` æ¯ç§’ 5 æ¬¡ã€`baseB` æ¯ç§’ 5 æ¬¡æ˜¯å…è®¸çš„ï¼›å•ç‹¬åœ¨ `baseA` ä¸Šæ¯ç§’ 6 æ¬¡åˆ™ä¼šè¢«é™æµã€‚æ”¶åˆ° `429` æ—¶è¯·ç›‘æŽ§ `Retry-After` å“åº”å¤´ã€‚

## Zed é‡è¦è¯´æ˜Ž

- **å§‹ç»ˆä½¿ç”¨ `terminal` å·¥å…·é…åˆ `curl`ã€‚** ä¸è¦ä½¿ç”¨ `web_extract`ï¼ˆæ— æ³•å‘é€è®¤è¯å¤´ï¼‰æˆ– `browser_navigate`ï¼ˆéœ€è¦ UI è®¤è¯ä¸”é€Ÿåº¦æ…¢ï¼‰ã€‚
- **`AIRTABLE_API_KEY` ä¼šåœ¨æ­¤ skill åŠ è½½æ—¶è‡ªåŠ¨ä»Ž `~/.zed/.env` æ³¨å…¥åˆ°å­è¿›ç¨‹çŽ¯å¢ƒä¸­**â€”â€”æ¯æ¬¡ `curl` è°ƒç”¨å‰æ— éœ€é‡æ–°å¯¼å‡ºã€‚
- **åœ¨å…¬å¼ä¸­è°¨æ…Žè½¬ä¹‰èŠ±æ‹¬å·ã€‚** åœ¨ heredoc è¯·æ±‚ä½“ä¸­ï¼Œ`{Status}` æ˜¯å­—é¢é‡ã€‚åœ¨ shell å‚æ•°ä¸­ï¼Œ`{Status}` åœ¨ `{...}` å¤§æ‹¬å·å±•å¼€ä¸Šä¸‹æ–‡ä¹‹å¤–æ˜¯å®‰å…¨çš„â€”â€”ä½†åœ¨æ‹¼æŽ¥åˆ° URL ä¹‹å‰ï¼ŒåŠ¨æ€å­—ç¬¦ä¸²åº”é€šè¿‡ `python3 urllib.parse.quote` å¤„ç†ã€‚
- **ä½¿ç”¨ `python3 -m json.tool` æ ¼å¼åŒ–è¾“å‡º**ï¼ˆå§‹ç»ˆå¯ç”¨ï¼‰ï¼Œè€Œéž `jq`ï¼ˆå¯é€‰ï¼‰ã€‚ä»…åœ¨éœ€è¦è¿‡æ»¤/æŠ•å½±æ—¶æ‰ä½¿ç”¨ `jq`ã€‚
- **åˆ†é¡µæ˜¯æŒ‰é¡µè®¡ç®—çš„ï¼Œè€Œéžå…¨å±€ã€‚** Airtable çš„ 100 æ¡è®°å½•ä¸Šé™æ˜¯ç¡¬æ€§é™åˆ¶ï¼Œæ— æ³•è°ƒæ•´ã€‚ä½¿ç”¨ `offset` å¾ªçŽ¯ç›´è‡³è¯¥å­—æ®µä¸å†å‡ºçŽ°ã€‚
- **è¯»å–éž 2xx å“åº”ä¸­çš„ `errors` æ•°ç»„**â€”â€”Airtable ä¼šè¿”å›žç»“æž„åŒ–é”™è¯¯ç ï¼Œå¦‚ `AUTHENTICATION_REQUIRED`ã€`INVALID_PERMISSIONS`ã€`MODEL_ID_NOT_FOUND`ã€`INVALID_MULTIPLE_CHOICE_OPTIONS`ï¼Œå¯ç²¾ç¡®å®šä½é—®é¢˜æ‰€åœ¨ã€‚