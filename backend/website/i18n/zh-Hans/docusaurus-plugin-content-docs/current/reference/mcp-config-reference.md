---
sidebar_position: 8
title: "MCP é…ç½®å‚è€ƒ"
description: "Zed Agent MCP é…ç½®é”®ã€è¿‡æ»¤è¯­ä¹‰åŠå·¥å…·ç­–ç•¥å‚è€ƒ"
---

# MCP é…ç½®å‚è€ƒ

æœ¬é¡µæ˜¯ä¸» MCP æ–‡æ¡£çš„ç®€æ˜Žå‚è€ƒæ‰‹å†Œã€‚

æ¦‚å¿µè¯´æ˜Žè¯·å‚é˜…ï¼š
- [MCPï¼ˆModel Context Protocolï¼‰](/user-guide/features/mcp)
- [åœ¨ Zed ä¸­ä½¿ç”¨ MCP](/guides/use-mcp-with-zed)

## æ ¹é…ç½®ç»“æž„

```yaml
mcp_servers:
  <server_name>:
    command: "..."      # stdio servers
    args: []
    env: {}

    # OR
    url: "..."          # HTTP servers
    headers: {}

    enabled: true
    timeout: 120
    connect_timeout: 60
    supports_parallel_tool_calls: false
    tools:
      include: []
      exclude: []
      resources: true
      prompts: true
```

## æœåŠ¡å™¨é”®

| é”® | ç±»åž‹ | é€‚ç”¨èŒƒå›´ | å«ä¹‰ |
|---|---|---|---|
| `command` | string | stdio | è¦å¯åŠ¨çš„å¯æ‰§è¡Œæ–‡ä»¶ |
| `args` | list | stdio | å­è¿›ç¨‹çš„å‚æ•° |
| `env` | mapping | stdio | ä¼ é€’ç»™å­è¿›ç¨‹çš„çŽ¯å¢ƒå˜é‡ |
| `url` | string | HTTP | è¿œç¨‹ MCP ç«¯ç‚¹ |
| `headers` | mapping | HTTP | è¿œç¨‹æœåŠ¡å™¨è¯·æ±‚çš„è¯·æ±‚å¤´ |
| `enabled` | bool | ä¸¤è€… | ä¸º false æ—¶å®Œå…¨è·³è¿‡è¯¥æœåŠ¡å™¨ |
| `timeout` | number | ä¸¤è€… | å·¥å…·è°ƒç”¨è¶…æ—¶æ—¶é—´ |
| `connect_timeout` | number | ä¸¤è€… | åˆå§‹è¿žæŽ¥è¶…æ—¶æ—¶é—´ |
| `supports_parallel_tool_calls` | bool | ä¸¤è€… | å…è®¸è¯¥æœåŠ¡å™¨çš„å·¥å…·å¹¶å‘æ‰§è¡Œ |
| `tools` | mapping | ä¸¤è€… | è¿‡æ»¤åŠå·¥å…·ç­–ç•¥ |
| `auth` | string | HTTP | è®¤è¯æ–¹å¼ã€‚è®¾ä¸º `oauth` å¯å¯ç”¨å¸¦ PKCE çš„ OAuth 2.1 |
| `sampling` | mapping | ä¸¤è€… | æœåŠ¡å™¨å‘èµ·çš„ LLM è¯·æ±‚ç­–ç•¥ï¼ˆå‚è§ MCP æŒ‡å—ï¼‰ |

## `tools` ç­–ç•¥é”®

| é”® | ç±»åž‹ | å«ä¹‰ |
|---|---|---|
| `include` | string æˆ– list | ç™½åå•ï¼šæŒ‡å®šå…è®¸æ³¨å†Œçš„æœåŠ¡å™¨åŽŸç”Ÿ MCP å·¥å…· |
| `exclude` | string æˆ– list | é»‘åå•ï¼šæŒ‡å®šç¦æ­¢æ³¨å†Œçš„æœåŠ¡å™¨åŽŸç”Ÿ MCP å·¥å…· |
| `resources` | bool-like | å¯ç”¨/ç¦ç”¨ `list_resources` + `read_resource` |
| `prompts` | bool-like | å¯ç”¨/ç¦ç”¨ `list_prompts` + `get_prompt` |

## è¿‡æ»¤è¯­ä¹‰

### `include`

è‹¥è®¾ç½®äº† `include`ï¼Œåˆ™åªæ³¨å†Œå…¶ä¸­åˆ—å‡ºçš„æœåŠ¡å™¨åŽŸç”Ÿ MCP å·¥å…·ã€‚

```yaml
tools:
  include: [create_issue, list_issues]
```

### `exclude`

è‹¥è®¾ç½®äº† `exclude` ä¸”æœªè®¾ç½® `include`ï¼Œåˆ™æ³¨å†Œé™¤åˆ—å‡ºåç§°ä¹‹å¤–çš„æ‰€æœ‰æœåŠ¡å™¨åŽŸç”Ÿ MCP å·¥å…·ã€‚

```yaml
tools:
  exclude: [delete_customer]
```

### ä¼˜å…ˆçº§

è‹¥ä¸¤è€…åŒæ—¶è®¾ç½®ï¼Œ`include` ä¼˜å…ˆã€‚

```yaml
tools:
  include: [create_issue]
  exclude: [create_issue, delete_issue]
```

ç»“æžœï¼š
- `create_issue` ä»è¢«å…è®¸
- `delete_issue` è¢«å¿½ç•¥ï¼Œå› ä¸º `include` ä¼˜å…ˆçº§æ›´é«˜

## å·¥å…·ç­–ç•¥

Zed å¯ä¸ºæ¯ä¸ª MCP æœåŠ¡å™¨æ³¨å†Œä»¥ä¸‹å·¥å…·åŒ…è£…å™¨ï¼š

Resourcesï¼ˆèµ„æºï¼‰ï¼š
- `list_resources`
- `read_resource`

Promptsï¼ˆæç¤ºè¯ï¼‰ï¼š
- `list_prompts`
- `get_prompt`

### ç¦ç”¨ resources

```yaml
tools:
  resources: false
```

### ç¦ç”¨ prompts

```yaml
tools:
  prompts: false
```

### èƒ½åŠ›æ„ŸçŸ¥æ³¨å†Œ

å³ä½¿è®¾ç½®äº† `resources: true` æˆ– `prompts: true`ï¼ŒZed ä¹Ÿåªåœ¨ MCP ä¼šè¯å®žé™…æš´éœ²å¯¹åº”èƒ½åŠ›æ—¶æ‰æ³¨å†Œç›¸åº”å·¥å…·ã€‚

å› æ­¤ä»¥ä¸‹æƒ…å†µå±žäºŽæ­£å¸¸çŽ°è±¡ï¼š
- ä½ å¯ç”¨äº† prompts
- ä½†æ²¡æœ‰å‡ºçŽ°ä»»ä½• prompt å·¥å…·
- åŽŸå› æ˜¯è¯¥æœåŠ¡å™¨ä¸æ”¯æŒ prompts

## `enabled: false`

```yaml
mcp_servers:
  legacy:
    url: "https://mcp.legacy.internal"
    enabled: false
```

è¡Œä¸ºï¼š
- ä¸å‘èµ·è¿žæŽ¥
- ä¸è¿›è¡ŒæœåŠ¡å‘çŽ°
- ä¸æ³¨å†Œå·¥å…·
- é…ç½®ä¿ç•™ï¼Œä¾›åŽç»­å¤ç”¨

## ç©ºç»“æžœè¡Œä¸º

è‹¥è¿‡æ»¤åŽæœåŠ¡å™¨åŽŸç”Ÿå·¥å…·å…¨éƒ¨è¢«ç§»é™¤ï¼Œä¸”æ²¡æœ‰å·¥å…·è¢«æ³¨å†Œï¼ŒZed ä¸ä¼šä¸ºè¯¥æœåŠ¡å™¨åˆ›å»ºç©ºçš„ MCP è¿è¡Œæ—¶å·¥å…·é›†ã€‚

## é…ç½®ç¤ºä¾‹

### GitHub å®‰å…¨ç™½åå•

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "***"
    tools:
      include: [list_issues, create_issue, update_issue, search_code]
      resources: false
      prompts: false
```

### Stripe é»‘åå•

```yaml
mcp_servers:
  stripe:
    url: "https://mcp.stripe.com"
    headers:
      Authorization: "Bearer ***"
    tools:
      exclude: [delete_customer, refund_payment]
```

### ä»…èµ„æºçš„æ–‡æ¡£æœåŠ¡å™¨

```yaml
mcp_servers:
  docs:
    url: "https://mcp.docs.example.com"
    tools:
      include: []
      resources: true
      prompts: false
```

## é‡æ–°åŠ è½½é…ç½®

ä¿®æ”¹ MCP é…ç½®åŽï¼Œä½¿ç”¨ä»¥ä¸‹å‘½ä»¤é‡æ–°åŠ è½½æœåŠ¡å™¨ï¼š

```text
/reload-mcp
```

## å·¥å…·å‘½å

æœåŠ¡å™¨åŽŸç”Ÿ MCP å·¥å…·çš„å‘½åæ ¼å¼ä¸ºï¼š

```text
mcp_<server>_<tool>
```

ç¤ºä¾‹ï¼š
- `mcp_github_create_issue`
- `mcp_filesystem_read_file`
- `mcp_my_api_query_data`

å·¥å…·åŒ…è£…å™¨éµå¾ªç›¸åŒçš„å‰ç¼€è§„åˆ™ï¼š
- `mcp_<server>_list_resources`
- `mcp_<server>_read_resource`
- `mcp_<server>_list_prompts`
- `mcp_<server>_get_prompt`

### åç§°è§„èŒƒåŒ–

æœåŠ¡å™¨åç§°å’Œå·¥å…·åç§°ä¸­çš„è¿žå­—ç¬¦ï¼ˆ`-`ï¼‰å’Œç‚¹å·ï¼ˆ`.`ï¼‰åœ¨æ³¨å†Œå‰å‡ä¼šæ›¿æ¢ä¸ºä¸‹åˆ’çº¿ã€‚è¿™ç¡®ä¿å·¥å…·åç§°æ˜¯ LLM function-calling API çš„åˆæ³•æ ‡è¯†ç¬¦ã€‚

ä¾‹å¦‚ï¼Œåä¸º `my-api` çš„æœåŠ¡å™¨æš´éœ²äº†åä¸º `list-items.v2` çš„å·¥å…·ï¼Œæ³¨å†ŒåŽå˜ä¸ºï¼š

```text
mcp_my_api_list_items_v2
```

ç¼–å†™ `include` / `exclude` è¿‡æ»¤å™¨æ—¶è¯·æ³¨æ„â€”â€”ä½¿ç”¨**åŽŸå§‹** MCP å·¥å…·åç§°ï¼ˆå«è¿žå­—ç¬¦/ç‚¹å·ï¼‰ï¼Œè€Œéžè§„èŒƒåŒ–åŽçš„åç§°ã€‚

## OAuth 2.1 è®¤è¯

å¯¹äºŽéœ€è¦ OAuth çš„ HTTP æœåŠ¡å™¨ï¼Œåœ¨æœåŠ¡å™¨æ¡ç›®ä¸­è®¾ç½® `auth: oauth`ï¼š

```yaml
mcp_servers:
  protected_api:
    url: "https://mcp.example.com/mcp"
    auth: oauth
```

è¡Œä¸ºï¼š
- Zed ä½¿ç”¨ MCP SDK çš„ OAuth 2.1 PKCE æµç¨‹ï¼ˆå…ƒæ•°æ®å‘çŽ°ã€åŠ¨æ€å®¢æˆ·ç«¯æ³¨å†Œã€token äº¤æ¢åŠåˆ·æ–°ï¼‰
- é¦–æ¬¡è¿žæŽ¥æ—¶ï¼Œæµè§ˆå™¨çª—å£å°†æ‰“å¼€ä»¥å®ŒæˆæŽˆæƒ
- Token æŒä¹…åŒ–è‡³ `~/.zed/mcp-tokens/<server>.json`ï¼Œè·¨ä¼šè¯å¤ç”¨
- Token åˆ·æ–°è‡ªåŠ¨è¿›è¡Œï¼›ä»…åœ¨åˆ·æ–°å¤±è´¥æ—¶æ‰éœ€é‡æ–°æŽˆæƒ
- ä»…é€‚ç”¨äºŽ HTTP/StreamableHTTP ä¼ è¾“ï¼ˆåŸºäºŽ `url` çš„æœåŠ¡å™¨ï¼‰
