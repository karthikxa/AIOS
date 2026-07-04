---
title: "Llava â€” å¤§åž‹è¯­è¨€ä¸Žè§†è§‰åŠ©æ‰‹"
sidebar_label: "Llava"
description: "å¤§åž‹è¯­è¨€ä¸Žè§†è§‰åŠ©æ‰‹"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Llava

å¤§åž‹è¯­è¨€ä¸Žè§†è§‰åŠ©æ‰‹ã€‚æ”¯æŒè§†è§‰æŒ‡ä»¤å¾®è°ƒï¼ˆinstruction tuningï¼‰å’ŒåŸºäºŽå›¾åƒçš„å¯¹è¯ã€‚å°† CLIP è§†è§‰ç¼–ç å™¨ä¸Ž Vicuna/LLaMA è¯­è¨€æ¨¡åž‹ç›¸ç»“åˆã€‚æ”¯æŒå¤šè½®å›¾åƒå¯¹è¯ã€è§†è§‰é—®ç­”ï¼ˆVQAï¼‰å’ŒæŒ‡ä»¤è·Ÿéšã€‚é€‚ç”¨äºŽè§†è§‰è¯­è¨€èŠå¤©æœºå™¨äººæˆ–å›¾åƒç†è§£ä»»åŠ¡ã€‚æœ€é€‚åˆå¯¹è¯å¼å›¾åƒåˆ†æžã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/llava` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/llava` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `transformers`, `torch`, `pillow` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `LLaVA`, `Vision-Language`, `Multimodal`, `Visual Question Answering`, `Image Chat`, `CLIP`, `Vicuna`, `Conversational AI`, `Instruction Tuning`, `VQA` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# LLaVA - å¤§åž‹è¯­è¨€ä¸Žè§†è§‰åŠ©æ‰‹

ç”¨äºŽå¯¹è¯å¼å›¾åƒç†è§£çš„å¼€æºè§†è§‰è¯­è¨€æ¨¡åž‹ã€‚

## ä½•æ—¶ä½¿ç”¨ LLaVA

**é€‚ç”¨åœºæ™¯ï¼š**
- æž„å»ºè§†è§‰è¯­è¨€èŠå¤©æœºå™¨äºº
- è§†è§‰é—®ç­”ï¼ˆVQAï¼‰
- å›¾åƒæè¿°ä¸Žå­—å¹•ç”Ÿæˆ
- å¤šè½®å›¾åƒå¯¹è¯
- è§†è§‰æŒ‡ä»¤è·Ÿéš
- å«å›¾åƒçš„æ–‡æ¡£ç†è§£

**æŒ‡æ ‡**ï¼š
- **GitHub 23,000+ æ˜Ÿæ ‡**
- GPT-4V çº§åˆ«èƒ½åŠ›ï¼ˆç›®æ ‡ï¼‰
- Apache 2.0 è®¸å¯è¯
- å¤šç§æ¨¡åž‹è§„æ ¼ï¼ˆ7Bâ€“34B å‚æ•°ï¼‰

**æ”¹ç”¨å…¶ä»–æ–¹æ¡ˆçš„æƒ…å†µ**ï¼š
- **GPT-4V**ï¼šè´¨é‡æœ€é«˜ï¼ŒåŸºäºŽ API
- **CLIP**ï¼šç®€å•é›¶æ ·æœ¬åˆ†ç±»
- **BLIP-2**ï¼šæ›´é€‚åˆçº¯å­—å¹•ç”Ÿæˆ
- **Flamingo**ï¼šç ”ç©¶ç”¨é€”ï¼Œéžå¼€æº

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# Clone repository
git clone https://github.com/haotian-liu/LLaVA
cd LLaVA

# Install
pip install -e .
```

### åŸºæœ¬ç”¨æ³•

```python
from llava.model.builder import load_pretrained_model
from llava.mm_utils import get_model_name_from_path, process_images, tokenizer_image_token
from llava.constants import IMAGE_TOKEN_INDEX, DEFAULT_IMAGE_TOKEN
from llava.conversation import conv_templates
from PIL import Image
import torch

# Load model
model_path = "liuhaotian/llava-v1.5-7b"
tokenizer, model, image_processor, context_len = load_pretrained_model(
    model_path=model_path,
    model_base=None,
    model_name=get_model_name_from_path(model_path)
)

# Load image
image = Image.open("image.jpg")
image_tensor = process_images([image], image_processor, model.config)
image_tensor = image_tensor.to(model.device, dtype=torch.float16)

# Create conversation
conv = conv_templates["llava_v1"].copy()
conv.append_message(conv.roles[0], DEFAULT_IMAGE_TOKEN + "\nWhat is in this image?")
conv.append_message(conv.roles[1], None)
prompt = conv.get_prompt()

# Generate response
input_ids = tokenizer_image_token(prompt, tokenizer, IMAGE_TOKEN_INDEX, return_tensors='pt').unsqueeze(0).to(model.device)

with torch.inference_mode():
    output_ids = model.generate(
        input_ids,
        images=image_tensor,
        do_sample=True,
        temperature=0.2,
        max_new_tokens=512
    )

response = tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()
print(response)
```

## å¯ç”¨æ¨¡åž‹

| æ¨¡åž‹ | å‚æ•°é‡ | æ˜¾å­˜ | è´¨é‡ |
|-------|------------|------|---------|
| LLaVA-v1.5-7B | 7B | ~14 GB | è‰¯å¥½ |
| LLaVA-v1.5-13B | 13B | ~28 GB | è¾ƒå¥½ |
| LLaVA-v1.6-34B | 34B | ~70 GB | æœ€ä½³ |

```python
# Load different models
model_7b = "liuhaotian/llava-v1.5-7b"
model_13b = "liuhaotian/llava-v1.5-13b"
model_34b = "liuhaotian/llava-v1.6-34b"

# 4-bit quantization for lower VRAM
load_4bit = True  # Reduces VRAM by ~4Ã—
```

## CLI ç”¨æ³•

```bash
# Single image query
python -m llava.serve.cli \
    --model-path liuhaotian/llava-v1.5-7b \
    --image-file image.jpg \
    --query "What is in this image?"

# Multi-turn conversation
python -m llava.serve.cli \
    --model-path liuhaotian/llava-v1.5-7b \
    --image-file image.jpg
# Then type questions interactively
```

## Web UIï¼ˆGradioï¼‰

```bash
# Launch Gradio interface
python -m llava.serve.gradio_web_server \
    --model-path liuhaotian/llava-v1.5-7b \
    --load-4bit  # Optional: reduce VRAM

# Access at http://localhost:7860
```

## å¤šè½®å¯¹è¯

```python
# Initialize conversation
conv = conv_templates["llava_v1"].copy()

# Turn 1
conv.append_message(conv.roles[0], DEFAULT_IMAGE_TOKEN + "\nWhat is in this image?")
conv.append_message(conv.roles[1], None)
response1 = generate(conv, model, image)  # "A dog playing in a park"

# Turn 2
conv.messages[-1][1] = response1  # Add previous response
conv.append_message(conv.roles[0], "What breed is the dog?")
conv.append_message(conv.roles[1], None)
response2 = generate(conv, model, image)  # "Golden Retriever"

# Turn 3
conv.messages[-1][1] = response2
conv.append_message(conv.roles[0], "What time of day is it?")
conv.append_message(conv.roles[1], None)
response3 = generate(conv, model, image)
```

## å¸¸è§ä»»åŠ¡

### å›¾åƒå­—å¹•ç”Ÿæˆ

```python
question = "Describe this image in detail."
response = ask(model, image, question)
```

### è§†è§‰é—®ç­”

```python
question = "How many people are in the image?"
response = ask(model, image, question)
```

### ç›®æ ‡æ£€æµ‹ï¼ˆæ–‡æœ¬å½¢å¼ï¼‰

```python
question = "List all the objects you can see in this image."
response = ask(model, image, question)
```

### åœºæ™¯ç†è§£

```python
question = "What is happening in this scene?"
response = ask(model, image, question)
```

### æ–‡æ¡£ç†è§£

```python
question = "What is the main topic of this document?"
response = ask(model, document_image, question)
```

## è®­ç»ƒè‡ªå®šä¹‰æ¨¡åž‹

```bash
# Stage 1: Feature alignment (558K image-caption pairs)
bash scripts/v1_5/pretrain.sh

# Stage 2: Visual instruction tuning (150K instruction data)
bash scripts/v1_5/finetune.sh
```

## é‡åŒ–ï¼ˆé™ä½Žæ˜¾å­˜å ç”¨ï¼‰

```python
# 4-bit quantization
tokenizer, model, image_processor, context_len = load_pretrained_model(
    model_path="liuhaotian/llava-v1.5-13b",
    model_base=None,
    model_name=get_model_name_from_path("liuhaotian/llava-v1.5-13b"),
    load_4bit=True  # Reduces VRAM ~4Ã—
)

# 8-bit quantization
load_8bit=True  # Reduces VRAM ~2Ã—
```

## æœ€ä½³å®žè·µ

1. **ä»Ž 7B æ¨¡åž‹å¼€å§‹** â€” è´¨é‡è‰¯å¥½ï¼Œæ˜¾å­˜éœ€æ±‚å¯æŽ§
2. **ä½¿ç”¨ 4-bit é‡åŒ–** â€” æ˜¾è‘—é™ä½Žæ˜¾å­˜å ç”¨
3. **éœ€è¦ GPU** â€” CPU æŽ¨ç†æžæ…¢
4. **æ¸…æ™°çš„ prompt** â€” å…·ä½“é—®é¢˜èƒ½èŽ·å¾—æ›´å¥½çš„ç­”æ¡ˆ
5. **å¤šè½®å¯¹è¯** â€” ä¿æŒå¯¹è¯ä¸Šä¸‹æ–‡
6. **æ¸©åº¦ 0.2â€“0.7** â€” å¹³è¡¡åˆ›é€ æ€§ä¸Žä¸€è‡´æ€§
7. **`max_new_tokens` 512â€“1024** â€” ç”¨äºŽè¯¦ç»†å›žå¤
8. **æ‰¹é‡å¤„ç†** â€” æŒ‰é¡ºåºå¤„ç†å¤šå¼ å›¾åƒ

## æ€§èƒ½

| æ¨¡åž‹ | æ˜¾å­˜ï¼ˆFP16ï¼‰ | æ˜¾å­˜ï¼ˆ4-bitï¼‰ | é€Ÿåº¦ï¼ˆtokens/sï¼‰ |
|-------|-------------|--------------|------------------|
| 7B | ~14 GB | ~4 GB | ~20 |
| 13B | ~28 GB | ~8 GB | ~12 |
| 34B | ~70 GB | ~18 GB | ~5 |

*åœ¨ A100 GPU ä¸Šæµ‹è¯•*

## åŸºå‡†æµ‹è¯•

LLaVA åœ¨ä»¥ä¸‹åŸºå‡†ä¸Šå–å¾—äº†æœ‰ç«žäº‰åŠ›çš„åˆ†æ•°ï¼š
- **VQAv2**ï¼š78.5%
- **GQA**ï¼š62.0%
- **MM-Vet**ï¼š35.4%
- **MMBench**ï¼š64.3%

## å±€é™æ€§

1. **å¹»è§‰** â€” å¯èƒ½æè¿°å›¾åƒä¸­ä¸å­˜åœ¨çš„å†…å®¹
2. **ç©ºé—´æŽ¨ç†** â€” éš¾ä»¥ç²¾ç¡®å®šä½ä½ç½®
3. **å°å­—ä½“æ–‡æœ¬** â€” éš¾ä»¥è¯†åˆ«ç»†å°å­—ä½“
4. **ç›®æ ‡è®¡æ•°** â€” å¯¹å¤§é‡ç›®æ ‡è®¡æ•°ä¸ç²¾ç¡®
5. **æ˜¾å­˜éœ€æ±‚** â€” éœ€è¦é«˜æ€§èƒ½ GPU
6. **æŽ¨ç†é€Ÿåº¦** â€” æ¯” CLIP æ…¢

## ä¸Žæ¡†æž¶é›†æˆ

### LangChain

```python
from langchain.llms.base import LLM

class LLaVALLM(LLM):
    def _call(self, prompt, stop=None):
        # Custom LLaVA inference
        return response

llm = LLaVALLM()
```

### Gradio åº”ç”¨

```python
import gradio as gr

def chat(image, text, history):
    response = ask_llava(model, image, text)
    return response

demo = gr.ChatInterface(
    chat,
    additional_inputs=[gr.Image(type="pil")],
    title="LLaVA Chat"
)
demo.launch()
```

## èµ„æº

- **GitHub**ï¼šhttps://github.com/haotian-liu/LLaVA â­ 23,000+
- **è®ºæ–‡**ï¼šhttps://arxiv.org/abs/2304.08485
- **æ¼”ç¤º**ï¼šhttps://llava.hliu.cc
- **æ¨¡åž‹**ï¼šhttps://huggingface.co/liuhaotian
- **è®¸å¯è¯**ï¼šApache 2.0