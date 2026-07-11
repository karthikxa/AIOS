---
title: "Pptx Author â€” ä½¿ç”¨ python-pptx æ— å¤´æž„å»º PowerPoint æ¼”ç¤ºæ–‡ç¨¿"
sidebar_label: "Pptx Author"
description: "ä½¿ç”¨ python-pptx æ— å¤´æž„å»º PowerPoint æ¼”ç¤ºæ–‡ç¨¿"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Pptx Author

ä½¿ç”¨ python-pptx æ— å¤´æž„å»º PowerPoint æ¼”ç¤ºæ–‡ç¨¿ã€‚ä¸Ž excel-author é…åˆä½¿ç”¨ï¼Œå¯æž„å»ºæ¯ä¸ªæ•°å­—éƒ½è¿½æº¯åˆ°å·¥ä½œç°¿å•å…ƒæ ¼çš„æ¨¡åž‹é©±åŠ¨æ¼”ç¤ºæ–‡ç¨¿ã€‚é€‚ç”¨äºŽèžèµ„è·¯æ¼”ææ–™ã€IC å¤‡å¿˜å½•ã€ç›ˆåˆ©è¯´æ˜Žã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/finance/pptx-author` å®‰è£… |
| è·¯å¾„ | `optional-skills/finance/pptx-author` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Anthropicï¼ˆç”± Zed Team æ”¹ç¼–ï¼‰ |
| è®¸å¯è¯ | Apache-2.0 |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `powerpoint`, `pptx`, `python-pptx`, `presentation`, `finance` |
| ç›¸å…³ skill | [`excel-author`](/user-guide/skills/optional/finance/finance-excel-author), [`powerpoint`](/user-guide/skills/bundled/productivity/productivity-powerpoint) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# pptx-author

ä½¿ç”¨ `python-pptx` åœ¨ç£ç›˜ä¸Šç”Ÿæˆ .pptx æ–‡ä»¶ã€‚å½“éœ€è¦å°†æ¼”ç¤ºæ–‡ç¨¿ä½œä¸ºæ–‡ä»¶äº§ç‰©äº¤ä»˜ï¼Œè€Œéžé©±åŠ¨å®žæ—¶ PowerPoint ä¼šè¯æ—¶ä½¿ç”¨ã€‚

æ”¹ç¼–è‡ª Anthropic åœ¨ [anthropics/financial-services](https://github.com/anthropics/financial-services) ä¸­çš„ `pptx-author` å’Œ `pitch-deck` skillã€‚åŽŸç‰ˆä¸­çš„ MCP / Office-JS åˆ†æ”¯å·²ç§»é™¤ â€” æœ¬ skill å‡å®šä½¿ç”¨æ— å¤´ Pythonã€‚

å¦‚éœ€æ›´å…¨é¢çš„ã€å·²å†…ç½®çš„ PowerPoint åˆ›ä½œ skillï¼ˆå¹»ç¯ç‰‡ã€æ¼”è®²è€…å¤‡æ³¨ã€åµŒå…¥ã€åª’ä½“ï¼‰ï¼Œè¯·å‚é˜…å†…ç½®çš„ `powerpoint` skillã€‚æœ¬ skill æ˜¯ä¸€ä¸ªæ›´è½»é‡çš„æ¨¡å¼ï¼Œä¸“ä¸ºæ¨¡åž‹é©±åŠ¨çš„æ¼”ç¤ºæ–‡ç¨¿ï¼ˆèžèµ„è·¯æ¼”ã€IC å¤‡å¿˜å½•ã€ç›ˆåˆ©è¯´æ˜Žï¼‰è°ƒä¼˜ï¼Œè¦æ±‚æ¯ä¸ªæ•°å­—éƒ½å¿…é¡»è¿½æº¯åˆ°æºå·¥ä½œç°¿ã€‚

## è¾“å‡ºçº¦å®š

- å†™å…¥ `./out/<name>.pptx`ã€‚å¦‚æžœ `./out/` ä¸å­˜åœ¨åˆ™åˆ›å»ºã€‚
- åœ¨æœ€ç»ˆæ¶ˆæ¯ä¸­è¿”å›žç›¸å¯¹è·¯å¾„ã€‚

## å®‰è£…

```bash
pip install "python-pptx>=0.6"
```

## æ ¸å¿ƒçº¦å®š

### æ¯å¼ å¹»ç¯ç‰‡ä¸€ä¸ªè§‚ç‚¹
æ ‡é¢˜é™ˆè¿°ç»“è®ºï¼›æ­£æ–‡æ”¯æ’‘ç»“è®ºã€‚æ ‡é¢˜ä¸º"Q3 Revenue"çš„å¹»ç¯ç‰‡è¡¨è¾¾åŠ›å¼±ï¼›"Revenue growth accelerated to 14% Y/Y in Q3"åˆ™æ›´æœ‰åŠ›ã€‚

### æ¯ä¸ªæ•°å­—éƒ½è¿½æº¯åˆ°æ¨¡åž‹
å¦‚æžœå¹»ç¯ç‰‡ä¸Šçš„æ•°å­—æ¥è‡ª `./out/model.xlsx`ï¼Œåˆ™åœ¨è„šæ³¨ä¸­æ³¨æ˜Žå·¥ä½œè¡¨å’Œå•å…ƒæ ¼ã€‚

```
Revenue: $1,250M  (Source: model.xlsx, Inputs!C3)
```

åˆ‡å‹¿å‡­è®°å¿†æˆ–æ‘˜è¦è½¬å½•æ•°å­— â€” æ‰“å¼€å·¥ä½œç°¿ï¼Œè¯»å–å‘½ååŒºåŸŸï¼Œå¹¶åœ¨å¯èƒ½çš„æƒ…å†µä¸‹ä»¥ç¼–ç¨‹æ–¹å¼å°†æ¼”ç¤ºæ–‡ç¨¿ä¸­çš„å€¼ç»‘å®šåˆ°å·¥ä½œç°¿ã€‚

### å­˜åœ¨å…¬å¸æ¨¡æ¿æ—¶ä½¿ç”¨å…¬å¸æ¨¡æ¿
å¦‚æžœ `./templates/firm-template.pptx` å­˜åœ¨ï¼Œåˆ™åŠ è½½å®ƒï¼Œä½¿æ¼”ç¤ºæ–‡ç¨¿ç»§æ‰¿å“ç‰Œé¢œè‰²ã€å­—ä½“å’Œæ¯ç‰ˆå¸ƒå±€ã€‚

```python
from pptx import Presentation
from pathlib import Path

template = Path("./templates/firm-template.pptx")
prs = Presentation(str(template)) if template.exists() else Presentation()
```

### å›¾è¡¨ï¼šä»Žæ¨¡åž‹å¯¼å‡º PNG ä¼˜äºŽåŽŸç”Ÿ pptx å›¾è¡¨
å½“ä¿çœŸåº¦è¦æ±‚è¾ƒé«˜æ—¶ï¼ˆæ¨¡åž‹çš„å›¾è¡¨æ ·å¼å¿…é¡»ä¸Žæ¼”ç¤ºæ–‡ç¨¿å®Œå…¨åŒ¹é…ï¼‰ï¼Œä»Žæºå·¥ä½œç°¿å°†å›¾è¡¨æ¸²æŸ“ä¸º PNG å¹¶åµŒå…¥å›¾ç‰‡ã€‚åŽŸç”Ÿ `pptx.chart` å›¾è¡¨è¾ƒè„†å¼±ï¼Œä¸”é€šå¸¸ä¸ç¬¦åˆå…¬å¸è§„èŒƒã€‚

```python
from pptx.util import Inches
slide.shapes.add_picture("./out/charts/football_field.png",
                         Inches(1), Inches(2),
                         width=Inches(8))
```

### ä¸å¯¹å¤–å‘é€
æœ¬ skill åªå†™å…¥æ–‡ä»¶ï¼Œä¸å‘é€é‚®ä»¶ã€ä¸Šä¼ æˆ–å‘å¸ƒã€‚äº¤ä»˜ç”±ç¼–æŽ’å±‚å¤„ç†ã€‚

## éª¨æž¶ä»£ç 

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pathlib import Path

template = Path("./templates/firm-template.pptx")
prs = Presentation(str(template)) if template.exists() else Presentation()

# Title slide
slide = prs.slides.add_slide(prs.slide_layouts[0])
slide.shapes.title.text = "Project Aurora â€” Strategic Alternatives"
slide.placeholders[1].text = "Preliminary Discussion Materials"

# Valuation summary slide (title-only layout)
slide = prs.slides.add_slide(prs.slide_layouts[5])
slide.shapes.title.text = "Valuation implies $38â€“$52 per share across methodologies"

# Add a table bound to model outputs
rows, cols = 5, 4
tbl_shape = slide.shapes.add_table(rows, cols,
                                   Inches(0.5), Inches(1.5),
                                   Inches(9), Inches(3))
tbl = tbl_shape.table
headers = ["Methodology", "Low ($)", "Mid ($)", "High ($)"]
for c, h in enumerate(headers):
    tbl.cell(0, c).text = h

# In a real deck, read these from the model workbook with openpyxl
data = [
    ("Trading comps",     "35", "41", "48"),
    ("Precedent M&A",     "39", "45", "52"),
    ("DCF (base)",        "36", "43", "51"),
    ("LBO (10% IRR)",     "33", "38", "44"),
]
for r, row in enumerate(data, start=1):
    for c, val in enumerate(row):
        tbl.cell(r, c).text = val

# Embed a chart rendered from the model
slide = prs.slides.add_slide(prs.slide_layouts[5])
slide.shapes.title.text = "Football field â€” current price $42"
slide.shapes.add_picture("./out/charts/football_field.png",
                         Inches(1), Inches(1.8), width=Inches(8))

Path("./out").mkdir(exist_ok=True)
prs.save("./out/pitch-aurora.pptx")
```

## å°†æ¼”ç¤ºæ–‡ç¨¿æ•°å­—ç»‘å®šåˆ°æºå·¥ä½œç°¿

ä»Ž Excel æ¨¡åž‹ä¸­è¯»å–å‘½ååŒºåŸŸæˆ–ç‰¹å®šå•å…ƒæ ¼ï¼Œç¡®ä¿æ¼”ç¤ºæ–‡ç¨¿ä¸­çš„æ•°å­—ä¸ä¼šåç¦»ã€‚

```python
from openpyxl import load_workbook

wb = load_workbook("./out/model.xlsx", data_only=True)
def nr(name):
    """Resolve a named range to its current computed value."""
    rng = wb.defined_names[name]
    sheet, coord = next(rng.destinations)
    return wb[sheet][coord].value

revenue_fy24 = nr("RevenueFY24")
implied_mid  = nr("ImpliedSharePriceBase")
```

ç„¶åŽä½¿ç”¨è¿™äº›å€¼æž„å»ºæ¼”ç¤ºæ–‡ç¨¿å†…å®¹ï¼š
```python
slide.shapes.title.text = f"Implied share price of ${implied_mid:.2f} (base case)"
```

è¯·è®°ä½åœ¨è¯»å–å·¥ä½œç°¿ä¹‹å‰é‡æ–°è®¡ç®— â€” openpyxl åªæœ‰åœ¨å·¥ä½œè¡¨å·²ç»è¢«è®¡ç®—è¿‡çš„æƒ…å†µä¸‹æ‰èƒ½çœ‹åˆ°è®¡ç®—å€¼ã€‚è¯·å…ˆè¿è¡Œ `excel-author` skill ä¸­çš„é‡ç®—è¾…åŠ©å‡½æ•°ï¼Œæˆ–é€šè¿‡çœŸå®žçš„ Excel ä¼šè¯æ‰“å¼€å¹¶ä¿å­˜ã€‚

## èžèµ„è·¯æ¼”å¹»ç¯ç‰‡ç±»åž‹æ¸…å•

å…¸åž‹çš„æŠ•è¡Œèžèµ„è·¯æ¼”æ¼”ç¤ºæ–‡ç¨¿éµå¾ªä»¥ä¸‹ç»“æž„ã€‚ä¸ä½œå¼ºåˆ¶è¦æ±‚ï¼Œä½†å¯ä½œä¸ºèµ·å§‹éª¨æž¶å‚è€ƒï¼š

1. å°é¢ / æ ‡é¢˜é¡µ
2. å…è´£å£°æ˜Ž
3. ç›®å½•
4. æƒ…å†µæ¦‚è¿°
5. å…¬å¸æ¦‚å†µï¼ˆç›®æ ‡å…¬å¸ï¼‰
6. å¸‚åœº / è¡Œä¸šèƒŒæ™¯
7. ä¼°å€¼æ‘˜è¦ï¼ˆfootball fieldï¼‰â€” æ ¸å¿ƒå¹»ç¯ç‰‡
8. å¯æ¯”äº¤æ˜“è¯¦æƒ…
9. å…ˆä¾‹äº¤æ˜“è¯¦æƒ…
10. DCF æ‘˜è¦
11. ç¤ºæ„æ€§ LBO / è´¢åŠ¡æŠ•èµ„äººæƒ…æ™¯
12. æµç¨‹è€ƒé‡
13. é™„å½•

## ä¸é€‚ç”¨æœ¬ skill çš„æƒ…å½¢

- ç”¨æˆ·æ­£åœ¨è¿›è¡Œå®žæ—¶ PowerPoint ä¼šè¯ä¸”æœ‰ Office MCP å¯ç”¨ â€” åº”ç›´æŽ¥é©±åŠ¨å…¶å®žæ—¶æ–‡æ¡£ã€‚
- éžé‡‘èžç±»å¹»ç¯ç‰‡ï¼ˆå­£åº¦å…¨å‘˜ä¼šè®®ã€å¸‚åœºè¥é”€æ¼”ç¤ºæ–‡ç¨¿ï¼‰â€” ä½¿ç”¨æ›´å…¨é¢çš„ `powerpoint` skillã€‚
- åŒ…å«å¤§é‡åŠ¨ç”»ã€åˆ‡æ¢æ•ˆæžœæˆ–æ¼”è®²è€…å¤‡æ³¨çš„æ¼”ç¤ºæ–‡ç¨¿ â€” ä½¿ç”¨æ›´å…¨é¢çš„ `powerpoint` skillã€‚

## è‡´è°¢

çº¦å®šæ”¹ç¼–è‡ª Anthropic çš„ Claude for Financial Services æ’ä»¶å¥—ä»¶ï¼Œé‡‡ç”¨ Apache-2.0 è®¸å¯è¯ã€‚åŽŸå§‹æ¥æºï¼šhttps://github.com/anthropics/financial-services/tree/main/plugins/agent-plugins/pitch-agent/skills/pptx-author
