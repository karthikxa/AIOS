---
title: "Instructor"
sidebar_label: "Instructor"
description: "ä½¿ç”¨ Pydantic éªŒè¯ä»Ž LLM å“åº”ä¸­æå–ç»“æž„åŒ–æ•°æ®ï¼Œè‡ªåŠ¨é‡è¯•å¤±è´¥çš„æå–ï¼Œä»¥ç±»åž‹å®‰å…¨æ–¹å¼è§£æžå¤æ‚ JSONï¼Œå¹¶ä½¿ç”¨ Instructor æµå¼ä¼ è¾“éƒ¨åˆ†ç»“æžœâ€”â€”ç»è¿‡å®žæˆ˜æ£€éªŒçš„ç»“æž„åŒ–è¾“å‡ºåº“"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Instructor

ä½¿ç”¨ Pydantic éªŒè¯ä»Ž LLM å“åº”ä¸­æå–ç»“æž„åŒ–æ•°æ®ï¼Œè‡ªåŠ¨é‡è¯•å¤±è´¥çš„æå–ï¼Œä»¥ç±»åž‹å®‰å…¨æ–¹å¼è§£æžå¤æ‚ JSONï¼Œå¹¶ä½¿ç”¨ Instructor æµå¼ä¼ è¾“éƒ¨åˆ†ç»“æžœâ€”â€”ç»è¿‡å®žæˆ˜æ£€éªŒçš„ç»“æž„åŒ–è¾“å‡ºåº“

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/instructor` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/instructor` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `instructor`, `pydantic`, `openai`, `anthropic` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Prompt Engineering`, `Instructor`, `Structured Output`, `Pydantic`, `Data Extraction`, `JSON Parsing`, `Type Safety`, `Validation`, `Streaming`, `OpenAI`, `Anthropic` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Instructorï¼šç»“æž„åŒ– LLM è¾“å‡º

## ä½•æ—¶ä½¿ç”¨æ­¤ Skill

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ Instructorï¼š
- **ä»Ž LLM å“åº”ä¸­å¯é åœ°æå–ç»“æž„åŒ–æ•°æ®**
- **æ ¹æ® Pydantic schema è‡ªåŠ¨éªŒè¯è¾“å‡º**
- **é€šè¿‡è‡ªåŠ¨é”™è¯¯å¤„ç†é‡è¯•å¤±è´¥çš„æå–**
- **ä»¥ç±»åž‹å®‰å…¨å’ŒéªŒè¯æ–¹å¼è§£æžå¤æ‚ JSON**
- **æµå¼ä¼ è¾“éƒ¨åˆ†ç»“æžœ**ä»¥è¿›è¡Œå®žæ—¶å¤„ç†
- **ä»¥ä¸€è‡´çš„ API æ”¯æŒå¤šä¸ª LLM æä¾›å•†**

**GitHub Stars**ï¼š15,000+ï½œ**å®žæˆ˜æ£€éªŒ**ï¼š100,000+ å¼€å‘è€…

## å®‰è£…

```bash
# åŸºç¡€å®‰è£…
pip install instructor

# æŒ‡å®šæä¾›å•†
pip install "instructor[anthropic]"  # Anthropic Claude
pip install "instructor[openai]"     # OpenAI
pip install "instructor[all]"        # æ‰€æœ‰æä¾›å•†
```

## å¿«é€Ÿå¼€å§‹

### åŸºç¡€ç¤ºä¾‹ï¼šæå–ç”¨æˆ·æ•°æ®

```python
import instructor
from pydantic import BaseModel
from anthropic import Anthropic

# Define output structure
class User(BaseModel):
    name: str
    age: int
    email: str

# Create instructor client
client = instructor.from_anthropic(Anthropic())

# Extract structured data
user = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "John Doe is 30 years old. His email is john@example.com"
    }],
    response_model=User
)

print(user.name)   # "John Doe"
print(user.age)    # 30
print(user.email)  # "john@example.com"
```

### ä½¿ç”¨ OpenAI

```python
from openai import OpenAI

client = instructor.from_openai(OpenAI())

user = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=User,
    messages=[{"role": "user", "content": "Extract: Alice, 25, alice@email.com"}]
)
```

## æ ¸å¿ƒæ¦‚å¿µ

### 1. å“åº”æ¨¡åž‹ï¼ˆPydanticï¼‰

å“åº”æ¨¡åž‹å®šä¹‰ LLM è¾“å‡ºçš„ç»“æž„å’ŒéªŒè¯è§„åˆ™ã€‚

#### åŸºç¡€æ¨¡åž‹

```python
from pydantic import BaseModel, Field

class Article(BaseModel):
    title: str = Field(description="Article title")
    author: str = Field(description="Author name")
    word_count: int = Field(description="Number of words", gt=0)
    tags: list[str] = Field(description="List of relevant tags")

article = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Analyze this article: [article text]"
    }],
    response_model=Article
)
```

**ä¼˜åŠ¿ï¼š**
- ä½¿ç”¨ Python ç±»åž‹æç¤ºä¿è¯ç±»åž‹å®‰å…¨
- è‡ªåŠ¨éªŒè¯ï¼ˆword_count > 0ï¼‰
- é€šè¿‡ Field æè¿°å®žçŽ°è‡ªæ–‡æ¡£åŒ–
- IDE è‡ªåŠ¨è¡¥å…¨æ”¯æŒ

#### åµŒå¥—æ¨¡åž‹

```python
class Address(BaseModel):
    street: str
    city: str
    country: str

class Person(BaseModel):
    name: str
    age: int
    address: Address  # Nested model

person = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "John lives at 123 Main St, Boston, USA"
    }],
    response_model=Person
)

print(person.address.city)  # "Boston"
```

#### å¯é€‰å­—æ®µ

```python
from typing import Optional

class Product(BaseModel):
    name: str
    price: float
    discount: Optional[float] = None  # Optional
    description: str = Field(default="No description")  # Default value

# LLM doesn't need to provide discount or description
```

#### ä½¿ç”¨æžšä¸¾çº¦æŸå€¼

```python
from enum import Enum

class Sentiment(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"

class Review(BaseModel):
    text: str
    sentiment: Sentiment  # Only these 3 values allowed

review = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "This product is amazing!"
    }],
    response_model=Review
)

print(review.sentiment)  # Sentiment.POSITIVE
```

### 2. éªŒè¯

Pydantic è‡ªåŠ¨éªŒè¯ LLM è¾“å‡ºã€‚è‹¥éªŒè¯å¤±è´¥ï¼ŒInstructor ä¼šè‡ªåŠ¨é‡è¯•ã€‚

#### å†…ç½®éªŒè¯å™¨

```python
from pydantic import Field, EmailStr, HttpUrl

class Contact(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    age: int = Field(ge=0, le=120)  # 0 <= age <= 120
    email: EmailStr  # Validates email format
    website: HttpUrl  # Validates URL format

# If LLM provides invalid data, Instructor retries automatically
```

#### è‡ªå®šä¹‰éªŒè¯å™¨

```python
from pydantic import field_validator

class Event(BaseModel):
    name: str
    date: str
    attendees: int

    @field_validator('date')
    def validate_date(cls, v):
        """Ensure date is in YYYY-MM-DD format."""
        import re
        if not re.match(r'\d{4}-\d{2}-\d{2}', v):
            raise ValueError('Date must be YYYY-MM-DD format')
        return v

    @field_validator('attendees')
    def validate_attendees(cls, v):
        """Ensure positive attendees."""
        if v < 1:
            raise ValueError('Must have at least 1 attendee')
        return v
```

#### æ¨¡åž‹çº§éªŒè¯

```python
from pydantic import model_validator

class DateRange(BaseModel):
    start_date: str
    end_date: str

    @model_validator(mode='after')
    def check_dates(self):
        """Ensure end_date is after start_date."""
        from datetime import datetime
        start = datetime.strptime(self.start_date, '%Y-%m-%d')
        end = datetime.strptime(self.end_date, '%Y-%m-%d')

        if end < start:
            raise ValueError('end_date must be after start_date')
        return self
```

### 3. è‡ªåŠ¨é‡è¯•

å½“éªŒè¯å¤±è´¥æ—¶ï¼ŒInstructor ä¼šè‡ªåŠ¨é‡è¯•ï¼Œå¹¶å°†é”™è¯¯åé¦ˆæä¾›ç»™ LLMã€‚

```python
# Retries up to 3 times if validation fails
user = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Extract user from: John, age unknown"
    }],
    response_model=User,
    max_retries=3  # Default is 3
)

# If age can't be extracted, Instructor tells the LLM:
# "Validation error: age - field required"
# LLM tries again with better extraction
```

**å·¥ä½œåŽŸç†ï¼š**
1. LLM ç”Ÿæˆè¾“å‡º
2. Pydantic è¿›è¡ŒéªŒè¯
3. è‹¥æ— æ•ˆï¼šå°†é”™è¯¯ä¿¡æ¯å‘å›žç»™ LLM
4. LLM æ ¹æ®é”™è¯¯åé¦ˆé‡æ–°å°è¯•
5. é‡å¤ç›´è‡³è¾¾åˆ° max_retries æ¬¡æ•°

### 4. æµå¼ä¼ è¾“

æµå¼ä¼ è¾“éƒ¨åˆ†ç»“æžœä»¥è¿›è¡Œå®žæ—¶å¤„ç†ã€‚

#### æµå¼ä¼ è¾“éƒ¨åˆ†å¯¹è±¡

```python
from instructor import Partial

class Story(BaseModel):
    title: str
    content: str
    tags: list[str]

# Stream partial updates as LLM generates
for partial_story in client.messages.create_partial(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Write a short sci-fi story"
    }],
    response_model=Story
):
    print(f"Title: {partial_story.title}")
    print(f"Content so far: {partial_story.content[:100]}...")
    # Update UI in real-time
```

#### æµå¼ä¼ è¾“å¯è¿­ä»£å¯¹è±¡

```python
class Task(BaseModel):
    title: str
    priority: str

# Stream list items as they're generated
tasks = client.messages.create_iterable(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Generate 10 project tasks"
    }],
    response_model=Task
)

for task in tasks:
    print(f"- {task.title} ({task.priority})")
    # Process each task as it arrives
```

## æä¾›å•†é…ç½®

### Anthropic Claude

```python
import instructor
from anthropic import Anthropic

client = instructor.from_anthropic(
    Anthropic(api_key="your-api-key")
)

# Use with Claude models
response = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[...],
    response_model=YourModel
)
```

### OpenAI

```python
from openai import OpenAI

client = instructor.from_openai(
    OpenAI(api_key="your-api-key")
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=YourModel,
    messages=[...]
)
```

### æœ¬åœ°æ¨¡åž‹ï¼ˆOllamaï¼‰

```python
from openai import OpenAI

# Point to local Ollama server
client = instructor.from_openai(
    OpenAI(
        base_url="http://localhost:11434/v1",
        api_key="ollama"  # Required but ignored
    ),
    mode=instructor.Mode.JSON
)

response = client.chat.completions.create(
    model="llama3.1",
    response_model=YourModel,
    messages=[...]
)
```

## å¸¸ç”¨æ¨¡å¼

### æ¨¡å¼ 1ï¼šä»Žæ–‡æœ¬ä¸­æå–æ•°æ®

```python
class CompanyInfo(BaseModel):
    name: str
    founded_year: int
    industry: str
    employees: int
    headquarters: str

text = """
Tesla, Inc. was founded in 2003. It operates in the automotive and energy
industry with approximately 140,000 employees. The company is headquartered
in Austin, Texas.
"""

company = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"Extract company information from: {text}"
    }],
    response_model=CompanyInfo
)
```

### æ¨¡å¼ 2ï¼šåˆ†ç±»

```python
class Category(str, Enum):
    TECHNOLOGY = "technology"
    FINANCE = "finance"
    HEALTHCARE = "healthcare"
    EDUCATION = "education"
    OTHER = "other"

class ArticleClassification(BaseModel):
    category: Category
    confidence: float = Field(ge=0.0, le=1.0)
    keywords: list[str]

classification = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Classify this article: [article text]"
    }],
    response_model=ArticleClassification
)
```

### æ¨¡å¼ 3ï¼šå¤šå®žä½“æå–

```python
class Person(BaseModel):
    name: str
    role: str

class Organization(BaseModel):
    name: str
    industry: str

class Entities(BaseModel):
    people: list[Person]
    organizations: list[Organization]
    locations: list[str]

text = "Tim Cook, CEO of Apple, announced at the event in Cupertino..."

entities = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"Extract all entities from: {text}"
    }],
    response_model=Entities
)

for person in entities.people:
    print(f"{person.name} - {person.role}")
```

### æ¨¡å¼ 4ï¼šç»“æž„åŒ–åˆ†æž

```python
class SentimentAnalysis(BaseModel):
    overall_sentiment: Sentiment
    positive_aspects: list[str]
    negative_aspects: list[str]
    suggestions: list[str]
    score: float = Field(ge=-1.0, le=1.0)

review = "The product works well but setup was confusing..."

analysis = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"Analyze this review: {review}"
    }],
    response_model=SentimentAnalysis
)
```

### æ¨¡å¼ 5ï¼šæ‰¹é‡å¤„ç†

```python
def extract_person(text: str) -> Person:
    return client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"Extract person from: {text}"
        }],
        response_model=Person
    )

texts = [
    "John Doe is a 30-year-old engineer",
    "Jane Smith, 25, works in marketing",
    "Bob Johnson, age 40, software developer"
]

people = [extract_person(text) for text in texts]
```

## é«˜çº§ç‰¹æ€§

### è”åˆç±»åž‹

```python
from typing import Union

class TextContent(BaseModel):
    type: str = "text"
    content: str

class ImageContent(BaseModel):
    type: str = "image"
    url: HttpUrl
    caption: str

class Post(BaseModel):
    title: str
    content: Union[TextContent, ImageContent]  # Either type

# LLM chooses appropriate type based on content
```

### åŠ¨æ€æ¨¡åž‹

```python
from pydantic import create_model

# Create model at runtime
DynamicUser = create_model(
    'User',
    name=(str, ...),
    age=(int, Field(ge=0)),
    email=(EmailStr, ...)
)

user = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[...],
    response_model=DynamicUser
)
```

### è‡ªå®šä¹‰æ¨¡å¼

```python
# For providers without native structured outputs
client = instructor.from_anthropic(
    Anthropic(),
    mode=instructor.Mode.JSON  # JSON mode
)

# Available modes:
# - Mode.ANTHROPIC_TOOLS (recommended for Claude)
# - Mode.JSON (fallback)
# - Mode.TOOLS (OpenAI tools)
```

### ä¸Šä¸‹æ–‡ç®¡ç†

```python
# Single-use client
with instructor.from_anthropic(Anthropic()) as client:
    result = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=1024,
        messages=[...],
        response_model=YourModel
    )
    # Client closed automatically
```

## é”™è¯¯å¤„ç†

### å¤„ç†éªŒè¯é”™è¯¯

```python
from pydantic import ValidationError

try:
    user = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=1024,
        messages=[...],
        response_model=User,
        max_retries=3
    )
except ValidationError as e:
    print(f"Failed after retries: {e}")
    # Handle gracefully

except Exception as e:
    print(f"API error: {e}")
```

### è‡ªå®šä¹‰é”™è¯¯ä¿¡æ¯

```python
class ValidatedUser(BaseModel):
    name: str = Field(description="Full name, 2-100 characters")
    age: int = Field(description="Age between 0 and 120", ge=0, le=120)
    email: EmailStr = Field(description="Valid email address")

    class Config:
        # Custom error messages
        json_schema_extra = {
            "examples": [
                {
                    "name": "John Doe",
                    "age": 30,
                    "email": "john@example.com"
                }
            ]
        }
```

## æœ€ä½³å®žè·µ

### 1. æ¸…æ™°çš„å­—æ®µæè¿°

```python
# âŒ Bad: Vague
class Product(BaseModel):
    name: str
    price: float

# âœ… Good: Descriptive
class Product(BaseModel):
    name: str = Field(description="Product name from the text")
    price: float = Field(description="Price in USD, without currency symbol")
```

### 2. ä½¿ç”¨é€‚å½“çš„éªŒè¯

```python
# âœ… Good: Constrain values
class Rating(BaseModel):
    score: int = Field(ge=1, le=5, description="Rating from 1 to 5 stars")
    review: str = Field(min_length=10, description="Review text, at least 10 chars")
```

### 3. åœ¨ promptï¼ˆæç¤ºè¯ï¼‰ä¸­æä¾›ç¤ºä¾‹

```python
messages = [{
    "role": "user",
    "content": """Extract person info from: "John, 30, engineer"

Example format:
{
  "name": "John Doe",
  "age": 30,
  "occupation": "engineer"
}"""
}]
```

### 4. å¯¹å›ºå®šç±»åˆ«ä½¿ç”¨æžšä¸¾

```python
# âœ… Good: Enum ensures valid values
class Status(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Application(BaseModel):
    status: Status  # LLM must choose from enum
```

### 5. ä¼˜é›…å¤„ç†ç¼ºå¤±æ•°æ®

```python
class PartialData(BaseModel):
    required_field: str
    optional_field: Optional[str] = None
    default_field: str = "default_value"

# LLM only needs to provide required_field
```

## ä¸Žå…¶ä»–æ–¹æ¡ˆçš„å¯¹æ¯”

| ç‰¹æ€§ | Instructor | æ‰‹åŠ¨ JSON | LangChain | DSPy |
|---------|------------|-------------|-----------|------|
| ç±»åž‹å®‰å…¨ | âœ… æ˜¯ | âŒ å¦ | âš ï¸ éƒ¨åˆ† | âœ… æ˜¯ |
| è‡ªåŠ¨éªŒè¯ | âœ… æ˜¯ | âŒ å¦ | âŒ å¦ | âš ï¸ æœ‰é™ |
| è‡ªåŠ¨é‡è¯• | âœ… æ˜¯ | âŒ å¦ | âŒ å¦ | âœ… æ˜¯ |
| æµå¼ä¼ è¾“ | âœ… æ˜¯ | âŒ å¦ | âœ… æ˜¯ | âŒ å¦ |
| å¤šæä¾›å•† | âœ… æ˜¯ | âš ï¸ æ‰‹åŠ¨ | âœ… æ˜¯ | âœ… æ˜¯ |
| å­¦ä¹ æ›²çº¿ | ä½Ž | ä½Ž | ä¸­ | é«˜ |

**ä½•æ—¶é€‰æ‹© Instructorï¼š**
- éœ€è¦ç»“æž„åŒ–ã€ç»è¿‡éªŒè¯çš„è¾“å‡º
- éœ€è¦ç±»åž‹å®‰å…¨å’Œ IDE æ”¯æŒ
- éœ€è¦è‡ªåŠ¨é‡è¯•
- æž„å»ºæ•°æ®æå–ç³»ç»Ÿ

**ä½•æ—¶é€‰æ‹©å…¶ä»–æ–¹æ¡ˆï¼š**
- DSPyï¼šéœ€è¦ prompt ä¼˜åŒ–
- LangChainï¼šæž„å»ºå¤æ‚é“¾è·¯
- æ‰‹åŠ¨ï¼šç®€å•çš„ä¸€æ¬¡æ€§æå–

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://python.useinstructor.com
- **GitHub**ï¼šhttps://github.com/jxnl/instructorï¼ˆ15k+ starsï¼‰
- **Cookbook**ï¼šhttps://python.useinstructor.com/examples
- **Discord**ï¼šæä¾›ç¤¾åŒºæ”¯æŒ

## å¦è¯·å‚é˜…

- `references/validation.md` â€” é«˜çº§éªŒè¯æ¨¡å¼
- `references/providers.md` â€” æä¾›å•†ä¸“é¡¹é…ç½®
- `references/examples.md` â€” çœŸå®žä½¿ç”¨æ¡ˆä¾‹
