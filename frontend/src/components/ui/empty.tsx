import * as React from "react"
import { cn } from "@/lib/utils"

export const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-lg bg-zinc-50/50 dark:bg-zinc-950/20", className)}
      {...props}
    />
  )
)
Empty.displayName = "Empty"

export const EmptyHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col items-center gap-2 max-w-[360px]", className)}
      {...props}
    />
  )
)
EmptyHeader.displayName = "EmptyHeader"

export const EmptyMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: string }>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-full bg-zinc-100 p-3 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  )
)
EmptyMedia.displayName = "EmptyMedia"

export const EmptyTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-sm font-semibold text-zinc-950 dark:text-zinc-50 mt-2", className)}
      {...props}
    />
  )
)
EmptyTitle.displayName = "EmptyTitle"

export const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xs text-zinc-500 mt-1 leading-relaxed", className)}
      {...props}
    />
  )
)
EmptyDescription.displayName = "EmptyDescription"

export const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 mt-4 w-full justify-center", className)}
      {...props}
    />
  )
)
EmptyContent.displayName = "EmptyContent"
