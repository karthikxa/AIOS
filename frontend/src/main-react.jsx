import React from 'react';
import { createRoot } from 'react-dom/client';
import { UnifiedComposer } from './components/assistant-ui/unified-composer';
import { LibraryDemo } from './components/library-demo';
import './index.css';

// Mount the Unified Composer into the chat input area
const container = document.getElementById('composer-trigger-popover-root');
if (container) {
  container.style.display = 'block';
  const root = createRoot(container);
  root.render(React.createElement(UnifiedComposer));
}

// Mount the Library Demo into the library view page
const libraryContainer = document.getElementById('library-root');
if (libraryContainer) {
  const root = createRoot(libraryContainer);
  root.render(React.createElement(LibraryDemo));
}
