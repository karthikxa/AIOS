---
sidebar_position: 11
sidebar_label: "Plugins"
title: "Plugins"
description: "Extend Zed with custom tools, hooks, and integrations via the plugin system"
---

# Plugins

Zed has a plugin system for adding custom tools, hooks, and integrations without modifying core code.

If you want to create a custom tool for yourself, your team, or one project,
this is usually the right path. The developer guide's
[Adding Tools](/developer-guide/adding-tools) page is for built-in Zed
core tools that live in `tools/` and `toolsets.py`.

**â†’ [Build a Zed Plugin](/guides/build-a-zed-plugin)** â€” step-by-step guide with a complete working example.

## Quick overview

Drop a directory into `~/.zed/plugins/` with a `plugin.yaml` and Python code:

```
~/.zed/plugins/my-plugin/
â”œâ”€â”€ plugin.yaml      # manifest
â”œâ”€â”€ __init__.py      # register() â€” wires schemas to handlers
â”œâ”€â”€ schemas.py       # tool schemas (what the LLM sees)
â””â”€â”€ tools.py         # tool handlers (what runs when called)
```

Start Zed â€” your tools appear alongside built-in tools. The model can call them immediately.

### Minimal working example

Here is a complete plugin that adds a `hello_world` tool and logs every tool call via a hook.

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

Drop both files into `~/.zed/plugins/hello-world/`, restart Zed, and the model can immediately call `hello_world`. The hook prints a log line after every tool invocation.

Project-local plugins under `./.zed/plugins/` are disabled by default. Enable them only for trusted repositories by setting `ZED_ENABLE_PROJECT_PLUGINS=true` before starting Zed.

## What plugins can do

Every `ctx.*` API below is available inside a plugin's `register(ctx)` function.

| Capability | How |
|-----------|-----|
| Add tools | `ctx.register_tool(name=..., toolset=..., schema=..., handler=...)` |
| Add hooks | `ctx.register_hook("post_tool_call", callback)` |
| Add slash commands | `ctx.register_command(name, handler, description)` â€” adds `/name` in CLI and gateway sessions |
| Dispatch tools from commands | `ctx.dispatch_tool(name, args)` â€” invokes a registered tool with parent-agent context auto-wired |
| Add CLI commands | `ctx.register_cli_command(name, help, setup_fn, handler_fn)` â€” adds `zed <plugin> <subcommand>` |
| Inject messages | `ctx.inject_message(content, role="user")` â€” see [Injecting Messages](#injecting-messages) |
| Ship data files | `Path(__file__).parent / "data" / "file.yaml"` |
| Bundle skills | `ctx.register_skill(name, path)` â€” namespaced as `plugin:skill`, loaded via `skill_view("plugin:skill")` |
| Gate on env vars | `requires_env: [API_KEY]` in plugin.yaml â€” prompted during `zed plugins install` |
| Distribute via pip | `[project.entry-points."zed_agent.plugins"]` |
| Register a gateway platform (Discord, Telegram, IRC, â€¦) | `ctx.register_platform(name, label, adapter_factory, check_fn, ...)` â€” see [Adding Platform Adapters](/developer-guide/adding-platform-adapters) |
| Register an image-generation backend | `ctx.register_image_gen_provider(provider)` â€” see [Image Generation Provider Plugins](/developer-guide/image-gen-provider-plugin) |
| Register a video-generation backend | `ctx.register_video_gen_provider(provider)` â€” see [Video Generation Provider Plugins](/developer-guide/video-gen-provider-plugin) |
| Register a context-compression engine | `ctx.register_context_engine(engine)` â€” see [Context Engine Plugins](/developer-guide/context-engine-plugin) |
| Register a memory backend | Subclass `MemoryProvider` in `plugins/memory/<name>/__init__.py` â€” see [Memory Provider Plugins](/developer-guide/memory-provider-plugin) (uses a separate discovery system) |
| Run a host-owned LLM call | `ctx.llm.complete(...)` / `ctx.llm.complete_structured(...)` â€” borrow the user's active model + auth for a one-shot completion with optional JSON schema validation. See [Plugin LLM Access](/developer-guide/plugin-llm-access) |
| Register an inference backend (LLM provider) | `register_provider(ProviderProfile(...))` in `plugins/model-providers/<name>/__init__.py` â€” see [Model Provider Plugins](/developer-guide/model-provider-plugin) (uses a separate discovery system) |

## Plugin discovery

| Source | Path | Use case |
|--------|------|----------|
| Bundled | `<repo>/plugins/` | Ships with Zed â€” see [Built-in Plugins](/user-guide/features/built-in-plugins) |
| User | `~/.zed/plugins/` | Personal plugins |
| Project | `.zed/plugins/` | Project-specific plugins (requires `ZED_ENABLE_PROJECT_PLUGINS=true`) |
| pip | `zed_agent.plugins` entry_points | Distributed packages |
| Nix | `services.zed-agent.extraPlugins` / `extraPythonPackages` | NixOS declarative installs â€” see [Nix Setup](/getting-started/nix-setup#plugins) |

Later sources override earlier ones on name collision, so a user plugin with the same name as a bundled plugin replaces it.

### Plugin sub-categories

Within each source, Zed also recognizes sub-category directories that route plugins to specialized discovery systems:

| Sub-directory | What it holds | Discovery system |
|---|---|---|
| `plugins/` (root) | General plugins â€” tools, hooks, slash commands, CLI commands, bundled skills | `PluginManager` (kind: `standalone` or `backend`) |
| `plugins/platforms/<name>/` | Gateway channel adapters (`ctx.register_platform()`) | `PluginManager` (kind: `platform`, one level deeper) |
| `plugins/image_gen/<name>/` | Image-generation backends (`ctx.register_image_gen_provider()`) | `PluginManager` (kind: `backend`, one level deeper) |
| `plugins/memory/<name>/` | Memory providers (subclass `MemoryProvider`) | **Own loader** in `plugins/memory/__init__.py` (kind: `exclusive` â€” one active at a time) |
| `plugins/context_engine/<name>/` | Context-compression engines (`ctx.register_context_engine()`) | **Own loader** in `plugins/context_engine/__init__.py` (one active at a time) |
| `plugins/model-providers/<name>/` | LLM provider profiles (`register_provider(ProviderProfile(...))`) | **Own loader** in `providers/__init__.py` (lazily scanned on first `get_provider_profile()` call) |

User plugins at `~/.zed/plugins/model-providers/<name>/` and `~/.zed/plugins/memory/<name>/` override bundled plugins of the same name â€” last-writer-wins in `register_provider()` / `register_memory_provider()`. Drop a directory in, and it replaces the built-in without any repo edits.

## Plugins are opt-in (with a few exceptions)

**General plugins and user-installed backends are disabled by default** â€” discovery finds them (so they show up in `zed plugins` and `/plugins`), but nothing with hooks or tools loads until you add the plugin's name to `plugins.enabled` in `~/.zed/config.yaml`. This stops third-party code from running without your explicit consent.

```yaml
plugins:
  enabled:
    - my-tool-plugin
    - disk-cleanup
  disabled:       # optional deny-list â€” always wins if a name appears in both
    - noisy-plugin
```

Three ways to flip state:

```bash
zed plugins                    # interactive toggle (space to check/uncheck)
zed plugins enable <name>      # add to allow-list
zed plugins disable <name>     # remove from allow-list + add to disabled
```

After `zed plugins install owner/repo`, you're asked `Enable 'name' now? [y/N]` â€” defaults to no. Skip the prompt for scripted installs with `--enable` or `--no-enable`.

### What the allow-list does NOT gate

Several categories of plugin bypass `plugins.enabled` â€” they're part of Zed' built-in surface and would break basic functionality if gated off by default:

| Plugin kind | How it's activated instead |
|---|---|
| **Bundled platform plugins** (IRC, Teams, etc. under `plugins/platforms/`) | Auto-loaded so every shipped gateway channel is available. The actual channel turns on via `gateway.platforms.<name>.enabled` in `config.yaml`. |
| **Bundled backends** (image-gen providers under `plugins/image_gen/`, etc.) | Auto-loaded so the default backend "just works". Selection happens via `<category>.provider` in `config.yaml` (e.g. `image_gen.provider: openai`). |
| **Memory providers** (`plugins/memory/`) | All discovered; exactly one is active, chosen by `memory.provider` in `config.yaml`. |
| **Context engines** (`plugins/context_engine/`) | All discovered; one is active, chosen by `context.engine` in `config.yaml`. |
| **Model providers** (`plugins/model-providers/`) | All bundled providers under `plugins/model-providers/` discover and register at the first `get_provider_profile()` call. The user picks one at a time via `--provider` or `config.yaml`. |
| **Pip-installed `backend` plugins** | Opt-in via `plugins.enabled` (same as general plugins). |
| **User-installed platforms** (under `~/.zed/plugins/platforms/`) | Opt-in via `plugins.enabled` â€” third-party gateway adapters need explicit consent. |

In short: **bundled "always-works" infrastructure loads automatically; third-party general plugins are opt-in.** The `plugins.enabled` allow-list is the gate specifically for arbitrary code a user drops into `~/.zed/plugins/`.

### Migration for existing users

When you upgrade to a version of Zed that has opt-in plugins (config schema v21+), any user plugins already installed under `~/.zed/plugins/` that weren't already in `plugins.disabled` are **automatically grandfathered** into `plugins.enabled`. Your existing setup keeps working. Bundled standalone plugins are NOT grandfathered â€” even existing users have to opt in explicitly. (Bundled platform/backend plugins never needed grandfathering because they were never gated.)

## Available hooks

Plugins can register callbacks for these lifecycle events. See the **[Event Hooks page](/user-guide/features/hooks#plugin-hooks)** for full details, callback signatures, and examples.

| Hook | Fires when |
|------|-----------|
| [`pre_tool_call`](/user-guide/features/hooks#pre_tool_call) | Before any tool executes |
| [`post_tool_call`](/user-guide/features/hooks#post_tool_call) | After any tool returns |
| [`pre_llm_call`](/user-guide/features/hooks#pre_llm_call) | Once per turn, before the LLM loop â€” can return `{"context": "..."}` to [inject context into the user message](/user-guide/features/hooks#pre_llm_call) |
| [`post_llm_call`](/user-guide/features/hooks#post_llm_call) | Once per turn, after the LLM loop (successful turns only) |
| [`on_session_start`](/user-guide/features/hooks#on_session_start) | New session created (first turn only) |
| [`on_session_end`](/user-guide/features/hooks#on_session_end) | End of every `run_conversation` call + CLI exit handler |
| [`on_session_finalize`](/user-guide/features/hooks#on_session_finalize) | CLI/gateway tears down an active session (`/new`, GC, CLI quit) |
| [`on_session_reset`](/user-guide/features/hooks#on_session_reset) | Gateway swaps in a new session key (`/new`, `/reset`, `/clear`, idle rotation) |
| [`subagent_stop`](/user-guide/features/hooks#subagent_stop) | Once per child after `delegate_task` finishes |
| [`pre_gateway_dispatch`](/user-guide/features/hooks#pre_gateway_dispatch) | Gateway received a user message, before auth + dispatch. Return `{"action": "skip" \| "rewrite" \| "allow", ...}` to influence flow. |

## Plugin types

Zed has four kinds of plugins:

| Type | What it does | Selection | Location |
|------|-------------|-----------|----------|
| **General plugins** | Add tools, hooks, slash commands, CLI commands | Multi-select (enable/disable) | `~/.zed/plugins/` |
| **Memory providers** | Replace or augment built-in memory | Single-select (one active) | `plugins/memory/` |
| **Context engines** | Replace the built-in context compressor | Single-select (one active) | `plugins/context_engine/` |
| **Model providers** | Declare an inference backend (OpenRouter, Anthropic, â€¦) | Multi-register, picked by `--provider` / `config.yaml` | `plugins/model-providers/` |

Memory providers and context engines are **provider plugins** â€” only one of each type can be active at a time. Model providers are also plugins, but many load simultaneously; the user picks one at a time via `--provider` or `config.yaml`. General plugins can be enabled in any combination.

## Pluggable interfaces â€” where to go for each

The table above shows the four plugin categories, but within "General plugins" the `PluginContext` exposes several distinct extension points â€” and Zed also accepts extensions outside the Python plugin system (config-driven backends, shell-hooked commands, external servers, etc.). Use this table to find the right doc for what you want to build:

| Want to addâ€¦ | How | Authoring guide |
|---|---|---|
| A **tool** the LLM can call | Python plugin â€” `ctx.register_tool()` | [Build a Zed Plugin](/guides/build-a-zed-plugin) Â· [Adding Tools](/developer-guide/adding-tools) |
| A **lifecycle hook** (pre/post LLM, session start/end, tool filter) | Python plugin â€” `ctx.register_hook()` | [Hooks reference](/user-guide/features/hooks) Â· [Build a Zed Plugin](/guides/build-a-zed-plugin) |
| A **slash command** for the CLI / gateway | Python plugin â€” `ctx.register_command()` | [Build a Zed Plugin](/guides/build-a-zed-plugin) Â· [Extending the CLI](/developer-guide/extending-the-cli) |
| A **subcommand** for `zed <thing>` | Python plugin â€” `ctx.register_cli_command()` | [Extending the CLI](/developer-guide/extending-the-cli) |
| A bundled **skill** that your plugin ships | Python plugin â€” `ctx.register_skill()` | [Creating Skills](/developer-guide/creating-skills) |
| An **inference backend** (LLM provider: OpenAI-compat, Codex, Anthropic-Messages, Bedrock) | Provider plugin â€” `register_provider(ProviderProfile(...))` in `plugins/model-providers/<name>/` | **[Model Provider Plugins](/developer-guide/model-provider-plugin)** Â· [Adding Providers](/developer-guide/adding-providers) |
| A **gateway channel** (Discord / Telegram / IRC / Teams / etc.) | Platform plugin â€” `ctx.register_platform()` in `plugins/platforms/<name>/` | [Adding Platform Adapters](/developer-guide/adding-platform-adapters) |
| A **memory backend** (Honcho, Mem0, Supermemory, â€¦) | Memory plugin â€” subclass `MemoryProvider` in `plugins/memory/<name>/` | [Memory Provider Plugins](/developer-guide/memory-provider-plugin) |
| A **context-compression strategy** | Context-engine plugin â€” `ctx.register_context_engine()` | [Context Engine Plugins](/developer-guide/context-engine-plugin) |
| An **image-generation backend** (DALLÂ·E, SDXL, â€¦) | Backend plugin â€” `ctx.register_image_gen_provider()` | [Image Generation Provider Plugins](/developer-guide/image-gen-provider-plugin) |
| A **video-generation backend** (Veo, Kling, Pixverse, Grok-Imagine, Runway, â€¦) | Backend plugin â€” `ctx.register_video_gen_provider()` | [Video Generation Provider Plugins](/developer-guide/video-gen-provider-plugin) |
| A **TTS backend** (any CLI â€” Piper, VoxCPM, Kokoro, xtts, voice-cloning scripts, â€¦) | Config-driven (recommended) â€” declare under `tts.providers.<name>` with `type: command` in `config.yaml`. OR Python backend plugin â€” `ctx.register_tts_provider()` for Python-SDK / streaming engines that need more than a shell template. | [TTS Setup](/user-guide/features/tts#custom-command-providers) Â· [Python plugin guide](/user-guide/features/tts#python-plugin-providers) |
| An **STT backend** (any CLI â€” whisper.cpp, custom whisper binary, local ASR CLI) | Config-driven (recommended) â€” declare under `stt.providers.<name>` with `type: command` in `config.yaml`, or set `ZED_LOCAL_STT_COMMAND` for the legacy single-command escape hatch. OR Python backend plugin â€” `ctx.register_transcription_provider()` for Python-SDK engines (OpenRouter, SenseAudio, Gemini-STT, etc.). | [STT Setup](/user-guide/features/tts#stt-custom-command-providers) Â· [Python plugin guide](/user-guide/features/tts#python-plugin-providers-stt) |
| **External tools via MCP** (filesystem, GitHub, Linear, Notion, any MCP server) | Config-driven â€” declare `mcp_servers.<name>` with `command:` / `url:` in `config.yaml`. Zed auto-discovers the server's tools and registers them alongside built-ins. | [MCP](/user-guide/features/mcp) |
| **Additional skill sources** (custom GitHub repos, private skill indexes) | CLI â€” `zed skills tap add <repo>` | [Skills Hub](/user-guide/features/skills#skills-hub) Â· [Publishing a custom tap](/user-guide/features/skills#publishing-a-custom-skill-tap) |
| **Gateway event hooks** (fire on `gateway:startup`, `session:start`, `agent:end`, `command:*`) | Drop `HOOK.yaml` + `handler.py` into `~/.zed/hooks/<name>/` | [Event Hooks](/user-guide/features/hooks#gateway-event-hooks) |
| **Shell hooks** (run a shell command on events â€” notifications, audit logs, desktop alerts) | Config-driven â€” declare under `hooks:` in `config.yaml` | [Shell Hooks](/user-guide/features/hooks#shell-hooks) |

:::note
Not everything is a Python plugin. Some extension surfaces intentionally use **config-driven shell commands** (TTS, STT, shell hooks) so any CLI you already have becomes a plugin without writing Python. Others are **external servers** (MCP) the agent connects to and auto-registers tools from. And some are **drop-in directories** (gateway hooks) with their own manifest format. Pick the right surface for the integration style that fits your use case; the authoring guides in the table above each cover placeholders, discovery, and examples.
:::

## NixOS declarative plugins

On NixOS, plugins can be installed declaratively via the module options â€” no `zed plugins install` needed. See the **[Nix Setup guide](/getting-started/nix-setup#plugins)** for full details.

```nix
services.zed-agent = {
  # Directory plugin (source tree with plugin.yaml)
  extraPlugins = [ (pkgs.fetchFromGitHub { ... }) ];
  # Entry-point plugin (pip package)
  extraPythonPackages = [ (pkgs.python312Packages.buildPythonPackage { ... }) ];
  # Enable in config
  settings.plugins.enabled = [ "my-plugin" ];
};
```

Declarative plugins are symlinked with a `nix-managed-` prefix â€” they coexist with manually installed plugins and are cleaned up automatically when removed from the Nix config.

## Managing plugins

```bash
zed plugins                               # unified interactive UI
zed plugins list                          # table: enabled / disabled / not enabled
zed plugins install user/repo             # install from Git, then prompt Enable? [y/N]
zed plugins install user/repo --enable    # install AND enable (no prompt)
zed plugins install user/repo --no-enable # install but leave disabled (no prompt)
zed plugins update my-plugin              # pull latest
zed plugins remove my-plugin              # uninstall
zed plugins enable my-plugin              # add to allow-list
zed plugins disable my-plugin             # remove from allow-list + add to disabled
```

### Interactive UI

Running `zed plugins` with no arguments opens a composite interactive screen:

```
Plugins
  â†‘â†“ navigate  SPACE toggle  ENTER configure/confirm  ESC done

  General Plugins
 â†’ [âœ“] my-tool-plugin â€” Custom search tool
   [ ] webhook-notifier â€” Event hooks
   [ ] disk-cleanup â€” Auto-cleanup of ephemeral files [bundled]

  Provider Plugins
     Memory Provider          â–¸ honcho
     Context Engine           â–¸ compressor
```

- **General Plugins section** â€” checkboxes, toggle with SPACE. Checked = in `plugins.enabled`, unchecked = in `plugins.disabled` (explicit off).
- **Provider Plugins section** â€” shows current selection. Press ENTER to drill into a radio picker where you choose one active provider.
- Bundled plugins appear in the same list with a `[bundled]` tag.

Provider plugin selections are saved to `config.yaml`:

```yaml
memory:
  provider: "honcho"      # empty string = built-in only

context:
  engine: "compressor"    # default built-in compressor
```

### Enabled vs. disabled vs. neither

Plugins occupy one of three states:

| State | Meaning | In `plugins.enabled`? | In `plugins.disabled`? |
|---|---|---|---|
| `enabled` | Loaded on next session | Yes | No |
| `disabled` | Explicitly off â€” won't load even if also in `enabled` | (irrelevant) | Yes |
| `not enabled` | Discovered but never opted in | No | No |

The default for a newly-installed or bundled plugin is `not enabled`. `zed plugins list` shows all three distinct states so you can tell what's been explicitly turned off vs. what's just waiting to be enabled.

In a running session, `/plugins` shows which plugins are currently loaded.

## Injecting Messages

Plugins can inject messages into the active conversation using `ctx.inject_message()`:

```python
ctx.inject_message("New data arrived from the webhook", role="user")
```

**Signature:** `ctx.inject_message(content: str, role: str = "user") -> bool`

How it works:

- If the agent is **idle** (waiting for user input), the message is queued as the next input and starts a new turn.
- If the agent is **mid-turn** (actively running), the message interrupts the current operation â€” the same as a user typing a new message and pressing Enter.
- For non-`"user"` roles, the content is prefixed with `[role]` (e.g. `[system] ...`).
- Returns `True` if the message was queued successfully, `False` if no CLI reference is available (e.g. in gateway mode).

This enables plugins like remote control viewers, messaging bridges, or webhook receivers to feed messages into the conversation from external sources.

:::note
`inject_message` is only available in CLI mode. In gateway mode, there is no CLI reference and the method returns `False`.
:::

See the **[full guide](/guides/build-a-zed-plugin)** for handler contracts, schema format, hook behavior, error handling, and common mistakes.
