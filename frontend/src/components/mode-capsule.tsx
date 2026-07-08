"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { User, Monitor } from "lucide-react";

export function ModeCapsule() {
  const [mode, setMode] = useState("agent");

  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(value) => {
        if (value) setMode(value);
      }}
      className="inline-flex h-9 items-center rounded-full border bg-background p-1"
    >
      <ToggleGroupItem
        value="agent"
        className="h-7 rounded-full px-3 text-xs font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        <User className="mr-1.5 h-3.5 w-3.5" />
        Agent
      </ToggleGroupItem>
      <ToggleGroupItem
        value="computer"
        className="h-7 rounded-full px-3 text-xs font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        <Monitor className="mr-1.5 h-3.5 w-3.5" />
        Computer
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
