// Chat Box input interactions
export function initChatBox(onSend) {
  const chatPromptInput = document.getElementById('chatPromptInput');
  const btnSend = document.getElementById('btnSend');
  const attachBtn = document.getElementById('attachBtn');
  const attachDropdown = document.getElementById('attachDropdown');

  // ── Slash & Mention Popover (dynamic from backend) ────────────────────
  // Fetch all tools from backend and build slash commands with monochrome icons
  let SLASH_COMMANDS = [
    // Built-in commands (always shown)
    { id: 'agent', label: '/agent', description: 'Switch to Agent mode (delegation with sub-agents)', icon: '⬡' },
    { id: 'computer', label: '/computer', description: 'Switch to Computer mode (desktop control)', icon: '◧' },
    { id: 'memory', label: '/memory', description: 'View and manage persistent memory', icon: '◻' },
    { id: 'skills', label: '/skills', description: 'Browse and activate skills', icon: '◎' },
    { id: 'schedule', label: '/schedule', description: 'Create a scheduled task', icon: '◷' },
    { id: 'agents', label: '/agents', description: 'Manage AI agents', icon: '◇' },
    { id: 'config', label: '/config', description: 'View and update settings', icon: '⊞' },
    { id: 'status', label: '/status', description: 'Check system status', icon: '◉' },
  ];

  // Fetch tools from backend and add as slash commands
  fetch('/api/tools')
    .then(r => r.json())
    .then(data => {
      const toolIcons = {
        gmail: '✉', drive: '▤', calendar: '▦', tasks: '☑', contacts: '⊕',
        photos: '△', youtube: '▷', docs: '▤', sheets: '▦', slides: '▷',
        chat: '◈', meet: '◎', fit: '◐', classroom: '◑',
        web_search: '◎', web_extract: '◑', terminal: '▸', read_file: '▤',
        write_file: '▤', search_files: '⌕', patch: '✎', memory: '◻',
        session_search: '⌕', cronjob: '◷', todo: '☑', delegate_task: '◇',
        clarify: '?', execute_code: '▸', vision_analyze: '◈', image_generate: '△',
        text_to_speech: '♪', video_generate: '▷', skill_manage: '◎', skills_list: '◎',
        skill_view: '◎', browser_navigate: '◎', browser_click: '◎',
        process: '▸', concurrent_swarm: '◇', sequential_swarm: '◇',
        hierarchical_swarm: '◇', swarm_router: '◇', graph_swarm: '◇',
        heavy_swarm: '◇', forest_swarm: '◇', group_chat_swarm: '◇',
        agent_rearrange_swarm: '◇', mixture_of_agents_swarm: '◇',
      };
      const backendTools = (data.tools || []).map(t => ({
        id: t.function?.name || '',
        label: '/' + (t.function?.name || ''),
        description: (t.function?.description || '').slice(0, 60) || `Use ${t.function?.name}`,
        icon: toolIcons[t.function?.name] || '◎',
      }));
      // Merge: built-in commands first, then all tools
      SLASH_COMMANDS = [...SLASH_COMMANDS, ...backendTools];
    })
    .catch(() => {});

  // ── @ Mention: Google plugins with official-style monochrome SVG icons ──
  let MENTION_ITEMS = [
    { id: 'gmail', label: 'Gmail', description: 'Send, read, search emails', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M2 7l10 7 10-7"/></svg>' },
    { id: 'drive', label: 'Drive', description: 'List, search, read files', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>' },
    { id: 'calendar', label: 'Calendar', description: 'List, create, update events', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>' },
    { id: 'tasks', label: 'Tasks', description: 'List, create, update tasks', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>' },
    { id: 'contacts', label: 'Contacts', description: 'List, create, update contacts', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'photos', label: 'Photos', description: 'List albums, media', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>' },
    { id: 'youtube', label: 'YouTube', description: 'Search, get details, rate', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z"/></svg>' },
    { id: 'docs', label: 'Docs', description: 'List, read, create documents', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>' },
    { id: 'sheets', label: 'Sheets', description: 'List, read, create spreadsheets', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>' },
    { id: 'slides', label: 'Slides', description: 'List, read, create presentations', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
    { id: 'chat', label: 'Chat', description: 'List spaces, send messages', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
    { id: 'meet', label: 'Meet', description: 'Create meeting conferences', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15.5 7.5 5 5"/><path d="M4 20h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>' },
    { id: 'fit', label: 'Fit', description: 'Health and fitness data', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
    { id: 'classroom', label: 'Classroom', description: 'Courses, assignments, students', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>' },
  ];

  // Fetch connected plugins from backend
  fetch('/oauth/status?user_id=default')
    .then(r => r.json())
    .then(status => {
      // Mark connected plugins with a checkmark
      MENTION_ITEMS = MENTION_ITEMS.map(item => ({
        ...item,
        connected: !!status[item.id],
        label: status[item.id] ? `${item.label} ✓` : item.label,
      }));
    })
    .catch(() => {});

  let popover = null;
  let activeTrigger = null; // '/' or '@'
  let activeItems = [];
  let highlightedIndex = 0;
  let query = '';

  function createPopover() {
    if (popover) return popover;
    popover = document.createElement('div');
    popover.id = 'triggerPopover';
    popover.style.cssText = `
      position: absolute; bottom: 100%; left: 0; margin-bottom: 8px;
      width: 280px; max-height: 320px; overflow-y: auto;
      background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.12); z-index: 9999;
      padding: 4px; font-family: 'Inter', sans-serif; font-size: 14px;
      display: none;
    `;
    const wrapper = chatPromptInput?.closest('.chat-input-center-wrapper');
    if (wrapper) {
      wrapper.style.position = 'relative';
      wrapper.appendChild(popover);
    }
    return popover;
  }

  function renderPopover() {
    const p = createPopover();
    if (!activeTrigger || activeItems.length === 0) {
      p.style.display = 'none';
      return;
    }

    const filtered = activeItems.filter(item => {
      if (!query) return true;
      return item.label.toLowerCase().includes(query.toLowerCase()) ||
             item.description.toLowerCase().includes(query.toLowerCase());
    });

    if (filtered.length === 0) {
      p.style.display = 'none';
      return;
    }

    p.innerHTML = '';
    filtered.forEach((item, i) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.style.cssText = `
        display: flex; align-items: center; gap: 10px; width: 100%;
        padding: 8px 12px; border-radius: 8px; border: none; background: none;
        cursor: pointer; text-align: left; font-size: 14px; color: #111827;
        transition: background 0.1s; outline: none;
        ${i === highlightedIndex ? 'background: #f3f4f6;' : ''}
      `;
      // Render icon: SVG string or text symbol
      const iconHtml = item.icon.startsWith('<svg') ? item.icon : `<span style="font-size: 14px; color: #6b7280;">${item.icon}</span>`;
      row.innerHTML = `
        <span style="width: 24px; text-align: center; display: flex; align-items: center; justify-content: center;">${iconHtml}</span>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 500; font-size: 14px; color: #111827;">${item.label}</div>
          <div style="font-size: 12px; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.description}</div>
        </div>
        ${item.connected ? '<span style="color: #10b981; font-size: 12px;">●</span>' : ''}
        ${item.isCategory ? '<span style="color: #9ca3af;">›</span>' : ''}
      `;
      row.addEventListener('mouseenter', () => {
        highlightedIndex = i;
        renderPopover();
      });
      row.addEventListener('click', () => selectItem(item));
      p.appendChild(row);
    });

    p.style.display = 'block';
  }

  function selectItem(item) {
    if (!chatPromptInput) return;
    const val = chatPromptInput.value;
    const cursorPos = chatPromptInput.selectionStart;
    // Find the trigger character position
    const beforeCursor = val.substring(0, cursorPos);
    const triggerPos = beforeCursor.lastIndexOf(activeTrigger);
    if (triggerPos === -1) return;

    const before = val.substring(0, triggerPos);
    const after = val.substring(cursorPos);
    const insertText = item.isCategory ? `${activeTrigger}${item.id} ` : `${activeTrigger}${item.id} `;

    chatPromptInput.value = before + insertText + after;
    const newPos = before.length + insertText.length;
    chatPromptInput.setSelectionRange(newPos, newPos);
    chatPromptInput.focus();

    closePopover();
  }

  function closePopover() {
    activeTrigger = null;
    activeItems = [];
    highlightedIndex = 0;
    query = '';
    if (popover) popover.style.display = 'none';
  }

  function handleInput() {
    if (!chatPromptInput) return;
    const val = chatPromptInput.value;
    const cursorPos = chatPromptInput.selectionStart;
    const beforeCursor = val.substring(0, cursorPos);

    // Check for trigger character at end of input or after space
    const lastChar = beforeCursor.slice(-1);
    const charBeforeLast = beforeCursor.slice(-2, -1);

    if (lastChar === '/' && (beforeCursor.length === 1 || charBeforeLast === ' ' || charBeforeLast === '\n')) {
      activeTrigger = '/';
      activeItems = SLASH_COMMANDS;
      highlightedIndex = 0;
      query = '';
      renderPopover();
      return;
    }

    if (lastChar === '@' && (beforeCursor.length === 1 || charBeforeLast === ' ' || charBeforeLast === '\n')) {
      activeTrigger = '@';
      activeItems = MENTION_ITEMS;
      highlightedIndex = 0;
      query = '';
      renderPopover();
      return;
    }

    // If popover is active, update query
    if (activeTrigger) {
      const triggerPos = beforeCursor.lastIndexOf(activeTrigger);
      if (triggerPos === -1) {
        closePopover();
        return;
      }
      query = beforeCursor.substring(triggerPos + 1);
      // If query contains space, close
      if (query.includes(' ')) {
        closePopover();
        return;
      }
      highlightedIndex = 0;
      renderPopover();
    }
  }

  function handleKeyDown(e) {
    if (!activeTrigger || !popover || popover.style.display === 'none') return;

    const filtered = activeItems.filter(item => {
      if (!query) return true;
      return item.label.toLowerCase().includes(query.toLowerCase()) ||
             item.description.toLowerCase().includes(query.toLowerCase());
    });

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = (highlightedIndex + 1) % filtered.length;
      renderPopover();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = (highlightedIndex - 1 + filtered.length) % filtered.length;
      renderPopover();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (filtered[highlightedIndex]) {
        selectItem(filtered[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePopover();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (filtered[highlightedIndex]) {
        selectItem(filtered[highlightedIndex]);
      }
    }
  }

  // Close popover on outside click
  document.addEventListener('click', (e) => {
    if (popover && !popover.contains(e.target) && e.target !== chatPromptInput) {
      closePopover();
    }
  });

  // ── Attachment dropdown ─────────────────────────────────────────────
  if (attachBtn && attachDropdown) {
    attachBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      attachDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!attachDropdown.contains(e.target) && e.target !== attachBtn) {
        attachDropdown.classList.remove('show');
      }
    });
  }

  // Close context banner click handler
  const closeContextBannerBtn = document.getElementById('closeContextBannerBtn');
  const chatTopRow = document.getElementById('chatTopRow');
  if (closeContextBannerBtn && chatTopRow) {
    closeContextBannerBtn.addEventListener('click', () => {
      chatTopRow.style.display = 'none';
    });
  }

  // Auto-resize prompt textarea + trigger detection
  if (chatPromptInput) {
    chatPromptInput.addEventListener('input', () => {
      chatPromptInput.style.height = 'auto';
      chatPromptInput.style.height = (chatPromptInput.scrollHeight) + 'px';
      handleInput();
    });

    chatPromptInput.addEventListener('keydown', (e) => {
      handleKeyDown(e);
      if (e.key === 'Enter' && !e.shiftKey && !activeTrigger) {
        e.preventDefault();
        submitMessage();
      }
    });
  }

  // Send Button click
  if (btnSend) {
    btnSend.addEventListener('click', () => {
      submitMessage();
    });
  }

  if (attachDropdown) {
    attachDropdown.querySelectorAll('.attachment-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.querySelector('span').textContent;
        attachDropdown.classList.remove('show');
        if (action === 'Add files') {
          const input = document.createElement('input');
          input.type = 'file';
          input.multiple = true;
          input.click();
        } else {
          showToast(`"${action}" is not yet implemented.`, 'info');
        }
      });
    });
  }

  function submitMessage() {
    if (!chatPromptInput) return;
    const text = chatPromptInput.value.trim();
    if (text.length === 0) return;

    // Call user-provided send handler
    if (typeof onSend === 'function') {
      onSend(text);
    }

    // Reset input box
    chatPromptInput.value = '';
    chatPromptInput.style.height = 'auto';
  }
}
