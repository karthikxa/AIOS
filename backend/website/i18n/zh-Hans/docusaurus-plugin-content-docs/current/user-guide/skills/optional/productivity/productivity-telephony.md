---
title: "ç”µè¯åŠŸèƒ½ â€” æ— éœ€ä¿®æ”¹æ ¸å¿ƒå·¥å…·å³å¯èµ‹äºˆ Zed ç”µè¯èƒ½åŠ›"
sidebar_label: "Telephony"
description: "æ— éœ€ä¿®æ”¹æ ¸å¿ƒå·¥å…·å³å¯èµ‹äºˆ Zed ç”µè¯èƒ½åŠ›"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Telephony

æ— éœ€ä¿®æ”¹æ ¸å¿ƒå·¥å…·å³å¯èµ‹äºˆ Zed ç”µè¯èƒ½åŠ›ã€‚é…ç½®å¹¶æŒä¹…åŒ– Twilio å·ç ï¼Œæ”¶å‘ SMS/MMSï¼Œç›´æŽ¥æ‹¨æ‰“ç”µè¯ï¼Œä»¥åŠé€šè¿‡ Bland.ai æˆ– Vapi å‘èµ· AI é©±åŠ¨çš„å¤–å‘¼ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/productivity/telephony` å®‰è£… |
| è·¯å¾„ | `optional-skills/productivity/telephony` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Team |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `telephony`, `phone`, `sms`, `mms`, `voice`, `twilio`, `bland.ai`, `vapi`, `calling`, `texting` |
| ç›¸å…³ skill | [`maps`](/user-guide/skills/bundled/productivity/productivity-maps), [`google-workspace`](/user-guide/skills/bundled/productivity/productivity-google-workspace), [`agentmail`](/user-guide/skills/optional/email/email-agentmail) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Telephony â€” æ— éœ€ä¿®æ”¹æ ¸å¿ƒå·¥å…·å³å¯ä½¿ç”¨å·ç ã€é€šè¯å’ŒçŸ­ä¿¡

æ­¤å¯é€‰ skill ä¸º Zed æä¾›å®žç”¨çš„ç”µè¯èƒ½åŠ›ï¼ŒåŒæ—¶å°†ç”µè¯åŠŸèƒ½ä¿ç•™åœ¨æ ¸å¿ƒå·¥å…·åˆ—è¡¨ä¹‹å¤–ã€‚

å®ƒé™„å¸¦ä¸€ä¸ªè¾…åŠ©è„šæœ¬ `scripts/telephony.py`ï¼Œå¯ä»¥ï¼š
- å°†æœåŠ¡å•†å‡­æ®ä¿å­˜åˆ° `~/.zed/.env`
- æœç´¢å¹¶è´­ä¹° Twilio ç”µè¯å·ç 
- è®°ä½å·²æ‹¥æœ‰çš„å·ç ä»¥ä¾›åŽç»­ä¼šè¯ä½¿ç”¨
- ä»Žå·²æ‹¥æœ‰çš„å·ç å‘é€ SMS / MMS
- æ— éœ€ webhook æœåŠ¡å™¨å³å¯è½®è¯¢è¯¥å·ç çš„å…¥ç«™ SMS
- ä½¿ç”¨ TwiML `<Say>` æˆ– `<Play>` ç›´æŽ¥æ‹¨æ‰“ Twilio ç”µè¯
- å°†å·²æ‹¥æœ‰çš„ Twilio å·ç å¯¼å…¥ Vapi
- é€šè¿‡ Bland.ai æˆ– Vapi å‘èµ· AI å¤–å‘¼

## æ­¤ skill è§£å†³çš„é—®é¢˜

æ­¤ skill æ—¨åœ¨è¦†ç›–ç”¨æˆ·å®žé™…éœ€è¦çš„ç”µè¯ä»»åŠ¡ï¼š
- å¤–å‘¼
- å‘çŸ­ä¿¡
- æ‹¥æœ‰ä¸€ä¸ªå¯å¤ç”¨çš„ agent å·ç 
- æŸ¥çœ‹ä¹‹åŽå‘é€åˆ°è¯¥å·ç çš„æ¶ˆæ¯
- åœ¨ä¼šè¯ä¹‹é—´ä¿ç•™è¯¥å·ç åŠç›¸å…³ ID
- ä¸ºå…¥ç«™ SMS è½®è¯¢å’Œå…¶ä»–è‡ªåŠ¨åŒ–æä¾›é¢å‘æœªæ¥çš„ç”µè¯èº«ä»½

å®ƒ**ä¸ä¼š**å°† Zed å˜æˆå®žæ—¶å…¥ç«™ç”µè¯ç½‘å…³ï¼ˆgatewayï¼‰ã€‚å…¥ç«™ SMS é€šè¿‡è½®è¯¢ Twilio REST API å¤„ç†ã€‚è¿™å¯¹è®¸å¤šå·¥ä½œæµå·²ç»è¶³å¤Ÿï¼ŒåŒ…æ‹¬é€šçŸ¥å’Œéƒ¨åˆ†ä¸€æ¬¡æ€§éªŒè¯ç èŽ·å–ï¼Œæ— éœ€æ·»åŠ æ ¸å¿ƒ webhook åŸºç¡€è®¾æ–½ã€‚

## å®‰å…¨è§„åˆ™ â€” å¼ºåˆ¶æ‰§è¡Œ

1. åœ¨æ‹¨æ‰“ç”µè¯æˆ–å‘é€çŸ­ä¿¡å‰ï¼Œå§‹ç»ˆå…ˆç¡®è®¤ã€‚
2. ç¦æ­¢æ‹¨æ‰“ç´§æ€¥å·ç ã€‚
3. ç¦æ­¢å°†ç”µè¯åŠŸèƒ½ç”¨äºŽéªšæ‰°ã€åžƒåœ¾ä¿¡æ¯ã€å†’å……ä»–äººæˆ–ä»»ä½•è¿æ³•è¡Œä¸ºã€‚
4. å°†ç¬¬ä¸‰æ–¹ç”µè¯å·ç è§†ä¸ºæ•æ„Ÿæ“ä½œæ•°æ®ï¼š
   - ä¸è¦å°†å…¶ä¿å­˜åˆ° Zed è®°å¿†ä¸­
   - é™¤éžç”¨æˆ·æ˜Žç¡®è¦æ±‚ï¼Œå¦åˆ™ä¸è¦å°†å…¶åŒ…å«åœ¨ skill æ–‡æ¡£ã€æ‘˜è¦æˆ–åŽç»­ç¬”è®°ä¸­
5. æŒä¹…åŒ–**agent æ‹¥æœ‰çš„ Twilio å·ç **æ˜¯å…è®¸çš„ï¼Œå› ä¸ºè¿™æ˜¯ç”¨æˆ·é…ç½®çš„ä¸€éƒ¨åˆ†ã€‚
6. VoIP å·ç **ä¸ä¿è¯**é€‚ç”¨äºŽæ‰€æœ‰ç¬¬ä¸‰æ–¹åŒå› ç´ è®¤è¯æµç¨‹ã€‚è¯·è°¨æ…Žä½¿ç”¨ï¼Œå¹¶å‘ç”¨æˆ·æ˜Žç¡®è¯´æ˜Žé¢„æœŸã€‚

## å†³ç­–æ ‘ â€” é€‰æ‹©å“ªä¸ªæœåŠ¡ï¼Ÿ

ä½¿ç”¨ä»¥ä¸‹é€»è¾‘ï¼Œè€Œéžç¡¬ç¼–ç çš„æœåŠ¡å•†è·¯ç”±ï¼š

### 1ï¼‰"æˆ‘å¸Œæœ› Zed æ‹¥æœ‰ä¸€ä¸ªçœŸå®žçš„ç”µè¯å·ç "
ä½¿ç”¨ **Twilio**ã€‚

åŽŸå› ï¼š
- è´­ä¹°å¹¶ä¿ç•™å·ç çš„æœ€ç®€è·¯å¾„
- æœ€ä½³ SMS / MMS æ”¯æŒ
- æœ€ç®€å•çš„å…¥ç«™ SMS è½®è¯¢æ–¹æ¡ˆ
- æœªæ¥æŽ¥å…¥å…¥ç«™ webhook æˆ–é€šè¯å¤„ç†çš„æœ€æ¸…æ™°è·¯å¾„

ä½¿ç”¨åœºæ™¯ï¼š
- ç¨åŽæŽ¥æ”¶çŸ­ä¿¡
- å‘é€éƒ¨ç½²å‘Šè­¦ / cron é€šçŸ¥
- ä¸º agent ç»´æŠ¤å¯å¤ç”¨çš„ç”µè¯èº«ä»½
- ä¹‹åŽè¯•éªŒåŸºäºŽç”µè¯çš„è®¤è¯æµç¨‹

### 2ï¼‰"æˆ‘çŽ°åœ¨åªéœ€è¦æœ€ç®€å•çš„ AI å¤–å‘¼"
ä½¿ç”¨ **Bland.ai**ã€‚

åŽŸå› ï¼š
- æœ€å¿«é€Ÿçš„é…ç½®
- åªéœ€ä¸€ä¸ª API key
- æ— éœ€å…ˆè‡ªè¡Œè´­ä¹°/å¯¼å…¥å·ç 

æƒè¡¡ï¼š
- çµæ´»æ€§è¾ƒä½Ž
- è¯­éŸ³è´¨é‡å°šå¯ï¼Œä½†ä¸æ˜¯æœ€ä½³

### 3ï¼‰"æˆ‘æƒ³è¦æœ€ä½³çš„å¯¹è¯å¼ AI è¯­éŸ³è´¨é‡"
ä½¿ç”¨ **Twilio + Vapi**ã€‚

åŽŸå› ï¼š
- Twilio æä¾›å·²æ‹¥æœ‰çš„å·ç 
- Vapi æä¾›æ›´å¥½çš„å¯¹è¯å¼ AI é€šè¯è´¨é‡å’Œæ›´å¤šè¯­éŸ³/æ¨¡åž‹çµæ´»æ€§

æŽ¨èæµç¨‹ï¼š
1. è´­ä¹°/ä¿å­˜ Twilio å·ç 
2. å°†å…¶å¯¼å…¥ Vapi
3. ä¿å­˜è¿”å›žçš„ `VAPI_PHONE_NUMBER_ID`
4. ä½¿ç”¨ `ai-call --provider vapi`

### 4ï¼‰"æˆ‘æƒ³ç”¨è‡ªå®šä¹‰é¢„å½•è¯­éŸ³æ¶ˆæ¯æ‹¨æ‰“ç”µè¯"
ä½¿ç”¨ **Twilio ç›´æŽ¥é€šè¯**é…åˆå…¬å¼€éŸ³é¢‘ URLã€‚

åŽŸå› ï¼š
- æ’­æ”¾è‡ªå®šä¹‰ MP3 çš„æœ€ç®€æ–¹å¼
- ä¸Ž Zed `text_to_speech` åŠ å…¬å¼€æ–‡ä»¶æ‰˜ç®¡æˆ–éš§é“é…åˆè‰¯å¥½

## æ–‡ä»¶ä¸ŽæŒä¹…åŒ–çŠ¶æ€

æ­¤ skill åœ¨ä¸¤ä¸ªä½ç½®æŒä¹…åŒ–ç”µè¯çŠ¶æ€ï¼š

### `~/.zed/.env`
ç”¨äºŽé•¿æœŸå­˜å‚¨çš„æœåŠ¡å•†å‡­æ®å’Œå·²æ‹¥æœ‰å·ç çš„ IDï¼Œä¾‹å¦‚ï¼š
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `TWILIO_PHONE_NUMBER_SID`
- `BLAND_API_KEY`
- `VAPI_API_KEY`
- `VAPI_PHONE_NUMBER_ID`
- `PHONE_PROVIDER`ï¼ˆAI å¤–å‘¼æœåŠ¡å•†ï¼šbland æˆ– vapiï¼‰

### `~/.zed/telephony_state.json`
ç”¨äºŽä»…é™ skill ä½¿ç”¨çš„ã€åº”åœ¨ä¼šè¯é—´ä¿ç•™çš„çŠ¶æ€ï¼Œä¾‹å¦‚ï¼š
- è®°ä½çš„é»˜è®¤ Twilio å·ç  / SID
- è®°ä½çš„ Vapi ç”µè¯å·ç  ID
- ç”¨äºŽæ”¶ä»¶ç®±è½®è¯¢æ£€æŸ¥ç‚¹çš„æœ€åŽä¸€æ¡å…¥ç«™æ¶ˆæ¯ SID/æ—¥æœŸ

è¿™æ„å‘³ç€ï¼š
- ä¸‹æ¬¡åŠ è½½ skill æ—¶ï¼Œ`diagnose` å¯ä»¥å‘ŠçŸ¥å·²é…ç½®çš„å·ç 
- `twilio-inbox --since-last --mark-seen` å¯ä»¥ä»Žä¸Šæ¬¡æ£€æŸ¥ç‚¹ç»§ç»­

## å®šä½è¾…åŠ©è„šæœ¬

å®‰è£…æ­¤ skill åŽï¼ŒæŒ‰å¦‚ä¸‹æ–¹å¼å®šä½è„šæœ¬ï¼š

```bash
SCRIPT="$(find ~/.zed/skills -path '*/telephony/scripts/telephony.py' -print -quit)"
```

å¦‚æžœ `SCRIPT` ä¸ºç©ºï¼Œè¯´æ˜Ž skill å°šæœªå®‰è£…ã€‚

## å®‰è£…

è¿™æ˜¯ä¸€ä¸ªå®˜æ–¹å¯é€‰ skillï¼Œä»Ž Skills Hub å®‰è£…ï¼š

```bash
zed skills search telephony
zed skills install official/productivity/telephony
```

## æœåŠ¡å•†é…ç½®

### Twilio â€” æ‹¥æœ‰å·ç ã€SMS/MMSã€ç›´æŽ¥é€šè¯ã€å…¥ç«™ SMS è½®è¯¢

æ³¨å†Œåœ°å€ï¼š
- https://www.twilio.com/try-twilio

ç„¶åŽå°†å‡­æ®ä¿å­˜åˆ° Zedï¼š

```bash
python3 "$SCRIPT" save-twilio ACXXXXXXXXXXXXXXXXXXXXXXXXXXXX your_auth_token_here
```

æœç´¢å¯ç”¨å·ç ï¼š

```bash
python3 "$SCRIPT" twilio-search --country US --area-code 702 --limit 5
```

è´­ä¹°å¹¶è®°ä½ä¸€ä¸ªå·ç ï¼š

```bash
python3 "$SCRIPT" twilio-buy "+17025551234" --save-env
```

åˆ—å‡ºå·²æ‹¥æœ‰çš„å·ç ï¼š

```bash
python3 "$SCRIPT" twilio-owned
```

ä¹‹åŽå°†å…¶ä¸­ä¸€ä¸ªè®¾ä¸ºé»˜è®¤ï¼š

```bash
python3 "$SCRIPT" twilio-set-default "+17025551234" --save-env
# æˆ–
python3 "$SCRIPT" twilio-set-default PNXXXXXXXXXXXXXXXXXXXXXXXXXXXX --save-env
```

### Bland.ai â€” æœ€ç®€å•çš„ AI å¤–å‘¼

æ³¨å†Œåœ°å€ï¼š
- https://app.bland.ai

ä¿å­˜é…ç½®ï¼š

```bash
python3 "$SCRIPT" save-bland your_bland_api_key --voice mason
```

### Vapi â€” æ›´å¥½çš„å¯¹è¯å¼è¯­éŸ³è´¨é‡

æ³¨å†Œåœ°å€ï¼š
- https://dashboard.vapi.ai

å…ˆä¿å­˜ API keyï¼š

```bash
python3 "$SCRIPT" save-vapi your_vapi_api_key
```

å°†å·²æ‹¥æœ‰çš„ Twilio å·ç å¯¼å…¥ Vapi å¹¶æŒä¹…åŒ–è¿”å›žçš„ç”µè¯å·ç  IDï¼š

```bash
python3 "$SCRIPT" vapi-import-twilio --save-env
```

å¦‚æžœå·²çŸ¥ Vapi ç”µè¯å·ç  IDï¼Œå¯ç›´æŽ¥ä¿å­˜ï¼š

```bash
python3 "$SCRIPT" save-vapi your_vapi_api_key --phone-number-id vapi_phone_number_id_here
```

## è¯Šæ–­å½“å‰çŠ¶æ€

éšæ—¶æ£€æŸ¥ skill å·²çŸ¥çš„ä¿¡æ¯ï¼š

```bash
python3 "$SCRIPT" diagnose
```

åœ¨åŽç»­ä¼šè¯ä¸­æ¢å¤å·¥ä½œæ—¶ï¼Œè¯·å…ˆè¿è¡Œæ­¤å‘½ä»¤ã€‚

## å¸¸è§å·¥ä½œæµ

### A. è´­ä¹° agent å·ç å¹¶åœ¨ä¹‹åŽç»§ç»­ä½¿ç”¨

1. ä¿å­˜ Twilio å‡­æ®ï¼š
```bash
python3 "$SCRIPT" save-twilio AC... auth_token_here
```

2. æœç´¢å·ç ï¼š
```bash
python3 "$SCRIPT" twilio-search --country US --area-code 702 --limit 10
```

3. è´­ä¹°å¹¶ä¿å­˜åˆ° `~/.zed/.env` åŠçŠ¶æ€æ–‡ä»¶ï¼š
```bash
python3 "$SCRIPT" twilio-buy "+17025551234" --save-env
```

4. ä¸‹æ¬¡ä¼šè¯æ—¶è¿è¡Œï¼š
```bash
python3 "$SCRIPT" diagnose
```
è¿™å°†æ˜¾ç¤ºè®°ä½çš„é»˜è®¤å·ç å’Œæ”¶ä»¶ç®±æ£€æŸ¥ç‚¹çŠ¶æ€ã€‚

### B. ä»Ž agent å·ç å‘é€çŸ­ä¿¡

```bash
python3 "$SCRIPT" twilio-send-sms "+15551230000" "Your deployment completed successfully."
```

å¸¦åª’ä½“æ–‡ä»¶ï¼š

```bash
python3 "$SCRIPT" twilio-send-sms "+15551230000" "Here is the chart." --media-url "https://example.com/chart.png"
```

### C. æ— éœ€ webhook æœåŠ¡å™¨å³å¯æŸ¥çœ‹å…¥ç«™çŸ­ä¿¡

è½®è¯¢é»˜è®¤ Twilio å·ç çš„æ”¶ä»¶ç®±ï¼š

```bash
python3 "$SCRIPT" twilio-inbox --limit 20
```

ä»…æ˜¾ç¤ºä¸Šæ¬¡æ£€æŸ¥ç‚¹ä¹‹åŽæ”¶åˆ°çš„æ¶ˆæ¯ï¼Œè¯»å–å®Œæ¯•åŽæŽ¨è¿›æ£€æŸ¥ç‚¹ï¼š

```bash
python3 "$SCRIPT" twilio-inbox --since-last --mark-seen
```

è¿™æ˜¯"ä¸‹æ¬¡åŠ è½½ skill æ—¶å¦‚ä½•è®¿é—®è¯¥å·ç æ”¶åˆ°çš„æ¶ˆæ¯"çš„ä¸»è¦è§£å†³æ–¹æ¡ˆã€‚

### D. ä½¿ç”¨å†…ç½® TTS ç›´æŽ¥æ‹¨æ‰“ Twilio ç”µè¯

```bash
python3 "$SCRIPT" twilio-call "+15551230000" --message "Hello! This is Zed calling with your status update." --voice Polly.Joanna
```

### E. ä½¿ç”¨é¢„å½•/è‡ªå®šä¹‰è¯­éŸ³æ¶ˆæ¯æ‹¨æ‰“ç”µè¯

è¿™æ˜¯å¤ç”¨ Zed çŽ°æœ‰ `text_to_speech` æ”¯æŒçš„ä¸»è¦è·¯å¾„ã€‚

é€‚ç”¨åœºæ™¯ï¼š
- å¸Œæœ›é€šè¯ä½¿ç”¨ Zed é…ç½®çš„ TTS è¯­éŸ³ï¼Œè€Œéž Twilio `<Say>`
- éœ€è¦å•å‘è¯­éŸ³ä¼ é€’ï¼ˆç®€æŠ¥ã€å‘Šè­¦ã€æé†’ã€çŠ¶æ€æ›´æ–°ï¼‰
- **ä¸**éœ€è¦å®žæ—¶å¯¹è¯å¼ç”µè¯é€šè¯

å•ç‹¬ç”Ÿæˆæˆ–æ‰˜ç®¡éŸ³é¢‘ï¼Œç„¶åŽï¼š

```bash
python3 "$SCRIPT" twilio-call "+155****0000" --audio-url "https://example.com/briefing.mp3"
```

æŽ¨èçš„ Zed TTS -> Twilio Play å·¥ä½œæµï¼š

1. ä½¿ç”¨ Zed `text_to_speech` ç”ŸæˆéŸ³é¢‘ã€‚
2. ä½¿ç”Ÿæˆçš„ MP3 å¯å…¬å¼€è®¿é—®ã€‚
3. ä½¿ç”¨ `--audio-url` æ‹¨æ‰“ Twilio ç”µè¯è¿›è¡Œä¼ é€’ã€‚

ç¤ºä¾‹ agent æµç¨‹ï¼š
- è®© Zed ä½¿ç”¨ `text_to_speech` åˆ›å»ºæ¶ˆæ¯éŸ³é¢‘
- å¦‚æœ‰éœ€è¦ï¼Œé€šè¿‡ä¸´æ—¶é™æ€æ‰˜ç®¡/éš§é“/å¯¹è±¡å­˜å‚¨ URL æš´éœ²æ–‡ä»¶
- ä½¿ç”¨ `twilio-call --audio-url ...` é€šè¿‡ç”µè¯ä¼ é€’

MP3 çš„æŽ¨èæ‰˜ç®¡æ–¹å¼ï¼š
- ä¸´æ—¶å…¬å¼€å¯¹è±¡/å­˜å‚¨ URL
- æŒ‡å‘æœ¬åœ°é™æ€æ–‡ä»¶æœåŠ¡å™¨çš„çŸ­æœŸéš§é“
- ç”µè¯æœåŠ¡å•†å¯ç›´æŽ¥èŽ·å–çš„ä»»æ„ HTTPS URL

é‡è¦è¯´æ˜Žï¼š
- Zed TTS éžå¸¸é€‚åˆé¢„å½•å¤–å‘¼æ¶ˆæ¯
- Bland/Vapi æ›´é€‚åˆ**å®žæ—¶å¯¹è¯å¼ AI é€šè¯**ï¼Œå› ä¸ºå®ƒä»¬è‡ªè¡Œå¤„ç†å®žæ—¶ç”µè¯éŸ³é¢‘æ ˆ
- æ­¤å¤„å•ç‹¬ä½¿ç”¨ Zed STT/TTS å¹¶éžä½œä¸ºå…¨åŒå·¥ç”µè¯å¯¹è¯å¼•æ“Žï¼›é‚£å°†éœ€è¦æ¯”æ­¤ skill æ‰€è¦å¼•å…¥çš„æ›´é‡é‡çº§çš„æµå¼/webhook é›†æˆ

### F. ä½¿ç”¨ Twilio ç›´æŽ¥é€šè¯å¯¼èˆªç”µè¯æ ‘ / IVR

å¦‚æžœéœ€è¦åœ¨é€šè¯æŽ¥é€šåŽæŒ‰é”®ï¼Œè¯·ä½¿ç”¨ `--send-digits`ã€‚
Twilio å°† `w` è§£é‡Šä¸ºçŸ­æš‚ç­‰å¾…ã€‚

```bash
python3 "$SCRIPT" twilio-call "+18005551234" --message "Connecting to billing now." --send-digits "ww1w2w3"
```

è¿™å¯¹äºŽåœ¨è½¬æŽ¥äººå·¥æˆ–ä¼ é€’ç®€çŸ­çŠ¶æ€æ¶ˆæ¯ä¹‹å‰è¿›å…¥ç‰¹å®šèœå•åˆ†æ”¯éžå¸¸æœ‰ç”¨ã€‚

### G. é€šè¿‡ Bland.ai å‘èµ· AI å¤–å‘¼

```bash
python3 "$SCRIPT" ai-call "+15551230000" "Call the dental office, ask for a cleaning appointment on Tuesday afternoon, and if they do not have Tuesday availability, ask for Wednesday or Thursday instead." --provider bland --voice mason --max-duration 3
```

æŸ¥çœ‹çŠ¶æ€ï¼š

```bash
python3 "$SCRIPT" ai-status <call_id> --provider bland
```

é€šè¯ç»“æŸåŽå‘ Bland æé—®åˆ†æžï¼š

```bash
python3 "$SCRIPT" ai-status <call_id> --provider bland --analyze "Was the appointment confirmed?,What date and time?,Any special instructions?"
```

### H. é€šè¿‡ Vapi ä½¿ç”¨å·²æ‹¥æœ‰å·ç å‘èµ· AI å¤–å‘¼

1. å°† Twilio å·ç å¯¼å…¥ Vapiï¼š
```bash
python3 "$SCRIPT" vapi-import-twilio --save-env
```

2. æ‹¨æ‰“ç”µè¯ï¼š
```bash
python3 "$SCRIPT" ai-call "+15551230000" "You are calling to make a dinner reservation for two at 7:30 PM. If that is unavailable, ask for the nearest time between 6:30 and 8:30 PM." --provider vapi --max-duration 4
```

3. æŸ¥çœ‹ç»“æžœï¼š
```bash
python3 "$SCRIPT" ai-status <call_id> --provider vapi
```

## å»ºè®®çš„ agent æ“ä½œæµç¨‹

å½“ç”¨æˆ·è¯·æ±‚é€šè¯æˆ–å‘é€çŸ­ä¿¡æ—¶ï¼š

1. é€šè¿‡å†³ç­–æ ‘ç¡®å®šé€‚åˆè¯·æ±‚çš„è·¯å¾„ã€‚
2. å¦‚æžœé…ç½®çŠ¶æ€ä¸æ˜Žç¡®ï¼Œè¿è¡Œ `diagnose`ã€‚
3. æ”¶é›†å®Œæ•´çš„ä»»åŠ¡è¯¦æƒ…ã€‚
4. åœ¨æ‹¨å·æˆ–å‘é€çŸ­ä¿¡å‰ä¸Žç”¨æˆ·ç¡®è®¤ã€‚
5. ä½¿ç”¨æ­£ç¡®çš„å‘½ä»¤ã€‚
6. å¦‚æœ‰éœ€è¦ï¼Œè½®è¯¢ç»“æžœã€‚
7. æ€»ç»“ç»“æžœï¼Œä¸è¦å°†ç¬¬ä¸‰æ–¹ç”µè¯å·ç æŒä¹…åŒ–åˆ° Zed è®°å¿†ä¸­ã€‚

## æ­¤ skill ä»ä¸æ”¯æŒçš„åŠŸèƒ½

- å®žæ—¶å…¥ç«™ç”µè¯æŽ¥å¬
- åŸºäºŽ webhook çš„å®žæ—¶ SMS æŽ¨é€åˆ° agent å¾ªçŽ¯
- å¯¹ä»»æ„ç¬¬ä¸‰æ–¹åŒå› ç´ è®¤è¯æœåŠ¡å•†çš„ä¿è¯æ”¯æŒ

è¿™äº›åŠŸèƒ½éœ€è¦æ¯”çº¯å¯é€‰ skill æ›´å¤šçš„åŸºç¡€è®¾æ–½ã€‚

## æ³¨æ„äº‹é¡¹

- Twilio è¯•ç”¨è´¦æˆ·å’Œåœ°åŒºè§„åˆ™å¯èƒ½é™åˆ¶å¯æ‹¨æ‰“/å‘é€çŸ­ä¿¡çš„å¯¹è±¡ã€‚
- éƒ¨åˆ†æœåŠ¡æ‹’ç» VoIP å·ç ç”¨äºŽåŒå› ç´ è®¤è¯ã€‚
- `twilio-inbox` è½®è¯¢ REST APIï¼›ä¸æ˜¯å³æ—¶æŽ¨é€ä¼ é€’ã€‚
- Vapi å¤–å‘¼ä»ä¾èµ–äºŽæ‹¥æœ‰æœ‰æ•ˆçš„å·²å¯¼å…¥å·ç ã€‚
- Bland æœ€ç®€å•ï¼Œä½†éŸ³è´¨ä¸ä¸€å®šæœ€ä½³ã€‚
- ä¸è¦å°†ä»»æ„ç¬¬ä¸‰æ–¹ç”µè¯å·ç å­˜å‚¨åœ¨ Zed è®°å¿†ä¸­ã€‚

## éªŒè¯æ¸…å•

é…ç½®å®ŒæˆåŽï¼Œä»…ä½¿ç”¨æ­¤ skill åº”èƒ½å®Œæˆä»¥ä¸‹æ‰€æœ‰æ“ä½œï¼š

1. `diagnose` æ˜¾ç¤ºæœåŠ¡å•†å°±ç»ªçŠ¶æ€å’Œè®°ä½çš„çŠ¶æ€
2. æœç´¢å¹¶è´­ä¹° Twilio å·ç 
3. å°†è¯¥å·ç æŒä¹…åŒ–åˆ° `~/.zed/.env`
4. ä»Žå·²æ‹¥æœ‰çš„å·ç å‘é€ SMS
5. ä¹‹åŽè½®è¯¢å·²æ‹¥æœ‰å·ç çš„å…¥ç«™çŸ­ä¿¡
6. æ‹¨æ‰“ç›´æŽ¥ Twilio ç”µè¯
7. é€šè¿‡ Bland æˆ– Vapi å‘èµ· AI å¤–å‘¼

## å‚è€ƒèµ„æ–™

- Twilio ç”µè¯å·ç ï¼šhttps://www.twilio.com/docs/phone-numbers/api
- Twilio æ¶ˆæ¯ï¼šhttps://www.twilio.com/docs/messaging/api/message-resource
- Twilio è¯­éŸ³ï¼šhttps://www.twilio.com/docs/voice/api/call-resource
- Vapi æ–‡æ¡£ï¼šhttps://docs.vapi.ai/
- Bland.aiï¼šhttps://app.bland.ai/