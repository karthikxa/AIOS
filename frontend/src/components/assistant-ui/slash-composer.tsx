"use client";

import {
  ComposerPrimitive,
  ComposerTriggerPopover,
  unstable_useSlashCommandAdapter,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";
import { FileTextIcon, GlobeIcon, LanguagesIcon, SlashIcon } from "lucide-react";

const SLASH_COMMANDS: readonly Unstable_SlashCommand[] = [
  {
    id: "summarize",
    description: "Summarize the conversation",
    icon: "FileText",
    execute: () => {/* TODO */},
  },
  {
    id: "translate",
    description: "Translate to another language",
    icon: "Languages",
    execute: () => {/* TODO */},
  },
  {
    id: "search",
    description: "Search the web",
    icon: "Globe",
    execute: () => {/* TODO */},
  },
];

export function SlashComposer() {
  const slash = unstable_useSlashCommandAdapter({ commands: SLASH_COMMANDS });

  return (
    <ComposerPrimitive.Unstable_TriggerPopoverRoot>
      <ComposerPrimitive.Root>
        <ComposerPrimitive.Input placeholder="Type / for commands..." />
        <ComposerPrimitive.Send />

        <ComposerTriggerPopover
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
    </ComposerPrimitive.Unstable_TriggerPopoverRoot>
  );
}
