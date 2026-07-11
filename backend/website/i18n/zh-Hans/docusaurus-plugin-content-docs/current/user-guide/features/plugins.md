---
sidebar_position: 11
sidebar_label: "Plugins"
title: "Plugins"
description: "é€šè¿‡æ’ä»¶ç³»ç»Ÿä¸º Zed æ·»åŠ è‡ªå®šä¹‰å·¥å…·ã€hook å’Œé›†æˆ"
---

# Plugins

Zed æä¾›äº†ä¸€å¥—æ’ä»¶ç³»ç»Ÿï¼Œå¯åœ¨ä¸ä¿®æ”¹æ ¸å¿ƒä»£ç çš„æƒ…å†µä¸‹æ·»åŠ è‡ªå®šä¹‰å·¥å…·ã€hookï¼ˆé’©å­ï¼‰å’Œé›†æˆã€‚

å¦‚æžœä½ æƒ³ä¸ºè‡ªå·±ã€å›¢é˜Ÿæˆ–æŸä¸ªé¡¹ç›®åˆ›å»ºè‡ªå®šä¹‰å·¥å…·ï¼Œè¿™é€šå¸¸æ˜¯æ­£ç¡®çš„è·¯å¾„ã€‚å¼€å‘è€…æŒ‡å—ä¸­çš„
[Adding Tools](/developer-guide/adding-tools) é¡µé¢é’ˆå¯¹çš„æ˜¯å­˜æ”¾åœ¨ `tools/` å’Œ `toolsets.py` ä¸­çš„ Zed å†…ç½®æ ¸å¿ƒå·¥å…·ã€‚

**â†’ [æž„å»º Zed Plugin](/guides/build-a-zed-plugin)** â€” åŒ…å«å®Œæ•´å¯è¿è¡Œç¤ºä¾‹çš„åˆ†æ­¥æŒ‡å—ã€‚

## å¿«é€Ÿæ¦‚è§ˆ

åœ¨ `~/.zed/plugins/` ä¸‹æ”¾å…¥ä¸€ä¸ªç›®å½•ï¼ŒåŒ…å« `plugin.yaml` å’Œ Python ä»£ç ï¼š

```
~/.zed/plugins/my-plugin/
â”œâ”€â”€ plugin.yaml      # manifestï¼ˆæ¸…å•ï¼‰
â”œâ”€â”€ __init__.py      # register() â€” å°† schema ä¸Žå¤„ç†å™¨ç»‘å®š
â”œâ”€â”€ schemas.py       # tool schemaï¼ˆLLM æ‰€è§çš„å†…å®¹ï¼‰
â””â”€â”€ tools.py         # tool å¤„ç†å™¨ï¼ˆè°ƒç”¨æ—¶å®žé™…æ‰§è¡Œçš„ä»£ç ï¼‰
```

å¯åŠ¨ Zed â€” ä½ çš„å·¥å…·ä¼šä¸Žå†…ç½®å·¥å…·ä¸€åŒå‡ºçŽ°ï¼Œæ¨¡åž‹å¯ç«‹å³è°ƒç”¨å®ƒä»¬ã€‚

### æœ€å°å¯è¿è¡Œç¤ºä¾‹

ä»¥ä¸‹æ˜¯ä¸€ä¸ªå®Œæ•´æ’ä»¶ï¼Œæ·»åŠ äº†ä¸€ä¸ª `hello_world` å·¥å…·ï¼Œå¹¶é€šè¿‡ hook è®°å½•æ¯æ¬¡å·¥å…·è°ƒç”¨ã€‚

**`~/.zed/plugins/hello-world/plugin.yaml`**

```yaml
name: hello-world
version: "1.0"
description: A minimal example plugin
```

**`~/.zed/plugins/hello-world/__init__.py`**

```python
"""Minimal Zed plugin â€” registers a tool and a hook."""

import json


def register(ctx):
    # --- Tool: hello_world ---
    schema = {
        "name": "hello_world",
        "description": "Returns a friendly greeting for the given name.",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name to greet",
                }
            },
            "required": ["name"],
        },
    }

    def handle_hello(params, **kwargs):
        del kwargs
        name = params.get("name", "World")
        return json.dumps({"success": True, "greeting": f"Hello, {name}!"})

    ctx.register_tool(
        name="hello_world",
        toolset="hello_world",
        schema=schema,
        handler=handle_hello,
        description="Return a friendly greeting for the given name.",
    )

    # --- Hook: log every tool call ---
    def on_tool_call(tool_name, params, result):
        print(f"[hello-world] tool called: {tool_name}")

    ctx.register_hook("post_tool_call", on_tool_call)
```

å°†ä¸¤ä¸ªæ–‡ä»¶æ”¾å…¥ `~/.zed/plugins/hello-world/`ï¼Œé‡å¯ Zedï¼Œæ¨¡åž‹å³å¯ç«‹å³è°ƒç”¨ `hello_world`ã€‚æ¯æ¬¡å·¥å…·è°ƒç”¨åŽï¼Œhook ä¼šæ‰“å°ä¸€è¡Œæ—¥å¿—ã€‚

`./.zed/plugins/` ä¸‹çš„é¡¹ç›®æœ¬åœ°æ’ä»¶é»˜è®¤ç¦ç”¨ã€‚ä»…å¯¹å¯ä¿¡ä»“åº“å¯ç”¨ï¼Œæ–¹æ³•æ˜¯åœ¨å¯åŠ¨ Zed å‰è®¾ç½® `ZED_ENABLE_PROJECT_PLUGINS=true`ã€‚

## æ’ä»¶èƒ½åšä»€ä¹ˆ

ä»¥ä¸‹æ‰€æœ‰ `ctx.*` API å‡å¯åœ¨æ’ä»¶çš„ `register(ctx)` å‡½æ•°ä¸­ä½¿ç”¨ã€‚

| èƒ½åŠ› | æ–¹å¼ |
|-----------|-----|
| æ·»åŠ å·¥å…· | `ctx.register_tool(name=..., toolset=..., schema=..., handler=...)` |
| æ·»åŠ  hook | `ctx.register_hook("post_tool_call", callback)` |
| æ·»åŠ æ–œæ å‘½ä»¤ | `ctx.register_command(name, handler, description)` â€” åœ¨ CLI å’Œ gateway ä¼šè¯ä¸­æ·»åŠ  `/name` |
| ä»Žå‘½ä»¤ä¸­è°ƒåº¦å·¥å…· | `ctx.dispatch_tool(name, args)` â€” è°ƒç”¨å·²æ³¨å†Œçš„å·¥å…·ï¼Œè‡ªåŠ¨æ³¨å…¥çˆ¶ agent ä¸Šä¸‹æ–‡ |
| æ·»åŠ  CLI å‘½ä»¤ | `ctx.register_cli_command(name, help, setup_fn, handler_fn)` â€” æ·»åŠ  `zed <plugin> <subcommand>` |
| æ³¨å…¥æ¶ˆæ¯ | `ctx.inject_message(content, role="user")` â€” å‚è§ [æ³¨å…¥æ¶ˆæ¯](#injecting-messages) |
| é™„å¸¦æ•°æ®æ–‡ä»¶ | `Path(__file__).parent / "data" / "file.yaml"` |
| æ‰“åŒ… skill | `ctx.register_skill(name, path)` â€” å‘½åç©ºé—´ä¸º `plugin:skill`ï¼Œé€šè¿‡ `skill_view("plugin:skill")` åŠ è½½ |
| æŒ‰çŽ¯å¢ƒå˜é‡æŽ§åˆ¶ | åœ¨ plugin.yaml ä¸­è®¾ç½® `requires_env: [API_KEY]` â€” åœ¨ `zed plugins install` æ—¶æç¤ºè¾“å…¥ |
| é€šè¿‡ pip åˆ†å‘ | `[project.entry-points."zed_agent.plugins"]` |
| æ³¨å†Œ gateway å¹³å°ï¼ˆDiscordã€Telegramã€IRC ç­‰ï¼‰ | `ctx.register_platform(name, label, adapter_factory, check_fn, ...)` â€” å‚è§ [Adding Platform Adapters](/developer-guide/adding-platform-adapters) |
| æ³¨å†Œå›¾åƒç”ŸæˆåŽç«¯ | `ctx.register_image_gen_provider(provider)` â€” å‚è§ [Image Generation Provider Plugins](/developer-guide/image-gen-provider-plugin) |
| æ³¨å†Œè§†é¢‘ç”ŸæˆåŽç«¯ | `ctx.register_video_gen_provider(provider)` â€” å‚è§ [Video Generation Provider Plugins](/developer-guide/video-gen-provider-plugin) |
| æ³¨å†Œä¸Šä¸‹æ–‡åŽ‹ç¼©å¼•æ“Ž | `ctx.register_context_engine(engine)` â€” å‚è§ [Context Engine Plugins](/developer-guide/context-engine-plugin) |
| æ³¨å†Œ memory åŽç«¯ | åœ¨ `plugins/memory/<name>/__init__.py` ä¸­ç»§æ‰¿ `MemoryProvider` â€” å‚è§ [Memory Provider Plugins](/developer-guide/memory-provider-plugin)ï¼ˆä½¿ç”¨ç‹¬ç«‹å‘çŽ°ç³»ç»Ÿï¼‰ |
| è°ƒç”¨å®¿ä¸» LLM | `ctx.llm.complete(...)` / `ctx.llm.complete_structured(...)` â€” å€Ÿç”¨ç”¨æˆ·å½“å‰æ¿€æ´»çš„æ¨¡åž‹å’Œè®¤è¯ï¼Œè¿›è¡Œä¸€æ¬¡æ€§è¡¥å…¨ï¼Œæ”¯æŒå¯é€‰ JSON schema éªŒè¯ã€‚å‚è§ [Plugin LLM Access](/developer-guide/plugin-llm-access) |
| æ³¨å†ŒæŽ¨ç†åŽç«¯ï¼ˆLLM providerï¼‰ | åœ¨ `plugins/model-providers/<name>/__init__.py` ä¸­è°ƒç”¨ `register_provider(ProviderProfile(...))` â€” å‚è§ [Model Provider Plugins](/developer-guide/model-provider-plugin)ï¼ˆä½¿ç”¨ç‹¬ç«‹å‘çŽ°ç³»ç»Ÿï¼‰ |

## æ’ä»¶å‘çŽ°

| æ¥æº | è·¯å¾„ | ä½¿ç”¨åœºæ™¯ |
|--------|------|----------|
| å†…ç½® | `<repo>/plugins/` | éš Zed é™„å¸¦ â€” å‚è§ [Built-in Plugins](/user-guide/features/built-in-plugins) |
| ç”¨æˆ· | `~/.zed/plugins/` | ä¸ªäººæ’ä»¶ |
| é¡¹ç›® | `.zed/plugins/` | é¡¹ç›®ä¸“å±žæ’ä»¶ï¼ˆéœ€è¦ `ZED_ENABLE_PROJECT_PLUGINS=true`ï¼‰ |
| pip | `zed_agent.plugins` entry_points | åˆ†å‘åŒ… |
| Nix | `services.zed-agent.extraPlugins` / `extraPythonPackages` | NixOS å£°æ˜Žå¼å®‰è£… â€” å‚è§ [Nix Setup](/getting-started/nix-setup#plugins) |

åç§°å†²çªæ—¶ï¼ŒåŽé¢çš„æ¥æºä¼šè¦†ç›–å‰é¢çš„ï¼Œå› æ­¤ä¸Žå†…ç½®æ’ä»¶åŒåçš„ç”¨æˆ·æ’ä»¶ä¼šæ›¿æ¢å®ƒã€‚

### æ’ä»¶å­åˆ†ç±»

åœ¨æ¯ä¸ªæ¥æºå†…ï¼ŒZed è¿˜è¯†åˆ«å°†æ’ä»¶è·¯ç”±åˆ°ä¸“ç”¨å‘çŽ°ç³»ç»Ÿçš„å­åˆ†ç±»ç›®å½•ï¼š

| å­ç›®å½• | å†…å®¹ | å‘çŽ°ç³»ç»Ÿ |
|---|---|---|
| `plugins/`ï¼ˆæ ¹ç›®å½•ï¼‰ | é€šç”¨æ’ä»¶ â€” å·¥å…·ã€hookã€æ–œæ å‘½ä»¤ã€CLI å‘½ä»¤ã€æ‰“åŒ… skill | `PluginManager`ï¼ˆkind: `standalone` æˆ– `backend`ï¼‰ |
| `plugins/platforms/<name>/` | Gateway é¢‘é“é€‚é…å™¨ï¼ˆ`ctx.register_platform()`ï¼‰ | `PluginManager`ï¼ˆkind: `platform`ï¼Œæ·±ä¸€å±‚ï¼‰ |
| `plugins/image_gen/<name>/` | å›¾åƒç”ŸæˆåŽç«¯ï¼ˆ`ctx.register_image_gen_provider()`ï¼‰ | `PluginManager`ï¼ˆkind: `backend`ï¼Œæ·±ä¸€å±‚ï¼‰ |
| `plugins/memory/<name>/` | Memory providerï¼ˆç»§æ‰¿ `MemoryProvider`ï¼‰ | **ç‹¬ç«‹åŠ è½½å™¨**ï¼Œä½äºŽ `plugins/memory/__init__.py`ï¼ˆkind: `exclusive` â€” åŒæ—¶åªæœ‰ä¸€ä¸ªæ¿€æ´»ï¼‰ |
| `plugins/context_engine/<name>/` | ä¸Šä¸‹æ–‡åŽ‹ç¼©å¼•æ“Žï¼ˆ`ctx.register_context_engine()`ï¼‰ | **ç‹¬ç«‹åŠ è½½å™¨**ï¼Œä½äºŽ `plugins/context_engine/__init__.py`ï¼ˆåŒæ—¶åªæœ‰ä¸€ä¸ªæ¿€æ´»ï¼‰ |
| `plugins/model-providers/<name>/` | LLM provider profileï¼ˆ`register_provider(ProviderProfile(...))`ï¼‰ | **ç‹¬ç«‹åŠ è½½å™¨**ï¼Œä½äºŽ `providers/__init__.py`ï¼ˆé¦–æ¬¡è°ƒç”¨ `get_provider_profile()` æ—¶æ‡’åŠ è½½æ‰«æï¼‰ |

`~/.zed/plugins/model-providers/<name>/` å’Œ `~/.zed/plugins/memory/<name>/` ä¸‹çš„ç”¨æˆ·æ’ä»¶ä¼šè¦†ç›–åŒåå†…ç½®æ’ä»¶ â€” `register_provider()` / `register_memory_provider()` ä¸­åŽå†™è€…èƒœå‡ºã€‚æ”¾å…¥ä¸€ä¸ªç›®å½•å³å¯æ›¿æ¢å†…ç½®å®žçŽ°ï¼Œæ— éœ€ä¿®æ”¹ä»“åº“ã€‚

å­åˆ†ç±»æ’ä»¶åœ¨ `zed plugins list` å’Œäº¤äº’å¼ `zed plugins` UI ä¸­ä»¥**è·¯å¾„æ´¾ç”Ÿçš„ key** æ˜¾ç¤º â€” ä¾‹å¦‚ `observability/langfuse`ã€`image_gen/openai`ã€`platforms/teams`ã€‚è¯¥ keyï¼ˆè€Œéž manifest ä¸­çš„ `name:`ï¼‰æ˜¯ä¼ ç»™ `zed plugins enable â€¦` / `disable â€¦` çš„å€¼ï¼Œä¹Ÿæ˜¯åœ¨ `config.yaml` çš„ `plugins.enabled` ä¸‹å¡«å†™çš„å­—ç¬¦ä¸²ã€‚

## æ’ä»¶é»˜è®¤å…³é—­ï¼ˆå°‘æ•°ä¾‹å¤–ï¼‰

**é€šç”¨æ’ä»¶å’Œç”¨æˆ·å®‰è£…çš„åŽç«¯é»˜è®¤ç¦ç”¨** â€” å‘çŽ°ç³»ç»Ÿä¼šæ‰¾åˆ°å®ƒä»¬ï¼ˆå› æ­¤å®ƒä»¬ä¼šå‡ºçŽ°åœ¨ `zed plugins` å’Œ `/plugins` ä¸­ï¼‰ï¼Œä½†åœ¨ä½ å°†æ’ä»¶åç§°æ·»åŠ åˆ° `~/.zed/config.yaml` çš„ `plugins.enabled` ä¹‹å‰ï¼Œä»»ä½•å¸¦æœ‰ hook æˆ–å·¥å…·çš„å†…å®¹éƒ½ä¸ä¼šåŠ è½½ã€‚è¿™å¯é˜²æ­¢ç¬¬ä¸‰æ–¹ä»£ç åœ¨æœªç»æ˜Žç¡®åŒæ„çš„æƒ…å†µä¸‹è¿è¡Œã€‚

```yaml
plugins:
  enabled:
    - my-tool-plugin
    - disk-cleanup
  disabled:       # å¯é€‰çš„æ‹’ç»åˆ—è¡¨ â€” è‹¥åç§°åŒæ—¶å‡ºçŽ°åœ¨ä¸¤ä¸ªåˆ—è¡¨ä¸­ï¼Œæ­¤åˆ—è¡¨å§‹ç»ˆä¼˜å…ˆ
    - noisy-plugin
```

åˆ‡æ¢çŠ¶æ€çš„ä¸‰ç§æ–¹å¼ï¼š

```bash
zed plugins                    # äº¤äº’å¼åˆ‡æ¢ï¼ˆç©ºæ ¼å‹¾é€‰/å–æ¶ˆå‹¾é€‰ï¼‰
zed plugins enable <name>      # æ·»åŠ åˆ°å…è®¸åˆ—è¡¨
zed plugins disable <name>     # ä»Žå…è®¸åˆ—è¡¨ç§»é™¤å¹¶æ·»åŠ åˆ°ç¦ç”¨åˆ—è¡¨
```

æ‰§è¡Œ `zed plugins install owner/repo` åŽï¼Œä¼šè¯¢é—® `Enable 'name' now? [y/N]` â€” é»˜è®¤ä¸ºå¦ã€‚è„šæœ¬åŒ–å®‰è£…æ—¶å¯ç”¨ `--enable` æˆ– `--no-enable` è·³è¿‡æç¤ºã€‚

### å…è®¸åˆ—è¡¨ä¸æŽ§åˆ¶çš„å†…å®¹

æŸäº›ç±»åˆ«çš„æ’ä»¶ç»•è¿‡ `plugins.enabled` â€” å®ƒä»¬æ˜¯ Zed å†…ç½®åŠŸèƒ½çš„ä¸€éƒ¨åˆ†ï¼Œè‹¥é»˜è®¤å…³é—­ä¼šç ´ååŸºæœ¬åŠŸèƒ½ï¼š

| æ’ä»¶ç±»åž‹ | æ¿€æ´»æ–¹å¼ |
|---|---|
| **å†…ç½®å¹³å°æ’ä»¶**ï¼ˆIRCã€Teams ç­‰ï¼Œä½äºŽ `plugins/platforms/`ï¼‰ | è‡ªåŠ¨åŠ è½½ï¼Œä½¿æ‰€æœ‰å†…ç½® gateway é¢‘é“å¯ç”¨ã€‚å®žé™…é¢‘é“é€šè¿‡ `config.yaml` ä¸­çš„ `gateway.platforms.<name>.enabled` å¼€å¯ã€‚ |
| **å†…ç½®åŽç«¯**ï¼ˆ`plugins/image_gen/` ç­‰ä¸‹çš„å›¾åƒç”Ÿæˆ providerï¼‰ | è‡ªåŠ¨åŠ è½½ï¼Œä½¿é»˜è®¤åŽç«¯"å¼€ç®±å³ç”¨"ã€‚é€šè¿‡ `config.yaml` ä¸­çš„ `<category>.provider` é€‰æ‹©ï¼ˆä¾‹å¦‚ `image_gen.provider: openai`ï¼‰ã€‚ |
| **Memory provider**ï¼ˆ`plugins/memory/`ï¼‰ | å…¨éƒ¨å‘çŽ°ï¼›åŒæ—¶åªæœ‰ä¸€ä¸ªæ¿€æ´»ï¼Œç”± `config.yaml` ä¸­çš„ `memory.provider` é€‰æ‹©ã€‚ |
| **Context engine**ï¼ˆ`plugins/context_engine/`ï¼‰ | å…¨éƒ¨å‘çŽ°ï¼›åŒæ—¶åªæœ‰ä¸€ä¸ªæ¿€æ´»ï¼Œç”± `config.yaml` ä¸­çš„ `context.engine` é€‰æ‹©ã€‚ |
| **Model provider**ï¼ˆ`plugins/model-providers/`ï¼‰ | `plugins/model-providers/` ä¸‹çš„æ‰€æœ‰å†…ç½® provider åœ¨é¦–æ¬¡è°ƒç”¨ `get_provider_profile()` æ—¶å‘çŽ°å¹¶æ³¨å†Œã€‚ç”¨æˆ·é€šè¿‡ `--provider` æˆ– `config.yaml` ä¸€æ¬¡é€‰æ‹©ä¸€ä¸ªã€‚ |
| **pip å®‰è£…çš„ `backend` æ’ä»¶** | é€šè¿‡ `plugins.enabled` é€‰æ‹©åŠ å…¥ï¼ˆä¸Žé€šç”¨æ’ä»¶ç›¸åŒï¼‰ã€‚ |
| **ç”¨æˆ·å®‰è£…çš„å¹³å°**ï¼ˆä½äºŽ `~/.zed/plugins/platforms/`ï¼‰ | é€šè¿‡ `plugins.enabled` é€‰æ‹©åŠ å…¥ â€” ç¬¬ä¸‰æ–¹ gateway é€‚é…å™¨éœ€è¦æ˜Žç¡®åŒæ„ã€‚ |

ç®€è€Œè¨€ä¹‹ï¼š**å†…ç½®çš„"å§‹ç»ˆå¯ç”¨"åŸºç¡€è®¾æ–½è‡ªåŠ¨åŠ è½½ï¼›ç¬¬ä¸‰æ–¹é€šç”¨æ’ä»¶éœ€é€‰æ‹©åŠ å…¥ã€‚** `plugins.enabled` å…è®¸åˆ—è¡¨ä¸“é—¨ç”¨äºŽæŽ§åˆ¶ç”¨æˆ·æ”¾å…¥ `~/.zed/plugins/` çš„ä»»æ„ä»£ç ã€‚

### çŽ°æœ‰ç”¨æˆ·çš„è¿ç§»

å½“ä½ å‡çº§åˆ°æ”¯æŒé€‰æ‹©åŠ å…¥æ’ä»¶çš„ Zed ç‰ˆæœ¬ï¼ˆconfig schema v21+ï¼‰æ—¶ï¼Œå·²å®‰è£…åœ¨ `~/.zed/plugins/` ä¸‹ä¸”ä¸åœ¨ `plugins.disabled` ä¸­çš„ç”¨æˆ·æ’ä»¶ä¼š**è‡ªåŠ¨çº³å…¥** `plugins.enabled`ã€‚ä½ çš„çŽ°æœ‰é…ç½®ç»§ç»­æ­£å¸¸å·¥ä½œã€‚å†…ç½®ç‹¬ç«‹æ’ä»¶**ä¸ä¼š**è‡ªåŠ¨çº³å…¥ â€” å³ä½¿æ˜¯çŽ°æœ‰ç”¨æˆ·ä¹Ÿéœ€è¦æ˜Žç¡®é€‰æ‹©åŠ å…¥ã€‚ï¼ˆå†…ç½®å¹³å°/åŽç«¯æ’ä»¶ä»Žæœªéœ€è¦çº³å…¥ï¼Œå› ä¸ºå®ƒä»¬ä»Žæœªè¢«æŽ§åˆ¶ã€‚ï¼‰

## å¯ç”¨ hook

æ’ä»¶å¯ä¸ºä»¥ä¸‹ç”Ÿå‘½å‘¨æœŸäº‹ä»¶æ³¨å†Œå›žè°ƒã€‚å®Œæ•´è¯¦æƒ…ã€å›žè°ƒç­¾åå’Œç¤ºä¾‹è¯·å‚è§ **[Event Hooks é¡µé¢](/user-guide/features/hooks#plugin-hooks)**ã€‚

| Hook | è§¦å‘æ—¶æœº |
|------|-----------|
| [`pre_tool_call`](/user-guide/features/hooks#pre_tool_call) | ä»»æ„å·¥å…·æ‰§è¡Œå‰ |
| [`post_tool_call`](/user-guide/features/hooks#post_tool_call) | ä»»æ„å·¥å…·è¿”å›žåŽ |
| [`pre_llm_call`](/user-guide/features/hooks#pre_llm_call) | æ¯è½®ä¸€æ¬¡ï¼ŒLLM å¾ªçŽ¯å‰ â€” å¯è¿”å›ž `{"context": "..."}` ä»¥[å‘ç”¨æˆ·æ¶ˆæ¯æ³¨å…¥ä¸Šä¸‹æ–‡](/user-guide/features/hooks#pre_llm_call) |
| [`post_llm_call`](/user-guide/features/hooks#post_llm_call) | æ¯è½®ä¸€æ¬¡ï¼ŒLLM å¾ªçŽ¯åŽï¼ˆä»…æˆåŠŸè½®æ¬¡ï¼‰ |
| [`on_session_start`](/user-guide/features/hooks#on_session_start) | æ–°ä¼šè¯åˆ›å»ºæ—¶ï¼ˆä»…ç¬¬ä¸€è½®ï¼‰ |
| [`on_session_end`](/user-guide/features/hooks#on_session_end) | æ¯æ¬¡ `run_conversation` è°ƒç”¨ç»“æŸæ—¶ + CLI é€€å‡ºå¤„ç†å™¨ |
| [`on_session_finalize`](/user-guide/features/hooks#on_session_finalize) | CLI/gateway é”€æ¯æ´»è·ƒä¼šè¯æ—¶ï¼ˆ`/new`ã€GCã€CLI é€€å‡ºï¼‰ |
| [`on_session_reset`](/user-guide/features/hooks#on_session_reset) | Gateway æ¢å…¥æ–°ä¼šè¯ key æ—¶ï¼ˆ`/new`ã€`/reset`ã€`/clear`ã€ç©ºé—²è½®æ¢ï¼‰ |
| [`subagent_stop`](/user-guide/features/hooks#subagent_stop) | `delegate_task` å®ŒæˆåŽæ¯ä¸ªå­ agent è§¦å‘ä¸€æ¬¡ |
| [`pre_gateway_dispatch`](/user-guide/features/hooks#pre_gateway_dispatch) | Gateway æ”¶åˆ°ç”¨æˆ·æ¶ˆæ¯ï¼Œåœ¨è®¤è¯å’Œè°ƒåº¦ä¹‹å‰ã€‚è¿”å›ž `{"action": "skip" \| "rewrite" \| "allow", ...}` ä»¥å½±å“æµç¨‹ã€‚ |

## æ’ä»¶ç±»åž‹

Zed æœ‰å››ç§æ’ä»¶ï¼š

| ç±»åž‹ | ä½œç”¨ | é€‰æ‹©æ–¹å¼ | ä½ç½® |
|------|-------------|-----------|----------|
| **é€šç”¨æ’ä»¶** | æ·»åŠ å·¥å…·ã€hookã€æ–œæ å‘½ä»¤ã€CLI å‘½ä»¤ | å¤šé€‰ï¼ˆå¯ç”¨/ç¦ç”¨ï¼‰ | `~/.zed/plugins/` |
| **Memory provider** | æ›¿æ¢æˆ–å¢žå¼ºå†…ç½® memory | å•é€‰ï¼ˆåŒæ—¶åªæœ‰ä¸€ä¸ªæ¿€æ´»ï¼‰ | `plugins/memory/` |
| **Context engine** | æ›¿æ¢å†…ç½®ä¸Šä¸‹æ–‡åŽ‹ç¼©å™¨ | å•é€‰ï¼ˆåŒæ—¶åªæœ‰ä¸€ä¸ªæ¿€æ´»ï¼‰ | `plugins/context_engine/` |
| **Model provider** | å£°æ˜ŽæŽ¨ç†åŽç«¯ï¼ˆOpenRouterã€Anthropic ç­‰ï¼‰ | å¤šæ³¨å†Œï¼Œé€šè¿‡ `--provider` / `config.yaml` é€‰æ‹© | `plugins/model-providers/` |

Memory provider å’Œ context engine æ˜¯ **provider æ’ä»¶** â€” æ¯ç§ç±»åž‹åŒæ—¶åªèƒ½æœ‰ä¸€ä¸ªæ¿€æ´»ã€‚Model provider ä¹Ÿæ˜¯æ’ä»¶ï¼Œä½†å¯ä»¥åŒæ—¶åŠ è½½å¤šä¸ªï¼›ç”¨æˆ·é€šè¿‡ `--provider` æˆ– `config.yaml` ä¸€æ¬¡é€‰æ‹©ä¸€ä¸ªã€‚é€šç”¨æ’ä»¶å¯ä»¥ä»»æ„ç»„åˆå¯ç”¨ã€‚

## å¯æ’æ‹”æŽ¥å£ â€” å„åœºæ™¯å¯¹åº”æ–‡æ¡£

ä¸Šè¡¨å±•ç¤ºäº†å››ç§æ’ä»¶ç±»åˆ«ï¼Œä½†åœ¨"é€šç”¨æ’ä»¶"ä¸­ï¼Œ`PluginContext` æš´éœ²äº†å¤šä¸ªä¸åŒçš„æ‰©å±•ç‚¹ â€” Zed è¿˜æŽ¥å— Python æ’ä»¶ç³»ç»Ÿä¹‹å¤–çš„æ‰©å±•ï¼ˆé…ç½®é©±åŠ¨çš„åŽç«¯ã€shell hook å‘½ä»¤ã€å¤–éƒ¨æœåŠ¡å™¨ç­‰ï¼‰ã€‚ä½¿ç”¨ä¸‹è¡¨æ‰¾åˆ°é€‚åˆä½ éœ€æ±‚çš„æ–‡æ¡£ï¼š

| æƒ³è¦æ·»åŠ â€¦ | æ–¹å¼ | ç¼–å†™æŒ‡å— |
|---|---|---|
| LLM å¯è°ƒç”¨çš„**å·¥å…·** | Python æ’ä»¶ â€” `ctx.register_tool()` | [Build a Zed Plugin](/guides/build-a-zed-plugin) Â· [Adding Tools](/developer-guide/adding-tools) |
| **ç”Ÿå‘½å‘¨æœŸ hook**ï¼ˆLLM å‰åŽã€ä¼šè¯å¼€å§‹/ç»“æŸã€å·¥å…·è¿‡æ»¤ï¼‰ | Python æ’ä»¶ â€” `ctx.register_hook()` | [Hooks reference](/user-guide/features/hooks) Â· [Build a Zed Plugin](/guides/build-a-zed-plugin) |
| CLI / gateway çš„**æ–œæ å‘½ä»¤** | Python æ’ä»¶ â€” `ctx.register_command()` | [Build a Zed Plugin](/guides/build-a-zed-plugin) Â· [Extending the CLI](/developer-guide/extending-the-cli) |
| `zed <thing>` çš„**å­å‘½ä»¤** | Python æ’ä»¶ â€” `ctx.register_cli_command()` | [Extending the CLI](/developer-guide/extending-the-cli) |
| æ’ä»¶é™„å¸¦çš„**skill** | Python æ’ä»¶ â€” `ctx.register_skill()` | [Creating Skills](/developer-guide/creating-skills) |
| **æŽ¨ç†åŽç«¯**ï¼ˆLLM providerï¼šOpenAI å…¼å®¹ã€Codexã€Anthropic-Messagesã€Bedrockï¼‰ | Provider æ’ä»¶ â€” åœ¨ `plugins/model-providers/<name>/` ä¸­è°ƒç”¨ `register_provider(ProviderProfile(...))` | **[Model Provider Plugins](/developer-guide/model-provider-plugin)** Â· [Adding Providers](/developer-guide/adding-providers) |
| **Gateway é¢‘é“**ï¼ˆDiscord / Telegram / IRC / Teams ç­‰ï¼‰ | å¹³å°æ’ä»¶ â€” åœ¨ `plugins/platforms/<name>/` ä¸­è°ƒç”¨ `ctx.register_platform()` | [Adding Platform Adapters](/developer-guide/adding-platform-adapters) |
| **Memory åŽç«¯**ï¼ˆHonchoã€Mem0ã€Supermemory ç­‰ï¼‰ | Memory æ’ä»¶ â€” åœ¨ `plugins/memory/<name>/` ä¸­ç»§æ‰¿ `MemoryProvider` | [Memory Provider Plugins](/developer-guide/memory-provider-plugin) |
| **ä¸Šä¸‹æ–‡åŽ‹ç¼©ç­–ç•¥** | Context-engine æ’ä»¶ â€” `ctx.register_context_engine()` | [Context Engine Plugins](/developer-guide/context-engine-plugin) |
| **å›¾åƒç”ŸæˆåŽç«¯**ï¼ˆDALLÂ·Eã€SDXL ç­‰ï¼‰ | åŽç«¯æ’ä»¶ â€” `ctx.register_image_gen_provider()` | [Image Generation Provider Plugins](/developer-guide/image-gen-provider-plugin) |
| **è§†é¢‘ç”ŸæˆåŽç«¯**ï¼ˆVeoã€Klingã€Pixverseã€Grok-Imagineã€Runway ç­‰ï¼‰ | åŽç«¯æ’ä»¶ â€” `ctx.register_video_gen_provider()` | [Video Generation Provider Plugins](/developer-guide/video-gen-provider-plugin) |
| **TTS åŽç«¯**ï¼ˆä»»æ„ CLI â€” Piperã€VoxCPMã€Kokoroã€xttsã€è¯­éŸ³å…‹éš†è„šæœ¬ç­‰ï¼‰ | é…ç½®é©±åŠ¨ï¼ˆæŽ¨èï¼‰â€” åœ¨ `config.yaml` çš„ `tts.providers.<name>` ä¸‹ä»¥ `type: command` å£°æ˜Žã€‚æˆ– Python åŽç«¯æ’ä»¶ â€” å¯¹éœ€è¦è¶…å‡º shell æ¨¡æ¿çš„ Python SDK / æµå¼å¼•æ“Žä½¿ç”¨ `ctx.register_tts_provider()`ã€‚ | [TTS Setup](/user-guide/features/tts#custom-command-providers) Â· [Python plugin guide](/user-guide/features/tts#python-plugin-providers) |
| **STT åŽç«¯**ï¼ˆè‡ªå®šä¹‰ whisper äºŒè¿›åˆ¶ã€æœ¬åœ° ASR CLIï¼‰ | é…ç½®é©±åŠ¨ â€” å°† `ZED_LOCAL_STT_COMMAND` çŽ¯å¢ƒå˜é‡è®¾ç½®ä¸º shell æ¨¡æ¿ | [Voice Message Transcription (STT)](/user-guide/features/tts#voice-message-transcription-stt) |
| **é€šè¿‡ MCP ä½¿ç”¨å¤–éƒ¨å·¥å…·**ï¼ˆæ–‡ä»¶ç³»ç»Ÿã€GitHubã€Linearã€Notionã€ä»»æ„ MCP æœåŠ¡å™¨ï¼‰ | é…ç½®é©±åŠ¨ â€” åœ¨ `config.yaml` ä¸­ä»¥ `command:` / `url:` å£°æ˜Ž `mcp_servers.<name>`ã€‚Zed è‡ªåŠ¨å‘çŽ°æœåŠ¡å™¨çš„å·¥å…·å¹¶ä¸Žå†…ç½®å·¥å…·ä¸€åŒæ³¨å†Œã€‚ | [MCP](/user-guide/features/mcp) |
| **é¢å¤– skill æ¥æº**ï¼ˆè‡ªå®šä¹‰ GitHub ä»“åº“ã€ç§æœ‰ skill ç´¢å¼•ï¼‰ | CLI â€” `zed skills tap add <repo>` | [Skills Hub](/user-guide/features/skills#skills-hub) Â· [å‘å¸ƒè‡ªå®šä¹‰ tap](/user-guide/features/skills#publishing-a-custom-skill-tap) |
| **Gateway äº‹ä»¶ hook**ï¼ˆåœ¨ `gateway:startup`ã€`session:start`ã€`agent:end`ã€`command:*` æ—¶è§¦å‘ï¼‰ | å°† `HOOK.yaml` + `handler.py` æ”¾å…¥ `~/.zed/hooks/<name>/` | [Event Hooks](/user-guide/features/hooks#gateway-event-hooks) |
| **Shell hook**ï¼ˆåœ¨äº‹ä»¶æ—¶è¿è¡Œ shell å‘½ä»¤ â€” é€šçŸ¥ã€å®¡è®¡æ—¥å¿—ã€æ¡Œé¢æé†’ï¼‰ | é…ç½®é©±åŠ¨ â€” åœ¨ `config.yaml` çš„ `hooks:` ä¸‹å£°æ˜Ž | [Shell Hooks](/user-guide/features/hooks#shell-hooks) |

:::note
å¹¶éžæ‰€æœ‰æ‰©å±•éƒ½æ˜¯ Python æ’ä»¶ã€‚æŸäº›æ‰©å±•æŽ¥å£æœ‰æ„ä½¿ç”¨**é…ç½®é©±åŠ¨çš„ shell å‘½ä»¤**ï¼ˆTTSã€STTã€shell hookï¼‰ï¼Œè¿™æ ·ä½ å·²æœ‰çš„ä»»æ„ CLI æ— éœ€ç¼–å†™ Python å³å¯æˆä¸ºæ’ä»¶ã€‚å…¶ä»–çš„æ˜¯ agent è¿žæŽ¥å¹¶è‡ªåŠ¨æ³¨å†Œå·¥å…·çš„**å¤–éƒ¨æœåŠ¡å™¨**ï¼ˆMCPï¼‰ã€‚è¿˜æœ‰ä¸€äº›æ˜¯æ‹¥æœ‰è‡ªå·± manifest æ ¼å¼çš„**å³æ’å³ç”¨ç›®å½•**ï¼ˆgateway hookï¼‰ã€‚æ ¹æ®ä½ çš„é›†æˆé£Žæ ¼é€‰æ‹©åˆé€‚çš„æŽ¥å£ï¼›ä¸Šè¡¨ä¸­çš„ç¼–å†™æŒ‡å—å„è‡ªæ¶µç›–äº†å ä½ç¬¦ã€å‘çŽ°æœºåˆ¶å’Œç¤ºä¾‹ã€‚
:::

## NixOS å£°æ˜Žå¼æ’ä»¶

åœ¨ NixOS ä¸Šï¼Œæ’ä»¶å¯é€šè¿‡æ¨¡å—é€‰é¡¹å£°æ˜Žå¼å®‰è£… â€” æ— éœ€ `zed plugins install`ã€‚å®Œæ•´è¯¦æƒ…è¯·å‚è§ **[Nix Setup æŒ‡å—](/getting-started/nix-setup#plugins)**ã€‚

```nix
services.zed-agent = {
  # ç›®å½•æ’ä»¶ï¼ˆåŒ…å« plugin.yaml çš„æºç æ ‘ï¼‰
  extraPlugins = [ (pkgs.fetchFromGitHub { ... }) ];
  # å…¥å£ç‚¹æ’ä»¶ï¼ˆpip åŒ…ï¼‰
  extraPythonPackages = [ (pkgs.python312Packages.buildPythonPackage { ... }) ];
  # åœ¨ config ä¸­å¯ç”¨
  settings.plugins.enabled = [ "my-plugin" ];
};
```

å£°æ˜Žå¼æ’ä»¶ä»¥ `nix-managed-` å‰ç¼€ç¬¦å·é“¾æŽ¥ â€” ä¸Žæ‰‹åŠ¨å®‰è£…çš„æ’ä»¶å…±å­˜ï¼Œä»Ž Nix é…ç½®ä¸­ç§»é™¤åŽè‡ªåŠ¨æ¸…ç†ã€‚

## ç®¡ç†æ’ä»¶

```bash
zed plugins                                       # ç»Ÿä¸€äº¤äº’å¼ UI
zed plugins list                                  # è¡¨æ ¼ï¼šå·²å¯ç”¨ / å·²ç¦ç”¨ / æœªå¯ç”¨
zed plugins install user/repo                     # ä»Ž Git å®‰è£…ï¼Œç„¶åŽæç¤º Enable? [y/N]
zed plugins install user/repo --enable            # å®‰è£…å¹¶å¯ç”¨ï¼ˆæ— æç¤ºï¼‰
zed plugins install user/repo --no-enable         # å®‰è£…ä½†ä¿æŒç¦ç”¨ï¼ˆæ— æç¤ºï¼‰
zed plugins update my-plugin                      # æ‹‰å–æœ€æ–°ç‰ˆæœ¬
zed plugins remove my-plugin                      # å¸è½½
zed plugins enable my-plugin                      # æ·»åŠ åˆ°å…è®¸åˆ—è¡¨ï¼ˆæ™®é€šæ’ä»¶ï¼‰
zed plugins enable observability/langfuse         # æ·»åŠ åˆ°å…è®¸åˆ—è¡¨ï¼ˆå­åˆ†ç±»æ’ä»¶ï¼‰
zed plugins disable my-plugin                     # ä»Žå…è®¸åˆ—è¡¨ç§»é™¤å¹¶æ·»åŠ åˆ°ç¦ç”¨åˆ—è¡¨
```

å¯¹äºŽå­åˆ†ç±»ç›®å½•ä¸‹çš„æ’ä»¶ï¼ˆä¾‹å¦‚ `plugins/observability/langfuse/`ã€`plugins/image_gen/openai/`ï¼‰ï¼Œä½¿ç”¨å®Œæ•´çš„ `<category>/<plugin>` key â€” è¿™æ­£æ˜¯ `zed plugins list` åœ¨ **Name** åˆ—ä¸­æ˜¾ç¤ºçš„å†…å®¹ã€‚

### äº¤äº’å¼ UI

ä¸å¸¦å‚æ•°è¿è¡Œ `zed plugins` ä¼šæ‰“å¼€ä¸€ä¸ªå¤åˆäº¤äº’ç•Œé¢ï¼š

```
Plugins
  â†‘â†“ navigate  SPACE toggle  ENTER configure/confirm  ESC done

  General Plugins
 â†’ [âœ“] my-tool-plugin â€” Custom search tool
   [ ] webhook-notifier â€” Event hooks
   [ ] disk-cleanup â€” Auto-cleanup of ephemeral files [bundled]
   [ ] observability/langfuse â€” Trace turns / LLM calls / tools to Langfuse [bundled]

  Provider Plugins
     Memory Provider          â–¸ honcho
     Context Engine           â–¸ compressor
```

- **General Plugins åŒºåŸŸ** â€” å¤é€‰æ¡†ï¼Œç”¨ç©ºæ ¼åˆ‡æ¢ã€‚å‹¾é€‰ = åœ¨ `plugins.enabled` ä¸­ï¼Œæœªå‹¾é€‰ = åœ¨ `plugins.disabled` ä¸­ï¼ˆæ˜Žç¡®å…³é—­ï¼‰ã€‚
- **Provider Plugins åŒºåŸŸ** â€” æ˜¾ç¤ºå½“å‰é€‰æ‹©ã€‚æŒ‰ ENTER è¿›å…¥å•é€‰é€‰æ‹©å™¨ï¼Œé€‰æ‹©ä¸€ä¸ªæ¿€æ´»çš„ providerã€‚
- å†…ç½®æ’ä»¶åœ¨åŒä¸€åˆ—è¡¨ä¸­æ˜¾ç¤ºï¼Œå¸¦æœ‰ `[bundled]` æ ‡ç­¾ã€‚

Provider æ’ä»¶çš„é€‰æ‹©ä¿å­˜åˆ° `config.yaml`ï¼š

```yaml
memory:
  provider: "honcho"      # ç©ºå­—ç¬¦ä¸² = ä»…ä½¿ç”¨å†…ç½®

context:
  engine: "compressor"    # é»˜è®¤å†…ç½®åŽ‹ç¼©å™¨
```

### å·²å¯ç”¨ vs. å·²ç¦ç”¨ vs. æœªè®¾ç½®

æ’ä»¶å¤„äºŽä»¥ä¸‹ä¸‰ç§çŠ¶æ€ä¹‹ä¸€ï¼š

| çŠ¶æ€ | å«ä¹‰ | åœ¨ `plugins.enabled` ä¸­ï¼Ÿ | åœ¨ `plugins.disabled` ä¸­ï¼Ÿ |
|---|---|---|---|
| `enabled` | ä¸‹æ¬¡ä¼šè¯æ—¶åŠ è½½ | æ˜¯ | å¦ |
| `disabled` | æ˜Žç¡®å…³é—­ â€” å³ä½¿åŒæ—¶åœ¨ `enabled` ä¸­ä¹Ÿä¸ä¼šåŠ è½½ | ï¼ˆæ— å…³ï¼‰ | æ˜¯ |
| `not enabled` | å·²å‘çŽ°ä½†ä»Žæœªé€‰æ‹©åŠ å…¥ | å¦ | å¦ |

æ–°å®‰è£…æˆ–å†…ç½®æ’ä»¶çš„é»˜è®¤çŠ¶æ€ä¸º `not enabled`ã€‚`zed plugins list` æ˜¾ç¤ºå…¨éƒ¨ä¸‰ç§çŠ¶æ€ï¼Œä¾¿äºŽåŒºåˆ†æ˜Žç¡®å…³é—­çš„æ’ä»¶å’Œç­‰å¾…å¯ç”¨çš„æ’ä»¶ã€‚

åœ¨è¿è¡Œä¸­çš„ä¼šè¯é‡Œï¼Œ`/plugins` æ˜¾ç¤ºå½“å‰å·²åŠ è½½çš„æ’ä»¶ã€‚

## æ³¨å…¥æ¶ˆæ¯

æ’ä»¶å¯ä½¿ç”¨ `ctx.inject_message()` å‘æ´»è·ƒå¯¹è¯æ³¨å…¥æ¶ˆæ¯ï¼š

```python
ctx.inject_message("New data arrived from the webhook", role="user")
```

**ç­¾åï¼š** `ctx.inject_message(content: str, role: str = "user") -> bool`

å·¥ä½œåŽŸç†ï¼š

- è‹¥ agent **ç©ºé—²**ï¼ˆç­‰å¾…ç”¨æˆ·è¾“å…¥ï¼‰ï¼Œæ¶ˆæ¯ä¼šä½œä¸ºä¸‹ä¸€æ¡è¾“å…¥æŽ’é˜Ÿå¹¶å¼€å§‹æ–°ä¸€è½®ã€‚
- è‹¥ agent **å¤„äºŽè½®æ¬¡ä¸­**ï¼ˆæ­£åœ¨è¿è¡Œï¼‰ï¼Œæ¶ˆæ¯ä¼šä¸­æ–­å½“å‰æ“ä½œ â€” ä¸Žç”¨æˆ·è¾“å…¥æ–°æ¶ˆæ¯å¹¶æŒ‰ä¸‹ Enter æ•ˆæžœç›¸åŒã€‚
- å¯¹äºŽéž `"user"` è§’è‰²ï¼Œå†…å®¹ä¼šä»¥ `[role]` ä¸ºå‰ç¼€ï¼ˆä¾‹å¦‚ `[system] ...`ï¼‰ã€‚
- è‹¥æ¶ˆæ¯æˆåŠŸæŽ’é˜Ÿè¿”å›ž `True`ï¼Œè‹¥æ—  CLI å¼•ç”¨ï¼ˆä¾‹å¦‚åœ¨ gateway æ¨¡å¼ä¸‹ï¼‰åˆ™è¿”å›ž `False`ã€‚

è¿™ä½¿å¾—è¿œç¨‹æŽ§åˆ¶æŸ¥çœ‹å™¨ã€æ¶ˆæ¯æ¡¥æŽ¥æˆ– webhook æŽ¥æ”¶å™¨ç­‰æ’ä»¶èƒ½å¤Ÿä»Žå¤–éƒ¨æ¥æºå‘å¯¹è¯æ³¨å…¥æ¶ˆæ¯ã€‚

:::note
`inject_message` ä»…åœ¨ CLI æ¨¡å¼ä¸‹å¯ç”¨ã€‚åœ¨ gateway æ¨¡å¼ä¸‹ï¼Œæ²¡æœ‰ CLI å¼•ç”¨ï¼Œè¯¥æ–¹æ³•è¿”å›ž `False`ã€‚
:::

å®Œæ•´çš„å¤„ç†å™¨çº¦å®šã€schema æ ¼å¼ã€hook è¡Œä¸ºã€é”™è¯¯å¤„ç†å’Œå¸¸è§é”™è¯¯è¯·å‚è§ **[å®Œæ•´æŒ‡å—](/guides/build-a-zed-plugin)**ã€‚
