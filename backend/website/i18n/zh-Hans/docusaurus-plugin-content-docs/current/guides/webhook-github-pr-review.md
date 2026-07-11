---
sidebar_position: 11
sidebar_label: "é€šè¿‡ Webhook è¿›è¡Œ GitHub PR å®¡æŸ¥"
title: "ä½¿ç”¨ Webhook è‡ªåŠ¨å‘å¸ƒ GitHub PR è¯„è®º"
description: "å°† Zed è¿žæŽ¥åˆ° GitHubï¼Œä½¿å…¶è‡ªåŠ¨èŽ·å– PR diffã€å®¡æŸ¥ä»£ç å˜æ›´å¹¶å‘å¸ƒè¯„è®ºâ€”â€”ç”± webhook è§¦å‘ï¼Œæ— éœ€æ‰‹åŠ¨æç¤º"
---

# ä½¿ç”¨ Webhook è‡ªåŠ¨å‘å¸ƒ GitHub PR è¯„è®º

æœ¬æŒ‡å—ä»‹ç»å¦‚ä½•å°† Zed Agent è¿žæŽ¥åˆ° GitHubï¼Œä½¿å…¶è‡ªåŠ¨èŽ·å– pull request çš„ diffã€åˆ†æžä»£ç å˜æ›´å¹¶å‘å¸ƒè¯„è®ºâ€”â€”ç”± webhook äº‹ä»¶è§¦å‘ï¼Œæ— éœ€æ‰‹åŠ¨ promptï¼ˆæç¤ºè¯ï¼‰ã€‚

å½“ PR è¢«æ‰“å¼€æˆ–æ›´æ–°æ—¶ï¼ŒGitHub ä¼šå‘ä½ çš„ Zed å®žä¾‹å‘é€ä¸€ä¸ª webhook POST è¯·æ±‚ã€‚Zed ä½¿ç”¨ä¸€ä¸ª prompt è¿è¡Œ agentï¼Œè¯¥ prompt æŒ‡ç¤ºå…¶é€šè¿‡ `gh` CLI èŽ·å– diffï¼Œå¹¶å°†å“åº”å‘å¸ƒå›ž PR çº¿ç¨‹ã€‚

:::tip æƒ³è¦æ— éœ€å…¬ç½‘ç«¯ç‚¹çš„æ›´ç®€å•é…ç½®ï¼Ÿ
å¦‚æžœä½ æ²¡æœ‰å…¬ç½‘ URLï¼Œæˆ–åªæ˜¯æƒ³å¿«é€Ÿä¸Šæ‰‹ï¼Œè¯·æŸ¥çœ‹ [æž„å»º GitHub PR å®¡æŸ¥ Agent](./github-pr-review-agent.md) â€”â€” ä½¿ç”¨ cron ä½œä¸šæŒ‰è®¡åˆ’è½®è¯¢ PRï¼Œå¯åœ¨ NAT å’Œé˜²ç«å¢™åŽè¿è¡Œã€‚
:::

:::info å‚è€ƒæ–‡æ¡£
å®Œæ•´çš„ webhook å¹³å°å‚è€ƒï¼ˆæ‰€æœ‰é…ç½®é€‰é¡¹ã€æŠ•é€’ç±»åž‹ã€åŠ¨æ€è®¢é˜…ã€å®‰å…¨æ¨¡åž‹ï¼‰ï¼Œè¯·å‚é˜… [Webhooks](/user-guide/messaging/webhooks)ã€‚
:::

:::warning Prompt æ³¨å…¥é£Žé™©
Webhook payload åŒ…å«æ”»å‡»è€…å¯æŽ§çš„æ•°æ®â€”â€”PR æ ‡é¢˜ã€commit æ¶ˆæ¯å’Œæè¿°ä¸­å¯èƒ½åŒ…å«æ¶æ„æŒ‡ä»¤ã€‚å½“ä½ çš„ webhook ç«¯ç‚¹æš´éœ²åœ¨å…¬ç½‘æ—¶ï¼Œè¯·åœ¨æ²™ç®±çŽ¯å¢ƒï¼ˆDockerã€SSH åŽç«¯ï¼‰ä¸­è¿è¡Œ gatewayã€‚è¯·å‚é˜…ä¸‹æ–¹çš„[å®‰å…¨è¯´æ˜Ž](#security-notes)ã€‚
:::

---

## å‰ææ¡ä»¶

- Zed Agent å·²å®‰è£…å¹¶è¿è¡Œï¼ˆ`zed gateway`ï¼‰
- [`gh` CLI](https://cli.github.com/) å·²å®‰è£…å¹¶åœ¨ gateway ä¸»æœºä¸Šå®Œæˆè®¤è¯ï¼ˆ`gh auth login`ï¼‰
- ä½ çš„ Zed å®žä¾‹æœ‰ä¸€ä¸ªå¯å…¬ç½‘è®¿é—®çš„ URLï¼ˆå¦‚æžœåœ¨æœ¬åœ°è¿è¡Œï¼Œè¯·å‚é˜…[ä½¿ç”¨ ngrok è¿›è¡Œæœ¬åœ°æµ‹è¯•](#local-testing-with-ngrok)ï¼‰
- å¯¹ GitHub ä»“åº“çš„ç®¡ç†å‘˜æƒé™ï¼ˆç®¡ç† webhook æ‰€éœ€ï¼‰

---

## ç¬¬ä¸€æ­¥â€”â€”å¯ç”¨ webhook å¹³å°

åœ¨ä½ çš„ `~/.zed/config.yaml` ä¸­æ·»åŠ ä»¥ä¸‹å†…å®¹ï¼š

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644          # é»˜è®¤å€¼ï¼›å¦‚æžœè¯¥ç«¯å£è¢«å…¶ä»–æœåŠ¡å ç”¨ï¼Œè¯·ä¿®æ”¹
      rate_limit: 30      # æ¯æ¡è·¯ç”±æ¯åˆ†é’Ÿæœ€å¤§è¯·æ±‚æ•°ï¼ˆéžå…¨å±€ä¸Šé™ï¼‰

      routes:
        github-pr-review:
          secret: "your-webhook-secret-here"   # å¿…é¡»ä¸Ž GitHub webhook secret å®Œå…¨ä¸€è‡´
          events:
            - pull_request

          # agent è¢«æŒ‡ç¤ºåœ¨å®¡æŸ¥å‰å…ˆèŽ·å–å®žé™…çš„ diffã€‚
          # {number} å’Œ {repository.full_name} ä»Ž GitHub payload ä¸­è§£æžã€‚
          prompt: |
            A pull request event was received (action: {action}).

            PR #{number}: {pull_request.title}
            Author: {pull_request.user.login}
            Branch: {pull_request.head.ref} â†’ {pull_request.base.ref}
            Description: {pull_request.body}
            URL: {pull_request.html_url}

            If the action is "closed" or "labeled", stop here and do not post a comment.

            Otherwise:
            1. Run: gh pr diff {number} --repo {repository.full_name}
            2. Review the code changes for correctness, security issues, and clarity.
            3. Write a concise, actionable review comment and post it.

          deliver: github_comment
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{number}"
```

**å…³é”®å­—æ®µï¼š**

| å­—æ®µ | è¯´æ˜Ž |
|---|---|
| `secret`ï¼ˆè·¯ç”±çº§åˆ«ï¼‰ | è¯¥è·¯ç”±çš„ HMAC secretã€‚å¦‚æžœçœç•¥ï¼Œåˆ™å›žé€€åˆ° `extra.secret` å…¨å±€é…ç½®ã€‚ |
| `events` | è¦æŽ¥å—çš„ `X-GitHub-Event` è¯·æ±‚å¤´å€¼åˆ—è¡¨ã€‚ç©ºåˆ—è¡¨ = æŽ¥å—æ‰€æœ‰ã€‚ |
| `prompt` | æ¨¡æ¿ï¼›`{field}` å’Œ `{nested.field}` ä»Ž GitHub payload ä¸­è§£æžã€‚ |
| `deliver` | `github_comment` é€šè¿‡ `gh pr comment` å‘å¸ƒã€‚`log` ä»…å†™å…¥ gateway æ—¥å¿—ã€‚ |
| `deliver_extra.repo` | ä»Ž payload ä¸­è§£æžä¸ºä¾‹å¦‚ `org/repo`ã€‚ |
| `deliver_extra.pr_number` | ä»Ž payload ä¸­è§£æžä¸º PR ç¼–å·ã€‚ |

:::note Payload ä¸­ä¸åŒ…å«ä»£ç 
GitHub webhook payload åŒ…å« PR å…ƒæ•°æ®ï¼ˆæ ‡é¢˜ã€æè¿°ã€åˆ†æ”¯åã€URLï¼‰ï¼Œä½†**ä¸åŒ…å« diff**ã€‚ä¸Šæ–¹çš„ prompt æŒ‡ç¤º agent è¿è¡Œ `gh pr diff` æ¥èŽ·å–å®žé™…å˜æ›´ã€‚`terminal` å·¥å…·å·²åŒ…å«åœ¨é»˜è®¤çš„ `zed-webhook` å·¥å…·é›†ä¸­ï¼Œæ— éœ€é¢å¤–é…ç½®ã€‚
:::

---

## ç¬¬äºŒæ­¥â€”â€”å¯åŠ¨ gateway

```bash
zed gateway
```

ä½ åº”è¯¥çœ‹åˆ°ï¼š

```
[webhook] Listening on 0.0.0.0:8644 â€” routes: github-pr-review
```

éªŒè¯å…¶æ˜¯å¦æ­£åœ¨è¿è¡Œï¼š

```bash
curl http://localhost:8644/health
# {"status": "ok", "platform": "webhook"}
```

---

## ç¬¬ä¸‰æ­¥â€”â€”åœ¨ GitHub ä¸Šæ³¨å†Œ webhook

1. è¿›å…¥ä½ çš„ä»“åº“ â†’ **Settings** â†’ **Webhooks** â†’ **Add webhook**
2. å¡«å†™ï¼š
   - **Payload URLï¼š** `https://your-public-url.example.com/webhooks/github-pr-review`
   - **Content typeï¼š** `application/json`
   - **Secretï¼š** ä¸Žè·¯ç”±é…ç½®ä¸­ `secret` è®¾ç½®çš„å€¼ç›¸åŒ
   - **Which events?** â†’ é€‰æ‹©å•ä¸ªäº‹ä»¶ â†’ å‹¾é€‰ **Pull requests**
3. ç‚¹å‡» **Add webhook**

GitHub ä¼šç«‹å³å‘é€ä¸€ä¸ª `ping` äº‹ä»¶ä»¥ç¡®è®¤è¿žæŽ¥ã€‚è¯¥äº‹ä»¶ä¼šè¢«å®‰å…¨å¿½ç•¥â€”â€”`ping` ä¸åœ¨ä½ çš„ `events` åˆ—è¡¨ä¸­â€”â€”å¹¶è¿”å›ž `{"status": "ignored", "event": "ping"}`ã€‚å®ƒä»…åœ¨ DEBUG çº§åˆ«è®°å½•æ—¥å¿—ï¼Œå› æ­¤ä¸ä¼šåœ¨é»˜è®¤æ—¥å¿—çº§åˆ«çš„æŽ§åˆ¶å°ä¸­æ˜¾ç¤ºã€‚

---

## ç¬¬å››æ­¥â€”â€”æ‰“å¼€ä¸€ä¸ªæµ‹è¯• PR

åˆ›å»ºä¸€ä¸ªåˆ†æ”¯ï¼ŒæŽ¨é€ä¸€ä¸ªå˜æ›´ï¼Œå¹¶æ‰“å¼€ä¸€ä¸ª PRã€‚åœ¨ 30â€“90 ç§’å†…ï¼ˆå–å†³äºŽ PR å¤§å°å’Œæ¨¡åž‹ï¼‰ï¼ŒZed åº”è¯¥ä¼šå‘å¸ƒä¸€æ¡å®¡æŸ¥è¯„è®ºã€‚

è¦å®žæ—¶è·Ÿè¸ª agent çš„è¿›åº¦ï¼š

```bash
tail -f "${ZED_HOME:-$HOME/.zed}/logs/gateway.log"
```

---

## ä½¿ç”¨ ngrok è¿›è¡Œæœ¬åœ°æµ‹è¯•

å¦‚æžœ Zed åœ¨ä½ çš„ç¬”è®°æœ¬ä¸Šè¿è¡Œï¼Œä½¿ç”¨ [ngrok](https://ngrok.com/) å°†å…¶æš´éœ²åˆ°å…¬ç½‘ï¼š

```bash
ngrok http 8644
```

å¤åˆ¶ `https://...ngrok-free.app` URL å¹¶å°†å…¶ç”¨ä½œä½ çš„ GitHub Payload URLã€‚åœ¨ ngrok å…è´¹ç‰ˆä¸­ï¼Œæ¯æ¬¡ ngrok é‡å¯åŽ URL éƒ½ä¼šå˜åŒ–â€”â€”æ¯æ¬¡ä¼šè¯éƒ½éœ€è¦æ›´æ–°ä½ çš„ GitHub webhookã€‚ä»˜è´¹ ngrok è´¦æˆ·å¯èŽ·å¾—é™æ€åŸŸåã€‚

ä½ å¯ä»¥ç›´æŽ¥ç”¨ `curl` å¯¹é™æ€è·¯ç”±è¿›è¡Œå†’çƒŸæµ‹è¯•â€”â€”æ— éœ€ GitHub è´¦æˆ·æˆ–çœŸå®ž PRã€‚

:::tip æœ¬åœ°æµ‹è¯•æ—¶ä½¿ç”¨ `deliver: log`
åœ¨æµ‹è¯•æ—¶ï¼Œå°†é…ç½®ä¸­çš„ `deliver: github_comment` æ”¹ä¸º `deliver: log`ã€‚å¦åˆ™ agent å°†å°è¯•å‘æµ‹è¯• payload ä¸­çš„å‡ `org/repo#99` ä»“åº“å‘å¸ƒè¯„è®ºï¼Œè¿™å°†ä¼šå¤±è´¥ã€‚å¯¹ prompt è¾“å‡ºæ»¡æ„åŽï¼Œå†åˆ‡æ¢å›ž `deliver: github_comment`ã€‚
:::

```bash
SECRET="your-webhook-secret-here"
BODY='{"action":"opened","number":99,"pull_request":{"title":"Test PR","body":"Adds a feature.","user":{"login":"testuser"},"head":{"ref":"feat/x"},"base":{"ref":"main"},"html_url":"https://github.com/org/repo/pull/99"},"repository":{"full_name":"org/repo"}}'
SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$SECRET" -hex | awk '{print "sha256="$2}')

curl -s -X POST http://localhost:8644/webhooks/github-pr-review \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: pull_request" \
  -H "X-Hub-Signature-256: $SIG" \
  -d "$BODY"
# Expected: {"status":"accepted","route":"github-pr-review","event":"pull_request","delivery_id":"..."}
```

ç„¶åŽè§‚å¯Ÿ agent è¿è¡Œï¼š
```bash
tail -f "${ZED_HOME:-$HOME/.zed}/logs/gateway.log"
```

:::note
`zed webhook test <name>` ä»…é€‚ç”¨äºŽé€šè¿‡ `zed webhook subscribe` åˆ›å»ºçš„**åŠ¨æ€è®¢é˜…**ã€‚å®ƒä¸è¯»å– `config.yaml` ä¸­çš„è·¯ç”±ã€‚
:::

---

## è¿‡æ»¤ç‰¹å®š action

GitHub ä¼šé’ˆå¯¹å¤šç§ action å‘é€ `pull_request` äº‹ä»¶ï¼š`opened`ã€`synchronize`ã€`reopened`ã€`closed`ã€`labeled` ç­‰ã€‚`events` åˆ—è¡¨ä»…æŒ‰ `X-GitHub-Event` è¯·æ±‚å¤´å€¼è¿‡æ»¤â€”â€”æ— æ³•åœ¨è·¯ç”±çº§åˆ«æŒ‰ action å­ç±»åž‹è¿‡æ»¤ã€‚

ç¬¬ä¸€æ­¥ä¸­çš„ prompt å·²é€šè¿‡æŒ‡ç¤º agent å¯¹ `closed` å’Œ `labeled` äº‹ä»¶æå‰åœæ­¢æ¥å¤„ç†è¿™ä¸€é—®é¢˜ã€‚

:::warning Agent ä»ä¼šè¿è¡Œå¹¶æ¶ˆè€— tokenï¼ˆä»¤ç‰Œï¼‰
"stop here" æŒ‡ä»¤ä¼šé˜»æ­¢æœ‰æ„ä¹‰çš„å®¡æŸ¥ï¼Œä½†æ— è®º action å¦‚ä½•ï¼Œagent ä»ä¼šå¯¹æ¯ä¸ª `pull_request` äº‹ä»¶è¿è¡Œè‡³å®Œæˆã€‚GitHub webhook åªèƒ½æŒ‰äº‹ä»¶ç±»åž‹ï¼ˆ`pull_request`ã€`push`ã€`issues` ç­‰ï¼‰è¿‡æ»¤â€”â€”æ— æ³•æŒ‰ action å­ç±»åž‹ï¼ˆ`opened`ã€`closed`ã€`labeled`ï¼‰è¿‡æ»¤ã€‚è·¯ç”±çº§åˆ«æ²¡æœ‰é’ˆå¯¹å­ action çš„è¿‡æ»¤å™¨ã€‚å¯¹äºŽé«˜æµé‡ä»“åº“ï¼Œè¯·æŽ¥å—è¿™ä¸€æˆæœ¬ï¼Œæˆ–é€šè¿‡ GitHub Actions workflow åœ¨ä¸Šæ¸¸è¿›è¡Œè¿‡æ»¤ï¼Œæœ‰æ¡ä»¶åœ°è°ƒç”¨ä½ çš„ webhook URLã€‚
:::

> ä¸æ”¯æŒ Jinja2 æˆ–æ¡ä»¶æ¨¡æ¿è¯­æ³•ã€‚`{field}` å’Œ `{nested.field}` æ˜¯å”¯ä¸€æ”¯æŒçš„æ›¿æ¢æ–¹å¼ã€‚å…¶ä»–å†…å®¹ä¼šåŽŸæ ·ä¼ é€’ç»™ agentã€‚

---

## ä½¿ç”¨ skill ä¿æŒä¸€è‡´çš„å®¡æŸ¥é£Žæ ¼

åŠ è½½ä¸€ä¸ª [Zed skill](/user-guide/features/skills) ä»¥èµ‹äºˆ agent ä¸€è‡´çš„å®¡æŸ¥é£Žæ ¼ã€‚åœ¨ `config.yaml` çš„ `platforms.webhook.extra.routes` ä¸­ï¼Œå‘ä½ çš„è·¯ç”±æ·»åŠ  `skills`ï¼š

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      routes:
        github-pr-review:
          secret: "your-webhook-secret-here"
          events: [pull_request]
          prompt: |
            A pull request event was received (action: {action}).
            PR #{number}: {pull_request.title} by {pull_request.user.login}
            URL: {pull_request.html_url}

            If the action is "closed" or "labeled", stop here and do not post a comment.

            Otherwise:
            1. Run: gh pr diff {number} --repo {repository.full_name}
            2. Review the diff using your review guidelines.
            3. Write a concise, actionable review comment and post it.
          skills:
            - review
          deliver: github_comment
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{number}"
```

> **æ³¨æ„ï¼š** åˆ—è¡¨ä¸­åªæœ‰ç¬¬ä¸€ä¸ªæ‰¾åˆ°çš„ skill ä¼šè¢«åŠ è½½ã€‚Zed ä¸ä¼šå åŠ å¤šä¸ª skillâ€”â€”åŽç»­æ¡ç›®ä¼šè¢«å¿½ç•¥ã€‚

---

## å°†å“åº”å‘é€åˆ° Slack æˆ– Discord

å°†è·¯ç”±ä¸­çš„ `deliver` å’Œ `deliver_extra` å­—æ®µæ›¿æ¢ä¸ºä½ çš„ç›®æ ‡å¹³å°ï¼š

```yaml
# åœ¨ platforms.webhook.extra.routes.<route-name> å†…éƒ¨ï¼š

# Slack
deliver: slack
deliver_extra:
  chat_id: "C0123456789"   # Slack é¢‘é“ IDï¼ˆçœç•¥åˆ™ä½¿ç”¨é…ç½®çš„é»˜è®¤é¢‘é“ï¼‰

# Discord
deliver: discord
deliver_extra:
  chat_id: "987654321012345678"  # Discord é¢‘é“ IDï¼ˆçœç•¥åˆ™ä½¿ç”¨é»˜è®¤é¢‘é“ï¼‰
```

ç›®æ ‡å¹³å°ä¹Ÿå¿…é¡»åœ¨ gateway ä¸­å¯ç”¨å¹¶è¿žæŽ¥ã€‚å¦‚æžœçœç•¥ `chat_id`ï¼Œå“åº”å°†å‘é€åˆ°è¯¥å¹³å°é…ç½®çš„é»˜è®¤é¢‘é“ã€‚

æœ‰æ•ˆçš„ `deliver` å€¼ï¼š`log` Â· `github_comment` Â· `telegram` Â· `discord` Â· `slack` Â· `signal` Â· `sms`

---

## GitLab æ”¯æŒ

åŒä¸€é€‚é…å™¨ä¹Ÿé€‚ç”¨äºŽ GitLabã€‚GitLab ä½¿ç”¨ `X-Gitlab-Token` è¿›è¡Œè®¤è¯ï¼ˆçº¯å­—ç¬¦ä¸²åŒ¹é…ï¼Œéž HMACï¼‰â€”â€”Zed ä¼šè‡ªåŠ¨å¤„ç†ä¸¤è€…ã€‚

å¯¹äºŽäº‹ä»¶è¿‡æ»¤ï¼ŒGitLab å°† `X-GitLab-Event` è®¾ç½®ä¸º `Merge Request Hook`ã€`Push Hook`ã€`Pipeline Hook` ç­‰å€¼ã€‚åœ¨ `events` ä¸­ä½¿ç”¨ç²¾ç¡®çš„è¯·æ±‚å¤´å€¼ï¼š

```yaml
events:
  - Merge Request Hook
```

GitLab çš„ payload å­—æ®µä¸Ž GitHub ä¸åŒâ€”â€”ä¾‹å¦‚ï¼ŒMR æ ‡é¢˜ä½¿ç”¨ `{object_attributes.title}`ï¼ŒMR ç¼–å·ä½¿ç”¨ `{object_attributes.iid}`ã€‚å‘çŽ°å®Œæ•´ payload ç»“æž„æœ€ç®€å•çš„æ–¹å¼æ˜¯ä½¿ç”¨ GitLab webhook è®¾ç½®ä¸­çš„ **Test** æŒ‰é’®ï¼Œç»“åˆ **Recent Deliveries** æ—¥å¿—ã€‚æˆ–è€…ï¼Œåœ¨è·¯ç”±é…ç½®ä¸­çœç•¥ `prompt`â€”â€”Zed å°†æŠŠå®Œæ•´ payload ä½œä¸ºæ ¼å¼åŒ– JSON ç›´æŽ¥ä¼ é€’ç»™ agentï¼Œagent çš„å“åº”ï¼ˆåœ¨ gateway æ—¥å¿—ä¸­é€šè¿‡ `deliver: log` å¯è§ï¼‰å°†æè¿°å…¶ç»“æž„ã€‚

---

## å®‰å…¨è¯´æ˜Ž

- **æ°¸è¿œä¸è¦åœ¨ç”Ÿäº§çŽ¯å¢ƒä¸­ä½¿ç”¨ `INSECURE_NO_AUTH`**â€”â€”å®ƒä¼šå®Œå…¨ç¦ç”¨ç­¾åéªŒè¯ã€‚ä»…ç”¨äºŽæœ¬åœ°å¼€å‘ã€‚
- **å®šæœŸè½®æ¢ä½ çš„ webhook secret**ï¼Œå¹¶åœ¨ GitHubï¼ˆwebhook è®¾ç½®ï¼‰å’Œä½ çš„ `config.yaml` ä¸­åŒæ­¥æ›´æ–°ã€‚
- **é€ŸçŽ‡é™åˆ¶**é»˜è®¤ä¸ºæ¯æ¡è·¯ç”±æ¯åˆ†é’Ÿ 30 æ¬¡è¯·æ±‚ï¼ˆå¯é€šè¿‡ `extra.rate_limit` é…ç½®ï¼‰ã€‚è¶…å‡ºé™åˆ¶è¿”å›ž `429`ã€‚
- **é‡å¤æŠ•é€’**ï¼ˆwebhook é‡è¯•ï¼‰é€šè¿‡ 1 å°æ—¶çš„å¹‚ç­‰æ€§ç¼“å­˜è¿›è¡ŒåŽ»é‡ã€‚ç¼“å­˜é”®ä¾æ¬¡ä¸º `X-GitHub-Delivery`ï¼ˆå¦‚æžœå­˜åœ¨ï¼‰ã€`X-Request-ID`ã€æ¯«ç§’çº§æ—¶é—´æˆ³ã€‚å½“ä¸¤ä¸ªæŠ•é€’ ID è¯·æ±‚å¤´éƒ½æœªè®¾ç½®æ—¶ï¼Œé‡è¯•**ä¸ä¼š**åŽ»é‡ã€‚
- **Prompt æ³¨å…¥ï¼š** PR æ ‡é¢˜ã€æè¿°å’Œ commit æ¶ˆæ¯å‡ä¸ºæ”»å‡»è€…å¯æŽ§å†…å®¹ã€‚æ¶æ„ PR å¯èƒ½å°è¯•æ“çºµ agent çš„è¡Œä¸ºã€‚å½“æš´éœ²åœ¨å…¬ç½‘æ—¶ï¼Œè¯·åœ¨æ²™ç®±çŽ¯å¢ƒï¼ˆDockerã€VMï¼‰ä¸­è¿è¡Œ gatewayã€‚

---

## æ•…éšœæŽ’æŸ¥

| çŽ°è±¡ | æ£€æŸ¥é¡¹ |
|---|---|
| `401 Invalid signature` | config.yaml ä¸­çš„ secret ä¸Ž GitHub webhook secret ä¸åŒ¹é… |
| `404 Unknown route` | URL ä¸­çš„è·¯ç”±åç§°ä¸Ž `routes:` ä¸­çš„é”®ä¸åŒ¹é… |
| `429 Rate limit exceeded` | æ¯æ¡è·¯ç”±æ¯åˆ†é’Ÿ 30 æ¬¡è¯·æ±‚å·²è¶…å‡ºâ€”â€”åœ¨ GitHub UI ä¸­é‡æ–°æŠ•é€’æµ‹è¯•äº‹ä»¶æ—¶å¸¸è§ï¼›ç­‰å¾…ä¸€åˆ†é’Ÿæˆ–æé«˜ `extra.rate_limit` |
| æœªå‘å¸ƒè¯„è®º | `gh` æœªå®‰è£…ã€ä¸åœ¨ PATH ä¸­ï¼Œæˆ–æœªå®Œæˆè®¤è¯ï¼ˆ`gh auth login`ï¼‰ |
| Agent è¿è¡Œä½†æ— è¯„è®º | æ£€æŸ¥ gateway æ—¥å¿—â€”â€”å¦‚æžœ agent è¾“å‡ºä¸ºç©ºæˆ–ä»…ä¸º"SKIP"ï¼ŒæŠ•é€’ä»ä¼šè¢«å°è¯• |
| ç«¯å£å·²è¢«å ç”¨ | åœ¨ config.yaml ä¸­ä¿®æ”¹ `extra.port` |
| Agent è¿è¡Œä½†ä»…å®¡æŸ¥äº† PR æè¿° | prompt ä¸­æœªåŒ…å« `gh pr diff` æŒ‡ä»¤â€”â€”diff ä¸åœ¨ webhook payload ä¸­ |
| çœ‹ä¸åˆ° ping äº‹ä»¶ | è¢«å¿½ç•¥çš„äº‹ä»¶ä»…åœ¨ DEBUG æ—¥å¿—çº§åˆ«è¿”å›ž `{"status":"ignored","event":"ping"}`â€”â€”æ£€æŸ¥ GitHub çš„æŠ•é€’æ—¥å¿—ï¼ˆä»“åº“ â†’ Settings â†’ Webhooks â†’ ä½ çš„ webhook â†’ Recent Deliveriesï¼‰ |

**GitHub çš„ Recent Deliveries æ ‡ç­¾é¡µ**ï¼ˆä»“åº“ â†’ Settings â†’ Webhooks â†’ ä½ çš„ webhookï¼‰æ˜¾ç¤ºæ¯æ¬¡æŠ•é€’çš„ç²¾ç¡®è¯·æ±‚å¤´ã€payloadã€HTTP çŠ¶æ€å’Œå“åº”ä½“ã€‚è¿™æ˜¯æ— éœ€æŸ¥çœ‹æœåŠ¡å™¨æ—¥å¿—å³å¯è¯Šæ–­æ•…éšœçš„æœ€å¿«æ–¹å¼ã€‚

---

## å®Œæ•´é…ç½®å‚è€ƒ

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      host: "0.0.0.0"         # ç»‘å®šåœ°å€ï¼ˆé»˜è®¤ï¼š0.0.0.0ï¼‰
      port: 8644               # ç›‘å¬ç«¯å£ï¼ˆé»˜è®¤ï¼š8644ï¼‰
      secret: ""               # å¯é€‰çš„å…¨å±€å›žé€€ secret
      rate_limit: 30           # æ¯æ¡è·¯ç”±æ¯åˆ†é’Ÿè¯·æ±‚æ•°
      max_body_bytes: 1048576  # payload å¤§å°é™åˆ¶ï¼Œå•ä½å­—èŠ‚ï¼ˆé»˜è®¤ï¼š1 MBï¼‰

      routes:
        <route-name>:
          secret: "required-per-route"
          events: []            # [] = æŽ¥å—æ‰€æœ‰ï¼›å¦åˆ™åˆ—å‡º X-GitHub-Event å€¼
          prompt: ""            # {field} / {nested.field} ä»Ž payload ä¸­è§£æž
          skills: []            # åŠ è½½ç¬¬ä¸€ä¸ªåŒ¹é…çš„ skillï¼ˆä»…ä¸€ä¸ªï¼‰
          deliver: "log"        # log | github_comment | telegram | discord | slack | signal | sms
          deliver_extra: {}     # github_comment éœ€è¦ repo + pr_numberï¼›å…¶ä»–å¹³å°éœ€è¦ chat_id
```

---

## ä¸‹ä¸€æ­¥

- **[åŸºäºŽ Cron çš„ PR å®¡æŸ¥](./github-pr-review-agent.md)** â€”â€” æŒ‰è®¡åˆ’è½®è¯¢ PRï¼Œæ— éœ€å…¬ç½‘ç«¯ç‚¹
- **[Webhook å‚è€ƒ](/user-guide/messaging/webhooks)** â€”â€” webhook å¹³å°çš„å®Œæ•´é…ç½®å‚è€ƒ
- **[æž„å»º Plugin](/guides/build-a-zed-plugin)** â€”â€” å°†å®¡æŸ¥é€»è¾‘æ‰“åŒ…ä¸ºå¯å…±äº«çš„ plugin
- **[Profiles](/user-guide/profiles)** â€”â€” è¿è¡Œä¸€ä¸ªæ‹¥æœ‰ç‹¬ç«‹å†…å­˜å’Œé…ç½®çš„ä¸“å±žå®¡æŸ¥è€… profile
