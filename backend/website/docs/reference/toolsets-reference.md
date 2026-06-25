---
sidebar_position: 4
title: "Toolsets Reference"
description: "Reference for Zed core, composite, platform, and dynamic toolsets"
---

# Toolsets Reference

Toolsets are named bundles of tools that control what the agent can do. They're the primary mechanism for configuring tool availability per platform, per session, or per task.

## How Toolsets Work

Every tool belongs to exactly one toolset. When you enable a toolset, all tools in that bundle become available to the agent. Toolsets come in three kinds:

- **Core** â€” A single logical group of related tools (e.g., `file` bundles `read_file`, `write_file`, `patch`, `search_files`)
- **Composite** â€” Combines multiple core toolsets for a common scenario (e.g., `debugging` bundles file, terminal, and web tools)
- **Platform** â€” A complete tool configuration for a specific deployment context (e.g., `zed-cli` is the default for interactive CLI sessions)

## Configuring Toolsets

### Per-session (CLI)

```bash
zed chat --toolsets web,file,terminal
zed chat --toolsets debugging        # composite â€” expands to file + terminal + web
zed chat --toolsets all              # everything
```

### Per-platform (config.yaml)

```yaml
toolsets:
  - zed-cli          # default for CLI
  # - zed-telegram   # override for Telegram gateway
```

### Interactive management

```bash
zed tools                            # curses UI to enable/disable per platform
```

Or in-session:

```
/tools list
/tools disable browser
/tools enable homeassistant
```

## Core Toolsets

| Toolset | Tools | Purpose |
|---------|-------|---------|
| `browser` | `browser_back`, `browser_cdp`, `browser_click`, `browser_console`, `browser_dialog`, `browser_get_images`, `browser_navigate`, `browser_press`, `browser_scroll`, `browser_snapshot`, `browser_type`, `browser_vision`, `web_search` | Core browser automation. Includes `web_search` as a fallback for quick lookups. `browser_cdp` and `browser_dialog` are gated at runtime â€” registered only when a CDP endpoint is reachable at session start (via `/browser connect`, `browser.cdp_url` config, Browserbase, or Camofox). `browser_dialog` works together with the `pending_dialogs` and `frame_tree` fields that `browser_snapshot` adds when a CDP supervisor is attached. |
| `clarify` | `clarify` | Ask the user a question when the agent needs clarification. |
| `code_execution` | `execute_code` | Run Python scripts that call Zed tools programmatically. |
| `cronjob` | `cronjob` | Schedule and manage recurring tasks. |
| `debugging` | composite (`file` + `terminal` + `web`) | Debug bundle â€” file, process/terminal, web extract/search. |
| `delegation` | `delegate_task` | Spawn isolated subagent instances for parallel work. |
| `discord` | `discord` | Core Discord text/embed/DM actions (gateway-only). Active on the `zed-discord` toolset. |
| `discord_admin` | `discord_admin` | Discord moderation (bans, role changes, channel management). Active on the `zed-discord` toolset; requires the bot to hold the relevant Discord permissions. |
| `feishu_doc` | `feishu_doc_read` | Read Feishu/Lark document content. Used by the Feishu document-comment intelligent-reply handler. |
| `feishu_drive` | `feishu_drive_add_comment`, `feishu_drive_list_comments`, `feishu_drive_list_comment_replies`, `feishu_drive_reply_comment` | Feishu/Lark drive comment operations. Scoped to the comment agent; not exposed on `zed-cli` or other messaging toolsets. |
| `file` | `patch`, `read_file`, `search_files`, `write_file` | File reading, writing, searching, and editing. |
| `homeassistant` | `ha_call_service`, `ha_get_state`, `ha_list_entities`, `ha_list_services` | Smart home control via Home Assistant. Only available when `HASS_TOKEN` is set. |
| `computer_use` | `computer_use` | Background macOS desktop control via cua-driver â€” does not steal cursor/focus. Works with any tool-capable model. macOS only; requires `cua-driver` on `$PATH`. |
| `context_engine` | (varies) | Runtime tools exposed by the active context-engine plugin (empty until a plugin populates it). |
| `image_gen` | `image_generate` | Text-to-image generation via FAL.ai (with opt-in OpenAI / xAI backends). |
| `video_gen` | `video_generate` | Text-to-video and image-to-video via plugin-registered backends (xAI Grok-Imagine, FAL.ai Veo 3.1 / Pixverse v6 / Kling O3). Pass `image_url` to animate an image; omit it for text-to-video. |
| `kanban` | `kanban_block`, `kanban_comment`, `kanban_complete`, `kanban_create`, `kanban_heartbeat`, `kanban_link`, `kanban_list`, `kanban_show`, `kanban_unblock` | Multi-agent coordination tools. Registered for dispatcher-spawned task workers (`ZED_KANBAN_TASK`) and for profiles that explicitly list the `kanban` toolset by name (the `all`/`*` wildcard does **not** enable it). Workers mark tasks done, block, heartbeat, comment, and create/link follow-up tasks; orchestrator profiles additionally get board-routing tools like list/unblock. |
| `memory` | `memory` | Persistent cross-session memory management. |
| `messaging` | `send_message` | Send messages to other platforms (Telegram, Discord, etc.) from within a session. |
| `moa` | `mixture_of_agents` | Multi-model consensus via Mixture of Agents. |
| `safe` | `image_generate`, `vision_analyze`, `web_extract`, `web_search` (via `includes`) | Read-only research + media generation. No file writes, no terminal, no code execution. |
| `search` | `web_search` | Web search only (without extract). |
| `session_search` | `session_search` | Search past conversation sessions. |
| `skills` | `skill_manage`, `skill_view`, `skills_list` | Skill CRUD and browsing. |
| `spotify` | `spotify_albums`, `spotify_devices`, `spotify_library`, `spotify_playback`, `spotify_playlists`, `spotify_queue`, `spotify_search` | Native Spotify control (playback, queue, search, playlists, albums, library). Registered by the bundled `spotify` plugin. |
| `terminal` | `process`, `terminal` | Shell command execution and background process management. |
| `todo` | `todo` | Task list management within a session. |
| `tts` | `text_to_speech` | Text-to-speech audio generation. |
| `vision` | `vision_analyze` | Image analysis via vision-capable models. |
| `video` | `video_analyze` | Video analysis and understanding tools (opt-in, not in the default toolset â€” add explicitly via `--toolsets`). |
| `web` | `web_extract`, `web_search` | Web search and page content extraction. |
| `x_search` | `x_search` | Search X (Twitter) posts and threads via xAI's built-in `x_search` Responses tool. Off by default; opt in via `zed tools`. Schema only registered when xAI credentials (SuperGrok OAuth or `XAI_API_KEY`) are configured. |
| `yuanbao` | `yb_query_group_info`, `yb_query_group_members`, `yb_search_sticker`, `yb_send_dm`, `yb_send_sticker` | Yuanbao DM/group actions and sticker search. Registered only on `zed-yuanbao`. |

## Platform Toolsets

Platform toolsets define the complete tool configuration for a deployment target. Most messaging platforms use the same set as `zed-cli`:

| Toolset | Differences from `zed-cli` |
|---------|-------------------------------|
| `zed-cli` | Full toolset â€” the default for interactive CLI sessions. Includes file, terminal, web, browser, memory, skills, vision, image_gen, todo, tts, delegation, code_execution, cronjob, session_search, clarify, and `safe` (read-only) bundles plus the standard messaging tools. |
| `zed-acp` | Drops `clarify`, `cronjob`, `image_generate`, `send_message`, `text_to_speech`, and all four Home Assistant tools. Focused on coding tasks in IDE context. |
| `zed-api-server` | Drops `clarify`, `send_message`, and `text_to_speech`. Keeps everything else â€” suitable for programmatic access where user interaction isn't possible. |
| `zed-cron` | Same as `zed-cli`. |
| `zed-telegram` | Same as `zed-cli`. |
| `zed-discord` | Adds `discord` and `discord_admin` on top of `zed-cli`. |
| `zed-slack` | Same as `zed-cli`. |
| `zed-whatsapp` | Same as `zed-cli`. |
| `zed-signal` | Same as `zed-cli`. |
| `zed-matrix` | Same as `zed-cli`. |
| `zed-mattermost` | Same as `zed-cli`. |
| `zed-email` | Same as `zed-cli`. |
| `zed-sms` | Same as `zed-cli`. |
| `zed-bluebubbles` | Same as `zed-cli`. |
| `zed-dingtalk` | Same as `zed-cli`. |
| `zed-feishu` | Adds the five `feishu_doc_*` / `feishu_drive_*` tools (only used by the document-comment handler, not the regular chat adapter). |
| `zed-qqbot` | Same as `zed-cli`. |
| `zed-wecom` | Same as `zed-cli`. |
| `zed-wecom-callback` | Same as `zed-cli`. |
| `zed-weixin` | Same as `zed-cli`. |
| `zed-yuanbao` | Adds the five `yb_*` tools (DM/group/sticker) on top of `zed-cli`. |
| `zed-homeassistant` | Same as `zed-cli` (the Home Assistant tools are already present by default and activate when `HASS_TOKEN` is set). |
| `zed-webhook` | Same as `zed-cli`. |
| `zed-gateway` | Internal gateway orchestrator toolset â€” union of every `zed-<platform>` toolset; used when the gateway needs to accept any message source. |

## Dynamic Toolsets

### MCP server toolsets

Each configured MCP server generates a `mcp-<server>` toolset at runtime. For example, if you configure a `github` MCP server, a `mcp-github` toolset is created containing all tools that server exposes.

```yaml
# config.yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
```

This creates a `mcp-github` toolset you can reference in `--toolsets` or platform configs.

### Plugin toolsets

Plugins can register their own toolsets via `ctx.register_tool()` during plugin initialization. These appear alongside built-in toolsets and can be enabled/disabled the same way.

### Custom toolsets

Define custom toolsets in `config.yaml` to create project-specific bundles:

```yaml
toolsets:
  - zed-cli
custom_toolsets:
  data-science:
    - file
    - terminal
    - code_execution
    - web
    - vision
```

### Wildcards

- `all` or `*` â€” expands to every registered toolset (built-in + dynamic + plugin)

A handful of tools have an additional availability check on top of toolset membership and are **not** turned on by `all`/`*` alone:

- **Capability-gated** tools (browser, `computer_use`, `code_execution`, Feishu, Home Assistant, cronjob) appear only when their backend/credential prerequisite is configured.
- **Workflow-gated** tools â€” the `kanban` toolset â€” are deliberately opt-in. `all`/`*` does **not** enable kanban; you must list `kanban` explicitly (or be a dispatcher-spawned worker with `ZED_KANBAN_TASK` set). Kanban tools mutate shared board state, so they stay off by default even under `all`.

## Relationship to `zed tools`

The `zed tools` command provides a curses-based UI for toggling individual tools on or off per platform. This operates at the tool level (finer than toolsets) and persists to `config.yaml`. Disabled tools are filtered out even if their toolset is enabled.

See also: [Tools Reference](./tools-reference.md) for the complete list of individual tools and their parameters.
