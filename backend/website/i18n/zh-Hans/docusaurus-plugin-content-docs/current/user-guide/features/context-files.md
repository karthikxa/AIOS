---
sidebar_position: 8
title: "ä¸Šä¸‹æ–‡æ–‡ä»¶"
description: "é¡¹ç›®ä¸Šä¸‹æ–‡æ–‡ä»¶ â€” .zed.mdã€AGENTS.mdã€CLAUDE.mdã€å…¨å±€ SOUL.md ä»¥åŠ .cursorrules â€” è‡ªåŠ¨æ³¨å…¥æ¯æ¬¡å¯¹è¯"
---

# ä¸Šä¸‹æ–‡æ–‡ä»¶

Zed Agent ä¼šè‡ªåŠ¨å‘çŽ°å¹¶åŠ è½½ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼Œä»¥å¡‘é€ å…¶è¡Œä¸ºæ–¹å¼ã€‚éƒ¨åˆ†æ–‡ä»¶å±žäºŽé¡¹ç›®æœ¬åœ°æ–‡ä»¶ï¼Œä»Žå·¥ä½œç›®å½•ä¸­å‘çŽ°ã€‚`SOUL.md` çŽ°åœ¨å¯¹æ•´ä¸ª Zed å®žä¾‹å…¨å±€ç”Ÿæ•ˆï¼Œä»…ä»Ž `ZED_HOME` åŠ è½½ã€‚

## æ”¯æŒçš„ä¸Šä¸‹æ–‡æ–‡ä»¶

| æ–‡ä»¶ | ç”¨é€” | å‘çŽ°æ–¹å¼ |
|------|---------|-----------| 
| **.zed.md** / **ZED.md** | é¡¹ç›®æŒ‡ä»¤ï¼ˆæœ€é«˜ä¼˜å…ˆçº§ï¼‰ | å‘ä¸ŠéåŽ†è‡³ git æ ¹ç›®å½• |
| **AGENTS.md** | é¡¹ç›®æŒ‡ä»¤ã€è§„èŒƒã€æž¶æž„è¯´æ˜Ž | å¯åŠ¨æ—¶çš„ CWD åŠå­ç›®å½•ï¼ˆæ¸è¿›å¼ï¼‰ |
| **CLAUDE.md** | Claude Code ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼ˆåŒæ ·æ”¯æŒæ£€æµ‹ï¼‰ | å¯åŠ¨æ—¶çš„ CWD åŠå­ç›®å½•ï¼ˆæ¸è¿›å¼ï¼‰ |
| **SOUL.md** | å½“å‰ Zed å®žä¾‹çš„å…¨å±€ä¸ªæ€§ä¸Žè¯­æ°”å®šåˆ¶ | ä»… `ZED_HOME/SOUL.md` |
| **.cursorrules** | Cursor IDE ç¼–ç è§„èŒƒ | ä»… CWD |
| **.cursor/rules/*.mdc** | Cursor IDE è§„åˆ™æ¨¡å— | ä»… CWD |

:::info ä¼˜å…ˆçº§ç³»ç»Ÿ
æ¯æ¬¡ä¼šè¯ä»…åŠ è½½**ä¸€ç§**é¡¹ç›®ä¸Šä¸‹æ–‡ç±»åž‹ï¼ˆå…ˆåŒ¹é…å…ˆç”Ÿæ•ˆï¼‰ï¼š`.zed.md` â†’ `AGENTS.md` â†’ `CLAUDE.md` â†’ `.cursorrules`ã€‚**SOUL.md** å§‹ç»ˆä½œä¸º agent èº«ä»½ç‹¬ç«‹åŠ è½½ï¼ˆæ’æ§½ #1ï¼‰ã€‚
:::

## AGENTS.md

`AGENTS.md` æ˜¯ä¸»è¦çš„é¡¹ç›®ä¸Šä¸‹æ–‡æ–‡ä»¶ã€‚å®ƒå‘ŠçŸ¥ agent é¡¹ç›®çš„ç»“æž„ã€éœ€è¦éµå¾ªçš„è§„èŒƒä»¥åŠä»»ä½•ç‰¹æ®ŠæŒ‡ä»¤ã€‚

### æ¸è¿›å¼å­ç›®å½•å‘çŽ°

ä¼šè¯å¯åŠ¨æ—¶ï¼ŒZed å°†å·¥ä½œç›®å½•ä¸­çš„ `AGENTS.md` åŠ è½½åˆ°ç³»ç»Ÿ promptï¼ˆæç¤ºè¯ï¼‰ä¸­ã€‚åœ¨ä¼šè¯æœŸé—´ï¼Œå½“ agent é€šè¿‡ `read_file`ã€`terminal`ã€`search_files` ç­‰å·¥å…·å¯¼èˆªè¿›å…¥å­ç›®å½•æ—¶ï¼Œå®ƒä¼š**æ¸è¿›å¼å‘çŽ°**è¿™äº›ç›®å½•ä¸­çš„ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼Œå¹¶åœ¨å…¶å˜å¾—ç›¸å…³çš„æ—¶åˆ»å°†å…¶æ³¨å…¥å¯¹è¯ã€‚

```
my-project/
â”œâ”€â”€ AGENTS.md              â† å¯åŠ¨æ—¶åŠ è½½ï¼ˆç³»ç»Ÿ promptï¼‰
â”œâ”€â”€ frontend/
â”‚   â””â”€â”€ AGENTS.md          â† agent è¯»å– frontend/ æ–‡ä»¶æ—¶å‘çŽ°
â”œâ”€â”€ backend/
â”‚   â””â”€â”€ AGENTS.md          â† agent è¯»å– backend/ æ–‡ä»¶æ—¶å‘çŽ°
â””â”€â”€ shared/
    â””â”€â”€ AGENTS.md          â† agent è¯»å– shared/ æ–‡ä»¶æ—¶å‘çŽ°
```

ä¸Žå¯åŠ¨æ—¶åŠ è½½æ‰€æœ‰å†…å®¹ç›¸æ¯”ï¼Œæ­¤æ–¹å¼æœ‰ä¸¤ä¸ªä¼˜åŠ¿ï¼š
- **é¿å…ç³»ç»Ÿ prompt è†¨èƒ€** â€” å­ç›®å½•æç¤ºä»…åœ¨éœ€è¦æ—¶å‡ºçŽ°
- **ä¿ç•™ prompt ç¼“å­˜** â€” ç³»ç»Ÿ prompt åœ¨å„è½®æ¬¡é—´ä¿æŒç¨³å®š

æ¯ä¸ªå­ç›®å½•åœ¨æ¯æ¬¡ä¼šè¯ä¸­æœ€å¤šæ£€æŸ¥ä¸€æ¬¡ã€‚å‘çŽ°æœºåˆ¶åŒæ ·ä¼šå‘ä¸ŠéåŽ†çˆ¶ç›®å½•ï¼Œå› æ­¤è¯»å– `backend/src/main.py` æ—¶ï¼Œå³ä½¿ `backend/src/` æ²¡æœ‰è‡ªå·±çš„ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼Œä¹Ÿä¼šå‘çŽ° `backend/AGENTS.md`ã€‚

:::info
å­ç›®å½•ä¸Šä¸‹æ–‡æ–‡ä»¶ä¸Žå¯åŠ¨æ—¶çš„ä¸Šä¸‹æ–‡æ–‡ä»¶ç»è¿‡ç›¸åŒçš„[å®‰å…¨æ‰«æ](#security-prompt-injection-protection)ã€‚æ¶æ„æ–‡ä»¶ä¼šè¢«æ‹¦æˆªã€‚
:::

### AGENTS.md ç¤ºä¾‹

```markdown
# Project Context

This is a Next.js 14 web application with a Python FastAPI backend.

## Architecture
- Frontend: Next.js 14 with App Router in `/frontend`
- Backend: FastAPI in `/backend`, uses SQLAlchemy ORM
- Database: PostgreSQL 16
- Deployment: Docker Compose on a Hetzner VPS

## Conventions
- Use TypeScript strict mode for all frontend code
- Python code follows PEP 8, use type hints everywhere
- All API endpoints return JSON with `{data, error, meta}` shape
- Tests go in `__tests__/` directories (frontend) or `tests/` (backend)

## Important Notes
- Never modify migration files directly â€” use Alembic commands
- The `.env.local` file has real API keys, don't commit it
- Frontend port is 3000, backend is 8000, DB is 5432
```

## SOUL.md

`SOUL.md` æŽ§åˆ¶ agent çš„ä¸ªæ€§ã€è¯­æ°”å’Œæ²Ÿé€šé£Žæ ¼ã€‚å®Œæ•´è¯¦æƒ…è¯·å‚é˜…[ä¸ªæ€§](/user-guide/features/personality)é¡µé¢ã€‚

**ä½ç½®ï¼š**

- `~/.zed/SOUL.md`
- æˆ– `$ZED_HOME/SOUL.md`ï¼ˆè‹¥ä½¿ç”¨è‡ªå®šä¹‰ä¸»ç›®å½•è¿è¡Œ Zedï¼‰

é‡è¦è¯´æ˜Žï¼š

- è‹¥ `SOUL.md` å°šä¸å­˜åœ¨ï¼ŒZed ä¼šè‡ªåŠ¨ç”Ÿæˆä¸€ä¸ªé»˜è®¤æ–‡ä»¶
- Zed ä»…ä»Ž `ZED_HOME` åŠ è½½ `SOUL.md`
- Zed ä¸ä¼šåœ¨å·¥ä½œç›®å½•ä¸­æŽ¢æµ‹ `SOUL.md`
- è‹¥æ–‡ä»¶ä¸ºç©ºï¼Œ`SOUL.md` ä¸­çš„å†…å®¹ä¸ä¼šæ·»åŠ åˆ° prompt
- è‹¥æ–‡ä»¶æœ‰å†…å®¹ï¼Œå†…å®¹åœ¨æ‰«æå’Œæˆªæ–­åŽåŽŸæ ·æ³¨å…¥

## .cursorrules

Zed å…¼å®¹ Cursor IDE çš„ `.cursorrules` æ–‡ä»¶å’Œ `.cursor/rules/*.mdc` è§„åˆ™æ¨¡å—ã€‚è‹¥è¿™äº›æ–‡ä»¶å­˜åœ¨äºŽé¡¹ç›®æ ¹ç›®å½•ï¼Œä¸”æœªæ‰¾åˆ°æ›´é«˜ä¼˜å…ˆçº§çš„ä¸Šä¸‹æ–‡æ–‡ä»¶ï¼ˆ`.zed.md`ã€`AGENTS.md` æˆ– `CLAUDE.md`ï¼‰ï¼Œåˆ™å°†å…¶ä½œä¸ºé¡¹ç›®ä¸Šä¸‹æ–‡åŠ è½½ã€‚

è¿™æ„å‘³ç€ä½¿ç”¨ Zed æ—¶ï¼ŒçŽ°æœ‰çš„ Cursor è§„èŒƒä¼šè‡ªåŠ¨ç”Ÿæ•ˆã€‚

## ä¸Šä¸‹æ–‡æ–‡ä»¶çš„åŠ è½½æ–¹å¼

### å¯åŠ¨æ—¶ï¼ˆç³»ç»Ÿ promptï¼‰

ä¸Šä¸‹æ–‡æ–‡ä»¶ç”± `agent/prompt_builder.py` ä¸­çš„ `build_context_files_prompt()` åŠ è½½ï¼š

1. **æ‰«æå·¥ä½œç›®å½•** â€” ä¾æ¬¡æ£€æŸ¥ `.zed.md` â†’ `AGENTS.md` â†’ `CLAUDE.md` â†’ `.cursorrules`ï¼ˆå…ˆåŒ¹é…å…ˆç”Ÿæ•ˆï¼‰
2. **è¯»å–å†…å®¹** â€” ä»¥ UTF-8 æ–‡æœ¬è¯»å–æ¯ä¸ªæ–‡ä»¶
3. **å®‰å…¨æ‰«æ** â€” æ£€æŸ¥å†…å®¹æ˜¯å¦å­˜åœ¨ prompt æ³¨å…¥æ¨¡å¼
4. **æˆªæ–­** â€” è¶…è¿‡ 20,000 ä¸ªå­—ç¬¦çš„æ–‡ä»¶è¿›è¡Œé¦–å°¾æˆªæ–­ï¼ˆ70% å¤´éƒ¨ï¼Œ20% å°¾éƒ¨ï¼Œä¸­é—´æ’å…¥æ ‡è®°ï¼‰
5. **ç»„è£…** â€” æ‰€æœ‰éƒ¨åˆ†åˆå¹¶åœ¨ `# Project Context` æ ‡é¢˜ä¸‹
6. **æ³¨å…¥** â€” ç»„è£…åŽçš„å†…å®¹æ·»åŠ åˆ°ç³»ç»Ÿ prompt

### ä¼šè¯æœŸé—´ï¼ˆæ¸è¿›å¼å‘çŽ°ï¼‰

`agent/subdirectory_hints.py` ä¸­çš„ `SubdirectoryHintTracker` ç›‘è§†å·¥å…·è°ƒç”¨å‚æ•°ä¸­çš„æ–‡ä»¶è·¯å¾„ï¼š

1. **è·¯å¾„æå–** â€” æ¯æ¬¡å·¥å…·è°ƒç”¨åŽï¼Œä»Žå‚æ•°ï¼ˆ`path`ã€`workdir`ã€shell å‘½ä»¤ï¼‰ä¸­æå–æ–‡ä»¶è·¯å¾„
2. **ç¥–å…ˆç›®å½•éåŽ†** â€” æ£€æŸ¥è¯¥ç›®å½•åŠæœ€å¤š 5 ä¸ªçˆ¶ç›®å½•ï¼ˆè·³è¿‡å·²è®¿é—®çš„ç›®å½•ï¼‰
3. **æç¤ºåŠ è½½** â€” è‹¥å‘çŽ° `AGENTS.md`ã€`CLAUDE.md` æˆ– `.cursorrules`ï¼Œåˆ™åŠ è½½ï¼ˆæ¯ä¸ªç›®å½•å…ˆåŒ¹é…å…ˆç”Ÿæ•ˆï¼‰
4. **å®‰å…¨æ‰«æ** â€” ä¸Žå¯åŠ¨æ–‡ä»¶ç›¸åŒçš„ prompt æ³¨å…¥æ‰«æ
5. **æˆªæ–­** â€” æ¯ä¸ªæ–‡ä»¶æœ€å¤š 8,000 ä¸ªå­—ç¬¦
6. **æ³¨å…¥** â€” è¿½åŠ åˆ°å·¥å…·ç»“æžœä¸­ï¼Œä½¿æ¨¡åž‹åœ¨ä¸Šä¸‹æ–‡ä¸­è‡ªç„¶çœ‹åˆ°

æœ€ç»ˆ prompt éƒ¨åˆ†å¤§è‡´å¦‚ä¸‹ï¼š

```text
# Project Context

The following project context files have been loaded and should be followed:

## AGENTS.md

[Your AGENTS.md content here]

## .cursorrules

[Your .cursorrules content here]

[Your SOUL.md content here]
```

æ³¨æ„ï¼ŒSOUL å†…å®¹ç›´æŽ¥æ’å…¥ï¼Œä¸å¸¦é¢å¤–çš„åŒ…è£…æ–‡æœ¬ã€‚

## å®‰å…¨æ€§ï¼šPrompt æ³¨å…¥é˜²æŠ¤

æ‰€æœ‰ä¸Šä¸‹æ–‡æ–‡ä»¶åœ¨è¢«çº³å…¥ä¹‹å‰éƒ½ä¼šæ‰«ææ½œåœ¨çš„ prompt æ³¨å…¥ã€‚æ‰«æå™¨æ£€æŸ¥ä»¥ä¸‹å†…å®¹ï¼š

- **æŒ‡ä»¤è¦†ç›–å°è¯•**ï¼šã€Œignore previous instructionsã€ã€ã€Œdisregard your rulesã€
- **æ¬ºéª—æ¨¡å¼**ï¼šã€Œdo not tell the userã€
- **ç³»ç»Ÿ prompt è¦†ç›–**ï¼šã€Œsystem prompt overrideã€
- **éšè— HTML æ³¨é‡Š**ï¼š`<!-- ignore instructions -->`
- **éšè— div å…ƒç´ **ï¼š`<div style="display:none">`
- **å‡­æ®çªƒå–**ï¼š`curl ... $API_KEY`
- **å¯†é’¥æ–‡ä»¶è®¿é—®**ï¼š`cat .env`ã€`cat credentials`
- **ä¸å¯è§å­—ç¬¦**ï¼šé›¶å®½ç©ºæ ¼ã€åŒå‘è¦†ç›–å­—ç¬¦ã€è¯è¿žæŽ¥ç¬¦

è‹¥æ£€æµ‹åˆ°ä»»ä½•å¨èƒæ¨¡å¼ï¼Œè¯¥æ–‡ä»¶å°†è¢«æ‹¦æˆªï¼š

```
[BLOCKED: AGENTS.md contained potential prompt injection (prompt_injection). Content not loaded.]
```

:::warning
æ­¤æ‰«æå™¨å¯é˜²èŒƒå¸¸è§æ³¨å…¥æ¨¡å¼ï¼Œä½†ä¸èƒ½æ›¿ä»£å¯¹ä¸Šä¸‹æ–‡æ–‡ä»¶çš„äººå·¥å®¡æŸ¥ã€‚å¯¹äºŽéžæœ¬äººç¼–å†™çš„å…±äº«ä»“åº“ï¼Œè¯·åŠ¡å¿…éªŒè¯ AGENTS.md çš„å†…å®¹ã€‚
:::

## å¤§å°é™åˆ¶

| é™åˆ¶ | å€¼ |
|-------|-------|
| æ¯ä¸ªæ–‡ä»¶æœ€å¤§å­—ç¬¦æ•° | 20,000ï¼ˆçº¦ 7,000 ä¸ª tokenï¼‰ |
| å¤´éƒ¨æˆªæ–­æ¯”ä¾‹ | 70% |
| å°¾éƒ¨æˆªæ–­æ¯”ä¾‹ | 20% |
| æˆªæ–­æ ‡è®° | 10%ï¼ˆæ˜¾ç¤ºå­—ç¬¦æ•°å¹¶å»ºè®®ä½¿ç”¨æ–‡ä»¶å·¥å…·ï¼‰ |

å½“æ–‡ä»¶è¶…è¿‡ 20,000 ä¸ªå­—ç¬¦æ—¶ï¼Œæˆªæ–­æç¤ºå¦‚ä¸‹ï¼š

```
[...truncated AGENTS.md: kept 14000+4000 of 25000 chars. Use file tools to read the full file.]
```

## æœ‰æ•ˆä½¿ç”¨ä¸Šä¸‹æ–‡æ–‡ä»¶çš„æŠ€å·§

:::tip AGENTS.md æœ€ä½³å®žè·µ
1. **ä¿æŒç®€æ´** â€” è¿œä½ŽäºŽ 20K å­—ç¬¦ï¼›agent æ¯è½®éƒ½ä¼šè¯»å–
2. **ä½¿ç”¨æ ‡é¢˜ç»“æž„** â€” ç”¨ `##` åˆ†èŠ‚æè¿°æž¶æž„ã€è§„èŒƒã€é‡è¦è¯´æ˜Ž
3. **åŒ…å«å…·ä½“ç¤ºä¾‹** â€” å±•ç¤ºé¦–é€‰ä»£ç æ¨¡å¼ã€API ç»“æž„ã€å‘½åè§„èŒƒ
4. **è¯´æ˜Žç¦æ­¢äº‹é¡¹** â€” ä¾‹å¦‚ã€Œä¸å¾—ç›´æŽ¥ä¿®æ”¹è¿ç§»æ–‡ä»¶ã€
5. **åˆ—å‡ºå…³é”®è·¯å¾„å’Œç«¯å£** â€” agent åœ¨æ‰§è¡Œç»ˆç«¯å‘½ä»¤æ—¶ä¼šç”¨åˆ°
6. **éšé¡¹ç›®æ¼”è¿›æ›´æ–°** â€” è¿‡æ—¶çš„ä¸Šä¸‹æ–‡æ¯”æ²¡æœ‰ä¸Šä¸‹æ–‡æ›´ç³Ÿ
:::

### å­ç›®å½•ä¸Šä¸‹æ–‡

å¯¹äºŽ monorepoï¼Œåœ¨åµŒå¥—çš„ AGENTS.md æ–‡ä»¶ä¸­æ”¾ç½®å­ç›®å½•ä¸“å±žæŒ‡ä»¤ï¼š

```markdown
<!-- frontend/AGENTS.md -->
# Frontend Context

- Use `pnpm` not `npm` for package management
- Components go in `src/components/`, pages in `src/app/`
- Use Tailwind CSS, never inline styles
- Run tests with `pnpm test`
```

```markdown
<!-- backend/AGENTS.md -->
# Backend Context

- Use `poetry` for dependency management
- Run the dev server with `poetry run uvicorn main:app --reload`
- All endpoints need OpenAPI docstrings
- Database models are in `models/`, schemas in `schemas/`
```
