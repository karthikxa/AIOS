---
sidebar_position: 13
title: "Webhooks"
description: "æŽ¥æ”¶æ¥è‡ª GitHubã€GitLab ç­‰æœåŠ¡çš„äº‹ä»¶ä»¥è§¦å‘ Zed agent è¿è¡Œ"
---

# Webhooks

æŽ¥æ”¶æ¥è‡ªå¤–éƒ¨æœåŠ¡ï¼ˆGitHubã€GitLabã€JIRAã€Stripe ç­‰ï¼‰çš„äº‹ä»¶ï¼Œå¹¶è‡ªåŠ¨è§¦å‘ Zed agent è¿è¡Œã€‚Webhook é€‚é…å™¨è¿è¡Œä¸€ä¸ª HTTP æœåŠ¡å™¨ï¼ŒæŽ¥å— POST è¯·æ±‚ã€éªŒè¯ HMAC ç­¾åã€å°† payloadï¼ˆè½½è·ï¼‰è½¬æ¢ä¸º agent promptï¼ˆæç¤ºè¯ï¼‰ï¼Œå¹¶å°†å“åº”è·¯ç”±å›žæ¥æºæˆ–å…¶ä»–å·²é…ç½®çš„å¹³å°ã€‚

agent å¤„ç†äº‹ä»¶åŽï¼Œå¯é€šè¿‡åœ¨ PR ä¸Šå‘å¸ƒè¯„è®ºã€å‘ Telegram/Discord å‘é€æ¶ˆæ¯æˆ–è®°å½•ç»“æžœæ¥å“åº”ã€‚

## è§†é¢‘æ•™ç¨‹

<div style={{position: 'relative', width: '100%', aspectRatio: '16 / 9', marginBottom: '1.5rem'}}>
  <iframe
    src="https://www.youtube.com/embed/WNYe5mD4fY8"
    title="Zed Agent â€” Webhooks Tutorial"
    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  />
</div>

---

## å¿«é€Ÿå¼€å§‹

1. é€šè¿‡ `zed gateway setup` æˆ–çŽ¯å¢ƒå˜é‡å¯ç”¨
2. åœ¨ `config.yaml` ä¸­å®šä¹‰è·¯ç”±ï¼Œ**æˆ–**ä½¿ç”¨ `zed webhook subscribe` åŠ¨æ€åˆ›å»º
3. å°†ä½ çš„æœåŠ¡æŒ‡å‘ `http://your-server:8644/webhooks/<route-name>`

---

## è®¾ç½®

æœ‰ä¸¤ç§æ–¹å¼å¯ç”¨ webhook é€‚é…å™¨ã€‚

### é€šè¿‡è®¾ç½®å‘å¯¼

```bash
zed gateway setup
```

æŒ‰ç…§æç¤ºå¯ç”¨ webhooksã€è®¾ç½®ç«¯å£å’Œå…¨å±€ HMAC secretã€‚

### é€šè¿‡çŽ¯å¢ƒå˜é‡

æ·»åŠ åˆ° `~/.zed/.env`ï¼š

```bash
WEBHOOK_ENABLED=true
WEBHOOK_PORT=8644        # default
WEBHOOK_SECRET=your-global-secret
```

### éªŒè¯æœåŠ¡å™¨

gateway è¿è¡ŒåŽï¼š

```bash
curl http://localhost:8644/health
```

é¢„æœŸå“åº”ï¼š

```json
{"status": "ok", "platform": "webhook"}
```

---

## é…ç½®è·¯ç”± {#configuring-routes}

è·¯ç”±å®šä¹‰äº†ä¸åŒ webhook æ¥æºçš„å¤„ç†æ–¹å¼ã€‚æ¯ä¸ªè·¯ç”±æ˜¯ `config.yaml` ä¸­ `platforms.webhook.extra.routes` ä¸‹çš„ä¸€ä¸ªå‘½åæ¡ç›®ã€‚

### è·¯ç”±å±žæ€§

| å±žæ€§ | æ˜¯å¦å¿…å¡« | æè¿° |
|----------|----------|-------------|
| `events` | å¦ | è¦æŽ¥å—çš„äº‹ä»¶ç±»åž‹åˆ—è¡¨ï¼ˆä¾‹å¦‚ `["pull_request"]`ï¼‰ã€‚è‹¥ä¸ºç©ºï¼Œåˆ™æŽ¥å—æ‰€æœ‰äº‹ä»¶ã€‚äº‹ä»¶ç±»åž‹ä»Ž `X-GitHub-Event`ã€`X-GitLab-Event` æˆ– payload ä¸­çš„ `event_type` è¯»å–ã€‚ |
| `secret` | **æ˜¯** | ç”¨äºŽç­¾åéªŒè¯çš„ HMAC secretã€‚è‹¥è·¯ç”±æœªè®¾ç½®ï¼Œåˆ™å›žé€€åˆ°å…¨å±€ `secret`ã€‚ä»…ç”¨äºŽæµ‹è¯•æ—¶å¯è®¾ä¸º `"INSECURE_NO_AUTH"`ï¼ˆè·³è¿‡éªŒè¯ï¼‰ã€‚ |
| `prompt` | å¦ | ä½¿ç”¨ç‚¹å·è¡¨ç¤ºæ³•è®¿é—® payload å­—æ®µçš„æ¨¡æ¿å­—ç¬¦ä¸²ï¼ˆä¾‹å¦‚ `{pull_request.title}`ï¼‰ã€‚è‹¥çœç•¥ï¼Œåˆ™å°†å®Œæ•´ JSON payload è½¬å‚¨åˆ° prompt ä¸­ã€‚ |
| `skills` | å¦ | agent è¿è¡Œæ—¶åŠ è½½çš„ skill åç§°åˆ—è¡¨ã€‚ |
| `deliver` | å¦ | å“åº”å‘é€ç›®æ ‡ï¼š`github_comment`ã€`telegram`ã€`discord`ã€`slack`ã€`signal`ã€`sms`ã€`whatsapp`ã€`matrix`ã€`mattermost`ã€`homeassistant`ã€`email`ã€`dingtalk`ã€`feishu`ã€`wecom`ã€`weixin`ã€`bluebubbles`ã€`qqbot`ï¼Œæˆ– `log`ï¼ˆé»˜è®¤ï¼‰ã€‚ |
| `deliver_extra` | å¦ | é¢å¤–çš„æŠ•é€’é…ç½®â€”â€”é”®å–å†³äºŽ `deliver` ç±»åž‹ï¼ˆä¾‹å¦‚ `repo`ã€`pr_number`ã€`chat_id`ï¼‰ã€‚å€¼æ”¯æŒä¸Ž `prompt` ç›¸åŒçš„ `{dot.notation}` æ¨¡æ¿è¯­æ³•ã€‚ |
| `deliver_only` | å¦ | è‹¥ä¸º `true`ï¼Œå®Œå…¨è·³è¿‡ agentâ€”â€”æ¸²æŸ“åŽçš„ `prompt` æ¨¡æ¿ç›´æŽ¥ä½œä¸ºæ¶ˆæ¯ä½“æŠ•é€’ã€‚é›¶ LLM token æ¶ˆè€—ï¼Œäºšç§’çº§æŠ•é€’ã€‚å‚è§[ç›´æŽ¥æŠ•é€’æ¨¡å¼](#direct-delivery-mode)äº†è§£ä½¿ç”¨åœºæ™¯ã€‚è¦æ±‚ `deliver` ä¸ºçœŸå®žç›®æ ‡ï¼ˆéž `log`ï¼‰ã€‚ |

### å®Œæ•´ç¤ºä¾‹

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644
      secret: "global-fallback-secret"
      routes:
        github-pr:
          events: ["pull_request"]
          secret: "github-webhook-secret"
          prompt: |
            Review this pull request:
            Repository: {repository.full_name}
            PR #{number}: {pull_request.title}
            Author: {pull_request.user.login}
            URL: {pull_request.html_url}
            Diff URL: {pull_request.diff_url}
            Action: {action}
          skills: ["github-code-review"]
          deliver: "github_comment"
          deliver_extra:
            repo: "{repository.full_name}"
            pr_number: "{number}"
        deploy-notify:
          events: ["push"]
          secret: "deploy-secret"
          prompt: "New push to {repository.full_name} branch {ref}: {head_commit.message}"
          deliver: "telegram"
```

### Prompt æ¨¡æ¿

Prompt ä½¿ç”¨ç‚¹å·è¡¨ç¤ºæ³•è®¿é—® webhook payload ä¸­çš„åµŒå¥—å­—æ®µï¼š

- `{pull_request.title}` è§£æžä¸º `payload["pull_request"]["title"]`
- `{repository.full_name}` è§£æžä¸º `payload["repository"]["full_name"]`
- `{__raw__}` â€” ç‰¹æ®Š tokenï¼Œå°†**æ•´ä¸ª payload** ä»¥ç¼©è¿› JSON æ ¼å¼è½¬å‚¨ï¼ˆæˆªæ–­è‡³ 4000 ä¸ªå­—ç¬¦ï¼‰ã€‚é€‚ç”¨äºŽç›‘æŽ§å‘Šè­¦æˆ–é€šç”¨ webhookï¼Œagent éœ€è¦å®Œæ•´ä¸Šä¸‹æ–‡æ—¶ä½¿ç”¨ã€‚
- ç¼ºå¤±çš„é”®ä¿ç•™ä¸ºå­—é¢é‡ `{key}` å­—ç¬¦ä¸²ï¼ˆä¸æŠ¥é”™ï¼‰
- åµŒå¥—çš„ dict å’Œ list ä¼šè¢« JSON åºåˆ—åŒ–å¹¶æˆªæ–­è‡³ 2000 ä¸ªå­—ç¬¦

å¯ä»¥å°† `{__raw__}` ä¸Žå¸¸è§„æ¨¡æ¿å˜é‡æ··åˆä½¿ç”¨ï¼š

```yaml
prompt: "PR #{pull_request.number} by {pull_request.user.login}: {__raw__}"
```

è‹¥è·¯ç”±æœªé…ç½® `prompt` æ¨¡æ¿ï¼Œåˆ™å°†æ•´ä¸ª payload ä»¥ç¼©è¿› JSON æ ¼å¼è½¬å‚¨ï¼ˆæˆªæ–­è‡³ 4000 ä¸ªå­—ç¬¦ï¼‰ã€‚

`deliver_extra` çš„å€¼ä¸­åŒæ ·æ”¯æŒç‚¹å·è¡¨ç¤ºæ³•æ¨¡æ¿ã€‚

### è®ºå›è¯é¢˜æŠ•é€’

å‘ Telegram æŠ•é€’ webhook å“åº”æ—¶ï¼Œå¯é€šè¿‡åœ¨ `deliver_extra` ä¸­åŒ…å« `message_thread_id`ï¼ˆæˆ– `thread_id`ï¼‰æ¥æŒ‡å®šç‰¹å®šè®ºå›è¯é¢˜ï¼š

```yaml
webhooks:
  routes:
    alerts:
      events: ["alert"]
      prompt: "Alert: {__raw__}"
      deliver: "telegram"
      deliver_extra:
        chat_id: "-1001234567890"
        message_thread_id: "42"
```

è‹¥ `deliver_extra` ä¸­æœªæä¾› `chat_id`ï¼Œåˆ™å›žé€€åˆ°ç›®æ ‡å¹³å°é…ç½®çš„ä¸»é¢‘é“ã€‚

---

## GitHub PR å®¡æŸ¥ï¼ˆåˆ†æ­¥è¯´æ˜Žï¼‰ {#github-pr-review}

æœ¬æ¼”ç»ƒå°†ä¸ºæ¯ä¸ª pull request è®¾ç½®è‡ªåŠ¨ä»£ç å®¡æŸ¥ã€‚

### 1. åœ¨ GitHub ä¸­åˆ›å»º webhook

1. è¿›å…¥ä½ çš„ä»“åº“ â†’ **Settings** â†’ **Webhooks** â†’ **Add webhook**
2. å°† **Payload URL** è®¾ä¸º `http://your-server:8644/webhooks/github-pr`
3. å°† **Content type** è®¾ä¸º `application/json`
4. å°† **Secret** è®¾ä¸ºä¸Žè·¯ç”±é…ç½®åŒ¹é…çš„å€¼ï¼ˆä¾‹å¦‚ `github-webhook-secret`ï¼‰
5. åœ¨ **Which events?** ä¸‹ï¼Œé€‰æ‹© **Let me select individual events** å¹¶å‹¾é€‰ **Pull requests**
6. ç‚¹å‡» **Add webhook**

### 2. æ·»åŠ è·¯ç”±é…ç½®

æŒ‰ç…§ä¸Šæ–¹ç¤ºä¾‹ï¼Œå°† `github-pr` è·¯ç”±æ·»åŠ åˆ° `~/.zed/config.yaml`ã€‚

### 3. ç¡®ä¿ `gh` CLI å·²è®¤è¯

`github_comment` æŠ•é€’ç±»åž‹ä½¿ç”¨ GitHub CLI å‘å¸ƒè¯„è®ºï¼š

```bash
gh auth login
```

### 4. æµ‹è¯•

åœ¨ä»“åº“ä¸­æ‰“å¼€ä¸€ä¸ª pull requestã€‚webhook è§¦å‘åŽï¼ŒZed å¤„ç†äº‹ä»¶å¹¶åœ¨ PR ä¸Šå‘å¸ƒå®¡æŸ¥è¯„è®ºã€‚

---

## GitLab Webhook è®¾ç½® {#gitlab-webhook-setup}

GitLab webhook çš„å·¥ä½œæ–¹å¼ç±»ä¼¼ï¼Œä½†ä½¿ç”¨ä¸åŒçš„è®¤è¯æœºåˆ¶ã€‚GitLab é€šè¿‡ `X-Gitlab-Token` è¯·æ±‚å¤´ä»¥æ˜Žæ–‡å­—ç¬¦ä¸²åŒ¹é…ï¼ˆéž HMACï¼‰å‘é€ secretã€‚

### 1. åœ¨ GitLab ä¸­åˆ›å»º webhook

1. è¿›å…¥ä½ çš„é¡¹ç›® â†’ **Settings** â†’ **Webhooks**
2. å°† **URL** è®¾ä¸º `http://your-server:8644/webhooks/gitlab-mr`
3. è¾“å…¥ä½ çš„ **Secret token**
4. é€‰æ‹© **Merge request events**ï¼ˆä»¥åŠå…¶ä»–ä½ éœ€è¦çš„äº‹ä»¶ï¼‰
5. ç‚¹å‡» **Add webhook**

### 2. æ·»åŠ è·¯ç”±é…ç½®

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      routes:
        gitlab-mr:
          events: ["merge_request"]
          secret: "your-gitlab-secret-token"
          prompt: |
            Review this merge request:
            Project: {project.path_with_namespace}
            MR !{object_attributes.iid}: {object_attributes.title}
            Author: {object_attributes.last_commit.author.name}
            URL: {object_attributes.url}
            Action: {object_attributes.action}
          deliver: "log"
```

---

## æŠ•é€’é€‰é¡¹ {#delivery-options}

`deliver` å­—æ®µæŽ§åˆ¶ agent å¤„ç† webhook äº‹ä»¶åŽå“åº”çš„å‘é€ç›®æ ‡ã€‚

| æŠ•é€’ç±»åž‹ | æè¿° |
|-------------|-------------|
| `log` | å°†å“åº”è®°å½•åˆ° gateway æ—¥å¿—è¾“å‡ºã€‚è¿™æ˜¯é»˜è®¤å€¼ï¼Œé€‚åˆæµ‹è¯•ä½¿ç”¨ã€‚ |
| `github_comment` | é€šè¿‡ `gh` CLI å°†å“åº”ä½œä¸º PR/issue è¯„è®ºå‘å¸ƒã€‚éœ€è¦ `deliver_extra.repo` å’Œ `deliver_extra.pr_number`ã€‚`gh` CLI å¿…é¡»å®‰è£…å¹¶åœ¨ gateway ä¸»æœºä¸Šå®Œæˆè®¤è¯ï¼ˆ`gh auth login`ï¼‰ã€‚ |
| `telegram` | å°†å“åº”è·¯ç”±åˆ° Telegramã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `discord` | å°†å“åº”è·¯ç”±åˆ° Discordã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `slack` | å°†å“åº”è·¯ç”±åˆ° Slackã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `signal` | å°†å“åº”è·¯ç”±åˆ° Signalã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `sms` | é€šè¿‡ Twilio å°†å“åº”è·¯ç”±åˆ° SMSã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `whatsapp` | å°†å“åº”è·¯ç”±åˆ° WhatsAppã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `matrix` | å°†å“åº”è·¯ç”±åˆ° Matrixã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `mattermost` | å°†å“åº”è·¯ç”±åˆ° Mattermostã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `homeassistant` | å°†å“åº”è·¯ç”±åˆ° Home Assistantã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `email` | å°†å“åº”è·¯ç”±åˆ° Emailã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `dingtalk` | å°†å“åº”è·¯ç”±åˆ° DingTalkã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `feishu` | å°†å“åº”è·¯ç”±åˆ° Feishu/Larkã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `wecom` | å°†å“åº”è·¯ç”±åˆ° WeComã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `weixin` | å°†å“åº”è·¯ç”±åˆ° Weixinï¼ˆå¾®ä¿¡ï¼‰ã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |
| `bluebubbles` | å°†å“åº”è·¯ç”±åˆ° BlueBubblesï¼ˆiMessageï¼‰ã€‚ä½¿ç”¨ä¸»é¢‘é“ï¼Œæˆ–åœ¨ `deliver_extra` ä¸­æŒ‡å®š `chat_id`ã€‚ |

è·¨å¹³å°æŠ•é€’æ—¶ï¼Œç›®æ ‡å¹³å°ä¹Ÿå¿…é¡»åœ¨ gateway ä¸­å¯ç”¨å¹¶è¿žæŽ¥ã€‚è‹¥ `deliver_extra` ä¸­æœªæä¾› `chat_id`ï¼Œå“åº”å°†å‘é€åˆ°è¯¥å¹³å°é…ç½®çš„ä¸»é¢‘é“ã€‚

---

## ç›´æŽ¥æŠ•é€’æ¨¡å¼ {#direct-delivery-mode}

é»˜è®¤æƒ…å†µä¸‹ï¼Œæ¯æ¬¡ webhook POST éƒ½ä¼šè§¦å‘ä¸€æ¬¡ agent è¿è¡Œâ€”â€”payload æˆä¸º promptï¼Œagent å¤„ç†åŽæŠ•é€’å“åº”ã€‚è¿™ä¼šåœ¨æ¯æ¬¡äº‹ä»¶æ—¶æ¶ˆè€— LLM tokenã€‚

å¯¹äºŽåªéœ€**æŽ¨é€çº¯æ–‡æœ¬é€šçŸ¥**çš„åœºæ™¯â€”â€”æ— éœ€æŽ¨ç†ã€æ— éœ€ agent å¾ªçŽ¯ï¼Œåªéœ€æŠ•é€’æ¶ˆæ¯â€”â€”å¯åœ¨è·¯ç”±ä¸Šè®¾ç½® `deliver_only: true`ã€‚æ¸²æŸ“åŽçš„ `prompt` æ¨¡æ¿ç›´æŽ¥ä½œä¸ºæ¶ˆæ¯ä½“ï¼Œé€‚é…å™¨å°†å…¶ç›´æŽ¥åˆ†å‘åˆ°é…ç½®çš„æŠ•é€’ç›®æ ‡ã€‚

### ä½•æ—¶ä½¿ç”¨ç›´æŽ¥æŠ•é€’

- **å¤–éƒ¨æœåŠ¡æŽ¨é€** â€” Supabase/Firebase webhook åœ¨æ•°æ®åº“å˜æ›´æ—¶è§¦å‘ â†’ å³æ—¶é€šçŸ¥ Telegram ç”¨æˆ·
- **ç›‘æŽ§å‘Šè­¦** â€” Datadog/Grafana å‘Šè­¦ webhook â†’ æŽ¨é€åˆ° Discord é¢‘é“
- **agent é—´é€šçŸ¥** â€” Agent A é€šçŸ¥ Agent B çš„ç”¨æˆ·æŸä¸ªé•¿æ—¶ä»»åŠ¡å·²å®Œæˆ
- **åŽå°ä»»åŠ¡å®Œæˆ** â€” Cron ä»»åŠ¡å®Œæˆ â†’ å°†ç»“æžœå‘å¸ƒåˆ° Slack

ä¼˜åŠ¿ï¼š

- **é›¶ LLM token** â€” agent ä»Žä¸è¢«è°ƒç”¨
- **äºšç§’çº§æŠ•é€’** â€” å•æ¬¡é€‚é…å™¨è°ƒç”¨ï¼Œæ— æŽ¨ç†å¾ªçŽ¯
- **ä¸Ž agent æ¨¡å¼ç›¸åŒçš„å®‰å…¨æ€§** â€” HMAC è®¤è¯ã€é€ŸçŽ‡é™åˆ¶ã€å¹‚ç­‰æ€§å’Œè¯·æ±‚ä½“å¤§å°é™åˆ¶å‡æ­£å¸¸ç”Ÿæ•ˆ
- **åŒæ­¥å“åº”** â€” æŠ•é€’æˆåŠŸåŽ POST è¿”å›ž `200 OK`ï¼Œè‹¥ç›®æ ‡æ‹’ç»åˆ™è¿”å›ž `502`ï¼Œä¾¿äºŽä¸Šæ¸¸æœåŠ¡æ™ºèƒ½é‡è¯•

### ç¤ºä¾‹ï¼šä»Ž Supabase æŽ¨é€åˆ° Telegram

```yaml
platforms:
  webhook:
    enabled: true
    extra:
      port: 8644
      secret: "global-secret"
      routes:
        antenna-matches:
          secret: "antenna-webhook-secret"
          deliver: "telegram"
          deliver_only: true
          prompt: "ðŸŽ‰ New match: {match.user_name} matched with you!"
          deliver_extra:
            chat_id: "{match.telegram_chat_id}"
```

ä½ çš„ Supabase edge function ä½¿ç”¨ HMAC-SHA256 å¯¹ payload ç­¾åå¹¶ POST åˆ° `https://your-server:8644/webhooks/antenna-matches`ã€‚webhook é€‚é…å™¨éªŒè¯ç­¾åã€ä»Ž payload æ¸²æŸ“æ¨¡æ¿ã€æŠ•é€’åˆ° Telegramï¼Œå¹¶è¿”å›ž `200 OK`ã€‚

### ç¤ºä¾‹ï¼šé€šè¿‡ CLI åŠ¨æ€è®¢é˜…

```bash
zed webhook subscribe antenna-matches \
  --deliver telegram \
  --deliver-chat-id "123456789" \
  --deliver-only \
  --prompt "ðŸŽ‰ New match: {match.user_name} matched with you!" \
  --description "Antenna match notifications"
```

### å“åº”çŠ¶æ€ç 

| çŠ¶æ€ç  | å«ä¹‰ |
|--------|---------|
| `200 OK` | æŠ•é€’æˆåŠŸã€‚å“åº”ä½“ï¼š`{"status": "delivered", "route": "...", "target": "...", "delivery_id": "..."}` |
| `200 OK`ï¼ˆstatus=duplicateï¼‰ | åœ¨å¹‚ç­‰æ€§ TTLï¼ˆ1 å°æ—¶ï¼‰å†…é‡å¤çš„ `X-GitHub-Delivery` IDã€‚ä¸é‡å¤æŠ•é€’ã€‚ |
| `401 Unauthorized` | HMAC ç­¾åæ— æ•ˆæˆ–ç¼ºå¤±ã€‚ |
| `400 Bad Request` | JSON è¯·æ±‚ä½“æ ¼å¼é”™è¯¯ã€‚ |
| `404 Not Found` | æœªçŸ¥è·¯ç”±åç§°ã€‚ |
| `413 Payload Too Large` | è¯·æ±‚ä½“è¶…è¿‡ `max_body_bytes`ã€‚ |
| `429 Too Many Requests` | è·¯ç”±é€ŸçŽ‡é™åˆ¶å·²è¶…å‡ºã€‚ |
| `502 Bad Gateway` | ç›®æ ‡é€‚é…å™¨æ‹’ç»æ¶ˆæ¯æˆ–æŠ›å‡ºå¼‚å¸¸ã€‚é”™è¯¯è®°å½•åœ¨æœåŠ¡ç«¯æ—¥å¿—ä¸­ï¼›å“åº”ä½“ä¸ºé€šç”¨çš„ `Delivery failed`ï¼Œé¿å…æ³„éœ²é€‚é…å™¨å†…éƒ¨ä¿¡æ¯ã€‚ |

### é…ç½®æ³¨æ„äº‹é¡¹

- `deliver_only: true` è¦æ±‚ `deliver` ä¸ºçœŸå®žç›®æ ‡ã€‚`deliver: log`ï¼ˆæˆ–çœç•¥ `deliver`ï¼‰åœ¨å¯åŠ¨æ—¶ä¼šè¢«æ‹’ç»â€”â€”é€‚é…å™¨å‘çŽ°è·¯ç”±é…ç½®é”™è¯¯æ—¶æ‹’ç»å¯åŠ¨ã€‚
- ç›´æŽ¥æŠ•é€’æ¨¡å¼ä¸‹ `skills` å­—æ®µè¢«å¿½ç•¥ï¼ˆä¸è¿è¡Œ agentï¼Œæ— å¤„æ³¨å…¥ skillï¼‰ã€‚
- æ¨¡æ¿æ¸²æŸ“ä½¿ç”¨ä¸Ž agent æ¨¡å¼ç›¸åŒçš„ `{dot.notation}` è¯­æ³•ï¼ŒåŒ…æ‹¬ `{__raw__}` tokenã€‚
- å¹‚ç­‰æ€§ä½¿ç”¨ç›¸åŒçš„ `X-GitHub-Delivery` / `X-Request-ID` è¯·æ±‚å¤´â€”â€”æºå¸¦ç›¸åŒ ID çš„é‡è¯•è¿”å›ž `status=duplicate` ä¸”**ä¸**é‡å¤æŠ•é€’ã€‚

---

## åŠ¨æ€è®¢é˜…ï¼ˆCLIï¼‰ {#dynamic-subscriptions}

é™¤äº† `config.yaml` ä¸­çš„é™æ€è·¯ç”±ï¼Œè¿˜å¯ä»¥ä½¿ç”¨ `zed webhook` CLI å‘½ä»¤åŠ¨æ€åˆ›å»º webhook è®¢é˜…ã€‚å½“ agent æœ¬èº«éœ€è¦è®¾ç½®äº‹ä»¶é©±åŠ¨è§¦å‘å™¨æ—¶ï¼Œè¿™å°¤ä¸ºæœ‰ç”¨ã€‚

### åˆ›å»ºè®¢é˜…

```bash
zed webhook subscribe github-issues \
  --events "issues" \
  --prompt "New issue #{issue.number}: {issue.title}\nBy: {issue.user.login}\n\n{issue.body}" \
  --deliver telegram \
  --deliver-chat-id "-100123456789" \
  --description "Triage new GitHub issues"
```

æ­¤å‘½ä»¤è¿”å›ž webhook URL å’Œè‡ªåŠ¨ç”Ÿæˆçš„ HMAC secretã€‚å°†ä½ çš„æœåŠ¡é…ç½®ä¸º POST åˆ°è¯¥ URLã€‚

### åˆ—å‡ºè®¢é˜…

```bash
zed webhook list
```

### åˆ é™¤è®¢é˜…

```bash
zed webhook remove github-issues
```

### æµ‹è¯•è®¢é˜…

```bash
zed webhook test github-issues
zed webhook test github-issues --payload '{"issue": {"number": 42, "title": "Test"}}'
```

### åŠ¨æ€è®¢é˜…çš„å·¥ä½œåŽŸç†

- è®¢é˜…å­˜å‚¨åœ¨ `~/.zed/webhook_subscriptions.json`
- webhook é€‚é…å™¨åœ¨æ¯æ¬¡æ”¶åˆ°è¯·æ±‚æ—¶çƒ­é‡è½½è¯¥æ–‡ä»¶ï¼ˆåŸºäºŽ mtime æ£€æµ‹ï¼Œå¼€é”€å¯å¿½ç•¥ä¸è®¡ï¼‰
- `config.yaml` ä¸­çš„é™æ€è·¯ç”±å§‹ç»ˆä¼˜å…ˆäºŽåŒåçš„åŠ¨æ€è®¢é˜…
- åŠ¨æ€è®¢é˜…ä¸Žé™æ€è·¯ç”±ä½¿ç”¨ç›¸åŒçš„æ ¼å¼å’ŒåŠŸèƒ½ï¼ˆeventsã€prompt æ¨¡æ¿ã€skillsã€deliveryï¼‰
- æ— éœ€é‡å¯ gatewayâ€”â€”è®¢é˜…åŽç«‹å³ç”Ÿæ•ˆ

### agent é©±åŠ¨çš„è®¢é˜…

agent å¯é€šè¿‡ terminal å·¥å…·åœ¨ `webhook-subscriptions` skill çš„å¼•å¯¼ä¸‹åˆ›å»ºè®¢é˜…ã€‚å‘ agent è¯·æ±‚"ä¸º GitHub issues è®¾ç½® webhook"ï¼Œå®ƒå°†è¿è¡Œç›¸åº”çš„ `zed webhook subscribe` å‘½ä»¤ã€‚

---

## å®‰å…¨æ€§ {#security}

webhook é€‚é…å™¨åŒ…å«å¤šå±‚å®‰å…¨æœºåˆ¶ï¼š

### HMAC ç­¾åéªŒè¯

é€‚é…å™¨ä½¿ç”¨é€‚åˆå„æ¥æºçš„æ–¹å¼éªŒè¯ä¼ å…¥çš„ webhook ç­¾åï¼š

- **GitHub**ï¼š`X-Hub-Signature-256` è¯·æ±‚å¤´â€”â€”ä»¥ `sha256=` ä¸ºå‰ç¼€çš„ HMAC-SHA256 åå…­è¿›åˆ¶æ‘˜è¦
- **GitLab**ï¼š`X-Gitlab-Token` è¯·æ±‚å¤´â€”â€”æ˜Žæ–‡ secret å­—ç¬¦ä¸²åŒ¹é…
- **é€šç”¨**ï¼š`X-Webhook-Signature` è¯·æ±‚å¤´â€”â€”åŽŸå§‹ HMAC-SHA256 åå…­è¿›åˆ¶æ‘˜è¦

è‹¥å·²é…ç½® secret ä½†è¯·æ±‚ä¸­ä¸å­˜åœ¨å·²è¯†åˆ«çš„ç­¾åè¯·æ±‚å¤´ï¼Œåˆ™è¯·æ±‚è¢«æ‹’ç»ã€‚

### Secret ä¸ºå¿…å¡«é¡¹

æ¯ä¸ªè·¯ç”±å¿…é¡»æœ‰ secretâ€”â€”ç›´æŽ¥è®¾ç½®åœ¨è·¯ç”±ä¸Šæˆ–ä»Žå…¨å±€ `secret` ç»§æ‰¿ã€‚æ²¡æœ‰ secret çš„è·¯ç”±ä¼šå¯¼è‡´é€‚é…å™¨åœ¨å¯åŠ¨æ—¶æŠ¥é”™é€€å‡ºã€‚ä»…ç”¨äºŽå¼€å‘/æµ‹è¯•æ—¶ï¼Œå¯å°† secret è®¾ä¸º `"INSECURE_NO_AUTH"` ä»¥å®Œå…¨è·³è¿‡éªŒè¯ã€‚

`INSECURE_NO_AUTH` ä»…åœ¨ gateway ç»‘å®šåˆ°å›žçŽ¯åœ°å€ï¼ˆ`127.0.0.1`ã€`localhost`ã€`::1`ï¼‰æ—¶è¢«æŽ¥å—ã€‚è‹¥ä¸Žéžå›žçŽ¯ç»‘å®šï¼ˆå¦‚ `0.0.0.0` æˆ–å±€åŸŸç½‘ IPï¼‰ç»„åˆä½¿ç”¨ï¼Œé€‚é…å™¨æ‹’ç»å¯åŠ¨â€”â€”è¿™å¯é˜²æ­¢åœ¨å…¬å…±æŽ¥å£ä¸Šæ„å¤–æš´éœ²æœªè®¤è¯çš„ç«¯ç‚¹ã€‚

### é€ŸçŽ‡é™åˆ¶

æ¯ä¸ªè·¯ç”±é»˜è®¤é™åˆ¶ä¸º**æ¯åˆ†é’Ÿ 30 æ¬¡è¯·æ±‚**ï¼ˆå›ºå®šçª—å£ï¼‰ã€‚å¯å…¨å±€é…ç½®ï¼š

```yaml
platforms:
  webhook:
    extra:
      rate_limit: 60  # requests per minute
```

è¶…å‡ºé™åˆ¶çš„è¯·æ±‚æ”¶åˆ° `429 Too Many Requests` å“åº”ã€‚

### å¹‚ç­‰æ€§

æŠ•é€’ IDï¼ˆæ¥è‡ª `X-GitHub-Delivery`ã€`X-Request-ID` æˆ–æ—¶é—´æˆ³å›žé€€ï¼‰ç¼“å­˜ **1 å°æ—¶**ã€‚é‡å¤æŠ•é€’ï¼ˆä¾‹å¦‚ webhook é‡è¯•ï¼‰ä¼šè¢«é™é»˜è·³è¿‡å¹¶è¿”å›ž `200` å“åº”ï¼Œé˜²æ­¢é‡å¤è§¦å‘ agent è¿è¡Œã€‚

### è¯·æ±‚ä½“å¤§å°é™åˆ¶

è¶…è¿‡ **1 MB** çš„ payload åœ¨è¯»å–è¯·æ±‚ä½“ä¹‹å‰å³è¢«æ‹’ç»ã€‚å¯é…ç½®ï¼š

```yaml
platforms:
  webhook:
    extra:
      max_body_bytes: 2097152  # 2 MB
```

### Prompt æ³¨å…¥é£Žé™©

:::warning
Webhook payload åŒ…å«æ”»å‡»è€…å¯æŽ§çš„æ•°æ®â€”â€”PR æ ‡é¢˜ã€commit æ¶ˆæ¯ã€issue æè¿°ç­‰å‡å¯èƒ½åŒ…å«æ¶æ„æŒ‡ä»¤ã€‚åœ¨æš´éœ²äºŽäº’è”ç½‘æ—¶ï¼Œè¯·åœ¨æ²™ç®±çŽ¯å¢ƒï¼ˆDockerã€VMï¼‰ä¸­è¿è¡Œ gatewayã€‚è€ƒè™‘ä½¿ç”¨ Docker æˆ– SSH terminal åŽç«¯è¿›è¡Œéš”ç¦»ã€‚
:::

---

## æ•…éšœæŽ’æŸ¥ {#troubleshooting}

### Webhook æœªåˆ°è¾¾

- éªŒè¯ç«¯å£å·²æš´éœ²ä¸”å¯ä»Ž webhook æ¥æºè®¿é—®
- æ£€æŸ¥é˜²ç«å¢™è§„åˆ™â€”â€”ç«¯å£ `8644`ï¼ˆæˆ–ä½ é…ç½®çš„ç«¯å£ï¼‰å¿…é¡»å¼€æ”¾
- éªŒè¯ URL è·¯å¾„æ˜¯å¦åŒ¹é…ï¼š`http://your-server:8644/webhooks/<route-name>`
- ä½¿ç”¨ `/health` ç«¯ç‚¹ç¡®è®¤æœåŠ¡å™¨æ­£åœ¨è¿è¡Œ

### ç­¾åéªŒè¯å¤±è´¥

- ç¡®ä¿è·¯ç”±é…ç½®ä¸­çš„ secret ä¸Ž webhook æ¥æºä¸­é…ç½®çš„ secret å®Œå…¨ä¸€è‡´
- å¯¹äºŽ GitHubï¼Œsecret åŸºäºŽ HMACâ€”â€”æ£€æŸ¥ `X-Hub-Signature-256`
- å¯¹äºŽ GitLabï¼Œsecret ä¸ºæ˜Žæ–‡ token åŒ¹é…â€”â€”æ£€æŸ¥ `X-Gitlab-Token`
- æ£€æŸ¥ gateway æ—¥å¿—ä¸­çš„ `Invalid signature` è­¦å‘Š

### äº‹ä»¶è¢«å¿½ç•¥

- æ£€æŸ¥äº‹ä»¶ç±»åž‹æ˜¯å¦åœ¨è·¯ç”±çš„ `events` åˆ—è¡¨ä¸­
- GitHub äº‹ä»¶ä½¿ç”¨å¦‚ `pull_request`ã€`push`ã€`issues` ç­‰å€¼ï¼ˆ`X-GitHub-Event` è¯·æ±‚å¤´çš„å€¼ï¼‰
- GitLab äº‹ä»¶ä½¿ç”¨å¦‚ `merge_request`ã€`push` ç­‰å€¼ï¼ˆ`X-GitLab-Event` è¯·æ±‚å¤´çš„å€¼ï¼‰
- è‹¥ `events` ä¸ºç©ºæˆ–æœªè®¾ç½®ï¼Œåˆ™æŽ¥å—æ‰€æœ‰äº‹ä»¶

### Agent æœªå“åº”

- åœ¨å‰å°è¿è¡Œ gateway ä»¥æŸ¥çœ‹æ—¥å¿—ï¼š`zed gateway run`
- æ£€æŸ¥ prompt æ¨¡æ¿æ˜¯å¦æ­£ç¡®æ¸²æŸ“
- éªŒè¯æŠ•é€’ç›®æ ‡å·²é…ç½®å¹¶è¿žæŽ¥

### é‡å¤å“åº”

- å¹‚ç­‰æ€§ç¼“å­˜åº”èƒ½é˜²æ­¢æ­¤é—®é¢˜â€”â€”æ£€æŸ¥ webhook æ¥æºæ˜¯å¦å‘é€äº†æŠ•é€’ ID è¯·æ±‚å¤´ï¼ˆ`X-GitHub-Delivery` æˆ– `X-Request-ID`ï¼‰
- æŠ•é€’ ID ç¼“å­˜ 1 å°æ—¶

### `gh` CLI é”™è¯¯ï¼ˆGitHub è¯„è®ºæŠ•é€’ï¼‰

- åœ¨ gateway ä¸»æœºä¸Šè¿è¡Œ `gh auth login`
- ç¡®ä¿å·²è®¤è¯çš„ GitHub ç”¨æˆ·å¯¹è¯¥ä»“åº“æœ‰å†™æƒé™
- æ£€æŸ¥ `gh` æ˜¯å¦å·²å®‰è£…å¹¶åœ¨ PATH ä¸­

---

## çŽ¯å¢ƒå˜é‡ {#environment-variables}

| å˜é‡ | æè¿° | é»˜è®¤å€¼ |
|----------|-------------|---------|
| `WEBHOOK_ENABLED` | å¯ç”¨ webhook å¹³å°é€‚é…å™¨ | `false` |
| `WEBHOOK_PORT` | æŽ¥æ”¶ webhook çš„ HTTP æœåŠ¡å™¨ç«¯å£ | `8644` |
| `WEBHOOK_SECRET` | å…¨å±€ HMAC secretï¼ˆè·¯ç”±æœªæŒ‡å®šè‡ªèº« secret æ—¶ä½œä¸ºå›žé€€ï¼‰ | _ï¼ˆæ— ï¼‰_ |