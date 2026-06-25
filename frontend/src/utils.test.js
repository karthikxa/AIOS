import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderMarkdown, extractCodeBlocks, isMaskedKey, normalizeBaseUrl, phaseDefs, TasksStore } from './utils.js';

describe('renderMarkdown', () => {
  it('escapes HTML special chars', () => {
    const result = renderMarkdown('<script>alert("xss")</script>');
    expect(result).toContain('&lt;script&gt;');
    expect(result).not.toContain('<script>');
  });

  it('renders bold text', () => {
    const result = renderMarkdown('hello **world**');
    expect(result).toContain('<strong>world</strong>');
  });

  it('renders italic text', () => {
    const result = renderMarkdown('hello *world*');
    expect(result).toContain('<em>world</em>');
  });

  it('renders inline code', () => {
    const result = renderMarkdown('use `code` here');
    expect(result).toContain('<code');
    expect(result).toContain('code');
  });

  it('renders code blocks', () => {
    const result = renderMarkdown('```js\nconsole.log("hi")\n```');
    expect(result).toContain('view-artifact-btn');
    expect(result).toContain('console.log');
    expect(result).toContain('Copy');
  });

  it('renders bullet lists', () => {
    const result = renderMarkdown('- item one\n- item two');
    expect(result).toContain('• item one');
    expect(result).toContain('• item two');
  });

  it('renders ## headings', () => {
    const result = renderMarkdown('## Section');
    expect(result).toContain('font-size:17px');
    expect(result).toContain('Section');
  });

  it('renders ### headings', () => {
    const result = renderMarkdown('### Subsection');
    expect(result).toContain('font-size:15px');
    expect(result).toContain('Subsection');
  });

  it('renders horizontal rules', () => {
    const result = renderMarkdown('before\n---\nafter');
    expect(result).toContain('<hr');
  });

  it('renders citations', () => {
    const result = renderMarkdown('[source](42)');
    expect(result).toContain('citation-marker');
    expect(result).toContain('Source 42');
  });

  it('converts newlines to <br>', () => {
    const result = renderMarkdown('line1\nline2');
    expect(result).toContain('<br>');
  });
});

describe('extractCodeBlocks', () => {
  it('returns empty array for no code blocks', () => {
    expect(extractCodeBlocks('plain text')).toEqual([]);
  });

  it('extracts a code block with language', () => {
    const result = extractCodeBlocks('text\n```python\nprint("hi")\n```\nmore text');
    expect(result).toEqual([{ lang: 'python', code: 'print("hi")\n' }]);
  });

  it('extracts code block without language', () => {
    const result = extractCodeBlocks('```\nhello\n```');
    expect(result).toEqual([{ lang: 'text', code: 'hello\n' }]);
  });

  it('extracts multiple code blocks', () => {
    const result = extractCodeBlocks('```js\na\n```\n\n```css\nb\n```');
    expect(result).toHaveLength(2);
    expect(result[0].lang).toBe('js');
    expect(result[1].lang).toBe('css');
  });
});

describe('isMaskedKey', () => {
  it('returns true for empty/undefined/null', () => {
    expect(isMaskedKey('')).toBe(true);
    expect(isMaskedKey(undefined)).toBe(true);
    expect(isMaskedKey(null)).toBe(true);
  });

  it('returns true for bullet-masked keys', () => {
    expect(isMaskedKey('••••••••••')).toBe(true);
  });

  it('returns true for asterisk-masked keys', () => {
    expect(isMaskedKey('******')).toBe(true);
  });

  it('returns false for real API keys', () => {
    expect(isMaskedKey('sk-real-key-12345')).toBe(false);
  });
});

describe('normalizeBaseUrl', () => {
  it('returns empty string for empty input', () => {
    expect(normalizeBaseUrl('')).toBe('');
    expect(normalizeBaseUrl(null)).toBe('');
    expect(normalizeBaseUrl(undefined)).toBe('');
  });

  it('preserves https:// prefix', () => {
    expect(normalizeBaseUrl('https://api.openai.com')).toBe('https://api.openai.com');
  });

  it('preserves http:// prefix', () => {
    expect(normalizeBaseUrl('http://localhost:11434')).toBe('http://localhost:11434');
  });

  it('adds http:// for localhost', () => {
    expect(normalizeBaseUrl('localhost:11434')).toBe('http://localhost:11434');
  });

  it('adds https:// for remote hosts', () => {
    expect(normalizeBaseUrl('api.groq.com')).toBe('https://api.groq.com');
  });

  it('strips trailing slash', () => {
    expect(normalizeBaseUrl('https://api.openai.com/')).toBe('https://api.openai.com');
  });
});

describe('phaseDefs', () => {
  it('defines all phase keys', () => {
    const keys = ['thinking', 'searching_web', 'reading_file', 'analyzing_image', 'researching', 'writing_response', 'creating_document'];
    keys.forEach(k => {
      expect(phaseDefs[k]).toBeDefined();
      expect(typeof phaseDefs[k].icon).toBe('string');
      expect(typeof phaseDefs[k].label).toBe('string');
    });
  });
});

describe('TasksStore', () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = new TasksStore();
  });

  it('starts with empty tasks', () => {
    expect(store.tasks).toEqual([]);
    expect(store.activeId).toBeNull();
  });

  it('adds a task', () => {
    const id = store.addTask('test', []);
    expect(store.tasks).toHaveLength(1);
    expect(store.tasks[0].name).toBe('test');
    expect(store.activeId).toBe(id);
  });

  it('deletes a task', () => {
    const id = store.addTask('test', []);
    store.deleteTask(id);
    expect(store.tasks).toHaveLength(0);
    expect(store.activeId).toBeNull();
  });

  it('renames a task', () => {
    const id = store.addTask('old', []);
    store.renameTask(id, 'new');
    expect(store.tasks[0].name).toBe('new');
  });

  it('toggles star on a task', () => {
    const id = store.addTask('test', []);
    expect(store.tasks[0].starred).toBe(false);
    store.toggleStar(id);
    expect(store.tasks[0].starred).toBe(true);
    store.toggleStar(id);
    expect(store.tasks[0].starred).toBe(false);
  });

  it('sets active task', () => {
    const id = store.addTask('a', []);
    const id2 = store.addTask('b', []);
    store.setActive(id);
    expect(store.activeId).toBe(id);
    expect(store.getActive().name).toBe('a');
  });

  it('persists to localStorage', () => {
    store.addTask('persist', []);
    const saved = JSON.parse(localStorage.getItem('zed-tasks'));
    expect(saved).toHaveLength(1);
    expect(saved[0].name).toBe('persist');
  });

  it('notifies subscribers on changes', () => {
    const listener = vi.fn();
    store.subscribe(listener);
    store.addTask('test', []);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes listeners', () => {
    const listener = vi.fn();
    const unsub = store.subscribe(listener);
    unsub();
    store.addTask('test', []);
    expect(listener).not.toHaveBeenCalled();
  });
});
