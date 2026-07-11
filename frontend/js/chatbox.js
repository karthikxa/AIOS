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

  const MENTION_ITEMS = [
    { id: 'tools', label: 'Tools', description: 'Browse available tools', icon: '🔧', isCategory: true },
    { id: 'users', label: 'Users', description: 'Mention a user', icon: '👤', isCategory: true },
  ];

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
      row.innerHTML = `
        <span style="font-size: 14px; width: 24px; text-align: center; color: #6b7280;">${item.icon}</span>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 500; font-size: 14px; color: #111827;">${item.label}</div>
          <div style="font-size: 12px; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.description}</div>
        </div>
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
