---
sidebar_position: 4
title: "Memory Providers"
description: "å¤–éƒ¨è®°å¿†æä¾›è€…æ’ä»¶ â€” Honchoã€OpenVikingã€Mem0ã€Hindsightã€Holographicã€RetainDBã€ByteRoverã€Supermemory"
---

# Memory Providers

Zed Agent å†…ç½® 8 ä¸ªå¤–éƒ¨è®°å¿†æä¾›è€…æ’ä»¶ï¼Œä¸º Agent æä¾›è·¨ä¼šè¯çš„æŒä¹…åŒ–çŸ¥è¯†ï¼Œè¶…è¶Šå†…ç½®çš„ MEMORY.md å’Œ USER.mdã€‚åŒä¸€æ—¶é—´åªèƒ½æ¿€æ´»**ä¸€ä¸ª**å¤–éƒ¨æä¾›è€…â€”â€”å†…ç½®è®°å¿†å§‹ç»ˆä¸Žå…¶å¹¶è¡Œå·¥ä½œã€‚

## å¿«é€Ÿå¼€å§‹

```bash
zed memory setup      # äº¤äº’å¼é€‰æ‹©å™¨ + é…ç½®
zed memory status     # æŸ¥çœ‹å½“å‰æ¿€æ´»çŠ¶æ€
zed memory off        # ç¦ç”¨å¤–éƒ¨æä¾›è€…
```

ä¹Ÿå¯ä»¥é€šè¿‡ `zed plugins` â†’ Provider Plugins â†’ Memory Provider é€‰æ‹©æ¿€æ´»çš„è®°å¿†æä¾›è€…ã€‚

æˆ–åœ¨ `~/.zed/config.yaml` ä¸­æ‰‹åŠ¨è®¾ç½®ï¼š

```yaml
memory:
  provider: openviking   # æˆ– honcho, mem0, hindsight, holographic, retaindb, byterover, supermemory
```

## å·¥ä½œåŽŸç†

å½“è®°å¿†æä¾›è€…æ¿€æ´»æ—¶ï¼ŒZed ä¼šè‡ªåŠ¨ï¼š

1. **æ³¨å…¥æä¾›è€…ä¸Šä¸‹æ–‡**åˆ°ç³»ç»Ÿ promptï¼ˆæç¤ºè¯ï¼‰ä¸­ï¼ˆæä¾›è€…å·²çŸ¥çš„å†…å®¹ï¼‰
2. **åœ¨æ¯è½®å¯¹è¯å‰é¢„å–ç›¸å…³è®°å¿†**ï¼ˆåŽå°éžé˜»å¡žï¼‰
3. **åœ¨æ¯æ¬¡å“åº”åŽå°†å¯¹è¯è½®æ¬¡åŒæ­¥**åˆ°æä¾›è€…
4. **åœ¨ä¼šè¯ç»“æŸæ—¶æå–è®°å¿†**ï¼ˆé€‚ç”¨äºŽæ”¯æŒæ­¤åŠŸèƒ½çš„æä¾›è€…ï¼‰
5. **å°†å†…ç½®è®°å¿†å†™å…¥é•œåƒ**åˆ°å¤–éƒ¨æä¾›è€…
6. **æ·»åŠ æä¾›è€…ä¸“å±žå·¥å…·**ï¼Œä½¿ Agent èƒ½å¤Ÿæœç´¢ã€å­˜å‚¨å’Œç®¡ç†è®°å¿†

å†…ç½®è®°å¿†ï¼ˆMEMORY.md / USER.mdï¼‰ç»§ç»­æŒ‰åŽŸæœ‰æ–¹å¼å·¥ä½œã€‚å¤–éƒ¨æä¾›è€…æ˜¯å¢žé‡å åŠ çš„ã€‚

## å¯ç”¨æä¾›è€…

### Honcho

AI åŽŸç”Ÿçš„è·¨ä¼šè¯ç”¨æˆ·å»ºæ¨¡ï¼Œå…·å¤‡è¾©è¯æŽ¨ç†ã€ä¼šè¯èŒƒå›´ä¸Šä¸‹æ–‡æ³¨å…¥ã€è¯­ä¹‰æœç´¢å’ŒæŒä¹…åŒ–ç»“è®ºã€‚åŸºç¡€ä¸Šä¸‹æ–‡çŽ°åœ¨åŒ…å«ä¼šè¯æ‘˜è¦ä»¥åŠç”¨æˆ·è¡¨ç¤ºå’Œ peer cardï¼Œä½¿ Agent èƒ½æ„ŸçŸ¥å·²è®¨è®ºçš„å†…å®¹ã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | å…·æœ‰è·¨ä¼šè¯ä¸Šä¸‹æ–‡çš„å¤š Agent ç³»ç»Ÿã€ç”¨æˆ·-Agent å¯¹é½ |
| **ä¾èµ–** | `pip install honcho-ai` + [API key](https://app.honcho.dev) æˆ–è‡ªæ‰˜ç®¡å®žä¾‹ |
| **æ•°æ®å­˜å‚¨** | Honcho Cloud æˆ–è‡ªæ‰˜ç®¡ |
| **è´¹ç”¨** | Honcho å®šä»·ï¼ˆäº‘ç«¯ï¼‰/ å…è´¹ï¼ˆè‡ªæ‰˜ç®¡ï¼‰ |

**å·¥å…·ï¼ˆ5 ä¸ªï¼‰ï¼š** `honcho_profile`ï¼ˆè¯»å–/æ›´æ–° peer cardï¼‰ã€`honcho_search`ï¼ˆè¯­ä¹‰æœç´¢ï¼‰ã€`honcho_context`ï¼ˆä¼šè¯ä¸Šä¸‹æ–‡â€”â€”æ‘˜è¦ã€è¡¨ç¤ºã€cardã€æ¶ˆæ¯ï¼‰ã€`honcho_reasoning`ï¼ˆLLM åˆæˆï¼‰ã€`honcho_conclude`ï¼ˆåˆ›å»º/åˆ é™¤ç»“è®ºï¼‰

**æž¶æž„ï¼š** åŒå±‚ä¸Šä¸‹æ–‡æ³¨å…¥â€”â€”åŸºç¡€å±‚ï¼ˆä¼šè¯æ‘˜è¦ + è¡¨ç¤º + peer cardï¼ŒæŒ‰ `contextCadence` åˆ·æ–°ï¼‰åŠ ä¸Šè¾©è¯è¡¥å……å±‚ï¼ˆLLM æŽ¨ç†ï¼ŒæŒ‰ `dialecticCadence` åˆ·æ–°ï¼‰ã€‚è¾©è¯å±‚æ ¹æ®åŸºç¡€ä¸Šä¸‹æ–‡æ˜¯å¦å­˜åœ¨ï¼Œè‡ªåŠ¨é€‰æ‹©å†·å¯åŠ¨ promptï¼ˆé€šç”¨ç”¨æˆ·äº‹å®žï¼‰æˆ–çƒ­ promptï¼ˆä¼šè¯èŒƒå›´ä¸Šä¸‹æ–‡ï¼‰ã€‚

**ä¸‰ä¸ªæ­£äº¤é…ç½®é¡¹**ç‹¬ç«‹æŽ§åˆ¶æˆæœ¬å’Œæ·±åº¦ï¼š

- `contextCadence` â€” åŸºç¡€å±‚åˆ·æ–°é¢‘çŽ‡ï¼ˆAPI è°ƒç”¨é¢‘çŽ‡ï¼‰
- `dialecticCadence` â€” è¾©è¯ LLM è§¦å‘é¢‘çŽ‡ï¼ˆLLM è°ƒç”¨é¢‘çŽ‡ï¼‰
- `dialecticDepth` â€” æ¯æ¬¡è¾©è¯è°ƒç”¨çš„ `.chat()` è½®æ•°ï¼ˆ1â€“3ï¼ŒæŽ¨ç†æ·±åº¦ï¼‰

**å®‰è£…å‘å¯¼ï¼š**
```bash
zed memory setup        # é€‰æ‹© "honcho" â€” è¿è¡Œ Honcho ä¸“å±žçš„å®‰è£…åŽé…ç½®
```

æ—§ç‰ˆ `zed honcho setup` å‘½ä»¤ä»ç„¶æœ‰æ•ˆï¼ˆçŽ°åœ¨ä¼šé‡å®šå‘åˆ° `zed memory setup`ï¼‰ï¼Œä½†åªæœ‰åœ¨ Honcho è¢«é€‰ä¸ºæ¿€æ´»è®°å¿†æä¾›è€…åŽæ‰ä¼šæ³¨å†Œã€‚

**é…ç½®ï¼š** `$ZED_HOME/honcho.json`ï¼ˆprofile æœ¬åœ°ï¼‰æˆ– `~/.honcho/config.json`ï¼ˆå…¨å±€ï¼‰ã€‚è§£æžé¡ºåºï¼š`$ZED_HOME/honcho.json` > `~/.zed/honcho.json` > `~/.honcho/config.json`ã€‚å‚è§[é…ç½®å‚è€ƒ](https://github.com/zed-ai/zed-agent/blob/main/plugins/memory/honcho/README.md)å’Œ [Honcho é›†æˆæŒ‡å—](https://docs.honcho.dev/v3/guides/integrations/zed)ã€‚

<details>
<summary>å®Œæ•´é…ç½®å‚è€ƒ</summary>

| é”® | é»˜è®¤å€¼ | æè¿° |
|-----|---------|-------------|
| `apiKey` | -- | æ¥è‡ª [app.honcho.dev](https://app.honcho.dev) çš„ API key |
| `baseUrl` | -- | è‡ªæ‰˜ç®¡ Honcho çš„ Base URL |
| `peerName` | -- | ç”¨æˆ· peer èº«ä»½ |
| `aiPeer` | host key | AI peer èº«ä»½ï¼ˆæ¯ä¸ª profile ä¸€ä¸ªï¼‰ |
| `workspace` | host key | å…±äº« workspace ID |
| `contextTokens` | `null`ï¼ˆæ— ä¸Šé™ï¼‰ | æ¯è½®è‡ªåŠ¨æ³¨å…¥ä¸Šä¸‹æ–‡çš„ token é¢„ç®—ã€‚æŒ‰è¯è¾¹ç•Œæˆªæ–­ |
| `contextCadence` | `1` | `context()` API è°ƒç”¨ä¹‹é—´çš„æœ€å°è½®æ•°ï¼ˆåŸºç¡€å±‚åˆ·æ–°ï¼‰ |
| `dialecticCadence` | `2` | `peer.chat()` LLM è°ƒç”¨ä¹‹é—´çš„æœ€å°è½®æ•°ã€‚å»ºè®® 1â€“5ã€‚ä»…é€‚ç”¨äºŽ `hybrid`/`context` æ¨¡å¼ |
| `dialecticDepth` | `1` | æ¯æ¬¡è¾©è¯è°ƒç”¨çš„ `.chat()` è½®æ•°ã€‚é™åˆ¶åœ¨ 1â€“3ã€‚ç¬¬ 0 è½®ï¼šå†·/çƒ­ promptï¼Œç¬¬ 1 è½®ï¼šè‡ªæˆ‘å®¡è®¡ï¼Œç¬¬ 2 è½®ï¼šè°ƒå’Œ |
| `dialecticDepthLevels` | `null` | å¯é€‰çš„æ¯è½®æŽ¨ç†çº§åˆ«æ•°ç»„ï¼Œä¾‹å¦‚ `["minimal", "low", "medium"]`ã€‚è¦†ç›–æ¯”ä¾‹é»˜è®¤å€¼ |
| `dialecticReasoningLevel` | `'low'` | åŸºç¡€æŽ¨ç†çº§åˆ«ï¼š`minimal`ã€`low`ã€`medium`ã€`high`ã€`max` |
| `dialecticDynamic` | `true` | ä¸º `true` æ—¶ï¼Œæ¨¡åž‹å¯é€šè¿‡å·¥å…·å‚æ•°åœ¨æ¯æ¬¡è°ƒç”¨æ—¶è¦†ç›–æŽ¨ç†çº§åˆ« |
| `dialecticMaxChars` | `600` | æ³¨å…¥ç³»ç»Ÿ prompt çš„è¾©è¯ç»“æžœæœ€å¤§å­—ç¬¦æ•° |
| `recallMode` | `'hybrid'` | `hybrid`ï¼ˆè‡ªåŠ¨æ³¨å…¥ + å·¥å…·ï¼‰ã€`context`ï¼ˆä»…æ³¨å…¥ï¼‰ã€`tools`ï¼ˆä»…å·¥å…·ï¼‰ |
| `writeFrequency` | `'async'` | æ¶ˆæ¯åˆ·æ–°æ—¶æœºï¼š`async`ï¼ˆåŽå°çº¿ç¨‹ï¼‰ã€`turn`ï¼ˆåŒæ­¥ï¼‰ã€`session`ï¼ˆä¼šè¯ç»“æŸæ—¶æ‰¹é‡ï¼‰æˆ–æ•´æ•° N |
| `saveMessages` | `true` | æ˜¯å¦å°†æ¶ˆæ¯æŒä¹…åŒ–åˆ° Honcho API |
| `observationMode` | `'directional'` | `directional`ï¼ˆå…¨éƒ¨å¼€å¯ï¼‰æˆ– `unified`ï¼ˆå…±äº«æ± ï¼‰ã€‚é€šè¿‡ `observation` å¯¹è±¡è¦†ç›– |
| `messageMaxChars` | `25000` | æ¯æ¡æ¶ˆæ¯çš„æœ€å¤§å­—ç¬¦æ•°ï¼ˆè¶…å‡ºæ—¶åˆ†å—ï¼‰ |
| `dialecticMaxInputChars` | `10000` | ä¼ å…¥ `peer.chat()` çš„è¾©è¯æŸ¥è¯¢è¾“å…¥æœ€å¤§å­—ç¬¦æ•° |
| `sessionStrategy` | `'per-directory'` | `per-directory`ã€`per-repo`ã€`per-session`ã€`global` |

</details>

<details>
<summary>æœ€ç®€ honcho.jsonï¼ˆäº‘ç«¯ï¼‰</summary>

```json
{
  "apiKey": "your-key-from-app.honcho.dev",
  "hosts": {
    "zed": {
      "enabled": true,
      "aiPeer": "zed",
      "peerName": "your-name",
      "workspace": "zed"
    }
  }
}
```

</details>

<details>
<summary>æœ€ç®€ honcho.jsonï¼ˆè‡ªæ‰˜ç®¡ï¼‰</summary>

```json
{
  "baseUrl": "http://localhost:8000",
  "hosts": {
    "zed": {
      "enabled": true,
      "aiPeer": "zed",
      "peerName": "your-name",
      "workspace": "zed"
    }
  }
}
```

</details>

:::tip ä»Ž `zed honcho` è¿ç§»
å¦‚æžœä½ ä¹‹å‰ä½¿ç”¨è¿‡ `zed honcho setup`ï¼Œä½ çš„é…ç½®å’Œæ‰€æœ‰æœåŠ¡ç«¯æ•°æ®å‡å®Œå¥½æ— æŸã€‚åªéœ€é€šè¿‡å®‰è£…å‘å¯¼é‡æ–°å¯ç”¨ï¼Œæˆ–æ‰‹åŠ¨è®¾ç½® `memory.provider: honcho`ï¼Œå³å¯é€šè¿‡æ–°ç³»ç»Ÿé‡æ–°æ¿€æ´»ã€‚
:::

**å¤š peer é…ç½®ï¼š**

Honcho å°†å¯¹è¯å»ºæ¨¡ä¸º peer ä¹‹é—´çš„æ¶ˆæ¯äº¤æ¢â€”â€”æ¯ä¸ª Zed profile å¯¹åº”ä¸€ä¸ªç”¨æˆ· peer åŠ ä¸€ä¸ª AI peerï¼Œå…±äº«åŒä¸€ä¸ª workspaceã€‚workspace æ˜¯å…±äº«çŽ¯å¢ƒï¼šç”¨æˆ· peer åœ¨å„ profile é—´å…¨å±€å…±äº«ï¼Œæ¯ä¸ª AI peer æ‹¥æœ‰ç‹¬ç«‹èº«ä»½ã€‚æ¯ä¸ª AI peer ä»Žè‡ªèº«çš„è§‚å¯Ÿä¸­ç‹¬ç«‹æž„å»ºè¡¨ç¤º/cardï¼Œå› æ­¤ `coder` profile ä¿æŒä»£ç å¯¼å‘ï¼Œè€Œ `writer` profile é’ˆå¯¹åŒä¸€ç”¨æˆ·ä¿æŒç¼–è¾‘å¯¼å‘ã€‚

æ˜ å°„å…³ç³»ï¼š

| æ¦‚å¿µ | å«ä¹‰ |
|---------|-----------|
| **Workspace** | å…±äº«çŽ¯å¢ƒã€‚åŒä¸€ workspace ä¸‹çš„æ‰€æœ‰ Zed profile å…±äº«åŒä¸€ç”¨æˆ·èº«ä»½ã€‚ |
| **ç”¨æˆ· peer**ï¼ˆ`peerName`ï¼‰ | äººç±»ç”¨æˆ·ã€‚åœ¨ workspace å†…è·¨ profile å…±äº«ã€‚ |
| **AI peer**ï¼ˆ`aiPeer`ï¼‰ | æ¯ä¸ª Zed profile ä¸€ä¸ªã€‚host key `zed` â†’ é»˜è®¤ï¼›å…¶ä»– profile ä½¿ç”¨ `zed.<profile>`ã€‚ |
| **Observation** | æ¯ä¸ª peer çš„å¼€å…³ï¼ŒæŽ§åˆ¶ Honcho ä»Žå“ªäº›æ¶ˆæ¯ä¸­å»ºæ¨¡ã€‚`directional`ï¼ˆé»˜è®¤ï¼Œå…¨éƒ¨å¼€å¯ï¼‰æˆ– `unified`ï¼ˆå•ä¸€è§‚å¯Ÿè€…æ± ï¼‰ã€‚ |

### æ–°å»º profileï¼Œåˆ›å»ºæ–° Honcho peer

```bash
zed profile create coder --clone
```

`--clone` åœ¨ `honcho.json` ä¸­åˆ›å»ºä¸€ä¸ª `zed.coder` host å—ï¼ŒåŒ…å« `aiPeer: "coder"`ã€å…±äº«çš„ `workspace`ã€ç»§æ‰¿çš„ `peerName`ã€`recallMode`ã€`writeFrequency`ã€`observation` ç­‰ã€‚AI peer ä¼šåœ¨ Honcho ä¸­æå‰åˆ›å»ºï¼Œç¡®ä¿åœ¨ç¬¬ä¸€æ¡æ¶ˆæ¯ä¹‹å‰å°±å·²å­˜åœ¨ã€‚

### ä¸ºçŽ°æœ‰ profile è¡¥å…… Honcho peer

```bash
zed honcho sync
```

æ‰«ææ‰€æœ‰ Zed profileï¼Œä¸ºæ²¡æœ‰ host å—çš„ profile åˆ›å»º host å—ï¼Œä»Žé»˜è®¤ `zed` å—ç»§æ‰¿è®¾ç½®ï¼Œå¹¶æå‰åˆ›å»ºæ–°çš„ AI peerã€‚å¹‚ç­‰æ“ä½œâ€”â€”è·³è¿‡å·²æœ‰ host å—çš„ profileã€‚

### æ¯ä¸ª profile çš„ observation é…ç½®

æ¯ä¸ª host å—å¯ä»¥ç‹¬ç«‹è¦†ç›– observation é…ç½®ã€‚ç¤ºä¾‹ï¼šä¸€ä¸ªä»¥ä»£ç ä¸ºä¸­å¿ƒçš„ profileï¼ŒAI peer è§‚å¯Ÿç”¨æˆ·ä½†ä¸è‡ªæˆ‘å»ºæ¨¡ï¼š

```json
"zed.coder": {
  "aiPeer": "coder",
  "observation": {
    "user": { "observeMe": true, "observeOthers": true },
    "ai":   { "observeMe": false, "observeOthers": true }
  }
}
```

**Observation å¼€å…³ï¼ˆæ¯ä¸ª peer ä¸€ç»„ï¼‰ï¼š**

| å¼€å…³ | æ•ˆæžœ |
|--------|--------|
| `observeMe` | Honcho æ ¹æ®è¯¥ peer è‡ªèº«çš„æ¶ˆæ¯æž„å»ºå…¶è¡¨ç¤º |
| `observeOthers` | è¯¥ peer è§‚å¯Ÿå¦ä¸€ peer çš„æ¶ˆæ¯ï¼ˆç”¨äºŽè·¨ peer æŽ¨ç†ï¼‰ |

é€šè¿‡ `observationMode` ä½¿ç”¨é¢„è®¾ï¼š

- **`"directional"`**ï¼ˆé»˜è®¤ï¼‰â€”â€”å››ä¸ªæ ‡å¿—å…¨éƒ¨å¼€å¯ã€‚å®Œå…¨äº’ç›¸è§‚å¯Ÿï¼›å¯ç”¨è·¨ peer è¾©è¯ã€‚
- **`"unified"`**â€”â€”ç”¨æˆ· `observeMe: true`ï¼ŒAI `observeOthers: true`ï¼Œå…¶ä½™ä¸º falseã€‚å•ä¸€è§‚å¯Ÿè€…æ± ï¼›AI å¯¹ç”¨æˆ·å»ºæ¨¡ä½†ä¸è‡ªæˆ‘å»ºæ¨¡ï¼Œç”¨æˆ· peer ä»…è‡ªæˆ‘å»ºæ¨¡ã€‚

é€šè¿‡ [Honcho æŽ§åˆ¶å°](https://app.honcho.dev) è®¾ç½®çš„æœåŠ¡ç«¯å¼€å…³ä¼˜å…ˆäºŽæœ¬åœ°é»˜è®¤å€¼â€”â€”åœ¨ä¼šè¯åˆå§‹åŒ–æ—¶åŒæ­¥å›žæ¥ã€‚

å‚è§ [Honcho é¡µé¢](./honcho.md#observation-directional-vs-unified) èŽ·å–å®Œæ•´çš„ observation å‚è€ƒã€‚

<details>
<summary>å®Œæ•´ honcho.json ç¤ºä¾‹ï¼ˆå¤š profileï¼‰</summary>

```json
{
  "apiKey": "your-key",
  "workspace": "zed",
  "peerName": "eri",
  "hosts": {
    "zed": {
      "enabled": true,
      "aiPeer": "zed",
      "workspace": "zed",
      "peerName": "eri",
      "recallMode": "hybrid",
      "writeFrequency": "async",
      "sessionStrategy": "per-directory",
      "observation": {
        "user": { "observeMe": true, "observeOthers": true },
        "ai": { "observeMe": true, "observeOthers": true }
      },
      "dialecticReasoningLevel": "low",
      "dialecticDynamic": true,
      "dialecticCadence": 2,
      "dialecticDepth": 1,
      "dialecticMaxChars": 600,
      "contextCadence": 1,
      "messageMaxChars": 25000,
      "saveMessages": true
    },
    "zed.coder": {
      "enabled": true,
      "aiPeer": "coder",
      "workspace": "zed",
      "peerName": "eri",
      "recallMode": "tools",
      "observation": {
        "user": { "observeMe": true, "observeOthers": false },
        "ai": { "observeMe": true, "observeOthers": true }
      }
    },
    "zed.writer": {
      "enabled": true,
      "aiPeer": "writer",
      "workspace": "zed",
      "peerName": "eri"
    }
  },
  "sessions": {
    "/home/user/myproject": "myproject-main"
  }
}
```

</details>

å‚è§[é…ç½®å‚è€ƒ](https://github.com/zed-ai/zed-agent/blob/main/plugins/memory/honcho/README.md)å’Œ [Honcho é›†æˆæŒ‡å—](https://docs.honcho.dev/v3/guides/integrations/zed)ã€‚


---

### OpenViking

ç”± Volcengineï¼ˆByteDanceï¼‰æä¾›çš„ä¸Šä¸‹æ–‡æ•°æ®åº“ï¼Œå…·å¤‡æ–‡ä»¶ç³»ç»Ÿå¼çŸ¥è¯†å±‚çº§ã€åˆ†å±‚æ£€ç´¢ï¼Œä»¥åŠè‡ªåŠ¨å°†è®°å¿†æå–ä¸º 6 ä¸ªç±»åˆ«çš„åŠŸèƒ½ã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | å…·æœ‰ç»“æž„åŒ–æµè§ˆåŠŸèƒ½çš„è‡ªæ‰˜ç®¡çŸ¥è¯†ç®¡ç† |
| **ä¾èµ–** | `pip install openviking` + è¿è¡Œä¸­çš„æœåŠ¡å™¨ |
| **æ•°æ®å­˜å‚¨** | è‡ªæ‰˜ç®¡ï¼ˆæœ¬åœ°æˆ–äº‘ç«¯ï¼‰ |
| **è´¹ç”¨** | å…è´¹ï¼ˆå¼€æºï¼ŒAGPL-3.0ï¼‰ |

**å·¥å…·ï¼š** `viking_search`ï¼ˆè¯­ä¹‰æœç´¢ï¼‰ã€`viking_read`ï¼ˆåˆ†å±‚ï¼šæ‘˜è¦/æ¦‚è§ˆ/å…¨æ–‡ï¼‰ã€`viking_browse`ï¼ˆæ–‡ä»¶ç³»ç»Ÿå¯¼èˆªï¼‰ã€`viking_remember`ï¼ˆå­˜å‚¨äº‹å®žï¼‰ã€`viking_add_resource`ï¼ˆå¯¼å…¥ URL/æ–‡æ¡£ï¼‰

**å®‰è£…ï¼š**
```bash
# å…ˆå¯åŠ¨ OpenViking æœåŠ¡å™¨
pip install openviking
openviking-server

# ç„¶åŽé…ç½® Zed
zed memory setup    # é€‰æ‹© "openviking"
# æˆ–æ‰‹åŠ¨é…ç½®ï¼š
zed config set memory.provider openviking
echo "OPENVIKING_ENDPOINT=http://localhost:1933" >> ~/.zed/.env
```

**ä¸»è¦ç‰¹æ€§ï¼š**
- åˆ†å±‚ä¸Šä¸‹æ–‡åŠ è½½ï¼šL0ï¼ˆçº¦ 100 tokensï¼‰â†’ L1ï¼ˆçº¦ 2kï¼‰â†’ L2ï¼ˆå®Œæ•´ï¼‰
- ä¼šè¯æäº¤æ—¶è‡ªåŠ¨æå–è®°å¿†ï¼ˆprofileã€åå¥½ã€å®žä½“ã€äº‹ä»¶ã€æ¡ˆä¾‹ã€æ¨¡å¼ï¼‰
- `viking://` URI æ–¹æ¡ˆç”¨äºŽå±‚çº§çŸ¥è¯†æµè§ˆ

---

### Mem0

æœåŠ¡ç«¯ LLM äº‹å®žæå–ï¼Œå…·å¤‡è¯­ä¹‰æœç´¢ã€é‡æŽ’åºå’Œè‡ªåŠ¨åŽ»é‡åŠŸèƒ½ã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | å…ç»´æŠ¤çš„è®°å¿†ç®¡ç†â€”â€”Mem0 è‡ªåŠ¨å¤„ç†æå– |
| **ä¾èµ–** | `pip install mem0ai` + API key |
| **æ•°æ®å­˜å‚¨** | Mem0 Cloud |
| **è´¹ç”¨** | Mem0 å®šä»· |

**å·¥å…·ï¼š** `mem0_profile`ï¼ˆæ‰€æœ‰å·²å­˜å‚¨è®°å¿†ï¼‰ã€`mem0_search`ï¼ˆè¯­ä¹‰æœç´¢ + é‡æŽ’åºï¼‰ã€`mem0_conclude`ï¼ˆé€å­—å­˜å‚¨äº‹å®žï¼‰

**å®‰è£…ï¼š**
```bash
zed memory setup    # é€‰æ‹© "mem0"
# æˆ–æ‰‹åŠ¨é…ç½®ï¼š
zed config set memory.provider mem0
echo "MEM0_API_KEY=your-key" >> ~/.zed/.env
```

**é…ç½®ï¼š** `$ZED_HOME/mem0.json`

| é”® | é»˜è®¤å€¼ | æè¿° |
|-----|---------|-------------|
| `user_id` | `zed-user` | ç”¨æˆ·æ ‡è¯†ç¬¦ |
| `agent_id` | `zed` | Agent æ ‡è¯†ç¬¦ |

---

### Hindsight

å…·å¤‡çŸ¥è¯†å›¾è°±ã€å®žä½“è§£æžå’Œå¤šç­–ç•¥æ£€ç´¢çš„é•¿æœŸè®°å¿†ã€‚`hindsight_reflect` å·¥å…·æä¾›å…¶ä»–æä¾›è€…å‡ä¸å…·å¤‡çš„è·¨è®°å¿†åˆæˆèƒ½åŠ›ã€‚è‡ªåŠ¨ä¿ç•™å®Œæ•´å¯¹è¯è½®æ¬¡ï¼ˆåŒ…æ‹¬å·¥å…·è°ƒç”¨ï¼‰ï¼Œå¹¶è¿›è¡Œä¼šè¯çº§æ–‡æ¡£è¿½è¸ªã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | åŸºäºŽçŸ¥è¯†å›¾è°±çš„å®žä½“å…³ç³»å¬å›ž |
| **ä¾èµ–** | äº‘ç«¯ï¼šæ¥è‡ª [ui.hindsight.vectorize.io](https://ui.hindsight.vectorize.io) çš„ API keyã€‚æœ¬åœ°ï¼šLLM API keyï¼ˆOpenAIã€Groqã€OpenRouter ç­‰ï¼‰ |
| **æ•°æ®å­˜å‚¨** | Hindsight Cloud æˆ–æœ¬åœ°åµŒå…¥å¼ PostgreSQL |
| **è´¹ç”¨** | Hindsight å®šä»·ï¼ˆäº‘ç«¯ï¼‰æˆ–å…è´¹ï¼ˆæœ¬åœ°ï¼‰ |

**å·¥å…·ï¼š** `hindsight_retain`ï¼ˆå¸¦å®žä½“æå–çš„å­˜å‚¨ï¼‰ã€`hindsight_recall`ï¼ˆå¤šç­–ç•¥æœç´¢ï¼‰ã€`hindsight_reflect`ï¼ˆè·¨è®°å¿†åˆæˆï¼‰

**å®‰è£…ï¼š**
```bash
zed memory setup    # é€‰æ‹© "hindsight"
# æˆ–æ‰‹åŠ¨é…ç½®ï¼š
zed config set memory.provider hindsight
echo "HINDSIGHT_API_KEY=your-key" >> ~/.zed/.env
```

å®‰è£…å‘å¯¼ä¼šè‡ªåŠ¨å®‰è£…ä¾èµ–ï¼Œå¹¶ä»…å®‰è£…æ‰€é€‰æ¨¡å¼æ‰€éœ€çš„å†…å®¹ï¼ˆäº‘ç«¯ç”¨ `hindsight-client`ï¼Œæœ¬åœ°ç”¨ `hindsight-all`ï¼‰ã€‚éœ€è¦ `hindsight-client >= 0.4.22`ï¼ˆä¼šè¯å¯åŠ¨æ—¶è‹¥ç‰ˆæœ¬è¿‡æ—§åˆ™è‡ªåŠ¨å‡çº§ï¼‰ã€‚

**æœ¬åœ°æ¨¡å¼ UIï¼š** `hindsight-embed -p zed ui start`

**é…ç½®ï¼š** `$ZED_HOME/hindsight/config.json`

| é”® | é»˜è®¤å€¼ | æè¿° |
|-----|---------|-------------|
| `mode` | `cloud` | `cloud` æˆ– `local` |
| `bank_id` | `zed` | è®°å¿†åº“æ ‡è¯†ç¬¦ |
| `recall_budget` | `mid` | å¬å›žå½»åº•ç¨‹åº¦ï¼š`low` / `mid` / `high` |
| `memory_mode` | `hybrid` | `hybrid`ï¼ˆä¸Šä¸‹æ–‡ + å·¥å…·ï¼‰ã€`context`ï¼ˆä»…è‡ªåŠ¨æ³¨å…¥ï¼‰ã€`tools`ï¼ˆä»…å·¥å…·ï¼‰ |
| `auto_retain` | `true` | è‡ªåŠ¨ä¿ç•™å¯¹è¯è½®æ¬¡ |
| `auto_recall` | `true` | æ¯è½®å¯¹è¯å‰è‡ªåŠ¨å¬å›žè®°å¿† |
| `retain_async` | `true` | åœ¨æœåŠ¡å™¨ä¸Šå¼‚æ­¥å¤„ç†ä¿ç•™æ“ä½œ |
| `retain_context` | `conversation between Zed Agent and the User` | ä¿ç•™è®°å¿†çš„ä¸Šä¸‹æ–‡æ ‡ç­¾ |
| `retain_tags` | â€” | åº”ç”¨äºŽä¿ç•™è®°å¿†çš„é»˜è®¤æ ‡ç­¾ï¼›ä¸Žæ¯æ¬¡å·¥å…·è°ƒç”¨çš„æ ‡ç­¾åˆå¹¶ |
| `retain_source` | â€” | é™„åŠ åˆ°ä¿ç•™è®°å¿†çš„å¯é€‰ `metadata.source` |
| `retain_user_prefix` | `User` | è‡ªåŠ¨ä¿ç•™çš„å¯¹è¯è®°å½•ä¸­ç”¨æˆ·è½®æ¬¡å‰çš„æ ‡ç­¾ |
| `retain_assistant_prefix` | `Assistant` | è‡ªåŠ¨ä¿ç•™çš„å¯¹è¯è®°å½•ä¸­åŠ©æ‰‹è½®æ¬¡å‰çš„æ ‡ç­¾ |
| `recall_tags` | â€” | å¬å›žæ—¶ç”¨äºŽè¿‡æ»¤çš„æ ‡ç­¾ |

å®Œæ•´é…ç½®å‚è€ƒå‚è§[æ’ä»¶ README](https://github.com/zedteam/zed-agent/blob/main/plugins/memory/hindsight/README.md)ã€‚

---

### Holographic

æœ¬åœ° SQLite äº‹å®žå­˜å‚¨ï¼Œå…·å¤‡ FTS5 å…¨æ–‡æœç´¢ã€ä¿¡ä»»è¯„åˆ†å’Œ HRRï¼ˆHolographic Reduced Representationsï¼Œå…¨æ¯é™ç»´è¡¨ç¤ºï¼‰ç”¨äºŽç»„åˆä»£æ•°æŸ¥è¯¢ã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | æ— å¤–éƒ¨ä¾èµ–çš„çº¯æœ¬åœ°é«˜çº§æ£€ç´¢è®°å¿† |
| **ä¾èµ–** | æ— ï¼ˆSQLite å§‹ç»ˆå¯ç”¨ï¼‰ã€‚NumPy å¯é€‰ï¼Œç”¨äºŽ HRR ä»£æ•°ã€‚ |
| **æ•°æ®å­˜å‚¨** | æœ¬åœ° SQLite |
| **è´¹ç”¨** | å…è´¹ |

**å·¥å…·ï¼š** `fact_store`ï¼ˆ9 ä¸ªåŠ¨ä½œï¼šaddã€searchã€probeã€relatedã€reasonã€contradictã€updateã€removeã€listï¼‰ã€`fact_feedback`ï¼ˆæœ‰ç”¨/æ— ç”¨è¯„åˆ†ï¼Œç”¨äºŽè®­ç»ƒä¿¡ä»»è¯„åˆ†ï¼‰

**å®‰è£…ï¼š**
```bash
zed memory setup    # é€‰æ‹© "holographic"
# æˆ–æ‰‹åŠ¨é…ç½®ï¼š
zed config set memory.provider holographic
```

**é…ç½®ï¼š** `plugins.zed-memory-store` ä¸‹çš„ `config.yaml`

| é”® | é»˜è®¤å€¼ | æè¿° |
|-----|---------|-------------|
| `db_path` | `$ZED_HOME/memory_store.db` | SQLite æ•°æ®åº“è·¯å¾„ |
| `auto_extract` | `false` | ä¼šè¯ç»“æŸæ—¶è‡ªåŠ¨æå–äº‹å®ž |
| `default_trust` | `0.5` | é»˜è®¤ä¿¡ä»»è¯„åˆ†ï¼ˆ0.0â€“1.0ï¼‰ |

**ç‹¬ç‰¹èƒ½åŠ›ï¼š**
- `probe` â€” é’ˆå¯¹ç‰¹å®šå®žä½“çš„ä»£æ•°å¬å›žï¼ˆæŸäºº/æŸç‰©çš„æ‰€æœ‰äº‹å®žï¼‰
- `reason` â€” è·¨å¤šä¸ªå®žä½“çš„ç»„åˆ AND æŸ¥è¯¢
- `contradict` â€” è‡ªåŠ¨æ£€æµ‹å†²çªäº‹å®ž
- ä¿¡ä»»è¯„åˆ†ï¼Œå¸¦éžå¯¹ç§°åé¦ˆï¼ˆæœ‰ç”¨ +0.05 / æ— ç”¨ -0.10ï¼‰

---

### RetainDB

äº‘ç«¯è®°å¿† APIï¼Œå…·å¤‡æ··åˆæœç´¢ï¼ˆå‘é‡ + BM25 + é‡æŽ’åºï¼‰ã€7 ç§è®°å¿†ç±»åž‹å’Œå¢žé‡åŽ‹ç¼©ã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | å·²ä½¿ç”¨ RetainDB åŸºç¡€è®¾æ–½çš„å›¢é˜Ÿ |
| **ä¾èµ–** | RetainDB è´¦å· + API key |
| **æ•°æ®å­˜å‚¨** | RetainDB Cloud |
| **è´¹ç”¨** | $20/æœˆ |

**å·¥å…·ï¼š** `retaindb_profile`ï¼ˆç”¨æˆ· profileï¼‰ã€`retaindb_search`ï¼ˆè¯­ä¹‰æœç´¢ï¼‰ã€`retaindb_context`ï¼ˆä»»åŠ¡ç›¸å…³ä¸Šä¸‹æ–‡ï¼‰ã€`retaindb_remember`ï¼ˆå¸¦ç±»åž‹å’Œé‡è¦æ€§çš„å­˜å‚¨ï¼‰ã€`retaindb_forget`ï¼ˆåˆ é™¤è®°å¿†ï¼‰

**å®‰è£…ï¼š**
```bash
zed memory setup    # é€‰æ‹© "retaindb"
# æˆ–æ‰‹åŠ¨é…ç½®ï¼š
zed config set memory.provider retaindb
echo "RETAINDB_API_KEY=your-key" >> ~/.zed/.env
```

---

### ByteRover

é€šè¿‡ `brv` CLI å®žçŽ°æŒä¹…åŒ–è®°å¿†â€”â€”å…·å¤‡åˆ†å±‚çŸ¥è¯†æ ‘å’Œåˆ†å±‚æ£€ç´¢ï¼ˆæ¨¡ç³Šæ–‡æœ¬ â†’ LLM é©±åŠ¨æœç´¢ï¼‰ã€‚æœ¬åœ°ä¼˜å…ˆï¼Œå¯é€‰äº‘ç«¯åŒæ­¥ã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | å¸Œæœ›ä½¿ç”¨å¯ç§»æ¤ã€æœ¬åœ°ä¼˜å…ˆè®°å¿†å’Œ CLI çš„å¼€å‘è€… |
| **ä¾èµ–** | ByteRover CLIï¼ˆ`npm install -g byterover-cli` æˆ–[å®‰è£…è„šæœ¬](https://byterover.dev)ï¼‰ |
| **æ•°æ®å­˜å‚¨** | æœ¬åœ°ï¼ˆé»˜è®¤ï¼‰æˆ– ByteRover Cloudï¼ˆå¯é€‰åŒæ­¥ï¼‰ |
| **è´¹ç”¨** | å…è´¹ï¼ˆæœ¬åœ°ï¼‰æˆ– ByteRover å®šä»·ï¼ˆäº‘ç«¯ï¼‰ |

**å·¥å…·ï¼š** `brv_query`ï¼ˆæœç´¢çŸ¥è¯†æ ‘ï¼‰ã€`brv_curate`ï¼ˆå­˜å‚¨äº‹å®ž/å†³ç­–/æ¨¡å¼ï¼‰ã€`brv_status`ï¼ˆCLI ç‰ˆæœ¬ + æ ‘çŠ¶ç»Ÿè®¡ï¼‰

**å®‰è£…ï¼š**
```bash
# å…ˆå®‰è£… CLI
curl -fsSL https://byterover.dev/install.sh | sh

# ç„¶åŽé…ç½® Zed
zed memory setup    # é€‰æ‹© "byterover"
# æˆ–æ‰‹åŠ¨é…ç½®ï¼š
zed config set memory.provider byterover
```

**ä¸»è¦ç‰¹æ€§ï¼š**
- è‡ªåŠ¨é¢„åŽ‹ç¼©æå–ï¼ˆåœ¨ä¸Šä¸‹æ–‡åŽ‹ç¼©ä¸¢å¼ƒå†…å®¹å‰ä¿å­˜æ´žå¯Ÿï¼‰
- çŸ¥è¯†æ ‘å­˜å‚¨äºŽ `$ZED_HOME/byterover/`ï¼ˆprofile èŒƒå›´éš”ç¦»ï¼‰
- SOC2 Type II è®¤è¯çš„äº‘ç«¯åŒæ­¥ï¼ˆå¯é€‰ï¼‰

---

### Supermemory

è¯­ä¹‰é•¿æœŸè®°å¿†ï¼Œå…·å¤‡ profile å¬å›žã€è¯­ä¹‰æœç´¢ã€æ˜¾å¼è®°å¿†å·¥å…·ï¼Œä»¥åŠé€šè¿‡ Supermemory graph API è¿›è¡Œä¼šè¯ç»“æŸæ—¶çš„å¯¹è¯å¯¼å…¥ã€‚

| | |
|---|---|
| **é€‚åˆåœºæ™¯** | å¸¦ç”¨æˆ· profile å’Œä¼šè¯çº§å›¾è°±æž„å»ºçš„è¯­ä¹‰å¬å›ž |
| **ä¾èµ–** | `pip install supermemory` + [API key](https://supermemory.ai) |
| **æ•°æ®å­˜å‚¨** | Supermemory Cloud |
| **è´¹ç”¨** | Supermemory å®šä»· |

**å·¥å…·ï¼š** `supermemory_store`ï¼ˆä¿å­˜æ˜¾å¼è®°å¿†ï¼‰ã€`supermemory_search`ï¼ˆè¯­ä¹‰ç›¸ä¼¼åº¦æœç´¢ï¼‰ã€`supermemory_forget`ï¼ˆæŒ‰ ID æˆ–æœ€ä½³åŒ¹é…æŸ¥è¯¢é—å¿˜ï¼‰ã€`supermemory_profile`ï¼ˆæŒä¹…åŒ– profile + è¿‘æœŸä¸Šä¸‹æ–‡ï¼‰

**å®‰è£…ï¼š**
```bash
zed memory setup    # é€‰æ‹© "supermemory"
# æˆ–æ‰‹åŠ¨é…ç½®ï¼š
zed config set memory.provider supermemory
echo 'SUPERMEMORY_API_KEY=***' >> ~/.zed/.env
```

**é…ç½®ï¼š** `$ZED_HOME/supermemory.json`

| é”® | é»˜è®¤å€¼ | æè¿° |
|-----|---------|-------------|
| `container_tag` | `zed` | ç”¨äºŽæœç´¢å’Œå†™å…¥çš„å®¹å™¨æ ‡ç­¾ã€‚æ”¯æŒ `{identity}` æ¨¡æ¿ç”¨äºŽ profile èŒƒå›´éš”ç¦»ã€‚ |
| `auto_recall` | `true` | åœ¨æ¯è½®å¯¹è¯å‰æ³¨å…¥ç›¸å…³è®°å¿†ä¸Šä¸‹æ–‡ |
| `auto_capture` | `true` | æ¯æ¬¡å“åº”åŽå­˜å‚¨æ¸…ç†è¿‡çš„ç”¨æˆ·-åŠ©æ‰‹è½®æ¬¡ |
| `max_recall_results` | `10` | æ ¼å¼åŒ–ä¸ºä¸Šä¸‹æ–‡çš„æœ€å¤§å¬å›žæ¡ç›®æ•° |
| `profile_frequency` | `50` | åœ¨ç¬¬ä¸€è½®åŠæ¯ N è½®åŒ…å« profile äº‹å®ž |
| `capture_mode` | `all` | é»˜è®¤è·³è¿‡è¿‡çŸ­æˆ–æ— æ„ä¹‰çš„è½®æ¬¡ |
| `search_mode` | `hybrid` | æœç´¢æ¨¡å¼ï¼š`hybrid`ã€`memories` æˆ– `documents` |
| `api_timeout` | `5.0` | SDK å’Œå¯¼å…¥è¯·æ±‚çš„è¶…æ—¶æ—¶é—´ |

**çŽ¯å¢ƒå˜é‡ï¼š** `SUPERMEMORY_API_KEY`ï¼ˆå¿…å¡«ï¼‰ã€`SUPERMEMORY_CONTAINER_TAG`ï¼ˆè¦†ç›–é…ç½®ï¼‰ã€‚

**ä¸»è¦ç‰¹æ€§ï¼š**
- è‡ªåŠ¨ä¸Šä¸‹æ–‡éš”ç¦»â€”â€”ä»Žæ•èŽ·çš„è½®æ¬¡ä¸­å‰¥ç¦»å·²å¬å›žçš„è®°å¿†ï¼Œé˜²æ­¢é€’å½’è®°å¿†æ±¡æŸ“
- åœ¨ä¼šè¯è¾¹ç•Œæ—¶å°†æ•´ä¸ªä¼šè¯**ä¸€æ¬¡æ€§å¯¼å…¥**
- ä¼šè¯ç»“æŸæ—¶åŒæ—¶å¯¼å…¥åˆ°å¯¹è¯ç«¯ç‚¹ï¼ˆ`/v4/conversations`ï¼‰ï¼Œç”¨äºŽ Supermemory çš„ profile å’Œå›¾è°±æž„å»º
- åœ¨ç¬¬ä¸€è½®åŠå¯é…ç½®é—´éš”æ³¨å…¥ profile äº‹å®ž
- **Profile èŒƒå›´å®¹å™¨**â€”â€”åœ¨ `container_tag` ä¸­ä½¿ç”¨ `{identity}`ï¼ˆä¾‹å¦‚ `zed-{identity}` â†’ `zed-coder`ï¼‰ï¼ŒæŒ‰ Zed profile éš”ç¦»è®°å¿†
- **å¤šå®¹å™¨æ¨¡å¼**â€”â€”å¯ç”¨ `enable_custom_container_tags` å¹¶é…ç½® `custom_containers` åˆ—è¡¨ï¼Œè®© Agent è·¨å‘½åå®¹å™¨è¯»å†™ã€‚è‡ªåŠ¨æ“ä½œï¼ˆåŒæ­¥ã€é¢„å–ï¼‰ä¿æŒåœ¨ä¸»å®¹å™¨ä¸Šã€‚

<details>
<summary>å¤šå®¹å™¨ç¤ºä¾‹</summary>

```json
{
  "container_tag": "zed",
  "enable_custom_container_tags": true,
  "custom_containers": ["project-alpha", "shared-knowledge"],
  "custom_container_instructions": "Use project-alpha for coding context."
}
```

</details>

**æ”¯æŒï¼š** [Discord](https://supermemory.link/discord) Â· [support@supermemory.com](mailto:support@supermemory.com)

---

## æä¾›è€…å¯¹æ¯”

| æä¾›è€… | å­˜å‚¨ | è´¹ç”¨ | å·¥å…·æ•° | ä¾èµ– | ç‹¬ç‰¹ç‰¹æ€§ |
|----------|---------|------|-------|-------------|----------------|
| **Honcho** | äº‘ç«¯ | ä»˜è´¹ | 5 | `honcho-ai` | è¾©è¯ç”¨æˆ·å»ºæ¨¡ + ä¼šè¯èŒƒå›´ä¸Šä¸‹æ–‡ |
| **OpenViking** | è‡ªæ‰˜ç®¡ | å…è´¹ | 5 | `openviking` + æœåŠ¡å™¨ | æ–‡ä»¶ç³»ç»Ÿå±‚çº§ + åˆ†å±‚åŠ è½½ |
| **Mem0** | äº‘ç«¯ | ä»˜è´¹ | 3 | `mem0ai` | æœåŠ¡ç«¯ LLM æå– |
| **Hindsight** | äº‘ç«¯/æœ¬åœ° | å…è´¹/ä»˜è´¹ | 3 | `hindsight-client` | çŸ¥è¯†å›¾è°± + reflect åˆæˆ |
| **Holographic** | æœ¬åœ° | å…è´¹ | 2 | æ—  | HRR ä»£æ•° + ä¿¡ä»»è¯„åˆ† |
| **RetainDB** | äº‘ç«¯ | $20/æœˆ | 5 | `requests` | å¢žé‡åŽ‹ç¼© |
| **ByteRover** | æœ¬åœ°/äº‘ç«¯ | å…è´¹/ä»˜è´¹ | 3 | `brv` CLI | é¢„åŽ‹ç¼©æå– |
| **Supermemory** | äº‘ç«¯ | ä»˜è´¹ | 4 | `supermemory` | ä¸Šä¸‹æ–‡éš”ç¦» + ä¼šè¯å›¾è°±å¯¼å…¥ + å¤šå®¹å™¨ |

## Profile éš”ç¦»

æ¯ä¸ªæä¾›è€…çš„æ•°æ®æŒ‰ [profile](/user-guide/profiles) éš”ç¦»ï¼š

- **æœ¬åœ°å­˜å‚¨æä¾›è€…**ï¼ˆHolographicã€ByteRoverï¼‰ä½¿ç”¨ `$ZED_HOME/` è·¯å¾„ï¼Œå„ profile è·¯å¾„ä¸åŒ
- **é…ç½®æ–‡ä»¶æä¾›è€…**ï¼ˆHonchoã€Mem0ã€Hindsightã€Supermemoryï¼‰å°†é…ç½®å­˜å‚¨åœ¨ `$ZED_HOME/` ä¸­ï¼Œæ¯ä¸ª profile æ‹¥æœ‰ç‹¬ç«‹å‡­è¯
- **äº‘ç«¯æä¾›è€…**ï¼ˆRetainDBï¼‰è‡ªåŠ¨æ´¾ç”Ÿ profile èŒƒå›´çš„é¡¹ç›®åç§°
- **çŽ¯å¢ƒå˜é‡æä¾›è€…**ï¼ˆOpenVikingï¼‰é€šè¿‡æ¯ä¸ª profile çš„ `.env` æ–‡ä»¶é…ç½®

## æž„å»ºè®°å¿†æä¾›è€…

å‚è§[å¼€å‘è€…æŒ‡å—ï¼šMemory Provider æ’ä»¶](/developer-guide/memory-provider-plugin)äº†è§£å¦‚ä½•åˆ›å»ºè‡ªå·±çš„æä¾›è€…ã€‚
