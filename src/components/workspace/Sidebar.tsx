import { Bot, LayoutDashboard, Mail, FileText, ListChecks, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary shadow-[var(--shadow-glow)]">
          <Bot className="size-5 text-sidebar-primary-foreground" />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="text-sm font-semibold text-sidebar-accent-foreground">Workplace AI</p>
          <p className="text-xs text-sidebar-foreground/60">Productivity Assistant</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:translate-x-0.5 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary transition-all duration-200",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              <item.icon
                className={cn(
                  "size-4 shrink-0 transition-colors",
                  isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-primary",
                )}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-3 space-y-3 rounded-xl border border-sidebar-border p-3">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="bg-sidebar-accent text-xs text-sidebar-accent-foreground">
              NT
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-accent-foreground">Ntando</p>
            <p className="truncate text-xs text-sidebar-foreground/60">Product Operations</p>
          </div>
        </div>
        <ThemeToggle id="sidebar-theme" variant="sidebar" />
      </div>
    </div>
  );
}