---
sidebar_position: 9
title: "è¯­éŸ³ä¸Ž TTS"
description: "è·¨æ‰€æœ‰å¹³å°çš„æ–‡å­—è½¬è¯­éŸ³ä¸Žè¯­éŸ³æ¶ˆæ¯è½¬å½•"
---

# è¯­éŸ³ä¸Ž TTS

Zed Agent æ”¯æŒè·¨æ‰€æœ‰æ¶ˆæ¯å¹³å°çš„æ–‡å­—è½¬è¯­éŸ³ï¼ˆTTSï¼‰è¾“å‡ºå’Œè¯­éŸ³æ¶ˆæ¯è½¬å½•ï¼ˆSTTï¼‰ã€‚

:::tip Nous è®¢é˜…ç”¨æˆ·
å¦‚æžœä½ æ‹¥æœ‰ä»˜è´¹çš„ [Zed Portal](https://portal.zedteam.com) è®¢é˜…ï¼ŒOpenAI TTS å¯é€šè¿‡ **[Tool Gateway](tool-gateway.md)** ä½¿ç”¨ï¼Œæ— éœ€å•ç‹¬çš„ OpenAI API å¯†é’¥ã€‚æ–°å®‰è£…å¯è¿è¡Œ `zed setup --portal` ç™»å½•å¹¶ä¸€æ¬¡æ€§å¼€å¯æ‰€æœ‰ gateway å·¥å…·ï¼›å·²æœ‰å®‰è£…å¯é€šè¿‡ `zed model` æˆ– `zed tools` é€‰æ‹© **Nous Subscription** ä»…å¯ç”¨ TTSã€‚
:::

## æ–‡å­—è½¬è¯­éŸ³ï¼ˆTTSï¼‰

æ”¯æŒåä¸ªæä¾›å•†å°†æ–‡å­—è½¬æ¢ä¸ºè¯­éŸ³ï¼š

| æä¾›å•† | è´¨é‡ | è´¹ç”¨ | API å¯†é’¥ |
|----------|---------|------|---------|
| **Edge TTS**ï¼ˆé»˜è®¤ï¼‰ | è‰¯å¥½ | å…è´¹ | æ— éœ€ |
| **ElevenLabs** | ä¼˜ç§€ | ä»˜è´¹ | `ELEVENLABS_API_KEY` |
| **OpenAI TTS** | è‰¯å¥½ | ä»˜è´¹ | `VOICE_TOOLS_OPENAI_KEY` |
| **MiniMax TTS** | ä¼˜ç§€ | ä»˜è´¹ | `MINIMAX_API_KEY` |
| **Mistral (Voxtral TTS)** | ä¼˜ç§€ | ä»˜è´¹ | `MISTRAL_API_KEY` |
| **Google Gemini TTS** | ä¼˜ç§€ | å…è´¹é¢åº¦ | `GEMINI_API_KEY` |
| **xAI TTS** | ä¼˜ç§€ | ä»˜è´¹ | `XAI_API_KEY` |
| **NeuTTS** | è‰¯å¥½ | å…è´¹ï¼ˆæœ¬åœ°ï¼‰ | æ— éœ€ |
| **KittenTTS** | è‰¯å¥½ | å…è´¹ï¼ˆæœ¬åœ°ï¼‰ | æ— éœ€ |
| **Piper** | è‰¯å¥½ | å…è´¹ï¼ˆæœ¬åœ°ï¼‰ | æ— éœ€ |

### å¹³å°æŠ•é€’æ–¹å¼

| å¹³å° | æŠ•é€’æ–¹å¼ | æ ¼å¼ |
|----------|----------|--------|
| Telegram | è¯­éŸ³æ°”æ³¡ï¼ˆå†…è”æ’­æ”¾ï¼‰ | Opus `.ogg` |
| Discord | è¯­éŸ³æ°”æ³¡ï¼ˆOpus/OGGï¼‰ï¼Œå›žé€€ä¸ºæ–‡ä»¶é™„ä»¶ | Opus/MP3 |
| WhatsApp | éŸ³é¢‘æ–‡ä»¶é™„ä»¶ | MP3 |
| CLI | ä¿å­˜è‡³ `~/.zed/audio_cache/` | MP3 |

### é…ç½®

```yaml
# In ~/.zed/config.yaml
tts:
  provider: "edge"              # "edge" | "elevenlabs" | "openai" | "minimax" | "mistral" | "gemini" | "xai" | "neutts" | "kittentts" | "piper"
  speed: 1.0                    # Global speed multiplier (provider-specific settings override this)
  edge:
    voice: "en-US-AriaNeural"   # 322 voices, 74 languages
    speed: 1.0                  # Converted to rate percentage (+/-%)
  elevenlabs:
    voice_id: "pNInz6obpgDQGcFmaJgB"  # Adam
    model_id: "eleven_multilingual_v2"
  openai:
    model: "gpt-4o-mini-tts"
    voice: "alloy"              # alloy, echo, fable, onyx, nova, shimmer
    base_url: "https://api.openai.com/v1"  # Override for OpenAI-compatible TTS endpoints
    speed: 1.0                  # 0.25 - 4.0
  minimax:
    model: "speech-2.8-hd"     # speech-2.8-hd (default), speech-2.8-turbo
    voice_id: "English_Graceful_Lady"  # See https://platform.minimax.io/faq/system-voice-id
    speed: 1                    # 0.5 - 2.0
    vol: 1                      # 0 - 10
    pitch: 0                    # -12 - 12
  mistral:
    model: "voxtral-mini-tts-2603"
    voice_id: "c69964a6-ab8b-4f8a-9465-ec0925096ec8"  # Paul - Neutral (default)
  gemini:
    model: "gemini-2.5-flash-preview-tts"  # or gemini-2.5-pro-preview-tts
    voice: "Kore"               # 30 prebuilt voices: Zephyr, Puck, Kore, Enceladus, Gacrux, etc.
  xai:
    voice_id: "eve"             # or a custom voice ID â€” see docs below
    language: "en"              # ISO 639-1 code
    sample_rate: 24000          # 22050 / 24000 (default) / 44100 / 48000
    bit_rate: 128000            # MP3 bitrate; only applies when codec=mp3
    # base_url: "https://api.x.ai/v1"   # Override via XAI_BASE_URL env var
  neutts:
    ref_audio: ''
    ref_text: ''
    model: neuphonic/neutts-air-q4-gguf
    device: cpu
  kittentts:
    model: KittenML/kitten-tts-nano-0.8-int8   # 25MB int8; also: kitten-tts-micro-0.8 (41MB), kitten-tts-mini-0.8 (80MB)
    voice: Jasper                               # Jasper, Bella, Luna, Bruno, Rosie, Hugo, Kiki, Leo
    speed: 1.0                                  # 0.5 - 2.0
    clean_text: true                            # Expand numbers, currencies, units
  piper:
    voice: en_US-lessac-medium                  # voice name (auto-downloaded) OR absolute path to .onnx
    # voices_dir: ''                            # default: ~/.zed/cache/piper-voices/
    # use_cuda: false                           # requires onnxruntime-gpu
    # length_scale: 1.0                         # 2.0 = twice as slow
    # noise_scale: 0.667
    # noise_w_scale: 0.8
    # volume: 1.0                               # 0.5 = half as loud
    # normalize_audio: true
```

**é€Ÿåº¦æŽ§åˆ¶**ï¼šå…¨å±€ `tts.speed` å€¼é»˜è®¤åº”ç”¨äºŽæ‰€æœ‰æä¾›å•†ã€‚æ¯ä¸ªæä¾›å•†å¯ç”¨è‡ªèº«çš„ `speed` è®¾ç½®è¦†ç›–å®ƒï¼ˆä¾‹å¦‚ `tts.openai.speed: 1.5`ï¼‰ã€‚æä¾›å•†çº§åˆ«çš„é€Ÿåº¦ä¼˜å…ˆäºŽå…¨å±€å€¼ã€‚é»˜è®¤å€¼ä¸º `1.0`ï¼ˆæ­£å¸¸é€Ÿåº¦ï¼‰ã€‚


### è¾“å…¥é•¿åº¦é™åˆ¶

æ¯ä¸ªæä¾›å•†éƒ½æœ‰æ–‡æ¡£è®°å½•çš„å•æ¬¡è¯·æ±‚è¾“å…¥å­—ç¬¦ä¸Šé™ã€‚Zed åœ¨è°ƒç”¨æä¾›å•†å‰ä¼šæˆªæ–­æ–‡æœ¬ï¼Œç¡®ä¿è¯·æ±‚ä¸ä¼šå› é•¿åº¦é”™è¯¯è€Œå¤±è´¥ï¼š

| æä¾›å•† | é»˜è®¤ä¸Šé™ï¼ˆå­—ç¬¦æ•°ï¼‰ |
|----------|---------------------|
| Edge TTS | 5000 |
| OpenAI | 4096 |
| xAI | 15000 |
| MiniMax | 10000 |
| Mistral | 4000 |
| Google Gemini | 5000 |
| ElevenLabs | å–å†³äºŽæ¨¡åž‹ï¼ˆè§ä¸‹æ–‡ï¼‰ |
| NeuTTS | 2000 |
| KittenTTS | 2000 |

**ElevenLabs** æ ¹æ®é…ç½®çš„ `model_id` é€‰æ‹©ä¸Šé™ï¼š

| `model_id` | ä¸Šé™ï¼ˆå­—ç¬¦æ•°ï¼‰ |
|------------|-------------|
| `eleven_flash_v2_5` | 40000 |
| `eleven_flash_v2` | 30000 |
| `eleven_multilingual_v2`ï¼ˆé»˜è®¤ï¼‰ã€`eleven_multilingual_v1`ã€`eleven_english_sts_v2`ã€`eleven_english_sts_v1` | 10000 |
| `eleven_v3`ã€`eleven_ttv_v3` | 5000 |
| æœªçŸ¥æ¨¡åž‹ | å›žé€€è‡³æä¾›å•†é»˜è®¤å€¼ï¼ˆ10000ï¼‰ |

**æŒ‰æä¾›å•†è¦†ç›–**ï¼Œåœ¨ TTS é…ç½®çš„æä¾›å•†èŠ‚ä¸‹ä½¿ç”¨ `max_text_length:`ï¼š

```yaml
tts:
  openai:
    max_text_length: 8192   # raise or lower the provider cap
```

ä»…æŽ¥å—æ­£æ•´æ•°ã€‚é›¶ã€è´Ÿæ•°ã€éžæ•°å­—æˆ–å¸ƒå°”å€¼å°†å›žé€€è‡³æä¾›å•†é»˜è®¤å€¼ï¼Œå› æ­¤é”™è¯¯çš„é…ç½®ä¸ä¼šæ„å¤–ç¦ç”¨æˆªæ–­ã€‚

### Telegram è¯­éŸ³æ°”æ³¡ä¸Ž ffmpeg

Telegram è¯­éŸ³æ°”æ³¡éœ€è¦ Opus/OGG éŸ³é¢‘æ ¼å¼ï¼š

- **OpenAIã€ElevenLabs å’Œ Mistral** åŽŸç”Ÿè¾“å‡º Opusï¼Œæ— éœ€é¢å¤–é…ç½®
- **Edge TTS**ï¼ˆé»˜è®¤ï¼‰è¾“å‡º MP3ï¼Œéœ€è¦ **ffmpeg** è¿›è¡Œè½¬æ¢
- **MiniMax TTS** è¾“å‡º MP3ï¼Œéœ€è¦ **ffmpeg** è½¬æ¢ä»¥åœ¨ Telegram æ˜¾ç¤ºè¯­éŸ³æ°”æ³¡
- **Google Gemini TTS** è¾“å‡ºåŽŸå§‹ PCMï¼Œä½¿ç”¨ **ffmpeg** ç›´æŽ¥ç¼–ç ä¸º Opus ä»¥åœ¨ Telegram æ˜¾ç¤ºè¯­éŸ³æ°”æ³¡
- **xAI TTS** è¾“å‡º MP3ï¼Œéœ€è¦ **ffmpeg** è½¬æ¢ä»¥åœ¨ Telegram æ˜¾ç¤ºè¯­éŸ³æ°”æ³¡
- **NeuTTS** è¾“å‡º WAVï¼ŒåŒæ ·éœ€è¦ **ffmpeg** è½¬æ¢ä»¥åœ¨ Telegram æ˜¾ç¤ºè¯­éŸ³æ°”æ³¡
- **KittenTTS** è¾“å‡º WAVï¼ŒåŒæ ·éœ€è¦ **ffmpeg** è½¬æ¢ä»¥åœ¨ Telegram æ˜¾ç¤ºè¯­éŸ³æ°”æ³¡
- **Piper** è¾“å‡º WAVï¼ŒåŒæ ·éœ€è¦ **ffmpeg** è½¬æ¢ä»¥åœ¨ Telegram æ˜¾ç¤ºè¯­éŸ³æ°”æ³¡

```bash
# Ubuntu/Debian
sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Fedora
sudo dnf install ffmpeg
```

è‹¥æœªå®‰è£… ffmpegï¼ŒEdge TTSã€MiniMax TTSã€NeuTTSã€KittenTTS å’Œ Piper çš„éŸ³é¢‘å°†ä½œä¸ºæ™®é€šéŸ³é¢‘æ–‡ä»¶å‘é€ï¼ˆå¯æ’­æ”¾ï¼Œä½†æ˜¾ç¤ºä¸ºçŸ©å½¢æ’­æ”¾å™¨è€Œéžè¯­éŸ³æ°”æ³¡ï¼‰ã€‚

:::tip
å¦‚æžœä½ å¸Œæœ›åœ¨ä¸å®‰è£… ffmpeg çš„æƒ…å†µä¸‹ä½¿ç”¨è¯­éŸ³æ°”æ³¡ï¼Œè¯·åˆ‡æ¢è‡³ OpenAIã€ElevenLabs æˆ– Mistral æä¾›å•†ã€‚
:::

### xAI è‡ªå®šä¹‰å£°éŸ³ï¼ˆå£°éŸ³å…‹éš†ï¼‰

xAI æ”¯æŒå…‹éš†ä½ çš„å£°éŸ³å¹¶å°†å…¶ç”¨äºŽ TTSã€‚åœ¨ [xAI Console](https://console.x.ai/team/default/voice/voice-library) ä¸­åˆ›å»ºè‡ªå®šä¹‰å£°éŸ³ï¼Œç„¶åŽåœ¨é…ç½®ä¸­è®¾ç½®ç”Ÿæˆçš„ `voice_id`ï¼š

```yaml
tts:
  provider: xai
  xai:
    voice_id: "nlbqfwie"   # your custom voice ID
```

æœ‰å…³å½•åˆ¶ã€æ”¯æŒæ ¼å¼å’Œé™åˆ¶çš„è¯¦ç»†ä¿¡æ¯ï¼Œè¯·å‚é˜… [xAI Custom Voices æ–‡æ¡£](https://docs.x.ai/developers/model-capabilities/audio/custom-voices)ã€‚

### Piperï¼ˆæœ¬åœ°ï¼Œæ”¯æŒ 44 ç§è¯­è¨€ï¼‰

Piper æ˜¯æ¥è‡ª Open Home Foundationï¼ˆHome Assistant ç»´æŠ¤è€…ï¼‰çš„å¿«é€Ÿæœ¬åœ°ç¥žç»ç½‘ç»œ TTS å¼•æ“Žã€‚å®ƒå®Œå…¨åœ¨ CPU ä¸Šè¿è¡Œï¼Œæ”¯æŒ **44 ç§è¯­è¨€**çš„é¢„è®­ç»ƒå£°éŸ³ï¼Œæ— éœ€ API å¯†é’¥ã€‚

**é€šè¿‡ `zed tools` å®‰è£…** â†’ Voice & TTS â†’ Piper â€” Zed ä¼šè‡ªåŠ¨ä¸ºä½ è¿è¡Œ `pip install piper-tts`ã€‚æˆ–æ‰‹åŠ¨å®‰è£…ï¼š`pip install piper-tts`ã€‚

**åˆ‡æ¢è‡³ Piperï¼š**

```yaml
tts:
  provider: piper
  piper:
    voice: en_US-lessac-medium
```

é¦–æ¬¡å¯¹æœªåœ¨æœ¬åœ°ç¼“å­˜çš„å£°éŸ³è¿›è¡Œ TTS è°ƒç”¨æ—¶ï¼ŒZed ä¼šè¿è¡Œ `python -m piper.download_voices <name>` å¹¶å°†æ¨¡åž‹ï¼ˆçº¦ 20-90MBï¼Œå–å†³äºŽè´¨é‡ç­‰çº§ï¼‰ä¸‹è½½è‡³ `~/.zed/cache/piper-voices/`ã€‚åŽç»­è°ƒç”¨å°†å¤ç”¨å·²ç¼“å­˜çš„æ¨¡åž‹ã€‚

**é€‰æ‹©å£°éŸ³ã€‚** [å®Œæ•´å£°éŸ³ç›®å½•](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/VOICES.md) æ¶µç›–è‹±è¯­ã€è¥¿ç­ç‰™è¯­ã€æ³•è¯­ã€å¾·è¯­ã€æ„å¤§åˆ©è¯­ã€è·å…°è¯­ã€è‘¡è„ç‰™è¯­ã€ä¿„è¯­ã€æ³¢å…°è¯­ã€åœŸè€³å…¶è¯­ã€ä¸­æ–‡ã€é˜¿æ‹‰ä¼¯è¯­ã€å°åœ°è¯­ç­‰â€”â€”æ¯ç§è¯­è¨€å‡æœ‰ `x_low` / `low` / `medium` / `high` è´¨é‡ç­‰çº§ã€‚å¯åœ¨ [rhasspy.github.io/piper-samples](https://rhasspy.github.io/piper-samples/) è¯•å¬å£°éŸ³æ ·æœ¬ã€‚

**ä½¿ç”¨é¢„ä¸‹è½½çš„å£°éŸ³ã€‚** å°† `tts.piper.voice` è®¾ç½®ä¸ºä»¥ `.onnx` ç»“å°¾çš„ç»å¯¹è·¯å¾„ï¼š

```yaml
tts:
  piper:
    voice: /path/to/my-custom-voice.onnx
```

**é«˜çº§å‚æ•°**ï¼ˆ`tts.piper.length_scale` / `noise_scale` / `noise_w_scale` / `volume` / `normalize_audio`ã€`use_cuda`ï¼‰ä¸Ž Piper çš„ `SynthesisConfig` ä¸€ä¸€å¯¹åº”ã€‚åœ¨è¾ƒæ—§çš„ `piper-tts` ç‰ˆæœ¬ä¸Šè¿™äº›å‚æ•°ä¼šè¢«å¿½ç•¥ã€‚

### è‡ªå®šä¹‰å‘½ä»¤æä¾›å•†

å¦‚æžœä½ æƒ³ä½¿ç”¨çš„ TTS å¼•æ“Žæœªè¢«åŽŸç”Ÿæ”¯æŒï¼ˆVoxCPMã€MLX-Kokoroã€XTTS CLIã€å£°éŸ³å…‹éš†è„šæœ¬ï¼Œæˆ–ä»»ä½•å…¶ä»–æš´éœ² CLI çš„å¼•æ“Žï¼‰ï¼Œä½ å¯ä»¥å°†å…¶ä½œä¸º**å‘½ä»¤ç±»åž‹æä¾›å•†**æŽ¥å…¥ï¼Œæ— éœ€ç¼–å†™ä»»ä½• Python ä»£ç ã€‚Zed å°†è¾“å…¥æ–‡æœ¬å†™å…¥ä¸´æ—¶ UTF-8 æ–‡ä»¶ï¼Œè¿è¡Œä½ çš„ shell å‘½ä»¤ï¼Œå¹¶è¯»å–å‘½ä»¤ç”Ÿæˆçš„éŸ³é¢‘æ–‡ä»¶ã€‚

åœ¨ `tts.providers.<name>` ä¸‹å£°æ˜Žä¸€ä¸ªæˆ–å¤šä¸ªæä¾›å•†ï¼Œå¹¶é€šè¿‡ `tts.provider: <name>` åœ¨å®ƒä»¬ä¹‹é—´åˆ‡æ¢â€”â€”ä¸Žåˆ‡æ¢ `edge` å’Œ `openai` ç­‰å†…ç½®æä¾›å•†çš„æ–¹å¼ç›¸åŒã€‚

```yaml
tts:
  provider: voxcpm                 # pick any name under tts.providers
  providers:
    voxcpm:
      type: command
      command: "voxcpm --ref ~/voice.wav --text-file {input_path} --out {output_path}"
      output_format: mp3
      timeout: 180
      voice_compatible: true       # try to deliver as a Telegram voice bubble

    mlx-kokoro:
      type: command
      command: "python -m mlx_kokoro --in {input_path} --out {output_path} --voice {voice}"
      voice: af_sky
      output_format: wav

    piper-custom:                  # native Piper also supports custom .onnx via tts.piper.voice
      type: command
      command: "piper -m /path/to/custom.onnx -f {output_path} < {input_path}"
      output_format: wav
```

#### ç¤ºä¾‹ï¼šDoubaoï¼ˆä¸­æ–‡ seed-tts-2.0ï¼‰

å¦‚éœ€é€šè¿‡å­—èŠ‚è·³åŠ¨çš„ [seed-tts-2.0](https://www.volcengine.com/docs/6561/1257544) åŒå‘æµå¼ API å®žçŽ°é«˜è´¨é‡ä¸­æ–‡ TTSï¼Œè¯·å®‰è£… [`doubao-speech`](https://pypi.org/project/doubao-speech/) PyPI åŒ…å¹¶å°†å…¶ä½œä¸ºå‘½ä»¤æä¾›å•†æŽ¥å…¥ï¼š

```bash
pip install doubao-speech
export VOLCENGINE_APP_ID="your-app-id"
export VOLCENGINE_ACCESS_TOKEN="your-access-token"
```

```yaml
tts:
  provider: doubao
  providers:
    doubao:
      type: command
      command: "doubao-speech say --text-file {input_path} --out {output_path}"
      output_format: mp3
      max_text_length: 1024
      timeout: 30
```

å‡­æ®æ¥è‡ªä½ çš„ shell çŽ¯å¢ƒï¼ˆ`VOLCENGINE_APP_ID` / `VOLCENGINE_ACCESS_TOKEN`ï¼‰æˆ– `~/.doubao-speech/config.yaml`ã€‚é€šè¿‡åœ¨å‘½ä»¤ä¸­æ·»åŠ  `--voice zh-female-warm`ï¼ˆæˆ– `doubao-speech list-voices` ä¸­çš„ä»»ä½•å…¶ä»–åˆ«åï¼‰æ¥é€‰æ‹©å£°éŸ³ã€‚`doubao-speech` è¿˜å†…ç½®äº†æµå¼ ASRâ€”â€”æœ‰å…³ Zed é›†æˆï¼Œè¯·å‚é˜…[ä¸‹æ–¹çš„ STT ç« èŠ‚](#example-doubao--volcengine-asr)ã€‚æºç å’Œå®Œæ•´æ–‡æ¡£ï¼š[github.com/Hypnus-Yuan/doubao-speech](https://github.com/Hypnus-Yuan/doubao-speech)ã€‚

#### å ä½ç¬¦

ä½ çš„å‘½ä»¤æ¨¡æ¿å¯ä»¥å¼•ç”¨ä»¥ä¸‹å ä½ç¬¦ã€‚Zed åœ¨æ¸²æŸ“æ—¶ä¼šæ›¿æ¢å®ƒä»¬ï¼Œå¹¶æ ¹æ®ä¸Šä¸‹æ–‡ï¼ˆè£¸å€¼ / å•å¼•å· / åŒå¼•å·ï¼‰å¯¹æ¯ä¸ªå€¼è¿›è¡Œ shell è½¬ä¹‰ï¼Œå› æ­¤åŒ…å«ç©ºæ ¼å’Œå…¶ä»– shell æ•æ„Ÿå­—ç¬¦çš„è·¯å¾„æ˜¯å®‰å…¨çš„ã€‚

| å ä½ç¬¦ | å«ä¹‰ |
|------------------|------------------------------------------------------|
| `{input_path}` | Zed å†™å…¥çš„ä¸´æ—¶ UTF-8 æ–‡æœ¬æ–‡ä»¶è·¯å¾„ |
| `{text_path}` | `{input_path}` çš„åˆ«å |
| `{output_path}` | å‘½ä»¤å¿…é¡»å†™å…¥éŸ³é¢‘çš„è·¯å¾„ |
| `{format}` | `mp3` / `wav` / `ogg` / `flac` |
| `{voice}` | `tts.providers.<name>.voice`ï¼Œæœªè®¾ç½®æ—¶ä¸ºç©º |
| `{model}` | `tts.providers.<name>.model` |
| `{speed}` | è§£æžåŽçš„é€Ÿåº¦å€çŽ‡ï¼ˆæä¾›å•†çº§åˆ«æˆ–å…¨å±€ï¼‰ |

ä½¿ç”¨ `{{` å’Œ `}}` è¡¨ç¤ºå­—é¢å¤§æ‹¬å·ã€‚

#### å¯é€‰é”®

| é”® | é»˜è®¤å€¼ | å«ä¹‰ |
|--------------------|---------|------------------------------------------------------------------------------------------------------------|
| `timeout` | `120` | ç§’æ•°ï¼›è¶…æ—¶åŽè¿›ç¨‹æ ‘å°†è¢«ç»ˆæ­¢ï¼ˆUnix `killpg`ï¼ŒWindows `taskkill /T`ï¼‰ã€‚ |
| `output_format` | `mp3` | `mp3` / `wav` / `ogg` / `flac` ä¹‹ä¸€ã€‚è‹¥ Zed é€‰æ‹©è·¯å¾„ï¼Œåˆ™ä»Žè¾“å‡ºæ‰©å±•åè‡ªåŠ¨æŽ¨æ–­ã€‚ |
| `voice_compatible` | `false` | ä¸º `true` æ—¶ï¼ŒZed é€šè¿‡ ffmpeg å°† MP3/WAV è¾“å‡ºè½¬æ¢ä¸º Opus/OGGï¼Œä½¿ Telegram æ¸²æŸ“è¯­éŸ³æ°”æ³¡ã€‚ |
| `max_text_length` | `5000` | æ¸²æŸ“å‘½ä»¤å‰ï¼Œè¾“å…¥å°†è¢«æˆªæ–­è‡³æ­¤é•¿åº¦ã€‚ |
| `voice` / `model` | ç©º | ä»…ä½œä¸ºå ä½ç¬¦å€¼ä¼ é€’ç»™å‘½ä»¤ã€‚ |

#### è¡Œä¸ºè¯´æ˜Ž

- **å†…ç½®åç§°å§‹ç»ˆä¼˜å…ˆã€‚** `tts.providers.openai` æ¡ç›®æ°¸è¿œä¸ä¼šè¦†ç›–åŽŸç”Ÿ OpenAI æä¾›å•†ï¼Œå› æ­¤ä»»ä½•ç”¨æˆ·é…ç½®éƒ½æ— æ³•é™é»˜æ›¿æ¢å†…ç½®æä¾›å•†ã€‚
- **é»˜è®¤æŠ•é€’æ–¹å¼ä¸ºæ–‡æ¡£ã€‚** å‘½ä»¤æä¾›å•†åœ¨æ‰€æœ‰å¹³å°ä¸Šå‡ä»¥æ™®é€šéŸ³é¢‘é™„ä»¶æŠ•é€’ã€‚é€šè¿‡ `voice_compatible: true` æŒ‰æä¾›å•†é€‰æ‹©åŠ å…¥è¯­éŸ³æ°”æ³¡æŠ•é€’ã€‚
- **å‘½ä»¤å¤±è´¥ä¼šæš´éœ²ç»™ Agentã€‚** éžé›¶é€€å‡ºç ã€ç©ºè¾“å‡ºæˆ–è¶…æ—¶å‡ä¼šè¿”å›žåŒ…å«å‘½ä»¤ stderr/stdout çš„é”™è¯¯ï¼Œä¾¿äºŽä½ ä»Žå¯¹è¯ä¸­è°ƒè¯•æä¾›å•†ã€‚
- **è®¾ç½®äº† `command:` æ—¶ï¼Œ`type: command` ä¸ºé»˜è®¤å€¼ã€‚** æ˜¾å¼å†™å‡º `type: command` æ˜¯è‰¯å¥½å®žè·µï¼Œä½†éžå¿…é¡»ï¼›åŒ…å«éžç©º `command` å­—ç¬¦ä¸²çš„æ¡ç›®ä¼šè¢«è§†ä¸ºå‘½ä»¤æä¾›å•†ã€‚
- **`{input_path}` / `{text_path}` å¯äº’æ¢ã€‚** ä½¿ç”¨åœ¨ä½ çš„å‘½ä»¤ä¸­è¯»èµ·æ¥æ›´è‡ªç„¶çš„é‚£ä¸ªã€‚

#### å®‰å…¨æ€§

å‘½ä»¤ç±»åž‹æä¾›å•†ä¼šä»¥ä½ çš„ç”¨æˆ·æƒé™è¿è¡Œä½ é…ç½®çš„ä»»ä½• shell å‘½ä»¤ã€‚Zed ä¼šå¯¹å ä½ç¬¦å€¼è¿›è¡Œè½¬ä¹‰å¹¶å¼ºåˆ¶æ‰§è¡Œé…ç½®çš„è¶…æ—¶ï¼Œä½†å‘½ä»¤æ¨¡æ¿æœ¬èº«æ˜¯å—ä¿¡ä»»çš„æœ¬åœ°è¾“å…¥â€”â€”è¯·åƒå¯¹å¾… PATH ä¸­çš„ shell è„šæœ¬ä¸€æ ·å¯¹å¾…å®ƒã€‚

### Python æ’ä»¶æä¾›å•†

å¯¹äºŽæ— æ³•ç”¨å•ä¸ª shell å‘½ä»¤è¡¨è¾¾çš„ TTS å¼•æ“Žâ€”â€”æ²¡æœ‰ CLI çš„ Python SDKã€æµå¼å¼•æ“Žã€å£°éŸ³åˆ—è¡¨ APIã€OAuth åˆ·æ–°è®¤è¯â€”â€”å¯é€šè¿‡ `ctx.register_tts_provider()` æ³¨å†Œ Python æ’ä»¶ã€‚è¯¥æ’ä»¶ä¸Ž[è‡ªå®šä¹‰å‘½ä»¤æä¾›å•†](#custom-command-providers)æ³¨å†Œè¡¨**å…±å­˜**ï¼ˆä¸æ›¿æ¢ï¼‰ï¼›é€‰æ‹©é€‚åˆä½ å¼•æ“Žçš„æŽ¥å…¥æ–¹å¼ã€‚

#### å¦‚ä½•é€‰æ‹©

| ä½ çš„åŽç«¯å…·æœ‰â€¦ | ä½¿ç”¨ |
|---|---|
| å•ä¸ª CLIï¼Œä»Žæ–‡ä»¶/stdin è¯»å–æ–‡æœ¬å¹¶å°†éŸ³é¢‘å†™å…¥æ–‡ä»¶/stdout | **å‘½ä»¤æä¾›å•†**ï¼ˆæ— éœ€ Pythonï¼‰ |
| ä¸¤ä¸‰ä¸ªé€šè¿‡ shell ç®¡é“ä¸²è”çš„ CLI | **å‘½ä»¤æä¾›å•†** |
| ä»…æœ‰ Python SDKï¼Œæ²¡æœ‰ CLI | **æ’ä»¶** |
| ä½ å¸Œæœ›åˆ†å—æŠ•é€’çš„æµå¼å­—èŠ‚ï¼ˆç”Ÿæˆä¸­çš„è¯­éŸ³æ°”æ³¡ï¼‰ | **æ’ä»¶**ï¼ˆè¦†ç›– `stream()`ï¼‰ |
| `zed setup` ä½¿ç”¨çš„å£°éŸ³åˆ—è¡¨ API | **æ’ä»¶**ï¼ˆè¦†ç›– `list_voices()`ï¼‰ |
| OAuth åˆ·æ–°æµç¨‹ï¼ˆéžé™æ€ bearer tokenï¼‰ | **æ’ä»¶** |

å†…ç½®æä¾›å•†å§‹ç»ˆä¼˜å…ˆï¼Œå‘½ä»¤æä¾›å•†ä¼˜å…ˆäºŽåŒåæ’ä»¶â€”â€”å› æ­¤æ’ä»¶å¯ä»¥å®‰å…¨åœ°æ³¨å†Œä»»ä½•éžå†…ç½®åç§°ï¼Œæ— éœ€æ‹…å¿ƒè¦†ç›–çŽ°æœ‰é…ç½®ã€‚

#### æœ€å°æ’ä»¶

å°†ä»¥ä¸‹å†…å®¹æ”¾å…¥ `~/.zed/plugins/my-tts/`ï¼š

`plugin.yaml`ï¼š
```yaml
name: my-tts
version: 0.1.0
description: "My custom Python TTS backend"
```

`__init__.py`ï¼š
```python
from agent.tts_provider import TTSProvider


class MyTTSProvider(TTSProvider):
    @property
    def name(self) -> str:
        return "my-tts"  # what tts.provider matches against

    @property
    def display_name(self) -> str:
        return "My Custom TTS"

    def is_available(self) -> bool:
        # Return False when credentials/deps are missing â€” picker skips
        # this row but the dispatcher still routes here on explicit config.
        import os
        return bool(os.environ.get("MY_TTS_API_KEY"))

    def synthesize(self, text, output_path, *, voice=None, model=None,
                   speed=None, format="mp3", **extra) -> str:
        # Write audio bytes to output_path, return the path.
        # Raise on failure â€” the dispatcher converts exceptions to a
        # standard error envelope.
        import my_tts_sdk
        client = my_tts_sdk.Client()
        audio_bytes = client.synthesize(text=text, voice=voice or "default")
        with open(output_path, "wb") as f:
            f.write(audio_bytes)
        return output_path


def register(ctx):
    ctx.register_tts_provider(MyTTSProvider())
```

å¯ç”¨å®ƒï¼ˆ`zed plugins enable my-tts`ï¼‰ï¼Œå°† `tts.provider` æŒ‡å‘å®ƒï¼ˆåœ¨ `config.yaml` ä¸­è®¾ç½® `tts.provider: my-tts`ï¼‰ï¼Œ`text_to_speech` å·¥å…·å°†é€šè¿‡ä½ çš„æ’ä»¶è·¯ç”±ã€‚

#### å¯é€‰ hook

åœ¨ä½ çš„æä¾›å•†ç±»ä¸Šè¦†ç›–ä»¥ä¸‹æ–¹æ³•ä»¥èŽ·å¾—æ›´ä¸°å¯Œçš„é›†æˆï¼š

- `list_voices()` â†’ è¿”å›ž `{id, display, language, gender, preview_url}` å­—å…¸åˆ—è¡¨ï¼Œæ˜¾ç¤ºåœ¨ `zed tools` ä¸­ã€‚
- `list_models()` â†’ è¿”å›ž `{id, display, languages, max_text_length}` å­—å…¸åˆ—è¡¨ã€‚
- `get_setup_schema()` â†’ è¿”å›ž `{name, badge, tag, env_vars: [{key, prompt, url}]}` ä»¥é©±åŠ¨ `zed tools` / `zed setup` ä¸­çš„é€‰æ‹©å™¨è¡Œã€‚è‹¥ä¸æä¾›ï¼Œæ’ä»¶ä»å¯æ­£å¸¸å·¥ä½œï¼Œä½†å…¶åœ¨é€‰æ‹©å™¨ä¸­çš„è¡Œä¿¡æ¯ä¼šå¾ˆç®€ç•¥ã€‚
- `stream(text, *, voice, model, format, **extra)` â†’ è¿­ä»£å™¨ï¼Œäº§å‡ºéŸ³é¢‘å­—èŠ‚ç”¨äºŽæµå¼æŠ•é€’ï¼ˆé»˜è®¤æŠ›å‡º `NotImplementedError`ï¼‰ã€‚
- `voice_compatible` å±žæ€§ â†’ è‹¥ä½ çš„è¾“å‡ºä¸Ž Opus å…¼å®¹ä¸” gateway åº”å°†å…¶ä½œä¸ºè¯­éŸ³æ°”æ³¡æŠ•é€’ï¼Œåˆ™è®¾ä¸º `True`ï¼ˆé»˜è®¤ `False` = æ™®é€šéŸ³é¢‘é™„ä»¶ï¼‰ã€‚

å®Œæ•´çš„æŠ½è±¡åŸºç±»ï¼ˆå«æ–‡æ¡£å­—ç¬¦ä¸²ï¼‰è¯·å‚é˜… `agent/tts_provider.py`ã€‚

## è¯­éŸ³æ¶ˆæ¯è½¬å½•ï¼ˆSTTï¼‰

åœ¨ Telegramã€Discordã€WhatsAppã€Slack æˆ– Signal ä¸Šå‘é€çš„è¯­éŸ³æ¶ˆæ¯ä¼šè¢«è‡ªåŠ¨è½¬å½•å¹¶ä½œä¸ºæ–‡æœ¬æ³¨å…¥å¯¹è¯ã€‚Agent å°†è½¬å½•å†…å®¹è§†ä¸ºæ™®é€šæ–‡æœ¬ã€‚

| æä¾›å•† | è´¨é‡ | è´¹ç”¨ | API å¯†é’¥ |
|----------|---------|------|---------| 
| **æœ¬åœ° Whisper**ï¼ˆé»˜è®¤ï¼‰ | è‰¯å¥½ | å…è´¹ | æ— éœ€ |
| **Groq Whisper API** | è‰¯å¥½è‡³æœ€ä½³ | å…è´¹é¢åº¦ | `GROQ_API_KEY` |
| **OpenAI Whisper API** | è‰¯å¥½è‡³æœ€ä½³ | ä»˜è´¹ | `VOICE_TOOLS_OPENAI_KEY` æˆ– `OPENAI_API_KEY` |

:::info é›¶é…ç½®
å®‰è£…äº† `faster-whisper` åŽï¼Œæœ¬åœ°è½¬å½•å³å¯å¼€ç®±å³ç”¨ã€‚è‹¥ä¸å¯ç”¨ï¼ŒZed ä¹Ÿå¯ä½¿ç”¨å¸¸è§å®‰è£…ä½ç½®ï¼ˆå¦‚ `/opt/homebrew/bin`ï¼‰çš„æœ¬åœ° `whisper` CLIï¼Œæˆ–é€šè¿‡ `ZED_LOCAL_STT_COMMAND` æŒ‡å®šçš„è‡ªå®šä¹‰å‘½ä»¤ã€‚
:::

### é…ç½®

```yaml
# In ~/.zed/config.yaml
stt:
  provider: "local"           # "local" | "groq" | "openai" | "mistral" | "xai"
  local:
    model: "base"             # tiny, base, small, medium, large-v3
  openai:
    model: "whisper-1"        # whisper-1, gpt-4o-mini-transcribe, gpt-4o-transcribe
  mistral:
    model: "voxtral-mini-latest"  # voxtral-mini-latest, voxtral-mini-2602
  xai:
    model: "grok-stt"         # xAI Grok STT
```

### æä¾›å•†è¯¦æƒ…

**æœ¬åœ°ï¼ˆfaster-whisperï¼‰** â€” é€šè¿‡ [faster-whisper](https://github.com/SYSTRAN/faster-whisper) åœ¨æœ¬åœ°è¿è¡Œ Whisperã€‚é»˜è®¤ä½¿ç”¨ CPUï¼Œæœ‰ GPU æ—¶ä½¿ç”¨ GPUã€‚æ¨¡åž‹å¤§å°ï¼š

| æ¨¡åž‹ | å¤§å° | é€Ÿåº¦ | è´¨é‡ |
|-------|------|-------|---------|
| `tiny` | ~75 MB | æœ€å¿« | åŸºç¡€ |
| `base` | ~150 MB | å¿« | è‰¯å¥½ï¼ˆé»˜è®¤ï¼‰ |
| `small` | ~500 MB | ä¸­ç­‰ | è¾ƒå¥½ |
| `medium` | ~1.5 GB | è¾ƒæ…¢ | ä¼˜ç§€ |
| `large-v3` | ~3 GB | æœ€æ…¢ | æœ€ä½³ |

**Groq API** â€” éœ€è¦ `GROQ_API_KEY`ã€‚å½“ä½ éœ€è¦å…è´¹æ‰˜ç®¡ STT é€‰é¡¹æ—¶ï¼Œæ˜¯è‰¯å¥½çš„äº‘ç«¯å¤‡é€‰æ–¹æ¡ˆã€‚

**OpenAI API** â€” ä¼˜å…ˆä½¿ç”¨ `VOICE_TOOLS_OPENAI_KEY`ï¼Œå›žé€€è‡³ `OPENAI_API_KEY`ã€‚æ”¯æŒ `whisper-1`ã€`gpt-4o-mini-transcribe` å’Œ `gpt-4o-transcribe`ã€‚

**Mistral APIï¼ˆVoxtral Transcribeï¼‰** â€” éœ€è¦ `MISTRAL_API_KEY`ã€‚ä½¿ç”¨ Mistral çš„ [Voxtral Transcribe](https://docs.mistral.ai/capabilities/audio/speech_to_text/) æ¨¡åž‹ã€‚æ”¯æŒ 13 ç§è¯­è¨€ã€è¯´è¯äººåˆ†ç¦»å’Œè¯çº§æ—¶é—´æˆ³ã€‚é€šè¿‡ `pip install zed-agent[mistral]` å®‰è£…ã€‚

**xAI Grok STT** â€” éœ€è¦ `XAI_API_KEY`ã€‚ä»¥ multipart/form-data æ ¼å¼å‘é€è‡³ `https://api.x.ai/v1/stt`ã€‚å¦‚æžœä½ å·²åœ¨ä½¿ç”¨ xAI è¿›è¡ŒèŠå¤©æˆ– TTS å¹¶å¸Œæœ›ä¸€ä¸ª API å¯†é’¥æžå®šä¸€åˆ‡ï¼Œè¿™æ˜¯ä¸ªå¥½é€‰æ‹©ã€‚è‡ªåŠ¨æ£€æµ‹é¡ºåºå°†å…¶æŽ’åœ¨ Groq ä¹‹åŽâ€”â€”æ˜¾å¼è®¾ç½® `stt.provider: xai` å¯å¼ºåˆ¶ä½¿ç”¨ã€‚

**è‡ªå®šä¹‰æœ¬åœ° CLI å›žé€€** â€” è‹¥ä½ å¸Œæœ› Zed ç›´æŽ¥è°ƒç”¨æœ¬åœ°è½¬å½•å‘½ä»¤ï¼Œè¯·è®¾ç½® `ZED_LOCAL_STT_COMMAND`ã€‚å‘½ä»¤æ¨¡æ¿æ”¯æŒ `{input_path}`ã€`{output_dir}`ã€`{language}` å’Œ `{model}` å ä½ç¬¦ã€‚ä½ çš„å‘½ä»¤å¿…é¡»åœ¨ `{output_dir}` ä¸‹æŸå¤„å†™å…¥ `.txt` è½¬å½•æ–‡ä»¶ã€‚

#### ç¤ºä¾‹ï¼šDoubao / Volcengine ASR

å¦‚æžœä½ ä½¿ç”¨ [`doubao-speech`](https://pypi.org/project/doubao-speech/) è¿›è¡Œ Doubao TTSï¼ˆè§[ä¸Šæ–‡](#example-doubao-chinese-seed-tts-20)ï¼‰ï¼ŒåŒä¸€ä¸ªåŒ…ä¹Ÿå¯é€šè¿‡æœ¬åœ°å‘½ä»¤ STT æŽ¥å£å¤„ç†è¯­éŸ³è½¬æ–‡å­—ï¼š

```bash
pip install doubao-speech
export VOLCENGINE_APP_ID="your-app-id"
export VOLCENGINE_ACCESS_TOKEN="your-access-token"
export ZED_LOCAL_STT_COMMAND='doubao-speech transcribe {input_path} --out {output_dir}/transcript.txt'
```

```yaml
stt:
  provider: local_command
```

Zed å°†ä¼ å…¥çš„è¯­éŸ³æ¶ˆæ¯å†™å…¥ `{input_path}`ï¼Œè¿è¡Œå‘½ä»¤ï¼Œå¹¶è¯»å– `{output_dir}` ä¸‹ç”Ÿæˆçš„ `.txt` æ–‡ä»¶ã€‚è¯­è¨€ç”± Volcengine bigmodel ç«¯ç‚¹è‡ªåŠ¨æ£€æµ‹ã€‚

### å›žé€€è¡Œä¸º

è‹¥é…ç½®çš„æä¾›å•†ä¸å¯ç”¨ï¼ŒZed ä¼šè‡ªåŠ¨å›žé€€ï¼š
- **æœ¬åœ° faster-whisper ä¸å¯ç”¨** â†’ åœ¨äº‘ç«¯æä¾›å•†ä¹‹å‰å°è¯•æœ¬åœ° `whisper` CLI æˆ– `ZED_LOCAL_STT_COMMAND`
- **æœªè®¾ç½® Groq å¯†é’¥** â†’ å›žé€€è‡³æœ¬åœ°è½¬å½•ï¼Œç„¶åŽæ˜¯ OpenAI
- **æœªè®¾ç½® OpenAI å¯†é’¥** â†’ å›žé€€è‡³æœ¬åœ°è½¬å½•ï¼Œç„¶åŽæ˜¯ Groq
- **æœªè®¾ç½® Mistral å¯†é’¥/SDK** â†’ åœ¨è‡ªåŠ¨æ£€æµ‹ä¸­è·³è¿‡ï¼›å›žé€€è‡³ä¸‹ä¸€ä¸ªå¯ç”¨æä¾›å•†
- **æ— å¯ç”¨æä¾›å•†** â†’ è¯­éŸ³æ¶ˆæ¯ç›´æŽ¥ä¼ é€’ï¼Œå¹¶å‘ç”¨æˆ·ç»™å‡ºå‡†ç¡®è¯´æ˜Ž
