<p align="center">
  <img src="assets/banner.png" alt="Zed Agent" width="100%">
</p>

# Zed Agent â˜¤
<p align="center">
  <a href="https://zed-agent.nousresearch.com/">Zed Agent</a> | <a href="https://zed-agent.nousresearch.com/">Zed Desktop</a>
</p>
<p align="center">
  <a href="https://zed-agent.nousresearch.com/docs/"><img src="https://img.shields.io/badge/Docs-zed--agent.nousresearch.com-FFD700?style=for-the-badge" alt="Documentation"></a>
  <a href="https://discord.gg/NousResearch"><img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/NousResearch/zed-agent/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License: MIT"></a>
  <a href="https://nousresearch.com"><img src="https://img.shields.io/badge/Built%20by-Nous%20Research-blueviolet?style=for-the-badge" alt="Built by Zed Team"></a>
  <a href="README.zh-CN.md"><img src="https://img.shields.io/badge/Lang-ä¸­æ–‡-red?style=for-the-badge" alt="ä¸­æ–‡"></a>
  <a href="README.ur-pk.md"><img src="https://img.shields.io/badge/Lang-Ø§Ø±Ø¯Ùˆ-green?style=for-the-badge" alt="Ø§Ø±Ø¯Ùˆ"></a>
</p>

**The self-improving AI agent built by [Zed Team](https://nousresearch.com).** It's the only agent with a built-in learning loop â€” it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions. Run it on a $5 VPS, a GPU cluster, or serverless infrastructure that costs nearly nothing when idle. It's not tied to your laptop â€” talk to it from Telegram while it works on a cloud VM.

Use any model you want â€” [Nous Portal](https://portal.nousresearch.com), [OpenRouter](https://openrouter.ai) (200+ models), [NovitaAI](https://novita.ai) (AI-native cloud for Model API, Agent Sandbox, and GPU Cloud), [NVIDIA NIM](https://build.nvidia.com) (Nemotron), [Xiaomi MiMo](https://platform.xiaomimimo.com), [z.ai/GLM](https://z.ai), [Kimi/Moonshot](https://platform.moonshot.ai), [MiniMax](https://www.minimax.io), [Hugging Face](https://huggingface.co), OpenAI, or your own endpoint. Switch with `zed model` â€” no code changes, no lock-in.

<table>
<tr><td><b>A real terminal interface</b></td><td>Full TUI with multiline editing, slash-command autocomplete, conversation history, interrupt-and-redirect, and streaming tool output.</td></tr>
<tr><td><b>Lives where you do</b></td><td>Telegram, Discord, Slack, WhatsApp, Signal, and CLI â€” all from a single gateway process. Voice memo transcription, cross-platform conversation continuity.</td></tr>
<tr><td><b>A closed learning loop</b></td><td>Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall. <a href="https://github.com/plastic-labs/honcho">Honcho</a> dialectic user modeling. Compatible with the <a href="https://agentskills.io">agentskills.io</a> open standard.</td></tr>
<tr><td><b>Scheduled automations</b></td><td>Built-in cron scheduler with delivery to any platform. Daily reports, nightly backups, weekly audits â€” all in natural language, running unattended.</td></tr>
<tr><td><b>Delegates and parallelizes</b></td><td>Spawn isolated subagents for parallel workstreams. Write Python scripts that call tools via RPC, collapsing multi-step pipelines into zero-context-cost turns.</td></tr>
<tr><td><b>Runs anywhere, not just your laptop</b></td><td>Six terminal backends â€” local, Docker, SSH, Singularity, Modal, and Daytona. Daytona and Modal offer serverless persistence â€” your agent's environment hibernates when idle and wakes on demand, costing nearly nothing between sessions. Run it on a $5 VPS or a GPU cluster.</td></tr>
<tr><td><b>Research-ready</b></td><td>Batch trajectory generation, trajectory compression for training the next generation of tool-calling models.</td></tr>
</table>

---

## Quick Install

### Linux, macOS, WSL2, Termux

```bash
curl -fsSL https://zed-agent.nousresearch.com/install.sh | bash
```

### Windows (native, PowerShell)

> **Heads up:** Native Windows runs Zed without WSL â€” CLI, gateway, TUI, and tools all work natively. If you'd rather use WSL2, the Linux/macOS one-liner above works there too. Found a bug? Please [file issues](https://github.com/NousResearch/zed-agent/issues).

Run this in PowerShell:

```powershell
iex (irm https://zed-agent.nousresearch.com/install.ps1)
```

The installer handles everything: uv, Python 3.11, Node.js, ripgrep, ffmpeg, **and a portable Git Bash** (MinGit, unpacked to `%LOCALAPPDATA%\zed\git` â€” no admin required, completely isolated from any system Git install). Zed uses this bundled Git Bash to run shell commands.

If you already have Git installed, the installer detects it and uses that instead. Otherwise a ~45MB MinGit download is all you need â€” it won't touch or interfere with any system Git.

> **Android / Termux:** The tested manual path is documented in the [Termux guide](https://zed-agent.nousresearch.com/docs/getting-started/termux). On Termux, Zed installs a curated `.[termux]` extra because the full `.[all]` extra currently pulls Android-incompatible voice dependencies.
>
> **Windows:** Native Windows is fully supported â€” the PowerShell one-liner above installs everything. If you'd rather use WSL2, the Linux command works there too. Native Windows install lives under `%LOCALAPPDATA%\zed`; WSL2 installs under `~/.zed` as on Linux.

After installation:

```bash
source ~/.bashrc    # reload shell (or: source ~/.zshrc)
zed              # start chatting!
```

---

## Getting Started

```bash
zed              # Interactive CLI â€” start a conversation
zed model        # Choose your LLM provider and model
zed tools        # Configure which tools are enabled
zed config set   # Set individual config values
zed gateway      # Start the messaging gateway (Telegram, Discord, etc.)
zed setup        # Run the full setup wizard (configures everything at once)
zed claw migrate # Migrate from OpenClaw (if coming from OpenClaw)
zed update       # Update to the latest version
zed doctor       # Diagnose any issues
```

ðŸ“– **[Full documentation â†’](https://zed-agent.nousresearch.com/docs/)**

---

## Skip the API-key collection â€” Nous Portal

Zed works with whatever provider you want â€” that's not changing. But if you'd rather not collect five separate API keys for the model, web search, image generation, TTS, and a cloud browser, **[Nous Portal](https://portal.nousresearch.com)** covers all of them under one subscription:

- **300+ models** â€” pick any of them with `/model <name>`
- **Tool Gateway** â€” web search (Firecrawl), image generation (FAL), text-to-speech (OpenAI), cloud browser (Browser Use), all routed through your sub. No extra accounts.

One command from a fresh install:

```bash
zed setup --portal
```

That logs you in via OAuth, sets Nous as your provider, and turns on the Tool Gateway. Check what's wired up any time with `zed portal info`. Full details on the [Tool Gateway docs page](https://zed-agent.nousresearch.com/docs/user-guide/features/tool-gateway).

You can still bring your own keys per-tool whenever you want â€” the gateway is per-backend, not all-or-nothing.

---

## CLI vs Messaging Quick Reference

Zed has two entry points: start the terminal UI with `zed`, or run the gateway and talk to it from Telegram, Discord, Slack, WhatsApp, Signal, or Email. Once you're in a conversation, many slash commands are shared across both interfaces.

| Action                         | CLI                                           | Messaging platforms                                                              |
| ------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------------- |
| Start chatting                 | `zed`                                      | Run `zed gateway setup` + `zed gateway start`, then send the bot a message |
| Start fresh conversation       | `/new` or `/reset`                            | `/new` or `/reset`                                                               |
| Change model                   | `/model [provider:model]`                     | `/model [provider:model]`                                                        |
| Set a personality              | `/personality [name]`                         | `/personality [name]`                                                            |
| Retry or undo the last turn    | `/retry`, `/undo`                             | `/retry`, `/undo`                                                                |
| Compress context / check usage | `/compress`, `/usage`, `/insights [--days N]` | `/compress`, `/usage`, `/insights [days]`                                        |
| Browse skills                  | `/skills` or `/<skill-name>`                  | `/<skill-name>`                                                                  |
| Interrupt current work         | `Ctrl+C` or send a new message                | `/stop` or send a new message                                                    |
| Platform-specific status       | `/platforms`                                  | `/status`, `/sethome`                                                            |

For the full command lists, see the [CLI guide](https://zed-agent.nousresearch.com/docs/user-guide/cli) and the [Messaging Gateway guide](https://zed-agent.nousresearch.com/docs/user-guide/messaging).

---

## Documentation

All documentation lives at **[zed-agent.nousresearch.com/docs](https://zed-agent.nousresearch.com/docs/)**:

| Section                                                                                             | What's Covered                                             |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Quickstart](https://zed-agent.nousresearch.com/docs/getting-started/quickstart)                 | Install â†’ setup â†’ first conversation in 2 minutes          |
| [CLI Usage](https://zed-agent.nousresearch.com/docs/user-guide/cli)                              | Commands, keybindings, personalities, sessions             |
| [Configuration](https://zed-agent.nousresearch.com/docs/user-guide/configuration)                | Config file, providers, models, all options                |
| [Messaging Gateway](https://zed-agent.nousresearch.com/docs/user-guide/messaging)                | Telegram, Discord, Slack, WhatsApp, Signal, Home Assistant |
| [Security](https://zed-agent.nousresearch.com/docs/user-guide/security)                          | Command approval, DM pairing, container isolation          |
| [Tools & Toolsets](https://zed-agent.nousresearch.com/docs/user-guide/features/tools)            | 40+ tools, toolset system, terminal backends               |
| [Skills System](https://zed-agent.nousresearch.com/docs/user-guide/features/skills)              | Procedural memory, Skills Hub, creating skills             |
| [Memory](https://zed-agent.nousresearch.com/docs/user-guide/features/memory)                     | Persistent memory, user profiles, best practices           |
| [MCP Integration](https://zed-agent.nousresearch.com/docs/user-guide/features/mcp)               | Connect any MCP server for extended capabilities           |
| [Cron Scheduling](https://zed-agent.nousresearch.com/docs/user-guide/features/cron)              | Scheduled tasks with platform delivery                     |
| [Context Files](https://zed-agent.nousresearch.com/docs/user-guide/features/context-files)       | Project context that shapes every conversation             |
| [Architecture](https://zed-agent.nousresearch.com/docs/developer-guide/architecture)             | Project structure, agent loop, key classes                 |
| [Contributing](https://zed-agent.nousresearch.com/docs/developer-guide/contributing)             | Development setup, PR process, code style                  |
| [CLI Reference](https://zed-agent.nousresearch.com/docs/reference/cli-commands)                  | All commands and flags                                     |
| [Environment Variables](https://zed-agent.nousresearch.com/docs/reference/environment-variables) | Complete env var reference                                 |

---

## Migrating from OpenClaw

If you're coming from OpenClaw, Zed can automatically import your settings, memories, skills, and API keys.

**During first-time setup:** The setup wizard (`zed setup`) automatically detects `~/.openclaw` and offers to migrate before configuration begins.

**Anytime after install:**

```bash
zed claw migrate              # Interactive migration (full preset)
zed claw migrate --dry-run    # Preview what would be migrated
zed claw migrate --preset user-data   # Migrate without secrets
zed claw migrate --overwrite  # Overwrite existing conflicts
```

What gets imported:

- **SOUL.md** â€” persona file
- **Memories** â€” MEMORY.md and USER.md entries
- **Skills** â€” user-created skills â†’ `~/.zed/skills/openclaw-imports/`
- **Command allowlist** â€” approval patterns
- **Messaging settings** â€” platform configs, allowed users, working directory
- **API keys** â€” allowlisted secrets (Telegram, OpenRouter, OpenAI, Anthropic, ElevenLabs)
- **TTS assets** â€” workspace audio files
- **Workspace instructions** â€” AGENTS.md (with `--workspace-target`)

See `zed claw migrate --help` for all options, or use the `openclaw-migration` skill for an interactive agent-guided migration with dry-run previews.

---

## Contributing

We welcome contributions! See the [Contributing Guide](https://zed-agent.nousresearch.com/docs/developer-guide/contributing) for development setup, code style, and PR process.

Quick start for contributors â€” use the standard installer, then work from the
full git checkout it creates at `$ZED_HOME/zed-agent` (usually
`~/.zed/zed-agent`). This matches the layout used by `zed update`, the
managed venv, lazy dependencies, gateway, and docs tooling.

```bash
curl -fsSL https://zed-agent.nousresearch.com/install.sh | bash
cd "${ZED_HOME:-$HOME/.zed}/zed-agent"
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

Manual clone fallback (for throwaway clones/CI where you intentionally do not
want the managed install layout):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv .venv --python 3.11
source .venv/bin/activate
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

---

## Community

- ðŸ’¬ [Discord](https://discord.gg/NousResearch)
- ðŸ“š [Skills Hub](https://agentskills.io)
- ðŸ› [Issues](https://github.com/NousResearch/zed-agent/issues)
- ðŸ”Œ [computer-use-linux](https://github.com/avifenesh/computer-use-linux) â€” Linux desktop-control MCP server for Zed and other MCP hosts, with AT-SPI accessibility trees, Wayland/X11 input, screenshots, and compositor window targeting.
- ðŸ”Œ [ZedClaw](https://github.com/AaronWong1999/zedclaw) â€” Community WeChat bridge: Run Zed Agent and OpenClaw on the same WeChat account.

---

## License

MIT â€” see [LICENSE](LICENSE).

Built by [Zed Team](https://nousresearch.com).
