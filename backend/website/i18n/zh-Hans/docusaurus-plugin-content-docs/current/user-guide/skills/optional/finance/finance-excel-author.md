---
title: "Excel Author"
sidebar_label: "Excel Author"
description: "ä½¿ç”¨ openpyxl æ— å¤´æž„å»ºå¯å®¡è®¡çš„ Excel å·¥ä½œç°¿â€”â€”è“/é»‘/ç»¿å•å…ƒæ ¼çº¦å®šã€å…¬å¼ä¼˜å…ˆäºŽç¡¬ç¼–ç ã€å‘½åèŒƒå›´ã€ä½™é¢æ£€æŸ¥ã€æ•æ„Ÿæ€§è¡¨æ ¼ã€‚"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Excel Author

ä½¿ç”¨ openpyxl æ— å¤´æž„å»ºå¯å®¡è®¡çš„ Excel å·¥ä½œç°¿â€”â€”è“/é»‘/ç»¿å•å…ƒæ ¼çº¦å®šã€å…¬å¼ä¼˜å…ˆäºŽç¡¬ç¼–ç ã€å‘½åèŒƒå›´ã€ä½™é¢æ£€æŸ¥ã€æ•æ„Ÿæ€§è¡¨æ ¼ã€‚é€‚ç”¨äºŽè´¢åŠ¡æ¨¡åž‹ã€å®¡è®¡è¾“å‡ºã€å¯¹è´¦ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰â€”â€”é€šè¿‡ `zed skills install official/finance/excel-author` å®‰è£… |
| è·¯å¾„ | `optional-skills/finance/excel-author` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Anthropicï¼ˆç”± Zed Team æ”¹ç¼–ï¼‰ |
| è®¸å¯è¯ | Apache-2.0 |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `excel`, `openpyxl`, `finance`, `spreadsheet`, `modeling` |
| ç›¸å…³ skill | [`pptx-author`](/user-guide/skills/optional/finance/finance-pptx-author)ã€[`dcf-model`](/user-guide/skills/optional/finance/finance-dcf-model)ã€[`comps-analysis`](/user-guide/skills/optional/finance/finance-comps-analysis)ã€[`lbo-model`](/user-guide/skills/optional/finance/finance-lbo-model)ã€[`3-statement-model`](/user-guide/skills/optional/finance/finance-3-statement-model) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# excel-author

ä½¿ç”¨ `openpyxl` åœ¨ç£ç›˜ä¸Šç”Ÿæˆ .xlsx æ–‡ä»¶ã€‚éµå¾ªä»¥ä¸‹é“¶è¡Œçº§çº¦å®šï¼Œä½¿æ¨¡åž‹å¯å®¡è®¡ã€çµæ´»ï¼Œå¹¶å¯ç”±æž„å»ºè€…ä»¥å¤–çš„äººå®¡é˜…ã€‚

æ”¹ç¼–è‡ª Anthropic åœ¨ [anthropics/financial-services](https://github.com/anthropics/financial-services) ä»“åº“ä¸­çš„ `xlsx-author` å’Œ `audit-xls` skillã€‚åŽŸç‰ˆä¸­çš„ MCP / Office-JS / Cowork ç›¸å…³åˆ†æ”¯å·²åŽ»é™¤â€”â€”æœ¬ skill å‡è®¾ä½¿ç”¨æ— å¤´ Pythonã€‚

## è¾“å‡ºçº¦å®š

- å†™å…¥ `./out/<name>.xlsx`ã€‚å¦‚æžœ `./out/` ä¸å­˜åœ¨åˆ™åˆ›å»ºã€‚
- åœ¨æœ€ç»ˆæ¶ˆæ¯ä¸­è¿”å›žç›¸å¯¹è·¯å¾„ï¼Œä»¥ä¾¿ä¸‹æ¸¸å·¥å…·èŽ·å–ã€‚
- æ¯ä¸ªæ–‡ä»¶å¯¹åº”ä¸€ä¸ªé€»è¾‘æ¨¡åž‹ã€‚é™¤éžæ˜Žç¡®è¦æ±‚ï¼Œå¦åˆ™ä¸å‘å·²æœ‰å·¥ä½œç°¿è¿½åŠ å†…å®¹ã€‚

## å®‰è£…

```bash
pip install "openpyxl>=3.0"
```

## æ ¸å¿ƒçº¦å®šï¼ˆä¸å¯æ›´æ”¹ï¼‰

### è“/é»‘/ç»¿å•å…ƒæ ¼é¢œè‰²
- **è“è‰²**ï¼ˆ`Font(color="0000FF")`ï¼‰â€”â€”äººå·¥è¾“å…¥çš„ç¡¬ç¼–ç å€¼ã€‚æ”¶å…¥é©±åŠ¨å› ç´ ã€WACC è¾“å…¥ã€ç»ˆå€¼å¢žé•¿çŽ‡ã€å¸‚åœºæ•°æ®ã€‚
- **é»‘è‰²**ï¼ˆé»˜è®¤ï¼‰â€”â€”å…¬å¼ã€‚æ¯ä¸ªæ´¾ç”Ÿå•å…ƒæ ¼å‡ä¸ºå®žæ—¶ Excel å…¬å¼ã€‚
- **ç»¿è‰²**ï¼ˆ`Font(color="006100")`ï¼‰â€”â€”é“¾æŽ¥åˆ°å¦ä¸€å¼ å·¥ä½œè¡¨æˆ–å¤–éƒ¨æ–‡ä»¶ã€‚

å®¡é˜…è€…å¯ä»¥æ‰«æå·¥ä½œè¡¨ï¼Œç«‹å³åŒºåˆ†å‡è®¾å€¼ä¸Žè®¡ç®—å€¼ã€‚

### å…¬å¼ä¼˜å…ˆäºŽç¡¬ç¼–ç 
æ¯ä¸ªè®¡ç®—å•å…ƒæ ¼å¿…é¡»æ˜¯å…¬å¼å­—ç¬¦ä¸²ï¼Œç»ä¸èƒ½æ˜¯åœ¨ Python ä¸­è®¡ç®—åŽç²˜è´´çš„æ•°å€¼ã€‚

```python
# é”™è¯¯â€”â€”æ½œåœ¨çš„éšæ€§ bug
ws["D20"] = revenue_prior_year * (1 + growth)

# æ­£ç¡®â€”â€”ç”¨æˆ·æ›´æ”¹å‡è®¾æ—¶è‡ªåŠ¨è”åŠ¨
ws["D20"] = "=D19*(1+$B$8)"
```

å”¯ä¸€å…è®¸ç¡¬ç¼–ç çš„æ•°å­—ï¼š
1. åŽŸå§‹åŽ†å²è¾“å…¥ï¼ˆå®žé™…æ”¶å…¥ã€æŠ¥å‘Š EBITDA ç­‰ï¼‰
2. ç”¨æˆ·éœ€è¦è°ƒæ•´çš„å‡è®¾é©±åŠ¨å› ç´ ï¼ˆå¢žé•¿çŽ‡ã€WACC è¾“å…¥ã€ç»ˆå€¼ gï¼‰
3. å½“å‰å¸‚åœºæ•°æ®ï¼ˆè‚¡ä»·ã€å€ºåŠ¡ä½™é¢ï¼‰â€”â€”éœ€åœ¨å•å…ƒæ ¼æ³¨é‡Šä¸­æ³¨æ˜Žæ¥æºå’Œæ—¥æœŸ

å¦‚æžœä½ å‘çŽ°è‡ªå·±åœ¨ Python ä¸­è®¡ç®—å€¼å¹¶å†™å…¥ç»“æžœï¼Œè¯·åœä¸‹æ¥ã€‚

### è·¨å·¥ä½œè¡¨å¼•ç”¨ä½¿ç”¨å‘½åèŒƒå›´
å¯¹ä»Žå¦ä¸€å¼ å·¥ä½œè¡¨ã€æ¼”ç¤ºæ–‡ç¨¿æˆ–å¤‡å¿˜å½•å¼•ç”¨çš„ä»»ä½•æ•°å€¼ï¼Œä½¿ç”¨å‘½åèŒƒå›´ã€‚

```python
from openpyxl.workbook.defined_name import DefinedName
wb.defined_names["WACC"] = DefinedName("WACC", attr_text="Inputs!$C$8")
# ç„¶åŽåœ¨å…¶ä»–åœ°æ–¹ï¼š
calc["D30"] = "=D29/WACC"
```

### ä½™é¢æ£€æŸ¥æ ‡ç­¾é¡µ
åŒ…å«ä¸€ä¸ª `Checks` æ ‡ç­¾é¡µï¼Œæ±‡æ€»æ‰€æœ‰å†…å®¹å¹¶æ˜¾ç¤º TRUE/FALSEï¼š
- èµ„äº§è´Ÿå€ºè¡¨å¹³è¡¡ï¼ˆèµ„äº§ = è´Ÿå€º + æƒç›Šï¼‰
- çŽ°é‡‘æµä¸Žèµ„äº§è´Ÿå€ºè¡¨ä¸Šçš„æœŸé—´çŽ°é‡‘å˜åŠ¨ä¸€è‡´
- åˆ†éƒ¨åŠ æ€»ä¸Žåˆå¹¶æ€»è®¡ä¸€è‡´
- è®¡ç®—èŒƒå›´å†…æ— æ¸¸ç¦»ç¡¬ç¼–ç 

ç¤ºä¾‹ï¼š
```python
checks = wb.create_sheet("Checks")
checks["A2"] = "BS balances"
checks["B2"] = "=IS!D20-IS!D21-IS!D22"
checks["C2"] = "=ABS(B2)<0.01"  # TRUE/FALSE
```

### æ¯ä¸ªç¡¬ç¼–ç è¾“å…¥å‡æ·»åŠ å•å…ƒæ ¼æ³¨é‡Š
åœ¨åˆ›å»ºå•å…ƒæ ¼æ—¶åŒæ­¥æ·»åŠ æ³¨é‡Šï¼Œä¸è¦äº‹åŽè¡¥å……ã€‚

```python
from openpyxl.comments import Comment
ws["C2"] = 1_250_000_000
ws["C2"].font = Font(color="0000FF")
ws["C2"].comment = Comment("Source: 10-K FY2024, p.47, revenue line", "analyst")
```

æ ¼å¼ï¼š`Source: [ç³»ç»Ÿ/æ–‡æ¡£], [æ—¥æœŸ], [å‚è€ƒ], [URLï¼ˆå¦‚é€‚ç”¨ï¼‰]`ã€‚

ç»ä¸æŽ¨è¿Ÿæ ‡æ³¨æ¥æºã€‚ç»ä¸å†™ `TODO: add source`ã€‚

## éª¨æž¶ï¼šå…¸åž‹è´¢åŠ¡æ¨¡åž‹

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.comments import Comment
from openpyxl.utils import get_column_letter
from pathlib import Path

BLUE = Font(color="0000FF")
BLACK = Font(color="000000")
GREEN = Font(color="006100")
BOLD = Font(bold=True)
HEADER_FILL = PatternFill("solid", fgColor="1F4E79")
HEADER_FONT = Font(color="FFFFFF", bold=True)

wb = Workbook()

# --- Inputs æ ‡ç­¾é¡µ ---
inp = wb.active
inp.title = "Inputs"
inp["A1"] = "MARKET DATA & KEY INPUTS"
inp["A1"].font = HEADER_FONT
inp["A1"].fill = HEADER_FILL
inp.merge_cells("A1:C1")

inp["B3"] = "Revenue FY2024"
inp["C3"] = 1_250_000_000
inp["C3"].font = BLUE
inp["C3"].comment = Comment("Source: 10-K FY2024 p.47", "model")

inp["B4"] = "Growth Rate"
inp["C4"] = 0.12
inp["C4"].font = BLUE

# --- è®¡ç®—æ ‡ç­¾é¡µ ---
calc = wb.create_sheet("DCF")
calc["B2"] = "Projected Revenue"
calc["C2"] = "=Inputs!C3*(1+Inputs!C4)"   # å…¬å¼ï¼Œé»‘è‰²

# --- æ£€æŸ¥æ ‡ç­¾é¡µ ---
chk = wb.create_sheet("Checks")
chk["A2"] = "BS balances"
chk["B2"] = "=ABS(BS!D20-BS!D21-BS!D22)<0.01"

Path("./out").mkdir(exist_ok=True)
wb.save("./out/model.xlsx")
```

## å¸¦åˆå¹¶å•å…ƒæ ¼çš„èŠ‚æ ‡é¢˜

openpyxl ç‰¹æ€§ï¼šåˆå¹¶æ—¶ï¼Œåœ¨å·¦ä¸Šè§’å•å…ƒæ ¼è®¾ç½®å€¼ï¼Œå¹¶å•ç‹¬å¯¹æ•´ä¸ªèŒƒå›´è®¾ç½®æ ·å¼ã€‚

```python
ws["A7"] = "CASH FLOW PROJECTION"
ws["A7"].font = HEADER_FONT
ws.merge_cells("A7:H7")
for col in range(1, 9):  # A..H
    ws.cell(row=7, column=col).fill = HEADER_FILL
```

## æ•æ„Ÿæ€§è¡¨æ ¼

ç”¨å¾ªçŽ¯æž„å»ºï¼Œä¸è¦å¯¹æ¯ä¸ªå•å…ƒæ ¼ç¡¬ç¼–ç å…¬å¼ã€‚è§„åˆ™ï¼š

- **å¥‡æ•°è¡Œ/åˆ—æ•°**ï¼ˆ5Ã—5 æˆ– 7Ã—7ï¼‰â€”â€”ä¿è¯å­˜åœ¨çœŸæ­£çš„ä¸­å¿ƒå•å…ƒæ ¼ã€‚
- **ä¸­å¿ƒå•å…ƒæ ¼ = åŸºå‡†æƒ…æ™¯ã€‚** ä¸­é—´è¡Œ/åˆ—çš„æ ‡é¢˜å¿…é¡»ç­‰äºŽæ¨¡åž‹å®žé™…çš„ WACC å’Œç»ˆå€¼ gï¼Œä½¿ä¸­å¿ƒè¾“å‡ºç­‰äºŽåŸºå‡†æƒ…æ™¯éšå«è‚¡ä»·ã€‚è¿™æ˜¯åˆç†æ€§æ£€éªŒã€‚
- **é«˜äº®ä¸­å¿ƒå•å…ƒæ ¼**ï¼Œä½¿ç”¨ä¸­è“è‰²å¡«å……ï¼ˆ`"BDD7EE"`ï¼‰å¹¶åŠ ç²—ã€‚
- æ¯ä¸ªå•å…ƒæ ¼å‡å¡«å…¥å®Œæ•´çš„é‡æ–°è®¡ç®—å…¬å¼â€”â€”ç»ä¸ä½¿ç”¨è¿‘ä¼¼å€¼ã€‚

```python
# 5x5 WACCï¼ˆè¡Œï¼‰x ç»ˆå€¼å¢žé•¿çŽ‡ï¼ˆåˆ—ï¼‰æ•æ„Ÿæ€§
wacc_axis = [0.08, 0.085, 0.09, 0.095, 0.10]        # ä¸­é—´è¡Œ = åŸºå‡† 9.0%
term_axis = [0.02, 0.025, 0.03, 0.035, 0.04]        # ä¸­é—´åˆ— = åŸºå‡† 3.0%

start_row = 40
ws.cell(row=start_row, column=1).value = "Implied Share Price ($)"
ws.cell(row=start_row, column=1).font = BOLD

for j, g in enumerate(term_axis):
    ws.cell(row=start_row+1, column=2+j).value = g
    ws.cell(row=start_row+1, column=2+j).font = BLUE

for i, w in enumerate(wacc_axis):
    r = start_row + 2 + i
    ws.cell(row=r, column=1).value = w
    ws.cell(row=r, column=1).font = BLUE
    for j, g in enumerate(term_axis):
        c = 2 + j
        # å®Œæ•´ DCF é‡æ–°è®¡ç®—å…¬å¼ï¼ˆæ­¤å¤„ä¸ºç®€åŒ–ç¤ºæ„ï¼‰ã€‚
        # åœ¨å®žé™…æ¨¡åž‹ä¸­ï¼Œæ­¤å¤„å¼•ç”¨å®Œæ•´çš„é¢„æµ‹åŒºå—ã€‚
        ws.cell(row=r, column=c).value = (
            f"=SUMPRODUCT(FCF_range,1/(1+{w})^year_offset) + "
            f"FCF_terminal*(1+{g})/({w}-{g})/(1+{w})^terminal_year"
        )

# é«˜äº®ä¸­å¿ƒå•å…ƒæ ¼ï¼ˆåŸºå‡†æƒ…æ™¯ï¼‰
center = ws.cell(row=start_row+2+len(wacc_axis)//2,
                 column=2+len(term_axis)//2)
center.fill = PatternFill("solid", fgColor="BDD7EE")
center.font = BOLD
```

## äº¤ä»˜å‰é‡æ–°è®¡ç®—

openpyxl å†™å…¥å…¬å¼å­—ç¬¦ä¸²ä½†ä¸è®¡ç®—ç»“æžœã€‚Excel æ‰“å¼€æ—¶ä¼šé‡æ–°è®¡ç®—ï¼Œä½†ä¸‹æ¸¸æ¶ˆè´¹è€…ï¼ˆè‡ªåŠ¨æ£€æŸ¥è„šæœ¬ã€CIï¼‰éœ€è¦å·²è®¡ç®—çš„å€¼ã€‚

äº¤ä»˜å‰è¿è¡Œ LibreOffice æˆ–ä¸“ç”¨é‡æ–°è®¡ç®—æ­¥éª¤ï¼š

```bash
# LibreOffice æ— å¤´é‡æ–°è®¡ç®—
libreoffice --headless --calc --convert-to xlsx ./out/model.xlsx --outdir ./out/
```

æˆ–ä½¿ç”¨ Python é‡æ–°è®¡ç®—è¾…åŠ©å·¥å…·ï¼ˆå‚è§æœ¬ skill ä¸­çš„ `scripts/recalc.py`ï¼‰ã€‚

## æ¨¡åž‹å¸ƒå±€è§„åˆ’

åœ¨ç¼–å†™ä»»ä½•å…¬å¼ä¹‹å‰ï¼š
1. å®šä¹‰æ‰€æœ‰èŠ‚çš„è¡Œä½ç½®
2. å†™å…¥æ‰€æœ‰æ ‡é¢˜å’Œæ ‡ç­¾
3. å†™å…¥æ‰€æœ‰èŠ‚åˆ†éš”ç¬¦å’Œç©ºè¡Œ
4. ç„¶åŽä½¿ç”¨é”å®šçš„è¡Œä½ç½®ç¼–å†™å…¬å¼

è¿™å¯ä»¥é¿å…åœ¨å…¬å¼å†™å…¥åŽæ’å…¥æ ‡é¢˜è¡Œå¯¼è‡´æ‰€æœ‰ä¸‹æ¸¸å¼•ç”¨åç§»çš„çº§è”å…¬å¼æŸåé—®é¢˜ã€‚

## ä¸Žç”¨æˆ·é€æ­¥éªŒè¯

å¯¹äºŽå¤§åž‹æ¨¡åž‹ï¼ˆDCFã€ä¸‰è¡¨æ¨¡åž‹ã€LBOï¼‰ï¼Œåœ¨ç»§ç»­ä¹‹å‰åœä¸‹æ¥å‘ç”¨æˆ·å±•ç¤ºä¸­é—´äº§ç‰©ã€‚åœ¨æž„å»ºä¸‹æ¸¸æ•æ„Ÿæ€§è¡¨æ ¼ä¹‹å‰å‘çŽ°é”™è¯¯çš„åˆ©æ¶¦çŽ‡å‡è®¾ï¼Œå¯ä»¥èŠ‚çœä¸€å°æ—¶ã€‚

æ£€æŸ¥ç‚¹æ¨¡å¼ï¼š
- Inputs åŒºå—å®ŒæˆåŽâ†’å±•ç¤ºåŽŸå§‹è¾“å…¥ï¼Œç¡®è®¤åŽå†è¿›è¡Œé¢„æµ‹
- æ”¶å…¥é¢„æµ‹å®ŒæˆåŽâ†’ç¡®è®¤é¡¶çº¿æ”¶å…¥å’Œå¢žé•¿çŽ‡
- FCF æž„å»ºå®ŒæˆåŽâ†’ç¡®è®¤å®Œæ•´çš„è®¡åˆ’è¡¨
- WACC å®ŒæˆåŽâ†’ç¡®è®¤è¾“å…¥
- ä¼°å€¼å®ŒæˆåŽâ†’ç¡®è®¤æƒç›Šæ¡¥æŽ¥
- ç„¶åŽæž„å»ºæ•æ„Ÿæ€§è¡¨æ ¼

## ä¸é€‚ç”¨åœºæ™¯

- ç”¨æˆ·åœ¨å®žæ—¶ Excel ä¼šè¯ä¸­ä¸”æœ‰ Office MCP å¯ç”¨â€”â€”ç›´æŽ¥æ“ä½œå…¶å®žæ—¶å·¥ä½œç°¿ã€‚
- çº¯è¡¨æ ¼æ•°æ®å¯¼å‡ºä¸”æ— å…¬å¼â€”â€”ä½¿ç”¨ `csv` æˆ– `pandas.to_excel` æ›´ç®€å•ã€‚
- å…·æœ‰å¤§é‡äº¤äº’æ€§çš„ä»ªè¡¨æ¿/å›¾è¡¨â€”â€”ä½¿ç”¨ä¸“ä¸š BI å·¥å…·ã€‚

## è‡´è°¢

è“/é»‘/ç»¿çº¦å®šã€å…¬å¼ä¼˜å…ˆäºŽç¡¬ç¼–ç ã€å‘½åèŒƒå›´ã€æ•æ„Ÿæ€§è§„åˆ™ç­‰çº¦å®šï¼Œæ”¹ç¼–è‡ª Anthropic çš„ Claude for Financial Services æ’ä»¶å¥—ä»¶ï¼Œé‡‡ç”¨ Apache-2.0 è®¸å¯è¯ã€‚åŽŸå§‹åœ°å€ï¼šhttps://github.com/anthropics/financial-services/tree/main/plugins/vertical-plugins/financial-analysis/skills/xlsx-author