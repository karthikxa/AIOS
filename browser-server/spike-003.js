'use strict';
const CURRENT_FALLBACK = 'https://server-llm-1-0r64.onrender.com/v1';

function currentBehavior() {
  const baseUrl = process.env.ZED_PRO_BASE_URL || CURRENT_FALLBACK;
  const apiKey = process.env.ZED_PRO_API_KEY || process.env.OPENAI_API_KEY || 'no-key';
  return { baseUrl, apiKey };
}

function strictBehavior() {
  const baseUrl = process.env.ZED_PRO_BASE_URL;
  const apiKey = process.env.ZED_PRO_API_KEY;
  if (!baseUrl || !apiKey) throw new Error('Missing required upstream env config');
  return { baseUrl, apiKey };
}

console.log('current-missing', JSON.stringify(currentBehavior()));
try {
  console.log('strict-missing', JSON.stringify(strictBehavior()));
} catch (e) {
  console.log('strict-missing-error', e.message);
}
