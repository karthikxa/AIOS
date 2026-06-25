import DOMPurify from 'dompurify';

export function renderMarkdown(text) {
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const langLabel = lang ? `<span style="font-size:11px;color:#6B7280;padding:2px 10px;background:#F3F4F6;border-radius:4px 4px 0 0;display:inline-block;font-family:monospace;">${lang}</span>` : '';
    const safeCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `<div style="margin:10px 0;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">${langLabel}<pre style="background:#1E1E2E;color:#CDD6F4;padding:14px;margin:0;overflow-x:auto;font-size:13px;line-height:1.5;font-family:'JetBrains Mono',monospace;">${safeCode}</pre><div style="display:flex;gap:6px;padding:6px 10px;background:#F9FAFB;border-top:1px solid #E5E7EB;"><button class="view-artifact-btn" data-lang="${lang}" style="background:none;border:1px solid #D1D5DB;border-radius:5px;padding:3px 10px;font-size:12px;cursor:pointer;color:#374151;">Open in Artifact</button><button class="copy-code-btn" data-code="${safeCode.replace(/"/g, '&quot;')}" style="background:none;border:1px solid #D1D5DB;border-radius:5px;padding:3px 10px;font-size:12px;cursor:pointer;color:#374151;">Copy</button></div></div>`;
  });
  // Tables
  html = html.replace(/\n((\|[^\n]+\|\n)((\|[^\n]+\|\n?))+)/g, (match) => {
    const rows = match.trim().split('\n');
    let tableHtml = '<table style="border-collapse:collapse;margin:10px 0;width:100%;font-size:13px;">';
    rows.forEach((row, ri) => {
      if (row.match(/^\|[\s:-]+\|/)) return;
      const tag = ri === 0 ? 'th' : 'td';
      const cells = row.split('|').filter(c => c.trim() !== '' || row.indexOf(c) > 0);
      tableHtml += '<tr>';
      cells.forEach(cell => {
        tableHtml += `<${tag} style="border:1px solid #E5E7EB;padding:6px 10px;text-align:left;${ri === 0 ? 'background:#F9FAFB;font-weight:600;' : ''}">${cell.trim()}</${tag}>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</table>';
    return tableHtml;
  });
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:#F3F4F6;padding:2px 5px;border-radius:4px;font-size:13px;font-family:monospace;color:#E74C3C;">$1</code>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline citations [source]
  html = html.replace(/\[source\]\((\d+)\)/g, '<a href="#" class="citation-marker" title="Source $1">$1</a>');
  // Bullet lists (* or -)
  html = html.replace(/^[\s]*[-*]\s+(.+)$/gm, '<span style="color:#6B7280;margin-right:6px;">•</span>$1');
  // Numbered lists
  html = html.replace(/^(\d+\.)\s+(.+)$/gm, '<span style="color:#6B7280;margin-right:4px;">$1</span> $2');
  // Headings
  html = html.replace(/^### (.+)$/gm, '<div style="font-size:14.5px;font-weight:600;margin:12px 0 6px;color:#111827;">$1</div>');
  html = html.replace(/^## (.+)$/gm, '<div style="font-size:16px;font-weight:600;margin:14px 0 6px;color:#111827;">$1</div>');
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #E5E7EB;margin:16px 0;">');
  // Line breaks
  html = html.replace(/\n/g, '<br>');
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['div', 'span', 'pre', 'code', 'br', 'strong', 'em', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a', 'button', 'hr', 'ul', 'li', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'text'], ALLOWED_ATTR: ['style', 'class', 'id', 'href', 'target', 'rel', 'src', 'alt', 'title', 'data-lang', 'data-code', 'width', 'height', 'viewbox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'xmlns', 'd', 'cx', 'cy', 'r', 'x1', 'x2', 'y1', 'y2', 'font-family', 'font-weight', 'font-size', 'dominant-baseline', 'text-anchor'] });
}

export function extractCodeBlocks(text) {
  const blocks = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    blocks.push({ lang: match[1] || 'text', code: match[2] });
  }
  return blocks;
}

export function isMaskedKey(key) {
  if (!key) return true;
  return /^[•\*]{4,}$/.test(key.trim());
}

export function normalizeBaseUrl(input) {
  const raw = (input || '').trim().replace(/\/$/, '');
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^\//.test(raw)) return raw;
  if (/^localhost[:/]?|^127\.0\.0\.1[:/]?|^0\.0\.0\.0[:/]?/i.test(raw)) return `http://${raw}`;
  return `https://${raw}`;
}

export const phaseDefs = {
  thinking: { icon: '<div class="spinner-mini"></div>', label: 'Thinking...' },
  searching_web: { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', label: 'Searched the web' },
  reading_file: { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>', label: 'Read file' },
  analyzing_image: { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>', label: 'Analyzed image' },
  researching: { icon: '<div class="spinner-mini"></div>', label: 'Researching...' },
  writing_response: { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>', label: 'Writing response...' },
  creating_document: { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>', label: 'Created document' }
};

export class TasksStore {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('zed-tasks') || '[]');
    this.activeId = null;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  notify() {
    localStorage.setItem('zed-tasks', JSON.stringify(this.tasks));
    this.listeners.forEach(l => l(this));
  }

  addTask(name, messages) {
    const id = `task-${Date.now()}`;
    this.tasks.push({ id, name, starred: false, messages: messages || [] });
    this.activeId = id;
    this.notify();
    return id;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.activeId === id) this.activeId = null;
    this.notify();
  }

  renameTask(id, newName) {
    const task = this.tasks.find(t => t.id === id);
    if (task) { task.name = newName; this.notify(); }
  }

  toggleStar(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) { task.starred = !task.starred; this.notify(); }
  }

  setActive(id) {
    this.activeId = id;
    this.notify();
  }

  getActive() {
    return this.tasks.find(t => t.id === this.activeId);
  }
}
