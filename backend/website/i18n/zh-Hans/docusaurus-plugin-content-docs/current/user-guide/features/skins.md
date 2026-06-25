---
sidebar_position: 10
title: "çš®è‚¤ä¸Žä¸»é¢˜"
description: "ä½¿ç”¨å†…ç½®å’Œç”¨æˆ·è‡ªå®šä¹‰çš®è‚¤å®šåˆ¶ Zed CLI çš„å¤–è§‚"
---

# çš®è‚¤ä¸Žä¸»é¢˜

çš®è‚¤æŽ§åˆ¶ Zed CLI çš„**è§†è§‰å‘ˆçŽ°**ï¼šæ¨ªå¹…é¢œè‰²ã€spinnerï¼ˆåŠ è½½åŠ¨ç”»ï¼‰é¢å­”ä¸ŽåŠ¨è¯ã€å“åº”æ¡†æ ‡ç­¾ã€å“ç‰Œæ–‡æœ¬ä»¥åŠå·¥å…·æ´»åŠ¨å‰ç¼€ã€‚

å¯¹è¯é£Žæ ¼ä¸Žè§†è§‰é£Žæ ¼æ˜¯ä¸¤ä¸ªç‹¬ç«‹çš„æ¦‚å¿µï¼š

- **Personalityï¼ˆä¸ªæ€§ï¼‰** æ”¹å˜ agent çš„è¯­æ°”å’ŒæŽªè¾žã€‚
- **Skinï¼ˆçš®è‚¤ï¼‰** æ”¹å˜ CLI çš„å¤–è§‚ã€‚

## åˆ‡æ¢çš®è‚¤

```bash
/skin                # show the current skin and list available skins
/skin ares           # switch to a built-in skin
/skin mytheme        # switch to a custom skin from ~/.zed/skins/mytheme.yaml
```

æˆ–åœ¨ `~/.zed/config.yaml` ä¸­è®¾ç½®é»˜è®¤çš®è‚¤ï¼š

```yaml
display:
  skin: default
```

## å†…ç½®çš®è‚¤

| çš®è‚¤ | æè¿° | Agent å“ç‰Œ | è§†è§‰ç‰¹å¾ |
|------|------|-----------|---------|
| `default` | ç»å…¸ Zed â€” é‡‘è‰²ä¸Ž kawaii é£Žæ ¼ | `Zed Agent` | æš–é‡‘è‰²è¾¹æ¡†ï¼Œcornsilk æ–‡å­—ï¼Œspinner ä¸­çš„ kawaii é¢å­”ã€‚ç†Ÿæ‚‰çš„åŒè›‡æ–æ¨ªå¹…ã€‚ç®€æ´äº²åˆ‡ã€‚ |
| `ares` | æˆ˜ç¥žä¸»é¢˜ â€” æ·±çº¢ä¸Žé’é“œ | `Ares Agent` | æ·±çº¢è‰²è¾¹æ¡†é…é’é“œç‚¹ç¼€ã€‚æ¿€è¿›çš„ spinner åŠ¨è¯ï¼ˆ"forging"ã€"marching"ã€"tempering steel"ï¼‰ã€‚è‡ªå®šä¹‰å‰‘ç›¾ ASCII è‰ºæœ¯æ¨ªå¹…ã€‚ |
| `mono` | å•è‰² â€” ç®€æ´ç°åº¦ | `Zed Agent` | å…¨ç°è‰²ï¼Œæ— å½©è‰²ã€‚è¾¹æ¡†ä¸º `#555555`ï¼Œæ–‡å­—ä¸º `#c9d1d9`ã€‚é€‚åˆæžç®€ç»ˆç«¯æˆ–å½•å±åœºæ™¯ã€‚ |
| `slate` | å†·è“è‰² â€” é¢å‘å¼€å‘è€… | `Zed Agent` | çš‡å®¶è“è¾¹æ¡†ï¼ˆ`#4169e1`ï¼‰ï¼ŒæŸ”å’Œè“è‰²æ–‡å­—ã€‚æ²‰ç¨³ä¸“ä¸šã€‚æ— è‡ªå®šä¹‰ spinnerï¼Œä½¿ç”¨é»˜è®¤é¢å­”ã€‚ |
| `daylight` | é€‚ç”¨äºŽäº®è‰²ç»ˆç«¯çš„æµ…è‰²ä¸»é¢˜ï¼Œæ·±è‰²æ–‡å­—é…å†·è“ç‚¹ç¼€ | `Zed Agent` | ä¸“ä¸ºç™½è‰²æˆ–äº®è‰²ç»ˆç«¯è®¾è®¡ã€‚æ·±çŸ³æ¿è‰²æ–‡å­—é…è“è‰²è¾¹æ¡†ï¼Œæµ…è‰²çŠ¶æ€é¢æ¿ï¼Œè¡¥å…¨èœå•åœ¨äº®è‰²ç»ˆç«¯é…ç½®ä¸‹ä¿æŒæ¸…æ™°å¯è¯»ã€‚ |
| `warm-lightmode` | é€‚ç”¨äºŽæµ…è‰²ç»ˆç«¯èƒŒæ™¯çš„æš–æ£•/é‡‘è‰²æ–‡å­— | `Zed Agent` | é€‚åˆæµ…è‰²ç»ˆç«¯çš„æš–ç¾Šçš®çº¸è‰²è°ƒã€‚æ·±æ£•è‰²æ–‡å­—é…é©¬éžæ£•ç‚¹ç¼€ï¼Œå¥¶æ²¹è‰²çŠ¶æ€é¢æ¿ã€‚æ¯” daylight ä¸»é¢˜æ›´æ¸©æš–çš„å¤§åœ°è‰²ç³»é€‰æ‹©ã€‚ |
| `poseidon` | æµ·ç¥žä¸»é¢˜ â€” æ·±è“ä¸Žæµ·æ²«ç»¿ | `Poseidon Agent` | æ·±è“åˆ°æµ·æ²«ç»¿æ¸å˜ã€‚æµ·æ´‹ä¸»é¢˜ spinnerï¼ˆ"charting currents"ã€"sounding the depth"ï¼‰ã€‚ä¸‰å‰æˆŸ ASCII è‰ºæœ¯æ¨ªå¹…ã€‚ |
| `sisyphus` | è¥¿è¥¿å¼—æ–¯ä¸»é¢˜ â€” æœ´ç´ ç°åº¦ï¼Œå½°æ˜¾åšéŸ§ | `Sisyphus Agent` | æµ…ç°è‰²é…å¼ºçƒˆå¯¹æ¯”ã€‚å·¨çŸ³ä¸»é¢˜ spinnerï¼ˆ"pushing uphill"ã€"resetting the boulder"ã€"enduring the loop"ï¼‰ã€‚å·¨çŸ³ä¸Žå±±ä¸˜ ASCII è‰ºæœ¯æ¨ªå¹…ã€‚ |
| `charizard` | ç«å±±ä¸»é¢˜ â€” ç„¦æ©™ä¸Žä½™çƒ¬è‰² | `Charizard Agent` | æš–ç„¦æ©™åˆ°ä½™çƒ¬è‰²æ¸å˜ã€‚ç«ç„°ä¸»é¢˜ spinnerï¼ˆ"banking into the draft"ã€"measuring burn"ï¼‰ã€‚é¾™å‰ªå½± ASCII è‰ºæœ¯æ¨ªå¹…ã€‚ |

## å¯é…ç½®é”®å®Œæ•´åˆ—è¡¨

### é¢œè‰²ï¼ˆ`colors:`ï¼‰

æŽ§åˆ¶ CLI ä¸­æ‰€æœ‰é¢œè‰²å€¼ã€‚å€¼ä¸ºåå…­è¿›åˆ¶é¢œè‰²å­—ç¬¦ä¸²ã€‚

| é”® | æè¿° | é»˜è®¤å€¼ï¼ˆ`default` çš®è‚¤ï¼‰ |
|----|------|------------------------|
| `banner_border` | å¯åŠ¨æ¨ªå¹…å‘¨å›´çš„é¢æ¿è¾¹æ¡† | `#CD7F32`ï¼ˆé’é“œè‰²ï¼‰ |
| `banner_title` | æ¨ªå¹…ä¸­çš„æ ‡é¢˜æ–‡å­—é¢œè‰² | `#FFD700`ï¼ˆé‡‘è‰²ï¼‰ |
| `banner_accent` | æ¨ªå¹…ä¸­çš„åŒºå—æ ‡é¢˜ï¼ˆAvailable Tools ç­‰ï¼‰ | `#FFBF00`ï¼ˆç¥ç€è‰²ï¼‰ |
| `banner_dim` | æ¨ªå¹…ä¸­çš„å¼±åŒ–æ–‡å­—ï¼ˆåˆ†éš”ç¬¦ã€æ¬¡è¦æ ‡ç­¾ï¼‰ | `#B8860B`ï¼ˆæš—é‡‘èŠè‰²ï¼‰ |
| `banner_text` | æ¨ªå¹…ä¸­çš„æ­£æ–‡æ–‡å­—ï¼ˆå·¥å…·åã€æŠ€èƒ½åï¼‰ | `#FFF8DC`ï¼ˆçŽ‰ç±³ä¸è‰²ï¼‰ |
| `ui_accent` | é€šç”¨ UI å¼ºè°ƒè‰²ï¼ˆé«˜äº®ã€æ´»åŠ¨å…ƒç´ ï¼‰ | `#FFBF00` |
| `ui_label` | UI æ ‡ç­¾ä¸Žæ ‡è®° | `#4dd0e1`ï¼ˆé’è‰²ï¼‰ |
| `ui_ok` | æˆåŠŸæŒ‡ç¤ºå™¨ï¼ˆå¯¹å‹¾ã€å®Œæˆï¼‰ | `#4caf50`ï¼ˆç»¿è‰²ï¼‰ |
| `ui_error` | é”™è¯¯æŒ‡ç¤ºå™¨ï¼ˆå¤±è´¥ã€é˜»æ–­ï¼‰ | `#ef5350`ï¼ˆçº¢è‰²ï¼‰ |
| `ui_warn` | è­¦å‘ŠæŒ‡ç¤ºå™¨ï¼ˆæ³¨æ„ã€å®¡æ‰¹æç¤ºï¼‰ | `#ffa726`ï¼ˆæ©™è‰²ï¼‰ |
| `prompt` | äº¤äº’å¼ promptï¼ˆæç¤ºç¬¦ï¼‰æ–‡å­—é¢œè‰² | `#FFF8DC` |
| `input_rule` | è¾“å…¥åŒºåŸŸä¸Šæ–¹çš„æ°´å¹³åˆ†éš”çº¿ | `#CD7F32` |
| `response_border` | agent å“åº”æ¡†è¾¹æ¡†ï¼ˆANSI è½¬ä¹‰ï¼‰ | `#FFD700` |
| `session_label` | ä¼šè¯æ ‡ç­¾é¢œè‰² | `#DAA520` |
| `session_border` | ä¼šè¯ ID å¼±åŒ–è¾¹æ¡†é¢œè‰² | `#8B8682` |
| `status_bar_bg` | TUI çŠ¶æ€/ç”¨é‡æ çš„èƒŒæ™¯è‰² | `#1a1a2e` |
| `voice_status_bg` | è¯­éŸ³æ¨¡å¼çŠ¶æ€å¾½ç« çš„èƒŒæ™¯è‰² | `#1a1a2e` |
| `selection_bg` | TUI é¼ æ ‡é€‰åŒºé«˜äº®çš„èƒŒæ™¯è‰²ã€‚æœªè®¾ç½®æ—¶å›žé€€åˆ° `completion_menu_current_bg`ã€‚ | `#333355` |
| `completion_menu_bg` | è¡¥å…¨èœå•åˆ—è¡¨çš„èƒŒæ™¯è‰² | `#1a1a2e` |
| `completion_menu_current_bg` | å½“å‰æ´»åŠ¨è¡¥å…¨è¡Œçš„èƒŒæ™¯è‰² | `#333355` |
| `completion_menu_meta_bg` | è¡¥å…¨å…ƒä¿¡æ¯åˆ—çš„èƒŒæ™¯è‰² | `#1a1a2e` |
| `completion_menu_meta_current_bg` | å½“å‰æ´»åŠ¨è¡¥å…¨å…ƒä¿¡æ¯åˆ—çš„èƒŒæ™¯è‰² | `#333355` |

### Spinnerï¼ˆ`spinner:`ï¼‰

æŽ§åˆ¶ç­‰å¾… API å“åº”æ—¶æ˜¾ç¤ºçš„åŠ¨ç”» spinnerã€‚

| é”® | ç±»åž‹ | æè¿° | ç¤ºä¾‹ |
|----|------|------|------|
| `waiting_faces` | å­—ç¬¦ä¸²åˆ—è¡¨ | ç­‰å¾… API å“åº”æ—¶å¾ªçŽ¯æ˜¾ç¤ºçš„é¢å­” | `["(âš”)", "(â›¨)", "(â–²)"]` |
| `thinking_faces` | å­—ç¬¦ä¸²åˆ—è¡¨ | æ¨¡åž‹æŽ¨ç†æœŸé—´å¾ªçŽ¯æ˜¾ç¤ºçš„é¢å­” | `["(âš”)", "(âŒ)", "(<>)"]` |
| `thinking_verbs` | å­—ç¬¦ä¸²åˆ—è¡¨ | spinner æ¶ˆæ¯ä¸­æ˜¾ç¤ºçš„åŠ¨è¯ | `["forging", "plotting", "hammering plans"]` |
| `wings` | [å·¦, å³] å¯¹çš„åˆ—è¡¨ | spinner å‘¨å›´çš„è£…é¥°æ‹¬å· | `[["âŸªâš”", "âš”âŸ«"], ["âŸªâ–²", "â–²âŸ«"]]` |

å½“ spinner å€¼ä¸ºç©ºæ—¶ï¼ˆå¦‚ `default` å’Œ `mono`ï¼‰ï¼Œå°†ä½¿ç”¨ `display.py` ä¸­çš„ç¡¬ç¼–ç é»˜è®¤å€¼ã€‚

### å“ç‰Œï¼ˆ`branding:`ï¼‰

CLI ç•Œé¢ä¸­ä½¿ç”¨çš„æ–‡å­—å­—ç¬¦ä¸²ã€‚

| é”® | æè¿° | é»˜è®¤å€¼ |
|----|------|--------|
| `agent_name` | æ¨ªå¹…æ ‡é¢˜å’ŒçŠ¶æ€æ˜¾ç¤ºä¸­çš„åç§° | `Zed Agent` |
| `welcome` | CLI å¯åŠ¨æ—¶æ˜¾ç¤ºçš„æ¬¢è¿Žæ¶ˆæ¯ | `Welcome to Zed Agent! Type your message or /help for commands.` |
| `goodbye` | é€€å‡ºæ—¶æ˜¾ç¤ºçš„æ¶ˆæ¯ | `Goodbye! âš•` |
| `response_label` | å“åº”æ¡†æ ‡é¢˜ä¸Šçš„æ ‡ç­¾ | ` âš• Zed ` |
| `prompt_symbol` | ç”¨æˆ·è¾“å…¥ prompt å‰çš„ç¬¦å·ï¼ˆè£¸ tokenï¼Œæ¸²æŸ“å™¨ä¼šåœ¨åŽé¢æ·»åŠ ç©ºæ ¼ï¼‰ | `â¯` |
| `help_header` | `/help` å‘½ä»¤è¾“å‡ºçš„æ ‡é¢˜æ–‡å­— | `(^_^)? Available Commands` |

### å…¶ä»–é¡¶çº§é”®

| é”® | ç±»åž‹ | æè¿° | é»˜è®¤å€¼ |
|----|------|------|--------|
| `tool_prefix` | å­—ç¬¦ä¸² | CLI ä¸­å·¥å…·è¾“å‡ºè¡Œçš„å‰ç¼€å­—ç¬¦ | `â”Š` |
| `tool_emojis` | å­—å…¸ | å„å·¥å…·çš„ emoji è¦†ç›–ï¼Œç”¨äºŽ spinner å’Œè¿›åº¦æ˜¾ç¤ºï¼ˆ`{tool_name: emoji}`ï¼‰ | `{}` |
| `banner_logo` | å­—ç¬¦ä¸² | Rich æ ‡è®° ASCII è‰ºæœ¯ logoï¼ˆæ›¿æ¢é»˜è®¤çš„ ZED_AGENT æ¨ªå¹…ï¼‰ | `""` |
| `banner_hero` | å­—ç¬¦ä¸² | Rich æ ‡è®°è‹±é›„è‰ºæœ¯å›¾ï¼ˆæ›¿æ¢é»˜è®¤çš„åŒè›‡æ–å›¾æ¡ˆï¼‰ | `""` |

## è‡ªå®šä¹‰çš®è‚¤

åœ¨ `~/.zed/skins/` ä¸‹åˆ›å»º YAML æ–‡ä»¶ã€‚ç”¨æˆ·çš®è‚¤ä¼šä»Žå†…ç½® `default` çš®è‚¤ç»§æ‰¿ç¼ºå¤±çš„å€¼ï¼Œå› æ­¤åªéœ€æŒ‡å®šè¦æ›´æ”¹çš„é”®ã€‚

### å®Œæ•´è‡ªå®šä¹‰çš®è‚¤ YAML æ¨¡æ¿

```yaml
# ~/.zed/skins/mytheme.yaml
# Complete skin template â€” all keys shown. Delete any you don't need;
# missing values automatically inherit from the 'default' skin.

name: mytheme
description: My custom theme

colors:
  banner_border: "#CD7F32"
  banner_title: "#FFD700"
  banner_accent: "#FFBF00"
  banner_dim: "#B8860B"
  banner_text: "#FFF8DC"
  ui_accent: "#FFBF00"
  ui_label: "#4dd0e1"
  ui_ok: "#4caf50"
  ui_error: "#ef5350"
  ui_warn: "#ffa726"
  prompt: "#FFF8DC"
  input_rule: "#CD7F32"
  response_border: "#FFD700"
  session_label: "#DAA520"
  session_border: "#8B8682"
  status_bar_bg: "#1a1a2e"
  voice_status_bg: "#1a1a2e"
  selection_bg: "#333355"
  completion_menu_bg: "#1a1a2e"
  completion_menu_current_bg: "#333355"
  completion_menu_meta_bg: "#1a1a2e"
  completion_menu_meta_current_bg: "#333355"

spinner:
  waiting_faces:
    - "(âš”)"
    - "(â›¨)"
    - "(â–²)"
  thinking_faces:
    - "(âš”)"
    - "(âŒ)"
    - "(<>)"
  thinking_verbs:
    - "processing"
    - "analyzing"
    - "computing"
    - "evaluating"
  wings:
    - ["âŸªâš¡", "âš¡âŸ«"]
    - ["âŸªâ—", "â—âŸ«"]

branding:
  agent_name: "My Agent"
  welcome: "Welcome to My Agent! Type your message or /help for commands."
  goodbye: "See you later! âš¡"
  response_label: " âš¡ My Agent "
  prompt_symbol: "âš¡"
  help_header: "(âš¡) Available Commands"

tool_prefix: "â”Š"

# Per-tool emoji overrides (optional)
tool_emojis:
  terminal: "âš”"
  web_search: "ðŸ”®"
  read_file: "ðŸ“„"

# Custom ASCII art banners (optional, Rich markup supported)
# banner_logo: |
#   [bold #FFD700] MY AGENT [/]
# banner_hero: |
#   [#FFD700]  Custom art here  [/]
```

### æœ€ç®€è‡ªå®šä¹‰çš®è‚¤ç¤ºä¾‹

ç”±äºŽæ‰€æœ‰å€¼éƒ½ç»§æ‰¿è‡ª `default`ï¼Œæœ€ç®€çš®è‚¤åªéœ€æŒ‡å®šè¦æ›´æ”¹çš„éƒ¨åˆ†ï¼š

```yaml
name: cyberpunk
description: Neon terminal theme

colors:
  banner_border: "#FF00FF"
  banner_title: "#00FFFF"
  banner_accent: "#FF1493"

spinner:
  thinking_verbs: ["jacking in", "decrypting", "uploading"]
  wings:
    - ["âŸ¨âš¡", "âš¡âŸ©"]

branding:
  agent_name: "Cyber Agent"
  response_label: " âš¡ Cyber "

tool_prefix: "â–"
```

## Zed Mod â€” å¯è§†åŒ–çš®è‚¤ç¼–è¾‘å™¨

[Zed Mod](https://github.com/cocktailpeanut/zed-mod) æ˜¯ä¸€ä¸ªç¤¾åŒºæž„å»ºçš„ Web UIï¼Œç”¨äºŽå¯è§†åŒ–åˆ›å»ºå’Œç®¡ç†çš®è‚¤ã€‚æ— éœ€æ‰‹å†™ YAMLï¼Œæä¾›å¸¦å®žæ—¶é¢„è§ˆçš„ç‚¹å‡»å¼ç¼–è¾‘å™¨ã€‚

![Zed Mod skin editor](https://raw.githubusercontent.com/cocktailpeanut/zed-mod/master/nous.png)

**åŠŸèƒ½è¯´æ˜Žï¼š**

- åˆ—å‡ºæ‰€æœ‰å†…ç½®å’Œè‡ªå®šä¹‰çš®è‚¤
- å°†ä»»æ„çš®è‚¤åœ¨å¯è§†åŒ–ç¼–è¾‘å™¨ä¸­æ‰“å¼€ï¼Œæ¶µç›–æ‰€æœ‰ Zed çš®è‚¤å­—æ®µï¼ˆé¢œè‰²ã€spinnerã€å“ç‰Œã€å·¥å…·å‰ç¼€ã€å·¥å…· emojiï¼‰
- æ ¹æ®æ–‡å­— prompt ç”Ÿæˆ `banner_logo` æ–‡å­—è‰ºæœ¯
- å°†ä¸Šä¼ çš„å›¾ç‰‡ï¼ˆPNGã€JPGã€GIFã€WEBPï¼‰è½¬æ¢ä¸º `banner_hero` ASCII è‰ºæœ¯ï¼Œæ”¯æŒå¤šç§æ¸²æŸ“é£Žæ ¼ï¼ˆç›²æ–‡ç‚¹é˜µã€ASCII å­—ç¬¦æ¸å˜ã€æ–¹å—ã€ç‚¹é˜µï¼‰
- ç›´æŽ¥ä¿å­˜åˆ° `~/.zed/skins/`
- é€šè¿‡æ›´æ–° `~/.zed/config.yaml` æ¿€æ´»çš®è‚¤
- æ˜¾ç¤ºç”Ÿæˆçš„ YAML åŠå®žæ—¶é¢„è§ˆ

### å®‰è£…

**æ–¹å¼ä¸€ â€” Pinokioï¼ˆä¸€é”®å®‰è£…ï¼‰ï¼š**

åœ¨ [pinokio.computer](https://pinokio.computer) ä¸Šæ‰¾åˆ°å¹¶ä¸€é”®å®‰è£…ã€‚

**æ–¹å¼äºŒ â€” npxï¼ˆç»ˆç«¯æœ€å¿«æ–¹å¼ï¼‰ï¼š**

```bash
npx -y zed-mod
```

**æ–¹å¼ä¸‰ â€” æ‰‹åŠ¨å®‰è£…ï¼š**

```bash
git clone https://github.com/cocktailpeanut/zed-mod.git
cd zed-mod/app
npm install
npm start
```

### ä½¿ç”¨æ–¹æ³•

1. å¯åŠ¨åº”ç”¨ï¼ˆé€šè¿‡ Pinokio æˆ–ç»ˆç«¯ï¼‰ã€‚
2. æ‰“å¼€ **Skin Studio**ã€‚
3. é€‰æ‹©è¦ç¼–è¾‘çš„å†…ç½®æˆ–è‡ªå®šä¹‰çš®è‚¤ã€‚
4. ä»Žæ–‡å­—ç”Ÿæˆ logoï¼Œå’Œ/æˆ–ä¸Šä¼ å›¾ç‰‡ä½œä¸ºè‹±é›„è‰ºæœ¯å›¾ã€‚é€‰æ‹©æ¸²æŸ“é£Žæ ¼å’Œå®½åº¦ã€‚
5. ç¼–è¾‘é¢œè‰²ã€spinnerã€å“ç‰ŒåŠå…¶ä»–å­—æ®µã€‚
6. ç‚¹å‡» **Save** å°†çš®è‚¤ YAML å†™å…¥ `~/.zed/skins/`ã€‚
7. ç‚¹å‡» **Activate** å°†å…¶è®¾ä¸ºå½“å‰çš®è‚¤ï¼ˆæ›´æ–° `config.yaml` ä¸­çš„ `display.skin`ï¼‰ã€‚

Zed Mod éµå¾ª `ZED_HOME` çŽ¯å¢ƒå˜é‡ï¼Œå› æ­¤ä¹Ÿé€‚ç”¨äºŽ[é…ç½®æ–‡ä»¶](/user-guide/profiles)ã€‚

## æ“ä½œè¯´æ˜Ž

- å†…ç½®çš®è‚¤ä»Ž `zed_cli/skin_engine.py` åŠ è½½ã€‚
- æœªçŸ¥çš®è‚¤è‡ªåŠ¨å›žé€€åˆ° `default`ã€‚
- `/skin` ç«‹å³æ›´æ–°å½“å‰ä¼šè¯çš„æ´»åŠ¨ CLI ä¸»é¢˜ã€‚
- `~/.zed/skins/` ä¸­çš„ç”¨æˆ·çš®è‚¤ä¼˜å…ˆäºŽåŒåå†…ç½®çš®è‚¤ã€‚
- é€šè¿‡ `/skin` åˆ‡æ¢çš®è‚¤ä»…å¯¹å½“å‰ä¼šè¯æœ‰æ•ˆã€‚å¦‚éœ€æ°¸ä¹…è®¾ä¸ºé»˜è®¤çš®è‚¤ï¼Œè¯·åœ¨ `config.yaml` ä¸­é…ç½®ã€‚
- `banner_logo` å’Œ `banner_hero` å­—æ®µæ”¯æŒ Rich æŽ§åˆ¶å°æ ‡è®°ï¼ˆä¾‹å¦‚ `[bold #FF0000]text[/]`ï¼‰ï¼Œå¯ç”¨äºŽå½©è‰² ASCII è‰ºæœ¯ã€‚