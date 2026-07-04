---
title: "Huggingface Tokenizers â€” ä¸ºç ”ç©¶å’Œç”Ÿäº§ä¼˜åŒ–çš„å¿«é€Ÿ tokenizer"
sidebar_label: "Huggingface Tokenizers"
description: "ä¸ºç ”ç©¶å’Œç”Ÿäº§ä¼˜åŒ–çš„å¿«é€Ÿ tokenizer"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Huggingface Tokenizers

ä¸ºç ”ç©¶å’Œç”Ÿäº§ä¼˜åŒ–çš„å¿«é€Ÿ tokenizerï¼ˆåˆ†è¯å™¨ï¼‰ã€‚åŸºäºŽ Rust çš„å®žçŽ°å¯åœ¨ &lt;20 ç§’å†…å¯¹ 1GB æ–‡æœ¬å®Œæˆåˆ†è¯ã€‚æ”¯æŒ BPEã€WordPiece å’Œ Unigram ç®—æ³•ã€‚å¯è®­ç»ƒè‡ªå®šä¹‰è¯è¡¨ã€è¿½è¸ªå¯¹é½å…³ç³»ã€å¤„ç† paddingï¼ˆå¡«å……ï¼‰/truncationï¼ˆæˆªæ–­ï¼‰ã€‚ä¸Ž transformers æ— ç¼é›†æˆã€‚å½“éœ€è¦é«˜æ€§èƒ½åˆ†è¯æˆ–è®­ç»ƒè‡ªå®šä¹‰ tokenizer æ—¶ä½¿ç”¨ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/huggingface-tokenizers` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/huggingface-tokenizers` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `tokenizers`, `transformers`, `datasets` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Tokenization`, `HuggingFace`, `BPE`, `WordPiece`, `Unigram`, `Fast Tokenization`, `Rust`, `Custom Tokenizer`, `Alignment Tracking`, `Production` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# HuggingFace Tokenizers â€” é«˜æ€§èƒ½ NLP åˆ†è¯

å…·å¤‡ Rust æ€§èƒ½ä¸Ž Python æ˜“ç”¨æ€§çš„å¿«é€Ÿã€ç”Ÿäº§å°±ç»ª tokenizerã€‚

## ä½•æ—¶ä½¿ç”¨ HuggingFace Tokenizers

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ HuggingFace Tokenizersï¼š**
- éœ€è¦æžå¿«çš„åˆ†è¯é€Ÿåº¦ï¼ˆæ¯ GB æ–‡æœ¬ &lt;20 ç§’ï¼‰
- ä»Žå¤´è®­ç»ƒè‡ªå®šä¹‰ tokenizer
- éœ€è¦å¯¹é½è¿½è¸ªï¼ˆtoken â†’ åŽŸå§‹æ–‡æœ¬ä½ç½®ï¼‰
- æž„å»ºç”Ÿäº§çº§ NLP æµæ°´çº¿
- éœ€è¦é«˜æ•ˆåœ°å¯¹å¤§åž‹è¯­æ–™åº“è¿›è¡Œåˆ†è¯

**æ€§èƒ½**ï¼š
- **é€Ÿåº¦**ï¼šCPU ä¸Šå¯¹ 1GB æ–‡æœ¬åˆ†è¯ &lt;20 ç§’
- **å®žçŽ°**ï¼šRust æ ¸å¿ƒï¼Œæä¾› Python/Node.js ç»‘å®š
- **æ•ˆçŽ‡**ï¼šæ¯”çº¯ Python å®žçŽ°å¿« 10â€“100 å€

**æ”¹ç”¨å…¶ä»–æ–¹æ¡ˆçš„æƒ…å†µ**ï¼š
- **SentencePiece**ï¼šè¯­è¨€æ— å…³ï¼Œè¢« T5/ALBERT ä½¿ç”¨
- **tiktoken**ï¼šOpenAI ç”¨äºŽ GPT æ¨¡åž‹çš„ BPE tokenizer
- **transformers AutoTokenizer**ï¼šä»…åŠ è½½é¢„è®­ç»ƒæ¨¡åž‹æ—¶ä½¿ç”¨ï¼ˆå†…éƒ¨ä½¿ç”¨æœ¬åº“ï¼‰

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# å®‰è£… tokenizers
pip install tokenizers

# ä¸Ž transformers é›†æˆ
pip install tokenizers transformers
```

### åŠ è½½é¢„è®­ç»ƒ tokenizer

```python
from tokenizers import Tokenizer

# ä»Ž HuggingFace Hub åŠ è½½
tokenizer = Tokenizer.from_pretrained("bert-base-uncased")

# å¯¹æ–‡æœ¬ç¼–ç 
output = tokenizer.encode("Hello, how are you?")
print(output.tokens)  # ['hello', ',', 'how', 'are', 'you', '?']
print(output.ids)     # [7592, 1010, 2129, 2024, 2017, 1029]

# è§£ç è¿˜åŽŸ
text = tokenizer.decode(output.ids)
print(text)  # "hello, how are you?"
```

### è®­ç»ƒè‡ªå®šä¹‰ BPE tokenizer

```python
from tokenizers import Tokenizer
from tokenizers.models import BPE
from tokenizers.trainers import BpeTrainer
from tokenizers.pre_tokenizers import Whitespace

# ä½¿ç”¨ BPE æ¨¡åž‹åˆå§‹åŒ– tokenizer
tokenizer = Tokenizer(BPE(unk_token="[UNK]"))
tokenizer.pre_tokenizer = Whitespace()

# é…ç½®è®­ç»ƒå™¨
trainer = BpeTrainer(
    vocab_size=30000,
    special_tokens=["[UNK]", "[CLS]", "[SEP]", "[PAD]", "[MASK]"],
    min_frequency=2
)

# åœ¨æ–‡ä»¶ä¸Šè®­ç»ƒ
files = ["train.txt", "validation.txt"]
tokenizer.train(files, trainer)

# ä¿å­˜
tokenizer.save("my-tokenizer.json")
```

**è®­ç»ƒæ—¶é—´**ï¼š100MB è¯­æ–™çº¦ 1â€“2 åˆ†é’Ÿï¼Œ1GB è¯­æ–™çº¦ 10â€“20 åˆ†é’Ÿ

### æ‰¹é‡ç¼–ç ä¸Ž padding

```python
# å¯ç”¨ padding
tokenizer.enable_padding(pad_id=3, pad_token="[PAD]")

# æ‰¹é‡ç¼–ç 
texts = ["Hello world", "This is a longer sentence"]
encodings = tokenizer.encode_batch(texts)

for encoding in encodings:
    print(encoding.ids)
# [101, 7592, 2088, 102, 3, 3, 3]
# [101, 2023, 2003, 1037, 2936, 6251, 102]
```

## åˆ†è¯ç®—æ³•

### BPEï¼ˆå­—èŠ‚å¯¹ç¼–ç ï¼‰

**å·¥ä½œåŽŸç†**ï¼š
1. ä»Žå­—ç¬¦çº§è¯è¡¨å¼€å§‹
2. æ‰¾å‡ºæœ€é¢‘ç¹çš„å­—ç¬¦å¯¹
3. åˆå¹¶ä¸ºæ–° tokenï¼ŒåŠ å…¥è¯è¡¨
4. é‡å¤ç›´åˆ°è¾¾åˆ°è¯è¡¨å¤§å°

**ä½¿ç”¨è€…**ï¼šGPT-2ã€GPT-3ã€RoBERTaã€BARTã€DeBERTa

```python
from tokenizers import Tokenizer
from tokenizers.models import BPE
from tokenizers.trainers import BpeTrainer
from tokenizers.pre_tokenizers import ByteLevel

tokenizer = Tokenizer(BPE(unk_token="<|endoftext|>"))
tokenizer.pre_tokenizer = ByteLevel()

trainer = BpeTrainer(
    vocab_size=50257,
    special_tokens=["<|endoftext|>"],
    min_frequency=2
)

tokenizer.train(files=["data.txt"], trainer=trainer)
```

**ä¼˜ç‚¹**ï¼š
- èƒ½è¾ƒå¥½åœ°å¤„ç† OOV è¯ï¼ˆæ‹†åˆ†ä¸ºå­è¯ï¼‰
- è¯è¡¨å¤§å°çµæ´»
- é€‚åˆå½¢æ€ä¸°å¯Œçš„è¯­è¨€

**æƒè¡¡**ï¼š
- åˆ†è¯ç»“æžœä¾èµ–åˆå¹¶é¡ºåº
- å¯èƒ½æ„å¤–æ‹†åˆ†å¸¸è§è¯

### WordPiece

**å·¥ä½œåŽŸç†**ï¼š
1. ä»Žå­—ç¬¦è¯è¡¨å¼€å§‹
2. å¯¹åˆå¹¶å¯¹æ‰“åˆ†ï¼š`frequency(pair) / (frequency(first) Ã— frequency(second))`
3. åˆå¹¶å¾—åˆ†æœ€é«˜çš„å¯¹
4. é‡å¤ç›´åˆ°è¾¾åˆ°è¯è¡¨å¤§å°

**ä½¿ç”¨è€…**ï¼šBERTã€DistilBERTã€MobileBERT

```python
from tokenizers import Tokenizer
from tokenizers.models import WordPiece
from tokenizers.trainers import WordPieceTrainer
from tokenizers.pre_tokenizers import Whitespace
from tokenizers.normalizers import BertNormalizer

tokenizer = Tokenizer(WordPiece(unk_token="[UNK]"))
tokenizer.normalizer = BertNormalizer(lowercase=True)
tokenizer.pre_tokenizer = Whitespace()

trainer = WordPieceTrainer(
    vocab_size=30522,
    special_tokens=["[UNK]", "[CLS]", "[SEP]", "[PAD]", "[MASK]"],
    continuing_subword_prefix="##"
)

tokenizer.train(files=["corpus.txt"], trainer=trainer)
```

**ä¼˜ç‚¹**ï¼š
- ä¼˜å…ˆè¿›è¡Œæœ‰æ„ä¹‰çš„åˆå¹¶ï¼ˆé«˜åˆ† = è¯­ä¹‰ç›¸å…³ï¼‰
- åœ¨ BERT ä¸­å–å¾—äº†æœ€ä¼˜ç»“æžœ

**æƒè¡¡**ï¼š
- è‹¥æ— å­è¯åŒ¹é…ï¼ŒæœªçŸ¥è¯å˜ä¸º `[UNK]`
- ä¿å­˜è¯è¡¨è€Œéžåˆå¹¶è§„åˆ™ï¼ˆæ–‡ä»¶è¾ƒå¤§ï¼‰

### Unigram

**å·¥ä½œåŽŸç†**ï¼š
1. ä»Žå¤§è¯è¡¨ï¼ˆæ‰€æœ‰å­ä¸²ï¼‰å¼€å§‹
2. ç”¨å½“å‰è¯è¡¨è®¡ç®—è¯­æ–™æŸå¤±
3. ç§»é™¤å¯¹æŸå¤±å½±å“æœ€å°çš„ token
4. é‡å¤ç›´åˆ°è¾¾åˆ°è¯è¡¨å¤§å°

**ä½¿ç”¨è€…**ï¼šALBERTã€T5ã€mBARTã€XLNetï¼ˆé€šè¿‡ SentencePieceï¼‰

```python
from tokenizers import Tokenizer
from tokenizers.models import Unigram
from tokenizers.trainers import UnigramTrainer

tokenizer = Tokenizer(Unigram())

trainer = UnigramTrainer(
    vocab_size=8000,
    special_tokens=["<unk>", "<s>", "</s>"],
    unk_token="<unk>"
)

tokenizer.train(files=["data.txt"], trainer=trainer)
```

**ä¼˜ç‚¹**ï¼š
- æ¦‚çŽ‡åŒ–ï¼ˆæ‰¾åˆ°æœ€å¯èƒ½çš„åˆ†è¯æ–¹å¼ï¼‰
- é€‚åˆæ— è¯è¾¹ç•Œçš„è¯­è¨€
- èƒ½å¤„ç†å¤šæ ·çš„è¯­è¨€å­¦ä¸Šä¸‹æ–‡

**æƒè¡¡**ï¼š
- è®­ç»ƒè®¡ç®—å¼€é”€è¾ƒå¤§
- éœ€è¦è°ƒæ•´çš„è¶…å‚æ•°æ›´å¤š

## åˆ†è¯æµæ°´çº¿

å®Œæ•´æµæ°´çº¿ï¼š**å½’ä¸€åŒ– â†’ é¢„åˆ†è¯ â†’ æ¨¡åž‹ â†’ åŽå¤„ç†**

### å½’ä¸€åŒ–ï¼ˆNormalizationï¼‰

æ¸…æ´—å¹¶æ ‡å‡†åŒ–æ–‡æœ¬ï¼š

```python
from tokenizers.normalizers import NFD, StripAccents, Lowercase, Sequence

tokenizer.normalizer = Sequence([
    NFD(),           # Unicode å½’ä¸€åŒ–ï¼ˆåˆ†è§£ï¼‰
    Lowercase(),     # è½¬ä¸ºå°å†™
    StripAccents()   # åŽ»é™¤é‡éŸ³ç¬¦å·
])

# è¾“å…¥ï¼š"HÃ©llo WORLD"
# å½’ä¸€åŒ–åŽï¼š"hello world"
```

**å¸¸ç”¨å½’ä¸€åŒ–å™¨**ï¼š
- `NFD`, `NFC`, `NFKD`, `NFKC` â€” Unicode å½’ä¸€åŒ–å½¢å¼
- `Lowercase()` â€” è½¬ä¸ºå°å†™
- `StripAccents()` â€” åŽ»é™¤é‡éŸ³ï¼ˆÃ© â†’ eï¼‰
- `Strip()` â€” åŽ»é™¤ç©ºç™½
- `Replace(pattern, content)` â€” æ­£åˆ™æ›¿æ¢

### é¢„åˆ†è¯ï¼ˆPre-tokenizationï¼‰

å°†æ–‡æœ¬æ‹†åˆ†ä¸ºç±»è¯å•å…ƒï¼š

```python
from tokenizers.pre_tokenizers import Whitespace, Punctuation, Sequence, ByteLevel

# æŒ‰ç©ºç™½å’Œæ ‡ç‚¹æ‹†åˆ†
tokenizer.pre_tokenizer = Sequence([
    Whitespace(),
    Punctuation()
])

# è¾“å…¥ï¼š"Hello, world!"
# é¢„åˆ†è¯åŽï¼š["Hello", ",", "world", "!"]
```

**å¸¸ç”¨é¢„åˆ†è¯å™¨**ï¼š
- `Whitespace()` â€” æŒ‰ç©ºæ ¼ã€åˆ¶è¡¨ç¬¦ã€æ¢è¡Œç¬¦æ‹†åˆ†
- `ByteLevel()` â€” GPT-2 é£Žæ ¼çš„å­—èŠ‚çº§æ‹†åˆ†
- `Punctuation()` â€” éš”ç¦»æ ‡ç‚¹
- `Digits(individual_digits=True)` â€” é€ä¸ªæ‹†åˆ†æ•°å­—
- `Metaspace()` â€” å°†ç©ºæ ¼æ›¿æ¢ä¸º â–ï¼ˆSentencePiece é£Žæ ¼ï¼‰

### åŽå¤„ç†ï¼ˆPost-processingï¼‰

ä¸ºæ¨¡åž‹è¾“å…¥æ·»åŠ ç‰¹æ®Š tokenï¼š

```python
from tokenizers.processors import TemplateProcessing

# BERT é£Žæ ¼ï¼š[CLS] sentence [SEP]
tokenizer.post_processor = TemplateProcessing(
    single="[CLS] $A [SEP]",
    pair="[CLS] $A [SEP] $B [SEP]",
    special_tokens=[
        ("[CLS]", 1),
        ("[SEP]", 2),
    ],
)
```

**å¸¸è§æ¨¡å¼**ï¼š
```python
# GPT-2ï¼šsentence <|endoftext|>
TemplateProcessing(
    single="$A <|endoftext|>",
    special_tokens=[("<|endoftext|>", 50256)]
)

# RoBERTaï¼š<s> sentence </s>
TemplateProcessing(
    single="<s> $A </s>",
    pair="<s> $A </s> </s> $B </s>",
    special_tokens=[("<s>", 0), ("</s>", 2)]
)
```

## å¯¹é½è¿½è¸ª

è¿½è¸ª token åœ¨åŽŸå§‹æ–‡æœ¬ä¸­çš„ä½ç½®ï¼š

```python
output = tokenizer.encode("Hello, world!")

# èŽ·å– token åç§»é‡
for token, offset in zip(output.tokens, output.offsets):
    start, end = offset
    print(f"{token:10} â†’ [{start:2}, {end:2}): {text[start:end]!r}")

# è¾“å‡ºï¼š
# hello      â†’ [ 0,  5): 'Hello'
# ,          â†’ [ 5,  6): ','
# world      â†’ [ 7, 12): 'world'
# !          â†’ [12, 13): '!'
```

**ä½¿ç”¨åœºæ™¯**ï¼š
- å‘½åå®žä½“è¯†åˆ«ï¼ˆå°†é¢„æµ‹ç»“æžœæ˜ å°„å›žæ–‡æœ¬ï¼‰
- é—®ç­”ï¼ˆæå–ç­”æ¡ˆç‰‡æ®µï¼‰
- Token åˆ†ç±»ï¼ˆå°†æ ‡ç­¾å¯¹é½åˆ°åŽŸå§‹ä½ç½®ï¼‰

## ä¸Ž transformers é›†æˆ

### ä½¿ç”¨ AutoTokenizer åŠ è½½

```python
from transformers import AutoTokenizer

# AutoTokenizer è‡ªåŠ¨ä½¿ç”¨å¿«é€Ÿ tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# æ£€æŸ¥æ˜¯å¦ä½¿ç”¨å¿«é€Ÿ tokenizer
print(tokenizer.is_fast)  # True

# è®¿é—®åº•å±‚ tokenizers.Tokenizer
fast_tokenizer = tokenizer.backend_tokenizer
print(type(fast_tokenizer))  # <class 'tokenizers.Tokenizer'>
```

### å°†è‡ªå®šä¹‰ tokenizer è½¬æ¢ä¸º transformers æ ¼å¼

```python
from tokenizers import Tokenizer
from transformers import PreTrainedTokenizerFast

# è®­ç»ƒè‡ªå®šä¹‰ tokenizer
tokenizer = Tokenizer(BPE())
# ... è®­ç»ƒ tokenizer ...
tokenizer.save("my-tokenizer.json")

# å°è£…ä¸º transformers æ ¼å¼
transformers_tokenizer = PreTrainedTokenizerFast(
    tokenizer_file="my-tokenizer.json",
    unk_token="[UNK]",
    pad_token="[PAD]",
    cls_token="[CLS]",
    sep_token="[SEP]",
    mask_token="[MASK]"
)

# åƒä½¿ç”¨ä»»ä½• transformers tokenizer ä¸€æ ·ä½¿ç”¨
outputs = transformers_tokenizer(
    "Hello world",
    padding=True,
    truncation=True,
    max_length=512,
    return_tensors="pt"
)
```

## å¸¸è§æ¨¡å¼

### ä»Žè¿­ä»£å™¨è®­ç»ƒï¼ˆå¤§åž‹æ•°æ®é›†ï¼‰

```python
from datasets import load_dataset

# åŠ è½½æ•°æ®é›†
dataset = load_dataset("wikitext", "wikitext-103-raw-v1", split="train")

# åˆ›å»ºæ‰¹é‡è¿­ä»£å™¨
def batch_iterator(batch_size=1000):
    for i in range(0, len(dataset), batch_size):
        yield dataset[i:i + batch_size]["text"]

# è®­ç»ƒ tokenizer
tokenizer.train_from_iterator(
    batch_iterator(),
    trainer=trainer,
    length=len(dataset)  # ç”¨äºŽè¿›åº¦æ¡
)
```

**æ€§èƒ½**ï¼šçº¦ 10â€“20 åˆ†é’Ÿå¤„ç† 1GB

### å¯ç”¨ truncation å’Œ padding

```python
# å¯ç”¨ truncation
tokenizer.enable_truncation(max_length=512)

# å¯ç”¨ padding
tokenizer.enable_padding(
    pad_id=tokenizer.token_to_id("[PAD]"),
    pad_token="[PAD]",
    length=512  # å›ºå®šé•¿åº¦ï¼Œæˆ– None è¡¨ç¤ºæ‰¹æ¬¡æœ€å¤§é•¿åº¦
)

# åŒæ—¶ç¼–ç 
output = tokenizer.encode("This is a long sentence that will be truncated...")
print(len(output.ids))  # 512
```

### å¤šè¿›ç¨‹å¤„ç†

```python
from tokenizers import Tokenizer
from multiprocessing import Pool

# åŠ è½½ tokenizer
tokenizer = Tokenizer.from_file("tokenizer.json")

def encode_batch(texts):
    return tokenizer.encode_batch(texts)

# å¹¶è¡Œå¤„ç†å¤§åž‹è¯­æ–™åº“
with Pool(8) as pool:
    # å°†è¯­æ–™åº“æ‹†åˆ†ä¸ºå—
    chunk_size = 1000
    chunks = [corpus[i:i+chunk_size] for i in range(0, len(corpus), chunk_size)]

    # å¹¶è¡Œç¼–ç 
    results = pool.map(encode_batch, chunks)
```

**åŠ é€Ÿæ¯”**ï¼š8 æ ¸ä¸‹çº¦ 5â€“8 å€

## æ€§èƒ½åŸºå‡†

### è®­ç»ƒé€Ÿåº¦

| è¯­æ–™å¤§å° | BPEï¼ˆ30k è¯è¡¨ï¼‰ | WordPieceï¼ˆ30kï¼‰ | Unigramï¼ˆ8kï¼‰ |
|----------|----------------|-----------------|--------------|
| 10 MB    | 15 ç§’          | 18 ç§’           | 25 ç§’        |
| 100 MB   | 1.5 åˆ†é’Ÿ       | 2 åˆ†é’Ÿ          | 4 åˆ†é’Ÿ       |
| 1 GB     | 15 åˆ†é’Ÿ        | 20 åˆ†é’Ÿ         | 40 åˆ†é’Ÿ      |

**ç¡¬ä»¶**ï¼š16 æ ¸ CPUï¼Œåœ¨è‹±æ–‡ Wikipedia ä¸Šæµ‹è¯•

### åˆ†è¯é€Ÿåº¦

| å®žçŽ°æ–¹å¼        | 1 GB è¯­æ–™   | åžåé‡        |
|----------------|-------------|--------------|
| çº¯ Python      | ~20 åˆ†é’Ÿ    | ~50 MB/åˆ†é’Ÿ  |
| HF Tokenizers  | ~15 ç§’      | ~4 GB/åˆ†é’Ÿ   |
| **åŠ é€Ÿæ¯”**     | **80Ã—**     | **80Ã—**      |

**æµ‹è¯•**ï¼šè‹±æ–‡æ–‡æœ¬ï¼Œå¹³å‡å¥é•¿ 20 è¯

### å†…å­˜å ç”¨

| ä»»åŠ¡                    | å†…å­˜     |
|-------------------------|---------|
| åŠ è½½ tokenizer          | ~10 MB  |
| è®­ç»ƒ BPEï¼ˆ30k è¯è¡¨ï¼‰    | ~200 MB |
| ç¼–ç  100 ä¸‡å¥           | ~500 MB |

## æ”¯æŒçš„æ¨¡åž‹

å¯é€šè¿‡ `from_pretrained()` èŽ·å–çš„é¢„è®­ç»ƒ tokenizerï¼š

**BERT ç³»åˆ—**ï¼š
- `bert-base-uncased`, `bert-large-cased`
- `distilbert-base-uncased`
- `roberta-base`, `roberta-large`

**GPT ç³»åˆ—**ï¼š
- `gpt2`, `gpt2-medium`, `gpt2-large`
- `distilgpt2`

**T5 ç³»åˆ—**ï¼š
- `t5-small`, `t5-base`, `t5-large`
- `google/flan-t5-xxl`

**å…¶ä»–**ï¼š
- `facebook/bart-base`, `facebook/mbart-large-cc25`
- `albert-base-v2`, `albert-xlarge-v2`
- `xlm-roberta-base`, `xlm-roberta-large`

æµè§ˆå…¨éƒ¨ï¼šhttps://huggingface.co/models?library=tokenizers

## å‚è€ƒèµ„æ–™

- **[è®­ç»ƒæŒ‡å—](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/mlops/huggingface-tokenizers/references/training.md)** â€” è®­ç»ƒè‡ªå®šä¹‰ tokenizerã€é…ç½®è®­ç»ƒå™¨ã€å¤„ç†å¤§åž‹æ•°æ®é›†
- **[ç®—æ³•æ·±åº¦è§£æž](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/mlops/huggingface-tokenizers/references/algorithms.md)** â€” BPEã€WordPieceã€Unigram è¯¦ç»†è¯´æ˜Ž
- **[æµæ°´çº¿ç»„ä»¶](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/mlops/huggingface-tokenizers/references/pipeline.md)** â€” å½’ä¸€åŒ–å™¨ã€é¢„åˆ†è¯å™¨ã€åŽå¤„ç†å™¨ã€è§£ç å™¨
- **[Transformers é›†æˆ](https://github.com/NousResearch/zed-agent/blob/main/optional-skills/mlops/huggingface-tokenizers/references/integration.md)** â€” AutoTokenizerã€PreTrainedTokenizerFastã€ç‰¹æ®Š token

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://huggingface.co/docs/tokenizers
- **GitHub**ï¼šhttps://github.com/huggingface/tokenizers â­ 9,000+
- **ç‰ˆæœ¬**ï¼š0.20.0+
- **è¯¾ç¨‹**ï¼šhttps://huggingface.co/learn/nlp-course/chapter6/1
- **è®ºæ–‡**ï¼šBPEï¼ˆSennrich et al., 2016ï¼‰ã€WordPieceï¼ˆSchuster & Nakajima, 2012ï¼‰