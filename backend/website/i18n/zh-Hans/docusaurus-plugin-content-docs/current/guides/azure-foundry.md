---
sidebar_position: 15
title: "Microsoft Foundry"
description: "å°† Zed Agent ä¸Ž Microsoft Foundry é…åˆä½¿ç”¨â€”â€”OpenAI é£Žæ ¼ä¸Ž Anthropic é£Žæ ¼ç«¯ç‚¹ã€ä¼ è¾“åè®®ä¸Žå·²éƒ¨ç½²æ¨¡åž‹çš„è‡ªåŠ¨æ£€æµ‹"
---

# Microsoft Foundry

Zed Agent çš„ `azure-foundry` provider æ”¯æŒ Microsoft Foundryï¼ˆåŽŸ Azure AI Foundryï¼‰å’Œ Azure OpenAIã€‚å•ä¸ª Foundry èµ„æºå¯ä»¥æ‰˜ç®¡ä¸¤ç§ä¸åŒä¼ è¾“æ ¼å¼çš„æ¨¡åž‹ï¼š

- **OpenAI é£Žæ ¼** â€” åœ¨ `https://<resource>.openai.azure.com/openai/v1` ç­‰ç«¯ç‚¹ä¸Šæ‰§è¡Œ `POST /v1/chat/completions`ã€‚ç”¨äºŽ GPT-4.xã€GPT-5.xã€Llamaã€Mistral åŠå¤§å¤šæ•°å¼€æ”¾æƒé‡æ¨¡åž‹ã€‚
- **Anthropic é£Žæ ¼** â€” åœ¨ `https://<resource>.services.ai.azure.com/anthropic` ç­‰ç«¯ç‚¹ä¸Šæ‰§è¡Œ `POST /v1/messages`ã€‚å½“ Microsoft Foundry é€šè¿‡ Anthropic Messages API æ ¼å¼æä¾› Claude æ¨¡åž‹æ—¶ä½¿ç”¨ã€‚

è®¾ç½®å‘å¯¼ä¼šæŽ¢æµ‹ä½ çš„ç«¯ç‚¹å¹¶è‡ªåŠ¨æ£€æµ‹æ‰€ä½¿ç”¨çš„ä¼ è¾“åè®®ã€å¯ç”¨çš„éƒ¨ç½²ä»¥åŠæ¯ä¸ªæ¨¡åž‹çš„ä¸Šä¸‹æ–‡é•¿åº¦ã€‚

## å‰ææ¡ä»¶

- ä¸€ä¸ªè‡³å°‘åŒ…å«ä¸€ä¸ªéƒ¨ç½²çš„ Microsoft Foundry æˆ– Azure OpenAI èµ„æº
- è¯¥éƒ¨ç½²çš„ç«¯ç‚¹ URL
- **ä»¥ä¸‹ä¹‹ä¸€**ï¼šAPI å¯†é’¥ï¼ˆä»Ž Azure Portal çš„"Keys and Endpoint"èŽ·å–ï¼‰ï¼Œ**æˆ–è€…**åœ¨ Foundry èµ„æºä¸Šæ‹¥æœ‰ **Azure AI User** RBAC è§’è‰²ï¼ˆå¦‚æžœä½ è®¡åˆ’ä½¿ç”¨ Microsoft Entra IDâ€”â€”å³ Microsoft æŽ¨èçš„æ— å¯†é’¥æ–¹å¼ï¼‰ã€‚æŸäº›ç§Ÿæˆ·åœ¨ Microsoft é‡å‘½åæŽ¨å‡ºæœŸé—´å¯èƒ½å°†è¯¥è§’è‰²æ˜¾ç¤ºä¸º **Foundry User**ã€‚

## å¿«é€Ÿå¼€å§‹

```bash
zed model
# â†’ é€‰æ‹© "Azure Foundry"
# â†’ è¾“å…¥ä½ çš„ç«¯ç‚¹ URL
# â†’ é€‰æ‹©è®¤è¯æ–¹å¼ï¼š
#     1. API key
#     2. Microsoft Entra IDï¼ˆæ‰˜ç®¡æ ‡è¯† / å·¥ä½œè´Ÿè½½æ ‡è¯† / az loginï¼‰
# â†’ ï¼ˆEntraï¼‰Zed æŽ¢æµ‹ DefaultAzureCredentialï¼›æˆåŠŸåŽä¸å†è¯¢é—®å¯†é’¥
# â†’ ï¼ˆAPI keyï¼‰è¾“å…¥ä½ çš„ API å¯†é’¥
# Zed æŽ¢æµ‹ç«¯ç‚¹å¹¶è‡ªåŠ¨æ£€æµ‹ä¼ è¾“åè®® + æ¨¡åž‹
# â†’ ä»Žåˆ—è¡¨ä¸­é€‰æ‹©æ¨¡åž‹ï¼ˆæˆ–æ‰‹åŠ¨è¾“å…¥éƒ¨ç½²åç§°ï¼‰
```

å‘å¯¼å°†æ‰§è¡Œä»¥ä¸‹æ“ä½œï¼š

1. **å—…æŽ¢ URL è·¯å¾„** â€” ä»¥ `/anthropic` ç»“å°¾çš„ URL è¢«è¯†åˆ«ä¸º Microsoft Foundry Claude è·¯ç”±ã€‚
2. **æŽ¢æµ‹ `GET <base>/models`** â€” å¦‚æžœç«¯ç‚¹è¿”å›ž OpenAI æ ¼å¼çš„æ¨¡åž‹åˆ—è¡¨ï¼ŒZed åˆ‡æ¢åˆ° `chat_completions` å¹¶ç”¨è¿”å›žçš„éƒ¨ç½² ID é¢„å¡«é€‰æ‹©å™¨ã€‚
3. **æŽ¢æµ‹ Anthropic Messages æ ¼å¼** â€” é’ˆå¯¹ä¸æš´éœ² `/models` ä½†æŽ¥å— Anthropic Messages æ ¼å¼çš„ç«¯ç‚¹çš„å›žé€€æ–¹æ¡ˆã€‚
4. **å›žé€€åˆ°æ‰‹åŠ¨è¾“å…¥** â€” æ‹’ç»æ‰€æœ‰æŽ¢æµ‹çš„ç§æœ‰/å—é™ç«¯ç‚¹ä»ç„¶å¯ç”¨ï¼›ä½ æ‰‹åŠ¨é€‰æ‹© API æ¨¡å¼å¹¶è¾“å…¥éƒ¨ç½²åç§°ã€‚

æ‰€é€‰æ¨¡åž‹çš„ä¸Šä¸‹æ–‡é•¿åº¦é€šè¿‡ Zed çš„æ ‡å‡†å…ƒæ•°æ®é“¾ï¼ˆ`models.dev`ã€provider å…ƒæ•°æ®åŠç¡¬ç¼–ç çš„ç³»åˆ—å›žé€€ï¼‰è§£æžï¼Œå¹¶å­˜å‚¨åœ¨ `config.yaml` ä¸­ï¼Œä»¥ä¾¿æ¨¡åž‹æ­£ç¡®ç¡®å®šè‡ªèº«çš„ä¸Šä¸‹æ–‡çª—å£å¤§å°ã€‚

## Microsoft Entra IDï¼ˆæ— å¯†é’¥ï¼ŒRBACï¼‰â€”â€”æŽ¨è

Microsoft æŽ¨èåœ¨ç”Ÿäº§ Foundry å·¥ä½œè´Ÿè½½ä¸­ä½¿ç”¨ [Microsoft Entra ID æ— å¯†é’¥è®¤è¯](https://learn.microsoft.com/azure/ai-foundry/foundry-models/how-to/configure-entra-id)ã€‚Zed å¯¹**ä¸¤ç§** API æŽ¥å£å‡æ”¯æŒ Entra IDï¼š

- **OpenAI é£Žæ ¼**ï¼ˆ`api_mode: chat_completions` / `codex_responses`ï¼‰â€” GPT-4/5ã€Llamaã€Mistralã€DeepSeek ç­‰ã€‚
- **Anthropic é£Žæ ¼**ï¼ˆ`api_mode: anthropic_messages`ï¼‰â€” Microsoft Foundry ä¸Šçš„ Claude æ¨¡åž‹ã€‚

Foundry çš„ RBAC æ˜¯æŒ‰èµ„æºçº§åˆ«çš„ï¼ˆ`Azure AI User` æŽˆäºˆä¸¤ç§æŽ¥å£çš„è®¿é—®æƒé™ï¼›æŸäº›ç§Ÿæˆ·å¯èƒ½æ˜¾ç¤ºä¸º `Foundry User`ï¼‰ï¼ŒMicrosoft æ–‡æ¡£å¯¹ä¸¤è€…ä½¿ç”¨ç›¸åŒçš„æŽ¨ç† scopeï¼ˆ`https://ai.azure.com/.default`ï¼‰ã€‚åº•å±‚å®žçŽ°ï¼š

- OpenAI é£Žæ ¼ä½¿ç”¨ OpenAI Python SDK åŽŸç”Ÿçš„å¯è°ƒç”¨ `api_key=` å¥‘çº¦â€”â€”SDK æ¯æ¬¡è¯·æ±‚è‡ªåŠ¨ç”Ÿæˆæ–°çš„ JWTã€‚
- Anthropic é£Žæ ¼ä½¿ç”¨å¸¦æœ‰è¯·æ±‚äº‹ä»¶ hook çš„ `httpx.Client`ï¼Œè¯¥ hook ç”± `agent.azure_identity_adapter.build_bearer_http_client` å®‰è£…ï¼Œå› ä¸º Anthropic SDK åŽŸç”Ÿä¸æŽ¥å—å¯è°ƒç”¨çš„ `auth_token`ã€‚è¯¥ hook åœ¨æ¯æ¬¡å‡ºç«™è¯·æ±‚æ—¶é‡å†™ `Authorization: Bearer <fresh-jwt>`ã€‚RBAC å’Œ Foundry scope ç›¸åŒâ€”â€”å”¯ä¸€çš„åŒºåˆ«åœ¨äºŽ SDK å¥‘çº¦ã€‚

### ä¸ºä»€ä¹ˆä½¿ç”¨ Entra IDï¼Ÿ

- æ— éœ€è½®æ¢æˆ–åŠé”€é•¿æœŸæœ‰æ•ˆçš„ API å¯†é’¥ã€‚
- RBAC é©±åŠ¨çš„è®¿é—®æŽ§åˆ¶â€”â€”åœ¨ Foundry èµ„æºä¸ŠæŽˆäºˆæˆ–ç§»é™¤ `Azure AI User`ï¼Œæ— éœ€é‡å†™é…ç½®ã€‚
- è®¿é—®å’Œå®¡è®¡æ—¥å¿—æŒ‰è¢«åˆ†é…è€…åˆ†æ®µï¼Œè€Œéžæ‰€æœ‰è°ƒç”¨è€…å…±äº«ä¸€ä¸ªé™æ€å¯†é’¥ã€‚
- é€šè¿‡æ‰˜ç®¡æ ‡è¯†ï¼Œä¸º Azure VMã€AKS Podã€App Serviceã€Functionsã€Container Apps å’Œ Foundry Agent Service æä¾›ç»Ÿä¸€çš„è®¤è¯æŽ¥å£ã€‚
- æ”¯æŒ CI/CD æµæ°´çº¿çš„å·¥ä½œè´Ÿè½½æ ‡è¯†å’ŒæœåŠ¡ä¸»ä½“æµç¨‹ã€‚

### ä¸€æ¬¡æ€§è®¾ç½®ï¼ˆAzure ä¾§ï¼‰

1. åœ¨ Azure Portal ä¸­ï¼Œæ‰“å¼€ä½ çš„ Foundry èµ„æº â†’ **è®¿é—®æŽ§åˆ¶ (IAM)** â†’ **æ·»åŠ  â†’ æ·»åŠ è§’è‰²åˆ†é…**ã€‚
2. é€‰æ‹© **Azure AI User** è§’è‰²ï¼ˆå¦‚æžœä½ çš„ç§Ÿæˆ·å·²é‡å‘½åï¼Œåˆ™é€‰æ‹© **Foundry User**ï¼‰ã€‚
3. å°†å…¶åˆ†é…ç»™ï¼š
   - **ä½ çš„ç”¨æˆ·è´¦æˆ·**ï¼Œç”¨äºŽé€šè¿‡ `az login` è¿›è¡Œæœ¬åœ°å¼€å‘ã€‚
   - **æ‰˜ç®¡æ ‡è¯†æˆ–å·¥ä½œè´Ÿè½½æ ‡è¯†**ï¼Œç”¨äºŽ Azure æ‰˜ç®¡è®¡ç®—ï¼ˆç”Ÿäº§çŽ¯å¢ƒæŽ¨èï¼‰ã€‚
   - **Foundry Agent Service æ‰˜ç®¡ Agent çš„ Agent æ ‡è¯†**ï¼Œå½“ Zed åœ¨æ‰˜ç®¡ Agent å†…è¿è¡Œæ—¶ã€‚
   - **æœåŠ¡ä¸»ä½“**ï¼Œç”¨äºŽå·¥ä½œè´Ÿè½½æ ‡è¯†ä¸å¯ç”¨æ—¶çš„ CI/CD æµæ°´çº¿ã€‚
4. ç­‰å¾…çº¦ 5 åˆ†é’Ÿä»¥ä½¿è§’è‰²ç”Ÿæ•ˆã€‚

Azure CLI ç­‰æ•ˆå‘½ä»¤ï¼š

```bash
az role assignment create \
  --assignee <principal-or-agent-identity-client-id> \
  --role "Azure AI User" \
  --scope <foundry-resource-id>
```

### ä¸€æ¬¡æ€§è®¾ç½®ï¼ˆZed ä¾§ï¼‰

```bash
zed model
# â†’ é€‰æ‹© "Azure Foundry"
# â†’ è¾“å…¥ä½ çš„ç«¯ç‚¹ URL
# â†’ è®¤è¯æ–¹å¼ï¼š2ï¼ˆMicrosoft Entra IDï¼‰
# â†’ ï¼ˆå¯é€‰ï¼‰ç”¨æˆ·åˆ†é…çš„æ‰˜ç®¡æ ‡è¯†å®¢æˆ·ç«¯ ID
# â†’ ï¼ˆå¯é€‰ï¼‰Azure ç§Ÿæˆ· ID
# â†’ Zed æŽ¢æµ‹ DefaultAzureCredential() å¹¶æŠ¥å‘Šå“ªä¸ªå†…éƒ¨å‡­æ®æˆåŠŸ
#    ï¼ˆä¾‹å¦‚ AzureCliCredentialã€ManagedIdentityCredentialï¼‰
```

å‘å¯¼è¿è¡Œä¸€ä¸ªæœ‰æ—¶é—´é™åˆ¶çš„é¢„æ£€æŽ¢æµ‹ï¼ˆ10 ç§’è¶…æ—¶ï¼‰ã€‚å¤±è´¥æ—¶æä¾›"ä»ç„¶ä¿å­˜ï¼Œç¨åŽéªŒè¯"é€‰é¡¹â€”â€”é€‚ç”¨äºŽåœ¨å½“å‰æœºå™¨ä¸Šå°šæ— å‡­æ®ä½†è¿è¡Œæ—¶ä¼šæœ‰å‡­æ®çš„åœºæ™¯ï¼ˆä¾‹å¦‚ä¸ºæ‰˜ç®¡æ ‡è¯†éƒ¨ç½²å‡†å¤‡é…ç½®ï¼‰ã€‚

`azure-identity` åœ¨é¦–æ¬¡ä½¿ç”¨æ—¶é€šè¿‡ Zed çš„æ‡’åŠ è½½å®‰è£…è·¯å¾„è‡ªåŠ¨å®‰è£…ã€‚å¦‚éœ€é¢„å…ˆå®‰è£…ï¼š

```bash
pip install azure-identity
```

### å†™å…¥ `config.yaml` çš„é…ç½®

```yaml
model:
  provider: azure-foundry
  base_url: https://my-resource.openai.azure.com/openai/v1
  api_mode: chat_completions
  auth_mode: entra_id
  default: gpt-4o
  context_length: 128000
  entra:
    scope: https://ai.azure.com/.default        # ä»…åœ¨è¦†ç›–é»˜è®¤å€¼æ—¶ä½¿ç”¨
```

Zed åœ¨ `config.yaml` ä¸­åªç®¡ç†ä¸€ä¸ª Entra ä¸“å±žé…ç½®é¡¹ï¼š

- **`scope`** â€” OAuth èµ„æº scopeã€‚é»˜è®¤ä¸º Microsoft æ–‡æ¡£ä¸­çš„æŽ¨ç† scopeï¼ˆ`https://ai.azure.com/.default`ï¼‰ã€‚ä»…åœ¨ä½ çš„èµ„æºé’ˆå¯¹éžæ ‡å‡† audience è¿›è¡Œäº†é¢„é…æ—¶æ‰éœ€è¦è¦†ç›–ã€‚

å…¶ä»–æ‰€æœ‰å†…å®¹ï¼ˆç§Ÿæˆ·ã€æœåŠ¡ä¸»ä½“å¯†é’¥ã€è”åˆä»¤ç‰Œæ–‡ä»¶ã€ä¸»æƒäº‘ authorityã€broker åå¥½ï¼‰å‡ç”± `azure-identity` ç›´æŽ¥ä»Žæ ‡å‡† `AZURE_*` çŽ¯å¢ƒå˜é‡è¯»å–â€”â€”å‚è§ä¸‹æ–¹çš„[å‡­æ®è§£æžé¡ºåº](#credential-resolution-order)ã€‚åœ¨ `~/.zed/.env` æˆ–ä½ çš„éƒ¨ç½²çŽ¯å¢ƒä¸­è®¾ç½®è¿™äº›å˜é‡ï¼Œä¸Ž Microsoft SDK å‚è€ƒæ–‡æ¡£çš„æè¿°å®Œå…¨ä¸€è‡´ã€‚

Entra æ¨¡å¼ä¸‹ä¸ä¼šå°†ä»»ä½•å¯†é’¥å†™å…¥ `~/.zed/.env`â€”â€”`azure-identity` åœ¨è¿›ç¨‹å†…ç¼“å­˜ä»¤ç‰Œï¼ˆåœ¨å¯ç”¨æ—¶ä¹Ÿä¼šä½¿ç”¨æ“ä½œç³»ç»Ÿå¯†é’¥é“¾ / `~/.IdentityService`ï¼‰ã€‚

### å‡­æ®è§£æžé¡ºåº

`azure-identity` çš„ `DefaultAzureCredential` åœ¨æ¯æ¬¡ä»¤ç‰Œè¯·æ±‚æ—¶æŒ‰ä»¥ä¸‹é“¾è·¯é€ä¸€å°è¯•ï¼Œåœ¨ç¬¬ä¸€ä¸ªè¿”å›žä»¤ç‰Œçš„å‡­æ®å¤„åœæ­¢ï¼š

1. **çŽ¯å¢ƒå‡­æ®** â€” `AZURE_TENANT_ID` + `AZURE_CLIENT_ID` + `AZURE_CLIENT_SECRET`ï¼ˆæˆ– `AZURE_CLIENT_CERTIFICATE_PATH` / `AZURE_FEDERATED_TOKEN_FILE`ï¼‰ã€‚
2. **å·¥ä½œè´Ÿè½½æ ‡è¯†** â€” `AZURE_FEDERATED_TOKEN_FILE`ï¼ˆAKS è”åˆä»¤ç‰Œ / OIDCï¼‰ã€‚
3. **æ‰˜ç®¡æ ‡è¯†** â€” è™šæ‹Ÿæœºä½¿ç”¨ IMDS ç«¯ç‚¹ï¼ˆ`169.254.169.254`ï¼‰ï¼›App Service / Functions / Container Apps ä½¿ç”¨ `IDENTITY_ENDPOINT`ã€‚Foundry Agent Service æ‰˜ç®¡ Agent ä½¿ç”¨æ‰˜ç®¡ Agent çš„ Agent æ ‡è¯†ã€‚
4. **Visual Studio Code** â€” Azure è´¦æˆ·æ‰©å±•ã€‚
5. **Azure CLI** â€” `az login` ä¼šè¯ã€‚
6. **Azure Developer CLI** â€” `azd auth login`ã€‚
7. **Azure PowerShell** â€” `Connect-AzAccount`ã€‚
8. **Broker**ï¼ˆä»…é™ Windows / WSLï¼‰â€” Web Account Managerã€‚

äº¤äº’å¼æµè§ˆå™¨å‡­æ®åœ¨æ— äººå€¼å®ˆçš„ Zed è¿è¡Œä¸­é»˜è®¤è¢«æŽ’é™¤ï¼›è¯·æ”¹ç”¨ Azure CLIã€Azure Developer CLIã€æ‰˜ç®¡æ ‡è¯†ã€å·¥ä½œè´Ÿè½½æ ‡è¯†æˆ–æœåŠ¡ä¸»ä½“å‡­æ®ã€‚

### éƒ¨ç½²æ¨¡å¼

**æœ¬åœ°å¼€å‘ï¼š**
```bash
az login
zed model   # é€‰æ‹© Azure Foundry â†’ Entra ID
zed         # ä½¿ç”¨ä½ çš„ az login ä»¤ç‰Œ
```

**Azure VM / Functions / App Service / Container Appsï¼ˆç³»ç»Ÿåˆ†é…çš„æ‰˜ç®¡æ ‡è¯†ï¼‰ï¼š**
1. åœ¨è®¡ç®—èµ„æºä¸Šå¯ç”¨ç³»ç»Ÿåˆ†é…çš„æ ‡è¯†ã€‚
2. åœ¨ Foundry èµ„æºä¸Šä¸ºè¯¥æ ‡è¯†æŽˆäºˆ `Azure AI User`ï¼ˆæˆ– `Foundry User`ï¼‰è§’è‰²ã€‚
3. åœ¨ config.yaml ä¸­è®¾ç½® `model.auth_mode: entra_id`â€”â€”æ— éœ€çŽ¯å¢ƒå˜é‡ã€‚

**Azure VM / Functions / App Service / Container Appsï¼ˆç”¨æˆ·åˆ†é…çš„æ‰˜ç®¡æ ‡è¯†ï¼‰ï¼š**
- å°† `AZURE_CLIENT_ID` è®¾ç½®ä¸ºç”¨æˆ·åˆ†é…æ ‡è¯†çš„å®¢æˆ·ç«¯ IDï¼Œä»¥ä¾¿ `DefaultAzureCredential` é€‰æ‹©æ­£ç¡®çš„æ ‡è¯†ã€‚

**Foundry Agent Service æ‰˜ç®¡ Agentï¼š**
- åˆ›å»ºæ‰˜ç®¡ Agent å¹¶åœ¨ Foundry èµ„æºä¸Šä¸ºè¯¥ Agent çš„æ ‡è¯†æŽˆäºˆ `Azure AI User`ï¼ˆæˆ– `Foundry User`ï¼‰è§’è‰²ã€‚Zed åœ¨æ‰˜ç®¡ Agent å†…éƒ¨ä½¿ç”¨ `ManagedIdentityCredential`ï¼›è§’è‰²åˆ†é…åº”é’ˆå¯¹ Agent æ ‡è¯†ï¼Œè€Œéžä»…é’ˆå¯¹çˆ¶é¡¹ç›®æˆ–ä½ çš„ç”¨æˆ·ã€‚

**AKS å·¥ä½œè´Ÿè½½æ ‡è¯†ï¼ˆæ›¿ä»£ AAD Pod Identityï¼‰ï¼š**
- ä½¿ç”¨å·¥ä½œè´Ÿè½½æ ‡è¯†å®¢æˆ·ç«¯ ID æ³¨è§£ Pod çš„æœåŠ¡è´¦æˆ·ã€‚
- Pod çš„è”åˆä»¤ç‰Œæ–‡ä»¶é€šè¿‡ `AZURE_FEDERATED_TOKEN_FILE` è‡ªåŠ¨æ£€æµ‹ã€‚
- `model.auth_mode: entra_id` æ— éœ€è¿›ä¸€æ­¥ä¿®æ”¹é…ç½®å³å¯ä½¿ç”¨ã€‚

**CI ä¸­çš„æœåŠ¡ä¸»ä½“ï¼š**
- åœ¨ runner çŽ¯å¢ƒä¸­è®¾ç½® `AZURE_TENANT_ID`ã€`AZURE_CLIENT_ID`ã€`AZURE_CLIENT_SECRET`ã€‚

#### ä¸»æƒäº‘ï¼ˆæ”¿åºœäº‘ã€ä¸­å›½äº‘ï¼‰

å¯¼å‡º `AZURE_AUTHORITY_HOST`ï¼ˆä¾‹å¦‚ Azure Government ä½¿ç”¨ `https://login.microsoftonline.us`ï¼ŒAzure China ä½¿ç”¨ `https://login.partner.microsoftonline.cn`ï¼‰ã€‚`azure-identity` ä¼šç›´æŽ¥è¯»å–è¯¥å˜é‡ã€‚

### å¥åº·æ£€æŸ¥

å½“ `model.auth_mode: entra_id` æ—¶ï¼Œ`zed doctor` ä¼šå¯¹ `DefaultAzureCredential` è¿è¡Œ 10 ç§’æŽ¢æµ‹ï¼ŒæŠ¥å‘Šå“ªä¸ªå†…éƒ¨å‡­æ®æˆåŠŸï¼ˆçŽ¯å¢ƒå˜é‡æ˜¯å¦å­˜åœ¨ã€æ‰˜ç®¡æ ‡è¯†ç«¯ç‚¹æ˜¯å¦å¯è¾¾ç­‰ï¼‰ã€‚

`zed auth` æ˜¾ç¤ºç»“æž„åŒ–çŠ¶æ€å—ï¼š

```
azure-foundry (Microsoft Entra ID):
  Endpoint: https://my-resource.openai.azure.com/openai/v1
  Scope: https://ai.azure.com/.default
  Status: configured; live token probe is skipped here
```

### é™åˆ¶

- **Anthropic é£Žæ ¼ç«¯ç‚¹ä½¿ç”¨ httpx äº‹ä»¶ hookã€‚** Anthropic Python SDKï¼ˆâ‰¤ 0.86.0ï¼‰åŽŸç”Ÿä¸æŽ¥å—å¯è°ƒç”¨çš„ `auth_token`ã€‚Zed åœ¨è‡ªå®šä¹‰ `httpx.Client` ä¸Šå®‰è£…è¯·æ±‚äº‹ä»¶ hookï¼Œæ¯æ¬¡å‡ºç«™è¯·æ±‚æ—¶ç”Ÿæˆæ–°çš„ JWT å¹¶é‡å†™ `Authorization: Bearer <jwt>`ã€‚è¿™åœ¨åŠŸèƒ½ä¸Šç­‰åŒäºŽ OpenAI SDK åŽŸç”Ÿçš„ `Callable[[], str]` å¥‘çº¦ï¼Œä½†å¤šäº†ä¸€å±‚é—´æŽ¥è°ƒç”¨ã€‚å¦‚æžœ Anthropic SDK åœ¨æœªæ¥ç‰ˆæœ¬ä¸­æ·»åŠ å¯¹å¯è°ƒç”¨è®¤è¯çš„åŽŸç”Ÿæ”¯æŒï¼ŒZed å°†é€æ˜Žåœ°åˆ‡æ¢åˆ°è¯¥æ–¹å¼ã€‚
- **æ‰¹å¤„ç†ä»»åŠ¡ä¸Ž `multiprocessing.Pool`ã€‚** Entra ä»¤ç‰Œ provider æ˜¯ä¸€ä¸ªé—­åŒ…ï¼Œæ— æ³•è·¨è¿›ç¨‹è¾¹ç•Œåºåˆ—åŒ–ã€‚`batch_runner.py` ä¼šè‡ªåŠ¨ä»Ž worker é…ç½®ä¸­ç§»é™¤è¯¥å¯è°ƒç”¨å¯¹è±¡ï¼Œè®©æ¯ä¸ª worker è¿›ç¨‹ä»Ž `config.yaml` é‡å»ºè‡ªå·±çš„ providerâ€”â€”æ— éœ€ç”¨æˆ·æ“ä½œï¼Œä½†æ¯ä¸ª worker åœ¨å¯åŠ¨æ—¶éœ€è¦æ‰§è¡Œä¸€æ¬¡å‡­æ®é“¾éåŽ†ã€‚
- **ä¸åœ¨ `auth.json` ä¸­æŒä¹…åŒ– Bearer JWTã€‚** Zed ä¸å¤åˆ¶ `azure-identity` çš„å†…éƒ¨ä»¤ç‰Œç¼“å­˜ï¼›å†·å¯åŠ¨æ—¶ä¼šåœ¨é¦–æ¬¡æŽ¨ç†æ—¶éåŽ†å‡­æ®é“¾ã€‚

## é…ç½®ï¼ˆå†™å…¥ `config.yaml`ï¼‰

è¿è¡Œå‘å¯¼åŽï¼Œä½ å°†çœ‹åˆ°ç±»ä¼¼å¦‚ä¸‹çš„å†…å®¹ï¼š

```yaml
model:
  provider: azure-foundry
  base_url: https://my-resource.openai.azure.com/openai/v1
  api_mode: chat_completions         # æˆ– "anthropic_messages"
  default: gpt-5.4-mini              # ä½ çš„éƒ¨ç½² / æ¨¡åž‹åç§°
  context_length: 400000             # è‡ªåŠ¨æ£€æµ‹
```

ä»¥åŠåœ¨ `~/.zed/.env` ä¸­ï¼š

```
AZURE_FOUNDRY_API_KEY=<your-azure-key>
```

## OpenAI é£Žæ ¼ç«¯ç‚¹ï¼ˆGPTã€Llama ç­‰ï¼‰

Azure OpenAI çš„ v1 GA ç«¯ç‚¹æŽ¥å—æ ‡å‡† `openai` Python å®¢æˆ·ç«¯ï¼Œæ”¹åŠ¨æžå°‘ï¼š

```yaml
model:
  provider: azure-foundry
  base_url: https://my-resource.openai.azure.com/openai/v1
  api_mode: chat_completions
  default: gpt-5.4
```

é‡è¦è¡Œä¸ºï¼š

- **GPT-5.xã€codex å’Œ o ç³»åˆ—è‡ªåŠ¨è·¯ç”±åˆ° Responses APIã€‚** Microsoft Foundry å°† GPT-5 / codex / o1 / o3 / o4 æ¨¡åž‹éƒ¨ç½²ä¸ºä»…æ”¯æŒ Responses APIâ€”â€”å¯¹å…¶è°ƒç”¨ `/chat/completions` ä¼šè¿”å›ž `400 "The requested operation is unsupported."`ã€‚Zed é€šè¿‡åç§°æ£€æµ‹è¿™äº›æ¨¡åž‹ç³»åˆ—ï¼Œå¹¶é€æ˜Žåœ°å°† `api_mode` å‡çº§ä¸º `codex_responses`ï¼Œå³ä½¿ `config.yaml` ä¸­ä»å†™ç€ `api_mode: chat_completions`ã€‚GPT-4ã€GPT-4oã€Llamaã€Mistral åŠå…¶ä»–éƒ¨ç½²ä¿æŒä½¿ç”¨ `/chat/completions`ã€‚
- **è‡ªåŠ¨ä½¿ç”¨ `max_completion_tokens`ã€‚** Azure OpenAIï¼ˆä¸Žç›´æŽ¥ä½¿ç”¨ OpenAI ä¸€æ ·ï¼‰å¯¹ gpt-4oã€o ç³»åˆ—å’Œ gpt-5.x æ¨¡åž‹è¦æ±‚ä½¿ç”¨ `max_completion_tokens`ã€‚Zed æ ¹æ®ç«¯ç‚¹å‘é€æ­£ç¡®çš„å‚æ•°ã€‚
- **éœ€è¦ `api-version` çš„æ—§ç‰ˆç«¯ç‚¹ã€‚** å¦‚æžœä½ æœ‰ç±»ä¼¼ `https://<resource>.openai.azure.com/openai?api-version=2025-04-01-preview` çš„æ—§ç‰ˆ base URLï¼ŒZed ä¼šæå–æŸ¥è¯¢å­—ç¬¦ä¸²å¹¶é€šè¿‡æ¯æ¬¡è¯·æ±‚çš„ `default_query` è½¬å‘ï¼ˆå¦åˆ™ OpenAI SDK åœ¨æ‹¼æŽ¥è·¯å¾„æ—¶ä¼šä¸¢å¼ƒå®ƒï¼‰ã€‚

## Anthropic é£Žæ ¼ç«¯ç‚¹ï¼ˆé€šè¿‡ Microsoft Foundry ä½¿ç”¨ Claudeï¼‰

å¯¹äºŽ Claude éƒ¨ç½²ï¼Œä½¿ç”¨ Anthropic é£Žæ ¼è·¯ç”±ï¼š

```yaml
model:
  provider: azure-foundry
  base_url: https://my-resource.services.ai.azure.com/anthropic
  api_mode: anthropic_messages
  default: claude-sonnet-4-6
```

é‡è¦è¡Œä¸ºï¼š

- **ä»Ž base URL ä¸­åŽ»é™¤ `/v1`ã€‚** Anthropic SDK åœ¨æ¯æ¬¡è¯·æ±‚ URL åŽè¿½åŠ  `/v1/messages`â€”â€”Zed åœ¨å°† URL ä¼ é€’ç»™ SDK ä¹‹å‰ç§»é™¤æœ«å°¾çš„ `/v1`ï¼Œä»¥é¿å…å‡ºçŽ°åŒé‡ `/v1` è·¯å¾„ã€‚
- **`api-version` é€šè¿‡ `default_query` ä¼ é€’ï¼Œè€Œéžè¿½åŠ åˆ° URLã€‚** Azure Anthropic è¦æ±‚ `api-version` æŸ¥è¯¢å­—ç¬¦ä¸²ã€‚å°†å…¶åµŒå…¥ base URL ä¼šäº§ç”Ÿç±»ä¼¼ `/anthropic?api-version=.../v1/messages` çš„ç•¸å½¢è·¯å¾„å¹¶è¿”å›ž 404ã€‚Zed é€šè¿‡ Anthropic SDK çš„ `default_query` ä¼ é€’ `api-version=2025-04-15`ã€‚
- **ä½¿ç”¨ Bearer è®¤è¯è€Œéž `x-api-key`ã€‚** Azure çš„ Anthropic å…¼å®¹è·¯ç”±è¦æ±‚ `Authorization: Bearer <key>`ï¼Œè€Œéž Anthropic åŽŸç”Ÿçš„ `x-api-key` å¤´ã€‚Zed æ£€æµ‹åˆ° base URL ä¸­åŒ…å« `azure.com` æ—¶ï¼Œé€šè¿‡ SDK çš„ `auth_token` å­—æ®µè·¯ç”± API å¯†é’¥ï¼Œç¡®ä¿æ­£ç¡®çš„å¤´éƒ¨åˆ°è¾¾ä¸Šæ¸¸ã€‚
- **ä¿ç•™ 1M ä¸Šä¸‹æ–‡çª—å£ beta å¤´ã€‚** Azure ä»é€šè¿‡ `anthropic-beta: context-1m-2025-08-07` å¤´æŽ§åˆ¶ 1M token Claude ä¸Šä¸‹æ–‡ï¼ˆOpus 4.6/4.7ã€Sonnet 4.6ï¼‰çš„è®¿é—®ã€‚Zed åœ¨ Azure è·¯å¾„ä¸Šä¿ç•™è¯¥ beta å¤´ï¼ˆåœ¨åŽŸç”Ÿ Anthropic OAuth è¯·æ±‚ä¸­ä¼šè¢«åŽ»é™¤ï¼Œå› ä¸ºæŸäº›è®¢é˜…ä¼šæ‹’ç»å®ƒï¼Œä½† Azure è¦æ±‚å®ƒï¼‰ã€‚
- **ç¦ç”¨ OAuth ä»¤ç‰Œåˆ·æ–°ã€‚** Azure éƒ¨ç½²ä½¿ç”¨é™æ€ API å¯†é’¥ã€‚é€‚ç”¨äºŽ Anthropic Console çš„ `~/.claude/.credentials.json` OAuth ä»¤ç‰Œåˆ·æ–°å¾ªçŽ¯å¯¹ Azure ç«¯ç‚¹æ˜Žç¡®è·³è¿‡ï¼Œä»¥é˜²æ­¢ Claude Code OAuth ä»¤ç‰Œåœ¨ä¼šè¯ä¸­é€”è¦†ç›–ä½ çš„ Azure å¯†é’¥ã€‚

## æ›¿ä»£æ–¹æ¡ˆï¼š`provider: anthropic` + Azure base URL

å¦‚æžœä½ å·²é…ç½® `provider: anthropic` å¹¶åªæƒ³å°†å…¶æŒ‡å‘ Microsoft Foundry ä»¥ä½¿ç”¨ Claudeï¼Œå¯ä»¥å®Œå…¨è·³è¿‡ `azure-foundry` providerï¼š

```yaml
model:
  provider: anthropic
  base_url: https://my-resource.services.ai.azure.com/anthropic
  key_env: AZURE_ANTHROPIC_KEY
  default: claude-sonnet-4-6
```

åœ¨ `~/.zed/.env` ä¸­è®¾ç½® `AZURE_ANTHROPIC_KEY`ã€‚Zed æ£€æµ‹åˆ° base URL ä¸­åŒ…å« `azure.com` æ—¶ï¼Œä¼šç»•è¿‡ Claude Code OAuth ä»¤ç‰Œé“¾ï¼Œç›´æŽ¥ä½¿ç”¨ Azure å¯†é’¥è¿›è¡Œ `x-api-key` è®¤è¯ã€‚

`key_env` æ˜¯è§„èŒƒçš„ snake_case å­—æ®µåï¼›`api_key_env`ï¼ˆä»¥åŠé©¼å³°å¼ `keyEnv` / `apiKeyEnv`ï¼‰ä½œä¸ºåˆ«åè¢«æŽ¥å—ã€‚å¦‚æžœåŒæ—¶è®¾ç½®äº† `key_env` å’Œ `AZURE_ANTHROPIC_KEY`/`ANTHROPIC_API_KEY`ï¼Œ`key_env` æŒ‡å®šçš„çŽ¯å¢ƒå˜é‡ä¼˜å…ˆã€‚

## æ¨¡åž‹å‘çŽ°

Azure **ä¸**æš´éœ²çº¯ API å¯†é’¥ç«¯ç‚¹æ¥åˆ—å‡ºä½ çš„*å·²éƒ¨ç½²*æ¨¡åž‹éƒ¨ç½²ã€‚éƒ¨ç½²æžšä¸¾éœ€è¦ Azure Resource Manager è®¤è¯ï¼ˆ`az cognitiveservices account deployment list`ï¼‰å’Œ Azure AD ä¸»ä½“ï¼Œè€ŒéžæŽ¨ç† API å¯†é’¥ã€‚

Zed èƒ½åšçš„ï¼š

- Azure OpenAI v1 ç«¯ç‚¹ï¼ˆ`<resource>.openai.azure.com/openai/v1`ï¼‰é€šè¿‡ `GET /models` æš´éœ²èµ„æºçš„**å¯ç”¨**æ¨¡åž‹ç›®å½•ã€‚Zed ä½¿ç”¨æ­¤åˆ—è¡¨é¢„å¡«æ¨¡åž‹é€‰æ‹©å™¨ã€‚
- Microsoft Foundry `/anthropic` è·¯ç”±ï¼šé€šè¿‡ URL è·¯å¾„æ£€æµ‹ï¼Œæ¨¡åž‹åç§°æ‰‹åŠ¨è¾“å…¥ã€‚
- ç§æœ‰ / é˜²ç«å¢™åŽçš„ç«¯ç‚¹ï¼šæ‰‹åŠ¨è¾“å…¥ï¼Œå¹¶æ˜¾ç¤ºå‹å¥½çš„"æ— æ³•æŽ¢æµ‹"æç¤ºã€‚

ä½ å§‹ç»ˆå¯ä»¥ç›´æŽ¥è¾“å…¥éƒ¨ç½²åç§°â€”â€”Zed ä¸ä¼šå¯¹è¿”å›žçš„åˆ—è¡¨è¿›è¡ŒéªŒè¯ã€‚

## çŽ¯å¢ƒå˜é‡

| å˜é‡ | ç”¨é€” |
|----------|---------|
| `AZURE_FOUNDRY_API_KEY` | Microsoft Foundry / Azure OpenAI çš„ä¸» API å¯†é’¥ï¼ˆapi_key æ¨¡å¼ï¼‰ |
| `AZURE_FOUNDRY_BASE_URL` | ç«¯ç‚¹ URLï¼ˆé€šè¿‡ `zed model` è®¾ç½®ï¼›çŽ¯å¢ƒå˜é‡ä½œä¸ºå›žé€€ï¼‰ |
| `AZURE_ANTHROPIC_KEY` | ç”± `provider: anthropic` + Azure base URL ä½¿ç”¨ï¼ˆ`ANTHROPIC_API_KEY` çš„æ›¿ä»£ï¼‰ |
| `AZURE_TENANT_ID` | æœåŠ¡ä¸»ä½“æµç¨‹çš„ Entra ID ç§Ÿæˆ· |
| `AZURE_CLIENT_ID` | Entra ID å®¢æˆ·ç«¯ IDï¼ˆæœåŠ¡ä¸»ä½“ã€å·¥ä½œè´Ÿè½½æ ‡è¯†æˆ–ç”¨æˆ·åˆ†é…çš„æ‰˜ç®¡æ ‡è¯†ï¼‰ |
| `AZURE_CLIENT_SECRET` | æœåŠ¡ä¸»ä½“å¯†é’¥ |
| `AZURE_CLIENT_CERTIFICATE_PATH` | æœåŠ¡ä¸»ä½“è¯ä¹¦ï¼ˆå¯†é’¥çš„æ›¿ä»£æ–¹æ¡ˆï¼‰ |
| `AZURE_FEDERATED_TOKEN_FILE` | å·¥ä½œè´Ÿè½½æ ‡è¯†è”åˆä»¤ç‰Œè·¯å¾„ï¼ˆAKSï¼‰ |
| `AZURE_AUTHORITY_HOST` | ä¸»æƒäº‘ authority ä¸»æœºè¦†ç›– |
| `IDENTITY_ENDPOINT` / `MSI_ENDPOINT` | App Serviceã€Functions å’Œ Container Apps çš„æ‰˜ç®¡æ ‡è¯†ç«¯ç‚¹ï¼›VM é€šå¸¸æ”¹ç”¨ IMDS |

Azure SDK ç›´æŽ¥è¯»å– `AZURE_*` çŽ¯å¢ƒå˜é‡ã€‚Zed é™¤åœ¨ `zed doctor` è¾“å‡ºä¸­æŠ¥å‘Šå“ªäº›æ¥æºå­˜åœ¨å¤–ï¼Œä¸ä¼šæ£€æŸ¥è¿™äº›å˜é‡ã€‚

## æ•…éšœæŽ’æŸ¥

**gpt-5.x éƒ¨ç½²è¿”å›ž 401 Unauthorizedã€‚**
Azure åœ¨ `/chat/completions` ä¸Šæä¾› gpt-5.xï¼Œè€Œéž `/responses`ã€‚å½“ URL åŒ…å« `openai.azure.com` æ—¶ï¼ŒZed ä¼šè‡ªåŠ¨å¤„ç†æ­¤é—®é¢˜ï¼Œä½†å¦‚æžœä½ çœ‹åˆ°å¸¦æœ‰ `Invalid API key` æ­£æ–‡çš„ 401ï¼Œè¯·æ£€æŸ¥ `config.yaml` ä¸­çš„ `api_mode` æ˜¯å¦ä¸º `chat_completions`ã€‚

**`/v1/messages?api-version=.../v1/messages` è¿”å›ž 404ã€‚**
è¿™æ˜¯ä¿®å¤å‰ Azure Anthropic è®¾ç½®ä¸­çš„ç•¸å½¢ URL é—®é¢˜ã€‚å‡çº§ Zedâ€”â€”`api-version` å‚æ•°çŽ°åœ¨é€šè¿‡ `default_query` ä¼ é€’ï¼Œè€ŒéžåµŒå…¥ base URLï¼Œå› æ­¤ SDK åœ¨ URL æ‹¼æŽ¥æ—¶ä¸ä¼šç ´åå®ƒã€‚

**å‘å¯¼æç¤º"è‡ªåŠ¨æ£€æµ‹ä¸å®Œæ•´"ã€‚**
ç«¯ç‚¹æ‹’ç»äº† `/models` æŽ¢æµ‹å’Œ Anthropic Messages æŽ¢æµ‹ã€‚è¿™å¯¹äºŽé˜²ç«å¢™åŽæˆ–è®¾æœ‰ IP ç™½åå•çš„ç§æœ‰ç«¯ç‚¹æ˜¯æ­£å¸¸çŽ°è±¡ã€‚å›žé€€åˆ°æ‰‹åŠ¨é€‰æ‹© API æ¨¡å¼å¹¶è¾“å…¥éƒ¨ç½²åç§°â€”â€”ä¸€åˆ‡ä»ç„¶æ­£å¸¸å·¥ä½œï¼ŒZed åªæ˜¯æ— æ³•é¢„å¡«é€‰æ‹©å™¨ã€‚

**é€‰æ‹©äº†é”™è¯¯çš„ä¼ è¾“åè®®ã€‚**
å†æ¬¡è¿è¡Œ `zed model`ï¼Œå‘å¯¼å°†é‡æ–°æŽ¢æµ‹ã€‚å¦‚æžœæŽ¢æµ‹ä»ç„¶é€‰æ‹©äº†é”™è¯¯çš„æ¨¡å¼ï¼Œå¯ä»¥ç›´æŽ¥ç¼–è¾‘ `config.yaml`ï¼š

```yaml
model:
  provider: azure-foundry
  api_mode: anthropic_messages   # æˆ– chat_completions
```

**Entra IDï¼š"credential chain exhausted" æˆ–åˆ‡æ¢åˆ° `auth_mode: entra_id` åŽè¿”å›ž 401 Unauthorizedã€‚**
- è¿è¡Œ `az login` åˆ·æ–°ä½ çš„å¼€å‘è€…ä¼šè¯ï¼ˆç¼“å­˜çš„ä»¤ç‰Œå¯èƒ½å·²è¿‡æœŸï¼‰ã€‚
- éªŒè¯ `Azure AI User`ï¼ˆæˆ– `Foundry User`ï¼‰è§’è‰²åˆ†é…æ˜¯å¦å·²ç”Ÿæ•ˆï¼š`az role assignment list --assignee <user-or-identity-id>` åº”åœ¨ä½ çš„ Foundry èµ„æºä¸Šåˆ—å‡ºè¯¥è§’è‰²ã€‚è§’è‰²ä¼ æ’­æœ€å¤šéœ€è¦ 5 åˆ†é’Ÿã€‚
- å¯¹äºŽç”¨æˆ·åˆ†é…çš„æ‰˜ç®¡æ ‡è¯†ï¼Œè¯·ä»”ç»†æ£€æŸ¥ `AZURE_CLIENT_ID` æ˜¯å¦ä¸Žé™„åŠ åˆ°è®¡ç®—èµ„æºçš„æ ‡è¯†åŒ¹é…ã€‚
- è¿è¡Œ `zed doctor`â€”â€”Azure Entra æŽ¢æµ‹ä¼šæŠ¥å‘Šä»¤ç‰ŒèŽ·å–æ˜¯å¦æˆåŠŸï¼Œå¹¶æä¾›ä¿®å¤æç¤ºã€‚

**Entra IDï¼šå‘å¯¼é¢„æ£€æŒ‚èµ·æˆ–è¶…æ—¶ã€‚**
10 ç§’é¢„æ£€æ˜¯è½¯æ€§æ£€æŸ¥ã€‚é€‰æ‹©"ä»ç„¶ä¿å­˜ï¼Œç¨åŽéªŒè¯"ï¼Œéƒ¨ç½²åˆ°ç›®æ ‡çŽ¯å¢ƒåŽè¿è¡Œ `zed doctor`ã€‚å¸¸è§åŽŸå› åŒ…æ‹¬ä»¤ç‰ŒæœåŠ¡ä¸å¯è¾¾æˆ–æœ¬åœ°ç™»å½•çŠ¶æ€è¿‡æœŸâ€”â€”åœ¨ CI ä¸­ä¼˜å…ˆä½¿ç”¨å·¥ä½œè´Ÿè½½æ ‡è¯†ï¼Œä½¿ç”¨æœåŠ¡ä¸»ä½“æ—¶è®¾ç½® `AZURE_TENANT_ID`+`AZURE_CLIENT_ID`+`AZURE_CLIENT_SECRET`ï¼Œæˆ–åœ¨æœ¬åœ°å¼€å‘æ—¶è¿è¡Œ `az login`ã€‚

**Anthropic é£Žæ ¼ç«¯ç‚¹ä½¿ç”¨ Entra ID æ—¶è¿”å›ž 401ã€‚**
éªŒè¯åŒä¸€ `Azure AI User`ï¼ˆæˆ– `Foundry User`ï¼‰è§’è‰²æ˜¯å¦å·²åœ¨ Foundry èµ„æºä¸Šåˆ†é…ï¼ˆå®ƒåŒæ—¶è¦†ç›– `/openai/v1` å’Œ `/anthropic` è·¯å¾„ï¼‰ã€‚å¦‚æžœå‘å¯¼æœŸé—´ OpenAI é£Žæ ¼æŽ¢æµ‹æˆåŠŸï¼Œä½†è¿è¡Œæ—¶ `claude-*` è¯·æ±‚å¤±è´¥ï¼Œæœ€å¸¸è§çš„åŽŸå› æ˜¯æ—©æœŸå‘å¯¼è¿è¡Œé—ç•™çš„è¿‡æ—¶ `model.entra.scope`â€”â€”ä»Ž `config.yaml` ä¸­åˆ é™¤ `entra.scope` è¡Œï¼Œä½¿è¿è¡Œæ—¶å›žé€€åˆ°é»˜è®¤çš„ `https://ai.azure.com/.default` scopeã€‚

## ç›¸å…³é“¾æŽ¥

- [çŽ¯å¢ƒå˜é‡](/reference/environment-variables)
- [é…ç½®](/user-guide/configuration)
- [AWS Bedrock](/guides/aws-bedrock) â€” å¦ä¸€ä¸ªä¸»è¦çš„äº‘ provider é›†æˆ
- [Microsoftï¼šä¸º Foundry é…ç½® Entra ID](https://learn.microsoft.com/azure/ai-foundry/foundry-models/how-to/configure-entra-id) â€” æ— å¯†é’¥è·¯å¾„çš„ä¸Šæ¸¸æ–‡æ¡£
