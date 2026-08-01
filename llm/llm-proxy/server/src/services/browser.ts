import type { Browser, Page } from 'playwright-core';

let _chromium: any = null;

async function getChromium() {
  if (!_chromium) {
    const pw = await import('playwright-core');
    _chromium = pw.chromium;
  }
  return _chromium;
}

export interface BrowserSession {
  browser: Browser;
  page: Page;
  createdAt: number;
}

const sessions = new Map<string, BrowserSession>();

function sessionId(): string {
  return `browser-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function launchBrowser(options?: { headless?: boolean; executablePath?: string }): Promise<string> {
  const chromium = await getChromium();
  const browser = await chromium.launch({
    headless: options?.headless ?? true,
    executablePath: options?.executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const id = sessionId();
  sessions.set(id, { browser, page, createdAt: Date.now() });
  return id;
}

function getSession(id: string): BrowserSession {
  const s = sessions.get(id);
  if (!s) throw new Error(`Session ${id} not found. Launch a browser first.`);
  return s;
}

export async function navigateToPage(sessionId: string, url: string): Promise<{ title: string; url: string }> {
  const { page } = getSession(sessionId);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  return { title: await page.title(), url: page.url() };
}

export async function takeScreenshot(sessionId: string, options?: { selector?: string; fullPage?: boolean }): Promise<Buffer> {
  const { page } = getSession(sessionId);
  if (options?.selector) {
    const el = await page.$(options.selector);
    if (!el) throw new Error(`Element not found: ${options.selector}`);
    return el.screenshot({ type: 'png' }) as Promise<Buffer>;
  }
  return page.screenshot({ type: 'png', fullPage: options?.fullPage ?? false }) as Promise<Buffer>;
}

export interface PageContent {
  title: string;
  url: string;
  text: string;
  links: Array<{ text: string; href: string }>;
  meta: Record<string, string>;
}

export async function extractPageContent(sessionId: string): Promise<PageContent> {
  const { page } = getSession(sessionId);
  const title = await page.title();
  const url = page.url();
  const text = await page.evaluate(() => (document.body as HTMLElement)?.innerText ?? '');

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map((a) => ({
      text: (a as HTMLElement).innerText.trim(),
      href: (a as HTMLAnchorElement).href,
    })).filter((l) => l.href && l.text)
  );

  const meta = await page.evaluate(() => {
    const result: Record<string, string> = {};
    document.querySelectorAll('meta[name], meta[property]').forEach((m) => {
      const key = m.getAttribute('name') || m.getAttribute('property') || '';
      const val = m.getAttribute('content') || '';
      if (key && val) result[key] = val;
    });
    return result;
  });

  return { title, url, text, links, meta };
}

export interface StructuredContent {
  title: string;
  headings: Array<{ level: number; text: string }>;
  paragraphs: string[];
  codeBlocks: Array<{ language: string; code: string }>;
  images: Array<{ src: string; alt: string }>;
}

export async function extractStructuredContent(sessionId: string): Promise<StructuredContent> {
  const { page } = getSession(sessionId);
  return page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((h) => ({
      level: parseInt(h.tagName[1]),
      text: (h as HTMLElement).innerText.trim(),
    }));
    const paragraphs = Array.from(document.querySelectorAll('p')).map((p) => (p as HTMLElement).innerText.trim()).filter(Boolean);
    const codeBlocks = Array.from(document.querySelectorAll('pre code')).map((c) => ({
      language: c.className.replace('language-', '') || 'text',
      code: (c as HTMLElement).innerText,
    }));
    const images = Array.from(document.querySelectorAll('img')).map((i) => ({
      src: (i as HTMLImageElement).src,
      alt: i.getAttribute('alt') || '',
    }));
    return { title: document.title, headings, paragraphs, codeBlocks, images };
  });
}

export async function clickElement(sessionId: string, selector: string): Promise<void> {
  const { page } = getSession(sessionId);
  await page.click(selector, { timeout: 10_000 });
}

export async function fillForm(sessionId: string, fields: Record<string, string>): Promise<void> {
  const { page } = getSession(sessionId);
  for (const [selector, value] of Object.entries(fields)) {
    await page.fill(selector, value, { timeout: 5_000 });
  }
}

export async function scrollPage(sessionId: string, direction: 'up' | 'down', amount?: number): Promise<void> {
  const { page } = getSession(sessionId);
  const delta = amount ?? 500;
  await page.evaluate((d) => window.scrollBy(0, d), direction === 'down' ? delta : -delta);
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export async function searchWeb(sessionId: string, query: string, engine?: string): Promise<SearchResult[]> {
  const { page } = getSession(sessionId);
  const searchUrl = engine === 'bing'
    ? `https://www.bing.com/search?q=${encodeURIComponent(query)}`
    : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15_000 });

  return page.evaluate(() => {
    const results: Array<{ title: string; url: string; snippet: string }> = [];
    document.querySelectorAll('div.g, li.b_algo').forEach((el) => {
      const linkEl = el.querySelector('a[href]');
      const titleEl = el.querySelector('h3');
      const snippetEl = el.querySelector('.VwiC3b, .b_caption p');
      if (linkEl && titleEl) {
        results.push({
          title: (titleEl as HTMLElement).innerText.trim(),
          url: (linkEl as HTMLAnchorElement).href,
          snippet: (snippetEl as HTMLElement | null)?.innerText?.trim() ?? '',
        });
      }
    });
    return results.slice(0, 10);
  });
}

export async function closeBrowser(sessionId: string): Promise<void> {
  const s = sessions.get(sessionId);
  if (s) {
    await s.browser.close().catch(() => {});
    sessions.delete(sessionId);
  }
}

export function listSessions(): string[] {
  return Array.from(sessions.keys());
}
