import { initSidebar } from './js/sidebar.js';
import { initModelSelector } from './js/model-selector.js';
import { initChatBox } from './js/chatbox.js';
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
  shell: 'Running command',
  open_tab: 'Opening new tab',
  list_tabs: 'Listing tabs',
  switch_tab: 'Switching tab',
  close_tab: 'Closing tab',
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
            appendMessage(msg.role, msg.content, '', msg.reasoning);
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
      // Assistant messages: copy + thumbsup + thumbsdown
      actionsDiv.innerHTML = `
        <button class="msg-action-btn" title="Copy" data-action="copy">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
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

  function appendMessage(sender, text, avatarUrlOrText = '', reasoning = '') {
    if (!chatMessagesLog) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;

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
    const content = isAssistantFinal ? renderMarkdown(text) : text;
    msgDiv.innerHTML = `
      ${headerHtml}
      <div class="chat-message-bubble">${content}</div>
    `;

    chatMessagesLog.appendChild(msgDiv);

    // Add actions to user messages immediately; assistant actions are added after response completes
    if (sender === 'user') {
      appendMessageActions(msgDiv, text, 'user');
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
    if (_activeToolIndicators[toolName]) return;
    const bar = document.getElementById('toolIndicatorBar');
    if (!bar) return;
    const el = document.createElement('div');
    el.className = 'tool-indicator-item';
    el.dataset.tool = toolName;
    el.innerHTML = `<span class="tool-spinner"></span><span>${TOOL_LABELS[toolName] || toolName}</span>`;
    bar.appendChild(el);
    bar.style.display = 'flex';
    _activeToolIndicators[toolName] = el;
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

  async function callRealAPI(model, messages, onToken, signal, onReasoning, onToolUsage) {
    const settings = model.settings || {};
    const apiKey = settings.apiKey || '';
    const rawBaseUrl = settings.baseUrl || '';
    const baseUrl = normalizeBaseUrl(rawBaseUrl).replace(/\/$/, '');
    const modelEndpoint = settings.endpoint || model.endpoint || model.id || '';
    const provider = (model.provider || '').toLowerCase();

    const isZedPro = (model.provider || '') === 'Zed Pro';
    const apiMessages = [...messages];

    // ── Zed Pro: route through backend AIAgent with full tools + dashboard awareness ──
    if (isZedPro) {
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
              try {
                const parsed = JSON.parse(trimmed.slice(6));
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
      document.getElementById('filePreviewChips').innerHTML = '';
    }

    // ── Computer mode: inject computer tools as LLM tool definitions ──
    let computerTools = [];
    let computerSystemMsg = '';
    if (effectiveMode === 'computer') {
      computerSystemMsg = 'You are a helpful AI assistant with optional computer control. For simple greetings, questions, or conversation - just respond with text directly using normal chat. Only use computer tools when the user explicitly asks you to DO something on the computer (open websites, search, click, type, etc). For computer tasks: call get_screen ONCE, execute actions efficiently (3-5 steps max), call done when finished. For chat: just respond naturally without any tools.';
      computerTools = [
        { type: 'function', function: { name: 'get_screen', description: 'Get the current screen state: URL, title, open tabs, and all interactive elements with their index, tag, text, role, and position', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'click', description: 'Click an element on screen by its index number (e.g. 0, 1, 2)', parameters: { type: 'object', properties: { index: { type: 'number', description: 'The element index from get_screen (the number in square brackets)' } }, required: ['index'] } } },
        { type: 'function', function: { name: 'type', description: 'Type text into an input field by its index', parameters: { type: 'object', properties: { index: { type: 'number', description: 'The input field index from get_screen' }, text: { type: 'string', description: 'Text to type' } }, required: ['index', 'text'] } } },
        { type: 'function', function: { name: 'press_key', description: 'Press a keyboard key', parameters: { type: 'object', properties: { key: { type: 'string', description: 'Key name: Enter, Tab, Escape, Backspace, etc.' } }, required: ['key'] } } },
        { type: 'function', function: { name: 'hotkey', description: 'Press a keyboard shortcut', parameters: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' }, description: 'Keys to press together, e.g. ["ctrl","c"]' } }, required: ['keys'] } } },
        { type: 'function', function: { name: 'scroll', description: 'Scroll the page', parameters: { type: 'object', properties: { direction: { type: 'string', enum: ['up', 'down'] }, amount: { type: 'number', description: 'Scroll amount (default 3)' } }, required: ['direction'] } } },
        { type: 'function', function: { name: 'navigate', description: 'Navigate to a URL in the browser', parameters: { type: 'object', properties: { url: { type: 'string', description: 'Full URL to navigate to (e.g. https://google.com)' } }, required: ['url'] } } },
        { type: 'function', function: { name: 'evaluate', description: 'Run JavaScript in the browser page', parameters: { type: 'object', properties: { code: { type: 'string', description: 'JavaScript code to evaluate' } }, required: ['code'] } } },
        { type: 'function', function: { name: 'shell', description: 'Execute a shell command in the sandbox', parameters: { type: 'object', properties: { command: { type: 'string', description: 'Shell command to run' } }, required: ['command'] } } },
        { type: 'function', function: { name: 'open_tab', description: 'Open a new browser tab and optionally navigate to a URL', parameters: { type: 'object', properties: { url: { type: 'string', description: 'URL to open in the new tab (default: about:blank)' } }, required: [] } } },
        { type: 'function', function: { name: 'list_tabs', description: 'List all open browser tabs with their index, title, URL, and active status', parameters: { type: 'object', properties: {}, required: [] } } },
        { type: 'function', function: { name: 'switch_tab', description: 'Switch to a specific tab by its index number', parameters: { type: 'object', properties: { index: { type: 'number', description: 'Tab index number from list_tabs' } }, required: ['index'] } } },
        { type: 'function', function: { name: 'close_tab', description: 'Close a specific tab by its index number', parameters: { type: 'object', properties: { index: { type: 'number', description: 'Tab index number to close' } }, required: ['index'] } } },
        { type: 'function', function: { name: 'done', description: 'Mark the task as complete with a summary', parameters: { type: 'object', properties: { summary: { type: 'string', description: 'Detailed summary of what was accomplished and what was found' } }, required: ['summary'] } } },
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

        let progressStepNum = 0;
        
        function addProgressStep(text, state) {
          if (!progressBody) return;
          progressStepNum++;
          const num = progressStepNum;
          const colors = { active: '#3B82F6', done: '#10B981', pending: '#D1D5DB' };
          const color = colors[state] || colors.pending;
          const opacity = state === 'pending' ? '0.7' : '1';
          
          let circleHtml = '';
          if (state === 'done') {
            circleHtml = `<div style="width:22px;height:22px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>`;
          } else if (state === 'active') {
            circleHtml = `<div style="width:22px;height:22px;border-radius:50%;background:${color};box-shadow:0 0 0 3px rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:#fff;font-size:11px;font-weight:600;">${num}</span>
            </div>`;
          } else {
            circleHtml = `<div style="width:22px;height:22px;border-radius:50%;border:2px solid ${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:${color};font-size:11px;font-weight:500;">${num}</span>
            </div>`;
          }
          
          const div = document.createElement('div');
          div.style.cssText = `display:flex;align-items:center;gap:10px;opacity:${opacity};padding:4px 0;`;
          div.innerHTML = `${circleHtml}<span style="font-size:13px;color:${state === 'pending' ? '#6B7280' : '#111827'};font-weight:${state === 'active' ? '500' : '400'};line-height:1.4;">${text}</span>`;
          progressBody.appendChild(div);
          progressBody.scrollTop = progressBody.scrollHeight;
        }

        function updateProgressStep(index, text, state) {
          if (!progressBody || !progressBody.children[index]) return;
          const colors = { active: '#3B82F6', done: '#10B981', pending: '#D1D5DB' };
          const color = colors[state] || colors.pending;
          const opacity = state === 'pending' ? '0.7' : '1';
          const el = progressBody.children[index];
          el.style.opacity = opacity;
          
          const num = index + 1;
          let circleHtml = '';
          if (state === 'done') {
            circleHtml = `<div style="width:22px;height:22px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>`;
          } else if (state === 'active') {
            circleHtml = `<div style="width:22px;height:22px;border-radius:50%;background:${color};box-shadow:0 0 0 3px rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:#fff;font-size:11px;font-weight:600;">${num}</span>
            </div>`;
          } else {
            circleHtml = `<div style="width:22px;height:22px;border-radius:50%;border:2px solid ${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="color:${color};font-size:11px;font-weight:500;">${num}</span>
            </div>`;
          }
          
          const dot = el.querySelector('div');
          if (dot) dot.outerHTML = circleHtml;
          const span = el.querySelector('span');
          if (span) { span.textContent = text; span.style.color = state === 'pending' ? '#6B7280' : '#111827'; span.style.fontWeight = state === 'active' ? '500' : '400'; }
        }

        updateStatus('Agent starting...', '0 / ?');
        addProgressStep('Waiting for instructions...', 'active');

        // Connect to desktop agent WebSocket for executing actions
        let agentUrl = localStorage.getItem('desktop_agent_url');
        if (!agentUrl) {
          const desktopAgentHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? window.location.hostname
            : '127.0.0.1'; // Fallback to local machine when hosted in cloud
          agentUrl = `ws://${desktopAgentHost}:8765/ws`;
        }
        const ws = new WebSocket(agentUrl);
        let agentStep = 0;
        const maxSteps = 7;
        let progressIndex = 0;

        // Promise that resolves when the agent sends a screen result
        let resolveScreenResult = null;
        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.type === 'screen' && resolveScreenResult) {
            resolveScreenResult(msg.text);
            resolveScreenResult = null;
          } else if (msg.type === 'thinking') {
            agentStep++;
            updateStatus(msg.text, `${agentStep} / ${maxSteps}`);
          } else if (msg.type === 'system') {
            updateStatus(msg.text, `${agentStep} / ${maxSteps}`);
          }
        };

        function waitForScreen() {
          return new Promise((resolve) => { resolveScreenResult = resolve; });
        }

        // Wait for WebSocket to open
        await new Promise((resolve, reject) => {
          ws.onopen = resolve;
          ws.onerror = () => reject(new Error('Cannot connect to desktop agent'));
          setTimeout(() => reject(new Error('Agent connection timeout')), 5000);
        });

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
          if (step === 0) {
            addProgressStep('Analyzing task...', 'active');
          } else {
            addProgressStep(`Step ${step + 1}: Planning next action...`, 'active');
            if (progressIndex > 0) updateProgressStep(progressIndex - 1, progressBody.children[progressIndex - 1]?.querySelector('span')?.textContent || '', 'done');
          }
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
                  max_tokens: 1024,
                  stream: false,
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

              llmData = await llmResp.json();
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
            // Remove the typing indicator message entirely, then append the real response
            const existingTypingMsg = chatMessagesLog.querySelector('.typing-placeholder')?.closest('.chat-message');
            if (existingTypingMsg) {
              existingTypingMsg.remove();
            }
            appendMessage('assistant', text);
            updateStatus('Task complete.', `${step + 1} / ${maxSteps}`);
            addProgressStep('Delivering result to user', 'done');
            if (progressBody && progressBody.children.length > 1) {
              updateProgressStep(progressBody.children.length - 2, progressBody.children[progressBody.children.length - 2]?.querySelector('span')?.textContent || '', 'done');
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
              updateProgressStep(progressBody.children.length - 2, progressBody.children[progressBody.children.length - 2]?.querySelector('span')?.textContent || '', 'done');
            }

            // Send action to desktop agent via WebSocket
            window.dispatchEvent(new CustomEvent('agent-tool-start', { detail: { name: actionName, id: 'comp-' + step + '-' + toolCall.id, args: args } }));
            toggleComputerSplit(true);
            
            // Send action and wait for result with timeout
            let screenResult;
            try {
              ws.send(JSON.stringify({ type: 'task', text: `execute:${JSON.stringify({ action: actionName, ...args })}` }));
              screenResult = await Promise.race([
                waitForScreen(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Action timeout')), 30000)),
                new Promise((_, reject) => {
                  const checkStopped = () => { if (stopped) reject(new Error('Stopped by user')); };
                  abortController.signal.addEventListener('abort', checkStopped);
                  // Clean up after 30s
                  setTimeout(() => abortController.signal.removeEventListener('abort', checkStopped), 30000);
                })
              ]);
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
        
        ws.close();
        
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

      let fullContent = '';
      let accumulatedReasoning = '';

      let reply = await callRealAPI(model, conversationHistory, (token) => {
        if (!fullContent) {
          window.dispatchEvent(new CustomEvent('agent-typing-start', { detail: { status: 'Writing response' } }));
          // Reuse the existing message div (with zed pro header) — just replace the bubble content
          const oldTypingIndicator = chatMessagesLog.querySelector('.typing-indicator');
          if (oldTypingIndicator) {
            const oldMsg = oldTypingIndicator.closest('.chat-message');
            if (oldMsg) {
              msgDiv = oldMsg;
              bubble = msgDiv.querySelector('.chat-message-bubble');
            }
          }
          if (!bubble) {
            // Fallback: create a new message if the old one wasn't found
            appendMessage('assistant', '');
            msgDiv = chatMessagesLog.lastElementChild;
            bubble = msgDiv.querySelector('.chat-message-bubble');
          }
          // Move the active status container to the bottom
          if (typingStatusContainer && typingStatusContainer.parentNode === chatMessagesLog) {
            chatMessagesLog.appendChild(typingStatusContainer);
          }
        }
        fullContent += token;
        if (bubble) {
          bubble.innerHTML = renderMarkdown(fullContent);
          chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
        }
      }, abortController.signal, (reasoningDelta) => {
        accumulatedReasoning += reasoningDelta;
      }, (toolUsage) => {
        if (toolUsage.type === 'tool_start') {
          showToolIndicator(toolUsage.name);
          window.dispatchEvent(new CustomEvent('agent-tool-start', { detail: { name: toolUsage.name, id: toolUsage.id, args: toolUsage.args || {} } }));
        } else if (toolUsage.type === 'tool_complete') {
          hideToolIndicator(toolUsage.name);
          window.dispatchEvent(new CustomEvent('agent-tool-complete', { detail: { name: toolUsage.name, id: toolUsage.id } }));
        }
      });

      showStopButton(false);
      clearAllToolIndicators();

      // Agentic connect card: model emits [CONNECT:plugin_id] when it needs a service
      const connectCardHtml = _renderConnectCardIfNeeded(reply, promptText);
      let displayText = reply;
      if (connectCardHtml) {
        displayText = reply.replace(/\[CONNECT:[a-z0-9_-]+\]\s*/i, '').trim();
      }

      if (bubble && bubble.parentNode) {
        bubble.innerHTML = renderMarkdown(displayText || '');
        bubble.classList.remove('error-bubble');
      }
      // Append connect card as a separate assistant message
      if (connectCardHtml) {
        appendMessage('assistant', connectCardHtml);
      }

      conversationHistory.push({ role: 'assistant', content: displayText, reasoning: accumulatedReasoning });
      const active = tasksStore.tasks.find(t => t.id === tasksStore.activeId);
      if (active) { active.messages.push({ role: 'assistant', content: reply, reasoning: accumulatedReasoning }); tasksStore.notify(); }

      const blocks = extractCodeBlocks(reply);
      if (blocks.length > 0) {
        openArtifact(blocks[0].lang, blocks[0].code);
      }

      if (bubble && bubble.parentNode) {
        const markdownHtml = renderMarkdown(reply);
        bubble.innerHTML = markdownHtml;

        wireCodeBlockActions(bubble);
        appendMessageActions(msgDiv, reply);
      }

      if (subagentStatusBar && effectiveMode !== 'computer') {
        subagentStatusBar.style.display = 'none';
      }
    } catch (err) {
      showStopButton(false);
      clearAllToolIndicators();
      if (subagentStatusBar && effectiveMode !== 'computer') {
        subagentStatusBar.style.display = 'none';
      }

      if (err.name === 'AbortError') {
        if (bubble && bubble.parentNode) {
          bubble.innerHTML = '<div style="margin-top:8px;color:#6B7280;font-style:italic;">Generation stopped</div>';
        } else {
          appendMessage('assistant', '<div style="margin-top:8px;color:#6B7280;font-style:italic;">Generation stopped</div>');
        }
        return;
      }
      if (bubble && bubble.parentNode) {
        bubble.classList.add('error-bubble');
        bubble.innerHTML = `<span class="error-title">Connection Failed</span><span class="error-desc">${DOMPurify.sanitize(err.message)}</span>`;
      } else {
        appendMessage('assistant', `<span class="error-title">Connection Failed</span><span class="error-desc">${DOMPurify.sanitize(err.message)}</span>`);
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

  // ── Stop Button ──────────────────────────────────────────────────────
  document.getElementById('stopGenerationBtn')?.addEventListener('click', () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    showStopButton(false);
    clearAllToolIndicators();
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
    const files = Array.from(e.target.files);
    for (const file of files) {
      const chip = document.createElement('div');
      chip.className = 'file-chip';

      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.className = 'file-chip-thumb';
        img.src = URL.createObjectURL(file);
        chip.appendChild(img);
      } else {
        const icon = document.createElement('span');
        icon.textContent = '📄';
        icon.style.fontSize = '14px';
        chip.appendChild(icon);
      }

      const nameSpan = document.createElement('span');
      nameSpan.className = 'file-chip-name';
      nameSpan.textContent = file.name;
      chip.appendChild(nameSpan);

      const removeBtn = document.createElement('span');
      removeBtn.className = 'file-chip-remove';
      removeBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      removeBtn.addEventListener('click', () => {
        chip.remove();
        window._attachedFiles = window._attachedFiles.filter(f => f.name !== file.name);
      });
      chip.appendChild(removeBtn);

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

  function startDesktopStream() {
    if (desktopStreamStarted || !desktopFrame) return;
    desktopStreamStarted = true;

    // Live VNC streaming through WebSocket proxy - real-time 4K
    desktopFrame.src = '/vnc_live.html';

    desktopFrame.onload = () => {
      if (desktopConnectingOverlay) {
        desktopConnectingOverlay.style.display = 'none';
      }
    };

    // Also start the thumbnail VNC stream
    const thumbnailFrame = document.getElementById('thumbnailFrame');
    const thumbnailPlaceholder = document.getElementById('thumbnailPlaceholder');
    if (thumbnailFrame) {
      thumbnailFrame.src = '/vnc_live.html';
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
      const isCollapsed = progressBody.style.maxHeight === '0px';
      progressBody.style.maxHeight = isCollapsed ? '240px' : '0px';
      progressBody.style.padding = isCollapsed ? '16px 20px' : '0 20px';
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
        } else {
          iconHtml = `
            <svg class="status-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" style="animation: spin 1.2s linear infinite; flex-shrink: 0;">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-dasharray="4 4" stroke-linecap="round"/>
            </svg>
          `;
        }
      } else {
        if (step.icon === 'lightbulb') {
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
      titleSpan.textContent = step.title;
      if (step.status === 'complete') {
        titleSpan.style.color = '#9CA3AF';
      } else {
        titleSpan.style.color = '#374151';
      }
      row.appendChild(titleSpan);

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
        title: 'Thought',
        icon: 'lightbulb',
        status: 'in_progress',
        badge: '',
        text: ''
      });
      renderActiveSteps();
    }
  }

  function completeThoughtStep() {
    const step = activeSteps.find(s => s.id === 'thought');
    if (step) {
      step.status = 'complete';
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
