import { Bot, Blocks, Database, Home, ShieldAlert, Telescope, Workflow } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A miniature of the branded workbench, sitting inside browser chrome so an
 * executive reads it as "this is what my customers would open", not as a
 * decorative graphic. It is the same shell the live demo at `/` renders — the
 * point of the whole page — reduced to the parts you can take in at a glance.
 */

const RAIL = [
  { icon: Home, label: "Home" },
  { icon: Bot, label: "Agent registry" },
  { icon: Workflow, label: "Orchestrate" },
  { icon: Database, label: "Knowledge" },
  { icon: ShieldAlert, label: "Safety & evals" },
  { icon: Telescope, label: "Monitoring" },
  { icon: Blocks, label: "Blueprints" },
];

const AGENTS = [
  { name: "Close Accelerator", meta: "Finance · 12.4k runs", value: 92 },
  { name: "Renewal Risk Analyst", meta: "Revenue · 8.1k runs", value: 78 },
  { name: "Policy Reviewer", meta: "Legal · 3.6k runs", value: 64 },
];

export function WorkbenchPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn("overflow-hidden rounded-[var(--st-radius-lg)] border shadow-2xl", className)}
      style={{
        background: "var(--st-surface-2)",
        borderColor: "var(--st-border-strong)",
        boxShadow: "0 40px 80px -50px rgba(0,0,0,0.55)",
      }}
      aria-hidden="true"
    >
      {/* Browser chrome — the address bar is the argument: it is your domain. */}
      <div
        className="flex items-center gap-2 border-b px-3 py-2.5"
        style={{ background: "var(--st-raised)", borderColor: "var(--st-border)" }}
      >
        <span className="flex gap-1.5">
          {["#E5675C", "#E5B95C", "#63C08A"].map((dot) => (
            <span key={dot} className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
          ))}
        </span>
        <span
          className="ml-2 flex-1 truncate rounded-full px-3 py-1 text-[11px]"
          style={{ background: "var(--st-surface-2)", color: "var(--st-text-faint)" }}
        >
          agents.yourcompany.com
        </span>
      </div>

      <div className="flex min-h-[19rem]">
        <div
          className="hidden w-40 shrink-0 flex-col gap-0.5 border-r p-3 sm:flex"
          style={{ background: "var(--st-sidebar-bg)", borderColor: "var(--st-sidebar-border)" }}
        >
          <div className="mb-3 flex items-center gap-2 px-1">
            <span
              className="grid h-6 w-6 place-items-center rounded-md text-[10px] font-bold"
              style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
            >
              ▲
            </span>
            <span className="text-[11px] font-semibold" style={{ color: "var(--st-sidebar-text)" }}>
              Your logo
            </span>
          </div>
          {RAIL.map((item, index) => (
            <span
              key={item.label}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]"
              style={
                index === 1
                  ? {
                      background: "var(--st-sidebar-active-bg)",
                      color: "var(--st-sidebar-active-text)",
                    }
                  : { color: "var(--st-sidebar-text)", opacity: 0.72 }
              }
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "var(--st-text)" }}>
                Agent registry
              </p>
              <p className="text-[11px]" style={{ color: "var(--st-text-muted)" }}>
                24 agents · 3 environments · governed
              </p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
            >
              New agent
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="rounded-[var(--st-radius-sm)] border p-3"
                style={{ background: "var(--st-surface)", borderColor: "var(--st-border)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-medium" style={{ color: "var(--st-text)" }}>
                    {agent.name}
                  </span>
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px]"
                    style={{
                      borderColor: "var(--st-primary-a30)",
                      background: "var(--st-primary-soft)",
                      color: "var(--st-primary-ink)",
                    }}
                  >
                    v4 · live
                  </span>
                </div>
                <p className="mt-0.5 text-[11px]" style={{ color: "var(--st-text-muted)" }}>
                  {agent.meta}
                </p>
                <div
                  className="mt-2 h-1 w-full overflow-hidden rounded-full"
                  style={{ background: "var(--st-raised)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${agent.value}%`, background: "var(--st-accent)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
