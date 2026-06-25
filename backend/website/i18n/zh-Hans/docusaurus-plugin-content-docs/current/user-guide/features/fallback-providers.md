---
title: å¤‡ç”¨æä¾›å•†
description: é…ç½®è‡ªåŠ¨æ•…éšœè½¬ç§»ï¼Œåœ¨ä¸»æ¨¡åž‹ä¸å¯ç”¨æ—¶åˆ‡æ¢åˆ°å¤‡ç”¨ LLM æä¾›å•†ã€‚
sidebar_label: å¤‡ç”¨æä¾›å•†
sidebar_position: 8
---

# å¤‡ç”¨æä¾›å•†

Zed Agent å…·å¤‡ä¸‰å±‚å¼¹æ€§æœºåˆ¶ï¼Œåœ¨æä¾›å•†å‡ºçŽ°é—®é¢˜æ—¶ä¿æŒä¼šè¯æ­£å¸¸è¿è¡Œï¼š

1. **[å‡­æ®æ± ](./credential-pools.md)** â€” åœ¨*åŒä¸€*æä¾›å•†çš„å¤šä¸ª API å¯†é’¥ä¹‹é—´è½®æ¢ï¼ˆä¼˜å…ˆå°è¯•ï¼‰
2. **ä¸»æ¨¡åž‹å¤‡ç”¨** â€” å½“ä¸»æ¨¡åž‹å¤±è´¥æ—¶ï¼Œè‡ªåŠ¨åˆ‡æ¢åˆ°*ä¸åŒ*çš„æä¾›å•†:æ¨¡åž‹
3. **è¾…åŠ©ä»»åŠ¡å¤‡ç”¨** â€” é’ˆå¯¹è§†è§‰ã€åŽ‹ç¼©ã€ç½‘é¡µæå–ç­‰é™„å±žä»»åŠ¡çš„ç‹¬ç«‹æä¾›å•†è§£æž

å‡­æ®æ± å¤„ç†åŒä¸€æä¾›å•†å†…çš„è½®æ¢ï¼ˆä¾‹å¦‚å¤šä¸ª OpenRouter å¯†é’¥ï¼‰ã€‚æœ¬é¡µä»‹ç»è·¨æä¾›å•†çš„å¤‡ç”¨æœºåˆ¶ã€‚ä¸¤è€…å‡ä¸ºå¯é€‰ï¼Œä¸”ç›¸äº’ç‹¬ç«‹ã€‚

## ä¸»æ¨¡åž‹å¤‡ç”¨

å½“ä¸» LLM æä¾›å•†é‡åˆ°é”™è¯¯â€”â€”é€ŸçŽ‡é™åˆ¶ã€æœåŠ¡å™¨è¿‡è½½ã€è®¤è¯å¤±è´¥ã€è¿žæŽ¥ä¸­æ–­â€”â€”Zed å¯ä»¥åœ¨ä¼šè¯ä¸­é€”è‡ªåŠ¨åˆ‡æ¢åˆ°å¤‡ç”¨æä¾›å•†:æ¨¡åž‹å¯¹ï¼Œä¸”ä¸ä¼šä¸¢å¤±å¯¹è¯å†…å®¹ã€‚

### é…ç½®

æœ€ç®€ä¾¿çš„æ–¹å¼æ˜¯ä½¿ç”¨äº¤äº’å¼ç®¡ç†å™¨ï¼š

```bash
zed fallback
```

`zed fallback` å¤ç”¨ `zed model` çš„æä¾›å•†é€‰æ‹©å™¨â€”â€”ç›¸åŒçš„æä¾›å•†åˆ—è¡¨ã€ç›¸åŒçš„å‡­æ®æç¤ºã€ç›¸åŒçš„éªŒè¯æµç¨‹ã€‚ä½¿ç”¨å­å‘½ä»¤ `add`ã€`list`ï¼ˆåˆ«å `ls`ï¼‰ã€`remove`ï¼ˆåˆ«å `rm`ï¼‰å’Œ `clear` æ¥ç®¡ç†å¤‡ç”¨é“¾ã€‚æ›´æ”¹ä¼šæŒä¹…åŒ–åˆ° `config.yaml` é¡¶å±‚çš„ `fallback_providers:` åˆ—è¡¨ä¸­ã€‚

å¦‚æžœä½ æ›´å€¾å‘äºŽç›´æŽ¥ç¼–è¾‘ YAMLï¼Œå¯åœ¨ `~/.zed/config.yaml` ä¸­æ·»åŠ  `fallback_model` éƒ¨åˆ†ï¼š

```yaml
fallback_model:
  provider: openrouter
  model: anthropic/claude-sonnet-4
```

`provider` å’Œ `model` å‡ä¸º**å¿…å¡«é¡¹**ã€‚è‹¥ä»»ä¸€ç¼ºå¤±ï¼Œå¤‡ç”¨åŠŸèƒ½å°†è¢«ç¦ç”¨ã€‚

:::note `fallback_model` ä¸Ž `fallback_providers`
`fallback_model`ï¼ˆå•æ•°ï¼‰æ˜¯æ—§ç‰ˆå•å¤‡ç”¨é”®â€”â€”Zed ä»æ”¯æŒä»¥ä¿æŒå‘åŽå…¼å®¹ã€‚`fallback_providers`ï¼ˆå¤æ•°ï¼Œåˆ—è¡¨ï¼‰æ”¯æŒæŒ‰é¡ºåºå°è¯•å¤šä¸ªå¤‡ç”¨ï¼›`zed fallback` å†™å…¥æ­¤é”®ã€‚å½“ä¸¤è€…åŒæ—¶è®¾ç½®æ—¶ï¼ŒZed ä¼šåˆå¹¶å®ƒä»¬ï¼Œ`fallback_providers` ä¼˜å…ˆã€‚
:::

### æ”¯æŒçš„æä¾›å•†

| æä¾›å•† | å€¼ | è¦æ±‚ |
|----------|-------|-------------|
| OpenRouter | `openrouter` | `OPENROUTER_API_KEY` |
| Nous Portal | `nous` | `zed setup --portal`ï¼ˆå…¨æ–°å®‰è£…ï¼‰æˆ– `zed auth add nous`ï¼ˆOAuthï¼‰ |
| OpenAI Codex | `openai-codex` | `zed model`ï¼ˆChatGPT OAuthï¼‰ |
| GitHub Copilot | `copilot` | `COPILOT_GITHUB_TOKEN`ã€`GH_TOKEN` æˆ– `GITHUB_TOKEN` |
| GitHub Copilot ACP | `copilot-acp` | å¤–éƒ¨è¿›ç¨‹ï¼ˆç¼–è¾‘å™¨é›†æˆï¼‰ |
| Anthropic | `anthropic` | `ANTHROPIC_API_KEY` æˆ– Claude Code å‡­æ® |
| z.ai / GLM | `zai` | `GLM_API_KEY` |
| Kimi / Moonshot | `kimi-coding` | `KIMI_API_KEY` |
| MiniMax | `minimax` | `MINIMAX_API_KEY` |
| MiniMaxï¼ˆä¸­å›½ï¼‰| `minimax-cn` | `MINIMAX_CN_API_KEY` |
| DeepSeek | `deepseek` | `DEEPSEEK_API_KEY` |
| NVIDIA NIM | `nvidia` | `NVIDIA_API_KEY`ï¼ˆå¯é€‰ï¼š`NVIDIA_BASE_URL`ï¼‰ |
| GMI Cloud | `gmi` | `GMI_API_KEY`ï¼ˆå¯é€‰ï¼š`GMI_BASE_URL`ï¼‰ |
| StepFun | `stepfun` | `STEPFUN_API_KEY`ï¼ˆå¯é€‰ï¼š`STEPFUN_BASE_URL`ï¼‰ |
| Ollama Cloud | `ollama-cloud` | `OLLAMA_API_KEY` |
| Google Geminiï¼ˆOAuthï¼‰ | `google-gemini-cli` | `zed model`ï¼ˆGoogle OAuthï¼›å¯é€‰ï¼š`ZED_GEMINI_PROJECT_ID`ï¼‰ |
| Google AI Studio | `gemini` | `GOOGLE_API_KEY`ï¼ˆåˆ«åï¼š`GEMINI_API_KEY`ï¼‰ |
| xAIï¼ˆGrokï¼‰ | `xai`ï¼ˆåˆ«å `grok`ï¼‰ | `XAI_API_KEY`ï¼ˆå¯é€‰ï¼š`XAI_BASE_URL`ï¼‰ |
| xAI Grok OAuthï¼ˆSuperGrokï¼‰ | `xai-oauth`ï¼ˆåˆ«å `grok-oauth`ï¼‰ | `zed model` â†’ xAI Grok OAuthï¼ˆæµè§ˆå™¨ç™»å½•ï¼›éœ€ SuperGrok è®¢é˜…ï¼‰ |
| AWS Bedrock | `bedrock` | æ ‡å‡† boto3 è®¤è¯ï¼ˆ`AWS_REGION` + `AWS_PROFILE` æˆ– `AWS_ACCESS_KEY_ID`ï¼‰ |
| Qwen Portalï¼ˆOAuthï¼‰ | `qwen-oauth` | `zed model`ï¼ˆQwen Portal OAuthï¼›å¯é€‰ï¼š`ZED_QWEN_BASE_URL`ï¼‰ |
| MiniMaxï¼ˆOAuthï¼‰ | `minimax-oauth` | `zed model`ï¼ˆMiniMax é—¨æˆ· OAuthï¼‰ |
| OpenCode Zen | `opencode-zen` | `OPENCODE_ZEN_API_KEY` |
| OpenCode Go | `opencode-go` | `OPENCODE_GO_API_KEY` |
| Kilo Code | `kilocode` | `KILOCODE_API_KEY` |
| Xiaomi MiMo | `xiaomi` | `XIAOMI_API_KEY` |
| Arcee AI | `arcee` | `ARCEEAI_API_KEY` |
| GMI Cloud | `gmi` | `GMI_API_KEY` |
| Alibaba / DashScope | `alibaba` | `DASHSCOPE_API_KEY` |
| Alibaba Coding Plan | `alibaba-coding-plan` | `ALIBABA_CODING_PLAN_API_KEY`ï¼ˆå›žé€€åˆ° `DASHSCOPE_API_KEY`ï¼‰ |
| Kimi / Moonshotï¼ˆä¸­å›½ï¼‰ | `kimi-coding-cn` | `KIMI_CN_API_KEY` |
| StepFun | `stepfun` | `STEPFUN_API_KEY` |
| Tencent TokenHub | `tencent-tokenhub` | `TOKENHUB_API_KEY` |
| Microsoft Foundry | `azure-foundry` | `AZURE_FOUNDRY_API_KEY` + `AZURE_FOUNDRY_BASE_URL` |
| LM Studioï¼ˆæœ¬åœ°ï¼‰ | `lmstudio` | `LM_API_KEY`ï¼ˆæœ¬åœ°å¯ä¸å¡«ï¼‰+ `LM_BASE_URL` |
| Hugging Face | `huggingface` | `HF_TOKEN` |
| è‡ªå®šä¹‰ç«¯ç‚¹ | `custom` | `base_url` + `key_env`ï¼ˆè§ä¸‹æ–‡ï¼‰ |

### è‡ªå®šä¹‰ç«¯ç‚¹å¤‡ç”¨

å¯¹äºŽå…¼å®¹ OpenAI çš„è‡ªå®šä¹‰ç«¯ç‚¹ï¼Œæ·»åŠ  `base_url` å¹¶å¯é€‰å¡« `key_env`ï¼š

```yaml
fallback_model:
  provider: custom
  model: my-local-model
  base_url: http://localhost:8000/v1
  key_env: MY_LOCAL_KEY              # åŒ…å« API å¯†é’¥çš„çŽ¯å¢ƒå˜é‡å
```

### å¤‡ç”¨è§¦å‘æ¡ä»¶

å½“ä¸»æ¨¡åž‹å‡ºçŽ°ä»¥ä¸‹å¤±è´¥æ—¶ï¼Œå¤‡ç”¨æœºåˆ¶è‡ªåŠ¨æ¿€æ´»ï¼š

- **é€ŸçŽ‡é™åˆ¶**ï¼ˆHTTP 429ï¼‰â€”â€”è€—å°½é‡è¯•æ¬¡æ•°åŽ
- **æœåŠ¡å™¨é”™è¯¯**ï¼ˆHTTP 500ã€502ã€503ï¼‰â€”â€”è€—å°½é‡è¯•æ¬¡æ•°åŽ
- **è®¤è¯å¤±è´¥**ï¼ˆHTTP 401ã€403ï¼‰â€”â€”ç«‹å³è§¦å‘ï¼ˆé‡è¯•æ— æ„ä¹‰ï¼‰
- **æœªæ‰¾åˆ°**ï¼ˆHTTP 404ï¼‰â€”â€”ç«‹å³è§¦å‘
- **æ— æ•ˆå“åº”**â€”â€”API å¤šæ¬¡è¿”å›žæ ¼å¼é”™è¯¯æˆ–ç©ºå“åº”æ—¶

è§¦å‘åŽï¼ŒZed å°†ï¼š

1. è§£æžå¤‡ç”¨æä¾›å•†çš„å‡­æ®
2. æž„å»ºæ–°çš„ API å®¢æˆ·ç«¯
3. å°±åœ°æ›¿æ¢æ¨¡åž‹ã€æä¾›å•†å’Œå®¢æˆ·ç«¯
4. é‡ç½®é‡è¯•è®¡æ•°å™¨å¹¶ç»§ç»­å¯¹è¯

åˆ‡æ¢æ˜¯æ— æ„ŸçŸ¥çš„â€”â€”å¯¹è¯åŽ†å²ã€å·¥å…·è°ƒç”¨å’Œä¸Šä¸‹æ–‡å‡è¢«ä¿ç•™ã€‚Agent ä»Žä¸­æ–­å¤„ç»§ç»­ï¼Œåªæ˜¯ä½¿ç”¨äº†ä¸åŒçš„æ¨¡åž‹ã€‚

:::info æŒ‰è½®æ¬¡ï¼Œè€ŒéžæŒ‰ä¼šè¯
å¤‡ç”¨æœºåˆ¶çš„**ä½œç”¨åŸŸä¸ºå•æ¬¡è½®æ¬¡**ï¼šæ¯æ¡æ–°ç”¨æˆ·æ¶ˆæ¯éƒ½ä»Žä¸»æ¨¡åž‹é‡æ–°å¼€å§‹ã€‚è‹¥ä¸»æ¨¡åž‹åœ¨æŸè½®æ¬¡ä¸­é€”å¤±è´¥ï¼Œå¤‡ç”¨ä»…å¯¹è¯¥è½®æ¬¡ç”Ÿæ•ˆã€‚ä¸‹ä¸€æ¡æ¶ˆæ¯æ—¶ï¼ŒZed ä¼šå†æ¬¡å°è¯•ä¸»æ¨¡åž‹ã€‚åœ¨å•æ¬¡è½®æ¬¡å†…ï¼Œå¤‡ç”¨æœ€å¤šæ¿€æ´»ä¸€æ¬¡â€”â€”è‹¥å¤‡ç”¨ä¹Ÿå¤±è´¥ï¼Œåˆ™è¿›å…¥å¸¸è§„é”™è¯¯å¤„ç†æµç¨‹ï¼ˆé‡è¯•ï¼Œç„¶åŽè¿”å›žé”™è¯¯æ¶ˆæ¯ï¼‰ã€‚è¿™æ—¢é˜²æ­¢äº†å•è½®æ¬¡å†…çš„çº§è”æ•…éšœè½¬ç§»å¾ªçŽ¯ï¼Œåˆè®©ä¸»æ¨¡åž‹åœ¨æ¯è½®æ¬¡éƒ½æœ‰é‡æ–°å°è¯•çš„æœºä¼šã€‚
:::

### ç¤ºä¾‹

**ä»¥ OpenRouter ä½œä¸º Anthropic åŽŸç”Ÿçš„å¤‡ç”¨ï¼š**
```yaml
model:
  provider: anthropic
  default: claude-sonnet-4-6

fallback_model:
  provider: openrouter
  model: anthropic/claude-sonnet-4
```

**ä»¥ Nous Portal ä½œä¸º OpenRouter çš„å¤‡ç”¨ï¼š**
```yaml
model:
  provider: openrouter
  default: anthropic/claude-opus-4

fallback_model:
  provider: nous
  model: nous-zed-3
```

**ä»¥æœ¬åœ°æ¨¡åž‹ä½œä¸ºäº‘ç«¯çš„å¤‡ç”¨ï¼š**
```yaml
fallback_model:
  provider: custom
  model: llama-3.1-70b
  base_url: http://localhost:8000/v1
  key_env: LOCAL_API_KEY
```

**ä»¥ Codex OAuth ä½œä¸ºå¤‡ç”¨ï¼š**
```yaml
fallback_model:
  provider: openai-codex
  model: gpt-5.3-codex
```

### å¤‡ç”¨é€‚ç”¨èŒƒå›´

| åœºæ™¯ | æ˜¯å¦æ”¯æŒå¤‡ç”¨ |
|---------|-------------------|
| CLI ä¼šè¯ | âœ” |
| æ¶ˆæ¯ç½‘å…³ï¼ˆTelegramã€Discord ç­‰ï¼‰ | âœ” |
| å­ Agent å§”æ´¾ | âœ˜ï¼ˆå­ Agent ä¸ç»§æ‰¿å¤‡ç”¨é…ç½®ï¼‰ |
| Cron ä»»åŠ¡ | âœ˜ï¼ˆä½¿ç”¨å›ºå®šæä¾›å•†è¿è¡Œï¼‰ |
| è¾…åŠ©ä»»åŠ¡ï¼ˆè§†è§‰ã€åŽ‹ç¼©ç­‰ï¼‰ | âœ˜ï¼ˆä½¿ç”¨å„è‡ªçš„æä¾›å•†é“¾â€”â€”è§ä¸‹æ–‡ï¼‰ |

:::tip
`fallback_model` æ²¡æœ‰å¯¹åº”çš„çŽ¯å¢ƒå˜é‡â€”â€”å®ƒåªèƒ½é€šè¿‡ `config.yaml` é…ç½®ã€‚è¿™æ˜¯æœ‰æ„ä¸ºä¹‹ï¼šå¤‡ç”¨é…ç½®æ˜¯ä¸€ä¸ªç»è¿‡æ·±æ€ç†Ÿè™‘çš„é€‰æ‹©ï¼Œä¸åº”è¢«è¿‡æœŸçš„ shell å¯¼å‡ºå˜é‡è¦†ç›–ã€‚
:::

---

## è¾…åŠ©ä»»åŠ¡å¤‡ç”¨

Zed ä¸ºé™„å±žä»»åŠ¡ä½¿ç”¨ç‹¬ç«‹çš„è½»é‡çº§æ¨¡åž‹ã€‚æ¯ä¸ªä»»åŠ¡éƒ½æœ‰è‡ªå·±çš„æä¾›å•†è§£æžé“¾ï¼Œå……å½“å†…ç½®çš„å¤‡ç”¨ç³»ç»Ÿã€‚

### å…·æœ‰ç‹¬ç«‹æä¾›å•†è§£æžçš„ä»»åŠ¡

| ä»»åŠ¡ | åŠŸèƒ½è¯´æ˜Ž | é…ç½®é”® |
|------|-------------|-----------|
| è§†è§‰ | å›¾åƒåˆ†æžã€æµè§ˆå™¨æˆªå›¾ | `auxiliary.vision` |
| ç½‘é¡µæå– | ç½‘é¡µå†…å®¹æ‘˜è¦ | `auxiliary.web_extract` |
| åŽ‹ç¼© | ä¸Šä¸‹æ–‡åŽ‹ç¼©æ‘˜è¦ | `auxiliary.compression` |
| Skills Hub | æŠ€èƒ½æœç´¢ä¸Žå‘çŽ° | `auxiliary.skills_hub` |
| MCP | MCP è¾…åŠ©æ“ä½œ | `auxiliary.mcp` |
| å®¡æ‰¹ | æ™ºèƒ½å‘½ä»¤å®¡æ‰¹åˆ†ç±» | `auxiliary.approval` |
| æ ‡é¢˜ç”Ÿæˆ | ä¼šè¯æ ‡é¢˜æ‘˜è¦ | `auxiliary.title_generation` |
| Triage Specifier | `zed kanban specify` / çœ‹æ¿ï¼ˆkanbanï¼‰âœ¨ æŒ‰é’®â€”â€”å°†å•è¡Œ triage ä»»åŠ¡æ‰©å±•ä¸ºå®Œæ•´è§„æ ¼ | `auxiliary.triage_specifier` |

### è‡ªåŠ¨æ£€æµ‹é“¾

å½“ä»»åŠ¡çš„æä¾›å•†è®¾ç½®ä¸º `"auto"`ï¼ˆé»˜è®¤å€¼ï¼‰æ—¶ï¼ŒZed æŒ‰é¡ºåºå°è¯•å„æä¾›å•†ï¼Œç›´åˆ°æ‰¾åˆ°å¯ç”¨çš„ï¼š

**æ–‡æœ¬ä»»åŠ¡ï¼ˆåŽ‹ç¼©ã€ç½‘é¡µæå–ç­‰ï¼‰ï¼š**

```text
OpenRouter â†’ Nous Portal â†’ è‡ªå®šä¹‰ç«¯ç‚¹ â†’ Codex OAuth â†’
API å¯†é’¥æä¾›å•†ï¼ˆz.aiã€Kimiã€MiniMaxã€Xiaomi MiMoã€Hugging Faceã€Anthropicï¼‰â†’ æ”¾å¼ƒ
```

**è§†è§‰ä»»åŠ¡ï¼š**

```text
ä¸»æä¾›å•†ï¼ˆè‹¥æ”¯æŒè§†è§‰ï¼‰â†’ OpenRouter â†’ Nous Portal â†’
Codex OAuth â†’ Anthropic â†’ è‡ªå®šä¹‰ç«¯ç‚¹ â†’ æ”¾å¼ƒ
```

è‹¥è§£æžåˆ°çš„æä¾›å•†åœ¨è°ƒç”¨æ—¶å¤±è´¥ï¼ŒZed è¿˜æœ‰å†…éƒ¨é‡è¯•æœºåˆ¶ï¼šè‹¥è¯¥æä¾›å•†ä¸æ˜¯ OpenRouter ä¸”æœªè®¾ç½®æ˜¾å¼ `base_url`ï¼Œåˆ™å°è¯•ä»¥ OpenRouter ä½œä¸ºæœ€åŽå¤‡ç”¨ã€‚

### é…ç½®è¾…åŠ©æä¾›å•†

æ¯ä¸ªä»»åŠ¡å¯åœ¨ `config.yaml` ä¸­ç‹¬ç«‹é…ç½®ï¼š

```yaml
auxiliary:
  vision:
    provider: "auto"              # auto | openrouter | nous | codex | main | anthropic
    model: ""                     # ä¾‹å¦‚ "openai/gpt-4o"
    base_url: ""                  # ç›´æŽ¥ç«¯ç‚¹ï¼ˆä¼˜å…ˆäºŽ providerï¼‰
    api_key: ""                   # base_url çš„ API å¯†é’¥

  web_extract:
    provider: "auto"
    model: ""

  compression:
    provider: "auto"
    model: ""

  skills_hub:
    provider: "auto"
    model: ""

  mcp:
    provider: "auto"
    model: ""
```

ä»¥ä¸Šæ¯ä¸ªä»»åŠ¡å‡éµå¾ªç›¸åŒçš„ **provider / model / base_url** æ¨¡å¼ã€‚ä¸Šä¸‹æ–‡åŽ‹ç¼©åœ¨ `auxiliary.compression` ä¸‹é…ç½®ï¼š

```yaml
auxiliary:
  compression:
    provider: main                                    # ä¸Žå…¶ä»–è¾…åŠ©ä»»åŠ¡ç›¸åŒçš„æä¾›å•†é€‰é¡¹
    model: google/gemini-3-flash-preview
    base_url: null                                    # è‡ªå®šä¹‰ OpenAI å…¼å®¹ç«¯ç‚¹
```

å¤‡ç”¨æ¨¡åž‹ä½¿ç”¨ï¼š

```yaml
fallback_model:
  provider: openrouter
  model: anthropic/claude-sonnet-4
  # base_url: http://localhost:8000/v1               # å¯é€‰è‡ªå®šä¹‰ç«¯ç‚¹
```

ä¸‰è€…â€”â€”è¾…åŠ©ä»»åŠ¡ã€åŽ‹ç¼©ã€å¤‡ç”¨â€”â€”å·¥ä½œæ–¹å¼ç›¸åŒï¼šè®¾ç½® `provider` æŒ‡å®šå¤„ç†è¯·æ±‚çš„æä¾›å•†ï¼Œ`model` æŒ‡å®šä½¿ç”¨çš„æ¨¡åž‹ï¼Œ`base_url` æŒ‡å‘è‡ªå®šä¹‰ç«¯ç‚¹ï¼ˆä¼šè¦†ç›– providerï¼‰ã€‚

### è¾…åŠ©ä»»åŠ¡çš„æä¾›å•†é€‰é¡¹

ä»¥ä¸‹é€‰é¡¹ä»…é€‚ç”¨äºŽ `auxiliary:`ã€`compression:` å’Œ `fallback_model:` é…ç½®â€”â€”`"main"` **ä¸æ˜¯**é¡¶å±‚ `model.provider` çš„æœ‰æ•ˆå€¼ã€‚å¯¹äºŽè‡ªå®šä¹‰ç«¯ç‚¹ï¼Œè¯·åœ¨ `model:` éƒ¨åˆ†ä½¿ç”¨ `provider: custom`ï¼ˆå‚è§ [AI æä¾›å•†](/integrations/providers)ï¼‰ã€‚

| æä¾›å•† | è¯´æ˜Ž | è¦æ±‚ |
|----------|-------------|-------------|
| `"auto"` | æŒ‰é¡ºåºå°è¯•å„æä¾›å•†ç›´åˆ°æ‰¾åˆ°å¯ç”¨çš„ï¼ˆé»˜è®¤ï¼‰ | è‡³å°‘é…ç½®ä¸€ä¸ªæä¾›å•† |
| `"openrouter"` | å¼ºåˆ¶ä½¿ç”¨ OpenRouter | `OPENROUTER_API_KEY` |
| `"nous"` | å¼ºåˆ¶ä½¿ç”¨ Nous Portal | `zed auth` |
| `"codex"` | å¼ºåˆ¶ä½¿ç”¨ Codex OAuth | `zed model` â†’ Codex |
| `"main"` | ä½¿ç”¨ä¸» Agent å½“å‰çš„æä¾›å•†ï¼ˆä»…é™è¾…åŠ©ä»»åŠ¡ï¼‰ | å·²é…ç½®æ´»è·ƒçš„ä¸»æä¾›å•† |
| `"anthropic"` | å¼ºåˆ¶ä½¿ç”¨ Anthropic åŽŸç”Ÿ | `ANTHROPIC_API_KEY` æˆ– Claude Code å‡­æ® |

### ç›´æŽ¥ç«¯ç‚¹è¦†ç›–

å¯¹äºŽä»»æ„è¾…åŠ©ä»»åŠ¡ï¼Œè®¾ç½® `base_url` å°†å®Œå…¨ç»•è¿‡æä¾›å•†è§£æžï¼Œç›´æŽ¥å‘è¯¥ç«¯ç‚¹å‘é€è¯·æ±‚ï¼š

```yaml
auxiliary:
  vision:
    base_url: "http://localhost:1234/v1"
    api_key: "local-key"
    model: "qwen2.5-vl"
```

`base_url` ä¼˜å…ˆäºŽ `provider`ã€‚Zed ä½¿ç”¨é…ç½®çš„ `api_key` è¿›è¡Œè®¤è¯ï¼Œè‹¥æœªè®¾ç½®åˆ™å›žé€€åˆ° `OPENAI_API_KEY`ã€‚å¯¹äºŽè‡ªå®šä¹‰ç«¯ç‚¹ï¼Œ**ä¸ä¼š**å¤ç”¨ `OPENROUTER_API_KEY`ã€‚

---

## è¾…åŠ©ä»»åŠ¡å®¹é‡é”™è¯¯å¤‡ç”¨

å½“ä½ è®¾ç½®äº†æ˜¾å¼çš„è¾…åŠ©æä¾›å•†ï¼ˆä¾‹å¦‚ `auxiliary.vision.provider: glm`ï¼‰æ—¶ï¼ŒZed å°†å…¶è§†ä¸ºé¦–é€‰â€”â€”ä½†è‹¥è¯¥æä¾›å•†å› **å®¹é‡é”™è¯¯**ï¼ˆHTTP 402 ä»˜æ¬¾è¦æ±‚ã€HTTP 429 æ¯æ—¥é…é¢è€—å°½ã€è¿žæŽ¥å¤±è´¥ï¼‰è€Œæ— æ³•å¤„ç†è¯·æ±‚ï¼ŒZed ä¼šé€šè¿‡åˆ†å±‚é“¾è¿›è¡Œå¤‡ç”¨ï¼Œè€Œä¸æ˜¯é™é»˜å¤±è´¥ï¼š

1. **ä¸»è¾…åŠ©æä¾›å•†** â€” ä½ é…ç½®çš„é‚£ä¸ªï¼ˆå§‹ç»ˆä¼˜å…ˆå°è¯•ï¼‰
2. **`auxiliary.<task>.fallback_chain`** â€” ä½ çš„æ¯ä»»åŠ¡è¦†ç›–åˆ—è¡¨ï¼ˆè‹¥å·²é…ç½®ï¼‰
3. **ä¸» Agent æä¾›å•† + æ¨¡åž‹** â€” æœ€åŽçš„å®‰å…¨ç½‘ï¼ˆå§‹ç»ˆå°è¯•ï¼Œå³ä½¿æœªé…ç½®é“¾ï¼‰
4. **è­¦å‘Š + é‡æ–°æŠ›å‡º** â€” è‹¥æ‰€æœ‰å±‚å‡å¤±è´¥ï¼ŒZed ä»¥ WARNING çº§åˆ«è®°å½• `Auxiliary <task>: ... all fallbacks exhausted` å¹¶é‡æ–°æŠ›å‡ºåŽŸå§‹é”™è¯¯

çž¬æ—¶ HTTP 429 é€ŸçŽ‡é™åˆ¶ï¼ˆ`Retry-After: ...`ï¼‰è¢«è§†ä¸ºè¯·æ±‚çº¦æŸï¼Œè€Œéžå®¹é‡é—®é¢˜â€”â€”å®ƒä»¬éµå®ˆä½ çš„æ˜¾å¼æä¾›å•†é€‰æ‹©ï¼Œ**ä¸ä¼š**è§¦å‘å¤‡ç”¨é“¾ã€‚åªæœ‰æ¯æ—¥/æ¯æœˆé…é¢è€—å°½ã€ä»˜æ¬¾é”™è¯¯å’Œè¿žæŽ¥å¤±è´¥æ‰ä¼šç»•è¿‡æ˜¾å¼æä¾›å•†é™åˆ¶ã€‚

å¯¹äºŽä½¿ç”¨ `provider: auto`ï¼ˆæ— æ˜¾å¼è¾…åŠ©æä¾›å•†ï¼‰çš„ç”¨æˆ·ï¼ŒçŽ°æœ‰çš„è‡ªåŠ¨æ£€æµ‹é“¾å°†æ›¿ä»£æ­¥éª¤ 2â€“3 è¿è¡Œã€‚å…¶ç¬¬ä¸€æ­¥å·²ç»æ˜¯ä¸» Agent æ¨¡åž‹ï¼Œå› æ­¤ `auto` ç”¨æˆ·æ— éœ€ä»»ä½•é…ç½®å³å¯èŽ·å¾—ç›¸åŒæ•ˆæžœã€‚

### å¯é€‰ï¼šæ¯ä»»åŠ¡å¤‡ç”¨é“¾

è‹¥ä½ å¸Œæœ›ä½¿ç”¨ä¸Ž"ä¸» Agent æ¨¡åž‹ä¼˜å…ˆ"ä¸åŒçš„å¤‡ç”¨é¡ºåºï¼Œå¯æ˜¾å¼é…ç½® `fallback_chain`ã€‚æ¯ä¸ªæ¡ç›®è‡³å°‘éœ€è¦ `provider`ï¼›`model`ã€`base_url` å’Œ `api_key` ä¸ºå¯é€‰ã€‚

```yaml
auxiliary:
  vision:
    provider: glm
    model: glm-4v-flash
    fallback_chain:
      - provider: openrouter
        model: google/gemini-3-flash-preview
      - provider: nous
        model: anthropic/claude-sonnet-4

  compression:
    provider: openrouter
    fallback_chain:
      - provider: openai
        model: gpt-4o-mini
```

ä½ **ä¸éœ€è¦**é…ç½® `fallback_chain` æ‰èƒ½èŽ·å¾—å¤‡ç”¨åŠŸèƒ½â€”â€”ä¸» Agent å®‰å…¨ç½‘æ— è®ºå¦‚ä½•éƒ½ä¼šè¿è¡Œã€‚ä»…å½“ä½ æ˜Žç¡®å¸Œæœ›ä½¿ç”¨ä¸Žé»˜è®¤ä¸åŒçš„é¡ºåºæ—¶æ‰éœ€é…ç½®ã€‚

### è§¦å‘å¤‡ç”¨çš„æä¾›å•†é…é¢é”™è¯¯

Zed å°†ä»¥ä¸‹æƒ…å†µè¯†åˆ«ä¸ºç­‰åŒäºŽ 402 é¢åº¦è€—å°½çš„å®¹é‡é”™è¯¯ï¼ˆè€Œéžçž¬æ—¶é€ŸçŽ‡é™åˆ¶ï¼‰ï¼š

- Bedrock / LiteLLMï¼š`Too many tokens per day`ã€`daily limit`ã€`tokens per day`
- Vertex AI / GCPï¼š`quota exceeded`ã€`resource exhausted`ã€`RESOURCE_EXHAUSTED`
- é€šç”¨ï¼š`daily quota`ã€`quota_exceeded`

è‹¥ä½ çš„æä¾›å•†å¯¹æ¯æ—¥é…é¢è€—å°½è¿”å›žä¸åŒçš„é”™è¯¯ä¿¡æ¯ï¼Œè€Œ Zed æœªè§¦å‘å¤‡ç”¨ï¼Œè¿™æ˜¯ä¸€ä¸ª bugâ€”â€”è¯·é™„ä¸Šç¡®åˆ‡çš„é”™è¯¯å­—ç¬¦ä¸²æäº¤ issueã€‚

---

## ä¸Šä¸‹æ–‡åŽ‹ç¼©å¤‡ç”¨

ä¸Šä¸‹æ–‡åŽ‹ç¼©ä½¿ç”¨ `auxiliary.compression` é…ç½®å—æ¥æŽ§åˆ¶å¤„ç†æ‘˜è¦çš„æ¨¡åž‹å’Œæä¾›å•†ï¼š

```yaml
auxiliary:
  compression:
    provider: "auto"                              # auto | openrouter | nous | main
    model: "google/gemini-3-flash-preview"
```

:::info æ—§ç‰ˆè¿ç§»
æ—§ç‰ˆé…ç½®ä¸­çš„ `compression.summary_model` / `compression.summary_provider` / `compression.summary_base_url` ä¼šåœ¨é¦–æ¬¡åŠ è½½æ—¶è‡ªåŠ¨è¿ç§»åˆ° `auxiliary.compression.*`ï¼ˆé…ç½®ç‰ˆæœ¬ 17ï¼‰ã€‚
:::

è‹¥åŽ‹ç¼©æ²¡æœ‰å¯ç”¨çš„æä¾›å•†ï¼ŒZed ä¼šç›´æŽ¥ä¸¢å¼ƒä¸­é—´å¯¹è¯è½®æ¬¡è€Œä¸ç”Ÿæˆæ‘˜è¦ï¼Œè€Œä¸æ˜¯è®©ä¼šè¯å¤±è´¥ã€‚

---

## å§”æ´¾æä¾›å•†è¦†ç›–

ç”± `delegate_task` ç”Ÿæˆçš„å­ Agent **ä¸ä¼š**ä½¿ç”¨ä¸»å¤‡ç”¨æ¨¡åž‹ã€‚ä½†å¯ä»¥å°†å®ƒä»¬è·¯ç”±åˆ°ä¸åŒçš„æä¾›å•†:æ¨¡åž‹å¯¹ä»¥ä¼˜åŒ–æˆæœ¬ï¼š

```yaml
delegation:
  provider: "openrouter"                      # è¦†ç›–æ‰€æœ‰å­ Agent çš„æä¾›å•†
  model: "google/gemini-3-flash-preview"      # è¦†ç›–æ¨¡åž‹
  # base_url: "http://localhost:1234/v1"      # æˆ–ä½¿ç”¨ç›´æŽ¥ç«¯ç‚¹
  # api_key: "local-key"
```

å®Œæ•´é…ç½®è¯¦æƒ…å‚è§[å­ Agent å§”æ´¾](/user-guide/features/delegation)ã€‚

---

## Cron ä»»åŠ¡æä¾›å•†

Cron ä»»åŠ¡ä½¿ç”¨æ‰§è¡Œæ—¶é…ç½®çš„æä¾›å•†è¿è¡Œï¼Œä¸æ”¯æŒå¤‡ç”¨æ¨¡åž‹ã€‚è‹¥è¦ä¸º Cron ä»»åŠ¡ä½¿ç”¨ä¸åŒçš„æä¾›å•†ï¼Œè¯·åœ¨ Cron ä»»åŠ¡æœ¬èº«ä¸Šé…ç½® `provider` å’Œ `model` è¦†ç›–ï¼š

```python
cronjob(
    action="create",
    schedule="every 2h",
    prompt="Check server status",
    provider="openrouter",
    model="google/gemini-3-flash-preview"
)
```

å®Œæ•´é…ç½®è¯¦æƒ…å‚è§[å®šæ—¶ä»»åŠ¡ï¼ˆCronï¼‰](/user-guide/features/cron)ã€‚

---

## æ€»ç»“

| åŠŸèƒ½ | å¤‡ç”¨æœºåˆ¶ | é…ç½®ä½ç½® |
|---------|-------------------|----------------|
| ä¸» Agent æ¨¡åž‹ | `fallback_model`ï¼ˆconfig.yaml ä¸­ï¼‰â€”â€”å‡ºé”™æ—¶æŒ‰è½®æ¬¡æ•…éšœè½¬ç§»ï¼ˆæ¯è½®æ¬¡æ¢å¤ä¸»æ¨¡åž‹ï¼‰ | `fallback_model:`ï¼ˆé¡¶å±‚ï¼‰ |
| è¾…åŠ©ä»»åŠ¡ï¼ˆä»»æ„ï¼‰â€” auto ç”¨æˆ· | å®¹é‡é”™è¯¯æ—¶å®Œæ•´è‡ªåŠ¨æ£€æµ‹é“¾ï¼ˆä¸» Agent æ¨¡åž‹ä¼˜å…ˆï¼Œç„¶åŽæä¾›å•†é“¾ï¼‰ | `auxiliary.<task>.provider: auto` |
| è¾…åŠ©ä»»åŠ¡ï¼ˆä»»æ„ï¼‰â€” æ˜¾å¼æä¾›å•† | `fallback_chain`ï¼ˆè‹¥å·²è®¾ç½®ï¼‰â†’ ä¸» Agent æ¨¡åž‹ â†’ è­¦å‘Š + æŠ›å‡ºï¼Œä»…åœ¨å®¹é‡é”™è¯¯æ—¶è§¦å‘ | `auxiliary.<task>.fallback_chain` |
| è§†è§‰ | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰+ å†…éƒ¨ OpenRouter é‡è¯• | `auxiliary.vision` |
| ç½‘é¡µæå– | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰+ å†…éƒ¨ OpenRouter é‡è¯• | `auxiliary.web_extract` |
| ä¸Šä¸‹æ–‡åŽ‹ç¼© | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰ï¼›æ‰€æœ‰å±‚ä¸å¯ç”¨æ—¶é™çº§ä¸ºæ— æ‘˜è¦ | `auxiliary.compression` |
| Skills Hub | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰ | `auxiliary.skills_hub` |
| MCP è¾…åŠ© | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰ | `auxiliary.mcp` |
| å®¡æ‰¹åˆ†ç±» | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰ | `auxiliary.approval` |
| æ ‡é¢˜ç”Ÿæˆ | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰ | `auxiliary.title_generation` |
| Triage Specifier | åˆ†å±‚ï¼ˆè§ä¸Šæ–‡ï¼‰ | `auxiliary.triage_specifier` |
| å§”æ´¾ | ä»…æä¾›å•†è¦†ç›–ï¼ˆæ— è‡ªåŠ¨å¤‡ç”¨ï¼‰ | `delegation.provider` / `delegation.model` |
| Cron ä»»åŠ¡ | ä»…æ¯ä»»åŠ¡æä¾›å•†è¦†ç›–ï¼ˆæ— è‡ªåŠ¨å¤‡ç”¨ï¼‰ | æ¯ä»»åŠ¡ `provider` / `model` |