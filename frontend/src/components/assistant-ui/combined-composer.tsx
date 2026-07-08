"use client";

import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  useLocalRuntime,
  unstable_useMentionAdapter,
  unstable_useSlashCommandAdapter,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";
import {
  FileTextIcon,
  GlobeIcon,
  LanguagesIcon,
  SlashIcon,
  WrenchIcon,
} from "lucide-react";

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

// Minimal adapter — streams nothing, just provides the runtime context
const noopAdapter = {
  async *stream() {},
};

function ComposerUI() {
  const mention = unstable_useMentionAdapter();
  const slash = unstable_useSlashCommandAdapter({ commands: SLASH_COMMANDS });

  const handleSubmit = (e: React.FormEvent) => {
    // After the composer's internal send runs, grab the text and forward it
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
    <ComposerPrimitive.Root onSubmit={handleSubmit}>
      <ComposerPrimitive.Input placeholder="Type @ to mention, / for commands..." />
      <ComposerPrimitive.Send />

      <ComposerPrimitive.Unstable_TriggerPopover
        char="@"
        {...mention}
        fallbackIcon={WrenchIcon}
      />
      <ComposerPrimitive.Unstable_TriggerPopover
        char="/"
        {...slash}
        iconMap={{
          FileText: FileTextIcon,
          Languages: LanguagesIcon,
          Globe: GlobeIcon,
        }}
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
