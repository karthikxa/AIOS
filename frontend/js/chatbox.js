// Chat Box input interactions
export function initChatBox(onSend) {
  const chatPromptInput = document.getElementById('chatPromptInput');
  const btnSend = document.getElementById('btnSend');
  const attachBtn = document.getElementById('attachBtn');
  const attachDropdown = document.getElementById('attachDropdown');

  // Attachment dropdown toggler
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

  // Auto-resize prompt textarea
  if (chatPromptInput) {
    chatPromptInput.addEventListener('input', () => {
      chatPromptInput.style.height = 'auto';
      chatPromptInput.style.height = (chatPromptInput.scrollHeight) + 'px';
    });

    // Enter submits the prompt, Shift+Enter inserts newline
    chatPromptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
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
          alert(`"${action}" is not yet implemented.`);
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
