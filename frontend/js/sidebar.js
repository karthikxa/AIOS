// Sidebar functionality
export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mobileHamburger = document.getElementById('mobileHamburger');
  const navItems = document.querySelectorAll('.nav-item');

  // Sidebar toggle elements
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarLogo = document.getElementById('sidebarLogo');

  const isCollapsed = () => sidebar.classList.contains('collapsed');

  // Collapse sidebar
  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.add('collapsed');
    });
  }

  // Expand sidebar via Z logo click (when collapsed)
  if (sidebarLogo && sidebar) {
    sidebarLogo.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isCollapsed()) {
        sidebar.classList.remove('collapsed');
      }
    });
  }

  // Keyboard shortcut Ctrl+\ to toggle sidebar
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
      e.preventDefault();
      if (sidebar) {
        if (isCollapsed()) {
          sidebar.classList.remove('collapsed');
        } else {
          sidebar.classList.add('collapsed');
        }
      }
    }
  });

  // Toggle sidebar on mobile/tablet hamburger click
  if (mobileHamburger && sidebar) {
    mobileHamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      const statusBar = document.getElementById('subagentStatusBar');
      if (statusBar) {
        statusBar.style.display = sidebar.classList.contains('open') ? 'none' : '';
      }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 992 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && e.target !== mobileHamburger) {
          sidebar.classList.remove('open');
          const statusBar = document.getElementById('subagentStatusBar');
          if (statusBar) statusBar.style.display = '';
        }
      }
    });
  }

  // Handle new project button click
  const addProjectBtn = document.getElementById('addProjectBtn');
  const newProjectBtn = document.getElementById('newProjectBtn');
  
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('New project feature coming soon.', 'info');
    });
  }

  if (newProjectBtn) {
    newProjectBtn.addEventListener('click', () => {
      showToast('New project feature coming soon.', 'info');
    });
  }

  const navNewProject = document.getElementById('navNewProject');
  if (navNewProject) {
    navNewProject.addEventListener('click', () => {
      showToast('New project feature coming soon.', 'info');
    });
  }
}
