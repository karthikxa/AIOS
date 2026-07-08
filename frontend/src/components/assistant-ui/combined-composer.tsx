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
import { Button } from "@/components/ui/button";
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
    <ComposerPrimitive.Root
      onSubmit={handleSubmit}
      className="flex w-full flex-col rounded-3xl border bg-muted relative"
    >
      <ComposerPrimitive.Input
        placeholder="Message Zed..."
        rows={1}
        className="min-h-10 w-full resize-none bg-transparent px-5 pt-4 pb-3 text-sm focus:outline-none"
      />
      <div className="flex items-center justify-end px-3 pb-3">
        <ComposerPrimitive.Send asChild>
          <Button
            size="icon"
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
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
