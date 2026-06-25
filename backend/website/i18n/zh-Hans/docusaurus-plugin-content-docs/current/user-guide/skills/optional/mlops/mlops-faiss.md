---
title: "Faiss â€” Facebook ç”¨äºŽé«˜æ•ˆç›¸ä¼¼æ€§æœç´¢å’Œå¯†é›†å‘é‡èšç±»çš„åº“"
sidebar_label: "Faiss"
description: "Facebook ç”¨äºŽé«˜æ•ˆç›¸ä¼¼æ€§æœç´¢å’Œå¯†é›†å‘é‡èšç±»çš„åº“"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Faiss

Facebook ç”¨äºŽé«˜æ•ˆç›¸ä¼¼æ€§æœç´¢å’Œå¯†é›†å‘é‡èšç±»çš„åº“ã€‚æ”¯æŒæ•°åäº¿å‘é‡ã€GPU åŠ é€Ÿä»¥åŠå¤šç§ç´¢å¼•ç±»åž‹ï¼ˆFlatã€IVFã€HNSWï¼‰ã€‚é€‚ç”¨äºŽå¿«é€Ÿ k-NN æœç´¢ã€å¤§è§„æ¨¡å‘é‡æ£€ç´¢ï¼Œæˆ–ä»…éœ€çº¯ç›¸ä¼¼æ€§æœç´¢è€Œæ— éœ€å…ƒæ•°æ®çš„åœºæ™¯ã€‚æœ€é€‚åˆé«˜æ€§èƒ½åº”ç”¨ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/faiss` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/faiss` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `faiss-cpu`, `faiss-gpu`, `numpy` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `RAG`, `FAISS`, `Similarity Search`, `Vector Search`, `Facebook AI`, `GPU Acceleration`, `Billion-Scale`, `K-NN`, `HNSW`, `High Performance`, `Large Scale` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# FAISS - é«˜æ•ˆç›¸ä¼¼æ€§æœç´¢

Facebook AI ç”¨äºŽåäº¿çº§å‘é‡ç›¸ä¼¼æ€§æœç´¢çš„åº“ã€‚

## ä½•æ—¶ä½¿ç”¨ FAISS

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ FAISSï¼š**
- éœ€è¦å¯¹å¤§åž‹å‘é‡æ•°æ®é›†ï¼ˆç™¾ä¸‡/åäº¿çº§ï¼‰è¿›è¡Œå¿«é€Ÿç›¸ä¼¼æ€§æœç´¢
- éœ€è¦ GPU åŠ é€Ÿ
- çº¯å‘é‡ç›¸ä¼¼æ€§æœç´¢ï¼ˆæ— éœ€å…ƒæ•°æ®è¿‡æ»¤ï¼‰
- å¯¹é«˜åžåé‡ã€ä½Žå»¶è¿Ÿæœ‰ä¸¥æ ¼è¦æ±‚
- å¯¹ embeddingï¼ˆåµŒå…¥å‘é‡ï¼‰è¿›è¡Œç¦»çº¿/æ‰¹é‡å¤„ç†

**æŒ‡æ ‡**ï¼š
- **GitHub 31,700+ æ˜Ÿ**
- Meta/Facebook AI Research å‡ºå“
- **æ”¯æŒæ•°åäº¿å‘é‡**
- **C++** å¹¶æä¾› Python ç»‘å®š

**ä»¥ä¸‹æƒ…å†µè¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆ**ï¼š
- **Chroma/Pinecone**ï¼šéœ€è¦å…ƒæ•°æ®è¿‡æ»¤
- **Weaviate**ï¼šéœ€è¦å®Œæ•´æ•°æ®åº“åŠŸèƒ½
- **Annoy**ï¼šæ›´ç®€å•ï¼ŒåŠŸèƒ½è¾ƒå°‘

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# ä»… CPU
pip install faiss-cpu

# GPU æ”¯æŒ
pip install faiss-gpu
```

### åŸºæœ¬ç”¨æ³•

```python
import faiss
import numpy as np

# åˆ›å»ºç¤ºä¾‹æ•°æ®ï¼ˆ1000 ä¸ªå‘é‡ï¼Œ128 ç»´ï¼‰
d = 128
nb = 1000
vectors = np.random.random((nb, d)).astype('float32')

# åˆ›å»ºç´¢å¼•
index = faiss.IndexFlatL2(d)  # L2 è·ç¦»
index.add(vectors)             # æ·»åŠ å‘é‡

# æœç´¢
k = 5  # æŸ¥æ‰¾ 5 ä¸ªæœ€è¿‘é‚»
query = np.random.random((1, d)).astype('float32')
distances, indices = index.search(query, k)

print(f"Nearest neighbors: {indices}")
print(f"Distances: {distances}")
```

## ç´¢å¼•ç±»åž‹

### 1. Flatï¼ˆç²¾ç¡®æœç´¢ï¼‰

```python
# L2ï¼ˆæ¬§æ°ï¼‰è·ç¦»
index = faiss.IndexFlatL2(d)

# å†…ç§¯ï¼ˆå½’ä¸€åŒ–åŽç­‰åŒäºŽä½™å¼¦ç›¸ä¼¼åº¦ï¼‰
index = faiss.IndexFlatIP(d)

# é€Ÿåº¦æœ€æ…¢ï¼Œç²¾åº¦æœ€é«˜
```

### 2. IVFï¼ˆå€’æŽ’æ–‡ä»¶ï¼‰- å¿«é€Ÿè¿‘ä¼¼æœç´¢

```python
# åˆ›å»ºé‡åŒ–å™¨
quantizer = faiss.IndexFlatL2(d)

# å« 100 ä¸ªèšç±»çš„ IVF ç´¢å¼•
nlist = 100
index = faiss.IndexIVFFlat(quantizer, d, nlist)

# åœ¨æ•°æ®ä¸Šè®­ç»ƒ
index.train(vectors)

# æ·»åŠ å‘é‡
index.add(vectors)

# æœç´¢ï¼ˆnprobe = æœç´¢çš„èšç±»æ•°ï¼‰
index.nprobe = 10
distances, indices = index.search(query, k)
```

### 3. HNSWï¼ˆåˆ†å±‚å°ä¸–ç•Œå›¾ï¼‰- è´¨é‡/é€Ÿåº¦æœ€ä½³å¹³è¡¡

```python
# HNSW ç´¢å¼•
M = 32  # æ¯å±‚è¿žæŽ¥æ•°
index = faiss.IndexHNSWFlat(d, M)

# æ— éœ€è®­ç»ƒ
index.add(vectors)

# æœç´¢
distances, indices = index.search(query, k)
```

### 4. ä¹˜ç§¯é‡åŒ–ï¼ˆProduct Quantizationï¼‰- å†…å­˜é«˜æ•ˆ

```python
# PQ å¯å°†å†…å­˜å‡å°‘ 16-32 å€
m = 8   # å­é‡åŒ–å™¨æ•°é‡
nbits = 8
index = faiss.IndexPQ(d, m, nbits)

# è®­ç»ƒå¹¶æ·»åŠ 
index.train(vectors)
index.add(vectors)
```

## ä¿å­˜ä¸ŽåŠ è½½

```python
# ä¿å­˜ç´¢å¼•
faiss.write_index(index, "large.index")

# åŠ è½½ç´¢å¼•
index = faiss.read_index("large.index")

# ç»§ç»­ä½¿ç”¨
distances, indices = index.search(query, k)
```

## GPU åŠ é€Ÿ

```python
# å• GPU
res = faiss.StandardGpuResources()
index_cpu = faiss.IndexFlatL2(d)
index_gpu = faiss.index_cpu_to_gpu(res, 0, index_cpu)  # GPU 0

# å¤š GPU
index_gpu = faiss.index_cpu_to_all_gpus(index_cpu)

# æ¯” CPU å¿« 10-100 å€
```

## LangChain é›†æˆ

```python
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

# åˆ›å»º FAISS å‘é‡å­˜å‚¨
vectorstore = FAISS.from_documents(docs, OpenAIEmbeddings())

# ä¿å­˜
vectorstore.save_local("faiss_index")

# åŠ è½½
vectorstore = FAISS.load_local(
    "faiss_index",
    OpenAIEmbeddings(),
    allow_dangerous_deserialization=True
)

# æœç´¢
results = vectorstore.similarity_search("query", k=5)
```

## LlamaIndex é›†æˆ

```python
from llama_index.vector_stores.faiss import FaissVectorStore
import faiss

# åˆ›å»º FAISS ç´¢å¼•
d = 1536
faiss_index = faiss.IndexFlatL2(d)

vector_store = FaissVectorStore(faiss_index=faiss_index)
```

## æœ€ä½³å®žè·µ

1. **é€‰æ‹©åˆé€‚çš„ç´¢å¼•ç±»åž‹** â€” 10K ä»¥ä¸‹ç”¨ Flatï¼Œ10K-1M ç”¨ IVFï¼Œè¿½æ±‚è´¨é‡ç”¨ HNSW
2. **ä½™å¼¦ç›¸ä¼¼åº¦éœ€å½’ä¸€åŒ–** â€” å¯¹å½’ä¸€åŒ–å‘é‡ä½¿ç”¨ IndexFlatIP
3. **å¤§æ•°æ®é›†ä½¿ç”¨ GPU** â€” é€Ÿåº¦æå‡ 10-100 å€
4. **ä¿å­˜å·²è®­ç»ƒçš„ç´¢å¼•** â€” è®­ç»ƒæˆæœ¬è¾ƒé«˜
5. **è°ƒæ•´ nprobe/ef_search** â€” å¹³è¡¡é€Ÿåº¦ä¸Žç²¾åº¦
6. **ç›‘æŽ§å†…å­˜ä½¿ç”¨** â€” å¤§æ•°æ®é›†ä½¿ç”¨ PQ
7. **æ‰¹é‡æŸ¥è¯¢** â€” æå‡ GPU åˆ©ç”¨çŽ‡

## æ€§èƒ½å¯¹æ¯”

| ç´¢å¼•ç±»åž‹ | æž„å»ºæ—¶é—´ | æœç´¢æ—¶é—´ | å†…å­˜å ç”¨ | ç²¾åº¦ |
|----------|----------|----------|----------|------|
| Flat | å¿« | æ…¢ | é«˜ | 100% |
| IVF | ä¸­ç­‰ | å¿« | ä¸­ç­‰ | 95-99% |
| HNSW | æ…¢ | æœ€å¿« | é«˜ | 99% |
| PQ | ä¸­ç­‰ | å¿« | ä½Ž | 90-95% |

## èµ„æº

- **GitHub**ï¼šhttps://github.com/facebookresearch/faiss â­ 31,700+
- **Wiki**ï¼šhttps://github.com/facebookresearch/faiss/wiki
- **è®¸å¯è¯**ï¼šMIT