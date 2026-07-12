"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Thread {
  id: string;
  title: string;
  createdAt: Date;
  lastMessage?: string;
}

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

export function ThreadHistory() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleNewThread = () => {
    const newThread: Thread = {
      id: crypto.randomUUID(),
      title: "New chat",
      createdAt: new Date(),
    };
    setThreads((prev) => [newThread, ...prev]);
    setActiveId(newThread.id);
  };

  const handleSelectThread = (id: string) => {
    setActiveId(id);
  };

  const handleDeleteThread = (id: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== id));
    if (activeId === id) setActiveId(null);
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs font-semibold text-[#9A9A9A] uppercase tracking-wider">
          Chats
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNewThread}
          className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111827] h-7 px-2"
        >
          <PlusIcon />
          New
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-0.5 px-2 pb-2">
          {threads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-[#9A9A9A]">
              <ChatIcon />
              <span className="text-xs mt-2">No chats yet</span>
            </div>
          )}
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => handleSelectThread(thread.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors group ${
                activeId === thread.id
                  ? "bg-[#F4F4F5] text-[#111827] font-medium"
                  : "text-[#6B7280] hover:bg-[rgba(0,0,0,0.03)]"
              }`}
            >
              <div className="truncate">{thread.title}</div>
              {thread.lastMessage && (
                <div className="truncate text-xs text-[#9A9A9A] mt-0.5">
                  {thread.lastMessage}
                </div>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
