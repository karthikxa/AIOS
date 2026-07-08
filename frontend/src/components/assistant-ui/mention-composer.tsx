"use client";

import {
  ComposerPrimitive,
  ComposerTriggerPopover,
  unstable_useMentionAdapter,
} from "@assistant-ui/react";
import { WrenchIcon } from "lucide-react";

export function MentionComposer() {
  const mention = unstable_useMentionAdapter();

  return (
    <ComposerPrimitive.Unstable_TriggerPopoverRoot>
      <ComposerPrimitive.Root>
        <ComposerPrimitive.Input placeholder="Type @ to mention..." />
        <ComposerPrimitive.Send />

        <ComposerTriggerPopover
          char="@"
          {...mention}
          fallbackIcon={WrenchIcon}
        />
      </ComposerPrimitive.Root>
    </ComposerPrimitive.Unstable_TriggerPopoverRoot>
  );
}
