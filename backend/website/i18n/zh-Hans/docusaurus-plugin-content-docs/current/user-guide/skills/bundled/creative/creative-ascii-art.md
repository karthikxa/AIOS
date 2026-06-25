---
title: "Ascii Art â€” ASCII art: pyfiglet, cowsay, boxes, image-to-ascii"
sidebar_label: "Ascii Art"
description: "ASCII artï¼špyfigletã€cowsayã€boxesã€image-to-ascii"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Ascii Art

ASCII artï¼špyfigletã€cowsayã€boxesã€image-to-asciiã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/creative/ascii-art` |
| ç‰ˆæœ¬ | `4.0.0` |
| ä½œè€… | 0xbyt4, Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `ASCII`, `Art`, `Banners`, `Creative`, `Unicode`, `Text-Art`, `pyfiglet`, `figlet`, `cowsay`, `boxes` |
| ç›¸å…³ skill | [`excalidraw`](/user-guide/skills/bundled/creative/creative-excalidraw) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# ASCII Art Skill

å¤šç§å·¥å…·ï¼Œæ»¡è¶³ä¸åŒçš„ ASCII art éœ€æ±‚ã€‚æ‰€æœ‰å·¥å…·å‡ä¸ºæœ¬åœ° CLI ç¨‹åºæˆ–å…è´¹ REST APIâ€”â€”æ— éœ€ API å¯†é’¥ã€‚

## å·¥å…· 1ï¼šæ–‡å­—æ¨ªå¹…ï¼ˆpyfigletâ€”â€”æœ¬åœ°ï¼‰

å°†æ–‡æœ¬æ¸²æŸ“ä¸ºå¤§åž‹ ASCII art æ¨ªå¹…ã€‚å†…ç½® 571 ç§å­—ä½“ã€‚

### å®‰è£…

```bash
pip install pyfiglet --break-system-packages -q
```

### ç”¨æ³•

```bash
python3 -m pyfiglet "YOUR TEXT" -f slant
python3 -m pyfiglet "TEXT" -f doom -w 80    # Set width
python3 -m pyfiglet --list_fonts             # List all 571 fonts
```

### æŽ¨èå­—ä½“

| é£Žæ ¼ | å­—ä½“ | é€‚ç”¨åœºæ™¯ |
|-------|------|----------|
| ç®€æ´çŽ°ä»£ | `slant` | é¡¹ç›®åç§°ã€æ ‡é¢˜ |
| ç²—ä½“å—çŠ¶ | `doom` | æ ‡é¢˜ã€Logo |
| å¤§è€Œæ˜“è¯» | `big` | æ¨ªå¹… |
| ç»å…¸æ¨ªå¹… | `banner3` | å®½å±æ˜¾ç¤º |
| ç´§å‡‘ | `small` | å‰¯æ ‡é¢˜ |
| èµ›åšæœ‹å…‹ | `cyberlarge` | ç§‘æŠ€ä¸»é¢˜ |
| 3D æ•ˆæžœ | `3-d` | å¯åŠ¨ç”»é¢ |
| å“¥ç‰¹é£Ž | `gothic` | æˆå‰§æ€§æ–‡å­— |

### æç¤º

- é¢„è§ˆ 2-3 ç§å­—ä½“ï¼Œè®©ç”¨æˆ·é€‰æ‹©å–œæ¬¢çš„
- çŸ­æ–‡æœ¬ï¼ˆ1-8 ä¸ªå­—ç¬¦ï¼‰ä¸Ž `doom` æˆ– `block` ç­‰ç²¾ç»†å­—ä½“æ­é…æ•ˆæžœæœ€ä½³
- é•¿æ–‡æœ¬æ›´é€‚åˆ `small` æˆ– `mini` ç­‰ç´§å‡‘å­—ä½“

## å·¥å…· 2ï¼šæ–‡å­—æ¨ªå¹…ï¼ˆasciified APIâ€”â€”è¿œç¨‹ï¼Œæ— éœ€å®‰è£…ï¼‰

å°†æ–‡æœ¬è½¬æ¢ä¸º ASCII art çš„å…è´¹ REST APIã€‚æ”¯æŒ 250+ ç§ FIGlet å­—ä½“ã€‚ç›´æŽ¥è¿”å›žçº¯æ–‡æœ¬â€”â€”æ— éœ€è§£æžã€‚å½“ pyfiglet æœªå®‰è£…æ—¶ä½¿ç”¨ï¼Œæˆ–ä½œä¸ºå¿«é€Ÿæ›¿ä»£æ–¹æ¡ˆã€‚

### ç”¨æ³•ï¼ˆé€šè¿‡ç»ˆç«¯ curlï¼‰

```bash
# Basic text banner (default font)
curl -s "https://asciified.thelicato.io/api/v2/ascii?text=Hello+World"

# With a specific font
curl -s "https://asciified.thelicato.io/api/v2/ascii?text=Hello&font=Slant"
curl -s "https://asciified.thelicato.io/api/v2/ascii?text=Hello&font=Doom"
curl -s "https://asciified.thelicato.io/api/v2/ascii?text=Hello&font=Star+Wars"
curl -s "https://asciified.thelicato.io/api/v2/ascii?text=Hello&font=3-D"
curl -s "https://asciified.thelicato.io/api/v2/ascii?text=Hello&font=Banner3"

# List all available fonts (returns JSON array)
curl -s "https://asciified.thelicato.io/api/v2/fonts"
```

### æç¤º

- åœ¨ text å‚æ•°ä¸­å°†ç©ºæ ¼ URL ç¼–ç ä¸º `+`
- å“åº”ä¸ºçº¯æ–‡æœ¬ ASCII artâ€”â€”æ—  JSON åŒ…è£…ï¼Œå¯ç›´æŽ¥æ˜¾ç¤º
- å­—ä½“åç§°åŒºåˆ†å¤§å°å†™ï¼›ä½¿ç”¨ fonts ç«¯ç‚¹èŽ·å–ç²¾ç¡®åç§°
- åœ¨ä»»ä½•å¸¦æœ‰ curl çš„ç»ˆç«¯ä¸­å‡å¯ä½¿ç”¨â€”â€”æ— éœ€ Python æˆ– pip

## å·¥å…· 3ï¼šCowsayï¼ˆæ¶ˆæ¯è‰ºæœ¯ï¼‰

ç»å…¸å·¥å…·ï¼Œå°†æ–‡æœ¬åŒ…è£¹åœ¨å¸¦æœ‰ ASCII è§’è‰²çš„å¯¹è¯æ°”æ³¡ä¸­ã€‚

### å®‰è£…

```bash
sudo apt install cowsay -y    # Debian/Ubuntu
# brew install cowsay         # macOS
```

### ç”¨æ³•

```bash
cowsay "Hello World"
cowsay -f tux "Linux rules"       # Tux the penguin
cowsay -f dragon "Rawr!"          # Dragon
cowsay -f stegosaurus "Roar!"     # Stegosaurus
cowthink "Hmm..."                  # Thought bubble
cowsay -l                          # List all characters
```

### å¯ç”¨è§’è‰²ï¼ˆ50+ï¼‰

`beavis.zen`, `bong`, `bunny`, `cheese`, `daemon`, `default`, `dragon`,
`dragon-and-cow`, `elephant`, `eyes`, `flaming-skull`, `ghostbusters`,
`hellokitty`, `kiss`, `kitty`, `koala`, `luke-koala`, `mech-and-cow`,
`meow`, `moofasa`, `moose`, `ren`, `sheep`, `skeleton`, `small`,
`stegosaurus`, `stimpy`, `supermilker`, `surgery`, `three-eyes`,
`turkey`, `turtle`, `tux`, `udder`, `vader`, `vader-koala`, `www`

### çœ¼ç›/èˆŒå¤´ä¿®é¥°ç¬¦

```bash
cowsay -b "Borg"       # =_= eyes
cowsay -d "Dead"       # x_x eyes
cowsay -g "Greedy"     # $_$ eyes
cowsay -p "Paranoid"   # @_@ eyes
cowsay -s "Stoned"     # *_* eyes
cowsay -w "Wired"      # O_O eyes
cowsay -e "OO" "Msg"   # Custom eyes
cowsay -T "U " "Msg"   # Custom tongue
```

## å·¥å…· 4ï¼šBoxesï¼ˆè£…é¥°æ€§è¾¹æ¡†ï¼‰

åœ¨ä»»æ„æ–‡æœ¬å‘¨å›´ç»˜åˆ¶è£…é¥°æ€§ ASCII art è¾¹æ¡†/æ¡†æž¶ã€‚å†…ç½® 70+ ç§è®¾è®¡ã€‚

### å®‰è£…

```bash
sudo apt install boxes -y    # Debian/Ubuntu
# brew install boxes         # macOS
```

### ç”¨æ³•

```bash
echo "Hello World" | boxes                    # Default box
echo "Hello World" | boxes -d stone           # Stone border
echo "Hello World" | boxes -d parchment       # Parchment scroll
echo "Hello World" | boxes -d cat             # Cat border
echo "Hello World" | boxes -d dog             # Dog border
echo "Hello World" | boxes -d unicornsay      # Unicorn
echo "Hello World" | boxes -d diamonds        # Diamond pattern
echo "Hello World" | boxes -d c-cmt           # C-style comment
echo "Hello World" | boxes -d html-cmt        # HTML comment
echo "Hello World" | boxes -a c               # Center text
boxes -l                                       # List all 70+ designs
```

### ä¸Ž pyfiglet æˆ– asciified ç»„åˆä½¿ç”¨

```bash
python3 -m pyfiglet "ZED" -f slant | boxes -d stone
# Or without pyfiglet installed:
curl -s "https://asciified.thelicato.io/api/v2/ascii?text=ZED&font=Slant" | boxes -d stone
```

## å·¥å…· 5ï¼šTOIletï¼ˆå½©è‰²æ–‡å­—è‰ºæœ¯ï¼‰

ç±»ä¼¼ pyfigletï¼Œä½†æ”¯æŒ ANSI é¢œè‰²æ•ˆæžœå’Œè§†è§‰æ»¤é•œã€‚éžå¸¸é€‚åˆç»ˆç«¯è§†è§‰æ•ˆæžœã€‚

### å®‰è£…

```bash
sudo apt install toilet toilet-fonts -y    # Debian/Ubuntu
# brew install toilet                      # macOS
```

### ç”¨æ³•

```bash
toilet "Hello World"                    # Basic text art
toilet -f bigmono12 "Hello"            # Specific font
toilet --gay "Rainbow!"                 # Rainbow coloring
toilet --metal "Metal!"                 # Metallic effect
toilet -F border "Bordered"             # Add border
toilet -F border --gay "Fancy!"         # Combined effects
toilet -f pagga "Block"                 # Block-style font (unique to toilet)
toilet -F list                          # List available filters
```

### æ»¤é•œ

`crop`ã€`gay`ï¼ˆå½©è™¹ï¼‰ã€`metal`ã€`flip`ã€`flop`ã€`180`ã€`left`ã€`right`ã€`border`

**æ³¨æ„**ï¼štoilet è¾“å‡ºå¸¦é¢œè‰²çš„ ANSI è½¬ä¹‰ç â€”â€”åœ¨ç»ˆç«¯ä¸­æ­£å¸¸æ˜¾ç¤ºï¼Œä½†åœ¨æŸäº›åœºæ™¯ä¸‹å¯èƒ½æ— æ³•æ¸²æŸ“ï¼ˆä¾‹å¦‚çº¯æ–‡æœ¬æ–‡ä»¶ã€éƒ¨åˆ†èŠå¤©å¹³å°ï¼‰ã€‚

## å·¥å…· 6ï¼šå›¾ç‰‡è½¬ ASCII Art

å°†å›¾ç‰‡ï¼ˆPNGã€JPEGã€GIFã€WEBPï¼‰è½¬æ¢ä¸º ASCII artã€‚

### æ–¹æ¡ˆ Aï¼šascii-image-converterï¼ˆæŽ¨èï¼ŒçŽ°ä»£åŒ–ï¼‰

```bash
# Install
sudo snap install ascii-image-converter
# OR: go install github.com/TheZoraiz/ascii-image-converter@latest
```

```bash
ascii-image-converter image.png                  # Basic
ascii-image-converter image.png -C               # Color output
ascii-image-converter image.png -d 60,30         # Set dimensions
ascii-image-converter image.png -b               # Braille characters
ascii-image-converter image.png -n               # Negative/inverted
ascii-image-converter https://url/image.jpg      # Direct URL
ascii-image-converter image.png --save-txt out   # Save as text
```

### æ–¹æ¡ˆ Bï¼šjp2aï¼ˆè½»é‡çº§ï¼Œä»…æ”¯æŒ JPEGï¼‰

```bash
sudo apt install jp2a -y
jp2a --width=80 image.jpg
jp2a --colors image.jpg              # Colorized
```

## å·¥å…· 7ï¼šæœç´¢é¢„åˆ¶ ASCII Art

ä»Žç½‘ç»œæœç´¢ç²¾é€‰ ASCII artã€‚ä½¿ç”¨ `terminal` é…åˆ `curl`ã€‚

### æ¥æº Aï¼šascii.co.ukï¼ˆæŽ¨èç”¨äºŽé¢„åˆ¶è‰ºæœ¯ï¼‰

å¤§é‡æŒ‰ä¸»é¢˜åˆ†ç±»çš„ç»å…¸ ASCII art åˆé›†ã€‚è‰ºæœ¯å†…å®¹ä½äºŽ HTML `<pre>` æ ‡ç­¾å†…ã€‚ä½¿ç”¨ curl èŽ·å–é¡µé¢ï¼Œå†ç”¨ç®€çŸ­çš„ Python ä»£ç æå–è‰ºæœ¯å†…å®¹ã€‚

**URL æ ¼å¼ï¼š** `https://ascii.co.uk/art/{subject}`

**ç¬¬ä¸€æ­¥â€”â€”èŽ·å–é¡µé¢ï¼š**

```bash
curl -s 'https://ascii.co.uk/art/cat' -o /tmp/ascii_art.html
```

**ç¬¬äºŒæ­¥â€”â€”ä»Ž pre æ ‡ç­¾ä¸­æå–è‰ºæœ¯å†…å®¹ï¼š**

```python
import re, html
with open('/tmp/ascii_art.html') as f:
    text = f.read()
arts = re.findall(r'<pre[^>]*>(.*?)</pre>', text, re.DOTALL)
for art in arts:
    clean = re.sub(r'<[^>]+>', '', art)
    clean = html.unescape(clean).strip()
    if len(clean) > 30:
        print(clean)
        print('\n---\n')
```

**å¯ç”¨ä¸»é¢˜**ï¼ˆç”¨ä½œ URL è·¯å¾„ï¼‰ï¼š
- åŠ¨ç‰©ï¼š`cat`ã€`dog`ã€`horse`ã€`bird`ã€`fish`ã€`dragon`ã€`snake`ã€`rabbit`ã€`elephant`ã€`dolphin`ã€`butterfly`ã€`owl`ã€`wolf`ã€`bear`ã€`penguin`ã€`turtle`
- ç‰©å“ï¼š`car`ã€`ship`ã€`airplane`ã€`rocket`ã€`guitar`ã€`computer`ã€`coffee`ã€`beer`ã€`cake`ã€`house`ã€`castle`ã€`sword`ã€`crown`ã€`key`
- è‡ªç„¶ï¼š`tree`ã€`flower`ã€`sun`ã€`moon`ã€`star`ã€`mountain`ã€`ocean`ã€`rainbow`
- è§’è‰²ï¼š`skull`ã€`robot`ã€`angel`ã€`wizard`ã€`pirate`ã€`ninja`ã€`alien`
- èŠ‚æ—¥ï¼š`christmas`ã€`halloween`ã€`valentine`

**æç¤ºï¼š**
- ä¿ç•™è‰ºæœ¯å®¶ç­¾å/ç¼©å†™â€”â€”è¿™æ˜¯é‡è¦çš„ç¤¼ä»ª
- æ¯ä¸ªé¡µé¢åŒ…å«å¤šä»¶è‰ºæœ¯ä½œå“â€”â€”ä¸ºç”¨æˆ·æŒ‘é€‰æœ€åˆé€‚çš„
- é€šè¿‡ curl å¯é è¿è¡Œï¼Œæ— éœ€ JavaScript

### æ¥æº Bï¼šGitHub Octocat APIï¼ˆæœ‰è¶£çš„å½©è›‹ï¼‰

è¿”å›žä¸€ä¸ªå¸¦æœ‰æ™ºæ…§è¯­å½•çš„éšæœº GitHub Octocatã€‚æ— éœ€è®¤è¯ã€‚

```bash
curl -s https://api.github.com/octocat
```

## å·¥å…· 8ï¼šæœ‰è¶£çš„ ASCII å®žç”¨å·¥å…·ï¼ˆé€šè¿‡ curlï¼‰

è¿™äº›å…è´¹æœåŠ¡ç›´æŽ¥è¿”å›ž ASCII artâ€”â€”éžå¸¸é€‚åˆä½œä¸ºæœ‰è¶£çš„é™„åŠ å†…å®¹ã€‚

### QR ç è½¬ ASCII Art

```bash
curl -s "qrenco.de/Hello+World"
curl -s "qrenco.de/https://example.com"
```

### å¤©æ°”è½¬ ASCII Art

```bash
curl -s "wttr.in/London"          # Full weather report with ASCII graphics
curl -s "wttr.in/Moon"            # Moon phase in ASCII art
curl -s "v2.wttr.in/London"       # Detailed version
```

## å·¥å…· 9ï¼šLLM ç”Ÿæˆè‡ªå®šä¹‰è‰ºæœ¯ï¼ˆå…œåº•æ–¹æ¡ˆï¼‰

å½“ä¸Šè¿°å·¥å…·æ— æ³•æ»¡è¶³éœ€æ±‚æ—¶ï¼Œç›´æŽ¥ä½¿ç”¨ä»¥ä¸‹ Unicode å­—ç¬¦ç”Ÿæˆ ASCII artï¼š

### å­—ç¬¦è°ƒè‰²æ¿

**æ–¹æ¡†ç»˜åˆ¶ï¼š** `â•” â•— â•š â• â•‘ â• â•  â•£ â•¦ â•© â•¬ â”Œ â” â”” â”˜ â”‚ â”€ â”œ â”¤ â”¬ â”´ â”¼ â•­ â•® â•° â•¯`

**å—å…ƒç´ ï¼š** `â–‘ â–’ â–“ â–ˆ â–„ â–€ â–Œ â– â–– â–— â–˜ â– â–š â–ž`

**å‡ ä½•ä¸Žç¬¦å·ï¼š** `â—† â—‡ â—ˆ â— â—‹ â—‰ â–  â–¡ â–² â–³ â–¼ â–½ â˜… â˜† âœ¦ âœ§ â—€ â–¶ â— â–· â¬¡ â¬¢ âŒ‚`

### è§„åˆ™

- æœ€å¤§å®½åº¦ï¼šæ¯è¡Œ 60 ä¸ªå­—ç¬¦ï¼ˆç»ˆç«¯å®‰å…¨ï¼‰
- æœ€å¤§é«˜åº¦ï¼šæ¨ªå¹… 15 è¡Œï¼Œåœºæ™¯ 25 è¡Œ
- ä»…é™ç­‰å®½å­—ä½“ï¼šè¾“å‡ºå¿…é¡»åœ¨ç­‰å®½å­—ä½“ä¸‹æ­£ç¡®æ¸²æŸ“

## å†³ç­–æµç¨‹

1. **å°†æ–‡æœ¬ä½œä¸ºæ¨ªå¹…** â†’ è‹¥å·²å®‰è£… pyfiglet åˆ™ä½¿ç”¨ï¼Œå¦åˆ™é€šè¿‡ curl è°ƒç”¨ asciified API
2. **å°†æ¶ˆæ¯åŒ…è£¹åœ¨æœ‰è¶£çš„è§’è‰²è‰ºæœ¯ä¸­** â†’ cowsay
3. **æ·»åŠ è£…é¥°æ€§è¾¹æ¡†/æ¡†æž¶** â†’ boxesï¼ˆå¯ä¸Ž pyfiglet/asciified ç»„åˆä½¿ç”¨ï¼‰
4. **ç‰¹å®šäº‹ç‰©çš„è‰ºæœ¯**ï¼ˆçŒ«ã€ç«ç®­ã€é¾™ï¼‰â†’ é€šè¿‡ curl + è§£æžä½¿ç”¨ ascii.co.uk
5. **å°†å›¾ç‰‡è½¬æ¢ä¸º ASCII** â†’ ascii-image-converter æˆ– jp2a
6. **QR ç ** â†’ é€šè¿‡ curl ä½¿ç”¨ qrenco.de
7. **å¤©æ°”/æœˆç›¸è‰ºæœ¯** â†’ é€šè¿‡ curl ä½¿ç”¨ wttr.in
8. **è‡ªå®šä¹‰/åˆ›æ„å†…å®¹** â†’ ä½¿ç”¨ Unicode è°ƒè‰²æ¿è¿›è¡Œ LLM ç”Ÿæˆ
9. **ä»»ä½•å·¥å…·æœªå®‰è£…** â†’ å®‰è£…å®ƒï¼Œæˆ–å›žé€€åˆ°ä¸‹ä¸€ä¸ªé€‰é¡¹