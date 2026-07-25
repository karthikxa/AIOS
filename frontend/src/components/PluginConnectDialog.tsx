import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchIcon, SendIcon, ShieldCheckIcon, UploadIcon, CalendarIcon, PenIcon, ClockIcon, FolderIcon } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  sub: string;
}

interface PluginConnectData {
  id: string;
  name: string;
  logo: string;
  desc: string;
  features: Feature[];
  buttonText: string;
}

const GOOGLE_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{ flexShrink: 0 }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

const PLUGIN_DATA: Record<string, { desc: string; features: Feature[]; buttonText: string }> = {
  gmail: {
    desc: "Connect your Gmail account to manage and search your emails.",
    features: [
      { icon: <SearchIcon size={16} className="text-zinc-500" />, title: "Search and read emails", sub: "Let the agent search, read, and organize your emails." },
      { icon: <SendIcon size={16} className="text-zinc-500" />, title: "Send and reply to messages", sub: "Allow the agent to send emails and draft replies." },
      { icon: <ShieldCheckIcon size={16} className="text-zinc-500" />, title: "Secure & private", sub: "Your credentials and emails are encrypted safely." },
    ],
    buttonText: "Connect Gmail",
  },
  "google-drive": {
    desc: "Connect your Google Drive account to allow access to your files and folders.",
    features: [
      { icon: <SearchIcon size={16} className="text-zinc-500" />, title: "Search and access files", sub: "Let the agent search and read your files." },
      { icon: <UploadIcon size={16} className="text-zinc-500" />, title: "Upload and manage files", sub: "Allow the agent to upload and organize files." },
      { icon: <ShieldCheckIcon size={16} className="text-zinc-500" />, title: "Secure & private", sub: "Your data is encrypted and never shared." },
    ],
    buttonText: "Connect Google Drive",
  },
  notion: {
    desc: "Connect your Notion workspace to read, write, and sync your pages.",
    features: [
      { icon: <SearchIcon size={16} className="text-zinc-500" />, title: "Search and read workspace", sub: "Let the agent query database items and pages." },
      { icon: <PenIcon size={16} className="text-zinc-500" />, title: "Create and edit pages", sub: "Allow the agent to update databases and append content." },
      { icon: <ShieldCheckIcon size={16} className="text-zinc-500" />, title: "Secure & private", sub: "Workspace tokens are encrypted and handled safely." },
    ],
    buttonText: "Connect Notion",
  },
  calendar: {
    desc: "Connect your Google Calendar to manage schedules, events, and meetings.",
    features: [
      { icon: <CalendarIcon size={16} className="text-zinc-500" />, title: "Read calendar schedules", sub: "Let the agent view upcoming events and conflicts." },
      { icon: <ClockIcon size={16} className="text-zinc-500" />, title: "Create and edit events", sub: "Allow the agent to schedule meetings and invitees." },
      { icon: <ShieldCheckIcon size={16} className="text-zinc-500" />, title: "Secure & private", sub: "Calendar data is encrypted and private to you." },
    ],
    buttonText: "Connect Google Calendar",
  },
  slack: {
    desc: "Connect your Slack workspace to manage notifications and send messages.",
    features: [
      { icon: <SearchIcon size={16} className="text-zinc-500" />, title: "Read messages", sub: "Let the agent read channel messages and threads." },
      { icon: <SendIcon size={16} className="text-zinc-500" />, title: "Send messages", sub: "Allow the agent to post messages to channels." },
      { icon: <ShieldCheckIcon size={16} className="text-zinc-500" />, title: "Secure & private", sub: "Your workspace data is encrypted and private." },
    ],
    buttonText: "Connect Slack",
  },
  trello: {
    desc: "Connect your Trello account to manage boards, lists, and cards.",
    features: [
      { icon: <SearchIcon size={16} className="text-zinc-500" />, title: "View boards and cards", sub: "Let the agent read your boards, lists, and cards." },
      { icon: <PenIcon size={16} className="text-zinc-500" />, title: "Create and update cards", sub: "Allow the agent to create, move, and update cards." },
      { icon: <ShieldCheckIcon size={16} className="text-zinc-500" />, title: "Secure & private", sub: "Your Trello data is encrypted and private." },
    ],
    buttonText: "Connect Trello",
  },
};

const DEFAULT_DATA = {
  desc: "Connect your account to allow the agent to read and write data.",
  features: [
    { icon: <SearchIcon size={16} className="text-zinc-500" />, title: "Search and access data", sub: "Let the agent search and read your data." },
    { icon: <PenIcon size={16} className="text-zinc-500" />, title: "Modify data", sub: "Allow the agent to edit and upload data." },
    { icon: <ShieldCheckIcon size={16} className="text-zinc-500" />, title: "Secure & private", sub: "All credentials and access tokens are encrypted securely." },
  ],
  buttonText: "Connect",
};

function isGooglePlugin(id: string): boolean {
  return ["gmail", "google-drive", "calendar", "google-docs", "google-sheets", "google-slides", "google-tasks", "google-contacts", "google-chat", "google-meet", "youtube", "google-fit", "google-classroom", "google-photos"].includes(id);
}

export function PluginConnectDialog({
  open,
  onOpenChange,
  plugin,
  onConnect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plugin: PluginConnectData | null;
  onConnect: (id: string) => void;
}) {
  if (!plugin) return null;

  const data = PLUGIN_DATA[plugin.id] || { ...DEFAULT_DATA, buttonText: `Connect ${plugin.name}` };
  const isGoogle = isGooglePlugin(plugin.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{`Connect ${plugin.name}`}</DialogTitle>
          <DialogDescription>{data.desc}</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <div className="flex flex-col gap-4">
            {data.features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                  {f.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-950">{f.title}</div>
                  <div className="text-[13px] text-zinc-500 leading-snug">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </DialogPanel>
        <DialogFooter variant="bare">
          <div className="flex w-full flex-col items-center gap-2">
            <Button
              className="w-full"
              onClick={() => {
                onOpenChange(false);
                onConnect(plugin.id);
              }}
            >
              <span className="flex items-center gap-2">
                {isGoogle && GOOGLE_SVG}
                {data.buttonText}
              </span>
            </Button>
            <span className="text-xs text-zinc-400">You'll be redirected to sign in.</span>
          </div>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
