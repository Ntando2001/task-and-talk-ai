import { Mail, FileText, ListChecks, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ViewKey } from "./Sidebar";

const stats = [
  { label: "Drafts generated", value: "48", delta: "+12 this week", icon: Mail },
  { label: "Meetings summarised", value: "17", delta: "+4 this week", icon: FileText },
  { label: "Tasks scheduled", value: "132", delta: "+26 this week", icon: ListChecks },
  { label: "Hours saved (est.)", value: "9.5", delta: "+1.8 this week", icon: TrendingUp },
];

const shortcuts: { key: ViewKey; title: string; body: string }[] = [
  {
    key: "email",
    title: "Smart Email Generator",
    body: "Turn a rough thought into a polished, on-tone email in seconds.",
  },
  {
    key: "meetings",
    title: "Meeting Notes Summarizer",
    body: "Extract the summary, owners, deadlines, and decisions from any transcript.",
  },
  {
    key: "tasks",
    title: "AI Task Planner",
    body: "Sequence your to-do list into a prioritised daily or weekly plan.",
  },
];

export function Overview({ onNavigate }: { onNavigate: (key: ViewKey) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="card-hover">
            <CardContent className="pt-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                <p className="truncate text-sm text-muted-foreground">{s.label}</p>
                <s.icon className="size-4 shrink-0 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-semibold sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-success">{s.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map((s) => (
          <Card key={s.key} className="card-hover flex flex-col">
            <CardHeader>
              <CardTitle className="text-base">{s.title}</CardTitle>
              <CardDescription>{s.body}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate(s.key)}
                className="transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
              >
                Open tool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}