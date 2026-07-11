---
title: "Distributed Llm Pretraining Torchtitan"
sidebar_label: "Distributed Llm Pretraining Torchtitan"
description: "ä½¿ç”¨ torchtitan æä¾› PyTorch åŽŸç”Ÿåˆ†å¸ƒå¼ LLM é¢„è®­ç»ƒï¼Œæ”¯æŒ 4D å¹¶è¡Œï¼ˆFSDP2ã€TPã€PPã€CPï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Distributed Llm Pretraining Torchtitan

ä½¿ç”¨ torchtitan æä¾› PyTorch åŽŸç”Ÿåˆ†å¸ƒå¼ LLM é¢„è®­ç»ƒï¼Œæ”¯æŒ 4D å¹¶è¡Œï¼ˆFSDP2ã€TPã€PPã€CPï¼‰ã€‚é€‚ç”¨äºŽåœ¨ 8 åˆ° 512+ GPU è§„æ¨¡ä¸‹é¢„è®­ç»ƒ Llama 3.1ã€DeepSeek V3 æˆ–è‡ªå®šä¹‰æ¨¡åž‹ï¼Œæ”¯æŒ Float8ã€torch.compile åŠåˆ†å¸ƒå¼æ£€æŸ¥ç‚¹ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/torchtitan` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/torchtitan` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `torch>=2.6.0`, `torchtitan>=0.2.0`, `torchao>=0.5.0` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Model Architecture`, `Distributed Training`, `TorchTitan`, `FSDP2`, `Tensor Parallel`, `Pipeline Parallel`, `Context Parallel`, `Float8`, `Llama`, `Pretraining` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# TorchTitan - PyTorch åŽŸç”Ÿåˆ†å¸ƒå¼ LLM é¢„è®­ç»ƒ

## å¿«é€Ÿå¼€å§‹

TorchTitan æ˜¯ PyTorch å®˜æ–¹çš„å¤§è§„æ¨¡ LLM é¢„è®­ç»ƒå¹³å°ï¼Œæ”¯æŒå¯ç»„åˆçš„ 4D å¹¶è¡Œï¼ˆFSDP2ã€TPã€PPã€CPï¼‰ï¼Œåœ¨ H100 GPU ä¸Šç›¸æ¯”åŸºçº¿å¯å®žçŽ° 65%+ çš„åŠ é€Ÿã€‚

**å®‰è£…**ï¼š
```bash
# ä»Ž PyPI å®‰è£…ï¼ˆç¨³å®šç‰ˆï¼‰
pip install torchtitan

# ä»Žæºç å®‰è£…ï¼ˆæœ€æ–°ç‰¹æ€§ï¼Œéœ€è¦ PyTorch nightlyï¼‰
git clone https://github.com/pytorch/torchtitan
cd torchtitan
pip install -r requirements.txt
```

**ä¸‹è½½ tokenizer**ï¼š
```bash
# ä»Ž https://huggingface.co/settings/tokens èŽ·å– HF token
python scripts/download_hf_assets.py --repo_id meta-llama/Llama-3.1-8B --assets tokenizer --hf_token=...
```

**åœ¨ 8 ä¸ª GPU ä¸Šå¯åŠ¨è®­ç»ƒ**ï¼š
```bash
CONFIG_FILE="./torchtitan/models/llama3/train_configs/llama3_8b.toml" ./run_train.sh
```

## å¸¸ç”¨å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šåœ¨å•èŠ‚ç‚¹ä¸Šé¢„è®­ç»ƒ Llama 3.1 8B

å¤åˆ¶æ­¤æ£€æŸ¥æ¸…å•ï¼š

```
å•èŠ‚ç‚¹é¢„è®­ç»ƒï¼š
- [ ] æ­¥éª¤ 1ï¼šä¸‹è½½ tokenizer
- [ ] æ­¥éª¤ 2ï¼šé…ç½®è®­ç»ƒ
- [ ] æ­¥éª¤ 3ï¼šå¯åŠ¨è®­ç»ƒ
- [ ] æ­¥éª¤ 4ï¼šç›‘æŽ§ä¸Žæ£€æŸ¥ç‚¹
```

**æ­¥éª¤ 1ï¼šä¸‹è½½ tokenizer**

```bash
python scripts/download_hf_assets.py \
  --repo_id meta-llama/Llama-3.1-8B \
  --assets tokenizer \
  --hf_token=YOUR_HF_TOKEN
```

**æ­¥éª¤ 2ï¼šé…ç½®è®­ç»ƒ**

ç¼–è¾‘æˆ–åˆ›å»º TOML é…ç½®æ–‡ä»¶ï¼š

```toml
# llama3_8b_custom.toml
[job]
dump_folder = "./outputs"
description = "Llama 3.1 8B training"

[model]
name = "llama3"
flavor = "8B"
hf_assets_path = "./assets/hf/Llama-3.1-8B"

[optimizer]
name = "AdamW"
lr = 3e-4

[lr_scheduler]
warmup_steps = 200

[training]
local_batch_size = 2
seq_len = 8192
max_norm = 1.0
steps = 1000
dataset = "c4"

[parallelism]
data_parallel_shard_degree = -1  # Use all GPUs for FSDP

[activation_checkpoint]
mode = "selective"
selective_ac_option = "op"

[checkpoint]
enable = true
folder = "checkpoint"
interval = 500
```

**æ­¥éª¤ 3ï¼šå¯åŠ¨è®­ç»ƒ**

```bash
# å•èŠ‚ç‚¹ 8 ä¸ª GPU
CONFIG_FILE="./llama3_8b_custom.toml" ./run_train.sh

# æˆ–æ˜¾å¼ä½¿ç”¨ torchrun
torchrun --nproc_per_node=8 \
  -m torchtitan.train \
  --job.config_file ./llama3_8b_custom.toml
```

**æ­¥éª¤ 4ï¼šç›‘æŽ§ä¸Žæ£€æŸ¥ç‚¹**

TensorBoard æ—¥å¿—ä¿å­˜è‡³ `./outputs/tb/`ï¼š
```bash
tensorboard --logdir ./outputs/tb
```

### å·¥ä½œæµ 2ï¼šä½¿ç”¨ SLURM è¿›è¡Œå¤šèŠ‚ç‚¹è®­ç»ƒ

```
å¤šèŠ‚ç‚¹è®­ç»ƒï¼š
- [ ] æ­¥éª¤ 1ï¼šä¸ºè§„æ¨¡é…ç½®å¹¶è¡Œåº¦
- [ ] æ­¥éª¤ 2ï¼šè®¾ç½® SLURM è„šæœ¬
- [ ] æ­¥éª¤ 3ï¼šæäº¤ä½œä¸š
- [ ] æ­¥éª¤ 4ï¼šä»Žæ£€æŸ¥ç‚¹æ¢å¤
```

**æ­¥éª¤ 1ï¼šä¸ºè§„æ¨¡é…ç½®å¹¶è¡Œåº¦**

åœ¨ 256 ä¸ª GPUï¼ˆ32 ä¸ªèŠ‚ç‚¹ï¼‰ä¸Šè®­ç»ƒ 70B æ¨¡åž‹ï¼š
```toml
[parallelism]
data_parallel_shard_degree = 32  # FSDP across 32 ranks
tensor_parallel_degree = 8        # TP within node
pipeline_parallel_degree = 1      # No PP for 70B
context_parallel_degree = 1       # Increase for long sequences
```

**æ­¥éª¤ 2ï¼šè®¾ç½® SLURM è„šæœ¬**

```bash
#!/bin/bash
#SBATCH --job-name=llama70b
#SBATCH --nodes=32
#SBATCH --ntasks-per-node=8
#SBATCH --gpus-per-node=8

srun torchrun \
  --nnodes=32 \
  --nproc_per_node=8 \
  --rdzv_backend=c10d \
  --rdzv_endpoint=$MASTER_ADDR:$MASTER_PORT \
  -m torchtitan.train \
  --job.config_file ./llama3_70b.toml
```

**æ­¥éª¤ 3ï¼šæäº¤ä½œä¸š**

```bash
sbatch multinode_trainer.slurm
```

**æ­¥éª¤ 4ï¼šä»Žæ£€æŸ¥ç‚¹æ¢å¤**

è‹¥é…ç½®çš„æ–‡ä»¶å¤¹ä¸­å­˜åœ¨æ£€æŸ¥ç‚¹ï¼Œè®­ç»ƒå°†è‡ªåŠ¨æ¢å¤ã€‚

### å·¥ä½œæµ 3ï¼šä¸º H100 å¯ç”¨ Float8 è®­ç»ƒ

Float8 åœ¨ H100 GPU ä¸Šå¯æä¾› 30-50% çš„åŠ é€Ÿã€‚

```
Float8 è®­ç»ƒï¼š
- [ ] æ­¥éª¤ 1ï¼šå®‰è£… torchao
- [ ] æ­¥éª¤ 2ï¼šé…ç½® Float8
- [ ] æ­¥éª¤ 3ï¼šå¯åŠ¨å¹¶å¼€å¯ compile
```

**æ­¥éª¤ 1ï¼šå®‰è£… torchao**

```bash
USE_CPP=0 pip install git+https://github.com/pytorch/ao.git
```

**æ­¥éª¤ 2ï¼šé…ç½® Float8**

åœ¨ TOML é…ç½®ä¸­æ·»åŠ ï¼š
```toml
[model]
converters = ["quantize.linear.float8"]

[quantize.linear.float8]
enable_fsdp_float8_all_gather = true
precompute_float8_dynamic_scale_for_fsdp = true
filter_fqns = ["output"]  # Exclude output layer

[compile]
enable = true
components = ["model", "loss"]
```

**æ­¥éª¤ 3ï¼šå¯åŠ¨å¹¶å¼€å¯ compile**

```bash
CONFIG_FILE="./llama3_8b.toml" ./run_train.sh \
  --model.converters="quantize.linear.float8" \
  --quantize.linear.float8.enable_fsdp_float8_all_gather \
  --compile.enable
```

### å·¥ä½œæµ 4ï¼š405B æ¨¡åž‹çš„ 4D å¹¶è¡Œ

```
4D å¹¶è¡Œï¼ˆFSDP + TP + PP + CPï¼‰ï¼š
- [ ] æ­¥éª¤ 1ï¼šåˆ›å»ºç§å­æ£€æŸ¥ç‚¹
- [ ] æ­¥éª¤ 2ï¼šé…ç½® 4D å¹¶è¡Œ
- [ ] æ­¥éª¤ 3ï¼šåœ¨ 512 ä¸ª GPU ä¸Šå¯åŠ¨
```

**æ­¥éª¤ 1ï¼šåˆ›å»ºç§å­æ£€æŸ¥ç‚¹**

è·¨ PP é˜¶æ®µä¸€è‡´åˆå§‹åŒ–æ‰€å¿…éœ€ï¼š
```bash
NGPU=1 CONFIG_FILE=./llama3_405b.toml ./run_train.sh \
  --checkpoint.enable \
  --checkpoint.create_seed_checkpoint \
  --parallelism.data_parallel_shard_degree 1 \
  --parallelism.tensor_parallel_degree 1 \
  --parallelism.pipeline_parallel_degree 1
```

**æ­¥éª¤ 2ï¼šé…ç½® 4D å¹¶è¡Œ**

```toml
[parallelism]
data_parallel_shard_degree = 8   # FSDP
tensor_parallel_degree = 8       # TP within node
pipeline_parallel_degree = 8     # PP across nodes
context_parallel_degree = 1      # CP for long sequences

[training]
local_batch_size = 32
seq_len = 8192
```

**æ­¥éª¤ 3ï¼šåœ¨ 512 ä¸ª GPU ä¸Šå¯åŠ¨**

```bash
# 64 èŠ‚ç‚¹ x 8 GPU = 512 GPU
srun torchrun --nnodes=64 --nproc_per_node=8 \
  -m torchtitan.train \
  --job.config_file ./llama3_405b.toml
```

## ä½•æ—¶ä½¿ç”¨ vs æ›¿ä»£æ–¹æ¡ˆ

**ä½¿ç”¨ TorchTitan çš„åœºæ™¯ï¼š**
- ä»Žå¤´é¢„è®­ç»ƒ LLMï¼ˆ8B åˆ° 405B+ï¼‰
- éœ€è¦æ— ç¬¬ä¸‰æ–¹ä¾èµ–çš„ PyTorch åŽŸç”Ÿæ–¹æ¡ˆ
- éœ€è¦å¯ç»„åˆçš„ 4D å¹¶è¡Œï¼ˆFSDP2ã€TPã€PPã€CPï¼‰
- åœ¨æ”¯æŒ Float8 çš„ H100 ä¸Šè®­ç»ƒ
- éœ€è¦ä¸Ž torchtune/HuggingFace äº’æ“ä½œçš„æ£€æŸ¥ç‚¹

**ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆçš„åœºæ™¯ï¼š**
- **Megatron-LM**ï¼šä»…é™ NVIDIA éƒ¨ç½²æ—¶è¿½æ±‚æœ€é«˜æ€§èƒ½
- **DeepSpeed**ï¼šæ›´å¹¿æ³›çš„ ZeRO ä¼˜åŒ–ç”Ÿæ€ï¼Œæ”¯æŒæŽ¨ç†
- **Axolotl/TRL**ï¼šå¾®è°ƒè€Œéžé¢„è®­ç»ƒ
- **LitGPT**ï¼šæ•™å­¦ç”¨é€”ï¼Œå°è§„æ¨¡è®­ç»ƒ

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šå¤§æ¨¡åž‹å†…å­˜ä¸è¶³**

å¯ç”¨æ¿€æ´»æ£€æŸ¥ç‚¹å¹¶å‡å°æ‰¹æ¬¡å¤§å°ï¼š
```toml
[activation_checkpoint]
mode = "full"  # Instead of "selective"

[training]
local_batch_size = 1
```

æˆ–ä½¿ç”¨æ¢¯åº¦ç´¯ç§¯ï¼š
```toml
[training]
local_batch_size = 1
global_batch_size = 32  # Accumulates gradients
```

**é—®é¢˜ï¼šTP å¼‚æ­¥é›†åˆé€šä¿¡å¯¼è‡´å†…å­˜å ç”¨è¿‡é«˜**

è®¾ç½®çŽ¯å¢ƒå˜é‡ï¼š
```bash
export TORCH_NCCL_AVOID_RECORD_STREAMS=1
```

**é—®é¢˜ï¼šFloat8 è®­ç»ƒæœªè§åŠ é€Ÿ**

Float8 ä»…å¯¹å¤§åž‹ GEMM æœ‰æ•ˆã€‚è¿‡æ»¤å°å±‚ï¼š
```toml
[quantize.linear.float8]
filter_fqns = ["attention.wk", "attention.wv", "output", "auto_filter_small_kn"]
```

**é—®é¢˜ï¼šæ›´æ”¹å¹¶è¡Œåº¦åŽæ£€æŸ¥ç‚¹åŠ è½½å¤±è´¥**

ä½¿ç”¨ DCP çš„é‡åˆ†ç‰‡åŠŸèƒ½ï¼š
```bash
# å°†åˆ†ç‰‡æ£€æŸ¥ç‚¹è½¬æ¢ä¸ºå•æ–‡ä»¶
python -m torch.distributed.checkpoint.format_utils \
  dcp_to_torch checkpoint/step-1000 checkpoint.pt
```

**é—®é¢˜ï¼šPipeline å¹¶è¡Œåˆå§‹åŒ–å¤±è´¥**

è¯·å…ˆåˆ›å»ºç§å­æ£€æŸ¥ç‚¹ï¼ˆå‚è§å·¥ä½œæµ 4ï¼Œæ­¥éª¤ 1ï¼‰ã€‚

## æ”¯æŒçš„æ¨¡åž‹

| æ¨¡åž‹ | è§„æ¨¡ | çŠ¶æ€ |
|-------|-------|--------|
| Llama 3.1 | 8B, 70B, 405B | ç”Ÿäº§å¯ç”¨ |
| Llama 4 | å¤šç§ | å®žéªŒæ€§ |
| DeepSeek V3 | 16B, 236B, 671B (MoE) | å®žéªŒæ€§ |
| GPT-OSS | 20B, 120B (MoE) | å®žéªŒæ€§ |
| Qwen 3 | å¤šç§ | å®žéªŒæ€§ |
| Flux | æ‰©æ•£æ¨¡åž‹ | å®žéªŒæ€§ |

## æ€§èƒ½åŸºå‡†ï¼ˆH100ï¼‰

| æ¨¡åž‹ | GPU æ•° | å¹¶è¡Œç­–ç•¥ | TPS/GPU | æŠ€æœ¯ |
|-------|------|-------------|---------|------------|
| Llama 8B | 8 | FSDP | 5,762 | åŸºçº¿ |
| Llama 8B | 8 | FSDP+compile+FP8 | 8,532 | +48% |
| Llama 70B | 256 | FSDP+TP+AsyncTP | 876 | 2D å¹¶è¡Œ |
| Llama 405B | 512 | FSDP+TP+PP | 128 | 3D å¹¶è¡Œ |

## è¿›é˜¶ä¸»é¢˜

**FSDP2 é…ç½®**ï¼šå‚è§ [references/fsdp.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/torchtitan/references/fsdp.md)ï¼Œäº†è§£ FSDP2 ä¸Ž FSDP1 çš„è¯¦ç»†å¯¹æ¯”åŠ ZeRO ç­‰ä»·å…³ç³»ã€‚

**Float8 è®­ç»ƒ**ï¼šå‚è§ [references/float8.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/torchtitan/references/float8.md)ï¼Œäº†è§£ tensorwise ä¸Ž rowwise ç¼©æ”¾æ–¹æ¡ˆã€‚

**æ£€æŸ¥ç‚¹**ï¼šå‚è§ [references/checkpoint.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/torchtitan/references/checkpoint.md)ï¼Œäº†è§£ HuggingFace è½¬æ¢ä¸Žå¼‚æ­¥æ£€æŸ¥ç‚¹ã€‚

**æ·»åŠ è‡ªå®šä¹‰æ¨¡åž‹**ï¼šå‚è§ [references/custom-models.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/torchtitan/references/custom-models.md)ï¼Œäº†è§£ TrainSpec åè®®ã€‚

## èµ„æº

- GitHubï¼šhttps://github.com/pytorch/torchtitan
- è®ºæ–‡ï¼šhttps://arxiv.org/abs/2410.06511
- ICLR 2025ï¼šhttps://iclr.cc/virtual/2025/poster/29620
- PyTorch è®ºå›ï¼šhttps://discuss.pytorch.org/c/distributed/torchtitan/44
