import type {
  ChatMessage,
  ChatCompletionResponse,
  ChatCompletionChunk,
  ChatToolCall,
  ChatToolChoice,
  ChatToolDefinition,
  TokenUsage,
} from '@freellmapi/shared/types.js';
import { BaseProvider, providerHttpError, type CompletionOptions } from './base.js';
import { contentToString } from '../lib/content.js';
import { proxyFetch } from '../lib/proxy.js';

const API_BASE = 'https://api.anthropic.com/v1';
const ANTHROPIC_VERSION = '2023-06-01';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

type AnthropicContentBlock =
  | { type: 'text'; text: string }
  | { type: 'thinking'; thinking: string }
  | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
  | { type: 'tool_use'; id: string; name: string; input: unknown }
  | { type: 'tool_result'; tool_use_id: string; content: string };

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: AnthropicContentBlock[];
}

interface AnthropicResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  content: AnthropicContentBlock[];
  model: string;
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | 'tool_use' | null;
  stop_sequence: string | null;
  usage: { input_tokens: number; output_tokens: number };
}

function fromAnthropicStopReason(stopReason: string | null): string | null {
  if (!stopReason) return null;
  if (stopReason === 'end_turn') return 'stop';
  if (stopReason === 'max_tokens') return 'length';
  if (stopReason === 'tool_use') return 'tool_calls';
  if (stopReason === 'stop_sequence') return 'stop';
  return stopReason;
}

function extractImageUrl(block: unknown): string | undefined {
  const iu = (block as { image_url?: unknown })?.image_url;
  if (typeof iu === 'string') return iu;
  if (iu && typeof (iu as { url?: unknown }).url === 'string') return (iu as { url: string }).url;
  return undefined;
}

async function imageUrlToBase64(url: string): Promise<{ data: string; media_type: string } | null> {
  const dataMatch = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(url);
  if (dataMatch) {
    const mediaType = dataMatch[1] || 'image/jpeg';
    const isBase64 = Boolean(dataMatch[2]);
    const payload = dataMatch[3] ?? '';
    const data = isBase64 ? payload : Buffer.from(decodeURIComponent(payload)).toString('base64');
    return { data, media_type: mediaType };
  }
  if (!/^https?:\/\//i.test(url)) return null;
  try {
    const res = await proxyFetch(url, undefined, 'anthropic');
    if (!res.ok) return null;
    const contentLength = res.headers.get('content-length');
    if (contentLength && Number(contentLength) > MAX_IMAGE_BYTES) return null;
    const reader = res.body?.getReader();
    if (!reader) return null;
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > MAX_IMAGE_BYTES) {
        reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const buf = Buffer.concat(chunks);
    const mediaType = res.headers.get('content-type')?.split(';')[0]?.trim() || 'image/jpeg';
    return { data: buf.toString('base64'), media_type: mediaType };
  } catch {
    return null;
  }
}

async function toAnthropicMessages(messages: ChatMessage[]): Promise<{
  system?: string;
  anthropicMessages: AnthropicMessage[];
}> {
  const systemParts: string[] = [];
  const anthropicMessages: AnthropicMessage[] = [];

  for (const msg of messages) {
    if (msg.role === 'system') {
      const text = contentToString(msg.content);
      if (text) systemParts.push(text);
      continue;
    }

    if (msg.role === 'user') {
      const blocks: AnthropicContentBlock[] = [];
      const text = contentToString(msg.content);
      if (text) blocks.push({ type: 'text', text });

      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          const type = (block as { type?: string })?.type;
          if (type !== 'image_url' && type !== 'image') continue;
          const url = extractImageUrl(block);
          if (!url) continue;
          const img = await imageUrlToBase64(url);
          if (img) blocks.push({ type: 'image', source: { type: 'base64', ...img } });
        }
      }

      anthropicMessages.push({ role: 'user', content: blocks });
      continue;
    }

    if (msg.role === 'assistant') {
      const blocks: AnthropicContentBlock[] = [];
      const text = contentToString(msg.content);
      if (text) blocks.push({ type: 'text', text });

      for (const call of msg.tool_calls ?? []) {
        let input: unknown;
        try { input = JSON.parse(call.function.arguments); } catch { input = {}; }
        blocks.push({ type: 'tool_use', id: call.id, name: call.function.name, input });
      }

      anthropicMessages.push({ role: 'assistant', content: blocks });
      continue;
    }

    if (msg.role === 'tool') {
      const toolCallId = msg.tool_call_id;
      if (!toolCallId) continue;
      anthropicMessages.push({
        role: 'user',
        content: [{ type: 'tool_result', tool_use_id: toolCallId, content: contentToString(msg.content) }],
      });
    }
  }

  return {
    system: systemParts.length > 0 ? systemParts.join('\n\n') : undefined,
    anthropicMessages,
  };
}

function toAnthropicTools(tools?: ChatToolDefinition[]): { name: string; description?: string; input_schema?: Record<string, unknown> }[] | undefined {
  if (!tools || tools.length === 0) return undefined;
  return tools.map(t => ({
    name: t.function.name,
    description: t.function.description,
    input_schema: t.function.parameters as Record<string, unknown> | undefined,
  }));
}

function toAnthropicToolChoice(toolChoice?: ChatToolChoice): Record<string, unknown> | undefined {
  if (!toolChoice) return undefined;
  if (typeof toolChoice === 'string') {
    if (toolChoice === 'none') return { type: 'none' };
    if (toolChoice === 'required') return { type: 'any' };
    return undefined;
  }
  return { type: 'tool', name: toolChoice.function.name };
}

function extractAnthropicToolCalls(blocks: AnthropicContentBlock[]): ChatToolCall[] {
  const calls: ChatToolCall[] = [];
  for (const block of blocks) {
    if (block.type !== 'tool_use') continue;
    calls.push({
      id: block.id,
      type: 'function',
      function: {
        name: block.name,
        arguments: typeof block.input === 'string' ? block.input : JSON.stringify(block.input ?? {}),
      },
    });
  }
  return calls;
}

function extractText(blocks: AnthropicContentBlock[]): string | null {
  const text = blocks
    .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
    .map(b => b.text)
    .join('');
  return text.length > 0 ? text : null;
}

function extractThinking(blocks: AnthropicContentBlock[]): string | null {
  const thinking = blocks
    .filter((b): b is { type: 'thinking'; thinking: string } => b.type === 'thinking')
    .map(b => b.thinking)
    .join('');
  return thinking.length > 0 ? thinking : null;
}

export class AnthropicProvider extends BaseProvider {
  readonly platform = 'anthropic' as const;
  readonly name = 'Anthropic';

  async chatCompletion(
    apiKey: string,
    messages: ChatMessage[],
    modelId: string,
    options?: CompletionOptions,
  ): Promise<ChatCompletionResponse> {
    const { system, anthropicMessages } = await toAnthropicMessages(messages);

    const body: Record<string, unknown> = {
      model: modelId,
      max_tokens: options?.max_tokens ?? 4096,
      messages: anthropicMessages,
      temperature: options?.temperature,
      top_p: options?.top_p,
    };
    if (system) body.system = system;
    const tools = toAnthropicTools(options?.tools);
    if (tools) body.tools = tools;
    const toolChoice = toAnthropicToolChoice(options?.tool_choice);
    if (toolChoice) body.tool_choice = toolChoice;

    const res = await this.fetchWithTimeout(`${API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw providerHttpError(res, `Anthropic API error ${res.status}: ${(err as any).error?.message ?? res.statusText}`);
    }

    const data = await res.json() as AnthropicResponse;
    const toolCalls = extractAnthropicToolCalls(data.content);
    const text = extractText(data.content);
    const thinking = extractThinking(data.content);

    const usage: TokenUsage = {
      prompt_tokens: data.usage.input_tokens,
      completion_tokens: data.usage.output_tokens,
      total_tokens: data.usage.input_tokens + data.usage.output_tokens,
    };

    return {
      id: data.id,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: data.model,
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: text,
          ...(thinking ? { reasoning_content: thinking } : {}),
          ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
        },
        finish_reason: toolCalls.length > 0 ? 'tool_calls' : fromAnthropicStopReason(data.stop_reason),
      }],
      usage,
      _routed_via: { platform: 'anthropic', model: modelId },
    };
  }

  async *streamChatCompletion(
    apiKey: string,
    messages: ChatMessage[],
    modelId: string,
    options?: CompletionOptions,
  ): AsyncGenerator<ChatCompletionChunk> {
    const { system, anthropicMessages } = await toAnthropicMessages(messages);

    const body: Record<string, unknown> = {
      model: modelId,
      max_tokens: options?.max_tokens ?? 4096,
      messages: anthropicMessages,
      temperature: options?.temperature,
      top_p: options?.top_p,
      stream: true,
    };
    if (system) body.system = system;
    const tools = toAnthropicTools(options?.tools);
    if (tools) body.tools = tools;
    const toolChoice = toAnthropicToolChoice(options?.tool_choice);
    if (toolChoice) body.tool_choice = toolChoice;

    const res = await this.fetchWithTimeout(`${API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw providerHttpError(res, `Anthropic API error ${res.status}: ${(err as any).error?.message ?? res.statusText}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';
    let messageId = '';
    let responseModel = modelId;
    let emittedFinish = false;
    let sawToolCalls = false;

    const INACTIVITY_TIMEOUT_MS = 90_000;

    type ContentBlockState = {
      type: 'text' | 'thinking' | 'tool_use';
      id?: string;
      name?: string;
      args: string;
    };
    const contentBlocks = new Map<number, ContentBlockState>();

    while (true) {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Anthropic stream stalled: no data for 90s (timeout)')), INACTIVITY_TIMEOUT_MS)
      );
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      let currentEvent = '';
      let currentData = '';
      for (const line of lines) {
        if (line.startsWith('event: ')) {
          currentEvent = line.slice(7).trim();
          currentData = '';
          continue;
        }
        if (line.startsWith('data: ')) {
          currentData = line.slice(6).trim();
          if (!currentEvent || !currentData) continue;

          try {
            const parsed = JSON.parse(currentData) as Record<string, unknown>;

            switch (currentEvent) {
              case 'message_start': {
                const msg = parsed as { type: string; message: AnthropicResponse };
                messageId = msg.message.id;
                responseModel = msg.message.model;
                break;
              }

              case 'content_block_start': {
                const evt = parsed as { type: string; index: number; content_block: AnthropicContentBlock };
                const idx = evt.index;
                const block = evt.content_block;

                if (block.type === 'text') {
                  contentBlocks.set(idx, { type: 'text', args: '' });
                  yield {
                    id: messageId,
                    object: 'chat.completion.chunk',
                    created: Math.floor(Date.now() / 1000),
                    model: responseModel,
                    choices: [{
                      index: 0,
                      delta: { role: 'assistant', content: block.text },
                      finish_reason: null,
                    }],
                  };
                } else if (block.type === 'thinking') {
                  contentBlocks.set(idx, { type: 'thinking', args: '' });
                  yield {
                    id: messageId,
                    object: 'chat.completion.chunk',
                    created: Math.floor(Date.now() / 1000),
                    model: responseModel,
                    choices: [{
                      index: 0,
                      delta: { reasoning_content: block.thinking },
                      finish_reason: null,
                    }],
                  };
                } else if (block.type === 'tool_use') {
                  sawToolCalls = true;
                  const state: ContentBlockState = { type: 'tool_use', id: block.id, name: block.name, args: '' };
                  if (block.input && typeof block.input === 'object') {
                    state.args = JSON.stringify(block.input);
                  }
                  contentBlocks.set(idx, state);

                  const tc = [{
                    index: idx,
                    id: block.id,
                    type: 'function' as const,
                    function: { name: block.name, arguments: state.args },
                  }];
                  yield {
                    id: messageId,
                    object: 'chat.completion.chunk',
                    created: Math.floor(Date.now() / 1000),
                    model: responseModel,
                    choices: [{
                      index: 0,
                      delta: { role: 'assistant', tool_calls: tc as unknown as ChatToolCall[] },
                      finish_reason: null,
                    }],
                  };
                }
                break;
              }

              case 'content_block_delta': {
                const evt = parsed as { type: string; index: number; delta: { type: string; text?: string; thinking?: string; partial_json?: string } };
                const idx = evt.index;
                const state = contentBlocks.get(idx);
                if (!state) break;

                if (state.type === 'text' && evt.delta.type === 'text_delta' && evt.delta.text) {
                  yield {
                    id: messageId,
                    object: 'chat.completion.chunk',
                    created: Math.floor(Date.now() / 1000),
                    model: responseModel,
                    choices: [{
                      index: 0,
                      delta: { content: evt.delta.text },
                      finish_reason: null,
                    }],
                  };
                } else if (state.type === 'thinking' && evt.delta.type === 'thinking_delta' && evt.delta.thinking) {
                  yield {
                    id: messageId,
                    object: 'chat.completion.chunk',
                    created: Math.floor(Date.now() / 1000),
                    model: responseModel,
                    choices: [{
                      index: 0,
                      delta: { reasoning_content: evt.delta.thinking },
                      finish_reason: null,
                    }],
                  };
                } else if (state.type === 'tool_use' && evt.delta.type === 'input_json_delta' && evt.delta.partial_json) {
                  state.args += evt.delta.partial_json;
                  const tc = [{
                    index: idx,
                    function: { arguments: evt.delta.partial_json },
                  }];
                  yield {
                    id: messageId,
                    object: 'chat.completion.chunk',
                    created: Math.floor(Date.now() / 1000),
                    model: responseModel,
                    choices: [{
                      index: 0,
                      delta: { tool_calls: tc as unknown as ChatToolCall[] },
                      finish_reason: null,
                    }],
                  };
                }
                break;
              }

              case 'content_block_stop': {
                break;
              }

              case 'message_delta': {
                if (emittedFinish) break;
                const evt = parsed as { type: string; delta: { stop_reason: string; stop_sequence: string | null }; usage: { output_tokens: number } };
                emittedFinish = true;
                yield {
                  id: messageId,
                  object: 'chat.completion.chunk',
                  created: Math.floor(Date.now() / 1000),
                  model: responseModel,
                  choices: [{
                    index: 0,
                    delta: {},
                    finish_reason: sawToolCalls ? 'tool_calls' : fromAnthropicStopReason(evt.delta.stop_reason),
                  }],
                };
                break;
              }

              case 'message_stop': {
                break;
              }

              case 'ping': {
                break;
              }
            }
          } catch {
            // Skip malformed events
          }

          currentEvent = '';
          currentData = '';
        }
      }
    }

    if (!emittedFinish) {
      emittedFinish = true;
      yield {
        id: messageId,
        object: 'chat.completion.chunk',
        created: Math.floor(Date.now() / 1000),
        model: responseModel,
        choices: [{
          index: 0,
          delta: {},
          finish_reason: sawToolCalls ? 'tool_calls' : 'stop',
        }],
      };
    }

    reader.cancel().catch(() => {});
  }

  async validateKey(apiKey: string): Promise<boolean> {
    const res = await this.fetchWithTimeout(`${API_BASE}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 21,
        messages: [{ role: 'user', content: 'a' }],
      }),
    }, 10000);
    return res.status !== 401 && res.status !== 403;
  }
}
