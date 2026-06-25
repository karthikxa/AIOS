---
sidebar_position: 12
title: "è§†é¢‘ç”Ÿæˆ Provider æ’ä»¶"
description: "å¦‚ä½•ä¸º Zed Agent æž„å»ºè§†é¢‘ç”ŸæˆåŽç«¯æ’ä»¶"
---

# æž„å»ºè§†é¢‘ç”Ÿæˆ Provider æ’ä»¶

è§†é¢‘ç”Ÿæˆ provider æ’ä»¶æ³¨å†Œä¸€ä¸ªåŽç«¯ï¼Œç”¨äºŽå¤„ç†æ‰€æœ‰ `video_generate` å·¥å…·è°ƒç”¨ã€‚å†…ç½® providerï¼ˆxAIã€FALï¼‰ä»¥æ’ä»¶å½¢å¼æä¾›ã€‚å°†ç›®å½•æ”¾å…¥ `plugins/video_gen/<name>/` å³å¯æ·»åŠ æ–° provider æˆ–è¦†ç›–å†…ç½® providerã€‚

:::tip
è§†é¢‘ç”Ÿæˆä¸Ž[å›¾åƒç”Ÿæˆ Provider æ’ä»¶](/developer-guide/image-gen-provider-plugin)å‡ ä¹Žä¸€ä¸€å¯¹åº”â€”â€”å¦‚æžœä½ å·²æž„å»ºè¿‡å›¾åƒç”ŸæˆåŽç«¯ï¼Œå¯¹å…¶ç»“æž„åº”å·²äº†ç„¶äºŽèƒ¸ã€‚ä¸»è¦åŒºåˆ«åœ¨äºŽï¼š`capabilities()` æ–¹æ³•ç”¨äºŽå£°æ˜Žæ¨¡æ€ï¼ˆmodalityï¼‰/å®½é«˜æ¯”/æ—¶é•¿ï¼Œä»¥åŠè·¯ç”±çº¦å®šï¼ˆä¼ å…¥ `image_url` åˆ™ä½¿ç”¨å›¾ç”Ÿè§†é¢‘ï¼Œçœç•¥åˆ™ä½¿ç”¨æ–‡ç”Ÿè§†é¢‘â€”â€”provider åœ¨å†…éƒ¨é€‰æ‹©æ­£ç¡®çš„ç«¯ç‚¹ï¼‰ã€‚
:::

## ç»Ÿä¸€æŽ¥å£ï¼ˆä¸€ä¸ªå·¥å…·ï¼Œä¸¤ç§æ¨¡æ€ï¼‰

`video_generate` å·¥å…·é€šè¿‡ä¸€ä¸ªå‚æ•°æš´éœ²ä¸¤ç§æ¨¡æ€ï¼š

- **æ–‡ç”Ÿè§†é¢‘ï¼ˆText-to-videoï¼‰** â€” ä»…ä¼ å…¥ `prompt`ã€‚Provider è·¯ç”±è‡³å…¶æ–‡ç”Ÿè§†é¢‘ç«¯ç‚¹ã€‚
- **å›¾ç”Ÿè§†é¢‘ï¼ˆImage-to-videoï¼‰** â€” åŒæ—¶ä¼ å…¥ `prompt` å’Œ `image_url`ã€‚Provider è·¯ç”±è‡³å…¶å›¾ç”Ÿè§†é¢‘ç«¯ç‚¹ã€‚

ç¼–è¾‘å’Œæ‰©å±•åŠŸèƒ½æœ‰æ„ä¸åœ¨æ”¯æŒèŒƒå›´å†…ã€‚å¤§å¤šæ•°åŽç«¯ä¸æ”¯æŒè¿™äº›åŠŸèƒ½ï¼Œä¸”ä¸ä¸€è‡´æ€§ä¼šè¿«ä½¿ agent çš„å·¥å…·æè¿°ä¸­å‡ºçŽ°é’ˆå¯¹å„åŽç«¯çš„è¯´æ˜Žæ–‡å­—ã€‚

## å‘çŽ°æœºåˆ¶

Zed åœ¨ä¸‰ä¸ªä½ç½®æ‰«æè§†é¢‘ç”ŸæˆåŽç«¯ï¼š

1. **å†…ç½®** â€” `<repo>/plugins/video_gen/<name>/`ï¼ˆé€šè¿‡ `kind: backend` è‡ªåŠ¨åŠ è½½ï¼‰
2. **ç”¨æˆ·** â€” `~/.zed/plugins/video_gen/<name>/`ï¼ˆé€šè¿‡ `plugins.enabled` é€‰æ‹©å¯ç”¨ï¼‰
3. **Pip** â€” å£°æ˜Žäº† `zed_agent.plugins` å…¥å£ç‚¹çš„åŒ…

æ¯ä¸ªæ’ä»¶çš„ `register(ctx)` å‡½æ•°è°ƒç”¨ `ctx.register_video_gen_provider(...)`ã€‚æ´»è·ƒ provider ç”± `config.yaml` ä¸­çš„ `video_gen.provider` æŒ‡å®šï¼›`zed tools` â†’ Video Generation å¼•å¯¼ç”¨æˆ·å®Œæˆé€‰æ‹©ã€‚ä¸Ž `image_generate` ä¸åŒï¼Œæ­¤å¤„æ²¡æœ‰å†…ç½®çš„é—ç•™åŽç«¯â€”â€”æ¯ä¸ª provider éƒ½æ˜¯æ’ä»¶ã€‚

## ç›®å½•ç»“æž„

```
plugins/video_gen/my-backend/
â”œâ”€â”€ __init__.py      # VideoGenProvider å­ç±» + register()
â””â”€â”€ plugin.yaml      # åŒ…å« kind: backend çš„æ¸…å•æ–‡ä»¶
```

## VideoGenProvider ABC

ç»§æ‰¿ `agent.video_gen_provider.VideoGenProvider`ã€‚å¿…é¡»å®žçŽ°ï¼š`name` å±žæ€§å’Œ `generate()` æ–¹æ³•ã€‚

```python
# plugins/video_gen/my-backend/__init__.py
from typing import Any, Dict, List, Optional
import os

from agent.video_gen_provider import (
    VideoGenProvider,
    error_response,
    success_response,
)


class MyVideoGenProvider(VideoGenProvider):
    @property
    def name(self) -> str:
        return "my-backend"

    @property
    def display_name(self) -> str:
        return "My Backend"

    def is_available(self) -> bool:
        return bool(os.environ.get("MY_API_KEY"))

    def list_models(self) -> List[Dict[str, Any]]:
        # Each entry is a model FAMILY â€” a name the user picks once.
        # Your provider's generate() routes within the family based on
        # whether image_url was passed.
        return [
            {
                "id": "fast",
                "display": "Fast",
                "speed": "~30s",
                "strengths": "Cheapest tier",
                "price": "$0.05/s",
                "modalities": ["text", "image"],  # advisory
            },
        ]

    def default_model(self) -> Optional[str]:
        return "fast"

    def capabilities(self) -> Dict[str, Any]:
        return {
            "modalities": ["text", "image"],
            "aspect_ratios": ["16:9", "9:16"],
            "resolutions": ["720p", "1080p"],
            "min_duration": 1,
            "max_duration": 10,
            "supports_audio": False,
            "supports_negative_prompt": True,
            "max_reference_images": 0,
        }

    def get_setup_schema(self) -> Dict[str, Any]:
        return {
            "name": "My Backend",
            "badge": "paid",
            "tag": "Short description shown in `zed tools`",
            "env_vars": [
                {
                    "key": "MY_API_KEY",
                    "prompt": "My Backend API key",
                    "url": "https://mybackend.example.com/keys",
                },
            ],
        }

    def generate(
        self,
        prompt: str,
        *,
        model: Optional[str] = None,
        image_url: Optional[str] = None,
        reference_image_urls: Optional[List[str]] = None,
        duration: Optional[int] = None,
        aspect_ratio: str = "16:9",
        resolution: str = "720p",
        negative_prompt: Optional[str] = None,
        audio: Optional[bool] = None,
        seed: Optional[int] = None,
        **kwargs: Any,  # always ignore unknown kwargs for forward-compat
    ) -> Dict[str, Any]:
        # ROUTE: image_url presence picks the endpoint.
        if image_url:
            endpoint = "my-backend/image-to-video"
            modality_used = "image"
        else:
            endpoint = "my-backend/text-to-video"
            modality_used = "text"

        # ... call your API ...

        return success_response(
            video="https://your-cdn/output.mp4",
            model=model or "fast",
            prompt=prompt,
            modality=modality_used,
            aspect_ratio=aspect_ratio,
            duration=duration or 5,
            provider=self.name,
        )


def register(ctx) -> None:
    ctx.register_video_gen_provider(MyVideoGenProvider())
```

## æ’ä»¶æ¸…å•

```yaml
# plugins/video_gen/my-backend/plugin.yaml
name: my-backend
version: 1.0.0
description: "My video generation backend"
author: Your Name
kind: backend
requires_env:
  - MY_API_KEY
```

## `video_generate` å‚æ•°æ¨¡å¼

è¯¥å·¥å…·åœ¨æ‰€æœ‰åŽç«¯ä¸­ä½¿ç”¨ç»Ÿä¸€çš„å‚æ•°æ¨¡å¼ã€‚Provider å¿½ç•¥å…¶ä¸æ”¯æŒçš„å‚æ•°ã€‚

| å‚æ•° | è¯´æ˜Ž |
|---|---|
| `prompt` | æ–‡æœ¬æŒ‡ä»¤ï¼ˆå¿…å¡«ï¼‰ |
| `image_url` | è®¾ç½®æ—¶ â†’ å›¾ç”Ÿè§†é¢‘ï¼›çœç•¥æ—¶ â†’ æ–‡ç”Ÿè§†é¢‘ |
| `reference_image_urls` | é£Žæ ¼/è§’è‰²å‚è€ƒå›¾ï¼ˆå–å†³äºŽ providerï¼‰ |
| `duration` | ç§’æ•°â€”â€”provider ä¼šè¿›è¡Œæˆªæ–­ |
| `aspect_ratio` | `"16:9"`ã€`"9:16"`ã€`"1:1"` ç­‰â€”â€”provider ä¼šè¿›è¡Œæˆªæ–­ |
| `resolution` | `"480p"` / `"540p"` / `"720p"` / `"1080p"`â€”â€”provider ä¼šè¿›è¡Œæˆªæ–­ |
| `negative_prompt` | éœ€è¦é¿å…çš„å†…å®¹ï¼ˆä»… Pixverse/Kling æ”¯æŒï¼‰ |
| `audio` | åŽŸç”ŸéŸ³é¢‘ï¼ˆVeo3 / Pixverse å®šä»·å±‚çº§ï¼‰ |
| `seed` | å¯å¤çŽ°æ€§ |
| `model` | è¦†ç›–å½“å‰æ´»è·ƒçš„æ¨¡åž‹/ç³»åˆ— |

Provider çš„ `capabilities()` å£°æ˜Žä¸Šè¿°å“ªäº›å‚æ•°ä¼šè¢«å®žé™…å¤„ç†ã€‚Agent åœ¨å·¥å…·æè¿°ä¸­çœ‹åˆ°çš„æ˜¯å½“å‰æ´»è·ƒåŽç«¯çš„èƒ½åŠ›ä¿¡æ¯ï¼Œå½“ç”¨æˆ·é€šè¿‡ `zed tools` åˆ‡æ¢åŽç«¯æ—¶ä¼šåŠ¨æ€é‡å»ºã€‚

## æ¨¡åž‹ç³»åˆ—ä¸Žç«¯ç‚¹è·¯ç”±ï¼ˆFAL æ¨¡å¼ï¼‰

å½“ä½ çš„åŽç«¯æ¯ä¸ª"æ¨¡åž‹"å¯¹åº”å¤šä¸ªç«¯ç‚¹æ—¶â€”â€”ä¾‹å¦‚ FALï¼Œå…¶ä¸­æ¯ä¸ªç³»åˆ—ï¼ˆVeo 3.1ã€Pixverse v6ã€Kling O3ï¼‰éƒ½æœ‰ `/text-to-video` å’Œ `/image-to-video` ä¸¤ä¸ª URLâ€”â€”å°†æ¯ä¸ª**ç³»åˆ—**è¡¨ç¤ºä¸ºä¸€ä¸ªç›®å½•æ¡ç›®ã€‚ä½ çš„ `generate()` æ ¹æ®æ˜¯å¦ä¼ å…¥ `image_url` æ¥é€‰æ‹©æ­£ç¡®çš„ç«¯ç‚¹ï¼š

```python
FAMILIES = {
    "veo3.1": {
        "text_endpoint": "fal-ai/veo3.1",
        "image_endpoint": "fal-ai/veo3.1/image-to-video",
        # ... family-specific capability flags ...
    },
}

def generate(self, prompt, *, image_url=None, model=None, **kwargs):
    family_id, family = _resolve_family(model)
    endpoint = family["image_endpoint"] if image_url else family["text_endpoint"]
    # ... build payload from family's declared capability flags, call endpoint ...
```

ç”¨æˆ·åœ¨ `zed tools` ä¸­åªéœ€é€‰æ‹©ä¸€æ¬¡ `veo3.1`ã€‚Agent æ— éœ€å…³å¿ƒç«¯ç‚¹â€”â€”å®ƒåªè´Ÿè´£ä¼ å…¥ï¼ˆæˆ–ä¸ä¼ å…¥ï¼‰`image_url`ã€‚

## é€‰æ‹©ä¼˜å…ˆçº§

é’ˆå¯¹æ¯ä¸ªå®žä¾‹çš„æ¨¡åž‹é…ç½®ï¼ˆå‚è§ `plugins/video_gen/fal/__init__.py`ï¼‰ï¼š

1. å·¥å…·è°ƒç”¨ä¸­çš„ `model=` å…³é”®å­—å‚æ•°
2. `<PROVIDER>_VIDEO_MODEL` çŽ¯å¢ƒå˜é‡
3. `config.yaml` ä¸­çš„ `video_gen.<provider>.model`
4. `config.yaml` ä¸­çš„ `video_gen.model`ï¼ˆå½“å…¶å€¼ä¸ºä½ çš„æŸä¸ª ID æ—¶ï¼‰
5. Provider çš„ `default_model()`

## å“åº”ç»“æž„

`success_response()` å’Œ `error_response()` ç”Ÿæˆæ¯ä¸ªåŽç«¯è¿”å›žçš„æ ‡å‡† dict ç»“æž„ã€‚è¯·ä½¿ç”¨å®ƒä»¬â€”â€”ä¸è¦æ‰‹åŠ¨æž„é€  dictã€‚

æˆåŠŸå“åº”çš„é”®ï¼š`success`ã€`video`ï¼ˆURL æˆ–ç»å¯¹è·¯å¾„ï¼‰ã€`model`ã€`prompt`ã€`modality`ï¼ˆ`"text"` æˆ– `"image"`ï¼‰ã€`aspect_ratio`ã€`duration`ã€`provider`ï¼Œä»¥åŠ `extra`ã€‚

é”™è¯¯å“åº”çš„é”®ï¼š`success`ã€`video`ï¼ˆNoneï¼‰ã€`error`ã€`error_type`ã€`model`ã€`prompt`ã€`aspect_ratio`ã€`provider`ã€‚

## äº§ç‰©ä¿å­˜ä½ç½®

å¦‚æžœä½ çš„åŽç«¯è¿”å›ž base64 æ•°æ®ï¼Œä½¿ç”¨ `save_b64_video()` å°†å…¶å†™å…¥ `$ZED_HOME/cache/videos/`ã€‚å¯¹äºŽé€šè¿‡åŽç»­ HTTP è¯·æ±‚èŽ·å–çš„åŽŸå§‹å­—èŠ‚ï¼Œä½¿ç”¨ `save_bytes_video()`ã€‚å¦åˆ™ç›´æŽ¥è¿”å›žä¸Šæ¸¸ URLâ€”â€”gateway åœ¨äº¤ä»˜æ—¶ä¼šè§£æžè¿œç¨‹ URLã€‚

## æµ‹è¯•

åœ¨ `tests/plugins/video_gen/test_<name>_plugin.py` ä¸‹æ·»åŠ å†’çƒŸæµ‹è¯•ã€‚xAI å’Œ FAL çš„æµ‹è¯•å±•ç¤ºäº†æ ‡å‡†æ¨¡å¼â€”â€”æ³¨å†Œã€éªŒè¯ç›®å½•ã€åˆ†åˆ«åœ¨ä¼ å…¥å’Œä¸ä¼ å…¥ `image_url` çš„æƒ…å†µä¸‹æµ‹è¯•è·¯ç”±ï¼Œå¹¶æ–­è¨€åœ¨ç¼ºå°‘è®¤è¯æ—¶è¿”å›žå¹²å‡€çš„é”™è¯¯å“åº”ã€‚