---
title: "Llama Cpp â€” llama"
sidebar_label: "Llama Cpp"
description: "llama"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Llama Cpp

llama.cpp æœ¬åœ° GGUF æŽ¨ç† + HF Hub æ¨¡åž‹å‘çŽ°ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/mlops/inference/llama-cpp` |
| ç‰ˆæœ¬ | `2.1.2` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `llama-cpp-python>=0.2.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `llama.cpp`, `GGUF`, `Quantization`, `Hugging Face Hub`, `CPU Inference`, `Apple Silicon`, `Edge Deployment`, `AMD GPUs`, `Intel GPUs`, `NVIDIA`, `URL-first` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# llama.cpp + GGUF

æœ¬ skill ç”¨äºŽæœ¬åœ° GGUF æŽ¨ç†ã€é‡åŒ–ï¼ˆQuantizationï¼‰é€‰æ‹©ï¼Œä»¥åŠ Hugging Face ä»“åº“å‘çŽ°ï¼ˆç”¨äºŽ llama.cppï¼‰ã€‚

## ä½¿ç”¨åœºæ™¯

- åœ¨ CPUã€Apple Siliconã€CUDAã€ROCm æˆ– Intel GPU ä¸Šè¿è¡Œæœ¬åœ°æ¨¡åž‹
- ä¸ºç‰¹å®š Hugging Face ä»“åº“æ‰¾åˆ°åˆé€‚çš„ GGUF æ–‡ä»¶
- ä»Ž Hub æž„å»º `llama-server` æˆ– `llama-cli` å‘½ä»¤
- åœ¨ Hub ä¸Šæœç´¢å·²æ”¯æŒ llama.cpp çš„æ¨¡åž‹
- æžšä¸¾æŸä¸ªä»“åº“ä¸­å¯ç”¨çš„ `.gguf` æ–‡ä»¶åŠå…¶å¤§å°
- æ ¹æ®ç”¨æˆ·çš„ RAM æˆ– VRAM åœ¨ Q4/Q5/Q6/IQ å˜ä½“ä¹‹é—´åšå‡ºé€‰æ‹©

## æ¨¡åž‹å‘çŽ°å·¥ä½œæµ

ä¼˜å…ˆä½¿ç”¨ URL å·¥ä½œæµï¼Œå†è€ƒè™‘ `hf`ã€Python æˆ–è‡ªå®šä¹‰è„šæœ¬ã€‚

1. åœ¨ Hub ä¸Šæœç´¢å€™é€‰ä»“åº“ï¼š
   - åŸºç¡€åœ°å€ï¼š`https://huggingface.co/models?apps=llama.cpp&sort=trending`
   - æ·»åŠ  `search=<term>` ä»¥æœç´¢ç‰¹å®šæ¨¡åž‹ç³»åˆ—
   - å½“ç”¨æˆ·æœ‰å‚æ•°é‡é™åˆ¶æ—¶ï¼Œæ·»åŠ  `num_parameters=min:0,max:24B` æˆ–ç±»ä¼¼å‚æ•°
2. ä½¿ç”¨ llama.cpp æœ¬åœ°åº”ç”¨è§†å›¾æ‰“å¼€ä»“åº“ï¼š
   - `https://huggingface.co/<repo>?local-app=llama.cpp`
3. å½“ local-app ä»£ç ç‰‡æ®µå¯è§æ—¶ï¼Œå°†å…¶ä½œä¸ºæƒå¨æ¥æºï¼š
   - å¤åˆ¶å®Œæ•´çš„ `llama-server` æˆ– `llama-cli` å‘½ä»¤
   - ä¸¥æ ¼æŒ‰ç…§ HF æ˜¾ç¤ºçš„æŽ¨èé‡åŒ–æ ‡ç­¾è¿›è¡ŒæŠ¥å‘Š
4. å°†åŒä¸€ `?local-app=llama.cpp` URL ä½œä¸ºé¡µé¢æ–‡æœ¬æˆ– HTML è¯»å–ï¼Œå¹¶æå– `Hardware compatibility` éƒ¨åˆ†ï¼š
   - ä¼˜å…ˆä½¿ç”¨å…¶ä¸­çš„ç²¾ç¡®é‡åŒ–æ ‡ç­¾å’Œå¤§å°ï¼Œè€Œéžé€šç”¨è¡¨æ ¼
   - ä¿ç•™ä»“åº“ç‰¹æœ‰çš„æ ‡ç­¾ï¼Œå¦‚ `UD-Q4_K_M` æˆ– `IQ4_NL_XL`
   - å¦‚æžœè¯¥éƒ¨åˆ†åœ¨èŽ·å–çš„é¡µé¢æºç ä¸­ä¸å¯è§ï¼Œè¯·è¯´æ˜Žå¹¶å›žé€€åˆ° tree API åŠ é€šç”¨é‡åŒ–æŒ‡å¯¼
5. æŸ¥è¯¢ tree API ä»¥ç¡®è®¤å®žé™…å­˜åœ¨çš„æ–‡ä»¶ï¼š
   - `https://huggingface.co/api/models/<repo>/tree/main?recursive=true`
   - ä¿ç•™ `type` ä¸º `file` ä¸” `path` ä»¥ `.gguf` ç»“å°¾çš„æ¡ç›®
   - ä»¥ `path` å’Œ `size` ä½œä¸ºæ–‡ä»¶åå’Œå­—èŠ‚å¤§å°çš„æƒå¨æ¥æº
   - å°†é‡åŒ–æ£€æŸ¥ç‚¹ä¸Ž `mmproj-*.gguf` æŠ•å½±æ–‡ä»¶åŠ `BF16/` åˆ†ç‰‡æ–‡ä»¶åˆ†å¼€å¤„ç†
   - ä»…å°† `https://huggingface.co/<repo>/tree/main` ä½œä¸ºäººå·¥å¤‡ç”¨æ–¹æ¡ˆ
6. å¦‚æžœ local-app ä»£ç ç‰‡æ®µä¸å¯è§ï¼Œåˆ™ä»Žä»“åº“å’Œæ‰€é€‰é‡åŒ–é‡å»ºå‘½ä»¤ï¼š
   - ç®€å†™é‡åŒ–é€‰æ‹©ï¼š`llama-server -hf <repo>:<QUANT>`
   - ç²¾ç¡®æ–‡ä»¶å¤‡ç”¨ï¼š`llama-server --hf-repo <repo> --hf-file <filename.gguf>`
7. ä»…å½“ä»“åº“æœªæš´éœ² GGUF æ–‡ä»¶æ—¶ï¼Œæ‰å»ºè®®ä»Ž Transformers æƒé‡è¿›è¡Œè½¬æ¢ã€‚

## å¿«é€Ÿå¼€å§‹

### å®‰è£… llama.cpp

```bash
# macOS / Linuxï¼ˆæœ€ç®€æ–¹å¼ï¼‰
brew install llama.cpp
```

```bash
winget install llama.cpp
```

```bash
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build
cmake --build build --config Release
```

### ç›´æŽ¥ä»Ž Hugging Face Hub è¿è¡Œ

```bash
llama-cli -hf bartowski/Llama-3.2-3B-Instruct-GGUF:Q8_0
```

```bash
llama-server -hf bartowski/Llama-3.2-3B-Instruct-GGUF:Q8_0
```

### ä»Ž Hub è¿è¡Œç²¾ç¡®çš„ GGUF æ–‡ä»¶

å½“ tree API æ˜¾ç¤ºè‡ªå®šä¹‰æ–‡ä»¶å‘½åæˆ–ç¼ºå°‘ç²¾ç¡® HF ä»£ç ç‰‡æ®µæ—¶ä½¿ç”¨æ­¤æ–¹å¼ã€‚

```bash
llama-server \
    --hf-repo microsoft/Phi-3-mini-4k-instruct-gguf \
    --hf-file Phi-3-mini-4k-instruct-q4.gguf \
    -c 4096
```

### OpenAI å…¼å®¹æœåŠ¡å™¨æ£€æŸ¥

```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write a limerick about Python exceptions"}
    ]
  }'
```

## Python ç»‘å®šï¼ˆllama-cpp-pythonï¼‰

`pip install llama-cpp-python`ï¼ˆCUDAï¼š`CMAKE_ARGS="-DGGML_CUDA=on" pip install llama-cpp-python --force-reinstall --no-cache-dir`ï¼›Metalï¼š`CMAKE_ARGS="-DGGML_METAL=on" ...`ï¼‰ã€‚

### åŸºç¡€ç”Ÿæˆ

```python
from llama_cpp import Llama

llm = Llama(
    model_path="./model-q4_k_m.gguf",
    n_ctx=4096,
    n_gpu_layers=35,     # 0 ä¸º CPUï¼Œ99 ä¸ºå…¨éƒ¨å¸è½½åˆ° GPU
    n_threads=8,
)

out = llm("What is machine learning?", max_tokens=256, temperature=0.7)
print(out["choices"][0]["text"])
```

### å¯¹è¯ + æµå¼è¾“å‡º

```python
llm = Llama(
    model_path="./model-q4_k_m.gguf",
    n_ctx=4096,
    n_gpu_layers=35,
    chat_format="llama-3",   # æˆ– "chatml"ã€"mistral" ç­‰
)

resp = llm.create_chat_completion(
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is Python?"},
    ],
    max_tokens=256,
)
print(resp["choices"][0]["message"]["content"])

# æµå¼è¾“å‡º
for chunk in llm("Explain quantum computing:", max_tokens=256, stream=True):
    print(chunk["choices"][0]["text"], end="", flush=True)
```

### Embeddingï¼ˆåµŒå…¥å‘é‡ï¼‰

```python
llm = Llama(model_path="./model-q4_k_m.gguf", embedding=True, n_gpu_layers=35)
vec = llm.embed("This is a test sentence.")
print(f"Embedding dimension: {len(vec)}")
```

ä¹Ÿå¯ä»¥ç›´æŽ¥ä»Ž Hub åŠ è½½ GGUFï¼š

```python
llm = Llama.from_pretrained(
    repo_id="bartowski/Llama-3.2-3B-Instruct-GGUF",
    filename="*Q4_K_M.gguf",
    n_gpu_layers=35,
)
```

## é€‰æ‹©é‡åŒ–æ–¹æ¡ˆ

ä¼˜å…ˆå‚è€ƒ Hub é¡µé¢ï¼Œå…¶æ¬¡ä½¿ç”¨é€šç”¨å¯å‘å¼è§„åˆ™ã€‚

- ä¼˜å…ˆä½¿ç”¨ HF æ ‡è®°ä¸ºä¸Žç”¨æˆ·ç¡¬ä»¶é…ç½®å…¼å®¹çš„ç²¾ç¡®é‡åŒ–æ–¹æ¡ˆã€‚
- ä¸€èˆ¬å¯¹è¯åœºæ™¯ï¼Œä»Ž `Q4_K_M` å¼€å§‹ã€‚
- ä»£ç æˆ–æŠ€æœ¯å·¥ä½œï¼Œè‹¥å†…å­˜å…è®¸ï¼Œä¼˜å…ˆé€‰æ‹© `Q5_K_M` æˆ– `Q6_K`ã€‚
- RAM éžå¸¸ç´§å¼ æ—¶ï¼Œä»…åœ¨ç”¨æˆ·æ˜Žç¡®å°†é€‚é…æ€§ç½®äºŽè´¨é‡ä¹‹ä¸Šæ—¶ï¼Œæ‰è€ƒè™‘ `Q3_K_M`ã€`IQ` å˜ä½“æˆ– `Q2` å˜ä½“ã€‚
- å¯¹äºŽå¤šæ¨¡æ€ä»“åº“ï¼Œå•ç‹¬è¯´æ˜Ž `mmproj-*.gguf`ã€‚æŠ•å½±æ–‡ä»¶ä¸æ˜¯ä¸»æ¨¡åž‹æ–‡ä»¶ã€‚
- ä¸è¦è§„èŒƒåŒ–ä»“åº“åŽŸç”Ÿæ ‡ç­¾ã€‚å¦‚æžœé¡µé¢æ˜¾ç¤º `UD-Q4_K_M`ï¼Œå°±æŠ¥å‘Š `UD-Q4_K_M`ã€‚

## ä»Žä»“åº“æå–å¯ç”¨çš„ GGUF æ–‡ä»¶

å½“ç”¨æˆ·è¯¢é—®å­˜åœ¨å“ªäº› GGUF æ—¶ï¼Œè¿”å›žï¼š

- æ–‡ä»¶å
- æ–‡ä»¶å¤§å°
- é‡åŒ–æ ‡ç­¾
- æ˜¯å¦ä¸ºä¸»æ¨¡åž‹æˆ–è¾…åŠ©æŠ•å½±æ–‡ä»¶

é™¤éžè¢«è¦æ±‚ï¼Œå¦åˆ™å¿½ç•¥ï¼š

- README
- BF16 åˆ†ç‰‡æ–‡ä»¶
- imatrix blob æˆ–æ ¡å‡†äº§ç‰©

æ­¤æ­¥éª¤ä½¿ç”¨ tree APIï¼š

- `https://huggingface.co/api/models/<repo>/tree/main?recursive=true`

å¯¹äºŽ `unsloth/Qwen3.6-35B-A3B-GGUF` è¿™æ ·çš„ä»“åº“ï¼Œlocal-app é¡µé¢å¯æ˜¾ç¤º `UD-Q4_K_M`ã€`UD-Q5_K_M`ã€`UD-Q6_K` å’Œ `Q8_0` ç­‰é‡åŒ–æ ‡ç­¾ï¼Œè€Œ tree API åˆ™æš´éœ²ç²¾ç¡®æ–‡ä»¶è·¯å¾„ï¼ˆå¦‚ `Qwen3.6-35B-A3B-UD-Q4_K_M.gguf` å’Œ `Qwen3.6-35B-A3B-Q8_0.gguf`ï¼‰åŠå­—èŠ‚å¤§å°ã€‚ä½¿ç”¨ tree API å°†é‡åŒ–æ ‡ç­¾è½¬æ¢ä¸ºç²¾ç¡®æ–‡ä»¶åã€‚

## æœç´¢æ¨¡å¼

ç›´æŽ¥ä½¿ç”¨ä»¥ä¸‹ URL æ ¼å¼ï¼š

```text
https://huggingface.co/models?apps=llama.cpp&sort=trending
https://huggingface.co/models?search=<term>&apps=llama.cpp&sort=trending
https://huggingface.co/models?search=<term>&apps=llama.cpp&num_parameters=min:0,max:24B&sort=trending
https://huggingface.co/<repo>?local-app=llama.cpp
https://huggingface.co/api/models/<repo>/tree/main?recursive=true
https://huggingface.co/<repo>/tree/main
```

## è¾“å‡ºæ ¼å¼

å›žç­”å‘çŽ°è¯·æ±‚æ—¶ï¼Œä¼˜å…ˆä½¿ç”¨å¦‚ä¸‹ç´§å‡‘ç»“æž„åŒ–ç»“æžœï¼š

```text
Repo: <repo>
Recommended quant from HF: <label> (<size>)
llama-server: <command>
Other GGUFs:
- <filename> - <size>
- <filename> - <size>
Source URLs:
- <local-app URL>
- <tree API URL>
```

## å‚è€ƒèµ„æ–™

- **[hub-discovery.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/llama-cpp/references/hub-discovery.md)** â€” çº¯ URL Hugging Face å·¥ä½œæµã€æœç´¢æ¨¡å¼ã€GGUF æå–åŠå‘½ä»¤é‡å»º
- **[advanced-usage.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/llama-cpp/references/advanced-usage.md)** â€” æŽ¨æµ‹è§£ç ã€æ‰¹é‡æŽ¨ç†ã€è¯­æ³•çº¦æŸç”Ÿæˆã€LoRAã€å¤š GPUã€è‡ªå®šä¹‰æž„å»ºã€åŸºå‡†è„šæœ¬
- **[quantization.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/llama-cpp/references/quantization.md)** â€” é‡åŒ–è´¨é‡æƒè¡¡ã€ä½•æ—¶ä½¿ç”¨ Q4/Q5/Q6/IQã€æ¨¡åž‹å¤§å°ç¼©æ”¾ã€imatrix
- **[server.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/llama-cpp/references/server.md)** â€” ç›´æŽ¥ä»Ž Hub å¯åŠ¨æœåŠ¡å™¨ã€OpenAI API ç«¯ç‚¹ã€Docker éƒ¨ç½²ã€NGINX è´Ÿè½½å‡è¡¡ã€ç›‘æŽ§
- **[optimization.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/llama-cpp/references/optimization.md)** â€” CPU çº¿ç¨‹ã€BLASã€GPU å¸è½½å¯å‘å¼ã€æ‰¹å¤„ç†è°ƒä¼˜ã€åŸºå‡†æµ‹è¯•
- **[troubleshooting.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/inference/llama-cpp/references/troubleshooting.md)** â€” å®‰è£…/è½¬æ¢/é‡åŒ–/æŽ¨ç†/æœåŠ¡å™¨é—®é¢˜ã€Apple Siliconã€è°ƒè¯•

## èµ„æº

- **GitHub**ï¼šhttps://github.com/ggml-org/llama.cpp
- **Hugging Face GGUF + llama.cpp æ–‡æ¡£**ï¼šhttps://huggingface.co/docs/hub/gguf-llamacpp
- **Hugging Face æœ¬åœ°åº”ç”¨æ–‡æ¡£**ï¼šhttps://huggingface.co/docs/hub/main/local-apps
- **Hugging Face æœ¬åœ° Agent æ–‡æ¡£**ï¼šhttps://huggingface.co/docs/hub/agents-local
- **local-app é¡µé¢ç¤ºä¾‹**ï¼šhttps://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF?local-app=llama.cpp
- **tree API ç¤ºä¾‹**ï¼šhttps://huggingface.co/api/models/unsloth/Qwen3.6-35B-A3B-GGUF/tree/main?recursive=true
- **llama.cpp æœç´¢ç¤ºä¾‹**ï¼šhttps://huggingface.co/models?num_parameters=min:0,max:24B&apps=llama.cpp&sort=trending
- **è®¸å¯è¯**ï¼šMIT