---
title: "Peft Fine Tuning â€” ä½¿ç”¨ LoRAã€QLoRA åŠ 25+ ç§æ–¹æ³•å¯¹ LLM è¿›è¡Œå‚æ•°é«˜æ•ˆå¾®è°ƒ"
sidebar_label: "Peft Fine Tuning"
description: "ä½¿ç”¨ LoRAã€QLoRA åŠ 25+ ç§æ–¹æ³•å¯¹ LLM è¿›è¡Œå‚æ•°é«˜æ•ˆå¾®è°ƒ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Peft Fine Tuning

ä½¿ç”¨ LoRAã€QLoRA åŠ 25+ ç§æ–¹æ³•å¯¹ LLM è¿›è¡Œå‚æ•°é«˜æ•ˆå¾®è°ƒï¼ˆParameter-efficient fine-tuningï¼‰ã€‚é€‚ç”¨åœºæ™¯ï¼šåœ¨æ˜¾å­˜æœ‰é™çš„æƒ…å†µä¸‹å¾®è°ƒå¤§åž‹æ¨¡åž‹ï¼ˆ7Bâ€“70Bï¼‰ã€éœ€è¦ä»¥æžä½Žç²¾åº¦æŸå¤±è®­ç»ƒä¸è¶³ 1% çš„å‚æ•°ï¼Œæˆ–ç”¨äºŽå¤šé€‚é…å™¨ï¼ˆmulti-adapterï¼‰æœåŠ¡ã€‚HuggingFace å®˜æ–¹åº“ï¼Œä¸Ž transformers ç”Ÿæ€æ·±åº¦é›†æˆã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/peft` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/peft` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `peft>=0.13.0`, `transformers>=4.45.0`, `torch>=2.0.0`, `bitsandbytes>=0.43.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Fine-Tuning`, `PEFT`, `LoRA`, `QLoRA`, `Parameter-Efficient`, `Adapters`, `Low-Rank`, `Memory Optimization`, `Multi-Adapter` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# PEFTï¼ˆå‚æ•°é«˜æ•ˆå¾®è°ƒï¼‰

é€šè¿‡ LoRAã€QLoRA åŠ 25+ ç§é€‚é…å™¨æ–¹æ³•ï¼Œä»…è®­ç»ƒä¸è¶³ 1% çš„å‚æ•°æ¥å¾®è°ƒ LLMã€‚

## ä½•æ—¶ä½¿ç”¨ PEFT

**åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨ PEFT/LoRAï¼š**
- åœ¨æ¶ˆè´¹çº§ GPUï¼ˆRTX 4090ã€A100ï¼‰ä¸Šå¾®è°ƒ 7Bâ€“70B æ¨¡åž‹
- éœ€è¦è®­ç»ƒä¸è¶³ 1% çš„å‚æ•°ï¼ˆ6MB é€‚é…å™¨ vs 14GB å®Œæ•´æ¨¡åž‹ï¼‰
- å¸Œæœ›é€šè¿‡å¤šä¸ªä»»åŠ¡ä¸“å±žé€‚é…å™¨å¿«é€Ÿè¿­ä»£
- ä»Žå•ä¸€åŸºç¡€æ¨¡åž‹éƒ¨ç½²å¤šä¸ªå¾®è°ƒå˜ä½“

**åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨ QLoRAï¼ˆPEFT + é‡åŒ–ï¼‰ï¼š**
- åœ¨å•å¼  24GB GPU ä¸Šå¾®è°ƒ 70B æ¨¡åž‹
- æ˜¾å­˜æ˜¯ä¸»è¦ç“¶é¢ˆ
- å¯æŽ¥å—ç›¸æ¯”å®Œæ•´å¾®è°ƒçº¦ 5% çš„è´¨é‡æŸå¤±

**åœ¨ä»¥ä¸‹æƒ…å†µæ”¹ç”¨å®Œæ•´å¾®è°ƒï¼š**
- è®­ç»ƒå°åž‹æ¨¡åž‹ï¼ˆå‚æ•°é‡ < 1Bï¼‰
- éœ€è¦æœ€é«˜è´¨é‡ä¸”æœ‰å……è¶³ç®—åŠ›é¢„ç®—
- æ˜¾è‘—çš„é¢†åŸŸåç§»éœ€è¦æ›´æ–°å…¨éƒ¨æƒé‡

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# åŸºç¡€å®‰è£…
pip install peft

# å«é‡åŒ–æ”¯æŒï¼ˆæŽ¨èï¼‰
pip install peft bitsandbytes

# å®Œæ•´å·¥å…·æ ˆ
pip install peft transformers accelerate bitsandbytes datasets
```

### LoRA å¾®è°ƒï¼ˆæ ‡å‡†æ–¹å¼ï¼‰

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer
from peft import get_peft_model, LoraConfig, TaskType
from datasets import load_dataset

# åŠ è½½åŸºç¡€æ¨¡åž‹
model_name = "meta-llama/Llama-3.1-8B"
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# LoRA é…ç½®
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                          # ç§©ï¼ˆRankï¼‰ï¼ŒèŒƒå›´ 8-64ï¼Œè¶Šé«˜å®¹é‡è¶Šå¤§
    lora_alpha=32,                 # ç¼©æ”¾å› å­ï¼ˆé€šå¸¸ä¸º 2*rï¼‰
    lora_dropout=0.05,             # æ­£åˆ™åŒ– dropout
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],  # æ³¨æ„åŠ›å±‚
    bias="none"                    # ä¸è®­ç»ƒåç½®é¡¹
)

# åº”ç”¨ LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# è¾“å‡ºï¼štrainable params: 13,631,488 || all params: 8,043,307,008 || trainable%: 0.17%

# å‡†å¤‡æ•°æ®é›†
dataset = load_dataset("databricks/databricks-dolly-15k", split="train")

def tokenize(example):
    text = f"### Instruction:\n{example['instruction']}\n\n### Response:\n{example['response']}"
    return tokenizer(text, truncation=True, max_length=512, padding="max_length")

tokenized = dataset.map(tokenize, remove_columns=dataset.column_names)

# è®­ç»ƒ
training_args = TrainingArguments(
    output_dir="./lora-llama",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    fp16=True,
    logging_steps=10,
    save_strategy="epoch"
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized,
    data_collator=lambda data: {"input_ids": torch.stack([f["input_ids"] for f in data]),
                                 "attention_mask": torch.stack([f["attention_mask"] for f in data]),
                                 "labels": torch.stack([f["input_ids"] for f in data])}
)

trainer.train()

# ä»…ä¿å­˜é€‚é…å™¨ï¼ˆ6MB vs 16GBï¼‰
model.save_pretrained("./lora-llama-adapter")
```

### QLoRA å¾®è°ƒï¼ˆæ˜¾å­˜é«˜æ•ˆæ–¹å¼ï¼‰

```python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training

# 4-bit é‡åŒ–é…ç½®
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",           # NormalFloat4ï¼ˆæœ€é€‚åˆ LLMï¼‰
    bnb_4bit_compute_dtype="bfloat16",   # ä»¥ bf16 è®¡ç®—
    bnb_4bit_use_double_quant=True       # åµŒå¥—é‡åŒ–
)

# åŠ è½½é‡åŒ–æ¨¡åž‹
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-70B",
    quantization_config=bnb_config,
    device_map="auto"
)

# ä¸ºè®­ç»ƒåšå‡†å¤‡ï¼ˆå¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹ï¼‰
model = prepare_model_for_kbit_training(model)

# QLoRA çš„ LoRA é…ç½®
lora_config = LoraConfig(
    r=64,                              # 70B æ¨¡åž‹ä½¿ç”¨æ›´é«˜ç§©
    lora_alpha=128,
    lora_dropout=0.1,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    bias="none",
    task_type="CAUSAL_LM"
)

model = get_peft_model(model, lora_config)
# 70B æ¨¡åž‹çŽ°åœ¨å¯åœ¨å•å¼  24GB GPU ä¸Šè¿è¡Œï¼
```

## LoRA å‚æ•°é€‰æ‹©

### ç§©ï¼ˆrï¼‰â€”â€”å®¹é‡ä¸Žæ•ˆçŽ‡çš„æƒè¡¡

| ç§© | å¯è®­ç»ƒå‚æ•°é‡ | æ˜¾å­˜ | è´¨é‡ | é€‚ç”¨åœºæ™¯ |
|------|-----------------|--------|---------|----------|
| 4 | ~3M | æžä½Ž | è¾ƒä½Ž | ç®€å•ä»»åŠ¡ã€åŽŸåž‹éªŒè¯ |
| **8** | ~7M | ä½Ž | è‰¯å¥½ | **æŽ¨èèµ·å§‹ç‚¹** |
| **16** | ~14M | ä¸­ç­‰ | æ›´å¥½ | **é€šç”¨å¾®è°ƒ** |
| 32 | ~27M | è¾ƒé«˜ | é«˜ | å¤æ‚ä»»åŠ¡ |
| 64 | ~54M | é«˜ | æœ€é«˜ | é¢†åŸŸé€‚é…ã€70B æ¨¡åž‹ |

### Alphaï¼ˆlora_alphaï¼‰â€”â€”ç¼©æ”¾å› å­

```python
# ç»éªŒæ³•åˆ™ï¼šalpha = 2 * rank
LoraConfig(r=16, lora_alpha=32)  # æ ‡å‡†
LoraConfig(r=16, lora_alpha=16)  # ä¿å®ˆï¼ˆå­¦ä¹ çŽ‡æ•ˆæžœè¾ƒä½Žï¼‰
LoraConfig(r=16, lora_alpha=64)  # æ¿€è¿›ï¼ˆå­¦ä¹ çŽ‡æ•ˆæžœè¾ƒé«˜ï¼‰
```

### æŒ‰æž¶æž„é€‰æ‹©ç›®æ ‡æ¨¡å—

```python
# Llama / Mistral / Qwen
target_modules = ["q_proj", "v_proj", "k_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]

# GPT-2 / GPT-Neo
target_modules = ["c_attn", "c_proj", "c_fc"]

# Falcon
target_modules = ["query_key_value", "dense", "dense_h_to_4h", "dense_4h_to_h"]

# BLOOM
target_modules = ["query_key_value", "dense", "dense_h_to_4h", "dense_4h_to_h"]

# è‡ªåŠ¨æ£€æµ‹æ‰€æœ‰çº¿æ€§å±‚
target_modules = "all-linear"  # PEFT 0.6.0+
```

## åŠ è½½ä¸Žåˆå¹¶é€‚é…å™¨

### åŠ è½½å·²è®­ç»ƒçš„é€‚é…å™¨

```python
from peft import PeftModel, AutoPeftModelForCausalLM
from transformers import AutoModelForCausalLM

# æ–¹å¼ä¸€ï¼šä½¿ç”¨ PeftModel åŠ è½½
base_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B")
model = PeftModel.from_pretrained(base_model, "./lora-llama-adapter")

# æ–¹å¼äºŒï¼šç›´æŽ¥åŠ è½½ï¼ˆæŽ¨èï¼‰
model = AutoPeftModelForCausalLM.from_pretrained(
    "./lora-llama-adapter",
    device_map="auto"
)
```

### å°†é€‚é…å™¨åˆå¹¶åˆ°åŸºç¡€æ¨¡åž‹

```python
# åˆå¹¶ä»¥ç”¨äºŽéƒ¨ç½²ï¼ˆæ— é€‚é…å™¨å¼€é”€ï¼‰
merged_model = model.merge_and_unload()

# ä¿å­˜åˆå¹¶åŽçš„æ¨¡åž‹
merged_model.save_pretrained("./llama-merged")
tokenizer.save_pretrained("./llama-merged")

# æŽ¨é€åˆ° Hub
merged_model.push_to_hub("username/llama-finetuned")
```

### å¤šé€‚é…å™¨æœåŠ¡

```python
from peft import PeftModel

# åŠ è½½åŸºç¡€æ¨¡åž‹åŠç¬¬ä¸€ä¸ªé€‚é…å™¨
model = AutoPeftModelForCausalLM.from_pretrained("./adapter-task1")

# åŠ è½½é¢å¤–é€‚é…å™¨
model.load_adapter("./adapter-task2", adapter_name="task2")
model.load_adapter("./adapter-task3", adapter_name="task3")

# è¿è¡Œæ—¶åˆ‡æ¢é€‚é…å™¨
model.set_adapter("task1")  # ä½¿ç”¨ task1 é€‚é…å™¨
output1 = model.generate(**inputs)

model.set_adapter("task2")  # åˆ‡æ¢åˆ° task2
output2 = model.generate(**inputs)

# ç¦ç”¨é€‚é…å™¨ï¼ˆä½¿ç”¨åŸºç¡€æ¨¡åž‹ï¼‰
with model.disable_adapter():
    base_output = model.generate(**inputs)
```

## PEFT æ–¹æ³•å¯¹æ¯”

| æ–¹æ³• | å¯è®­ç»ƒå‚æ•°å æ¯” | æ˜¾å­˜ | é€Ÿåº¦ | æœ€é€‚åœºæ™¯ |
|--------|------------|--------|-------|----------|
| **LoRA** | 0.1â€“1% | ä½Ž | å¿« | é€šç”¨å¾®è°ƒ |
| **QLoRA** | 0.1â€“1% | æžä½Ž | ä¸­ç­‰ | æ˜¾å­˜å—é™åœºæ™¯ |
| AdaLoRA | 0.1â€“1% | ä½Ž | ä¸­ç­‰ | è‡ªåŠ¨ç§©é€‰æ‹© |
| IA3 | 0.01% | æžå° | æœ€å¿« | å°‘æ ·æœ¬é€‚é… |
| Prefix Tuning | 0.1% | ä½Ž | ä¸­ç­‰ | ç”ŸæˆæŽ§åˆ¶ |
| Prompt Tuning | 0.001% | æžå° | å¿« | ç®€å•ä»»åŠ¡é€‚é… |
| P-Tuning v2 | 0.1% | ä½Ž | ä¸­ç­‰ | NLU ä»»åŠ¡ |

### IA3ï¼ˆæœ€å°‘å‚æ•°ï¼‰

```python
from peft import IA3Config

ia3_config = IA3Config(
    target_modules=["q_proj", "v_proj", "k_proj", "down_proj"],
    feedforward_modules=["down_proj"]
)
model = get_peft_model(model, ia3_config)
# ä»…è®­ç»ƒ 0.01% çš„å‚æ•°ï¼
```

### Prefix Tuning

```python
from peft import PrefixTuningConfig

prefix_config = PrefixTuningConfig(
    task_type="CAUSAL_LM",
    num_virtual_tokens=20,      # å‰ç½® token æ•°é‡
    prefix_projection=True       # ä½¿ç”¨ MLP æŠ•å½±
)
model = get_peft_model(model, prefix_config)
```

## é›†æˆæ¨¡å¼

### ä¸Ž TRLï¼ˆSFTTrainerï¼‰é›†æˆ

```python
from trl import SFTTrainer, SFTConfig
from peft import LoraConfig

lora_config = LoraConfig(r=16, lora_alpha=32, target_modules="all-linear")

trainer = SFTTrainer(
    model=model,
    args=SFTConfig(output_dir="./output", max_seq_length=512),
    train_dataset=dataset,
    peft_config=lora_config,  # ç›´æŽ¥ä¼ å…¥ LoRA é…ç½®
)
trainer.train()
```

### ä¸Ž Axolotlï¼ˆYAML é…ç½®ï¼‰é›†æˆ

```yaml
# axolotl config.yaml
adapter: lora
lora_r: 16
lora_alpha: 32
lora_dropout: 0.05
lora_target_modules:
  - q_proj
  - v_proj
  - k_proj
  - o_proj
lora_target_linear: true  # é’ˆå¯¹æ‰€æœ‰çº¿æ€§å±‚
```

### ä¸Ž vLLMï¼ˆæŽ¨ç†ï¼‰é›†æˆ

```python
from vllm import LLM
from vllm.lora.request import LoRARequest

# åŠ è½½æ”¯æŒ LoRA çš„åŸºç¡€æ¨¡åž‹
llm = LLM(model="meta-llama/Llama-3.1-8B", enable_lora=True)

# ä½¿ç”¨é€‚é…å™¨è¿›è¡ŒæŽ¨ç†
outputs = llm.generate(
    prompts,
    lora_request=LoRARequest("adapter1", 1, "./lora-adapter")
)
```

## æ€§èƒ½åŸºå‡†

### æ˜¾å­˜å ç”¨ï¼ˆLlama 3.1 8Bï¼‰

| æ–¹æ³• | GPU æ˜¾å­˜ | å¯è®­ç»ƒå‚æ•°é‡ |
|--------|-----------|------------------|
| å®Œæ•´å¾®è°ƒ | 60+ GB | 8Bï¼ˆ100%ï¼‰ |
| LoRA r=16 | 18 GB | 14Mï¼ˆ0.17%ï¼‰ |
| QLoRA r=16 | 6 GB | 14Mï¼ˆ0.17%ï¼‰ |
| IA3 | 16 GB | 800Kï¼ˆ0.01%ï¼‰ |

### è®­ç»ƒé€Ÿåº¦ï¼ˆA100 80GBï¼‰

| æ–¹æ³• | Tokens/ç§’ | ç›¸å¯¹å®Œæ•´å¾®è°ƒ |
|--------|-----------|------------|
| å®Œæ•´å¾®è°ƒ | 2,500 | 1x |
| LoRA | 3,200 | 1.3x |
| QLoRA | 2,100 | 0.84x |

### è´¨é‡ï¼ˆMMLU åŸºå‡†ï¼‰

| æ¨¡åž‹ | å®Œæ•´å¾®è°ƒ | LoRA | QLoRA |
|-------|---------|------|-------|
| Llama 2-7B | 45.3 | 44.8 | 44.1 |
| Llama 2-13B | 54.8 | 54.2 | 53.5 |

## å¸¸è§é—®é¢˜

### è®­ç»ƒæ—¶ CUDA æ˜¾å­˜ä¸è¶³ï¼ˆOOMï¼‰

```python
# æ–¹æ¡ˆä¸€ï¼šå¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹
model.gradient_checkpointing_enable()

# æ–¹æ¡ˆäºŒï¼šå‡å°æ‰¹å¤§å° + å¢žå¤§æ¢¯åº¦ç´¯ç§¯æ­¥æ•°
TrainingArguments(
    per_device_train_batch_size=1,
    gradient_accumulation_steps=16
)

# æ–¹æ¡ˆä¸‰ï¼šä½¿ç”¨ QLoRA
from transformers import BitsAndBytesConfig
bnb_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4")
```

### é€‚é…å™¨æœªç”Ÿæ•ˆ

```python
# éªŒè¯é€‚é…å™¨æ˜¯å¦æ¿€æ´»
print(model.active_adapters)  # åº”æ˜¾ç¤ºé€‚é…å™¨åç§°

# æ£€æŸ¥å¯è®­ç»ƒå‚æ•°
model.print_trainable_parameters()

# ç¡®ä¿æ¨¡åž‹å¤„äºŽè®­ç»ƒæ¨¡å¼
model.train()
```

### è´¨é‡ä¸‹é™

```python
# æé«˜ç§©
LoraConfig(r=32, lora_alpha=64)

# é’ˆå¯¹æ›´å¤šæ¨¡å—
target_modules = "all-linear"

# ä½¿ç”¨æ›´å¤šè®­ç»ƒæ•°æ®å’Œæ›´å¤šè½®æ¬¡
TrainingArguments(num_train_epochs=5)

# é™ä½Žå­¦ä¹ çŽ‡
TrainingArguments(learning_rate=1e-4)
```

## æœ€ä½³å®žè·µ

1. **ä»Ž r=8â€“16 å¼€å§‹**ï¼Œè´¨é‡ä¸è¶³æ—¶å†æé«˜
2. **ä»¥ alpha = 2 * rank ä¸ºèµ·å§‹ç‚¹**
3. **åŒæ—¶é’ˆå¯¹æ³¨æ„åŠ›å±‚å’Œ MLP å±‚**ä»¥èŽ·å¾—æœ€ä½³è´¨é‡/æ•ˆçŽ‡æ¯”
4. **å¯ç”¨æ¢¯åº¦æ£€æŸ¥ç‚¹**ä»¥èŠ‚çœæ˜¾å­˜
5. **é¢‘ç¹ä¿å­˜é€‚é…å™¨**ï¼ˆæ–‡ä»¶å°ï¼Œä¾¿äºŽå›žæ»šï¼‰
6. **åˆå¹¶å‰åœ¨ç•™å‡ºæ•°æ®ä¸Šè¯„ä¼°**
7. **70B+ æ¨¡åž‹åœ¨æ¶ˆè´¹çº§ç¡¬ä»¶ä¸Šä½¿ç”¨ QLoRA**

## å‚è€ƒèµ„æ–™

- **[é«˜çº§ç”¨æ³•](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/peft/references/advanced-usage.md)** â€” DoRAã€LoftQã€ç§©ç¨³å®šåŒ–ã€è‡ªå®šä¹‰æ¨¡å—
- **[æ•…éšœæŽ’æŸ¥](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/peft/references/troubleshooting.md)** â€” å¸¸è§é”™è¯¯ã€è°ƒè¯•ã€ä¼˜åŒ–

## èµ„æº

- **GitHub**ï¼šhttps://github.com/huggingface/peft
- **æ–‡æ¡£**ï¼šhttps://huggingface.co/docs/peft
- **LoRA è®ºæ–‡**ï¼šarXiv:2106.09685
- **QLoRA è®ºæ–‡**ï¼šarXiv:2305.14314
- **æ¨¡åž‹**ï¼šhttps://huggingface.co/models?library=peft
