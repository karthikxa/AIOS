---
sidebar_position: 5
title: "å°† Zed ä½œä¸º Python åº“ä½¿ç”¨"
description: "å°† AIAgent åµŒå…¥ä½ è‡ªå·±çš„ Python è„šæœ¬ã€Web åº”ç”¨æˆ–è‡ªåŠ¨åŒ–æµæ°´çº¿â€”â€”æ— éœ€ CLI"
---

# å°† Zed ä½œä¸º Python åº“ä½¿ç”¨

Zed ä¸ä»…ä»…æ˜¯ä¸€ä¸ª CLI å·¥å…·ã€‚ä½ å¯ä»¥ç›´æŽ¥å¯¼å…¥ `AIAgent`ï¼Œåœ¨è‡ªå·±çš„ Python è„šæœ¬ã€Web åº”ç”¨æˆ–è‡ªåŠ¨åŒ–æµæ°´çº¿ä¸­ä»¥ç¼–ç¨‹æ–¹å¼ä½¿ç”¨å®ƒã€‚æœ¬æŒ‡å—å°†ä»‹ç»å…·ä½“æ–¹æ³•ã€‚

---

## å®‰è£…

ç›´æŽ¥ä»Žä»“åº“å®‰è£… Zedï¼š

```bash
pip install git+https://github.com/zedteam/zed-agent.git
```

æˆ–ä½¿ç”¨ [uv](https://docs.astral.sh/uv/)ï¼š

```bash
uv pip install git+https://github.com/zedteam/zed-agent.git
```

ä¹Ÿå¯ä»¥åœ¨ `requirements.txt` ä¸­å›ºå®šç‰ˆæœ¬ï¼š

```text
zed-agent @ git+https://github.com/zedteam/zed-agent.git
```

:::tip
å°† Zed ä½œä¸ºåº“ä½¿ç”¨æ—¶ï¼ŒCLI æ‰€éœ€çš„çŽ¯å¢ƒå˜é‡åŒæ ·å¿…é¡»è®¾ç½®ã€‚è‡³å°‘éœ€è¦è®¾ç½® `OPENROUTER_API_KEY`ï¼ˆè‹¥ç›´æŽ¥è®¿é—®æä¾›å•†ï¼Œåˆ™è®¾ç½® `OPENAI_API_KEY` æˆ– `ANTHROPIC_API_KEY`ï¼‰ã€‚
:::

---

## åŸºæœ¬ç”¨æ³•

ä½¿ç”¨ Zed æœ€ç®€å•çš„æ–¹å¼æ˜¯ `chat()` æ–¹æ³•â€”â€”ä¼ å…¥ä¸€æ¡æ¶ˆæ¯ï¼Œè¿”å›žä¸€ä¸ªå­—ç¬¦ä¸²ï¼š

```python
from run_agent import AIAgent

agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    quiet_mode=True,
)
response = agent.chat("What is the capital of France?")
print(response)
```

`chat()` åœ¨å†…éƒ¨å¤„ç†å®Œæ•´çš„å¯¹è¯å¾ªçŽ¯â€”â€”å·¥å…·è°ƒç”¨ã€é‡è¯•ç­‰ä¸€åˆ‡äº‹åŠ¡â€”â€”å¹¶ä»…è¿”å›žæœ€ç»ˆçš„æ–‡æœ¬å“åº”ã€‚

:::warning
å°† Zed åµŒå…¥è‡ªå·±çš„ä»£ç æ—¶ï¼ŒåŠ¡å¿…è®¾ç½® `quiet_mode=True`ã€‚å¦åˆ™ï¼Œagent ä¼šæ‰“å° CLI çš„åŠ è½½åŠ¨ç”»ã€è¿›åº¦æŒ‡ç¤ºå™¨åŠå…¶ä»–ç»ˆç«¯è¾“å‡ºï¼Œä»Žè€Œå¹²æ‰°ä½ çš„åº”ç”¨è¾“å‡ºã€‚
:::

---

## å®Œæ•´å¯¹è¯æŽ§åˆ¶

å¦‚éœ€å¯¹å¯¹è¯è¿›è¡Œæ›´ç²¾ç»†çš„æŽ§åˆ¶ï¼Œå¯ç›´æŽ¥ä½¿ç”¨ `run_conversation()`ã€‚å®ƒè¿”å›žä¸€ä¸ªåŒ…å«å®Œæ•´å“åº”ã€æ¶ˆæ¯åŽ†å²å’Œå…ƒæ•°æ®çš„å­—å…¸ï¼š

```python
agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    quiet_mode=True,
)

result = agent.run_conversation(
    user_message="Search for recent Python 3.13 features",
    task_id="my-task-1",
)

print(result["final_response"])
print(f"Messages exchanged: {len(result['messages'])}")
```

è¿”å›žçš„å­—å…¸åŒ…å«ï¼š
- **`final_response`** â€” agent çš„æœ€ç»ˆæ–‡æœ¬å›žå¤
- **`messages`** â€” å®Œæ•´çš„æ¶ˆæ¯åŽ†å²ï¼ˆç³»ç»Ÿæ¶ˆæ¯ã€ç”¨æˆ·æ¶ˆæ¯ã€åŠ©æ‰‹æ¶ˆæ¯ã€å·¥å…·è°ƒç”¨ï¼‰

ï¼ˆä¼ å…¥çš„ `task_id` å­˜å‚¨åœ¨ agent å®žä¾‹ä¸Šç”¨äºŽ VM éš”ç¦»ï¼Œä¸ä¼šåœ¨è¿”å›žå­—å…¸ä¸­å›žæ˜¾ã€‚ï¼‰

ä½ ä¹Ÿå¯ä»¥ä¼ å…¥è‡ªå®šä¹‰ç³»ç»Ÿæ¶ˆæ¯ï¼Œè¦†ç›–è¯¥æ¬¡è°ƒç”¨çš„ä¸´æ—¶ç³»ç»Ÿ promptï¼ˆæç¤ºè¯ï¼‰ï¼š

```python
result = agent.run_conversation(
    user_message="Explain quicksort",
    system_message="You are a computer science tutor. Use simple analogies.",
)
```

---

## é…ç½®å·¥å…·é›†

ä½¿ç”¨ `enabled_toolsets` æˆ– `disabled_toolsets` æŽ§åˆ¶ agent å¯è®¿é—®çš„å·¥å…·é›†ï¼š

```python
# ä»…å¯ç”¨ Web å·¥å…·ï¼ˆæµè§ˆã€æœç´¢ï¼‰
agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    enabled_toolsets=["web"],
    quiet_mode=True,
)

# å¯ç”¨é™¤ç»ˆç«¯è®¿é—®å¤–çš„æ‰€æœ‰åŠŸèƒ½
agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    disabled_toolsets=["terminal"],
    quiet_mode=True,
)
```

:::tip
å½“ä½ éœ€è¦ä¸€ä¸ªåŠŸèƒ½æœ€å°åŒ–ã€å—é™çš„ agent æ—¶ï¼ˆä¾‹å¦‚ï¼Œä»…ç”¨äºŽç ”ç©¶æœºå™¨äººçš„ Web æœç´¢ï¼‰ï¼Œä½¿ç”¨ `enabled_toolsets`ã€‚å½“ä½ éœ€è¦å¤§éƒ¨åˆ†åŠŸèƒ½ä½†éœ€é™åˆ¶ç‰¹å®šèƒ½åŠ›æ—¶ï¼ˆä¾‹å¦‚ï¼Œåœ¨å…±äº«çŽ¯å¢ƒä¸­ç¦ç”¨ç»ˆç«¯è®¿é—®ï¼‰ï¼Œä½¿ç”¨ `disabled_toolsets`ã€‚
:::

---

## å¤šè½®å¯¹è¯

é€šè¿‡å°†æ¶ˆæ¯åŽ†å²ä¼ å›žæ¥ç»´æŠ¤å¤šè½®å¯¹è¯çš„çŠ¶æ€ï¼š

```python
agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    quiet_mode=True,
)

# ç¬¬ä¸€è½®
result1 = agent.run_conversation("My name is Alice")
history = result1["messages"]

# ç¬¬äºŒè½®â€”â€”agent è®°ä½äº†ä¸Šä¸‹æ–‡
result2 = agent.run_conversation(
    "What's my name?",
    conversation_history=history,
)
print(result2["final_response"])  # "Your name is Alice."
```

`conversation_history` å‚æ•°æŽ¥å—ä¸Šä¸€æ¬¡ç»“æžœçš„ `messages` åˆ—è¡¨ã€‚agent ä¼šåœ¨å†…éƒ¨å¤åˆ¶è¯¥åˆ—è¡¨ï¼Œå› æ­¤ä½ çš„åŽŸå§‹åˆ—è¡¨ä¸ä¼šè¢«ä¿®æ”¹ã€‚

---

## ä¿å­˜è½¨è¿¹æ•°æ®

å¯ç”¨è½¨è¿¹ä¿å­˜ï¼Œä»¥ ShareGPT æ ¼å¼æ•èŽ·å¯¹è¯â€”â€”é€‚ç”¨äºŽç”Ÿæˆè®­ç»ƒæ•°æ®æˆ–è°ƒè¯•ï¼š

```python
agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    save_trajectories=True,
    quiet_mode=True,
)

agent.chat("Write a Python function to sort a list")
# ä»¥ ShareGPT æ ¼å¼ä¿å­˜åˆ° trajectory_samples.jsonl
```

æ¯æ¬¡å¯¹è¯ä»¥å•è¡Œ JSONL çš„å½¢å¼è¿½åŠ å†™å…¥ï¼Œä¾¿äºŽä»Žè‡ªåŠ¨åŒ–è¿è¡Œä¸­æ”¶é›†æ•°æ®é›†ã€‚

---

## è‡ªå®šä¹‰ç³»ç»Ÿ Prompt

ä½¿ç”¨ `ephemeral_system_prompt` è®¾ç½®è‡ªå®šä¹‰ç³»ç»Ÿ promptï¼Œç”¨äºŽå¼•å¯¼ agent çš„è¡Œä¸ºï¼Œä½†**ä¸ä¼š**ä¿å­˜åˆ°è½¨è¿¹æ–‡ä»¶ä¸­ï¼ˆä¿æŒè®­ç»ƒæ•°æ®çš„æ•´æ´ï¼‰ï¼š

```python
agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    ephemeral_system_prompt="You are a SQL expert. Only answer database questions.",
    quiet_mode=True,
)

response = agent.chat("How do I write a JOIN query?")
print(response)
```

è¿™éžå¸¸é€‚åˆæž„å»ºä¸“ç”¨ agentâ€”â€”ä»£ç å®¡æŸ¥å‘˜ã€æ–‡æ¡£æ’°å†™å‘˜ã€SQL åŠ©æ‰‹â€”â€”å…¨éƒ¨ä½¿ç”¨ç›¸åŒçš„åº•å±‚å·¥å…·ã€‚

---

## æ‰¹é‡å¤„ç†

å¦‚éœ€å¹¶è¡Œè¿è¡Œå¤§é‡ promptï¼ŒZed æä¾›äº† `batch_runner.py`ï¼Œå®ƒå¯ç®¡ç†å¹¶å‘çš„ `AIAgent` å®žä¾‹å¹¶è¿›è¡Œé€‚å½“çš„èµ„æºéš”ç¦»ï¼š

```bash
python batch_runner.py --input prompts.jsonl --output results.jsonl
```

æ¯ä¸ª prompt éƒ½æœ‰è‡ªå·±çš„ `task_id` å’Œéš”ç¦»çŽ¯å¢ƒã€‚å¦‚æžœéœ€è¦è‡ªå®šä¹‰æ‰¹å¤„ç†é€»è¾‘ï¼Œå¯ä»¥ç›´æŽ¥ä½¿ç”¨ `AIAgent` æž„å»ºï¼š

```python
import concurrent.futures
from run_agent import AIAgent

prompts = [
    "Explain recursion",
    "What is a hash table?",
    "How does garbage collection work?",
]

def process_prompt(prompt):
    # æ¯ä¸ªä»»åŠ¡åˆ›å»ºä¸€ä¸ªæ–°çš„ agent å®žä¾‹ä»¥ä¿è¯çº¿ç¨‹å®‰å…¨
    agent = AIAgent(
        model="anthropic/claude-sonnet-4",
        quiet_mode=True,
        skip_memory=True,
    )
    return agent.chat(prompt)

with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(process_prompt, prompts))

for prompt, result in zip(prompts, results):
    print(f"Q: {prompt}\nA: {result}\n")
```

:::warning
åŠ¡å¿…ä¸º**æ¯ä¸ªçº¿ç¨‹æˆ–ä»»åŠ¡åˆ›å»ºä¸€ä¸ªæ–°çš„ `AIAgent` å®žä¾‹**ã€‚agent ç»´æŠ¤ç€å†…éƒ¨çŠ¶æ€ï¼ˆå¯¹è¯åŽ†å²ã€å·¥å…·ä¼šè¯ã€è¿­ä»£è®¡æ•°å™¨ï¼‰ï¼Œè¿™äº›çŠ¶æ€ä¸æ˜¯çº¿ç¨‹å®‰å…¨çš„ï¼Œä¸èƒ½å…±äº«ã€‚
:::

---

## é›†æˆç¤ºä¾‹

### FastAPI ç«¯ç‚¹

```python
from fastapi import FastAPI
from pydantic import BaseModel
from run_agent import AIAgent

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    model: str = "anthropic/claude-sonnet-4"

@app.post("/chat")
async def chat(request: ChatRequest):
    agent = AIAgent(
        model=request.model,
        quiet_mode=True,
        skip_context_files=True,
        skip_memory=True,
    )
    response = agent.chat(request.message)
    return {"response": response}
```

### Discord æœºå™¨äºº

```python
import discord
from run_agent import AIAgent

client = discord.Client(intents=discord.Intents.default())

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    if message.content.startswith("!zed "):
        query = message.content[8:]
        agent = AIAgent(
            model="anthropic/claude-sonnet-4",
            quiet_mode=True,
            skip_context_files=True,
            skip_memory=True,
            platform="discord",
        )
        response = agent.chat(query)
        await message.channel.send(response[:2000])

client.run("YOUR_DISCORD_TOKEN")
```

### CI/CD æµæ°´çº¿æ­¥éª¤

```python
#!/usr/bin/env python3
"""CI step: auto-review a PR diff."""
import subprocess
from run_agent import AIAgent

diff = subprocess.check_output(["git", "diff", "main...HEAD"]).decode()

agent = AIAgent(
    model="anthropic/claude-sonnet-4",
    quiet_mode=True,
    skip_context_files=True,
    skip_memory=True,
    disabled_toolsets=["terminal", "browser"],
)

review = agent.chat(
    f"Review this PR diff for bugs, security issues, and style problems:\n\n{diff}"
)
print(review)
```

---

## å…³é”®æž„é€ å‡½æ•°å‚æ•°

| å‚æ•° | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|-----------|------|---------|-------------|
| `model` | `str` | `"anthropic/claude-opus-4.6"` | OpenRouter æ ¼å¼çš„æ¨¡åž‹åç§° |
| `quiet_mode` | `bool` | `False` | æŠ‘åˆ¶ CLI è¾“å‡º |
| `enabled_toolsets` | `List[str]` | `None` | ç™½åå•æŒ‡å®šå·¥å…·é›† |
| `disabled_toolsets` | `List[str]` | `None` | é»‘åå•æŒ‡å®šå·¥å…·é›† |
| `save_trajectories` | `bool` | `False` | å°†å¯¹è¯ä¿å­˜ä¸º JSONL |
| `ephemeral_system_prompt` | `str` | `None` | è‡ªå®šä¹‰ç³»ç»Ÿ promptï¼ˆä¸ä¿å­˜åˆ°è½¨è¿¹æ–‡ä»¶ï¼‰ |
| `max_iterations` | `int` | `90` | æ¯æ¬¡å¯¹è¯çš„æœ€å¤§å·¥å…·è°ƒç”¨è¿­ä»£æ¬¡æ•° |
| `skip_context_files` | `bool` | `False` | è·³è¿‡åŠ è½½ AGENTS.md æ–‡ä»¶ |
| `skip_memory` | `bool` | `False` | ç¦ç”¨æŒä¹…åŒ–å†…å­˜çš„è¯»å†™ |
| `api_key` | `str` | `None` | API å¯†é’¥ï¼ˆå›žé€€åˆ°çŽ¯å¢ƒå˜é‡ï¼‰ |
| `base_url` | `str` | `None` | è‡ªå®šä¹‰ API ç«¯ç‚¹ URL |
| `platform` | `str` | `None` | å¹³å°æç¤ºï¼ˆ`"discord"`ã€`"telegram"` ç­‰ï¼‰ |

---

## é‡è¦è¯´æ˜Ž

:::tip
- å¦‚æžœä¸å¸Œæœ›å°†å·¥ä½œç›®å½•ä¸­çš„ `AGENTS.md` æ–‡ä»¶åŠ è½½åˆ°ç³»ç»Ÿ prompt ä¸­ï¼Œè¯·è®¾ç½® **`skip_context_files=True`**ã€‚
- è®¾ç½® **`skip_memory=True`** å¯é˜»æ­¢ agent è¯»å†™æŒä¹…åŒ–å†…å­˜â€”â€”æŽ¨èç”¨äºŽæ— çŠ¶æ€ API ç«¯ç‚¹ã€‚
- `platform` å‚æ•°ï¼ˆå¦‚ `"discord"`ã€`"telegram"`ï¼‰ä¼šæ³¨å…¥å¹³å°ç‰¹å®šçš„æ ¼å¼åŒ–æç¤ºï¼Œä½¿ agent é€‚é…å…¶è¾“å‡ºé£Žæ ¼ã€‚
:::

:::warning
- **çº¿ç¨‹å®‰å…¨**ï¼šæ¯ä¸ªçº¿ç¨‹æˆ–ä»»åŠ¡åˆ›å»ºä¸€ä¸ª `AIAgent` å®žä¾‹ã€‚åˆ‡å‹¿åœ¨å¹¶å‘è°ƒç”¨ä¸­å…±äº«åŒä¸€å®žä¾‹ã€‚
- **èµ„æºæ¸…ç†**ï¼šagent åœ¨å¯¹è¯ç»“æŸæ—¶ä¼šè‡ªåŠ¨æ¸…ç†èµ„æºï¼ˆç»ˆç«¯ä¼šè¯ã€æµè§ˆå™¨å®žä¾‹ï¼‰ã€‚è‹¥åœ¨é•¿æœŸè¿è¡Œçš„è¿›ç¨‹ä¸­ä½¿ç”¨ï¼Œè¯·ç¡®ä¿æ¯æ¬¡å¯¹è¯æ­£å¸¸ç»“æŸã€‚
- **è¿­ä»£é™åˆ¶**ï¼šé»˜è®¤çš„ `max_iterations=90` è¾ƒä¸ºå®½æ¾ã€‚å¯¹äºŽç®€å•çš„é—®ç­”åœºæ™¯ï¼Œå»ºè®®é€‚å½“é™ä½Žè¯¥å€¼ï¼ˆå¦‚ `max_iterations=10`ï¼‰ï¼Œä»¥é˜²æ­¢å·¥å…·è°ƒç”¨å¾ªçŽ¯å¤±æŽ§å¹¶æŽ§åˆ¶æˆæœ¬ã€‚
:::
