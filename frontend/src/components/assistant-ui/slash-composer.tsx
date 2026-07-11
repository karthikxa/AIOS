"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ComposerPrimitive,
  ComposerTriggerPopover,
  unstable_useSlashCommandAdapter,
  type Unstable_SlashCommand,
} from "@assistant-ui/react";
import {
  SlashIcon, SendIcon, WrenchIcon, MailIcon, GlobeIcon, TerminalIcon,
  FileTextIcon, SearchIcon, ClockIcon, BrainIcon, UsersIcon, ZapIcon,
  SettingsIcon, DatabaseIcon, CodeIcon, ImageIcon, MicIcon, VideoIcon,
  ShieldIcon, MessageSquareIcon, CalendarIcon, BookOpenIcon,
} from "lucide-react";

// Map tool names to icons
const TOOL_ICONS: Record<string, React.ComponentType<any>> = {
  gmail: MailIcon,
  terminal: TerminalIcon,
  web_search: GlobeIcon,
  web_extract: GlobeIcon,
  read_file: FileTextIcon,
  write_file: FileTextIcon,
  search_files: SearchIcon,
  memory: DatabaseIcon,
  session_search: DatabaseIcon,
  cronjob: ClockIcon,
  todo: CheckSquareIcon,
  delegate_task: UsersIcon,
  clarify: MessageSquareIcon,
  execute_code: CodeIcon,
  vision_analyze: ImageIcon,
  image_generate: ImageIcon,
  text_to_speech: MicIcon,
  video_generate: VideoIcon,
  skill_manage: BookOpenIcon,
  skills_list: BookOpenIcon,
  skill_view: BookOpenIcon,
  browser_navigate: GlobeIcon,
  browser_click: GlobeIcon,
  patch: CodeIcon,
  process: TerminalIcon,
};

function CheckSquareIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
}

interface ToolInfo {
  name: string;
  description: string;
  toolset?: string;
}

export function SlashComposer() {
  const [tools, setTools] = useState<ToolInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tools from backend
  useEffect(() => {
    fetch("/api/tools")
      .then(r => r.json())
      .then(data => {
        const toolList = (data.tools || []).map((t: any) => ({
          name: t.function?.name || "",
          description: (t.function?.description || "").slice(0, 80),
        }));
        setTools(toolList);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Build slash commands from tools + built-in commands
  const commands: Unstable_SlashCommand[] = [
    // Built-in commands
    {
      id: "agent",
      description: "Switch to Agent mode (delegation with sub-agents)",
      icon: "Users",
      execute: () => {
        // Trigger agent mode in the chatbox
        const modeBtn = document.querySelector('[data-mode="agent"]') as HTMLElement;
        if (modeBtn) modeBtn.click();
      },
    },
    {
      id: "computer",
      description: "Switch to Computer mode (desktop control)",
      icon: "Monitor",
      execute: () => {
        const modeBtn = document.querySelector('[data-mode="computer"]') as HTMLElement;
        if (modeBtn) modeBtn.click();
      },
    },
    // Dynamic tool commands
    ...tools.map(tool => ({
      id: tool.name,
      description: tool.description || `Use ${tool.name} tool`,
      icon: Object.keys(TOOL_ICONS).find(k => tool.name.includes(k)) ? undefined : "Wrench",
      execute: () => {
        // Insert tool name into chat input
        const input = document.querySelector("#chatPromptInput") as HTMLTextAreaElement;
        if (input) {
          input.value = `Use the ${tool.name} tool to `;
          input.focus();
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      },
    })),
  ];

  const iconMap: Record<string, React.ComponentType<any>> = {
    FileText: FileTextIcon,
    Languages: GlobeIcon,
    Globe: GlobeIcon,
    Wrench: WrenchIcon,
    Mail: MailIcon,
    Terminal: TerminalIcon,
    Search: SearchIcon,
    Database: DatabaseIcon,
    Clock: ClockIcon,
    Users: UsersIcon,
    MessageSquare: MessageSquareIcon,
    Code: CodeIcon,
    ImageIcon: ImageIcon,
    Mic: MicIcon,
    Video: VideoIcon,
    Shield: ShieldIcon,
    BookOpen: BookOpenIcon,
    Settings: SettingsIcon,
    Zap: ZapIcon,
    Brain: BrainIcon,
    Calendar: CalendarIcon,
    Monitor: GlobeIcon,
    CheckSquare: CheckSquareIcon,
    ...TOOL_ICONS,
  };

  const slash = unstable_useSlashCommandAdapter({ commands });

  return (
    <ComposerPrimitive.Unstable_TriggerPopoverRoot>
      <ComposerPrimitive.Root>
        <ComposerPrimitive.Input placeholder={loading ? "Loading tools..." : "Type / for commands & tools..."} />
        <ComposerPrimitive.Send />

        <ComposerTriggerPopover
          char="/"
          {...slash}
          iconMap={iconMap}
          fallbackIcon={SlashIcon}
        />
      </ComposerPrimitive.Root>
    </ComposerPrimitive.Unstable_TriggerPopoverRoot>
  );
}
