"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProgressStepProps {
  label: string;
  status: "pending" | "active" | "completed" | "failed";
  detail?: string;
}

export function ProgressStep({ label, status, detail }: ProgressStepProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div
        className={cn(
          "mt-1 h-2 w-2 shrink-0 rounded-full",
          status === "completed" && "bg-green-500",
          status === "active" && "bg-blue-500 animate-pulse",
          status === "failed" && "bg-destructive",
          status === "pending" && "bg-muted-foreground/30"
        )}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm",
              status === "active" && "font-medium",
              (status === "completed" || status === "pending") && "text-muted-foreground"
            )}
          >
            {label}
          </span>
          {status === "failed" && (
            <Badge variant="destructive" className="text-[10px]">
              Failed
            </Badge>
          )}
        </div>
        {detail && (
          <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
        )}
      </div>
    </div>
  );
}

interface ToolIndicatorProps {
  name: string;
  status: "running" | "completed" | "failed";
  icon?: React.ReactNode;
}

export function ToolIndicator({ name, status, icon }: ToolIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground">
      <div
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "running" && "bg-blue-500 animate-pulse",
          status === "completed" && "bg-green-500",
          status === "failed" && "bg-destructive"
        )}
      />
      {icon}
      <span className="truncate">{name}</span>
    </div>
  );
}
