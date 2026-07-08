"use client";

import { BranchPickerPrimitive } from "@assistant-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const styles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#6b7280",
    userSelect: "none" as const,
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: "#6b7280",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.15s, color 0.15s",
    outline: "none",
  },
  btnDisabled: {
    opacity: 0.3,
    cursor: "default",
  },
  count: {
    minWidth: 40,
    textAlign: "center" as const,
    fontVariantNumeric: "tabular-nums",
  },
} as const;

export function BranchPicker() {
  return (
    <BranchPickerPrimitive.Root hideWhenSingleBranch style={styles.root}>
      <BranchPickerPrimitive.Previous
        style={styles.btn}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.color = "#111827";
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#6b7280";
        }}
      >
        <ChevronLeft className="w-4 h-4" />
      </BranchPickerPrimitive.Previous>

      <span style={styles.count}>
        <BranchPickerPrimitive.Number />
        {" / "}
        <BranchPickerPrimitive.Count />
      </span>

      <BranchPickerPrimitive.Next
        style={styles.btn}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.color = "#111827";
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#6b7280";
        }}
      >
        <ChevronRight className="w-4 h-4" />
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
}
