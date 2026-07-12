"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  unstable_useSlashCommandAdapter,
  unstable_useMentionAdapter,
  unstable_defaultDirectiveFormatter,
  useLocalRuntime,
} from "@assistant-ui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// ── Icons (Lucide, monochrome) ──────────────────────────────────────────
import {
  ArrowUpIcon,
  MicIcon,
  PlusIcon,
  SparklesIcon,
  ChevronDownIcon,
  XIcon,
  FileIcon,
  PaperclipIcon,
  GlobeIcon,
  CodeIcon,
  PenIcon,
  BarChartIcon,
  LightbulbIcon,
} from "lucide-react";

// ── Model Selector ──────────────────────────────────────────────────────
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
    { id: "auto", label: "GPT-5.4 Nano", icon: SparklesIcon },
    { id: "gpt-4o", label: "GPT-4o", icon: GlobeIcon },
    { id: "claude-sonnet-4", label: "Claude Sonnet", icon: CodeIcon },
    { id: "gemini-2.5-flash-lite", label: "Gemini Flash", icon: GlobeIcon },
    { id: "deepseek-chat", label: "DeepSeek", icon: CodeIcon },
  ];

  const current = models.find(m => m.id === selected) || models[0];
  const Icon = current.icon;

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-8 gap-1.5 px-2 text-xs font-medium text-muted-foreground"
      >
        <Icon className="h-3.5 w-3.5" />
        <span>{current.label}</span>
        <ChevronDownIcon className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </Button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 bg-popover border rounded-xl shadow-lg py-1 min-w-[180px] z-50">
          {models.map(m => (
            <Button
              key={m.id}
              variant="ghost"
              size="sm"
              className={cn("w-full justify-start gap-2 h-8 px-3 text-sm", m.id === selected && "bg-accent")}
              onClick={() => { onSelect(m.id); setOpen(false); }}
            >
              <m.icon className="h-3.5 w-3.5" />
              <span>{m.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Quick Action Pill ────────────────────────────────────────────────────
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: React.ComponentType<any>; onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="h-8 gap-1.5 px-3 text-xs font-medium text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}

// ── File Preview Card ────────────────────────────────────────────────────
function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const size = file.size < 1024 ? `${file.size} B` : file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-card border rounded-xl">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
        <FileIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{file.name}</div>
        <div className="text-[11px] text-muted-foreground">{size}</div>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onRemove}>
        <XIcon className="h-3 w-3" />
      </Button>
    </div>
  );
}

// ── Voice Hook ───────────────────────────────────────────────────────────
function useVoiceInput(onTranscript: (text: string) => void) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const toggle = () => {
    if (recording) { recognitionRef.current?.stop(); setRecording(false); return; }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition not supported."); return; }
    const r = new SR(); r.continuous = false; r.interimResults = false; r.lang = "en-US";
    r.onresult = (e: any) => { onTranscript(e.results[0][0].transcript); setRecording(false); };
    r.onerror = () => setRecording(false); r.onend = () => setRecording(false);
    recognitionRef.current = r; r.start(); setRecording(true);
  };
  return { recording, toggle };
}

// ── Main Composer ────────────────────────────────────────────────────────
const noopAdapter = { async *stream() {} };

function ComposerUI() {
  const slash = unstable_useSlashCommandAdapter({ commands: [] });
  const mention = unstable_useMentionAdapter();
  const [model, setModel] = useState("auto");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textarea = (e.target as HTMLFormElement)?.querySelector("textarea") as HTMLTextAreaElement | null;
    const text = textarea?.value?.trim();
    if (text || files.length > 0) {
      window.dispatchEvent(new CustomEvent("react-composer-send", {
        detail: { text, model, files: files.map(f => ({ name: f.name, size: f.size, type: f.type })) }
      }));
      if (textarea) textarea.value = "";
      setFiles([]);
    }
  };

  return (
    <ComposerPrimitive.Root onSubmit={handleSubmit}
      className="w-full rounded-2xl border bg-card shadow-sm relative"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* File previews */}
      {files.length > 0 && (
        <ScrollArea className="max-h-32 px-4 pt-3">
          <div className="flex flex-wrap gap-2">
            {files.map((f, i) => (
              <FilePreview key={i} file={f} onRemove={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} />
            ))}
          </div>
        </ScrollArea>
      )}
      <ComposerPrimitive.Input ref={textareaRef as any}
        placeholder="Send a message...(@ to mention, / for commands)"
        rows={1}
        className={cn("w-full resize-none bg-transparent px-4 focus:outline-none text-sm",
          files.length > 0 ? "pt-2" : "pt-3", "pb-2")} />
      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
              <span><PlusIcon className="h-4 w-4" /></span>
            </Button>
            <input type="file" className="hidden" multiple onChange={handleFileAdd}
              accept=".txt,.md,.csv,.json,.xml,.html,.css,.js,.py,.ts,.jpg,.jpeg,.png,.gif,.svg,.pdf" />
          </label>
          <ModelDropdown selected={model} onSelect={setModel} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant={recording ? "destructive" : "ghost"} size="icon" className="h-7 w-7"
            onClick={toggleVoice} title={recording ? "Stop" : "Voice"}>
            <MicIcon className="h-4 w-4" />
          </Button>
          <Button type="submit" size="icon" className="h-7 w-7 rounded-full bg-primary text-primary-foreground">
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ComposerTriggerPopover char="/" {...slash}
        action={{ formatter: unstable_defaultDirectiveFormatter, onExecute: () => {}, removeOnExecute: true }}
        fallbackIcon={(() => null) as any} />
    </ComposerPrimitive.Root>
  );
}

// ── Quick Actions ────────────────────────────────────────────────────────
function QuickActions() {
  const actions = [
    { label: "Weather", icon: GlobeIcon },
    { label: "Code", icon: CodeIcon },
    { label: "Write", icon: PenIcon },
    { label: "Analyze", icon: BarChartIcon },
    { label: "Brainstorm", icon: LightbulbIcon },
  ];
  return (
    <div className="flex items-center gap-2 mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
      {actions.map(a => (
        <QuickAction key={a.label} label={a.label} icon={a.icon} onClick={() => {
          const input = document.querySelector("textarea") as HTMLTextAreaElement;
          if (input) { input.value = a.label + ": "; input.focus(); }
        }} />
      ))}
    </div>
  );
}

// ── Export ───────────────────────────────────────────────────────────────
export function UnifiedComposer() {
  const runtime = useLocalRuntime({ async *stream() {} } as any);
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ComposerPrimitive.Unstable_TriggerPopoverRoot>
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-[680px]">
            <ComposerUI />
            <QuickActions />
          </div>
        </div>
      </ComposerPrimitive.Unstable_TriggerPopoverRoot>
    </AssistantRuntimeProvider>
  );
}
