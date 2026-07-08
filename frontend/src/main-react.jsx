import React from 'react';
import { createRoot } from 'react-dom/client';
import { CombinedComposer } from './components/assistant-ui/combined-composer';
import './index.css';

// Mount React app into the existing DOM
const container = document.getElementById('composer-trigger-popover-root');
if (container) {
  // Hide the vanilla textarea and toolbar, show React composer
  const wrapper = container.closest('.chat-input-center-wrapper');
  if (wrapper) {
    wrapper.classList.add('react-composer-active');
  }
  const chatBox = container.closest('.chat-box');
  if (chatBox) {
    chatBox.classList.add('react-composer-active');
  }

  const root = createRoot(container);
  root.render(React.createElement(CombinedComposer));
}
