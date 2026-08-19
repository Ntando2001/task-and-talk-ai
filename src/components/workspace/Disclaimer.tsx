import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="sticky bottom-0 z-20 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-6xl items-start gap-3">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Responsible AI Disclaimer:</span> This
          tool uses AI to assist your workflow. Please review and verify all generated content
          before sending or implementing.
        </p>
      </div>
    </div>
  );
}