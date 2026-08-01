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
      className="inline-flex h-8 items-center rounded-full border border-border/80 bg-muted/40 p-0.5 gap-0.5 shadow-xs"
    >
      <ToggleGroupItem
        value="agent"
        className="h-7 rounded-full px-3 text-xs font-semibold border-none outline-none shadow-none transition-all data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-sm data-[state=off]:text-muted-foreground data-[state=off]:bg-transparent data-[state=off]:hover:text-foreground"
      >
        <User className="mr-1.5 h-3.5 w-3.5" />
        Agent
      </ToggleGroupItem>
      <ToggleGroupItem
        value="computer"
        className="h-7 rounded-full px-3 text-xs font-semibold border-none outline-none shadow-none transition-all data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-sm data-[state=off]:text-muted-foreground data-[state=off]:bg-transparent data-[state=off]:hover:text-foreground"
      >
        <Monitor className="mr-1.5 h-3.5 w-3.5" />
        Computer
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
