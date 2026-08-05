import { Play, ShieldCheck } from "lucide-react";

import { useBrand } from "../brand/BrandProvider";
import { EVAL_RUNS } from "../data";
import { Badge, Button, Card, CardHeader, Meter, StatusDot, Toggle } from "../ui";

const GUARDRAILS = [
  {
    id: "pii",
    label: "PII redaction",
    description: "Mask emails, card numbers and national IDs",
    on: true,
  },
  {
    id: "ground",
    label: "Groundedness check",
    description: "Reject answers with no retrieved support",
    on: true,
  },
  {
    id: "tox",
    label: "Toxicity filter",
    description: "Block unsafe language in both directions",
    on: true,
  },
  {
    id: "topic",
    label: "Topic boundaries",
    description: "Refuse anything outside the approved scope",
    on: true,
  },
  {
    id: "human",
    label: "Human in the loop",
    description: "Route low-confidence answers to an approver",
    on: false,
  },
];

export function SafetyView() {
  const { kit } = useBrand();

  return (
    <div className="space-y-[var(--st-gap)] pt-6">
      <div>
        <h1
          className="text-xl font-semibold text-[var(--st-text)]"
          style={{ fontFamily: "var(--st-font-head)" }}
        >
          Safety and Evaluations
        </h1>
        <p className="mt-1 text-sm text-[var(--st-text-muted)]">
          Workspace-wide rules and the test suites that prove they hold, across every {kit.company}{" "}
          agent.
        </p>
      </div>

      <div className="grid gap-[var(--st-gap)] lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader
            title="Guardrails"
            subtitle="Applied before any response reaches a customer"
            action={<Badge tone="success">4 of 5 on</Badge>}
          />
          <div className="space-y-4 px-5 pb-5">
            {GUARDRAILS.map((rail) => (
              <Toggle
                key={rail.id}
                checked={rail.on}
                label={rail.label}
                description={rail.description}
                onChange={() => {}}
              />
            ))}
          </div>
        </Card>

        <div className="space-y-[var(--st-gap)]">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--st-primary-ink)]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--st-text)]">Safety score</p>
                <p className="mt-1 text-xs text-[var(--st-text-muted)]">
                  Weighted across guardrail hits, evaluation pass rate and red-team findings.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className="text-2xl font-semibold text-[var(--st-text)]"
                    style={{ fontFamily: "var(--st-font-head)" }}
                  >
                    94
                  </span>
                  <div className="flex-1">
                    <Meter value={94} />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Evaluations"
              subtitle="Suites run against every published version"
              action={
                <Button size="sm" variant="outline">
                  <Play className="h-3.5 w-3.5" /> Run all
                </Button>
              }
            />
            <ul className="divide-y divide-[var(--st-border)] border-t border-[var(--st-border)]">
              {EVAL_RUNS.map((run) => {
                const rate = Math.round((run.passed / run.cases) * 100);
                return (
                  <li key={run.id} className="flex items-center justify-between gap-4 px-5 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-[var(--st-text)]">{run.name}</p>
                      <p className="mt-0.5 text-[11px] text-[var(--st-text-faint)]">
                        {run.passed}/{run.cases} cases · {run.when}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--st-text-muted)]">
                      <StatusDot
                        tone={rate >= 95 ? "success" : rate >= 90 ? "warning" : "danger"}
                      />
                      {rate}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
