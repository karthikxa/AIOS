---
title: "Llm Wiki â€” Karpathy çš„ LLM Wikiï¼šæž„å»º/æŸ¥è¯¢äº’è” Markdown çŸ¥è¯†åº“"
sidebar_label: "Llm Wiki"
description: "Karpathy çš„ LLM Wikiï¼šæž„å»º/æŸ¥è¯¢äº’è” Markdown çŸ¥è¯†åº“"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Llm Wiki

Karpathy çš„ LLM Wikiï¼šæž„å»º/æŸ¥è¯¢äº’è” Markdown çŸ¥è¯†åº“ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/research/llm-wiki` |
| ç‰ˆæœ¬ | `2.1.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `wiki`, `knowledge-base`, `research`, `notes`, `markdown`, `rag-alternative` |
| ç›¸å…³ skill | [`obsidian`](/user-guide/skills/bundled/note-taking/note-taking-obsidian), [`arxiv`](/user-guide/skills/bundled/research/research-arxiv) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Karpathy çš„ LLM Wiki

å°†çŸ¥è¯†åº“æž„å»ºå¹¶ç»´æŠ¤ä¸ºäº’è” Markdown æ–‡ä»¶ï¼ŒæŒç»­ç§¯ç´¯ã€å¤åˆ©å¢žé•¿ã€‚
åŸºäºŽ [Andrej Karpathy çš„ LLM Wiki æ¨¡å¼](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)ã€‚

ä¸Žä¼ ç»Ÿ RAGï¼ˆæ¯æ¬¡æŸ¥è¯¢éƒ½ä»Žå¤´é‡æ–°å‘çŽ°çŸ¥è¯†ï¼‰ä¸åŒï¼Œwiki åªç¼–è¯‘ä¸€æ¬¡çŸ¥è¯†å¹¶ä¿æŒæ›´æ–°ã€‚äº¤å‰å¼•ç”¨å·²å°±ä½ï¼ŒçŸ›ç›¾å·²è¢«æ ‡è®°ï¼Œç»¼åˆåˆ†æžåæ˜ äº†æ‰€æœ‰å·²æ‘„å…¥çš„å†…å®¹ã€‚

**åˆ†å·¥ï¼š** äººç±»è´Ÿè´£ç­›é€‰æ¥æºå¹¶æŒ‡å¯¼åˆ†æžã€‚Agent è´Ÿè´£æ‘˜è¦ã€äº¤å‰å¼•ç”¨ã€å½’æ¡£å’Œç»´æŠ¤ä¸€è‡´æ€§ã€‚

## æ­¤ Skill çš„æ¿€æ´»æ—¶æœº

å½“ç”¨æˆ·æ‰§è¡Œä»¥ä¸‹æ“ä½œæ—¶ä½¿ç”¨æ­¤ skillï¼š
- è¦æ±‚åˆ›å»ºã€æž„å»ºæˆ–å¯åŠ¨ wiki æˆ–çŸ¥è¯†åº“
- è¦æ±‚å°†æŸä¸ªæ¥æºæ‘„å…¥ï¼ˆingestï¼‰ã€æ·»åŠ æˆ–å¤„ç†åˆ° wiki ä¸­
- æå‡ºé—®é¢˜ï¼Œä¸”é…ç½®è·¯å¾„ä¸‹å·²å­˜åœ¨ wiki
- è¦æ±‚å¯¹ wiki è¿›è¡Œ lintã€å®¡è®¡æˆ–å¥åº·æ£€æŸ¥
- åœ¨ç ”ç©¶åœºæ™¯ä¸­æåŠå…¶ wikiã€çŸ¥è¯†åº“æˆ–"ç¬”è®°"

## Wiki ä½ç½®

**ä½ç½®ï¼š** é€šè¿‡ `WIKI_PATH` çŽ¯å¢ƒå˜é‡è®¾ç½®ï¼ˆä¾‹å¦‚åœ¨ `~/.zed/.env` ä¸­ï¼‰ã€‚

æœªè®¾ç½®æ—¶ï¼Œé»˜è®¤ä¸º `~/wiki`ã€‚

```bash
WIKI="${WIKI_PATH:-$HOME/wiki}"
```

Wiki åªæ˜¯ä¸€ä¸ª Markdown æ–‡ä»¶ç›®å½•â€”â€”å¯åœ¨ Obsidianã€VS Code æˆ–ä»»æ„ç¼–è¾‘å™¨ä¸­æ‰“å¼€ã€‚æ— éœ€æ•°æ®åº“ï¼Œæ— éœ€ç‰¹æ®Šå·¥å…·ã€‚

## æž¶æž„ï¼šä¸‰å±‚ç»“æž„

<!-- ascii-guard-ignore -->
```
wiki/
â”œâ”€â”€ SCHEMA.md           # Conventions, structure rules, domain config
â”œâ”€â”€ index.md            # Sectioned content catalog with one-line summaries
â”œâ”€â”€ log.md              # Chronological action log (append-only, rotated yearly)
â”œâ”€â”€ raw/                # Layer 1: Immutable source material
â”‚   â”œâ”€â”€ articles/       # Web articles, clippings
â”‚   â”œâ”€â”€ papers/         # PDFs, arxiv papers
â”‚   â”œâ”€â”€ transcripts/    # Meeting notes, interviews
â”‚   â””â”€â”€ assets/         # Images, diagrams referenced by sources
â”œâ”€â”€ entities/           # Layer 2: Entity pages (people, orgs, products, models)
â”œâ”€â”€ concepts/           # Layer 2: Concept/topic pages
â”œâ”€â”€ comparisons/        # Layer 2: Side-by-side analyses
â””â”€â”€ queries/            # Layer 2: Filed query results worth keeping
```
<!-- ascii-guard-ignore-end -->

**ç¬¬ä¸€å±‚â€”â€”åŽŸå§‹æ¥æºï¼š** ä¸å¯å˜ã€‚Agent åªè¯»ï¼Œä¸ä¿®æ”¹ã€‚
**ç¬¬äºŒå±‚â€”â€”Wiki æ­£æ–‡ï¼š** Agent æ‹¥æœ‰çš„ Markdown æ–‡ä»¶ï¼Œç”± Agent åˆ›å»ºã€æ›´æ–°å’Œäº¤å‰å¼•ç”¨ã€‚
**ç¬¬ä¸‰å±‚â€”â€”Schemaï¼š** `SCHEMA.md` å®šä¹‰ç»“æž„ã€çº¦å®šå’Œæ ‡ç­¾åˆ†ç±»ä½“ç³»ã€‚

## æ¢å¤å·²æœ‰ Wikiï¼ˆå…³é”®â€”â€”æ¯æ¬¡ä¼šè¯éƒ½å¿…é¡»æ‰§è¡Œï¼‰

å½“ç”¨æˆ·å·²æœ‰ wiki æ—¶ï¼Œ**åœ¨æ‰§è¡Œä»»ä½•æ“ä½œå‰åŠ¡å¿…å…ˆå®šä½è‡ªèº«**ï¼š

â‘  **è¯»å– `SCHEMA.md`** â€” äº†è§£é¢†åŸŸã€çº¦å®šå’Œæ ‡ç­¾åˆ†ç±»ä½“ç³»ã€‚
â‘¡ **è¯»å– `index.md`** â€” äº†è§£å·²æœ‰é¡µé¢åŠå…¶æ‘˜è¦ã€‚
â‘¢ **æ‰«æè¿‘æœŸ `log.md`** â€” è¯»å–æœ€åŽ 20-30 æ¡è®°å½•ï¼Œäº†è§£è¿‘æœŸæ´»åŠ¨ã€‚

```bash
WIKI="${WIKI_PATH:-$HOME/wiki}"
# Orientation reads at session start
read_file "$WIKI/SCHEMA.md"
read_file "$WIKI/index.md"
read_file "$WIKI/log.md" offset=<last 30 lines>
```

åªæœ‰å®Œæˆå®šä½åŽï¼Œæ‰å¯è¿›è¡Œæ‘„å…¥ã€æŸ¥è¯¢æˆ– lint æ“ä½œã€‚è¿™å¯ä»¥é˜²æ­¢ï¼š
- ä¸ºå·²å­˜åœ¨çš„å®žä½“åˆ›å»ºé‡å¤é¡µé¢
- é—æ¼å¯¹å·²æœ‰å†…å®¹çš„äº¤å‰å¼•ç”¨
- è¿å schema çº¦å®š
- é‡å¤å·²è®°å½•çš„å·¥ä½œ

å¯¹äºŽå¤§åž‹ wikiï¼ˆ100+ é¡µï¼‰ï¼Œåœ¨åˆ›å»ºä»»ä½•æ–°å†…å®¹å‰ï¼Œè¿˜éœ€é’ˆå¯¹å½“å‰ä¸»é¢˜å¿«é€Ÿæ‰§è¡Œ `search_files`ã€‚

## åˆå§‹åŒ–æ–° Wiki

å½“ç”¨æˆ·è¦æ±‚åˆ›å»ºæˆ–å¯åŠ¨ wiki æ—¶ï¼š

1. ç¡®å®š wiki è·¯å¾„ï¼ˆä»Ž `$WIKI_PATH` çŽ¯å¢ƒå˜é‡èŽ·å–ï¼Œæˆ–è¯¢é—®ç”¨æˆ·ï¼›é»˜è®¤ `~/wiki`ï¼‰
2. åˆ›å»ºä¸Šè¿°ç›®å½•ç»“æž„
3. è¯¢é—®ç”¨æˆ· wiki æ¶µç›–çš„é¢†åŸŸâ€”â€”è¦å…·ä½“
4. ç¼–å†™é’ˆå¯¹è¯¥é¢†åŸŸå®šåˆ¶çš„ `SCHEMA.md`ï¼ˆè§ä¸‹æ–¹æ¨¡æ¿ï¼‰
5. ç¼–å†™å¸¦åˆ†èŠ‚æ ‡é¢˜çš„åˆå§‹ `index.md`
6. ç¼–å†™åŒ…å«åˆ›å»ºæ¡ç›®çš„åˆå§‹ `log.md`
7. ç¡®è®¤ wiki å·²å°±ç»ªï¼Œå¹¶å»ºè®®é¦–æ‰¹æ‘„å…¥æ¥æº

### SCHEMA.md æ¨¡æ¿

æ ¹æ®ç”¨æˆ·é¢†åŸŸè¿›è¡Œè°ƒæ•´ã€‚Schema çº¦æŸ Agent è¡Œä¸ºå¹¶ç¡®ä¿ä¸€è‡´æ€§ï¼š

```markdown
# Wiki Schema

## Domain
[What this wiki covers â€” e.g., "AI/ML research", "personal health", "startup intelligence"]

## Conventions
- File names: lowercase, hyphens, no spaces (e.g., `transformer-architecture.md`)
- Every wiki page starts with YAML frontmatter (see below)
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- When updating a page, always bump the `updated` date
- Every new page must be added to `index.md` under the correct section
- Every action must be appended to `log.md`
- **Provenance markers:** On pages that synthesize 3+ sources, append `^[raw/articles/source-file.md]`
  at the end of paragraphs whose claims come from a specific source. This lets a reader trace each
  claim back without re-reading the whole raw file. Optional on single-source pages where the
  `sources:` frontmatter is enough.

## Frontmatter
  ```yaml
  ---
  title: Page Title
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  type: entity | concept | comparison | query | summary
  tags: [from taxonomy below]
  sources: [raw/articles/source-name.md]
  # Optional quality signals:
  confidence: high | medium | low        # how well-supported the claims are
  contested: true                        # set when the page has unresolved contradictions
  contradictions: [other-page-slug]      # pages this one conflicts with
  ---
  ```

`confidence` å’Œ `contested` æ˜¯å¯é€‰å­—æ®µï¼Œä½†å¯¹äºŽè§‚ç‚¹æ€§å¼ºæˆ–å¿«é€Ÿå˜åŒ–çš„ä¸»é¢˜å»ºè®®å¡«å†™ã€‚Lint ä¼šå°† `contested: true` å’Œ `confidence: low` çš„é¡µé¢æ ‡è®°å‡ºæ¥ä¾›å®¡æŸ¥ï¼Œé˜²æ­¢è–„å¼±è®ºæ–­æ‚„ç„¶å›ºåŒ–ä¸ºå…¬è®¤çš„ wiki äº‹å®žã€‚

### raw/ Frontmatter

åŽŸå§‹æ¥æº**åŒæ ·**éœ€è¦ä¸€ä¸ªå°åž‹ frontmatter å—ï¼Œä»¥ä¾¿é‡æ–°æ‘„å…¥æ—¶æ£€æµ‹å†…å®¹æ¼‚ç§»ï¼š

```yaml
---
source_url: https://example.com/article   # original URL, if applicable
ingested: YYYY-MM-DD
sha256: &lt;hex digest of the raw content below the frontmatter>
---
```

`sha256:` å­—æ®µå…è®¸æœªæ¥é‡æ–°æ‘„å…¥åŒä¸€ URL æ—¶ï¼Œåœ¨å†…å®¹æœªå˜æ—¶è·³è¿‡å¤„ç†ï¼Œåœ¨å†…å®¹å·²å˜æ—¶æ ‡è®°æ¼‚ç§»ã€‚ä»…å¯¹æ­£æ–‡ï¼ˆfrontmatter ç»“æŸ `---` ä¹‹åŽçš„æ‰€æœ‰å†…å®¹ï¼‰è®¡ç®—å“ˆå¸Œï¼Œä¸å« frontmatter æœ¬èº«ã€‚

## Tag Taxonomy
[Define 10-20 top-level tags for the domain. Add new tags here BEFORE using them.]

Example for AI/ML:
- Models: model, architecture, benchmark, training
- People/Orgs: person, company, lab, open-source
- Techniques: optimization, fine-tuning, inference, alignment, data
- Meta: comparison, timeline, controversy, prediction

Rule: every tag on a page must appear in this taxonomy. If a new tag is needed,
add it here first, then use it. This prevents tag sprawl.

## Page Thresholds
- **Create a page** when an entity/concept appears in 2+ sources OR is central to one source
- **Add to existing page** when a source mentions something already covered
- **DON'T create a page** for passing mentions, minor details, or things outside the domain
- **Split a page** when it exceeds ~200 lines â€” break into sub-topics with cross-links
- **Archive a page** when its content is fully superseded â€” move to `_archive/`, remove from index

## Entity Pages
One page per notable entity. Include:
- Overview / what it is
- Key facts and dates
- Relationships to other entities ([[wikilinks]])
- Source references

## Concept Pages
One page per concept or topic. Include:
- Definition / explanation
- Current state of knowledge
- Open questions or debates
- Related concepts ([[wikilinks]])

## Comparison Pages
Side-by-side analyses. Include:
- What is being compared and why
- Dimensions of comparison (table format preferred)
- Verdict or synthesis
- Sources

## Update Policy
When new information conflicts with existing content:
1. Check the dates â€” newer sources generally supersede older ones
2. If genuinely contradictory, note both positions with dates and sources
3. Mark the contradiction in frontmatter: `contradictions: [page-name]`
4. Flag for user review in the lint report
```

### index.md æ¨¡æ¿

ç´¢å¼•æŒ‰ç±»åž‹åˆ†èŠ‚ã€‚æ¯æ¡è®°å½•ä¸ºä¸€è¡Œï¼šwikilink + æ‘˜è¦ã€‚

```markdown
# Wiki Index

> Content catalog. Every wiki page listed under its type with a one-line summary.
> Read this first to find relevant pages for any query.
> Last updated: YYYY-MM-DD | Total pages: N

## Entities
<!-- Alphabetical within section -->

## Concepts

## Comparisons

## Queries
```

**æ‰©å±•è§„åˆ™ï¼š** å½“ä»»æ„åˆ†èŠ‚è¶…è¿‡ 50 æ¡æ—¶ï¼ŒæŒ‰é¦–å­—æ¯æˆ–å­é¢†åŸŸæ‹†åˆ†ä¸ºå­èŠ‚ã€‚å½“ç´¢å¼•æ€»æ¡ç›®è¶…è¿‡ 200 æ—¶ï¼Œåˆ›å»º `_meta/topic-map.md`ï¼ŒæŒ‰ä¸»é¢˜å¯¹é¡µé¢åˆ†ç»„ï¼Œä»¥åŠ å¿«å¯¼èˆªé€Ÿåº¦ã€‚

### log.md æ¨¡æ¿

```markdown
# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.

## [YYYY-MM-DD] create | Wiki initialized
- Domain: [domain]
- Structure created with SCHEMA.md, index.md, log.md
```

## æ ¸å¿ƒæ“ä½œ

### 1. æ‘„å…¥ï¼ˆIngestï¼‰

å½“ç”¨æˆ·æä¾›æ¥æºï¼ˆURLã€æ–‡ä»¶ã€ç²˜è´´å†…å®¹ï¼‰æ—¶ï¼Œå°†å…¶æ•´åˆåˆ° wiki ä¸­ï¼š

â‘  **æ•èŽ·åŽŸå§‹æ¥æºï¼š**
   - URL â†’ ä½¿ç”¨ `web_extract` èŽ·å– Markdownï¼Œä¿å­˜åˆ° `raw/articles/`
   - PDF â†’ ä½¿ç”¨ `web_extract`ï¼ˆæ”¯æŒ PDFï¼‰ï¼Œä¿å­˜åˆ° `raw/papers/`
   - ç²˜è´´æ–‡æœ¬ â†’ ä¿å­˜åˆ°å¯¹åº”çš„ `raw/` å­ç›®å½•
   - æ–‡ä»¶ååº”å…·æœ‰æè¿°æ€§ï¼š`raw/articles/karpathy-llm-wiki-2026.md`
   - **æ·»åŠ  raw frontmatter**ï¼ˆ`source_url`ã€`ingested`ã€æ­£æ–‡çš„ `sha256`ï¼‰ã€‚
     é‡æ–°æ‘„å…¥åŒä¸€ URL æ—¶ï¼šé‡æ–°è®¡ç®— sha256ï¼Œä¸Žå·²å­˜å‚¨å€¼æ¯”è¾ƒâ€”â€”ç›¸åŒåˆ™è·³è¿‡ï¼Œä¸åŒåˆ™æ ‡è®°æ¼‚ç§»å¹¶æ›´æ–°ã€‚æ­¤æ“ä½œæˆæœ¬æžä½Žï¼Œæ¯æ¬¡é‡æ–°æ‘„å…¥éƒ½å¯æ‰§è¡Œï¼Œèƒ½æ•èŽ·é™é»˜çš„æ¥æºå˜æ›´ã€‚

â‘¡ **ä¸Žç”¨æˆ·è®¨è®ºè¦ç‚¹** â€” å“ªäº›å†…å®¹æœ‰è¶£ï¼Œå“ªäº›å¯¹é¢†åŸŸé‡è¦ã€‚ï¼ˆè‡ªåŠ¨åŒ–/cron åœºæ™¯ä¸‹è·³è¿‡æ­¤æ­¥ï¼Œç›´æŽ¥ç»§ç»­ã€‚ï¼‰

â‘¢ **æ£€æŸ¥å·²æœ‰å†…å®¹** â€” æœç´¢ index.mdï¼Œå¹¶ä½¿ç”¨ `search_files` æŸ¥æ‰¾å·²æåŠå®žä½“/æ¦‚å¿µçš„çŽ°æœ‰é¡µé¢ã€‚è¿™æ˜¯ wiki æŒç»­å¢žé•¿ä¸Žå˜æˆé‡å¤å †ç Œä¹‹é—´çš„å…³é”®åŒºåˆ«ã€‚

â‘£ **ç¼–å†™æˆ–æ›´æ–° wiki é¡µé¢ï¼š**
   - **æ–°å®žä½“/æ¦‚å¿µï¼š** ä»…åœ¨æ»¡è¶³ SCHEMA.md ä¸­é¡µé¢é˜ˆå€¼æ—¶åˆ›å»ºé¡µé¢ï¼ˆ2+ æ¥æºæåŠï¼Œæˆ–åœ¨æŸä¸€æ¥æºä¸­å¤„äºŽæ ¸å¿ƒåœ°ä½ï¼‰
   - **å·²æœ‰é¡µé¢ï¼š** æ·»åŠ æ–°ä¿¡æ¯ï¼Œæ›´æ–°äº‹å®žï¼Œæ›´æ–° `updated` æ—¥æœŸã€‚æ–°ä¿¡æ¯ä¸Žå·²æœ‰å†…å®¹çŸ›ç›¾æ—¶ï¼Œéµå¾ªæ›´æ–°ç­–ç•¥ã€‚
   - **äº¤å‰å¼•ç”¨ï¼š** æ¯ä¸ªæ–°å»ºæˆ–æ›´æ–°çš„é¡µé¢å¿…é¡»é€šè¿‡ `[[wikilinks]]` é“¾æŽ¥åˆ°è‡³å°‘ 2 ä¸ªå…¶ä»–é¡µé¢ã€‚æ£€æŸ¥å·²æœ‰é¡µé¢æ˜¯å¦æœ‰åå‘é“¾æŽ¥ã€‚
   - **æ ‡ç­¾ï¼š** åªä½¿ç”¨ SCHEMA.md åˆ†ç±»ä½“ç³»ä¸­çš„æ ‡ç­¾
   - **æ¥æºæº¯æºï¼š** åœ¨ç»¼åˆ 3+ æ¥æºçš„é¡µé¢ä¸Šï¼Œåœ¨è®ºæ–­å¯è¿½æº¯åˆ°ç‰¹å®šæ¥æºçš„æ®µè½æœ«å°¾æ·»åŠ  `^[raw/articles/source.md]` æ ‡è®°ã€‚
   - **ç½®ä¿¡åº¦ï¼š** å¯¹äºŽè§‚ç‚¹æ€§å¼ºã€å¿«é€Ÿå˜åŒ–æˆ–å•ä¸€æ¥æºçš„è®ºæ–­ï¼Œåœ¨ frontmatter ä¸­è®¾ç½® `confidence: medium` æˆ– `low`ã€‚é™¤éžè®ºæ–­åœ¨å¤šä¸ªæ¥æºä¸­æœ‰å……åˆ†æ”¯æ’‘ï¼Œå¦åˆ™ä¸æ ‡è®° `high`ã€‚

â‘¤ **æ›´æ–°å¯¼èˆªï¼š**
   - å°†æ–°é¡µé¢æŒ‰å­—æ¯é¡ºåºæ·»åŠ åˆ° `index.md` å¯¹åº”åˆ†èŠ‚
   - æ›´æ–° index å¤´éƒ¨çš„"Total pages"è®¡æ•°å’Œ"Last updated"æ—¥æœŸ
   - è¿½åŠ åˆ° `log.md`ï¼š`## [YYYY-MM-DD] ingest | Source Title`
   - åœ¨æ—¥å¿—æ¡ç›®ä¸­åˆ—å‡ºæ¯ä¸ªåˆ›å»ºæˆ–æ›´æ–°çš„æ–‡ä»¶

â‘¥ **æŠ¥å‘Šå˜æ›´å†…å®¹** â€” å‘ç”¨æˆ·åˆ—å‡ºæ¯ä¸ªåˆ›å»ºæˆ–æ›´æ–°çš„æ–‡ä»¶ã€‚

å•ä¸ªæ¥æºå¯èƒ½è§¦å‘ 5-15 ä¸ª wiki é¡µé¢çš„æ›´æ–°ã€‚è¿™æ˜¯æ­£å¸¸ä¸”æœŸæœ›çš„ç»“æžœâ€”â€”è¿™æ­£æ˜¯å¤åˆ©æ•ˆåº”ã€‚

### 2. æŸ¥è¯¢ï¼ˆQueryï¼‰

å½“ç”¨æˆ·å°± wiki é¢†åŸŸæé—®æ—¶ï¼š

â‘  **è¯»å– `index.md`** ä»¥è¯†åˆ«ç›¸å…³é¡µé¢ã€‚
â‘¡ **å¯¹äºŽ 100+ é¡µçš„ wiki**ï¼Œè¿˜éœ€å¯¹æ‰€æœ‰ `.md` æ–‡ä»¶æ‰§è¡Œ `search_files` æœç´¢å…³é”®è¯â€”â€”ä»…é ç´¢å¼•å¯èƒ½é—æ¼ç›¸å…³å†…å®¹ã€‚
â‘¢ **è¯»å–ç›¸å…³é¡µé¢**ï¼Œä½¿ç”¨ `read_file`ã€‚
â‘£ **ä»Žå·²ç¼–è¯‘çš„çŸ¥è¯†ä¸­ç»¼åˆç­”æ¡ˆ**ã€‚å¼•ç”¨æ‰€å‚è€ƒçš„ wiki é¡µé¢ï¼š"Based on [[page-a]] and [[page-b]]..."
â‘¤ **å°†æœ‰ä»·å€¼çš„ç­”æ¡ˆå½’æ¡£** â€” å¦‚æžœç­”æ¡ˆæ˜¯å®žè´¨æ€§çš„æ¯”è¾ƒã€æ·±åº¦åˆ†æžæˆ–æ–°é¢–ç»¼åˆï¼Œåœ¨ `queries/` æˆ– `comparisons/` ä¸­åˆ›å»ºé¡µé¢ã€‚ä¸è¦å½’æ¡£çç¢Žçš„æŸ¥è¯¢â€”â€”åªå½’æ¡£é‡æ–°æŽ¨å¯¼ä»£ä»·é«˜æ˜‚çš„ç­”æ¡ˆã€‚
â‘¥ **æ›´æ–° log.md**ï¼Œè®°å½•æŸ¥è¯¢å†…å®¹åŠæ˜¯å¦å·²å½’æ¡£ã€‚

### 3. Lint

å½“ç”¨æˆ·è¦æ±‚ lintã€å¥åº·æ£€æŸ¥æˆ–å®¡è®¡ wiki æ—¶ï¼š

â‘  **å­¤ç«‹é¡µé¢ï¼š** æŸ¥æ‰¾æ²¡æœ‰å…¶ä»–é¡µé¢é€šè¿‡ `[[wikilinks]]` æŒ‡å‘çš„é¡µé¢ã€‚
```python
# Use execute_code for this â€” programmatic scan across all wiki pages
import os, re
from collections import defaultdict
wiki = "<WIKI_PATH>"
# Scan all .md files in entities/, concepts/, comparisons/, queries/
# Extract all [[wikilinks]] â€” build inbound link map
# Pages with zero inbound links are orphans
```

â‘¡ **æ–­å¼€çš„ wikilinkï¼š** æŸ¥æ‰¾æŒ‡å‘ä¸å­˜åœ¨é¡µé¢çš„ `[[links]]`ã€‚

â‘¢ **ç´¢å¼•å®Œæ•´æ€§ï¼š** æ¯ä¸ª wiki é¡µé¢éƒ½åº”å‡ºçŽ°åœ¨ `index.md` ä¸­ã€‚å¯¹æ¯”æ–‡ä»¶ç³»ç»Ÿä¸Žç´¢å¼•æ¡ç›®ã€‚

â‘£ **Frontmatter éªŒè¯ï¼š** æ¯ä¸ª wiki é¡µé¢å¿…é¡»åŒ…å«æ‰€æœ‰å¿…å¡«å­—æ®µï¼ˆtitleã€createdã€updatedã€typeã€tagsã€sourcesï¼‰ã€‚æ ‡ç­¾å¿…é¡»åœ¨åˆ†ç±»ä½“ç³»ä¸­ã€‚

â‘¤ **è¿‡æ—¶å†…å®¹ï¼š** `updated` æ—¥æœŸæ¯”æåŠç›¸åŒå®žä½“çš„æœ€æ–°æ¥æºæ—© 90 å¤©ä»¥ä¸Šçš„é¡µé¢ã€‚

â‘¥ **çŸ›ç›¾ï¼š** æ¶‰åŠåŒä¸€ä¸»é¢˜ä½†è®ºæ–­ç›¸äº’å†²çªçš„é¡µé¢ã€‚æŸ¥æ‰¾å…±äº«æ ‡ç­¾/å®žä½“ä½†é™ˆè¿°ä¸åŒäº‹å®žçš„é¡µé¢ã€‚å°†æ‰€æœ‰å¸¦æœ‰ `contested: true` æˆ– `contradictions:` frontmatter çš„é¡µé¢æ ‡è®°å‡ºæ¥ä¾›ç”¨æˆ·å®¡æŸ¥ã€‚

â‘¦ **è´¨é‡ä¿¡å·ï¼š** åˆ—å‡º `confidence: low` çš„é¡µé¢ï¼Œä»¥åŠä»…å¼•ç”¨å•ä¸€æ¥æºä½†æœªè®¾ç½® confidence å­—æ®µçš„é¡µé¢â€”â€”è¿™äº›é¡µé¢æ˜¯å¯»æ‰¾ä½è¯æˆ–é™çº§ä¸º `confidence: medium` çš„å€™é€‰ã€‚

â‘§ **æ¥æºæ¼‚ç§»ï¼š** å¯¹ `raw/` ä¸­æ¯ä¸ªå¸¦æœ‰ `sha256:` frontmatter çš„æ–‡ä»¶ï¼Œé‡æ–°è®¡ç®—å“ˆå¸Œå¹¶æ ‡è®°ä¸åŒ¹é…é¡¹ã€‚ä¸åŒ¹é…è¡¨æ˜ŽåŽŸå§‹æ–‡ä»¶è¢«ç¼–è¾‘ï¼ˆä¸åº”å‘ç”Ÿâ€”â€”`raw/` æ˜¯ä¸å¯å˜çš„ï¼‰æˆ–ä»Žå·²å˜æ›´çš„ URL æ‘„å…¥ã€‚ä¸æ˜¯ç¡¬æ€§é”™è¯¯ï¼Œä½†å€¼å¾—æŠ¥å‘Šã€‚

â‘¨ **é¡µé¢å¤§å°ï¼š** æ ‡è®°è¶…è¿‡ 200 è¡Œçš„é¡µé¢â€”â€”æ‹†åˆ†å€™é€‰ã€‚

â‘© **æ ‡ç­¾å®¡è®¡ï¼š** åˆ—å‡ºæ‰€æœ‰ä½¿ç”¨ä¸­çš„æ ‡ç­¾ï¼Œæ ‡è®°ä¸åœ¨ SCHEMA.md åˆ†ç±»ä½“ç³»ä¸­çš„æ ‡ç­¾ã€‚

â‘ª **æ—¥å¿—è½®è½¬ï¼š** å¦‚æžœ log.md è¶…è¿‡ 500 æ¡ï¼Œè¿›è¡Œè½®è½¬ã€‚

â‘« **æŠ¥å‘Šå‘çŽ°ç»“æžœ**ï¼Œé™„å…·ä½“æ–‡ä»¶è·¯å¾„å’Œå»ºè®®æ“ä½œï¼ŒæŒ‰ä¸¥é‡ç¨‹åº¦åˆ†ç»„ï¼ˆæ–­å¼€é“¾æŽ¥ > å­¤ç«‹é¡µé¢ > æ¥æºæ¼‚ç§» > æœ‰äº‰è®®é¡µé¢ > è¿‡æ—¶å†…å®¹ > æ ·å¼é—®é¢˜ï¼‰ã€‚

â‘¬ **è¿½åŠ åˆ° log.mdï¼š** `## [YYYY-MM-DD] lint | N issues found`

## Wiki ä½¿ç”¨æ–¹æ³•

### æœç´¢

```bash
# Find pages by content
search_files "transformer" path="$WIKI" file_glob="*.md"

# Find pages by filename
search_files "*.md" target="files" path="$WIKI"

# Find pages by tag
search_files "tags:.*alignment" path="$WIKI" file_glob="*.md"

# Recent activity
read_file "$WIKI/log.md" offset=<last 20 lines>
```

### æ‰¹é‡æ‘„å…¥

åŒæ—¶æ‘„å…¥å¤šä¸ªæ¥æºæ—¶ï¼Œæ‰¹é‡å¤„ç†æ›´æ–°ï¼š
1. å…ˆè¯»å–æ‰€æœ‰æ¥æº
2. è¯†åˆ«æ‰€æœ‰æ¥æºä¸­çš„æ‰€æœ‰å®žä½“å’Œæ¦‚å¿µ
3. ä¸€æ¬¡æ€§æ£€æŸ¥æ‰€æœ‰å®žä½“çš„å·²æœ‰é¡µé¢ï¼ˆä¸€æ¬¡æœç´¢ï¼Œè€Œéž N æ¬¡ï¼‰
4. ä¸€æ¬¡æ€§åˆ›å»º/æ›´æ–°é¡µé¢ï¼ˆé¿å…å†—ä½™æ›´æ–°ï¼‰
5. æœ€åŽç»Ÿä¸€æ›´æ–° index.md
6. å†™ä¸€æ¡æ¶µç›–æ•´æ‰¹æ“ä½œçš„æ—¥å¿—æ¡ç›®

### å½’æ¡£

å½“å†…å®¹å®Œå…¨è¢«å–ä»£æˆ–é¢†åŸŸèŒƒå›´å‘ç”Ÿå˜åŒ–æ—¶ï¼š
1. å¦‚ä¸å­˜åœ¨åˆ™åˆ›å»º `_archive/` ç›®å½•
2. å°†é¡µé¢ç§»è‡³ `_archive/`ï¼Œä¿ç•™åŽŸå§‹è·¯å¾„ï¼ˆä¾‹å¦‚ `_archive/entities/old-page.md`ï¼‰
3. ä»Ž `index.md` ä¸­ç§»é™¤
4. æ›´æ–°æ‰€æœ‰é“¾æŽ¥åˆ°è¯¥é¡µé¢çš„é¡µé¢â€”â€”å°† wikilink æ›¿æ¢ä¸ºçº¯æ–‡æœ¬ + "ï¼ˆå·²å½’æ¡£ï¼‰"
5. è®°å½•å½’æ¡£æ“ä½œ

### Obsidian é›†æˆ

Wiki ç›®å½•å¼€ç®±å³ç”¨ä½œä¸º Obsidian vaultï¼š
- `[[wikilinks]]` æ¸²æŸ“ä¸ºå¯ç‚¹å‡»é“¾æŽ¥
- å›¾è°±è§†å›¾å¯è§†åŒ–çŸ¥è¯†ç½‘ç»œ
- YAML frontmatter æ”¯æŒ Dataview æŸ¥è¯¢
- `raw/assets/` æ–‡ä»¶å¤¹å­˜æ”¾é€šè¿‡ `![[image.png]]` å¼•ç”¨çš„å›¾ç‰‡

æœ€ä½³å®žè·µï¼š
- å°† Obsidian çš„é™„ä»¶æ–‡ä»¶å¤¹è®¾ç½®ä¸º `raw/assets/`
- åœ¨ Obsidian è®¾ç½®ä¸­å¯ç”¨"Wikilinks"ï¼ˆé€šå¸¸é»˜è®¤å¼€å¯ï¼‰
- å®‰è£… Dataview æ’ä»¶ï¼Œæ”¯æŒå¦‚ `TABLE tags FROM "entities" WHERE contains(tags, "company")` çš„æŸ¥è¯¢

å¦‚æžœåŒæ—¶ä½¿ç”¨ Obsidian skillï¼Œå°† `OBSIDIAN_VAULT_PATH` è®¾ç½®ä¸ºä¸Ž wiki è·¯å¾„ç›¸åŒçš„ç›®å½•ã€‚

### Obsidian æ— å¤´æ¨¡å¼ï¼ˆæœåŠ¡å™¨å’Œæ— æ˜¾ç¤ºå™¨æœºå™¨ï¼‰

åœ¨æ²¡æœ‰æ˜¾ç¤ºå™¨çš„æœºå™¨ä¸Šï¼Œä½¿ç”¨ `obsidian-headless` ä»£æ›¿æ¡Œé¢åº”ç”¨ã€‚å®ƒé€šè¿‡ Obsidian Sync åŒæ­¥ vaultï¼Œæ— éœ€ GUIâ€”â€”éžå¸¸é€‚åˆåœ¨æœåŠ¡å™¨ä¸Šè¿è¡Œã€å‘ wiki å†™å…¥å†…å®¹ï¼ŒåŒæ—¶åœ¨å¦ä¸€å°è®¾å¤‡ä¸Šç”¨ Obsidian æ¡Œé¢ç«¯è¯»å–çš„ Agentã€‚

**è®¾ç½®ï¼š**
```bash
# Requires Node.js 22+
npm install -g obsidian-headless

# Login (requires Obsidian account with Sync subscription)
ob login --email <email> --password '<password>'

# Create a remote vault for the wiki
ob sync-create-remote --name "LLM Wiki"

# Connect the wiki directory to the vault
cd ~/wiki
ob sync-setup --vault "<vault-id>"

# Initial sync
ob sync

# Continuous sync (foreground â€” use systemd for background)
ob sync --continuous
```

**é€šè¿‡ systemd å®žçŽ°æŒç»­åŽå°åŒæ­¥ï¼š**
```ini
# ~/.config/systemd/user/obsidian-wiki-sync.service
[Unit]
Description=Obsidian LLM Wiki Sync
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/path/to/ob sync --continuous
WorkingDirectory=/home/user/wiki
Restart=on-failure
RestartSec=10

[Install]
WantedBy=default.target
```

```bash
systemctl --user daemon-reload
systemctl --user enable --now obsidian-wiki-sync
# Enable linger so sync survives logout:
sudo loginctl enable-linger $USER
```

è¿™æ · Agent å¯ä»¥åœ¨æœåŠ¡å™¨ä¸Šå‘ `~/wiki` å†™å…¥å†…å®¹ï¼ŒåŒæ—¶ä½ åœ¨ç¬”è®°æœ¬/æ‰‹æœºä¸Šçš„ Obsidian ä¸­æµè§ˆåŒä¸€ vaultâ€”â€”å˜æ›´åœ¨æ•°ç§’å†…å³å¯åŒæ­¥ã€‚

## æ³¨æ„äº‹é¡¹

- **æ°¸è¿œä¸è¦ä¿®æ”¹ `raw/` ä¸­çš„æ–‡ä»¶** â€” æ¥æºæ˜¯ä¸å¯å˜çš„ã€‚æ›´æ­£å†…å®¹å†™å…¥ wiki é¡µé¢ã€‚
- **å§‹ç»ˆå…ˆå®šä½è‡ªèº«** â€” åœ¨æ–°ä¼šè¯ä¸­æ‰§è¡Œä»»ä½•æ“ä½œå‰ï¼Œå…ˆè¯»å– SCHEMA + index + è¿‘æœŸæ—¥å¿—ã€‚è·³è¿‡æ­¤æ­¥ä¼šå¯¼è‡´é‡å¤å’Œé—æ¼äº¤å‰å¼•ç”¨ã€‚
- **å§‹ç»ˆæ›´æ–° index.md å’Œ log.md** â€” è·³è¿‡æ­¤æ­¥ä¼šå¯¼è‡´ wiki é€€åŒ–ã€‚è¿™ä¸¤ä¸ªæ–‡ä»¶æ˜¯å¯¼èˆªéª¨æž¶ã€‚
- **ä¸è¦ä¸ºä¸€ç¬”å¸¦è¿‡çš„æåŠåˆ›å»ºé¡µé¢** â€” éµå¾ª SCHEMA.md ä¸­çš„é¡µé¢é˜ˆå€¼ã€‚æŸä¸ªåç§°åœ¨è„šæ³¨ä¸­å‡ºçŽ°ä¸€æ¬¡ï¼Œä¸è¶³ä»¥åˆ›å»ºå®žä½“é¡µé¢ã€‚
- **ä¸è¦åˆ›å»ºæ²¡æœ‰äº¤å‰å¼•ç”¨çš„é¡µé¢** â€” å­¤ç«‹é¡µé¢æ˜¯ä¸å¯è§çš„ã€‚æ¯ä¸ªé¡µé¢å¿…é¡»é“¾æŽ¥åˆ°è‡³å°‘ 2 ä¸ªå…¶ä»–é¡µé¢ã€‚
- **Frontmatter æ˜¯å¿…å¡«çš„** â€” å®ƒæ”¯æŒæœç´¢ã€è¿‡æ»¤å’Œè¿‡æ—¶æ£€æµ‹ã€‚
- **æ ‡ç­¾å¿…é¡»æ¥è‡ªåˆ†ç±»ä½“ç³»** â€” è‡ªç”±å½¢å¼çš„æ ‡ç­¾ä¼šé€€åŒ–ä¸ºå™ªéŸ³ã€‚å…ˆåœ¨ SCHEMA.md ä¸­æ·»åŠ æ–°æ ‡ç­¾ï¼Œå†ä½¿ç”¨ã€‚
- **ä¿æŒé¡µé¢å¯æ‰«æ** â€” wiki é¡µé¢åº”åœ¨ 30 ç§’å†…å¯è¯»å®Œã€‚è¶…è¿‡ 200 è¡Œçš„é¡µé¢åº”æ‹†åˆ†ã€‚å°†è¯¦ç»†åˆ†æžç§»è‡³ä¸“ç”¨æ·±åº¦åˆ†æžé¡µé¢ã€‚
- **æ‰¹é‡æ›´æ–°å‰å…ˆç¡®è®¤** â€” å¦‚æžœä¸€æ¬¡æ‘„å…¥ä¼šå½±å“ 10+ ä¸ªå·²æœ‰é¡µé¢ï¼Œå…ˆä¸Žç”¨æˆ·ç¡®è®¤èŒƒå›´ã€‚
- **è½®è½¬æ—¥å¿—** â€” å½“ log.md è¶…è¿‡ 500 æ¡æ—¶ï¼Œå°†å…¶é‡å‘½åä¸º `log-YYYY.md` å¹¶é‡æ–°å¼€å§‹ã€‚Agent åº”åœ¨ lint æœŸé—´æ£€æŸ¥æ—¥å¿—å¤§å°ã€‚
- **æ˜¾å¼å¤„ç†çŸ›ç›¾** â€” ä¸è¦é™é»˜è¦†ç›–ã€‚æ³¨æ˜Žä¸¤ç§è®ºæ–­åŠå…¶æ—¥æœŸï¼Œåœ¨ frontmatter ä¸­æ ‡è®°ï¼Œæ ‡è®°ä¾›ç”¨æˆ·å®¡æŸ¥ã€‚

## ç›¸å…³å·¥å…·

[llm-wiki-compiler](https://github.com/atomicmemory/llm-wiki-compiler) æ˜¯ä¸€ä¸ª Node.js CLIï¼ŒåŸºäºŽç›¸åŒçš„ Karpathy çµæ„Ÿå°†æ¥æºç¼–è¯‘ä¸ºæ¦‚å¿µ wikiã€‚å®ƒå…¼å®¹ Obsidianï¼Œå› æ­¤å¸Œæœ›ä½¿ç”¨å®šæ—¶/CLI é©±åŠ¨ç¼–è¯‘æµæ°´çº¿çš„ç”¨æˆ·å¯ä»¥å°†å…¶æŒ‡å‘æ­¤ skill ç»´æŠ¤çš„åŒä¸€ vaultã€‚æƒè¡¡ï¼šå®ƒæ‹¥æœ‰é¡µé¢ç”Ÿæˆçš„æŽ§åˆ¶æƒï¼ˆå–ä»£ Agent åœ¨é¡µé¢åˆ›å»ºä¸Šçš„åˆ¤æ–­ï¼‰ï¼Œå¹¶é’ˆå¯¹å°åž‹è¯­æ–™åº“è¿›è¡Œäº†è°ƒä¼˜ã€‚å½“ä½ å¸Œæœ› Agent å‚ä¸Žç­–åˆ’æ—¶ä½¿ç”¨æ­¤ skillï¼›å½“ä½ å¸Œæœ›æ‰¹é‡ç¼–è¯‘æ¥æºç›®å½•æ—¶ä½¿ç”¨ llmwikiã€‚