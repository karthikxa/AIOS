---
title: Provider Routing
description: é…ç½® OpenRouter provider åå¥½ï¼Œä»¥ä¼˜åŒ–æˆæœ¬ã€é€Ÿåº¦æˆ–è´¨é‡ã€‚
sidebar_label: Provider Routing
sidebar_position: 7
---

# Provider Routing

ä½¿ç”¨ [OpenRouter](https://openrouter.ai) ä½œä¸º LLM provider æ—¶ï¼ŒZed Agent æ”¯æŒ **provider routing**ï¼ˆæä¾›å•†è·¯ç”±ï¼‰â€”â€”å¯¹å“ªäº›åº•å±‚ AI provider å¤„ç†ä½ çš„è¯·æ±‚ä»¥åŠå¦‚ä½•æŽ’åˆ—ä¼˜å…ˆçº§è¿›è¡Œç²¾ç»†æŽ§åˆ¶ã€‚

OpenRouter å°†è¯·æ±‚è·¯ç”±åˆ°å¤šä¸ª providerï¼ˆä¾‹å¦‚ Anthropicã€Googleã€AWS Bedrockã€Together AIï¼‰ã€‚Provider routing è®©ä½ å¯ä»¥é’ˆå¯¹æˆæœ¬ã€é€Ÿåº¦ã€è´¨é‡è¿›è¡Œä¼˜åŒ–ï¼Œæˆ–å¼ºåˆ¶æŒ‡å®šç‰¹å®š providerã€‚

## é…ç½®

åœ¨ `~/.zed/config.yaml` ä¸­æ·»åŠ  `provider_routing` éƒ¨åˆ†ï¼š

```yaml
provider_routing:
  sort: "price"           # å¦‚ä½•å¯¹ provider æŽ’åº
  only: []                # ç™½åå•ï¼šä»…ä½¿ç”¨è¿™äº› provider
  ignore: []              # é»‘åå•ï¼šæ°¸ä¸ä½¿ç”¨è¿™äº› provider
  order: []               # æ˜¾å¼ provider ä¼˜å…ˆçº§é¡ºåº
  require_parameters: false  # ä»…ä½¿ç”¨æ”¯æŒæ‰€æœ‰å‚æ•°çš„ provider
  data_collection: null   # æŽ§åˆ¶æ•°æ®æ”¶é›†ï¼ˆ"allow" æˆ– "deny"ï¼‰
```

:::info
Provider routing ä»…åœ¨ä½¿ç”¨ OpenRouter æ—¶ç”Ÿæ•ˆã€‚ç›´æŽ¥è¿žæŽ¥ providerï¼ˆä¾‹å¦‚ç›´æŽ¥è¿žæŽ¥ Anthropic APIï¼‰æ—¶æ— æ•ˆã€‚
:::

## é€‰é¡¹

### `sort`

æŽ§åˆ¶ OpenRouter å¦‚ä½•å¯¹å¯ç”¨ provider æŽ’åºã€‚

| å€¼ | è¯´æ˜Ž |
|-------|-------------|
| `"price"` | æœ€ä¾¿å®œçš„ provider ä¼˜å…ˆ |
| `"throughput"` | æ¯ç§’ token æ•°æœ€é«˜çš„ provider ä¼˜å…ˆ |
| `"latency"` | é¦– token å»¶è¿Ÿæœ€ä½Žçš„ provider ä¼˜å…ˆ |

```yaml
provider_routing:
  sort: "price"
```

### `only`

Provider åç§°ç™½åå•ã€‚è®¾ç½®åŽï¼Œ**ä»…**ä½¿ç”¨è¿™äº› providerï¼Œå…¶ä½™å…¨éƒ¨æŽ’é™¤ã€‚

```yaml
provider_routing:
  only:
    - "Anthropic"
    - "Google"
```

### `ignore`

Provider åç§°é»‘åå•ã€‚è¿™äº› provider **æ°¸è¿œä¸ä¼š**è¢«ä½¿ç”¨ï¼Œå³ä½¿å®ƒä»¬æä¾›æœ€ä½Žä»·æ ¼æˆ–æœ€å¿«é€Ÿåº¦ã€‚

```yaml
provider_routing:
  ignore:
    - "Together"
    - "DeepInfra"
```

### `order`

æ˜¾å¼ä¼˜å…ˆçº§é¡ºåºã€‚åˆ—åœ¨å‰é¢çš„ provider ä¼˜å…ˆä½¿ç”¨ï¼Œæœªåˆ—å‡ºçš„ provider ä½œä¸ºå¤‡é€‰ã€‚

```yaml
provider_routing:
  order:
    - "Anthropic"
    - "Google"
    - "AWS Bedrock"
```

### `require_parameters`

è®¾ä¸º `true` æ—¶ï¼ŒOpenRouter ä»…è·¯ç”±åˆ°æ”¯æŒè¯·æ±‚ä¸­**æ‰€æœ‰**å‚æ•°ï¼ˆå¦‚ `temperature`ã€`top_p`ã€`tools` ç­‰ï¼‰çš„ providerï¼Œé¿å…å‚æ•°è¢«é™é»˜ä¸¢å¼ƒã€‚

```yaml
provider_routing:
  require_parameters: true
```

### `data_collection`

æŽ§åˆ¶ provider æ˜¯å¦å¯å°†ä½ çš„ promptï¼ˆæç¤ºè¯ï¼‰ç”¨äºŽè®­ç»ƒã€‚å¯é€‰å€¼ä¸º `"allow"` æˆ– `"deny"`ã€‚

```yaml
provider_routing:
  data_collection: "deny"
```

## å®žç”¨ç¤ºä¾‹

### ä¼˜åŒ–æˆæœ¬

è·¯ç”±åˆ°æœ€ä¾¿å®œçš„å¯ç”¨ providerï¼Œé€‚åˆé«˜é¢‘ä½¿ç”¨å’Œå¼€å‘åœºæ™¯ï¼š

```yaml
provider_routing:
  sort: "price"
```

### ä¼˜åŒ–é€Ÿåº¦

ä¼˜å…ˆé€‰æ‹©ä½Žå»¶è¿Ÿ providerï¼Œé€‚åˆäº¤äº’å¼ä½¿ç”¨ï¼š

```yaml
provider_routing:
  sort: "latency"
```

### ä¼˜åŒ–åžåé‡

é€‚åˆé•¿æ–‡æœ¬ç”Ÿæˆï¼Œtoken æ¯ç§’é€ŸçŽ‡è‡³å…³é‡è¦çš„åœºæ™¯ï¼š

```yaml
provider_routing:
  sort: "throughput"
```

### é”å®šç‰¹å®š Provider

ç¡®ä¿æ‰€æœ‰è¯·æ±‚éƒ½é€šè¿‡ç‰¹å®š provider å¤„ç†ï¼Œä»¥ä¿è¯ä¸€è‡´æ€§ï¼š

```yaml
provider_routing:
  only:
    - "Anthropic"
```

### æŽ’é™¤ç‰¹å®š Provider

æŽ’é™¤ä¸å¸Œæœ›ä½¿ç”¨çš„ providerï¼ˆä¾‹å¦‚å‡ºäºŽæ•°æ®éšç§è€ƒè™‘ï¼‰ï¼š

```yaml
provider_routing:
  ignore:
    - "Together"
    - "Lepton"
  data_collection: "deny"
```

### å¸¦å¤‡é€‰çš„ä¼˜å…ˆé¡ºåº

ä¼˜å…ˆå°è¯•é¦–é€‰ providerï¼Œä¸å¯ç”¨æ—¶å›žé€€åˆ°å…¶ä»– providerï¼š

```yaml
provider_routing:
  order:
    - "Anthropic"
    - "Google"
  require_parameters: true
```

## å·¥ä½œåŽŸç†

Provider routing åå¥½é€šè¿‡æ¯æ¬¡ API è°ƒç”¨çš„ `extra_body.provider` å­—æ®µä¼ é€’ç»™ OpenRouter APIï¼Œé€‚ç”¨äºŽä»¥ä¸‹ä¸¤ç§æ¨¡å¼ï¼š

- **CLI æ¨¡å¼** â€” åœ¨ `~/.zed/config.yaml` ä¸­é…ç½®ï¼Œå¯åŠ¨æ—¶åŠ è½½
- **Gateway æ¨¡å¼** â€” åŒä¸€é…ç½®æ–‡ä»¶ï¼Œgateway å¯åŠ¨æ—¶åŠ è½½

è·¯ç”±é…ç½®ä»Ž `config.yaml` è¯»å–ï¼Œå¹¶åœ¨åˆ›å»º `AIAgent` æ—¶ä½œä¸ºå‚æ•°ä¼ å…¥ï¼š

```
providers_allowed  â† æ¥è‡ª provider_routing.only
providers_ignored  â† æ¥è‡ª provider_routing.ignore
providers_order    â† æ¥è‡ª provider_routing.order
provider_sort      â† æ¥è‡ª provider_routing.sort
provider_require_parameters â† æ¥è‡ª provider_routing.require_parameters
provider_data_collection    â† æ¥è‡ª provider_routing.data_collection
```

:::tip
å¯ä»¥ç»„åˆä½¿ç”¨å¤šä¸ªé€‰é¡¹ã€‚ä¾‹å¦‚ï¼ŒæŒ‰ä»·æ ¼æŽ’åºï¼ŒåŒæ—¶æŽ’é™¤æŸäº› provider å¹¶è¦æ±‚å‚æ•°æ”¯æŒï¼š

```yaml
provider_routing:
  sort: "price"
  ignore: ["Together"]
  require_parameters: true
  data_collection: "deny"
```
:::

## é»˜è®¤è¡Œä¸º

æœªé…ç½® `provider_routing` éƒ¨åˆ†æ—¶ï¼ˆé»˜è®¤æƒ…å†µï¼‰ï¼ŒOpenRouter ä½¿ç”¨å…¶è‡ªèº«çš„é»˜è®¤è·¯ç”±é€»è¾‘ï¼Œé€šå¸¸ä¼šè‡ªåŠ¨åœ¨æˆæœ¬å’Œå¯ç”¨æ€§ä¹‹é—´å–å¾—å¹³è¡¡ã€‚

:::tip Provider Routing ä¸Ž Fallback Models
Provider routing æŽ§åˆ¶ OpenRouter **å†…éƒ¨çš„å­ provider** å¦‚ä½•å¤„ç†ä½ çš„è¯·æ±‚ã€‚è‹¥éœ€è¦åœ¨ä¸»æ¨¡åž‹å¤±è´¥æ—¶è‡ªåŠ¨æ•…éšœè½¬ç§»åˆ°å®Œå…¨ä¸åŒçš„ providerï¼Œè¯·å‚é˜… [Fallback Providers](/user-guide/features/fallback-providers)ã€‚
:::