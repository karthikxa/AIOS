"use client";

import {
  ComposerPrimitive,
  unstable_useMentionAdapter,
  unstable_useSlashCommandAdapter,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";
import { useCallback } from "react";

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

export function CombinedComposer() {
  const mention = unstable_useMentionAdapter();
  const slash = unstable_useSlashCommandAdapter({ commands: SLASH_COMMANDS });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    // The composer handles send internally; we dispatch an event
    // so the vanilla app can pick it up
    const form = e.target as HTMLFormElement;
    const input = form?.querySelector('textarea, [contenteditable]') as HTMLTextAreaElement;
    if (input?.value) {
      window.dispatchEvent(
        new CustomEvent('react-composer-send', { detail: { text: input.value } })
      );
    }
  }, []);

  return (
    <ComposerPrimitive.Unstable_TriggerPopoverRoot>
      <ComposerPrimitive.Root onSubmit={handleSubmit}>
        <ComposerPrimitive.Input placeholder="Type @ to mention, / for commands..." />
        <ComposerPrimitive.Send />

        <ComposerPrimitive.Unstable_TriggerPopover
          char="@"
          {...mention}
        />
        <ComposerPrimitive.Unstable_TriggerPopover
          char="/"
          {...slash}
        />
      </ComposerPrimitive.Root>
    </ComposerPrimitive.Unstable_TriggerPopoverRoot>
  );
}
