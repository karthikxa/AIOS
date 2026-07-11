---
title: "Heartmula â€” HeartMuLaï¼šåŸºäºŽæ­Œè¯ä¸Žæ ‡ç­¾çš„ç±» Suno æ­Œæ›²ç”Ÿæˆ"
sidebar_label: "Heartmula"
description: "HeartMuLaï¼šåŸºäºŽæ­Œè¯ä¸Žæ ‡ç­¾çš„ç±» Suno æ­Œæ›²ç”Ÿæˆ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Heartmula

HeartMuLaï¼šåŸºäºŽæ­Œè¯ä¸Žæ ‡ç­¾çš„ç±» Suno æ­Œæ›²ç”Ÿæˆã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/media/heartmula` |
| ç‰ˆæœ¬ | `1.0.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `music`, `audio`, `generation`, `ai`, `heartmula`, `heartcodec`, `lyrics`, `songs` |
| ç›¸å…³ skill | `audiocraft` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# HeartMuLa - å¼€æºéŸ³ä¹ç”Ÿæˆ

## æ¦‚è¿°
HeartMuLa æ˜¯ä¸€ç³»åˆ—å¼€æºéŸ³ä¹åŸºç¡€æ¨¡åž‹ï¼ˆApache-2.0ï¼‰ï¼Œå¯æ ¹æ®æ­Œè¯å’Œæ ‡ç­¾ç”ŸæˆéŸ³ä¹ï¼Œæ”¯æŒå¤šè¯­è¨€ã€‚èƒ½ä»Žæ­Œè¯ä¸Žæ ‡ç­¾ç”Ÿæˆå®Œæ•´æ­Œæ›²ï¼Œæ˜¯å¼€æºé¢†åŸŸä¸­å¯ä¸Ž Suno åª²ç¾Žçš„æ–¹æ¡ˆã€‚åŒ…å«ï¼š
- **HeartMuLa** â€” éŸ³ä¹è¯­è¨€æ¨¡åž‹ï¼ˆ3B/7Bï¼‰ï¼Œä»Žæ­Œè¯ä¸Žæ ‡ç­¾ç”ŸæˆéŸ³ä¹
- **HeartCodec** â€” 12.5Hz éŸ³ä¹ç¼–è§£ç å™¨ï¼Œç”¨äºŽé«˜ä¿çœŸéŸ³é¢‘é‡å»º
- **HeartTranscriptor** â€” åŸºäºŽ Whisper çš„æ­Œè¯è½¬å½•å·¥å…·
- **HeartCLAP** â€” éŸ³é¢‘-æ–‡æœ¬å¯¹é½æ¨¡åž‹

## ä½¿ç”¨åœºæ™¯
- ç”¨æˆ·å¸Œæœ›ä»Žæ–‡æœ¬æè¿°ç”ŸæˆéŸ³ä¹/æ­Œæ›²
- ç”¨æˆ·éœ€è¦å¼€æºçš„ Suno æ›¿ä»£æ–¹æ¡ˆ
- ç”¨æˆ·éœ€è¦æœ¬åœ°/ç¦»çº¿éŸ³ä¹ç”Ÿæˆ
- ç”¨æˆ·è¯¢é—® HeartMuLaã€heartlib æˆ– AI éŸ³ä¹ç”Ÿæˆç›¸å…³å†…å®¹

## ç¡¬ä»¶è¦æ±‚
- **æœ€ä½Žé…ç½®**ï¼š8GB æ˜¾å­˜ï¼Œé…åˆ `--lazy_load true`ï¼ˆæŒ‰éœ€åŠ è½½/å¸è½½æ¨¡åž‹ï¼‰
- **æŽ¨èé…ç½®**ï¼š16GB+ æ˜¾å­˜ï¼Œå¯åœ¨å• GPU ä¸Šæµç•…è¿è¡Œ
- **å¤š GPU**ï¼šä½¿ç”¨ `--mula_device cuda:0 --codec_device cuda:1` å°†æ¨¡åž‹åˆ†å¸ƒåˆ°å¤šå¼  GPU
- 3B æ¨¡åž‹åœ¨ lazy_load æ¨¡å¼ä¸‹å³°å€¼æ˜¾å­˜çº¦ä¸º 6.2GB

## å®‰è£…æ­¥éª¤

### 1. å…‹éš†ä»“åº“
```bash
cd ~/  # æˆ–ç›®æ ‡ç›®å½•
git clone https://github.com/HeartMuLa/heartlib.git
cd heartlib
```

### 2. åˆ›å»ºè™šæ‹ŸçŽ¯å¢ƒï¼ˆéœ€è¦ Python 3.10ï¼‰
```bash
uv venv --python 3.10 .venv
. .venv/bin/activate
uv pip install -e .
```

### 3. ä¿®å¤ä¾èµ–å…¼å®¹æ€§é—®é¢˜

**é‡è¦**ï¼šæˆªè‡³ 2026 å¹´ 2 æœˆï¼Œå›ºå®šçš„ä¾èµ–ç‰ˆæœ¬ä¸Žè¾ƒæ–°çš„åŒ…å­˜åœ¨å†²çªã€‚è¯·åº”ç”¨ä»¥ä¸‹ä¿®å¤ï¼š

```bash
# å‡çº§ datasetsï¼ˆæ—§ç‰ˆæœ¬ä¸Žå½“å‰ pyarrow ä¸å…¼å®¹ï¼‰
uv pip install --upgrade datasets

# å‡çº§ transformersï¼ˆéœ€è¦å…¼å®¹ huggingface-hub 1.xï¼‰
uv pip install --upgrade transformers
```

### 4. ä¿®è¡¥æºä»£ç ï¼ˆtransformers 5.x å¿…é¡»æ‰§è¡Œï¼‰

**è¡¥ä¸ 1 â€” RoPE ç¼“å­˜ä¿®å¤**ï¼Œæ–‡ä»¶ï¼š`src/heartlib/heartmula/modeling_heartmula.py`ï¼š

åœ¨ `HeartMuLa` ç±»çš„ `setup_caches` æ–¹æ³•ä¸­ï¼Œåœ¨ `reset_caches` çš„ try/except å—ä¹‹åŽã€`with device:` å—ä¹‹å‰ï¼Œæ·»åŠ  RoPE é‡æ–°åˆå§‹åŒ–ä»£ç ï¼š

```python
# Re-initialize RoPE caches that were skipped during meta-device loading
from torchtune.models.llama3_1._position_embeddings import Llama3ScaledRoPE
for module in self.modules():
    if isinstance(module, Llama3ScaledRoPE) and not module.is_cache_built:
        module.rope_init()
        module.to(device)
```

**åŽŸå› **ï¼š`from_pretrained` é¦–å…ˆåœ¨ meta è®¾å¤‡ä¸Šåˆ›å»ºæ¨¡åž‹ï¼›`Llama3ScaledRoPE.rope_init()` åœ¨ meta å¼ é‡ä¸Šè·³è¿‡ç¼“å­˜æž„å»ºï¼Œä¸”åœ¨æƒé‡åŠ è½½åˆ°çœŸå®žè®¾å¤‡åŽä¹Ÿä¸ä¼šé‡å»ºã€‚

**è¡¥ä¸ 2 â€” HeartCodec åŠ è½½ä¿®å¤**ï¼Œæ–‡ä»¶ï¼š`src/heartlib/pipelines/music_generation.py`ï¼š

åœ¨æ‰€æœ‰ `HeartCodec.from_pretrained()` è°ƒç”¨ä¸­æ·»åŠ  `ignore_mismatched_sizes=True`ï¼ˆå…± 2 å¤„ï¼š`__init__` ä¸­çš„ eager åŠ è½½å’Œ `codec` å±žæ€§ä¸­çš„ lazy åŠ è½½ï¼‰ã€‚

**åŽŸå› **ï¼šVQ codebook çš„ `initted` buffer åœ¨ checkpoint ä¸­å½¢çŠ¶ä¸º `[1]`ï¼Œè€Œæ¨¡åž‹ä¸­ä¸º `[]`ã€‚æ•°æ®ç›¸åŒï¼Œä»…ä¸ºæ ‡é‡ä¸Ž 0 ç»´å¼ é‡çš„å·®å¼‚ï¼Œå¯å®‰å…¨å¿½ç•¥ã€‚

### 5. ä¸‹è½½æ¨¡åž‹æ£€æŸ¥ç‚¹
```bash
cd heartlib  # é¡¹ç›®æ ¹ç›®å½•
hf download --local-dir './ckpt' 'HeartMuLa/HeartMuLaGen'
hf download --local-dir './ckpt/HeartMuLa-oss-3B' 'HeartMuLa/HeartMuLa-oss-3B-happy-new-year'
hf download --local-dir './ckpt/HeartCodec-oss' 'HeartMuLa/HeartCodec-oss-20260123'
```

ä¸‰ä¸ªæ£€æŸ¥ç‚¹å¯å¹¶è¡Œä¸‹è½½ï¼Œæ€»å¤§å°ä¸ºæ•° GBã€‚

## GPU / CUDA

HeartMuLa é»˜è®¤ä½¿ç”¨ CUDAï¼ˆ`--mula_device cuda --codec_device cuda`ï¼‰ã€‚å¦‚æžœç”¨æˆ·å·²å®‰è£…æ”¯æŒ CUDA çš„ PyTorch å¹¶æ‹¥æœ‰ NVIDIA GPUï¼Œåˆ™æ— éœ€é¢å¤–é…ç½®ã€‚

- å·²å®‰è£…çš„ `torch==2.4.1` å¼€ç®±å³æ”¯æŒ CUDA 12.1
- `torchtune` å¯èƒ½æ˜¾ç¤ºç‰ˆæœ¬ä¸º `0.4.0+cpu` â€” è¿™åªæ˜¯åŒ…å…ƒæ•°æ®ï¼Œå®žé™…ä»é€šè¿‡ PyTorch ä½¿ç”¨ CUDA
- å¦‚éœ€ç¡®è®¤ GPU æ˜¯å¦è¢«ä½¿ç”¨ï¼Œå¯æŸ¥çœ‹è¾“å‡ºä¸­çš„ "CUDA memory" è¡Œï¼ˆä¾‹å¦‚ "CUDA memory before unloading: 6.20 GB"ï¼‰
- **æ²¡æœ‰ GPUï¼Ÿ** å¯ä½¿ç”¨ `--mula_device cpu --codec_device cpu` åœ¨ CPU ä¸Šè¿è¡Œï¼Œä½†ç”Ÿæˆé€Ÿåº¦ä¼š**æžæ…¢**ï¼ˆå•é¦–æ­Œæ›²å¯èƒ½éœ€è¦ 30-60 åˆ†é’Ÿä»¥ä¸Šï¼Œè€Œ GPU çº¦éœ€ 4 åˆ†é’Ÿï¼‰ã€‚CPU æ¨¡å¼è¿˜éœ€è¦å¤§é‡å†…å­˜ï¼ˆ12GB+ ç©ºé—²ï¼‰ã€‚å¦‚æžœç”¨æˆ·æ²¡æœ‰ NVIDIA GPUï¼Œå»ºè®®ä½¿ç”¨äº‘ GPU æœåŠ¡ï¼ˆGoogle Colab å…è´¹ T4ã€Lambda Labs ç­‰ï¼‰æˆ–è®¿é—®åœ¨çº¿ demoï¼šhttps://heartmula.github.io/

## ä½¿ç”¨æ–¹æ³•

### åŸºæœ¬ç”Ÿæˆ
```bash
cd heartlib
. .venv/bin/activate
python ./examples/run_music_generation.py \
  --model_path=./ckpt \
  --version="3B" \
  --lyrics="./assets/lyrics.txt" \
  --tags="./assets/tags.txt" \
  --save_path="./assets/output.mp3" \
  --lazy_load true
```

### è¾“å…¥æ ¼å¼

**æ ‡ç­¾**ï¼ˆé€—å·åˆ†éš”ï¼Œæ— ç©ºæ ¼ï¼‰ï¼š
```
piano,happy,wedding,synthesizer,romantic
```
æˆ–
```
rock,energetic,guitar,drums,male-vocal
```

**æ­Œè¯**ï¼ˆä½¿ç”¨æ–¹æ‹¬å·ç»“æž„æ ‡ç­¾ï¼‰ï¼š
```
[Intro]

[Verse]
Your lyrics here...

[Chorus]
Chorus lyrics...

[Bridge]
Bridge lyrics...

[Outro]
```

### å…³é”®å‚æ•°
| å‚æ•° | é»˜è®¤å€¼ | è¯´æ˜Ž |
|-----------|---------|-------------|
| `--max_audio_length_ms` | 240000 | æœ€å¤§æ—¶é•¿ï¼ˆæ¯«ç§’ï¼Œ240s = 4 åˆ†é’Ÿï¼‰ |
| `--topk` | 50 | Top-k é‡‡æ · |
| `--temperature` | 1.0 | é‡‡æ ·æ¸©åº¦ï¼ˆtemperatureï¼‰ |
| `--cfg_scale` | 1.5 | æ— åˆ†ç±»å™¨å¼•å¯¼ï¼ˆclassifier-free guidanceï¼‰ç¼©æ”¾æ¯”ä¾‹ |
| `--lazy_load` | false | æŒ‰éœ€åŠ è½½/å¸è½½æ¨¡åž‹ï¼ˆèŠ‚çœæ˜¾å­˜ï¼‰ |
| `--mula_dtype` | bfloat16 | HeartMuLa çš„æ•°æ®ç±»åž‹ï¼ˆæŽ¨è bf16ï¼‰ |
| `--codec_dtype` | float32 | HeartCodec çš„æ•°æ®ç±»åž‹ï¼ˆæŽ¨è fp32 ä»¥ä¿è¯è´¨é‡ï¼‰ |

### æ€§èƒ½
- RTFï¼ˆå®žæ—¶çŽ‡ï¼‰â‰ˆ 1.0 â€” ç”Ÿæˆä¸€é¦– 4 åˆ†é’Ÿçš„æ­Œæ›²çº¦éœ€ 4 åˆ†é’Ÿ
- è¾“å‡ºï¼šMP3ï¼Œ48kHz ç«‹ä½“å£°ï¼Œ128kbps

## æ³¨æ„äº‹é¡¹
1. **ä¸è¦å¯¹ HeartCodec ä½¿ç”¨ bf16** â€” ä¼šé™ä½ŽéŸ³é¢‘è´¨é‡ã€‚è¯·ä½¿ç”¨ fp32ï¼ˆé»˜è®¤å€¼ï¼‰ã€‚
2. **æ ‡ç­¾å¯èƒ½è¢«å¿½ç•¥** â€” å·²çŸ¥é—®é¢˜ï¼ˆ#90ï¼‰ã€‚æ­Œè¯å¾€å¾€å ä¸»å¯¼åœ°ä½ï¼›å»ºè®®å°è¯•è°ƒæ•´æ ‡ç­¾é¡ºåºã€‚
3. **macOS ä¸Š Triton ä¸å¯ç”¨** â€” GPU åŠ é€Ÿä»…æ”¯æŒ Linux/CUDAã€‚
4. ä¸Šæ¸¸ issue ä¸­æŠ¥å‘Šäº† **RTX 5080 ä¸å…¼å®¹**é—®é¢˜ã€‚
5. ä¾èµ–ç‰ˆæœ¬å†²çªéœ€è¦æŒ‰ä¸Šè¿°è¯´æ˜Žæ‰‹åŠ¨å‡çº§å¹¶æ‰“è¡¥ä¸ã€‚

## ç›¸å…³é“¾æŽ¥
- ä»“åº“ï¼šhttps://github.com/HeartMuLa/heartlib
- æ¨¡åž‹ï¼šhttps://huggingface.co/HeartMuLa
- è®ºæ–‡ï¼šhttps://arxiv.org/abs/2601.10547
- è®¸å¯è¯ï¼šApache-2.0
