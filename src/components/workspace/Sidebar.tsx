import { Bot, LayoutDashboard, Mail, FileText, ListChecks, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewKey = "overview" | "email" | "meetings" | "tasks" | "settings";

export const navItems: { key: ViewKey; label: string; icon: typeof Mail }[] = [
  { key: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
  { key: "email", label: "Email Generator", icon: Mail },
  { key: "meetings", label: "Meeting Summarizer", icon: FileText },
  { key: "tasks", label: "Task Planner", icon: ListChecks },
  { key: "settings", label: "Settings", icon: Settings },
];

export function SidebarNav({
  active,
  onSelect,
}: {
  active: ViewKey;
  onSelect: (key: ViewKey) => void;
}) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary">
          <Bot className="size-5 text-sidebar-primary-foreground" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-sidebar-accent-foreground">Workplace AI</p>
          <p className="text-xs text-sidebar-foreground/60">Productivity Assistant</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border p-4">
        <p className="text-xs font-medium text-sidebar-accent-foreground">Simulation mode</p>
        <p className="mt-1 text-xs text-sidebar-foreground/60">
          Outputs are illustrative examples generated locally.
        </p>
      </div>
    </div>
  );
}