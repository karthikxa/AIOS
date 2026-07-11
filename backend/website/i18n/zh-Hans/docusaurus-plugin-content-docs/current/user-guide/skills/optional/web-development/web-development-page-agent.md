---
title: "Page Agent"
sidebar_label: "Page Agent"
description: "å°† alibaba/page-agent åµŒå…¥ä½ è‡ªå·±çš„ Web åº”ç”¨â€”â€”ä¸€ä¸ªçº¯ JavaScript é¡µå†… GUI agentï¼Œä»¥å•ä¸ª <script> æ ‡ç­¾æˆ– npm åŒ…å½¢å¼å‘å¸ƒï¼Œè®©ä½ ç½‘ç«™çš„ç»ˆç«¯ç”¨æˆ·èƒ½ç”¨è‡ªç„¶è¯­è¨€é©±åŠ¨ UIï¼ˆå¦‚'ç‚¹å‡»ç™»å½•ï¼Œå°†ç”¨æˆ·åå¡«ä¸º John'ï¼‰ã€‚"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Page Agent

å°† alibaba/page-agent åµŒå…¥ä½ è‡ªå·±çš„ Web åº”ç”¨â€”â€”ä¸€ä¸ªçº¯ JavaScript é¡µå†… GUI agentï¼Œä»¥å•ä¸ª &lt;script> æ ‡ç­¾æˆ– npm åŒ…å½¢å¼å‘å¸ƒï¼Œè®©ä½ ç½‘ç«™çš„ç»ˆç«¯ç”¨æˆ·èƒ½ç”¨è‡ªç„¶è¯­è¨€é©±åŠ¨ UIï¼ˆ"ç‚¹å‡»ç™»å½•ï¼Œå°†ç”¨æˆ·åå¡«ä¸º John"ï¼‰ã€‚æ— éœ€ Pythonï¼Œæ— éœ€æ— å¤´æµè§ˆå™¨ï¼Œæ— éœ€æ‰©å±•ç¨‹åºã€‚å½“ç”¨æˆ·æ˜¯ Web å¼€å‘è€…ï¼Œå¸Œæœ›ä¸ºå…¶ SaaS / ç®¡ç†é¢æ¿ / B2B å·¥å…·æ·»åŠ  AI copilotã€é€šè¿‡è‡ªç„¶è¯­è¨€è®©é—ç•™ Web åº”ç”¨å¯è®¿é—®ï¼Œæˆ–é’ˆå¯¹æœ¬åœ°ï¼ˆOllamaï¼‰æˆ–äº‘ç«¯ï¼ˆQwen / OpenAI / OpenRouterï¼‰LLM è¯„ä¼° page-agent æ—¶ï¼Œä½¿ç”¨æ­¤ skillã€‚ä¸é€‚ç”¨äºŽæœåŠ¡ç«¯æµè§ˆå™¨è‡ªåŠ¨åŒ–â€”â€”æ­¤ç±»éœ€æ±‚è¯·å°†ç”¨æˆ·å¼•å¯¼è‡³ Zed å†…ç½®çš„æµè§ˆå™¨å·¥å…·ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰â€”â€”é€šè¿‡ `zed skills install official/web-development/page-agent` å®‰è£… |
| è·¯å¾„ | `optional-skills/web-development/page-agent` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `web`, `javascript`, `agent`, `browser`, `gui`, `alibaba`, `embed`, `copilot`, `saas` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# page-agent

alibaba/page-agentï¼ˆhttps://github.com/alibaba/page-agentï¼Œ17k+ starsï¼ŒMITï¼‰æ˜¯ä¸€ä¸ªç”¨ TypeScript ç¼–å†™çš„é¡µå†… GUI agentã€‚å®ƒè¿è¡Œåœ¨ç½‘é¡µå†…éƒ¨ï¼Œä»¥æ–‡æœ¬å½¢å¼è¯»å– DOMï¼ˆæ— éœ€æˆªå›¾ï¼Œæ— éœ€å¤šæ¨¡æ€ LLMï¼‰ï¼Œå¹¶å¯¹å½“å‰é¡µé¢æ‰§è¡Œè‡ªç„¶è¯­è¨€æŒ‡ä»¤ï¼Œå¦‚"ç‚¹å‡»ç™»å½•æŒ‰é’®ï¼Œç„¶åŽå°†ç”¨æˆ·åå¡«ä¸º John"ã€‚çº¯å®¢æˆ·ç«¯â€”â€”å®¿ä¸»ç½‘ç«™åªéœ€å¼•å…¥ä¸€ä¸ª script å¹¶ä¼ å…¥å…¼å®¹ OpenAI çš„ LLM ç«¯ç‚¹å³å¯ã€‚

## ä½•æ—¶ä½¿ç”¨æ­¤ skill

å½“ç”¨æˆ·å¸Œæœ›å®žçŽ°ä»¥ä¸‹ç›®æ ‡æ—¶ï¼ŒåŠ è½½æ­¤ skillï¼š

- **åœ¨è‡ªå·±çš„ Web åº”ç”¨ä¸­é›†æˆ AI copilot**ï¼ˆSaaSã€ç®¡ç†é¢æ¿ã€B2B å·¥å…·ã€ERPã€CRMï¼‰â€”â€”"æˆ‘ä»ªè¡¨ç›˜ä¸Šçš„ç”¨æˆ·åº”è¯¥èƒ½è¾“å…¥'ä¸º Acme Corp åˆ›å»ºå‘ç¥¨å¹¶å‘é€é‚®ä»¶'ï¼Œè€Œä¸æ˜¯ç‚¹å‡»äº”ä¸ªé¡µé¢"
- **åœ¨ä¸é‡å†™å‰ç«¯çš„æƒ…å†µä¸‹çŽ°ä»£åŒ–é—ç•™ Web åº”ç”¨**â€”â€”page-agent å¯ç›´æŽ¥å åŠ åœ¨çŽ°æœ‰ DOM ä¹‹ä¸Š
- **é€šè¿‡è‡ªç„¶è¯­è¨€æå‡æ— éšœç¢è®¿é—®èƒ½åŠ›**â€”â€”è¯­éŸ³ / å±å¹•é˜…è¯»å™¨ç”¨æˆ·é€šè¿‡æè¿°éœ€æ±‚æ¥é©±åŠ¨ UI
- **æ¼”ç¤ºæˆ–è¯„ä¼° page-agent**ï¼Œå¯¹æŽ¥æœ¬åœ°ï¼ˆOllamaï¼‰æˆ–æ‰˜ç®¡ï¼ˆQwenã€OpenAIã€OpenRouterï¼‰LLM
- **æž„å»ºäº¤äº’å¼åŸ¹è®­ / äº§å“æ¼”ç¤º**â€”â€”è®© AI åœ¨çœŸå®ž UI ä¸­å¼•å¯¼ç”¨æˆ·å®Œæˆ"å¦‚ä½•æäº¤æŠ¥é”€å•"

## ä½•æ—¶ä¸åº”ä½¿ç”¨æ­¤ skill

- ç”¨æˆ·å¸Œæœ› **Zed æœ¬èº«é©±åŠ¨æµè§ˆå™¨** â†’ ä½¿ç”¨ Zed å†…ç½®çš„æµè§ˆå™¨å·¥å…·ï¼ˆBrowserbase / Camofoxï¼‰ã€‚page-agent æ˜¯*ç›¸å*çš„æ–¹å‘ã€‚
- ç”¨æˆ·å¸Œæœ›**åœ¨ä¸åµŒå…¥çš„æƒ…å†µä¸‹å®žçŽ°è·¨æ ‡ç­¾é¡µè‡ªåŠ¨åŒ–** â†’ ä½¿ç”¨ Playwrightã€browser-use æˆ– page-agent Chrome æ‰©å±•
- ç”¨æˆ·éœ€è¦**è§†è§‰å®šä½ / æˆªå›¾** â†’ page-agent ä»…æ”¯æŒæ–‡æœ¬ DOMï¼›è¯·æ”¹ç”¨å¤šæ¨¡æ€æµè§ˆå™¨ agent

## å‰ç½®æ¡ä»¶

- Node 22.13+ æˆ– 24+ï¼Œnpm 10+ï¼ˆæ–‡æ¡£å£°ç§°éœ€è¦ 11+ï¼Œä½† 10.9 å®žé™…å¯ç”¨ï¼‰
- å…¼å®¹ OpenAI çš„ LLM ç«¯ç‚¹ï¼šQwenï¼ˆDashScopeï¼‰ã€OpenAIã€Ollamaã€OpenRouterï¼Œæˆ–ä»»ä½•æ”¯æŒ `/v1/chat/completions` çš„æœåŠ¡
- å¸¦å¼€å‘è€…å·¥å…·çš„æµè§ˆå™¨ï¼ˆç”¨äºŽè°ƒè¯•ï¼‰

## è·¯å¾„ 1â€”â€”é€šè¿‡ CDN 30 ç§’å¿«é€Ÿä½“éªŒï¼ˆæ— éœ€å®‰è£…ï¼‰

æœ€å¿«çš„ä¸Šæ‰‹æ–¹å¼ã€‚ä½¿ç”¨é˜¿é‡Œå·´å·´çš„å…è´¹æµ‹è¯• LLM ä»£ç†â€”â€”**ä»…ä¾›è¯„ä¼°ä½¿ç”¨**ï¼Œé¡»éµå®ˆå…¶æœåŠ¡æ¡æ¬¾ã€‚

æ·»åŠ åˆ°ä»»æ„ HTML é¡µé¢ï¼ˆæˆ–ç²˜è´´åˆ°å¼€å‘è€…å·¥å…·æŽ§åˆ¶å°ä½œä¸ºä¹¦ç­¾è„šæœ¬ï¼‰ï¼š

```html
<script src="https://cdn.jsdelivr.net/npm/page-agent@1.8.0/dist/iife/page-agent.demo.js" crossorigin="true"></script>
```

é¢æ¿éšå³å‡ºçŽ°ã€‚è¾“å…¥æŒ‡ä»¤ã€‚å®Œæˆã€‚

ä¹¦ç­¾è„šæœ¬å½¢å¼ï¼ˆæ‹–å…¥ä¹¦ç­¾æ ï¼Œåœ¨ä»»æ„é¡µé¢ç‚¹å‡»ï¼‰ï¼š

```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/page-agent@1.8.0/dist/iife/page-agent.demo.js';document.head.appendChild(s);})();
```

## è·¯å¾„ 2â€”â€”npm å®‰è£…åˆ°ä½ è‡ªå·±çš„ Web åº”ç”¨ï¼ˆç”Ÿäº§ä½¿ç”¨ï¼‰

åœ¨çŽ°æœ‰ Web é¡¹ç›®ä¸­ï¼ˆReact / Vue / Svelte / çº¯ HTMLï¼‰ï¼š

```bash
npm install page-agent
```

ä½¿ç”¨ä½ è‡ªå·±çš„ LLM ç«¯ç‚¹è¿›è¡Œé…ç½®â€”â€”**åˆ‡å‹¿å°†æ¼”ç¤º CDN ç”¨äºŽçœŸå®žç”¨æˆ·**ï¼š

```javascript
import { PageAgent } from 'page-agent'

const agent = new PageAgent({
    model: 'qwen3.5-plus',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: process.env.LLM_API_KEY,   // never hardcode
    language: 'en-US',
})

// ä¸ºç»ˆç«¯ç”¨æˆ·æ˜¾ç¤ºé¢æ¿ï¼š
agent.panel.show()

// æˆ–ä»¥ç¼–ç¨‹æ–¹å¼é©±åŠ¨ï¼š
await agent.execute('Click submit button, then fill username as John')
```

Provider ç¤ºä¾‹ï¼ˆä»»ä½•å…¼å®¹ OpenAI çš„ç«¯ç‚¹å‡å¯ä½¿ç”¨ï¼‰ï¼š

| Provider | `baseURL` | `model` |
|----------|-----------|---------|
| Qwen / DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen3.5-plus` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Ollamaï¼ˆæœ¬åœ°ï¼‰ | `http://localhost:11434/v1` | `qwen3:14b` |
| OpenRouter | `https://openrouter.ai/api/v1` | `anthropic/claude-sonnet-4.6` |

**å…³é”®é…ç½®å­—æ®µ**ï¼ˆä¼ å…¥ `new PageAgent({...})`ï¼‰ï¼š

- `model`ã€`baseURL`ã€`apiKey` â€” LLM è¿žæŽ¥é…ç½®
- `language` â€” UI è¯­è¨€ï¼ˆ`en-US`ã€`zh-CN` ç­‰ï¼‰
- å­˜åœ¨ç™½åå•å’Œæ•°æ®è„±æ• hookï¼Œç”¨äºŽé™åˆ¶ agent å¯æ“ä½œçš„èŒƒå›´â€”â€”å®Œæ•´é€‰é¡¹åˆ—è¡¨è§ https://alibaba.github.io/page-agent/

**å®‰å…¨æ€§ã€‚** åœ¨çœŸå®žéƒ¨ç½²ä¸­ï¼Œä¸è¦å°† `apiKey` æ”¾åœ¨å®¢æˆ·ç«¯ä»£ç ä¸­â€”â€”é€šè¿‡ä½ çš„åŽç«¯ä»£ç† LLM è°ƒç”¨ï¼Œå¹¶å°† `baseURL` æŒ‡å‘ä½ çš„ä»£ç†ã€‚æ¼”ç¤º CDN ä¹‹æ‰€ä»¥å­˜åœ¨ï¼Œæ˜¯å› ä¸ºé˜¿é‡Œå·´å·´ä¸ºè¯„ä¼°ç›®çš„è¿è¡Œäº†è¯¥ä»£ç†ã€‚

## è·¯å¾„ 3â€”â€”å…‹éš†æºç ä»“åº“ï¼ˆè´¡çŒ®ä»£ç ï¼Œæˆ–æ·±åº¦å®šåˆ¶ï¼‰

å½“ç”¨æˆ·å¸Œæœ›ä¿®æ”¹ page-agent æœ¬èº«ã€é€šè¿‡æœ¬åœ° IIFE bundle åœ¨ä»»æ„ç½‘ç«™ä¸Šæµ‹è¯•ï¼Œæˆ–å¼€å‘æµè§ˆå™¨æ‰©å±•æ—¶ä½¿ç”¨æ­¤è·¯å¾„ã€‚

```bash
git clone https://github.com/alibaba/page-agent.git
cd page-agent
npm ci              # exact lockfile install (or `npm i` to allow updates)
```

åœ¨ä»“åº“æ ¹ç›®å½•åˆ›å»º `.env` æ–‡ä»¶ï¼Œé…ç½® LLM ç«¯ç‚¹ã€‚ç¤ºä¾‹ï¼š

```
LLM_MODEL_NAME=gpt-4o-mini
LLM_API_KEY=sk-...
LLM_BASE_URL=https://api.openai.com/v1
```

Ollama é…ç½®ï¼š

```
LLM_BASE_URL=http://localhost:11434/v1
LLM_API_KEY=NA
LLM_MODEL_NAME=qwen3:14b
```

å¸¸ç”¨å‘½ä»¤ï¼š

```bash
npm start           # docs/website dev server
npm run build       # build every package
npm run dev:demo    # serve IIFE bundle at http://localhost:5174/page-agent.demo.js
npm run dev:ext     # develop the browser extension (WXT + React)
npm run build:ext   # build the extension
```

**åœ¨ä»»æ„ç½‘ç«™ä¸Šæµ‹è¯•**ï¼Œä½¿ç”¨æœ¬åœ° IIFE bundleã€‚æ·»åŠ æ­¤ä¹¦ç­¾è„šæœ¬ï¼š

```javascript
javascript:(function(){var s=document.createElement('script');s.src=`http://localhost:5174/page-agent.demo.js?t=${Math.random()}`;s.onload=()=>console.log('PageAgent ready!');document.head.appendChild(s);})();
```

ç„¶åŽï¼šè¿è¡Œ `npm run dev:demo`ï¼Œåœ¨ä»»æ„é¡µé¢ç‚¹å‡»ä¹¦ç­¾è„šæœ¬ï¼Œæœ¬åœ°æž„å»ºå³æ³¨å…¥é¡µé¢ã€‚ä¿å­˜åŽè‡ªåŠ¨é‡æ–°æž„å»ºã€‚

**è­¦å‘Šï¼š** åœ¨å¼€å‘æž„å»ºæœŸé—´ï¼Œ`.env` ä¸­çš„ `LLM_API_KEY` ä¼šè¢«å†…è”åˆ° IIFE bundle ä¸­ã€‚ä¸è¦åˆ†äº«è¯¥ bundleï¼Œä¸è¦æäº¤å®ƒï¼Œä¸è¦å°† URL ç²˜è´´åˆ° Slackã€‚ï¼ˆå·²éªŒè¯ï¼šå¯¹å…¬å¼€å¼€å‘ bundle æ‰§è¡Œ grep ä¼šè¿”å›ž `.env` ä¸­çš„å­—é¢å€¼ã€‚ï¼‰

## ä»“åº“ç»“æž„ï¼ˆè·¯å¾„ 3ï¼‰

ä½¿ç”¨ npm workspaces çš„ monorepoã€‚æ ¸å¿ƒåŒ…ï¼š

| åŒ… | è·¯å¾„ | ç”¨é€” |
|---------|------|---------|
| `page-agent` | `packages/page-agent/` | å¸¦ UI é¢æ¿çš„ä¸»å…¥å£ |
| `@page-agent/core` | `packages/core/` | æ ¸å¿ƒ agent é€»è¾‘ï¼Œæ—  UI |
| `@page-agent/mcp` | `packages/mcp/` | MCP serverï¼ˆbetaï¼‰ |
| â€” | `packages/llms/` | LLM å®¢æˆ·ç«¯ |
| â€” | `packages/page-controller/` | DOM æ“ä½œ + è§†è§‰åé¦ˆ |
| â€” | `packages/ui/` | é¢æ¿ + å›½é™…åŒ– |
| â€” | `packages/extension/` | Chrome/Firefox æ‰©å±• |
| â€” | `packages/website/` | æ–‡æ¡£ + è½åœ°é¡µ |

## éªŒè¯æ˜¯å¦æ­£å¸¸å·¥ä½œ

è·¯å¾„ 1 æˆ–è·¯å¾„ 2 å®ŒæˆåŽï¼š
1. åœ¨æµè§ˆå™¨ä¸­æ‰“å¼€é¡µé¢å¹¶å¼€å¯å¼€å‘è€…å·¥å…·
2. åº”çœ‹åˆ°ä¸€ä¸ªæµ®åŠ¨é¢æ¿ã€‚è‹¥æœªå‡ºçŽ°ï¼Œæ£€æŸ¥æŽ§åˆ¶å°æŠ¥é”™ï¼ˆæœ€å¸¸è§åŽŸå› ï¼šLLM ç«¯ç‚¹ CORS é—®é¢˜ã€é”™è¯¯çš„ `baseURL`ï¼Œæˆ–æ— æ•ˆçš„ API keyï¼‰
3. è¾“å…¥ä¸€æ¡ä¸Žé¡µé¢å¯è§å†…å®¹åŒ¹é…çš„ç®€å•æŒ‡ä»¤ï¼ˆ"click the Login link"ï¼‰
4. è§‚å¯Ÿ Network æ ‡ç­¾é¡µâ€”â€”åº”çœ‹åˆ°å‘å¾€ä½ çš„ `baseURL` çš„è¯·æ±‚

è·¯å¾„ 3 å®ŒæˆåŽï¼š
1. `npm run dev:demo` è¾“å‡º `Accepting connections at http://localhost:5174`
2. `curl -I http://localhost:5174/page-agent.demo.js` è¿”å›ž `HTTP/1.1 200 OK`ï¼Œ`Content-Type: application/javascript`
3. åœ¨ä»»æ„ç½‘ç«™ç‚¹å‡»ä¹¦ç­¾è„šæœ¬ï¼Œé¢æ¿å‡ºçŽ°

## å¸¸è§é—®é¢˜

- **åœ¨ç”Ÿäº§çŽ¯å¢ƒä½¿ç”¨æ¼”ç¤º CDN** â€” ä¸è¦è¿™æ ·åšã€‚å®ƒæœ‰é€ŸçŽ‡é™åˆ¶ï¼Œä½¿ç”¨é˜¿é‡Œå·´å·´çš„å…è´¹ä»£ç†ï¼Œä¸”å…¶æœåŠ¡æ¡æ¬¾ç¦æ­¢ç”Ÿäº§ä½¿ç”¨ã€‚
- **API key æ³„éœ²** â€” ä¼ å…¥ `new PageAgent({apiKey: ...})` çš„ä»»ä½• key éƒ½ä¼šæ‰“åŒ…è¿›ä½ çš„ JS bundleã€‚çœŸå®žéƒ¨ç½²æ—¶åŠ¡å¿…é€šè¿‡è‡ªå·±çš„åŽç«¯ä»£ç†ã€‚
- **ä¸å…¼å®¹ OpenAI æ ¼å¼çš„ç«¯ç‚¹**ä¼šé™é»˜å¤±è´¥æˆ–æŠ¥å‡ºéš¾ä»¥ç†è§£çš„é”™è¯¯ã€‚å¦‚æžœä½ çš„ provider éœ€è¦åŽŸç”Ÿ Anthropic/Gemini æ ¼å¼ï¼Œè¯·åœ¨å‰é¢åŠ ä¸€å±‚ OpenAI å…¼å®¹ä»£ç†ï¼ˆLiteLLMã€OpenRouterï¼‰ã€‚
- **CSP æ‹¦æˆª** â€” å¯ç”¨ä¸¥æ ¼ Content-Security-Policy çš„ç½‘ç«™å¯èƒ½æ‹’ç»åŠ è½½ CDN script æˆ–ç¦æ­¢å†…è” evalã€‚æ­¤æ—¶è¯·ä»Žä½ è‡ªå·±çš„åŸŸåè‡ªæ‰˜ç®¡ã€‚
- **ç¼–è¾‘è·¯å¾„ 3 ä¸­çš„ `.env` åŽéœ€é‡å¯å¼€å‘æœåŠ¡å™¨** â€” Vite ä»…åœ¨å¯åŠ¨æ—¶è¯»å–çŽ¯å¢ƒå˜é‡ã€‚
- **Node ç‰ˆæœ¬** â€” ä»“åº“å£°æ˜Žæ”¯æŒ `^22.13.0 || >=24`ã€‚Node 20 åœ¨ `npm ci` æ—¶ä¼šå› å¼•æ“Žæ£€æŸ¥æŠ¥é”™å¤±è´¥ã€‚
- **npm 10 vs 11** â€” æ–‡æ¡£è¦æ±‚ npm 11+ï¼›npm 10.9 å®žé™…å¯æ­£å¸¸ä½¿ç”¨ã€‚

## å‚è€ƒèµ„æ–™

- ä»“åº“ï¼šhttps://github.com/alibaba/page-agent
- æ–‡æ¡£ï¼šhttps://alibaba.github.io/page-agent/
- è®¸å¯è¯ï¼šMITï¼ˆåŸºäºŽ browser-use çš„ DOM å¤„ç†å†…éƒ¨å®žçŽ°ï¼ŒCopyright 2024 Gregor Zunicï¼‰
