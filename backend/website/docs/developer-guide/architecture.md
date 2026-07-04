---
sidebar_position: 1
title: "Architecture"
description: "Zed Agent internals â€” major subsystems, execution paths, data flow, and where to read next"
---

# Architecture

This page is the top-level map of Zed Agent internals. Use it to orient yourself in the codebase, then dive into subsystem-specific docs for implementation details.

## System Overview

```text
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        Entry Points                                  â”‚
â”‚                                                                      â”‚
â”‚  CLI (cli.py)    Gateway (gateway/run.py)    ACP (acp_adapter/)     â”‚
â”‚  Batch Runner    API Server                  Python Library          â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â”‚              â”‚                       â”‚
           â–¼              â–¼                       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                     AIAgent (run_agent.py)                          â”‚
â”‚                                                                     â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”               â”‚
â”‚  â”‚ Prompt       â”‚  â”‚ Provider     â”‚  â”‚ Tool         â”‚               â”‚
â”‚  â”‚ Builder      â”‚  â”‚ Resolution   â”‚  â”‚ Dispatch     â”‚               â”‚
â”‚  â”‚ (prompt_     â”‚  â”‚ (runtime_    â”‚  â”‚ (model_      â”‚               â”‚
â”‚  â”‚  builder.py) â”‚  â”‚  provider.py)â”‚  â”‚  tools.py)   â”‚               â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜               â”‚
â”‚         â”‚                 â”‚                 â”‚                       â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”               â”‚
â”‚  â”‚ Compression  â”‚  â”‚ 3 API Modes  â”‚  â”‚ Tool Registryâ”‚               â”‚
â”‚  â”‚ & Caching    â”‚  â”‚ chat_compl.  â”‚  â”‚ (registry.py)â”‚               â”‚
â”‚  â”‚              â”‚  â”‚ codex_resp.  â”‚  â”‚ 70+ tools    â”‚               â”‚
â”‚  â”‚              â”‚  â”‚ anthropic    â”‚  â”‚ 28 toolsets  â”‚               â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜               â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â”‚                                    â”‚
           â–¼                                    â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Session Storage   â”‚              â”‚ Tool Backends         â”‚
â”‚ (SQLite + FTS5)   â”‚              â”‚ Terminal (6 backends) â”‚
â”‚ zed_state.py   â”‚              â”‚ Browser (5 backends)  â”‚
â”‚ gateway/session.pyâ”‚              â”‚ Web (4 backends)      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜              â”‚ MCP (dynamic)         â”‚
                                   â”‚ File, Vision, etc.    â”‚
                                   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Directory Structure

```text
zed-agent/
â”œâ”€â”€ run_agent.py              # AIAgent â€” core conversation loop (large file)
â”œâ”€â”€ cli.py                    # ZedCLI â€” interactive terminal UI (large file)
â”œâ”€â”€ model_tools.py            # Tool discovery, schema collection, dispatch
â”œâ”€â”€ toolsets.py               # Tool groupings and platform presets
â”œâ”€â”€ zed_state.py           # SQLite session/state database with FTS5
â”œâ”€â”€ zed_constants.py       # ZED_HOME, profile-aware paths
â”œâ”€â”€ batch_runner.py           # Batch trajectory generation
â”‚
â”œâ”€â”€ agent/                    # Agent internals
â”‚   â”œâ”€â”€ prompt_builder.py     # System prompt assembly
â”‚   â”œâ”€â”€ context_engine.py     # ContextEngine ABC (pluggable)
â”‚   â”œâ”€â”€ context_compressor.py # Default engine â€” lossy summarization
â”‚   â”œâ”€â”€ prompt_caching.py     # Anthropic prompt caching
â”‚   â”œâ”€â”€ auxiliary_client.py   # Auxiliary LLM for side tasks (vision, summarization)
â”‚   â”œâ”€â”€ model_metadata.py     # Model context lengths, token estimation
â”‚   â”œâ”€â”€ models_dev.py         # models.dev registry integration
â”‚   â”œâ”€â”€ anthropic_adapter.py  # Anthropic Messages API format conversion
â”‚   â”œâ”€â”€ display.py            # KawaiiSpinner, tool preview formatting
â”‚   â”œâ”€â”€ skill_commands.py     # Skill slash commands
â”‚   â”œâ”€â”€ memory_manager.py    # Memory manager orchestration
â”‚   â”œâ”€â”€ memory_provider.py   # Memory provider ABC
â”‚   â””â”€â”€ trajectory.py         # Trajectory saving helpers
â”‚
â”œâ”€â”€ zed_cli/               # CLI subcommands and setup
â”‚   â”œâ”€â”€ main.py               # Entry point â€” all `zed` subcommands (large file)
â”‚   â”œâ”€â”€ config.py             # DEFAULT_CONFIG, OPTIONAL_ENV_VARS, migration
â”‚   â”œâ”€â”€ commands.py           # COMMAND_REGISTRY â€” central slash command definitions
â”‚   â”œâ”€â”€ auth.py               # PROVIDER_REGISTRY, credential resolution
â”‚   â”œâ”€â”€ runtime_provider.py   # Provider â†’ api_mode + credentials
â”‚   â”œâ”€â”€ models.py             # Model catalog, provider model lists
â”‚   â”œâ”€â”€ model_switch.py       # /model command logic (CLI + gateway shared)
â”‚   â”œâ”€â”€ setup.py              # Interactive setup wizard (large file)
â”‚   â”œâ”€â”€ skin_engine.py        # CLI theming engine
â”‚   â”œâ”€â”€ skills_config.py      # zed skills â€” enable/disable per platform
â”‚   â”œâ”€â”€ skills_hub.py         # /skills slash command
â”‚   â”œâ”€â”€ tools_config.py       # zed tools â€” enable/disable per platform
â”‚   â”œâ”€â”€ plugins.py            # PluginManager â€” discovery, loading, hooks
â”‚   â”œâ”€â”€ callbacks.py          # Terminal callbacks (clarify, sudo, approval)
â”‚   â””â”€â”€ gateway.py            # zed gateway start/stop
â”‚
â”œâ”€â”€ tools/                    # Tool implementations (one file per tool)
â”‚   â”œâ”€â”€ registry.py           # Central tool registry
â”‚   â”œâ”€â”€ approval.py           # Dangerous command detection
â”‚   â”œâ”€â”€ terminal_tool.py      # Terminal orchestration
â”‚   â”œâ”€â”€ process_registry.py   # Background process management
â”‚   â”œâ”€â”€ file_tools.py         # read_file, write_file, patch, search_files
â”‚   â”œâ”€â”€ web_tools.py          # web_search, web_extract
â”‚   â”œâ”€â”€ browser_tool.py       # 10 browser automation tools
â”‚   â”œâ”€â”€ code_execution_tool.py # execute_code sandbox
â”‚   â”œâ”€â”€ delegate_tool.py      # Subagent delegation
â”‚   â”œâ”€â”€ mcp_tool.py           # MCP client (large file)
â”‚   â”œâ”€â”€ credential_files.py   # File-based credential passthrough
â”‚   â”œâ”€â”€ env_passthrough.py    # Env var passthrough for sandboxes
â”‚   â”œâ”€â”€ ansi_strip.py         # ANSI escape stripping
â”‚   â””â”€â”€ environments/         # Terminal backends (local, docker, ssh, modal, daytona, singularity)
â”‚
â”œâ”€â”€ gateway/                  # Messaging platform gateway
â”‚   â”œâ”€â”€ run.py                # GatewayRunner â€” message dispatch (large file)
â”‚   â”œâ”€â”€ session.py            # SessionStore â€” conversation persistence
â”‚   â”œâ”€â”€ delivery.py           # Outbound message delivery
â”‚   â”œâ”€â”€ pairing.py            # DM pairing authorization
â”‚   â”œâ”€â”€ hooks.py              # Hook discovery and lifecycle events
â”‚   â”œâ”€â”€ mirror.py             # Cross-session message mirroring
â”‚   â”œâ”€â”€ status.py             # Token locks, profile-scoped process tracking
â”‚   â”œâ”€â”€ builtin_hooks/        # Extension point for always-registered hooks (none shipped)
â”‚   â””â”€â”€ platforms/            # 20 adapters: telegram, discord, slack, whatsapp,
â”‚                             #   signal, matrix, mattermost, email, sms,
â”‚                             #   dingtalk, feishu, wecom, wecom_callback, weixin,
â”‚                             #   bluebubbles, qqbot, homeassistant, webhook, api_server,
â”‚                             #   yuanbao
â”‚
â”œâ”€â”€ acp_adapter/              # ACP server (VS Code / Zed / JetBrains)
â”œâ”€â”€ cron/                     # Scheduler (jobs.py, scheduler.py)
â”œâ”€â”€ plugins/memory/           # Memory provider plugins
â”œâ”€â”€ plugins/context_engine/   # Context engine plugins
â”œâ”€â”€ skills/                   # Bundled skills (always available)
â”œâ”€â”€ optional-skills/          # Official optional skills (install explicitly)
â”œâ”€â”€ website/                  # Docusaurus documentation site
â””â”€â”€ tests/                    # Pytest suite (~25,000 tests across ~1,250 files)
```

## Data Flow

### CLI Session

```text
User input â†’ ZedCLI.process_input()
  â†’ AIAgent.run_conversation()
    â†’ prompt_builder.build_system_prompt()
    â†’ runtime_provider.resolve_runtime_provider()
    â†’ API call (chat_completions / codex_responses / anthropic_messages)
    â†’ tool_calls? â†’ model_tools.handle_function_call() â†’ loop
    â†’ final response â†’ display â†’ save to SessionDB
```

### Gateway Message

```text
Platform event â†’ Adapter.on_message() â†’ MessageEvent
  â†’ GatewayRunner._handle_message()
    â†’ authorize user
    â†’ resolve session key
    â†’ create AIAgent with session history
    â†’ AIAgent.run_conversation()
    â†’ deliver response back through adapter
```

### Cron Job

```text
Scheduler tick â†’ load due jobs from jobs.json
  â†’ create fresh AIAgent (no history)
  â†’ inject attached skills as context
  â†’ run job prompt
  â†’ deliver response to target platform
  â†’ update job state and next_run
```

## Recommended Reading Order

If you are new to the codebase:

1. **This page** â€” orient yourself
2. **[Agent Loop Internals](./agent-loop.md)** â€” how AIAgent works
3. **[Prompt Assembly](./prompt-assembly.md)** â€” system prompt construction
4. **[Provider Runtime Resolution](./provider-runtime.md)** â€” how providers are selected
5. **[Adding Providers](./adding-providers.md)** â€” practical guide to adding a new provider
6. **[Tools Runtime](./tools-runtime.md)** â€” tool registry, dispatch, environments
7. **[Session Storage](./session-storage.md)** â€” SQLite schema, FTS5, session lineage
8. **[Gateway Internals](./gateway-internals.md)** â€” messaging platform gateway
9. **[Context Compression & Prompt Caching](./context-compression-and-caching.md)** â€” compression and caching
10. **[ACP Internals](./acp-internals.md)** â€” IDE integration

## Major Subsystems

### Agent Loop

The synchronous orchestration engine (`AIAgent` in `run_agent.py`). Handles provider selection, prompt construction, tool execution, retries, fallback, callbacks, compression, and persistence. Supports three API modes for different provider backends.

â†’ [Agent Loop Internals](./agent-loop.md)

### Prompt System

Prompt construction and maintenance across the conversation lifecycle:

- **`system_prompt.py` + `prompt_builder.py`** â€” assembles the ordered system-prompt tiers (`stable` â†’ `context` â†’ `volatile`): identity/tool guidance/skills, context files, then memory/profile/timestamp blocks
- **`prompt_caching.py`** â€” Applies Anthropic cache breakpoints for prefix caching
- **`context_compressor.py`** â€” Summarizes middle conversation turns when context exceeds thresholds

â†’ [Prompt Assembly](./prompt-assembly.md), [Context Compression & Prompt Caching](./context-compression-and-caching.md)

### Provider Resolution

A shared runtime resolver used by CLI, gateway, cron, ACP, and auxiliary calls. Maps `(provider, model)` tuples to `(api_mode, api_key, base_url)`. Handles 18+ providers, OAuth flows, credential pools, and alias resolution.

â†’ [Provider Runtime Resolution](./provider-runtime.md)

### Tool System

Central tool registry (`tools/registry.py`) with 70+ registered tools across ~28 toolsets. Each tool file self-registers at import time. The registry handles schema collection, dispatch, availability checking, and error wrapping. Terminal tools support 6 backends (local, Docker, SSH, Daytona, Modal, Singularity).

â†’ [Tools Runtime](./tools-runtime.md)

### Session Persistence

SQLite-based session storage with FTS5 full-text search. Sessions have lineage tracking (parent/child across compressions), per-platform isolation, and atomic writes with contention handling.

â†’ [Session Storage](./session-storage.md)

### Messaging Gateway

Long-running process with 20 platform adapters, unified session routing, user authorization (allowlists + DM pairing), slash command dispatch, hook system, cron ticking, and background maintenance.

â†’ [Gateway Internals](./gateway-internals.md)

### Plugin System

Three discovery sources: `~/.zed/plugins/` (user), `.zed/plugins/` (project), and pip entry points. Plugins register tools, hooks, and CLI commands through a context API. Two specialized plugin types exist: memory providers (`plugins/memory/`) and context engines (`plugins/context_engine/`). Both are single-select â€” only one of each can be active at a time, configured via `zed plugins` or `config.yaml`.

â†’ [Plugin Guide](/guides/build-a-zed-plugin), [Memory Provider Plugin](./memory-provider-plugin.md)

### Cron

First-class agent tasks (not shell tasks). Jobs store in JSON, support multiple schedule formats, can attach skills and scripts, and deliver to any platform.

â†’ [Cron Internals](./cron-internals.md)

### ACP Integration

Exposes Zed as an editor-native agent over stdio/JSON-RPC for VS Code, Zed, and JetBrains.

â†’ [ACP Internals](./acp-internals.md)

### Trajectories

Generates ShareGPT-format trajectories from agent sessions for training data generation.

â†’ [Trajectories & Training Format](./trajectory-format.md)

## Design Principles

| Principle | What it means in practice |
|-----------|--------------------------|
| **Prompt stability** | System prompt doesn't change mid-conversation. No cache-breaking mutations except explicit user actions (`/model`). |
| **Observable execution** | Every tool call is visible to the user via callbacks. Progress updates in CLI (spinner) and gateway (chat messages). |
| **Interruptible** | API calls and tool execution can be cancelled mid-flight by user input or signals. |
| **Platform-agnostic core** | One AIAgent class serves CLI, gateway, ACP, batch, and API server. Platform differences live in the entry point, not the agent. |
| **Loose coupling** | Optional subsystems (MCP, plugins, memory providers, RL environments) use registry patterns and check_fn gating, not hard dependencies. |
| **Profile isolation** | Each profile (`zed -p <name>`) gets its own ZED_HOME, config, memory, sessions, and gateway PID. Multiple profiles run concurrently. |

## File Dependency Chain

```text
tools/registry.py  (no deps â€” imported by all tool files)
       â†‘
tools/*.py  (each calls registry.register() at import time)
       â†‘
model_tools.py  (imports tools/registry + triggers tool discovery)
       â†‘
run_agent.py, cli.py, batch_runner.py, environments/
```

This chain means tool registration happens at import time, before any agent instance is created. Any `tools/*.py` file with a top-level `registry.register()` call is auto-discovered â€” no manual import list needed.
