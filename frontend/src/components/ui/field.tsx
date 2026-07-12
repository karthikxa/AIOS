import * as React from "react"
import { cn } from "@/lib/utils"

export const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-4 w-full", className)}
      {...props}
    />
  )
)
FieldGroup.displayName = "FieldGroup"

export const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex gap-2 w-full",
      orientation === "horizontal" ? "flex-row items-center justify-between" : "flex-col justify-start",
      className
    )}
    {...props}
  />
))
Field.displayName = "Field"

export const FieldContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 min-w-0 flex flex-col gap-0.5", className)}
      {...props}
    />
  )
)
FieldContent.displayName = "FieldContent"

export const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-semibold text-zinc-950 dark:text-zinc-50 cursor-pointer select-none", className)}
    {...props}
  />
))
FieldLabel.displayName = "FieldLabel"

export const FieldTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm font-semibold text-zinc-950 dark:text-zinc-50", className)}
      {...props}
    />
  )
)
FieldTitle.displayName = "FieldTitle"

export const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xs text-zinc-500 leading-normal", className)}
      {...props}
    />
  )
)
FieldDescription.displayName = "FieldDescription"
