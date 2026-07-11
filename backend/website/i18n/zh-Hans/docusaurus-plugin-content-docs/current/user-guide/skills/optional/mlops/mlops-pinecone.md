---
title: "Pinecone â€” é¢å‘ç”Ÿäº§çº§ AI åº”ç”¨çš„æ‰˜ç®¡å‘é‡æ•°æ®åº“"
sidebar_label: "Pinecone"
description: "é¢å‘ç”Ÿäº§çº§ AI åº”ç”¨çš„æ‰˜ç®¡å‘é‡æ•°æ®åº“"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Pinecone

é¢å‘ç”Ÿäº§çº§ AI åº”ç”¨çš„æ‰˜ç®¡å‘é‡æ•°æ®åº“ã€‚å…¨æ‰˜ç®¡ã€è‡ªåŠ¨æ‰©ç¼©å®¹ï¼Œæ”¯æŒæ··åˆæœç´¢ï¼ˆç¨ å¯† + ç¨€ç–å‘é‡ï¼‰ã€å…ƒæ•°æ®è¿‡æ»¤å’Œå‘½åç©ºé—´ã€‚ä½Žå»¶è¿Ÿï¼ˆ&lt;100ms p95ï¼‰ã€‚é€‚ç”¨äºŽç”Ÿäº§çº§ RAGã€æŽ¨èç³»ç»Ÿæˆ–å¤§è§„æ¨¡è¯­ä¹‰æœç´¢ã€‚æœ€é€‚åˆ serverlessï¼ˆæ— æœåŠ¡å™¨ï¼‰æ‰˜ç®¡åŸºç¡€è®¾æ–½ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/pinecone` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/pinecone` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `pinecone-client` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `RAG`, `Pinecone`, `Vector Database`, `Managed Service`, `Serverless`, `Hybrid Search`, `Production`, `Auto-Scaling`, `Low Latency`, `Recommendations` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Pinecone - æ‰˜ç®¡å‘é‡æ•°æ®åº“

é¢å‘ç”Ÿäº§çº§ AI åº”ç”¨çš„å‘é‡æ•°æ®åº“ã€‚

## ä½•æ—¶ä½¿ç”¨ Pinecone

**é€‚ç”¨åœºæ™¯ï¼š**
- éœ€è¦æ‰˜ç®¡çš„ serverless å‘é‡æ•°æ®åº“
- ç”Ÿäº§çº§ RAG åº”ç”¨
- éœ€è¦è‡ªåŠ¨æ‰©ç¼©å®¹
- å¯¹ä½Žå»¶è¿Ÿæœ‰ä¸¥æ ¼è¦æ±‚ï¼ˆ&lt;100msï¼‰
- ä¸æƒ³è‡ªè¡Œç®¡ç†åŸºç¡€è®¾æ–½
- éœ€è¦æ··åˆæœç´¢ï¼ˆç¨ å¯† + ç¨€ç–å‘é‡ï¼‰

**æŒ‡æ ‡**ï¼š
- å…¨æ‰˜ç®¡ SaaS
- è‡ªåŠ¨æ‰©ç¼©å®¹è‡³æ•°åäº¿å‘é‡
- **p95 å»¶è¿Ÿ &lt;100ms**
- 99.9% æ­£å¸¸è¿è¡Œæ—¶é—´ SLA

**æ”¹ç”¨å…¶ä»–æ–¹æ¡ˆçš„åœºæ™¯**ï¼š
- **Chroma**ï¼šè‡ªæ‰˜ç®¡ã€å¼€æº
- **FAISS**ï¼šç¦»çº¿ã€çº¯ç›¸ä¼¼åº¦æœç´¢
- **Weaviate**ï¼šè‡ªæ‰˜ç®¡ã€åŠŸèƒ½æ›´ä¸°å¯Œ

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
pip install pinecone-client
```

### åŸºæœ¬ç”¨æ³•

```python
from pinecone import Pinecone, ServerlessSpec

# Initialize
pc = Pinecone(api_key="your-api-key")

# Create index
pc.create_index(
    name="my-index",
    dimension=1536,  # Must match embedding dimension
    metric="cosine",  # or "euclidean", "dotproduct"
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)

# Connect to index
index = pc.Index("my-index")

# Upsert vectors
index.upsert(vectors=[
    {"id": "vec1", "values": [0.1, 0.2, ...], "metadata": {"category": "A"}},
    {"id": "vec2", "values": [0.3, 0.4, ...], "metadata": {"category": "B"}}
])

# Query
results = index.query(
    vector=[0.1, 0.2, ...],
    top_k=5,
    include_metadata=True
)

print(results["matches"])
```

## æ ¸å¿ƒæ“ä½œ

### åˆ›å»ºç´¢å¼•

```python
# Serverless (recommended)
pc.create_index(
    name="my-index",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",         # or "gcp", "azure"
        region="us-east-1"
    )
)

# Pod-based (for consistent performance)
from pinecone import PodSpec

pc.create_index(
    name="my-index",
    dimension=1536,
    metric="cosine",
    spec=PodSpec(
        environment="us-east1-gcp",
        pod_type="p1.x1"
    )
)
```

### æ’å…¥å‘é‡ï¼ˆUpsertï¼‰

```python
# Single upsert
index.upsert(vectors=[
    {
        "id": "doc1",
        "values": [0.1, 0.2, ...],  # 1536 dimensions
        "metadata": {
            "text": "Document content",
            "category": "tutorial",
            "timestamp": "2025-01-01"
        }
    }
])

# Batch upsert (recommended)
vectors = [
    {"id": f"vec{i}", "values": embedding, "metadata": metadata}
    for i, (embedding, metadata) in enumerate(zip(embeddings, metadatas))
]

index.upsert(vectors=vectors, batch_size=100)
```

### æŸ¥è¯¢å‘é‡

```python
# Basic query
results = index.query(
    vector=[0.1, 0.2, ...],
    top_k=10,
    include_metadata=True,
    include_values=False
)

# With metadata filtering
results = index.query(
    vector=[0.1, 0.2, ...],
    top_k=5,
    filter={"category": {"$eq": "tutorial"}}
)

# Namespace query
results = index.query(
    vector=[0.1, 0.2, ...],
    top_k=5,
    namespace="production"
)

# Access results
for match in results["matches"]:
    print(f"ID: {match['id']}")
    print(f"Score: {match['score']}")
    print(f"Metadata: {match['metadata']}")
```

### å…ƒæ•°æ®è¿‡æ»¤

```python
# Exact match
filter = {"category": "tutorial"}

# Comparison
filter = {"price": {"$gte": 100}}  # $gt, $gte, $lt, $lte, $ne

# Logical operators
filter = {
    "$and": [
        {"category": "tutorial"},
        {"difficulty": {"$lte": 3}}
    ]
}  # Also: $or

# In operator
filter = {"tags": {"$in": ["python", "ml"]}}
```

## å‘½åç©ºé—´

```python
# Partition data by namespace
index.upsert(
    vectors=[{"id": "vec1", "values": [...]}],
    namespace="user-123"
)

# Query specific namespace
results = index.query(
    vector=[...],
    namespace="user-123",
    top_k=5
)

# List namespaces
stats = index.describe_index_stats()
print(stats['namespaces'])
```

## æ··åˆæœç´¢ï¼ˆç¨ å¯† + ç¨€ç–å‘é‡ï¼‰

```python
# Upsert with sparse vectors
index.upsert(vectors=[
    {
        "id": "doc1",
        "values": [0.1, 0.2, ...],  # Dense vector
        "sparse_values": {
            "indices": [10, 45, 123],  # Token IDs
            "values": [0.5, 0.3, 0.8]   # TF-IDF scores
        },
        "metadata": {"text": "..."}
    }
])

# Hybrid query
results = index.query(
    vector=[0.1, 0.2, ...],
    sparse_vector={
        "indices": [10, 45],
        "values": [0.5, 0.3]
    },
    top_k=5,
    alpha=0.5  # 0=sparse, 1=dense, 0.5=hybrid
)
```

## LangChain é›†æˆ

```python
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings

# Create vector store
vectorstore = PineconeVectorStore.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    index_name="my-index"
)

# Query
results = vectorstore.similarity_search("query", k=5)

# With metadata filter
results = vectorstore.similarity_search(
    "query",
    k=5,
    filter={"category": "tutorial"}
)

# As retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 10})
```

## LlamaIndex é›†æˆ

```python
from llama_index.vector_stores.pinecone import PineconeVectorStore

# Connect to Pinecone
pc = Pinecone(api_key="your-key")
pinecone_index = pc.Index("my-index")

# Create vector store
vector_store = PineconeVectorStore(pinecone_index=pinecone_index)

# Use in LlamaIndex
from llama_index.core import StorageContext, VectorStoreIndex

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
```

## ç´¢å¼•ç®¡ç†

```python
# List indices
indexes = pc.list_indexes()

# Describe index
index_info = pc.describe_index("my-index")
print(index_info)

# Get index stats
stats = index.describe_index_stats()
print(f"Total vectors: {stats['total_vector_count']}")
print(f"Namespaces: {stats['namespaces']}")

# Delete index
pc.delete_index("my-index")
```

## åˆ é™¤å‘é‡

```python
# Delete by ID
index.delete(ids=["vec1", "vec2"])

# Delete by filter
index.delete(filter={"category": "old"})

# Delete all in namespace
index.delete(delete_all=True, namespace="test")

# Delete entire index
index.delete(delete_all=True)
```

## æœ€ä½³å®žè·µ

1. **ä½¿ç”¨ serverless** â€” è‡ªåŠ¨æ‰©ç¼©å®¹ï¼Œæˆæœ¬æ•ˆç›Šé«˜
2. **æ‰¹é‡ upsert** â€” æ•ˆçŽ‡æ›´é«˜ï¼ˆæ¯æ‰¹ 100-200 æ¡ï¼‰
3. **æ·»åŠ å…ƒæ•°æ®** â€” å¯ç”¨è¿‡æ»¤åŠŸèƒ½
4. **ä½¿ç”¨å‘½åç©ºé—´** â€” æŒ‰ç”¨æˆ·/ç§Ÿæˆ·éš”ç¦»æ•°æ®
5. **ç›‘æŽ§ç”¨é‡** â€” æŸ¥çœ‹ Pinecone æŽ§åˆ¶å°
6. **ä¼˜åŒ–è¿‡æ»¤å™¨** â€” å¯¹é¢‘ç¹è¿‡æ»¤çš„å­—æ®µå»ºç«‹ç´¢å¼•
7. **ç”¨å…è´¹å¥—é¤æµ‹è¯•** â€” 1 ä¸ªç´¢å¼•ï¼Œ10 ä¸‡å‘é‡å…è´¹
8. **ä½¿ç”¨æ··åˆæœç´¢** â€” è´¨é‡æ›´ä¼˜
9. **è®¾ç½®åˆé€‚çš„ç»´åº¦** â€” ä¸Ž embedding æ¨¡åž‹åŒ¹é…
10. **å®šæœŸå¤‡ä»½** â€” å¯¼å‡ºé‡è¦æ•°æ®

## æ€§èƒ½

| æ“ä½œ | å»¶è¿Ÿ | å¤‡æ³¨ |
|-----------|---------|-------|
| Upsert | ~50-100ms | æ¯æ‰¹æ¬¡ |
| æŸ¥è¯¢ï¼ˆp50ï¼‰ | ~50ms | å–å†³äºŽç´¢å¼•å¤§å° |
| æŸ¥è¯¢ï¼ˆp95ï¼‰ | ~100ms | SLA ç›®æ ‡ |
| å…ƒæ•°æ®è¿‡æ»¤ | ~+10-20ms | é¢å¤–å¼€é”€ |

## å®šä»·ï¼ˆæˆªè‡³ 2025 å¹´ï¼‰

**Serverless**ï¼š
- æ¯ç™¾ä¸‡è¯»å–å•å…ƒ $0.096
- æ¯ç™¾ä¸‡å†™å…¥å•å…ƒ $0.06
- æ¯ GB å­˜å‚¨/æœˆ $0.06

**å…è´¹å¥—é¤**ï¼š
- 1 ä¸ª serverless ç´¢å¼•
- 10 ä¸‡å‘é‡ï¼ˆ1536 ç»´ï¼‰
- éžå¸¸é€‚åˆåŽŸåž‹å¼€å‘

## èµ„æº

- **å®˜ç½‘**ï¼šhttps://www.pinecone.io
- **æ–‡æ¡£**ï¼šhttps://docs.pinecone.io
- **æŽ§åˆ¶å°**ï¼šhttps://app.pinecone.io
- **å®šä»·**ï¼šhttps://www.pinecone.io/pricing
