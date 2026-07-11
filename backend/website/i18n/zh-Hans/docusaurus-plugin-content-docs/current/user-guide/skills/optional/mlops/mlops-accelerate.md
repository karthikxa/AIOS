---
title: "Huggingface Accelerate â€” æœ€ç®€åˆ†å¸ƒå¼è®­ç»ƒ API"
sidebar_label: "Huggingface Accelerate"
description: "æœ€ç®€åˆ†å¸ƒå¼è®­ç»ƒ API"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Huggingface Accelerate

æœ€ç®€åˆ†å¸ƒå¼è®­ç»ƒ APIã€‚ä»…éœ€ 4 è¡Œä»£ç å³å¯ä¸ºä»»æ„ PyTorch è„šæœ¬æ·»åŠ åˆ†å¸ƒå¼æ”¯æŒã€‚ç»Ÿä¸€çš„ DeepSpeed/FSDP/Megatron/DDP APIã€‚è‡ªåŠ¨è®¾å¤‡æ”¾ç½®ã€æ··åˆç²¾åº¦ï¼ˆFP16/BF16/FP8ï¼‰ã€‚äº¤äº’å¼é…ç½®ï¼Œå•æ¡å¯åŠ¨å‘½ä»¤ã€‚HuggingFace ç”Ÿæ€ç³»ç»Ÿæ ‡å‡†ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/accelerate` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/accelerate` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `accelerate`, `torch`, `transformers` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Distributed Training`, `HuggingFace`, `Accelerate`, `DeepSpeed`, `FSDP`, `Mixed Precision`, `PyTorch`, `DDP`, `Unified API`, `Simple` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# HuggingFace Accelerate - ç»Ÿä¸€åˆ†å¸ƒå¼è®­ç»ƒ

## å¿«é€Ÿå¼€å§‹

Accelerate å°†åˆ†å¸ƒå¼è®­ç»ƒç®€åŒ–ä¸º 4 è¡Œä»£ç ã€‚

**å®‰è£…**ï¼š
```bash
pip install accelerate
```

**è½¬æ¢ PyTorch è„šæœ¬**ï¼ˆ4 è¡Œï¼‰ï¼š
```python
import torch
+ from accelerate import Accelerator

+ accelerator = Accelerator()

  model = torch.nn.Transformer()
  optimizer = torch.optim.Adam(model.parameters())
  dataloader = torch.utils.data.DataLoader(dataset)

+ model, optimizer, dataloader = accelerator.prepare(model, optimizer, dataloader)

  for batch in dataloader:
      optimizer.zero_grad()
      loss = model(batch)
-     loss.backward()
+     accelerator.backward(loss)
      optimizer.step()
```

**è¿è¡Œ**ï¼ˆå•æ¡å‘½ä»¤ï¼‰ï¼š
```bash
accelerate launch train.py
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šä»Žå• GPU åˆ°å¤š GPU

**åŽŸå§‹è„šæœ¬**ï¼š
```python
# train.py
import torch

model = torch.nn.Linear(10, 2).to('cuda')
optimizer = torch.optim.Adam(model.parameters())
dataloader = torch.utils.data.DataLoader(dataset, batch_size=32)

for epoch in range(10):
    for batch in dataloader:
        batch = batch.to('cuda')
        optimizer.zero_grad()
        loss = model(batch).mean()
        loss.backward()
        optimizer.step()
```

**ä½¿ç”¨ Accelerate**ï¼ˆæ–°å¢ž 4 è¡Œï¼‰ï¼š
```python
# train.py
import torch
from accelerate import Accelerator  # +1

accelerator = Accelerator()  # +2

model = torch.nn.Linear(10, 2)
optimizer = torch.optim.Adam(model.parameters())
dataloader = torch.utils.data.DataLoader(dataset, batch_size=32)

model, optimizer, dataloader = accelerator.prepare(model, optimizer, dataloader)  # +3

for epoch in range(10):
    for batch in dataloader:
        # æ— éœ€ .to('cuda') â€” è‡ªåŠ¨å¤„ç†ï¼
        optimizer.zero_grad()
        loss = model(batch).mean()
        accelerator.backward(loss)  # +4
        optimizer.step()
```

**é…ç½®**ï¼ˆäº¤äº’å¼ï¼‰ï¼š
```bash
accelerate config
```

**é—®é¢˜**ï¼š
- ä½¿ç”¨å“ªç§æœºå™¨ï¼Ÿï¼ˆå•/å¤š GPU/TPU/CPUï¼‰
- æœºå™¨æ•°é‡ï¼Ÿï¼ˆ1ï¼‰
- æ··åˆç²¾åº¦ï¼Ÿï¼ˆno/fp16/bf16/fp8ï¼‰
- DeepSpeedï¼Ÿï¼ˆno/yesï¼‰

**å¯åŠ¨**ï¼ˆé€‚ç”¨äºŽä»»æ„é…ç½®ï¼‰ï¼š
```bash
# å• GPU
accelerate launch train.py

# å¤š GPUï¼ˆ8 ä¸ª GPUï¼‰
accelerate launch --multi_gpu --num_processes 8 train.py

# å¤šèŠ‚ç‚¹
accelerate launch --multi_gpu --num_processes 16 \
  --num_machines 2 --machine_rank 0 \
  --main_process_ip $MASTER_ADDR \
  train.py
```

### å·¥ä½œæµ 2ï¼šæ··åˆç²¾åº¦è®­ç»ƒ

**å¯ç”¨ FP16/BF16**ï¼š
```python
from accelerate import Accelerator

# FP16ï¼ˆå¸¦æ¢¯åº¦ç¼©æ”¾ï¼‰
accelerator = Accelerator(mixed_precision='fp16')

# BF16ï¼ˆæ— ç¼©æ”¾ï¼Œæ›´ç¨³å®šï¼‰
accelerator = Accelerator(mixed_precision='bf16')

# FP8ï¼ˆH100+ï¼‰
accelerator = Accelerator(mixed_precision='fp8')

model, optimizer, dataloader = accelerator.prepare(model, optimizer, dataloader)

# å…¶ä½™å‡è‡ªåŠ¨å¤„ç†ï¼
for batch in dataloader:
    with accelerator.autocast():  # å¯é€‰ï¼Œå·²è‡ªåŠ¨å®Œæˆ
        loss = model(batch)
    accelerator.backward(loss)
```

### å·¥ä½œæµ 3ï¼šDeepSpeed ZeRO é›†æˆ

**å¯ç”¨ DeepSpeed ZeRO-2**ï¼š
```python
from accelerate import Accelerator

accelerator = Accelerator(
    mixed_precision='bf16',
    deepspeed_plugin={
        "zero_stage": 2,  # ZeRO-2
        "offload_optimizer": False,
        "gradient_accumulation_steps": 4
    }
)

# ä»£ç ä¸Žä¹‹å‰å®Œå…¨ç›¸åŒï¼
model, optimizer, dataloader = accelerator.prepare(model, optimizer, dataloader)
```

**æˆ–é€šè¿‡é…ç½®**ï¼š
```bash
accelerate config
# é€‰æ‹©ï¼šDeepSpeed â†’ ZeRO-2
```

**deepspeed_config.json**ï¼š
```json
{
    "fp16": {"enabled": false},
    "bf16": {"enabled": true},
    "zero_optimization": {
        "stage": 2,
        "offload_optimizer": {"device": "cpu"},
        "allgather_bucket_size": 5e8,
        "reduce_bucket_size": 5e8
    }
}
```

**å¯åŠ¨**ï¼š
```bash
accelerate launch --config_file deepspeed_config.json train.py
```

### å·¥ä½œæµ 4ï¼šFSDPï¼ˆå…¨åˆ†ç‰‡æ•°æ®å¹¶è¡Œï¼‰

**å¯ç”¨ FSDP**ï¼š
```python
from accelerate import Accelerator, FullyShardedDataParallelPlugin

fsdp_plugin = FullyShardedDataParallelPlugin(
    sharding_strategy="FULL_SHARD",  # ç­‰ä»·äºŽ ZeRO-3
    auto_wrap_policy="TRANSFORMER_AUTO_WRAP",
    cpu_offload=False
)

accelerator = Accelerator(
    mixed_precision='bf16',
    fsdp_plugin=fsdp_plugin
)

model, optimizer, dataloader = accelerator.prepare(model, optimizer, dataloader)
```

**æˆ–é€šè¿‡é…ç½®**ï¼š
```bash
accelerate config
# é€‰æ‹©ï¼šFSDP â†’ Full Shard â†’ No CPU Offload
```

### å·¥ä½œæµ 5ï¼šæ¢¯åº¦ç´¯ç§¯

**ç´¯ç§¯æ¢¯åº¦**ï¼š
```python
from accelerate import Accelerator

accelerator = Accelerator(gradient_accumulation_steps=4)

model, optimizer, dataloader = accelerator.prepare(model, optimizer, dataloader)

for batch in dataloader:
    with accelerator.accumulate(model):  # è‡ªåŠ¨å¤„ç†ç´¯ç§¯
        optimizer.zero_grad()
        loss = model(batch)
        accelerator.backward(loss)
        optimizer.step()
```

**æœ‰æ•ˆæ‰¹å¤§å°**ï¼š`batch_size * num_gpus * gradient_accumulation_steps`

## ä¸Žæ›¿ä»£æ–¹æ¡ˆçš„å¯¹æ¯”

**é€‚åˆä½¿ç”¨ Accelerate çš„åœºæ™¯**ï¼š
- éœ€è¦æœ€ç®€å•çš„åˆ†å¸ƒå¼è®­ç»ƒæ–¹å¼
- éœ€è¦å•è„šæœ¬é€‚é…ä»»æ„ç¡¬ä»¶
- ä½¿ç”¨ HuggingFace ç”Ÿæ€ç³»ç»Ÿ
- éœ€è¦çµæ´»æ€§ï¼ˆDDP/DeepSpeed/FSDP/Megatronï¼‰
- éœ€è¦å¿«é€ŸåŽŸåž‹å¼€å‘

**æ ¸å¿ƒä¼˜åŠ¿**ï¼š
- **4 è¡Œä»£ç **ï¼šä»£ç æ”¹åŠ¨æžå°‘
- **ç»Ÿä¸€ API**ï¼šåŒä¸€å¥—ä»£ç é€‚ç”¨äºŽ DDPã€DeepSpeedã€FSDPã€Megatron
- **è‡ªåŠ¨åŒ–**ï¼šè®¾å¤‡æ”¾ç½®ã€æ··åˆç²¾åº¦ã€åˆ†ç‰‡å‡è‡ªåŠ¨å¤„ç†
- **äº¤äº’å¼é…ç½®**ï¼šæ— éœ€æ‰‹åŠ¨é…ç½®å¯åŠ¨å™¨
- **å•æ¡å¯åŠ¨å‘½ä»¤**ï¼šé€‚ç”¨äºŽæ‰€æœ‰çŽ¯å¢ƒ

**é€‚åˆä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆçš„åœºæ™¯**ï¼š
- **PyTorch Lightning**ï¼šéœ€è¦å›žè°ƒæœºåˆ¶ã€é«˜å±‚æŠ½è±¡
- **Ray Train**ï¼šå¤šèŠ‚ç‚¹ç¼–æŽ’ã€è¶…å‚æ•°è°ƒä¼˜
- **DeepSpeed**ï¼šç›´æŽ¥ API æŽ§åˆ¶ã€é«˜çº§ç‰¹æ€§
- **åŽŸç”Ÿ DDP**ï¼šæœ€å¤§æŽ§åˆ¶æƒã€æœ€å°‘æŠ½è±¡å±‚

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šè®¾å¤‡æ”¾ç½®é”™è¯¯**

ä¸è¦æ‰‹åŠ¨ç§»åŠ¨åˆ°è®¾å¤‡ï¼š
```python
# é”™è¯¯
batch = batch.to('cuda')

# æ­£ç¡®
# Accelerate åœ¨ prepare() ä¹‹åŽè‡ªåŠ¨å¤„ç†
```

**é—®é¢˜ï¼šæ¢¯åº¦ç´¯ç§¯ä¸ç”Ÿæ•ˆ**

ä½¿ç”¨ä¸Šä¸‹æ–‡ç®¡ç†å™¨ï¼š
```python
# æ­£ç¡®
with accelerator.accumulate(model):
    optimizer.zero_grad()
    accelerator.backward(loss)
    optimizer.step()
```

**é—®é¢˜ï¼šåˆ†å¸ƒå¼çŽ¯å¢ƒä¸‹çš„æ£€æŸ¥ç‚¹ä¿å­˜**

ä½¿ç”¨ accelerator æ–¹æ³•ï¼š
```python
# ä»…åœ¨ä¸»è¿›ç¨‹ä¿å­˜
if accelerator.is_main_process:
    accelerator.save_state('checkpoint/')

# åœ¨æ‰€æœ‰è¿›ç¨‹ä¸ŠåŠ è½½
accelerator.load_state('checkpoint/')
```

**é—®é¢˜ï¼šFSDP ç»“æžœä¸ä¸€è‡´**

ç¡®ä¿ä½¿ç”¨ç›¸åŒçš„éšæœºç§å­ï¼š
```python
from accelerate.utils import set_seed
set_seed(42)
```

## é«˜çº§ä¸»é¢˜

**Megatron é›†æˆ**ï¼šå¼ é‡å¹¶è¡Œã€æµæ°´çº¿å¹¶è¡Œå’Œåºåˆ—å¹¶è¡Œçš„é…ç½®ï¼Œè¯·å‚é˜… [references/megatron-integration.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/accelerate/references/megatron-integration.md)ã€‚

**è‡ªå®šä¹‰æ’ä»¶**ï¼šåˆ›å»ºè‡ªå®šä¹‰åˆ†å¸ƒå¼æ’ä»¶åŠé«˜çº§é…ç½®ï¼Œè¯·å‚é˜… [references/custom-plugins.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/accelerate/references/custom-plugins.md)ã€‚

**æ€§èƒ½è°ƒä¼˜**ï¼šæ€§èƒ½åˆ†æžã€å†…å­˜ä¼˜åŒ–åŠæœ€ä½³å®žè·µï¼Œè¯·å‚é˜… [references/performance.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/accelerate/references/performance.md)ã€‚

## ç¡¬ä»¶è¦æ±‚

- **CPU**ï¼šæ”¯æŒï¼ˆé€Ÿåº¦è¾ƒæ…¢ï¼‰
- **å• GPU**ï¼šæ”¯æŒ
- **å¤š GPU**ï¼šDDPï¼ˆé»˜è®¤ï¼‰ã€DeepSpeed æˆ– FSDP
- **å¤šèŠ‚ç‚¹**ï¼šDDPã€DeepSpeedã€FSDPã€Megatron
- **TPU**ï¼šæ”¯æŒ
- **Apple MPS**ï¼šæ”¯æŒ

**å¯åŠ¨å™¨è¦æ±‚**ï¼š
- **DDP**ï¼š`torch.distributed.run`ï¼ˆå†…ç½®ï¼‰
- **DeepSpeed**ï¼š`deepspeed`ï¼ˆpip install deepspeedï¼‰
- **FSDP**ï¼šPyTorch 1.12+ï¼ˆå†…ç½®ï¼‰
- **Megatron**ï¼šéœ€è‡ªå®šä¹‰é…ç½®

## èµ„æº

- æ–‡æ¡£ï¼šhttps://huggingface.co/docs/accelerate
- GitHubï¼šhttps://github.com/huggingface/accelerate
- ç‰ˆæœ¬ï¼š1.11.0+
- æ•™ç¨‹ï¼š"Accelerate your scripts"
- ç¤ºä¾‹ï¼šhttps://github.com/huggingface/accelerate/tree/main/examples
- ä½¿ç”¨æ–¹ï¼šHuggingFace Transformersã€TRLã€PEFT åŠæ‰€æœ‰ HF åº“
