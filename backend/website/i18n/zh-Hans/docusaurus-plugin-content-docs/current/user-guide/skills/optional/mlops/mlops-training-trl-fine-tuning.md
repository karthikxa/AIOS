---
title: "ä½¿ç”¨ TRL è¿›è¡Œå¾®è°ƒ â€” TRLï¼šé¢å‘ LLM RLHF çš„ SFTã€DPOã€PPOã€GRPO åŠå¥–åŠ±å»ºæ¨¡"
sidebar_label: "ä½¿ç”¨ TRL è¿›è¡Œå¾®è°ƒ"
description: "TRLï¼šé¢å‘ LLM RLHF çš„ SFTã€DPOã€PPOã€GRPO åŠå¥–åŠ±å»ºæ¨¡"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# ä½¿ç”¨ TRL è¿›è¡Œå¾®è°ƒ

TRLï¼šé¢å‘ LLM RLHF çš„ SFTã€DPOã€PPOã€GRPO åŠå¥–åŠ±å»ºæ¨¡ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/trl-fine-tuning` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/training/trl-fine-tuning` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `trl`, `transformers`, `datasets`, `peft`, `accelerate`, `torch` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Post-Training`, `TRL`, `Reinforcement Learning`, `Fine-Tuning`, `SFT`, `DPO`, `PPO`, `GRPO`, `RLHF`, `Preference Alignment`, `HuggingFace` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# TRL - Transformer Reinforcement Learning

## å¿«é€Ÿå¼€å§‹

TRL æä¾›ç”¨äºŽå°†è¯­è¨€æ¨¡åž‹ä¸Žäººç±»åå¥½å¯¹é½çš„åŽè®­ç»ƒï¼ˆpost-trainingï¼‰æ–¹æ³•ã€‚

**å®‰è£…**ï¼š
```bash
pip install trl transformers datasets peft accelerate
```

**ç›‘ç£å¾®è°ƒï¼ˆSFTï¼‰**ï¼ˆæŒ‡ä»¤å¾®è°ƒï¼‰ï¼š
```python
from trl import SFTTrainer

trainer = SFTTrainer(
    model="Qwen/Qwen2.5-0.5B",
    train_dataset=dataset,  # Prompt-completion pairs
)
trainer.train()
```

**DPO**ï¼ˆåå¥½å¯¹é½ï¼‰ï¼š
```python
from trl import DPOTrainer, DPOConfig

config = DPOConfig(output_dir="model-dpo", beta=0.1)
trainer = DPOTrainer(
    model=model,
    args=config,
    train_dataset=preference_dataset,  # chosen/rejected pairs
    processing_class=tokenizer
)
trainer.train()
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šå®Œæ•´ RLHF æµæ°´çº¿ï¼ˆSFT â†’ å¥–åŠ±æ¨¡åž‹ â†’ PPOï¼‰

ä»ŽåŸºç¡€æ¨¡åž‹åˆ°äººç±»å¯¹é½æ¨¡åž‹çš„å®Œæ•´æµæ°´çº¿ã€‚

å¤åˆ¶æ­¤æ£€æŸ¥æ¸…å•ï¼š

```
RLHF Training:
- [ ] Step 1: Supervised fine-tuning (SFT)
- [ ] Step 2: Train reward model
- [ ] Step 3: PPO reinforcement learning
- [ ] Step 4: Evaluate aligned model
```

**ç¬¬ 1 æ­¥ï¼šç›‘ç£å¾®è°ƒ**

åœ¨æŒ‡ä»¤è·Ÿéšæ•°æ®ä¸Šè®­ç»ƒåŸºç¡€æ¨¡åž‹ï¼š

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset

# Load model
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-0.5B")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-0.5B")

# Load instruction dataset
dataset = load_dataset("trl-lib/Capybara", split="train")

# Configure training
training_args = SFTConfig(
    output_dir="Qwen2.5-0.5B-SFT",
    per_device_train_batch_size=4,
    num_train_epochs=1,
    learning_rate=2e-5,
    logging_steps=10,
    save_strategy="epoch"
)

# Train
trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    tokenizer=tokenizer
)
trainer.train()
trainer.save_model()
```

**ç¬¬ 2 æ­¥ï¼šè®­ç»ƒå¥–åŠ±æ¨¡åž‹**

è®­ç»ƒæ¨¡åž‹ä»¥é¢„æµ‹äººç±»åå¥½ï¼š

```python
from transformers import AutoModelForSequenceClassification
from trl import RewardTrainer, RewardConfig

# Load SFT model as base
model = AutoModelForSequenceClassification.from_pretrained(
    "Qwen2.5-0.5B-SFT",
    num_labels=1  # Single reward score
)
tokenizer = AutoTokenizer.from_pretrained("Qwen2.5-0.5B-SFT")

# Load preference data (chosen/rejected pairs)
dataset = load_dataset("trl-lib/ultrafeedback_binarized", split="train")

# Configure training
training_args = RewardConfig(
    output_dir="Qwen2.5-0.5B-Reward",
    per_device_train_batch_size=2,
    num_train_epochs=1,
    learning_rate=1e-5
)

# Train reward model
trainer = RewardTrainer(
    model=model,
    args=training_args,
    processing_class=tokenizer,
    train_dataset=dataset
)
trainer.train()
trainer.save_model()
```

**ç¬¬ 3 æ­¥ï¼šPPO å¼ºåŒ–å­¦ä¹ **

ä½¿ç”¨å¥–åŠ±æ¨¡åž‹ä¼˜åŒ–ç­–ç•¥ï¼š

```bash
python -m trl.scripts.ppo \
    --model_name_or_path Qwen2.5-0.5B-SFT \
    --reward_model_path Qwen2.5-0.5B-Reward \
    --dataset_name trl-internal-testing/descriptiveness-sentiment-trl-style \
    --output_dir Qwen2.5-0.5B-PPO \
    --learning_rate 3e-6 \
    --per_device_train_batch_size 64 \
    --total_episodes 10000
```

**ç¬¬ 4 æ­¥ï¼šè¯„ä¼°**

```python
from transformers import pipeline

# Load aligned model
generator = pipeline("text-generation", model="Qwen2.5-0.5B-PPO")

# Test
prompt = "Explain quantum computing to a 10-year-old"
output = generator(prompt, max_length=200)[0]["generated_text"]
print(output)
```

### å·¥ä½œæµ 2ï¼šä½¿ç”¨ DPO è¿›è¡Œç®€å•åå¥½å¯¹é½

æ— éœ€å¥–åŠ±æ¨¡åž‹å³å¯å¯¹é½æ¨¡åž‹åå¥½ã€‚

å¤åˆ¶æ­¤æ£€æŸ¥æ¸…å•ï¼š

```
DPO Training:
- [ ] Step 1: Prepare preference dataset
- [ ] Step 2: Configure DPO
- [ ] Step 3: Train with DPOTrainer
- [ ] Step 4: Evaluate alignment
```

**ç¬¬ 1 æ­¥ï¼šå‡†å¤‡åå¥½æ•°æ®é›†**

æ•°æ®é›†æ ¼å¼ï¼š
```json
{
  "prompt": "What is the capital of France?",
  "chosen": "The capital of France is Paris.",
  "rejected": "I don't know."
}
```

åŠ è½½æ•°æ®é›†ï¼š
```python
from datasets import load_dataset

dataset = load_dataset("trl-lib/ultrafeedback_binarized", split="train")
# Or load your own
# dataset = load_dataset("json", data_files="preferences.json")
```

**ç¬¬ 2 æ­¥ï¼šé…ç½® DPO**

```python
from trl import DPOConfig

config = DPOConfig(
    output_dir="Qwen2.5-0.5B-DPO",
    per_device_train_batch_size=4,
    num_train_epochs=1,
    learning_rate=5e-7,
    beta=0.1,  # KL penalty strength
    max_prompt_length=512,
    max_length=1024,
    logging_steps=10
)
```

**ç¬¬ 3 æ­¥ï¼šä½¿ç”¨ DPOTrainer è®­ç»ƒ**

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import DPOTrainer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-0.5B-Instruct")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-0.5B-Instruct")

trainer = DPOTrainer(
    model=model,
    args=config,
    train_dataset=dataset,
    processing_class=tokenizer
)

trainer.train()
trainer.save_model()
```

**CLI æ›¿ä»£æ–¹å¼**ï¼š
```bash
trl dpo \
    --model_name_or_path Qwen/Qwen2.5-0.5B-Instruct \
    --dataset_name argilla/Capybara-Preferences \
    --output_dir Qwen2.5-0.5B-DPO \
    --per_device_train_batch_size 4 \
    --learning_rate 5e-7 \
    --beta 0.1
```

### å·¥ä½œæµ 3ï¼šä½¿ç”¨ GRPO è¿›è¡Œå†…å­˜é«˜æ•ˆçš„åœ¨çº¿ RL

ä»¥æœ€å°å†…å­˜å ç”¨è¿›è¡Œå¼ºåŒ–å­¦ä¹ è®­ç»ƒã€‚

å…³äºŽæ·±å…¥çš„ GRPO æŒ‡å¯¼â€”â€”å¥–åŠ±å‡½æ•°è®¾è®¡ã€å…³é”®è®­ç»ƒæ´žå¯Ÿï¼ˆæŸå¤±è¡Œä¸ºã€æ¨¡å¼å´©æºƒã€è°ƒå‚ï¼‰ä»¥åŠé«˜çº§å¤šé˜¶æ®µæ¨¡å¼â€”â€”è¯·å‚é˜… **[references/grpo-training.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/references/grpo-training.md)**ã€‚ç”Ÿäº§å°±ç»ªçš„è®­ç»ƒè„šæœ¬ä½äºŽ **[templates/basic_grpo_training.py](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/templates/basic_grpo_training.py)**ã€‚

å¤åˆ¶æ­¤æ£€æŸ¥æ¸…å•ï¼š

```
GRPO Training:
- [ ] Step 1: Define reward function
- [ ] Step 2: Configure GRPO
- [ ] Step 3: Train with GRPOTrainer
```

**ç¬¬ 1 æ­¥ï¼šå®šä¹‰å¥–åŠ±å‡½æ•°**

```python
def reward_function(completions, **kwargs):
    """
    Compute rewards for completions.

    Args:
        completions: List of generated texts

    Returns:
        List of reward scores (floats)
    """
    rewards = []
    for completion in completions:
        # Example: reward based on length and unique words
        score = len(completion.split())  # Favor longer responses
        score += len(set(completion.lower().split()))  # Reward unique words
        rewards.append(score)
    return rewards
```

æˆ–ä½¿ç”¨å¥–åŠ±æ¨¡åž‹ï¼š
```python
from transformers import pipeline

reward_model = pipeline("text-classification", model="reward-model-path")

def reward_from_model(completions, prompts, **kwargs):
    # Combine prompt + completion
    full_texts = [p + c for p, c in zip(prompts, completions)]
    # Get reward scores
    results = reward_model(full_texts)
    return [r["score"] for r in results]
```

**ç¬¬ 2 æ­¥ï¼šé…ç½® GRPO**

```python
from trl import GRPOConfig

config = GRPOConfig(
    output_dir="Qwen2-GRPO",
    per_device_train_batch_size=4,
    num_train_epochs=1,
    learning_rate=1e-5,
    num_generations=4,  # Generate 4 completions per prompt
    max_new_tokens=128
)
```

**ç¬¬ 3 æ­¥ï¼šä½¿ç”¨ GRPOTrainer è®­ç»ƒ**

```python
from datasets import load_dataset
from trl import GRPOTrainer

# Load prompt-only dataset
dataset = load_dataset("trl-lib/tldr", split="train")

trainer = GRPOTrainer(
    model="Qwen/Qwen2-0.5B-Instruct",
    reward_funcs=reward_function,  # Your reward function
    args=config,
    train_dataset=dataset
)

trainer.train()
```

**CLI**ï¼š
```bash
trl grpo \
    --model_name_or_path Qwen/Qwen2-0.5B-Instruct \
    --dataset_name trl-lib/tldr \
    --output_dir Qwen2-GRPO \
    --num_generations 4
```

## ä½•æ—¶ä½¿ç”¨ TRL åŠæ›¿ä»£æ–¹æ¡ˆ

**é€‚åˆä½¿ç”¨ TRL çš„åœºæ™¯ï¼š**
- éœ€è¦å°†æ¨¡åž‹ä¸Žäººç±»åå¥½å¯¹é½
- æ‹¥æœ‰åå¥½æ•°æ®ï¼ˆchosen/rejected å¯¹ï¼‰
- å¸Œæœ›ä½¿ç”¨å¼ºåŒ–å­¦ä¹ ï¼ˆPPOã€GRPOï¼‰
- éœ€è¦è®­ç»ƒå¥–åŠ±æ¨¡åž‹
- æ‰§è¡Œå®Œæ•´ RLHF æµæ°´çº¿

**æ–¹æ³•é€‰æ‹©**ï¼š
- **SFT**ï¼šæ‹¥æœ‰ prompt-completion å¯¹ï¼Œéœ€è¦åŸºç¡€æŒ‡ä»¤è·Ÿéš
- **DPO**ï¼šæ‹¥æœ‰åå¥½æ•°æ®ï¼Œéœ€è¦ç®€å•å¯¹é½ï¼ˆæ— éœ€å¥–åŠ±æ¨¡åž‹ï¼‰
- **PPO**ï¼šæ‹¥æœ‰å¥–åŠ±æ¨¡åž‹ï¼Œéœ€è¦å¯¹ RL è¿›è¡Œæœ€å¤§ç¨‹åº¦çš„æŽ§åˆ¶
- **GRPO**ï¼šå†…å­˜å—é™ï¼Œéœ€è¦åœ¨çº¿ RL
- **å¥–åŠ±æ¨¡åž‹**ï¼šæž„å»º RLHF æµæ°´çº¿ï¼Œéœ€è¦å¯¹ç”Ÿæˆå†…å®¹è¯„åˆ†

**æ”¹ç”¨æ›¿ä»£æ–¹æ¡ˆçš„åœºæ™¯ï¼š**
- **HuggingFace Trainer**ï¼šæ— éœ€ RL çš„åŸºç¡€å¾®è°ƒ
- **Axolotl**ï¼šåŸºäºŽ YAML çš„è®­ç»ƒé…ç½®
- **LitGPT**ï¼šæ•™å­¦ç”¨é€”ã€æžç®€å¾®è°ƒ
- **Unsloth**ï¼šå¿«é€Ÿ LoRA è®­ç»ƒ

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šDPO è®­ç»ƒæ—¶æ˜¾å­˜æº¢å‡ºï¼ˆOOMï¼‰**

å‡å°æ‰¹æ¬¡å¤§å°å’Œåºåˆ—é•¿åº¦ï¼š
```python
config = DPOConfig(
    per_device_train_batch_size=1,  # Reduce from 4
    max_length=512,  # Reduce from 1024
    gradient_accumulation_steps=8  # Maintain effective batch
)
```

æˆ–å¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹ï¼š
```python
model.gradient_checkpointing_enable()
```

**é—®é¢˜ï¼šå¯¹é½è´¨é‡å·®**

è°ƒæ•´ beta å‚æ•°ï¼š
```python
# Higher beta = more conservative (stays closer to reference)
config = DPOConfig(beta=0.5)  # Default 0.1

# Lower beta = more aggressive alignment
config = DPOConfig(beta=0.01)
```

**é—®é¢˜ï¼šå¥–åŠ±æ¨¡åž‹æ— æ³•å­¦ä¹ **

æ£€æŸ¥æŸå¤±ç±»åž‹å’Œå­¦ä¹ çŽ‡ï¼š
```python
config = RewardConfig(
    learning_rate=1e-5,  # Try different LR
    num_train_epochs=3  # Train longer
)
```

ç¡®ä¿åå¥½æ•°æ®é›†æœ‰æ˜Žç¡®çš„ä¼˜åŠ£åŒºåˆ†ï¼š
```python
# Verify dataset
print(dataset[0])
# Should have clear chosen > rejected
```

**é—®é¢˜ï¼šPPO è®­ç»ƒä¸ç¨³å®š**

è°ƒæ•´ KL ç³»æ•°ï¼š
```python
config = PPOConfig(
    kl_coef=0.1,  # Increase from 0.05
    cliprange=0.1  # Reduce from 0.2
)
```

## é«˜çº§ä¸»é¢˜

**SFT è®­ç»ƒæŒ‡å—**ï¼šå‚é˜… [references/sft-training.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/references/sft-training.md)ï¼Œäº†è§£æ•°æ®é›†æ ¼å¼ã€chat templateã€packing ç­–ç•¥åŠå¤š GPU è®­ç»ƒã€‚

**DPO å˜ä½“**ï¼šå‚é˜… [references/dpo-variants.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/references/dpo-variants.md)ï¼Œäº†è§£ IPOã€cDPOã€RPO åŠå…¶ä»– DPO æŸå¤±å‡½æ•°ä¸ŽæŽ¨èè¶…å‚æ•°ã€‚

**å¥–åŠ±å»ºæ¨¡**ï¼šå‚é˜… [references/reward-modeling.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/references/reward-modeling.md)ï¼Œäº†è§£ç»“æžœå¥–åŠ±ä¸Žè¿‡ç¨‹å¥–åŠ±ã€Bradley-Terry æŸå¤±åŠå¥–åŠ±æ¨¡åž‹è¯„ä¼°ã€‚

**åœ¨çº¿ RL æ–¹æ³•**ï¼šå‚é˜… [references/online-rl.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/references/online-rl.md)ï¼Œäº†è§£ PPOã€GRPOã€RLOO åŠ OnlineDPO çš„è¯¦ç»†é…ç½®ã€‚

**GRPO æ·±åº¦è§£æž**ï¼šå‚é˜… [references/grpo-training.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/references/grpo-training.md)ï¼ŒèŽ·å–ä¸“å®¶çº§ GRPO æ¨¡å¼â€”â€”å¥–åŠ±å‡½æ•°è®¾è®¡ç†å¿µã€è®­ç»ƒæ´žå¯Ÿï¼ˆä¸ºä½•æŸå¤±ä¸Šå‡ã€æ¨¡å¼å´©æºƒæ£€æµ‹ï¼‰ã€è¶…å‚æ•°è°ƒä¼˜ã€å¤šé˜¶æ®µè®­ç»ƒåŠæ•…éšœæŽ’æŸ¥ã€‚ç”Ÿäº§å°±ç»ªæ¨¡æ¿ä½äºŽ [templates/basic_grpo_training.py](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/training/trl-fine-tuning/templates/basic_grpo_training.py)ã€‚

## ç¡¬ä»¶è¦æ±‚

- **GPU**ï¼šNVIDIAï¼ˆéœ€è¦ CUDAï¼‰
- **æ˜¾å­˜ï¼ˆVRAMï¼‰**ï¼šå–å†³äºŽæ¨¡åž‹å’Œæ–¹æ³•
  - SFT 7Bï¼š16GBï¼ˆä½¿ç”¨ LoRAï¼‰
  - DPO 7Bï¼š24GBï¼ˆå­˜å‚¨å‚è€ƒæ¨¡åž‹ï¼‰
  - PPO 7Bï¼š40GBï¼ˆç­–ç•¥æ¨¡åž‹ + å¥–åŠ±æ¨¡åž‹ï¼‰
  - GRPO 7Bï¼š24GBï¼ˆå†…å­˜æ•ˆçŽ‡æ›´é«˜ï¼‰
- **å¤š GPU**ï¼šé€šè¿‡ `accelerate` æ”¯æŒ
- **æ··åˆç²¾åº¦**ï¼šæŽ¨è BF16ï¼ˆA100/H100ï¼‰

**å†…å­˜ä¼˜åŒ–**ï¼š
- æ‰€æœ‰æ–¹æ³•å‡å¯ä½¿ç”¨ LoRA/QLoRA
- å¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹
- ä½¿ç”¨æ›´å°çš„æ‰¹æ¬¡å¤§å°é…åˆæ¢¯åº¦ç´¯ç§¯

## èµ„æº

- æ–‡æ¡£ï¼šhttps://huggingface.co/docs/trl/
- GitHubï¼šhttps://github.com/huggingface/trl
- è®ºæ–‡ï¼š
  - "Training language models to follow instructions with human feedback"ï¼ˆInstructGPTï¼Œ2022ï¼‰
  - "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"ï¼ˆDPOï¼Œ2023ï¼‰
  - "Group Relative Policy Optimization"ï¼ˆGRPOï¼Œ2024ï¼‰
- ç¤ºä¾‹ï¼šhttps://github.com/huggingface/trl/tree/main/examples/scripts
