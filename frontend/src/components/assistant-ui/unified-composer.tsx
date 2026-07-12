"use client";

import { useState, useRef, useEffect } from "react";
import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  unstable_useSlashCommandAdapter,
  unstable_useMentionAdapter,
  unstable_defaultDirectiveFormatter,
  useLocalRuntime,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";

// ── Icons (monochrome, stroke-based) ────────────────────────────────────
const AgentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ComputerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// ── Model Selector Dropdown ──────────────────────────────────────────────
function ModelDropdown({ selected, onSelect }: { selected: string; onSelect: (m: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const models = [
    { id: "auto", label: "Zed Pro", icon: "⚡" },
    { id: "gpt-4o", label: "GPT-4o", icon: "🟢" },
    { id: "claude-sonnet-4", label: "Claude Sonnet", icon: "🟣" },
    { id: "gemini-2.5-flash-lite", label: "Gemini Flash", icon: "🔵" },
    { id: "deepseek-chat", label: "DeepSeek", icon: "🟠" },
  ];

  const current = models.find(m => m.id === selected) || models[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span>{current.icon}</span>
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl shadow-lg py-1 min-w-[160px] z-50"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          {models.map(m => (
            <button
              key={m.id}
              onClick={() => { onSelect(m.id); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-[#F4F4F5] transition-colors ${m.id === selected ? 'bg-[#F4F4F5] font-medium' : ''}`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Mode Toggle (Agent / Computer) ──────────────────────────────────────
function ModeToggle({ mode, onModeChange }: { mode: string; onModeChange: (m: string) => void }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <button
        onClick={() => onModeChange("agent")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${mode === "agent" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
      >
        <AgentIcon />
        <span>Agent</span>
      </button>
      <button
        onClick={() => onModeChange("computer")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${mode === "computer" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
      >
        <ComputerIcon />
        <span>Computer</span>
      </button>
    </div>
  );
}

// ── Main Unified Composer ────────────────────────────────────────────────
const noopAdapter = { async *stream() {} };

function ComposerUI({ mode, onModeChange, model, onModelChange }: {
  mode: string; onModeChange: (m: string) => void;
  model: string; onModelChange: (m: string) => void;
}) {
  const slash = unstable_useSlashCommandAdapter({ commands: [] });
  const mention = unstable_useMentionAdapter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const textarea = form?.querySelector("textarea") as HTMLTextAreaElement | null;
    const text = textarea?.value?.trim();
    if (text) {
      window.dispatchEvent(
        new CustomEvent("react-composer-send", { detail: { text, mode, model } })
      );
      if (textarea) textarea.value = "";
    }
  };

  return (
    <ComposerPrimitive.Root
      onSubmit={handleSubmit}
      className="w-full rounded-[24px] border border-[rgba(0,0,0,0.08)] bg-[#F4F4F5] relative"
      style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
    >
      <ComposerPrimitive.Input
        placeholder="Ask anything..."
        rows={1}
        className="min-h-[44px] w-full resize-none bg-transparent px-4 pt-3 pb-2 text-sm focus:outline-none text-[#1F2937] placeholder-[#8E8E93]"
      />
      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[rgba(0,0,0,0.05)] text-[#6B7280] transition-colors" title="Attach file">
            <PlusIcon />
          </button>
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        </div>
        <div className="flex items-center gap-2">
          <ModelDropdown selected={model} onSelect={onModelChange} />
          <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[rgba(0,0,0,0.05)] text-[#6B7280] transition-colors" title="Voice input">
            <MicIcon />
          </button>
          <button type="submit" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#000000] text-white hover:bg-[#1A1A1A] transition-colors">
            <SendIcon />
          </button>
        </div>
      </div>

      {/* Slash command popover */}
      <ComposerTriggerPopover
        char="/"
        {...slash}
        action={{
          formatter: unstable_defaultDirectiveFormatter,
          onExecute: (item) => {},
          removeOnExecute: true,
        }}
        fallbackIcon={(() => null) as any}
      />
    </ComposerPrimitive.Root>
  );
}

// ── Export ───────────────────────────────────────────────────────────────
export function UnifiedComposer() {
  const [mode, setMode] = useState("agent");
  const [model, setModel] = useState("auto");
  const runtime = useLocalRuntime({ async *stream() {} } as any);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ComposerPrimitive.Unstable_TriggerPopoverRoot>
        <div className="w-full">
          <ComposerUI
            mode={mode}
            onModeChange={setMode}
            model={model}
            onModelChange={setModel}
          />
        </div>
      </ComposerPrimitive.Unstable_TriggerPopoverRoot>
    </AssistantRuntimeProvider>
  );
}
