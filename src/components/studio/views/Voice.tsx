import { Phone, PhoneCall, Plus, Waves } from "lucide-react";

import { useBrand } from "../brand/BrandProvider";
import { VOICE_AGENTS } from "../data";
import { Badge, Button, Card, CardHeader, Field, inputClass, StatusDot, Toggle } from "../ui";

export function VoiceView({ onCreate }: { onCreate: () => void }) {
  const { kit } = useBrand();

  return (
    <div className="space-y-[var(--st-gap)] pt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1
            className="text-xl font-semibold text-[var(--st-text)]"
            style={{ fontFamily: "var(--st-font-head)" }}
          >
            Voice
          </h1>
          <p className="mt-1 text-sm text-[var(--st-text-muted)]">
            Voice-first agents for calls and IVR, running on {kit.company} numbers.
          </p>
        </div>
        <Button variant="primary" onClick={onCreate}>
          <Plus className="h-4 w-4" /> New voice agent
        </Button>
      </div>

      <div className="grid gap-[var(--st-gap)] xl:grid-cols-[1fr_340px]">
        <Card className="overflow-hidden">
          <CardHeader title="Voice agents" subtitle="Numbers, minutes and status" />
          <div className="overflow-x-auto border-t border-[var(--st-border)]">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-[var(--st-surface-2)] text-xs uppercase tracking-wide text-[var(--st-text-faint)]">
                <tr>
                  <th className="px-5 py-3 font-medium">Agent</th>
                  <th className="px-4 py-3 font-medium">Number</th>
                  <th className="px-4 py-3 font-medium">Minutes</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {VOICE_AGENTS.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[var(--st-border)] hover:bg-[var(--st-surface-2)]"
                  >
                    <td className="px-5 py-[var(--st-row-pad)]">
                      <span className="flex items-center gap-2.5 text-[var(--st-text)]">
                        <Phone className="h-4 w-4 shrink-0 text-[var(--st-primary-ink)]" />
                        {item.name}
                      </span>
                    </td>
                    <td className="px-4 py-[var(--st-row-pad)] font-mono text-xs text-[var(--st-text-muted)]">
                      {item.number}
                    </td>
                    <td className="px-4 py-[var(--st-row-pad)] tabular-nums text-[var(--st-text-muted)]">
                      {item.minutes}
                    </td>
                    <td className="px-4 py-[var(--st-row-pad)]">
                      <span className="flex items-center gap-2 text-xs text-[var(--st-text-muted)]">
                        <StatusDot tone={item.status === "live" ? "success" : "muted"} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-[var(--st-gap)]">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--st-text)]">
              <Waves className="h-4 w-4 text-[var(--st-primary-ink)]" /> Voice profile
            </div>
            <div className="mt-4 space-y-4">
              <Field label="Voice">
                <select className={inputClass} defaultValue="Aria — warm, neutral">
                  <option>Aria — warm, neutral</option>
                  <option>Ren — calm, low</option>
                  <option>Nova — bright, fast</option>
                </select>
              </Field>
              <Field label="Language">
                <select className={inputClass} defaultValue="English (India)">
                  <option>English (India)</option>
                  <option>English (US)</option>
                  <option>Hindi</option>
                </select>
              </Field>
              <Toggle
                checked
                label="Barge-in"
                description="Let callers interrupt mid-sentence"
                onChange={() => {}}
              />
              <Toggle
                checked
                label="Call recording"
                description="Stored in your tenant for 30 days"
                onChange={() => {}}
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-[var(--st-text)]">
                <PhoneCall className="h-4 w-4 text-[var(--st-primary-ink)]" /> This month
              </span>
              <Badge tone="brand">15,690 min</Badge>
            </div>
            <dl className="mt-4 space-y-2 text-xs">
              {[
                ["Answer rate", "98.2%"],
                ["Avg call length", "2m 14s"],
                ["Escalated to human", "6.4%"],
                ["Cost per call", "$0.19"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-[var(--st-text-faint)]">{label}</dt>
                  <dd className="text-[var(--st-text-muted)]">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
