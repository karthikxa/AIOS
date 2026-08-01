import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export interface ParsedDocument {
  title: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  byline: string;
  dir: string;
  siteName: string;
  lang: string;
  links: Array<{ text: string; href: string }>;
  images: Array<{ src: string; alt: string }>;
}

export interface MarkdownResult {
  html: string;
  tokens: any[];
}

export function parseHTMLDocument(html: string, url?: string): ParsedDocument {
  const { document } = parseHTML(html);

  const reader = new Readability(document as any, {
    charThreshold: 100,
    keepClasses: false,
  });

  const article = reader.parse();

  if (!article) {
    return {
      title: '',
      content: '',
      textContent: '',
      length: 0,
      excerpt: '',
      byline: '',
      dir: '',
      siteName: '',
      lang: '',
      links: [],
      images: [],
    };
  }

  // Extract links
  const links: Array<{ text: string; href: string }> = [];
  const linkElements = document.querySelectorAll('a[href]');
  linkElements.forEach((el: any) => {
    const text = el.textContent?.trim() || '';
    const href = el.getAttribute('href') || '';
    if (text && href) {
      links.push({ text, href });
    }
  });

  // Extract images
  const images: Array<{ src: string; alt: string }> = [];
  const imgElements = document.querySelectorAll('img');
  imgElements.forEach((el: any) => {
    const src = el.getAttribute('src') || '';
    const alt = el.getAttribute('alt') || '';
    if (src) {
      images.push({ src, alt });
    }
  });

  return {
    title: article.title || '',
    content: article.content || '',
    textContent: article.textContent || '',
    length: article.length || 0,
    excerpt: article.excerpt || '',
    byline: article.byline || '',
    dir: article.dir || '',
    siteName: article.siteName || '',
    lang: article.lang || '',
    links,
    images,
  };
}

export function markdownToHTML(markdown: string): MarkdownResult {
  const html = md.render(markdown);
  const tokens = md.parse(markdown, {});
  return { html, tokens };
}

export function extractTextFromHTML(html: string): string {
  const { document } = parseHTML(html);
  return (document as any).body?.textContent || '';
}

export function extractLinksFromHTML(html: string): Array<{ text: string; href: string }> {
  const { document } = parseHTML(html);
  const links: Array<{ text: string; href: string }> = [];
  const linkElements = document.querySelectorAll('a[href]');
  linkElements.forEach((el: any) => {
    const text = el.textContent?.trim() || '';
    const href = el.getAttribute('href') || '';
    if (text && href) {
      links.push({ text, href });
    }
  });
  return links;
}

export function sanitizeHTML(html: string): string {
  const { document } = parseHTML(html);

  // Remove script and style tags
  document.querySelectorAll('script, style, iframe, object, embed').forEach((el: any) => el.remove());

  // Remove event handlers
  document.querySelectorAll('*').forEach((el: any) => {
    const attrs = el.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i];
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    }
  });

  return (document as any).body?.innerHTML || '';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function extractSummary(text: string, sentenceCount: number = 3): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, sentenceCount).join(' ').trim();
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

export function extractKeywords(text: string, topN: number = 10): string[] {
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const freq: Record<string, number> = {};
  const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'has', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'way', 'who', 'did', 'get', 'let', 'say', 'she', 'too', 'use']);

  words.forEach(word => {
    if (!stopWords.has(word)) {
      freq[word] = (freq[word] || 0) + 1;
    }
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);
}
