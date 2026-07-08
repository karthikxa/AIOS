"use client";

import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  unstable_defaultDirectiveFormatter,
  unstable_useMentionAdapter,
  unstable_useSlashCommandAdapter,
  useLocalRuntime,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";
import {
  ArrowUpIcon,
  FileTextIcon,
  GlobeIcon,
  LanguagesIcon,
  SlashIcon,
  WrenchIcon,
} from "lucide-react";
import { ComposerTriggerPopover } from "./composer-trigger-popover";

const SLASH_COMMANDS: readonly Unstable_SlashCommand[] = [
  {
    id: "summarize",
    description: "Summarize the conversation",
    icon: "FileText",
    execute: () => {},
  },
  {
    id: "translate",
    description: "Translate to another language",
    icon: "Languages",
    execute: () => {},
  },
  {
    id: "search",
    description: "Search the web",
    icon: "Globe",
    execute: () => {},
  },
];

const slashIcons = {
  FileText: FileTextIcon,
  Languages: LanguagesIcon,
  Globe: GlobeIcon,
};

const noopAdapter = { async *stream() {} };

/* ── Styles matching MinimalComposer pattern ─────────────────────────── */

const styles = {
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column" as const,
    borderRadius: 24,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    position: "relative" as const,
  },
  input: {
    minHeight: 40,
    width: "100%",
    resize: "none" as const,
    background: "transparent",
    padding: "16px 20px 12px",
    fontSize: 14,
    lineHeight: 1.5,
    color: "#1F2937",
    border: "none",
    outline: "none",
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 12px 12px",
  },
  sendBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#111827",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    opacity: 1,
  },
} as const;

function ComposerUI() {
  const mention = unstable_useMentionAdapter();
  const slash = unstable_useSlashCommandAdapter({ commands: SLASH_COMMANDS });

  const handleSubmit = (e: React.FormEvent) => {
    const form = e.target as HTMLFormElement;
    const textarea = form?.querySelector("textarea") as HTMLTextAreaElement | null;
    const text = textarea?.value?.trim();
    if (text) {
      window.dispatchEvent(
        new CustomEvent("react-composer-send", { detail: { text } })
      );
    }
  };

  return (
    <ComposerPrimitive.Root onSubmit={handleSubmit} style={styles.root}>
      <ComposerPrimitive.Input
        placeholder="Message Zed..."
        rows={1}
        style={styles.input}
      />
      <div style={styles.footer}>
        <ComposerPrimitive.Send style={styles.sendBtn}>
          <ArrowUpIcon className="w-4 h-4" />
        </ComposerPrimitive.Send>
      </div>

      <ComposerTriggerPopover
        char="@"
        {...mention}
        directive={{ formatter: unstable_defaultDirectiveFormatter }}
        fallbackIcon={WrenchIcon}
      />
      <ComposerTriggerPopover
        char="/"
        {...slash}
        action={{
          formatter: unstable_defaultDirectiveFormatter,
          onExecute: (item) => {
            const cmd = SLASH_COMMANDS.find((c) => c.id === item.id);
            cmd?.execute();
          },
          removeOnExecute: true,
        }}
        iconMap={slashIcons}
        fallbackIcon={SlashIcon}
      />
    </ComposerPrimitive.Root>
  );
}

export function CombinedComposer() {
  const runtime = useLocalRuntime(noopAdapter as any);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ComposerPrimitive.Unstable_TriggerPopoverRoot>
        <ComposerUI />
      </ComposerPrimitive.Unstable_TriggerPopoverRoot>
    </AssistantRuntimeProvider>
  );
}
