import {
  Bell,
  Bot,
  Database,
  Home,
  Moon,
  Palette,
  Rocket,
  Scale,
  Settings,
  ShieldCheck,
  Sun,
  Telescope,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A miniature of the branded workbench, sitting inside browser chrome so an
 * executive reads it as "this is what my customers would open", not as a
 * decorative graphic.
 *
 * The panel on the right is the argument the page is making: the brand mark,
 * the palette, the layout, the modules on show and the theme are all settings,
 * not a services engagement. It is deliberately drawn open.
 */

const RAIL = [
  { icon: Home, label: "Home" },
  { icon: Bot, label: "Agent registry" },
  { icon: Workflow, label: "Orchestrate" },
  { icon: Database, label: "Knowledge" },
  { icon: Telescope, label: "Monitoring" },
  { icon: Settings, label: "Settings" },
];

const AGENTS = [
  {
    name: "Close Accelerator",
    meta: "Finance · 12.4k runs",
    value: 92,
    tint: "#3F7D5C",
    icon: Rocket,
  },
  {
    name: "Renewal Risk Analyst",
    meta: "Revenue · 8.1k runs",
    value: 78,
    tint: "#4A6C8C",
    icon: ShieldCheck,
  },
  { name: "Policy Reviewer", meta: "Legal · 3.6k runs", value: 64, tint: "#A67A3A", icon: Scale },
];

/** The palettes a customer picks from, shown as the brand row's swatches. */
const SWATCHES = ["var(--st-primary)", "#4A6C8C", "#3F7D5C", "#A67A3A", "#8A6AA0"];

const WIDGETS = [
  { label: "Agent registry", on: true },
  { label: "Orchestrate", on: false },
  { label: "Knowledge", on: true },
  { label: "Monitoring", on: false },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className="relative inline-block h-[11px] w-[20px] shrink-0 rounded-full"
      style={{ background: on ? "var(--st-primary)" : "var(--st-border-strong)" }}
    >
      <span
        className="absolute top-[1.5px] h-2 w-2 rounded-full"
        style={{ background: "#FFFFFF", left: on ? "10.5px" : "1.5px" }}
      />
    </span>
  );
}

/** The three layout choices, drawn as the wireframes the picker shows. */
function LayoutThumb({ variant, on }: { variant: "rail" | "stacked" | "compact"; on: boolean }) {
  return (
    <span
      className="flex h-[26px] flex-1 items-stretch gap-[2px] rounded-[4px] border p-[3px]"
      style={{
        borderColor: on ? "var(--st-primary)" : "var(--st-border)",
        background: "var(--st-surface)",
        boxShadow: on ? "0 0 0 1px var(--st-primary)" : undefined,
      }}
    >
      {variant === "rail" ? (
        <>
          <span className="w-[6px] rounded-[1px]" style={{ background: "var(--st-primary)" }} />
          <span className="flex flex-1 flex-col justify-center gap-[2px]">
            <span
              className="h-[2px] rounded-full"
              style={{ background: "var(--st-border-strong)" }}
            />
            <span
              className="h-[2px] w-2/3 rounded-full"
              style={{ background: "var(--st-border-strong)" }}
            />
          </span>
        </>
      ) : variant === "stacked" ? (
        <span className="flex flex-1 flex-col justify-center gap-[3px]">
          <span
            className="h-[2px] rounded-full"
            style={{ background: "var(--st-border-strong)" }}
          />
          <span
            className="h-[2px] w-3/4 rounded-full"
            style={{ background: "var(--st-border-strong)" }}
          />
          <span
            className="h-[2px] w-1/2 rounded-full"
            style={{ background: "var(--st-border-strong)" }}
          />
        </span>
      ) : (
        <span className="flex flex-1 items-end">
          <span
            className="h-[8px] w-full rounded-[2px]"
            style={{ background: "var(--st-border-strong)" }}
          />
        </span>
      )}
    </span>
  );
}

function PanelLabel({ children }: { children: string }) {
  return (
    <p
      className="text-[8.5px] font-semibold tracking-[0.1em] uppercase"
      style={{ color: "var(--st-text-faint)" }}
    >
      {children}
    </p>
  );
}

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

      <div className="flex min-h-[20rem]">
        {/* Left: the customer's own brand, at the top of their own navigation. */}
        <div
          className="hidden w-[7.5rem] shrink-0 flex-col gap-[1px] border-r p-2 md:flex"
          style={{ background: "var(--st-sidebar-bg)", borderColor: "var(--st-sidebar-border)" }}
        >
          <div className="mb-2.5 flex items-center gap-1.5 px-1 pt-1">
            <span
              className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] text-[9px] font-bold"
              style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
            >
              ◆
            </span>
            <span
              className="truncate text-[10px] font-semibold"
              style={{ color: "var(--st-sidebar-text)" }}
            >
              Your Brand
            </span>
          </div>
          {RAIL.map((item, index) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 rounded-[5px] px-1.5 py-1 text-[9px]"
              style={
                index === 1
                  ? {
                      background: "var(--st-sidebar-active-bg)",
                      color: "var(--st-sidebar-active-text)",
                    }
                  : { color: "var(--st-sidebar-text)", opacity: 0.72 }
              }
            >
              <item.icon className="h-3 w-3 shrink-0" />
              <span className="truncate">{item.label}</span>
            </span>
          ))}
          <span
            className="mt-auto flex items-center gap-1.5 rounded-[5px] border px-1.5 py-1.5"
            style={{ borderColor: "var(--st-sidebar-border)" }}
          >
            <span
              className="h-[14px] w-[14px] shrink-0 rounded-full"
              style={{ background: "var(--st-border-strong)" }}
            />
            <span className="min-w-0">
              <span
                className="block truncate text-[9px] font-semibold"
                style={{ color: "var(--st-sidebar-text)" }}
              >
                Acme Corp
              </span>
              <span
                className="block truncate text-[8px]"
                style={{ color: "var(--st-sidebar-text)", opacity: 0.6 }}
              >
                Enterprise
              </span>
            </span>
          </span>
        </div>

        {/* Centre: their product, doing the work. */}
        <div className="min-w-0 flex-1 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12.5px] font-semibold" style={{ color: "var(--st-text)" }}>
              Agent registry
            </p>
            <span className="flex items-center gap-1.5">
              <Bell className="h-3 w-3" style={{ color: "var(--st-text-faint)" }} />
              <span
                className="grid h-[18px] w-[18px] place-items-center rounded-full text-[8px] font-semibold"
                style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
              >
                RS
              </span>
            </span>
          </div>

          <div className="mt-2 flex justify-end">
            <span
              className="rounded-full px-2 py-[3px] text-[9px] font-medium"
              style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
            >
              + New agent
            </span>
          </div>

          <div className="mt-2 space-y-1.5">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="rounded-[8px] border p-2"
                style={{ background: "var(--st-surface)", borderColor: "var(--st-border)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="grid h-[24px] w-[24px] shrink-0 place-items-center rounded-[6px]"
                    style={{ background: `color-mix(in srgb, ${agent.tint} 20%, transparent)` }}
                  >
                    <agent.icon className="h-3 w-3" style={{ color: agent.tint }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block truncate text-[10.5px] font-semibold"
                      style={{ color: "var(--st-text)" }}
                    >
                      {agent.name}
                    </span>
                    <span
                      className="block truncate text-[9px]"
                      style={{ color: "var(--st-text-muted)" }}
                    >
                      {agent.meta}
                    </span>
                  </span>
                  <span
                    className="flex shrink-0 items-center gap-1 rounded-full px-1.5 py-[2px] text-[8.5px] font-medium"
                    style={{
                      background: "color-mix(in srgb, var(--st-success) 12%, transparent)",
                      color: "var(--st-success)",
                    }}
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: "var(--st-success)" }}
                    />
                    Live
                  </span>
                </div>
                <div
                  className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full"
                  style={{ background: "var(--st-raised)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${agent.value}%`, background: agent.tint }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: the panel that makes the point. None of this is a rebuild. */}
        <div
          className="hidden w-[8.75rem] shrink-0 flex-col gap-2.5 border-l p-2.5 sm:flex"
          style={{ background: "var(--st-raised)", borderColor: "var(--st-border)" }}
        >
          <span className="flex items-center gap-1.5">
            <Palette className="h-3 w-3" style={{ color: "var(--st-primary-ink)" }} />
            <span className="text-[10.5px] font-semibold" style={{ color: "var(--st-text)" }}>
              Customize
            </span>
          </span>

          <span className="block">
            <PanelLabel>Brand</PanelLabel>
            <span
              className="mt-1 flex items-center gap-1.5 rounded-[6px] border px-1.5 py-1.5"
              style={{ background: "var(--st-surface)", borderColor: "var(--st-border)" }}
            >
              <span
                className="grid h-[14px] w-[14px] shrink-0 place-items-center rounded-[4px] text-[7px] font-bold"
                style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
              >
                ◆
              </span>
              <span className="flex flex-1 gap-[3px]">
                {SWATCHES.map((swatch, index) => (
                  <span
                    key={swatch}
                    className="h-[8px] w-[8px] rounded-full"
                    style={{
                      background: swatch,
                      boxShadow:
                        index === 0
                          ? "0 0 0 1.5px var(--st-surface), 0 0 0 2.5px var(--st-primary)"
                          : undefined,
                    }}
                  />
                ))}
              </span>
            </span>
          </span>

          <span className="block">
            <PanelLabel>Layout</PanelLabel>
            <span className="mt-1 flex gap-1.5">
              <LayoutThumb variant="rail" on />
              <LayoutThumb variant="stacked" on={false} />
              <LayoutThumb variant="compact" on={false} />
            </span>
          </span>

          <span className="block">
            <PanelLabel>Modules</PanelLabel>
            <span
              className="mt-1 block rounded-[6px] border px-2 py-1"
              style={{ background: "var(--st-surface)", borderColor: "var(--st-border)" }}
            >
              {WIDGETS.map((widget, index) => (
                <span
                  key={widget.label}
                  className={cn(
                    "flex items-center justify-between gap-1.5 py-[5px]",
                    index > 0 && "border-t",
                  )}
                  style={{ borderColor: "var(--st-border)" }}
                >
                  <span className="truncate text-[9px]" style={{ color: "var(--st-text)" }}>
                    {widget.label}
                  </span>
                  <Toggle on={widget.on} />
                </span>
              ))}
            </span>
          </span>

          <span className="block">
            <PanelLabel>Theme</PanelLabel>
            <span className="mt-1 flex gap-1.5">
              <span
                className="flex flex-1 items-center justify-center gap-1 rounded-[6px] border py-1 text-[9px] font-medium"
                style={{
                  background: "var(--st-primary-soft)",
                  borderColor: "var(--st-primary-a30)",
                  color: "var(--st-primary-ink)",
                }}
              >
                <Sun className="h-2.5 w-2.5" />
                Light
              </span>
              <span
                className="flex flex-1 items-center justify-center gap-1 rounded-[6px] border py-1 text-[9px]"
                style={{
                  background: "var(--st-surface)",
                  borderColor: "var(--st-border)",
                  color: "var(--st-text-muted)",
                }}
              >
                <Moon className="h-2.5 w-2.5" />
                Dark
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
