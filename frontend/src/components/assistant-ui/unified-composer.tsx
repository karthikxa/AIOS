"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  unstable_useSlashCommandAdapter,
  unstable_useMentionAdapter,
  unstable_defaultDirectiveFormatter,
  useLocalRuntime,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const MicIcon = ({ recording }: { recording?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={recording ? "#DC2626" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    {recording && <circle cx="12" cy="12" r="10" stroke="#DC2626" strokeWidth="1" fill="none" opacity="0.3"/>}
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FileIcon = ({ type }: { type: string }) => {
  const icons: Record<string, string> = {
    image: "🖼",
    pdf: "📄",
    text: "📝",
    code: "💻",
    audio: "🎵",
    video: "🎬",
  };
  return <span style={{ fontSize: 14 }}>{icons[type] || "📎"}</span>;
};

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
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:bg-[rgba(0,0,0,0.05)]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span>{current.icon}</span>
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </Button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl shadow-xl py-1 min-w-[160px] z-50"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          {models.map(m => (
            <Button
              key={m.id}
              variant="ghost"
              onClick={() => { onSelect(m.id); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left justify-start rounded-none hover:bg-[#F4F4F5] ${m.id === selected ? 'bg-[#F4F4F5] font-medium' : ''}`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Mode Toggle (Agent / Computer) ──────────────────────────────────────
function ModeToggle({ mode, onModeChange }: { mode: string; onModeChange: (m: string) => void }) {
  return (
    <div className="flex items-center border border-[rgba(0,0,0,0.08)] rounded-full overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Button
        variant={mode === "agent" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("agent")}
        className={`flex items-center gap-1.5 text-xs font-medium ${mode === "agent" ? "bg-[#000000] text-white hover:bg-[#1A1A1A]" : "text-[#6B7280] hover:bg-[rgba(0,0,0,0.05)]"}`}
      >
        <AgentIcon />
        <span>Agent</span>
      </Button>
      <Button
        variant={mode === "computer" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("computer")}
        className={`flex items-center gap-1.5 text-xs font-medium ${mode === "computer" ? "bg-[#000000] text-white hover:bg-[#1A1A1A]" : "text-[#6B7280] hover:bg-[rgba(0,0,0,0.05)]"}`}
      >
        <ComputerIcon />
        <span>Computer</span>
      </Button>
    </div>
  );
}

// ── File Attachment Preview ──────────────────────────────────────────────
function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const getMimeType = (name: string) => {
    if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(name)) return "image";
    if (/\.pdf$/i.test(name)) return "pdf";
    if (/\.(txt|md|csv|json|xml|html|css|js|py|ts)$/i.test(name)) return "text";
    if (/\.(mp3|wav|ogg)$/i.test(name)) return "audio";
    if (/\.(mp4|webm)$/i.test(name)) return "video";
    return "file";
  };

  const size = file.size < 1024 ? `${file.size} B`
    : file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB`
    : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F4F4F5]">
        <FileIcon type={getMimeType(file.name)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-[#18181B] truncate">{file.name}</div>
        <div className="text-[11px] text-[#71717A]">{size}</div>
      </div>
      <Button variant="ghost" size="icon" onClick={onRemove} className="flex items-center justify-center w-6 h-6 rounded-full text-[#71717A]">
        <XIcon />
      </Button>
    </div>
  );
}

// ── Voice Input Hook ────────────────────────────────────────────────────
function useVoiceInput(onTranscript: (text: string) => void) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggle = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setRecording(false);
    };

    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  }, [recording, onTranscript]);

  return { recording, toggle };
}

// ── Main Unified Composer ────────────────────────────────────────────────
const noopAdapter = { async *stream() {} };

function ComposerUI({ mode, onModeChange, model, onModelChange }: {
  mode: string; onModeChange: (m: string) => void;
  model: string; onModelChange: (m: string) => void;
}) {
  const slash = unstable_useSlashCommandAdapter({ commands: [] });
  const mention = unstable_useMentionAdapter();
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { recording, toggle: toggleVoice } = useVoiceInput((text) => {
    if (textareaRef.current) {
      textareaRef.current.value += text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
      e.target.value = "";
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const textarea = form?.querySelector("textarea") as HTMLTextAreaElement | null;
    const text = textarea?.value?.trim();
    if (text || files.length > 0) {
      window.dispatchEvent(
        new CustomEvent("react-composer-send", {
          detail: { text, mode, model, files: files.map(f => ({ name: f.name, size: f.size, type: f.type })) }
        })
      );
      if (textarea) textarea.value = "";
      setFiles([]);
    }
  };

  return (
    <ComposerPrimitive.Root
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#F4F4F5] relative shadow-sm"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* File previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pt-3">
          {files.map((f, i) => (
            <FilePreview key={i} file={f} onRemove={() => handleFileRemove(i)} />
          ))}
        </div>
      )}

      <ComposerPrimitive.Input
        ref={textareaRef as any}
        placeholder="Ask anything..."
        rows={1}
        className={`w-full resize-none bg-transparent px-4 ${files.length > 0 ? 'pt-2' : 'pt-3'} pb-2 text-sm focus:outline-none text-[#1F2937] placeholder-[#8E8E93]`}
      />

      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2">
          {/* Attach file */}
          <label className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[rgba(0,0,0,0.05)] text-[#6B7280] transition-colors cursor-pointer">
            <PlusIcon />
            <input type="file" className="hidden" multiple onChange={handleFileAdd}
              accept=".txt,.md,.csv,.json,.xml,.html,.css,.js,.py,.ts,.jpg,.jpeg,.png,.gif,.svg,.pdf,.doc,.docx,.xls,.xlsx" />
          </label>
          {/* Mode toggle */}
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        </div>
        <div className="flex items-center gap-2">
          {/* Model selector */}
          <ModelDropdown selected={model} onSelect={onModelChange} />
          {/* Voice input */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVoice}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${recording ? 'bg-red-50 text-[#DC2626] hover:bg-red-100' : 'hover:bg-[rgba(0,0,0,0.05)] text-[#6B7280]'}`}
            title={recording ? "Stop recording" : "Voice input"}
          >
            <MicIcon recording={recording} />
          </Button>
          {/* Send button */}
          <Button
            type="submit"
            size="icon"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#000000] text-white hover:bg-[#1A1A1A] shadow-md"
          >
            <SendIcon />
          </Button>
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
