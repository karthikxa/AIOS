"use client";

import { FeatureCards } from "./feature-cards";

export function EmptyStateView() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">zed</h1>
        <p className="text-lg text-muted-foreground">How can I help you today?</p>
      </div>
      <FeatureCards />
    </div>
  );
}
