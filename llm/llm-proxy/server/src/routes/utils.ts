import { Router } from 'express';
import type { Request, Response } from 'express';
import { validateUrl, resolveAndValidate, redactSensitiveText, isWithinDir, safePath } from '../services/security.js';
import { buildMainSessionKey, buildIsolatedSessionKey, buildRoomScopedSessionKey, stripMetadata, sanitizePromptNode } from '../services/session.js';
import { chunkText, chunkMarkdown, cosineSimilarity, parseEmbedding, extractMeaningfulText } from '../services/query.js';
import { createRollingLogger, MessageQueue, generateSecureToken, generateSecureUuid, mapToolName } from '../services/infra.js';

const router = Router();

// --- SSRF Protection ---
router.post('/validate-url', (req: Request, res: Response) => {
  const { url, allowPrivate, allowLocalhost, allowedHostnames } = req.body;
  if (!url) return res.status(400).json({ error: 'url is required' });
  const result = validateUrl(url, { allowPrivate, allowLocalhost, allowedHostnames });
  res.json(result);
});

router.post('/resolve-url', async (req: Request, res: Response) => {
  const { hostname, allowPrivate, allowLocalhost, allowedHostnames } = req.body;
  if (!hostname) return res.status(400).json({ error: 'hostname is required' });
  const result = await resolveAndValidate(hostname, { allowPrivate, allowLocalhost, allowedHostnames });
  res.json(result);
});

// --- Data Redaction ---
router.post('/redact', (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text string is required' });
  res.json({ redacted: redactSensitiveText(text) });
});

// --- Path Safety ---
router.post('/safe-path', (req: Request, res: Response) => {
  const { rootDir, targetPath } = req.body;
  if (!rootDir || !targetPath) return res.status(400).json({ error: 'rootDir and targetPath are required' });
  res.json(safePath(rootDir, targetPath));
});

router.post('/is-within-dir', (req: Request, res: Response) => {
  const { rootDir, targetPath } = req.body;
  if (!rootDir || !targetPath) return res.status(400).json({ error: 'rootDir and targetPath are required' });
  res.json({ within: isWithinDir(rootDir, targetPath) });
});

// --- Session Routing ---
router.post('/session-key', (req: Request, res: Response) => {
  const { agentId, channel, accountId, scope, target, threadId, type, suffix, roomId } = req.body;
  if (!agentId || !channel || !accountId) return res.status(400).json({ error: 'agentId, channel, accountId are required' });
  const parts = { agentId, channel, accountId, scope, target, threadId };
  let key: string;
  if (type === 'isolated') key = buildIsolatedSessionKey(parts, suffix ?? 'default');
  else if (type === 'room') key = buildRoomScopedSessionKey(parts, roomId ?? 'default');
  else key = buildMainSessionKey(parts);
  res.json({ key });
});

// --- Metadata Stripping ---
router.post('/strip-metadata', (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text string is required' });
  res.json({ cleaned: stripMetadata(text) });
});

router.post('/sanitize-prompt', (req: Request, res: Response) => {
  const { node } = req.body;
  if (!node) return res.status(400).json({ error: 'node is required' });
  res.json({ sanitized: sanitizePromptNode(node) });
});

// --- Text Chunking ---
router.post('/chunk-text', (req: Request, res: Response) => {
  const { text, maxTokens, overlapTokens } = req.body;
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text string is required' });
  res.json({ chunks: chunkText(text, { maxTokens, overlapTokens }) });
});

router.post('/chunk-markdown', (req: Request, res: Response) => {
  const { text, maxTokens, overlapTokens } = req.body;
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text string is required' });
  res.json({ chunks: chunkMarkdown(text, { maxTokens, overlapTokens }) });
});

// --- Cosine Similarity ---
router.post('/cosine-similarity', (req: Request, res: Response) => {
  const { a, b } = req.body;
  if (!Array.isArray(a) || !Array.isArray(b)) return res.status(400).json({ error: 'a and b must be number arrays' });
  res.json({ similarity: cosineSimilarity(a, b) });
});

// --- HTML Text Extraction ---
router.post('/extract-text', (req: Request, res: Response) => {
  const { html } = req.body;
  if (!html || typeof html !== 'string') return res.status(400).json({ error: 'html string is required' });
  res.json({ text: extractMeaningfulText(html) });
});

// --- Secure Token Generation ---
router.get('/token', (req: Request, res: Response) => {
  const bytes = parseInt(req.query.bytes as string) || 16;
  res.json({ token: generateSecureToken(bytes) });
});

router.get('/uuid', (_req: Request, res: Response) => {
  res.json({ uuid: generateSecureUuid() });
});

// --- Tool Name Mapping ---
router.post('/map-tool-name', (req: Request, res: Response) => {
  const { name, direction } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  res.json({ mapped: mapToolName(name, direction ?? 'to-external') });
});

// --- Webhook Registration ---
const activeWebhooks = new Map<string, { secret?: string; rateLimit?: number; count: number }>();

router.post('/webhooks', (req: Request, res: Response) => {
  const { path, secret, rateLimit } = req.body;
  if (!path) return res.status(400).json({ error: 'path is required' });
  activeWebhooks.set(path, { secret, rateLimit: rateLimit ?? 60, count: 0 });
  res.json({ registered: true, path });
});

router.get('/webhooks', (_req: Request, res: Response) => {
  const list = Array.from(activeWebhooks.entries()).map(([path, meta]) => ({ path, ...meta }));
  res.json({ webhooks: list });
});

router.delete('/webhooks/:path', (req: Request, res: Response) => {
  const p = '/' + String(req.params.path);
  activeWebhooks.delete(p);
  res.json({ removed: true });
});

// --- Message Queue ---
const queues = new Map<string, MessageQueue<any>>();

router.post('/queues', (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  if (!queues.has(name)) queues.set(name, new MessageQueue());
  res.json({ created: true, name });
});

router.post('/queues/:name/push', (req: Request, res: Response) => {
  const queue = queues.get(String(req.params.name));
  if (!queue) return res.status(404).json({ error: 'Queue not found' });
  const { message } = req.body;
  queue.push(message);
  res.json({ ok: true, queueLength: queue.length });
});

router.get('/queues/:name/pop', (req: Request, res: Response) => {
  const queue = queues.get(String(req.params.name));
  if (!queue) return res.status(404).json({ error: 'Queue not found' });
  queue.read().then(msg => {
    if (msg === null) res.json({ message: null, closed: queue.closed });
    else res.json({ message: msg });
  });
});

router.get('/queues/:name/length', (req: Request, res: Response) => {
  const queue = queues.get(String(req.params.name));
  if (!queue) return res.status(404).json({ error: 'Queue not found' });
  res.json({ length: queue.length });
});

router.delete('/queues/:name', (req: Request, res: Response) => {
  const queue = queues.get(String(req.params.name));
  if (queue) { queue.close(); queues.delete(String(req.params.name)); }
  res.json({ removed: true });
});

// --- Rolling Logger ---
const loggers = new Map<string, ReturnType<typeof createRollingLogger>>();

router.post('/loggers', (req: Request, res: Response) => {
  const { name, filePath, maxBytes, maxBackups } = req.body;
  if (!name || !filePath) return res.status(400).json({ error: 'name and filePath are required' });
  if (!loggers.has(name)) loggers.set(name, createRollingLogger({ filePath, maxBytes, maxBackups }));
  res.json({ created: true, name });
});

router.post('/loggers/:name/write', (req: Request, res: Response) => {
  const logger = loggers.get(String(req.params.name));
  if (!logger) return res.status(404).json({ error: 'Logger not found' });
  const { entry } = req.body;
  if (!entry || typeof entry !== 'object') return res.status(400).json({ error: 'entry object is required' });
  logger.write(entry);
  res.json({ ok: true });
});

router.delete('/loggers/:name', (req: Request, res: Response) => {
  const logger = loggers.get(String(req.params.name));
  if (logger) { logger.close(); loggers.delete(String(req.params.name)); }
  res.json({ removed: true });
});

export default router;
