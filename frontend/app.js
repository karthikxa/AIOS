import { initSidebar } from './js/sidebar.js';
import { initModelSelector } from './js/model-selector.js';
import { initChatBox } from './js/chatbox.js';
import './src/main-react.jsx';
import { initAgentComputer } from './js/agent-computer.js';
import { initRouter } from './js/router.js';
import { initModelsPage } from './js/models-page.js';
import { initAgentPage, agentsStore } from './js/agent-page.js';
import { initCreateAgentPage } from './js/create-agent-page.js';
import { initEditAgentPage } from './js/edit-agent-page.js';
import { initVoicePage } from './js/voice-page.js';
import { modelsStore } from './js/models-store.js';

import { pluginsStore } from './js/plugins-page.js';
import { schedulesStore } from './js/schedules-page.js';
import DOMPurify from 'dompurify';
import { renderMarkdown, extractCodeBlocks, isMaskedKey, normalizeBaseUrl, TasksStore } from './src/utils.js';
import { parseReasoningToCoT, createCoTLiveRenderer } from './js/chain-of-thought.js';

const tasksStore = new TasksStore();

// Human-readable action descriptions for the agentic status bar
const actionDescriptions = {
  get_screen: 'Reading screen',
  click: 'Clicking element',
  type: 'Typing text',
  press_key: 'Pressing key',
  hotkey: 'Keyboard shortcut',
  scroll: 'Scrolling',
  navigate: 'Opening URL',
  evaluate: 'Running JavaScript',
  shell: 'Running shell command',
  open_tab: 'Opening new tab',
  list_tabs: 'Listing tabs',
  switch_tab: 'Switching tab',
  close_tab: 'Closing tab',
  run_code: 'Executing code',
  read_file: 'Reading file',
  write_file: 'Writing file',
  list_files: 'Listing files',
  find_files: 'Finding files',
  search_files: 'Searching files',
  install_package: 'Installing package',
  take_screenshot: 'Capturing screenshot',
  screenshot_diff: 'Comparing screenshots',
  resolve_click: 'Resolving click target',
  annotate_screen: 'Annotating elements',
  get_page_html: 'Reading page HTML',
  get_page_text: 'Reading page text',
  get_page_markdown: 'Reading page markdown',
  find_text: 'Finding text on page',
  wait_for: 'Waiting for condition',
  add_subtask: 'Adding subtask',
  update_subtask: 'Updating subtask',
  remove_subtask: 'Removing subtask',
  reorder_subtasks: 'Reordering subtasks',
  get_plan: 'Viewing plan',
  done: 'Task complete',
};


document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sub-modules
  initSidebar();
  initRouter();
  initModelsPage();
  initAgentPage();
  initCreateAgentPage();
  initEditAgentPage();
  initVoicePage();

  initModelSelector((newModel) => {
  });
  
  initAgentComputer();

  let activeDropdown = null;
  function closeActiveDropdown() {
    if (activeDropdown) {
      activeDropdown.remove();
      activeDropdown = null;
    }
    document.querySelectorAll('.task-item-custom.menu-open').forEach(el => {
      el.classList.remove('menu-open');
    });
  }

  document.addEventListener('click', (e) => {
    if (activeDropdown && !activeDropdown.contains(e.target) && !e.target.closest('.task-menu-btn')) {
      closeActiveDropdown();
    }
  });

  function getRelativeTime(taskId) {
    const parts = taskId.split('-');
    if (parts.length < 2) return '';
    const time = parseInt(parts[1], 10);
    if (isNaN(time)) return '';
    const diff = Date.now() - time;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    
    if (weeks > 0) return `${weeks}w`;
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return '1m';
  }

  // ── Tasks: sidebar rendering and interactions ──────────────────────────
  function renderTasks() {
    const scrollContainer = document.querySelector('.tasks-scroll');
    if (!scrollContainer) return;
    scrollContainer.innerHTML = '';
    closeActiveDropdown();

    const sorted = [...tasksStore.tasks].sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));
    for (const task of sorted) {
      const div = document.createElement('div');
      div.className = 'task-item-custom' + (task.id === tasksStore.activeId ? ' active-task' : '');
      div.dataset.id = task.id;

      function getTaskIconSvg(taskName) {
        const lowercaseName = taskName.toLowerCase();
        
        // Book / document icon
        if (lowercaseName.includes('format') || lowercaseName.includes('write') || lowercaseName.includes('book') || lowercaseName.includes('read') || lowercaseName.includes('document')) {
          return `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6B7280; flex-shrink: 0;">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          `;
        }
        
        // People / users icon
        if (lowercaseName.includes('person') || lowercaseName.includes('people') || lowercaseName.includes('identify') || lowercaseName.includes('find') || lowercaseName.includes('who') || lowercaseName.includes('user')) {
          return `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6B7280; flex-shrink: 0;">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          `;
        }
        
        // Megaphone / sound/voice or lightbulb/idea
        if (lowercaseName.includes('llm') || lowercaseName.includes('create') || lowercaseName.includes('make') || lowercaseName.includes('build') || lowercaseName.includes('voice') || lowercaseName.includes('speech')) {
          return `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6B7280; flex-shrink: 0;">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          `;
        }
        
        // Dotted circle / loader / docx / link
        if (lowercaseName.includes('link') || lowercaseName.includes('docx') || lowercaseName.includes('file') || lowercaseName.includes('open') || lowercaseName.includes('web') || lowercaseName.includes('url')) {
          return `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: #F59E0B; flex-shrink: 0;">
              <circle cx="12" cy="12" r="10" stroke-dasharray="3 3"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
          `;
        }
        
        // Default chat bubble
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6B7280; flex-shrink: 0;">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        `;
      }

const starIndicator = `
  <span class="task-star-indicator" style="color: #6366F1; margin-right: 10px; display: inline-flex; align-items: center; flex-shrink: 0;">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#6366F1" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  </span>
`;
      const itemIcon = task.starred ? starIndicator : `
        <span class="task-item-icon-wrapper" style="margin-right: 10px; display: inline-flex; align-items: center; flex-shrink: 0;">
          ${getTaskIconSvg(task.name)}
        </span>
      `;

      div.innerHTML = `
        <div class="task-name-wrapper">
          ${itemIcon}
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${task.name.replace(/</g, '&lt;')}</span>
        </div>
        <div class="task-right-section">
          <button class="task-menu-btn" title="Options">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="5" r="1.5"></circle>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="12" cy="19" r="1.5"></circle>
            </svg>
          </button>
        </div>
      `;

      // Click on task card to load session
      div.onclick = (e) => {
        if (e.target.closest('.task-menu-btn')) return;
        
        tasksStore.setActive(task.id);
        conversationHistory.length = 0;
        conversationHistory.push(...task.messages);
        if (chatMessagesLog) {
          chatMessagesLog.innerHTML = '';
          for (const msg of task.messages) {
            appendMessage(msg.role, msg.content, '', msg.reasoning, msg.tool_calls);
          }
        }
        setAppState(task.messages.length > 0);
        renderTasks();
      };

      // Click on options button to open options dropdown menu
      const menuBtn = div.querySelector('.task-menu-btn');
      menuBtn.onclick = (e) => {
        e.stopPropagation();
        
        const alreadyOpen = activeDropdown && activeDropdown.dataset.taskId === task.id;
        closeActiveDropdown();
        if (alreadyOpen) return;

        div.classList.add('menu-open');

        const dropdown = document.createElement('div');
        dropdown.className = 'task-dropdown-menu';
        dropdown.dataset.taskId = task.id;
        dropdown.innerHTML = `
          <div class="task-dropdown-item favorite-item">
            ${task.starred
              ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6366F1" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span>Unpin</span>'
              : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span>Pin</span>'}
          </div>
          <div class="task-dropdown-item rename-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
            <span>Edit</span>
          </div>
          <div class="task-dropdown-item delete-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span>Delete</span>
          </div>
        `;

        document.body.appendChild(dropdown);
        const rect = menuBtn.getBoundingClientRect();
        dropdown.style.position = 'fixed';
        dropdown.style.top = `${rect.bottom + window.scrollY + 6}px`;
        
        let leftPos = rect.right + window.scrollX - 120;
        if (leftPos < 10) leftPos = 10;
        dropdown.style.left = `${leftPos}px`;

        dropdown.querySelector('.favorite-item').onclick = (de) => {
          de.stopPropagation();
          closeActiveDropdown();
          tasksStore.toggleStar(task.id);
          renderTasks();
        };

        dropdown.querySelector('.rename-item').onclick = (de) => {
          de.stopPropagation();
          closeActiveDropdown();
          const newName = prompt('Edit session name:', task.name);
          if (newName && newName.trim()) {
            tasksStore.renameTask(task.id, newName.trim());
            renderTasks();
          }
        };

        dropdown.querySelector('.delete-item').onclick = (de) => {
          de.stopPropagation();
          closeActiveDropdown();
          tasksStore.deleteTask(task.id);
          if (tasksStore.activeId === task.id) {
            conversationHistory.length = 0;
            if (chatMessagesLog) chatMessagesLog.innerHTML = '';
            setAppState(false);
          }
          renderTasks();
        };

        activeDropdown = dropdown;
      };

      scrollContainer.appendChild(div);
    }
  }

  // Render existing tasks on load
  renderTasks();

  // "New task" — clear current session
  document.getElementById('navNewTask')?.addEventListener('click', () => {
    tasksStore.activeId = null;
    conversationHistory.length = 0;
    if (chatMessagesLog) chatMessagesLog.innerHTML = '';
    setAppState(false);
    renderTasks();
  });

  function syncChatInputState(state) {
    const chatOverlay = document.getElementById('chatConnectOverlay');
    const chatPrompt = document.getElementById('chatPromptInput');
    const chatToolbar = document.querySelector('.chat-toolbar');
    if (chatOverlay) chatOverlay.style.display = 'none';
    if (chatPrompt) chatPrompt.style.display = 'block';
    if (chatToolbar) chatToolbar.style.display = 'flex';
  }

  syncChatInputState(modelsStore.getState());

  // 2. State Toggling Logic
  let isActiveState = false; // Default: Empty State

  const conversationHistory = []; // {role, content} pairs
  let lastRoutedModel = null;

  const emptyStateView = document.getElementById('emptyStateView');
  const activeStateView = document.getElementById('activeStateView');
  const contextPill = document.getElementById('contextPill');
  const chatPromptInput = document.getElementById('chatPromptInput');
  const chatMessagesLog = document.getElementById('chatMessagesLog');
  const chatMessagesView = document.getElementById('chatMessagesView');
  const agentComputerScreen = document.getElementById('agentComputerScreen');
  const bottomCardsContainer = document.getElementById('featureCardsRow');

  // Ensure empty state on load
  setAppState(false);

  function setAppState(active) {
    isActiveState = active;
    
    const centerContainer = document.querySelector('.center-container');
    if (centerContainer) {
      if (active) {
        centerContainer.classList.remove('is-empty');
        centerContainer.classList.add('is-active');
      } else {
        centerContainer.classList.remove('is-active');
        centerContainer.classList.add('is-empty');
      }
    }
    
    if (active) {
      // Transition to Active State
      if (emptyStateView) emptyStateView.style.display = 'none';
      if (activeStateView) activeStateView.style.display = 'flex';
      if (contextPill) contextPill.style.display = 'flex';
      if (bottomCardsContainer) bottomCardsContainer.style.display = 'none';
      
      // Ensure chatMessagesView is visible and computer mockup screen is hidden
      if (chatMessagesView) chatMessagesView.style.display = 'flex';
      if (agentComputerScreen) agentComputerScreen.style.display = 'none';
      
      // Collapse/Hide terminal bar and screen on message send
      const agentComputerBar = document.getElementById('agentComputerBar');
      if (agentComputerBar) agentComputerBar.style.display = 'none';
      if (agentComputerScreen) agentComputerScreen.style.display = 'none';
      
      // Update placeholder
      if (chatPromptInput) {
        chatPromptInput.placeholder = 'Ask anything...';
      }
    } else {
      // Transition to Empty State
      if (emptyStateView) emptyStateView.style.display = 'flex';
      if (activeStateView) activeStateView.style.display = 'none';
      if (contextPill) contextPill.style.display = 'none';
      if (bottomCardsContainer) bottomCardsContainer.style.display = 'flex';
      if (chatMessagesView) chatMessagesView.style.display = 'none';
      
      if (chatPromptInput) {
        chatPromptInput.placeholder = 'Ask anything...';
      }
    }
  }

  // ── Message Actions ───────────────────────────────────────────────────
  function appendMessageActions(msgDiv, messageText, sender) {
    if (msgDiv.querySelector('.message-actions')) return;
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'message-actions';

    if (sender === 'user') {
      // User messages: retype (pencil) + copy
      actionsDiv.innerHTML = `
        <button class="msg-action-btn" title="Retype" data-action="retype">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
        </button>
        <button class="msg-action-btn" title="Copy" data-action="copy">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      `;
    } else {
      // Assistant messages: copy + regenerate + thumbsup + thumbsdown
      actionsDiv.innerHTML = `
        <button class="msg-action-btn" title="Copy" data-action="copy">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
        <button class="msg-action-btn" title="Regenerate" data-action="regenerate">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        </button>
        <button class="msg-action-btn" title="Good response" data-action="thumbsup">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
        </button>
        <button class="msg-action-btn" title="Bad response" data-action="thumbsdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zM17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
        </button>
      `;
    }
    msgDiv.appendChild(actionsDiv);

    actionsDiv.querySelectorAll('.msg-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.dataset.action;
        if (action === 'copy') {
          const text = msgDiv.querySelector('.chat-message-bubble')?.textContent || '';
          navigator.clipboard.writeText(text).catch(() => {});
          btn.style.color = '#10B981';
          setTimeout(() => btn.style.color = '', 1000);
        } else if (action === 'retype') {
          const text = msgDiv.querySelector('.chat-message-bubble')?.textContent || '';
          chatPromptInput.value = text;
          chatPromptInput.style.height = 'auto';
          chatPromptInput.style.height = chatPromptInput.scrollHeight + 'px';
          chatPromptInput.focus();
        } else if (action === 'regenerate') {
          // Find preceding user message
          let prevMsg = msgDiv.previousElementSibling;
          while (prevMsg && !prevMsg.classList.contains('user')) {
            prevMsg = prevMsg.previousElementSibling;
          }
          if (prevMsg) {
            const promptText = prevMsg.querySelector('.chat-message-bubble')?.textContent || '';
            if (promptText) {
              regenerateMessageBranch(msgDiv, promptText);
            }
          }
        } else if (action === 'thumbsup') {
          btn.classList.toggle('liked');
          actionsDiv.querySelectorAll('[data-action="thumbsdown"]').forEach(b => b.classList.remove('disliked'));
        } else if (action === 'thumbsdown') {
          btn.classList.toggle('disliked');
          actionsDiv.querySelectorAll('[data-action="thumbsup"]').forEach(b => b.classList.remove('liked'));
        }
      });
    });
  }

  function createCollapsibleSection({ type, title, iconHtml, contentHtml, defaultOpen = false, isPurpleTheme = false }) {
    const section = document.createElement('div');
    section.className = `cot-section ${type}-section ${isPurpleTheme ? 'purple-theme' : ''}`;
    section.style.cssText = `
      margin-bottom: 12px;
      border: 1px solid ${isPurpleTheme ? 'rgba(139, 92, 246, 0.2)' : '#E5E7EB'};
      border-radius: 10px;
      background: ${isPurpleTheme ? 'rgba(139, 92, 246, 0.02)' : '#FAFBFC'};
      overflow: hidden;
      transition: all 0.2s ease-in-out;
      width: 100%;
    `;

    const header = document.createElement('button');
    header.className = 'cot-header-btn';
    header.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: none;
      background: ${isPurpleTheme ? 'rgba(139, 92, 246, 0.05)' : '#F3F4F6'};
      padding: 10px 14px;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      color: ${isPurpleTheme ? '#8B5CF6' : '#374151'};
      outline: none;
      transition: background 0.15s;
    `;

    const left = document.createElement('div');
    left.style.cssText = 'display: flex; align-items: center; gap: 8px; flex: 1;';
    
    const iconContainer = document.createElement('span');
    iconContainer.className = 'cot-icon-container';
    iconContainer.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; flex-shrink: 0;';
    iconContainer.innerHTML = iconHtml;
    left.appendChild(iconContainer);

    const titleSpan = document.createElement('span');
    titleSpan.className = 'cot-header-title';
    titleSpan.textContent = title;
    left.appendChild(titleSpan);

    header.appendChild(left);

    // Chevron SVG
    const chevronSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevronSvg.setAttribute('class', 'cot-chevron');
    chevronSvg.setAttribute('width', '14');
    chevronSvg.setAttribute('height', '14');
    chevronSvg.setAttribute('viewBox', '0 0 16 16');
    chevronSvg.setAttribute('fill', 'none');
    chevronSvg.setAttribute('stroke', 'currentColor');
    chevronSvg.setAttribute('stroke-width', '2');
    chevronSvg.setAttribute('stroke-linecap', 'round');
    chevronSvg.setAttribute('stroke-linejoin', 'round');
    chevronSvg.style.cssText = 'transition: transform 0.2s; flex-shrink: 0;';
    const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevronPath.setAttribute('d', 'M6 3l5 5-5 5');
    chevronSvg.appendChild(chevronPath);
    header.appendChild(chevronSvg);

    const contentContainer = document.createElement('div');
    contentContainer.className = 'cot-content-container';
    contentContainer.style.cssText = `
      transition: max-height 0.25s ease-out, padding 0.25s ease-out;
      overflow: hidden;
      background: #FFFFFF;
      font-size: 13px;
      line-height: 1.5;
      color: #4B5563;
      box-sizing: border-box;
    `;
    
    // Set default state
    if (defaultOpen) {
      contentContainer.style.maxHeight = '2000px';
      contentContainer.style.padding = '12px 14px';
      contentContainer.style.borderTop = `1px solid ${isPurpleTheme ? 'rgba(139, 92, 246, 0.1)' : '#E5E7EB'}`;
      chevronSvg.style.transform = 'rotate(90deg)';
    } else {
      contentContainer.style.maxHeight = '0px';
      contentContainer.style.padding = '0px 14px';
      contentContainer.style.borderTop = '1px solid transparent';
      chevronSvg.style.transform = 'rotate(0deg)';
    }

    if (typeof contentHtml === 'string') {
      contentContainer.innerHTML = contentHtml;
    } else if (contentHtml instanceof Node) {
      contentContainer.appendChild(contentHtml);
    }

    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = contentContainer.style.maxHeight !== '0px';
      if (isOpen) {
        contentContainer.style.maxHeight = '0px';
        contentContainer.style.padding = '0px 14px';
        contentContainer.style.borderTop = '1px solid transparent';
        chevronSvg.style.transform = 'rotate(0deg)';
      } else {
        contentContainer.style.maxHeight = '2000px';
        contentContainer.style.padding = '12px 14px';
        contentContainer.style.borderTop = `1px solid ${isPurpleTheme ? 'rgba(139, 92, 246, 0.1)' : '#E5E7EB'}`;
        chevronSvg.style.transform = 'rotate(90deg)';
      }
    });

    section.appendChild(header);
    section.appendChild(contentContainer);
    return section;
  }

  function getToolDetailHtml(name, args) {
    let text = TOOL_LABELS[name] || name;
    if (args) {
      if (args.url) {
        text = args.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
        if (args.url.includes('onboarding')) text = 'Onboarding Demo';
      } else if (args.query) {
        text = args.query;
      } else if (args.task) {
        text = args.task;
      }
    }
    if (text.length > 25) text = text.substring(0, 22) + '...';

    return `<span style="background: #F3F4F6; border-radius: 9999px; padding: 3px 8px; display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 500; color: #1F2937; line-height: 1;">
      <div style="width: 13px; height: 13px; border-radius: 50%; background: #3B82F6; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
        </svg>
      </div>
      ${DOMPurify.sanitize(text)}
    </span>`;
  }

  function createActivityRow({ type, label, detailHtml, contentHtml, statusText = '', isExpanded = false, iconSvg = '' }) {
    const rowContainer = document.createElement('div');
    rowContainer.className = `activity-row-container ${type}-activity`;
    rowContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
      font-family: 'Inter', sans-serif;
      width: 100%;
    `;

    const rowHeader = document.createElement('div');
    rowHeader.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 4px 0;
      cursor: ${contentHtml ? 'pointer' : 'default'};
      user-select: none;
    `;

    // Left part: Icon & Label
    const left = document.createElement('div');
    left.style.cssText = 'display: flex; align-items: center; gap: 8px;';

    // Left Icon
    const iconSpan = document.createElement('span');
    iconSpan.className = 'activity-icon-span';
    iconSpan.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; flex-shrink: 0; color: #4B5563;';
    
    let resolvedIconSvg = iconSvg;
    if (!resolvedIconSvg) {
      if (type === 'reasoning') {
        resolvedIconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
      } else if (type === 'tool') {
        resolvedIconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      } else if (type === 'active') {
        resolvedIconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="3" style="animation: subagent-spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-dasharray="4 4" stroke-linecap="round"/></svg>`;
      }
    }
    iconSpan.innerHTML = resolvedIconSvg;
    left.appendChild(iconSpan);

    // Label Text
    const labelSpan = document.createElement('span');
    labelSpan.className = 'activity-label-span';
    labelSpan.textContent = label;
    labelSpan.style.cssText = `
      font-size: 13.5px;
      font-weight: 500;
      color: ${type === 'active' ? '#6B7280' : '#4B5563'};
    `;
    left.appendChild(labelSpan);

    rowHeader.appendChild(left);

    // Right part: Detail/Status
    const right = document.createElement('div');
    right.style.cssText = 'display: flex; align-items: center; gap: 6px;';

    const detailWrapper = document.createElement('div');
    detailWrapper.className = 'activity-detail-wrapper';
    if (detailHtml) {
      detailWrapper.innerHTML = detailHtml;
    }
    right.appendChild(detailWrapper);

    const statusSpan = document.createElement('span');
    statusSpan.className = 'activity-status-text';
    statusSpan.textContent = statusText;
    statusSpan.style.cssText = `
      font-size: 12.5px;
      color: #9CA3AF;
      font-weight: 400;
      margin-right: 4px;
    `;
    right.appendChild(statusSpan);

    // Small chevron for expandable content
    if (contentHtml) {
      const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      chevron.setAttribute('class', 'activity-chevron');
      chevron.setAttribute('width', '12');
      chevron.setAttribute('height', '12');
      chevron.setAttribute('viewBox', '0 0 16 16');
      chevron.setAttribute('fill', 'none');
      chevron.setAttribute('stroke', '#9CA3AF');
      chevron.setAttribute('stroke-width', '2');
      chevron.setAttribute('stroke-linecap', 'round');
      chevron.setAttribute('stroke-linejoin', 'round');
      chevron.style.cssText = `transition: transform 0.2s; transform: ${isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}; flex-shrink: 0;`;
      const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      chevronPath.setAttribute('d', 'M6 3l5 5-5 5');
      chevron.appendChild(chevronPath);
      right.appendChild(chevron);
    }

    rowHeader.appendChild(right);
    rowContainer.appendChild(rowHeader);

    // Collapsible content block
    let contentDiv = null;
    if (contentHtml) {
      contentDiv = document.createElement('div');
      contentDiv.className = 'activity-content-container';
      contentDiv.style.cssText = `
        transition: max-height 0.2s ease-out, padding 0.2s ease-out;
        overflow: hidden;
        max-height: ${isExpanded ? '600px' : '0px'};
        padding: ${isExpanded ? '6px 12px 6px 24px' : '0px 12px 0px 24px'};
        font-size: 12.5px;
        line-height: 1.5;
        color: #4B5563;
        border-left: 1.5px dashed #E5E7EB;
        margin-left: 8px;
        margin-top: 2px;
      `;

      const contentInner = document.createElement('div');
      contentInner.className = 'activity-content-inner';
      contentInner.innerHTML = contentHtml;
      contentDiv.appendChild(contentInner);
      rowContainer.appendChild(contentDiv);

      rowHeader.onclick = () => {
        const isOpen = contentDiv.style.maxHeight !== '0px';
        const chevron = rowHeader.querySelector('.activity-chevron');
        if (isOpen) {
          contentDiv.style.maxHeight = '0px';
          contentDiv.style.padding = '0px 12px 0px 24px';
          if (chevron) chevron.style.transform = 'rotate(0deg)';
        } else {
          contentDiv.style.maxHeight = '600px';
          contentDiv.style.padding = '6px 12px 6px 24px';
          if (chevron) chevron.style.transform = 'rotate(90deg)';
        }
      };
    }

    return rowContainer;
  }

  function formatToolArgs(name, args) {
    if (!args || Object.keys(args).length === 0) {
      return '<div style="color: #9CA3AF; font-style: italic;">No input arguments</div>';
    }
    
    const nameLower = name.toLowerCase();
    
    // Special formatting for specific tool types
    if (name === 'web_search') {
      return `<div style="display: flex; flex-direction: column; gap: 4px;">
        <div><strong>Query:</strong> <code style="background:#F3F4F6;padding:2px 5px;border-radius:4px;font-family:monospace;">${DOMPurify.sanitize(args.query || '')}</code></div>
      </div>`;
    }
    if (name === 'browser' || name === 'open_tab' || name === 'navigate') {
      return `<div style="display: flex; flex-direction: column; gap: 4px;">
        <div><strong>URL:</strong> <a href="${DOMPurify.sanitize(args.url || '#')}" target="_blank" style="color:#3B82F6;text-decoration:none;">${DOMPurify.sanitize(args.url || '')}</a></div>
      </div>`;
    }
    if (name === 'terminal' || name === 'shell' || name === 'code_execution') {
      return `<div style="display: flex; flex-direction: column; gap: 4px;">
        <strong>Command:</strong>
        <pre style="background:#1E1E2E;color:#CDD6F4;padding:10px;border-radius:6px;font-family:monospace;margin:4px 0;overflow-x:auto;">$ ${DOMPurify.sanitize(args.command || '')}</pre>
      </div>`;
    }
    if (nameLower.includes('file')) {
      const op = name.includes('write') ? 'Write' : name.includes('edit') ? 'Edit' : 'Read';
      return `<div style="display: flex; flex-direction: column; gap: 4px;">
        <div><strong>File Operation:</strong> ${op}</div>
        <div><strong>Path:</strong> <code style="background:#F3F4F6;padding:2px 5px;border-radius:4px;font-family:monospace;">${DOMPurify.sanitize(args.path || args.filename || '')}</code></div>
      </div>`;
    }

    // Generic JSON formatting fallback
    try {
      const formatted = JSON.stringify(args, null, 2);
      return `<pre style="background:#F3F4F6;padding:8px;border-radius:6px;font-family:monospace;margin:4px 0;overflow-x:auto;font-size:11px;">${DOMPurify.sanitize(formatted)}</pre>`;
    } catch {
      return `<div style="font-family:monospace;font-size:11px;">${DOMPurify.sanitize(String(args))}</div>`;
    }
  }

  function getToolIconHtml(toolName) {
    const nameLower = toolName.toLowerCase();
    if (nameLower.includes('gmail') || nameLower.includes('email')) {
      return `
        <svg class="gmail-logo" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0; vertical-align: middle;">
          <path d="M20 4H18V13.5L12 9.5L6 13.5V4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H6V10.5L12 14.5L18 10.5V20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#EA4335"/>
          <path d="M4 20H6V10.5L2 7.5V18C2 19.1 2.9 20 4 20Z" fill="#34A853"/>
          <path d="M20 20H18V10.5L22 7.5V18C22 19.1 21.1 20 20 20Z" fill="#4285F4"/>
          <path d="M18 4H20C21.1 4 22 4.9 22 6V7.5L18 4.5V4Z" fill="#FBBC05"/>
          <path d="M6 4H4C2.9 4 2 4.9 2 6V7.5L6 4.5V4Z" fill="#FBBC05"/>
        </svg>
      `;
    }
    if (nameLower.includes('memory')) {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`;
    }
    if (nameLower.includes('search')) {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    }
    if (nameLower.includes('browser') || nameLower.includes('navigate') || nameLower.includes('tab') || nameLower.includes('screen') || nameLower.includes('click') || nameLower.includes('type')) {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    }
    if (nameLower.includes('terminal') || nameLower.includes('shell') || nameLower.includes('code') || nameLower.includes('run')) {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;
    }
    if (nameLower.includes('file')) {
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
    }
    // Default fallback icon
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
  }

  function getToolLabelName(name) {
    const nameLower = (name || '').toLowerCase();
    if (nameLower.includes('gmail') || nameLower.includes('email')) {
      return 'Gmail';
    }
    if (nameLower === 'web_search') {
      return 'Searching';
    }
    if (nameLower === 'browser' || nameLower === 'navigate' || nameLower === 'get_screen' || nameLower === 'click' || nameLower === 'type') {
      return 'Viewed';
    }
    if (nameLower === 'terminal' || nameLower === 'shell' || nameLower === 'code_execution') {
      return 'Terminal';
    }
    if (nameLower === 'open_tab') {
      return 'Opening tab';
    }
    if (nameLower === 'list_tabs') {
      return 'Listing tabs';
    }
    if (nameLower === 'switch_tab') {
      return 'Switching tab';
    }
    if (nameLower === 'close_tab') {
      return 'Closing tab';
    }
    if (nameLower === 'memory') {
      return 'Memory';
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function appendMessage(sender, text, avatarUrlOrText = '', reasoning = '', tool_calls = []) {
    if (!chatMessagesLog) return null;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;

    if (sender === 'assistant') {
      msgDiv.dataset.branches = JSON.stringify([{ text: text, reasoning: reasoning, tool_calls: tool_calls }]);
      msgDiv.dataset.currentBranch = "0";
    }

    let headerHtml = '';
    if (sender === 'assistant') {
      headerHtml = `
        <div class="chat-assistant-header">
          <div class="chat-assistant-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" class="logo">
              <circle cx="12" cy="12" r="12" fill="#000000"/>
              <path d="M 7.5,7 H 16.5 V 9.5 L 11.0,14.5 H 16.5 V 17 H 7.5 V 14.5 L 13.0,9.5 H 7.5 Z" fill="#FFFFFF"/>
            </svg>
          </div>
          <span class="chat-assistant-name">zed pro</span>
          <span class="chat-assistant-badge">Pro</span>
        </div>
      `;
    }

    const isAssistantFinal = sender === 'assistant' && !text.includes('thinking-line') && !text.includes('activity-phase');
    const content = isAssistantFinal ? renderMarkdown((text || '').trim()) : text;
    
    msgDiv.innerHTML = `${headerHtml}<div class="chat-message-bubble"><div class="message-collapsible-blocks"></div><div class="cot-response-text-container">${content}</div></div>`;

    const blocksContainer = msgDiv.querySelector('.message-collapsible-blocks');

    // 1. Render collapsed reasoning if present
    if (sender === 'assistant' && reasoning) {
      const cotBlock = createActivityRow({
        type: 'reasoning',
        label: 'Thinking Process',
        statusText: '',
        contentHtml: DOMPurify.sanitize(reasoning),
        defaultOpen: false
      });
      blocksContainer.appendChild(cotBlock);
    }

    // 2. Render tool calls if present
    if (sender === 'assistant' && Array.isArray(tool_calls)) {
      tool_calls.forEach(tc => {
        if (tc.name === 'swarm_router' || tc.name === 'delegate_task') {
          return; // Skip rendering internal swarm tools
        }
        const detailHtml = getToolDetailHtml(tc.name, tc.args);
        const stateWord = tc.status === 'complete' ? 'Completed' : tc.status === 'failed' ? 'Failed' : 'Running';
        
        const toolBlock = createActivityRow({
          type: 'tool',
          label: getToolLabelName(tc.name),
          iconSvg: getToolIconHtml(tc.name),
          detailHtml: detailHtml,
          contentHtml: formatToolArgs(tc.name, tc.args),
          statusText: stateWord === 'Completed' ? '' : stateWord,
          defaultOpen: false
        });
        blocksContainer.appendChild(toolBlock);
      });
    }

    chatMessagesLog.appendChild(msgDiv);

    // Add actions to user messages immediately; assistant actions are added after response completes
    if (sender === 'user') {
      appendMessageActions(msgDiv, text, 'user');
    }

    chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
    
    return msgDiv;
  }

  function generateSwarmAgents(promptText, count = 250) {
    const list = [];
    const isPoetryOrWriter = promptText.toLowerCase().includes('write') || promptText.toLowerCase().includes('poetry') || promptText.toLowerCase().includes('book') || promptText.toLowerCase().includes('gmail');
    
    const classicalWriters = [
      'Writer Li Bai', 'Writer Du Fu', 'Writer Su Shi', 'Writer Li Qingzhao', 
      'Writer Dream Red Chamber', 'Writer Three Kingdoms', 'Writer Lu Xun', 
      'Writer Shen Congwen', 'Writer Eileen Chang', 'Writer Mo Yan', 
      'Writer Yu Hua', 'Writer Wang Xiaobo', 'Writer Qu Yuan', 'Writer Tao Yuanming',
      'Writer Wang Wei', 'Writer Bai Juyi', 'Writer Xin Qiji', 'Writer Sima Qian',
      'Writer Cao Xueqin', 'Writer Luo Guanzhong', 'Writer Shi Nai\'an', 'Writer Wu Cheng\'en'
    ];

    const techAgents = [
      'PaperAnalyzer', 'SynthesisWriter', 'VisualizationCreator', 'CitationManager',
      'PDFGenerator', 'HeaderParser', 'DateClassifier', 'EmailFetcher', 'TextSummarizer',
      'LoggerAgent', 'ValidatorAgent', 'ModelSelector', 'PromptOptimizer', 'SearchProxy',
      'CodeReviewer', 'MemoryManager', 'TaskScheduler', 'ErrorHandler', 'DatabaseConnector'
    ];

    for (let i = 1; i <= count; i++) {
      let name = '';
      if (isPoetryOrWriter) {
        name = classicalWriters[(i - 1) % classicalWriters.length];
        if (i > classicalWriters.length) {
          name += ` ${Math.ceil(i / classicalWriters.length)}`;
        }
      } else {
        name = techAgents[(i - 1) % techAgents.length];
        if (i > techAgents.length) {
          name += ` ${Math.ceil(i / techAgents.length)}`;
        }
      }

      list.push({
        idStr: String(i).padStart(2, '0'),
        name: name,
        task: isPoetryOrWriter ? 'Compiling segment and formatting text structure' : 'Extracting section data and computing embeddings',
        status: 'pending'
      });
    }
    return list;
  }

  // Dynamic subagent list: each row shows [person icon] Create Subagent | [spinner] Name
  // Rows are keyed by agent index and can be updated to checkmark when done
  function createSwarmSubagentsList(agents) {
    const container = document.createElement('div');
    container.className = 'swarm-subagents-card';
    container.style.cssText = `
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      background: #FFFFFF;
      overflow: hidden;
      margin: 12px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      position: relative;
      width: 100%;
    `;

    const listContainer = document.createElement('div');
    listContainer.className = 'swarm-subagents-scroll';
    listContainer.style.cssText = `
      max-height: 280px;
      overflow-y: auto;
    `;

    agents.forEach((agent, index) => {
      const row = document.createElement('div');
      row.id = `swarm-list-row-${agent.idx}`;
      row.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        border-bottom: ${index === agents.length - 1 ? 'none' : '1px solid #F3F4F6'};
        font-size: 13px;
        color: #374151;
        transition: background 0.2s;
        cursor: pointer;
      `;
      row.addEventListener('mouseenter', () => {
        row.style.background = '#F9FAFB';
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = 'transparent';
      });
      row.addEventListener('click', () => {
        showAgentDetails(agent.idx);
      });

      const left = document.createElement('div');
      left.style.cssText = 'display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;';

      // Left icon: Profile outline inside a circle ("Create Subagent" icon)
      const profileCircle = document.createElement('span');
      profileCircle.style.cssText = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #D1D5DB;
        background: #F9FAFB;
        color: #6B7280;
        flex-shrink: 0;
      `;
      profileCircle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      `;
      left.appendChild(profileCircle);

      // "Create Subagent" label
      const label = document.createElement('span');
      label.textContent = 'Create Subagent';
      label.style.cssText = 'color: #9CA3AF; font-size: 12px; flex-shrink: 0;';
      left.appendChild(label);

      // Separator
      const sep = document.createElement('span');
      sep.textContent = '|';
      sep.style.cssText = 'color: #D1D5DB; font-size: 12px; flex-shrink: 0;';
      left.appendChild(sep);

      // Right side: spinner + agent name (will be updated when done)
      const statusWrap = document.createElement('span');
      statusWrap.id = `swarm-row-status-${agent.idx}`;
      statusWrap.style.cssText = 'display: inline-flex; align-items: center; gap: 6px; min-width: 0;';
      statusWrap.innerHTML = `
        <svg id="swarm-row-spinner-${agent.idx}" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2.5" stroke-linecap="round" style="animation: subagent-spin 1s linear infinite; flex-shrink: 0;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="4 4"/>
        </svg>
        <span style="font-size: 13px; color: #374151; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${agent.name}</span>
      `;
      left.appendChild(statusWrap);

      row.appendChild(left);
      
      // Chevron-right icon on the right side
      const right = document.createElement('span');
      right.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
      right.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; margin-left: 6px;';
      row.appendChild(right);

      listContainer.appendChild(row);
    });

    container.appendChild(listContainer);
    return container;
  }

  // Update a swarm list row to show checkmark (done) or error state
  function updateSwarmListRow(agentIdx, success = true) {
    const statusWrap = document.getElementById(`swarm-row-status-${agentIdx}`);
    if (!statusWrap) return;
    const row = document.getElementById(`swarm-list-row-${agentIdx}`);
    const agentName = statusWrap.querySelector('span') ? statusWrap.querySelector('span').textContent : '';
    statusWrap.innerHTML = success
      ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
         <span style="font-size: 13px; color: #374151; font-weight: 500;">${agentName}</span>`
      : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
         <span style="font-size: 13px; color: #374151; font-weight: 500;">${agentName}</span>`;
    // Row background color remains the same
  }

  function createSwarmParallelCards(agents) {
    const container = document.createElement('div');
    container.className = 'swarm-parallel-cards-container';
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 12px 0;
      width: 100%;
    `;

    agents.forEach((agent) => {
      const card = document.createElement('div');
      card.className = 'swarm-agent-card';
      card.style.cssText = `
        border: 1px solid #E5E7EB;
        border-radius: 12px;
        background: #FFFFFF;
        padding: 14px 16px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
      `;

      // Header row: Avatar, Name, ID
      const header = document.createElement('div');
      header.style.cssText = 'display: flex; align-items: center; justify-content: space-between; width: 100%;';

      const left = document.createElement('div');
      left.style.cssText = 'display: flex; align-items: center; gap: 10px;';

      const avatarCircle = document.createElement('span');
      avatarCircle.style.cssText = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #F3F4F6;
        color: #1F2937;
        font-weight: bold;
        font-size: 13px;
        border: 1px solid #E5E7EB;
      `;
      avatarCircle.innerHTML = agent.avatarHtml || `<span style="font-size: 11px;">${agent.name[0].toUpperCase()}</span>`;
      left.appendChild(avatarCircle);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = agent.name;
      nameSpan.style.cssText = 'font-weight: 600; color: #111827; font-size: 13.5px;';
      left.appendChild(nameSpan);

      header.appendChild(left);

      const idSpan = document.createElement('span');
      idSpan.textContent = agent.idStr || '01';
      idSpan.style.cssText = 'font-weight: 700; color: #111827; font-size: 13px;';
      header.appendChild(idSpan);

      card.appendChild(header);

      // Bottom Row: Task description & Progress dots
      const bottom = document.createElement('div');
      bottom.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 2px;';

      const taskSpan = document.createElement('span');
      taskSpan.textContent = agent.task;
      taskSpan.style.cssText = 'font-size: 12.5px; color: #4B5563; line-height: 1.4; flex: 1;';
      bottom.appendChild(taskSpan);

      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-dots-container';
      progressContainer.style.cssText = 'display: flex; gap: 2px; flex-shrink: 0;';

      const totalDots = 10;
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
          width: 6px;
          height: 8px;
          background: #E5E7EB;
          border-radius: 1px;
          transition: background 0.3s;
        `;
        progressContainer.appendChild(dot);
      }
      bottom.appendChild(progressContainer);

      card.appendChild(bottom);
      container.appendChild(card);

      // Animate progress dots if active
      if (agent.status === 'running') {
        let activeDots = 0;
        const interval = setInterval(() => {
          if (activeDots <= totalDots) {
            const dots = progressContainer.children;
            for (let i = 0; i < totalDots; i++) {
              if (i < activeDots) {
                dots[i].style.background = '#10B981';
              } else {
                dots[i].style.background = '#E5E7EB';
              }
            }
            activeDots++;
          } else {
            clearInterval(interval);
          }
        }, 200 + Math.random() * 200);
      } else if (agent.status === 'completed') {
        setTimeout(() => {
          const dots = progressContainer.children;
          for (let i = 0; i < totalDots; i++) {
            dots[i].style.background = '#10B981';
          }
        }, 50);
      }
    });

    return container;
  }

  function streamText(element, text, speedMs = 12) {
    return new Promise((resolve) => {
      const words = text.split(' ');
      let i = 0;
      element.textContent = '';
      const interval = setInterval(() => {
        if (i < words.length) {
          element.textContent += (i === 0 ? '' : ' ') + words[i];
          i++;
          const chatLog = document.getElementById('chatMessagesLog');
          if (chatLog) chatLog.scrollTop = chatLog.scrollHeight;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speedMs);
    });
  }

  async function triggerSwarmVisualization(promptText, bubbleElement, model) {
    if (!bubbleElement) return;

    // Reset Viewed Agent Index
    viewedAgentIdx = 0;

    // Show right panel split pane, set to Agent mode view
    toggleAgentSplit(true);

    // Update split panel task description
    const agentPaneTitle = document.getElementById('agentPaneTitle');
    if (agentPaneTitle) agentPaneTitle.textContent = 'Agent 01';
    const agentPaneTaskText = document.getElementById('agentPaneTaskText');
    if (agentPaneTaskText) {
      const short = promptText.length > 40 ? promptText.slice(0, 40) + '...' : promptText;
      agentPaneTaskText.textContent = short;
    }
    const agentPaneProgressCount = document.getElementById('agentPaneProgressCount');
    if (agentPaneProgressCount) agentPaneProgressCount.textContent = '0/0';

    // Show agent panel footer
    const agentPaneFooter = document.getElementById('agentPaneFooter');
    const agentPaneFooterText = document.getElementById('agentPaneFooterText');
    if (agentPaneFooter) agentPaneFooter.style.display = 'flex';
    if (agentPaneFooterText) agentPaneFooterText.textContent = 'Thinking...';

    let blocksContainer = bubbleElement.querySelector('.message-collapsible-blocks');
    if (!blocksContainer) {
      blocksContainer = document.createElement('div');
      blocksContainer.className = 'message-collapsible-blocks';
      blocksContainer.style.cssText = 'width: 100%;';
      bubbleElement.insertBefore(blocksContainer, bubbleElement.firstChild);
    }

    // Step 1: Call LLM to decompose the task and generate dynamic texts
    window.dispatchEvent(new CustomEvent('agent-typing-start', { detail: { status: 'Thinking' } }));

    let rawContent = '{}';
    try {
      rawContent = await callRealAPI(model, [
        { role: 'system', content: `You are a task orchestrator. Given a user task, decompose it and plan parallel sub-agent execution.
Return ONLY a valid JSON object. No explanation, no markdown. Just the JSON.

JSON Structure:
{
  "thoughts": "Your detailed reasoning/thought process (2-3 sentences) analyzing the prompt and describing how you will tackle it.",
  "introText": "A friendly introductory paragraph (1-2 sentences) explaining to the user what you are going to do and that you are creating sub-agents.",
  "transitionText": "A transition paragraph (1-2 sentences) explaining that the sub-agents have been created and what they are now doing in parallel.",
  "subagents": [
    {
      "name": "Role Name (e.g. Competitor Landscape Researcher, Pricing Analyst)",
      "task": "Specific task description for this sub-agent.",
      "avatar": "Emoji avatar"
    }
  ]
}` },
        { role: 'user', content: promptText }
      ], null, null, null, null, true);
    } catch (err) {
      console.error('Task decomposition error:', err);
    }

    // Parse sub-agents and text details
    let parsedData = {};
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        parsedData = JSON.parse(rawContent);
      }
    } catch (err) {
      console.error('JSON parsing failed:', err);
    }

    // Create dynamic fallbacks using promptText so it is never static or hardcoded
    const cleanPrompt = promptText.length > 40 ? promptText.slice(0, 40) + '...' : promptText;
    const thoughtsText = parsedData.thoughts || `Decomposing analysis task: "${promptText}". Planning parallel research tracks to query target indices, verify details, and compile comprehensive comparison structures.`;
    const introText = parsedData.introText || `I'll analyze the request for "${cleanPrompt}" by creating specialized sub-agents to investigate different aspects in parallel. Let me start by spawning the sub-agents and assigning their research tasks.`;
    const transitionText = parsedData.transitionText || `I've successfully created the specialized sub-agents. They are now actively gathering and analyzing information in parallel.`;
    let subAgents = parsedData.subagents || parsedData.subAgents;

    // Safety Fallback: Guarantee we always have a clean list of subagents
    if (!Array.isArray(subAgents) || subAgents.length === 0) {
      subAgents = [
        { name: 'Competitor Landscape Researcher', task: `Search and compile competitive landscape data for: ${promptText}`, avatar: '🕵️' },
        { name: 'Customer Persona Researcher', task: `Define target customer profiles and requirements for: ${promptText}`, avatar: '👥' }
      ];
    }

    // Step 2: Create and stream thoughts block
    const thinkingStartTime = Date.now();
    const cotSection = createActivityRow({
      type: 'active',
      label: 'Thinking...',
      statusText: '',
      contentHtml: 'Analyzing task structure and determining optimal agent allocation...',
      isExpanded: true
    });
    blocksContainer.appendChild(cotSection);

    const cotContentDiv = cotSection.querySelector('.activity-content-inner');
    const labelSpan = cotSection.querySelector('.activity-label-span');

    if (cotContentDiv) {
      cotContentDiv.textContent = '';
      const thoughtWords = thoughtsText.split(' ');
      for (let w = 0; w < thoughtWords.length; w++) {
        cotContentDiv.textContent += (w === 0 ? '' : ' ') + thoughtWords[w];
        await new Promise(r => setTimeout(r, 15));
      }
    }

    // Collapse/finalize thinking block
    const duration = Math.round((Date.now() - thinkingStartTime) / 1000);
    const durationText = duration <= 1 ? '1s' : `${duration}s`;
    if (labelSpan) {
      labelSpan.textContent = `Thought for ${durationText}`;
      labelSpan.style.color = '#4B5563';
    }
    const iconSpan = cotSection.querySelector('.activity-icon-span');
    if (iconSpan) {
      iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
    }
    const chevron = cotSection.querySelector('.activity-chevron');
    if (chevron) {
      chevron.style.transform = 'rotate(0deg)';
    }
    const contentContainer = cotSection.querySelector('.activity-content-container');
    if (contentContainer) {
      contentContainer.style.maxHeight = '0px';
      contentContainer.style.padding = '0px 12px 0px 24px';
    }

    if (agentPaneFooterText) agentPaneFooterText.textContent = 'Decomposing task...';

    // Map subagents to Swarm object structure
    const HUMAN_NAMES = ['Summer', 'Allen', 'Logan', 'Aria', 'Carter', 'Brooke'];
    subAgents = subAgents.map((a, i) => ({
      idx: i,
      idStr: String(i + 1).padStart(2, '0'),
      name: HUMAN_NAMES[i % HUMAN_NAMES.length],
      role: a.name || `Subagent ${i + 1}`,
      task: a.task || 'Working...',
      avatarHtml: `<span style="font-size: 13px;">${a.avatar || '🤖'}</span>`,
      status: 'pending',
      result: '',
      dotsCount: 2,
      activities: [
        { type: 'think', label: 'Initializing sandboxed execution context' },
        { type: 'terminal', label: `Spawning sub-agent process '${HUMAN_NAMES[i % HUMAN_NAMES.length]}' [PID ${Math.floor(Math.random() * 9000 + 1000)}]` },
        { type: 'think', label: 'Allocating container nodes and loading tool suite' }
      ]
    }));

    // Reset split panel to Overview tab
    const agentOverview = document.getElementById('agentPaneOverview');
    const agentDetails = document.getElementById('agentPaneDetailsView');
    if (agentOverview) agentOverview.style.display = 'flex';
    if (agentDetails) agentDetails.style.display = 'none';

    // Clear previous log simulations
    agentLogIntervals.forEach(clearInterval);
    agentLogIntervals = [];

    // Initialize global agents array
    currentSwarmAgents = subAgents;
    viewedAgentIdx = 0; // Default to first agent
    const totalAgents = subAgents.length;

    // Update agent panel progress count
    if (agentPaneProgressCount) agentPaneProgressCount.textContent = `0/${totalAgents}`;
    if (agentPaneFooterText) agentPaneFooterText.textContent = `Creating subagents... 0/${totalAgents} completed`;

    // Prepare text container
    let textContainer = bubbleElement.querySelector('.cot-response-text-container');
    if (!textContainer) {
      textContainer = document.createElement('div');
      textContainer.className = 'cot-response-text-container';
      bubbleElement.appendChild(textContainer);
    }
    textContainer.innerHTML = '';

    // --- Stream Response 1 (Dynamic Intro Text) ---
    const p1 = document.createElement('p');
    p1.style.cssText = "margin-bottom: 12px; font-size: 13.5px; color: #374151; line-height: 1.5;";
    textContainer.appendChild(p1);
    await streamText(p1, introText);

    // --- Create and append the subagents list card container ---
    const listCard = createSwarmSubagentsCardContainer();
    blocksContainer.appendChild(listCard);

    // Initialize right panel card
    const agentPaneRows = document.getElementById('agentPaneSubagentRows');
    let rightPanelCard;
    if (agentPaneRows) {
      agentPaneRows.innerHTML = '';
      agentPaneRows.style.padding = '16px';
      rightPanelCard = document.createElement('div');
      rightPanelCard.style.cssText = `
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        background: #FFFFFF;
        overflow: hidden;
        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      `;
      agentPaneRows.appendChild(rightPanelCard);
    }

    // --- Generate subagents one by one with delay/animation ---
    for (let i = 0; i < totalAgents; i++) {
      const agent = subAgents[i];
      // Add row to Chat Bubble card
      addCreationRow(listCard, agent, totalAgents);

      // Add row to Right Panel card
      if (rightPanelCard) {
        const row = document.createElement('div');
        row.id = `agent-pane-row-${agent.idx}`;
        row.style.cssText = `
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          border-bottom: 1px solid #F3F4F6;
          font-family: 'Inter', sans-serif;
          transition: background 0.2s, opacity 0.3s ease, transform 0.3s ease;
          cursor: pointer;
          opacity: 0;
          transform: translateY(5px);
        `;
        row.addEventListener('mouseenter', () => { row.style.background = '#F9FAFB'; });
        row.addEventListener('mouseleave', () => { row.style.background = 'transparent'; });
        row.addEventListener('click', () => { showAgentDetails(agent.idx); });

        const circleIcon = document.createElement('span');
        circleIcon.id = `agent-pane-icon-${agent.idx}`;
        circleIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
        circleIcon.style.cssText = 'flex-shrink: 0; display: flex; align-items: center;';
        row.appendChild(circleIcon);

        const label = document.createElement('span');
        label.textContent = 'Create Subagent';
        label.style.cssText = 'font-size: 12px; color: #9CA3AF; flex-shrink: 0;';
        row.appendChild(label);

        const sep = document.createElement('span');
        sep.textContent = '|';
        sep.style.cssText = 'color: #E5E7EB; font-size: 12px; flex-shrink: 0;';
        row.appendChild(sep);

        const statusWrap = document.createElement('span');
        statusWrap.id = `agent-pane-status-${agent.idx}`;
        statusWrap.style.cssText = 'display: inline-flex; align-items: center; gap: 6px; min-width: 0; flex: 1;';
        statusWrap.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2.5" stroke-linecap="round" style="animation: subagent-spin 1s linear infinite; flex-shrink: 0;">
            <circle cx="12" cy="12" r="10" stroke-dasharray="4 4"/>
          </svg>
          <span style="font-size: 13px; color: #374151; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${agent.role}</span>
        `;
        row.appendChild(statusWrap);
        rightPanelCard.appendChild(row);

        row.offsetHeight;
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
        
        const rRows = rightPanelCard.children;
        for (let k = 0; k < rRows.length; k++) {
          rRows[k].style.borderBottom = k === rRows.length - 1 ? 'none' : '1px solid #F3F4F6';
        }
      }

      // Wait to simulate creation activity
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mark this subagent row as created/checkmark
      // Update Chat row status
      const spinner = document.getElementById(`swarm-row-spinner-${agent.idx}`);
      if (spinner) {
        const parent = spinner.parentNode;
        spinner.remove();
        const check = document.createElement('span');
        check.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="3" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>`;
        check.style.cssText = 'display: inline-flex; align-items: center; flex-shrink:0; margin-right:4px;';
        parent.insertBefore(check, parent.firstChild);
      }

      // Update Pane row status
      const paneIcon = document.getElementById('agent-pane-icon-' + agent.idx);
      if (paneIcon) {
        paneIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><circle cx="12" cy="12" r="10" fill="#E6F4EA"/><path d="M9 12l2 2 4-4"/></svg>`;
      }
      const paneStatus = document.getElementById('agent-pane-status-' + agent.idx);
      if (paneStatus) {
        paneStatus.innerHTML = `<span style="font-size: 13px; color: #374151; font-weight: 500;">${agent.role}</span>`;
      }

      if (agentPaneFooterText) agentPaneFooterText.textContent = `Creating subagents... ${i + 1}/${totalAgents} completed`;
    }

    // --- Stream Response 2 (Dynamic Transition Text) ---
    const p2 = document.createElement('p');
    p2.style.cssText = "margin-top: 16px; margin-bottom: 12px; font-size: 13.5px; color: #374151; line-height: 1.5;";
    textContainer.appendChild(p2);
    await streamText(p2, transitionText);

    // Step 4: Execute all sub-agents in parallel using callRealAPI (streaming real CoT, tokens, and tool calls)
    let completedCount = 0;
    const allResults = [];
    const parallelPromises = subAgents.map((agent, idx) => {
      agent.status = 'running';
      agent.activities = [
        { type: 'think', label: `Initializing sub-agent execution context for role: ${agent.role}...` },
        { type: 'terminal', label: `Spawning sub-agent process '${agent.name}'` }
      ];
      
      if (viewedAgentIdx === agent.idx) {
        updateTerminalDisplay(agent.idx);
      }

      let activeThinkActivity = null;
      let activeWriteActivity = null;

      const onSubagentToken = (token) => {
        if (!activeWriteActivity) {
          if (activeThinkActivity) {
            activeThinkActivity.isFinalized = true;
          }
          activeWriteActivity = { type: 'write', label: 'Compiling response components: ' };
          agent.activities.push(activeWriteActivity);
        }
        activeWriteActivity.label += token;
        
        if (viewedAgentIdx === agent.idx) {
          updateTerminalDisplay(agent.idx);
        }
      };

      const onSubagentReasoning = (reasoningDelta) => {
        if (!activeThinkActivity || activeThinkActivity.isFinalized) {
          activeThinkActivity = { type: 'think', label: '' };
          agent.activities.push(activeThinkActivity);
        }
        activeThinkActivity.label += reasoningDelta;
        
        if (viewedAgentIdx === agent.idx) {
          updateTerminalDisplay(agent.idx);
        }
      };

      const onSubagentToolUsage = (toolUsage) => {
        if (toolUsage.type === 'tool_start') {
          const toolLabel = TOOL_LABELS[toolUsage.name] || toolUsage.name;
          const argsStr = toolUsage.args ? JSON.stringify(toolUsage.args) : '';
          agent.activities.push({
            type: 'terminal',
            label: `Executing tool ${toolUsage.name} ${argsStr ? `(${argsStr.slice(0, 100)}${argsStr.length > 100 ? '...' : ''})` : ''}`
          });
          
          if (viewedAgentIdx === agent.idx) {
            updateTerminalDisplay(agent.idx);
          }
        }
      };

      return (async () => {
        try {
          const result = await callRealAPI(model, [
            { role: 'system', content: `You are ${agent.role}. Complete this task concisely and thoroughly:\n\n${agent.task}` },
            { role: 'user', content: promptText }
          ], onSubagentToken, null, onSubagentReasoning, onSubagentToolUsage, false) || 'No response';
          
          agent.status = 'done';
          agent.dotsCount = 10;
          agent.result = result;
          allResults[idx] = result;

          agent.activities.push({
            type: 'success',
            label: `SUCCESS: Task complete. Output returned.`
          });

          if (viewedAgentIdx === agent.idx) {
            updateTerminalDisplay(agent.idx);
          }

          // Update progress counts
          completedCount++;
          if (agentPaneProgressCount) agentPaneProgressCount.textContent = `${completedCount}/${totalAgents}`;
          if (agentPaneFooterText) agentPaneFooterText.textContent = `Executing subagents... ${completedCount}/${totalAgents} completed`;
          return result;
        } catch (err) {
          agent.status = 'failed';
          agent.dotsCount = 10;
          agent.result = `Error: ${err.message}`;
          allResults[idx] = `Error: ${err.message}`;
          
          agent.activities.push({
            type: 'failed',
            label: `ERROR: Task execution failed. ${err.message}`
          });

          if (viewedAgentIdx === agent.idx) {
            updateTerminalDisplay(agent.idx);
          }

          completedCount++;
          if (agentPaneProgressCount) agentPaneProgressCount.textContent = `${completedCount}/${totalAgents}`;
          if (agentPaneFooterText) agentPaneFooterText.textContent = `Executing subagents... ${completedCount}/${totalAgents} completed`;
          return null;
        }
      })();
    });

    await Promise.all(parallelPromises);

    // Step 5: Aggregate results with LLM using callRealAPI (skip agent loop for speed)    // Step 5: Aggregate results with LLM using callRealAPI (skip agent loop for speed)    // Step 5: Aggregate results with LLM using callRealAPI (skip agent loop for speed)    // Step 5: Aggregate results with LLM using callRealAPI (skip agent loop for speed)    // Step 5: Aggregate results with LLM using callRealAPI (skip agent loop for speed)
    if (agentPaneFooterText) agentPaneFooterText.textContent = 'Synthesizing results...';
    let finalResponse = '';
    try {
      finalResponse = await callRealAPI(model, [
        { role: 'system', content: 'You are a synthesizer. Combine the sub-agent results into a single comprehensive, well-structured response for the user. Use markdown formatting.' },
        { role: 'user', content: `Original task: ${promptText}\n\nSub-agent results:\n${subAgents.map((a) => `### ${a.name}\n${a.result}`).join('\n\n')}` }
      ], null, null, null, null, true);
    } catch (err) {
      console.error('Aggregation error:', err);
      finalResponse = allResults.join('\n\n');
    }

    // Update panel to show "complete" state
    if (agentPaneFooterText) agentPaneFooterText.textContent = 'All subagents complete';
    const agentPaneStatusDot = document.getElementById('agentPaneStatusDot');
    if (agentPaneStatusDot) {
      agentPaneStatusDot.style.animation = 'none';
      agentPaneStatusDot.style.background = '#10B981';
    }
    // Fade out footer after 2s
    setTimeout(() => {
      if (agentPaneFooter) {
        agentPaneFooter.style.transition = 'opacity 0.4s ease';
        agentPaneFooter.style.opacity = '0';
        setTimeout(() => { agentPaneFooter.style.display = 'none'; agentPaneFooter.style.opacity = '1'; }, 450);
      }
    }, 2000);

    // Step 6: Show final aggregated response inside the same assistant bubble
    textContainer = bubbleElement.querySelector('.cot-response-text-container');
    if (!textContainer) {
      textContainer = document.createElement('div');
      textContainer.className = 'cot-response-text-container';
      bubbleElement.appendChild(textContainer);
    }
    const finalHtml = renderMarkdown(finalResponse);
    const existingText = textContainer.innerHTML.trim();
    if (existingText) {
      textContainer.innerHTML = `<div style="margin-bottom: 12px;">${existingText}</div><div style="margin-top: 16px; border-top: 1px solid #F3F4F6; padding-top: 16px;">${finalHtml}</div>`;
    } else {
      textContainer.innerHTML = finalHtml;
    }
    wireCodeBlockActions(textContainer);
    
    // Save to task history
    const active = tasksStore.tasks.find(t => t.id === tasksStore.activeId);
    if (active) {
      active.messages.push({ role: 'assistant', content: finalResponse });
      tasksStore.notify();
    }
    
    chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
  }

  // ── Artifact Panel ──────────────────────────────────────────────────────
  const artifactPanel = document.getElementById('artifactPanel');
  const artifactEditor = document.getElementById('artifactEditor');
  const artifactFilename = document.getElementById('artifactFilename');
  const artifactPreview = document.getElementById('artifactPreview');
  const artifactPreviewFrame = document.getElementById('artifactPreviewFrame');
  let currentArtifactLang = '';
  let currentArtifactContent = '';

  function openArtifact(lang, content) {
    currentArtifactLang = lang;
    currentArtifactContent = content;
    artifactEditor.value = content;
    const ext = { javascript: 'js', typescript: 'ts', python: 'py', html: 'html', css: 'css', json: 'json', xml: 'xml', markdown: 'md', bash: 'sh', shell: 'sh', sql: 'sql', rust: 'rs', go: 'go', java: 'java', cpp: 'cpp', c: 'c', ruby: 'rb', php: 'php' };
    artifactFilename.textContent = `code.${ext[lang] || 'txt'}`;
    artifactPanel.style.display = 'flex';
    // Animate width
    artifactPanel.style.width = '0px';
    requestAnimationFrame(() => { artifactPanel.style.width = '420px'; });
    // Only show preview for HTML
    if (lang === 'html') {
      artifactPreview.style.display = 'flex';
      artifactEditor.style.display = 'none';
      artifactPreviewFrame.srcdoc = content;
    } else {
      artifactPreview.style.display = 'none';
      artifactEditor.style.display = '';
    }
  }

  function closeArtifact() {
    artifactPanel.style.width = '0px';
    setTimeout(() => { artifactPanel.style.display = 'none'; }, 250);
  }

  function wireCodeBlockActions(container) {
    if (!container) return;

    // 1. Wire copy-code buttons
    container.querySelectorAll('.copy-code-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.dataset.code || '';
        navigator.clipboard.writeText(code).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.background = 'rgba(16, 185, 129, 0.2)';
          btn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'rgba(255,255,255,0.05)';
            btn.style.borderColor = 'rgba(255,255,255,0.1)';
          }, 1500);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      });
    });

    // 2. Wire download-code-btn
    container.querySelectorAll('.download-code-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const box = btn.closest('.code-artifact-box');
        if (!box) return;
        const copyBtn = box.querySelector('.copy-code-btn');
        const code = copyBtn ? copyBtn.dataset.code : '';
        const langLabel = box.querySelector('.code-lang-label');
        const lang = langLabel ? langLabel.textContent.toLowerCase().trim() : 'text';
        
        const ext = { 
          javascript: 'js', js: 'js', 
          typescript: 'ts', ts: 'ts', 
          python: 'py', py: 'py', 
          html: 'html', css: 'css', 
          json: 'json', xml: 'xml', 
          markdown: 'md', md: 'md', 
          bash: 'sh', sh: 'sh', shell: 'sh', 
          sql: 'sql', rust: 'rs', rs: 'rs', 
          go: 'go', java: 'java', cpp: 'cpp', c: 'c', 
          ruby: 'rb', php: 'php' 
        };
        const filename = `code.${ext[lang] || 'txt'}`;
        const blob = new Blob([code], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);

        // Visual feedback
        const originalText = btn.textContent;
        btn.textContent = 'Downloaded!';
        btn.style.background = 'rgba(59, 130, 246, 0.2)';
        btn.style.borderColor = 'rgba(59, 130, 246, 0.4)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = 'rgba(255,255,255,0.05)';
          btn.style.borderColor = 'rgba(255,255,255,0.1)';
        }, 1500);
      });
    });

    // 3. Wire share-code-btn
    container.querySelectorAll('.share-code-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const box = btn.closest('.code-artifact-box');
        if (!box) return;
        const copyBtn = box.querySelector('.copy-code-btn');
        const code = copyBtn ? copyBtn.dataset.code : '';
        const langLabel = box.querySelector('.code-lang-label');
        const lang = langLabel ? langLabel.textContent.toUpperCase().trim() : 'TEXT';

        const shareText = `// Shareable Code Snippet (${lang})\n${code}`;
        navigator.clipboard.writeText(shareText).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Link Copied!';
          btn.style.background = 'rgba(139, 92, 246, 0.2)';
          btn.style.borderColor = 'rgba(139, 92, 246, 0.4)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'rgba(255,255,255,0.05)';
            btn.style.borderColor = 'rgba(255,255,255,0.1)';
          }, 1500);
        }).catch(() => {});
      });
    });

    // 4. Wire edit-code-btn
    container.querySelectorAll('.edit-code-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const box = btn.closest('.code-artifact-box');
        if (!box) return;
        
        const viewEl = box.querySelector('.code-content-view');
        const editEl = box.querySelector('.code-content-edit');
        const editFooter = box.querySelector('.code-edit-footer');
        const headerActions = box.querySelector('.code-artifact-actions');
        const copyBtn = box.querySelector('.copy-code-btn');

        if (viewEl && editEl && editFooter && headerActions && copyBtn) {
          editEl.value = copyBtn.dataset.code || '';
          viewEl.style.display = 'none';
          editEl.style.display = 'block';
          editFooter.style.display = 'flex';
          headerActions.style.visibility = 'hidden';
          editEl.focus();
        }
      });
    });

    // 5. Wire cancel-edit-btn
    container.querySelectorAll('.cancel-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const box = btn.closest('.code-artifact-box');
        if (!box) return;

        const viewEl = box.querySelector('.code-content-view');
        const editEl = box.querySelector('.code-content-edit');
        const editFooter = box.querySelector('.code-edit-footer');
        const headerActions = box.querySelector('.code-artifact-actions');

        if (viewEl && editEl && editFooter && headerActions) {
          viewEl.style.display = 'block';
          editEl.style.display = 'none';
          editFooter.style.display = 'none';
          headerActions.style.visibility = 'visible';
        }
      });
    });

    // 6. Wire save-edit-btn
    container.querySelectorAll('.save-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const box = btn.closest('.code-artifact-box');
        if (!box) return;

        const viewEl = box.querySelector('.code-content-view');
        const editEl = box.querySelector('.code-content-edit');
        const editFooter = box.querySelector('.code-edit-footer');
        const headerActions = box.querySelector('.code-artifact-actions');
        const copyBtn = box.querySelector('.copy-code-btn');

        if (viewEl && editEl && editFooter && headerActions && copyBtn) {
          const newCode = editEl.value;
          copyBtn.dataset.code = newCode;
          const escapedCode = newCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          viewEl.innerHTML = escapedCode;
          viewEl.style.display = 'block';
          editEl.style.display = 'none';
          editFooter.style.display = 'none';
          headerActions.style.visibility = 'visible';
        }
      });
    });

    // 7. Wire view-artifact-btn
    container.querySelectorAll('.view-artifact-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const box = btn.closest('.code-artifact-box');
        if (!box) return;
        const copyBtn = box.querySelector('.copy-code-btn');
        const code = copyBtn ? copyBtn.dataset.code : '';
        const lang = btn.dataset.lang || 'text';
        openArtifact(lang, code);
      });
    });
  }

  /**
   * Wire artifact buttons
   */
  document.getElementById('artifactCopyBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(artifactEditor.value).catch(() => {});
  });
  document.getElementById('artifactDownloadBtn')?.addEventListener('click', () => {
    const ext = { javascript: 'js', typescript: 'ts', python: 'py', html: 'html', css: 'css', json: 'json', xml: 'xml', markdown: 'md', bash: 'sh', shell: 'sh', sql: 'sql', rust: 'rs', go: 'go', java: 'java', cpp: 'cpp', c: 'c', ruby: 'rb', php: 'php' };
    const blob = new Blob([artifactEditor.value], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `code.${ext[currentArtifactLang] || 'txt'}`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  document.getElementById('artifactRunBtn')?.addEventListener('click', () => {
    if (currentArtifactLang === 'html') {
      artifactPreview.style.display = 'flex';
      artifactEditor.style.display = 'none';
      artifactPreviewFrame.srcdoc = artifactEditor.value;
    } else {
      artifactPreview.style.display = 'none';
      artifactEditor.style.display = '';
    }
  });

  // Update preview when editor changes (for HTML)
  artifactEditor?.addEventListener('input', () => {
    currentArtifactContent = artifactEditor.value;
  });


  /**
   * Complete LLM provider API call handler.
   * Supports: OpenAI, Anthropic, Google Gemini, xAI, Groq, DeepSeek, Mistral, Cohere, Meta (via OpenAI-compat),
   * Custom providers (OpenAI-compatible), and local servers (Ollama, LM Studio, vLLM, etc.)
   */
  let abortController = null;

  function showStopButton(show) {
    const stopBtn = document.getElementById('stopGenerationBtn');
    if (stopBtn) stopBtn.style.display = show ? 'flex' : 'none';
    const sendBtn = document.getElementById('btnSend');
    if (sendBtn) sendBtn.style.display = show ? 'none' : 'flex';
  }

  const _activeToolIndicators = {};
  const TOOL_LABELS = {
    web_search: 'Searching the web...',
    browser: 'Browsing...',
    terminal: 'Running command...',
    file: 'Working with files...',
    code_execution: 'Running code...',
    memory: 'Checking memory...',
    email: 'Composing email...',
    gmail: 'Reading Gmail...',
    drive: 'Fetching Drive...',
    calendar: 'Checking calendar...',
    contacts: 'Looking up contacts...',
    docs: 'Editing doc...',
    sheets: 'Editing spreadsheet...',
    slides: 'Editing presentation...',
    tts: 'Speaking...',
    vision: 'Analyzing image...',
    image: 'Generating image...',
    video: 'Processing video...',
    delegation: 'Delegating to subagent...',
    swarm: 'Coordinating agents...',
    cronjob: 'Managing schedule...',
    todo: 'Updating tasks...',
    session_search: 'Searching sessions...',
    skill: 'Using skill...',
  };
  function showToolIndicator(toolName) {
    // Disabled to remove streaming status indicators inside the chat input box
    return;
  }
  function hideToolIndicator(toolName) {
    const el = _activeToolIndicators[toolName];
    if (el) { el.remove(); delete _activeToolIndicators[toolName]; }
    const bar = document.getElementById('toolIndicatorBar');
    if (bar && Object.keys(_activeToolIndicators).length === 0) bar.style.display = 'none';
  }
  function clearAllToolIndicators() {
    Object.keys(_activeToolIndicators).forEach(hideToolIndicator);
  }

  async function callRealAPI(model, messages, onToken, signal, onReasoning, onToolUsage, skipAgent = false) {
    const settings = model.settings || {};
    const apiKey = settings.apiKey || '';
    const rawBaseUrl = settings.baseUrl || '';
    const baseUrl = normalizeBaseUrl(rawBaseUrl).replace(/\/$/, '');
    const modelEndpoint = settings.endpoint || model.endpoint || model.id || '';
    const provider = (model.provider || '').toLowerCase();

    const isZedPro = (model.provider || '') === 'Zed Pro';
    const apiMessages = [...messages];

    // ── Zed Pro: route through backend AIAgent with full tools + dashboard awareness ──
    if (isZedPro && !skipAgent) {
      const useStream = !!onToken;
      const dashboardState = {
        activeModel: modelsStore.getState().activeModel,
        models: (modelsStore.getState().models || []).map(m => ({
          name: m.name, provider: m.provider, status: m.status
        })),
        agents: (agentsStore?.agents || []).map(a => ({
          name: a.name, model: a.model, desc: a.desc, status: a.status
        })),
        schedules: (schedulesStore?.schedules || []).map(s => ({
          name: s.name, schedule: s.frequency, enabled: s.status === 'active'
        })),
        plugins: (pluginsStore?.installed || []).map(p => ({
          name: p.name || p.id, version: p.version || '', desc: p.desc || ''
        }))
      };
      const body = JSON.stringify({
        model: 'auto',
        messages: apiMessages,
        stream: useStream,
        dashboard_state: dashboardState
      });
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ detail: resp.statusText }));
        throw new Error(err.detail || `Zed Pro API error ${resp.status}`);
      }
      if (useStream && resp.body) {
        let full = '';
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === 'data: [DONE]') continue;
            if (trimmed.startsWith('data: ')) {
              let parsed = null;
              try {
                parsed = JSON.parse(trimmed.slice(6));
                if (parsed.error) {
                  throw new Error(parsed.error.message || JSON.stringify(parsed.error));
                }
                const delta = parsed.choices?.[0]?.delta?.content || '';
                const reasoningDelta = parsed.choices?.[0]?.delta?.reasoning_content || '';
                const toolUsage = parsed.choices?.[0]?.delta?.tool_usage;
                if (delta) { full += delta; onToken(delta); }
                if (reasoningDelta && typeof onReasoning === 'function') onReasoning(reasoningDelta);
                if (toolUsage && typeof onToolUsage === 'function') onToolUsage(toolUsage);
              } catch (e) {
                if (parsed && parsed.error) throw e;
              }
            }
          }
        }
        return full;
      }
      const data = await resp.json();
      return data.choices?.[0]?.message?.content || data.response || 'No response';
    }

    // ── Google Gemini ──────────────────────────────────────────────────────────
    if (provider === 'google' || baseUrl.includes('generativelanguage.googleapis.com')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your Gemini API key.`);
      }
      const geminiBase = baseUrl || 'https://generativelanguage.googleapis.com';
      const geminiModelId = modelEndpoint || model.id || 'gemini-1.5-pro';
      const url = `${geminiBase}/v1beta/models/${geminiModelId}:generateContent`;
      const geminiContents = apiMessages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({ contents: geminiContents })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `Gemini API error ${response.status}`);
      }
      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      throw new Error('Unexpected response from Gemini API');
    }

    // ── Anthropic ─────────────────────────────────────────────────────────────
    if (provider === 'anthropic' || baseUrl.includes('api.anthropic.com')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your Anthropic API key.`);
      }
      const anthropicBase = baseUrl || 'https://api.anthropic.com';
      const response = await fetch(`${anthropicBase}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'claude-3-5-sonnet-20241022',
          max_tokens: 2048,
          messages: apiMessages
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `Anthropic API error ${response.status}`);
      }
      const data = await response.json();
      return data.content?.[0]?.text || 'No response from Anthropic';
    }

    // ── Hugging Face ───────────────────────────────────────────────────────────
    if (provider === 'huggingface' || baseUrl.includes('api-inference.huggingface.co')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your HuggingFace token.`);
      }
      const hfBase = baseUrl || 'https://api-inference.huggingface.co';
      const url = `${hfBase}/models/${modelEndpoint || model.id || 'gpt2'}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: promptText })
      });
      if (!response.ok) throw new Error(`Hugging Face API error ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text;
      return JSON.stringify(data);
    }

    // ── Mistral AI ─────────────────────────────────────────────────────────────
    if (provider === 'mistral ai' || provider === 'mistral' || baseUrl.includes('api.mistral.ai')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your Mistral API key.`);
      }
      const mistralBase = baseUrl || 'https://api.mistral.ai/v1';
      const response = await fetch(`${mistralBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'mistral-large-latest',
          messages: apiMessages,
          max_tokens: 2048
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Mistral API error ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response from Mistral';
    }

    // ── Cohere ─────────────────────────────────────────────────────────────────
    if (provider === 'cohere' || baseUrl.includes('api.cohere.')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your Cohere API key.`);
      }
      const cohereBase = baseUrl || 'https://api.cohere.com/v1';
      const response = await fetch(`${cohereBase}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'command-r-plus',
          message: promptText,
          max_tokens: 2048
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Cohere API error ${response.status}`);
      }
      const data = await response.json();
      return data.text || data.chat_history?.[data.chat_history.length - 1]?.message || 'No response from Cohere';
    }

    // ── xAI Grok ──────────────────────────────────────────────────────────────
    if (provider === 'xai' || baseUrl.includes('api.x.ai')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your xAI API key.`);
      }
      const xaiBase = baseUrl || 'https://api.x.ai/v1';
      const response = await fetch(`${xaiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'grok-2',
          messages: apiMessages,
          max_tokens: 2048
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `xAI API error ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response from xAI';
    }

    // ── Groq ──────────────────────────────────────────────────────────────────
    if (provider === 'groq' || provider === 'groqcloud' || baseUrl.includes('api.groq.com')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your Groq API key.`);
      }
      const groqBase = baseUrl || 'https://api.groq.com/openai/v1';
      const response = await fetch(`${groqBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'llama3-70b-8192',
          messages: apiMessages,
          max_tokens: 2048
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `Groq API error ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response from Groq';
    }

    // ── DeepSeek ──────────────────────────────────────────────────────────────
    if (provider === 'deepseek' || baseUrl.includes('api.deepseek.com')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your DeepSeek API key.`);
      }
      const deepseekBase = baseUrl || 'https://api.deepseek.com/v1';
      const response = await fetch(`${deepseekBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'deepseek-chat',
          messages: apiMessages,
          max_tokens: 2048
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `DeepSeek API error ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response from DeepSeek';
    }

    // ── OpenAI ────────────────────────────────────────────────────────────────
    if (provider === 'openai' || baseUrl.includes('api.openai.com')) {
      if (isMaskedKey(apiKey)) {
        throw new Error(`No API key set for "${model.name}". Go to Models → Connect to add your OpenAI API key.`);
      }
      const openaiBase = baseUrl || 'https://api.openai.com/v1';
      const response = await fetch(`${openaiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'gpt-4o',
          messages: apiMessages,
          max_tokens: 2048
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenAI API error ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response received.';
    }

    // ── Meta (via OpenRouter or custom) ───────────────────────────────────────
    if (provider === 'meta') {
      if (!baseUrl) {
        throw new Error(`No Base URL configured for "${model.name}". Go to Models → Connect to set the endpoint (e.g., OpenRouter or a local Llama server).`);
      }
      const headers = { 'Content-Type': 'application/json' };
      if (!isMaskedKey(apiKey)) headers['Authorization'] = `Bearer ${apiKey}`;
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: modelEndpoint || model.id || 'llama-3.1-70b',
          messages: apiMessages,
          max_tokens: 2048
        })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response received.';
    }

    // ── Custom / OpenAI-compatible / Local (Ollama, LM Studio, vLLM, etc.) ───
    if (!baseUrl) {
      throw new Error(`No Base URL configured for "${model.name}". Go to Models → Connect to enter the API endpoint URL.`);
    }

    const isLocalServer = /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(baseUrl);
    const headers = { 'Content-Type': 'application/json' };
    // Only add Authorization header if we have a real (non-masked) API key
    if (!isMaskedKey(apiKey) && apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // Determine model ID: use endpoint setting, then model.id, then model.name
    const modelId = modelEndpoint || model.id || model.name;

    // Try /chat/completions first (OpenAI-compatible format used by Ollama, LM Studio, vLLM)
    try {
      const timeoutId = setTimeout(() => signal?.aborted || signal?.abort(), 30000);
      const useStream = !!onToken;
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: modelId,
          messages: apiMessages,
          max_tokens: 4096,
          stream: useStream
        }),
        signal: signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        if (useStream && response.body) {
          let full = '';
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed === 'data: [DONE]') continue;
              if (trimmed.startsWith('data: ')) {
                try {
                  const parsed = JSON.parse(trimmed.slice(6));
                  const delta = parsed.choices?.[0]?.delta?.content || parsed.choices?.[0]?.text || '';
                  const reasoningDelta = parsed.choices?.[0]?.delta?.reasoning_content || parsed.choices?.[0]?.delta?.reasoning || '';
                  if (delta) {
                    full += delta;
                    onToken(delta);
                  }
                  if (reasoningDelta && typeof onReasoning === 'function') {
                    onReasoning(reasoningDelta);
                  }
                } catch {}
              }
            }
          }
          return full;
        }
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return content;
        // Some servers wrap differently
        if (data.message?.content) return data.message.content;
      } else if (response.status === 404) {
        // Might not support /chat/completions — try /api/generate (Ollama native)
        throw new Error('try_generate');
      } else {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${response.status}`);
      }
    } catch (firstErr) {
      if (firstErr.message === 'try_generate') {
        // Ollama native API: POST /api/generate
        try {
          const ollamaBase = baseUrl.replace(/\/v1$/, '');
          const resp = await fetch(`${ollamaBase}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: modelId, prompt: promptText, stream: false })
          });
          if (resp.ok) {
            const d = await resp.json();
            return d.response || 'No response from server';
          }
          // Ollama /api/chat
          const resp2 = await fetch(`${ollamaBase}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: modelId,
              messages: apiMessages,
              stream: false
            })
          });
          if (resp2.ok) {
            const d2 = await resp2.json();
            return d2.message?.content || 'No response from Ollama';
          }
          throw new Error(`Server responded with ${resp2.status}`);
        } catch (ollamaErr) {
          throw new Error(isLocalServer
            ? `Cannot reach local server at ${baseUrl}. Make sure it is running and CORS is enabled.`
            : ollamaErr.message
          );
        }
      }
      // Network error for local servers — give helpful message
      if (firstErr.message === 'Failed to fetch' || firstErr.name === 'TypeError') {
        throw new Error(isLocalServer
          ? `Cannot reach local server at ${baseUrl}. Is it running? Try: http://localhost:11434/v1 for Ollama or http://localhost:1234/v1 for LM Studio.`
          : `Network error reaching ${baseUrl}. Check the URL and CORS settings.`
        );
      }
      throw firstErr;
    }

    return 'No response received.';
  }

  function executeDashboardActions(text) {
    const lower = text.toLowerCase();
    const results = [];

    // ── Create Agent ──────────────────────────────────────────────
    const agentMatch = lower.match(/(?:create|make|add)\s+(?:an?\s+)?agent\s+(?:called\s+|named\s+|for\s+)?(.+)/i);
    if (agentMatch) {
      const desc = agentMatch[1].trim();
      const name = desc.length > 30 ? desc.slice(0, 30) + '...' : desc.charAt(0).toUpperCase() + desc.slice(1);
      const avatarKeys = ['security', 'research', 'coder', 'finance', 'social', 'assistant'];
      const agent = agentsStore.addAgent({
        name: 'Agent: ' + name,
        desc: desc,
        avatar: avatarKeys[Math.floor(Math.random() * avatarKeys.length)]
      });
      results.push(`Created agent "${agent.name}": ${agent.desc}`);
    }

    // ── Create Schedule ────────────────────────────────────────────
    const schedMatch = lower.match(/(?:create|make|add|schedule)\s+(?:a\s+)?schedule\s+(?:called\s+|named\s+|for\s+)?(.+?)(?:\s+(daily|weekly|hourly))?(?:\s+at\s+(\d[\d:]*\s*(?:AM|PM|am|pm)?))?$/i);
    if (schedMatch) {
      const schedName = schedMatch[1].trim();
      const freq = schedMatch[2] || 'daily';
      const time = schedMatch[3] || '9:00 AM';
      const roles = ['Research Analyst', 'Competitor Watcher', 'Social Media Manager', 'Content Writer', 'Backup Manager'];
      const role = roles[Math.floor(Math.random() * roles.length)];
      schedulesStore.addSchedule(schedName, role, time, freq);
      results.push(`Created schedule "${schedName}" (${freq} at ${time}, role: ${role})`);
    }

    // ── Install Plugin ─────────────────────────────────────────────
    const pluginMatch = lower.match(/(?:install|connect|add)\s+(?:the\s+)?(?:plugin\s+)?(.+)/i);
    if (pluginMatch && !agentMatch && !schedMatch) {
      const pluginName = pluginMatch[1].trim();
      const popular = pluginsStore.popular.find(p => p.name.toLowerCase() === pluginName.toLowerCase());
      if (popular) {
        pluginsStore.install(popular.id);
        results.push(`Installed plugin "${popular.name}"`);
      } else {
        const plugin = pluginsStore.addPlugin({ name: pluginName, desc: `Custom ${pluginName} plugin.` });
        results.push(`Added plugin "${plugin.name}"`);
      }
    }

    return results;
  }

  // ── Google Connect-in-Chat (agentic: model decides) ───────────────────────
  const _PLUGIN_ALIASES = {
    'google-fitness': 'google-fit',
    fitness: 'google-fit',
    googledrive: 'google-drive',
    gcalendar: 'calendar',
    gdoc: 'google-docs',
    gsheet: 'google-sheets',
    gslide: 'google-slides',
    gtask: 'google-tasks',
    gcontact: 'google-contacts',
    gphoto: 'google-photos',
    gchat: 'google-chat',
    gmeet: 'google-meet',
    gclass: 'google-classroom',
  };
  function _resolvePluginId(id) {
    const lower = id.toLowerCase().replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    if (_PLUGIN_ALIASES[lower]) return _PLUGIN_ALIASES[lower];
    if (_PLUGIN_ALIASES[lower.replace(/-/g, '')]) return _PLUGIN_ALIASES[lower.replace(/-/g, '')];
    return lower;
  }
  function _getPluginInfo(pluginId) {
    const resolved = _resolvePluginId(pluginId);
    if (typeof pluginsStore !== 'undefined' && pluginsStore.popular) {
      const found = pluginsStore.popular.find(p => p.id === resolved);
      if (found) return found;
    }
    const fallback = {
      gmail: { id: 'gmail', name: 'Gmail', desc: 'Read, send, and manage emails.', logo: 'assets/plugins/gmail.svg' },
      'google-drive': { id: 'google-drive', name: 'Google Drive', desc: 'Access and manage files in Drive.', logo: 'assets/plugins/google-drive.svg' },
      calendar: { id: 'calendar', name: 'Google Calendar', desc: 'View and manage schedules.', logo: 'assets/plugins/calendar.svg' },
      'google-tasks': { id: 'google-tasks', name: 'Google Tasks', desc: 'Create, edit, and manage your tasks.', logo: 'assets/plugins/google-tasks.png' },
      'google-contacts': { id: 'google-contacts', name: 'Google Contacts', desc: 'Access, organize, and manage your contacts.', logo: 'assets/plugins/google-contacts.png' },
      'google-photos': { id: 'google-photos', name: 'Google Photos', desc: 'Access, organize, and back up your photos.', logo: 'assets/plugins/google-photos.png' },
      youtube: { id: 'youtube', name: 'YouTube', desc: 'Manage videos, playlists, and channel activity.', logo: 'assets/plugins/youtube.png' },
      'google-docs': { id: 'google-docs', name: 'Google Docs', desc: 'Create, edit, and collaborate on documents.', logo: 'assets/plugins/google-docs.png' },
      'google-sheets': { id: 'google-sheets', name: 'Google Sheets', desc: 'Create, edit, and collaborate on spreadsheets.', logo: 'assets/plugins/google-sheets.png' },
      'google-slides': { id: 'google-slides', name: 'Google Slides', desc: 'Create, edit, and present presentations.', logo: 'assets/plugins/google-slides.png' },
      'google-chat': { id: 'google-chat', name: 'Google Chat', desc: 'Send messages and collaborate.', logo: 'assets/plugins/google-chat.png' },
      'google-meet': { id: 'google-meet', name: 'Google Meet', desc: 'Start, schedule, and join video meetings.', logo: 'assets/plugins/google-meet.png' },
      'google-fit': { id: 'google-fit', name: 'Google Fitness', desc: 'Track and sync fitness data.', logo: 'assets/plugins/google-fit.png' },
      'google-classroom': { id: 'google-classroom', name: 'Google Classroom', desc: 'Manage classes and assignments.', logo: 'assets/plugins/google-classroom.png' },
    };
    return fallback[resolved] || { id: resolved, name: resolved.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), desc: 'Connect to access your data', logo: '' };
  }
  // Detect [CONNECT:plugin_id] in model text, return card HTML
  function _renderConnectCardIfNeeded(text, queryText) {
    const match = text.match(/\[CONNECT:([a-z0-9_-]+)\]/i);
    if (!match) return null;
    const pluginId = _resolvePluginId(match[1]);
    const userId = localStorage.getItem('zed_user_id') || '';
    const info = _getPluginInfo(pluginId);
    const redirectTarget = window.location.origin + '/';
    // Wire button after DOM injection
    setTimeout(() => {
      const card = chatMessagesLog?.lastElementChild;
      if (!card) return;
      const btn = card.querySelector('.google-connect-btn');
      if (!btn) return;
      btn.addEventListener('click', () => {
        sessionStorage.setItem('pendingQuery', queryText);
        sessionStorage.setItem('pendingUserId', userId);
        window.location.href = `/oauth/google/connect?user_id=${encodeURIComponent(userId)}&plugin_id=${encodeURIComponent(pluginId)}&redirect_to=${encodeURIComponent(redirectTarget)}`;
      });
      const bubble = card.querySelector('.chat-message-bubble');
      if (bubble) {
        const dismissBtn = document.createElement('button');
        dismissBtn.className = 'google-connect-dismiss';
        dismissBtn.textContent = 'Skip';
        dismissBtn.addEventListener('click', () => { card.remove(); });
        bubble.appendChild(dismissBtn);
      }
    }, 0);
    return `
      <div class="google-connect-card">
        <div class="google-connect-card-inner">
          <div class="google-connect-card-left">
            ${info.logo ? `<img class="google-connect-logo" src="${info.logo}" alt="${info.name}">` : ''}
            <div class="google-connect-info">
              <h4 class="google-connect-name">${info.name}</h4>
              <p class="google-connect-desc">${info.desc || 'Connect to access your data'}</p>
            </div>
          </div>
          <button class="google-connect-btn" data-plugin="${pluginId}" data-redirect="${redirectTarget}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="flex-shrink:0;">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Connect
          </button>
        </div>
      </div>
    `;
  }
  // Check for pending query from OAuth redirect (user just connected a service)
  (function _checkPendingQuery() {
    const pending = sessionStorage.getItem('pendingQuery');
    if (pending) {
      sessionStorage.removeItem('pendingQuery');
      const uid = sessionStorage.getItem('pendingUserId');
      sessionStorage.removeItem('pendingUserId');
      // Small delay to let app initialize, then re-submit
      setTimeout(() => {
        if (uid) localStorage.setItem('zed_user_id', uid);
        handleChatSubmission(pending);
      }, 500);
    }
  })();

  let currentSwarmAgents = [];
  let viewedAgentIdx = 0;
  let agentLogIntervals = [];

  function getProgressDotsHtml(dotsCount, status) {
    let dotsHtml = '';
    const totalDots = 10;
    for (let i = 0; i < totalDots; i++) {
      if (i < dotsCount) {
        dotsHtml += `<span class="progress-dot done" style="width: 5px; height: 5px; border-radius: 50%; background: #10B981; transition: background 0.3s; flex-shrink: 0;"></span>`;
      } else if (i === dotsCount && status === 'running') {
        dotsHtml += `<span class="progress-dot active" style="width: 5px; height: 5px; border-radius: 50%; background: #3B82F6; animation: subagent-pulse 1s infinite; flex-shrink: 0;"></span>`;
      } else {
        dotsHtml += `<span class="progress-dot pending" style="width: 5px; height: 5px; border-radius: 50%; background: #E5E7EB; flex-shrink: 0;"></span>`;
      }
    }
    return `
      <style>
        @keyframes subagent-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      </style>
      <div class="progress-dot-grid" style="display: grid; grid-template-columns: repeat(5, 5px); gap: 3px; align-items: center; justify-content: center; flex-shrink: 0;">
        ${dotsHtml}
      </div>
    `;
  }

  function createSwarmSubagentsCardContainer() {
    const container = document.createElement('div');
    container.className = 'swarm-subagents-card';
    container.style.cssText = `
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      background: #FFFFFF;
      overflow: hidden;
      margin: 12px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      position: relative;
      width: 100%;
    `;
    const listContainer = document.createElement('div');
    listContainer.className = 'swarm-subagents-scroll';
    listContainer.style.cssText = `
      max-height: 280px;
      overflow-y: auto;
    `;
    container.appendChild(listContainer);
    return container;
  }

  function addCreationRow(listCard, agent, totalAgents) {
    const listContainer = listCard.querySelector('.swarm-subagents-scroll');
    if (!listContainer) return;

    const row = document.createElement('div');
    row.id = `swarm-list-row-${agent.idx}`;
    row.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid #F3F4F6;
      font-size: 13px;
      color: #374151;
      transition: background 0.2s, opacity 0.3s ease, transform 0.3s ease;
      cursor: pointer;
      opacity: 0;
      transform: translateY(5px);
    `;
    row.addEventListener('mouseenter', () => { row.style.background = '#F9FAFB'; });
    row.addEventListener('mouseleave', () => { row.style.background = 'transparent'; });
    row.addEventListener('click', () => { showAgentDetails(agent.idx); });

    const left = document.createElement('div');
    left.style.cssText = 'display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;';

    const profileCircle = document.createElement('span');
    profileCircle.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid #D1D5DB;
      background: #F9FAFB;
      color: #6B7280;
      flex-shrink: 0;
    `;
    profileCircle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    `;
    left.appendChild(profileCircle);

    const label = document.createElement('span');
    label.textContent = 'Create Subagent';
    label.style.cssText = 'color: #9CA3AF; font-size: 12px; flex-shrink: 0;';
    left.appendChild(label);

    const sep = document.createElement('span');
    sep.textContent = '|';
    sep.style.cssText = 'color: #D1D5DB; font-size: 12px; flex-shrink: 0;';
    left.appendChild(sep);

    const statusWrap = document.createElement('span');
    statusWrap.id = `swarm-row-status-${agent.idx}`;
    statusWrap.style.cssText = 'display: inline-flex; align-items: center; gap: 6px; min-width: 0;';
    statusWrap.innerHTML = `
      <svg id="swarm-row-spinner-${agent.idx}" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2.5" stroke-linecap="round" style="animation: subagent-spin 1s linear infinite; flex-shrink: 0;">
        <circle cx="12" cy="12" r="10" stroke-dasharray="4 4"/>
      </svg>
      <span style="font-size: 13px; color: #374151; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${agent.name}</span>
    `;
    left.appendChild(statusWrap);
    row.appendChild(left);

    const right = document.createElement('span');
    right.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
    right.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; margin-left: 6px;';
    row.appendChild(right);

    listContainer.appendChild(row);

    row.offsetHeight;
    row.style.opacity = '1';
    row.style.transform = 'translateY(0)';

    const rows = listContainer.children;
    for (let i = 0; i < rows.length; i++) {
      rows[i].style.borderBottom = i === rows.length - 1 ? 'none' : '1px solid #F3F4F6';
    }
  }

  function createSwarmActiveCardContainer(totalAgents) {
    const card = document.createElement('div');
    card.id = 'swarmActiveCard';
    card.style.cssText = `
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      background: #FFFFFF;
      overflow: hidden;
      margin: 12px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      width: 100%;
      font-family: 'Inter', sans-serif;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-bottom: 1px solid #F3F4F6;
      background: #FAFAFA;
      user-select: none;
    `;
    header.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
      </svg>
      <span style="font-size: 12.5px; font-weight: 600; color: #111827;">Agent Swarm</span>
      <span style="font-size: 11.5px; color: #6B7280; font-weight: 500;">${totalAgents} Tasks</span>
    `;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'swarm-active-body';
    card.appendChild(body);

    return card;
  }

  function addActiveSwarmRow(swarmCard, agent, totalAgents) {
    const body = swarmCard.querySelector('.swarm-active-body');
    if (!body) return;

    const row = document.createElement('div');
    row.id = `swarm-active-row-${agent.idx}`;
    row.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px solid #F3F4F6;
      cursor: pointer;
      transition: background 0.15s, opacity 0.3s ease, transform 0.3s ease;
      opacity: 0;
      transform: translateY(5px);
    `;
    row.addEventListener('mouseenter', () => {
      if (viewedAgentIdx !== agent.idx) row.style.background = '#F9FAFB';
    });
    row.addEventListener('mouseleave', () => {
      if (viewedAgentIdx !== agent.idx) row.style.background = 'transparent';
    });
    row.addEventListener('click', () => {
      showAgentDetails(agent.idx);
    });

    const leftCol = document.createElement('div');
    leftCol.style.cssText = 'display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;';

    const avatar = document.createElement('div');
    avatar.style.cssText = `
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1.5px solid #D1D5DB;
      background: #F3F4F6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #4B5563;
      font-size: 11px;
    `;
    avatar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    leftCol.appendChild(avatar);

    const labelWrap = document.createElement('div');
    labelWrap.style.cssText = 'display: flex; flex-direction: column; min-width: 0;';
    labelWrap.innerHTML = `
      <span style="font-size: 12.5px; font-weight: 600; color: #111827; line-height: 1.2;">${agent.name}</span>
      <span style="font-size: 11.5px; color: #6B7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px;">└ ${agent.task}</span>
    `;
    leftCol.appendChild(labelWrap);
    row.appendChild(leftCol);

    const rightCol = document.createElement('div');
    rightCol.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0;';

    const viewLabel = document.createElement('span');
    viewLabel.id = `swarm-viewing-label-${agent.idx}`;
    viewLabel.style.cssText = 'font-size: 11.5px; font-weight: 500; color: #6B7280;';
    viewLabel.innerHTML = agent.idx === viewedAgentIdx ? `<span style="font-weight:700; color:#3B82F6;">Viewing</span> ${agent.idStr}` : agent.idStr;
    rightCol.appendChild(viewLabel);

    const dotsDiv = document.createElement('div');
    dotsDiv.id = `swarm-row-dots-${agent.idx}`;
    dotsDiv.innerHTML = getProgressDotsHtml(agent.dotsCount, agent.status);
    rightCol.appendChild(dotsDiv);

    row.appendChild(rightCol);
    body.appendChild(row);

    row.offsetHeight;
    row.style.opacity = '1';
    row.style.transform = 'translateY(0)';

    const rows = body.children;
    for (let i = 0; i < rows.length; i++) {
      rows[i].style.borderBottom = i === rows.length - 1 ? 'none' : '1px solid #F3F4F6';
    }
  }

  function createActivityRowHtml(activity) {
    let iconHtml = '';
    if (activity.type === 'think') {
      iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>`;
    } else if (activity.type === 'search') {
      iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    } else if (activity.type === 'terminal') {
      iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;
    } else if (activity.type === 'browse') {
      iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    } else if (activity.type === 'write') {
      iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>`;
    } else if (activity.type === 'success') {
      iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><circle cx="12" cy="12" r="10" fill="#E6F4EA"/><path d="M9 12l2 2 4-4"/></svg>`;
    } else if (activity.type === 'failed') {
      iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    }

    const row = document.createElement('div');
    row.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid #F3F4F6;
      font-size: 13px;
      color: #374151;
      cursor: ${activity.type === 'success' || activity.type === 'failed' ? 'pointer' : 'default'};
      transition: background 0.15s;
    `;
    if (activity.type === 'success' || activity.type === 'failed') {
      row.addEventListener('mouseenter', () => { row.style.background = '#F9FAFB'; });
      row.addEventListener('mouseleave', () => { row.style.background = 'transparent'; });
    }

    const left = document.createElement('div');
    left.style.cssText = 'display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;';

    const iconSpan = document.createElement('span');
    iconSpan.style.cssText = 'display: inline-flex; align-items: center; flex-shrink: 0;';
    iconSpan.innerHTML = iconHtml;
    left.appendChild(iconSpan);

    const text = document.createElement('span');
    text.textContent = activity.label;
    text.style.cssText = 'white-space: pre-wrap; word-break: break-word; font-weight: 500; color: #374151; line-height: 1.4;';
    left.appendChild(text);

    row.appendChild(left);

    const right = document.createElement('div');
    right.style.cssText = 'display: flex; align-items: center; gap: 6px; flex-shrink: 0;';

    if (activity.count) {
      const countSpan = document.createElement('span');
      countSpan.textContent = activity.count;
      countSpan.style.cssText = 'font-size: 11px; color: #9CA3AF; font-weight: 500; margin-right: 6px;';
      right.appendChild(countSpan);
    }

    if (activity.type === 'success' || activity.type === 'failed') {
      const chevron = document.createElement('span');
      chevron.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
      chevron.style.cssText = 'display: flex; align-items: center; transition: transform 0.2s;';
      right.appendChild(chevron);
    }

    row.appendChild(right);

    if (activity.type === 'success' || activity.type === 'failed') {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display: flex; flex-direction: column; width: 100%; border-bottom: 1px solid #F3F4F6;';
      row.style.borderBottom = 'none';
      wrapper.appendChild(row);

      const content = document.createElement('div');
      content.style.cssText = `
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.25s ease-out, padding 0.25s ease-out;
        background: #FAFAFA;
        font-family: 'Inter', sans-serif;
        font-size: 12.5px;
        color: #4B5563;
        line-height: 1.5;
        padding: 0 16px;
      `;
      const inner = document.createElement('div');
      inner.style.padding = '12px 0';
      inner.innerHTML = activity.contentHtml || '';
      content.appendChild(inner);
      wrapper.appendChild(content);

      let isOpen = false;
      row.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
          content.style.maxHeight = '500px';
          content.style.padding = '0 16px 12px 16px';
          chevron.style.transform = 'rotate(90deg)';
        } else {
          content.style.maxHeight = '0px';
          content.style.padding = '0 16px';
          chevron.style.transform = 'rotate(0deg)';
        }
      });

      return wrapper;
    }

    return row;
  }

  function renderAgentDetailsSwitcher(container) {
    let switcher = container.querySelector('.agent-details-switcher');
    if (!switcher) {
      switcher = document.createElement('div');
      switcher.className = 'agent-details-switcher';
      switcher.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-top: 1px solid #E5E7EB;
        background: #FAFAFA;
        flex-shrink: 0;
        overflow-x: auto;
        width: 100%;
        box-sizing: border-box;
      `;
      container.appendChild(switcher);
    }
    switcher.innerHTML = '';

    currentSwarmAgents.forEach((agent) => {
      const isActive = agent.idx === viewedAgentIdx;
      const btn = document.createElement('div');
      btn.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 100px;
        max-width: 120px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid ${isActive ? '#3B82F6' : '#E5E7EB'};
        background: #FFFFFF;
        box-shadow: ${isActive ? '0 1px 2px rgba(59, 130, 246, 0.05), 0 0 0 2px rgba(59, 130, 246, 0.1)' : '0 1px 2px rgba(0,0,0,0.02)'};
        cursor: pointer;
        transition: all 0.15s ease;
        flex-shrink: 0;
        user-select: none;
      `;
      btn.addEventListener('click', () => {
        showAgentDetails(agent.idx);
      });

      // Top Row: Circular Avatar and Number
      const topRow = document.createElement('div');
      topRow.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 6px;
      `;

      const avatarCircle = document.createElement('div');
      avatarCircle.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1px solid ${isActive ? '#3B82F6' : '#D1D5DB'};
        background: #F9FAFB;
        flex-shrink: 0;
      `;
      avatarCircle.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${isActive ? '#3B82F6' : '#4B5563'}" stroke-width="2.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      topRow.appendChild(avatarCircle);

      const numLabel = document.createElement('span');
      numLabel.textContent = agent.idStr;
      numLabel.style.cssText = `
        font-size: 12px;
        font-weight: 700;
        color: ${isActive ? '#3B82F6' : '#374151'};
      `;
      topRow.appendChild(numLabel);
      btn.appendChild(topRow);

      // Bottom Row: Dynamic Status label
      let statusLabelText = 'Pending';
      if (agent.status === 'done') {
        statusLabelText = 'Complete';
      } else if (agent.status === 'failed') {
        statusLabelText = 'Failed';
      } else if (agent.status === 'running') {
        if (agent.activities && agent.activities.length > 0) {
          const lastAct = agent.activities[agent.activities.length - 1];
          if (lastAct.type === 'think') statusLabelText = 'Thinking';
          else if (lastAct.type === 'search') statusLabelText = 'Searching';
          else if (lastAct.type === 'browse') statusLabelText = 'Browsing';
          else if (lastAct.type === 'terminal') statusLabelText = 'Executing';
          else if (lastAct.type === 'write') statusLabelText = 'Writing';
          else statusLabelText = 'Advancing';
        } else {
          statusLabelText = 'Advancing';
        }
      }

      const statusLabel = document.createElement('span');
      statusLabel.textContent = statusLabelText;
      statusLabel.style.cssText = `
        font-size: 11px;
        font-weight: 600;
        color: ${isActive ? '#2563EB' : '#6B7280'};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        width: 100%;
      `;
      btn.appendChild(statusLabel);

      switcher.appendChild(btn);
    });
  }

  function createSwarmActiveCard(agents) {
    const card = document.createElement('div');
    card.id = 'swarmActiveCard';
    card.style.cssText = `
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      background: #FFFFFF;
      overflow: hidden;
      margin: 12px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      width: 100%;
      font-family: 'Inter', sans-serif;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-bottom: 1px solid #F3F4F6;
      background: #FAFAFA;
      user-select: none;
    `;
    header.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
      </svg>
      <span style="font-size: 12.5px; font-weight: 600; color: #111827;">Agent Swarm</span>
      <span style="font-size: 11.5px; color: #6B7280; font-weight: 500;">${agents.length} Tasks</span>
    `;
    card.appendChild(header);

    agents.forEach((agent) => {
      const row = document.createElement('div');
      row.id = `swarm-active-row-${agent.idx}`;
      row.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border-bottom: ${agent.idx === agents.length - 1 ? 'none' : '1px solid #F3F4F6'};
        cursor: pointer;
        transition: background 0.15s;
      `;
      row.addEventListener('mouseenter', () => {
        if (viewedAgentIdx !== agent.idx) row.style.background = '#F9FAFB';
      });
      row.addEventListener('mouseleave', () => {
        if (viewedAgentIdx !== agent.idx) row.style.background = 'transparent';
      });
      row.addEventListener('click', () => {
        showAgentDetails(agent.idx);
      });

      const leftCol = document.createElement('div');
      leftCol.style.cssText = 'display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;';

      const avatar = document.createElement('div');
      avatar.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1.5px solid #D1D5DB;
        background: #F3F4F6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: #4B5563;
        font-size: 11px;
      `;
      avatar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      leftCol.appendChild(avatar);

      const labelWrap = document.createElement('div');
      labelWrap.style.cssText = 'display: flex; flex-direction: column; min-width: 0;';
      labelWrap.innerHTML = `
        <span style="font-size: 12.5px; font-weight: 600; color: #111827; line-height: 1.2;">${agent.name}</span>
        <span style="font-size: 11.5px; color: #6B7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px;">└ ${agent.task}</span>
      `;
      leftCol.appendChild(labelWrap);
      row.appendChild(leftCol);

      const rightCol = document.createElement('div');
      rightCol.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0;';
      
      const viewLabel = document.createElement('span');
      viewLabel.id = `swarm-viewing-label-${agent.idx}`;
      viewLabel.style.cssText = 'font-size: 11.5px; font-weight: 500; color: #6B7280;';
      viewLabel.innerHTML = agent.idx === viewedAgentIdx ? `<span style="font-weight:700; color:#3B82F6;">Viewing</span> ${agent.idStr}` : agent.idStr;
      rightCol.appendChild(viewLabel);

      const dotsDiv = document.createElement('div');
      dotsDiv.id = `swarm-row-dots-${agent.idx}`;
      dotsDiv.innerHTML = getProgressDotsHtml(agent.dotsCount, agent.status);
      rightCol.appendChild(dotsDiv);

      row.appendChild(rightCol);
      card.appendChild(row);
    });

    return card;
  }

  function showAgentDetails(idx) {
    viewedAgentIdx = idx;
    toggleAgentSplit(true);
    
    const overview = document.getElementById('agentPaneOverview');
    const details = document.getElementById('agentPaneDetailsView');
    if (overview) overview.style.display = 'none';
    if (details) details.style.display = 'flex';
    
    // Hide the legacy back button and the agent profile/task header
    const backBtn = document.getElementById('agentPaneBackBtn');
    if (backBtn) backBtn.style.display = 'none';
    const detailHeader = document.getElementById('agentDetailHeader');
    if (detailHeader) detailHeader.style.display = 'none';
    
    const agent = currentSwarmAgents[idx];
    if (!agent) return;
    
    const avatarEl = document.getElementById('agentDetailAvatar');
    if (avatarEl) avatarEl.innerHTML = agent.avatarHtml || '🤖';
    
    const nameEl = document.getElementById('agentDetailName');
    if (nameEl) nameEl.textContent = agent.name;
    
    const roleEl = document.getElementById('agentDetailRole');
    if (roleEl) roleEl.textContent = agent.role;
    
    const taskEl = document.getElementById('agentDetailTask');
    if (taskEl) taskEl.textContent = `Task: ${agent.task}`;
    
    updateTerminalDisplay(idx);
    updateSwarmCardViewingLabels();
  }

  function updateTerminalDisplay(idx) {
    const terminal = document.getElementById('agentDetailTerminal');
    if (!terminal) return;
    terminal.innerHTML = '';
    terminal.style.padding = '0'; // align rows to edges
    
    const agent = currentSwarmAgents[idx];
    if (!agent) return;

    // Render Clean bold Agent Title at top of activity logs
    const heading = document.createElement('div');
    heading.textContent = `Agent ${agent.idStr}`;
    heading.style.cssText = `
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      padding: 20px 16px 12px 16px;
    `;
    terminal.appendChild(heading);
    
    agent.activities.forEach((act) => {
      terminal.appendChild(createActivityRowHtml(act));
    });
    
    if (agent.status === 'done' && agent.result) {
      const successAct = {
        type: 'success',
        label: 'SUCCESS  Task complete. Output returned.',
        contentHtml: `<div style="font-family: monospace; font-size:12.5px; white-space:pre-wrap; background:#FFFFFF; border: 1px solid #E5E7EB; padding:10px; border-radius:6px; max-height: 300px; overflow-y:auto;">\${agent.result}</div>`
      };
      terminal.appendChild(createActivityRowHtml(successAct));
    } else if (agent.status === 'failed' && agent.result) {
      const failAct = {
        type: 'failed',
        label: 'ERROR  Task execution failed.',
        contentHtml: `<div style="color:#EF4444; font-family: monospace; font-size:12.5px; white-space:pre-wrap; background:#FEE2E2; border: 1px solid #FCA5A5; padding:10px; border-radius:6px;">\${agent.result}</div>`
      };
      terminal.appendChild(createActivityRowHtml(failAct));
    }

    // Append Clean Back to latest button at the bottom of the log container
    const backLatestBtn = document.createElement('div');
    backLatestBtn.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin: 24px auto;
      padding: 8px 16px;
      border: 1px solid #D1D5DB;
      border-radius: 8px;
      background: #FFFFFF;
      color: #374151;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      width: fit-content;
      transition: background 0.15s;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      user-select: none;
    `;
    backLatestBtn.innerHTML = `
      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="margin-right: 2px;"><path d="M8 5v14l11-7z"/></svg>
      <span>Back to latest</span>
    `;
    backLatestBtn.addEventListener('mouseenter', () => { backLatestBtn.style.background = '#F9FAFB'; });
    backLatestBtn.addEventListener('mouseleave', () => { backLatestBtn.style.background = '#FFFFFF'; });
    backLatestBtn.addEventListener('click', () => {
      // Close detail view, go back to overview tab
      const overview = document.getElementById('agentPaneOverview');
      const details = document.getElementById('agentPaneDetailsView');
      if (overview) overview.style.display = 'flex';
      if (details) details.style.display = 'none';
    });
    terminal.appendChild(backLatestBtn);
    
    terminal.scrollTop = terminal.scrollHeight;
    
    const detailsView = document.getElementById('agentPaneDetailsView');
    if (detailsView) {
      renderAgentDetailsSwitcher(detailsView);
    }
  }

  function updateSwarmCardViewingLabels() {
    currentSwarmAgents.forEach((agent) => {
      const label = document.getElementById(`swarm-viewing-label-${agent.idx}`);
      if (label) {
        if (agent.idx === viewedAgentIdx) {
          label.innerHTML = `<span style="font-weight:700; color:#3B82F6;">Viewing</span> ${agent.idStr}`;
        } else {
          label.innerHTML = agent.idStr;
        }
      }
      
      const row = document.getElementById(`swarm-active-row-${agent.idx}`);
      if (row) {
        if (agent.idx === viewedAgentIdx) {
          row.style.background = '#F3F4F6';
          row.style.borderLeft = '3px solid #3B82F6';
        } else {
          row.style.background = 'transparent';
          row.style.borderLeft = 'none';
        }
      }
    });
  }

  async function handleChatSubmission(promptText) {
    clearActiveSteps();
    // 1. Show message view, hide computer mock screen
    if (chatMessagesView) chatMessagesView.style.display = 'flex';
    if (agentComputerScreen) agentComputerScreen.style.display = 'none';

    // Determine current mode from capsule UI
    const activeModeOpt = document.querySelector('.mode-capsule-option.active');
    const currentMode = activeModeOpt ? activeModeOpt.dataset.mode : 'search';
    
    // Use the selected mode directly - LLM decides if computer tools are needed
    const effectiveMode = currentMode;

    // Instant local routing check to separate simple greetings from complex search/research tasks
    function checkShouldTriggerSwarm(prompt) {
      const lower = prompt.toLowerCase().trim();
      const greetings = [
        'hi', 'hello', 'hey', 'yo', 'good morning', 'good afternoon', 'good evening',
        'greetings', 'sup', 'howdy', 'test', 'testing', 'hi there', 'hello there',
        'thanks', 'thank you', 'thank you!', 'awesome', 'great', 'ok', 'okay', 'yes', 'no'
      ];
      if (greetings.includes(lower)) {
        return false;
      }
      if (lower.length < 15) {
        const actionVerbs = ['search', 'find', 'get', 'show', 'run', 'make', 'do', 'build', 'write', 'check', 'news', 'price', 'cost'];
        const hasVerb = actionVerbs.some(v => lower.includes(v));
        if (!hasVerb) return false;
      }
      return true;
    }

    // Swarm mode variables
    let isPromptSwarmTrigger = effectiveMode === 'search' && checkShouldTriggerSwarm(promptText);
    let swarmVisualized = false;

    // Show subagent status bar with slide-down pop-up animation in computer mode
    const subagentStatusBar = document.getElementById('subagentStatusBar');
    if (subagentStatusBar) {
      if (effectiveMode === 'computer') {
        subagentStatusBar.style.display = 'flex';
        subagentStatusBar.style.opacity = '0';
        subagentStatusBar.style.transform = 'translateY(-10px)';
        subagentStatusBar.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        // Trigger layout reflow
        subagentStatusBar.offsetHeight;
        subagentStatusBar.style.opacity = '1';
        subagentStatusBar.style.transform = 'translateY(0)';
        
        const subagentStatusText = document.getElementById('subagentStatusText');
        if (subagentStatusText) {
          subagentStatusText.textContent = 'Connecting to agent...';
        }
        const subagentStepCount = document.getElementById('subagentStepCount');
        if (subagentStepCount) {
          subagentStepCount.textContent = '0 / ?';
        }
      } else {
        subagentStatusBar.style.display = 'none';
      }
    }

    // 2. Execute dashboard actions before calling the API
    const actionResults = executeDashboardActions(promptText);
    const userMsg = actionResults.length > 0
      ? promptText + '\n\n[System: The following dashboard actions were executed:\n' + actionResults.join('\n') + '\n\nAcknowledge these actions to the user and offer next steps.]'
      : promptText;

    // 3. Append User Message
    appendMessage('user', promptText);

    const state = modelsStore.getState();
    const activeModelName = state.activeModel;
    let model = state.models.find(m => m.name === activeModelName || m.id === activeModelName);

    if (!model) {
      appendMessage('assistant', `Model "${activeModelName}" not found. Please select a connected model from the dropdown.`);
      return;
    }

    if (model.status !== 'connected') {
      appendMessage('assistant', `"${model.name}" is not connected. Go to Models → Connect to add your API key.`);
      return;
    }

    // Append attached file context
    let fileContext = '';
    if (window._attachedFiles && window._attachedFiles.length > 0) {
      fileContext = '\n\n[Attached files:\n' + window._attachedFiles.map(f => `- ${f.name} (${f.type}, ${f.size} bytes)`).join('\n') + '\n\nFile contents below:\n' + window._attachedFiles.map(f => f.content).filter(Boolean).join('\n---\n') + '\n]';
      window._attachedFiles = [];
      const previewContainer = document.getElementById('filePreviewChips');
      if (previewContainer) {
        previewContainer.innerHTML = '';
        previewContainer.style.display = 'none';
      }
    }

    // ── Computer mode: inject computer tools as LLM tool definitions ──
    let computerTools = [];
    let computerSystemMsg = '';
    if (effectiveMode === 'computer') {
      computerSystemMsg = `You are a highly capable AI agent with full computer control — browser, terminal, file system, code execution, and desktop.

STRATEGY SELECTION (Critical): Before acting, ask: Is there an API/CLI for this? Is this a file operation? Is this code execution? Only fall back to GUI clicking if neither API, shell, nor code execution applies. This eliminates 50%+ of unnecessary browser automation.

FULL OS ACCESS: You have terminal (shell), file system (read/write/find/search), code execution (Python/JavaScript), browser automation, and package installation. Use the right tool for the job.

SELF-EXTENSION: You can write and run scripts on the fly. Chain tools: shell("curl ...") → write_file(...) → read_file(...). Use primitives to compose new capabilities.

DYNAMIC PLANNING: Use add_subtask/update_subtask to break complex tasks into steps and track progress.

FAILURE MEMORY: When an approach fails, try a different strategy. Don't repeat the same failed approach.

RISKY ACTIONS: For irreversible actions (payments, sends, deletes), describe what you're about to do and wait for confirmation.

For simple greetings or questions — just respond with text. For tasks: plan first, execute efficiently, verify with screenshot_diff, call done when finished.`;
      computerTools = [
        // ── Screen & perception ─────────────────────────────────────
        { type: 'function', function: { name: 'get_screen', description: 'Get the current screen: URL, title, open tabs, and all interactive elements with index, tag, text, role, and position. Call first and after major changes.', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'take_screenshot', description: 'Capture a screenshot of the current screen.', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'annotate_screen', description: 'Overlay numbered markers on all interactive elements to identify them by number.', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'resolve_click', description: 'Find the best element to click given a natural-language description (e.g. "the search button").', parameters: { type: 'object', properties: { description: { type: 'string', description: 'Description of the element to click' } }, required: ['description'] } } },
        { type: 'function', function: { name: 'screenshot_diff', description: 'Compare before/after screenshots to check if an action had visible effect.', parameters: { type: 'object', properties: { before: { type: 'string' }, after: { type: 'string' } }, required: [] } } },
        { type: 'function', function: { name: 'get_page_html', description: 'Get the full HTML of the current page.', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'get_page_text', description: 'Get all visible text from the current page.', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'get_page_markdown', description: 'Get the current page content converted to Markdown.', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'find_text', description: 'Find occurrences of text on the page.', parameters: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] } } },
        { type: 'function', function: { name: 'wait_for', description: 'Wait for a condition: selector, load, url, network_idle.', parameters: { type: 'object', properties: { type: { type: 'string', enum: ['selector', 'load', 'url', 'network_idle'] }, value: { type: 'string' }, timeout: { type: 'number' } }, required: ['type'] } } },
        // ── Browser actions ─────────────────────────────────────────
        { type: 'function', function: { name: 'click', description: 'Click an element by its index number (from get_screen).', parameters: { type: 'object', properties: { index: { type: 'number', description: 'Element index from get_screen' } }, required: ['index'] } } },
        { type: 'function', function: { name: 'type', description: 'Type text into an input/textarea by its index.', parameters: { type: 'object', properties: { index: { type: 'number', description: 'Element index from get_screen' }, text: { type: 'string', description: 'Text to type' } }, required: ['index', 'text'] } } },
        { type: 'function', function: { name: 'press_key', description: 'Press a keyboard key.', parameters: { type: 'object', properties: { key: { type: 'string', description: 'Key name: Enter, Tab, Escape, Backspace, etc.' } }, required: ['key'] } } },
        { type: 'function', function: { name: 'hotkey', description: 'Press a keyboard shortcut (e.g. ctrl+c, alt+tab).', parameters: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' }, description: 'Keys to press together' } }, required: ['keys'] } } },
        { type: 'function', function: { name: 'scroll', description: 'Scroll the page.', parameters: { type: 'object', properties: { direction: { type: 'string', enum: ['up', 'down'] }, amount: { type: 'number' } }, required: ['direction'] } } },
        { type: 'function', function: { name: 'navigate', description: 'Navigate to a URL in the browser.', parameters: { type: 'object', properties: { url: { type: 'string', description: 'Full URL including https://' } }, required: ['url'] } } },
        { type: 'function', function: { name: 'evaluate', description: 'Run JavaScript in the browser page.', parameters: { type: 'object', properties: { expression: { type: 'string', description: 'JavaScript expression to evaluate' } }, required: ['expression'] } } },
        // ── Tab management ─────────────────────────────────────────
        { type: 'function', function: { name: 'open_tab', description: 'Open a new browser tab and navigate to a URL.', parameters: { type: 'object', properties: { url: { type: 'string' } }, required: [] } } },
        { type: 'function', function: { name: 'list_tabs', description: 'List all open browser tabs.', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'switch_tab', description: 'Switch to a specific tab by index.', parameters: { type: 'object', properties: { index: { type: 'number' } }, required: ['index'] } } },
        { type: 'function', function: { name: 'close_tab', description: 'Close a specific tab by index.', parameters: { type: 'object', properties: { index: { type: 'number' } }, required: ['index'] } } },
        // ── Shell & code execution ─────────────────────────────────
        { type: 'function', function: { name: 'shell', description: 'Execute a shell command (bash). Use for system operations, installing packages, running scripts.', parameters: { type: 'object', properties: { command: { type: 'string', description: 'Shell command to run' } }, required: ['command'] } } },
        { type: 'function', function: { name: 'run_code', description: 'Execute code in a sandboxed runtime. Supports Python (Jupyter) or JavaScript (Node.js).', parameters: { type: 'object', properties: { code: { type: 'string', description: 'Code to execute' }, language: { type: 'string', enum: ['python', 'javascript'], description: 'Language (default: python)' } }, required: ['code'] } } },
        // ── File system ────────────────────────────────────────────
        { type: 'function', function: { name: 'read_file', description: 'Read the contents of a file in the sandbox.', parameters: { type: 'object', properties: { path: { type: 'string', description: 'Absolute file path' } }, required: ['path'] } } },
        { type: 'function', function: { name: 'write_file', description: 'Write content to a file (creates or overwrites).', parameters: { type: 'object', properties: { path: { type: 'string', description: 'Absolute file path' }, content: { type: 'string', description: 'File content' } }, required: ['path', 'content'] } } },
        { type: 'function', function: { name: 'list_files', description: 'List files and directories at a path.', parameters: { type: 'object', properties: { path: { type: 'string', description: 'Directory path (default: /)' } }, required: [] } } },
        { type: 'function', function: { name: 'find_files', description: 'Find files by name pattern (glob).', parameters: { type: 'object', properties: { pattern: { type: 'string', description: 'Glob pattern (e.g. *.py)' }, path: { type: 'string' } }, required: ['pattern'] } } },
        { type: 'function', function: { name: 'search_files', description: 'Search for text within files (grep).', parameters: { type: 'object', properties: { query: { type: 'string', description: 'Text or regex to search for' }, path: { type: 'string' } }, required: ['query'] } } },
        // ── Package installation ───────────────────────────────────
        { type: 'function', function: { name: 'install_package', description: 'Install a package via pip, npm, or apt. Auto-detects manager.', parameters: { type: 'object', properties: { package: { type: 'string', description: 'Package name' }, manager: { type: 'string', enum: ['auto', 'pip', 'npm', 'apt'] } }, required: ['package'] } } },
        // ── Dynamic planner ────────────────────────────────────────
        { type: 'function', function: { name: 'add_subtask', description: 'Add a subtask to break complex tasks into steps.', parameters: { type: 'object', properties: { description: { type: 'string', description: 'Subtask description' } }, required: ['description'] } } },
        { type: 'function', function: { name: 'update_subtask', description: 'Update a subtask status (active/completed/failed/skipped).', parameters: { type: 'object', properties: { task_id: { type: 'number', description: 'Subtask ID' }, status: { type: 'string', enum: ['active', 'completed', 'failed', 'skipped'] }, result: { type: 'string' } }, required: ['task_id', 'status'] } } },
        { type: 'function', function: { name: 'remove_subtask', description: 'Remove a subtask from the plan.', parameters: { type: 'object', properties: { task_id: { type: 'number' } }, required: ['task_id'] } } },
        { type: 'function', function: { name: 'reorder_subtasks', description: 'Reorder subtasks by providing IDs in desired order.', parameters: { type: 'object', properties: { order: { type: 'array', items: { type: 'number' } } }, required: ['order'] } } },
        { type: 'function', function: { name: 'get_plan', description: 'View the current task plan and subtask statuses.', parameters: { type: 'object', properties: {}, required: [] } } },
        // ── Done ──────────────────────────────────────────────────
        { type: 'function', function: { name: 'done', description: 'Mark the task as complete with a summary.', parameters: { type: 'object', properties: { summary: { type: 'string', description: 'Detailed summary of what was accomplished' } }, required: ['summary'] } } },
      ];
    }
    const fullUserMsg = userMsg + fileContext;

    // 4. Send message
    const webSearchInstruction = webSearchEnabled ? '\n[Web Search enabled: Search the web for current information, include inline citations as [source](1), [source](2) etc., and list your sources at the end with title and URL.]' : '';
    const modeAdjustedMsg = fullUserMsg + webSearchInstruction;
    conversationHistory.push({ role: 'user', content: modeAdjustedMsg });

    if (!tasksStore.activeId) {
      const name = promptText.length > 40 ? promptText.slice(0, 40) + '...' : promptText;
      tasksStore.addTask(name, [{ role: 'user', content: modeAdjustedMsg }]);
      renderTasks();
    } else {
      const active = tasksStore.tasks.find(t => t.id === tasksStore.activeId);
      if (active) { active.messages.push({ role: 'user', content: modeAdjustedMsg }); tasksStore.notify(); }
    }

    // Show typing indicator
    appendMessage('assistant', '<div class="typing-placeholder"></div>');
    let msgDiv = chatMessagesLog.lastElementChild;
    let bubble = msgDiv.querySelector('.chat-message-bubble');
    bubble.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    abortController = new AbortController();
    showStopButton(true);
    window.dispatchEvent(new CustomEvent('agent-typing-start', { detail: { status: 'Planning' } }));

    try {
      // ── Computer mode: agentic loop — LLM + tools + desktop agent ──────
      if (effectiveMode === 'computer') {
        window.dispatchEvent(new CustomEvent('agent-typing-start', { detail: { status: 'Analyzing' } }));
      clearAllToolIndicators();
      clearActiveSteps();
      // Remove typing indicator - computer mode shows its own progress
      const typingMsg = chatMessagesLog.querySelector('.typing-placeholder')?.closest('.chat-message');
      if (typingMsg) typingMsg.remove();
      // Keep stop button visible for computer mode
      showStopButton(true);

        // Status bar
        const statusBar = document.getElementById('subagentStatusBar');
        const statusText = document.getElementById('subagentStatusText');
        const stepCount = document.getElementById('subagentStepCount');
        if (statusBar) statusBar.style.display = 'flex';

        // Task progress panel in the right split pane
        const progressBody = document.getElementById('splitPaneProgressBody');
        const progressStepCount = document.getElementById('splitPaneProgressStepCount');
        if (progressBody) progressBody.innerHTML = '';

        function updateStatus(text, step) {
          if (statusText) statusText.textContent = text;
          if (stepCount) stepCount.textContent = step;
        }

        function renderLivePlan(plan) {
          if (!progressBody || !plan || plan.length === 0) return;
          progressBody.innerHTML = '';
          progressStepNum = 0;
          for (const st of plan) {
            const stateMap = { pending: 'pending', active: 'active', completed: 'done', failed: 'active', skipped: 'done' };
            const state = stateMap[st.status] || 'pending';
            const label = st.status === 'failed' ? `[!] ${st.description}` : st.status === 'skipped' ? `[-] ${st.description}` : st.description;
            addProgressStep(label, state);
          }
        }

        let progressStepNum = 0;
        
        function addProgressStep(text, state, detailsHtml = '') {
          if (!progressBody) return;
          progressStepNum++;
          const num = progressStepNum;
          const colors = { active: '#3B82F6', done: '#10B981', pending: '#D1D5DB' };
          const color = colors[state] || colors.pending;
          const opacity = state === 'pending' ? '0.7' : '1';
          
          let circleHtml = '';
          if (state === 'done') {
            circleHtml = `<div class="progress-step-circle" style="width:22px;height:22px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>`;
          } else if (state === 'active') {
            circleHtml = `<div class="progress-step-circle" style="width:22px;height:22px;border-radius:50%;background:${color};box-shadow:0 0 0 3px rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:#fff;font-size:11px;font-weight:600;">${num}</span>
            </div>`;
          } else {
            circleHtml = `<div class="progress-step-circle" style="width:22px;height:22px;border-radius:50%;border:2px solid ${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:${color};font-size:11px;font-weight:500;">${num}</span>
            </div>`;
          }
          
          const stepDiv = document.createElement('div');
          stepDiv.className = 'progress-step-block';
          stepDiv.style.cssText = `margin-bottom: 8px; border: 1px solid #E5E7EB; border-radius: 8px; background: #FAFBFC; overflow: hidden; opacity: ${opacity}; transition: opacity 0.2s;`;

          const header = document.createElement('button');
          header.className = 'progress-step-header';
          header.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            border: none;
            background: none;
            padding: 8px 10px;
            cursor: pointer;
            text-align: left;
            outline: none;
          `;
          
          const left = document.createElement('div');
          left.style.cssText = 'display: flex; align-items: center; gap: 10px; flex: 1;';
          left.innerHTML = `${circleHtml}<span class="progress-step-text" style="font-size:13px;color:${state === 'pending' ? '#6B7280' : '#111827'};font-weight:${state === 'active' ? '500' : '400'};line-height:1.4;">${text}</span>`;
          header.appendChild(left);

          // Chevron
          const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          chevron.setAttribute('width', '12');
          chevron.setAttribute('height', '12');
          chevron.setAttribute('viewBox', '0 0 16 16');
          chevron.setAttribute('fill', 'none');
          chevron.setAttribute('stroke', '#9CA3AF');
          chevron.setAttribute('stroke-width', '2');
          chevron.setAttribute('stroke-linecap', 'round');
          chevron.setAttribute('stroke-linejoin', 'round');
          chevron.style.cssText = 'transition: transform 0.2s; transform: rotate(0deg); margin-left: 6px; flex-shrink: 0;';
          const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          chevronPath.setAttribute('d', 'M6 3l5 5-5 5');
          chevron.appendChild(chevronPath);
          header.appendChild(chevron);

          const content = document.createElement('div');
          content.className = 'progress-step-content';
          content.style.cssText = 'max-height: 0px; padding: 0 10px; overflow: hidden; font-size: 12px; color: #4B5563; transition: all 0.2s ease-out; box-sizing: border-box;';
          content.innerHTML = detailsHtml || '<div style="padding: 6px 0; color: #9CA3AF; font-style: italic;">No details available</div>';

          header.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = content.style.maxHeight !== '0px';
            if (isOpen) {
              content.style.maxHeight = '0px';
              content.style.padding = '0 10px';
              chevron.style.transform = 'rotate(0deg)';
            } else {
              content.style.maxHeight = '500px';
              content.style.padding = '8px 10px';
              chevron.style.transform = 'rotate(90deg)';
            }
          });

          stepDiv.appendChild(header);
          stepDiv.appendChild(content);
          progressBody.appendChild(stepDiv);
          progressBody.scrollTop = progressBody.scrollHeight;
        }

        function updateProgressStep(index, text, state, detailsHtml = '') {
          if (!progressBody || !progressBody.children[index]) return;
          const el = progressBody.children[index];
          el.style.opacity = state === 'pending' ? '0.7' : '1';
          
          const colors = { active: '#3B82F6', done: '#10B981', pending: '#D1D5DB' };
          const color = colors[state] || colors.pending;
          const num = index + 1;
          
          let circleHtml = '';
          if (state === 'done') {
            circleHtml = `<div class="progress-step-circle" style="width:22px;height:22px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>`;
          } else if (state === 'active') {
            circleHtml = `<div class="progress-step-circle" style="width:22px;height:22px;border-radius:50%;background:${color};box-shadow:0 0 0 3px rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:#fff;font-size:11px;font-weight:600;">${num}</span>
            </div>`;
          } else {
            circleHtml = `<div class="progress-step-circle" style="width:22px;height:22px;border-radius:50%;border:2px solid ${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:${color};font-size:11px;font-weight:500;">${num}</span>
            </div>`;
          }
          
          const circleContainer = el.querySelector('.progress-step-circle');
          if (circleContainer) {
            circleContainer.outerHTML = circleHtml;
          }
          const span = el.querySelector('.progress-step-text');
          if (span) {
            span.textContent = text;
            span.style.color = state === 'pending' ? '#6B7280' : '#111827';
            span.style.fontWeight = state === 'active' ? '500' : '400';
          }
          if (detailsHtml) {
            const content = el.querySelector('.progress-step-content');
            if (content) content.innerHTML = detailsHtml;
          }
        }

        updateStatus('Agent starting...', '0 / ?');

        // ── HF Space endpoint ───────────────────────────────────────────
        const hfUrl = (localStorage.getItem('hf_space_url') || 'https://bkarthikeyan-browser-agent-stream.hf.space').replace(/\/$/, '');
        let agentStep = 0;
        const maxSteps = 15;
        let progressIndex = 0;
        let agentWs = null;
        let usingWs = false;
        const wsQueue = [];

        // Try WebSocket first (real-time push, <5ms latency on HF)
        const wsProto = hfUrl.startsWith('https://') ? 'wss://' : 'ws://';
        const wsBase = hfUrl.replace(/^https?:\/\//, '');
        try {
          agentWs = new WebSocket(wsProto + wsBase + '/ws/agent');
          await new Promise((resolve, reject) => {
            const t = setTimeout(() => reject(new Error('WS timeout')), 3000);
            agentWs.onopen  = () => { clearTimeout(t); usingWs = true; resolve(); };
            agentWs.onerror = () => { clearTimeout(t); reject(new Error('WS error')); };
          });
        } catch (e) {
          console.log('[agent] WS fallback to HTTP:', e.message);
          agentWs = null; usingWs = false;
        }

        // Wire WS events → live UI updates
        // WS carries: action status text, done/error events ONLY.
        // NO screenshot data — Selkies stream handles all visuals at 30fps.
        if (agentWs) {
          agentWs.onmessage = (ev) => {
            try {
              const m = JSON.parse(ev.data);
              if (m.type === 'action') {
                const desc = actionDescriptions[m.action] || m.action;
                updateStatus('\u26a1 ' + desc, (m.step || agentStep) + ' / ' + maxSteps);
                addProgressStep(desc, 'active');
              } else if (m.type === 'result') {
                updateStatus('\u2713 ' + m.action + ' [' + (m.action_ms || 0) + 'ms]', (m.step || agentStep) + ' / ' + maxSteps);
                if (m.result && m.result.startsWith('URL:')) {
                  const urlLine = m.result.split('\n')[0].replace('URL: ', '').trim();
                  const urlEl = document.getElementById('splitPaneHeaderUrl');
                  if (urlEl && urlLine !== 'unknown') urlEl.innerHTML = '<a href="' + urlLine + '" target="_blank" style="color:#3B82F6;text-decoration:none;">' + urlLine + '</a>';
                }
              } else if (m.type === 'token') {
                // Stream LLM thinking tokens into typing indicator
                const placeholder = document.querySelector('.typing-placeholder');
                if (placeholder) placeholder.textContent += m.text;
              } else if (m.type === 'done') {
                appendMessage('assistant', m.summary || 'Task complete.');
                updateStatus('\u2705 Done [' + (m.total_ms || 0) + 'ms, ' + (m.steps || maxSteps) + ' steps]', '\u2713');
                addProgressStep('Task complete', 'done');
                wsQueue.push({ done: true });
              } else if (m.type === 'error') {
                appendMessage('assistant', '\u274c ' + m.text);
                wsQueue.push({ error: m.text });
              } else if (m.type === 'agent_end') {
                wsQueue.push({ done: true });
              }
            } catch (e) { console.error('[agent-ws]', e); }
          };
          agentWs.onerror = agentWs.onclose = () => { usingWs = false; };
        }

        async function executeOnAgent(action) {
          const resp = await fetch(`${hfUrl}/agent/execute`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action), signal: abortController.signal,
          });
          if (!resp.ok) throw new Error(`Agent HTTP ${resp.status}`);
          return resp.json();
        }

        async function getAgentScreen() {
          const resp = await fetch(`${hfUrl}/agent/screen`, { signal: abortController.signal });
          if (!resp.ok) throw new Error(`Screen ${resp.status}`);
          return resp.json();
        }

        // Health check
        const health = await fetch(`${hfUrl}/health`, { signal: abortController.signal });
        if (!health.ok) throw new Error('HF Space not available');
        updateStatus('Connected \u2713', '0 / ?');

        // ── WebSocket fast path: send task, watch stream, wait for done ──
        if (usingWs && agentWs) {
          toggleComputerSplit(true);

          // Load the Selkies WebRTC stream into the split-pane iframe.
          // The stream shows EVERYTHING live at 30fps — no polling needed.
          const desktopFrame = document.getElementById('desktopFrame');
          if (desktopFrame) {
            desktopFrame.src = hfUrl + '/stream/';
            desktopFrame.style.display = 'block';
            // Hide the connecting overlay
            const overlay = document.getElementById('desktopConnectingOverlay');
            if (overlay) overlay.style.display = 'none';
          }

          // Send task — agent runs fully server-side, stream shows progress
          agentWs.send(JSON.stringify({ type: 'message', text: promptText }));

          // Wait for done/error event (WS only carries status text, not frames)
          await new Promise((resolve) => {
            const check = setInterval(() => {
              if (wsQueue.length > 0 || stopped || abortController.signal.aborted) {
                clearInterval(check); resolve();
              }
            }, 100);
            setTimeout(() => { clearInterval(check); resolve(); }, 300000); // 5min max
          });
          try { agentWs.close(); } catch (e) {}
          return;
        }

        // Poll screen for URL updates every 2s (replaces ws.onmessage)
        const screenPollInterval = setInterval(async () => {
          try {
            const screen = await getAgentScreen();
            const urlEl = document.getElementById('splitPaneHeaderUrl');
            if (urlEl && screen.url) {
              urlEl.innerHTML = `<a href="${screen.url}" target="_blank" style="color:#3B82F6;text-decoration:none;">${screen.url}</a>`;
            }
            if (screen.title) {
              agentStep++;
              updateStatus(screen.title, `${agentStep} / ${maxSteps}`);
            }
          } catch (e) {}
        }, 2000);

        // Agentic loop: LLM decides action → execute → feed result back
        const messages = [
          { role: 'system', content: computerSystemMsg },
          { role: 'user', content: promptText },
        ];

        let consecutiveErrors = 0;
        const maxConsecutiveErrors = 3;
        let stopped = false;

        // Wire stop button to break the loop
        const stopHandler = () => { stopped = true; };
        abortController.signal.addEventListener('abort', stopHandler);

        for (let step = 0; step < maxSteps && !stopped; step++) {
          updateStatus(`Step ${step + 1}: Thinking...`, `${step + 1} / ${maxSteps}`);
          // Mark previous step as done before adding new one
          if (progressBody && progressBody.children.length > 0) {
            const prevIdx = progressBody.children.length - 1;
            const prevText = progressBody.children[prevIdx]?.querySelector('.progress-step-text')?.textContent || progressBody.children[prevIdx]?.querySelector('span')?.textContent || '';
            updateProgressStep(prevIdx, prevText, 'done');
          }
          addProgressStep(`Step ${step + 1}: Thinking...`, 'active');
          progressIndex = progressBody ? progressBody.children.length : 0;

          // Call LLM with tools via Vite proxy → backend → Render-deployed llm-proxy
          let llmData;
          let retries = 0;
          const maxRetries = 3;
          
          while (retries <= maxRetries && !stopped) {
            try {
              const llmResp = await fetch('/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac',
                },
                body: JSON.stringify({
                  model: 'auto',
                  messages,
                  tools: computerTools,
                  tool_choice: 'auto',
                  temperature: 0.1,
                  max_tokens: 2048,
                  stream: true,
                }),
                signal: abortController.signal,
              });

              // Handle rate limiting (429)
              if (llmResp.status === 429) {
                retries++;
                if (retries > maxRetries) {
                  throw new Error('Rate limited - too many requests');
                }
                const waitTime = Math.pow(2, retries) * 1000; // 2s, 4s, 8s
                updateStatus(`Rate limited, waiting ${waitTime/1000}s...`, `${step + 1} / ${maxSteps}`);
                await new Promise(r => setTimeout(r, waitTime));
                continue;
              }

              if (!llmResp.ok) {
                let errDetail = `${llmResp.status}`;
                try { const e = await llmResp.json(); errDetail += ': ' + (e?.error?.message || e?.detail || JSON.stringify(e)); } catch {}
                throw new Error(`LLM error: ${errDetail}`);
              }

              // Handle streaming response
              const reader = llmResp.body.getReader();
              const decoder = new TextDecoder();
              let fullContent = '';
              let toolCalls = [];
              let buffer = '';

              // Create or get the streaming message bubble
              let streamingMsgDiv = chatMessagesLog.querySelector('.streaming-assistant-msg');
              if (!streamingMsgDiv) {
                streamingMsgDiv = appendMessage('assistant', '', '', [], true);
                streamingMsgDiv.classList.add('streaming-assistant-msg');
              }
              const streamingBubble = streamingMsgDiv.querySelector('.cot-response-text-container');

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    if (data === '[DONE]') continue;
                    try {
                      const chunk = JSON.parse(data);
                      const delta = chunk.choices?.[0]?.delta;
                      if (delta) {
                        if (delta.content) {
                          fullContent += delta.content;
                          if (streamingBubble) {
                            streamingBubble.innerHTML = renderMarkdown(fullContent);
                            chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
                          }
                        }
                        if (delta.tool_calls) {
                          for (const tc of delta.tool_calls) {
                            if (tc.index !== undefined) {
                              if (!toolCalls[tc.index]) {
                                toolCalls[tc.index] = { id: tc.id || '', function: { name: '', arguments: '' } };
                              }
                              if (tc.id) toolCalls[tc.index].id = tc.id;
                              if (tc.function?.name) toolCalls[tc.index].function.name += tc.function.name;
                              if (tc.function?.arguments) toolCalls[tc.index].function.arguments += tc.function.arguments;
                            }
                          }
                        }
                      }
                    } catch (e) {}
                  }
                }
              }

              llmData = {
                choices: [{
                  message: {
                    role: 'assistant',
                    content: fullContent,
                    tool_calls: toolCalls.length > 0 ? toolCalls : undefined
                  }
                }]
              };
              consecutiveErrors = 0;
              break; // Success, exit retry loop
            } catch (err) {
              if (err.name === 'AbortError') {
                stopped = true;
                break;
              }
              consecutiveErrors++;
              retries++;
              if (retries > maxRetries || consecutiveErrors >= maxConsecutiveErrors) {
                throw err;
              }
              const waitTime = Math.pow(2, retries) * 1000;
              updateStatus(`Retrying in ${waitTime/1000}s...`, `${step + 1} / ${maxSteps}`);
              await new Promise(r => setTimeout(r, waitTime));
            }
          }
          
          if (stopped || !llmData) break;

          const choice = llmData.choices?.[0];
          if (!choice) break;

          const assistantMsg = choice.message;
          messages.push(assistantMsg);

          // If no tool calls, the LLM is done talking
          if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
            const text = assistantMsg.content || 'Done.';
            // Remove streaming class and finalize the message
            const streamingMsg = chatMessagesLog.querySelector('.streaming-assistant-msg');
            if (streamingMsg) {
              streamingMsg.classList.remove('streaming-assistant-msg');
            } else {
              // Fallback: remove typing placeholder and append
              const existingTypingMsg = chatMessagesLog.querySelector('.typing-placeholder')?.closest('.chat-message');
              if (existingTypingMsg) {
                existingTypingMsg.remove();
              }
              appendMessage('assistant', text);
            }
            updateStatus('Task complete.', `${step + 1} / ${maxSteps}`);
            addProgressStep('Delivering result to user', 'done');
            if (progressBody && progressBody.children.length > 1) {
              const prevIdx = progressBody.children.length - 2;
              const prevText = progressBody.children[prevIdx]?.querySelector('.progress-step-text')?.textContent || progressBody.children[prevIdx]?.querySelector('span')?.textContent || '';
              updateProgressStep(prevIdx, prevText, 'done');
            }
            break;
          }

          // Execute each tool call
          for (const toolCall of assistantMsg.tool_calls) {
            if (stopped) break;
            const fn = toolCall.function;
            const args = JSON.parse(fn.arguments || '{}');
            const actionName = fn.name;
            const desc = actionDescriptions[actionName] || actionName;
            updateStatus(`Executing: ${desc}`, `${step + 1} / ${maxSteps}`);
            addProgressStep(desc, 'active');
            if (progressBody && progressBody.children.length > 1) {
              const prevIdx = progressBody.children.length - 2;
              const prevText = progressBody.children[prevIdx]?.querySelector('.progress-step-text')?.textContent || progressBody.children[prevIdx]?.querySelector('span')?.textContent || '';
              updateProgressStep(prevIdx, prevText, 'done');
            }

            // Send action to desktop agent via HTTP POST
            window.dispatchEvent(new CustomEvent('agent-tool-start', { detail: { name: actionName, id: 'comp-' + step + '-' + toolCall.id, args: args } }));
            toggleComputerSplit(true);
            
            // Send action and wait for result with timeout
            let screenResult;
            try {
              const execResult = await Promise.race([
                executeOnAgent({ action: actionName, ...args }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Action timeout')), 30000))
              ]);
              screenResult = execResult.result || 'Action executed.';
              // Update URL display after each action
              try {
                const screen = await getAgentScreen();
                const urlEl = document.getElementById('splitPaneHeaderUrl');
                if (urlEl && screen.url) {
                  urlEl.innerHTML = `<a href="${screen.url}" target="_blank" style="color:#3B82F6;text-decoration:none;">${screen.url}</a>`;
                }
              } catch (e) {}
            } catch (err) {
              if (stopped || err.message === 'Stopped by user') {
                screenResult = 'Stopped by user';
              } else {
                screenResult = `Action '${actionName}' failed: ${err.message}`;
                console.error('Action execution error:', err);
              }
            }
            
            window.dispatchEvent(new CustomEvent('agent-tool-complete', { detail: { name: actionName, id: 'comp-' + step + '-' + toolCall.id } }));

            // Feed result back to LLM
            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: screenResult || 'Action executed.',
            });

            updateStatus(`Observed result`, `${step + 1} / ${maxSteps}`);
            if (progressStepCount) progressStepCount.textContent = `${step + 1} / ${maxSteps}`;
          }
        }

        // Clean up stop handler
        abortController.signal.removeEventListener('abort', stopHandler);
        
        // Stop screen polling when task is complete
        if (typeof screenPollInterval !== 'undefined') clearInterval(screenPollInterval);
        
        if (stopped) {
          appendMessage('assistant', 'Task stopped by user.');
          updateStatus('Stopped by user.', '!');
        } else {
          // Only save to task history if it was a computer task (not just chat)
          const lastMsg = messages[messages.length - 1];
          const wasComputerTask = lastMsg && lastMsg.tool_calls && lastMsg.tool_calls.length > 0;
          if (wasComputerTask) {
            const active = tasksStore.tasks.find(t => t.id === tasksStore.activeId);
            if (active) { active.messages.push({ role: 'assistant', content: `[Computer task completed: "${promptText}"]` }); tasksStore.notify(); }
          }
        }
        return;
      }

      let msgDiv = null;
      let bubble = null;
      let hasEndedThinking = false;
      let thinkingStartTime = null;
      let cotSection = null;
      let cotContentDiv = null;
      let firstReasoningToken = true;
      let accumulatedReasoning = '';
      let fullContent = '';
      let streamedToolCalls = [];

      const ensureAssistantBubble = () => {
        if (!bubble) {
          const lastMsg = chatMessagesLog.lastElementChild;
          if (lastMsg && lastMsg.classList.contains('assistant')) {
            msgDiv = lastMsg;
            bubble = msgDiv.querySelector('.chat-message-bubble');
          }
          if (!bubble) {
            appendMessage('assistant', '');
            msgDiv = chatMessagesLog.lastElementChild;
            bubble = msgDiv.querySelector('.chat-message-bubble');
          }
        }
        
        const indicator = bubble.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
        
        let blocksContainer = bubble.querySelector('.message-collapsible-blocks');
        if (!blocksContainer) {
          blocksContainer = document.createElement('div');
          blocksContainer.className = 'message-collapsible-blocks';
          blocksContainer.style.cssText = 'width: 100%;';
          bubble.insertBefore(blocksContainer, bubble.firstChild);
        }
        
        let textContainer = bubble.querySelector('.cot-response-text-container');
        if (!textContainer) {
          textContainer = document.createElement('div');
          textContainer.className = 'cot-response-text-container';
          bubble.appendChild(textContainer);
        }
        
        return bubble;
      };

      // Throttle rendering configuration
      let renderPending = false;
      let lastRenderTime = 0;
      const RENDER_THROTTLE_MS = 80;

      function performRender() {
        renderPending = false;
        lastRenderTime = Date.now();
        if (bubble) {
          let textContainer = bubble.querySelector('.cot-response-text-container');
          if (!textContainer) {
            textContainer = document.createElement('div');
            textContainer.className = 'cot-response-text-container';
            bubble.appendChild(textContainer);
          }
          textContainer.innerHTML = renderMarkdown(fullContent.trimStart());
          chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
        }
      }

      function requestThrottledRender() {
        if (renderPending) return;
        const now = Date.now();
        const timeSinceLastRender = now - lastRenderTime;
        if (timeSinceLastRender >= RENDER_THROTTLE_MS) {
          performRender();
        } else {
          renderPending = true;
          setTimeout(performRender, RENDER_THROTTLE_MS - timeSinceLastRender);
        }
      }
        
       const onTokenCb = (token) => {
        // onToken callback
        
        // Ensure we have a bubble
        ensureAssistantBubble();

        // 1. Finalize thinking duration if thinking was active
        if (!hasEndedThinking && thinkingStartTime) {
          hasEndedThinking = true;
          const duration = Math.round((Date.now() - thinkingStartTime) / 1000);
          const durationText = duration <= 1 ? '1s' : `${duration}s`;
          if (cotSection) {
            const iconSpan = cotSection.querySelector('.activity-icon-span');
            if (iconSpan) {
              iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
            }
            const labelSpan = cotSection.querySelector('.activity-label-span');
            if (labelSpan) {
              labelSpan.textContent = `Thought for ${durationText}`;
              labelSpan.style.color = '#4B5563';
            }
            const statusSpan = cotSection.querySelector('.activity-status-text');
            if (statusSpan) {
              statusSpan.textContent = '';
            }
            const contentContainer = cotSection.querySelector('.activity-content-container');
            if (contentContainer) {
              contentContainer.style.maxHeight = '0px';
              contentContainer.style.padding = '0px 12px 0px 24px';
            }
            const chevron = cotSection.querySelector('.activity-chevron');
            if (chevron) {
              chevron.style.transform = 'rotate(0deg)';
            }
          }
        }

        // SWARM PROMPT KEYWORD TRIGGER
        if (isPromptSwarmTrigger && !swarmVisualized) {
          swarmVisualized = true;
          (async () => { await triggerSwarmVisualization(promptText, bubble, model); })();
        }

        if (!fullContent) {
          window.dispatchEvent(new CustomEvent('agent-typing-start', { detail: { status: 'Writing response' } }));
        }

        fullContent += token;
        requestThrottledRender();
        updateSplitPaneUrl(fullContent);
      };

      const onReasoningCb = (reasoningDelta) => {
        // onReasoning callback
        
        // Ensure we have a bubble
        ensureAssistantBubble();

        // SWARM PROMPT KEYWORD TRIGGER
        if (isPromptSwarmTrigger && !swarmVisualized) {
          swarmVisualized = true;
          (async () => { await triggerSwarmVisualization(promptText, bubble, model); })();
        }

        if (firstReasoningToken) {
          firstReasoningToken = false;
          thinkingStartTime = Date.now();
          window.dispatchEvent(new CustomEvent('agent-typing-start', { detail: { status: 'Thinking' } }));

          // Create thinking block
          let blocksContainer = bubble.querySelector('.message-collapsible-blocks');
          cotSection = createActivityRow({
            type: 'active',
            label: 'Thinking...',
            statusText: '',
            contentHtml: 'Thinking...',
            defaultOpen: true
          });
          blocksContainer.appendChild(cotSection);

          cotContentDiv = cotSection.querySelector('.activity-content-inner');
        }

        accumulatedReasoning += reasoningDelta;
        if (cotContentDiv) {
          cotContentDiv.textContent = accumulatedReasoning;
        }
        chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
      };

      const onToolUsageCb = (toolUsage) => {
        // onToolUsage callback
        
        // Ensure we have a bubble
        ensureAssistantBubble();

        // AGENTIC DECISION TRIGGER FOR SWARM: trigger visualizer when delegate_task tool starts
        if (toolUsage.type === 'tool_start' && toolUsage.name === 'delegate_task') {
          if (!swarmVisualized) {
            swarmVisualized = true;
            (async () => { await triggerSwarmVisualization(promptText, bubble, model); })();
          }
        }

        if (toolUsage.type === 'tool_start') {
          if (toolUsage.name === 'swarm_router' || toolUsage.name === 'delegate_task') {
            return; // Skip rendering internal swarm tools
          }
          showToolIndicator(toolUsage.name);
          window.dispatchEvent(new CustomEvent('agent-tool-start', { detail: { name: toolUsage.name, id: toolUsage.id, args: toolUsage.args || {} } }));

          // Save to toolCalls list
          const toolCall = { id: toolUsage.id, name: toolUsage.name, args: toolUsage.args || {}, status: 'running' };
          streamedToolCalls.push(toolCall);

          const toolLabel = TOOL_LABELS[toolUsage.name] || toolUsage.name;
          let activeLabel = `Running tool: ${toolLabel}...`;
          if (toolUsage.name.includes('browser')) {
            activeLabel = 'Generating project workflow...';
          }

          // Create active activity row
          let blocksContainer = bubble.querySelector('.message-collapsible-blocks');
          const toolSection = createActivityRow({
            type: 'active',
            label: activeLabel,
            contentHtml: formatToolArgs(toolUsage.name, toolUsage.args),
            defaultOpen: true
          });
          blocksContainer.appendChild(toolSection);

          toolBlocksMap[toolUsage.id] = {
            blockElement: toolSection,
            labelSpan: toolSection.querySelector('.activity-label-span'),
            contentContainer: toolSection.querySelector('.activity-content-container'),
            chevronSvg: toolSection.querySelector('.activity-chevron'),
            iconSpan: toolSection.querySelector('.activity-icon-span'),
            detailWrapper: toolSection.querySelector('.activity-detail-wrapper')
          };
        } else if (toolUsage.type === 'tool_complete') {
          if (toolUsage.name === 'swarm_router' || toolUsage.name === 'delegate_task') {
            return; // Skip rendering internal swarm tools
          }
          hideToolIndicator(toolUsage.name);
          window.dispatchEvent(new CustomEvent('agent-tool-complete', { detail: { name: toolUsage.name, id: toolUsage.id } }));

          // Update status
          const tc = streamedToolCalls.find(x => x.id === toolUsage.id);
          if (tc) tc.status = 'complete';

          // Update UI block and collapse it
          const mapEntry = toolBlocksMap[toolUsage.id];
          if (mapEntry) {
            if (mapEntry.iconSpan) {
              mapEntry.iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
            }
            if (mapEntry.labelSpan) {
              mapEntry.labelSpan.textContent = 'Viewed';
              mapEntry.labelSpan.style.color = '#4B5563';
            }
            if (mapEntry.detailWrapper) {
              const detailHtml = getToolDetailHtml(toolUsage.name, tc ? tc.args : null);
              mapEntry.detailWrapper.innerHTML = detailHtml;
            }
            if (mapEntry.contentContainer) {
              mapEntry.contentContainer.style.maxHeight = '0px';
              mapEntry.contentContainer.style.padding = '0px 12px 0px 24px';
            }
            if (mapEntry.chevronSvg) {
              mapEntry.chevronSvg.style.transform = 'rotate(0deg)';
            }
          }
        }
      };

      let reply;
      if (promptText.toLowerCase().includes("summarize my last gmail") || promptText.toLowerCase().includes("summarize my gmail")) {
        const mockResponse = `Your last Gmail was a security alert from Google sent at 11:01 AM GMT on June 28, 2026. The email warned that you allowed "zodzy" (zedstoreofficial@gmail.com) access to some of your Google Account data, and advised that if you didn't authorize this, someone else may be trying to access your account.

I'll tackle this literature review project by creating specialized sub-agents and working in parallel. Let me start by setting up the workflow and creating the necessary agents.`;
        
        reply = mockResponse;
        
        // Staggered token stream simulation
        let words = mockResponse.split(" ");
        let currentWordIndex = 0;
        
        // Initial thinking time simulation before streaming content
        onReasoningCb("Thinking... verifying access... reading mailbox...\n");
        await new Promise(r => setTimeout(r, 600));

        // AGENTIC MOCK TRIGGER: simulate a browser_navigate tool call start (Onboarding Demo)
        onToolUsageCb({
          type: 'tool_start',
          name: 'browser_navigate',
          id: 'mock-browser-1',
          args: { url: 'https://example.com/onboarding' }
        });

        await new Promise((resolve) => {
          const tokenInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
              const token = words[currentWordIndex] + " ";
              onTokenCb(token);
              currentWordIndex++;
            } else {
              clearInterval(tokenInterval);
              resolve();
            }
          }, 30);
        });

        // Simulate browser_navigate tool completion
        onToolUsageCb({
          type: 'tool_complete',
          name: 'browser_navigate',
          id: 'mock-browser-1'
        });

        // Emit final active spinner row simulating "Generating project workflow..."
        onToolUsageCb({
          type: 'tool_start',
          name: 'browser_navigate',
          id: 'mock-active-1',
          args: { url: 'https://example.com/workflow' }
        });
      } else if (promptText.toLowerCase().includes("rtx 5090") || promptText.toLowerCase().includes("rtx5090")) {
        const mockResponse = `I've initiated a search across multiple retailers and tech forums to locate the cheapest price for the NVIDIA RTX 5090 Founders Edition and third-party partner cards. 

Here are the current findings:
1. **NVIDIA Founders Edition** — $1,999 (if you can get it from Best Buy/NVIDIA)
2. **MSI Ventus 3X OC** — $2,020–$2,070 (best value among third-party)
3. **Zotac Solid** — $2,050–$2,100 (solid budget option)

📌 **Tips to Get One Cheap**
- Sign up for stock alerts (HotStock, NowInStock)
- Check Best Buy, B&H, Newegg at random times
- Micro Center in-store if you're near one
- Avoid eBay scalpers (3-5x markup)
- Wait 2–3 months for supply to stabilize`;
        
        reply = mockResponse;
        
        // Staggered token stream simulation
        let words = mockResponse.split(" ");
        let currentWordIndex = 0;
        
        // Initial thinking time simulation before streaming content
        onReasoningCb("Thinking... searching retailers... comparing prices...\n");
        await new Promise(r => setTimeout(r, 600));

        // Trigger Swarm Visualization since it's a swarm prompt
        if (!swarmVisualized) {
          swarmVisualized = true;
          (async () => { await triggerSwarmVisualization(promptText, ensureAssistantBubble(), model); })();
        }

        await new Promise((resolve) => {
          const tokenInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
              const token = words[currentWordIndex] + " ";
              onTokenCb(token);
              currentWordIndex++;
            } else {
              clearInterval(tokenInterval);
              resolve();
            }
          }, 30);
        });

      } else {
        if (effectiveMode === 'search' && isPromptSwarmTrigger) {
          // Agent Mode: trigger triggerSwarmVisualization directly and return early
          window.dispatchEvent(new CustomEvent('agent-typing-start', { detail: { status: 'Orchestrating swarm' } }));
          ensureAssistantBubble();
          await triggerSwarmVisualization(promptText, bubble, model);
          showStopButton(false);
          clearAllToolIndicators();
          return;
        }
        reply = await callRealAPI(model, conversationHistory, onTokenCb, abortController.signal, onReasoningCb, onToolUsageCb);
      }

      showStopButton(false);
      clearAllToolIndicators();

      // Finalize thinking duration if thinking was still active at stream end
      if (!hasEndedThinking && thinkingStartTime) {
        hasEndedThinking = true;
        const duration = Math.round((Date.now() - thinkingStartTime) / 1000);
        const durationText = duration <= 1 ? '1s' : `${duration}s`;
        if (cotSection) {
          const iconSpan = cotSection.querySelector('.activity-icon-span');
          if (iconSpan) {
            iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
          }
          const labelSpan = cotSection.querySelector('.activity-label-span');
          if (labelSpan) {
            labelSpan.textContent = `Thought for ${durationText}`;
            labelSpan.style.color = '#4B5563';
          }
          const statusSpan = cotSection.querySelector('.activity-status-text');
          if (statusSpan) {
            statusSpan.textContent = '';
          }
          const contentContainer = cotSection.querySelector('.activity-content-container');
          if (contentContainer) {
            contentContainer.style.maxHeight = '0px';
            contentContainer.style.padding = '0px 12px 0px 24px';
          }
          const chevron = cotSection.querySelector('.activity-chevron');
          if (chevron) {
            chevron.style.transform = 'rotate(0deg)';
          }
        }
      }

      // Force final synchronous render
      performRender();

      // Agentic connect card: model emits [CONNECT:plugin_id] when it needs a service
      const connectCardHtml = _renderConnectCardIfNeeded(reply, promptText);
      let displayText = reply;
      if (connectCardHtml) {
        displayText = reply.replace(/\[CONNECT:[a-z0-9_-]+\]\s*/i, '').trim();
      }

      if (bubble && bubble.parentNode) {
        let textContainer = bubble.querySelector('.cot-response-text-container');
        if (!textContainer) {
          textContainer = document.createElement('div');
          textContainer.className = 'cot-response-text-container';
          bubble.appendChild(textContainer);
        }
        textContainer.innerHTML = renderMarkdown((displayText || '').trimStart());
        bubble.classList.remove('error-bubble');
      }
      // Append connect card as a separate assistant message
      if (connectCardHtml) {
        appendMessage('assistant', connectCardHtml);
      }

      // Save to conversationHistory and active session
      conversationHistory.push({
        role: 'assistant',
        content: displayText.trimStart(),
        reasoning: accumulatedReasoning,
        tool_calls: JSON.parse(JSON.stringify(streamedToolCalls))
      });
      const active = tasksStore.tasks.find(t => t.id === tasksStore.activeId);
      if (active) {
        active.messages.push({
          role: 'assistant',
          content: reply,
          reasoning: accumulatedReasoning,
          tool_calls: JSON.parse(JSON.stringify(streamedToolCalls))
        });
        tasksStore.notify();
      }

      const blocks = extractCodeBlocks(reply);
      if (blocks.length > 0) {
        openArtifact(blocks[0].lang, blocks[0].code);
      }

      if (bubble && bubble.parentNode) {
        let textContainer = bubble.querySelector('.cot-response-text-container');
        if (textContainer) {
          wireCodeBlockActions(textContainer);
          appendMessageActions(msgDiv, reply);
        }
      }

      if (subagentStatusBar && effectiveMode !== 'computer') {
        subagentStatusBar.style.display = 'none';
      }
    } catch (err) {
      showStopButton(false);
      clearAllToolIndicators();
      if (subagentStatusBar) {
        subagentStatusBar.style.display = 'none';
      }

      // Mark the active/last computer step in the plan panel as failed
      if (progressBody && progressBody.children.length > 0) {
        const lastIdx = progressBody.children.length - 1;
        const lastStepEl = progressBody.children[lastIdx];
        if (lastStepEl) {
          lastStepEl.style.opacity = '1';
          const textEl = lastStepEl.querySelector('.progress-step-text');
          if (textEl) {
            textEl.textContent += ' (Connection Lost)';
            textEl.style.color = '#EF4444';
          }
        }
      }

      const escapedPrompt = promptText.replace(/'/g, "\\'");
      const errorContent = `
        <div class="error-bubble" style="display: flex; flex-direction: column; gap: 8px;">
          <span class="error-title">Connection Failed</span>
          <span class="error-desc">${DOMPurify.sanitize(err.message)}</span>
          <button class="retry-btn" onclick="window.triggerQuickAction('${escapedPrompt}')" style="margin-top: 4px; padding: 6px 12px; font-size: 12px; background: #EF4444; color: white; border: none; border-radius: 6px; cursor: pointer; width: fit-content; font-weight: 600; font-family: inherit; transition: background 0.15s;">✕ Retry Message</button>
        </div>
      `;

      if (err.name === 'AbortError') {
        let textContainer = bubble ? bubble.querySelector('.cot-response-text-container') : null;
        let container = textContainer || bubble;
        if (container && bubble.parentNode) {
          container.innerHTML = renderMarkdown(fullContent || '') + '<div style="margin-top:8px;color:#9CA3AF;font-style:italic;font-size:12px;">✕ Generation stopped</div>';
        } else {
          appendMessage('assistant', renderMarkdown(fullContent || '') + '<div style="margin-top:8px;color:#9CA3AF;font-style:italic;font-size:12px;">✕ Generation stopped</div>');
        }
        
        conversationHistory.push({
          role: 'assistant',
          content: fullContent,
          reasoning: accumulatedReasoning,
          tool_calls: JSON.parse(JSON.stringify(streamedToolCalls))
        });
        const active = tasksStore.tasks.find(t => t.id === tasksStore.activeId);
        if (active) {
          active.messages.push({
            role: 'assistant',
            content: fullContent,
            reasoning: accumulatedReasoning,
            tool_calls: JSON.parse(JSON.stringify(streamedToolCalls))
          });
          tasksStore.notify();
        }
        return;
      }
      
      if (bubble && bubble.parentNode) {
        bubble.classList.add('error-bubble');
        bubble.innerHTML = errorContent;
      } else {
        appendMessage('assistant', errorContent);
      }
    } finally {
      window.dispatchEvent(new CustomEvent('agent-typing-end'));
    }
  }

  // Handle Quick Action card/pill click simulations
  window.triggerQuickAction = function(actionName) {
    setAppState(true);
    handleChatSubmission(actionName);
  };

  // List of high-quality prompt starters for shuffle
  const SHUFFLE_PROMPTS = [
    "Draft a professional email proposing a partnership with a software company",
    "Explain quantum physics to a five-year old using simple analogies",
    "Create a 30-minute high-intensity interval training (HIIT) workout plan",
    "Summarize the key differences between SQL and NoSQL databases",
    "Suggest a creative startup idea combining machine learning and agriculture",
    "Write a short, engaging story about a time-traveling developer",
    "List 5 essential tips for preparing a pitch deck for seed funding"
  ];
  let shuffleIndex = 0;

  window.triggerShuffleAction = function() {
    const input = document.getElementById('chatPromptInput');
    if (!input) return;
    
    // Cycle through prompts
    const promptText = SHUFFLE_PROMPTS[shuffleIndex];
    shuffleIndex = (shuffleIndex + 1) % SHUFFLE_PROMPTS.length;
    
    // Set text and focus input
    input.value = promptText;
    input.style.height = 'auto';
    input.style.height = (input.scrollHeight) + 'px';
    input.focus();
  };

  // Initialize chatbox with send handler that transitions to active state
  initChatBox((promptText) => {
    setAppState(true);
    handleChatSubmission(promptText);
  });

  // Listen for React CombinedComposer send events
  window.addEventListener('react-composer-send', (e) => {
    const text = e.detail?.text;
    if (text) {
      setAppState(true);
      handleChatSubmission(text);
    }
  });

  // ── Stop Button ──────────────────────────────────────────────────────
  document.getElementById('stopGenerationBtn')?.addEventListener('click', async () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    showStopButton(false);
    clearAllToolIndicators();

    const activeTaskId = tasksStore.activeId;
    if (activeTaskId) {
      try {
        await fetch(`/api/chat/${activeTaskId}/stop`, { method: 'POST' });
      } catch (e) {
        console.warn('Failed to send stop signal to backend:', e);
      }
    }
  });

  // ── Voice Input ──────────────────────────────────────────────────────
  let mediaRecorder = null;
  let audioChunks = [];
  let isRecording = false;
  const voiceBtn = document.getElementById('voiceInputBtn');

  if (voiceBtn && 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    voiceBtn.addEventListener('click', () => {
      if (isRecording) {
        if (recognition) { recognition.stop(); recognition = null; }
        voiceBtn.classList.remove('voice-recording');
        isRecording = false;
        return;
      }
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        chatPromptInput.value = transcript;
      };

      recognition.onerror = () => {
        voiceBtn.classList.remove('voice-recording');
        isRecording = false;
        recognition = null;
      };

      recognition.onend = () => {
        voiceBtn.classList.remove('voice-recording');
        isRecording = false;
        recognition = null;
      };

      recognition.start();
      voiceBtn.classList.add('voice-recording');
      isRecording = true;
    });
  } else {
    voiceBtn.title = 'Voice input not supported in this browser';
    voiceBtn.style.opacity = '0.4';
    voiceBtn.style.cursor = 'not-allowed';
  }

  // ── File Upload ──────────────────────────────────────────────────────
  const fileInput = document.getElementById('fileInput');
  const attachBtn = document.getElementById('attachBtn');
  const filePreviewChips = document.getElementById('filePreviewChips');
  window._attachedFiles = [];

  attachBtn?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', async (e) => {
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB limit
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (file.size > maxSizeBytes) {
        alert(`File "${file.name}" exceeds the 5MB size limit.`);
        continue;
      }

      const chip = document.createElement('div');
      chip.className = 'file-chip';

      const mediaWrapper = document.createElement('div');
      mediaWrapper.className = 'file-chip-thumb-wrapper';
      
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.className = 'file-chip-thumb';
        img.src = URL.createObjectURL(file);
        mediaWrapper.appendChild(img);
      } else {
        // Render FileCodeIcon SVG
        mediaWrapper.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="file-chip-icon"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/></svg>`;
      }
      chip.appendChild(mediaWrapper);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'file-chip-content';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'file-chip-name';
      nameSpan.textContent = file.name;
      contentDiv.appendChild(nameSpan);

      const metaSpan = document.createElement('span');
      metaSpan.className = 'file-chip-meta';
      const sizeStr = (file.size / 1024).toFixed(0) + ' KB';
      const extension = file.name.split('.').pop().toUpperCase();
      metaSpan.textContent = `${extension} · ${sizeStr}`;
      contentDiv.appendChild(metaSpan);

      chip.appendChild(contentDiv);

      const removeBtn = document.createElement('span');
      removeBtn.className = 'file-chip-remove';
      removeBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      removeBtn.addEventListener('click', () => {
        chip.remove();
        window._attachedFiles = window._attachedFiles.filter(f => f.name !== file.name);
        if (window._attachedFiles.length === 0) {
          filePreviewChips.style.display = 'none';
        }
      });
      chip.appendChild(removeBtn);

      filePreviewChips.style.display = 'flex';
      filePreviewChips.appendChild(chip);

      // Read content
      let content = '';
      if (file.type.startsWith('image/')) {
        content = '[Image: ' + file.name + ']';
      } else if (file.type.startsWith('text/') || file.name.match(/\.(txt|md|json|xml|html|css|js|ts|py|rb|go|rs|java|cpp|c|h|sql|sh|yaml|yml|toml|csv)$/i)) {
        content = await file.text();
      } else {
        content = '[File: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)]';
      }

      window._attachedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        content: content
      });
    }
    e.target.value = '';
  });

  // ── Paste image from clipboard ────────────────────────────────────────
  chatPromptInput?.addEventListener('paste', async (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let hasImage = false;
    
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        hasImage = true;
        const file = item.getAsFile();
        if (!file) continue;
        
        const fileName = file.name || `pasted-image-${Date.now()}.png`;
        const renamedFile = new File([file], fileName, { type: file.type });
        
        const maxSizeBytes = 5 * 1024 * 1024; // 5MB limit
        if (renamedFile.size > maxSizeBytes) {
          alert(`Pasted file "${renamedFile.name}" exceeds the 5MB size limit.`);
          continue;
        }
        
        const chip = document.createElement('div');
        chip.className = 'file-chip';
        
        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = 'file-chip-thumb-wrapper';
        
        const img = document.createElement('img');
        img.className = 'file-chip-thumb';
        img.src = URL.createObjectURL(renamedFile);
        mediaWrapper.appendChild(img);
        chip.appendChild(mediaWrapper);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'file-chip-content';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'file-chip-name';
        nameSpan.textContent = renamedFile.name;
        contentDiv.appendChild(nameSpan);
        
        const metaSpan = document.createElement('span');
        metaSpan.className = 'file-chip-meta';
        const sizeStr = (renamedFile.size / 1024).toFixed(0) + ' KB';
        const extension = renamedFile.name.split('.').pop().toUpperCase();
        metaSpan.textContent = `${extension} · ${sizeStr}`;
        contentDiv.appendChild(metaSpan);
        
        chip.appendChild(contentDiv);
        
        const removeBtn = document.createElement('span');
        removeBtn.className = 'file-chip-remove';
        removeBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        removeBtn.addEventListener('click', () => {
          chip.remove();
          window._attachedFiles = window._attachedFiles.filter(f => f.name !== renamedFile.name);
          if (window._attachedFiles.length === 0) {
            filePreviewChips.style.display = 'none';
          }
        });
        chip.appendChild(removeBtn);
        
        filePreviewChips.style.display = 'flex';
        filePreviewChips.appendChild(chip);
        
        const content = '[Image: ' + renamedFile.name + ']';
        window._attachedFiles.push({
          name: renamedFile.name,
          type: renamedFile.type,
          size: renamedFile.size,
          content: content
        });
      }
    }
    
    if (hasImage) {
      e.preventDefault();
    }
  });

  // ── Drag & Drop file upload ───────────────────────────────────────────
  const chatInputArea = document.querySelector('.chat-container');
  if (chatInputArea) {
    chatInputArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      chatInputArea.style.borderColor = '#3B82F6';
    });
    chatInputArea.addEventListener('dragleave', () => {
      chatInputArea.style.borderColor = '';
    });
    chatInputArea.addEventListener('drop', async (e) => {
      e.preventDefault();
      chatInputArea.style.borderColor = '';
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const dt = new DataTransfer();
        files.forEach(f => dt.items.add(f));
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }

  // ── Web Search Toggle ──────────────────────────────────────────────────
  let webSearchEnabled = false;
  const webSearchBtn = document.getElementById('webSearchGlobeBtn');
  if (webSearchBtn) {
    webSearchBtn.addEventListener('click', () => {
      webSearchEnabled = !webSearchEnabled;
      webSearchBtn.style.background = webSearchEnabled ? '#DBEAFE' : '';
      webSearchBtn.style.color = webSearchEnabled ? '#2563EB' : '';
      webSearchBtn.title = webSearchEnabled ? 'Web search on' : 'Web search off';
    });
  }

  // ── Desktop Pop-up (Computer Desktop above chatbox) ─────────────
  const desktopFrame = document.getElementById('desktopFrame');
  const desktopConnectingOverlay = document.getElementById('desktopConnectingOverlay');
  const subagentComputerPopup = document.getElementById('subagentComputerPopup');
  const closeComputerPopupBtn = document.getElementById('closeComputerPopupBtn');
  const modeCapsule = document.getElementById('modeCapsule');
  const closeSubagentStatusBtn = document.getElementById('closeSubagentStatusBtn');
  const subagentStatusBar = document.getElementById('subagentStatusBar');
  const subagentThumbnail = document.getElementById('subagentThumbnail');

  let desktopStreamStarted = false;
  let desktopPollInterval = null;
  let desktopPollStopped = false;
  const DEFAULT_HF_SPACE_URL = 'https://bkarthikeyan-browser-agent-stream.hf.space';
  const LEGACY_HF_SPACE_URLS = new Set([
    'https://bkarthikeyan-desktop-agent.hf.space',
  ]);

  // Set default HF Space URL only on non-localhost (cloud mode)
  const savedHfSpaceUrl = (localStorage.getItem('hf_space_url') || '').replace(/\/$/, '');
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (LEGACY_HF_SPACE_URLS.has(savedHfSpaceUrl)) {
    localStorage.setItem('hf_space_url', DEFAULT_HF_SPACE_URL);
  } else if (!isLocal && !localStorage.getItem('hf_space_url') && !localStorage.getItem('desktop_agent_url')) {
    localStorage.setItem('hf_space_url', DEFAULT_HF_SPACE_URL);
  }

  // On localhost: set/update noVNC URL (versioned so it auto-updates when URL changes)
  const KASM_URL_VERSION = '3';
  const CORRECT_KASM_URL = 'http://localhost:6902/vnc.html?autoconnect=true&password=headless&resize=scale&reconnect=true';
  if (isLocal && localStorage.getItem('kasm_url_version') !== KASM_URL_VERSION) {
    localStorage.setItem('kasm_url', CORRECT_KASM_URL);
    localStorage.setItem('kasm_url_version', KASM_URL_VERSION);
  }


  function updateSplitPaneUrl(content) {
    const urlEl = document.getElementById('splitPaneHeaderUrl');
    if (!urlEl) return;
    const urlMatch = content.match(/https?:\/\/[^\s)"\]>]+/);
    if (urlMatch) {
      urlEl.href = urlMatch[0];
      urlEl.textContent = urlMatch[0];
      urlEl.style.display = 'inline';
    } else {
      urlEl.textContent = '';
      urlEl.style.display = 'none';
    }
  }

  function getVncBaseUrl() {
    // Sandbox has its own VNC on port 8080
    let agentUrl = localStorage.getItem('desktop_agent_url');
    if (agentUrl) {
      try {
        const host = agentUrl.split('//')[1]?.split(':')[0]?.split('/')[0];
        if (host) return `http://${host}:8080`;
      } catch (e) {}
    }
    return 'http://localhost:8080';
  }

  function getAgentWsUrl() {
    // If HF Space is configured, use its WebSocket endpoint
    const hfUrl = localStorage.getItem('hf_space_url');
    if (hfUrl) {
      const base = hfUrl.replace(/\/$/, '').replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');
      return base + '/ws';
    }
    // Otherwise use desktop_agent_url or localhost default
    let agentUrl = localStorage.getItem('desktop_agent_url');
    if (agentUrl) return agentUrl;
    const host = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? window.location.hostname : '127.0.0.1';
    return `ws://${host}:8765/ws`;
  }

  function startDesktopStream() {
    if (desktopStreamStarted || !desktopFrame) return;
    desktopStreamStarted = true;

    // ── Priority 1: Kasm / noVNC URL (local desktop) ───────────────────
    const kasmUrl = localStorage.getItem('kasm_url');
    if (kasmUrl) {
      desktopFrame.style.display = 'block';
      desktopFrame.src = kasmUrl;
      const urlEl = document.getElementById('splitPaneHeaderUrl');
      if (urlEl) { urlEl.textContent = kasmUrl; urlEl.href = kasmUrl; urlEl.style.display = 'inline'; }
      const browserLabel = document.getElementById('splitPaneBrowserLabel');
      if (browserLabel) browserLabel.textContent = 'Zed is using Desktop';
      const msgEl = document.getElementById('desktopConnectingMsg');
      if (msgEl) msgEl.textContent = 'Connecting to desktop at ' + new URL(kasmUrl).host + '…';
      desktopFrame.onload = () => { if (desktopConnectingOverlay) desktopConnectingOverlay.style.display = 'none'; };
      // noVNC is cross-origin so onload may not fire — hide overlay after 4s
      setTimeout(() => { if (desktopConnectingOverlay) desktopConnectingOverlay.style.display = 'none'; }, 4000);
      return;
    }

    // ── Priority 2: HF Space cloud desktop (noVNC via WebSocket) ───────
    const hfSpaceUrl = localStorage.getItem('hf_space_url');
    if (hfSpaceUrl) {
      // noVNC: WebSocket-based VNC stream — works in any browser/iframe
      // Cross-origin WebSockets are NOT blocked by browsers (unlike cookies/WebRTC TURN)
      const baseUrl = hfSpaceUrl.replace(/\/$/, '');
      desktopFrame.style.display = 'block';
      // Load noVNC HTML5 client with autoconnect params
      desktopFrame.src = baseUrl + '/stream/vnc.html?autoconnect=true&reconnect=true&reconnect_delay=2000&quality=6&compression=2&view_only=false&show_dot=true';
      // Update URL in header
      const urlEl = document.getElementById('splitPaneHeaderUrl');
      if (urlEl) {
        urlEl.innerHTML = `<a href="${baseUrl}" target="_blank" style="color:#3B82F6;text-decoration:none;">${baseUrl}</a>`;
      }
      // Hide connecting overlay once iframe loads (noVNC connects via WebSocket)
      desktopFrame.onload = () => {
        if (desktopConnectingOverlay) desktopConnectingOverlay.style.display = 'none';
      };
      // Fallback: hide overlay after 10s (noVNC may take a few seconds to handshake)
      setTimeout(() => { if (desktopConnectingOverlay) desktopConnectingOverlay.style.display = 'none'; }, 10000);
    } else {
      // Live noVNC stream from sandbox
      const sandboxUrl = getVncBaseUrl();
      desktopFrame.src = sandboxUrl + '/vnc/index.html?autoconnect=true&resize=scale&reconnect=1&path=websockify';
      desktopFrame.onload = () => {
        if (desktopConnectingOverlay) {
          desktopConnectingOverlay.style.display = 'none';
        }
        // Signal ready
        try { window.dispatchEvent(new CustomEvent('desktop-ready')); } catch(e) {}
      };
    }

    // Also load the stream into the thumbnail VNC frame
    const thumbnailFrame = document.getElementById('thumbnailFrame');
    const thumbnailPlaceholder = document.getElementById('thumbnailPlaceholder');
    if (thumbnailFrame) {
      const hfSpaceUrl2 = localStorage.getItem('hf_space_url');
      if (hfSpaceUrl2) {
        // Load Selkies /stream/ directly — no screenshot polling
        thumbnailFrame.src = hfSpaceUrl2.replace(/\/$/, '') + '/stream/';
      } else {
        thumbnailFrame.src = getVncBaseUrl() + '/vnc/index.html?autoconnect=true&resize=scale&reconnect=1&path=websockify';
      }
      if (thumbnailPlaceholder) thumbnailPlaceholder.style.display = 'none';
    }
  }

  function startScreenshotPolling() {
    if (desktopPollInterval) return;
    desktopFrame.src = 'about:blank';
    if (desktopConnectingOverlay) {
      desktopConnectingOverlay.innerHTML = '<span style="font-size: 13px; color: #999;">Desktop connected</span>';
      setTimeout(() => { if (desktopConnectingOverlay) desktopConnectingOverlay.style.display = 'none'; }, 500);
    }
    // Poll screenshot every 2s and display as image
    desktopFrame.style.display = 'none';
    const img = document.createElement('img');
    img.id = 'desktopScreenshotImg';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.background = '#000';
    const container = desktopFrame.parentElement;
    if (container) container.appendChild(img);
    desktopPollInterval = setInterval(() => {
      img.src = 'http://127.0.0.1:7777/screenshot?_t=' + Date.now();
    }, 2000);
  }

  function stopDesktopPolling() {
    if (desktopPollInterval) {
      clearInterval(desktopPollInterval);
      desktopPollInterval = null;
    }
    const img = document.getElementById('desktopScreenshotImg');
    if (img) img.remove();
    if (desktopFrame) desktopFrame.style.display = '';
    // Stop thumbnail VNC stream
    const thumbnailFrame = document.getElementById('thumbnailFrame');
    const thumbnailPlaceholder = document.getElementById('thumbnailPlaceholder');
    if (thumbnailFrame) thumbnailFrame.src = 'about:blank';
    if (thumbnailPlaceholder) thumbnailPlaceholder.style.display = 'flex';
  }

  function toggleComputerSplit(show) {
    const mainContent = document.getElementById('mainContent');
    const computerSplitPane = document.getElementById('computerSplitPane');
    if (!mainContent || !computerSplitPane) return;
    
    const isOpen = mainContent.classList.contains('computer-split-mode');
    const shouldShow = show !== undefined ? show : !isOpen;
    
    if (shouldShow) {
      mainContent.classList.add('computer-split-mode');
      computerSplitPane.style.display = 'flex';

      // Close agent panel if open — they are mutually exclusive
      const agentSplitPane = document.getElementById('agentSplitPane');
      if (agentSplitPane) agentSplitPane.style.display = 'none';
      mainContent.classList.remove('agent-split-mode');
      
      // Show VNC viewport, hide agent content, show LIVE badge
      const viewport = document.getElementById('splitPaneViewport');
      if (viewport) viewport.style.display = 'block';
      const agentContent = document.getElementById('splitPaneAgentContent');
      if (agentContent) agentContent.style.display = 'none';
      const liveBadge = document.getElementById('splitPaneLiveBadge');
      if (liveBadge) liveBadge.style.display = 'flex';
      
      // Sync mode capsule UI state
      const modeCapsule = document.getElementById('modeCapsule');
      if (modeCapsule) {
        const computerOpt = modeCapsule.querySelector('[data-mode="computer"]');
        if (computerOpt && !computerOpt.classList.contains('active')) {
          modeCapsule.querySelectorAll('.mode-capsule-option').forEach(opt => opt.classList.remove('active'));
          computerOpt.classList.add('active');
          const modeSlider = document.getElementById('modeSlider');
          if (modeSlider) {
            const capsuleRect = modeCapsule.getBoundingClientRect();
            const optRect = computerOpt.getBoundingClientRect();
            modeSlider.style.left = (optRect.left - capsuleRect.left) + 'px';
            modeSlider.style.width = optRect.width + 'px';
          }
        }
      }
      
      desktopPollStopped = false;
      desktopStreamStarted = false;
      startDesktopStream();
    } else {
      mainContent.classList.remove('computer-split-mode');
      computerSplitPane.style.display = 'none';
      stopDesktopPolling();
      
      // Sync mode capsule UI state
      const modeCapsule = document.getElementById('modeCapsule');
      if (modeCapsule) {
        const searchOpt = modeCapsule.querySelector('[data-mode="search"]');
        if (searchOpt && !searchOpt.classList.contains('active')) {
          modeCapsule.querySelectorAll('.mode-capsule-option').forEach(opt => opt.classList.remove('active'));
          searchOpt.classList.add('active');
          const modeSlider = document.getElementById('modeSlider');
          if (modeSlider) {
            const capsuleRect = modeCapsule.getBoundingClientRect();
            const optRect = searchOpt.getBoundingClientRect();
            modeSlider.style.left = (optRect.left - capsuleRect.left) + 'px';
            modeSlider.style.width = optRect.width + 'px';
          }
        }
      }
    }
  }

  function toggleAgentSplit(show) {
    const mainContent = document.getElementById('mainContent');
    const agentSplitPane = document.getElementById('agentSplitPane');
    if (!mainContent || !agentSplitPane) return;

    const isOpen = mainContent.classList.contains('agent-split-mode');
    const shouldShow = show !== undefined ? show : !isOpen;

    // Always ensure computer split is hidden in agent mode
    const computerSplitPane = document.getElementById('computerSplitPane');

    if (shouldShow) {
      mainContent.classList.add('agent-split-mode');
      agentSplitPane.style.display = 'flex';
      if (computerSplitPane) computerSplitPane.style.display = 'none';
      mainContent.classList.remove('computer-split-mode');
    } else {
      mainContent.classList.remove('agent-split-mode');
      agentSplitPane.style.display = 'none';
    }
  }

  if (modeCapsule) {
    console.log('Mode capsule found, initializing...');
    const modeSlider = document.getElementById('modeSlider');

    function updateSlider(option, animate = true) {
      if (!modeSlider) return;
      if (!animate) modeSlider.style.transition = 'none';
      const capsuleRect = modeCapsule.getBoundingClientRect();
      const optRect = option.getBoundingClientRect();
      modeSlider.style.left = (optRect.left - capsuleRect.left) + 'px';
      modeSlider.style.width = optRect.width + 'px';
      if (!animate) requestAnimationFrame(() => { modeSlider.style.transition = ''; });
    }

    function setMode(option) {
      if (!option || option.classList.contains('active')) return;
      const mode = option.dataset.mode;
      modeCapsule.querySelectorAll('.mode-capsule-option').forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      updateSlider(option, true);
      if (mode !== 'computer') {
        toggleComputerSplit(false);
      } else {
        toggleComputerSplit(true);
      }
    }

    modeCapsule.querySelectorAll('.mode-capsule-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setMode(btn);
      });
    });

    // Initialize slider position without animation
    const activeOption = modeCapsule.querySelector('.mode-capsule-option.active');
    if (activeOption) updateSlider(activeOption, false);

    // Re-position on resize
    window.addEventListener('resize', () => {
      const opt = modeCapsule.querySelector('.mode-capsule-option.active');
      if (opt) updateSlider(opt, false);
    });
  }

  const closeSplitPaneBtn = document.getElementById('closeSplitPaneBtn');
  if (closeSplitPaneBtn) {
    closeSplitPaneBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleComputerSplit(false);
    });
  }

  const closeAgentPaneBtn = document.getElementById('closeAgentPaneBtn');
  if (closeAgentPaneBtn) {
    closeAgentPaneBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAgentSplit(false);
    });
  }

  const agentPaneBackBtn = document.getElementById('agentPaneBackBtn');
  if (agentPaneBackBtn) {
    agentPaneBackBtn.addEventListener('click', () => {
      const overview = document.getElementById('agentPaneOverview');
      const details = document.getElementById('agentPaneDetailsView');
      if (overview) overview.style.display = 'flex';
      if (details) details.style.display = 'none';
    });
  }

  const settingsSplitPaneBtn = document.getElementById('settingsSplitPaneBtn');
  if (settingsSplitPaneBtn) {
    settingsSplitPaneBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentKasm = localStorage.getItem('kasm_url') || 'http://localhost:6902/vnc.html?autoconnect=true&password=headless&resize=scale&reconnect=true';
      const url = prompt(
        'Desktop URL\n\n• Local Kasm:  https://localhost:6901\n• HF Space:   https://your-space.hf.space\n\nLeave blank to reset to default Kasm URL.',
        currentKasm
      );
      if (url !== null) {
        const trimmed = url.trim();
        if (trimmed) {
          if (trimmed.includes('localhost') || trimmed.includes('127.0.0.1')) {
            localStorage.setItem('kasm_url', trimmed);
            localStorage.removeItem('hf_space_url');
          } else if (trimmed.includes('.hf.space')) {
            localStorage.setItem('hf_space_url', trimmed);
            localStorage.removeItem('kasm_url');
          } else {
            localStorage.setItem('kasm_url', trimmed);
          }
        } else {
          localStorage.setItem('kasm_url', 'http://localhost:6902/vnc.html?autoconnect=true&password=headless&resize=scale&reconnect=true');
          localStorage.removeItem('hf_space_url');
        }
        desktopStreamStarted = false;
        toggleComputerSplit(false);
        setTimeout(() => toggleComputerSplit(true), 300);
      }
    });
  }


  if (closeSubagentStatusBtn && subagentStatusBar) {
    closeSubagentStatusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      subagentStatusBar.style.display = 'none';
      toggleComputerSplit(false);
    });
  }

  if (subagentThumbnail) {
    subagentThumbnail.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleComputerSplit(true);
    });
  }

  // Play / Pause simulation on control bar
  const splitPanePlayBtn = document.getElementById('splitPanePlayBtn');
  if (splitPanePlayBtn) {
    let isPaused = false;
    splitPanePlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isPaused = !isPaused;
      if (isPaused) {
        // Show play symbol
        splitPanePlayBtn.innerHTML = '<polygon points="6 4 18 12 6 20 6 4" fill="currentColor"/>';
        stopDesktopPolling();
      } else {
        // Show pause symbol
        splitPanePlayBtn.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
        startDesktopStream();
      }
    });
  }

  // Expand / Fullscreen simulation button click
  const splitPaneExpandBtn = document.getElementById('splitPaneExpandBtn');
  const computerSplitPane = document.getElementById('computerSplitPane');
  if (splitPaneExpandBtn && computerSplitPane) {
    splitPaneExpandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = computerSplitPane.style.width === '100%';
      const centerContainer = document.querySelector('.center-container');
      if (isExpanded) {
        computerSplitPane.style.width = '40%';
        if (centerContainer) centerContainer.style.display = 'flex';
      } else {
        computerSplitPane.style.width = '100%';
        if (centerContainer) centerContainer.style.display = 'none';
      }
    });
  }

  // Collapse / Expand Task progress panel click
  const progressHeader = document.getElementById('splitPaneProgressHeader');
  const progressBody = document.getElementById('splitPaneProgressBody');
  const progressChevron = document.getElementById('splitPaneProgressChevron');
  if (progressHeader && progressBody && progressChevron) {
    progressHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = progressBody.style.display === 'none';
      progressBody.style.display = isCollapsed ? 'flex' : 'none';
      progressChevron.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(-180deg)';
    });
  }

  // Static input placeholder
  const promptInput = document.getElementById('chatPromptInput');
  if (promptInput) {
    promptInput.placeholder = 'Message Zed...';
  }

  // ── Real-time Agent Typing / Thinking Status Updates ─────────────────
  let activeSteps = [];
  let typingStatusContainer = null;

  function renderActiveSteps() {
    if (!chatMessagesLog) return;

    // Remove any simple typing placeholder bubbles if we are showing the premium typing status
    const existingPlaceholder = chatMessagesLog.querySelector('.typing-placeholder');
    if (existingPlaceholder) {
      existingPlaceholder.closest('.chat-message')?.remove();
    }

    if (!typingStatusContainer) {
      typingStatusContainer = document.createElement('div');
      typingStatusContainer.className = 'chat-typing-status-container';
      typingStatusContainer.id = 'chatTypingStatusContainer';
      chatMessagesLog.appendChild(typingStatusContainer);
    }

    typingStatusContainer.innerHTML = '';

    activeSteps.forEach(step => {
      const row = document.createElement('div');
      row.className = 'status-step-row';
      
      let iconHtml = '';
      if (step.status === 'in_progress') {
        if (step.icon === 'gmail') {
          iconHtml = `
            <div class="gmail-icon-container" style="position: relative; width: 14px; height: 14px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg class="gmail-logo" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: pulse 1.5s ease-in-out infinite; flex-shrink: 0;">
                <path d="M20 4H18V13.5L12 9.5L6 13.5V4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H6V10.5L12 14.5L18 10.5V20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#EA4335"/>
                <path d="M4 20H6V10.5L2 7.5V18C2 19.1 2.9 20 4 20Z" fill="#34A853"/>
                <path d="M20 20H18V10.5L22 7.5V18C22 19.1 21.1 20 20 20Z" fill="#4285F4"/>
                <path d="M18 4H20C21.1 4 22 4.9 22 6V7.5L18 4.5V4Z" fill="#FBBC05"/>
                <path d="M6 4H4C2.9 4 2 4.9 2 6V7.5L6 4.5V4Z" fill="#FBBC05"/>
              </svg>
            </div>
          `;
        } else if (step.icon === 'brain') {
          iconHtml = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
              <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
              <path d="M6 18a4 4 0 0 1-1.967-.516"/>
              <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
            </svg>
          `;
        } else {
          iconHtml = `
            <svg class="status-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" style="animation: spin 1.2s linear infinite; flex-shrink: 0;">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-dasharray="4 4" stroke-linecap="round"/>
            </svg>
          `;
        }
      } else {
        if (step.icon === 'brain') {
          iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`;
        } else if (step.icon === 'lightbulb') {
          iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
        } else if (step.icon === 'eye') {
          iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        } else if (step.icon === 'search') {
          iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
        } else if (step.icon === 'terminal') {
          iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;
        } else if (step.icon === 'gmail') {
          iconHtml = `
            <svg class="gmail-logo" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0; vertical-align: middle;">
              <path d="M20 4H18V13.5L12 9.5L6 13.5V4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H6V10.5L12 14.5L18 10.5V20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#EA4335"/>
              <path d="M4 20H6V10.5L2 7.5V18C2 19.1 2.9 20 4 20Z" fill="#34A853"/>
              <path d="M20 20H18V10.5L22 7.5V18C22 19.1 21.1 20 20 20Z" fill="#4285F4"/>
              <path d="M18 4H20C21.1 4 22 4.9 22 6V7.5L18 4.5V4Z" fill="#FBBC05"/>
              <path d="M6 4H4C2.9 4 2 4.9 2 6V7.5L6 4.5V4Z" fill="#FBBC05"/>
            </svg>
          `;
        } else {
          iconHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        }
      }

      const iconContainer = document.createElement('div');
      iconContainer.className = 'step-icon';
      iconContainer.innerHTML = iconHtml;
      row.appendChild(iconContainer);

      const titleSpan = document.createElement('span');
      titleSpan.className = 'step-title';
      if (step.status === 'in_progress' && step.icon === 'brain') {
        titleSpan.innerHTML = `<span class="reasoning-shimmer">${step.title}</span>`;
      } else {
        titleSpan.textContent = step.title;
      }
      if (step.status === 'complete') {
        titleSpan.style.color = '#9ca3af';
      } else {
        titleSpan.style.color = '#6b7280';
      }
      row.appendChild(titleSpan);

      // Add duration text for completed thought
      if (step.status === 'complete' && step.title === 'Reasoning' && step.duration) {
        const durationSpan = document.createElement('span');
        durationSpan.className = 'step-text';
        durationSpan.textContent = ` for ${step.duration}`;
        durationSpan.style.color = '#9ca3af';
        row.appendChild(durationSpan);
      }

      // Add chevron for thought/reasoning
      if (step.icon === 'brain') {
        const chevron = document.createElement('span');
        chevron.className = 'reasoning-chevron';
        chevron.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
        row.appendChild(chevron);
      }

      if (step.badge) {
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'step-badge';
        if (step.icon === 'eye' || step.name === 'browser') {
          badgeSpan.innerHTML = `
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px; display: inline-block; vertical-align: middle;">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
            <span style="vertical-align: middle;">${step.badge}</span>
          `;
        } else if (step.icon === 'gmail' || step.name?.includes('gmail')) {
          badgeSpan.innerHTML = `
            <svg class="gmail-logo" width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px; display: inline-block; vertical-align: middle; flex-shrink: 0;">
              <path d="M20 4H18V13.5L12 9.5L6 13.5V4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H6V10.5L12 14.5L18 10.5V20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#EA4335"/>
              <path d="M4 20H6V10.5L2 7.5V18C2 19.1 2.9 20 4 20Z" fill="#34A853"/>
              <path d="M20 20H18V10.5L22 7.5V18C22 19.1 21.1 20 20 20Z" fill="#4285F4"/>
              <path d="M18 4H20C21.1 4 22 4.9 22 6V7.5L18 4.5V4Z" fill="#FBBC05"/>
              <path d="M6 4H4C2.9 4 2 4.9 2 6V7.5L6 4.5V4Z" fill="#FBBC05"/>
            </svg>
            <span style="vertical-align: middle;">${step.badge}</span>
          `;
        } else {
          badgeSpan.textContent = step.badge;
        }
        row.appendChild(badgeSpan);
      }

      if (step.text) {
        const textSpan = document.createElement('span');
        textSpan.className = 'step-text';
        textSpan.textContent = (step.title ? ' ' : '') + step.text;
        if (step.status === 'complete') {
          textSpan.style.color = '#9CA3AF';
        } else {
          textSpan.style.color = '#374151';
        }
        row.appendChild(textSpan);
      }

      if (step.status === 'complete' && !step.text && step.title === 'Thought') {
        const statusSpan = document.createElement('span');
        statusSpan.className = 'step-status-completed';
        statusSpan.textContent = ' Completed';
        row.appendChild(statusSpan);
      }

      typingStatusContainer.appendChild(row);
    });

    chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
  }

  function clearActiveSteps() {
    activeSteps = [];
    if (typingStatusContainer) {
      const container = typingStatusContainer;
      container.classList.add('fade-out');
      setTimeout(() => {
        container.remove();
      }, 250);
      typingStatusContainer = null;
    }
    // Remove any lingering status containers by DOM query (but NOT typing-indicator bubbles — those are managed separately)
    if (chatMessagesLog) {
      chatMessagesLog.querySelectorAll('.chat-typing-status-container').forEach(el => el.remove());
    }
  }

  function addThoughtStep() {
    if (activeSteps.length === 0) {
      activeSteps.push({
        id: 'thought',
        name: 'thought',
        title: 'Reasoning',
        icon: 'brain',
        status: 'in_progress',
        badge: '',
        text: '',
        startTime: Date.now()
      });
      renderActiveSteps();
    }
  }

  function completeThoughtStep() {
    const step = activeSteps.find(s => s.id === 'thought');
    if (step) {
      step.status = 'complete';
      // Calculate duration if start time was tracked
      if (step.startTime) {
        const elapsed = Math.round((Date.now() - step.startTime) / 1000);
        step.duration = elapsed > 0 ? `${elapsed}s` : '<1s';
      }
      renderActiveSteps();
    }
  }

  function startToolStep(toolName, id, args = {}) {
    completeThoughtStep();

    let title = TOOL_LABELS[toolName] || toolName;
    let icon = 'terminal';
    let badgeText = '';
    let text = '';

    const nameLower = toolName.toLowerCase();
    if (nameLower.includes('gmail') || nameLower.includes('email')) {
      title = 'Gmail';
      icon = 'gmail';
      if (nameLower.includes('search')) {
        text = 'Searching emails...';
        badgeText = args.query ? `Search: "${args.query}"` : 'Gmail Search';
      } else if (nameLower.includes('get') || nameLower.includes('read')) {
        text = 'Fetching email details...';
        badgeText = args.message_id || 'Email Detail';
      } else if (nameLower.includes('send') || nameLower.includes('draft') || nameLower.includes('compose')) {
        text = 'Writing draft/sending...';
        badgeText = 'Compose';
      } else {
        text = 'Fetching emails...';
        badgeText = 'Gmail';
      }
    } else if (toolName === 'web_search') {
      title = 'Searching';
      icon = 'search';
      badgeText = args.query || 'Web Search';
    } else if (toolName === 'browser' || toolName === 'navigate' || toolName === 'get_screen' || toolName === 'click' || toolName === 'type') {
      title = 'Viewed';
      icon = 'eye';
      
      let url = args.url || '';
      if (url) {
        if (url.includes('demo') || url.includes('onboarding')) {
          badgeText = 'Onboarding Demo';
        } else {
          try {
            badgeText = new URL(url).hostname;
          } catch {
            badgeText = url;
          }
        }
      } else {
        badgeText = 'Onboarding Demo';
      }
    } else if (toolName === 'terminal' || toolName === 'shell' || toolName === 'code_execution') {
      icon = 'terminal';
      const cmd = args.command || '';
      if (cmd.includes('workflow') || cmd.includes('project')) {
        text = 'Generating project workflow...';
      } else if (cmd) {
        text = cmd.length > 40 ? cmd.slice(0, 37) + '...' : cmd;
      } else {
        text = 'Generating project workflow...';
      }
      title = '';
    } else if (toolName === 'open_tab') {
      title = 'Opening tab';
      icon = 'eye';
      badgeText = args.url ? new URL(args.url).hostname : 'New Tab';
    } else if (toolName === 'list_tabs') {
      title = 'Listing tabs';
      icon = 'eye';
      badgeText = 'All Tabs';
    } else if (toolName === 'switch_tab') {
      title = 'Switching tab';
      icon = 'eye';
      badgeText = `Tab ${args.index || 0}`;
    } else if (toolName === 'close_tab') {
      title = 'Closing tab';
      icon = 'eye';
      badgeText = `Tab ${args.index || 0}`;
    }

    // Deduplicate by id first, then by icon (so only one Gmail step shows at a time)
    let stepObj = activeSteps.find(s => s.id === id);
    if (!stepObj) {
      // If a step with the same icon exists, update it instead of adding a duplicate
      const existingByIcon = activeSteps.find(s => s.icon === icon);
      if (existingByIcon) {
        existingByIcon.id = id;
        existingByIcon.name = toolName;
        existingByIcon.title = title;
        existingByIcon.badge = badgeText;
        existingByIcon.text = text;
        existingByIcon.status = 'in_progress';
        stepObj = existingByIcon;
      } else {
        stepObj = { id, name: toolName, title, icon, status: 'in_progress', badge: badgeText, text };
        activeSteps.push(stepObj);
      }
    } else {
      stepObj.status = 'in_progress';
      stepObj.title = title;
      stepObj.icon = icon;
      stepObj.badge = badgeText;
      stepObj.text = text;
    }
    renderActiveSteps();
  }

  function completeToolStep(id) {
    const step = activeSteps.find(s => s.id === id);
    if (step) {
      step.status = 'complete';
      renderActiveSteps();
    }
  }

  window.addEventListener('agent-typing-start', (e) => {
    const activeModeOpt = document.querySelector('.chat-mode-option.active');
    const effectiveMode = activeModeOpt ? activeModeOpt.dataset.mode : 'search';
    if (effectiveMode !== 'computer') {
      return;
    }
    const status = e.detail?.status || 'Thinking';
    if (status === 'Planning' || status === 'Analyzing') {
      addThoughtStep();
    } else if (status === 'Writing response' || status === 'Synthesizing') {
      completeThoughtStep();
    }
  });

  window.addEventListener('agent-tool-start', (e) => {
    const { name, id, args } = e.detail || {};
    if (name) startToolStep(name, id, args);
  });

  window.addEventListener('agent-tool-complete', (e) => {
    const { id } = e.detail || {};
    if (id) completeToolStep(id);
  });

  window.addEventListener('agent-typing-end', () => {
    clearActiveSteps();
  });

});


  // ── Floating Selection Toolbar (Quote) and Branch Picker Helpers ───────
  const quoteToolbar = document.createElement('div');
  quoteToolbar.id = 'selectionQuoteToolbar';
  quoteToolbar.style.cssText = `
    display: none;
    position: fixed;
    z-index: 10000;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.08);
    background: #FFFFFF;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    user-select: none;
  `;
  quoteToolbar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2v4zm13 0c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2v4z"/></svg>
    <span style="font-size: 12.5px; font-weight: 500; color: #374151;">Quote</span>
  `;
  document.body.appendChild(quoteToolbar);

  let selectedText = '';
  document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (!text) {
      quoteToolbar.style.display = 'none';
      return;
    }
    
    let anchorNode = selection.anchorNode;
    if (anchorNode && anchorNode.nodeType === Node.TEXT_NODE) {
      anchorNode = anchorNode.parentNode;
    }
    const isInsideBubble = anchorNode && (anchorNode.closest('.chat-message-bubble') || anchorNode.closest('.cot-response-text-container'));
    if (!isInsideBubble) {
      quoteToolbar.style.display = 'none';
      return;
    }
    
    selectedText = text;
    
    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        quoteToolbar.style.display = 'flex';
        const left = rect.left + rect.width / 2 - quoteToolbar.offsetWidth / 2;
        const top = rect.top - quoteToolbar.offsetHeight - 8;
        quoteToolbar.style.left = `${Math.max(10, left)}px`;
        quoteToolbar.style.top = `${Math.max(10, top + window.scrollY)}px`;
      }
    } catch (e) {
      quoteToolbar.style.display = 'none';
    }
  });

  quoteToolbar.addEventListener('click', () => {
    if (selectedText && chatPromptInput) {
      const currentVal = chatPromptInput.value.trim();
      const quoteBlock = `> ${selectedText}\n\n`;
      chatPromptInput.value = currentVal ? `${currentVal}\n\n${quoteBlock}` : quoteBlock;
      chatPromptInput.focus();
      chatPromptInput.style.height = 'auto';
      chatPromptInput.style.height = chatPromptInput.scrollHeight + 'px';
      
      window.getSelection().removeAllRanges();
      quoteToolbar.style.display = 'none';
    }
  });

  function renderBranchContent(msgDiv, branchIndex) {
    const branches = JSON.parse(msgDiv.dataset.branches || '[]');
    const branch = branches[branchIndex];
    if (!branch) return;
    
    msgDiv.dataset.currentBranch = branchIndex.toString();
    
    const isAssistantFinal = msgDiv.classList.contains('assistant') && !branch.text.includes('thinking-line') && !branch.text.includes('activity-phase');
    const content = isAssistantFinal ? renderMarkdown((branch.text || '').trim()) : branch.text;
    
    const bubble = msgDiv.querySelector('.chat-message-bubble');
    if (bubble) {
      bubble.innerHTML = `<div class="message-collapsible-blocks"></div><div class="cot-response-text-container">${content}</div>`;
      
      const blocksContainer = bubble.querySelector('.message-collapsible-blocks');
      
      if (branch.reasoning && blocksContainer) {
        const cotBlock = createActivityRow({
          type: 'reasoning',
          label: 'Thinking Process',
          statusText: '',
          contentHtml: DOMPurify.sanitize(branch.reasoning),
          defaultOpen: false
        });
        blocksContainer.appendChild(cotBlock);
      }
      
      if (Array.isArray(branch.tool_calls) && blocksContainer) {
        branch.tool_calls.forEach(tc => {
          if (tc.name === 'swarm_router' || tc.name === 'delegate_task') return;
          const detailHtml = getToolDetailHtml(tc.name, tc.args);
          const stateWord = tc.status === 'complete' ? 'Completed' : tc.status === 'failed' ? 'Failed' : 'Running';
          const toolBlock = createActivityRow({
            type: 'tool',
            label: `Call tool: ${tc.name}`,
            statusText: stateWord,
            detailHtml: detailHtml,
            contentHtml: tc.result ? `<pre style="margin:0;font-family:monospace;white-space:pre-wrap;">${DOMPurify.sanitize(tc.result)}</pre>` : null,
            defaultOpen: false
          });
          blocksContainer.appendChild(toolBlock);
        });
      }
    }
    
    const picker = msgDiv.querySelector('.branch-picker-root');
    if (picker) {
      picker.querySelector('.branch-picker-current').textContent = (branchIndex + 1).toString();
      picker.querySelector('.branch-picker-total').textContent = branches.length.toString();
      
      const prevBtn = picker.querySelector('.branch-picker-prev');
      const nextBtn = picker.querySelector('.branch-picker-next');
      if (prevBtn) {
        prevBtn.disabled = (branchIndex === 0);
        prevBtn.style.opacity = (branchIndex === 0) ? '0.3' : '1';
      }
      if (nextBtn) {
        nextBtn.disabled = (branchIndex === branches.length - 1);
        nextBtn.style.opacity = (branchIndex === branches.length - 1) ? '0.3' : '1';
      }
    }
  }

  function renderBranchPicker(msgDiv) {
    let picker = msgDiv.querySelector('.branch-picker-root');
    const branches = JSON.parse(msgDiv.dataset.branches || '[]');
    if (branches.length <= 1) {
      if (picker) picker.remove();
      return;
    }
    
    if (!picker) {
      picker = document.createElement('div');
      picker.className = 'branch-picker-root';
      picker.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        margin-left: 50px;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        color: #6B7280;
        user-select: none;
      `;
      picker.innerHTML = `
        <button class="branch-picker-prev" style="display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.06); background: #FFFFFF; cursor: pointer; transition: all 0.2s; color: #4B5563;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span style="font-weight: 500; padding: 0 4px;"><span class="branch-picker-current">1</span> / <span class="branch-picker-total">2</span></span>
        <button class="branch-picker-next" style="display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.06); background: #FFFFFF; cursor: pointer; transition: all 0.2s; color: #4B5563;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      `;
      
      picker.querySelector('.branch-picker-prev').onclick = (e) => {
        e.preventDefault();
        const curr = parseInt(msgDiv.dataset.currentBranch || '0', 10);
        if (curr > 0) {
          renderBranchContent(msgDiv, curr - 1);
        }
      };
      
      picker.querySelector('.branch-picker-next').onclick = (e) => {
        e.preventDefault();
        const curr = parseInt(msgDiv.dataset.currentBranch || '0', 10);
        const total = JSON.parse(msgDiv.dataset.branches || '[]').length;
        if (curr < total - 1) {
          renderBranchContent(msgDiv, curr + 1);
        }
      };
      
      msgDiv.appendChild(picker);
    }
    
    const curr = parseInt(msgDiv.dataset.currentBranch || '0', 10);
    renderBranchContent(msgDiv, curr);
  }

  async function regenerateMessageBranch(msgDiv, promptText) {
    let branches = JSON.parse(msgDiv.dataset.branches || '[]');
    const newBranch = { text: 'Thinking...', reasoning: '', tool_calls: [] };
    branches.push(newBranch);
    msgDiv.dataset.branches = JSON.stringify(branches);
    const newBranchIndex = branches.length - 1;
    msgDiv.dataset.currentBranch = newBranchIndex.toString();
    
    renderBranchPicker(msgDiv);
    
    const bubble = msgDiv.querySelector('.chat-message-bubble');
    const blocksContainer = bubble.querySelector('.message-collapsible-blocks');
    const textContainer = bubble.querySelector('.cot-response-text-container');
    
    if (blocksContainer) blocksContainer.innerHTML = '';
    if (textContainer) textContainer.innerHTML = 'Thinking...';
    
    const state = modelsStore.getState();
    const activeModelName = state.activeModel;
    let model = state.models.find(m => m.name === activeModelName || m.id === activeModelName);
    if (!model) return;
    
    const msgDivs = Array.from(chatMessagesLog.querySelectorAll('.chat-message'));
    const targetDOMIndex = msgDivs.indexOf(msgDiv);
    const history = conversationHistory.slice(0, targetDOMIndex);
    
    history.push({ role: 'user', content: promptText });
    
    if (window._currentAbortController) {
      window._currentAbortController.abort();
    }
    const abortController = new AbortController();
    window._currentAbortController = abortController;
    showStopButton(true);
    
    let fullContent = '';
    let currentReasoning = '';
    let currentTools = [];
    let hasEndedThinking = false;
    let thinkingStartTime = Date.now();
    let cotSection = null;
    
    function ensureThinkingSection() {
      if (!cotSection && blocksContainer) {
        cotSection = createActivityRow({
          type: 'active',
          label: 'Thinking...',
          statusText: '',
          contentHtml: 'Thinking...',
          defaultOpen: true
        });
        blocksContainer.appendChild(cotSection);
      }
    }
    
    const onReasoningCb = (token) => {
      currentReasoning += token;
      ensureThinkingSection();
      if (cotSection) {
        const contentInner = cotSection.querySelector('.activity-content-inner');
        if (contentInner) {
          contentInner.innerHTML = DOMPurify.sanitize(currentReasoning);
        }
      }
      branches[newBranchIndex].reasoning = currentReasoning;
      msgDiv.dataset.branches = JSON.stringify(branches);
    };
    
    const onTokenCb = (token) => {
      if (!hasEndedThinking && thinkingStartTime) {
        hasEndedThinking = true;
        const duration = Math.round((Date.now() - thinkingStartTime) / 1000);
        const durationText = duration <= 1 ? '1s' : `${duration}s`;
        if (cotSection) {
          const iconSpan = cotSection.querySelector('.activity-icon-span');
          if (iconSpan) {
            iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
          }
          const labelSpan = cotSection.querySelector('.activity-label-span');
          if (labelSpan) {
            labelSpan.textContent = `Thought for ${durationText}`;
            labelSpan.style.color = '#4B5563';
          }
          const contentContainer = cotSection.querySelector('.activity-content-container');
          if (contentContainer) {
            contentContainer.style.maxHeight = '0px';
            contentContainer.style.padding = '0px 12px 0px 24px';
          }
          const chevron = cotSection.querySelector('.activity-chevron');
          if (chevron) {
            chevron.style.transform = 'rotate(0deg)';
          }
        }
      }
      
      fullContent += token;
      if (textContainer) {
        textContainer.innerHTML = renderMarkdown(fullContent.trimStart());
      }
      branches[newBranchIndex].text = fullContent;
      msgDiv.dataset.branches = JSON.stringify(branches);
    };
    
    const onToolUsageCb = (toolCall) => {
      if (toolCall.name === 'swarm_router' || toolCall.name === 'delegate_task') return;
      
      let existing = currentTools.find(t => t.id === toolCall.id);
      if (!existing) {
        existing = { id: toolCall.id, name: toolCall.name, args: toolCall.args, status: 'running' };
        currentTools.push(existing);
        
        const detailHtml = getToolDetailHtml(toolCall.name, toolCall.args);
        const toolBlock = createActivityRow({
          type: 'tool',
          label: `Call tool: ${toolCall.name}`,
          statusText: 'Running',
          detailHtml: detailHtml,
          contentHtml: null,
          defaultOpen: false
        });
        toolBlock.id = `tool-step-${toolCall.id}`;
        blocksContainer.appendChild(toolBlock);
      } else {
        if (toolCall.status) existing.status = toolCall.status;
        if (toolCall.result) existing.result = toolCall.result;
        
        const domBlock = document.getElementById(`tool-step-${toolCall.id}`);
        if (domBlock) {
          const statusText = domBlock.querySelector('.activity-status-text');
          if (statusText) {
            statusText.textContent = toolCall.status === 'complete' ? 'Completed' : toolCall.status === 'failed' ? 'Failed' : 'Running';
          }
          if (toolCall.result) {
            const contentContainer = domBlock.querySelector('.activity-content-container');
            if (contentContainer) {
              const contentInner = contentContainer.querySelector('.activity-content-inner');
              if (contentInner) {
                contentInner.innerHTML = `<pre style="margin:0;font-family:monospace;white-space:pre-wrap;">\${DOMPurify.sanitize(toolCall.result)}</pre>`;
              }
            }
          }
        }
      }
      branches[newBranchIndex].tool_calls = currentTools;
      msgDiv.dataset.branches = JSON.stringify(branches);
    };
    
    try {
      const reply = await callRealAPI(model, history, onTokenCb, abortController.signal, onReasoningCb, onToolUsageCb);
      
      if (!hasEndedThinking && thinkingStartTime) {
        hasEndedThinking = true;
        const duration = Math.round((Date.now() - thinkingStartTime) / 1000);
        const durationText = duration <= 1 ? '1s' : `${duration}s`;
        if (cotSection) {
          const iconSpan = cotSection.querySelector('.activity-icon-span');
          if (iconSpan) {
            iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
          }
          const labelSpan = cotSection.querySelector('.activity-label-span');
          if (labelSpan) {
            labelSpan.textContent = `Thought for ${durationText}`;
            labelSpan.style.color = '#4B5563';
          }
          const contentContainer = cotSection.querySelector('.activity-content-container');
          if (contentContainer) {
            contentContainer.style.maxHeight = '0px';
            contentContainer.style.padding = '0px 12px 0px 24px';
          }
          const chevron = cotSection.querySelector('.activity-chevron');
          if (chevron) {
            chevron.style.transform = 'rotate(0deg)';
          }
        }
      }
      
      branches[newBranchIndex].text = reply;
      msgDiv.dataset.branches = JSON.stringify(branches);
      
      conversationHistory[targetDOMIndex] = {
        role: 'assistant',
        content: reply,
        reasoning: currentReasoning,
        tool_calls: currentTools
      };
      
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error(e);
        if (textContainer) {
          textContainer.innerHTML += `<div style="color:#EF4444;margin-top:8px;font-weight:500;">✕ Connection error: ${e.message}</div>`;
        }
      }
    } finally {
      showStopButton(false);
      clearAllToolIndicators();
      renderBranchContent(msgDiv, newBranchIndex);
    }
  }
