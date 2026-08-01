import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  detectFfmpeg,
  extractFirstFrame,
  extractFrameAtTime,
  extractFrameAtIndex,
  extractThumbnail,
  getVideoMetadata,
} from '../services/video.js';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

const router = Router();

router.get('/ffmpeg-status', async (_req: Request, res: Response) => {
  const status = await detectFfmpeg();
  res.json({ available: !!status, version: status });
});

router.post('/first-frame', async (req: Request, res: Response) => {
  try {
    const { videoPath, format, quality, height } = req.body;
    if (!videoPath) return res.status(400).json({ error: 'videoPath is required' });
    const buffer = await extractFirstFrame(videoPath, { format, quality, height });
    res.set({ 'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg', 'Content-Length': buffer.length.toString() });
    res.send(buffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Frame extraction failed' });
  }
});

router.post('/frame-at-time', async (req: Request, res: Response) => {
  try {
    const { videoPath, timestamp, format, quality, height } = req.body;
    if (!videoPath || !timestamp) return res.status(400).json({ error: 'videoPath and timestamp are required' });
    const buffer = await extractFrameAtTime(videoPath, timestamp, { format, quality, height });
    res.set({ 'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg', 'Content-Length': buffer.length.toString() });
    res.send(buffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Frame extraction failed' });
  }
});

router.post('/frame-at-index', async (req: Request, res: Response) => {
  try {
    const { videoPath, index, format, quality, height } = req.body;
    if (!videoPath || index === undefined) return res.status(400).json({ error: 'videoPath and index are required' });
    const buffer = await extractFrameAtIndex(videoPath, index, { format, quality, height });
    res.set({ 'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg', 'Content-Length': buffer.length.toString() });
    res.send(buffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Frame extraction failed' });
  }
});

router.post('/thumbnail', async (req: Request, res: Response) => {
  try {
    const { videoPath, format, quality, height } = req.body;
    if (!videoPath) return res.status(400).json({ error: 'videoPath is required' });
    const buffer = await extractThumbnail(videoPath, { format, quality, height });
    res.set({ 'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg', 'Content-Length': buffer.length.toString() });
    res.send(buffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Thumbnail extraction failed' });
  }
});

router.post('/metadata', async (req: Request, res: Response) => {
  try {
    const { videoPath } = req.body;
    if (!videoPath) return res.status(400).json({ error: 'videoPath is required' });
    const metadata = await getVideoMetadata(videoPath);
    res.json(metadata);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Metadata extraction failed' });
  }
});

export default router;
