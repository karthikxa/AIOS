import { Cron } from 'croner';

export interface CronJob {
  id: string;
  name: string;
  pattern: string;
  command: string;
  args?: string[];
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
  status: 'idle' | 'running' | 'error';
  error?: string;
}

export interface CronJobResult {
  jobId: string;
  output: string;
  exitCode: number;
  duration: number;
  timestamp: Date;
}

const jobs = new Map<string, Cron>();
const jobConfigs = new Map<string, CronJob>();
const jobResults = new Map<string, CronJobResult[]>();

let jobCounter = 0;

export function createCronJob(
  name: string,
  pattern: string,
  command: string,
  args?: string[],
  enabled: boolean = true
): CronJob {
  const id = `job_${++jobCounter}`;

  const config: CronJob = {
    id,
    name,
    pattern,
    command,
    args,
    enabled,
    status: 'idle',
  };

  if (enabled) {
    const job = new Cron(pattern, async () => {
      config.status = 'running';
      config.lastRun = new Date();

      try {
        const startTime = Date.now();
        // Execute command (placeholder - would need actual execution)
        const output = `Executed: ${command} ${(args || []).join(' ')}`;
        const duration = Date.now() - startTime;

        const result: CronJobResult = {
          jobId: id,
          output,
          exitCode: 0,
          duration,
          timestamp: new Date(),
        };

        if (!jobResults.has(id)) {
          jobResults.set(id, []);
        }
        jobResults.get(id)!.push(result);

        // Keep only last 100 results
        const results = jobResults.get(id)!;
        if (results.length > 100) {
          results.splice(0, results.length - 100);
        }

        config.status = 'idle';
      } catch (err) {
        config.status = 'error';
        config.error = err instanceof Error ? err.message : String(err);
      }
    });

    jobs.set(id, job);
    config.nextRun = job.nextRun() || undefined;
  }

  jobConfigs.set(id, config);
  return config;
}

export function getCronJob(id: string): CronJob | undefined {
  return jobConfigs.get(id);
}

export function listCronJobs(): CronJob[] {
  return Array.from(jobConfigs.values());
}

export function deleteCronJob(id: string): boolean {
  const job = jobs.get(id);
  if (job) {
    job.stop();
    jobs.delete(id);
  }
  jobConfigs.delete(id);
  jobResults.delete(id);
  return true;
}

export function enableCronJob(id: string): CronJob | undefined {
  const config = jobConfigs.get(id);
  if (!config) return undefined;

  if (!config.enabled) {
    config.enabled = true;
    const job = new Cron(config.pattern, async () => {
      config.status = 'running';
      config.lastRun = new Date();
      config.status = 'idle';
    });
    jobs.set(id, job);
  }

  return config;
}

export function disableCronJob(id: string): CronJob | undefined {
  const config = jobConfigs.get(id);
  if (!config) return undefined;

  if (config.enabled) {
    config.enabled = false;
    const job = jobs.get(id);
    if (job) {
      job.stop();
      jobs.delete(id);
    }
  }

  return config;
}

export function getJobResults(id: string, limit: number = 50): CronJobResult[] {
  const results = jobResults.get(id) || [];
  return results.slice(-limit);
}

export function getNextRunTime(pattern: string): Date | undefined {
  try {
    const job = new Cron(pattern);
    return job.nextRun() || undefined;
  } catch {
    return undefined;
  }
}

export function validateCronPattern(pattern: string): boolean {
  try {
    new Cron(pattern);
    return true;
  } catch {
    return false;
  }
}
