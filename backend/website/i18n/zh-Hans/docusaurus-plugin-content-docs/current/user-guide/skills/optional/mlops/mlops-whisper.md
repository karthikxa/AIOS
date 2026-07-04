---
title: "Whisper â€” OpenAI çš„é€šç”¨è¯­éŸ³è¯†åˆ«æ¨¡åž‹"
sidebar_label: "Whisper"
description: "OpenAI çš„é€šç”¨è¯­éŸ³è¯†åˆ«æ¨¡åž‹"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Whisper

OpenAI çš„é€šç”¨è¯­éŸ³è¯†åˆ«æ¨¡åž‹ã€‚æ”¯æŒ 99 ç§è¯­è¨€ã€è½¬å½•ã€ç¿»è¯‘ä¸ºè‹±è¯­åŠè¯­è¨€è¯†åˆ«ã€‚æä¾›å…­ç§æ¨¡åž‹è§„æ ¼ï¼Œä»Ž tinyï¼ˆ3900 ä¸‡å‚æ•°ï¼‰åˆ° largeï¼ˆ15.5 äº¿å‚æ•°ï¼‰ã€‚é€‚ç”¨äºŽè¯­éŸ³è½¬æ–‡å­—ã€æ’­å®¢è½¬å½•æˆ–å¤šè¯­è¨€éŸ³é¢‘å¤„ç†ã€‚æ˜¯é²æ£’å¤šè¯­è¨€ ASRï¼ˆè‡ªåŠ¨è¯­éŸ³è¯†åˆ«ï¼‰çš„é¦–é€‰ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/whisper` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/whisper` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `openai-whisper`, `transformers`, `torch` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Whisper`, `Speech Recognition`, `ASR`, `Multimodal`, `Multilingual`, `OpenAI`, `Speech-To-Text`, `Transcription`, `Translation`, `Audio Processing` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Whisper - é²æ£’è¯­éŸ³è¯†åˆ«

OpenAI çš„å¤šè¯­è¨€è¯­éŸ³è¯†åˆ«æ¨¡åž‹ã€‚

## ä½•æ—¶ä½¿ç”¨ Whisper

**é€‚ç”¨åœºæ™¯ï¼š**
- è¯­éŸ³è½¬æ–‡å­—è½¬å½•ï¼ˆ99 ç§è¯­è¨€ï¼‰
- æ’­å®¢/è§†é¢‘è½¬å½•
- ä¼šè®®è®°å½•è‡ªåŠ¨åŒ–
- ç¿»è¯‘ä¸ºè‹±è¯­
- å˜ˆæ‚éŸ³é¢‘è½¬å½•
- å¤šè¯­è¨€éŸ³é¢‘å¤„ç†

**æŒ‡æ ‡**ï¼š
- **GitHub 72,900+ æ˜Ÿ**
- æ”¯æŒ 99 ç§è¯­è¨€
- åŸºäºŽ 68 ä¸‡å°æ—¶éŸ³é¢‘è®­ç»ƒ
- MIT è®¸å¯è¯

**æ”¹ç”¨å…¶ä»–æ›¿ä»£æ–¹æ¡ˆçš„æƒ…å†µ**ï¼š
- **AssemblyAI**ï¼šæ‰˜ç®¡ APIï¼Œæ”¯æŒè¯´è¯äººåˆ†ç¦»
- **Deepgram**ï¼šå®žæ—¶æµå¼ ASR
- **Google Speech-to-Text**ï¼šåŸºäºŽäº‘ç«¯

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# Requires Python 3.8-3.11
pip install -U openai-whisper

# Requires ffmpeg
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg
# Windows: choco install ffmpeg
```

### åŸºæœ¬è½¬å½•

```python
import whisper

# Load model
model = whisper.load_model("base")

# Transcribe
result = model.transcribe("audio.mp3")

# Print text
print(result["text"])

# Access segments
for segment in result["segments"]:
    print(f"[{segment['start']:.2f}s - {segment['end']:.2f}s] {segment['text']}")
```

## æ¨¡åž‹è§„æ ¼

```python
# Available models
models = ["tiny", "base", "small", "medium", "large", "turbo"]

# Load specific model
model = whisper.load_model("turbo")  # Fastest, good quality
```

| æ¨¡åž‹ | å‚æ•°é‡ | ä»…è‹±è¯­ | å¤šè¯­è¨€ | é€Ÿåº¦ | æ˜¾å­˜ |
|-------|------------|--------------|--------------|-------|------|
| tiny | 39M | âœ“ | âœ“ | ~32x | ~1 GB |
| base | 74M | âœ“ | âœ“ | ~16x | ~1 GB |
| small | 244M | âœ“ | âœ“ | ~6x | ~2 GB |
| medium | 769M | âœ“ | âœ“ | ~2x | ~5 GB |
| large | 1550M | âœ— | âœ“ | 1x | ~10 GB |
| turbo | 809M | âœ— | âœ“ | ~8x | ~6 GB |

**æŽ¨è**ï¼šè¿½æ±‚æœ€ä½³é€Ÿåº¦/è´¨é‡æ¯”ä½¿ç”¨ `turbo`ï¼ŒåŽŸåž‹å¼€å‘ä½¿ç”¨ `base`

## è½¬å½•é€‰é¡¹

### è¯­è¨€æŒ‡å®š

```python
# Auto-detect language
result = model.transcribe("audio.mp3")

# Specify language (faster)
result = model.transcribe("audio.mp3", language="en")

# Supported: en, es, fr, de, it, pt, ru, ja, ko, zh, and 89 more
```

### ä»»åŠ¡é€‰æ‹©

```python
# Transcription (default)
result = model.transcribe("audio.mp3", task="transcribe")

# Translation to English
result = model.transcribe("spanish.mp3", task="translate")
# Input: Spanish audio â†’ Output: English text
```

### åˆå§‹ promptï¼ˆæç¤ºè¯ï¼‰

```python
# Improve accuracy with context
result = model.transcribe(
    "audio.mp3",
    initial_prompt="This is a technical podcast about machine learning and AI."
)

# Helps with:
# - Technical terms
# - Proper nouns
# - Domain-specific vocabulary
```

### æ—¶é—´æˆ³

```python
# Word-level timestamps
result = model.transcribe("audio.mp3", word_timestamps=True)

for segment in result["segments"]:
    for word in segment["words"]:
        print(f"{word['word']} ({word['start']:.2f}s - {word['end']:.2f}s)")
```

### æ¸©åº¦å›žé€€

```python
# Retry with different temperatures if confidence low
result = model.transcribe(
    "audio.mp3",
    temperature=(0.0, 0.2, 0.4, 0.6, 0.8, 1.0)
)
```

## å‘½ä»¤è¡Œç”¨æ³•

```bash
# Basic transcription
whisper audio.mp3

# Specify model
whisper audio.mp3 --model turbo

# Output formats
whisper audio.mp3 --output_format txt     # Plain text
whisper audio.mp3 --output_format srt     # Subtitles
whisper audio.mp3 --output_format vtt     # WebVTT
whisper audio.mp3 --output_format json    # JSON with timestamps

# Language
whisper audio.mp3 --language Spanish

# Translation
whisper spanish.mp3 --task translate
```

## æ‰¹é‡å¤„ç†

```python
import os

audio_files = ["file1.mp3", "file2.mp3", "file3.mp3"]

for audio_file in audio_files:
    print(f"Transcribing {audio_file}...")
    result = model.transcribe(audio_file)

    # Save to file
    output_file = audio_file.replace(".mp3", ".txt")
    with open(output_file, "w") as f:
        f.write(result["text"])
```

## å®žæ—¶è½¬å½•

```python
# For streaming audio, use faster-whisper
# pip install faster-whisper

from faster_whisper import WhisperModel

model = WhisperModel("base", device="cuda", compute_type="float16")

# Transcribe with streaming
segments, info = model.transcribe("audio.mp3", beam_size=5)

for segment in segments:
    print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")
```

## GPU åŠ é€Ÿ

```python
import whisper

# Automatically uses GPU if available
model = whisper.load_model("turbo")

# Force CPU
model = whisper.load_model("turbo", device="cpu")

# Force GPU
model = whisper.load_model("turbo", device="cuda")

# 10-20Ã— faster on GPU
```

## ä¸Žå…¶ä»–å·¥å…·é›†æˆ

### å­—å¹•ç”Ÿæˆ

```bash
# Generate SRT subtitles
whisper video.mp4 --output_format srt --language English

# Output: video.srt
```

### ä¸Ž LangChain é›†æˆ

```python
from langchain.document_loaders import WhisperTranscriptionLoader

loader = WhisperTranscriptionLoader(file_path="audio.mp3")
docs = loader.load()

# Use transcription in RAG
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

vectorstore = Chroma.from_documents(docs, OpenAIEmbeddings())
```

### ä»Žè§†é¢‘ä¸­æå–éŸ³é¢‘

```bash
# Use ffmpeg to extract audio
ffmpeg -i video.mp4 -vn -acodec pcm_s16le audio.wav

# Then transcribe
whisper audio.wav
```

## æœ€ä½³å®žè·µ

1. **ä½¿ç”¨ turbo æ¨¡åž‹** â€” è‹±è¯­åœºæ™¯ä¸‹é€Ÿåº¦/è´¨é‡æœ€ä¼˜
2. **æŒ‡å®šè¯­è¨€** â€” æ¯”è‡ªåŠ¨æ£€æµ‹æ›´å¿«
3. **æ·»åŠ åˆå§‹ prompt** â€” æå‡ä¸“ä¸šæœ¯è¯­è¯†åˆ«å‡†ç¡®çŽ‡
4. **ä½¿ç”¨ GPU** â€” é€Ÿåº¦æå‡ 10â€“20 å€
5. **æ‰¹é‡å¤„ç†** â€” æ•ˆçŽ‡æ›´é«˜
6. **è½¬æ¢ä¸º WAV** â€” å…¼å®¹æ€§æ›´å¥½
7. **åˆ‡åˆ†é•¿éŸ³é¢‘** â€” æ¯æ®µä¸è¶…è¿‡ 30 åˆ†é’Ÿ
8. **ç¡®è®¤è¯­è¨€æ”¯æŒæƒ…å†µ** â€” ä¸åŒè¯­è¨€è´¨é‡æœ‰å·®å¼‚
9. **ä½¿ç”¨ faster-whisper** â€” æ¯” openai-whisper å¿« 4 å€
10. **ç›‘æŽ§æ˜¾å­˜** â€” æ ¹æ®ç¡¬ä»¶é…ç½®é€‰æ‹©æ¨¡åž‹è§„æ ¼

## æ€§èƒ½

| æ¨¡åž‹ | å®žæ—¶å€çŽ‡ï¼ˆCPUï¼‰ | å®žæ—¶å€çŽ‡ï¼ˆGPUï¼‰ |
|-------|------------------------|------------------------|
| tiny | ~0.32 | ~0.01 |
| base | ~0.16 | ~0.01 |
| turbo | ~0.08 | ~0.01 |
| large | ~1.0 | ~0.05 |

*å®žæ—¶å€çŽ‡ï¼š0.1 è¡¨ç¤ºæ¯”å®žæ—¶é€Ÿåº¦å¿« 10 å€*

## è¯­è¨€æ”¯æŒ

ä¸»è¦æ”¯æŒè¯­è¨€ï¼š
- è‹±è¯­ï¼ˆenï¼‰
- è¥¿ç­ç‰™è¯­ï¼ˆesï¼‰
- æ³•è¯­ï¼ˆfrï¼‰
- å¾·è¯­ï¼ˆdeï¼‰
- æ„å¤§åˆ©è¯­ï¼ˆitï¼‰
- è‘¡è„ç‰™è¯­ï¼ˆptï¼‰
- ä¿„è¯­ï¼ˆruï¼‰
- æ—¥è¯­ï¼ˆjaï¼‰
- éŸ©è¯­ï¼ˆkoï¼‰
- ä¸­æ–‡ï¼ˆzhï¼‰

å®Œæ•´åˆ—è¡¨ï¼šå…± 99 ç§è¯­è¨€

## å±€é™æ€§

1. **å¹»è§‰é—®é¢˜** â€” å¯èƒ½é‡å¤æˆ–ç”Ÿæˆä¸å­˜åœ¨çš„æ–‡æœ¬
2. **é•¿éŸ³é¢‘å‡†ç¡®çŽ‡** â€” è¶…è¿‡ 30 åˆ†é’ŸåŽè´¨é‡ä¸‹é™
3. **è¯´è¯äººè¯†åˆ«** â€” ä¸æ”¯æŒè¯´è¯äººåˆ†ç¦»
4. **å£éŸ³** â€” è´¨é‡å› å£éŸ³è€Œå¼‚
5. **èƒŒæ™¯å™ªéŸ³** â€” å¯èƒ½å½±å“å‡†ç¡®çŽ‡
6. **å®žæ—¶å»¶è¿Ÿ** â€” ä¸é€‚åˆå®žæ—¶å­—å¹•åœºæ™¯

## èµ„æº

- **GitHub**ï¼šhttps://github.com/openai/whisper â­ 72,900+
- **è®ºæ–‡**ï¼šhttps://arxiv.org/abs/2212.04356
- **æ¨¡åž‹å¡ç‰‡**ï¼šhttps://github.com/openai/whisper/blob/main/model-card.md
- **Colab**ï¼šå¯åœ¨ä»“åº“ä¸­èŽ·å–
- **è®¸å¯è¯**ï¼šMIT