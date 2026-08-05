import { Download } from "lucide-react";

import { useBrand } from "../brand/BrandProvider";
import { BarList, DonutMeter, UsageAreaChart } from "../charts";
import { AGENT_VOLUME, USAGE_SERIES } from "../data";
import { Badge, Button, Card, CardHeader, Meter } from "../ui";

const COST_ROWS = [
  { label: "Model inference", value: 8420, share: 62 },
  { label: "Retrieval & embeddings", value: 2140, share: 16 },
  { label: "Tool calls", value: 1810, share: 13 },
  { label: "Evaluations", value: 1180, share: 9 },
];

export function AnalyticsView() {
  const { kit } = useBrand();
  const total = COST_ROWS.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className="space-y-[var(--st-gap)]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1
            className="text-xl font-semibold text-[var(--st-text)]"
            style={{ fontFamily: "var(--st-font-head)" }}
          >
            Analytics
          </h1>
          <p className="mt-1 text-sm text-[var(--st-text-muted)]">
            Usage, quality and spend across the {kit.company} workspace.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge tone="neutral">Last 30 days</Badge>
          <Button variant="outline" size="md">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader title="Conversations" subtitle="All agents · daily" />
        <div className="px-3 pb-4">
          <UsageAreaChart data={USAGE_SERIES} />
        </div>
      </Card>

      <div className="grid gap-[var(--st-gap)] lg:grid-cols-3">
        <Card className="p-5">
          <DonutMeter
            value={96}
            caption="Auto-resolution rate"
            sublabel="Target 90% · up 4 points month on month"
          />
        </Card>
        <Card className="p-5">
          <DonutMeter
            value={88}
            caption="Groundedness score"
            sublabel="Share of answers backed by a citation"
          />
        </Card>
        <Card className="p-5">
          <DonutMeter
            value={71}
            caption="Deflection vs. human"
            sublabel="Tickets never touched by an agent-assisted human"
          />
        </Card>
      </div>

      <div className="grid gap-[var(--st-gap)] lg:grid-cols-2">
        <Card>
          <CardHeader title="Runs by agent" subtitle="Last 30 days" />
          <div className="px-5 pb-5">
            <BarList data={AGENT_VOLUME} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Spend breakdown" subtitle={`$${total.toLocaleString()} this month`} />
          <div className="space-y-4 px-5 pb-5">
            {COST_ROWS.map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex items-baseline justify-between text-xs">
                  <span className="text-[var(--st-text)]">{row.label}</span>
                  <span className="tabular-nums text-[var(--st-text-muted)]">
                    ${row.value.toLocaleString()} · {row.share}%
                  </span>
                </div>
                <Meter value={row.share} />
              </div>
            ))}
            <p className="pt-1 text-[11px] text-[var(--st-text-faint)]">
              Budget alerts notify workspace admins at 80% of the monthly cap.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
