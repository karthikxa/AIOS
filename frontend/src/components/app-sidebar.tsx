"use client"

import { useState } from "react"
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
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Plus,
  Bot,
  Mic,
  Boxes,
  Puzzle,
  Calendar,
  Library,
  MessageSquare,
  PanelLeftIcon,
} from "lucide-react"

const navItems = [
  { id: "navNewTask", label: "New task", icon: Plus },
  { id: "navAgent", label: "Agent", icon: Bot },
  { id: "navVoice", label: "Voice", icon: Mic },
  { id: "navModel", label: "Models", icon: Boxes },
  { id: "navPlugins", label: "Plugins", icon: Puzzle },
  { id: "navScheduled", label: "Scheduled", icon: Calendar },
  { id: "navLibrary", label: "Library", icon: Library },
]

const chats = [
  { id: "chat-1", label: "How can I help you today?" },
]

export function AppSidebar() {
  const [activeId, setActiveId] = useState("navNewTask")
  const { state, toggleSidebar } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center gap-2 px-3 py-2">
        <SidebarMenuButton
          onClick={toggleSidebar}
          size="lg"
          className="data-[state=open]:bg-sidebar-accent"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xs font-bold">Z</span>
          </div>
          {state === "expanded" && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">zed</span>
            </div>
          )}
        </SidebarMenuButton>
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
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton tooltip={chat.label}>
                    <MessageSquare />
                    <span className="truncate">{chat.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="User">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium">
                K
              </div>
              {state === "expanded" && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">User</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
