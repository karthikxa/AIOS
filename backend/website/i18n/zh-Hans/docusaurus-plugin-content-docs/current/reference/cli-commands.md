---
sidebar_position: 1
title: "CLI å‘½ä»¤å‚è€ƒ"
description: "Zed ç»ˆç«¯å‘½ä»¤åŠå‘½ä»¤æ—çš„æƒå¨å‚è€ƒ"
---

# CLI å‘½ä»¤å‚è€ƒ

æœ¬é¡µä»‹ç»ä»Ž shell è¿è¡Œçš„**ç»ˆç«¯å‘½ä»¤**ã€‚

å…³äºŽèŠå¤©å†…æ–œæ å‘½ä»¤ï¼Œè¯·å‚é˜… [æ–œæ å‘½ä»¤å‚è€ƒ](./slash-commands.md)ã€‚

## å…¨å±€å…¥å£

```bash
zed [global-options] <command> [subcommand/options]
```

### å…¨å±€é€‰é¡¹

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--version`, `-V` | æ˜¾ç¤ºç‰ˆæœ¬å¹¶é€€å‡ºã€‚ |
| `--profile <name>`, `-p <name>` | é€‰æ‹©æœ¬æ¬¡è°ƒç”¨ä½¿ç”¨çš„ Zed profileï¼ˆé…ç½®æ–‡ä»¶ï¼‰ã€‚è¦†ç›– `zed profile use` è®¾ç½®çš„ç²˜æ€§é»˜è®¤å€¼ã€‚ |
| `--resume <session>`, `-r <session>` | é€šè¿‡ ID æˆ–æ ‡é¢˜æ¢å¤ä¹‹å‰çš„ä¼šè¯ã€‚ |
| `--continue [name]`, `-c [name]` | æ¢å¤æœ€è¿‘çš„ä¼šè¯ï¼Œæˆ–æ¢å¤æœ€è¿‘ä¸€ä¸ªåŒ¹é…æ ‡é¢˜çš„ä¼šè¯ã€‚ |
| `--worktree`, `-w` | åœ¨éš”ç¦»çš„ git worktree ä¸­å¯åŠ¨ï¼Œç”¨äºŽå¹¶è¡Œ agent å·¥ä½œæµã€‚ |
| `--yolo` | è·³è¿‡å±é™©å‘½ä»¤çš„å®¡æ‰¹æç¤ºã€‚ |
| `--pass-session-id` | åœ¨ agent çš„ system promptï¼ˆç³»ç»Ÿæç¤ºè¯ï¼‰ä¸­åŒ…å«ä¼šè¯ IDã€‚ |
| `--ignore-user-config` | å¿½ç•¥ `~/.zed/config.yaml`ï¼Œå›žé€€åˆ°å†…ç½®é»˜è®¤å€¼ã€‚`.env` ä¸­çš„å‡­æ®ä»ä¼šåŠ è½½ã€‚ |
| `--ignore-rules` | è·³è¿‡ `AGENTS.md`ã€`SOUL.md`ã€`.cursorrules`ã€memoryï¼ˆè®°å¿†ï¼‰å’Œé¢„åŠ è½½ skill çš„è‡ªåŠ¨æ³¨å…¥ã€‚ |
| `--tui` | å¯åŠ¨ [TUI](../user-guide/tui.md) è€Œéžç»å…¸ CLIã€‚ç­‰åŒäºŽ `ZED_TUI=1`ã€‚ |
| `--dev` | ä¸Ž `--tui` é…åˆä½¿ç”¨ï¼šé€šè¿‡ `tsx` ç›´æŽ¥è¿è¡Œ TypeScript æºç è€Œéžé¢„æž„å»ºåŒ…ï¼ˆä¾› TUI è´¡çŒ®è€…ä½¿ç”¨ï¼‰ã€‚ |

## é¡¶çº§å‘½ä»¤

| å‘½ä»¤ | ç”¨é€” |
|---------|---------|
| `zed chat` | ä¸Ž agent è¿›è¡Œäº¤äº’å¼æˆ–å•æ¬¡èŠå¤©ã€‚ |
| `zed model` | äº¤äº’å¼é€‰æ‹©é»˜è®¤ provider å’Œæ¨¡åž‹ã€‚ |
| `zed fallback` | ç®¡ç†ä¸»æ¨¡åž‹å‡ºé”™æ—¶ä¾æ¬¡å°è¯•çš„ fallback providerã€‚ |
| `zed gateway` | è¿è¡Œæˆ–ç®¡ç†æ¶ˆæ¯ gateway æœåŠ¡ã€‚ |
| `zed proxy` | æœ¬åœ° OpenAI å…¼å®¹ä»£ç†ï¼Œé™„åŠ  OAuth provider å‡­æ®ã€‚å‚è§ [è®¢é˜…ä»£ç†](../user-guide/features/subscription-proxy.md)ã€‚ |
| `zed lsp` | ç®¡ç† Language Server Protocol é›†æˆï¼ˆä¸º write_file/patch æä¾›è¯­ä¹‰è¯Šæ–­ï¼‰ã€‚ |
| `zed setup` | å…¨éƒ¨æˆ–éƒ¨åˆ†é…ç½®çš„äº¤äº’å¼è®¾ç½®å‘å¯¼ã€‚ |
| `zed whatsapp` | é…ç½®å¹¶é…å¯¹ WhatsApp æ¡¥æŽ¥ã€‚ |
| `zed slack` | Slack è¾…åŠ©å·¥å…·ï¼ˆå½“å‰åŠŸèƒ½ï¼šç”Ÿæˆå°†æ¯æ¡å‘½ä»¤æ³¨å†Œä¸ºåŽŸç”Ÿæ–œæ å‘½ä»¤çš„ app manifestï¼‰ã€‚ |
| `zed auth` | ç®¡ç†å‡­æ®â€”â€”æ·»åŠ ã€åˆ—å‡ºã€åˆ é™¤ã€é‡ç½®ã€è®¾ç½®ç­–ç•¥ã€‚å¤„ç† Codex/Nous/Anthropic çš„ OAuth æµç¨‹ã€‚ |
| `zed login` / `logout` | **å·²å¼ƒç”¨** â€” è¯·æ”¹ç”¨ `zed auth`ã€‚ |
| `zed status` | æ˜¾ç¤º agentã€auth å’Œå¹³å°çŠ¶æ€ã€‚ |
| `zed cron` | æ£€æŸ¥å¹¶è§¦å‘ cron è°ƒåº¦å™¨ã€‚ |
| `zed kanban` | å¤š profile åä½œçœ‹æ¿ï¼ˆä»»åŠ¡ã€é“¾æŽ¥ã€è°ƒåº¦å™¨ï¼‰ã€‚ |
| `zed webhook` | ç®¡ç†ç”¨äºŽäº‹ä»¶é©±åŠ¨æ¿€æ´»çš„åŠ¨æ€ webhook è®¢é˜…ã€‚ |
| `zed hooks` | æ£€æŸ¥ã€å®¡æ‰¹æˆ–åˆ é™¤ `config.yaml` ä¸­å£°æ˜Žçš„ shell è„šæœ¬ hookã€‚ |
| `zed doctor` | è¯Šæ–­é…ç½®å’Œä¾èµ–é—®é¢˜ã€‚ |
| `zed security audit` | å¯¹ venvã€plugin ä¾èµ–å’Œå›ºå®š MCP æœåŠ¡å™¨è¿›è¡ŒæŒ‰éœ€ä¾›åº”é“¾å®¡è®¡ï¼ˆOSV.devï¼‰ã€‚ |
| `zed dump` | å¯ç›´æŽ¥å¤åˆ¶ç²˜è´´çš„è®¾ç½®æ‘˜è¦ï¼Œç”¨äºŽæ”¯æŒ/è°ƒè¯•ã€‚ |
| `zed debug` | è°ƒè¯•å·¥å…·â€”â€”ä¸Šä¼ æ—¥å¿—å’Œç³»ç»Ÿä¿¡æ¯ä»¥èŽ·å–æ”¯æŒã€‚ |
| `zed backup` | å°† Zed ä¸»ç›®å½•å¤‡ä»½ä¸º zip æ–‡ä»¶ã€‚ |
| `zed checkpoints` | æ£€æŸ¥/ä¿®å‰ª/æ¸…é™¤ `~/.zed/checkpoints/`ï¼ˆ`/rollback` ä½¿ç”¨çš„å½±å­å­˜å‚¨ï¼‰ã€‚ä¸å¸¦å‚æ•°è¿è¡Œå¯æŸ¥çœ‹çŠ¶æ€æ¦‚è§ˆã€‚ |
| `zed import` | ä»Ž zip æ–‡ä»¶æ¢å¤ Zed å¤‡ä»½ã€‚ |
| `zed logs` | æŸ¥çœ‹ã€è·Ÿè¸ªå’Œè¿‡æ»¤ agent/gateway/é”™è¯¯æ—¥å¿—æ–‡ä»¶ã€‚ |
| `zed config` | æ˜¾ç¤ºã€ç¼–è¾‘ã€è¿ç§»å’ŒæŸ¥è¯¢é…ç½®æ–‡ä»¶ã€‚ |
| `zed pairing` | å®¡æ‰¹æˆ–æ’¤é”€æ¶ˆæ¯é…å¯¹ç ã€‚ |
| `zed skills` | æµè§ˆã€å®‰è£…ã€å‘å¸ƒã€å®¡è®¡å’Œé…ç½® skillã€‚ |
| `zed bundles` | å°†å¤šä¸ª skill å½’ç»„åˆ°å•ä¸ª `/<name>` æ–œæ å‘½ä»¤ä¸‹ã€‚å‚è§ [Skill Bundles](../user-guide/features/skills.md#skill-bundles)ã€‚ |
| `zed curator` | åŽå° skill ç»´æŠ¤â€”â€”çŠ¶æ€ã€è¿è¡Œã€æš‚åœã€å›ºå®šã€‚å‚è§ [Curator](../user-guide/features/curator.md)ã€‚ |
| `zed memory` | é…ç½®å¤–éƒ¨ memory providerã€‚å½“å¯¹åº” provider æ¿€æ´»æ—¶ï¼Œç‰¹å®šäºŽ plugin çš„å­å‘½ä»¤ï¼ˆå¦‚ `zed honcho`ï¼‰ä¼šè‡ªåŠ¨æ³¨å†Œã€‚ |
| `zed acp` | å°† Zed ä½œä¸º ACP æœåŠ¡å™¨è¿è¡Œï¼Œç”¨äºŽç¼–è¾‘å™¨é›†æˆã€‚ |
| `zed mcp` | ç®¡ç† MCP æœåŠ¡å™¨é…ç½®ï¼Œå¹¶å°† Zed ä½œä¸º MCP æœåŠ¡å™¨è¿è¡Œã€‚ |
| `zed plugins` | ç®¡ç† Zed Agent pluginï¼ˆå®‰è£…ã€å¯ç”¨ã€ç¦ç”¨ã€åˆ é™¤ï¼‰ã€‚ |
| `zed portal` | Nous Portal çŠ¶æ€ã€è®¢é˜…é“¾æŽ¥å’Œ Tool Gateway è·¯ç”±ã€‚å‚è§ [Tool Gateway](../user-guide/features/tool-gateway.md)ã€‚ |
| `zed tools` | æŒ‰å¹³å°é…ç½®å·²å¯ç”¨çš„å·¥å…·ã€‚ |
| `zed computer-use` | å®‰è£…æˆ–æ£€æŸ¥ cua-driver åŽç«¯ï¼ˆmacOS Computer Useï¼‰ã€‚ |
| `zed sessions` | æµè§ˆã€å¯¼å‡ºã€ä¿®å‰ªã€é‡å‘½åå’Œåˆ é™¤ä¼šè¯ã€‚ |
| `zed insights` | æ˜¾ç¤º token/è´¹ç”¨/æ´»åŠ¨åˆ†æžã€‚ |
| `zed claw` | OpenClaw è¿ç§»è¾…åŠ©å·¥å…·ã€‚ |
| `zed dashboard` | å¯åŠ¨ç”¨äºŽç®¡ç†é…ç½®ã€API å¯†é’¥å’Œä¼šè¯çš„ Web æŽ§åˆ¶å°ã€‚ |
| `zed profile` | ç®¡ç† profileâ€”â€”å¤šä¸ªéš”ç¦»çš„ Zed å®žä¾‹ã€‚ |
| `zed completion` | æ‰“å° shell è¡¥å…¨è„šæœ¬ï¼ˆbash/zsh/fishï¼‰ã€‚ |
| `zed version` | æ˜¾ç¤ºç‰ˆæœ¬ä¿¡æ¯ã€‚ |
| `zed update` | æ‹‰å–æœ€æ–°ä»£ç å¹¶é‡æ–°å®‰è£…ä¾èµ–ï¼ˆgit å®‰è£…ï¼‰ï¼Œæˆ–æ£€æŸ¥ PyPI å¹¶æ‰§è¡Œ `pip install --upgrade`ï¼ˆpip å®‰è£…ï¼‰ã€‚`--check` é¢„è§ˆè€Œä¸å®‰è£…ï¼›`--backup` åœ¨æ‹‰å–å‰å¯¹ `ZED_HOME` è¿›è¡Œå¿«ç…§ã€‚ |
| `zed uninstall` | ä»Žç³»ç»Ÿä¸­åˆ é™¤ Zedã€‚ |

## `zed chat`

```bash
zed chat [options]
```

å¸¸ç”¨é€‰é¡¹ï¼š

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `-q`, `--query "..."` | å•æ¬¡éžäº¤äº’å¼ promptã€‚ |
| `-m`, `--model <model>` | è¦†ç›–æœ¬æ¬¡è¿è¡Œçš„æ¨¡åž‹ã€‚ |
| `-t`, `--toolsets <csv>` | å¯ç”¨é€—å·åˆ†éš”çš„ toolset é›†åˆã€‚ |
| `--provider <provider>` | å¼ºåˆ¶æŒ‡å®š providerï¼š`auto`ã€`openrouter`ã€`nous`ã€`openai-codex`ã€`copilot-acp`ã€`copilot`ã€`anthropic`ã€`gemini`ã€`google-gemini-cli`ã€`huggingface`ã€`novita`ï¼ˆåˆ«å `novita-ai`ã€`novitaai`ï¼‰ã€`openai-api`ã€`zai`ã€`kimi-coding`ã€`kimi-coding-cn`ã€`minimax`ã€`minimax-cn`ã€`minimax-oauth`ã€`kilocode`ã€`xiaomi`ã€`arcee`ã€`gmi`ã€`alibaba`ã€`alibaba-coding-plan`ï¼ˆåˆ«å `alibaba_coding`ï¼‰ã€`deepseek`ã€`nvidia`ã€`ollama-cloud`ã€`xai`ï¼ˆåˆ«å `grok`ï¼‰ã€`xai-oauth`ï¼ˆåˆ«å `grok-oauth`ï¼‰ã€`qwen-oauth`ã€`bedrock`ã€`opencode-zen`ã€`opencode-go`ã€`azure-foundry`ã€`lmstudio`ã€`stepfun`ã€`tencent-tokenhub`ï¼ˆåˆ«å `tencent`ã€`tokenhub`ï¼‰ã€‚ |
| `-s`, `--skills <name>` | ä¸ºä¼šè¯é¢„åŠ è½½ä¸€ä¸ªæˆ–å¤šä¸ª skillï¼ˆå¯é‡å¤æˆ–é€—å·åˆ†éš”ï¼‰ã€‚ |
| `-v`, `--verbose` | è¯¦ç»†è¾“å‡ºã€‚ |
| `-Q`, `--quiet` | ç¨‹åºåŒ–æ¨¡å¼ï¼šæŠ‘åˆ¶æ¨ªå¹…/spinner/å·¥å…·é¢„è§ˆã€‚ |
| `--image <path>` | ä¸ºå•æ¬¡æŸ¥è¯¢é™„åŠ æœ¬åœ°å›¾ç‰‡ã€‚ |
| `--resume <session>` / `--continue [name]` | ç›´æŽ¥ä»Ž `chat` æ¢å¤ä¼šè¯ã€‚ |
| `--worktree` | ä¸ºæœ¬æ¬¡è¿è¡Œåˆ›å»ºéš”ç¦»çš„ git worktreeã€‚ |
| `--checkpoints` | åœ¨ç ´åæ€§æ–‡ä»¶å˜æ›´å‰å¯ç”¨æ–‡ä»¶ç³»ç»Ÿ checkpointã€‚ |
| `--yolo` | è·³è¿‡å®¡æ‰¹æç¤ºã€‚ |
| `--pass-session-id` | å°†ä¼šè¯ ID ä¼ å…¥ system promptã€‚ |
| `--ignore-user-config` | å¿½ç•¥ `~/.zed/config.yaml`ï¼Œä½¿ç”¨å†…ç½®é»˜è®¤å€¼ã€‚`.env` ä¸­çš„å‡­æ®ä»ä¼šåŠ è½½ã€‚é€‚ç”¨äºŽéš”ç¦»çš„ CI è¿è¡Œã€å¯å¤çŽ°çš„ bug æŠ¥å‘Šå’Œç¬¬ä¸‰æ–¹é›†æˆã€‚ |
| `--ignore-rules` | è·³è¿‡ `AGENTS.md`ã€`SOUL.md`ã€`.cursorrules`ã€æŒä¹… memory å’Œé¢„åŠ è½½ skill çš„è‡ªåŠ¨æ³¨å…¥ã€‚ä¸Ž `--ignore-user-config` ç»„åˆå¯å®žçŽ°å®Œå…¨éš”ç¦»çš„è¿è¡Œã€‚ |
| `--source <tag>` | ç”¨äºŽè¿‡æ»¤çš„ä¼šè¯æ¥æºæ ‡ç­¾ï¼ˆé»˜è®¤ï¼š`cli`ï¼‰ã€‚å¯¹äºŽä¸åº”å‡ºçŽ°åœ¨ç”¨æˆ·ä¼šè¯åˆ—è¡¨ä¸­çš„ç¬¬ä¸‰æ–¹é›†æˆï¼Œä½¿ç”¨ `tool`ã€‚ |
| `--max-turns <N>` | æ¯ä¸ªå¯¹è¯è½®æ¬¡çš„æœ€å¤§å·¥å…·è°ƒç”¨è¿­ä»£æ¬¡æ•°ï¼ˆé»˜è®¤ï¼š90ï¼Œæˆ– config ä¸­çš„ `agent.max_turns`ï¼‰ã€‚ |

ç¤ºä¾‹ï¼š

```bash
zed
zed chat -q "Summarize the latest PRs"
zed chat --provider openrouter --model anthropic/claude-sonnet-4.6
zed chat --toolsets web,terminal,skills
zed chat --quiet -q "Return only JSON"
zed chat --worktree -q "Review this repo and open a PR"
zed chat --ignore-user-config --ignore-rules -q "Repro without my personal setup"
```

### `zed -z <prompt>` â€” è„šæœ¬åŒ–å•æ¬¡è°ƒç”¨

å¯¹äºŽç¨‹åºåŒ–è°ƒç”¨æ–¹ï¼ˆshell è„šæœ¬ã€CIã€cronã€é€šè¿‡ç®¡é“ä¼ å…¥ prompt çš„çˆ¶è¿›ç¨‹ï¼‰ï¼Œ`zed -z` æ˜¯æœ€çº¯ç²¹çš„å•æ¬¡å…¥å£ï¼š**å•ä¸ª prompt è¾“å…¥ï¼Œæœ€ç»ˆå“åº”æ–‡æœ¬è¾“å‡ºï¼Œstdout å’Œ stderr ä¸Šä¸è¾“å‡ºä»»ä½•å…¶ä»–å†…å®¹ã€‚** æ— æ¨ªå¹…ã€æ—  spinnerã€æ— å·¥å…·é¢„è§ˆã€æ—  `Session:` è¡Œâ€”â€”åªæœ‰ agent çš„æœ€ç»ˆå›žå¤çº¯æ–‡æœ¬ã€‚

```bash
zed -z "What's the capital of France?"
# â†’ Paris.

# çˆ¶è„šæœ¬å¯ä»¥å¹²å‡€åœ°æ•èŽ·å“åº”ï¼š
answer=$(zed -z "summarize this" < /path/to/file.txt)
```

å•æ¬¡è¿è¡Œè¦†ç›–ï¼ˆä¸ä¿®æ”¹ `~/.zed/config.yaml`ï¼‰ï¼š

| æ ‡å¿— | ç­‰æ•ˆçŽ¯å¢ƒå˜é‡ | ç”¨é€” |
|---|---|---|
| `-m` / `--model <model>` | `ZED_INFERENCE_MODEL` | è¦†ç›–æœ¬æ¬¡è¿è¡Œçš„æ¨¡åž‹ |
| `--provider <provider>` | _(æ— )_ | è¦†ç›–æœ¬æ¬¡è¿è¡Œçš„ provider |

```bash
zed -z "â€¦" --provider openrouter --model openai/gpt-5.5
# æˆ–ï¼š
ZED_INFERENCE_MODEL=anthropic/claude-sonnet-4.6 zed -z "â€¦"
```

ç›¸åŒçš„ agentã€ç›¸åŒçš„å·¥å…·ã€ç›¸åŒçš„ skillâ€”â€”åªæ˜¯å‰¥ç¦»äº†æ‰€æœ‰äº¤äº’å¼/è£…é¥°æ€§å±‚ã€‚å¦‚æžœä½ è¿˜éœ€è¦åœ¨è®°å½•ä¸­åŒ…å«å·¥å…·è¾“å‡ºï¼Œè¯·æ”¹ç”¨ `zed chat -q`ï¼›`-z` ä¸“é—¨ç”¨äºŽ"æˆ‘åªéœ€è¦æœ€ç»ˆç­”æ¡ˆ"çš„åœºæ™¯ã€‚

## `zed model`

äº¤äº’å¼ provider + æ¨¡åž‹é€‰æ‹©å™¨ã€‚**è¿™æ˜¯æ·»åŠ æ–° providerã€è®¾ç½® API å¯†é’¥å’Œè¿è¡Œ OAuth æµç¨‹çš„å‘½ä»¤ã€‚** ä»Žç»ˆç«¯è¿è¡Œâ€”â€”ä¸è¦åœ¨æ´»è·ƒçš„ Zed èŠå¤©ä¼šè¯å†…éƒ¨è¿è¡Œã€‚

```bash
zed model
```

åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨æ­¤å‘½ä»¤ï¼š
- **æ·»åŠ æ–° provider**ï¼ˆOpenRouterã€Anthropicã€Copilotã€DeepSeekã€è‡ªå®šä¹‰ç­‰ï¼‰
- ç™»å½•åŸºäºŽ OAuth çš„ providerï¼ˆAnthropicã€Copilotã€Codexã€Nous Portalï¼‰
- è¾“å…¥æˆ–æ›´æ–° API å¯†é’¥
- ä»Ž provider ç‰¹å®šçš„æ¨¡åž‹åˆ—è¡¨ä¸­é€‰æ‹©
- é…ç½®è‡ªå®šä¹‰/è‡ªæ‰˜ç®¡ç«¯ç‚¹
- å°†æ–°é»˜è®¤å€¼ä¿å­˜åˆ° config

:::warning zed model ä¸Ž /modelâ€”â€”äº†è§£åŒºåˆ«
**`zed model`**ï¼ˆä»Žç»ˆç«¯è¿è¡Œï¼Œåœ¨ä»»ä½• Zed ä¼šè¯å¤–éƒ¨ï¼‰æ˜¯**å®Œæ•´çš„ provider è®¾ç½®å‘å¯¼**ã€‚å®ƒå¯ä»¥æ·»åŠ æ–° providerã€è¿è¡Œ OAuth æµç¨‹ã€æç¤ºè¾“å…¥ API å¯†é’¥å¹¶é…ç½®ç«¯ç‚¹ã€‚

**`/model`**ï¼ˆåœ¨æ´»è·ƒçš„ Zed èŠå¤©ä¼šè¯ä¸­è¾“å…¥ï¼‰åªèƒ½**åœ¨å·²è®¾ç½®å¥½çš„ provider å’Œæ¨¡åž‹ä¹‹é—´åˆ‡æ¢**ã€‚å®ƒæ— æ³•æ·»åŠ æ–° providerã€è¿è¡Œ OAuth æˆ–æç¤ºè¾“å…¥ API å¯†é’¥ã€‚

**å¦‚æžœéœ€è¦æ·»åŠ æ–° providerï¼š** å…ˆé€€å‡º Zed ä¼šè¯ï¼ˆ`Ctrl+C` æˆ– `/quit`ï¼‰ï¼Œç„¶åŽä»Žç»ˆç«¯æç¤ºç¬¦è¿è¡Œ `zed model`ã€‚
:::

### `/model` æ–œæ å‘½ä»¤ï¼ˆä¼šè¯ä¸­é€”ï¼‰

æ— éœ€ç¦»å¼€ä¼šè¯å³å¯åœ¨å·²é…ç½®çš„æ¨¡åž‹ä¹‹é—´åˆ‡æ¢ï¼š

```
/model                              # æ˜¾ç¤ºå½“å‰æ¨¡åž‹å’Œå¯ç”¨é€‰é¡¹
/model claude-sonnet-4              # åˆ‡æ¢æ¨¡åž‹ï¼ˆè‡ªåŠ¨æ£€æµ‹ providerï¼‰
/model zai:glm-5                    # åˆ‡æ¢ provider å’Œæ¨¡åž‹
/model custom:qwen-2.5              # åœ¨è‡ªå®šä¹‰ç«¯ç‚¹ä¸Šä½¿ç”¨æ¨¡åž‹
/model custom                       # ä»Žè‡ªå®šä¹‰ç«¯ç‚¹è‡ªåŠ¨æ£€æµ‹æ¨¡åž‹
/model custom:local:qwen-2.5        # ä½¿ç”¨å‘½åçš„è‡ªå®šä¹‰ provider
/model openrouter:anthropic/claude-sonnet-4  # åˆ‡æ¢å›žäº‘ç«¯
```

é»˜è®¤æƒ…å†µä¸‹ï¼Œ`/model` çš„æ›´æ”¹**ä»…å¯¹å½“å‰ä¼šè¯ç”Ÿæ•ˆ**ã€‚æ·»åŠ  `--global` å¯å°†æ›´æ”¹æŒä¹…åŒ–åˆ° `config.yaml`ï¼š

```
/model claude-sonnet-4 --global     # åˆ‡æ¢å¹¶ä¿å­˜ä¸ºæ–°é»˜è®¤å€¼
```

:::info å¦‚æžœæˆ‘åªçœ‹åˆ° OpenRouter æ¨¡åž‹æ€Žä¹ˆåŠžï¼Ÿ
å¦‚æžœä½ åªé…ç½®äº† OpenRouterï¼Œ`/model` å°†åªæ˜¾ç¤º OpenRouter æ¨¡åž‹ã€‚è¦æ·»åŠ å…¶ä»– providerï¼ˆAnthropicã€DeepSeekã€Copilot ç­‰ï¼‰ï¼Œè¯·é€€å‡ºä¼šè¯å¹¶ä»Žç»ˆç«¯è¿è¡Œ `zed model`ã€‚
:::

Provider å’Œ base URL çš„æ›´æ”¹ä¼šè‡ªåŠ¨æŒä¹…åŒ–åˆ° `config.yaml`ã€‚ä»Žè‡ªå®šä¹‰ç«¯ç‚¹åˆ‡æ¢èµ°æ—¶ï¼Œè¿‡æ—¶çš„ base URL ä¼šè¢«æ¸…é™¤ï¼Œä»¥é˜²æ­¢å…¶æ³„æ¼åˆ°å…¶ä»– providerã€‚

## `zed gateway`

```bash
zed gateway <subcommand>
```

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `run` | åœ¨å‰å°è¿è¡Œ gatewayã€‚æŽ¨èç”¨äºŽ WSLã€Docker å’Œ Termuxã€‚ |
| `start` | å¯åŠ¨å·²å®‰è£…çš„ systemd/launchd åŽå°æœåŠ¡ã€‚ |
| `stop` | åœæ­¢æœåŠ¡ï¼ˆæˆ–å‰å°è¿›ç¨‹ï¼‰ã€‚ |
| `restart` | é‡å¯æœåŠ¡ã€‚ |
| `status` | æ˜¾ç¤ºæœåŠ¡çŠ¶æ€ã€‚ |
| `list` | åˆ—å‡º**æ‰€æœ‰ profile** åŠæ¯ä¸ª profile çš„ gateway å½“å‰æ˜¯å¦è¿è¡Œï¼ˆæœ‰ PID æ—¶æ˜¾ç¤ºï¼‰ã€‚å½“ä½ å¹¶è¡Œè¿è¡Œå¤šä¸ª profile å¹¶éœ€è¦å•ä¸€æ¦‚è§ˆæ—¶å¾ˆæ–¹ä¾¿ã€‚ |
| `install` | å®‰è£…ä¸º systemdï¼ˆLinuxï¼‰æˆ– launchdï¼ˆmacOSï¼‰åŽå°æœåŠ¡ã€‚ |
| `uninstall` | åˆ é™¤å·²å®‰è£…çš„æœåŠ¡ã€‚ |
| `setup` | äº¤äº’å¼æ¶ˆæ¯å¹³å°è®¾ç½®ã€‚ |

é€‰é¡¹ï¼š

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--all` | åœ¨ `start` / `restart` / `stop` æ—¶ï¼šå¯¹**æ¯ä¸ª profile** çš„ gateway æ‰§è¡Œæ“ä½œï¼Œè€Œä¸ä»…é™äºŽæ´»è·ƒçš„ `ZED_HOME`ã€‚å½“ä½ å¹¶è¡Œè¿è¡Œå¤šä¸ª profile å¹¶å¸Œæœ›åœ¨ `zed update` åŽå…¨éƒ¨é‡å¯æ—¶å¾ˆæœ‰ç”¨ã€‚ |
| `--no-supervise` | åœ¨ `run` æ—¶ï¼šåœ¨ s6-overlay Docker é•œåƒå†…éƒ¨ï¼Œè·³è¿‡ s6 è‡ªåŠ¨ç›‘ç®¡ï¼Œé€€å›žåˆ° pre-s6 å‰å°è¯­ä¹‰â€”â€”gateway ä½œä¸ºå®¹å™¨ä¸»è¿›ç¨‹è¿è¡Œï¼Œæ— è‡ªåŠ¨é‡å¯ã€‚åœ¨ s6 é•œåƒä¹‹å¤–ä¸ºç©ºæ“ä½œã€‚ç­‰åŒäºŽè®¾ç½® `ZED_GATEWAY_NO_SUPERVISE=1`ã€‚ |

:::tip WSL ç”¨æˆ·
ä½¿ç”¨ `zed gateway run` è€Œéž `zed gateway start`â€”â€”WSL çš„ systemd æ”¯æŒä¸ç¨³å®šã€‚ç”¨ tmux åŒ…è£¹ä»¥ä¿æŒæŒä¹…è¿è¡Œï¼š`tmux new -s zed 'zed gateway run'`ã€‚è¯¦è§ [WSL FAQ](/reference/faq#wsl-gateway-keeps-disconnecting-or-zed-gateway-start-fails)ã€‚
:::

## `zed lsp`

```bash
zed lsp <subcommand>
```

ç®¡ç† Language Server Protocol é›†æˆã€‚LSP åœ¨åŽå°è¿è¡ŒçœŸå®žçš„è¯­è¨€æœåŠ¡å™¨ï¼ˆpyrightã€goplsã€rust-analyzer ç­‰ï¼‰ï¼Œå¹¶å°†å…¶è¯Šæ–­ä¿¡æ¯è¾“å…¥ `write_file` å’Œ `patch` ä½¿ç”¨çš„å†™åŽæ£€æŸ¥ã€‚å— git å·¥ä½œåŒºæ£€æµ‹é™åˆ¶â€”â€”ä»…å½“ cwd æˆ–ç¼–è¾‘çš„æ–‡ä»¶ä½äºŽ git worktree å†…æ—¶ï¼ŒLSP æ‰ä¼šè¿è¡Œã€‚

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `status` | æ˜¾ç¤ºæœåŠ¡çŠ¶æ€ã€å·²é…ç½®çš„æœåŠ¡å™¨ã€å®‰è£…çŠ¶æ€ã€‚ |
| `list` | æ‰“å°æ”¯æŒçš„æœåŠ¡å™¨æ³¨å†Œè¡¨ã€‚ä¼ å…¥ `--installed-only` å¯è·³è¿‡ç¼ºå¤±çš„æœåŠ¡å™¨ã€‚ |
| `install <id>` | ä¸»åŠ¨å®‰è£…æŸä¸ªæœåŠ¡å™¨çš„äºŒè¿›åˆ¶æ–‡ä»¶ã€‚ |
| `install-all` | å®‰è£…æ‰€æœ‰å…·æœ‰å·²çŸ¥è‡ªåŠ¨å®‰è£…æ–¹æ¡ˆçš„æœåŠ¡å™¨ã€‚ |
| `restart` | å…³é—­æ­£åœ¨è¿è¡Œçš„å®¢æˆ·ç«¯ï¼Œä»¥ä¾¿ä¸‹æ¬¡ç¼–è¾‘æ—¶é‡æ–°å¯åŠ¨ã€‚ |
| `which <id>` | æ‰“å°æŸä¸ªæœåŠ¡å™¨çš„å·²è§£æžäºŒè¿›åˆ¶è·¯å¾„ã€‚ |

å®Œæ•´æŒ‡å—ã€æ”¯æŒçš„è¯­è¨€å’Œé…ç½®é¡¹ï¼Œè¯·å‚é˜… [LSP â€” è¯­ä¹‰è¯Šæ–­](/user-guide/features/lsp)ã€‚

## `zed setup`

```bash
zed setup [model|tts|terminal|gateway|tools|agent] [--non-interactive] [--reset] [--quick] [--reconfigure] [--portal]
```

**é¦–æ¬¡è¿è¡Œï¼š** å¯åŠ¨é¦–æ¬¡ä½¿ç”¨å‘å¯¼ã€‚

**å·²é…ç½®ç”¨æˆ·ï¼š** ç›´æŽ¥è¿›å…¥å®Œæ•´é‡æ–°é…ç½®å‘å¯¼â€”â€”æ¯ä¸ªæç¤ºéƒ½ä»¥å½“å‰å€¼ä½œä¸ºé»˜è®¤å€¼ï¼ŒæŒ‰ Enter ä¿ç•™æˆ–è¾“å…¥æ–°å€¼ã€‚æ— èœå•ã€‚

è·³è½¬åˆ°æŸä¸ªéƒ¨åˆ†è€Œéžå®Œæ•´å‘å¯¼ï¼š

| éƒ¨åˆ† | è¯´æ˜Ž |
|---------|-------------|
| `model` | Provider å’Œæ¨¡åž‹è®¾ç½®ã€‚ |
| `terminal` | ç»ˆç«¯åŽç«¯å’Œæ²™ç®±è®¾ç½®ã€‚ |
| `gateway` | æ¶ˆæ¯å¹³å°è®¾ç½®ã€‚ |
| `tools` | æŒ‰å¹³å°å¯ç”¨/ç¦ç”¨å·¥å…·ã€‚ |
| `agent` | Agent è¡Œä¸ºè®¾ç½®ã€‚ |

é€‰é¡¹ï¼š

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--quick` | åœ¨å·²é…ç½®ç”¨æˆ·è¿è¡Œæ—¶ï¼šä»…æç¤ºç¼ºå¤±æˆ–æœªè®¾ç½®çš„é¡¹ç›®ï¼Œè·³è¿‡å·²é…ç½®çš„é¡¹ç›®ã€‚ |
| `--non-interactive` | ä½¿ç”¨é»˜è®¤å€¼/çŽ¯å¢ƒå˜é‡ï¼Œä¸æ˜¾ç¤ºæç¤ºã€‚ |
| `--reset` | åœ¨è®¾ç½®å‰å°†é…ç½®é‡ç½®ä¸ºé»˜è®¤å€¼ã€‚ |
| `--reconfigure` | å‘åŽå…¼å®¹åˆ«åâ€”â€”åœ¨å·²æœ‰å®‰è£…ä¸Šè£¸è¿è¡Œ `zed setup` çŽ°åœ¨é»˜è®¤æ‰§è¡Œæ­¤æ“ä½œã€‚ |
| `--portal` | ä¸€é”® Nous Portal è®¾ç½®ï¼šé€šè¿‡ OAuth ç™»å½•ï¼Œå°† Nous è®¾ä¸ºæŽ¨ç† providerï¼Œå¹¶é€‰æ‹©åŠ å…¥ [Tool Gateway](../user-guide/features/tool-gateway.md)ã€‚è·³è¿‡å‘å¯¼å…¶ä½™éƒ¨åˆ†ã€‚ |

## `zed portal`

```bash
zed portal [status|open|tools]
```

æ£€æŸ¥ Nous Portal è®¤è¯ã€Tool Gateway è·¯ç”±ï¼Œå¹¶è®¿é—®è®¢é˜…é¡µé¢ã€‚ä¸å¸¦å­å‘½ä»¤æ—¶è¿è¡Œ `status`ã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `status`ï¼ˆé»˜è®¤ï¼‰ | Portal è®¤è¯çŠ¶æ€ + æ¯ä¸ªå·¥å…·çš„ Tool Gateway è·¯ç”±æ‘˜è¦ã€‚ä¸å¸¦å­å‘½ä»¤æ—¶ä¹Ÿä¼šæ˜¾ç¤ºã€‚ |
| `open` | åœ¨é»˜è®¤æµè§ˆå™¨ä¸­æ‰“å¼€ `portal.nousresearch.com/manage-subscription`ã€‚ |
| `tools` | åˆ—å‡ºæ¯ä¸ª Tool Gateway åˆä½œä¼™ä¼´ï¼ˆFirecrawlã€FALã€OpenAI TTSã€Browser Useã€Modalï¼‰åŠå“ªäº›é€šè¿‡ Nous è·¯ç”±ã€‚ |

å…³äºŽ gateway æœ¬èº«çš„é…ç½®ï¼Œè¯·å‚é˜… [Tool Gateway](../user-guide/features/tool-gateway.md)ã€‚å…³äºŽä¸€é”®è®¾ç½®è·¯å¾„ï¼Œè¯·å‚é˜…ä¸Šæ–¹çš„ `zed setup --portal`ã€‚

## `zed whatsapp`

```bash
zed whatsapp
```

è¿è¡Œ WhatsApp é…å¯¹/è®¾ç½®æµç¨‹ï¼ŒåŒ…æ‹¬æ¨¡å¼é€‰æ‹©å’ŒäºŒç»´ç é…å¯¹ã€‚

## `zed slack`

```bash
zed slack manifest              # å°† manifest æ‰“å°åˆ° stdout
zed slack manifest --write      # å†™å…¥ ~/.zed/slack-manifest.json
zed slack manifest --slashes-only  # ä»…è¾“å‡º features.slash_commands æ•°ç»„
```

ç”Ÿæˆä¸€ä¸ª Slack app manifestï¼Œå°† `COMMAND_REGISTRY` ä¸­çš„æ¯æ¡ gateway å‘½ä»¤ï¼ˆ`/btw`ã€`/stop`ã€`/model` ç­‰ï¼‰æ³¨å†Œä¸ºä¸€ç­‰å…¬æ°‘ Slack æ–œæ å‘½ä»¤â€”â€”ä¸Ž Discord å’Œ Telegram ä¿æŒä¸€è‡´ã€‚å°†è¾“å‡ºç²˜è´´åˆ°ä½ çš„ Slack app é…ç½®ä¸­ï¼š[https://api.slack.com/apps](https://api.slack.com/apps) â†’ ä½ çš„ app â†’ **Features â†’ App Manifest â†’ Edit**ï¼Œç„¶åŽç‚¹å‡» **Save**ã€‚å¦‚æžœ scope æˆ–æ–œæ å‘½ä»¤æœ‰å˜åŒ–ï¼ŒSlack ä¼šæç¤ºé‡æ–°å®‰è£…ã€‚

| æ ‡å¿— | é»˜è®¤å€¼ | ç”¨é€” |
|------|---------|---------|
| `--write [PATH]` | stdout | å†™å…¥æ–‡ä»¶è€Œéž stdoutã€‚è£¸ `--write` å†™å…¥ `$ZED_HOME/slack-manifest.json`ã€‚ |
| `--name NAME` | `Zed` | Slack ä¸­çš„æœºå™¨äººæ˜¾ç¤ºåç§°ã€‚ |
| `--description DESC` | é»˜è®¤ç®€ä»‹ | Slack app ç›®å½•ä¸­æ˜¾ç¤ºçš„æœºå™¨äººæè¿°ã€‚ |
| `--slashes-only` | å…³é—­ | ä»…è¾“å‡º `features.slash_commands`ï¼Œç”¨äºŽåˆå¹¶åˆ°æ‰‹åŠ¨ç»´æŠ¤çš„ manifest ä¸­ã€‚ |

`zed update` åŽé‡æ–°è¿è¡Œ `zed slack manifest --write` ä»¥èŽ·å–æ–°å¢žå‘½ä»¤ã€‚


## `zed login` / `zed logout` *ï¼ˆå·²å¼ƒç”¨ï¼‰*

:::caution
`zed login` å·²è¢«ç§»é™¤ã€‚è¯·ä½¿ç”¨ `zed auth` ç®¡ç† OAuth å‡­æ®ï¼Œä½¿ç”¨ `zed model` é€‰æ‹© providerï¼Œæˆ–ä½¿ç”¨ `zed setup` è¿›è¡Œå®Œæ•´çš„äº¤äº’å¼è®¾ç½®ã€‚
:::

## `zed auth`

ç®¡ç†åŒä¸€ provider çš„å¯†é’¥è½®æ¢å‡­æ®æ± ã€‚å®Œæ•´æ–‡æ¡£è¯·å‚é˜… [å‡­æ®æ± ](/user-guide/features/credential-pools)ã€‚

```bash
zed auth                                              # äº¤äº’å¼å‘å¯¼
zed auth list                                         # æ˜¾ç¤ºæ‰€æœ‰æ± 
zed auth list openrouter                              # æ˜¾ç¤ºç‰¹å®š provider
zed auth add openrouter --api-key sk-or-v1-xxx        # æ·»åŠ  API å¯†é’¥
zed auth add anthropic --type oauth                   # æ·»åŠ  OAuth å‡­æ®
zed auth remove openrouter 2                          # æŒ‰ç´¢å¼•åˆ é™¤
zed auth reset openrouter                             # æ¸…é™¤å†·å´æ—¶é—´
zed auth status anthropic                             # æ˜¾ç¤ºæŸ provider çš„è®¤è¯çŠ¶æ€
zed auth logout anthropic                             # ç™»å‡ºå¹¶æ¸…é™¤å·²å­˜å‚¨çš„è®¤è¯çŠ¶æ€
zed auth spotify                                      # é€šè¿‡ PKCE å°† Zed ä¸Ž Spotify è®¤è¯
```

å­å‘½ä»¤ï¼š`add`ã€`list`ã€`remove`ã€`reset`ã€`status`ã€`logout`ã€`spotify`ã€‚ä¸å¸¦å­å‘½ä»¤è°ƒç”¨æ—¶ï¼Œå¯åŠ¨äº¤äº’å¼ç®¡ç†å‘å¯¼ã€‚

## `zed status`

```bash
zed status [--all] [--deep]
```

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--all` | ä»¥å¯åˆ†äº«çš„è„±æ•æ ¼å¼æ˜¾ç¤ºæ‰€æœ‰è¯¦æƒ…ã€‚ |
| `--deep` | è¿è¡Œå¯èƒ½è€—æ—¶æ›´é•¿çš„æ·±åº¦æ£€æŸ¥ã€‚ |

## `zed cron`

```bash
zed cron <list|create|edit|pause|resume|run|remove|status|tick>
```

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `list` | æ˜¾ç¤ºå·²è°ƒåº¦çš„ä»»åŠ¡ã€‚ |
| `create` / `add` | ä»Ž prompt åˆ›å»ºè°ƒåº¦ä»»åŠ¡ï¼Œå¯é€šè¿‡é‡å¤ `--skill` é™„åŠ ä¸€ä¸ªæˆ–å¤šä¸ª skillã€‚ |
| `edit` | æ›´æ–°ä»»åŠ¡çš„è°ƒåº¦ã€promptã€åç§°ã€æŠ•é€’æ–¹å¼ã€é‡å¤æ¬¡æ•°æˆ–é™„åŠ çš„ skillã€‚æ”¯æŒ `--clear-skills`ã€`--add-skill` å’Œ `--remove-skill`ã€‚ |
| `pause` | æš‚åœä»»åŠ¡è€Œä¸åˆ é™¤ã€‚ |
| `resume` | æ¢å¤å·²æš‚åœçš„ä»»åŠ¡å¹¶è®¡ç®—ä¸‹æ¬¡æœªæ¥è¿è¡Œæ—¶é—´ã€‚ |
| `run` | åœ¨ä¸‹æ¬¡è°ƒåº¦å™¨ tick æ—¶è§¦å‘ä»»åŠ¡ã€‚ |
| `remove` | åˆ é™¤è°ƒåº¦ä»»åŠ¡ã€‚ |
| `status` | æ£€æŸ¥ cron è°ƒåº¦å™¨æ˜¯å¦æ­£åœ¨è¿è¡Œã€‚ |
| `tick` | è¿è¡Œåˆ°æœŸä»»åŠ¡ä¸€æ¬¡åŽé€€å‡ºã€‚ |

## `zed kanban`

```bash
zed kanban [--board <slug>] <action> [options]
```

å¤š profileã€å¤šé¡¹ç›®åä½œçœ‹æ¿ã€‚æ¯ä¸ªå®‰è£…å¯æ‰˜ç®¡å¤šä¸ªçœ‹æ¿ï¼ˆæ¯ä¸ªé¡¹ç›®ã€ä»“åº“æˆ–é¢†åŸŸä¸€ä¸ªï¼‰ï¼›æ¯ä¸ªçœ‹æ¿æ˜¯ç‹¬ç«‹çš„é˜Ÿåˆ—ï¼Œæ‹¥æœ‰è‡ªå·±çš„ SQLite æ•°æ®åº“å’Œè°ƒåº¦å™¨ä½œç”¨åŸŸã€‚æ–°å®‰è£…ä»Žåä¸º `default` çš„å•ä¸ªçœ‹æ¿å¼€å§‹ï¼Œå…¶æ•°æ®åº“ä¸º `~/.zed/kanban.db`ï¼ˆå‘åŽå…¼å®¹ï¼‰ï¼›å…¶ä»–çœ‹æ¿ä½äºŽ `~/.zed/kanban/boards/<slug>/kanban.db`ã€‚åµŒå…¥åœ¨ gateway ä¸­çš„è°ƒåº¦å™¨æ¯æ¬¡ tick æ‰«ææ‰€æœ‰çœ‹æ¿ã€‚

**å…¨å±€æ ‡å¿—ï¼ˆé€‚ç”¨äºŽä»¥ä¸‹æ‰€æœ‰æ“ä½œï¼‰ï¼š**

| æ ‡å¿— | ç”¨é€” |
|------|---------|
| `--board <slug>` | æ“ä½œç‰¹å®šçœ‹æ¿ã€‚é»˜è®¤ä¸ºå½“å‰çœ‹æ¿ï¼ˆé€šè¿‡ `zed kanban boards switch`ã€`ZED_KANBAN_BOARD` çŽ¯å¢ƒå˜é‡æˆ– `default` è®¾ç½®ï¼‰ã€‚ |

**è¿™æ˜¯äººå·¥/è„šæœ¬æ“ä½œç•Œé¢ã€‚** è°ƒåº¦å™¨ç”Ÿæˆçš„ agent worker é€šè¿‡ä¸“ç”¨çš„ `kanban_*` [toolset](/user-guide/features/kanban#how-workers-interact-with-the-board)ï¼ˆ`kanban_show`ã€`kanban_complete`ã€`kanban_block`ã€`kanban_create`ã€`kanban_link`ã€`kanban_comment`ã€`kanban_heartbeat`ï¼›ç¼–æŽ’å™¨ profile è¿˜å¯ä½¿ç”¨ `kanban_list` å’Œ `kanban_unblock`ï¼‰é©±åŠ¨çœ‹æ¿ï¼Œè€Œéžè°ƒç”¨ `zed kanban`ã€‚Worker çš„çŽ¯å¢ƒä¸­å›ºå®šäº† `ZED_KANBAN_BOARD`ï¼Œå› æ­¤ç‰©ç†ä¸Šæ— æ³•çœ‹åˆ°å…¶ä»–çœ‹æ¿ã€‚

| æ“ä½œ | ç”¨é€” |
|--------|---------|
| `init` | å¦‚æžœç¼ºå°‘åˆ™åˆ›å»º `kanban.db`ã€‚å¹‚ç­‰æ“ä½œã€‚ |
| `boards list` / `boards ls` | åˆ—å‡ºæ‰€æœ‰çœ‹æ¿åŠä»»åŠ¡æ•°é‡ã€‚æ”¯æŒ `--json`ã€`--all`ï¼ˆåŒ…å«å·²å½’æ¡£ï¼‰ã€‚ |
| `boards create <slug>` | åˆ›å»ºæ–°çœ‹æ¿ã€‚æ ‡å¿—ï¼š`--name`ã€`--description`ã€`--icon`ã€`--color`ã€`--switch`ï¼ˆè®¾ä¸ºæ´»è·ƒï¼‰ã€‚Slug ä¸º kebab-caseï¼Œè‡ªåŠ¨è½¬å°å†™ã€‚ |
| `boards switch <slug>` / `boards use` | å°† `<slug>` æŒä¹…åŒ–ä¸ºæ´»è·ƒçœ‹æ¿ï¼ˆå†™å…¥ `~/.zed/kanban/current`ï¼‰ã€‚ |
| `boards show` / `boards current` | æ‰“å°å½“å‰æ´»è·ƒçœ‹æ¿çš„åç§°ã€æ•°æ®åº“è·¯å¾„å’Œä»»åŠ¡æ•°é‡ã€‚ |
| `boards rename <slug> "<name>"` | æ›´æ”¹çœ‹æ¿çš„æ˜¾ç¤ºåç§°ã€‚Slug ä¸å¯å˜ã€‚ |
| `boards rm <slug>` | å½’æ¡£ï¼ˆé»˜è®¤ï¼‰æˆ–ç¡¬åˆ é™¤çœ‹æ¿ã€‚`--delete` è·³è¿‡å½’æ¡£æ­¥éª¤ã€‚å·²å½’æ¡£çœ‹æ¿ç§»è‡³ `boards/_archived/<slug>-<ts>/`ã€‚`default` çœ‹æ¿æ‹’ç»æ­¤æ“ä½œã€‚ |
| `create "<title>"` | åœ¨æ´»è·ƒçœ‹æ¿ä¸Šåˆ›å»ºæ–°ä»»åŠ¡ã€‚æ ‡å¿—ï¼š`--body`ã€`--assignee`ã€`--parent`ï¼ˆå¯é‡å¤ï¼‰ã€`--workspace scratch\|worktree\|dir:<path>`ã€`--tenant`ã€`--priority`ã€`--triage`ã€`--idempotency-key`ã€`--max-runtime`ã€`--max-retries`ã€`--skill`ï¼ˆå¯é‡å¤ï¼‰ã€‚ |
| `list` / `ls` | åˆ—å‡ºæ´»è·ƒçœ‹æ¿ä¸Šçš„ä»»åŠ¡ã€‚å¯ç”¨ `--mine`ã€`--assignee`ã€`--status`ã€`--tenant`ã€`--archived`ã€`--json` è¿‡æ»¤ã€‚ |
| `show <id>` | æ˜¾ç¤ºä»»åŠ¡åŠå…¶è¯„è®ºå’Œäº‹ä»¶ã€‚`--json` ç”¨äºŽæœºå™¨è¾“å‡ºã€‚ |
| `assign <id> <profile>` | åˆ†é…æˆ–é‡æ–°åˆ†é…ã€‚ä½¿ç”¨ `none` å–æ¶ˆåˆ†é…ã€‚ä»»åŠ¡è¿è¡Œæ—¶æ‹’ç»æ­¤æ“ä½œã€‚ |
| `link <parent> <child>` | æ·»åŠ ä¾èµ–å…³ç³»ã€‚æ£€æµ‹å¾ªçŽ¯ä¾èµ–ã€‚ä¸¤ä¸ªä»»åŠ¡å¿…é¡»åœ¨åŒä¸€çœ‹æ¿ä¸Šã€‚ |
| `unlink <parent> <child>` | åˆ é™¤ä¾èµ–å…³ç³»ã€‚ |
| `claim <id>` | åŽŸå­æ€§åœ°è®¤é¢†å°±ç»ªä»»åŠ¡ã€‚æ‰“å°å·²è§£æžçš„å·¥ä½œåŒºè·¯å¾„ã€‚ |
| `comment <id> "<text>"` | è¿½åŠ è¯„è®ºã€‚ä¸‹ä¸€ä¸ªè®¤é¢†è¯¥ä»»åŠ¡çš„ worker ä¼šåœ¨å…¶ `kanban_show()` å“åº”ä¸­è¯»å–åˆ°å®ƒã€‚ |
| `complete <id>` | å°†ä»»åŠ¡æ ‡è®°ä¸ºå®Œæˆã€‚æ ‡å¿—ï¼š`--result`ã€`--summary`ã€`--metadata`ã€‚ |
| `block <id> "<reason>"` | å°†ä»»åŠ¡æ ‡è®°ä¸ºç­‰å¾…äººå·¥è¾“å…¥ã€‚åŒæ—¶å°†åŽŸå› è¿½åŠ ä¸ºè¯„è®ºã€‚ |
| `schedule <id> "<reason>"` | å°†æ—¶é—´å»¶è¿Ÿ/åŽç»­å·¥ä½œåœæ”¾åˆ° `scheduled` çŠ¶æ€ï¼Œä½¿å…¶ä¸æ˜¾ç¤ºä¸ºäººå·¥é˜»å¡žé¡¹ã€‚ |
| `unblock <id>` | å°†å·²é˜»å¡žæˆ–å·²è°ƒåº¦çš„ä»»åŠ¡è¿”å›žå°±ç»ªçŠ¶æ€ï¼ˆå¦‚æžœä¾èµ–ä»æœªå®Œæˆåˆ™è¿”å›ž `todo`ï¼‰ã€‚ |
| `archive <id>` | ä»Žé»˜è®¤åˆ—è¡¨ä¸­éšè—ã€‚`gc` å°†åˆ é™¤ scratch å·¥ä½œåŒºã€‚ |
| `tail <id>` | è·Ÿè¸ªä»»åŠ¡çš„äº‹ä»¶æµã€‚ |
| `dispatch` | å¯¹æ´»è·ƒçœ‹æ¿æ‰§è¡Œä¸€æ¬¡è°ƒåº¦å™¨æ‰«æã€‚æ ‡å¿—ï¼š`--dry-run`ã€`--max N`ã€`--failure-limit N`ã€`--json`ã€‚ |
| `context <id>` | æ‰“å° worker å°†çœ‹åˆ°çš„å®Œæ•´ä¸Šä¸‹æ–‡ï¼ˆæ ‡é¢˜ + æ­£æ–‡ + çˆ¶ä»»åŠ¡ç»“æžœ + è¯„è®ºï¼‰ã€‚ |
| `specify <id>` / `specify --all` | é€šè¿‡è¾…åŠ© LLM å°† triage åˆ—ä¸­çš„ä»»åŠ¡ç»†åŒ–ä¸ºå…·ä½“è§„æ ¼ï¼ˆæ ‡é¢˜ + åŒ…å«ç›®æ ‡ã€æ–¹æ¡ˆã€éªŒæ”¶æ ‡å‡†çš„æ­£æ–‡ï¼‰ï¼Œç„¶åŽå°†å…¶æå‡åˆ° `todo`ã€‚æ ‡å¿—ï¼š`--tenant`ï¼ˆå°† `--all` é™å®šåˆ°ä¸€ä¸ª tenantï¼‰ã€`--author`ã€`--json`ã€‚åœ¨ `config.yaml` çš„ `auxiliary.triage_specifier` ä¸‹é…ç½®æ¨¡åž‹ã€‚ |
| `decompose <id>` / `decompose --all` | å°† triage åˆ—ä¸­çš„ä»»åŠ¡æŒ‰æè¿°æ‹†åˆ†ä¸ºå­ä»»åŠ¡å›¾ï¼Œè·¯ç”±åˆ°ä¸“ä¸š profileï¼ˆç¼–æŽ’å™¨é©±åŠ¨è·¯å¾„ï¼‰ã€‚å½“ LLM åˆ¤æ–­ä»»åŠ¡ä¸é€‚åˆæ‹†åˆ†æ—¶ï¼Œå›žé€€åˆ° specify é£Žæ ¼çš„å•ä»»åŠ¡æå‡ã€‚ä¸Ž `specify` ç›¸åŒçš„æ ‡å¿—ã€‚åœ¨ `config.yaml` çš„ `auxiliary.kanban_decomposer` ä¸‹é…ç½®æ¨¡åž‹ã€‚å½“ `kanban.auto_decompose: true`ï¼ˆé»˜è®¤ï¼‰æ—¶ï¼Œæ¯æ¬¡è°ƒåº¦å™¨ tick ä¹Ÿä¼šè‡ªåŠ¨è¿è¡Œã€‚å‚è§ [è‡ªåŠ¨ä¸Žæ‰‹åŠ¨ç¼–æŽ’](/user-guide/features/kanban#auto-vs-manual-orchestration)ã€‚ |
| `gc` | åˆ é™¤å·²å½’æ¡£ä»»åŠ¡çš„ scratch å·¥ä½œåŒºã€‚ |

ç¤ºä¾‹ï¼š

```bash
# åˆ›å»ºç¬¬äºŒä¸ªçœ‹æ¿å¹¶åœ¨ä¸åˆ‡æ¢çš„æƒ…å†µä¸‹å‘å…¶æ·»åŠ ä»»åŠ¡ã€‚
zed kanban boards create atm10-server --name "ATM10 Server" --icon ðŸŽ®
zed kanban --board atm10-server create "Restart server" --assignee ops

# åˆ‡æ¢æ´»è·ƒçœ‹æ¿ä»¥ä¾›åŽç»­è°ƒç”¨ä½¿ç”¨ã€‚
zed kanban boards switch atm10-server
zed kanban list                  # æ˜¾ç¤º atm10-server çš„ä»»åŠ¡

# å½’æ¡£çœ‹æ¿ï¼ˆå¯æ¢å¤ï¼‰æˆ–ç¡¬åˆ é™¤ã€‚
zed kanban boards rm atm10-server
zed kanban boards rm atm10-server --delete
```

çœ‹æ¿è§£æžé¡ºåºï¼ˆä¼˜å…ˆçº§ä»Žé«˜åˆ°ä½Žï¼‰ï¼š`--board <slug>` æ ‡å¿— â†’ `ZED_KANBAN_BOARD` çŽ¯å¢ƒå˜é‡ â†’ `~/.zed/kanban/current` æ–‡ä»¶ â†’ `default`ã€‚

æ‰€æœ‰æ“ä½œä¹Ÿå¯ä½œä¸º gateway ä¸­çš„æ–œæ å‘½ä»¤ä½¿ç”¨ï¼ˆ`/kanban â€¦`ï¼‰ï¼Œå‚æ•°ç•Œé¢ç›¸åŒâ€”â€”åŒ…æ‹¬ `boards` å­å‘½ä»¤å’Œ `--board` æ ‡å¿—ã€‚

å®Œæ•´è®¾è®¡â€”â€”ä¸Ž Cline Kanban / Paperclip / NanoClaw / Gemini Enterprise çš„å¯¹æ¯”ã€å…«ç§åä½œæ¨¡å¼ã€å››ä¸ªç”¨æˆ·æ•…äº‹ã€å¹¶å‘æ­£ç¡®æ€§è¯æ˜Žâ€”â€”è¯·å‚é˜…ä»“åº“ä¸­çš„ `docs/zed-kanban-v1-spec.pdf` æˆ– [Kanban ç”¨æˆ·æŒ‡å—](/user-guide/features/kanban)ã€‚

## `zed webhook`

```bash
zed webhook <subscribe|list|remove|test>
```

ç®¡ç†ç”¨äºŽäº‹ä»¶é©±åŠ¨ agent æ¿€æ´»çš„åŠ¨æ€ webhook è®¢é˜…ã€‚éœ€è¦åœ¨ config ä¸­å¯ç”¨ webhook å¹³å°â€”â€”å¦‚æœªé…ç½®ï¼Œå°†æ‰“å°è®¾ç½®è¯´æ˜Žã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `subscribe` / `add` | åˆ›å»º webhook è·¯ç”±ã€‚è¿”å›žè¦åœ¨ä½ çš„æœåŠ¡ä¸Šé…ç½®çš„ URL å’Œ HMAC å¯†é’¥ã€‚ |
| `list` / `ls` | æ˜¾ç¤ºæ‰€æœ‰ agent åˆ›å»ºçš„è®¢é˜…ã€‚ |
| `remove` / `rm` | åˆ é™¤åŠ¨æ€è®¢é˜…ã€‚ä¸å½±å“ config.yaml ä¸­çš„é™æ€è·¯ç”±ã€‚ |
| `test` | å‘é€æµ‹è¯• POST ä»¥éªŒè¯è®¢é˜…æ˜¯å¦æ­£å¸¸å·¥ä½œã€‚ |

### `zed webhook subscribe`

```bash
zed webhook subscribe <name> [options]
```

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--prompt` | å¸¦æœ‰ `{dot.notation}` payload å¼•ç”¨çš„ prompt æ¨¡æ¿ã€‚ |
| `--events` | è¦æŽ¥å—çš„é€—å·åˆ†éš”äº‹ä»¶ç±»åž‹ï¼ˆå¦‚ `issues,pull_request`ï¼‰ã€‚ä¸ºç©ºåˆ™æŽ¥å—æ‰€æœ‰ã€‚ |
| `--description` | äººç±»å¯è¯»çš„æè¿°ã€‚ |
| `--skills` | ä¸º agent è¿è¡ŒåŠ è½½çš„é€—å·åˆ†éš” skill åç§°ã€‚ |
| `--deliver` | æŠ•é€’ç›®æ ‡ï¼š`log`ï¼ˆé»˜è®¤ï¼‰ã€`telegram`ã€`discord`ã€`slack`ã€`github_comment`ã€‚ |
| `--deliver-chat-id` | è·¨å¹³å°æŠ•é€’çš„ç›®æ ‡èŠå¤©/é¢‘é“ IDã€‚ |
| `--secret` | è‡ªå®šä¹‰ HMAC å¯†é’¥ã€‚çœç•¥æ—¶è‡ªåŠ¨ç”Ÿæˆã€‚ |
| `--deliver-only` | è·³è¿‡ agentâ€”â€”å°†æ¸²æŸ“åŽçš„ `--prompt` ä½œä¸ºå­—é¢æ¶ˆæ¯æŠ•é€’ã€‚é›¶ LLM æˆæœ¬ï¼Œäºšç§’çº§æŠ•é€’ã€‚è¦æ±‚ `--deliver` ä¸ºçœŸå®žç›®æ ‡ï¼ˆéž `log`ï¼‰ã€‚ |

è®¢é˜…æŒä¹…åŒ–åˆ° `~/.zed/webhook_subscriptions.json`ï¼Œwebhook é€‚é…å™¨æ— éœ€é‡å¯ gateway å³å¯çƒ­é‡è½½ã€‚

## `zed doctor`

```bash
zed doctor [--fix]
```

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--fix` | å°½å¯èƒ½å°è¯•è‡ªåŠ¨ä¿®å¤ã€‚ |

## `zed dump`

```bash
zed dump [--show-keys]
```

è¾“å‡ºæ•´ä¸ª Zed è®¾ç½®çš„ç´§å‡‘çº¯æ–‡æœ¬æ‘˜è¦ã€‚ä¸“ä¸ºå¤åˆ¶ç²˜è´´åˆ° Discordã€GitHub issue æˆ– Telegram å¯»æ±‚æ”¯æŒè€Œè®¾è®¡â€”â€”æ—  ANSI é¢œè‰²ã€æ— ç‰¹æ®Šæ ¼å¼ï¼Œåªæœ‰æ•°æ®ã€‚

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--show-keys` | æ˜¾ç¤ºè„±æ•çš„ API å¯†é’¥å‰ç¼€ï¼ˆé¦–å°¾å„ 4 ä¸ªå­—ç¬¦ï¼‰ï¼Œè€Œéžä»…æ˜¾ç¤º `set`/`not set`ã€‚ |

### åŒ…å«å†…å®¹

| éƒ¨åˆ† | è¯¦æƒ… |
|---------|---------|
| **Header** | Zed ç‰ˆæœ¬ã€å‘å¸ƒæ—¥æœŸã€git commit hash |
| **Environment** | æ“ä½œç³»ç»Ÿã€Python ç‰ˆæœ¬ã€OpenAI SDK ç‰ˆæœ¬ |
| **Identity** | æ´»è·ƒ profile åç§°ã€ZED_HOME è·¯å¾„ |
| **Model** | å·²é…ç½®çš„é»˜è®¤æ¨¡åž‹å’Œ provider |
| **Terminal** | åŽç«¯ç±»åž‹ï¼ˆlocalã€dockerã€ssh ç­‰ï¼‰ |
| **API keys** | æ‰€æœ‰ 22 ä¸ª provider/å·¥å…· API å¯†é’¥çš„å­˜åœ¨æ€§æ£€æŸ¥ |
| **Features** | å·²å¯ç”¨çš„ toolsetã€MCP æœåŠ¡å™¨æ•°é‡ã€memory provider |
| **Services** | Gateway çŠ¶æ€ã€å·²é…ç½®çš„æ¶ˆæ¯å¹³å° |
| **Workload** | Cron ä»»åŠ¡æ•°é‡ã€å·²å®‰è£… skill æ•°é‡ |
| **Config overrides** | ä¸Žé»˜è®¤å€¼ä¸åŒçš„æ‰€æœ‰ config å€¼ |

### ç¤ºä¾‹è¾“å‡º

```
--- zed dump ---
version:          0.8.0 (2026.4.8) [af4abd2f]
os:               Linux 6.14.0-37-generic x86_64
python:           3.11.14
openai_sdk:       2.24.0
profile:          default
zed_home:      ~/.zed
model:            anthropic/claude-opus-4.6
provider:         openrouter
terminal:         local

api_keys:
  openrouter           set
  openai               not set
  anthropic            set
  nous                 not set
  firecrawl            set
  ...

features:
  toolsets:           all
  mcp_servers:        0
  memory_provider:    built-in
  gateway:            running (systemd)
  platforms:          telegram, discord
  cron_jobs:          3 active / 5 total
  skills:             42

config_overrides:
  agent.max_turns: 250
  compression.threshold: 0.85
  display.streaming: True
--- end dump ---
```

### ä½¿ç”¨åœºæ™¯

- åœ¨ GitHub ä¸ŠæŠ¥å‘Š bugâ€”â€”å°† dump ç²˜è´´åˆ° issue ä¸­
- åœ¨ Discord ä¸­å¯»æ±‚å¸®åŠ©â€”â€”åœ¨ä»£ç å—ä¸­åˆ†äº«
- ä¸Žä»–äººå¯¹æ¯”è®¾ç½®
- å‡ºçŽ°é—®é¢˜æ—¶å¿«é€Ÿè¿›è¡Œå¥å…¨æ€§æ£€æŸ¥

:::tip
`zed dump` ä¸“ä¸ºåˆ†äº«è€Œè®¾è®¡ã€‚äº¤äº’å¼è¯Šæ–­è¯·ä½¿ç”¨ `zed doctor`ã€‚å¯è§†åŒ–æ¦‚è§ˆè¯·ä½¿ç”¨ `zed status`ã€‚
:::

## `zed debug`

```bash
zed debug share [options]
```

å°†è°ƒè¯•æŠ¥å‘Šï¼ˆç³»ç»Ÿä¿¡æ¯ + è¿‘æœŸæ—¥å¿—ï¼‰ä¸Šä¼ åˆ°ç²˜è´´æœåŠ¡å¹¶èŽ·å–å¯åˆ†äº«çš„ URLã€‚é€‚ç”¨äºŽå¿«é€Ÿæ”¯æŒè¯·æ±‚â€”â€”åŒ…å«å¸®åŠ©è€…è¯Šæ–­é—®é¢˜æ‰€éœ€çš„ä¸€åˆ‡ä¿¡æ¯ã€‚

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--lines <N>` | æ¯ä¸ªæ—¥å¿—æ–‡ä»¶åŒ…å«çš„æ—¥å¿—è¡Œæ•°ï¼ˆé»˜è®¤ï¼š200ï¼‰ã€‚ |
| `--expire <days>` | ç²˜è´´è¿‡æœŸå¤©æ•°ï¼ˆé»˜è®¤ï¼š7ï¼‰ã€‚ |
| `--local` | åœ¨æœ¬åœ°æ‰“å°æŠ¥å‘Šè€Œéžä¸Šä¼ ã€‚ |

æŠ¥å‘ŠåŒ…å«ç³»ç»Ÿä¿¡æ¯ï¼ˆæ“ä½œç³»ç»Ÿã€Python ç‰ˆæœ¬ã€Zed ç‰ˆæœ¬ï¼‰ã€è¿‘æœŸ agent å’Œ gateway æ—¥å¿—ï¼ˆæ¯æ–‡ä»¶ 512 KB é™åˆ¶ï¼‰ä»¥åŠè„±æ•çš„ API å¯†é’¥çŠ¶æ€ã€‚å¯†é’¥å§‹ç»ˆè„±æ•â€”â€”ä¸ä¼šä¸Šä¼ ä»»ä½•å¯†é’¥ã€‚

ä¾æ¬¡å°è¯•çš„ç²˜è´´æœåŠ¡ï¼špaste.rsã€dpaste.comã€‚

### ç¤ºä¾‹

```bash
zed debug share              # ä¸Šä¼ è°ƒè¯•æŠ¥å‘Šï¼Œæ‰“å° URL
zed debug share --lines 500  # åŒ…å«æ›´å¤šæ—¥å¿—è¡Œ
zed debug share --expire 30  # ç²˜è´´ä¿ç•™ 30 å¤©
zed debug share --local      # åœ¨ç»ˆç«¯æ‰“å°æŠ¥å‘Šï¼ˆä¸ä¸Šä¼ ï¼‰
```

## `zed backup`

```bash
zed backup [options]
```

åˆ›å»º Zed é…ç½®ã€skillã€ä¼šè¯å’Œæ•°æ®çš„ zip å½’æ¡£ã€‚å¤‡ä»½ä¸åŒ…å« zed-agent ä»£ç åº“æœ¬èº«ã€‚

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `-o`, `--output <path>` | zip æ–‡ä»¶çš„è¾“å‡ºè·¯å¾„ï¼ˆé»˜è®¤ï¼š`~/zed-backup-<timestamp>.zip`ï¼‰ã€‚ |
| `-q`, `--quick` | å¿«é€Ÿå¿«ç…§ï¼šä»…åŒ…å«å…³é”®çŠ¶æ€æ–‡ä»¶ï¼ˆconfig.yamlã€state.dbã€.envã€authã€cron ä»»åŠ¡ï¼‰ã€‚æ¯”å®Œæ•´å¤‡ä»½å¿«å¾—å¤šã€‚ |
| `-l`, `--label <name>` | å¿«ç…§æ ‡ç­¾ï¼ˆä»…ä¸Ž `--quick` é…åˆä½¿ç”¨ï¼‰ã€‚ |

å¤‡ä»½ä½¿ç”¨ SQLite çš„ `backup()` API è¿›è¡Œå®‰å…¨å¤åˆ¶ï¼Œå› æ­¤å³ä½¿ Zed æ­£åœ¨è¿è¡Œä¹Ÿèƒ½æ­£ç¡®å·¥ä½œï¼ˆWAL æ¨¡å¼å®‰å…¨ï¼‰ã€‚

**zip ä¸­æŽ’é™¤çš„å†…å®¹ï¼š**

- `*.db-wal`ã€`*.db-shm`ã€`*.db-journal` â€” SQLite çš„ WAL/å…±äº«å†…å­˜/æ—¥å¿—é™„å±žæ–‡ä»¶ã€‚`*.db` æ–‡ä»¶å·²é€šè¿‡ `sqlite3.backup()` èŽ·å¾—ä¸€è‡´å¿«ç…§ï¼›å°†æ´»è·ƒé™„å±žæ–‡ä»¶ä¸€å¹¶æ‰“åŒ…ä¼šå¯¼è‡´æ¢å¤æ—¶çœ‹åˆ°åŠæäº¤çŠ¶æ€ã€‚
- `checkpoints/` â€” æ¯ä¼šè¯è½¨è¿¹ç¼“å­˜ã€‚ä»¥ hash ä¸ºé”®ï¼Œæ¯æ¬¡ä¼šè¯é‡æ–°ç”Ÿæˆï¼›æ— è®ºå¦‚ä½•éƒ½æ— æ³•å¹²å‡€åœ°ç§»æ¤åˆ°å…¶ä»–å®‰è£…ã€‚
- `zed-agent` ä»£ç æœ¬èº«ï¼ˆè¿™æ˜¯ç”¨æˆ·æ•°æ®å¤‡ä»½ï¼Œä¸æ˜¯ä»“åº“å¿«ç…§ï¼‰ã€‚

### ç¤ºä¾‹

```bash
zed backup                           # å®Œæ•´å¤‡ä»½åˆ° ~/zed-backup-*.zip
zed backup -o /tmp/zed.zip        # å®Œæ•´å¤‡ä»½åˆ°æŒ‡å®šè·¯å¾„
zed backup --quick                   # ä»…çŠ¶æ€å¿«é€Ÿå¿«ç…§
zed backup --quick --label "pre-upgrade"  # å¸¦æ ‡ç­¾çš„å¿«é€Ÿå¿«ç…§
```

## `zed checkpoints`

```bash
zed checkpoints [COMMAND]
```

æ£€æŸ¥å’Œç®¡ç† `~/.zed/checkpoints/` å¤„çš„å½±å­ git å­˜å‚¨â€”â€”ä¼šè¯å†… `/rollback` å‘½ä»¤çš„å­˜å‚¨å±‚ã€‚å¯éšæ—¶å®‰å…¨è¿è¡Œï¼›ä¸éœ€è¦ agent æ­£åœ¨è¿è¡Œã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `status`ï¼ˆé»˜è®¤ï¼‰ | æ˜¾ç¤ºæ€»å¤§å°ã€é¡¹ç›®æ•°é‡å’Œæ¯ä¸ªé¡¹ç›®çš„è¯¦æƒ…ã€‚è£¸ `zed checkpoints` ç­‰åŒäºŽæ­¤ã€‚ |
| `list` | `status` çš„åˆ«åã€‚ |
| `prune` | å¼ºåˆ¶æ‰§è¡Œæ¸…ç†â€”â€”åˆ é™¤å­¤ç«‹å’Œè¿‡æœŸé¡¹ç›®ï¼ŒGC å­˜å‚¨ï¼Œå¼ºåˆ¶æ‰§è¡Œå¤§å°ä¸Šé™ã€‚å¿½ç•¥ 24 å°æ—¶å¹‚ç­‰æ€§æ ‡è®°ã€‚ |
| `clear` | åˆ é™¤æ•´ä¸ª checkpoint åŸºç¡€å­˜å‚¨ã€‚ä¸å¯é€†ï¼›é™¤éžä½¿ç”¨ `-f` å¦åˆ™è¦æ±‚ç¡®è®¤ã€‚ |
| `clear-legacy` | ä»…åˆ é™¤ v1â†’v2 è¿ç§»äº§ç”Ÿçš„ `legacy-<timestamp>/` å½’æ¡£ã€‚ |

### é€‰é¡¹

| é€‰é¡¹ | å­å‘½ä»¤ | è¯´æ˜Ž |
|--------|------------|-------------|
| `--limit N` | `status`ã€`list` | æœ€å¤šåˆ—å‡ºçš„é¡¹ç›®æ•°ï¼ˆé»˜è®¤ 20ï¼‰ã€‚ |
| `--retention-days N` | `prune` | åˆ é™¤ `last_touch` æ—©äºŽ N å¤©çš„é¡¹ç›®ï¼ˆé»˜è®¤ 7ï¼‰ã€‚ |
| `--max-size-mb N` | `prune` | åœ¨å­¤ç«‹/è¿‡æœŸæ¸…ç†åŽï¼Œåˆ é™¤æ¯ä¸ªé¡¹ç›®æœ€æ—§çš„ commitï¼Œç›´åˆ°æ€»å­˜å‚¨å¤§å° â‰¤ N MBï¼ˆé»˜è®¤ 500ï¼‰ã€‚ |
| `--keep-orphans` | `prune` | è·³è¿‡åˆ é™¤å·¥ä½œç›®å½•ä¸å†å­˜åœ¨çš„é¡¹ç›®ã€‚ |
| `-f`, `--force` | `clear`ã€`clear-legacy` | è·³è¿‡ç¡®è®¤æç¤ºã€‚ |

### ç¤ºä¾‹

```bash
zed checkpoints                                  # çŠ¶æ€æ¦‚è§ˆ
zed checkpoints prune --retention-days 3         # æ¿€è¿›æ¸…ç†
zed checkpoints prune --max-size-mb 200          # ä¸€æ¬¡æ€§æ”¶ç´§å¤§å°ä¸Šé™
zed checkpoints clear-legacy -f                  # åˆ é™¤ v1 å½’æ¡£ç›®å½•
zed checkpoints clear -f                         # æ¸…é™¤æ‰€æœ‰å†…å®¹
```

å®Œæ•´æž¶æž„å’Œä¼šè¯å†…å‘½ä»¤ï¼Œè¯·å‚é˜… [Checkpoints ä¸Ž `/rollback`](../user-guide/checkpoints-and-rollback.md)ã€‚

## `zed import`

```bash
zed import <zipfile> [options]
```

å°†ä¹‹å‰åˆ›å»ºçš„ Zed å¤‡ä»½æ¢å¤åˆ° Zed ä¸»ç›®å½•ã€‚å½’æ¡£ä¸­çš„æ‰€æœ‰æ–‡ä»¶ä¼šè¦†ç›– Zed ä¸»ç›®å½•ä¸­çš„çŽ°æœ‰æ–‡ä»¶ï¼›`--force` ä»…è·³è¿‡å½“ç›®æ ‡å·²æœ‰ Zed å®‰è£…æ—¶è§¦å‘çš„ç¡®è®¤æç¤ºã€‚

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `-f`, `--force` | è·³è¿‡å·²æœ‰å®‰è£…çš„ç¡®è®¤æç¤ºã€‚ |

:::warning
å¯¼å…¥å‰è¯·åœæ­¢ gatewayï¼Œä»¥é¿å…ä¸Žæ­£åœ¨è¿è¡Œçš„è¿›ç¨‹å†²çªã€‚
:::

### ç¤ºä¾‹
```bash
zed import ~/zed-backup-20260423.zip           # è¦†ç›–çŽ°æœ‰é…ç½®å‰æç¤ºç¡®è®¤
zed import ~/zed-backup-20260423.zip --force   # ä¸æç¤ºç›´æŽ¥è¦†ç›–
```

## `zed logs`

```bash
zed logs [log_name] [options]
```

æŸ¥çœ‹ã€è·Ÿè¸ªå’Œè¿‡æ»¤ Zed æ—¥å¿—æ–‡ä»¶ã€‚æ‰€æœ‰æ—¥å¿—å­˜å‚¨åœ¨ `~/.zed/logs/`ï¼ˆéžé»˜è®¤ profile å­˜å‚¨åœ¨ `<profile>/logs/`ï¼‰ã€‚

### æ—¥å¿—æ–‡ä»¶

| åç§° | æ–‡ä»¶ | è®°å½•å†…å®¹ |
|------|------|-----------------|
| `agent`ï¼ˆé»˜è®¤ï¼‰ | `agent.log` | æ‰€æœ‰ agent æ´»åŠ¨â€”â€”API è°ƒç”¨ã€å·¥å…·è°ƒåº¦ã€ä¼šè¯ç”Ÿå‘½å‘¨æœŸï¼ˆINFO åŠä»¥ä¸Šï¼‰ |
| `errors` | `errors.log` | ä»…è­¦å‘Šå’Œé”™è¯¯â€”â€”agent.log çš„è¿‡æ»¤å­é›† |
| `gateway` | `gateway.log` | æ¶ˆæ¯ gateway æ´»åŠ¨â€”â€”å¹³å°è¿žæŽ¥ã€æ¶ˆæ¯è°ƒåº¦ã€webhook äº‹ä»¶ |

### é€‰é¡¹

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `log_name` | è¦æŸ¥çœ‹çš„æ—¥å¿—ï¼š`agent`ï¼ˆé»˜è®¤ï¼‰ã€`errors`ã€`gateway`ï¼Œæˆ– `list` ä»¥æ˜¾ç¤ºå¯ç”¨æ–‡ä»¶åŠå¤§å°ã€‚ |
| `-n`, `--lines <N>` | æ˜¾ç¤ºçš„è¡Œæ•°ï¼ˆé»˜è®¤ï¼š50ï¼‰ã€‚ |
| `-f`, `--follow` | å®žæ—¶è·Ÿè¸ªæ—¥å¿—ï¼Œç±»ä¼¼ `tail -f`ã€‚æŒ‰ Ctrl+C åœæ­¢ã€‚ |
| `--level <LEVEL>` | æ˜¾ç¤ºçš„æœ€ä½Žæ—¥å¿—çº§åˆ«ï¼š`DEBUG`ã€`INFO`ã€`WARNING`ã€`ERROR`ã€`CRITICAL`ã€‚ |
| `--session <ID>` | è¿‡æ»¤åŒ…å«ä¼šè¯ ID å­å­—ç¬¦ä¸²çš„è¡Œã€‚ |
| `--since <TIME>` | æ˜¾ç¤ºç›¸å¯¹æ—¶é—´ä¹‹å‰çš„è¡Œï¼š`30m`ã€`1h`ã€`2d` ç­‰ã€‚æ”¯æŒ `s`ï¼ˆç§’ï¼‰ã€`m`ï¼ˆåˆ†é’Ÿï¼‰ã€`h`ï¼ˆå°æ—¶ï¼‰ã€`d`ï¼ˆå¤©ï¼‰ã€‚ |
| `--component <NAME>` | æŒ‰ç»„ä»¶è¿‡æ»¤ï¼š`gateway`ã€`agent`ã€`tools`ã€`cli`ã€`cron`ã€‚ |

### ç¤ºä¾‹

```bash
# æŸ¥çœ‹ agent.log çš„æœ€åŽ 50 è¡Œï¼ˆé»˜è®¤ï¼‰
zed logs

# å®žæ—¶è·Ÿè¸ª agent.log
zed logs -f

# æŸ¥çœ‹ gateway.log çš„æœ€åŽ 100 è¡Œ
zed logs gateway -n 100

# ä»…æ˜¾ç¤ºæœ€è¿‘ä¸€å°æ—¶çš„è­¦å‘Šå’Œé”™è¯¯
zed logs --level WARNING --since 1h

# æŒ‰ç‰¹å®šä¼šè¯è¿‡æ»¤
zed logs --session abc123

# ä»Ž 30 åˆ†é’Ÿå‰å¼€å§‹è·Ÿè¸ª errors.log
zed logs errors --since 30m -f

# åˆ—å‡ºæ‰€æœ‰æ—¥å¿—æ–‡ä»¶åŠå…¶å¤§å°
zed logs list
```

### è¿‡æ»¤

è¿‡æ»¤å™¨å¯ä»¥ç»„åˆä½¿ç”¨ã€‚å½“å¤šä¸ªè¿‡æ»¤å™¨åŒæ—¶æ¿€æ´»æ—¶ï¼Œæ—¥å¿—è¡Œå¿…é¡»é€šè¿‡**æ‰€æœ‰**è¿‡æ»¤å™¨æ‰ä¼šæ˜¾ç¤ºï¼š

```bash
# æœ€è¿‘ 2 å°æ—¶å†…åŒ…å«ä¼šè¯ "tg-12345" çš„ WARNING+ è¡Œ
zed logs --level WARNING --since 2h --session tg-12345
```

å½“ `--since` æ¿€æ´»æ—¶ï¼Œæ²¡æœ‰å¯è§£æžæ—¶é—´æˆ³çš„è¡Œä¼šè¢«åŒ…å«ï¼ˆå®ƒä»¬å¯èƒ½æ˜¯å¤šè¡Œæ—¥å¿—æ¡ç›®çš„ç»­è¡Œï¼‰ã€‚å½“ `--level` æ¿€æ´»æ—¶ï¼Œæ²¡æœ‰å¯æ£€æµ‹çº§åˆ«çš„è¡Œä¼šè¢«åŒ…å«ã€‚

### æ—¥å¿—è½®è½¬

Zed ä½¿ç”¨ Python çš„ `RotatingFileHandler`ã€‚æ—§æ—¥å¿—ä¼šè‡ªåŠ¨è½®è½¬â€”â€”æŸ¥æ‰¾ `agent.log.1`ã€`agent.log.2` ç­‰ã€‚`zed logs list` å­å‘½ä»¤æ˜¾ç¤ºæ‰€æœ‰æ—¥å¿—æ–‡ä»¶ï¼ŒåŒ…æ‹¬å·²è½®è½¬çš„ã€‚

## `zed config`

```bash
zed config <subcommand>
```

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `show` | æ˜¾ç¤ºå½“å‰ config å€¼ã€‚ |
| `edit` | åœ¨ç¼–è¾‘å™¨ä¸­æ‰“å¼€ `config.yaml`ã€‚ |
| `set <key> <value>` | è®¾ç½® config å€¼ã€‚ |
| `path` | æ‰“å° config æ–‡ä»¶è·¯å¾„ã€‚ |
| `env-path` | æ‰“å° `.env` æ–‡ä»¶è·¯å¾„ã€‚ |
| `check` | æ£€æŸ¥ç¼ºå¤±æˆ–è¿‡æœŸçš„ configã€‚ |
| `migrate` | äº¤äº’å¼æ·»åŠ æ–°å¼•å…¥çš„é€‰é¡¹ã€‚ |

## `zed pairing`

```bash
zed pairing <list|approve|revoke|clear-pending>
```

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `list` | æ˜¾ç¤ºå¾…å¤„ç†å’Œå·²å®¡æ‰¹çš„ç”¨æˆ·ã€‚ |
| `approve <platform> <code>` | å®¡æ‰¹é…å¯¹ç ã€‚ |
| `revoke <platform> <user-id>` | æ’¤é”€ç”¨æˆ·çš„è®¿é—®æƒé™ã€‚ |
| `clear-pending` | æ¸…é™¤å¾…å¤„ç†çš„é…å¯¹ç ã€‚ |

## `zed skills`

```bash
zed skills <subcommand>
```

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `browse` | åˆ†é¡µæµè§ˆ skill æ³¨å†Œè¡¨ã€‚ |
| `search` | æœç´¢ skill æ³¨å†Œè¡¨ã€‚ |
| `install` | å®‰è£… skillã€‚ |
| `inspect` | é¢„è§ˆ skill è€Œä¸å®‰è£…ã€‚ |
| `list` | åˆ—å‡ºå·²å®‰è£…çš„ skillã€‚ |
| `check` | æ£€æŸ¥å·²å®‰è£…çš„ hub skill æ˜¯å¦æœ‰ä¸Šæ¸¸æ›´æ–°ã€‚ |
| `update` | åœ¨æœ‰ä¸Šæ¸¸å˜æ›´æ—¶é‡æ–°å®‰è£… hub skillã€‚ |
| `audit` | é‡æ–°æ‰«æå·²å®‰è£…çš„ hub skillã€‚ |
| `uninstall` | åˆ é™¤é€šè¿‡ hub å®‰è£…çš„ skillã€‚ |
| `reset` | é€šè¿‡æ¸…é™¤ manifest æ¡ç›®ï¼Œå–æ¶ˆå°†æ†ç»‘ skill æ ‡è®°ä¸º `user_modified` çš„çŠ¶æ€ã€‚ä½¿ç”¨ `--restore` æ—¶ï¼Œè¿˜ä¼šå°†ç”¨æˆ·å‰¯æœ¬æ›¿æ¢ä¸ºæ†ç»‘ç‰ˆæœ¬ã€‚ |
| `publish` | å°† skill å‘å¸ƒåˆ°æ³¨å†Œè¡¨ã€‚ |
| `snapshot` | å¯¼å‡º/å¯¼å…¥ skill é…ç½®ã€‚ |
| `tap` | ç®¡ç†è‡ªå®šä¹‰ skill æ¥æºã€‚ |
| `config` | æŒ‰å¹³å°äº¤äº’å¼å¯ç”¨/ç¦ç”¨ skill é…ç½®ã€‚ |

å¸¸ç”¨ç¤ºä¾‹ï¼š

```bash
zed skills browse
zed skills browse --source official
zed skills search react --source skills-sh
zed skills search https://mintlify.com/docs --source well-known
zed skills inspect official/security/1password
zed skills inspect skills-sh/vercel-labs/json-render/json-render-react
zed skills install official/migration/openclaw-migration
zed skills install skills-sh/anthropics/skills/pdf --force
zed skills install https://sharethis.chat/SKILL.md                     # ç›´æŽ¥ URLï¼ˆå•æ–‡ä»¶ SKILL.mdï¼‰
zed skills install https://example.com/SKILL.md --name my-skill        # frontmatter æ— åç§°æ—¶è¦†ç›–åç§°
zed skills check
zed skills update
zed skills config
zed skills reset google-workspace
zed skills reset google-workspace --restore --yes
```

æ³¨æ„ï¼š
- `--force` å¯ä»¥è¦†ç›–ç¬¬ä¸‰æ–¹/ç¤¾åŒº skill çš„éžå±é™©æ€§ç­–ç•¥é˜»æ­¢ã€‚
- `--force` ä¸è¦†ç›– `dangerous` æ‰«æç»“è®ºã€‚
- `--source skills-sh` æœç´¢å…¬å…± `skills.sh` ç›®å½•ã€‚
- `--source well-known` å…è®¸ä½ å°† Zed æŒ‡å‘æš´éœ² `/.well-known/skills/index.json` çš„ç«™ç‚¹ã€‚
- `--source browse-sh` æœç´¢ [browse.sh](https://browse.sh) åŒ…å« 200+ ç«™ç‚¹ç‰¹å®šæµè§ˆå™¨è‡ªåŠ¨åŒ– skill çš„ç›®å½•ã€‚æ ‡è¯†ç¬¦å½¢å¦‚ `browse-sh/airbnb.com/search-listings-ddgioa`ã€‚
- ä¼ å…¥ `http(s)://â€¦/*.md` URL å¯ç›´æŽ¥å®‰è£…å•æ–‡ä»¶ SKILL.mdã€‚å½“ frontmatter æ²¡æœ‰ `name:` ä¸” URL slug ä¸æ˜¯æœ‰æ•ˆæ ‡è¯†ç¬¦æ—¶ï¼Œäº¤äº’å¼ç»ˆç«¯ä¼šæç¤ºè¾“å…¥åç§°ï¼›éžäº¤äº’å¼ç•Œé¢ï¼ˆTUI å†…çš„ `/skills install`ã€gateway å¹³å°ï¼‰éœ€è¦æ”¹ç”¨ `--name <x>`ã€‚

## `zed bundles`

```bash
zed bundles <subcommand>
```

Skill bundle å°†å¤šä¸ª skill å½’ç»„åˆ°ä¸€ä¸ª `/<bundle-name>` æ–œæ å‘½ä»¤ä¸‹ã€‚è°ƒç”¨ bundle ä¼šå°†æ¯ä¸ªå¼•ç”¨çš„ skill åŠ è½½åˆ°å•ä¸ªåˆå¹¶çš„ç”¨æˆ·æ¶ˆæ¯ä¸­ã€‚å­˜å‚¨ä½ç½®ï¼š`~/.zed/skill-bundles/<slug>.yaml`ã€‚YAML schema å’Œè¡Œä¸ºè¯·å‚é˜… [Skill Bundles](../user-guide/features/skills.md#skill-bundles)ã€‚

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `list` | åˆ—å‡ºå·²å®‰è£…çš„ bundleï¼ˆä¸å¸¦å­å‘½ä»¤æ—¶çš„é»˜è®¤è¡Œä¸ºï¼‰ |
| `show <name>` | æ˜¾ç¤ºæŸä¸ª bundle çš„åç§°ã€æè¿°ã€skill å’Œæ–‡ä»¶è·¯å¾„ |
| `create <name>` | åˆ›å»ºæ–° bundleã€‚ä¼ å…¥ `--skill <id>`ï¼ˆå¯é‡å¤ï¼‰æˆ–çœç•¥ä»¥è¿›è¡Œäº¤äº’å¼è¾“å…¥ã€‚æ”¯æŒ `--description`ã€`--instruction`ã€`--force`ã€‚ |
| `delete <name>` | åˆ é™¤ bundle æ–‡ä»¶ |
| `reload` | é‡æ–°æ‰«æ `~/.zed/skill-bundles/` å¹¶æŠ¥å‘Šæ–°å¢ž/åˆ é™¤çš„ bundle |

ç¤ºä¾‹ï¼š

```bash
zed bundles create backend-dev \
  --skill github-code-review \
  --skill test-driven-development \
  --skill github-pr-workflow \
  -d "Backend feature work"

zed bundles list
zed bundles show backend-dev
zed bundles delete backend-dev
```

åœ¨èŠå¤©ä¼šè¯ä¸­ï¼Œ`/bundles` åˆ—å‡ºå·²å®‰è£…çš„ bundleï¼Œ`/<bundle-name>` åŠ è½½æŸä¸ª bundleã€‚

## `zed curator`

```bash
zed curator <subcommand>
```

Curator æ˜¯ä¸€ä¸ªè¾…åŠ©æ¨¡åž‹åŽå°ä»»åŠ¡ï¼Œå®šæœŸå®¡æŸ¥ agent åˆ›å»ºçš„ skillï¼Œä¿®å‰ªè¿‡æœŸçš„ï¼Œåˆå¹¶é‡å çš„ï¼Œå¹¶å½’æ¡£è¿‡æ—¶çš„ã€‚æ†ç»‘å’Œé€šè¿‡ hub å®‰è£…çš„ skill ä¸ä¼šè¢«è§¦åŠã€‚å½’æ¡£å¯æ¢å¤ï¼›ä¸ä¼šå‘ç”Ÿè‡ªåŠ¨åˆ é™¤ã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `status` | æ˜¾ç¤º curator çŠ¶æ€å’Œ skill ç»Ÿè®¡ |
| `run` | ç«‹å³è§¦å‘ curator å®¡æŸ¥ï¼ˆé˜»å¡žç›´åˆ° LLM å¤„ç†å®Œæˆï¼‰ |
| `run --background` | åœ¨åŽå°çº¿ç¨‹ä¸­å¯åŠ¨ LLM å¤„ç†å¹¶ç«‹å³è¿”å›ž |
| `run --dry-run` | ä»…é¢„è§ˆâ€”â€”ç”Ÿæˆå®¡æŸ¥æŠ¥å‘Šä½†ä¸è¿›è¡Œä»»ä½•ä¿®æ”¹ |
| `backup` | æ‰‹åŠ¨å¯¹ `~/.zed/skills/` è¿›è¡Œ tar.gz å¿«ç…§ï¼ˆcurator åœ¨æ¯æ¬¡çœŸå®žè¿è¡Œå‰ä¹Ÿä¼šè‡ªåŠ¨å¿«ç…§ï¼‰ |
| `rollback` | ä»Žå¿«ç…§æ¢å¤ `~/.zed/skills/`ï¼ˆé»˜è®¤ä½¿ç”¨æœ€æ–°å¿«ç…§ï¼‰ |
| `rollback --list` | åˆ—å‡ºå¯ç”¨å¿«ç…§ |
| `rollback --id <ts>` | æŒ‰ id æ¢å¤ç‰¹å®šå¿«ç…§ |
| `rollback -y` | è·³è¿‡ç¡®è®¤æç¤º |
| `pause` | æš‚åœ curator ç›´åˆ°æ¢å¤ |
| `resume` | æ¢å¤å·²æš‚åœçš„ curator |
| `pin <skill>` | å›ºå®š skillï¼Œä½¿ curator æ°¸ä¸è‡ªåŠ¨è½¬æ¢å…¶çŠ¶æ€ |
| `unpin <skill>` | å–æ¶ˆå›ºå®š skill |
| `restore <skill>` | æ¢å¤å·²å½’æ¡£çš„ skill |
| `archive <skill>` | æ‰‹åŠ¨å½’æ¡£ skill |
| `prune` | æ‰‹åŠ¨ä¿®å‰ª curator é€šå¸¸ä¼šæ¸…ç†çš„ skill |
| `list-archived` | åˆ—å‡ºå·²å½’æ¡£çš„ skillï¼ˆå¯é€šè¿‡ `restore` æ¢å¤ï¼‰ |

åœ¨å…¨æ–°å®‰è£…æ—¶ï¼Œç¬¬ä¸€æ¬¡è®¡åˆ’è¿è¡Œä¼šå»¶è¿Ÿä¸€ä¸ªå®Œæ•´çš„ `interval_hours`ï¼ˆé»˜è®¤ 7 å¤©ï¼‰â€”â€”gateway ä¸ä¼šåœ¨ `zed update` åŽçš„ç¬¬ä¸€æ¬¡ tick æ—¶ç«‹å³æ‰§è¡Œ curatorã€‚ä½¿ç”¨ `zed curator run --dry-run` åœ¨æ­¤ä¹‹å‰é¢„è§ˆã€‚

è¡Œä¸ºå’Œé…ç½®è¯·å‚é˜… [Curator](../user-guide/features/curator.md)ã€‚

## `zed fallback`

```bash
zed fallback <subcommand>
```

ç®¡ç† fallback provider é“¾ã€‚å½“ä¸»æ¨¡åž‹å› é€ŸçŽ‡é™åˆ¶ã€è¿‡è½½æˆ–è¿žæŽ¥é”™è¯¯è€Œå¤±è´¥æ—¶ï¼ŒæŒ‰é¡ºåºå°è¯• fallback providerã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `list`ï¼ˆåˆ«åï¼š`ls`ï¼‰ | æ˜¾ç¤ºå½“å‰ fallback é“¾ï¼ˆä¸å¸¦å­å‘½ä»¤æ—¶çš„é»˜è®¤è¡Œä¸ºï¼‰ |
| `add` | é€‰æ‹© provider + æ¨¡åž‹ï¼ˆä¸Ž `zed model` ç›¸åŒçš„é€‰æ‹©å™¨ï¼‰å¹¶è¿½åŠ åˆ°é“¾æœ«å°¾ |
| `remove`ï¼ˆåˆ«åï¼š`rm`ï¼‰ | é€‰æ‹©è¦ä»Žé“¾ä¸­åˆ é™¤çš„æ¡ç›® |
| `clear` | åˆ é™¤æ‰€æœ‰ fallback æ¡ç›® |

å‚è§ [Fallback Providers](../user-guide/features/fallback-providers.md)ã€‚

## `zed hooks`

```bash
zed hooks <subcommand>
```

æ£€æŸ¥ `~/.zed/config.yaml` ä¸­å£°æ˜Žçš„ shell è„šæœ¬ hookï¼Œé’ˆå¯¹åˆæˆ payload æµ‹è¯•å®ƒä»¬ï¼Œå¹¶ç®¡ç† `~/.zed/shell-hooks-allowlist.json` å¤„çš„é¦–æ¬¡ä½¿ç”¨åŒæ„è®¸å¯åå•ã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `list`ï¼ˆåˆ«åï¼š`ls`ï¼‰ | åˆ—å‡ºå·²é…ç½®çš„ hook åŠå…¶åŒ¹é…å™¨ã€è¶…æ—¶å’ŒåŒæ„çŠ¶æ€ |
| `test <event>` | é’ˆå¯¹åˆæˆ payload è§¦å‘åŒ¹é… `<event>` çš„æ‰€æœ‰ hook |
| `revoke`ï¼ˆåˆ«åï¼š`remove`ã€`rm`ï¼‰ | åˆ é™¤æŸä¸ªå‘½ä»¤çš„è®¸å¯åå•æ¡ç›®ï¼ˆä¸‹æ¬¡é‡å¯åŽç”Ÿæ•ˆï¼‰ |
| `doctor` | æ£€æŸ¥æ¯ä¸ªå·²é…ç½®çš„ hookï¼šå¯æ‰§è¡Œä½ã€è®¸å¯åå•ã€mtime æ¼‚ç§»ã€JSON æœ‰æ•ˆæ€§å’Œåˆæˆè¿è¡Œè®¡æ—¶ |

äº‹ä»¶ç­¾åå’Œ payload æ ¼å¼è¯·å‚é˜… [Hooks](../user-guide/features/hooks.md)ã€‚

## `zed memory`

```bash
zed memory <subcommand>
```

è®¾ç½®å’Œç®¡ç†å¤–éƒ¨ memory provider pluginã€‚å¯ç”¨ providerï¼šhonchoã€openvikingã€mem0ã€hindsightã€holographicã€retaindbã€byteroverã€supermemoryã€‚åŒä¸€æ—¶é—´åªèƒ½æœ‰ä¸€ä¸ªå¤–éƒ¨ provider å¤„äºŽæ´»è·ƒçŠ¶æ€ã€‚å†…ç½® memoryï¼ˆMEMORY.md/USER.mdï¼‰å§‹ç»ˆå¤„äºŽæ´»è·ƒçŠ¶æ€ã€‚

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `setup` | äº¤äº’å¼ provider é€‰æ‹©å’Œé…ç½®ã€‚ |
| `status` | æ˜¾ç¤ºå½“å‰ memory provider é…ç½®ã€‚ |
| `off` | ç¦ç”¨å¤–éƒ¨ providerï¼ˆä»…ä½¿ç”¨å†…ç½®ï¼‰ã€‚ |

:::info Provider ç‰¹å®šå­å‘½ä»¤
å½“å¤–éƒ¨ memory provider å¤„äºŽæ´»è·ƒçŠ¶æ€æ—¶ï¼Œå®ƒå¯èƒ½ä¼šæ³¨å†Œè‡ªå·±çš„é¡¶çº§ `zed <provider>` å‘½ä»¤ç”¨äºŽ provider ç‰¹å®šç®¡ç†ï¼ˆä¾‹å¦‚ Honcho æ¿€æ´»æ—¶çš„ `zed honcho`ï¼‰ã€‚æœªæ¿€æ´»çš„ provider ä¸æš´éœ²å…¶å­å‘½ä»¤ã€‚è¿è¡Œ `zed --help` æŸ¥çœ‹å½“å‰å·²è¿žæŽ¥çš„å‘½ä»¤ã€‚
:::

## `zed acp`

```bash
zed acp
```

å°† Zed ä½œä¸º ACPï¼ˆAgent Client Protocolï¼‰stdio æœåŠ¡å™¨å¯åŠ¨ï¼Œç”¨äºŽç¼–è¾‘å™¨é›†æˆã€‚

ç›¸å…³å…¥å£ï¼š

```bash
zed-acp
python -m acp_adapter
```

é¦–å…ˆå®‰è£…æ”¯æŒï¼š

```bash
pip install -e '.[acp]'
```

å‚è§ [ACP ç¼–è¾‘å™¨é›†æˆ](../user-guide/features/acp.md) å’Œ [ACP å†…éƒ¨åŽŸç†](../developer-guide/acp-internals.md)ã€‚

## `zed mcp`

```bash
zed mcp <subcommand>
```

ç®¡ç† MCPï¼ˆModel Context Protocolï¼‰æœåŠ¡å™¨é…ç½®ï¼Œå¹¶å°† Zed ä½œä¸º MCP æœåŠ¡å™¨è¿è¡Œã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `serve [-v\|--verbose]` | å°† Zed ä½œä¸º MCP æœåŠ¡å™¨è¿è¡Œâ€”â€”å‘å…¶ä»– agent æš´éœ²å¯¹è¯ã€‚ |
| `add <name> [--url URL] [--command CMD] [--args ...] [--auth oauth\|header]` | æ·»åŠ  MCP æœåŠ¡å™¨å¹¶è‡ªåŠ¨å‘çŽ°å·¥å…·ã€‚ |
| `remove <name>`ï¼ˆåˆ«åï¼š`rm`ï¼‰ | ä»Ž config ä¸­åˆ é™¤ MCP æœåŠ¡å™¨ã€‚ |
| `list`ï¼ˆåˆ«åï¼š`ls`ï¼‰ | åˆ—å‡ºå·²é…ç½®çš„ MCP æœåŠ¡å™¨ã€‚ |
| `test <name>` | æµ‹è¯•ä¸Ž MCP æœåŠ¡å™¨çš„è¿žæŽ¥ã€‚ |
| `configure <name>`ï¼ˆåˆ«åï¼š`config`ï¼‰ | åˆ‡æ¢æœåŠ¡å™¨çš„å·¥å…·é€‰æ‹©ã€‚ |
| `login <name>` | å¼ºåˆ¶é‡æ–°è®¤è¯åŸºäºŽ OAuth çš„ MCP æœåŠ¡å™¨ã€‚ |

å‚è§ [MCP é…ç½®å‚è€ƒ](./mcp-config-reference.md)ã€[åœ¨ Zed ä¸­ä½¿ç”¨ MCP](../guides/use-mcp-with-zed.md) å’Œ [MCP æœåŠ¡å™¨æ¨¡å¼](../user-guide/features/mcp.md#running-zed-as-an-mcp-server)ã€‚

## `zed plugins`

```bash
zed plugins [subcommand]
```

ç»Ÿä¸€çš„ plugin ç®¡ç†â€”â€”é€šç”¨ pluginã€memory provider å’Œ context engine é›†äºŽä¸€å¤„ã€‚ä¸å¸¦å­å‘½ä»¤è¿è¡Œ `zed plugins` ä¼šæ‰“å¼€åŒ…å«ä¸¤ä¸ªéƒ¨åˆ†çš„å¤åˆäº¤äº’ç•Œé¢ï¼š

- **General Plugins** â€” å¤šé€‰å¤é€‰æ¡†ï¼Œç”¨äºŽå¯ç”¨/ç¦ç”¨å·²å®‰è£…çš„ plugin
- **Provider Plugins** â€” å•é€‰é…ç½®ï¼Œç”¨äºŽ Memory Provider å’Œ Context Engineã€‚åœ¨æŸä¸ªç±»åˆ«ä¸ŠæŒ‰ ENTER æ‰“å¼€å•é€‰é€‰æ‹©å™¨ã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| *ï¼ˆæ— ï¼‰* | å¤åˆäº¤äº’ç•Œé¢â€”â€”é€šç”¨ plugin åˆ‡æ¢ + provider plugin é…ç½®ã€‚ |
| `install <identifier> [--force]` | ä»Ž Git URL æˆ– `owner/repo` å®‰è£… pluginã€‚ |
| `update <name>` | æ‹‰å–å·²å®‰è£… plugin çš„æœ€æ–°å˜æ›´ã€‚ |
| `remove <name>`ï¼ˆåˆ«åï¼š`rm`ã€`uninstall`ï¼‰ | åˆ é™¤å·²å®‰è£…çš„ pluginã€‚ |
| `enable <name>` | å¯ç”¨å·²ç¦ç”¨çš„ pluginã€‚ |
| `disable <name>` | ç¦ç”¨ plugin è€Œä¸åˆ é™¤ã€‚ |
| `list`ï¼ˆåˆ«åï¼š`ls`ï¼‰ | åˆ—å‡ºå·²å®‰è£…çš„ plugin åŠå¯ç”¨/ç¦ç”¨çŠ¶æ€ã€‚ |

Provider plugin é€‰æ‹©ä¿å­˜åˆ° `config.yaml`ï¼š
- `memory.provider` â€” æ´»è·ƒ memory providerï¼ˆä¸ºç©º = ä»…å†…ç½®ï¼‰
- `context.engine` â€” æ´»è·ƒ context engineï¼ˆ`"compressor"` = å†…ç½®é»˜è®¤å€¼ï¼‰

é€šç”¨ plugin ç¦ç”¨åˆ—è¡¨å­˜å‚¨åœ¨ `config.yaml` çš„ `plugins.disabled` ä¸‹ã€‚

å‚è§ [Plugins](../user-guide/features/plugins.md) å’Œ [æž„å»º Zed Plugin](../guides/build-a-zed-plugin.md)ã€‚

## `zed tools`

```bash
zed tools [--summary]
```

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--summary` | æ‰“å°å½“å‰å·²å¯ç”¨å·¥å…·æ‘˜è¦å¹¶é€€å‡ºã€‚ |

ä¸å¸¦ `--summary` æ—¶ï¼Œå¯åŠ¨äº¤äº’å¼æŒ‰å¹³å°å·¥å…·é…ç½®ç•Œé¢ã€‚

## `zed computer-use`

```bash
zed computer-use <subcommand>
```

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `install` | è¿è¡Œä¸Šæ¸¸ cua-driver å®‰è£…ç¨‹åºï¼ˆä»… macOSï¼‰ã€‚ |
| `install --upgrade` | å³ä½¿ cua-driver å·²åœ¨ PATH ä¸­ä¹Ÿé‡æ–°è¿è¡Œå®‰è£…ç¨‹åºã€‚ä¸Šæ¸¸è„šæœ¬å§‹ç»ˆæ‹‰å–æœ€æ–°ç‰ˆæœ¬ï¼Œå› æ­¤è¿™ä¼šæ‰§è¡ŒåŽŸåœ°å‡çº§ã€‚ |
| `status` | æ‰“å° `cua-driver` æ˜¯å¦åœ¨ `$PATH` ä¸­ä»¥åŠå·²å®‰è£…çš„ç‰ˆæœ¬ã€‚ |

`zed computer-use install` æ˜¯å®‰è£… `computer_use` toolset ä½¿ç”¨çš„ [cua-driver](https://github.com/trycua/cua) äºŒè¿›åˆ¶æ–‡ä»¶çš„ç¨³å®šå…¥å£ã€‚å®ƒè¿è¡Œä¸Žé¦–æ¬¡å¯ç”¨ Computer Use æ—¶ `zed tools` è°ƒç”¨çš„ç›¸åŒä¸Šæ¸¸å®‰è£…ç¨‹åºï¼Œå› æ­¤å¦‚æžœ toolset åˆ‡æ¢æœªè§¦å‘å®‰è£…ï¼ˆä¾‹å¦‚åœ¨å·²é…ç½®ç”¨æˆ·çš„è®¾ç½®ä¸­ï¼‰ï¼Œå¯ä»¥å®‰å…¨åœ°ç”¨äºŽé‡æ–°è¿è¡Œå®‰è£…ã€‚

`zed update` åœ¨æ›´æ–°ç»“æŸæ—¶ï¼Œå¦‚æžœ cua-driver åœ¨ PATH ä¸­ï¼Œä¼šè‡ªåŠ¨é‡æ–°è¿è¡Œä¸Šæ¸¸å®‰è£…ç¨‹åºï¼Œå› æ­¤å¤§å¤šæ•°ç”¨æˆ·ä¸éœ€è¦æ‰‹åŠ¨è°ƒç”¨ `--upgrade`ã€‚å½“ä¸Šæ¸¸å‘å¸ƒäº†ä½ çŽ°åœ¨å°±æƒ³è¦çš„ä¿®å¤ï¼Œè€Œä¸æƒ³ç­‰å¾…ä¸‹æ¬¡ Zed æ›´æ–°æ—¶ï¼Œä½¿ç”¨æ­¤é€‰é¡¹ã€‚

## `zed sessions`

```bash
zed sessions <subcommand>
```

å­å‘½ä»¤ï¼š

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `list` | åˆ—å‡ºæœ€è¿‘çš„ä¼šè¯ã€‚ |
| `browse` | å¸¦æœç´¢å’Œæ¢å¤åŠŸèƒ½çš„äº¤äº’å¼ä¼šè¯é€‰æ‹©å™¨ã€‚ |
| `export <output> [--session-id ID]` | å°†ä¼šè¯å¯¼å‡ºä¸º JSONLã€‚ |
| `delete <session-id>` | åˆ é™¤å•ä¸ªä¼šè¯ã€‚ |
| `prune` | åˆ é™¤æ—§ä¼šè¯ã€‚ |
| `stats` | æ˜¾ç¤ºä¼šè¯å­˜å‚¨ç»Ÿè®¡ä¿¡æ¯ã€‚ |
| `rename <session-id> <title>` | è®¾ç½®æˆ–æ›´æ”¹ä¼šè¯æ ‡é¢˜ã€‚ |

## `zed insights`

```bash
zed insights [--days N] [--source platform]
```

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--days <n>` | åˆ†æžæœ€è¿‘ `n` å¤©ï¼ˆé»˜è®¤ï¼š30ï¼‰ã€‚ |
| `--source <platform>` | æŒ‰æ¥æºè¿‡æ»¤ï¼Œå¦‚ `cli`ã€`telegram` æˆ– `discord`ã€‚ |

## `zed claw`

```bash
zed claw migrate [options]
```

å°† OpenClaw è®¾ç½®è¿ç§»åˆ° Zedã€‚ä»Ž `~/.openclaw`ï¼ˆæˆ–è‡ªå®šä¹‰è·¯å¾„ï¼‰è¯»å–å¹¶å†™å…¥ `~/.zed`ã€‚è‡ªåŠ¨æ£€æµ‹æ—§ç‰ˆç›®å½•åï¼ˆ`~/.clawdbot`ã€`~/.moltbot`ï¼‰å’Œé…ç½®æ–‡ä»¶åï¼ˆ`clawdbot.json`ã€`moltbot.json`ï¼‰ã€‚

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--dry-run` | é¢„è§ˆå°†è¿ç§»çš„å†…å®¹è€Œä¸å†™å…¥ä»»ä½•å†…å®¹ã€‚ |
| `--preset <name>` | è¿ç§»é¢„è®¾ï¼š`full`ï¼ˆæ‰€æœ‰å…¼å®¹è®¾ç½®ï¼‰æˆ– `user-data`ï¼ˆæŽ’é™¤åŸºç¡€è®¾æ–½é…ç½®ï¼‰ã€‚ä¸¤ç§é¢„è®¾éƒ½ä¸å¯¼å…¥å¯†é’¥â€”â€”éœ€è¦æ˜¾å¼ä¼ å…¥ `--migrate-secrets`ã€‚ |
| `--overwrite` | åœ¨å†²çªæ—¶è¦†ç›–çŽ°æœ‰ Zed æ–‡ä»¶ï¼ˆé»˜è®¤ï¼šå½“è®¡åˆ’æœ‰å†²çªæ—¶æ‹’ç»åº”ç”¨ï¼‰ã€‚ |
| `--migrate-secrets` | åœ¨è¿ç§»ä¸­åŒ…å« API å¯†é’¥ã€‚å³ä½¿åœ¨ `--preset full` ä¸‹ä¹Ÿéœ€è¦æ˜¾å¼æŒ‡å®šã€‚ |
| `--no-backup` | è·³è¿‡è¿ç§»å‰å¯¹ `~/.zed/` çš„ zip å¿«ç…§ï¼ˆé»˜è®¤æƒ…å†µä¸‹ï¼Œåœ¨åº”ç”¨å‰ä¼šå°†å•ä¸ªè¿˜åŽŸç‚¹å½’æ¡£å†™å…¥ `~/.zed/backups/pre-migration-*.zip`ï¼›å¯ç”¨ `zed import` æ¢å¤ï¼‰ã€‚ |
| `--source <path>` | è‡ªå®šä¹‰ OpenClaw ç›®å½•ï¼ˆé»˜è®¤ï¼š`~/.openclaw`ï¼‰ã€‚ |
| `--workspace-target <path>` | å·¥ä½œåŒºè¯´æ˜Žï¼ˆAGENTS.mdï¼‰çš„ç›®æ ‡ç›®å½•ã€‚ |
| `--skill-conflict <mode>` | å¤„ç† skill åç§°å†²çªï¼š`skip`ï¼ˆé»˜è®¤ï¼‰ã€`overwrite` æˆ– `rename`ã€‚ |
| `--yes` | è·³è¿‡ç¡®è®¤æç¤ºã€‚ |

### è¿ç§»å†…å®¹

è¿ç§»æ¶µç›– 30+ ä¸ªç±»åˆ«ï¼ŒåŒ…æ‹¬ personaã€memoryã€skillã€æ¨¡åž‹ providerã€æ¶ˆæ¯å¹³å°ã€agent è¡Œä¸ºã€ä¼šè¯ç­–ç•¥ã€MCP æœåŠ¡å™¨ã€TTS ç­‰ã€‚æ¡ç›®è¦ä¹ˆ**ç›´æŽ¥å¯¼å…¥**åˆ° Zed ç­‰æ•ˆé¡¹ï¼Œè¦ä¹ˆ**å½’æ¡£**ä»¥ä¾›æ‰‹åŠ¨å®¡æŸ¥ã€‚

**ç›´æŽ¥å¯¼å…¥ï¼š** SOUL.mdã€MEMORY.mdã€USER.mdã€AGENTS.mdã€skillï¼ˆ4 ä¸ªæºç›®å½•ï¼‰ã€é»˜è®¤æ¨¡åž‹ã€è‡ªå®šä¹‰ providerã€MCP æœåŠ¡å™¨ã€æ¶ˆæ¯å¹³å° token å’Œè®¸å¯åå•ï¼ˆTelegramã€Discordã€Slackã€WhatsAppã€Signalã€Matrixã€Mattermostï¼‰ã€agent é»˜è®¤å€¼ï¼ˆæŽ¨ç†åŠªåŠ›ç¨‹åº¦ã€åŽ‹ç¼©ã€äººå·¥å»¶è¿Ÿã€æ—¶åŒºã€æ²™ç®±ï¼‰ã€ä¼šè¯é‡ç½®ç­–ç•¥ã€å®¡æ‰¹è§„åˆ™ã€TTS é…ç½®ã€æµè§ˆå™¨è®¾ç½®ã€å·¥å…·è®¾ç½®ã€æ‰§è¡Œè¶…æ—¶ã€å‘½ä»¤è®¸å¯åå•ã€gateway é…ç½®ä»¥åŠæ¥è‡ª 3 ä¸ªæ¥æºçš„ API å¯†é’¥ã€‚

**å½’æ¡£ä»¥ä¾›æ‰‹åŠ¨å®¡æŸ¥ï¼š** Cron ä»»åŠ¡ã€pluginã€hook/webhookã€memory åŽç«¯ï¼ˆQMDï¼‰ã€skill æ³¨å†Œè¡¨é…ç½®ã€UI/èº«ä»½ã€æ—¥å¿—ã€å¤š agent è®¾ç½®ã€é¢‘é“ç»‘å®šã€IDENTITY.mdã€TOOLS.mdã€HEARTBEAT.mdã€BOOTSTRAP.mdã€‚

**API å¯†é’¥è§£æž**æŒ‰ä¼˜å…ˆçº§é¡ºåºæ£€æŸ¥ä¸‰ä¸ªæ¥æºï¼šconfig å€¼ â†’ `~/.openclaw/.env` â†’ `auth-profiles.json`ã€‚æ‰€æœ‰ token å­—æ®µå¤„ç†çº¯å­—ç¬¦ä¸²ã€çŽ¯å¢ƒå˜é‡æ¨¡æ¿ï¼ˆ`${VAR}`ï¼‰å’Œ SecretRef å¯¹è±¡ã€‚

å®Œæ•´çš„ config é”®æ˜ å°„ã€SecretRef å¤„ç†è¯¦æƒ…å’Œè¿ç§»åŽæ£€æŸ¥æ¸…å•ï¼Œè¯·å‚é˜…**[å®Œæ•´è¿ç§»æŒ‡å—](../guides/migrate-from-openclaw.md)**ã€‚

### ç¤ºä¾‹

```bash
# é¢„è§ˆå°†è¿ç§»çš„å†…å®¹
zed claw migrate --dry-run

# å®Œæ•´è¿ç§»ï¼ˆæ‰€æœ‰å…¼å®¹è®¾ç½®ï¼Œä¸å«å¯†é’¥ï¼‰
zed claw migrate --preset full

# åŒ…å« API å¯†é’¥çš„å®Œæ•´è¿ç§»
zed claw migrate --preset full --migrate-secrets

# ä»…è¿ç§»ç”¨æˆ·æ•°æ®ï¼ˆä¸å«å¯†é’¥ï¼‰ï¼Œè¦†ç›–å†²çª
zed claw migrate --preset user-data --overwrite

# ä»Žè‡ªå®šä¹‰ OpenClaw è·¯å¾„è¿ç§»
zed claw migrate --source /home/user/old-openclaw
```

## `zed dashboard`

```bash
zed dashboard [options]
```

å¯åŠ¨ Web æŽ§åˆ¶å°â€”â€”åŸºäºŽæµè§ˆå™¨çš„ç•Œé¢ï¼Œç”¨äºŽç®¡ç†é…ç½®ã€API å¯†é’¥å’Œç›‘æŽ§ä¼šè¯ã€‚éœ€è¦ `pip install zed-agent[web]`ï¼ˆFastAPI + Uvicornï¼‰ã€‚å†…åµŒæµè§ˆå™¨ Chat æ ‡ç­¾é¡µå§‹ç»ˆå¯ç”¨ï¼Œä½†é¢å¤–éœ€è¦ `pty` extraï¼ˆ`pip install 'zed-agent[web,pty]'`ï¼‰ä»¥åŠ POSIX PTY çŽ¯å¢ƒï¼ˆå¦‚ Linuxã€macOS æˆ– WSL2ï¼‰ã€‚å®Œæ•´æ–‡æ¡£è¯·å‚é˜… [Web æŽ§åˆ¶å°](/user-guide/features/web-dashboard)ã€‚

| é€‰é¡¹ | é»˜è®¤å€¼ | è¯´æ˜Ž |
|--------|---------|-------------|
| `--port` | `9119` | Web æœåŠ¡å™¨è¿è¡Œç«¯å£ |
| `--host` | `127.0.0.1` | ç»‘å®šåœ°å€ |
| `--no-open` | â€” | ä¸è‡ªåŠ¨æ‰“å¼€æµè§ˆå™¨ |
| `--insecure` | å…³é—­ | å…è®¸ç»‘å®šåˆ°éž localhost ä¸»æœºã€‚ä¼šåœ¨ç½‘ç»œä¸Šæš´éœ²æŽ§åˆ¶å°å‡­æ®ï¼›ä»…åœ¨å—ä¿¡ä»»çš„ç½‘ç»œæŽ§åˆ¶ä¸‹ä½¿ç”¨ã€‚ |
| `--stop` | â€” | åœæ­¢æ­£åœ¨è¿è¡Œçš„ `zed dashboard` è¿›ç¨‹å¹¶é€€å‡ºã€‚ |
| `--status` | â€” | åˆ—å‡ºæ­£åœ¨è¿è¡Œçš„ `zed dashboard` è¿›ç¨‹å¹¶é€€å‡ºã€‚ |

```bash
# é»˜è®¤â€”â€”åœ¨æµè§ˆå™¨ä¸­æ‰“å¼€ http://127.0.0.1:9119
zed dashboard

# è‡ªå®šä¹‰ç«¯å£ï¼Œä¸æ‰“å¼€æµè§ˆå™¨
zed dashboard --port 8080 --no-open
```

## `zed profile`

```bash
zed profile <subcommand>
```

ç®¡ç† profileâ€”â€”å¤šä¸ªéš”ç¦»çš„ Zed å®žä¾‹ï¼Œæ¯ä¸ªå®žä¾‹æ‹¥æœ‰è‡ªå·±çš„ configã€ä¼šè¯ã€skill å’Œä¸»ç›®å½•ã€‚

| å­å‘½ä»¤ | è¯´æ˜Ž |
|------------|-------------|
| `list` | åˆ—å‡ºæ‰€æœ‰ profileã€‚ |
| `use <name>` | è®¾ç½®ç²˜æ€§é»˜è®¤ profileã€‚ |
| `create <name> [--clone] [--clone-all] [--clone-from <source>] [--no-alias]` | åˆ›å»ºæ–° profileã€‚`--clone` ä»Žæ´»è·ƒ profile å¤åˆ¶ configã€`.env`ã€`SOUL.md` å’Œ skillsã€‚`--clone-all` å¤åˆ¶æ‰€æœ‰çŠ¶æ€ã€‚`--clone-from` æŒ‡å®šæº profileï¼Œé™¤éžä¸Ž `--clone-all` é…åˆä½¿ç”¨ï¼Œå¦åˆ™ä¼šéšå« config å…‹éš†ã€‚ |
| `delete <name> [-y]` | åˆ é™¤ profileã€‚ |
| `show <name>` | æ˜¾ç¤º profile è¯¦æƒ…ï¼ˆä¸»ç›®å½•ã€config ç­‰ï¼‰ã€‚ |
| `alias <name> [--remove] [--name NAME]` | ç®¡ç†å¿«é€Ÿè®¿é—® profile çš„åŒ…è£…è„šæœ¬ã€‚ |
| `rename <old> <new>` | é‡å‘½å profileã€‚ |
| `export <name> [-o FILE]` | å°† profile å¯¼å‡ºä¸º `.tar.gz` å½’æ¡£ï¼ˆæœ¬åœ°å¤‡ä»½ï¼‰ã€‚ |
| `import <archive> [--name NAME]` | ä»Ž `.tar.gz` å½’æ¡£å¯¼å…¥ profileï¼ˆæœ¬åœ°æ¢å¤ï¼‰ã€‚ |
| `install <source> [--name N] [--alias] [--force] [-y]` | ä»Ž git URL æˆ–æœ¬åœ°ç›®å½•å®‰è£… profile å‘è¡Œç‰ˆã€‚ |
| `update <name> [--force-config] [-y]` | é‡æ–°æ‹‰å–å‘è¡Œç‰ˆï¼›ä¿ç•™ç”¨æˆ·æ•°æ®ï¼ˆmemoryã€ä¼šè¯ã€authï¼‰ã€‚ |
| `info <name>` | æ˜¾ç¤º profile çš„å‘è¡Œç‰ˆ manifestï¼ˆç‰ˆæœ¬ã€ä¾èµ–ã€æ¥æºï¼‰ã€‚ |

ç¤ºä¾‹ï¼š

```bash
zed profile list
zed profile create work --clone
zed profile use work
zed profile alias work --name h-work
zed profile export work -o work-backup.tar.gz
zed profile import work-backup.tar.gz --name restored
zed profile install github.com/user/my-distro --alias
zed profile update work
zed -p work chat -q "Hello from work profile"
```

## `zed completion`

```bash
zed completion [bash|zsh|fish]
```

å°† shell è¡¥å…¨è„šæœ¬æ‰“å°åˆ° stdoutã€‚åœ¨ shell profile ä¸­ source è¾“å‡ºå†…å®¹ï¼Œå³å¯å¯¹ Zed å‘½ä»¤ã€å­å‘½ä»¤å’Œ profile åç§°è¿›è¡Œ Tab è¡¥å…¨ã€‚

ç¤ºä¾‹ï¼š

```bash
# Bash
zed completion bash >> ~/.bashrc

# Zsh
zed completion zsh >> ~/.zshrc

# Fish
zed completion fish > ~/.config/fish/completions/zed.fish
```

## `zed update`

```bash
zed update [--check] [--backup] [--restart-gateway]
```

æ‹‰å–æœ€æ–°çš„ `zed-agent` ä»£ç å¹¶åœ¨ venv ä¸­é‡æ–°å®‰è£…ä¾èµ–ï¼Œç„¶åŽé‡æ–°è¿è¡Œå®‰è£…åŽ hookï¼ˆMCP æœåŠ¡å™¨ã€skill åŒæ­¥ã€è¡¥å…¨å®‰è£…ï¼‰ã€‚å¯åœ¨è¿è¡Œä¸­çš„å®‰è£…ä¸Šå®‰å…¨æ‰§è¡Œã€‚

**pip å®‰è£…ï¼š** `zed update` è‡ªåŠ¨æ£€æµ‹åŸºäºŽ pip çš„å®‰è£…â€”â€”æŸ¥è¯¢ PyPI èŽ·å–æœ€æ–°ç‰ˆæœ¬å¹¶è¿è¡Œ `pip install --upgrade zed-agent`ï¼Œè€Œéž `git pull`ã€‚PyPI å‘å¸ƒè·Ÿè¸ªæ ‡è®°ç‰ˆæœ¬ï¼ˆä¸»è¦/æ¬¡è¦ç‰ˆæœ¬ï¼‰ï¼Œè€Œéž `main` ä¸Šçš„æ¯ä¸ª commitã€‚ä½¿ç”¨ `--check` æŸ¥çœ‹æ˜¯å¦æœ‰æ›´æ–°çš„ PyPI ç‰ˆæœ¬å¯ç”¨ï¼Œè€Œä¸å®‰è£…ã€‚

| é€‰é¡¹ | è¯´æ˜Ž |
|--------|-------------|
| `--check` | å¹¶æŽ’æ‰“å°å½“å‰ commit å’Œæœ€æ–° `origin/main` commitï¼ŒåŒæ­¥æ—¶é€€å‡ºç ä¸º 0ï¼Œè½åŽæ—¶ä¸º 1ã€‚ä¸æ‹‰å–ã€ä¸å®‰è£…ã€ä¸é‡å¯ä»»ä½•å†…å®¹ã€‚ |
| `--backup` | åœ¨æ‹‰å–å‰åˆ›å»º `ZED_HOME` çš„å¸¦æ ‡ç­¾é¢„æ›´æ–°å¿«ç…§ï¼ˆconfigã€authã€ä¼šè¯ã€skillã€é…å¯¹æ•°æ®ï¼‰ã€‚é»˜è®¤**å…³é—­**â€”â€”ä¹‹å‰çš„å§‹ç»ˆå¤‡ä»½è¡Œä¸ºåœ¨å¤§åž‹ä¸»ç›®å½•ä¸Šæ¯æ¬¡æ›´æ–°ä¼šå¢žåŠ æ•°åˆ†é’Ÿã€‚é€šè¿‡ `config.yaml` ä¸­çš„ `update.backup: true` æ°¸ä¹…å¼€å¯ã€‚ |
| `--restart-gateway` | æˆåŠŸæ›´æ–°åŽé‡å¯æ­£åœ¨è¿è¡Œçš„ gateway æœåŠ¡ã€‚å¦‚æžœå®‰è£…äº†å¤šä¸ª profileï¼Œéšå« `--all` è¯­ä¹‰ã€‚ |

é™„åŠ è¡Œä¸ºï¼š

- **é…å¯¹æ•°æ®å¿«ç…§ã€‚** å³ä½¿ `--backup` å…³é—­ï¼Œ`zed update` ä¹Ÿä¼šåœ¨ `git pull` å‰å¯¹ `~/.zed/pairing/` å’Œ Feishu è¯„è®ºè§„åˆ™è¿›è¡Œè½»é‡å¿«ç…§ã€‚å¦‚æžœæ‹‰å–è¦†ç›–äº†ä½ æ­£åœ¨ç¼–è¾‘çš„æ–‡ä»¶ï¼Œå¯ä»¥ç”¨ `zed backup restore --state pre-update` å›žæ»šã€‚
- **æ—§ç‰ˆ `zed.service` è­¦å‘Šã€‚** å¦‚æžœ Zed æ£€æµ‹åˆ°é¢„é‡å‘½åçš„ `zed.service` systemd å•å…ƒï¼ˆè€Œéžå½“å‰çš„ `zed-gateway.service`ï¼‰ï¼Œä¼šæ‰“å°ä¸€æ¬¡æ€§è¿ç§»æç¤ºï¼Œå¸®åŠ©ä½ é¿å…å¾ªçŽ¯é‡å¯é—®é¢˜ã€‚
- **é€€å‡ºç ã€‚** æˆåŠŸæ—¶ä¸º `0`ï¼Œæ‹‰å–/å®‰è£…/å®‰è£…åŽé”™è¯¯æ—¶ä¸º `1`ï¼Œé˜»æ­¢ `git pull` çš„æ„å¤–å·¥ä½œæ ‘å˜æ›´æ—¶ä¸º `2`ã€‚

## ç»´æŠ¤å‘½ä»¤

| å‘½ä»¤ | è¯´æ˜Ž |
|---------|-------------|
| `zed version` | æ‰“å°ç‰ˆæœ¬ä¿¡æ¯ã€‚ |
| `zed update` | æ‹‰å–æœ€æ–°å˜æ›´å¹¶é‡æ–°å®‰è£…ä¾èµ–ã€‚ |
| `zed uninstall [--full] [--yes]` | åˆ é™¤ Zedï¼Œå¯é€‰æ‹©åˆ é™¤æ‰€æœ‰ config/æ•°æ®ã€‚ |

## å¦è¯·å‚é˜…

- [æ–œæ å‘½ä»¤å‚è€ƒ](./slash-commands.md)
- [CLI ç•Œé¢](../user-guide/cli.md)
- [ä¼šè¯](../user-guide/sessions.md)
- [Skill ç³»ç»Ÿ](../user-guide/features/skills.md)
- [çš®è‚¤ä¸Žä¸»é¢˜](../user-guide/features/skins.md)