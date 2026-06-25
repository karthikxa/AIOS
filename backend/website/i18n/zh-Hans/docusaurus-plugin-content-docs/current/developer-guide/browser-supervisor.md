# Browser CDP Supervisor â€” è®¾è®¡æ–‡æ¡£

**çŠ¶æ€ï¼š** å·²å‘å¸ƒï¼ˆPR 14540ï¼‰
**æœ€åŽæ›´æ–°ï¼š** 2026-04-23
**ä½œè€…ï¼š** @teknium1

## é—®é¢˜

åŽŸç”Ÿ JS å¯¹è¯æ¡†ï¼ˆ`alert`/`confirm`/`prompt`/`beforeunload`ï¼‰å’Œ iframe æ˜¯æˆ‘ä»¬æµè§ˆå™¨å·¥å…·ä¸­æœ€å¤§çš„ä¸¤ä¸ªç¼ºå£ï¼š

1. **å¯¹è¯æ¡†ä¼šé˜»å¡ž JS çº¿ç¨‹ã€‚** é¡µé¢ä¸Šçš„ä»»ä½•æ“ä½œéƒ½ä¼šæŒ‚èµ·ï¼Œç›´åˆ°å¯¹è¯æ¡†è¢«å¤„ç†ã€‚åœ¨æ­¤å·¥ä½œä¹‹å‰ï¼Œagent æ— æ³•æ„ŸçŸ¥å¯¹è¯æ¡†æ˜¯å¦å·²æ‰“å¼€â€”â€”åŽç»­çš„å·¥å…·è°ƒç”¨ä¼šæŒ‚èµ·æˆ–æŠ›å‡ºä¸é€æ˜Žçš„é”™è¯¯ã€‚
2. **iframe ä¸å¯è§ã€‚** Agent å¯ä»¥åœ¨ DOM å¿«ç…§ä¸­çœ‹åˆ° iframe èŠ‚ç‚¹ï¼Œä½†æ— æ³•åœ¨å…¶ä¸­ç‚¹å‡»ã€è¾“å…¥æˆ–æ‰§è¡Œ evalâ€”â€”å°¤å…¶æ˜¯è¿è¡Œåœ¨ç‹¬ç«‹ Chromium è¿›ç¨‹ä¸­çš„è·¨åŸŸï¼ˆOOPIFï¼‰iframeã€‚

[PR #12550](https://github.com/NousResearch/zed-agent/pull/12550) æå‡ºäº†ä¸€ä¸ªæ— çŠ¶æ€çš„ `browser_dialog` åŒ…è£…å™¨ã€‚è¯¥æ–¹æ¡ˆæ— æ³•è§£å†³æ£€æµ‹é—®é¢˜â€”â€”å®ƒåªæ˜¯åœ¨ agent å·²ç»ï¼ˆé€šè¿‡ç—‡çŠ¶ï¼‰çŸ¥é“å¯¹è¯æ¡†å·²æ‰“å¼€æ—¶ï¼Œæä¾›äº†ä¸€ä¸ªæ›´ç®€æ´çš„ CDP è°ƒç”¨ã€‚å·²ä½œä¸ºè¢«å–ä»£æ–¹æ¡ˆå…³é—­ã€‚

## åŽç«¯èƒ½åŠ›çŸ©é˜µï¼ˆ2026-04-23 å®žæµ‹éªŒè¯ï¼‰

ä½¿ç”¨ä¸€æ¬¡æ€§æŽ¢æµ‹è„šæœ¬ï¼Œé’ˆå¯¹ä¸€ä¸ªåœ¨ä¸»æ¡†æž¶å’ŒåŒæº srcdoc iframe ä¸­è§¦å‘ alert çš„ data-URL é¡µé¢ï¼Œä»¥åŠä¸€ä¸ªè·¨åŸŸ `https://example.com` iframe è¿›è¡Œæµ‹è¯•ï¼š

| åŽç«¯ | å¯¹è¯æ¡†æ£€æµ‹ | å¯¹è¯æ¡†å“åº” | æ¡†æž¶æ ‘ | OOPIF `Runtime.evaluate`ï¼ˆé€šè¿‡ `browser_cdp(frame_id=...)`ï¼‰ |
|---|---|---|---|---|
| æœ¬åœ° Chromeï¼ˆ`--remote-debugging-port`ï¼‰/ `/browser connect` | âœ“ | âœ“ å®Œæ•´æµç¨‹ | âœ“ | âœ“ |
| Browserbase | âœ“ï¼ˆé€šè¿‡ bridgeï¼‰ | âœ“ å®Œæ•´æµç¨‹ï¼ˆé€šè¿‡ bridgeï¼‰ | âœ“ | âœ“ï¼ˆ`document.title = "Example Domain"` å·²åœ¨çœŸå®žè·¨åŸŸ iframe ä¸ŠéªŒè¯ï¼‰ |
| Camofox | âœ— æ—  CDPï¼ˆä»… RESTï¼‰ | âœ— | é€šè¿‡ DOM å¿«ç…§éƒ¨åˆ†æ”¯æŒ | âœ— |

**Browserbase å“åº”çš„å·¥ä½œåŽŸç†ã€‚** Browserbase çš„ CDP ä»£ç†åœ¨å†…éƒ¨ä½¿ç”¨ Playwrightï¼Œå¹¶åœ¨çº¦ 10ms å†…è‡ªåŠ¨å…³é—­åŽŸç”Ÿå¯¹è¯æ¡†ï¼Œå› æ­¤ `Page.handleJavaScriptDialog` æ— æ³•è·Ÿä¸Šã€‚ä¸ºè§£å†³æ­¤é—®é¢˜ï¼Œsupervisor é€šè¿‡ `Page.addScriptToEvaluateOnNewDocument` æ³¨å…¥ä¸€ä¸ª bridge è„šæœ¬ï¼Œå°† `window.alert`/`confirm`/`prompt` è¦†ç›–ä¸ºå‘é­”æ³•ä¸»æœºï¼ˆ`zed-dialog-bridge.invalid`ï¼‰å‘èµ·çš„åŒæ­¥ XHRã€‚`Fetch.enable` åœ¨è¿™äº› XHR è§¦è¾¾ç½‘ç»œä¹‹å‰å°†å…¶æ‹¦æˆªâ€”â€”å¯¹è¯æ¡†å˜æˆ supervisor æ•èŽ·çš„ `Fetch.requestPaused` äº‹ä»¶ï¼Œ`respond_to_dialog` é€šè¿‡ `Fetch.fulfillRequest` ä»¥ JSON å“åº”ä½“å®Œæˆè¯·æ±‚ï¼Œæ³¨å…¥çš„è„šæœ¬å¯¹å…¶è¿›è¡Œè§£ç ã€‚

æœ€ç»ˆæ•ˆæžœï¼šä»Žé¡µé¢è§’åº¦çœ‹ï¼Œ`prompt()` ä»ç„¶è¿”å›ž agent æä¾›çš„å­—ç¬¦ä¸²ã€‚ä»Ž agent è§’åº¦çœ‹ï¼Œæ— è®ºå“ªç§æ–¹å¼ï¼Œéƒ½æ˜¯åŒä¸€å¥— `browser_dialog(action=...)` APIã€‚å·²é’ˆå¯¹çœŸå®ž Browserbase ä¼šè¯è¿›è¡Œç«¯åˆ°ç«¯æµ‹è¯•â€”â€”4/4ï¼ˆalert/prompt/confirm-accept/confirm-dismissï¼‰å…¨éƒ¨é€šè¿‡ï¼ŒåŒ…æ‹¬å€¼å›žä¼ åˆ°é¡µé¢ JS çš„éªŒè¯ã€‚

Camofox åœ¨æœ¬ PR ä¸­æš‚ä¸æ”¯æŒï¼›è®¡åˆ’åœ¨ `jo-inc/camofox-browser` æäº¤ä¸Šæ¸¸ issueï¼Œè¯·æ±‚æ·»åŠ å¯¹è¯æ¡†è½®è¯¢ç«¯ç‚¹ã€‚

## æž¶æž„

### CDPSupervisor

æ¯ä¸ª Zed `task_id` å¯¹åº”ä¸€ä¸ªåœ¨åŽå°å®ˆæŠ¤çº¿ç¨‹ä¸­è¿è¡Œçš„ `asyncio.Task`ã€‚æŒæœ‰ä¸€ä¸ªåˆ°åŽç«¯ CDP ç«¯ç‚¹çš„æŒä¹… WebSocket è¿žæŽ¥ã€‚ç»´æŠ¤ï¼š

- **å¯¹è¯æ¡†é˜Ÿåˆ—** â€” `List[PendingDialog]`ï¼ŒåŒ…å« `{id, type, message, default_prompt, session_id, opened_at}`
- **æ¡†æž¶æ ‘** â€” `Dict[frame_id, FrameInfo]`ï¼ŒåŒ…å«çˆ¶å­å…³ç³»ã€URLã€originï¼Œä»¥åŠæ˜¯å¦ä¸ºè·¨åŸŸå­ä¼šè¯
- **ä¼šè¯æ˜ å°„** â€” `Dict[session_id, SessionInfo]`ï¼Œä¾›äº¤äº’å·¥å…·å°†æ“ä½œè·¯ç”±åˆ°æ­£ç¡®çš„å·²é™„åŠ ä¼šè¯ä»¥æ‰§è¡Œ OOPIF æ“ä½œ
- **è¿‘æœŸæŽ§åˆ¶å°é”™è¯¯** â€” æœ€è¿‘ 50 æ¡çš„çŽ¯å½¢ç¼“å†²åŒºï¼ˆç”¨äºŽ PR 2 è¯Šæ–­ï¼‰

é™„åŠ æ—¶è®¢é˜…ï¼š
- `Page.enable` â€” `javascriptDialogOpening`ã€`frameAttached`ã€`frameNavigated`ã€`frameDetached`
- `Runtime.enable` â€” `executionContextCreated`ã€`consoleAPICalled`ã€`exceptionThrown`
- `Target.setAutoAttach {autoAttach: true, flatten: true}` â€” æš´éœ²å­ OOPIF targetï¼›supervisor åœ¨æ¯ä¸ªä¸Šå¯ç”¨ `Page`+`Runtime`

é€šè¿‡å¿«ç…§é”å®žçŽ°çº¿ç¨‹å®‰å…¨çš„çŠ¶æ€è®¿é—®ï¼›å·¥å…·å¤„ç†å™¨ï¼ˆåŒæ­¥ï¼‰è¯»å–å†»ç»“å¿«ç…§ï¼Œæ— éœ€ awaitã€‚

### ç”Ÿå‘½å‘¨æœŸ

- **å¯åŠ¨ï¼š** `SupervisorRegistry.get_or_start(task_id, cdp_url)` â€” ç”± `browser_navigate`ã€Browserbase ä¼šè¯åˆ›å»ºã€`/browser connect` è°ƒç”¨ã€‚å¹‚ç­‰ã€‚
- **åœæ­¢ï¼š** ä¼šè¯æ‹†é™¤æˆ– `/browser disconnect`ã€‚å–æ¶ˆ asyncio taskï¼Œå…³é—­ WebSocketï¼Œä¸¢å¼ƒçŠ¶æ€ã€‚
- **é‡æ–°ç»‘å®šï¼š** è‹¥ CDP URL å˜æ›´ï¼ˆç”¨æˆ·é‡æ–°è¿žæŽ¥åˆ°æ–°çš„ Chromeï¼‰ï¼Œåœæ­¢æ—§ supervisor å¹¶é‡æ–°å¯åŠ¨â€”â€”ç»ä¸è·¨ç«¯ç‚¹å¤ç”¨çŠ¶æ€ã€‚

### å¯¹è¯æ¡†ç­–ç•¥

é€šè¿‡ `config.yaml` ä¸­çš„ `browser.dialog_policy` é…ç½®ï¼š

- **`must_respond`**ï¼ˆé»˜è®¤ï¼‰â€” æ•èŽ·ï¼Œåœ¨ `browser_snapshot` ä¸­å‘ˆçŽ°ï¼Œç­‰å¾…æ˜¾å¼çš„ `browser_dialog(action=...)` è°ƒç”¨ã€‚åœ¨ 300s å®‰å…¨è¶…æ—¶åŽè‹¥æ— å“åº”ï¼Œåˆ™è‡ªåŠ¨å…³é—­å¹¶è®°å½•æ—¥å¿—ã€‚é˜²æ­¢æœ‰ç¼ºé™·çš„ agent æ°¸ä¹…æŒ‚èµ·ã€‚
- `auto_dismiss` â€” è®°å½•å¹¶ç«‹å³å…³é—­ï¼›agent äº‹åŽé€šè¿‡ `browser_snapshot` å†…çš„ `browser_state` æŸ¥çœ‹ã€‚
- `auto_accept` â€” è®°å½•å¹¶æŽ¥å—ï¼ˆé€‚ç”¨äºŽç”¨æˆ·å¸Œæœ›å¹²å‡€å¯¼èˆªç¦»å¼€æ—¶çš„ `beforeunload`ï¼‰ã€‚

ç­–ç•¥æŒ‰ task é…ç½®ï¼›v1 ä¸æ”¯æŒæŒ‰å¯¹è¯æ¡†è¦†ç›–ã€‚

## Agent æŽ¥å£ï¼ˆPR 1ï¼‰

### ä¸€ä¸ªæ–°å·¥å…·

```
browser_dialog(action, prompt_text=None, dialog_id=None)
```

- `action="accept"` / `"dismiss"` â†’ å“åº”æŒ‡å®šçš„æˆ–å”¯ä¸€å¾…å¤„ç†çš„å¯¹è¯æ¡†ï¼ˆå¿…å¡«ï¼‰
- `prompt_text=...` â†’ å‘ `prompt()` å¯¹è¯æ¡†æä¾›çš„æ–‡æœ¬
- `dialog_id=...` â†’ å½“å¤šä¸ªå¯¹è¯æ¡†æŽ’é˜Ÿæ—¶ç”¨äºŽæ¶ˆæ­§ï¼ˆç½•è§ï¼‰

è¯¥å·¥å…·ä»…ç”¨äºŽå“åº”ã€‚Agent åœ¨è°ƒç”¨å‰ä»Ž `browser_snapshot` è¾“å‡ºä¸­è¯»å–å¾…å¤„ç†å¯¹è¯æ¡†ã€‚

### `browser_snapshot` æ‰©å±•

å½“ supervisor å·²é™„åŠ æ—¶ï¼Œåœ¨çŽ°æœ‰å¿«ç…§è¾“å‡ºä¸­æ–°å¢žä¸‰ä¸ªå¯é€‰å­—æ®µï¼š

```json
{
  "pending_dialogs": [
    {"id": "d-1", "type": "alert", "message": "Hello", "opened_at": 1650000000.0}
  ],
  "recent_dialogs": [
    {"id": "d-1", "type": "alert", "message": "...", "opened_at": 1650000000.0,
     "closed_at": 1650000000.1, "closed_by": "remote"}
  ],
  "frame_tree": {
    "top": {"frame_id": "FRAME_A", "url": "https://example.com/", "origin": "https://example.com"},
    "children": [
      {"frame_id": "FRAME_B", "url": "about:srcdoc", "is_oopif": false},
      {"frame_id": "FRAME_C", "url": "https://ads.example.net/", "is_oopif": true, "session_id": "SID_C"}
    ],
    "truncated": false
  }
}
```

- **`pending_dialogs`**ï¼šå½“å‰é˜»å¡žé¡µé¢ JS çº¿ç¨‹çš„å¯¹è¯æ¡†ã€‚Agent å¿…é¡»è°ƒç”¨ `browser_dialog(action=...)` è¿›è¡Œå“åº”ã€‚åœ¨ Browserbase ä¸Šä¸ºç©ºï¼Œå› ä¸ºå…¶ CDP ä»£ç†ä¼šåœ¨çº¦ 10ms å†…è‡ªåŠ¨å…³é—­å¯¹è¯æ¡†ã€‚

- **`recent_dialogs`**ï¼šæœ€è¿‘å…³é—­çš„æœ€å¤š 20 ä¸ªå¯¹è¯æ¡†çš„çŽ¯å½¢ç¼“å†²åŒºï¼Œå¸¦æœ‰ `closed_by` æ ‡ç­¾â€”â€”`"agent"`ï¼ˆæˆ‘ä»¬å“åº”äº†ï¼‰ã€`"auto_policy"`ï¼ˆæœ¬åœ° auto_dismiss/auto_acceptï¼‰ã€`"watchdog"`ï¼ˆmust_respond è¶…æ—¶è§¦å‘ï¼‰æˆ– `"remote"`ï¼ˆæµè§ˆå™¨/åŽç«¯ä¸»åŠ¨å…³é—­ï¼Œä¾‹å¦‚ Browserbaseï¼‰ã€‚è¿™æ˜¯ Browserbase ä¸Šçš„ agent ä»èƒ½äº†è§£å‘ç”Ÿäº†ä»€ä¹ˆçš„æ–¹å¼ã€‚

- **`frame_tree`**ï¼šæ¡†æž¶ç»“æž„ï¼ŒåŒ…æ‹¬è·¨åŸŸï¼ˆOOPIFï¼‰å­æ¡†æž¶ã€‚ä¸Šé™ä¸º 30 æ¡ + OOPIF æ·±åº¦ 2ï¼Œä»¥é™åˆ¶å¹¿å‘Šå¯†é›†é¡µé¢ä¸Šçš„å¿«ç…§å¤§å°ã€‚å½“è¾¾åˆ°é™åˆ¶æ—¶ï¼Œ`truncated: true` ä¼šå‡ºçŽ°ï¼›éœ€è¦å®Œæ•´æ ‘çš„ agent å¯ä½¿ç”¨ `browser_cdp` é…åˆ `Page.getFrameTree`ã€‚

ä»¥ä¸Šå‡ä¸æ–°å¢žå·¥å…· schema æŽ¥å£â€”â€”agent ä»Žå…¶å·²è¯·æ±‚çš„å¿«ç…§ä¸­è¯»å–ã€‚

### å¯ç”¨æ€§é—¨æŽ§

ä¸¤ä¸ªæŽ¥å£å‡é€šè¿‡ `_browser_cdp_check` è¿›è¡Œé—¨æŽ§ï¼ˆsupervisor åªèƒ½åœ¨ CDP ç«¯ç‚¹å¯è¾¾æ—¶è¿è¡Œï¼‰ã€‚åœ¨ Camofox / æ— åŽç«¯ä¼šè¯ä¸­ï¼Œå¯¹è¯æ¡†å·¥å…·è¢«éšè—ï¼Œå¿«ç…§çœç•¥æ–°å­—æ®µâ€”â€”ä¸äº§ç”Ÿ schema è†¨èƒ€ã€‚

## è·¨åŸŸ iframe äº¤äº’

åœ¨å¯¹è¯æ¡†æ£€æµ‹å·¥ä½œçš„åŸºç¡€ä¸Šï¼Œ`browser_cdp(frame_id=...)` é€šè¿‡ supervisor å·²è¿žæŽ¥çš„ WebSocketï¼Œä½¿ç”¨ OOPIF çš„å­ `sessionId` è·¯ç”± CDP è°ƒç”¨ï¼ˆå°¤å…¶æ˜¯ `Runtime.evaluate`ï¼‰ã€‚Agent ä»Ž `browser_snapshot.frame_tree.children[]` ä¸­ `is_oopif=true` çš„æ¡ç›®èŽ·å– frame_idï¼Œå¹¶å°†å…¶ä¼ é€’ç»™ `browser_cdp`ã€‚å¯¹äºŽåŒæº iframeï¼ˆæ— ä¸“ç”¨ CDP ä¼šè¯ï¼‰ï¼Œagent æ”¹ç”¨é¡¶å±‚ `Runtime.evaluate` ä¸­çš„ `contentWindow`/`contentDocument`â€”â€”å½“ `frame_id` å±žäºŽéž OOPIF æ—¶ï¼Œsupervisor ä¼šè¿”å›žæŒ‡å‘è¯¥å›žé€€æ–¹æ¡ˆçš„é”™è¯¯ã€‚

åœ¨ Browserbase ä¸Šï¼Œè¿™æ˜¯ iframe äº¤äº’çš„**å”¯ä¸€**å¯é è·¯å¾„â€”â€”æ— çŠ¶æ€ CDP è¿žæŽ¥ï¼ˆæ¯æ¬¡ `browser_cdp` è°ƒç”¨æ—¶æ‰“å¼€ï¼‰ä¼šé­é‡ç­¾å URL è¿‡æœŸï¼Œè€Œ supervisor çš„é•¿è¿žæŽ¥åˆ™ä¿æŒæœ‰æ•ˆä¼šè¯ã€‚

## Camofoxï¼ˆåŽç»­è·Ÿè¿›ï¼‰

è®¡åˆ’å‘ `jo-inc/camofox-browser` æäº¤ issueï¼Œæ·»åŠ ï¼š
- æ¯ä¸ªä¼šè¯çš„ Playwright `page.on('dialog', handler)`
- `GET /tabs/:tabId/dialogs` è½®è¯¢ç«¯ç‚¹
- `POST /tabs/:tabId/dialogs/:id` ç”¨äºŽæŽ¥å—/å…³é—­
- æ¡†æž¶æ ‘å†…çœç«¯ç‚¹

## æ¶‰åŠæ–‡ä»¶ï¼ˆPR 1ï¼‰

### æ–°å¢ž

- `tools/browser_supervisor.py` â€” `CDPSupervisor`ã€`SupervisorRegistry`ã€`PendingDialog`ã€`FrameInfo`
- `tools/browser_dialog_tool.py` â€” `browser_dialog` å·¥å…·å¤„ç†å™¨
- `tests/tools/test_browser_supervisor.py` â€” æ¨¡æ‹Ÿ CDP WebSocket æœåŠ¡å™¨ + ç”Ÿå‘½å‘¨æœŸ/çŠ¶æ€æµ‹è¯•
- `website/docs/developer-guide/browser-supervisor.md` â€” æœ¬æ–‡ä»¶

### ä¿®æ”¹

- `toolsets.py` â€” åœ¨ `browser`ã€`zed-acp`ã€`zed-api-server`ã€æ ¸å¿ƒå·¥å…·é›†ä¸­æ³¨å†Œ `browser_dialog`ï¼ˆé€šè¿‡ CDP å¯è¾¾æ€§é—¨æŽ§ï¼‰
- `tools/browser_tool.py`
  - `browser_navigate` å¯åŠ¨é’©å­ï¼šè‹¥ CDP URL å¯è§£æžï¼Œè°ƒç”¨ `SupervisorRegistry.get_or_start(task_id, cdp_url)`
  - `browser_snapshot`ï¼ˆçº¦ç¬¬ 1536 è¡Œï¼‰ï¼šå°† supervisor çŠ¶æ€åˆå¹¶åˆ°è¿”å›žè½½è·
  - `/browser connect` å¤„ç†å™¨ï¼šä»¥æ–°ç«¯ç‚¹é‡å¯ supervisor
  - `_cleanup_browser_session` ä¸­çš„ä¼šè¯æ‹†é™¤é’©å­
- `zed_cli/config.py` â€” å‘ `DEFAULT_CONFIG` æ·»åŠ  `browser.dialog_policy` å’Œ `browser.dialog_timeout_s`
- æ–‡æ¡£ï¼š`website/docs/user-guide/features/browser.md`ã€`website/docs/reference/tools-reference.md`ã€`website/docs/reference/toolsets-reference.md`

## éžç›®æ ‡

- Camofox çš„æ£€æµ‹/äº¤äº’ï¼ˆä¸Šæ¸¸ç¼ºå£ï¼›å•ç‹¬è·Ÿè¸ªï¼‰
- å‘ç”¨æˆ·å®žæ—¶æµå¼ä¼ è¾“å¯¹è¯æ¡†/æ¡†æž¶äº‹ä»¶ï¼ˆéœ€è¦ gateway é’©å­ï¼‰
- è·¨ä¼šè¯æŒä¹…åŒ–å¯¹è¯æ¡†åŽ†å²ï¼ˆä»…å†…å­˜ï¼‰
- æŒ‰ iframe é…ç½®å¯¹è¯æ¡†ç­–ç•¥ï¼ˆagent å¯é€šè¿‡ `dialog_id` è¡¨è¾¾ï¼‰
- æ›¿æ¢ `browser_cdp`â€”â€”å®ƒä½œä¸ºé•¿å°¾åœºæ™¯ï¼ˆcookiesã€viewportã€ç½‘ç»œé™é€Ÿï¼‰çš„é€ƒç”Ÿèˆ±å£ç»§ç»­ä¿ç•™

## æµ‹è¯•

å•å…ƒæµ‹è¯•ä½¿ç”¨ asyncio æ¨¡æ‹Ÿ CDP æœåŠ¡å™¨ï¼Œè¯¥æœåŠ¡å™¨å®žçŽ°äº†è¶³å¤Ÿçš„åè®®å­é›†ï¼Œä»¥è¦†ç›–æ‰€æœ‰çŠ¶æ€è½¬æ¢ï¼šé™„åŠ ã€å¯ç”¨ã€å¯¼èˆªã€å¯¹è¯æ¡†è§¦å‘ã€å¯¹è¯æ¡†å…³é—­ã€æ¡†æž¶é™„åŠ /åˆ†ç¦»ã€å­ target é™„åŠ ã€ä¼šè¯æ‹†é™¤ã€‚çœŸå®žåŽç«¯ç«¯åˆ°ç«¯æµ‹è¯•ï¼ˆBrowserbase + æœ¬åœ° Chromium ç³»æµè§ˆå™¨ï¼‰ä¸ºæ‰‹åŠ¨æ‰§è¡Œâ€”â€”é€šè¿‡ `/browser connect` è¿žæŽ¥åˆ°å®žæ—¶ Chromium ç³»æµè§ˆå™¨ï¼Œå¹¶è¿è¡Œä¸Šè¿°å¯¹è¯æ¡†/æ¡†æž¶æµ‹è¯•ç”¨ä¾‹ã€‚