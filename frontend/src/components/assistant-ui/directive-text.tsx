"use client";

import type { FC } from "react";

export type DirectiveTextProps = {
  /** The raw directive text, e.g. ":tool[Label]{name=id}" */
  text: string;
  /** Optional className */
  className?: string;
};

/**
 * Renders mention chips in user messages.
 * Parses directive text like ":tool[Label]{name=id}" and renders as a styled chip.
 */
export const DirectiveText: FC<DirectiveTextProps> = ({ text, className }) => {
  // Parse directive format: :type[Label]{key=value,key2=value2}
  const match = text.match(/^:(\w+)\[(.+?)\]\{(.+)\}$/);

  if (!match) {
    return <span className={className}>{text}</span>;
  }

  const [, type, label, paramsStr] = match;
  const params = Object.fromEntries(
    paramsStr.split(",").map((p) => {
      const [key, value] = p.split("=");
      return [key, value];
    }),
  );

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 500,
        color: "#374151",
        verticalAlign: "middle",
      }}
    >
      <span style={{ opacity: 0.6 }}>@</span>
      {label}
    </span>
  );
};
