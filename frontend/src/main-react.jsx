import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { UnifiedComposer } from './components/assistant-ui/unified-composer';
import './index.css';


// Mount the Unified Composer into the chat input area
const container = document.getElementById('composer-trigger-popover-root');
if (container) {
  container.style.display = 'block';
  const root = createRoot(container);
  root.render(React.createElement(UnifiedComposer));
}


