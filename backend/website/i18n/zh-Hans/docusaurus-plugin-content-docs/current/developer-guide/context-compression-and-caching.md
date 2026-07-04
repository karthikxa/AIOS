---
title: ä¸Šä¸‹æ–‡åŽ‹ç¼©ä¸Žç¼“å­˜
description: Zed Agent å¦‚ä½•é€šè¿‡åŒé‡åŽ‹ç¼©ç³»ç»Ÿå’Œ Anthropic prompt ç¼“å­˜é«˜æ•ˆç®¡ç†ä¸Šä¸‹æ–‡çª—å£ã€‚
---

# ä¸Šä¸‹æ–‡åŽ‹ç¼©ä¸Žç¼“å­˜

Zed Agent ä½¿ç”¨åŒé‡åŽ‹ç¼©ç³»ç»Ÿå’Œ Anthropic promptï¼ˆæç¤ºè¯ï¼‰ç¼“å­˜ï¼Œåœ¨é•¿å¯¹è¯ä¸­é«˜æ•ˆç®¡ç†ä¸Šä¸‹æ–‡çª—å£ç”¨é‡ã€‚

æºæ–‡ä»¶ï¼š`agent/context_engine.py`ï¼ˆABCï¼‰ã€`agent/context_compressor.py`ï¼ˆé»˜è®¤å¼•æ“Žï¼‰ã€
`agent/prompt_caching.py`ã€`gateway/run.py`ï¼ˆä¼šè¯æ¸…ç†ï¼‰ã€`run_agent.py`ï¼ˆæœç´¢ `_compress_context`ï¼‰


## å¯æ’æ‹”ä¸Šä¸‹æ–‡å¼•æ“Ž

ä¸Šä¸‹æ–‡ç®¡ç†åŸºäºŽ `ContextEngine` ABCï¼ˆ`agent/context_engine.py`ï¼‰æž„å»ºã€‚å†…ç½®çš„ `ContextCompressor` æ˜¯é»˜è®¤å®žçŽ°ï¼Œä½†æ’ä»¶å¯ä»¥ç”¨å…¶ä»–å¼•æ“Žæ›¿æ¢å®ƒï¼ˆä¾‹å¦‚æ— æŸä¸Šä¸‹æ–‡ç®¡ç†ï¼‰ã€‚

```yaml
context:
  engine: "compressor"    # default â€” built-in lossy summarization
  engine: "lcm"           # example â€” plugin providing lossless context
```

å¼•æ“Žè´Ÿè´£ï¼š
- å†³å®šä½•æ—¶è§¦å‘åŽ‹ç¼©ï¼ˆ`should_compress()`ï¼‰
- æ‰§è¡ŒåŽ‹ç¼©ï¼ˆ`compress()`ï¼‰
- å¯é€‰åœ°æš´éœ² agent å¯è°ƒç”¨çš„å·¥å…·ï¼ˆä¾‹å¦‚ `lcm_grep`ï¼‰
- è¿½è¸ª API å“åº”ä¸­çš„ token ç”¨é‡

é€šè¿‡ `config.yaml` ä¸­çš„ `context.engine` è¿›è¡Œé…ç½®é©±åŠ¨é€‰æ‹©ã€‚è§£æžé¡ºåºï¼š
1. æ£€æŸ¥ `plugins/context_engine/<name>/` ç›®å½•
2. æ£€æŸ¥é€šç”¨æ’ä»¶ç³»ç»Ÿï¼ˆ`register_context_engine()`ï¼‰
3. å›žé€€åˆ°å†…ç½® `ContextCompressor`

æ’ä»¶å¼•æ“Ž**æ°¸è¿œä¸ä¼šè‡ªåŠ¨æ¿€æ´»**â€”â€”ç”¨æˆ·å¿…é¡»åœ¨ `context.engine` ä¸­æ˜¾å¼è®¾ç½®æ’ä»¶åç§°ã€‚é»˜è®¤çš„ `"compressor"` å§‹ç»ˆä½¿ç”¨å†…ç½®å®žçŽ°ã€‚

é€šè¿‡ `zed plugins` â†’ Provider Plugins â†’ Context Engine è¿›è¡Œé…ç½®ï¼Œæˆ–ç›´æŽ¥ç¼–è¾‘ `config.yaml`ã€‚

å…³äºŽæž„å»ºä¸Šä¸‹æ–‡å¼•æ“Žæ’ä»¶ï¼Œè¯·å‚é˜… [Context Engine æ’ä»¶](/developer-guide/context-engine-plugin)ã€‚

## åŒé‡åŽ‹ç¼©ç³»ç»Ÿ

Zed æœ‰ä¸¤ä¸ªç‹¬ç«‹è¿è¡Œçš„åŽ‹ç¼©å±‚ï¼š

```
                     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
  Incoming message   â”‚   Gateway Session Hygiene â”‚  Fires at 85% of context
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º â”‚   (pre-agent, rough est.) â”‚  Safety net for large sessions
                     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                   â”‚
                                   â–¼
                     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                     â”‚   Agent ContextCompressor â”‚  Fires at 50% of context (default)
                     â”‚   (in-loop, real tokens)  â”‚  Normal context management
                     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### 1. Gateway ä¼šè¯æ¸…ç†ï¼ˆ85% é˜ˆå€¼ï¼‰

ä½äºŽ `gateway/run.py`ï¼ˆæœç´¢ `Session hygiene: auto-compress`ï¼‰ã€‚è¿™æ˜¯ä¸€ä¸ª**å®‰å…¨ç½‘**ï¼Œåœ¨ agent å¤„ç†æ¶ˆæ¯ä¹‹å‰è¿è¡Œã€‚å®ƒé˜²æ­¢ä¼šè¯åœ¨ä¸¤æ¬¡äº¤äº’ä¹‹é—´å¢žé•¿è¿‡å¤§æ—¶ï¼ˆä¾‹å¦‚ Telegram/Discord ä¸­çš„éš”å¤œç§¯ç´¯ï¼‰å¯¼è‡´ API å¤±è´¥ã€‚

- **é˜ˆå€¼**ï¼šå›ºå®šä¸ºæ¨¡åž‹ä¸Šä¸‹æ–‡é•¿åº¦çš„ 85%
- **Token æ¥æº**ï¼šä¼˜å…ˆä½¿ç”¨ä¸Šä¸€è½® API å®žé™…æŠ¥å‘Šçš„ token æ•°ï¼›å›žé€€åˆ°åŸºäºŽå­—ç¬¦çš„ç²—ç•¥ä¼°ç®—ï¼ˆ`estimate_messages_tokens_rough`ï¼‰
- **è§¦å‘æ¡ä»¶**ï¼šä»…å½“ `len(history) >= 4` ä¸”åŽ‹ç¼©å·²å¯ç”¨æ—¶
- **ç›®çš„**ï¼šæ•èŽ·é€ƒè¿‡ agent è‡ªèº«åŽ‹ç¼©å™¨çš„ä¼šè¯

Gateway æ¸…ç†é˜ˆå€¼æœ‰æ„é«˜äºŽ agent åŽ‹ç¼©å™¨çš„é˜ˆå€¼ã€‚å°†å…¶è®¾ç½®ä¸º 50%ï¼ˆä¸Ž agent ç›¸åŒï¼‰ä¼šå¯¼è‡´é•¿ gateway ä¼šè¯åœ¨æ¯ä¸€è½®éƒ½è¿‡æ—©è§¦å‘åŽ‹ç¼©ã€‚

### 2. Agent ContextCompressorï¼ˆ50% é˜ˆå€¼ï¼Œå¯é…ç½®ï¼‰

ä½äºŽ `agent/context_compressor.py`ã€‚è¿™æ˜¯**ä¸»è¦åŽ‹ç¼©ç³»ç»Ÿ**ï¼Œåœ¨ agent çš„å·¥å…·å¾ªçŽ¯å†…è¿è¡Œï¼Œå¯è®¿é—®å‡†ç¡®çš„ API æŠ¥å‘Š token æ•°ã€‚


## é…ç½®

æ‰€æœ‰åŽ‹ç¼©è®¾ç½®ä»Ž `config.yaml` çš„ `compression` é”®è¯»å–ï¼š

```yaml
compression:
  enabled: true              # Enable/disable compression (default: true)
  threshold: 0.50            # Fraction of context window (default: 0.50 = 50%)
  target_ratio: 0.20         # How much of threshold to keep as tail (default: 0.20)
  protect_last_n: 20         # Minimum protected tail messages (default: 20)

# Summarization model/provider configured under auxiliary:
auxiliary:
  compression:
    model: null              # Override model for summaries (default: auto-detect)
    provider: auto           # Provider: "auto", "openrouter", "nous", "main", etc.
    base_url: null           # Custom OpenAI-compatible endpoint
```

### å‚æ•°è¯¦æƒ…

| å‚æ•° | é»˜è®¤å€¼ | èŒƒå›´ | æè¿° |
|-----------|---------|-------|-------------|
| `threshold` | `0.50` | 0.0-1.0 | å½“ prompt token æ•° â‰¥ `threshold Ã— context_length` æ—¶è§¦å‘åŽ‹ç¼© |
| `target_ratio` | `0.20` | 0.10-0.80 | æŽ§åˆ¶å°¾éƒ¨ä¿æŠ¤ token é¢„ç®—ï¼š`threshold_tokens Ã— target_ratio` |
| `protect_last_n` | `20` | â‰¥1 | å§‹ç»ˆä¿ç•™çš„æœ€è¿‘æ¶ˆæ¯æœ€å°æ•°é‡ |
| `protect_first_n` | `3` | ï¼ˆç¡¬ç¼–ç ï¼‰| ç³»ç»Ÿæç¤ºè¯ + é¦–æ¬¡äº¤äº’å§‹ç»ˆä¿ç•™ |

### è®¡ç®—å€¼ï¼ˆ200K ä¸Šä¸‹æ–‡æ¨¡åž‹ï¼Œé»˜è®¤å‚æ•°ï¼‰

```
context_length       = 200,000
threshold_tokens     = 200,000 Ã— 0.50 = 100,000
tail_token_budget    = 100,000 Ã— 0.20 = 20,000
max_summary_tokens   = min(200,000 Ã— 0.05, 12,000) = 10,000
```


## åŽ‹ç¼©ç®—æ³•

`ContextCompressor.compress()` æ–¹æ³•éµå¾ª 4 é˜¶æ®µç®—æ³•ï¼š

### é˜¶æ®µ 1ï¼šæ¸…é™¤æ—§å·¥å…·ç»“æžœï¼ˆå»‰ä»·ï¼Œæ— éœ€ LLM è°ƒç”¨ï¼‰

ä¿æŠ¤å°¾éƒ¨ä¹‹å¤–çš„æ—§å·¥å…·ç»“æžœï¼ˆ>200 å­—ç¬¦ï¼‰å°†è¢«æ›¿æ¢ä¸ºï¼š
```
[Old tool output cleared to save context space]
```

è¿™æ˜¯ä¸€ä¸ªå»‰ä»·çš„é¢„å¤„ç†æ­¥éª¤ï¼Œå¯ä»Žå†—é•¿çš„å·¥å…·è¾“å‡ºï¼ˆæ–‡ä»¶å†…å®¹ã€ç»ˆç«¯è¾“å‡ºã€æœç´¢ç»“æžœï¼‰ä¸­èŠ‚çœå¤§é‡ tokenã€‚

### é˜¶æ®µ 2ï¼šç¡®å®šè¾¹ç•Œ

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Message list                                               â”‚
â”‚                                                             â”‚
â”‚  [0..2]  â† protect_first_n (system + first exchange)        â”‚
â”‚  [3..N]  â† middle turns â†’ SUMMARIZED                        â”‚
â”‚  [N..end] â† tail (by token budget OR protect_last_n)        â”‚
â”‚                                                             â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

å°¾éƒ¨ä¿æŠ¤åŸºäºŽ **token é¢„ç®—**ï¼šä»Žæœ«å°¾å‘å‰éåŽ†ï¼Œç´¯ç§¯ token ç›´åˆ°é¢„ç®—è€—å°½ã€‚å¦‚æžœé¢„ç®—ä¿æŠ¤çš„æ¶ˆæ¯æ•°å°‘äºŽå›ºå®šçš„ `protect_last_n`ï¼Œåˆ™å›žé€€åˆ°è¯¥å›ºå®šæ•°é‡ã€‚

è¾¹ç•Œå¯¹é½ä»¥é¿å…æ‹†åˆ† tool_call/tool_result ç»„ã€‚`_align_boundary_backward()` æ–¹æ³•ä¼šè·³è¿‡è¿žç»­çš„å·¥å…·ç»“æžœï¼Œæ‰¾åˆ°çˆ¶çº§ assistant æ¶ˆæ¯ï¼Œä¿æŒç»„çš„å®Œæ•´æ€§ã€‚

### é˜¶æ®µ 3ï¼šç”Ÿæˆç»“æž„åŒ–æ‘˜è¦

:::warning æ‘˜è¦æ¨¡åž‹ä¸Šä¸‹æ–‡é•¿åº¦
æ‘˜è¦æ¨¡åž‹çš„ä¸Šä¸‹æ–‡çª—å£å¿…é¡»**è‡³å°‘ä¸Žä¸» agent æ¨¡åž‹ä¸€æ ·å¤§**ã€‚æ•´ä¸ªä¸­é—´éƒ¨åˆ†é€šè¿‡å•æ¬¡ `call_llm(task="compression")` è°ƒç”¨å‘é€ç»™æ‘˜è¦æ¨¡åž‹ã€‚å¦‚æžœæ‘˜è¦æ¨¡åž‹çš„ä¸Šä¸‹æ–‡æ›´å°ï¼ŒAPI å°†è¿”å›žä¸Šä¸‹æ–‡é•¿åº¦é”™è¯¯â€”â€”`_generate_summary()` ä¼šæ•èŽ·è¯¥é”™è¯¯ï¼Œè®°å½•è­¦å‘Šå¹¶è¿”å›ž `None`ã€‚åŽ‹ç¼©å™¨éšåŽä¼š**åœ¨æ²¡æœ‰æ‘˜è¦çš„æƒ…å†µä¸‹ä¸¢å¼ƒä¸­é—´è½®æ¬¡**ï¼Œé™é»˜ä¸¢å¤±å¯¹è¯ä¸Šä¸‹æ–‡ã€‚è¿™æ˜¯åŽ‹ç¼©è´¨é‡ä¸‹é™æœ€å¸¸è§çš„åŽŸå› ã€‚
:::

ä¸­é—´è½®æ¬¡ä½¿ç”¨è¾…åŠ© LLM ä»¥ç»“æž„åŒ–æ¨¡æ¿è¿›è¡Œæ‘˜è¦ï¼š

```
## Goal
[What the user is trying to accomplish]

## Constraints & Preferences
[User preferences, coding style, constraints, important decisions]

## Progress
### Done
[Completed work â€” specific file paths, commands run, results]
### In Progress
[Work currently underway]
### Blocked
[Any blockers or issues encountered]

## Key Decisions
[Important technical decisions and why]

## Relevant Files
[Files read, modified, or created â€” with brief note on each]

## Next Steps
[What needs to happen next]

## Critical Context
[Specific values, error messages, configuration details]
```

æ‘˜è¦é¢„ç®—éšè¢«åŽ‹ç¼©å†…å®¹çš„é‡åŠ¨æ€è°ƒæ•´ï¼š
- å…¬å¼ï¼š`content_tokens Ã— 0.20`ï¼ˆ`_SUMMARY_RATIO` å¸¸é‡ï¼‰
- æœ€å°å€¼ï¼š2,000 token
- æœ€å¤§å€¼ï¼š`min(context_length Ã— 0.05, 12,000)` token

### é˜¶æ®µ 4ï¼šç»„è£…åŽ‹ç¼©åŽçš„æ¶ˆæ¯

åŽ‹ç¼©åŽçš„æ¶ˆæ¯åˆ—è¡¨ä¸ºï¼š
1. å¤´éƒ¨æ¶ˆæ¯ï¼ˆé¦–æ¬¡åŽ‹ç¼©æ—¶åœ¨ç³»ç»Ÿæç¤ºè¯åŽè¿½åŠ ä¸€æ¡è¯´æ˜Žï¼‰
2. æ‘˜è¦æ¶ˆæ¯ï¼ˆè§’è‰²ç»è¿‡é€‰æ‹©ä»¥é¿å…è¿žç»­ç›¸åŒè§’è‰²è¿è§„ï¼‰
3. å°¾éƒ¨æ¶ˆæ¯ï¼ˆæœªä¿®æ”¹ï¼‰

`_sanitize_tool_pairs()` æ¸…ç†å­¤ç«‹çš„ tool_call/tool_result å¯¹ï¼š
- å¼•ç”¨å·²åˆ é™¤è°ƒç”¨çš„å·¥å…·ç»“æžœ â†’ åˆ é™¤
- ç»“æžœå·²è¢«åˆ é™¤çš„å·¥å…·è°ƒç”¨ â†’ æ³¨å…¥å­˜æ ¹ç»“æžœ

### è¿­ä»£é‡åŽ‹ç¼©

åœ¨åŽç»­åŽ‹ç¼©ä¸­ï¼Œå‰ä¸€æ¬¡æ‘˜è¦ä¼šè¿žåŒæŒ‡ä»¤ä¸€èµ·ä¼ é€’ç»™ LLMï¼Œè¦æ±‚å…¶**æ›´æ–°**æ‘˜è¦è€Œéžä»Žå¤´æ‘˜è¦ã€‚è¿™åœ¨å¤šæ¬¡åŽ‹ç¼©ä¸­ä¿ç•™äº†ä¿¡æ¯â€”â€”æ¡ç›®ä»Ž"è¿›è¡Œä¸­"ç§»è‡³"å·²å®Œæˆ"ï¼Œæ–°è¿›å±•è¢«æ·»åŠ ï¼Œè¿‡æ—¶ä¿¡æ¯è¢«åˆ é™¤ã€‚

åŽ‹ç¼©å™¨å®žä¾‹ä¸Šçš„ `_previous_summary` å­—æ®µå­˜å‚¨æœ€åŽä¸€æ¬¡æ‘˜è¦æ–‡æœ¬ä»¥ä¾›æ­¤ç”¨é€”ã€‚


## åŽ‹ç¼©å‰åŽç¤ºä¾‹

### åŽ‹ç¼©å‰ï¼ˆ45 æ¡æ¶ˆæ¯ï¼Œçº¦ 95K tokenï¼‰

```
[0] system:    "You are a helpful assistant..." (system prompt)
[1] user:      "Help me set up a FastAPI project"
[2] assistant: <tool_call> terminal: mkdir project </tool_call>
[3] tool:      "directory created"
[4] assistant: <tool_call> write_file: main.py </tool_call>
[5] tool:      "file written (2.3KB)"
    ... 30 more turns of file editing, testing, debugging ...
[38] assistant: <tool_call> terminal: pytest </tool_call>
[39] tool:      "8 passed, 2 failed\n..."  (5KB output)
[40] user:      "Fix the failing tests"
[41] assistant: <tool_call> read_file: tests/test_api.py </tool_call>
[42] tool:      "import pytest\n..."  (3KB)
[43] assistant: "I see the issue with the test fixtures..."
[44] user:      "Great, also add error handling"
```

### åŽ‹ç¼©åŽï¼ˆ25 æ¡æ¶ˆæ¯ï¼Œçº¦ 45K tokenï¼‰

```
[0] system:    "You are a helpful assistant...
               [Note: Some earlier conversation turns have been compacted...]"
[1] user:      "Help me set up a FastAPI project"
[2] assistant: "[CONTEXT COMPACTION] Earlier turns were compacted...

               ## Goal
               Set up a FastAPI project with tests and error handling

               ## Progress
               ### Done
               - Created project structure: main.py, tests/, requirements.txt
               - Implemented 5 API endpoints in main.py
               - Wrote 10 test cases in tests/test_api.py
               - 8/10 tests passing

               ### In Progress
               - Fixing 2 failing tests (test_create_user, test_delete_user)

               ## Relevant Files
               - main.py â€” FastAPI app with 5 endpoints
               - tests/test_api.py â€” 10 test cases
               - requirements.txt â€” fastapi, pytest, httpx

               ## Next Steps
               - Fix failing test fixtures
               - Add error handling"
[3] user:      "Fix the failing tests"
[4] assistant: <tool_call> read_file: tests/test_api.py </tool_call>
[5] tool:      "import pytest\n..."
[6] assistant: "I see the issue with the test fixtures..."
[7] user:      "Great, also add error handling"
```


## Prompt ç¼“å­˜ï¼ˆAnthropicï¼‰

æ¥æºï¼š`agent/prompt_caching.py`

é€šè¿‡ç¼“å­˜å¯¹è¯å‰ç¼€ï¼Œåœ¨å¤šè½®å¯¹è¯ä¸­å°†è¾“å…¥ token æˆæœ¬é™ä½Žçº¦ 75%ã€‚ä½¿ç”¨ Anthropic çš„ `cache_control` æ–­ç‚¹ã€‚

### ç­–ç•¥ï¼šsystem_and_3

Anthropic æ¯æ¬¡è¯·æ±‚æœ€å¤šå…è®¸ 4 ä¸ª `cache_control` æ–­ç‚¹ã€‚Zed ä½¿ç”¨"system_and_3"ç­–ç•¥ï¼š

```
Breakpoint 1: System prompt           (stable across all turns)
Breakpoint 2: 3rd-to-last non-system message  â”€â”
Breakpoint 3: 2nd-to-last non-system message   â”œâ”€ Rolling window
Breakpoint 4: Last non-system message          â”€â”˜
```

### å·¥ä½œåŽŸç†

`apply_anthropic_cache_control()` æ·±æ‹·è´æ¶ˆæ¯å¹¶æ³¨å…¥ `cache_control` æ ‡è®°ï¼š

```python
# Cache marker format
marker = {"type": "ephemeral"}
# Or for 1-hour TTL:
marker = {"type": "ephemeral", "ttl": "1h"}
```

æ ‡è®°æ ¹æ®å†…å®¹ç±»åž‹ä»¥ä¸åŒæ–¹å¼åº”ç”¨ï¼š

| å†…å®¹ç±»åž‹ | æ ‡è®°ä½ç½® |
|-------------|-------------------|
| å­—ç¬¦ä¸²å†…å®¹ | è½¬æ¢ä¸º `[{"type": "text", "text": ..., "cache_control": ...}]` |
| åˆ—è¡¨å†…å®¹ | æ·»åŠ åˆ°æœ€åŽä¸€ä¸ªå…ƒç´ çš„å­—å…¸ä¸­ |
| None/ç©º | ä½œä¸º `msg["cache_control"]` æ·»åŠ  |
| å·¥å…·æ¶ˆæ¯ | ä½œä¸º `msg["cache_control"]` æ·»åŠ ï¼ˆä»…é™åŽŸç”Ÿ Anthropicï¼‰ |

### ç¼“å­˜æ„ŸçŸ¥è®¾è®¡æ¨¡å¼

1. **ç¨³å®šçš„ç³»ç»Ÿæç¤ºè¯**ï¼šç³»ç»Ÿæç¤ºè¯æ˜¯æ–­ç‚¹ 1ï¼Œåœ¨æ‰€æœ‰è½®æ¬¡ä¸­ç¼“å­˜ã€‚é¿å…åœ¨å¯¹è¯ä¸­é€”ä¿®æ”¹å®ƒï¼ˆåŽ‹ç¼©ä»…åœ¨é¦–æ¬¡åŽ‹ç¼©æ—¶è¿½åŠ ä¸€æ¡è¯´æ˜Žï¼‰ã€‚

2. **æ¶ˆæ¯é¡ºåºå¾ˆé‡è¦**ï¼šç¼“å­˜å‘½ä¸­éœ€è¦å‰ç¼€åŒ¹é…ã€‚åœ¨ä¸­é—´æ·»åŠ æˆ–åˆ é™¤æ¶ˆæ¯ä¼šä½¿å…¶åŽæ‰€æœ‰å†…å®¹çš„ç¼“å­˜å¤±æ•ˆã€‚

3. **åŽ‹ç¼©ä¸Žç¼“å­˜çš„äº¤äº’**ï¼šåŽ‹ç¼©åŽï¼Œè¢«åŽ‹ç¼©åŒºåŸŸçš„ç¼“å­˜å¤±æ•ˆï¼Œä½†ç³»ç»Ÿæç¤ºè¯ç¼“å­˜ä¿ç•™ã€‚æ»šåŠ¨ 3 æ¶ˆæ¯çª—å£åœ¨ 1-2 è½®å†…é‡æ–°å»ºç«‹ç¼“å­˜ã€‚

4. **TTL é€‰æ‹©**ï¼šé»˜è®¤ä¸º `5m`ï¼ˆ5 åˆ†é’Ÿï¼‰ã€‚å¯¹äºŽç”¨æˆ·åœ¨è½®æ¬¡ä¹‹é—´æœ‰è¾ƒé•¿é—´éš”çš„é•¿æ—¶é—´ä¼šè¯ï¼Œä½¿ç”¨ `1h`ã€‚

### å¯ç”¨ Prompt ç¼“å­˜

æ»¡è¶³ä»¥ä¸‹æ¡ä»¶æ—¶ï¼Œprompt ç¼“å­˜è‡ªåŠ¨å¯ç”¨ï¼š
- æ¨¡åž‹ä¸º Anthropic Claude æ¨¡åž‹ï¼ˆé€šè¿‡æ¨¡åž‹åç§°æ£€æµ‹ï¼‰
- æä¾›å•†æ”¯æŒ `cache_control`ï¼ˆåŽŸç”Ÿ Anthropic API æˆ– OpenRouterï¼‰

```yaml
# config.yaml â€” TTL is configurable (must be "5m" or "1h")
prompt_caching:
  cache_ttl: "5m"
```

CLI åœ¨å¯åŠ¨æ—¶æ˜¾ç¤ºç¼“å­˜çŠ¶æ€ï¼š
```
ðŸ’¾ Prompt caching: ENABLED (Claude via OpenRouter, 5m TTL)
```


## ä¸Šä¸‹æ–‡åŽ‹åŠ›è­¦å‘Š

ä¸­é—´ä¸Šä¸‹æ–‡åŽ‹åŠ›è­¦å‘Šå·²è¢«ç§»é™¤ï¼ˆå‚è§ `run_agent.py` ä¸­çš„è¿­ä»£é¢„ç®—å—ï¼Œå…¶ä¸­æ³¨æ˜Žï¼š"No intermediate pressure warnings â€” they caused models to 'give up' prematurely on complex tasks"ï¼‰ã€‚åŽ‹ç¼©åœ¨ prompt token è¾¾åˆ°é…ç½®çš„ `compression.threshold`ï¼ˆé»˜è®¤ 50%ï¼‰æ—¶è§¦å‘ï¼Œæ— éœ€äº‹å…ˆè­¦å‘Šæ­¥éª¤ï¼›gateway ä¼šè¯æ¸…ç†ä½œä¸ºäºŒçº§å®‰å…¨ç½‘åœ¨æ¨¡åž‹ä¸Šä¸‹æ–‡çª—å£çš„ 85% å¤„è§¦å‘ã€‚