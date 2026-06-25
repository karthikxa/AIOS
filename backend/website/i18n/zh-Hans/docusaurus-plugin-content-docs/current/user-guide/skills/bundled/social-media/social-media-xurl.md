---
title: "Xurl â€” é€šè¿‡ xurl CLI ä½¿ç”¨ X/Twitterï¼šå‘å¸–ã€æœç´¢ã€ç§ä¿¡ã€åª’ä½“ã€v2 API"
sidebar_label: "Xurl"
description: "é€šè¿‡ xurl CLI ä½¿ç”¨ X/Twitterï¼šå‘å¸–ã€æœç´¢ã€ç§ä¿¡ã€åª’ä½“ã€v2 API"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Xurl

é€šè¿‡ xurl CLI ä½¿ç”¨ X/Twitterï¼šå‘å¸–ã€æœç´¢ã€ç§ä¿¡ã€åª’ä½“ã€v2 APIã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/social-media/xurl` |
| ç‰ˆæœ¬ | `1.1.1` |
| ä½œè€… | xdevplatform + openclaw + Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `twitter`, `x`, `social-media`, `xurl`, `official-api` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# xurl â€” é€šè¿‡å®˜æ–¹ CLI ä½¿ç”¨ X (Twitter) API

`xurl` æ˜¯ X å¼€å‘è€…å¹³å°å®˜æ–¹æä¾›çš„ X API CLI å·¥å…·ã€‚å®ƒæ”¯æŒå¸¸ç”¨æ“ä½œçš„å¿«æ·å‘½ä»¤ï¼Œä»¥åŠå¯¹ä»»æ„ v2 ç«¯ç‚¹çš„åŽŸå§‹ curl é£Žæ ¼è®¿é—®ã€‚æ‰€æœ‰å‘½ä»¤å‡å°† JSON è¾“å‡ºåˆ° stdoutã€‚

é€‚ç”¨åœºæ™¯ï¼š
- å‘å¸–ã€å›žå¤ã€å¼•ç”¨ã€åˆ é™¤å¸–å­
- æœç´¢å¸–å­åŠè¯»å–æ—¶é—´çº¿/æåŠ
- ç‚¹èµžã€è½¬å‘ã€ä¹¦ç­¾
- å…³æ³¨ã€å–æ¶ˆå…³æ³¨ã€æ‹‰é»‘ã€é™éŸ³
- ç§ä¿¡ï¼ˆDMï¼‰
- åª’ä½“ä¸Šä¼ ï¼ˆå›¾ç‰‡å’Œè§†é¢‘ï¼‰
- å¯¹ä»»æ„ X API v2 ç«¯ç‚¹çš„åŽŸå§‹è®¿é—®
- å¤šåº”ç”¨ / å¤šè´¦å·å·¥ä½œæµ

æ­¤ skill æ›¿ä»£äº†æ—§ç‰ˆ `xitter` skillï¼ˆè¯¥ skill å°è£…äº†ç¬¬ä¸‰æ–¹ Python CLIï¼‰ã€‚`xurl` ç”± X å¼€å‘è€…å¹³å°å›¢é˜Ÿç»´æŠ¤ï¼Œæ”¯æŒå¸¦è‡ªåŠ¨åˆ·æ–°çš„ OAuth 2.0 PKCEï¼Œè¦†ç›–çš„ API èŒƒå›´æ›´å¹¿ã€‚

---

## å¯†é’¥å®‰å…¨ï¼ˆå¼ºåˆ¶è¦æ±‚ï¼‰

åœ¨ agent/LLM ä¼šè¯ä¸­æ“ä½œæ—¶çš„å…³é”®è§„åˆ™ï¼š

- **ç»ä¸**è¯»å–ã€æ‰“å°ã€è§£æžã€æ±‡æ€»ã€ä¸Šä¼ æˆ–å°† `~/.xurl` å‘é€åˆ° LLM ä¸Šä¸‹æ–‡ã€‚
- **ç»ä¸**è¦æ±‚ç”¨æˆ·å°†å‡­æ®/token ç²˜è´´åˆ°å¯¹è¯ä¸­ã€‚
- ç”¨æˆ·å¿…é¡»åœ¨å…¶æœ¬æœºä¸Šæ‰‹åŠ¨å¡«å†™ `~/.xurl` ä¸­çš„å¯†é’¥ã€‚
- **ç»ä¸**åœ¨ agent ä¼šè¯ä¸­æŽ¨èæˆ–æ‰§è¡ŒåŒ…å«å†…è”å¯†é’¥çš„è®¤è¯å‘½ä»¤ã€‚
- **ç»ä¸**åœ¨ agent ä¼šè¯ä¸­ä½¿ç”¨ `--verbose` / `-v`â€”â€”å®ƒå¯èƒ½æš´éœ²è®¤è¯å¤´/tokenã€‚
- å¦‚éœ€éªŒè¯å‡­æ®æ˜¯å¦å­˜åœ¨ï¼Œåªä½¿ç”¨ï¼š`xurl auth status`ã€‚

agent å‘½ä»¤ä¸­ç¦æ­¢ä½¿ç”¨çš„ flagï¼ˆè¿™äº› flag æŽ¥å—å†…è”å¯†é’¥ï¼‰ï¼š
`--bearer-token`ã€`--consumer-key`ã€`--consumer-secret`ã€`--access-token`ã€`--token-secret`ã€`--client-id`ã€`--client-secret`

åº”ç”¨å‡­æ®æ³¨å†Œå’Œå‡­æ®è½®æ¢å¿…é¡»ç”±ç”¨æˆ·åœ¨ agent ä¼šè¯å¤–æ‰‹åŠ¨å®Œæˆã€‚å‡­æ®æ³¨å†Œå®ŒæˆåŽï¼Œç”¨æˆ·ä½¿ç”¨ `xurl auth oauth2` è¿›è¡Œè®¤è¯â€”â€”åŒæ ·åœ¨ agent ä¼šè¯å¤–æ‰§è¡Œã€‚Token æŒä¹…åŒ–ä¿å­˜åˆ° `~/.xurl`ï¼ˆYAML æ ¼å¼ï¼‰ã€‚æ¯ä¸ªåº”ç”¨æ‹¥æœ‰ç‹¬ç«‹çš„ tokenã€‚OAuth 2.0 token è‡ªåŠ¨åˆ·æ–°ã€‚

---

## å®‰è£…

é€‰æ‹©ä»¥ä¸‹ä»»æ„ä¸€ç§æ–¹å¼ã€‚åœ¨ Linux ä¸Šï¼Œshell è„šæœ¬æˆ– `go install` æœ€ä¸ºç®€ä¾¿ã€‚

```bash
# Shell è„šæœ¬ï¼ˆå®‰è£…åˆ° ~/.local/binï¼Œæ— éœ€ sudoï¼Œæ”¯æŒ Linux + macOSï¼‰
curl -fsSL https://raw.githubusercontent.com/xdevplatform/xurl/main/install.sh | bash

# Homebrewï¼ˆmacOSï¼‰
brew install --cask xdevplatform/tap/xurl

# npm
npm install -g @xdevplatform/xurl

# Go
go install github.com/xdevplatform/xurl@latest
```

éªŒè¯ï¼š

```bash
xurl --help
xurl auth status
```

å¦‚æžœ `xurl` å·²å®‰è£…ä½† `auth status` æ˜¾ç¤ºæ— åº”ç”¨æˆ– tokenï¼Œç”¨æˆ·éœ€è¦æ‰‹åŠ¨å®Œæˆè®¤è¯â€”â€”å‚è§ä¸‹ä¸€èŠ‚ã€‚

---

## ä¸€æ¬¡æ€§ç”¨æˆ·é…ç½®ï¼ˆç”¨æˆ·åœ¨ agent å¤–æ‰§è¡Œï¼‰

ä»¥ä¸‹æ­¥éª¤å¿…é¡»ç”±ç”¨æˆ·ç›´æŽ¥æ‰§è¡Œï¼Œ**ä¸å¾—**ç”± agent ä»£ä¸ºæ‰§è¡Œï¼Œå› ä¸ºæ¶‰åŠç²˜è´´å¯†é’¥ã€‚è¯·å°†ç”¨æˆ·å¼•å¯¼è‡³æ­¤éƒ¨åˆ†ï¼›ä¸è¦æ›¿ç”¨æˆ·æ‰§è¡Œã€‚

1. åœ¨ https://developer.x.com/en/portal/dashboard åˆ›å»ºæˆ–æ‰“å¼€ä¸€ä¸ªåº”ç”¨
2. å°†é‡å®šå‘ URI è®¾ç½®ä¸º `http://localhost:8080/callback`
3. å¤åˆ¶åº”ç”¨çš„ Client ID å’Œ Client Secret
4. åœ¨æœ¬åœ°æ³¨å†Œåº”ç”¨ï¼ˆç”¨æˆ·æ‰§è¡Œï¼‰ï¼š
   ```bash
   xurl auth apps add my-app --client-id YOUR_CLIENT_ID --client-secret YOUR_CLIENT_SECRET
   ```
5. è¿›è¡Œè®¤è¯ï¼ˆæŒ‡å®š `--app` å°† token ç»‘å®šåˆ°ä½ çš„åº”ç”¨ï¼‰ï¼š
   ```bash
   xurl auth oauth2 --app my-app
   ```
   ï¼ˆè¿™å°†æ‰“å¼€æµè§ˆå™¨è¿›è¡Œ OAuth 2.0 PKCE æµç¨‹ã€‚ï¼‰

   å¦‚æžœ X åœ¨ OAuth åŽçš„ `/2/users/me` æŸ¥è¯¢ä¸­è¿”å›ž `UsernameNotFound` é”™è¯¯æˆ– 403ï¼Œè¯·æ˜¾å¼ä¼ å…¥ä½ çš„ç”¨æˆ·åï¼ˆxurl v1.1.0+ï¼‰ï¼š
   ```bash
   xurl auth oauth2 --app my-app YOUR_USERNAME
   ```
   è¿™ä¼šå°† token ç»‘å®šåˆ°ä½ çš„ç”¨æˆ·åï¼Œå¹¶è·³è¿‡æœ‰é—®é¢˜çš„ `/2/users/me` è°ƒç”¨ã€‚
6. å°†è¯¥åº”ç”¨è®¾ä¸ºé»˜è®¤ï¼Œä½¿æ‰€æœ‰å‘½ä»¤éƒ½ä½¿ç”¨å®ƒï¼š
   ```bash
   xurl auth default my-app
   ```
7. éªŒè¯ï¼š
   ```bash
   xurl auth status
   xurl whoami
   ```

å®ŒæˆåŽï¼Œagent å³å¯ä½¿ç”¨ä»¥ä¸‹æ‰€æœ‰å‘½ä»¤ï¼Œæ— éœ€è¿›ä¸€æ­¥é…ç½®ã€‚OAuth 2.0 token è‡ªåŠ¨åˆ·æ–°ã€‚

> **å¸¸è§é™·é˜±ï¼š** å¦‚æžœåœ¨ `xurl auth oauth2` æ—¶çœç•¥äº† `--app my-app`ï¼ŒOAuth token å°†ä¿å­˜åˆ°å†…ç½®çš„ `default` åº”ç”¨é…ç½®ä¸­â€”â€”è¯¥é…ç½®æ²¡æœ‰ client-id æˆ– client-secretã€‚å³ä½¿ OAuth æµç¨‹çœ‹ä¼¼æˆåŠŸï¼Œå‘½ä»¤ä¹Ÿä¼šå› è®¤è¯é”™è¯¯è€Œå¤±è´¥ã€‚å¦‚é‡æ­¤æƒ…å†µï¼Œè¯·é‡æ–°è¿è¡Œ `xurl auth oauth2 --app my-app` å’Œ `xurl auth default my-app`ã€‚

---

## å¿«é€Ÿå‚è€ƒ

| æ“ä½œ | å‘½ä»¤ |
| --- | --- |
| å‘å¸– | `xurl post "Hello world!"` |
| å›žå¤ | `xurl reply POST_ID "Nice post!"` |
| å¼•ç”¨ | `xurl quote POST_ID "My take"` |
| åˆ é™¤å¸–å­ | `xurl delete POST_ID` |
| è¯»å–å¸–å­ | `xurl read POST_ID` |
| æœç´¢å¸–å­ | `xurl search "QUERY" -n 10` |
| æŸ¥çœ‹è‡ªå·± | `xurl whoami` |
| æŸ¥æ‰¾ç”¨æˆ· | `xurl user @handle` |
| ä¸»é¡µæ—¶é—´çº¿ | `xurl timeline -n 20` |
| æåŠ | `xurl mentions -n 10` |
| ç‚¹èµž / å–æ¶ˆç‚¹èµž | `xurl like POST_ID` / `xurl unlike POST_ID` |
| è½¬å‘ / æ’¤é”€è½¬å‘ | `xurl repost POST_ID` / `xurl unrepost POST_ID` |
| ä¹¦ç­¾ / ç§»é™¤ä¹¦ç­¾ | `xurl bookmark POST_ID` / `xurl unbookmark POST_ID` |
| åˆ—å‡ºä¹¦ç­¾ / ç‚¹èµž | `xurl bookmarks -n 10` / `xurl likes -n 10` |
| å…³æ³¨ / å–æ¶ˆå…³æ³¨ | `xurl follow @handle` / `xurl unfollow @handle` |
| æ­£åœ¨å…³æ³¨ / ç²‰ä¸ | `xurl following -n 20` / `xurl followers -n 20` |
| æ‹‰é»‘ / å–æ¶ˆæ‹‰é»‘ | `xurl block @handle` / `xurl unblock @handle` |
| é™éŸ³ / å–æ¶ˆé™éŸ³ | `xurl mute @handle` / `xurl unmute @handle` |
| å‘é€ç§ä¿¡ | `xurl dm @handle "message"` |
| åˆ—å‡ºç§ä¿¡ | `xurl dms -n 10` |
| ä¸Šä¼ åª’ä½“ | `xurl media upload path/to/file.mp4` |
| åª’ä½“çŠ¶æ€ | `xurl media status MEDIA_ID` |
| åˆ—å‡ºåº”ç”¨ | `xurl auth apps list` |
| ç§»é™¤åº”ç”¨ | `xurl auth apps remove NAME` |
| è®¾ç½®é»˜è®¤åº”ç”¨ | `xurl auth default APP_NAME [USERNAME]` |
| å•æ¬¡è¯·æ±‚æŒ‡å®šåº”ç”¨ | `xurl --app NAME /2/users/me` |
| è®¤è¯çŠ¶æ€ | `xurl auth status` |

æ³¨æ„ï¼š
- `POST_ID` ä¹ŸæŽ¥å—å®Œæ•´ URLï¼ˆå¦‚ `https://x.com/user/status/1234567890`ï¼‰â€”â€”xurl ä¼šè‡ªåŠ¨æå– IDã€‚
- ç”¨æˆ·åå¯å¸¦æˆ–ä¸å¸¦å‰ç¼€ `@`ã€‚

---

## å‘½ä»¤è¯¦æƒ…

### å‘å¸–

```bash
xurl post "Hello world!"
xurl post "Check this out" --media-id MEDIA_ID
xurl post "Thread pics" --media-id 111 --media-id 222

xurl reply 1234567890 "Great point!"
xurl reply https://x.com/user/status/1234567890 "Agreed!"
xurl reply 1234567890 "Look at this" --media-id MEDIA_ID

xurl quote 1234567890 "Adding my thoughts"
xurl delete 1234567890
```

### è¯»å–ä¸Žæœç´¢

```bash
xurl read 1234567890
xurl read https://x.com/user/status/1234567890

xurl search "golang"
xurl search "from:elonmusk" -n 20
xurl search "#buildinpublic lang:en" -n 15
```

### ç”¨æˆ·ã€æ—¶é—´çº¿ã€æåŠ

```bash
xurl whoami
xurl user elonmusk
xurl user @XDevelopers

xurl timeline -n 25
xurl mentions -n 20
```

### äº’åŠ¨

```bash
xurl like 1234567890
xurl unlike 1234567890

xurl repost 1234567890
xurl unrepost 1234567890

xurl bookmark 1234567890
xurl unbookmark 1234567890

xurl bookmarks -n 20
xurl likes -n 20
```

### ç¤¾äº¤å…³ç³»

```bash
xurl follow @XDevelopers
xurl unfollow @XDevelopers

xurl following -n 50
xurl followers -n 50

# æŸ¥çœ‹å…¶ä»–ç”¨æˆ·çš„å…³ç³»
xurl following --of elonmusk -n 20
xurl followers --of elonmusk -n 20

xurl block @spammer
xurl unblock @spammer
xurl mute @annoying
xurl unmute @annoying
```

### ç§ä¿¡

```bash
xurl dm @someuser "Hey, saw your post!"
xurl dms -n 25
```

### åª’ä½“ä¸Šä¼ 

```bash
# è‡ªåŠ¨æ£€æµ‹ç±»åž‹
xurl media upload photo.jpg
xurl media upload video.mp4

# æ˜¾å¼æŒ‡å®šç±»åž‹/åˆ†ç±»
xurl media upload --media-type image/jpeg --category tweet_image photo.jpg

# è§†é¢‘éœ€è¦æœåŠ¡ç«¯å¤„ç†â€”â€”æ£€æŸ¥çŠ¶æ€ï¼ˆæˆ–è½®è¯¢ï¼‰
xurl media status MEDIA_ID
xurl media status --wait MEDIA_ID

# å®Œæ•´å·¥ä½œæµ
xurl media upload meme.png                  # è¿”å›ž media id
xurl post "lol" --media-id MEDIA_ID
```

---

## åŽŸå§‹ API è®¿é—®

å¿«æ·å‘½ä»¤è¦†ç›–äº†å¸¸ç”¨æ“ä½œã€‚å¯¹äºŽå…¶ä»–éœ€æ±‚ï¼Œå¯ä½¿ç”¨åŽŸå§‹ curl é£Žæ ¼æ¨¡å¼è®¿é—®ä»»æ„ X API v2 ç«¯ç‚¹ï¼š

```bash
# GET
xurl /2/users/me

# POSTï¼Œå¸¦ JSON body
xurl -X POST /2/tweets -d '{"text":"Hello world!"}'

# DELETE / PUT / PATCH
xurl -X DELETE /2/tweets/1234567890

# è‡ªå®šä¹‰è¯·æ±‚å¤´
xurl -H "Content-Type: application/json" /2/some/endpoint

# å¼ºåˆ¶æµå¼ä¼ è¾“
xurl -s /2/tweets/search/stream

# å®Œæ•´ URL åŒæ ·æœ‰æ•ˆ
xurl https://api.x.com/2/users/me
```

---

## å…¨å±€ Flag

| Flag | ç®€å†™ | è¯´æ˜Ž |
| --- | --- | --- |
| `--app` | | ä½¿ç”¨æŒ‡å®šçš„å·²æ³¨å†Œåº”ç”¨ï¼ˆè¦†ç›–é»˜è®¤å€¼ï¼‰ |
| `--auth` | | å¼ºåˆ¶æŒ‡å®šè®¤è¯ç±»åž‹ï¼š`oauth1`ã€`oauth2` æˆ– `app` |
| `--username` | `-u` | æŒ‡å®šä½¿ç”¨å“ªä¸ª OAuth2 è´¦å·ï¼ˆå­˜åœ¨å¤šä¸ªæ—¶ï¼‰ |
| `--verbose` | `-v` | **agent ä¼šè¯ä¸­ç¦æ­¢ä½¿ç”¨**â€”â€”ä¼šæ³„éœ²è®¤è¯å¤´ |
| `--trace` | `-t` | æ·»åŠ  `X-B3-Flags: 1` è¿½è¸ªè¯·æ±‚å¤´ |

---

## æµå¼ä¼ è¾“

æµå¼ç«¯ç‚¹ä¼šè¢«è‡ªåŠ¨æ£€æµ‹ã€‚å·²çŸ¥çš„æµå¼ç«¯ç‚¹åŒ…æ‹¬ï¼š

- `/2/tweets/search/stream`
- `/2/tweets/sample/stream`
- `/2/tweets/sample10/stream`

å¯¹ä»»æ„ç«¯ç‚¹ä½¿ç”¨ `-s` å¼ºåˆ¶å¯ç”¨æµå¼ä¼ è¾“ã€‚

---

## è¾“å‡ºæ ¼å¼

æ‰€æœ‰å‘½ä»¤å°† JSON è¾“å‡ºåˆ° stdoutã€‚ç»“æž„ä¸Ž X API v2 ä¿æŒä¸€è‡´ï¼š

```json
{ "data": { "id": "1234567890", "text": "Hello world!" } }
```

é”™è¯¯åŒæ ·ä»¥ JSON å½¢å¼è¾“å‡ºï¼š

```json
{ "errors": [ { "message": "Not authorized", "code": 403 } ] }
```

---

## å¸¸è§å·¥ä½œæµ

### å‘å¸ƒå¸¦å›¾ç‰‡çš„å¸–å­
```bash
xurl media upload photo.jpg
xurl post "Check out this photo!" --media-id MEDIA_ID
```

### å›žå¤æŸä¸ªå¯¹è¯
```bash
xurl read https://x.com/user/status/1234567890
xurl reply 1234567890 "Here are my thoughts..."
```

### æœç´¢å¹¶äº’åŠ¨
```bash
xurl search "topic of interest" -n 10
xurl like POST_ID_FROM_RESULTS
xurl reply POST_ID_FROM_RESULTS "Great point!"
```

### æŸ¥çœ‹è‡ªå·±çš„åŠ¨æ€
```bash
xurl whoami
xurl mentions -n 20
xurl timeline -n 20
```

### å¤šåº”ç”¨ï¼ˆå‡­æ®å·²æ‰‹åŠ¨é¢„é…ç½®ï¼‰
```bash
xurl auth default prod alice               # prod åº”ç”¨ï¼Œalice ç”¨æˆ·
xurl --app staging /2/users/me             # å•æ¬¡è¯·æ±‚ä½¿ç”¨ staging
```

---

## é”™è¯¯å¤„ç†

- ä»»ä½•é”™è¯¯å‡è¿”å›žéžé›¶é€€å‡ºç ã€‚
- API é”™è¯¯ä»ä»¥ JSON å½¢å¼æ‰“å°åˆ° stdoutï¼Œå¯ç›´æŽ¥è§£æžã€‚
- è®¤è¯é”™è¯¯ â†’ è®©ç”¨æˆ·åœ¨ agent ä¼šè¯å¤–é‡æ–°è¿è¡Œ `xurl auth oauth2`ã€‚
- éœ€è¦è°ƒç”¨æ–¹ç”¨æˆ· ID çš„å‘½ä»¤ï¼ˆç‚¹èµžã€è½¬å‘ã€ä¹¦ç­¾ã€å…³æ³¨ç­‰ï¼‰ä¼šé€šè¿‡ `/2/users/me` è‡ªåŠ¨èŽ·å–ã€‚è¯¥å¤„çš„è®¤è¯å¤±è´¥ä¼šä»¥è®¤è¯é”™è¯¯çš„å½¢å¼å‘ˆçŽ°ã€‚

---

## Agent å·¥ä½œæµ

1. éªŒè¯å‰ç½®æ¡ä»¶ï¼š`xurl --help` å’Œ `xurl auth status`ã€‚
2. **æ£€æŸ¥é»˜è®¤åº”ç”¨æ˜¯å¦æœ‰å‡­æ®ã€‚** è§£æž `auth status` è¾“å‡ºã€‚é»˜è®¤åº”ç”¨ä»¥ `â–¸` æ ‡è®°ã€‚å¦‚æžœé»˜è®¤åº”ç”¨æ˜¾ç¤º `oauth2: (none)`ï¼Œä½†å¦ä¸€ä¸ªåº”ç”¨æœ‰æœ‰æ•ˆçš„ oauth2 ç”¨æˆ·ï¼Œè¯·å‘ŠçŸ¥ç”¨æˆ·è¿è¡Œ `xurl auth default <that-app>` ä¿®å¤ã€‚è¿™æ˜¯æœ€å¸¸è§çš„é…ç½®é”™è¯¯â€”â€”ç”¨æˆ·æ·»åŠ äº†è‡ªå®šä¹‰åç§°çš„åº”ç”¨ä½†ä»Žæœªå°†å…¶è®¾ä¸ºé»˜è®¤ï¼Œå¯¼è‡´ xurl ä¸€ç›´å°è¯•ä½¿ç”¨ç©ºçš„ `default` é…ç½®ã€‚
3. å¦‚æžœå®Œå…¨ç¼ºå°‘è®¤è¯ï¼Œåœæ­¢æ“ä½œå¹¶å°†ç”¨æˆ·å¼•å¯¼è‡³"ä¸€æ¬¡æ€§ç”¨æˆ·é…ç½®"éƒ¨åˆ†â€”â€”ä¸è¦å°è¯•è‡ªè¡Œæ³¨å†Œåº”ç”¨æˆ–ä¼ é€’å¯†é’¥ã€‚
4. å…ˆæ‰§è¡Œä½Žæˆæœ¬çš„è¯»å–æ“ä½œï¼ˆ`xurl whoami`ã€`xurl user @handle`ã€`xurl search ... -n 3`ï¼‰ä»¥ç¡®è®¤è¿žé€šæ€§ã€‚
5. åœ¨æ‰§è¡Œä»»ä½•å†™æ“ä½œï¼ˆå‘å¸–ã€å›žå¤ã€ç‚¹èµžã€è½¬å‘ã€ç§ä¿¡ã€å…³æ³¨ã€æ‹‰é»‘ã€åˆ é™¤ï¼‰å‰ï¼Œç¡®è®¤ç›®æ ‡å¸–å­/ç”¨æˆ·åŠç”¨æˆ·æ„å›¾ã€‚
6. ç›´æŽ¥ä½¿ç”¨ JSON è¾“å‡ºâ€”â€”æ¯ä¸ªå“åº”å‡å·²ç»“æž„åŒ–ã€‚
7. ç»ä¸å°† `~/.xurl` å†…å®¹ç²˜è´´å›žå¯¹è¯ä¸­ã€‚

---

## æ•…éšœæŽ’æŸ¥

| çŽ°è±¡ | åŽŸå›  | è§£å†³æ–¹æ³• |
| --- | --- | --- |
| OAuth æµç¨‹æˆåŠŸåŽä»å‡ºçŽ°è®¤è¯é”™è¯¯ | Token ä¿å­˜åˆ°äº† `default` åº”ç”¨ï¼ˆæ—  client-id/secretï¼‰è€Œéžå‘½ååº”ç”¨ | æ‰§è¡Œ `xurl auth oauth2 --app my-app`ï¼Œç„¶åŽ `xurl auth default my-app` |
| OAuth æœŸé—´å‡ºçŽ° `unauthorized_client` | X æŽ§åˆ¶å°ä¸­åº”ç”¨ç±»åž‹è®¾ç½®ä¸º"Native App" | åœ¨ç”¨æˆ·è®¤è¯è®¾ç½®ä¸­æ”¹ä¸º"Web app, automated app or bot" |
| OAuth åŽ `/2/users/me` è¿”å›ž `UsernameNotFound` æˆ– 403 | X çš„ `/2/users/me` è¿”å›žç”¨æˆ·åä¸ç¨³å®š | é‡æ–°è¿è¡Œ `xurl auth oauth2 --app my-app YOUR_USERNAME`ï¼ˆxurl v1.1.0+ï¼‰æ˜¾å¼ä¼ å…¥ç”¨æˆ·å |
| æ¯æ¬¡è¯·æ±‚å‡è¿”å›ž 401 | Token å·²è¿‡æœŸæˆ–é»˜è®¤åº”ç”¨é”™è¯¯ | æ£€æŸ¥ `xurl auth status`â€”â€”ç¡®è®¤ `â–¸` æŒ‡å‘æœ‰ oauth2 token çš„åº”ç”¨ |
| `client-forbidden` / `client-not-enrolled` | X å¹³å°æ³¨å†Œé—®é¢˜ | æŽ§åˆ¶å° â†’ åº”ç”¨ â†’ ç®¡ç† â†’ åˆ‡æ¢åˆ°"Pay-per-use"å¥—é¤ â†’ ç”Ÿäº§çŽ¯å¢ƒ |
| `CreditsDepleted` | X API ä½™é¢ä¸º $0 | åœ¨å¼€å‘è€…æŽ§åˆ¶å° â†’ è´¦å•ä¸­å……å€¼ï¼ˆæœ€ä½Ž $5ï¼‰ |
| å›¾ç‰‡ä¸Šä¼ æ—¶ `media processing failed` | é»˜è®¤åˆ†ç±»ä¸º `amplify_video` | æ·»åŠ  `--category tweet_image --media-type image/png` |
| X æŽ§åˆ¶å°ä¸­å‡ºçŽ°ä¸¤ä¸ª"Client Secret"å€¼ | UI é—®é¢˜â€”â€”ç¬¬ä¸€ä¸ªå®žé™…ä¸Šæ˜¯ Client ID | åœ¨"Keys and tokens"é¡µé¢ç¡®è®¤ï¼›ID ä»¥ `MTpjaQ` ç»“å°¾ |

---

## æ³¨æ„äº‹é¡¹

- **é€ŸçŽ‡é™åˆ¶ï¼š** X å¯¹æ¯ä¸ªç«¯ç‚¹æ‰§è¡Œé€ŸçŽ‡é™åˆ¶ã€‚429 è¡¨ç¤ºéœ€è¦ç­‰å¾…åŽé‡è¯•ã€‚å†™æ“ä½œç«¯ç‚¹ï¼ˆå‘å¸–ã€å›žå¤ã€ç‚¹èµžã€è½¬å‘ï¼‰çš„é™åˆ¶æ¯”è¯»æ“ä½œæ›´ä¸¥æ ¼ã€‚
- **æƒé™èŒƒå›´ï¼ˆScopeï¼‰ï¼š** OAuth 2.0 token ä½¿ç”¨å®½æ³›çš„ scopeã€‚ç‰¹å®šæ“ä½œè¿”å›ž 403 é€šå¸¸æ„å‘³ç€ token ç¼ºå°‘æŸä¸ª scopeâ€”â€”è®©ç”¨æˆ·é‡æ–°è¿è¡Œ `xurl auth oauth2`ã€‚
- **Token åˆ·æ–°ï¼š** OAuth 2.0 token è‡ªåŠ¨åˆ·æ–°ï¼Œæ— éœ€ä»»ä½•æ“ä½œã€‚
- **å¤šåº”ç”¨ï¼š** æ¯ä¸ªåº”ç”¨æ‹¥æœ‰ç‹¬ç«‹çš„å‡­æ®/tokenã€‚ä½¿ç”¨ `xurl auth default` æˆ– `--app` åˆ‡æ¢ã€‚
- **æ¯ä¸ªåº”ç”¨çš„å¤šè´¦å·ï¼š** ä½¿ç”¨ `-u / --username` é€‰æ‹©ï¼Œæˆ–é€šè¿‡ `xurl auth default APP USER` è®¾ç½®é»˜è®¤å€¼ã€‚
- **Token å­˜å‚¨ï¼š** `~/.xurl` ä¸º YAML æ ¼å¼ã€‚ç»ä¸è¯»å–æˆ–å°†æ­¤æ–‡ä»¶å‘é€åˆ° LLM ä¸Šä¸‹æ–‡ã€‚
- **è´¹ç”¨ï¼š** X API è®¿é—®åœ¨æœ‰å®žé™…ä½¿ç”¨é‡æ—¶é€šå¸¸éœ€è¦ä»˜è´¹ã€‚è®¸å¤šå¤±è´¥æ˜¯å¥—é¤/æƒé™é—®é¢˜ï¼Œè€Œéžä»£ç é—®é¢˜ã€‚

---

## è‡´è°¢

- ä¸Šæ¸¸ CLIï¼šhttps://github.com/xdevplatform/xurlï¼ˆX å¼€å‘è€…å¹³å°å›¢é˜Ÿï¼ŒChris Park ç­‰ï¼‰
- ä¸Šæ¸¸ agent skillï¼šhttps://github.com/openclaw/openclaw/blob/main/skills/xurl/SKILL.md
- Zed é€‚é…ï¼šæŒ‰ Zed skill è§„èŒƒé‡æ–°æ ¼å¼åŒ–ï¼›å®‰å…¨é˜²æŠ¤è§„åˆ™åŽŸæ–‡ä¿ç•™ã€‚