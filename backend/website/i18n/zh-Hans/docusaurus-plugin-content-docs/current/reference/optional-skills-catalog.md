---
sidebar_position: 9
title: "å¯é€‰æŠ€èƒ½ç›®å½•"
description: "zed-agent é™„å¸¦çš„å®˜æ–¹å¯é€‰æŠ€èƒ½ â€” é€šè¿‡ zed skills install official/<category>/<skill> å®‰è£…"
---

# å¯é€‰æŠ€èƒ½ç›®å½•

å¯é€‰æŠ€èƒ½éš zed-agent ä¸€èµ·å‘å¸ƒï¼Œä½äºŽ `optional-skills/` ç›®å½•ä¸‹ï¼Œä½†**é»˜è®¤æœªæ¿€æ´»**ã€‚è¯·æ˜¾å¼å®‰è£…ï¼š

```bash
zed skills install official/<category>/<skill>
```

ç¤ºä¾‹ï¼š

```bash
zed skills install official/blockchain/solana
zed skills install official/mlops/flash-attention
```

ä¸‹æ–¹æ¯ä¸ªæŠ€èƒ½å‡é“¾æŽ¥è‡³ä¸“å±žé¡µé¢ï¼ŒåŒ…å«å®Œæ•´å®šä¹‰ã€é…ç½®å’Œä½¿ç”¨è¯´æ˜Žã€‚

å¸è½½æ–¹å¼ï¼š

```bash
zed skills uninstall <skill-name>
```

## autonomous-ai-agents

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**blackbox**](/user-guide/skills/optional/autonomous-ai-agents/autonomous-ai-agents-blackbox) | å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Blackbox AI CLI agentã€‚å†…ç½®è¯„åˆ¤æœºåˆ¶çš„å¤šæ¨¡åž‹ agentï¼Œé€šè¿‡å¤šä¸ª LLM è¿è¡Œä»»åŠ¡å¹¶é€‰å‡ºæœ€ä½³ç»“æžœã€‚éœ€è¦ blackbox CLI å’Œ Blackbox AI API å¯†é’¥ã€‚ |
| [**honcho**](/user-guide/skills/optional/autonomous-ai-agents/autonomous-ai-agents-honcho) | é…ç½®å¹¶ä½¿ç”¨ Honcho è®°å¿†ä¸Ž Zed â€” è·¨ä¼šè¯ç”¨æˆ·å»ºæ¨¡ã€å¤šé…ç½®æ–‡ä»¶å¯¹ç­‰éš”ç¦»ã€è§‚æµ‹é…ç½®ã€è¾©è¯æŽ¨ç†ã€ä¼šè¯æ‘˜è¦åŠä¸Šä¸‹æ–‡é¢„ç®—æ‰§è¡Œã€‚é€‚ç”¨äºŽé…ç½® Honchoã€æ•…éšœæŽ’æŸ¥ç­‰åœºæ™¯ã€‚ |

## blockchain

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**evm**](/user-guide/skills/optional/blockchain/blockchain-evm) | åªè¯» EVM å®¢æˆ·ç«¯ï¼šæ”¯æŒ 8 æ¡é“¾çš„é’±åŒ…ã€ä»£å¸ã€Gas æŸ¥è¯¢ã€‚ |
| [**hyperliquid**](/user-guide/skills/optional/blockchain/blockchain-hyperliquid) | Hyperliquid å¸‚åœºæ•°æ®ã€è´¦æˆ·åŽ†å²ã€äº¤æ˜“å›žé¡¾ã€‚ |
| [**solana**](/user-guide/skills/optional/blockchain/blockchain-solana) | æŸ¥è¯¢ Solana é“¾ä¸Šæ•°æ®å¹¶é™„å¸¦ USD å®šä»· â€” é’±åŒ…ä½™é¢ã€å¸¦ä¼°å€¼çš„ä»£å¸ç»„åˆã€äº¤æ˜“è¯¦æƒ…ã€NFTã€å·¨é²¸æ£€æµ‹åŠå®žæ—¶ç½‘ç»œç»Ÿè®¡ã€‚ä½¿ç”¨ Solana RPC + CoinGeckoï¼Œæ— éœ€ API å¯†é’¥ã€‚ |

## communication

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**one-three-one-rule**](/user-guide/skills/optional/communication/communication-one-three-one-rule) | ç”¨äºŽæŠ€æœ¯ææ¡ˆå’Œæƒè¡¡åˆ†æžçš„ç»“æž„åŒ–å†³ç­–æ¡†æž¶ã€‚å½“ç”¨æˆ·é¢ä¸´å¤šç§æ–¹æ¡ˆé€‰æ‹©ï¼ˆæž¶æž„å†³ç­–ã€å·¥å…·é€‰åž‹ã€é‡æž„ç­–ç•¥ã€è¿ç§»è·¯å¾„ï¼‰æ—¶ï¼Œæœ¬æŠ€èƒ½æä¾›ç³»ç»ŸåŒ–çš„åˆ†æžæµç¨‹ã€‚ |

## creative

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**blender-mcp**](/user-guide/skills/optional/creative/creative-blender-mcp) | é€šè¿‡ socket è¿žæŽ¥ blender-mcp æ’ä»¶ï¼Œç›´æŽ¥ä»Ž Zed æŽ§åˆ¶ Blenderã€‚åˆ›å»º 3D å¯¹è±¡ã€æè´¨ã€åŠ¨ç”»ï¼Œå¹¶è¿è¡Œä»»æ„ Blender Pythonï¼ˆbpyï¼‰ä»£ç ã€‚é€‚ç”¨äºŽç”¨æˆ·å¸Œæœ›åœ¨ Blender ä¸­åˆ›å»ºæˆ–ä¿®æ”¹ä»»ä½•å†…å®¹çš„åœºæ™¯ã€‚ |
| [**concept-diagrams**](/user-guide/skills/optional/creative/creative-concept-diagrams) | ç”Ÿæˆæ‰å¹³ã€æžç®€ã€æ”¯æŒäº®è‰²/æš—è‰²æ¨¡å¼çš„ SVG å›¾è¡¨ï¼Œè¾“å‡ºä¸ºç‹¬ç«‹ HTML æ–‡ä»¶ï¼Œé‡‡ç”¨ç»Ÿä¸€çš„æ•™è‚²è§†è§‰è¯­è¨€ï¼ŒåŒ…å« 9 ç§è¯­ä¹‰è‰²é˜¶ã€å¥é¦–å¤§å†™æŽ’ç‰ˆåŠè‡ªåŠ¨æš—è‰²æ¨¡å¼ã€‚æœ€é€‚åˆæ•™è‚²å’Œè¯´æ˜Žç±»å†…å®¹ã€‚ |
| [**hyperframes**](/user-guide/skills/optional/creative/creative-hyperframes) | ä½¿ç”¨ HyperFrames åˆ›å»ºåŸºäºŽ HTML çš„è§†é¢‘åˆæˆã€åŠ¨æ€æ ‡é¢˜å¡ã€ç¤¾äº¤å å±‚ã€å­—å¹•è®¿è°ˆè§†é¢‘ã€éŸ³é¢‘å“åº”è§†è§‰æ•ˆæžœåŠç€è‰²å™¨è½¬åœºã€‚HTML æ˜¯è§†é¢‘çš„å”¯ä¸€æ¥æºã€‚é€‚ç”¨äºŽç”¨æˆ·å¸Œæœ›åˆ¶ä½œä»»ä½•è§†é¢‘å†…å®¹çš„åœºæ™¯ã€‚ |
| [**kanban-video-orchestrator**](/user-guide/skills/optional/creative/creative-kanban-video-orchestrator) | è§„åˆ’ã€æ­å»ºå¹¶ç›‘æŽ§ç”± Zed Kanban æ”¯æ’‘çš„å¤š agent è§†é¢‘åˆ¶ä½œæµæ°´çº¿ã€‚é€‚ç”¨äºŽç”¨æˆ·å¸Œæœ›åˆ¶ä½œä»»ä½•ç±»åž‹è§†é¢‘çš„åœºæ™¯ â€” å™äº‹å½±ç‰‡ã€äº§å“/è¥é”€è§†é¢‘ã€MVã€è§£è¯´è§†é¢‘ã€ASCII/ç»ˆç«¯è‰ºæœ¯ã€æŠ½è±¡/ç”Ÿæˆå¼å¾ªçŽ¯ç­‰ã€‚ |
| [**meme-generation**](/user-guide/skills/optional/creative/creative-meme-generation) | é€šè¿‡é€‰å–æ¨¡æ¿å¹¶ä½¿ç”¨ Pillow å åŠ æ–‡å­—æ¥ç”ŸæˆçœŸå®žçš„ meme å›¾ç‰‡ï¼Œè¾“å‡ºå®žé™…çš„ .png æ–‡ä»¶ã€‚ |

## devops

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**inference-sh-cli**](/user-guide/skills/optional/devops/devops-cli) | é€šè¿‡ inference.sh CLIï¼ˆinfshï¼‰è¿è¡Œ 150+ AI åº”ç”¨ â€” å›¾åƒç”Ÿæˆã€è§†é¢‘åˆ›ä½œã€LLMã€æœç´¢ã€3Dã€ç¤¾äº¤è‡ªåŠ¨åŒ–ã€‚ä½¿ç”¨ç»ˆç«¯å·¥å…·ã€‚è§¦å‘è¯ï¼šinference.shã€infshã€ai appsã€fluxã€veoã€å›¾åƒç”Ÿæˆã€è§†é¢‘ç”Ÿæˆã€seedrea ç­‰ã€‚ |
| [**docker-management**](/user-guide/skills/optional/devops/devops-docker-management) | ç®¡ç† Docker å®¹å™¨ã€é•œåƒã€å·ã€ç½‘ç»œåŠ Compose æ ˆ â€” ç”Ÿå‘½å‘¨æœŸæ“ä½œã€è°ƒè¯•ã€æ¸…ç†åŠ Dockerfile ä¼˜åŒ–ã€‚ |
| [**pinggy-tunnel**](/user-guide/skills/optional/devops/devops-pinggy-tunnel) | é€šè¿‡ Pinggy ç» SSH å®žçŽ°é›¶å®‰è£…æœ¬åœ°éš§é“ã€‚ |
| [**watchers**](/user-guide/skills/optional/devops/devops-watchers) | è½®è¯¢ RSSã€JSON API å’Œ GitHubï¼Œå¹¶ä½¿ç”¨æ°´å°åŽ»é‡ã€‚ |

## dogfood

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**adversarial-ux-test**](/user-guide/skills/optional/dogfood/dogfood-adversarial-ux-test) | æ‰®æ¼”äº§å“ä¸­æœ€éš¾åº”å¯¹çš„æŠ€æœ¯æŠµè§¦åž‹ç”¨æˆ·ã€‚ä»¥è¯¥è§’è‰²æµè§ˆåº”ç”¨ï¼Œæ‰¾å‡ºæ‰€æœ‰ UX ç—›ç‚¹ï¼Œå†é€šè¿‡å®žç”¨ä¸»ä¹‰è¿‡æ»¤å±‚åŒºåˆ†çœŸå®žé—®é¢˜ä¸Žå™ªéŸ³ï¼Œç”Ÿæˆå¯æ‰§è¡Œçš„å·¥å•ã€‚ |

## email

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**agentmail**](/user-guide/skills/optional/email/email-agentmail) | é€šè¿‡ AgentMail ä¸º agent æä¾›ä¸“å±žé‚®ç®±ã€‚ä½¿ç”¨ agent ä¸“å±žé‚®ä»¶åœ°å€ï¼ˆå¦‚ zed-agent@agentmail.toï¼‰è‡ªä¸»å‘é€ã€æŽ¥æ”¶å’Œç®¡ç†é‚®ä»¶ã€‚ |

## finance

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**3-statement-model**](/user-guide/skills/optional/finance/finance-3-statement-model) | åœ¨ Excel ä¸­æž„å»ºå®Œæ•´é›†æˆçš„ä¸‰è¡¨æ¨¡åž‹ï¼ˆåˆ©æ¶¦è¡¨ã€èµ„äº§è´Ÿå€ºè¡¨ã€çŽ°é‡‘æµé‡è¡¨ï¼‰ï¼ŒåŒ…å«è¥è¿èµ„æœ¬è®¡åˆ’ã€æŠ˜æ—§æ‘Šé”€æ»šåŠ¨ã€å€ºåŠ¡è®¡åˆ’åŠä½¿çŽ°é‡‘ä¸Žç•™å­˜æ”¶ç›Šå¹³è¡¡çš„å‹¾ç¨½é¡¹ã€‚ä¸Ž excel-author é…åˆä½¿ç”¨ã€‚ |
| [**comps-analysis**](/user-guide/skills/optional/finance/finance-comps-analysis) | åœ¨ Excel ä¸­æž„å»ºå¯æ¯”å…¬å¸åˆ†æž â€” è¿è¥æŒ‡æ ‡ã€ä¼°å€¼å€æ•°ã€ä¸ŽåŒè¡Œé›†åˆçš„ç»Ÿè®¡åŸºå‡†å¯¹æ¯”ã€‚ä¸Ž excel-author é…åˆä½¿ç”¨ã€‚é€‚ç”¨äºŽä¸Šå¸‚å…¬å¸ä¼°å€¼ã€IPO å®šä»·ã€è¡Œä¸šåŸºå‡†æˆ–å¼‚å¸¸å€¼æ£€æµ‹ã€‚ |
| [**dcf-model**](/user-guide/skills/optional/finance/finance-dcf-model) | åœ¨ Excel ä¸­æž„å»ºæœºæž„çº§ DCF ä¼°å€¼æ¨¡åž‹ â€” æ”¶å…¥é¢„æµ‹ã€è‡ªç”±çŽ°é‡‘æµæž„å»ºã€WACCã€ç»ˆå€¼ã€æ‚²è§‚/åŸºå‡†/ä¹è§‚æƒ…æ™¯åŠ 5Ã—5 æ•æ„Ÿæ€§åˆ†æžè¡¨ã€‚ä¸Ž excel-author é…åˆä½¿ç”¨ã€‚é€‚ç”¨äºŽå†…åœ¨ä»·å€¼è‚¡æƒåˆ†æžã€‚ |
| [**excel-author**](/user-guide/skills/optional/finance/finance-excel-author) | ä½¿ç”¨ openpyxl æ— å¤´æž„å»ºå¯å®¡è®¡çš„ Excel å·¥ä½œç°¿ â€” è“/é»‘/ç»¿å•å…ƒæ ¼è§„èŒƒã€å…¬å¼ä¼˜å…ˆäºŽç¡¬ç¼–ç ã€å‘½ååŒºåŸŸã€ä½™é¢æ ¡éªŒã€æ•æ„Ÿæ€§åˆ†æžè¡¨ã€‚é€‚ç”¨äºŽè´¢åŠ¡æ¨¡åž‹ã€å®¡è®¡è¾“å‡ºã€å¯¹è´¦ã€‚ |
| [**lbo-model**](/user-guide/skills/optional/finance/finance-lbo-model) | åœ¨ Excel ä¸­æž„å»ºæ æ†æ”¶è´­æ¨¡åž‹ â€” èµ„é‡‘æ¥æºä¸Žç”¨é€”ã€å€ºåŠ¡è®¡åˆ’ã€çŽ°é‡‘æ¸…å¿ã€é€€å‡ºå€æ•°ã€IRR/MOIC æ•æ„Ÿæ€§åˆ†æžã€‚ä¸Ž excel-author é…åˆä½¿ç”¨ã€‚é€‚ç”¨äºŽ PE ç­›é€‰ã€ä¸»å¯¼æ–¹æ¡ˆä¼°å€¼æˆ– pitch ä¸­çš„ç¤ºæ„æ€§ LBOã€‚ |
| [**merger-model**](/user-guide/skills/optional/finance/finance-merger-model) | åœ¨ Excel ä¸­æž„å»ºå¢žåŽš/æ‘Šè–„ï¼ˆå¹¶è´­ï¼‰æ¨¡åž‹ â€” åˆå¹¶åŽåˆ©æ¶¦è¡¨ã€ååŒæ•ˆåº”ã€èžèµ„ç»“æž„ã€æ¯è‚¡æ”¶ç›Šå½±å“ã€‚ä¸Ž excel-author é…åˆä½¿ç”¨ã€‚é€‚ç”¨äºŽå¹¶è´­ pitchã€è‘£äº‹ä¼šææ–™æˆ–äº¤æ˜“è¯„ä¼°ã€‚ |
| [**pptx-author**](/user-guide/skills/optional/finance/finance-pptx-author) | ä½¿ç”¨ python-pptx æ— å¤´æž„å»º PowerPoint æ¼”ç¤ºæ–‡ç¨¿ã€‚ä¸Ž excel-author é…åˆï¼Œåˆ¶ä½œæ¯ä¸ªæ•°å­—å‡å¯è¿½æº¯è‡³å·¥ä½œç°¿å•å…ƒæ ¼çš„æ¨¡åž‹æ”¯æ’‘åž‹å¹»ç¯ç‰‡ã€‚é€‚ç”¨äºŽ pitch deckã€æŠ•å§”ä¼šå¤‡å¿˜å½•ã€ç›ˆåˆ©è¯´æ˜Žã€‚ |
| [**stocks**](/user-guide/skills/optional/finance/finance-stocks) | é€šè¿‡ Yahoo èŽ·å–è‚¡ç¥¨æŠ¥ä»·ã€åŽ†å²æ•°æ®ã€æœç´¢ã€å¯¹æ¯”åŠåŠ å¯†è´§å¸è¡Œæƒ…ã€‚ |

## health

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**fitness-nutrition**](/user-guide/skills/optional/health/health-fitness-nutrition) | å¥èº«è®­ç»ƒè®¡åˆ’ä¸Žè¥å…»è¿½è¸ªã€‚é€šè¿‡ wger æŒ‰è‚Œè‚‰ç¾¤ã€å™¨æ¢°æˆ–ç±»åˆ«æœç´¢ 690+ ç§è®­ç»ƒåŠ¨ä½œã€‚é€šè¿‡ USDA FoodData Central æŸ¥è¯¢ 380,000+ ç§é£Ÿç‰©çš„å®é‡è¥å…»ç´ å’Œçƒ­é‡ã€‚è®¡ç®— BMIã€TDEEã€å•æ¬¡æœ€å¤§é‡é‡ã€å®é‡è¥å…»ç´ åˆ†é…åŠä½“æˆåˆ†ã€‚ |
| [**neuroskill-bci**](/user-guide/skills/optional/health/health-neuroskill-bci) | è¿žæŽ¥è¿è¡Œä¸­çš„ NeuroSkill å®žä¾‹ï¼Œå°†ç”¨æˆ·çš„å®žæ—¶è®¤çŸ¥å’Œæƒ…ç»ªçŠ¶æ€ï¼ˆä¸“æ³¨åº¦ã€æ”¾æ¾åº¦ã€æƒ…ç»ªã€è®¤çŸ¥è´Ÿè·ã€å›°å€¦åº¦ã€å¿ƒçŽ‡ã€HRVã€ç¡çœ åˆ†æœŸåŠ 40+ é¡¹è¡ç”Ÿ EXG è¯„åˆ†ï¼‰èžå…¥å“åº”ä¸­ã€‚ |

## mcp

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**fastmcp**](/user-guide/skills/optional/mcp/mcp-fastmcp) | ä½¿ç”¨ Python ä¸­çš„ FastMCP æž„å»ºã€æµ‹è¯•ã€æ£€æŸ¥ã€å®‰è£…å’Œéƒ¨ç½² MCP æœåŠ¡å™¨ã€‚é€‚ç”¨äºŽåˆ›å»ºæ–° MCP æœåŠ¡å™¨ã€å°† API æˆ–æ•°æ®åº“å°è£…ä¸º MCP å·¥å…·ã€æš´éœ²èµ„æºæˆ– promptï¼ˆæç¤ºè¯ï¼‰ï¼Œæˆ–ä¸º Claude Codeã€Cursor ç­‰å‡†å¤‡ FastMCP æœåŠ¡å™¨çš„åœºæ™¯ã€‚ |
| [**mcporter**](/user-guide/skills/optional/mcp/mcp-mcporter) | ä½¿ç”¨ mcporter CLI åˆ—å‡ºã€é…ç½®ã€é‰´æƒå¹¶ç›´æŽ¥è°ƒç”¨ MCP æœåŠ¡å™¨/å·¥å…·ï¼ˆHTTP æˆ– stdioï¼‰ï¼ŒåŒ…æ‹¬ä¸´æ—¶æœåŠ¡å™¨ã€é…ç½®ç¼–è¾‘åŠ CLI/ç±»åž‹ç”Ÿæˆã€‚ |

## migration

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**openclaw-migration**](/user-guide/skills/optional/migration/migration-openclaw-migration) | å°†ç”¨æˆ·çš„ OpenClaw è‡ªå®šä¹‰é…ç½®è¿ç§»è‡³ Zed Agentã€‚ä»Ž ~/.openclaw å¯¼å…¥å…¼å®¹ Zed çš„è®°å¿†ã€SOUL.mdã€å‘½ä»¤ç™½åå•ã€ç”¨æˆ·æŠ€èƒ½åŠé€‰å®šçš„å·¥ä½œåŒºèµ„äº§ï¼Œå¹¶æŠ¥å‘Šæ— æ³•è¿ç§»çš„å†…å®¹ã€‚ |

## mlops

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**huggingface-accelerate**](/user-guide/skills/optional/mlops/mlops-accelerate) | æœ€ç®€å•çš„åˆ†å¸ƒå¼è®­ç»ƒ APIã€‚ä»…éœ€ 4 è¡Œä»£ç å³å¯ä¸ºä»»æ„ PyTorch è„šæœ¬æ·»åŠ åˆ†å¸ƒå¼æ”¯æŒã€‚ç»Ÿä¸€æ”¯æŒ DeepSpeed/FSDP/Megatron/DDP çš„ APIã€‚è‡ªåŠ¨è®¾å¤‡æ”¾ç½®ï¼Œæ··åˆç²¾åº¦ï¼ˆFP16/BF16/FP8ï¼‰ã€‚äº¤äº’å¼é…ç½®ï¼Œå•ä¸€å¯åŠ¨å‘½ä»¤ã€‚ |
| [**axolotl**](/user-guide/skills/optional/mlops/mlops-training-axolotl) | Axolotlï¼šåŸºäºŽ YAML é…ç½®çš„ LLM å¾®è°ƒï¼ˆLoRAã€DPOã€GRPOï¼‰ã€‚ |
| [**chroma**](/user-guide/skills/optional/mlops/mlops-chroma) | é¢å‘ AI åº”ç”¨çš„å¼€æº embeddingï¼ˆå‘é‡åµŒå…¥ï¼‰æ•°æ®åº“ã€‚å­˜å‚¨ embedding å’Œå…ƒæ•°æ®ï¼Œæ‰§è¡Œå‘é‡åŠå…¨æ–‡æœç´¢ï¼ŒæŒ‰å…ƒæ•°æ®è¿‡æ»¤ã€‚ç®€æ´çš„ 4 å‡½æ•° APIï¼Œä»Ž notebook æ‰©å±•è‡³ç”Ÿäº§é›†ç¾¤ã€‚é€‚ç”¨äºŽè¯­ä¹‰æœç´¢ã€RAG ç­‰åœºæ™¯ã€‚ |
| [**clip**](/user-guide/skills/optional/mlops/mlops-clip) | OpenAI è¿žæŽ¥è§†è§‰ä¸Žè¯­è¨€çš„æ¨¡åž‹ã€‚æ”¯æŒé›¶æ ·æœ¬å›¾åƒåˆ†ç±»ã€å›¾æ–‡åŒ¹é…åŠè·¨æ¨¡æ€æ£€ç´¢ã€‚åœ¨ 4 äº¿å›¾æ–‡å¯¹ä¸Šè®­ç»ƒã€‚é€‚ç”¨äºŽå›¾åƒæœç´¢ã€å†…å®¹å®¡æ ¸æˆ–è§†è§‰è¯­è¨€ä»»åŠ¡ã€‚ |
| [**faiss**](/user-guide/skills/optional/mlops/mlops-faiss) | Facebook ç”¨äºŽé«˜æ•ˆç›¸ä¼¼æ€§æœç´¢å’Œç¨ å¯†å‘é‡èšç±»çš„åº“ã€‚æ”¯æŒæ•°åäº¿å‘é‡ã€GPU åŠ é€ŸåŠå¤šç§ç´¢å¼•ç±»åž‹ï¼ˆFlatã€IVFã€HNSWï¼‰ã€‚é€‚ç”¨äºŽå¿«é€Ÿ k-NN æœç´¢ã€å¤§è§„æ¨¡å‘é‡æ£€ç´¢ç­‰åœºæ™¯ã€‚ |
| [**optimizing-attention-flash**](/user-guide/skills/optional/mlops/mlops-flash-attention) | ä½¿ç”¨ Flash Attention ä¼˜åŒ– transformer æ³¨æ„åŠ›æœºåˆ¶ï¼Œå®žçŽ° 2-4 å€åŠ é€Ÿå’Œ 10-20 å€æ˜¾å­˜é™ä½Žã€‚é€‚ç”¨äºŽè®­ç»ƒ/è¿è¡Œé•¿åºåˆ—ï¼ˆ>512 tokenï¼‰transformerã€é‡åˆ°æ³¨æ„åŠ› GPU æ˜¾å­˜é—®é¢˜æˆ–éœ€è¦æ›´å¿«æŽ¨ç†çš„åœºæ™¯ã€‚ |
| [**guidance**](/user-guide/skills/optional/mlops/mlops-guidance) | ä½¿ç”¨ Guidanceï¼ˆå¾®è½¯ç ”ç©¶é™¢çš„çº¦æŸç”Ÿæˆæ¡†æž¶ï¼‰é€šè¿‡æ­£åˆ™è¡¨è¾¾å¼å’Œè¯­æ³•æŽ§åˆ¶ LLM è¾“å‡ºï¼Œä¿è¯ç”Ÿæˆæœ‰æ•ˆçš„ JSON/XML/ä»£ç ï¼Œå¼ºåˆ¶ç»“æž„åŒ–æ ¼å¼ï¼Œå¹¶æž„å»ºå¤šæ­¥éª¤å·¥ä½œæµã€‚ |
| [**huggingface-tokenizers**](/user-guide/skills/optional/mlops/mlops-huggingface-tokenizers) | ä¸ºç ”ç©¶å’Œç”Ÿäº§ä¼˜åŒ–çš„å¿«é€Ÿ tokenizerï¼ˆåˆ†è¯å™¨ï¼‰ã€‚åŸºäºŽ Rust å®žçŽ°ï¼Œå¯åœ¨ 20 ç§’å†…å¯¹ 1GB æ–‡æœ¬å®Œæˆåˆ†è¯ã€‚æ”¯æŒ BPEã€WordPiece å’Œ Unigram ç®—æ³•ã€‚è®­ç»ƒè‡ªå®šä¹‰è¯è¡¨ã€è¿½è¸ªå¯¹é½ã€å¤„ç†å¡«å……/æˆªæ–­ï¼Œä¸Ž HuggingFace ç”Ÿæ€é›†æˆã€‚ |
| [**instructor**](/user-guide/skills/optional/mlops/mlops-instructor) | ä½¿ç”¨ Instructorï¼ˆä¹…ç»è€ƒéªŒçš„ç»“æž„åŒ–è¾“å‡ºåº“ï¼‰ä»Ž LLM å“åº”ä¸­æå–å¸¦ Pydantic éªŒè¯çš„ç»“æž„åŒ–æ•°æ®ï¼Œè‡ªåŠ¨é‡è¯•å¤±è´¥çš„æå–ï¼Œä»¥ç±»åž‹å®‰å…¨æ–¹å¼è§£æžå¤æ‚ JSONï¼Œå¹¶æµå¼ä¼ è¾“éƒ¨åˆ†ç»“æžœã€‚ |
| [**lambda-labs-gpu-cloud**](/user-guide/skills/optional/mlops/mlops-lambda-labs) | ç”¨äºŽ ML è®­ç»ƒå’ŒæŽ¨ç†çš„æŒ‰éœ€åŠé¢„ç•™ GPU äº‘å®žä¾‹ã€‚é€‚ç”¨äºŽéœ€è¦é€šè¿‡ç®€å• SSH è®¿é—®ä¸“ç”¨ GPU å®žä¾‹ã€æŒä¹…åŒ–æ–‡ä»¶ç³»ç»Ÿæˆ–ç”¨äºŽå¤§è§„æ¨¡è®­ç»ƒçš„é«˜æ€§èƒ½å¤šèŠ‚ç‚¹é›†ç¾¤çš„åœºæ™¯ã€‚ |
| [**llava**](/user-guide/skills/optional/mlops/mlops-llava) | å¤§åž‹è¯­è¨€ä¸Žè§†è§‰åŠ©æ‰‹ã€‚æ”¯æŒè§†è§‰æŒ‡ä»¤å¾®è°ƒå’ŒåŸºäºŽå›¾åƒçš„å¯¹è¯ã€‚ç»“åˆ CLIP è§†è§‰ç¼–ç å™¨ä¸Ž Vicuna/LLaMA è¯­è¨€æ¨¡åž‹ã€‚æ”¯æŒå¤šè½®å›¾åƒå¯¹è¯ã€è§†è§‰é—®ç­”åŠæŒ‡ä»¤è·Ÿéšã€‚ |
| [**modal-serverless-gpu**](/user-guide/skills/optional/mlops/mlops-modal) | ç”¨äºŽè¿è¡Œ ML å·¥ä½œè´Ÿè½½çš„ serverless GPU äº‘å¹³å°ã€‚é€‚ç”¨äºŽæ— éœ€åŸºç¡€è®¾æ–½ç®¡ç†çš„æŒ‰éœ€ GPU è®¿é—®ã€å°† ML æ¨¡åž‹éƒ¨ç½²ä¸º API æˆ–è¿è¡Œè‡ªåŠ¨æ‰©ç¼©å®¹æ‰¹å¤„ç†ä»»åŠ¡çš„åœºæ™¯ã€‚ |
| [**nemo-curator**](/user-guide/skills/optional/mlops/mlops-nemo-curator) | é¢å‘ LLM è®­ç»ƒçš„ GPU åŠ é€Ÿæ•°æ®æ•´ç†å·¥å…·ã€‚æ”¯æŒæ–‡æœ¬/å›¾åƒ/è§†é¢‘/éŸ³é¢‘ã€‚å…·å¤‡æ¨¡ç³ŠåŽ»é‡ï¼ˆå¿« 16 å€ï¼‰ã€è´¨é‡è¿‡æ»¤ï¼ˆ30+ å¯å‘å¼è§„åˆ™ï¼‰ã€è¯­ä¹‰åŽ»é‡ã€PII è„±æ•ã€NSFW æ£€æµ‹ç­‰åŠŸèƒ½ï¼Œå¯è·¨ GPU æ‰©å±•ã€‚ |
| [**outlines**](/user-guide/skills/optional/mlops/mlops-inference-outlines) | Outlinesï¼šç»“æž„åŒ– JSON/æ­£åˆ™è¡¨è¾¾å¼/Pydantic LLM ç”Ÿæˆã€‚ |
| [**peft-fine-tuning**](/user-guide/skills/optional/mlops/mlops-peft) | ä½¿ç”¨ LoRAã€QLoRA åŠ 25+ ç§æ–¹æ³•å¯¹ LLM è¿›è¡Œå‚æ•°é«˜æ•ˆå¾®è°ƒï¼ˆPEFTï¼‰ã€‚é€‚ç”¨äºŽåœ¨æœ‰é™ GPU æ˜¾å­˜ä¸‹å¾®è°ƒå¤§åž‹æ¨¡åž‹ï¼ˆ7B-70Bï¼‰ã€ä»…è®­ç»ƒä¸åˆ° 1% å‚æ•°ä¸”ç²¾åº¦æŸå¤±æžå°ï¼Œæˆ–è¿›è¡Œå¤šé€‚é…å™¨æœåŠ¡çš„åœºæ™¯ã€‚ |
| [**pinecone**](/user-guide/skills/optional/mlops/mlops-pinecone) | é¢å‘ç”Ÿäº§ AI åº”ç”¨çš„æ‰˜ç®¡å‘é‡æ•°æ®åº“ã€‚å…¨æ‰˜ç®¡ã€è‡ªåŠ¨æ‰©ç¼©å®¹ï¼Œæ”¯æŒæ··åˆæœç´¢ï¼ˆç¨ å¯†+ç¨€ç–ï¼‰ã€å…ƒæ•°æ®è¿‡æ»¤å’Œå‘½åç©ºé—´ã€‚ä½Žå»¶è¿Ÿï¼ˆp95 &lt;100msï¼‰ã€‚é€‚ç”¨äºŽç”Ÿäº§ RAGã€æŽ¨èç³»ç»Ÿç­‰åœºæ™¯ã€‚ |
| [**pytorch-fsdp**](/user-guide/skills/optional/mlops/mlops-pytorch-fsdp) | PyTorch FSDP å…¨åˆ†ç‰‡æ•°æ®å¹¶è¡Œè®­ç»ƒä¸“å®¶æŒ‡å¯¼ â€” å‚æ•°åˆ†ç‰‡ã€æ··åˆç²¾åº¦ã€CPU å¸è½½ã€FSDP2ã€‚ |
| [**pytorch-lightning**](/user-guide/skills/optional/mlops/mlops-pytorch-lightning) | é«˜å±‚ PyTorch æ¡†æž¶ï¼Œæä¾› Trainer ç±»ã€è‡ªåŠ¨åˆ†å¸ƒå¼è®­ç»ƒï¼ˆDDP/FSDP/DeepSpeedï¼‰ã€å›žè°ƒç³»ç»ŸåŠæžå°‘æ ·æ¿ä»£ç ã€‚åŒä¸€å¥—ä»£ç å¯ä»Žç¬”è®°æœ¬æ‰©å±•è‡³è¶…ç®—ã€‚é€‚ç”¨äºŽå¸Œæœ›è®­ç»ƒå¾ªçŽ¯ç®€æ´ã€åŒæ—¶ä¿ç•™å®Œæ•´ PyTorch çµæ´»æ€§çš„åœºæ™¯ã€‚ |
| [**qdrant-vector-search**](/user-guide/skills/optional/mlops/mlops-qdrant) | é«˜æ€§èƒ½å‘é‡ç›¸ä¼¼æ€§æœç´¢å¼•æ“Žï¼Œé€‚ç”¨äºŽ RAG å’Œè¯­ä¹‰æœç´¢ã€‚é€‚ç”¨äºŽæž„å»ºéœ€è¦å¿«é€Ÿè¿‘é‚»æœç´¢ã€å¸¦è¿‡æ»¤çš„æ··åˆæœç´¢æˆ–åŸºäºŽ Rust é«˜æ€§èƒ½çš„å¯æ‰©å±•å‘é‡å­˜å‚¨çš„ç”Ÿäº§ RAG ç³»ç»Ÿã€‚ |
| [**sparse-autoencoder-training**](/user-guide/skills/optional/mlops/mlops-saelens) | æä¾›ä½¿ç”¨ SAELens è®­ç»ƒå’Œåˆ†æžç¨€ç–è‡ªç¼–ç å™¨ï¼ˆSAEï¼‰çš„æŒ‡å¯¼ï¼Œå°†ç¥žç»ç½‘ç»œæ¿€æ´»åˆ†è§£ä¸ºå¯è§£é‡Šç‰¹å¾ã€‚é€‚ç”¨äºŽå‘çŽ°å¯è§£é‡Šç‰¹å¾ã€åˆ†æžå åŠ çŽ°è±¡æˆ–ç ”ç©¶ç¥žç»ç½‘ç»œå†…éƒ¨ç»“æž„çš„åœºæ™¯ã€‚ |
| [**simpo-training**](/user-guide/skills/optional/mlops/mlops-simpo) | ç”¨äºŽ LLM å¯¹é½çš„ç®€å•åå¥½ä¼˜åŒ–ï¼ˆSimPOï¼‰ã€‚æ— éœ€å‚è€ƒæ¨¡åž‹çš„ DPO æ›¿ä»£æ–¹æ¡ˆï¼Œæ€§èƒ½æ›´ä¼˜ï¼ˆåœ¨ AlpacaEval 2.0 ä¸Šæå‡ +6.4 åˆ†ï¼‰ã€‚æ¯” DPO æ›´é«˜æ•ˆã€‚é€‚ç”¨äºŽå¸Œæœ›ç®€åŒ–åå¥½å¯¹é½æµç¨‹çš„åœºæ™¯ã€‚ |
| [**slime-rl-training**](/user-guide/skills/optional/mlops/mlops-slime) | æä¾›ä½¿ç”¨ slimeï¼ˆMegatron+SGLang æ¡†æž¶ï¼‰è¿›è¡Œ LLM RL åŽè®­ç»ƒçš„æŒ‡å¯¼ã€‚é€‚ç”¨äºŽè®­ç»ƒ GLM æ¨¡åž‹ã€å®žçŽ°è‡ªå®šä¹‰æ•°æ®ç”Ÿæˆå·¥ä½œæµæˆ–éœ€è¦ç´§å¯† Megatron-LM é›†æˆä»¥è¿›è¡Œ RL æ‰©å±•çš„åœºæ™¯ã€‚ |
| [**stable-diffusion-image-generation**](/user-guide/skills/optional/mlops/mlops-stable-diffusion) | é€šè¿‡ HuggingFace Diffusers ä½¿ç”¨ Stable Diffusion æ¨¡åž‹è¿›è¡Œæœ€å…ˆè¿›çš„æ–‡æœ¬åˆ°å›¾åƒç”Ÿæˆã€‚é€‚ç”¨äºŽä»Žæ–‡æœ¬ prompt ç”Ÿæˆå›¾åƒã€å›¾åƒåˆ°å›¾åƒè½¬æ¢ã€å›¾åƒä¿®å¤æˆ–æž„å»ºè‡ªå®šä¹‰æ‰©æ•£æµæ°´çº¿çš„åœºæ™¯ã€‚ |
| [**tensorrt-llm**](/user-guide/skills/optional/mlops/mlops-tensorrt-llm) | ä½¿ç”¨ NVIDIA TensorRT ä¼˜åŒ– LLM æŽ¨ç†ï¼Œå®žçŽ°æœ€å¤§åžåé‡å’Œæœ€ä½Žå»¶è¿Ÿã€‚é€‚ç”¨äºŽåœ¨ NVIDIA GPUï¼ˆA100/H100ï¼‰ä¸Šè¿›è¡Œç”Ÿäº§éƒ¨ç½²ã€éœ€è¦æ¯” PyTorch å¿« 10-100 å€çš„æŽ¨ç†ï¼Œæˆ–ä½¿ç”¨é‡åŒ–æœåŠ¡æ¨¡åž‹çš„åœºæ™¯ã€‚ |
| [**distributed-llm-pretraining-torchtitan**](/user-guide/skills/optional/mlops/mlops-torchtitan) | ä½¿ç”¨ torchtitan è¿›è¡Œ PyTorch åŽŸç”Ÿåˆ†å¸ƒå¼ LLM é¢„è®­ç»ƒï¼Œæ”¯æŒ 4D å¹¶è¡Œï¼ˆFSDP2ã€TPã€PPã€CPï¼‰ã€‚é€‚ç”¨äºŽåœ¨ 8 åˆ° 512+ GPU ä¸Šé¢„è®­ç»ƒ Llama 3.1ã€DeepSeek V3 æˆ–è‡ªå®šä¹‰æ¨¡åž‹ï¼Œå¹¶ä½¿ç”¨ Float8ã€torch.compile åŠåˆ†å¸ƒå¼æ£€æŸ¥ç‚¹çš„åœºæ™¯ã€‚ |
| [**fine-tuning-with-trl**](/user-guide/skills/optional/mlops/mlops-training-trl-fine-tuning) | TRLï¼šç”¨äºŽ LLM RLHF çš„ SFTã€DPOã€PPOã€GRPO åŠå¥–åŠ±å»ºæ¨¡ã€‚ |
| [**unsloth**](/user-guide/skills/optional/mlops/mlops-training-unsloth) | Unslothï¼š2-5 å€æ›´å¿«çš„ LoRA/QLoRA å¾®è°ƒï¼Œæ›´ä½Ž VRAM å ç”¨ã€‚ |
| [**whisper**](/user-guide/skills/optional/mlops/mlops-whisper) | OpenAI çš„é€šç”¨è¯­éŸ³è¯†åˆ«æ¨¡åž‹ã€‚æ”¯æŒ 99 ç§è¯­è¨€ã€è½¬å½•ã€ç¿»è¯‘ä¸ºè‹±è¯­åŠè¯­è¨€è¯†åˆ«ã€‚å…­ç§æ¨¡åž‹è§„æ ¼ï¼Œä»Ž tinyï¼ˆ39M å‚æ•°ï¼‰åˆ° largeï¼ˆ1550M å‚æ•°ï¼‰ã€‚é€‚ç”¨äºŽè¯­éŸ³è½¬æ–‡å­—ã€æ’­å®¢è½¬å½•ç­‰åœºæ™¯ã€‚ |

## productivity

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**canvas**](/user-guide/skills/optional/productivity/productivity-canvas) | Canvas LMS é›†æˆ â€” ä½¿ç”¨ API token è®¤è¯èŽ·å–å·²æ³¨å†Œè¯¾ç¨‹å’Œä½œä¸šã€‚ |
| [**here.now**](/user-guide/skills/optional/productivity/productivity-here-now) | å°†é™æ€ç«™ç‚¹å‘å¸ƒè‡³ &#123;slug&#125;.here.nowï¼Œå¹¶å°†ç§æœ‰æ–‡ä»¶å­˜å‚¨åœ¨äº‘ç«¯ Drive ä¸­ä»¥ä¾› agent é—´äº¤æŽ¥ã€‚ |
| [**memento-flashcards**](/user-guide/skills/optional/productivity/productivity-memento-flashcards) | é—´éš”é‡å¤é—ªå¡ç³»ç»Ÿã€‚ä»Žäº‹å®žæˆ–æ–‡æœ¬åˆ›å»ºå¡ç‰‡ï¼Œé€šè¿‡ agent è¯„åˆ†çš„è‡ªç”±æ–‡æœ¬å›žç­”ä¸Žé—ªå¡å¯¹è¯ï¼Œä»Ž YouTube å­—å¹•ç”Ÿæˆæµ‹éªŒï¼Œä½¿ç”¨è‡ªé€‚åº”è°ƒåº¦å¤ä¹ åˆ°æœŸå¡ç‰‡ï¼Œå¹¶æ”¯æŒå¯¼å‡º/å¯¼å…¥ã€‚ |
| [**shop-app**](/user-guide/skills/optional/productivity/productivity-shop-app) | Shop.appï¼šå•†å“æœç´¢ã€è®¢å•è¿½è¸ªã€é€€è´§ã€é‡æ–°ä¸‹å•ã€‚ |
| [**shopify**](/user-guide/skills/optional/productivity/productivity-shopify) | é€šè¿‡ curl ä½¿ç”¨ Shopify Admin å’Œ Storefront GraphQL APIã€‚æ”¯æŒå•†å“ã€è®¢å•ã€å®¢æˆ·ã€åº“å­˜ã€å…ƒå­—æ®µã€‚ |
| [**siyuan**](/user-guide/skills/optional/productivity/productivity-siyuan) | é€šè¿‡ curl ä½¿ç”¨ SiYuan Note APIï¼Œåœ¨è‡ªæ‰˜ç®¡çŸ¥è¯†åº“ä¸­æœç´¢ã€è¯»å–ã€åˆ›å»ºå’Œç®¡ç†å—ä¸Žæ–‡æ¡£ã€‚ |
| [**telephony**](/user-guide/skills/optional/productivity/productivity-telephony) | ä¸º Zed æ·»åŠ ç”µè¯èƒ½åŠ›ï¼Œæ— éœ€ä¿®æ”¹æ ¸å¿ƒå·¥å…·ã€‚é…ç½®å¹¶æŒä¹…åŒ– Twilio å·ç ï¼Œå‘é€å’ŒæŽ¥æ”¶ SMS/MMSï¼Œæ‹¨æ‰“ç›´æŽ¥é€šè¯ï¼Œå¹¶é€šè¿‡ Bland.ai æˆ– Vapi å‘èµ· AI é©±åŠ¨çš„å¤–å‘¼ã€‚ |

## research

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**bioinformatics**](/user-guide/skills/optional/research/research-bioinformatics) | é€šå¾€ bioSkills å’Œ ClawBio 400+ ç”Ÿç‰©ä¿¡æ¯å­¦æŠ€èƒ½çš„å…¥å£ã€‚æ¶µç›–åŸºå› ç»„å­¦ã€è½¬å½•ç»„å­¦ã€å•ç»†èƒžã€å˜å¼‚æ£€æµ‹ã€è¯ç‰©åŸºå› ç»„å­¦ã€å®åŸºå› ç»„å­¦ã€ç»“æž„ç”Ÿç‰©å­¦ç­‰é¢†åŸŸï¼ŒæŒ‰éœ€èŽ·å–ç‰¹å®šé¢†åŸŸå‚è€ƒèµ„æ–™ã€‚ |
| [**darwinian-evolver**](/user-guide/skills/optional/research/research-darwinian-evolver) | ä½¿ç”¨ Imbue çš„è¿›åŒ–å¾ªçŽ¯æ¼”åŒ– prompt/æ­£åˆ™è¡¨è¾¾å¼/SQL/ä»£ç ã€‚ |
| [**domain-intel**](/user-guide/skills/optional/research/research-domain-intel) | ä½¿ç”¨ Python æ ‡å‡†åº“è¿›è¡Œè¢«åŠ¨åŸŸåä¾¦å¯Ÿã€‚å­åŸŸåå‘çŽ°ã€SSL è¯ä¹¦æ£€æŸ¥ã€WHOIS æŸ¥è¯¢ã€DNS è®°å½•ã€åŸŸåå¯ç”¨æ€§æ£€æµ‹åŠæ‰¹é‡å¤šåŸŸååˆ†æžã€‚æ— éœ€ API å¯†é’¥ã€‚ |
| [**drug-discovery**](/user-guide/skills/optional/research/research-drug-discovery) | è¯ç‰©å‘çŽ°å·¥ä½œæµçš„åˆ¶è¯ç ”ç©¶åŠ©æ‰‹ã€‚åœ¨ ChEMBL ä¸Šæœç´¢ç”Ÿç‰©æ´»æ€§åŒ–åˆç‰©ï¼Œè®¡ç®—ç±»è¯æ€§ï¼ˆLipinski Ro5ã€QEDã€TPSAã€åˆæˆå¯åŠæ€§ï¼‰ï¼Œé€šè¿‡ OpenFDA æŸ¥è¯¢è¯ç‰©ç›¸äº’ä½œç”¨ï¼Œè§£è¯» ADMET å±žæ€§ã€‚ |
| [**duckduckgo-search**](/user-guide/skills/optional/research/research-duckduckgo-search) | é€šè¿‡ DuckDuckGo å…è´¹ç½‘ç»œæœç´¢ â€” æ–‡æœ¬ã€æ–°é—»ã€å›¾ç‰‡ã€è§†é¢‘ã€‚æ— éœ€ API å¯†é’¥ã€‚ä¼˜å…ˆä½¿ç”¨å·²å®‰è£…çš„ `ddgs` CLIï¼›ä»…åœ¨ç¡®è®¤å½“å‰è¿è¡Œæ—¶ä¸­ `ddgs` å¯ç”¨åŽæ‰ä½¿ç”¨ Python DDGS åº“ã€‚ |
| [**gitnexus-explorer**](/user-guide/skills/optional/research/research-gitnexus-explorer) | ä½¿ç”¨ GitNexus ä¸ºä»£ç åº“å»ºç«‹ç´¢å¼•ï¼Œå¹¶é€šè¿‡ Web UI + Cloudflare éš§é“æä¾›äº¤äº’å¼çŸ¥è¯†å›¾è°±ã€‚ |
| [**osint-investigation**](/user-guide/skills/optional/research/research-osint-investigation) | å…¬å¼€è®°å½• OSINT è°ƒæŸ¥æ¡†æž¶ â€” SEC EDGAR æ–‡ä»¶ã€USAspending åˆåŒã€å‚è®®é™¢æ¸¸è¯´è®°å½•ã€OFAC åˆ¶è£ã€ICIJ ç¦»å²¸æ³„éœ²ã€çº½çº¦å¸‚æˆ¿äº§è®°å½•ï¼ˆACRISï¼‰ã€OpenCorporates æ³¨å†Œä¿¡æ¯ã€CourtListener æ³•é™¢è®°å½•ã€Wayback Machine ç­‰ã€‚ |
| [**parallel-cli**](/user-guide/skills/optional/research/research-parallel-cli) | Parallel CLI çš„å¯é€‰åŽ‚å•†æŠ€èƒ½ â€” agent åŽŸç”Ÿç½‘ç»œæœç´¢ã€æå–ã€æ·±åº¦ç ”ç©¶ã€æ•°æ®å¢žå¼ºã€FindAll åŠç›‘æŽ§ã€‚ä¼˜å…ˆä½¿ç”¨ JSON è¾“å‡ºå’Œéžäº¤äº’å¼æµç¨‹ã€‚ |
| [**qmd**](/user-guide/skills/optional/research/research-qmd) | ä½¿ç”¨ qmdï¼ˆä¸€æ¬¾ç»“åˆ BM25ã€å‘é‡æœç´¢å’Œ LLM é‡æŽ’åºçš„æ··åˆæ£€ç´¢å¼•æ“Žï¼‰åœ¨æœ¬åœ°æœç´¢ä¸ªäººçŸ¥è¯†åº“ã€ç¬”è®°ã€æ–‡æ¡£å’Œä¼šè®®è®°å½•ã€‚æ”¯æŒ CLI å’Œ MCP é›†æˆã€‚ |
| [**scrapling**](/user-guide/skills/optional/research/research-scrapling) | ä½¿ç”¨ Scrapling è¿›è¡Œç½‘é¡µæŠ“å– â€” é€šè¿‡ CLI å’Œ Python å®žçŽ° HTTP èŽ·å–ã€éšèº«æµè§ˆå™¨è‡ªåŠ¨åŒ–ã€Cloudflare ç»•è¿‡åŠçˆ¬è™«æŠ“å–ã€‚ |
| [**searxng-search**](/user-guide/skills/optional/research/research-searxng-search) | é€šè¿‡ SearXNG å…è´¹å…ƒæœç´¢ â€” èšåˆ 70+ æœç´¢å¼•æ“Žçš„ç»“æžœã€‚å¯è‡ªæ‰˜ç®¡æˆ–ä½¿ç”¨å…¬å…±å®žä¾‹ã€‚æ— éœ€ API å¯†é’¥ã€‚å½“ç½‘ç»œæœç´¢å·¥å…·é›†ä¸å¯ç”¨æ—¶è‡ªåŠ¨å›žé€€ã€‚ |

## security

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**1password**](/user-guide/skills/optional/security/security-1password) | é…ç½®å¹¶ä½¿ç”¨ 1Password CLIï¼ˆopï¼‰ã€‚é€‚ç”¨äºŽå®‰è£… CLIã€å¯ç”¨æ¡Œé¢åº”ç”¨é›†æˆã€ç™»å½•åŠä¸ºå‘½ä»¤è¯»å–/æ³¨å…¥å¯†é’¥çš„åœºæ™¯ã€‚ |
| [**oss-forensics**](/user-guide/skills/optional/security/security-oss-forensics) | é’ˆå¯¹ GitHub ä»“åº“çš„ä¾›åº”é“¾è°ƒæŸ¥ã€è¯æ®æ¢å¤å’Œå–è¯åˆ†æžã€‚æ¶µç›–å·²åˆ é™¤æäº¤æ¢å¤ã€å¼ºåˆ¶æŽ¨é€æ£€æµ‹ã€IOC æå–ã€å¤šæºè¯æ®æ”¶é›†ã€å‡è®¾å½¢æˆ/éªŒè¯ç­‰ã€‚ |
| [**sherlock**](/user-guide/skills/optional/security/security-sherlock) | è·¨ 400+ ç¤¾äº¤ç½‘ç»œçš„ OSINT ç”¨æˆ·åæœç´¢ã€‚é€šè¿‡ç”¨æˆ·åè¿½è¸ªç¤¾äº¤åª’ä½“è´¦å·ã€‚ |

## software-development

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**rest-graphql-debug**](/user-guide/skills/optional/software-development/software-development-rest-graphql-debug) | è°ƒè¯• REST/GraphQL APIï¼šçŠ¶æ€ç ã€è®¤è¯ã€schemaã€é—®é¢˜å¤çŽ°ã€‚ |

## web-development

| æŠ€èƒ½ | æè¿° |
|-------|-------------|
| [**page-agent**](/user-guide/skills/optional/web-development/web-development-page-agent) | å°† alibaba/page-agent åµŒå…¥æ‚¨è‡ªå·±çš„ Web åº”ç”¨ â€” ä¸€ä¸ªçº¯ JavaScript é¡µå†… GUI agentï¼Œä»¥å•ä¸ª `<script>` æ ‡ç­¾æˆ– npm åŒ…å½¢å¼æä¾›ï¼Œè®©æ‚¨ç½‘ç«™çš„ç»ˆç«¯ç”¨æˆ·å¯ä»¥ç”¨è‡ªç„¶è¯­è¨€é©±åŠ¨ UIï¼ˆå¦‚"ç‚¹å‡»ç™»å½•ï¼Œå¡«å†™ç”¨æˆ·å..."ï¼‰ã€‚ |

---

## è´¡çŒ®å¯é€‰æŠ€èƒ½

å‘ä»“åº“æ·»åŠ æ–°çš„å¯é€‰æŠ€èƒ½ï¼š

1. åœ¨ `optional-skills/<category>/<skill-name>/` ä¸‹åˆ›å»ºç›®å½•
2. æ·»åŠ åŒ…å«æ ‡å‡† frontmatter çš„ `SKILL.md`ï¼ˆnameã€descriptionã€versionã€authorï¼‰
3. åœ¨ `references/`ã€`templates/` æˆ– `scripts/` å­ç›®å½•ä¸­åŒ…å«æ‰€æœ‰æ”¯æ’‘æ–‡ä»¶
4. æäº¤ pull request â€” åˆå¹¶åŽè¯¥æŠ€èƒ½å°†å‡ºçŽ°åœ¨æœ¬ç›®å½•å¹¶èŽ·å¾—ä¸“å±žæ–‡æ¡£é¡µé¢