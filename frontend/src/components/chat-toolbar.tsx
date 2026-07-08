"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Paperclip,
  Code,
  Bookmark,
  Globe,
  Mic,
  SendHorizontal,
  Square,
} from "lucide-react";

export function ChatToolbar() {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Paperclip className="mr-2 h-4 w-4" />
              Add files
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Code className="mr-2 h-4 w-4" />
              Import code
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              Saved prompt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-1">
        <Toggle size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
          <Globe className="h-3.5 w-3.5" />
          Web Search
        </Toggle>
        <Separator orientation="vertical" className="h-5 mx-1" />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Mic className="h-4 w-4" />
        </Button>
        <Button size="icon" className="h-8 w-8 rounded-full">
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function StopButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="destructive"
      size="icon"
      className="h-8 w-8 rounded-full"
      onClick={onClick}
    >
      <Square className="h-3.5 w-3.5" />
    </Button>
  );
}
