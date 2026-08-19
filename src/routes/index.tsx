import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarNav, navItems, type ViewKey } from "@/components/workspace/Sidebar";
import { Disclaimer } from "@/components/workspace/Disclaimer";
import { Overview } from "@/components/workspace/Overview";
import { EmailGenerator } from "@/components/workspace/EmailGenerator";
import { MeetingSummarizer } from "@/components/workspace/MeetingSummarizer";
import { TaskPlanner } from "@/components/workspace/TaskPlanner";
import { SettingsView } from "@/components/workspace/SettingsView";

const title = "AI Workplace Productivity Assistant";
const description =
  "Draft on-tone emails, summarise meetings into action items, and turn to-do lists into prioritised schedules — all in one clean workspace dashboard.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${title} — Email, Meetings & Task Planning` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const subtitles: Record<ViewKey, string> = {
  overview: "A snapshot of how the assistant is supporting your week.",
  email: "Generate a polished draft from a rough idea, then edit before sending.",
  meetings: "Turn transcripts into a summary, owners, deadlines, and decisions.",
  tasks: "Sequence your to-do list into a prioritised, time-blocked plan.",
  settings: "Tune the assistant to match how you and your team work.",
};

function Index() {
  const [view, setView] = useState<ViewKey>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeLabel = navItems.find((i) => i.key === view)!.label;

  const select = (key: ViewKey) => {
    setView(key);
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="fixed inset-y-0 left-0 w-64">
          <SidebarNav active={view} onSelect={select} />
        </div>
      </aside>

      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-4 backdrop-blur md:px-8">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-0 p-0">
              <SidebarNav active={view} onSelect={select} />
            </SheetContent>
          </Sheet>

          <div>
            <h1 className="text-lg font-semibold md:text-xl">{activeLabel}</h1>
            <p className="text-xs text-muted-foreground md:text-sm">{subtitles[view]}</p>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8">
          <div
            key={view}
            className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-1 duration-300"
          >
            {view === "overview" && <Overview onNavigate={select} />}
            {view === "email" && <EmailGenerator />}
            {view === "meetings" && <MeetingSummarizer />}
            {view === "tasks" && <TaskPlanner />}
            {view === "settings" && <SettingsView />}
          </div>
        </main>

        <Disclaimer />
      </div>
    </div>
  );
}
