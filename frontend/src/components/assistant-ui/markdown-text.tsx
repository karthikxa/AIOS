"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface MarkdownTextProps {
  children: string;
  className?: string;
}

function MarkdownTextImpl({ children, className }: MarkdownTextProps) {
  // Simple markdown rendering - bold, italic, code, links
  const renderMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div
      data-slot="markdown-text"
      className={cn("aui-markdown-text prose prose-sm max-w-none", className)}
    >
      {children.split("\n").map((line, i) => (
        <p key={i} className="mb-2 last:mb-0">
          {renderMarkdown(line)}
        </p>
      ))}
    </div>
  );
}

export const MarkdownText = memo(MarkdownTextImpl);
