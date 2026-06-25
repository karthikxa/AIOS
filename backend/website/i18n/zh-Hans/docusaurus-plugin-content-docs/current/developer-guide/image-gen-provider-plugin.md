---
sidebar_position: 11
title: "å›¾åƒç”Ÿæˆ Provider æ’ä»¶"
description: "å¦‚ä½•ä¸º Zed Agent æž„å»ºå›¾åƒç”ŸæˆåŽç«¯æ’ä»¶"
---

# æž„å»ºå›¾åƒç”Ÿæˆ Provider æ’ä»¶

å›¾åƒç”Ÿæˆ provider æ’ä»¶æ³¨å†Œä¸€ä¸ªåŽç«¯ï¼Œç”¨äºŽå¤„ç†æ‰€æœ‰ `image_generate` å·¥å…·è°ƒç”¨â€”â€”DALLÂ·Eã€gpt-imageã€Grokã€Fluxã€Imagenã€Stable Diffusionã€falã€Replicateã€æœ¬åœ° ComfyUI è£…ç½®ï¼Œä»»ä½•åŽç«¯å‡å¯ã€‚å†…ç½® providerï¼ˆOpenAIã€OpenAI-Codexã€xAIï¼‰å‡ä»¥æ’ä»¶å½¢å¼æä¾›ã€‚ä½ å¯ä»¥é€šè¿‡åœ¨ `plugins/image_gen/<name>/` ç›®å½•ä¸‹æ”¾ç½®ä¸€ä¸ªç›®å½•æ¥æ·»åŠ æ–°çš„ providerï¼Œæˆ–è¦†ç›–å†…ç½® providerã€‚

:::tip
å›¾åƒç”Ÿæˆæ˜¯ Zed æ”¯æŒçš„å¤šç§**åŽç«¯æ’ä»¶**ä¹‹ä¸€ã€‚å…¶ä»–æ’ä»¶ï¼ˆå„æœ‰æ›´ä¸“ç”¨çš„ ABCï¼‰åŒ…æ‹¬ï¼š[Memory Provider æ’ä»¶](/developer-guide/memory-provider-plugin)ã€[Context Engine æ’ä»¶](/developer-guide/context-engine-plugin) å’Œ [Model Provider æ’ä»¶](/developer-guide/model-provider-plugin)ã€‚é€šç”¨å·¥å…·/hook/CLI æ’ä»¶è¯·å‚é˜… [æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin)ã€‚
:::

## å‘çŽ°æœºåˆ¶

Zed åœ¨ä¸‰ä¸ªä½ç½®æ‰«æå›¾åƒç”ŸæˆåŽç«¯ï¼š

1. **å†…ç½®** â€” `<repo>/plugins/image_gen/<name>/`ï¼ˆä»¥ `kind: backend` è‡ªåŠ¨åŠ è½½ï¼Œå§‹ç»ˆå¯ç”¨ï¼‰
2. **ç”¨æˆ·** â€” `~/.zed/plugins/image_gen/<name>/`ï¼ˆé€šè¿‡ `plugins.enabled` é€‰æ‹©å¯ç”¨ï¼‰
3. **Pip** â€” å£°æ˜Žäº† `zed_agent.plugins` å…¥å£ç‚¹çš„åŒ…

æ¯ä¸ªæ’ä»¶çš„ `register(ctx)` å‡½æ•°è°ƒç”¨ `ctx.register_image_gen_provider(...)` â€” å°†å…¶æ³¨å†Œåˆ° `agent/image_gen_registry.py` ä¸­çš„æ³¨å†Œè¡¨ã€‚æ´»è·ƒ provider ç”± `config.yaml` ä¸­çš„ `image_gen.provider` æŒ‡å®šï¼›`zed tools` ä¼šå¼•å¯¼ç”¨æˆ·å®Œæˆé€‰æ‹©ã€‚

`image_generate` å·¥å…·åŒ…è£…å™¨å‘æ³¨å†Œè¡¨è¯·æ±‚æ´»è·ƒ provider å¹¶åˆ†å‘è°ƒç”¨ã€‚è‹¥æœªæ³¨å†Œä»»ä½• providerï¼Œå·¥å…·ä¼šæ˜¾ç¤ºä¸€æ¡æœ‰ç”¨çš„é”™è¯¯ä¿¡æ¯ï¼ŒæŒ‡å¼•ç”¨æˆ·ä½¿ç”¨ `zed tools`ã€‚

## ç›®å½•ç»“æž„

```
plugins/image_gen/my-backend/
â”œâ”€â”€ __init__.py      # ImageGenProvider å­ç±» + register()
â””â”€â”€ plugin.yaml      # åŒ…å« kind: backend çš„æ¸…å•æ–‡ä»¶
```

å†…ç½®æ’ä»¶åˆ°æ­¤å³å®Œæ•´ã€‚ä½äºŽ `~/.zed/plugins/image_gen/<name>/` çš„ç”¨æˆ·æ’ä»¶éœ€è¦åœ¨ `config.yaml` çš„ `plugins.enabled` ä¸­æ·»åŠ ï¼ˆæˆ–è¿è¡Œ `zed plugins enable <name>`ï¼‰ã€‚

## ImageGenProvider ABC

ç»§æ‰¿ `agent.image_gen_provider.ImageGenProvider`ã€‚å”¯ä¸€å¿…é¡»å®žçŽ°çš„æˆå‘˜æ˜¯ `name` å±žæ€§å’Œ `generate()` æ–¹æ³•â€”â€”å…¶ä»–æ‰€æœ‰æˆå‘˜å‡æœ‰åˆç†çš„é»˜è®¤å€¼ï¼š

```python
# plugins/image_gen/my-backend/__init__.py
from typing import Any, Dict, List, Optional
import os

from agent.image_gen_provider import (
    DEFAULT_ASPECT_RATIO,
    ImageGenProvider,
    error_response,
    resolve_aspect_ratio,
    save_b64_image,
    success_response,
)


class MyBackendImageGenProvider(ImageGenProvider):
    @property
    def name(self) -> str:
        # Stable id used in image_gen.provider config. Lowercase, no spaces.
        return "my-backend"

    @property
    def display_name(self) -> str:
        # Human label shown in `zed tools`. Defaults to name.title() if omitted.
        return "My Backend"

    def is_available(self) -> bool:
        # Return False if credentials or deps are missing.
        # The tool's availability gate calls this before dispatch.
        if not os.environ.get("MY_BACKEND_API_KEY"):
            return False
        try:
            import my_backend_sdk  # noqa: F401
        except ImportError:
            return False
        return True

    def list_models(self) -> List[Dict[str, Any]]:
        # Catalog shown in `zed tools` model picker.
        return [
            {
                "id": "my-model-fast",
                "display": "My Model (Fast)",
                "speed": "~5s",
                "strengths": "Quick iteration",
                "price": "$0.01/image",
            },
            {
                "id": "my-model-hq",
                "display": "My Model (HQ)",
                "speed": "~30s",
                "strengths": "Highest fidelity",
                "price": "$0.04/image",
            },
        ]

    def default_model(self) -> Optional[str]:
        return "my-model-fast"

    def get_setup_schema(self) -> Dict[str, Any]:
        # Metadata for the `zed tools` picker â€” keys to prompt for at setup.
        return {
            "name": "My Backend",
            "badge": "paid",        # optional; shown as a short tag in the picker
            "tag": "One-line description shown under the name",
            "env_vars": [
                {
                    "key": "MY_BACKEND_API_KEY",
                    "prompt": "My Backend API key",
                    "url": "https://my-backend.example.com/api-keys",
                },
            ],
        }

    def generate(
        self,
        prompt: str,
        aspect_ratio: str = DEFAULT_ASPECT_RATIO,
        **kwargs: Any,
    ) -> Dict[str, Any]:
        prompt = (prompt or "").strip()
        aspect_ratio = resolve_aspect_ratio(aspect_ratio)

        if not prompt:
            return error_response(
                error="Prompt is required",
                error_type="invalid_input",
                provider=self.name,
                prompt="",
                aspect_ratio=aspect_ratio,
            )

        # Model selection precedence: env var â†’ config â†’ default. The helper
        # _resolve_model() in the built-in openai plugin is a good reference.
        model_id = kwargs.get("model") or self.default_model() or "my-model-fast"

        try:
            import my_backend_sdk
            client = my_backend_sdk.Client(api_key=os.environ["MY_BACKEND_API_KEY"])
            result = client.generate(
                prompt=prompt,
                model=model_id,
                aspect_ratio=aspect_ratio,
            )

            # Two shapes supported:
            #   - URL string: return it as `image`
            #   - base64 data: save under $ZED_HOME/cache/images/ via save_b64_image()
            if result.get("image_b64"):
                path = save_b64_image(
                    result["image_b64"],
                    prefix=self.name,
                    extension="png",
                )
                image = str(path)
            else:
                image = result["image_url"]

            return success_response(
                image=image,
                model=model_id,
                prompt=prompt,
                aspect_ratio=aspect_ratio,
                provider=self.name,
            )
        except Exception as exc:
            return error_response(
                error=str(exc),
                error_type=type(exc).__name__,
                provider=self.name,
                model=model_id,
                prompt=prompt,
                aspect_ratio=aspect_ratio,
            )


def register(ctx) -> None:
    """Plugin entry point â€” called once at load time."""
    ctx.register_image_gen_provider(MyBackendImageGenProvider())
```

## plugin.yaml

```yaml
name: my-backend
version: 1.0.0
description: My image backend â€” text-to-image via My Backend SDK
author: Your Name
kind: backend
requires_env:
  - MY_BACKEND_API_KEY
```

`kind: backend` å†³å®šæ’ä»¶è¢«è·¯ç”±åˆ°å›¾åƒç”Ÿæˆæ³¨å†Œè·¯å¾„ã€‚`requires_env` åœ¨ `zed plugins install` æœŸé—´ä¼šæç¤ºç”¨æˆ·è¾“å…¥ã€‚

## ABC å‚è€ƒ

å®Œæ•´å¥‘çº¦ä½äºŽ `agent/image_gen_provider.py`ã€‚é€šå¸¸éœ€è¦è¦†ç›–çš„æ–¹æ³•ï¼š

| æˆå‘˜ | å¿…é¡» | é»˜è®¤å€¼ | ç”¨é€” |
|---|---|---|---|
| `name` | âœ… | â€” | åœ¨ `image_gen.provider` é…ç½®ä¸­ä½¿ç”¨çš„ç¨³å®š id |
| `display_name` | â€” | `name.title()` | åœ¨ `zed tools` ä¸­æ˜¾ç¤ºçš„æ ‡ç­¾ |
| `is_available()` | â€” | `True` | ç¼ºå°‘å‡­æ®/ä¾èµ–æ—¶çš„æ‹¦æˆªé—¨æŽ§ |
| `list_models()` | â€” | `[]` | `zed tools` æ¨¡åž‹é€‰æ‹©å™¨çš„ç›®å½• |
| `default_model()` | â€” | `list_models()` çš„ç¬¬ä¸€é¡¹ | æœªé…ç½®æ¨¡åž‹æ—¶çš„å›žé€€ |
| `get_setup_schema()` | â€” | æœ€å°å€¼ | é€‰æ‹©å™¨å…ƒæ•°æ® + çŽ¯å¢ƒå˜é‡æç¤º |
| `generate(prompt, aspect_ratio, **kwargs)` | âœ… | â€” | å®žé™…è°ƒç”¨ |

## å“åº”æ ¼å¼

`generate()` å¿…é¡»è¿”å›žé€šè¿‡ `success_response()` æˆ– `error_response()` æž„å»ºçš„å­—å…¸ã€‚ä¸¤è€…å‡ä½äºŽ `agent/image_gen_provider.py`ã€‚

**æˆåŠŸï¼š**
```python
success_response(
    image=<url-or-absolute-path>,
    model=<model-id>,
    prompt=<echoed-prompt>,
    aspect_ratio="landscape" | "square" | "portrait",
    provider=<your-provider-name>,
    extra={...},  # optional backend-specific fields
)
```

**é”™è¯¯ï¼š**
```python
error_response(
    error="human-readable message",
    error_type="provider_error" | "invalid_input" | "<exception class name>",
    provider=<your-provider-name>,
    model=<model-id>,
    prompt=<prompt>,
    aspect_ratio=<resolved aspect>,
)
```

å·¥å…·åŒ…è£…å™¨å°†å­—å…¸ JSON åºåˆ—åŒ–åŽä¼ ç»™ LLMã€‚é”™è¯¯ä»¥å·¥å…·ç»“æžœçš„å½¢å¼å‘ˆçŽ°ï¼›LLM å†³å®šå¦‚ä½•å‘ç”¨æˆ·è§£é‡Šã€‚

## å¤„ç† base64 ä¸Ž URL è¾“å‡º

éƒ¨åˆ†åŽç«¯è¿”å›žå›¾åƒ URLï¼ˆfalã€Replicateï¼‰ï¼›å…¶ä»–åŽç«¯è¿”å›ž base64 è½½è·ï¼ˆOpenAI gpt-image-2ï¼‰ã€‚å¯¹äºŽ base64 æƒ…å†µï¼Œä½¿ç”¨ `save_b64_image()` â€” å®ƒå°†æ–‡ä»¶å†™å…¥ `$ZED_HOME/cache/images/<prefix>_<timestamp>_<uuid>.<ext>` å¹¶è¿”å›žç»å¯¹ `Path`ã€‚å°†è¯¥è·¯å¾„ï¼ˆè½¬ä¸º `str`ï¼‰ä½œä¸º `image=` ä¼ å…¥ `success_response()`ã€‚Gateway æŠ•é€’ï¼ˆTelegram å›¾ç‰‡æ°”æ³¡ã€Discord é™„ä»¶ï¼‰åŒæ—¶è¯†åˆ« URL å’Œç»å¯¹è·¯å¾„ã€‚

## ç”¨æˆ·è¦†ç›–

åœ¨ `~/.zed/plugins/image_gen/<name>/` æ”¾ç½®ä¸€ä¸ªç”¨æˆ·æ’ä»¶ï¼Œä½¿å…¶ `name` å±žæ€§ä¸ŽæŸä¸ªå†…ç½®æ’ä»¶ç›¸åŒï¼Œå¹¶é€šè¿‡ `zed plugins enable <name>` å¯ç”¨â€”â€”æ³¨å†Œè¡¨é‡‡ç”¨åŽå†™å…¥ä¼˜å…ˆç­–ç•¥ï¼Œä½ çš„ç‰ˆæœ¬å°†æ›¿æ¢å†…ç½®ç‰ˆæœ¬ã€‚é€‚ç”¨äºŽå°† `openai` æ’ä»¶æŒ‡å‘ç§æœ‰ä»£ç†ï¼Œæˆ–æ›¿æ¢è‡ªå®šä¹‰æ¨¡åž‹ç›®å½•ç­‰åœºæ™¯ã€‚

## æµ‹è¯•

```bash
export ZED_HOME=/tmp/zed-imggen-test
mkdir -p $ZED_HOME/plugins/image_gen/my-backend
# â€¦copy __init__.py + plugin.yaml into that dirâ€¦

export MY_BACKEND_API_KEY=your-test-key
zed plugins enable my-backend

# Pick it as the active provider
echo "image_gen:" >> $ZED_HOME/config.yaml
echo "  provider: my-backend" >> $ZED_HOME/config.yaml

# Exercise it
zed -z "Generate an image of a corgi in a spacesuit"
```

æˆ–äº¤äº’å¼æ“ä½œï¼š`zed tools` â†’ "Image Generation" â†’ é€‰æ‹© `my-backend` â†’ æ ¹æ®æç¤ºè¾“å…¥ API keyã€‚

## å‚è€ƒå®žçŽ°

- **`plugins/image_gen/openai/__init__.py`** â€” gpt-image-2 ä»¥ä½Ž/ä¸­/é«˜ä¸‰ä¸ªæ¡£ä½ä½œä¸ºä¸‰ä¸ªè™šæ‹Ÿæ¨¡åž‹ IDï¼Œå…±äº«åŒä¸€ API æ¨¡åž‹å¹¶ä½¿ç”¨ä¸åŒçš„ `quality` å‚æ•°ã€‚é€‚åˆå‚è€ƒå•ä¸€åŽç«¯ä¸‹çš„åˆ†å±‚æ¨¡åž‹è®¾è®¡ + config.yaml ä¼˜å…ˆçº§é“¾ã€‚
- **`plugins/image_gen/xai/__init__.py`** â€” é€šè¿‡ xAI çš„ Grok Imagineã€‚ä¸åŒçš„å“åº”ç»“æž„ï¼ˆURL è¾“å‡ºï¼Œç›®å½•æ›´ç®€å•ï¼‰ã€‚
- **`plugins/image_gen/openai-codex/__init__.py`** â€” Codex é£Žæ ¼çš„ Responses API å˜ä½“ï¼Œå¤ç”¨ OpenAI SDK å¹¶ä½¿ç”¨ä¸åŒçš„è·¯ç”±åŸºç¡€ URLã€‚

## é€šè¿‡ pip åˆ†å‘

```toml
# pyproject.toml
[project.entry-points."zed_agent.plugins"]
my-backend-imggen = "my_backend_imggen_package"
```

`my_backend_imggen_package` å¿…é¡»æš´éœ²ä¸€ä¸ªé¡¶å±‚ `register` å‡½æ•°ã€‚å®Œæ•´é…ç½®è¯·å‚é˜…é€šç”¨æ’ä»¶æŒ‡å—ä¸­çš„ [é€šè¿‡ pip åˆ†å‘](/guides/build-a-zed-plugin#distribute-via-pip)ã€‚

## ç›¸å…³é¡µé¢

- [å›¾åƒç”Ÿæˆ](/user-guide/features/image-generation) â€” é¢å‘ç”¨æˆ·çš„åŠŸèƒ½æ–‡æ¡£
- [æ’ä»¶æ¦‚è§ˆ](/user-guide/features/plugins) â€” æ‰€æœ‰æ’ä»¶ç±»åž‹ä¸€è§ˆ
- [æž„å»º Zed æ’ä»¶](/guides/build-a-zed-plugin) â€” é€šç”¨å·¥å…·/hook/æ–œæ å‘½ä»¤æŒ‡å—