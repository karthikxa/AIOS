---
sidebar_position: 8
title: "æ‰©å±• CLI"
description: "æž„å»ºåŒ…è£… CLIï¼Œé€šè¿‡è‡ªå®šä¹‰ widgetã€å¿«æ·é”®å’Œå¸ƒå±€å˜æ›´æ¥æ‰©å±• Zed TUI"
---

# æ‰©å±• CLI

Zed åœ¨ `ZedCLI` ä¸Šæš´éœ²äº†å—ä¿æŠ¤çš„æ‰©å±• hookï¼ˆé’©å­ï¼‰ï¼Œä½¿åŒ…è£… CLI å¯ä»¥æ·»åŠ  widgetã€å¿«æ·é”®å’Œå¸ƒå±€è‡ªå®šä¹‰ï¼Œè€Œæ— éœ€è¦†ç›–è¶…è¿‡ 1000 è¡Œçš„ `run()` æ–¹æ³•ã€‚è¿™æ ·å¯ä»¥è®©ä½ çš„æ‰©å±•ä¸Žå†…éƒ¨å˜æ›´è§£è€¦ã€‚

## æ‰©å±•ç‚¹

å…±æœ‰äº”ä¸ªæ‰©å±•æŽ¥ç¼å¯ç”¨ï¼š

| Hook | ç”¨é€” | ä½•æ—¶è¦†ç›– |
|------|---------|------------------|
| `_get_extra_tui_widgets()` | å‘å¸ƒå±€æ³¨å…¥ widget | éœ€è¦æŒä¹… UI å…ƒç´ ï¼ˆé¢æ¿ã€çŠ¶æ€æ ã€è¿·ä½ æ’­æ”¾å™¨ï¼‰æ—¶ |
| `_register_extra_tui_keybindings(kb, *, input_area)` | æ·»åŠ é”®ç›˜å¿«æ·é”® | éœ€è¦çƒ­é”®ï¼ˆåˆ‡æ¢é¢æ¿ã€ä¼ è¾“æŽ§åˆ¶ã€æ¨¡æ€å¿«æ·é”®ï¼‰æ—¶ |
| `_build_tui_layout_children(**widgets)` | å®Œå…¨æŽ§åˆ¶ widget æŽ’åº | éœ€è¦é‡æ–°æŽ’åºæˆ–åŒ…è£…çŽ°æœ‰ widget æ—¶ï¼ˆå°‘è§ï¼‰ |
| `process_command()` | æ·»åŠ è‡ªå®šä¹‰æ–œæ å‘½ä»¤ | éœ€è¦å¤„ç† `/mycommand` æ—¶ï¼ˆå·²æœ‰ hookï¼‰ |
| `_build_tui_style_dict()` | è‡ªå®šä¹‰ prompt_toolkit æ ·å¼ | éœ€è¦è‡ªå®šä¹‰é¢œè‰²æˆ–æ ·å¼æ—¶ï¼ˆå·²æœ‰ hookï¼‰ |

å‰ä¸‰ä¸ªæ˜¯æ–°å¢žçš„å—ä¿æŠ¤ hookï¼ŒåŽä¸¤ä¸ªå·²å­˜åœ¨ã€‚

## å¿«é€Ÿå¼€å§‹ï¼šåŒ…è£… CLI

```python
#!/usr/bin/env python3
"""my_cli.py â€” Example wrapper CLI that extends Zed."""

from cli import ZedCLI
from prompt_toolkit.layout import FormattedTextControl, Window
from prompt_toolkit.filters import Condition


class MyCLI(ZedCLI):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._panel_visible = False

    def _get_extra_tui_widgets(self):
        """Add a toggleable info panel above the status bar."""
        cli_ref = self
        return [
            Window(
                FormattedTextControl(lambda: "ðŸ“Š My custom panel content"),
                height=1,
                filter=Condition(lambda: cli_ref._panel_visible),
            ),
        ]

    def _register_extra_tui_keybindings(self, kb, *, input_area):
        """F2 toggles the custom panel."""
        cli_ref = self

        @kb.add("f2")
        def _toggle_panel(event):
            cli_ref._panel_visible = not cli_ref._panel_visible

    def process_command(self, cmd: str) -> bool:
        """Add a /panel slash command."""
        if cmd.strip().lower() == "/panel":
            self._panel_visible = not self._panel_visible
            state = "visible" if self._panel_visible else "hidden"
            print(f"Panel is now {state}")
            return True
        return super().process_command(cmd)


if __name__ == "__main__":
    cli = MyCLI()
    cli.run()
```

è¿è¡Œï¼š

```bash
cd ~/.zed/zed-agent
source .venv/bin/activate
python my_cli.py
```

## Hook å‚è€ƒ

### `_get_extra_tui_widgets()`

è¿”å›žè¦æ’å…¥ TUI å¸ƒå±€çš„ prompt_toolkit widget åˆ—è¡¨ã€‚Widget å‡ºçŽ°åœ¨**é—´éš”åŒºä¸ŽçŠ¶æ€æ ä¹‹é—´**â€”â€”ä½äºŽè¾“å…¥åŒºä¸Šæ–¹ã€ä¸»è¾“å‡ºåŒºä¸‹æ–¹ã€‚

```python
def _get_extra_tui_widgets(self) -> list:
    return []  # default: no extra widgets
```

æ¯ä¸ª widget åº”ä¸º prompt_toolkit å®¹å™¨ï¼ˆå¦‚ `Window`ã€`ConditionalContainer`ã€`HSplit`ï¼‰ã€‚ä½¿ç”¨ `ConditionalContainer` æˆ– `filter=Condition(...)` å¯ä½¿ widget æ”¯æŒåˆ‡æ¢æ˜¾ç¤ºã€‚

```python
from prompt_toolkit.layout import ConditionalContainer, Window, FormattedTextControl
from prompt_toolkit.filters import Condition

def _get_extra_tui_widgets(self):
    return [
        ConditionalContainer(
            Window(FormattedTextControl("Status: connected"), height=1),
            filter=Condition(lambda: self._show_status),
        ),
    ]
```

### `_register_extra_tui_keybindings(kb, *, input_area)`

åœ¨ Zed æ³¨å†Œè‡ªèº«å¿«æ·é”®ä¹‹åŽã€å¸ƒå±€æž„å»ºä¹‹å‰è°ƒç”¨ã€‚å°†ä½ çš„å¿«æ·é”®æ·»åŠ åˆ° `kb`ã€‚

```python
def _register_extra_tui_keybindings(self, kb, *, input_area):
    pass  # default: no extra keybindings
```

å‚æ•°ï¼š
- **`kb`** â€” prompt_toolkit åº”ç”¨çš„ `KeyBindings` å®žä¾‹
- **`input_area`** â€” ä¸» `TextArea` widgetï¼Œç”¨äºŽè¯»å–æˆ–æ“ä½œç”¨æˆ·è¾“å…¥

```python
def _register_extra_tui_keybindings(self, kb, *, input_area):
    cli_ref = self

    @kb.add("f3")
    def _clear_input(event):
        input_area.text = ""

    @kb.add("f4")
    def _insert_template(event):
        input_area.text = "/search "
```

**é¿å…ä¸Žå†…ç½®å¿«æ·é”®å†²çª**ï¼š`Enter`ï¼ˆæäº¤ï¼‰ã€`Escape Enter`ï¼ˆæ¢è¡Œï¼‰ã€`Ctrl-C`ï¼ˆä¸­æ–­ï¼‰ã€`Ctrl-D`ï¼ˆé€€å‡ºï¼‰ã€`Tab`ï¼ˆæŽ¥å—è‡ªåŠ¨å»ºè®®ï¼‰ã€‚F2 åŠä»¥ä¸Šçš„åŠŸèƒ½é”®å’Œ Ctrl ç»„åˆé”®é€šå¸¸æ˜¯å®‰å…¨çš„ã€‚

### `_build_tui_layout_children(**widgets)`

ä»…åœ¨éœ€è¦å®Œå…¨æŽ§åˆ¶ widget æŽ’åºæ—¶æ‰è¦†ç›–æ­¤æ–¹æ³•ã€‚å¤§å¤šæ•°æ‰©å±•åº”ä½¿ç”¨ `_get_extra_tui_widgets()` ä»£æ›¿ã€‚

```python
def _build_tui_layout_children(self, *, sudo_widget, secret_widget,
    approval_widget, clarify_widget, model_picker_widget=None,
    spinner_widget=None, spacer, status_bar, input_rule_top,
    image_bar, input_area, input_rule_bot, voice_status_bar,
    completions_menu) -> list:
```

é»˜è®¤å®žçŽ°è¿”å›žï¼ˆå€¼ä¸º `None` çš„ widget ä¼šè¢«è¿‡æ»¤æŽ‰ï¼‰ï¼š

```python
[
    Window(height=0),       # anchor
    sudo_widget,            # sudo password prompt (conditional)
    secret_widget,          # secret input prompt (conditional)
    approval_widget,        # dangerous command approval (conditional)
    clarify_widget,         # clarify question UI (conditional)
    model_picker_widget,    # model picker overlay (conditional)
    spinner_widget,         # thinking spinner (conditional)
    spacer,                 # fills remaining vertical space
    *self._get_extra_tui_widgets(),  # YOUR WIDGETS GO HERE
    status_bar,             # model/token/context status line
    input_rule_top,         # â”€â”€â”€ border above input
    image_bar,              # attached images indicator
    input_area,             # user text input
    input_rule_bot,         # â”€â”€â”€ border below input
    voice_status_bar,       # voice mode status (conditional)
    completions_menu,       # autocomplete dropdown
]
```

## å¸ƒå±€ç¤ºæ„å›¾

é»˜è®¤å¸ƒå±€ä»Žä¸Šåˆ°ä¸‹ï¼š

1. **è¾“å‡ºåŒº** â€” æ»šåŠ¨çš„å¯¹è¯åŽ†å²
2. **é—´éš”åŒº**
3. **é¢å¤– widget** â€” æ¥è‡ª `_get_extra_tui_widgets()`
4. **çŠ¶æ€æ ** â€” æ¨¡åž‹ã€ä¸Šä¸‹æ–‡å æ¯”ã€å·²ç”¨æ—¶é—´
5. **å›¾ç‰‡æ ** â€” å·²é™„åŠ å›¾ç‰‡æ•°é‡
6. **è¾“å…¥åŒº** â€” ç”¨æˆ· promptï¼ˆæç¤ºè¯ï¼‰
7. **è¯­éŸ³çŠ¶æ€** â€” å½•éŸ³æŒ‡ç¤ºå™¨
8. **è¡¥å…¨èœå•** â€” è‡ªåŠ¨è¡¥å…¨å»ºè®®

## ä½¿ç”¨æŠ€å·§

- **çŠ¶æ€å˜æ›´åŽåˆ·æ–°æ˜¾ç¤º**ï¼šè°ƒç”¨ `self._invalidate()` è§¦å‘ prompt_toolkit é‡ç»˜ã€‚
- **è®¿é—® agent çŠ¶æ€**ï¼š`self.agent`ã€`self.model`ã€`self.conversation_history` å‡å¯ç›´æŽ¥ä½¿ç”¨ã€‚
- **è‡ªå®šä¹‰æ ·å¼**ï¼šè¦†ç›– `_build_tui_style_dict()` å¹¶ä¸ºè‡ªå®šä¹‰æ ·å¼ç±»æ·»åŠ æ¡ç›®ã€‚
- **æ–œæ å‘½ä»¤**ï¼šè¦†ç›– `process_command()`ï¼Œå¤„ç†è‡ªå·±çš„å‘½ä»¤ï¼Œå…¶ä½™ä¸€å¾‹è°ƒç”¨ `super().process_command(cmd)`ã€‚
- **ä¸è¦è¦†ç›– `run()`**ï¼Œé™¤éžç»å¯¹å¿…è¦â€”â€”æ‰©å±• hook çš„å­˜åœ¨æ­£æ˜¯ä¸ºäº†é¿å…è¿™ç§è€¦åˆã€‚