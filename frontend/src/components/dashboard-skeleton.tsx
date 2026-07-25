import { Skeleton } from "@/components/ui/skeleton";
import Particle from "@/components/particle-skeleton";

export { Particle };

export function ButtonSkeleton({ className = "h-9 w-24" }: { className?: string }) {
  return <Skeleton className={`rounded-md ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="flex flex-1 items-start gap-3 rounded-xl border p-4 shadow-sm bg-card">
      <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-10 rounded-full" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar p-4 gap-4">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-5 w-20" />
      </div>

      {/* Nav Items */}
      <div className="flex-1 space-y-2 mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}

        <div className="pt-4 pb-2 px-3">
          <Skeleton className="h-3 w-12" />
        </div>

        {/* Recent Chats */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-36" />
          </div>
        ))}
      </div>

      {/* Footer Profile */}
      <div className="flex items-center gap-3 pt-4 border-t px-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ChatMessageSkeleton({ isAssistant = false }: { isAssistant?: boolean }) {
  return (
    <div className={`flex w-full gap-3 ${isAssistant ? "justify-start" : "justify-end"} py-3`}>
      {isAssistant && <Skeleton className="h-8 w-8 shrink-0 rounded-full" />}
      <div className={`flex flex-col space-y-2 ${isAssistant ? "max-w-xl" : "max-w-md items-end"}`}>
        <Skeleton className={`h-14 w-full rounded-2xl ${isAssistant ? "rounded-tl-none" : "rounded-tr-none"}`} />
        <Skeleton className="h-3 w-20" />
      </div>
      {!isAssistant && <Skeleton className="h-8 w-8 shrink-0 rounded-full" />}
    </div>
  );
}

export function ChatInputSkeleton() {
  return (
    <div className="w-full max-w-3xl rounded-2xl border p-4 shadow-lg bg-card space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar Skeleton */}
      <SidebarSkeleton />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full">
        {/* Top App Header */}
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </header>

        {/* Center Container */}
        <main className="flex-1 flex flex-col items-center justify-between p-6 overflow-y-auto">
          <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl space-y-8">
            {/* Hero / Empty State Skeleton */}
            <div className="flex flex-col items-center space-y-3">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-6 w-64" />
            </div>

            {/* Feature Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <CardSkeleton />
              <CardSkeleton />
            </div>

            {/* Particle Item Example */}
            <div className="w-full flex justify-center pt-2">
              <Particle />
            </div>
          </div>

          {/* Floating Chat Input Box Skeleton */}
          <div className="w-full flex justify-center pt-4">
            <ChatInputSkeleton />
          </div>
        </main>
      </div>
    </div>
  );
}
