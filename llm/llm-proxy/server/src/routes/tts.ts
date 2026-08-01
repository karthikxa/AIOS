import { Router } from 'express';
import type { Request, Response } from 'express';
import { synthesizeSpeech, getVoices } from '../services/tts.js';

const router = Router();

// GET /api/tts/voices - List available voices
router.get('/voices', (req: Request, res: Response) => {
  const voices = getVoices();
  res.json({ voices });
});

// POST /api/tts/synthesize - Synthesize speech
router.post('/synthesize', async (req: Request, res: Response) => {
  try {
    const { text, voice, rate, pitch, volume } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audioBuffer = await synthesizeSpeech({ text, voice, rate, pitch, volume });

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length.toString(),
    });
    res.send(audioBuffer);
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).json({ error: 'TTS synthesis failed' });
  }
});

// POST /api/tts/synthesize-json - Synthesize speech and return as JSON
router.post('/synthesize-json', async (req: Request, res: Response) => {
  try {
    const { text, voice, rate, pitch, volume } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audioBuffer = await synthesizeSpeech({ text, voice, rate, pitch, volume });
    const base64 = audioBuffer.toString('base64');

    res.json({
      audio: `data:audio/mpeg;base64,${base64}`,
      format: 'mp3',
      size: audioBuffer.length,
    });
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).json({ error: 'TTS synthesis failed' });
  }
});

export default router;
