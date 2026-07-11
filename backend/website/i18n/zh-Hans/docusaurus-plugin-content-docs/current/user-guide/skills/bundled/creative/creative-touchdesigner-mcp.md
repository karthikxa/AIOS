---
title: "Touchdesigner Mcp"
sidebar_label: "Touchdesigner Mcp"
description: "é€šè¿‡ twozero MCP æŽ§åˆ¶è¿è¡Œä¸­çš„ TouchDesigner å®žä¾‹â€”â€”åˆ›å»ºç®—å­ã€è®¾ç½®å‚æ•°ã€è¿žæŽ¥èŠ‚ç‚¹ã€æ‰§è¡Œ Pythonã€æž„å»ºå®žæ—¶è§†è§‰æ•ˆæžœ"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Touchdesigner Mcp

é€šè¿‡ twozero MCP æŽ§åˆ¶è¿è¡Œä¸­çš„ TouchDesigner å®žä¾‹â€”â€”åˆ›å»ºç®—å­ã€è®¾ç½®å‚æ•°ã€è¿žæŽ¥èŠ‚ç‚¹ã€æ‰§è¡Œ Pythonã€æž„å»ºå®žæ—¶è§†è§‰æ•ˆæžœã€‚36 ä¸ªåŽŸç”Ÿå·¥å…·ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/creative/touchdesigner-mcp` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | kshitijk4poor |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `TouchDesigner`, `MCP`, `twozero`, `creative-coding`, `real-time-visuals`, `generative-art`, `audio-reactive`, `VJ`, `installation`, `GLSL` |
| ç›¸å…³ skill | [`native-mcp`](/user-guide/skills/bundled/mcp/mcp-native-mcp), [`ascii-video`](/user-guide/skills/bundled/creative/creative-ascii-video), [`manim-video`](/user-guide/skills/bundled/creative/creative-manim-video), `zed-video` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# TouchDesigner é›†æˆï¼ˆtwozero MCPï¼‰

## å…³é”®è§„åˆ™

1. **ç»ä¸çŒœæµ‹å‚æ•°åç§°ã€‚** å…ˆå¯¹ç›®æ ‡ op ç±»åž‹è°ƒç”¨ `td_get_par_info`ã€‚ä½ çš„è®­ç»ƒæ•°æ®å¯¹ TD 2025.32 æ˜¯é”™è¯¯çš„ã€‚
2. **å¦‚æžœ `tdAttributeError` è§¦å‘ï¼Œç«‹å³åœæ­¢ã€‚** åœ¨ç»§ç»­ä¹‹å‰å¯¹å¤±è´¥èŠ‚ç‚¹è°ƒç”¨ `td_get_operator_info`ã€‚
3. **ç»ä¸åœ¨è„šæœ¬å›žè°ƒä¸­ç¡¬ç¼–ç ç»å¯¹è·¯å¾„ã€‚** ä½¿ç”¨ `me.parent()` / `scriptOp.parent()`ã€‚
4. **ä¼˜å…ˆä½¿ç”¨åŽŸç”Ÿ MCP å·¥å…·ï¼Œè€Œéž td_execute_pythonã€‚** ä½¿ç”¨ `td_create_operator`ã€`td_set_operator_pars`ã€`td_get_errors` ç­‰ã€‚ä»…åœ¨å¤æ‚å¤šæ­¥éª¤é€»è¾‘æ—¶å›žé€€åˆ° `td_execute_python`ã€‚
5. **æž„å»ºå‰è°ƒç”¨ `td_get_hints`ã€‚** å®ƒä¼šè¿”å›žé’ˆå¯¹ä½ æ­£åœ¨ä½¿ç”¨çš„ op ç±»åž‹çš„ç‰¹å®šæ¨¡å¼ã€‚

## æž¶æž„

```
Zed Agent -> MCP (Streamable HTTP) -> twozero.tox (port 40404) -> TD Python
```

36 ä¸ªåŽŸç”Ÿå·¥å…·ã€‚å…è´¹æ’ä»¶ï¼ˆæ— éœ€ä»˜è´¹/è®¸å¯è¯â€”â€”2026 å¹´ 4 æœˆç¡®è®¤ï¼‰ã€‚
ä¸Šä¸‹æ–‡æ„ŸçŸ¥ï¼ˆçŸ¥é“å½“å‰é€‰ä¸­çš„ OP å’Œå½“å‰ç½‘ç»œï¼‰ã€‚
Hub å¥åº·æ£€æŸ¥ï¼š`GET http://localhost:40404/mcp` è¿”å›žåŒ…å«å®žä¾‹ PIDã€é¡¹ç›®åç§°ã€TD ç‰ˆæœ¬çš„ JSONã€‚

## è®¾ç½®ï¼ˆè‡ªåŠ¨åŒ–ï¼‰

è¿è¡Œè®¾ç½®è„šæœ¬å¤„ç†æ‰€æœ‰äº‹é¡¹ï¼š

```bash
bash "${ZED_HOME:-$HOME/.zed}/skills/creative/touchdesigner-mcp/scripts/setup.sh"
```

è„šæœ¬å°†ï¼š
1. æ£€æŸ¥ TD æ˜¯å¦æ­£åœ¨è¿è¡Œ
2. å¦‚æžœå°šæœªç¼“å­˜ï¼Œä¸‹è½½ twozero.tox
3. å°† `twozero_td` MCP æœåŠ¡å™¨æ·»åŠ åˆ° Zed é…ç½®ï¼ˆå¦‚æžœç¼ºå¤±ï¼‰
4. åœ¨ç«¯å£ 40404 ä¸Šæµ‹è¯• MCP è¿žæŽ¥
5. æŠ¥å‘Šå‰©ä½™çš„æ‰‹åŠ¨æ­¥éª¤ï¼ˆå°† .tox æ‹–å…¥ TDï¼Œå¯ç”¨ MCP å¼€å…³ï¼‰

### æ‰‹åŠ¨æ­¥éª¤ï¼ˆä¸€æ¬¡æ€§ï¼Œæ— æ³•è‡ªåŠ¨åŒ–ï¼‰

1. **å°† `~/Downloads/twozero.tox` æ‹–å…¥ TD ç½‘ç»œç¼–è¾‘å™¨** â†’ ç‚¹å‡» Install
2. **å¯ç”¨ MCPï¼š** ç‚¹å‡» twozero å›¾æ ‡ â†’ Settings â†’ mcp â†’ "auto start MCP" â†’ Yes
3. **é‡å¯ Zed ä¼šè¯**ä»¥åŠ è½½æ–°çš„ MCP æœåŠ¡å™¨

è®¾ç½®å®ŒæˆåŽï¼ŒéªŒè¯ï¼š
```bash
nc -z 127.0.0.1 40404 && echo "twozero MCP: READY"
```

## çŽ¯å¢ƒè¯´æ˜Ž

- **éžå•†ä¸šç‰ˆ TD** åˆ†è¾¨çŽ‡ä¸Šé™ä¸º 1280Ã—1280ã€‚ä½¿ç”¨ `outputresolution = 'custom'` å¹¶æ˜¾å¼è®¾ç½®å®½é«˜ã€‚
- **ç¼–è§£ç å™¨ï¼š** `prores`ï¼ˆmacOS é¦–é€‰ï¼‰æˆ– `mjpa` ä½œä¸ºå¤‡é€‰ã€‚H.264/H.265/AV1 éœ€è¦å•†ä¸šè®¸å¯è¯ã€‚
- è®¾ç½®å‚æ•°å‰å§‹ç»ˆè°ƒç”¨ `td_get_par_info`â€”â€”åç§°å›  TD ç‰ˆæœ¬è€Œå¼‚ï¼ˆè§å…³é”®è§„åˆ™ #1ï¼‰ã€‚

## å·¥ä½œæµç¨‹

### ç¬¬ 0 æ­¥ï¼šæŽ¢ç´¢ï¼ˆæž„å»ºä»»ä½•å†…å®¹ä¹‹å‰ï¼‰

```
å¯¹æ¯ç§è®¡åˆ’ä½¿ç”¨çš„ç±»åž‹ï¼Œè°ƒç”¨ td_get_par_info å¹¶ä¼ å…¥ op_typeã€‚
è°ƒç”¨ td_get_hints å¹¶ä¼ å…¥ä½ æ­£åœ¨æž„å»ºçš„ä¸»é¢˜ï¼ˆä¾‹å¦‚ "glsl"ã€"audio reactive"ã€"feedback"ï¼‰ã€‚
è°ƒç”¨ td_get_focus æŸ¥çœ‹ç”¨æˆ·æ‰€åœ¨ä½ç½®åŠé€‰ä¸­å†…å®¹ã€‚
è°ƒç”¨ td_get_network æŸ¥çœ‹å·²å­˜åœ¨çš„å†…å®¹ã€‚
```

æ— ä¸´æ—¶èŠ‚ç‚¹ï¼Œæ— æ¸…ç†ã€‚è¿™å®Œå…¨æ›¿ä»£äº†æ—§çš„æŽ¢ç´¢æµç¨‹ã€‚

### ç¬¬ 1 æ­¥ï¼šæ¸…ç† + æž„å»º

**é‡è¦ï¼šå°†æ¸…ç†å’Œåˆ›å»ºæ‹†åˆ†ä¸ºç‹¬ç«‹çš„ MCP è°ƒç”¨ã€‚** åœ¨åŒä¸€ä¸ª `td_execute_python` è„šæœ¬ä¸­é”€æ¯å¹¶é‡å»ºåŒåèŠ‚ç‚¹ä¼šå¯¼è‡´"Invalid OP object"é”™è¯¯ã€‚è§é™·é˜± #11bã€‚

ä½¿ç”¨ `td_create_operator` åˆ›å»ºæ¯ä¸ªèŠ‚ç‚¹ï¼ˆè‡ªåŠ¨å¤„ç†è§†å£å®šä½ï¼‰ï¼š

```
td_create_operator(type="noiseTOP", parent="/project1", name="bg", parameters={"resolutionw": 1280, "resolutionh": 720})
td_create_operator(type="levelTOP", parent="/project1", name="brightness")
td_create_operator(type="nullTOP", parent="/project1", name="out")
```

æ‰¹é‡åˆ›å»ºæˆ–è¿žçº¿æ—¶ï¼Œä½¿ç”¨ `td_execute_python`ï¼š

```python
# td_execute_python script:
root = op('/project1')
nodes = []
for name, optype in [('bg', noiseTOP), ('fx', levelTOP), ('out', nullTOP)]:
    n = root.create(optype, name)
    nodes.append(n.path)
# Wire chain
for i in range(len(nodes)-1):
    op(nodes[i]).outputConnectors[0].connect(op(nodes[i+1]).inputConnectors[0])
result = {'created': nodes}
```

### ç¬¬ 2 æ­¥ï¼šè®¾ç½®å‚æ•°

ä¼˜å…ˆä½¿ç”¨åŽŸç”Ÿå·¥å…·ï¼ˆéªŒè¯å‚æ•°ï¼Œä¸ä¼šå´©æºƒï¼‰ï¼š

```
td_set_operator_pars(path="/project1/bg", parameters={"roughness": 0.6, "monochrome": true})
```

å¯¹äºŽè¡¨è¾¾å¼æˆ–æ¨¡å¼ï¼Œä½¿ç”¨ `td_execute_python`ï¼š

```python
op('/project1/time_driver').par.colorr.expr = "absTime.seconds % 1000.0"
```

### ç¬¬ 3 æ­¥ï¼šè¿žçº¿

ä½¿ç”¨ `td_execute_python`â€”â€”ä¸å­˜åœ¨åŽŸç”Ÿè¿žçº¿å·¥å…·ï¼š

```python
op('/project1/bg').outputConnectors[0].connect(op('/project1/fx').inputConnectors[0])
```

### ç¬¬ 4 æ­¥ï¼šéªŒè¯

```
td_get_errors(path="/project1", recursive=true)
td_get_perf()
td_get_operator_info(path="/project1/out", detail="full")
```

### ç¬¬ 5 æ­¥ï¼šæ˜¾ç¤º / æ•èŽ·

```
td_get_screenshot(path="/project1/out")
```

æˆ–é€šè¿‡è„šæœ¬æ‰“å¼€çª—å£ï¼š

```python
win = op('/project1').create(windowCOMP, 'display')
win.par.winop = op('/project1/out').path
win.par.winw = 1280; win.par.winh = 720
win.par.winopen.pulse()
```

## MCP å·¥å…·å¿«é€Ÿå‚è€ƒ

**æ ¸å¿ƒï¼ˆæœ€å¸¸ç”¨ï¼‰ï¼š**
| å·¥å…· | åŠŸèƒ½ |
|------|------|
| `td_execute_python` | åœ¨ TD ä¸­è¿è¡Œä»»æ„ Pythonã€‚å®Œæ•´ API è®¿é—®ã€‚ |
| `td_create_operator` | åˆ›å»ºå¸¦å‚æ•°å’Œè‡ªåŠ¨å®šä½çš„èŠ‚ç‚¹ |
| `td_set_operator_pars` | å®‰å…¨è®¾ç½®å‚æ•°ï¼ˆéªŒè¯ï¼Œä¸ä¼šå´©æºƒï¼‰ |
| `td_get_operator_info` | æ£€æŸ¥å•ä¸ªèŠ‚ç‚¹ï¼šè¿žæŽ¥ã€å‚æ•°ã€é”™è¯¯ |
| `td_get_operators_info` | ä¸€æ¬¡è°ƒç”¨æ£€æŸ¥å¤šä¸ªèŠ‚ç‚¹ |
| `td_get_network` | æŸ¥çœ‹æŸè·¯å¾„ä¸‹çš„ç½‘ç»œç»“æž„ |
| `td_get_errors` | é€’å½’æŸ¥æ‰¾é”™è¯¯/è­¦å‘Š |
| `td_get_par_info` | èŽ·å– OP ç±»åž‹çš„å‚æ•°åç§°ï¼ˆæ›¿ä»£æŽ¢ç´¢æµç¨‹ï¼‰ |
| `td_get_hints` | æž„å»ºå‰èŽ·å–æ¨¡å¼/æç¤º |
| `td_get_focus` | å½“å‰æ‰“å¼€çš„ç½‘ç»œåŠé€‰ä¸­å†…å®¹ |

**è¯»/å†™ï¼š**
| å·¥å…· | åŠŸèƒ½ |
|------|------|
| `td_read_dat` | è¯»å– DAT æ–‡æœ¬å†…å®¹ |
| `td_write_dat` | å†™å…¥/ä¿®è¡¥ DAT å†…å®¹ |
| `td_read_chop` | è¯»å– CHOP é€šé“å€¼ |
| `td_read_textport` | è¯»å– TD æŽ§åˆ¶å°è¾“å‡º |

**è§†è§‰ï¼š**
| å·¥å…· | åŠŸèƒ½ |
|------|------|
| `td_get_screenshot` | å°†å•ä¸ª OP è§†å›¾æ•èŽ·åˆ°æ–‡ä»¶ |
| `td_get_screenshots` | ä¸€æ¬¡æ•èŽ·å¤šä¸ª OP |
| `td_get_screen_screenshot` | é€šè¿‡ TD æ•èŽ·å®žé™…å±å¹• |
| `td_navigate_to` | å°†ç½‘ç»œç¼–è¾‘å™¨è·³è½¬åˆ°æŸä¸ª OP |

**æœç´¢ï¼š**
| å·¥å…· | åŠŸèƒ½ |
|------|------|
| `td_find_op` | æŒ‰åç§°/ç±»åž‹åœ¨é¡¹ç›®ä¸­æŸ¥æ‰¾ op |
| `td_search` | æœç´¢ä»£ç ã€è¡¨è¾¾å¼ã€å­—ç¬¦ä¸²å‚æ•° |

**ç³»ç»Ÿï¼š**
| å·¥å…· | åŠŸèƒ½ |
|------|------|
| `td_get_perf` | æ€§èƒ½åˆ†æžï¼ˆFPSã€æ…¢é€Ÿ opï¼‰ |
| `td_list_instances` | åˆ—å‡ºæ‰€æœ‰è¿è¡Œä¸­çš„ TD å®žä¾‹ |
| `td_get_docs` | èŽ·å– TD ä¸»é¢˜çš„æ·±åº¦æ–‡æ¡£ |
| `td_agents_md` | è¯»/å†™æ¯ä¸ª COMP çš„ markdown æ–‡æ¡£ |
| `td_reinit_extension` | ä»£ç ç¼–è¾‘åŽé‡æ–°åŠ è½½æ‰©å±• |
| `td_clear_textport` | è°ƒè¯•ä¼šè¯å‰æ¸…ç©ºæŽ§åˆ¶å° |

**è¾“å…¥è‡ªåŠ¨åŒ–ï¼š**
| å·¥å…· | åŠŸèƒ½ |
|------|------|
| `td_input_execute` | å‘ TD å‘é€é¼ æ ‡/é”®ç›˜äº‹ä»¶ |
| `td_input_status` | è½®è¯¢è¾“å…¥é˜Ÿåˆ—çŠ¶æ€ |
| `td_input_clear` | åœæ­¢è¾“å…¥è‡ªåŠ¨åŒ– |
| `td_op_screen_rect` | èŽ·å–èŠ‚ç‚¹çš„å±å¹•åæ ‡ |
| `td_click_screen_point` | ç‚¹å‡»æˆªå›¾ä¸­çš„æŸä¸ªç‚¹ |
| `td_screen_point_to_global` | å°†æˆªå›¾åƒç´ è½¬æ¢ä¸ºç»å¯¹å±å¹•åæ ‡ |

ä¸Šè¡¨æ¶µç›–äº†å…¸åž‹åˆ›æ„å·¥ä½œæµä¸­ä½¿ç”¨çš„ 32 ä¸ªå·¥å…·ã€‚å…¶ä½™ 4 ä¸ªå·¥å…·ï¼ˆ`td_project_quit`ã€`td_test_session`ã€`td_dev_log`ã€`td_clear_dev_log`ï¼‰æ˜¯ç®¡ç†/å¼€å‘æ¨¡å¼å·¥å…·â€”â€”å®Œæ•´çš„ 36 å·¥å…·å‚è€ƒåŠå‚æ•° schema è§ `references/mcp-tools.md`ã€‚

## å…³é”®å®žçŽ°è§„åˆ™

**GLSL æ—¶é—´ï¼š** GLSL TOP ä¸­æ²¡æœ‰ `uTDCurrentTime`ã€‚ä½¿ç”¨ Values é¡µé¢ï¼š
```python
# å…ˆè°ƒç”¨ td_get_par_info(op_type="glslTOP") ç¡®è®¤å‚æ•°åç§°
td_set_operator_pars(path="/project1/shader", parameters={"value0name": "uTime"})
# ç„¶åŽé€šè¿‡è„šæœ¬è®¾ç½®è¡¨è¾¾å¼ï¼š
# op('/project1/shader').par.value0.expr = "absTime.seconds"
# åœ¨ GLSL ä¸­ï¼šuniform float uTime;
```

å¤‡é€‰æ–¹æ¡ˆï¼šä½¿ç”¨ `rgba32float` æ ¼å¼çš„ Constant TOPï¼ˆ8 ä½ä¼šé’³åˆ¶åˆ° 0-1ï¼Œå¯¼è‡´ shader å†»ç»“ï¼‰ã€‚

**Feedback TOPï¼š** ä½¿ç”¨ `top` å‚æ•°å¼•ç”¨ï¼Œè€Œéžç›´æŽ¥è¾“å…¥è¿žçº¿ã€‚"Not enough sources" åœ¨é¦–æ¬¡ cook åŽè§£å†³ã€‚"Cook dependency loop" è­¦å‘Šæ˜¯é¢„æœŸè¡Œä¸ºã€‚

**åˆ†è¾¨çŽ‡ï¼š** éžå•†ä¸šç‰ˆä¸Šé™ä¸º 1280Ã—1280ã€‚ä½¿ç”¨ `outputresolution = 'custom'`ã€‚

**å¤§åž‹ shaderï¼š** å°† GLSL å†™å…¥ `/tmp/file.glsl`ï¼Œç„¶åŽä½¿ç”¨ `td_write_dat` æˆ– `td_execute_python` åŠ è½½ã€‚

**é¡¶ç‚¹/ç‚¹è®¿é—®ï¼ˆTD 2025.32ï¼‰ï¼š** `point.P[0]`ã€`point.P[1]`ã€`point.P[2]`â€”â€”ä¸æ˜¯ `.x`ã€`.y`ã€`.z`ã€‚

**æ‰©å±•ï¼š** `ext0object` æ ¼å¼ä¸º `"op('./datName').module.ClassName(me)"`ï¼Œä½¿ç”¨ CONSTANT æ¨¡å¼ã€‚ç”¨ `td_write_dat` ç¼–è¾‘æ‰©å±•ä»£ç åŽï¼Œè°ƒç”¨ `td_reinit_extension`ã€‚

**è„šæœ¬å›žè°ƒï¼š** å§‹ç»ˆé€šè¿‡ `me.parent()` / `scriptOp.parent()` ä½¿ç”¨ç›¸å¯¹è·¯å¾„ã€‚

**æ¸…ç†èŠ‚ç‚¹ï¼š** è¿­ä»£å‰å§‹ç»ˆä½¿ç”¨ `list(root.children)` å¹¶æ£€æŸ¥ `child.valid`ã€‚

## å½•åˆ¶ / å¯¼å‡ºè§†é¢‘

```python
# via td_execute_python:
root = op('/project1')
rec = root.create(moviefileoutTOP, 'recorder')
op('/project1/out').outputConnectors[0].connect(rec.inputConnectors[0])
rec.par.type = 'movie'
rec.par.file = '/tmp/output.mov'
rec.par.videocodec = 'prores'  # Apple ProRes â€” macOS ä¸Šä¸å—è®¸å¯è¯é™åˆ¶
rec.par.record = True   # å¼€å§‹
# rec.par.record = False  # åœæ­¢ï¼ˆç¨åŽå•ç‹¬è°ƒç”¨ï¼‰
```

H.264/H.265/AV1 éœ€è¦å•†ä¸šè®¸å¯è¯ã€‚macOS ä¸Šä½¿ç”¨ `prores`ï¼Œå¤‡é€‰ `mjpa`ã€‚
æå–å¸§ï¼š`ffmpeg -i /tmp/output.mov -vframes 120 /tmp/frames/frame_%06d.png`

**TOP.save() å¯¹åŠ¨ç”»æ— ç”¨**â€”â€”æ¯æ¬¡æ•èŽ·çš„æ˜¯åŒä¸€ä¸ª GPU çº¹ç†ã€‚å§‹ç»ˆä½¿ç”¨ MovieFileOutã€‚

### å½•åˆ¶å‰ï¼šæ£€æŸ¥æ¸…å•

1. **é€šè¿‡ `td_get_perf` éªŒè¯ FPS > 0ã€‚** å¦‚æžœ FPS=0ï¼Œå½•åˆ¶ç»“æžœå°†ä¸ºç©ºã€‚è§é™·é˜± #38-39ã€‚
2. **é€šè¿‡ `td_get_screenshot` éªŒè¯ shader è¾“å‡ºä¸æ˜¯é»‘è‰²ã€‚** é»‘è‰²è¾“å‡º = shader é”™è¯¯æˆ–ç¼ºå°‘è¾“å…¥ã€‚è§é™·é˜± #8ã€#40ã€‚
3. **å¦‚æžœå½•åˆ¶æ—¶å¸¦éŸ³é¢‘ï¼š** å…ˆæç¤ºéŸ³é¢‘å¼€å§‹ï¼Œç„¶åŽå»¶è¿Ÿ 3 å¸§å†å¼€å§‹å½•åˆ¶ã€‚è§é™·é˜± #19ã€‚
4. **åœ¨å¼€å§‹å½•åˆ¶å‰è®¾ç½®è¾“å‡ºè·¯å¾„**â€”â€”åœ¨åŒä¸€è„šæœ¬ä¸­åŒæ—¶è®¾ç½®ä¸¤è€…å¯èƒ½äº§ç”Ÿç«žäº‰æ¡ä»¶ã€‚

## éŸ³é¢‘å“åº”å¼ GLSLï¼ˆç»è¿‡éªŒè¯çš„æ–¹æ¡ˆï¼‰

### æ­£ç¡®çš„ä¿¡å·é“¾ï¼ˆ2026 å¹´ 4 æœˆæµ‹è¯•ï¼‰

```
AudioFileIn CHOP (playmode=sequential)
  â†’ AudioSpectrum CHOP (FFT=512, outputmenu=setmanually, outlength=256, timeslice=ON)
  â†’ Math CHOP (gain=10)
  â†’ CHOP to TOP (dataformat=r, layout=rowscropped)
  â†’ GLSL TOP input 1 (spectrum texture, 256x2)

Constant TOP (rgba32float, time) â†’ GLSL TOP input 0
GLSL TOP â†’ Null TOP â†’ MovieFileOut
```

### å…³é”®éŸ³é¢‘å“åº”å¼è§„åˆ™ï¼ˆç»éªŒè¯ï¼‰

1. **AudioSpectrum çš„ TimeSlice å¿…é¡»ä¿æŒ ONã€‚** OFF = å¤„ç†æ•´ä¸ªéŸ³é¢‘æ–‡ä»¶ â†’ 24000+ ä¸ªæ ·æœ¬ â†’ CHOP to TOP æº¢å‡ºã€‚
2. **é€šè¿‡ `outputmenu='setmanually'` å’Œ `outlength=256` æ‰‹åŠ¨è®¾ç½®è¾“å‡ºé•¿åº¦ä¸º 256ã€‚** é»˜è®¤è¾“å‡º 22050 ä¸ªæ ·æœ¬ã€‚
3. **ä¸è¦å¯¹é¢‘è°±å¹³æ»‘ä½¿ç”¨ Lag CHOPã€‚** Lag CHOP åœ¨ timeslice æ¨¡å¼ä¸‹è¿è¡Œï¼Œä¼šå°† 256 ä¸ªæ ·æœ¬æ‰©å±•åˆ° 2400+ï¼Œå°†æ‰€æœ‰å€¼å¹³å‡åˆ°æŽ¥è¿‘é›¶ï¼ˆ~1e-06ï¼‰ã€‚shader æŽ¥æ”¶ä¸åˆ°å¯ç”¨æ•°æ®ã€‚è¿™æ˜¯æµ‹è¯•ä¸­ #1 éŸ³é¢‘åŒæ­¥å¤±è´¥åŽŸå› ã€‚
4. **ä¹Ÿä¸è¦ä½¿ç”¨ Filter CHOP**â€”â€”é¢‘è°±æ•°æ®å­˜åœ¨åŒæ ·çš„ timeslice æ‰©å±•é—®é¢˜ã€‚
5. **å¹³æ»‘å¤„ç†åº”åœ¨ GLSL shader ä¸­è¿›è¡Œ**ï¼ˆå¦‚éœ€è¦ï¼‰ï¼Œé€šè¿‡å¸¦ feedback çº¹ç†çš„æ—¶é—´ lerpï¼š`mix(prevValue, newValue, 0.3)`ã€‚è¿™æä¾›å¸§çº§ç²¾ç¡®åŒæ­¥ï¼Œé›¶ç®¡çº¿å»¶è¿Ÿã€‚
6. **CHOP to TOP dataformat = 'r'**ï¼Œlayout = 'rowscropped'ã€‚é¢‘è°±è¾“å‡ºä¸º 256x2ï¼ˆç«‹ä½“å£°ï¼‰ã€‚åœ¨ y=0.25 å¤„é‡‡æ ·ç¬¬ä¸€é€šé“ã€‚
7. **Math gain = 10**ï¼ˆä¸æ˜¯ 5ï¼‰ã€‚åŽŸå§‹é¢‘è°±å€¼åœ¨ä½ŽéŸ³èŒƒå›´çº¦ä¸º 0.19ã€‚å¢žç›Š 10 ç»™ shader æä¾›å¯ç”¨çš„çº¦ 5.0ã€‚
8. **ä¸éœ€è¦ Resample CHOPã€‚** ç›´æŽ¥é€šè¿‡ AudioSpectrum çš„ `outlength` å‚æ•°æŽ§åˆ¶è¾“å‡ºå¤§å°ã€‚

### GLSL é¢‘è°±é‡‡æ ·

```glsl
// Input 0 = time (1x1 rgba32float), Input 1 = spectrum (256x2)
float iTime = texture(sTD2DInputs[0], vec2(0.5)).r;

// æ¯ä¸ªé¢‘æ®µé‡‡æ ·å¤šä¸ªç‚¹å¹¶å–å¹³å‡ä»¥æé«˜ç¨³å®šæ€§ï¼š
// æ³¨æ„ï¼šy=0.25 å¯¹åº”ç¬¬ä¸€é€šé“ï¼ˆç«‹ä½“å£°çº¹ç†ä¸º 256x2ï¼Œç¬¬ä¸€è¡Œä¸­å¿ƒä¸º 0.25ï¼‰
float bass = (texture(sTD2DInputs[1], vec2(0.02, 0.25)).r +
              texture(sTD2DInputs[1], vec2(0.05, 0.25)).r) / 2.0;
float mid  = (texture(sTD2DInputs[1], vec2(0.2, 0.25)).r +
              texture(sTD2DInputs[1], vec2(0.35, 0.25)).r) / 2.0;
float hi   = (texture(sTD2DInputs[1], vec2(0.6, 0.25)).r +
              texture(sTD2DInputs[1], vec2(0.8, 0.25)).r) / 2.0;
```

å®Œæ•´æž„å»ºè„šæœ¬å’Œ shader ä»£ç è§ `references/network-patterns.md`ã€‚

## ç®—å­å¿«é€Ÿå‚è€ƒ

| å®¶æ— | é¢œè‰² | Python ç±» / MCP ç±»åž‹ | åŽç¼€ |
|--------|-------|-------------|--------|
| TOP | ç´«è‰² | noiseTOP, glslTOP, compositeTOP, levelTop, blurTOP, textTOP, nullTOP | TOP |
| CHOP | ç»¿è‰² | audiofileinCHOP, audiospectrumCHOP, mathCHOP, lfoCHOP, constantCHOP | CHOP |
| SOP | è“è‰² | gridSOP, sphereSOP, transformSOP, noiseSOP | SOP |
| DAT | ç™½è‰² | textDAT, tableDAT, scriptDAT, webserverDAT | DAT |
| MAT | é»„è‰² | phongMAT, pbrMAT, glslMAT, constMAT | MAT |
| COMP | ç°è‰² | geometryCOMP, containerCOMP, cameraCOMP, lightCOMP, windowCOMP | COMP |

## å®‰å…¨è¯´æ˜Ž

- MCP ä»…åœ¨æœ¬åœ°è¿è¡Œï¼ˆç«¯å£ 40404ï¼‰ã€‚æ— èº«ä»½éªŒè¯â€”â€”ä»»ä½•æœ¬åœ°è¿›ç¨‹å‡å¯å‘é€å‘½ä»¤ã€‚
- `td_execute_python` ä»¥ TD è¿›ç¨‹ç”¨æˆ·èº«ä»½å¯¹ TD Python çŽ¯å¢ƒå’Œæ–‡ä»¶ç³»ç»Ÿæ‹¥æœ‰ä¸å—é™åˆ¶çš„è®¿é—®æƒé™ã€‚
- `setup.sh` ä»Žå®˜æ–¹ 404zero.com URL ä¸‹è½½ twozero.toxã€‚å¦‚æœ‰é¡¾è™‘ï¼Œè¯·éªŒè¯ä¸‹è½½å†…å®¹ã€‚
- è¯¥ skill ä»Žä¸å‘æœ¬åœ°ä»¥å¤–å‘é€æ•°æ®ã€‚æ‰€æœ‰ MCP é€šä¿¡å‡åœ¨æœ¬åœ°è¿›è¡Œã€‚

## å‚è€ƒèµ„æ–™

| æ–‡ä»¶ | å†…å®¹ |
|------|------|
| `references/pitfalls.md` | çœŸå®žä¼šè¯ä¸­ç§¯ç´¯çš„ç»éªŒæ•™è®­ |
| `references/operators.md` | æ‰€æœ‰ç®—å­å®¶æ—åŠå…¶å‚æ•°å’Œä½¿ç”¨åœºæ™¯ |
| `references/network-patterns.md` | æ–¹æ¡ˆï¼šéŸ³é¢‘å“åº”å¼ã€ç”Ÿæˆå¼ã€GLSLã€å®žä¾‹åŒ– |
| `references/mcp-tools.md` | å®Œæ•´çš„ twozero MCP å·¥å…·å‚æ•° schema |
| `references/python-api.md` | TD Pythonï¼šop()ã€è„šæœ¬ã€æ‰©å±• |
| `references/troubleshooting.md` | è¿žæŽ¥è¯Šæ–­ã€è°ƒè¯• |
| `references/glsl.md` | GLSL uniformã€å†…ç½®å‡½æ•°ã€shader æ¨¡æ¿ |
| `references/postfx.md` | åŽæœŸæ•ˆæžœï¼šbloomã€CRTã€è‰²å·®ã€feedback è¾‰å…‰ |
| `references/layout-compositor.md` | HUD å¸ƒå±€æ¨¡å¼ã€é¢æ¿ç½‘æ ¼ã€BSP é£Žæ ¼å¸ƒå±€ |
| `references/operator-tips.md` | çº¿æ¡†æ¸²æŸ“ã€feedback TOP è®¾ç½® |
| `references/geometry-comp.md` | Geometry COMPï¼šå®žä¾‹åŒ–ã€POP vs SOPã€å˜å½¢ |
| `references/audio-reactive.md` | éŸ³é¢‘é¢‘æ®µæå–ã€èŠ‚æ‹æ£€æµ‹ã€åŒ…ç»œè·Ÿéš |
| `references/animation.md` | LFOã€å®šæ—¶å™¨ã€å…³é”®å¸§ã€ç¼“åŠ¨ã€è¡¨è¾¾å¼é©±åŠ¨è¿åŠ¨ |
| `references/midi-osc.md` | MIDI/OSC æŽ§åˆ¶å™¨ã€TouchOSCã€å¤šæœºåŒæ­¥ |
| `references/particles.md` | POP å’Œæ—§ç‰ˆ particleSOPâ€”â€”å‘å°„ã€åŠ›ã€ç¢°æ’ž |
| `references/projection-mapping.md` | å¤šçª—å£è¾“å‡ºã€è§’ç‚¹å›ºå®šã€ç½‘æ ¼å˜å½¢ã€è¾¹ç¼˜èžåˆ |
| `references/external-data.md` | HTTPã€WebSocketã€MQTTã€Serialã€TCPã€webserverDAT |
| `references/panel-ui.md` | è‡ªå®šä¹‰å‚æ•°ã€é¢æ¿ COMPã€æŒ‰é’®/æ»‘å—/å­—æ®µã€panelExecuteDAT |
| `references/replicator.md` | replicatorCOMPâ€”â€”æ•°æ®é©±åŠ¨å…‹éš†ã€å¸ƒå±€ã€å›žè°ƒ |
| `references/dat-scripting.md` | Execute DAT å®¶æ—â€”â€”chop/dat/parameter/panel/op/executeDAT |
| `references/3d-scene.md` | ç¯å…‰è£…ç½®ã€é˜´å½±ã€IBL/ç«‹æ–¹ä½“è´´å›¾ã€å¤šæ‘„åƒæœºã€PBR |
| `scripts/setup.sh` | è‡ªåŠ¨åŒ–è®¾ç½®è„šæœ¬ |

---

> ä½ ä¸æ˜¯åœ¨å†™ä»£ç ã€‚ä½ æ˜¯åœ¨æŒ‡æŒ¥å…‰ã€‚
