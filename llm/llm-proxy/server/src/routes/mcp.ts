import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  connectStdio,
  connectHttp,
  listTools,
  callTool,
  listResources,
  readResource,
  disconnectSession,
  listSessions,
} from '../services/mcp-client.js';
import { getMcpServer } from '../services/mcp-server.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'crypto';

const router = Router();

router.post('/connect', async (req: Request, res: Response) => {
  try {
    const { type, url, command, args } = req.body;
    let sessionId: string;
    if (type === 'stdio') {
      sessionId = await connectStdio(command, args);
    } else if (type === 'http') {
      sessionId = await connectHttp(url);
    } else {
      return res.status(400).json({ error: 'type must be "stdio" or "http"' });
    }
    res.json({ sessionId });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Connection failed' });
  }
});

router.get('/sessions', (_req: Request, res: Response) => {
  res.json({ sessions: listSessions() });
});

router.post('/sessions/:id/tools', async (req: Request, res: Response) => {
  try {
    const result = await listTools(String(req.params.id));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Failed to list tools' });
  }
});

router.post('/sessions/:id/call', async (req: Request, res: Response) => {
  try {
    const { name, arguments: args } = req.body;
    if (!name) return res.status(400).json({ error: 'tool name is required' });
    const result = await callTool(String(req.params.id), name, args);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Tool call failed' });
  }
});

router.post('/sessions/:id/resources', async (req: Request, res: Response) => {
  try {
    const result = await listResources(String(req.params.id));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Failed to list resources' });
  }
});

router.post('/sessions/:id/read-resource', async (req: Request, res: Response) => {
  try {
    const { uri } = req.body;
    if (!uri) return res.status(400).json({ error: 'uri is required' });
    const result = await readResource(String(req.params.id), uri);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Failed to read resource' });
  }
});

router.delete('/sessions/:id', async (req: Request, res: Response) => {
  try {
    await disconnectSession(String(req.params.id));
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Disconnect failed' });
  }
});

const httpSessions = new Map<string, { transport: StreamableHTTPServerTransport; server: any }>();

router.post('/', async (req: Request, res: Response) => {
  try {
    const server = getMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });
    await server.connect(transport);
    const result = await transport.handleRequest(req, res, req.body);
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message ?? 'MCP request failed' });
    }
  }
});

export default router;
