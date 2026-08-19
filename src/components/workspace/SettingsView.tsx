import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsView() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>How the assistant signs your generated content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" defaultValue="Ntando" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role / team</Label>
            <Input id="role" defaultValue="Product Operations" />
          </div>
          <div className="space-y-2">
            <Label>Default email tone</Label>
            <Select defaultValue="Formal">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assistant preferences</CardTitle>
          <CardDescription>Control review steps and workspace behaviour.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { id: "review", label: "Require review before copy", hint: "Always show a confirmation step." },
            { id: "concise", label: "Prefer concise outputs", hint: "Shorter summaries and drafts." },
            { id: "deadlines", label: "Highlight deadlines", hint: "Flag dates found in transcripts." },
          ].map((p) => (
            <div key={p.id} className="flex items-start justify-between gap-4">
              <div>
                <Label htmlFor={p.id}>{p.label}</Label>
                <p className="mt-1 text-xs text-muted-foreground">{p.hint}</p>
              </div>
              <Switch id={p.id} defaultChecked={p.id !== "concise"} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}