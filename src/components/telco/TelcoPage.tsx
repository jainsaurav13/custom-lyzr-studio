import { useEffect } from "react";

import {
  BlueprintCards,
  BuildTable,
  ComparisonTable,
  Ecosystem,
  LyzrGlyph,
  RevenueModel,
} from "./diagrams";
import {
  Body,
  ButtonLink,
  Display,
  Eyebrow,
  Heading3,
  InkPanel,
  Lede,
  Numeral,
  PAGE_BG,
  PAGE_VARS,
  Pill,
  RuleList,
  Section,
  Shell,
} from "./ui";

/**
 * The telco's new business is the product on this page; Lyzr is how it gets
 * launched. Detail that only matters once the conversation is real — the
 * partnership models in full, the route comparison, the objections — sits in
 * the appendix rather than in the argument.
 */

const NAV = [
  { id: "why-telcos", label: "Why telcos" },
  { id: "catalogue", label: "What you sell" },
  { id: "revenue", label: "Revenue model" },
  { id: "why-lyzr", label: "Why Lyzr" },
  { id: "sovereignty", label: "Sovereignty" },
  { id: "launch", label: "90-day launch" },
];

function Header() {
  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur"
      style={{
        borderColor: "var(--ab-rule)",
        background: "color-mix(in srgb, var(--st-bg) 82%, transparent)",
      }}
    >
      <Shell className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex shrink-0 items-baseline gap-2">
          <span
            className="text-[15px] font-semibold tracking-[-0.02em]"
            style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
          >
            Sovereign AI for telcos
          </span>
          <span className="text-xs" style={{ color: "var(--st-text-muted)" }}>
            by Lyzr
          </span>
        </a>
        <nav className="hidden items-center gap-7 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm whitespace-nowrap transition-opacity hover:opacity-70"
              style={{ color: "var(--st-text-muted)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#launch-session"
          className="inline-flex shrink-0 items-center rounded-[var(--st-radius-sm)] px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
        >
          Design your launch
        </a>
      </Shell>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--ab-hero-bg)" }}
      />
      <Shell className="relative pt-16 pb-14 sm:pt-24 sm:pb-18">
        <Eyebrow>For telecom operators</Eyebrow>
        <h1
          className="mt-5 max-w-3xl text-[2rem] leading-[1.12] tracking-[-0.035em] text-balance sm:text-[2.6rem]"
          style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
        >
          Launch your country&rsquo;s{" "}
          <span style={{ color: "var(--st-accent-ink)" }}>sovereign AI platform</span>.
        </h1>
        <Lede className="mt-5">
          Offer enterprises, government and SMBs a locally governed platform for building AI agents
          and consuming approved AI models — under your brand, on infrastructure you control.
        </Lede>
        <div className="mt-7 flex flex-wrap gap-2">
          {["Your brand", "Your infrastructure", "Approved models", "Local policy"].map((point) => (
            <Pill key={point}>{point}</Pill>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#launch-session">Design your 90-day launch</ButtonLink>
          <ButtonLink href="#revenue" variant="outline">
            See the revenue model
          </ButtonLink>
        </div>

        <div className="mt-12">
          <Ecosystem />
        </div>
      </Shell>
    </section>
  );
}

function WhyTelcos() {
  const reasons: [string, string][] = [
    [
      "A revenue layer above connectivity",
      "Platform, inference, managed services and industry solutions — billed by you, not resold for someone else.",
    ],
    [
      "Control of the market's AI layer",
      "Whoever owns where agents are built and approved owns the enterprise relationship above the network.",
    ],
    [
      "National relevance",
      "Regulated and public-sector buyers need an in-country provider they can name in a procurement document.",
    ],
    [
      "Accounts that stop churning",
      "Connectivity is replaceable in a quarter. A governed platform holding their agents and data is not.",
    ],
  ];
  return (
    <Section
      id="why-telcos"
      eyebrow="Why telcos should own this market"
      title="No one else in the market can offer all four."
      lede="Enterprise relationships, in-country infrastructure, regulated-sector trust, and the ability to bill and support a service. The platform is the only missing piece."
      rule={false}
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {reasons.map(([title, detail], index) => (
          <div key={title} className="border-t pt-5" style={{ borderColor: "var(--ab-rule)" }}>
            <Numeral value={index + 1} />
            <h3
              className="mt-2 text-[1.125rem] leading-tight text-balance"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {title}
            </h3>
            <Body className="mt-2">{detail}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Catalogue() {
  const products: { name: string; line: string; items: string[]; buyer: string }[] = [
    {
      name: "Agent platform",
      line: "Build, govern and run agents",
      items: [
        "Builder, orchestration and governed runtime",
        "Guardrails, evaluation, observability, audit",
        "Governs agents their teams already built",
      ],
      buyer: "Enterprise and government",
    },
    {
      name: "Sovereign inference",
      line: "Model access you meter",
      items: [
        "Model APIs and private endpoints on your gateway",
        "Local and open model hosting alongside commercial models",
        "Per-tenant metering, quotas and cost control",
      ],
      buyer: "Every segment",
    },
    {
      name: "Packaged industry agents",
      line: "Solutions, not a toolkit",
      items: [
        "Prebuilt agents per sector, sold as a subscription",
        "Consumption pricing that starts small",
        "Self-serve onboarding through your existing channels",
      ],
      buyer: "SMB and mid-market",
    },
  ];
  return (
    <Section
      id="catalogue"
      eyebrow="What your customers can buy"
      title="Three products, one platform, one bill."
      lede="The same deployment serves a ministry, a bank and a thousand small businesses — at different price points and different levels of hand-holding."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={product.name}
            className="flex flex-col rounded-[var(--st-radius)] border p-6"
            style={{
              borderColor: "var(--st-border)",
              background: "var(--st-surface-2)",
              boxShadow: "var(--st-shadow)",
            }}
          >
            <div className="flex items-baseline gap-3">
              <Numeral value={index + 1} />
              <span className="text-[11px]" style={{ color: "var(--st-text-faint)" }}>
                {product.buyer}
              </span>
            </div>
            <h3
              className="mt-3 text-[1.375rem] leading-tight"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {product.name}
            </h3>
            <p className="mt-1 text-[13px]" style={{ color: "var(--st-accent-ink)" }}>
              {product.line}
            </p>
            <RuleList className="mt-4" items={product.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Revenue() {
  return (
    <Section
      id="revenue"
      eyebrow="Telco revenue model"
      title="Five lines you bill against."
      lede="Platform and inference recur. Services and solutions carry margin. Infrastructure gets pulled through by all of them."
    >
      <RevenueModel />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div>
          <Heading3>How it compounds</Heading3>
          <Body className="mt-3">
            One lighthouse account buys a subscription and a managed service. Its agents then meter
            inference every day they run, and the workloads land on your infrastructure. The
            packaged agents built for it become the SMB catalogue.
          </Body>
        </div>
        <div>
          <Heading3>What the mix depends on</Heading3>
          <Body className="mt-3">
            Which partnership model you enter through, how much delivery you keep in house, and
            whether inference runs on local models or approved commercial ones. The appendix has the
            three models and their economics.
          </Body>
        </div>
      </div>
    </Section>
  );
}

function WhyLyzr() {
  const reasons: [string, string][] = [
    [
      "It ships as your service",
      "Your brand, your tiers, your contract. Lyzr appears in the partnership agreement, not in the product.",
    ],
    [
      "It sits alongside your cloud partners",
      "Approved hyperscalers, model providers and local infrastructure keep running underneath, and keep earning.",
    ],
    [
      "Sovereignty is defined, not asserted",
      "Seven boundaries, specified per deployment, before anyone puts the word in a proposal.",
    ],
    [
      "There is a way out",
      "Data, agent configurations and artifacts are exportable by contract. The reason to stay should be that it works.",
    ],
  ];
  return (
    <Section
      id="why-lyzr"
      eyebrow="Why Lyzr"
      title="The fastest way to have a platform, not a platform programme."
      lede="Six pieces stand between an operator and this business. None of them are what customers choose you for."
    >
      <BuildTable />
      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {reasons.map(([title, detail]) => (
          <div key={title} className="border-t pt-5" style={{ borderColor: "var(--ab-rule)" }}>
            <h3
              className="text-[1.125rem] leading-tight text-balance"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {title}
            </h3>
            <Body className="mt-2">{detail}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Sovereignty() {
  const boundaries: [string, string][] = [
    ["Data", "Prompts, logs and embeddings stay in approved locations"],
    ["Operational", "Local teams run administration, incidents and recovery"],
    ["Model", "You and the customer set the approved catalogue"],
    ["Infrastructure", "Telco, sovereign, regional or customer-controlled"],
    ["Policy", "Access, guardrails, evaluation and routing governed locally"],
    ["Commercial", "You own the offer, the pricing and the channel"],
    ["Exit", "Data and agent assets leave under contractual terms"],
  ];
  const deployments: [string, string][] = [
    ["Your cloud", "Operated by your teams, in country"],
    ["Sovereign or regional cloud", "Approved providers under local rules"],
    ["Customer-controlled", "Their AWS, Azure or GCP account"],
    ["Single-tenant on-premises", "Air-gapped or isolated, for defence and government"],
  ];
  return (
    <Section
      id="sovereignty"
      eyebrow="Deployment and sovereignty controls"
      title="Sovereignty is an operating outcome, not a data centre location."
      lede="Residency is one boundary of seven. A customer's risk team will test all of them."
    >
      <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {boundaries.map(([name, detail], index) => (
          <div key={name} className="border-t pt-4" style={{ borderColor: "var(--ab-rule)" }}>
            <div className="flex items-baseline gap-3">
              <Numeral value={index + 1} />
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--st-text)", fontFamily: "var(--st-font-head)" }}
              >
                {name}
              </p>
            </div>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--st-text-faint)" }}>
              {detail}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Heading3>Where a given customer&rsquo;s deployment can sit</Heading3>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
          {deployments.map(([name, detail]) => (
            <div key={name} className="max-w-[220px]">
              <p className="text-[13px] font-semibold" style={{ color: "var(--st-text)" }}>
                {name}
              </p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--st-text-faint)" }}>
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Launch() {
  const plan: [string, string, string][] = [
    ["Days 0–15", "Design", "Boundary, model catalogue, first two use cases, commercial shape."],
    [
      "Days 15–45",
      "Deploy",
      "Environment stood up in your infrastructure; identity, models and priority systems connected.",
    ],
    [
      "Days 45–75",
      "Go live",
      "Lighthouse agents in production with real users, measured against the criteria you set.",
    ],
    [
      "Days 75–90",
      "Package",
      "Branded tiers, pricing and SLAs; sellers and support trained; the offer ready to repeat.",
    ],
  ];
  return (
    <Section
      id="launch"
      eyebrow="90-day lighthouse launch"
      title="A customer using it in ninety days."
      lede="Not a pilot that ends in a report. A production deployment, a live account and a packaged offer to sell next."
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {plan.map(([window, name, detail], index) => (
          <div key={window} className="border-t pt-5" style={{ borderColor: "var(--ab-rule)" }}>
            <div className="flex items-baseline gap-3">
              <Numeral value={index + 1} />
              <p
                className="text-[11px] font-semibold tracking-[0.16em] uppercase"
                style={{ color: "var(--st-text-faint)" }}
              >
                {window}
              </p>
            </div>
            <h3
              className="mt-2 text-[1.125rem] leading-tight"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {name}
            </h3>
            <Body className="mt-2">{detail}</Body>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Heading3>Three ways to enter</Heading3>
        <div className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {[
            [
              "Own the platform",
              "You license and operate it. The destination, and the biggest lift.",
            ],
            [
              "Prime a managed service",
              "You sell and hold the customer; Lyzr delivers behind you. Fastest to revenue.",
            ],
            [
              "Private deployment",
              "A dedicated environment for one regulated customer. Narrow and fast.",
            ],
          ].map(([name, detail], index) => (
            <div key={name} className="border-t pt-4" style={{ borderColor: "var(--ab-rule)" }}>
              <div className="flex items-baseline gap-3">
                <Numeral value={index + 1} />
                <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                  {name}
                </p>
              </div>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--st-text-faint)" }}>
                {detail}
              </p>
            </div>
          ))}
        </div>
        <Body className="mt-4">
          Full mechanics, ownership split and economics for each are in the appendix.
        </Body>
      </div>
    </Section>
  );
}

const PROOF_LOGOS = ["JPMorganChase", "WTW", "USA.gov", "Verifone", "KPMG"];

function Evidence() {
  return (
    <Section
      id="evidence"
      eyebrow="Evidence and precedents"
      title="The platform is already carrying regulated workloads."
      lede="Ask for the architecture document, the security response and a reference call on any claim here."
    >
      <p
        className="text-[10px] font-semibold tracking-[0.16em] uppercase"
        style={{ color: "var(--st-text-faint)" }}
      >
        Running on Lyzr underneath
      </p>
      <ul
        className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-4 border-y py-5"
        style={{ borderColor: "var(--ab-rule)" }}
      >
        {PROOF_LOGOS.map((name) => (
          <li
            key={name}
            className="text-base font-semibold tracking-[-0.01em]"
            style={{ color: "var(--st-text-muted)", fontFamily: "var(--st-font-head)" }}
          >
            {name}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div>
          <Eyebrow>The closest precedent</Eyebrow>
          <h3
            className="mt-3 text-[1.375rem] leading-[1.2] text-balance"
            style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
          >
            A billion-dollar SaaS runs its agent platform on Lyzr — under its own brand.
          </h3>
          <Body className="mt-4">
            They had the engineers to build the layer themselves. They licensed it and shipped the
            product instead. Same motion an operator would run, one segment over.
          </Body>
        </div>
        <div
          className="border-t pt-5 lg:border-t-0 lg:pt-0"
          style={{ borderColor: "var(--ab-rule)" }}
        >
          <div className="space-y-4">
            {[
              ["Customers see", "Their brand, their product, their workbench"],
              ["They keep", "The data model, the customer, the roadmap"],
              ["Lyzr provides", "The white-labeled build, governance and runtime"],
              ["It runs in", "Their cloud, and their customers' AWS, Azure or GCP"],
            ].map(([label, detail]) => (
              <div
                key={label}
                className="grid gap-1 border-t pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-4"
                style={{ borderColor: "var(--ab-rule)" }}
              >
                <p className="text-[13px] font-semibold" style={{ color: "var(--st-text)" }}>
                  {label}
                </p>
                <p className="text-[13px]" style={{ color: "var(--st-text-muted)" }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const AGENDA: [string, string][] = [
  ["Scope", "Segments, boundary, model catalogue"],
  ["Architecture", "What you keep, what we connect, where it deploys"],
  ["Commercials", "Entry model, licence, ownership split, SLA"],
  ["90-day plan", "Lighthouses, success criteria, owners, dates"],
];

function LaunchSession() {
  return (
    <section id="launch-session" className="scroll-mt-20 pb-14 sm:pb-18">
      <Shell>
        <InkPanel>
          <div className="flex items-center gap-3">
            <LyzrGlyph size={22} color="var(--ab-accent-on-ink)" />
            <span
              className="text-[11px] font-semibold tracking-[0.16em] uppercase"
              style={{ color: "var(--ab-accent-on-ink)" }}
            >
              Next step
            </span>
          </div>
          <Display className="mt-5 max-w-2xl" onInk>
            Design your 90-day sovereign AI launch.
          </Display>
          <Body className="mt-4 max-w-xl" onInk>
            One working session. Bring your architecture and two candidate accounts; leave with a
            plan, an entry model and a date.
          </Body>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="mailto:partnerships@lyzr.ai?subject=Sovereign%20AI%20platform%20for%20telcos"
              variant="on-ink"
            >
              Book the session
            </ButtonLink>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-[var(--st-radius-sm)] border px-5 py-3 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ borderColor: "var(--ab-ink-border)", color: "var(--ab-ink-text)" }}
            >
              See the platform in your brand
            </a>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AGENDA.map(([step, detail], index) => (
              <li
                key={step}
                className="border-t pt-4"
                style={{ borderColor: "var(--ab-ink-border)" }}
              >
                <Numeral value={index + 1} onInk />
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: "var(--ab-ink-text)", fontFamily: "var(--st-font-head)" }}
                >
                  {step}
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--ab-ink-faint)" }}
                >
                  {detail}
                </p>
              </li>
            ))}
          </ul>
        </InkPanel>
      </Shell>
    </section>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does this replace our hyperscaler partnerships?",
    a: "No. Approved hyperscalers, models and local infrastructure keep running underneath and keep earning. Lyzr is the product and policy layer that makes them sellable under your brand.",
  },
  {
    q: "Is 'sovereign' just data residency?",
    a: "No. Residency is one of seven boundaries — data, operational, model, infrastructure, policy, commercial and exit. All seven get specified per deployment.",
  },
  {
    q: "Can we govern agents our teams already built?",
    a: "Yes. Agents built elsewhere are registered, evaluated, versioned and observed inside the same policy layer as ones built in the builder.",
  },
  {
    q: "Who runs it in production?",
    a: "You own L1 and the customer. Lyzr provides platform engineering, upgrades and L2/L3 behind you, under SLAs published in the agreement.",
  },
  {
    q: "How do SMBs reach it without a sales team?",
    a: "Through packaged agents on consumption pricing, sold in your existing SMB channels with self-serve onboarding. The same platform, without the implementation project.",
  },
  {
    q: "Will every customer become a bespoke project?",
    a: "Only if the offer is designed that way. Standard tiers, blueprints and support boundaries are set in the design session, not retrofitted later.",
  },
];

function Appendix() {
  return (
    <Section
      id="appendix"
      eyebrow="Appendix"
      title="The detail behind the offer."
      lede="For the second conversation: the three entry models in full, the alternatives, and the questions your teams will raise."
    >
      <details className="group">
        <summary
          className="marker:content-none flex cursor-pointer list-none items-baseline justify-between gap-6 border-t py-4"
          style={{ borderColor: "var(--ab-rule)" }}
        >
          <span
            className="text-[15px]"
            style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
          >
            The three entry models, in full
          </span>
          <span
            aria-hidden
            className="text-xs transition-transform group-open:rotate-180"
            style={{ color: "var(--st-text-faint)" }}
          >
            ▾
          </span>
        </summary>
        <div className="pt-4 pb-10">
          <BlueprintCards />
        </div>
      </details>

      <details className="group">
        <summary
          className="marker:content-none flex cursor-pointer list-none items-baseline justify-between gap-6 border-t py-4"
          style={{ borderColor: "var(--ab-rule)" }}
        >
          <span
            className="text-[15px]"
            style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
          >
            The four routes you are choosing between
          </span>
          <span
            aria-hidden
            className="text-xs transition-transform group-open:rotate-180"
            style={{ color: "var(--st-text-faint)" }}
          >
            ▾
          </span>
        </summary>
        <div className="pt-4 pb-10">
          <ComparisonTable />
        </div>
      </details>

      {FAQS.map((item) => (
        <details key={item.q} className="group">
          <summary
            className="marker:content-none flex cursor-pointer list-none items-baseline justify-between gap-6 border-t py-4"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <span
              className="text-[15px]"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {item.q}
            </span>
            <span
              aria-hidden
              className="text-xs transition-transform group-open:rotate-180"
              style={{ color: "var(--st-text-faint)" }}
            >
              ▾
            </span>
          </summary>
          <Body className="max-w-3xl pb-5">{item.a}</Body>
        </details>
      ))}
      <div className="border-t" style={{ borderColor: "var(--ab-rule)" }} />
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: "var(--ab-rule)" }}>
      <Shell className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-baseline gap-2">
            <span
              className="text-[15px] font-semibold tracking-[-0.02em]"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              Sovereign AI for telcos
            </span>
            <span className="text-xs" style={{ color: "var(--st-text-muted)" }}>
              by Lyzr
            </span>
          </p>
          <p
            className="mt-2 max-w-md text-xs leading-relaxed"
            style={{ color: "var(--st-text-faint)" }}
          >
            Partner discussion document, non-binding, tailored per operator.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            ...NAV,
            { id: "evidence", label: "Evidence" },
            { id: "appendix", label: "Appendix" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: "var(--st-text-muted)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Shell>
    </footer>
  );
}

export function TelcoPage() {
  // The studio boots dark; this document is a light page, so the overscroll
  // area has to be repainted or it flashes near-black on either side of it.
  useEffect(() => {
    const root = document.documentElement;
    const previous = { html: root.style.background, body: document.body.style.background };
    root.style.background = PAGE_BG;
    document.body.style.background = PAGE_BG;
    return () => {
      root.style.background = previous.html;
      document.body.style.background = previous.body;
    };
  }, []);

  return (
    <div
      className="min-h-screen antialiased [color-scheme:light]"
      style={{
        ...PAGE_VARS,
        fontFamily: "var(--st-font-body)",
        background: "var(--st-bg)",
        color: "var(--st-text)",
      }}
    >
      <Header />
      <Hero />
      <main>
        <WhyTelcos />
        <Catalogue />
        <Revenue />
        <WhyLyzr />
        <Sovereignty />
        <Launch />
        <Evidence />
      </main>
      <LaunchSession />
      <Appendix />
      <Footer />
    </div>
  );
}
