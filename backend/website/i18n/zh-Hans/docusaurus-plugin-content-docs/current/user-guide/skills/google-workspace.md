---
sidebar_position: 2
sidebar_label: "Google Workspace"
title: "Google Workspace â€” Gmailã€Calendarã€Driveã€Sheets ä¸Ž Docs"
description: "é€šè¿‡ OAuth2 è®¤è¯çš„ Google APIï¼Œå‘é€é‚®ä»¶ã€ç®¡ç†æ—¥åŽ†äº‹ä»¶ã€æœç´¢ Driveã€è¯»å†™ Sheets å¹¶è®¿é—® Docs"
---

# Google Workspace Skill

Gmailã€Calendarã€Driveã€Contactsã€Sheets å’Œ Docs ä¸Ž Zed çš„é›†æˆã€‚ä½¿ç”¨ OAuth2 å¹¶æ”¯æŒè‡ªåŠ¨åˆ·æ–° tokenï¼ˆä»¤ç‰Œï¼‰ã€‚ä¼˜å…ˆä½¿ç”¨ [Google Workspace CLIï¼ˆ`gws`ï¼‰](https://github.com/nicholasgasior/gws)ï¼ˆå¦‚å·²å®‰è£…ï¼‰ä»¥èŽ·å¾—æ›´å¹¿æ³›çš„è¦†ç›–ï¼Œå¦åˆ™å›žé€€åˆ° Google çš„ Python å®¢æˆ·ç«¯åº“ã€‚

**Skill è·¯å¾„ï¼š** `skills/productivity/google-workspace/`

## é…ç½®

é…ç½®æµç¨‹å®Œå…¨ç”± Agent é©±åŠ¨â€”â€”è®© Zed è®¾ç½® Google Workspaceï¼Œå®ƒä¼šå¼•å¯¼ä½ å®Œæˆæ¯ä¸ªæ­¥éª¤ã€‚æµç¨‹å¦‚ä¸‹ï¼š

1. **åˆ›å»º Google Cloud é¡¹ç›®**å¹¶å¯ç”¨æ‰€éœ€ APIï¼ˆGmailã€Calendarã€Driveã€Sheetsã€Docsã€Peopleï¼‰
2. **åˆ›å»º OAuth 2.0 å‡­æ®**ï¼ˆDesktop app ç±»åž‹ï¼‰å¹¶ä¸‹è½½å®¢æˆ·ç«¯å¯†é’¥ JSON
3. **æŽˆæƒ**â€”â€”Zed ç”ŸæˆæŽˆæƒ URLï¼Œä½ åœ¨æµè§ˆå™¨ä¸­æ‰¹å‡†ï¼Œç„¶åŽå°†é‡å®šå‘ URL ç²˜è´´å›žæ¥
4. **å®Œæˆ**â€”â€”token ä»Žæ­¤è‡ªåŠ¨åˆ·æ–°

:::tip ä»…éœ€é‚®ä»¶çš„ç”¨æˆ·
å¦‚æžœä½ åªéœ€è¦é‚®ä»¶åŠŸèƒ½ï¼ˆæ— éœ€ Calendar/Drive/Sheetsï¼‰ï¼Œè¯·æ”¹ç”¨ **himalaya** skillâ€”â€”å®ƒä½¿ç”¨ Gmail åº”ç”¨ä¸“ç”¨å¯†ç ï¼Œåªéœ€ 2 åˆ†é’Ÿå³å¯å®Œæˆé…ç½®ï¼Œæ— éœ€ Google Cloud é¡¹ç›®ã€‚
:::

## Gmail

### æœç´¢

```bash
$GAPI gmail search "is:unread" --max 10
$GAPI gmail search "from:boss@company.com newer_than:1d"
$GAPI gmail search "has:attachment filename:pdf newer_than:7d"
```

è¿”å›ž JSONï¼Œæ¯æ¡æ¶ˆæ¯åŒ…å« `id`ã€`from`ã€`subject`ã€`date`ã€`snippet` å’Œ `labels` å­—æ®µã€‚

### è¯»å–

```bash
$GAPI gmail get MESSAGE_ID
```

ä»¥æ–‡æœ¬å½¢å¼è¿”å›žå®Œæ•´æ¶ˆæ¯æ­£æ–‡ï¼ˆä¼˜å…ˆçº¯æ–‡æœ¬ï¼Œå›žé€€åˆ° HTMLï¼‰ã€‚

### å‘é€

```bash
# åŸºæœ¬å‘é€
$GAPI gmail send --to user@example.com --subject "Hello" --body "Message text"

# HTML é‚®ä»¶
$GAPI gmail send --to user@example.com --subject "Report" \
  --body "<h1>Q4 Results</h1><p>Details here</p>" --html

# è‡ªå®šä¹‰ From å¤´ï¼ˆæ˜¾ç¤ºåç§° + é‚®ç®±ï¼‰
$GAPI gmail send --to user@example.com --subject "Hello" \
  --from '"Research Agent" <user@example.com>' --body "Message text"

# å¸¦ CC
$GAPI gmail send --to user@example.com --cc "team@example.com" \
  --subject "Update" --body "FYI"
```

### è‡ªå®šä¹‰ From å¤´

`--from` æ ‡å¿—å…è®¸ä½ è‡ªå®šä¹‰å¤–å‘é‚®ä»¶çš„å‘ä»¶äººæ˜¾ç¤ºåç§°ã€‚å½“å¤šä¸ª Agent å…±äº«åŒä¸€ä¸ª Gmail è´¦æˆ·ä½†å¸Œæœ›æ”¶ä»¶äººçœ‹åˆ°ä¸åŒåç§°æ—¶ï¼Œæ­¤åŠŸèƒ½éžå¸¸æœ‰ç”¨ï¼š

```bash
# Agent 1
$GAPI gmail send --to client@co.com --subject "Research Summary" \
  --from '"Research Agent" <shared@company.com>' --body "..."

# Agent 2  
$GAPI gmail send --to client@co.com --subject "Code Review" \
  --from '"Code Assistant" <shared@company.com>' --body "..."
```

**å·¥ä½œåŽŸç†ï¼š** `--from` çš„å€¼ä¼šè¢«è®¾ç½®ä¸º MIME æ¶ˆæ¯çš„ RFC 5322 `From` å¤´ã€‚Gmail å…è®¸åœ¨å·²è®¤è¯çš„é‚®ç®±åœ°å€ä¸Šè‡ªå®šä¹‰æ˜¾ç¤ºåç§°ï¼Œæ— éœ€ä»»ä½•é¢å¤–é…ç½®ã€‚æ”¶ä»¶äººçœ‹åˆ°çš„æ˜¯è‡ªå®šä¹‰æ˜¾ç¤ºåç§°ï¼ˆå¦‚"Research Agent"ï¼‰ï¼Œè€Œé‚®ç®±åœ°å€ä¿æŒä¸å˜ã€‚

**é‡è¦æç¤ºï¼š** å¦‚æžœä½ åœ¨ `--from` ä¸­ä½¿ç”¨*ä¸åŒçš„é‚®ç®±åœ°å€*ï¼ˆéžå·²è®¤è¯è´¦æˆ·ï¼‰ï¼ŒGmail è¦æ±‚è¯¥åœ°å€åœ¨ Gmail è®¾ç½® â†’ è´¦æˆ· â†’ ä»¥å…¶ä»–åœ°å€å‘é€é‚®ä»¶ä¸­é…ç½®ä¸º [Send As åˆ«å](https://support.google.com/mail/answer/22370)ã€‚

`--from` æ ‡å¿—åŒæ—¶é€‚ç”¨äºŽ `send` å’Œ `reply`ï¼š

```bash
$GAPI gmail reply MESSAGE_ID \
  --from '"Support Bot" <shared@company.com>' --body "We're on it"
```

### å›žå¤

```bash
$GAPI gmail reply MESSAGE_ID --body "Thanks, that works for me."
```

è‡ªåŠ¨å°†å›žå¤å½’å…¥åŒä¸€ä¼šè¯ï¼ˆè®¾ç½® `In-Reply-To` å’Œ `References` å¤´ï¼‰ï¼Œå¹¶ä½¿ç”¨åŽŸå§‹æ¶ˆæ¯çš„ thread IDã€‚

### æ ‡ç­¾

```bash
# åˆ—å‡ºæ‰€æœ‰æ ‡ç­¾
$GAPI gmail labels

# æ·»åŠ /ç§»é™¤æ ‡ç­¾
$GAPI gmail modify MESSAGE_ID --add-labels LABEL_ID
$GAPI gmail modify MESSAGE_ID --remove-labels UNREAD
```

## Calendar

```bash
# åˆ—å‡ºäº‹ä»¶ï¼ˆé»˜è®¤ä¸ºæœªæ¥ 7 å¤©ï¼‰
$GAPI calendar list
$GAPI calendar list --start 2026-03-01T00:00:00Z --end 2026-03-07T23:59:59Z

# åˆ›å»ºäº‹ä»¶ï¼ˆå¿…é¡»æŒ‡å®šæ—¶åŒºï¼‰
$GAPI calendar create --summary "Team Standup" \
  --start 2026-03-01T10:00:00-07:00 --end 2026-03-01T10:30:00-07:00

# å¸¦åœ°ç‚¹å’Œå‚ä¸Žè€…
$GAPI calendar create --summary "Lunch" \
  --start 2026-03-01T12:00:00Z --end 2026-03-01T13:00:00Z \
  --location "Cafe" --attendees "alice@co.com,bob@co.com"

# åˆ é™¤äº‹ä»¶
$GAPI calendar delete EVENT_ID
```

:::warning
Calendar æ—¶é—´**å¿…é¡»**åŒ…å«æ—¶åŒºåç§»ï¼ˆå¦‚ `-07:00`ï¼‰æˆ–ä½¿ç”¨ UTCï¼ˆ`Z`ï¼‰ã€‚ä¸å¸¦æ—¶åŒºçš„è£¸æ—¥æœŸæ—¶é—´ï¼ˆå¦‚ `2026-03-01T10:00:00`ï¼‰å­˜åœ¨æ­§ä¹‰ï¼Œå°†è¢«è§†ä¸º UTC å¤„ç†ã€‚
:::

## Drive

```bash
$GAPI drive search "quarterly report" --max 10
$GAPI drive search "mimeType='application/pdf'" --raw-query --max 5
```

## Sheets

```bash
# è¯»å–èŒƒå›´
$GAPI sheets get SHEET_ID "Sheet1!A1:D10"

# å†™å…¥èŒƒå›´
$GAPI sheets update SHEET_ID "Sheet1!A1:B2" --values '[["Name","Score"],["Alice","95"]]'

# è¿½åŠ è¡Œ
$GAPI sheets append SHEET_ID "Sheet1!A:C" --values '[["new","row","data"]]'
```

## Docs

```bash
$GAPI docs get DOC_ID
```

è¿”å›žæ–‡æ¡£æ ‡é¢˜å’Œå®Œæ•´æ–‡æœ¬å†…å®¹ã€‚

## Contacts

```bash
$GAPI contacts list --max 20
```

## è¾“å‡ºæ ¼å¼

æ‰€æœ‰å‘½ä»¤å‡è¿”å›ž JSONã€‚å„æœåŠ¡çš„å…³é”®å­—æ®µï¼š

| å‘½ä»¤ | å­—æ®µ |
|---------|--------|
| `gmail search` | `id`ã€`threadId`ã€`from`ã€`to`ã€`subject`ã€`date`ã€`snippet`ã€`labels` |
| `gmail get` | `id`ã€`threadId`ã€`from`ã€`to`ã€`subject`ã€`date`ã€`labels`ã€`body` |
| `gmail send/reply` | `status`ã€`id`ã€`threadId` |
| `calendar list` | `id`ã€`summary`ã€`start`ã€`end`ã€`location`ã€`description`ã€`htmlLink` |
| `calendar create` | `status`ã€`id`ã€`summary`ã€`htmlLink` |
| `drive search` | `id`ã€`name`ã€`mimeType`ã€`modifiedTime`ã€`webViewLink` |
| `contacts list` | `name`ã€`emails`ã€`phones` |
| `sheets get` | å•å…ƒæ ¼å€¼çš„äºŒç»´æ•°ç»„ |

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | è§£å†³æ–¹æ³• |
|---------|-----|
| `NOT_AUTHENTICATED` | è¿è¡Œé…ç½®ï¼ˆè®© Zed è®¾ç½® Google Workspaceï¼‰ |
| `REFRESH_FAILED` | Token å·²è¢«æ’¤é”€â€”â€”é‡æ–°æ‰§è¡ŒæŽˆæƒæ­¥éª¤ |
| `HttpError 403: Insufficient Permission` | ç¼ºå°‘ scopeï¼ˆæƒé™èŒƒå›´ï¼‰â€”â€”æ’¤é”€å¹¶ä»¥æ­£ç¡®çš„æœåŠ¡é‡æ–°æŽˆæƒ |
| `HttpError 403: Access Not Configured` | API æœªåœ¨ Google Cloud Console ä¸­å¯ç”¨ |
| `ModuleNotFoundError` | ä½¿ç”¨ `--install-deps` è¿è¡Œé…ç½®è„šæœ¬ |