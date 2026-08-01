import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  createCronJob,
  getCronJob,
  listCronJobs,
  deleteCronJob,
  enableCronJob,
  disableCronJob,
  getJobResults,
  getNextRunTime,
  validateCronPattern,
} from '../services/cron.js';

const router = Router();

// GET /api/cron/jobs - List all cron jobs
router.get('/jobs', (req: Request, res: Response) => {
  const jobs = listCronJobs();
  res.json({ jobs });
});

// POST /api/cron/jobs - Create a cron job
router.post('/jobs', (req: Request, res: Response) => {
  try {
    const { name, pattern, command, args, enabled } = req.body;

    if (!name || !pattern || !command) {
      return res.status(400).json({ error: 'name, pattern, and command are required' });
    }

    if (!validateCronPattern(pattern)) {
      return res.status(400).json({ error: 'Invalid cron pattern' });
    }

    const job = createCronJob(name, pattern, command, args, enabled);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create cron job' });
  }
});

// GET /api/cron/jobs/:id - Get a specific cron job
router.get('/jobs/:id', (req: Request, res: Response) => {
  const job = getCronJob(req.params.id as string);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

// DELETE /api/cron/jobs/:id - Delete a cron job
router.delete('/jobs/:id', (req: Request, res: Response) => {
  const deleted = deleteCronJob(req.params.id as string);
  if (!deleted) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json({ success: true });
});

// POST /api/cron/jobs/:id/enable - Enable a cron job
router.post('/jobs/:id/enable', (req: Request, res: Response) => {
  const job = enableCronJob(req.params.id as string);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

// POST /api/cron/jobs/:id/disable - Disable a cron job
router.post('/jobs/:id/disable', (req: Request, res: Response) => {
  const job = disableCronJob(req.params.id as string);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

// GET /api/cron/jobs/:id/results - Get job results
router.get('/jobs/:id/results', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 50;
  const results = getJobResults(req.params.id as string, limit);
  res.json({ results });
});

// POST /api/cron/validate - Validate a cron pattern
router.post('/validate', (req: Request, res: Response) => {
  const { pattern } = req.body;
  if (!pattern) {
    return res.status(400).json({ error: 'Pattern is required' });
  }

  const valid = validateCronPattern(pattern);
  const nextRun = valid ? getNextRunTime(pattern) : undefined;

  res.json({ valid, nextRun });
});

export default router;
