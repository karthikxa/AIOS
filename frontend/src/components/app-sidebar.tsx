"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Bot,
  Mic,
  Boxes,
  Puzzle,
  Calendar,
  Library,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

const navItems = [
  { id: "navNewTask", label: "New task", icon: Plus },
  { id: "navAgent", label: "Agent", icon: Bot },
  { id: "navVoice", label: "Voice", icon: Mic },
  { id: "navModel", label: "Models", icon: Boxes },
  { id: "navPlugins", label: "Plugins", icon: Puzzle },
  { id: "navScheduled", label: "Scheduled", icon: Calendar },
  { id: "navLibrary", label: "Library", icon: Library },
];

const chats = [
  { id: "chat-1", label: "How can I help you today?" },
];

export function AppSidebar() {
  const [activeId, setActiveId] = useState("navNewTask");

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-primary-foreground">Z</span>
          </div>
          <span className="text-base font-semibold">zed</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeId === item.id}
                    onClick={() => setActiveId(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span className="truncate">{chat.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">User</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
