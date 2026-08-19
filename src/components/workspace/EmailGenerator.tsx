import { useState } from "react";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiSkeleton } from "./AiSkeleton";

type Tone = "Formal" | "Friendly" | "Persuasive";

const openers: Record<Tone, string> = {
  Formal: "I hope this message finds you well.",
  Friendly: "Hope your week is going well!",
  Persuasive: "I wanted to reach out with something I think will genuinely help your team.",
};

const closers: Record<Tone, string> = {
  Formal: "Kind regards,\nNtando",
  Friendly: "Thanks so much,\nNtando",
  Persuasive: "Looking forward to making this happen,\nNtando",
};

function buildEmail(context: string, tone: Tone, recipient: string) {
  const name = recipient.trim() || "there";
  const body = context.trim() || "a quick update on our current project workstream";
  const bridge: Record<Tone, string> = {
    Formal: `I am writing to you regarding ${body}. Please find the key points summarised below for your review.`,
    Friendly: `Just a quick note about ${body} — here's the short version so nothing gets lost.`,
    Persuasive: `Here's why ${body} deserves a spot on your radar this week.`,
  };

  return [
    `Subject: ${tone === "Persuasive" ? "A quick opportunity worth 5 minutes" : "Quick update and next steps"}`,
    "",
    `Hi ${name},`,
    "",
    openers[tone],
    "",
    bridge[tone],
    "",
    "• What's happening: the work is on track and the scope is confirmed.",
    "• What I need from you: a quick confirmation or any feedback by Friday.",
    "• Next step: I'll circulate the final version once you've had a look.",
    "",
    tone === "Persuasive"
      ? "If it helps, I'm happy to walk you through it in a 15-minute call this week."
      : "Happy to answer any questions in the meantime.",
    "",
    closers[tone],
  ].join("\n");
}

export function EmailGenerator() {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [recipient, setRecipient] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setDraft("");
    setTimeout(() => {
      setDraft(buildEmail(context, tone, recipient));
      setLoading(false);
    }, 1500);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      toast.success("Draft copied to clipboard");
    } catch {
      toast.error("Could not access the clipboard");
    }
  };

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      <Card className="card-hover h-fit">
        <CardHeader>
          <CardTitle>Compose inputs</CardTitle>
          <CardDescription>Tell the assistant what the email needs to achieve.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="context">Core Message/Context</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. asking the design team to confirm the final onboarding screens before Friday"
              className="min-h-[140px] resize-y"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Name</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Amara"
            />
          </div>

          <Button
            onClick={generate}
            disabled={loading}
            className="w-full transition-all duration-200 hover:shadow-[var(--shadow-glow)] active:scale-[0.99]"
          >
            <Sparkles className={loading ? "size-4 animate-pulse" : "size-4"} />
            {loading ? "Generating…" : "Generate Draft"}
          </Button>
        </CardContent>
      </Card>

      <Card className="card-hover animate-in fade-in duration-300">
        <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 space-y-1.5">
            <CardTitle>Generated draft</CardTitle>
            <CardDescription>Editable — refine before you send.</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copy}
            disabled={!draft}
            className="shrink-0 transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Copy className="size-4" />
            <span className="hidden sm:inline">Copy to Clipboard</span>
            <span className="sm:hidden">Copy</span>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <AiSkeleton lines={10} label="Drafting your email…" className="min-h-[420px]" />
          ) : draft ? (
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="min-h-[320px] resize-y text-[13px] leading-relaxed sm:min-h-[420px]"
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-border px-4 text-center text-sm text-muted-foreground sm:min-h-[420px]">
              Your draft will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}