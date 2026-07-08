"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ComposerPrimitive,
  unstable_defaultDirectiveFormatter,
  type Unstable_TriggerPopoverAdapter,
  type Unstable_DirectiveFormatter,
  type Unstable_TriggerPopoverItem,
  type Unstable_TriggerPopoverCategory,
} from "@assistant-ui/react";
import type { FC, ReactNode } from "react";
import type { ButtonHTMLAttributes } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export type ComposerTriggerPopoverProps = {
  /** Trigger character, e.g. "@" or "/" (required; unique within the root) */
  char: string;
  /** Provides categories, items, and search (required) */
  adapter: Unstable_TriggerPopoverAdapter;
  /** Enables directive-insert behavior. Mutually exclusive with action. */
  directive?: {
    formatter: Unstable_DirectiveFormatter;
    onInserted?: (item: Unstable_TriggerPopoverItem) => void;
    chip?: ReactNode;
  };
  /** Enables action behavior. Mutually exclusive with directive. */
  action?: {
    formatter: Unstable_DirectiveFormatter;
    onExecute: (item: Unstable_TriggerPopoverItem) => void;
    removeOnExecute?: boolean;
    chip?: ReactNode;
  };
  /** Maps item.metadata.icon / category.metadata.icon strings to icons */
  iconMap?: Record<string, FC<{ className?: string }>>;
  /** Icon used when no iconMap entry matches */
  fallbackIcon?: FC<{ className?: string }>;
  /** Back button label */
  backLabel?: string;
  /** Shown when no categories are available */
  emptyCategoriesLabel?: string;
  /** Shown when no items match */
  emptyItemsLabel?: string;
  /** Whether the adapter is resolving items */
  isLoading?: boolean;
  /** Shown in place of emptyItemsLabel while isLoading */
  loadingLabel?: string;
} & Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style" | "children"
>;

// ── Helper hooks ─────────────────────────────────────────────────────────────

function useFilteredItems(
  adapter: Unstable_TriggerPopoverAdapter,
  query: string,
  activeCategory: string | null,
): Unstable_TriggerPopoverItem[] {
  const [items, setItems] = useState<Unstable_TriggerPopoverItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const result = await adapter.getItems({
        query,
        categoryId: activeCategory ?? undefined,
      });
      if (!cancelled) setItems(result);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [adapter, query, activeCategory]);

  return items;
}

function useCategories(
  adapter: Unstable_TriggerPopoverAdapter,
): Unstable_TriggerPopoverCategory[] {
  const [categories, setCategories] = useState<Unstable_TriggerPopoverCategory[]>([]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const result = await adapter.getCategories();
      if (!cancelled) setCategories(result);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [adapter]);

  return categories;
}

// ── Icon helper ──────────────────────────────────────────────────────────────

function getItemIcon(
  item: Unstable_TriggerPopoverItem,
  iconMap?: Record<string, FC<{ className?: string }>>,
  fallbackIcon?: FC<{ className?: string }>,
): FC<{ className?: string }> {
  const iconName = item.metadata?.icon;
  if (iconName && iconMap?.[iconName]) return iconMap[iconName];
  return fallbackIcon ?? (({ className }) => <span className={className}>✦</span>);
}

function getCategoryIcon(
  category: Unstable_TriggerPopoverCategory,
  iconMap?: Record<string, FC<{ className?: string }>>,
  fallbackIcon?: FC<{ className?: string }>,
): FC<{ className?: string }> {
  const iconName = category.metadata?.icon;
  if (iconName && iconMap?.[iconName]) return iconMap[iconName];
  return fallbackIcon ?? (({ className }) => <span className={className}>📂</span>);
}

// ── Styles (inline, no UI changes to existing layout) ────────────────────────

const styles = {
  popover: {
    position: "absolute" as const,
    bottom: "100%",
    left: 0,
    marginBottom: 4,
    minWidth: 280,
    maxHeight: 320,
    overflowY: "auto" as const,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    zIndex: 9999,
    padding: 4,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.1s",
    border: "none",
    background: "none",
    width: "100%",
    textAlign: "left" as const,
    fontSize: 14,
    color: "#111827",
  },
  itemHighlighted: {
    background: "#f3f4f6",
  },
  category: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.1s",
    border: "none",
    background: "none",
    width: "100%",
    textAlign: "left" as const,
    fontSize: 14,
    color: "#111827",
  },
  categoryHighlighted: {
    background: "#f3f4f6",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    background: "none",
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    padding: "6px 12px 2px",
  },
  empty: {
    padding: "16px 12px",
    textAlign: "center" as const,
    color: "#9ca3af",
    fontSize: 13,
  },
} as const;

// ── Component ────────────────────────────────────────────────────────────────

export const ComposerTriggerPopover: FC<ComposerTriggerPopoverProps> = ({
  char,
  adapter,
  directive,
  action,
  iconMap,
  fallbackIcon,
  backLabel = "Back",
  emptyCategoriesLabel = "No items available",
  emptyItemsLabel = "No matching items",
  isLoading = false,
  loadingLabel = "Loading…",
  ...divProps
}) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const categories = useCategories(adapter);
  const items = useFilteredItems(adapter, query, activeCategory);

  const showCategories = activeCategory === null;
  const list = showCategories ? categories : items;
  const isEmpty = list.length === 0 && !isLoading;

  // Reset on close / reopen
  useEffect(() => {
    setQuery("");
    setActiveCategory(null);
    setHighlightedIndex(0);
  }, [char]);

  // Scroll highlighted into view
  useEffect(() => {
    const el = listRef.current?.children[highlightedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  const handleSelect = useCallback(
    (item: Unstable_TriggerPopoverItem | Unstable_TriggerPopoverCategory) => {
      if ("items" in item && Array.isArray(item.items)) {
        // It's a category — drill in
        setActiveCategory(item.id);
        setQuery("");
        setHighlightedIndex(0);
        return;
      }

      const selectedItem = item as Unstable_TriggerPopoverItem;

      if (directive) {
        const text = directive.formatter(selectedItem);
        // Insert into composer via a custom event
        window.dispatchEvent(
          new CustomEvent("composer-trigger-insert", {
            detail: { char, text, item: selectedItem },
          }),
        );
        directive.onInserted?.(selectedItem);
      }

      if (action) {
        const text = action.formatter(selectedItem);
        if (!action.removeOnExecute) {
          window.dispatchEvent(
            new CustomEvent("composer-trigger-insert", {
              detail: { char, text, item: selectedItem },
            }),
          );
        } else {
          window.dispatchEvent(
            new CustomEvent("composer-trigger-remove", {
              detail: { char },
            }),
          );
        }
        action.onExecute(selectedItem);
      }
    },
    [char, directive, action],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((i) => (i + 1) % Math.max(list.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((i) => (i - 1 + list.length) % Math.max(list.length, 1));
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (list[highlightedIndex]) {
          handleSelect(list[highlightedIndex]);
        }
      } else if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        if (list[highlightedIndex]) {
          handleSelect(list[highlightedIndex]);
        }
      } else if (e.key === "Escape") {
        window.dispatchEvent(new CustomEvent("composer-trigger-close"));
      } else if (e.key === "Backspace" && query === "" && activeCategory !== null) {
        e.preventDefault();
        setActiveCategory(null);
        setHighlightedIndex(0);
      }
    },
    [list, highlightedIndex, query, activeCategory, handleSelect],
  );

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label={`${char} options`}
      style={styles.popover}
      onKeyDown={handleKeyDown}
      {...divProps}
    >
      {/* Back button when inside a category */}
      {activeCategory !== null && (
        <button
          style={styles.backBtn}
          onClick={() => {
            setActiveCategory(null);
            setQuery("");
            setHighlightedIndex(0);
          }}
          type="button"
        >
          ← {backLabel}
        </button>
      )}

      {/* Category / Item label */}
      {showCategories && categories.length > 0 && (
        <div style={styles.label}>Mention</div>
      )}
      {!showCategories && (
        <div style={styles.label}>Actions</div>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div style={styles.empty}>
          {isLoading
            ? loadingLabel
            : showCategories
              ? emptyCategoriesLabel
              : emptyItemsLabel}
        </div>
      )}

      {/* Items */}
      {list.map((item, i) => {
        const isHighlighted = i === highlightedIndex;
        const Icon = showCategories
          ? getCategoryIcon(item as Unstable_TriggerPopoverCategory, iconMap, fallbackIcon)
          : getItemIcon(item as Unstable_TriggerPopoverItem, iconMap, fallbackIcon);

        return (
          <button
            key={item.id}
            role="option"
            aria-selected={isHighlighted}
            style={{
              ...(showCategories ? styles.category : styles.item),
              ...(isHighlighted
                ? showCategories
                  ? styles.categoryHighlighted
                  : styles.itemHighlighted
                : {}),
            }}
            onMouseEnter={() => setHighlightedIndex(i)}
            onClick={() => handleSelect(item)}
            type="button"
          >
            <Icon className="w-4 h-4 flex-shrink-0 opacity-60" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500 }}>{item.label}</div>
              {item.description && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
