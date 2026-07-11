---
title: "Simpo è®­ç»ƒ â€” ç”¨äºŽ LLM å¯¹é½çš„ç®€å•åå¥½ä¼˜åŒ–"
sidebar_label: "Simpo è®­ç»ƒ"
description: "ç”¨äºŽ LLM å¯¹é½çš„ç®€å•åå¥½ä¼˜åŒ–"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Simpo è®­ç»ƒ

ç”¨äºŽ LLM å¯¹é½çš„ç®€å•åå¥½ä¼˜åŒ–ï¼ˆSimple Preference Optimizationï¼‰ã€‚æ— éœ€å‚è€ƒæ¨¡åž‹çš„ DPO æ›¿ä»£æ–¹æ¡ˆï¼Œæ€§èƒ½æ›´ä¼˜ï¼ˆåœ¨ AlpacaEval 2.0 ä¸Šæå‡ +6.4 åˆ†ï¼‰ã€‚æ— éœ€å‚è€ƒæ¨¡åž‹ï¼Œæ¯” DPO æ›´é«˜æ•ˆã€‚å½“éœ€è¦æ¯” DPO/PPO æ›´ç®€å•ã€æ›´å¿«é€Ÿçš„è®­ç»ƒæ—¶ï¼Œå¯ç”¨äºŽåå¥½å¯¹é½ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/simpo` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/simpo` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `torch`, `transformers`, `datasets`, `trl`, `accelerate` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Post-Training`, `SimPO`, `Preference Optimization`, `Alignment`, `DPO Alternative`, `Reference-Free`, `LLM Alignment`, `Efficient Training` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# SimPO - ç®€å•åå¥½ä¼˜åŒ–

## å¿«é€Ÿå¼€å§‹

SimPO æ˜¯ä¸€ç§æ— éœ€å‚è€ƒæ¨¡åž‹çš„åå¥½ä¼˜åŒ–æ–¹æ³•ï¼Œæ€§èƒ½ä¼˜äºŽ DPOã€‚

**å®‰è£…**ï¼š
```bash
# Create environment
conda create -n simpo python=3.10 && conda activate simpo

# Install PyTorch 2.2.2
# Visit: https://pytorch.org/get-started/locally/

# Install alignment-handbook
git clone https://github.com/huggingface/alignment-handbook.git
cd alignment-handbook
python -m pip install .

# Install Flash Attention 2
python -m pip install flash-attn --no-build-isolation
```

**è®­ç»ƒ**ï¼ˆMistral 7Bï¼‰ï¼š
```bash
ACCELERATE_LOG_LEVEL=info accelerate launch \
  --config_file accelerate_configs/deepspeed_zero3.yaml \
  scripts/run_simpo.py \
  training_configs/mistral-7b-base-simpo.yaml
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šä»ŽåŸºç¡€æ¨¡åž‹è®­ç»ƒï¼ˆMistral 7Bï¼‰

**é…ç½®æ–‡ä»¶**ï¼ˆ`mistral-7b-base-simpo.yaml`ï¼‰ï¼š
```yaml
# Model
model_name_or_path: mistralai/Mistral-7B-v0.1
torch_dtype: bfloat16

# Dataset
dataset_mixer:
  HuggingFaceH4/ultrafeedback_binarized: 1.0
dataset_splits:
  - train_prefs
  - test_prefs

# SimPO hyperparameters
beta: 2.0                  # Reward scaling (2.0-10.0)
gamma_beta_ratio: 0.5       # Target margin (0-1)
loss_type: sigmoid          # sigmoid or hinge
sft_weight: 0.0             # Optional SFT regularization

# Training
learning_rate: 5e-7         # Critical: 3e-7 to 1e-6
num_train_epochs: 1
per_device_train_batch_size: 1
gradient_accumulation_steps: 8

# Output
output_dir: ./outputs/mistral-7b-simpo
```

**å¯åŠ¨è®­ç»ƒ**ï¼š
```bash
accelerate launch --config_file accelerate_configs/deepspeed_zero3.yaml \
  scripts/run_simpo.py training_configs/mistral-7b-base-simpo.yaml
```

### å·¥ä½œæµ 2ï¼šå¾®è°ƒæŒ‡ä»¤æ¨¡åž‹ï¼ˆLlama 3 8Bï¼‰

**é…ç½®æ–‡ä»¶**ï¼ˆ`llama3-8b-instruct-simpo.yaml`ï¼‰ï¼š
```yaml
model_name_or_path: meta-llama/Meta-Llama-3-8B-Instruct

dataset_mixer:
  argilla/ultrafeedback-binarized-preferences-cleaned: 1.0

beta: 2.5
gamma_beta_ratio: 0.5
learning_rate: 5e-7
sft_weight: 0.1             # Add SFT loss to preserve capabilities

num_train_epochs: 1
per_device_train_batch_size: 2
gradient_accumulation_steps: 4
output_dir: ./outputs/llama3-8b-simpo
```

**å¯åŠ¨**ï¼š
```bash
accelerate launch --config_file accelerate_configs/deepspeed_zero3.yaml \
  scripts/run_simpo.py training_configs/llama3-8b-instruct-simpo.yaml
```

### å·¥ä½œæµ 3ï¼šæŽ¨ç†å¯†é›†åž‹ä»»åŠ¡ï¼ˆè¾ƒä½Žå­¦ä¹ çŽ‡ï¼‰

**é€‚ç”¨äºŽæ•°å­¦/ä»£ç ä»»åŠ¡**ï¼š
```yaml
model_name_or_path: deepseek-ai/deepseek-math-7b-base

dataset_mixer:
  argilla/distilabel-math-preference-dpo: 1.0

beta: 5.0                   # Higher for stronger signal
gamma_beta_ratio: 0.7       # Larger margin
learning_rate: 3e-7         # Lower LR for reasoning
sft_weight: 0.0

num_train_epochs: 1
per_device_train_batch_size: 1
gradient_accumulation_steps: 16
```

## ä½•æ—¶ä½¿ç”¨åŠæ›¿ä»£æ–¹æ¡ˆ

**é€‚åˆä½¿ç”¨ SimPO çš„åœºæ™¯**ï¼š
- å¸Œæœ›æ¯” DPO è®­ç»ƒæ›´ç®€å•ï¼ˆæ— éœ€å‚è€ƒæ¨¡åž‹ï¼‰
- æ‹¥æœ‰åå¥½æ•°æ®ï¼ˆchosen/rejected å¯¹ï¼‰
- éœ€è¦æ¯” DPO æ›´å¥½çš„æ€§èƒ½
- è®¡ç®—èµ„æºæœ‰é™
- å•èŠ‚ç‚¹è®­ç»ƒå³å¯æ»¡è¶³éœ€æ±‚

**ç®—æ³•é€‰æ‹©**ï¼š
- **SimPO**ï¼šæœ€ç®€å•ã€æ€§èƒ½æœ€ä¼˜ã€æ— éœ€å‚è€ƒæ¨¡åž‹
- **DPO**ï¼šéœ€è¦å‚è€ƒæ¨¡åž‹åŸºçº¿ï¼Œæ›´ä¸ºä¿å®ˆ
- **PPO**ï¼šæœ€å¤§æŽ§åˆ¶åº¦ï¼Œéœ€è¦å¥–åŠ±æ¨¡åž‹ï¼Œé…ç½®å¤æ‚
- **GRPO**ï¼šå†…å­˜é«˜æ•ˆçš„ RLï¼Œæ— éœ€ critic

**æ”¹ç”¨å…¶ä»–æ–¹æ¡ˆçš„åœºæ™¯**ï¼š
- **OpenRLHF**ï¼šå¤šèŠ‚ç‚¹åˆ†å¸ƒå¼è®­ç»ƒï¼ŒPPO/GRPO
- **TRL**ï¼šéœ€è¦åœ¨å•ä¸€æ¡†æž¶ä¸­ä½¿ç”¨å¤šç§æ–¹æ³•
- **DPO**ï¼šéœ€è¦å»ºç«‹å·²æœ‰åŸºçº¿å¯¹æ¯”

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šæŸå¤±å‘æ•£**

é™ä½Žå­¦ä¹ çŽ‡ï¼š
```yaml
learning_rate: 3e-7  # Reduce from 5e-7
```

é™ä½Ž betaï¼š
```yaml
beta: 1.0  # Reduce from 2.0
```

**é—®é¢˜ï¼šæ¨¡åž‹é—å¿˜åŽŸæœ‰èƒ½åŠ›**

æ·»åŠ  SFT æ­£åˆ™åŒ–ï¼š
```yaml
sft_weight: 0.1  # Add SFT loss component
```

**é—®é¢˜ï¼šåå¥½åˆ†ç¦»æ•ˆæžœå·®**

æé«˜ beta å’Œ marginï¼š
```yaml
beta: 5.0            # Increase from 2.0
gamma_beta_ratio: 0.8  # Increase from 0.5
```

**é—®é¢˜ï¼šè®­ç»ƒæ—¶æ˜¾å­˜ä¸è¶³ï¼ˆOOMï¼‰**

å‡å°æ‰¹æ¬¡å¤§å°ï¼š
```yaml
per_device_train_batch_size: 1
gradient_accumulation_steps: 16  # Maintain effective batch
```

å¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹ï¼š
```yaml
gradient_checkpointing: true
```

## è¿›é˜¶ä¸»é¢˜

**æŸå¤±å‡½æ•°**ï¼šå‚è§ [references/loss-functions.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/simpo/references/loss-functions.md)ï¼Œäº†è§£ sigmoid ä¸Ž hinge æŸå¤±ã€æ•°å­¦å…¬å¼åŠå„è‡ªé€‚ç”¨åœºæ™¯ã€‚

**è¶…å‚æ•°è°ƒä¼˜**ï¼šå‚è§ [references/hyperparameters.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/simpo/references/hyperparameters.md)ï¼Œäº†è§£ betaã€gammaã€å­¦ä¹ çŽ‡é€‰æ‹©æŒ‡å—åŠé’ˆå¯¹ä¸åŒæ¨¡åž‹è§„æ¨¡çš„å»ºè®®ã€‚

**æ•°æ®é›†å‡†å¤‡**ï¼šå‚è§ [references/datasets.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/simpo/references/datasets.md)ï¼Œäº†è§£åå¥½æ•°æ®æ ¼å¼ã€è´¨é‡è¿‡æ»¤åŠè‡ªå®šä¹‰æ•°æ®é›†åˆ›å»ºæ–¹æ³•ã€‚

## ç¡¬ä»¶è¦æ±‚

- **GPU**ï¼šæŽ¨è NVIDIA A100/H100
- **æ˜¾å­˜**ï¼š
  - 7B æ¨¡åž‹ï¼š1Ã— A100 40GBï¼ˆDeepSpeed ZeRO-3ï¼‰
  - 8B æ¨¡åž‹ï¼š2Ã— A100 40GB
  - 70B æ¨¡åž‹ï¼š8Ã— A100 80GB
- **å•èŠ‚ç‚¹**ï¼šDeepSpeed ZeRO-3 å³å¯æ»¡è¶³
- **æ··åˆç²¾åº¦**ï¼šæŽ¨è BF16

**å†…å­˜ä¼˜åŒ–**ï¼š
- DeepSpeed ZeRO-3ï¼ˆé»˜è®¤é…ç½®ï¼‰
- æ¢¯åº¦æ£€æŸ¥ç‚¹
- Flash Attention 2

## èµ„æº

- è®ºæ–‡ï¼šhttps://arxiv.org/abs/2405.14734ï¼ˆNeurIPS 2024ï¼‰
- GitHubï¼šhttps://github.com/princeton-nlp/SimPO
- æ¨¡åž‹ï¼šhttps://huggingface.co/princeton-nlp
- Alignment Handbookï¼šhttps://github.com/huggingface/alignment-handbook
