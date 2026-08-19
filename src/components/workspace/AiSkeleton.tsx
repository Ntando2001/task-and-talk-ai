import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const widths = ["w-full", "w-11/12", "w-10/12", "w-full", "w-9/12", "w-11/12", "w-8/12"];

export function AiSkeleton({
  lines = 6,
  label = "Generating…",
  className,
}: {
  lines?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-secondary/40 p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2 text-xs font-medium text-primary">
        <Loader2 className="size-3.5 animate-spin" />
        {label}
      </div>
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-3.5 rounded-full", widths[i % widths.length])}
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 shimmer" />
    </div>
  );
}

export function AiCardSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-3.5 w-24 rounded-full" />
          </div>
          <div className="mt-4 space-y-3">
            <Skeleton className="h-14 rounded-lg" />
            <Skeleton className="h-14 rounded-lg" />
          </div>
          <div className="pointer-events-none absolute inset-0 shimmer" />
        </div>
      ))}
    </div>
  );
}