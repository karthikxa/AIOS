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
      className="inline-flex h-9 items-center rounded-full border border-black/5 bg-[#ECEEF1] p-[3px] gap-0.5 shadow-inner min-w-[220px]"
    >
      <ToggleGroupItem
        value="agent"
        className="h-full rounded-full px-4 text-[13px] font-semibold border-none outline-none shadow-none transition-all flex-1 select-none data-[state=on]:bg-white data-[state=on]:text-[#0F172A] data-[state=on]:shadow-[0_1.5px_4px_rgba(0,0,0,0.08)] data-[state=off]:text-[#5A6578] data-[state=off]:bg-transparent data-[state=off]:hover:text-[#1F2937]"
      >
        <User className="mr-1.5 h-4 w-4" strokeWidth={2} />
        Agent
      </ToggleGroupItem>
      <ToggleGroupItem
        value="computer"
        className="h-full rounded-full px-4 text-[13px] font-semibold border-none outline-none shadow-none transition-all flex-1 select-none data-[state=on]:bg-white data-[state=on]:text-[#0F172A] data-[state=on]:shadow-[0_1.5px_4px_rgba(0,0,0,0.08)] data-[state=off]:text-[#5A6578] data-[state=off]:bg-transparent data-[state=off]:hover:text-[#1F2937]"
      >
        <Monitor className="mr-1.5 h-4 w-4" strokeWidth={2} />
        Computer
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
