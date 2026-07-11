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

  // ── @ Mention: Google plugins with real colored SVGs when connected ─────
  // Colored SVGs match the official Google branding
  const COLORED_SVGS = {
    gmail: '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M6 10l18 13L42 10v28H6z"/><path fill="#EA4335" d="M6 10l18 13L42 10H6z"/><path fill="#C5221F" d="M6 10v28h4V18l14 10 14-10v20h4V10L24 23z"/><path fill="#34A853" d="M6 38V10l18 13z"/><path fill="#FBBC04" d="M42 10v28H38V18L24 31z"/></svg>',
    drive: '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M32 40H8L24 8l16 32z"/><path fill="#4285F4" d="M42 40H18L32 8l10 16.3L42 40z"/><path fill="#1A73E8" d="M34.4 24.3L44 40H24L34.4 24.3z"/><path fill="#FBBC04" d="M24 8L8 40h16L24 8z"/><path fill="#1A73E8" d="M34.4 24.3L44 40H24L34.4 24.3z"/></svg>',
    calendar: '<svg width="16" height="16" viewBox="0 0 48 48"><rect fill="#4285F4" x="4" y="8" width="40" height="36" rx="4"/><rect fill="#fff" x="4" y="8" width="40" height="12" rx="4"/><rect fill="#EA4335" x="4" y="8" width="40" height="4" rx="4"/><path fill="#fff" d="M14 28h20v2H14zM14 34h12v2H14z"/></svg>',
    tasks: '<svg width="16" height="16" viewBox="0 0 48 48"><circle fill="none" stroke="#4285F4" stroke-width="3" cx="24" cy="24" r="18"/><path fill="none" stroke="#34A853" stroke-width="3" stroke-linecap="round" d="M15 24l6 6 12-12"/></svg>',
    contacts: '<svg width="16" height="16" viewBox="0 0 48 48"><circle fill="#4285F4" cx="24" cy="18" r="8"/><path fill="#4285F4" d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16"/></svg>',
    photos: '<svg width="16" height="16" viewBox="0 0 48 48"><rect fill="#FBBC04" x="4" y="4" width="40" height="40" rx="4"/><circle fill="#4285F4" cx="16" cy="18" r="5"/><path fill="#34A853" d="M4 32l12-10 8 6 8-4 12 8v6a4 4 0 01-4 4H8a4 4 0 01-4-4z"/></svg>',
    youtube: '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M43.2 13.4a4.8 4.8 0 00-3.4-3.4C36.8 9 24 9 24 9s-12.8 0-15.8 1a4.8 4.8 0 00-3.4 3.4C3.8 16.4 3.8 24 3.8 24s0 7.6 1.6 10.6a4.8 4.8 0 003.4 3.4c3 1 15.8 1 15.8 1s12.8 0 15.8-1a4.8 4.8 0 003.4-3.4c1.6-3 1.6-10.6 1.6-10.6s0-7.6-1.6-10.6z"/><path fill="#fff" d="M20 30.4V17.6l10.4 6.4-10.4 6.4z"/></svg>',
    docs: '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M14 4h20l10 10v30a2 2 0 01-2 2H14a2 2 0 01-2-2V6a2 2 0 012-2z"/><path fill="#4285F4" d="M34 4l10 10H36a2 2 0 01-2-2V4z"/><path fill="#fff" d="M18 18h12v2H18zM18 24h12v2H18zM18 30h8v2H18z"/></svg>',
    sheets: '<svg width="16" height="16" viewBox="0 0 48 48"><rect fill="#34A853" x="4" y="4" width="40" height="40" rx="4"/><rect fill="#fff" x="4" y="4" width="40" height="40" rx="4" opacity=".15"/><path stroke="#fff" stroke-width="2" d="M4 18h40M4 30h40M18 4v40M30 4v40"/></svg>',
    slides: '<svg width="16" height="16" viewBox="0 0 48 48"><rect fill="#FBBC04" x="4" y="6" width="40" height="28" rx="4"/><rect fill="#fff" x="6" y="8" width="36" height="24" rx="2"/><rect fill="#FBBC04" x="18" y="34" width="12" height="4" rx="2"/><rect fill="#FBBC04" x="14" y="38" width="20" height="3" rx="1.5"/></svg>',
    chat: '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#34A853" d="M24 4C12.95 4 4 12.95 4 24c0 4.3 1.4 8.3 3.7 11.6L4 44l8.9-3.3C15.7 42.6 19.6 44 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4z"/><path fill="#fff" d="M16 18h16v2H16zM16 24h12v2H16z"/></svg>',
    meet: '<svg width="16" height="16" viewBox="0 0 48 48"><rect fill="#4285F4" x="4" y="10" width="28" height="22" rx="4"/><path fill="#34A853" d="M32 20l12-6v16l-12-6z"/><circle fill="#fff" cx="18" cy="21" r="3"/><circle fill="#fff" cx="26" cy="21" r="3"/></svg>',
    fit: '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M38 12H28l-4 16-4-16H10l8 24h6l8-24z" opacity=".8"/><path fill="#4285F4" d="M44 12H34l-4 16-4-16H16l8 24h6l12-24z" opacity=".8"/><path fill="#34A853" d="M28 12H18l-4 16-4-16H0l8 24h6l14-24z" opacity=".8"/></svg>',
    classroom: '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M24 8L4 20l20 12 20-12L24 8z"/><path fill="#34A853" d="M4 20v14c0 4 8 8 20 8s20-4 20-8V20L24 32 4 20z"/><path fill="#FBBC04" d="M4 20v14c0 4 8 8 20 8V20L4 20z" opacity=".6"/></svg>',
  };

  // Monochrome fallback for disconnected plugins
  const MONO_SVGS = {
    gmail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    drive: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>',
    calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    tasks: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    contacts: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
    photos: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/></svg>',
    youtube: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/></svg>',
    docs: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/></svg>',
    sheets: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
    slides: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    chat: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    meet: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="m15.5 7.5 5 5"/><rect x="4" y="6" width="16" height="12" rx="2"/></svg>',
    fit: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    classroom: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  };

  let MENTION_ITEMS = [
    { id: 'gmail', label: 'Gmail', description: 'Send, read, search emails' },
    { id: 'drive', label: 'Drive', description: 'List, search, read files' },
    { id: 'calendar', label: 'Calendar', description: 'List, create, update events' },
    { id: 'tasks', label: 'Tasks', description: 'List, create, update tasks' },
    { id: 'contacts', label: 'Contacts', description: 'List, create, update contacts' },
    { id: 'photos', label: 'Photos', description: 'List albums, media' },
    { id: 'youtube', label: 'YouTube', description: 'Search, get details, rate' },
    { id: 'docs', label: 'Docs', description: 'List, read, create documents' },
    { id: 'sheets', label: 'Sheets', description: 'List, read, create spreadsheets' },
    { id: 'slides', label: 'Slides', description: 'List, read, create presentations' },
    { id: 'chat', label: 'Chat', description: 'List spaces, send messages' },
    { id: 'meet', label: 'Meet', description: 'Create meeting conferences' },
    { id: 'fit', label: 'Fit', description: 'Health and fitness data' },
    { id: 'classroom', label: 'Classroom', description: 'Courses, assignments, students' },
  ];

  // Fetch connected plugins — only show connected ones with colored icons
  const mentionUserId = localStorage.getItem('zed_user_id') || 'default';
  fetch(`/oauth/status?user_id=${encodeURIComponent(mentionUserId)}`)
    .then(r => r.json())
    .then(status => {
      const connected = MENTION_ITEMS.filter(item => status[item.id]);
      if (connected.length > 0) {
        // Show only connected plugins with real colored Google SVGs
        MENTION_ITEMS = connected.map(item => ({
          ...item,
          icon: COLORED_SVGS[item.id] || MONO_SVGS[item.id] || '◎',
          connected: true,
        }));
      }
      // If nothing connected, show all with monochrome (so user knows what's available)
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

    if (activeTrigger === '/') {
      // For / commands: execute immediately by sending a message
      closePopover();
      chatPromptInput.value = '';
      // Build the prompt based on the command
      const commandPrompts = {
        'agent': 'Switch to Agent mode and delegate this task to sub-agents.',
        'computer': 'Switch to Computer mode for desktop automation.',
        'memory': 'Show my memory entries.',
        'skills': 'List all available skills.',
        'schedule': 'Create a new scheduled task.',
        'agents': 'List all my agents.',
        'config': 'Show current configuration.',
        'status': 'Check system status.',
      };
      const prompt = commandPrompts[item.id] || `Execute the ${item.id} command.`;
      chatPromptInput.value = prompt;
      // Trigger send
      if (typeof onSend === 'function') onSend(prompt);
      else chatPromptInput.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // For @ mentions: insert text and let user type
    const val = chatPromptInput.value;
    const cursorPos = chatPromptInput.selectionStart;
    const beforeCursor = val.substring(0, cursorPos);
    const triggerPos = beforeCursor.lastIndexOf(activeTrigger);
    if (triggerPos === -1) return;

    const before = val.substring(0, triggerPos);
    const after = val.substring(cursorPos);
    const insertText = `${activeTrigger}${item.id} `;

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
