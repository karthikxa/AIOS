// Agent Computer Panel functionality
export function initAgentComputer() {
  const agentComputerCollapse = document.getElementById('agentComputerCollapse');
  const agentComputerBar = document.getElementById('agentComputerBar');
  const agentComputerScreen = document.getElementById('agentComputerScreen');

  if (agentComputerCollapse && agentComputerBar && agentComputerScreen) {
    const chevron = agentComputerCollapse.querySelector('.chevron');
    if (chevron) chevron.style.transform = 'rotate(180deg)';

    // Clicking the collapse button toggles the screen visibility
    agentComputerCollapse.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleScreen();
    });

    // Also clicking the bar itself can expand/collapse it
    agentComputerBar.addEventListener('click', (e) => {
      // Prevent double trigger if collapse button is clicked
      if (e.target === agentComputerCollapse || agentComputerCollapse.contains(e.target)) return;
      toggleScreen();
    });

    function toggleScreen() {
      const chevron = agentComputerCollapse.querySelector('.chevron');
      const isVisible = window.getComputedStyle(agentComputerScreen).display === 'flex';

      if (isVisible) {
        // Collapse/Hide Screen
        agentComputerScreen.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      } else {
        // Expand/Show Screen
        agentComputerScreen.style.display = 'flex';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
    }
  }
}
