import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  getPDFInfo,
  extractPDFText,
  extractPDFPage,
  extractAllPDFPages,
  getPDFPageCount,
  searchPDFText,
} from '../services/pdf.js';

const router = Router();

// POST /api/pdf/info - Get PDF metadata
router.post('/info', async (req: Request, res: Response) => {
  try {
    const { pdf } = req.body;
    if (!pdf) {
      return res.status(400).json({ error: 'PDF buffer or base64 is required' });
    }

    const buffer = Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf, 'base64');
    const info = await getPDFInfo(buffer);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get PDF info' });
  }
});

// POST /api/pdf/text - Extract text from PDF
router.post('/text', async (req: Request, res: Response) => {
  try {
    const { pdf } = req.body;
    if (!pdf) {
      return res.status(400).json({ error: 'PDF is required' });
    }

    const buffer = Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf, 'base64');
    const text = await extractPDFText(buffer);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to extract PDF text' });
  }
});

// POST /api/pdf/page - Extract specific page
router.post('/page', async (req: Request, res: Response) => {
  try {
    const { pdf, pageNumber } = req.body;
    if (!pdf || !pageNumber) {
      return res.status(400).json({ error: 'PDF and pageNumber are required' });
    }

    const buffer = Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf, 'base64');
    const page = await extractPDFPage(buffer, pageNumber);
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Failed to extract PDF page' });
  }
});

// POST /api/pdf/pages - Extract all pages
router.post('/pages', async (req: Request, res: Response) => {
  try {
    const { pdf } = req.body;
    if (!pdf) {
      return res.status(400).json({ error: 'PDF is required' });
    }

    const buffer = Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf, 'base64');
    const pages = await extractAllPDFPages(buffer);
    res.json({ pages, count: pages.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to extract PDF pages' });
  }
});

// POST /api/pdf/count - Get page count
router.post('/count', async (req: Request, res: Response) => {
  try {
    const { pdf } = req.body;
    if (!pdf) {
      return res.status(400).json({ error: 'PDF is required' });
    }

    const buffer = Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf, 'base64');
    const count = await getPDFPageCount(buffer);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get PDF page count' });
  }
});

// POST /api/pdf/search - Search text in PDF
router.post('/search', async (req: Request, res: Response) => {
  try {
    const { pdf, query } = req.body;
    if (!pdf || !query) {
      return res.status(400).json({ error: 'PDF and query are required' });
    }

    const buffer = Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf, 'base64');
    const results = await searchPDFText(buffer, query);
    res.json({ results, count: results.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to search PDF' });
  }
});

export default router;
