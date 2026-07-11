# è½¨è¿¹æ ¼å¼

Zed Agent ä»¥ ShareGPT å…¼å®¹çš„ JSONL æ ¼å¼ä¿å­˜å¯¹è¯è½¨è¿¹ï¼Œç”¨äºŽè®­ç»ƒæ•°æ®ã€è°ƒè¯•äº§ç‰©å’Œå¼ºåŒ–å­¦ä¹ æ•°æ®é›†ã€‚

æºæ–‡ä»¶ï¼š`agent/trajectory.py`ã€`run_agent.py`ï¼ˆæœç´¢ `_save_trajectory`ï¼‰ã€`batch_runner.py`


## æ–‡ä»¶å‘½åè§„èŒƒ

è½¨è¿¹å†™å…¥å½“å‰å·¥ä½œç›®å½•ä¸‹çš„æ–‡ä»¶ï¼š

| æ–‡ä»¶ | æ—¶æœº |
|------|------|
| `trajectory_samples.jsonl` | æˆåŠŸå®Œæˆçš„å¯¹è¯ï¼ˆ`completed=True`ï¼‰ |
| `failed_trajectories.jsonl` | å¤±è´¥æˆ–è¢«ä¸­æ–­çš„å¯¹è¯ï¼ˆ`completed=False`ï¼‰ |

æ‰¹é‡è¿è¡Œå™¨ï¼ˆ`batch_runner.py`ï¼‰æŒ‰æ‰¹æ¬¡å†™å…¥è‡ªå®šä¹‰è¾“å‡ºæ–‡ä»¶
ï¼ˆä¾‹å¦‚ `batch_001_output.jsonl`ï¼‰ï¼Œå¹¶é™„å¸¦é¢å¤–çš„å…ƒæ•°æ®å­—æ®µã€‚

å¯é€šè¿‡ `save_trajectory()` çš„ `filename` å‚æ•°è¦†ç›–æ–‡ä»¶åã€‚


## JSONL æ¡ç›®æ ¼å¼

æ–‡ä»¶ä¸­æ¯ä¸€è¡Œæ˜¯ä¸€ä¸ªç‹¬ç«‹çš„ JSON å¯¹è±¡ã€‚å…±æœ‰ä¸¤ç§å˜ä½“ï¼š

### CLI/äº¤äº’å¼æ ¼å¼ï¼ˆæ¥è‡ª `_save_trajectory`ï¼‰

```json
{
  "conversations": [ ... ],
  "timestamp": "2026-03-30T14:22:31.456789",
  "model": "anthropic/claude-sonnet-4.6",
  "completed": true
}
```

### æ‰¹é‡è¿è¡Œå™¨æ ¼å¼ï¼ˆæ¥è‡ª `batch_runner.py`ï¼‰

```json
{
  "prompt_index": 42,
  "conversations": [ ... ],
  "metadata": { "prompt_source": "gsm8k", "difficulty": "hard" },
  "completed": true,
  "partial": false,
  "api_calls": 7,
  "toolsets_used": ["code_tools", "file_tools"],
  "tool_stats": {
    "terminal": {"count": 3, "success": 3, "failure": 0},
    "read_file": {"count": 2, "success": 2, "failure": 0},
    "write_file": {"count": 0, "success": 0, "failure": 0}
  },
  "tool_error_counts": {
    "terminal": 0,
    "read_file": 0,
    "write_file": 0
  }
}
```

`tool_stats` å’Œ `tool_error_counts` å­—å…¸å·²è§„èŒƒåŒ–ï¼ŒåŒ…å«æ‰€æœ‰å¯èƒ½çš„å·¥å…·
ï¼ˆæ¥è‡ª `model_tools.TOOL_TO_TOOLSET_MAP`ï¼‰ï¼Œç¼ºçœå€¼ä¸ºé›¶ï¼Œ
ç¡®ä¿å„æ¡ç›®çš„ schema ä¸€è‡´ï¼Œä¾¿äºŽ HuggingFace æ•°æ®é›†åŠ è½½ã€‚


## conversations æ•°ç»„ï¼ˆShareGPT æ ¼å¼ï¼‰

`conversations` æ•°ç»„ä½¿ç”¨ ShareGPT è§’è‰²çº¦å®šï¼š

| API è§’è‰² | ShareGPT `from` |
|----------|-----------------|
| system | `"system"` |
| user | `"human"` |
| assistant | `"gpt"` |
| tool | `"tool"` |

### å®Œæ•´ç¤ºä¾‹

```json
{
  "conversations": [
    {
      "from": "system",
      "value": "You are a function calling AI model. You are provided with function signatures within <tools> </tools> XML tags. You may call one or more functions to assist with the user query. If available tools are not relevant in assisting with user query, just respond in natural conversational language. Don't make assumptions about what values to plug into functions. After calling & executing the functions, you will be provided with function results within <tool_response> </tool_response> XML tags. Here are the available tools:\n<tools>\n[{\"name\": \"terminal\", \"description\": \"Execute shell commands\", \"parameters\": {\"type\": \"object\", \"properties\": {\"command\": {\"type\": \"string\"}}}, \"required\": null}]\n</tools>\nFor each function call return a JSON object, with the following pydantic model json schema for each:\n{'title': 'FunctionCall', 'type': 'object', 'properties': {'name': {'title': 'Name', 'type': 'string'}, 'arguments': {'title': 'Arguments', 'type': 'object'}}, 'required': ['name', 'arguments']}\nEach function call should be enclosed within <tool_call> </tool_call> XML tags.\nExample:\n<tool_call>\n{'name': <function-name>,'arguments': <args-dict>}\n</tool_call>"
    },
    {
      "from": "human",
      "value": "What Python version is installed?"
    },
    {
      "from": "gpt",
      "value": "<think>\nThe user wants to know the Python version. I should run python3 --version.\n</think>\n<tool_call>\n{\"name\": \"terminal\", \"arguments\": {\"command\": \"python3 --version\"}}\n</tool_call>"
    },
    {
      "from": "tool",
      "value": "<tool_response>\n{\"tool_call_id\": \"call_abc123\", \"name\": \"terminal\", \"content\": \"Python 3.11.6\"}\n</tool_response>"
    },
    {
      "from": "gpt",
      "value": "<think>\nGot the version. I can now answer the user.\n</think>\nPython 3.11.6 is installed on this system."
    }
  ],
  "timestamp": "2026-03-30T14:22:31.456789",
  "model": "anthropic/claude-sonnet-4.6",
  "completed": true
}
```


## è§„èŒƒåŒ–è§„åˆ™

### æŽ¨ç†å†…å®¹æ ‡è®°

è½¨è¿¹è½¬æ¢å™¨å°†æ‰€æœ‰æŽ¨ç†å†…å®¹ç»Ÿä¸€è§„èŒƒåŒ–ä¸º `<think>` æ ‡ç­¾ï¼Œæ— è®ºæ¨¡åž‹æœ€åˆä»¥ä½•ç§æ–¹å¼ç”Ÿæˆï¼š

1. **åŽŸç”Ÿæ€è€ƒ token**ï¼ˆæ¥è‡ª Anthropicã€OpenAI o ç³»åˆ—ç­‰æä¾›å•†çš„ `msg["reasoning"]` å­—æ®µï¼‰ï¼š
   åŒ…è£…ä¸º `<think>\n{reasoning}\n</think>\n` å¹¶ç½®äºŽå†…å®¹ä¹‹å‰ã€‚

2. **REASONING_SCRATCHPAD XML**ï¼ˆç¦ç”¨åŽŸç”Ÿæ€è€ƒæ—¶ï¼Œæ¨¡åž‹é€šè¿‡ç³»ç»Ÿæç¤ºæŒ‡ä»¤çš„ XML è¿›è¡ŒæŽ¨ç†ï¼‰ï¼š
   `<REASONING_SCRATCHPAD>` æ ‡ç­¾é€šè¿‡ `convert_scratchpad_to_think()` è½¬æ¢ä¸º `<think>`ã€‚

3. **ç©º think å—**ï¼šæ¯ä¸ª `gpt` è½®æ¬¡éƒ½ä¿è¯åŒ…å«ä¸€ä¸ª `<think>` å—ã€‚è‹¥æœªäº§ç”Ÿä»»ä½•æŽ¨ç†å†…å®¹ï¼Œ
   åˆ™æ’å…¥ç©ºå—ï¼š`<think>\n</think>\n`â€”â€”ç¡®ä¿è®­ç»ƒæ•°æ®æ ¼å¼ä¸€è‡´ã€‚

### å·¥å…·è°ƒç”¨è§„èŒƒåŒ–

API æ ¼å¼çš„å·¥å…·è°ƒç”¨ï¼ˆå« `tool_call_id`ã€å‡½æ•°åã€JSON å­—ç¬¦ä¸²å½¢å¼çš„å‚æ•°ï¼‰
è½¬æ¢ä¸º XML åŒ…è£¹çš„ JSONï¼š

```
<tool_call>
{"name": "terminal", "arguments": {"command": "ls -la"}}
</tool_call>
```

- å‚æ•°ä»Ž JSON å­—ç¬¦ä¸²è§£æžå›žå¯¹è±¡ï¼ˆä¸è¿›è¡ŒäºŒæ¬¡ç¼–ç ï¼‰
- è‹¥ JSON è§£æžå¤±è´¥ï¼ˆæ­£å¸¸æƒ…å†µä¸‹ä¸åº”å‘ç”Ÿâ€”â€”å¯¹è¯æœŸé—´å·²éªŒè¯ï¼‰ï¼Œ
  åˆ™ä½¿ç”¨ç©º `{}` å¹¶è®°å½•è­¦å‘Šæ—¥å¿—
- ä¸€ä¸ªåŠ©æ‰‹è½®æ¬¡ä¸­çš„å¤šä¸ªå·¥å…·è°ƒç”¨ï¼Œåœ¨å•æ¡ `gpt` æ¶ˆæ¯ä¸­ç”Ÿæˆå¤šä¸ª `<tool_call>` å—

### å·¥å…·å“åº”è§„èŒƒåŒ–

è·ŸéšåŠ©æ‰‹æ¶ˆæ¯çš„æ‰€æœ‰å·¥å…·ç»“æžœï¼Œåˆå¹¶ä¸ºå•æ¡ `tool` è½®æ¬¡ï¼Œä»¥ XML åŒ…è£¹çš„ JSON å“åº”å‘ˆçŽ°ï¼š

```
<tool_response>
{"tool_call_id": "call_abc123", "name": "terminal", "content": "output here"}
</tool_response>
```

- è‹¥å·¥å…·å†…å®¹çœ‹èµ·æ¥åƒ JSONï¼ˆä»¥ `{` æˆ– `[` å¼€å¤´ï¼‰ï¼Œåˆ™è§£æžåŽ content å­—æ®µåŒ…å« JSON å¯¹è±¡/æ•°ç»„ï¼Œè€Œéžå­—ç¬¦ä¸²
- å¤šä¸ªå·¥å…·ç»“æžœä»¥æ¢è¡Œç¬¦è¿žæŽ¥ï¼Œåˆå¹¶ä¸ºä¸€æ¡æ¶ˆæ¯
- å·¥å…·åç§°æŒ‰ä½ç½®ä¸Žçˆ¶åŠ©æ‰‹æ¶ˆæ¯çš„ `tool_calls` æ•°ç»„åŒ¹é…

### ç³»ç»Ÿæ¶ˆæ¯

ç³»ç»Ÿæ¶ˆæ¯åœ¨ä¿å­˜æ—¶ç”Ÿæˆï¼ˆä¸å–è‡ªå¯¹è¯å†…å®¹ï¼‰ï¼Œéµå¾ª Zed å‡½æ•°è°ƒç”¨ prompt æ¨¡æ¿ï¼ŒåŒ…å«ï¼š

- è¯´æ˜Žå‡½æ•°è°ƒç”¨åè®®çš„å‰è¨€
- åŒ…å« JSON å·¥å…·å®šä¹‰çš„ `<tools>` XML å—
- `FunctionCall` å¯¹è±¡çš„ schema å‚è€ƒ
- `<tool_call>` ç¤ºä¾‹

å·¥å…·å®šä¹‰åŒ…å« `name`ã€`description`ã€`parameters` å’Œ `required`
ï¼ˆè®¾ä¸º `null` ä»¥åŒ¹é…è§„èŒƒæ ¼å¼ï¼‰ã€‚


## åŠ è½½è½¨è¿¹

è½¨è¿¹ä¸ºæ ‡å‡† JSONL æ ¼å¼â€”â€”å¯ç”¨ä»»æ„ JSON lines è¯»å–å™¨åŠ è½½ï¼š

```python
import json

def load_trajectories(path: str):
    """Load trajectory entries from a JSONL file."""
    entries = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                entries.append(json.loads(line))
    return entries

# Filter to successful completions only
successful = [e for e in load_trajectories("trajectory_samples.jsonl")
              if e.get("completed")]

# Extract just the conversations for training
training_data = [e["conversations"] for e in successful]
```

### åŠ è½½è‡³ HuggingFace Datasets

```python
from datasets import load_dataset

ds = load_dataset("json", data_files="trajectory_samples.jsonl")
```

è§„èŒƒåŒ–çš„ `tool_stats` schema ç¡®ä¿æ‰€æœ‰æ¡ç›®å…·æœ‰ç›¸åŒçš„åˆ—ï¼Œ
é˜²æ­¢æ•°æ®é›†åŠ è½½æ—¶å‡ºçŽ° Arrow schema ä¸åŒ¹é…é”™è¯¯ã€‚


## æŽ§åˆ¶è½¨è¿¹ä¿å­˜

åœ¨ CLI ä¸­ï¼Œè½¨è¿¹ä¿å­˜é€šè¿‡ä»¥ä¸‹æ–¹å¼æŽ§åˆ¶ï¼š

```yaml
# config.yaml
agent:
  save_trajectories: true  # default: false
```

æˆ–é€šè¿‡ `--save-trajectories` æ ‡å¿—ã€‚å½“ agent ä»¥ `save_trajectories=True` åˆå§‹åŒ–æ—¶ï¼Œ
`_save_trajectory()` æ–¹æ³•åœ¨æ¯æ¬¡å¯¹è¯è½®æ¬¡ç»“æŸæ—¶è°ƒç”¨ã€‚

æ‰¹é‡è¿è¡Œå™¨å§‹ç»ˆä¿å­˜è½¨è¿¹ï¼ˆè¿™æ˜¯å…¶ä¸»è¦ç”¨é€”ï¼‰ã€‚

æ‰€æœ‰è½®æ¬¡ä¸­æŽ¨ç†å†…å®¹ä¸ºé›¶çš„æ ·æœ¬ï¼Œå°†è¢«æ‰¹é‡è¿è¡Œå™¨è‡ªåŠ¨ä¸¢å¼ƒï¼Œ
ä»¥é¿å…éžæŽ¨ç†ç¤ºä¾‹æ±¡æŸ“è®­ç»ƒæ•°æ®ã€‚
