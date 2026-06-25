---
title: "Slime Rl Training â€” ä½¿ç”¨ slimeï¼ˆMegatron+SGLang æ¡†æž¶ï¼‰è¿›è¡Œ LLM RL åŽè®­ç»ƒçš„æŒ‡å¯¼"
sidebar_label: "Slime Rl Training"
description: "ä½¿ç”¨ slimeï¼ˆMegatron+SGLang æ¡†æž¶ï¼‰è¿›è¡Œ LLM RL åŽè®­ç»ƒçš„æŒ‡å¯¼"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Slime Rl Training

ä½¿ç”¨ slimeï¼ˆMegatron+SGLang æ¡†æž¶ï¼‰è¿›è¡Œ LLM RLï¼ˆå¼ºåŒ–å­¦ä¹ ï¼‰åŽè®­ç»ƒçš„æŒ‡å¯¼ã€‚é€‚ç”¨äºŽè®­ç»ƒ GLM æ¨¡åž‹ã€å®žçŽ°è‡ªå®šä¹‰æ•°æ®ç”Ÿæˆå·¥ä½œæµï¼Œæˆ–éœ€è¦ Megatron-LM ç´§å¯†é›†æˆä»¥è¿›è¡Œ RL æ‰©å±•çš„åœºæ™¯ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/slime` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/slime` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `sglang-router>=0.2.3`, `ray`, `torch>=2.0.0`, `transformers>=4.40.0` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Reinforcement Learning`, `Megatron-LM`, `SGLang`, `GRPO`, `Post-Training`, `GLM` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# slimeï¼šé¢å‘ RL æ‰©å±•çš„ LLM åŽè®­ç»ƒæ¡†æž¶

slime æ˜¯æ¸…åŽå¤§å­¦ THUDM å›¢é˜Ÿå¼€å‘çš„ LLM åŽè®­ç»ƒæ¡†æž¶ï¼Œä¸º GLM-4.5ã€GLM-4.6 å’Œ GLM-4.7 æä¾›æ”¯æŒã€‚å®ƒå°† Megatron-LMï¼ˆç”¨äºŽè®­ç»ƒï¼‰ä¸Ž SGLangï¼ˆç”¨äºŽé«˜åžåé‡ rollout ç”Ÿæˆï¼‰ç›¸è¿žæŽ¥ã€‚

## ä½•æ—¶ä½¿ç”¨ slime

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹é€‰æ‹© slimeï¼š**
- éœ€è¦ Megatron-LM åŽŸç”Ÿè®­ç»ƒé…åˆ SGLang æŽ¨ç†
- éœ€è¦å¸¦æœ‰çµæ´»æ•°æ®ç¼“å†²åŒºçš„è‡ªå®šä¹‰æ•°æ®ç”Ÿæˆå·¥ä½œæµ
- è®­ç»ƒ GLMã€Qwen3ã€DeepSeek V3 æˆ– Llama 3 æ¨¡åž‹
- éœ€è¦å…·æœ‰ç”Ÿäº§çº§æ”¯æŒï¼ˆZ.aiï¼‰çš„ç ”ç©¶çº§æ¡†æž¶

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹è€ƒè™‘æ›¿ä»£æ–¹æ¡ˆï¼š**
- éœ€è¦ä¼ä¸šçº§ç¨³å®šæ€§åŠŸèƒ½ â†’ ä½¿ç”¨ **miles**
- éœ€è¦çµæ´»çš„åŽç«¯åˆ‡æ¢ â†’ ä½¿ç”¨ **verl**
- éœ€è¦ PyTorch åŽŸç”ŸæŠ½è±¡ â†’ ä½¿ç”¨ **torchforge**

## æ ¸å¿ƒç‰¹æ€§

- **è®­ç»ƒ**ï¼šMegatron-LMï¼Œæ”¯æŒå®Œæ•´å¹¶è¡Œï¼ˆTPã€PPã€DPã€SPï¼‰
- **Rollout**ï¼šåŸºäºŽ SGLang çš„é«˜åžåé‡ç”Ÿæˆï¼Œå¸¦ router
- **æ•°æ®ç¼“å†²åŒº**ï¼šçµæ´»çš„ prompt ç®¡ç†ä¸Žæ ·æœ¬å­˜å‚¨
- **æ¨¡åž‹**ï¼šGLM-4.xã€Qwen3ã€DeepSeek V3/R1ã€Llama 3

## æž¶æž„æ¦‚è§ˆ

<!-- ascii-guard-ignore -->
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    Data Buffer                          â”‚
â”‚ - Prompt initialization and management                  â”‚
â”‚ - Custom data generation and filtering                  â”‚
â”‚ - Rollout sample storage                                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
              â”‚                           â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Training (Megatron-LM)  â”‚ â”‚ Rollout (SGLang + Router)   â”‚
â”‚ - Actor model training  â”‚ â”‚ - Response generation       â”‚
â”‚ - Critic (optional)     â”‚ â”‚ - Reward/verifier output    â”‚
â”‚ - Weight sync to rolloutâ”‚ â”‚ - Multi-turn support        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```
<!-- ascii-guard-ignore-end -->

## å®‰è£…

```bash
# æŽ¨èï¼šDocker
docker pull slimerl/slime:latest
docker run --rm --gpus all --ipc=host --shm-size=16g \
  -it slimerl/slime:latest /bin/bash

# å®¹å™¨å†…
cd /root/slime && pip install -e . --no-deps
```

### ä»Žæºç å®‰è£…

```bash
git clone https://github.com/THUDM/slime.git
cd slime
pip install -r requirements.txt
pip install -e .
```

## å¿«é€Ÿå¼€å§‹ï¼šGRPO è®­ç»ƒ

```bash
# åŠ è½½æ¨¡åž‹é…ç½®
source scripts/models/qwen3-4B.sh

# å¯åŠ¨è®­ç»ƒ
python train.py \
    --actor-num-nodes 1 \
    --actor-num-gpus-per-node 4 \
    --rollout-num-gpus 4 \
    --advantage-estimator grpo \
    --use-kl-loss --kl-loss-coef 0.001 \
    --rollout-batch-size 32 \
    --n-samples-per-prompt 8 \
    --global-batch-size 256 \
    --num-rollout 3000 \
    --prompt-data /path/to/data.jsonl \
    ${MODEL_ARGS[@]} ${CKPT_ARGS[@]}
```

---

## å·¥ä½œæµ 1ï¼šæ ‡å‡† GRPO è®­ç»ƒ

ä½¿ç”¨æ­¤å·¥ä½œæµé€šè¿‡ç»„ç›¸å¯¹ä¼˜åŠ¿ï¼ˆgroup-relative advantagesï¼‰è®­ç»ƒæŽ¨ç†æ¨¡åž‹ã€‚

### å‰ç½®æ¡ä»¶æ¸…å•
- [ ] Docker çŽ¯å¢ƒï¼Œæˆ–å·²å®‰è£… Megatron-LM + SGLang
- [ ] æ¨¡åž‹æ£€æŸ¥ç‚¹ï¼ˆHuggingFace æˆ– Megatron æ ¼å¼ï¼‰
- [ ] JSONL æ ¼å¼çš„è®­ç»ƒæ•°æ®

### ç¬¬ä¸€æ­¥ï¼šå‡†å¤‡æ•°æ®

```python
# data.jsonl æ ¼å¼
{"prompt": "What is 2 + 2?", "label": "4"}
{"prompt": "Solve: 3x = 12", "label": "x = 4"}
```

æˆ–ä½¿ç”¨å¯¹è¯æ ¼å¼ï¼š
```python
{
    "prompt": [
        {"role": "system", "content": "You are a math tutor."},
        {"role": "user", "content": "What is 15 + 27?"}
    ],
    "label": "42"
}
```

### ç¬¬äºŒæ­¥ï¼šé…ç½®æ¨¡åž‹

é€‰æ‹©é¢„é…ç½®çš„æ¨¡åž‹è„šæœ¬ï¼š

```bash
# åˆ—å‡ºå¯ç”¨æ¨¡åž‹
ls scripts/models/
# glm4-9B.sh, qwen3-4B.sh, qwen3-30B-A3B.sh, deepseek-v3.sh, llama3-8B.sh, ...

# åŠ è½½ä½ çš„æ¨¡åž‹
source scripts/models/qwen3-4B.sh
```

### ç¬¬ä¸‰æ­¥ï¼šå¯åŠ¨è®­ç»ƒ

```bash
python train.py \
    --actor-num-nodes 1 \
    --actor-num-gpus-per-node 8 \
    --rollout-num-gpus 8 \
    --advantage-estimator grpo \
    --use-kl-loss \
    --kl-loss-coef 0.001 \
    --prompt-data /path/to/train.jsonl \
    --input-key prompt \
    --label-key label \
    --apply-chat-template \
    --rollout-batch-size 32 \
    --n-samples-per-prompt 8 \
    --global-batch-size 256 \
    --num-rollout 3000 \
    --save-interval 100 \
    --eval-interval 50 \
    ${MODEL_ARGS[@]}
```

### ç¬¬å››æ­¥ï¼šç›‘æŽ§è®­ç»ƒ
- [ ] æŸ¥çœ‹ TensorBoardï¼š`tensorboard --logdir outputs/`
- [ ] ç¡®è®¤å¥–åŠ±æ›²çº¿æŒç»­ä¸Šå‡
- [ ] ç›‘æŽ§å„èŠ‚ç‚¹ GPU åˆ©ç”¨çŽ‡

---

## å·¥ä½œæµ 2ï¼šå¼‚æ­¥è®­ç»ƒ

ä½¿ç”¨å¼‚æ­¥æ¨¡å¼é€šè¿‡é‡å  rollout ä¸Žè®­ç»ƒæ¥æé«˜åžåé‡ã€‚

### ä½•æ—¶ä½¿ç”¨å¼‚æ­¥æ¨¡å¼
- å¤§åž‹æ¨¡åž‹ç”Ÿæˆæ—¶é—´è¾ƒé•¿
- åŒæ­¥æ¨¡å¼ä¸‹ GPU ç©ºé—²æ—¶é—´è¾ƒå¤š
- æœ‰è¶³å¤Ÿå†…å­˜ç”¨äºŽç¼“å†²

### å¯åŠ¨å¼‚æ­¥è®­ç»ƒ

```bash
python train_async.py \
    --actor-num-nodes 1 \
    --actor-num-gpus-per-node 8 \
    --rollout-num-gpus 8 \
    --advantage-estimator grpo \
    --async-buffer-size 4 \
    --prompt-data /path/to/train.jsonl \
    ${MODEL_ARGS[@]}
```

### å¼‚æ­¥ä¸“ç”¨å‚æ•°

```bash
--async-buffer-size 4        # ç¼“å†²çš„ rollout æ•°é‡
--update-weights-interval 2  # æ¯ N æ¬¡ rollout åŒæ­¥ä¸€æ¬¡æƒé‡
```

---

## å·¥ä½œæµ 3ï¼šå¤šè½® Agentic è®­ç»ƒ

ä½¿ç”¨æ­¤å·¥ä½œæµè®­ç»ƒå…·å¤‡å·¥å…·è°ƒç”¨æˆ–å¤šæ­¥æŽ¨ç†èƒ½åŠ›çš„ agentã€‚

### å‰ç½®æ¡ä»¶
- [ ] ç”¨äºŽå¤šè½®é€»è¾‘çš„è‡ªå®šä¹‰ generate å‡½æ•°
- [ ] å·¥å…·/çŽ¯å¢ƒæŽ¥å£

### ç¬¬ä¸€æ­¥ï¼šå®šä¹‰è‡ªå®šä¹‰ Generate å‡½æ•°

```python
# custom_generate.py
async def custom_generate(args, samples, evaluation=False):
    """å¸¦å·¥å…·è°ƒç”¨çš„å¤šè½®ç”Ÿæˆã€‚"""
    for sample in samples:
        conversation = sample.prompt

        for turn in range(args.max_turns):
            # ç”Ÿæˆå“åº”
            response = await generate_single(conversation)

            # æ£€æŸ¥å·¥å…·è°ƒç”¨
            tool_call = extract_tool_call(response)
            if tool_call:
                tool_result = execute_tool(tool_call)
                conversation.append({"role": "assistant", "content": response})
                conversation.append({"role": "tool", "content": tool_result})
            else:
                break

        sample.response = response
        sample.reward = compute_reward(sample)

    return samples
```

### ç¬¬äºŒæ­¥ï¼šä½¿ç”¨è‡ªå®šä¹‰å‡½æ•°å¯åŠ¨

```bash
python train.py \
    --custom-generate-function-path custom_generate.py \
    --max-turns 5 \
    --prompt-data /path/to/agent_data.jsonl \
    ${MODEL_ARGS[@]}
```

å®Œæ•´çš„å¤šè½®æœç´¢ç¤ºä¾‹è¯·å‚è§ `examples/search-r1/`ã€‚

---

## é…ç½®å‚è€ƒ

### ä¸‰ç±»å‚æ•°

slime ä½¿ç”¨ä¸‰ç§ç±»åž‹çš„å‚æ•°ï¼š

**1. Megatron å‚æ•°**ï¼ˆç›´æŽ¥ä¼ å…¥ï¼‰ï¼š
```bash
--tensor-model-parallel-size 2
--pipeline-model-parallel-size 1
--num-layers 32
--hidden-size 4096
```

**2. SGLang å‚æ•°**ï¼ˆä»¥ `--sglang-` ä¸ºå‰ç¼€ï¼‰ï¼š
```bash
--sglang-mem-fraction-static 0.8
--sglang-context-length 8192
--sglang-log-level INFO
```

**3. slime å‚æ•°**ï¼š
```bash
# èµ„æºåˆ†é…
--actor-num-nodes 1
--actor-num-gpus-per-node 8
--rollout-num-gpus 8
--colocate  # è®­ç»ƒä¸ŽæŽ¨ç†å…±äº« GPU

# æ•°æ®
--prompt-data /path/to/data.jsonl
--input-key prompt
--label-key label

# è®­ç»ƒå¾ªçŽ¯
--num-rollout 3000
--rollout-batch-size 32
--n-samples-per-prompt 8
--global-batch-size 256

# ç®—æ³•
--advantage-estimator grpo  # æˆ–ï¼šgspo, ppo, reinforce_plus_plus
--use-kl-loss
--kl-loss-coef 0.001
```

### å…³é”®çº¦æŸ

```
rollout_batch_size Ã— n_samples_per_prompt = global_batch_size Ã— num_steps_per_rollout
```

ç¤ºä¾‹ï¼š32 Ã— 8 = 256 Ã— 1

---

## æ•°æ®ç¼“å†²åŒºç³»ç»Ÿ

slime çš„æ•°æ®ç¼“å†²åŒºæ”¯æŒçµæ´»çš„æ•°æ®ç®¡ç†ï¼š

### åŸºç¡€æ•°æ®æº

```python
class RolloutDataSource:
    def get_samples(self, num_samples):
        """ä»Žæ•°æ®é›†ä¸­èŽ·å– promptã€‚"""
        return self.dataset.sample(num_samples)

    def add_samples(self, samples):
        """ç”ŸæˆåŽè°ƒç”¨ï¼ˆé»˜è®¤ä¸ºç©ºæ“ä½œï¼‰ã€‚"""
        pass
```

### å¸¦ç¼“å†²åŒºçš„æ•°æ®æºï¼ˆç¦»çº¿ç­–ç•¥ï¼‰

```python
class RolloutDataSourceWithBuffer(RolloutDataSource):
    def __init__(self):
        self.buffer = []

    def add_samples(self, samples):
        """å­˜å‚¨å·²ç”Ÿæˆçš„æ ·æœ¬ä»¥ä¾›å¤ç”¨ã€‚"""
        self.buffer.extend(samples)

    def buffer_filter(self, args, buffer, num_samples):
        """è‡ªå®šä¹‰é€‰æ‹©é€»è¾‘ï¼ˆä¼˜å…ˆçº§ã€åˆ†å±‚ç­‰ï¼‰ã€‚"""
        return select_best(buffer, num_samples)
```

---

## å¸¸è§é—®é¢˜ä¸Žè§£å†³æ–¹æ¡ˆ

### é—®é¢˜ï¼šSGLang å¼•æ“Žå´©æºƒ

**çŽ°è±¡**ï¼šæŽ¨ç†å¼•æ“Žåœ¨è®­ç»ƒä¸­é€”é€€å‡º

**è§£å†³æ–¹æ¡ˆ**ï¼š
```bash
# å¯ç”¨å®¹é”™
--use-fault-tolerance

# å¢žåŠ å†…å­˜åˆ†é…
--sglang-mem-fraction-static 0.85

# å‡å°æ‰¹å¤§å°
--rollout-batch-size 16
```

### é—®é¢˜ï¼šæƒé‡åŒæ­¥è¶…æ—¶

**çŽ°è±¡**ï¼šrollout åŽè®­ç»ƒæŒ‚èµ·

**è§£å†³æ–¹æ¡ˆ**ï¼š
```bash
# å¢žå¤§åŒæ­¥é—´éš”
--update-weights-interval 5

# ä½¿ç”¨ colocate æ¨¡å¼ï¼ˆæ— ç½‘ç»œä¼ è¾“ï¼‰
--colocate
```

### é—®é¢˜ï¼šè®­ç»ƒæ—¶ OOM

**çŽ°è±¡**ï¼šåå‘ä¼ æ’­æ—¶ CUDA OOM

**è§£å†³æ–¹æ¡ˆ**ï¼š
```bash
# å¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹
--recompute-activations

# å‡å° micro-batch å¤§å°
--micro-batch-size 1

# å¯ç”¨åºåˆ—å¹¶è¡Œ
--sequence-parallel
```

### é—®é¢˜ï¼šæ•°æ®åŠ è½½ç¼“æ…¢

**çŽ°è±¡**ï¼šæ•°æ®èŽ·å–æœŸé—´ GPU ç©ºé—²

**è§£å†³æ–¹æ¡ˆ**ï¼š
```bash
# å¢žåŠ æ•°æ® worker æ•°é‡
--num-data-workers 4

# ä½¿ç”¨æµå¼æ•°æ®é›†
--streaming-data
```

---

## æ”¯æŒçš„æ¨¡åž‹

| æ¨¡åž‹ç³»åˆ— | é…ç½® |
|--------------|----------------|
| GLM | GLM-4.5ã€GLM-4.6ã€GLM-4.7ã€GLM-Z1-9B |
| Qwen | Qwen3ï¼ˆ4Bã€8Bã€30B-A3Bï¼‰ã€Qwen3-MoEã€Qwen2.5 |
| DeepSeek | V3ã€V3.1ã€R1 |
| Llama | Llama 3ï¼ˆ8Bã€70Bï¼‰ |
| å…¶ä»– | Kimi K2ã€Moonlight-16B |

æ¯ä¸ªæ¨¡åž‹åœ¨ `scripts/models/` ä¸­å‡æœ‰é¢„é…ç½®è„šæœ¬ã€‚

---

## è¿›é˜¶ä¸»é¢˜

### Co-location æ¨¡å¼

è®­ç»ƒä¸ŽæŽ¨ç†å…±äº« GPU ä»¥å‡å°‘å†…å­˜å ç”¨ï¼š

```bash
python train.py \
    --colocate \
    --actor-num-gpus-per-node 8 \
    --sglang-mem-fraction-static 0.4 \
    ${MODEL_ARGS[@]}
```

### è‡ªå®šä¹‰å¥–åŠ±æ¨¡åž‹

```python
# custom_rm.py
class CustomRewardModel:
    def __init__(self, model_path):
        self.model = load_model(model_path)

    def compute_reward(self, prompts, responses):
        inputs = self.tokenize(prompts, responses)
        scores = self.model(inputs)
        return scores.tolist()
```

```bash
--custom-rm-path custom_rm.py
```

### å¤šä»»åŠ¡è¯„ä¼°

```bash
--eval-prompt-data aime /path/to/aime.jsonl \
--eval-prompt-data gsm8k /path/to/gsm8k.jsonl \
--n-samples-per-eval-prompt 16
```

---

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://thudm.github.io/slime/
- **GitHub**ï¼šhttps://github.com/THUDM/slime
- **åšå®¢**ï¼šhttps://lmsys.org/blog/2025-07-09-slime/
- **ç¤ºä¾‹**ï¼šå‚è§ `examples/` ç›®å½•ï¼ŒåŒ…å« 14+ ä¸ªå®Œæ•´ç¤ºä¾‹