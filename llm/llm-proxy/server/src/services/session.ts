export interface SessionKeyParts {
  agentId: string;
  channel: string;
  accountId: string;
  scope?: string;
  target?: string;
  threadId?: string;
}

function normalizeSegment(input: string, maxLen = 128): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, maxLen);
}

export function buildMainSessionKey(parts: SessionKeyParts): string {
  const segments = [
    'agent',
    normalizeSegment(parts.agentId),
    normalizeSegment(parts.channel),
    normalizeSegment(parts.accountId),
  ];
  if (parts.scope) segments.push(normalizeSegment(parts.scope));
  if (parts.target) segments.push(normalizeSegment(parts.target));
  if (parts.threadId) segments.push('thread', normalizeSegment(parts.threadId));
  return segments.join(':');
}

export function buildIsolatedSessionKey(parts: SessionKeyParts, suffix: string): string {
  return buildMainSessionKey(parts) + ':isolated:' + normalizeSegment(suffix);
}

export function buildRoomScopedSessionKey(parts: SessionKeyParts, roomId: string): string {
  return buildMainSessionKey(parts) + ':room:' + normalizeSegment(roomId);
}

const CHAT_METADATA_PATTERNS: RegExp[] = [
  /\[Mon\s+\d{4}-\d{2}-\d{2}[^\]]*\]/gi,
  /\[Tue\s+\d{4}-\d{2}-\d{2}[^\]]*\]/gi,
  /\[Wed\s+\d{4}-\d{2}-\d{2}[^\]]*\]/gi,
  /\[Thu\s+\d{4}-\d{2}-\d{2}[^\]]*\]/gi,
  /\[Fri\s+\d{4}-\d{2}-\d{2}[^\]]*\]/gi,
  /\[Sat\s+\d{4}-\d{2}-\d{2}[^\]]*\]/gi,
  /\[Sun\s+\d{4}-\d{2}-\d{2}[^\]]*\]/gi,
  /\[working directory:[^\]]*\]/gi,
  /\[message_id:[^\]]*\]/gi,
  /\[sender_short_id:[^\]]*\]/gi,
  /\[reply_to_current\]/gi,
  /^User Message From Kimi:\s*/gim,
  /\{"conversation_info"[^}]*\}/g,
  /\[mentions?:\s*[^\]]*\]/gi,
];

export function stripMetadata(text: string): string {
  let result = text;
  for (const pattern of CHAT_METADATA_PATTERNS) {
    result = result.replace(pattern, '');
  }
  return result.trim();
}

export function sanitizePromptNode(node: any): any {
  if (typeof node === 'string') return stripMetadata(node);
  if (Array.isArray(node)) return node.map(sanitizePromptNode);
  if (node && typeof node === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = sanitizePromptNode(v);
    }
    return out;
  }
  return node;
}
