---
title: "Chroma â€” é¢å‘ AI åº”ç”¨çš„å¼€æº embedding æ•°æ®åº“"
sidebar_label: "Chroma"
description: "é¢å‘ AI åº”ç”¨çš„å¼€æº embedding æ•°æ®åº“"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Chroma

é¢å‘ AI åº”ç”¨çš„å¼€æº embeddingï¼ˆå‘é‡åµŒå…¥ï¼‰æ•°æ®åº“ã€‚å­˜å‚¨ embedding ä¸Žå…ƒæ•°æ®ï¼Œæ‰§è¡Œå‘é‡æœç´¢å’Œå…¨æ–‡æœç´¢ï¼ŒæŒ‰å…ƒæ•°æ®è¿‡æ»¤ã€‚ç®€æ´çš„ 4 å‡½æ•° APIï¼Œä»Ž notebook åˆ°ç”Ÿäº§é›†ç¾¤å‡å¯æ‰©å±•ã€‚é€‚ç”¨äºŽè¯­ä¹‰æœç´¢ã€RAG åº”ç”¨æˆ–æ–‡æ¡£æ£€ç´¢ã€‚æœ€é€‚åˆæœ¬åœ°å¼€å‘å’Œå¼€æºé¡¹ç›®ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/chroma` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/chroma` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `chromadb`, `sentence-transformers` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `RAG`, `Chroma`, `Vector Database`, `Embeddings`, `Semantic Search`, `Open Source`, `Self-Hosted`, `Document Retrieval`, `Metadata Filtering` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Chroma - å¼€æº Embedding æ•°æ®åº“

ä¸“ä¸ºæž„å»ºå…·å¤‡è®°å¿†èƒ½åŠ›çš„ LLM åº”ç”¨è€Œè®¾è®¡çš„ AI åŽŸç”Ÿæ•°æ®åº“ã€‚

## ä½•æ—¶ä½¿ç”¨ Chroma

**é€‚ç”¨åœºæ™¯ï¼š**
- æž„å»º RAGï¼ˆæ£€ç´¢å¢žå¼ºç”Ÿæˆï¼‰åº”ç”¨
- éœ€è¦æœ¬åœ°/è‡ªæ‰˜ç®¡å‘é‡æ•°æ®åº“
- å¸Œæœ›ä½¿ç”¨å¼€æºæ–¹æ¡ˆï¼ˆApache 2.0ï¼‰
- åœ¨ notebook ä¸­å¿«é€ŸåŽŸåž‹éªŒè¯
- å¯¹æ–‡æ¡£è¿›è¡Œè¯­ä¹‰æœç´¢
- å­˜å‚¨å¸¦å…ƒæ•°æ®çš„ embedding

**æŒ‡æ ‡**ï¼š
- **24,300+ GitHub stars**
- **1,900+ forks**
- **v1.3.3**ï¼ˆç¨³å®šç‰ˆï¼Œæ¯å‘¨å‘å¸ƒï¼‰
- **Apache 2.0 è®¸å¯è¯**

**ä»¥ä¸‹åœºæ™¯è¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆ**ï¼š
- **Pinecone**ï¼šæ‰˜ç®¡äº‘æœåŠ¡ï¼Œè‡ªåŠ¨æ‰©ç¼©å®¹
- **FAISS**ï¼šçº¯ç›¸ä¼¼åº¦æœç´¢ï¼Œä¸æ”¯æŒå…ƒæ•°æ®
- **Weaviate**ï¼šé¢å‘ç”Ÿäº§çš„ ML åŽŸç”Ÿæ•°æ®åº“
- **Qdrant**ï¼šé«˜æ€§èƒ½ï¼ŒåŸºäºŽ Rust

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# Python
pip install chromadb

# JavaScript/TypeScript
npm install chromadb @chroma-core/default-embed
```

### åŸºæœ¬ç”¨æ³•ï¼ˆPythonï¼‰

```python
import chromadb

# Create client
client = chromadb.Client()

# Create collection
collection = client.create_collection(name="my_collection")

# Add documents
collection.add(
    documents=["This is document 1", "This is document 2"],
    metadatas=[{"source": "doc1"}, {"source": "doc2"}],
    ids=["id1", "id2"]
)

# Query
results = collection.query(
    query_texts=["document about topic"],
    n_results=2
)

print(results)
```

## æ ¸å¿ƒæ“ä½œ

### 1. åˆ›å»ºé›†åˆ

```python
# Simple collection
collection = client.create_collection("my_docs")

# With custom embedding function
from chromadb.utils import embedding_functions

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your-key",
    model_name="text-embedding-3-small"
)

collection = client.create_collection(
    name="my_docs",
    embedding_function=openai_ef
)

# Get existing collection
collection = client.get_collection("my_docs")

# Delete collection
client.delete_collection("my_docs")
```

### 2. æ·»åŠ æ–‡æ¡£

```python
# Add with auto-generated IDs
collection.add(
    documents=["Doc 1", "Doc 2", "Doc 3"],
    metadatas=[
        {"source": "web", "category": "tutorial"},
        {"source": "pdf", "page": 5},
        {"source": "api", "timestamp": "2025-01-01"}
    ],
    ids=["id1", "id2", "id3"]
)

# Add with custom embeddings
collection.add(
    embeddings=[[0.1, 0.2, ...], [0.3, 0.4, ...]],
    documents=["Doc 1", "Doc 2"],
    ids=["id1", "id2"]
)
```

### 3. æŸ¥è¯¢ï¼ˆç›¸ä¼¼åº¦æœç´¢ï¼‰

```python
# Basic query
results = collection.query(
    query_texts=["machine learning tutorial"],
    n_results=5
)

# Query with filters
results = collection.query(
    query_texts=["Python programming"],
    n_results=3,
    where={"source": "web"}
)

# Query with metadata filters
results = collection.query(
    query_texts=["advanced topics"],
    where={
        "$and": [
            {"category": "tutorial"},
            {"difficulty": {"$gte": 3}}
        ]
    }
)

# Access results
print(results["documents"])      # List of matching documents
print(results["metadatas"])      # Metadata for each doc
print(results["distances"])      # Similarity scores
print(results["ids"])            # Document IDs
```

### 4. èŽ·å–æ–‡æ¡£

```python
# Get by IDs
docs = collection.get(
    ids=["id1", "id2"]
)

# Get with filters
docs = collection.get(
    where={"category": "tutorial"},
    limit=10
)

# Get all documents
docs = collection.get()
```

### 5. æ›´æ–°æ–‡æ¡£

```python
# Update document content
collection.update(
    ids=["id1"],
    documents=["Updated content"],
    metadatas=[{"source": "updated"}]
)
```

### 6. åˆ é™¤æ–‡æ¡£

```python
# Delete by IDs
collection.delete(ids=["id1", "id2"])

# Delete with filter
collection.delete(
    where={"source": "outdated"}
)
```

## æŒä¹…åŒ–å­˜å‚¨

```python
# Persist to disk
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.create_collection("my_docs")
collection.add(documents=["Doc 1"], ids=["id1"])

# Data persisted automatically
# Reload later with same path
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("my_docs")
```

## Embedding å‡½æ•°

### é»˜è®¤ï¼ˆSentence Transformersï¼‰

```python
# Uses sentence-transformers by default
collection = client.create_collection("my_docs")
# Default model: all-MiniLM-L6-v2
```

### OpenAI

```python
from chromadb.utils import embedding_functions

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your-key",
    model_name="text-embedding-3-small"
)

collection = client.create_collection(
    name="openai_docs",
    embedding_function=openai_ef
)
```

### HuggingFace

```python
huggingface_ef = embedding_functions.HuggingFaceEmbeddingFunction(
    api_key="your-key",
    model_name="sentence-transformers/all-mpnet-base-v2"
)

collection = client.create_collection(
    name="hf_docs",
    embedding_function=huggingface_ef
)
```

### è‡ªå®šä¹‰ embedding å‡½æ•°

```python
from chromadb import Documents, EmbeddingFunction, Embeddings

class MyEmbeddingFunction(EmbeddingFunction):
    def __call__(self, input: Documents) -> Embeddings:
        # Your embedding logic
        return embeddings

my_ef = MyEmbeddingFunction()
collection = client.create_collection(
    name="custom_docs",
    embedding_function=my_ef
)
```

## å…ƒæ•°æ®è¿‡æ»¤

```python
# Exact match
results = collection.query(
    query_texts=["query"],
    where={"category": "tutorial"}
)

# Comparison operators
results = collection.query(
    query_texts=["query"],
    where={"page": {"$gt": 10}}  # $gt, $gte, $lt, $lte, $ne
)

# Logical operators
results = collection.query(
    query_texts=["query"],
    where={
        "$and": [
            {"category": "tutorial"},
            {"difficulty": {"$lte": 3}}
        ]
    }  # Also: $or
)

# Contains
results = collection.query(
    query_texts=["query"],
    where={"tags": {"$in": ["python", "ml"]}}
)
```

## LangChain é›†æˆ

```python
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Split documents
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
docs = text_splitter.split_documents(documents)

# Create Chroma vector store
vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    persist_directory="./chroma_db"
)

# Query
results = vectorstore.similarity_search("machine learning", k=3)

# As retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
```

## LlamaIndex é›†æˆ

```python
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import VectorStoreIndex, StorageContext
import chromadb

# Initialize Chroma
db = chromadb.PersistentClient(path="./chroma_db")
collection = db.get_or_create_collection("my_collection")

# Create vector store
vector_store = ChromaVectorStore(chroma_collection=collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# Create index
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context
)

# Query
query_engine = index.as_query_engine()
response = query_engine.query("What is machine learning?")
```

## æœåŠ¡å™¨æ¨¡å¼

```python
# Run Chroma server
# Terminal: chroma run --path ./chroma_db --port 8000

# Connect to server
import chromadb
from chromadb.config import Settings

client = chromadb.HttpClient(
    host="localhost",
    port=8000,
    settings=Settings(anonymized_telemetry=False)
)

# Use as normal
collection = client.get_or_create_collection("my_docs")
```

## æœ€ä½³å®žè·µ

1. **ä½¿ç”¨æŒä¹…åŒ–å®¢æˆ·ç«¯** â€” é¿å…é‡å¯åŽæ•°æ®ä¸¢å¤±
2. **æ·»åŠ å…ƒæ•°æ®** â€” æ”¯æŒè¿‡æ»¤ä¸Žè¿½è¸ª
3. **æ‰¹é‡æ“ä½œ** â€” ä¸€æ¬¡æ€§æ·»åŠ å¤šä¸ªæ–‡æ¡£
4. **é€‰æ‹©åˆé€‚çš„ embedding æ¨¡åž‹** â€” å¹³è¡¡é€Ÿåº¦ä¸Žè´¨é‡
5. **ä½¿ç”¨è¿‡æ»¤å™¨** â€” ç¼©å°æœç´¢èŒƒå›´
6. **å”¯ä¸€ ID** â€” é¿å…å†²çª
7. **å®šæœŸå¤‡ä»½** â€” å¤åˆ¶ `chroma_db` ç›®å½•
8. **ç›‘æŽ§é›†åˆå¤§å°** â€” æŒ‰éœ€æ‰©å®¹
9. **æµ‹è¯• embedding å‡½æ•°** â€” ç¡®ä¿è´¨é‡
10. **ç”Ÿäº§çŽ¯å¢ƒä½¿ç”¨æœåŠ¡å™¨æ¨¡å¼** â€” æ›´é€‚åˆå¤šç”¨æˆ·åœºæ™¯

## æ€§èƒ½

| æ“ä½œ | å»¶è¿Ÿ | å¤‡æ³¨ |
|-----------|---------|-------|
| æ·»åŠ  100 ä¸ªæ–‡æ¡£ | ~1-3s | å« embedding ç”Ÿæˆ |
| æŸ¥è¯¢ï¼ˆtop 10ï¼‰ | ~50-200ms | å–å†³äºŽé›†åˆå¤§å° |
| å…ƒæ•°æ®è¿‡æ»¤ | ~10-50ms | æ­£ç¡®ç´¢å¼•ä¸‹é€Ÿåº¦è¾ƒå¿« |

## èµ„æº

- **GitHub**: https://github.com/chroma-core/chroma â­ 24,300+
- **æ–‡æ¡£**: https://docs.trychroma.com
- **Discord**: https://discord.gg/MMeYNTmh3x
- **ç‰ˆæœ¬**: 1.3.3+
- **è®¸å¯è¯**: Apache 2.0