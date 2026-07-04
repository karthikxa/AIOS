import { atom } from 'nanostores'

import { ensurePaneRegistered, setPaneOpen } from './panes'

export const AGENT_PANEL_PANE_ID = 'agent-panel'

ensurePaneRegistered(AGENT_PANEL_PANE_ID, { open: false })

export const $agentPanelOpen = atom(false)

$agentPanelOpen.subscribe(open => {
  setPaneOpen(AGENT_PANEL_PANE_ID, open)
})

export function toggleAgentPanel() {
  $agentPanelOpen.set(!$agentPanelOpen.get())
}

export function setAgentPanelOpen(open: boolean) {
  $agentPanelOpen.set(open)
}
