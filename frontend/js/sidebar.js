// Sidebar functionality
export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mobileHamburger = document.getElementById('mobileHamburger');
  const navItems = document.querySelectorAll('.nav-item');

  // Toggle sidebar on mobile/tablet hamburger click
  if (mobileHamburger && sidebar) {
    mobileHamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      // Hide status bar when sidebar is open on mobile
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
          // Restore status bar when sidebar closes
          const statusBar = document.getElementById('subagentStatusBar');
          if (statusBar) statusBar.style.display = '';
        }
      }
    });
  }

  // Router will handle active state toggling and view switching


  // Handle new project button click simulation
  const addProjectBtn = document.getElementById('addProjectBtn');
  const newProjectBtn = document.getElementById('newProjectBtn');
  
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Simulation: Create new project dialog.', 'info');
    });
  }

  if (newProjectBtn) {
    newProjectBtn.addEventListener('click', () => {
      showToast('Simulation: Create new project dialog.', 'info');
    });
  }

  const navNewProject = document.getElementById('navNewProject');
  if (navNewProject) {
    navNewProject.addEventListener('click', () => {
      showToast('Simulation: Create new project dialog.', 'info');
    });
  }
}
