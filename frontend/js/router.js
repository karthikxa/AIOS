// Router to handle top-level view switching (Chat vs Models)

export function initRouter() {
  const navItems = document.querySelectorAll('.nav-item');
  const modelsPageView = document.getElementById('modelsPageView');
  const schedulesPageView = document.getElementById('schedulesPageView');
  const pluginsPageView = document.getElementById('pluginsPageView');
  const appHeader = document.querySelector('.app-header');
  const centerContainer = document.querySelector('.center-container');
  const mainContent = document.getElementById('mainContent');
  const computerSplitPane = document.getElementById('computerSplitPane');
  let wasComputerSplitOpen = false;

  // Helper to hide/show centerContainer, beating !important CSS rules
  function hideCenterContainer() {
    if (centerContainer) centerContainer.classList.add('center-container--hidden');
    if (appHeader) appHeader.style.display = 'none';
    
    // Deactivate split pane layout so settings pages have 100% width
    if (mainContent && mainContent.classList.contains('computer-split-mode')) {
      wasComputerSplitOpen = true;
      mainContent.classList.remove('computer-split-mode');
    }
    if (computerSplitPane) {
      computerSplitPane.style.display = 'none';
    }
  }

  function showCenterContainer() {
    if (centerContainer) centerContainer.classList.remove('center-container--hidden');
    if (appHeader) appHeader.style.display = 'flex';
    
    // Restore split pane layout if it was active in chat
    if (wasComputerSplitOpen && mainContent) {
      mainContent.classList.add('computer-split-mode');
      if (computerSplitPane) {
        computerSplitPane.style.display = 'flex';
      }
      wasComputerSplitOpen = false;
    }
  }

  function showChatView() {
    if (modelsPageView) modelsPageView.style.display = 'none';
    if (schedulesPageView) schedulesPageView.style.display = 'none';
    if (pluginsPageView) pluginsPageView.style.display = 'none';
    if (document.getElementById('agentPageView')) document.getElementById('agentPageView').style.display = 'none';
    showCenterContainer();
  }

  // Check for OAuth callback params — if present, show plugins page immediately
  const urlParams = new URLSearchParams(window.location.search);
  const oauthCallback = urlParams.has('connected') || urlParams.has('plugin_id') || urlParams.has('error');

  if (!oauthCallback) {
    // Default to "New task" on load only if not an OAuth callback
    const defaultNav = document.getElementById('navNewTask');
    if (defaultNav) {
      navItems.forEach(i => i.classList.remove('active'));
      defaultNav.classList.add('active');
      showChatView();
    }
  }

  navItems.forEach(item => {
    if (item.classList.contains('user-profile')) return;

    item.addEventListener('click', () => {
      // Set active highlight on sidebar
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Always hide connection and create agent page views on navigation clicks
      const connectPageView = document.getElementById('connectPageView');
      if (connectPageView) connectPageView.style.display = 'none';
      const createAgentPageView = document.getElementById('createAgentPageView');
      if (createAgentPageView) createAgentPageView.style.display = 'none';
      const editAgentPageView = document.getElementById('editAgentPageView');
      if (editAgentPageView) editAgentPageView.style.display = 'none';

      if (item.id === 'navModel') {
        // Transition to Models view
        if (modelsPageView) modelsPageView.style.display = 'block';
        if (schedulesPageView) schedulesPageView.style.display = 'none';
        if (pluginsPageView) pluginsPageView.style.display = 'none';
        if (document.getElementById('agentPageView')) document.getElementById('agentPageView').style.display = 'none';
        hideCenterContainer();
      } else if (item.id === 'navScheduled') {
        // Transition to Schedules view
        if (modelsPageView) modelsPageView.style.display = 'none';
        if (schedulesPageView) schedulesPageView.style.display = 'flex';
        if (pluginsPageView) pluginsPageView.style.display = 'none';
        if (document.getElementById('agentPageView')) document.getElementById('agentPageView').style.display = 'none';
        hideCenterContainer();
      } else if (item.id === 'navPlugins') {
        // Transition to Plugins view
        if (modelsPageView) modelsPageView.style.display = 'none';
        if (schedulesPageView) schedulesPageView.style.display = 'none';
        if (pluginsPageView) pluginsPageView.style.display = 'flex';
        if (document.getElementById('agentPageView')) document.getElementById('agentPageView').style.display = 'none';
        hideCenterContainer();
      } else if (item.id === 'navAgent') {
        // Transition to Agent view
        if (modelsPageView) modelsPageView.style.display = 'none';
        if (schedulesPageView) schedulesPageView.style.display = 'none';
        if (pluginsPageView) pluginsPageView.style.display = 'none';
        if (document.getElementById('agentPageView')) document.getElementById('agentPageView').style.display = 'flex';
        hideCenterContainer();
      } else {
        // Transition to Chat view (New Task, etc.)
        showChatView();
      }
    });
  });
}
export default initRouter;
