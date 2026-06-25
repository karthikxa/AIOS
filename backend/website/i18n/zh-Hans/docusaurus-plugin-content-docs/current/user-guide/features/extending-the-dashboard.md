---
sidebar_position: 17
title: "æ‰©å±• Dashboard"
description: "ä¸º Zed Web Dashboard æž„å»ºä¸»é¢˜å’Œæ’ä»¶â€”â€”è°ƒè‰²æ¿ã€å­—ä½“æŽ’ç‰ˆã€å¸ƒå±€ã€è‡ªå®šä¹‰æ ‡ç­¾é¡µã€shell æ’æ§½ã€é¡µé¢çº§æ’æ§½ä»¥åŠåŽç«¯ API è·¯ç”±"
---

# æ‰©å±• Dashboard

Zed Web Dashboardï¼ˆ`zed dashboard`ï¼‰åœ¨è®¾è®¡ä¸Šæ”¯æŒæ¢è‚¤å’Œæ‰©å±•ï¼Œæ— éœ€ fork ä»£ç åº“ã€‚å¯¹å¤–æš´éœ²ä¸‰ä¸ªå±‚æ¬¡ï¼š

1. **ä¸»é¢˜ï¼ˆThemesï¼‰** â€” YAML æ–‡ä»¶ï¼Œç”¨äºŽé‡ç»˜ dashboard çš„è°ƒè‰²æ¿ã€å­—ä½“æŽ’ç‰ˆã€å¸ƒå±€ä»¥åŠå„ç»„ä»¶çš„å¤–è§‚ã€‚å°†æ–‡ä»¶æ”¾å…¥ `~/.zed/dashboard-themes/`ï¼Œå³å¯åœ¨ä¸»é¢˜åˆ‡æ¢å™¨ä¸­çœ‹åˆ°å®ƒã€‚
2. **UI æ’ä»¶ï¼ˆUI pluginsï¼‰** â€” ä¸€ä¸ªåŒ…å« `manifest.json` å’Œ JavaScript bundle çš„ç›®å½•ï¼Œå¯æ³¨å†Œæ ‡ç­¾é¡µã€æ›¿æ¢å†…ç½®é¡µé¢ã€é€šè¿‡é¡µé¢çº§æ’æ§½å¢žå¼ºå†…ç½®é¡µé¢ï¼Œæˆ–å‘å‘½å shell æ’æ§½æ³¨å…¥ç»„ä»¶ã€‚
3. **åŽç«¯æ’ä»¶ï¼ˆBackend pluginsï¼‰** â€” æ’ä»¶ç›®å½•å†…çš„ Python æ–‡ä»¶ï¼Œæš´éœ²ä¸€ä¸ª FastAPI `router`ï¼›è·¯ç”±æŒ‚è½½åœ¨ `/api/plugins/<name>/` ä¸‹ï¼Œç”±æ’ä»¶çš„ UI è°ƒç”¨ã€‚

ä¸‰è€…å‡ä¸º**è¿è¡Œæ—¶å³æ’å³ç”¨**ï¼šæ— éœ€å…‹éš†ä»“åº“ã€æ— éœ€ `npm run build`ã€æ— éœ€ä¿®æ”¹ dashboard æºç ã€‚æœ¬é¡µæ˜¯ä¸‰è€…çš„æƒå¨å‚è€ƒæ–‡æ¡£ã€‚

å¦‚æžœåªæ˜¯æƒ³ä½¿ç”¨ dashboardï¼Œè¯·å‚é˜… [Web Dashboard](./web-dashboard)ã€‚å¦‚æžœæƒ³ä¸ºç»ˆç«¯ CLIï¼ˆè€Œéž Web Dashboardï¼‰æ¢è‚¤ï¼Œè¯·å‚é˜… [Skins & Themes](./skins) â€”â€” CLI çš®è‚¤ç³»ç»Ÿä¸Ž dashboard ä¸»é¢˜æ— å…³ã€‚

:::note å„éƒ¨åˆ†å¦‚ä½•ç»„åˆ
ä¸»é¢˜å’Œæ’ä»¶ç›¸äº’ç‹¬ç«‹ï¼Œä½†å¯ååŒå·¥ä½œã€‚ä¸»é¢˜å¯ä»¥å•ç‹¬ä½¿ç”¨ï¼ˆä»…ä¸€ä¸ª YAML æ–‡ä»¶ï¼‰ã€‚æ’ä»¶ä¹Ÿå¯ä»¥å•ç‹¬ä½¿ç”¨ï¼ˆä»…ä¸€ä¸ªæ ‡ç­¾é¡µï¼‰ã€‚ä¸¤è€…ç»“åˆå¯æž„å»ºå¸¦æœ‰è‡ªå®šä¹‰ HUD çš„å®Œæ•´è§†è§‰æ¢è‚¤æ–¹æ¡ˆâ€”â€”å†…ç½®çš„ `strike-freedom-cockpit` æ¼”ç¤ºæ­£æ˜¯å¦‚æ­¤ã€‚å‚è§[ä¸»é¢˜ + æ’ä»¶ç»„åˆæ¼”ç¤º](#combined-theme--plugin-demo)ã€‚
:::

---

## ç›®å½•

- [ä¸»é¢˜](#themes)
  - [å¿«é€Ÿä¸Šæ‰‹â€”â€”ä½ çš„ç¬¬ä¸€ä¸ªä¸»é¢˜](#quick-start--your-first-theme)
  - [è°ƒè‰²æ¿ã€å­—ä½“æŽ’ç‰ˆã€å¸ƒå±€](#palette-typography-layout)
  - [å¸ƒå±€å˜ä½“](#layout-variants)
  - [ä¸»é¢˜èµ„æºï¼ˆå›¾ç‰‡ä½œä¸º CSS å˜é‡ï¼‰](#theme-assets-images-as-css-vars)
  - [ç»„ä»¶å¤–è§‚è¦†ç›–](#component-chrome-overrides)
  - [é¢œè‰²è¦†ç›–](#color-overrides)
  - [åŽŸå§‹ `customCSS`](#raw-customcss)
  - [å†…ç½®ä¸»é¢˜](#built-in-themes)
  - [å®Œæ•´ä¸»é¢˜ YAML å‚è€ƒ](#full-theme-yaml-reference)
- [æ’ä»¶](#plugins)
  - [å¿«é€Ÿä¸Šæ‰‹â€”â€”ä½ çš„ç¬¬ä¸€ä¸ªæ’ä»¶](#quick-start--your-first-plugin)
  - [ç›®å½•ç»“æž„](#directory-layout)
  - [Manifest å‚è€ƒ](#manifest-reference)
  - [Plugin SDK](#the-plugin-sdk)
  - [Shell æ’æ§½](#shell-slots)
  - [æ›¿æ¢å†…ç½®é¡µé¢ï¼ˆ`tab.override`ï¼‰](#replacing-built-in-pages-taboverride)
  - [å¢žå¼ºå†…ç½®é¡µé¢ï¼ˆé¡µé¢çº§æ’æ§½ï¼‰](#augmenting-built-in-pages-page-scoped-slots)
  - [ä»…æ’æ§½æ’ä»¶ï¼ˆ`tab.hidden`ï¼‰](#slot-only-plugins-tabhidden)
  - [åŽç«¯ API è·¯ç”±](#backend-api-routes)
  - [æ’ä»¶è‡ªå®šä¹‰ CSS](#custom-css-per-plugin)
  - [æ’ä»¶å‘çŽ°ä¸Žé‡è½½](#plugin-discovery--reload)
- [ä¸»é¢˜ + æ’ä»¶ç»„åˆæ¼”ç¤º](#combined-theme--plugin-demo)
- [API å‚è€ƒ](#api-reference)
- [æ•…éšœæŽ’æŸ¥](#troubleshooting)

---

## ä¸»é¢˜

ä¸»é¢˜æ˜¯å­˜å‚¨åœ¨ `~/.zed/dashboard-themes/` ä¸­çš„ YAML æ–‡ä»¶ã€‚æ–‡ä»¶åæ— å…³ç´§è¦ï¼ˆç³»ç»Ÿä½¿ç”¨ä¸»é¢˜çš„ `name:` å­—æ®µï¼‰ï¼Œä½†æƒ¯ä¾‹æ˜¯ `<name>.yaml`ã€‚æ‰€æœ‰å­—æ®µå‡ä¸ºå¯é€‰â€”â€”ç¼ºå¤±çš„é”®ä¼šå›žé€€åˆ°å†…ç½®çš„ `default` ä¸»é¢˜ï¼Œå› æ­¤ä¸€ä¸ªä¸»é¢˜å¯ä»¥åªåŒ…å«ä¸€ä¸ªé¢œè‰²ã€‚

### å¿«é€Ÿä¸Šæ‰‹â€”â€”ä½ çš„ç¬¬ä¸€ä¸ªä¸»é¢˜

```bash
mkdir -p ~/.zed/dashboard-themes
```

```yaml
# ~/.zed/dashboard-themes/neon.yaml
name: neon
label: Neon
description: Pure magenta on black

palette:
  background: "#000000"
  midground: "#ff00ff"
```

åˆ·æ–° dashboardã€‚ç‚¹å‡»é¡¶æ çš„è°ƒè‰²æ¿å›¾æ ‡ï¼Œé€‰æ‹© **Neon**ã€‚èƒŒæ™¯å˜ä¸ºé»‘è‰²ï¼Œæ–‡å­—å’Œå¼ºè°ƒè‰²å˜ä¸ºæ´‹çº¢è‰²ï¼Œæ‰€æœ‰æ´¾ç”Ÿé¢œè‰²ï¼ˆcardã€borderã€mutedã€ring ç­‰ï¼‰å‡é€šè¿‡ CSS çš„ `color-mix()` ä»Žè¿™ä¸¤ä¸ªé¢œè‰²è‡ªåŠ¨è®¡ç®—å¾—å‡ºã€‚

è¿™å°±æ˜¯å…¨éƒ¨å…¥é—¨æµç¨‹ï¼šä¸€ä¸ªæ–‡ä»¶ï¼Œä¸¤ä¸ªé¢œè‰²ã€‚ä»¥ä¸‹å†…å®¹å‡ä¸ºå¯é€‰çš„è¿›é˜¶é…ç½®ã€‚

### è°ƒè‰²æ¿ã€å­—ä½“æŽ’ç‰ˆã€å¸ƒå±€

è¿™ä¸‰ä¸ªå—æ˜¯ä¸»é¢˜çš„æ ¸å¿ƒã€‚æ¯ä¸ªå—ç›¸äº’ç‹¬ç«‹â€”â€”è¦†ç›–å…¶ä¸­ä¸€ä¸ªï¼Œå…¶ä½™ä¿æŒä¸å˜ã€‚

#### è°ƒè‰²æ¿ï¼ˆ3 å±‚ï¼‰

è°ƒè‰²æ¿ç”±ä¸‰å±‚é¢œè‰²åŠ ä¸€ä¸ªæš–å…‰æ™•ï¼ˆwarm-glowï¼‰é¢œè‰²å’Œä¸€ä¸ªå™ªç‚¹é¢—ç²’å€å¢žå™¨ç»„æˆã€‚Dashboard çš„è®¾è®¡ç³»ç»Ÿçº§è”é€šè¿‡ CSS `color-mix()` ä»Žè¿™ä¸‰å±‚é¢œè‰²æ´¾ç”Ÿå‡ºæ‰€æœ‰å…¼å®¹ shadcn çš„ tokenï¼ˆcardã€popoverã€mutedã€borderã€primaryã€destructiveã€ring ç­‰ï¼‰ã€‚è¦†ç›–ä¸‰ä¸ªé¢œè‰²å³å¯çº§è”å½±å“æ•´ä¸ª UIã€‚

| é”® | æè¿° |
|-----|-------------|
| `palette.background` | æœ€æ·±çš„ç”»å¸ƒé¢œè‰²â€”â€”é€šå¸¸æŽ¥è¿‘é»‘è‰²ã€‚é©±åŠ¨é¡µé¢èƒŒæ™¯å’Œå¡ç‰‡å¡«å……ã€‚ |
| `palette.midground` | ä¸»è¦æ–‡å­—å’Œå¼ºè°ƒè‰²ã€‚å¤§å¤šæ•° UI å¤–è§‚è¯»å–æ­¤å€¼ï¼ˆå‰æ™¯æ–‡å­—ã€æŒ‰é’®è½®å»“ã€ç„¦ç‚¹çŽ¯ï¼‰ã€‚ |
| `palette.foreground` | é¡¶å±‚é«˜äº®è‰²ã€‚é»˜è®¤ä¸»é¢˜å°†å…¶è®¾ä¸º alpha ä¸º 0 çš„ç™½è‰²ï¼ˆä¸å¯è§ï¼‰ï¼›éœ€è¦é¡¶å±‚äº®è‰²å¼ºè°ƒçš„ä¸»é¢˜å¯æé«˜å…¶ alpha å€¼ã€‚ |
| `palette.warmGlow` | `rgba(...)` å­—ç¬¦ä¸²ï¼Œç”¨ä½œ `<Backdrop />` çš„æ™•å…‰é¢œè‰²ã€‚ |
| `palette.noiseOpacity` | 0â€“1.2 çš„é¢—ç²’å åŠ å±‚å€å¢žå™¨ã€‚è¶Šä½Žè¶ŠæŸ”å’Œï¼Œè¶Šé«˜è¶Šç²—ç²ã€‚ |

æ¯å±‚æŽ¥å— `{hex: "#RRGGBB", alpha: 0.0â€“1.0}` æˆ–è£¸åå…­è¿›åˆ¶å­—ç¬¦ä¸²ï¼ˆalpha é»˜è®¤ä¸º 1.0ï¼‰ã€‚

```yaml
palette:
  background:
    hex: "#05091a"
    alpha: 1.0
  midground: "#d8f0ff"          # bare hex, alpha = 1.0
  foreground:
    hex: "#ffffff"
    alpha: 0                    # invisible top layer
  warmGlow: "rgba(255, 199, 55, 0.24)"
  noiseOpacity: 0.7
```

#### å­—ä½“æŽ’ç‰ˆ

| é”® | ç±»åž‹ | æè¿° |
|-----|------|-------------|
| `fontSans` | string | æ­£æ–‡çš„ CSS font-family æ ˆï¼ˆåº”ç”¨äºŽ `html`ã€`body`ï¼‰ã€‚ |
| `fontMono` | string | ä»£ç å—ã€`<code>`ã€`.font-mono` å·¥å…·ç±»çš„ CSS font-family æ ˆã€‚ |
| `fontDisplay` | string | å¯é€‰çš„æ ‡é¢˜/å±•ç¤ºå­—ä½“æ ˆã€‚å›žé€€åˆ° `fontSans`ã€‚ |
| `fontUrl` | string | å¯é€‰çš„å¤–éƒ¨æ ·å¼è¡¨ URLã€‚åœ¨ä¸»é¢˜åˆ‡æ¢æ—¶ä»¥ `<link rel="stylesheet">` æ³¨å…¥ `<head>`ã€‚ç›¸åŒ URL ä¸ä¼šé‡å¤æ³¨å…¥ã€‚æ”¯æŒ Google Fontsã€Bunny Fontsã€è‡ªæ‰˜ç®¡ `@font-face` æ ·å¼è¡¨â€”â€”ä»»ä½•å¯é“¾æŽ¥çš„èµ„æºå‡å¯ã€‚ |
| `baseSize` | string | æ ¹å­—ä½“å¤§å°â€”â€”æŽ§åˆ¶ rem æ¯”ä¾‹ã€‚ä¾‹å¦‚ `"14px"`ã€`"16px"`ã€‚ |
| `lineHeight` | string | é»˜è®¤è¡Œé«˜ã€‚ä¾‹å¦‚ `"1.5"`ã€`"1.65"`ã€‚ |
| `letterSpacing` | string | é»˜è®¤å­—é—´è·ã€‚ä¾‹å¦‚ `"0"`ã€`"0.01em"`ã€`"-0.01em"`ã€‚ |

```yaml
typography:
  fontSans: '"Orbitron", "Eurostile", "Impact", sans-serif'
  fontMono: '"Share Tech Mono", ui-monospace, monospace'
  fontDisplay: '"Orbitron", "Eurostile", sans-serif'
  fontUrl: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Share+Tech+Mono&display=swap"
  baseSize: "14px"
  lineHeight: "1.5"
  letterSpacing: "0.04em"
```

#### å¸ƒå±€

| é”® | å€¼ | æè¿° |
|-----|--------|-------------|
| `radius` | ä»»æ„ CSS é•¿åº¦ï¼ˆ`"0"`ã€`"0.25rem"`ã€`"0.5rem"`ã€`"1rem"` ç­‰ï¼‰ | åœ†è§’ tokenã€‚æ˜ å°„åˆ° `--radius` å¹¶çº§è”åˆ° `--radius-sm/md/lg/xl`â€”â€”æ‰€æœ‰åœ†è§’å…ƒç´ åŒæ­¥å˜åŒ–ã€‚ |
| `density` | `compact` \| `comfortable` \| `spacious` | é—´è·å€å¢žå™¨ï¼Œä»¥ `--spacing-mul` CSS å˜é‡å½¢å¼åº”ç”¨ã€‚`compact = 0.85Ã—`ï¼Œ`comfortable = 1.0Ã—`ï¼ˆé»˜è®¤ï¼‰ï¼Œ`spacious = 1.2Ã—`ã€‚ç¼©æ”¾ Tailwind çš„åŸºç¡€é—´è·ï¼Œå› æ­¤ paddingã€gap å’Œ space-between å·¥å…·ç±»å‡æŒ‰æ¯”ä¾‹è°ƒæ•´ã€‚ |

```yaml
layout:
  radius: "0"
  density: compact
```

### å¸ƒå±€å˜ä½“

`layoutVariant` é€‰æ‹©æ•´ä½“ shell å¸ƒå±€ã€‚ç¼ºçœæ—¶é»˜è®¤ä¸º `"standard"`ã€‚

| å˜ä½“ | è¡Œä¸º |
|---------|-----------|
| `standard` | å•åˆ—ï¼Œæœ€å¤§å®½åº¦ 1600pxï¼ˆé»˜è®¤ï¼‰ã€‚ |
| `cockpit` | å·¦ä¾§è¾¹æ è½¨é“ï¼ˆ260pxï¼‰+ ä¸»å†…å®¹åŒºã€‚ç”±æ’ä»¶é€šè¿‡ `sidebar` æ’æ§½å¡«å……â€”â€”å‚è§ [Shell æ’æ§½](#shell-slots)ã€‚æ²¡æœ‰æ’ä»¶æ—¶è½¨é“æ˜¾ç¤ºå ä½ç¬¦ã€‚ |
| `tiled` | å–æ¶ˆæœ€å¤§å®½åº¦é™åˆ¶ï¼Œé¡µé¢å¯ä½¿ç”¨å®Œæ•´è§†å£å®½åº¦ã€‚ |

```yaml
layoutVariant: cockpit
```

å½“å‰å˜ä½“é€šè¿‡ `document.documentElement.dataset.layoutVariant` æš´éœ²ï¼Œå› æ­¤ `customCSS` ä¸­çš„åŽŸå§‹ CSS å¯é€šè¿‡ `:root[data-layout-variant="cockpit"] ...` å®šå‘åŒ¹é…ã€‚

### ä¸»é¢˜èµ„æºï¼ˆå›¾ç‰‡ä½œä¸º CSS å˜é‡ï¼‰

éšä¸»é¢˜é™„å¸¦å›¾ç‰‡ URLã€‚æ¯ä¸ªå‘½åæ’æ§½ä¼šæˆä¸ºä¸€ä¸ª CSS å˜é‡ï¼ˆ`--theme-asset-<name>`ï¼‰ï¼Œå†…ç½® shell å’Œä»»ä½•æ’ä»¶å‡å¯è¯»å–ã€‚`bg` æ’æ§½è‡ªåŠ¨æŽ¥å…¥ backdropï¼›å…¶ä»–æ’æ§½é¢å‘æ’ä»¶å¼€æ”¾ã€‚

```yaml
assets:
  bg: "https://example.com/hero-bg.jpg"           # auto-wired into <Backdrop />
  hero: "/my-images/strike-freedom.png"           # for plugin sidebars
  crest: "/my-images/crest.svg"                   # for header-left plugins
  logo: "/my-images/logo.png"
  sidebar: "/my-images/rail.png"
  header: "/my-images/header-art.png"
  custom:
    scanLines: "/my-images/scanlines.png"         # â†’ --theme-asset-custom-scanLines
```

å€¼æŽ¥å—ï¼š

- è£¸ URLâ€”â€”è‡ªåŠ¨åŒ…è£…ä¸º `url(...)`ã€‚
- å·²åŒ…è£…çš„ `url(...)`ã€`linear-gradient(...)`ã€`radial-gradient(...)` è¡¨è¾¾å¼â€”â€”ç›´æŽ¥ä½¿ç”¨ã€‚
- `"none"` â€”â€”æ˜Žç¡®ç¦ç”¨ã€‚

æ¯ä¸ªèµ„æºè¿˜ä¼šä»¥ `--theme-asset-<name>-raw`ï¼ˆæœªåŒ…è£…çš„ URLï¼‰å½¢å¼è¾“å‡ºï¼Œä»¥ä¾¿æ’ä»¶éœ€è¦å°†å…¶ä¼ ç»™ `<img src>` è€Œéž `background-image` æ—¶ä½¿ç”¨ã€‚

æ’ä»¶é€šè¿‡æ™®é€š CSS æˆ– JS è¯»å–è¿™äº›å˜é‡ï¼š

```javascript
// In a plugin slot
const hero = getComputedStyle(document.documentElement)
  .getPropertyValue("--theme-asset-hero").trim();
```

### ç»„ä»¶å¤–è§‚è¦†ç›–

`componentStyles` å¯åœ¨ä¸ç¼–å†™ CSS é€‰æ‹©å™¨çš„æƒ…å†µä¸‹é‡æ–°è®¾ç½®å„ shell ç»„ä»¶çš„æ ·å¼ã€‚æ¯ä¸ªæ¡¶ï¼ˆbucketï¼‰çš„æ¡ç›®ä¼šæˆä¸º CSS å˜é‡ï¼ˆ`--component-<bucket>-<kebab-property>`ï¼‰ï¼Œshell çš„å…±äº«ç»„ä»¶ä¼šè¯»å–è¿™äº›å˜é‡ã€‚å› æ­¤ `card:` çš„è¦†ç›–åº”ç”¨äºŽæ‰€æœ‰ `<Card>`ï¼Œ`header:` åº”ç”¨äºŽåº”ç”¨æ ï¼Œä»¥æ­¤ç±»æŽ¨ã€‚

```yaml
componentStyles:
  card:
    clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
    background: "linear-gradient(180deg, rgba(10, 22, 52, 0.85), rgba(5, 9, 26, 0.92))"
    boxShadow: "inset 0 0 0 1px rgba(64, 200, 255, 0.28)"
  header:
    background: "linear-gradient(180deg, rgba(16, 32, 72, 0.95), rgba(5, 9, 26, 0.9))"
  tab:
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)"
  sidebar: {}
  backdrop: {}
  footer: {}
  progress: {}
  badge: {}
  page: {}
```

æ”¯æŒçš„æ¡¶ï¼š`card`ã€`header`ã€`footer`ã€`sidebar`ã€`tab`ã€`progress`ã€`badge`ã€`backdrop`ã€`page`ã€‚

å±žæ€§åä½¿ç”¨ camelCaseï¼ˆ`clipPath`ï¼‰ï¼Œè¾“å‡ºä¸º kebab-caseï¼ˆ`clip-path`ï¼‰ã€‚å€¼ä¸ºçº¯ CSS å­—ç¬¦ä¸²â€”â€”CSS æŽ¥å—çš„ä»»ä½•å†…å®¹å‡å¯ï¼ˆ`clip-path`ã€`border-image`ã€`background`ã€`box-shadow`ã€`animation` ç­‰ï¼‰ã€‚

### é¢œè‰²è¦†ç›–

å¤§å¤šæ•°ä¸»é¢˜ä¸éœ€è¦æ­¤åŠŸèƒ½â€”â€”3 å±‚è°ƒè‰²æ¿å·²æ´¾ç”Ÿå‡ºæ‰€æœ‰ shadcn tokenã€‚å½“ä½ éœ€è¦æ´¾ç”Ÿæ— æ³•äº§ç”Ÿçš„ç‰¹å®šå¼ºè°ƒè‰²æ—¶ï¼ˆä¾‹å¦‚æŸ”å’Œä¸»é¢˜çš„æ›´æŸ”å’Œçš„ç ´åæ€§çº¢è‰²ï¼Œæˆ–å“ç‰Œä¸“å±žçš„æˆåŠŸç»¿è‰²ï¼‰ï¼Œæ‰ä½¿ç”¨ `colorOverrides`ã€‚

```yaml
colorOverrides:
  primary: "#ffce3a"
  primaryForeground: "#05091a"
  accent: "#3fd3ff"
  ring: "#3fd3ff"
  destructive: "#ff3a5e"
  border: "rgba(64, 200, 255, 0.28)"
```

æ”¯æŒçš„é”®ï¼š`card`ã€`cardForeground`ã€`popover`ã€`popoverForeground`ã€`primary`ã€`primaryForeground`ã€`secondary`ã€`secondaryForeground`ã€`muted`ã€`mutedForeground`ã€`accent`ã€`accentForeground`ã€`destructive`ã€`destructiveForeground`ã€`success`ã€`warning`ã€`border`ã€`input`ã€`ring`ã€‚

æ¯ä¸ªé”®ä¸Ž `--color-<kebab>` CSS å˜é‡ä¸€ä¸€å¯¹åº”ï¼ˆä¾‹å¦‚ `primaryForeground` â†’ `--color-primary-foreground`ï¼‰ã€‚æ­¤å¤„è®¾ç½®çš„ä»»ä½•é”®ä»…å¯¹å½“å‰æ¿€æ´»ä¸»é¢˜ç”Ÿæ•ˆï¼Œåˆ‡æ¢åˆ°å…¶ä»–ä¸»é¢˜æ—¶è¦†ç›–ä¼šè¢«æ¸…é™¤ã€‚

### åŽŸå§‹ `customCSS`

å¯¹äºŽ `componentStyles` æ— æ³•è¡¨è¾¾çš„é€‰æ‹©å™¨çº§å¤–è§‚â€”â€”ä¼ªå…ƒç´ ã€åŠ¨ç”»ã€åª’ä½“æŸ¥è¯¢ã€ä¸»é¢˜èŒƒå›´å†…çš„è¦†ç›–â€”â€”å¯å°†åŽŸå§‹ CSS å†™å…¥ `customCSS`ï¼š

```yaml
customCSS: |
  /* Scanline overlay â€” only visible when cockpit variant is active. */
  :root[data-layout-variant="cockpit"] body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    background: repeating-linear-gradient(to bottom,
      transparent 0px, transparent 2px,
      rgba(64, 200, 255, 0.035) 3px, rgba(64, 200, 255, 0.035) 4px);
    mix-blend-mode: screen;
  }
```

CSS åœ¨ä¸»é¢˜åº”ç”¨æ—¶ä»¥å•ä¸ªå¸¦ä½œç”¨åŸŸçš„ `<style data-zed-theme-css>` æ ‡ç­¾æ³¨å…¥ï¼Œä¸»é¢˜åˆ‡æ¢æ—¶æ¸…é™¤ã€‚**æ¯ä¸ªä¸»é¢˜ä¸Šé™ä¸º 32 KiBã€‚**

### å†…ç½®ä¸»é¢˜

æ¯ä¸ªå†…ç½®ä¸»é¢˜éƒ½æœ‰è‡ªå·±çš„è°ƒè‰²æ¿ã€å­—ä½“æŽ’ç‰ˆå’Œå¸ƒå±€â€”â€”åˆ‡æ¢æ—¶äº§ç”Ÿçš„å˜åŒ–ä¸ä»…é™äºŽé¢œè‰²ã€‚

| ä¸»é¢˜ | è°ƒè‰²æ¿ | å­—ä½“æŽ’ç‰ˆ | å¸ƒå±€ |
|-------|---------|------------|--------|
| **Zed Teal**ï¼ˆ`default`ï¼‰ | æ·±é’è‰² + å¥¶æ²¹è‰² | ç³»ç»Ÿå­—ä½“æ ˆï¼Œ15px | 0.5rem åœ†è§’ï¼Œcomfortable |
| **Zed Teal (Large)**ï¼ˆ`default-large`ï¼‰ | åŒ default | ç³»ç»Ÿå­—ä½“æ ˆï¼Œ18pxï¼Œè¡Œé«˜ 1.65 | 0.5rem åœ†è§’ï¼Œspacious |
| **Midnight**ï¼ˆ`midnight`ï¼‰ | æ·±è“ç´«è‰² | Inter + JetBrains Monoï¼Œ14px | 0.75rem åœ†è§’ï¼Œcomfortable |
| **Ember**ï¼ˆ`ember`ï¼‰ | æš–æ·±çº¢ + å¤é“œè‰² | Spectralï¼ˆè¡¬çº¿ï¼‰+ IBM Plex Monoï¼Œ15px | 0.25rem åœ†è§’ï¼Œcomfortable |
| **Mono**ï¼ˆ`mono`ï¼‰ | ç°åº¦ | IBM Plex Sans + IBM Plex Monoï¼Œ13px | 0 åœ†è§’ï¼Œcompact |
| **Cyberpunk**ï¼ˆ`cyberpunk`ï¼‰ | é»‘åº•éœ“è™¹ç»¿ | Share Tech Mono å…¨å±€ï¼Œ14px | 0 åœ†è§’ï¼Œcompact |
| **RosÃ©**ï¼ˆ`rose`ï¼‰ | ç²‰è‰² + è±¡ç‰™è‰² | Frauncesï¼ˆè¡¬çº¿ï¼‰+ DM Monoï¼Œ16px | 1rem åœ†è§’ï¼Œspacious |

å¼•ç”¨ Google Fonts çš„ä¸»é¢˜ï¼ˆé™¤ Zed Teal å¤–å‡å¦‚æ­¤ï¼‰ä¼šæŒ‰éœ€åŠ è½½æ ·å¼è¡¨â€”â€”é¦–æ¬¡åˆ‡æ¢æ—¶ä¼šå‘ `<head>` æ³¨å…¥ä¸€ä¸ª `<link>` æ ‡ç­¾ã€‚

### å®Œæ•´ä¸»é¢˜ YAML å‚è€ƒ

æ‰€æœ‰é…ç½®é¡¹æ±‡æ€»åœ¨ä¸€ä¸ªæ–‡ä»¶ä¸­â€”â€”å¤åˆ¶åŽåˆ é™¤ä¸éœ€è¦çš„éƒ¨åˆ†ï¼š

```yaml
# ~/.zed/dashboard-themes/ocean.yaml
name: ocean
label: Ocean Deep
description: Deep sea blues with coral accents

# 3-layer palette (accepts {hex, alpha} or bare hex)
palette:
  background:
    hex: "#0a1628"
    alpha: 1.0
  midground:
    hex: "#a8d0ff"
    alpha: 1.0
  foreground:
    hex: "#ffffff"
    alpha: 0.0
  warmGlow: "rgba(255, 107, 107, 0.35)"
  noiseOpacity: 0.7

typography:
  fontSans: "Poppins, system-ui, sans-serif"
  fontMono: "Fira Code, ui-monospace, monospace"
  fontDisplay: "Poppins, system-ui, sans-serif"   # optional
  fontUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap"
  baseSize: "15px"
  lineHeight: "1.6"
  letterSpacing: "-0.003em"

layout:
  radius: "0.75rem"
  density: comfortable

layoutVariant: standard        # standard | cockpit | tiled

assets:
  bg: "https://example.com/ocean-bg.jpg"
  hero: "/my-images/kraken.png"
  crest: "/my-images/anchor.svg"
  logo: "/my-images/logo.png"
  custom:
    pattern: "/my-images/waves.svg"

componentStyles:
  card:
    boxShadow: "inset 0 0 0 1px rgba(168, 208, 255, 0.18)"
  header:
    background: "linear-gradient(180deg, rgba(10, 22, 40, 0.95), rgba(5, 9, 26, 0.9))"

colorOverrides:
  destructive: "#ff6b6b"
  ring: "#ff6b6b"

customCSS: |
  /* Any additional selector-level tweaks */
```

åˆ›å»ºæ–‡ä»¶åŽåˆ·æ–° dashboardã€‚é€šè¿‡é¡¶æ çš„è°ƒè‰²æ¿å›¾æ ‡å®žæ—¶åˆ‡æ¢ä¸»é¢˜ã€‚é€‰æ‹©ç»“æžœä¼šæŒä¹…åŒ–åˆ° `config.yaml` çš„ `dashboard.theme` ä¸‹ï¼Œå¹¶åœ¨é‡è½½æ—¶æ¢å¤ã€‚

---

## æ’ä»¶

Dashboard æ’ä»¶æ˜¯ä¸€ä¸ªåŒ…å« `manifest.json`ã€é¢„æž„å»º JS bundleï¼Œä»¥åŠå¯é€‰çš„ CSS æ–‡ä»¶å’Œå¸¦ FastAPI è·¯ç”±çš„ Python æ–‡ä»¶çš„ç›®å½•ã€‚æ’ä»¶ä¸Žå…¶ä»– Zed æ’ä»¶ä¸€èµ·å­˜æ”¾åœ¨ `~/.zed/plugins/<name>/`â€”â€”dashboard æ‰©å±•æ˜¯è¯¥æ’ä»¶ç›®å½•å†…çš„ `dashboard/` å­æ–‡ä»¶å¤¹ï¼Œå› æ­¤ä¸€ä¸ªæ’ä»¶å¯ä»¥ä»Žå•æ¬¡å®‰è£…ä¸­åŒæ—¶æ‰©å±• CLI/gateway å’Œ dashboardã€‚

æ’ä»¶ä¸æ‰“åŒ… React æˆ– UI ç»„ä»¶ï¼Œè€Œæ˜¯ä½¿ç”¨æš´éœ²åœ¨ `window.__ZED_PLUGIN_SDK__` ä¸Šçš„ **Plugin SDK**ã€‚è¿™ä½¿æ’ä»¶ bundle ä¿æŒæžå°ä½“ç§¯ï¼ˆé€šå¸¸åªæœ‰å‡  KBï¼‰ï¼Œå¹¶é¿å…ç‰ˆæœ¬å†²çªã€‚

### å¿«é€Ÿä¸Šæ‰‹â€”â€”ä½ çš„ç¬¬ä¸€ä¸ªæ’ä»¶

åˆ›å»ºç›®å½•ç»“æž„ï¼š

```bash
mkdir -p ~/.zed/plugins/my-plugin/dashboard/dist
```

ç¼–å†™ manifestï¼š

```json
// ~/.zed/plugins/my-plugin/dashboard/manifest.json
{
  "name": "my-plugin",
  "label": "My Plugin",
  "icon": "Sparkles",
  "version": "1.0.0",
  "tab": {
    "path": "/my-plugin",
    "position": "after:skills"
  },
  "entry": "dist/index.js"
}
```

ç¼–å†™ JS bundleï¼ˆæ™®é€š IIFEâ€”â€”æ— éœ€æž„å»ºæ­¥éª¤ï¼‰ï¼š

```javascript
// ~/.zed/plugins/my-plugin/dashboard/dist/index.js
(function () {
  "use strict";

  const SDK = window.__ZED_PLUGIN_SDK__;
  const { React } = SDK;
  const { Card, CardHeader, CardTitle, CardContent } = SDK.components;

  function MyPage() {
    return React.createElement(Card, null,
      React.createElement(CardHeader, null,
        React.createElement(CardTitle, null, "My Plugin"),
      ),
      React.createElement(CardContent, null,
        React.createElement("p", { className: "text-sm text-muted-foreground" },
          "Hello from my custom dashboard tab.",
        ),
      ),
    );
  }

  window.__ZED_PLUGINS__.register("my-plugin", MyPage);
})();
```

åˆ·æ–° dashboardâ€”â€”ä½ çš„æ ‡ç­¾é¡µå‡ºçŽ°åœ¨å¯¼èˆªæ ä¸­ï¼Œä½äºŽ **Skills** ä¹‹åŽã€‚

:::tip è·³è¿‡ React.createElement
å¦‚æžœä½ åå¥½ JSXï¼Œå¯ä½¿ç”¨ä»»æ„æ‰“åŒ…å·¥å…·ï¼ˆesbuildã€Viteã€rollupï¼‰ï¼Œå°† React è®¾ä¸ºå¤–éƒ¨ä¾èµ–å¹¶è¾“å‡º IIFE æ ¼å¼ã€‚å”¯ä¸€çš„ç¡¬æ€§è¦æ±‚æ˜¯æœ€ç»ˆæ–‡ä»¶æ˜¯å¯é€šè¿‡ `<script>` åŠ è½½çš„å•ä¸ª JS æ–‡ä»¶ã€‚React æ°¸è¿œä¸ä¼šè¢«æ‰“åŒ…è¿›åŽ»ï¼›å®ƒæ¥è‡ª `SDK.React`ã€‚
:::

### ç›®å½•ç»“æž„

```
~/.zed/plugins/my-plugin/
â”œâ”€â”€ plugin.yaml              # optional â€” existing CLI/gateway plugin manifest
â”œâ”€â”€ __init__.py              # optional â€” existing CLI/gateway hooks
â””â”€â”€ dashboard/               # dashboard extension
    â”œâ”€â”€ manifest.json        # required â€” tab config, icon, entry point
    â”œâ”€â”€ dist/
    â”‚   â”œâ”€â”€ index.js         # required â€” pre-built JS bundle (IIFE)
    â”‚   â””â”€â”€ style.css        # optional â€” custom CSS
    â””â”€â”€ plugin_api.py        # optional â€” backend API routes (FastAPI)
```

å•ä¸ªæ’ä»¶ç›®å½•å¯æ‰¿è½½ä¸‰ä¸ªæ­£äº¤æ‰©å±•ï¼š

- `plugin.yaml` + `__init__.py` â€” CLI/gateway æ’ä»¶ï¼ˆ[å‚è§æ’ä»¶é¡µé¢](./plugins)ï¼‰ã€‚
- `dashboard/manifest.json` + `dashboard/dist/index.js` â€” dashboard UI æ’ä»¶ã€‚
- `dashboard/plugin_api.py` â€” dashboard åŽç«¯è·¯ç”±ã€‚

ä¸‰è€…å‡éžå¿…é¡»ï¼›æŒ‰éœ€åŒ…å«æ‰€éœ€å±‚æ¬¡å³å¯ã€‚

### Manifest å‚è€ƒ

```json
{
  "name": "my-plugin",
  "label": "My Plugin",
  "description": "What this plugin does",
  "icon": "Sparkles",
  "version": "1.0.0",
  "tab": {
    "path": "/my-plugin",
    "position": "after:skills",
    "override": "/",
    "hidden": false
  },
  "slots": ["sidebar", "header-left"],
  "entry": "dist/index.js",
  "css": "dist/style.css",
  "api": "plugin_api.py"
}
```

| å­—æ®µ | å¿…å¡« | æè¿° |
|-------|----------|-------------|
| `name` | æ˜¯ | å”¯ä¸€æ’ä»¶æ ‡è¯†ç¬¦ã€‚å°å†™ï¼Œå¯ç”¨è¿žå­—ç¬¦ã€‚ç”¨äºŽ URL å’Œæ³¨å†Œã€‚ |
| `label` | æ˜¯ | å¯¼èˆªæ ‡ç­¾é¡µä¸­æ˜¾ç¤ºçš„åç§°ã€‚ |
| `description` | å¦ | ç®€çŸ­æè¿°ï¼ˆæ˜¾ç¤ºåœ¨ dashboard ç®¡ç†ç•Œé¢ï¼‰ã€‚ |
| `icon` | å¦ | Lucide å›¾æ ‡åç§°ã€‚é»˜è®¤ä¸º `Puzzle`ã€‚æœªçŸ¥åç§°å›žé€€åˆ° `Puzzle`ã€‚ |
| `version` | å¦ | Semver å­—ç¬¦ä¸²ã€‚é»˜è®¤ä¸º `0.0.0`ã€‚ |
| `tab.path` | æ˜¯ | æ ‡ç­¾é¡µçš„ URL è·¯å¾„ï¼ˆä¾‹å¦‚ `/my-plugin`ï¼‰ã€‚ |
| `tab.position` | å¦ | æ ‡ç­¾é¡µæ’å…¥ä½ç½®ã€‚`"end"`ï¼ˆé»˜è®¤ï¼‰ã€`"after:<path>"` æˆ– `"before:<path>"`â€”â€”å†’å·åŽçš„å€¼æ˜¯ç›®æ ‡æ ‡ç­¾é¡µçš„**è·¯å¾„æ®µ**ï¼ˆæ— å‰å¯¼æ–œæ ï¼‰ã€‚ä¾‹å¦‚ï¼š`"after:skills"`ã€`"before:config"`ã€‚ |
| `tab.override` | å¦ | è®¾ç½®ä¸ºå†…ç½®è·¯ç”±è·¯å¾„ï¼ˆ`"/"`ã€`"/sessions"`ã€`"/config"` ç­‰ï¼‰ä»¥**æ›¿æ¢**è¯¥é¡µé¢ï¼Œè€Œéžæ·»åŠ æ–°æ ‡ç­¾é¡µã€‚å‚è§[æ›¿æ¢å†…ç½®é¡µé¢](#replacing-built-in-pages-taboverride)ã€‚ |
| `tab.hidden` | å¦ | ä¸º true æ—¶ï¼Œæ³¨å†Œç»„ä»¶å’Œæ‰€æœ‰æ’æ§½ï¼Œä½†ä¸å‘å¯¼èˆªæ·»åŠ æ ‡ç­¾é¡µã€‚ç”¨äºŽä»…æ’æ§½æ’ä»¶ã€‚å‚è§[ä»…æ’æ§½æ’ä»¶](#slot-only-plugins-tabhidden)ã€‚ |
| `slots` | å¦ | æ­¤æ’ä»¶å¡«å……çš„å‘½å shell æ’æ§½ã€‚**ä»…ä½œæ–‡æ¡£è¯´æ˜Ž**â€”â€”å®žé™…æ³¨å†Œé€šè¿‡ JS bundle ä¸­çš„ `registerSlot()` å®Œæˆã€‚åœ¨æ­¤åˆ—å‡ºæ’æ§½å¯ä½¿å‘çŽ°ç•Œé¢æ›´å…·ä¿¡æ¯é‡ã€‚ |
| `entry` | æ˜¯ | ç›¸å¯¹äºŽ `dashboard/` çš„ JS bundle è·¯å¾„ã€‚é»˜è®¤ä¸º `dist/index.js`ã€‚ |
| `css` | å¦ | ä»¥ `<link>` æ ‡ç­¾æ³¨å…¥çš„ CSS æ–‡ä»¶è·¯å¾„ã€‚ |
| `api` | å¦ | åŒ…å« FastAPI è·¯ç”±çš„ Python æ–‡ä»¶è·¯å¾„ã€‚æŒ‚è½½åœ¨ `/api/plugins/<name>/`ã€‚ |

#### å¯ç”¨å›¾æ ‡

æ’ä»¶ä½¿ç”¨ Lucide å›¾æ ‡åç§°ã€‚Dashboard æŒ‰åç§°æ˜ å°„â€”â€”æœªçŸ¥åç§°é™é»˜å›žé€€åˆ° `Puzzle`ã€‚

å½“å‰å·²æ˜ å°„ï¼š`Activity`ã€`BarChart3`ã€`Clock`ã€`Code`ã€`Database`ã€`Eye`ã€`FileText`ã€`Globe`ã€`Heart`ã€`KeyRound`ã€`MessageSquare`ã€`Package`ã€`Puzzle`ã€`Settings`ã€`Shield`ã€`Sparkles`ã€`Star`ã€`Terminal`ã€`Wrench`ã€`Zap`ã€‚

éœ€è¦å…¶ä»–å›¾æ ‡ï¼Ÿå‘ `web/src/App.tsx` çš„ `ICON_MAP` æäº¤ PRâ€”â€”çº¯å¢žé‡ä¿®æ”¹ã€‚

### Plugin SDK

æ’ä»¶æ‰€éœ€çš„ä¸€åˆ‡å‡åœ¨ `window.__ZED_PLUGIN_SDK__` ä¸Šã€‚æ’ä»¶ä¸åº”ç›´æŽ¥å¯¼å…¥ Reactã€‚

```javascript
const SDK = window.__ZED_PLUGIN_SDK__;

// React + hooks
SDK.React                    // the React instance
SDK.hooks.useState
SDK.hooks.useEffect
SDK.hooks.useCallback
SDK.hooks.useMemo
SDK.hooks.useRef
SDK.hooks.useContext
SDK.hooks.createContext

// UI components (shadcn/ui primitives)
SDK.components.Card
SDK.components.CardHeader
SDK.components.CardTitle
SDK.components.CardContent
SDK.components.Badge
SDK.components.Button
SDK.components.Input
SDK.components.Label
SDK.components.Select
SDK.components.SelectOption
SDK.components.Separator
SDK.components.Tabs
SDK.components.TabsList
SDK.components.TabsTrigger
SDK.components.PluginSlot    // render a named slot (useful for nested plugin UIs)

// Zed API client + raw fetcher
SDK.api                      // typed client â€” getStatus, getSessions, getConfig, ...
SDK.fetchJSON                // raw fetch for custom endpoints (plugin-registered routes)

// Utilities
SDK.utils.cn                 // Tailwind class merger (clsx + twMerge)
SDK.utils.timeAgo            // "5m ago" from unix timestamp
SDK.utils.isoTimeAgo         // "5m ago" from ISO string

// Hooks
SDK.useI18n                  // i18n hook for multi-language plugins
```

#### è°ƒç”¨æ’ä»¶çš„åŽç«¯

```javascript
SDK.fetchJSON("/api/plugins/my-plugin/data")
  .then((data) => console.log(data))
  .catch((err) => console.error("API call failed:", err));
```

`fetchJSON` ä¼šè‡ªåŠ¨æ³¨å…¥ä¼šè¯è®¤è¯ tokenï¼Œå°†é”™è¯¯ä½œä¸ºå¼‚å¸¸æŠ›å‡ºï¼Œå¹¶è‡ªåŠ¨è§£æž JSONã€‚

#### è°ƒç”¨å†…ç½® Zed ç«¯ç‚¹

```javascript
// Agent status
SDK.api.getStatus().then((s) => console.log("Version:", s.version));

// Recent sessions
SDK.api.getSessions(10).then((resp) => console.log(resp.sessions.length));
```

å®Œæ•´åˆ—è¡¨å‚è§ [Web Dashboard â†’ REST API](./web-dashboard#rest-api)ã€‚

### Shell æ’æ§½

æ’æ§½ï¼ˆslotï¼‰å…è®¸æ’ä»¶å‘åº”ç”¨ shell çš„å‘½åä½ç½®æ³¨å…¥ç»„ä»¶â€”â€”cockpit ä¾§è¾¹æ ã€é¡¶æ ã€åº•æ ã€è¦†ç›–å±‚â€”â€”è€Œæ— éœ€å ç”¨æ•´ä¸ªæ ‡ç­¾é¡µã€‚å¤šä¸ªæ’ä»¶å¯ä»¥å¡«å……åŒä¸€ä¸ªæ’æ§½ï¼›å®ƒä»¬æŒ‰æ³¨å†Œé¡ºåºå †å æ¸²æŸ“ã€‚

åœ¨æ’ä»¶ bundle å†…éƒ¨æ³¨å†Œï¼š

```javascript
window.__ZED_PLUGINS__.registerSlot("my-plugin", "sidebar", MySidebar);
window.__ZED_PLUGINS__.registerSlot("my-plugin", "header-left", MyCrest);
```

#### æ’æ§½ç›®å½•

**Shell å…¨å±€æ’æ§½**ï¼ˆåœ¨åº”ç”¨å¤–å£³çš„ä»»æ„ä½ç½®æ¸²æŸ“ï¼‰ï¼š

| æ’æ§½ | ä½ç½® |
|------|----------|
| `backdrop` | `<Backdrop />` å±‚å æ ˆå†…ï¼Œå™ªç‚¹å±‚ä¹‹ä¸Šã€‚ |
| `header-left` | é¡¶æ  Zed å“ç‰Œä¹‹å‰ã€‚ |
| `header-right` | é¡¶æ ä¸»é¢˜/è¯­è¨€åˆ‡æ¢å™¨ä¹‹å‰ã€‚ |
| `header-banner` | å¯¼èˆªæ ä¸‹æ–¹çš„å…¨å®½æ¡å¸¦ã€‚ |
| `sidebar` | Cockpit ä¾§è¾¹æ è½¨é“â€”â€”**ä»…åœ¨ `layoutVariant === "cockpit"` æ—¶æ¸²æŸ“**ã€‚ |
| `pre-main` | è·¯ç”±å‡ºå£ä¹‹ä¸Šï¼ˆ`<main>` å†…éƒ¨ï¼‰ã€‚ |
| `post-main` | è·¯ç”±å‡ºå£ä¹‹ä¸‹ï¼ˆ`<main>` å†…éƒ¨ï¼‰ã€‚ |
| `footer-left` | åº•æ å•å…ƒæ ¼å†…å®¹ï¼ˆæ›¿æ¢é»˜è®¤å†…å®¹ï¼‰ã€‚ |
| `footer-right` | åº•æ å•å…ƒæ ¼å†…å®¹ï¼ˆæ›¿æ¢é»˜è®¤å†…å®¹ï¼‰ã€‚ |
| `overlay` | ä½äºŽæ‰€æœ‰å†…å®¹ä¹‹ä¸Šçš„å›ºå®šå®šä½å±‚ã€‚é€‚ç”¨äºŽ `customCSS` æ— æ³•å•ç‹¬å®žçŽ°çš„å¤–è§‚æ•ˆæžœï¼ˆæ‰«æçº¿ã€æ™•å½±ç­‰ï¼‰ã€‚ |

**é¡µé¢çº§æ’æ§½**ï¼ˆä»…åœ¨æŒ‡å®šå†…ç½®é¡µé¢ä¸Šæ¸²æŸ“â€”â€”ç”¨äºŽå‘çŽ°æœ‰é¡µé¢æ³¨å…¥å°éƒ¨ä»¶ã€å¡ç‰‡æˆ–å·¥å…·æ ï¼Œè€Œæ— éœ€è¦†ç›–æ•´ä¸ªè·¯ç”±ï¼‰ï¼š

| æ’æ§½ | æ¸²æŸ“ä½ç½® |
|------|------------------|
| `sessions:top` / `sessions:bottom` | `/sessions` é¡µé¢é¡¶éƒ¨ / åº•éƒ¨ã€‚ |
| `analytics:top` / `analytics:bottom` | `/analytics` é¡µé¢é¡¶éƒ¨ / åº•éƒ¨ã€‚ |
| `logs:top` / `logs:bottom` | `/logs` é¡¶éƒ¨ï¼ˆè¿‡æ»¤å·¥å…·æ ä¹‹ä¸Šï¼‰/ åº•éƒ¨ï¼ˆæ—¥å¿—æŸ¥çœ‹å™¨ä¹‹ä¸‹ï¼‰ã€‚ |
| `cron:top` / `cron:bottom` | `/cron` é¡µé¢é¡¶éƒ¨ / åº•éƒ¨ã€‚ |
| `skills:top` / `skills:bottom` | `/skills` é¡µé¢é¡¶éƒ¨ / åº•éƒ¨ã€‚ |
| `config:top` / `config:bottom` | `/config` é¡µé¢é¡¶éƒ¨ / åº•éƒ¨ã€‚ |
| `env:top` / `env:bottom` | `/env`ï¼ˆKeysï¼‰é¡µé¢é¡¶éƒ¨ / åº•éƒ¨ã€‚ |
| `docs:top` / `docs:bottom` | `/docs` é¡¶éƒ¨ï¼ˆiframe ä¹‹ä¸Šï¼‰/ åº•éƒ¨ã€‚ |
| `chat:top` / `chat:bottom` | `/chat` é¡¶éƒ¨ / åº•éƒ¨ï¼ˆä»…åœ¨å¯ç”¨åµŒå…¥å¼èŠå¤©æ—¶æœ‰æ•ˆï¼‰ã€‚ |

ç¤ºä¾‹â€”â€”å‘ Sessions é¡µé¢é¡¶éƒ¨æ·»åŠ æ¨ªå¹…å¡ç‰‡ï¼š

```javascript
function PinnedSessionsBanner() {
  return React.createElement(Card, null,
    React.createElement(CardContent, { className: "py-2 text-xs" },
      "Pinned note injected by my-plugin"),
  );
}

window.__ZED_PLUGINS__.registerSlot("my-plugin", "sessions:top", PinnedSessionsBanner);
```

å¦‚æžœæ’ä»¶åªå¢žå¼ºçŽ°æœ‰é¡µé¢è€Œä¸éœ€è¦ç‹¬ç«‹çš„ä¾§è¾¹æ æ ‡ç­¾é¡µï¼Œå¯å°†é¡µé¢çº§æ’æ§½ä¸Ž `tab.hidden: true` ç»“åˆä½¿ç”¨ã€‚

Shell åªä¸ºä¸Šè¿°æ’æ§½æ¸²æŸ“ `<PluginSlot name="..." />`ã€‚æ³¨å†Œè¡¨æŽ¥å—é¢å¤–çš„åç§°ç”¨äºŽåµŒå¥—æ’ä»¶ UIâ€”â€”æ’ä»¶å¯é€šè¿‡ `SDK.components.PluginSlot` æš´éœ²è‡ªå·±çš„æ’æ§½ã€‚

#### é‡å¤æ³¨å†Œä¸Ž HMR

å¦‚æžœåŒä¸€ä¸ª `(plugin, slot)` å¯¹è¢«æ³¨å†Œä¸¤æ¬¡ï¼ŒåŽä¸€æ¬¡è°ƒç”¨ä¼šæ›¿æ¢å‰ä¸€æ¬¡â€”â€”è¿™ä¸Ž React HMR æœŸæœ›æ’ä»¶é‡æ–°æŒ‚è½½æ—¶çš„è¡Œä¸ºä¸€è‡´ã€‚

### æ›¿æ¢å†…ç½®é¡µé¢ï¼ˆ`tab.override`ï¼‰

å°† `tab.override` è®¾ç½®ä¸ºå†…ç½®è·¯ç”±è·¯å¾„ï¼Œå¯ä½¿æ’ä»¶ç»„ä»¶æ›¿æ¢è¯¥é¡µé¢ï¼Œè€Œéžæ·»åŠ æ–°æ ‡ç­¾é¡µã€‚é€‚ç”¨äºŽä¸»é¢˜å¸Œæœ›è‡ªå®šä¹‰é¦–é¡µï¼ˆ`/`ï¼‰ä½†ä¿ç•™ dashboard å…¶ä½™éƒ¨åˆ†çš„åœºæ™¯ã€‚

```json
{
  "name": "my-home",
  "label": "Home",
  "tab": {
    "path": "/my-home",
    "override": "/",
    "position": "end"
  },
  "entry": "dist/index.js"
}
```

è®¾ç½® `override` åŽï¼š

- è·¯ç”±å™¨ä¸­ `/` å¤„çš„åŽŸå§‹é¡µé¢ç»„ä»¶è¢«ç§»é™¤ã€‚
- ä½ çš„æ’ä»¶æ”¹ä¸ºåœ¨ `/` å¤„æ¸²æŸ“ã€‚
- ä¸ä¼šä¸º `tab.path` æ·»åŠ å¯¼èˆªæ ‡ç­¾é¡µï¼ˆè¦†ç›–æœ¬èº«æ‰æ˜¯ç›®çš„ï¼‰ã€‚

æ¯ä¸ªè·¯å¾„åªèƒ½æœ‰ä¸€ä¸ªæ’ä»¶è¿›è¡Œè¦†ç›–ã€‚å¦‚æžœä¸¤ä¸ªæ’ä»¶å£°æ˜Žç›¸åŒçš„è¦†ç›–è·¯å¾„ï¼Œç¬¬ä¸€ä¸ªç”Ÿæ•ˆï¼Œç¬¬äºŒä¸ªè¢«å¿½ç•¥å¹¶åœ¨å¼€å‘æ¨¡å¼ä¸‹è¾“å‡ºè­¦å‘Šã€‚

å¦‚æžœåªéœ€è¦å‘çŽ°æœ‰é¡µé¢æ·»åŠ å¡ç‰‡æˆ–å·¥å…·æ è€Œä¸å®Œå…¨æŽ¥ç®¡å®ƒï¼Œè¯·æ”¹ç”¨[é¡µé¢çº§æ’æ§½](#augmenting-built-in-pages-page-scoped-slots)ã€‚

### å¢žå¼ºå†…ç½®é¡µé¢ï¼ˆé¡µé¢çº§æ’æ§½ï¼‰

é€šè¿‡ `tab.override` å®Œå…¨æ›¿æ¢é¡µé¢ä»£ä»·è¾ƒé‡â€”â€”ä½ çš„æ’ä»¶çŽ°åœ¨æ‹¥æœ‰æ•´ä¸ªé¡µé¢ï¼ŒåŒ…æ‹¬æˆ‘ä»¬æœªæ¥å¯¹å…¶çš„æ‰€æœ‰æ›´æ–°ã€‚å¤§å¤šæ•°æƒ…å†µä¸‹ï¼Œä½ åªæ˜¯æƒ³å‘çŽ°æœ‰é¡µé¢æ·»åŠ æ¨ªå¹…ã€å¡ç‰‡æˆ–å·¥å…·æ ã€‚è¿™æ­£æ˜¯**é¡µé¢çº§æ’æ§½**çš„ç”¨é€”ã€‚

æ¯ä¸ªå†…ç½®é¡µé¢éƒ½åœ¨å…¶å†…å®¹åŒºåŸŸçš„é¡¶éƒ¨å’Œåº•éƒ¨æš´éœ² `<page>:top` å’Œ `<page>:bottom` æ’æ§½ã€‚ä½ çš„æ’ä»¶é€šè¿‡è°ƒç”¨ `registerSlot()` å¡«å……å…¶ä¸­ä¸€ä¸ªâ€”â€”å†…ç½®é¡µé¢æ­£å¸¸å·¥ä½œï¼Œä½ çš„ç»„ä»¶åœ¨å…¶æ—è¾¹æ¸²æŸ“ã€‚

å¯ç”¨æ’æ§½ï¼š`sessions:*`ã€`analytics:*`ã€`logs:*`ã€`cron:*`ã€`skills:*`ã€`config:*`ã€`env:*`ã€`docs:*`ã€`chat:*`ï¼ˆæ¯ä¸ªå‡æœ‰ `:top` å’Œ `:bottom`ï¼‰ã€‚å®Œæ•´ç›®å½•å‚è§ [Shell æ’æ§½ â†’ æ’æ§½ç›®å½•](#slot-catalogue)ã€‚

æœ€ç®€ç¤ºä¾‹â€”â€”åœ¨ Sessions é¡µé¢é¡¶éƒ¨å›ºå®šä¸€ä¸ªæ¨ªå¹…ï¼š

```json
// ~/.zed/plugins/session-notes/dashboard/manifest.json
{
  "name": "session-notes",
  "label": "Session Notes",
  "tab": { "path": "/session-notes", "hidden": true },
  "slots": ["sessions:top"],
  "entry": "dist/index.js"
}
```

```javascript
// ~/.zed/plugins/session-notes/dashboard/dist/index.js
(function () {
  const SDK = window.__ZED_PLUGIN_SDK__;
  const { React } = SDK;
  const { Card, CardContent } = SDK.components;

  function Banner() {
    return React.createElement(Card, null,
      React.createElement(CardContent, { className: "py-2 text-xs" },
        "Remember to label important sessions before archiving."),
    );
  }

  // Placeholder for the hidden tab.
  window.__ZED_PLUGINS__.register("session-notes", function () { return null; });

  // The real work.
  window.__ZED_PLUGINS__.registerSlot("session-notes", "sessions:top", Banner);
})();
```

è¦ç‚¹ï¼š

- `tab.hidden: true` ä½¿æ’ä»¶ä¸å‡ºçŽ°åœ¨ä¾§è¾¹æ â€”â€”å®ƒæ²¡æœ‰ç‹¬ç«‹é¡µé¢ã€‚
- manifest ä¸­çš„ `slots` å­—æ®µä»…ä½œæ–‡æ¡£è¯´æ˜Žã€‚å®žé™…ç»‘å®šé€šè¿‡ JS bundle ä¸­çš„ `registerSlot()` å®Œæˆã€‚
- å¤šä¸ªæ’ä»¶å¯ä»¥å£°æ˜ŽåŒä¸€ä¸ªé¡µé¢çº§æ’æ§½ã€‚å®ƒä»¬æŒ‰æ³¨å†Œé¡ºåºå †å æ¸²æŸ“ã€‚
- æ— æ’ä»¶æ³¨å†Œæ—¶é›¶å¼€é”€ï¼šå†…ç½®é¡µé¢ä¸Žä¹‹å‰å®Œå…¨ç›¸åŒåœ°æ¸²æŸ“ã€‚

å‚è€ƒæ’ä»¶ï¼ˆ[`zed-example-plugins`](https://github.com/NousResearch/zed-example-plugins/tree/main/example-dashboard) ä¸­çš„ `example-dashboard`ï¼‰æä¾›äº†ä¸€ä¸ªå‘ `sessions:top` æ³¨å…¥æ¨ªå¹…çš„å®žæ—¶æ¼”ç¤ºâ€”â€”å®‰è£…å®ƒå¯ç«¯åˆ°ç«¯äº†è§£è¯¥æ¨¡å¼ã€‚

### ä»…æ’æ§½æ’ä»¶ï¼ˆ`tab.hidden`ï¼‰

å½“ `tab.hidden: true` æ—¶ï¼Œæ’ä»¶æ³¨å†Œå…¶ç»„ä»¶ï¼ˆç”¨äºŽç›´æŽ¥ URL è®¿é—®ï¼‰å’Œæ‰€æœ‰æ’æ§½ï¼Œä½†ä¸å‘å¯¼èˆªæ·»åŠ æ ‡ç­¾é¡µã€‚é€‚ç”¨äºŽä»…ç”¨äºŽæ³¨å…¥æ’æ§½çš„æ’ä»¶â€”â€”é¡¶æ å¾½æ ‡ã€ä¾§è¾¹æ  HUDã€è¦†ç›–å±‚ã€‚

```json
{
  "name": "header-crest",
  "label": "Header Crest",
  "tab": {
    "path": "/header-crest",
    "position": "end",
    "hidden": true
  },
  "slots": ["header-left"],
  "entry": "dist/index.js"
}
```

Bundle ä»éœ€è°ƒç”¨å¸¦å ä½ç¬¦ç»„ä»¶çš„ `register()`ï¼ˆä»¥é˜²æœ‰äººç›´æŽ¥è®¿é—®è¯¥ URLï¼‰ï¼Œç„¶åŽè°ƒç”¨ `registerSlot()` å®Œæˆå®žé™…å·¥ä½œã€‚

### åŽç«¯ API è·¯ç”±

æ’ä»¶å¯é€šè¿‡åœ¨ manifest ä¸­è®¾ç½® `api` æ¥æ³¨å†Œ FastAPI è·¯ç”±ã€‚åˆ›å»ºæ–‡ä»¶å¹¶å¯¼å‡º `router`ï¼š

```python
# ~/.zed/plugins/my-plugin/dashboard/plugin_api.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/data")
async def get_data():
    return {"items": ["one", "two", "three"]}

@router.post("/action")
async def do_action(body: dict):
    return {"ok": True, "received": body}
```

è·¯ç”±æŒ‚è½½åœ¨ `/api/plugins/<name>/` ä¸‹ï¼Œå› æ­¤ä¸Šè¿°è·¯ç”±å˜ä¸ºï¼š

- `GET  /api/plugins/my-plugin/data`
- `POST /api/plugins/my-plugin/action`

æ’ä»¶ API è·¯ç”±ç»•è¿‡ä¼šè¯ token è®¤è¯ï¼Œå› ä¸º dashboard æœåŠ¡å™¨é»˜è®¤ç»‘å®šåˆ° localhostã€‚**å¦‚æžœè¿è¡Œä¸å—ä¿¡ä»»çš„æ’ä»¶ï¼Œè¯·å‹¿ä½¿ç”¨ `--host 0.0.0.0` å°† dashboard æš´éœ²åœ¨å…¬å…±æŽ¥å£ä¸Š**â€”â€”å…¶è·¯ç”±ä¹Ÿä¼šå˜å¾—å¯è®¿é—®ã€‚

#### è®¿é—® Zed å†…éƒ¨æ¨¡å—

åŽç«¯è·¯ç”±åœ¨ dashboard è¿›ç¨‹å†…è¿è¡Œï¼Œå› æ­¤å¯ä»¥ç›´æŽ¥ä»Ž zed-agent ä»£ç åº“å¯¼å…¥ï¼š

```python
from fastapi import APIRouter
from zed_state import SessionDB
from zed_cli.config import load_config

router = APIRouter()

@router.get("/session-count")
async def session_count():
    db = SessionDB()
    try:
        count = len(db.list_sessions(limit=9999))
        return {"count": count}
    finally:
        db.close()

@router.get("/config-snapshot")
async def config_snapshot():
    cfg = load_config()
    return {"model": cfg.get("model", {})}
```

### æ’ä»¶è‡ªå®šä¹‰ CSS

å¦‚æžœæ’ä»¶éœ€è¦è¶…å‡º Tailwind ç±»å’Œå†…è” `style=` çš„æ ·å¼ï¼Œå¯æ·»åŠ  CSS æ–‡ä»¶å¹¶åœ¨ manifest ä¸­å¼•ç”¨ï¼š

```json
{
  "css": "dist/style.css"
}
```

æ–‡ä»¶åœ¨æ’ä»¶åŠ è½½æ—¶ä»¥ `<link>` æ ‡ç­¾æ³¨å…¥ã€‚ä½¿ç”¨ç‰¹å®šç±»åä»¥é¿å…ä¸Ž dashboard æ ·å¼å†²çªï¼Œå¹¶å¼•ç”¨ dashboard çš„ CSS å˜é‡ä»¥ä¿æŒä¸»é¢˜æ„ŸçŸ¥ï¼š

```css
/* dist/style.css */
.my-plugin-chart {
  border: 1px solid var(--color-border);
  background: var(--color-card);
  color: var(--color-card-foreground);
  padding: 1rem;
}
.my-plugin-chart:hover {
  border-color: var(--color-ring);
}
```

Dashboard å°†æ¯ä¸ª shadcn token æš´éœ²ä¸º `--color-*`ï¼Œä»¥åŠä¸»é¢˜é¢å¤–å˜é‡ï¼ˆ`--theme-asset-*`ã€`--component-<bucket>-*`ã€`--radius`ã€`--spacing-mul`ï¼‰ã€‚å¼•ç”¨è¿™äº›å˜é‡åŽï¼Œä½ çš„æ’ä»¶ä¼šéšæ¿€æ´»ä¸»é¢˜è‡ªåŠ¨æ¢è‚¤ã€‚

### æ’ä»¶å‘çŽ°ä¸Žé‡è½½

Dashboard æ‰«æä¸‰ä¸ªç›®å½•ä¸­çš„ `dashboard/manifest.json`ï¼š

| ä¼˜å…ˆçº§ | ç›®å½• | æ¥æºæ ‡ç­¾ |
|----------|-----------|--------------|
| 1ï¼ˆå†²çªæ—¶ä¼˜å…ˆï¼‰ | `~/.zed/plugins/<name>/dashboard/` | `user` |
| 2 | `<repo>/plugins/memory/<name>/dashboard/` | `bundled` |
| 2 | `<repo>/plugins/<name>/dashboard/` | `bundled` |
| 3 | `./.zed/plugins/<name>/dashboard/` | `project`â€”â€”ä»…åœ¨è®¾ç½® `ZED_ENABLE_PROJECT_PLUGINS` æ—¶ç”Ÿæ•ˆ |

å‘çŽ°ç»“æžœåœ¨æ¯ä¸ª dashboard è¿›ç¨‹ä¸­ç¼“å­˜ã€‚æ·»åŠ æ–°æ’ä»¶åŽï¼Œå¯ä»¥ï¼š

```bash
# Force a rescan without restart
curl http://127.0.0.1:9119/api/dashboard/plugins/rescan
```

â€¦â€¦æˆ–é‡å¯ `zed dashboard`ã€‚

#### æ’ä»¶åŠ è½½ç”Ÿå‘½å‘¨æœŸ

1. Dashboard åŠ è½½ã€‚`main.tsx` åœ¨ `window.__ZED_PLUGIN_SDK__` ä¸Šæš´éœ² SDKï¼Œåœ¨ `window.__ZED_PLUGINS__` ä¸Šæš´éœ²æ³¨å†Œè¡¨ã€‚
2. `App.tsx` è°ƒç”¨ `usePlugins()` â†’ èŽ·å– `GET /api/dashboard/plugins`ã€‚
3. å¯¹äºŽæ¯ä¸ª manifestï¼šæ³¨å…¥ CSS `<link>`ï¼ˆå¦‚å·²å£°æ˜Žï¼‰ï¼Œç„¶åŽé€šè¿‡ `<script>` æ ‡ç­¾åŠ è½½ JS bundleã€‚
4. æ’ä»¶çš„ IIFE è¿è¡Œå¹¶è°ƒç”¨ `window.__ZED_PLUGINS__.register(name, Component)`â€”â€”ä»¥åŠå¯é€‰çš„ `.registerSlot(name, slot, Component)` ç”¨äºŽæ¯ä¸ªæ’æ§½ã€‚
5. Dashboard å°†æ³¨å†Œçš„ç»„ä»¶ä¸Ž manifest å¯¹åº”ï¼Œå°†æ ‡ç­¾é¡µæ·»åŠ åˆ°å¯¼èˆªï¼ˆé™¤éž `hidden`ï¼‰ï¼Œå¹¶å°†ç»„ä»¶æŒ‚è½½ä¸ºè·¯ç”±ã€‚

æ’ä»¶åœ¨è„šæœ¬åŠ è½½åŽæœ€å¤šæœ‰ **2 ç§’**æ—¶é—´è°ƒç”¨ `register()`ã€‚è¶…æ—¶åŽ dashboard åœæ­¢ç­‰å¾…å¹¶å®Œæˆåˆå§‹æ¸²æŸ“ã€‚å¦‚æžœæ’ä»¶ä¹‹åŽæ‰æ³¨å†Œï¼Œå®ƒä»ä¼šå‡ºçŽ°â€”â€”å¯¼èˆªæ˜¯å“åº”å¼çš„ã€‚

å¦‚æžœæ’ä»¶è„šæœ¬åŠ è½½å¤±è´¥ï¼ˆ404ã€è¯­æ³•é”™è¯¯ã€IIFE æ‰§è¡ŒæœŸé—´æŠ›å‡ºå¼‚å¸¸ï¼‰ï¼Œdashboard ä¼šå‘æµè§ˆå™¨æŽ§åˆ¶å°è¾“å‡ºè­¦å‘Šå¹¶ç»§ç»­è¿è¡Œã€‚

---

## ä¸»é¢˜ + æ’ä»¶ç»„åˆæ¼”ç¤º

[`strike-freedom-cockpit`](https://github.com/NousResearch/zed-example-plugins/tree/main/strike-freedom-cockpit) æ’ä»¶ï¼ˆä¼´éšä»“åº“ `zed-example-plugins`ï¼‰æ˜¯ä¸€ä¸ªå®Œæ•´çš„æ¢è‚¤æ¼”ç¤ºã€‚å®ƒå°†ä¸»é¢˜ YAML ä¸Žä»…æ’æ§½æ’ä»¶é…å¯¹ï¼Œåœ¨ä¸ fork dashboard çš„æƒ…å†µä¸‹ç”Ÿæˆé©¾é©¶èˆ±é£Žæ ¼çš„ HUDã€‚

**æ¼”ç¤ºå†…å®¹ï¼š**

- å®Œæ•´ä¸»é¢˜ï¼Œä½¿ç”¨è°ƒè‰²æ¿ã€å­—ä½“æŽ’ç‰ˆã€`fontUrl`ã€`layoutVariant: cockpit`ã€`assets`ã€`componentStyles`ï¼ˆåˆ‡è§’å¡ç‰‡ã€æ¸å˜èƒŒæ™¯ï¼‰ã€`colorOverrides` å’Œ `customCSS`ï¼ˆæ‰«æçº¿å åŠ ï¼‰ã€‚
- ä»…æ’æ§½æ’ä»¶ï¼ˆ`tab.hidden: true`ï¼‰ï¼Œæ³¨å†Œåˆ°ä¸‰ä¸ªæ’æ§½ï¼š
  - `sidebar` â€” å¸¦æœ‰ç”± `SDK.api.getStatus()` é©±åŠ¨çš„å®žæ—¶é¥æµ‹æ¡çš„ MS-STATUS é¢æ¿ã€‚
  - `header-left` â€” ä»Žæ¿€æ´»ä¸»é¢˜è¯»å– `--theme-asset-crest` çš„æ´¾ç³»å¾½æ ‡ã€‚
  - `footer-right` â€” æ›¿æ¢é»˜è®¤ç»„ç»‡è¡Œçš„è‡ªå®šä¹‰æ ‡è¯­ã€‚
- æ’ä»¶é€šè¿‡ CSS å˜é‡è¯»å–ä¸»é¢˜æä¾›çš„å›¾ç‰‡ï¼Œå› æ­¤åˆ‡æ¢ä¸»é¢˜å¯åœ¨ä¸ä¿®æ”¹æ’ä»¶ä»£ç çš„æƒ…å†µä¸‹æ›´æ¢è‹±é›„å›¾/å¾½æ ‡ã€‚

**å®‰è£…ï¼š**

```bash
git clone https://github.com/NousResearch/zed-example-plugins.git

# Theme
cp zed-example-plugins/strike-freedom-cockpit/theme/strike-freedom.yaml \
   ~/.zed/dashboard-themes/

# Plugin
cp -r zed-example-plugins/strike-freedom-cockpit ~/.zed/plugins/
```

æ‰“å¼€ dashboardï¼Œä»Žä¸»é¢˜åˆ‡æ¢å™¨ä¸­é€‰æ‹© **Strike Freedom**ã€‚é©¾é©¶èˆ±ä¾§è¾¹æ å‡ºçŽ°ï¼Œå¾½æ ‡æ˜¾ç¤ºåœ¨é¡¶æ ï¼Œæ ‡è¯­æ›¿æ¢åº•æ ã€‚åˆ‡æ¢å›ž **Zed Teal**ï¼Œæ’ä»¶ä»ç„¶å®‰è£…ä½†ä¸å¯è§ï¼ˆ`sidebar` æ’æ§½ä»…åœ¨ `cockpit` å¸ƒå±€å˜ä½“ä¸‹æ¸²æŸ“ï¼‰ã€‚

é˜…è¯»æ’ä»¶æºç ï¼ˆä¼´éšä»“åº“ä¸­çš„ `strike-freedom-cockpit/dashboard/dist/index.js`ï¼‰ï¼Œäº†è§£å®ƒå¦‚ä½•è¯»å– CSS å˜é‡ã€é˜²èŒƒä¸æ”¯æŒæ’æ§½çš„æ—§ç‰ˆ dashboardï¼Œä»¥åŠå¦‚ä½•ä»Žå•ä¸ª bundle æ³¨å†Œä¸‰ä¸ªæ’æ§½ã€‚

---

## API å‚è€ƒ

### ä¸»é¢˜ç«¯ç‚¹

| ç«¯ç‚¹ | æ–¹æ³• | æè¿° |
|----------|--------|-------------|
| `/api/dashboard/themes` | GET | åˆ—å‡ºå¯ç”¨ä¸»é¢˜åŠå½“å‰æ¿€æ´»åç§°ã€‚å†…ç½®ä¸»é¢˜è¿”å›ž `{name, label, description}`ï¼›ç”¨æˆ·ä¸»é¢˜è¿˜åŒ…å«å¸¦æœ‰å®Œæ•´è§„èŒƒåŒ–ä¸»é¢˜å¯¹è±¡çš„ `definition` å­—æ®µã€‚ |
| `/api/dashboard/theme` | PUT | è®¾ç½®æ¿€æ´»ä¸»é¢˜ã€‚è¯·æ±‚ä½“ï¼š`{"name": "midnight"}`ã€‚æŒä¹…åŒ–åˆ° `config.yaml` çš„ `dashboard.theme` ä¸‹ã€‚ |

### æ’ä»¶ç«¯ç‚¹

| ç«¯ç‚¹ | æ–¹æ³• | æè¿° |
|----------|--------|-------------|
| `/api/dashboard/plugins` | GET | åˆ—å‡ºå·²å‘çŽ°çš„æ’ä»¶ï¼ˆå« manifestï¼ŒåŽ»é™¤å†…éƒ¨å­—æ®µï¼‰ã€‚ |
| `/api/dashboard/plugins/rescan` | GET | å¼ºåˆ¶é‡æ–°æ‰«ææ’ä»¶ç›®å½•ï¼Œæ— éœ€é‡å¯ã€‚ |
| `/dashboard-plugins/<name>/<path>` | GET | ä»Žæ’ä»¶çš„ `dashboard/` ç›®å½•æä¾›é™æ€èµ„æºã€‚è·¯å¾„éåŽ†å·²è¢«é˜»æ­¢ã€‚ |
| `/api/plugins/<name>/*` | * | æ’ä»¶æ³¨å†Œçš„åŽç«¯è·¯ç”±ã€‚ |

### `window` ä¸Šçš„ SDK

| å…¨å±€å˜é‡ | ç±»åž‹ | æä¾›æ–¹ |
|--------|------|----------|
| `window.__ZED_PLUGIN_SDK__` | object | `registry.ts` â€” Reactã€hooksã€UI ç»„ä»¶ã€API å®¢æˆ·ç«¯ã€å·¥å…·å‡½æ•°ã€‚ |
| `window.__ZED_PLUGINS__.register(name, Component)` | function | æ³¨å†Œæ’ä»¶çš„ä¸»ç»„ä»¶ã€‚ |
| `window.__ZED_PLUGINS__.registerSlot(name, slot, Component)` | function | æ³¨å†Œåˆ°å‘½å shell æ’æ§½ã€‚ |

---

## æ•…éšœæŽ’æŸ¥

**æˆ‘çš„ä¸»é¢˜æ²¡æœ‰å‡ºçŽ°åœ¨é€‰æ‹©å™¨ä¸­ã€‚**
æ£€æŸ¥æ–‡ä»¶æ˜¯å¦åœ¨ `~/.zed/dashboard-themes/` ä¸­ä¸”ä»¥ `.yaml` æˆ– `.yml` ç»“å°¾ã€‚åˆ·æ–°é¡µé¢ã€‚è¿è¡Œ `curl http://127.0.0.1:9119/api/dashboard/themes`â€”â€”ä½ çš„ä¸»é¢˜åº”å‡ºçŽ°åœ¨å“åº”ä¸­ã€‚å¦‚æžœ YAML æœ‰è§£æžé”™è¯¯ï¼Œdashboard ä¼šè®°å½•åˆ° `~/.zed/logs/` ä¸‹çš„ `errors.log`ã€‚

**æˆ‘çš„æ’ä»¶æ ‡ç­¾é¡µæ²¡æœ‰æ˜¾ç¤ºã€‚**
1. æ£€æŸ¥ manifest æ˜¯å¦åœ¨ `~/.zed/plugins/<name>/dashboard/manifest.json`ï¼ˆæ³¨æ„ `dashboard/` å­ç›®å½•ï¼‰ã€‚
2. è¿è¡Œ `curl http://127.0.0.1:9119/api/dashboard/plugins/rescan` å¼ºåˆ¶é‡æ–°å‘çŽ°ã€‚
3. æ‰“å¼€æµè§ˆå™¨å¼€å‘å·¥å…· â†’ Networkâ€”â€”ç¡®è®¤ `manifest.json`ã€`index.js` å’Œä»»ä½• CSS å‡æ—  404 åŠ è½½æˆåŠŸã€‚
4. æ‰“å¼€æµè§ˆå™¨å¼€å‘å·¥å…· â†’ Consoleâ€”â€”æŸ¥æ‰¾ IIFE æ‰§è¡ŒæœŸé—´çš„é”™è¯¯æˆ– `window.__ZED_PLUGINS__ is undefined`ï¼ˆè¡¨ç¤º SDK æœªåˆå§‹åŒ–ï¼Œé€šå¸¸æ˜¯æ›´æ—©çš„ React æ¸²æŸ“å´©æºƒå¯¼è‡´ï¼‰ã€‚
5. éªŒè¯ä½ çš„ bundle ä»¥ä¸Ž `manifest.json:name` **ç›¸åŒçš„åç§°**è°ƒç”¨ `window.__ZED_PLUGINS__.register(...)`ã€‚

**æ’æ§½æ³¨å†Œçš„ç»„ä»¶æ²¡æœ‰æ¸²æŸ“ã€‚**
`sidebar` æ’æ§½ä»…åœ¨æ¿€æ´»ä¸»é¢˜è®¾ç½®äº† `layoutVariant: cockpit` æ—¶æ¸²æŸ“ã€‚å…¶ä»–æ’æ§½å§‹ç»ˆæ¸²æŸ“ã€‚å¦‚æžœä½ æ³¨å†Œåˆ°æŸä¸ªæ’æ§½ä½†æ²¡æœ‰å‘½ä¸­ï¼Œåœ¨ `registerSlot` å†…æ·»åŠ  `console.log` ä»¥ç¡®è®¤æ’ä»¶ bundle æ˜¯å¦å·²è¿è¡Œã€‚

**æ’ä»¶åŽç«¯è·¯ç”±è¿”å›ž 404ã€‚**
1. ç¡®è®¤ manifest ä¸­æœ‰ `"api": "plugin_api.py"` ä¸”æŒ‡å‘ `dashboard/` å†…çš„çŽ°æœ‰æ–‡ä»¶ã€‚
2. é‡å¯ `zed dashboard`â€”â€”æ’ä»¶ API è·¯ç”±åœ¨å¯åŠ¨æ—¶æŒ‚è½½ä¸€æ¬¡ï¼Œ**ä¸ä¼š**åœ¨é‡æ–°æ‰«ææ—¶æŒ‚è½½ã€‚
3. æ£€æŸ¥ `plugin_api.py` æ˜¯å¦å¯¼å‡ºäº†æ¨¡å—çº§çš„ `router = APIRouter()`ã€‚å…¶ä»–å¯¼å‡ºåç§°ä¸ä¼šè¢«è¯†åˆ«ã€‚
4. æŸ¥çœ‹ `~/.zed/logs/errors.log` ä¸­çš„ `Failed to load plugin <name> API routes`â€”â€”å¯¼å…¥é”™è¯¯ä¼šè®°å½•åœ¨é‚£é‡Œã€‚

**åˆ‡æ¢ä¸»é¢˜åŽæˆ‘çš„é¢œè‰²è¦†ç›–ä¸¢å¤±äº†ã€‚**
`colorOverrides` çš„ä½œç”¨åŸŸé™äºŽæ¿€æ´»ä¸»é¢˜ï¼Œåˆ‡æ¢ä¸»é¢˜æ—¶ä¼šè¢«æ¸…é™¤â€”â€”è¿™æ˜¯è®¾è®¡è¡Œä¸ºã€‚å¦‚æžœä½ å¸Œæœ›è¦†ç›–æŒä¹…åŒ–ï¼Œè¯·å°†å…¶å†™å…¥ä¸»é¢˜çš„ YAMLï¼Œè€Œéžå®žæ—¶åˆ‡æ¢å™¨ã€‚

**ä¸»é¢˜ customCSS è¢«æˆªæ–­äº†ã€‚**
`customCSS` å—æ¯ä¸ªä¸»é¢˜ä¸Šé™ä¸º 32 KiBã€‚å¯å°†å¤§åž‹æ ·å¼è¡¨æ‹†åˆ†åˆ°å¤šä¸ªä¸»é¢˜ä¸­ï¼Œæˆ–æ”¹ç”¨é€šè¿‡ `css` å­—æ®µæ³¨å…¥å®Œæ•´æ ·å¼è¡¨çš„æ’ä»¶ï¼ˆæ— å¤§å°é™åˆ¶ï¼‰ã€‚

**æˆ‘æƒ³åœ¨ PyPI ä¸Šå‘å¸ƒæ’ä»¶ã€‚**
Dashboard æ’ä»¶é€šè¿‡ç›®å½•ç»“æž„å®‰è£…ï¼Œè€Œéž pip å…¥å£ç‚¹ã€‚ç›®å‰æœ€ç®€æ´çš„åˆ†å‘æ–¹å¼æ˜¯ç”¨æˆ·å…‹éš†åˆ° `~/.zed/plugins/` çš„ git ä»“åº“ã€‚åŸºäºŽ pip çš„ dashboard æ’ä»¶å®‰è£…å™¨ç›®å‰å°šæœªå®žçŽ°ã€‚