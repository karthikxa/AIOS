---
title: "Qmd"
sidebar_label: "Qmd"
description: "ä½¿ç”¨ qmd åœ¨æœ¬åœ°æœç´¢ä¸ªäººçŸ¥è¯†åº“ã€ç¬”è®°ã€æ–‡æ¡£å’Œä¼šè®®è®°å½• â€” ä¸€ä¸ªé›†æˆ BM25ã€å‘é‡æœç´¢å’Œ LLM é‡æŽ’åºçš„æ··åˆæ£€ç´¢å¼•æ“Ž"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Qmd

ä½¿ç”¨ qmd åœ¨æœ¬åœ°æœç´¢ä¸ªäººçŸ¥è¯†åº“ã€ç¬”è®°ã€æ–‡æ¡£å’Œä¼šè®®è®°å½• â€” ä¸€ä¸ªé›†æˆ BM25ã€å‘é‡æœç´¢å’Œ LLM é‡æŽ’åºçš„æ··åˆæ£€ç´¢å¼•æ“Žã€‚æ”¯æŒ CLI å’Œ MCP é›†æˆã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/research/qmd` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/qmd` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent + Teknium |
| è®¸å¯è¯ | MIT |
| å¹³å° | macos, linux |
| æ ‡ç­¾ | `Search`, `Knowledge-Base`, `RAG`, `Notes`, `MCP`, `Local-AI` |
| ç›¸å…³ skill | [`obsidian`](/user-guide/skills/bundled/note-taking/note-taking-obsidian), [`native-mcp`](/user-guide/skills/bundled/mcp/mcp-native-mcp), [`arxiv`](/user-guide/skills/bundled/research/research-arxiv) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# QMD â€” Query Markup Documents

æœ¬åœ°è®¾å¤‡ä¸Šçš„ä¸ªäººçŸ¥è¯†åº“æœç´¢å¼•æ“Žã€‚å¯ç´¢å¼• markdown ç¬”è®°ã€ä¼šè®®è®°å½•ã€æ–‡æ¡£åŠä»»ä½•åŸºäºŽæ–‡æœ¬çš„æ–‡ä»¶ï¼Œå¹¶æä¾›ç»“åˆå…³é”®è¯åŒ¹é…ã€è¯­ä¹‰ç†è§£å’Œ LLM é‡æŽ’åºçš„æ··åˆæœç´¢ â€” å…¨éƒ¨åœ¨æœ¬åœ°è¿è¡Œï¼Œæ— éœ€äº‘ç«¯ä¾èµ–ã€‚

ç”± [Tobi LÃ¼tke](https://github.com/tobi/qmd) åˆ›å»ºã€‚MIT è®¸å¯è¯ã€‚

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¦æ±‚æœç´¢å…¶ç¬”è®°ã€æ–‡æ¡£ã€çŸ¥è¯†åº“æˆ–ä¼šè®®è®°å½•
- ç”¨æˆ·å¸Œæœ›åœ¨å¤§é‡ markdown/æ–‡æœ¬æ–‡ä»¶ä¸­æŸ¥æ‰¾å†…å®¹
- ç”¨æˆ·éœ€è¦è¯­ä¹‰æœç´¢ï¼ˆ"æŸ¥æ‰¾å…³äºŽ X æ¦‚å¿µçš„ç¬”è®°"ï¼‰ï¼Œè€Œéžä»…ä»…æ˜¯å…³é”®è¯ grep
- ç”¨æˆ·å·²è®¾ç½® qmd é›†åˆå¹¶å¸Œæœ›æŸ¥è¯¢
- ç”¨æˆ·è¦æ±‚æ­å»ºæœ¬åœ°çŸ¥è¯†åº“æˆ–æ–‡æ¡£æœç´¢ç³»ç»Ÿ
- å…³é”®è¯ï¼š"search my notes"ã€"find in my docs"ã€"knowledge base"ã€"qmd"

## å‰ç½®æ¡ä»¶

### Node.js >= 22ï¼ˆå¿…éœ€ï¼‰

```bash
# æ£€æŸ¥ç‰ˆæœ¬
node --version  # must be >= 22

# macOS â€” install or upgrade via Homebrew
brew install node@22

# Linux â€” use NodeSource or nvm
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
# or with nvm:
nvm install 22 && nvm use 22
```

### SQLite æ‰©å±•æ”¯æŒï¼ˆä»… macOSï¼‰

macOS ç³»ç»Ÿè‡ªå¸¦çš„ SQLite ä¸æ”¯æŒæ‰©å±•åŠ è½½ã€‚è¯·é€šè¿‡ Homebrew å®‰è£…ï¼š

```bash
brew install sqlite
```

### å®‰è£… qmd

```bash
npm install -g @tobilu/qmd
# or with Bun:
bun install -g @tobilu/qmd
```

é¦–æ¬¡è¿è¡Œä¼šè‡ªåŠ¨ä¸‹è½½ 3 ä¸ªæœ¬åœ° GGUF æ¨¡åž‹ï¼ˆå…±çº¦ 2GBï¼‰ï¼š

| æ¨¡åž‹ | ç”¨é€” | å¤§å° |
|-------|---------|------|
| embeddinggemma-300M-Q8_0 | å‘é‡ embeddingï¼ˆåµŒå…¥ï¼‰ | ~300MB |
| qwen3-reranker-0.6b-q8_0 | ç»“æžœé‡æŽ’åº | ~640MB |
| qmd-query-expansion-1.7B | æŸ¥è¯¢æ‰©å±• | ~1.1GB |

### éªŒè¯å®‰è£…

```bash
qmd --version
qmd status
```

## å¿«é€Ÿå‚è€ƒ

| å‘½ä»¤ | åŠŸèƒ½ | é€Ÿåº¦ |
|---------|-------------|-------|
| `qmd search "query"` | BM25 å…³é”®è¯æœç´¢ï¼ˆæ— éœ€æ¨¡åž‹ï¼‰ | ~0.2s |
| `qmd vsearch "query"` | è¯­ä¹‰å‘é‡æœç´¢ï¼ˆ1 ä¸ªæ¨¡åž‹ï¼‰ | ~3s |
| `qmd query "query"` | æ··åˆæœç´¢ + é‡æŽ’åºï¼ˆå…¨éƒ¨ 3 ä¸ªæ¨¡åž‹ï¼‰ | çƒ­å¯åŠ¨ ~2-3sï¼Œå†·å¯åŠ¨ ~19s |
| `qmd get <docid>` | èŽ·å–å®Œæ•´æ–‡æ¡£å†…å®¹ | å³æ—¶ |
| `qmd multi-get "glob"` | æ‰¹é‡èŽ·å–æ–‡ä»¶ | å³æ—¶ |
| `qmd collection add <path> --name <n>` | å°†ç›®å½•æ·»åŠ ä¸ºé›†åˆ | å³æ—¶ |
| `qmd context add <path> "description"` | æ·»åŠ ä¸Šä¸‹æ–‡å…ƒæ•°æ®ä»¥æå‡æ£€ç´¢æ•ˆæžœ | å³æ—¶ |
| `qmd embed` | ç”Ÿæˆ/æ›´æ–°å‘é‡ embedding | ä¸å®š |
| `qmd status` | æ˜¾ç¤ºç´¢å¼•å¥åº·çŠ¶æ€å’Œé›†åˆä¿¡æ¯ | å³æ—¶ |
| `qmd mcp` | å¯åŠ¨ MCP æœåŠ¡å™¨ï¼ˆstdioï¼‰ | æŒä¹…è¿è¡Œ |
| `qmd mcp --http --daemon` | å¯åŠ¨ MCP æœåŠ¡å™¨ï¼ˆHTTPï¼Œæ¨¡åž‹ä¿æŒçƒ­å¯åŠ¨ï¼‰ | æŒä¹…è¿è¡Œ |

## è®¾ç½®æµç¨‹

### 1. æ·»åŠ é›†åˆ

å°† qmd æŒ‡å‘åŒ…å«æ–‡æ¡£çš„ç›®å½•ï¼š

```bash
# Add a notes directory
qmd collection add ~/notes --name notes

# Add project docs
qmd collection add ~/projects/myproject/docs --name project-docs

# Add meeting transcripts
qmd collection add ~/meetings --name meetings

# List all collections
qmd collection list
```

### 2. æ·»åŠ ä¸Šä¸‹æ–‡æè¿°

ä¸Šä¸‹æ–‡å…ƒæ•°æ®å¸®åŠ©æœç´¢å¼•æ“Žç†è§£æ¯ä¸ªé›†åˆçš„å†…å®¹ï¼Œå¯æ˜¾è‘—æå‡æ£€ç´¢è´¨é‡ï¼š

```bash
qmd context add qmd://notes "Personal notes, ideas, and journal entries"
qmd context add qmd://project-docs "Technical documentation for the main project"
qmd context add qmd://meetings "Meeting transcripts and action items from team syncs"
```

### 3. ç”Ÿæˆ Embedding

```bash
qmd embed
```

æ­¤å‘½ä»¤å¤„ç†æ‰€æœ‰é›†åˆä¸­çš„æ‰€æœ‰æ–‡æ¡£å¹¶ç”Ÿæˆå‘é‡ embeddingã€‚æ·»åŠ æ–°æ–‡æ¡£æˆ–é›†åˆåŽéœ€é‡æ–°è¿è¡Œã€‚

### 4. éªŒè¯

```bash
qmd status   # shows index health, collection stats, model info
```

## æœç´¢æ¨¡å¼

### å¿«é€Ÿå…³é”®è¯æœç´¢ï¼ˆBM25ï¼‰

é€‚ç”¨åœºæ™¯ï¼šç²¾ç¡®è¯è¯­ã€ä»£ç æ ‡è¯†ç¬¦ã€åç§°ã€å·²çŸ¥çŸ­è¯­ã€‚
æ— éœ€åŠ è½½æ¨¡åž‹ â€” è¿‘ä¹Žå³æ—¶è¿”å›žç»“æžœã€‚

```bash
qmd search "authentication middleware"
qmd search "handleError async"
```

### è¯­ä¹‰å‘é‡æœç´¢

é€‚ç”¨åœºæ™¯ï¼šè‡ªç„¶è¯­è¨€é—®é¢˜ã€æ¦‚å¿µæ€§æŸ¥è¯¢ã€‚
é¦–æ¬¡æŸ¥è¯¢æ—¶åŠ è½½ embedding æ¨¡åž‹ï¼ˆçº¦ 3sï¼‰ã€‚

```bash
qmd vsearch "how does the rate limiter handle burst traffic"
qmd vsearch "ideas for improving onboarding flow"
```

### æ··åˆæœç´¢ + é‡æŽ’åºï¼ˆæœ€ä½³è´¨é‡ï¼‰

é€‚ç”¨åœºæ™¯ï¼šå¯¹è´¨é‡è¦æ±‚æœ€é«˜çš„é‡è¦æŸ¥è¯¢ã€‚
ä½¿ç”¨å…¨éƒ¨ 3 ä¸ªæ¨¡åž‹ â€” æŸ¥è¯¢æ‰©å±•ã€å¹¶è¡Œ BM25+å‘é‡æœç´¢ã€é‡æŽ’åºã€‚

```bash
qmd query "what decisions were made about the database migration"
```

### ç»“æž„åŒ–å¤šæ¨¡å¼æŸ¥è¯¢

åœ¨å•æ¬¡æŸ¥è¯¢ä¸­ç»„åˆä¸åŒæœç´¢ç±»åž‹ä»¥æå‡ç²¾åº¦ï¼š

```bash
# BM25 for exact term + vector for concept
qmd query $'lex: rate limiter\nvec: how does throttling work under load'

# With query expansion
qmd query $'expand: database migration plan\nlex: "schema change"'
```

### æŸ¥è¯¢è¯­æ³•ï¼ˆlex/BM25 æ¨¡å¼ï¼‰

| è¯­æ³• | æ•ˆæžœ | ç¤ºä¾‹ |
|--------|--------|---------|
| `term` | å‰ç¼€åŒ¹é… | `perf` åŒ¹é… "performance" |
| `"phrase"` | ç²¾ç¡®çŸ­è¯­ | `"rate limiter"` |
| `-term` | æŽ’é™¤è¯è¯­ | `performance -sports` |

### HyDEï¼ˆå‡è®¾æ–‡æ¡£ Embeddingï¼‰

å¯¹äºŽå¤æ‚ä¸»é¢˜ï¼Œå¯æè¿°ä½ æœŸæœ›ç­”æ¡ˆçš„æ ·å­ï¼š

```bash
qmd query $'hyde: The migration plan involves three phases. First, we add the new columns without dropping the old ones. Then we backfill data. Finally we cut over and remove legacy columns.'
```

### é™å®šé›†åˆèŒƒå›´

```bash
qmd search "query" --collection notes
qmd query "query" --collection project-docs
```

### è¾“å‡ºæ ¼å¼

```bash
qmd search "query" --json        # JSON output (best for parsing)
qmd search "query" --limit 5     # Limit results
qmd get "#abc123"                # Get by document ID
qmd get "path/to/file.md"       # Get by file path
qmd get "file.md:50" -l 100     # Get specific line range
qmd multi-get "journals/*.md" --json  # Batch retrieve by glob
```

## MCP é›†æˆï¼ˆæŽ¨èï¼‰

qmd æä¾› MCP æœåŠ¡å™¨ï¼Œå¯é€šè¿‡åŽŸç”Ÿ MCP å®¢æˆ·ç«¯ç›´æŽ¥å‘ Zed Agent æä¾›æœç´¢å·¥å…·ã€‚è¿™æ˜¯æŽ¨èçš„é›†æˆæ–¹å¼ â€” é…ç½®å®ŒæˆåŽï¼Œagent æ— éœ€æ¯æ¬¡åŠ è½½æ­¤ skill å³å¯è‡ªåŠ¨èŽ·å¾— qmd å·¥å…·ã€‚

### æ–¹æ¡ˆ Aï¼šStdio æ¨¡å¼ï¼ˆç®€å•ï¼‰

åœ¨ `~/.zed/config.yaml` ä¸­æ·»åŠ ï¼š

```yaml
mcp_servers:
  qmd:
    command: "qmd"
    args: ["mcp"]
    timeout: 30
    connect_timeout: 45
```

æ­¤é…ç½®æ³¨å†Œä»¥ä¸‹å·¥å…·ï¼š`mcp_qmd_search`ã€`mcp_qmd_vsearch`ã€`mcp_qmd_deep_search`ã€`mcp_qmd_get`ã€`mcp_qmd_status`ã€‚

**æƒè¡¡ï¼š** æ¨¡åž‹åœ¨é¦–æ¬¡æœç´¢è°ƒç”¨æ—¶åŠ è½½ï¼ˆå†·å¯åŠ¨çº¦ 19sï¼‰ï¼Œä¹‹åŽåœ¨ä¼šè¯æœŸé—´ä¿æŒçƒ­å¯åŠ¨çŠ¶æ€ã€‚å¶å°”ä½¿ç”¨æ—¶å¯æŽ¥å—ã€‚

### æ–¹æ¡ˆ Bï¼šHTTP Daemon æ¨¡å¼ï¼ˆå¿«é€Ÿï¼Œé‡åº¦ä½¿ç”¨æŽ¨èï¼‰

å•ç‹¬å¯åŠ¨ qmd daemon â€” å®ƒä¼šå°†æ¨¡åž‹ä¿æŒåœ¨å†…å­˜ä¸­ï¼š

```bash
# Start daemon (persists across agent restarts)
qmd mcp --http --daemon

# Runs on http://localhost:8181 by default
```

ç„¶åŽé…ç½® Zed Agent é€šè¿‡ HTTP è¿žæŽ¥ï¼š

```yaml
mcp_servers:
  qmd:
    url: "http://localhost:8181/mcp"
    timeout: 30
```

**æƒè¡¡ï¼š** è¿è¡Œæ—¶å ç”¨çº¦ 2GB å†…å­˜ï¼Œä½†æ¯æ¬¡æŸ¥è¯¢éƒ½å¾ˆå¿«ï¼ˆçº¦ 2-3sï¼‰ã€‚é€‚åˆé¢‘ç¹æœç´¢çš„ç”¨æˆ·ã€‚

### ä¿æŒ Daemon æŒç»­è¿è¡Œ

#### macOSï¼ˆlaunchdï¼‰

```bash
cat > ~/Library/LaunchAgents/com.qmd.daemon.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.qmd.daemon</string>
  <key>ProgramArguments</key>
  <array>
    <string>qmd</string>
    <string>mcp</string>
    <string>--http</string>
    <string>--daemon</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>/tmp/qmd-daemon.log</string>
  <key>StandardErrorPath</key>
  <string>/tmp/qmd-daemon.log</string>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.qmd.daemon.plist
```

#### Linuxï¼ˆsystemd ç”¨æˆ·æœåŠ¡ï¼‰

```bash
mkdir -p ~/.config/systemd/user

cat > ~/.config/systemd/user/qmd-daemon.service << 'EOF'
[Unit]
Description=QMD MCP Daemon
After=network.target

[Service]
ExecStart=qmd mcp --http --daemon
Restart=on-failure
RestartSec=10
Environment=PATH=/usr/local/bin:/usr/bin:/bin

[Install]
WantedBy=default.target
EOF

systemctl --user daemon-reload
systemctl --user enable --now qmd-daemon
systemctl --user status qmd-daemon
```

### MCP å·¥å…·å‚è€ƒ

è¿žæŽ¥åŽï¼Œä»¥ä¸‹å·¥å…·ä»¥ `mcp_qmd_*` å½¢å¼å¯ç”¨ï¼š

| MCP å·¥å…· | å¯¹åº”å‘½ä»¤ | æè¿° |
|----------|---------|-------------|
| `mcp_qmd_search` | `qmd search` | BM25 å…³é”®è¯æœç´¢ |
| `mcp_qmd_vsearch` | `qmd vsearch` | è¯­ä¹‰å‘é‡æœç´¢ |
| `mcp_qmd_deep_search` | `qmd query` | æ··åˆæœç´¢ + é‡æŽ’åº |
| `mcp_qmd_get` | `qmd get` | é€šè¿‡ ID æˆ–è·¯å¾„èŽ·å–æ–‡æ¡£ |
| `mcp_qmd_status` | `qmd status` | ç´¢å¼•å¥åº·çŠ¶æ€å’Œç»Ÿè®¡ä¿¡æ¯ |

MCP å·¥å…·æŽ¥å—ç»“æž„åŒ– JSON æŸ¥è¯¢ä»¥æ”¯æŒå¤šæ¨¡å¼æœç´¢ï¼š

```json
{
  "searches": [
    {"type": "lex", "query": "authentication middleware"},
    {"type": "vec", "query": "how user login is verified"}
  ],
  "collections": ["project-docs"],
  "limit": 10
}
```

## CLI ç”¨æ³•ï¼ˆä¸ä½¿ç”¨ MCPï¼‰

æœªé…ç½® MCP æ—¶ï¼Œç›´æŽ¥é€šè¿‡ç»ˆç«¯ä½¿ç”¨ qmdï¼š

```
terminal(command="qmd query 'what was decided about the API redesign' --json", timeout=30)
```

è®¾ç½®å’Œç®¡ç†ä»»åŠ¡å§‹ç»ˆä½¿ç”¨ç»ˆç«¯ï¼š

```
terminal(command="qmd collection add ~/Documents/notes --name notes")
terminal(command="qmd context add qmd://notes 'Personal research notes and ideas'")
terminal(command="qmd embed")
terminal(command="qmd status")
```

## æœç´¢æµæ°´çº¿å·¥ä½œåŽŸç†

äº†è§£å†…éƒ¨æœºåˆ¶æœ‰åŠ©äºŽé€‰æ‹©åˆé€‚çš„æœç´¢æ¨¡å¼ï¼š

1. **æŸ¥è¯¢æ‰©å±•** â€” ä¸€ä¸ªç»è¿‡å¾®è°ƒçš„ 1.7B æ¨¡åž‹ç”Ÿæˆ 2 ä¸ªå¤‡é€‰æŸ¥è¯¢ã€‚åŽŸå§‹æŸ¥è¯¢åœ¨èžåˆä¸­èŽ·å¾— 2 å€æƒé‡ã€‚
2. **å¹¶è¡Œæ£€ç´¢** â€” BM25ï¼ˆSQLite FTS5ï¼‰å’Œå‘é‡æœç´¢è·¨æ‰€æœ‰æŸ¥è¯¢å˜ä½“å¹¶è¡Œè¿è¡Œã€‚
3. **RRF èžåˆ** â€” å€’æ•°æŽ’åèžåˆï¼ˆk=60ï¼‰åˆå¹¶ç»“æžœã€‚é¡¶éƒ¨æŽ’ååŠ æˆï¼šç¬¬ 1 å +0.05ï¼Œç¬¬ 2-3 å +0.02ã€‚
4. **LLM é‡æŽ’åº** â€” qwen3-reranker å¯¹å‰ 30 ä¸ªå€™é€‰ç»“æžœè¯„åˆ†ï¼ˆ0.0-1.0ï¼‰ã€‚
5. **ä½ç½®æ„ŸçŸ¥æ··åˆ** â€” æŽ’å 1-3ï¼š75% æ£€ç´¢ / 25% é‡æŽ’åºã€‚æŽ’å 4-10ï¼š60/40ã€‚æŽ’å 11+ï¼š40/60ï¼ˆå¯¹é•¿å°¾ç»“æžœæ›´ä¿¡ä»»é‡æŽ’åºï¼‰ã€‚

**æ™ºèƒ½åˆ†å—ï¼š** æ–‡æ¡£åœ¨è‡ªç„¶æ–­ç‚¹å¤„åˆ†å‰²ï¼ˆæ ‡é¢˜ã€ä»£ç å—ã€ç©ºè¡Œï¼‰ï¼Œç›®æ ‡çº¦ 900 ä¸ª tokenï¼Œé‡å çŽ‡ 15%ã€‚ä»£ç å—ä¸ä¼šåœ¨ä¸­é—´è¢«æˆªæ–­ã€‚

## æœ€ä½³å®žè·µ

1. **å§‹ç»ˆæ·»åŠ ä¸Šä¸‹æ–‡æè¿°** â€” `qmd context add` å¯æ˜¾è‘—æå‡æ£€ç´¢å‡†ç¡®æ€§ã€‚æè¿°æ¯ä¸ªé›†åˆåŒ…å«çš„å†…å®¹ã€‚
2. **æ·»åŠ æ–‡æ¡£åŽé‡æ–° embed** â€” å‘é›†åˆæ·»åŠ æ–°æ–‡ä»¶åŽå¿…é¡»é‡æ–°è¿è¡Œ `qmd embed`ã€‚
3. **é€Ÿåº¦ä¼˜å…ˆç”¨ `qmd search`** â€” éœ€è¦å¿«é€Ÿå…³é”®è¯æŸ¥æ‰¾ï¼ˆä»£ç æ ‡è¯†ç¬¦ã€ç²¾ç¡®åç§°ï¼‰æ—¶ï¼ŒBM25 å³æ—¶å“åº”ä¸”æ— éœ€æ¨¡åž‹ã€‚
4. **è´¨é‡ä¼˜å…ˆç”¨ `qmd query`** â€” é—®é¢˜å…·æœ‰æ¦‚å¿µæ€§æˆ–ç”¨æˆ·éœ€è¦æœ€ä½³ç»“æžœæ—¶ï¼Œä½¿ç”¨æ··åˆæœç´¢ã€‚
5. **ä¼˜å…ˆä½¿ç”¨ MCP é›†æˆ** â€” é…ç½®å®ŒæˆåŽï¼Œagent æ— éœ€æ¯æ¬¡åŠ è½½æ­¤ skill å³å¯èŽ·å¾—åŽŸç”Ÿå·¥å…·ã€‚
6. **é¢‘ç¹ç”¨æˆ·ä½¿ç”¨ daemon æ¨¡å¼** â€” å¦‚æžœç”¨æˆ·ç»å¸¸æœç´¢çŸ¥è¯†åº“ï¼Œå»ºè®®è®¾ç½® HTTP daemonã€‚
7. **ç»“æž„åŒ–æœç´¢ä¸­ç¬¬ä¸€ä¸ªæŸ¥è¯¢èŽ·å¾— 2 å€æƒé‡** â€” ç»„åˆ lex å’Œ vec æ—¶ï¼Œå°†æœ€é‡è¦/æœ€ç¡®å®šçš„æŸ¥è¯¢æ”¾åœ¨é¦–ä½ã€‚

## æ•…éšœæŽ’æŸ¥

### "é¦–æ¬¡è¿è¡Œæ—¶æ¨¡åž‹æ­£åœ¨ä¸‹è½½"
æ­£å¸¸çŽ°è±¡ â€” qmd é¦–æ¬¡ä½¿ç”¨æ—¶ä¼šè‡ªåŠ¨ä¸‹è½½çº¦ 2GB çš„ GGUF æ¨¡åž‹ã€‚
è¿™æ˜¯ä¸€æ¬¡æ€§æ“ä½œã€‚

### å†·å¯åŠ¨å»¶è¿Ÿï¼ˆçº¦ 19sï¼‰
æ¨¡åž‹æœªåŠ è½½åˆ°å†…å­˜æ—¶ä¼šå‡ºçŽ°æ­¤æƒ…å†µã€‚è§£å†³æ–¹æ¡ˆï¼š
- ä½¿ç”¨ HTTP daemon æ¨¡å¼ï¼ˆ`qmd mcp --http --daemon`ï¼‰ä¿æŒçƒ­å¯åŠ¨
- ä¸éœ€è¦æ¨¡åž‹æ—¶ä½¿ç”¨ `qmd search`ï¼ˆä»… BM25ï¼‰
- MCP stdio æ¨¡å¼åœ¨é¦–æ¬¡æœç´¢æ—¶åŠ è½½æ¨¡åž‹ï¼Œä¼šè¯æœŸé—´ä¿æŒçƒ­å¯åŠ¨

### macOSï¼š"unable to load extension"
å®‰è£… Homebrew SQLiteï¼š`brew install sqlite`
ç„¶åŽç¡®ä¿å…¶åœ¨ç³»ç»Ÿ SQLite ä¹‹å‰å‡ºçŽ°åœ¨ PATH ä¸­ã€‚

### "æœªæ‰¾åˆ°é›†åˆ"
è¿è¡Œ `qmd collection add <path> --name <name>` æ·»åŠ ç›®å½•ï¼Œ
ç„¶åŽè¿è¡Œ `qmd embed` è¿›è¡Œç´¢å¼•ã€‚

### Embedding æ¨¡åž‹è¦†ç›–ï¼ˆCJK/å¤šè¯­è¨€ï¼‰
ä¸ºéžè‹±è¯­å†…å®¹è®¾ç½® `QMD_EMBED_MODEL` çŽ¯å¢ƒå˜é‡ï¼š
```bash
export QMD_EMBED_MODEL="your-multilingual-model"
```

## æ•°æ®å­˜å‚¨

- **ç´¢å¼•ä¸Žå‘é‡ï¼š** `~/.cache/qmd/index.sqlite`
- **æ¨¡åž‹ï¼š** é¦–æ¬¡è¿è¡Œæ—¶è‡ªåŠ¨ä¸‹è½½åˆ°æœ¬åœ°ç¼“å­˜
- **æ— äº‘ç«¯ä¾èµ–** â€” å…¨éƒ¨åœ¨æœ¬åœ°è¿è¡Œ

## å‚è€ƒèµ„æ–™

- [GitHub: tobi/qmd](https://github.com/tobi/qmd)
- [QMD æ›´æ–°æ—¥å¿—](https://github.com/tobi/qmd/blob/main/CHANGELOG.md)