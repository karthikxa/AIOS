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
} from "@/components/ui/sidebar"
import {
  Plus,
  Bot,
  Boxes,
  Puzzle,
  Calendar,
  MessageSquare,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react"
import { ModeCapsule } from "@/components/mode-capsule"
import { AppView } from "@/App"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
  activeView: AppView
  onNavigate: (view: AppView) => void
  theme: "light" | "dark"
  onToggleTheme: () => void
}

const navItems: { id: AppView; label: string; icon: any }[] = [
  { id: "chat", label: "New Task", icon: Plus },
  { id: "agent", label: "Agent Mode", icon: Bot },
  { id: "models", label: "Models", icon: Boxes },
  { id: "plugins", label: "Plugins", icon: Puzzle },
  { id: "scheduled", label: "Schedules", icon: Calendar },
]

export function AppSidebar({ activeView, onNavigate, theme, onToggleTheme }: AppSidebarProps) {
  const [chats] = useState([
    { id: "chat-1", label: "Search top 5 AI models" },
    { id: "chat-2", label: "Refactor backend API" },
  ])

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-accent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                Z
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold tracking-tight text-base">zed</span>
                <span className="truncate text-xs text-muted-foreground">AI Workspace</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Capsule Toggle Section */}
        <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Mode Switcher
            </span>
          </div>
          <ModeCapsule />
        </div>

        <SidebarSeparator />

        {/* Primary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* History */}
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton tooltip={chat.label} onClick={() => onNavigate("chat")}>
                    <MessageSquare className="w-4 h-4" />
                    <span className="truncate">{chat.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton size="lg" tooltip="User Account">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium border">
                U
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">User</span>
                <span className="truncate text-xs text-muted-foreground">Pro Plan</span>
              </div>
            </SidebarMenuButton>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md shrink-0 group-data-[collapsible=icon]:hidden"
              onClick={onToggleTheme}
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
