import {
  ArrowUpRight,
  Bot,
  Clock3,
  MessagesSquare,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useBrand } from "../brand/BrandProvider";
import { BarList, Sparkline, UsageAreaChart } from "../charts";
import { AGENT_VOLUME, makeActivity, SPARK_TRENDS, USAGE_SERIES, type Agent } from "../data";
import { Badge, Button, Card, CardHeader, StatusDot } from "../ui";

const STATS = [
  {
    key: "agents",
    label: "Agents in production",
    value: "11",
    delta: "+3 this month",
    icon: Bot,
    trend: SPARK_TRENDS.agents,
  },
  {
    key: "conversations",
    label: "Conversations (30d)",
    value: "52,309",
    delta: "+18.2%",
    icon: MessagesSquare,
    trend: SPARK_TRENDS.conversations,
  },
  {
    key: "latency",
    label: "Median latency",
    value: "1.3s",
    delta: "−0.4s",
    icon: Clock3,
    trend: SPARK_TRENDS.latency,
  },
  {
    key: "savings",
    label: "Hours returned",
    value: "4,180",
    delta: "+41%",
    icon: TrendingUp,
    trend: SPARK_TRENDS.savings,
  },
];

export function HomeView({
  agents,
  onOpenAgent,
  onCreate,
}: {
  agents: Agent[];
  onOpenAgent: (id: string) => void;
  onCreate: () => void;
}) {
  const { kit } = useBrand();
  const activity = makeActivity(kit.company);

  return (
    <div className="space-y-[var(--st-gap)]">
      <Card className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(620px 200px at 8% 0%, var(--st-primary-a15), transparent 70%), radial-gradient(420px 180px at 92% 10%, var(--st-accent-soft), transparent 70%)",
          }}
        />
        <div className="relative flex flex-wrap items-end justify-between gap-6 p-6">
          <div className="min-w-0">
            <Badge tone="brand">
              <Sparkles className="h-3 w-3" /> {kit.company} workspace
            </Badge>
            <h1
              className="mt-3 text-2xl font-semibold tracking-tight text-[var(--st-text)]"
              style={{ fontFamily: "var(--st-font-head)" }}
            >
              Good morning, Alex
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-[var(--st-text-muted)]">
              Your agents handled{" "}
              <strong className="font-semibold text-[var(--st-text)]">2,144</strong> conversations
              yesterday with a 96% resolution rate. Two knowledge sources finished re-indexing
              overnight.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="lg" onClick={onCreate}>
              <Plus className="h-4 w-4" /> Create agent
            </Button>
            <Button variant="outline" size="lg">
              <Rocket className="h-4 w-4" /> Deploy to production
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-[var(--st-gap)] sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.key} className="p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-[var(--st-text-muted)]">
                <stat.icon className="h-3.5 w-3.5" /> {stat.label}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p
                  className="text-2xl font-semibold tabular-nums text-[var(--st-text)]"
                  style={{ fontFamily: "var(--st-font-head)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--st-success)]">
                  <ArrowUpRight className="h-3 w-3" /> {stat.delta}
                </p>
              </div>
              <Sparkline points={stat.trend} invert={stat.key === "latency"} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-[var(--st-gap)] xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader
            title="Conversation volume"
            subtitle="Last 30 days · all agents"
            action={<Badge tone="neutral">30d</Badge>}
          />
          <div className="px-3 pb-4">
            <UsageAreaChart data={USAGE_SERIES} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Busiest agents" subtitle="Runs in the last 30 days" />
          <div className="px-5 pb-5">
            <BarList data={AGENT_VOLUME} />
          </div>
        </Card>
      </div>

      <div className="grid gap-[var(--st-gap)] xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader
            title="Continue building"
            subtitle="Recently edited by your team"
            action={
              <Button size="sm" variant="ghost" onClick={onCreate}>
                <Plus className="h-3.5 w-3.5" /> New
              </Button>
            }
          />
          <div className="grid gap-3 px-5 pb-5 md:grid-cols-2">
            {agents.slice(0, 4).map((agent) => (
              <button
                key={agent.id}
                onClick={() => onOpenAgent(agent.id)}
                className="rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-4 text-left transition-colors hover:border-[var(--st-primary)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-[var(--st-text)]">
                    <StatusDot
                      tone={
                        agent.status === "live"
                          ? "success"
                          : agent.status === "paused"
                            ? "warning"
                            : "muted"
                      }
                    />
                    <span className="truncate">{agent.name}</span>
                  </span>
                  <Badge tone="neutral">{agent.model}</Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-[var(--st-text-muted)]">
                  {agent.role}
                </p>
                <p className="mt-3 text-[11px] text-[var(--st-text-faint)]">
                  {agent.owner} · updated {agent.updated}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Activity" subtitle="Workspace audit trail" />
          <ul className="space-y-3 px-5 pb-5">
            {activity.map((item) => (
              <li key={item.id} className="flex gap-3 text-xs">
                <span className="mt-1.5">
                  <StatusDot
                    tone={
                      item.tone === "success"
                        ? "success"
                        : item.tone === "warning"
                          ? "warning"
                          : "muted"
                    }
                  />
                </span>
                <span className="min-w-0 flex-1 text-[var(--st-text-muted)]">
                  <span className="font-medium text-[var(--st-text)]">{item.actor}</span>{" "}
                  {item.action} <span className="text-[var(--st-primary-ink)]">{item.target}</span>
                  <span className="ml-1 text-[var(--st-text-faint)]">· {item.time}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[var(--st-border)] px-5 py-3">
            <p className="flex items-center gap-2 text-[11px] text-[var(--st-text-faint)]">
              <ShieldCheck className="h-3.5 w-3.5" /> SOC 2 Type II · data stays in {kit.company}
              &apos;s tenant
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
