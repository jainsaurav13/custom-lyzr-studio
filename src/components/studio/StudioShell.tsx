import { useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  Bot,
  ChevronDown,
  Command,
  CreditCard,
  Database,
  Home,
  Menu,
  Palette,
  Plus,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  Sparkles,
  Workflow,
  Wrench,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { BrandSettingsPanel } from "./BrandSettingsPanel";
import { BrandLockup, BrandMark } from "./BrandMark";
import { useBrand } from "./brand/BrandProvider";
import { luminance } from "./brand/color";
import { makeAgents } from "./data";
import { Avatar, Badge, Button, Meter } from "./ui";
import { AgentBuilderView } from "./views/AgentBuilder";
import { AgentsView } from "./views/Agents";
import { AnalyticsView } from "./views/Analytics";
import { HomeView } from "./views/Home";
import { KnowledgeView } from "./views/Knowledge";
import { SettingsView } from "./views/SettingsView";
import { StoreView } from "./views/Store";
import { ToolsView } from "./views/ToolsView";
import { WorkflowsView } from "./views/Workflows";

type NavKey =
  | "home"
  | "agents"
  | "store"
  | "workflows"
  | "knowledge"
  | "tools"
  | "analytics"
  | "billing"
  | "settings";

const NAV: Array<{ key: NavKey; label: string; icon: typeof Home; group: string; badge?: string }> =
  [
    { key: "home", label: "Home", icon: Home, group: "Build" },
    { key: "agents", label: "Agents", icon: Bot, group: "Build" },
    { key: "workflows", label: "Workflows", icon: Workflow, group: "Build" },
    { key: "store", label: "Agent Store", icon: ShoppingBag, group: "Build", badge: "New" },
    { key: "knowledge", label: "Knowledge Base", icon: Database, group: "Data" },
    { key: "tools", label: "Tools", icon: Wrench, group: "Data" },
    { key: "analytics", label: "Analytics", icon: BarChart3, group: "Govern" },
    { key: "billing", label: "Usage & billing", icon: CreditCard, group: "Govern" },
    { key: "settings", label: "Settings", icon: Settings, group: "Govern" },
  ];

const TITLES: Record<NavKey, string> = {
  home: "Home",
  agents: "Agents",
  store: "Agent Store",
  workflows: "Workflows",
  knowledge: "Knowledge Base",
  tools: "Tools",
  analytics: "Analytics",
  billing: "Usage & billing",
  settings: "Settings",
};

/** Height of the "illustrative demo" strip, subtracted from the sticky rail. */
const BANNER_HEIGHT = 28;

export function StudioShell() {
  const { kit, theme } = useBrand();
  const [nav, setNav] = useState<NavKey>("home");
  const [agentId, setAgentId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);

  const agents = useMemo(() => makeAgents(kit.company), [kit.company]);
  // A colourful logo disappears on a dark or brand-filled sidebar.
  const sidebarIsDark = luminance(theme.vars["--st-sidebar-bg"]) < 0.45;
  const agent = agents.find((item) => item.id === agentId) ?? null;

  const openAgent = (id: string) => {
    setAgentId(id);
    setNav("agents");
  };

  const groups = NAV.reduce<Record<string, typeof NAV>>((acc, item) => {
    acc[item.group] = [...(acc[item.group] ?? []), item];
    return acc;
  }, {});

  const sidebar = (
    <div
      className="flex h-full flex-col"
      style={{ background: "var(--st-sidebar-bg)", color: "var(--st-sidebar-text)" }}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <BrandLockup plate={sidebarIsDark} />
        <button
          className="rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 lg:hidden"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-3">
        <button
          className="flex w-full items-center justify-between gap-2 rounded-[var(--st-radius-sm)] px-3 py-2 text-left text-xs transition-colors"
          style={{
            background: "var(--st-sidebar-active-bg)",
            color: "var(--st-sidebar-active-text)",
          }}
        >
          <span className="min-w-0">
            <span className="block truncate font-medium">{kit.company} — Production</span>
            <span className="block truncate opacity-70">Enterprise workspace</span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] opacity-45">
              {group}
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const active = nav === item.key;
                return (
                  <li key={item.key}>
                    <button
                      onClick={() => {
                        setNav(item.key);
                        setAgentId(null);
                        setMobileNav(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-[var(--st-radius-sm)] px-3 py-2 text-sm transition-colors",
                        active ? "font-medium" : "opacity-70 hover:opacity-100",
                      )}
                      style={
                        active
                          ? {
                              background: "var(--st-sidebar-active-bg)",
                              color: "var(--st-sidebar-active-text)",
                            }
                          : undefined
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 truncate text-left">{item.label}</span>
                      {item.badge ? (
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase"
                          style={{ background: "var(--st-accent)", color: "var(--st-accent-on)" }}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div
        className="space-y-3 border-t px-4 py-4"
        style={{ borderColor: "var(--st-sidebar-border)" }}
      >
        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="opacity-70">Credits</span>
            <span className="tabular-nums opacity-70">612k / 1M</span>
          </div>
          <div className="mt-1.5">
            <Meter value={61} />
          </div>
        </div>
        <button
          onClick={() => setPanelOpen(true)}
          className="flex w-full items-center gap-2 rounded-[var(--st-radius-sm)] px-2 py-2 text-xs transition-colors hover:opacity-100"
          style={{
            background: "var(--st-sidebar-active-bg)",
            color: "var(--st-sidebar-active-text)",
          }}
        >
          <Palette className="h-3.5 w-3.5" /> Brand Studio
        </button>
        <div className="flex items-center gap-2.5">
          <Avatar name="Alex Doe" size={28} />
          <div className="min-w-0 text-xs">
            <p className="truncate font-medium">Alex Doe</p>
            <p className="truncate opacity-60">Workspace owner</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        ...theme.vars,
        background: "var(--st-page-bg)",
        backgroundSize: theme.vars["--st-page-bg-size"] ?? "auto",
        color: "var(--st-text)",
        fontFamily: "var(--st-font-body)",
        minHeight: "100vh",
      }}
      className="antialiased"
    >
      {bannerOpen ? (
        <div
          className="flex items-center justify-center gap-2 px-4 py-1.5 text-[11px]"
          style={{
            minHeight: BANNER_HEIGHT,
            background: "var(--st-primary-soft)",
            color: "var(--st-primary-ink)",
          }}
        >
          <Sparkles className="h-3 w-3" />
          <span className="truncate">
            Illustrative Lyzr Studio workspace, themed for {kit.company}. Data shown is sample data.
          </span>
          <button
            onClick={() => setBannerOpen(false)}
            aria-label="Dismiss"
            className="opacity-60 hover:opacity-100"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}

      <div className="flex min-h-screen">
        <aside
          className="hidden w-[248px] shrink-0 border-r lg:block"
          style={{ borderColor: "var(--st-sidebar-border)" }}
        >
          {/* The demo banner eats into the viewport, so the rail is sized around it. */}
          <div
            className="sticky top-0"
            style={{ height: `calc(100vh - ${bannerOpen ? BANNER_HEIGHT : 0}px)` }}
          >
            {sidebar}
          </div>
        </aside>

        {mobileNav ? (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileNav(false)}
            />
            <aside
              className="fixed inset-y-0 left-0 z-50 w-[264px] border-r lg:hidden"
              style={{ borderColor: "var(--st-sidebar-border)" }}
            >
              {sidebar}
            </aside>
          </>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header
            className="sticky top-0 z-30 flex items-center gap-3 border-b px-4 py-3 backdrop-blur-xl lg:px-6"
            style={{
              borderColor: "var(--st-border)",
              background: "color-mix(in srgb, var(--st-bg) 82%, transparent)",
            }}
          >
            <button
              className="lg:hidden"
              onClick={() => setMobileNav(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden min-w-0 items-center gap-2 text-sm sm:flex">
              <span className="text-[var(--st-text-faint)]">{kit.company}</span>
              <span className="text-[var(--st-text-faint)]">/</span>
              <span className="truncate font-medium">{agent ? agent.name : TITLES[nav]}</span>
            </div>

            <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--st-text-faint)]" />
              <input
                readOnly
                placeholder="Search agents, tools, docs"
                className="w-full rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] py-2 pl-9 pr-16 text-sm placeholder:text-[var(--st-text-faint)] focus:outline-none"
              />
              <span className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded border border-[var(--st-border)] px-1.5 py-0.5 text-[10px] text-[var(--st-text-faint)]">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </div>

            <div className={cn("flex items-center gap-2", "md:ml-0 ml-auto")}>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPanelOpen(true)}
                aria-label="Brand Studio"
                title="Brand this studio for a customer"
              >
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Brand Studio</span>
              </Button>
              <Button variant="primary" size="sm" onClick={() => setNav("agents")}>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create agent</span>
              </Button>
              <BrandMark size={30} className="ml-1 hidden sm:inline-flex" />
            </div>
          </header>

          <main className="min-w-0 flex-1 p-4 lg:p-6">
            {agent ? (
              <AgentBuilderView agent={agent} onBack={() => setAgentId(null)} />
            ) : nav === "home" ? (
              <HomeView agents={agents} onOpenAgent={openAgent} onCreate={() => setNav("agents")} />
            ) : nav === "agents" ? (
              <AgentsView
                agents={agents}
                onOpenAgent={openAgent}
                onCreate={() => openAgent(agents[0].id)}
              />
            ) : nav === "store" ? (
              <StoreView />
            ) : nav === "workflows" ? (
              <WorkflowsView />
            ) : nav === "knowledge" ? (
              <KnowledgeView />
            ) : nav === "tools" ? (
              <ToolsView />
            ) : nav === "analytics" || nav === "billing" ? (
              <AnalyticsView />
            ) : (
              <SettingsView onOpenBrandStudio={() => setPanelOpen(true)} />
            )}
          </main>

          <footer
            className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-[11px] text-[var(--st-text-faint)] lg:px-6"
            style={{ borderColor: "var(--st-border)" }}
          >
            <span>Powered by Lyzr · white-label preview for {kit.company}</span>
            <button
              onClick={() => setPanelOpen(true)}
              className="flex items-center gap-1.5 hover:text-[var(--st-text)]"
            >
              <Share2 className="h-3 w-3" /> Change branding & get a share link
            </button>
          </footer>
        </div>
      </div>

      <BrandSettingsPanel open={panelOpen} onClose={() => setPanelOpen(false)} />

      {!panelOpen ? (
        <button
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium shadow-lg transition-transform hover:scale-105 lg:hidden"
          style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
        >
          <Palette className="h-4 w-4" /> Brand
        </button>
      ) : null}

      <span className="sr-only">
        <Badge tone="neutral">{theme.mode}</Badge>
      </span>
    </div>
  );
}
