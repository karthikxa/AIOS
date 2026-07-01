import DOMPurify from 'dompurify';

export function renderMarkdown(text) {
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const safeCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const rawCodeEscaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    const langLabel = lang || 'code';
    
    return `<div class="code-artifact-box" style="margin: 16px 0; background: rgba(30, 30, 46, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);">
  <div class="code-artifact-header" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: rgba(26, 26, 38, 0.85); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 10px; height: 10px; border-radius: 50%; background: #FF5F56; display: inline-block;"></span>
      <span style="width: 10px; height: 10px; border-radius: 50%; background: #FFBD2E; display: inline-block;"></span>
      <span style="width: 10px; height: 10px; border-radius: 50%; background: #27C93F; display: inline-block;"></span>
      <span class="code-lang-label" style="margin-left: 12px; font-size: 11px; color: #9CA3AF; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">${langLabel}</span>
    </div>
    <div class="code-artifact-actions" style="display: flex; gap: 6px; align-items: center;">
      <button class="code-btn edit-code-btn" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer; color: #E0E0E6; transition: all 0.2s; font-family: inherit;">Edit</button>
      <button class="code-btn share-code-btn" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer; color: #E0E0E6; transition: all 0.2s; font-family: inherit;">Share</button>
      <button class="code-btn download-code-btn" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer; color: #E0E0E6; transition: all 0.2s; font-family: inherit;">Download</button>
      <button class="code-btn copy-code-btn" data-code="${rawCodeEscaped}" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer; color: #E0E0E6; transition: all 0.2s; font-family: inherit;">Copy</button>
    </div>
  </div>
  <div class="code-content-wrapper" style="position: relative; background: #1E1E2E;">
    <pre class="code-content-view" style="color: #CDD6F4; padding: 16px; margin: 0; overflow-x: auto; font-size: 13px; line-height: 1.6; font-family: 'JetBrains Mono', monospace; background: transparent;">${safeCode}</pre>
    <textarea class="code-content-edit" style="display: none; width: 100%; min-height: 150px; background: #151520; color: #CDD6F4; border: none; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.6; outline: none; resize: vertical; box-sizing: border-box;"></textarea>
  </div>
  <div class="code-edit-footer" style="display: none; justify-content: flex-end; gap: 8px; padding: 8px 16px; background: rgba(20, 20, 30, 0.9); border-top: 1px solid rgba(255, 255, 255, 0.05);">
    <button class="code-btn cancel-edit-btn" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 5px 12px; font-size: 12px; cursor: pointer; color: #E0E0E6; font-family: inherit;">Cancel</button>
    <button class="code-btn save-edit-btn" style="background: #3B82F6; border: none; border-radius: 6px; padding: 5px 12px; font-size: 12px; cursor: pointer; color: white; font-weight: 500; font-family: inherit;">Save</button>
  </div>
  <div class="code-artifact-footer" style="display: flex; gap: 8px; padding: 8px 16px; background: rgba(20, 20, 30, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.05); align-items: center;">
    <button class="code-btn view-artifact-btn" data-lang="${lang}" style="background: none; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer; color: #A6ADC8; transition: all 0.2s; font-family: inherit;">Open in Artifact</button>
  </div>
</div>`;
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
  // Line breaks — but NOT inside <pre> blocks (code blocks preserve their own newlines)
  html = html.replace(/(<pre[\s\S]*?<\/pre>)/g, (match) => '%%PRE_BLOCK%%' + btoa(unescape(encodeURIComponent(match))) + '%%/PRE_BLOCK%%');
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/%%PRE_BLOCK%%([A-Za-z0-9+/=]+)%%\/PRE_BLOCK%%/g, (_, encoded) => decodeURIComponent(escape(atob(encoded))));
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['div', 'span', 'pre', 'code', 'textarea', 'br', 'strong', 'em', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a', 'button', 'hr', 'ul', 'li', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'text'], ALLOWED_ATTR: ['style', 'class', 'id', 'href', 'target', 'rel', 'src', 'alt', 'title', 'data-lang', 'data-code', 'width', 'height', 'viewbox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'xmlns', 'd', 'cx', 'cy', 'r', 'x1', 'x2', 'y1', 'y2', 'font-family', 'font-weight', 'font-size', 'dominant-baseline', 'text-anchor'] });
}

export function extractCodeBlocks(text) {
  const blocks = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    let code = match[2];
    // Strip HTML tags that the LLM may have injected into code blocks
    code = code.replace(/<br\s*\/?>/gi, '\n');
    code = code.replace(/<[^>]+>/g, '');
    blocks.push({ lang: match[1] || 'text', code });
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
