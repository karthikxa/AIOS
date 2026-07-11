---
title: "Stable Diffusion å›¾åƒç”Ÿæˆ"
sidebar_label: "Stable Diffusion å›¾åƒç”Ÿæˆ"
description: "é€šè¿‡ HuggingFace Diffusers ä½¿ç”¨ Stable Diffusion æ¨¡åž‹å®žçŽ°æœ€å…ˆè¿›çš„æ–‡æœ¬åˆ°å›¾åƒç”Ÿæˆ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Stable Diffusion å›¾åƒç”Ÿæˆ

é€šè¿‡ HuggingFace Diffusers ä½¿ç”¨ Stable Diffusion æ¨¡åž‹å®žçŽ°æœ€å…ˆè¿›çš„æ–‡æœ¬åˆ°å›¾åƒç”Ÿæˆã€‚é€‚ç”¨äºŽä»Žæ–‡æœ¬ promptï¼ˆæç¤ºè¯ï¼‰ç”Ÿæˆå›¾åƒã€æ‰§è¡Œå›¾åƒåˆ°å›¾åƒè½¬æ¢ã€å›¾åƒä¿®å¤ï¼ˆinpaintingï¼‰ï¼Œæˆ–æž„å»ºè‡ªå®šä¹‰æ‰©æ•£ pipelineã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/stable-diffusion` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/stable-diffusion` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `diffusers>=0.30.0`, `transformers>=4.41.0`, `accelerate>=0.31.0`, `torch>=2.0.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Image Generation`, `Stable Diffusion`, `Diffusers`, `Text-to-Image`, `Multimodal`, `Computer Vision` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Stable Diffusion å›¾åƒç”Ÿæˆ

ä½¿ç”¨ HuggingFace Diffusers åº“é€šè¿‡ Stable Diffusion ç”Ÿæˆå›¾åƒçš„ç»¼åˆæŒ‡å—ã€‚

## ä½•æ—¶ä½¿ç”¨ Stable Diffusion

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ Stable Diffusionï¼š**
- ä»Žæ–‡æœ¬æè¿°ç”Ÿæˆå›¾åƒ
- æ‰§è¡Œå›¾åƒåˆ°å›¾åƒè½¬æ¢ï¼ˆé£Žæ ¼è¿ç§»ã€å¢žå¼ºï¼‰
- Inpaintingï¼ˆå¡«å……é®ç½©åŒºåŸŸï¼‰
- Outpaintingï¼ˆå°†å›¾åƒæ‰©å±•è‡³è¾¹ç•Œä¹‹å¤–ï¼‰
- åˆ›å»ºçŽ°æœ‰å›¾åƒçš„å˜ä½“
- æž„å»ºè‡ªå®šä¹‰å›¾åƒç”Ÿæˆå·¥ä½œæµ

**æ ¸å¿ƒåŠŸèƒ½ï¼š**
- **æ–‡æœ¬åˆ°å›¾åƒ**ï¼šä»Žè‡ªç„¶è¯­è¨€ prompt ç”Ÿæˆå›¾åƒ
- **å›¾åƒåˆ°å›¾åƒ**ï¼šåœ¨æ–‡æœ¬å¼•å¯¼ä¸‹è½¬æ¢çŽ°æœ‰å›¾åƒ
- **Inpainting**ï¼šç”¨ä¸Šä¸‹æ–‡æ„ŸçŸ¥å†…å®¹å¡«å……é®ç½©åŒºåŸŸ
- **ControlNet**ï¼šæ·»åŠ ç©ºé—´æ¡ä»¶æŽ§åˆ¶ï¼ˆè¾¹ç¼˜ã€å§¿æ€ã€æ·±åº¦ï¼‰
- **LoRA æ”¯æŒ**ï¼šé«˜æ•ˆå¾®è°ƒä¸Žé£Žæ ¼é€‚é…
- **å¤šæ¨¡åž‹æ”¯æŒ**ï¼šæ”¯æŒ SD 1.5ã€SDXLã€SD 3.0ã€Flux

**æ”¹ç”¨ä»¥ä¸‹æ›¿ä»£æ–¹æ¡ˆï¼š**
- **DALL-E 3**ï¼šæ— éœ€ GPU çš„ API ç”Ÿæˆ
- **Midjourney**ï¼šè‰ºæœ¯åŒ–ã€é£Žæ ¼åŒ–è¾“å‡º
- **Imagen**ï¼šGoogle Cloud é›†æˆ
- **Leonardo.ai**ï¼šåŸºäºŽ Web çš„åˆ›æ„å·¥ä½œæµ

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
pip install diffusers transformers accelerate torch
pip install xformers  # Optional: memory-efficient attention
```

### åŸºç¡€æ–‡æœ¬åˆ°å›¾åƒ

```python
from diffusers import DiffusionPipeline
import torch

# Load pipeline (auto-detects model type)
pipe = DiffusionPipeline.from_pretrained(
    "stable-diffusion-v1-5/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe.to("cuda")

# Generate image
image = pipe(
    "A serene mountain landscape at sunset, highly detailed",
    num_inference_steps=50,
    guidance_scale=7.5
).images[0]

image.save("output.png")
```

### ä½¿ç”¨ SDXLï¼ˆæ›´é«˜è´¨é‡ï¼‰

```python
from diffusers import AutoPipelineForText2Image
import torch

pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16,
    variant="fp16"
)
pipe.to("cuda")

# Enable memory optimization
pipe.enable_model_cpu_offload()

image = pipe(
    prompt="A futuristic city with flying cars, cinematic lighting",
    height=1024,
    width=1024,
    num_inference_steps=30
).images[0]
```

## æž¶æž„æ¦‚è§ˆ

### ä¸‰æ”¯æŸ±è®¾è®¡

Diffusers å›´ç»•ä¸‰ä¸ªæ ¸å¿ƒç»„ä»¶æž„å»ºï¼š

<!-- ascii-guard-ignore -->
```
Pipeline (orchestration)
â”œâ”€â”€ Model (neural networks)
â”‚   â”œâ”€â”€ UNet / Transformer (noise prediction)
â”‚   â”œâ”€â”€ VAE (latent encoding/decoding)
â”‚   â””â”€â”€ Text Encoder (CLIP/T5)
â””â”€â”€ Scheduler (denoising algorithm)
```
<!-- ascii-guard-ignore-end -->

### Pipeline æŽ¨ç†æµç¨‹

```
Text Prompt â†’ Text Encoder â†’ Text Embeddings
                                    â†“
Random Noise â†’ [Denoising Loop] â† Scheduler
                      â†“
               Predicted Noise
                      â†“
              VAE Decoder â†’ Final Image
```

## æ ¸å¿ƒæ¦‚å¿µ

### Pipeline

Pipeline ç¼–æŽ’å®Œæ•´å·¥ä½œæµï¼š

| Pipeline | ç”¨é€” |
|----------|---------|
| `StableDiffusionPipeline` | æ–‡æœ¬åˆ°å›¾åƒï¼ˆSD 1.x/2.xï¼‰ |
| `StableDiffusionXLPipeline` | æ–‡æœ¬åˆ°å›¾åƒï¼ˆSDXLï¼‰ |
| `StableDiffusion3Pipeline` | æ–‡æœ¬åˆ°å›¾åƒï¼ˆSD 3.0ï¼‰ |
| `FluxPipeline` | æ–‡æœ¬åˆ°å›¾åƒï¼ˆFlux æ¨¡åž‹ï¼‰ |
| `StableDiffusionImg2ImgPipeline` | å›¾åƒåˆ°å›¾åƒ |
| `StableDiffusionInpaintPipeline` | Inpainting |

### Scheduler

Scheduler æŽ§åˆ¶åŽ»å™ªè¿‡ç¨‹ï¼š

| Scheduler | æ­¥æ•° | è´¨é‡ | é€‚ç”¨åœºæ™¯ |
|-----------|-------|---------|----------|
| `EulerDiscreteScheduler` | 20-50 | è‰¯å¥½ | é»˜è®¤é€‰æ‹© |
| `EulerAncestralDiscreteScheduler` | 20-50 | è‰¯å¥½ | æ›´å¤šå˜åŒ– |
| `DPMSolverMultistepScheduler` | 15-25 | ä¼˜ç§€ | å¿«é€Ÿã€é«˜è´¨é‡ |
| `DDIMScheduler` | 50-100 | è‰¯å¥½ | ç¡®å®šæ€§ç”Ÿæˆ |
| `LCMScheduler` | 4-8 | è‰¯å¥½ | æžé€Ÿç”Ÿæˆ |
| `UniPCMultistepScheduler` | 15-25 | ä¼˜ç§€ | å¿«é€Ÿæ”¶æ•› |

### åˆ‡æ¢ Scheduler

```python
from diffusers import DPMSolverMultistepScheduler

# Swap for faster generation
pipe.scheduler = DPMSolverMultistepScheduler.from_config(
    pipe.scheduler.config
)

# Now generate with fewer steps
image = pipe(prompt, num_inference_steps=20).images[0]
```

## ç”Ÿæˆå‚æ•°

### å…³é”®å‚æ•°

| å‚æ•° | é»˜è®¤å€¼ | è¯´æ˜Ž |
|-----------|---------|-------------|
| `prompt` | å¿…å¡« | ç›®æ ‡å›¾åƒçš„æ–‡æœ¬æè¿° |
| `negative_prompt` | None | å›¾åƒä¸­éœ€è¦é¿å…çš„å†…å®¹ |
| `num_inference_steps` | 50 | åŽ»å™ªæ­¥æ•°ï¼ˆè¶Šå¤šè´¨é‡è¶Šå¥½ï¼‰ |
| `guidance_scale` | 7.5 | Prompt éµå¾ªç¨‹åº¦ï¼ˆé€šå¸¸ä¸º 7-12ï¼‰ |
| `height`, `width` | 512/1024 | è¾“å‡ºå°ºå¯¸ï¼ˆ8 çš„å€æ•°ï¼‰ |
| `generator` | None | ç”¨äºŽå¯å¤çŽ°æ€§çš„ Torch generator |
| `num_images_per_prompt` | 1 | æ‰¹é‡å¤§å° |

### å¯å¤çŽ°ç”Ÿæˆ

```python
import torch

generator = torch.Generator(device="cuda").manual_seed(42)

image = pipe(
    prompt="A cat wearing a top hat",
    generator=generator,
    num_inference_steps=50
).images[0]
```

### Negative prompt

```python
image = pipe(
    prompt="Professional photo of a dog in a garden",
    negative_prompt="blurry, low quality, distorted, ugly, bad anatomy",
    guidance_scale=7.5
).images[0]
```

## å›¾åƒåˆ°å›¾åƒ

åœ¨æ–‡æœ¬å¼•å¯¼ä¸‹è½¬æ¢çŽ°æœ‰å›¾åƒï¼š

```python
from diffusers import AutoPipelineForImage2Image
from PIL import Image

pipe = AutoPipelineForImage2Image.from_pretrained(
    "stable-diffusion-v1-5/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

init_image = Image.open("input.jpg").resize((512, 512))

image = pipe(
    prompt="A watercolor painting of the scene",
    image=init_image,
    strength=0.75,  # How much to transform (0-1)
    num_inference_steps=50
).images[0]
```

## Inpainting

å¡«å……é®ç½©åŒºåŸŸï¼š

```python
from diffusers import AutoPipelineForInpainting
from PIL import Image

pipe = AutoPipelineForInpainting.from_pretrained(
    "runwayml/stable-diffusion-inpainting",
    torch_dtype=torch.float16
).to("cuda")

image = Image.open("photo.jpg")
mask = Image.open("mask.png")  # White = inpaint region

result = pipe(
    prompt="A red car parked on the street",
    image=image,
    mask_image=mask,
    num_inference_steps=50
).images[0]
```

## ControlNet

æ·»åŠ ç©ºé—´æ¡ä»¶æŽ§åˆ¶ä»¥å®žçŽ°ç²¾ç¡®æŽ§åˆ¶ï¼š

```python
from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
import torch

# Load ControlNet for edge conditioning
controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/control_v11p_sd15_canny",
    torch_dtype=torch.float16
)

pipe = StableDiffusionControlNetPipeline.from_pretrained(
    "stable-diffusion-v1-5/stable-diffusion-v1-5",
    controlnet=controlnet,
    torch_dtype=torch.float16
).to("cuda")

# Use Canny edge image as control
control_image = get_canny_image(input_image)

image = pipe(
    prompt="A beautiful house in the style of Van Gogh",
    image=control_image,
    num_inference_steps=30
).images[0]
```

### å¯ç”¨çš„ ControlNet

| ControlNet | è¾“å…¥ç±»åž‹ | é€‚ç”¨åœºæ™¯ |
|------------|------------|----------|
| `canny` | è¾¹ç¼˜å›¾ | ä¿ç•™ç»“æž„ |
| `openpose` | å§¿æ€éª¨æž¶ | äººä½“å§¿æ€ |
| `depth` | æ·±åº¦å›¾ | 3D æ„ŸçŸ¥ç”Ÿæˆ |
| `normal` | æ³•çº¿å›¾ | è¡¨é¢ç»†èŠ‚ |
| `mlsd` | çº¿æ®µ | å»ºç­‘çº¿æ¡ |
| `scribble` | ç²—ç•¥è‰å›¾ | è‰å›¾åˆ°å›¾åƒ |

## LoRA é€‚é…å™¨

åŠ è½½å¾®è°ƒé£Žæ ¼é€‚é…å™¨ï¼š

```python
from diffusers import DiffusionPipeline

pipe = DiffusionPipeline.from_pretrained(
    "stable-diffusion-v1-5/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

# Load LoRA weights
pipe.load_lora_weights("path/to/lora", weight_name="style.safetensors")

# Generate with LoRA style
image = pipe("A portrait in the trained style").images[0]

# Adjust LoRA strength
pipe.fuse_lora(lora_scale=0.8)

# Unload LoRA
pipe.unload_lora_weights()
```

### å¤šä¸ª LoRA

```python
# Load multiple LoRAs
pipe.load_lora_weights("lora1", adapter_name="style")
pipe.load_lora_weights("lora2", adapter_name="character")

# Set weights for each
pipe.set_adapters(["style", "character"], adapter_weights=[0.7, 0.5])

image = pipe("A portrait").images[0]
```

## å†…å­˜ä¼˜åŒ–

### å¯ç”¨ CPU å¸è½½

```python
# Model CPU offload - moves models to CPU when not in use
pipe.enable_model_cpu_offload()

# Sequential CPU offload - more aggressive, slower
pipe.enable_sequential_cpu_offload()
```

### Attention åˆ‡ç‰‡

```python
# Reduce memory by computing attention in chunks
pipe.enable_attention_slicing()

# Or specific chunk size
pipe.enable_attention_slicing("max")
```

### xFormers å†…å­˜é«˜æ•ˆ Attention

```python
# Requires xformers package
pipe.enable_xformers_memory_efficient_attention()
```

### å¤§å›¾åƒçš„ VAE åˆ‡ç‰‡

```python
# Decode latents in tiles for large images
pipe.enable_vae_slicing()
pipe.enable_vae_tiling()
```

## æ¨¡åž‹å˜ä½“

### åŠ è½½ä¸åŒç²¾åº¦

```python
# FP16 (recommended for GPU)
pipe = DiffusionPipeline.from_pretrained(
    "model-id",
    torch_dtype=torch.float16,
    variant="fp16"
)

# BF16 (better precision, requires Ampere+ GPU)
pipe = DiffusionPipeline.from_pretrained(
    "model-id",
    torch_dtype=torch.bfloat16
)
```

### åŠ è½½ç‰¹å®šç»„ä»¶

```python
from diffusers import UNet2DConditionModel, AutoencoderKL

# Load custom VAE
vae = AutoencoderKL.from_pretrained("stabilityai/sd-vae-ft-mse")

# Use with pipeline
pipe = DiffusionPipeline.from_pretrained(
    "stable-diffusion-v1-5/stable-diffusion-v1-5",
    vae=vae,
    torch_dtype=torch.float16
)
```

## æ‰¹é‡ç”Ÿæˆ

é«˜æ•ˆç”Ÿæˆå¤šå¼ å›¾åƒï¼š

```python
# Multiple prompts
prompts = [
    "A cat playing piano",
    "A dog reading a book",
    "A bird painting a picture"
]

images = pipe(prompts, num_inference_steps=30).images

# Multiple images per prompt
images = pipe(
    "A beautiful sunset",
    num_images_per_prompt=4,
    num_inference_steps=30
).images
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šé«˜è´¨é‡ç”Ÿæˆ

```python
from diffusers import StableDiffusionXLPipeline, DPMSolverMultistepScheduler
import torch

# 1. Load SDXL with optimizations
pipe = StableDiffusionXLPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16,
    variant="fp16"
)
pipe.to("cuda")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.enable_model_cpu_offload()

# 2. Generate with quality settings
image = pipe(
    prompt="A majestic lion in the savanna, golden hour lighting, 8k, detailed fur",
    negative_prompt="blurry, low quality, cartoon, anime, sketch",
    num_inference_steps=30,
    guidance_scale=7.5,
    height=1024,
    width=1024
).images[0]
```

### å·¥ä½œæµ 2ï¼šå¿«é€ŸåŽŸåž‹éªŒè¯

```python
from diffusers import AutoPipelineForText2Image, LCMScheduler
import torch

# Use LCM for 4-8 step generation
pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16
).to("cuda")

# Load LCM LoRA for fast generation
pipe.load_lora_weights("latent-consistency/lcm-lora-sdxl")
pipe.scheduler = LCMScheduler.from_config(pipe.scheduler.config)
pipe.fuse_lora()

# Generate in ~1 second
image = pipe(
    "A beautiful landscape",
    num_inference_steps=4,
    guidance_scale=1.0
).images[0]
```

## å¸¸è§é—®é¢˜

**CUDA å†…å­˜ä¸è¶³ï¼š**
```python
# Enable memory optimizations
pipe.enable_model_cpu_offload()
pipe.enable_attention_slicing()
pipe.enable_vae_slicing()

# Or use lower precision
pipe = DiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
```

**é»‘è‰²/å™ªå£°å›¾åƒï¼š**
```python
# Check VAE configuration
# Use safety checker bypass if needed
pipe.safety_checker = None

# Ensure proper dtype consistency
pipe = pipe.to(dtype=torch.float16)
```

**ç”Ÿæˆé€Ÿåº¦æ…¢ï¼š**
```python
# Use faster scheduler
from diffusers import DPMSolverMultistepScheduler
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

# Reduce steps
image = pipe(prompt, num_inference_steps=20).images[0]
```

## å‚è€ƒèµ„æ–™

- **[é«˜çº§ç”¨æ³•](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/stable-diffusion/references/advanced-usage.md)** - è‡ªå®šä¹‰ pipelineã€å¾®è°ƒã€éƒ¨ç½²
- **[æ•…éšœæŽ’æŸ¥](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/stable-diffusion/references/troubleshooting.md)** - å¸¸è§é—®é¢˜ä¸Žè§£å†³æ–¹æ¡ˆ

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://huggingface.co/docs/diffusers
- **ä»£ç ä»“åº“**ï¼šhttps://github.com/huggingface/diffusers
- **æ¨¡åž‹ä¸­å¿ƒ**ï¼šhttps://huggingface.co/models?library=diffusers
- **Discord**ï¼šhttps://discord.gg/diffusers
