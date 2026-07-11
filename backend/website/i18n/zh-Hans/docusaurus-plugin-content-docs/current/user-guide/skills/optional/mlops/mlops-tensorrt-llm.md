---
title: "Tensorrt Llm â€” ä½¿ç”¨ NVIDIA TensorRT ä¼˜åŒ– LLM æŽ¨ç†ä»¥å®žçŽ°æœ€å¤§åžåé‡å’Œæœ€ä½Žå»¶è¿Ÿ"
sidebar_label: "Tensorrt Llm"
description: "ä½¿ç”¨ NVIDIA TensorRT ä¼˜åŒ– LLM æŽ¨ç†ä»¥å®žçŽ°æœ€å¤§åžåé‡å’Œæœ€ä½Žå»¶è¿Ÿ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Tensorrt Llm

ä½¿ç”¨ NVIDIA TensorRT ä¼˜åŒ– LLM æŽ¨ç†ï¼Œå®žçŽ°æœ€å¤§åžåé‡å’Œæœ€ä½Žå»¶è¿Ÿã€‚é€‚ç”¨äºŽåœ¨ NVIDIA GPUï¼ˆA100/H100ï¼‰ä¸Šè¿›è¡Œç”Ÿäº§éƒ¨ç½²ã€éœ€è¦æ¯” PyTorch å¿« 10-100 å€çš„æŽ¨ç†é€Ÿåº¦ï¼Œæˆ–éœ€è¦ä½¿ç”¨é‡åŒ–ï¼ˆFP8/INT4ï¼‰ã€in-flight batchingï¼ˆåŠ¨æ€æ‰¹å¤„ç†ï¼‰å’Œå¤š GPU æ‰©å±•æ¥æœåŠ¡æ¨¡åž‹çš„åœºæ™¯ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/tensorrt-llm` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/tensorrt-llm` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `tensorrt-llm`, `torch` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Inference Serving`, `TensorRT-LLM`, `NVIDIA`, `Inference Optimization`, `High Throughput`, `Low Latency`, `Production`, `FP8`, `INT4`, `In-Flight Batching`, `Multi-GPU` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# TensorRT-LLM

NVIDIA çš„å¼€æºåº“ï¼Œç”¨äºŽåœ¨ NVIDIA GPU ä¸Šä»¥æœ€å…ˆè¿›çš„æ€§èƒ½ä¼˜åŒ– LLM æŽ¨ç†ã€‚

## ä½•æ—¶ä½¿ç”¨ TensorRT-LLM

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ TensorRT-LLMï¼š**
- åœ¨ NVIDIA GPUï¼ˆA100ã€H100ã€GB200ï¼‰ä¸Šéƒ¨ç½²
- éœ€è¦æœ€å¤§åžåé‡ï¼ˆLlama 3 ä¸Š 24,000+ tokens/secï¼‰
- å®žæ—¶åº”ç”¨éœ€è¦ä½Žå»¶è¿Ÿ
- ä½¿ç”¨é‡åŒ–æ¨¡åž‹ï¼ˆFP8ã€INT4ã€FP4ï¼‰
- è·¨å¤šä¸ª GPU æˆ–èŠ‚ç‚¹æ‰©å±•

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹æ”¹ç”¨ vLLMï¼š**
- éœ€è¦æ›´ç®€å•çš„è®¾ç½®å’Œ Python ä¼˜å…ˆçš„ API
- å¸Œæœ›ä½¿ç”¨ PagedAttention è€Œæ— éœ€ TensorRT ç¼–è¯‘
- ä½¿ç”¨ AMD GPU æˆ–éž NVIDIA ç¡¬ä»¶

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹æ”¹ç”¨ llama.cppï¼š**
- åœ¨ CPU æˆ– Apple Silicon ä¸Šéƒ¨ç½²
- éœ€è¦æ—  NVIDIA GPU çš„è¾¹ç¼˜éƒ¨ç½²
- å¸Œæœ›ä½¿ç”¨æ›´ç®€å•çš„ GGUF é‡åŒ–æ ¼å¼

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# Dockerï¼ˆæŽ¨èï¼‰
docker pull nvidia/tensorrt_llm:latest

# pip å®‰è£…
pip install tensorrt_llm==1.2.0rc3

# éœ€è¦ CUDA 13.0.0ã€TensorRT 10.13.2ã€Python 3.10-3.12
```

### åŸºæœ¬æŽ¨ç†

```python
from tensorrt_llm import LLM, SamplingParams

# åˆå§‹åŒ–æ¨¡åž‹
llm = LLM(model="meta-llama/Meta-Llama-3-8B")

# é…ç½®é‡‡æ ·å‚æ•°
sampling_params = SamplingParams(
    max_tokens=100,
    temperature=0.7,
    top_p=0.9
)

# ç”Ÿæˆ
prompts = ["Explain quantum computing"]
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(output.text)
```

### ä½¿ç”¨ trtllm-serve æä¾›æœåŠ¡

```bash
# å¯åŠ¨æœåŠ¡å™¨ï¼ˆè‡ªåŠ¨ä¸‹è½½å’Œç¼–è¯‘æ¨¡åž‹ï¼‰
trtllm-serve meta-llama/Meta-Llama-3-8B \
    --tp_size 4 \              # å¼ é‡å¹¶è¡Œï¼ˆ4 ä¸ª GPUï¼‰
    --max_batch_size 256 \
    --max_num_tokens 4096

# å®¢æˆ·ç«¯è¯·æ±‚
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Meta-Llama-3-8B",
    "messages": [{"role": "user", "content": "Hello!"}],
    "temperature": 0.7,
    "max_tokens": 100
  }'
```

## æ ¸å¿ƒç‰¹æ€§

### æ€§èƒ½ä¼˜åŒ–
- **In-flight batching**ï¼šç”Ÿæˆè¿‡ç¨‹ä¸­çš„åŠ¨æ€æ‰¹å¤„ç†
- **Paged KV cache**ï¼šé«˜æ•ˆå†…å­˜ç®¡ç†
- **Flash Attention**ï¼šä¼˜åŒ–çš„æ³¨æ„åŠ›è®¡ç®—æ ¸
- **é‡åŒ–**ï¼šFP8ã€INT4ã€FP4ï¼ŒæŽ¨ç†é€Ÿåº¦æå‡ 2-4 å€
- **CUDA graphs**ï¼šé™ä½Žå†…æ ¸å¯åŠ¨å¼€é”€

### å¹¶è¡ŒåŒ–
- **å¼ é‡å¹¶è¡Œï¼ˆTPï¼‰**ï¼šè·¨ GPU æ‹†åˆ†æ¨¡åž‹
- **æµæ°´çº¿å¹¶è¡Œï¼ˆPPï¼‰**ï¼šæŒ‰å±‚åˆ†å¸ƒ
- **ä¸“å®¶å¹¶è¡Œ**ï¼šç”¨äºŽæ··åˆä¸“å®¶ï¼ˆMixture-of-Expertsï¼‰æ¨¡åž‹
- **å¤šèŠ‚ç‚¹**ï¼šæ‰©å±•è‡³å•æœºä»¥å¤–

### é«˜çº§ç‰¹æ€§
- **æŽ¨æµ‹è§£ç ï¼ˆSpeculative decodingï¼‰**ï¼šä½¿ç”¨è‰ç¨¿æ¨¡åž‹åŠ é€Ÿç”Ÿæˆ
- **LoRA serving**ï¼šé«˜æ•ˆå¤šé€‚é…å™¨éƒ¨ç½²
- **åˆ†ç¦»å¼æœåŠ¡ï¼ˆDisaggregated servingï¼‰**ï¼šé¢„å¡«å……ä¸Žç”Ÿæˆåˆ†ç¦»

## å¸¸è§æ¨¡å¼

### é‡åŒ–æ¨¡åž‹ï¼ˆFP8ï¼‰

```python
from tensorrt_llm import LLM

# åŠ è½½ FP8 é‡åŒ–æ¨¡åž‹ï¼ˆé€Ÿåº¦æå‡ 2 å€ï¼Œå†…å­˜å‡å°‘ 50%ï¼‰
llm = LLM(
    model="meta-llama/Meta-Llama-3-70B",
    dtype="fp8",
    max_num_tokens=8192
)

# æŽ¨ç†æ–¹å¼ä¸Žä¹‹å‰ç›¸åŒ
outputs = llm.generate(["Summarize this article..."])
```

### å¤š GPU éƒ¨ç½²

```python
# è·¨ 8 ä¸ª GPU çš„å¼ é‡å¹¶è¡Œ
llm = LLM(
    model="meta-llama/Meta-Llama-3-405B",
    tensor_parallel_size=8,
    dtype="fp8"
)
```

### æ‰¹é‡æŽ¨ç†

```python
# é«˜æ•ˆå¤„ç† 100 ä¸ª prompt
prompts = [f"Question {i}: ..." for i in range(100)]

outputs = llm.generate(
    prompts,
    sampling_params=SamplingParams(max_tokens=200)
)

# è‡ªåŠ¨ in-flight batching ä»¥å®žçŽ°æœ€å¤§åžåé‡
```

## æ€§èƒ½åŸºå‡†

**Meta Llama 3-8B**ï¼ˆH100 GPUï¼‰ï¼š
- åžåé‡ï¼š24,000 tokens/sec
- å»¶è¿Ÿï¼šæ¯ token çº¦ 10ms
- å¯¹æ¯” PyTorchï¼š**å¿« 100 å€**

**Llama 3-70B**ï¼ˆ8Ã— A100 80GBï¼‰ï¼š
- FP8 é‡åŒ–ï¼šæ¯” FP16 å¿« 2 å€
- å†…å­˜ï¼šFP8 å‡å°‘ 50%

## æ”¯æŒçš„æ¨¡åž‹

- **LLaMA ç³»åˆ—**ï¼šLlama 2ã€Llama 3ã€CodeLlama
- **GPT ç³»åˆ—**ï¼šGPT-2ã€GPT-Jã€GPT-NeoX
- **Qwen**ï¼šQwenã€Qwen2ã€QwQ
- **DeepSeek**ï¼šDeepSeek-V2ã€DeepSeek-V3
- **Mixtral**ï¼šMixtral-8x7Bã€Mixtral-8x22B
- **è§†è§‰æ¨¡åž‹**ï¼šLLaVAã€Phi-3-vision
- **100+ æ¨¡åž‹**ï¼Œå¯åœ¨ HuggingFace ä¸ŠèŽ·å–

## å‚è€ƒæ–‡æ¡£

- **[ä¼˜åŒ–æŒ‡å—](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/tensorrt-llm/references/optimization.md)** â€” é‡åŒ–ã€æ‰¹å¤„ç†ã€KV cache è°ƒä¼˜
- **[å¤š GPU é…ç½®](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/tensorrt-llm/references/multi-gpu.md)** â€” å¼ é‡/æµæ°´çº¿å¹¶è¡Œã€å¤šèŠ‚ç‚¹
- **[æœåŠ¡æŒ‡å—](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/tensorrt-llm/references/serving.md)** â€” ç”Ÿäº§éƒ¨ç½²ã€ç›‘æŽ§ã€è‡ªåŠ¨æ‰©ç¼©å®¹

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://nvidia.github.io/TensorRT-LLM/
- **GitHub**ï¼šhttps://github.com/NVIDIA/TensorRT-LLM
- **æ¨¡åž‹**ï¼šhttps://huggingface.co/models?library=tensorrt_llm
