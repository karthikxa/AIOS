---
title: å‡­è¯æ± 
description: ä¸ºæ¯ä¸ªæä¾›å•†æ± åŒ–å¤šä¸ª API å¯†é’¥æˆ– OAuth ä»¤ç‰Œï¼Œå®žçŽ°è‡ªåŠ¨è½®æ¢å’Œé€ŸçŽ‡é™åˆ¶æ¢å¤ã€‚
sidebar_label: å‡­è¯æ± 
sidebar_position: 9
---

# å‡­è¯æ± 

å‡­è¯æ± å…è®¸ä½ ä¸ºåŒä¸€æä¾›å•†æ³¨å†Œå¤šä¸ª API å¯†é’¥æˆ– OAuth ä»¤ç‰Œã€‚å½“æŸä¸ªå¯†é’¥è§¦è¾¾é€ŸçŽ‡é™åˆ¶æˆ–è®¡è´¹é…é¢æ—¶ï¼ŒZed ä¼šè‡ªåŠ¨è½®æ¢åˆ°ä¸‹ä¸€ä¸ªå¥åº·å¯†é’¥â€”â€”åœ¨ä¸åˆ‡æ¢æä¾›å•†çš„æƒ…å†µä¸‹ä¿æŒä¼šè¯æŒç»­è¿è¡Œã€‚

è¿™ä¸Ž[å¤‡ç”¨æä¾›å•†](./fallback-providers.md)ä¸åŒï¼ŒåŽè€…ä¼šåˆ‡æ¢åˆ°*å¦ä¸€ä¸ª*æä¾›å•†ã€‚å‡­è¯æ± æ˜¯åŒä¸€æä¾›å•†å†…çš„è½®æ¢ï¼›å¤‡ç”¨æä¾›å•†æ˜¯è·¨æä¾›å•†çš„æ•…éšœè½¬ç§»ã€‚æ± ä¼šä¼˜å…ˆå°è¯•â€”â€”å¦‚æžœæ± ä¸­æ‰€æœ‰å¯†é’¥éƒ½è€—å°½ï¼Œ*æ‰ä¼š*æ¿€æ´»å¤‡ç”¨æä¾›å•†ã€‚

## å·¥ä½œåŽŸç†

```
Your request
  â†’ Pick key from pool (round_robin / least_used / fill_first / random)
  â†’ Send to provider
  â†’ 429 rate limit?
      â†’ Plan/usage limit reached (e.g. ChatGPT/Codex "usage limit reached")?
          â†’ Rotate to next pool key immediately (no retry â€” the cap won't clear on retry)
      â†’ Generic / transient 429?
          â†’ Retry same key once (transient blip)
          â†’ Second 429 â†’ rotate to next pool key
      â†’ All keys exhausted â†’ fallback_model (different provider)
  â†’ 402 billing error?
      â†’ Immediately rotate to next pool key (24h cooldown)
  â†’ 401 auth expired?
      â†’ Try refreshing the token (OAuth)
      â†’ Refresh failed â†’ rotate to next pool key
  â†’ Success â†’ continue normally
```

## å¿«é€Ÿå¼€å§‹

å¦‚æžœä½ å·²åœ¨ `.env` ä¸­è®¾ç½®äº† API å¯†é’¥ï¼ŒZed ä¼šè‡ªåŠ¨å°†å…¶è¯†åˆ«ä¸ºå•å¯†é’¥æ± ã€‚è¦å……åˆ†åˆ©ç”¨æ± åŒ–åŠŸèƒ½ï¼Œè¯·æ·»åŠ æ›´å¤šå¯†é’¥ï¼š

```bash
# Add a second OpenRouter key
zed auth add openrouter --api-key sk-or-v1-your-second-key

# Add a second Anthropic key
zed auth add anthropic --type api-key --api-key sk-ant-api03-your-second-key

# Add an Anthropic OAuth credential (requires Claude Max plan + extra usage credits)
zed auth add anthropic --type oauth
# Opens browser for OAuth login
```

æŸ¥çœ‹ä½ çš„æ± ï¼š

```bash
zed auth list
```

è¾“å‡ºï¼š
```
openrouter (2 credentials):
  #1  OPENROUTER_API_KEY   api_key env:OPENROUTER_API_KEY â†
  #2  backup-key           api_key manual

anthropic (3 credentials):
  #1  zed_pkce          oauth   zed_pkce â†
  #2  claude_code          oauth   claude_code
  #3  ANTHROPIC_API_KEY    api_key env:ANTHROPIC_API_KEY
```

`â†` æ ‡è®°å½“å‰é€‰ä¸­çš„å‡­è¯ã€‚

## äº¤äº’å¼ç®¡ç†

ä¸å¸¦å­å‘½ä»¤è¿è¡Œ `zed auth` ä»¥è¿›å…¥äº¤äº’å¼å‘å¯¼ï¼š

```bash
zed auth
```

è¿™ä¼šæ˜¾ç¤ºå®Œæ•´çš„æ± çŠ¶æ€å¹¶æä¾›æ“ä½œèœå•ï¼š

```
What would you like to do?
  1. Add a credential
  2. Remove a credential
  3. Reset cooldowns for a provider
  4. Set rotation strategy for a provider
  5. Exit
```

å¯¹äºŽåŒæ—¶æ”¯æŒ API å¯†é’¥å’Œ OAuth çš„æä¾›å•†ï¼ˆAnthropicã€Nousã€Codexï¼‰ï¼Œæ·»åŠ æµç¨‹ä¼šè¯¢é—®ç±»åž‹ï¼š

```
anthropic supports both API keys and OAuth login.
  1. API key (paste a key from the provider dashboard)
  2. OAuth login (authenticate via browser)
Type [1/2]:
```

## CLI å‘½ä»¤

| å‘½ä»¤ | è¯´æ˜Ž |
|---------|-------------|
| `zed auth` | äº¤äº’å¼æ± ç®¡ç†å‘å¯¼ |
| `zed auth list` | æ˜¾ç¤ºæ‰€æœ‰æ± å’Œå‡­è¯ |
| `zed auth list <provider>` | æ˜¾ç¤ºæŒ‡å®šæä¾›å•†çš„æ±  |
| `zed auth add <provider>` | æ·»åŠ å‡­è¯ï¼ˆæç¤ºé€‰æ‹©ç±»åž‹å’Œå¯†é’¥ï¼‰ |
| `zed auth add <provider> --type api-key --api-key <key>` | éžäº¤äº’å¼æ·»åŠ  API å¯†é’¥ |
| `zed auth add <provider> --type oauth` | é€šè¿‡æµè§ˆå™¨ç™»å½•æ·»åŠ  OAuth å‡­è¯ |
| `zed auth remove <provider> <index>` | æŒ‰ä»Ž 1 å¼€å§‹çš„ç´¢å¼•åˆ é™¤å‡­è¯ |
| `zed auth reset <provider>` | æ¸…é™¤æ‰€æœ‰å†·å´æ—¶é—´/è€—å°½çŠ¶æ€ |

## è½®æ¢ç­–ç•¥

é€šè¿‡ `zed auth` â†’ "Set rotation strategy" é…ç½®ï¼Œæˆ–åœ¨ `config.yaml` ä¸­è®¾ç½®ï¼š

```yaml
credential_pool_strategies:
  openrouter: round_robin
  anthropic: least_used
```

| ç­–ç•¥ | è¡Œä¸º |
|----------|----------|
| `fill_first`ï¼ˆé»˜è®¤ï¼‰ | æŒç»­ä½¿ç”¨ç¬¬ä¸€ä¸ªå¥åº·å¯†é’¥ç›´è‡³è€—å°½ï¼Œç„¶åŽåˆ‡æ¢åˆ°ä¸‹ä¸€ä¸ª |
| `round_robin` | å‡åŒ€å¾ªçŽ¯éåŽ†æ‰€æœ‰å¯†é’¥ï¼Œæ¯æ¬¡é€‰æ‹©åŽè½®æ¢ |
| `least_used` | å§‹ç»ˆé€‰æ‹©è¯·æ±‚æ¬¡æ•°æœ€å°‘çš„å¯†é’¥ |
| `random` | åœ¨å¥åº·å¯†é’¥ä¸­éšæœºé€‰æ‹© |

## é”™è¯¯æ¢å¤

æ± å¯¹ä¸åŒé”™è¯¯çš„å¤„ç†æ–¹å¼ä¸åŒï¼š

| é”™è¯¯ | è¡Œä¸º | å†·å´æ—¶é—´ |
|-------|----------|----------|
| **429 é€ŸçŽ‡é™åˆ¶** | å¯¹åŒä¸€å¯†é’¥é‡è¯•ä¸€æ¬¡ï¼ˆçž¬æ—¶é”™è¯¯ï¼‰ã€‚è¿žç»­ç¬¬äºŒæ¬¡ 429 åˆ™è½®æ¢åˆ°ä¸‹ä¸€ä¸ªå¯†é’¥ | 1 å°æ—¶ |
| **402 è®¡è´¹/é…é¢** | ç«‹å³è½®æ¢åˆ°ä¸‹ä¸€ä¸ªå¯†é’¥ | 24 å°æ—¶ |
| **401 è®¤è¯è¿‡æœŸ** | å…ˆå°è¯•åˆ·æ–° OAuth ä»¤ç‰Œã€‚ä»…åœ¨åˆ·æ–°å¤±è´¥æ—¶æ‰è½®æ¢ | â€” |
| **æ‰€æœ‰å¯†é’¥è€—å°½** | è‹¥å·²é…ç½®åˆ™è½¬å…¥ `fallback_model` | â€” |

`has_retried_429` æ ‡å¿—åœ¨æ¯æ¬¡æˆåŠŸçš„ API è°ƒç”¨åŽé‡ç½®ï¼Œå› æ­¤å•æ¬¡çž¬æ—¶ 429 ä¸ä¼šè§¦å‘è½®æ¢ã€‚

## è‡ªå®šä¹‰ç«¯ç‚¹æ± 

è‡ªå®šä¹‰ OpenAI å…¼å®¹ç«¯ç‚¹ï¼ˆTogether.aiã€RunPodã€æœ¬åœ°æœåŠ¡å™¨ï¼‰æ‹¥æœ‰å„è‡ªçš„æ± ï¼Œä»¥ `config.yaml` ä¸­ `custom_providers` çš„ç«¯ç‚¹åç§°ä½œä¸ºé”®ã€‚

é€šè¿‡ `zed model` è®¾ç½®è‡ªå®šä¹‰ç«¯ç‚¹æ—¶ï¼Œä¼šè‡ªåŠ¨ç”Ÿæˆç±»ä¼¼ "Together.ai" æˆ– "Local (localhost:8080)" çš„åç§°ï¼Œè¯¥åç§°å³æˆä¸ºæ± çš„é”®ã€‚

```bash
# After setting up a custom endpoint via zed model:
zed auth list
# Shows:
#   Together.ai (1 credential):
#     #1  config key    api_key config:Together.ai â†

# Add a second key for the same endpoint:
zed auth add Together.ai --api-key sk-together-second-key
```

è‡ªå®šä¹‰ç«¯ç‚¹æ± ä»¥ `custom:` å‰ç¼€å­˜å‚¨åœ¨ `auth.json` çš„ `credential_pool` ä¸‹ï¼š

```json
{
  "credential_pool": {
    "openrouter": [...],
    "custom:together.ai": [...]
  }
}
```

## è‡ªåŠ¨å‘çŽ°

Zed åœ¨å¯åŠ¨æ—¶è‡ªåŠ¨ä»Žå¤šä¸ªæ¥æºå‘çŽ°å‡­è¯å¹¶åˆå§‹åŒ–æ± ï¼š

| æ¥æº | ç¤ºä¾‹ | è‡ªåŠ¨åˆå§‹åŒ–ï¼Ÿ |
|--------|---------|-------------|
| çŽ¯å¢ƒå˜é‡ | `OPENROUTER_API_KEY`ã€`ANTHROPIC_API_KEY` | æ˜¯ |
| OAuth ä»¤ç‰Œï¼ˆauth.jsonï¼‰ | Codex device codeã€Nous device code | æ˜¯ |
| Claude Code å‡­è¯ | `~/.claude/.credentials.json` | æ˜¯ï¼ˆAnthropicï¼‰ |
| Zed PKCE OAuth | `~/.zed/auth.json` | æ˜¯ï¼ˆAnthropicï¼‰ |
| è‡ªå®šä¹‰ç«¯ç‚¹é…ç½® | `config.yaml` ä¸­çš„ `model.api_key` | æ˜¯ï¼ˆè‡ªå®šä¹‰ç«¯ç‚¹ï¼‰ |
| æ‰‹åŠ¨æ¡ç›® | é€šè¿‡ `zed auth add` æ·»åŠ  | æŒä¹…åŒ–è‡³ auth.json |

è‡ªåŠ¨åˆå§‹åŒ–çš„æ¡ç›®åœ¨æ¯æ¬¡æ± åŠ è½½æ—¶æ›´æ–°â€”â€”å¦‚æžœä½ åˆ é™¤äº†æŸä¸ªçŽ¯å¢ƒå˜é‡ï¼Œå…¶æ± æ¡ç›®ä¼šè‡ªåŠ¨æ¸…é™¤ã€‚é€šè¿‡ `zed auth add` æ·»åŠ çš„æ‰‹åŠ¨æ¡ç›®æ°¸è¿œä¸ä¼šè¢«è‡ªåŠ¨æ¸…é™¤ã€‚

## å§”æ‰˜ä¸Žå­ä»£ç†å…±äº«

å½“ä»£ç†é€šè¿‡ `delegate_task` æ´¾ç”Ÿå­ä»£ç†æ—¶ï¼Œçˆ¶ä»£ç†çš„å‡­è¯æ± ä¼šè‡ªåŠ¨å…±äº«ç»™å­ä»£ç†ï¼š

- **ç›¸åŒæä¾›å•†** â€” å­ä»£ç†æŽ¥æ”¶çˆ¶ä»£ç†çš„å®Œæ•´æ± ï¼Œåœ¨è§¦è¾¾é€ŸçŽ‡é™åˆ¶æ—¶å¯è¿›è¡Œå¯†é’¥è½®æ¢
- **ä¸åŒæä¾›å•†** â€” å­ä»£ç†åŠ è½½è¯¥æä¾›å•†è‡ªå·±çš„æ± ï¼ˆå¦‚å·²é…ç½®ï¼‰
- **æœªé…ç½®æ± ** â€” å­ä»£ç†å›žé€€åˆ°ç»§æ‰¿çš„å•ä¸ª API å¯†é’¥

è¿™æ„å‘³ç€å­ä»£ç†æ— éœ€é¢å¤–é…ç½®å³å¯èŽ·å¾—ä¸Žçˆ¶ä»£ç†ç›¸åŒçš„é€ŸçŽ‡é™åˆ¶å¼¹æ€§ã€‚æŒ‰ä»»åŠ¡çš„å‡­è¯ç§Ÿç”¨æœºåˆ¶ç¡®ä¿å­ä»£ç†åœ¨å¹¶å‘è½®æ¢å¯†é’¥æ—¶ä¸ä¼šç›¸äº’å†²çªã€‚

## çº¿ç¨‹å®‰å…¨

å‡­è¯æ± å¯¹æ‰€æœ‰çŠ¶æ€å˜æ›´æ“ä½œï¼ˆ`select()`ã€`mark_exhausted_and_rotate()`ã€`try_refresh_current()`ã€`mark_used()`ï¼‰ä½¿ç”¨çº¿ç¨‹é”ï¼Œç¡®ä¿ gatewayï¼ˆç½‘å…³ï¼‰åŒæ—¶å¤„ç†å¤šä¸ªèŠå¤©ä¼šè¯æ—¶çš„å¹¶å‘è®¿é—®å®‰å…¨ã€‚

## æž¶æž„

å®Œæ•´çš„æ•°æ®æµå›¾è¯·å‚è§ä»“åº“ä¸­çš„ [`docs/credential-pool-flow.excalidraw`](https://excalidraw.com/#json=2Ycqhqpi6f12E_3ITyiwh,c7u9jSt5BwrmiVzHGbm87g)ã€‚

å‡­è¯æ± é›†æˆäºŽæä¾›å•†è§£æžå±‚ï¼š

1. **`agent/credential_pool.py`** â€” æ± ç®¡ç†å™¨ï¼šå­˜å‚¨ã€é€‰æ‹©ã€è½®æ¢ã€å†·å´æ—¶é—´
2. **`zed_cli/auth_commands.py`** â€” CLI å‘½ä»¤å’Œäº¤äº’å¼å‘å¯¼
3. **`zed_cli/runtime_provider.py`** â€” æ„ŸçŸ¥æ± çš„å‡­è¯è§£æž
4. **`run_agent.py`** â€” é”™è¯¯æ¢å¤ï¼š429/402/401 â†’ æ± è½®æ¢ â†’ å¤‡ç”¨

## å­˜å‚¨

æ± çŠ¶æ€å­˜å‚¨åœ¨ `~/.zed/auth.json` çš„ `credential_pool` é”®ä¸‹ï¼š

```json
{
  "version": 1,
  "credential_pool": {
    "openrouter": [
      {
        "id": "abc123",
        "label": "OPENROUTER_API_KEY",
        "auth_type": "api_key",
        "priority": 0,
        "source": "env:OPENROUTER_API_KEY",
        "access_token": "sk-or-v1-...",
        "last_status": "ok",
        "request_count": 142
      }
    ]
  },
}
```

ç­–ç•¥å­˜å‚¨åœ¨ `config.yaml` ä¸­ï¼ˆè€Œéž `auth.json`ï¼‰ï¼š

```yaml
credential_pool_strategies:
  openrouter: round_robin
  anthropic: least_used
```
