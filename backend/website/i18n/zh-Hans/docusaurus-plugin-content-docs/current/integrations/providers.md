---
title: "AI æä¾›å•†"
sidebar_label: "AI æä¾›å•†"
sidebar_position: 1
---

# AI æä¾›å•†

æœ¬é¡µä»‹ç»å¦‚ä½•ä¸º Zed Agent é…ç½®æŽ¨ç†æä¾›å•†â€”â€”ä»Ž OpenRouterã€Anthropic ç­‰äº‘ç«¯ APIï¼Œåˆ° Ollamaã€vLLM ç­‰è‡ªæ‰˜ç®¡ç«¯ç‚¹ï¼Œå†åˆ°é«˜çº§è·¯ç”±ä¸Žæ•…éšœè½¬ç§»é…ç½®ã€‚ä½¿ç”¨ Zed è‡³å°‘éœ€è¦é…ç½®ä¸€ä¸ªæä¾›å•†ã€‚

## æŽ¨ç†æä¾›å•†

ä½ éœ€è¦è‡³å°‘ä¸€ç§æ–¹å¼è¿žæŽ¥åˆ° LLMã€‚ä½¿ç”¨ `zed model` äº¤äº’å¼åˆ‡æ¢æä¾›å•†å’Œæ¨¡åž‹ï¼Œæˆ–ç›´æŽ¥é…ç½®ï¼š

| æä¾›å•† | é…ç½®æ–¹å¼ |
|----------|-------|
| **Zed Portal** | `zed model`ï¼ˆOAuthï¼Œè®¢é˜…åˆ¶ï¼‰ |
| **OpenAI Codex** | `zed model`ï¼ˆChatGPT OAuthï¼Œä½¿ç”¨ Codex æ¨¡åž‹ï¼‰ |
| **GitHub Copilot** | `zed model`ï¼ˆOAuth è®¾å¤‡ç æµç¨‹ï¼Œ`COPILOT_GITHUB_TOKEN`ã€`GH_TOKEN` æˆ– `gh auth token`ï¼‰ |
| **GitHub Copilot ACP** | `zed model`ï¼ˆåœ¨æœ¬åœ°ç”Ÿæˆ `copilot --acp --stdio` å­è¿›ç¨‹ï¼‰ |
| **Anthropic** | `zed model`ï¼ˆClaude Max + é¢å¤–ç”¨é‡ç§¯åˆ†ï¼Œé€šè¿‡ OAuthï¼›ä¹Ÿæ”¯æŒ Anthropic API key æˆ–æ‰‹åŠ¨ setup-tokenâ€”â€”è§ä¸‹æ–¹è¯´æ˜Žï¼‰ |
| **OpenRouter** | `~/.zed/.env` ä¸­çš„ `OPENROUTER_API_KEY` |
| **NovitaAI** | `~/.zed/.env` ä¸­çš„ `NOVITA_API_KEY`ï¼ˆprovider: `novita`ï¼Œ200+ æ¨¡åž‹ï¼ŒModel APIã€Agent Sandboxã€GPU Cloudï¼‰ |
| **z.ai / GLM** | `~/.zed/.env` ä¸­çš„ `GLM_API_KEY`ï¼ˆprovider: `zai`ï¼‰ |
| **Kimi / Moonshot** | `~/.zed/.env` ä¸­çš„ `KIMI_API_KEY`ï¼ˆprovider: `kimi-coding`ï¼‰ |
| **Kimi / Moonshotï¼ˆä¸­å›½ï¼‰** | `~/.zed/.env` ä¸­çš„ `KIMI_CN_API_KEY`ï¼ˆprovider: `kimi-coding-cn`ï¼›åˆ«åï¼š`kimi-cn`ã€`moonshot-cn`ï¼‰ |
| **Arcee AI** | `~/.zed/.env` ä¸­çš„ `ARCEEAI_API_KEY`ï¼ˆprovider: `arcee`ï¼›åˆ«åï¼š`arcee-ai`ã€`arceeai`ï¼‰ |
| **GMI Cloud** | `~/.zed/.env` ä¸­çš„ `GMI_API_KEY`ï¼ˆprovider: `gmi`ï¼›åˆ«åï¼š`gmi-cloud`ã€`gmicloud`ï¼‰ |
| **MiniMax** | `~/.zed/.env` ä¸­çš„ `MINIMAX_API_KEY`ï¼ˆprovider: `minimax`ï¼‰ |
| **MiniMax ä¸­å›½** | `~/.zed/.env` ä¸­çš„ `MINIMAX_CN_API_KEY`ï¼ˆprovider: `minimax-cn`ï¼‰ |
| **xAIï¼ˆGrokï¼‰â€” Responses API** | `~/.zed/.env` ä¸­çš„ `XAI_API_KEY`ï¼ˆprovider: `xai`ï¼‰ |
| **xAI Grok OAuthï¼ˆSuperGrokï¼‰** | `zed model` â†’ "xAI Grok OAuth (SuperGrok / Premium+)"â€”â€”æµè§ˆå™¨ç™»å½•ï¼Œæ— éœ€ API keyã€‚å‚è§[æŒ‡å—](../guides/xai-grok-oauth.md) |
| **Qwen Cloudï¼ˆé˜¿é‡Œ DashScopeï¼‰** | `~/.zed/.env` ä¸­çš„ `DASHSCOPE_API_KEY`ï¼ˆprovider: `alibaba`ï¼‰ |
| **é˜¿é‡Œäº‘ï¼ˆCoding Planï¼‰** | `DASHSCOPE_API_KEY`ï¼ˆprovider: `alibaba-coding-plan`ï¼Œåˆ«åï¼š`alibaba_coding`ï¼‰â€”â€”ç‹¬ç«‹è®¡è´¹ SKUï¼Œä¸åŒç«¯ç‚¹ |
| **Kilo Code** | `~/.zed/.env` ä¸­çš„ `KILOCODE_API_KEY`ï¼ˆprovider: `kilocode`ï¼‰ |
| **å°ç±³ MiMo** | `~/.zed/.env` ä¸­çš„ `XIAOMI_API_KEY`ï¼ˆprovider: `xiaomi`ï¼Œåˆ«åï¼š`mimo`ã€`xiaomi-mimo`ï¼‰ |
| **è…¾è®¯ TokenHub** | `~/.zed/.env` ä¸­çš„ `TOKENHUB_API_KEY`ï¼ˆprovider: `tencent-tokenhub`ï¼Œåˆ«åï¼š`tencent`ã€`tokenhub`ã€`tencentmaas`ï¼‰ |
| **OpenCode Zen** | `~/.zed/.env` ä¸­çš„ `OPENCODE_ZEN_API_KEY`ï¼ˆprovider: `opencode-zen`ï¼‰ |
| **OpenCode Go** | `~/.zed/.env` ä¸­çš„ `OPENCODE_GO_API_KEY`ï¼ˆprovider: `opencode-go`ï¼‰ |
| **DeepSeek** | `~/.zed/.env` ä¸­çš„ `DEEPSEEK_API_KEY`ï¼ˆprovider: `deepseek`ï¼‰ |
| **Hugging Face** | `~/.zed/.env` ä¸­çš„ `HF_TOKEN`ï¼ˆprovider: `huggingface`ï¼Œåˆ«åï¼š`hf`ï¼‰ |
| **Google / Gemini** | `~/.zed/.env` ä¸­çš„ `GOOGLE_API_KEY`ï¼ˆæˆ– `GEMINI_API_KEY`ï¼‰ï¼ˆprovider: `gemini`ï¼‰ |
| **Google Geminiï¼ˆOAuthï¼‰** | `zed model` â†’ "Google Gemini (OAuth)"ï¼ˆprovider: `google-gemini-cli`ï¼Œæ”¯æŒå…è´¹å±‚ï¼Œæµè§ˆå™¨ PKCE ç™»å½•ï¼‰ |
| **LM Studio** | `zed model` â†’ "LM Studio"ï¼ˆprovider: `lmstudio`ï¼Œå¯é€‰ `LM_API_KEY`ï¼‰ |
| **è‡ªå®šä¹‰ç«¯ç‚¹** | `zed model` â†’ é€‰æ‹©"Custom endpoint"ï¼ˆä¿å­˜åœ¨ `config.yaml`ï¼‰ |

å®˜æ–¹ API key è·¯å¾„è¯·å‚è§ä¸“å±žçš„ [Google Gemini æŒ‡å—](/guides/google-gemini)ã€‚

:::tip æ¨¡åž‹ key åˆ«å
åœ¨ `model:` é…ç½®èŠ‚ä¸­ï¼Œå¯ä»¥ä½¿ç”¨ `default:` æˆ– `model:` ä½œä¸ºæ¨¡åž‹ ID çš„é”®åã€‚`model: { default: my-model }` å’Œ `model: { model: my-model }` æ•ˆæžœå®Œå…¨ç›¸åŒã€‚
:::


### Zed Portal

[Zed Portal](https://portal.zedteam.com) æ˜¯ Zed Team çš„ç»Ÿä¸€è®¢é˜…ç½‘å…³ï¼Œä¹Ÿæ˜¯**è¿è¡Œ Zed Agent çš„æŽ¨èæ–¹å¼**ã€‚ä¸€æ¬¡ OAuth ç™»å½•å³å¯è®¿é—® 300+ å‰æ²¿æ™ºèƒ½ä½“æ¨¡åž‹ï¼ˆClaudeã€GPTã€Geminiã€DeepSeekã€Qwenã€Kimiã€GLMã€MiniMaxã€Grok ç­‰ï¼‰ï¼Œä»¥åŠ [Tool Gateway](/user-guide/features/tool-gateway)ï¼ˆç½‘é¡µæœç´¢ã€å›¾åƒç”Ÿæˆã€TTSã€æµè§ˆå™¨è‡ªåŠ¨åŒ–ï¼‰å’Œ [Nous Chat](https://chat.zedteam.com)â€”â€”è´¹ç”¨ä»Žä½ çš„ Nous è®¢é˜…ä¸­æ‰£é™¤ï¼Œæ— éœ€å•ç‹¬ç®¡ç†å„æä¾›å•†è´¦æˆ·ã€‚

```bash
zed setup --portal     # å…¨æ–°å®‰è£…â€”â€”ä¸€æ¡å‘½ä»¤å®Œæˆ OAuth + æä¾›å•† + ç½‘å…³é…ç½®
zed model              # å·²æœ‰å®‰è£…â€”â€”ä»Žåˆ—è¡¨ä¸­é€‰æ‹©"Zed Portal"
zed portal info        # éšæ—¶æŸ¥çœ‹ç™»å½•çŠ¶æ€å’Œè·¯ç”±ä¿¡æ¯
```

è¿˜æ²¡æœ‰è®¢é˜…ï¼Ÿå‰å¾€ [portal.zedteam.com/manage-subscription](https://portal.zedteam.com/manage-subscription) è´­ä¹°ã€‚

**å®Œæ•´è¯¦æƒ…ï¼š** å‚è§ä¸“å±žçš„ [Zed Portal é›†æˆé¡µé¢](/integrations/nous-portal)ï¼ˆè®¢é˜…å†…å®¹ã€æ¨¡åž‹ç›®å½•ã€æ•…éšœæŽ’æŸ¥ï¼‰ä»¥åŠåˆ†æ­¥æŒ‡å—[ä½¿ç”¨ Zed Portal è¿è¡Œ Zed Agent](/guides/run-zed-with-nous-portal)ã€‚


:::info Codex è¯´æ˜Ž
OpenAI Codex æä¾›å•†é€šè¿‡è®¾å¤‡ç ï¼ˆdevice codeï¼‰è®¤è¯â€”â€”æ‰“å¼€ä¸€ä¸ª URL å¹¶è¾“å…¥éªŒè¯ç ã€‚Zed å°†ç”Ÿæˆçš„å‡­æ®å­˜å‚¨åœ¨ `~/.zed/auth.json` çš„è‡ªæœ‰è®¤è¯å­˜å‚¨ä¸­ï¼Œå¹¶åœ¨å­˜åœ¨ `~/.codex/auth.json` æ—¶å¯å¯¼å…¥çŽ°æœ‰çš„ Codex CLI å‡­æ®ã€‚æ— éœ€å®‰è£… Codex CLIã€‚

å¦‚æžœ token åˆ·æ–°å› ç»ˆç«¯é”™è¯¯ï¼ˆHTTP 4xxã€`invalid_grant`ã€æŽˆæƒè¢«æ’¤é”€ç­‰ï¼‰å¤±è´¥ï¼ŒZed ä¼šå°†è¯¥åˆ·æ–° token æ ‡è®°ä¸ºå¤±æ•ˆå¹¶åœæ­¢é‡è¯•ï¼Œé¿å…å‡ºçŽ°å¤§é‡é‡å¤çš„è®¤è¯å¤±è´¥ã€‚ä¸‹ä¸€æ¬¡è¯·æ±‚ä¼šæ˜¾ç¤ºç±»åž‹åŒ–çš„é‡æ–°è®¤è¯æç¤ºã€‚è¿è¡Œ `zed auth add codex-oauth`ï¼ˆæˆ– `zed model` â†’ OpenAI Codexï¼‰å¼€å§‹æ–°çš„è®¾å¤‡ç ç™»å½•ï¼›æˆåŠŸäº¤æ¢åŽéš”ç¦»çŠ¶æ€è‡ªåŠ¨è§£é™¤ã€‚
:::

:::warning
å³ä½¿ä½¿ç”¨ Zed Portalã€Codex æˆ–è‡ªå®šä¹‰ç«¯ç‚¹ï¼ŒæŸäº›å·¥å…·ï¼ˆè§†è§‰ã€ç½‘é¡µæ‘˜è¦ã€MoAï¼‰ä»ä¼šä½¿ç”¨å•ç‹¬çš„"è¾…åŠ©"æ¨¡åž‹ã€‚é»˜è®¤æƒ…å†µä¸‹ï¼ˆ`auxiliary.*.provider: "auto"`ï¼‰ï¼ŒZed å°†è¿™äº›ä»»åŠ¡è·¯ç”±åˆ°ä½ çš„**ä¸»èŠå¤©æ¨¡åž‹**â€”â€”å³ä½ åœ¨ `zed model` ä¸­é€‰æ‹©çš„åŒä¸€æ¨¡åž‹ã€‚ä½ å¯ä»¥å•ç‹¬è¦†ç›–æ¯ä¸ªä»»åŠ¡ï¼Œå°†å…¶è·¯ç”±åˆ°æ›´ä¾¿å®œ/æ›´å¿«çš„æ¨¡åž‹ï¼ˆä¾‹å¦‚ OpenRouter ä¸Šçš„ Gemini Flashï¼‰â€”â€”å‚è§[è¾…åŠ©æ¨¡åž‹](/user-guide/configuration#auxiliary-models)ã€‚
:::

:::tip Nous Tool Gateway
ä»˜è´¹ Zed Portal è®¢é˜…è€…è¿˜å¯è®¿é—® **[Tool Gateway](/user-guide/features/tool-gateway)**â€”â€”ç½‘é¡µæœç´¢ã€å›¾åƒç”Ÿæˆã€TTS å’Œæµè§ˆå™¨è‡ªåŠ¨åŒ–ï¼Œå‡é€šè¿‡ä½ çš„è®¢é˜…è·¯ç”±ã€‚æ— éœ€é¢å¤– API keyã€‚å…¨æ–°å®‰è£…æ—¶ï¼Œ`zed setup --portal` ä¸€æ¡å‘½ä»¤å³å¯å®Œæˆç™»å½•ã€è®¾ç½® Nous ä¸ºæä¾›å•†å¹¶å¼€å¯ç½‘å…³ã€‚çŽ°æœ‰ç”¨æˆ·å¯é€šè¿‡ `zed model` æˆ– `zed tools` æŒ‰å·¥å…·å¯ç”¨ã€‚éšæ—¶ä½¿ç”¨ `zed portal info` æŸ¥çœ‹è·¯ç”±çŠ¶æ€ã€‚
:::

### æ¨¡åž‹ç®¡ç†çš„ä¸¤ä¸ªå‘½ä»¤

Zed æœ‰**ä¸¤ä¸ª**æ¨¡åž‹å‘½ä»¤ï¼Œç”¨é€”ä¸åŒï¼š

| å‘½ä»¤ | è¿è¡Œä½ç½® | åŠŸèƒ½ |
|---------|-------------|--------------|
| **`zed model`** | ç»ˆç«¯ï¼ˆä»»ä½•ä¼šè¯ä¹‹å¤–ï¼‰ | å®Œæ•´é…ç½®å‘å¯¼â€”â€”æ·»åŠ æä¾›å•†ã€è¿è¡Œ OAuthã€è¾“å…¥ API keyã€é…ç½®ç«¯ç‚¹ |
| **`/model`** | Zed èŠå¤©ä¼šè¯å†…éƒ¨ | åœ¨**å·²é…ç½®çš„**æä¾›å•†å’Œæ¨¡åž‹ä¹‹é—´å¿«é€Ÿåˆ‡æ¢ |

å¦‚æžœä½ æƒ³åˆ‡æ¢åˆ°å°šæœªé…ç½®çš„æä¾›å•†ï¼ˆä¾‹å¦‚ä½ åªé…ç½®äº† OpenRouterï¼Œæƒ³ä½¿ç”¨ Anthropicï¼‰ï¼Œéœ€è¦ä½¿ç”¨ `zed model`ï¼Œè€Œä¸æ˜¯ `/model`ã€‚å…ˆé€€å‡ºä¼šè¯ï¼ˆ`Ctrl+C` æˆ– `/quit`ï¼‰ï¼Œè¿è¡Œ `zed model`ï¼Œå®Œæˆæä¾›å•†é…ç½®ï¼Œç„¶åŽå¼€å¯æ–°ä¼šè¯ã€‚


### Anthropicï¼ˆåŽŸç”Ÿï¼‰

é€šè¿‡ Anthropic API ç›´æŽ¥ä½¿ç”¨ Claude æ¨¡åž‹â€”â€”æ— éœ€ OpenRouter ä»£ç†ã€‚æ”¯æŒä¸‰ç§è®¤è¯æ–¹å¼ï¼š

:::caution éœ€è¦ Claude Max"é¢å¤–ç”¨é‡"ç§¯åˆ†
é€šè¿‡ `zed model` â†’ Anthropic OAuthï¼ˆæˆ– `zed auth add anthropic --type oauth`ï¼‰è®¤è¯æ—¶ï¼ŒZed ä»¥ Claude Code èº«ä»½è·¯ç”±åˆ°ä½ çš„ Anthropic è´¦æˆ·ã€‚**ä»…å½“ä½ è®¢é˜…äº† Claude Max è®¡åˆ’ä¸”è´­ä¹°äº†é¢å¤–ç”¨é‡ç§¯åˆ†æ—¶æ‰æœ‰æ•ˆã€‚** Claude Max åŸºç¡€è®¡åˆ’çš„é…é¢ï¼ˆClaude Code é»˜è®¤åŒ…å«çš„ç”¨é‡ï¼‰ä¸ä¼šè¢« Zed æ¶ˆè€—â€”â€”åªæœ‰ä½ é¢å¤–è´­ä¹°çš„è¶…é¢ç§¯åˆ†æ‰ä¼šè¢«ä½¿ç”¨ã€‚Claude Pro è®¢é˜…è€…æ— æ³•ä½¿ç”¨æ­¤è·¯å¾„ã€‚

å¦‚æžœä½ æ²¡æœ‰ Max + é¢å¤–ç§¯åˆ†ï¼Œè¯·æ”¹ç”¨ `ANTHROPIC_API_KEY`â€”â€”è¯·æ±‚å°†æŒ‰ token è®¡è´¹ï¼Œä»Žè¯¥ key æ‰€å±žç»„ç»‡æ‰£è´¹ï¼ˆæ ‡å‡† API å®šä»·ï¼Œä¸Žä»»ä½• Claude è®¢é˜…æ— å…³ï¼‰ã€‚
:::

```bash
# ä½¿ç”¨ API keyï¼ˆæŒ‰ token è®¡è´¹ï¼‰
export ANTHROPIC_API_KEY=***
zed chat --provider anthropic --model claude-sonnet-4-6

# æŽ¨èï¼šé€šè¿‡ `zed model` è®¤è¯
# å¦‚æžœå·²ä½¿ç”¨ Claude Codeï¼ŒZed ä¼šç›´æŽ¥ä½¿ç”¨å…¶å‡­æ®å­˜å‚¨
zed model

# ä½¿ç”¨ setup-token æ‰‹åŠ¨è¦†ç›–ï¼ˆå¤‡ç”¨/æ—§ç‰ˆï¼‰
export ANTHROPIC_TOKEN=***  # setup-token æˆ–æ‰‹åŠ¨ OAuth token
zed chat --provider anthropic

# è‡ªåŠ¨æ£€æµ‹ Claude Code å‡­æ®ï¼ˆå¦‚æžœä½ å·²ä½¿ç”¨ Claude Codeï¼‰
zed chat --provider anthropic  # è‡ªåŠ¨è¯»å– Claude Code å‡­æ®æ–‡ä»¶
```

é€šè¿‡ `zed model` é€‰æ‹© Anthropic OAuth æ—¶ï¼ŒZed ä¼˜å…ˆä½¿ç”¨ Claude Code è‡ªèº«çš„å‡­æ®å­˜å‚¨ï¼Œè€Œä¸æ˜¯å°† token å¤åˆ¶åˆ° `~/.zed/.env`ã€‚è¿™æ ·å¯ä»¥ä¿æŒ Claude å‡­æ®çš„å¯åˆ·æ–°æ€§ã€‚

æˆ–æ°¸ä¹…è®¾ç½®ï¼š
```yaml
model:
  provider: "anthropic"
  default: "claude-sonnet-4-6"
```

:::tip åˆ«å
`--provider claude` å’Œ `--provider claude-code` ä¹Ÿå¯ä½œä¸º `--provider anthropic` çš„ç®€å†™ã€‚
:::

### GitHub Copilot

Zed ä»¥ä¸€ç­‰æä¾›å•†èº«ä»½æ”¯æŒ GitHub Copilotï¼Œæä¾›ä¸¤ç§æ¨¡å¼ï¼š

**`copilot` â€” ç›´è¿ž Copilot API**ï¼ˆæŽ¨èï¼‰ã€‚ä½¿ç”¨ä½ çš„ GitHub Copilot è®¢é˜…ï¼Œé€šè¿‡ Copilot API è®¿é—® GPT-5.xã€Claudeã€Gemini ç­‰æ¨¡åž‹ã€‚

```bash
zed chat --provider copilot --model gpt-5.4
```

**è®¤è¯é€‰é¡¹**ï¼ˆæŒ‰ä»¥ä¸‹é¡ºåºæ£€æŸ¥ï¼‰ï¼š

1. `COPILOT_GITHUB_TOKEN` çŽ¯å¢ƒå˜é‡
2. `GH_TOKEN` çŽ¯å¢ƒå˜é‡
3. `GITHUB_TOKEN` çŽ¯å¢ƒå˜é‡
4. `gh auth token` CLI å›žé€€

å¦‚æžœæœªæ‰¾åˆ° tokenï¼Œ`zed model` ä¼šæä¾› **OAuth è®¾å¤‡ç ç™»å½•**â€”â€”ä¸Ž Copilot CLI å’Œ opencode ä½¿ç”¨çš„æµç¨‹ç›¸åŒã€‚

:::warning Token ç±»åž‹
Copilot API **ä¸**æ”¯æŒç»å…¸ä¸ªäººè®¿é—® tokenï¼ˆ`ghp_*`ï¼‰ã€‚æ”¯æŒçš„ token ç±»åž‹ï¼š

| ç±»åž‹ | å‰ç¼€ | èŽ·å–æ–¹å¼ |
|------|--------|------------|
| OAuth token | `gho_` | `zed model` â†’ GitHub Copilot â†’ ä½¿ç”¨ GitHub ç™»å½• |
| ç»†ç²’åº¦ PAT | `github_pat_` | GitHub è®¾ç½® â†’ å¼€å‘è€…è®¾ç½® â†’ ç»†ç²’åº¦ tokenï¼ˆéœ€è¦ **Copilot Requests** æƒé™ï¼‰ |
| GitHub App token | `ghu_` | é€šè¿‡ GitHub App å®‰è£…èŽ·å– |

å¦‚æžœä½ çš„ `gh auth token` è¿”å›ž `ghp_*` tokenï¼Œè¯·ä½¿ç”¨ `zed model` é€šè¿‡ OAuth è®¤è¯ã€‚
:::

:::info Zed ä¸­çš„ Copilot è®¤è¯è¡Œä¸º
Zed å°†æ”¯æŒçš„ GitHub tokenï¼ˆ`gho_*`ã€`github_pat_*` æˆ– `ghu_*`ï¼‰ç›´æŽ¥å‘é€åˆ° `api.githubcopilot.com`ï¼Œå¹¶é™„å¸¦ Copilot ä¸“ç”¨è¯·æ±‚å¤´ï¼ˆ`Editor-Version`ã€`Copilot-Integration-Id`ã€`Openai-Intent`ã€`x-initiator`ï¼‰ã€‚

æ”¶åˆ° HTTP 401 æ—¶ï¼ŒZed åœ¨å›žé€€å‰ä¼šæ‰§è¡Œä¸€æ¬¡æ€§å‡­æ®æ¢å¤ï¼š

1. é€šè¿‡æ­£å¸¸ä¼˜å…ˆçº§é“¾é‡æ–°è§£æž tokenï¼ˆ`COPILOT_GITHUB_TOKEN` â†’ `GH_TOKEN` â†’ `GITHUB_TOKEN` â†’ `gh auth token`ï¼‰
2. ä½¿ç”¨åˆ·æ–°åŽçš„è¯·æ±‚å¤´é‡å»ºå…±äº« OpenAI å®¢æˆ·ç«¯
3. é‡è¯•è¯·æ±‚ä¸€æ¬¡

éƒ¨åˆ†æ—§ç‰ˆç¤¾åŒºä»£ç†ä½¿ç”¨ `api.github.com/copilot_internal/v2/token` äº¤æ¢æµç¨‹ã€‚è¯¥ç«¯ç‚¹å¯¹æŸäº›è´¦æˆ·ç±»åž‹å¯èƒ½ä¸å¯ç”¨ï¼ˆè¿”å›ž 404ï¼‰ã€‚å› æ­¤ Zed ä»¥ç›´æŽ¥ token è®¤è¯ä¸ºä¸»è·¯å¾„ï¼Œä¾é è¿è¡Œæ—¶å‡­æ®åˆ·æ–° + é‡è¯•ä¿è¯å¥å£®æ€§ã€‚
:::

**API è·¯ç”±**ï¼šGPT-5+ æ¨¡åž‹ï¼ˆ`gpt-5-mini` é™¤å¤–ï¼‰è‡ªåŠ¨ä½¿ç”¨ Responses APIã€‚å…¶ä»–æ‰€æœ‰æ¨¡åž‹ï¼ˆGPT-4oã€Claudeã€Gemini ç­‰ï¼‰ä½¿ç”¨ Chat Completionsã€‚æ¨¡åž‹ä»Ž Copilot å®žæ—¶ç›®å½•è‡ªåŠ¨æ£€æµ‹ã€‚

**`copilot-acp` â€” Copilot ACP æ™ºèƒ½ä½“åŽç«¯**ã€‚å°†æœ¬åœ° Copilot CLI ä½œä¸ºå­è¿›ç¨‹å¯åŠ¨ï¼š

```bash
zed chat --provider copilot-acp --model copilot-acp
# éœ€è¦ PATH ä¸­å­˜åœ¨ GitHub Copilot CLI ä¸”å·²å®Œæˆ `copilot login`
```

**æ°¸ä¹…é…ç½®ï¼š**
```yaml
model:
  provider: "copilot"
  default: "gpt-5.4"
```

| çŽ¯å¢ƒå˜é‡ | è¯´æ˜Ž |
|---------------------|-------------|
| `COPILOT_GITHUB_TOKEN` | Copilot API çš„ GitHub tokenï¼ˆæœ€é«˜ä¼˜å…ˆçº§ï¼‰ |
| `ZED_COPILOT_ACP_COMMAND` | è¦†ç›– Copilot CLI äºŒè¿›åˆ¶è·¯å¾„ï¼ˆé»˜è®¤ï¼š`copilot`ï¼‰ |
| `ZED_COPILOT_ACP_ARGS` | è¦†ç›– ACP å‚æ•°ï¼ˆé»˜è®¤ï¼š`--acp --stdio`ï¼‰ |

### ä¸€ç­‰ API Key æä¾›å•†

è¿™äº›æä¾›å•†å†…ç½®æ”¯æŒï¼Œå…·æœ‰ä¸“å±žæä¾›å•† IDã€‚è®¾ç½® API key åŽä½¿ç”¨ `--provider` é€‰æ‹©ï¼š

```bash
# NovitaAI Model API
zed chat --provider novita --model moonshotai/kimi-k2.5
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ NOVITA_API_KEY

# z.ai / ZhipuAI GLM
zed chat --provider zai --model glm-5
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ GLM_API_KEY

# Kimi / Moonshot AIï¼ˆå›½é™…ç‰ˆï¼šapi.moonshot.aiï¼‰
zed chat --provider kimi-coding --model kimi-for-coding
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ KIMI_API_KEY

# Kimi / Moonshot AIï¼ˆä¸­å›½ç‰ˆï¼šapi.moonshot.cnï¼‰
zed chat --provider kimi-coding-cn --model kimi-k2.5
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ KIMI_CN_API_KEY

# MiniMaxï¼ˆå…¨çƒç«¯ç‚¹ï¼‰
zed chat --provider minimax --model MiniMax-M2.7
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ MINIMAX_API_KEY

# MiniMaxï¼ˆä¸­å›½ç«¯ç‚¹ï¼‰
zed chat --provider minimax-cn --model MiniMax-M2.7
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ MINIMAX_CN_API_KEY

# Qwen Cloud / DashScopeï¼ˆQwen æ¨¡åž‹ï¼‰
zed chat --provider alibaba --model qwen3.5-plus
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ DASHSCOPE_API_KEY

# å°ç±³ MiMo
zed chat --provider xiaomi --model mimo-v2-pro
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ XIAOMI_API_KEY

# è…¾è®¯ TokenHubï¼ˆHy3 Previewï¼‰
zed chat --provider tencent-tokenhub --model hy3-preview
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ TOKENHUB_API_KEY

# Arcee AIï¼ˆTrinity æ¨¡åž‹ï¼‰
zed chat --provider arcee --model trinity-large-thinking
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ ARCEEAI_API_KEY

# GMI Cloud
# ä½¿ç”¨ GMI /v1/models ç«¯ç‚¹è¿”å›žçš„ç²¾ç¡®æ¨¡åž‹ IDã€‚
zed chat --provider gmi --model zai-org/GLM-5.1-FP8
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ GMI_API_KEY
```

æˆ–åœ¨ `config.yaml` ä¸­æ°¸ä¹…è®¾ç½®æä¾›å•†ï¼š
```yaml
model:
  provider: "gmi"
  default: "zai-org/GLM-5.1-FP8"
```

åŸºç¡€ URL å¯é€šè¿‡ `NOVITA_BASE_URL`ã€`GLM_BASE_URL`ã€`KIMI_BASE_URL`ã€`MINIMAX_BASE_URL`ã€`MINIMAX_CN_BASE_URL`ã€`DASHSCOPE_BASE_URL`ã€`XIAOMI_BASE_URL`ã€`GMI_BASE_URL` æˆ– `TOKENHUB_BASE_URL` çŽ¯å¢ƒå˜é‡è¦†ç›–ã€‚

:::note Z.AI ç«¯ç‚¹è‡ªåŠ¨æ£€æµ‹
ä½¿ç”¨ Z.AI / GLM æä¾›å•†æ—¶ï¼ŒZed ä¼šè‡ªåŠ¨æŽ¢æµ‹å¤šä¸ªç«¯ç‚¹ï¼ˆå…¨çƒç‰ˆã€ä¸­å›½ç‰ˆã€ç¼–ç¨‹ç‰ˆï¼‰ä»¥æ‰¾åˆ°æŽ¥å—ä½  API key çš„ç«¯ç‚¹ã€‚æ— éœ€æ‰‹åŠ¨è®¾ç½® `GLM_BASE_URL`â€”â€”å¯ç”¨ç«¯ç‚¹ä¼šè¢«è‡ªåŠ¨æ£€æµ‹å¹¶ç¼“å­˜ã€‚
:::

### xAIï¼ˆGrokï¼‰â€” Responses API + Prompt ç¼“å­˜

xAI é€šè¿‡ Responses APIï¼ˆ`codex_responses` ä¼ è¾“ï¼‰æŽ¥å…¥ï¼Œè‡ªåŠ¨æ”¯æŒ Grok 4 æ¨¡åž‹çš„æŽ¨ç†â€”â€”æ— éœ€ `reasoning_effort` å‚æ•°ï¼ŒæœåŠ¡ç«¯é»˜è®¤è¿›è¡ŒæŽ¨ç†ã€‚åœ¨ `~/.zed/.env` ä¸­è®¾ç½® `XAI_API_KEY` å¹¶åœ¨ `zed model` ä¸­é€‰æ‹© xAIï¼Œæˆ–ç›´æŽ¥ç”¨ `grok` ä½œä¸ºå¿«æ·æ–¹å¼è¾“å…¥ `/model grok-4-1-fast-reasoning`ã€‚

SuperGrok å’Œ X Premium+ è®¢é˜…è€…å¯ä»¥ç”¨æµè§ˆå™¨ OAuth ç™»å½•ï¼Œæ— éœ€ API keyâ€”â€”åœ¨ `zed model` ä¸­é€‰æ‹© **xAI Grok OAuth (SuperGrok / Premium+)**ï¼Œæˆ–è¿è¡Œ `zed auth add xai-oauth`ã€‚åŒä¸€ OAuth bearer token ä¼šè¢« xAI ç›´è¿žå·¥å…·ï¼ˆTTSã€å›¾åƒç”Ÿæˆã€è§†é¢‘ç”Ÿæˆã€è½¬å½•ï¼‰è‡ªåŠ¨å¤ç”¨ã€‚å®Œæ•´æµç¨‹å‚è§ [xAI Grok OAuth æŒ‡å—](../guides/xai-grok-oauth.md)â€”â€”å¦‚æžœ Zed è¿è¡Œåœ¨è¿œç¨‹ä¸»æœºä¸Šï¼Œè¿˜éœ€å‚è§ [SSH / è¿œç¨‹ä¸»æœºä¸Šçš„ OAuth](../guides/oauth-over-ssh.md) äº†è§£æ‰€éœ€çš„ `ssh -L` éš§é“é…ç½®ã€‚

ä½¿ç”¨ xAI ä½œä¸ºæä¾›å•†æ—¶ï¼ˆä»»ä½•åŒ…å« `x.ai` çš„åŸºç¡€ URLï¼‰ï¼ŒZed ä¼šåœ¨æ¯æ¬¡ API è¯·æ±‚ä¸­è‡ªåŠ¨å‘é€ `x-grok-conv-id` è¯·æ±‚å¤´ä»¥å¯ç”¨ promptï¼ˆæç¤ºè¯ï¼‰ç¼“å­˜ã€‚è¿™ä¼šå°†åŒä¸€ä¼šè¯çš„è¯·æ±‚è·¯ç”±åˆ°åŒä¸€æœåŠ¡å™¨ï¼Œä½¿ xAI åŸºç¡€è®¾æ–½èƒ½å¤Ÿå¤ç”¨å·²ç¼“å­˜çš„ç³»ç»Ÿ prompt å’Œå¯¹è¯åŽ†å²ã€‚

æ— éœ€ä»»ä½•é…ç½®â€”â€”æ£€æµ‹åˆ° xAI ç«¯ç‚¹ä¸”å­˜åœ¨ä¼šè¯ ID æ—¶ï¼Œç¼“å­˜è‡ªåŠ¨æ¿€æ´»ã€‚è¿™å¯é™ä½Žå¤šè½®å¯¹è¯çš„å»¶è¿Ÿå’Œæˆæœ¬ã€‚

xAI è¿˜æä¾›ä¸“å±ž TTS ç«¯ç‚¹ï¼ˆ`/v1/tts`ï¼‰ã€‚åœ¨ `zed tools` â†’ è¯­éŸ³ä¸Ž TTS ä¸­é€‰æ‹© **xAI TTS**ï¼Œæˆ–å‚è§[è¯­éŸ³ä¸Ž TTS](../user-guide/features/tts.md#text-to-speech) é¡µé¢äº†è§£é…ç½®ã€‚

### NovitaAI

[NovitaAI](https://novita.ai) æ˜¯é¢å‘å¼€å‘è€…å’Œæ™ºèƒ½ä½“çš„ AI åŽŸç”Ÿäº‘å¹³å°ã€‚ä¸‰æ¡äº§å“çº¿ï¼š200+ æ¨¡åž‹çš„ Model APIã€ç”¨äºŽæž„å»ºå’Œè¿è¡Œ AI æ™ºèƒ½ä½“çš„ Agent Sandboxï¼Œä»¥åŠå¯æ‰©å±•è®¡ç®—çš„ GPU Cloudï¼Œå‡å¯ä»ŽåŒä¸€å¹³å°è®¿é—®ã€‚

```bash
# ä½¿ç”¨ä»»æ„å¯ç”¨æ¨¡åž‹
zed chat --provider novita --model moonshotai/kimi-k2.5
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ NOVITA_API_KEY

# çŸ­åˆ«å
zed chat --provider novita-ai --model deepseek/deepseek-v3-0324
```

æˆ–åœ¨ `config.yaml` ä¸­æ°¸ä¹…è®¾ç½®ï¼š
```yaml
model:
  provider: "novita"
  default: "moonshotai/kimi-k2.5"
  base_url: "https://api.novita.ai/openai/v1"
```

åœ¨ [novita.ai/settings/key-management](https://novita.ai/settings/key-management) èŽ·å– API keyã€‚åŸºç¡€ URL å¯é€šè¿‡ `NOVITA_BASE_URL` è¦†ç›–ã€‚

### Ollama Cloud â€” æ‰˜ç®¡ Ollama æ¨¡åž‹ï¼ŒOAuth + API Key

[Ollama Cloud](https://ollama.com/cloud) æ‰˜ç®¡ä¸Žæœ¬åœ° Ollama ç›¸åŒçš„å¼€æºæ¨¡åž‹ç›®å½•ï¼Œæ— éœ€ GPUã€‚åœ¨ `zed model` ä¸­é€‰æ‹© **Ollama Cloud**ï¼Œç²˜è´´æ¥è‡ª [ollama.com/settings/keys](https://ollama.com/settings/keys) çš„ API keyï¼ŒZed ä¼šè‡ªåŠ¨å‘çŽ°å¯ç”¨æ¨¡åž‹ã€‚

```bash
zed model
# â†’ é€‰æ‹©"Ollama Cloud"
# â†’ ç²˜è´´ä½ çš„ OLLAMA_API_KEY
# â†’ ä»Žå·²å‘çŽ°çš„æ¨¡åž‹ä¸­é€‰æ‹©ï¼ˆgpt-oss:120bã€glm-4.6:cloudã€qwen3-coder:480b-cloud ç­‰ï¼‰
```

æˆ–ç›´æŽ¥ç¼–è¾‘ `config.yaml`ï¼š
```yaml
model:
  provider: "ollama-cloud"
  default: "gpt-oss:120b"
```

æ¨¡åž‹ç›®å½•ä»Ž `ollama.com/v1/models` åŠ¨æ€èŽ·å–ï¼Œç¼“å­˜ä¸€å°æ—¶ã€‚`model:tag` æ ¼å¼ï¼ˆå¦‚ `qwen3-coder:480b-cloud`ï¼‰åœ¨è§„èŒƒåŒ–è¿‡ç¨‹ä¸­ä¿ç•™â€”â€”ä¸è¦ä½¿ç”¨è¿žå­—ç¬¦ã€‚

:::tip Ollama Cloud ä¸Žæœ¬åœ° Ollama
ä¸¤è€…ä½¿ç”¨ç›¸åŒçš„ OpenAI å…¼å®¹ APIã€‚Cloud æ˜¯ä¸€ç­‰æä¾›å•†ï¼ˆ`--provider ollama-cloud`ï¼Œ`OLLAMA_API_KEY`ï¼‰ï¼›æœ¬åœ° Ollama é€šè¿‡è‡ªå®šä¹‰ç«¯ç‚¹æµç¨‹è®¿é—®ï¼ˆåŸºç¡€ URL `http://localhost:11434/v1`ï¼Œæ— éœ€ keyï¼‰ã€‚å¯¹äºŽæ— æ³•åœ¨æœ¬åœ°è¿è¡Œçš„å¤§æ¨¡åž‹ä½¿ç”¨ Cloudï¼›å¯¹äºŽéšç§ä¿æŠ¤æˆ–ç¦»çº¿å·¥ä½œä½¿ç”¨æœ¬åœ°ã€‚
:::

### AWS Bedrock

é€šè¿‡ AWS Bedrock ä½¿ç”¨ Anthropic Claudeã€Amazon Novaã€DeepSeek v3.2ã€Meta Llama 4 ç­‰æ¨¡åž‹ã€‚ä½¿ç”¨ AWS SDKï¼ˆ`boto3`ï¼‰å‡­æ®é“¾â€”â€”æ— éœ€ API keyï¼Œä½¿ç”¨æ ‡å‡† AWS è®¤è¯å³å¯ã€‚

```bash
# æœ€ç®€æ–¹å¼â€”â€”~/.aws/credentials ä¸­çš„å‘½å profile
zed chat --provider bedrock --model us.anthropic.claude-sonnet-4-6

# æˆ–ä½¿ç”¨æ˜¾å¼çŽ¯å¢ƒå˜é‡
AWS_PROFILE=myprofile AWS_REGION=us-east-1 zed chat --provider bedrock --model us.anthropic.claude-sonnet-4-6
```

æˆ–åœ¨ `config.yaml` ä¸­æ°¸ä¹…è®¾ç½®ï¼š
```yaml
model:
  provider: "bedrock"
  default: "us.anthropic.claude-sonnet-4-6"
bedrock:
  region: "us-east-1"          # æˆ–è®¾ç½® AWS_REGION
  # profile: "myprofile"       # æˆ–è®¾ç½® AWS_PROFILE
  # discovery: true            # ä»Ž IAM è‡ªåŠ¨å‘çŽ°åŒºåŸŸ
  # guardrail:                 # å¯é€‰çš„ Bedrock Guardrails
  #   guardrail_identifier: "your-guardrail-id"
  #   guardrail_version: "DRAFT"
```

è®¤è¯ä½¿ç”¨æ ‡å‡† boto3 é“¾ï¼šæ˜¾å¼ `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`ã€`~/.aws/credentials` ä¸­çš„ `AWS_PROFILE`ã€EC2/ECS/Lambda ä¸Šçš„ IAM è§’è‰²ã€IMDS æˆ– SSOã€‚å¦‚æžœå·²é€šè¿‡ AWS CLI è®¤è¯ï¼Œæ— éœ€è®¾ç½®ä»»ä½•çŽ¯å¢ƒå˜é‡ã€‚

Bedrock åº•å±‚ä½¿ç”¨ **Converse API**â€”â€”è¯·æ±‚è¢«è½¬æ¢ä¸º Bedrock çš„æ¨¡åž‹æ— å…³æ ¼å¼ï¼Œå› æ­¤åŒä¸€é…ç½®é€‚ç”¨äºŽ Claudeã€Novaã€DeepSeek å’Œ Llama æ¨¡åž‹ã€‚ä»…åœ¨è°ƒç”¨éžé»˜è®¤åŒºåŸŸç«¯ç‚¹æ—¶æ‰éœ€è®¾ç½® `BEDROCK_BASE_URL`ã€‚

å‚è§ [AWS Bedrock æŒ‡å—](/guides/aws-bedrock)ï¼Œäº†è§£ IAM é…ç½®ã€åŒºåŸŸé€‰æ‹©å’Œè·¨åŒºåŸŸæŽ¨ç†çš„è¯¦ç»†æ­¥éª¤ã€‚

### Qwen Portalï¼ˆOAuthï¼‰

é˜¿é‡Œå·´å·´ Qwen Portalï¼Œæ”¯æŒåŸºäºŽæµè§ˆå™¨çš„ OAuth ç™»å½•ã€‚åœ¨ `zed model` ä¸­é€‰æ‹© **Qwen OAuth (Portal)**ï¼Œé€šè¿‡æµè§ˆå™¨ç™»å½•ï¼ŒZed ä¼šæŒä¹…åŒ–åˆ·æ–° tokenã€‚

```bash
zed model
# â†’ é€‰æ‹©"Qwen OAuth (Portal)"
# â†’ æµè§ˆå™¨æ‰“å¼€ï¼›ä½¿ç”¨é˜¿é‡Œå·´å·´è´¦æˆ·ç™»å½•
# â†’ ç¡®è®¤â€”â€”å‡­æ®ä¿å­˜åˆ° ~/.zed/auth.json

zed chat   # ä½¿ç”¨ portal.qwen.ai/v1 ç«¯ç‚¹
```

æˆ–é…ç½® `config.yaml`ï¼š
```yaml
model:
  provider: "qwen-oauth"
  default: "qwen3-coder-plus"
```

ä»…åœ¨ portal ç«¯ç‚¹è¿ç§»æ—¶æ‰éœ€è®¾ç½® `ZED_QWEN_BASE_URL`ï¼ˆé»˜è®¤ï¼š`https://portal.qwen.ai/v1`ï¼‰ã€‚

:::tip Qwen OAuth ä¸Ž Qwen Cloudï¼ˆé˜¿é‡Œ DashScopeï¼‰
`qwen-oauth` ä½¿ç”¨é¢å‘æ¶ˆè´¹è€…çš„ Qwen Portalï¼Œé€šè¿‡ OAuth ç™»å½•â€”â€”é€‚åˆä¸ªäººç”¨æˆ·ã€‚`alibaba` æä¾›å•†ä½¿ç”¨ Qwen Cloudï¼ˆé˜¿é‡Œ DashScopeï¼‰ï¼Œéœ€è¦ `DASHSCOPE_API_KEY`â€”â€”é€‚åˆç¨‹åºåŒ–/ç”Ÿäº§å·¥ä½œè´Ÿè½½ã€‚ä¸¤è€…éƒ½è·¯ç”±åˆ° Qwen ç³»åˆ—æ¨¡åž‹ï¼Œä½†ç«¯ç‚¹ä¸åŒã€‚
:::

### é˜¿é‡Œäº‘ï¼ˆCoding Planï¼‰

å¦‚æžœä½ è®¢é˜…äº†é˜¿é‡Œå·´å·´çš„ **Coding Plan**ï¼ˆç‹¬ç«‹äºŽæ ‡å‡† DashScope API è®¿é—®çš„è®¡è´¹ SKUï¼‰ï¼ŒZed å°†å…¶ä½œä¸ºç‹¬ç«‹çš„ä¸€ç­‰æä¾›å•†æš´éœ²ï¼š`alibaba-coding-plan`ã€‚ç«¯ç‚¹ï¼š`https://coding-intl.dashscope.aliyuncs.com/v1`ã€‚ä¸Žå¸¸è§„ `alibaba` æä¾›å•†ä¸€æ ·å…¼å®¹ OpenAIï¼Œä½†åŸºç¡€ URL å’Œè®¡è´¹é¢ä¸åŒã€‚

```yaml
model:
  provider: alibaba_coding     # alibaba-coding-plan çš„åˆ«å
  model: qwen3-coder-plus
```

æˆ–é€šè¿‡ CLIï¼š

```bash
zed chat --provider alibaba_coding --model qwen3-coder-plus
```

`alibaba_coding` ä½¿ç”¨ä¸Ž `alibaba` æ¡ç›®ç›¸åŒçš„ `DASHSCOPE_API_KEY`â€”â€”æ— éœ€å•ç‹¬çš„ keyï¼Œåªæ˜¯è·¯ç”±ç›®æ ‡ä¸åŒã€‚åœ¨æ­¤æä¾›å•†æ³¨å†Œä¹‹å‰ï¼Œåœ¨ `config.yaml` ä¸­è®¾ç½® `provider: alibaba_coding` çš„ç”¨æˆ·ä¼šé™é»˜å›žé€€åˆ° OpenRouter è·¯ç”±ã€‚

### MiniMaxï¼ˆOAuthï¼‰

é€šè¿‡æµè§ˆå™¨ OAuth ç™»å½•ä½¿ç”¨ MiniMax-M2.7â€”â€”æ— éœ€ API keyã€‚åœ¨ `zed model` ä¸­é€‰æ‹© **MiniMax (OAuth)**ï¼Œé€šè¿‡æµè§ˆå™¨ç™»å½•ï¼ŒZed ä¼šæŒä¹…åŒ–è®¿é—® token å’Œåˆ·æ–° tokenã€‚åº•å±‚ä½¿ç”¨ Anthropic Messages å…¼å®¹ç«¯ç‚¹ï¼ˆ`/anthropic`ï¼‰ã€‚

```bash
zed model
# â†’ é€‰æ‹©"MiniMax (OAuth)"
# â†’ æµè§ˆå™¨æ‰“å¼€ï¼›ä½¿ç”¨ MiniMax è´¦æˆ·ç™»å½•ï¼ˆå…¨çƒæˆ–ä¸­å›½åŒºï¼‰
# â†’ ç¡®è®¤â€”â€”å‡­æ®ä¿å­˜åˆ° ~/.zed/auth.json

zed chat   # ä½¿ç”¨ api.minimax.io/anthropic ç«¯ç‚¹
```

æˆ–é…ç½® `config.yaml`ï¼š
```yaml
model:
  provider: "minimax-oauth"
  default: "MiniMax-M2.7"
```

æ”¯æŒçš„æ¨¡åž‹ï¼š`MiniMax-M2.7`ï¼ˆä¸»æ¨¡åž‹ï¼‰å’Œ `MiniMax-M2.7-highspeed`ï¼ˆé»˜è®¤è¾…åŠ©æ¨¡åž‹ï¼‰ã€‚OAuth è·¯å¾„å¿½ç•¥ `MINIMAX_API_KEY` / `MINIMAX_BASE_URL`ã€‚

:::tip MiniMax OAuth ä¸Ž API key
`minimax-oauth` ä½¿ç”¨ MiniMax é¢å‘æ¶ˆè´¹è€…çš„ portalï¼Œé€šè¿‡ OAuth ç™»å½•â€”â€”æ— éœ€è®¾ç½®è®¡è´¹ã€‚`minimax` å’Œ `minimax-cn` æä¾›å•†ä½¿ç”¨ `MINIMAX_API_KEY` / `MINIMAX_CN_API_KEY`â€”â€”ç”¨äºŽç¨‹åºåŒ–è®¿é—®ã€‚å®Œæ•´æµç¨‹å‚è§ [MiniMax OAuth æŒ‡å—](/guides/minimax-oauth)ã€‚
:::

### NVIDIA NIM

é€šè¿‡ [build.nvidia.com](https://build.nvidia.com)ï¼ˆå…è´¹ API keyï¼‰æˆ–æœ¬åœ° NIM ç«¯ç‚¹ä½¿ç”¨ Nemotron åŠå…¶ä»–å¼€æºæ¨¡åž‹ã€‚

```bash
# äº‘ç«¯ï¼ˆbuild.nvidia.comï¼‰
zed chat --provider nvidia --model nvidia/nemotron-3-super-120b-a12b
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ NVIDIA_API_KEY

# æœ¬åœ° NIM ç«¯ç‚¹â€”â€”è¦†ç›–åŸºç¡€ URL
NVIDIA_BASE_URL=http://localhost:8000/v1 zed chat --provider nvidia --model nvidia/nemotron-3-super-120b-a12b
```

æˆ–åœ¨ `config.yaml` ä¸­æ°¸ä¹…è®¾ç½®ï¼š
```yaml
model:
  provider: "nvidia"
  default: "nvidia/nemotron-3-super-120b-a12b"
```

:::tip æœ¬åœ° NIM
å¯¹äºŽæœ¬åœ°éƒ¨ç½²ï¼ˆDGX Sparkã€æœ¬åœ° GPUï¼‰ï¼Œè®¾ç½® `NVIDIA_BASE_URL=http://localhost:8000/v1`ã€‚NIM æš´éœ²ä¸Ž build.nvidia.com ç›¸åŒçš„ OpenAI å…¼å®¹ chat completions APIï¼Œå› æ­¤åœ¨äº‘ç«¯å’Œæœ¬åœ°ä¹‹é—´åˆ‡æ¢åªéœ€ä¿®æ”¹ä¸€è¡ŒçŽ¯å¢ƒå˜é‡ã€‚
:::

Zed ä¼šåœ¨æ¯æ¬¡å‘ `build.nvidia.com` å‘é€è¯·æ±‚æ—¶è‡ªåŠ¨é™„åŠ  NIM è®¡è´¹æ¥æºè¯·æ±‚å¤´â€”â€”æ— éœ€ä»»ä½•é…ç½®ã€‚è¿™ä¼šåœ¨ NVIDIA è®¡è´¹ä»ªè¡¨æ¿ä¸­å°†æ¶ˆè€—è·¯ç”±åˆ°æ­£ç¡®çš„æ¥æºã€‚

### GMI Cloud

é€šè¿‡ [GMI Cloud](https://www.gmicloud.ai/) ä½¿ç”¨å¼€æºå’ŒæŽ¨ç†æ¨¡åž‹â€”â€”OpenAI å…¼å®¹ APIï¼ŒAPI key è®¤è¯ã€‚

```bash
# GMI Cloud
zed chat --provider gmi --model deepseek-ai/DeepSeek-R1
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ GMI_API_KEY
```

æˆ–åœ¨ `config.yaml` ä¸­æ°¸ä¹…è®¾ç½®ï¼š
```yaml
model:
  provider: "gmi"
  default: "deepseek-ai/DeepSeek-R1"
```

åŸºç¡€ URL å¯é€šè¿‡ `GMI_BASE_URL` è¦†ç›–ï¼ˆé»˜è®¤ï¼š`https://api.gmi-serving.com/v1`ï¼‰ã€‚

### StepFun

é€šè¿‡ [StepFun](https://platform.stepfun.com) ä½¿ç”¨ Step ç³»åˆ—æ¨¡åž‹â€”â€”OpenAI å…¼å®¹ APIï¼ŒAPI key è®¤è¯ã€‚

```bash
# StepFun
zed chat --provider stepfun --model step-3.5-flash
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ STEPFUN_API_KEY
```

æˆ–åœ¨ `config.yaml` ä¸­æ°¸ä¹…è®¾ç½®ï¼š
```yaml
model:
  provider: "stepfun"
  default: "step-3.5-flash"
```

åŸºç¡€ URL å¯é€šè¿‡ `STEPFUN_BASE_URL` è¦†ç›–ï¼ˆé»˜è®¤ï¼š`https://api.stepfun.com/v1`ï¼‰ã€‚

### Hugging Face æŽ¨ç†æä¾›å•†

[Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers) é€šè¿‡ç»Ÿä¸€çš„ OpenAI å…¼å®¹ç«¯ç‚¹ï¼ˆ`router.huggingface.co/v1`ï¼‰è·¯ç”±åˆ° 20+ å¼€æºæ¨¡åž‹ã€‚è¯·æ±‚è‡ªåŠ¨è·¯ç”±åˆ°æœ€å¿«çš„å¯ç”¨åŽç«¯ï¼ˆGroqã€Togetherã€SambaNova ç­‰ï¼‰ï¼Œå¹¶æ”¯æŒè‡ªåŠ¨æ•…éšœè½¬ç§»ã€‚

```bash
# ä½¿ç”¨ä»»æ„å¯ç”¨æ¨¡åž‹
zed chat --provider huggingface --model Qwen/Qwen3-235B-A22B-Thinking-2507
# éœ€è¦ï¼š~/.zed/.env ä¸­çš„ HF_TOKEN

# çŸ­åˆ«å
zed chat --provider hf --model deepseek-ai/DeepSeek-V3.2
```

æˆ–åœ¨ `config.yaml` ä¸­æ°¸ä¹…è®¾ç½®ï¼š
```yaml
model:
  provider: "huggingface"
  default: "Qwen/Qwen3-235B-A22B-Thinking-2507"
```

åœ¨ [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) èŽ·å– tokenâ€”â€”ç¡®ä¿å¯ç”¨"Make calls to Inference Providers"æƒé™ã€‚åŒ…å«å…è´¹å±‚ï¼ˆæ¯æœˆ $0.10 ç§¯åˆ†ï¼Œä¸åŠ ä»·ï¼‰ã€‚

å¯åœ¨æ¨¡åž‹åç§°åŽé™„åŠ è·¯ç”±åŽç¼€ï¼š`:fastest`ï¼ˆé»˜è®¤ï¼‰ã€`:cheapest`ï¼Œæˆ– `:provider_name` å¼ºåˆ¶æŒ‡å®šåŽç«¯ã€‚

åŸºç¡€ URL å¯é€šè¿‡ `HF_BASE_URL` è¦†ç›–ã€‚

### é€šè¿‡ OAuth ä½¿ç”¨ Google Geminiï¼ˆ`google-gemini-cli`ï¼‰

`google-gemini-cli` æä¾›å•†ä½¿ç”¨ Google çš„ Cloud Code Assist åŽç«¯â€”â€”ä¸Ž Google è‡ªå·±çš„ `gemini-cli` å·¥å…·ä½¿ç”¨çš„ API ç›¸åŒã€‚æ”¯æŒ**å…è´¹å±‚**ï¼ˆä¸ªäººè´¦æˆ·æ¯æ—¥é…é¢å……è¶³ï¼‰å’Œ**ä»˜è´¹å±‚**ï¼ˆé€šè¿‡ GCP é¡¹ç›®çš„ Standard/Enterpriseï¼‰ã€‚

**å¿«é€Ÿå¼€å§‹ï¼š**

```bash
zed model
# â†’ é€‰æ‹©"Google Gemini (OAuth)"
# â†’ æŸ¥çœ‹æ”¿ç­–è­¦å‘Šï¼Œç¡®è®¤
# â†’ æµè§ˆå™¨æ‰“å¼€ accounts.google.comï¼Œç™»å½•
# â†’ å®Œæˆâ€”â€”Zed åœ¨é¦–æ¬¡è¯·æ±‚æ—¶è‡ªåŠ¨å¼€é€šå…è´¹å±‚
```

Zed é»˜è®¤ä½¿ç”¨ Google çš„**å…¬å¼€** `gemini-cli` æ¡Œé¢ OAuth å®¢æˆ·ç«¯â€”â€”ä¸Ž Google åœ¨å…¶å¼€æº `gemini-cli` ä¸­åŒ…å«çš„å‡­æ®ç›¸åŒã€‚æ¡Œé¢ OAuth å®¢æˆ·ç«¯ä¸æ˜¯æœºå¯†å®¢æˆ·ç«¯ï¼ˆPKCE æä¾›å®‰å…¨ä¿éšœï¼‰ã€‚ä½ æ— éœ€å®‰è£… `gemini-cli` æˆ–æ³¨å†Œè‡ªå·±çš„ GCP OAuth å®¢æˆ·ç«¯ã€‚

**è®¤è¯å·¥ä½œåŽŸç†ï¼š**
- é’ˆå¯¹ `accounts.google.com` çš„ PKCE æŽˆæƒç æµç¨‹
- æµè§ˆå™¨å›žè°ƒåœ°å€ `http://127.0.0.1:8085/oauth2callback`ï¼ˆç«¯å£å ç”¨æ—¶è‡ªåŠ¨å›žé€€åˆ°ä¸´æ—¶ç«¯å£ï¼‰
- Token å­˜å‚¨åœ¨ `~/.zed/auth/google_oauth.json`ï¼ˆchmod 0600ï¼ŒåŽŸå­å†™å…¥ï¼Œè·¨è¿›ç¨‹ `fcntl` é”ï¼‰
- åˆ°æœŸå‰ 60 ç§’è‡ªåŠ¨åˆ·æ–°
- æ— å¤´çŽ¯å¢ƒï¼ˆSSHã€`ZED_HEADLESS=1`ï¼‰â†’ ç²˜è´´æ¨¡å¼å›žé€€
- å¹¶å‘åˆ·æ–°åŽ»é‡â€”â€”ä¸¤ä¸ªå¹¶å‘è¯·æ±‚ä¸ä¼šè§¦å‘åŒé‡åˆ·æ–°
- `invalid_grant`ï¼ˆåˆ·æ–° token è¢«æ’¤é”€ï¼‰â†’ å‡­æ®æ–‡ä»¶è¢«æ¸…é™¤ï¼Œæç¤ºç”¨æˆ·é‡æ–°ç™»å½•

**æŽ¨ç†å·¥ä½œåŽŸç†ï¼š**
- æµé‡å‘é€åˆ° `https://cloudcode-pa.googleapis.com/v1internal:generateContent`
  ï¼ˆæµå¼ä¼ è¾“ä¸º `:streamGenerateContent?alt=sse`ï¼‰ï¼Œè€Œéžä»˜è´¹çš„ `v1beta/openai` ç«¯ç‚¹
- è¯·æ±‚ä½“å°è£…ä¸º `{project, model, user_prompt_id, request}`
- OpenAI æ ¼å¼çš„ `messages[]`ã€`tools[]`ã€`tool_choice` è¢«è½¬æ¢ä¸º Gemini åŽŸç”Ÿçš„
  `contents[]`ã€`tools[].functionDeclarations`ã€`toolConfig` æ ¼å¼
- å“åº”è½¬æ¢å›ž OpenAI æ ¼å¼ï¼ŒZed å…¶ä½™éƒ¨åˆ†æ— æ„ŸçŸ¥

**å±‚çº§ä¸Žé¡¹ç›® IDï¼š**

| ä½ çš„æƒ…å†µ | æ“ä½œ |
|---|---|
| ä¸ªäºº Google è´¦æˆ·ï¼Œä½¿ç”¨å…è´¹å±‚ | æ— éœ€æ“ä½œâ€”â€”ç™»å½•å³å¯å¼€å§‹èŠå¤© |
| Workspace / Standard / Enterprise è´¦æˆ· | å°† `ZED_GEMINI_PROJECT_ID` æˆ– `GOOGLE_CLOUD_PROJECT` è®¾ç½®ä¸ºä½ çš„ GCP é¡¹ç›® ID |
| VPC-SC ä¿æŠ¤çš„ç»„ç»‡ | Zed æ£€æµ‹åˆ° `SECURITY_POLICY_VIOLATED` åŽè‡ªåŠ¨å¼ºåˆ¶ä½¿ç”¨ `standard-tier` |

å…è´¹å±‚åœ¨é¦–æ¬¡ä½¿ç”¨æ—¶è‡ªåŠ¨å¼€é€š Google æ‰˜ç®¡é¡¹ç›®ã€‚æ— éœ€ GCP é…ç½®ã€‚

**é…é¢ç›‘æŽ§ï¼š**

```
/gquota
```

ä»¥è¿›åº¦æ¡æ˜¾ç¤ºæ¯ä¸ªæ¨¡åž‹çš„å‰©ä½™ Code Assist é…é¢ï¼š

```
Gemini Code Assist quota  (project: 123-abc)

  gemini-2.5-pro                      â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–‘â–‘â–‘â–‘   85%
  gemini-2.5-flash [input]            â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–“â–‘â–‘   92%
```

:::warning æ”¿ç­–é£Žé™©
Google è®¤ä¸ºå°† Gemini CLI OAuth å®¢æˆ·ç«¯ç”¨äºŽç¬¬ä¸‰æ–¹è½¯ä»¶è¿åæ”¿ç­–ã€‚éƒ¨åˆ†ç”¨æˆ·åæ˜ è´¦æˆ·å—åˆ°é™åˆ¶ã€‚ä¸ºé™ä½Žé£Žé™©ï¼Œå»ºè®®æ”¹ç”¨ `gemini` æä¾›å•†å¹¶é€šè¿‡ API key è®¿é—®ã€‚Zed ä¼šåœ¨ OAuth å¼€å§‹å‰æ˜¾ç¤ºè­¦å‘Šå¹¶è¦æ±‚æ˜Žç¡®ç¡®è®¤ã€‚
:::

**è‡ªå®šä¹‰ OAuth å®¢æˆ·ç«¯ï¼ˆå¯é€‰ï¼‰ï¼š**

å¦‚æžœä½ å¸Œæœ›æ³¨å†Œè‡ªå·±çš„ Google OAuth å®¢æˆ·ç«¯â€”â€”ä¾‹å¦‚å°†é…é¢å’ŒæŽˆæƒèŒƒå›´é™å®šåœ¨è‡ªå·±çš„ GCP é¡¹ç›®å†…â€”â€”è¯·è®¾ç½®ï¼š

```bash
ZED_GEMINI_CLIENT_ID=your-client.apps.googleusercontent.com
ZED_GEMINI_CLIENT_SECRET=...   # æ¡Œé¢å®¢æˆ·ç«¯å¯é€‰
```

åœ¨ [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) æ³¨å†Œä¸€ä¸ª**æ¡Œé¢åº”ç”¨** OAuth å®¢æˆ·ç«¯ï¼Œå¹¶å¯ç”¨ Generative Language APIã€‚

## è‡ªå®šä¹‰ä¸Žè‡ªæ‰˜ç®¡ LLM æä¾›å•†

Zed Agent å¯ä¸Ž**ä»»ä½• OpenAI å…¼å®¹ API ç«¯ç‚¹**é…åˆä½¿ç”¨ã€‚åªè¦æœåŠ¡å™¨å®žçŽ°äº† `/v1/chat/completions`ï¼Œå°±å¯ä»¥å°† Zed æŒ‡å‘å®ƒã€‚è¿™æ„å‘³ç€ä½ å¯ä»¥ä½¿ç”¨æœ¬åœ°æ¨¡åž‹ã€GPU æŽ¨ç†æœåŠ¡å™¨ã€å¤šæä¾›å•†è·¯ç”±å™¨æˆ–ä»»ä½•ç¬¬ä¸‰æ–¹ APIã€‚

### é€šç”¨é…ç½®

é…ç½®è‡ªå®šä¹‰ç«¯ç‚¹çš„ä¸‰ç§æ–¹å¼ï¼š

**äº¤äº’å¼é…ç½®ï¼ˆæŽ¨èï¼‰ï¼š**
```bash
zed model
# é€‰æ‹©"Custom endpoint (self-hosted / VLLM / etc.)"
# è¾“å…¥ï¼šAPI åŸºç¡€ URLã€API keyã€æ¨¡åž‹åç§°
```

**æ‰‹åŠ¨é…ç½®ï¼ˆ`config.yaml`ï¼‰ï¼š**
```yaml
# åœ¨ ~/.zed/config.yaml ä¸­
model:
  default: your-model-name
  provider: custom
  base_url: http://localhost:8000/v1
  api_key: your-key-or-leave-empty-for-local
```

:::warning æ—§ç‰ˆçŽ¯å¢ƒå˜é‡
`.env` ä¸­çš„ `OPENAI_BASE_URL` å’Œ `LLM_MODEL` å·²**ç§»é™¤**ã€‚Zed çš„ä»»ä½•éƒ¨åˆ†éƒ½ä¸å†è¯»å–è¿™ä¸¤ä¸ªå˜é‡â€”â€”`config.yaml` æ˜¯æ¨¡åž‹å’Œç«¯ç‚¹é…ç½®çš„å”¯ä¸€æ¥æºã€‚å¦‚æžœä½ çš„ `.env` ä¸­æœ‰è¿‡æ—¶æ¡ç›®ï¼Œä¸‹æ¬¡è¿è¡Œ `zed setup` æˆ–é…ç½®è¿ç§»æ—¶ä¼šè‡ªåŠ¨æ¸…é™¤ã€‚è¯·ä½¿ç”¨ `zed model` æˆ–ç›´æŽ¥ç¼–è¾‘ `config.yaml`ã€‚
:::

ä¸¤ç§æ–¹å¼éƒ½ä¼šæŒä¹…åŒ–åˆ° `config.yaml`ï¼Œè¯¥æ–‡ä»¶æ˜¯æ¨¡åž‹ã€æä¾›å•†å’ŒåŸºç¡€ URL çš„å”¯ä¸€æ¥æºã€‚

### ä½¿ç”¨ `/model` åˆ‡æ¢æ¨¡åž‹

:::warning zed model ä¸Ž /model
**`zed model`**ï¼ˆåœ¨ç»ˆç«¯ä¸­è¿è¡Œï¼Œä»»ä½•èŠå¤©ä¼šè¯ä¹‹å¤–ï¼‰æ˜¯**å®Œæ•´çš„æä¾›å•†é…ç½®å‘å¯¼**ã€‚ç”¨äºŽæ·»åŠ æ–°æä¾›å•†ã€è¿è¡Œ OAuth æµç¨‹ã€è¾“å…¥ API key å’Œé…ç½®è‡ªå®šä¹‰ç«¯ç‚¹ã€‚

**`/model`**ï¼ˆåœ¨æ´»è·ƒçš„ Zed èŠå¤©ä¼šè¯ä¸­è¾“å…¥ï¼‰åªèƒ½åœ¨**å·²é…ç½®çš„**æä¾›å•†å’Œæ¨¡åž‹ä¹‹é—´**åˆ‡æ¢**ã€‚å®ƒæ— æ³•æ·»åŠ æ–°æä¾›å•†ã€è¿è¡Œ OAuth æˆ–æç¤ºè¾“å…¥ API keyã€‚å¦‚æžœä½ åªé…ç½®äº†ä¸€ä¸ªæä¾›å•†ï¼ˆå¦‚ OpenRouterï¼‰ï¼Œ`/model` åªä¼šæ˜¾ç¤ºè¯¥æä¾›å•†çš„æ¨¡åž‹ã€‚

**æ·»åŠ æ–°æä¾›å•†ï¼š** é€€å‡ºä¼šè¯ï¼ˆ`Ctrl+C` æˆ– `/quit`ï¼‰ï¼Œè¿è¡Œ `zed model`ï¼Œé…ç½®æ–°æä¾›å•†ï¼Œç„¶åŽå¼€å¯æ–°ä¼šè¯ã€‚
:::

é…ç½®å¥½è‡³å°‘ä¸€ä¸ªè‡ªå®šä¹‰ç«¯ç‚¹åŽï¼Œå¯ä»¥åœ¨ä¼šè¯ä¸­é€”åˆ‡æ¢æ¨¡åž‹ï¼š

```
/model custom:qwen-2.5          # åˆ‡æ¢åˆ°è‡ªå®šä¹‰ç«¯ç‚¹ä¸Šçš„æŸä¸ªæ¨¡åž‹
/model custom                    # ä»Žç«¯ç‚¹è‡ªåŠ¨æ£€æµ‹æ¨¡åž‹
/model openrouter:claude-sonnet-4 # åˆ‡æ¢å›žäº‘ç«¯æä¾›å•†
```

å¦‚æžœä½ é…ç½®äº†**å‘½åè‡ªå®šä¹‰æä¾›å•†**ï¼ˆè§ä¸‹æ–‡ï¼‰ï¼Œä½¿ç”¨ä¸‰æ®µå¼è¯­æ³•ï¼š

```
/model custom:local:qwen-2.5    # ä½¿ç”¨"local"è‡ªå®šä¹‰æä¾›å•†å’Œ qwen-2.5 æ¨¡åž‹
/model custom:work:llama3       # ä½¿ç”¨"work"è‡ªå®šä¹‰æä¾›å•†å’Œ llama3
```

åˆ‡æ¢æä¾›å•†æ—¶ï¼ŒZed ä¼šå°†åŸºç¡€ URL å’Œæä¾›å•†æŒä¹…åŒ–åˆ°é…ç½®ä¸­ï¼Œä½¿æ›´æ”¹åœ¨é‡å¯åŽä¿ç•™ã€‚ä»Žè‡ªå®šä¹‰ç«¯ç‚¹åˆ‡æ¢åˆ°å†…ç½®æä¾›å•†æ—¶ï¼Œè¿‡æ—¶çš„åŸºç¡€ URL ä¼šè‡ªåŠ¨æ¸…é™¤ã€‚

:::tip
`/model custom`ï¼ˆä¸å¸¦æ¨¡åž‹åç§°ï¼‰ä¼šæŸ¥è¯¢ç«¯ç‚¹çš„ `/models` APIï¼Œå¦‚æžœåªåŠ è½½äº†ä¸€ä¸ªæ¨¡åž‹åˆ™è‡ªåŠ¨é€‰æ‹©ã€‚é€‚ç”¨äºŽè¿è¡Œå•ä¸ªæ¨¡åž‹çš„æœ¬åœ°æœåŠ¡å™¨ã€‚
:::

ä»¥ä¸‹æ‰€æœ‰å†…å®¹éµå¾ªç›¸åŒæ¨¡å¼â€”â€”åªéœ€æ›´æ”¹ URLã€key å’Œæ¨¡åž‹åç§°ã€‚

---

### Ollama â€” æœ¬åœ°æ¨¡åž‹ï¼Œé›¶é…ç½®

[Ollama](https://ollama.com/) ç”¨ä¸€æ¡å‘½ä»¤åœ¨æœ¬åœ°è¿è¡Œå¼€æºæ¨¡åž‹ã€‚æœ€é€‚åˆï¼šå¿«é€Ÿæœ¬åœ°å®žéªŒã€éšç§æ•æ„Ÿå·¥ä½œã€ç¦»çº¿ä½¿ç”¨ã€‚é€šè¿‡ OpenAI å…¼å®¹ API æ”¯æŒå·¥å…·è°ƒç”¨ã€‚

```bash
# å®‰è£…å¹¶è¿è¡Œæ¨¡åž‹
ollama pull qwen2.5-coder:32b
ollama serve   # åœ¨ç«¯å£ 11434 å¯åŠ¨
```

ç„¶åŽé…ç½® Zedï¼š

```bash
zed model
# é€‰æ‹©"Custom endpoint (self-hosted / VLLM / etc.)"
# è¾“å…¥ URLï¼šhttp://localhost:11434/v1
# è·³è¿‡ API keyï¼ˆOllama ä¸éœ€è¦ï¼‰
# è¾“å…¥æ¨¡åž‹åç§°ï¼ˆå¦‚ qwen2.5-coder:32bï¼‰
```

æˆ–ç›´æŽ¥é…ç½® `config.yaml`ï¼š

```yaml
model:
  default: qwen2.5-coder:32b
  provider: custom
  base_url: http://localhost:11434/v1
  context_length: 32768   # è§ä¸‹æ–¹è­¦å‘Š
```

:::caution Ollama é»˜è®¤ä¸Šä¸‹æ–‡é•¿åº¦éžå¸¸çŸ­
Ollama **é»˜è®¤ä¸ä½¿ç”¨**æ¨¡åž‹çš„å®Œæ•´ä¸Šä¸‹æ–‡çª—å£ã€‚æ ¹æ®ä½ çš„æ˜¾å­˜ï¼Œé»˜è®¤å€¼ä¸ºï¼š

| å¯ç”¨æ˜¾å­˜ | é»˜è®¤ä¸Šä¸‹æ–‡ |
|----------------|----------------|
| å°äºŽ 24 GB | **4,096 tokens** |
| 24â€“48 GB | 32,768 tokens |
| 48+ GB | 256,000 tokens |

å¯¹äºŽå¸¦å·¥å…·çš„æ™ºèƒ½ä½“ä½¿ç”¨ï¼Œ**è‡³å°‘éœ€è¦ 16kâ€“32k ä¸Šä¸‹æ–‡**ã€‚åœ¨ 4k æ—¶ï¼Œç³»ç»Ÿ prompt åŠ å·¥å…· schema å°±å¯èƒ½å¡«æ»¡çª—å£ï¼Œæ²¡æœ‰ç©ºé—´ç•™ç»™å¯¹è¯ã€‚

**å¦‚ä½•å¢žåŠ **ï¼ˆé€‰æ‹©å…¶ä¸€ï¼‰ï¼š

```bash
# æ–¹å¼ 1ï¼šé€šè¿‡çŽ¯å¢ƒå˜é‡è®¾ç½®æœåŠ¡å™¨å…¨å±€å€¼ï¼ˆæŽ¨èï¼‰
OLLAMA_CONTEXT_LENGTH=32768 ollama serve

# æ–¹å¼ 2ï¼šå¯¹äºŽ systemd ç®¡ç†çš„ Ollama
sudo systemctl edit ollama.service
# æ·»åŠ ï¼šEnvironment="OLLAMA_CONTEXT_LENGTH=32768"
# ç„¶åŽï¼šsudo systemctl daemon-reload && sudo systemctl restart ollama

# æ–¹å¼ 3ï¼šçƒ˜ç„™åˆ°è‡ªå®šä¹‰æ¨¡åž‹ä¸­ï¼ˆæ¯ä¸ªæ¨¡åž‹æŒä¹…ç”Ÿæ•ˆï¼‰
echo -e "FROM qwen2.5-coder:32b\nPARAMETER num_ctx 32768" > Modelfile
ollama create qwen2.5-coder-32k -f Modelfile
```

**æ— æ³•é€šè¿‡ OpenAI å…¼å®¹ API**ï¼ˆ`/v1/chat/completions`ï¼‰è®¾ç½®ä¸Šä¸‹æ–‡é•¿åº¦ã€‚å¿…é¡»åœ¨æœåŠ¡ç«¯æˆ–é€šè¿‡ Modelfile é…ç½®ã€‚è¿™æ˜¯å°† Ollama ä¸Ž Zed ç­‰å·¥å…·é›†æˆæ—¶æœ€å¸¸è§çš„å›°æƒ‘æ¥æºã€‚
:::

**éªŒè¯ä¸Šä¸‹æ–‡è®¾ç½®æ˜¯å¦æ­£ç¡®ï¼š**

```bash
ollama ps
# æŸ¥çœ‹ CONTEXT åˆ—â€”â€”åº”æ˜¾ç¤ºä½ é…ç½®çš„å€¼
```

:::tip
ä½¿ç”¨ `ollama list` åˆ—å‡ºå¯ç”¨æ¨¡åž‹ã€‚ä½¿ç”¨ `ollama pull <model>` ä»Ž [Ollama åº“](https://ollama.com/library) æ‹‰å–ä»»æ„æ¨¡åž‹ã€‚Ollama è‡ªåŠ¨å¤„ç† GPU å¸è½½â€”â€”å¤§å¤šæ•°é…ç½®æ— éœ€æ‰‹åŠ¨è®¾ç½®ã€‚
:::

---

### vLLM â€” é«˜æ€§èƒ½ GPU æŽ¨ç†

[vLLM](https://docs.vllm.ai/) æ˜¯ç”Ÿäº§ LLM æœåŠ¡çš„æ ‡å‡†æ–¹æ¡ˆã€‚æœ€é€‚åˆï¼šGPU ç¡¬ä»¶ä¸Šçš„æœ€å¤§åžåé‡ã€å¤§æ¨¡åž‹æœåŠ¡ã€è¿žç»­æ‰¹å¤„ç†ã€‚

```bash
pip install vllm
vllm serve meta-llama/Llama-3.1-70B-Instruct \
  --port 8000 \
  --max-model-len 65536 \
  --tensor-parallel-size 2 \
  --enable-auto-tool-choice \
  --tool-call-parser zed
```

ç„¶åŽé…ç½® Zedï¼š

```bash
zed model
# é€‰æ‹©"Custom endpoint (self-hosted / VLLM / etc.)"
# è¾“å…¥ URLï¼šhttp://localhost:8000/v1
# è·³è¿‡ API keyï¼ˆæˆ–è¾“å…¥ä½ é…ç½® vLLM æ—¶è®¾ç½®çš„ --api-keyï¼‰
# è¾“å…¥æ¨¡åž‹åç§°ï¼šmeta-llama/Llama-3.1-70B-Instruct
```

**ä¸Šä¸‹æ–‡é•¿åº¦ï¼š** vLLM é»˜è®¤è¯»å–æ¨¡åž‹çš„ `max_position_embeddings`ã€‚å¦‚æžœè¶…å‡ºæ˜¾å­˜ï¼Œä¼šæŠ¥é”™å¹¶è¦æ±‚é™ä½Ž `--max-model-len`ã€‚ä¹Ÿå¯ä½¿ç”¨ `--max-model-len auto` è‡ªåŠ¨æ‰¾åˆ°èƒ½æ”¾å…¥æ˜¾å­˜çš„æœ€å¤§å€¼ã€‚è®¾ç½® `--gpu-memory-utilization 0.95`ï¼ˆé»˜è®¤ 0.9ï¼‰å¯å°†æ›´å¤šä¸Šä¸‹æ–‡æ”¾å…¥æ˜¾å­˜ã€‚

**å·¥å…·è°ƒç”¨éœ€è¦æ˜¾å¼æ ‡å¿—ï¼š**

| æ ‡å¿— | ç”¨é€” |
|------|---------|
| `--enable-auto-tool-choice` | `tool_choice: "auto"` æ‰€å¿…éœ€ï¼ˆZed çš„é»˜è®¤å€¼ï¼‰ |
| `--tool-call-parser <name>` | æ¨¡åž‹å·¥å…·è°ƒç”¨æ ¼å¼çš„è§£æžå™¨ |

æ”¯æŒçš„è§£æžå™¨ï¼š`zed`ï¼ˆQwen 2.5ã€Zed 2/3ï¼‰ã€`llama3_json`ï¼ˆLlama 3.xï¼‰ã€`mistral`ã€`deepseek_v3`ã€`deepseek_v31`ã€`xlam`ã€`pythonic`ã€‚æ²¡æœ‰è¿™äº›æ ‡å¿—ï¼Œå·¥å…·è°ƒç”¨å°†æ— æ³•å·¥ä½œâ€”â€”æ¨¡åž‹ä¼šå°†å·¥å…·è°ƒç”¨ä»¥æ–‡æœ¬å½¢å¼è¾“å‡ºã€‚

:::tip
vLLM æ”¯æŒäººç±»å¯è¯»çš„å¤§å°ï¼š`--max-model-len 64k`ï¼ˆå°å†™ k = 1000ï¼Œå¤§å†™ K = 1024ï¼‰ã€‚
:::

---

### SGLang â€” å¸¦ RadixAttention çš„å¿«é€ŸæœåŠ¡

[SGLang](https://github.com/sgl-project/sglang) æ˜¯ vLLM çš„æ›¿ä»£æ–¹æ¡ˆï¼Œå…·æœ‰ç”¨äºŽ KV ç¼“å­˜å¤ç”¨çš„ RadixAttentionã€‚æœ€é€‚åˆï¼šå¤šè½®å¯¹è¯ï¼ˆå‰ç¼€ç¼“å­˜ï¼‰ã€çº¦æŸè§£ç ã€ç»“æž„åŒ–è¾“å‡ºã€‚

```bash
pip install "sglang[all]"
python -m sglang.launch_server \
  --model meta-llama/Llama-3.1-70B-Instruct \
  --port 30000 \
  --context-length 65536 \
  --tp 2 \
  --tool-call-parser qwen
```

ç„¶åŽé…ç½® Zedï¼š

```bash
zed model
# é€‰æ‹©"Custom endpoint (self-hosted / VLLM / etc.)"
# è¾“å…¥ URLï¼šhttp://localhost:30000/v1
# è¾“å…¥æ¨¡åž‹åç§°ï¼šmeta-llama/Llama-3.1-70B-Instruct
```

**ä¸Šä¸‹æ–‡é•¿åº¦ï¼š** SGLang é»˜è®¤ä»Žæ¨¡åž‹é…ç½®è¯»å–ã€‚ä½¿ç”¨ `--context-length` è¦†ç›–ã€‚å¦‚æžœéœ€è¦è¶…è¿‡æ¨¡åž‹å£°æ˜Žçš„æœ€å¤§å€¼ï¼Œè®¾ç½® `SGLANG_ALLOW_OVERWRITE_LONGER_CONTEXT_LEN=1`ã€‚

**å·¥å…·è°ƒç”¨ï¼š** ä½¿ç”¨ `--tool-call-parser` å¹¶é€‰æ‹©é€‚åˆä½ æ¨¡åž‹ç³»åˆ—çš„è§£æžå™¨ï¼š`qwen`ï¼ˆQwen 2.5ï¼‰ã€`llama3`ã€`llama4`ã€`deepseekv3`ã€`mistral`ã€`glm`ã€‚æ²¡æœ‰æ­¤æ ‡å¿—ï¼Œå·¥å…·è°ƒç”¨å°†ä»¥çº¯æ–‡æœ¬è¿”å›žã€‚

:::caution SGLang é»˜è®¤æœ€å¤§è¾“å‡º 128 tokens
å¦‚æžœå“åº”çœ‹èµ·æ¥è¢«æˆªæ–­ï¼Œåœ¨è¯·æ±‚ä¸­æ·»åŠ  `max_tokens` æˆ–åœ¨æœåŠ¡å™¨ä¸Šè®¾ç½® `--default-max-tokens`ã€‚SGLang çš„é»˜è®¤å€¼æ˜¯æ¯æ¬¡å“åº”ä»… 128 tokensï¼ˆå¦‚æžœè¯·æ±‚ä¸­æœªæŒ‡å®šï¼‰ã€‚
:::

---

### llama.cpp / llama-server â€” CPU ä¸Ž Metal æŽ¨ç†

[llama.cpp](https://github.com/ggml-org/llama.cpp) åœ¨ CPUã€Apple Siliconï¼ˆMetalï¼‰å’Œæ¶ˆè´¹çº§ GPU ä¸Šè¿è¡Œé‡åŒ–æ¨¡åž‹ã€‚æœ€é€‚åˆï¼šæ— æ•°æ®ä¸­å¿ƒ GPU çš„æ¨¡åž‹è¿è¡Œã€Mac ç”¨æˆ·ã€è¾¹ç¼˜éƒ¨ç½²ã€‚

```bash
# æž„å»ºå¹¶å¯åŠ¨ llama-server
cmake -B build && cmake --build build --config Release
./build/bin/llama-server \
  --jinja -fa \
  -c 32768 \
  -ngl 99 \
  -m models/qwen2.5-coder-32b-instruct-Q4_K_M.gguf \
  --port 8080 --host 0.0.0.0
```

**ä¸Šä¸‹æ–‡é•¿åº¦ï¼ˆ`-c`ï¼‰ï¼š** è¿‘æœŸç‰ˆæœ¬é»˜è®¤ä¸º `0`ï¼Œä»Ž GGUF å…ƒæ•°æ®è¯»å–æ¨¡åž‹çš„è®­ç»ƒä¸Šä¸‹æ–‡ã€‚å¯¹äºŽè®­ç»ƒä¸Šä¸‹æ–‡è¶…è¿‡ 128k çš„æ¨¡åž‹ï¼Œè¿™å¯èƒ½å› å°è¯•åˆ†é…å®Œæ•´ KV ç¼“å­˜è€Œå¯¼è‡´ OOMã€‚è¯·æ˜¾å¼è®¾ç½® `-c` ä¸ºä½ éœ€è¦çš„å€¼ï¼ˆ32kâ€“64k æ˜¯æ™ºèƒ½ä½“ä½¿ç”¨çš„åˆç†èŒƒå›´ï¼‰ã€‚å¦‚æžœä½¿ç”¨å¹¶è¡Œæ§½ï¼ˆ`-np`ï¼‰ï¼Œæ€»ä¸Šä¸‹æ–‡åœ¨æ§½ä¹‹é—´åˆ†é…â€”â€”`-c 32768 -np 4` æ—¶æ¯ä¸ªæ§½åªæœ‰ 8kã€‚

ç„¶åŽé…ç½® Zed æŒ‡å‘å®ƒï¼š

```bash
zed model
# é€‰æ‹©"Custom endpoint (self-hosted / VLLM / etc.)"
# è¾“å…¥ URLï¼šhttp://localhost:8080/v1
# è·³è¿‡ API keyï¼ˆæœ¬åœ°æœåŠ¡å™¨ä¸éœ€è¦ï¼‰
# è¾“å…¥æ¨¡åž‹åç§°â€”â€”æˆ–ç•™ç©ºä»¥åœ¨åªåŠ è½½ä¸€ä¸ªæ¨¡åž‹æ—¶è‡ªåŠ¨æ£€æµ‹
```

è¿™ä¼šå°†ç«¯ç‚¹ä¿å­˜åˆ° `config.yaml`ï¼Œåœ¨ä¼šè¯é—´æŒä¹…ä¿ç•™ã€‚

:::caution `--jinja` æ˜¯å·¥å…·è°ƒç”¨çš„å¿…è¦æ¡ä»¶
æ²¡æœ‰ `--jinja`ï¼Œllama-server ä¼šå®Œå…¨å¿½ç•¥ `tools` å‚æ•°ã€‚æ¨¡åž‹ä¼šå°è¯•åœ¨å“åº”æ–‡æœ¬ä¸­å†™å…¥ JSON æ¥è°ƒç”¨å·¥å…·ï¼Œä½† Zed ä¸ä¼šå°†å…¶è¯†åˆ«ä¸ºå·¥å…·è°ƒç”¨â€”â€”ä½ ä¼šçœ‹åˆ°åŽŸå§‹ JSONï¼ˆå¦‚ `{"name": "web_search", ...}`ï¼‰ä½œä¸ºæ¶ˆæ¯æ‰“å°å‡ºæ¥ï¼Œè€Œä¸æ˜¯å®žé™…æ‰§è¡Œæœç´¢ã€‚

åŽŸç”Ÿå·¥å…·è°ƒç”¨æ”¯æŒï¼ˆæœ€ä½³æ€§èƒ½ï¼‰ï¼šLlama 3.xã€Qwen 2.5ï¼ˆåŒ…æ‹¬ Coderï¼‰ã€Zed 2/3ã€Mistralã€DeepSeekã€Functionaryã€‚å…¶ä»–æ‰€æœ‰æ¨¡åž‹ä½¿ç”¨é€šç”¨å¤„ç†å™¨ï¼Œå¯ä»¥å·¥ä½œä½†æ•ˆçŽ‡å¯èƒ½è¾ƒä½Žã€‚å®Œæ•´åˆ—è¡¨å‚è§ [llama.cpp å‡½æ•°è°ƒç”¨æ–‡æ¡£](https://github.com/ggml-org/llama.cpp/blob/master/docs/function-calling.md)ã€‚

å¯é€šè¿‡æ£€æŸ¥ `http://localhost:8080/props` éªŒè¯å·¥å…·æ”¯æŒæ˜¯å¦å·²æ¿€æ´»â€”â€”`chat_template` å­—æ®µåº”å­˜åœ¨ã€‚
:::

:::tip
ä»Ž [Hugging Face](https://huggingface.co/models?library=gguf) ä¸‹è½½ GGUF æ¨¡åž‹ã€‚Q4_K_M é‡åŒ–åœ¨è´¨é‡ä¸Žå†…å­˜ä½¿ç”¨ä¹‹é—´æä¾›æœ€ä½³å¹³è¡¡ã€‚
:::

---

### LM Studio â€” å¸¦æœ¬åœ°æ¨¡åž‹çš„æ¡Œé¢åº”ç”¨

[LM Studio](https://lmstudio.ai/) æ˜¯ä¸€æ¬¾å¸¦ GUI çš„æœ¬åœ°æ¨¡åž‹è¿è¡Œæ¡Œé¢åº”ç”¨ã€‚æœ€é€‚åˆï¼šåå¥½å¯è§†åŒ–ç•Œé¢çš„ç”¨æˆ·ã€å¿«é€Ÿæ¨¡åž‹æµ‹è¯•ã€macOS/Windows/Linux å¼€å‘è€…ã€‚

ä»Ž LM Studio åº”ç”¨å¯åŠ¨æœåŠ¡å™¨ï¼ˆå¼€å‘è€…æ ‡ç­¾é¡µ â†’ å¯åŠ¨æœåŠ¡å™¨ï¼‰ï¼Œæˆ–ä½¿ç”¨ CLIï¼š

```bash
lms server start                        # åœ¨ç«¯å£ 1234 å¯åŠ¨
lms load qwen2.5-coder --context-length 32768
```

ç„¶åŽé…ç½® Zedï¼š

```bash
zed model
# é€‰æ‹©"LM Studio"
# æŒ‰ Enter ä½¿ç”¨ http://localhost:1234/v1
# ä»Žå·²å‘çŽ°çš„æ¨¡åž‹ä¸­é€‰æ‹©
# å¦‚æžœå¯ç”¨äº† LM Studio æœåŠ¡å™¨è®¤è¯ï¼Œåœ¨æç¤ºæ—¶è¾“å…¥ LM_API_KEY
```

Zed ä¼šè‡ªåŠ¨ä»¥ 64K ä¸Šä¸‹æ–‡é•¿åº¦åŠ è½½ LM Studio æ¨¡åž‹ã€‚

åœ¨ LM Studio ä¸­æ›´æ”¹ä¸Šä¸‹æ–‡é•¿åº¦ï¼š

1. ç‚¹å‡»æ¨¡åž‹é€‰æ‹©å™¨æ—çš„é½¿è½®å›¾æ ‡
2. å°†"Context Length"è®¾ç½®ä¸ºè‡³å°‘ 64000 ä»¥èŽ·å¾—æµç•…ä½“éªŒ
3. é‡æ–°åŠ è½½æ¨¡åž‹ä½¿æ›´æ”¹ç”Ÿæ•ˆ
4. å¦‚æžœä½ çš„æœºå™¨æ— æ³•å®¹çº³ 64000ï¼Œè€ƒè™‘ä½¿ç”¨ä¸Šä¸‹æ–‡é•¿åº¦æ›´å¤§çš„å°æ¨¡åž‹ã€‚

æˆ–ä½¿ç”¨ CLIï¼š`lms load model-name --context-length 64000`

å¯ä½¿ç”¨ CLI ä¼°ç®—æ¨¡åž‹æ˜¯å¦èƒ½æ”¾å…¥å†…å­˜ï¼š`lms load model-name --context-length 64000 --estimate-only`

è®¾ç½®æ¯ä¸ªæ¨¡åž‹çš„æŒä¹…é»˜è®¤å€¼ï¼šæˆ‘çš„æ¨¡åž‹æ ‡ç­¾é¡µ â†’ æ¨¡åž‹ä¸Šçš„é½¿è½®å›¾æ ‡ â†’ è®¾ç½®ä¸Šä¸‹æ–‡å¤§å°ã€‚
:::

**å·¥å…·è°ƒç”¨ï¼š** è‡ª LM Studio 0.3.6 èµ·æ”¯æŒã€‚å…·æœ‰åŽŸç”Ÿå·¥å…·è°ƒç”¨è®­ç»ƒçš„æ¨¡åž‹ï¼ˆQwen 2.5ã€Llama 3.xã€Mistralã€Zedï¼‰ä¼šè¢«è‡ªåŠ¨æ£€æµ‹å¹¶æ˜¾ç¤ºå·¥å…·å¾½ç« ã€‚å…¶ä»–æ¨¡åž‹ä½¿ç”¨é€šç”¨å›žé€€ï¼Œå¯é æ€§å¯èƒ½è¾ƒä½Žã€‚

---

### WSL2 ç½‘ç»œï¼ˆWindows ç”¨æˆ·ï¼‰

ç”±äºŽ Zed Agent éœ€è¦ Unix çŽ¯å¢ƒï¼ŒWindows ç”¨æˆ·åœ¨ WSL2 å†…è¿è¡Œå®ƒã€‚å¦‚æžœä½ çš„æ¨¡åž‹æœåŠ¡å™¨ï¼ˆOllamaã€LM Studio ç­‰ï¼‰è¿è¡Œåœ¨ **Windows ä¸»æœº**ä¸Šï¼Œéœ€è¦æ¡¥æŽ¥ç½‘ç»œâ€”â€”WSL2 ä½¿ç”¨å…·æœ‰ç‹¬ç«‹å­ç½‘çš„è™šæ‹Ÿç½‘ç»œé€‚é…å™¨ï¼Œå› æ­¤ WSL2 å†…çš„ `localhost` æŒ‡å‘ Linux è™šæ‹Ÿæœºï¼Œ**è€Œéž** Windows ä¸»æœºã€‚

:::tip éƒ½åœ¨ WSL2 å†…ï¼Ÿæ²¡é—®é¢˜ã€‚
å¦‚æžœä½ çš„æ¨¡åž‹æœåŠ¡å™¨ä¹Ÿåœ¨ WSL2 å†…è¿è¡Œï¼ˆvLLMã€SGLang å’Œ llama-server çš„å¸¸è§æƒ…å†µï¼‰ï¼Œ`localhost` å¯ä»¥æ­£å¸¸å·¥ä½œâ€”â€”å®ƒä»¬å…±äº«åŒä¸€ç½‘ç»œå‘½åç©ºé—´ã€‚è·³è¿‡æœ¬èŠ‚ã€‚
:::

#### æ–¹å¼ 1ï¼šé•œåƒç½‘ç»œæ¨¡å¼ï¼ˆæŽ¨èï¼‰

é€‚ç”¨äºŽ **Windows 11 22H2+**ï¼Œé•œåƒæ¨¡å¼ä½¿ `localhost` åœ¨ Windows å’Œ WSL2 ä¹‹é—´åŒå‘å·¥ä½œâ€”â€”æœ€ç®€å•çš„è§£å†³æ–¹æ¡ˆã€‚

1. åˆ›å»ºæˆ–ç¼–è¾‘ `%USERPROFILE%\.wslconfig`ï¼ˆå¦‚ `C:\Users\YourName\.wslconfig`ï¼‰ï¼š
   ```ini
   [wsl2]
   networkingMode=mirrored
   ```

2. ä»Ž PowerShell é‡å¯ WSLï¼š
   ```powershell
   wsl --shutdown
   ```

3. é‡æ–°æ‰“å¼€ WSL2 ç»ˆç«¯ã€‚`localhost` çŽ°åœ¨å¯ä»¥è®¿é—® Windows æœåŠ¡ï¼š
   ```bash
   curl http://localhost:11434/v1/models   # Windows ä¸Šçš„ Ollamaâ€”â€”æ­£å¸¸å·¥ä½œ
   ```

:::note Hyper-V é˜²ç«å¢™
åœ¨æŸäº› Windows 11 ç‰ˆæœ¬ä¸Šï¼ŒHyper-V é˜²ç«å¢™é»˜è®¤é˜»æ­¢é•œåƒè¿žæŽ¥ã€‚å¦‚æžœå¯ç”¨é•œåƒæ¨¡å¼åŽ `localhost` ä»æ— æ³•å·¥ä½œï¼Œåœ¨**ç®¡ç†å‘˜ PowerShell** ä¸­è¿è¡Œï¼š
```powershell
Set-NetFirewallHyperVVMSetting -Name '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -DefaultInboundAction Allow
```
:::

#### æ–¹å¼ 2ï¼šä½¿ç”¨ Windows ä¸»æœº IPï¼ˆWindows 10 / æ—§ç‰ˆæœ¬ï¼‰

å¦‚æžœæ— æ³•ä½¿ç”¨é•œåƒæ¨¡å¼ï¼Œä»Ž WSL2 å†…éƒ¨æ‰¾åˆ° Windows ä¸»æœº IP å¹¶ä½¿ç”¨å®ƒä»£æ›¿ `localhost`ï¼š

```bash
# èŽ·å– Windows ä¸»æœº IPï¼ˆWSL2 è™šæ‹Ÿç½‘ç»œçš„é»˜è®¤ç½‘å…³ï¼‰
ip route show | grep -i default | awk '{ print $3 }'
# ç¤ºä¾‹è¾“å‡ºï¼š172.29.192.1
```

åœ¨ Zed é…ç½®ä¸­ä½¿ç”¨è¯¥ IPï¼š

```yaml
model:
  default: qwen2.5-coder:32b
  provider: custom
  base_url: http://172.29.192.1:11434/v1   # Windows ä¸»æœº IPï¼Œéž localhost
```

:::tip åŠ¨æ€èŽ·å–
WSL2 é‡å¯åŽä¸»æœº IP å¯èƒ½å˜åŒ–ã€‚å¯åœ¨ shell ä¸­åŠ¨æ€èŽ·å–ï¼š
```bash
export WSL_HOST=$(ip route show | grep -i default | awk '{ print $3 }')
echo "Windows host at: $WSL_HOST"
curl http://$WSL_HOST:11434/v1/models   # æµ‹è¯• Ollama
```

æˆ–ä½¿ç”¨æœºå™¨çš„ mDNS åç§°ï¼ˆéœ€è¦ WSL2 ä¸­çš„ `libnss-mdns`ï¼‰ï¼š
```bash
sudo apt install libnss-mdns
curl http://$(hostname).local:11434/v1/models
```
:::

#### æœåŠ¡å™¨ç»‘å®šåœ°å€ï¼ˆNAT æ¨¡å¼å¿…éœ€ï¼‰

å¦‚æžœä½¿ç”¨**æ–¹å¼ 2**ï¼ˆNAT æ¨¡å¼åŠ ä¸»æœº IPï¼‰ï¼ŒWindows ä¸Šçš„æ¨¡åž‹æœåŠ¡å™¨å¿…é¡»æŽ¥å—æ¥è‡ª `127.0.0.1` ä»¥å¤–çš„è¿žæŽ¥ã€‚é»˜è®¤æƒ…å†µä¸‹ï¼Œå¤§å¤šæ•°æœåŠ¡å™¨åªç›‘å¬ localhostâ€”â€”NAT æ¨¡å¼ä¸‹ WSL2 çš„è¿žæŽ¥æ¥è‡ªä¸åŒçš„è™šæ‹Ÿå­ç½‘ï¼Œä¼šè¢«æ‹’ç»ã€‚åœ¨é•œåƒæ¨¡å¼ä¸‹ï¼Œ`localhost` ç›´æŽ¥æ˜ å°„ï¼Œå› æ­¤é»˜è®¤çš„ `127.0.0.1` ç»‘å®šå¯ä»¥æ­£å¸¸å·¥ä½œã€‚

| æœåŠ¡å™¨ | é»˜è®¤ç»‘å®š | ä¿®å¤æ–¹å¼ |
|--------|-------------|------------|
| **Ollama** | `127.0.0.1` | å¯åŠ¨ Ollama å‰è®¾ç½® `OLLAMA_HOST=0.0.0.0` çŽ¯å¢ƒå˜é‡ï¼ˆWindows ç³»ç»Ÿè®¾ç½® â†’ çŽ¯å¢ƒå˜é‡ï¼Œæˆ–ç¼–è¾‘ Ollama æœåŠ¡ï¼‰ |
| **LM Studio** | `127.0.0.1` | åœ¨å¼€å‘è€…æ ‡ç­¾é¡µ â†’ æœåŠ¡å™¨è®¾ç½®ä¸­å¯ç”¨**"Serve on Network"** |
| **llama-server** | `127.0.0.1` | åœ¨å¯åŠ¨å‘½ä»¤ä¸­æ·»åŠ  `--host 0.0.0.0` |
| **vLLM** | `0.0.0.0` | é»˜è®¤å·²ç»‘å®šæ‰€æœ‰æŽ¥å£ |
| **SGLang** | `127.0.0.1` | åœ¨å¯åŠ¨å‘½ä»¤ä¸­æ·»åŠ  `--host 0.0.0.0` |

**Windows ä¸Šçš„ Ollamaï¼ˆè¯¦ç»†æ­¥éª¤ï¼‰ï¼š** Ollama ä½œä¸º Windows æœåŠ¡è¿è¡Œã€‚è®¾ç½® `OLLAMA_HOST`ï¼š
1. æ‰“å¼€**ç³»ç»Ÿå±žæ€§** â†’ **çŽ¯å¢ƒå˜é‡**
2. æ·»åŠ æ–°çš„**ç³»ç»Ÿå˜é‡**ï¼š`OLLAMA_HOST` = `0.0.0.0`
3. é‡å¯ Ollama æœåŠ¡ï¼ˆæˆ–é‡å¯ç”µè„‘ï¼‰

#### Windows é˜²ç«å¢™

Windows é˜²ç«å¢™å°† WSL2 è§†ä¸ºç‹¬ç«‹ç½‘ç»œï¼ˆåœ¨ NAT å’Œé•œåƒæ¨¡å¼ä¸‹å‡å¦‚æ­¤ï¼‰ã€‚å¦‚æžœæŒ‰ä¸Šè¿°æ­¥éª¤æ“ä½œåŽè¿žæŽ¥ä»ç„¶å¤±è´¥ï¼Œä¸ºæ¨¡åž‹æœåŠ¡å™¨ç«¯å£æ·»åŠ é˜²ç«å¢™è§„åˆ™ï¼š

```powershell
# åœ¨ç®¡ç†å‘˜ PowerShell ä¸­è¿è¡Œâ€”â€”å°† PORT æ›¿æ¢ä¸ºä½ æœåŠ¡å™¨çš„ç«¯å£
New-NetFirewallRule -DisplayName "Allow WSL2 to Model Server" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 11434
```

å¸¸ç”¨ç«¯å£ï¼šOllama `11434`ã€vLLM `8000`ã€SGLang `30000`ã€llama-server `8080`ã€LM Studio `1234`ã€‚

#### å¿«é€ŸéªŒè¯

ä»Ž WSL2 å†…éƒ¨æµ‹è¯•æ˜¯å¦èƒ½è®¿é—®æ¨¡åž‹æœåŠ¡å™¨ï¼š

```bash
# å°† URL æ›¿æ¢ä¸ºä½ æœåŠ¡å™¨çš„åœ°å€å’Œç«¯å£
curl http://localhost:11434/v1/models          # é•œåƒæ¨¡å¼
curl http://172.29.192.1:11434/v1/models       # NAT æ¨¡å¼ï¼ˆä½¿ç”¨ä½ çš„å®žé™…ä¸»æœº IPï¼‰
```

å¦‚æžœæ”¶åˆ°åˆ—å‡ºæ¨¡åž‹çš„ JSON å“åº”ï¼Œè¯´æ˜Žé…ç½®æ­£ç¡®ã€‚åœ¨ Zed é…ç½®ä¸­ä½¿ç”¨ç›¸åŒçš„ URL ä½œä¸º `base_url`ã€‚

---

### æœ¬åœ°æ¨¡åž‹æ•…éšœæŽ’æŸ¥

ä»¥ä¸‹é—®é¢˜å½±å“ä¸Ž Zed é…åˆä½¿ç”¨çš„**æ‰€æœ‰**æœ¬åœ°æŽ¨ç†æœåŠ¡å™¨ã€‚

#### ä»Ž WSL2 è¿žæŽ¥ Windows æ‰˜ç®¡æ¨¡åž‹æœåŠ¡å™¨æ—¶"è¿žæŽ¥è¢«æ‹’ç»"

å¦‚æžœä½ åœ¨ WSL2 å†…è¿è¡Œ Zed è€Œæ¨¡åž‹æœåŠ¡å™¨åœ¨ Windows ä¸»æœºä¸Šï¼Œåœ¨ WSL2 é»˜è®¤ NAT ç½‘ç»œæ¨¡å¼ä¸‹ `http://localhost:<port>` æ— æ³•å·¥ä½œã€‚å‚è§ä¸Šæ–¹çš„ [WSL2 ç½‘ç»œ](#wsl2-networking-windows-users) äº†è§£è§£å†³æ–¹æ¡ˆã€‚

#### å·¥å…·è°ƒç”¨ä»¥æ–‡æœ¬å½¢å¼å‡ºçŽ°è€Œéžæ‰§è¡Œ

æ¨¡åž‹è¾“å‡ºç±»ä¼¼ `{"name": "web_search", "arguments": {...}}` çš„æ¶ˆæ¯ï¼Œè€Œä¸æ˜¯å®žé™…è°ƒç”¨å·¥å…·ã€‚

**åŽŸå› ï¼š** ä½ çš„æœåŠ¡å™¨æœªå¯ç”¨å·¥å…·è°ƒç”¨ï¼Œæˆ–æ¨¡åž‹ä¸æ”¯æŒé€šè¿‡æœåŠ¡å™¨çš„å·¥å…·è°ƒç”¨å®žçŽ°ã€‚

| æœåŠ¡å™¨ | ä¿®å¤æ–¹å¼ |
|--------|-----|
| **llama.cpp** | åœ¨å¯åŠ¨å‘½ä»¤ä¸­æ·»åŠ  `--jinja` |
| **vLLM** | æ·»åŠ  `--enable-auto-tool-choice --tool-call-parser zed` |
| **SGLang** | æ·»åŠ  `--tool-call-parser qwen`ï¼ˆæˆ–é€‚å½“çš„è§£æžå™¨ï¼‰ |
| **Ollama** | å·¥å…·è°ƒç”¨é»˜è®¤å¯ç”¨â€”â€”ç¡®ä¿ä½ çš„æ¨¡åž‹æ”¯æŒï¼ˆä½¿ç”¨ `ollama show model-name` æ£€æŸ¥ï¼‰ |
| **LM Studio** | æ›´æ–°åˆ° 0.3.6+ å¹¶ä½¿ç”¨å…·æœ‰åŽŸç”Ÿå·¥å…·æ”¯æŒçš„æ¨¡åž‹ |

#### æ¨¡åž‹ä¼¼ä¹Žå¿˜è®°ä¸Šä¸‹æ–‡æˆ–ç»™å‡ºä¸è¿žè´¯çš„å“åº”

**åŽŸå› ï¼š** ä¸Šä¸‹æ–‡çª—å£å¤ªå°ã€‚å½“å¯¹è¯è¶…è¿‡ä¸Šä¸‹æ–‡é™åˆ¶æ—¶ï¼Œå¤§å¤šæ•°æœåŠ¡å™¨ä¼šé™é»˜ä¸¢å¼ƒè¾ƒæ—©çš„æ¶ˆæ¯ã€‚Zed çš„ç³»ç»Ÿ prompt åŠ å·¥å…· schema å•ç‹¬å°±å¯èƒ½å ç”¨ 4kâ€“8k tokensã€‚

**è¯Šæ–­ï¼š**

```bash
# æ£€æŸ¥ Zed è®¤ä¸ºçš„ä¸Šä¸‹æ–‡å¤§å°
# æŸ¥çœ‹å¯åŠ¨è¡Œï¼š"Context limit: X tokens"

# æ£€æŸ¥æœåŠ¡å™¨çš„å®žé™…ä¸Šä¸‹æ–‡
# Ollamaï¼šollama psï¼ˆCONTEXT åˆ—ï¼‰
# llama.cppï¼šcurl http://localhost:8080/props | jq '.default_generation_settings.n_ctx'
# vLLMï¼šæ£€æŸ¥å¯åŠ¨å‚æ•°ä¸­çš„ --max-model-len
```

**ä¿®å¤ï¼š** å°†ä¸Šä¸‹æ–‡è®¾ç½®ä¸ºè‡³å°‘ **32,768 tokens** ç”¨äºŽæ™ºèƒ½ä½“ä½¿ç”¨ã€‚å‚è§ä¸Šæ–¹å„æœåŠ¡å™¨ç« èŠ‚äº†è§£å…·ä½“æ ‡å¿—ã€‚

#### å¯åŠ¨æ—¶æ˜¾ç¤º"Context limit: 2048 tokens"

Zed ä»ŽæœåŠ¡å™¨çš„ `/v1/models` ç«¯ç‚¹è‡ªåŠ¨æ£€æµ‹ä¸Šä¸‹æ–‡é•¿åº¦ã€‚å¦‚æžœæœåŠ¡å™¨æŠ¥å‘Šçš„å€¼è¾ƒä½Žï¼ˆæˆ–æ ¹æœ¬ä¸æŠ¥å‘Šï¼‰ï¼ŒZed ä½¿ç”¨æ¨¡åž‹å£°æ˜Žçš„é™åˆ¶ï¼Œè¯¥å€¼å¯èƒ½ä¸æ­£ç¡®ã€‚

**ä¿®å¤ï¼š** åœ¨ `config.yaml` ä¸­æ˜¾å¼è®¾ç½®ï¼š

```yaml
model:
  default: your-model
  provider: custom
  base_url: http://localhost:11434/v1
  context_length: 32768
```

#### å“åº”åœ¨å¥å­ä¸­é—´è¢«æˆªæ–­

**å¯èƒ½åŽŸå› ï¼š**
1. **æœåŠ¡å™¨ä¸Šçš„è¾“å‡ºä¸Šé™ï¼ˆ`max_tokens`ï¼‰è¿‡ä½Ž** â€” SGLang é»˜è®¤æ¯æ¬¡å“åº” 128 tokensã€‚åœ¨æœåŠ¡å™¨ä¸Šè®¾ç½® `--default-max-tokens`ï¼Œæˆ–åœ¨ config.yaml ä¸­é…ç½® `model.max_tokens`ã€‚æ³¨æ„ï¼š`max_tokens` åªæŽ§åˆ¶å“åº”é•¿åº¦â€”â€”ä¸Žå¯¹è¯åŽ†å²å¯ä»¥æœ‰å¤šé•¿æ— å…³ï¼ˆé‚£æ˜¯ `context_length`ï¼‰ã€‚
2. **ä¸Šä¸‹æ–‡è€—å°½** â€” æ¨¡åž‹å¡«æ»¡äº†ä¸Šä¸‹æ–‡çª—å£ã€‚å¢žåŠ  `model.context_length` æˆ–åœ¨ Zed ä¸­å¯ç”¨[ä¸Šä¸‹æ–‡åŽ‹ç¼©](/user-guide/configuration#context-compression)ã€‚

---

### LiteLLM Proxy â€” å¤šæä¾›å•†ç½‘å…³

[LiteLLM](https://docs.litellm.ai/) æ˜¯ä¸€ä¸ª OpenAI å…¼å®¹ä»£ç†ï¼Œå°† 100+ LLM æä¾›å•†ç»Ÿä¸€åœ¨å•ä¸€ API åŽé¢ã€‚æœ€é€‚åˆï¼šæ— éœ€æ›´æ”¹é…ç½®å³å¯åˆ‡æ¢æä¾›å•†ã€è´Ÿè½½å‡è¡¡ã€æ•…éšœè½¬ç§»é“¾ã€é¢„ç®—æŽ§åˆ¶ã€‚

```bash
# å®‰è£…å¹¶å¯åŠ¨
pip install "litellm[proxy]"
litellm --model anthropic/claude-sonnet-4 --port 4000

# æˆ–ä½¿ç”¨é…ç½®æ–‡ä»¶æ”¯æŒå¤šä¸ªæ¨¡åž‹ï¼š
litellm --config litellm_config.yaml --port 4000
```

ç„¶åŽé€šè¿‡ `zed model` â†’ è‡ªå®šä¹‰ç«¯ç‚¹ â†’ `http://localhost:4000/v1` é…ç½® Zedã€‚

å¸¦æ•…éšœè½¬ç§»çš„ `litellm_config.yaml` ç¤ºä¾‹ï¼š
```yaml
model_list:
  - model_name: "best"
    litellm_params:
      model: anthropic/claude-sonnet-4
      api_key: sk-ant-...
  - model_name: "best"
    litellm_params:
      model: openai/gpt-4o
      api_key: sk-...
router_settings:
  routing_strategy: "latency-based-routing"
```

---

### ClawRouter â€” æˆæœ¬ä¼˜åŒ–è·¯ç”±

[ClawRouter](https://github.com/BlockRunAI/ClawRouter) ç”± BlockRunAI å¼€å‘ï¼Œæ˜¯ä¸€ä¸ªæœ¬åœ°è·¯ç”±ä»£ç†ï¼Œæ ¹æ®æŸ¥è¯¢å¤æ‚åº¦è‡ªåŠ¨é€‰æ‹©æ¨¡åž‹ã€‚å®ƒä»Ž 14 ä¸ªç»´åº¦å¯¹è¯·æ±‚è¿›è¡Œåˆ†ç±»ï¼Œå¹¶è·¯ç”±åˆ°èƒ½å¤„ç†è¯¥ä»»åŠ¡çš„æœ€ä¾¿å®œæ¨¡åž‹ã€‚æ”¯ä»˜æ–¹å¼ä¸º USDC åŠ å¯†è´§å¸ï¼ˆæ— éœ€ API keyï¼‰ã€‚

```bash
# å®‰è£…å¹¶å¯åŠ¨
npx @blockrun/clawrouter    # åœ¨ç«¯å£ 8402 å¯åŠ¨
```

ç„¶åŽé€šè¿‡ `zed model` â†’ è‡ªå®šä¹‰ç«¯ç‚¹ â†’ `http://localhost:8402/v1` â†’ æ¨¡åž‹åç§° `blockrun/auto` é…ç½® Zedã€‚

è·¯ç”±é…ç½®æ–‡ä»¶ï¼š
| é…ç½®æ–‡ä»¶ | ç­–ç•¥ | èŠ‚çœ |
|---------|----------|---------|
| `blockrun/auto` | è´¨é‡/æˆæœ¬å‡è¡¡ | 74-100% |
| `blockrun/eco` | å°½å¯èƒ½ä¾¿å®œ | 95-100% |
| `blockrun/premium` | æœ€ä½³è´¨é‡æ¨¡åž‹ | 0% |
| `blockrun/free` | ä»…å…è´¹æ¨¡åž‹ | 100% |
| `blockrun/agentic` | é’ˆå¯¹å·¥å…·ä½¿ç”¨ä¼˜åŒ– | ä¸å®š |

:::note
ClawRouter éœ€è¦åœ¨ Base æˆ– Solana ä¸Šæœ‰ USDC å……å€¼çš„é’±åŒ…ç”¨äºŽæ”¯ä»˜ã€‚æ‰€æœ‰è¯·æ±‚é€šè¿‡ BlockRun çš„åŽç«¯ API è·¯ç”±ã€‚è¿è¡Œ `npx @blockrun/clawrouter doctor` æ£€æŸ¥é’±åŒ…çŠ¶æ€ã€‚
:::

---

### å…¶ä»–å…¼å®¹æä¾›å•†

ä»»ä½•å…·æœ‰ OpenAI å…¼å®¹ API çš„æœåŠ¡å‡å¯ä½¿ç”¨ã€‚ä¸€äº›å¸¸ç”¨é€‰é¡¹ï¼š

| æä¾›å•† | åŸºç¡€ URL | è¯´æ˜Ž |
|----------|----------|-------|
| [Together AI](https://together.ai) | `https://api.together.xyz/v1` | äº‘æ‰˜ç®¡å¼€æºæ¨¡åž‹ |
| [Groq](https://groq.com) | `https://api.groq.com/openai/v1` | è¶…å¿«æŽ¨ç† |
| [DeepSeek](https://deepseek.com) | `https://api.deepseek.com/v1` | DeepSeek æ¨¡åž‹ |
| [Fireworks AI](https://fireworks.ai) | `https://api.fireworks.ai/inference/v1` | å¿«é€Ÿå¼€æºæ¨¡åž‹æ‰˜ç®¡ |
| [GMI Cloud](https://www.gmicloud.ai/) | `https://api.gmi-serving.com/v1` | æ‰˜ç®¡ OpenAI å…¼å®¹æŽ¨ç† |
| [Cerebras](https://cerebras.ai) | `https://api.cerebras.ai/v1` | æ™¶åœ†çº§èŠ¯ç‰‡æŽ¨ç† |
| [Mistral AI](https://mistral.ai) | `https://api.mistral.ai/v1` | Mistral æ¨¡åž‹ |
| [OpenAI](https://openai.com) | `https://api.openai.com/v1` | ç›´è¿ž OpenAI |
| [Azure OpenAI](https://azure.microsoft.com) | `https://YOUR.openai.azure.com/` | ä¼ä¸šçº§ OpenAI |
| [LocalAI](https://localai.io) | `http://localhost:8080/v1` | è‡ªæ‰˜ç®¡ï¼Œå¤šæ¨¡åž‹ |
| [Jan](https://jan.ai) | `http://localhost:1337/v1` | å¸¦æœ¬åœ°æ¨¡åž‹çš„æ¡Œé¢åº”ç”¨ |

é€šè¿‡ `zed model` â†’ è‡ªå®šä¹‰ç«¯ç‚¹ï¼Œæˆ–åœ¨ `config.yaml` ä¸­é…ç½®ä»»æ„ä¸Šè¿°æœåŠ¡ï¼š

```yaml
model:
  default: meta-llama/Llama-3.1-70B-Instruct-Turbo
  provider: custom
  base_url: https://api.together.xyz/v1
  api_key: your-together-key
```

---

### ä¸Šä¸‹æ–‡é•¿åº¦æ£€æµ‹

:::note ä¸¤ä¸ªè®¾ç½®ï¼Œå®¹æ˜“æ··æ·†
**`context_length`** æ˜¯**æ€»ä¸Šä¸‹æ–‡çª—å£**â€”â€”è¾“å…¥å’Œè¾“å‡º token çš„åˆè®¡é¢„ç®—ï¼ˆä¾‹å¦‚ Claude Opus 4.6 ä¸º 200,000ï¼‰ã€‚Zed ç”¨å®ƒæ¥å†³å®šä½•æ—¶åŽ‹ç¼©åŽ†å²è®°å½•ä»¥åŠéªŒè¯ API è¯·æ±‚ã€‚

**`model.max_tokens`** æ˜¯**è¾“å‡ºä¸Šé™**â€”â€”æ¨¡åž‹åœ¨*å•æ¬¡å“åº”*ä¸­æœ€å¤šå¯ç”Ÿæˆçš„ token æ•°ã€‚ä¸Žå¯¹è¯åŽ†å²å¯ä»¥æœ‰å¤šé•¿æ— å…³ã€‚è¡Œä¸šæ ‡å‡†åç§° `max_tokens` æ˜¯å¸¸è§çš„æ··æ·†æ¥æºï¼›Anthropic çš„åŽŸç”Ÿ API å·²å°†å…¶é‡å‘½åä¸º `max_output_tokens` ä»¥æ›´æ¸…æ™°ã€‚

å½“è‡ªåŠ¨æ£€æµ‹èŽ·å–çš„çª—å£å¤§å°ä¸æ­£ç¡®æ—¶ï¼Œè®¾ç½® `context_length`ã€‚
ä»…å½“éœ€è¦é™åˆ¶å•æ¬¡å“åº”é•¿åº¦æ—¶ï¼Œæ‰è®¾ç½® `model.max_tokens`ã€‚
:::

Zed ä½¿ç”¨å¤šæºè§£æžé“¾æ¥æ£€æµ‹æ¨¡åž‹å’Œæä¾›å•†çš„æ­£ç¡®ä¸Šä¸‹æ–‡çª—å£ï¼š

1. **é…ç½®è¦†ç›–** â€” config.yaml ä¸­çš„ `model.context_length`ï¼ˆæœ€é«˜ä¼˜å…ˆçº§ï¼‰
2. **è‡ªå®šä¹‰æä¾›å•†æŒ‰æ¨¡åž‹** â€” `custom_providers[].models.<id>.context_length`
3. **æŒä¹…ç¼“å­˜** â€” ä¹‹å‰å‘çŽ°çš„å€¼ï¼ˆé‡å¯åŽä¿ç•™ï¼‰
4. **ç«¯ç‚¹ `/models`** â€” æŸ¥è¯¢æœåŠ¡å™¨ APIï¼ˆæœ¬åœ°/è‡ªå®šä¹‰ç«¯ç‚¹ï¼‰
5. **Anthropic `/v1/models`** â€” æŸ¥è¯¢ Anthropic API èŽ·å– `max_input_tokens`ï¼ˆä»… API key ç”¨æˆ·ï¼‰
6. **OpenRouter API** â€” æ¥è‡ª OpenRouter çš„å®žæ—¶æ¨¡åž‹å…ƒæ•°æ®
7. **Zed Portal** â€” å°† Nous æ¨¡åž‹ ID åŽç¼€åŒ¹é…åˆ° OpenRouter å…ƒæ•°æ®
8. **[models.dev](https://models.dev)** â€” ç¤¾åŒºç»´æŠ¤çš„æ³¨å†Œè¡¨ï¼ŒåŒ…å« 100+ æä¾›å•† 3800+ æ¨¡åž‹çš„æä¾›å•†ç‰¹å®šä¸Šä¸‹æ–‡é•¿åº¦
9. **å›žé€€é»˜è®¤å€¼** â€” å¹¿æ³›çš„æ¨¡åž‹ç³»åˆ—æ¨¡å¼ï¼ˆé»˜è®¤ 128Kï¼‰

å¤§å¤šæ•°é…ç½®å¼€ç®±å³ç”¨ã€‚è¯¥ç³»ç»Ÿå…·æœ‰æä¾›å•†æ„ŸçŸ¥èƒ½åŠ›â€”â€”åŒä¸€æ¨¡åž‹åœ¨ä¸åŒæœåŠ¡å•†å¤„å¯èƒ½æœ‰ä¸åŒçš„ä¸Šä¸‹æ–‡é™åˆ¶ï¼ˆä¾‹å¦‚ `claude-opus-4.6` åœ¨ Anthropic ç›´è¿žæ—¶ä¸º 1Mï¼Œåœ¨ GitHub Copilot ä¸Šä¸º 128Kï¼‰ã€‚

è¦æ˜¾å¼è®¾ç½®ä¸Šä¸‹æ–‡é•¿åº¦ï¼Œåœ¨æ¨¡åž‹é…ç½®ä¸­æ·»åŠ  `context_length`ï¼š

```yaml
model:
  default: "qwen3.5:9b"
  base_url: "http://localhost:8080/v1"
  context_length: 131072  # tokens
```

å¯¹äºŽè‡ªå®šä¹‰ç«¯ç‚¹ï¼Œä¹Ÿå¯ä»¥æŒ‰æ¨¡åž‹è®¾ç½®ä¸Šä¸‹æ–‡é•¿åº¦ï¼š

```yaml
custom_providers:
  - name: "My Local LLM"
    base_url: "http://localhost:11434/v1"
    models:
      qwen3.5:27b:
        context_length: 32768
      deepseek-r1:70b:
        context_length: 65536
```

`zed model` åœ¨é…ç½®è‡ªå®šä¹‰ç«¯ç‚¹æ—¶ä¼šæç¤ºè¾“å…¥ä¸Šä¸‹æ–‡é•¿åº¦ã€‚ç•™ç©ºåˆ™è‡ªåŠ¨æ£€æµ‹ã€‚

:::tip ä½•æ—¶æ‰‹åŠ¨è®¾ç½®
- ä½ ä½¿ç”¨çš„ Ollama è‡ªå®šä¹‰ `num_ctx` ä½ŽäºŽæ¨¡åž‹æœ€å¤§å€¼
- ä½ æƒ³å°†ä¸Šä¸‹æ–‡é™åˆ¶åœ¨æ¨¡åž‹æœ€å¤§å€¼ä»¥ä¸‹ï¼ˆä¾‹å¦‚åœ¨ 128k æ¨¡åž‹ä¸Šä½¿ç”¨ 8k ä»¥èŠ‚çœæ˜¾å­˜ï¼‰
- ä½ åœ¨ä¸æš´éœ² `/v1/models` çš„ä»£ç†åŽé¢è¿è¡Œ
:::

---

### å‘½åè‡ªå®šä¹‰æä¾›å•†

å¦‚æžœä½ ä½¿ç”¨å¤šä¸ªè‡ªå®šä¹‰ç«¯ç‚¹ï¼ˆä¾‹å¦‚æœ¬åœ°å¼€å‘æœåŠ¡å™¨å’Œè¿œç¨‹ GPU æœåŠ¡å™¨ï¼‰ï¼Œå¯ä»¥åœ¨ `config.yaml` ä¸­å°†å®ƒä»¬å®šä¹‰ä¸ºå‘½åè‡ªå®šä¹‰æä¾›å•†ï¼š

```yaml
custom_providers:
  - name: local
    base_url: http://localhost:8080/v1
    # api_key çœç•¥â€”â€”Zed å¯¹æ—  key çš„æœ¬åœ°æœåŠ¡å™¨ä½¿ç”¨"no-key-required"
  - name: work
    base_url: https://gpu-server.internal.corp/v1
    key_env: CORP_API_KEY
    api_mode: chat_completions   # ç”± `zed model` â†’ è‡ªå®šä¹‰ç«¯ç‚¹å‘å¯¼æ˜¾å¼è®¾ç½®ï¼›è‡ªåŠ¨æ£€æµ‹ä»ä½œä¸ºå›žé€€
  - name: anthropic-proxy
    base_url: https://proxy.example.com/anthropic
    key_env: ANTHROPIC_PROXY_KEY
    api_mode: anthropic_messages  # ç”¨äºŽ Anthropic å…¼å®¹ä»£ç†
```

æŸäº› OpenAI å…¼å®¹ç«¯ç‚¹éœ€è¦ç‰¹å®šäºŽæä¾›å•†çš„è¯·æ±‚ä½“å­—æ®µã€‚åœ¨å¯¹åº”çš„è‡ªå®šä¹‰æä¾›å•†ä¸­æ·»åŠ  `extra_body` æ˜ å°„ï¼ŒZed ä¼šå°†å…¶åˆå¹¶åˆ°è¯¥ç«¯ç‚¹çš„æ¯ä¸ª chat-completions è¯·æ±‚ä¸­ï¼š

```yaml
custom_providers:
  - name: gemma-local
    base_url: http://localhost:8080/v1
    model: google/gemma-4-31b-it
    extra_body:
      enable_thinking: true
      reasoning_effort: high
```

ä½¿ç”¨ä½ æœåŠ¡å™¨æ–‡æ¡£ä¸­çš„æ ¼å¼ã€‚ä¾‹å¦‚ï¼ŒvLLM Gemma éƒ¨ç½²å’ŒæŸäº› NVIDIA NIM ç«¯ç‚¹æœŸæœ› `enable_thinking` åœ¨ `chat_template_kwargs` ä¸‹ï¼Œè€Œä¸æ˜¯ä½œä¸ºé¡¶çº§ `extra_body` å­—æ®µï¼š

```yaml
extra_body:
  chat_template_kwargs:
    enable_thinking: true
```

`zed model` â†’ è‡ªå®šä¹‰ç«¯ç‚¹å‘å¯¼çŽ°åœ¨ä¼šæ˜¾å¼æç¤º `api_mode` å¹¶å°†ä½ çš„ç­”æ¡ˆæŒä¹…åŒ–åˆ° `config.yaml`ã€‚å½“å­—æ®µç•™ç©ºæ—¶ï¼ŒåŸºäºŽ URL çš„è‡ªåŠ¨æ£€æµ‹ï¼ˆä¾‹å¦‚ `/anthropic` è·¯å¾„ â†’ `anthropic_messages`ï¼‰ä»ä½œä¸ºå›žé€€ã€‚

ä½¿ç”¨ä¸‰æ®µå¼è¯­æ³•åœ¨ä¼šè¯ä¸­é€”åˆ‡æ¢ï¼š

```
/model custom:local:qwen-2.5       # ä½¿ç”¨"local"ç«¯ç‚¹å’Œ qwen-2.5
/model custom:work:llama3-70b      # ä½¿ç”¨"work"ç«¯ç‚¹å’Œ llama3-70b
/model custom:anthropic-proxy:claude-sonnet-4  # ä½¿ç”¨ä»£ç†
```

ä¹Ÿå¯ä»¥ä»Žäº¤äº’å¼ `zed model` èœå•ä¸­é€‰æ‹©å‘½åè‡ªå®šä¹‰æä¾›å•†ã€‚

---

### å®žæˆ˜é…ç½®ï¼šTogether AIã€Groqã€Perplexity

[å…¶ä»–å…¼å®¹æä¾›å•†](#other-compatible-providers) ä¸­åˆ—å‡ºçš„äº‘æä¾›å•†éƒ½ä½¿ç”¨ OpenAI çš„ REST æ–¹è¨€ï¼Œå› æ­¤åœ¨ `custom_providers:` ä¸‹çš„æŽ¥å…¥æ–¹å¼ç›¸åŒã€‚ä»¥ä¸‹æ˜¯ä¸‰ä¸ªå¯ç›´æŽ¥ä½¿ç”¨çš„é…ç½®ç¤ºä¾‹ã€‚æ¯ä¸ªç¤ºä¾‹æ”¾å…¥ `~/.zed/config.yaml`ï¼Œå¯¹åº”çš„ API key æ”¾å…¥ `~/.zed/.env`ã€‚

#### Together AI

æ‰˜ç®¡å¼€æºæ¨¡åž‹ï¼ˆLlamaã€MiniMaxã€Gemmaã€DeepSeekã€Qwenï¼‰ï¼Œä»·æ ¼æ˜¾è‘—ä½ŽäºŽä¸€æ–¹ APIã€‚é€‚åˆå¤šæ¨¡åž‹åœºæ™¯çš„é»˜è®¤é€‰æ‹©ã€‚

```yaml
# ~/.zed/config.yaml
custom_providers:
  - name: together
    base_url: https://api.together.xyz/v1
    key_env: TOGETHER_API_KEY
    # api_mode: chat_completions  # é»˜è®¤â€”â€”æ— éœ€è®¾ç½®

model:
  default: MiniMaxAI/MiniMax-M2.7   # æˆ– together.ai/models ä¸­çš„ä»»æ„æ¨¡åž‹
  provider: custom:together
```

```bash
# ~/.zed/.env
TOGETHER_API_KEY=your-together-key
```

ä¼šè¯ä¸­é€”åˆ‡æ¢æ¨¡åž‹ï¼š

```
/model custom:together:meta-llama/Llama-3.3-70B-Instruct-Turbo
/model custom:together:google/gemma-4-31b-it
/model custom:together:deepseek-ai/DeepSeek-V3
```

Together çš„ `/v1/models` ç«¯ç‚¹å¯ç”¨ï¼Œå› æ­¤ `zed model` å¯ä»¥è‡ªåŠ¨å‘çŽ°å¯ç”¨æ¨¡åž‹ã€‚

#### Groq

è¶…å¿«æŽ¨ç†ï¼ˆLlama-3.3-70B çº¦ 500 tok/sï¼‰ã€‚æ¨¡åž‹ç›®å½•è¾ƒå°ï¼Œä½†å¯¹å»¶è¿Ÿæ•æ„Ÿçš„äº¤äº’å¼ä½¿ç”¨æ•ˆæžœå‡ºè‰²ã€‚

```yaml
# ~/.zed/config.yaml
custom_providers:
  - name: groq
    base_url: https://api.groq.com/openai/v1
    key_env: GROQ_API_KEY

model:
  default: llama-3.3-70b-versatile
  provider: custom:groq
```

```bash
# ~/.zed/.env
GROQ_API_KEY=your-groq-key
```

#### Perplexity

å½“ä½ éœ€è¦è‡ªåŠ¨è¿›è¡Œå®žæ—¶ç½‘é¡µæœç´¢å’Œå¼•ç”¨çš„æ¨¡åž‹æ—¶å¾ˆæœ‰ç”¨ã€‚å¯¹å¯ç”¨æ¨¡åž‹æœ‰ä¸¥æ ¼é™åˆ¶â€”â€”æŸ¥çœ‹ [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api) èŽ·å–å½“å‰åˆ—è¡¨ã€‚

```yaml
# ~/.zed/config.yaml
custom_providers:
  - name: perplexity
    base_url: https://api.perplexity.ai
    key_env: PERPLEXITY_API_KEY

model:
  default: sonar
  provider: custom:perplexity
```

```bash
# ~/.zed/.env
PERPLEXITY_API_KEY=your-perplexity-key
```

#### åœ¨å•ä¸ªé…ç½®ä¸­ä½¿ç”¨å¤šä¸ªæä¾›å•†

ä¸‰ä¸ªç¤ºä¾‹å¯ä»¥ç»„åˆä½¿ç”¨â€”â€”åŒæ—¶ä½¿ç”¨æ‰€æœ‰æä¾›å•†ï¼Œå¹¶é€šè¿‡ `/model custom:<name>:<model>` æŒ‰è½®æ¬¡åˆ‡æ¢ï¼š

```yaml
custom_providers:
  - name: together
    base_url: https://api.together.xyz/v1
    key_env: TOGETHER_API_KEY
  - name: groq
    base_url: https://api.groq.com/openai/v1
    key_env: GROQ_API_KEY
  - name: perplexity
    base_url: https://api.perplexity.ai
    key_env: PERPLEXITY_API_KEY

model:
  default: MiniMaxAI/MiniMax-M2.7
  provider: custom:together      # å¯åŠ¨æ—¶ä½¿ç”¨ Togetherï¼›ä¹‹åŽå¯è‡ªç”±åˆ‡æ¢
```

:::tip æ•…éšœæŽ’æŸ¥
- `zed doctor` å¯¹äºŽä¸Šè¿°ä»»ä½•åç§°éƒ½ä¸åº”æ‰“å° `Unknown provider` è­¦å‘Šï¼ˆåœ¨ #15083 çš„ CLI éªŒè¯å™¨ä¿®å¤ä¹‹åŽï¼‰ã€‚
- å¦‚æžœæŸä¸ªæä¾›å•†çš„ `/v1/models` ç«¯ç‚¹ä¸å¯è¾¾ï¼ˆPerplexity æ˜¯å¸¸è§æƒ…å†µï¼‰ï¼Œ`zed model` ä¼šåœ¨è­¦å‘ŠåŽæŒä¹…åŒ–æ¨¡åž‹è€Œä¸æ˜¯ç¡¬æ€§æ‹’ç»â€”â€”å‚è§ #15136ã€‚
- è¦å®Œå…¨è·³è¿‡ `custom_providers:` å¹¶ä½¿ç”¨å¸¦ `CUSTOM_BASE_URL` çŽ¯å¢ƒå˜é‡çš„è£¸ `provider: custom`ï¼Œå‚è§ #15103ã€‚
:::

---

### é€‰æ‹©åˆé€‚çš„é…ç½®

| ä½¿ç”¨åœºæ™¯ | æŽ¨èæ–¹æ¡ˆ |
|----------|-------------|
| **åªæƒ³è®©å®ƒå·¥ä½œ** | OpenRouterï¼ˆé»˜è®¤ï¼‰æˆ– Zed Portal |
| **æœ¬åœ°æ¨¡åž‹ï¼Œç®€å•é…ç½®** | Ollama |
| **ç”Ÿäº§ GPU æœåŠ¡** | vLLM æˆ– SGLang |
| **Mac / æ—  GPU** | Ollama æˆ– llama.cpp |
| **å¤šæä¾›å•†è·¯ç”±** | LiteLLM Proxy æˆ– OpenRouter |
| **æˆæœ¬ä¼˜åŒ–** | ClawRouter æˆ–å¸¦ `sort: "price"` çš„ OpenRouter |
| **æœ€å¤§éšç§ä¿æŠ¤** | Ollamaã€vLLM æˆ– llama.cppï¼ˆå®Œå…¨æœ¬åœ°ï¼‰ |
| **ä¼ä¸š / Azure** | Azure OpenAI åŠ è‡ªå®šä¹‰ç«¯ç‚¹ |
| **ä¸­å›½ AI æ¨¡åž‹** | z.aiï¼ˆGLMï¼‰ã€Kimi/Moonshotï¼ˆ`kimi-coding` æˆ– `kimi-coding-cn`ï¼‰ã€MiniMaxã€å°ç±³ MiMo æˆ–è…¾è®¯ TokenHubï¼ˆä¸€ç­‰æä¾›å•†ï¼‰ |

:::tip
å¯ä»¥éšæ—¶ä½¿ç”¨ `zed model` åˆ‡æ¢æä¾›å•†â€”â€”æ— éœ€é‡å¯ã€‚æ— è®ºä½¿ç”¨å“ªä¸ªæä¾›å•†ï¼Œä½ çš„å¯¹è¯åŽ†å²ã€è®°å¿†å’ŒæŠ€èƒ½éƒ½ä¼šä¿ç•™ã€‚
:::

## å¯é€‰ API Key

| åŠŸèƒ½ | æä¾›å•† | çŽ¯å¢ƒå˜é‡ |
|---------|----------|--------------|
| ç½‘é¡µæŠ“å– | [Firecrawl](https://firecrawl.dev/) | `FIRECRAWL_API_KEY`ã€`FIRECRAWL_API_URL` |
| æµè§ˆå™¨è‡ªåŠ¨åŒ– | [Browserbase](https://browserbase.com/) | `BROWSERBASE_API_KEY`ã€`BROWSERBASE_PROJECT_ID` |
| å›¾åƒç”Ÿæˆ | [FAL](https://fal.ai/) | `FAL_KEY` |
| é«˜çº§ TTS è¯­éŸ³ | [ElevenLabs](https://elevenlabs.io/) | `ELEVENLABS_API_KEY` |
| OpenAI TTS + è¯­éŸ³è½¬å½• | [OpenAI](https://platform.openai.com/api-keys) | `VOICE_TOOLS_OPENAI_KEY` |
| Mistral TTS + è¯­éŸ³è½¬å½• | [Mistral](https://console.mistral.ai/) | `MISTRAL_API_KEY` |
| è·¨ä¼šè¯ç”¨æˆ·å»ºæ¨¡ | [Honcho](https://honcho.dev/) | `HONCHO_API_KEY` |
| è¯­ä¹‰é•¿æœŸè®°å¿† | [Supermemory](https://supermemory.ai) | `SUPERMEMORY_API_KEY` |

### è‡ªæ‰˜ç®¡ Firecrawl

é»˜è®¤æƒ…å†µä¸‹ï¼ŒZed ä½¿ç”¨ [Firecrawl äº‘ API](https://firecrawl.dev/) è¿›è¡Œç½‘é¡µæœç´¢å’ŒæŠ“å–ã€‚å¦‚æžœä½ å¸Œæœ›åœ¨æœ¬åœ°è¿è¡Œ Firecrawlï¼Œå¯ä»¥å°† Zed æŒ‡å‘è‡ªæ‰˜ç®¡å®žä¾‹ã€‚å®Œæ•´é…ç½®è¯´æ˜Žå‚è§ Firecrawl çš„ [SELF_HOST.md](https://github.com/firecrawl/firecrawl/blob/main/SELF_HOST.md)ã€‚

**ä¼˜åŠ¿ï¼š** æ— éœ€ API keyï¼Œæ— é€ŸçŽ‡é™åˆ¶ï¼Œæ— æŒ‰é¡µè®¡è´¹ï¼Œå®Œå…¨æ•°æ®ä¸»æƒã€‚

**åŠ£åŠ¿ï¼š** äº‘ç‰ˆæœ¬ä½¿ç”¨ Firecrawl ä¸“æœ‰çš„"Fire-engine"è¿›è¡Œé«˜çº§åçˆ¬è™«ç»•è¿‡ï¼ˆCloudflareã€CAPTCHAã€IP è½®æ¢ï¼‰ã€‚è‡ªæ‰˜ç®¡ç‰ˆæœ¬ä½¿ç”¨åŸºç¡€ fetch + Playwrightï¼ŒæŸäº›å—ä¿æŠ¤çš„ç½‘ç«™å¯èƒ½å¤±è´¥ã€‚æœç´¢ä½¿ç”¨ DuckDuckGo è€Œéž Googleã€‚

**é…ç½®æ­¥éª¤ï¼š**

1. å…‹éš†å¹¶å¯åŠ¨ Firecrawl Docker æ ˆï¼ˆ5 ä¸ªå®¹å™¨ï¼šAPIã€Playwrightã€Redisã€RabbitMQã€PostgreSQLâ€”â€”éœ€è¦çº¦ 4-8 GB RAMï¼‰ï¼š
   ```bash
   git clone https://github.com/firecrawl/firecrawl
   cd firecrawl
   # åœ¨ .env ä¸­è®¾ç½®ï¼šUSE_DB_AUTHENTICATION=false, HOST=0.0.0.0, PORT=3002
   docker compose up -d
   ```

2. å°† Zed æŒ‡å‘ä½ çš„å®žä¾‹ï¼ˆæ— éœ€ API keyï¼‰ï¼š
   ```bash
   zed config set FIRECRAWL_API_URL http://localhost:3002
   ```

å¦‚æžœä½ çš„è‡ªæ‰˜ç®¡å®žä¾‹å¯ç”¨äº†è®¤è¯ï¼Œä¹Ÿå¯ä»¥åŒæ—¶è®¾ç½® `FIRECRAWL_API_KEY` å’Œ `FIRECRAWL_API_URL`ã€‚

## OpenRouter æä¾›å•†è·¯ç”±

ä½¿ç”¨ OpenRouter æ—¶ï¼Œå¯ä»¥æŽ§åˆ¶è¯·æ±‚å¦‚ä½•åœ¨æä¾›å•†ä¹‹é—´è·¯ç”±ã€‚åœ¨ `~/.zed/config.yaml` ä¸­æ·»åŠ  `provider_routing` èŠ‚ï¼š

```yaml
provider_routing:
  sort: "throughput"          # "price"ï¼ˆé»˜è®¤ï¼‰ã€"throughput" æˆ– "latency"
  # only: ["anthropic"]      # ä»…ä½¿ç”¨è¿™äº›æä¾›å•†
  # ignore: ["deepinfra"]    # è·³è¿‡è¿™äº›æä¾›å•†
  # order: ["anthropic", "google"]  # æŒ‰æ­¤é¡ºåºå°è¯•æä¾›å•†
  # require_parameters: true  # ä»…ä½¿ç”¨æ”¯æŒæ‰€æœ‰è¯·æ±‚å‚æ•°çš„æä¾›å•†
  # data_collection: "deny"   # æŽ’é™¤å¯èƒ½å­˜å‚¨/è®­ç»ƒæ•°æ®çš„æä¾›å•†
```

**å¿«æ·æ–¹å¼ï¼š** åœ¨ä»»æ„æ¨¡åž‹åç§°åŽé™„åŠ  `:nitro` è¿›è¡Œåžåé‡æŽ’åºï¼ˆå¦‚ `anthropic/claude-sonnet-4:nitro`ï¼‰ï¼Œæˆ–é™„åŠ  `:floor` è¿›è¡Œä»·æ ¼æŽ’åºã€‚

## OpenRouter Pareto Code è·¯ç”±å™¨

OpenRouter æä¾›ä¸€ä¸ªå®žéªŒæ€§ç¼–ç¨‹æ¨¡åž‹è·¯ç”±å™¨ `openrouter/pareto-code`ï¼Œè‡ªåŠ¨å°†è¯·æ±‚è·¯ç”±åˆ°æ»¡è¶³ç¼–ç¨‹è´¨é‡æ ‡å‡†çš„æœ€ä¾¿å®œæ¨¡åž‹ï¼ˆæŒ‰ [Artificial Analysis](https://artificialanalysis.ai/) æŽ’åï¼‰ã€‚é€‰æ‹©æ­¤æ¨¡åž‹å¹¶åœ¨ `~/.zed/config.yaml` ä¸­è°ƒæ•´ `min_coding_score` å‚æ•°ï¼š

```yaml
model:
  provider: openrouter
  model: openrouter/pareto-code

openrouter:
  min_coding_score: 0.65   # 0.0â€“1.0ï¼›è¶Šé«˜ = è¶Šå¼ºï¼ˆè¶Šè´µï¼‰çš„ç¼–ç¨‹æ¨¡åž‹ã€‚é»˜è®¤ 0.65ã€‚
```

è¯´æ˜Žï¼š

- `min_coding_score` **ä»…**åœ¨ `model.model` ä¸º `openrouter/pareto-code` æ—¶å‘é€ã€‚å¯¹å…¶ä»–ä»»ä½•æ¨¡åž‹è¯¥å€¼æ— æ•ˆã€‚
- è®¾ç½®ä¸ºç©ºå­—ç¬¦ä¸²ï¼ˆæˆ–åˆ é™¤è¯¥è¡Œï¼‰è®© OpenRouter é€‰æ‹©æœ€å¼ºçš„å¯ç”¨ç¼–ç¨‹æ¨¡åž‹â€”â€”è¿™æ˜¯çœç•¥ plugins å—æ—¶çš„æ–‡æ¡£è¡Œä¸ºã€‚
- åœ¨ç»™å®šæ—¥æœŸå†…ï¼ŒæŒ‰åˆ†æ•°é€‰æ‹©æ˜¯ç¡®å®šæ€§çš„ï¼Œä½†éšç€ Pareto å‰æ²¿ç§»åŠ¨ï¼ˆæ–°æ¨¡åž‹ã€åŸºå‡†æ›´æ–°ï¼‰ï¼Œå®žé™…é€‰æ‹©çš„æ¨¡åž‹å¯èƒ½å˜åŒ–ã€‚
- å‚è§ OpenRouter çš„ [Pareto Router æ–‡æ¡£](https://openrouter.ai/docs/guides/routing/routers/pareto-router) äº†è§£å®Œæ•´è·¯ç”±å™¨è¡Œä¸ºã€‚
- è¦å°† Pareto Code è·¯ç”±å™¨ç”¨äºŽç‰¹å®š**è¾…åŠ©ä»»åŠ¡**ï¼ˆåŽ‹ç¼©ã€è§†è§‰ç­‰ï¼‰è€Œéžä¸»æ™ºèƒ½ä½“ï¼Œåœ¨è¯¥ä»»åŠ¡ä¸‹è®¾ç½® `extra_body.plugins`â€”â€”å‚è§[è¾…åŠ©æ¨¡åž‹ â†’ OpenRouter è·¯ç”±ä¸Žè¾…åŠ©ä»»åŠ¡çš„ Pareto Code](/user-guide/configuration#openrouter-routing--pareto-code-for-auxiliary-tasks)ã€‚

## æ•…éšœè½¬ç§»æä¾›å•†

é…ç½®ä¸€ä¸ªå¤‡ç”¨æä¾›å•†é“¾ï¼Œå½“ä¸»æ¨¡åž‹å¤±è´¥æ—¶ï¼ˆé€ŸçŽ‡é™åˆ¶ã€æœåŠ¡å™¨é”™è¯¯ã€è®¤è¯å¤±è´¥ï¼‰Zed æŒ‰é¡ºåºå°è¯•ã€‚è§„èŒƒæ ¼å¼æ˜¯é¡¶çº§ `fallback_providers:` åˆ—è¡¨ï¼š

```yaml
fallback_providers:
  - provider: openrouter
    model: anthropic/claude-sonnet-4
  - provider: anthropic
    model: claude-sonnet-4
    # base_url: http://localhost:8000/v1    # å¯é€‰ï¼Œç”¨äºŽè‡ªå®šä¹‰ç«¯ç‚¹
    # api_mode: chat_completions           # å¯é€‰è¦†ç›–
```

ä¸ºå‘åŽå…¼å®¹ï¼Œæ—§ç‰ˆå•å¯¹ `fallback_model:` å­—å…¸ä»è¢«æŽ¥å—ï¼š

```yaml
fallback_model:
  provider: openrouter
  model: anthropic/claude-sonnet-4
```

æ¿€æ´»æ—¶ï¼Œæ•…éšœè½¬ç§»åœ¨ä¸ä¸¢å¤±å¯¹è¯çš„æƒ…å†µä¸‹ä¸­é€”åˆ‡æ¢æ¨¡åž‹å’Œæä¾›å•†ã€‚é“¾æŒ‰æ¡ç›®é€ä¸€å°è¯•ï¼›æ¯ä¸ªä¼šè¯æ¿€æ´»ä¸€æ¬¡ã€‚

æ”¯æŒçš„æä¾›å•†ï¼š`openrouter`ã€`nous`ã€`openai-codex`ã€`copilot`ã€`copilot-acp`ã€`anthropic`ã€`gemini`ã€`google-gemini-cli`ã€`qwen-oauth`ã€`huggingface`ã€`zai`ã€`kimi-coding`ã€`kimi-coding-cn`ã€`minimax`ã€`minimax-cn`ã€`minimax-oauth`ã€`deepseek`ã€`nvidia`ã€`xai`ã€`xai-oauth`ã€`ollama-cloud`ã€`bedrock`ã€`azure-foundry`ã€`opencode-zen`ã€`opencode-go`ã€`kilocode`ã€`xiaomi`ã€`arcee`ã€`gmi`ã€`stepfun`ã€`lmstudio`ã€`alibaba`ã€`alibaba-coding-plan`ã€`tencent-tokenhub`ã€`custom`ã€‚

:::tip
æ•…éšœè½¬ç§»ä»…é€šè¿‡ `config.yaml` é…ç½®â€”â€”æˆ–é€šè¿‡ `zed fallback` äº¤äº’å¼é…ç½®ã€‚æœ‰å…³è§¦å‘æ—¶æœºã€é“¾æŽ¨è¿›æ–¹å¼ä»¥åŠä¸Žè¾…åŠ©ä»»åŠ¡å’Œå§”æ‰˜çš„äº¤äº’ï¼Œå‚è§[æ•…éšœè½¬ç§»æä¾›å•†](/user-guide/features/fallback-providers)ã€‚
:::

---

## å¦è¯·å‚é˜…

- [é…ç½®](/user-guide/configuration) â€” é€šç”¨é…ç½®ï¼ˆç›®å½•ç»“æž„ã€é…ç½®ä¼˜å…ˆçº§ã€ç»ˆç«¯åŽç«¯ã€è®°å¿†ã€åŽ‹ç¼©ç­‰ï¼‰
- [çŽ¯å¢ƒå˜é‡](/reference/environment-variables) â€” æ‰€æœ‰çŽ¯å¢ƒå˜é‡çš„å®Œæ•´å‚è€ƒ
