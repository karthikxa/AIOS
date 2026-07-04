---
title: "Serving Llms Vllm â€” vLLMï¼šé«˜åžåé‡ LLM æœåŠ¡ã€OpenAI APIã€é‡åŒ–"
sidebar_label: "Serving Llms Vllm"
description: "vLLMï¼šé«˜åžåé‡ LLM æœåŠ¡ã€OpenAI APIã€é‡åŒ–"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Serving Llms Vllm

vLLMï¼šé«˜åžåé‡ LLM æœåŠ¡ã€OpenAI APIã€é‡åŒ–ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/mlops/inference/vllm` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `vllm`, `torch`, `transformers` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `vLLM`, `Inference Serving`, `PagedAttention`, `Continuous Batching`, `High Throughput`, `Production`, `OpenAI API`, `Quantization`, `Tensor Parallelism` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# vLLM - é«˜æ€§èƒ½ LLM æœåŠ¡

## é€‚ç”¨åœºæ™¯

åœ¨éƒ¨ç½²ç”Ÿäº§çº§ LLM APIã€ä¼˜åŒ–æŽ¨ç†å»¶è¿Ÿ/åžåé‡ï¼Œæˆ–åœ¨ GPU æ˜¾å­˜æœ‰é™çš„æƒ…å†µä¸‹æœåŠ¡æ¨¡åž‹æ—¶ä½¿ç”¨ã€‚æ”¯æŒ OpenAI å…¼å®¹ç«¯ç‚¹ã€é‡åŒ–ï¼ˆGPTQ/AWQ/FP8ï¼‰ä»¥åŠå¼ é‡å¹¶è¡Œã€‚

## å¿«é€Ÿå¼€å§‹

vLLM é€šè¿‡ PagedAttentionï¼ˆåŸºäºŽå—çš„ KV ç¼“å­˜ï¼‰å’Œ continuous batchingï¼ˆæ··åˆ prefill/decode è¯·æ±‚ï¼‰å®žçŽ°æ¯”æ ‡å‡† transformers é«˜ 24 å€çš„åžåé‡ã€‚

**å®‰è£…**ï¼š
```bash
pip install vllm
```

**åŸºç¡€ç¦»çº¿æŽ¨ç†**ï¼š
```python
from vllm import LLM, SamplingParams

llm = LLM(model="meta-llama/Llama-3-8B-Instruct")
sampling = SamplingParams(temperature=0.7, max_tokens=256)

outputs = llm.generate(["Explain quantum computing"], sampling)
print(outputs[0].outputs[0].text)
```

**OpenAI å…¼å®¹æœåŠ¡å™¨**ï¼š
```bash
vllm serve meta-llama/Llama-3-8B-Instruct

# Query with OpenAI SDK
python -c "
from openai import OpenAI
client = OpenAI(base_url='http://localhost:8000/v1', api_key='EMPTY')
print(client.chat.completions.create(
    model='meta-llama/Llama-3-8B-Instruct',
    messages=[{'role': 'user', 'content': 'Hello!'}]
).choices[0].message.content)
"
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šç”Ÿäº§ API éƒ¨ç½²

å¤åˆ¶æ­¤æ¸…å•å¹¶è·Ÿè¸ªè¿›åº¦ï¼š

```
Deployment Progress:
- [ ] Step 1: Configure server settings
- [ ] Step 2: Test with limited traffic
- [ ] Step 3: Enable monitoring
- [ ] Step 4: Deploy to production
- [ ] Step 5: Verify performance metrics
```

**æ­¥éª¤ 1ï¼šé…ç½®æœåŠ¡å™¨è®¾ç½®**

æ ¹æ®æ¨¡åž‹å¤§å°é€‰æ‹©é…ç½®ï¼š

```bash
# For 7B-13B models on single GPU
vllm serve meta-llama/Llama-3-8B-Instruct \
  --gpu-memory-utilization 0.9 \
  --max-model-len 8192 \
  --port 8000

# For 30B-70B models with tensor parallelism
vllm serve meta-llama/Llama-2-70b-hf \
  --tensor-parallel-size 4 \
  --gpu-memory-utilization 0.9 \
  --quantization awq \
  --port 8000

# For production with caching and metrics
vllm serve meta-llama/Llama-3-8B-Instruct \
  --gpu-memory-utilization 0.9 \
  --enable-prefix-caching \
  --enable-metrics \
  --metrics-port 9090 \
  --port 8000 \
  --host 0.0.0.0
```

**æ­¥éª¤ 2ï¼šä½¿ç”¨æœ‰é™æµé‡æµ‹è¯•**

åœ¨ç”Ÿäº§å‰è¿è¡Œè´Ÿè½½æµ‹è¯•ï¼š

```bash
# Install load testing tool
pip install locust

# Create test_load.py with sample requests
# Run: locust -f test_load.py --host http://localhost:8000
```

éªŒè¯ TTFTï¼ˆé¦– token æ—¶é—´ï¼‰&lt; 500msï¼Œåžåé‡ > 100 req/secã€‚

**æ­¥éª¤ 3ï¼šå¯ç”¨ç›‘æŽ§**

vLLM åœ¨ç«¯å£ 9090 ä¸Šæš´éœ² Prometheus æŒ‡æ ‡ï¼š

```bash
curl http://localhost:9090/metrics | grep vllm
```

éœ€ç›‘æŽ§çš„å…³é”®æŒ‡æ ‡ï¼š
- `vllm:time_to_first_token_seconds` - å»¶è¿Ÿ
- `vllm:num_requests_running` - æ´»è·ƒè¯·æ±‚æ•°
- `vllm:gpu_cache_usage_perc` - KV ç¼“å­˜åˆ©ç”¨çŽ‡

**æ­¥éª¤ 4ï¼šéƒ¨ç½²åˆ°ç”Ÿäº§çŽ¯å¢ƒ**

ä½¿ç”¨ Docker å®žçŽ°ä¸€è‡´æ€§éƒ¨ç½²ï¼š

```bash
# Run vLLM in Docker
docker run --gpus all -p 8000:8000 \
  vllm/vllm-openai:latest \
  --model meta-llama/Llama-3-8B-Instruct \
  --gpu-memory-utilization 0.9 \
  --enable-prefix-caching
```

**æ­¥éª¤ 5ï¼šéªŒè¯æ€§èƒ½æŒ‡æ ‡**

æ£€æŸ¥éƒ¨ç½²æ˜¯å¦è¾¾åˆ°ç›®æ ‡ï¼š
- TTFT &lt; 500msï¼ˆçŸ­ prompt æƒ…å†µä¸‹ï¼‰
- åžåé‡ > ç›®æ ‡ req/sec
- GPU åˆ©ç”¨çŽ‡ > 80%
- æ—¥å¿—ä¸­æ—  OOM é”™è¯¯

### å·¥ä½œæµ 2ï¼šç¦»çº¿æ‰¹é‡æŽ¨ç†

ç”¨äºŽå¤„ç†å¤§åž‹æ•°æ®é›†ï¼Œæ— éœ€æœåŠ¡å™¨å¼€é”€ã€‚

å¤åˆ¶æ­¤æ¸…å•ï¼š

```
Batch Processing:
- [ ] Step 1: Prepare input data
- [ ] Step 2: Configure LLM engine
- [ ] Step 3: Run batch inference
- [ ] Step 4: Process results
```

**æ­¥éª¤ 1ï¼šå‡†å¤‡è¾“å…¥æ•°æ®**

```python
# Load prompts from file
prompts = []
with open("prompts.txt") as f:
    prompts = [line.strip() for line in f]

print(f"Loaded {len(prompts)} prompts")
```

**æ­¥éª¤ 2ï¼šé…ç½® LLM å¼•æ“Ž**

```python
from vllm import LLM, SamplingParams

llm = LLM(
    model="meta-llama/Llama-3-8B-Instruct",
    tensor_parallel_size=2,  # Use 2 GPUs
    gpu_memory_utilization=0.9,
    max_model_len=4096
)

sampling = SamplingParams(
    temperature=0.7,
    top_p=0.95,
    max_tokens=512,
    stop=["</s>", "\n\n"]
)
```

**æ­¥éª¤ 3ï¼šè¿è¡Œæ‰¹é‡æŽ¨ç†**

vLLM è‡ªåŠ¨å¯¹è¯·æ±‚è¿›è¡Œæ‰¹å¤„ç†ä»¥æå‡æ•ˆçŽ‡ï¼š

```python
# Process all prompts in one call
outputs = llm.generate(prompts, sampling)

# vLLM handles batching internally
# No need to manually chunk prompts
```

**æ­¥éª¤ 4ï¼šå¤„ç†ç»“æžœ**

```python
# Extract generated text
results = []
for output in outputs:
    prompt = output.prompt
    generated = output.outputs[0].text
    results.append({
        "prompt": prompt,
        "generated": generated,
        "tokens": len(output.outputs[0].token_ids)
    })

# Save to file
import json
with open("results.jsonl", "w") as f:
    for result in results:
        f.write(json.dumps(result) + "\n")

print(f"Processed {len(results)} prompts")
```

### å·¥ä½œæµ 3ï¼šé‡åŒ–æ¨¡åž‹æœåŠ¡

åœ¨æœ‰é™ GPU æ˜¾å­˜ä¸­è¿è¡Œå¤§åž‹æ¨¡åž‹ã€‚

```
Quantization Setup:
- [ ] Step 1: Choose quantization method
- [ ] Step 2: Find or create quantized model
- [ ] Step 3: Launch with quantization flag
- [ ] Step 4: Verify accuracy
```

**æ­¥éª¤ 1ï¼šé€‰æ‹©é‡åŒ–æ–¹æ³•**

- **AWQ**ï¼šæœ€é€‚åˆ 70B æ¨¡åž‹ï¼Œç²¾åº¦æŸå¤±æžå°
- **GPTQ**ï¼šæ¨¡åž‹æ”¯æŒèŒƒå›´å¹¿ï¼ŒåŽ‹ç¼©æ•ˆæžœå¥½
- **FP8**ï¼šåœ¨ H100 GPU ä¸Šé€Ÿåº¦æœ€å¿«

**æ­¥éª¤ 2ï¼šæŸ¥æ‰¾æˆ–åˆ›å»ºé‡åŒ–æ¨¡åž‹**

ä½¿ç”¨ HuggingFace ä¸Šçš„é¢„é‡åŒ–æ¨¡åž‹ï¼š

```bash
# Search for AWQ models
# Example: TheBloke/Llama-2-70B-AWQ
```

**æ­¥éª¤ 3ï¼šä½¿ç”¨é‡åŒ–æ ‡å¿—å¯åŠ¨**

```bash
# Using pre-quantized model
vllm serve TheBloke/Llama-2-70B-AWQ \
  --quantization awq \
  --tensor-parallel-size 1 \
  --gpu-memory-utilization 0.95

# Results: 70B model in ~40GB VRAM
```

**æ­¥éª¤ 4ï¼šéªŒè¯ç²¾åº¦**

æµ‹è¯•è¾“å‡ºæ˜¯å¦ç¬¦åˆé¢„æœŸè´¨é‡ï¼š

```python
# Compare quantized vs non-quantized responses
# Verify task-specific performance unchanged
```

## ä¸Žæ›¿ä»£æ–¹æ¡ˆçš„å¯¹æ¯”

**ä½¿ç”¨ vLLM çš„åœºæ™¯ï¼š**
- éƒ¨ç½²ç”Ÿäº§çº§ LLM APIï¼ˆ100+ req/secï¼‰
- æä¾› OpenAI å…¼å®¹ç«¯ç‚¹
- GPU æ˜¾å­˜æœ‰é™ä½†éœ€è¦è¿è¡Œå¤§åž‹æ¨¡åž‹
- å¤šç”¨æˆ·åº”ç”¨ï¼ˆèŠå¤©æœºå™¨äººã€åŠ©æ‰‹ï¼‰
- éœ€è¦ä½Žå»¶è¿Ÿä¸Žé«˜åžåé‡å¹¶å­˜

**æ”¹ç”¨æ›¿ä»£æ–¹æ¡ˆçš„åœºæ™¯ï¼š**
- **llama.cpp**ï¼šCPU/è¾¹ç¼˜æŽ¨ç†ï¼Œå•ç”¨æˆ·åœºæ™¯
- **HuggingFace transformers**ï¼šç ”ç©¶ã€åŽŸåž‹å¼€å‘ã€ä¸€æ¬¡æ€§ç”Ÿæˆ
- **TensorRT-LLM**ï¼šä»…é™ NVIDIAï¼Œè¿½æ±‚ç»å¯¹æœ€é«˜æ€§èƒ½
- **Text-Generation-Inference**ï¼šå·²åœ¨ HuggingFace ç”Ÿæ€ç³»ç»Ÿä¸­

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šæ¨¡åž‹åŠ è½½æ—¶å†…å­˜ä¸è¶³**

å‡å°‘å†…å­˜ä½¿ç”¨ï¼š
```bash
vllm serve MODEL \
  --gpu-memory-utilization 0.7 \
  --max-model-len 4096
```

æˆ–ä½¿ç”¨é‡åŒ–ï¼š
```bash
vllm serve MODEL --quantization awq
```

**é—®é¢˜ï¼šé¦– token é€Ÿåº¦æ…¢ï¼ˆTTFT > 1 ç§’ï¼‰**

å¯¹é‡å¤ prompt å¯ç”¨å‰ç¼€ç¼“å­˜ï¼š
```bash
vllm serve MODEL --enable-prefix-caching
```

å¯¹é•¿ promptï¼Œå¯ç”¨åˆ†å— prefillï¼š
```bash
vllm serve MODEL --enable-chunked-prefill
```

**é—®é¢˜ï¼šæ¨¡åž‹æœªæ‰¾åˆ°é”™è¯¯**

å¯¹è‡ªå®šä¹‰æ¨¡åž‹ä½¿ç”¨ `--trust-remote-code`ï¼š
```bash
vllm serve MODEL --trust-remote-code
```

**é—®é¢˜ï¼šåžåé‡ä½Žï¼ˆ&lt;50 req/secï¼‰**

å¢žåŠ å¹¶å‘åºåˆ—æ•°ï¼š
```bash
vllm serve MODEL --max-num-seqs 512
```

ä½¿ç”¨ `nvidia-smi` æ£€æŸ¥ GPU åˆ©ç”¨çŽ‡â€”â€”åº”é«˜äºŽ 80%ã€‚

**é—®é¢˜ï¼šæŽ¨ç†é€Ÿåº¦ä½ŽäºŽé¢„æœŸ**

éªŒè¯å¼ é‡å¹¶è¡Œä½¿ç”¨çš„ GPU æ•°é‡ä¸º 2 çš„å¹‚æ¬¡ï¼š
```bash
vllm serve MODEL --tensor-parallel-size 4  # Not 3
```

å¯ç”¨æŽ¨æµ‹è§£ç ä»¥åŠ é€Ÿç”Ÿæˆï¼š
```bash
vllm serve MODEL --speculative-model DRAFT_MODEL
```

## é«˜çº§ä¸»é¢˜

**æœåŠ¡å™¨éƒ¨ç½²æ¨¡å¼**ï¼šå‚è§ [references/server-deployment.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/vllm/references/server-deployment.md)ï¼Œäº†è§£ Dockerã€Kubernetes å’Œè´Ÿè½½å‡è¡¡é…ç½®ã€‚

**æ€§èƒ½ä¼˜åŒ–**ï¼šå‚è§ [references/optimization.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/vllm/references/optimization.md)ï¼Œäº†è§£ PagedAttention è°ƒä¼˜ã€continuous batching è¯¦æƒ…åŠåŸºå‡†æµ‹è¯•ç»“æžœã€‚

**é‡åŒ–æŒ‡å—**ï¼šå‚è§ [references/quantization.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/vllm/references/quantization.md)ï¼Œäº†è§£ AWQ/GPTQ/FP8 é…ç½®ã€æ¨¡åž‹å‡†å¤‡åŠç²¾åº¦å¯¹æ¯”ã€‚

**æ•…éšœæŽ’æŸ¥**ï¼šå‚è§ [references/troubleshooting.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/vllm/references/troubleshooting.md)ï¼Œäº†è§£è¯¦ç»†é”™è¯¯ä¿¡æ¯ã€è°ƒè¯•æ­¥éª¤åŠæ€§èƒ½è¯Šæ–­ã€‚

## ç¡¬ä»¶è¦æ±‚

- **å°åž‹æ¨¡åž‹ï¼ˆ7B-13Bï¼‰**ï¼š1x A10ï¼ˆ24GBï¼‰æˆ– A100ï¼ˆ40GBï¼‰
- **ä¸­åž‹æ¨¡åž‹ï¼ˆ30B-40Bï¼‰**ï¼š2x A100ï¼ˆ40GBï¼‰ï¼Œä½¿ç”¨å¼ é‡å¹¶è¡Œ
- **å¤§åž‹æ¨¡åž‹ï¼ˆ70B+ï¼‰**ï¼š4x A100ï¼ˆ40GBï¼‰æˆ– 2x A100ï¼ˆ80GBï¼‰ï¼Œä½¿ç”¨ AWQ/GPTQ

æ”¯æŒå¹³å°ï¼šNVIDIAï¼ˆä¸»è¦ï¼‰ã€AMD ROCmã€Intel GPUã€TPU

## èµ„æº

- å®˜æ–¹æ–‡æ¡£ï¼šhttps://docs.vllm.ai
- GitHubï¼šhttps://github.com/vllm-project/vllm
- è®ºæ–‡ï¼š"Efficient Memory Management for Large Language Model Serving with PagedAttention"ï¼ˆSOSP 2023ï¼‰
- ç¤¾åŒºï¼šhttps://discuss.vllm.ai