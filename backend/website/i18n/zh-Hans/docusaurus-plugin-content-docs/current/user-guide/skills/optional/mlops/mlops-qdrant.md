---
title: "Qdrant Vector Search â€” ç”¨äºŽ RAG å’Œè¯­ä¹‰æœç´¢çš„é«˜æ€§èƒ½å‘é‡ç›¸ä¼¼åº¦æœç´¢å¼•æ“Ž"
sidebar_label: "Qdrant Vector Search"
description: "ç”¨äºŽ RAG å’Œè¯­ä¹‰æœç´¢çš„é«˜æ€§èƒ½å‘é‡ç›¸ä¼¼åº¦æœç´¢å¼•æ“Ž"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Qdrant Vector Search

ç”¨äºŽ RAG å’Œè¯­ä¹‰æœç´¢çš„é«˜æ€§èƒ½å‘é‡ç›¸ä¼¼åº¦æœç´¢å¼•æ“Žã€‚é€‚ç”¨äºŽæž„å»ºéœ€è¦å¿«é€Ÿæœ€è¿‘é‚»æœç´¢ã€å¸¦è¿‡æ»¤çš„æ··åˆæœç´¢ï¼Œæˆ–åŸºäºŽ Rust é«˜æ€§èƒ½çš„å¯æ‰©å±•å‘é‡å­˜å‚¨çš„ç”Ÿäº§çº§ RAG ç³»ç»Ÿã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/mlops/qdrant` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/qdrant` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `qdrant-client>=1.12.0` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `RAG`, `Vector Search`, `Qdrant`, `Semantic Search`, `Embeddings`, `Similarity Search`, `HNSW`, `Production`, `Distributed` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Qdrant - å‘é‡ç›¸ä¼¼åº¦æœç´¢å¼•æ“Ž

ç”¨ Rust ç¼–å†™çš„é«˜æ€§èƒ½å‘é‡æ•°æ®åº“ï¼Œé€‚ç”¨äºŽç”Ÿäº§çº§ RAG å’Œè¯­ä¹‰æœç´¢ã€‚

## ä½•æ—¶ä½¿ç”¨ Qdrant

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ Qdrantï¼š**
- æž„å»ºéœ€è¦ä½Žå»¶è¿Ÿçš„ç”Ÿäº§çº§ RAG ç³»ç»Ÿ
- éœ€è¦æ··åˆæœç´¢ï¼ˆå‘é‡ + å…ƒæ•°æ®è¿‡æ»¤ï¼‰
- éœ€è¦é€šè¿‡åˆ†ç‰‡/å‰¯æœ¬å®žçŽ°æ°´å¹³æ‰©å±•
- å¸Œæœ›æœ¬åœ°éƒ¨ç½²å¹¶å®Œå…¨æŽŒæŽ§æ•°æ®
- æ¯æ¡è®°å½•éœ€è¦å¤šå‘é‡å­˜å‚¨ï¼ˆç¨ å¯† + ç¨€ç–ï¼‰
- æž„å»ºå®žæ—¶æŽ¨èç³»ç»Ÿ

**æ ¸å¿ƒç‰¹æ€§ï¼š**
- **Rust é©±åŠ¨**ï¼šå†…å­˜å®‰å…¨ï¼Œé«˜æ€§èƒ½
- **ä¸°å¯Œè¿‡æ»¤**ï¼šåœ¨æœç´¢æ—¶æŒ‰ä»»æ„ payload å­—æ®µè¿‡æ»¤
- **å¤šå‘é‡**ï¼šæ¯ä¸ªç‚¹æ”¯æŒç¨ å¯†ã€ç¨€ç–ã€å¤šç¨ å¯†å‘é‡
- **é‡åŒ–**ï¼šæ ‡é‡ã€ä¹˜ç§¯ã€äºŒå€¼é‡åŒ–ï¼ŒèŠ‚çœå†…å­˜
- **åˆ†å¸ƒå¼**ï¼šRaft å…±è¯†ã€åˆ†ç‰‡ã€å‰¯æœ¬
- **REST + gRPC**ï¼šä¸¤å¥— API åŠŸèƒ½å®Œå…¨å¯¹ç­‰

**ä»¥ä¸‹æƒ…å†µè¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆï¼š**
- **Chroma**ï¼šæ›´ç®€å•çš„é…ç½®ï¼ŒåµŒå…¥å¼ä½¿ç”¨åœºæ™¯
- **FAISS**ï¼šè¿½æ±‚æžè‡´åŽŸå§‹é€Ÿåº¦ï¼Œç ”ç©¶/æ‰¹å¤„ç†åœºæ™¯
- **Pinecone**ï¼šå®Œå…¨æ‰˜ç®¡ï¼Œé›¶è¿ç»´åå¥½
- **Weaviate**ï¼šåå¥½ GraphQLï¼Œå†…ç½®å‘é‡åŒ–å™¨

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# Python å®¢æˆ·ç«¯
pip install qdrant-client

# Dockerï¼ˆæŽ¨èç”¨äºŽå¼€å‘ï¼‰
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant

# Docker æŒä¹…åŒ–å­˜å‚¨
docker run -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage \
    qdrant/qdrant
```

### åŸºæœ¬ç”¨æ³•

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

# è¿žæŽ¥åˆ° Qdrant
client = QdrantClient(host="localhost", port=6333)

# åˆ›å»ºé›†åˆ
client.create_collection(
    collection_name="documents",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE)
)

# æ’å…¥å¸¦ payload çš„å‘é‡
client.upsert(
    collection_name="documents",
    points=[
        PointStruct(
            id=1,
            vector=[0.1, 0.2, ...],  # 384 ç»´å‘é‡
            payload={"title": "Doc 1", "category": "tech"}
        ),
        PointStruct(
            id=2,
            vector=[0.3, 0.4, ...],
            payload={"title": "Doc 2", "category": "science"}
        )
    ]
)

# å¸¦è¿‡æ»¤çš„æœç´¢
results = client.search(
    collection_name="documents",
    query_vector=[0.15, 0.25, ...],
    query_filter={
        "must": [{"key": "category", "match": {"value": "tech"}}]
    },
    limit=10
)

for point in results:
    print(f"ID: {point.id}, Score: {point.score}, Payload: {point.payload}")
```

## æ ¸å¿ƒæ¦‚å¿µ

### Pointsï¼ˆç‚¹ï¼‰â€” åŸºæœ¬æ•°æ®å•å…ƒ

```python
from qdrant_client.models import PointStruct

# Point = ID + å‘é‡ + Payload
point = PointStruct(
    id=123,                              # æ•´æ•°æˆ– UUID å­—ç¬¦ä¸²
    vector=[0.1, 0.2, 0.3, ...],        # ç¨ å¯†å‘é‡
    payload={                            # ä»»æ„ JSON å…ƒæ•°æ®
        "title": "Document title",
        "category": "tech",
        "timestamp": 1699900000,
        "tags": ["python", "ml"]
    }
)

# æ‰¹é‡ upsertï¼ˆæŽ¨èï¼‰
client.upsert(
    collection_name="documents",
    points=[point1, point2, point3],
    wait=True  # ç­‰å¾…ç´¢å¼•å®Œæˆ
)
```

### Collectionsï¼ˆé›†åˆï¼‰â€” å‘é‡å®¹å™¨

```python
from qdrant_client.models import VectorParams, Distance, HnswConfigDiff

# ä½¿ç”¨ HNSW é…ç½®åˆ›å»ºé›†åˆ
client.create_collection(
    collection_name="documents",
    vectors_config=VectorParams(
        size=384,                        # å‘é‡ç»´åº¦
        distance=Distance.COSINE         # COSINEã€EUCLIDã€DOTã€MANHATTAN
    ),
    hnsw_config=HnswConfigDiff(
        m=16,                            # æ¯ä¸ªèŠ‚ç‚¹çš„è¿žæŽ¥æ•°ï¼ˆé»˜è®¤ 16ï¼‰
        ef_construct=100,                # æž„å»ºæ—¶ç²¾åº¦ï¼ˆé»˜è®¤ 100ï¼‰
        full_scan_threshold=10000        # ä½ŽäºŽæ­¤å€¼åˆ‡æ¢ä¸ºæš´åŠ›æœç´¢
    ),
    on_disk_payload=True                 # å°† payload å­˜å‚¨åœ¨ç£ç›˜ä¸Š
)

# é›†åˆä¿¡æ¯
info = client.get_collection("documents")
print(f"Points: {info.points_count}, Vectors: {info.vectors_count}")
```

### è·ç¦»åº¦é‡

| åº¦é‡ | ä½¿ç”¨åœºæ™¯ | èŒƒå›´ |
|--------|----------|-------|
| `COSINE` | æ–‡æœ¬ embeddingã€å½’ä¸€åŒ–å‘é‡ | 0 åˆ° 2 |
| `EUCLID` | ç©ºé—´æ•°æ®ã€å›¾åƒç‰¹å¾ | 0 åˆ° âˆž |
| `DOT` | æŽ¨èç³»ç»Ÿã€éžå½’ä¸€åŒ–å‘é‡ | -âˆž åˆ° âˆž |
| `MANHATTAN` | ç¨€ç–ç‰¹å¾ã€ç¦»æ•£æ•°æ® | 0 åˆ° âˆž |

## æœç´¢æ“ä½œ

### åŸºæœ¬æœç´¢

```python
# ç®€å•æœ€è¿‘é‚»æœç´¢
results = client.search(
    collection_name="documents",
    query_vector=[0.1, 0.2, ...],
    limit=10,
    with_payload=True,
    with_vectors=False  # ä¸è¿”å›žå‘é‡ï¼ˆæ›´å¿«ï¼‰
)
```

### å¸¦è¿‡æ»¤çš„æœç´¢

```python
from qdrant_client.models import Filter, FieldCondition, MatchValue, Range

# å¤æ‚è¿‡æ»¤
results = client.search(
    collection_name="documents",
    query_vector=query_embedding,
    query_filter=Filter(
        must=[
            FieldCondition(key="category", match=MatchValue(value="tech")),
            FieldCondition(key="timestamp", range=Range(gte=1699000000))
        ],
        must_not=[
            FieldCondition(key="status", match=MatchValue(value="archived"))
        ]
    ),
    limit=10
)

# ç®€å†™è¿‡æ»¤è¯­æ³•
results = client.search(
    collection_name="documents",
    query_vector=query_embedding,
    query_filter={
        "must": [
            {"key": "category", "match": {"value": "tech"}},
            {"key": "price", "range": {"gte": 10, "lte": 100}}
        ]
    },
    limit=10
)
```

### æ‰¹é‡æœç´¢

```python
from qdrant_client.models import SearchRequest

# å•æ¬¡è¯·æ±‚ä¸­æ‰§è¡Œå¤šä¸ªæŸ¥è¯¢
results = client.search_batch(
    collection_name="documents",
    requests=[
        SearchRequest(vector=[0.1, ...], limit=5),
        SearchRequest(vector=[0.2, ...], limit=5, filter={"must": [...]}),
        SearchRequest(vector=[0.3, ...], limit=10)
    ]
)
```

## RAG é›†æˆ

### ä¸Ž sentence-transformers é›†æˆ

```python
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct

# åˆå§‹åŒ–
encoder = SentenceTransformer("all-MiniLM-L6-v2")
client = QdrantClient(host="localhost", port=6333)

# åˆ›å»ºé›†åˆ
client.create_collection(
    collection_name="knowledge_base",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE)
)

# ç´¢å¼•æ–‡æ¡£
documents = [
    {"id": 1, "text": "Python is a programming language", "source": "wiki"},
    {"id": 2, "text": "Machine learning uses algorithms", "source": "textbook"},
]

points = [
    PointStruct(
        id=doc["id"],
        vector=encoder.encode(doc["text"]).tolist(),
        payload={"text": doc["text"], "source": doc["source"]}
    )
    for doc in documents
]
client.upsert(collection_name="knowledge_base", points=points)

# RAG æ£€ç´¢
def retrieve(query: str, top_k: int = 5) -> list[dict]:
    query_vector = encoder.encode(query).tolist()
    results = client.search(
        collection_name="knowledge_base",
        query_vector=query_vector,
        limit=top_k
    )
    return [{"text": r.payload["text"], "score": r.score} for r in results]

# åœ¨ RAG æµæ°´çº¿ä¸­ä½¿ç”¨
context = retrieve("What is Python?")
prompt = f"Context: {context}\n\nQuestion: What is Python?"
```

### ä¸Ž LangChain é›†æˆ

```python
from langchain_community.vectorstores import Qdrant
from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Qdrant.from_documents(documents, embeddings, url="http://localhost:6333", collection_name="docs")
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
```

### ä¸Ž LlamaIndex é›†æˆ

```python
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core import VectorStoreIndex, StorageContext

vector_store = QdrantVectorStore(client=client, collection_name="llama_docs")
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
```

## å¤šå‘é‡æ”¯æŒ

### å‘½åå‘é‡ï¼ˆä¸åŒ embedding æ¨¡åž‹ï¼‰

```python
from qdrant_client.models import VectorParams, Distance

# åŒ…å«å¤šç§å‘é‡ç±»åž‹çš„é›†åˆ
client.create_collection(
    collection_name="hybrid_search",
    vectors_config={
        "dense": VectorParams(size=384, distance=Distance.COSINE),
        "sparse": VectorParams(size=30000, distance=Distance.DOT)
    }
)

# æ’å…¥å‘½åå‘é‡
client.upsert(
    collection_name="hybrid_search",
    points=[
        PointStruct(
            id=1,
            vector={
                "dense": dense_embedding,
                "sparse": sparse_embedding
            },
            payload={"text": "document text"}
        )
    ]
)

# æœç´¢æŒ‡å®šå‘é‡
results = client.search(
    collection_name="hybrid_search",
    query_vector=("dense", query_dense),  # æŒ‡å®šä½¿ç”¨å“ªä¸ªå‘é‡
    limit=10
)
```

### ç¨€ç–å‘é‡ï¼ˆBM25ã€SPLADEï¼‰

```python
from qdrant_client.models import SparseVectorParams, SparseIndexParams, SparseVector

# åŒ…å«ç¨€ç–å‘é‡çš„é›†åˆ
client.create_collection(
    collection_name="sparse_search",
    vectors_config={},
    sparse_vectors_config={"text": SparseVectorParams(index=SparseIndexParams(on_disk=False))}
)

# æ’å…¥ç¨€ç–å‘é‡
client.upsert(
    collection_name="sparse_search",
    points=[PointStruct(id=1, vector={"text": SparseVector(indices=[1, 5, 100], values=[0.5, 0.8, 0.2])}, payload={"text": "document"})]
)
```

## é‡åŒ–ï¼ˆå†…å­˜ä¼˜åŒ–ï¼‰

```python
from qdrant_client.models import ScalarQuantization, ScalarQuantizationConfig, ScalarType

# æ ‡é‡é‡åŒ–ï¼ˆå†…å­˜å‡å°‘ 4 å€ï¼‰
client.create_collection(
    collection_name="quantized",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE),
    quantization_config=ScalarQuantization(
        scalar=ScalarQuantizationConfig(
            type=ScalarType.INT8,
            quantile=0.99,        # è£å‰ªå¼‚å¸¸å€¼
            always_ram=True      # å°†é‡åŒ–æ•°æ®ä¿ç•™åœ¨ RAM ä¸­
        )
    )
)

# å¸¦é‡æ–°è¯„åˆ†çš„æœç´¢
results = client.search(
    collection_name="quantized",
    query_vector=query,
    search_params={"quantization": {"rescore": True}},  # å¯¹ top ç»“æžœé‡æ–°è¯„åˆ†
    limit=10
)
```

## Payload ç´¢å¼•

```python
from qdrant_client.models import PayloadSchemaType

# åˆ›å»º payload ç´¢å¼•ä»¥åŠ é€Ÿè¿‡æ»¤
client.create_payload_index(
    collection_name="documents",
    field_name="category",
    field_schema=PayloadSchemaType.KEYWORD
)

client.create_payload_index(
    collection_name="documents",
    field_name="timestamp",
    field_schema=PayloadSchemaType.INTEGER
)

# ç´¢å¼•ç±»åž‹ï¼šKEYWORDã€INTEGERã€FLOATã€GEOã€TEXTï¼ˆå…¨æ–‡ï¼‰ã€BOOL
```

## ç”Ÿäº§éƒ¨ç½²

### Qdrant Cloud

```python
from qdrant_client import QdrantClient

# è¿žæŽ¥åˆ° Qdrant Cloud
client = QdrantClient(
    url="https://your-cluster.cloud.qdrant.io",
    api_key="your-api-key"
)
```

### æ€§èƒ½è°ƒä¼˜

```python
# ä¼˜åŒ–æœç´¢é€Ÿåº¦ï¼ˆæ›´é«˜å¬å›žçŽ‡ï¼‰
client.update_collection(
    collection_name="documents",
    hnsw_config=HnswConfigDiff(ef_construct=200, m=32)
)

# ä¼˜åŒ–ç´¢å¼•é€Ÿåº¦ï¼ˆæ‰¹é‡åŠ è½½ï¼‰
client.update_collection(
    collection_name="documents",
    optimizer_config={"indexing_threshold": 20000}
)
```

## æœ€ä½³å®žè·µ

1. **æ‰¹é‡æ“ä½œ** â€” ä½¿ç”¨æ‰¹é‡ upsert/search æå‡æ•ˆçŽ‡
2. **Payload ç´¢å¼•** â€” å¯¹è¿‡æ»¤ä¸­ä½¿ç”¨çš„å­—æ®µå»ºç«‹ç´¢å¼•
3. **é‡åŒ–** â€” å¯¹å¤§åž‹é›†åˆï¼ˆ>100 ä¸‡å‘é‡ï¼‰å¯ç”¨é‡åŒ–
4. **åˆ†ç‰‡** â€” å¯¹è¶…è¿‡ 1000 ä¸‡å‘é‡çš„é›†åˆä½¿ç”¨åˆ†ç‰‡
5. **ç£ç›˜å­˜å‚¨** â€” å¯¹å¤§åž‹ payload å¯ç”¨ `on_disk_payload`
6. **è¿žæŽ¥æ± ** â€” å¤ç”¨å®¢æˆ·ç«¯å®žä¾‹

## å¸¸è§é—®é¢˜

**å¸¦è¿‡æ»¤çš„æœç´¢é€Ÿåº¦æ…¢ï¼š**
```python
# ä¸ºè¿‡æ»¤å­—æ®µåˆ›å»º payload ç´¢å¼•
client.create_payload_index(
    collection_name="docs",
    field_name="category",
    field_schema=PayloadSchemaType.KEYWORD
)
```

**å†…å­˜ä¸è¶³ï¼š**
```python
# å¯ç”¨é‡åŒ–å’Œç£ç›˜å­˜å‚¨
client.create_collection(
    collection_name="large_collection",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE),
    quantization_config=ScalarQuantization(...),
    on_disk_payload=True
)
```

**è¿žæŽ¥é—®é¢˜ï¼š**
```python
# ä½¿ç”¨è¶…æ—¶å’Œé‡è¯•
client = QdrantClient(
    host="localhost",
    port=6333,
    timeout=30,
    prefer_grpc=True  # gRPC æ€§èƒ½æ›´ä½³
)
```

## å‚è€ƒèµ„æ–™

- **[é«˜çº§ç”¨æ³•](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/qdrant/references/advanced-usage.md)** â€” åˆ†å¸ƒå¼æ¨¡å¼ã€æ··åˆæœç´¢ã€æŽ¨èç³»ç»Ÿ
- **[æ•…éšœæŽ’æŸ¥](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/qdrant/references/troubleshooting.md)** â€” å¸¸è§é—®é¢˜ã€è°ƒè¯•ã€æ€§èƒ½è°ƒä¼˜

## èµ„æº

- **GitHub**ï¼šhttps://github.com/qdrant/qdrantï¼ˆ22k+ starsï¼‰
- **æ–‡æ¡£**ï¼šhttps://qdrant.tech/documentation/
- **Python å®¢æˆ·ç«¯**ï¼šhttps://github.com/qdrant/qdrant-client
- **Cloud**ï¼šhttps://cloud.qdrant.io
- **ç‰ˆæœ¬**ï¼š1.12.0+
- **è®¸å¯è¯**ï¼šApache 2.0
