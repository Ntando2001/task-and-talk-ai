import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  id = "theme-toggle",
  variant = "default",
}: {
  id?: string;
  variant?: "default" | "sidebar";
}) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition-colors",
        variant === "sidebar"
          ? "border-sidebar-border hover:bg-sidebar-accent/60"
          : "border-border hover:bg-secondary",
      )}
    >
      <Label htmlFor={id} className="flex items-center gap-2 text-xs font-medium">
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
        {isDark ? "Dark Mode" : "Light Mode"}
      </Label>
      <Switch id={id} checked={isDark} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
    </div>
  );
}