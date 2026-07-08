import React from 'react';
import { createRoot } from 'react-dom/client';
import { CombinedComposer } from './components/assistant-ui/combined-composer';
import './index.css';

// Mount React CombinedComposer for slash/@ trigger popovers
const container = document.getElementById('composer-trigger-popover-root');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(CombinedComposer));
}
