---
title: "Evaluating Llms Harness â€” lm-eval-harness: benchmark LLMs (MMLU, GSM8K, etc"
sidebar_label: "Evaluating Llms Harness"
description: "lm-eval-harnessï¼šå¯¹ LLM è¿›è¡ŒåŸºå‡†æµ‹è¯•ï¼ˆMMLUã€GSM8K ç­‰ï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Evaluating Llms Harness

lm-eval-harnessï¼šå¯¹ LLM è¿›è¡ŒåŸºå‡†æµ‹è¯•ï¼ˆMMLUã€GSM8K ç­‰ï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/mlops/evaluation/lm-evaluation-harness` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `lm-eval`, `transformers`, `vllm` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Evaluation`, `LM Evaluation Harness`, `Benchmarking`, `MMLU`, `HumanEval`, `GSM8K`, `EleutherAI`, `Model Quality`, `Academic Benchmarks`, `Industry Standard` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# lm-evaluation-harness - LLM åŸºå‡†æµ‹è¯•

## å†…å®¹æ¦‚è§ˆ

åœ¨ 60+ ä¸ªå­¦æœ¯åŸºå‡†ï¼ˆMMLUã€HumanEvalã€GSM8Kã€TruthfulQAã€HellaSwagï¼‰ä¸Šè¯„ä¼° LLMã€‚é€‚ç”¨äºŽåŸºå‡†æµ‹è¯•æ¨¡åž‹è´¨é‡ã€æ¯”è¾ƒæ¨¡åž‹ã€æŠ¥å‘Šå­¦æœ¯ç»“æžœæˆ–è·Ÿè¸ªè®­ç»ƒè¿›åº¦ã€‚è¡Œä¸šæ ‡å‡†å·¥å…·ï¼Œè¢« EleutherAIã€HuggingFace åŠå„å¤§å®žéªŒå®¤å¹¿æ³›ä½¿ç”¨ã€‚æ”¯æŒ HuggingFaceã€vLLM åŠ APIã€‚

## å¿«é€Ÿå¼€å§‹

lm-evaluation-harness ä½¿ç”¨æ ‡å‡†åŒ– promptï¼ˆæç¤ºè¯ï¼‰å’ŒæŒ‡æ ‡ï¼Œåœ¨ 60+ ä¸ªå­¦æœ¯åŸºå‡†ä¸Šè¯„ä¼° LLMã€‚

**å®‰è£…**ï¼š
```bash
pip install lm-eval
```

**è¯„ä¼°ä»»æ„ HuggingFace æ¨¡åž‹**ï¼š
```bash
lm_eval --model hf \
  --model_args pretrained=meta-llama/Llama-2-7b-hf \
  --tasks mmlu,gsm8k,hellaswag \
  --device cuda:0 \
  --batch_size 8
```

**æŸ¥çœ‹å¯ç”¨ä»»åŠ¡**ï¼š
```bash
lm_eval --tasks list
```

## å¸¸ç”¨å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šæ ‡å‡†åŸºå‡†è¯„ä¼°

åœ¨æ ¸å¿ƒåŸºå‡†ï¼ˆMMLUã€GSM8Kã€HumanEvalï¼‰ä¸Šè¯„ä¼°æ¨¡åž‹ã€‚

å¤åˆ¶æ­¤æ£€æŸ¥æ¸…å•ï¼š

```
åŸºå‡†è¯„ä¼°ï¼š
- [ ] æ­¥éª¤ 1ï¼šé€‰æ‹©åŸºå‡†å¥—ä»¶
- [ ] æ­¥éª¤ 2ï¼šé…ç½®æ¨¡åž‹
- [ ] æ­¥éª¤ 3ï¼šè¿è¡Œè¯„ä¼°
- [ ] æ­¥éª¤ 4ï¼šåˆ†æžç»“æžœ
```

**æ­¥éª¤ 1ï¼šé€‰æ‹©åŸºå‡†å¥—ä»¶**

**æ ¸å¿ƒæŽ¨ç†åŸºå‡†**ï¼š
- **MMLU**ï¼ˆMassive Multitask Language Understandingï¼‰- 57 ä¸ªç§‘ç›®ï¼Œå¤šé¡¹é€‰æ‹©
- **GSM8K** - å°å­¦æ•°å­¦åº”ç”¨é¢˜
- **HellaSwag** - å¸¸è¯†æŽ¨ç†
- **TruthfulQA** - çœŸå®žæ€§ä¸Žäº‹å®žæ€§
- **ARC**ï¼ˆAI2 Reasoning Challengeï¼‰- ç§‘å­¦é¢˜ç›®

**ä»£ç åŸºå‡†**ï¼š
- **HumanEval** - Python ä»£ç ç”Ÿæˆï¼ˆ164 é“é¢˜ï¼‰
- **MBPP**ï¼ˆMostly Basic Python Problemsï¼‰- Python ç¼–ç¨‹

**æ ‡å‡†å¥—ä»¶**ï¼ˆæŽ¨èç”¨äºŽæ¨¡åž‹å‘å¸ƒï¼‰ï¼š
```bash
--tasks mmlu,gsm8k,hellaswag,truthfulqa,arc_challenge
```

**æ­¥éª¤ 2ï¼šé…ç½®æ¨¡åž‹**

**HuggingFace æ¨¡åž‹**ï¼š
```bash
lm_eval --model hf \
  --model_args pretrained=meta-llama/Llama-2-7b-hf,dtype=bfloat16 \
  --tasks mmlu \
  --device cuda:0 \
  --batch_size auto  # Auto-detect optimal batch size
```

**é‡åŒ–æ¨¡åž‹ï¼ˆ4-bit/8-bitï¼‰**ï¼š
```bash
lm_eval --model hf \
  --model_args pretrained=meta-llama/Llama-2-7b-hf,load_in_4bit=True \
  --tasks mmlu \
  --device cuda:0
```

**è‡ªå®šä¹‰ checkpoint**ï¼š
```bash
lm_eval --model hf \
  --model_args pretrained=/path/to/my-model,tokenizer=/path/to/tokenizer \
  --tasks mmlu \
  --device cuda:0
```

**æ­¥éª¤ 3ï¼šè¿è¡Œè¯„ä¼°**

```bash
# Full MMLU evaluation (57 subjects)
lm_eval --model hf \
  --model_args pretrained=meta-llama/Llama-2-7b-hf \
  --tasks mmlu \
  --num_fewshot 5 \  # 5-shot evaluation (standard)
  --batch_size 8 \
  --output_path results/ \
  --log_samples  # Save individual predictions

# Multiple benchmarks at once
lm_eval --model hf \
  --model_args pretrained=meta-llama/Llama-2-7b-hf \
  --tasks mmlu,gsm8k,hellaswag,truthfulqa,arc_challenge \
  --num_fewshot 5 \
  --batch_size 8 \
  --output_path results/llama2-7b-eval.json
```

**æ­¥éª¤ 4ï¼šåˆ†æžç»“æžœ**

ç»“æžœä¿å­˜è‡³ `results/llama2-7b-eval.json`ï¼š

```json
{
  "results": {
    "mmlu": {
      "acc": 0.459,
      "acc_stderr": 0.004
    },
    "gsm8k": {
      "exact_match": 0.142,
      "exact_match_stderr": 0.006
    },
    "hellaswag": {
      "acc_norm": 0.765,
      "acc_norm_stderr": 0.004
    }
  },
  "config": {
    "model": "hf",
    "model_args": "pretrained=meta-llama/Llama-2-7b-hf",
    "num_fewshot": 5
  }
}
```

### å·¥ä½œæµ 2ï¼šè·Ÿè¸ªè®­ç»ƒè¿›åº¦

åœ¨è®­ç»ƒè¿‡ç¨‹ä¸­è¯„ä¼° checkpointã€‚

```
è®­ç»ƒè¿›åº¦è·Ÿè¸ªï¼š
- [ ] æ­¥éª¤ 1ï¼šè®¾ç½®å®šæœŸè¯„ä¼°
- [ ] æ­¥éª¤ 2ï¼šé€‰æ‹©å¿«é€ŸåŸºå‡†
- [ ] æ­¥éª¤ 3ï¼šè‡ªåŠ¨åŒ–è¯„ä¼°
- [ ] æ­¥éª¤ 4ï¼šç»˜åˆ¶å­¦ä¹ æ›²çº¿
```

**æ­¥éª¤ 1ï¼šè®¾ç½®å®šæœŸè¯„ä¼°**

æ¯ N ä¸ªè®­ç»ƒæ­¥éª¤è¯„ä¼°ä¸€æ¬¡ï¼š

```bash
#!/bin/bash
# eval_checkpoint.sh

CHECKPOINT_DIR=$1
STEP=$2

lm_eval --model hf \
  --model_args pretrained=$CHECKPOINT_DIR/checkpoint-$STEP \
  --tasks gsm8k,hellaswag \
  --num_fewshot 0 \  # 0-shot for speed
  --batch_size 16 \
  --output_path results/step-$STEP.json
```

**æ­¥éª¤ 2ï¼šé€‰æ‹©å¿«é€ŸåŸºå‡†**

é€‚åˆé¢‘ç¹è¯„ä¼°çš„å¿«é€ŸåŸºå‡†ï¼š
- **HellaSwag**ï¼šå• GPU çº¦ 10 åˆ†é’Ÿ
- **GSM8K**ï¼šçº¦ 5 åˆ†é’Ÿ
- **PIQA**ï¼šçº¦ 2 åˆ†é’Ÿ

ä¸é€‚åˆé¢‘ç¹è¯„ä¼°ï¼ˆè€—æ—¶è¿‡é•¿ï¼‰ï¼š
- **MMLU**ï¼šçº¦ 2 å°æ—¶ï¼ˆ57 ä¸ªç§‘ç›®ï¼‰
- **HumanEval**ï¼šéœ€è¦æ‰§è¡Œä»£ç 

**æ­¥éª¤ 3ï¼šè‡ªåŠ¨åŒ–è¯„ä¼°**

é›†æˆåˆ°è®­ç»ƒè„šæœ¬ä¸­ï¼š

```python
# In training loop
if step % eval_interval == 0:
    model.save_pretrained(f"checkpoints/step-{step}")

    # Run evaluation
    os.system(f"./eval_checkpoint.sh checkpoints step-{step}")
```

æˆ–ä½¿ç”¨ PyTorch Lightning callbackï¼š

```python
from pytorch_lightning import Callback

class EvalHarnessCallback(Callback):
    def on_validation_epoch_end(self, trainer, pl_module):
        step = trainer.global_step
        checkpoint_path = f"checkpoints/step-{step}"

        # Save checkpoint
        trainer.save_checkpoint(checkpoint_path)

        # Run lm-eval
        os.system(f"lm_eval --model hf --model_args pretrained={checkpoint_path} ...")
```

**æ­¥éª¤ 4ï¼šç»˜åˆ¶å­¦ä¹ æ›²çº¿**

```python
import json
import matplotlib.pyplot as plt

# Load all results
steps = []
mmlu_scores = []

for file in sorted(glob.glob("results/step-*.json")):
    with open(file) as f:
        data = json.load(f)
        step = int(file.split("-")[1].split(".")[0])
        steps.append(step)
        mmlu_scores.append(data["results"]["mmlu"]["acc"])

# Plot
plt.plot(steps, mmlu_scores)
plt.xlabel("Training Step")
plt.ylabel("MMLU Accuracy")
plt.title("Training Progress")
plt.savefig("training_curve.png")
```

### å·¥ä½œæµ 3ï¼šæ¯”è¾ƒå¤šä¸ªæ¨¡åž‹

ç”¨äºŽæ¨¡åž‹æ¯”è¾ƒçš„åŸºå‡†å¥—ä»¶ã€‚

```
æ¨¡åž‹æ¯”è¾ƒï¼š
- [ ] æ­¥éª¤ 1ï¼šå®šä¹‰æ¨¡åž‹åˆ—è¡¨
- [ ] æ­¥éª¤ 2ï¼šè¿è¡Œè¯„ä¼°
- [ ] æ­¥éª¤ 3ï¼šç”Ÿæˆå¯¹æ¯”è¡¨æ ¼
```

**æ­¥éª¤ 1ï¼šå®šä¹‰æ¨¡åž‹åˆ—è¡¨**

```bash
# models.txt
meta-llama/Llama-2-7b-hf
meta-llama/Llama-2-13b-hf
mistralai/Mistral-7B-v0.1
microsoft/phi-2
```

**æ­¥éª¤ 2ï¼šè¿è¡Œè¯„ä¼°**

```bash
#!/bin/bash
# eval_all_models.sh

TASKS="mmlu,gsm8k,hellaswag,truthfulqa"

while read model; do
    echo "Evaluating $model"

    # Extract model name for output file
    model_name=$(echo $model | sed 's/\//-/g')

    lm_eval --model hf \
      --model_args pretrained=$model,dtype=bfloat16 \
      --tasks $TASKS \
      --num_fewshot 5 \
      --batch_size auto \
      --output_path results/$model_name.json

done < models.txt
```

**æ­¥éª¤ 3ï¼šç”Ÿæˆå¯¹æ¯”è¡¨æ ¼**

```python
import json
import pandas as pd

models = [
    "meta-llama-Llama-2-7b-hf",
    "meta-llama-Llama-2-13b-hf",
    "mistralai-Mistral-7B-v0.1",
    "microsoft-phi-2"
]

tasks = ["mmlu", "gsm8k", "hellaswag", "truthfulqa"]

results = []
for model in models:
    with open(f"results/{model}.json") as f:
        data = json.load(f)
        row = {"Model": model.replace("-", "/")}
        for task in tasks:
            # Get primary metric for each task
            metrics = data["results"][task]
            if "acc" in metrics:
                row[task.upper()] = f"{metrics['acc']:.3f}"
            elif "exact_match" in metrics:
                row[task.upper()] = f"{metrics['exact_match']:.3f}"
        results.append(row)

df = pd.DataFrame(results)
print(df.to_markdown(index=False))
```

è¾“å‡ºï¼š
```
| Model                  | MMLU  | GSM8K | HELLASWAG | TRUTHFULQA |
|------------------------|-------|-------|-----------|------------|
| meta-llama/Llama-2-7b  | 0.459 | 0.142 | 0.765     | 0.391      |
| meta-llama/Llama-2-13b | 0.549 | 0.287 | 0.801     | 0.430      |
| mistralai/Mistral-7B   | 0.626 | 0.395 | 0.812     | 0.428      |
| microsoft/phi-2        | 0.560 | 0.613 | 0.682     | 0.447      |
```

### å·¥ä½œæµ 4ï¼šä½¿ç”¨ vLLM è¯„ä¼°ï¼ˆæ›´å¿«çš„æŽ¨ç†ï¼‰

ä½¿ç”¨ vLLM åŽç«¯å¯èŽ·å¾— 5-10 å€çš„è¯„ä¼°é€Ÿåº¦æå‡ã€‚

```
vLLM è¯„ä¼°ï¼š
- [ ] æ­¥éª¤ 1ï¼šå®‰è£… vLLM
- [ ] æ­¥éª¤ 2ï¼šé…ç½® vLLM åŽç«¯
- [ ] æ­¥éª¤ 3ï¼šè¿è¡Œè¯„ä¼°
```

**æ­¥éª¤ 1ï¼šå®‰è£… vLLM**

```bash
pip install vllm
```

**æ­¥éª¤ 2ï¼šé…ç½® vLLM åŽç«¯**

```bash
lm_eval --model vllm \
  --model_args pretrained=meta-llama/Llama-2-7b-hf,tensor_parallel_size=1,dtype=auto,gpu_memory_utilization=0.8 \
  --tasks mmlu \
  --batch_size auto
```

**æ­¥éª¤ 3ï¼šè¿è¡Œè¯„ä¼°**

vLLM æ¯”æ ‡å‡† HuggingFace å¿« 5-10 å€ï¼š

```bash
# Standard HF: ~2 hours for MMLU on 7B model
lm_eval --model hf \
  --model_args pretrained=meta-llama/Llama-2-7b-hf \
  --tasks mmlu \
  --batch_size 8

# vLLM: ~15-20 minutes for MMLU on 7B model
lm_eval --model vllm \
  --model_args pretrained=meta-llama/Llama-2-7b-hf,tensor_parallel_size=2 \
  --tasks mmlu \
  --batch_size auto
```

## ä½•æ—¶ä½¿ç”¨åŠæ›¿ä»£æ–¹æ¡ˆ

**åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨ lm-evaluation-harnessï¼š**
- ä¸ºå­¦æœ¯è®ºæ–‡è¿›è¡Œæ¨¡åž‹åŸºå‡†æµ‹è¯•
- åœ¨æ ‡å‡†ä»»åŠ¡ä¸Šæ¯”è¾ƒæ¨¡åž‹è´¨é‡
- è·Ÿè¸ªè®­ç»ƒè¿›åº¦
- æŠ¥å‘Šæ ‡å‡†åŒ–æŒ‡æ ‡ï¼ˆæ‰€æœ‰äººä½¿ç”¨ç›¸åŒ promptï¼‰
- éœ€è¦å¯å¤çŽ°çš„è¯„ä¼°ç»“æžœ

**æ”¹ç”¨ä»¥ä¸‹æ›¿ä»£æ–¹æ¡ˆï¼š**
- **HELM**ï¼ˆStanfordï¼‰ï¼šæ›´å¹¿æ³›çš„è¯„ä¼°ï¼ˆå…¬å¹³æ€§ã€æ•ˆçŽ‡ã€æ ¡å‡†ï¼‰
- **AlpacaEval**ï¼šä½¿ç”¨ LLM ä½œä¸ºè¯„åˆ¤çš„æŒ‡ä»¤è·Ÿéšè¯„ä¼°
- **MT-Bench**ï¼šå¤šè½®å¯¹è¯è¯„ä¼°
- **è‡ªå®šä¹‰è„šæœ¬**ï¼šç‰¹å®šé¢†åŸŸè¯„ä¼°

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šè¯„ä¼°é€Ÿåº¦è¿‡æ…¢**

ä½¿ç”¨ vLLM åŽç«¯ï¼š
```bash
lm_eval --model vllm \
  --model_args pretrained=model-name,tensor_parallel_size=2
```

æˆ–å‡å°‘ few-shot ç¤ºä¾‹æ•°ï¼š
```bash
--num_fewshot 0  # Instead of 5
```

æˆ–è¯„ä¼° MMLU å­é›†ï¼š
```bash
--tasks mmlu_stem  # Only STEM subjects
```

**é—®é¢˜ï¼šæ˜¾å­˜ä¸è¶³**

å‡å° batch sizeï¼š
```bash
--batch_size 1  # Or --batch_size auto
```

ä½¿ç”¨é‡åŒ–ï¼š
```bash
--model_args pretrained=model-name,load_in_8bit=True
```

å¯ç”¨ CPU offloadingï¼š
```bash
--model_args pretrained=model-name,device_map=auto,offload_folder=offload
```

**é—®é¢˜ï¼šç»“æžœä¸Žå·²æŠ¥å‘Šæ•°å€¼ä¸ä¸€è‡´**

æ£€æŸ¥ few-shot æ•°é‡ï¼š
```bash
--num_fewshot 5  # Most papers use 5-shot
```

æ£€æŸ¥ç¡®åˆ‡ä»»åŠ¡åç§°ï¼š
```bash
--tasks mmlu  # Not mmlu_direct or mmlu_fewshot
```

éªŒè¯æ¨¡åž‹ä¸Ž tokenizer åŒ¹é…ï¼š
```bash
--model_args pretrained=model-name,tokenizer=same-model-name
```

**é—®é¢˜ï¼šHumanEval æœªæ‰§è¡Œä»£ç **

å®‰è£…æ‰§è¡Œä¾èµ–ï¼š
```bash
pip install human-eval
```

å¯ç”¨ä»£ç æ‰§è¡Œï¼š
```bash
lm_eval --model hf \
  --model_args pretrained=model-name \
  --tasks humaneval \
  --allow_code_execution  # Required for HumanEval
```

## è¿›é˜¶ä¸»é¢˜

**åŸºå‡†æè¿°**ï¼šå‚è§ [references/benchmark-guide.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/evaluation/lm-evaluation-harness/references/benchmark-guide.md)ï¼Œäº†è§£æ‰€æœ‰ 60+ ä¸ªä»»åŠ¡çš„è¯¦ç»†è¯´æ˜Žã€æµ‹é‡å†…å®¹åŠç»“æžœè§£è¯»ã€‚

**è‡ªå®šä¹‰ä»»åŠ¡**ï¼šå‚è§ [references/custom-tasks.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/evaluation/lm-evaluation-harness/references/custom-tasks.md)ï¼Œäº†è§£å¦‚ä½•åˆ›å»ºç‰¹å®šé¢†åŸŸçš„è¯„ä¼°ä»»åŠ¡ã€‚

**API è¯„ä¼°**ï¼šå‚è§ [references/api-evaluation.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/evaluation/lm-evaluation-harness/references/api-evaluation.md)ï¼Œäº†è§£å¦‚ä½•è¯„ä¼° OpenAIã€Anthropic åŠå…¶ä»– API æ¨¡åž‹ã€‚

**å¤š GPU ç­–ç•¥**ï¼šå‚è§ [references/distributed-eval.md](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/evaluation/lm-evaluation-harness/references/distributed-eval.md)ï¼Œäº†è§£æ•°æ®å¹¶è¡Œä¸Žå¼ é‡å¹¶è¡Œè¯„ä¼°æ–¹æ¡ˆã€‚

## ç¡¬ä»¶è¦æ±‚

- **GPU**ï¼šNVIDIAï¼ˆCUDA 11.8+ï¼‰ï¼Œæ”¯æŒ CPU è¿è¡Œï¼ˆé€Ÿåº¦æžæ…¢ï¼‰
- **æ˜¾å­˜**ï¼š
  - 7B æ¨¡åž‹ï¼š16GBï¼ˆbf16ï¼‰æˆ– 8GBï¼ˆ8-bitï¼‰
  - 13B æ¨¡åž‹ï¼š28GBï¼ˆbf16ï¼‰æˆ– 14GBï¼ˆ8-bitï¼‰
  - 70B æ¨¡åž‹ï¼šéœ€è¦å¤š GPU æˆ–é‡åŒ–
- **è€—æ—¶**ï¼ˆ7B æ¨¡åž‹ï¼Œå•å¼  A100ï¼‰ï¼š
  - HellaSwagï¼š10 åˆ†é’Ÿ
  - GSM8Kï¼š5 åˆ†é’Ÿ
  - MMLUï¼ˆå®Œæ•´ï¼‰ï¼š2 å°æ—¶
  - HumanEvalï¼š20 åˆ†é’Ÿ

## èµ„æº

- GitHubï¼šhttps://github.com/EleutherAI/lm-evaluation-harness
- æ–‡æ¡£ï¼šhttps://github.com/EleutherAI/lm-evaluation-harness/tree/main/docs
- ä»»åŠ¡åº“ï¼š60+ ä¸ªä»»åŠ¡ï¼ŒåŒ…æ‹¬ MMLUã€GSM8Kã€HumanEvalã€TruthfulQAã€HellaSwagã€ARCã€WinoGrande ç­‰
- æŽ’è¡Œæ¦œï¼šhttps://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboardï¼ˆä½¿ç”¨æœ¬å·¥å…·ï¼‰