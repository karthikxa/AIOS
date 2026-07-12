import * as React from "react"
import { cn } from "@/lib/utils"

export const Item = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: string }>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border",
        variant === "muted" ? "bg-zinc-50 border-zinc-100 dark:bg-zinc-900/50 dark:border-zinc-800" : "bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-850",
        className
      )}
      {...props}
    />
  )
)
Item.displayName = "Item"

export const ItemMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-none flex items-center justify-center", className)}
      {...props}
    />
  )
)
ItemMedia.displayName = "ItemMedia"

export const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 min-w-0 flex flex-col gap-0.5", className)}
      {...props}
    />
  )
)
ItemContent.displayName = "ItemContent"

export const ItemTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate", className)}
      {...props}
    />
  )
)
ItemTitle.displayName = "ItemTitle"
