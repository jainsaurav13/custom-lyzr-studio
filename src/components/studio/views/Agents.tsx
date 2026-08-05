import { useState } from "react";
import { Filter, LayoutGrid, List, Plus, Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { useBrand } from "../brand/BrandProvider";
import { industryLabel } from "../brand/brief";
import type { Agent } from "../data";
import { Badge, Button, Card, inputClass, SegmentedControl, StatusDot } from "../ui";

const STATUS_TONE = {
  live: "success",
  paused: "warning",
  draft: "muted",
} as const;

export function AgentsView({
  agents,
  onOpenAgent,
  onCreate,
}: {
  agents: Agent[];
  onOpenAgent: (id: string) => void;
  onCreate: () => void;
}) {
  const { kit } = useBrand();
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [status, setStatus] = useState<"all" | "live" | "draft">("all");

  const filtered = agents.filter((agent) => {
    const matchesQuery =
      !query ||
      agent.name.toLowerCase().includes(query.toLowerCase()) ||
      agent.role.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || agent.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-[var(--st-gap)]">
      {kit.brief ? (
        <Card className="p-4">
          <p className="text-sm font-medium text-[var(--st-text)]">
            {agents.length} agent{agents.length === 1 ? "" : "s"} built for {kit.company}
          </p>
          <p className="mt-1 text-xs text-[var(--st-text-muted)]">
            Drawn from the workloads your account brief names
            {industryLabel(kit.brief) ? `, in ${industryLabel(kit.brief).toLowerCase()}` : ""} — the
            first three are running, the rest are staged and ready to turn on.
          </p>
        </Card>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--st-text-faint)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search agents"
            className={cn(inputClass, "pl-9")}
          />
        </div>
        <SegmentedControl
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All" },
            { value: "live", label: "Live" },
            { value: "draft", label: "Drafts" },
          ]}
        />
        <Button variant="outline" size="md">
          <Filter className="h-4 w-4" /> Filters
        </Button>
        <div className="flex rounded-[var(--st-radius-sm)] border border-[var(--st-border)] p-0.5">
          <button
            onClick={() => setLayout("grid")}
            className={cn(
              "rounded-[calc(var(--st-radius-sm)-2px)] p-1.5",
              layout === "grid"
                ? "bg-[var(--st-raised)] text-[var(--st-text)]"
                : "text-[var(--st-text-faint)]",
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout("list")}
            className={cn(
              "rounded-[calc(var(--st-radius-sm)-2px)] p-1.5",
              layout === "list"
                ? "bg-[var(--st-raised)] text-[var(--st-text)]"
                : "text-[var(--st-text-faint)]",
            )}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
        <Button variant="primary" onClick={onCreate}>
          <Plus className="h-4 w-4" /> Create agent
        </Button>
      </div>

      {layout === "grid" ? (
        <div className="grid gap-[var(--st-gap)] md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((agent) => (
            <Card
              key={agent.id}
              className="flex cursor-pointer flex-col p-5 transition-colors hover:border-[var(--st-primary)]"
              onClick={() => onOpenAgent(agent.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    className="truncate text-sm font-semibold text-[var(--st-text)]"
                    style={{ fontFamily: "var(--st-font-head)" }}
                  >
                    {agent.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[var(--st-text-faint)]">{agent.category}</p>
                </div>
                <Badge tone={agent.status === "live" ? "success" : "neutral"}>
                  <StatusDot tone={STATUS_TONE[agent.status]} /> {agent.status}
                </Badge>
              </div>
              <p className="mt-3 line-clamp-2 min-h-[2.5rem] text-xs text-[var(--st-text-muted)]">
                {agent.role}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge tone="brand">{agent.model}</Badge>
                {agent.tools.slice(0, 2).map((tool) => (
                  <Badge key={tool} tone="neutral">
                    {tool}
                  </Badge>
                ))}
                {agent.tools.length > 2 ? (
                  <Badge tone="neutral">+{agent.tools.length - 2}</Badge>
                ) : null}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--st-border)] pt-4 text-center">
                <Stat label="Runs" value={agent.runs.toLocaleString()} />
                <Stat label="Success" value={agent.successRate ? `${agent.successRate}%` : "—"} />
                <Stat label="Latency" value={agent.latency} />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--st-surface-2)] text-xs uppercase tracking-wide text-[var(--st-text-faint)]">
              <tr>
                <th className="px-5 py-3 font-medium">Agent</th>
                <th className="px-4 py-3 font-medium">Model</th>
                <th className="px-4 py-3 font-medium">Runs</th>
                <th className="px-4 py-3 font-medium">Success</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((agent) => (
                <tr
                  key={agent.id}
                  onClick={() => onOpenAgent(agent.id)}
                  className="cursor-pointer border-t border-[var(--st-border)] hover:bg-[var(--st-surface-2)]"
                >
                  <td className="px-5 py-[var(--st-row-pad)]">
                    <span className="flex items-center gap-2 font-medium text-[var(--st-text)]">
                      <StatusDot tone={STATUS_TONE[agent.status]} />
                      {agent.name}
                    </span>
                  </td>
                  <td className="px-4 py-[var(--st-row-pad)] text-[var(--st-text-muted)]">
                    {agent.model}
                  </td>
                  <td className="px-4 py-[var(--st-row-pad)] tabular-nums text-[var(--st-text-muted)]">
                    {agent.runs.toLocaleString()}
                  </td>
                  <td className="px-4 py-[var(--st-row-pad)] tabular-nums text-[var(--st-text-muted)]">
                    {agent.successRate ? `${agent.successRate}%` : "—"}
                  </td>
                  <td className="px-4 py-[var(--st-row-pad)] text-[var(--st-text-muted)]">
                    {agent.owner}
                  </td>
                  <td className="px-4 py-[var(--st-row-pad)] text-[var(--st-text-faint)]">
                    {agent.updated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold tabular-nums text-[var(--st-text)]">{value}</p>
      <p className="text-[11px] text-[var(--st-text-faint)]">{label}</p>
    </div>
  );
}
