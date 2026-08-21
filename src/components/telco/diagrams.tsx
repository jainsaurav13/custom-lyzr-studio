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

/* ------------------------------------------------------------------ *
 * The ecosystem: what feeds the platform, who buys from it, what it earns.
 * ------------------------------------------------------------------ */

const INPUTS: [string, string][] = [
  ["Approved AI models", "Local · open · commercial"],
  ["Your infrastructure", "Cloud · data centres · network"],
  ["Lyzr platform", "Agent builder · inference gateway · governance"],
];

const BUYERS: [string, string][] = [
  ["Government", "Auditable agents inside the national boundary"],
  ["Enterprises", "Agents and model access across their own systems"],
  ["SMBs", "Packaged agents on consumption pricing"],
];

const STREAMS = [
  "Platform subscriptions",
  "Inference consumption",
  "Managed services",
  "Industry solutions",
  "Infrastructure and network",
];

function Feed({ label, detail }: { label: string; detail: string }) {
  return (
    <div
      className="rounded-[var(--st-radius-sm)] border px-4 py-3"
      style={{ borderColor: "var(--st-border)", background: "var(--st-surface-2)" }}
    >
      <p className="text-[13px] font-semibold" style={{ color: "var(--st-text)" }}>
        {label}
      </p>
      <p className="mt-0.5 text-xs" style={{ color: "var(--st-text-faint)" }}>
        {detail}
      </p>
    </div>
  );
}

/** One picture of the business: inputs, the branded platform, buyers, revenue. */
export function Ecosystem() {
  return (
    <div
      className="rounded-[var(--st-radius-lg)] border p-6 sm:p-8"
      style={{
        borderColor: "var(--st-border)",
        background: "var(--st-surface)",
        boxShadow: "var(--st-shadow)",
      }}
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
        <div className="space-y-3">
          <p
            className="text-[10px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "var(--st-text-faint)" }}
          >
            Runs on
          </p>
          {INPUTS.map(([label, detail]) => (
            <Feed key={label} label={label} detail={detail} />
          ))}
        </div>

        <Connector />

        <div
          className="rounded-[var(--st-radius)] px-6 py-8 text-center"
          style={{ background: "var(--ab-ink)", color: "var(--ab-ink-text)" }}
        >
          <LyzrGlyph size={26} color="var(--ab-accent-on-ink)" />
          <p
            className="mt-4 text-[13px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: "var(--ab-accent-on-ink)" }}
          >
            Your brand
          </p>
          <p
            className="mt-2 text-[1.375rem] leading-tight"
            style={{ fontFamily: "var(--ab-serif)" }}
          >
            Sovereign AI platform
          </p>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: "var(--ab-ink-faint)" }}>
            Agents, model access and governance, operated in country
          </p>
        </div>

        <Connector />

        <div className="space-y-3">
          <p
            className="text-[10px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "var(--st-text-faint)" }}
          >
            Sold to
          </p>
          {BUYERS.map(([label, detail]) => (
            <Feed key={label} label={label} detail={detail} />
          ))}
        </div>
      </div>

      <div
        className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6"
        style={{ borderColor: "var(--ab-rule)" }}
      >
        <p
          className="text-[10px] font-semibold tracking-[0.16em] uppercase"
          style={{ color: "var(--st-accent-ink)" }}
        >
          You bill for
        </p>
        {STREAMS.map((stream) => (
          <span key={stream} className="text-[13px]" style={{ color: "var(--st-text-muted)" }}>
            {stream}
          </span>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <svg
      width="28"
      height="12"
      viewBox="0 0 28 12"
      fill="none"
      aria-hidden
      className="mx-auto my-2 rotate-90 lg:my-0 lg:rotate-0"
    >
      <path d="M0 6 H18" stroke="var(--st-accent)" strokeWidth="1.5" />
      <path d="M16 1.5 L28 6 L16 10.5 Z" fill="var(--st-accent)" />
    </svg>
  );
}

const REVENUE: { stream: string; meters: string; buyer: string }[] = [
  {
    stream: "Platform subscriptions",
    meters: "Tenants, seats, environments",
    buyer: "Enterprise and government",
  },
  {
    stream: "Inference consumption",
    meters: "Tokens and calls through your gateway",
    buyer: "Every customer, including SMB",
  },
  {
    stream: "Managed services",
    meters: "Implementation, operations, support tiers",
    buyer: "Enterprise and regulated accounts",
  },
  {
    stream: "Industry solutions",
    meters: "Packaged agents, per workflow or per site",
    buyer: "Sector customers and SMB",
  },
  {
    stream: "Infrastructure and network",
    meters: "Compute, hosting, connectivity, security",
    buyer: "Pulled through by the platform",
  },
];

/** The five lines a telco can bill against once it owns the platform. */
export function RevenueModel() {
  return (
    <div
      className="overflow-hidden rounded-[var(--st-radius)] border"
      style={{ borderColor: "var(--st-border)", background: "var(--st-surface-2)" }}
    >
      <div
        className="grid grid-cols-[1.1fr_1fr] gap-4 border-b px-6 py-3 sm:grid-cols-[1.1fr_1.2fr_1fr] sm:gap-8"
        style={{ borderColor: "var(--ab-rule)", background: "var(--ab-paper)" }}
      >
        {["Revenue stream", "What it meters", "Who buys"].map((head, index) => (
          <p
            key={head}
            className={cn(
              "text-[10px] font-semibold tracking-[0.16em] uppercase",
              index === 1 && "hidden sm:block",
            )}
            style={{ color: index === 0 ? "var(--st-accent-ink)" : "var(--st-text-faint)" }}
          >
            {head}
          </p>
        ))}
      </div>
      {REVENUE.map((row, index) => (
        <div
          key={row.stream}
          className="grid grid-cols-[1.1fr_1fr] items-baseline gap-4 border-b px-6 py-4 last:border-b-0 sm:grid-cols-[1.1fr_1.2fr_1fr] sm:gap-8"
          style={{ borderColor: "var(--ab-rule)" }}
        >
          <div className="flex items-baseline gap-3">
            <Numeral value={index + 1} />
            <p className="text-sm font-medium" style={{ color: "var(--st-text)" }}>
              {row.stream}
            </p>
          </div>
          <p className="hidden text-xs sm:block" style={{ color: "var(--st-text-faint)" }}>
            {row.meters}
          </p>
          <p className="text-xs" style={{ color: "var(--st-text-muted)" }}>
            {row.buyer}
          </p>
        </div>
      ))}
    </div>
  );
}
