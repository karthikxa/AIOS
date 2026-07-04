---
sidebar_position: 8
title: "Memory Provider æ’ä»¶"
description: "å¦‚ä½•ä¸º Zed Agent æž„å»º memory provider æ’ä»¶"
---

# æž„å»º Memory Provider æ’ä»¶

Memory provider æ’ä»¶ä¸º Zed Agent æä¾›è·¨ä¼šè¯çš„æŒä¹…åŒ–çŸ¥è¯†ï¼Œè¶…è¶Šå†…ç½®çš„ MEMORY.md å’Œ USER.mdã€‚æœ¬æŒ‡å—ä»‹ç»å¦‚ä½•æž„å»ºä¸€ä¸ª memory provider æ’ä»¶ã€‚

:::tip
Memory provider æ˜¯ä¸¤ç§ **provider æ’ä»¶**ç±»åž‹ä¹‹ä¸€ã€‚å¦ä¸€ç§æ˜¯ [Context Engine æ’ä»¶](/developer-guide/context-engine-plugin)ï¼Œç”¨äºŽæ›¿æ¢å†…ç½®çš„ä¸Šä¸‹æ–‡åŽ‹ç¼©å™¨ã€‚ä¸¤è€…éµå¾ªç›¸åŒçš„æ¨¡å¼ï¼šå•é€‰ã€é…ç½®é©±åŠ¨ã€é€šè¿‡ `zed plugins` ç®¡ç†ã€‚
:::

## ç›®å½•ç»“æž„

æ¯ä¸ª memory provider ä½äºŽ `plugins/memory/<name>/`ï¼š

```
plugins/memory/my-provider/
â”œâ”€â”€ __init__.py      # MemoryProvider å®žçŽ° + register() å…¥å£ç‚¹
â”œâ”€â”€ plugin.yaml      # å…ƒæ•°æ®ï¼ˆnameã€descriptionã€hooksï¼‰
â””â”€â”€ README.md        # é…ç½®è¯´æ˜Žã€é…ç½®å‚è€ƒã€å·¥å…·
```

## MemoryProvider æŠ½è±¡åŸºç±»

ä½ çš„æ’ä»¶éœ€è¦å®žçŽ° `agent/memory_provider.py` ä¸­çš„ `MemoryProvider` æŠ½è±¡åŸºç±»ï¼ˆABCï¼‰ï¼š

```python
from agent.memory_provider import MemoryProvider

class MyMemoryProvider(MemoryProvider):
    @property
    def name(self) -> str:
        return "my-provider"

    def is_available(self) -> bool:
        """æ£€æŸ¥æ­¤ provider æ˜¯å¦å¯ä»¥æ¿€æ´»ã€‚ç¦æ­¢å‘èµ·ç½‘ç»œè¯·æ±‚ã€‚"""
        return bool(os.environ.get("MY_API_KEY"))

    def initialize(self, session_id: str, **kwargs) -> None:
        """åœ¨ agent å¯åŠ¨æ—¶è°ƒç”¨ä¸€æ¬¡ã€‚

        kwargs å§‹ç»ˆåŒ…å«ï¼š
          zed_home (str): å½“å‰æ´»è·ƒçš„ ZED_HOME è·¯å¾„ã€‚ç”¨äºŽå­˜å‚¨æ•°æ®ã€‚
        """
        self._api_key = os.environ.get("MY_API_KEY", "")
        self._session_id = session_id

    # ... å®žçŽ°å…¶ä½™æ–¹æ³•
```

## å¿…é¡»å®žçŽ°çš„æ–¹æ³•

### æ ¸å¿ƒç”Ÿå‘½å‘¨æœŸ

| æ–¹æ³• | è°ƒç”¨æ—¶æœº | æ˜¯å¦å¿…é¡»å®žçŽ°ï¼Ÿ |
|--------|-----------|-----------------|
| `name`ï¼ˆpropertyï¼‰ | å§‹ç»ˆ | **æ˜¯** |
| `is_available()` | agent åˆå§‹åŒ–ï¼Œæ¿€æ´»å‰ | **æ˜¯** â€” ç¦æ­¢ç½‘ç»œè¯·æ±‚ |
| `initialize(session_id, **kwargs)` | agent å¯åŠ¨ | **æ˜¯** |
| `get_tool_schemas()` | åˆå§‹åŒ–åŽï¼Œç”¨äºŽæ³¨å…¥å·¥å…· | **æ˜¯** |
| `handle_tool_call(name, args)` | agent è°ƒç”¨ä½ çš„å·¥å…·æ—¶ | **æ˜¯**ï¼ˆå¦‚æžœæœ‰å·¥å…·ï¼‰ |

### é…ç½®

| æ–¹æ³• | ç”¨é€” | æ˜¯å¦å¿…é¡»å®žçŽ°ï¼Ÿ |
|--------|---------|-----------------|
| `get_config_schema()` | ä¸º `zed memory setup` å£°æ˜Žé…ç½®å­—æ®µ | **æ˜¯** |
| `save_config(values, zed_home)` | å°†éžæ•æ„Ÿé…ç½®å†™å…¥åŽŸç”Ÿä½ç½® | **æ˜¯**ï¼ˆé™¤éžä»…ä½¿ç”¨çŽ¯å¢ƒå˜é‡ï¼‰ |

### å¯é€‰ Hook

| æ–¹æ³• | è°ƒç”¨æ—¶æœº | ä½¿ç”¨åœºæ™¯ |
|--------|-----------|----------|
| `system_prompt_block()` | ç³»ç»Ÿ prompt ç»„è£…æ—¶ | é™æ€ provider ä¿¡æ¯ |
| `prefetch(query)` | æ¯æ¬¡ API è°ƒç”¨å‰ | è¿”å›žå¬å›žçš„ä¸Šä¸‹æ–‡ |
| `queue_prefetch(query)` | æ¯è½®å¯¹è¯ç»“æŸåŽ | ä¸ºä¸‹ä¸€è½®é¢„çƒ­ |
| `sync_turn(user, assistant)` | æ¯è½®å¯¹è¯å®ŒæˆåŽ | æŒä¹…åŒ–å¯¹è¯å†…å®¹ |
| `on_session_end(messages)` | å¯¹è¯ç»“æŸæ—¶ | æœ€ç»ˆæå–/åˆ·æ–° |
| `on_pre_compress(messages)` | ä¸Šä¸‹æ–‡åŽ‹ç¼©å‰ | åœ¨ä¸¢å¼ƒå‰ä¿å­˜å…³é”®ä¿¡æ¯ |
| `on_memory_write(action, target, content)` | å†…ç½® memory å†™å…¥æ—¶ | åŒæ­¥åˆ°ä½ çš„åŽç«¯ |
| `shutdown()` | è¿›ç¨‹é€€å‡ºæ—¶ | æ¸…ç†è¿žæŽ¥ |

## é…ç½® Schema

`get_config_schema()` è¿”å›žä¸€ä¸ªå­—æ®µæè¿°ç¬¦åˆ—è¡¨ï¼Œä¾› `zed memory setup` ä½¿ç”¨ï¼š

```python
def get_config_schema(self):
    return [
        {
            "key": "api_key",
            "description": "My Provider API key",
            "secret": True,           # â†’ å†™å…¥ .env
            "required": True,
            "env_var": "MY_API_KEY",   # æ˜¾å¼æŒ‡å®šçŽ¯å¢ƒå˜é‡å
            "url": "https://my-provider.com/keys",  # èŽ·å–å¯†é’¥çš„åœ°å€
        },
        {
            "key": "region",
            "description": "Server region",
            "default": "us-east",
            "choices": ["us-east", "eu-west", "ap-south"],
        },
        {
            "key": "project",
            "description": "Project identifier",
            "default": "zed",
        },
    ]
```

`secret: True` ä¸”å¸¦æœ‰ `env_var` çš„å­—æ®µå†™å…¥ `.env`ã€‚éžæ•æ„Ÿå­—æ®µä¼ é€’ç»™ `save_config()`ã€‚

:::tip æœ€ç®€ Schema ä¸Žå®Œæ•´ Schema
`get_config_schema()` ä¸­çš„æ¯ä¸ªå­—æ®µéƒ½ä¼šåœ¨ `zed memory setup` æœŸé—´æç¤ºç”¨æˆ·è¾“å…¥ã€‚é€‰é¡¹è¾ƒå¤šçš„ provider åº”ä¿æŒ schema ç²¾ç®€â€”â€”åªåŒ…å«ç”¨æˆ·**å¿…é¡»**é…ç½®çš„å­—æ®µï¼ˆAPI keyã€å¿…è¦å‡­è¯ï¼‰ã€‚å¯é€‰é…ç½®è¯·åœ¨é…ç½®æ–‡ä»¶å‚è€ƒæ–‡æ¡£ä¸­è¯´æ˜Žï¼ˆä¾‹å¦‚ `$ZED_HOME/myprovider.json`ï¼‰ï¼Œè€Œä¸æ˜¯åœ¨ setup å‘å¯¼ä¸­é€ä¸€æç¤ºã€‚è¿™æ ·æ—¢èƒ½ä¿æŒ setup æµç¨‹ç®€æ´ï¼Œåˆæ”¯æŒé«˜çº§é…ç½®ã€‚å¯å‚è€ƒ Supermemory provider çš„å®žçŽ°â€”â€”å®ƒåªæç¤ºè¾“å…¥ API keyï¼Œå…¶ä½™é€‰é¡¹å‡ä½äºŽ `supermemory.json` ä¸­ã€‚
:::

## ä¿å­˜é…ç½®

```python
def save_config(self, values: dict, zed_home: str) -> None:
    """å°†éžæ•æ„Ÿé…ç½®å†™å…¥åŽŸç”Ÿä½ç½®ã€‚"""
    import json
    from pathlib import Path
    config_path = Path(zed_home) / "my-provider.json"
    config_path.write_text(json.dumps(values, indent=2))
```

å¯¹äºŽä»…ä½¿ç”¨çŽ¯å¢ƒå˜é‡çš„ providerï¼Œä¿ç•™é»˜è®¤çš„ç©ºå®žçŽ°å³å¯ã€‚

## æ’ä»¶å…¥å£ç‚¹

```python
def register(ctx) -> None:
    """ç”± memory æ’ä»¶å‘çŽ°ç³»ç»Ÿè°ƒç”¨ã€‚"""
    ctx.register_memory_provider(MyMemoryProvider())
```

## plugin.yaml

```yaml
name: my-provider
version: 1.0.0
description: "æ­¤ provider åŠŸèƒ½çš„ç®€çŸ­æè¿°ã€‚"
hooks:
  - on_session_end    # åˆ—å‡ºä½ å®žçŽ°çš„ hook
```

## çº¿ç¨‹çº¦å®š

**`sync_turn()` å¿…é¡»æ˜¯éžé˜»å¡žçš„ã€‚** å¦‚æžœä½ çš„åŽç«¯å­˜åœ¨å»¶è¿Ÿï¼ˆAPI è°ƒç”¨ã€LLM å¤„ç†ï¼‰ï¼Œè¯·åœ¨å®ˆæŠ¤çº¿ç¨‹ä¸­æ‰§è¡Œï¼š

```python
def sync_turn(self, user_content, assistant_content):
    def _sync():
        try:
            self._api.ingest(user_content, assistant_content)
        except Exception as e:
            logger.warning("Sync failed: %s", e)

    if self._sync_thread and self._sync_thread.is_alive():
        self._sync_thread.join(timeout=5.0)
    self._sync_thread = threading.Thread(target=_sync, daemon=True)
    self._sync_thread.start()
```

## Profile éš”ç¦»

æ‰€æœ‰å­˜å‚¨è·¯å¾„**å¿…é¡»**ä½¿ç”¨ `initialize()` ä¸­çš„ `zed_home` kwargï¼Œè€Œä¸æ˜¯ç¡¬ç¼–ç çš„ `~/.zed`ï¼š

```python
# æ­£ç¡® â€” æŒ‰ profile éš”ç¦»
from zed_constants import get_zed_home
data_dir = get_zed_home() / "my-provider"

# é”™è¯¯ â€” æ‰€æœ‰ profile å…±äº«
data_dir = Path("~/.zed/my-provider").expanduser()
```

## æµ‹è¯•

å®Œæ•´çš„ç«¯åˆ°ç«¯æµ‹è¯•æ¨¡å¼ï¼ˆä½¿ç”¨çœŸå®ž SQLite providerï¼‰è¯·å‚è§ `tests/agent/test_memory_plugin_e2e.py`ã€‚

```python
from agent.memory_manager import MemoryManager

mgr = MemoryManager()
mgr.add_provider(my_provider)
mgr.initialize_all(session_id="test-1", platform="cli")

# æµ‹è¯•å·¥å…·è·¯ç”±
result = mgr.handle_tool_call("my_tool", {"action": "add", "content": "test"})

# æµ‹è¯•ç”Ÿå‘½å‘¨æœŸ
mgr.sync_all("user msg", "assistant msg")
mgr.on_session_end([])
mgr.shutdown_all()
```

## æ·»åŠ  CLI å‘½ä»¤

Memory provider æ’ä»¶å¯ä»¥æ³¨å†Œè‡ªå·±çš„ CLI å­å‘½ä»¤æ ‘ï¼ˆä¾‹å¦‚ `zed my-provider status`ã€`zed my-provider config`ï¼‰ã€‚è¿™å¥—ç³»ç»ŸåŸºäºŽçº¦å®šå‘çŽ°ï¼Œæ— éœ€ä¿®æ”¹æ ¸å¿ƒæ–‡ä»¶ã€‚

### å·¥ä½œåŽŸç†

1. åœ¨æ’ä»¶ç›®å½•ä¸­æ·»åŠ  `cli.py` æ–‡ä»¶
2. å®šä¹‰ `register_cli(subparser)` å‡½æ•°æ¥æž„å»º argparse æ ‘
3. memory æ’ä»¶ç³»ç»Ÿåœ¨å¯åŠ¨æ—¶é€šè¿‡ `discover_plugin_cli_commands()` è‡ªåŠ¨å‘çŽ°
4. ä½ çš„å‘½ä»¤ä»¥ `zed <provider-name> <subcommand>` çš„å½¢å¼å‡ºçŽ°

**ä»…å¯¹æ´»è·ƒ provider å¼€æ”¾ï¼š** ä½ çš„ CLI å‘½ä»¤åªåœ¨ä½ çš„ provider æ˜¯é…ç½®ä¸­æ´»è·ƒçš„ `memory.provider` æ—¶æ‰ä¼šå‡ºçŽ°ã€‚å¦‚æžœç”¨æˆ·å°šæœªé…ç½®ä½ çš„ providerï¼Œä½ çš„å‘½ä»¤ä¸ä¼šæ˜¾ç¤ºåœ¨ `zed --help` ä¸­ã€‚

### ç¤ºä¾‹

```python
# plugins/memory/my-provider/cli.py

def my_command(args):
    """ç”± argparse åˆ†å‘çš„å¤„ç†å‡½æ•°ã€‚"""
    sub = getattr(args, "my_command", None)
    if sub == "status":
        print("Provider is active and connected.")
    elif sub == "config":
        print("Showing config...")
    else:
        print("Usage: zed my-provider <status|config>")

def register_cli(subparser) -> None:
    """æž„å»º zed my-provider çš„ argparse æ ‘ã€‚

    åœ¨ argparse åˆå§‹åŒ–æ—¶ç”± discover_plugin_cli_commands() è°ƒç”¨ã€‚
    """
    subs = subparser.add_subparsers(dest="my_command")
    subs.add_parser("status", help="Show provider status")
    subs.add_parser("config", help="Show provider config")
    subparser.set_defaults(func=my_command)
```

### å‚è€ƒå®žçŽ°

å®Œæ•´ç¤ºä¾‹è¯·å‚è§ `plugins/memory/honcho/cli.py`ï¼ŒåŒ…å« 13 ä¸ªå­å‘½ä»¤ã€è·¨ profile ç®¡ç†ï¼ˆ`--target-profile`ï¼‰ä»¥åŠé…ç½®è¯»å†™ã€‚

### å« CLI çš„ç›®å½•ç»“æž„

```
plugins/memory/my-provider/
â”œâ”€â”€ __init__.py      # MemoryProvider å®žçŽ° + register()
â”œâ”€â”€ plugin.yaml      # å…ƒæ•°æ®
â”œâ”€â”€ cli.py           # register_cli(subparser) â€” CLI å‘½ä»¤
â””â”€â”€ README.md        # é…ç½®è¯´æ˜Ž
```

## å• Provider è§„åˆ™

åŒä¸€æ—¶é—´åªèƒ½æœ‰**ä¸€ä¸ª**å¤–éƒ¨ memory provider å¤„äºŽæ´»è·ƒçŠ¶æ€ã€‚å¦‚æžœç”¨æˆ·å°è¯•æ³¨å†Œç¬¬äºŒä¸ªï¼ŒMemoryManager ä¼šæ‹’ç»å¹¶å‘å‡ºè­¦å‘Šã€‚è¿™å¯ä»¥é˜²æ­¢å·¥å…· schema è†¨èƒ€å’ŒåŽç«¯å†²çªã€‚