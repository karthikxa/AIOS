"use client";

import { useCallback, useMemo, useState } from "react";
import {
  unstable_defaultDirectiveFormatter,
  type Unstable_TriggerPopoverAdapter,
  type Unstable_TriggerPopoverItem,
  type Unstable_TriggerPopoverCategory,
  type Unstable_DirectiveFormatter,
} from "@assistant-ui/react";

export type MentionAdapterOptions = {
  /** Custom items list (flat) */
  items?: Unstable_TriggerPopoverItem[];
  /** Multi-category drill-down */
  categories?: Unstable_TriggerPopoverCategory[];
  /** Include model context tools */
  includeModelContextTools?: boolean;
  /** Custom formatter for the directive text */
  formatter?: Unstable_DirectiveFormatter;
  /** Callback fired after the directive has been inserted */
  onInserted?: (item: Unstable_TriggerPopoverItem) => void;
};

export function unstable_useMentionAdapter(options: MentionAdapterOptions = {}) {
  const {
    items: customItems,
    categories: customCategories,
    includeModelContextTools = false,
    formatter = unstable_defaultDirectiveFormatter,
    onInserted,
  } = options;

  const adapter: Unstable_TriggerPopoverAdapter = useMemo(
    () => ({
      getCategories: async () => {
        if (customCategories) return customCategories;
        if (customItems) {
          // Group flat items into a single category
          return [
            {
              id: "all",
              label: "All",
              items: customItems,
            },
          ];
        }
        return [];
      },
      getItems: async ({ query, categoryId }) => {
        let sourceItems = customItems ?? [];

        if (categoryId && customCategories) {
          const cat = customCategories.find((c) => c.id === categoryId);
          if (cat?.items) sourceItems = cat.items;
        }

        if (!query) return sourceItems;

        const q = query.toLowerCase();
        return sourceItems.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q),
        );
      },
    }),
    [customItems, customCategories, includeModelContextTools],
  );

  const directive = useMemo(
    () => ({
      formatter,
      onInserted,
    }),
    [formatter, onInserted],
  );

  return { adapter, directive };
}
