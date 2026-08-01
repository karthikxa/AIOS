import { Router } from 'express';
import type { Request, Response } from 'express';
import { repairJson, parseCsv, generateCsv } from '../services/data-utils.js';

const router = Router();

router.post('/repair-json', (req: Request, res: Response) => {
  try {
    const { json } = req.body;
    if (!json || typeof json !== 'string') {
      return res.status(400).json({ error: 'json string is required' });
    }
    const repaired = repairJson(json);
    res.json({ repaired });
  } catch (err) {
    res.status(500).json({ error: 'JSON repair failed' });
  }
});

router.post('/parse-csv', (req: Request, res: Response) => {
  try {
    const { csv, delimiter } = req.body;
    if (!csv || typeof csv !== 'string') {
      return res.status(400).json({ error: 'csv string is required' });
    }
    const result = parseCsv(csv, delimiter ? { delimiter } : undefined);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'CSV parse failed' });
  }
});

router.post('/generate-csv', (req: Request, res: Response) => {
  try {
    const { data, columns } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'data array is required' });
    }
    const csv = generateCsv(data, columns);
    res.json({ csv });
  } catch (err) {
    res.status(500).json({ error: 'CSV generation failed' });
  }
});

export default router;
