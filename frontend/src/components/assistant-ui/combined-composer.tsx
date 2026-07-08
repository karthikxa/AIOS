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
    <ComposerPrimitive.Root onSubmit={handleSubmit} style={{ position: "relative" }}>
      <ComposerPrimitive.Input
        placeholder="Message Zed..."
        style={{
          width: "100%",
          minHeight: 56,
          height: 56,
          fontSize: 15,
          lineHeight: 1.6,
          color: "#1F2937",
          padding: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          resize: "none",
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}
      />
      <ComposerPrimitive.Send />

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
