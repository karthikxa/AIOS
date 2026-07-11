---
sidebar_position: 8
title: "ä»£ç æ‰§è¡Œ"
description: "é€šè¿‡ RPC å·¥å…·è®¿é—®å®žçŽ°ç¨‹åºåŒ– Python æ‰§è¡Œâ€”â€”å°†å¤šæ­¥éª¤å·¥ä½œæµåŽ‹ç¼©è‡³å•æ¬¡å¯¹è¯è½®æ¬¡"
---

# ä»£ç æ‰§è¡Œï¼ˆç¨‹åºåŒ–å·¥å…·è°ƒç”¨ï¼‰

`execute_code` å·¥å…·å…è®¸ agent ç¼–å†™è°ƒç”¨ Zed å·¥å…·çš„ Python è„šæœ¬ï¼Œå°†å¤šæ­¥éª¤å·¥ä½œæµåŽ‹ç¼©è‡³å•æ¬¡ LLM å¯¹è¯è½®æ¬¡ã€‚è„šæœ¬åœ¨ agent å®¿ä¸»æœºçš„å­è¿›ç¨‹ä¸­è¿è¡Œï¼Œé€šè¿‡ Unix åŸŸå¥—æŽ¥å­— RPC ä¸Ž Zed é€šä¿¡ã€‚

## å·¥ä½œåŽŸç†

1. Agent ç¼–å†™ä½¿ç”¨ `from zed_tools import ...` çš„ Python è„šæœ¬
2. Zed ç”Ÿæˆå¸¦æœ‰ RPC å‡½æ•°çš„ `zed_tools.py` å­˜æ ¹æ¨¡å—
3. Zed æ‰“å¼€ Unix åŸŸå¥—æŽ¥å­—å¹¶å¯åŠ¨ RPC ç›‘å¬çº¿ç¨‹
4. è„šæœ¬åœ¨å­è¿›ç¨‹ä¸­è¿è¡Œâ€”â€”å·¥å…·è°ƒç”¨é€šè¿‡å¥—æŽ¥å­—ä¼ å›ž Zed
5. åªæœ‰è„šæœ¬çš„ `print()` è¾“å‡ºä¼šè¿”å›žç»™ LLMï¼›ä¸­é—´å·¥å…·ç»“æžœä¸ä¼šè¿›å…¥ä¸Šä¸‹æ–‡çª—å£

```python
# The agent can write scripts like:
from zed_tools import web_search, web_extract

results = web_search("Python 3.13 features", limit=5)
for r in results["data"]["web"]:
    content = web_extract([r["url"]])
    # ... filter and process ...
print(summary)
```

**è„šæœ¬å†…å¯ç”¨å·¥å…·ï¼š** `web_search`ã€`web_extract`ã€`read_file`ã€`write_file`ã€`search_files`ã€`patch`ã€`terminal`ï¼ˆä»…å‰å°æ¨¡å¼ï¼‰ã€‚

## Agent ä½•æ—¶ä½¿ç”¨æ­¤åŠŸèƒ½

å½“å­˜åœ¨ä»¥ä¸‹æƒ…å†µæ—¶ï¼Œagent ä¼šä½¿ç”¨ `execute_code`ï¼š

- **3 æ¬¡åŠä»¥ä¸Šå·¥å…·è°ƒç”¨**ï¼Œä¸”è°ƒç”¨ä¹‹é—´åŒ…å«å¤„ç†é€»è¾‘
- æ‰¹é‡æ•°æ®è¿‡æ»¤æˆ–æ¡ä»¶åˆ†æ”¯
- å¯¹ç»“æžœè¿›è¡Œå¾ªçŽ¯å¤„ç†

æ ¸å¿ƒä¼˜åŠ¿ï¼šä¸­é—´å·¥å…·ç»“æžœä¸ä¼šè¿›å…¥ä¸Šä¸‹æ–‡çª—å£â€”â€”åªæœ‰æœ€ç»ˆçš„ `print()` è¾“å‡ºä¼šè¿”å›žï¼Œå¤§å¹…é™ä½Ž token ç”¨é‡ã€‚

## å®žé™…ç¤ºä¾‹

### æ•°æ®å¤„ç†æµæ°´çº¿

```python
from zed_tools import search_files, read_file
import json

# Find all config files and extract database settings
matches = search_files("database", path=".", file_glob="*.yaml", limit=20)
configs = []
for match in matches.get("matches", []):
    content = read_file(match["path"])
    configs.append({"file": match["path"], "preview": content["content"][:200]})

print(json.dumps(configs, indent=2))
```

### å¤šæ­¥éª¤ç½‘ç»œè°ƒç ”

```python
from zed_tools import web_search, web_extract
import json

# Search, extract, and summarize in one turn
results = web_search("Rust async runtime comparison 2025", limit=5)
summaries = []
for r in results["data"]["web"]:
    page = web_extract([r["url"]])
    for p in page.get("results", []):
        if p.get("content"):
            summaries.append({
                "title": r["title"],
                "url": r["url"],
                "excerpt": p["content"][:500]
            })

print(json.dumps(summaries, indent=2))
```

### æ‰¹é‡æ–‡ä»¶é‡æž„

```python
from zed_tools import search_files, read_file, patch

# Find all Python files using deprecated API and fix them
matches = search_files("old_api_call", path="src/", file_glob="*.py")
fixed = 0
for match in matches.get("matches", []):
    result = patch(
        path=match["path"],
        old_string="old_api_call(",
        new_string="new_api_call(",
        replace_all=True
    )
    if "error" not in str(result):
        fixed += 1

print(f"Fixed {fixed} files out of {len(matches.get('matches', []))} matches")
```

### æž„å»ºä¸Žæµ‹è¯•æµæ°´çº¿

```python
from zed_tools import terminal, read_file
import json

# Run tests, parse results, and report
result = terminal("cd /project && python -m pytest --tb=short -q 2>&1", timeout=120)
output = result.get("output", "")

# Parse test output
passed = output.count(" passed")
failed = output.count(" failed")
errors = output.count(" error")

report = {
    "passed": passed,
    "failed": failed,
    "errors": errors,
    "exit_code": result.get("exit_code", -1),
    "summary": output[-500:] if len(output) > 500 else output
}

print(json.dumps(report, indent=2))
```

## æ‰§è¡Œæ¨¡å¼

`execute_code` æœ‰ä¸¤ç§æ‰§è¡Œæ¨¡å¼ï¼Œé€šè¿‡ `~/.zed/config.yaml` ä¸­çš„ `code_execution.mode` æŽ§åˆ¶ï¼š

| æ¨¡å¼ | å·¥ä½œç›®å½• | Python è§£é‡Šå™¨ |
|------|----------|---------------|
| **`project`**ï¼ˆé»˜è®¤ï¼‰ | ä¼šè¯çš„å·¥ä½œç›®å½•ï¼ˆä¸Ž `terminal()` ç›¸åŒï¼‰ | æ´»è·ƒçš„ `VIRTUAL_ENV` / `CONDA_PREFIX` pythonï¼Œå›žé€€è‡³ Zed è‡ªèº«çš„ python |
| `strict` | ä¸Žç”¨æˆ·é¡¹ç›®éš”ç¦»çš„ä¸´æ—¶æš‚å­˜ç›®å½• | `sys.executable`ï¼ˆZed è‡ªèº«çš„ pythonï¼‰ |

**ä½•æ—¶ä¿æŒ `project` æ¨¡å¼ï¼š** å½“ä½ å¸Œæœ› `import pandas`ã€`from my_project import foo` æˆ– `open(".env")` ç­‰ç›¸å¯¹è·¯å¾„ä¸Ž `terminal()` ä¸­çš„è¡Œä¸ºä¸€è‡´æ—¶ã€‚è¿™å‡ ä¹Žæ˜¯ä½ å§‹ç»ˆæƒ³è¦çš„æ¨¡å¼ã€‚

**ä½•æ—¶åˆ‡æ¢è‡³ `strict` æ¨¡å¼ï¼š** å½“ä½ éœ€è¦æœ€å¤§å¯å¤çŽ°æ€§æ—¶â€”â€”å¸Œæœ›æ— è®ºç”¨æˆ·æ¿€æ´»å“ªä¸ª venvï¼Œæ¯æ¬¡ä¼šè¯éƒ½ä½¿ç”¨ç›¸åŒçš„è§£é‡Šå™¨ï¼Œå¹¶ä¸”å¸Œæœ›è„šæœ¬ä¸Žé¡¹ç›®ç›®å½•éš”ç¦»ï¼ˆé¿å…é€šè¿‡ç›¸å¯¹è·¯å¾„æ„å¤–è¯»å–é¡¹ç›®æ–‡ä»¶ï¼‰ã€‚

```yaml
# ~/.zed/config.yaml
code_execution:
  mode: project   # or "strict"
```

`project` æ¨¡å¼çš„å›žé€€è¡Œä¸ºï¼šè‹¥ `VIRTUAL_ENV` / `CONDA_PREFIX` æœªè®¾ç½®ã€å·²æŸåæˆ–æŒ‡å‘ä½ŽäºŽ 3.8 çš„ Pythonï¼Œè§£æžå™¨ä¼šå¹²å‡€åœ°å›žé€€è‡³ `sys.executable`â€”â€”agent å§‹ç»ˆæœ‰å¯ç”¨çš„è§£é‡Šå™¨ã€‚

ä¸¤ç§æ¨¡å¼çš„å®‰å…¨å…³é”®ä¸å˜é‡å®Œå…¨ç›¸åŒï¼š

- çŽ¯å¢ƒå˜é‡æ¸…ç†ï¼ˆAPI keyã€tokenã€å‡­æ®é»˜è®¤è¢«å‰¥ç¦»ï¼‰
- å·¥å…·ç™½åå•ï¼ˆè„šæœ¬ä¸èƒ½é€’å½’è°ƒç”¨ `execute_code`ã€`delegate_task` æˆ– MCP å·¥å…·ï¼‰
- èµ„æºé™åˆ¶ï¼ˆè¶…æ—¶ã€stdout ä¸Šé™ã€å·¥å…·è°ƒç”¨ä¸Šé™ï¼‰

åˆ‡æ¢æ¨¡å¼åªæ”¹å˜è„šæœ¬çš„è¿è¡Œä½ç½®å’Œä½¿ç”¨çš„è§£é‡Šå™¨ï¼Œä¸æ”¹å˜è„šæœ¬å¯è§çš„å‡­æ®æˆ–å¯è°ƒç”¨çš„å·¥å…·ã€‚

## èµ„æºé™åˆ¶

| èµ„æº | é™åˆ¶ | è¯´æ˜Ž |
|------|------|------|
| **è¶…æ—¶** | 5 åˆ†é’Ÿï¼ˆ300 ç§’ï¼‰ | è„šæœ¬å…ˆæ”¶åˆ° SIGTERMï¼Œ5 ç§’å®½é™æœŸåŽæ”¶åˆ° SIGKILL |
| **Stdout** | 50 KB | è¾“å‡ºæˆªæ–­å¹¶é™„åŠ  `[output truncated at 50KB]` æç¤º |
| **Stderr** | 10 KB | éžé›¶é€€å‡ºæ—¶åŒ…å«åœ¨è¾“å‡ºä¸­ï¼Œç”¨äºŽè°ƒè¯• |
| **å·¥å…·è°ƒç”¨** | æ¯æ¬¡æ‰§è¡Œ 50 æ¬¡ | è¾¾åˆ°ä¸Šé™æ—¶è¿”å›žé”™è¯¯ |

æ‰€æœ‰é™åˆ¶å‡å¯é€šè¿‡ `config.yaml` é…ç½®ï¼š

```yaml
# In ~/.zed/config.yaml
code_execution:
  mode: project      # project (default) | strict
  timeout: 300       # Max seconds per script (default: 300)
  max_tool_calls: 50 # Max tool calls per execution (default: 50)
```

## è„šæœ¬å†…å·¥å…·è°ƒç”¨çš„å·¥ä½œæ–¹å¼

å½“è„šæœ¬è°ƒç”¨ `web_search("query")` ç­‰å‡½æ•°æ—¶ï¼š

1. è°ƒç”¨è¢«åºåˆ—åŒ–ä¸º JSONï¼Œé€šè¿‡ Unix åŸŸå¥—æŽ¥å­—å‘é€è‡³çˆ¶è¿›ç¨‹
2. çˆ¶è¿›ç¨‹é€šè¿‡æ ‡å‡† `handle_function_call` å¤„ç†å™¨è¿›è¡Œåˆ†å‘
3. ç»“æžœé€šè¿‡å¥—æŽ¥å­—å‘å›ž
4. å‡½æ•°è¿”å›žè§£æžåŽçš„ç»“æžœ

è¿™æ„å‘³ç€è„šæœ¬å†…çš„å·¥å…·è°ƒç”¨ä¸Žæ™®é€šå·¥å…·è°ƒç”¨è¡Œä¸ºå®Œå…¨ä¸€è‡´â€”â€”ç›¸åŒçš„é€ŸçŽ‡é™åˆ¶ã€ç›¸åŒçš„é”™è¯¯å¤„ç†ã€ç›¸åŒçš„èƒ½åŠ›ã€‚å”¯ä¸€çš„é™åˆ¶æ˜¯ `terminal()` ä»…æ”¯æŒå‰å°æ¨¡å¼ï¼ˆä¸æ”¯æŒ `background` æˆ– `pty` å‚æ•°ï¼‰ã€‚

## é”™è¯¯å¤„ç†

è„šæœ¬å¤±è´¥æ—¶ï¼Œagent ä¼šæ”¶åˆ°ç»“æž„åŒ–çš„é”™è¯¯ä¿¡æ¯ï¼š

- **éžé›¶é€€å‡ºç **ï¼šstderr åŒ…å«åœ¨è¾“å‡ºä¸­ï¼Œagent å¯çœ‹åˆ°å®Œæ•´çš„ traceback
- **è¶…æ—¶**ï¼šè„šæœ¬è¢«ç»ˆæ­¢ï¼Œagent çœ‹åˆ° `"Script timed out after 300s and was killed."`
- **ä¸­æ–­**ï¼šè‹¥ç”¨æˆ·åœ¨æ‰§è¡ŒæœŸé—´å‘é€æ–°æ¶ˆæ¯ï¼Œè„šæœ¬è¢«ç»ˆæ­¢ï¼Œagent çœ‹åˆ° `[execution interrupted â€” user sent a new message]`
- **å·¥å…·è°ƒç”¨ä¸Šé™**ï¼šè¾¾åˆ° 50 æ¬¡è°ƒç”¨ä¸Šé™åŽï¼ŒåŽç»­å·¥å…·è°ƒç”¨è¿”å›žé”™è¯¯æ¶ˆæ¯

å“åº”å§‹ç»ˆåŒ…å« `status`ï¼ˆsuccess/error/timeout/interruptedï¼‰ã€`output`ã€`tool_calls_made` å’Œ `duration_seconds`ã€‚

## å®‰å…¨æ€§

:::danger å®‰å…¨æ¨¡åž‹
å­è¿›ç¨‹åœ¨**æœ€å°åŒ–çŽ¯å¢ƒ**ä¸­è¿è¡Œã€‚API keyã€token å’Œå‡­æ®é»˜è®¤è¢«å‰¥ç¦»ã€‚è„šæœ¬åªèƒ½é€šè¿‡ RPC é€šé“è®¿é—®å·¥å…·â€”â€”é™¤éžæ˜¾å¼å…è®¸ï¼Œå¦åˆ™æ— æ³•ä»ŽçŽ¯å¢ƒå˜é‡ä¸­è¯»å–å¯†é’¥ã€‚
:::

åç§°ä¸­åŒ…å« `KEY`ã€`TOKEN`ã€`SECRET`ã€`PASSWORD`ã€`CREDENTIAL`ã€`PASSWD` æˆ– `AUTH` çš„çŽ¯å¢ƒå˜é‡ä¼šè¢«æŽ’é™¤ã€‚åªæœ‰å®‰å…¨çš„ç³»ç»Ÿå˜é‡ï¼ˆ`PATH`ã€`HOME`ã€`LANG`ã€`SHELL`ã€`PYTHONPATH`ã€`VIRTUAL_ENV` ç­‰ï¼‰ä¼šè¢«ä¼ é€’ã€‚

### Skill çŽ¯å¢ƒå˜é‡é€ä¼ 

å½“ skill åœ¨å…¶ frontmatter ä¸­å£°æ˜Ž `required_environment_variables` æ—¶ï¼Œè¿™äº›å˜é‡ä¼šåœ¨ skill åŠ è½½åŽ**è‡ªåŠ¨é€ä¼ **è‡³ `execute_code` å’Œ `terminal` å­è¿›ç¨‹ã€‚è¿™ä½¿ skill å¯ä»¥ä½¿ç”¨å…¶å£°æ˜Žçš„ API keyï¼Œè€Œä¸ä¼šå‰Šå¼±ä»»æ„ä»£ç çš„å®‰å…¨æ€åŠ¿ã€‚

å¯¹äºŽéž skill åœºæ™¯ï¼Œå¯åœ¨ `config.yaml` ä¸­æ˜¾å¼æ·»åŠ å˜é‡ç™½åå•ï¼š

```yaml
terminal:
  env_passthrough:
    - MY_CUSTOM_KEY
    - ANOTHER_TOKEN
```

è¯¦æƒ…å‚è§[å®‰å…¨æŒ‡å—](/user-guide/security#environment-variable-passthrough)ã€‚

Zed å§‹ç»ˆå°†è„šæœ¬å’Œè‡ªåŠ¨ç”Ÿæˆçš„ `zed_tools.py` RPC å­˜æ ¹å†™å…¥ä¸´æ—¶æš‚å­˜ç›®å½•ï¼Œæ‰§è¡Œå®ŒæˆåŽæ¸…ç†ã€‚åœ¨ `strict` æ¨¡å¼ä¸‹ï¼Œè„šæœ¬ä¹Ÿåœ¨è¯¥ç›®å½•ä¸­*è¿è¡Œ*ï¼›åœ¨ `project` æ¨¡å¼ä¸‹ï¼Œè„šæœ¬åœ¨ä¼šè¯çš„å·¥ä½œç›®å½•ä¸­è¿è¡Œï¼ˆæš‚å­˜ç›®å½•ä¿ç•™åœ¨ `PYTHONPATH` ä¸­ä»¥ç¡®ä¿å¯¼å…¥æ­£å¸¸è§£æžï¼‰ã€‚å­è¿›ç¨‹åœ¨ç‹¬ç«‹çš„è¿›ç¨‹ç»„ä¸­è¿è¡Œï¼Œä»¥ä¾¿åœ¨è¶…æ—¶æˆ–ä¸­æ–­æ—¶å¹²å‡€åœ°ç»ˆæ­¢ã€‚

## execute_code ä¸Ž terminal å¯¹æ¯”

| ä½¿ç”¨åœºæ™¯ | execute_code | terminal |
|----------|-------------|----------|
| è°ƒç”¨ä¹‹é—´å«é€»è¾‘çš„å¤šæ­¥éª¤å·¥ä½œæµ | âœ… | âŒ |
| ç®€å• shell å‘½ä»¤ | âŒ | âœ… |
| è¿‡æ»¤/å¤„ç†å¤§é‡å·¥å…·è¾“å‡º | âœ… | âŒ |
| è¿è¡Œæž„å»ºæˆ–æµ‹è¯•å¥—ä»¶ | âŒ | âœ… |
| å¯¹æœç´¢ç»“æžœè¿›è¡Œå¾ªçŽ¯å¤„ç† | âœ… | âŒ |
| äº¤äº’å¼/åŽå°è¿›ç¨‹ | âŒ | âœ… |
| éœ€è¦çŽ¯å¢ƒå˜é‡ä¸­çš„ API key | âš ï¸ ä»…é€šè¿‡[é€ä¼ ](/user-guide/security#environment-variable-passthrough) | âœ…ï¼ˆå¤§å¤šæ•°å¯é€ä¼ ï¼‰ |

**ç»éªŒæ³•åˆ™ï¼š** éœ€è¦åœ¨è°ƒç”¨ä¹‹é—´å«é€»è¾‘åœ°ç¨‹åºåŒ–è°ƒç”¨ Zed å·¥å…·æ—¶ï¼Œä½¿ç”¨ `execute_code`ã€‚è¿è¡Œ shell å‘½ä»¤ã€æž„å»ºå’Œè¿›ç¨‹æ—¶ï¼Œä½¿ç”¨ `terminal`ã€‚

## å¹³å°æ”¯æŒ

ä»£ç æ‰§è¡Œä¾èµ– Unix åŸŸå¥—æŽ¥å­—ï¼Œä»…åœ¨ **Linux å’Œ macOS** ä¸Šå¯ç”¨ã€‚åœ¨ Windows ä¸Šä¼šè‡ªåŠ¨ç¦ç”¨â€”â€”agent å›žé€€è‡³å¸¸è§„çš„é¡ºåºå·¥å…·è°ƒç”¨ã€‚
