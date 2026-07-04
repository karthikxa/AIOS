---
title: "Clip â€” OpenAI è¿žæŽ¥è§†è§‰ä¸Žè¯­è¨€çš„æ¨¡åž‹"
sidebar_label: "Clip"
description: "OpenAI è¿žæŽ¥è§†è§‰ä¸Žè¯­è¨€çš„æ¨¡åž‹"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Clip

OpenAI è¿žæŽ¥è§†è§‰ä¸Žè¯­è¨€çš„æ¨¡åž‹ã€‚æ”¯æŒé›¶æ ·æœ¬å›¾åƒåˆ†ç±»ã€å›¾æ–‡åŒ¹é…å’Œè·¨æ¨¡æ€æ£€ç´¢ã€‚åœ¨ 4 äº¿å›¾æ–‡å¯¹ä¸Šè®­ç»ƒè€Œæˆã€‚å¯ç”¨äºŽå›¾åƒæœç´¢ã€å†…å®¹å®¡æ ¸æˆ–è§†è§‰è¯­è¨€ä»»åŠ¡ï¼Œæ— éœ€å¾®è°ƒã€‚æœ€é€‚åˆé€šç”¨å›¾åƒç†è§£åœºæ™¯ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/clip` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/clip` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `transformers`, `torch`, `pillow` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Multimodal`, `CLIP`, `Vision-Language`, `Zero-Shot`, `Image Classification`, `OpenAI`, `Image Search`, `Cross-Modal Retrieval`, `Content Moderation` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# CLIP - å¯¹æ¯”è¯­è¨€å›¾åƒé¢„è®­ç»ƒï¼ˆContrastive Language-Image Pre-Trainingï¼‰

OpenAI æŽ¨å‡ºçš„èƒ½å¤Ÿé€šè¿‡è‡ªç„¶è¯­è¨€ç†è§£å›¾åƒçš„æ¨¡åž‹ã€‚

## ä½•æ—¶ä½¿ç”¨ CLIP

**é€‚ç”¨åœºæ™¯ï¼š**
- é›¶æ ·æœ¬å›¾åƒåˆ†ç±»ï¼ˆæ— éœ€è®­ç»ƒæ•°æ®ï¼‰
- å›¾æ–‡ç›¸ä¼¼åº¦/åŒ¹é…
- è¯­ä¹‰å›¾åƒæœç´¢
- å†…å®¹å®¡æ ¸ï¼ˆæ£€æµ‹ NSFWã€æš´åŠ›å†…å®¹ï¼‰
- è§†è§‰é—®ç­”
- è·¨æ¨¡æ€æ£€ç´¢ï¼ˆå›¾åƒâ†’æ–‡æœ¬ã€æ–‡æœ¬â†’å›¾åƒï¼‰

**æŒ‡æ ‡**ï¼š
- **GitHub 25,300+ æ˜Ÿ**
- åœ¨ 4 äº¿å›¾æ–‡å¯¹ä¸Šè®­ç»ƒ
- é›¶æ ·æœ¬ä¸‹åœ¨ ImageNet ä¸Šä¸Ž ResNet-50 æŒå¹³
- MIT è®¸å¯è¯

**ä»¥ä¸‹æƒ…å†µè¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆ**ï¼š
- **BLIP-2**ï¼šæ›´å¥½çš„å›¾åƒæè¿°ç”Ÿæˆ
- **LLaVA**ï¼šè§†è§‰è¯­è¨€å¯¹è¯
- **Segment Anything**ï¼šå›¾åƒåˆ†å‰²

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
pip install git+https://github.com/openai/CLIP.git
pip install torch torchvision ftfy regex tqdm
```

### é›¶æ ·æœ¬åˆ†ç±»

```python
import torch
import clip
from PIL import Image

# Load model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Load image
image = preprocess(Image.open("photo.jpg")).unsqueeze(0).to(device)

# Define possible labels
text = clip.tokenize(["a dog", "a cat", "a bird", "a car"]).to(device)

# Compute similarity
with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)

    # Cosine similarity
    logits_per_image, logits_per_text = model(image, text)
    probs = logits_per_image.softmax(dim=-1).cpu().numpy()

# Print results
labels = ["a dog", "a cat", "a bird", "a car"]
for label, prob in zip(labels, probs[0]):
    print(f"{label}: {prob:.2%}")
```

## å¯ç”¨æ¨¡åž‹

```python
# Models (sorted by size)
models = [
    "RN50",           # ResNet-50
    "RN101",          # ResNet-101
    "ViT-B/32",       # Vision Transformer (recommended)
    "ViT-B/16",       # Better quality, slower
    "ViT-L/14",       # Best quality, slowest
]

model, preprocess = clip.load("ViT-B/32")
```

| æ¨¡åž‹ | å‚æ•°é‡ | é€Ÿåº¦ | è´¨é‡ |
|-------|------------|-------|---------|
| RN50 | 102M | å¿« | è‰¯å¥½ |
| ViT-B/32 | 151M | ä¸­ç­‰ | æ›´å¥½ |
| ViT-L/14 | 428M | æ…¢ | æœ€ä½³ |

## å›¾æ–‡ç›¸ä¼¼åº¦

```python
# Compute embeddings
image_features = model.encode_image(image)
text_features = model.encode_text(text)

# Normalize
image_features /= image_features.norm(dim=-1, keepdim=True)
text_features /= text_features.norm(dim=-1, keepdim=True)

# Cosine similarity
similarity = (image_features @ text_features.T).item()
print(f"Similarity: {similarity:.4f}")
```

## è¯­ä¹‰å›¾åƒæœç´¢

```python
# Index images
image_paths = ["img1.jpg", "img2.jpg", "img3.jpg"]
image_embeddings = []

for img_path in image_paths:
    image = preprocess(Image.open(img_path)).unsqueeze(0).to(device)
    with torch.no_grad():
        embedding = model.encode_image(image)
        embedding /= embedding.norm(dim=-1, keepdim=True)
    image_embeddings.append(embedding)

image_embeddings = torch.cat(image_embeddings)

# Search with text query
query = "a sunset over the ocean"
text_input = clip.tokenize([query]).to(device)
with torch.no_grad():
    text_embedding = model.encode_text(text_input)
    text_embedding /= text_embedding.norm(dim=-1, keepdim=True)

# Find most similar images
similarities = (text_embedding @ image_embeddings.T).squeeze(0)
top_k = similarities.topk(3)

for idx, score in zip(top_k.indices, top_k.values):
    print(f"{image_paths[idx]}: {score:.3f}")
```

## å†…å®¹å®¡æ ¸

```python
# Define categories
categories = [
    "safe for work",
    "not safe for work",
    "violent content",
    "graphic content"
]

text = clip.tokenize(categories).to(device)

# Check image
with torch.no_grad():
    logits_per_image, _ = model(image, text)
    probs = logits_per_image.softmax(dim=-1)

# Get classification
max_idx = probs.argmax().item()
max_prob = probs[0, max_idx].item()

print(f"Category: {categories[max_idx]} ({max_prob:.2%})")
```

## æ‰¹é‡å¤„ç†

```python
# Process multiple images
images = [preprocess(Image.open(f"img{i}.jpg")) for i in range(10)]
images = torch.stack(images).to(device)

with torch.no_grad():
    image_features = model.encode_image(images)
    image_features /= image_features.norm(dim=-1, keepdim=True)

# Batch text
texts = ["a dog", "a cat", "a bird"]
text_tokens = clip.tokenize(texts).to(device)

with torch.no_grad():
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(dim=-1, keepdim=True)

# Similarity matrix (10 images Ã— 3 texts)
similarities = image_features @ text_features.T
print(similarities.shape)  # (10, 3)
```

## ä¸Žå‘é‡æ•°æ®åº“é›†æˆ

```python
# Store CLIP embeddings in Chroma/FAISS
import chromadb

client = chromadb.Client()
collection = client.create_collection("image_embeddings")

# Add image embeddings
for img_path, embedding in zip(image_paths, image_embeddings):
    collection.add(
        embeddings=[embedding.cpu().numpy().tolist()],
        metadatas=[{"path": img_path}],
        ids=[img_path]
    )

# Query with text
query = "a sunset"
text_embedding = model.encode_text(clip.tokenize([query]))
results = collection.query(
    query_embeddings=[text_embedding.cpu().numpy().tolist()],
    n_results=5
)
```

## æœ€ä½³å®žè·µ

1. **å¤§å¤šæ•°åœºæ™¯ä½¿ç”¨ ViT-B/32** â€” æ€§èƒ½ä¸Žé€Ÿåº¦å‡è¡¡
2. **å½’ä¸€åŒ– embeddingï¼ˆåµŒå…¥å‘é‡ï¼‰** â€” ä½™å¼¦ç›¸ä¼¼åº¦è®¡ç®—å¿…é¡»å½’ä¸€åŒ–
3. **æ‰¹é‡å¤„ç†** â€” æ•ˆçŽ‡æ›´é«˜
4. **ç¼“å­˜ embedding** â€” é‡æ–°è®¡ç®—ä»£ä»·è¾ƒé«˜
5. **ä½¿ç”¨æè¿°æ€§æ ‡ç­¾** â€” é›¶æ ·æœ¬æ€§èƒ½æ›´å¥½
6. **æŽ¨èä½¿ç”¨ GPU** â€” é€Ÿåº¦æå‡ 10â€“50 å€
7. **é¢„å¤„ç†å›¾åƒ** â€” ä½¿ç”¨æä¾›çš„ preprocess å‡½æ•°

## æ€§èƒ½

| æ“ä½œ | CPU | GPU (V100) |
|-----------|-----|------------|
| å›¾åƒç¼–ç  | ~200ms | ~20ms |
| æ–‡æœ¬ç¼–ç  | ~50ms | ~5ms |
| ç›¸ä¼¼åº¦è®¡ç®— | &lt;1ms | &lt;1ms |

## å±€é™æ€§

1. **ä¸é€‚åˆç»†ç²’åº¦ä»»åŠ¡** â€” æœ€é€‚åˆå®½æ³›ç±»åˆ«
2. **éœ€è¦æè¿°æ€§æ–‡æœ¬** â€” æ¨¡ç³Šæ ‡ç­¾æ•ˆæžœå·®
3. **ç½‘ç»œæ•°æ®åå·®** â€” å¯èƒ½å­˜åœ¨æ•°æ®é›†åå·®
4. **æ— è¾¹ç•Œæ¡†** â€” ä»…å¤„ç†æ•´å¼ å›¾åƒ
5. **ç©ºé—´ç†è§£æœ‰é™** â€” ä½ç½®/è®¡æ•°èƒ½åŠ›è¾ƒå¼±

## èµ„æº

- **GitHub**: https://github.com/openai/CLIP â­ 25,300+
- **è®ºæ–‡**: https://arxiv.org/abs/2103.00020
- **Colab**: https://colab.research.google.com/github/openai/clip/
- **è®¸å¯è¯**: MIT