---
sidebar_position: 5
title: "æ·»åŠ  Provider"
description: "å¦‚ä½•å‘ Zed Agent æ·»åŠ æ–°çš„æŽ¨ç† providerâ€”â€”è®¤è¯ã€è¿è¡Œæ—¶è§£æžã€CLI æµç¨‹ã€é€‚é…å™¨ã€æµ‹è¯•ä¸Žæ–‡æ¡£"
---

# æ·»åŠ  Provider

Zed å·²ç»å¯ä»¥é€šè¿‡è‡ªå®šä¹‰ provider è·¯å¾„ä¸Žä»»ä½• OpenAI å…¼å®¹çš„ç«¯ç‚¹é€šä¿¡ã€‚é™¤éžä½ éœ€è¦ä¸ºæŸä¸ªæœåŠ¡æä¾›ä¸€æµçš„ç”¨æˆ·ä½“éªŒï¼Œå¦åˆ™ä¸è¦æ·»åŠ å†…ç½® providerï¼š

- provider ä¸“å±žçš„è®¤è¯æˆ– token åˆ·æ–°
- ç²¾é€‰çš„æ¨¡åž‹ç›®å½•
- setup / `zed model` èœå•æ¡ç›®
- ç”¨äºŽ `provider:model` è¯­æ³•çš„ provider åˆ«å
- éœ€è¦é€‚é…å™¨çš„éž OpenAI API æ ¼å¼

å¦‚æžœè¯¥ provider åªæ˜¯"å¦ä¸€ä¸ª OpenAI å…¼å®¹çš„ base URL å’Œ API key"ï¼Œä¸€ä¸ªå‘½åçš„è‡ªå®šä¹‰ provider å¯èƒ½å°±è¶³å¤Ÿäº†ã€‚

## å¿ƒæ™ºæ¨¡åž‹

å†…ç½® provider éœ€è¦åœ¨å‡ ä¸ªå±‚é¢ä¿æŒä¸€è‡´ï¼š

1. `zed_cli/auth.py` å†³å®šå¦‚ä½•æŸ¥æ‰¾å‡­æ®ã€‚
2. `zed_cli/runtime_provider.py` å°†å…¶è½¬æ¢ä¸ºè¿è¡Œæ—¶æ•°æ®ï¼š
   - `provider`
   - `api_mode`
   - `base_url`
   - `api_key`
   - `source`
3. `run_agent.py` ä½¿ç”¨ `api_mode` å†³å®šå¦‚ä½•æž„å»ºå’Œå‘é€è¯·æ±‚ã€‚
4. `zed_cli/models.py` å’Œ `zed_cli/main.py` ä½¿ provider åœ¨ CLI ä¸­å¯è§ã€‚ï¼ˆ`zed_cli/setup.py` è‡ªåŠ¨å§”æ‰˜ç»™ `main.py`â€”â€”æ— éœ€åœ¨æ­¤å¤„åšä»»ä½•ä¿®æ”¹ã€‚ï¼‰
5. `agent/auxiliary_client.py` å’Œ `agent/model_metadata.py` ä¿æŒè¾…åŠ©ä»»åŠ¡å’Œ token é¢„ç®—æ­£å¸¸è¿ä½œã€‚

æ ¸å¿ƒæŠ½è±¡æ˜¯ `api_mode`ã€‚

- å¤§å¤šæ•° provider ä½¿ç”¨ `chat_completions`ã€‚
- Codex ä½¿ç”¨ `codex_responses`ã€‚
- Anthropic ä½¿ç”¨ `anthropic_messages`ã€‚
- æ–°çš„éž OpenAI åè®®é€šå¸¸æ„å‘³ç€éœ€è¦æ·»åŠ æ–°çš„é€‚é…å™¨å’Œæ–°çš„ `api_mode` åˆ†æ”¯ã€‚

## é¦–å…ˆé€‰æ‹©å®žçŽ°è·¯å¾„

### è·¯å¾„ Aâ€”â€”OpenAI å…¼å®¹ provider

å½“ provider æŽ¥å—æ ‡å‡† chat-completions é£Žæ ¼çš„è¯·æ±‚æ—¶ä½¿ç”¨æ­¤è·¯å¾„ã€‚

å…¸åž‹å·¥ä½œï¼š

- æ·»åŠ è®¤è¯å…ƒæ•°æ®
- æ·»åŠ æ¨¡åž‹ç›®å½• / åˆ«å
- æ·»åŠ è¿è¡Œæ—¶è§£æž
- æ·»åŠ  CLI èœå•æŽ¥çº¿
- æ·»åŠ è¾…åŠ©æ¨¡åž‹é»˜è®¤å€¼
- æ·»åŠ æµ‹è¯•å’Œç”¨æˆ·æ–‡æ¡£

é€šå¸¸ä¸éœ€è¦æ–°çš„é€‚é…å™¨æˆ–æ–°çš„ `api_mode`ã€‚

### è·¯å¾„ Bâ€”â€”åŽŸç”Ÿ provider

å½“ provider çš„è¡Œä¸ºä¸Ž OpenAI chat completions ä¸åŒæ—¶ä½¿ç”¨æ­¤è·¯å¾„ã€‚

å½“å‰ä»£ç åº“ä¸­çš„ç¤ºä¾‹ï¼š

- `codex_responses`
- `anthropic_messages`

æ­¤è·¯å¾„åŒ…å«è·¯å¾„ A çš„æ‰€æœ‰å†…å®¹ï¼Œå¦åŠ ï¼š

- `agent/` ä¸­çš„ provider é€‚é…å™¨
- `run_agent.py` ä¸­ç”¨äºŽè¯·æ±‚æž„å»ºã€åˆ†å‘ã€ç”¨é‡æå–ã€ä¸­æ–­å¤„ç†å’Œå“åº”è§„èŒƒåŒ–çš„åˆ†æ”¯
- é€‚é…å™¨æµ‹è¯•

## æ–‡ä»¶æ¸…å•

### æ¯ä¸ªå†…ç½® provider éƒ½å¿…é¡»ä¿®æ”¹

1. `zed_cli/auth.py`
2. `zed_cli/models.py`
3. `zed_cli/runtime_provider.py`
4. `zed_cli/main.py`
5. `agent/auxiliary_client.py`
6. `agent/model_metadata.py`
7. æµ‹è¯•
8. `website/docs/` ä¸‹çš„ç”¨æˆ·æ–‡æ¡£

:::tip
`zed_cli/setup.py` **æ— éœ€**ä¿®æ”¹ã€‚setup å‘å¯¼å°† provider/model é€‰æ‹©å§”æ‰˜ç»™ `main.py` ä¸­çš„ `select_provider_and_model()`â€”â€”åœ¨é‚£é‡Œæ·»åŠ çš„ä»»ä½• provider éƒ½ä¼šè‡ªåŠ¨å‡ºçŽ°åœ¨ `zed setup` ä¸­ã€‚
:::

### åŽŸç”Ÿ / éž OpenAI provider é¢å¤–éœ€è¦

10. `agent/<provider>_adapter.py`
11. `run_agent.py`
12. å¦‚æžœéœ€è¦ provider SDKï¼Œåˆ™ä¿®æ”¹ `pyproject.toml`

## å¿«é€Ÿè·¯å¾„ï¼šç®€å• API key provider

å¦‚æžœä½ çš„ provider åªæ˜¯ä¸€ä¸ªä½¿ç”¨å•ä¸ª API key è¿›è¡Œè®¤è¯çš„ OpenAI å…¼å®¹ç«¯ç‚¹ï¼Œåˆ™æ— éœ€ä¿®æ”¹ `auth.py`ã€`runtime_provider.py`ã€`main.py` æˆ–ä¸‹é¢å®Œæ•´æ¸…å•ä¸­çš„ä»»ä½•å…¶ä»–æ–‡ä»¶ã€‚

ä½ åªéœ€è¦ï¼š

1. åœ¨ `plugins/model-providers/<your-provider>/` ä¸‹åˆ›å»ºä¸€ä¸ªæ’ä»¶ç›®å½•ï¼ŒåŒ…å«ï¼š
   - `__init__.py`â€”â€”åœ¨æ¨¡å—çº§åˆ«è°ƒç”¨ `register_provider(profile)`
   - `plugin.yaml`â€”â€”æ¸…å•æ–‡ä»¶ï¼ˆnameã€kind: model-providerã€versionã€descriptionï¼‰
2. å°±è¿™äº›ã€‚Provider æ’ä»¶åœ¨ä»»ä½•ä»£ç é¦–æ¬¡è°ƒç”¨ `get_provider_profile()` æˆ– `list_providers()` æ—¶è‡ªåŠ¨åŠ è½½â€”â€”æ†ç»‘æ’ä»¶ï¼ˆæœ¬ä»“åº“ï¼‰å’Œä½äºŽ `$ZED_HOME/plugins/model-providers/` çš„ç”¨æˆ·æ’ä»¶éƒ½ä¼šè¢«åŠ è½½ã€‚

å½“ä½ æ·»åŠ ä¸€ä¸ªæ’ä»¶å¹¶è°ƒç”¨ `register_provider()` æ—¶ï¼Œä»¥ä¸‹å†…å®¹ä¼šè‡ªåŠ¨æŽ¥çº¿ï¼š

1. `auth.py` ä¸­çš„ `PROVIDER_REGISTRY` æ¡ç›®ï¼ˆå‡­æ®è§£æžã€çŽ¯å¢ƒå˜é‡æŸ¥æ‰¾ï¼‰
2. `api_mode` è®¾ç½®ä¸º `chat_completions`
3. `base_url` ä»Žé…ç½®æˆ–å£°æ˜Žçš„çŽ¯å¢ƒå˜é‡ä¸­èŽ·å–
4. æŒ‰ä¼˜å…ˆçº§é¡ºåºæ£€æŸ¥ `env_vars` ä»¥èŽ·å– API key
5. ä¸ºè¯¥ provider æ³¨å†Œ `fallback_models` åˆ—è¡¨
6. `--provider` CLI æ ‡å¿—æŽ¥å—è¯¥ provider id
7. `zed model` èœå•åŒ…å«è¯¥ provider
8. `zed setup` å‘å¯¼è‡ªåŠ¨å§”æ‰˜ç»™ `main.py`
9. `provider:model` åˆ«åè¯­æ³•æ­£å¸¸å·¥ä½œ
10. è¿è¡Œæ—¶è§£æžå™¨è¿”å›žæ­£ç¡®çš„ `base_url` å’Œ `api_key`
11. `--provider <name>` CLI æ ‡å¿—æŽ¥å—è¯¥ provider id
12. å›žé€€æ¨¡åž‹æ¿€æ´»å¯ä»¥å¹²å‡€åœ°åˆ‡æ¢åˆ°è¯¥ provider

ä½äºŽ `$ZED_HOME/plugins/model-providers/<name>/` çš„ç”¨æˆ·æ’ä»¶ä¼šè¦†ç›–åŒåçš„æ†ç»‘æ’ä»¶ï¼ˆ`register_provider()` ä¸­åŽå†™è€…èŽ·èƒœï¼‰â€”â€”å› æ­¤ç¬¬ä¸‰æ–¹å¯ä»¥åœ¨ä¸ç¼–è¾‘æœ¬ä»“åº“çš„æƒ…å†µä¸‹å¯¹ä»»ä½•å†…ç½® profile è¿›è¡Œ monkey-patch æˆ–æ›¿æ¢ã€‚

å‚è§ `plugins/model-providers/nvidia/` æˆ– `plugins/model-providers/gmi/` ä½œä¸ºæ¨¡æ¿ï¼Œä»¥åŠå®Œæ•´çš„ [Model Provider Plugin æŒ‡å—](/developer-guide/model-provider-plugin)ï¼Œäº†è§£å­—æ®µå‚è€ƒã€hook ç”¨æ³•å’Œç«¯åˆ°ç«¯ç¤ºä¾‹ã€‚

## å®Œæ•´è·¯å¾„ï¼šOAuth å’Œå¤æ‚ provider

å½“ä½ çš„ provider éœ€è¦ä»¥ä¸‹ä»»ä½•å†…å®¹æ—¶ï¼Œä½¿ç”¨ä¸‹é¢çš„å®Œæ•´æ¸…å•ï¼š

- OAuth æˆ– token åˆ·æ–°ï¼ˆNous Portalã€Codexã€Google Geminiã€Qwen Portalã€Copilotï¼‰
- éœ€è¦æ–°é€‚é…å™¨çš„éž OpenAI API æ ¼å¼ï¼ˆAnthropic Messagesã€Codex Responsesï¼‰
- è‡ªå®šä¹‰ç«¯ç‚¹æ£€æµ‹æˆ–å¤šåŒºåŸŸæŽ¢æµ‹ï¼ˆz.aiã€Kimiï¼‰
- ç²¾é€‰çš„é™æ€æ¨¡åž‹ç›®å½•æˆ–å®žæ—¶ `/models` èŽ·å–
- å¸¦æœ‰ç‰¹å®šè®¤è¯æµç¨‹çš„ provider ä¸“å±ž `zed model` èœå•æ¡ç›®

## ç¬¬ 1 æ­¥ï¼šé€‰æ‹©ä¸€ä¸ªè§„èŒƒçš„ provider id

é€‰æ‹©ä¸€ä¸ª provider id å¹¶åœ¨æ‰€æœ‰åœ°æ–¹ä½¿ç”¨å®ƒã€‚

ä»£ç åº“ä¸­çš„ç¤ºä¾‹ï¼š

- `openai-codex`
- `kimi-coding`
- `minimax-cn`

è¯¥ id åº”å‡ºçŽ°åœ¨ï¼š

- `zed_cli/auth.py` ä¸­çš„ `PROVIDER_REGISTRY`
- `zed_cli/models.py` ä¸­çš„ `_PROVIDER_LABELS`
- `zed_cli/auth.py` å’Œ `zed_cli/models.py` ä¸­çš„ `_PROVIDER_ALIASES`
- `zed_cli/main.py` ä¸­çš„ CLI `--provider` é€‰é¡¹
- setup / æ¨¡åž‹é€‰æ‹©åˆ†æ”¯
- è¾…åŠ©æ¨¡åž‹é»˜è®¤å€¼
- æµ‹è¯•

å¦‚æžœè¿™äº›æ–‡ä»¶ä¹‹é—´çš„ id ä¸ä¸€è‡´ï¼Œprovider ä¼šæ„Ÿè§‰åªæŽ¥äº†ä¸€åŠçº¿ï¼šè®¤è¯å¯èƒ½æ­£å¸¸ï¼Œè€Œ `/model`ã€setup æˆ–è¿è¡Œæ—¶è§£æžä¼šé™é»˜åœ°é—æ¼å®ƒã€‚

## ç¬¬ 2 æ­¥ï¼šåœ¨ `zed_cli/auth.py` ä¸­æ·»åŠ è®¤è¯å…ƒæ•°æ®

å¯¹äºŽ API key providerï¼Œåœ¨ `PROVIDER_REGISTRY` ä¸­æ·»åŠ ä¸€ä¸ª `ProviderConfig` æ¡ç›®ï¼ŒåŒ…å«ï¼š

- `id`
- `name`
- `auth_type="api_key"`
- `inference_base_url`
- `api_key_env_vars`
- å¯é€‰çš„ `base_url_env_var`

åŒæ—¶åœ¨ `_PROVIDER_ALIASES` ä¸­æ·»åŠ åˆ«åã€‚

ä½¿ç”¨çŽ°æœ‰ provider ä½œä¸ºæ¨¡æ¿ï¼š

- ç®€å• API key è·¯å¾„ï¼šZ.AIã€MiniMax
- å¸¦ç«¯ç‚¹æ£€æµ‹çš„ API key è·¯å¾„ï¼šKimiã€Z.AI
- åŽŸç”Ÿ token è§£æžï¼šAnthropic
- OAuth / auth-store è·¯å¾„ï¼šNousã€OpenAI Codex

éœ€è¦åœ¨æ­¤å›žç­”çš„é—®é¢˜ï¼š

- Zed åº”è¯¥æ£€æŸ¥å“ªäº›çŽ¯å¢ƒå˜é‡ï¼ŒæŒ‰ä»€ä¹ˆä¼˜å…ˆçº§é¡ºåºï¼Ÿ
- provider æ˜¯å¦éœ€è¦ base URL è¦†ç›–ï¼Ÿ
- æ˜¯å¦éœ€è¦ç«¯ç‚¹æŽ¢æµ‹æˆ– token åˆ·æ–°ï¼Ÿ
- å½“å‡­æ®ç¼ºå¤±æ—¶ï¼Œè®¤è¯é”™è¯¯åº”è¯¥æ˜¾ç¤ºä»€ä¹ˆï¼Ÿ

å¦‚æžœ provider éœ€è¦çš„ä¸ä»…ä»…æ˜¯"æŸ¥æ‰¾ API key"ï¼Œè¯·æ·»åŠ ä¸“ç”¨çš„å‡­æ®è§£æžå™¨ï¼Œè€Œä¸æ˜¯å°†é€»è¾‘å¡žè¿›ä¸ç›¸å…³çš„åˆ†æ”¯ã€‚

## ç¬¬ 3 æ­¥ï¼šåœ¨ `zed_cli/models.py` ä¸­æ·»åŠ æ¨¡åž‹ç›®å½•å’Œåˆ«å

æ›´æ–° provider ç›®å½•ï¼Œä½¿ provider åœ¨èœå•å’Œ `provider:model` è¯­æ³•ä¸­æ­£å¸¸å·¥ä½œã€‚

å…¸åž‹ä¿®æ”¹ï¼š

- `_PROVIDER_MODELS`
- `_PROVIDER_LABELS`
- `_PROVIDER_ALIASES`
- `list_available_providers()` ä¸­çš„ provider æ˜¾ç¤ºé¡ºåº
- å¦‚æžœ provider æ”¯æŒå®žæ—¶ `/models` èŽ·å–ï¼Œåˆ™ä¿®æ”¹ `provider_model_ids()`

å¦‚æžœ provider æä¾›å®žæ—¶æ¨¡åž‹åˆ—è¡¨ï¼Œä¼˜å…ˆä½¿ç”¨å®ƒï¼Œå¹¶å°† `_PROVIDER_MODELS` ä¿ç•™ä¸ºé™æ€å›žé€€ã€‚

æ­¤æ–‡ä»¶ä¹Ÿæ˜¯ä½¿ä»¥ä¸‹è¾“å…¥æ­£å¸¸å·¥ä½œçš„å…³é”®ï¼š

```text
anthropic:claude-sonnet-4-6
kimi:model-name
```

å¦‚æžœæ­¤å¤„ç¼ºå°‘åˆ«åï¼Œprovider å¯èƒ½è®¤è¯æ­£å¸¸ï¼Œä½†åœ¨ `/model` è§£æžä¸­ä»ç„¶å¤±è´¥ã€‚

## ç¬¬ 4 æ­¥ï¼šåœ¨ `zed_cli/runtime_provider.py` ä¸­è§£æžè¿è¡Œæ—¶æ•°æ®

`resolve_runtime_provider()` æ˜¯ CLIã€gatewayï¼ˆç½‘å…³ï¼‰ã€cronã€ACP å’Œè¾…åŠ©å®¢æˆ·ç«¯å…±ç”¨çš„è·¯å¾„ã€‚

æ·»åŠ ä¸€ä¸ªåˆ†æ”¯ï¼Œè‡³å°‘è¿”å›žåŒ…å«ä»¥ä¸‹å†…å®¹çš„å­—å…¸ï¼š

```python
{
    "provider": "your-provider",
    "api_mode": "chat_completions",  # or your native mode
    "base_url": "https://...",
    "api_key": "...",
    "source": "env|portal|auth-store|explicit",
    "requested_provider": requested_provider,
}
```

å¦‚æžœ provider ä¸Ž OpenAI å…¼å®¹ï¼Œ`api_mode` é€šå¸¸åº”ä¿æŒä¸º `chat_completions`ã€‚

æ³¨æ„ API key ä¼˜å…ˆçº§ã€‚Zed å·²ç»åŒ…å«é¿å…å°† OpenRouter key æ³„éœ²ç»™æ— å…³ç«¯ç‚¹çš„é€»è¾‘ã€‚æ–° provider åº”åŒæ ·æ˜Žç¡®åœ°æŒ‡å®šå“ªä¸ª key å¯¹åº”å“ªä¸ª base URLã€‚

## ç¬¬ 5 æ­¥ï¼šåœ¨ `zed_cli/main.py` ä¸­æŽ¥çº¿ CLI

åœ¨äº¤äº’å¼ `zed model` æµç¨‹ä¸­å‡ºçŽ°ä¹‹å‰ï¼Œprovider æ˜¯ä¸å¯å‘çŽ°çš„ã€‚

åœ¨ `zed_cli/main.py` ä¸­æ›´æ–°ä»¥ä¸‹å†…å®¹ï¼š

- `provider_labels` å­—å…¸
- `select_provider_and_model()` ä¸­çš„ `providers` åˆ—è¡¨
- provider åˆ†å‘ï¼ˆ`if selected_provider == ...`ï¼‰
- `--provider` å‚æ•°é€‰é¡¹
- å¦‚æžœ provider æ”¯æŒç™»å½•/ç™»å‡ºæµç¨‹ï¼Œåˆ™æ›´æ–°ç›¸åº”é€‰é¡¹
- ä¸€ä¸ª `_model_flow_<provider>()` å‡½æ•°ï¼Œæˆ–è€…å¦‚æžœé€‚ç”¨åˆ™å¤ç”¨ `_model_flow_api_key_provider()`

:::tip
`zed_cli/setup.py` æ— éœ€ä¿®æ”¹â€”â€”å®ƒè°ƒç”¨ `main.py` ä¸­çš„ `select_provider_and_model()`ï¼Œå› æ­¤ä½ çš„æ–° provider ä¼šè‡ªåŠ¨å‡ºçŽ°åœ¨ `zed model` å’Œ `zed setup` ä¸­ã€‚
:::

## ç¬¬ 6 æ­¥ï¼šä¿æŒè¾…åŠ©è°ƒç”¨æ­£å¸¸å·¥ä½œ

è¿™é‡Œæœ‰ä¸¤ä¸ªæ–‡ä»¶éœ€è¦å…³æ³¨ï¼š

### `agent/auxiliary_client.py`

å¦‚æžœè¿™æ˜¯ä¸€ä¸ªç›´æŽ¥ API key providerï¼Œåœ¨ `_API_KEY_PROVIDER_AUX_MODELS` ä¸­æ·»åŠ ä¸€ä¸ªå»‰ä»·/å¿«é€Ÿçš„é»˜è®¤è¾…åŠ©æ¨¡åž‹ã€‚

è¾…åŠ©ä»»åŠ¡åŒ…æ‹¬ï¼š

- è§†è§‰æ‘˜è¦
- ç½‘é¡µæå–æ‘˜è¦
- ä¸Šä¸‹æ–‡åŽ‹ç¼©æ‘˜è¦
- ä¼šè¯æœç´¢æ‘˜è¦
- è®°å¿†åˆ·æ–°

å¦‚æžœ provider æ²¡æœ‰åˆç†çš„è¾…åŠ©é»˜è®¤å€¼ï¼Œè¾…åŠ©ä»»åŠ¡å¯èƒ½ä¼šä¸¥é‡å›žé€€ï¼Œæˆ–æ„å¤–ä½¿ç”¨æ˜‚è´µçš„ä¸»æ¨¡åž‹ã€‚

### `agent/model_metadata.py`

ä¸º provider çš„æ¨¡åž‹æ·»åŠ ä¸Šä¸‹æ–‡é•¿åº¦ï¼Œä»¥ä¿æŒ token é¢„ç®—ã€åŽ‹ç¼©é˜ˆå€¼å’Œé™åˆ¶çš„åˆç†æ€§ã€‚

## ç¬¬ 7 æ­¥ï¼šå¦‚æžœ provider æ˜¯åŽŸç”Ÿçš„ï¼Œæ·»åŠ é€‚é…å™¨å’Œ `run_agent.py` æ”¯æŒ

å¦‚æžœ provider ä¸æ˜¯æ™®é€šçš„ chat completionsï¼Œå°† provider ä¸“å±žé€»è¾‘éš”ç¦»åœ¨ `agent/<provider>_adapter.py` ä¸­ã€‚

ä¿æŒ `run_agent.py` ä¸“æ³¨äºŽç¼–æŽ’ã€‚å®ƒåº”è¯¥è°ƒç”¨é€‚é…å™¨è¾…åŠ©å‡½æ•°ï¼Œè€Œä¸æ˜¯åœ¨æ•´ä¸ªæ–‡ä»¶ä¸­å†…è”æž„å»º provider è¯·æ±‚è½½è·ã€‚

åŽŸç”Ÿ provider é€šå¸¸éœ€è¦åœ¨ä»¥ä¸‹åœ°æ–¹è¿›è¡Œå·¥ä½œï¼š

### æ–°é€‚é…å™¨æ–‡ä»¶

å…¸åž‹èŒè´£ï¼š

- æž„å»º SDK / HTTP å®¢æˆ·ç«¯
- è§£æž token
- å°† OpenAI é£Žæ ¼çš„å¯¹è¯æ¶ˆæ¯è½¬æ¢ä¸º provider çš„è¯·æ±‚æ ¼å¼
- å¦‚æœ‰éœ€è¦ï¼Œè½¬æ¢å·¥å…· schema
- å°† provider å“åº”è§„èŒƒåŒ–ä¸º `run_agent.py` æœŸæœ›çš„æ ¼å¼
- æå–ç”¨é‡å’Œ finish-reason æ•°æ®

### `run_agent.py`

æœç´¢ `api_mode` å¹¶å®¡è®¡æ¯ä¸ªåˆ‡æ¢ç‚¹ã€‚è‡³å°‘éªŒè¯ï¼š

- `__init__` é€‰æ‹©äº†æ–°çš„ `api_mode`
- å®¢æˆ·ç«¯æž„å»ºå¯¹è¯¥ provider æœ‰æ•ˆ
- `_build_api_kwargs()` çŸ¥é“å¦‚ä½•æ ¼å¼åŒ–è¯·æ±‚
- `_interruptible_api_call()` åˆ†å‘åˆ°æ­£ç¡®çš„å®¢æˆ·ç«¯è°ƒç”¨
- ä¸­æ–­ / å®¢æˆ·ç«¯é‡å»ºè·¯å¾„æ­£å¸¸å·¥ä½œ
- å“åº”éªŒè¯æŽ¥å—è¯¥ provider çš„æ ¼å¼
- finish-reason æå–æ­£ç¡®
- token ç”¨é‡æå–æ­£ç¡®
- å›žé€€æ¨¡åž‹æ¿€æ´»å¯ä»¥å¹²å‡€åœ°åˆ‡æ¢åˆ°æ–° provider
- æ‘˜è¦ç”Ÿæˆå’Œè®°å¿†åˆ·æ–°è·¯å¾„ä»ç„¶æ­£å¸¸å·¥ä½œ

åŒæ—¶åœ¨ `run_agent.py` ä¸­æœç´¢ `self.client.`ã€‚ä»»ä½•å‡è®¾æ ‡å‡† OpenAI å®¢æˆ·ç«¯å­˜åœ¨çš„ä»£ç è·¯å¾„ï¼Œåœ¨åŽŸç”Ÿ provider ä½¿ç”¨ä¸åŒå®¢æˆ·ç«¯å¯¹è±¡æˆ– `self.client = None` æ—¶éƒ½å¯èƒ½ä¸­æ–­ã€‚

### Prompt ç¼“å­˜å’Œ provider ä¸“å±žè¯·æ±‚å­—æ®µ

Promptï¼ˆæç¤ºè¯ï¼‰ç¼“å­˜å’Œ provider ä¸“å±žçš„è°ƒèŠ‚é¡¹å¾ˆå®¹æ˜“å‡ºçŽ°å›žå½’ã€‚

ä»£ç åº“ä¸­å·²æœ‰çš„ç¤ºä¾‹ï¼š

- Anthropic æœ‰åŽŸç”Ÿçš„ prompt ç¼“å­˜è·¯å¾„
- OpenRouter èŽ·å¾— provider è·¯ç”±å­—æ®µ
- å¹¶éžæ¯ä¸ª provider éƒ½åº”è¯¥æŽ¥æ”¶æ¯ä¸ªè¯·æ±‚ç«¯é€‰é¡¹

æ·»åŠ åŽŸç”Ÿ provider æ—¶ï¼Œä»”ç»†æ£€æŸ¥ Zed åªå‘è¯¥ provider å‘é€å®ƒå®žé™…ç†è§£çš„å­—æ®µã€‚

## ç¬¬ 8 æ­¥ï¼šæµ‹è¯•

è‡³å°‘ä¿®æ”¹ä¿æŠ¤ provider æŽ¥çº¿çš„æµ‹è¯•ã€‚

å¸¸è§ä½ç½®ï¼š

- `tests/test_runtime_provider_resolution.py`
- `tests/test_cli_provider_resolution.py`
- `tests/test_cli_model_command.py`
- `tests/test_setup_model_selection.py`
- `tests/test_provider_parity.py`
- `tests/test_run_agent.py`
- åŽŸç”Ÿ provider çš„ `tests/test_<provider>_adapter.py`

å¯¹äºŽä»…æ–‡æ¡£ç¤ºä¾‹ï¼Œç¡®åˆ‡çš„æ–‡ä»¶é›†å¯èƒ½ä¸åŒã€‚é‡ç‚¹æ˜¯è¦†ç›–ï¼š

- è®¤è¯è§£æž
- CLI èœå• / provider é€‰æ‹©
- è¿è¡Œæ—¶ provider è§£æž
- agent æ‰§è¡Œè·¯å¾„
- `provider:model` è§£æž
- ä»»ä½•é€‚é…å™¨ä¸“å±žçš„æ¶ˆæ¯è½¬æ¢

ä½¿ç”¨ç¦ç”¨ xdist çš„æ–¹å¼è¿è¡Œæµ‹è¯•ï¼š

```bash
source venv/bin/activate
python -m pytest tests/test_runtime_provider_resolution.py tests/test_cli_provider_resolution.py tests/test_cli_model_command.py tests/test_setup_model_selection.py -n0 -q
```

å¯¹äºŽæ›´æ·±å±‚çš„ä¿®æ”¹ï¼Œåœ¨æŽ¨é€å‰è¿è¡Œå®Œæ•´æµ‹è¯•å¥—ä»¶ï¼š

```bash
source venv/bin/activate
python -m pytest tests/ -n0 -q
```

## ç¬¬ 9 æ­¥ï¼šå®žæ—¶éªŒè¯

æµ‹è¯•é€šè¿‡åŽï¼Œè¿è¡ŒçœŸå®žçš„å†’çƒŸæµ‹è¯•ã€‚

```bash
source venv/bin/activate
python -m zed_cli.main chat -q "Say hello" --provider your-provider --model your-model
```

å¦‚æžœä½ ä¿®æ”¹äº†èœå•ï¼Œä¹Ÿæµ‹è¯•äº¤äº’å¼æµç¨‹ï¼š

```bash
source venv/bin/activate
python -m zed_cli.main model
python -m zed_cli.main setup
```

å¯¹äºŽåŽŸç”Ÿ providerï¼Œè‡³å°‘ä¹ŸéªŒè¯ä¸€æ¬¡å·¥å…·è°ƒç”¨ï¼Œè€Œä¸ä»…ä»…æ˜¯çº¯æ–‡æœ¬å“åº”ã€‚

## ç¬¬ 10 æ­¥ï¼šæ›´æ–°ç”¨æˆ·æ–‡æ¡£

å¦‚æžœè¯¥ provider æ‰“ç®—ä½œä¸ºä¸€æµé€‰é¡¹å‘å¸ƒï¼Œä¹Ÿæ›´æ–°ç”¨æˆ·æ–‡æ¡£ï¼š

- `website/docs/getting-started/quickstart.md`
- `website/docs/user-guide/configuration.md`
- `website/docs/reference/environment-variables.md`

å¼€å‘è€…å¯ä»¥å®Œç¾Žåœ°æŽ¥çº¿ providerï¼Œä½†ä»ç„¶è®©ç”¨æˆ·æ— æ³•å‘çŽ°æ‰€éœ€çš„çŽ¯å¢ƒå˜é‡æˆ– setup æµç¨‹ã€‚

## OpenAI å…¼å®¹ provider æ¸…å•

å¦‚æžœ provider æ˜¯æ ‡å‡† chat completionsï¼Œä½¿ç”¨æ­¤æ¸…å•ã€‚

- [ ] åœ¨ `zed_cli/auth.py` ä¸­æ·»åŠ  `ProviderConfig`
- [ ] åœ¨ `zed_cli/auth.py` å’Œ `zed_cli/models.py` ä¸­æ·»åŠ åˆ«å
- [ ] åœ¨ `zed_cli/models.py` ä¸­æ·»åŠ æ¨¡åž‹ç›®å½•
- [ ] åœ¨ `zed_cli/runtime_provider.py` ä¸­æ·»åŠ è¿è¡Œæ—¶åˆ†æ”¯
- [ ] åœ¨ `zed_cli/main.py` ä¸­æ·»åŠ  CLI æŽ¥çº¿ï¼ˆsetup.py è‡ªåŠ¨ç»§æ‰¿ï¼‰
- [ ] åœ¨ `agent/auxiliary_client.py` ä¸­æ·»åŠ è¾…åŠ©æ¨¡åž‹
- [ ] åœ¨ `agent/model_metadata.py` ä¸­æ·»åŠ ä¸Šä¸‹æ–‡é•¿åº¦
- [ ] æ›´æ–°è¿è¡Œæ—¶ / CLI æµ‹è¯•
- [ ] æ›´æ–°ç”¨æˆ·æ–‡æ¡£

## åŽŸç”Ÿ provider æ¸…å•

å½“ provider éœ€è¦æ–°çš„åè®®è·¯å¾„æ—¶ä½¿ç”¨æ­¤æ¸…å•ã€‚

- [ ] OpenAI å…¼å®¹æ¸…å•ä¸­çš„æ‰€æœ‰å†…å®¹
- [ ] åœ¨ `agent/<provider>_adapter.py` ä¸­æ·»åŠ é€‚é…å™¨
- [ ] åœ¨ `run_agent.py` ä¸­æ”¯æŒæ–°çš„ `api_mode`
- [ ] ä¸­æ–­ / é‡å»ºè·¯å¾„æ­£å¸¸å·¥ä½œ
- [ ] ç”¨é‡å’Œ finish-reason æå–æ­£å¸¸å·¥ä½œ
- [ ] å›žé€€è·¯å¾„æ­£å¸¸å·¥ä½œ
- [ ] æ·»åŠ é€‚é…å™¨æµ‹è¯•
- [ ] å®žæ—¶å†’çƒŸæµ‹è¯•é€šè¿‡

## å¸¸è§é™·é˜±

### 1. å°† provider æ·»åŠ åˆ° auth ä½†æœªæ·»åŠ åˆ°æ¨¡åž‹è§£æž

è¿™ä¼šå¯¼è‡´å‡­æ®è§£æžæ­£ç¡®ï¼Œè€Œ `/model` å’Œ `provider:model` è¾“å…¥å¤±è´¥ã€‚

### 2. å¿˜è®° `config["model"]` å¯ä»¥æ˜¯å­—ç¬¦ä¸²æˆ–å­—å…¸

å¤§é‡ provider é€‰æ‹©ä»£ç å¿…é¡»å¯¹ä¸¤ç§å½¢å¼è¿›è¡Œè§„èŒƒåŒ–ã€‚

### 3. å‡è®¾å¿…é¡»ä½¿ç”¨å†…ç½® provider

å¦‚æžœè¯¥æœåŠ¡åªæ˜¯ OpenAI å…¼å®¹çš„ï¼Œè‡ªå®šä¹‰ provider å¯èƒ½å·²ç»ä»¥æ›´å°‘çš„ç»´æŠ¤æˆæœ¬è§£å†³äº†ç”¨æˆ·é—®é¢˜ã€‚

### 4. å¿˜è®°è¾…åŠ©è·¯å¾„

ä¸»èŠå¤©è·¯å¾„å¯èƒ½æ­£å¸¸å·¥ä½œï¼Œè€Œæ‘˜è¦ã€è®°å¿†åˆ·æ–°æˆ–è§†è§‰è¾…åŠ©å¤±è´¥ï¼Œå› ä¸ºè¾…åŠ©è·¯ç”±ä»Žæœªæ›´æ–°ã€‚

### 5. åŽŸç”Ÿ provider åˆ†æ”¯éšè—åœ¨ `run_agent.py` ä¸­

æœç´¢ `api_mode` å’Œ `self.client.`ã€‚ä¸è¦å‡è®¾æ˜¾è€Œæ˜“è§çš„è¯·æ±‚è·¯å¾„æ˜¯å”¯ä¸€çš„ã€‚

### 6. å°† OpenRouter ä¸“å±žå­—æ®µå‘é€ç»™å…¶ä»– provider

provider è·¯ç”±ç­‰å­—æ®µåªå±žäºŽæ”¯æŒå®ƒä»¬çš„ providerã€‚

### 7. æ›´æ–°äº† `zed model` ä½†æœªæ›´æ–° `zed setup`

ä¸¤ä¸ªæµç¨‹éƒ½éœ€è¦äº†è§£è¯¥ providerã€‚

## å®žçŽ°æ—¶çš„å¥½æœç´¢ç›®æ ‡

å¦‚æžœä½ åœ¨å¯»æ‰¾ provider æ¶‰åŠçš„æ‰€æœ‰ä½ç½®ï¼Œæœç´¢ä»¥ä¸‹ç¬¦å·ï¼š

- `PROVIDER_REGISTRY`
- `_PROVIDER_ALIASES`
- `_PROVIDER_MODELS`
- `resolve_runtime_provider`
- `_model_flow_`
- `select_provider_and_model`
- `api_mode`
- `_API_KEY_PROVIDER_AUX_MODELS`
- `self.client.`

## ç›¸å…³æ–‡æ¡£

- [Provider è¿è¡Œæ—¶è§£æž](./provider-runtime.md)
- [æž¶æž„](./architecture.md)
- [è´¡çŒ®æŒ‡å—](./contributing.md)