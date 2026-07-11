---
title: "Notion â€” Notion API + ntn CLIï¼šé¡µé¢ã€æ•°æ®åº“ã€Markdownã€Workers"
sidebar_label: "Notion"
description: "Notion API + ntn CLIï¼šé¡µé¢ã€æ•°æ®åº“ã€Markdownã€Workers"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Notion

Notion API + ntn CLIï¼šé¡µé¢ã€æ•°æ®åº“ã€Markdownã€Workersã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/productivity/notion` |
| ç‰ˆæœ¬ | `2.0.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Notion`, `Productivity`, `Notes`, `Database`, `API`, `CLI`, `Workers` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Notion

é€šè¿‡ä¸¤ç§æ–¹å¼ä¸Ž Notion äº¤äº’ã€‚ä¸¤ç§æ–¹å¼ä½¿ç”¨åŒä¸€ä¸ªé›†æˆ tokenâ€”â€”æ ¹æ®å¯ç”¨æƒ…å†µé€‰æ‹©ã€‚

â—† **`ntn` CLI** â€” Notion å®˜æ–¹ CLIã€‚è¯­æ³•æ›´ç®€æ´ï¼Œæ”¯æŒå•è¡Œæ–‡ä»¶ä¸Šä¼ ï¼ŒWorkers å¿…é¡»ä½¿ç”¨æ­¤æ–¹å¼ã€‚æˆªè‡³ 2026 å¹´ 5 æœˆä»…æ”¯æŒ macOS + Linuxï¼ˆWindows æ”¯æŒ"å³å°†æŽ¨å‡º"ï¼‰ã€‚**å·²å®‰è£…æ—¶ä¸ºé»˜è®¤æ–¹å¼ã€‚**
â—† **HTTP + curl** â€” å…¨å¹³å°å¯ç”¨ï¼ŒåŒ…æ‹¬ Windowsã€‚**`ntn` æœªå®‰è£…æ—¶çš„é»˜è®¤å›žé€€æ–¹å¼ã€‚**

## é…ç½®

### 1. èŽ·å–é›†æˆ tokenï¼ˆä¸¤ç§æ–¹å¼å‡éœ€è¦ï¼‰

1. åœ¨ https://notion.so/my-integrations åˆ›å»ºé›†æˆ
2. å¤åˆ¶ API å¯†é’¥ï¼ˆä»¥ `ntn_` æˆ– `secret_` å¼€å¤´ï¼‰
3. å­˜å‚¨åˆ° `~/.zed/.env`ï¼š
   ```
   NOTION_API_KEY=ntn_your_key_here
   ```
4. **åœ¨ Notion ä¸­å°†ç›®æ ‡é¡µé¢/æ•°æ®åº“å…±äº«ç»™è¯¥é›†æˆï¼š** é¡µé¢èœå• `...` â†’ `Connect to` â†’ ä½ çš„é›†æˆåç§°ã€‚è‹¥æœªæ‰§è¡Œæ­¤æ­¥éª¤ï¼Œå³ä½¿é¡µé¢å­˜åœ¨ï¼ŒAPI ä¹Ÿä¼šè¿”å›ž 404ã€‚

### 2. å®‰è£… `ntn`ï¼ˆmacOS / Linux ä¸Šçš„é¦–é€‰æ–¹å¼ï¼‰

```bash
# æŽ¨èæ–¹å¼
curl -fsSL https://ntn.dev | bash

# æˆ–é€šè¿‡ npm å®‰è£…ï¼ˆéœ€è¦ Node 22+ï¼Œnpm 10+ï¼‰
npm install --global ntn

ntn --version    # éªŒè¯å®‰è£…
```

**è·³è¿‡ `ntn login`â€”â€”æ”¹ç”¨é›†æˆ tokenã€‚** æ­¤æ–¹å¼æ”¯æŒæ— å¤´è¿è¡Œï¼Œæ— éœ€æµè§ˆå™¨ï¼š
```bash
export NOTION_API_TOKEN=$NOTION_API_KEY      # ntn è¯»å– NOTION_API_TOKEN
export NOTION_KEYRING=0                       # ä¸å°è¯•ä½¿ç”¨ç³»ç»Ÿå¯†é’¥é“¾
```

å°†ä¸Šè¿° export æ·»åŠ åˆ°ä½ çš„ shell é…ç½®æ–‡ä»¶ï¼ˆæˆ– `~/.zed/.env`ï¼‰ï¼Œä½¿æ¯ä¸ªä¼šè¯éƒ½èƒ½ç»§æ‰¿è¿™äº›å˜é‡ã€‚

### 3. è¿è¡Œæ—¶é€‰æ‹©è·¯å¾„

```bash
if command -v ntn >/dev/null 2>&1; then
  # ä½¿ç”¨ ntn
else
  # å›žé€€åˆ° curl
fi
```

Windows ç”¨æˆ·ï¼šåœ¨åŽŸç”Ÿ `ntn` å‘å¸ƒä¹‹å‰å®Œå…¨è·³è¿‡ç¬¬ 2 æ­¥â€”â€”Path B å¯æ­£å¸¸ä½¿ç”¨ã€‚å¦‚æžœçŽ°åœ¨å°±æƒ³è¦ CLI ä½“éªŒï¼Œå¯åœ¨ WSL2 ä¸­å®‰è£… `ntn`ã€‚

## API åŸºç¡€

æ‰€æœ‰ HTTP è¯·æ±‚å‡éœ€æºå¸¦ `Notion-Version: 2025-09-03`ã€‚`ntn` ä¼šè‡ªåŠ¨å¤„ç†æ­¤é¡¹ã€‚åœ¨æ­¤ç‰ˆæœ¬ä¸­ï¼Œç”¨æˆ·æ‰€ç§°çš„"æ•°æ®åº“"åœ¨ API ä¸­ç§°ä¸º **data sourcesï¼ˆæ•°æ®æºï¼‰**ã€‚

## Path A â€” `ntn` CLIï¼ˆé¦–é€‰ï¼ŒmacOS / Linuxï¼‰

### åŽŸå§‹ API è°ƒç”¨ï¼ˆcurl çš„ç®€å†™ï¼‰
```bash
ntn api v1/users                                  # GET
ntn api v1/pages parent[page_id]=abc123 \         # POSTï¼Œå†…è”è¯·æ±‚ä½“
  properties[title][0][text][content]="Notes"
ntn api v1/pages/abc123 -X PATCH archived:=true   # PATCHï¼›:= è¡¨ç¤ºéžå­—ç¬¦ä¸²ç±»åž‹ï¼ˆå¸ƒå°”/æ•°å­—/nullï¼‰
```

è¯­æ³•è¯´æ˜Žï¼š
- `key=value` â€” å­—ç¬¦ä¸²å­—æ®µ
- `key[nested]=value` â€” åµŒå¥—å¯¹è±¡å­—æ®µ
- `key:=value` â€” ç±»åž‹èµ‹å€¼ï¼ˆå¸ƒå°”å€¼ã€æ•°å­—ã€nullã€æ•°ç»„ï¼‰

### æœç´¢
```bash
ntn api v1/search query="page title"
```

### è¯»å–é¡µé¢å…ƒæ•°æ®
```bash
ntn api v1/pages/{page_id}
```

### ä»¥ Markdown æ ¼å¼è¯»å–é¡µé¢ï¼ˆé€‚åˆ agent ä½¿ç”¨ï¼‰
```bash
ntn api v1/pages/{page_id}/markdown
```

### ä»¥å—ï¼ˆblockï¼‰å½¢å¼è¯»å–é¡µé¢å†…å®¹
```bash
ntn api v1/blocks/{page_id}/children
```

### ä»Ž Markdown åˆ›å»ºé¡µé¢
```bash
ntn api v1/pages \
  parent[page_id]=xxx \
  properties[title][0][text][content]="Notes from meeting" \
  markdown="# Agenda

- Q3 roadmap
- Hiring"
```

### ç”¨ Markdown æ›´æ–°é¡µé¢
```bash
ntn api v1/pages/{page_id}/markdown -X PATCH \
  markdown="## Update

Shipped the prototype."
```

### æŸ¥è¯¢æ•°æ®åº“ï¼ˆdata sourceï¼‰
```bash
ntn api v1/data_sources/{data_source_id}/query -X POST \
  filter[property]=Status filter[select][equals]=Active
```

å¯¹äºŽåŒ…å« `sorts`ã€å¤šä¸ªè¿‡æ»¤æ¡ä»¶æˆ–å¤åˆé€»è¾‘çš„å¤æ‚æŸ¥è¯¢ï¼Œé€šè¿‡ç®¡é“ä¼ å…¥ JSONï¼š
```bash
echo '{"filter": {"property": "Status", "select": {"equals": "Active"}}, "sorts": [{"property": "Date", "direction": "descending"}]}' | \
  ntn api v1/data_sources/{data_source_id}/query -X POST --json -
```

### æ–‡ä»¶ä¸Šä¼ ï¼ˆå•è¡Œå‘½ä»¤â€”â€”CLI æœ€å¤§ä¼˜åŠ¿ï¼‰
```bash
ntn files create < photo.png
ntn files create --external-url https://example.com/photo.png
ntn files list
```

å¯¹æ¯”ä¸‰æ­¥ HTTP æµç¨‹ï¼ˆåˆ›å»ºä¸Šä¼  â†’ PUT å­—èŠ‚ â†’ å¼•ç”¨ï¼‰ã€‚

### å¸¸ç”¨çŽ¯å¢ƒå˜é‡
| å˜é‡ | ä½œç”¨ |
|---|---|
| `NOTION_API_TOKEN` | è®¤è¯ tokenï¼ˆè¦†ç›–å¯†é’¥é“¾ï¼‰â€”â€”è®¾ç½®ä¸ºä½ çš„é›†æˆ token |
| `NOTION_KEYRING=0` | ä½¿ç”¨ `~/.config/notion/auth.json` å­˜å‚¨å‡­æ®ï¼Œè€Œéžç³»ç»Ÿå¯†é’¥é“¾ |
| `NOTION_WORKSPACE_ID` | è·³è¿‡å·¥ä½œåŒºé€‰æ‹©æç¤º |

## Path B â€” HTTP + curlï¼ˆè·¨å¹³å°ï¼ŒWindows é»˜è®¤æ–¹å¼ï¼‰

æ‰€æœ‰è¯·æ±‚éµå¾ªä»¥ä¸‹æ¨¡å¼ï¼š

```bash
curl -s -X GET "https://api.notion.com/v1/..." \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json"
```

Windows 10+ è‡ªå¸¦çš„ `curl` å¯ç›´æŽ¥ä½¿ç”¨ã€‚PowerShell ç”¨æˆ·ä¹Ÿå¯ä½¿ç”¨ `Invoke-RestMethod`ã€‚

### æœç´¢
```bash
curl -s -X POST "https://api.notion.com/v1/search" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{"query": "page title"}'
```

### è¯»å–é¡µé¢å…ƒæ•°æ®
```bash
curl -s "https://api.notion.com/v1/pages/{page_id}" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03"
```

### ä»¥ Markdown æ ¼å¼è¯»å–é¡µé¢ï¼ˆé€‚åˆ agent ä½¿ç”¨ï¼‰

æ¯”å— JSON æ›´æ˜“äºŽè¾“å…¥æ¨¡åž‹å¤„ç†ã€‚

```bash
curl -s "https://api.notion.com/v1/pages/{page_id}/markdown" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03"
```

### ä»¥å—å½¢å¼è¯»å–é¡µé¢å†…å®¹ï¼ˆéœ€è¦ç»“æž„åŒ–æ•°æ®æ—¶ä½¿ç”¨ï¼‰
```bash
curl -s "https://api.notion.com/v1/blocks/{page_id}/children" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03"
```

### ä»Ž Markdown åˆ›å»ºé¡µé¢

`POST /v1/pages` æŽ¥å— `markdown` è¯·æ±‚ä½“å‚æ•°ã€‚

```bash
curl -s -X POST "https://api.notion.com/v1/pages" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": {"page_id": "xxx"},
    "properties": {"title": [{"text": {"content": "Notes from meeting"}}]},
    "markdown": "# Agenda\n\n- Q3 roadmap\n- Hiring\n\n## Decisions\n- Ship MVP Friday"
  }'
```

### ç”¨ Markdown æ›´æ–°é¡µé¢
```bash
curl -s -X PATCH "https://api.notion.com/v1/pages/{page_id}/markdown" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{"markdown": "## Update\n\nShipped the prototype."}'
```

### åœ¨æ•°æ®åº“ä¸­åˆ›å»ºé¡µé¢ï¼ˆå¸¦ç±»åž‹å±žæ€§ï¼‰
```bash
curl -s -X POST "https://api.notion.com/v1/pages" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": {"database_id": "xxx"},
    "properties": {
      "Name": {"title": [{"text": {"content": "New Item"}}]},
      "Status": {"select": {"name": "Todo"}}
    }
  }'
```

### æŸ¥è¯¢æ•°æ®åº“ï¼ˆdata sourceï¼‰
```bash
curl -s -X POST "https://api.notion.com/v1/data_sources/{data_source_id}/query" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{
    "filter": {"property": "Status", "select": {"equals": "Active"}},
    "sorts": [{"property": "Date", "direction": "descending"}]
  }'
```

### åˆ›å»ºæ•°æ®åº“
```bash
curl -s -X POST "https://api.notion.com/v1/data_sources" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": {"page_id": "xxx"},
    "title": [{"text": {"content": "My Database"}}],
    "properties": {
      "Name": {"title": {}},
      "Status": {"select": {"options": [{"name": "Todo"}, {"name": "Done"}]}},
      "Date": {"date": {}}
    }
  }'
```

### æ›´æ–°é¡µé¢å±žæ€§
```bash
curl -s -X PATCH "https://api.notion.com/v1/pages/{page_id}" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{"properties": {"Status": {"select": {"name": "Done"}}}}'
```

### å‘é¡µé¢è¿½åŠ å—
```bash
curl -s -X PATCH "https://api.notion.com/v1/blocks/{page_id}/children" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{
    "children": [
      {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"text": {"content": "Hello from Zed!"}}]}}
    ]
  }'
```

### æ–‡ä»¶ä¸Šä¼ ï¼ˆä¸‰æ­¥æµç¨‹ï¼‰
```bash
# 1. åˆ›å»ºä¸Šä¼ 
curl -s -X POST "https://api.notion.com/v1/file_uploads" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2025-09-03" \
  -H "Content-Type: application/json" \
  -d '{"filename": "photo.png", "content_type": "image/png"}'

# 2. å°†å­—èŠ‚ PUT åˆ°ä¸Šé¢è¿”å›žçš„ upload_url
curl -s -X PUT "{upload_url}" --data-binary @photo.png

# 3. åœ¨é¡µé¢/å— payload ä¸­å¼•ç”¨ {file_upload_id}
```

## å±žæ€§ç±»åž‹

æ•°æ®åº“æ¡ç›®çš„å¸¸ç”¨å±žæ€§æ ¼å¼ï¼š

- **æ ‡é¢˜ï¼ˆTitleï¼‰ï¼š** `{"title": [{"text": {"content": "..."}}]}`
- **å¯Œæ–‡æœ¬ï¼ˆRich textï¼‰ï¼š** `{"rich_text": [{"text": {"content": "..."}}]}`
- **å•é€‰ï¼ˆSelectï¼‰ï¼š** `{"select": {"name": "Option"}}`
- **å¤šé€‰ï¼ˆMulti-selectï¼‰ï¼š** `{"multi_select": [{"name": "A"}, {"name": "B"}]}`
- **æ—¥æœŸï¼ˆDateï¼‰ï¼š** `{"date": {"start": "2026-01-15", "end": "2026-01-16"}}`
- **å¤é€‰æ¡†ï¼ˆCheckboxï¼‰ï¼š** `{"checkbox": true}`
- **æ•°å­—ï¼ˆNumberï¼‰ï¼š** `{"number": 42}`
- **URLï¼š** `{"url": "https://..."}`
- **é‚®ç®±ï¼ˆEmailï¼‰ï¼š** `{"email": "user@example.com"}`
- **å…³è”ï¼ˆRelationï¼‰ï¼š** `{"relation": [{"id": "page_id"}]}`

## API ç‰ˆæœ¬ 2025-09-03 â€” æ•°æ®åº“ä¸Ž Data Sources

- **æ•°æ®åº“å·²æ›´åä¸º data sourcesã€‚** æŸ¥è¯¢å’Œæ£€ç´¢è¯·ä½¿ç”¨ `/data_sources/` ç«¯ç‚¹ã€‚
- **æ¯ä¸ªæ•°æ®åº“æœ‰ä¸¤ä¸ª IDï¼š** `database_id` å’Œ `data_source_id`ã€‚
  - åˆ›å»ºé¡µé¢æ—¶ä½¿ç”¨ `database_id`ï¼š`parent: {"database_id": "..."}`
  - æŸ¥è¯¢æ—¶ä½¿ç”¨ `data_source_id`ï¼š`POST /v1/data_sources/{id}/query`
- æœç´¢è¿”å›žçš„æ•°æ®åº“å¯¹è±¡ç±»åž‹ä¸º `"object": "data_source"`ï¼ŒåŒ…å« `data_source_id` å­—æ®µã€‚

## Notion Workersï¼ˆé«˜çº§åŠŸèƒ½ï¼Œéœ€è¦ `ntn`ï¼‰

Workers æ˜¯ç”± Notion æ‰˜ç®¡çš„ TypeScript ç¨‹åºã€‚ä¸€ä¸ª worker å¯ä»¥æš´éœ²ä»¥ä¸‹ä»»æ„ç»„åˆï¼š
- **Syncsï¼ˆåŒæ­¥ï¼‰** â€” æŒ‰è®¡åˆ’ï¼ˆé»˜è®¤ 30 åˆ†é’Ÿï¼‰ä»Žå¤–éƒ¨ API æ‹‰å–æ•°æ®åˆ° Notion æ•°æ®åº“ã€‚
- **Toolsï¼ˆå·¥å…·ï¼‰** â€” åœ¨ Notion çš„ Custom Agents ä¸­ä½œä¸ºå¯è°ƒç”¨å·¥å…·å‡ºçŽ°ã€‚
- **Webhooks** â€” æŽ¥æ”¶æ¥è‡ªå¤–éƒ¨æœåŠ¡ï¼ˆGitHubã€Stripe ç­‰ï¼‰çš„ HTTP äº‹ä»¶å¹¶åœ¨ Notion ä¸­æ‰§è¡Œæ“ä½œã€‚

**å¥—é¤/å¹³å°é™åˆ¶ï¼š**
- CLI åœ¨æ‰€æœ‰å¥—é¤ä¸Šå‡å¯ä½¿ç”¨ã€‚**éƒ¨ç½² Workers éœ€è¦ Business æˆ– Enterprise å¥—é¤ã€‚**
- æˆªè‡³ 2026 å¹´ 5 æœˆï¼Œ`ntn` ä»…æ”¯æŒ macOS/Linuxã€‚Windows ç”¨æˆ·éœ€ä½¿ç”¨ WSL2 æˆ–ç­‰å¾…åŽŸç”Ÿæ”¯æŒã€‚
- 2026 å¹´ 8 æœˆ 11 æ—¥å‰å…è´¹ï¼›ä¹‹åŽæŒ‰ Notion ç§¯åˆ†è®¡è´¹ã€‚

### æœ€ç®€ Worker

```bash
ntn workers new my-worker      # è„šæ‰‹æž¶
cd my-worker
# ç¼–è¾‘ src/index.ts
ntn workers deploy --name my-worker
```

`src/index.ts`ï¼š
```typescript
import { Worker } from "@notionhq/workers";

const worker = new Worker();
export default worker;

worker.tool("greet", {
  title: "Greet a User",
  description: "Returns a friendly greeting",
  inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] },
  execute: async ({ name }) => `Hello, ${name}!`,
});
```

### Webhook èƒ½åŠ›

```typescript
worker.webhook("onGithubPush", {
  title: "GitHub Push Handler",
  execute: async (events, { notion }) => {
    for (const event of events) {
      // event.body, event.rawBodyï¼ˆç”¨äºŽç­¾åéªŒè¯ï¼‰ï¼Œevent.headers
      console.log("got delivery", event.deliveryId);
    }
  },
});
```

éƒ¨ç½²åŽï¼š`ntn workers webhooks list` æ˜¾ç¤º Notion ç”Ÿæˆçš„ URLã€‚å°†è¯¥ URL è§†ä¸ºæœºå¯†â€”â€”é™¤éžæ·»åŠ ç­¾åéªŒè¯ï¼Œå¦åˆ™ä»»ä½•äººéƒ½å¯ä»¥å‘å…¶ POST äº‹ä»¶ã€‚

### Worker ç”Ÿå‘½å‘¨æœŸå‘½ä»¤

```bash
ntn workers deploy
ntn workers list
ntn workers exec <capability-key> -d '{"name": "world"}'
ntn workers sync trigger <key>            # ç«‹å³è¿è¡ŒåŒæ­¥
ntn workers sync pause <key>
ntn workers env set GITHUB_WEBHOOK_SECRET=...
ntn workers runs list                     # æœ€è¿‘çš„è°ƒç”¨è®°å½•
ntn workers runs logs <run-id>
ntn workers webhooks list
```

éœ€è¦æž„å»º Worker æ—¶ï¼Œä½¿ç”¨ `ntn workers new` åˆ›å»ºè„šæ‰‹æž¶ï¼Œåœ¨ `src/index.ts` ä¸­ç¼–å†™ä»£ç ï¼Œé€šè¿‡ `ntn workers env set` è®¾ç½®å¯†é’¥ï¼Œç„¶åŽéƒ¨ç½²ã€‚Notion æ–‡æ¡£ https://developers.notion.com/workers æ¶µç›–å®Œæ•´ API æŽ¥å£ã€‚

## Notion é£Žæ ¼ Markdownï¼ˆç”¨äºŽ `/markdown` ç«¯ç‚¹ï¼‰

æ ‡å‡† CommonMark åŠ ä¸Šç”¨äºŽ Notion ç‰¹å®šå—çš„ç±» XML æ ‡ç­¾ã€‚ç¼©è¿›ä½¿ç”¨**åˆ¶è¡¨ç¬¦ï¼ˆtabï¼‰**ã€‚

**CommonMark ä¹‹å¤–çš„å—ï¼š**
```
<callout icon="ðŸŽ¯" color="blue_bg">
	Ship the MVP by **Friday**.
</callout>

<details color="gray">
<summary>Toggle title</summary>
	Children indented one tab
</details>

<columns>
	<column>Left side</column>
	<column>Right side</column>
</columns>

<table_of_contents color="gray"/>
```

**å†…è”ï¼š**
- æåŠï¼ˆMentionï¼‰ï¼š`<mention-user url="..."/>`ã€`<mention-page url="...">Title</mention-page>`ã€`<mention-date start="2026-05-15"/>`
- ä¸‹åˆ’çº¿ï¼š`<span underline="true">text</span>`
- é¢œè‰²ï¼š`<span color="blue">text</span>`ï¼Œæˆ–å—çº§åˆ«åœ¨ç¬¬ä¸€è¡Œä½¿ç”¨ `{color="blue"}`
- æ•°å­¦å…¬å¼ï¼šå†…è” `$x^2$`ï¼Œå—çº§ `$$ ... $$`
- å¼•ç”¨ï¼š`[^https://example.com]`

**é¢œè‰²ï¼š** `gray brown orange yellow green blue purple pink red`ï¼Œä»¥åŠå¸¦ `*_bg` åŽç¼€çš„èƒŒæ™¯è‰²å˜ä½“ã€‚

5/6 çº§æ ‡é¢˜ä¼šæŠ˜å ä¸º H4ã€‚å¤šä¸ªè¿žç»­ `>` è¡Œæ¸²æŸ“ä¸ºç‹¬ç«‹å¼•ç”¨å—â€”â€”åœ¨å•ä¸ª `>` å†…ä½¿ç”¨ `<br>` å®žçŽ°å¤šè¡Œå¼•ç”¨ã€‚

## é€‰æ‹©åˆé€‚çš„è·¯å¾„

| ä»»åŠ¡ | macOS / Linux | Windows |
|---|---|---|
| è¯»å†™é¡µé¢ã€æœç´¢ã€æŸ¥è¯¢æ•°æ®åº“ | `ntn api ...` | curl |
| è¯»å–é¡µé¢ä¾› agent æ‘˜è¦ | `ntn api v1/pages/{id}/markdown` | curl `/markdown` ç«¯ç‚¹ |
| ä¸Šä¼ æ–‡ä»¶ | `ntn files create < file` | ä¸‰æ­¥ HTTP æµç¨‹ |
| ä¸€æ¬¡æ€§ API æŽ¢ç´¢ | `ntn api ...` | curl |
| æž„å»ºç”± Notion æ‰˜ç®¡çš„åŒæ­¥/webhook/agent å·¥å…· | `ntn workers ...` | WSL2 + `ntn workers ...` |

## æ³¨æ„äº‹é¡¹

- é¡µé¢/æ•°æ®åº“ ID ä¸º UUID æ ¼å¼ï¼ˆå¸¦æˆ–ä¸å¸¦è¿žå­—ç¬¦å‡å¯æŽ¥å—ï¼‰ã€‚
- é€ŸçŽ‡é™åˆ¶ï¼šå¹³å‡çº¦ 3 æ¬¡è¯·æ±‚/ç§’ã€‚CLI ä¸ä¼šç»•è¿‡æ­¤é™åˆ¶ã€‚
- API æ— æ³•è®¾ç½®æ•°æ®åº“**è§†å›¾**è¿‡æ»¤å™¨â€”â€”è¯¥åŠŸèƒ½ä»…é™ UI æ“ä½œã€‚
- åˆ›å»º data sources æ—¶ä½¿ç”¨ `"is_inline": true` å¯å°†å…¶åµŒå…¥é¡µé¢ã€‚
- å§‹ç»ˆä¸º curl ä¼ å…¥ `-s` ä»¥æŠ‘åˆ¶è¿›åº¦æ¡ï¼ˆä½¿ agent è¾“å‡ºæ›´æ•´æ´ï¼‰ã€‚
- è¯»å–æ•°æ®æ—¶é€šè¿‡ `jq` ç®¡é“å¤„ç†ï¼š`... | jq '.results[0].properties'`ã€‚
- Notion çŽ°å·²æŽ¨å‡º MCP æœåŠ¡å™¨ï¼ˆ`Notion MCP`ï¼Œåœ¨æ•°æ®åº“æ“ä½œä¸Šæ¯”ä¸Šä¸€ç‰ˆæœ¬çš„ token æ•ˆçŽ‡æå‡çº¦ 91%ï¼‰â€”â€”å¦‚éœ€åœ¨ä¼šè¯ä¸­è¿›è¡Œæµå¼ Notion è®¿é—®ï¼Œå¯é€šè¿‡ Zed çš„ MCP æ”¯æŒæŽ¥å…¥ï¼Œä½†ä¸Šè¿°è·¯å¾„å·²è¶³ä»¥åº”å¯¹å¤§å¤šæ•°ä¸€æ¬¡æ€§ä»»åŠ¡ã€‚
