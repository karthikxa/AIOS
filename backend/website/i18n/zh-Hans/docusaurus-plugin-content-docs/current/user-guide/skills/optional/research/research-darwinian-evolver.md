---
title: "Darwinian Evolver â€” ä½¿ç”¨ Imbue çš„è¿›åŒ–å¾ªçŽ¯æ¥ä¼˜åŒ– prompt/æ­£åˆ™/SQL/ä»£ç "
sidebar_label: "Darwinian Evolver"
description: "ä½¿ç”¨ Imbue çš„è¿›åŒ–å¾ªçŽ¯æ¥ä¼˜åŒ– prompt/æ­£åˆ™/SQL/ä»£ç "
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Darwinian Evolver

ä½¿ç”¨ Imbue çš„è¿›åŒ–å¾ªçŽ¯æ¥ä¼˜åŒ– promptï¼ˆæç¤ºè¯ï¼‰/æ­£åˆ™/SQL/ä»£ç ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/research/darwinian-evolver` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/darwinian-evolver` |
| ç‰ˆæœ¬ | `0.1.0` |
| ä½œè€… | Bihruze (Asahi0x), Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `evolution`, `optimization`, `prompt-engineering`, `research` |
| ç›¸å…³ skill | [`arxiv`](/user-guide/skills/bundled/research/research-arxiv), [`jupyter-live-kernel`](/user-guide/skills/bundled/data-science/data-science-jupyter-live-kernel) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Darwinian Evolver

è¿è¡Œ Imbue çš„ [darwinian_evolver](https://github.com/imbue-ai/darwinian_evolver) â€”â€” ä¸€ä¸ª
ç”± LLM é©±åŠ¨çš„è¿›åŒ–æœç´¢å¾ªçŽ¯ â€”â€” ç”¨äºŽé’ˆå¯¹é€‚åº”åº¦å‡½æ•°ä¼˜åŒ– **promptã€æ­£åˆ™è¡¨è¾¾å¼ã€SQL æŸ¥è¯¢
æˆ–å°åž‹ä»£ç ç‰‡æ®µ**ã€‚

çŠ¶æ€ï¼šå¯¹ä¸Šæ¸¸å·¥å…·çš„è½»é‡å°è£…ã€‚è¯¥ skill è´Ÿè´£å®‰è£…å·¥å…·ï¼Œå¼•å¯¼ agent ç¼–å†™ `Problem` å®šä¹‰
ï¼ˆorganism + evaluator + mutatorï¼‰ï¼Œå¹¶é€šè¿‡ä¸Šæ¸¸ CLI æˆ–ä¸€ä¸ªå°åž‹è‡ªå®šä¹‰ Python é©±åŠ¨è„šæœ¬æ¥è¿è¡Œå¾ªçŽ¯ã€‚

**è®¸å¯è¯ï¼š** ä¸Šæ¸¸å·¥å…·é‡‡ç”¨ **AGPL-3.0** æŽˆæƒã€‚è¯¥ skill ä»…é€šè¿‡ä¸Šæ¸¸ CLI æˆ– `subprocess`/`uv run`
è°ƒç”¨æ¥è°ƒç”¨å®ƒï¼ˆçº¯èšåˆæ–¹å¼ï¼‰ã€‚**ä¸å¾—**å°†ä¸Šæ¸¸ç±»å¯¼å…¥ Zed æœ¬èº«ã€‚

## ä½¿ç”¨æ—¶æœº

- ç”¨æˆ·è¯´"ä¼˜åŒ–è¿™ä¸ª prompt"ã€"ä¸º X è¿›åŒ–ä¸€ä¸ªæ­£åˆ™"ã€"è‡ªåŠ¨æ”¹è¿›è¿™æ®µä»£ç /SQL"ã€"æœç´¢æ›´å¥½çš„æŒ‡ä»¤"ã€‚
- ä½ æœ‰ä¸€ä¸ªè¯„åˆ†å™¨ï¼ˆç²¾ç¡®åŒ¹é…ã€æ­£åˆ™é€šè¿‡çŽ‡ã€å•å…ƒæµ‹è¯•ã€LLM è¯„åˆ¤ã€è¿è¡Œæ—¶æŒ‡æ ‡ï¼‰ä»¥åŠä¸€ä¸ªèµ·å§‹å€™é€‰ï¼ˆorganismï¼‰ã€‚å¦‚æžœæ²¡æœ‰è¯„åˆ†å™¨ï¼Œè¯·å…ˆå®šä¹‰ä¸€ä¸ª â€”â€” è¿™æ‰æ˜¯éš¾ç‚¹æ‰€åœ¨ã€‚
- æˆæœ¬å¯æŽ¥å—ï¼šä¸€æ¬¡å…¸åž‹è¿è¡Œéœ€è¦ 50â€“500 æ¬¡ LLM è°ƒç”¨ã€‚ä½¿ç”¨ gpt-4o-mini åªéœ€å‡ ç¾Žåˆ†ï¼›ä½¿ç”¨ Claude Sonnet å¯èƒ½éœ€è¦å‡ ç¾Žå…ƒã€‚

**ä¸é€‚ç”¨**çš„æƒ…å†µï¼š
- ä¼˜åŒ–ç›®æ ‡å¯å¾®åˆ†ï¼ˆè¯·ä½¿ç”¨æ¢¯åº¦ä¸‹é™ / DSPyï¼‰ã€‚
- åªéœ€å°è¯• 2â€“3 ä¸ªå˜ä½“ â€”â€” ç›´æŽ¥æ‰‹å†™å³å¯ã€‚
- é€‚åº”åº¦ä¿¡å·çº¯ç²¹ä¸»è§‚ï¼Œæ²¡æœ‰å¯é‡åŒ–çš„æ ‡å‡†ã€‚

## å‰ç½®æ¡ä»¶

- Python â‰¥3.11
- `git`ã€`uv`ï¼ˆæˆ– `pip`ï¼‰
- ä»¥ä¸‹ä¹‹ä¸€ï¼š`OPENROUTER_API_KEY`ã€`ANTHROPIC_API_KEY` æˆ– `OPENAI_API_KEY`

è¯¥ skill é™„å¸¦ä¸€ä¸ªå°åž‹ `parrot_openrouter.py` é©±åŠ¨è„šæœ¬ï¼Œé€šè¿‡ OpenAI SDK ä½¿ç”¨ `OPENROUTER_API_KEY`ï¼Œ
å› æ­¤ OpenRouter ä¸Šçš„ä»»ä½•æ¨¡åž‹å‡å¯ä½¿ç”¨ã€‚ä¸Šæ¸¸ CLI æœ¬èº«ç¡¬ç¼–ç äº† Anthropicï¼Œéœ€è¦ `ANTHROPIC_API_KEY`ã€‚

## å®‰è£…ï¼ˆä¸€æ¬¡æ€§ï¼‰

é€šè¿‡ `terminal` å·¥å…·è¿è¡Œï¼š

```bash
mkdir -p ~/.zed/cache/darwinian-evolver && cd ~/.zed/cache/darwinian-evolver
[ -d darwinian_evolver ] || git clone --depth 1 https://github.com/imbue-ai/darwinian_evolver.git
cd darwinian_evolver && uv sync
```

éªŒè¯ï¼š

```bash
cd ~/.zed/cache/darwinian-evolver/darwinian_evolver \
  && uv run darwinian_evolver --help | head -5
```

## å¿«é€Ÿå¼€å§‹ â€”â€” å†…ç½® Parrot ç¤ºä¾‹

å°åž‹å†’çƒŸæµ‹è¯•ï¼ˆéœ€è¦ `ANTHROPIC_API_KEY`ï¼‰ï¼š

```bash
cd ~/.zed/cache/darwinian-evolver/darwinian_evolver
uv run darwinian_evolver parrot \
  --num_iterations 2 \
  --num_parents_per_iteration 2 \
  --mutator_concurrency 2 --evaluator_concurrency 2 \
  --output_dir /tmp/parrot_demo
```

è¾“å‡ºï¼š
- `/tmp/parrot_demo/snapshots/iteration_N.pkl` â€”â€” æ¯æ¬¡è¿­ä»£çš„ pickle åºåˆ—åŒ–ç§ç¾¤
- `/tmp/parrot_demo/<jsonl>` â€”â€” æ¯æ¬¡è¿­ä»£çš„ JSON æ—¥å¿—ï¼ˆè·¯å¾„åœ¨ç»“æŸæ—¶æ‰“å°ï¼‰

åœ¨æµè§ˆå™¨ä¸­æ‰“å¼€ `~/.zed/cache/darwinian-evolver/darwinian_evolver/darwinian_evolver/lineage_visualizer.html`
å¹¶åŠ è½½ JSON æ—¥å¿—ï¼Œå³å¯æŸ¥çœ‹è¿›åŒ–æ ‘ã€‚

## å¿«é€Ÿå¼€å§‹ â€”â€” OpenRouter é©±åŠ¨ï¼ˆæ— éœ€ Anthropic Keyï¼‰

è¯¥ skill é™„å¸¦ `scripts/parrot_openrouter.py` â€”â€” åŒæ ·çš„ parrot é—®é¢˜ï¼Œä½† LLM è°ƒç”¨é€šè¿‡
OpenRouter è¿›è¡Œï¼Œå› æ­¤ä»»ä½•æä¾›å•†å‡å¯ä½¿ç”¨ã€‚

```bash
# From wherever the skill is installed:
SKILL_DIR=~/.zed/skills/research/darwinian-evolver
DE_DIR=~/.zed/cache/darwinian-evolver/darwinian_evolver

cd "$DE_DIR" && \
  EVOLVER_MODEL='openai/gpt-4o-mini' \
  uv run --with openai python "$SKILL_DIR/scripts/parrot_openrouter.py" \
    --num_iterations 3 --num_parents_per_iteration 2 \
    --output_dir /tmp/parrot_or
```

ä½¿ç”¨ `scripts/show_snapshot.py` æŸ¥çœ‹ç»“æžœï¼š

```bash
uv run --with openai python "$SKILL_DIR/scripts/show_snapshot.py" \
  /tmp/parrot_or/snapshots/iteration_3.pkl
```

é¢„æœŸè¾“å‡ºï¼š7 ä¸ªæŒ‰åˆ†æ•°æŽ’åçš„è¿›åŒ– prompt æ¨¡æ¿ï¼Œæœ€ä½³ç»“æžœçº¦åœ¨ 0.6â€“0.8 ä¹‹é—´ï¼ˆåˆå§‹ç§å­ `Say {{ phrase }}` å¾—åˆ†ä¸º 0.000ï¼‰ã€‚

## å®šä¹‰è‡ªå®šä¹‰é—®é¢˜

è¯¥ skill é™„å¸¦ `templates/custom_problem_template.py` â€”â€” å¤åˆ¶ã€ç¼–è¾‘ã€è¿è¡Œã€‚
ä½ å¿…é¡»å®šä¹‰ä¸‰æ ·ä¸œè¥¿ï¼š

1. **`Organism`** â€”â€” ä¸€ä¸ª Pydantic `BaseModel` å­ç±»ï¼ŒæŒæœ‰è¢«è¿›åŒ–çš„åˆ¶å“ï¼ˆ`prompt_template: str`ã€`regex_pattern: str`ã€`sql_query: str`ã€`code_block: str` ç­‰ï¼‰ã€‚æ·»åŠ ä¸€ä¸ª `run(*args)` æ–¹æ³•æ¥æ‰§è¡Œå®ƒã€‚

2. **`Evaluator`** â€”â€” `.evaluate(organism) -> EvaluationResult(score=..., trainable_failure_cases=[...], holdout_failure_cases=[...], is_viable=True)`ã€‚
   - **`score`** åœ¨ `[0, 1]` èŒƒå›´å†…ï¼Œè¶Šé«˜è¶Šå¥½ã€‚
   - **`trainable_failure_cases`** â€”â€” mutator æ‰€çœ‹åˆ°çš„å†…å®¹ã€‚åŒ…å«è¶³å¤Ÿçš„ä¸Šä¸‹æ–‡ï¼ˆè¾“å…¥ã€æœŸæœ›å€¼ã€å®žé™…å€¼ï¼‰ï¼Œä»¥ä¾¿ LLM è¿›è¡Œè¯Šæ–­ã€‚
   - **`holdout_failure_cases`** â€”â€” å¯¹ mutator éšè—ã€‚ç”¨äºŽæ£€æµ‹è¿‡æ‹Ÿåˆã€‚
   - **`is_viable=True`**ï¼Œé™¤éž organism å®Œå…¨æŸåï¼ˆæŠ›å‡ºå¼‚å¸¸ã€è¿”å›ž None ç­‰ï¼‰ã€‚å¾—åˆ†ä¸º 0 çš„å¯è¡Œ organism æ˜¯å¯ä»¥çš„ â€”â€” å®ƒåªæ˜¯åœ¨çˆ¶ä»£é€‰æ‹©ä¸­æƒé‡è¾ƒä½Žã€‚

3. **`Mutator`** â€”â€” `.mutate(organism, failure_cases, learning_log_entries) -> list[Organism]`ã€‚
   é€šå¸¸åšæ³•ï¼šæž„å»ºä¸€ä¸ªåŒ…å«å½“å‰ organism + å¤±è´¥æ¡ˆä¾‹ + ä¿®å¤è¯·æ±‚çš„ LLM promptï¼›è§£æž LLM çš„å“åº”ï¼›è¿”å›žä¸€ä¸ªæ–°çš„ `Organism`ã€‚è§£æžå¤±è´¥æ—¶è¿”å›ž `[]` â€”â€” å¾ªçŽ¯ä¼šå¤„ç†è¿™ç§æƒ…å†µã€‚

ç„¶åŽç¼–å†™ä¸€ä¸ªé©±åŠ¨è„šæœ¬ï¼Œå°† `Problem(initial_organism, evaluator, [mutators])` æŽ¥å…¥
`EvolveProblemLoop`ï¼Œå¹¶åœ¨ `loop.run(num_iterations=N)` ä¸Šè¿­ä»£ â€”â€” é™„å¸¦çš„
`scripts/parrot_openrouter.py` æ˜¯å‚è€ƒå®žçŽ°ã€‚

## å®žé™…å½±å“è¾ƒå¤§çš„è¶…å‚æ•°

| å‚æ•° | é»˜è®¤å€¼ | ä½•æ—¶è°ƒæ•´ |
|---|---|---|
| `--num_iterations` | 5 | ä¸€æ—¦ä¿¡ä»» evaluatorï¼Œè°ƒé«˜è‡³ 10â€“20 |
| `--num_parents_per_iteration` | 4 | é™è‡³ 2 ä»¥è¿›è¡Œä½Žæˆæœ¬æŽ¢ç´¢ |
| `--mutator_concurrency` | 10 | é™è‡³ 2â€“4 ä»¥é¿å…é€ŸçŽ‡é™åˆ¶ |
| `--evaluator_concurrency` | 10 | åŒä¸Šï¼›evaluator ä¹Ÿä¼šè°ƒç”¨ LLM |
| `--batch_size` | 1 | ä¸€æ—¦ mutator èƒ½å¤„ç†å¤šä¸ªå¤±è´¥æ¡ˆä¾‹ï¼Œè°ƒé«˜è‡³ 3â€“5 |
| `--verify_mutations` | å…³é—­ | ä¸€æ—¦ mutator æµªè´¹ä¸¥é‡æ—¶å¼€å¯ï¼ˆæ® Imbueï¼ŒåŽç»­è¿è¡Œå¯èŠ‚çœ >10Ã— æˆæœ¬ï¼‰ |
| `--midpoint_score` | `p75` | é™¤éžåˆ†æ•°èšé›†ï¼Œå¦åˆ™ä¿æŒä¸å˜ |
| `--sharpness` | 10 | ä¿æŒä¸å˜ |

## å¸¸è§é™·é˜±

1. **`Initial organism must be viable`** â€”â€” å³ä½¿ç§å­å¾—åˆ†ä¸º 0ï¼Œä¹Ÿè¦åœ¨ `EvaluationResult` ä¸­è®¾ç½® `is_viable=True`ã€‚å¾ªçŽ¯æ‹’ç»ä¸å¯è¡Œçš„ organismï¼Œå› ä¸ºè¿™æ„å‘³ç€å¾ªçŽ¯æ²¡æœ‰ä»»ä½•å¯è¿›åŒ–çš„èµ·ç‚¹ã€‚
2. **æä¾›å•†å†…å®¹è¿‡æ»¤ä¼šä¸­æ–­è¿è¡Œã€‚** åŸºäºŽ Azure çš„ OpenRouter æ¨¡åž‹ä¼šä»¥ HTTP 400 æ‹’ç»"ignore previous instructions"ç­‰çŸ­è¯­ã€‚å°† LLM è°ƒç”¨åŒ…è£¹åœ¨ `try/except` ä¸­ï¼Œå¹¶è¿”å›ž `f"<LLM_ERROR: {e}>"` â€”â€” evolver ä¼šå°†è¯¥ organism è¯„åˆ†ä¸º 0 å¹¶ç»§ç»­ã€‚
3. **`loop.run()` æ˜¯ä¸€ä¸ªç”Ÿæˆå™¨** â€”â€” è°ƒç”¨å®ƒä¸ä¼šæ‰§è¡Œä»»ä½•æ“ä½œï¼Œç›´åˆ°ä½ å¯¹å…¶è¿­ä»£ã€‚ä½¿ç”¨ `for snap in loop.run(num_iterations=N):`ã€‚
4. **å¿«ç…§æ˜¯åµŒå¥— pickleã€‚** `iteration_N.pkl` åŒ…å«ä¸€ä¸ªå¸¦æœ‰ `population_snapshot`ï¼ˆæ›´å¤š pickle å­—èŠ‚ï¼‰çš„å­—å…¸ã€‚è¦ååºåˆ—åŒ–ï¼Œå¿…é¡»è®© `Organism` ç±»åœ¨ä¸Ž pickle æ—¶ç›¸åŒçš„ç‚¹åˆ†è·¯å¾„ä¸‹å¯å¯¼å…¥ã€‚
5. **å¹¶å‘é»˜è®¤å€¼è¾ƒæ¿€è¿›ã€‚** 10/10 ä¼šåœ¨å¤§å¤šæ•°æä¾›å•†ä¸Šè§¦å‘é€ŸçŽ‡é™åˆ¶ã€‚ä»Ž 2/2 å¼€å§‹ã€‚
6. **CLI ç¡¬ç¼–ç ä¸º Anthropicã€‚** `uv run darwinian_evolver <problem>` ä¼šæŸ¥æ‰¾ `ANTHROPIC_API_KEY` å¹¶ä½¿ç”¨ Claude Sonnetã€‚è¦ä½¿ç”¨å…¶ä»–æä¾›å•†ï¼Œè¯·ç¼–å†™ç±»ä¼¼ `parrot_openrouter.py` çš„é©±åŠ¨è„šæœ¬ã€‚
7. **AGPL åè®®ã€‚** æ°¸è¿œä¸è¦åœ¨ Zed æ ¸å¿ƒä¸­ä½¿ç”¨ `from darwinian_evolver import ...`ã€‚`~/.zed/skills/...` ä¸‹çš„è‡ªå®šä¹‰é©±åŠ¨è„šæœ¬å±žäºŽç”¨æˆ·ä¾§ï¼Œæ²¡æœ‰é—®é¢˜ã€‚
8. **æ²¡æœ‰ PyPI åŒ…ã€‚** `pip install darwinian-evolver` ä¼šå®‰è£…é”™è¯¯çš„ä¸œè¥¿ã€‚å§‹ç»ˆä»Ž GitHub ä»“åº“å®‰è£…ã€‚

## éªŒè¯

å®‰è£…å®Œæˆå¹¶è¿è¡Œä¸€æ¬¡ parrot åŽï¼Œä»¥ä¸‹å‘½ä»¤é€€å‡ºç ä¸º 0 å³è¡¨ç¤ºéªŒè¯é€šè¿‡ï¼š

```bash
DE_DIR=~/.zed/cache/darwinian-evolver/darwinian_evolver
ls "$DE_DIR/darwinian_evolver/lineage_visualizer.html" >/dev/null && \
cd "$DE_DIR" && uv run darwinian_evolver --help >/dev/null && \
echo "darwinian-evolver: OK"
```

## å‚è€ƒèµ„æ–™

- [Imbue ç ”ç©¶æ–‡ç« ](https://imbue.com/research/2026-02-27-darwinian-evolver/)
- [ARC-AGI-2 ç»“æžœ](https://imbue.com/research/2026-02-27-arc-agi-2-evolution/)
- [imbue-ai/darwinian_evolver](https://github.com/imbue-ai/darwinian_evolver)ï¼ˆAGPL-3.0ï¼‰
- [Darwin GÃ¶del Machines](https://arxiv.org/abs/2505.22954)
- [PromptBreeder](https://arxiv.org/abs/2309.16797)
