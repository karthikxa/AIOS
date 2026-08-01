import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  launchBrowser,
  navigateToPage,
  takeScreenshot,
  extractPageContent,
  extractStructuredContent,
  clickElement,
  fillForm,
  scrollPage,
  searchWeb,
  closeBrowser,
  listSessions,
} from '../services/browser.js';

const router = Router();

router.post('/launch', async (req: Request, res: Response) => {
  try {
    const { headless, executablePath } = req.body;
    const id = await launchBrowser({ headless, executablePath });
    res.json({ sessionId: id });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Failed to launch browser' });
  }
});

router.get('/sessions', (_req: Request, res: Response) => {
  res.json({ sessions: listSessions() });
});

router.post('/navigate', async (req: Request, res: Response) => {
  try {
    const { sessionId, url } = req.body;
    if (!sessionId || !url) return res.status(400).json({ error: 'sessionId and url are required' });
    const result = await navigateToPage(sessionId, url);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Navigation failed' });
  }
});

router.post('/screenshot', async (req: Request, res: Response) => {
  try {
    const { sessionId, selector, fullPage } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
    const buffer = await takeScreenshot(sessionId, { selector, fullPage });
    res.set({ 'Content-Type': 'image/png', 'Content-Length': buffer.length.toString() });
    res.send(buffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Screenshot failed' });
  }
});

router.post('/extract', async (req: Request, res: Response) => {
  try {
    const { sessionId, structured } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
    const result = structured
      ? await extractStructuredContent(sessionId)
      : await extractPageContent(sessionId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Content extraction failed' });
  }
});

router.post('/click', async (req: Request, res: Response) => {
  try {
    const { sessionId, selector } = req.body;
    if (!sessionId || !selector) return res.status(400).json({ error: 'sessionId and selector are required' });
    await clickElement(sessionId, selector);
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Click failed' });
  }
});

router.post('/fill', async (req: Request, res: Response) => {
  try {
    const { sessionId, fields } = req.body;
    if (!sessionId || !fields) return res.status(400).json({ error: 'sessionId and fields are required' });
    await fillForm(sessionId, fields);
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Fill failed' });
  }
});

router.post('/scroll', async (req: Request, res: Response) => {
  try {
    const { sessionId, direction, amount } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
    await scrollPage(sessionId, direction ?? 'down', amount);
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Scroll failed' });
  }
});

router.post('/search', async (req: Request, res: Response) => {
  try {
    const { sessionId, query, engine } = req.body;
    if (!sessionId || !query) return res.status(400).json({ error: 'sessionId and query are required' });
    const results = await searchWeb(sessionId, query, engine);
    res.json({ results });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Search failed' });
  }
});

router.delete('/session/:id', async (req: Request, res: Response) => {
  try {
    await closeBrowser(String(req.params.id));
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'Close failed' });
  }
});

export default router;
