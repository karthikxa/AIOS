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

  // ── @ Mention: Google plugins with exact SVGs from plugins page assets ─
  // These SVGs are copied from frontend/assets/plugins/*.svg (same as plugins page)
  const PLUGIN_SVGS = {
    gmail: '<svg width="40" height="40" viewBox="0 0 32 32"><path d="M2 12c0-3.5 0-5.2.7-6.6C3.3 4.2 4.2 3.3 5.4 2.7 6.7 2 8.5 2 12 2h8c3.5 0 5.3 0 6.6.7 1.2.6 2.1 1.5 2.7 2.7.6 1.3.7 3 .7 6.6v8c0 3.5 0 5.3-.7 6.6-.6 1.2-1.5 2.1-2.7 2.7C25.3 30 23.5 30 20 30h-8c-3.5 0-5.3 0-6.6-.7-1.2-.6-2.1-1.5-2.7-2.7C2 27.3 2 25.5 2 22v-10z" fill="#fff"/><path d="M22.1 8.5 16.1 13.2 9.9 8.5v6.5l6.1 4.8 6.1-4.8z" fill="#EA4335"/><path d="M23.6 7.4 22.1 8.5v6.8l5-3.8V9.2s-.6-3.3-3.4-1.8z" fill="#FBBC05"/><path d="M22.1 15.3v8.7h3.8s1.1-.1 1.9-1.3v-11.2z" fill="#34A853"/><path d="M9.9 24V15.1l-.1 0z" fill="#C5221F"/><path d="M9.9 8.5 8.4 7.4C5.6 5.9 5 9.2 5 9.2v2.3l4.9 5.6z" fill="#C5221F"/><path d="M9.9 8.5v6.5l.1.1V8.5z" fill="#C5221F"/><path d="M5 11.5v11.2c.1 1.2 1.2 1.3 1.2 1.3h3.8l-.1-11.3z" fill="#4285F4"/></svg>',
    drive: '<svg width="40" height="40" viewBox="0 0 32 32"><path d="M2 12c0-3.5 0-5.2.7-6.6C3.3 4.2 4.2 3.3 5.4 2.7 6.7 2 8.5 2 12 2h8c3.5 0 5.3 0 6.6.7 1.2.6 2.1 1.5 2.7 2.7.6 1.3.7 3 .7 6.6v8c0 3.5 0 5.3-.7 6.6-.6 1.2-1.5 2.1-2.7 2.7C25.3 30 23.5 30 20 30h-8c-3.5 0-5.3 0-6.6-.7-1.2-.6-2.1-1.5-2.7-2.7C2 27.3 2 25.5 2 22v-10z" fill="#fff"/><path d="M16 12.5l-3.5-6.1 6.5-2.7-2.9 6.1z" fill="#188038"/><path d="M16 12.5 20.1 19.7h7l-6.5-12.1z" fill="#FBBC05"/><path d="M16 12.5l-4.1 7.2h-6.9c.1.8.4 1.3.4 1.3l2.6 4.5h13.4l2.8-4.5c0 0 .3-.5.3-1.3H12.5z" fill="#4285F4"/><path d="M11.9 19.7H5c.4.8 4 1.3 4 1.3l2.6 4.5L12 19.7z" fill="#1967D2"/><path d="M20.1 19.7h7c.4.8-4 1.3-4 1.3l-2.6 4.5L20 19.7z" fill="#EA4335"/></svg>',
  };

  let MENTION_ITEMS = [
    { id: 'gmail', label: 'Gmail', description: 'Compose, send, and manage your inbox' },
    { id: 'drive', label: 'Drive', description: 'Browse, organize, and share files' },
    { id: 'calendar', label: 'Calendar', description: 'Schedule meetings and events' },
    { id: 'tasks', label: 'Tasks', description: 'Plan, track, and complete work' },
    { id: 'contacts', label: 'Contacts', description: 'Manage your professional network' },
    { id: 'photos', label: 'Photos', description: 'Browse and organize your media' },
    { id: 'youtube', label: 'YouTube', description: 'Discover and manage video content' },
    { id: 'docs', label: 'Docs', description: 'Create and collaborate on documents' },
    { id: 'sheets', label: 'Sheets', description: 'Analyze data with spreadsheets' },
    { id: 'slides', label: 'Slides', description: 'Build and present slideshows' },
    { id: 'chat', label: 'Chat', description: 'Message teams in shared spaces' },
    { id: 'meet', label: 'Meet', description: 'Start video meetings instantly' },
    { id: 'fit', label: 'Fit', description: 'Track health and fitness goals' },
    { id: 'classroom', label: 'Classroom', description: 'Manage courses and assignments' },
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
          icon: PLUGIN_SVGS[item.id] || MONO_SVGS[item.id] || '◎',
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
        <span style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${iconHtml}</span>
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
