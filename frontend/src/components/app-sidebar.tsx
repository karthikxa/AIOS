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
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
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
  { id: "chat-1", label: "search about the top5 e..." },
  { id: "chat-2", label: "research about iphone ..." },
]

export function AppSidebar() {
  const [activeId, setActiveId] = useState("navNewTask")

  return (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="zed">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xs font-bold">Z</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">zed</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
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

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="User">
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  K
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">User</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Main content goes here */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
