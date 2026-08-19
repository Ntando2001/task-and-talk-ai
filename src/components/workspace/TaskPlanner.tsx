import { useState } from "react";
import { Clock, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Priority = "High Priority" | "Medium Priority" | "Low Priority";
type Task = { title: string; slot: string; priority: Priority };

const columns: { key: Priority; accent: string }[] = [
  { key: "High Priority", accent: "bg-destructive" },
  { key: "Medium Priority", accent: "bg-warning" },
  { key: "Low Priority", accent: "bg-success" },
];

const dailyPlan: Task[] = [
  { title: "Finalise billing rewrite brief", slot: "08:30 – 09:30", priority: "High Priority" },
  { title: "Client escalation call prep", slot: "09:45 – 10:15", priority: "High Priority" },
  { title: "Review onboarding metrics", slot: "11:00 – 11:45", priority: "Medium Priority" },
  { title: "Sync with design on screens", slot: "13:30 – 14:00", priority: "Medium Priority" },
  { title: "Tidy shared docs folder", slot: "16:00 – 16:20", priority: "Low Priority" },
  { title: "Read industry newsletter", slot: "16:30 – 16:45", priority: "Low Priority" },
];

const weeklyPlan: Task[] = [
  { title: "Ship invoice service to staging", slot: "Mon – Tue", priority: "High Priority" },
  { title: "Leadership activation review", slot: "Thu morning", priority: "High Priority" },
  { title: "Churn interviews (5 accounts)", slot: "Wed – Thu", priority: "Medium Priority" },
  { title: "Update support macros", slot: "Wed afternoon", priority: "Medium Priority" },
  { title: "Refresh internal wiki", slot: "Fri afternoon", priority: "Low Priority" },
  { title: "Backlog grooming pass", slot: "Fri late", priority: "Low Priority" },
];

export function TaskPlanner() {
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState<"Daily" | "Weekly">("Daily");
  const [plan, setPlan] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(false);

  const optimize = () => {
    setLoading(true);
    setTimeout(() => {
      setPlan(horizon === "Daily" ? dailyPlan : weeklyPlan);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Planner</CardTitle>
          <CardDescription>Drop in your list and let the assistant sequence it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="tasks">Enter Tasks/To-Do List</Label>
            <Input
              id="tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder="e.g. billing brief, client call, metrics review"
            />
          </div>

          <div className="space-y-2">
            <Label>Time Horizon</Label>
            <Select value={horizon} onValueChange={(v) => setHorizon(v as "Daily" | "Weekly")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={optimize} disabled={loading} className="w-full">
            <Wand2 className="size-4" />
            {loading ? "Optimising…" : "Optimize Schedule"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {plan ? (
          <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 md:grid-cols-3">
            {columns.map((col) => {
              const items = plan.filter((t) => t.priority === col.key);
              return (
                <Card key={col.key} className="bg-card/80">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${col.accent}`} />
                      <CardTitle className="text-sm">{col.key}</CardTitle>
                      <Badge variant="secondary" className="ml-auto">
                        {items.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {items.map((t) => (
                      <div
                        key={t.title}
                        className="rounded-lg border border-border bg-background p-3 transition-shadow hover:shadow-sm"
                      >
                        <p className="text-sm font-medium leading-snug">{t.title}</p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {t.slot}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="flex min-h-[300px] items-center justify-center text-sm text-muted-foreground">
              Your optimised Kanban board will appear here.
            </CardContent>
          </Card>
        )}

        {plan && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {horizon === "Daily" ? "Daily schedule" : "Weekly schedule"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.map((t) => (
                <div
                  key={`${t.title}-row`}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-border px-3 py-2"
                >
                  <span className="w-32 shrink-0 text-xs font-medium text-muted-foreground">
                    {t.slot}
                  </span>
                  <span className="text-sm">{t.title}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {t.priority.replace(" Priority", "")}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}