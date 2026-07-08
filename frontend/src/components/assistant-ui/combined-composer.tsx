import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
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
import { unstable_useMentionAdapter } from "./use-mention-adapter";
import { unstable_useSlashCommandAdapter } from "./use-slash-command-adapter";
import { ComposerTriggerPopover } from "./composer-trigger-popover";

const SLASH_COMMANDS: readonly Unstable_SlashCommand[] = [
  {
    id: "summarize",
    description: "Summarize the conversation",
    icon: "FileText",
    execute: () => {
      window.dispatchEvent(
        new CustomEvent("react-composer-send", {
          detail: { text: "Summarize the conversation" },
        })
      );
    },
  },
  {
    id: "translate",
    description: "Translate to another language",
    icon: "Languages",
    execute: () => {
      window.dispatchEvent(
        new CustomEvent("react-composer-send", {
          detail: { text: "Translate: " },
        })
      );
    },
  },
  {
    id: "search",
    description: "Search the web",
    icon: "Globe",
    execute: () => {
      window.dispatchEvent(
        new CustomEvent("react-composer-send", {
          detail: { text: "Search the web for: " },
        })
      );
    },
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
    <ComposerPrimitive.Root
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <ComposerPrimitive.Input
        style={{
          width: "100%",
          minHeight: "56px",
          border: "none",
          outline: "none",
          resize: "none",
          padding: 0,
          margin: 0,
          marginBottom: "16px",
          background: "transparent",
          boxShadow: "none",
          fontSize: "20px",
          color: "var(--text)",
          fontFamily: "'Inter', sans-serif",
          lineHeight: "1.6",
        }}
        placeholder="Type @ to mention, / for commands..."
      />
      <ComposerPrimitive.Send />

      <ComposerTriggerPopover
        char="@"
        {...mention}
        fallbackIcon={WrenchIcon}
      />
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
