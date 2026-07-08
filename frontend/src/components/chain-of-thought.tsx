"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThoughtStep {
  label: string;
  status: "pending" | "active" | "completed";
  content?: string;
}

interface ChainOfThoughtProps {
  steps: ThoughtStep[];
  title?: string;
}

export function ChainOfThought({ steps, title = "Thinking Process" }: ChainOfThoughtProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50"
        >
          <span className="flex items-center gap-2">
            <span>{title}</span>
            <Badge variant="secondary" className="text-[10px]">
              {steps.filter((s) => s.status === "completed").length}/{steps.length}
            </Badge>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              open && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        <div className="flex flex-col gap-1.5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm"
            >
              <div className="mt-0.5 shrink-0">
                {step.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : step.status === "active" ? (
                  <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    "text-sm",
                    step.status === "completed" && "text-muted-foreground",
                    step.status === "active" && "font-medium",
                    step.status === "pending" && "text-muted-foreground/60"
                  )}
                >
                  {step.label}
                </span>
                {step.content && (
                  <p className="text-xs text-muted-foreground mt-0.5 whitespace-pre-wrap">
                    {step.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
