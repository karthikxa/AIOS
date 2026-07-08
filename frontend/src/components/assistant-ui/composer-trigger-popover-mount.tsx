"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { CombinedComposer } from "./combined-composer";

/**
 * Mounts the React-based Composer Trigger Popover into the existing vanilla JS app.
 * This component renders into a dedicated container that doesn't affect existing UI.
 */
export function ComposerTriggerPopoverMount() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  useEffect(() => {
    if (containerRef.current && !rootRef.current) {
      rootRef.current = createRoot(containerRef.current);
      rootRef.current.render(<CombinedComposer />);
    }

    return () => {
      rootRef.current?.unmount();
      rootRef.current = null;
    };
  }, []);

  return <div ref={containerRef} id="composer-trigger-popover-root" />;
}
