---
title: "Google Workspace â€” é€šè¿‡ gws CLI æˆ– Python ä½¿ç”¨ Gmailã€Calendarã€Driveã€Docsã€Sheets"
sidebar_label: "Google Workspace"
description: "é€šè¿‡ gws CLI æˆ– Python ä½¿ç”¨ Gmailã€Calendarã€Driveã€Docsã€Sheets"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Google Workspace

é€šè¿‡ gws CLI æˆ– Python ä½¿ç”¨ Gmailã€Calendarã€Driveã€Docsã€Sheetsã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/productivity/google-workspace` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | Zed Team |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Google`, `Gmail`, `Calendar`, `Drive`, `Sheets`, `Docs`, `Contacts`, `Email`, `OAuth` |
| ç›¸å…³ skill | [`himalaya`](/user-guide/skills/bundled/email/email-himalaya) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Google Workspace

Gmailã€Calendarã€Driveã€Contactsã€Sheets å’Œ Docs â€”â€” é€šè¿‡ Zed ç®¡ç†çš„ OAuthï¼ˆå¼€æ”¾æŽˆæƒï¼‰å’Œè½»é‡ CLI å°è£…å™¨å®žçŽ°ã€‚è‹¥å·²å®‰è£… `gws`ï¼Œè¯¥ skill å°†ä»¥å…¶ä½œä¸ºæ‰§è¡ŒåŽç«¯ä»¥èŽ·å¾—æ›´å¹¿æ³›çš„ Google Workspace è¦†ç›–ï¼›å¦åˆ™å›žé€€åˆ°å†…ç½®çš„ Python å®¢æˆ·ç«¯å®žçŽ°ã€‚

## å‚è€ƒèµ„æ–™

- `references/gmail-search-syntax.md` â€”â€” Gmail æœç´¢è¿ç®—ç¬¦ï¼ˆis:unreadã€from:ã€newer_than: ç­‰ï¼‰

## è„šæœ¬

- `scripts/setup.py` â€”â€” OAuth2 è®¾ç½®ï¼ˆè¿è¡Œä¸€æ¬¡ä»¥å®ŒæˆæŽˆæƒï¼‰
- `scripts/google_api.py` â€”â€” å…¼å®¹æ€§å°è£… CLIã€‚åœ¨å¯ç”¨æ—¶ä¼˜å…ˆä½¿ç”¨ `gws` æ‰§è¡Œæ“ä½œï¼ŒåŒæ—¶ä¿ç•™ Zed çŽ°æœ‰çš„ JSON è¾“å‡ºå¥‘çº¦ã€‚

## é¦–æ¬¡è®¾ç½®

è®¾ç½®è¿‡ç¨‹å®Œå…¨éžäº¤äº’å¼ â€”â€” ä½ é€æ­¥é©±åŠ¨å®ƒï¼Œä½¿å…¶åœ¨ CLIã€Telegramã€Discord æˆ–ä»»ä½•å¹³å°ä¸Šå‡å¯æ­£å¸¸å·¥ä½œã€‚

é¦–å…ˆå®šä¹‰ä¸€ä¸ªç®€å†™ï¼š

```bash
GSETUP="python ${ZED_HOME:-$HOME/.zed}/skills/productivity/google-workspace/scripts/setup.py"
```

### æ­¥éª¤ 0ï¼šæ£€æŸ¥æ˜¯å¦å·²å®Œæˆè®¾ç½®

```bash
$GSETUP --check
```

è‹¥è¾“å‡º `AUTHENTICATED`ï¼Œè·³è‡³ã€Œä½¿ç”¨æ–¹æ³•ã€â€”â€” è®¾ç½®å·²å®Œæˆã€‚

### æ­¥éª¤ 1ï¼šåˆ†æµ â€”â€” è¯¢é—®ç”¨æˆ·éœ€æ±‚

åœ¨å¼€å§‹ OAuth è®¾ç½®ä¹‹å‰ï¼Œå‘ç”¨æˆ·æå‡º**ä¸¤ä¸ª**é—®é¢˜ï¼š

**é—®é¢˜ 1ï¼š"ä½ éœ€è¦å“ªäº› Google æœåŠ¡ï¼Ÿä»…éœ€é‚®ä»¶ï¼Œè¿˜æ˜¯è¿˜éœ€è¦ Calendar/Drive/Sheets/Docsï¼Ÿ"**

- **ä»…é‚®ä»¶** â†’ æ ¹æœ¬ä¸éœ€è¦æ­¤ skillã€‚æ”¹ç”¨ `himalaya` skill â€”â€” å®ƒé€šè¿‡ Gmail åº”ç”¨ä¸“ç”¨å¯†ç ï¼ˆè®¾ç½® â†’ å®‰å…¨ â†’ åº”ç”¨ä¸“ç”¨å¯†ç ï¼‰å·¥ä½œï¼Œ2 åˆ†é’Ÿå³å¯å®Œæˆè®¾ç½®ï¼Œæ— éœ€ Google Cloud é¡¹ç›®ã€‚åŠ è½½ himalaya skill å¹¶æŒ‰å…¶è®¾ç½®è¯´æ˜Žæ“ä½œã€‚

- **é‚®ä»¶ + Calendar** â†’ ç»§ç»­ä½¿ç”¨æ­¤ skillï¼Œä½†åœ¨æŽˆæƒæ—¶ä½¿ç”¨ `--services email,calendar`ï¼Œä½¿åŒæ„ç•Œé¢ä»…è¯·æ±‚å®žé™…éœ€è¦çš„æƒé™èŒƒå›´ï¼ˆscopeï¼‰ã€‚

- **ä»… Calendar/Drive/Sheets/Docs** â†’ ç»§ç»­ä½¿ç”¨æ­¤ skillï¼Œå¹¶ä½¿ç”¨æ›´çª„çš„ `--services` é›†åˆï¼Œå¦‚ `calendar,drive,sheets,docs`ã€‚

- **å®Œæ•´ Workspace è®¿é—®** â†’ ç»§ç»­ä½¿ç”¨æ­¤ skillï¼Œå¹¶ä½¿ç”¨é»˜è®¤çš„ `all` æœåŠ¡é›†åˆã€‚

**é—®é¢˜ 2ï¼š"ä½ çš„ Google è´¦å·æ˜¯å¦å¯ç”¨äº†é«˜çº§ä¿æŠ¤ï¼ˆç™»å½•æ—¶éœ€è¦ç¡¬ä»¶å®‰å…¨å¯†é’¥ï¼‰ï¼Ÿå¦‚æžœä¸ç¡®å®šï¼Œå¾ˆå¯èƒ½æ²¡æœ‰ â€”â€” è¿™æ˜¯éœ€è¦ä½ ä¸»åŠ¨æ³¨å†Œçš„åŠŸèƒ½ã€‚"**

- **å¦ / ä¸ç¡®å®š** â†’ æ­£å¸¸è®¾ç½®ï¼Œç»§ç»­ä»¥ä¸‹æ­¥éª¤ã€‚
- **æ˜¯** â†’ å…¶ Workspace ç®¡ç†å‘˜å¿…é¡»å…ˆå°† OAuth å®¢æˆ·ç«¯ ID æ·»åŠ åˆ°ç»„ç»‡çš„å…è®¸åº”ç”¨åˆ—è¡¨ï¼Œæ­¥éª¤ 4 æ‰èƒ½æˆåŠŸã€‚è¯·æå‰å‘ŠçŸ¥ç”¨æˆ·ã€‚

### æ­¥éª¤ 2ï¼šåˆ›å»º OAuth å‡­æ®ï¼ˆä¸€æ¬¡æ€§ï¼Œçº¦ 5 åˆ†é’Ÿï¼‰

å‘ŠçŸ¥ç”¨æˆ·ï¼š

> ä½ éœ€è¦ä¸€ä¸ª Google Cloud OAuth å®¢æˆ·ç«¯ã€‚è¿™æ˜¯ä¸€æ¬¡æ€§è®¾ç½®ï¼š
>
> 1. åˆ›å»ºæˆ–é€‰æ‹©ä¸€ä¸ªé¡¹ç›®ï¼š
>    https://console.cloud.google.com/projectselector2/home/dashboard
> 2. åœ¨ API åº“ä¸­å¯ç”¨æ‰€éœ€ APIï¼š
>    https://console.cloud.google.com/apis/library
>    å¯ç”¨ï¼šGmail APIã€Google Calendar APIã€Google Drive APIã€
>    Google Sheets APIã€Google Docs APIã€People API
> 3. åœ¨æ­¤å¤„åˆ›å»º OAuth å®¢æˆ·ç«¯ï¼š
>    https://console.cloud.google.com/apis/credentials
>    å‡­æ® â†’ åˆ›å»ºå‡­æ® â†’ OAuth 2.0 å®¢æˆ·ç«¯ ID
> 4. åº”ç”¨ç±»åž‹é€‰æ‹©ã€Œæ¡Œé¢åº”ç”¨ã€â†’ åˆ›å»º
> 5. è‹¥åº”ç”¨ä»å¤„äºŽæµ‹è¯•çŠ¶æ€ï¼Œåœ¨æ­¤å¤„å°†ç”¨æˆ·çš„ Google è´¦å·æ·»åŠ ä¸ºæµ‹è¯•ç”¨æˆ·ï¼š
>    https://console.cloud.google.com/auth/audience
>    å—ä¼—ç¾¤ä½“ â†’ æµ‹è¯•ç”¨æˆ· â†’ æ·»åŠ ç”¨æˆ·
> 6. ä¸‹è½½ JSON æ–‡ä»¶å¹¶å‘Šè¯‰æˆ‘æ–‡ä»¶è·¯å¾„
>
> Zed CLI é‡è¦æç¤ºï¼šè‹¥æ–‡ä»¶è·¯å¾„ä»¥ `/` å¼€å¤´ï¼Œè¯·å‹¿åœ¨ CLI ä¸­å•ç‹¬å‘é€è¯¥è£¸è·¯å¾„ï¼Œå› ä¸ºå®ƒå¯èƒ½è¢«è¯¯è¯†åˆ«ä¸ºæ–œæ å‘½ä»¤ã€‚è¯·å°†å…¶æ”¾åœ¨å¥å­ä¸­å‘é€ï¼Œä¾‹å¦‚ï¼š
> `The JSON file path is: /home/user/Downloads/client_secret_....json`

ç”¨æˆ·æä¾›è·¯å¾„åŽï¼š

```bash
$GSETUP --client-secret /path/to/client_secret.json
```

è‹¥ç”¨æˆ·ç²˜è´´çš„æ˜¯åŽŸå§‹å®¢æˆ·ç«¯ ID / å®¢æˆ·ç«¯å¯†é’¥å€¼è€Œéžæ–‡ä»¶è·¯å¾„ï¼Œè¯·è‡ªè¡Œä¸ºå…¶ç¼–å†™ä¸€ä¸ªæœ‰æ•ˆçš„æ¡Œé¢ OAuth JSON æ–‡ä»¶ï¼Œä¿å­˜åˆ°æ˜Žç¡®çš„ä½ç½®ï¼ˆä¾‹å¦‚ `~/Downloads/zed-google-client-secret.json`ï¼‰ï¼Œç„¶åŽå¯¹è¯¥æ–‡ä»¶è¿è¡Œ `--client-secret`ã€‚

### æ­¥éª¤ 3ï¼šèŽ·å–æŽˆæƒ URL

ä½¿ç”¨æ­¥éª¤ 1 ä¸­é€‰æ‹©çš„æœåŠ¡é›†åˆã€‚ç¤ºä¾‹ï¼š

```bash
$GSETUP --auth-url --services email,calendar --format json
$GSETUP --auth-url --services calendar,drive,sheets,docs --format json
$GSETUP --auth-url --services all --format json
```

æ­¤å‘½ä»¤è¿”å›žåŒ…å« `auth_url` å­—æ®µçš„ JSONï¼Œå¹¶å°†è¯¥ URL ä¿å­˜è‡³ `~/.zed/google_oauth_last_url.txt`ã€‚

æœ¬æ­¥éª¤çš„ Agent è§„åˆ™ï¼š
- æå– `auth_url` å­—æ®µï¼Œå°†è¯¥ç¡®åˆ‡ URL ä»¥å•è¡Œå½¢å¼å‘é€ç»™ç”¨æˆ·ã€‚
- å‘ŠçŸ¥ç”¨æˆ·ï¼Œæ‰¹å‡†åŽæµè§ˆå™¨å¾ˆå¯èƒ½ä¼šåœ¨ `http://localhost:1` ä¸Šå¤±è´¥ï¼Œè¿™æ˜¯é¢„æœŸè¡Œä¸ºã€‚
- å‘ŠçŸ¥ç”¨æˆ·ä»Žæµè§ˆå™¨åœ°å€æ å¤åˆ¶**å®Œæ•´**çš„é‡å®šå‘ URLã€‚
- è‹¥ç”¨æˆ·æ”¶åˆ° `Error 403: access_denied`ï¼Œç›´æŽ¥å°†å…¶å¼•å¯¼è‡³ `https://console.cloud.google.com/auth/audience` ä»¥æ·»åŠ è‡ªå·±ä¸ºæµ‹è¯•ç”¨æˆ·ã€‚

### æ­¥éª¤ 4ï¼šäº¤æ¢æŽˆæƒç 

ç”¨æˆ·å°†ç²˜è´´å›žå½¢å¦‚ `http://localhost:1/?code=4/0A...&scope=...` çš„ URL æˆ–ä»…ç²˜è´´æŽˆæƒç å­—ç¬¦ä¸²ï¼Œä¸¤è€…å‡å¯ã€‚`--auth-url` æ­¥éª¤ä¼šåœ¨æœ¬åœ°å­˜å‚¨ä¸€ä¸ªä¸´æ—¶å¾…å¤„ç†çš„ OAuth ä¼šè¯ï¼Œä»¥ä¾¿ `--auth-code` ç¨åŽå®Œæˆ PKCE äº¤æ¢ï¼Œå³ä½¿åœ¨æ— å¤´ç³»ç»Ÿä¸Šä¹Ÿå¯æ­£å¸¸å·¥ä½œï¼š

```bash
$GSETUP --auth-code "THE_URL_OR_CODE_THE_USER_PASTED" --format json
```

è‹¥ `--auth-code` å› æŽˆæƒç è¿‡æœŸã€å·²è¢«ä½¿ç”¨æˆ–æ¥è‡ªæ—§æµè§ˆå™¨æ ‡ç­¾é¡µè€Œå¤±è´¥ï¼Œå®ƒçŽ°åœ¨ä¼šè¿”å›žä¸€ä¸ªæ–°çš„ `fresh_auth_url`ã€‚åœ¨è¿™ç§æƒ…å†µä¸‹ï¼Œç«‹å³å°†æ–° URL å‘é€ç»™ç”¨æˆ·ï¼Œå¹¶è®©å…¶ä»…ä½¿ç”¨æœ€æ–°çš„æµè§ˆå™¨é‡å®šå‘é‡è¯•ã€‚

### æ­¥éª¤ 5ï¼šéªŒè¯

```bash
$GSETUP --check
```

åº”è¾“å‡º `AUTHENTICATED`ã€‚è®¾ç½®å®Œæˆ â€”â€” æ­¤åŽ tokenï¼ˆä»¤ç‰Œï¼‰å°†è‡ªåŠ¨åˆ·æ–°ã€‚

### æ³¨æ„äº‹é¡¹

- Token å­˜å‚¨äºŽ `~/.zed/google_token.json`ï¼Œè‡ªåŠ¨åˆ·æ–°ã€‚
- å¾…å¤„ç†çš„ OAuth ä¼šè¯çŠ¶æ€/éªŒè¯å™¨ä¸´æ—¶å­˜å‚¨äºŽ `~/.zed/google_oauth_pending.json`ï¼Œç›´è‡³äº¤æ¢å®Œæˆã€‚
- è‹¥å·²å®‰è£… `gws`ï¼Œ`google_api.py` ä¼šå°†å…¶æŒ‡å‘åŒä¸€ä¸ª `~/.zed/google_token.json` å‡­æ®æ–‡ä»¶ã€‚ç”¨æˆ·æ— éœ€å•ç‹¬è¿è¡Œ `gws auth login` æµç¨‹ã€‚
- æ’¤é”€æŽˆæƒï¼š`$GSETUP --revoke`

## ä½¿ç”¨æ–¹æ³•

æ‰€æœ‰å‘½ä»¤å‡é€šè¿‡ API è„šæœ¬æ‰§è¡Œã€‚å°† `GAPI` è®¾ä¸ºç®€å†™ï¼š

```bash
GAPI="python ${ZED_HOME:-$HOME/.zed}/skills/productivity/google-workspace/scripts/google_api.py"
```

### Gmail

```bash
# æœç´¢ï¼ˆè¿”å›žåŒ…å« idã€fromã€subjectã€dateã€snippet çš„ JSON æ•°ç»„ï¼‰
$GAPI gmail search "is:unread" --max 10
$GAPI gmail search "from:boss@company.com newer_than:1d"
$GAPI gmail search "has:attachment filename:pdf newer_than:7d"

# è¯»å–å®Œæ•´é‚®ä»¶ï¼ˆè¿”å›žåŒ…å«æ­£æ–‡æ–‡æœ¬çš„ JSONï¼‰
$GAPI gmail get MESSAGE_ID

# å‘é€
$GAPI gmail send --to user@example.com --subject "Hello" --body "Message text"
$GAPI gmail send --to user@example.com --subject "Report" --body "<h1>Q4</h1><p>Details...</p>" --html
$GAPI gmail send --to user@example.com --subject "Hello" --from '"Research Agent" <user@example.com>' --body "Message text"

# å›žå¤ï¼ˆè‡ªåŠ¨å½’å…¥åŒä¸€ä¼šè¯çº¿ç¨‹å¹¶è®¾ç½® In-Reply-Toï¼‰
$GAPI gmail reply MESSAGE_ID --body "Thanks, that works for me."
$GAPI gmail reply MESSAGE_ID --from '"Support Bot" <user@example.com>' --body "Thanks"

# æ ‡ç­¾
$GAPI gmail labels
$GAPI gmail modify MESSAGE_ID --add-labels LABEL_ID
$GAPI gmail modify MESSAGE_ID --remove-labels UNREAD
```

### Calendar

```bash
# åˆ—å‡ºäº‹ä»¶ï¼ˆé»˜è®¤ä¸ºæœªæ¥ 7 å¤©ï¼‰
$GAPI calendar list
$GAPI calendar list --start 2026-03-01T00:00:00Z --end 2026-03-07T23:59:59Z

# åˆ›å»ºäº‹ä»¶ï¼ˆéœ€è¦å¸¦æ—¶åŒºçš„ ISO 8601 æ ¼å¼ï¼‰
$GAPI calendar create --summary "Team Standup" --start 2026-03-01T10:00:00-06:00 --end 2026-03-01T10:30:00-06:00
$GAPI calendar create --summary "Lunch" --start 2026-03-01T12:00:00Z --end 2026-03-01T13:00:00Z --location "Cafe"
$GAPI calendar create --summary "Review" --start 2026-03-01T14:00:00Z --end 2026-03-01T15:00:00Z --attendees "alice@co.com,bob@co.com"

# åˆ é™¤äº‹ä»¶
$GAPI calendar delete EVENT_ID
```

### Drive

```bash
# æœç´¢çŽ°æœ‰æ–‡ä»¶
$GAPI drive search "quarterly report" --max 10
$GAPI drive search "mimeType='application/pdf'" --raw-query --max 5

# èŽ·å–å•ä¸ªæ–‡ä»¶çš„å…ƒæ•°æ®
$GAPI drive get FILE_ID

# ä¸Šä¼ æœ¬åœ°æ–‡ä»¶ï¼ˆè‡ªåŠ¨æ£€æµ‹ MIME ç±»åž‹ï¼‰
$GAPI drive upload /path/to/report.pdf
$GAPI drive upload /path/to/image.png --name "Logo.png" --parent FOLDER_ID

# ä¸‹è½½ï¼ˆäºŒè¿›åˆ¶æ–‡ä»¶åŽŸæ ·ä¸‹è½½ï¼›Google åŽŸç”Ÿæ–‡ä»¶å¯¼å‡ºä¸ºåˆç†çš„é»˜è®¤æ ¼å¼ â€”â€”
# Docsâ†’pdfã€Sheetsâ†’csvã€Slidesâ†’pdfã€Drawingsâ†’pngï¼‰
$GAPI drive download FILE_ID
$GAPI drive download DOC_ID --output ~/doc.pdf
$GAPI drive download DOC_ID --export-mime text/plain --output ~/doc.txt

# åˆ›å»ºæ–‡ä»¶å¤¹
$GAPI drive create-folder "Reports"
$GAPI drive create-folder "Q4" --parent FOLDER_ID

# å…±äº«
$GAPI drive share FILE_ID --email alice@example.com --role reader
$GAPI drive share FILE_ID --email alice@example.com --role writer --notify
$GAPI drive share FILE_ID --type anyone --role reader        # ä»»ä½•æ‹¥æœ‰é“¾æŽ¥çš„äºº
$GAPI drive share FILE_ID --type domain --domain example.com --role reader

# åˆ é™¤ â€”â€” é»˜è®¤ç§»è‡³å›žæ”¶ç«™ï¼ˆå¯æ¢å¤ï¼‰ã€‚ä½¿ç”¨ --permanent è·³è¿‡å›žæ”¶ç«™ã€‚
$GAPI drive delete FILE_ID
$GAPI drive delete FILE_ID --permanent
```

### Contacts

```bash
$GAPI contacts list --max 20
```

### Sheets

```bash
# åˆ›å»ºæ–°ç”µå­è¡¨æ ¼
$GAPI sheets create --title "Q4 Budget"
$GAPI sheets create --title "Inventory" --sheet-name "Stock"

# è¯»å–
$GAPI sheets get SHEET_ID "Sheet1!A1:D10"

# å†™å…¥
$GAPI sheets update SHEET_ID "Sheet1!A1:B2" --values '[["Name","Score"],["Alice","95"]]'

# è¿½åŠ è¡Œ
$GAPI sheets append SHEET_ID "Sheet1!A:C" --values '[["new","row","data"]]'
```

### Docs

```bash
# è¯»å–
$GAPI docs get DOC_ID

# åˆ›å»ºæ–°æ–‡æ¡£ï¼ˆå¯é€‰æ‹©ä»¥æ­£æ–‡æ–‡æœ¬åˆå§‹åŒ–ï¼‰
$GAPI docs create --title "Meeting Notes"
$GAPI docs create --title "Draft" --body "First paragraph..."

# åœ¨çŽ°æœ‰æ–‡æ¡£æœ«å°¾è¿½åŠ æ–‡æœ¬
$GAPI docs append DOC_ID --text "Additional content to append"
```

## è¾“å‡ºæ ¼å¼

æ‰€æœ‰å‘½ä»¤å‡è¿”å›ž JSONã€‚å¯ä½¿ç”¨ `jq` è§£æžæˆ–ç›´æŽ¥è¯»å–ã€‚å…³é”®å­—æ®µï¼š

- **Gmail search**ï¼š`[{id, threadId, from, to, subject, date, snippet, labels}]`
- **Gmail get**ï¼š`{id, threadId, from, to, subject, date, labels, body}`
- **Gmail send/reply**ï¼š`{status: "sent", id, threadId}`
- **Calendar list**ï¼š`[{id, summary, start, end, location, description, htmlLink}]`
- **Calendar create**ï¼š`{status: "created", id, summary, htmlLink}`
- **Drive search**ï¼š`[{id, name, mimeType, modifiedTime, webViewLink}]`
- **Drive get**ï¼š`{id, name, mimeType, modifiedTime, size, webViewLink, parents, owners}`
- **Drive upload**ï¼š`{status: "uploaded", id, name, mimeType, webViewLink}`
- **Drive download**ï¼š`{status: "downloaded", id, name, path, mimeType}`
- **Drive create-folder**ï¼š`{status: "created", id, name, webViewLink}`
- **Drive share**ï¼š`{status: "shared", permissionId, fileId, role, type}`
- **Drive delete**ï¼š`{status: "trashed" | "deleted", fileId, permanent}`
- **Contacts list**ï¼š`[{name, emails: [...], phones: [...]}]`
- **Sheets get**ï¼š`[[cell, cell, ...], ...]`
- **Sheets create**ï¼š`{status: "created", spreadsheetId, title, spreadsheetUrl}`
- **Docs create**ï¼š`{status: "created", documentId, title, url}`
- **Docs append**ï¼š`{status: "appended", documentId, inserted_at, characters}`

## è§„åˆ™

1. **æœªç»ç”¨æˆ·ç¡®è®¤ï¼Œç»ä¸å‘é€é‚®ä»¶ã€åˆ›å»º/åˆ é™¤æ—¥åŽ†äº‹ä»¶ã€åˆ é™¤ Drive æ–‡ä»¶ã€å…±äº«æ–‡ä»¶æˆ–ä¿®æ”¹ Docs/Sheetsã€‚** å±•ç¤ºå°†è¦æ‰§è¡Œçš„æ“ä½œï¼ˆæ”¶ä»¶äººã€æ–‡ä»¶ IDã€å†…å®¹ã€å…±äº«è§’è‰²ï¼‰å¹¶è¯·æ±‚æ‰¹å‡†ã€‚å¯¹äºŽ `drive delete`ï¼Œä¼˜å…ˆä½¿ç”¨é»˜è®¤çš„å›žæ”¶ç«™ï¼ˆå¯æ¢å¤ï¼‰è€Œéž `--permanent`ã€‚
2. **é¦–æ¬¡ä½¿ç”¨å‰æ£€æŸ¥æŽˆæƒ** â€”â€” è¿è¡Œ `setup.py --check`ã€‚è‹¥å¤±è´¥ï¼Œå¼•å¯¼ç”¨æˆ·å®Œæˆè®¾ç½®ã€‚
3. **å¯¹äºŽå¤æ‚æŸ¥è¯¢ï¼Œä½¿ç”¨ Gmail æœç´¢è¯­æ³•å‚è€ƒ** â€”â€” é€šè¿‡ `skill_view("google-workspace", file_path="references/gmail-search-syntax.md")` åŠ è½½ã€‚
4. **Calendar æ—¶é—´å¿…é¡»åŒ…å«æ—¶åŒº** â€”â€” å§‹ç»ˆä½¿ç”¨å¸¦åç§»é‡çš„ ISO 8601 æ ¼å¼ï¼ˆå¦‚ `2026-03-01T10:00:00-06:00`ï¼‰æˆ– UTCï¼ˆ`Z`ï¼‰ã€‚
5. **éµå®ˆé€ŸçŽ‡é™åˆ¶** â€”â€” é¿å…å¿«é€Ÿè¿žç»­çš„ API è°ƒç”¨ã€‚å°½å¯èƒ½æ‰¹é‡è¯»å–ã€‚

## æ•…éšœæŽ’æŸ¥

| é—®é¢˜ | è§£å†³æ–¹æ³• |
|---------|-----|
| `NOT_AUTHENTICATED` | æ‰§è¡Œä¸Šè¿°è®¾ç½®æ­¥éª¤ 2-5 |
| `REFRESH_FAILED` | Token å·²è¢«æ’¤é”€æˆ–è¿‡æœŸ â€”â€” é‡æ–°æ‰§è¡Œæ­¥éª¤ 3-5 |
| `HttpError 403: Insufficient Permission` | ç¼ºå°‘ API scope â€”â€” `$GSETUP --revoke` åŽé‡æ–°æ‰§è¡Œæ­¥éª¤ 3-5 |
| `AUTHENTICATED (partial)` æˆ–ã€ŒToken missing scopesã€ | æ–°çš„å†™å…¥åŠŸèƒ½ï¼ˆDrive å†™å…¥/åˆ é™¤ã€Docs åˆ›å»º/ç¼–è¾‘ï¼‰éœ€è¦é‡æ–°æŽˆæƒã€‚`$GSETUP --revoke` åŽé‡æ–°æ‰§è¡Œæ­¥éª¤ 3-5 ä»¥æŽˆäºˆå‡çº§åŽçš„ scopeã€‚ |
| `HttpError 403: Access Not Configured` | API æœªå¯ç”¨ â€”â€” ç”¨æˆ·éœ€åœ¨ Google Cloud Console ä¸­å¯ç”¨ |
| `ModuleNotFoundError` | è¿è¡Œ `$GSETUP --install-deps` |
| é«˜çº§ä¿æŠ¤é˜»æ­¢æŽˆæƒ | Workspace ç®¡ç†å‘˜å¿…é¡»å°† OAuth å®¢æˆ·ç«¯ ID åŠ å…¥ç™½åå• |

## æ’¤é”€è®¿é—®æƒé™

```bash
$GSETUP --revoke
```
