---
sidebar_position: 1
title: "å·¥å…·ä¸Žå·¥å…·é›†"
description: "Zed Agent å·¥å…·æ¦‚è§ˆâ€”â€”å¯ç”¨å·¥å…·ã€å·¥å…·é›†å·¥ä½œæ–¹å¼åŠç»ˆç«¯åŽç«¯"
---

# å·¥å…·ä¸Žå·¥å…·é›†

å·¥å…·æ˜¯æ‰©å±• Agent èƒ½åŠ›çš„å‡½æ•°ã€‚å®ƒä»¬è¢«ç»„ç»‡ä¸ºé€»è¾‘ä¸Šçš„**å·¥å…·é›†**ï¼Œå¯æŒ‰å¹³å°å¯ç”¨æˆ–ç¦ç”¨ã€‚

## å¯ç”¨å·¥å…·

Zed å†…ç½®äº†ä¸°å¯Œçš„å·¥å…·æ³¨å†Œè¡¨ï¼Œæ¶µç›–ç½‘é¡µæœç´¢ã€æµè§ˆå™¨è‡ªåŠ¨åŒ–ã€ç»ˆç«¯æ‰§è¡Œã€æ–‡ä»¶ç¼–è¾‘ã€è®°å¿†ã€å§”æ‰˜ã€RL è®­ç»ƒã€æ¶ˆæ¯æŠ•é€’ã€Home Assistant ç­‰åŠŸèƒ½ã€‚

:::note
**Honcho è·¨ä¼šè¯è®°å¿†**ä½œä¸ºè®°å¿†æä¾›è€…æ’ä»¶ï¼ˆ`plugins/memory/honcho/`ï¼‰æä¾›ï¼Œè€Œéžå†…ç½®å·¥å…·é›†ã€‚å®‰è£…æ–¹å¼è¯·å‚é˜… [Plugins](./plugins.md)ã€‚
:::

é«˜å±‚åˆ†ç±»ï¼š

| åˆ†ç±» | ç¤ºä¾‹ | æè¿° |
|----------|----------|-------------|
| **Web** | `web_search`, `web_extract` | æœç´¢ç½‘é¡µå¹¶æå–é¡µé¢å†…å®¹ã€‚ |
| **X æœç´¢** | `x_search` | é€šè¿‡ xAI å†…ç½®çš„ `x_search` Responses å·¥å…·æœç´¢ Xï¼ˆTwitterï¼‰å¸–å­å’Œè¯é¢˜â€”â€”éœ€è¦ xAI å‡­æ®ï¼ˆSuperGrok OAuth æˆ– `XAI_API_KEY`ï¼‰ï¼›é»˜è®¤å…³é—­ï¼Œå¯é€šè¿‡ `zed tools` â†’ ðŸ¦ X (Twitter) Search å¯ç”¨ã€‚ |
| **ç»ˆç«¯ä¸Žæ–‡ä»¶** | `terminal`, `process`, `read_file`, `patch` | æ‰§è¡Œå‘½ä»¤å¹¶æ“ä½œæ–‡ä»¶ã€‚ |
| **æµè§ˆå™¨** | `browser_navigate`, `browser_snapshot`, `browser_vision` | æ”¯æŒæ–‡æœ¬å’Œè§†è§‰çš„äº¤äº’å¼æµè§ˆå™¨è‡ªåŠ¨åŒ–ã€‚ |
| **åª’ä½“** | `vision_analyze`, `image_generate`, `video_generate`, `video_analyze`, `text_to_speech` | å¤šæ¨¡æ€åˆ†æžä¸Žç”Ÿæˆã€‚`video_generate` å’Œ `video_analyze` éœ€æ‰‹åŠ¨å¯ç”¨ï¼ˆé€šè¿‡ `zed tools` æˆ– `--toolsets` æ·»åŠ  `video_gen` / `video` å·¥å…·é›†ï¼‰ã€‚ |
| **Agent ç¼–æŽ’** | `todo`, `clarify`, `execute_code`, `delegate_task` | è§„åˆ’ã€æ¾„æ¸…ã€ä»£ç æ‰§è¡ŒåŠå­ Agent å§”æ‰˜ã€‚ |
| **è®°å¿†ä¸Žå¬å›ž** | `memory`, `session_search` | æŒä¹…åŒ–è®°å¿†ä¸Žä¼šè¯æœç´¢ã€‚ |
| **è‡ªåŠ¨åŒ–ä¸ŽæŠ•é€’** | `cronjob`, `send_message` | æ”¯æŒåˆ›å»º/åˆ—å‡º/æ›´æ–°/æš‚åœ/æ¢å¤/è¿è¡Œ/åˆ é™¤æ“ä½œçš„å®šæ—¶ä»»åŠ¡ï¼Œä»¥åŠå‡ºç«™æ¶ˆæ¯æŠ•é€’ã€‚ |
| **é›†æˆ** | `ha_*`ã€MCP server å·¥å…· | Home Assistantã€MCP åŠå…¶ä»–é›†æˆã€‚ |

å¦‚éœ€æŸ¥çœ‹ç”±ä»£ç æ´¾ç”Ÿçš„æƒå¨æ³¨å†Œè¡¨ï¼Œè¯·å‚é˜… [å†…ç½®å·¥å…·å‚è€ƒ](/reference/tools-reference) å’Œ [å·¥å…·é›†å‚è€ƒ](/reference/toolsets-reference)ã€‚

:::tip Nous Tool Gateway
ä»˜è´¹ [Nous Portal](https://portal.nousresearch.com) è®¢é˜…è€…å¯é€šè¿‡ **[Tool Gateway](tool-gateway.md)** ä½¿ç”¨ç½‘é¡µæœç´¢ã€å›¾åƒç”Ÿæˆã€TTS å’Œæµè§ˆå™¨è‡ªåŠ¨åŒ–â€”â€”æ— éœ€å•ç‹¬é…ç½® API å¯†é’¥ã€‚è¿è¡Œ `zed model` å¯ç”¨ï¼Œæˆ–é€šè¿‡ `zed tools` é…ç½®å„å·¥å…·ã€‚
:::

## ä½¿ç”¨å·¥å…·é›†

```bash
# ä½¿ç”¨æŒ‡å®šå·¥å…·é›†
zed chat --toolsets "web,terminal"

# æŸ¥çœ‹æ‰€æœ‰å¯ç”¨å·¥å…·
zed tools

# æŒ‰å¹³å°äº¤äº’å¼é…ç½®å·¥å…·
zed tools
```

å¸¸ç”¨å·¥å…·é›†åŒ…æ‹¬ `web`ã€`search`ã€`terminal`ã€`file`ã€`browser`ã€`vision`ã€`image_gen`ã€`moa`ã€`skills`ã€`tts`ã€`todo`ã€`memory`ã€`session_search`ã€`cronjob`ã€`code_execution`ã€`delegation`ã€`clarify`ã€`homeassistant`ã€`messaging`ã€`spotify`ã€`discord`ã€`discord_admin`ã€`debugging` å’Œ `safe`ã€‚

å®Œæ•´åˆ—è¡¨ï¼ˆåŒ…æ‹¬ `zed-cli`ã€`zed-telegram` ç­‰å¹³å°é¢„è®¾ä»¥åŠ `mcp-<server>` ç­‰åŠ¨æ€ MCP å·¥å…·é›†ï¼‰è¯·å‚é˜… [å·¥å…·é›†å‚è€ƒ](/reference/toolsets-reference)ã€‚

## ç»ˆç«¯åŽç«¯

ç»ˆç«¯å·¥å…·å¯åœ¨ä¸åŒçŽ¯å¢ƒä¸­æ‰§è¡Œå‘½ä»¤ï¼š

| åŽç«¯ | æè¿° | é€‚ç”¨åœºæ™¯ |
|---------|-------------|----------|
| `local` | åœ¨æœ¬æœºè¿è¡Œï¼ˆé»˜è®¤ï¼‰ | å¼€å‘ã€å¯ä¿¡ä»»åŠ¡ |
| `docker` | éš”ç¦»å®¹å™¨ | å®‰å…¨æ€§ã€å¯å¤çŽ°æ€§ |
| `ssh` | è¿œç¨‹æœåŠ¡å™¨ | æ²™ç®±éš”ç¦»ï¼Œé˜²æ­¢ Agent ä¿®æ”¹è‡ªèº«ä»£ç  |
| `singularity` | HPC å®¹å™¨ | é›†ç¾¤è®¡ç®—ã€æ—  root æƒé™ |
| `modal` | äº‘ç«¯æ‰§è¡Œ | æ— æœåŠ¡å™¨ã€å¼¹æ€§æ‰©å±• |
| `daytona` | äº‘ç«¯æ²™ç®±å·¥ä½œåŒº | æŒä¹…åŒ–è¿œç¨‹å¼€å‘çŽ¯å¢ƒ |

### é…ç½®

```yaml
# åœ¨ ~/.zed/config.yaml ä¸­
terminal:
  backend: local    # æˆ–ï¼šdocker, ssh, singularity, modal, daytona
  cwd: "."          # å·¥ä½œç›®å½•
  timeout: 180      # å‘½ä»¤è¶…æ—¶æ—¶é—´ï¼ˆç§’ï¼‰
```

### Docker åŽç«¯

```yaml
terminal:
  backend: docker
  docker_image: python:3.11-slim
```

**å•ä¸ªæŒä¹…å®¹å™¨ï¼Œåœ¨æ•´ä¸ªè¿›ç¨‹ç”Ÿå‘½å‘¨æœŸå†…å…±äº«ã€‚** Zed åœ¨é¦–æ¬¡ä½¿ç”¨æ—¶å¯åŠ¨ä¸€ä¸ªé•¿æœŸè¿è¡Œçš„å®¹å™¨ï¼ˆ`docker run -d ... sleep 2h`ï¼‰ï¼Œå¹¶é€šè¿‡ `docker exec` å°†æ‰€æœ‰ç»ˆç«¯ã€æ–‡ä»¶åŠ `execute_code` è°ƒç”¨è·¯ç”±åˆ°åŒä¸€å®¹å™¨ä¸­ã€‚å·¥ä½œç›®å½•å˜æ›´ã€å·²å®‰è£…çš„åŒ…ã€çŽ¯å¢ƒè°ƒæ•´ä»¥åŠå†™å…¥ `/workspace` çš„æ–‡ä»¶ï¼Œåœ¨åŒä¸€ Zed è¿›ç¨‹çš„æ•´ä¸ªç”Ÿå‘½å‘¨æœŸå†…ï¼Œè·¨ `/new`ã€`/reset` å’Œ `delegate_task` å­ Agent å‡ä¼šä¿ç•™ã€‚å®¹å™¨åœ¨å…³é—­æ—¶åœæ­¢å¹¶åˆ é™¤ã€‚

è¿™æ„å‘³ç€ Docker åŽç«¯çš„è¡Œä¸ºç±»ä¼¼æŒä¹…åŒ–æ²™ç®±è™šæ‹Ÿæœºï¼Œè€Œéžæ¯æ¬¡å‘½ä»¤éƒ½ä½¿ç”¨å…¨æ–°å®¹å™¨ã€‚å¦‚æžœä½ æ‰§è¡Œè¿‡ä¸€æ¬¡ `pip install foo`ï¼Œè¯¥åŒ…åœ¨æœ¬æ¬¡ä¼šè¯çš„å‰©ä½™æ—¶é—´å†…å‡å¯ç”¨ã€‚å¦‚æžœä½ æ‰§è¡Œäº† `cd /workspace/project`ï¼ŒåŽç»­çš„ `ls` è°ƒç”¨å°†çœ‹åˆ°è¯¥ç›®å½•ã€‚å®Œæ•´çš„ç”Ÿå‘½å‘¨æœŸè¯¦æƒ…åŠæŽ§åˆ¶ `/workspace` å’Œ `/root` æ˜¯å¦è·¨ Zed é‡å¯ä¿ç•™çš„ `container_persistent` æ ‡å¿—ï¼Œè¯·å‚é˜… [é…ç½® â†’ Docker åŽç«¯](../configuration.md#docker-backend)ã€‚

### SSH åŽç«¯

æŽ¨èç”¨äºŽå®‰å…¨åœºæ™¯â€”â€”Agent æ— æ³•ä¿®æ”¹è‡ªèº«ä»£ç ï¼š

```yaml
terminal:
  backend: ssh
```
```bash
# åœ¨ ~/.zed/.env ä¸­è®¾ç½®å‡­æ®
TERMINAL_SSH_HOST=my-server.example.com
TERMINAL_SSH_USER=myuser
TERMINAL_SSH_KEY=~/.ssh/id_rsa
```

### Singularity/Apptainer

```bash
# ä¸ºå¹¶è¡Œ worker é¢„æž„å»º SIF
apptainer build ~/python.sif docker://python:3.11-slim

# é…ç½®
zed config set terminal.backend singularity
zed config set terminal.singularity_image ~/python.sif
```

### Modalï¼ˆæ— æœåŠ¡å™¨äº‘ï¼‰

```bash
uv pip install modal
modal setup
zed config set terminal.backend modal
```

### å®¹å™¨èµ„æº

ä¸ºæ‰€æœ‰å®¹å™¨åŽç«¯é…ç½® CPUã€å†…å­˜ã€ç£ç›˜å’ŒæŒä¹…åŒ–ï¼š

```yaml
terminal:
  backend: docker  # æˆ– singularity, modal, daytona
  container_cpu: 1              # CPU æ ¸å¿ƒæ•°ï¼ˆé»˜è®¤ï¼š1ï¼‰
  container_memory: 5120        # å†…å­˜ï¼ˆMBï¼Œé»˜è®¤ï¼š5GBï¼‰
  container_disk: 51200         # ç£ç›˜ï¼ˆMBï¼Œé»˜è®¤ï¼š50GBï¼‰
  container_persistent: true    # è·¨ä¼šè¯æŒä¹…åŒ–æ–‡ä»¶ç³»ç»Ÿï¼ˆé»˜è®¤ï¼štrueï¼‰
```

å¯ç”¨ `container_persistent: true` åŽï¼Œå·²å®‰è£…çš„åŒ…ã€æ–‡ä»¶å’Œé…ç½®å°†è·¨ä¼šè¯ä¿ç•™ã€‚

### å®¹å™¨å®‰å…¨

æ‰€æœ‰å®¹å™¨åŽç«¯å‡å¯ç”¨å®‰å…¨åŠ å›ºï¼š

- åªè¯»æ ¹æ–‡ä»¶ç³»ç»Ÿï¼ˆDockerï¼‰
- ä¸¢å¼ƒæ‰€æœ‰ Linux capabilities
- ç¦æ­¢æƒé™æå‡
- PID é™åˆ¶ï¼ˆ256 ä¸ªè¿›ç¨‹ï¼‰
- å®Œæ•´å‘½åç©ºé—´éš”ç¦»
- é€šè¿‡å·æŒ‚è½½å®žçŽ°æŒä¹…åŒ–å·¥ä½œåŒºï¼Œè€Œéžå¯å†™æ ¹å±‚

Docker å¯é€šè¿‡ `terminal.docker_forward_env` æŽ¥å—æ˜¾å¼çš„çŽ¯å¢ƒå˜é‡ç™½åå•ï¼Œä½†è½¬å‘çš„å˜é‡å¯¹å®¹å™¨å†…çš„å‘½ä»¤å¯è§ï¼Œåº”è§†ä¸ºåœ¨è¯¥ä¼šè¯ä¸­å·²æš´éœ²ã€‚

## åŽå°è¿›ç¨‹ç®¡ç†

å¯åŠ¨åŽå°è¿›ç¨‹å¹¶è¿›è¡Œç®¡ç†ï¼š

```python
terminal(command="pytest -v tests/", background=true)
# è¿”å›žï¼š{"session_id": "proc_abc123", "pid": 12345}

# ç„¶åŽä½¿ç”¨ process å·¥å…·è¿›è¡Œç®¡ç†ï¼š
process(action="list")       # æ˜¾ç¤ºæ‰€æœ‰è¿è¡Œä¸­çš„è¿›ç¨‹
process(action="poll", session_id="proc_abc123")   # æ£€æŸ¥çŠ¶æ€
process(action="wait", session_id="proc_abc123")   # é˜»å¡žç›´åˆ°å®Œæˆ
process(action="log", session_id="proc_abc123")    # å®Œæ•´è¾“å‡º
process(action="kill", session_id="proc_abc123")   # ç»ˆæ­¢è¿›ç¨‹
process(action="write", session_id="proc_abc123", data="y")  # å‘é€è¾“å…¥
```

PTY æ¨¡å¼ï¼ˆ`pty=true`ï¼‰å¯å¯ç”¨ Codex å’Œ Claude Code ç­‰äº¤äº’å¼ CLI å·¥å…·ã€‚

## Sudo æ”¯æŒ

å¦‚æžœå‘½ä»¤éœ€è¦ sudoï¼Œç³»ç»Ÿä¼šæç¤ºä½ è¾“å…¥å¯†ç ï¼ˆåœ¨æœ¬æ¬¡ä¼šè¯å†…ç¼“å­˜ï¼‰ã€‚ä¹Ÿå¯åœ¨ `~/.zed/.env` ä¸­è®¾ç½® `SUDO_PASSWORD`ã€‚

:::warning
åœ¨æ¶ˆæ¯å¹³å°ä¸Šï¼Œå¦‚æžœ sudo å¤±è´¥ï¼Œè¾“å‡ºä¸­ä¼šæç¤ºå°† `SUDO_PASSWORD` æ·»åŠ åˆ° `~/.zed/.env`ã€‚
:::