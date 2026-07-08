"use client";

import { useCallback, useMemo, useState } from "react";
import {
  unstable_defaultDirectiveFormatter,
  type Unstable_TriggerPopoverAdapter,
  type Unstable_TriggerPopoverItem,
  type Unstable_TriggerPopoverCategory,
  type Unstable_DirectiveFormatter,
} from "@assistant-ui/react";

export type Unstable_SlashCommand = {
  id: string;
  description: string;
  icon?: string;
  execute: () => void;
};

export type SlashCommandAdapterOptions = {
  /** List of slash commands */
  commands: readonly Unstable_SlashCommand[];
  /** Custom formatter for the directive text */
  formatter?: Unstable_DirectiveFormatter;
};

export function unstable_useSlashCommandAdapter(options: SlashCommandAdapterOptions) {
  const { commands, formatter = unstable_defaultDirectiveFormatter } = options;

  const adapter: Unstable_TriggerPopoverAdapter = useMemo(
    () => ({
      getCategories: async () => {
        return [
          {
            id: "commands",
            label: "Commands",
            items: commands.map((cmd) => ({
              id: cmd.id,
              label: `/${cmd.id}`,
              description: cmd.description,
              metadata: cmd.icon ? { icon: cmd.icon } : undefined,
            })),
          },
        ];
      },
      getItems: async ({ query }) => {
        if (!query) {
          return commands.map((cmd) => ({
            id: cmd.id,
            label: `/${cmd.id}`,
            description: cmd.description,
            metadata: cmd.icon ? { icon: cmd.icon } : undefined,
          }));
        }

        const q = query.toLowerCase().replace(/^\//, "");
        return commands
          .filter(
            (cmd) =>
              cmd.id.toLowerCase().includes(q) ||
              cmd.description.toLowerCase().includes(q),
          )
          .map((cmd) => ({
            id: cmd.id,
            label: `/${cmd.id}`,
            description: cmd.description,
            metadata: cmd.icon ? { icon: cmd.icon } : undefined,
          }));
      },
    }),
    [commands],
  );

  const action = useMemo(
    () => ({
      formatter,
      onExecute: (item: Unstable_TriggerPopoverItem) => {
        const cmd = commands.find((c) => c.id === item.id);
        cmd?.execute();
      },
    }),
    [commands, formatter],
  );

  return { adapter, action };
}
