import { useStore } from '@nanostores/react'
import { useMemo } from 'react'

import { Codicon } from '@/components/ui/codicon'
import { cn } from '@/lib/utils'
import {
  $subagentsBySession,
  type SubagentNode,
  type SubagentStreamEntry,
  buildSubagentTree
} from '@/store/subagents'
import { $activeSessionId, $busy } from '@/store/session'
import { $todosBySession } from '@/store/todos'
import type { TodoItem } from '@/lib/todos'

import { setAgentPanelOpen } from '@/store/agent-panel'

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-emerald-500',
  failed: 'bg-red-500',
  interrupted: 'bg-amber-500',
  queued: 'bg-slate-400',
  running: 'bg-blue-500'
}

const STREAM_KIND_ICONS: Record<string, string> = {
  tool: 'tool',
  thinking: 'brain',
  progress: 'info',
  summary: 'checklist'
}

function StatusDot({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-block size-2 shrink-0 rounded-full',
        STATUS_COLORS[status] ?? 'bg-slate-400',
        status === 'running' && 'animate-pulse'
      )}
    />
  )
}

function formatDuration(seconds?: number): string {
  if (seconds === undefined) return ''
  if (seconds < 60) return `${Math.round(seconds)}s`
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

function formatCost(usd?: number): string {
  if (usd === undefined) return ''
  if (usd < 0.01) return '<$0.01'
  return `$${usd.toFixed(2)}`
}

function StreamEntryRow({ entry }: { entry: SubagentStreamEntry }) {
  const icon = STREAM_KIND_ICONS[entry.kind] ?? 'arrow-right'

  return (
    <div className={cn('flex items-start gap-1.5 text-[0.68rem] leading-4', entry.isError ? 'text-red-500' : 'text-muted-foreground')}>
      <Codicon className="mt-0.5 shrink-0" name={icon} size="0.75rem" />
      <span className="min-w-0 break-words opacity-80">{entry.text}</span>
    </div>
  )
}

function AgentCard({ agent }: { agent: SubagentNode }) {
  const childCount = agent.children.length
  const completedChildren = agent.children.filter(c => c.status === 'completed').length

  return (
    <div className="rounded-lg border border-(--ui-stroke-tertiary) bg-(--ui-sidebar-surface-background) p-2.5">
      <div className="flex items-start gap-2">
        <StatusDot status={agent.status} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="min-w-0 truncate text-[0.75rem] font-medium text-foreground">
              {agent.goal}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[0.65rem] text-muted-foreground">
            {agent.status === 'running' && agent.currentTool && (
              <span className="flex items-center gap-1">
                <Codicon name="tool" size="0.65rem" />
                {agent.currentTool}
              </span>
            )}
            {agent.durationSeconds !== undefined && (
              <span>{formatDuration(agent.durationSeconds)}</span>
            )}
            {agent.costUsd !== undefined && (
              <span>{formatCost(agent.costUsd)}</span>
            )}
            {childCount > 0 && (
              <span>
                {completedChildren}/{childCount} subagents
              </span>
            )}
          </div>
        </div>
        <button
          className="shrink-0 rounded p-0.5 text-muted-foreground hover:bg-(--chrome-action-hover) hover:text-foreground"
          onClick={() => setAgentPanelOpen(false)}
          title="Close"
          type="button"
        >
          <Codicon name="close" size="0.75rem" />
        </button>
      </div>

      {agent.stream.length > 0 && (
        <div className="mt-2 space-y-1 border-t border-(--ui-stroke-quaternary) pt-2">
          {agent.stream.map((entry, i) => (
            <StreamEntryRow key={`${entry.at}-${i}`} entry={entry} />
          ))}
        </div>
      )}

      {agent.summary && (
        <div className="mt-2 rounded border border-(--ui-stroke-quaternary) bg-(--ui-bg-quaternary) p-2 text-[0.68rem] leading-relaxed text-muted-foreground">
          {agent.summary}
        </div>
      )}

      {childCount > 0 && (
        <div className="mt-2 space-y-1.5 border-t border-(--ui-stroke-quaternary) pt-2">
          {agent.children.map(child => (
            <AgentCard key={child.id} agent={child} />
          ))}
        </div>
      )}
    </div>
  )
}

function TodoList({ todos }: { todos: TodoItem[] }) {
  const pending = todos.filter(t => t.status === 'pending')
  const inProgress = todos.filter(t => t.status === 'in_progress')
  const completed = todos.filter(t => t.status === 'completed')
  const total = todos.length
  const done = completed.length

  return (
    <div className="rounded-lg border border-(--ui-stroke-tertiary) bg-(--ui-sidebar-surface-background) p-2.5">
      <div className="flex items-center gap-2 text-[0.75rem] font-medium text-foreground">
        <Codicon name="checklist" size="0.875rem" />
        <span>Task Progress</span>
        <span className="ml-auto text-[0.65rem] text-muted-foreground">
          {done}/{total}
        </span>
      </div>
      <div className="mt-2 space-y-1">
        {inProgress.map(todo => (
          <div key={todo.id} className="flex items-center gap-1.5 text-[0.68rem] leading-4">
            <StatusDot status="running" />
            <span className="text-foreground">{todo.content}</span>
          </div>
        ))}
        {pending.map(todo => (
          <div key={todo.id} className="flex items-center gap-1.5 text-[0.68rem] leading-4">
            <StatusDot status="queued" />
            <span className="text-muted-foreground">{todo.content}</span>
          </div>
        ))}
        {completed.map(todo => (
          <div key={todo.id} className="flex items-center gap-1.5 text-[0.68rem] leading-4">
            <StatusDot status="completed" />
            <span className="text-muted-foreground line-through">{todo.content}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AgentPanel() {
  const activeSessionId = useStore($activeSessionId)
  const busy = useStore($busy)
  const subagentsBySession = useStore($subagentsBySession)
  const todosBySession = useStore($todosBySession)

  const subagents = activeSessionId ? (subagentsBySession[activeSessionId] ?? []) : []
  const todos = activeSessionId ? (todosBySession[activeSessionId] ?? []) : []

  const tree = useMemo(() => buildSubagentTree(subagents), [subagents])

  const hasContent = tree.length > 0 || todos.length > 0

  return (
    <aside
      aria-label="Agent panel"
      className="relative flex h-full w-full min-w-0 flex-col overflow-hidden border-l border-(--ui-stroke-secondary) bg-(--ui-sidebar-surface-background) pt-(--titlebar-height) text-(--ui-text-tertiary)"
    >
      <div className="flex h-8 shrink-0 items-center border-b border-(--ui-stroke-tertiary) px-2.5">
        <div className="flex items-center gap-1.5 text-[0.75rem] font-medium text-foreground">
          <Codicon name="robot" size="0.875rem" />
          <span>Agent</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {busy && (
            <span className="flex items-center gap-1 text-[0.65rem] text-muted-foreground">
              <Codicon name="sync~spin" size="0.7rem" />
              Running
            </span>
          )}
          <button
            className="ml-1 rounded p-0.5 text-muted-foreground hover:bg-(--chrome-action-hover) hover:text-foreground"
            onClick={() => setAgentPanelOpen(false)}
            title="Close panel"
            type="button"
          >
            <Codicon name="close" size="0.75rem" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2">
        {!hasContent && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <Codicon className="text-muted-foreground/40" name="robot" size="2rem" />
            <div className="text-[0.68rem] text-muted-foreground/65">
              {busy ? 'Waiting for agent activity...' : 'No active agents'}
            </div>
          </div>
        )}

        {todos.length > 0 && <TodoList todos={todos} />}

        {tree.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </aside>
  )
}
