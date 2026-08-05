import { useMemo, useState } from "react";
import {
  Blocks,
  Bot,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  Command,
  Database,
  Home,
  Link2,
  Menu,
  Mic,
  Move,
  Palette,
  Plus,
  Search,
  Share2,
  ShieldAlert,
  Sparkles,
  Store,
  Telescope,
  Workflow,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { BrandSettingsPanel } from "./BrandSettingsPanel";
import { BrandLockup } from "./BrandMark";
import { useBrand } from "./brand/BrandProvider";
import { luminance } from "./brand/color";
import { draftFromPrompt, makeAgents, type Agent } from "./data";
import { Avatar, Meter } from "./ui";
import { AgentBuilderView } from "./views/AgentBuilder";
import { AgentsView } from "./views/Agents";
import { AnalyticsView } from "./views/Analytics";
import { HomeView } from "./views/Home";
import { KnowledgeView } from "./views/Knowledge";
import { SafetyView } from "./views/Safety";
import { SettingsView } from "./views/SettingsView";
import { StoreView } from "./views/Store";
import { ToolsView } from "./views/ToolsView";
import { VoiceView } from "./views/Voice";
import { WorkflowsView } from "./views/Workflows";

type NavKey =
  | "home"
  | "registry"
  | "create"
  | "voice"
  | "orchestrate"
  | "knowledge"
  | "safety"
  | "monitoring"
  | "connections"
  | "blueprints"
  | "store"
  | "settings";

interface NavItem {
  key: NavKey;
  label: string;
  icon: typeof Home;
  children?: string[];
}

/** Mirrors the live studio's rail: primary actions, then the capability groups. */
const NAV_TOP: NavItem[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "registry", label: "Agent Registry", icon: Bot },
  {
    key: "create",
    label: "Create Agent",
    icon: Plus,
    children: ["Agent", "Managerial", "SuperFlow", "Voice"],
  },
];

const NAV_MAIN: NavItem[] = [
  { key: "voice", label: "Voice", icon: Mic },
  {
    key: "orchestrate",
    label: "Orchestrate",
    icon: Workflow,
    children: ["Workflows", "Agent mesh", "Schedules"],
  },
  {
    key: "knowledge",
    label: "Knowledge",
    icon: Database,
    children: ["Sources", "Vector stores", "Sync history"],
  },
  {
    key: "safety",
    label: "Safety and Evaluations",
    icon: ShieldAlert,
    children: ["Guardrails", "Evaluations", "Red team"],
  },
  {
    key: "monitoring",
    label: "Monitoring",
    icon: Telescope,
    children: ["Usage", "Traces", "Alerts"],
  },
  {
    key: "connections",
    label: "Connections",
    icon: Link2,
    children: ["Tools", "Credentials", "Webhooks"],
  },
];

const NAV_BOTTOM: NavItem[] = [
  { key: "blueprints", label: "Blueprints", icon: Blocks },
  { key: "store", label: "Lyzr App Store", icon: Store },
];

const TITLES: Record<NavKey, string> = {
  home: "Home",
  registry: "Agent Registry",
  create: "Create Agent",
  voice: "Voice",
  orchestrate: "Orchestrate",
  knowledge: "Knowledge",
  safety: "Safety and Evaluations",
  monitoring: "Monitoring",
  connections: "Connections",
  blueprints: "Blueprints",
  store: "App Store",
  settings: "Settings",
};

/** Height of the "illustrative demo" strip, subtracted from the sticky rail. */
const BANNER_HEIGHT = 28;

export function StudioShell() {
  const { kit, theme } = useBrand();
  const [nav, setNav] = useState<NavKey>("home");
  const [agentId, setAgentId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ agent: Agent; prompt: string } | null>(null);
  const [open, setOpen] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);

  const agents = useMemo(() => makeAgents(kit.company, kit.brief), [kit.company, kit.brief]);
  // A colourful logo disappears on a dark or brand-filled sidebar.
  const sidebarIsDark = luminance(theme.vars["--st-sidebar-bg"]) < 0.45;
  const agent = draft?.agent ?? agents.find((item) => item.id === agentId) ?? null;

  const go = (key: NavKey) => {
    setNav(key);
    setAgentId(null);
    setDraft(null);
    setMobileNav(false);
  };

  const openAgent = (id: string) => {
    setDraft(null);
    setAgentId(id);
    setNav("registry");
  };

  // Architect: a prompt becomes a draft agent, opened in the builder.
  const runArchitect = (prompt: string) => {
    setDraft({ agent: draftFromPrompt(prompt, kit.company), prompt });
    setAgentId(null);
    setNav("registry");
  };

  const renderNavItem = (item: NavItem) => {
    const active = nav === item.key && !agent;
    const expanded = open.includes(item.key);
    return (
      <li key={item.key}>
        <button
          onClick={() => {
            if (item.children) {
              setOpen((prev) =>
                prev.includes(item.key)
                  ? prev.filter((key) => key !== item.key)
                  : [...prev, item.key],
              );
            }
            go(item.key === "create" ? "home" : item.key);
          }}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-[var(--st-radius-sm)] px-3 py-2 text-sm transition-colors",
            active ? "font-medium" : "opacity-75 hover:opacity-100",
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
          {item.children ? (
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 shrink-0 opacity-50 transition-transform",
                expanded && "rotate-90",
              )}
            />
          ) : null}
        </button>
        {item.children && expanded ? (
          <ul className="mb-1 ml-[1.6rem] mt-0.5 space-y-0.5 border-l border-[var(--st-sidebar-border)] pl-3">
            {item.children.map((child) => (
              <li key={child}>
                <button
                  onClick={() => go(item.key === "create" ? "home" : item.key)}
                  className="w-full truncate rounded-[var(--st-radius-sm)] px-2 py-1.5 text-left text-[13px] opacity-60 transition-opacity hover:opacity-100"
                >
                  {child}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    );
  };

  const sidebar = (
    <div
      className="flex h-full flex-col"
      style={{ background: "var(--st-sidebar-bg)", color: "var(--st-sidebar-text)" }}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <BrandLockup plate={sidebarIsDark} showProduct={false} />
        <div className="flex items-center gap-1 opacity-40">
          <Move className="hidden h-4 w-4 lg:block" />
          <ChevronsLeft className="hidden h-4 w-4 lg:block" />
          <button
            className="lg:hidden"
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-4">
        <ul className="space-y-0.5">{NAV_TOP.map(renderNavItem)}</ul>
        <ul className="space-y-0.5 border-t border-[var(--st-sidebar-border)] pt-4">
          {NAV_MAIN.map(renderNavItem)}
        </ul>
        <ul className="space-y-0.5 border-t border-[var(--st-sidebar-border)] pt-4">
          {NAV_BOTTOM.map(renderNavItem)}
        </ul>
      </nav>

      <div className="space-y-3 px-3 pb-4">
        <div className="space-y-0.5">
          <button className="flex w-full items-center gap-2.5 rounded-[var(--st-radius-sm)] px-3 py-2 text-sm opacity-75 transition-opacity hover:opacity-100">
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search</span>
            <span className="flex items-center gap-0.5 text-[11px] opacity-70">
              <Command className="h-3 w-3" />K
            </span>
          </button>
          <button
            onClick={() => setPanelOpen(true)}
            className="flex w-full items-center gap-2.5 rounded-[var(--st-radius-sm)] px-3 py-2 text-sm opacity-75 transition-opacity hover:opacity-100"
          >
            <Palette className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Brand Studio</span>
          </button>
        </div>

        <div className="rounded-[var(--st-radius-sm)] border border-[var(--st-sidebar-border)] px-3 py-2.5">
          <div className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Credits
            </span>
            <span className="font-medium tabular-nums">44,331.46</span>
          </div>
          <div className="mt-2">
            <Meter value={44} />
          </div>
        </div>

        <button className="flex w-full items-center gap-2.5 rounded-[var(--st-radius-sm)] border border-[var(--st-sidebar-border)] px-3 py-2 text-sm">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-semibold"
            style={{
              background: "var(--st-sidebar-active-bg)",
              color: "var(--st-sidebar-active-text)",
            }}
          >
            {kit.company.slice(0, 2).toUpperCase()}
          </span>
          <span className="flex-1 truncate text-left">{kit.company}-Org</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
        </button>

        <div className="flex items-center gap-2.5 px-1">
          <Avatar name="Saurabh Jain" size={28} />
          <div className="min-w-0 text-xs leading-tight">
            <p className="truncate font-medium">Saurabh Jain</p>
            <p className="truncate opacity-60">
              saurabh.jain@{kit.company.toLowerCase().replace(/\s+/g, "")}.ai
            </p>
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
          className="hidden w-[268px] shrink-0 border-r lg:block"
          style={{ borderColor: "var(--st-sidebar-border)" }}
        >
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
              className="fixed inset-y-0 left-0 z-50 w-[280px] border-r lg:hidden"
              style={{ borderColor: "var(--st-sidebar-border)" }}
            >
              {sidebar}
            </aside>
          </>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 px-4 py-3 lg:hidden">
            <button onClick={() => setMobileNav(true)} aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </button>
            <span className="truncate text-sm font-medium">{agent ? agent.name : TITLES[nav]}</span>
          </div>

          <main className="min-w-0 flex-1 px-4 pb-8 lg:px-8">
            {agent ? (
              <AgentBuilderView
                agent={agent}
                architectPrompt={draft?.prompt}
                onBack={() => {
                  setDraft(null);
                  setAgentId(null);
                }}
              />
            ) : nav === "home" || nav === "create" ? (
              <HomeView agents={agents} onOpenAgent={openAgent} onArchitect={runArchitect} />
            ) : nav === "registry" ? (
              <AgentsView agents={agents} onOpenAgent={openAgent} onCreate={() => go("home")} />
            ) : nav === "voice" ? (
              <VoiceView onCreate={() => go("home")} />
            ) : nav === "orchestrate" ? (
              <WorkflowsView />
            ) : nav === "knowledge" ? (
              <KnowledgeView />
            ) : nav === "safety" ? (
              <SafetyView />
            ) : nav === "monitoring" ? (
              <AnalyticsView />
            ) : nav === "connections" ? (
              <ToolsView />
            ) : nav === "blueprints" ? (
              <StoreView mode="blueprints" />
            ) : nav === "store" ? (
              <StoreView mode="store" />
            ) : (
              <SettingsView onOpenBrandStudio={() => setPanelOpen(true)} />
            )}
          </main>

          <footer
            className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-[11px] text-[var(--st-text-faint)] lg:px-8"
            style={{ borderColor: "var(--st-border)" }}
          >
            <span>Powered by Lyzr · white-label preview for {kit.company}</span>
            <button
              onClick={() => setPanelOpen(true)}
              className="flex items-center gap-1.5 hover:text-[var(--st-text)]"
            >
              <Share2 className="h-3 w-3" /> Change branding &amp; get a share link
            </button>
          </footer>
        </div>
      </div>

      <BrandSettingsPanel open={panelOpen} onClose={() => setPanelOpen(false)} />

      {!panelOpen ? (
        <button
          onClick={() => setPanelOpen(true)}
          title="Brand this studio for a customer"
          className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium shadow-lg transition-transform hover:scale-105"
          style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Brand Studio</span>
        </button>
      ) : null}
    </div>
  );
}
