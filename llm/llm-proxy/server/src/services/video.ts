import { execFile } from 'child_process';
import { promisify } from 'util';
import { readFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

const execFileAsync = promisify(execFile);

const FFMPEG_TIMEOUT_MS = 45_000;
const FFPROBE_TIMEOUT_MS = 10_000;
const MAX_BUFFER = 10 * 1024 * 1024;

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  codec: string;
  format: string;
}

export interface FrameOptions {
  height?: number;
  format?: 'jpg' | 'png';
  quality?: number;
}

async function runFfmpeg(args: string[], timeoutMs = FFMPEG_TIMEOUT_MS): Promise<string> {
  const { stdout } = await execFileAsync('ffmpeg', args, {
    timeout: timeoutMs,
    maxBuffer: MAX_BUFFER,
  });
  return stdout;
}

async function runFfprobe(args: string[]): Promise<string> {
  const { stdout } = await execFileAsync('ffprobe', args, {
    timeout: FFPROBE_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  });
  return stdout;
}

function tempPath(ext: string): string {
  return join(tmpdir(), `video-${randomUUID()}.${ext}`);
}

export async function detectFfmpeg(): Promise<string | null> {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const { stdout } = await execFileAsync('ffmpeg', ['-version'], { timeout: 5000 });
    return stdout.split('\n')[0];
  } catch {
    return null;
  }
}

export async function extractFirstFrame(videoPath: string, options?: FrameOptions): Promise<Buffer> {
  const ext = options?.format ?? 'jpg';
  const out = tempPath(ext);
  try {
    const args = ['-hide_banner', '-loglevel', 'error', '-y', '-i', videoPath, '-vframes', '1'];
    if (options?.height) args.push('-vf', `scale=-1:${options.height}`);
    if (ext === 'jpg' && options?.quality) args.push('-q:v', String(options.quality));
    args.push(out);
    await runFfmpeg(args);
    return readFile(out);
  } finally {
    await unlink(out).catch(() => {});
  }
}

export async function extractFrameAtTime(videoPath: string, timestamp: string, options?: FrameOptions): Promise<Buffer> {
  const ext = options?.format ?? 'jpg';
  const out = tempPath(ext);
  try {
    const args = ['-hide_banner', '-loglevel', 'error', '-y', '-ss', timestamp, '-i', videoPath, '-frames:v', '1'];
    if (options?.height) args.push('-vf', `scale=-1:${options.height}`);
    if (ext === 'jpg' && options?.quality) args.push('-q:v', String(options.quality));
    args.push(out);
    await runFfmpeg(args);
    return readFile(out);
  } finally {
    await unlink(out).catch(() => {});
  }
}

export async function extractFrameAtIndex(videoPath: string, index: number, options?: FrameOptions): Promise<Buffer> {
  const ext = options?.format ?? 'jpg';
  const out = tempPath(ext);
  try {
    const args = ['-hide_banner', '-loglevel', 'error', '-y', '-i', videoPath, '-vf', `select=eq(n\\,${index})`, '-vframes', '1'];
    if (options?.height) args.push('-vf', `select=eq(n\\,${index}),scale=-1:${options.height}`);
    if (ext === 'jpg' && options?.quality) args.push('-q:v', String(options.quality));
    args.push(out);
    await runFfmpeg(args);
    return readFile(out);
  } finally {
    await unlink(out).catch(() => {});
  }
}

export async function extractThumbnail(videoPath: string, options?: FrameOptions): Promise<Buffer> {
  const ext = options?.format ?? 'jpg';
  const out = tempPath(ext);
  const height = options?.height ?? 360;
  try {
    const args = [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-ss', '1',
      '-i', videoPath,
      '-vframes', '1',
      '-vf', `scale=-1:${height}`,
    ];
    if (ext === 'jpg' && options?.quality) args.push('-q:v', String(options.quality));
    args.push(out);
    await runFfmpeg(args);
    return readFile(out);
  } finally {
    await unlink(out).catch(() => {});
  }
}

export async function getVideoMetadata(videoPath: string): Promise<VideoMetadata> {
  const output = await runFfprobe([
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-show_entries', 'stream=codec_type,codec_name,width,height',
    '-of', 'json',
    videoPath,
  ]);
  const data = JSON.parse(output);
  const videoStream = data.streams?.find((s: any) => s.codec_type === 'video');
  return {
    duration: parseFloat(data.format?.duration ?? '0'),
    width: videoStream?.width ?? 0,
    height: videoStream?.height ?? 0,
    codec: videoStream?.codec_name ?? 'unknown',
    format: data.format?.format_name ?? 'unknown',
  };
}
