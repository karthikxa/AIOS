---
title: "Guidance"
sidebar_label: "Guidance"
description: "ä½¿ç”¨æ­£åˆ™è¡¨è¾¾å¼å’Œè¯­æ³•æŽ§åˆ¶ LLM è¾“å‡ºï¼Œä¿è¯ç”Ÿæˆæœ‰æ•ˆçš„ JSON/XML/ä»£ç ï¼Œå¼ºåˆ¶ç»“æž„åŒ–æ ¼å¼ï¼Œå¹¶ä½¿ç”¨ Guidanceï¼ˆå¾®è½¯ç ”ç©¶é™¢çš„çº¦æŸç”Ÿæˆæ¡†æž¶ï¼‰æž„å»ºå¤šæ­¥éª¤å·¥ä½œæµ..."
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Guidance

ä½¿ç”¨æ­£åˆ™è¡¨è¾¾å¼å’Œè¯­æ³•æŽ§åˆ¶ LLM è¾“å‡ºï¼Œä¿è¯ç”Ÿæˆæœ‰æ•ˆçš„ JSON/XML/ä»£ç ï¼Œå¼ºåˆ¶ç»“æž„åŒ–æ ¼å¼ï¼Œå¹¶ä½¿ç”¨ Guidanceï¼ˆå¾®è½¯ç ”ç©¶é™¢çš„çº¦æŸç”Ÿæˆæ¡†æž¶ï¼‰æž„å»ºå¤šæ­¥éª¤å·¥ä½œæµ

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/guidance` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/guidance` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `guidance`, `transformers` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Prompt Engineering`, `Guidance`, `Constrained Generation`, `Structured Output`, `JSON Validation`, `Grammar`, `Microsoft Research`, `Format Enforcement`, `Multi-Step Workflows` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Guidanceï¼šçº¦æŸ LLM ç”Ÿæˆ

## ä½•æ—¶ä½¿ç”¨æ­¤ Skill

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ Guidanceï¼š
- **ä½¿ç”¨æ­£åˆ™è¡¨è¾¾å¼æˆ–è¯­æ³•æŽ§åˆ¶ LLM è¾“å‡ºè¯­æ³•**
- **ä¿è¯ç”Ÿæˆæœ‰æ•ˆçš„ JSON/XML/ä»£ç **
- **ç›¸æ¯”ä¼ ç»Ÿ promptingï¼ˆæç¤ºè¯ï¼‰æ–¹å¼é™ä½Žå»¶è¿Ÿ**
- **å¼ºåˆ¶ç»“æž„åŒ–æ ¼å¼**ï¼ˆæ—¥æœŸã€é‚®ç®±ã€ID ç­‰ï¼‰
- **ä½¿ç”¨ Python é£Žæ ¼çš„æŽ§åˆ¶æµæž„å»ºå¤šæ­¥éª¤å·¥ä½œæµ**
- **é€šè¿‡è¯­æ³•çº¦æŸé˜²æ­¢æ— æ•ˆè¾“å‡º**

**GitHub Stars**ï¼š18,000+ | **æ¥è‡ª**ï¼šå¾®è½¯ç ”ç©¶é™¢

## å®‰è£…

```bash
# åŸºç¡€å®‰è£…
pip install guidance

# æŒ‡å®šåŽç«¯
pip install guidance[transformers]  # Hugging Face æ¨¡åž‹
pip install guidance[llama_cpp]     # llama.cpp æ¨¡åž‹
```

## å¿«é€Ÿå¼€å§‹

### åŸºç¡€ç¤ºä¾‹ï¼šç»“æž„åŒ–ç”Ÿæˆ

```python
from guidance import models, gen

# åŠ è½½æ¨¡åž‹ï¼ˆæ”¯æŒ OpenAIã€Transformersã€llama.cppï¼‰
lm = models.OpenAI("gpt-4")

# å¸¦çº¦æŸç”Ÿæˆ
result = lm + "The capital of France is " + gen("capital", max_tokens=5)

print(result["capital"])  # "Paris"
```

### ä½¿ç”¨ Anthropic Claude

```python
from guidance import models, gen, system, user, assistant

# é…ç½® Claude
lm = models.Anthropic("claude-sonnet-4-5-20250929")

# ä½¿ç”¨ä¸Šä¸‹æ–‡ç®¡ç†å™¨å®žçŽ°å¯¹è¯æ ¼å¼
with system():
    lm += "You are a helpful assistant."

with user():
    lm += "What is the capital of France?"

with assistant():
    lm += gen(max_tokens=20)
```

## æ ¸å¿ƒæ¦‚å¿µ

### 1. ä¸Šä¸‹æ–‡ç®¡ç†å™¨

Guidance ä½¿ç”¨ Python é£Žæ ¼çš„ä¸Šä¸‹æ–‡ç®¡ç†å™¨å®žçŽ°å¯¹è¯å¼äº¤äº’ã€‚

```python
from guidance import system, user, assistant, gen

lm = models.Anthropic("claude-sonnet-4-5-20250929")

# ç³»ç»Ÿæ¶ˆæ¯
with system():
    lm += "You are a JSON generation expert."

# ç”¨æˆ·æ¶ˆæ¯
with user():
    lm += "Generate a person object with name and age."

# åŠ©æ‰‹å›žå¤
with assistant():
    lm += gen("response", max_tokens=100)

print(lm["response"])
```

**ä¼˜åŠ¿ï¼š**
- è‡ªç„¶çš„å¯¹è¯æµç¨‹
- æ¸…æ™°çš„è§’è‰²åˆ†ç¦»
- æ˜“äºŽé˜…è¯»å’Œç»´æŠ¤

### 2. çº¦æŸç”Ÿæˆ

Guidance ä½¿ç”¨æ­£åˆ™è¡¨è¾¾å¼æˆ–è¯­æ³•ç¡®ä¿è¾“å‡ºç¬¦åˆæŒ‡å®šæ¨¡å¼ã€‚

#### æ­£åˆ™è¡¨è¾¾å¼çº¦æŸ

```python
from guidance import models, gen

lm = models.Anthropic("claude-sonnet-4-5-20250929")

# çº¦æŸä¸ºæœ‰æ•ˆé‚®ç®±æ ¼å¼
lm += "Email: " + gen("email", regex=r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")

# çº¦æŸä¸ºæ—¥æœŸæ ¼å¼ï¼ˆYYYY-MM-DDï¼‰
lm += "Date: " + gen("date", regex=r"\d{4}-\d{2}-\d{2}")

# çº¦æŸä¸ºç”µè¯å·ç 
lm += "Phone: " + gen("phone", regex=r"\d{3}-\d{3}-\d{4}")

print(lm["email"])  # ä¿è¯ä¸ºæœ‰æ•ˆé‚®ç®±
print(lm["date"])   # ä¿è¯ä¸º YYYY-MM-DD æ ¼å¼
```

**å·¥ä½œåŽŸç†ï¼š**
- æ­£åˆ™è¡¨è¾¾å¼åœ¨ tokenï¼ˆè¯å…ƒï¼‰çº§åˆ«è½¬æ¢ä¸ºè¯­æ³•
- ç”Ÿæˆè¿‡ç¨‹ä¸­è¿‡æ»¤æ— æ•ˆ token
- æ¨¡åž‹åªèƒ½ç”Ÿæˆç¬¦åˆåŒ¹é…æ¡ä»¶çš„è¾“å‡º

#### é€‰æ‹©çº¦æŸ

```python
from guidance import models, gen, select

lm = models.Anthropic("claude-sonnet-4-5-20250929")

# çº¦æŸä¸ºç‰¹å®šé€‰é¡¹
lm += "Sentiment: " + select(["positive", "negative", "neutral"], name="sentiment")

# å¤šé€‰é¢˜é€‰æ‹©
lm += "Best answer: " + select(
    ["A) Paris", "B) London", "C) Berlin", "D) Madrid"],
    name="answer"
)

print(lm["sentiment"])  # å…¶ä¸­ä¹‹ä¸€ï¼špositiveã€negativeã€neutral
print(lm["answer"])     # å…¶ä¸­ä¹‹ä¸€ï¼šAã€Bã€C æˆ– D
```

### 3. Token ä¿®å¤ï¼ˆToken Healingï¼‰

Guidance è‡ªåŠ¨"ä¿®å¤" prompt ä¸Žç”Ÿæˆå†…å®¹ä¹‹é—´çš„ token è¾¹ç•Œã€‚

**é—®é¢˜ï¼š** åˆ†è¯ä¼šäº§ç”Ÿä¸è‡ªç„¶çš„è¾¹ç•Œã€‚

```python
# ä¸ä½¿ç”¨ token ä¿®å¤
prompt = "The capital of France is "
# æœ€åŽä¸€ä¸ª tokenï¼š" is "
# ç¬¬ä¸€ä¸ªç”Ÿæˆçš„ token å¯èƒ½æ˜¯ " Par"ï¼ˆå¸¦å‰å¯¼ç©ºæ ¼ï¼‰
# ç»“æžœï¼š"The capital of France is  Paris"ï¼ˆåŒç©ºæ ¼ï¼ï¼‰
```

**è§£å†³æ–¹æ¡ˆï¼š** Guidance å›žé€€ä¸€ä¸ª token å¹¶é‡æ–°ç”Ÿæˆã€‚

```python
from guidance import models, gen

lm = models.Anthropic("claude-sonnet-4-5-20250929")

# é»˜è®¤å¯ç”¨ token ä¿®å¤
lm += "The capital of France is " + gen("capital", max_tokens=5)
# ç»“æžœï¼š"The capital of France is Paris"ï¼ˆé—´è·æ­£ç¡®ï¼‰
```

**ä¼˜åŠ¿ï¼š**
- è‡ªç„¶çš„æ–‡æœ¬è¾¹ç•Œ
- æ— å°´å°¬çš„é—´è·é—®é¢˜
- æ›´å¥½çš„æ¨¡åž‹æ€§èƒ½ï¼ˆæ¨¡åž‹çœ‹åˆ°è‡ªç„¶çš„ token åºåˆ—ï¼‰

### 4. åŸºäºŽè¯­æ³•çš„ç”Ÿæˆ

ä½¿ç”¨ä¸Šä¸‹æ–‡æ— å…³è¯­æ³•å®šä¹‰å¤æ‚ç»“æž„ã€‚

```python
from guidance import models, gen

lm = models.Anthropic("claude-sonnet-4-5-20250929")

# JSON è¯­æ³•ï¼ˆç®€åŒ–ç‰ˆï¼‰
json_grammar = """
{
    "name": <gen name regex="[A-Za-z ]+" max_tokens=20>,
    "age": <gen age regex="[0-9]+" max_tokens=3>,
    "email": <gen email regex="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" max_tokens=50>
}
"""

# ç”Ÿæˆæœ‰æ•ˆ JSON
lm += gen("person", grammar=json_grammar)

print(lm["person"])  # ä¿è¯ä¸ºæœ‰æ•ˆ JSON ç»“æž„
```

**ä½¿ç”¨åœºæ™¯ï¼š**
- å¤æ‚ç»“æž„åŒ–è¾“å‡º
- åµŒå¥—æ•°æ®ç»“æž„
- ç¼–ç¨‹è¯­è¨€è¯­æ³•
- é¢†åŸŸç‰¹å®šè¯­è¨€

### 5. Guidance å‡½æ•°

ä½¿ç”¨ `@guidance` è£…é¥°å™¨åˆ›å»ºå¯å¤ç”¨çš„ç”Ÿæˆæ¨¡å¼ã€‚

```python
from guidance import guidance, gen, models

@guidance
def generate_person(lm):
    """ç”ŸæˆåŒ…å«å§“åå’Œå¹´é¾„çš„äººç‰©ä¿¡æ¯ã€‚"""
    lm += "Name: " + gen("name", max_tokens=20, stop="\n")
    lm += "\nAge: " + gen("age", regex=r"[0-9]+", max_tokens=3)
    return lm

# ä½¿ç”¨è¯¥å‡½æ•°
lm = models.Anthropic("claude-sonnet-4-5-20250929")
lm = generate_person(lm)

print(lm["name"])
print(lm["age"])
```

**æœ‰çŠ¶æ€å‡½æ•°ï¼š**

```python
@guidance(stateless=False)
def react_agent(lm, question, tools, max_rounds=5):
    """å¸¦å·¥å…·è°ƒç”¨çš„ ReAct agentã€‚"""
    lm += f"Question: {question}\n\n"

    for i in range(max_rounds):
        # æ€è€ƒ
        lm += f"Thought {i+1}: " + gen("thought", stop="\n")

        # åŠ¨ä½œ
        lm += "\nAction: " + select(list(tools.keys()), name="action")

        # æ‰§è¡Œå·¥å…·
        tool_result = tools[lm["action"]]()
        lm += f"\nObservation: {tool_result}\n\n"

        # æ£€æŸ¥æ˜¯å¦å®Œæˆ
        lm += "Done? " + select(["Yes", "No"], name="done")
        if lm["done"] == "Yes":
            break

    # æœ€ç»ˆç­”æ¡ˆ
    lm += "\nFinal Answer: " + gen("answer", max_tokens=100)
    return lm
```

## åŽç«¯é…ç½®

### Anthropic Claude

```python
from guidance import models

lm = models.Anthropic(
    model="claude-sonnet-4-5-20250929",
    api_key="your-api-key"  # æˆ–è®¾ç½® ANTHROPIC_API_KEY çŽ¯å¢ƒå˜é‡
)
```

### OpenAI

```python
lm = models.OpenAI(
    model="gpt-4o-mini",
    api_key="your-api-key"  # æˆ–è®¾ç½® OPENAI_API_KEY çŽ¯å¢ƒå˜é‡
)
```

### æœ¬åœ°æ¨¡åž‹ï¼ˆTransformersï¼‰

```python
from guidance.models import Transformers

lm = Transformers(
    "microsoft/Phi-4-mini-instruct",
    device="cuda"  # æˆ– "cpu"
)
```

### æœ¬åœ°æ¨¡åž‹ï¼ˆllama.cppï¼‰

```python
from guidance.models import LlamaCpp

lm = LlamaCpp(
    model_path="/path/to/model.gguf",
    n_ctx=4096,
    n_gpu_layers=35
)
```

## å¸¸ç”¨æ¨¡å¼

### æ¨¡å¼ 1ï¼šJSON ç”Ÿæˆ

```python
from guidance import models, gen, system, user, assistant

lm = models.Anthropic("claude-sonnet-4-5-20250929")

with system():
    lm += "You generate valid JSON."

with user():
    lm += "Generate a user profile with name, age, and email."

with assistant():
    lm += """{
    "name": """ + gen("name", regex=r'"[A-Za-z ]+"', max_tokens=30) + """,
    "age": """ + gen("age", regex=r"[0-9]+", max_tokens=3) + """,
    "email": """ + gen("email", regex=r'"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"', max_tokens=50) + """
}"""

print(lm)  # ä¿è¯ä¸ºæœ‰æ•ˆ JSON
```

### æ¨¡å¼ 2ï¼šåˆ†ç±»

```python
from guidance import models, gen, select

lm = models.Anthropic("claude-sonnet-4-5-20250929")

text = "This product is amazing! I love it."

lm += f"Text: {text}\n"
lm += "Sentiment: " + select(["positive", "negative", "neutral"], name="sentiment")
lm += "\nConfidence: " + gen("confidence", regex=r"[0-9]+", max_tokens=3) + "%"

print(f"Sentiment: {lm['sentiment']}")
print(f"Confidence: {lm['confidence']}%")
```

### æ¨¡å¼ 3ï¼šå¤šæ­¥éª¤æŽ¨ç†

```python
from guidance import models, gen, guidance

@guidance
def chain_of_thought(lm, question):
    """é€æ­¥æŽ¨ç†ç”Ÿæˆç­”æ¡ˆã€‚"""
    lm += f"Question: {question}\n\n"

    # ç”Ÿæˆå¤šä¸ªæŽ¨ç†æ­¥éª¤
    for i in range(3):
        lm += f"Step {i+1}: " + gen(f"step_{i+1}", stop="\n", max_tokens=100) + "\n"

    # æœ€ç»ˆç­”æ¡ˆ
    lm += "\nTherefore, the answer is: " + gen("answer", max_tokens=50)

    return lm

lm = models.Anthropic("claude-sonnet-4-5-20250929")
lm = chain_of_thought(lm, "What is 15% of 200?")

print(lm["answer"])
```

### æ¨¡å¼ 4ï¼šReAct Agent

```python
from guidance import models, gen, select, guidance

@guidance(stateless=False)
def react_agent(lm, question):
    """å¸¦å·¥å…·è°ƒç”¨çš„ ReAct agentã€‚"""
    tools = {
        "calculator": lambda expr: eval(expr),
        "search": lambda query: f"Search results for: {query}",
    }

    lm += f"Question: {question}\n\n"

    for round in range(5):
        # æ€è€ƒ
        lm += f"Thought: " + gen("thought", stop="\n") + "\n"

        # åŠ¨ä½œé€‰æ‹©
        lm += "Action: " + select(["calculator", "search", "answer"], name="action")

        if lm["action"] == "answer":
            lm += "\nFinal Answer: " + gen("answer", max_tokens=100)
            break

        # åŠ¨ä½œè¾“å…¥
        lm += "\nAction Input: " + gen("action_input", stop="\n") + "\n"

        # æ‰§è¡Œå·¥å…·
        if lm["action"] in tools:
            result = tools[lm["action"]](lm["action_input"])
            lm += f"Observation: {result}\n\n"

    return lm

lm = models.Anthropic("claude-sonnet-4-5-20250929")
lm = react_agent(lm, "What is 25 * 4 + 10?")
print(lm["answer"])
```

### æ¨¡å¼ 5ï¼šæ•°æ®æå–

```python
from guidance import models, gen, guidance

@guidance
def extract_entities(lm, text):
    """ä»Žæ–‡æœ¬ä¸­æå–ç»“æž„åŒ–å®žä½“ã€‚"""
    lm += f"Text: {text}\n\n"

    # æå–äººç‰©
    lm += "Person: " + gen("person", stop="\n", max_tokens=30) + "\n"

    # æå–ç»„ç»‡
    lm += "Organization: " + gen("organization", stop="\n", max_tokens=30) + "\n"

    # æå–æ—¥æœŸ
    lm += "Date: " + gen("date", regex=r"\d{4}-\d{2}-\d{2}", max_tokens=10) + "\n"

    # æå–åœ°ç‚¹
    lm += "Location: " + gen("location", stop="\n", max_tokens=30) + "\n"

    return lm

text = "Tim Cook announced at Apple Park on 2024-09-15 in Cupertino."

lm = models.Anthropic("claude-sonnet-4-5-20250929")
lm = extract_entities(lm, text)

print(f"Person: {lm['person']}")
print(f"Organization: {lm['organization']}")
print(f"Date: {lm['date']}")
print(f"Location: {lm['location']}")
```

## æœ€ä½³å®žè·µ

### 1. ä½¿ç”¨æ­£åˆ™è¡¨è¾¾å¼è¿›è¡Œæ ¼å¼éªŒè¯

```python
# âœ… å¥½ï¼šæ­£åˆ™è¡¨è¾¾å¼ç¡®ä¿æ ¼å¼æœ‰æ•ˆ
lm += "Email: " + gen("email", regex=r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")

# âŒ å·®ï¼šè‡ªç”±ç”Ÿæˆå¯èƒ½äº§ç”Ÿæ— æ•ˆé‚®ç®±
lm += "Email: " + gen("email", max_tokens=50)
```

### 2. å¯¹å›ºå®šç±»åˆ«ä½¿ç”¨ select()

```python
# âœ… å¥½ï¼šä¿è¯ä¸ºæœ‰æ•ˆç±»åˆ«
lm += "Status: " + select(["pending", "approved", "rejected"], name="status")

# âŒ å·®ï¼šå¯èƒ½ç”Ÿæˆæ‹¼å†™é”™è¯¯æˆ–æ— æ•ˆå€¼
lm += "Status: " + gen("status", max_tokens=20)
```

### 3. åˆ©ç”¨ Token ä¿®å¤

```python
# é»˜è®¤å¯ç”¨ token ä¿®å¤
# æ— éœ€ç‰¹æ®Šæ“ä½œâ€”â€”è‡ªç„¶æ‹¼æŽ¥å³å¯
lm += "The capital is " + gen("capital")  # è‡ªåŠ¨ä¿®å¤
```

### 4. ä½¿ç”¨åœæ­¢åºåˆ—

```python
# âœ… å¥½ï¼šåœ¨æ¢è¡Œå¤„åœæ­¢ï¼Œé€‚ç”¨äºŽå•è¡Œè¾“å‡º
lm += "Name: " + gen("name", stop="\n")

# âŒ å·®ï¼šå¯èƒ½ç”Ÿæˆå¤šè¡Œå†…å®¹
lm += "Name: " + gen("name", max_tokens=50)
```

### 5. åˆ›å»ºå¯å¤ç”¨å‡½æ•°

```python
# âœ… å¥½ï¼šå¯å¤ç”¨æ¨¡å¼
@guidance
def generate_person(lm):
    lm += "Name: " + gen("name", stop="\n")
    lm += "\nAge: " + gen("age", regex=r"[0-9]+")
    return lm

# å¤šæ¬¡ä½¿ç”¨
lm = generate_person(lm)
lm += "\n\n"
lm = generate_person(lm)
```

### 6. å¹³è¡¡çº¦æŸåŠ›åº¦

```python
# âœ… å¥½ï¼šåˆç†çš„çº¦æŸ
lm += gen("name", regex=r"[A-Za-z ]+", max_tokens=30)

# âŒ è¿‡äºŽä¸¥æ ¼ï¼šå¯èƒ½å¤±è´¥æˆ–éžå¸¸ç¼“æ…¢
lm += gen("name", regex=r"^(John|Jane)$", max_tokens=10)
```

## ä¸Žæ›¿ä»£æ–¹æ¡ˆçš„å¯¹æ¯”

| ç‰¹æ€§ | Guidance | Instructor | Outlines | LMQL |
|---------|----------|------------|----------|------|
| æ­£åˆ™è¡¨è¾¾å¼çº¦æŸ | âœ… æ”¯æŒ | âŒ ä¸æ”¯æŒ | âœ… æ”¯æŒ | âœ… æ”¯æŒ |
| è¯­æ³•æ”¯æŒ | âœ… CFG | âŒ ä¸æ”¯æŒ | âœ… CFG | âœ… CFG |
| Pydantic éªŒè¯ | âŒ ä¸æ”¯æŒ | âœ… æ”¯æŒ | âœ… æ”¯æŒ | âŒ ä¸æ”¯æŒ |
| Token ä¿®å¤ | âœ… æ”¯æŒ | âŒ ä¸æ”¯æŒ | âœ… æ”¯æŒ | âŒ ä¸æ”¯æŒ |
| æœ¬åœ°æ¨¡åž‹ | âœ… æ”¯æŒ | âš ï¸ æœ‰é™ | âœ… æ”¯æŒ | âœ… æ”¯æŒ |
| API æ¨¡åž‹ | âœ… æ”¯æŒ | âœ… æ”¯æŒ | âš ï¸ æœ‰é™ | âœ… æ”¯æŒ |
| Python é£Žæ ¼è¯­æ³• | âœ… æ”¯æŒ | âœ… æ”¯æŒ | âœ… æ”¯æŒ | âŒ ç±» SQL |
| å­¦ä¹ æ›²çº¿ | ä½Ž | ä½Ž | ä¸­ | é«˜ |

**ä½•æ—¶é€‰æ‹© Guidanceï¼š**
- éœ€è¦æ­£åˆ™è¡¨è¾¾å¼/è¯­æ³•çº¦æŸ
- éœ€è¦ token ä¿®å¤
- æž„å»ºå¸¦æŽ§åˆ¶æµçš„å¤æ‚å·¥ä½œæµ
- ä½¿ç”¨æœ¬åœ°æ¨¡åž‹ï¼ˆTransformersã€llama.cppï¼‰
- åå¥½ Python é£Žæ ¼è¯­æ³•

**ä½•æ—¶é€‰æ‹©æ›¿ä»£æ–¹æ¡ˆï¼š**
- Instructorï¼šéœ€è¦å¸¦è‡ªåŠ¨é‡è¯•çš„ Pydantic éªŒè¯
- Outlinesï¼šéœ€è¦ JSON schema éªŒè¯
- LMQLï¼šåå¥½å£°æ˜Žå¼æŸ¥è¯¢è¯­æ³•

## æ€§èƒ½ç‰¹æ€§

**å»¶è¿Ÿé™ä½Žï¼š**
- å¯¹äºŽçº¦æŸè¾“å‡ºï¼Œæ¯”ä¼ ç»Ÿ prompting å¿« 30â€“50%
- Token ä¿®å¤å‡å°‘ä¸å¿…è¦çš„é‡æ–°ç”Ÿæˆ
- è¯­æ³•çº¦æŸé˜²æ­¢æ— æ•ˆ token çš„ç”Ÿæˆ

**å†…å­˜å ç”¨ï¼š**
- ç›¸æ¯”æ— çº¦æŸç”Ÿæˆï¼Œé¢å¤–å¼€é”€æžå°
- è¯­æ³•ç¼–è¯‘ç»“æžœåœ¨é¦–æ¬¡ä½¿ç”¨åŽç¼“å­˜
- æŽ¨ç†æ—¶é«˜æ•ˆè¿‡æ»¤ token

**Token æ•ˆçŽ‡ï¼š**
- é˜²æ­¢åœ¨æ— æ•ˆè¾“å‡ºä¸Šæµªè´¹ token
- æ— éœ€é‡è¯•å¾ªçŽ¯
- ç›´æŽ¥ç”Ÿæˆæœ‰æ•ˆè¾“å‡º

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://guidance.readthedocs.io
- **GitHub**ï¼šhttps://github.com/guidance-ai/guidanceï¼ˆ18k+ starsï¼‰
- **Notebooks**ï¼šhttps://github.com/guidance-ai/guidance/tree/main/notebooks
- **Discord**ï¼šæä¾›ç¤¾åŒºæ”¯æŒ

## å¦è¯·å‚é˜…

- `references/constraints.md` â€” å…¨é¢çš„æ­£åˆ™è¡¨è¾¾å¼å’Œè¯­æ³•æ¨¡å¼
- `references/backends.md` â€” åŽç«¯ä¸“é¡¹é…ç½®
- `references/examples.md` â€” ç”Ÿäº§å°±ç»ªç¤ºä¾‹