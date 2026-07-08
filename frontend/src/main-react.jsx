import React from 'react';
import { createRoot } from 'react-dom/client';
import { CombinedComposer } from './components/assistant-ui/combined-composer';
import './index.css';

// Mount React app into the existing DOM
const container = document.getElementById('composer-trigger-popover-root');
if (container) {
  // Hide the vanilla textarea and show React composer
  const wrapper = container.closest('.chat-input-center-wrapper');
  if (wrapper) {
    wrapper.classList.add('react-composer-active');
  }

  const root = createRoot(container);
  root.render(React.createElement(CombinedComposer));

  // Dispatch event when composer submits (via Enter or Send button)
  // The CombinedComposer handles this internally via ComposerPrimitive.Send
  // We listen for the composer's submit and forward it to the vanilla app
  container.addEventListener('composer-submit', (e) => {
    const text = e.detail?.text;
    if (text) {
      window.dispatchEvent(new CustomEvent('react-composer-send', { detail: { text } }));
    }
  });
}
