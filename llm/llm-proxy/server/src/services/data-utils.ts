import { jsonrepair } from 'jsonrepair';
import Papa from 'papaparse';

export function repairJson(input: string): string {
  return jsonrepair(input);
}

export function parseCsv(input: string, config?: Papa.ParseConfig): Papa.ParseResult<Record<string, unknown>> {
  return Papa.parse<Record<string, unknown>>(input, { header: true, dynamicTyping: true, ...config });
}

export function generateCsv(data: Record<string, unknown>[], columns?: string[]): string {
  return Papa.unparse(data, columns ? { columns } : undefined);
}

export async function parseCsvFile(filePath: string): Promise<Papa.ParseResult<Record<string, unknown>>> {
  const { readFile } = await import('fs/promises');
  const content = await readFile(filePath, 'utf-8');
  return parseCsv(content);
}
