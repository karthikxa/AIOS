---
title: "Comfyui"
sidebar_label: "Comfyui"
description: "ä½¿ç”¨ ComfyUI ç”Ÿæˆå›¾åƒã€è§†é¢‘å’ŒéŸ³é¢‘â€”â€”å®‰è£…ã€å¯åŠ¨ã€ç®¡ç†èŠ‚ç‚¹/æ¨¡åž‹ã€è¿è¡Œå¸¦å‚æ•°æ³¨å…¥çš„å·¥ä½œæµ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Comfyui

ä½¿ç”¨ ComfyUI ç”Ÿæˆå›¾åƒã€è§†é¢‘å’ŒéŸ³é¢‘â€”â€”å®‰è£…ã€å¯åŠ¨ã€ç®¡ç†èŠ‚ç‚¹/æ¨¡åž‹ã€è¿è¡Œå¸¦å‚æ•°æ³¨å…¥çš„å·¥ä½œæµã€‚ä½¿ç”¨å®˜æ–¹ comfy-cli è¿›è¡Œç”Ÿå‘½å‘¨æœŸç®¡ç†ï¼Œä½¿ç”¨ç›´æŽ¥ REST/WebSocket API æ‰§è¡Œå·¥ä½œæµã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/creative/comfyui` |
| ç‰ˆæœ¬ | `5.1.0` |
| ä½œè€… | ['kshitijk4poor', 'alt-glitch', 'purzbeats'] |
| è®¸å¯è¯ | MIT |
| å¹³å° | macos, linux, windows |
| æ ‡ç­¾ | `comfyui`, `image-generation`, `stable-diffusion`, `flux`, `sd3`, `wan-video`, `hunyuan-video`, `creative`, `generative-ai`, `video-generation` |
| ç›¸å…³ skill | [`stable-diffusion-image-generation`](/user-guide/skills/optional/mlops/mlops-stable-diffusion), `image_gen` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# ComfyUI

é€šè¿‡ ComfyUI ç”Ÿæˆå›¾åƒã€è§†é¢‘ã€éŸ³é¢‘å’Œ 3D å†…å®¹ï¼Œä½¿ç”¨å®˜æ–¹ `comfy-cli` è¿›è¡Œå®‰è£…/ç”Ÿå‘½å‘¨æœŸç®¡ç†ï¼Œä½¿ç”¨ç›´æŽ¥ REST/WebSocket API æ‰§è¡Œå·¥ä½œæµã€‚

## æ­¤ skill åŒ…å«çš„å†…å®¹

**å‚è€ƒæ–‡æ¡£ï¼ˆ`references/`ï¼‰ï¼š**

- `official-cli.md` â€” æ‰€æœ‰ `comfy ...` å‘½ä»¤åŠå…¶æ ‡å¿—
- `rest-api.md` â€” REST + WebSocket ç«¯ç‚¹ï¼ˆæœ¬åœ° + äº‘ç«¯ï¼‰ï¼Œpayloadï¼ˆè½½è·ï¼‰schema
- `workflow-format.md` â€” API æ ¼å¼ JSONã€å¸¸è§èŠ‚ç‚¹ç±»åž‹ã€å‚æ•°æ˜ å°„
- `template-integrity.md` â€” å°† `comfyui-workflow-templates` ä»Žç¼–è¾‘å™¨æ ¼å¼è½¬æ¢ä¸º API æ ¼å¼ï¼šReroute bypassã€ç‚¹åˆ†åŠ¨æ€è¾“å…¥é”®ï¼ˆ`values.a`ã€`resize_type.width`ï¼‰ã€äº‘ç«¯ç‰¹æ€§ï¼ˆ302 é‡å®šå‘ã€å…è´¹å±‚ 1 ä¸ªå¹¶å‘ä»»åŠ¡ã€1080p VRAM ä¸Šé™ï¼‰ã€Discord å…¼å®¹ ffmpeg æ‹¼æŽ¥ã€‚ç”± [@purzbeats](https://github.com/purzbeats) æ’°å†™ã€‚ä»Žå®˜æ–¹æ¨¡æ¿å¼€å§‹æ—¶è¯·åŠ è½½æ­¤æ–‡æ¡£ã€‚

**è„šæœ¬ï¼ˆ`scripts/`ï¼‰ï¼š**

| è„šæœ¬ | ç”¨é€” |
|--------|---------|
| `_common.py` | å…±äº« HTTPã€äº‘ç«¯è·¯ç”±ã€èŠ‚ç‚¹ç›®å½•ï¼ˆä¸è¦ç›´æŽ¥è¿è¡Œï¼‰ |
| `hardware_check.py` | æŽ¢æµ‹ GPU/VRAM/ç£ç›˜ â†’ æŽ¨èæœ¬åœ°æˆ– Comfy Cloud |
| `comfyui_setup.sh` | ç¡¬ä»¶æ£€æŸ¥ + comfy-cli + ComfyUI å®‰è£… + å¯åŠ¨ + éªŒè¯ |
| `extract_schema.py` | è¯»å–å·¥ä½œæµ â†’ åˆ—å‡ºå¯æŽ§å‚æ•° + æ¨¡åž‹ä¾èµ– |
| `check_deps.py` | å¯¹æ¯”è¿è¡Œä¸­çš„æœåŠ¡å™¨æ£€æŸ¥å·¥ä½œæµ â†’ åˆ—å‡ºç¼ºå¤±èŠ‚ç‚¹/æ¨¡åž‹ |
| `auto_fix_deps.py` | è¿è¡Œ check_deps ç„¶åŽæ‰§è¡Œ `comfy node install` / `comfy model download` |
| `run_workflow.py` | æ³¨å…¥å‚æ•°ã€æäº¤ã€ç›‘æŽ§ã€ä¸‹è½½è¾“å‡ºï¼ˆHTTP æˆ– WSï¼‰ |
| `run_batch.py` | ä»¥ sweep æ–¹å¼æäº¤å·¥ä½œæµ N æ¬¡ï¼Œå¹¶è¡Œæ•°é‡å—é™äºŽä½ çš„å¥—é¤å±‚çº§ |
| `ws_monitor.py` | æ‰§è¡Œä¸­ä»»åŠ¡çš„å®žæ—¶ WebSocket æŸ¥çœ‹å™¨ï¼ˆå®žæ—¶è¿›åº¦ï¼‰ |
| `health_check.py` | éªŒè¯æ¸…å•è¿è¡Œå™¨â€”â€”comfy-cli + æœåŠ¡å™¨ + æ¨¡åž‹ + å†’çƒŸæµ‹è¯• |
| `fetch_logs.py` | æ‹‰å–æŒ‡å®š prompt_id çš„ traceback / çŠ¶æ€æ¶ˆæ¯ |

**ç¤ºä¾‹å·¥ä½œæµï¼ˆ`workflows/`ï¼‰ï¼š** SD 1.5ã€SDXLã€Flux Devã€SDXL img2imgã€SDXL inpaintã€ESRGAN æ”¾å¤§ã€AnimateDiff è§†é¢‘ã€Wan T2Vã€‚å‚è§ `workflows/README.md`ã€‚

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·è¦æ±‚ä½¿ç”¨ Stable Diffusionã€SDXLã€Fluxã€SD3 ç­‰ç”Ÿæˆå›¾åƒ
- ç”¨æˆ·æƒ³è¿è¡Œç‰¹å®šçš„ ComfyUI å·¥ä½œæµæ–‡ä»¶
- ç”¨æˆ·æƒ³ä¸²è”ç”Ÿæˆæ­¥éª¤ï¼ˆtxt2img â†’ æ”¾å¤§ â†’ äººè„¸ä¿®å¤ï¼‰
- ç”¨æˆ·éœ€è¦ ControlNetã€inpaintingã€img2img æˆ–å…¶ä»–é«˜çº§ pipeline
- ç”¨æˆ·è¦ç®¡ç† ComfyUI é˜Ÿåˆ—ã€æ£€æŸ¥æ¨¡åž‹æˆ–å®‰è£…è‡ªå®šä¹‰èŠ‚ç‚¹
- ç”¨æˆ·æƒ³é€šè¿‡ AnimateDiffã€Hunyuanã€Wanã€AudioCraft ç­‰è¿›è¡Œè§†é¢‘/éŸ³é¢‘/3D ç”Ÿæˆ

## æž¶æž„ï¼šä¸¤å±‚

<!-- ascii-guard-ignore -->
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Layer 1: comfy-cli (official lifecycle tool)        â”‚
â”‚   Setup, server lifecycle, custom nodes, models     â”‚
â”‚   â†’ comfy install / launch / stop / node / model    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                          â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Layer 2: REST/WebSocket API + skill scripts         â”‚
â”‚   Workflow execution, param injection, monitoring   â”‚
â”‚   POST /api/prompt, GET /api/view, WS /ws           â”‚
â”‚   â†’ run_workflow.py, run_batch.py, ws_monitor.py    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```
<!-- ascii-guard-ignore-end -->

**ä¸ºä»€ä¹ˆè¦ä¸¤å±‚ï¼Ÿ** å®˜æ–¹ CLI éžå¸¸é€‚åˆå®‰è£…å’ŒæœåŠ¡å™¨ç®¡ç†ï¼Œä½†å¯¹å·¥ä½œæµæ‰§è¡Œçš„æ”¯æŒæžå°‘ã€‚REST/WS API å¡«è¡¥äº†è¿™ä¸€ç©ºç¼ºâ€”â€”è„šæœ¬å¤„ç† CLI ä¸å…·å¤‡çš„å‚æ•°æ³¨å…¥ã€æ‰§è¡Œç›‘æŽ§å’Œè¾“å‡ºä¸‹è½½åŠŸèƒ½ã€‚

## å¿«é€Ÿå¼€å§‹

### æ£€æµ‹çŽ¯å¢ƒ

```bash
# æ£€æŸ¥å¯ç”¨å†…å®¹
command -v comfy >/dev/null 2>&1 && echo "comfy-cli: installed"
curl -s http://127.0.0.1:8188/system_stats 2>/dev/null && echo "server: running"

# æ­¤æœºå™¨èƒ½å¦åœ¨æœ¬åœ°è¿è¡Œ ComfyUIï¼Ÿï¼ˆGPU/VRAM/ç£ç›˜æ£€æŸ¥ï¼‰
python3 scripts/hardware_check.py
```

å¦‚æžœæœªå®‰è£…ä»»ä½•å†…å®¹ï¼Œè¯·å‚é˜…ä¸‹æ–¹çš„**å®‰è£…ä¸Žå¼•å¯¼**â€”â€”ä½†å§‹ç»ˆå…ˆè¿è¡Œç¡¬ä»¶æ£€æŸ¥ã€‚

### ä¸€è¡Œå¥åº·æ£€æŸ¥

```bash
python3 scripts/health_check.py
# â†’ JSON: comfy_cli åœ¨ PATH ä¸­ï¼ŸæœåŠ¡å™¨å¯è¾¾ï¼Ÿè‡³å°‘æœ‰ä¸€ä¸ª checkpointï¼Ÿå†’çƒŸæµ‹è¯•é€šè¿‡ï¼Ÿ
```

## æ ¸å¿ƒå·¥ä½œæµ

### ç¬¬ä¸€æ­¥ï¼šèŽ·å– API æ ¼å¼çš„å·¥ä½œæµ JSON

å·¥ä½œæµå¿…é¡»ä¸º API æ ¼å¼ï¼ˆæ¯ä¸ªèŠ‚ç‚¹æœ‰ `class_type`ï¼‰ã€‚æ¥æºåŒ…æ‹¬ï¼š

- ComfyUI Web UI â†’ **Workflow â†’ Export (API)**ï¼ˆæ–°ç‰ˆ UIï¼‰æˆ–æ—§ç‰ˆ"Save (API Format)"æŒ‰é’®ï¼ˆæ—§ç‰ˆ UIï¼‰
- æ­¤ skill çš„ `workflows/` ç›®å½•ï¼ˆå¯ç›´æŽ¥è¿è¡Œçš„ç¤ºä¾‹ï¼‰
- ç¤¾åŒºä¸‹è½½ï¼ˆcivitaiã€Redditã€Discordï¼‰â€”â€”é€šå¸¸ä¸ºç¼–è¾‘å™¨æ ¼å¼ï¼Œå¿…é¡»åŠ è½½åˆ° ComfyUI åŽé‡æ–°å¯¼å‡º

ç¼–è¾‘å™¨æ ¼å¼ï¼ˆé¡¶å±‚å« `nodes` å’Œ `links` æ•°ç»„ï¼‰**ä¸å¯ç›´æŽ¥æ‰§è¡Œ**ã€‚è„šæœ¬ä¼šæ£€æµ‹æ­¤æƒ…å†µå¹¶æç¤ºä½ é‡æ–°å¯¼å‡ºã€‚

### ç¬¬äºŒæ­¥ï¼šæŸ¥çœ‹å¯æŽ§å†…å®¹

```bash
python3 scripts/extract_schema.py workflow_api.json --summary-only
# â†’ {"parameter_count": 12, "has_negative_prompt": true, "has_seed": true, ...}

python3 scripts/extract_schema.py workflow_api.json
# â†’ å®Œæ•´ schemaï¼ŒåŒ…å«å‚æ•°ã€æ¨¡åž‹ä¾èµ–ã€embedding å¼•ç”¨
```

### ç¬¬ä¸‰æ­¥ï¼šå¸¦å‚æ•°è¿è¡Œ

```bash
# æœ¬åœ°ï¼ˆé»˜è®¤ http://127.0.0.1:8188ï¼‰
python3 scripts/run_workflow.py \
  --workflow workflow_api.json \
  --args '{"prompt": "a beautiful sunset over mountains", "seed": -1, "steps": 30}' \
  --output-dir ./outputs

# äº‘ç«¯ï¼ˆä¸€æ¬¡æ€§å¯¼å‡º API keyï¼›è‡ªåŠ¨ä½¿ç”¨æ­£ç¡®çš„ /api è·¯ç”±ï¼‰
export COMFY_CLOUD_API_KEY="comfyui-..."
python3 scripts/run_workflow.py \
  --workflow workflow_api.json \
  --args '{"prompt": "..."}' \
  --host https://cloud.comfy.org \
  --output-dir ./outputs

# é€šè¿‡ WebSocket å®žæ—¶æŸ¥çœ‹è¿›åº¦ï¼ˆéœ€è¦ `pip install websocket-client`ï¼‰
python3 scripts/run_workflow.py \
  --workflow flux_dev.json \
  --args '{"prompt": "..."}' \
  --ws

# img2img / inpaintï¼šä¼ å…¥ --input-image è‡ªåŠ¨ä¸Šä¼ å¹¶å¼•ç”¨
python3 scripts/run_workflow.py \
  --workflow sdxl_img2img.json \
  --input-image image=./photo.png \
  --args '{"prompt": "make it watercolor", "denoise": 0.6}'

# æ‰¹é‡ / sweepï¼š8 ä¸ªéšæœºç§å­ï¼Œå¹¶è¡Œæ•°é‡å—é™äºŽäº‘ç«¯å¥—é¤å±‚çº§
python3 scripts/run_batch.py \
  --workflow sdxl.json \
  --args '{"prompt": "abstract"}' \
  --count 8 --randomize-seed --parallel 3 \
  --output-dir ./outputs/batch
```

`seed` ä¼  `-1`ï¼ˆæˆ–é…åˆ `--randomize-seed` çœç•¥ seedï¼‰å¯åœ¨æ¯æ¬¡è¿è¡Œæ—¶ç”Ÿæˆæ–°çš„éšæœºç§å­ã€‚

### ç¬¬å››æ­¥ï¼šå‘ˆçŽ°ç»“æžœ

è„šæœ¬å‘ stdout è¾“å‡ºæè¿°æ¯ä¸ªè¾“å‡ºæ–‡ä»¶çš„ JSONï¼š

```json
{
  "status": "success",
  "prompt_id": "abc-123",
  "outputs": [
    {"file": "./outputs/sdxl_00001_.png", "node_id": "9",
     "type": "image", "filename": "sdxl_00001_.png"}
  ]
}
```

## å†³ç­–æ ‘

| ç”¨æˆ·è¯´ | å·¥å…· | å‘½ä»¤ |
|-----------|------|---------|
| **ç”Ÿå‘½å‘¨æœŸï¼ˆä½¿ç”¨ comfy-cliï¼‰** | | |
| "å®‰è£… ComfyUI" | comfy-cli | `bash scripts/comfyui_setup.sh` |
| "å¯åŠ¨ ComfyUI" | comfy-cli | `comfy launch --background` |
| "åœæ­¢ ComfyUI" | comfy-cli | `comfy stop` |
| "å®‰è£… X èŠ‚ç‚¹" | comfy-cli | `comfy node install <name>` |
| "ä¸‹è½½ X æ¨¡åž‹" | comfy-cli | `comfy model download --url <url> --relative-path models/checkpoints` |
| "åˆ—å‡ºå·²å®‰è£…æ¨¡åž‹" | comfy-cli | `comfy model list` |
| "åˆ—å‡ºå·²å®‰è£…èŠ‚ç‚¹" | comfy-cli | `comfy node show installed` |
| **æ‰§è¡Œï¼ˆä½¿ç”¨è„šæœ¬ï¼‰** | | |
| "ä¸€åˆ‡å‡†å¤‡å¥½äº†å—ï¼Ÿ" | è„šæœ¬ | `health_check.py`ï¼ˆå¯é€‰åŠ  `--workflow X --smoke-test`ï¼‰ |
| "è¿™ä¸ªå·¥ä½œæµæˆ‘èƒ½æ”¹ä»€ä¹ˆï¼Ÿ" | è„šæœ¬ | `extract_schema.py W.json` |
| "æ£€æŸ¥ W çš„ä¾èµ–æ˜¯å¦æ»¡è¶³" | è„šæœ¬ | `check_deps.py W.json` |
| "ä¿®å¤ç¼ºå¤±ä¾èµ–" | è„šæœ¬ | `auto_fix_deps.py W.json` |
| "ç”Ÿæˆä¸€å¼ å›¾ç‰‡" | è„šæœ¬ | `run_workflow.py --workflow W --args '{...}'` |
| "ä½¿ç”¨è¿™å¼ å›¾ç‰‡"ï¼ˆimg2imgï¼‰ | è„šæœ¬ | `run_workflow.py --input-image image=./x.png ...` |
| "8 ä¸ªéšæœºç§å­å˜ä½“" | è„šæœ¬ | `run_batch.py --count 8 --randomize-seed ...` |
| "æ˜¾ç¤ºå®žæ—¶è¿›åº¦" | è„šæœ¬ | `ws_monitor.py --prompt-id <id>` |
| "èŽ·å–ä»»åŠ¡ X çš„é”™è¯¯" | è„šæœ¬ | `fetch_logs.py <prompt_id>` |
| **ç›´æŽ¥ REST** | | |
| "é˜Ÿåˆ—é‡Œæœ‰ä»€ä¹ˆï¼Ÿ" | REST | `curl http://HOST:8188/queue`ï¼ˆæœ¬åœ°ï¼‰æˆ– `--host https://cloud.comfy.org` |
| "å–æ¶ˆé‚£ä¸ª" | REST | `curl -X POST http://HOST:8188/interrupt` |
| "é‡Šæ”¾ GPU å†…å­˜" | REST | `curl -X POST http://HOST:8188/free` |

## å®‰è£…ä¸Žå¼•å¯¼

å½“ç”¨æˆ·è¦æ±‚å®‰è£… ComfyUI æ—¶ï¼Œ**é¦–å…ˆè¦è¯¢é—®ä»–ä»¬æƒ³è¦ Comfy Cloudï¼ˆæ‰˜ç®¡ï¼Œé›¶å®‰è£…ï¼ŒAPI keyï¼‰è¿˜æ˜¯æœ¬åœ°å®‰è£…ï¼ˆåœ¨å…¶æœºå™¨ä¸Šå®‰è£… ComfyUIï¼‰**ã€‚åœ¨å¾—åˆ°ç­”å¤ä¹‹å‰ï¼Œä¸è¦å¼€å§‹è¿è¡Œå®‰è£…å‘½ä»¤æˆ–ç¡¬ä»¶æ£€æŸ¥ã€‚

**å®˜æ–¹æ–‡æ¡£ï¼š** https://docs.comfy.org/installation
**CLI æ–‡æ¡£ï¼š** https://docs.comfy.org/comfy-cli/getting-started
**Cloud æ–‡æ¡£ï¼š** https://docs.comfy.org/get_started/cloud
**Cloud APIï¼š** https://docs.comfy.org/development/cloud/overview

### ç¬¬é›¶æ­¥ï¼šè¯¢é—®æœ¬åœ°è¿˜æ˜¯äº‘ç«¯ï¼ˆå§‹ç»ˆä¼˜å…ˆï¼‰

å»ºè®®è¯æœ¯ï¼š

> "æ‚¨æƒ³åœ¨æœ¬åœ°æœºå™¨ä¸Šè¿è¡Œ ComfyUIï¼Œè¿˜æ˜¯ä½¿ç”¨ Comfy Cloudï¼Ÿ
>
> - **Comfy Cloud** â€” æ‰˜ç®¡äºŽ RTX 6000 Pro GPUï¼Œæ‰€æœ‰å¸¸ç”¨æ¨¡åž‹é¢„è£…ï¼Œé›¶é…ç½®ã€‚éœ€è¦ API keyï¼ˆå®žé™…è¿è¡Œå·¥ä½œæµéœ€è¦ä»˜è´¹è®¢é˜…ï¼›å…è´¹å±‚ä»…é™åªè¯»ï¼‰ã€‚å¦‚æžœæ‚¨æ²¡æœ‰æ€§èƒ½è¶³å¤Ÿçš„ GPUï¼ŒæŽ¨èæ­¤é€‰é¡¹ã€‚
> - **æœ¬åœ°** â€” å…è´¹ï¼Œä½†æ‚¨çš„æœºå™¨å¿…é¡»æ»¡è¶³ç¡¬ä»¶è¦æ±‚ï¼š
>   - NVIDIA GPUï¼Œ**â‰¥6 GB VRAM**ï¼ˆSDXL éœ€ â‰¥8 GBï¼ŒFlux/è§†é¢‘éœ€ â‰¥12 GBï¼‰ï¼Œæˆ–
>   - æ”¯æŒ ROCm çš„ AMD GPUï¼ˆLinuxï¼‰ï¼Œæˆ–
>   - Apple Silicon Macï¼ˆM1+ï¼‰ï¼Œ**â‰¥16 GB ç»Ÿä¸€å†…å­˜**ï¼ˆæŽ¨è â‰¥32 GBï¼‰ã€‚
>   - Intel Mac å’Œæ—  GPU çš„æœºå™¨**ä¸å¯ç”¨**â€”â€”è¯·æ”¹ç”¨ Cloudã€‚
>
> æ‚¨é€‰æ‹©å“ªç§ï¼Ÿ"

è·¯ç”±é€»è¾‘ï¼š

- **Cloud** â†’ è·³è‡³**è·¯å¾„ A**ã€‚
- **æœ¬åœ°** â†’ å…ˆè¿è¡Œç¡¬ä»¶æ£€æŸ¥ï¼Œå†æ ¹æ®ç»“æžœä»Žè·¯å¾„ Bâ€“E ä¸­é€‰æ‹©ã€‚
- **ä¸ç¡®å®š** â†’ è¿è¡Œç¡¬ä»¶æ£€æŸ¥ï¼Œç”±ç»“æžœå†³å®šã€‚

### ç¬¬ä¸€æ­¥ï¼šéªŒè¯ç¡¬ä»¶ï¼ˆä»…å½“ç”¨æˆ·é€‰æ‹©æœ¬åœ°æ—¶ï¼‰

```bash
python3 scripts/hardware_check.py --json
# å¯é€‰ï¼šåŒæ—¶æŽ¢æµ‹ `torch` ä»¥èŽ·å–å®žé™… CUDA/MPS ä¿¡æ¯ï¼š
python3 scripts/hardware_check.py --json --check-pytorch
```

| ç»“æžœ | å«ä¹‰ | æ“ä½œ |
|------------|---------------------------------------------------------------|--------|
| `ok` | â‰¥8 GB VRAMï¼ˆç‹¬ç«‹æ˜¾å¡ï¼‰æˆ– â‰¥32 GB ç»Ÿä¸€å†…å­˜ï¼ˆApple Siliconï¼‰ | æœ¬åœ°å®‰è£…â€”â€”ä½¿ç”¨æŠ¥å‘Šä¸­çš„ `comfy_cli_flag` |
| `marginal` | SD1.5 å¯ç”¨ï¼›SDXL è¾ƒç´§å¼ ï¼›Flux/è§†é¢‘ä¸å¤ªå¯èƒ½ | è½»é‡å·¥ä½œæµå¯æœ¬åœ°ï¼Œå¦åˆ™é€‰**è·¯å¾„ Aï¼ˆCloudï¼‰** |
| `cloud` | æ— å¯ç”¨ GPUã€&lt;6 GB VRAMã€&lt;16 GB Apple ç»Ÿä¸€å†…å­˜ã€Intel Macã€Rosetta Python | **åˆ‡æ¢è‡³ Cloud**ï¼Œé™¤éžç”¨æˆ·æ˜Žç¡®å¼ºåˆ¶æœ¬åœ° |

è„šæœ¬è¿˜ä¼šæ˜¾ç¤º `wsl: true`ï¼ˆå¸¦ NVIDIA ç›´é€šçš„ WSL2ï¼‰å’Œ `rosetta: true`ï¼ˆApple Silicon ä¸Šçš„ x86_64 Pythonâ€”â€”å¿…é¡»é‡æ–°å®‰è£…ä¸º ARM64ï¼‰ã€‚

å¦‚æžœç»“æžœä¸º `cloud` ä½†ç”¨æˆ·æƒ³è¦æœ¬åœ°ï¼Œä¸è¦é™é»˜ç»§ç»­ã€‚é€å­—æ˜¾ç¤º `notes` æ•°ç»„ï¼Œå¹¶è¯¢é—®ä»–ä»¬æ˜¯å¦è¦ï¼ˆaï¼‰åˆ‡æ¢è‡³ Cloud æˆ–ï¼ˆbï¼‰å¼ºåˆ¶æœ¬åœ°å®‰è£…ï¼ˆåœ¨çŽ°ä»£æ¨¡åž‹ä¸Šä¼š OOM æˆ–æžæ…¢ï¼‰ã€‚

### é€‰æ‹©å®‰è£…è·¯å¾„

ä¼˜å…ˆä½¿ç”¨ç¡¬ä»¶æ£€æŸ¥ç»“æžœã€‚ä¸‹è¡¨é€‚ç”¨äºŽç”¨æˆ·å·²å‘ŠçŸ¥å…¶ç¡¬ä»¶çš„æƒ…å†µï¼š

| æƒ…å†µ | æŽ¨èè·¯å¾„ |
|-----------|------------------|
| ç¡¬ä»¶æ£€æŸ¥ç»“æžœä¸º `verdict: cloud` | **è·¯å¾„ Aï¼šComfy Cloud** |
| æ—  GPU / æƒ³å…ˆè¯•ç”¨ | **è·¯å¾„ Aï¼šComfy Cloud** |
| Windows + NVIDIA + éžæŠ€æœ¯ç”¨æˆ· | **è·¯å¾„ Bï¼šComfyUI Desktop** |
| Windows + NVIDIA + æŠ€æœ¯ç”¨æˆ· | **è·¯å¾„ Cï¼šPortable** æˆ–**è·¯å¾„ Dï¼šcomfy-cli** |
| Linux + ä»»æ„ GPU | **è·¯å¾„ Dï¼šcomfy-cli**ï¼ˆæœ€ç®€å•ï¼‰ |
| macOS + Apple Silicon | **è·¯å¾„ Bï¼šDesktop** æˆ–**è·¯å¾„ Dï¼šcomfy-cli** |
| æ— å¤´/æœåŠ¡å™¨/CI/agent | **è·¯å¾„ Dï¼šcomfy-cli** |

å…¨è‡ªåŠ¨è·¯å¾„ï¼ˆç¡¬ä»¶æ£€æŸ¥ â†’ å®‰è£… â†’ å¯åŠ¨ â†’ éªŒè¯ï¼‰ï¼š

```bash
bash scripts/comfyui_setup.sh
# æˆ–å¸¦è¦†ç›–å‚æ•°ï¼š
bash scripts/comfyui_setup.sh --m-series --port=8190 --workspace=/data/comfy
```

è¯¥è„šæœ¬å†…éƒ¨è¿è¡Œ `hardware_check.py`ï¼Œå½“ç»“æžœä¸º `cloud` æ—¶æ‹’ç»æœ¬åœ°å®‰è£…ï¼ˆé™¤éžä¼ å…¥ `--force-cloud-override`ï¼‰ï¼Œé€‰æ‹©æ­£ç¡®çš„ `comfy-cli` æ ‡å¿—ï¼Œå¹¶ä¼˜å…ˆä½¿ç”¨ `pipx`/`uvx` è€Œéžå…¨å±€ `pip` ä»¥é¿å…æ±¡æŸ“ç³»ç»Ÿ Pythonã€‚

---

### è·¯å¾„ Aï¼šComfy Cloudï¼ˆæ— éœ€æœ¬åœ°å®‰è£…ï¼‰

é€‚ç”¨äºŽæ²¡æœ‰æ€§èƒ½è¶³å¤Ÿ GPU æˆ–æƒ³è¦é›¶é…ç½®çš„ç”¨æˆ·ã€‚æ‰˜ç®¡äºŽ RTX 6000 Proã€‚

**æ–‡æ¡£ï¼š** https://docs.comfy.org/get_started/cloud

1. åœ¨ https://comfy.org/cloud æ³¨å†Œ
2. åœ¨ https://platform.comfy.org/login ç”Ÿæˆ API key
3. è®¾ç½® keyï¼š
   ```bash
   export COMFY_CLOUD_API_KEY="comfyui-xxxxxxxxxxxx"
   ```
4. è¿è¡Œå·¥ä½œæµï¼š
   ```bash
   python3 scripts/run_workflow.py \
     --workflow workflows/flux_dev_txt2img.json \
     --args '{"prompt": "..."}' \
     --host https://cloud.comfy.org \
     --output-dir ./outputs
   ```

**å®šä»·ï¼š** https://www.comfy.org/cloud/pricing
**å¹¶å‘ä»»åŠ¡ï¼š** å…è´¹/æ ‡å‡†ç‰ˆ 1 ä¸ªï¼ŒCreator 3 ä¸ªï¼ŒPro 5 ä¸ªã€‚å…è´¹å±‚**æ— æ³•é€šè¿‡ API è¿è¡Œå·¥ä½œæµ**â€”â€”ä»…å¯æµè§ˆæ¨¡åž‹ã€‚`/api/prompt`ã€`/api/upload/*`ã€`/api/view` ç­‰éœ€è¦ä»˜è´¹è®¢é˜…ã€‚

---

### è·¯å¾„ Bï¼šComfyUI Desktopï¼ˆWindows / macOSï¼‰

é¢å‘éžæŠ€æœ¯ç”¨æˆ·çš„ä¸€é”®å®‰è£…ç¨‹åºã€‚ç›®å‰ä¸º Beta ç‰ˆã€‚

**æ–‡æ¡£ï¼š** https://docs.comfy.org/installation/desktop
- **Windowsï¼ˆNVIDIAï¼‰ï¼š** https://download.comfy.org/windows/nsis/x64
- **macOSï¼ˆApple Siliconï¼‰ï¼š** https://comfy.org

Linux **ä¸æ”¯æŒ** Desktopâ€”â€”è¯·ä½¿ç”¨è·¯å¾„ Dã€‚

---

### è·¯å¾„ Cï¼šComfyUI Portableï¼ˆä»… Windowsï¼‰

**æ–‡æ¡£ï¼š** https://docs.comfy.org/installation/comfyui_portable_windows

ä»Ž https://github.com/comfyanonymous/ComfyUI/releases ä¸‹è½½ï¼Œè§£åŽ‹åŽè¿è¡Œ `run_nvidia_gpu.bat`ã€‚é€šè¿‡ `update/update_comfyui_stable.bat` æ›´æ–°ã€‚

---

### è·¯å¾„ Dï¼šcomfy-cliï¼ˆå…¨å¹³å°â€”â€”æŽ¨èç”¨äºŽ Agentï¼‰

å®˜æ–¹ CLI æ˜¯æ— å¤´/è‡ªåŠ¨åŒ–å®‰è£…çš„æœ€ä½³è·¯å¾„ã€‚

**æ–‡æ¡£ï¼š** https://docs.comfy.org/comfy-cli/getting-started

#### å®‰è£… comfy-cli

```bash
# æŽ¨èï¼š
pipx install comfy-cli
# æˆ–ä¸å®‰è£…ç›´æŽ¥ä½¿ç”¨ uvxï¼š
uvx --from comfy-cli comfy --help
# æˆ–ï¼ˆå¦‚æžœ pipx/uvx ä¸å¯ç”¨ï¼‰ï¼š
pip install --user comfy-cli
```

éžäº¤äº’å¼ç¦ç”¨åˆ†æžï¼š
```bash
comfy --skip-prompt tracking disable
```

#### å®‰è£… ComfyUI

```bash
comfy --skip-prompt install --nvidia              # NVIDIAï¼ˆCUDAï¼‰
comfy --skip-prompt install --amd                 # AMDï¼ˆROCmï¼ŒLinuxï¼‰
comfy --skip-prompt install --m-series            # Apple Siliconï¼ˆMPSï¼‰
comfy --skip-prompt install --cpu                 # ä»… CPUï¼ˆè¾ƒæ…¢ï¼‰
comfy --skip-prompt install --nvidia --fast-deps  # åŸºäºŽ uv çš„ä¾èµ–è§£æž
```

é»˜è®¤ä½ç½®ï¼š`~/comfy/ComfyUI`ï¼ˆLinuxï¼‰ï¼Œ`~/Documents/comfy/ComfyUI`ï¼ˆmacOS/Winï¼‰ã€‚ä½¿ç”¨ `comfy --workspace /custom/path install` è¦†ç›–ã€‚

#### å¯åŠ¨ / éªŒè¯

```bash
comfy launch --background                       # åŽå°å®ˆæŠ¤è¿›ç¨‹ï¼Œç«¯å£ :8188
comfy launch -- --listen 0.0.0.0 --port 8190    # å±€åŸŸç½‘å¯è®¿é—®çš„è‡ªå®šä¹‰ç«¯å£
curl -s http://127.0.0.1:8188/system_stats      # å¥åº·æ£€æŸ¥
```

---

### è·¯å¾„ Eï¼šæ‰‹åŠ¨å®‰è£…ï¼ˆé«˜çº§ / ä¸æ”¯æŒçš„ç¡¬ä»¶ï¼‰

é€‚ç”¨äºŽæ˜‡è…¾ NPUã€å¯’æ­¦çºª MLUã€Intel Arc æˆ–å…¶ä»–ä¸æ”¯æŒçš„ç¡¬ä»¶ã€‚

**æ–‡æ¡£ï¼š** https://docs.comfy.org/installation/manual_install

```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu130
pip install -r requirements.txt
python main.py
```

---

### å®‰è£…åŽï¼šä¸‹è½½æ¨¡åž‹

```bash
# SDXLï¼ˆé€šç”¨ï¼Œçº¦ 6.5 GBï¼‰
comfy model download \
  --url "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors" \
  --relative-path models/checkpoints

# SD 1.5ï¼ˆæ›´è½»é‡ï¼Œçº¦ 4 GBï¼Œé€‚åˆ 6 GB æ˜¾å¡ï¼‰
comfy model download \
  --url "https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors" \
  --relative-path models/checkpoints

# Flux Dev fp8ï¼ˆè¾ƒå°å˜ä½“ï¼Œçº¦ 12 GBï¼‰
comfy model download \
  --url "https://huggingface.co/Comfy-Org/flux1-dev/resolve/main/flux1-dev-fp8.safetensors" \
  --relative-path models/checkpoints

# CivitAIï¼ˆå…ˆè®¾ç½® tokenï¼‰ï¼š
comfy model download \
  --url "https://civitai.com/api/download/models/128713" \
  --relative-path models/checkpoints \
  --set-civitai-api-token "YOUR_TOKEN"
```

åˆ—å‡ºå·²å®‰è£…ï¼š`comfy model list`ã€‚

### å®‰è£…åŽï¼šå®‰è£…è‡ªå®šä¹‰èŠ‚ç‚¹

```bash
comfy node install comfyui-impact-pack             # å¸¸ç”¨å·¥å…·åŒ…
comfy node install comfyui-animatediff-evolved     # è§†é¢‘ç”Ÿæˆ
comfy node install comfyui-controlnet-aux          # ControlNet é¢„å¤„ç†å™¨
comfy node install comfyui-essentials              # å¸¸ç”¨è¾…åŠ©å·¥å…·
comfy node update all
comfy node install-deps --workflow=workflow.json   # å®‰è£…å·¥ä½œæµæ‰€éœ€çš„å…¨éƒ¨å†…å®¹
```

### å®‰è£…åŽï¼šéªŒè¯

```bash
python3 scripts/health_check.py
# â†’ comfy_cli åœ¨ PATH ä¸­ï¼ŸæœåŠ¡å™¨å¯è¾¾ï¼Ÿæœ‰ checkpointï¼Ÿå†’çƒŸæµ‹è¯•ï¼Ÿ

python3 scripts/check_deps.py my_workflow.json
# â†’ æ­¤å·¥ä½œæµçš„èŠ‚ç‚¹/æ¨¡åž‹/embedding æ˜¯å¦å·²å®‰è£…ï¼Ÿ

python3 scripts/run_workflow.py \
  --workflow workflows/sd15_txt2img.json \
  --args '{"prompt": "test", "steps": 4}' \
  --output-dir ./test-outputs
```

## å›¾åƒä¸Šä¼ ï¼ˆimg2img / Inpaintingï¼‰

æœ€ç®€å•çš„æ–¹å¼æ˜¯åœ¨ `run_workflow.py` ä¸­ä½¿ç”¨ `--input-image`ï¼š

```bash
python3 scripts/run_workflow.py \
  --workflow workflows/sdxl_img2img.json \
  --input-image image=./photo.png \
  --args '{"prompt": "make it cyberpunk", "denoise": 0.6}'
```

è¯¥æ ‡å¿—ä¸Šä¼  `photo.png`ï¼Œç„¶åŽå°†å…¶æœåŠ¡ç«¯æ–‡ä»¶åæ³¨å…¥åˆ° schema ä¸­åä¸º `image` çš„å‚æ•°ã€‚å¯¹äºŽ inpaintingï¼ŒåŒæ—¶ä¼ å…¥ï¼š

```bash
python3 scripts/run_workflow.py \
  --workflow workflows/sdxl_inpaint.json \
  --input-image image=./photo.png \
  --input-image mask_image=./mask.png \
  --args '{"prompt": "fill with flowers"}'
```

é€šè¿‡ REST æ‰‹åŠ¨ä¸Šä¼ ï¼š
```bash
curl -X POST "http://127.0.0.1:8188/upload/image" \
  -F "image=@photo.png" -F "type=input" -F "overwrite=true"
# è¿”å›žï¼š{"name": "photo.png", "subfolder": "", "type": "input"}

# äº‘ç«¯ç­‰æ•ˆï¼š
curl -X POST "https://cloud.comfy.org/api/upload/image" \
  -H "X-API-Key: $COMFY_CLOUD_API_KEY" \
  -F "image=@photo.png" -F "type=input" -F "overwrite=true"
```

## äº‘ç«¯ç‰¹æ€§

- **Base URLï¼š** `https://cloud.comfy.org`
- **è®¤è¯ï¼š** `X-API-Key` è¯·æ±‚å¤´ï¼ˆWebSocket ä½¿ç”¨ `?token=KEY`ï¼‰
- **API keyï¼š** è®¾ç½®ä¸€æ¬¡ `$COMFY_CLOUD_API_KEY`ï¼Œè„šæœ¬è‡ªåŠ¨è¯»å–
- **è¾“å‡ºä¸‹è½½ï¼š** `/api/view` è¿”å›ž 302 è·³è½¬è‡³ç­¾å URLï¼›è„šæœ¬ä¼šè·Ÿéšè·³è½¬å¹¶åœ¨ä»Žå­˜å‚¨åŽç«¯ï¼ˆS3/CloudFrontï¼‰èŽ·å–å‰åŽ»é™¤ `X-API-Key`ï¼ˆé¿å…æ³„éœ² API keyï¼‰ã€‚
- **ä¸Žæœ¬åœ° ComfyUI çš„ç«¯ç‚¹å·®å¼‚ï¼š**
  - `/api/object_info`ã€`/api/queue`ã€`/api/userdata` â€” **å…è´¹å±‚è¿”å›ž 403**ï¼›ä»…ä»˜è´¹å¯ç”¨ã€‚
  - `/history` åœ¨äº‘ç«¯é‡å‘½åä¸º `/history_v2`ï¼ˆè„šæœ¬è‡ªåŠ¨è·¯ç”±ï¼‰ã€‚
  - `/models/<folder>` åœ¨äº‘ç«¯é‡å‘½åä¸º `/experiment/models/<folder>`ï¼ˆè„šæœ¬è‡ªåŠ¨è·¯ç”±ï¼‰ã€‚
  - WebSocket ä¸­çš„ `clientId` ç›®å‰è¢«å¿½ç•¥â€”â€”åŒä¸€ç”¨æˆ·çš„æ‰€æœ‰è¿žæŽ¥æŽ¥æ”¶ç›¸åŒå¹¿æ’­ã€‚è¯·åœ¨å®¢æˆ·ç«¯æŒ‰ `prompt_id` è¿‡æ»¤ã€‚
  - ä¸Šä¼ æ—¶æŽ¥å— `subfolder` ä½†ä¼šè¢«å¿½ç•¥â€”â€”äº‘ç«¯ä½¿ç”¨æ‰å¹³å‘½åç©ºé—´ã€‚
- **å¹¶å‘ä»»åŠ¡ï¼š** å…è´¹/æ ‡å‡†ç‰ˆï¼š1ï¼ŒCreatorï¼š3ï¼ŒProï¼š5ã€‚è¶…å‡ºéƒ¨åˆ†è‡ªåŠ¨æŽ’é˜Ÿã€‚ä½¿ç”¨ `run_batch.py --parallel N` å……åˆ†åˆ©ç”¨ä½ çš„å¥—é¤å±‚çº§ã€‚

## é˜Ÿåˆ—ä¸Žç³»ç»Ÿç®¡ç†

```bash
# æœ¬åœ°
curl -s http://127.0.0.1:8188/queue | python3 -m json.tool
curl -X POST http://127.0.0.1:8188/queue -d '{"clear": true}'    # å–æ¶ˆå¾…å¤„ç†ä»»åŠ¡
curl -X POST http://127.0.0.1:8188/interrupt                      # å–æ¶ˆè¿è¡Œä¸­ä»»åŠ¡
curl -X POST http://127.0.0.1:8188/free \
  -H "Content-Type: application/json" \
  -d '{"unload_models": true, "free_memory": true}'

# äº‘ç«¯â€”â€”ç›¸åŒè·¯å¾„åŠ  /api/ å‰ç¼€ï¼Œå¦å¤–ï¼š
python3 scripts/fetch_logs.py --tail-queue --host https://cloud.comfy.org
```

## å¸¸è§é—®é¢˜

1. **å¿…é¡»ä½¿ç”¨ API æ ¼å¼** â€” æ‰€æœ‰è„šæœ¬å’Œ `/api/prompt` ç«¯ç‚¹å‡éœ€è¦ API æ ¼å¼çš„å·¥ä½œæµ JSONã€‚è„šæœ¬ä¼šæ£€æµ‹ç¼–è¾‘å™¨æ ¼å¼ï¼ˆé¡¶å±‚å« `nodes` å’Œ `links` æ•°ç»„ï¼‰å¹¶æç¤ºé€šè¿‡"Workflow â†’ Export (API)"ï¼ˆæ–°ç‰ˆ UIï¼‰æˆ–"Save (API Format)"ï¼ˆæ—§ç‰ˆ UIï¼‰é‡æ–°å¯¼å‡ºã€‚

2. **æœåŠ¡å™¨å¿…é¡»è¿è¡Œ** â€” æ‰€æœ‰æ‰§è¡Œæ“ä½œéƒ½éœ€è¦è¿è¡Œä¸­çš„æœåŠ¡å™¨ã€‚`comfy launch --background` å¯å¯åŠ¨æœåŠ¡å™¨ã€‚é€šè¿‡ `curl http://127.0.0.1:8188/system_stats` éªŒè¯ã€‚

3. **æ¨¡åž‹åç§°å¿…é¡»ç²¾ç¡®** â€” åŒºåˆ†å¤§å°å†™ï¼ŒåŒ…å«æ–‡ä»¶æ‰©å±•åã€‚`check_deps.py` ä¼šè¿›è¡Œæ¨¡ç³ŠåŒ¹é…ï¼ˆå«/ä¸å«æ‰©å±•åå’Œæ–‡ä»¶å¤¹å‰ç¼€ï¼‰ï¼Œä½†å·¥ä½œæµæœ¬èº«å¿…é¡»ä½¿ç”¨è§„èŒƒåç§°ã€‚ä½¿ç”¨ `comfy model list` æŸ¥çœ‹å·²å®‰è£…å†…å®¹ã€‚

4. **ç¼ºå°‘è‡ªå®šä¹‰èŠ‚ç‚¹** â€” "class_type not found" è¡¨ç¤ºæ‰€éœ€èŠ‚ç‚¹æœªå®‰è£…ã€‚`check_deps.py` ä¼šæŠ¥å‘Šéœ€è¦å®‰è£…å“ªä¸ªåŒ…ï¼›`auto_fix_deps.py` ä¼šè‡ªåŠ¨æ‰§è¡Œå®‰è£…ã€‚

5. **å·¥ä½œç›®å½•** â€” `comfy-cli` ä¼šè‡ªåŠ¨æ£€æµ‹ ComfyUI workspaceã€‚å¦‚æžœå‘½ä»¤æŠ¥é”™"no workspace found"ï¼Œè¯·ä½¿ç”¨ `comfy --workspace /path/to/ComfyUI <command>` æˆ– `comfy set-default /path/to/ComfyUI`ã€‚

6. **äº‘ç«¯å…è´¹å±‚ API é™åˆ¶** â€” `/api/prompt`ã€`/api/view`ã€`/api/upload/*`ã€`/api/object_info` åœ¨å…è´¹è´¦æˆ·ä¸Šå‡è¿”å›ž 403ã€‚`health_check.py` å’Œ `check_deps.py` ä¼šä¼˜é›…å¤„ç†æ­¤æƒ…å†µå¹¶æ˜¾ç¤ºæ¸…æ™°æç¤ºã€‚

7. **è§†é¢‘/éŸ³é¢‘å·¥ä½œæµè¶…æ—¶** â€” å½“è¾“å‡ºèŠ‚ç‚¹ä¸º `VHS_VideoCombine`ã€`SaveVideo` ç­‰æ—¶è‡ªåŠ¨æ£€æµ‹ï¼›é»˜è®¤è¶…æ—¶ä»Ž 300 ç§’è·³è‡³ 900 ç§’ã€‚å¯é€šè¿‡ `--timeout 1800` æ˜¾å¼è¦†ç›–ã€‚

8. **è¾“å‡ºæ–‡ä»¶åè·¯å¾„éåŽ†** â€” æœåŠ¡ç«¯æä¾›çš„æ–‡ä»¶åä¼šç»è¿‡ `safe_path_join` å¤„ç†ï¼Œæ‹’ç»ä»»ä½•è¯•å›¾é€ƒå‡º `--output-dir` çš„è·¯å¾„ã€‚è¯·ä¿ç•™æ­¤ä¿æŠ¤â€”â€”å¸¦è‡ªå®šä¹‰ä¿å­˜èŠ‚ç‚¹çš„å·¥ä½œæµå¯èƒ½äº§ç”Ÿä»»æ„è·¯å¾„ã€‚

9. **å·¥ä½œæµ JSON æ˜¯ä»»æ„ä»£ç ** â€” è‡ªå®šä¹‰èŠ‚ç‚¹è¿è¡Œ Pythonï¼Œå› æ­¤æäº¤æœªçŸ¥å·¥ä½œæµçš„ä¿¡ä»»é£Žé™©ä¸Ž `eval` ç›¸åŒã€‚è¿è¡Œæ¥è‡ªä¸å¯ä¿¡æ¥æºçš„å·¥ä½œæµå‰è¯·å…ˆæ£€æŸ¥ã€‚

10. **è‡ªåŠ¨éšæœºåŒ–ç§å­** â€” åœ¨ `--args` ä¸­ä¼ å…¥ `seed: -1`ï¼ˆæˆ–ä½¿ç”¨ `--randomize-seed` å¹¶çœç•¥ seedï¼‰å¯åœ¨æ¯æ¬¡è¿è¡Œæ—¶èŽ·å¾—æ–°ç§å­ã€‚å®žé™…ç§å­ä¼šè®°å½•åˆ° stderrã€‚

11. **`tracking` æç¤º** â€” é¦–æ¬¡è¿è¡Œ `comfy` å¯èƒ½ä¼šæç¤ºåˆ†æžé€‰é¡¹ã€‚ä½¿ç”¨ `comfy --skip-prompt tracking disable` éžäº¤äº’å¼è·³è¿‡ã€‚`comfyui_setup.sh` ä¼šè‡ªåŠ¨å¤„ç†æ­¤é—®é¢˜ã€‚

## éªŒè¯æ¸…å•

ä½¿ç”¨ `python3 scripts/health_check.py` ä¸€æ¬¡æ€§è¿è¡Œå…¨éƒ¨æ£€æŸ¥ã€‚æ‰‹åŠ¨æ£€æŸ¥ï¼š

- [ ] `hardware_check.py` ç»“æžœä¸º `ok`ï¼Œæˆ–ç”¨æˆ·æ˜Žç¡®é€‰æ‹©äº† Comfy Cloud
- [ ] `comfy --version` å¯ç”¨ï¼ˆæˆ– `uvx --from comfy-cli comfy --help`ï¼‰
- [ ] `curl http://HOST:PORT/system_stats` è¿”å›ž JSON
- [ ] `comfy model list` æ˜¾ç¤ºè‡³å°‘ä¸€ä¸ª checkpointï¼ˆæœ¬åœ°ï¼‰ï¼Œæˆ– `/api/experiment/models/checkpoints` è¿”å›žæ¨¡åž‹ï¼ˆäº‘ç«¯ï¼‰
- [ ] å·¥ä½œæµ JSON ä¸º API æ ¼å¼
- [ ] `check_deps.py` æŠ¥å‘Š `is_ready: true`ï¼ˆæˆ–äº‘ç«¯å…è´¹å±‚ä»…æ˜¾ç¤º `node_check_skipped`ï¼‰
- [ ] ç”¨å°åž‹å·¥ä½œæµæµ‹è¯•è¿è¡Œå®Œæˆï¼›è¾“å‡ºæ–‡ä»¶å‡ºçŽ°åœ¨ `--output-dir` ä¸­