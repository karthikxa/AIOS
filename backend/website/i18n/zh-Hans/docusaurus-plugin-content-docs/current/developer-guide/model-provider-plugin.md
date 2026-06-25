---
sidebar_position: 10
title: "æ¨¡åž‹æä¾›å•†æ’ä»¶"
description: "å¦‚ä½•ä¸º Zed Agent æž„å»ºæ¨¡åž‹æä¾›å•†ï¼ˆæŽ¨ç†åŽç«¯ï¼‰æ’ä»¶"
---

# æž„å»ºæ¨¡åž‹æä¾›å•†æ’ä»¶

æ¨¡åž‹æä¾›å•†æ’ä»¶å£°æ˜Žä¸€ä¸ªæŽ¨ç†åŽç«¯â€”â€”å…¼å®¹ OpenAI çš„ç«¯ç‚¹ã€Anthropic Messages æœåŠ¡å™¨ã€Codex é£Žæ ¼çš„ Responses APIï¼Œæˆ– Bedrock åŽŸç”ŸæŽ¥å£â€”â€”Zed å¯é€šè¿‡è¿™äº›åŽç«¯è·¯ç”± `AIAgent` è°ƒç”¨ã€‚æ¯ä¸ªå†…ç½®æä¾›å•†ï¼ˆOpenRouterã€Anthropicã€GMIã€DeepSeekã€Nvidiaâ€¦â€¦ï¼‰éƒ½ä»¥æ­¤ç±»æ’ä»¶å½¢å¼æä¾›ã€‚ç¬¬ä¸‰æ–¹å¯é€šè¿‡åœ¨ `$ZED_HOME/plugins/model-providers/` ä¸‹æ”¾ç½®ä¸€ä¸ªç›®å½•æ¥æ·»åŠ è‡ªå·±çš„æä¾›å•†ï¼Œæ— éœ€å¯¹ä»“åº“åšä»»ä½•ä¿®æ”¹ã€‚

:::tip
æ¨¡åž‹æä¾›å•†æ’ä»¶æ˜¯**æä¾›å•†æ’ä»¶**çš„ç¬¬ä¸‰ç§ç±»åž‹ã€‚å…¶ä»–ä¸¤ç§åˆ†åˆ«æ˜¯ [Memory Provider æ’ä»¶](/developer-guide/memory-provider-plugin)ï¼ˆè·¨ä¼šè¯çŸ¥è¯†ï¼‰å’Œ [Context Engine æ’ä»¶](/developer-guide/context-engine-plugin)ï¼ˆä¸Šä¸‹æ–‡åŽ‹ç¼©ç­–ç•¥ï¼‰ã€‚ä¸‰è€…å‡éµå¾ªç›¸åŒçš„"æ”¾å…¥ç›®å½•ã€å£°æ˜Ž profileã€æ— éœ€ç¼–è¾‘ä»“åº“"æ¨¡å¼ã€‚
:::

## å‘çŽ°æœºåˆ¶

`providers/__init__.py._discover_providers()` åœ¨ä»»ä½•ä»£ç é¦–æ¬¡è°ƒç”¨ `get_provider_profile()` æˆ– `list_providers()` æ—¶æ‡’åŠ è½½æ‰§è¡Œã€‚å‘çŽ°é¡ºåºï¼š

1. **å†…ç½®æ’ä»¶** â€” `<repo>/plugins/model-providers/<name>/` â€” éš Zed ä¸€åŒå‘å¸ƒ
2. **ç”¨æˆ·æ’ä»¶** â€” `$ZED_HOME/plugins/model-providers/<name>/` â€” æ”¾å…¥ä»»æ„ç›®å½•ï¼›åŽç»­ä¼šè¯æ— éœ€é‡å¯å³å¯ç”Ÿæ•ˆ
3. **æ—§ç‰ˆå•æ–‡ä»¶** â€” `<repo>/providers/<name>.py` â€” ä¸ºæ ‘å¤–å¯ç¼–è¾‘å®‰è£…æä¾›å‘åŽå…¼å®¹

**åŒåç”¨æˆ·æ’ä»¶ä¼šè¦†ç›–å†…ç½®æ’ä»¶**ï¼Œå› ä¸º `register_provider()` é‡‡ç”¨åŽå†™è€…ä¼˜å…ˆç­–ç•¥ã€‚æ”¾å…¥ `$ZED_HOME/plugins/model-providers/gmi/` ç›®å½•å³å¯æ›¿æ¢å†…ç½® GMI profileï¼Œæ— éœ€ä¿®æ”¹ä»“åº“ã€‚

## ç›®å½•ç»“æž„

```
plugins/model-providers/my-provider/
â”œâ”€â”€ __init__.py       # åœ¨æ¨¡å—çº§åˆ«è°ƒç”¨ register_provider(profile)
â”œâ”€â”€ plugin.yaml       # kind: model-provider + å…ƒæ•°æ®ï¼ˆå¯é€‰ä½†æŽ¨èï¼‰
â””â”€â”€ README.md         # å®‰è£…è¯´æ˜Žï¼ˆå¯é€‰ï¼‰
```

å”¯ä¸€å¿…éœ€çš„æ–‡ä»¶æ˜¯ `__init__.py`ã€‚`plugin.yaml` ä¾› `zed plugins` ç”¨äºŽè‡ªçœï¼Œä»¥åŠä¾›é€šç”¨ PluginManager å°†æ’ä»¶è·¯ç”±åˆ°æ­£ç¡®çš„åŠ è½½å™¨ï¼›è‹¥ç¼ºå°‘è¯¥æ–‡ä»¶ï¼Œé€šç”¨åŠ è½½å™¨ä¼šå›žé€€åˆ°æºç æ–‡æœ¬å¯å‘å¼æ£€æµ‹ã€‚

## æœ€ç®€ç¤ºä¾‹â€”â€”ä¸€ä¸ªç®€å•çš„ API key æä¾›å•†

```python
# plugins/model-providers/acme-inference/__init__.py
from providers import register_provider
from providers.base import ProviderProfile

acme = ProviderProfile(
    name="acme-inference",
    aliases=("acme",),
    display_name="Acme Inference",
    description="Acme â€” OpenAI-compatible direct API",
    signup_url="https://acme.example.com/keys",
    env_vars=("ACME_API_KEY", "ACME_BASE_URL"),
    base_url="https://api.acme.example.com/v1",
    auth_type="api_key",
    default_aux_model="acme-small-fast",
    fallback_models=(
        "acme-large-v3",
        "acme-medium-v3",
        "acme-small-fast",
    ),
)

register_provider(acme)
```

```yaml
# plugins/model-providers/acme-inference/plugin.yaml
name: acme-inference
kind: model-provider
version: 1.0.0
description: Acme Inference â€” OpenAI-compatible direct API
author: Your Name
```

å°±è¿™äº›ã€‚æ”¾å…¥è¿™ä¸¤ä¸ªæ–‡ä»¶åŽï¼Œä»¥ä¸‹é›†æˆ**è‡ªåŠ¨ç”Ÿæ•ˆ**ï¼Œæ— éœ€å…¶ä»–ä»»ä½•ä¿®æ”¹ï¼š

| é›†æˆç‚¹ | ä½ç½® | èŽ·å¾—çš„èƒ½åŠ› |
|---|---|---|
| å‡­æ®è§£æž | `zed_cli/auth.py` | `PROVIDER_REGISTRY["acme-inference"]` ä»Ž profile å¡«å…… |
| `--provider` CLI æ ‡å¿— | `zed_cli/main.py` | æŽ¥å— `acme-inference` |
| `zed model` é€‰æ‹©å™¨ | `zed_cli/models.py` | å‡ºçŽ°åœ¨ `CANONICAL_PROVIDERS` ä¸­ï¼Œä»Ž `{base_url}/models` èŽ·å–æ¨¡åž‹åˆ—è¡¨ |
| `zed doctor` | `zed_cli/doctor.py` | å¯¹ `ACME_API_KEY` åŠ `{base_url}/models` è¿›è¡Œå¥åº·æ£€æŸ¥ |
| `zed setup` | `zed_cli/config.py` | `ACME_API_KEY` å‡ºçŽ°åœ¨ `OPTIONAL_ENV_VARS` å’Œè®¾ç½®å‘å¯¼ä¸­ |
| URL åå‘æ˜ å°„ | `agent/model_metadata.py` | ä¸»æœºå â†’ æä¾›å•†åç§°ï¼Œç”¨äºŽè‡ªåŠ¨æ£€æµ‹ |
| è¾…åŠ©æ¨¡åž‹ | `agent/auxiliary_client.py` | ä½¿ç”¨ `default_aux_model` è¿›è¡ŒåŽ‹ç¼©/æ‘˜è¦ |
| è¿è¡Œæ—¶è§£æž | `zed_cli/runtime_provider.py` | è¿”å›žæ­£ç¡®çš„ `base_url`ã€`api_key`ã€`api_mode` |
| ä¼ è¾“å±‚ | `agent/transports/chat_completions.py` | Profile è·¯å¾„é€šè¿‡ `prepare_messages` / `build_extra_body` / `build_api_kwargs_extras` ç”Ÿæˆ kwargs |

## ProviderProfile å­—æ®µ

å®Œæ•´å®šä¹‰è§ `providers/base.py`ã€‚æœ€å¸¸ç”¨çš„å­—æ®µï¼š

| å­—æ®µ | ç±»åž‹ | ç”¨é€” |
|---|---|---|
| `name` | str | è§„èŒƒ IDâ€”â€”ä¸Ž `config.yaml` ä¸­çš„ `model.provider` åŠ `--provider` æ ‡å¿—åŒ¹é… |
| `aliases` | `tuple[str, ...]` | ç”± `get_provider_profile()` è§£æžçš„åˆ«åï¼ˆå¦‚ `grok` â†’ `xai`ï¼‰ |
| `api_mode` | str | `chat_completions` \| `codex_responses` \| `anthropic_messages` \| `bedrock_converse` |
| `display_name` | str | åœ¨ `zed model` é€‰æ‹©å™¨ä¸­æ˜¾ç¤ºçš„äººç±»å¯è¯»æ ‡ç­¾ |
| `description` | str | é€‰æ‹©å™¨å‰¯æ ‡é¢˜ |
| `signup_url` | str | é¦–æ¬¡è¿è¡Œè®¾ç½®æ—¶æ˜¾ç¤ºï¼ˆ"åœ¨æ­¤èŽ·å– API key"ï¼‰ |
| `env_vars` | `tuple[str, ...]` | æŒ‰ä¼˜å…ˆçº§æŽ’åˆ—çš„ API key çŽ¯å¢ƒå˜é‡ï¼›æœ€åŽä¸€ä¸ª `*_BASE_URL` æ¡ç›®ç”¨ä½œç”¨æˆ· base URL è¦†ç›– |
| `base_url` | str | é»˜è®¤æŽ¨ç†ç«¯ç‚¹ |
| `models_url` | str | æ˜¾å¼ç›®å½• URLï¼ˆå›žé€€åˆ° `{base_url}/models`ï¼‰ |
| `auth_type` | str | `api_key` \| `oauth_device_code` \| `oauth_external` \| `copilot` \| `aws_sdk` \| `external_process` |
| `fallback_models` | `tuple[str, ...]` | å®žæ—¶ç›®å½•èŽ·å–å¤±è´¥æ—¶æ˜¾ç¤ºçš„ç²¾é€‰åˆ—è¡¨ |
| `default_headers` | `dict[str, str]` | éšæ¯ä¸ªè¯·æ±‚å‘é€ï¼ˆå¦‚ Copilot çš„ `Editor-Version`ï¼‰ |
| `fixed_temperature` | Any | `None` = ä½¿ç”¨è°ƒç”¨æ–¹çš„å€¼ï¼›`OMIT_TEMPERATURE` å“¨å…µå€¼ = å®Œå…¨ä¸å‘é€ temperatureï¼ˆKimiï¼‰ |
| `default_max_tokens` | `int \| None` | æä¾›å•†çº§åˆ«çš„ max_tokens ä¸Šé™ï¼ˆNvidiaï¼š16384ï¼‰ |
| `default_aux_model` | str | ç”¨äºŽè¾…åŠ©ä»»åŠ¡ï¼ˆåŽ‹ç¼©ã€è§†è§‰ã€æ‘˜è¦ï¼‰çš„å»‰ä»·æ¨¡åž‹ |

## å¯è¦†ç›–çš„ hook

å¯¹äºŽéžå¸¸è§„çš„ç‰¹æ®Šéœ€æ±‚ï¼Œå¯å­ç±»åŒ– `ProviderProfile`ï¼š

```python
from typing import Any
from providers.base import ProviderProfile

class AcmeProfile(ProviderProfile):
    def prepare_messages(self, messages: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """æä¾›å•†ç‰¹å®šçš„æ¶ˆæ¯é¢„å¤„ç†ã€‚åœ¨ codex æ¸…ç†ä¹‹åŽã€developer-role æ›¿æ¢ä¹‹å‰è¿è¡Œã€‚
        é»˜è®¤ï¼šç›´æŽ¥é€ä¼ ã€‚"""
        # ç¤ºä¾‹ï¼šQwen å°†çº¯æ–‡æœ¬å†…å®¹è§„èŒƒåŒ–ä¸º list-of-parts æ•°ç»„å¹¶æ³¨å…¥ cache_controlï¼›
        # Kimi é‡å†™ tool-call JSON
        return messages

    def build_extra_body(self, *, session_id=None, **context) -> dict:
        """æä¾›å•†ç‰¹å®šçš„ extra_body å­—æ®µï¼Œåˆå¹¶åˆ° API è°ƒç”¨ä¸­ã€‚
        context åŒ…å«ï¼šsession_idã€provider_preferencesã€modelã€base_urlã€
        reasoning_configã€‚é»˜è®¤ï¼šç©º dictã€‚"""
        # ç¤ºä¾‹ï¼šOpenRouter çš„ provider-preferences å—ï¼Œ
        # Gemini çš„ thinking_config è½¬æ¢ã€‚
        return {}

    def build_api_kwargs_extras(self, *, reasoning_config=None, **context):
        """è¿”å›ž (extra_body_additions, top_level_kwargs)ã€‚å½“æŸäº›å­—æ®µéœ€è¦æ”¾åœ¨é¡¶å±‚
        ï¼ˆKimi çš„ reasoning_effortï¼‰è€Œå¦ä¸€äº›æ”¾åœ¨ extra_bodyï¼ˆOpenRouter çš„ reasoning dictï¼‰
        æ—¶éœ€è¦æ­¤æ–¹æ³•ã€‚é»˜è®¤ï¼š({}, {})ã€‚"""
        return {}, {}

    def fetch_models(self, *, api_key=None, timeout=8.0) -> list[str] | None:
        """å®žæ—¶ç›®å½•èŽ·å–ã€‚é»˜è®¤ä½¿ç”¨ Bearer è®¤è¯è®¿é—® {models_url or base_url}/modelsã€‚
        ä»¥ä¸‹æƒ…å†µéœ€è¦†ç›–ï¼šè‡ªå®šä¹‰è®¤è¯ï¼ˆAnthropicï¼‰ã€æ—  REST ç«¯ç‚¹ï¼ˆBedrock â†’ Noneï¼‰ï¼Œ
        æˆ–å…¬å¼€/æ— è®¤è¯ç›®å½•ï¼ˆOpenRouterï¼‰ã€‚"""
        return super().fetch_models(api_key=api_key, timeout=timeout)
```

## Hook å‚è€ƒç¤ºä¾‹

å‚è€ƒä»¥ä¸‹å†…ç½®æ’ä»¶äº†è§£å¸¸ç”¨å†™æ³•ï¼š

| æ’ä»¶ | å‚è€ƒåŽŸå›  |
|---|---|
| `plugins/model-providers/openrouter/` | å¸¦ provider preferences çš„èšåˆå™¨ï¼Œå…¬å¼€æ¨¡åž‹ç›®å½• |
| `plugins/model-providers/gemini/` | `thinking_config` è½¬æ¢ï¼ˆåŽŸç”Ÿ + OpenAI å…¼å®¹åµŒå¥—å½¢å¼ï¼‰ |
| `plugins/model-providers/kimi-coding/` | `OMIT_TEMPERATURE`ã€`extra_body.thinking`ã€é¡¶å±‚ `reasoning_effort` |
| `plugins/model-providers/qwen-oauth/` | æ¶ˆæ¯è§„èŒƒåŒ–ã€`cache_control` æ³¨å…¥ã€VL é«˜åˆ†è¾¨çŽ‡ |
| `plugins/model-providers/nous/` | å½’å› æ ‡ç­¾ã€"ç¦ç”¨æ—¶çœç•¥ reasoning" |
| `plugins/model-providers/custom/` | Ollama çš„ `num_ctx` + `think: false` ç‰¹æ®Šå¤„ç† |
| `plugins/model-providers/bedrock/` | `api_mode="bedrock_converse"`ï¼Œ`fetch_models` è¿”å›ž Noneï¼ˆæ—  REST ç«¯ç‚¹ï¼‰ |

## ç”¨æˆ·è¦†ç›–â€”â€”ä¸ä¿®æ”¹ä»“åº“æ›¿æ¢å†…ç½®æä¾›å•†

å‡è®¾ä½ æƒ³å°† `gmi` æŒ‡å‘ç§æœ‰æµ‹è¯•ç«¯ç‚¹è¿›è¡Œæµ‹è¯•ã€‚åˆ›å»º `~/.zed/plugins/model-providers/gmi/__init__.py`ï¼š

```python
from providers import register_provider
from providers.base import ProviderProfile

register_provider(ProviderProfile(
    name="gmi",
    aliases=("gmi-cloud", "gmicloud"),
    env_vars=("GMI_API_KEY",),
    base_url="https://gmi-staging.internal.example.com/v1",
    auth_type="api_key",
    default_aux_model="google/gemini-3.1-flash-lite-preview",
))
```

ä¸‹æ¬¡ä¼šè¯æ—¶ï¼Œ`get_provider_profile("gmi").base_url` å°†è¿”å›žæµ‹è¯• URLã€‚æ— éœ€æ‰“è¡¥ä¸ï¼Œæ— éœ€é‡æ–°æž„å»ºã€‚ç”±äºŽç”¨æˆ·æ’ä»¶åœ¨å†…ç½®æ’ä»¶ä¹‹åŽè¢«å‘çŽ°ï¼Œç”¨æˆ·çš„ `register_provider()` è°ƒç”¨ä¼šèƒœå‡ºã€‚

## api_mode é€‰æ‹©

ç³»ç»Ÿè¯†åˆ«å››ä¸ªå€¼ã€‚Zed çš„é€‰æ‹©ä¾æ®ï¼š

1. ç”¨æˆ·æ˜¾å¼è¦†ç›–ï¼ˆ`config.yaml` ä¸­è®¾ç½®äº† `model.api_mode`ï¼‰
2. OpenCode çš„æŒ‰æ¨¡åž‹åˆ†å‘ï¼ˆZen å’Œ Go çš„ `opencode_model_api_mode`ï¼‰
3. URL è‡ªåŠ¨æ£€æµ‹â€”â€”`/anthropic` åŽç¼€ â†’ `anthropic_messages`ï¼Œ`api.openai.com` â†’ `codex_responses`ï¼Œ`api.x.ai` â†’ `codex_responses`ï¼ŒKimi åŸŸåä¸Šçš„ `/coding` â†’ `chat_completions`
4. **Profile çš„ `api_mode`** ä½œä¸º URL æ£€æµ‹æ— ç»“æžœæ—¶çš„å›žé€€
5. é»˜è®¤ `chat_completions`

å°† `profile.api_mode` è®¾ç½®ä¸ºä½ çš„æä¾›å•†é»˜è®¤ä½¿ç”¨çš„å€¼â€”â€”å®ƒä½œä¸ºæç¤ºä½¿ç”¨ã€‚ç”¨æˆ· URL è¦†ç›–ä»ç„¶ä¼˜å…ˆã€‚

## è®¤è¯ç±»åž‹

| `auth_type` | å«ä¹‰ | ä½¿ç”¨è€… |
|---|---|---|
| `api_key` | å•ä¸ªçŽ¯å¢ƒå˜é‡æºå¸¦é™æ€ API key | å¤§å¤šæ•°æä¾›å•† |
| `oauth_device_code` | è®¾å¤‡ç  OAuth æµç¨‹ | â€” |
| `oauth_external` | ç”¨æˆ·åœ¨å…¶ä»–åœ°æ–¹ç™»å½•ï¼Œtoken å­˜å…¥ `auth.json` | Anthropic OAuthã€MiniMax OAuthã€Gemini Cloud Codeã€Qwen Portalã€Nous Portal |
| `copilot` | GitHub Copilot token åˆ·æ–°å‘¨æœŸ | ä»… `copilot` æ’ä»¶ |
| `aws_sdk` | AWS SDK å‡­æ®é“¾ï¼ˆIAM roleã€profileã€envï¼‰ | ä»… `bedrock` æ’ä»¶ |
| `external_process` | è®¤è¯ç”± agent å¯åŠ¨çš„å­è¿›ç¨‹å¤„ç† | ä»… `copilot-acp` æ’ä»¶ |

`auth_type` æŽ§åˆ¶å“ªäº›ä»£ç è·¯å¾„å°†ä½ çš„æä¾›å•†è§†ä¸º"ç®€å• api-key æä¾›å•†"â€”â€”è‹¥ä¸æ˜¯ `api_key`ï¼ŒPluginManager ä»ä¼šè®°å½• manifestï¼Œä½† Zed CLI å±‚é¢çš„è‡ªåŠ¨åŒ–ï¼ˆdoctor æ£€æŸ¥ã€`--provider` æ ‡å¿—ã€è®¾ç½®å‘å¯¼å§”æ‰˜ï¼‰å¯èƒ½ä¼šè·³è¿‡å®ƒã€‚

## å‘çŽ°æ—¶æœº

æä¾›å•†å‘çŽ°æ˜¯**æ‡’åŠ è½½**çš„â€”â€”ç”±è¿›ç¨‹ä¸­é¦–æ¬¡è°ƒç”¨ `get_provider_profile()` æˆ– `list_providers()` è§¦å‘ã€‚å®žé™…ä¸Šè¿™åœ¨å¯åŠ¨æ—©æœŸå°±ä¼šå‘ç”Ÿï¼ˆ`auth.py` æ¨¡å—åŠ è½½æ—¶ä¼šä¸»åŠ¨æ‰©å±• `PROVIDER_REGISTRY`ï¼‰ã€‚è‹¥éœ€éªŒè¯æ’ä»¶æ˜¯å¦å·²åŠ è½½ï¼Œè¿è¡Œï¼š

```bash
zed doctor
```

â€”â€”æˆåŠŸçš„ `auth_type="api_key"` profile ä¼šå‡ºçŽ°åœ¨ Provider Connectivity éƒ¨åˆ†ï¼Œå¹¶é™„å¸¦ `/models` æŽ¢æµ‹ç»“æžœã€‚

ç¼–ç¨‹æ–¹å¼æ£€æŸ¥ï¼š

```python
from providers import list_providers
for p in list_providers():
    print(p.name, p.base_url, p.api_mode)
```

## æµ‹è¯•ä½ çš„æ’ä»¶

å°† `ZED_HOME` æŒ‡å‘ä¸´æ—¶ç›®å½•ï¼Œé¿å…æ±¡æŸ“çœŸå®žé…ç½®ï¼š

```bash
export ZED_HOME=/tmp/zed-plugin-test
mkdir -p $ZED_HOME/plugins/model-providers/my-provider
cat > $ZED_HOME/plugins/model-providers/my-provider/__init__.py <<'EOF'
from providers import register_provider
from providers.base import ProviderProfile
register_provider(ProviderProfile(
    name="my-provider",
    env_vars=("MY_API_KEY",),
    base_url="https://api.my-provider.example.com/v1",
    auth_type="api_key",
))
EOF

export MY_API_KEY=your-test-key
zed -z "hello" --provider my-provider -m some-model
```

## é€šç”¨ PluginManager é›†æˆ

é€šç”¨ `PluginManager`ï¼ˆå³ `zed plugins` æ“ä½œçš„å¯¹è±¡ï¼‰**èƒ½çœ‹åˆ°**æ¨¡åž‹æä¾›å•†æ’ä»¶ï¼Œä½†ä¸ä¼šå¯¼å…¥å®ƒä»¬â€”â€”`providers/__init__.py` è´Ÿè´£ç®¡ç†å…¶ç”Ÿå‘½å‘¨æœŸã€‚Manager è®°å½• manifest ç”¨äºŽè‡ªçœï¼Œå¹¶æŒ‰ `kind: model-provider` åˆ†ç±»ã€‚å½“ä½ å°†ä¸€ä¸ªæœªæ ‡è®°çš„ç”¨æˆ·æ’ä»¶æ”¾å…¥ `$ZED_HOME/plugins/`ï¼Œè€Œè¯¥æ’ä»¶æ°å¥½è°ƒç”¨äº†å¸¦ `ProviderProfile` çš„ `register_provider`ï¼ŒManager ä¼šé€šè¿‡æºç æ–‡æœ¬å¯å‘å¼æ£€æµ‹è‡ªåŠ¨å°†å…¶å½’ç±»ä¸º `kind: model-provider`â€”â€”å› æ­¤å³ä½¿æ²¡æœ‰ `plugin.yaml`ï¼Œæ’ä»¶ä»èƒ½æ­£ç¡®è·¯ç”±ã€‚

## é€šè¿‡ pip åˆ†å‘

ä¸Žæ‰€æœ‰ Zed æ’ä»¶ä¸€æ ·ï¼Œæ¨¡åž‹æä¾›å•†å¯ä»¥ä½œä¸º pip åŒ…å‘å¸ƒã€‚åœ¨ä½ çš„ `pyproject.toml` ä¸­æ·»åŠ å…¥å£ç‚¹ï¼š

```toml
[project.entry-points."zed_agent.plugins"]
acme-inference = "acme_zed_plugin:register"
```

â€¦â€¦å…¶ä¸­ `acme_zed_plugin:register` æ˜¯ä¸€ä¸ªè°ƒç”¨ `register_provider(profile)` çš„å‡½æ•°ã€‚é€šç”¨ PluginManager åœ¨ `discover_and_load()` æœŸé—´ä¼šæ‹¾å–å…¥å£ç‚¹æ’ä»¶ã€‚å¯¹äºŽ `kind: model-provider` çš„ pip æ’ä»¶ï¼Œä½ ä»éœ€åœ¨ manifest ä¸­å£°æ˜Ž kindï¼ˆæˆ–ä¾èµ–æºç æ–‡æœ¬å¯å‘å¼æ£€æµ‹ï¼‰ã€‚

å®Œæ•´çš„å…¥å£ç‚¹è®¾ç½®è¯·å‚é˜… [æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin#distribute-via-pip)ã€‚

## ç›¸å…³é¡µé¢

- [Provider Runtime](/developer-guide/provider-runtime) â€” è§£æžä¼˜å…ˆçº§åŠå„å±‚è¯»å– profile çš„ä½ç½®
- [æ·»åŠ æä¾›å•†](/developer-guide/adding-providers) â€” æ–°æŽ¨ç†åŽç«¯çš„ç«¯åˆ°ç«¯æ£€æŸ¥æ¸…å•ï¼ˆæ¶µç›–å¿«é€Ÿæ’ä»¶è·¯å¾„å’Œå®Œæ•´ CLI/auth é›†æˆï¼‰
- [Memory Provider æ’ä»¶](/developer-guide/memory-provider-plugin)
- [Context Engine æ’ä»¶](/developer-guide/context-engine-plugin)
- [æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin) â€” é€šç”¨æ’ä»¶ç¼–å†™æŒ‡å—