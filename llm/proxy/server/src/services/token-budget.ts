import { getDb } from '../db/index.js';

const REFILL_AMOUNT = 1_800_000_000;
const REFILL_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000;

interface BudgetRow {
  key_id: number;
  budget_remaining: number;
  last_refill_at: number;
  total_granted: number;
}

function getBudgetRow(keyId: number): BudgetRow | undefined {
  return getDb().prepare(
    'SELECT key_id, budget_remaining, last_refill_at, total_granted FROM key_token_budgets WHERE key_id = ?'
  ).get(keyId) as BudgetRow | undefined;
}

function seedBudget(keyId: number): void {
  const now = Date.now();
  getDb().prepare(`
    INSERT OR IGNORE INTO key_token_budgets (key_id, budget_remaining, last_refill_at, total_granted)
    VALUES (?, ?, ?, ?)
  `).run(keyId, REFILL_AMOUNT, now, REFILL_AMOUNT);
}

/** Atomically refill the budget if the 3-day interval has elapsed. */
function refillIfNeeded(keyId: number): void {
  getDb().prepare(`
    UPDATE key_token_budgets
    SET budget_remaining = budget_remaining + ?,
        total_granted = total_granted + ?,
        last_refill_at = ?
    WHERE key_id = ? AND ? - last_refill_at >= ?
  `).run(REFILL_AMOUNT, REFILL_AMOUNT, Date.now(), keyId, Date.now(), REFILL_INTERVAL_MS);
}

/**
 * Check whether this key has enough budget remaining (after auto-refill).
 * Auto-seeds a budget row if one doesn't exist (covers keys created before the
 * migration).
 * Note: the actual budget deduction happens in deductBudget which is atomic,
 * so between check and deduct another request may consume budget. This is a
 * race that can cause brief over-budget; acceptable for a single-process proxy.
 */
export function canUseBudget(keyId: number, estimatedTokens: number): boolean {
  const row = getBudgetRow(keyId);
  if (!row) {
    seedBudget(keyId);
    return estimatedTokens <= REFILL_AMOUNT;
  }
  refillIfNeeded(keyId);
  // Re-read after refill to get the latest value
  const updated = getBudgetRow(keyId);
  return (updated?.budget_remaining ?? 0) >= estimatedTokens;
}

/**
 * Deduct used tokens from the key's budget atomically.
 * Must be called AFTER a successful request completes.
 * Auto-seeds a budget row if one doesn't exist.
 */
export function deductBudget(keyId: number, tokens: number): void {
  refillIfNeeded(keyId);
  const { changes } = getDb().prepare(`
    UPDATE key_token_budgets
    SET budget_remaining = MAX(0, budget_remaining - ?)
    WHERE key_id = ?
  `).run(tokens, keyId);
  if (changes === 0) {
    seedBudget(keyId);
  }
}

/**
 * Get budget info for the dashboard.
 */
export function getBudgetInfo(keyId: number): { remaining: number; totalGranted: number; nextRefillAt: number } | null {
  const row = getBudgetRow(keyId);
  if (!row) return null;
  const now = Date.now();
  const elapsed = now - row.last_refill_at;
  const nextRefillAt = elapsed >= REFILL_INTERVAL_MS ? now : row.last_refill_at + REFILL_INTERVAL_MS;
  return {
    remaining: Math.max(0, row.budget_remaining),
    totalGranted: row.total_granted,
    nextRefillAt,
  };
}
