import { Building2, DollarSign, Gauge, Lock, RadioTower, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { TONE, type ToneName } from "./ui";

/** The Lyzr glyph, redrawn so the diagram does not depend on an asset. */
export function LyzrGlyph({ size = 40, color = TONE.lyzr.ink }: { size?: number; color?: string }) {
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

function Arrow({ label, tone }: { label: string; tone: ToneName }) {
  const color = TONE[tone].line;
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-2 py-2 md:py-0">
      <svg
        width="72"
        height="16"
        viewBox="0 0 72 16"
        fill="none"
        aria-hidden
        className="my-7 rotate-90 md:my-0 md:rotate-0"
      >
        <path d="M0 8 H60" stroke={color} strokeWidth="3" />
        <path d="M58 2 L70 8 L58 14 Z" fill={color} />
      </svg>
      <span className="text-center text-xs leading-tight font-medium text-slate-600">{label}</span>
    </div>
  );
}

function ChainNode({
  tone,
  icon,
  name,
  role,
  detail,
}: {
  tone: ToneName;
  icon: ReactNode;
  name: string;
  role: string;
  detail: string;
}) {
  const t = TONE[tone];
  return (
    <div
      className="flex flex-1 flex-col items-center rounded-2xl border-2 bg-white px-6 py-8 text-center"
      style={{ borderColor: t.line }}
    >
      <div className="flex h-14 items-center justify-center">{icon}</div>
      <p
        className="mt-4 text-lg font-bold tracking-wide uppercase sm:text-xl"
        style={{ color: t.ink }}
      >
        {name}
      </p>
      <span className="my-4 block h-px w-4/5" style={{ background: t.border }} />
      <p className="text-base font-semibold" style={{ color: t.line }}>
        {role}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>
    </div>
  );
}

const CHAIN_BENEFITS: { tone: ToneName; icon: ReactNode; label: string }[] = [
  { tone: "lyzr", icon: <UserRound size={22} />, label: "Telco owns the customer" },
  { tone: "telco", icon: <Lock size={22} />, label: "Data remains locally controlled" },
  { tone: "enterprise", icon: <DollarSign size={22} />, label: "New enterprise AI revenue" },
  { tone: "lyzr", icon: <Gauge size={22} />, label: "Faster time to market" },
];

/** "From telecom provider to sovereign AI agent provider" — the value chain. */
export function ValueChain() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
        <ChainNode
          tone="lyzr"
          icon={<LyzrGlyph size={48} />}
          name="Lyzr"
          role="Agent platform & expertise"
          detail="Builds and powers the sovereign agent technology"
        />
        <Arrow label="Provides platform" tone="lyzr" />
        <ChainNode
          tone="telco"
          icon={<RadioTower size={46} color={TONE.telco.line} strokeWidth={1.6} />}
          name="Telco"
          role="Telco-branded sovereign AI offering"
          detail="Hosts, brands, sells and operates the service"
        />
        <Arrow label="Delivers trusted AI agents" tone="telco" />
        <ChainNode
          tone="enterprise"
          icon={<Building2 size={46} color={TONE.enterprise.line} strokeWidth={1.6} />}
          name="Enterprise & government"
          role="Enterprise AI adoption"
          detail="Deploy governed agents through a trusted local provider"
        />
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {CHAIN_BENEFITS.map((benefit) => (
          <div key={benefit.label} className="flex items-center gap-3 bg-white px-5 py-4">
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: TONE[benefit.tone].soft, color: TONE[benefit.tone].line }}
            >
              {benefit.icon}
            </span>
            <span
              className="text-sm leading-snug font-semibold"
              style={{ color: TONE[benefit.tone].ink }}
            >
              {benefit.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm font-bold text-slate-900 sm:text-base">
        Lyzr provides the technology. The telco owns the market.
      </p>
    </div>
  );
}

type Blueprint = {
  number: string;
  title: string;
  tone: ToneName;
  headerFrom: string;
  headerTo: string;
  lyzrRole: string;
  telcoRole: string;
  flow: "one-way" | "two-way" | "joint";
  jointNote?: string;
  customer: string;
  customerDetail: string;
  revenue: string;
  why: string[];
};

const BLUEPRINTS: Blueprint[] = [
  {
    number: "1",
    title: "Telco-owned sovereign agent platform",
    tone: "lyzr",
    headerFrom: "#5B21B6",
    headerTo: "#7C3AED",
    lyzrRole: "Licenses and supports the agent platform",
    telcoRole: "Brands, operates and takes it to market",
    flow: "one-way",
    customer: "Enterprise customers",
    customerDetail: "Use the telco-branded agent platform",
    revenue:
      "Enterprise pays the telco; Lyzr earns an OEM or platform licence with usage-based upside.",
    why: [
      "The telco owns the customer relationship and brand.",
      "Enterprises get a trusted, sovereign agent platform.",
      "Lyzr provides the technology that powers it.",
    ],
  },
  {
    number: "2",
    title: "Telco-prime managed agent service",
    tone: "telco",
    headerFrom: "#1E3A8A",
    headerTo: "#2563EB",
    lyzrRole: "Implements, customizes and supports the platform",
    telcoRole: "Sells, contracts and manages the customer",
    flow: "two-way",
    customer: "Enterprise customers",
    customerDetail: "Consume a packaged, managed agent service",
    revenue: "Enterprise pays the telco; the telco pays Lyzr for platform, enablement and usage.",
    why: [
      "The telco owns the customer relationship and P&L.",
      "Lyzr delivers, operates and ensures success.",
      "Enterprises get a turnkey, managed solution.",
    ],
  },
  {
    number: "3",
    title: "Private agent platform & managed AI distribution",
    tone: "enterprise",
    headerFrom: "#3B0764",
    headerTo: "#4C1D95",
    lyzrRole: "Supplies the dedicated agent platform",
    telcoRole: "Packages infrastructure, security and operations",
    flow: "joint",
    jointNote: "Single-tenant or on-premises deployment inside the approved boundary.",
    customer: "Regulated customers",
    customerDetail: "Run agents in an isolated, locally operated environment",
    revenue:
      "Shared model: dedicated capacity and managed fees to the telco, deployment licence to Lyzr.",
    why: [
      "Meets government and regulated-sector isolation rules.",
      "Creates a focused sovereignty proposition.",
      "No horizontal platform launch required up front.",
    ],
  },
];

function ActorChip({ tone, label, role }: { tone: ToneName; label: string; role: string }) {
  const t = TONE[tone];
  return (
    <div
      className="flex-1 rounded-xl border px-4 py-3"
      style={{ borderColor: t.border, background: t.soft }}
    >
      <div className="flex items-center gap-2">
        {label === "Lyzr" ? (
          <LyzrGlyph size={18} color={t.ink} />
        ) : (
          <RadioTower size={18} color={t.ink} strokeWidth={1.8} />
        )}
        <span className="text-sm font-bold" style={{ color: t.ink }}>
          {label}
        </span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{role}</p>
    </div>
  );
}

function FlowGlyph({ kind, color }: { kind: Blueprint["flow"]; color: string }) {
  if (kind === "joint") return <span className="h-8 w-px" style={{ background: color }} />;
  return (
    <svg width="34" height="12" viewBox="0 0 34 12" fill="none" aria-hidden className="shrink-0">
      {kind === "two-way" ? <path d="M10 6 L2 6" stroke={color} strokeWidth="2" /> : null}
      {kind === "two-way" ? <path d="M8 2 L0 6 L8 10 Z" fill={color} /> : null}
      <path d="M24 6 H32" stroke={color} strokeWidth="2" />
      <path d="M26 2 L34 6 L26 10 Z" fill={color} />
      <path d="M8 6 H26" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DownArrow({ color }: { color: string }) {
  return (
    <svg width="12" height="26" viewBox="0 0 12 26" fill="none" aria-hidden className="my-2">
      <path d="M6 0 V16" stroke={color} strokeWidth="2" />
      <path d="M0 15 L6 25 L12 15 Z" fill={color} />
    </svg>
  );
}

/** The three partnership blueprints, side by side. */
export function BlueprintCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {BLUEPRINTS.map((model) => {
        const t = TONE[model.tone];
        return (
          <article
            key={model.number}
            className="flex flex-col overflow-hidden rounded-2xl border bg-white"
            style={{
              borderColor: t.border,
              boxShadow: "0 10px 30px -22px rgba(15, 23, 42, 0.4)",
            }}
          >
            <header
              className="flex items-center gap-3 px-5 py-4 text-white"
              style={{
                background: `linear-gradient(100deg, ${model.headerFrom}, ${model.headerTo})`,
              }}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-base font-bold">
                {model.number}
              </span>
              <h3 className="text-base leading-snug font-bold">{model.title}</h3>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="flex items-stretch gap-2">
                  <ActorChip tone="lyzr" label="Lyzr" role={model.lyzrRole} />
                  <div className="flex items-center">
                    <FlowGlyph kind={model.flow} color={t.line} />
                  </div>
                  <ActorChip tone="telco" label="Telco" role={model.telcoRole} />
                </div>
                <p
                  className="mt-3 min-h-8 text-center text-xs leading-4 font-medium"
                  style={{ color: t.ink }}
                >
                  {model.jointNote}
                </p>
                <div className="flex justify-center">
                  <DownArrow color={t.line} />
                </div>
                <div
                  className="rounded-xl border px-4 py-3 text-center"
                  style={{ borderColor: TONE.enterprise.border, background: TONE.enterprise.soft }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Building2 size={18} color={TONE.enterprise.line} strokeWidth={1.8} />
                    <span className="text-sm font-bold" style={{ color: TONE.enterprise.ink }}>
                      {model.customer}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-4 text-slate-600 lg:min-h-8">
                    {model.customerDetail}
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl border px-4 py-3"
                style={{ borderColor: t.border, background: t.soft }}
              >
                <div className="flex items-center gap-2">
                  <DollarSign size={16} color={t.line} />
                  <span className="text-sm font-bold" style={{ color: t.ink }}>
                    Revenue flow
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-4 text-slate-700 lg:min-h-12">
                  {model.revenue}
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">Why it works</p>
                <ul className="mt-3 space-y-2">
                  {model.why.map((reason) => (
                    <li
                      key={reason}
                      className="flex gap-2.5 text-xs leading-relaxed text-slate-700"
                    >
                      <span
                        aria-hidden
                        className="mt-px inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                        style={{ background: t.line }}
                      >
                        ✓
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Legend strip under the blueprints, mirroring the source diagram. */
export function BlueprintLegend({ className }: { className?: string }) {
  const entries: { tone: ToneName; icon: ReactNode; label: string; detail: string }[] = [
    {
      tone: "lyzr",
      icon: <LyzrGlyph size={20} />,
      label: "Lyzr",
      detail: "Provides the agent platform technology",
    },
    {
      tone: "telco",
      icon: <RadioTower size={20} color={TONE.telco.line} strokeWidth={1.8} />,
      label: "Telco",
      detail: "Owns the customer relationship and brand",
    },
    {
      tone: "enterprise",
      icon: <Building2 size={20} color={TONE.enterprise.line} strokeWidth={1.8} />,
      label: "Enterprise",
      detail: "Uses the solutions to drive business outcomes",
    },
    {
      tone: "lyzr",
      icon: <DollarSign size={20} color={TONE.lyzr.line} />,
      label: "Revenue flow",
      detail: "Indicates how money moves in each motion",
    },
  ];
  return (
    <div
      className={cn(
        "grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {entries.map((entry) => (
        <div key={entry.label} className="flex gap-3">
          <span
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: TONE[entry.tone].soft }}
          >
            {entry.icon}
          </span>
          <div>
            <p className="text-sm font-bold" style={{ color: TONE[entry.tone].ink }}>
              {entry.label}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{entry.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
