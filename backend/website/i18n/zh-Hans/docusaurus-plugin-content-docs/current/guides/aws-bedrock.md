---
sidebar_position: 14
title: "AWS Bedrock"
description: "å°† Zed Agent ä¸Ž Amazon Bedrock é…åˆä½¿ç”¨â€”â€”åŽŸç”Ÿ Converse APIã€IAM èº«ä»½éªŒè¯ã€Guardrails åŠè·¨åŒºåŸŸæŽ¨ç†"
---

# AWS Bedrock

Zed Agent é€šè¿‡ **Converse API** åŽŸç”Ÿæ”¯æŒ Amazon Bedrockâ€”â€”è€Œéž OpenAI å…¼å®¹ç«¯ç‚¹ã€‚è¿™è®©ä½ å¯ä»¥å®Œæ•´è®¿é—® Bedrock ç”Ÿæ€ç³»ç»Ÿï¼šIAM èº«ä»½éªŒè¯ã€Guardrailsã€è·¨åŒºåŸŸæŽ¨ç†é…ç½®æ–‡ä»¶ä»¥åŠæ‰€æœ‰åŸºç¡€æ¨¡åž‹ã€‚

## å‰ææ¡ä»¶

- **AWS å‡­è¯** â€” [boto3 å‡­è¯é“¾](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html)æ”¯æŒçš„ä»»æ„æ¥æºï¼š
  - IAM å®žä¾‹è§’è‰²ï¼ˆEC2ã€ECSã€Lambda â€” é›¶é…ç½®ï¼‰
  - `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` çŽ¯å¢ƒå˜é‡
  - `AWS_PROFILE`ï¼ˆç”¨äºŽ SSO æˆ–å‘½åé…ç½®æ–‡ä»¶ï¼‰
  - `aws configure`ï¼ˆç”¨äºŽæœ¬åœ°å¼€å‘ï¼‰
- **boto3** â€” é€šè¿‡ `pip install zed-agent[bedrock]` å®‰è£…
- **IAM æƒé™** â€” è‡³å°‘éœ€è¦ï¼š
  - `bedrock:InvokeModel` å’Œ `bedrock:InvokeModelWithResponseStream`ï¼ˆç”¨äºŽæŽ¨ç†ï¼‰
  - `bedrock:ListFoundationModels` å’Œ `bedrock:ListInferenceProfiles`ï¼ˆç”¨äºŽæ¨¡åž‹å‘çŽ°ï¼‰

:::tip EC2 / ECS / Lambda
åœ¨ AWS è®¡ç®—çŽ¯å¢ƒä¸­ï¼Œä¸ºå®žä¾‹é™„åŠ å¸¦æœ‰ `AmazonBedrockFullAccess` çš„ IAM è§’è‰²å³å¯ã€‚æ— éœ€ API å¯†é’¥ï¼Œæ— éœ€ `.env` é…ç½®â€”â€”Zed ä¼šè‡ªåŠ¨æ£€æµ‹å®žä¾‹è§’è‰²ã€‚
:::

## å¿«é€Ÿå¼€å§‹

```bash
# å®‰è£…å¹¶å¯ç”¨ Bedrock æ”¯æŒ
pip install zed-agent[bedrock]

# é€‰æ‹© Bedrock ä½œä¸ºæä¾›å•†
zed model
# â†’ é€‰æ‹© "More providers..." â†’ "AWS Bedrock"
# â†’ é€‰æ‹©ä½ çš„åŒºåŸŸå’Œæ¨¡åž‹

# å¼€å§‹å¯¹è¯
zed chat
```

## é…ç½®

è¿è¡Œ `zed model` åŽï¼Œä½ çš„ `~/.zed/config.yaml` å°†åŒ…å«ä»¥ä¸‹å†…å®¹ï¼š

```yaml
model:
  default: us.anthropic.claude-sonnet-4-6
  provider: bedrock
  base_url: https://bedrock-runtime.us-east-2.amazonaws.com

bedrock:
  region: us-east-2
```

### åŒºåŸŸ

é€šè¿‡ä»¥ä¸‹ä»»æ„æ–¹å¼è®¾ç½® AWS åŒºåŸŸï¼ˆä¼˜å…ˆçº§ä»Žé«˜åˆ°ä½Žï¼‰ï¼š

1. `config.yaml` ä¸­çš„ `bedrock.region`
2. `AWS_REGION` çŽ¯å¢ƒå˜é‡
3. `AWS_DEFAULT_REGION` çŽ¯å¢ƒå˜é‡
4. é»˜è®¤å€¼ï¼š`us-east-1`

### Guardrails

è¦å¯¹æ‰€æœ‰æ¨¡åž‹è°ƒç”¨åº”ç”¨ [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html)ï¼š

```yaml
bedrock:
  region: us-east-2
  guardrail:
    guardrail_identifier: "abc123def456"  # æ¥è‡ª Bedrock æŽ§åˆ¶å°
    guardrail_version: "1"                # ç‰ˆæœ¬å·æˆ– "DRAFT"
    stream_processing_mode: "async"       # "sync" æˆ– "async"
    trace: "disabled"                     # "enabled"ã€"disabled" æˆ– "enabled_full"
```

### æ¨¡åž‹å‘çŽ°

Zed é€šè¿‡ Bedrock æŽ§åˆ¶å¹³é¢è‡ªåŠ¨å‘çŽ°å¯ç”¨æ¨¡åž‹ã€‚ä½ å¯ä»¥è‡ªå®šä¹‰å‘çŽ°è¡Œä¸ºï¼š

```yaml
bedrock:
  discovery:
    enabled: true
    provider_filter: ["anthropic", "amazon"]  # ä»…æ˜¾ç¤ºè¿™äº›æä¾›å•†
    refresh_interval: 3600                     # ç¼“å­˜ 1 å°æ—¶
```

## å¯ç”¨æ¨¡åž‹

Bedrock æ¨¡åž‹ä½¿ç”¨**æŽ¨ç†é…ç½®æ–‡ä»¶ ID** è¿›è¡ŒæŒ‰éœ€è°ƒç”¨ã€‚`zed model` é€‰æ‹©å™¨ä¼šè‡ªåŠ¨æ˜¾ç¤ºè¿™äº› IDï¼Œå¹¶å°†æŽ¨èæ¨¡åž‹ç½®äºŽé¡¶éƒ¨ï¼š

| æ¨¡åž‹ | ID | å¤‡æ³¨ |
|-------|-----|-------|
| Claude Sonnet 4.6 | `us.anthropic.claude-sonnet-4-6` | æŽ¨èâ€”â€”é€Ÿåº¦ä¸Žèƒ½åŠ›çš„æœ€ä½³å¹³è¡¡ |
| Claude Opus 4.6 | `us.anthropic.claude-opus-4-6-v1` | èƒ½åŠ›æœ€å¼º |
| Claude Haiku 4.5 | `us.anthropic.claude-haiku-4-5-20251001-v1:0` | æœ€å¿«çš„ Claude |
| Amazon Nova Pro | `us.amazon.nova-pro-v1:0` | Amazon æ——èˆ°æ¨¡åž‹ |
| Amazon Nova Micro | `us.amazon.nova-micro-v1:0` | æœ€å¿«ã€æœ€ç»æµŽ |
| DeepSeek V3.2 | `deepseek.v3.2` | å¼ºå¤§çš„å¼€æºæ¨¡åž‹ |
| Llama 4 Scout 17B | `us.meta.llama4-scout-17b-instruct-v1:0` | Meta æœ€æ–°æ¨¡åž‹ |

:::info è·¨åŒºåŸŸæŽ¨ç†
ä»¥ `us.` ä¸ºå‰ç¼€çš„æ¨¡åž‹ä½¿ç”¨è·¨åŒºåŸŸæŽ¨ç†é…ç½®æ–‡ä»¶ï¼Œå¯åœ¨å¤šä¸ª AWS åŒºåŸŸé—´æä¾›æ›´å¥½çš„å®¹é‡ä¿éšœå’Œè‡ªåŠ¨æ•…éšœè½¬ç§»ã€‚ä»¥ `global.` ä¸ºå‰ç¼€çš„æ¨¡åž‹åˆ™åœ¨å…¨çƒæ‰€æœ‰å¯ç”¨åŒºåŸŸé—´è·¯ç”±ã€‚
:::

## ä¼šè¯ä¸­é€”åˆ‡æ¢æ¨¡åž‹

åœ¨å¯¹è¯è¿‡ç¨‹ä¸­ä½¿ç”¨ `/model` å‘½ä»¤ï¼š

```
/model us.amazon.nova-pro-v1:0
/model deepseek.v3.2
/model us.anthropic.claude-opus-4-6-v1
```

## è¯Šæ–­

```bash
zed doctor
```

è¯Šæ–­å·¥å…·ä¼šæ£€æŸ¥ï¼š
- AWS å‡­è¯æ˜¯å¦å¯ç”¨ï¼ˆçŽ¯å¢ƒå˜é‡ã€IAM è§’è‰²ã€SSOï¼‰
- `boto3` æ˜¯å¦å·²å®‰è£…
- Bedrock API æ˜¯å¦å¯è¾¾ï¼ˆListFoundationModelsï¼‰
- ä½ æ‰€åœ¨åŒºåŸŸçš„å¯ç”¨æ¨¡åž‹æ•°é‡

## Gatewayï¼ˆæ¶ˆæ¯å¹³å°ï¼‰

Bedrock å¯ä¸Žæ‰€æœ‰ Zed gateway å¹³å°é…åˆä½¿ç”¨ï¼ˆTelegramã€Discordã€Slackã€é£žä¹¦ç­‰ï¼‰ã€‚å°† Bedrock é…ç½®ä¸ºæä¾›å•†åŽï¼Œæ­£å¸¸å¯åŠ¨ gateway å³å¯ï¼š

```bash
zed gateway setup
zed gateway start
```

Gateway è¯»å– `config.yaml` å¹¶ä½¿ç”¨ç›¸åŒçš„ Bedrock æä¾›å•†é…ç½®ã€‚

## æ•…éšœæŽ’æŸ¥

### "No API key found" / "No AWS credentials"

Zed æŒ‰ä»¥ä¸‹é¡ºåºæ£€æŸ¥å‡­è¯ï¼š
1. `AWS_BEARER_TOKEN_BEDROCK`
2. `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY`
3. `AWS_PROFILE`
4. EC2 å®žä¾‹å…ƒæ•°æ®ï¼ˆIMDSï¼‰
5. ECS å®¹å™¨å‡­è¯
6. Lambda æ‰§è¡Œè§’è‰²

è‹¥å‡æœªæ‰¾åˆ°ï¼Œè¯·è¿è¡Œ `aws configure` æˆ–ä¸ºä½ çš„è®¡ç®—å®žä¾‹é™„åŠ  IAM è§’è‰²ã€‚

### "Invocation of model ID ... with on-demand throughput isn't supported"

è¯·ä½¿ç”¨**æŽ¨ç†é…ç½®æ–‡ä»¶ ID**ï¼ˆä»¥ `us.` æˆ– `global.` ä¸ºå‰ç¼€ï¼‰ï¼Œè€Œéžè£¸åŸºç¡€æ¨¡åž‹ IDã€‚ä¾‹å¦‚ï¼š
- âŒ `anthropic.claude-sonnet-4-6`
- âœ… `us.anthropic.claude-sonnet-4-6`

### "ThrottlingException"

ä½ å·²è§¦åŠ Bedrock å•æ¨¡åž‹é€ŸçŽ‡é™åˆ¶ã€‚Zed ä¼šè‡ªåŠ¨è¿›è¡Œé€€é¿é‡è¯•ã€‚å¦‚éœ€æé«˜é™é¢ï¼Œè¯·åœ¨ [AWS Service Quotas æŽ§åˆ¶å°](https://console.aws.amazon.com/servicequotas/)ç”³è¯·é…é¢æå‡ã€‚

## ä¸€é”® AWS éƒ¨ç½²

å¦‚éœ€åœ¨ EC2 ä¸Šé€šè¿‡ CloudFormation è¿›è¡Œå…¨è‡ªåŠ¨éƒ¨ç½²ï¼š

**[sample-zed-agent-on-aws-with-bedrock](https://github.com/JiaDe-Wu/sample-zed-agent-on-aws-with-bedrock)** â€” è‡ªåŠ¨åˆ›å»º VPCã€IAM è§’è‰²ã€EC2 å®žä¾‹å¹¶é…ç½® Bedrockã€‚ä¸€é”®å³å¯åœ¨ä»»æ„åŒºåŸŸå®Œæˆéƒ¨ç½²ã€‚