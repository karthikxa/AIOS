---
sidebar_position: 11
title: "Plugin LLM è®¿é—®"
description: "é€šè¿‡ ctx.llm åœ¨ plugin å†…éƒ¨è¿è¡Œä»»æ„ LLM è°ƒç”¨â€”â€”æ”¯æŒå¯¹è¯æˆ–ç»“æž„åŒ–è¾“å‡ºã€åŒæ­¥æˆ–å¼‚æ­¥ã€‚å®¿ä¸»æŒæœ‰è®¤è¯å‡­æ®ï¼Œå¤±è´¥å…³é—­ä¿¡ä»»é—¨æŽ§ï¼Œå¯é€‰ JSON Schema éªŒè¯ã€‚"
---

# Plugin LLM è®¿é—®

`ctx.llm` æ˜¯ plugin å‘èµ· LLM è°ƒç”¨çš„å®˜æ–¹æ–¹å¼ã€‚
å¯¹è¯è¡¥å…¨ã€ç»“æž„åŒ–æå–ã€åŒæ­¥ã€å¼‚æ­¥ã€å¸¦æˆ–ä¸å¸¦å›¾åƒâ€”â€”
åŒä¸€æŽ¥å£ï¼ŒåŒä¸€ä¿¡ä»»é—¨æŽ§ï¼ŒåŒä¸€å®¿ä¸»æŒæœ‰çš„å‡­æ®ã€‚

Plugin åœ¨éœ€è¦æ¶‰åŠæ¨¡åž‹ä½†åˆä¸å±žäºŽ agent å¯¹è¯çš„åœºæ™¯æ—¶ä½¿ç”¨å®ƒã€‚
ä¾‹å¦‚ï¼šå°†å·¥å…·æŠ¥é”™æ”¹å†™æˆéžå·¥ç¨‹å¸ˆä¹Ÿèƒ½ç†è§£çš„è¯­è¨€çš„ hookï¼›
åœ¨æ¶ˆæ¯å…¥é˜Ÿå‰è¿›è¡Œç¿»è¯‘çš„ gateway é€‚é…å™¨ï¼›
å¯¹é•¿æ®µç²˜è´´å†…å®¹è¿›è¡Œæ‘˜è¦çš„æ–œæ å‘½ä»¤ï¼›
å¯¹å‰ä¸€å¤©æ´»åŠ¨è¯„åˆ†å¹¶å‘çŠ¶æ€çœ‹æ¿å†™ä¸€è¡Œè®°å½•çš„å®šæ—¶ä»»åŠ¡ï¼›
ä»¥åŠå†³å®šæŸæ¡æ¶ˆæ¯æ˜¯å¦å€¼å¾—å”¤é†’ agent çš„é¢„è¿‡æ»¤å™¨ã€‚

è¿™äº›ä»»åŠ¡ä¸åº”è®© agent ä»‹å…¥ã€‚å®ƒä»¬åªéœ€è¦ä¸€æ¬¡ LLM è°ƒç”¨ã€ä¸€ä¸ªæœ‰ç±»åž‹çš„ç­”æ¡ˆï¼Œç„¶åŽç»“æŸã€‚

## æœ€ç®€è°ƒç”¨

```python
result = ctx.llm.complete(messages=[{"role": "user", "content": "ping"}])
return result.text
```

è¿™å°±æ˜¯æ•´ä¸ª API çš„ä¸€è¡Œç¤ºä¾‹ã€‚æ— éœ€å¯†é’¥ã€æ— éœ€ provider é…ç½®ã€æ— éœ€ SDK åˆå§‹åŒ–ã€‚Plugin è¿è¡Œåœ¨ç”¨æˆ·å½“å‰ä½¿ç”¨çš„ä»»æ„ provider å’Œæ¨¡åž‹ä¸Šâ€”â€”ç”¨æˆ·åˆ‡æ¢ provider æ—¶ï¼Œplugin è‡ªåŠ¨è·Ÿéšã€‚

## æ›´å®Œæ•´çš„å¯¹è¯ç¤ºä¾‹

```python
result = ctx.llm.complete(
    messages=[
        {"role": "system", "content": "Rewrite errors as one short sentence a non-engineer can act on."},
        {"role": "user",   "content": traceback_text},
    ],
    max_tokens=64,
    purpose="hooks.error-rewrite",
)
return result.text
```

`purpose` æ˜¯ä¸€ä¸ªè‡ªç”±æ ¼å¼çš„å®¡è®¡å­—ç¬¦ä¸²â€”â€”å®ƒä¼šå‡ºçŽ°åœ¨ `agent.log` å’Œ `result.audit` ä¸­ï¼Œæ–¹ä¾¿è¿è¥äººå‘˜æŸ¥çœ‹å“ªä¸ª plugin å‘èµ·äº†å“ªæ¬¡è°ƒç”¨ã€‚å¯é€‰ï¼Œä½†å¯¹äºŽé¢‘ç¹è§¦å‘çš„åœºæ™¯å»ºè®®å¡«å†™ã€‚

## ç»“æž„åŒ–è¾“å‡º

å½“ plugin éœ€è¦æœ‰ç±»åž‹çš„ç­”æ¡ˆæ—¶ï¼Œåˆ‡æ¢åˆ°ç»“æž„åŒ–æ¨¡å¼ï¼š

```python
result = ctx.llm.complete_structured(
    instructions="Score this support reply for urgency (0â€“1) and pick a category.",
    input=[{"type": "text", "text": message_body}],
    json_schema=TRIAGE_SCHEMA,
    purpose="support.triage",
    temperature=0.0,
    max_tokens=128,
)

if result.parsed["urgency"] > 0.8:
    await dispatch_to_oncall(result.parsed["category"], message_body)
```

å®¿ä¸»å‘ provider è¯·æ±‚ JSON è¾“å‡ºï¼Œåœ¨æœ¬åœ°ä½œä¸ºå…œåº•è¿›è¡Œè§£æžï¼Œè‹¥å®‰è£…äº† `jsonschema` åˆ™å¯¹ä½ çš„ schema è¿›è¡ŒéªŒè¯ï¼Œæœ€ç»ˆåœ¨ `result.parsed` ä¸Šè¿”å›žä¸€ä¸ª Python å¯¹è±¡ã€‚å¦‚æžœæ¨¡åž‹æ— æ³•ç”Ÿæˆæœ‰æ•ˆ JSONï¼Œ`result.parsed` ä¸º `None`ï¼Œ`result.text` æºå¸¦åŽŸå§‹å“åº”ã€‚

## æ­¤æ¨¡å¼çš„ä¼˜åŠ¿

* **ä¸€æ¬¡è°ƒç”¨ï¼Œå››ç§å½¢æ€ã€‚** `complete()` ç”¨äºŽå¯¹è¯ï¼Œ`complete_structured()` ç”¨äºŽæœ‰ç±»åž‹çš„ JSONï¼Œ`acomplete()` å’Œ `acomplete_structured()` ç”¨äºŽ asyncioã€‚å‚æ•°ç›¸åŒï¼Œç»“æžœå¯¹è±¡ç›¸åŒã€‚
* **å®¿ä¸»æŒæœ‰å‡­æ®ã€‚** OAuth tokenã€åˆ·æ–°æµç¨‹ã€å‡­æ®æ± ã€æ¯ä»»åŠ¡è¾…åŠ©è¦†ç›–â€”â€”Zed å·²æœ‰çš„æ‰€æœ‰å‡­æ®æ¦‚å¿µå‡é€‚ç”¨ã€‚Plugin æ°¸è¿œçœ‹ä¸åˆ° tokenï¼›å®¿ä¸»é€šè¿‡ `result.audit` å°†è°ƒç”¨å½’å› å›žæº¯ã€‚
* **æœ‰ç•Œã€‚** å•æ¬¡åŒæ­¥æˆ–å¼‚æ­¥è°ƒç”¨ã€‚æ— æµå¼è¾“å‡ºï¼Œæ— å·¥å…·å¾ªçŽ¯ï¼Œæ— éœ€ç®¡ç†å¯¹è¯çŠ¶æ€ã€‚ç»™å®šè¾“å…¥ï¼ŒèŽ·å–ç»“æžœï¼Œè¿”å›žã€‚
* **å¤±è´¥å…³é—­ä¿¡ä»»ã€‚** ä»Žæœªé…ç½®è¿‡çš„ plugin æ— æ³•è‡ªè¡Œé€‰æ‹© providerã€æ¨¡åž‹ã€agent æˆ–å­˜å‚¨çš„å‡­æ®ã€‚é»˜è®¤è¡Œä¸ºæ˜¯"ä½¿ç”¨ç”¨æˆ·æ­£åœ¨ä½¿ç”¨çš„"ã€‚è¿è¥äººå‘˜åœ¨ `config.yaml` ä¸­æŒ‰ plugin é€ä¸€é€‰æ‹©å¼€å¯ç‰¹å®šè¦†ç›–ã€‚

## å¿«é€Ÿå¼€å§‹

ä»¥ä¸‹æ˜¯ä¸¤ä¸ªå®Œæ•´çš„ plugin ç¤ºä¾‹â€”â€”ä¸€ä¸ªå¯¹è¯ï¼Œä¸€ä¸ªç»“æž„åŒ–ã€‚ä¸¤è€…å‡åœ¨å•ä¸ª `register(ctx)` å‡½æ•°ä¸­å®žçŽ°ï¼Œæ— éœ€ä»»ä½•å¤–éƒ¨é…ç½®å³å¯é’ˆå¯¹ç”¨æˆ·å½“å‰æ¿€æ´»çš„æ¨¡åž‹è¿è¡Œã€‚

### å¯¹è¯è¡¥å…¨â€”â€”`/tldr`

```python
def register(ctx):
    ctx.register_command(
        name="tldr",
        handler=lambda raw: _tldr(ctx, raw),
        description="Summarise the supplied text in one paragraph.",
        args_hint="<text>",
    )


def _tldr(ctx, raw_args: str) -> str:
    text = raw_args.strip()
    if not text:
        return "Usage: /tldr <text to summarise>"
    result = ctx.llm.complete(
        messages=[
            {"role": "system",
             "content": "Summarise the user's text in one tight paragraph. No preamble."},
            {"role": "user", "content": text},
        ],
        max_tokens=256,
        temperature=0.3,
        purpose="tldr",
    )
    return result.text
```

`result.text` æ˜¯æ¨¡åž‹çš„å“åº”ï¼›`result.usage` æºå¸¦ token è®¡æ•°ï¼›`result.provider` å’Œ `result.model` æºå¸¦å½’å› ä¿¡æ¯ã€‚

### ç»“æž„åŒ–æå–â€”â€”`/paste-to-tasks`

```python
def register(ctx):
    ctx.register_command(
        name="paste-to-tasks",
        handler=lambda raw: _paste_to_tasks(ctx, raw),
        description="Turn freeform meeting notes into structured tasks.",
        args_hint="<text>",
    )


_TASKS_SCHEMA = {
    "type": "object",
    "properties": {
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "owner":  {"type": "string"},
                    "action": {"type": "string"},
                    "due":    {"type": "string", "description": "ISO date or empty"},
                },
                "required": ["action"],
            },
        },
    },
    "required": ["tasks"],
}


def _paste_to_tasks(ctx, raw_args: str) -> str:
    if not raw_args.strip():
        return "Usage: /paste-to-tasks <meeting notes>"
    result = ctx.llm.complete_structured(
        instructions=(
            "Extract concrete action items from these meeting notes. "
            "One task per actionable line. If no owner is named, leave 'owner' blank."
        ),
        input=[{"type": "text", "text": raw_args}],
        json_schema=_TASKS_SCHEMA,
        schema_name="meeting.tasks",
        purpose="paste-to-tasks",
        temperature=0.0,
        max_tokens=512,
    )
    if result.parsed is None:
        return f"Couldn't parse a response. Raw output:\n{result.text}"
    lines = [f"- [{t.get('owner') or '?'}] {t['action']}" for t in result.parsed["tasks"]]
    return "\n".join(lines) or "(no tasks found)"
```

ç¬¬ä¸‰ä¸ªå®Œæ•´ç¤ºä¾‹ï¼ˆåŒ…å«å›¾åƒè¾“å…¥ï¼‰ä½äºŽ
[`zed-example-plugins`](https://github.com/NousResearch/zed-example-plugins/tree/main/plugin-llm-example)
ä»“åº“ï¼ˆå‚è€ƒ plugin çš„é…å¥—ä»“åº“â€”â€”ä¸éš zed-agent æœ¬ä½“æ‰“åŒ…ï¼‰ã€‚å…³äºŽå¼‚æ­¥æŽ¥å£ï¼ˆ`acomplete()` / `acomplete_structured()` ä¸Ž `asyncio.gather()` é…åˆä½¿ç”¨ï¼‰ï¼Œè¯·å‚è§åŒä¸€ä»“åº“ä¸­çš„
[`plugin-llm-async-example`](https://github.com/NousResearch/zed-example-plugins/tree/main/plugin-llm-async-example)ã€‚

## ä½•æ—¶ä½¿ç”¨å“ªç§æ–¹å¼

| ä½ éœ€è¦â€¦â€¦ | ä½¿ç”¨ |
|---|---|
| è‡ªç”±æ ¼å¼æ–‡æœ¬å“åº”ï¼ˆç¿»è¯‘ã€æ‘˜è¦ã€æ”¹å†™ã€ç”Ÿæˆï¼‰ | `complete()` |
| å¤šè½® promptï¼ˆsystem + few-shot ç¤ºä¾‹ + userï¼‰ | `complete()` |
| ç» schema éªŒè¯çš„æœ‰ç±»åž‹ dict | `complete_structured()` |
| å›¾åƒæˆ–æ–‡æœ¬è¾“å…¥å¹¶è¿”å›žæœ‰ç±»åž‹ dict | `complete_structured()` |
| åœ¨å¼‚æ­¥ä»£ç ä¸­å‘èµ·ç›¸åŒè°ƒç”¨ï¼ˆgateway é€‚é…å™¨ã€å¼‚æ­¥ hookï¼‰ | `acomplete()` / `acomplete_structured()` |

å…¶ä»–æ‰€æœ‰å†…å®¹â€”â€”provider é€‰æ‹©ã€æ¨¡åž‹è§£æžã€è®¤è¯ã€å›žé€€ã€è¶…æ—¶ã€è§†è§‰è·¯ç”±â€”â€”åœ¨å››ç§å½¢æ€ä¸­å®Œå…¨ä¸€è‡´ã€‚

## API æŽ¥å£

`ctx.llm` æ˜¯ `agent.plugin_llm.PluginLlm` çš„å®žä¾‹ã€‚

### `complete()`

```python
result = ctx.llm.complete(
    messages=[{"role": "user", "content": "Hi"}],
    provider=None,         # å¯é€‰ï¼Œå—é—¨æŽ§â€”â€”Zed provider idï¼ˆå¦‚ "openrouter"ï¼‰
    model=None,            # å¯é€‰ï¼Œå—é—¨æŽ§â€”â€”è¯¥ provider æœŸæœ›çš„ä»»æ„å­—ç¬¦ä¸²
    temperature=None,
    max_tokens=None,
    timeout=None,          # ç§’
    agent_id=None,         # å¯é€‰ï¼Œå—é—¨æŽ§
    profile=None,          # å¯é€‰ï¼Œå—é—¨æŽ§â€”â€”æ˜¾å¼æŒ‡å®šè®¤è¯ profile åç§°
    purpose="optional-audit-string",
)
# â†’ PluginLlmCompleteResult(text, provider, model, agent_id, usage, audit)
```

æ™®é€šå¯¹è¯è¡¥å…¨ã€‚`messages` é‡‡ç”¨æ ‡å‡† OpenAI æ ¼å¼â€”â€”`{"role": "...", "content": "..."}` å­—å…¸åˆ—è¡¨ã€‚å¤šè½® promptï¼ˆsystem + few-shot user/assistant å¯¹ + æœ€ç»ˆ userï¼‰çš„ç”¨æ³•ä¸Ž OpenAI SDK å®Œå…¨ä¸€è‡´ã€‚

`provider=` å’Œ `model=` ç›¸äº’ç‹¬ç«‹ï¼Œæ ¼å¼ä¸Žå®¿ä¸»ä¸»é…ç½®ï¼ˆ`model.provider` + `model.model`ï¼‰ç›¸åŒã€‚ä»…è®¾ç½® `model=` å¯åœ¨ç”¨æˆ·å½“å‰æ¿€æ´»çš„ provider ä¸Šä½¿ç”¨ä¸åŒæ¨¡åž‹ã€‚åŒæ—¶è®¾ç½®ä¸¤è€…åˆ™å®Œå…¨åˆ‡æ¢ providerã€‚ä»»ä¸€å‚æ•°åœ¨æœªèŽ·è¿è¥äººå‘˜æŽˆæƒæ—¶å‡ä¼šæŠ›å‡º `PluginLlmTrustError`ã€‚

### `complete_structured()`

```python
result = ctx.llm.complete_structured(
    instructions="What you want extracted.",
    input=[
        {"type": "text",  "text": "..."},
        {"type": "image", "data": b"...", "mime_type": "image/png"},
        {"type": "image", "url":  "https://..."},
    ],
    json_schema={...},     # å¯é€‰â€”â€”è§¦å‘è§£æžç»“æžœåŠéªŒè¯
    json_mode=False,       # è®¾ä¸º True å¯åœ¨ä¸æä¾› schema çš„æƒ…å†µä¸‹è¯·æ±‚ JSON
    schema_name=None,      # å¯é€‰çš„äººç±»å¯è¯» schema åç§°
    system_prompt=None,
    provider=None,         # å¯é€‰ï¼Œå—é—¨æŽ§
    model=None,            # å¯é€‰ï¼Œå—é—¨æŽ§
    temperature=None,
    max_tokens=None,
    timeout=None,
    agent_id=None,
    profile=None,
    purpose=None,
)
# â†’ PluginLlmStructuredResult(text, provider, model, agent_id,
#                             usage, parsed, content_type, audit)
```

è¾“å…¥ä¸ºæœ‰ç±»åž‹çš„æ–‡æœ¬æˆ–å›¾åƒå—ï¼ˆåŽŸå§‹å­—èŠ‚ä¼šè‡ªåŠ¨ base64 ç¼–ç ä¸º `data:` URLï¼‰ã€‚å½“æä¾› `json_schema` æˆ–è®¾ç½® `json_mode=True` æ—¶ï¼Œå®¿ä¸»é€šè¿‡ `response_format` å‘ provider è¯·æ±‚ JSON è¾“å‡ºï¼Œåœ¨æœ¬åœ°ä½œä¸ºå…œåº•è¿›è¡Œè§£æžï¼Œè‹¥å®‰è£…äº† `jsonschema` åˆ™å¯¹ä½ çš„ schema è¿›è¡ŒéªŒè¯ã€‚

* `result.content_type == "json"` â€” `result.parsed` æ˜¯ç¬¦åˆä½  schema çš„ Python å¯¹è±¡ã€‚
* `result.content_type == "text"` â€” è§£æžæˆ–éªŒè¯å¤±è´¥ï¼›æ£€æŸ¥ `result.text` èŽ·å–åŽŸå§‹æ¨¡åž‹å“åº”ã€‚

### å¼‚æ­¥

```python
result = await ctx.llm.acomplete(messages=...)
result = await ctx.llm.acomplete_structured(instructions=..., input=...)
```

å‚æ•°å’Œç»“æžœç±»åž‹ä¸Žå¯¹åº”çš„åŒæ­¥ç‰ˆæœ¬ç›¸åŒã€‚åœ¨ gateway é€‚é…å™¨ã€å¼‚æ­¥ hook æˆ–ä»»ä½•å·²è¿è¡Œåœ¨ asyncio äº‹ä»¶å¾ªçŽ¯ä¸Šçš„ plugin ä»£ç ä¸­ä½¿ç”¨ã€‚

### ç»“æžœå±žæ€§

```python
@dataclass
class PluginLlmCompleteResult:
    text: str                    # åŠ©æ‰‹çš„å“åº”
    provider: str                # å¦‚ "openrouter"ã€"anthropic"
    model: str                   # provider ä¸ºæœ¬æ¬¡è°ƒç”¨è¿”å›žçš„æ¨¡åž‹æ ‡è¯†
    agent_id: str                # ä½¿ç”¨äº†å“ªä¸ª agent çš„æ¨¡åž‹/è®¤è¯
    usage: PluginLlmUsage        # token æ•° + ç¼“å­˜ + è´¹ç”¨ä¼°ç®—
    audit: Dict[str, Any]        # plugin_idã€purposeã€profile

@dataclass
class PluginLlmStructuredResult(PluginLlmCompleteResult):
    parsed: Optional[Any]        # content_type == "json" æ—¶çš„ JSON å¯¹è±¡
    content_type: str            # "json" æˆ– "text"
    # æä¾› schema_name æ—¶ audit ä¸­ä¹Ÿä¼šæºå¸¦è¯¥å­—æ®µ
```

å½“ provider è¿”å›žç›¸åº”å­—æ®µæ—¶ï¼Œ`usage` æºå¸¦ `input_tokens`ã€`output_tokens`ã€`total_tokens`ã€`cache_read_tokens`ã€`cache_write_tokens` å’Œ `cost_usd`ã€‚

## ä¿¡ä»»é—¨æŽ§

é»˜è®¤è¡Œä¸ºæ˜¯å¤±è´¥å…³é—­ã€‚åœ¨æ²¡æœ‰ `plugins.entries` é…ç½®å—çš„æƒ…å†µä¸‹ï¼Œplugin å¯ä»¥ï¼š

* é’ˆå¯¹ç”¨æˆ·å½“å‰æ¿€æ´»çš„ provider å’Œæ¨¡åž‹è¿è¡Œå››ç§æ–¹æ³•ä¸­çš„ä»»æ„ä¸€ç§ï¼Œ
* è®¾ç½®è¯·æ±‚å¡‘å½¢å‚æ•°ï¼ˆ`temperature`ã€`max_tokens`ã€`timeout`ã€`system_prompt`ã€`purpose`ã€`messages`ã€`instructions`ã€`input`ã€`json_schema`ï¼‰ï¼Œ

â€¦â€¦ä»…æ­¤è€Œå·²ã€‚`provider=`ã€`model=`ã€`agent_id=` å’Œ `profile=` å‚æ•°åœ¨è¿è¥äººå‘˜æŽˆæƒå‰å‡ä¼šæŠ›å‡º `PluginLlmTrustError`ã€‚

**å¤§å¤šæ•° plugin æ°¸è¿œä¸éœ€è¦æ­¤éƒ¨åˆ†ã€‚** ä»…è°ƒç”¨ `ctx.llm.complete(messages=...)` ä¸”ä¸å¸¦ä»»ä½•è¦†ç›–çš„ pluginï¼Œä¼šé’ˆå¯¹ç”¨æˆ·å½“å‰æ¿€æ´»çš„å†…å®¹è¿è¡Œï¼Œé›¶é…ç½®å³å¯å·¥ä½œã€‚ä»¥ä¸‹é…ç½®å—ä»…åœ¨ plugin æ˜Žç¡®éœ€è¦å›ºå®šåˆ°ä¸Žç”¨æˆ·ä¸åŒçš„æ¨¡åž‹æˆ– provider æ—¶æ‰æœ‰æ„ä¹‰ã€‚

```yaml
plugins:
  entries:
    my-plugin:
      llm:
        # å…è®¸æ­¤ plugin é€‰æ‹©ä¸åŒçš„ Zed provider
        # ï¼ˆå¿…é¡»æ˜¯ Zed å·²çŸ¥çš„ providerâ€”â€”ä¸Ž
        # `zed model` å’Œ config.yaml model.provider ä¸­çš„åç§°ç›¸åŒï¼‰
        allow_provider_override: true

        # å¯é€‰ï¼šé™åˆ¶å…è®¸çš„ providerã€‚ä½¿ç”¨ ["*"] è¡¨ç¤ºä»»æ„ã€‚
        allowed_providers:
          - openrouter
          - anthropic

        # å…è®¸æ­¤ plugin è¯·æ±‚ç‰¹å®šæ¨¡åž‹ã€‚
        allow_model_override: true

        # å¯é€‰ï¼šé™åˆ¶å…è®¸çš„æ¨¡åž‹ã€‚ä½¿ç”¨ ["*"] è¡¨ç¤ºä»»æ„ã€‚
        # æ¨¡åž‹ä¸Ž plugin å‘é€çš„å­—ç¬¦ä¸²è¿›è¡Œå­—é¢åŒ¹é…â€”â€”
        # Zed ä¸åšä»»ä½•æŸ¥æ‰¾ã€‚
        allowed_models:
          - openai/gpt-4o-mini
          - anthropic/claude-3-5-haiku

        # å…è®¸è·¨ agent è°ƒç”¨ï¼ˆç½•è§ï¼‰ã€‚
        allow_agent_id_override: false

        # å…è®¸ plugin è¯·æ±‚ç‰¹å®šçš„å­˜å‚¨è®¤è¯ profile
        # ï¼ˆå¦‚åŒä¸€ provider ä¸Šçš„ä¸åŒ OAuth è´¦æˆ·ï¼‰ã€‚
        allow_profile_override: false
```

Plugin id å¯¹äºŽæ‰å¹³ plugin æ˜¯ manifest ä¸­çš„ `name:` å­—æ®µï¼Œå¯¹äºŽåµŒå¥— plugin æ˜¯è·¯å¾„æ´¾ç”Ÿçš„é”®ï¼ˆ`image_gen/openai`ã€`memory/honcho` ç­‰ï¼‰ã€‚

### é—¨æŽ§æ‰§è¡Œå†…å®¹

| è¦†ç›–é¡¹          | é»˜è®¤  | é…ç½®é”®                           |
| --------------- | ----- | -------------------------------- |
| `provider=`     | æ‹’ç»  | `allow_provider_override: true`  |
| â†³ å…è®¸åˆ—è¡¨      | â€”     | `allowed_providers: [...]`       |
| `model=`        | æ‹’ç»  | `allow_model_override: true`     |
| â†³ å…è®¸åˆ—è¡¨      | â€”     | `allowed_models: [...]`          |
| `agent_id=`     | æ‹’ç»  | `allow_agent_id_override: true`  |
| `profile=`      | æ‹’ç»  | `allow_profile_override: true`   |

æ¯é¡¹è¦†ç›–ç‹¬ç«‹é—¨æŽ§ã€‚æŽˆäºˆ `allow_model_override` **ä¸ä¼š**åŒæ—¶æŽˆäºˆ `allow_provider_override`â€”â€”è¢«ä¿¡ä»»å¯é€‰æ‹©æ¨¡åž‹çš„ pluginï¼Œåœ¨æœªèŽ·å¾— provider é—¨æŽ§æŽˆæƒå‰ä»å›ºå®šåœ¨ç”¨æˆ·å½“å‰æ¿€æ´»çš„ provider ä¸Šã€‚

### é—¨æŽ§æ— éœ€æ‰§è¡Œçš„å†…å®¹

* è¯·æ±‚å¡‘å½¢å‚æ•°â€”â€”`temperature`ã€`max_tokens`ã€`timeout`ã€`system_prompt`ã€`purpose`ã€`messages`ã€`instructions`ã€`input`ã€`json_schema`ã€`schema_name`ã€`json_mode`â€”â€”å§‹ç»ˆå…è®¸ï¼›å®ƒä»¬ä¸æ¶‰åŠå‡­æ®æˆ–è·¯ç”±é€‰æ‹©ã€‚
* é»˜è®¤æ‹’ç»ç­–ç•¥æ„å‘³ç€æœªé…ç½®çš„ plugin ä»å¯å®Œæˆæœ‰ç”¨çš„å·¥ä½œâ€”â€”åªæ˜¯é’ˆå¯¹å½“å‰æ¿€æ´»çš„ provider å’Œæ¨¡åž‹è¿è¡Œã€‚è¿è¥äººå‘˜åªéœ€åœ¨ plugin æ˜Žç¡®éœ€è¦æ›´ç²¾ç»†è·¯ç”±æ—¶æ‰è€ƒè™‘ `plugins.entries`ã€‚

## å®¿ä¸»è´Ÿè´£çš„å†…å®¹

ä»¥ä¸‹æ˜¯ `ctx.llm` ä¸º plugin ä»£åŠ³çš„å®Œæ•´åˆ—è¡¨ï¼Œä½ æ— éœ€è‡ªè¡Œå¤„ç†ï¼š

* **Provider è§£æžã€‚** ä»Žç”¨æˆ·é…ç½®ä¸­è¯»å– `model.provider` + `model.model`ï¼ˆæˆ–åœ¨å—ä¿¡ä»»æ—¶è¯»å–æ˜¾å¼è¦†ç›–å€¼ï¼‰ã€‚
* **è®¤è¯ã€‚** ä»Ž `~/.zed/auth.json` / çŽ¯å¢ƒå˜é‡ä¸­æå– API å¯†é’¥ã€OAuth token æˆ–åˆ·æ–° tokenï¼ŒåŒ…æ‹¬é…ç½®äº†å‡­æ®æ± æ—¶çš„å¤„ç†ã€‚Plugin æ°¸è¿œçœ‹ä¸åˆ°è¿™äº›å†…å®¹ã€‚
* **è§†è§‰è·¯ç”±ã€‚** å½“æä¾›å›¾åƒè¾“å…¥è€Œç”¨æˆ·å½“å‰æ¿€æ´»çš„æ–‡æœ¬æ¨¡åž‹ä»…æ”¯æŒæ–‡æœ¬æ—¶ï¼Œå®¿ä¸»è‡ªåŠ¨å›žé€€åˆ°å·²é…ç½®çš„è§†è§‰æ¨¡åž‹ã€‚
* **å›žé€€é“¾ã€‚** è‹¥ç”¨æˆ·ä¸» provider è¿”å›ž 5xx æˆ– 429ï¼Œè¯·æ±‚åœ¨å‘ plugin è¿”å›žé”™è¯¯å‰ä¼šç»è¿‡ Zed å¸¸è§„çš„èšåˆå™¨æ„ŸçŸ¥å›žé€€æµç¨‹ã€‚
* **è¶…æ—¶ã€‚** éµå¾ªä½ çš„ `timeout=` å‚æ•°ï¼Œå›žé€€åˆ° `auxiliary.<task>.timeout` é…ç½®æˆ–å…¨å±€è¾…åŠ©é»˜è®¤å€¼ã€‚
* **JSON å¡‘å½¢ã€‚** åœ¨ä½ è¯·æ±‚ JSON æ—¶å‘ provider å‘é€ `response_format`ï¼Œè‹¥ provider è¿”å›žäº†ä»£ç å›´æ æ ¼å¼çš„å“åº”åˆ™åœ¨æœ¬åœ°é‡æ–°è§£æžã€‚
* **Schema éªŒè¯ã€‚** å®‰è£…äº† `jsonschema` æ—¶å¯¹ä½ çš„ `json_schema` è¿›è¡ŒéªŒè¯ï¼›å¦åˆ™è®°å½•ä¸€è¡Œ debug æ—¥å¿—å¹¶è·³è¿‡ä¸¥æ ¼éªŒè¯ã€‚
* **å®¡è®¡æ—¥å¿—ã€‚** æ¯æ¬¡è°ƒç”¨å‘ `agent.log` å†™å…¥ä¸€æ¡ INFO æ—¥å¿—ï¼ŒåŒ…å« plugin idã€provider/æ¨¡åž‹ã€purpose å’Œ token æ€»é‡ã€‚

## Plugin è´Ÿè´£çš„å†…å®¹

* **è¯·æ±‚ç»“æž„ã€‚** å¯¹è¯ç”¨ `messages`ï¼Œç»“æž„åŒ–ç”¨ `instructions` + `input`ã€‚Plugin æž„å»º promptï¼ˆæç¤ºè¯ï¼‰ï¼›å®¿ä¸»æ‰§è¡Œå®ƒã€‚
* **Schemaã€‚** ä½ æœŸæœ›è¿”å›žçš„ä»»æ„ç»“æž„ã€‚å®¿ä¸»ä¸ä¼šä¸ºä½ æŽ¨æ–­ã€‚
* **é”™è¯¯å¤„ç†ã€‚** `complete_structured()` åœ¨è¾“å…¥ä¸ºç©ºæˆ– schema éªŒè¯å¤±è´¥æ—¶æŠ›å‡º `ValueError`ã€‚ä¿¡ä»»é—¨æŽ§æ‹’ç»è¦†ç›–æ—¶æŠ›å‡º `PluginLlmTrustError`ã€‚å…¶ä»–æƒ…å†µï¼ˆprovider 5xxã€æœªé…ç½®å‡­æ®ã€è¶…æ—¶ï¼‰æŠ›å‡º `auxiliary_client.call_llm()` æœ¬èº«æŠ›å‡ºçš„å¼‚å¸¸ã€‚
* **è´¹ç”¨ã€‚** æ¯æ¬¡è°ƒç”¨éƒ½é’ˆå¯¹ç”¨æˆ·çš„ä»˜è´¹ provider è¿è¡Œã€‚ä¸è¦åœ¨ä¸è€ƒè™‘ token æ¶ˆè€—çš„æƒ…å†µä¸‹å¯¹æ¯æ¡ gateway æ¶ˆæ¯å¾ªçŽ¯è°ƒç”¨ `complete()`ã€‚

## åœ¨ plugin æŽ¥å£ä¸­çš„å®šä½

çŽ°æœ‰ `ctx.*` æ–¹æ³•å„è‡ªæ‰©å±•ä¸€ä¸ªå·²æœ‰çš„ Zed å­ç³»ç»Ÿï¼š

| `ctx.register_tool` | æ·»åŠ  agent å¯è°ƒç”¨çš„å·¥å…· |
| `ctx.register_platform` | æŽ¥å…¥æ–°çš„ gateway é€‚é…å™¨ |
| `ctx.register_image_gen_provider` | æ›¿æ¢å›¾åƒç”ŸæˆåŽç«¯ |
| `ctx.register_memory_provider` | æ›¿æ¢è®°å¿†åŽç«¯ |
| `ctx.register_context_engine` | æ›¿æ¢ä¸Šä¸‹æ–‡åŽ‹ç¼©å™¨ |
| `ctx.register_hook` | ç›‘å¬ç”Ÿå‘½å‘¨æœŸäº‹ä»¶ |

`ctx.llm` æ˜¯ç¬¬ä¸€ä¸ªå…è®¸ plugin åœ¨*å¸¦å¤–*è¿è¡Œç”¨æˆ·æ­£åœ¨å¯¹è¯çš„åŒä¸€æ¨¡åž‹çš„æŽ¥å£ï¼Œæ— éœ€ä¸Šè¿°ä»»ä½•æ³¨å†Œã€‚è¿™æ˜¯å®ƒå”¯ä¸€çš„èŒè´£ã€‚å¦‚æžœä½ çš„ plugin éœ€è¦æ³¨å†Œä¸€ä¸ªç”± agent è°ƒç”¨çš„å·¥å…·ï¼Œä½¿ç”¨ `register_tool`ã€‚å¦‚æžœéœ€è¦å“åº”ç”Ÿå‘½å‘¨æœŸäº‹ä»¶ï¼Œä½¿ç”¨ `register_hook`ã€‚å¦‚æžœéœ€è¦å‘èµ·è‡ªå·±çš„æ¨¡åž‹è°ƒç”¨â€”â€”æ— è®ºå‡ºäºŽä½•ç§åŽŸå› ï¼Œç»“æž„åŒ–ä¸Žå¦â€”â€”ä½¿ç”¨ `ctx.llm`ã€‚

## å‚è€ƒèµ„æ–™

* å®žçŽ°ï¼š[`agent/plugin_llm.py`](https://github.com/NousResearch/zed-agent/blob/main/agent/plugin_llm.py)
* æµ‹è¯•ï¼š[`tests/agent/test_plugin_llm.py`](https://github.com/NousResearch/zed-agent/blob/main/tests/agent/test_plugin_llm.py)
* å‚è€ƒ pluginï¼ˆé…å¥—ä»“åº“ï¼‰ï¼š
  * [`plugin-llm-example`](https://github.com/NousResearch/zed-example-plugins/tree/main/plugin-llm-example) â€” å¸¦å›¾åƒè¾“å…¥çš„åŒæ­¥ç»“æž„åŒ–æå–
  * [`plugin-llm-async-example`](https://github.com/NousResearch/zed-example-plugins/tree/main/plugin-llm-async-example) â€” ä½¿ç”¨ `asyncio.gather()` çš„å¼‚æ­¥ç¤ºä¾‹
* è¾…åŠ©å®¢æˆ·ç«¯ï¼ˆåº•å±‚å¼•æ“Žï¼‰ï¼šå‚è§
  [Provider è¿è¡Œæ—¶](/developer-guide/provider-runtime)ã€‚