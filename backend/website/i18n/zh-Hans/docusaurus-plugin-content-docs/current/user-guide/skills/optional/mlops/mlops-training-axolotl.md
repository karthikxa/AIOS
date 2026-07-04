---
title: "Axolotl â€” Axolotlï¼šåŸºäºŽ YAML çš„ LLM å¾®è°ƒï¼ˆLoRAã€DPOã€GRPOï¼‰"
sidebar_label: "Axolotl"
description: "Axolotlï¼šåŸºäºŽ YAML çš„ LLM å¾®è°ƒï¼ˆLoRAã€DPOã€GRPOï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Axolotl

Axolotlï¼šåŸºäºŽ YAML çš„ LLM å¾®è°ƒï¼ˆLoRAã€DPOã€GRPOï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/axolotl` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/training/axolotl` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `axolotl`, `torch`, `transformers`, `datasets`, `peft`, `accelerate`, `deepspeed` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Fine-Tuning`, `Axolotl`, `LLM`, `LoRA`, `QLoRA`, `DPO`, `KTO`, `ORPO`, `GRPO`, `YAML`, `HuggingFace`, `DeepSpeed`, `Multimodal` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Axolotl Skill

## å†…å®¹æ¦‚è§ˆ

ä½¿ç”¨ Axolotl å¾®è°ƒ LLM çš„ä¸“å®¶æŒ‡å¯¼ â€” YAML é…ç½®ã€100+ æ¨¡åž‹ã€LoRA/QLoRAã€DPO/KTO/ORPO/GRPOã€å¤šæ¨¡æ€æ”¯æŒã€‚

åŸºäºŽå®˜æ–¹æ–‡æ¡£ç”Ÿæˆçš„ axolotl å¼€å‘å…¨é¢è¾…åŠ©ã€‚

## ä½•æ—¶ä½¿ç”¨æ­¤ Skill

ä»¥ä¸‹æƒ…å†µåº”è§¦å‘æ­¤ skillï¼š
- ä½¿ç”¨ axolotl è¿›è¡Œå¼€å‘
- è¯¢é—® axolotl åŠŸèƒ½æˆ– API
- å®žçŽ° axolotl è§£å†³æ–¹æ¡ˆ
- è°ƒè¯• axolotl ä»£ç 
- å­¦ä¹  axolotl æœ€ä½³å®žè·µ

## å¿«é€Ÿå‚è€ƒ

### å¸¸ç”¨æ¨¡å¼

**æ¨¡å¼ 1ï¼š** è‹¥è¦éªŒè¯è®­ç»ƒä»»åŠ¡æ˜¯å¦å…·å¤‡å¯æŽ¥å—çš„æ•°æ®ä¼ è¾“é€Ÿåº¦ï¼Œè¿è¡Œ NCCL Tests æœ‰åŠ©äºŽå®šä½ç“¶é¢ˆï¼Œä¾‹å¦‚ï¼š

```
./build/all_reduce_perf -b 8 -e 128M -f 2 -g 3
```

**æ¨¡å¼ 2ï¼š** åœ¨ Axolotl yaml ä¸­é…ç½®æ¨¡åž‹ä»¥ä½¿ç”¨ FSDPï¼Œä¾‹å¦‚ï¼š

```
fsdp_version: 2
fsdp_config:
  offload_params: true
  state_dict_type: FULL_STATE_DICT
  auto_wrap_policy: TRANSFORMER_BASED_WRAP
  transformer_layer_cls_to_wrap: LlamaDecoderLayer
  reshard_after_forward: true
```

**æ¨¡å¼ 3ï¼š** `context_parallel_size` åº”ä¸º GPU æ€»æ•°çš„å› æ•°ï¼Œä¾‹å¦‚ï¼š

```
context_parallel_size
```

**æ¨¡å¼ 4ï¼š** ä¾‹å¦‚ï¼š- ä½¿ç”¨ 8 å— GPU ä¸”ä¸å¯ç”¨åºåˆ—å¹¶è¡Œæ—¶ï¼šæ¯æ­¥å¤„ç† 8 ä¸ªä¸åŒæ‰¹æ¬¡ - ä½¿ç”¨ 8 å— GPU ä¸” `context_parallel_size=4` æ—¶ï¼šæ¯æ­¥ä»…å¤„ç† 2 ä¸ªä¸åŒæ‰¹æ¬¡ï¼ˆæ¯ä¸ªæ‰¹æ¬¡è·¨ 4 å— GPU æ‹†åˆ†ï¼‰- è‹¥æ¯å— GPU çš„ `micro_batch_size` ä¸º 2ï¼Œå…¨å±€æ‰¹æ¬¡å¤§å°å°†ä»Ž 16 é™è‡³ 4

```
context_parallel_size=4
```

**æ¨¡å¼ 5ï¼š** åœ¨é…ç½®ä¸­è®¾ç½® `save_compressed: true` å¯å¯ç”¨åŽ‹ç¼©æ ¼å¼ä¿å­˜æ¨¡åž‹ï¼Œæ•ˆæžœå¦‚ä¸‹ï¼š- ç£ç›˜ç©ºé—´å ç”¨å‡å°‘çº¦ 40% - ä¿æŒä¸Ž vLLM çš„å…¼å®¹æ€§ä»¥åŠ é€ŸæŽ¨ç† - ä¿æŒä¸Ž llmcompressor çš„å…¼å®¹æ€§ä»¥è¿›è¡Œè¿›ä¸€æ­¥ä¼˜åŒ–ï¼ˆä¾‹å¦‚ï¼šé‡åŒ–ï¼‰

```
save_compressed: true
```

**æ¨¡å¼ 6ï¼š** æ³¨æ„ï¼šæ— éœ€å°†é›†æˆæ”¾ç½®åœ¨ `integrations` æ–‡ä»¶å¤¹ä¸­ã€‚åªè¦å®‰è£…åœ¨ Python çŽ¯å¢ƒçš„æŸä¸ªåŒ…ä¸­ï¼Œå¯ä½äºŽä»»æ„ä½ç½®ã€‚å‚è§æ­¤ç¤ºä¾‹ä»“åº“ï¼šhttps://github.com/axolotl-ai-cloud/diff-transformer

```
integrations
```

**æ¨¡å¼ 7ï¼š** åŒæ—¶å¤„ç†å•æ ·æœ¬å’Œæ‰¹é‡æ•°æ®ã€‚- å•æ ·æœ¬ï¼š`sample['input_ids']` ä¸º `list[int]` - æ‰¹é‡æ•°æ®ï¼š`sample['input_ids']` ä¸º `list[list[int]]`

```
utils.trainer.drop_long_seq(sample, sequence_len=2048, min_sequence_len=2)
```

### ä»£ç ç¤ºä¾‹æ¨¡å¼

**ç¤ºä¾‹ 1**ï¼ˆpythonï¼‰ï¼š
```python
cli.cloud.modal_.ModalCloud(config, app=None)
```

**ç¤ºä¾‹ 2**ï¼ˆpythonï¼‰ï¼š
```python
cli.cloud.modal_.run_cmd(cmd, run_folder, volumes=None)
```

**ç¤ºä¾‹ 3**ï¼ˆpythonï¼‰ï¼š
```python
core.trainers.base.AxolotlTrainer(
    *_args,
    bench_data_collator=None,
    eval_data_collator=None,
    dataset_tags=None,
    **kwargs,
)
```

**ç¤ºä¾‹ 4**ï¼ˆpythonï¼‰ï¼š
```python
core.trainers.base.AxolotlTrainer.log(logs, start_time=None)
```

**ç¤ºä¾‹ 5**ï¼ˆpythonï¼‰ï¼š
```python
prompt_strategies.input_output.RawInputOutputPrompter()
```

## å‚è€ƒæ–‡ä»¶

æ­¤ skill åœ¨ `references/` ä¸­åŒ…å«å®Œæ•´æ–‡æ¡£ï¼š

- **api.md** - API æ–‡æ¡£
- **dataset-formats.md** - Dataset-Formats æ–‡æ¡£
- **other.md** - å…¶ä»–æ–‡æ¡£

éœ€è¦è¯¦ç»†ä¿¡æ¯æ—¶ï¼Œä½¿ç”¨ `view` è¯»å–ç‰¹å®šå‚è€ƒæ–‡ä»¶ã€‚

## ä½¿ç”¨æ­¤ Skill

### åˆå­¦è€…
ä»Ž `getting_started` æˆ– `tutorials` å‚è€ƒæ–‡ä»¶å…¥æ‰‹ï¼Œäº†è§£åŸºç¡€æ¦‚å¿µã€‚

### ç‰¹å®šåŠŸèƒ½
ä½¿ç”¨å¯¹åº”åˆ†ç±»çš„å‚è€ƒæ–‡ä»¶ï¼ˆapiã€guides ç­‰ï¼‰èŽ·å–è¯¦ç»†ä¿¡æ¯ã€‚

### ä»£ç ç¤ºä¾‹
ä¸Šæ–¹å¿«é€Ÿå‚è€ƒéƒ¨åˆ†åŒ…å«ä»Žå®˜æ–¹æ–‡æ¡£ä¸­æå–çš„å¸¸ç”¨æ¨¡å¼ã€‚

## èµ„æº

### references/
ä»Žå®˜æ–¹æ¥æºæå–çš„æœ‰ç»„ç»‡æ–‡æ¡£ï¼ŒåŒ…å«ï¼š
- è¯¦ç»†è¯´æ˜Ž
- å¸¦è¯­è¨€æ ‡æ³¨çš„ä»£ç ç¤ºä¾‹
- åŽŸå§‹æ–‡æ¡£é“¾æŽ¥
- ä¾¿äºŽå¿«é€Ÿå¯¼èˆªçš„ç›®å½•

### scripts/
åœ¨æ­¤æ·»åŠ å¸¸è§è‡ªåŠ¨åŒ–ä»»åŠ¡çš„è¾…åŠ©è„šæœ¬ã€‚

### assets/
åœ¨æ­¤æ·»åŠ æ¨¡æ¿ã€æ ·æ¿ä»£ç æˆ–ç¤ºä¾‹é¡¹ç›®ã€‚

## è¯´æ˜Ž

- æ­¤ skill ç”±å®˜æ–¹æ–‡æ¡£è‡ªåŠ¨ç”Ÿæˆ
- å‚è€ƒæ–‡ä»¶ä¿ç•™äº†æºæ–‡æ¡£çš„ç»“æž„ä¸Žç¤ºä¾‹
- ä»£ç ç¤ºä¾‹åŒ…å«è¯­è¨€æ£€æµ‹ä»¥æä¾›æ›´å¥½çš„è¯­æ³•é«˜äº®
- å¿«é€Ÿå‚è€ƒæ¨¡å¼ä»Žæ–‡æ¡£ä¸­çš„å¸¸è§ç”¨æ³•ç¤ºä¾‹ä¸­æå–

## æ›´æ–°

è‹¥è¦ä½¿ç”¨æœ€æ–°æ–‡æ¡£åˆ·æ–°æ­¤ skillï¼š
1. ä½¿ç”¨ç›¸åŒé…ç½®é‡æ–°è¿è¡Œçˆ¬å–ç¨‹åº
2. Skill å°†ä»¥æœ€æ–°ä¿¡æ¯é‡æ–°æž„å»º