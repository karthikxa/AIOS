import { createWriteStream, existsSync, readdirSync, renameSync, unlinkSync, statSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export interface RollingLoggerOptions {
  filePath: string;
  maxBytes?: number;
  maxBackups?: number;
}

export function createRollingLogger(options: RollingLoggerOptions) {
  const { filePath, maxBytes = 500 * 1024 * 1024, maxBackups = 1 } = options;
  const dir = join(filePath, '..');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  let stream: ReturnType<typeof createWriteStream> | null = null;
  let currentSize = 0;

  function rotate() {
    if (stream) { stream.end(); stream = null; }
    for (let i = maxBackups; i >= 1; i--) {
      const from = i === 1 ? filePath : `${filePath}.${i}`;
      const to = `${filePath}.${i + 1}`;
      if (existsSync(from)) {
        if (i === maxBackups) { try { unlinkSync(from); } catch {} }
        else { try { renameSync(from, to); } catch {} }
      }
    }
    try { renameSync(filePath, `${filePath}.1`); } catch {}
    currentSize = 0;
    openStream();
  }

  function openStream() {
    stream = createWriteStream(filePath, { flags: 'a' });
    try { currentSize = statSync(filePath).size; } catch { currentSize = 0; }
  }

  function write(entry: Record<string, unknown>) {
    const line = JSON.stringify({ ...entry, timestamp: new Date().toISOString() }) + '\n';
    const bytes = Buffer.byteLength(line);
    if (currentSize + bytes > maxBytes) rotate();
    if (!stream) openStream();
    stream!.write(line);
    currentSize += bytes;
  }

  function close() { if (stream) { stream.end(); stream = null; } }

  return { write, close };
}

export class MessageQueue<T> {
  private messages: T[] = [];
  private waiters: Array<{ resolve: (value: IteratorResult<T>) => void }> = [];
  private isClosed = false;
  private readPosition = 0;

  push(msg: T): void {
    if (this.isClosed) return;
    this.messages.push(msg);
    if (this.waiters.length > 0) {
      const waiter = this.waiters.shift()!;
      waiter.resolve({ value: msg, done: false });
    }
  }

  async read(fromIndex?: number): Promise<T | null> {
    const pos = fromIndex ?? this.readPosition;
    if (pos < this.messages.length) {
      const msg = this.messages[pos];
      this.readPosition = pos + 1;
      return msg;
    }
    if (this.isClosed) return null;
    return new Promise<T | null>((resolve) => {
      this.waiters.push({
        resolve: (result) => {
          this.readPosition = (fromIndex ?? this.readPosition) + 1;
          resolve(result.done ? null : result.value);
        },
      });
    });
  }

  close(): void {
    this.isClosed = true;
    for (const waiter of this.waiters) {
      waiter.resolve({ value: undefined as any, done: true });
    }
    this.waiters = [];
  }

  get length(): number { return this.messages.length - this.readPosition; }
  get closed(): boolean { return this.isClosed; }
}

export function generateSecureToken(bytes = 16): string {
  const { randomBytes } = require('crypto') as typeof import('crypto');
  return randomBytes(bytes).toString('base64url');
}

export function generateSecureUuid(): string {
  return randomUUID();
}

const TOOL_NAME_MAP: Record<string, string> = {
  read: 'read_file',
  write: 'write_file',
  edit: 'edit_file',
  exec: 'exec',
  process: 'process',
  web_search: 'web_search',
  web_fetch: 'web_fetch',
  kimi_search: 'kimi_search',
  kimi_fetch: 'kimi_fetch',
  kimi_finance: 'kimi_finance',
  tts: 'generate_speech',
  memory_search: 'memory_search',
  memory_get: 'memory_get',
};

const REVERSE_TOOL_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(TOOL_NAME_MAP).map(([k, v]) => [v, k])
);

export function mapToolName(name: string, direction: 'to-internal' | 'to-external' = 'to-external'): string {
  return direction === 'to-external'
    ? (TOOL_NAME_MAP[name] ?? name)
    : (REVERSE_TOOL_MAP[name] ?? name);
}
