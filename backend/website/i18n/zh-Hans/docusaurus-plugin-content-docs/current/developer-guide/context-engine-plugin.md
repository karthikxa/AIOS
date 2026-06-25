---
sidebar_position: 9
title: "Context Engine æ’ä»¶"
description: "å¦‚ä½•æž„å»ºæ›¿æ¢å†…ç½® ContextCompressor çš„ context engine æ’ä»¶"
---

# æž„å»º Context Engine æ’ä»¶

Context engine æ’ä»¶ç”¨äºŽæ›¿æ¢å†…ç½®çš„ `ContextCompressor`ï¼Œä»¥å®žçŽ°ç®¡ç†å¯¹è¯ä¸Šä¸‹æ–‡çš„æ›¿ä»£ç­–ç•¥ã€‚ä¾‹å¦‚ï¼Œæ— æŸä¸Šä¸‹æ–‡ç®¡ç†ï¼ˆLCMï¼‰å¼•æ“Žé€šè¿‡æž„å»ºçŸ¥è¯† DAG æ¥æ›¿ä»£æœ‰æŸæ‘˜è¦ã€‚

## å·¥ä½œåŽŸç†

Agent çš„ä¸Šä¸‹æ–‡ç®¡ç†åŸºäºŽ `ContextEngine` ABCï¼ˆ`agent/context_engine.py`ï¼‰æž„å»ºã€‚å†…ç½®çš„ `ContextCompressor` æ˜¯é»˜è®¤å®žçŽ°ã€‚æ’ä»¶å¼•æ“Žå¿…é¡»å®žçŽ°ç›¸åŒçš„æŽ¥å£ã€‚

åŒä¸€æ—¶é—´åªèƒ½æœ‰**ä¸€ä¸ª** context engine å¤„äºŽæ¿€æ´»çŠ¶æ€ã€‚é€‰æ‹©ç”±é…ç½®é©±åŠ¨ï¼š

```yaml
# config.yaml
context:
  engine: "compressor"    # é»˜è®¤å†…ç½®
  engine: "lcm"           # æ¿€æ´»åä¸º "lcm" çš„æ’ä»¶å¼•æ“Ž
```

æ’ä»¶å¼•æ“Ž**æ°¸è¿œä¸ä¼šè‡ªåŠ¨æ¿€æ´»** â€” ç”¨æˆ·å¿…é¡»æ˜¾å¼å°† `context.engine` è®¾ç½®ä¸ºæ’ä»¶åç§°ã€‚

## ç›®å½•ç»“æž„

æ¯ä¸ª context engine ä½äºŽ `plugins/context_engine/<name>/`ï¼š

```
plugins/context_engine/lcm/
â”œâ”€â”€ __init__.py      # å¯¼å‡º ContextEngine å­ç±»
â”œâ”€â”€ plugin.yaml      # å…ƒæ•°æ®ï¼ˆnameã€descriptionã€versionï¼‰
â””â”€â”€ ...              # å¼•æ“Žæ‰€éœ€çš„å…¶ä»–æ¨¡å—
```

## ContextEngine ABC

ä½ çš„å¼•æ“Žå¿…é¡»å®žçŽ°ä»¥ä¸‹**å¿…éœ€**æ–¹æ³•ï¼š

```python
from agent.context_engine import ContextEngine

class LCMEngine(ContextEngine):

    @property
    def name(self) -> str:
        """çŸ­æ ‡è¯†ç¬¦ï¼Œä¾‹å¦‚ 'lcm'ã€‚å¿…é¡»ä¸Ž config.yaml ä¸­çš„å€¼åŒ¹é…ã€‚"""
        return "lcm"

    def update_from_response(self, usage: dict) -> None:
        """æ¯æ¬¡ LLM è°ƒç”¨åŽï¼Œä»¥ usage dict ä¸ºå‚æ•°è°ƒç”¨ã€‚

        ä»Žå“åº”ä¸­æ›´æ–° self.last_prompt_tokensã€self.last_completion_tokensã€
        self.last_total_tokensã€‚
        """

    def should_compress(self, prompt_tokens: int = None) -> bool:
        """è‹¥æœ¬è½®åº”è§¦å‘åŽ‹ç¼©åˆ™è¿”å›ž Trueã€‚"""

    def compress(self, messages: list, current_tokens: int = None,
                 focus_topic: str = None) -> list:
        """åŽ‹ç¼©æ¶ˆæ¯åˆ—è¡¨å¹¶è¿”å›žæ–°çš„ï¼ˆå¯èƒ½æ›´çŸ­çš„ï¼‰åˆ—è¡¨ã€‚

        è¿”å›žçš„åˆ—è¡¨å¿…é¡»æ˜¯æœ‰æ•ˆçš„ OpenAI æ ¼å¼æ¶ˆæ¯åºåˆ—ã€‚

        ``focus_topic`` æ˜¯æ¥è‡ªæ‰‹åŠ¨ ``/compress <focus>`` çš„å¯é€‰ä¸»é¢˜å­—ç¬¦ä¸²ï¼›
        æ”¯æŒå¼•å¯¼å¼åŽ‹ç¼©çš„å¼•æ“Žåº”ä¼˜å…ˆä¿ç•™ä¸Žå…¶ç›¸å…³çš„ä¿¡æ¯ï¼Œå…¶ä»–å¼•æ“Žå¯å¿½ç•¥ã€‚
        """
```

### å¼•æ“Žå¿…é¡»ç»´æŠ¤çš„ç±»å±žæ€§

Agent ç›´æŽ¥è¯»å–è¿™äº›å±žæ€§ç”¨äºŽæ˜¾ç¤ºå’Œæ—¥å¿—è®°å½•ï¼š

```python
last_prompt_tokens: int = 0
last_completion_tokens: int = 0
last_total_tokens: int = 0
threshold_tokens: int = 0        # è§¦å‘åŽ‹ç¼©çš„é˜ˆå€¼
context_length: int = 0          # æ¨¡åž‹çš„å®Œæ•´ä¸Šä¸‹æ–‡çª—å£
compression_count: int = 0       # compress() å·²è¿è¡Œçš„æ¬¡æ•°
```

### å¯é€‰æ–¹æ³•

è¿™äº›æ–¹æ³•åœ¨ ABC ä¸­æœ‰åˆç†çš„é»˜è®¤å®žçŽ°ï¼ŒæŒ‰éœ€è¦†ç›–ï¼š

| æ–¹æ³• | é»˜è®¤è¡Œä¸º | ä½•æ—¶è¦†ç›– |
|--------|---------|--------------|
| `on_session_start(session_id, **kwargs)` | ç©ºæ“ä½œ | éœ€è¦åŠ è½½æŒä¹…åŒ–çŠ¶æ€ï¼ˆDAGã€DBï¼‰æ—¶ |
| `on_session_end(session_id, messages)` | ç©ºæ“ä½œ | éœ€è¦åˆ·æ–°çŠ¶æ€ã€å…³é—­è¿žæŽ¥æ—¶ |
| `on_session_reset()` | é‡ç½® token è®¡æ•°å™¨ | æœ‰éœ€è¦æ¸…é™¤çš„ä¼šè¯çº§çŠ¶æ€æ—¶ |
| `update_model(model, context_length, ...)` | æ›´æ–° context_length å’Œé˜ˆå€¼ | éœ€è¦åœ¨åˆ‡æ¢æ¨¡åž‹æ—¶é‡æ–°è®¡ç®—é¢„ç®—æ—¶ |
| `get_tool_schemas()` | è¿”å›ž `[]` | å¼•æ“Žæä¾› agent å¯è°ƒç”¨çš„å·¥å…·æ—¶ï¼ˆä¾‹å¦‚ `lcm_grep`ï¼‰ |
| `handle_tool_call(name, args, **kwargs)` | è¿”å›žé”™è¯¯ JSON | å®žçŽ°å·¥å…·å¤„ç†å™¨æ—¶ |
| `should_compress_preflight(messages)` | è¿”å›ž `False` | å¯åœ¨ API è°ƒç”¨å‰è¿›è¡Œä½Žæˆæœ¬é¢„ä¼°æ—¶ |
| `get_status()` | æ ‡å‡† token/é˜ˆå€¼å­—å…¸ | æœ‰è‡ªå®šä¹‰æŒ‡æ ‡éœ€è¦æš´éœ²æ—¶ |

## å¼•æ“Žå·¥å…·

Context engine å¯ä»¥æš´éœ² agent ç›´æŽ¥è°ƒç”¨çš„å·¥å…·ã€‚ä»Ž `get_tool_schemas()` è¿”å›ž schemaï¼Œå¹¶åœ¨ `handle_tool_call()` ä¸­å¤„ç†è°ƒç”¨ï¼š

```python
def get_tool_schemas(self):
    return [{
        "name": "lcm_grep",
        "description": "Search the context knowledge graph",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"}
            },
            "required": ["query"],
        },
    }]

def handle_tool_call(self, name, args, **kwargs):
    if name == "lcm_grep":
        results = self._search_dag(args["query"])
        return json.dumps({"results": results})
    return json.dumps({"error": f"Unknown tool: {name}"})
```

å¼•æ“Žå·¥å…·åœ¨å¯åŠ¨æ—¶æ³¨å…¥åˆ° agent çš„å·¥å…·åˆ—è¡¨ä¸­å¹¶è‡ªåŠ¨åˆ†å‘ â€” æ— éœ€æ³¨å†Œåˆ°æ³¨å†Œè¡¨ã€‚

## æ³¨å†Œ

### é€šè¿‡ç›®å½•ï¼ˆæŽ¨èï¼‰

å°†å¼•æ“Žæ”¾ç½®äºŽ `plugins/context_engine/<name>/`ã€‚`__init__.py` å¿…é¡»å¯¼å‡ºä¸€ä¸ª `ContextEngine` å­ç±»ã€‚å‘çŽ°ç³»ç»Ÿä¼šè‡ªåŠ¨æ‰¾åˆ°å¹¶å®žä¾‹åŒ–å®ƒã€‚

### é€šè¿‡é€šç”¨æ’ä»¶ç³»ç»Ÿ

é€šç”¨æ’ä»¶ä¹Ÿå¯ä»¥æ³¨å†Œ context engineï¼š

```python
def register(ctx):
    engine = LCMEngine(context_length=200000)
    ctx.register_context_engine(engine)
```

åªèƒ½æ³¨å†Œä¸€ä¸ªå¼•æ“Žã€‚ç¬¬äºŒä¸ªå°è¯•æ³¨å†Œçš„æ’ä»¶å°†è¢«æ‹’ç»å¹¶å‘å‡ºè­¦å‘Šã€‚

## ç”Ÿå‘½å‘¨æœŸ

```
1. å¼•æ“Žå®žä¾‹åŒ–ï¼ˆæ’ä»¶åŠ è½½æˆ–ç›®å½•å‘çŽ°ï¼‰
2. on_session_start() â€” å¯¹è¯å¼€å§‹
3. update_from_response() â€” æ¯æ¬¡ API è°ƒç”¨åŽ
4. should_compress() â€” æ¯è½®æ£€æŸ¥
5. compress() â€” å½“ should_compress() è¿”å›ž True æ—¶è°ƒç”¨
6. on_session_end() â€” ä¼šè¯è¾¹ç•Œï¼ˆCLI é€€å‡ºã€/resetã€gateway è¿‡æœŸï¼‰
```

`on_session_reset()` åœ¨ `/new` æˆ– `/reset` æ—¶è°ƒç”¨ï¼Œç”¨äºŽæ¸…é™¤ä¼šè¯çº§çŠ¶æ€è€Œä¸å®Œå…¨å…³é—­ã€‚

## é…ç½®

ç”¨æˆ·é€šè¿‡ `zed plugins` â†’ Provider Plugins â†’ Context Engine é€‰æ‹©å¼•æ“Žï¼Œæˆ–ç›´æŽ¥ç¼–è¾‘ `config.yaml`ï¼š

```yaml
context:
  engine: "lcm"   # å¿…é¡»ä¸Žå¼•æ“Žçš„ name å±žæ€§åŒ¹é…
```

`compression` é…ç½®å—ï¼ˆ`compression.threshold`ã€`compression.protect_last_n` ç­‰ï¼‰ä¸“å±žäºŽå†…ç½®çš„ `ContextCompressor`ã€‚å¦‚æœ‰éœ€è¦ï¼Œä½ çš„å¼•æ“Žåº”å®šä¹‰è‡ªå·±çš„é…ç½®æ ¼å¼ï¼Œå¹¶åœ¨åˆå§‹åŒ–æœŸé—´ä»Ž `config.yaml` è¯»å–ã€‚

## æµ‹è¯•

```python
from agent.context_engine import ContextEngine

def test_engine_satisfies_abc():
    engine = YourEngine(context_length=200000)
    assert isinstance(engine, ContextEngine)
    assert engine.name == "your-name"

def test_compress_returns_valid_messages():
    engine = YourEngine(context_length=200000)
    msgs = [{"role": "user", "content": "hello"}]
    result = engine.compress(msgs)
    assert isinstance(result, list)
    assert all("role" in m for m in result)
```

å®Œæ•´çš„ ABC å¥‘çº¦æµ‹è¯•å¥—ä»¶è¯·å‚è§ `tests/agent/test_context_engine.py`ã€‚

## å¦è¯·å‚é˜…

- [ä¸Šä¸‹æ–‡åŽ‹ç¼©ä¸Žç¼“å­˜](/developer-guide/context-compression-and-caching) â€” å†…ç½®åŽ‹ç¼©å™¨çš„å·¥ä½œåŽŸç†
- [Memory Provider æ’ä»¶](/developer-guide/memory-provider-plugin) â€” ç±»ä¼¼çš„å•é€‰æ’ä»¶ç³»ç»Ÿï¼ˆç”¨äºŽå†…å­˜ï¼‰
- [æ’ä»¶](/user-guide/features/plugins) â€” é€šç”¨æ’ä»¶ç³»ç»Ÿæ¦‚è¿°