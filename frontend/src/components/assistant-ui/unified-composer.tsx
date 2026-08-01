"use client";

import { useState, useRef, useEffect } from "react";
import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  unstable_useSlashCommandAdapter,
  unstable_useMentionAdapter,
  unstable_defaultDirectiveFormatter,
  useLocalRuntime,
} from "@assistant-ui/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileIcon, XIcon } from "lucide-react";
import { ComposerTriggerPopover } from "./composer-trigger-popover";

// ── File Preview Card ────────────────────────────────────────────────────
function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const size = file.size < 1024 ? `${file.size} B` : file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-card border rounded-lg shadow-xs">
      <div className="flex items-center justify-center w-7 h-7 rounded bg-muted">
        <FileIcon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{file.name}</div>
        <div className="text-[10px] text-muted-foreground">{size}</div>
      </div>
      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={onRemove}>
        <XIcon className="h-3 w-3" />
      </Button>
    </div>
  );
}

function ComposerUI() {
  const slash = unstable_useSlashCommandAdapter({ commands: [] });
  const mention = unstable_useMentionAdapter();
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textarea = textareaRef.current || (e.target as HTMLFormElement)?.querySelector("textarea");
    const text = textarea?.value?.trim();
    if (text || files.length > 0) {
      window.dispatchEvent(new CustomEvent("react-composer-send", {
        detail: { text, files: files.map(f => ({ name: f.name, size: f.size, type: f.type })) }
      }));
      if (textarea) textarea.value = "";
      setFiles([]);
    }
  };

  return (
    <ComposerPrimitive.Root
      onSubmit={handleSubmit}
      className="w-full relative border-none bg-transparent shadow-none p-0 m-0"
    >
      {/* File previews */}
      {files.length > 0 && (
        <ScrollArea className="max-h-28 px-2 pt-2">
          <div className="flex flex-wrap gap-2">
            {files.map((f, i) => (
              <FilePreview key={i} file={f} onRemove={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} />
            ))}
          </div>
        </ScrollArea>
      )}
      <ComposerPrimitive.Input
        ref={textareaRef as any}
        placeholder="Send a message... (@ to mention, / for commands)"
        rows={1}
        className="w-full min-h-[50px] max-h-[200px] resize-none bg-transparent px-3 py-2 text-sm focus:outline-none border-none outline-none ring-0 shadow-none text-foreground placeholder:text-muted-foreground"
      />
      <ComposerTriggerPopover
        char="/"
        {...slash}
        action={{ formatter: unstable_defaultDirectiveFormatter, onExecute: () => {}, removeOnExecute: true }}
        fallbackIcon={(() => null) as any}
      />
    </ComposerPrimitive.Root>
  );
}

export function UnifiedComposer() {
  const runtime = useLocalRuntime({ async *stream() {} } as any);
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ComposerPrimitive.Unstable_TriggerPopoverRoot>
        <div className="w-full">
          <ComposerUI />
        </div>
      </ComposerPrimitive.Unstable_TriggerPopoverRoot>
    </AssistantRuntimeProvider>
  );
}
