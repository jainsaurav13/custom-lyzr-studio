import { KeyRound, Palette, Users } from "lucide-react";

import { useBrand } from "../brand/BrandProvider";
import { BrandMark } from "../BrandMark";
import { Badge, Button, Card, CardHeader, Field, inputClass, Toggle } from "../ui";

export function SettingsView({ onOpenBrandStudio }: { onOpenBrandStudio: () => void }) {
  const { kit } = useBrand();
  const domain = `${kit.company.toLowerCase().replace(/\s+/g, "")}.com`;

  return (
    <div className="space-y-[var(--st-gap)]">
      <h1
        className="text-xl font-semibold text-[var(--st-text)]"
        style={{ fontFamily: "var(--st-font-head)" }}
      >
        Settings
      </h1>

      <Card className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(480px 160px at 6% 0%, var(--st-primary-a15), transparent 70%)",
          }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex min-w-0 items-center gap-4">
            <BrandMark size={48} />
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-semibold text-[var(--st-text)]">
                White-label appearance <Badge tone="brand">Demo control</Badge>
              </p>
              <p className="mt-1 max-w-xl text-xs text-[var(--st-text-muted)]">
                The studio is currently themed for {kit.company}. Upload a logo or point at a
                website to re-skin every screen, then share the generated link.
              </p>
            </div>
          </div>
          <Button variant="primary" onClick={onOpenBrandStudio}>
            <Palette className="h-4 w-4" /> Open Brand Studio
          </Button>
        </div>
      </Card>

      <div className="grid gap-[var(--st-gap)] lg:grid-cols-2">
        <Card>
          <CardHeader title="Workspace" subtitle="General organisation settings" />
          <div className="space-y-4 px-5 pb-5">
            <Field label="Organisation name">
              <input readOnly value={kit.company} className={inputClass} />
            </Field>
            <Field label="Primary domain">
              <input readOnly value={domain} className={inputClass} />
            </Field>
            <Field label="Data residency">
              <input readOnly value="EU (Frankfurt) · single tenant" className={inputClass} />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader title="Security" subtitle="Applies to every agent in the workspace" />
          <div className="space-y-4 px-5 pb-5">
            <Toggle
              checked
              label="SSO enforced (Okta)"
              description="All members sign in through your IdP"
              onChange={() => {}}
            />
            <Toggle
              checked
              label="Audit log export"
              description="Streamed to your SIEM hourly"
              onChange={() => {}}
            />
            <Toggle
              checked
              label="Zero data retention"
              description="Prompts are never stored by model providers"
              onChange={() => {}}
            />
            <Toggle
              checked={false}
              label="IP allow-list"
              description="Restrict studio access to corporate ranges"
              onChange={() => {}}
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Members"
            subtitle="8 seats used of 25"
            action={<Badge tone="neutral">Enterprise</Badge>}
          />
          <ul className="space-y-3 px-5 pb-5">
            {[
              ["Alex Doe", "Owner"],
              ["Priya N.", "Builder"],
              ["Daniel R.", "Builder"],
              ["Marcus T.", "Analyst"],
            ].map(([name, role]) => (
              <li key={name} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2.5 text-[var(--st-text)]">
                  <Users className="h-4 w-4 text-[var(--st-text-faint)]" />
                  {name}
                </span>
                <Badge tone="neutral">{role}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="API keys" subtitle="Used by services calling your agents" />
          <div className="space-y-3 px-5 pb-5">
            {[
              ["Production", "lyzr_live_••••••••4f21"],
              ["Staging", "lyzr_test_••••••••9c07"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] px-4 py-3"
              >
                <span className="flex items-center gap-2.5 text-sm text-[var(--st-text)]">
                  <KeyRound className="h-4 w-4 text-[var(--st-text-faint)]" />
                  {label}
                </span>
                <code className="font-mono text-xs text-[var(--st-text-muted)]">{value}</code>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
