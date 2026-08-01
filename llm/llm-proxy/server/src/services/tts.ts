import { EdgeTTS } from 'node-edge-tts';
import { PassThrough } from 'stream';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

export interface TTSOptions {
  text: string;
  voice?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
}

const DEFAULT_VOICE = 'en-US-AriaNeural';

const VOICE_LIST = [
  { name: 'en-US-AriaNeural', gender: 'Female', locale: 'en-US' },
  { name: 'en-US-GuyNeural', gender: 'Male', locale: 'en-US' },
  { name: 'en-US-JennyNeural', gender: 'Female', locale: 'en-US' },
  { name: 'en-GB-SoniaNeural', gender: 'Female', locale: 'en-GB' },
  { name: 'en-GB-RyanNeural', gender: 'Male', locale: 'en-GB' },
  { name: 'en-AU-NatashaNeural', gender: 'Female', locale: 'en-AU' },
  { name: 'en-IN-PrabhaNeural', gender: 'Female', locale: 'en-IN' },
  { name: 'en-IN-AditiNeural', gender: 'Female', locale: 'en-IN' },
  { name: 'ja-JP-NanamiNeural', gender: 'Female', locale: 'ja-JP' },
  { name: 'ja-JP-KeitaNeural', gender: 'Male', locale: 'ja-JP' },
  { name: 'ko-KR-SunHiNeural', gender: 'Female', locale: 'ko-KR' },
  { name: 'ko-KR-InJoonNeural', gender: 'Male', locale: 'ko-KR' },
  { name: 'zh-CN-XiaoxiaoNeural', gender: 'Female', locale: 'zh-CN' },
  { name: 'zh-CN-YunxiNeural', gender: 'Male', locale: 'zh-CN' },
  { name: 'hi-IN-SwaraNeural', gender: 'Female', locale: 'hi-IN' },
  { name: 'fr-FR-DeniseNeural', gender: 'Female', locale: 'fr-FR' },
  { name: 'de-DE-KatjaNeural', gender: 'Female', locale: 'de-DE' },
  { name: 'es-ES-ElviraNeural', gender: 'Female', locale: 'es-ES' },
  { name: 'pt-BR-FranciscaNeural', gender: 'Female', locale: 'pt-BR' },
  { name: 'ru-RU-SvetlanaNeural', gender: 'Female', locale: 'ru-RU' },
];

export function getVoices() {
  return VOICE_LIST;
}

export async function synthesizeSpeech(options: TTSOptions): Promise<Buffer> {
  const { text, voice = DEFAULT_VOICE, rate = '+0%', pitch = '+0Hz', volume = '+0%' } = options;

  const tts = new EdgeTTS({
    voice,
    rate,
    pitch,
    volume,
  });

  const tempFile = join(tmpdir(), `tts-${randomUUID()}.mp3`);

  try {
    await tts.ttsPromise(text, tempFile);
    const { readFile } = await import('fs/promises');
    const buffer = await readFile(tempFile);
    return buffer;
  } finally {
    await unlink(tempFile).catch(() => {});
  }
}

export async function synthesizeSpeechStream(options: TTSOptions): Promise<PassThrough> {
  const buffer = await synthesizeSpeech(options);
  const stream = new PassThrough();
  stream.end(buffer);
  return stream;
}
