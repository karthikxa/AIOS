# AVDE — AI Virtual Development Environment

**Author:** Karthik  
**Repository:** [github.com/karthikxa/AIOS](https://github.com/karthikxa/AIOS)

AVDE is a self-hosted AI agent orchestration platform. It combines a Python agent engine, a web dashboard, multi-provider LLM proxy infrastructure, and a 10-pattern swarm orchestration engine into one cohesive system.

Built for developers and teams who want full control over their AI infrastructure — no vendor lock-in, no data leakage, and complete model flexibility.

---

## Table of Contents

- [Overview](#overview)
- [Core Capabilities](#core-capabilities)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Swarm Orchestration](#swarm-orchestration)
- [Auto Mode](#auto-mode)
- [Document Workloads](#document-workloads)
- [Rate-Limit Staggering](#rate-limit-staggering)
- [LLM Proxy Layer](#llm-proxy-layer)
- [Plugin System](#plugin-system)
- [Memory Providers](#memory-providers)
- [Kanban Orchestrator](#kanban-orchestrator)
- [Web Dashboard](#web-dashboard)
- [CLI & TUI](#cli--tui)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Docker Deployment](#docker-deployment)
- [Development](#development)
- [Security](#security)
- [Author](#author)

---

## Overview

AVDE (AI Virtual Development Environment) is a full-stack platform for building, deploying, and orchestrating AI agent workflows at scale. It provides:

- A **Python agent engine** that handles session management, tool execution, model routing, and plugin integration
- A **web dashboard** built with Vite for managing agents, models, plugins, and conversations
- A **swarm orchestration engine** with 10 native patterns that can scale from 3 to 250 concurrent workers
- An **LLM proxy layer** enabling seamless routing across any model provider
- A **plugin system** with 100+ plugins spanning memory, messaging, productivity, creative tools, devops, and research
- A **kanban orchestrator** for visual task management with worker lanes, retry logic, and crash recovery
- A **CLI and TUI** for terminal-based session management and orchestration

The platform is designed to be fully self-hosted, giving you complete sovereignty over your AI infrastructure. There are no external dependencies on proprietary services, no data leakage to third parties, and no vendor lock-in. You choose the models, the providers, and the deployment strategy.

---

## Core Capabilities

| Capability | Description |
|---|---|
| Multi-Provider LLM Routing | Route requests across OpenAI, Anthropic, Google, Groq, Mistral, DeepSeek, local models via Ollama/vLLM, and 50+ providers simultaneously |
| Swarm Orchestration | 10 native swarm patterns with auto-selection, auto-scaling, and document-aware workload splitting |
| Auto-Swarming | Router autonomously selects the optimal pattern and scales workers based on multi-factor complexity analysis |
| Rate-Limit Protection | Configurable stagger delays between worker spawns prevent API throttling and ensure reliable execution |
| Web Dashboard | Full-featured dashboard with chat interface, agent management, model browser, and plugin marketplace |
| CLI & TUI | Terminal interface and curses-based TUI for session listing, recap, kanban, and orchestration |
| Plugin System | Extensible architecture supporting 100+ plugins across memory, messaging, productivity, research, devops, and creative domains |
| Kanban Orchestrator | Visual task board with configurable worker lanes, automatic retry, crash recovery, and pipeline automation |
| Memory Layer | Multiple pluggable memory backends including ChromaDB, Mem0, Honcho, Holographic Memory, Byterover, and more |
| Voice Mode | Speech-to-text and text-to-speech interaction for hands-free operation |
| Skills Library | Bundled and optional skill definitions for domain-specific agent capabilities |
| Model Catalog | Built-in catalog of 50+ model providers with cost tracking and routing rules |
| Profiles | Configurable agent profiles with personality, memory, and toolset settings |
| Scheduling | Cron-based task scheduling for automated agent execution |
| Web Search | Integrated web search capability via configurable search providers |
| Image Generation | Support for image generation models and tools |
| Session Recap | Automatic session summarization and conversation history management |
| Agent Computer | Computer use capabilities for GUI automation and browser interaction |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          AVDE Platform                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐    ┌──────────────────┐                     │
│  │    Frontend      │    │     Backend      │                     │
│  │   (Vite SPA)     │◄──►│   (Zed Engine)   │                     │
│  │    Port 8000     │    │    Port 8080     │                     │
│  └──────────────────┘    └────────┬─────────┘                     │
│                                   │                               │
│                                   ▼                               │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                    LLM Proxy Layer                        │    │
│  │  Routes requests to: OpenAI, Anthropic, Google, Groq,    │    │
│  │  Mistral, DeepSeek, Ollama, vLLM, and 50+ other providers│    │
│  └──────────────────────────────────────────────────────────┘    │
│                                   │                               │
│                                   ▼                               │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                Swarm Orchestration Engine                  │    │
│  │                                                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌───────────┐  │    │
│  │  │Sequential│  │Concurrent│  │  Graph  │  │MixtureOf  │  │    │
│  │  │Workflow  │  │Workflow  │  │Workflow │  │ Agents    │  │    │
│  │  └──────────┘  └──────────┘  └────────┘  └───────────┘  │    │
│  │                                                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌───────────┐  │    │
│  │  │GroupChat │  │  Forest  │  │Hierarch│  │   Heavy   │  │    │
│  │  │          │  │  Swarm   │  │  Swarm  │  │   Swarm   │  │    │
│  │  └──────────┘  └──────────┘  └────────┘  └───────────┘  │    │
│  │                                                           │    │
│  │  ┌──────────────┐  ┌─────────────────┐                   │    │
│  │  │Swarm Router   │  │Agent Rearrange  │                   │    │
│  │  └──────────────┘  └─────────────────┘                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                   │                               │
│                                   ▼                               │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                   Infrastructure Layer                     │    │
│  │                                                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌───────────┐  │    │
│  │  │  Memory  │  │  Plugins │  │ Skills │  │  Kanban   │  │    │
│  │  │Providers │  │  100+    │  │Library  │  │Orchestrator│  │    │
│  │  └──────────┘  └──────────┘  └────────┘  └───────────┘  │    │
│  │                                                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐                 │    │
│  │  │   CLI    │  │   TUI    │  │ Sessions│                 │    │
│  │  └──────────┘  └──────────┘  └────────┘                 │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
AVDE/
│
├── backend/                          # Python agent engine
│   ├── agent/                        # Agent runtime
│   │   ├── agent_runtime_helpers.py  # Tool dispatch, parent_agent chain
│   │   ├── tool_executor.py          # Tool execution with permissions
│   │   └── ...
│   ├── tools/                        # Tool registry
│   │   ├── swarms_tool.py            # 10 swarm patterns + auto-router
│   │   ├── delegate_tool.py          # Sub-agent delegation
│   │   └── ...
│   ├── zed_cli/                      # CLI interface
│   │   ├── main.py                   # Entry point
│   │   ├── commands.py               # Command registry
│   │   ├── curses_ui.py              # Terminal UI
│   │   ├── kanban.py                 # Kanban board
│   │   ├── subcommands/              # 30+ subcommand modules
│   │   └── ...
│   ├── zed_pro/                      # Pro features
│   │   ├── conversation_loop.py      # Chat loop
│   │   ├── memory_store.py           # Memory management
│   │   ├── prompt_builder.py         # Prompt construction
│   │   └── ...
│   ├── plugins/                      # Plugin system
│   │   ├── memory/                   # Memory backends
│   │   │   ├── chroma/               # ChromaDB integration
│   │   │   ├── mem0/                 # Mem0 integration
│   │   │   ├── honcho/               # Honcho integration
│   │   │   └── ...
│   │   ├── platforms/                # Platform plugins
│   │   ├── observability/            # Monitoring plugins
│   │   └── ...
│   ├── skills/                       # Skill definitions
│   │   ├── bundled/                  # Bundled skills
│   │   └── optional/                 # Optional community skills
│   ├── server.py                     # HTTP/WebSocket server
│   ├── model_tools.py                # Model function handler
│   ├── toolsets.py                   # Toolset registration
│   ├── server.py                     # Main server entry
│   └── website/                      # Docusaurus documentation
│
├── frontend/                         # Web dashboard (Vite)
│   ├── js/                           # JavaScript modules
│   │   ├── chatbox.js                # Chat interface
│   │   ├── models-page.js            # Model browser
│   │   ├── plugins-page.js           # Plugin marketplace
│   │   ├── agent-page.js             # Agent management
│   │   ├── voice-page.js             # Voice mode
│   │   └── ...
│   ├── assets/                       # Static assets
│   │   ├── models/                   # Model provider icons
│   │   ├── plugins/                  # Plugin logos
│   │   └── ...
│   ├── index.html                    # SPA entry point
│   ├── styles.css                    # Global styles
│   ├── vite.config.js                # Vite configuration
│   └── package.json                  # Dependencies
│
├── LLM/                              # LLM proxy infrastructure
│
├── agents/                           # Agent skill definitions
│
├── memory/                           # Persistent memory storage
│
├── scripts/                          # Launcher scripts
│   ├── start.bat                     # Windows batch launcher
│   ├── start-all.ps1                 # PowerShell full-stack launcher
│   └── launch-all.ps1                # Orchestrated launcher
│
├── deploy/                           # Production deployment
│   ├── server.mjs                    # Express production server
│   ├── build.mjs                     # Build pipeline
│   ├── plugins-oauth.mjs             # OAuth middleware
│   └── .env.example                  # Environment template
│
├── .gitignore                        # Git exclusion rules
├── .gitattributes                    # Line ending configuration
├── README.md                         # This file
└── LICENSE                           # Apache License 2.0
```

---

## Swarm Orchestration

AVDE includes a native swarm orchestration engine with 10 distinct patterns. Each pattern executes using internal `delegate_task()` sub-agent calls — there are no external swarm library dependencies. The engine is self-contained in the `backend/tools/swarms_tool.py` module.

### Pattern Reference

#### 1. SequentialWorkflow
Workers execute in strict sequence. Each worker receives the output of the previous worker as context. This pattern is ideal for pipelines where each step depends on the previous one — for example, draft → review → polish.

**Worker count:** 3–10  
**Use cases:** Document editing pipelines, multi-stage analysis, approval workflows

#### 2. ConcurrentWorkflow
All workers execute simultaneously with the same input. Results are collected and merged at the end. This pattern provides maximum parallelism for independent subtasks.

**Worker count:** 3–250  
**Use cases:** Parallel research, multi-perspective analysis, bulk processing

#### 3. AgentRearrange
Custom directed acyclic graph (DAG) where you define dependencies between workers. Each worker can depend on one or more predecessors. The engine resolves the execution order from the dependency graph.

**Worker count:** 3–50  
**Use cases:** Complex workflows with branching dependencies, data processing pipelines

#### 4. GraphWorkflow
Similar to AgentRearrange but with conditional branching — edges can have conditions that determine whether the downstream worker executes. Workers can also specify custom merge strategies for combining multiple inputs.

**Worker count:** 3–50  
**Use cases:** Decision trees, conditional processing, branching analysis

#### 5. MixtureOfAgents
Multi-layer architecture where each layer contains multiple workers that process the task independently. The outputs are fed into the next layer for refinement. The final layer produces the consolidated result.

**Worker count:** 4–20 (divided across layers)  
**Use cases:** Multi-perspective analysis with iterative refinement, ensemble reasoning

#### 6. GroupChat
Round-robin discussion pattern. Workers take turns contributing to a shared conversation thread. After all workers have had their turn, a designated summarizer produces the final output.

**Worker count:** 3–15  
**Use cases:** Brainstorming sessions, debate simulation, collaborative problem-solving

#### 7. ForestSwarm
Multi-group parallel execution. Workers are organized into named groups (e.g., tech, business, user). Each group runs concurrently, and workers within each group collaborate. Results are merged across groups at the end.

**Worker count:** 3–50 (distributed across groups)  
**Use cases:** Multi-stakeholder analysis, cross-functional reviews, comprehensive assessments

#### 8. HierarchicalSwarm
Manager-to-worker tree structure. A manager agent delegates subtasks to worker agents, collects results, and produces a consolidated report. Supports multiple levels of hierarchy.

**Worker count:** 3–100  
**Use cases:** Organizational task decomposition, multi-level research, structured reporting

#### 9. HeavySwarm
Fixed four-phase pipeline: Research → Plan → Execute → Review. Each phase has a specific purpose and the output flows through all four stages sequentially. This pattern provides the most thorough and structured execution.

**Worker count:** Fixed at phases (not configurable)  
**Use cases:** Complex projects requiring thorough analysis, production-ready deliverables

#### 10. SwarmRouter
The meta-pattern. It analyzes the task using an inline heuristic (no sub-agent) and autonomously selects the optimal pattern. This is the default entry point for auto-swarming.

**Worker count:** Auto-calculated (3–250)  
**Use cases:** General-purpose entry point, when you want the system to decide

---

## Auto Mode

When using the SwarmRouter in auto mode, the system handles everything autonomously:

### Pattern Selection
The router analyzes the task using an inline heuristic that checks for:

- **Code generation** — detects code blocks, programming languages, dependencies
- **Research tasks** — detects questions, analytical language, compare/contrast patterns
- **Document processing** — detects page counts, document formats, report structures
- **Creative writing** — detects narrative language, stylistic requirements
- **Decision making** — detects choices, tradeoffs, pros/cons
- **Analysis tasks** — detects data patterns, metrics, evaluations
- **General processing** — fallback for everything else

Each category maps to a preferred swarm pattern. The heuristic runs in constant time — no LLM call is needed for pattern selection.

### Worker Scaling
Worker count is determined by multi-factor complexity analysis:

| Factor | Weight | Detection Method |
|---|---|---|
| Sentence count | 1 per 10 sentences | Tokenization |
| Question count | 2 per question | Question mark detection |
| Newline count | 1 per 20 lines | Line counting |
| Domain keywords | 3 per keyword | Keyword matching |
| Action verbs | 1 per verb | Verb detection |
| Code blocks | 5 per block | Markdown code fence detection |
| URLs | 2 per URL | URL pattern matching |

The total complexity score maps to worker count:
- **Simple (score < 10):** 3 workers
- **Moderate (score 10–30):** 5–10 workers
- **Complex (score 30–60):** 10–25 workers
- **Very Complex (score 60–100):** 25–50 workers
- **Massive (score 100+):** 50–250 workers

---

## Document Workloads

The engine can detect and handle document processing workloads. It looks for:

- Page count patterns: `"1000 pages"`, `"500-page report"`, `"chapter 3"`, etc.
- Document keywords: `"report"`, `"document"`, `"pdf"`, `"presentation"`, `"spreadsheet"`, etc.
- Processing keywords: `"summarize"`, `"analyze"`, `"extract"`, `"review"`, `"translate"`

When a document workload is detected, the engine splits the work into page-range slices:

```
Example: "Summarize this 100-page financial report" with 5 workers
  Worker 1: pages 1-20  (system prompt includes page range)
  Worker 2: pages 21-40 (system prompt includes page range)
  Worker 3: pages 41-60 (system prompt includes page range)
  Worker 4: pages 61-80 (system prompt includes page range)
  Worker 5: pages 81-100 (system prompt includes page range)
```

Each worker gets a unique slice injected into its system prompt, enabling parallel analysis of disjoint document sections.

---

## Rate-Limit Staggering

To prevent API throttling when spawning many workers simultaneously, the engine applies configurable stagger delays between worker starts:

| Worker Count | Spawn Delay | Total Spread |
|---|---|---|
| Less than 10 | 0 ms | Instant |
| 10 to 50 | 100 ms | 1–5 seconds |
| 50 to 200 | 200 ms | 10–40 seconds |
| 200+ | 300 ms | 60+ seconds |

The delay is applied via `asyncio.sleep()` between each `delegate_task()` call. This ensures that the API sees a gradual ramp-up of requests rather than a sudden spike. The stagger is configurable through the `spawn_delay_ms` parameter.

---

## LLM Proxy Layer

The LLM proxy layer handles routing AI model requests across multiple providers. It supports:

### Provider Support
- **OpenAI** — GPT-4o, GPT-4, GPT-3.5, o1, o3
- **Anthropic** — Claude 3.5, Claude 3, Opus, Sonnet, Haiku
- **Google** — Gemini 2.0, Gemini 1.5, Gemma
- **Groq** — Llama 3, Mixtral, Gemma
- **Mistral** — Mistral Large, Small, Tiny
- **DeepSeek** — DeepSeek V2, V3, R1
- **Ollama** — Any locally hosted model
- **vLLM** — Self-hosted open models
- **Together AI** — Hosted open models
- **Fireworks AI** — Hosted open models
- **Perplexity** — Sonar models
- **50+ additional providers**

### Routing Features
- Automatic fallback if a provider is unavailable
- Cost-based routing to minimize expenses
- Latency-based routing for speed optimization
- Provider-aware rate limiting

---

## Plugin System

AVDE has a modular plugin architecture with over 100 plugins:

### Memory Plugins
| Plugin | Description |
|---|---|
| ChromaDB | Vector database for semantic memory |
| Mem0 | User-specific memory with importance scoring |
| Honcho | Agent memory with conversation threading |
| Holographic Memory | Compressed holographic vector storage |
| Byterover | Binary data memory store |
| RetainDB | Retention-policy-based memory |
| Hindsight | Retrospective memory analysis |
| Supermemory | Long-term memory with summarization |
| OpenViking | Open-source memory backend |

### Platform Plugins
| Plugin | Description |
|---|---|
| Photon | Photon OS sandbox execution |
| Windows | Native Windows integration |
| macOS | Native macOS integration |
| Linux | Native Linux integration |

### Messaging Plugins
| Plugin | Description |
|---|---|
| Slack | Send and receive messages via Slack |
| Discord | Discord bot integration |
| Telegram | Telegram bot integration |
| WhatsApp | WhatsApp Cloud API integration |
| Email | IMAP/SMTP email integration |
| Signal | Signal messaging integration |
| Matrix | Matrix protocol integration |
| Teams | Microsoft Teams integration |
| DingTalk | DingTalk integration |
| Feishu | Feishu/Lark integration |
| WeCom | WeCom (WeChat Work) integration |
| QQ Bot | QQ bot integration |

### Productivity Plugins
| Plugin | Description |
|---|---|
| Notion | Notion workspace integration |
| Airtable | Airtable database integration |
| Google Workspace | Gmail, Drive, Docs, Sheets, Slides |
| OCR | Optical character recognition |
| Calendar | Calendar management |
| PowerPoint | PowerPoint generation |
| Canvas | Learning management system integration |

### Creative Plugins
| Plugin | Description |
|---|---|
| ComfyUI | Stable Diffusion workflow automation |
| Manim | Mathematical animation generation |
| P5.js | Creative coding sketches |
| Excalidraw | Diagram generation |
| Blender MCP | 3D modeling via Blender |
| ASCII Art | ASCII art generation |
| Meme Generation | Meme creation |

### DevOps Plugins
| Plugin | Description |
|---|---|
| Docker Management | Container lifecycle management |
| Kanban Orchestrator | Task board automation |
| Kanban Worker | Automated task execution |
| CLI Tools | Command-line utility integration |
| Watchers | File system watchers |
| Pinggy Tunnel | Secure tunnel creation |

### Research Plugins
| Plugin | Description |
|---|---|
| ArXiv | Academic paper search and retrieval |
| Drug Discovery | Pharmaceutical research tools |
| OSINT | Open-source intelligence gathering |
| Bioinformatics | Genomic and proteomic analysis |
| DuckDuckGo Search | Privacy-focused web search |
| SearXNG Search | Self-hosted metasearch engine |

---

## Memory Providers

AVDE supports multiple memory backends that can be configured per agent or globally. Each provider implements the same interface, making them interchangeable.

### How Memory Works
1. **Storage** — Conversations and facts are stored in the configured memory backend
2. **Retrieval** — Relevant memories are injected into the agent's context window
3. **Importance Scoring** — Memories are scored by relevance and importance
4. **Eviction** — Old or low-importance memories are pruned based on retention policy

### Configuration
```yaml
# ~/.config/zed/config.yaml
memory:
  provider: chroma
  chroma:
    path: /path/to/chroma/db
    collection: avde-memories
```

---

## Kanban Orchestrator

The kanban orchestrator provides visual task management with automated worker execution:

### Features
- **Board View** — Visual kanban board with configurable columns (To Do, In Progress, Review, Done)
- **Worker Lanes** — Each task can spawn worker agents that execute subtasks
- **Retry Logic** — Failed tasks are automatically retried with exponential backoff
- **Crash Recovery** — Tasks survive agent restarts through persistent state
- **Pipeline Automation** — Tasks can be configured to trigger downstream tasks on completion
- **Diagnostics** — Built-in board diagnostics for debugging stuck tasks

### Access
```bash
zed kanban       # Launch the kanban board in the terminal
zed kanban swarm # Decompose tasks using swarm orchestration
```

---

## Web Dashboard

The Vite-based web dashboard provides a full graphical interface:

### Pages
- **Chat** — Full conversation interface with streaming responses, chain-of-thought visibility, and message history
- **Models** — Browse available models, switch providers, configure model parameters
- **Agents** — Create, edit, and manage agent profiles with custom system prompts
- **Plugins** — Browse and enable/disable plugins from the marketplace
- **Voice** — Speech-to-text input and text-to-speech output configuration
- **Schedules** — Cron-based task scheduling interface
- **Search** — Search across conversations and agent outputs

### Technical Details
- Built with vanilla JavaScript (no framework)
- Vite dev server with proxy to backend
- WebSocket for real-time streaming
- SQLite-backed local state
- Responsive design for desktop and mobile

---

## CLI & TUI

The `zed` CLI provides terminal-based access to all platform features:

### Commands

| Command | Description |
|---|---|
| `zed` | Start interactive session |
| `zed session` | List active sessions |
| `zed chat` | Start a new chat session |
| `zed model` | List and switch models |
| `zed config` | View and edit configuration |
| `zed plugins` | Manage plugins |
| `zed skills` | Manage skills |
| `zed memory` | View and manage memory |
| `zed kanban` | Launch kanban board |
| `zed cron` | Manage scheduled tasks |
| `zed doctor` | Run system diagnostics |
| `zed backup` | Create backups |
| `zed auth` | Authentication commands |
| `zed logs` | View system logs |
| `zed gateway` | Configure gateway settings |
| `zed setup` | Run initial setup wizard |

### TUI Features
- Curses-based terminal UI
- Session listing and management
- Real-time conversation view
- Keyboard shortcuts for navigation
- Color-coded output themes

---

## Quick Start

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- Git (for cloning)

### Step 1: Clone the Repository
```bash
git clone https://github.com/karthikxa/AIOS.git
cd AIOS
```

### Step 2: Start the LLM Proxy (FreeLLMAPI — free 1.7B tokens/month)
```bash
cd llm/llm-proxy
node setup.mjs        # generates .env with encryption key (first-time only)
npm run dev -w server # starts on http://localhost:3001
```

> **No API keys needed!** FreeLLMAPI routes to free providers (pollinations, kilo, llm7, ovh).  
> The ~1.7B token/month budget is shared across all teammates automatically.

### Step 3: Start the Backend
Open a new terminal:
```bash
cd backend
pip install -e ".[dev]"
python server.py      # starts on http://localhost:8642
```

### Step 4: Start the Frontend Dashboard
Open a new terminal:
```bash
cd frontend
npm install
npm run dev           # starts on http://localhost:8000
```

### Step 5: Access the Dashboard
Open your browser to **http://localhost:8000** and start interacting with agents.

### Step 6: Full Stack Launch (Windows)
Or run everything at once:
```powershell
.\scripts\start-all.ps1
```

> **Architecture**: Browser (8000) → Vite proxy → Backend (8642) → FreeLLMAPI (3001) → Free LLM providers

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | 8080 | HTTP server port |
| `ZED_MODEL` | gpt-4o | Default model for chat |
| `ZED_MAX_CONCURRENT` | 250 | Maximum concurrent sub-agents |
| `LOG_LEVEL` | INFO | Logging verbosity (DEBUG, INFO, WARNING, ERROR) |
| `MEMORY_PROVIDER` | chroma | Default memory backend |
| `ZED_HOME` | ~/.config/zed | Configuration directory |
| `AGENT_PROFILE` | default | Agent personality profile |

### Configuration File
The backend reads from `~/.config/zed/config.yaml`:

```yaml
model:
  default: gpt-4o
  providers:
    - name: openai
      api_key: ${OPENAI_API_KEY}
    - name: anthropic
      api_key: ${ANTHROPIC_API_KEY}

memory:
  provider: chroma
  chroma:
    path: ~/.local/share/avde/memory

server:
  port: 8080
  host: 0.0.0.0

agent:
  max_concurrent_children: 250
  default_max_loops: 5
```

### Swarm Configuration
Spawn delays and worker limits are configurable:

```python
# In swarm_router_task() or via API:
{
  "spawn_delay_ms": 150,    # Custom stagger delay
  "max_workers": 100,        # Override worker cap
  "min_workers": 5           # Override worker floor
}
```

---

## API Reference

### Chat Completion
```http
POST /v1/chat/completions
Content-Type: application/json

{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Explain quantum computing."}
  ],
  "toolsets": ["core", "swarm"],
  "temperature": 0.7,
  "max_tokens": 2000
}
```

### Swarm Execution
```http
POST /v1/swarm
Content-Type: application/json

{
  "task": "Analyze this 100-page financial report",
  "swarm_type": "auto",
  "worker_count": "auto",
  "context": "Additional context for the swarm",
  "spawn_delay_ms": 100
}
```

### Model Catalog
```http
GET /v1/models
```

Returns a list of all available models and their capabilities.

### Agent Management
```http
GET    /v1/agents          # List all agents
POST   /v1/agents          # Create a new agent
GET    /v1/agents/:id      # Get agent details
PUT    /v1/agents/:id      # Update agent configuration
DELETE /v1/agents/:id      # Delete an agent
```

### Plugin Management
```http
GET    /v1/plugins          # List all plugins
POST   /v1/plugins/:id/enable   # Enable a plugin
POST   /v1/plugins/:id/disable  # Disable a plugin
```

### Session Management
```http
GET    /v1/sessions         # List active sessions
POST   /v1/sessions         # Create a new session
GET    /v1/sessions/:id     # Get session details
DELETE /v1/sessions/:id     # Delete a session
```

### Memory
```http
GET    /v1/memory           # Query memory
POST   /v1/memory           # Store to memory
DELETE /v1/memory/:id       # Delete a memory entry
```

### Kanban
```http
GET    /v1/kanban           # Get kanban board state
POST   /v1/kanban/tasks     # Create a task
PUT    /v1/kanban/tasks/:id  # Update task status
DELETE /v1/kanban/tasks/:id  # Delete a task
```

---

## Docker Deployment

### Build Images
```bash
# Backend
docker build -t avde-backend -f backend/Dockerfile .

# Frontend
docker build -t avde-frontend -f frontend/Dockerfile .
```

### Docker Compose
```yaml
# docker-compose.yml
version: "3.8"
services:
  backend:
    image: avde-backend
    ports:
      - "8080:8080"
    volumes:
      - ./memory:/app/memory
    env_file:
      - .env

  frontend:
    image: avde-frontend
    ports:
      - "8000:8000"
    environment:
      - BACKEND_URL=http://backend:8080
```

### Run
```bash
docker compose up -d
```

### Production Deployment
Production configuration is available in the `deploy/` directory:
```bash
cd deploy
npm install
node server.mjs
```

The production server includes:
- Express-based HTTP server
- OAuth plugin middleware
- Static file serving for the dashboard
- WebSocket proxy for real-time communication

---

## Development

### Setting Up the Development Environment

#### Backend
```bash
cd backend
pip install -e ".[dev]"
pre-commit install    # Install git hooks
ruff check .          # Run linter
pytest tests/         # Run tests
```

#### Frontend
```bash
cd frontend
npm install
npm run test          # Run vitest
npm run lint          # Run ESLint
```

#### Documentation Website
```bash
cd backend/website
npm install
npm run start         # Docusaurus dev server on :3000
```

### Code Quality Standards
- Python code is linted with `ruff`
- JavaScript code is linted with `ESLint`
- All swarm patterns pass `py_compile` verification
- Tests use `pytest` for backend and `vitest` for frontend
- Type hints are used throughout the Python codebase

### Contributing Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

## Security

### Data Protection
- No API keys stored in plaintext — credentials are encrypted at rest
- Environment variables and `.env` files are excluded from version control
- Dashboard authentication uses cryptographically signed cookie sessions
- All sensitive operations require explicit approval

### Audit & Monitoring
- Security advisory system for vulnerability scanning
- Audit logging for sensitive operations
- Threat scanning for malicious input patterns
- Rate limiting on API endpoints

### Best Practices
- Run behind a reverse proxy for production (Nginx, Caddy)
- Use environment variables for all secrets
- Enable HTTPS in production
- Regularly update dependencies
- Review plugin permissions before enabling

---

## Author

**Karthik**

- GitHub: [github.com/karthikxa](https://github.com/karthikxa)
- Project: [AIOS — AI Operating System](https://github.com/karthikxa/AIOS)

Built for the open-source AI community.

---

> **AVDE** — *Your AI, Your Infrastructure, Your Control.*
