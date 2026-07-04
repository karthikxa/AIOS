---
title: "Audiocraft éŸ³é¢‘ç”Ÿæˆ â€” AudioCraftï¼šMusicGen æ–‡æœ¬è½¬éŸ³ä¹ï¼ŒAudioGen æ–‡æœ¬è½¬å£°éŸ³"
sidebar_label: "Audiocraft éŸ³é¢‘ç”Ÿæˆ"
description: "AudioCraftï¼šMusicGen æ–‡æœ¬è½¬éŸ³ä¹ï¼ŒAudioGen æ–‡æœ¬è½¬å£°éŸ³"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Audiocraft éŸ³é¢‘ç”Ÿæˆ

AudioCraftï¼šMusicGen æ–‡æœ¬è½¬éŸ³ä¹ï¼ŒAudioGen æ–‡æœ¬è½¬å£°éŸ³ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/mlops/models/audiocraft` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `audiocraft`, `torch>=2.0.0`, `transformers>=4.30.0` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Multimodal`, `Audio Generation`, `Text-to-Music`, `Text-to-Audio`, `MusicGen` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# AudioCraftï¼šéŸ³é¢‘ç”Ÿæˆ

ä½¿ç”¨ Meta çš„ AudioCraft è¿›è¡Œæ–‡æœ¬è½¬éŸ³ä¹å’Œæ–‡æœ¬è½¬éŸ³é¢‘ç”Ÿæˆçš„å®Œæ•´æŒ‡å—ï¼Œæ¶µç›– MusicGenã€AudioGen å’Œ EnCodecã€‚

## ä½•æ—¶ä½¿ç”¨ AudioCraft

**åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ AudioCraftï¼š**
- éœ€è¦ä»Žæ–‡æœ¬æè¿°ç”ŸæˆéŸ³ä¹
- åˆ›å»ºéŸ³æ•ˆå’ŒçŽ¯å¢ƒéŸ³é¢‘
- æž„å»ºéŸ³ä¹ç”Ÿæˆåº”ç”¨
- éœ€è¦æ—‹å¾‹æ¡ä»¶åŒ–çš„éŸ³ä¹ç”Ÿæˆ
- éœ€è¦ç«‹ä½“å£°éŸ³é¢‘è¾“å‡º
- éœ€è¦å¯æŽ§çš„é£Žæ ¼è¿ç§»éŸ³ä¹ç”Ÿæˆ

**æ ¸å¿ƒåŠŸèƒ½ï¼š**
- **MusicGen**ï¼šæ”¯æŒæ—‹å¾‹æ¡ä»¶åŒ–çš„æ–‡æœ¬è½¬éŸ³ä¹ç”Ÿæˆ
- **AudioGen**ï¼šæ–‡æœ¬è½¬éŸ³æ•ˆç”Ÿæˆ
- **EnCodec**ï¼šé«˜ä¿çœŸç¥žç»éŸ³é¢‘ç¼–è§£ç å™¨
- **å¤šç§æ¨¡åž‹è§„æ ¼**ï¼šä»Ž Smallï¼ˆ300Mï¼‰åˆ° Largeï¼ˆ3.3Bï¼‰
- **ç«‹ä½“å£°æ”¯æŒ**ï¼šå®Œæ•´ç«‹ä½“å£°éŸ³é¢‘ç”Ÿæˆ
- **é£Žæ ¼æ¡ä»¶åŒ–**ï¼šMusicGen-Style æ”¯æŒåŸºäºŽå‚è€ƒçš„ç”Ÿæˆ

**ä»¥ä¸‹æƒ…å†µè¯·ä½¿ç”¨æ›¿ä»£æ–¹æ¡ˆï¼š**
- **Stable Audio**ï¼šç”¨äºŽè¾ƒé•¿çš„å•†ä¸šéŸ³ä¹ç”Ÿæˆ
- **Bark**ï¼šç”¨äºŽå¸¦éŸ³ä¹/éŸ³æ•ˆçš„æ–‡æœ¬è½¬è¯­éŸ³
- **Riffusion**ï¼šç”¨äºŽåŸºäºŽé¢‘è°±å›¾çš„éŸ³ä¹ç”Ÿæˆ
- **OpenAI Jukebox**ï¼šç”¨äºŽå¸¦æ­Œè¯çš„åŽŸå§‹éŸ³é¢‘ç”Ÿæˆ

## å¿«é€Ÿå¼€å§‹

### å®‰è£…

```bash
# ä»Ž PyPI å®‰è£…
pip install audiocraft

# ä»Ž GitHub å®‰è£…ï¼ˆæœ€æ–°ç‰ˆï¼‰
pip install git+https://github.com/facebookresearch/audiocraft.git

# æˆ–ä½¿ç”¨ HuggingFace Transformers
pip install transformers torch torchaudio
```

### åŸºç¡€æ–‡æœ¬è½¬éŸ³ä¹ï¼ˆAudioCraftï¼‰

```python
import torchaudio
from audiocraft.models import MusicGen

# åŠ è½½æ¨¡åž‹
model = MusicGen.get_pretrained('facebook/musicgen-small')

# è®¾ç½®ç”Ÿæˆå‚æ•°
model.set_generation_params(
    duration=8,  # ç§’
    top_k=250,
    temperature=1.0
)

# ä»Žæ–‡æœ¬ç”Ÿæˆ
descriptions = ["happy upbeat electronic dance music with synths"]
wav = model.generate(descriptions)

# ä¿å­˜éŸ³é¢‘
torchaudio.save("output.wav", wav[0].cpu(), sample_rate=32000)
```

### ä½¿ç”¨ HuggingFace Transformers

```python
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy

# åŠ è½½æ¨¡åž‹å’Œå¤„ç†å™¨
processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
model.to("cuda")

# ç”ŸæˆéŸ³ä¹
inputs = processor(
    text=["80s pop track with bassy drums and synth"],
    padding=True,
    return_tensors="pt"
).to("cuda")

audio_values = model.generate(
    **inputs,
    do_sample=True,
    guidance_scale=3,
    max_new_tokens=256
)

# ä¿å­˜
sampling_rate = model.config.audio_encoder.sampling_rate
scipy.io.wavfile.write("output.wav", rate=sampling_rate, data=audio_values[0, 0].cpu().numpy())
```

### ä½¿ç”¨ AudioGen è¿›è¡Œæ–‡æœ¬è½¬å£°éŸ³

```python
from audiocraft.models import AudioGen

# åŠ è½½ AudioGen
model = AudioGen.get_pretrained('facebook/audiogen-medium')

model.set_generation_params(duration=5)

# ç”ŸæˆéŸ³æ•ˆ
descriptions = ["dog barking in a park with birds chirping"]
wav = model.generate(descriptions)

torchaudio.save("sound.wav", wav[0].cpu(), sample_rate=16000)
```

## æ ¸å¿ƒæ¦‚å¿µ

### æž¶æž„æ¦‚è§ˆ

<!-- ascii-guard-ignore -->
```
AudioCraft Architecture:
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    Text Encoder (T5)                          â”‚
â”‚                         â”‚                                     â”‚
â”‚                    Text Embeddings                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              Transformer Decoder (LM)                         â”‚
â”‚     Auto-regressively generates audio tokens                  â”‚
â”‚     Using efficient token interleaving patterns               â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                EnCodec Audio Decoder                          â”‚
â”‚        Converts tokens back to audio waveform                 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```
<!-- ascii-guard-ignore-end -->

### æ¨¡åž‹å˜ä½“

| æ¨¡åž‹ | è§„æ¨¡ | æè¿° | é€‚ç”¨åœºæ™¯ |
|-------|------|-------------|----------|
| `musicgen-small` | 300M | æ–‡æœ¬è½¬éŸ³ä¹ | å¿«é€Ÿç”Ÿæˆ |
| `musicgen-medium` | 1.5B | æ–‡æœ¬è½¬éŸ³ä¹ | å‡è¡¡é€‰æ‹© |
| `musicgen-large` | 3.3B | æ–‡æœ¬è½¬éŸ³ä¹ | æœ€ä½³è´¨é‡ |
| `musicgen-melody` | 1.5B | æ–‡æœ¬ + æ—‹å¾‹ | æ—‹å¾‹æ¡ä»¶åŒ– |
| `musicgen-melody-large` | 3.3B | æ–‡æœ¬ + æ—‹å¾‹ | æœ€ä½³æ—‹å¾‹æ•ˆæžœ |
| `musicgen-stereo-*` | ä¸å®š | ç«‹ä½“å£°è¾“å‡º | ç«‹ä½“å£°ç”Ÿæˆ |
| `musicgen-style` | 1.5B | é£Žæ ¼è¿ç§» | åŸºäºŽå‚è€ƒçš„ç”Ÿæˆ |
| `audiogen-medium` | 1.5B | æ–‡æœ¬è½¬å£°éŸ³ | éŸ³æ•ˆç”Ÿæˆ |

### ç”Ÿæˆå‚æ•°

| å‚æ•° | é»˜è®¤å€¼ | æè¿° |
|-----------|---------|-------------|
| `duration` | 8.0 | æ—¶é•¿ï¼ˆç§’ï¼‰ï¼ŒèŒƒå›´ 1-120 |
| `top_k` | 250 | Top-k é‡‡æ · |
| `top_p` | 0.0 | Nucleus é‡‡æ ·ï¼ˆ0 = ç¦ç”¨ï¼‰ |
| `temperature` | 1.0 | é‡‡æ ·æ¸©åº¦ |
| `cfg_coef` | 3.0 | æ— åˆ†ç±»å™¨å¼•å¯¼ç³»æ•° |

## MusicGen ç”¨æ³•

### æ–‡æœ¬è½¬éŸ³ä¹ç”Ÿæˆ

```python
from audiocraft.models import MusicGen
import torchaudio

model = MusicGen.get_pretrained('facebook/musicgen-medium')

# é…ç½®ç”Ÿæˆå‚æ•°
model.set_generation_params(
    duration=30,          # æœ€é•¿ 30 ç§’
    top_k=250,            # é‡‡æ ·å¤šæ ·æ€§
    top_p=0.0,            # 0 = ä»…ä½¿ç”¨ top_k
    temperature=1.0,      # åˆ›æ„åº¦ï¼ˆè¶Šé«˜è¶Šå¤šæ ·ï¼‰
    cfg_coef=3.0          # æ–‡æœ¬éµå¾ªåº¦ï¼ˆè¶Šé«˜è¶Šä¸¥æ ¼ï¼‰
)

# ç”Ÿæˆå¤šä¸ªæ ·æœ¬
descriptions = [
    "epic orchestral soundtrack with strings and brass",
    "chill lo-fi hip hop beat with jazzy piano",
    "energetic rock song with electric guitar"
]

# ç”Ÿæˆï¼ˆè¿”å›ž [batch, channels, samples]ï¼‰
wav = model.generate(descriptions)

# é€ä¸ªä¿å­˜
for i, audio in enumerate(wav):
    torchaudio.save(f"music_{i}.wav", audio.cpu(), sample_rate=32000)
```

### æ—‹å¾‹æ¡ä»¶åŒ–ç”Ÿæˆ

```python
from audiocraft.models import MusicGen
import torchaudio

# åŠ è½½æ—‹å¾‹æ¨¡åž‹
model = MusicGen.get_pretrained('facebook/musicgen-melody')
model.set_generation_params(duration=30)

# åŠ è½½æ—‹å¾‹éŸ³é¢‘
melody, sr = torchaudio.load("melody.wav")

# ä½¿ç”¨æ—‹å¾‹æ¡ä»¶åŒ–ç”Ÿæˆ
descriptions = ["acoustic guitar folk song"]
wav = model.generate_with_chroma(descriptions, melody, sr)

torchaudio.save("melody_conditioned.wav", wav[0].cpu(), sample_rate=32000)
```

### ç«‹ä½“å£°ç”Ÿæˆ

```python
from audiocraft.models import MusicGen

# åŠ è½½ç«‹ä½“å£°æ¨¡åž‹
model = MusicGen.get_pretrained('facebook/musicgen-stereo-medium')
model.set_generation_params(duration=15)

descriptions = ["ambient electronic music with wide stereo panning"]
wav = model.generate(descriptions)

# wav å½¢çŠ¶ï¼šç«‹ä½“å£°ä¸º [batch, 2, samples]
print(f"Stereo shape: {wav.shape}")  # [1, 2, 480000]
torchaudio.save("stereo.wav", wav[0].cpu(), sample_rate=32000)
```

### éŸ³é¢‘ç»­å†™

```python
from transformers import AutoProcessor, MusicgenForConditionalGeneration

processor = AutoProcessor.from_pretrained("facebook/musicgen-medium")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-medium")

# åŠ è½½å¾…ç»­å†™çš„éŸ³é¢‘
import torchaudio
audio, sr = torchaudio.load("intro.wav")

# åŒæ—¶å¤„ç†æ–‡æœ¬å’ŒéŸ³é¢‘
inputs = processor(
    audio=audio.squeeze().numpy(),
    sampling_rate=sr,
    text=["continue with a epic chorus"],
    padding=True,
    return_tensors="pt"
)

# ç”Ÿæˆç»­å†™å†…å®¹
audio_values = model.generate(**inputs, do_sample=True, guidance_scale=3, max_new_tokens=512)
```

## MusicGen-Style ç”¨æ³•

### é£Žæ ¼æ¡ä»¶åŒ–ç”Ÿæˆ

```python
from audiocraft.models import MusicGen

# åŠ è½½é£Žæ ¼æ¨¡åž‹
model = MusicGen.get_pretrained('facebook/musicgen-style')

# é…ç½®å¸¦é£Žæ ¼çš„ç”Ÿæˆå‚æ•°
model.set_generation_params(
    duration=30,
    cfg_coef=3.0,
    cfg_coef_beta=5.0  # é£Žæ ¼å½±å“å¼ºåº¦
)

# é…ç½®é£Žæ ¼æ¡ä»¶å™¨å‚æ•°
model.set_style_conditioner_params(
    eval_q=3,          # RVQ é‡åŒ–å™¨æ•°é‡ï¼ˆ1-6ï¼‰
    excerpt_length=3.0  # é£Žæ ¼ç‰‡æ®µé•¿åº¦
)

# åŠ è½½é£Žæ ¼å‚è€ƒéŸ³é¢‘
style_audio, sr = torchaudio.load("reference_style.wav")

# ä½¿ç”¨æ–‡æœ¬ + é£Žæ ¼ç”Ÿæˆ
descriptions = ["upbeat dance track"]
wav = model.generate_with_style(descriptions, style_audio, sr)
```

### ä»…é£Žæ ¼ç”Ÿæˆï¼ˆæ— æ–‡æœ¬ï¼‰

```python
# ä¸ä½¿ç”¨æ–‡æœ¬ promptï¼Œä»…åŒ¹é…é£Žæ ¼ç”Ÿæˆ
model.set_generation_params(
    duration=30,
    cfg_coef=3.0,
    cfg_coef_beta=None  # ç¦ç”¨åŒ CFG ä»¥æ”¯æŒçº¯é£Žæ ¼æ¨¡å¼
)

wav = model.generate_with_style([None], style_audio, sr)
```

## AudioGen ç”¨æ³•

### éŸ³æ•ˆç”Ÿæˆ

```python
from audiocraft.models import AudioGen
import torchaudio

model = AudioGen.get_pretrained('facebook/audiogen-medium')
model.set_generation_params(duration=10)

# ç”Ÿæˆå„ç±»å£°éŸ³
descriptions = [
    "thunderstorm with heavy rain and lightning",
    "busy city traffic with car horns",
    "ocean waves crashing on rocks",
    "crackling campfire in forest"
]

wav = model.generate(descriptions)

for i, audio in enumerate(wav):
    torchaudio.save(f"sound_{i}.wav", audio.cpu(), sample_rate=16000)
```

## EnCodec ç”¨æ³•

### éŸ³é¢‘åŽ‹ç¼©

```python
from audiocraft.models import CompressionModel
import torch
import torchaudio

# åŠ è½½ EnCodec
model = CompressionModel.get_pretrained('facebook/encodec_32khz')

# åŠ è½½éŸ³é¢‘
wav, sr = torchaudio.load("audio.wav")

# ç¡®ä¿é‡‡æ ·çŽ‡æ­£ç¡®
if sr != 32000:
    resampler = torchaudio.transforms.Resample(sr, 32000)
    wav = resampler(wav)

# ç¼–ç ä¸º token
with torch.no_grad():
    encoded = model.encode(wav.unsqueeze(0))
    codes = encoded[0]  # éŸ³é¢‘ç¼–ç 

# è§£ç å›žéŸ³é¢‘
with torch.no_grad():
    decoded = model.decode(codes)

torchaudio.save("reconstructed.wav", decoded[0].cpu(), sample_rate=32000)
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šéŸ³ä¹ç”Ÿæˆæµæ°´çº¿

```python
import torch
import torchaudio
from audiocraft.models import MusicGen

class MusicGenerator:
    def __init__(self, model_name="facebook/musicgen-medium"):
        self.model = MusicGen.get_pretrained(model_name)
        self.sample_rate = 32000

    def generate(self, prompt, duration=30, temperature=1.0, cfg=3.0):
        self.model.set_generation_params(
            duration=duration,
            top_k=250,
            temperature=temperature,
            cfg_coef=cfg
        )

        with torch.no_grad():
            wav = self.model.generate([prompt])

        return wav[0].cpu()

    def generate_batch(self, prompts, duration=30):
        self.model.set_generation_params(duration=duration)

        with torch.no_grad():
            wav = self.model.generate(prompts)

        return wav.cpu()

    def save(self, audio, path):
        torchaudio.save(path, audio, sample_rate=self.sample_rate)

# ä½¿ç”¨ç¤ºä¾‹
generator = MusicGenerator()
audio = generator.generate(
    "epic cinematic orchestral music",
    duration=30,
    temperature=1.0
)
generator.save(audio, "epic_music.wav")
```

### å·¥ä½œæµ 2ï¼šéŸ³æ•ˆæ‰¹é‡å¤„ç†

```python
import json
from pathlib import Path
from audiocraft.models import AudioGen
import torchaudio

def batch_generate_sounds(sound_specs, output_dir):
    """
    æ ¹æ®è§„æ ¼æ‰¹é‡ç”Ÿæˆå£°éŸ³ã€‚

    Args:
        sound_specs: list of {"name": str, "description": str, "duration": float}
        output_dir: output directory path
    """
    model = AudioGen.get_pretrained('facebook/audiogen-medium')
    output_dir = Path(output_dir)
    output_dir.mkdir(exist_ok=True)

    results = []

    for spec in sound_specs:
        model.set_generation_params(duration=spec.get("duration", 5))

        wav = model.generate([spec["description"]])

        output_path = output_dir / f"{spec['name']}.wav"
        torchaudio.save(str(output_path), wav[0].cpu(), sample_rate=16000)

        results.append({
            "name": spec["name"],
            "path": str(output_path),
            "description": spec["description"]
        })

    return results

# ä½¿ç”¨ç¤ºä¾‹
sounds = [
    {"name": "explosion", "description": "massive explosion with debris", "duration": 3},
    {"name": "footsteps", "description": "footsteps on wooden floor", "duration": 5},
    {"name": "door", "description": "wooden door creaking and closing", "duration": 2}
]

results = batch_generate_sounds(sounds, "sound_effects/")
```

### å·¥ä½œæµ 3ï¼šGradio æ¼”ç¤º

```python
import gradio as gr
import torch
import torchaudio
from audiocraft.models import MusicGen

model = MusicGen.get_pretrained('facebook/musicgen-small')

def generate_music(prompt, duration, temperature, cfg_coef):
    model.set_generation_params(
        duration=duration,
        temperature=temperature,
        cfg_coef=cfg_coef
    )

    with torch.no_grad():
        wav = model.generate([prompt])

    # ä¿å­˜åˆ°ä¸´æ—¶æ–‡ä»¶
    path = "temp_output.wav"
    torchaudio.save(path, wav[0].cpu(), sample_rate=32000)
    return path

demo = gr.Interface(
    fn=generate_music,
    inputs=[
        gr.Textbox(label="Music Description", placeholder="upbeat electronic dance music"),
        gr.Slider(1, 30, value=8, label="Duration (seconds)"),
        gr.Slider(0.5, 2.0, value=1.0, label="Temperature"),
        gr.Slider(1.0, 10.0, value=3.0, label="CFG Coefficient")
    ],
    outputs=gr.Audio(label="Generated Music"),
    title="MusicGen Demo"
)

demo.launch()
```

## æ€§èƒ½ä¼˜åŒ–

### å†…å­˜ä¼˜åŒ–

```python
# ä½¿ç”¨è¾ƒå°çš„æ¨¡åž‹
model = MusicGen.get_pretrained('facebook/musicgen-small')

# æ¯æ¬¡ç”ŸæˆåŽæ¸…ç†ç¼“å­˜
torch.cuda.empty_cache()

# ç”Ÿæˆè¾ƒçŸ­çš„æ—¶é•¿
model.set_generation_params(duration=10)  # æ›¿ä»£ 30 ç§’

# ä½¿ç”¨åŠç²¾åº¦
model = model.half()
```

### æ‰¹å¤„ç†æ•ˆçŽ‡

```python
# ä¸€æ¬¡å¤„ç†å¤šä¸ª promptï¼ˆæ›´é«˜æ•ˆï¼‰
descriptions = ["prompt1", "prompt2", "prompt3", "prompt4"]
wav = model.generate(descriptions)  # å•æ¬¡æ‰¹å¤„ç†

# è€Œéž
for desc in descriptions:
    wav = model.generate([desc])  # å¤šæ¬¡æ‰¹å¤„ç†ï¼ˆè¾ƒæ…¢ï¼‰
```

### GPU æ˜¾å­˜éœ€æ±‚

| æ¨¡åž‹ | FP32 æ˜¾å­˜ | FP16 æ˜¾å­˜ |
|-------|-----------|-----------|
| musicgen-small | ~4GB | ~2GB |
| musicgen-medium | ~8GB | ~4GB |
| musicgen-large | ~16GB | ~8GB |

## å¸¸è§é—®é¢˜

| é—®é¢˜ | è§£å†³æ–¹æ¡ˆ |
|-------|----------|
| CUDA æ˜¾å­˜ä¸è¶³ | ä½¿ç”¨è¾ƒå°æ¨¡åž‹ï¼Œç¼©çŸ­æ—¶é•¿ |
| è´¨é‡è¾ƒå·® | æé«˜ cfg_coefï¼Œä¼˜åŒ– prompt |
| ç”Ÿæˆæ—¶é•¿è¿‡çŸ­ | æ£€æŸ¥æœ€å¤§æ—¶é•¿è®¾ç½® |
| éŸ³é¢‘æœ‰æ‚éŸ³ | å°è¯•ä¸åŒçš„ temperature |
| ç«‹ä½“å£°ä¸ç”Ÿæ•ˆ | ä½¿ç”¨ç«‹ä½“å£°æ¨¡åž‹å˜ä½“ |

## å‚è€ƒèµ„æ–™

- **[é«˜çº§ç”¨æ³•](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/models/audiocraft/references/advanced-usage.md)** - è®­ç»ƒã€å¾®è°ƒã€éƒ¨ç½²
- **[æ•…éšœæŽ’æŸ¥](https://github.com/NousResearch/zed-agent/blob/main/skills/mlops/models/audiocraft/references/troubleshooting.md)** - å¸¸è§é—®é¢˜ä¸Žè§£å†³æ–¹æ¡ˆ

## èµ„æº

- **GitHub**ï¼šhttps://github.com/facebookresearch/audiocraft
- **è®ºæ–‡ï¼ˆMusicGenï¼‰**ï¼šhttps://arxiv.org/abs/2306.05284
- **è®ºæ–‡ï¼ˆAudioGenï¼‰**ï¼šhttps://arxiv.org/abs/2209.15352
- **HuggingFace**ï¼šhttps://huggingface.co/facebook/musicgen-small
- **æ¼”ç¤º**ï¼šhttps://huggingface.co/spaces/facebook/MusicGen