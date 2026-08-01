import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

export interface McpSession {
  client: Client;
  transport: StdioClientTransport | StreamableHTTPClientTransport;
  url?: string;
  connectedAt: number;
}

const sessions = new Map<string, McpSession>();

function sessionKey(): string {
  return `mcp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function connectStdio(command: string, args?: string[]): Promise<string> {
  const transport = new StdioClientTransport({ command, args: args ?? [] });
  const client = new Client({ name: 'avde-mcp-client', version: '1.0.0' });
  await client.connect(transport);
  const id = sessionKey();
  sessions.set(id, { client, transport, connectedAt: Date.now() });
  return id;
}

export async function connectHttp(url: string): Promise<string> {
  const transport = new StreamableHTTPClientTransport(new URL(url));
  const client = new Client({ name: 'avde-mcp-client', version: '1.0.0' });
  await client.connect(transport);
  const id = sessionKey();
  sessions.set(id, { client, transport, url, connectedAt: Date.now() });
  return id;
}

function getSession(id: string): McpSession {
  const s = sessions.get(id);
  if (!s) throw new Error(`MCP session ${id} not found`);
  return s;
}

export async function listTools(sessionId: string) {
  const { client } = getSession(sessionId);
  return client.listTools();
}

export async function callTool(sessionId: string, name: string, args?: Record<string, unknown>) {
  const { client } = getSession(sessionId);
  return client.callTool({ name, arguments: args ?? {} });
}

export async function listResources(sessionId: string) {
  const { client } = getSession(sessionId);
  return client.listResources();
}

export async function readResource(sessionId: string, uri: string) {
  const { client } = getSession(sessionId);
  return client.readResource({ uri });
}

export async function disconnectSession(sessionId: string): Promise<void> {
  const s = sessions.get(sessionId);
  if (s) {
    await s.client.close().catch(() => {});
    sessions.delete(sessionId);
  }
}

export function listSessions(): string[] {
  return Array.from(sessions.keys());
}
