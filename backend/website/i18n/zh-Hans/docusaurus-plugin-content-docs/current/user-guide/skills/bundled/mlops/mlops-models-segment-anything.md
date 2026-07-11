---
title: "Segment Anything Model â€” SAMï¼šé€šè¿‡ç‚¹ã€æ¡†ã€æŽ©ç å®žçŽ°é›¶æ ·æœ¬å›¾åƒåˆ†å‰²"
sidebar_label: "Segment Anything Model"
description: "SAMï¼šé€šè¿‡ç‚¹ã€æ¡†ã€æŽ©ç å®žçŽ°é›¶æ ·æœ¬å›¾åƒåˆ†å‰²"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Segment Anything Model

SAMï¼šé€šè¿‡ç‚¹ã€æ¡†ã€æŽ©ç å®žçŽ°é›¶æ ·æœ¬å›¾åƒåˆ†å‰²ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/mlops/models/segment-anything` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `segment-anything`, `transformers>=4.30.0`, `torch>=1.7.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Multimodal`, `Image Segmentation`, `Computer Vision`, `SAM`, `Zero-Shot` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Segment Anything Model (SAM)

Meta AI Segment Anything Model é›¶æ ·æœ¬å›¾åƒåˆ†å‰²ç»¼åˆä½¿ç”¨æŒ‡å—ã€‚

## ä½•æ—¶ä½¿ç”¨ SAM

**åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨ SAMï¼š**
- éœ€è¦åœ¨æ— éœ€ä»»åŠ¡ç‰¹å®šè®­ç»ƒçš„æƒ…å†µä¸‹åˆ†å‰²å›¾åƒä¸­çš„ä»»æ„å¯¹è±¡
- æž„å»ºæ”¯æŒç‚¹/æ¡† promptï¼ˆæç¤ºè¯ï¼‰çš„äº¤äº’å¼æ ‡æ³¨å·¥å…·
- ä¸ºå…¶ä»–è§†è§‰æ¨¡åž‹ç”Ÿæˆè®­ç»ƒæ•°æ®
- éœ€è¦é›¶æ ·æœ¬è¿ç§»åˆ°æ–°å›¾åƒåŸŸ
- æž„å»ºç›®æ ‡æ£€æµ‹/åˆ†å‰²æµæ°´çº¿
- å¤„ç†åŒ»å­¦ã€å«æ˜Ÿæˆ–ç‰¹å®šé¢†åŸŸå›¾åƒ

**æ ¸å¿ƒç‰¹æ€§ï¼š**
- **é›¶æ ·æœ¬åˆ†å‰²**ï¼šæ— éœ€å¾®è°ƒå³å¯é€‚ç”¨äºŽä»»æ„å›¾åƒåŸŸ
- **çµæ´»çš„ prompt**ï¼šæ”¯æŒç‚¹ã€è¾¹ç•Œæ¡†æˆ–å…ˆå‰æŽ©ç 
- **è‡ªåŠ¨åˆ†å‰²**ï¼šè‡ªåŠ¨ç”Ÿæˆæ‰€æœ‰å¯¹è±¡æŽ©ç 
- **é«˜è´¨é‡**ï¼šåœ¨æ¥è‡ª 1100 ä¸‡å¼ å›¾åƒçš„ 11 äº¿ä¸ªæŽ©ç ä¸Šè®­ç»ƒ
- **å¤šç§æ¨¡åž‹è§„æ ¼**ï¼šViT-Bï¼ˆæœ€å¿«ï¼‰ã€ViT-Lã€ViT-Hï¼ˆæœ€ç²¾ç¡®ï¼‰
- **ONNX å¯¼å‡º**ï¼šå¯åœ¨æµè§ˆå™¨å’Œè¾¹ç¼˜è®¾å¤‡ä¸Šéƒ¨ç½²

**ä»¥ä¸‹æƒ…å†µè¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆï¼š**
- **YOLO/Detectron2**ï¼šç”¨äºŽå¸¦ç±»åˆ«çš„å®žæ—¶ç›®æ ‡æ£€æµ‹
- **Mask2Former**ï¼šç”¨äºŽå¸¦ç±»åˆ«çš„è¯­ä¹‰/å…¨æ™¯åˆ†å‰²
- **GroundingDINO + SAM**ï¼šç”¨äºŽæ–‡æœ¬ prompt é©±åŠ¨çš„åˆ†å‰²
- **SAM 2**ï¼šç”¨äºŽè§†é¢‘åˆ†å‰²ä»»åŠ¡

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# ä»Ž GitHub å®‰è£…
pip install git+https://github.com/facebookresearch/segment-anything.git

# å¯é€‰ä¾èµ–
pip install opencv-python pycocotools matplotlib

# æˆ–ä½¿ç”¨ HuggingFace transformers
pip install transformers
```

### ä¸‹è½½æ£€æŸ¥ç‚¹

```bash
# ViT-Hï¼ˆæœ€å¤§ï¼Œæœ€ç²¾ç¡®ï¼‰- 2.4GB
wget https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth

# ViT-Lï¼ˆä¸­ç­‰ï¼‰- 1.2GB
wget https://dl.fbaipublicfiles.com/segment_anything/sam_vit_l_0b3195.pth

# ViT-Bï¼ˆæœ€å°ï¼Œæœ€å¿«ï¼‰- 375MB
wget https://dl.fbaipublicfiles.com/segment_anything/sam_vit_b_01ec64.pth
```

### ä½¿ç”¨ SamPredictor çš„åŸºæœ¬ç”¨æ³•

```python
import numpy as np
from segment_anything import sam_model_registry, SamPredictor

# åŠ è½½æ¨¡åž‹
sam = sam_model_registry["vit_h"](https://github.com/zedteam/zed-agent/blob/main/skills/mlops/models/segment-anything/checkpoint="sam_vit_h_4b8939.pth")
sam.to(device="cuda")

# åˆ›å»ºé¢„æµ‹å™¨
predictor = SamPredictor(sam)

# è®¾ç½®å›¾åƒï¼ˆä¸€æ¬¡æ€§è®¡ç®—åµŒå…¥ï¼‰
image = cv2.imread("image.jpg")
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
predictor.set_image(image)

# ä½¿ç”¨ç‚¹ prompt è¿›è¡Œé¢„æµ‹
input_point = np.array([[500, 375]])  # (x, y) åæ ‡
input_label = np.array([1])  # 1 = å‰æ™¯ï¼Œ0 = èƒŒæ™¯

masks, scores, logits = predictor.predict(
    point_coords=input_point,
    point_labels=input_label,
    multimask_output=True  # è¿”å›ž 3 ä¸ªæŽ©ç é€‰é¡¹
)

# é€‰æ‹©æœ€ä½³æŽ©ç 
best_mask = masks[np.argmax(scores)]
```

### HuggingFace Transformers

```python
import torch
from PIL import Image
from transformers import SamModel, SamProcessor

# åŠ è½½æ¨¡åž‹å’Œå¤„ç†å™¨
model = SamModel.from_pretrained("facebook/sam-vit-huge")
processor = SamProcessor.from_pretrained("facebook/sam-vit-huge")
model.to("cuda")

# ä½¿ç”¨ç‚¹ prompt å¤„ç†å›¾åƒ
image = Image.open("image.jpg")
input_points = [[[450, 600]]]  # æ‰¹é‡ç‚¹

inputs = processor(image, input_points=input_points, return_tensors="pt")
inputs = {k: v.to("cuda") for k, v in inputs.items()}

# ç”ŸæˆæŽ©ç 
with torch.no_grad():
    outputs = model(**inputs)

# å°†æŽ©ç åŽå¤„ç†è¿˜åŽŸè‡³åŽŸå§‹å°ºå¯¸
masks = processor.image_processor.post_process_masks(
    outputs.pred_masks.cpu(),
    inputs["original_sizes"].cpu(),
    inputs["reshaped_input_sizes"].cpu()
)
```

## æ ¸å¿ƒæ¦‚å¿µ

### æ¨¡åž‹æž¶æž„

<!-- ascii-guard-ignore -->
<!-- ascii-guard-ignore -->
```
SAM Architecture:
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Image Encoder  â”‚â”€â”€â”€â”€â–¶â”‚ Prompt Encoder  â”‚â”€â”€â”€â”€â–¶â”‚  Mask Decoder   â”‚
â”‚     (ViT)       â”‚     â”‚ (Points/Boxes)  â”‚     â”‚ (Transformer)   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
        â”‚                       â”‚                       â”‚
   Image Embeddings      Prompt Embeddings         Masks + IoU
   (computed once)       (per prompt)             predictions
```
<!-- ascii-guard-ignore-end -->
<!-- ascii-guard-ignore-end -->

### æ¨¡åž‹å˜ä½“

| æ¨¡åž‹ | æ£€æŸ¥ç‚¹ | å¤§å° | é€Ÿåº¦ | ç²¾åº¦ |
|-------|------------|------|-------|----------|
| ViT-H | `vit_h` | 2.4 GB | æœ€æ…¢ | æœ€ä½³ |
| ViT-L | `vit_l` | 1.2 GB | ä¸­ç­‰ | è‰¯å¥½ |
| ViT-B | `vit_b` | 375 MB | æœ€å¿« | è‰¯å¥½ |

### Prompt ç±»åž‹

| Prompt | æè¿° | ä½¿ç”¨åœºæ™¯ |
|--------|-------------|----------|
| ç‚¹ï¼ˆå‰æ™¯ï¼‰ | ç‚¹å‡»å¯¹è±¡ | å•å¯¹è±¡é€‰æ‹© |
| ç‚¹ï¼ˆèƒŒæ™¯ï¼‰ | ç‚¹å‡»å¯¹è±¡å¤–éƒ¨ | æŽ’é™¤åŒºåŸŸ |
| è¾¹ç•Œæ¡† | å¯¹è±¡å‘¨å›´çš„çŸ©å½¢ | è¾ƒå¤§å¯¹è±¡ |
| å…ˆå‰æŽ©ç  | ä½Žåˆ†è¾¨çŽ‡æŽ©ç è¾“å…¥ | è¿­ä»£ç²¾åŒ– |

## äº¤äº’å¼åˆ†å‰²

### ç‚¹ prompt

```python
# å•ä¸ªå‰æ™¯ç‚¹
input_point = np.array([[500, 375]])
input_label = np.array([1])

masks, scores, logits = predictor.predict(
    point_coords=input_point,
    point_labels=input_label,
    multimask_output=True
)

# å¤šä¸ªç‚¹ï¼ˆå‰æ™¯ + èƒŒæ™¯ï¼‰
input_points = np.array([[500, 375], [600, 400], [450, 300]])
input_labels = np.array([1, 1, 0])  # 2 ä¸ªå‰æ™¯ï¼Œ1 ä¸ªèƒŒæ™¯

masks, scores, logits = predictor.predict(
    point_coords=input_points,
    point_labels=input_labels,
    multimask_output=False  # prompt æ˜Žç¡®æ—¶ä½¿ç”¨å•æŽ©ç 
)
```

### æ¡† prompt

```python
# è¾¹ç•Œæ¡† [x1, y1, x2, y2]
input_box = np.array([425, 600, 700, 875])

masks, scores, logits = predictor.predict(
    box=input_box,
    multimask_output=False
)
```

### ç»„åˆ prompt

```python
# æ¡† + ç‚¹ï¼Œå®žçŽ°ç²¾ç¡®æŽ§åˆ¶
masks, scores, logits = predictor.predict(
    point_coords=np.array([[500, 375]]),
    point_labels=np.array([1]),
    box=np.array([400, 300, 700, 600]),
    multimask_output=False
)
```

### è¿­ä»£ç²¾åŒ–

```python
# åˆå§‹é¢„æµ‹
masks, scores, logits = predictor.predict(
    point_coords=np.array([[500, 375]]),
    point_labels=np.array([1]),
    multimask_output=True
)

# ä½¿ç”¨å…ˆå‰æŽ©ç æ·»åŠ é¢å¤–ç‚¹è¿›è¡Œç²¾åŒ–
masks, scores, logits = predictor.predict(
    point_coords=np.array([[500, 375], [550, 400]]),
    point_labels=np.array([1, 0]),  # æ·»åŠ èƒŒæ™¯ç‚¹
    mask_input=logits[np.argmax(scores)][None, :, :],  # ä½¿ç”¨æœ€ä½³æŽ©ç 
    multimask_output=False
)
```

## è‡ªåŠ¨æŽ©ç ç”Ÿæˆ

### åŸºæœ¬è‡ªåŠ¨åˆ†å‰²

```python
from segment_anything import SamAutomaticMaskGenerator

# åˆ›å»ºç”Ÿæˆå™¨
mask_generator = SamAutomaticMaskGenerator(sam)

# ç”Ÿæˆæ‰€æœ‰æŽ©ç 
masks = mask_generator.generate(image)

# æ¯ä¸ªæŽ©ç åŒ…å«ï¼š
# - segmentation: äºŒå€¼æŽ©ç 
# - bbox: [x, y, w, h]
# - area: åƒç´ æ•°é‡
# - predicted_iou: è´¨é‡åˆ†æ•°
# - stability_score: é²æ£’æ€§åˆ†æ•°
# - point_coords: ç”Ÿæˆç‚¹
```

### è‡ªå®šä¹‰ç”Ÿæˆ

```python
mask_generator = SamAutomaticMaskGenerator(
    model=sam,
    points_per_side=32,          # ç½‘æ ¼å¯†åº¦ï¼ˆè¶Šå¤§ = æŽ©ç è¶Šå¤šï¼‰
    pred_iou_thresh=0.88,        # è´¨é‡é˜ˆå€¼
    stability_score_thresh=0.95,  # ç¨³å®šæ€§é˜ˆå€¼
    crop_n_layers=1,             # å¤šå°ºåº¦è£å‰ª
    crop_n_points_downscale_factor=2,
    min_mask_region_area=100,    # ç§»é™¤å¾®å°æŽ©ç 
)

masks = mask_generator.generate(image)
```

### è¿‡æ»¤æŽ©ç 

```python
# æŒ‰é¢ç§¯æŽ’åºï¼ˆæœ€å¤§ä¼˜å…ˆï¼‰
masks = sorted(masks, key=lambda x: x['area'], reverse=True)

# æŒ‰é¢„æµ‹ IoU è¿‡æ»¤
high_quality = [m for m in masks if m['predicted_iou'] > 0.9]

# æŒ‰ç¨³å®šæ€§åˆ†æ•°è¿‡æ»¤
stable_masks = [m for m in masks if m['stability_score'] > 0.95]
```

## æ‰¹é‡æŽ¨ç†

### å¤šå¼ å›¾åƒ

```python
# é«˜æ•ˆå¤„ç†å¤šå¼ å›¾åƒ
images = [cv2.imread(f"image_{i}.jpg") for i in range(10)]

all_masks = []
for image in images:
    predictor.set_image(image)
    masks, _, _ = predictor.predict(
        point_coords=np.array([[500, 375]]),
        point_labels=np.array([1]),
        multimask_output=True
    )
    all_masks.append(masks)
```

### æ¯å¼ å›¾åƒå¤šä¸ª prompt

```python
# é«˜æ•ˆå¤„ç†å¤šä¸ª promptï¼ˆå•æ¬¡å›¾åƒç¼–ç ï¼‰
predictor.set_image(image)

# æ‰¹é‡ç‚¹ prompt
points = [
    np.array([[100, 100]]),
    np.array([[200, 200]]),
    np.array([[300, 300]])
]

all_masks = []
for point in points:
    masks, scores, _ = predictor.predict(
        point_coords=point,
        point_labels=np.array([1]),
        multimask_output=True
    )
    all_masks.append(masks[np.argmax(scores)])
```

## ONNX éƒ¨ç½²

### å¯¼å‡ºæ¨¡åž‹

```bash
python scripts/export_onnx_model.py \
    --checkpoint sam_vit_h_4b8939.pth \
    --model-type vit_h \
    --output sam_onnx.onnx \
    --return-single-mask
```

### ä½¿ç”¨ ONNX æ¨¡åž‹

```python
import onnxruntime

# åŠ è½½ ONNX æ¨¡åž‹
ort_session = onnxruntime.InferenceSession("sam_onnx.onnx")

# è¿è¡ŒæŽ¨ç†ï¼ˆå›¾åƒåµŒå…¥å•ç‹¬è®¡ç®—ï¼‰
masks = ort_session.run(
    None,
    {
        "image_embeddings": image_embeddings,
        "point_coords": point_coords,
        "point_labels": point_labels,
        "mask_input": np.zeros((1, 1, 256, 256), dtype=np.float32),
        "has_mask_input": np.array([0], dtype=np.float32),
        "orig_im_size": np.array([h, w], dtype=np.float32)
    }
)
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šæ ‡æ³¨å·¥å…·

```python
import cv2

# åŠ è½½æ¨¡åž‹
predictor = SamPredictor(sam)
predictor.set_image(image)

def on_click(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        # å‰æ™¯ç‚¹
        masks, scores, _ = predictor.predict(
            point_coords=np.array([[x, y]]),
            point_labels=np.array([1]),
            multimask_output=True
        )
        # æ˜¾ç¤ºæœ€ä½³æŽ©ç 
        display_mask(masks[np.argmax(scores)])
```

### å·¥ä½œæµ 2ï¼šå¯¹è±¡æå–

```python
def extract_object(image, point):
    """æå–æŒ‡å®šç‚¹å¤„çš„å¯¹è±¡å¹¶è®¾ç½®é€æ˜ŽèƒŒæ™¯ã€‚"""
    predictor.set_image(image)

    masks, scores, _ = predictor.predict(
        point_coords=np.array([point]),
        point_labels=np.array([1]),
        multimask_output=True
    )

    best_mask = masks[np.argmax(scores)]

    # åˆ›å»º RGBA è¾“å‡º
    rgba = np.zeros((image.shape[0], image.shape[1], 4), dtype=np.uint8)
    rgba[:, :, :3] = image
    rgba[:, :, 3] = best_mask * 255

    return rgba
```

### å·¥ä½œæµ 3ï¼šåŒ»å­¦å›¾åƒåˆ†å‰²

```python
# å¤„ç†åŒ»å­¦å›¾åƒï¼ˆç°åº¦è½¬ RGBï¼‰
medical_image = cv2.imread("scan.png", cv2.IMREAD_GRAYSCALE)
rgb_image = cv2.cvtColor(medical_image, cv2.COLOR_GRAY2RGB)

predictor.set_image(rgb_image)

# åˆ†å‰²æ„Ÿå…´è¶£åŒºåŸŸ
masks, scores, _ = predictor.predict(
    box=np.array([x1, y1, x2, y2]),  # ROI è¾¹ç•Œæ¡†
    multimask_output=True
)
```

## è¾“å‡ºæ ¼å¼

### æŽ©ç æ•°æ®ç»“æž„

```python
# SamAutomaticMaskGenerator è¾“å‡º
{
    "segmentation": np.ndarray,  # HÃ—W äºŒå€¼æŽ©ç 
    "bbox": [x, y, w, h],        # è¾¹ç•Œæ¡†
    "area": int,                 # åƒç´ æ•°é‡
    "predicted_iou": float,      # 0-1 è´¨é‡åˆ†æ•°
    "stability_score": float,    # 0-1 é²æ£’æ€§åˆ†æ•°
    "crop_box": [x, y, w, h],    # ç”Ÿæˆè£å‰ªåŒºåŸŸ
    "point_coords": [[x, y]],    # è¾“å…¥ç‚¹
}
```

### COCO RLE æ ¼å¼

```python
from pycocotools import mask as mask_utils

# å°†æŽ©ç ç¼–ç ä¸º RLE
rle = mask_utils.encode(np.asfortranarray(mask.astype(np.uint8)))
rle["counts"] = rle["counts"].decode("utf-8")

# å°† RLE è§£ç ä¸ºæŽ©ç 
decoded_mask = mask_utils.decode(rle)
```

## æ€§èƒ½ä¼˜åŒ–

### GPU å†…å­˜

```python
# åœ¨ VRAM æœ‰é™æ—¶ä½¿ç”¨è¾ƒå°æ¨¡åž‹
sam = sam_model_registry["vit_b"](https://github.com/zedteam/zed-agent/blob/main/skills/mlops/models/segment-anything/checkpoint="sam_vit_b_01ec64.pth")

# æ‰¹é‡å¤„ç†å›¾åƒ
# åœ¨å¤§æ‰¹é‡ä¹‹é—´æ¸…ç©º CUDA ç¼“å­˜
torch.cuda.empty_cache()
```

### é€Ÿåº¦ä¼˜åŒ–

```python
# ä½¿ç”¨åŠç²¾åº¦
sam = sam.half()

# å‡å°‘è‡ªåŠ¨ç”Ÿæˆçš„ç‚¹æ•°
mask_generator = SamAutomaticMaskGenerator(
    model=sam,
    points_per_side=16,  # é»˜è®¤ä¸º 32
)

# ä½¿ç”¨ ONNX è¿›è¡Œéƒ¨ç½²
# å¯¼å‡ºæ—¶åŠ  --return-single-mask ä»¥åŠ å¿«æŽ¨ç†é€Ÿåº¦
```

## å¸¸è§é—®é¢˜

| é—®é¢˜ | è§£å†³æ–¹æ¡ˆ |
|-------|----------|
| å†…å­˜ä¸è¶³ | ä½¿ç”¨ ViT-B æ¨¡åž‹ï¼Œç¼©å°å›¾åƒå°ºå¯¸ |
| æŽ¨ç†ç¼“æ…¢ | ä½¿ç”¨ ViT-Bï¼Œå‡å° points_per_side |
| æŽ©ç è´¨é‡å·® | å°è¯•ä¸åŒ promptï¼Œä½¿ç”¨æ¡† + ç‚¹ç»„åˆ |
| è¾¹ç¼˜ä¼ªå½± | ä½¿ç”¨ stability_score è¿‡æ»¤ |
| å°å¯¹è±¡æ¼æ£€ | å¢žå¤§ points_per_side |

## å‚è€ƒèµ„æ–™

- **[é«˜çº§ç”¨æ³•](https://github.com/zedteam/zed-agent/blob/main/skills/mlops/models/segment-anything/references/advanced-usage.md)** - æ‰¹å¤„ç†ã€å¾®è°ƒã€é›†æˆ
- **[æ•…éšœæŽ’æŸ¥](https://github.com/zedteam/zed-agent/blob/main/skills/mlops/models/segment-anything/references/troubleshooting.md)** - å¸¸è§é—®é¢˜ä¸Žè§£å†³æ–¹æ¡ˆ

## èµ„æº

- **GitHub**ï¼šhttps://github.com/facebookresearch/segment-anything
- **è®ºæ–‡**ï¼šhttps://arxiv.org/abs/2304.02643
- **æ¼”ç¤º**ï¼šhttps://segment-anything.com
- **SAM 2ï¼ˆè§†é¢‘ï¼‰**ï¼šhttps://github.com/facebookresearch/segment-anything-2
- **HuggingFace**ï¼šhttps://huggingface.co/facebook/sam-vit-huge
