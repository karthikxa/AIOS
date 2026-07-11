---
sidebar_position: 4
title: "Provider è¿è¡Œæ—¶è§£æž"
description: "Zed å¦‚ä½•åœ¨è¿è¡Œæ—¶è§£æž providerã€å‡­æ®ã€API æ¨¡å¼åŠè¾…åŠ©æ¨¡åž‹"
---

# Provider è¿è¡Œæ—¶è§£æž

Zed æ‹¥æœ‰ä¸€ä¸ªå…±äº«çš„ provider è¿è¡Œæ—¶è§£æžå™¨ï¼Œç”¨äºŽä»¥ä¸‹åœºæ™¯ï¼š

- CLI
- gateway
- cron ä»»åŠ¡
- ACP
- è¾…åŠ©æ¨¡åž‹è°ƒç”¨

ä¸»è¦å®žçŽ°ï¼š

- `zed_cli/runtime_provider.py` â€” å‡­æ®è§£æžï¼Œ`_resolve_custom_runtime()`
- `zed_cli/auth.py` â€” provider æ³¨å†Œè¡¨ï¼Œ`resolve_provider()`
- `zed_cli/model_switch.py` â€” å…±äº« `/model` åˆ‡æ¢æµæ°´çº¿ï¼ˆCLI + gatewayï¼‰
- `agent/auxiliary_client.py` â€” è¾…åŠ©æ¨¡åž‹è·¯ç”±
- `providers/` â€” ABC + æ³¨å†Œè¡¨å…¥å£ç‚¹ï¼ˆ`ProviderProfile`ã€`register_provider`ã€`get_provider_profile`ã€`list_providers`ï¼‰
- `plugins/model-providers/<name>/` â€” æ¯ä¸ª provider çš„æ’ä»¶ï¼ˆå†…ç½®ï¼‰ï¼Œå£°æ˜Ž `api_mode`ã€`base_url`ã€`env_vars`ã€`fallback_models` å¹¶åœ¨é¦–æ¬¡è®¿é—®æ—¶å°†è‡ªèº«æ³¨å†Œåˆ°æ³¨å†Œè¡¨ã€‚ç”¨æˆ·æ’ä»¶ä½äºŽ `$ZED_HOME/plugins/model-providers/<name>/`ï¼Œä¼šè¦†ç›–åŒåçš„å†…ç½®æ’ä»¶ã€‚

`providers/` ä¸­çš„ `get_provider_profile()` ä¸ºç»™å®š provider id è¿”å›žä¸€ä¸ª `ProviderProfile`ã€‚`runtime_provider.py` åœ¨è§£æžæ—¶è°ƒç”¨å®ƒï¼Œä»¥èŽ·å–è§„èŒƒçš„ `base_url`ã€`env_vars` ä¼˜å…ˆçº§åˆ—è¡¨ã€`api_mode` å’Œ `fallback_models`ï¼Œæ— éœ€åœ¨å¤šä¸ªæ–‡ä»¶ä¸­é‡å¤è¿™äº›æ•°æ®ã€‚åœ¨ `plugins/model-providers/<your-provider>/`ï¼ˆæˆ– `$ZED_HOME/plugins/model-providers/<your-provider>/`ï¼‰ä¸‹æ·»åŠ ä¸€ä¸ªè°ƒç”¨ `register_provider()` çš„æ–°æ’ä»¶ï¼Œå³å¯è®© `runtime_provider.py` è‡ªåŠ¨è¯†åˆ«å®ƒâ€”â€”æ— éœ€åœ¨è§£æžå™¨æœ¬èº«ä¸­æ·»åŠ åˆ†æ”¯ã€‚

å¦‚æžœä½ æƒ³æ·»åŠ ä¸€ä¸ªæ–°çš„ä¸€ç­‰æŽ¨ç† providerï¼Œè¯·ç»“åˆæœ¬é¡µé˜…è¯» [æ·»åŠ  Provider](./adding-providers.md) å’Œ [Model Provider æ’ä»¶æŒ‡å—](./model-provider-plugin.md)ã€‚

## è§£æžä¼˜å…ˆçº§

ä»Žé«˜å±‚æ¥çœ‹ï¼Œprovider è§£æžä½¿ç”¨ä»¥ä¸‹é¡ºåºï¼š

1. æ˜¾å¼ CLI/è¿è¡Œæ—¶è¯·æ±‚
2. `config.yaml` ä¸­çš„æ¨¡åž‹/provider é…ç½®
3. çŽ¯å¢ƒå˜é‡
4. provider ç‰¹å®šçš„é»˜è®¤å€¼æˆ–è‡ªåŠ¨è§£æž

è¯¥é¡ºåºå¾ˆé‡è¦ï¼Œå› ä¸º Zed å°†å·²ä¿å­˜çš„æ¨¡åž‹/provider é€‰æ‹©è§†ä¸ºæ­£å¸¸è¿è¡Œçš„çœŸå®žæ¥æºã€‚è¿™å¯ä»¥é˜²æ­¢è¿‡æ—¶çš„ shell å¯¼å‡ºå˜é‡æ‚„æ‚„è¦†ç›–ç”¨æˆ·åœ¨ `zed model` ä¸­æœ€åŽé€‰æ‹©çš„ç«¯ç‚¹ã€‚

## Provider

å½“å‰ provider ç³»åˆ—åŒ…æ‹¬ï¼ˆå®Œæ•´å†…ç½®é›†åˆè§ `plugins/model-providers/`ï¼‰ï¼š

- OpenRouter
- Zed Portal
- OpenAI Codex
- Copilot / Copilot ACP
- Anthropicï¼ˆåŽŸç”Ÿï¼‰
- Google / Geminiï¼ˆ`gemini`ã€`google-gemini-cli`ï¼‰
- Alibaba / DashScopeï¼ˆ`alibaba`ã€`alibaba-coding-plan`ï¼‰
- DeepSeek
- Z.AI
- Kimi / Moonshotï¼ˆ`kimi-coding`ã€`kimi-coding-cn`ï¼‰
- MiniMaxï¼ˆ`minimax`ã€`minimax-cn`ã€`minimax-oauth`ï¼‰
- Kilo Code
- Hugging Face
- OpenCode Zen / OpenCode Go
- AWS Bedrock
- Azure Foundry
- NVIDIA NIM
- xAIï¼ˆGrokï¼‰
- Arcee
- GMI Cloud
- StepFun
- Qwen OAuth
- Xiaomi
- Ollama Cloud
- LM Studio
- Tencent TokenHub
- Customï¼ˆ`provider: custom`ï¼‰â€” é€‚ç”¨äºŽä»»ä½• OpenAI å…¼å®¹ç«¯ç‚¹çš„ä¸€ç­‰ provider
- å‘½åè‡ªå®šä¹‰ providerï¼ˆ`config.yaml` ä¸­çš„ `custom_providers` åˆ—è¡¨ï¼‰

## è¿è¡Œæ—¶è§£æžçš„è¾“å‡º

è¿è¡Œæ—¶è§£æžå™¨è¿”å›žçš„æ•°æ®åŒ…æ‹¬ï¼š

- `provider`
- `api_mode`
- `base_url`
- `api_key`
- `source`
- provider ç‰¹å®šçš„å…ƒæ•°æ®ï¼Œå¦‚è¿‡æœŸ/åˆ·æ–°ä¿¡æ¯

## ä¸ºä»€ä¹ˆè¿™å¾ˆé‡è¦

è¯¥è§£æžå™¨æ˜¯ Zed èƒ½å¤Ÿåœ¨ä»¥ä¸‹åœºæ™¯ä¹‹é—´å…±äº«è®¤è¯/è¿è¡Œæ—¶é€»è¾‘çš„ä¸»è¦åŽŸå› ï¼š

- `zed chat`
- gateway æ¶ˆæ¯å¤„ç†
- åœ¨å…¨æ–°ä¼šè¯ä¸­è¿è¡Œçš„ cron ä»»åŠ¡
- ACP ç¼–è¾‘å™¨ä¼šè¯
- è¾…åŠ©æ¨¡åž‹ä»»åŠ¡

## OpenRouter ä¸Žè‡ªå®šä¹‰ OpenAI å…¼å®¹ base URL

Zed åŒ…å«ç›¸å…³é€»è¾‘ï¼Œä»¥é¿å…åœ¨å­˜åœ¨å¤šä¸ª provider å¯†é’¥æ—¶ï¼ˆä¾‹å¦‚åŒæ—¶å­˜åœ¨ `OPENROUTER_API_KEY` å’Œ `OPENAI_API_KEY`ï¼‰å°†é”™è¯¯çš„ API key æ³„éœ²ç»™è‡ªå®šä¹‰ç«¯ç‚¹ã€‚

æ¯ä¸ª provider çš„ API key ä»…ä½œç”¨äºŽå…¶è‡ªèº«çš„ base URLï¼š

- `OPENROUTER_API_KEY` ä»…å‘é€è‡³ `openrouter.ai` ç«¯ç‚¹
- `OPENAI_API_KEY` ç”¨äºŽè‡ªå®šä¹‰ç«¯ç‚¹åŠä½œä¸ºå›žé€€

Zed è¿˜åŒºåˆ†ä»¥ä¸‹ä¸¤ç§æƒ…å†µï¼š

- ç”¨æˆ·ä¸»åŠ¨é€‰æ‹©çš„çœŸå®žè‡ªå®šä¹‰ç«¯ç‚¹
- æœªé…ç½®è‡ªå®šä¹‰ç«¯ç‚¹æ—¶ä½¿ç”¨çš„ OpenRouter å›žé€€è·¯å¾„

è¿™ç§åŒºåˆ†å¯¹ä»¥ä¸‹åœºæ™¯å°¤ä¸ºé‡è¦ï¼š

- æœ¬åœ°æ¨¡åž‹æœåŠ¡å™¨
- éž OpenRouter çš„ OpenAI å…¼å®¹ API
- æ— éœ€é‡æ–°è¿è¡Œ setup å³å¯åˆ‡æ¢ provider
- é€šè¿‡ config ä¿å­˜çš„è‡ªå®šä¹‰ç«¯ç‚¹ï¼Œå³ä½¿å½“å‰ shell ä¸­æœªå¯¼å‡º `OPENAI_BASE_URL` ä¹Ÿåº”æ­£å¸¸å·¥ä½œ

## åŽŸç”Ÿ Anthropic è·¯å¾„

Anthropic ä¸å†ä»…é™äºŽ"é€šè¿‡ OpenRouter"è®¿é—®ã€‚

å½“ provider è§£æžé€‰æ‹© `anthropic` æ—¶ï¼ŒZed ä½¿ç”¨ï¼š

- `api_mode = anthropic_messages`
- åŽŸç”Ÿ Anthropic Messages API
- `agent/anthropic_adapter.py` è¿›è¡Œè½¬æ¢

åŽŸç”Ÿ Anthropic çš„å‡­æ®è§£æžçŽ°åœ¨åœ¨ä¸¤è€…åŒæ—¶å­˜åœ¨æ—¶ï¼Œä¼˜å…ˆä½¿ç”¨å¯åˆ·æ–°çš„ Claude Code å‡­æ®ï¼Œè€Œéžå¤åˆ¶çš„çŽ¯å¢ƒå˜é‡ tokenã€‚å®žé™…æ•ˆæžœä¸ºï¼š

- åŒ…å«å¯åˆ·æ–°è®¤è¯çš„ Claude Code å‡­æ®æ–‡ä»¶è¢«è§†ä¸ºé¦–é€‰æ¥æº
- æ‰‹åŠ¨è®¾ç½®çš„ `ANTHROPIC_TOKEN` / `CLAUDE_CODE_OAUTH_TOKEN` å€¼ä»å¯ä½œä¸ºæ˜¾å¼è¦†ç›–
- Zed åœ¨è°ƒç”¨åŽŸç”Ÿ Messages API å‰ä¼šé¢„æ£€ Anthropic å‡­æ®åˆ·æ–°
- Zed åœ¨é‡å»º Anthropic å®¢æˆ·ç«¯åŽï¼Œä»ä¼šåœ¨æ”¶åˆ° 401 æ—¶é‡è¯•ä¸€æ¬¡ï¼Œä½œä¸ºå›žé€€è·¯å¾„

## OpenAI Codex è·¯å¾„

Codex ä½¿ç”¨ç‹¬ç«‹çš„ Responses API è·¯å¾„ï¼š

- `api_mode = codex_responses`
- ä¸“ç”¨çš„å‡­æ®è§£æžå’Œè®¤è¯å­˜å‚¨æ”¯æŒ

## è¾…åŠ©æ¨¡åž‹è·¯ç”±

è¾…åŠ©ä»»åŠ¡åŒ…æ‹¬ï¼š

- è§†è§‰
- ç½‘é¡µæå–æ‘˜è¦
- ä¸Šä¸‹æ–‡åŽ‹ç¼©æ‘˜è¦
- skills hub æ“ä½œ
- MCP è¾…åŠ©æ“ä½œ
- è®°å¿†åˆ·æ–°

è¿™äº›ä»»åŠ¡å¯ä»¥ä½¿ç”¨å„è‡ªç‹¬ç«‹çš„ provider/æ¨¡åž‹è·¯ç”±ï¼Œè€Œéžä¸»å¯¹è¯æ¨¡åž‹ã€‚

å½“è¾…åŠ©ä»»åŠ¡é…ç½®çš„ provider ä¸º `main` æ—¶ï¼ŒZed é€šè¿‡ä¸Žæ™®é€šå¯¹è¯ç›¸åŒçš„å…±äº«è¿è¡Œæ—¶è·¯å¾„è¿›è¡Œè§£æžã€‚å®žé™…æ•ˆæžœä¸ºï¼š

- çŽ¯å¢ƒå˜é‡é©±åŠ¨çš„è‡ªå®šä¹‰ç«¯ç‚¹ä»ç„¶æœ‰æ•ˆ
- é€šè¿‡ `zed model` / `config.yaml` ä¿å­˜çš„è‡ªå®šä¹‰ç«¯ç‚¹åŒæ ·æœ‰æ•ˆ
- è¾…åŠ©è·¯ç”±èƒ½å¤ŸåŒºåˆ†çœŸå®žä¿å­˜çš„è‡ªå®šä¹‰ç«¯ç‚¹ä¸Ž OpenRouter å›žé€€

## å›žé€€æ¨¡åž‹

Zed æ”¯æŒé…ç½®å›žé€€ provider é“¾â€”â€”ä¸€ä¸ªæŒ‰é¡ºåºå°è¯•çš„ `(provider, model)` æ¡ç›®åˆ—è¡¨ï¼Œå½“ä¸»æ¨¡åž‹é‡åˆ°é”™è¯¯æ—¶ä¾æ¬¡å°è¯•ã€‚æ—§ç‰ˆå•å¯¹ `fallback_model` å­—å…¸ä»è¢«æŽ¥å—ä»¥ä¿æŒå‘åŽå…¼å®¹ï¼ˆå¹¶åœ¨é¦–æ¬¡å†™å…¥æ—¶è¿ç§»ï¼‰ã€‚

### å†…éƒ¨å·¥ä½œåŽŸç†

1. **å­˜å‚¨**ï¼š`AIAgent.__init__` å­˜å‚¨ `fallback_model` å­—å…¸å¹¶å°† `_fallback_activated` è®¾ä¸º `False`ã€‚

2. **è§¦å‘ç‚¹**ï¼š`_try_activate_fallback()` åœ¨ `run_agent.py` ä¸»é‡è¯•å¾ªçŽ¯çš„ä¸‰å¤„è¢«è°ƒç”¨ï¼š
   - åœ¨æ— æ•ˆ API å“åº”ï¼ˆNone choicesã€ç¼ºå°‘ contentï¼‰è¾¾åˆ°æœ€å¤§é‡è¯•æ¬¡æ•°åŽ
   - åœ¨ä¸å¯é‡è¯•çš„å®¢æˆ·ç«¯é”™è¯¯ï¼ˆHTTP 401ã€403ã€404ï¼‰æ—¶
   - åœ¨çž¬æ—¶é”™è¯¯ï¼ˆHTTP 429ã€500ã€502ã€503ï¼‰è¾¾åˆ°æœ€å¤§é‡è¯•æ¬¡æ•°åŽ

3. **æ¿€æ´»æµç¨‹**ï¼ˆ`_try_activate_fallback`ï¼‰ï¼š
   - è‹¥å·²æ¿€æ´»æˆ–æœªé…ç½®ï¼Œç«‹å³è¿”å›ž `False`
   - è°ƒç”¨ `auxiliary_client.py` ä¸­çš„ `resolve_provider_client()` æž„å»ºå¸¦æœ‰æ­£ç¡®è®¤è¯çš„æ–°å®¢æˆ·ç«¯
   - ç¡®å®š `api_mode`ï¼šopenai-codex ä½¿ç”¨ `codex_responses`ï¼Œanthropic ä½¿ç”¨ `anthropic_messages`ï¼Œå…¶ä½™ä½¿ç”¨ `chat_completions`
   - åŽŸåœ°æ›¿æ¢ï¼š`self.model`ã€`self.provider`ã€`self.base_url`ã€`self.api_mode`ã€`self.client`ã€`self._client_kwargs`
   - å¯¹äºŽ anthropic å›žé€€ï¼šæž„å»ºåŽŸç”Ÿ Anthropic å®¢æˆ·ç«¯è€Œéž OpenAI å…¼å®¹å®¢æˆ·ç«¯
   - é‡æ–°è¯„ä¼° prompt ç¼“å­˜ï¼ˆå¯¹ OpenRouter ä¸Šçš„ Claude æ¨¡åž‹å¯ç”¨ï¼‰
   - å°† `_fallback_activated` è®¾ä¸º `True`â€”â€”é˜²æ­¢å†æ¬¡è§¦å‘
   - å°†é‡è¯•è®¡æ•°é‡ç½®ä¸º 0 å¹¶ç»§ç»­å¾ªçŽ¯

4. **é…ç½®æµç¨‹**ï¼š
   - CLIï¼š`cli.py` è¯»å– `CLI_CONFIG["fallback_model"]` â†’ ä¼ é€’ç»™ `AIAgent(fallback_model=...)`
   - Gatewayï¼š`gateway/run.py._load_fallback_model()` è¯»å– `config.yaml` â†’ ä¼ é€’ç»™ `AIAgent`
   - éªŒè¯ï¼š`provider` å’Œ `model` é”®å‡é¡»éžç©ºï¼Œå¦åˆ™å›žé€€è¢«ç¦ç”¨

### ä¸æ”¯æŒå›žé€€çš„åœºæ™¯

- **å­ä»£ç†å§”æ‰˜**ï¼ˆ`tools/delegate_tool.py`ï¼‰ï¼šå­ä»£ç†ç»§æ‰¿çˆ¶ä»£ç†çš„ providerï¼Œä½†ä¸ç»§æ‰¿å›žé€€é…ç½®
- **è¾…åŠ©ä»»åŠ¡**ï¼šä½¿ç”¨å„è‡ªç‹¬ç«‹çš„ provider è‡ªåŠ¨æ£€æµ‹é“¾ï¼ˆè§ä¸Šæ–¹è¾…åŠ©æ¨¡åž‹è·¯ç”±ï¼‰

Cron ä»»åŠ¡**æ”¯æŒ**å›žé€€ï¼š`run_job()` ä»Ž `config.yaml` è¯»å– `fallback_providers`ï¼ˆæˆ–æ—§ç‰ˆ `fallback_model`ï¼‰å¹¶ä¼ é€’ç»™ `AIAgent(fallback_model=...)`ï¼Œä¸Ž gateway çš„ `_load_fallback_model()` æ¨¡å¼ä¸€è‡´ã€‚å‚è§ [Cron å†…éƒ¨æœºåˆ¶](./cron-internals.md)ã€‚

### æµ‹è¯•è¦†ç›–

å‚è§ `tests/test_fallback_model.py`ï¼Œå…¶ä¸­åŒ…å«è¦†ç›–æ‰€æœ‰æ”¯æŒ providerã€å•æ¬¡è§¦å‘è¯­ä¹‰åŠè¾¹ç•Œæƒ…å†µçš„å®Œæ•´æµ‹è¯•ã€‚

## ç›¸å…³æ–‡æ¡£

- [Agent å¾ªçŽ¯å†…éƒ¨æœºåˆ¶](./agent-loop.md)
- [ACP å†…éƒ¨æœºåˆ¶](./acp-internals.md)
- [ä¸Šä¸‹æ–‡åŽ‹ç¼©ä¸Ž Prompt ç¼“å­˜](./context-compression-and-caching.md)
