import { useState } from "react";
import { CalendarClock, CheckCircle2, FileSearch, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const summary = [
  "The team reviewed Q3 onboarding performance: activation is up 12% since the guided checklist launched.",
  "Support volume around billing remains the top friction point and is blocking further conversion gains.",
  "Engineering confirmed the new invoice service can ship before the next billing cycle.",
  "Leadership agreed to hold scope and prioritise reliability over new surface area this quarter.",
];

const actions = [
  { owner: "Amara", task: "Rewrite billing FAQ and link it in the checklist", due: "Fri 22 Aug" },
  { owner: "Devon", task: "Ship invoice service to staging and run load test", due: "Tue 26 Aug" },
  {
    owner: "Ntando",
    task: "Share activation dashboard with the leadership channel",
    due: "Thu 21 Aug",
  },
  { owner: "Priya", task: "Interview 5 churned accounts about billing confusion", due: "Wed 3 Sep" },
];

const decisions = [
  "Guided checklist becomes the default onboarding path for all new workspaces.",
  "No new integrations this quarter; reliability work takes priority.",
  "Billing rewrite is approved with a two-week engineering allocation.",
  "Weekly activation review moves to Thursday mornings.",
];

export function MeetingSummarizer() {
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const run = () => {
    setLoading(true);
    setTimeout(() => {
      setDone(true);
      setLoading(false);
    }, 650);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meeting input</CardTitle>
          <CardDescription>
            Paste raw notes or a transcript — the assistant extracts structure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Paste Meeting Transcript/Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your transcript here…"
              className="min-h-[220px] resize-y"
            />
          </div>
          <Button onClick={run} disabled={loading}>
            <FileSearch className="size-4" />
            {loading ? "Analysing…" : "Summarize & Extract"}
          </Button>
        </CardContent>
      </Card>

      {done ? (
        <Tabs
          defaultValue="summary"
          className="animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <TabsList>
            <TabsTrigger value="summary">Executive Summary</TabsTrigger>
            <TabsTrigger value="actions">Action Items &amp; Deadlines</TabsTrigger>
            <TabsTrigger value="decisions">Key Decisions Made</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {summary.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {line}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Action Items &amp; Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {actions.map((a) => (
                  <div
                    key={a.task}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-secondary/50 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                      <div>
                        <p className="text-sm font-medium">{a.task}</p>
                        <p className="text-xs text-muted-foreground">Owner: {a.owner}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <CalendarClock className="size-3" />
                      {a.due}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decisions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Decisions Made</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {decisions.map((d) => (
                    <li key={d} className="flex gap-3 text-sm leading-relaxed">
                      <Gavel className="mt-0.5 size-4 shrink-0 text-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="flex min-h-[180px] items-center justify-center text-sm text-muted-foreground">
            Run an extraction to see the summary, action items, and decisions.
          </CardContent>
        </Card>
      )}
    </div>
  );
}