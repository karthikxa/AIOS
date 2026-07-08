"use client";

import { memo, useRef, type ComponentPropsWithoutRef, type FC } from "react";
import {
  ComposerPrimitive,
  unstable_defaultDirectiveFormatter,
  unstable_useTriggerPopoverScopeContext,
  type Unstable_DirectiveFormatter,
  type Unstable_TriggerItem,
} from "@assistant-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from "lucide-react";

type IconComponent = FC<{ className?: string }>;

type DirectiveBehaviorProps = {
  formatter?: Unstable_DirectiveFormatter | undefined;
  onInserted?: ((item: Unstable_TriggerItem) => void) | undefined;
};

type ActionBehaviorProps = {
  formatter?: Unstable_DirectiveFormatter | undefined;
  onExecute: (item: Unstable_TriggerItem) => void;
  removeOnExecute?: boolean | undefined;
};

type ComposerTriggerPopoverBaseProps = Omit<
  ComponentPropsWithoutRef<typeof ComposerPrimitive.Unstable_TriggerPopover>,
  "children"
> & {
  iconMap?: Record<string, IconComponent>;
  fallbackIcon?: IconComponent;
  backLabel?: string;
  emptyCategoriesLabel?: string;
  emptyItemsLabel?: string;
  loadingLabel?: string;
};

type ComposerTriggerPopoverProps = ComposerTriggerPopoverBaseProps &
  (
    | { directive: DirectiveBehaviorProps; action?: never }
    | { action: ActionBehaviorProps; directive?: never }
  );

function resolveIcon(
  iconKey: string | undefined,
  iconMap: Record<string, IconComponent> | undefined,
  fallback: IconComponent,
): IconComponent {
  if (iconKey && iconMap?.[iconKey]) return iconMap[iconKey]!;
  return fallback;
}

/* ── Inline styles matching existing zed chat UI ────────────────────────── */

const s = {
  popover: {
    position: "absolute" as const,
    bottom: "100%",
    left: 0,
    marginBottom: 8,
    width: 256,
    overflow: "hidden",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    background: "#fff",
    color: "#111827",
    zIndex: 50,
  },
  categories: {
    display: "flex",
    flexDirection: "column" as const,
    padding: "4px 0",
  },
  categoryItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: "8px 12px",
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    background: "none",
    width: "100%",
    textAlign: "left" as const,
    color: "#111827",
    transition: "background 0.1s",
    outline: "none",
  },
  items: {
    display: "flex",
    flexDirection: "column" as const,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 12px",
    fontSize: 11,
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    cursor: "pointer",
    borderBottom: "1px solid #f3f4f6",
    border: "none",
    borderBottom: "1px solid #f3f4f6",
    background: "none",
    width: "100%",
    textAlign: "left" as const,
    transition: "background 0.1s",
    outline: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: 2,
    padding: "8px 12px",
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    background: "none",
    width: "100%",
    textAlign: "left" as const,
    color: "#111827",
    transition: "background 0.1s",
    outline: "none",
  },
  itemLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 500,
  },
  itemDesc: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: "1.3",
    marginLeft: 22,
  },
  empty: {
    padding: "8px 12px",
    fontSize: 14,
    color: "#9ca3af",
  },
  highlighted: {
    background: "#f3f4f6",
  },
} as const;

/* ── Categories ─────────────────────────────────────────────────────────── */

type CategoriesProps = {
  iconMap: Record<string, IconComponent> | undefined;
  fallbackIcon: IconComponent;
  emptyLabel: string;
};

const Categories: FC<CategoriesProps> = ({
  iconMap,
  fallbackIcon,
  emptyLabel,
}) => (
  <ComposerPrimitive.Unstable_TriggerPopoverCategories>
    {(categories) => (
      <div data-slot="composer-trigger-popover-categories" style={s.categories}>
        {categories.map((cat) => {
          const Icon = resolveIcon(cat.id, iconMap, fallbackIcon);
          return (
            <ComposerPrimitive.Unstable_TriggerPopoverCategoryItem
              key={cat.id}
              categoryId={cat.id}
              style={s.categoryItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "none")
              }
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon className="w-4 h-4" style={{ opacity: 0.5 }} />
                {cat.label}
              </span>
              <ChevronRightIcon className="w-4 h-4" style={{ opacity: 0.5 }} />
            </ComposerPrimitive.Unstable_TriggerPopoverCategoryItem>
          );
        })}
        {categories.length === 0 && (
          <div style={s.empty}>{emptyLabel}</div>
        )}
      </div>
    )}
  </ComposerPrimitive.Unstable_TriggerPopoverCategories>
);

/* ── Items ──────────────────────────────────────────────────────────────── */

type ItemsProps = {
  iconMap: Record<string, IconComponent> | undefined;
  fallbackIcon: IconComponent;
  backLabel: string;
  emptyLabel: string;
  loadingLabel: string;
};

const Items: FC<ItemsProps> = ({
  iconMap,
  fallbackIcon,
  backLabel,
  emptyLabel,
  loadingLabel,
}) => {
  const { isLoading } = unstable_useTriggerPopoverScopeContext();
  return (
    <ComposerPrimitive.Unstable_TriggerPopoverItems>
      {(items) => (
        <div data-slot="composer-trigger-popover-items" style={s.items}>
          <ComposerPrimitive.Unstable_TriggerPopoverBack
            style={s.backBtn}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#f3f4f6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "none")
            }
          >
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            {backLabel}
          </ComposerPrimitive.Unstable_TriggerPopoverBack>

          <div style={{ padding: "4px 0" }}>
            {items.map((item, index) => {
              const iconKey =
                typeof item.metadata?.icon === "string"
                  ? item.metadata.icon
                  : undefined;
              const Icon = resolveIcon(iconKey, iconMap, fallbackIcon);
              return (
                <ComposerPrimitive.Unstable_TriggerPopoverItem
                  key={item.id}
                  item={item}
                  index={index}
                  style={s.item}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  <span style={s.itemLabel}>
                    <Icon className="w-3.5 h-3.5" style={{ opacity: 0.6 }} />
                    {item.label}
                  </span>
                  {item.description && (
                    <span style={s.itemDesc}>{item.description}</span>
                  )}
                </ComposerPrimitive.Unstable_TriggerPopoverItem>
              );
            })}
            {items.length === 0 && (
              <div style={s.empty}>
                {isLoading ? loadingLabel : emptyLabel}
              </div>
            )}
          </div>
        </div>
      )}
    </ComposerPrimitive.Unstable_TriggerPopoverItems>
  );
};

/* ── Main component ─────────────────────────────────────────────────────── */

const ComposerTriggerPopoverImpl: FC<ComposerTriggerPopoverProps> = ({
  iconMap,
  fallbackIcon = SparklesIcon,
  backLabel = "Back",
  emptyCategoriesLabel = "No items available",
  emptyItemsLabel = "No matching items",
  loadingLabel = "Loading…",
  className,
  directive,
  action,
  ...props
}) => {
  const warnedRef = useRef(false);
  if (
    process.env.NODE_ENV !== "production" &&
    !warnedRef.current &&
    Boolean(directive) === Boolean(action)
  ) {
    warnedRef.current = true;
    console.warn(
      "[assistant-ui] ComposerTriggerPopover requires exactly one of `directive` or `action` props.",
    );
  }

  return (
    <ComposerPrimitive.Unstable_TriggerPopover
      data-slot="composer-trigger-popover"
      style={s.popover}
      {...props}
    >
      {directive ? (
        <ComposerPrimitive.Unstable_TriggerPopover.Directive
          formatter={directive.formatter ?? unstable_defaultDirectiveFormatter}
          onInserted={directive.onInserted}
        />
      ) : action ? (
        <ComposerPrimitive.Unstable_TriggerPopover.Action
          formatter={action.formatter ?? unstable_defaultDirectiveFormatter}
          onExecute={action.onExecute}
          removeOnExecute={action.removeOnExecute}
        />
      ) : null}
      <Categories
        iconMap={iconMap}
        fallbackIcon={fallbackIcon}
        emptyLabel={emptyCategoriesLabel}
      />
      <Items
        iconMap={iconMap}
        fallbackIcon={fallbackIcon}
        backLabel={backLabel}
        emptyLabel={emptyItemsLabel}
        loadingLabel={loadingLabel}
      />
    </ComposerPrimitive.Unstable_TriggerPopover>
  );
};
ComposerTriggerPopoverImpl.displayName = "ComposerTriggerPopover";

export const ComposerTriggerPopover = memo(
  ComposerTriggerPopoverImpl,
) as FC<ComposerTriggerPopoverProps>;
