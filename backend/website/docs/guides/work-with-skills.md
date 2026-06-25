---
sidebar_position: 12
title: "Working with Skills"
description: "Find, install, use, and create skills â€” on-demand knowledge that teaches Zed new workflows"
---

# Working with Skills

Skills are on-demand knowledge documents that teach Zed how to handle specific tasks â€” from generating ASCII art to managing GitHub PRs. This guide walks you through using them day to day.

For the full technical reference, see [Skills System](/user-guide/features/skills).

---

## Finding Skills

Every Zed installation ships with bundled skills. See what's available:

```bash
# In any chat session:
/skills

# Or from the CLI:
zed skills list
```

This shows a compact list with names and descriptions:

```
ascii-art         Generate ASCII art using pyfiglet, cowsay, boxes...
arxiv             Search and retrieve academic papers from arXiv...
github-pr-workflow Full PR lifecycle â€” create branches, commit...
plan              Plan mode â€” inspect context, write a markdown...
excalidraw        Create hand-drawn style diagrams using Excalidraw...
```

### Searching for a Skill

```bash
# Search by keyword
/skills search docker
/skills search music
```

### The Skills Hub

Official optional skills (heavier or niche skills not active by default) are available via the Hub:

```bash
# Browse official optional skills
/skills browse

# Search the hub
/skills search blockchain
```

---

## Using a Skill

Every installed skill is automatically a slash command. Just type its name:

```bash
# Load a skill and give it a task
/ascii-art Make a banner that says "HELLO WORLD"
/plan Design a REST API for a todo app
/github-pr-workflow Create a PR for the auth refactor

# Just the skill name (no task) loads it and lets you describe what you need
/excalidraw
```

You can also trigger skills through natural conversation â€” ask Zed to use a specific skill, and it will load it via the `skill_view` tool.

### Progressive Disclosure

Skills use a token-efficient loading pattern. The agent doesn't load everything at once:

1. **`skills_list()`** â€” compact list of all skills (~3k tokens). Loaded at session start.
2. **`skill_view(name)`** â€” full SKILL.md content for one skill. Loaded when the agent decides it needs that skill.
3. **`skill_view(name, file_path)`** â€” a specific reference file within the skill. Only loaded if needed.

This means skills don't cost tokens until they're actually used.

---

## Installing from the Hub

Official optional skills ship with Zed but aren't active by default. Install them explicitly:

```bash
# Install an official optional skill
zed skills install official/research/arxiv

# Install from the hub in a chat session
/skills install official/creative/songwriting-and-ai-music

# Install a single-file SKILL.md directly from any HTTP(S) URL
zed skills install https://sharethis.chat/SKILL.md
/skills install https://example.com/SKILL.md --name my-skill
```

What happens:
1. The skill directory is copied to `~/.zed/skills/`
2. It appears in your `skills_list` output
3. It becomes available as a slash command

:::tip
Installed skills take effect in new sessions. If you want it available in the current session, use `/reset` to start fresh, or add `--now` to invalidate the prompt cache immediately (costs more tokens on the next turn).
:::

### Verifying Installation

```bash
# Check it's there
zed skills list | grep arxiv

# Or in chat
/skills search arxiv
```

---

## Plugin-Provided Skills

Plugins can bundle their own skills using namespaced names (`plugin:skill`). This prevents name collisions with built-in skills.

```bash
# Load a plugin skill by its qualified name
skill_view("superpowers:writing-plans")

# Built-in skill with the same base name is unaffected
skill_view("writing-plans")
```

Plugin skills are **not** listed in the system prompt and don't appear in `skills_list`. They're opt-in â€” load them explicitly when you know a plugin provides one. When loaded, the agent sees a banner listing sibling skills from the same plugin.

For how to ship skills in your own plugin, see [Build a Zed Plugin â†’ Bundle skills](/guides/build-a-zed-plugin#bundle-skills).

---

## Configuring Skill Settings

Some skills declare configuration they need in their frontmatter:

```yaml
metadata:
  zed:
    config:
      - key: tenor.api_key
        description: "Tenor API key for GIF search"
        prompt: "Enter your Tenor API key"
        url: "https://developers.google.com/tenor/guides/quickstart"
```

When a skill with config is first loaded, Zed prompts you for the values. They're stored in `config.yaml` under `skills.config.*`.

Manage skill config from the CLI:

```bash
# Interactive config for a specific skill
zed skills config gif-search

# View all skill config
zed config show | grep '^skills\.config'
```

---

## Creating Your Own Skill

Skills are just markdown files with YAML frontmatter. Creating one takes under five minutes.

### 1. Create the Directory

```bash
mkdir -p ~/.zed/skills/my-category/my-skill
```

### 2. Write SKILL.md

```markdown title="~/.zed/skills/my-category/my-skill/SKILL.md"
---
name: my-skill
description: Brief description of what this skill does
version: 1.0.0
metadata:
  zed:
    tags: [my-tag, automation]
    category: my-category
---

# My Skill

## When to Use
Use this skill when the user asks about [specific topic] or needs to [specific task].

## Procedure
1. First, check if [prerequisite] is available
2. Run `command --with-flags`
3. Parse the output and present results

## Pitfalls
- Common failure: [description]. Fix: [solution]
- Watch out for [edge case]

## Verification
Run `check-command` to confirm the result is correct.
```

### 3. Add Reference Files (Optional)

Skills can include supporting files the agent loads on demand:

```
my-skill/
â”œâ”€â”€ SKILL.md                    # Main skill document
â”œâ”€â”€ references/
â”‚   â”œâ”€â”€ api-docs.md             # API reference the agent can consult
â”‚   â””â”€â”€ examples.md             # Example inputs/outputs
â”œâ”€â”€ templates/
â”‚   â””â”€â”€ config.yaml             # Template files the agent can use
â””â”€â”€ scripts/
    â””â”€â”€ setup.sh                # Scripts the agent can execute
```

Reference these in your SKILL.md:

```markdown
For API details, load the reference: `skill_view("my-skill", "references/api-docs.md")`
```

### 4. Test It

Start a new session and try your skill:

```bash
zed chat -q "/my-skill help me with the thing"
```

The skill appears automatically â€” no registration needed. Drop it in `~/.zed/skills/` and it's live.

:::info
The agent can also create and update skills itself using `skill_manage`. After solving a complex problem, Zed may offer to save the approach as a skill for next time.
:::

---

## Per-Platform Skill Management

Control which skills are available on which platforms:

```bash
zed skills
```

This opens an interactive TUI where you can enable or disable skills per platform (CLI, Telegram, Discord, etc.). Useful when you want certain skills only available in specific contexts â€” for example, keeping development skills off Telegram.

---

## Skills vs Memory

Both are persistent across sessions, but they serve different purposes:

| | Skills | Memory |
|---|---|---|
| **What** | Procedural knowledge â€” how to do things | Factual knowledge â€” what things are |
| **When** | Loaded on demand, only when relevant | Injected into every session automatically |
| **Size** | Can be large (hundreds of lines) | Should be compact (key facts only) |
| **Cost** | Zero tokens until loaded | Small but constant token cost |
| **Examples** | "How to deploy to Kubernetes" | "User prefers dark mode, lives in PST" |
| **Who creates** | You, the agent, or installed from Hub | The agent, based on conversations |

**Rule of thumb:** If you'd put it in a reference document, it's a skill. If you'd put it on a sticky note, it's memory.

---

## Tips

**Keep skills focused.** A skill that tries to cover "all of DevOps" will be too long and too vague. A skill that covers "deploy a Python app to Fly.io" is specific enough to be genuinely useful.

**Let the agent create skills.** After a complex multi-step task, Zed will often offer to save the approach as a skill. Say yes â€” these agent-authored skills capture the exact workflow including pitfalls that were discovered along the way.

**Use categories.** Organize skills into subdirectories (`~/.zed/skills/devops/`, `~/.zed/skills/research/`, etc.). This keeps the list manageable and helps the agent find relevant skills faster.

**Update skills when they go stale.** If you use a skill and hit issues not covered by it, tell Zed to update the skill with what you learned. Skills that aren't maintained become liabilities.

---

*For the complete skills reference â€” frontmatter fields, conditional activation, external directories, and more â€” see [Skills System](/user-guide/features/skills).*
