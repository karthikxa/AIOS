---
sidebar_position: 5
title: "å†…ç½®æŠ€èƒ½ç›®å½•"
description: "éš Zed Agent é™„å¸¦çš„å†…ç½®æŠ€èƒ½ç›®å½•"
---

# å†…ç½®æŠ€èƒ½ç›®å½•

Zed é™„å¸¦ä¸€ä¸ªå¤§åž‹å†…ç½®æŠ€èƒ½åº“ï¼Œå®‰è£…æ—¶ä¼šå¤åˆ¶åˆ° `~/.zed/skills/`ã€‚ä¸‹æ–¹æ¯ä¸ªæŠ€èƒ½å‡é“¾æŽ¥è‡³ä¸“å±žé¡µé¢ï¼ŒåŒ…å«å®Œæ•´å®šä¹‰ã€é…ç½®å’Œç”¨æ³•è¯´æ˜Žã€‚

Zed åœ¨æ‰§è¡Œ `zed update` æ—¶ä¹Ÿä¼šåŒæ­¥å†…ç½®æŠ€èƒ½ï¼Œä½†åŒæ­¥æ¸…å•ä¼šå°Šé‡æœ¬åœ°åˆ é™¤å’Œç”¨æˆ·ç¼–è¾‘ã€‚å¦‚æžœæ­¤å¤„åˆ—å‡ºçš„æŸä¸ªæŠ€èƒ½åœ¨ä½ çš„ `~/.zed/skills/` ç›®å½•æ ‘ä¸­ç¼ºå¤±ï¼Œå®ƒä»éš Zed ä¸€åŒå‘å¸ƒï¼›å¯é€šè¿‡ `zed skills reset <name> --restore` æ¢å¤ã€‚

å¦‚æžœæŸä¸ªæŠ€èƒ½æœªå‡ºçŽ°åœ¨æ­¤åˆ—è¡¨ä¸­ä½†å­˜åœ¨äºŽä»“åº“ä¸­ï¼Œç›®å½•ç”± `website/scripts/generate-skill-docs.py` é‡æ–°ç”Ÿæˆã€‚

## apple

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`apple-notes`](/user-guide/skills/bundled/apple/apple-apple-notes) | é€šè¿‡ memo CLI ç®¡ç† Apple Notesï¼šåˆ›å»ºã€æœç´¢ã€ç¼–è¾‘ã€‚ | `apple/apple-notes` |
| [`apple-reminders`](/user-guide/skills/bundled/apple/apple-apple-reminders) | é€šè¿‡ remindctl æ“ä½œ Apple Remindersï¼šæ·»åŠ ã€åˆ—å‡ºã€å®Œæˆã€‚ | `apple/apple-reminders` |
| [`findmy`](/user-guide/skills/bundled/apple/apple-findmy) | åœ¨ macOS ä¸Šé€šè¿‡ FindMy.app è¿½è¸ª Apple è®¾å¤‡/AirTagã€‚ | `apple/findmy` |
| [`imessage`](/user-guide/skills/bundled/apple/apple-imessage) | åœ¨ macOS ä¸Šé€šè¿‡ imsg CLI å‘é€å’ŒæŽ¥æ”¶ iMessage/SMSã€‚ | `apple/imessage` |
| [`macos-computer-use`](/user-guide/skills/bundled/apple/apple-macos-computer-use) | åœ¨åŽå°é©±åŠ¨ macOS æ¡Œé¢â€”â€”æˆªå›¾ã€é¼ æ ‡ã€é”®ç›˜ã€æ»šåŠ¨ã€æ‹–æ‹½â€”â€”ä¸æŠ¢å ç”¨æˆ·çš„å…‰æ ‡ã€é”®ç›˜ç„¦ç‚¹æˆ– Spaceã€‚é€‚ç”¨äºŽä»»ä½•æ”¯æŒå·¥å…·è°ƒç”¨çš„æ¨¡åž‹ã€‚æ¯å½“éœ€è¦ `computer_use` å·¥å…·æ—¶åŠ è½½æ­¤æŠ€èƒ½ã€‚ | `apple/macos-computer-use` |

## autonomous-ai-agents

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`claude-code`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-claude-code) | å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ Claude Code CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PRï¼‰ã€‚ | `autonomous-ai-agents/claude-code` |
| [`codex`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-codex) | å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenAI Codex CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PRï¼‰ã€‚ | `autonomous-ai-agents/codex` |
| [`zed-agent`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-zed-agent) | é…ç½®ã€æ‰©å±•æˆ–è´¡çŒ® Zed Agentã€‚ | `autonomous-ai-agents/zed-agent` |
| [`opencode`](/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-opencode) | å°†ç¼–ç ä»»åŠ¡å§”æ‰˜ç»™ OpenCode CLIï¼ˆåŠŸèƒ½å¼€å‘ã€PR å®¡æŸ¥ï¼‰ã€‚ | `autonomous-ai-agents/opencode` |

## creative

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`architecture-diagram`](/user-guide/skills/bundled/creative/creative-architecture-diagram) | ä»¥ HTML å½¢å¼ç”Ÿæˆæ·±è‰²ä¸»é¢˜çš„ SVG æž¶æž„/äº‘/åŸºç¡€è®¾æ–½å›¾ã€‚ | `creative/architecture-diagram` |
| [`ascii-art`](/user-guide/skills/bundled/creative/creative-ascii-art) | ASCII è‰ºæœ¯ï¼špyfigletã€cowsayã€boxesã€å›¾åƒè½¬ ASCIIã€‚ | `creative/ascii-art` |
| [`ascii-video`](/user-guide/skills/bundled/creative/creative-ascii-video) | ASCII è§†é¢‘ï¼šå°†è§†é¢‘/éŸ³é¢‘è½¬æ¢ä¸ºå½©è‰² ASCII MP4/GIFã€‚ | `creative/ascii-video` |
| [`baoyu-infographic`](/user-guide/skills/bundled/creative/creative-baoyu-infographic) | ä¿¡æ¯å›¾ï¼ˆå¯è§†åŒ–ï¼‰ï¼š21 ç§å¸ƒå±€ Ã— 21 ç§é£Žæ ¼ã€‚ | `creative/baoyu-infographic` |
| [`claude-design`](/user-guide/skills/bundled/creative/creative-claude-design) | è®¾è®¡ä¸€æ¬¡æ€§ HTML åˆ¶å“ï¼ˆè½åœ°é¡µã€å¹»ç¯ç‰‡ã€åŽŸåž‹ï¼‰ã€‚ | `creative/claude-design` |
| [`comfyui`](/user-guide/skills/bundled/creative/creative-comfyui) | ä½¿ç”¨ ComfyUI ç”Ÿæˆå›¾åƒã€è§†é¢‘å’ŒéŸ³é¢‘â€”â€”å®‰è£…ã€å¯åŠ¨ã€ç®¡ç†èŠ‚ç‚¹/æ¨¡åž‹ã€è¿è¡Œå¸¦å‚æ•°æ³¨å…¥çš„å·¥ä½œæµã€‚ä½¿ç”¨å®˜æ–¹ comfy-cli ç®¡ç†ç”Ÿå‘½å‘¨æœŸï¼Œé€šè¿‡ REST/WebSocket API ç›´æŽ¥æ‰§è¡Œã€‚ | `creative/comfyui` |
| [`design-md`](/user-guide/skills/bundled/creative/creative-design-md) | ç¼–å†™/éªŒè¯/å¯¼å‡º Google çš„ DESIGN.md token è§„èŒƒæ–‡ä»¶ã€‚ | `creative/design-md` |
| [`excalidraw`](/user-guide/skills/bundled/creative/creative-excalidraw) | æ‰‹ç»˜é£Žæ ¼çš„ Excalidraw JSON å›¾è¡¨ï¼ˆæž¶æž„ã€æµç¨‹ã€æ—¶åºï¼‰ã€‚ | `creative/excalidraw` |
| [`humanizer`](/user-guide/skills/bundled/creative/creative-humanizer) | äººæ€§åŒ–æ–‡æœ¬ï¼šåŽ»é™¤ AI è…”ï¼ŒåŠ å…¥çœŸå®žè¯­æ°”ã€‚ | `creative/humanizer` |
| [`manim-video`](/user-guide/skills/bundled/creative/creative-manim-video) | Manim CE åŠ¨ç”»ï¼š3Blue1Brown é£Žæ ¼æ•°å­¦/ç®—æ³•è§†é¢‘ã€‚ | `creative/manim-video` |
| [`p5js`](/user-guide/skills/bundled/creative/creative-p5js) | p5.js è‰å›¾ï¼šç”Ÿæˆè‰ºæœ¯ã€ç€è‰²å™¨ã€äº¤äº’ã€3Dã€‚ | `creative/p5js` |
| [`popular-web-designs`](/user-guide/skills/bundled/creative/creative-popular-web-designs) | 54 ç§çœŸå®žè®¾è®¡ç³»ç»Ÿï¼ˆStripeã€Linearã€Vercelï¼‰çš„ HTML/CSS å®žçŽ°ã€‚ | `creative/popular-web-designs` |
| [`pretext`](/user-guide/skills/bundled/creative/creative-pretext) | ä½¿ç”¨ @chenglou/pretext æž„å»ºåˆ›æ„æµè§ˆå™¨ demoâ€”â€”æ—  DOM çš„æ–‡æœ¬å¸ƒå±€ï¼Œæ”¯æŒ ASCII è‰ºæœ¯ã€ç»•éšœç¢ç‰©çš„æŽ’ç‰ˆæµã€æ–‡å­—å³å‡ ä½•æ¸¸æˆã€åŠ¨æ€æŽ’ç‰ˆå’Œæ–‡å­—é©±åŠ¨çš„ç”Ÿæˆè‰ºæœ¯ã€‚ç”Ÿæˆå•æ–‡ä»¶ HTMLã€‚ | `creative/pretext` |
| [`sketch`](/user-guide/skills/bundled/creative/creative-sketch) | ä¸€æ¬¡æ€§ HTML åŽŸåž‹ï¼šç”Ÿæˆ 2-3 ä¸ªè®¾è®¡å˜ä½“ä¾›å¯¹æ¯”ã€‚ | `creative/sketch` |
| [`songwriting-and-ai-music`](/user-guide/skills/bundled/creative/creative-songwriting-and-ai-music) | æ­Œæ›²åˆ›ä½œæŠ€å·§ä¸Ž Suno AI éŸ³ä¹ promptï¼ˆæç¤ºè¯ï¼‰ã€‚ | `creative/songwriting-and-ai-music` |
| [`touchdesigner-mcp`](/user-guide/skills/bundled/creative/creative-touchdesigner-mcp) | é€šè¿‡ twozero MCP æŽ§åˆ¶è¿è¡Œä¸­çš„ TouchDesigner å®žä¾‹â€”â€”åˆ›å»ºç®—å­ã€è®¾ç½®å‚æ•°ã€è¿žæŽ¥èŠ‚ç‚¹ã€æ‰§è¡Œ Pythonã€æž„å»ºå®žæ—¶è§†è§‰æ•ˆæžœã€‚36 ä¸ªåŽŸç”Ÿå·¥å…·ã€‚ | `creative/touchdesigner-mcp` |

## data-science

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`jupyter-live-kernel`](/user-guide/skills/bundled/data-science/data-science-jupyter-live-kernel) | é€šè¿‡å®žæ—¶ Jupyter kernelï¼ˆhamelnbï¼‰è¿›è¡Œè¿­ä»£å¼ Python å¼€å‘ã€‚ | `data-science/jupyter-live-kernel` |

## devops

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`kanban-orchestrator`](/user-guide/skills/bundled/devops/devops-kanban-orchestrator) | é¢å‘ç¼–æŽ’å™¨ï¼ˆorchestratorï¼‰é…ç½®æ–‡ä»¶çš„åˆ†è§£ç­–ç•¥ä¸Žåè¯±æƒ‘è§„åˆ™ï¼Œç”¨äºŽé€šè¿‡ Kanban è·¯ç”±å·¥ä½œã€‚"ä¸è¦è‡ªå·±åšå·¥ä½œ"è§„åˆ™å’ŒåŸºæœ¬ç”Ÿå‘½å‘¨æœŸä¼šè‡ªåŠ¨æ³¨å…¥æ¯ä¸ª Kanban worker çš„ç³»ç»Ÿ promptï¼›å¦‚éœ€æ›´æ·±å…¥çš„ç»†èŠ‚ï¼Œè¯·åŠ è½½æ­¤æŠ€èƒ½ã€‚ | `devops/kanban-orchestrator` |
| [`kanban-worker`](/user-guide/skills/bundled/devops/devops-kanban-worker) | Zed Kanban worker çš„é™·é˜±ã€ç¤ºä¾‹å’Œè¾¹ç•Œæƒ…å†µã€‚ç”Ÿå‘½å‘¨æœŸæœ¬èº«ä¼šä½œä¸º `KANBAN_GUIDANCE` è‡ªåŠ¨æ³¨å…¥æ¯ä¸ª worker çš„ç³»ç»Ÿ promptï¼ˆæ¥è‡ª `agent/prompt_builder.py`ï¼‰ï¼›å½“éœ€è¦æ›´æ·±å…¥ç»†èŠ‚æ—¶åŠ è½½æ­¤æŠ€èƒ½ã€‚ | `devops/kanban-worker` |

## dogfood

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`dogfood`](/user-guide/skills/bundled/dogfood/dogfood-dogfood) | Web åº”ç”¨æŽ¢ç´¢æ€§ QAï¼šå‘çŽ° bugã€æ”¶é›†è¯æ®ã€ç”ŸæˆæŠ¥å‘Šã€‚ | `dogfood` |

## email

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`himalaya`](/user-guide/skills/bundled/email/email-himalaya) | Himalaya CLIï¼šåœ¨ç»ˆç«¯ä¸­æ”¶å‘ IMAP/SMTP é‚®ä»¶ã€‚ | `email/himalaya` |

## gaming

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|

## github

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`codebase-inspection`](/user-guide/skills/bundled/github/github-codebase-inspection) | ä½¿ç”¨ pygount æ£€æŸ¥ä»£ç åº“ï¼šä»£ç è¡Œæ•°ã€è¯­è¨€ã€å æ¯”ã€‚ | `github/codebase-inspection` |
| [`github-auth`](/user-guide/skills/bundled/github/github-github-auth) | GitHub è®¤è¯é…ç½®ï¼šHTTPS tokenã€SSH å¯†é’¥ã€gh CLI ç™»å½•ã€‚ | `github/github-auth` |
| [`github-code-review`](/user-guide/skills/bundled/github/github-github-code-review) | å®¡æŸ¥ PRï¼šé€šè¿‡ gh æˆ– REST API æŸ¥çœ‹ diffã€æ·»åŠ è¡Œå†…è¯„è®ºã€‚ | `github/github-code-review` |
| [`github-issues`](/user-guide/skills/bundled/github/github-github-issues) | é€šè¿‡ gh æˆ– REST API åˆ›å»ºã€åˆ†ç±»ã€æ ‡è®°ã€åˆ†é… GitHub issueã€‚ | `github/github-issues` |
| [`github-pr-workflow`](/user-guide/skills/bundled/github/github-github-pr-workflow) | GitHub PR ç”Ÿå‘½å‘¨æœŸï¼šåˆ†æ”¯ã€æäº¤ã€å¼€å¯ã€CIã€åˆå¹¶ã€‚ | `github/github-pr-workflow` |
| [`github-repo-management`](/user-guide/skills/bundled/github/github-github-repo-management) | å…‹éš†/åˆ›å»º/fork ä»“åº“ï¼›ç®¡ç†è¿œç¨‹ã€å‘å¸ƒç‰ˆæœ¬ã€‚ | `github/github-repo-management` |

## mcp

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|

## media

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`gif-search`](/user-guide/skills/bundled/media/media-gif-search) | é€šè¿‡ curl + jq ä»Ž Tenor æœç´¢/ä¸‹è½½ GIFã€‚ | `media/gif-search` |
| [`heartmula`](/user-guide/skills/bundled/media/media-heartmula) | HeartMuLaï¼šæ ¹æ®æ­Œè¯ + æ ‡ç­¾ç”Ÿæˆç±» Suno é£Žæ ¼çš„æ­Œæ›²ã€‚ | `media/heartmula` |
| [`songsee`](/user-guide/skills/bundled/media/media-songsee) | é€šè¿‡ CLI ç”ŸæˆéŸ³é¢‘é¢‘è°±å›¾/ç‰¹å¾ï¼ˆmelã€chromaã€MFCCï¼‰ã€‚ | `media/songsee` |
| [`youtube-content`](/user-guide/skills/bundled/media/media-youtube-content) | å°† YouTube å­—å¹•è½¬æ¢ä¸ºæ‘˜è¦ã€æŽ¨æ–‡ä¸²ã€åšå®¢æ–‡ç« ã€‚ | `media/youtube-content` |

## mlops

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`audiocraft-audio-generation`](/user-guide/skills/bundled/mlops/mlops-models-audiocraft) | AudioCraftï¼šMusicGen æ–‡æœ¬è½¬éŸ³ä¹ã€AudioGen æ–‡æœ¬è½¬éŸ³æ•ˆã€‚ | `mlops/models/audiocraft` |
| [`huggingface-hub`](/user-guide/skills/bundled/mlops/mlops-huggingface-hub) | HuggingFace hf CLIï¼šæœç´¢/ä¸‹è½½/ä¸Šä¼ æ¨¡åž‹ã€æ•°æ®é›†ã€‚ | `mlops/huggingface-hub` |
| [`llama-cpp`](/user-guide/skills/bundled/mlops/mlops-inference-llama-cpp) | llama.cpp æœ¬åœ° GGUF æŽ¨ç† + HF Hub æ¨¡åž‹å‘çŽ°ã€‚ | `mlops/inference/llama-cpp` |
| [`evaluating-llms-harness`](/user-guide/skills/bundled/mlops/mlops-evaluation-lm-evaluation-harness) | lm-eval-harnessï¼šå¯¹ LLM è¿›è¡ŒåŸºå‡†æµ‹è¯•ï¼ˆMMLUã€GSM8K ç­‰ï¼‰ã€‚ | `mlops/evaluation/lm-evaluation-harness` |
| [`segment-anything-model`](/user-guide/skills/bundled/mlops/mlops-models-segment-anything) | SAMï¼šé€šè¿‡ç‚¹ã€æ¡†ã€æŽ©ç è¿›è¡Œé›¶æ ·æœ¬å›¾åƒåˆ†å‰²ã€‚ | `mlops/models/segment-anything` |
| [`serving-llms-vllm`](/user-guide/skills/bundled/mlops/mlops-inference-vllm) | vLLMï¼šé«˜åžåé‡ LLM æœåŠ¡ã€OpenAI API å…¼å®¹ã€é‡åŒ–æ”¯æŒã€‚ | `mlops/inference/vllm` |
| [`weights-and-biases`](/user-guide/skills/bundled/mlops/mlops-evaluation-weights-and-biases) | W&Bï¼šè®°å½• ML å®žéªŒã€è¶…å‚æ•°æœç´¢ã€æ¨¡åž‹æ³¨å†Œè¡¨ã€ä»ªè¡¨ç›˜ã€‚ | `mlops/evaluation/weights-and-biases` |

## note-taking

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`obsidian`](/user-guide/skills/bundled/note-taking/note-taking-obsidian) | åœ¨ Obsidian çŸ¥è¯†åº“ä¸­è¯»å–ã€æœç´¢ã€åˆ›å»ºå’Œç¼–è¾‘ç¬”è®°ã€‚ | `note-taking/obsidian` |

## productivity

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`airtable`](/user-guide/skills/bundled/productivity/productivity-airtable) | é€šè¿‡ curl è°ƒç”¨ Airtable REST APIï¼šè®°å½•å¢žåˆ æ”¹æŸ¥ã€è¿‡æ»¤ã€upsertã€‚ | `productivity/airtable` |
| [`google-workspace`](/user-guide/skills/bundled/productivity/productivity-google-workspace) | é€šè¿‡ gws CLI æˆ– Python æ“ä½œ Gmailã€Calendarã€Driveã€Docsã€Sheetsã€‚ | `productivity/google-workspace` |
| [`maps`](/user-guide/skills/bundled/productivity/productivity-maps) | é€šè¿‡ OpenStreetMap/OSRM è¿›è¡Œåœ°ç†ç¼–ç ã€POI æŸ¥è¯¢ã€è·¯çº¿è§„åˆ’ã€æ—¶åŒºæŸ¥è¯¢ã€‚ | `productivity/maps` |
| [`nano-pdf`](/user-guide/skills/bundled/productivity/productivity-nano-pdf) | é€šè¿‡ nano-pdf CLI ç¼–è¾‘ PDF æ–‡æœ¬/é”™åˆ«å­—/æ ‡é¢˜ï¼ˆè‡ªç„¶è¯­è¨€ promptï¼‰ã€‚ | `productivity/nano-pdf` |
| [`notion`](/user-guide/skills/bundled/productivity/productivity-notion) | Notion API + ntn CLIï¼šé¡µé¢ã€æ•°æ®åº“ã€Markdownã€Workersã€‚ | `productivity/notion` |
| [`ocr-and-documents`](/user-guide/skills/bundled/productivity/productivity-ocr-and-documents) | ä»Ž PDF/æ‰«æä»¶ä¸­æå–æ–‡æœ¬ï¼ˆpymupdfã€marker-pdfï¼‰ã€‚ | `productivity/ocr-and-documents` |
| [`powerpoint`](/user-guide/skills/bundled/productivity/productivity-powerpoint) | åˆ›å»ºã€è¯»å–ã€ç¼–è¾‘ .pptx æ¼”ç¤ºæ–‡ç¨¿ã€å¹»ç¯ç‰‡ã€å¤‡æ³¨ã€æ¨¡æ¿ã€‚ | `productivity/powerpoint` |
| [`teams-meeting-pipeline`](/user-guide/skills/bundled/productivity/productivity-teams-meeting-pipeline) | é€šè¿‡ Zed CLI æ“ä½œ Teams ä¼šè®®æ‘˜è¦æµæ°´çº¿â€”â€”æ±‡æ€»ä¼šè®®ã€æ£€æŸ¥æµæ°´çº¿çŠ¶æ€ã€é‡æ”¾ä»»åŠ¡ã€ç®¡ç† Microsoft Graph è®¢é˜…ã€‚ | `productivity/teams-meeting-pipeline` |

## research

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`arxiv`](/user-guide/skills/bundled/research/research-arxiv) | æŒ‰å…³é”®è¯ã€ä½œè€…ã€åˆ†ç±»æˆ– ID æœç´¢ arXiv è®ºæ–‡ã€‚ | `research/arxiv` |
| [`blogwatcher`](/user-guide/skills/bundled/research/research-blogwatcher) | é€šè¿‡ blogwatcher-cli å·¥å…·ç›‘æŽ§åšå®¢å’Œ RSS/Atom è®¢é˜…æºã€‚ | `research/blogwatcher` |
| [`llm-wiki`](/user-guide/skills/bundled/research/research-llm-wiki) | Karpathy çš„ LLM Wikiï¼šæž„å»º/æŸ¥è¯¢äº’è” Markdown çŸ¥è¯†åº“ã€‚ | `research/llm-wiki` |
| [`polymarket`](/user-guide/skills/bundled/research/research-polymarket) | æŸ¥è¯¢ Polymarketï¼šå¸‚åœºã€ä»·æ ¼ã€è®¢å•ç°¿ã€åŽ†å²æ•°æ®ã€‚ | `research/polymarket` |
| [`research-paper-writing`](/user-guide/skills/bundled/research/research-research-paper-writing) | ä¸º NeurIPS/ICML/ICLR æ’°å†™ ML è®ºæ–‡ï¼šä»Žè®¾è®¡åˆ°æŠ•ç¨¿ã€‚ | `research/research-paper-writing` |

## smart-home

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`openhue`](/user-guide/skills/bundled/smart-home/smart-home-openhue) | é€šè¿‡ OpenHue CLI æŽ§åˆ¶ Philips Hue ç¯å…‰ã€åœºæ™¯ã€æˆ¿é—´ã€‚ | `smart-home/openhue` |

## social-media

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`xurl`](/user-guide/skills/bundled/social-media/social-media-xurl) | é€šè¿‡ xurl CLI æ“ä½œ X/Twitterï¼šå‘å¸–ã€æœç´¢ã€ç§ä¿¡ã€åª’ä½“ã€v2 APIã€‚ | `social-media/xurl` |

## software-development

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`zed-agent-skill-authoring`](/user-guide/skills/bundled/software-development/software-development-zed-agent-skill-authoring) | ç¼–å†™ä»“åº“å†… SKILL.mdï¼šfrontmatterã€éªŒè¯å™¨ã€ç»“æž„è§„èŒƒã€‚ | `software-development/zed-agent-skill-authoring` |
| [`node-inspect-debugger`](/user-guide/skills/bundled/software-development/software-development-node-inspect-debugger) | é€šè¿‡ --inspect + Chrome DevTools Protocol CLI è°ƒè¯• Node.jsã€‚ | `software-development/node-inspect-debugger` |
| [`plan`](/user-guide/skills/bundled/software-development/software-development-plan) | è®¡åˆ’æ¨¡å¼ï¼šå°† Markdown è®¡åˆ’å†™å…¥ `.zed/plans/`ï¼Œä¸æ‰§è¡Œã€‚ | `software-development/plan` |
| [`python-debugpy`](/user-guide/skills/bundled/software-development/software-development-python-debugpy) | è°ƒè¯• Pythonï¼špdb REPL + debugpy è¿œç¨‹è°ƒè¯•ï¼ˆDAPï¼‰ã€‚ | `software-development/python-debugpy` |
| [`requesting-code-review`](/user-guide/skills/bundled/software-development/software-development-requesting-code-review) | æäº¤å‰å®¡æŸ¥ï¼šå®‰å…¨æ‰«æã€è´¨é‡é—¨æŽ§ã€è‡ªåŠ¨ä¿®å¤ã€‚ | `software-development/requesting-code-review` |
| [`spike`](/user-guide/skills/bundled/software-development/software-development-spike) | ä¸€æ¬¡æ€§å®žéªŒï¼Œåœ¨æ­£å¼æž„å»ºå‰éªŒè¯æƒ³æ³•ã€‚ | `software-development/spike` |
| [`systematic-debugging`](/user-guide/skills/bundled/software-development/software-development-systematic-debugging) | å››é˜¶æ®µæ ¹å› è°ƒè¯•ï¼šå…ˆç†è§£ bugï¼Œå†ä¿®å¤ã€‚ | `software-development/systematic-debugging` |
| [`test-driven-development`](/user-guide/skills/bundled/software-development/software-development-test-driven-development) | TDDï¼šå¼ºåˆ¶æ‰§è¡Œçº¢-ç»¿-é‡æž„æµç¨‹ï¼Œå…ˆå†™æµ‹è¯•å†å†™ä»£ç ã€‚ | `software-development/test-driven-development` |

## yuanbao

| æŠ€èƒ½ | æè¿° | è·¯å¾„ |
|-------|-------------|------|
| [`yuanbao`](/user-guide/skills/bundled/yuanbao/yuanbao-yuanbao) | å…ƒå®ï¼ˆYuanbaoï¼‰ç¾¤ç»„ï¼š@æåŠç”¨æˆ·ã€æŸ¥è¯¢ä¿¡æ¯/æˆå‘˜ã€‚ | `yuanbao` |