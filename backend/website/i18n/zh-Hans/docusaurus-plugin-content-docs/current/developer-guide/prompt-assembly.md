---
sidebar_position: 5
title: "Prompt ç»„è£…"
description: "Zed å¦‚ä½•æž„å»ºç³»ç»Ÿ promptã€ä¿æŒç¼“å­˜ç¨³å®šæ€§å¹¶æ³¨å…¥ä¸´æ—¶å±‚"
---

# Prompt ç»„è£…

Zed åˆ»æ„å°†ä»¥ä¸‹å†…å®¹åˆ†ç¦»ï¼š

- **å·²ç¼“å­˜çš„ç³»ç»Ÿ prompt çŠ¶æ€**
- **API è°ƒç”¨æ—¶ä¸´æ—¶æ·»åŠ çš„å†…å®¹**

è¿™æ˜¯é¡¹ç›®ä¸­æœ€é‡è¦çš„è®¾è®¡å†³ç­–ä¹‹ä¸€ï¼Œå› ä¸ºå®ƒå½±å“ï¼š

- token ç”¨é‡
- prompt ç¼“å­˜æ•ˆæžœ
- ä¼šè¯è¿žç»­æ€§
- è®°å¿†æ­£ç¡®æ€§

ä¸»è¦æ–‡ä»¶ï¼š

- `run_agent.py`
- `agent/prompt_builder.py`
- `tools/memory_tool.py`

## å·²ç¼“å­˜çš„ç³»ç»Ÿ prompt å±‚

å·²ç¼“å­˜çš„ç³»ç»Ÿ prompt å¤§è‡´æŒ‰ä»¥ä¸‹é¡ºåºç»„è£…ï¼š

1. agent èº«ä»½ â€” ä¼˜å…ˆä½¿ç”¨ `ZED_HOME` ä¸­çš„ `SOUL.md`ï¼Œå¦åˆ™å›žé€€åˆ° `prompt_builder.py` ä¸­çš„ `DEFAULT_AGENT_IDENTITY`
2. å·¥å…·æ„ŸçŸ¥è¡Œä¸ºæŒ‡å¯¼
3. Honcho é™æ€å—ï¼ˆæ¿€æ´»æ—¶ï¼‰
4. å¯é€‰ç³»ç»Ÿæ¶ˆæ¯
5. å†»ç»“çš„ MEMORY å¿«ç…§
6. å†»ç»“çš„ USER é…ç½®æ–‡ä»¶å¿«ç…§
7. skills ç´¢å¼•
8. ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼ˆ`AGENTS.md`ã€`.cursorrules`ã€`.cursor/rules/*.mdc`ï¼‰â€” è‹¥ SOUL.md å·²åœ¨ç¬¬ 1 æ­¥ä½œä¸ºèº«ä»½åŠ è½½ï¼Œåˆ™æ­¤å¤„**ä¸**å†åŒ…å«å®ƒ
9. æ—¶é—´æˆ³ / å¯é€‰ä¼šè¯ ID
10. å¹³å°æç¤º

å½“è®¾ç½®äº† `skip_context_files`ï¼ˆä¾‹å¦‚å­ agent å§”æ‰˜ï¼‰æ—¶ï¼Œä¸ä¼šåŠ è½½ SOUL.mdï¼Œè€Œæ˜¯ä½¿ç”¨ç¡¬ç¼–ç çš„ `DEFAULT_AGENT_IDENTITY`ã€‚

### å…·ä½“ç¤ºä¾‹ï¼šç»„è£…åŽçš„ç³»ç»Ÿ prompt

ä»¥ä¸‹æ˜¯æ‰€æœ‰å±‚éƒ½å­˜åœ¨æ—¶æœ€ç»ˆç³»ç»Ÿ prompt çš„ç®€åŒ–è§†å›¾ï¼ˆæ³¨é‡Šè¯´æ˜Žæ¯ä¸ªéƒ¨åˆ†çš„æ¥æºï¼‰ï¼š

```
# Layer 1: Agent Identity (from ~/.zed/SOUL.md)
You are Zed, an AI assistant created by Zed Team.
You are an expert software engineer and researcher.
You value correctness, clarity, and efficiency.
...

# Layer 2: Tool-aware behavior guidance
You have persistent memory across sessions. Save durable facts using
the memory tool: user preferences, environment details, tool quirks,
and stable conventions. Memory is injected into every turn, so keep
it compact and focused on facts that will still matter later.
...
When the user references something from a past conversation or you
suspect relevant cross-session context exists, use session_search
to recall it before asking them to repeat themselves.

# Tool-use enforcement (for GPT/Codex models only)
You MUST use your tools to take action â€” do not describe what you
would do or plan to do without actually doing it.
...

# Layer 3: Honcho static block (when active)
[Honcho personality/context data]

# Layer 4: Optional system message (from config or API)
[User-configured system message override]

# Layer 5: Frozen MEMORY snapshot
## Persistent Memory
- User prefers Python 3.12, uses pyproject.toml
- Default editor is nvim
- Working on project "atlas" in ~/code/atlas
- Timezone: US/Pacific

# Layer 6: Frozen USER profile snapshot
## User Profile
- Name: Alice
- GitHub: alice-dev

# Layer 7: Skills index
## Skills (mandatory)
Before replying, scan the skills below. If one clearly matches
your task, load it with skill_view(name) and follow its instructions.
...
<available_skills>
  software-development:
    - code-review: Structured code review workflow
    - test-driven-development: TDD methodology
  research:
    - arxiv: Search and summarize arXiv papers
</available_skills>

# Layer 8: Context files (from project directory)
# Project Context
The following project context files have been loaded and should be followed:

## AGENTS.md
This is the atlas project. Use pytest for testing. The main
entry point is src/atlas/main.py. Always run `make lint` before
committing.

# Layer 9: Timestamp + session
Current time: 2026-03-30T14:30:00-07:00
Session: abc123

# Layer 10: Platform hint
You are a CLI AI Agent. Try not to use markdown but simple text
renderable inside a terminal.
```

## SOUL.md åœ¨ prompt ä¸­çš„ä½ç½®

`SOUL.md` ä½äºŽ `~/.zed/SOUL.md`ï¼Œä½œä¸º agent çš„èº«ä»½æ ‡è¯†â€”â€”ç³»ç»Ÿ prompt çš„ç¬¬ä¸€ä¸ªéƒ¨åˆ†ã€‚`prompt_builder.py` ä¸­çš„åŠ è½½é€»è¾‘å¦‚ä¸‹ï¼š

```python
# From agent/prompt_builder.py (simplified)
def load_soul_md() -> Optional[str]:
    soul_path = get_zed_home() / "SOUL.md"
    if not soul_path.exists():
        return None
    content = soul_path.read_text(encoding="utf-8").strip()
    content = _scan_context_content(content, "SOUL.md")  # Security scan
    content = _truncate_content(content, "SOUL.md")       # Cap defaults to 20k chars, configurable
    return content
```

å½“ `load_soul_md()` è¿”å›žå†…å®¹æ—¶ï¼Œå®ƒä¼šæ›¿æ¢ç¡¬ç¼–ç çš„ `DEFAULT_AGENT_IDENTITY`ã€‚éšåŽè°ƒç”¨ `build_context_files_prompt()` æ—¶ä¼ å…¥ `skip_soul=True`ï¼Œä»¥é˜²æ­¢ SOUL.md å‡ºçŽ°ä¸¤æ¬¡ï¼ˆä¸€æ¬¡ä½œä¸ºèº«ä»½ï¼Œä¸€æ¬¡ä½œä¸ºä¸Šä¸‹æ–‡æ–‡ä»¶ï¼‰ã€‚

è‹¥ `SOUL.md` ä¸å­˜åœ¨ï¼Œç³»ç»Ÿå°†å›žé€€åˆ°ï¼š

```
You are Zed Agent, an intelligent AI assistant created by Zed Team.
You are helpful, knowledgeable, and direct. You assist users with a wide
range of tasks including answering questions, writing and editing code,
analyzing information, creative work, and executing actions via your tools.
You communicate clearly, admit uncertainty when appropriate, and prioritize
being genuinely useful over being verbose unless otherwise directed below.
Be targeted and efficient in your exploration and investigations.
```

## ä¸Šä¸‹æ–‡æ–‡ä»¶çš„æ³¨å…¥æ–¹å¼

`build_context_files_prompt()` ä½¿ç”¨**ä¼˜å…ˆçº§ç³»ç»Ÿ**â€”â€”åªåŠ è½½ä¸€ç§é¡¹ç›®ä¸Šä¸‹æ–‡ç±»åž‹ï¼ˆå…ˆåŒ¹é…å…ˆèµ¢ï¼‰ï¼š

```python
# From agent/prompt_builder.py (simplified)
def build_context_files_prompt(cwd=None, skip_soul=False):
    cwd_path = Path(cwd).resolve()

    # Priority: first match wins â€” only ONE project context loaded
    project_context = (
        _load_zed_md(cwd_path)       # 1. .zed.md / ZED.md (walks to git root)
        or _load_agents_md(cwd_path)    # 2. AGENTS.md (cwd only)
        or _load_claude_md(cwd_path)    # 3. CLAUDE.md (cwd only)
        or _load_cursorrules(cwd_path)  # 4. .cursorrules / .cursor/rules/*.mdc
    )

    sections = []
    if project_context:
        sections.append(project_context)

    # SOUL.md from ZED_HOME (independent of project context)
    if not skip_soul:
        soul_content = load_soul_md()
        if soul_content:
            sections.append(soul_content)

    if not sections:
        return ""

    return (
        "# Project Context\n\n"
        "The following project context files have been loaded "
        "and should be followed:\n\n"
        + "\n".join(sections)
    )
```

### ä¸Šä¸‹æ–‡æ–‡ä»¶å‘çŽ°è¯¦æƒ…

| ä¼˜å…ˆçº§ | æ–‡ä»¶ | æœç´¢èŒƒå›´ | è¯´æ˜Ž |
|--------|------|----------|------|
| 1 | `.zed.md`ã€`ZED.md` | ä»Ž CWD å‘ä¸Šè‡³ git æ ¹ç›®å½• | Zed åŽŸç”Ÿé¡¹ç›®é…ç½® |
| 2 | `AGENTS.md` | ä»… CWD | å¸¸è§ agent æŒ‡ä»¤æ–‡ä»¶ |
| 3 | `CLAUDE.md` | ä»… CWD | Claude Code å…¼å®¹æ€§ |
| 4 | `.cursorrules`ã€`.cursor/rules/*.mdc` | ä»… CWD | Cursor å…¼å®¹æ€§ |

æ‰€æœ‰ä¸Šä¸‹æ–‡æ–‡ä»¶å‡ä¼šï¼š
- **å®‰å…¨æ‰«æ** â€” æ£€æŸ¥ prompt æ³¨å…¥æ¨¡å¼ï¼ˆä¸å¯è§ unicodeã€"ignore previous instructions"ã€å‡­æ®çªƒå–å°è¯•ï¼‰
- **æˆªæ–­å¤„ç†** â€” ä½¿ç”¨ 70/20 å¤´å°¾æ¯”ä¾‹ä¸Šé™ä¸º 20,000 å­—ç¬¦ï¼Œå¹¶é™„æˆªæ–­æ ‡è®°
- **å‰¥ç¦» YAML frontmatter** â€” `.zed.md` çš„ frontmatter ä¼šè¢«ç§»é™¤ï¼ˆä¿ç•™ä¾›æœªæ¥é…ç½®è¦†ç›–ä½¿ç”¨ï¼‰

## ä»…åœ¨ API è°ƒç”¨æ—¶ç”Ÿæ•ˆçš„å±‚

ä»¥ä¸‹å†…å®¹åˆ»æ„*ä¸*ä½œä¸ºå·²ç¼“å­˜ç³»ç»Ÿ prompt çš„ä¸€éƒ¨åˆ†æŒä¹…åŒ–ï¼š

- `ephemeral_system_prompt`
- prefill æ¶ˆæ¯
- gateway æ´¾ç”Ÿçš„ä¼šè¯ä¸Šä¸‹æ–‡è¦†ç›–å±‚
- æ³¨å…¥å½“å‰è½®æ¬¡ç”¨æˆ·æ¶ˆæ¯çš„åŽç»­è½®æ¬¡ Honcho å¬å›žå†…å®¹

è¿™ç§åˆ†ç¦»ä½¿ç¨³å®šå‰ç¼€ä¿æŒç¨³å®šï¼Œä»Žè€Œæœ‰æ•ˆç¼“å­˜ã€‚

## è®°å¿†å¿«ç…§

æœ¬åœ°è®°å¿†å’Œç”¨æˆ·é…ç½®æ–‡ä»¶æ•°æ®åœ¨ä¼šè¯å¼€å§‹æ—¶ä½œä¸ºå†»ç»“å¿«ç…§æ³¨å…¥ã€‚ä¼šè¯ä¸­é€”çš„å†™å…¥æ“ä½œä¼šæ›´æ–°ç£ç›˜çŠ¶æ€ï¼Œä½†ä¸ä¼šä¿®æ”¹å·²æž„å»ºçš„ç³»ç»Ÿ promptï¼Œç›´åˆ°æ–°ä¼šè¯å¼€å§‹æˆ–å¼ºåˆ¶é‡å»ºæ—¶æ‰ç”Ÿæ•ˆã€‚

## ä¸Šä¸‹æ–‡æ–‡ä»¶

`agent/prompt_builder.py` ä½¿ç”¨**ä¼˜å…ˆçº§ç³»ç»Ÿ**æ‰«æå¹¶æ¸…ç†é¡¹ç›®ä¸Šä¸‹æ–‡æ–‡ä»¶â€”â€”åªåŠ è½½ä¸€ç§ç±»åž‹ï¼ˆå…ˆåŒ¹é…å…ˆèµ¢ï¼‰ï¼š

1. `.zed.md` / `ZED.md`ï¼ˆå‘ä¸ŠéåŽ†è‡³ git æ ¹ç›®å½•ï¼‰
2. `AGENTS.md`ï¼ˆå¯åŠ¨æ—¶çš„ CWDï¼›å­ç›®å½•åœ¨ä¼šè¯æœŸé—´é€šè¿‡ `agent/subdirectory_hints.py` é€æ­¥å‘çŽ°ï¼‰
3. `CLAUDE.md`ï¼ˆä»… CWDï¼‰
4. `.cursorrules` / `.cursor/rules/*.mdc`ï¼ˆä»… CWDï¼‰

`SOUL.md` é€šè¿‡ `load_soul_md()` å•ç‹¬åŠ è½½ç”¨äºŽèº«ä»½æ§½ä½ã€‚åŠ è½½æˆåŠŸåŽï¼Œ`build_context_files_prompt(skip_soul=True)` ä¼šé˜²æ­¢å…¶å‡ºçŽ°ä¸¤æ¬¡ã€‚

é•¿æ–‡ä»¶åœ¨æ³¨å…¥å‰ä¼šè¢«æˆªæ–­ã€‚

## Skills ç´¢å¼•

å½“ skills å·¥å…·å¯ç”¨æ—¶ï¼Œskills ç³»ç»Ÿä¼šå‘ prompt è´¡çŒ®ä¸€ä¸ªç´§å‡‘çš„ skills ç´¢å¼•ã€‚

## æ”¯æŒçš„ prompt è‡ªå®šä¹‰å…¥å£

å¤§å¤šæ•°ç”¨æˆ·åº”å°† `agent/prompt_builder.py` è§†ä¸ºå®žçŽ°ä»£ç ï¼Œè€Œéžé…ç½®å…¥å£ã€‚æŽ¨èçš„è‡ªå®šä¹‰è·¯å¾„æ˜¯ä¿®æ”¹ Zed å·²åŠ è½½çš„ prompt è¾“å…¥ï¼Œè€Œéžç›´æŽ¥ç¼–è¾‘ Python æ¨¡æ¿ã€‚

### ä¼˜å…ˆä½¿ç”¨è¿™äº›å…¥å£

- `~/.zed/SOUL.md` â€” ç”¨è‡ªå®šä¹‰ agent è§’è‰²å’Œå›ºå®šè¡Œä¸ºæ›¿æ¢å†…ç½®é»˜è®¤èº«ä»½å—ã€‚
- `~/.zed/MEMORY.md` å’Œ `~/.zed/USER.md` â€” æä¾›åº”åœ¨æ–°ä¼šè¯ä¸­å¿«ç…§çš„æŒä¹…è·¨ä¼šè¯äº‹å®žå’Œç”¨æˆ·é…ç½®æ–‡ä»¶æ•°æ®ã€‚
- é¡¹ç›®ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼Œå¦‚ `.zed.md`ã€`ZED.md`ã€`AGENTS.md`ã€`CLAUDE.md` æˆ– `.cursorrules` â€” æ³¨å…¥ä»“åº“ç‰¹å®šçš„å·¥ä½œè§„åˆ™ã€‚
- Skills â€” æ‰“åŒ…å¯å¤ç”¨çš„å·¥ä½œæµå’Œå‚è€ƒèµ„æ–™ï¼Œæ— éœ€ç¼–è¾‘æ ¸å¿ƒ prompt ä»£ç ã€‚
- å¯é€‰ç³»ç»Ÿ prompt é…ç½® / API è¦†ç›– â€” æ·»åŠ éƒ¨ç½²ç‰¹å®šçš„æŒ‡ä»¤æ–‡æœ¬ï¼Œæ— éœ€ fork Zedã€‚
- ä¸´æ—¶è¦†ç›–å±‚ï¼Œå¦‚ `ZED_EPHEMERAL_SYSTEM_PROMPT` æˆ– prefill æ¶ˆæ¯ â€” æ·»åŠ ä¸åº”æˆä¸ºå·²ç¼“å­˜ prompt å‰ç¼€ä¸€éƒ¨åˆ†çš„è½®æ¬¡çº§æŒ‡å¯¼ã€‚

### ä½•æ—¶åº”ç¼–è¾‘ä»£ç 

ä»…å½“ä½ åˆ»æ„ç»´æŠ¤ä¸€ä¸ª fork æˆ–å‘ä¸Šæ¸¸è´¡çŒ®è¡Œä¸ºå˜æ›´æ—¶ï¼Œæ‰ç¼–è¾‘ `agent/prompt_builder.py`ã€‚è¯¥æ–‡ä»¶ä¸ºæ¯ä¸ªä¼šè¯ç»„è£… prompt ç®¡é“ã€ç¼“å­˜è¾¹ç•Œå’Œæ³¨å…¥é¡ºåºã€‚ç›´æŽ¥ç¼–è¾‘è¯¥æ–‡ä»¶æ˜¯å…¨å±€äº§å“å˜æ›´ï¼Œè€Œéžé’ˆå¯¹å•ä¸ªç”¨æˆ·çš„ prompt è‡ªå®šä¹‰ã€‚

æ¢è¨€ä¹‹ï¼š

- è‹¥æƒ³è¦ä¸åŒçš„åŠ©æ‰‹èº«ä»½ï¼Œç¼–è¾‘ `SOUL.md`
- è‹¥æƒ³è¦ä¸åŒçš„ä»“åº“è§„åˆ™ï¼Œç¼–è¾‘é¡¹ç›®ä¸Šä¸‹æ–‡æ–‡ä»¶
- è‹¥æƒ³è¦å¯å¤ç”¨çš„æ“ä½œæµç¨‹ï¼Œæ·»åŠ æˆ–ä¿®æ”¹ skills
- è‹¥æƒ³æ”¹å˜ Zed ä¸ºæ‰€æœ‰äººç»„è£… prompt çš„æ–¹å¼ï¼Œä¿®æ”¹ Python ä»£ç å¹¶å°†å…¶è§†ä¸ºä»£ç è´¡çŒ®

## Prompt ç»„è£…ä¸ºä½•å¦‚æ­¤æ‹†åˆ†

è¯¥æž¶æž„åˆ»æ„ä¼˜åŒ–ä»¥ï¼š

- ä¿ç•™æä¾›å•†ä¾§çš„ prompt ç¼“å­˜
- é¿å…ä¸å¿…è¦åœ°ä¿®æ”¹åŽ†å²è®°å½•
- ä¿æŒè®°å¿†è¯­ä¹‰æ¸…æ™°å¯ç†è§£
- å…è®¸ gateway/ACP/CLI æ·»åŠ ä¸Šä¸‹æ–‡è€Œä¸æ±¡æŸ“æŒä¹… prompt çŠ¶æ€

## ç›¸å…³æ–‡æ¡£

- [ä¸Šä¸‹æ–‡åŽ‹ç¼©ä¸Ž Prompt ç¼“å­˜](./context-compression-and-caching.md)
- [ä¼šè¯å­˜å‚¨](./session-storage.md)
- [Gateway å†…éƒ¨æœºåˆ¶](./gateway-internals.md)