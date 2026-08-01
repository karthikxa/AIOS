export interface ChunkOptions {
  maxTokens?: number;
  overlapTokens?: number;
}

export interface TextChunk {
  content: string;
  index: number;
  startChar: number;
  endChar: number;
}

export function chunkText(text: string, options?: ChunkOptions): TextChunk[] {
  const maxTokens = options?.maxTokens ?? 512;
  const overlap = options?.overlapTokens ?? 64;
  const charsPerToken = 4;
  const maxChars = maxTokens * charsPerToken;
  const overlapChars = overlap * charsPerToken;

  const chunks: TextChunk[] = [];
  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(start + maxChars, text.length);
    chunks.push({
      content: text.slice(start, end),
      index,
      startChar: start,
      endChar: end,
    });
    start += maxChars - overlapChars;
    index++;
    if (start >= text.length) break;
  }
  return chunks;
}

export function chunkMarkdown(text: string, options?: ChunkOptions): TextChunk[] {
  const sections = text.split(/\n(?=#{1,3}\s)/);
  const maxTokens = options?.maxTokens ?? 512;
  const overlap = options?.overlapTokens ?? 64;
  const charsPerToken = 4;
  const maxChars = maxTokens * charsPerToken;
  const overlapChars = overlap * charsPerToken;

  const chunks: TextChunk[] = [];
  let buffer = '';
  let charOffset = 0;
  let index = 0;

  for (const section of sections) {
    if (buffer.length + section.length > maxChars && buffer.length > 0) {
      chunks.push({
        content: buffer.trim(),
        index,
        startChar: charOffset - buffer.length,
        endChar: charOffset,
      });
      index++;
      const overlapText = buffer.slice(-overlapChars);
      buffer = overlapText + section;
    } else {
      buffer += (buffer ? '\n' : '') + section;
    }
    charOffset += section.length + 1;
  }

  if (buffer.trim()) {
    chunks.push({
      content: buffer.trim(),
      index,
      startChar: charOffset - buffer.length,
      endChar: charOffset,
    });
  }

  return chunks;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export function parseEmbedding(raw: string): number[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(n => typeof n === 'number')) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function splitTextToUtf8ByteLimit(text: string, maxBytes: number): string[] {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  if (encoded.length <= maxBytes) return [text];

  const parts: string[] = [];
  let remaining = encoded;
  while (remaining.length > 0) {
    let cutAt = maxBytes;
    while (cutAt > 0 && (remaining[cutAt] & 0xC0) === 0x80) cutAt--;
    const chunk = new TextDecoder().decode(remaining.slice(0, cutAt));
    parts.push(chunk);
    remaining = remaining.slice(cutAt);
  }
  return parts;
}

export function extractMeaningfulText(html: string): string {
  return html
    .replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gis, ' ')
    .replaceAll(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gis, ' ')
    .replaceAll(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gis, ' ')
    .replaceAll(/<!--([\s\S]*?)-->/g, ' ')
    .replaceAll(/<\/?(h[1-6]|p|div|article|section|li|tr|td|th|ul|ol|br|pre|code)\b[^>]*>/gi, '\n')
    .replaceAll(/<[^>]+>/g, ' ')
    .replaceAll(/&nbsp;/gi, ' ')
    .replaceAll(/&amp;/gi, '&')
    .replaceAll(/&lt;/gi, '<')
    .replaceAll(/&gt;/gi, '>')
    .replaceAll(/&quot;/gi, '"')
    .replaceAll(/&#39;/gi, "'")
    .replaceAll(/&\w+;/g, ' ')
    .replaceAll(/[ \t]+/g, ' ')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .join('\n');
}
