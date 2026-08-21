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
        className="mt-4 text-[13px] leading-snug font-semibold tracking-[0.14em] uppercase lg:min-h-[2.5rem]"
        style={{ color: onInk ? "var(--ab-ink-text)" : "var(--st-text)" }}
      >
        {name}
      </p>
      <span
        className="my-4 block h-px w-full"
        style={{ background: onInk ? "var(--ab-ink-border)" : "var(--ab-rule)" }}
      />
      <p
        className="text-[15px] leading-snug lg:min-h-[3.25rem]"
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
  { label: "Telco owns the customer", detail: "Brand, contract, pricing, billing" },
  { label: "Data stays inside the boundary", detail: "Approved locations and access rules" },
  { label: "New enterprise AI revenue", detail: "Platform, services and attached network" },
  { label: "Faster time to market", detail: "No nine-to-eighteen-month platform build" },
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
          role="Agent platform and expertise"
          detail="Builds, licenses and supports the sovereign agent technology underneath."
        />
        <Arrow label="Provides the platform" />
        <ChainNode
          variant="accent"
          icon={<RadioTower size={32} strokeWidth={1.5} />}
          name="Telco"
          role="Telco-branded sovereign AI offering"
          detail="Hosts, brands, prices, sells and operates the service."
        />
        <Arrow label="Delivers governed agents" />
        <ChainNode
          variant="paper"
          icon={<Building2 size={32} strokeWidth={1.5} />}
          name="Enterprise & government"
          role="Enterprise AI adoption"
          detail="Deploys production agents through a trusted local provider."
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
              className="mt-2 text-sm font-semibold lg:min-h-10"
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
    lyzrRole: "Licenses the platform and supports its lifecycle",
    telcoRole: "Brands, operates and takes the platform to market",
    customer: "Enterprise customers",
    customerDetail: "Use the telco-branded agent platform",
    revenue: "Enterprise pays the telco. Lyzr earns an OEM or platform licence with usage upside.",
    fit: "Operators with enterprise scale, cloud or data-centre capability and the capacity to run a platform business.",
    why: [
      "The telco owns the customer relationship and the brand.",
      "Enterprises get a trusted, sovereign agent platform.",
      "Lyzr provides the technology that powers it.",
    ],
  },
  {
    title: "Telco-prime managed agent service",
    standfirst: "The fastest commercial entry",
    lyzrRole: "Implements, customizes and supports the platform",
    telcoRole: "Sells, contracts and manages the customer",
    customer: "Enterprise customers",
    customerDetail: "Consume a packaged, managed agent service",
    revenue: "Enterprise pays the telco. The telco pays Lyzr for platform, enablement and usage.",
    fit: "Operators with strong enterprise sales and managed services, but no appetite for an immediate platform launch.",
    why: [
      "The telco owns the customer relationship and the P&L.",
      "Lyzr delivers, operates and ensures success.",
      "Enterprises get a turnkey, managed solution.",
    ],
  },
  {
    title: "Private agent platform and managed AI distribution",
    standfirst: "For isolated environments",
    lyzrRole: "Supplies the dedicated agent platform",
    telcoRole: "Packages infrastructure, security and operations",
    customer: "Regulated customers",
    customerDetail: "Run agents in a single-tenant, locally operated environment",
    revenue:
      "Dedicated capacity and managed fees to the telco; a private deployment licence to Lyzr.",
    fit: "Government, financial services, healthcare, defence and critical infrastructure.",
    why: [
      "Meets on-premises and single-tenant isolation rules.",
      "A focused sovereignty proposition, sold on its own.",
      "No horizontal platform launch required up front.",
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
            style={{ borderColor: "var(--ab-rule)", minHeight: "9.5rem" }}
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
            <Body className="mt-1.5 lg:min-h-16">{model.revenue}</Body>
          </div>

          <div className="mt-5">
            <p
              className="text-[10px] font-semibold tracking-[0.16em] uppercase"
              style={{ color: "var(--st-text-faint)" }}
            >
              Best fit
            </p>
            <Body className="mt-1.5 lg:min-h-16">{model.fit}</Body>
          </div>

          <div
            className="mt-5 rounded-[var(--st-radius-sm)] p-4"
            style={{ background: "var(--ab-paper)" }}
          >
            <Heading3 className="text-sm">Why it works</Heading3>
            <RuleList className="mt-2" items={model.why} />
          </div>
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
      detail: "Provides the agent platform technology and the enablement around it.",
    },
    {
      label: "Telco",
      detail: "Owns the customer relationship, the brand and the commercial offer.",
    },
    {
      label: "Enterprise",
      detail: "Uses the agents to drive business outcomes inside its own systems.",
    },
    {
      label: "Sovereignty",
      detail: "Every motion can run private and compliant, in telco or customer infrastructure.",
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
