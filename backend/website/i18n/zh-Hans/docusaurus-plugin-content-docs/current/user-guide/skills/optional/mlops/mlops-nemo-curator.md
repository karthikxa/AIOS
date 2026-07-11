---
title: "Nemo Curator â€” ç”¨äºŽ LLM è®­ç»ƒçš„ GPU åŠ é€Ÿæ•°æ®æ•´ç†å·¥å…·"
sidebar_label: "Nemo Curator"
description: "ç”¨äºŽ LLM è®­ç»ƒçš„ GPU åŠ é€Ÿæ•°æ®æ•´ç†å·¥å…·"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Nemo Curator

ç”¨äºŽ LLM è®­ç»ƒçš„ GPU åŠ é€Ÿæ•°æ®æ•´ç†å·¥å…·ã€‚æ”¯æŒæ–‡æœ¬/å›¾åƒ/è§†é¢‘/éŸ³é¢‘ã€‚å…·å¤‡æ¨¡ç³ŠåŽ»é‡ï¼ˆé€Ÿåº¦æå‡ 16Ã—ï¼‰ã€è´¨é‡è¿‡æ»¤ï¼ˆ30+ å¯å‘å¼è§„åˆ™ï¼‰ã€è¯­ä¹‰åŽ»é‡ã€PII è„±æ•ã€NSFW æ£€æµ‹ç­‰åŠŸèƒ½ã€‚é€šè¿‡ RAPIDS è·¨ GPU æ‰©å±•ã€‚é€‚ç”¨äºŽå‡†å¤‡é«˜è´¨é‡è®­ç»ƒæ•°æ®é›†ã€æ¸…æ´—ç½‘ç»œæ•°æ®æˆ–å¯¹å¤§åž‹è¯­æ–™åº“åŽ»é‡ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/nemo-curator` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/nemo-curator` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `nemo-curator`, `cudf`, `dask`, `rapids` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Data Processing`, `NeMo Curator`, `Data Curation`, `GPU Acceleration`, `Deduplication`, `Quality Filtering`, `NVIDIA`, `RAPIDS`, `PII Redaction`, `Multimodal`, `LLM Training Data` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# NeMo Curator - GPU åŠ é€Ÿæ•°æ®æ•´ç†

NVIDIA ç”¨äºŽä¸º LLM å‡†å¤‡é«˜è´¨é‡è®­ç»ƒæ•°æ®çš„å·¥å…·åŒ…ã€‚

## ä½•æ—¶ä½¿ç”¨ NeMo Curator

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ NeMo Curatorï¼š**
- ä»Žç½‘ç»œæŠ“å–æ•°æ®ï¼ˆCommon Crawlï¼‰å‡†å¤‡ LLM è®­ç»ƒæ•°æ®
- éœ€è¦å¿«é€ŸåŽ»é‡ï¼ˆæ¯” CPU å¿« 16Ã—ï¼‰
- æ•´ç†å¤šæ¨¡æ€æ•°æ®é›†ï¼ˆæ–‡æœ¬ã€å›¾åƒã€è§†é¢‘ã€éŸ³é¢‘ï¼‰
- è¿‡æ»¤ä½Žè´¨é‡æˆ–æœ‰å®³å†…å®¹
- è·¨ GPU é›†ç¾¤æ‰©å±•æ•°æ®å¤„ç†

**æ€§èƒ½**ï¼š
- **16Ã— æ›´å¿«**çš„æ¨¡ç³ŠåŽ»é‡ï¼ˆ8TB RedPajama v2ï¼‰
- **é™ä½Ž 40% TCO**ï¼ˆæ€»æ‹¥æœ‰æˆæœ¬ï¼‰ï¼Œä¼˜äºŽ CPU æ–¹æ¡ˆ
- **è¿‘çº¿æ€§æ‰©å±•**ï¼Œè·¨ GPU èŠ‚ç‚¹

**ä»¥ä¸‹æƒ…å†µè¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆ**ï¼š
- **datatrove**ï¼šåŸºäºŽ CPU çš„å¼€æºæ•°æ®å¤„ç†
- **dolma**ï¼šAllen AI çš„æ•°æ®å·¥å…·åŒ…
- **Ray Data**ï¼šé€šç”¨ ML æ•°æ®å¤„ç†ï¼ˆæ— æ•°æ®æ•´ç†ä¸“é¡¹åŠŸèƒ½ï¼‰

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# æ–‡æœ¬æ•´ç†ï¼ˆCUDA 12ï¼‰
uv pip install "nemo-curator[text_cuda12]"

# æ‰€æœ‰æ¨¡æ€
uv pip install "nemo-curator[all_cuda12]"

# ä»… CPUï¼ˆè¾ƒæ…¢ï¼‰
uv pip install "nemo-curator[cpu]"
```

### åŸºç¡€æ–‡æœ¬æ•´ç†æµæ°´çº¿

```python
from nemo_curator import ScoreFilter, Modify
from nemo_curator.datasets import DocumentDataset
import pandas as pd

# åŠ è½½æ•°æ®
df = pd.DataFrame({"text": ["Good document", "Bad doc", "Excellent text"]})
dataset = DocumentDataset(df)

# è´¨é‡è¿‡æ»¤
def quality_score(doc):
    return len(doc["text"].split()) > 5  # Filter short docs

filtered = ScoreFilter(quality_score)(dataset)

# åŽ»é‡
from nemo_curator.modules import ExactDuplicates
deduped = ExactDuplicates()(filtered)

# ä¿å­˜
deduped.to_parquet("curated_data/")
```

## æ•°æ®æ•´ç†æµæ°´çº¿

### é˜¶æ®µ 1ï¼šè´¨é‡è¿‡æ»¤

```python
from nemo_curator.filters import (
    WordCountFilter,
    RepeatedLinesFilter,
    UrlRatioFilter,
    NonAlphaNumericFilter
)

# åº”ç”¨ 30+ å¯å‘å¼è¿‡æ»¤å™¨
from nemo_curator import ScoreFilter

# è¯æ•°è¿‡æ»¤
dataset = dataset.filter(WordCountFilter(min_words=50, max_words=100000))

# åŽ»é™¤é‡å¤å†…å®¹
dataset = dataset.filter(RepeatedLinesFilter(max_repeated_line_fraction=0.3))

# URL æ¯”ä¾‹è¿‡æ»¤
dataset = dataset.filter(UrlRatioFilter(max_url_ratio=0.2))
```

### é˜¶æ®µ 2ï¼šåŽ»é‡

**ç²¾ç¡®åŽ»é‡**ï¼š
```python
from nemo_curator.modules import ExactDuplicates

# åˆ é™¤å®Œå…¨é‡å¤é¡¹
deduped = ExactDuplicates(id_field="id", text_field="text")(dataset)
```

**æ¨¡ç³ŠåŽ»é‡**ï¼ˆGPU ä¸Šé€Ÿåº¦æå‡ 16Ã—ï¼‰ï¼š
```python
from nemo_curator.modules import FuzzyDuplicates

# MinHash + LSH åŽ»é‡
fuzzy_dedup = FuzzyDuplicates(
    id_field="id",
    text_field="text",
    num_hashes=260,      # MinHash parameters
    num_buckets=20,
    hash_method="md5"
)

deduped = fuzzy_dedup(dataset)
```

**è¯­ä¹‰åŽ»é‡**ï¼š
```python
from nemo_curator.modules import SemanticDuplicates

# åŸºäºŽ embeddingï¼ˆå‘é‡åµŒå…¥ï¼‰çš„åŽ»é‡
semantic_dedup = SemanticDuplicates(
    id_field="id",
    text_field="text",
    embedding_model="sentence-transformers/all-MiniLM-L6-v2",
    threshold=0.8  # Cosine similarity threshold
)

deduped = semantic_dedup(dataset)
```

### é˜¶æ®µ 3ï¼šPII è„±æ•

```python
from nemo_curator.modules import Modify
from nemo_curator.modifiers import PIIRedactor

# è„±æ•ä¸ªäººèº«ä»½ä¿¡æ¯ï¼ˆPIIï¼‰
pii_redactor = PIIRedactor(
    supported_entities=["EMAIL_ADDRESS", "PHONE_NUMBER", "PERSON", "LOCATION"],
    anonymize_action="replace"  # or "redact"
)

redacted = Modify(pii_redactor)(dataset)
```

### é˜¶æ®µ 4ï¼šåˆ†ç±»å™¨è¿‡æ»¤

```python
from nemo_curator.classifiers import QualityClassifier

# è´¨é‡åˆ†ç±»
quality_clf = QualityClassifier(
    model_path="nvidia/quality-classifier-deberta",
    batch_size=256,
    device="cuda"
)

# è¿‡æ»¤ä½Žè´¨é‡æ–‡æ¡£
high_quality = dataset.filter(lambda doc: quality_clf(doc["text"]) > 0.5)
```

## GPU åŠ é€Ÿ

### GPU ä¸Ž CPU æ€§èƒ½å¯¹æ¯”

| æ“ä½œ | CPUï¼ˆ16 æ ¸ï¼‰ | GPUï¼ˆA100ï¼‰ | åŠ é€Ÿæ¯” |
|-----------|----------------|------------|---------|
| æ¨¡ç³ŠåŽ»é‡ï¼ˆ8TBï¼‰ | 120 å°æ—¶ | 7.5 å°æ—¶ | 16Ã— |
| ç²¾ç¡®åŽ»é‡ï¼ˆ1TBï¼‰ | 8 å°æ—¶ | 0.5 å°æ—¶ | 16Ã— |
| è´¨é‡è¿‡æ»¤ | 2 å°æ—¶ | 0.2 å°æ—¶ | 10Ã— |

### å¤š GPU æ‰©å±•

```python
from nemo_curator import get_client
import dask_cuda

# åˆå§‹åŒ– GPU é›†ç¾¤
client = get_client(cluster_type="gpu", n_workers=8)

# ä½¿ç”¨ 8 å— GPU å¤„ç†
deduped = FuzzyDuplicates(...)(dataset)
```

## å¤šæ¨¡æ€æ•°æ®æ•´ç†

### å›¾åƒæ•´ç†

```python
from nemo_curator.image import (
    AestheticFilter,
    NSFWFilter,
    CLIPEmbedder
)

# ç¾Žå­¦è¯„åˆ†
aesthetic_filter = AestheticFilter(threshold=5.0)
filtered_images = aesthetic_filter(image_dataset)

# NSFW æ£€æµ‹
nsfw_filter = NSFWFilter(threshold=0.9)
safe_images = nsfw_filter(filtered_images)

# ç”Ÿæˆ CLIP embedding
clip_embedder = CLIPEmbedder(model="openai/clip-vit-base-patch32")
image_embeddings = clip_embedder(safe_images)
```

### è§†é¢‘æ•´ç†

```python
from nemo_curator.video import (
    SceneDetector,
    ClipExtractor,
    InternVideo2Embedder
)

# åœºæ™¯æ£€æµ‹
scene_detector = SceneDetector(threshold=27.0)
scenes = scene_detector(video_dataset)

# æå–ç‰‡æ®µ
clip_extractor = ClipExtractor(min_duration=2.0, max_duration=10.0)
clips = clip_extractor(scenes)

# ç”Ÿæˆ embedding
video_embedder = InternVideo2Embedder()
video_embeddings = video_embedder(clips)
```

### éŸ³é¢‘æ•´ç†

```python
from nemo_curator.audio import (
    ASRInference,
    WERFilter,
    DurationFilter
)

# ASR è½¬å½•
asr = ASRInference(model="nvidia/stt_en_fastconformer_hybrid_large_pc")
transcribed = asr(audio_dataset)

# æŒ‰ WERï¼ˆè¯é”™è¯¯çŽ‡ï¼‰è¿‡æ»¤
wer_filter = WERFilter(max_wer=0.3)
high_quality_audio = wer_filter(transcribed)

# æ—¶é•¿è¿‡æ»¤
duration_filter = DurationFilter(min_duration=1.0, max_duration=30.0)
filtered_audio = duration_filter(high_quality_audio)
```

## å¸¸è§æ¨¡å¼

### ç½‘ç»œæŠ“å–æ•°æ®æ•´ç†ï¼ˆCommon Crawlï¼‰

```python
from nemo_curator import ScoreFilter, Modify
from nemo_curator.filters import *
from nemo_curator.modules import *
from nemo_curator.datasets import DocumentDataset

# åŠ è½½ Common Crawl æ•°æ®
dataset = DocumentDataset.read_parquet("common_crawl/*.parquet")

# æµæ°´çº¿
pipeline = [
    # 1. è´¨é‡è¿‡æ»¤
    WordCountFilter(min_words=100, max_words=50000),
    RepeatedLinesFilter(max_repeated_line_fraction=0.2),
    SymbolToWordRatioFilter(max_symbol_to_word_ratio=0.3),
    UrlRatioFilter(max_url_ratio=0.3),

    # 2. è¯­è¨€è¿‡æ»¤
    LanguageIdentificationFilter(target_languages=["en"]),

    # 3. åŽ»é‡
    ExactDuplicates(id_field="id", text_field="text"),
    FuzzyDuplicates(id_field="id", text_field="text", num_hashes=260),

    # 4. PII è„±æ•
    PIIRedactor(),

    # 5. NSFW è¿‡æ»¤
    NSFWClassifier(threshold=0.8)
]

# æ‰§è¡Œ
for stage in pipeline:
    dataset = stage(dataset)

# ä¿å­˜
dataset.to_parquet("curated_common_crawl/")
```

### åˆ†å¸ƒå¼å¤„ç†

```python
from nemo_curator import get_client
from dask_cuda import LocalCUDACluster

# å¤š GPU é›†ç¾¤
cluster = LocalCUDACluster(n_workers=8)
client = get_client(cluster=cluster)

# å¤„ç†å¤§åž‹æ•°æ®é›†
dataset = DocumentDataset.read_parquet("s3://large_dataset/*.parquet")
deduped = FuzzyDuplicates(...)(dataset)

# æ¸…ç†
client.close()
cluster.close()
```

## æ€§èƒ½åŸºå‡†

### æ¨¡ç³ŠåŽ»é‡ï¼ˆ8TB RedPajama v2ï¼‰

- **CPUï¼ˆ256 æ ¸ï¼‰**ï¼š120 å°æ—¶
- **GPUï¼ˆ8Ã— A100ï¼‰**ï¼š7.5 å°æ—¶
- **åŠ é€Ÿæ¯”**ï¼š16Ã—

### ç²¾ç¡®åŽ»é‡ï¼ˆ1TBï¼‰

- **CPUï¼ˆ64 æ ¸ï¼‰**ï¼š8 å°æ—¶
- **GPUï¼ˆ4Ã— A100ï¼‰**ï¼š0.5 å°æ—¶
- **åŠ é€Ÿæ¯”**ï¼š16Ã—

### è´¨é‡è¿‡æ»¤ï¼ˆ100GBï¼‰

- **CPUï¼ˆ32 æ ¸ï¼‰**ï¼š2 å°æ—¶
- **GPUï¼ˆ2Ã— A100ï¼‰**ï¼š0.2 å°æ—¶
- **åŠ é€Ÿæ¯”**ï¼š10Ã—

## æˆæœ¬å¯¹æ¯”

**åŸºäºŽ CPU çš„æ•°æ®æ•´ç†**ï¼ˆAWS c5.18xlarge Ã— 10ï¼‰ï¼š
- è´¹ç”¨ï¼š$3.60/å°æ—¶ Ã— 10 = $36/å°æ—¶
- å¤„ç† 8TB è€—æ—¶ï¼š120 å°æ—¶
- **åˆè®¡**ï¼š$4,320

**åŸºäºŽ GPU çš„æ•°æ®æ•´ç†**ï¼ˆAWS p4d.24xlarge Ã— 2ï¼‰ï¼š
- è´¹ç”¨ï¼š$32.77/å°æ—¶ Ã— 2 = $65.54/å°æ—¶
- å¤„ç† 8TB è€—æ—¶ï¼š7.5 å°æ—¶
- **åˆè®¡**ï¼š$491.55

**èŠ‚çœ**ï¼šé™ä½Ž 89%ï¼ˆèŠ‚çœ $3,828ï¼‰

## æ”¯æŒçš„æ•°æ®æ ¼å¼

- **è¾“å…¥**ï¼šParquetã€JSONLã€CSV
- **è¾“å‡º**ï¼šParquetï¼ˆæŽ¨èï¼‰ã€JSONL
- **WebDataset**ï¼šç”¨äºŽå¤šæ¨¡æ€çš„ TAR å½’æ¡£

## ä½¿ç”¨åœºæ™¯

**ç”Ÿäº§éƒ¨ç½²**ï¼š
- NVIDIA ä½¿ç”¨ NeMo Curator å‡†å¤‡ Nemotron-4 è®­ç»ƒæ•°æ®
- å·²æ•´ç†çš„å¼€æºæ•°æ®é›†ï¼šRedPajama v2ã€The Pile

## å‚è€ƒèµ„æ–™

- **[è¿‡æ»¤æŒ‡å—](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/nemo-curator/references/filtering.md)** - 30+ è´¨é‡è¿‡æ»¤å™¨ä¸Žå¯å‘å¼è§„åˆ™
- **[åŽ»é‡æŒ‡å—](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/nemo-curator/references/deduplication.md)** - ç²¾ç¡®ã€æ¨¡ç³Šã€è¯­ä¹‰åŽ»é‡æ–¹æ³•

## èµ„æº

- **GitHub**ï¼šhttps://github.com/NVIDIA/NeMo-Curator â­ 500+
- **æ–‡æ¡£**ï¼šhttps://docs.nvidia.com/nemo-framework/user-guide/latest/datacuration/
- **ç‰ˆæœ¬**ï¼š0.4.0+
- **è®¸å¯è¯**ï¼šApache 2.0
