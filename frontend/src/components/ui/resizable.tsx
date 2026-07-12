import * as React from "react"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex w-full h-full",
      orientation === "vertical" ? "flex-col" : "flex-row",
      className
    )}
    {...props}
  />
))
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { defaultSize?: string | number }
>(({ className, defaultSize, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-hidden", className)}
    style={{ flexGrow: defaultSize ? parseFloat(String(defaultSize)) : 1, ...style }}
    {...props}
  />
))
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { withHandle?: boolean }
>(({ className, withHandle, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-none flex items-center justify-center bg-zinc-200 dark:bg-zinc-800",
      "w-1 h-full cursor-col-resize select-none mx-0.5",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-zinc-100 dark:bg-zinc-900 shadow-sm">
        <GripVertical className="h-2.5 w-2.5 text-zinc-500" />
      </div>
    )}
  </div>
))
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
