import { isIPv4, isIPv6 } from 'net';
import { lookup } from 'dns';

const BLOCKED_HOSTNAMES = new Set([
  'localhost', 'localhost.localdomain', 'local',
  'metadata.google.internal', 'metadata.google.internal.',
  '169.254.169.254', '0.0.0.0',
]);

const BLOCKED_IPV4_RANGES: Array<{ start: number; end: number }> = [
  { start: 0x00000000, end: 0x000000FF },       // 0.0.0.0/8
  { start: 0x0A000000, end: 0x0AFFFFFF },       // 10.0.0.0/8
  { start: 0x64400000, end: 0x647FFFFF },       // 100.64.0.0/10
  { start: 0x7F000000, end: 0x7FFFFFFF },       // 127.0.0.0/8
  { start: 0xA9FE0000, end: 0xA9FEFFFF },       // 169.254.0.0/16
  { start: 0xAC100000, end: 0xAC1FFFFF },       // 172.16.0.0/12
  { start: 0xC0A80000, end: 0xC0A8FFFF },       // 192.168.0.0/16
  { start: 0xC0000000, end: 0xC0000007 },       // 192.0.0.0/24
  { start: 0xC0000200, end: 0xC00002FF },       // 192.0.2.0/24
  { start: 0xC6336400, end: 0xC63367FF },       // 198.18.0.0/15
  { start: 0xCB007100, end: 0xCB0071FF },       // 203.0.113.0/24
  { start: 0xE0000000, end: 0xFFFFFFFF },       // 224.0.0.0/4
];

function ipv4ToInt(ip: string): number {
  const parts = ip.split('.').map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function isPrivateIPv4(ip: string): boolean {
  const num = ipv4ToInt(ip);
  return BLOCKED_IPV4_RANGES.some(r => num >= r.start && num <= r.end);
}

function isBlockedIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === '::' || lower === '::1') return true;
  if (lower.startsWith('fe80:') || lower.startsWith('fc') || lower.startsWith('fd')) return true;
  if (lower.startsWith('ff')) return true;
  if (lower.includes(':ffff:')) {
    const embedded = lower.split(':ffff:')[1];
    if (embedded && isIPv4(embedded)) return isPrivateIPv4(embedded);
  }
  return false;
}

export interface SSRFPolicy {
  allowPrivate?: boolean;
  allowLocalhost?: boolean;
  allowedHostnames?: string[];
  proxyUrl?: string;
}

export function isBlockedHostname(hostname: string, policy?: SSRFPolicy): boolean {
  const lower = hostname.toLowerCase().replace(/\.$/, '');
  if (policy?.allowLocalhost) return false;
  if (policy?.allowPrivate) return false;
  if (policy?.allowedHostnames?.some(h => lower === h || lower.endsWith('.' + h))) return false;
  return BLOCKED_HOSTNAMES.has(lower) || lower.endsWith('.local') || lower.endsWith('.localhost') || lower.endsWith('.internal');
}

export function isPrivateIP(ip: string): boolean {
  if (isIPv4(ip)) return isPrivateIPv4(ip);
  if (isIPv6(ip)) return isBlockedIPv6(ip);
  return true;
}

export function validateUrl(urlStr: string, policy?: SSRFPolicy): { valid: boolean; error?: string } {
  try {
    const url = new URL(urlStr);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { valid: false, error: `Unsupported protocol: ${url.protocol}` };
    }
    if (isBlockedHostname(url.hostname, policy)) {
      return { valid: false, error: `Blocked hostname: ${url.hostname}` };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL' };
  }
}

export async function resolveAndValidate(hostname: string, policy?: SSRFPolicy): Promise<{ safe: boolean; ip?: string; error?: string }> {
  return new Promise((resolve) => {
    lookup(hostname, (err, address) => {
      if (err) return resolve({ safe: false, error: `DNS resolution failed: ${err.message}` });
      if (isPrivateIP(address)) return resolve({ safe: false, ip: address, error: `Private IP blocked: ${address}` });
      resolve({ safe: true, ip: address });
    });
  });
}

const REDACTION_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  { name: 'openai', pattern: /sk-[a-zA-Z0-9]{20,}/g },
  { name: 'github', pattern: /ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{22,}/g },
  { name: 'slack', pattern: /xox[bpsra]-[a-zA-Z0-9-]+/g },
  { name: 'google', pattern: /AIza[a-zA-Z0-9_-]{35}/g },
  { name: 'bearer', pattern: /Bearer\s+[a-zA-Z0-9._-]{20,}/gi },
  { name: 'perplexity', pattern: /pplx-[a-zA-Z0-9]{20,}/g },
  { name: 'npm', pattern: /npm_[a-zA-Z0-9]{36}/g },
  { name: 'telegram', pattern: /\d{9,10}:[a-zA-Z0-9_-]{35}/g },
  { name: 'aws_key', pattern: /AKIA[0-9A-Z]{16}/g },
  { name: 'private_key', pattern: /-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |DSA )?PRIVATE KEY-----/g },
];

export function redactSensitiveText(text: string): string {
  let result = text;
  for (const { pattern } of REDACTION_PATTERNS) {
    result = result.replace(pattern, (match) => {
      if (match.length > 16) return match.slice(0, 6) + '...' + match.slice(-4);
      return '***';
    });
  }
  return result;
}

export function isWithinDir(rootDir: string, targetPath: string): boolean {
  const resolved = rootDir.endsWith('/') ? rootDir : rootDir + '/';
  const resolvedTarget = targetPath.replace(/\\/g, '/');
  const resolvedRoot = resolved.replace(/\\/g, '/');
  return resolvedTarget.startsWith(resolvedRoot);
}

export function safePath(rootDir: string, targetPath: string): { safe: boolean; resolved?: string; error?: string } {
  const path = require('path');
  const resolved = path.resolve(rootDir, targetPath);
  if (!isWithinDir(rootDir, resolved)) {
    return { safe: false, error: 'Path traversal detected' };
  }
  return { safe: true, resolved };
}
