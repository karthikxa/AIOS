---
title: "Rest Graphql Debug â€” è°ƒè¯• REST/GraphQL APIï¼šçŠ¶æ€ç ã€è®¤è¯ã€Schemaã€å¤çŽ°"
sidebar_label: "Rest Graphql Debug"
description: "è°ƒè¯• REST/GraphQL APIï¼šçŠ¶æ€ç ã€è®¤è¯ã€Schemaã€å¤çŽ°"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Rest Graphql Debug

è°ƒè¯• REST/GraphQL APIï¼šçŠ¶æ€ç ã€è®¤è¯ã€Schemaã€å¤çŽ°ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/software-development/rest-graphql-debug` å®‰è£… |
| è·¯å¾„ | `optional-skills/software-development/rest-graphql-debug` |
| ç‰ˆæœ¬ | `1.2.0` |
| ä½œè€… | eren-karakus0 |
| è®¸å¯è¯ | MIT |
| æ ‡ç­¾ | `api`, `rest`, `graphql`, `http`, `debugging`, `testing`, `curl`, `integration` |
| ç›¸å…³ skill | [`systematic-debugging`](/user-guide/skills/bundled/software-development/software-development-systematic-debugging)ã€[`test-driven-development`](/user-guide/skills/bundled/software-development/software-development-test-driven-development) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# API æµ‹è¯•ä¸Žè°ƒè¯•

é€šè¿‡ Zed å·¥å…·é©±åŠ¨ REST å’Œ GraphQL è¯Šæ–­ â€”â€” `terminal` ç”¨äºŽ `curl`ï¼Œ`execute_code` ç”¨äºŽ Python `requests`ï¼Œ`web_extract` ç”¨äºŽæŸ¥é˜…åŽ‚å•†æ–‡æ¡£ã€‚åœ¨çŒœæµ‹ä¿®å¤æ–¹æ¡ˆä¹‹å‰ï¼Œå…ˆéš”ç¦»å‡ºæ•…éšœå±‚ã€‚

## é€‚ç”¨åœºæ™¯

- API è¿”å›žæ„å¤–çš„çŠ¶æ€ç æˆ–å“åº”ä½“
- è®¤è¯ï¼ˆauthï¼‰å¤±è´¥ï¼ˆtoken åˆ·æ–°åŽä» 401/403ã€OAuthã€API keyï¼‰
- Postman ä¸­æ­£å¸¸ä½†ä»£ç ä¸­å¤±è´¥
- Webhook / å›žè°ƒé›†æˆè°ƒè¯•
- æž„å»ºæˆ–å®¡æŸ¥ API é›†æˆæµ‹è¯•
- é™æµæˆ–åˆ†é¡µé—®é¢˜

ä»¥ä¸‹åœºæ™¯è·³è¿‡æœ¬ skillï¼ˆå‘ä¸Šå‡çº§ï¼‰ï¼šUI æ¸²æŸ“ã€DB æŸ¥è¯¢è°ƒä¼˜ã€DNS/é˜²ç«å¢™åŸºç¡€è®¾æ–½ã€‚

## æ ¸å¿ƒåŽŸåˆ™

**å…ˆéš”ç¦»å±‚ï¼Œå†ä¿®å¤ã€‚** 200 OK å¯èƒ½éšè—æŸåçš„æ•°æ®ã€‚500 å¯èƒ½æŽ©ç›–ä¸€ä¸ªå­—ç¬¦çš„è®¤è¯æ‹¼å†™é”™è¯¯ã€‚æŒ‰é¡ºåºé€å±‚æŽ’æŸ¥ï¼Œä¸è¦è·³è¿‡ä»»ä½•æ­¥éª¤ã€‚

```
1. è¿žé€šæ€§       â†’ èƒ½å¦è®¿é—®åˆ°ä¸»æœºï¼Ÿ
1.5 è¶…æ—¶        â†’ è¿žæŽ¥æ…¢è¿˜æ˜¯è¯»å–æ…¢ï¼Ÿ
2. TLS/SSL      â†’ è¯ä¹¦æ˜¯å¦æœ‰æ•ˆä¸”å—ä¿¡ä»»ï¼Ÿ
3. è®¤è¯         â†’ å‡­æ®æ˜¯å¦æ­£ç¡®ä¸”æœªè¿‡æœŸï¼Ÿ
4. è¯·æ±‚æ ¼å¼     â†’ payload ç»“æž„æ˜¯å¦ç¬¦åˆæœåŠ¡ç«¯é¢„æœŸï¼Ÿ
5. å“åº”è§£æž     â†’ ä»£ç æ˜¯å¦èƒ½æŽ¥å—è¿”å›žçš„å†…å®¹ï¼Ÿ
6. è¯­ä¹‰         â†’ æ•°æ®å«ä¹‰æ˜¯å¦ç¬¦åˆæˆ‘ä»¬çš„å‡è®¾ï¼Ÿ
```

## 5 åˆ†é’Ÿå¿«é€Ÿä¸Šæ‰‹

### é€šè¿‡ terminal è°ƒè¯• REST

```python
# è¯¦ç»†çš„è¯·æ±‚/å“åº”äº¤äº’
terminal('curl -v https://api.example.com/users/1')

# å¸¦ JSON çš„ POST
terminal("""curl -X POST https://api.example.com/users \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"name":"test","email":"test@example.com"}'""")

# ä»…æŸ¥çœ‹å“åº”å¤´
terminal('curl -sI https://api.example.com/health')

# æ ¼å¼åŒ–è¾“å‡º JSON
terminal('curl -s https://api.example.com/users | python3 -m json.tool')
```

### é€šè¿‡ terminal è°ƒè¯• GraphQL

```python
terminal("""curl -X POST https://api.example.com/graphql \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"query":"{ user(id: 1) { name email } }"}'""")
```

**GraphQL æ³¨æ„äº‹é¡¹ï¼š** å³ä½¿æŸ¥è¯¢å¤±è´¥ï¼ŒæœåŠ¡ç«¯é€šå¸¸ä¹Ÿä¼šè¿”å›ž HTTP 200ã€‚æ— è®ºçŠ¶æ€ç å¦‚ä½•ï¼Œå§‹ç»ˆæ£€æŸ¥ `errors` å­—æ®µï¼š

```python
execute_code('''
import os, requests
resp = requests.post(
    "https://api.example.com/graphql",
    json={"query": "{ user(id: 1) { name email } }"},
    headers={"Authorization": f"Bearer {os.environ['TOKEN']}"},
    timeout=10,
)
data = resp.json()
if data.get("errors"):
    for err in data["errors"]:
        print(f"GraphQL error: {err['message']} (path: {err.get('path')})")
print(data.get("data"))
''')
```

### é€šè¿‡ execute_code ä½¿ç”¨ Pythonï¼ˆrequestsï¼‰

```python
execute_code('''
import requests
resp = requests.get(
    "https://api.example.com/users/1",
    headers={"Authorization": "Bearer <TOKEN>"},
    timeout=(3.05, 30),  # (connect, read)
)
print(resp.status_code, dict(resp.headers))
print(resp.text[:500])
''')
```

## åˆ†å±‚è°ƒè¯•æµç¨‹

### ç¬¬ 1 æ­¥ â€” è¿žé€šæ€§

```python
terminal('nslookup api.example.com')
terminal('curl -v --connect-timeout 5 https://api.example.com/health')
```

å¸¸è§æ•…éšœï¼šDNS æ— æ³•è§£æžã€é˜²ç«å¢™ã€éœ€è¦ VPNã€ç¼ºå°‘ä»£ç†ã€‚

### ç¬¬ 1.5 æ­¥ â€” è¶…æ—¶

åŒºåˆ†*æ— æ³•åˆ°è¾¾*ä¸Ž*åˆ°è¾¾ä½†å“åº”æ…¢*ï¼š

```python
terminal('''curl -w "dns:%{time_namelookup}s connect:%{time_connect}s tls:%{time_appconnect}s ttfb:%{time_starttransfer}s total:%{time_total}s\\n" \\
  -o /dev/null -s https://api.example.com/endpoint''')
```

åœ¨ Python ä¸­ï¼Œå§‹ç»ˆä¼ å…¥å…ƒç»„è¶…æ—¶ â€”â€” `requests` æ²¡æœ‰é»˜è®¤å€¼ï¼Œä¼šæ°¸ä¹…æŒ‚èµ·ï¼š

```python
execute_code('''
import requests
from requests.exceptions import ConnectTimeout, ReadTimeout
try:
    requests.get(url, timeout=(3.05, 30))
except ConnectTimeout:
    print("Cannot reach host â€” DNS, firewall, VPN")
except ReadTimeout:
    print("Connected but server is slow")
''')
```

è¯Šæ–­ï¼š`time_connect` é«˜è¯´æ˜Žæ˜¯ç½‘ç»œ/é˜²ç«å¢™é—®é¢˜ï¼›`time_connect` ä½Žä½† `time_starttransfer` é«˜è¯´æ˜Žæ˜¯æœåŠ¡ç«¯å“åº”æ…¢ã€‚

### ç¬¬ 2 æ­¥ â€” TLS/SSL

```python
terminal('curl -vI https://api.example.com 2>&1 | grep -E "SSL|subject|expire|issuer"')
```

å¸¸è§æ•…éšœï¼šè¯ä¹¦è¿‡æœŸã€è‡ªç­¾åè¯ä¹¦ã€ä¸»æœºåä¸åŒ¹é…ã€ç¼ºå°‘ CA bundleã€‚`-k` ä»…ç”¨äºŽä¸´æ—¶è°ƒè¯•ï¼Œä¸å¾—å†™å…¥ä»£ç ã€‚

### ç¬¬ 3 æ­¥ â€” è®¤è¯

```python
# æ£€æŸ¥ token æœ‰æ•ˆæ€§
terminal('curl -s -o /dev/null -w "%{http_code}\\n" -H "Authorization: Bearer $TOKEN" https://api.example.com/me')

# è§£ç  JWT exp å£°æ˜Ž â€” æ­£ç¡®å¤„ç† base64url å¡«å……
execute_code('''
import json, base64, os
tok = os.environ["TOKEN"]
payload = tok.split(".")[1]
payload += "=" * (-len(payload) % 4)
print(json.dumps(json.loads(base64.urlsafe_b64decode(payload)), indent=2))
''')
```

æ£€æŸ¥æ¸…å•ï¼š
- Token æ˜¯å¦è¿‡æœŸï¼Ÿï¼ˆJWT ä¸­çš„ `exp` å£°æ˜Žï¼‰
- è®¤è¯æ–¹æ¡ˆæ˜¯å¦æ­£ç¡®ï¼ŸBearer vs Basic vs Token vs `X-Api-Key`
- çŽ¯å¢ƒæ˜¯å¦æ­£ç¡®ï¼Ÿå°† Staging çš„ key ç”¨äºŽ prod æ˜¯å¸¸è§é”™è¯¯
- API key æ˜¯æ”¾åœ¨è¯·æ±‚å¤´è¿˜æ˜¯æŸ¥è¯¢å‚æ•°ï¼ˆ`?api_key=â€¦`ï¼‰ä¸­ï¼Ÿ

### ç¬¬ 4 æ­¥ â€” è¯·æ±‚æ ¼å¼

```python
terminal("""curl -v -X POST https://api.example.com/endpoint \\
  -H 'Content-Type: application/json' \\
  -d '{"key":"value"}' 2>&1""")
```

**Content-Type ä¸Žè¯·æ±‚ä½“ä¸åŒ¹é… â€”â€” é™é»˜çš„ 415/400ï¼š**

```python
# é”™è¯¯ â€” data= å‘é€è¡¨å•ç¼–ç ï¼Œä½† header å£°æ˜Ž JSON
requests.post(url, data='{"k":"v"}', headers={"Content-Type": "application/json"})

# æ­£ç¡® â€” json= è‡ªåŠ¨è®¾ç½® header å¹¶åºåˆ—åŒ–
requests.post(url, json={"k": "v"})

# é”™è¯¯ â€” Accept å£°æ˜Ž XMLï¼Œä»£ç å´è°ƒç”¨ .json()
requests.get(url, headers={"Accept": "text/xml"})

# æ­£ç¡® â€” è®© requests è‡ªåŠ¨æž„å»ºå¸¦ boundary çš„ multipart
requests.post(url, files={"file": open("doc.pdf", "rb")})
```

å¸¸è§é—®é¢˜ï¼šè¡¨å•ç¼–ç  vs JSONã€ç¼ºå°‘å¿…å¡«å­—æ®µã€HTTP æ–¹æ³•é”™è¯¯ã€æŸ¥è¯¢å‚æ•°æœªç¼–ç ã€‚

### ç¬¬ 5 æ­¥ â€” å“åº”è§£æž

è°ƒç”¨ `.json()` å‰å§‹ç»ˆæ£€æŸ¥ content-typeï¼š

```python
execute_code('''
import requests
resp = requests.post(url, json=payload, timeout=10)
print(f"status={resp.status_code}")
print(f"headers={dict(resp.headers)}")
ct = resp.headers.get("Content-Type", "")
if "application/json" in ct:
    print(resp.json())
else:
    print(f"unexpected content-type {ct!r}, body={resp.text[:500]!r}")
''')
```

å¸¸è§æ•…éšœï¼šæœŸæœ› JSON å´æ”¶åˆ° HTML é”™è¯¯é¡µã€å“åº”ä½“ä¸ºç©ºã€å­—ç¬¦é›†é”™è¯¯ã€‚

### ç¬¬ 6 æ­¥ â€” è¯­ä¹‰éªŒè¯

è§£æžæˆåŠŸ â€”â€” ä½†æ•°æ®*æ­£ç¡®*å—ï¼Ÿ

- `"status": "active"` çš„å«ä¹‰æ˜¯å¦ç¬¦åˆä»£ç é¢„æœŸï¼Ÿ
- å“åº”ä¸­çš„ ID æ˜¯å¦ä¸Žè¯·æ±‚çš„ ID ä¸€è‡´ï¼Ÿ
- æ—¶é—´æˆ³æ˜¯å¦åœ¨é¢„æœŸæ—¶åŒºï¼Ÿ
- åˆ†é¡µæ˜¯å¦è¿”å›žäº†å…¨éƒ¨ç»“æžœï¼Œè¿˜æ˜¯åªæœ‰ç¬¬ 1 é¡µï¼Ÿ

## HTTP çŠ¶æ€ç å¤„ç†æ‰‹å†Œ

### 401 Unauthorized â€” å‡­æ®ç¼ºå¤±æˆ–æ— æ•ˆ

1. `Authorization` è¯·æ±‚å¤´æ˜¯å¦å®žé™…å­˜åœ¨ï¼Ÿï¼ˆç”¨ `curl -v` ç¡®è®¤ï¼‰
2. Token æ˜¯å¦æ­£ç¡®ä¸”æœªè¿‡æœŸï¼Ÿ
3. è®¤è¯æ–¹æ¡ˆæ˜¯å¦æ­£ç¡®ï¼Ÿï¼ˆ`Bearer` vs `Basic` vs `Token`ï¼‰
4. éƒ¨åˆ† API ä½¿ç”¨æŸ¥è¯¢å‚æ•°ï¼ˆ`?api_key=â€¦`ï¼‰è€Œéžè¯·æ±‚å¤´ã€‚

### 403 Forbidden â€” å·²è®¤è¯ä½†æ— æƒé™

1. Token æ˜¯å¦å…·æœ‰æ‰€éœ€çš„ scope/æƒé™ï¼Ÿ
2. èµ„æºæ˜¯å¦å±žäºŽå…¶ä»–è´¦æˆ·ï¼Ÿ
3. IP ç™½åå•æ˜¯å¦å°†ä½ æ‹¦æˆªï¼Ÿ
4. æµè§ˆå™¨ä¸­çš„ CORS é—®é¢˜ï¼Ÿï¼ˆæ£€æŸ¥ `Access-Control-Allow-Origin`ï¼‰

### 404 Not Found â€” èµ„æºä¸å­˜åœ¨æˆ– URL é”™è¯¯

1. è·¯å¾„æ˜¯å¦æ­£ç¡®ï¼Ÿï¼ˆæœ«å°¾æ–œæ ã€æ‹¼å†™é”™è¯¯ã€ç‰ˆæœ¬å‰ç¼€ï¼‰
2. èµ„æº ID æ˜¯å¦å­˜åœ¨ï¼Ÿ
3. API ç‰ˆæœ¬æ˜¯å¦æ­£ç¡®ï¼ˆ`/v1/` vs `/v2/`ï¼‰ï¼Ÿ
4. Base URL æ˜¯å¦æ­£ç¡®ï¼ˆstaging vs prodï¼‰ï¼Ÿ

### 409 Conflict â€” çŠ¶æ€å†²çª

1. èµ„æºæ˜¯å¦å·²å­˜åœ¨ï¼ˆé‡å¤åˆ›å»ºï¼‰ï¼Ÿ
2. `ETag` / `If-Match` æ˜¯å¦è¿‡æœŸï¼Ÿ
3. æ˜¯å¦æœ‰å…¶ä»–è¿›ç¨‹å¹¶å‘ä¿®æ”¹ï¼Ÿ

### 422 Unprocessable Entity â€” JSON åˆæ³•ä½†æ•°æ®æ— æ•ˆ

é”™è¯¯å“åº”ä½“é€šå¸¸ä¼šæŒ‡å‡ºæœ‰é—®é¢˜çš„å­—æ®µã€‚æ£€æŸ¥ï¼š
- å­—æ®µç±»åž‹ï¼ˆstring vs intã€æ—¥æœŸæ ¼å¼ï¼‰
- å¿…å¡« vs å¯é€‰
- æžšä¸¾å€¼æ˜¯å¦åœ¨å…è®¸èŒƒå›´å†…

### 429 Too Many Requests â€” è§¦å‘é™æµ

æ£€æŸ¥ `Retry-After` å’Œ `X-RateLimit-*` å“åº”å¤´ã€‚æŒ‡æ•°é€€é¿ï¼š

```python
execute_code('''
import time, requests

def with_backoff(method, url, **kwargs):
    for attempt in range(5):
        resp = requests.request(method, url, **kwargs)
        if resp.status_code != 429:
            return resp
        wait = int(resp.headers.get("Retry-After", 2 ** attempt))
        time.sleep(wait)
    return resp
''')
```

### 5xx â€” æœåŠ¡ç«¯é—®é¢˜ï¼Œé€šå¸¸ä¸æ˜¯ä½ çš„é”™

- **500** â€” æœåŠ¡ç«¯ bugã€‚è®°å½• correlation IDï¼Œå‘æœåŠ¡å•†æäº¤å·¥å•ã€‚
- **502** â€” ä¸Šæ¸¸æœåŠ¡å®•æœºã€‚é€€é¿åŽé‡è¯•ã€‚
- **503** â€” è¿‡è½½ / ç»´æŠ¤ä¸­ã€‚æŸ¥çœ‹çŠ¶æ€é¡µã€‚
- **504** â€” ä¸Šæ¸¸è¶…æ—¶ã€‚å‡å° payload æˆ–å¢žå¤§è¶…æ—¶æ—¶é—´ã€‚

æ‰€æœ‰ 5xxï¼šå¸¦æŠ–åŠ¨çš„é€€é¿é‡è¯•ï¼ŒæŒç»­å‡ºçŽ°æ—¶å‘å‡ºå‘Šè­¦ã€‚

## åˆ†é¡µä¸Žå¹‚ç­‰æ€§

**åˆ†é¡µã€‚** ç¡®è®¤ä½ èŽ·å–äº†*å…¨éƒ¨*ç»“æžœã€‚æŸ¥æ‰¾ `next_cursor`ã€`next_page`ã€`total_count`ã€‚ä¸¤ç§å¸¸è§æ¨¡å¼ï¼š
- åç§»é‡ï¼ˆ`?limit=100&offset=200`ï¼‰â€”â€” ç®€å•ï¼Œä½†æ•°æ®å˜åŠ¨æ—¶å¯èƒ½è·³è¿‡æ¡ç›®ã€‚
- æ¸¸æ ‡ï¼ˆ`?cursor=abc123`ï¼‰â€”â€” é€‚ç”¨äºŽå®žæ—¶æˆ–å¤§æ•°æ®é›†ï¼ŒæŽ¨èä½¿ç”¨ã€‚

**å¹‚ç­‰æ€§ã€‚** å¯¹äºŽéžå¹‚ç­‰æ“ä½œï¼ˆPOSTï¼‰ï¼Œå‘é€ `Idempotency-Key: <uuid>`ï¼Œç¡®ä¿é‡è¯•ä¸ä¼šé‡å¤æ‰£æ¬¾æˆ–é‡å¤åˆ›å»ºã€‚æ”¯ä»˜å’Œè®¢å•åœºæ™¯å¿…é¡»ä½¿ç”¨ã€‚

## å¥‘çº¦éªŒè¯

åœ¨è¿›å…¥ç”Ÿäº§å‰æ•èŽ· schema æ¼‚ç§»ï¼š

```python
execute_code('''
import requests

def validate_user(data: dict) -> list[str]:
    errors = []
    required = {"id": int, "email": str, "created_at": str}
    for field, expected in required.items():
        if field not in data:
            errors.append(f"missing field: {field}")
        elif not isinstance(data[field], expected):
            errors.append(f"{field}: want {expected.__name__}, got {type(data[field]).__name__}")
    return errors

resp = requests.get(f"{BASE}/users/1", headers=HEADERS, timeout=10)
issues = validate_user(resp.json())
if issues:
    print(f"contract violations: {issues}")
''')
```

åœ¨ API å‡çº§åŽã€æŽ¥å…¥æ–°ç¬¬ä¸‰æ–¹æ—¶ï¼Œæˆ–åœ¨ CI å†’çƒŸæµ‹è¯•ä¸­è¿è¡Œã€‚

## Correlation ID

å§‹ç»ˆè®°å½•æœåŠ¡å•†çš„è¯·æ±‚ ID â€”â€” è¿™æ˜¯è”ç³»åŽ‚å•†æ”¯æŒçš„æœ€å¿«é€”å¾„ï¼š

```python
execute_code('''
import requests
resp = requests.post(url, json=payload, headers=headers, timeout=10)
request_id = (
    resp.headers.get("X-Request-Id")
    or resp.headers.get("X-Trace-Id")
    or resp.headers.get("CF-Ray")  # Cloudflare
)
if resp.status_code >= 400:
    print(f"failed status={resp.status_code} req_id={request_id} ts={resp.headers.get('Date')}")
''')
```

**åŽ‚å•† bug æŠ¥å‘Šæ¨¡æ¿ï¼š**

```
Endpoint:    POST /api/v1/orders
Request ID:  req_abc123xyz
Timestamp:   2026-03-17T14:30:00Z
Status:      500
Expected:    201 with order object
Actual:      500 {"error":"internal server error"}
Repro:       curl -X POST â€¦ (auth: <REDACTED>)
```

## å›žå½’æµ‹è¯•æ¨¡æ¿

å°†ä»¥ä¸‹å†…å®¹æ”¾å…¥ `tests/` ç›®å½•ï¼Œé€šè¿‡ `terminal('pytest tests/test_api_smoke.py -v')` è¿è¡Œï¼š

```python
import os, requests, pytest

BASE_URL = os.environ.get("API_BASE_URL", "https://api.example.com")
TOKEN    = os.environ.get("API_TOKEN", "")
HEADERS  = {"Authorization": f"Bearer {TOKEN}"}

class TestAPISmoke:
    def test_health(self):
        resp = requests.get(f"{BASE_URL}/health", timeout=5)
        assert resp.status_code == 200

    def test_list_users_returns_array(self):
        resp = requests.get(f"{BASE_URL}/users", headers=HEADERS, timeout=10)
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data.get("data", data), list)

    def test_get_user_required_fields(self):
        resp = requests.get(f"{BASE_URL}/users/1", headers=HEADERS, timeout=10)
        assert resp.status_code in (200, 404)
        if resp.status_code == 200:
            user = resp.json()
            assert "id" in user and "email" in user

    def test_invalid_auth_returns_401(self):
        resp = requests.get(
            f"{BASE_URL}/users",
            headers={"Authorization": "Bearer invalid-token"},
            timeout=10,
        )
        assert resp.status_code == 401
```

## å®‰å…¨

### Token å¤„ç†
- ä¸è¦è®°å½•å®Œæ•´ tokenã€‚è„±æ•å¤„ç†ï¼š`Bearer <REDACTED>`ã€‚
- ä¸è¦åœ¨è„šæœ¬ä¸­ç¡¬ç¼–ç  tokenã€‚ä»ŽçŽ¯å¢ƒå˜é‡ï¼ˆ`os.environ["API_TOKEN"]`ï¼‰æˆ– `~/.zed/.env` è¯»å–ã€‚
- å¦‚æžœ token å‡ºçŽ°åœ¨æ—¥å¿—ã€é”™è¯¯ä¿¡æ¯æˆ– git åŽ†å²ä¸­ï¼Œç«‹å³è½®æ¢ã€‚

### å®‰å…¨æ—¥å¿—è®°å½•

```python
def redact_auth(headers: dict) -> dict:
    sensitive = {"authorization", "x-api-key", "cookie", "set-cookie"}
    return {k: ("<REDACTED>" if k.lower() in sensitive else v) for k, v in headers.items()}
```

### æ³„éœ²æ£€æŸ¥æ¸…å•

- [ ] **URL ä¸­çš„å‡­æ®ã€‚** æŸ¥è¯¢å­—ç¬¦ä¸²ä¸­çš„ API key ä¼šå‡ºçŽ°åœ¨æœåŠ¡å™¨æ—¥å¿—ã€æµè§ˆå™¨åŽ†å²ã€Referer è¯·æ±‚å¤´ä¸­ â€”â€” è¯·ä½¿ç”¨è¯·æ±‚å¤´ä¼ é€’ã€‚
- [ ] **é”™è¯¯å“åº”ä¸­çš„ PIIã€‚** `404 on /users/123` ä¸åº”æš´éœ²è¯¥ç”¨æˆ·æ˜¯å¦å­˜åœ¨ï¼ˆæžšä¸¾æ”»å‡»ï¼‰ã€‚
- [ ] **ç”Ÿäº§çŽ¯å¢ƒä¸­çš„å †æ ˆè·Ÿè¸ªã€‚** 500 å“åº”ä¸åº”æ³„éœ²æ–‡ä»¶è·¯å¾„ã€æ¡†æž¶ç‰ˆæœ¬ã€‚
- [ ] **å†…éƒ¨ä¸»æœºå/IPã€‚** é”™è¯¯å“åº”ä½“ä¸­å‡ºçŽ° `10.x.x.x`ã€`internal-api.corp.local`ã€‚
- [ ] **Token è¢«å›žæ˜¾ã€‚** éƒ¨åˆ† API ä¼šåœ¨é”™è¯¯è¯¦æƒ…ä¸­åŒ…å«è®¤è¯ tokenã€‚è¯·éªŒè¯å…¶ä¸ä¼šå¦‚æ­¤ã€‚
- [ ] **å†—ä½™çš„ `Server` / `X-Powered-By`ã€‚** æŠ€æœ¯æ ˆä¿¡æ¯æ³„éœ²ã€‚è®°å½•ä»¥ä¾›å®‰å…¨å®¡æŸ¥ã€‚

## Zed å·¥å…·ä½¿ç”¨æ¨¡å¼

### terminal â€” ç”¨äºŽ curlã€digã€openssl

```python
terminal('curl -sI https://api.example.com')
terminal('openssl s_client -connect api.example.com:443 -servername api.example.com </dev/null 2>/dev/null | openssl x509 -noout -dates')
```

### execute_code â€” ç”¨äºŽå¤šæ­¥éª¤ Python æµç¨‹

å½“è°ƒè¯•è·¨è¶Šè®¤è¯ â†’ è¯·æ±‚ â†’ åˆ†é¡µ â†’ éªŒè¯å¤šä¸ªçŽ¯èŠ‚æ—¶ï¼Œä½¿ç”¨ `execute_code`ã€‚å˜é‡åœ¨è„šæœ¬å†…æŒä¹…å­˜åœ¨ï¼Œç»“æžœæ‰“å°åˆ° stdoutï¼Œä¸ä¼šåœ¨ä¸Šä¸‹æ–‡ä¸­äº§ç”Ÿ token æ±¡æŸ“ï¼š

```python
execute_code('''
import os, requests

token = os.environ["API_TOKEN"]
base  = "https://api.example.com"
H     = {"Authorization": f"Bearer {token}"}

# 1. è®¤è¯
me = requests.get(f"{base}/me", headers=H, timeout=10)
print(f"auth {me.status_code}")

# 2. åˆ†é¡µ
all_users, cursor = [], None
while True:
    params = {"cursor": cursor} if cursor else {}
    r = requests.get(f"{base}/users", headers=H, params=params, timeout=10)
    body = r.json()
    all_users.extend(body["data"])
    cursor = body.get("next_cursor")
    if not cursor:
        break
print(f"users={len(all_users)}")
''')
```

### web_extract â€” ç”¨äºŽæŸ¥é˜…åŽ‚å•† API æ–‡æ¡£

ç›´æŽ¥æ‹‰å–ä½ æ­£åœ¨è°ƒè¯•çš„ç«¯ç‚¹çš„è§„èŒƒï¼Œè€Œä¸æ˜¯é çŒœæµ‹ï¼š

```python
web_extract(urls=["https://docs.example.com/api/v1/users"])
```

### delegate_task â€” ç”¨äºŽå®Œæ•´çš„ CRUD æµ‹è¯•æ‰«æ

```python
delegate_task(
    goal="Test all CRUD endpoints for /api/v1/users",
    context="""
Follow the rest-graphql-debug skill (optional-skills/software-development/rest-graphql-debug).
Base URL: https://api.example.com
Auth: Bearer token from API_TOKEN env var.

For each verb (POST, GET, PATCH, DELETE):
  - happy path: assert status + response schema
  - error cases: 400, 404, 422
  - log a repro curl for any failure (redact tokens)

Output: pass/fail per endpoint + correlation IDs for failures.
""",
    toolsets=["terminal", "file"],
)
```

## è¾“å‡ºæ ¼å¼

æŠ¥å‘Šè°ƒè¯•ç»“è®ºæ—¶ï¼š

```
## Finding
Endpoint: POST /api/v1/users
Status:   422 Unprocessable Entity
Req ID:   req_abc123xyz

## Repro
curl -X POST https://api.example.com/api/v1/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <REDACTED>' \
  -d '{"name":"test"}'

## Root Cause
Missing required field `email`. Server validation rejects before processing.

## Fix
-d '{"name":"test","email":"test@example.com"}'
```

## ç›¸å…³ Skill

- `systematic-debugging` â€”â€” éš”ç¦»å‡ºæ•…éšœ API å±‚åŽï¼Œå¯¹ä»£ç è¿›è¡Œæ ¹å› åˆ†æž
- `test-driven-development` â€”â€” åœ¨å‘å¸ƒä¿®å¤å‰å…ˆç¼–å†™å›žå½’æµ‹è¯•