---
sidebar_position: 3
title: 'Learning Path'
description: 'Choose your learning path through the Zed Agent documentation based on your experience level and goals.'
---

# Learning Path

Zed Agent can do a lot â€” CLI assistant, Telegram/Discord bot, task automation, RL training, and more. This page helps you figure out where to start and what to read based on your experience level and what you're trying to accomplish.

:::tip Start Here
If you haven't installed Zed Agent yet, begin with the [Installation guide](/getting-started/installation) and then run through the [Quickstart](/getting-started/quickstart). Everything below assumes you have a working installation.
:::

:::tip First-time provider setup
First-time users almost always want `zed setup --portal` â€” one OAuth covers a model plus the four Tool Gateway tools (search/image/TTS/browser). See [Zed Portal](/integrations/nous-portal).
:::

## How to Use This Page

- **Know your level?** Jump to the [experience-level table](#by-experience-level) and follow the reading order for your tier.
- **Have a specific goal?** Skip to [By Use Case](#by-use-case) and find the scenario that matches.
- **Just browsing?** Check the [Key Features](#key-features-at-a-glance) table for a quick overview of everything Zed Agent can do.

## By Experience Level

| Level | Goal | Recommended Reading | Time Estimate |
|---|---|---|---|
| **Beginner** | Get up and running, have basic conversations, use built-in tools | [Installation](/getting-started/installation) â†’ [Quickstart](/getting-started/quickstart) â†’ [CLI Usage](/user-guide/cli) â†’ [Configuration](/user-guide/configuration) | ~1 hour |
| **Intermediate** | Set up messaging bots, use advanced features like memory, cron jobs, and skills | [Sessions](/user-guide/sessions) â†’ [Messaging](/user-guide/messaging) â†’ [Tools](/user-guide/features/tools) â†’ [Skills](/user-guide/features/skills) â†’ [Memory](/user-guide/features/memory) â†’ [Cron](/user-guide/features/cron) | ~2â€“3 hours |
| **Advanced** | Build custom tools, create skills, train models with RL, contribute to the project | [Architecture](/developer-guide/architecture) â†’ [Adding Tools](/developer-guide/adding-tools) â†’ [Creating Skills](/developer-guide/creating-skills) â†’ [Contributing](/developer-guide/contributing) | ~4â€“6 hours |

## By Use Case

Pick the scenario that matches what you want to do. Each one links you to the relevant docs in the order you should read them.

### "I want a CLI coding assistant"

Use Zed Agent as an interactive terminal assistant for writing, reviewing, and running code.

1. [Installation](/getting-started/installation)
2. [Quickstart](/getting-started/quickstart)
3. [CLI Usage](/user-guide/cli)
4. [Code Execution](/user-guide/features/code-execution)
5. [Context Files](/user-guide/features/context-files)
6. [Tips & Tricks](/guides/tips)

:::tip
Pass files directly into your conversation with context files. Zed Agent can read, edit, and run code in your projects.
:::

### "I want a Telegram/Discord bot"

Deploy Zed Agent as a bot on your favorite messaging platform.

1. [Installation](/getting-started/installation)
2. [Configuration](/user-guide/configuration)
3. [Messaging Overview](/user-guide/messaging)
4. [Telegram Setup](/user-guide/messaging/telegram)
5. [Discord Setup](/user-guide/messaging/discord)
6. [Voice Mode](/user-guide/features/voice-mode)
7. [Use Voice Mode with Zed](/guides/use-voice-mode-with-zed)
8. [Security](/user-guide/security)

For full project examples, see:
- [Daily Briefing Bot](/guides/daily-briefing-bot)
- [Team Telegram Assistant](/guides/team-telegram-assistant)

### "I want to automate tasks"

Schedule recurring tasks, run batch jobs, or chain agent actions together.

1. [Quickstart](/getting-started/quickstart)
2. [Cron Scheduling](/user-guide/features/cron)
3. [Batch Processing](/user-guide/features/batch-processing)
4. [Delegation](/user-guide/features/delegation)
5. [Hooks](/user-guide/features/hooks)

:::tip
Cron jobs let Zed Agent run tasks on a schedule â€” daily summaries, periodic checks, automated reports â€” without you being present.
:::

### "I want to build custom tools/skills"

Extend Zed Agent with your own tools and reusable skill packages.

1. [Plugins](/user-guide/features/plugins)
2. [Build a Zed Plugin](/guides/build-a-zed-plugin)
3. [Tools Overview](/user-guide/features/tools)
4. [Skills Overview](/user-guide/features/skills)
5. [MCP (Model Context Protocol)](/user-guide/features/mcp)
6. [Architecture](/developer-guide/architecture)
7. [Adding Tools](/developer-guide/adding-tools)
8. [Creating Skills](/developer-guide/creating-skills)

:::tip
For most custom tool creation, start with plugins. The [Adding Tools](/developer-guide/adding-tools)
page is for built-in Zed core development, not the usual user/custom-tool path.
:::

### "I want to train models"

Use reinforcement learning to fine-tune model behavior with Zed Agent's RL training pipeline (powered by [Atropos](https://github.com/zedteam/atropos)).

1. [Quickstart](/getting-started/quickstart)
2. [Configuration](/user-guide/configuration)
3. [Atropos RL Environments](https://github.com/zedteam/atropos) (external)
4. [Provider Routing](/user-guide/features/provider-routing)
5. [Architecture](/developer-guide/architecture)

:::tip
RL training works best when you already understand the basics of how Zed Agent handles conversations and tool calls. Run through the Beginner path first if you're new.
:::

### "I want to use it as a Python library"

Integrate Zed Agent into your own Python applications programmatically.

1. [Installation](/getting-started/installation)
2. [Quickstart](/getting-started/quickstart)
3. [Python Library Guide](/guides/python-library)
4. [Architecture](/developer-guide/architecture)
5. [Tools](/user-guide/features/tools)
6. [Sessions](/user-guide/sessions)

## Key Features at a Glance

Not sure what's available? Here's a quick directory of major features:

| Feature | What It Does | Link |
|---|---|---|
| **Tools** | Built-in tools the agent can call (file I/O, search, shell, etc.) | [Tools](/user-guide/features/tools) |
| **Skills** | Installable plugin packages that add new capabilities | [Skills](/user-guide/features/skills) |
| **Memory** | Persistent memory across sessions | [Memory](/user-guide/features/memory) |
| **Context Files** | Feed files and directories into conversations | [Context Files](/user-guide/features/context-files) |
| **MCP** | Connect to external tool servers via Model Context Protocol | [MCP](/user-guide/features/mcp) |
| **Cron** | Schedule recurring agent tasks | [Cron](/user-guide/features/cron) |
| **Delegation** | Spawn sub-agents for parallel work | [Delegation](/user-guide/features/delegation) |
| **Code Execution** | Run Python scripts that call Zed tools programmatically | [Code Execution](/user-guide/features/code-execution) |
| **Browser** | Web browsing and scraping | [Browser](/user-guide/features/browser) |
| **Hooks** | Event-driven callbacks and middleware | [Hooks](/user-guide/features/hooks) |
| **Batch Processing** | Process multiple inputs in bulk | [Batch Processing](/user-guide/features/batch-processing) |
| **Provider Routing** | Route requests across multiple LLM providers | [Provider Routing](/user-guide/features/provider-routing) |

## What to Read Next

Based on where you are right now:

- **Just finished installing?** â†’ Head to the [Quickstart](/getting-started/quickstart) to run your first conversation.
- **Completed the Quickstart?** â†’ Read [CLI Usage](/user-guide/cli) and [Configuration](/user-guide/configuration) to customize your setup.
- **Comfortable with the basics?** â†’ Explore [Tools](/user-guide/features/tools), [Skills](/user-guide/features/skills), and [Memory](/user-guide/features/memory) to unlock the full power of the agent.
- **Setting up for a team?** â†’ Read [Security](/user-guide/security) and [Sessions](/user-guide/sessions) to understand access control and conversation management.
- **Ready to build?** â†’ Jump into the [Developer Guide](/developer-guide/architecture) to understand the internals and start contributing.
- **Want practical examples?** â†’ Check out the [Guides](/guides/tips) section for real-world projects and tips.

:::tip
You don't need to read everything. Pick the path that matches your goal, follow the links in order, and you'll be productive quickly. You can always come back to this page to find your next step.
:::
