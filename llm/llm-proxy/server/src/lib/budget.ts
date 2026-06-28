// Monthly free-tier budgets are stored as human labels like '~120M', '~50-100M',
// '~12M', or '~500K'. Parse the upper bound to an absolute token count for
// quota math (headroom guardrail, token-usage bar). Returns 0 for unknown/empty
// labels, which callers treat as "no budget info".
export function parseBudget(s: string): number {
  if (!s) return 0;
  const m = s.match(/^~?([\d.]+)(?:-([\d.]+))?([MK])?$/);
  if (!m) return 0;
  const high = parseFloat(m[2] ?? m[1]);
  if (Number.isNaN(high)) return 0;
  const unit = m[3] === 'M' ? 1_000_000 : m[3] === 'K' ? 1_000 : 1;
  return high * unit;
}

/**
 * Returns a SQL datetime expression for the token quota window start.
 * Controlled by TOKEN_QUOTA_WINDOW_DAYS env var (default: 30).
 * Set to 2 or 3 to make the token budget refresh every 2-3 days instead of monthly.
 */
export function quotaWindowDays(): number {
  const val = Number(process.env.TOKEN_QUOTA_WINDOW_DAYS);
  return Number.isFinite(val) && val > 0 ? val : 30;
}

export function quotaWhereClause(): string {
  return `created_at >= datetime('now', '-${quotaWindowDays()} days')`;
}
