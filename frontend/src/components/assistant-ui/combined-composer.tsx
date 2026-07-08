"use client";

import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  useLocalRuntime,
  unstable_useMentionAdapter,
  unstable_useSlashCommandAdapter,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";
import { useCallback, type ReactNode } from "react";

const SLASH_COMMANDS: readonly Unstable_SlashCommand[] = [
  {
    id: "summarize",
    description: "Summarize the conversation",
    icon: "summarize",
    execute: () => {},
  },
  {
    id: "translate",
    description: "Translate to another language",
    icon: "translate",
    execute: () => {},
  },
  {
    id: "search",
    description: "Search the web",
    icon: "search",
    execute: () => {},
  },
];

// Minimal chat model adapter that delegates to the vanilla JS send handler
const noopAdapter = {
  async *stream() {},
};

function ComposerUI() {
  const mention = unstable_useMentionAdapter();
  const slash = unstable_useSlashCommandAdapter({ commands: SLASH_COMMANDS });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    const form = e.target as HTMLFormElement;
    const input = form?.querySelector(
      'textarea, [contenteditable]'
    ) as HTMLTextAreaElement;
    if (input?.value) {
      window.dispatchEvent(
        new CustomEvent("react-composer-send", {
          detail: { text: input.value },
        })
      );
    }
  }, []);

  return (
    <ComposerPrimitive.Root onSubmit={handleSubmit}>
      <ComposerPrimitive.Input placeholder="Type @ to mention, / for commands..." />
      <ComposerPrimitive.Send />
      <ComposerPrimitive.Unstable_TriggerPopover char="@" {...mention} />
      <ComposerPrimitive.Unstable_TriggerPopover char="/" {...slash} />
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
