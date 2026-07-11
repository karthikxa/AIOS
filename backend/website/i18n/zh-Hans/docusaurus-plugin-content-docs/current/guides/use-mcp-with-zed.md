---
sidebar_position: 6
title: "åœ¨ Zed ä¸­ä½¿ç”¨ MCP"
description: "å°† MCP æœåŠ¡å™¨è¿žæŽ¥åˆ° Zed Agentã€è¿‡æ»¤å…¶å·¥å…·å¹¶åœ¨å®žé™…å·¥ä½œæµä¸­å®‰å…¨ä½¿ç”¨çš„å®žè·µæŒ‡å—"
---

# åœ¨ Zed ä¸­ä½¿ç”¨ MCP

æœ¬æŒ‡å—ä»‹ç»å¦‚ä½•åœ¨æ—¥å¸¸å·¥ä½œæµä¸­å®žé™…ä½¿ç”¨ Zed Agent çš„ MCP åŠŸèƒ½ã€‚

å¦‚æžœåŠŸèƒ½é¡µé¢è§£é‡Šçš„æ˜¯ MCP æ˜¯ä»€ä¹ˆï¼Œæœ¬æŒ‡å—åˆ™å…³æ³¨å¦‚ä½•å¿«é€Ÿã€å®‰å…¨åœ°ä»Žä¸­èŽ·å–ä»·å€¼ã€‚

## ä½•æ—¶åº”è¯¥ä½¿ç”¨ MCPï¼Ÿ

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ MCPï¼š
- å·¥å…·å·²ä»¥ MCP å½¢å¼å­˜åœ¨ï¼Œä¸”ä½ ä¸æƒ³æž„å»ºåŽŸç”Ÿ Zed å·¥å…·
- ä½ å¸Œæœ› Zed é€šè¿‡å¹²å‡€çš„ RPC å±‚æ“ä½œæœ¬åœ°æˆ–è¿œç¨‹ç³»ç»Ÿ
- ä½ éœ€è¦ç»†ç²’åº¦çš„æŒ‰æœåŠ¡å™¨æš´éœ²æŽ§åˆ¶
- ä½ å¸Œæœ›å°† Zed è¿žæŽ¥åˆ°å†…éƒ¨ APIã€æ•°æ®åº“æˆ–å…¬å¸ç³»ç»Ÿï¼Œè€Œæ— éœ€ä¿®æ”¹ Zed æ ¸å¿ƒ

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä¸è¦ä½¿ç”¨ MCPï¼š
- å†…ç½® Zed å·¥å…·å·²èƒ½å¾ˆå¥½åœ°å®Œæˆè¯¥å·¥ä½œ
- æœåŠ¡å™¨æš´éœ²äº†å¤§é‡å±é™©å·¥å…·ï¼Œè€Œä½ æ²¡æœ‰å‡†å¤‡å¥½å¯¹å…¶è¿›è¡Œè¿‡æ»¤
- ä½ åªéœ€è¦ä¸€ä¸ªéžå¸¸çª„çš„é›†æˆï¼ŒåŽŸç”Ÿå·¥å…·ä¼šæ›´ç®€å•ã€æ›´å®‰å…¨

## å¿ƒæ™ºæ¨¡åž‹

å°† MCP è§†ä¸ºä¸€ä¸ªé€‚é…å™¨å±‚ï¼š

- Zed ä»ç„¶æ˜¯ agent
- MCP æœåŠ¡å™¨æä¾›å·¥å…·
- Zed åœ¨å¯åŠ¨æˆ–é‡æ–°åŠ è½½æ—¶å‘çŽ°è¿™äº›å·¥å…·
- æ¨¡åž‹å¯ä»¥åƒä½¿ç”¨æ™®é€šå·¥å…·ä¸€æ ·ä½¿ç”¨å®ƒä»¬
- ä½ æŽ§åˆ¶æ¯ä¸ªæœåŠ¡å™¨æœ‰å¤šå°‘å†…å®¹å¯è§

æœ€åŽä¸€ç‚¹å¾ˆé‡è¦ã€‚è‰¯å¥½çš„ MCP ä½¿ç”¨ä¸æ˜¯"è¿žæŽ¥ä¸€åˆ‡"ï¼Œè€Œæ˜¯"ä»¥æœ€å°çš„æœ‰æ•ˆèŒƒå›´è¿žæŽ¥æ­£ç¡®çš„ä¸œè¥¿"ã€‚

## ç¬¬ä¸€æ­¥ï¼šå®‰è£… MCP æ”¯æŒ

å¦‚æžœä½ ä½¿ç”¨æ ‡å‡†å®‰è£…è„šæœ¬å®‰è£…äº† Zedï¼ŒMCP æ”¯æŒå·²åŒ…å«åœ¨å†…ï¼ˆå®‰è£…ç¨‹åºä¼šè¿è¡Œ `uv pip install -e ".[all]"`ï¼‰ã€‚

å¦‚æžœä½ åœ¨æ²¡æœ‰é™„åŠ ç»„ä»¶çš„æƒ…å†µä¸‹å®‰è£…ï¼Œéœ€è¦å•ç‹¬æ·»åŠ  MCPï¼š

```bash
cd ~/.zed/zed-agent
uv pip install -e ".[mcp]"
```

å¯¹äºŽåŸºäºŽ npm çš„æœåŠ¡å™¨ï¼Œè¯·ç¡®ä¿ Node.js å’Œ `npx` å¯ç”¨ã€‚

å¯¹äºŽè®¸å¤š Python MCP æœåŠ¡å™¨ï¼Œ`uvx` æ˜¯ä¸€ä¸ªä¸é”™çš„é»˜è®¤é€‰æ‹©ã€‚

## ç¬¬äºŒæ­¥ï¼šå…ˆæ·»åŠ ä¸€ä¸ªæœåŠ¡å™¨

ä»Žå•ä¸ªã€å®‰å…¨çš„æœåŠ¡å™¨å¼€å§‹ã€‚

ç¤ºä¾‹ï¼šä»…è®¿é—®ä¸€ä¸ªé¡¹ç›®ç›®å½•çš„æ–‡ä»¶ç³»ç»Ÿã€‚

```yaml
mcp_servers:
  project_fs:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/my-project"]
```

ç„¶åŽå¯åŠ¨ Zedï¼š

```bash
zed chat
```

çŽ°åœ¨æå‡ºä¸€ä¸ªå…·ä½“é—®é¢˜ï¼š

```text
Inspect this project and summarize the repo layout.
```

## ç¬¬ä¸‰æ­¥ï¼šéªŒè¯ MCP å·²åŠ è½½

ä½ å¯ä»¥é€šè¿‡ä»¥ä¸‹å‡ ç§æ–¹å¼éªŒè¯ MCPï¼š

- é…ç½®åŽ Zed æ¨ªå¹…/çŠ¶æ€åº”æ˜¾ç¤º MCP é›†æˆ
- è¯¢é—® Zed å½“å‰æœ‰å“ªäº›å¯ç”¨å·¥å…·
- é…ç½®æ›´æ”¹åŽä½¿ç”¨ `/reload-mcp`
- å¦‚æžœæœåŠ¡å™¨è¿žæŽ¥å¤±è´¥ï¼Œæ£€æŸ¥æ—¥å¿—

ä¸€ä¸ªå®žç”¨çš„æµ‹è¯• promptï¼ˆæç¤ºè¯ï¼‰ï¼š

```text
Tell me which MCP-backed tools are available right now.
```

## ç¬¬å››æ­¥ï¼šç«‹å³å¼€å§‹è¿‡æ»¤

å¦‚æžœæœåŠ¡å™¨æš´éœ²äº†å¤§é‡å·¥å…·ï¼Œä¸è¦ç­‰åˆ°ä»¥åŽå†è¿‡æ»¤ã€‚

### ç¤ºä¾‹ï¼šä»…ç™½åå•ä½ éœ€è¦çš„å†…å®¹

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "***"
    tools:
      include: [list_issues, create_issue, search_code]
```

å¯¹äºŽæ•æ„Ÿç³»ç»Ÿï¼Œè¿™é€šå¸¸æ˜¯æœ€ä½³é»˜è®¤è®¾ç½®ã€‚

## WSL2ï¼šå°† WSL ä¸­çš„ Zed æ¡¥æŽ¥åˆ° Windows Chrome

ä»¥ä¸‹æ˜¯é€‚ç”¨åœºæ™¯çš„å®žé™…é…ç½®ï¼š

- Zed åœ¨ WSL2 å†…è¿è¡Œ
- ä½ æƒ³æŽ§åˆ¶çš„æµè§ˆå™¨æ˜¯ Windows ä¸Šå·²ç™»å½•çš„æ™®é€š Chrome
- ä»Ž WSL ä½¿ç”¨ `/browser connect` ä¸ç¨³å®šæˆ–ä¸å¯é 

åœ¨æ­¤é…ç½®ä¸­ï¼ŒZed **ä¸**ç›´æŽ¥è¿žæŽ¥åˆ° Chromeï¼Œè€Œæ˜¯ï¼š

- Zed åœ¨ WSL ä¸­è¿è¡Œ
- Zed å¯åŠ¨ä¸€ä¸ªæœ¬åœ° stdio MCP æœåŠ¡å™¨
- è¯¥ MCP æœåŠ¡å™¨é€šè¿‡ Windows äº’æ“ä½œï¼ˆ`cmd.exe` æˆ– `powershell.exe`ï¼‰å¯åŠ¨
- MCP æœåŠ¡å™¨é™„åŠ åˆ°ä½ çš„å®žæ—¶ Windows Chrome ä¼šè¯

å¿ƒæ™ºæ¨¡åž‹ï¼š

```text
Zed (WSL) -> MCP stdio bridge -> Windows Chrome
```

### ä¸ºä»€ä¹ˆæ­¤æ¨¡å¼æœ‰ç”¨

- ä½ ä¿ç•™çœŸå®žçš„ Windows æµè§ˆå™¨é…ç½®æ–‡ä»¶ã€Cookie å’Œç™»å½•çŠ¶æ€
- Zed ä¿æŒåœ¨å…¶æ”¯æŒçš„ Unix çŽ¯å¢ƒï¼ˆWSL2ï¼‰ä¸­
- æµè§ˆå™¨æŽ§åˆ¶ä»¥ MCP å·¥å…·çš„å½¢å¼æš´éœ²ï¼Œè€Œä¸ä¾èµ– Zed æ ¸å¿ƒæµè§ˆå™¨ä¼ è¾“

### æŽ¨èæœåŠ¡å™¨

ä½¿ç”¨ `chrome-devtools-mcp`ã€‚

å¦‚æžœä½ çš„ Windows Chrome å·²é€šè¿‡ `chrome://inspect/#remote-debugging` å¯ç”¨äº†å®žæ—¶è¿œç¨‹è°ƒè¯•ï¼Œåœ¨ WSL ä¸­æŒ‰å¦‚ä¸‹æ–¹å¼æ·»åŠ ï¼š

```bash
zed mcp add chrome-devtools-win --command cmd.exe --args /c npx -y chrome-devtools-mcp@latest --autoConnect --no-usage-statistics
```

ä¿å­˜æœåŠ¡å™¨åŽï¼š

```bash
zed mcp test chrome-devtools-win
```

ç„¶åŽå¯åŠ¨ä¸€ä¸ªæ–°çš„ Zed ä¼šè¯æˆ–è¿è¡Œï¼š

```text
/reload-mcp
```

### å…¸åž‹ prompt

åŠ è½½åŽï¼ŒZed å¯ä»¥ç›´æŽ¥ä½¿ç”¨å¸¦ MCP å‰ç¼€çš„æµè§ˆå™¨å·¥å…·ã€‚ä¾‹å¦‚ï¼š

```text
è°ƒç”¨ MCP å·¥å…· mcp_chrome_devtools_win_list_pagesï¼Œåˆ—å‡ºå½“å‰æµè§ˆå™¨æ ‡ç­¾é¡µã€‚
```

### ä½•æ—¶ `/browser connect` ä¸é€‚ç”¨

å¦‚æžœ Zed åœ¨ WSL ä¸­è¿è¡Œè€Œ Chrome åœ¨ Windows ä¸Šè¿è¡Œï¼Œå³ä½¿ Chrome å·²æ‰“å¼€ä¸”å¯è°ƒè¯•ï¼Œ`/browser connect` ä¹Ÿå¯èƒ½å¤±è´¥ã€‚

å¸¸è§åŽŸå› ï¼š

- WSL æ— æ³•è®¿é—® Chrome å‘ Windows å·¥å…·æš´éœ²çš„åŒä¸€ä¸»æœºæœ¬åœ°ç«¯ç‚¹
- è¾ƒæ–°çš„ Chrome å®žæ—¶è°ƒè¯•æµç¨‹ä¸Žç»å…¸çš„ `ws://localhost:9222` ä¸åŒ
- ä»Ž Windows ç«¯è¾…åŠ©å·¥å…·ï¼ˆå¦‚ `chrome-devtools-mcp`ï¼‰é™„åŠ æµè§ˆå™¨æ›´å®¹æ˜“

åœ¨è¿™äº›æƒ…å†µä¸‹ï¼Œå°† `/browser connect` ç”¨äºŽåŒçŽ¯å¢ƒé…ç½®ï¼Œä½¿ç”¨ MCP è¿›è¡Œ WSL åˆ° Windows çš„æµè§ˆå™¨æ¡¥æŽ¥ã€‚

### å·²çŸ¥é—®é¢˜

- é€šè¿‡ MCP ä½¿ç”¨ Windows stdio å¯æ‰§è¡Œæ–‡ä»¶æ—¶ï¼Œä»Ž `/mnt/c/Users/<you>` æˆ– `/mnt/c/workspace/...` ç­‰ Windows æŒ‚è½½è·¯å¾„å¯åŠ¨ Zedã€‚
- å¦‚æžœä»Ž `/root` æˆ– `/home/...` å¯åŠ¨ Zedï¼ŒWindows å¯èƒ½åœ¨ MCP æœåŠ¡å™¨å¯åŠ¨å‰å‘å‡º `UNC` å½“å‰ç›®å½•è­¦å‘Šã€‚
- å¦‚æžœ `chrome-devtools-mcp --autoConnect` åœ¨æžšä¸¾é¡µé¢æ—¶è¶…æ—¶ï¼Œè¯·å‡å°‘ Chrome ä¸­çš„åŽå°/å†»ç»“æ ‡ç­¾é¡µå¹¶é‡è¯•ã€‚

### ç¤ºä¾‹ï¼šé»‘åå•å±é™©æ“ä½œ

```yaml
mcp_servers:
  stripe:
    url: "https://mcp.stripe.com"
    headers:
      Authorization: "Bearer ***"
    tools:
      exclude: [delete_customer, refund_payment]
```

### ç¤ºä¾‹ï¼šåŒæ—¶ç¦ç”¨å®žç”¨å·¥å…·åŒ…è£…å™¨

```yaml
mcp_servers:
  docs:
    url: "https://mcp.docs.example.com"
    tools:
      prompts: false
      resources: false
```

## è¿‡æ»¤å®žé™…å½±å“ä»€ä¹ˆï¼Ÿ

Zed ä¸­ MCP æš´éœ²çš„åŠŸèƒ½åˆ†ä¸ºä¸¤ç±»ï¼š

1. æœåŠ¡å™¨åŽŸç”Ÿ MCP å·¥å…·
- é€šè¿‡ä»¥ä¸‹æ–¹å¼è¿‡æ»¤ï¼š
  - `tools.include`
  - `tools.exclude`

2. Zed æ·»åŠ çš„å®žç”¨å·¥å…·åŒ…è£…å™¨
- é€šè¿‡ä»¥ä¸‹æ–¹å¼è¿‡æ»¤ï¼š
  - `tools.resources`
  - `tools.prompts`

### ä½ å¯èƒ½çœ‹åˆ°çš„å®žç”¨å·¥å…·åŒ…è£…å™¨

Resourcesï¼ˆèµ„æºï¼‰ï¼š
- `list_resources`
- `read_resource`

Promptsï¼ˆæç¤ºè¯ï¼‰ï¼š
- `list_prompts`
- `get_prompt`

è¿™äº›åŒ…è£…å™¨ä»…åœ¨ä»¥ä¸‹æƒ…å†µä¸‹å‡ºçŽ°ï¼š
- ä½ çš„é…ç½®å…è®¸å®ƒä»¬ï¼Œä¸”
- MCP æœåŠ¡å™¨ä¼šè¯å®žé™…æ”¯æŒè¿™äº›èƒ½åŠ›

å› æ­¤ï¼Œå¦‚æžœæœåŠ¡å™¨ä¸æ”¯æŒ resources/promptsï¼ŒZed ä¸ä¼šå‡è£…å®ƒæ”¯æŒã€‚

## å¸¸è§æ¨¡å¼

### æ¨¡å¼ 1ï¼šæœ¬åœ°é¡¹ç›®åŠ©æ‰‹

å½“ä½ å¸Œæœ› Zed åœ¨æœ‰ç•Œå·¥ä½œåŒºå†…æŽ¨ç†æ—¶ï¼Œä½¿ç”¨ MCP è¿žæŽ¥ä»“åº“æœ¬åœ°çš„æ–‡ä»¶ç³»ç»Ÿæˆ– git æœåŠ¡å™¨ã€‚

```yaml
mcp_servers:
  fs:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/project"]

  git:
    command: "uvx"
    args: ["mcp-server-git", "--repository", "/home/user/project"]
```

å¥½çš„ promptï¼š

```text
Review the project structure and identify where configuration lives.
```

```text
Check the local git state and summarize what changed recently.
```

### æ¨¡å¼ 2ï¼šGitHub åˆ†ç±»åŠ©æ‰‹

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "***"
    tools:
      include: [list_issues, create_issue, update_issue, search_code]
      prompts: false
      resources: false
```

å¥½çš„ promptï¼š

```text
List open issues about MCP, cluster them by theme, and draft a high-quality issue for the most common bug.
```

```text
Search the repo for uses of _discover_and_register_server and explain how MCP tools are registered.
```

### æ¨¡å¼ 3ï¼šå†…éƒ¨ API åŠ©æ‰‹

```yaml
mcp_servers:
  internal_api:
    url: "https://mcp.internal.example.com"
    headers:
      Authorization: "Bearer ***"
    tools:
      include: [list_customers, get_customer, list_invoices]
      resources: false
      prompts: false
```

å¥½çš„ promptï¼š

```text
Look up customer ACME Corp and summarize recent invoice activity.
```

åœ¨è¿™ç±»åœºæ™¯ä¸­ï¼Œä¸¥æ ¼çš„ç™½åå•è¿œä¼˜äºŽæŽ’é™¤åˆ—è¡¨ã€‚

### æ¨¡å¼ 4ï¼šæ–‡æ¡£/çŸ¥è¯†æœåŠ¡å™¨

æŸäº› MCP æœåŠ¡å™¨æš´éœ²çš„ prompts æˆ– resources æ›´åƒæ˜¯å…±äº«çŸ¥è¯†èµ„äº§ï¼Œè€Œéžç›´æŽ¥æ“ä½œã€‚

```yaml
mcp_servers:
  docs:
    url: "https://mcp.docs.example.com"
    tools:
      prompts: true
      resources: true
```

å¥½çš„ promptï¼š

```text
List available MCP resources from the docs server, then read the onboarding guide and summarize it.
```

```text
List prompts exposed by the docs server and tell me which ones would help with incident response.
```

## æ•™ç¨‹ï¼šå¸¦è¿‡æ»¤çš„ç«¯åˆ°ç«¯é…ç½®

ä»¥ä¸‹æ˜¯ä¸€ä¸ªå®žé™…çš„æ¸è¿›å¼æµç¨‹ã€‚

### é˜¶æ®µ 1ï¼šä½¿ç”¨ä¸¥æ ¼ç™½åå•æ·»åŠ  GitHub MCP

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "***"
    tools:
      include: [list_issues, create_issue, search_code]
      prompts: false
      resources: false
```

å¯åŠ¨ Zed å¹¶è¯¢é—®ï¼š

```text
Search the codebase for references to MCP and summarize the main integration points.
```

### é˜¶æ®µ 2ï¼šä»…åœ¨éœ€è¦æ—¶æ‰©å±•

å¦‚æžœä¹‹åŽè¿˜éœ€è¦æ›´æ–° issueï¼š

```yaml
tools:
  include: [list_issues, create_issue, update_issue, search_code]
```

ç„¶åŽé‡æ–°åŠ è½½ï¼š

```text
/reload-mcp
```

### é˜¶æ®µ 3ï¼šæ·»åŠ å…·æœ‰ä¸åŒç­–ç•¥çš„ç¬¬äºŒä¸ªæœåŠ¡å™¨

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "***"
    tools:
      include: [list_issues, create_issue, update_issue, search_code]
      prompts: false
      resources: false

  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/project"]
```

çŽ°åœ¨ Zed å¯ä»¥ç»„åˆä½¿ç”¨å®ƒä»¬ï¼š

```text
Inspect the local project files, then create a GitHub issue summarizing the bug you find.
```

è¿™å°±æ˜¯ MCP çš„å¼ºå¤§ä¹‹å¤„ï¼šæ— éœ€ä¿®æ”¹ Zed æ ¸å¿ƒå³å¯å®žçŽ°å¤šç³»ç»Ÿå·¥ä½œæµã€‚

## å®‰å…¨ä½¿ç”¨å»ºè®®

### å¯¹å±é™©ç³»ç»Ÿä¼˜å…ˆä½¿ç”¨ç™½åå•

å¯¹äºŽä»»ä½•æ¶‰åŠè´¢åŠ¡ã€é¢å‘å®¢æˆ·æˆ–å…·æœ‰ç ´åæ€§çš„ç³»ç»Ÿï¼š
- ä½¿ç”¨ `tools.include`
- ä»Žå°½å¯èƒ½å°çš„é›†åˆå¼€å§‹

### ç¦ç”¨æœªä½¿ç”¨çš„å®žç”¨å·¥å…·

å¦‚æžœä½ ä¸å¸Œæœ›æ¨¡åž‹æµè§ˆæœåŠ¡å™¨æä¾›çš„ resources/promptsï¼Œè¯·å°†å…¶å…³é—­ï¼š

```yaml
tools:
  resources: false
  prompts: false
```

### ä¿æŒæœåŠ¡å™¨èŒƒå›´ç‹­çª„

ç¤ºä¾‹ï¼š
- æ–‡ä»¶ç³»ç»ŸæœåŠ¡å™¨æ ¹ç›®å½•æŒ‡å‘ä¸€ä¸ªé¡¹ç›®ç›®å½•ï¼Œè€Œéžæ•´ä¸ªä¸»ç›®å½•
- git æœåŠ¡å™¨æŒ‡å‘ä¸€ä¸ªä»“åº“
- å†…éƒ¨ API æœåŠ¡å™¨é»˜è®¤ä»¥è¯»å–ä¸ºä¸»çš„å·¥å…·æš´éœ²

### é…ç½®æ›´æ”¹åŽé‡æ–°åŠ è½½

```text
/reload-mcp
```

åœ¨æ›´æ”¹ä»¥ä¸‹å†…å®¹åŽæ‰§è¡Œæ­¤æ“ä½œï¼š
- include/exclude åˆ—è¡¨
- enabled æ ‡å¿—
- resources/prompts å¼€å…³
- è®¤è¯ header / env

## æŒ‰ç—‡çŠ¶æŽ’æŸ¥é—®é¢˜

### "æœåŠ¡å™¨å·²è¿žæŽ¥ï¼Œä½†æˆ‘æœŸæœ›çš„å·¥å…·ä¸è§äº†"

å¯èƒ½åŽŸå› ï¼š
- è¢« `tools.include` è¿‡æ»¤
- è¢« `tools.exclude` æŽ’é™¤
- å®žç”¨å·¥å…·åŒ…è£…å™¨é€šè¿‡ `resources: false` æˆ– `prompts: false` ç¦ç”¨
- æœåŠ¡å™¨å®žé™…ä¸Šä¸æ”¯æŒ resources/prompts

### "æœåŠ¡å™¨å·²é…ç½®ï¼Œä½†ä»€ä¹ˆéƒ½æ²¡åŠ è½½"

æ£€æŸ¥ï¼š
- é…ç½®ä¸­æ˜¯å¦é—ç•™äº† `enabled: false`
- å‘½ä»¤/è¿è¡Œæ—¶æ˜¯å¦å­˜åœ¨ï¼ˆ`npx`ã€`uvx` ç­‰ï¼‰
- HTTP ç«¯ç‚¹æ˜¯å¦å¯è¾¾
- è®¤è¯ env æˆ– header æ˜¯å¦æ­£ç¡®

### "ä¸ºä»€ä¹ˆæˆ‘çœ‹åˆ°çš„å·¥å…·æ¯” MCP æœåŠ¡å™¨å…¬å‘Šçš„å°‘ï¼Ÿ"

å› ä¸º Zed çŽ°åœ¨éµå®ˆä½ çš„æŒ‰æœåŠ¡å™¨ç­–ç•¥å’Œèƒ½åŠ›æ„ŸçŸ¥æ³¨å†Œã€‚è¿™æ˜¯é¢„æœŸè¡Œä¸ºï¼Œé€šå¸¸ä¹Ÿæ˜¯æœŸæœ›çš„ç»“æžœã€‚

### "å¦‚ä½•åœ¨ä¸åˆ é™¤é…ç½®çš„æƒ…å†µä¸‹ç§»é™¤ MCP æœåŠ¡å™¨ï¼Ÿ"

ä½¿ç”¨ï¼š

```yaml
enabled: false
```

è¿™ä¼šä¿ç•™é…ç½®ï¼Œä½†é˜»æ­¢è¿žæŽ¥å’Œæ³¨å†Œã€‚

## æŽ¨èçš„é¦–æ‰¹ MCP é…ç½®

é€‚åˆå¤§å¤šæ•°ç”¨æˆ·çš„é¦–é€‰æœåŠ¡å™¨ï¼š
- filesystem
- git
- GitHub
- fetch / æ–‡æ¡£ MCP æœåŠ¡å™¨
- ä¸€ä¸ªèŒƒå›´çª„çš„å†…éƒ¨ API

ä¸é€‚åˆä½œä¸ºé¦–é€‰çš„æœåŠ¡å™¨ï¼š
- å…·æœ‰å¤§é‡ç ´åæ€§æ“ä½œä¸”æœªç»è¿‡æ»¤çš„å¤§åž‹ä¸šåŠ¡ç³»ç»Ÿ
- ä»»ä½•ä½ ä¸å¤Ÿäº†è§£ã€æ— æ³•åŠ ä»¥çº¦æŸçš„ç³»ç»Ÿ

## ç›¸å…³æ–‡æ¡£

- [MCPï¼ˆæ¨¡åž‹ä¸Šä¸‹æ–‡åè®®ï¼‰](/user-guide/features/mcp)
- [FAQ](/reference/faq)
- [æ–œæ å‘½ä»¤](/reference/slash-commands)
