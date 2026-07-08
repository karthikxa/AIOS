"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const models = [
  { id: "zed-pro", name: "Zed Pro", badge: "Pro" },
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "claude-3", name: "Claude 3" },
];

export function ModelSelector() {
  const [selected, setSelected] = useState("zed-pro");

  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-auto h-8 gap-1.5 border-none bg-transparent text-xs font-medium">
        <Sparkles className="h-3.5 w-3.5" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <span className="flex items-center gap-2">
              {model.name}
              {model.badge && (
                <Badge variant="secondary" className="text-[10px] px-1 py-0">
                  {model.badge}
                </Badge>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
