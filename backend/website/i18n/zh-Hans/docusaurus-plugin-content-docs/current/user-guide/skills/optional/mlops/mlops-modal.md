---
title: "Modal Serverless Gpu â€” ç”¨äºŽè¿è¡Œ ML å·¥ä½œè´Ÿè½½çš„æ— æœåŠ¡å™¨ GPU äº‘å¹³å°"
sidebar_label: "Modal Serverless Gpu"
description: "ç”¨äºŽè¿è¡Œ ML å·¥ä½œè´Ÿè½½çš„æ— æœåŠ¡å™¨ GPU äº‘å¹³å°"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Modal Serverless Gpu

ç”¨äºŽè¿è¡Œ ML å·¥ä½œè´Ÿè½½çš„æ— æœåŠ¡å™¨ GPU äº‘å¹³å°ã€‚é€‚ç”¨äºŽéœ€è¦æŒ‰éœ€ GPU è®¿é—®è€Œæ— éœ€ç®¡ç†åŸºç¡€è®¾æ–½ã€å°† ML æ¨¡åž‹éƒ¨ç½²ä¸º APIï¼Œæˆ–è¿è¡Œå…·æœ‰è‡ªåŠ¨æ‰©ç¼©å®¹çš„æ‰¹å¤„ç†ä½œä¸šçš„åœºæ™¯ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/modal` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/modal` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `modal>=0.64.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Infrastructure`, `Serverless`, `GPU`, `Cloud`, `Deployment`, `Modal` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Modal Serverless GPU

åœ¨ Modal æ— æœåŠ¡å™¨ GPU äº‘å¹³å°ä¸Šè¿è¡Œ ML å·¥ä½œè´Ÿè½½çš„å®Œæ•´æŒ‡å—ã€‚

## ä½•æ—¶ä½¿ç”¨ Modal

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ Modalï¼š**
- è¿è¡Œ GPU å¯†é›†åž‹ ML å·¥ä½œè´Ÿè½½è€Œæ— éœ€ç®¡ç†åŸºç¡€è®¾æ–½
- å°† ML æ¨¡åž‹éƒ¨ç½²ä¸ºè‡ªåŠ¨æ‰©ç¼©å®¹ API
- è¿è¡Œæ‰¹å¤„ç†ä½œä¸šï¼ˆè®­ç»ƒã€æŽ¨ç†ã€æ•°æ®å¤„ç†ï¼‰
- éœ€è¦æŒ‰ç§’è®¡è´¹çš„ GPU å®šä»·ï¼Œæ— ç©ºé—²æˆæœ¬
- å¿«é€ŸåŽŸåž‹åŒ– ML åº”ç”¨
- è¿è¡Œå®šæ—¶ä½œä¸šï¼ˆç±» cron å·¥ä½œè´Ÿè½½ï¼‰

**ä¸»è¦ç‰¹æ€§ï¼š**
- **æ— æœåŠ¡å™¨ GPU**ï¼šæŒ‰éœ€æä¾› T4ã€L4ã€A10Gã€L40Sã€A100ã€H100ã€H200ã€B200
- **Python åŽŸç”Ÿ**ï¼šç”¨ Python ä»£ç å®šä¹‰åŸºç¡€è®¾æ–½ï¼Œæ— éœ€ YAML
- **è‡ªåŠ¨æ‰©ç¼©å®¹**ï¼šç¼©å®¹è‡³é›¶ï¼Œæˆ–çž¬é—´æ‰©å®¹è‡³ 100+ ä¸ª GPU
- **äºšç§’çº§å†·å¯åŠ¨**ï¼šåŸºäºŽ Rust çš„åŸºç¡€è®¾æ–½ï¼Œå®žçŽ°å¿«é€Ÿå®¹å™¨å¯åŠ¨
- **å®¹å™¨ç¼“å­˜**ï¼šé•œåƒå±‚ç¼“å­˜ï¼Œæ”¯æŒå¿«é€Ÿè¿­ä»£
- **Web ç«¯ç‚¹**ï¼šå°†å‡½æ•°éƒ¨ç½²ä¸º REST APIï¼Œæ”¯æŒé›¶åœæœºæ›´æ–°

**ä»¥ä¸‹æƒ…å†µè¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆï¼š**
- **RunPod**ï¼šé€‚ç”¨äºŽéœ€è¦æŒä¹…çŠ¶æ€çš„é•¿æ—¶é—´è¿è¡Œ pod
- **Lambda Labs**ï¼šé€‚ç”¨äºŽé¢„ç•™ GPU å®žä¾‹
- **SkyPilot**ï¼šé€‚ç”¨äºŽå¤šäº‘ç¼–æŽ’å’Œæˆæœ¬ä¼˜åŒ–
- **Kubernetes**ï¼šé€‚ç”¨äºŽå¤æ‚çš„å¤šæœåŠ¡æž¶æž„

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
pip install modal
modal setup  # Opens browser for authentication
```

### GPU Hello World

```python
import modal

app = modal.App("hello-gpu")

@app.function(gpu="T4")
def gpu_info():
    import subprocess
    return subprocess.run(["nvidia-smi"], capture_output=True, text=True).stdout

@app.local_entrypoint()
def main():
    print(gpu_info.remote())
```

è¿è¡Œï¼š`modal run hello_gpu.py`

### åŸºç¡€æŽ¨ç†ç«¯ç‚¹

```python
import modal

app = modal.App("text-generation")
image = modal.Image.debian_slim().pip_install("transformers", "torch", "accelerate")

@app.cls(gpu="A10G", image=image)
class TextGenerator:
    @modal.enter()
    def load_model(self):
        from transformers import pipeline
        self.pipe = pipeline("text-generation", model="gpt2", device=0)

    @modal.method()
    def generate(self, prompt: str) -> str:
        return self.pipe(prompt, max_length=100)[0]["generated_text"]

@app.local_entrypoint()
def main():
    print(TextGenerator().generate.remote("Hello, world"))
```

## æ ¸å¿ƒæ¦‚å¿µ

### å…³é”®ç»„ä»¶

| ç»„ä»¶ | ç”¨é€” |
|-----------|---------|
| `App` | å‡½æ•°å’Œèµ„æºçš„å®¹å™¨ |
| `Function` | å¸¦è®¡ç®—è§„æ ¼çš„æ— æœåŠ¡å™¨å‡½æ•° |
| `Cls` | å¸¦ç”Ÿå‘½å‘¨æœŸ hook çš„åŸºäºŽç±»çš„å‡½æ•° |
| `Image` | å®¹å™¨é•œåƒå®šä¹‰ |
| `Volume` | ç”¨äºŽæ¨¡åž‹/æ•°æ®çš„æŒä¹…å­˜å‚¨ |
| `Secret` | å®‰å…¨å‡­è¯å­˜å‚¨ |

### æ‰§è¡Œæ¨¡å¼

| å‘½ä»¤ | æè¿° |
|---------|-------------|
| `modal run script.py` | æ‰§è¡ŒåŽé€€å‡º |
| `modal serve script.py` | å¼€å‘æ¨¡å¼ï¼Œæ”¯æŒçƒ­é‡è½½ |
| `modal deploy script.py` | æŒä¹…åŒ–äº‘ç«¯éƒ¨ç½² |

## GPU é…ç½®

### å¯ç”¨ GPU

| GPU | æ˜¾å­˜ | æœ€é€‚ç”¨äºŽ |
|-----|------|----------|
| `T4` | 16GB | ç»æµŽåž‹æŽ¨ç†ã€å°åž‹æ¨¡åž‹ |
| `L4` | 24GB | æŽ¨ç†ï¼ŒAda Lovelace æž¶æž„ |
| `A10G` | 24GB | è®­ç»ƒ/æŽ¨ç†ï¼Œæ¯” T4 å¿« 3.3 å€ |
| `L40S` | 48GB | æŽ¨èç”¨äºŽæŽ¨ç†ï¼ˆæœ€ä½³æ€§ä»·æ¯”ï¼‰ |
| `A100-40GB` | 40GB | å¤§åž‹æ¨¡åž‹è®­ç»ƒ |
| `A100-80GB` | 80GB | è¶…å¤§åž‹æ¨¡åž‹ |
| `H100` | 80GB | æœ€å¿«ï¼Œæ”¯æŒ FP8 + Transformer Engine |
| `H200` | 141GB | ä»Ž H100 è‡ªåŠ¨å‡çº§ï¼Œ4.8TB/s å¸¦å®½ |
| `B200` | æœ€æ–° | Blackwell æž¶æž„ |

### GPU è§„æ ¼é…ç½®æ¨¡å¼

```python
# Single GPU
@app.function(gpu="A100")

# Specific memory variant
@app.function(gpu="A100-80GB")

# Multiple GPUs (up to 8)
@app.function(gpu="H100:4")

# GPU with fallbacks
@app.function(gpu=["H100", "A100", "L40S"])

# Any available GPU
@app.function(gpu="any")
```

## å®¹å™¨é•œåƒ

```python
# Basic image with pip
image = modal.Image.debian_slim(python_version="3.11").pip_install(
    "torch==2.1.0", "transformers==4.36.0", "accelerate"
)

# From CUDA base
image = modal.Image.from_registry(
    "nvidia/cuda:12.1.0-cudnn8-devel-ubuntu22.04",
    add_python="3.11"
).pip_install("torch", "transformers")

# With system packages
image = modal.Image.debian_slim().apt_install("git", "ffmpeg").pip_install("whisper")
```

## æŒä¹…å­˜å‚¨

```python
volume = modal.Volume.from_name("model-cache", create_if_missing=True)

@app.function(gpu="A10G", volumes={"/models": volume})
def load_model():
    import os
    model_path = "/models/llama-7b"
    if not os.path.exists(model_path):
        model = download_model()
        model.save_pretrained(model_path)
        volume.commit()  # Persist changes
    return load_from_path(model_path)
```

## Web ç«¯ç‚¹

### FastAPI ç«¯ç‚¹è£…é¥°å™¨

```python
@app.function()
@modal.fastapi_endpoint(method="POST")
def predict(text: str) -> dict:
    return {"result": model.predict(text)}
```

### å®Œæ•´ ASGI åº”ç”¨

```python
from fastapi import FastAPI
web_app = FastAPI()

@web_app.post("/predict")
async def predict(text: str):
    return {"result": await model.predict.remote.aio(text)}

@app.function()
@modal.asgi_app()
def fastapi_app():
    return web_app
```

### Web ç«¯ç‚¹ç±»åž‹

| è£…é¥°å™¨ | ä½¿ç”¨åœºæ™¯ |
|-----------|----------|
| `@modal.fastapi_endpoint()` | ç®€å•å‡½æ•° â†’ API |
| `@modal.asgi_app()` | å®Œæ•´ FastAPI/Starlette åº”ç”¨ |
| `@modal.wsgi_app()` | Django/Flask åº”ç”¨ |
| `@modal.web_server(port)` | ä»»æ„ HTTP æœåŠ¡å™¨ |

## åŠ¨æ€æ‰¹å¤„ç†

```python
@app.function()
@modal.batched(max_batch_size=32, wait_ms=100)
async def batch_predict(inputs: list[str]) -> list[dict]:
    # Inputs automatically batched
    return model.batch_predict(inputs)
```

## å¯†é’¥ç®¡ç†

```bash
# Create secret
modal secret create huggingface HF_TOKEN=hf_xxx
```

```python
@app.function(secrets=[modal.Secret.from_name("huggingface")])
def download_model():
    import os
    token = os.environ["HF_TOKEN"]
```

## å®šæ—¶ä»»åŠ¡

```python
@app.function(schedule=modal.Cron("0 0 * * *"))  # Daily midnight
def daily_job():
    pass

@app.function(schedule=modal.Period(hours=1))
def hourly_job():
    pass
```

## æ€§èƒ½ä¼˜åŒ–

### å†·å¯åŠ¨ç¼“è§£

```python
@app.function(
    container_idle_timeout=300,  # Keep warm 5 min
    allow_concurrent_inputs=10,  # Handle concurrent requests
)
def inference():
    pass
```

### æ¨¡åž‹åŠ è½½æœ€ä½³å®žè·µ

```python
@app.cls(gpu="A100")
class Model:
    @modal.enter()  # Run once at container start
    def load(self):
        self.model = load_model()  # Load during warm-up

    @modal.method()
    def predict(self, x):
        return self.model(x)
```

## å¹¶è¡Œå¤„ç†

```python
@app.function()
def process_item(item):
    return expensive_computation(item)

@app.function()
def run_parallel():
    items = list(range(1000))
    # Fan out to parallel containers
    results = list(process_item.map(items))
    return results
```

## å¸¸ç”¨é…ç½®

```python
@app.function(
    gpu="A100",
    memory=32768,              # 32GB RAM
    cpu=4,                     # 4 CPU cores
    timeout=3600,              # 1 hour max
    container_idle_timeout=120,# Keep warm 2 min
    retries=3,                 # Retry on failure
    concurrency_limit=10,      # Max concurrent containers
)
def my_function():
    pass
```

## è°ƒè¯•

```python
# Test locally
if __name__ == "__main__":
    result = my_function.local()

# View logs
# modal app logs my-app
```

## å¸¸è§é—®é¢˜

| é—®é¢˜ | è§£å†³æ–¹æ¡ˆ |
|-------|----------|
| å†·å¯åŠ¨å»¶è¿Ÿ | å¢žå¤§ `container_idle_timeout`ï¼Œä½¿ç”¨ `@modal.enter()` |
| GPU å†…å­˜æº¢å‡º | ä½¿ç”¨æ›´å¤§ GPUï¼ˆ`A100-80GB`ï¼‰ï¼Œå¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹ |
| é•œåƒæž„å»ºå¤±è´¥ | å›ºå®šä¾èµ–ç‰ˆæœ¬ï¼Œæ£€æŸ¥ CUDA å…¼å®¹æ€§ |
| è¶…æ—¶é”™è¯¯ | å¢žå¤§ `timeout`ï¼Œæ·»åŠ æ£€æŸ¥ç‚¹ |

## å‚è€ƒèµ„æ–™

- **[é«˜çº§ç”¨æ³•](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/modal/references/advanced-usage.md)** - å¤š GPUã€åˆ†å¸ƒå¼è®­ç»ƒã€æˆæœ¬ä¼˜åŒ–
- **[æ•…éšœæŽ’æŸ¥](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/modal/references/troubleshooting.md)** - å¸¸è§é—®é¢˜ä¸Žè§£å†³æ–¹æ¡ˆ

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://modal.com/docs
- **ç¤ºä¾‹**ï¼šhttps://github.com/modal-labs/modal-examples
- **å®šä»·**ï¼šhttps://modal.com/pricing
- **Discord**ï¼šhttps://discord.gg/modal
