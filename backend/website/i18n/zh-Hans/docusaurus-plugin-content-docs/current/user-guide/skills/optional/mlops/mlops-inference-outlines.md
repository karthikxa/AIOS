---
title: "Outlines â€” Outlinesï¼šç»“æž„åŒ– JSON/regex/Pydantic LLM ç”Ÿæˆ"
sidebar_label: "Outlines"
description: "Outlinesï¼šç»“æž„åŒ– JSON/regex/Pydantic LLM ç”Ÿæˆ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Outlines

Outlinesï¼šç»“æž„åŒ– JSON/regex/Pydantic LLM ç”Ÿæˆã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” ä½¿ç”¨ `zed skills install official/mlops/outlines` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/inference/outlines` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `outlines`, `transformers`, `vllm`, `pydantic` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Prompt Engineering`, `Outlines`, `Structured Generation`, `JSON Schema`, `Pydantic`, `Local Models`, `Grammar-Based Generation`, `vLLM`, `Transformers`, `Type Safety` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Outlinesï¼šç»“æž„åŒ–æ–‡æœ¬ç”Ÿæˆ

## ä½•æ—¶ä½¿ç”¨æ­¤ Skill

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ Outlinesï¼š
- **ä¿è¯æœ‰æ•ˆçš„ JSON/XML/ä»£ç **ç»“æž„åŒ–ç”Ÿæˆ
- **ä½¿ç”¨ Pydantic æ¨¡åž‹**èŽ·å¾—ç±»åž‹å®‰å…¨çš„è¾“å‡º
- **æ”¯æŒæœ¬åœ°æ¨¡åž‹**ï¼ˆTransformersã€llama.cppã€vLLMï¼‰
- **é€šè¿‡é›¶å¼€é”€ç»“æž„åŒ–ç”Ÿæˆæœ€å¤§åŒ–æŽ¨ç†é€Ÿåº¦**
- **è‡ªåŠ¨æ ¹æ® JSON schema ç”Ÿæˆ**
- **åœ¨ grammarï¼ˆè¯­æ³•ï¼‰å±‚é¢æŽ§åˆ¶ token é‡‡æ ·**

**GitHub Stars**ï¼š8,000+ | **æ¥è‡ª**ï¼šdottxt.aiï¼ˆå‰èº«ä¸º .txtï¼‰

## å®‰è£…

```bash
# åŸºç¡€å®‰è£…
pip install outlines

# å®‰è£…ç‰¹å®šåŽç«¯
pip install outlines transformers  # Hugging Face æ¨¡åž‹
pip install outlines llama-cpp-python  # llama.cpp
pip install outlines vllm  # vLLM ç”¨äºŽé«˜åžåé‡
```

## å¿«é€Ÿå¼€å§‹

### åŸºç¡€ç¤ºä¾‹ï¼šåˆ†ç±»

```python
import outlines
from typing import Literal

# åŠ è½½æ¨¡åž‹
model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")

# å¸¦ç±»åž‹çº¦æŸçš„ç”Ÿæˆ
prompt = "Sentiment of 'This product is amazing!': "
generator = outlines.generate.choice(model, ["positive", "negative", "neutral"])
sentiment = generator(prompt)

print(sentiment)  # "positive"ï¼ˆä¿è¯ä¸ºå…¶ä¸­ä¹‹ä¸€ï¼‰
```

### ä½¿ç”¨ Pydantic æ¨¡åž‹

```python
from pydantic import BaseModel
import outlines

class User(BaseModel):
    name: str
    age: int
    email: str

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")

# ç”Ÿæˆç»“æž„åŒ–è¾“å‡º
prompt = "Extract user: John Doe, 30 years old, john@example.com"
generator = outlines.generate.json(model, User)
user = generator(prompt)

print(user.name)   # "John Doe"
print(user.age)    # 30
print(user.email)  # "john@example.com"
```

## æ ¸å¿ƒæ¦‚å¿µ

### 1. å—çº¦æŸçš„ Token é‡‡æ ·

Outlines ä½¿ç”¨æœ‰é™çŠ¶æ€æœºï¼ˆFSMï¼‰åœ¨ logit å±‚é¢çº¦æŸ token ç”Ÿæˆã€‚

**å·¥ä½œåŽŸç†ï¼š**
1. å°† schemaï¼ˆJSON/Pydantic/regexï¼‰è½¬æ¢ä¸ºä¸Šä¸‹æ–‡æ— å…³æ–‡æ³•ï¼ˆCFGï¼‰
2. å°† CFG è½¬æ¢ä¸ºæœ‰é™çŠ¶æ€æœºï¼ˆFSMï¼‰
3. åœ¨ç”Ÿæˆçš„æ¯ä¸€æ­¥è¿‡æ»¤æ— æ•ˆ token
4. å½“åªæœ‰ä¸€ä¸ªæœ‰æ•ˆ token æ—¶å¿«é€Ÿå‰è¿›

**ä¼˜åŠ¿ï¼š**
- **é›¶å¼€é”€**ï¼šè¿‡æ»¤åœ¨ token å±‚é¢è¿›è¡Œ
- **é€Ÿåº¦æå‡**ï¼šé€šè¿‡ç¡®å®šæ€§è·¯å¾„å¿«é€Ÿå‰è¿›
- **ä¿è¯æœ‰æ•ˆæ€§**ï¼šæ— æ•ˆè¾“å‡ºä¸å¯èƒ½äº§ç”Ÿ

```python
import outlines

# Pydantic æ¨¡åž‹ -> JSON schema -> CFG -> FSM
class Person(BaseModel):
    name: str
    age: int

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")

# åº•å±‚æµç¨‹ï¼š
# 1. Person -> JSON schema
# 2. JSON schema -> CFG
# 3. CFG -> FSM
# 4. FSM åœ¨ç”Ÿæˆè¿‡ç¨‹ä¸­è¿‡æ»¤ token

generator = outlines.generate.json(model, Person)
result = generator("Generate person: Alice, 25")
```

### 2. ç»“æž„åŒ–ç”Ÿæˆå™¨

Outlines ä¸ºä¸åŒè¾“å‡ºç±»åž‹æä¾›ä¸“ç”¨ç”Ÿæˆå™¨ã€‚

#### Choice ç”Ÿæˆå™¨

```python
# å¤šé¡¹é€‰æ‹©
generator = outlines.generate.choice(
    model,
    ["positive", "negative", "neutral"]
)

sentiment = generator("Review: This is great!")
# ç»“æžœï¼šä¸‰ä¸ªé€‰é¡¹ä¹‹ä¸€
```

#### JSON ç”Ÿæˆå™¨

```python
from pydantic import BaseModel

class Product(BaseModel):
    name: str
    price: float
    in_stock: bool

# ç”Ÿæˆç¬¦åˆ schema çš„æœ‰æ•ˆ JSON
generator = outlines.generate.json(model, Product)
product = generator("Extract: iPhone 15, $999, available")

# ä¿è¯ä¸ºæœ‰æ•ˆçš„ Product å®žä¾‹
print(type(product))  # <class '__main__.Product'>
```

#### Regex ç”Ÿæˆå™¨

```python
# ç”ŸæˆåŒ¹é… regex çš„æ–‡æœ¬
generator = outlines.generate.regex(
    model,
    r"[0-9]{3}-[0-9]{3}-[0-9]{4}"  # ç”µè¯å·ç æ¨¡å¼
)

phone = generator("Generate phone number:")
# ç»“æžœï¼š"555-123-4567"ï¼ˆä¿è¯åŒ¹é…æ¨¡å¼ï¼‰
```

#### æ•´æ•°/æµ®ç‚¹æ•°ç”Ÿæˆå™¨

```python
# ç”Ÿæˆç‰¹å®šæ•°å€¼ç±»åž‹
int_generator = outlines.generate.integer(model)
age = int_generator("Person's age:")  # ä¿è¯ä¸ºæ•´æ•°

float_generator = outlines.generate.float(model)
price = float_generator("Product price:")  # ä¿è¯ä¸ºæµ®ç‚¹æ•°
```

### 3. æ¨¡åž‹åŽç«¯

Outlines æ”¯æŒå¤šç§æœ¬åœ°åŠåŸºäºŽ API çš„åŽç«¯ã€‚

#### Transformersï¼ˆHugging Faceï¼‰

```python
import outlines

# ä»Ž Hugging Face åŠ è½½
model = outlines.models.transformers(
    "microsoft/Phi-3-mini-4k-instruct",
    device="cuda"  # æˆ– "cpu"
)

# ä¸Žä»»æ„ç”Ÿæˆå™¨é…åˆä½¿ç”¨
generator = outlines.generate.json(model, YourModel)
```

#### llama.cpp

```python
# åŠ è½½ GGUF æ¨¡åž‹
model = outlines.models.llamacpp(
    "./models/llama-3.1-8b-instruct.Q4_K_M.gguf",
    n_gpu_layers=35
)

generator = outlines.generate.json(model, YourModel)
```

#### vLLMï¼ˆé«˜åžåé‡ï¼‰

```python
# ç”¨äºŽç”Ÿäº§éƒ¨ç½²
model = outlines.models.vllm(
    "meta-llama/Llama-3.1-8B-Instruct",
    tensor_parallel_size=2  # å¤š GPU
)

generator = outlines.generate.json(model, YourModel)
```

#### OpenAIï¼ˆæœ‰é™æ”¯æŒï¼‰

```python
# åŸºç¡€ OpenAI æ”¯æŒ
model = outlines.models.openai(
    "gpt-4o-mini",
    api_key="your-api-key"
)

# æ³¨æ„ï¼šAPI æ¨¡åž‹éƒ¨åˆ†åŠŸèƒ½å—é™
generator = outlines.generate.json(model, YourModel)
```

### 4. Pydantic é›†æˆ

Outlines å¯¹ Pydantic æä¾›ä¸€æµæ”¯æŒï¼Œå¯è‡ªåŠ¨è¿›è¡Œ schema è½¬æ¢ã€‚

#### åŸºç¡€æ¨¡åž‹

```python
from pydantic import BaseModel, Field

class Article(BaseModel):
    title: str = Field(description="Article title")
    author: str = Field(description="Author name")
    word_count: int = Field(description="Number of words", gt=0)
    tags: list[str] = Field(description="List of tags")

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")
generator = outlines.generate.json(model, Article)

article = generator("Generate article about AI")
print(article.title)
print(article.word_count)  # ä¿è¯ > 0
```

#### åµŒå¥—æ¨¡åž‹

```python
class Address(BaseModel):
    street: str
    city: str
    country: str

class Person(BaseModel):
    name: str
    age: int
    address: Address  # åµŒå¥—æ¨¡åž‹

generator = outlines.generate.json(model, Person)
person = generator("Generate person in New York")

print(person.address.city)  # "New York"
```

#### Enum ä¸Ž Literal

```python
from enum import Enum
from typing import Literal

class Status(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Application(BaseModel):
    applicant: str
    status: Status  # å¿…é¡»ä¸ºæžšä¸¾å€¼ä¹‹ä¸€
    priority: Literal["low", "medium", "high"]  # å¿…é¡»ä¸º literal ä¹‹ä¸€

generator = outlines.generate.json(model, Application)
app = generator("Generate application")

print(app.status)  # Status.PENDINGï¼ˆæˆ– APPROVED/REJECTEDï¼‰
```

## å¸¸è§æ¨¡å¼

### æ¨¡å¼ 1ï¼šæ•°æ®æå–

```python
from pydantic import BaseModel
import outlines

class CompanyInfo(BaseModel):
    name: str
    founded_year: int
    industry: str
    employees: int

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")
generator = outlines.generate.json(model, CompanyInfo)

text = """
Apple Inc. was founded in 1976 in the technology industry.
The company employs approximately 164,000 people worldwide.
"""

prompt = f"Extract company information:\n{text}\n\nCompany:"
company = generator(prompt)

print(f"Name: {company.name}")
print(f"Founded: {company.founded_year}")
print(f"Industry: {company.industry}")
print(f"Employees: {company.employees}")
```

### æ¨¡å¼ 2ï¼šåˆ†ç±»

```python
from typing import Literal
import outlines

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")

# äºŒåˆ†ç±»
generator = outlines.generate.choice(model, ["spam", "not_spam"])
result = generator("Email: Buy now! 50% off!")

# å¤šåˆ†ç±»
categories = ["technology", "business", "sports", "entertainment"]
category_gen = outlines.generate.choice(model, categories)
category = category_gen("Article: Apple announces new iPhone...")

# å¸¦ç½®ä¿¡åº¦
class Classification(BaseModel):
    label: Literal["positive", "negative", "neutral"]
    confidence: float

classifier = outlines.generate.json(model, Classification)
result = classifier("Review: This product is okay, nothing special")
```

### æ¨¡å¼ 3ï¼šç»“æž„åŒ–è¡¨å•

```python
class UserProfile(BaseModel):
    full_name: str
    age: int
    email: str
    phone: str
    country: str
    interests: list[str]

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")
generator = outlines.generate.json(model, UserProfile)

prompt = """
Extract user profile from:
Name: Alice Johnson
Age: 28
Email: alice@example.com
Phone: 555-0123
Country: USA
Interests: hiking, photography, cooking
"""

profile = generator(prompt)
print(profile.full_name)
print(profile.interests)  # ["hiking", "photography", "cooking"]
```

### æ¨¡å¼ 4ï¼šå¤šå®žä½“æå–

```python
class Entity(BaseModel):
    name: str
    type: Literal["PERSON", "ORGANIZATION", "LOCATION"]

class DocumentEntities(BaseModel):
    entities: list[Entity]

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")
generator = outlines.generate.json(model, DocumentEntities)

text = "Tim Cook met with Satya Nadella at Microsoft headquarters in Redmond."
prompt = f"Extract entities from: {text}"

result = generator(prompt)
for entity in result.entities:
    print(f"{entity.name} ({entity.type})")
```

### æ¨¡å¼ 5ï¼šä»£ç ç”Ÿæˆ

```python
class PythonFunction(BaseModel):
    function_name: str
    parameters: list[str]
    docstring: str
    body: str

model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")
generator = outlines.generate.json(model, PythonFunction)

prompt = "Generate a Python function to calculate factorial"
func = generator(prompt)

print(f"def {func.function_name}({', '.join(func.parameters)}):")
print(f'    """{func.docstring}"""')
print(f"    {func.body}")
```

### æ¨¡å¼ 6ï¼šæ‰¹é‡å¤„ç†

```python
def batch_extract(texts: list[str], schema: type[BaseModel]):
    """ä»Žå¤šæ®µæ–‡æœ¬ä¸­æå–ç»“æž„åŒ–æ•°æ®ã€‚"""
    model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")
    generator = outlines.generate.json(model, schema)

    results = []
    for text in texts:
        result = generator(f"Extract from: {text}")
        results.append(result)

    return results

class Person(BaseModel):
    name: str
    age: int

texts = [
    "John is 30 years old",
    "Alice is 25 years old",
    "Bob is 40 years old"
]

people = batch_extract(texts, Person)
for person in people:
    print(f"{person.name}: {person.age}")
```

## åŽç«¯é…ç½®

### Transformers

```python
import outlines

# åŸºç¡€ç”¨æ³•
model = outlines.models.transformers("microsoft/Phi-3-mini-4k-instruct")

# GPU é…ç½®
model = outlines.models.transformers(
    "microsoft/Phi-3-mini-4k-instruct",
    device="cuda",
    model_kwargs={"torch_dtype": "float16"}
)

# å¸¸ç”¨æ¨¡åž‹
model = outlines.models.transformers("meta-llama/Llama-3.1-8B-Instruct")
model = outlines.models.transformers("mistralai/Mistral-7B-Instruct-v0.3")
model = outlines.models.transformers("Qwen/Qwen2.5-7B-Instruct")
```

### llama.cpp

```python
# åŠ è½½ GGUF æ¨¡åž‹
model = outlines.models.llamacpp(
    "./models/llama-3.1-8b.Q4_K_M.gguf",
    n_ctx=4096,         # ä¸Šä¸‹æ–‡çª—å£
    n_gpu_layers=35,    # GPU å±‚æ•°
    n_threads=8         # CPU çº¿ç¨‹æ•°
)

# å®Œå…¨ GPU å¸è½½
model = outlines.models.llamacpp(
    "./models/model.gguf",
    n_gpu_layers=-1  # æ‰€æœ‰å±‚åœ¨ GPU ä¸Š
)
```

### vLLMï¼ˆç”Ÿäº§çŽ¯å¢ƒï¼‰

```python
# å• GPU
model = outlines.models.vllm("meta-llama/Llama-3.1-8B-Instruct")

# å¤š GPU
model = outlines.models.vllm(
    "meta-llama/Llama-3.1-70B-Instruct",
    tensor_parallel_size=4  # 4 å— GPU
)

# å¸¦é‡åŒ–
model = outlines.models.vllm(
    "meta-llama/Llama-3.1-8B-Instruct",
    quantization="awq"  # æˆ– "gptq"
)
```

## æœ€ä½³å®žè·µ

### 1. ä½¿ç”¨å…·ä½“ç±»åž‹

```python
# âœ… å¥½ï¼šå…·ä½“ç±»åž‹
class Product(BaseModel):
    name: str
    price: float  # éž str
    quantity: int  # éž str
    in_stock: bool  # éž str

# âŒ å·®ï¼šå…¨éƒ¨ç”¨å­—ç¬¦ä¸²
class Product(BaseModel):
    name: str
    price: str  # åº”ä¸º float
    quantity: str  # åº”ä¸º int
```

### 2. æ·»åŠ çº¦æŸ

```python
from pydantic import Field

# âœ… å¥½ï¼šå¸¦çº¦æŸ
class User(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    age: int = Field(ge=0, le=120)
    email: str = Field(pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")

# âŒ å·®ï¼šæ— çº¦æŸ
class User(BaseModel):
    name: str
    age: int
    email: str
```

### 3. å¯¹åˆ†ç±»ä½¿ç”¨ Enum

```python
# âœ… å¥½ï¼šå›ºå®šé›†åˆä½¿ç”¨ Enum
class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Task(BaseModel):
    title: str
    priority: Priority

# âŒ å·®ï¼šè‡ªç”±æ ¼å¼å­—ç¬¦ä¸²
class Task(BaseModel):
    title: str
    priority: str  # å¯ä»¥æ˜¯ä»»æ„å€¼
```

### 4. åœ¨ Prompt ä¸­æä¾›ä¸Šä¸‹æ–‡

```python
# âœ… å¥½ï¼šæ¸…æ™°çš„ä¸Šä¸‹æ–‡
prompt = """
Extract product information from the following text.
Text: iPhone 15 Pro costs $999 and is currently in stock.
Product:
"""

# âŒ å·®ï¼šä¸Šä¸‹æ–‡ä¸è¶³
prompt = "iPhone 15 Pro costs $999 and is currently in stock."
```

### 5. å¤„ç†å¯é€‰å­—æ®µ

```python
from typing import Optional

# âœ… å¥½ï¼šå¯¹ä¸å®Œæ•´æ•°æ®ä½¿ç”¨å¯é€‰å­—æ®µ
class Article(BaseModel):
    title: str  # å¿…å¡«
    author: Optional[str] = None  # å¯é€‰
    date: Optional[str] = None  # å¯é€‰
    tags: list[str] = []  # é»˜è®¤ç©ºåˆ—è¡¨

# å³ä½¿ author/date ç¼ºå¤±ä¹Ÿèƒ½æˆåŠŸ
```

## ä¸Žæ›¿ä»£æ–¹æ¡ˆçš„å¯¹æ¯”

| ç‰¹æ€§ | Outlines | Instructor | Guidance | LMQL |
|---------|----------|------------|----------|------|
| Pydantic æ”¯æŒ | âœ… åŽŸç”Ÿ | âœ… åŽŸç”Ÿ | âŒ æ—  | âŒ æ—  |
| JSON Schema | âœ… æ”¯æŒ | âœ… æ”¯æŒ | âš ï¸ æœ‰é™ | âœ… æ”¯æŒ |
| Regex çº¦æŸ | âœ… æ”¯æŒ | âŒ æ—  | âœ… æ”¯æŒ | âœ… æ”¯æŒ |
| æœ¬åœ°æ¨¡åž‹ | âœ… å®Œæ•´ | âš ï¸ æœ‰é™ | âœ… å®Œæ•´ | âœ… å®Œæ•´ |
| API æ¨¡åž‹ | âš ï¸ æœ‰é™ | âœ… å®Œæ•´ | âœ… å®Œæ•´ | âœ… å®Œæ•´ |
| é›¶å¼€é”€ | âœ… æ”¯æŒ | âŒ æ—  | âš ï¸ éƒ¨åˆ† | âœ… æ”¯æŒ |
| è‡ªåŠ¨é‡è¯• | âŒ æ—  | âœ… æ”¯æŒ | âŒ æ—  | âŒ æ—  |
| å­¦ä¹ æ›²çº¿ | ä½Ž | ä½Ž | ä½Ž | é«˜ |

**ä½•æ—¶é€‰æ‹© Outlinesï¼š**
- ä½¿ç”¨æœ¬åœ°æ¨¡åž‹ï¼ˆTransformersã€llama.cppã€vLLMï¼‰
- éœ€è¦æœ€å¤§æŽ¨ç†é€Ÿåº¦
- éœ€è¦ Pydantic æ¨¡åž‹æ”¯æŒ
- éœ€è¦é›¶å¼€é”€ç»“æž„åŒ–ç”Ÿæˆ
- éœ€è¦æŽ§åˆ¶ token é‡‡æ ·è¿‡ç¨‹

**ä½•æ—¶é€‰æ‹©æ›¿ä»£æ–¹æ¡ˆï¼š**
- Instructorï¼šéœ€è¦ API æ¨¡åž‹å¹¶æ”¯æŒè‡ªåŠ¨é‡è¯•
- Guidanceï¼šéœ€è¦ token healing å’Œå¤æ‚å·¥ä½œæµ
- LMQLï¼šåå¥½å£°æ˜Žå¼æŸ¥è¯¢è¯­æ³•

## æ€§èƒ½ç‰¹æ€§

**é€Ÿåº¦ï¼š**
- **é›¶å¼€é”€**ï¼šç»“æž„åŒ–ç”Ÿæˆä¸Žæ— çº¦æŸç”ŸæˆåŒæ ·å¿«é€Ÿ
- **å¿«é€Ÿå‰è¿›ä¼˜åŒ–**ï¼šè·³è¿‡ç¡®å®šæ€§ token
- **æ¯”ç”ŸæˆåŽéªŒè¯æ–¹æ¡ˆå¿« 1.2â€“2 å€**

**å†…å­˜ï¼š**
- FSM æ¯ä¸ª schema ç¼–è¯‘ä¸€æ¬¡ï¼ˆå·²ç¼“å­˜ï¼‰
- æžä½Žçš„è¿è¡Œæ—¶å¼€é”€
- é…åˆ vLLM å¯å®žçŽ°é«˜åžåé‡

**å‡†ç¡®æ€§ï¼š**
- **100% æœ‰æ•ˆè¾“å‡º**ï¼ˆç”± FSM ä¿è¯ï¼‰
- æ— éœ€é‡è¯•å¾ªçŽ¯
- ç¡®å®šæ€§ token è¿‡æ»¤

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://outlines-dev.github.io/outlines
- **GitHub**ï¼šhttps://github.com/outlines-dev/outlinesï¼ˆ8k+ starsï¼‰
- **Discord**ï¼šhttps://discord.gg/R9DSu34mGd
- **åšå®¢**ï¼šhttps://blog.dottxt.co

## å¦è¯·å‚é˜…

- `references/json_generation.md` â€” å…¨é¢çš„ JSON ä¸Ž Pydantic æ¨¡å¼
- `references/backends.md` â€” åŽç«¯ä¸“é¡¹é…ç½®
- `references/examples.md` â€” ç”Ÿäº§å°±ç»ªç¤ºä¾‹
