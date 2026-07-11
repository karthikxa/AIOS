---
title: "Ocr And Documents â€” ä»Ž PDF/æ‰«æä»¶ä¸­æå–æ–‡æœ¬ï¼ˆpymupdfã€marker-pdfï¼‰"
sidebar_label: "Ocr And Documents"
description: "ä»Ž PDF/æ‰«æä»¶ä¸­æå–æ–‡æœ¬ï¼ˆpymupdfã€marker-pdfï¼‰"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Ocr And Documents

ä»Ž PDF/æ‰«æä»¶ä¸­æå–æ–‡æœ¬ï¼ˆpymupdfã€marker-pdfï¼‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/productivity/ocr-and-documents` |
| ç‰ˆæœ¬ | `2.3.0` |
| ä½œè€… | Zed Agent |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `PDF`, `Documents`, `Research`, `Arxiv`, `Text-Extraction`, `OCR` |
| ç›¸å…³ skill | [`powerpoint`](/user-guide/skills/bundled/productivity/productivity-powerpoint) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# PDF ä¸Žæ–‡æ¡£æå–

å¯¹äºŽ DOCXï¼šä½¿ç”¨ `python-docx`ï¼ˆè§£æžå®žé™…æ–‡æ¡£ç»“æž„ï¼Œè¿œä¼˜äºŽ OCRï¼‰ã€‚
å¯¹äºŽ PPTXï¼šå‚è§ `powerpoint` skillï¼ˆä½¿ç”¨ `python-pptx`ï¼Œå®Œæ•´æ”¯æŒå¹»ç¯ç‰‡/å¤‡æ³¨ï¼‰ã€‚
æœ¬ skill æ¶µç›– **PDF åŠæ‰«ææ–‡æ¡£**ã€‚

## ç¬¬ä¸€æ­¥ï¼šæ˜¯å¦æœ‰è¿œç¨‹ URLï¼Ÿ

å¦‚æžœæ–‡æ¡£æœ‰ URLï¼Œ**å§‹ç»ˆä¼˜å…ˆå°è¯• `web_extract`**ï¼š

```
web_extract(urls=["https://arxiv.org/pdf/2402.03300"])
web_extract(urls=["https://example.com/report.pdf"])
```

è¿™é€šè¿‡ Firecrawl å®žçŽ° PDF è½¬ Markdownï¼Œæ— éœ€æœ¬åœ°ä¾èµ–ã€‚

ä»…åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨æœ¬åœ°æå–ï¼šæ–‡ä»¶åœ¨æœ¬åœ°ã€`web_extract` å¤±è´¥ï¼Œæˆ–éœ€è¦æ‰¹é‡å¤„ç†ã€‚

## ç¬¬äºŒæ­¥ï¼šé€‰æ‹©æœ¬åœ°æå–å™¨

| åŠŸèƒ½ | pymupdfï¼ˆçº¦ 25MBï¼‰ | marker-pdfï¼ˆçº¦ 3-5GBï¼‰ |
|---------|-----------------|---------------------|
| **åŸºäºŽæ–‡æœ¬çš„ PDF** | âœ… | âœ… |
| **æ‰«æ PDFï¼ˆOCRï¼‰** | âŒ | âœ…ï¼ˆæ”¯æŒ 90+ ç§è¯­è¨€ï¼‰ |
| **è¡¨æ ¼** | âœ…ï¼ˆåŸºç¡€ï¼‰ | âœ…ï¼ˆé«˜ç²¾åº¦ï¼‰ |
| **å…¬å¼ / LaTeX** | âŒ | âœ… |
| **ä»£ç å—** | âŒ | âœ… |
| **è¡¨å•** | âŒ | âœ… |
| **é¡µçœ‰/é¡µè„šåŽ»é™¤** | âŒ | âœ… |
| **é˜…è¯»é¡ºåºæ£€æµ‹** | âŒ | âœ… |
| **å›¾ç‰‡æå–** | âœ…ï¼ˆåµŒå…¥å›¾ç‰‡ï¼‰ | âœ…ï¼ˆå«ä¸Šä¸‹æ–‡ï¼‰ |
| **å›¾ç‰‡ â†’ æ–‡æœ¬ï¼ˆOCRï¼‰** | âŒ | âœ… |
| **EPUB** | âœ… | âœ… |
| **Markdown è¾“å‡º** | âœ…ï¼ˆé€šè¿‡ pymupdf4llmï¼‰ | âœ…ï¼ˆåŽŸç”Ÿï¼Œè´¨é‡æ›´é«˜ï¼‰ |
| **å®‰è£…ä½“ç§¯** | çº¦ 25MB | çº¦ 3-5GBï¼ˆPyTorch + æ¨¡åž‹ï¼‰ |
| **é€Ÿåº¦** | å³æ—¶ | çº¦ 1-14 ç§’/é¡µï¼ˆCPUï¼‰ï¼Œçº¦ 0.2 ç§’/é¡µï¼ˆGPUï¼‰ |

**å†³ç­–åŽŸåˆ™**ï¼šé™¤éžéœ€è¦ OCRã€å…¬å¼ã€è¡¨å•æˆ–å¤æ‚ç‰ˆé¢åˆ†æžï¼Œå¦åˆ™ä½¿ç”¨ pymupdfã€‚

å¦‚æžœç”¨æˆ·éœ€è¦ marker-pdf çš„åŠŸèƒ½ä½†ç³»ç»Ÿç£ç›˜ç©ºé—´ä¸è¶³çº¦ 5GBï¼š
> "æ­¤æ–‡æ¡£éœ€è¦ OCR/é«˜çº§æå–ï¼ˆmarker-pdfï¼‰ï¼Œè¿™éœ€è¦çº¦ 5GB ç”¨äºŽ PyTorch å’Œæ¨¡åž‹ã€‚æ‚¨çš„ç³»ç»Ÿå‰©ä½™ [X]GB å¯ç”¨ç©ºé—´ã€‚å¯é€‰æ–¹æ¡ˆï¼šé‡Šæ”¾ç£ç›˜ç©ºé—´ã€æä¾› URL ä»¥ä½¿ç”¨ web_extractï¼Œæˆ–æˆ‘å¯ä»¥å°è¯• pymupdfâ€”â€”å®ƒé€‚ç”¨äºŽåŸºäºŽæ–‡æœ¬çš„ PDFï¼Œä½†ä¸æ”¯æŒæ‰«ææ–‡æ¡£æˆ–å…¬å¼ã€‚"

---

## pymupdfï¼ˆè½»é‡çº§ï¼‰

```bash
pip install pymupdf pymupdf4llm
```

**é€šè¿‡è¾…åŠ©è„šæœ¬**ï¼š
```bash
python scripts/extract_pymupdf.py document.pdf              # çº¯æ–‡æœ¬
python scripts/extract_pymupdf.py document.pdf --markdown    # Markdown
python scripts/extract_pymupdf.py document.pdf --tables      # è¡¨æ ¼
python scripts/extract_pymupdf.py document.pdf --images out/ # æå–å›¾ç‰‡
python scripts/extract_pymupdf.py document.pdf --metadata    # æ ‡é¢˜ã€ä½œè€…ã€é¡µæ•°
python scripts/extract_pymupdf.py document.pdf --pages 0-4   # æŒ‡å®šé¡µé¢
```

**å†…è”æ–¹å¼**ï¼š
```bash
python3 -c "
import pymupdf
doc = pymupdf.open('document.pdf')
for page in doc:
    print(page.get_text())
"
```

---

## marker-pdfï¼ˆé«˜è´¨é‡ OCRï¼‰

```bash
# å…ˆæ£€æŸ¥ç£ç›˜ç©ºé—´
python scripts/extract_marker.py --check

pip install marker-pdf
```

**é€šè¿‡è¾…åŠ©è„šæœ¬**ï¼š
```bash
python scripts/extract_marker.py document.pdf                # Markdown
python scripts/extract_marker.py document.pdf --json         # å«å…ƒæ•°æ®çš„ JSON
python scripts/extract_marker.py document.pdf --output_dir out/  # ä¿å­˜å›¾ç‰‡
python scripts/extract_marker.py scanned.pdf                 # æ‰«æ PDFï¼ˆOCRï¼‰
python scripts/extract_marker.py document.pdf --use_llm      # LLM å¢žå¼ºç²¾åº¦
```

**CLI**ï¼ˆéš marker-pdf ä¸€åŒå®‰è£…ï¼‰ï¼š
```bash
marker_single document.pdf --output_dir ./output
marker /path/to/folder --workers 4    # æ‰¹é‡å¤„ç†
```

---

## Arxiv è®ºæ–‡

```
# ä»…æ‘˜è¦ï¼ˆå¿«é€Ÿï¼‰
web_extract(urls=["https://arxiv.org/abs/2402.03300"])

# å®Œæ•´è®ºæ–‡
web_extract(urls=["https://arxiv.org/pdf/2402.03300"])

# æœç´¢
web_search(query="arxiv GRPO reinforcement learning 2026")
```

## æ‹†åˆ†ã€åˆå¹¶ä¸Žæœç´¢

pymupdf åŽŸç”Ÿæ”¯æŒè¿™äº›æ“ä½œâ€”â€”ä½¿ç”¨ `execute_code` æˆ–å†…è” Pythonï¼š

```python
# æ‹†åˆ†ï¼šå°†ç¬¬ 1-5 é¡µæå–ä¸ºæ–° PDF
import pymupdf
doc = pymupdf.open("report.pdf")
new = pymupdf.open()
for i in range(5):
    new.insert_pdf(doc, from_page=i, to_page=i)
new.save("pages_1-5.pdf")
```

```python
# åˆå¹¶å¤šä¸ª PDF
import pymupdf
result = pymupdf.open()
for path in ["a.pdf", "b.pdf", "c.pdf"]:
    result.insert_pdf(pymupdf.open(path))
result.save("merged.pdf")
```

```python
# åœ¨æ‰€æœ‰é¡µé¢ä¸­æœç´¢æ–‡æœ¬
import pymupdf
doc = pymupdf.open("report.pdf")
for i, page in enumerate(doc):
    results = page.search_for("revenue")
    if results:
        print(f"Page {i+1}: {len(results)} match(es)")
        print(page.get_text("text"))
```

æ— éœ€é¢å¤–ä¾èµ–â€”â€”pymupdf åœ¨ä¸€ä¸ªåŒ…å†…æ¶µç›–æ‹†åˆ†ã€åˆå¹¶ã€æœç´¢å’Œæ–‡æœ¬æå–ã€‚

---

## æ³¨æ„äº‹é¡¹

- `web_extract` å§‹ç»ˆæ˜¯ URL çš„é¦–é€‰æ–¹æ¡ˆ
- pymupdf æ˜¯å®‰å…¨çš„é»˜è®¤é€‰æ‹©â€”â€”å³æ—¶å¯ç”¨ï¼Œæ— éœ€æ¨¡åž‹ï¼Œé€‚ç”¨äºŽæ‰€æœ‰çŽ¯å¢ƒ
- marker-pdf ç”¨äºŽ OCRã€æ‰«ææ–‡æ¡£ã€å…¬å¼ã€å¤æ‚ç‰ˆé¢â€”â€”ä»…åœ¨éœ€è¦æ—¶å®‰è£…
- ä¸¤ä¸ªè¾…åŠ©è„šæœ¬å‡æ”¯æŒ `--help` æŸ¥çœ‹å®Œæ•´ç”¨æ³•
- marker-pdf é¦–æ¬¡ä½¿ç”¨æ—¶ä¼šå°†çº¦ 2.5GB çš„æ¨¡åž‹ä¸‹è½½è‡³ `~/.cache/huggingface/`
- å¯¹äºŽ Word æ–‡æ¡£ï¼š`pip install python-docx`ï¼ˆä¼˜äºŽ OCRâ€”â€”è§£æžå®žé™…æ–‡æ¡£ç»“æž„ï¼‰
- å¯¹äºŽ PowerPointï¼šå‚è§ `powerpoint` skillï¼ˆä½¿ç”¨ python-pptxï¼‰
