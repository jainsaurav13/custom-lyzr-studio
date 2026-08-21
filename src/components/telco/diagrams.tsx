import { Building2, RadioTower } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Body, Heading3, Numeral, RuleList } from "./ui";

/** The Lyzr glyph, redrawn so the diagram does not depend on an asset. */
export function LyzrGlyph({
  size = 40,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M20 5 L5 24 L20 43"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 5 L43 24 L28 43"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M31 13 L17 35" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-2 md:py-0">
      <svg
        width="64"
        height="12"
        viewBox="0 0 64 12"
        fill="none"
        aria-hidden
        className="my-6 rotate-90 md:my-0 md:rotate-0"
      >
        <path d="M0 6 H52" stroke="var(--st-accent)" strokeWidth="1.5" />
        <path d="M50 1.5 L62 6 L50 10.5 Z" fill="var(--st-accent)" />
      </svg>
      <span
        className="text-center text-[11px] leading-tight tracking-[0.02em]"
        style={{ color: "var(--st-text-faint)" }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Three actors, three treatments rather than three hues: Lyzr is the ink panel
 * underneath, the telco carries the accent because it carries the market, and
 * the enterprise sits on plain paper.
 */
function ChainNode({
  variant,
  icon,
  name,
  role,
  detail,
}: {
  variant: "ink" | "accent" | "paper";
  icon: ReactNode;
  name: string;
  role: string;
  detail: string;
}) {
  const onInk = variant === "ink";
  return (
    <div
      className="flex flex-1 flex-col rounded-[var(--st-radius)] border p-6"
      style={{
        background: onInk ? "var(--ab-ink)" : "var(--st-surface-2)",
        borderColor: onInk
          ? "var(--ab-ink)"
          : variant === "accent"
            ? "var(--st-accent)"
            : "var(--st-border)",
        color: onInk ? "var(--ab-ink-text)" : "var(--st-text)",
      }}
    >
      <div
        className="flex h-10 items-center"
        style={{
          color: onInk
            ? "var(--ab-accent-on-ink)"
            : variant === "accent"
              ? "var(--st-accent)"
              : "var(--st-text-faint)",
        }}
      >
        {icon}
      </div>
      <p
        className="mt-4 text-[13px] leading-snug font-semibold tracking-[0.14em] uppercase lg:min-h-[2.25rem]"
        style={{ color: onInk ? "var(--ab-ink-text)" : "var(--st-text)" }}
      >
        {name}
      </p>
      <span
        className="my-4 block h-px w-full"
        style={{ background: onInk ? "var(--ab-ink-border)" : "var(--ab-rule)" }}
      />
      <p
        className="text-[15px] leading-snug lg:min-h-[1.5rem]"
        style={{
          fontFamily: "var(--ab-serif)",
          color: onInk ? "var(--ab-accent-on-ink)" : "var(--st-accent-ink)",
        }}
      >
        {role}
      </p>
      <Body className="mt-2" onInk={onInk}>
        {detail}
      </Body>
    </div>
  );
}

const CHAIN_BENEFITS = [
  { label: "You own the customer", detail: "Brand, contract, pricing" },
  { label: "Data stays in boundary", detail: "Approved locations only" },
  { label: "New AI revenue", detail: "Platform, services, attached network" },
  { label: "Live in a quarter", detail: "Not an 18-month build" },
];

/** The value chain: from telecom provider to sovereign AI agent provider. */
export function ValueChain() {
  return (
    <div
      className="rounded-[var(--st-radius-lg)] border p-6 sm:p-8"
      style={{
        borderColor: "var(--st-border)",
        background: "var(--st-surface)",
        boxShadow: "var(--st-shadow)",
      }}
    >
      <div className="flex flex-col items-stretch gap-2 md:flex-row">
        <ChainNode
          variant="ink"
          icon={<LyzrGlyph size={34} color="var(--ab-accent-on-ink)" />}
          name="Lyzr"
          role="The agent platform"
          detail="Builds and licenses the technology underneath."
        />
        <Arrow label="Licenses the platform" />
        <ChainNode
          variant="accent"
          icon={<RadioTower size={32} strokeWidth={1.5} />}
          name="Telco"
          role="The branded service"
          detail="Hosts, brands, prices and operates it."
        />
        <Arrow label="Sells governed agents" />
        <ChainNode
          variant="paper"
          icon={<Building2 size={32} strokeWidth={1.5} />}
          name="Enterprise & government"
          role="Enterprise adoption"
          detail="Buys governed agents from a provider it trusts."
        />
      </div>

      <div
        className="mt-8 grid gap-x-10 gap-y-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderColor: "var(--ab-rule)" }}
      >
        {CHAIN_BENEFITS.map((benefit, index) => (
          <div key={benefit.label}>
            <Numeral value={index + 1} />
            <p
              className="mt-2 text-sm font-semibold lg:min-h-6"
              style={{ color: "var(--st-text)", fontFamily: "var(--st-font-head)" }}
            >
              {benefit.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--st-text-faint)" }}>
              {benefit.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

type Blueprint = {
  title: string;
  standfirst: string;
  couplet: string;
  lyzrRole: string;
  telcoRole: string;
  customer: string;
  customerDetail: string;
  revenue: string;
  fit: string;
  why: string[];
};

const BLUEPRINTS: Blueprint[] = [
  {
    title: "Telco-owned sovereign agent platform",
    standfirst: "The strategic destination",
    couplet: "Your platform. Our technology.",
    lyzrRole: "Licenses and supports the platform",
    telcoRole: "Brands, operates, sells",
    customer: "Enterprise customers",
    customerDetail: "Use your branded platform",
    revenue: "They pay you. You pay an OEM licence.",
    fit: "Enterprise scale, cloud capability, appetite to run a platform.",
    why: [
      "You own the relationship and the brand.",
      "Enterprises get a sovereign platform they trust.",
      "Lyzr stays underneath it.",
    ],
  },
  {
    title: "Telco-prime managed agent service",
    standfirst: "The fastest commercial entry",
    couplet: "Your customer. We deliver underneath.",
    lyzrRole: "Implements, customizes, supports",
    telcoRole: "Sells, contracts, manages",
    customer: "Enterprise customers",
    customerDetail: "Buy a managed agent service",
    revenue: "They pay you. You pay for platform and delivery.",
    fit: "Strong enterprise sales, no appetite for a platform launch yet.",
    why: [
      "You own the relationship and the P&L.",
      "Lyzr delivers and operates behind you.",
      "Fastest route to a first reference.",
    ],
  },
  {
    title: "Private agent platform and managed AI distribution",
    standfirst: "For isolated environments",
    couplet: "Your infrastructure. Their boundary.",
    lyzrRole: "Supplies the dedicated platform",
    telcoRole: "Packages hosting, security, ops",
    customer: "Regulated customers",
    customerDetail: "Run agents in their own boundary",
    revenue: "Capacity and managed fees to you, deployment licence to Lyzr.",
    fit: "Government, financial services, healthcare, defence.",
    why: [
      "Meets single-tenant and on-premises rules.",
      "A sovereignty offer that sells on its own.",
      "No platform launch required up front.",
    ],
  },
];

function ActorRow({ who, role }: { who: string; role: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span
        className="mt-px flex w-24 shrink-0 items-center text-[10px] leading-4 font-semibold tracking-[0.12em] uppercase"
        style={{ color: "var(--st-text-faint)" }}
      >
        {who}
      </span>
      <span className="text-sm leading-snug" style={{ color: "var(--st-text)" }}>
        {role}
      </span>
    </div>
  );
}

/** The three ways a telco can take sovereign agents to market. */
export function BlueprintCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {BLUEPRINTS.map((model, index) => (
        <article
          key={model.title}
          className="flex flex-col rounded-[var(--st-radius)] border p-6"
          style={{
            borderColor: "var(--st-border)",
            background: "var(--st-surface-2)",
            boxShadow: "var(--st-shadow)",
          }}
        >
          <div className="flex items-center gap-3">
            <Numeral value={index + 1} />
            <span
              className="text-[11px] tracking-[0.02em]"
              style={{ color: "var(--st-text-faint)" }}
            >
              {model.standfirst}
            </span>
          </div>
          <h3
            className="mt-3 text-[1.375rem] leading-[1.2] text-balance"
            style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
          >
            {model.title}
          </h3>

          <div
            className="mt-5 divide-y border-y"
            style={{ borderColor: "var(--ab-rule)", minHeight: "8.5rem" }}
          >
            <ActorRow who="Lyzr" role={model.lyzrRole} />
            <ActorRow who="Telco" role={model.telcoRole} />
            <ActorRow who={model.customer.split(" ")[0]} role={model.customerDetail} />
          </div>

          <div className="mt-5">
            <p
              className="text-[10px] font-semibold tracking-[0.16em] uppercase"
              style={{ color: "var(--st-accent-ink)" }}
            >
              Revenue flow
            </p>
            <Body className="mt-1.5 lg:min-h-10">{model.revenue}</Body>
          </div>

          <div className="mt-5">
            <p
              className="text-[10px] font-semibold tracking-[0.16em] uppercase"
              style={{ color: "var(--st-text-faint)" }}
            >
              Best fit
            </p>
            <Body className="mt-1.5 lg:min-h-10">{model.fit}</Body>
          </div>

          <div
            className="mt-5 rounded-[var(--st-radius-sm)] p-4"
            style={{ background: "var(--ab-paper)" }}
          >
            <Heading3 className="text-sm">Why it works</Heading3>
            <RuleList className="mt-2" items={model.why} />
          </div>

          <p
            className="mt-5 text-[15px] leading-snug"
            style={{ fontFamily: "var(--ab-serif)", color: "var(--st-accent-ink)" }}
          >
            {model.couplet}
          </p>
        </article>
      ))}
    </div>
  );
}

/** Legend for the blueprints — who is who in every motion. */
export function BlueprintLegend({ className }: { className?: string }) {
  const entries = [
    {
      label: "Lyzr",
      detail: "The platform technology and the enablement around it.",
    },
    {
      label: "Telco",
      detail: "The customer, the brand, the commercial offer.",
    },
    {
      label: "Enterprise",
      detail: "Runs the agents inside its own systems.",
    },
    {
      label: "Sovereignty",
      detail: "Every model runs private — your infrastructure or theirs.",
    },
  ];
  return (
    <div
      className={cn("grid gap-x-10 gap-y-6 border-t pt-8 md:grid-cols-2 lg:grid-cols-4", className)}
      style={{ borderColor: "var(--ab-rule)" }}
    >
      {entries.map((entry) => (
        <div key={entry.label}>
          <p
            className="text-[11px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "var(--st-text)" }}
          >
            {entry.label}
          </p>
          <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--st-text-faint)" }}>
            {entry.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Narrative components — the build-vs-license table, the service stack
 * and the comparison table the story leans on.
 * ------------------------------------------------------------------ */

const BUILD_PIECES: [string, string][] = [
  ["Per-tenant isolation", "No two customers share a boundary"],
  ["Customer-controlled deployment", "Regulated accounts dictate where it runs"],
  ["Guardrails, evaluation, audit evidence", "Their risk team audits you, not the model vendor"],
  ["Model and cloud abstraction", "The approved catalogue keeps changing"],
  ["Tenant admin and billing", "It bills and reports like the rest of your estate"],
  ["Lifecycle: upgrades, L2/L3, roadmap", "Someone owns this every week, forever"],
];

/** What an operator would have to build to become the provider itself. */
export function BuildTable() {
  return (
    <div
      className="overflow-hidden rounded-[var(--st-radius)] border"
      style={{ borderColor: "var(--st-border)", background: "var(--st-surface-2)" }}
    >
      <div
        className="grid grid-cols-[1fr_auto] gap-4 border-b px-6 py-4 sm:grid-cols-[1.4fr_1fr_auto] sm:gap-8"
        style={{ borderColor: "var(--ab-rule)", background: "var(--ab-paper)" }}
      >
        <p
          className="text-[10px] font-semibold tracking-[0.16em] uppercase"
          style={{ color: "var(--st-text-faint)" }}
        >
          If you build it yourself
        </p>
        <p
          className="hidden text-[10px] font-semibold tracking-[0.16em] uppercase sm:block"
          style={{ color: "var(--st-text-faint)" }}
        >
          Why you cannot skip it
        </p>
        <p
          className="text-right text-[10px] font-semibold tracking-[0.16em] uppercase"
          style={{ color: "var(--st-accent-ink)" }}
        >
          With Lyzr
        </p>
      </div>

      {BUILD_PIECES.map(([piece, why], index) => (
        <div
          key={piece}
          className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b px-6 py-4 sm:grid-cols-[1.4fr_1fr_auto] sm:gap-8"
          style={{ borderColor: "var(--ab-rule)" }}
        >
          <div className="flex items-baseline gap-3">
            <Numeral value={index + 1} />
            <p className="text-sm font-medium" style={{ color: "var(--st-text)" }}>
              {piece}
            </p>
          </div>
          <p
            className="hidden text-xs leading-relaxed sm:block"
            style={{ color: "var(--st-text-faint)" }}
          >
            {why}
          </p>
          <p className="text-right text-xs font-semibold" style={{ color: "var(--st-accent-ink)" }}>
            Included
          </p>
        </div>
      ))}

      <div className="grid grid-cols-[1fr_auto] gap-4 px-6 py-5 sm:grid-cols-[1.4fr_1fr_auto] sm:gap-8">
        <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
          Total
        </p>
        <p className="hidden text-xs sm:block" style={{ color: "var(--st-text-faint)" }}>
          A programme no customer will pay you for
        </p>
        <p className="text-right text-xs font-semibold" style={{ color: "var(--st-accent-ink)" }}>
          From day one
        </p>
      </div>
    </div>
  );
}

const STACK: { band: string; label: string; items: string[]; tone: "telco" | "lyzr" | "base" }[] = [
  {
    band: "Yours alone",
    label: "The service your market buys",
    tone: "telco",
    items: ["Brand", "Pricing", "Contracts", "Channel", "Customer success"],
  },
  {
    band: "Licensed from Lyzr",
    label: "The agent platform layer",
    tone: "lyzr",
    items: [
      "Agent builder",
      "Orchestration",
      "Governed runtime",
      "Memory & tools",
      "Guardrails",
      "Evaluation",
      "Observability",
      "Tenant admin & APIs",
    ],
  },
  {
    band: "Stays in place",
    label: "The estate you already run",
    tone: "base",
    items: [
      "Approved models",
      "Telco & sovereign cloud",
      "Enterprise systems",
      "IAM & SSO",
      "SOC & audit",
      "Billing",
      "Network & edge",
    ],
  },
];

/** The service, drawn as the three bands an operator has to reason about. */
export function ServiceStack() {
  return (
    <div className="space-y-3">
      {STACK.map((band) => {
        const onInk = band.tone === "lyzr";
        return (
          <div
            key={band.band}
            className="rounded-[var(--st-radius)] border px-6 py-5"
            style={{
              borderColor: onInk ? "var(--ab-ink)" : "var(--st-border)",
              background: onInk
                ? "var(--ab-ink)"
                : band.tone === "telco"
                  ? "var(--st-surface-2)"
                  : "var(--ab-paper)",
            }}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p
                className="text-[10px] font-semibold tracking-[0.16em] uppercase"
                style={{ color: onInk ? "var(--ab-accent-on-ink)" : "var(--st-accent-ink)" }}
              >
                {band.band}
              </p>
              <p
                className="text-[15px]"
                style={{
                  fontFamily: "var(--ab-serif)",
                  color: onInk ? "var(--ab-ink-text)" : "var(--st-text)",
                }}
              >
                {band.label}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {band.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3 py-1 text-xs"
                  style={
                    onInk
                      ? {
                          borderColor: "var(--ab-ink-border)",
                          color: "var(--ab-ink-muted)",
                          background: "var(--ab-ink-raised)",
                        }
                      : {
                          borderColor: "var(--st-border)",
                          color: "var(--st-text-muted)",
                          background: "var(--st-surface)",
                        }
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const COMPARISON: { row: string; cells: [string, string, string, string] }[] = [
  {
    row: "Whose brand the customer buys",
    cells: [
      "Yours, after you build it all",
      "Theirs — their console",
      "The integrator's, per project",
      "Yours, by design",
    ],
  },
  {
    row: "Where it can run",
    cells: [
      "Wherever you engineer it",
      "Their cloud regions",
      "Wherever it was built",
      "Your cloud, sovereign cloud or theirs",
    ],
  },
  {
    row: "Governance across models and clouds",
    cells: [
      "You build and maintain it",
      "Strongest on their own stack",
      "One tool per problem",
      "One policy layer across approved environments",
    ],
  },
  {
    row: "Time before a customer sees it",
    cells: [
      "9–18 months of platform work",
      "Fast to pilot, slow to brand",
      "Fast once, never repeatable",
      "Lighthouse in weeks, offer in a quarter",
    ],
  },
];

const COMPARISON_HEADS = [
  "Build it yourself",
  "Resell a hyperscaler platform",
  "Per-customer SI project",
  "Lyzr partnership",
];

/** The four routes an operator is really choosing between. */
export function ComparisonTable() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <thead>
          <tr>
            <th className="w-52 py-3 pr-4 align-bottom" />
            {COMPARISON_HEADS.map((head, index) => (
              <th
                key={head}
                className="border-b py-3 pr-4 align-bottom text-[10px] font-semibold tracking-[0.16em] uppercase"
                style={{
                  borderColor: "var(--ab-rule)",
                  color: index === 3 ? "var(--st-accent-ink)" : "var(--st-text-faint)",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.row}>
              <th
                className="border-b py-4 pr-6 align-top text-sm font-semibold"
                style={{ borderColor: "var(--ab-rule)", color: "var(--st-text)" }}
              >
                {row.row}
              </th>
              {row.cells.map((cell, index) => (
                <td
                  key={index}
                  className="border-b py-4 pr-4 align-top text-xs leading-relaxed"
                  style={{
                    borderColor: "var(--ab-rule)",
                    color: index === 3 ? "var(--st-text)" : "var(--st-text-faint)",
                    fontWeight: index === 3 ? 500 : 400,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
