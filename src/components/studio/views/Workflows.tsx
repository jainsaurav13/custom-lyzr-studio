import { Bot, Circle, Play, ShieldCheck, Wrench, Zap } from "lucide-react";

import { useBrand } from "../brand/BrandProvider";
import { WORKFLOW_EDGES, WORKFLOW_NODES } from "../data";
import { Badge, Button, Card, CardHeader } from "../ui";

const KIND_ICON = {
  trigger: Zap,
  agent: Bot,
  tool: Wrench,
  guard: ShieldCheck,
  output: Circle,
} as const;

const COL = 168;
const ROW = 96;
const NODE_W = 132;
const NODE_H = 54;

export function WorkflowsView() {
  const { kit } = useBrand();
  const width = COL * 5 + NODE_W;
  const height = ROW * 2 + NODE_H + 24;

  const position = (node: (typeof WORKFLOW_NODES)[number]) => ({
    x: node.x * COL,
    y: node.y * ROW,
  });
  const byId = Object.fromEntries(WORKFLOW_NODES.map((node) => [node.id, node]));

  return (
    <div className="space-y-[var(--st-gap)]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1
            className="text-xl font-semibold text-[var(--st-text)]"
            style={{ fontFamily: "var(--st-font-head)" }}
          >
            Workflows
          </h1>
          <p className="mt-1 text-sm text-[var(--st-text-muted)]">
            Chain agents, tools and checks into a governed process.
          </p>
        </div>
        <Button variant="primary">
          <Play className="h-4 w-4" /> Run workflow
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title={`${kit.company} ticket resolution`}
          subtitle="Triggered by a new ticket in Zendesk · 18,420 runs · 96% auto-resolved"
          action={<Badge tone="success">live</Badge>}
        />
        <div className="overflow-x-auto border-t border-[var(--st-border)] p-6">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="min-w-[860px]"
            role="img"
            aria-label="Workflow graph"
          >
            {WORKFLOW_EDGES.map(([from, to]) => {
              const a = position(byId[from]);
              const b = position(byId[to]);
              const x1 = a.x + NODE_W;
              const y1 = a.y + NODE_H / 2;
              const x2 = b.x;
              const y2 = b.y + NODE_H / 2;
              const mid = (x1 + x2) / 2;
              return (
                <path
                  key={`${from}-${to}`}
                  d={`M${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke="var(--st-border-strong)"
                  strokeWidth={1.5}
                />
              );
            })}
            {WORKFLOW_NODES.map((node) => {
              const { x, y } = position(node);
              const Icon = KIND_ICON[node.kind];
              const isAgent = node.kind === "agent";
              return (
                <g key={node.id}>
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={12}
                    fill={isAgent ? "var(--st-primary-soft)" : "var(--st-surface-2)"}
                    stroke={isAgent ? "var(--st-primary)" : "var(--st-border)"}
                    strokeWidth={1.5}
                  />
                  <foreignObject x={x} y={y} width={NODE_W} height={NODE_H}>
                    <div className="flex h-full items-center gap-2 px-3">
                      <Icon className="h-4 w-4 shrink-0 text-[var(--st-primary-ink)]" />
                      <span className="text-[11px] font-medium leading-tight text-[var(--st-text)]">
                        {node.label}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>

      <div className="grid gap-[var(--st-gap)] md:grid-cols-3">
        {[
          { name: "Invoice intake → ERP", runs: "2,110", status: "live" },
          { name: "Weekly pipeline digest", runs: "48", status: "live" },
          { name: "Contract review escalation", runs: "0", status: "draft" },
        ].map((flow) => (
          <Card key={flow.name} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-medium text-[var(--st-text)]">{flow.name}</p>
              <Badge tone={flow.status === "live" ? "success" : "neutral"}>{flow.status}</Badge>
            </div>
            <p className="mt-2 text-xs text-[var(--st-text-muted)]">{flow.runs} runs this month</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
