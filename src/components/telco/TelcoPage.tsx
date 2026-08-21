import { useEffect } from "react";

import {
  BlueprintCards,
  BlueprintLegend,
  BuildTable,
  ComparisonTable,
  LyzrGlyph,
  ServiceStack,
  ValueChain,
} from "./diagrams";
import {
  Body,
  ButtonLink,
  Card,
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
 * The partnership blueprint, told in the order the AgentBlocks page tells its
 * story: thesis, then proof, then the problem, then what the thing is made of,
 * then why it holds, then how to start, then the questions, then the session.
 */

const NAV = [
  { id: "production", label: "In production" },
  { id: "problem", label: "The problem" },
  { id: "service", label: "What's inside" },
  { id: "why", label: "Why Lyzr" },
  { id: "start", label: "Get started" },
  { id: "faq", label: "FAQ" },
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
            Telco Blueprint
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
          href="#session"
          className="inline-flex shrink-0 items-center rounded-[var(--st-radius-sm)] px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
        >
          Book the Phase 0 session
        </a>
      </Shell>
    </header>
  );
}

const HERO_POINTS = [
  "Sovereign deployment",
  "Telco brand, end to end",
  "Approved models and clouds",
  "Governed from day one",
];

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--ab-hero-bg)" }}
      />
      <Shell className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
        <Eyebrow>For telecom operators</Eyebrow>
        <h1
          className="mt-5 max-w-3xl text-[2rem] leading-[1.12] tracking-[-0.035em] text-balance sm:text-[2.6rem]"
          style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
        >
          Sell <span style={{ color: "var(--st-accent-ink)" }}>governed enterprise AI</span> as your
          own service, not someone else&rsquo;s.
        </h1>
        <Lede className="mt-5">
          Lyzr supplies the platform. You keep the brand, the customer, the pricing and the
          sovereign operating policy.
        </Lede>
        <div className="mt-7 flex flex-wrap gap-2">
          {HERO_POINTS.map((point) => (
            <Pill key={point}>{point}</Pill>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#start">See the three partnership models</ButtonLink>
          <ButtonLink href="#problem" variant="outline">
            Why not build it yourself
          </ButtonLink>
        </div>

        <div className="mt-12">
          <ValueChain />
        </div>
        <p className="mt-5 text-[13px]" style={{ color: "var(--st-text-faint)" }}>
          Lyzr provides the technology. The telco owns the market.
        </p>
      </Shell>
    </section>
  );
}

const PROOF_LOGOS = ["JPMorganChase", "WTW", "USA.gov", "Verifone", "KPMG"];

function InProduction() {
  return (
    <Section
      id="production"
      eyebrow="Agents in production"
      title="Already carrying regulated enterprises."
      lede="Sovereignty arguments are won on operating evidence, not architecture diagrams."
    >
      <div>
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
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
        <div>
          <Eyebrow>The reference that matters for an operator</Eyebrow>
          <h3
            className="mt-4 text-[1.6rem] leading-[1.2] text-balance"
            style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
          >
            A billion-dollar SaaS runs its agent platform on Lyzr — under its own brand.
          </h3>
          <Body className="mt-4">
            It is the same motion an operator is considering: a company with the engineers to build
            the layer itself licensed it instead, and shipped the product its customers were
            actually waiting for.
          </Body>
        </div>
        <Card>
          <div className="space-y-5">
            {[
              ["Customers see", "Their brand, their product, their workbench"],
              ["They keep", "The data model, the customer, the roadmap"],
              ["Lyzr provides", "The white-labeled build, governance and runtime"],
              ["It runs in", "Their cloud, and their customers' AWS, Azure or GCP"],
            ].map(([label, detail], index) => (
              <div
                key={label}
                className="border-t pt-5 first:border-t-0 first:pt-0"
                style={{ borderColor: "var(--ab-rule)" }}
              >
                <div className="flex items-baseline gap-3">
                  <Numeral value={index + 1} />
                  <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                    {label}
                  </p>
                </div>
                <Body className="mt-1.5">{detail}</Body>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title="The agents are the easy part."
      lede="The control point is the platform above them: where agents get built, approved, run and monitored. Your engineers could build it. The question is whether they should."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Heading3>You already own</Heading3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Enterprise accounts",
              "Government relationships",
              "Local data centres",
              "Network & security",
              "Identity & billing",
              "In-country operations",
              "Partner channels",
            ].map((asset) => (
              <Pill key={asset}>{asset}</Pill>
            ))}
          </div>
        </div>
        <div>
          <Heading3>You do not own</Heading3>
          <p
            className="mt-4 text-[1.0625rem] leading-snug"
            style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
          >
            The governed agent platform: builder, runtime, policy layer, lifecycle. Six pieces, and
            not one of them is what your customers buy.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <BuildTable />
      </div>

      <InkPanel className="mt-10">
        <Eyebrow onInk>The better roadmap</Eyebrow>
        <Display className="mt-3 max-w-2xl" onInk>
          Own the offer. License the platform underneath it.
        </Display>
        <Body className="mt-4 max-w-xl" onInk>
          Nothing you win an enterprise deal with is produced by writing an agent runtime.
        </Body>
      </InkPanel>
    </Section>
  );
}

function Service() {
  const capabilities: [string, string][] = [
    ["Agent builder", "Across approved models, tools and systems"],
    ["Governed runtime", "Production agents, running under policy"],
    ["Guardrails & evaluation", "Quality gates before a customer sees it"],
    ["Observability & audit", "Runs, cost, quality, evidence"],
    ["Blueprints & connectors", "Delivery that repeats instead of restarts"],
    ["Deployment control", "Your cloud, sovereign cloud or theirs"],
    ["Tenant admin & APIs", "Identity, security, billing, service management"],
    ["Enablement & L2/L3", "Reference architecture and support behind you"],
  ];

  return (
    <Section
      id="service"
      eyebrow="What's inside"
      title="Three bands. Only one of them is ours."
      lede="Nothing in your estate gets ripped out to make room for the platform layer."
    >
      <ServiceStack />

      <div className="mt-10">
        <Heading3>Inside the Lyzr band</Heading3>
        <div
          className="mt-6 grid gap-x-10 gap-y-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: "var(--ab-rule)" }}
        >
          {capabilities.map(([title, detail], index) => (
            <div key={title}>
              <Numeral value={index + 1} />
              <Heading3 className="mt-2">{title}</Heading3>
              <Body className="mt-1.5">{detail}</Body>
            </div>
          ))}
        </div>
        <Body className="mt-8 max-w-xl">
          Every claim here comes with a demo, an architecture document or a security response.
        </Body>
      </div>
    </Section>
  );
}

function Why() {
  const reasons: [string, string][] = [
    [
      "It ships as your service",
      "Your brand, tiers and contract. Lyzr appears in the agreement, not the product.",
    ],
    [
      "It does not displace your cloud partners",
      "Approved hyperscalers and models keep running underneath.",
    ],
    [
      "Sovereignty is defined, not asserted",
      "Seven boundaries, specified per deployment, before the word is used.",
    ],
    [
      "It runs where the regulator says",
      "Telco cloud, sovereign cloud, or single-tenant in the customer's.",
    ],
    [
      "You start at your own readiness",
      "Managed service, private deployment or full platform — same technology.",
    ],
    ["There is a way out", "Data, configurations and artifacts are exportable by contract."],
  ];
  const dimensions: [string, string][] = [
    ["Data", "Prompts, logs, embeddings stay in approved locations"],
    ["Operational", "Local teams run administration, incidents and recovery"],
    ["Model", "You and the customer set the approved catalogue"],
    ["Infrastructure", "Telco, sovereign, regional or customer-controlled"],
    ["Policy", "Access, guardrails, evaluation and routing governed locally"],
    ["Commercial", "You own the offer, the pricing and the channel"],
    ["Exit", "Data and agent assets leave under contractual terms"],
  ];

  return (
    <Section
      id="why"
      eyebrow="Why Lyzr"
      title="Built for sovereignty. Built against lock-in."
      lede="Sovereignty is an operating outcome — architecture, governance and contracts. Residency alone is not it."
    >
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map(([title, detail]) => (
          <div key={title} className="border-t pt-6" style={{ borderColor: "var(--ab-rule)" }}>
            <h3
              className="text-[1.25rem] leading-tight text-balance"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {title}
            </h3>
            <Body className="mt-3">{detail}</Body>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <Heading3>The seven boundaries, defined per deployment</Heading3>
        <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map(([name, detail], index) => (
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
      </div>
    </Section>
  );
}

function Ownership() {
  const columns: [string, string[]][] = [
    [
      "You own",
      [
        "Brand & offer",
        "Pricing & contracts",
        "Deployment boundary",
        "Model catalogue",
        "L1 & customer success",
      ],
    ],
    [
      "Lyzr owns",
      [
        "Platform IP & roadmap",
        "Builder & runtime",
        "Governance layer",
        "Upgrades",
        "L2/L3 support",
      ],
    ],
    [
      "The customer controls",
      ["Their data & credentials", "Permissions", "Agent behaviour approval", "Portability rights"],
    ],
    [
      "Held jointly",
      [
        "Lighthouse selection",
        "Service levels",
        "Security reviews",
        "Blueprints & GTM",
        "Expansion calls",
      ],
    ],
  ];
  return (
    <Section
      eyebrow="Ownership"
      title="Who owns what."
      lede="Platform ownership and market-facing product ownership are separate. That is what makes it durable."
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {columns.map(([who, items]) => (
          <div key={who} className="border-t pt-5" style={{ borderColor: "var(--ab-rule)" }}>
            <Heading3>{who}</Heading3>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function GetStarted() {
  const phases: [string, string, string[]][] = [
    [
      "Phase 0",
      "Partnership design",
      [
        "Boundary, model catalogue, sovereignty rules",
        "Model and commercial mechanism",
        "Two or three lighthouse use cases",
      ],
    ],
    [
      "Phase 1",
      "Lighthouse deployment",
      [
        "Controlled environment in agreed infrastructure",
        "Identity, models, priority systems wired in",
        "Production agents, measured",
      ],
    ],
    [
      "Phase 2",
      "Commercial launch",
      [
        "Branded packages, pricing, SLAs",
        "Sellers and support trained",
        "Repeatable horizontal and industry offers",
      ],
    ],
    [
      "Phase 3",
      "Platform expansion",
      [
        "More models, connectors, solution packs",
        "SMB, public-sector and developer channels",
        "Marketplace economics when supply repeats",
      ],
    ],
  ];
  const lighthouses: [string, string][] = [
    ["Customer operations", "Service, sales and retention agents on your contact-centre stack"],
    ["Enterprise productivity", "Knowledge, service-desk and workflow agents on approved data"],
    ["Telco operations", "Network, field-service and assurance agents, proved on your own work"],
    ["Regulated workflows", "Auditable agents for government, finance and healthcare"],
  ];
  const terms: [string, string][] = [
    ["Model 1", "OEM licence, minimum commitment, usage tiers, optional marketplace"],
    ["Model 2", "Subscription, implementation and enablement, managed-service economics"],
    ["Model 3", "Deployment licence, dedicated capacity, security and operations"],
  ];
  return (
    <Section
      id="start"
      eyebrow="Get started"
      title="Start where you are. We'll meet you there."
      lede="Three models, one principle: your brand, your customer, your economics. Model 1 is the destination, not the entry point."
    >
      <BlueprintCards />
      <BlueprintLegend className="mt-8" />

      <InkPanel className="mt-10">
        <Eyebrow onInk>Recommended progression</Eyebrow>
        <Display className="mt-3 max-w-2xl" onInk>
          Enter where you are ready. Consolidate later.
        </Display>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            ["Enter", "Model 2 or 3, on a defined boundary"],
            ["Prove", "Two or three lighthouses, measured"],
            ["Consolidate", "Your own sovereign platform"],
          ].map(([step, detail], index) => (
            <div
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
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--ab-ink-faint)" }}>
                {detail}
              </p>
            </div>
          ))}
        </div>
      </InkPanel>

      <div className="mt-14">
        <Heading3>The phases behind whichever model you pick</Heading3>
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {phases.map(([phase, name, items], index) => (
            <div key={phase} className="border-t pt-5" style={{ borderColor: "var(--ab-rule)" }}>
              <div className="flex items-baseline gap-3">
                <Numeral value={index} />
                <p
                  className="text-[11px] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--st-text-faint)" }}
                >
                  {phase}
                </p>
              </div>
              <h3
                className="mt-2 text-[1.125rem] leading-tight"
                style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
              >
                {name}
              </h3>
              <RuleList className="mt-3" items={items} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <Heading3>What to launch first</Heading3>
          <div className="mt-4 border-t" style={{ borderColor: "var(--ab-rule)" }}>
            {lighthouses.map(([name, detail], index) => (
              <div key={name} className="border-b py-3" style={{ borderColor: "var(--ab-rule)" }}>
                <div className="flex items-baseline gap-3">
                  <Numeral value={index + 1} />
                  <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                    {name}
                  </p>
                </div>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--st-text-faint)" }}
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Heading3>How the commercials follow</Heading3>
          <div className="mt-4 border-t" style={{ borderColor: "var(--ab-rule)" }}>
            {terms.map(([model, detail], index) => (
              <div key={model} className="border-b py-3" style={{ borderColor: "var(--ab-rule)" }}>
                <div className="flex items-baseline gap-3">
                  <Numeral value={index + 1} />
                  <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                    {model}
                  </p>
                </div>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--st-text-faint)" }}
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>
          <Body className="mt-5">
            Standard editions, blueprints and support boundaries are what stop every customer
            becoming a bespoke project.
          </Body>
        </div>
      </div>
    </Section>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does this replace our hyperscaler partnerships?",
    a: "No. Approved hyperscalers, models and local infrastructure keep running underneath. Lyzr is the product and policy layer across them — the part that makes them sellable under your brand.",
  },
  {
    q: "Is 'sovereign' just data residency?",
    a: "No. Residency is one of seven boundaries — data, operational, model, infrastructure, policy, commercial and exit. A customer's risk team will test all seven.",
  },
  {
    q: "Can we govern agents we already built?",
    a: "Yes, and that is usually where value shows first. Agents built elsewhere are registered, evaluated, versioned and observed inside the same policy layer.",
  },
  {
    q: "Who runs it in production?",
    a: "You own L1 and the customer. Lyzr provides platform engineering, upgrades and L2/L3 behind you, under agreed SLAs — published in the agreement, not discovered in the first outage.",
  },
  {
    q: "Will every customer become a bespoke project?",
    a: "Only if the offer is designed that way. Standard editions, blueprints, connectors and support boundaries are set in Phase 0, not retrofitted after the third custom build.",
  },
  {
    q: "What if we want to leave?",
    a: "Data, agent configurations, local IP and exit rights are explicit in the contract. The reason to stay should be that it works.",
  },
];

function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="The questions we expect you to ask."
      lede="The first hour with a strategy, security or commercial team goes here."
    >
      <div className="border-t" style={{ borderColor: "var(--ab-rule)" }}>
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group border-b"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <summary className="marker:content-none flex cursor-pointer list-none items-baseline justify-between gap-6 py-5">
              <span
                className="text-[15px] leading-snug"
                style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
              >
                {item.q}
              </span>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-xs transition-transform group-open:rotate-180"
                style={{ color: "var(--st-text-faint)" }}
              >
                ▾
              </span>
            </summary>
            <Body className="max-w-3xl pb-6">{item.a}</Body>
          </details>
        ))}
      </div>

      <div className="mt-14">
        <Heading3>The four routes you are choosing between</Heading3>
        <div className="mt-6">
          <ComparisonTable />
        </div>
      </div>
    </Section>
  );
}

const AGENDA: [string, string][] = [
  ["Scope", "Target market, boundary, model catalogue"],
  ["Architecture", "What you keep, what we connect, where it deploys"],
  ["Commercials", "Model, licence, ownership split, SLA"],
  ["Launch plan", "Lighthouses, success criteria, owners, dates"],
];

function Session() {
  return (
    <section id="session" className="scroll-mt-20 pb-16 sm:pb-20">
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
            Own the service. Skip the platform build underneath it.
          </Display>
          <Body className="mt-4 max-w-xl" onInk>
            One working session, not a proposal. Bring your architecture and two or three candidate
            accounts; leave with a plan.
          </Body>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="mailto:partnerships@lyzr.ai?subject=Telco%20sovereign%20agent%20platform%20partnership"
              variant="on-ink"
            >
              Book the Phase 0 session
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
              Telco Blueprint
            </span>
            <span className="text-xs" style={{ color: "var(--st-text-muted)" }}>
              by Lyzr
            </span>
          </p>
          <p
            className="mt-2 max-w-md text-xs leading-relaxed"
            style={{ color: "var(--st-text-faint)" }}
          >
            Sovereign agent infrastructure for telecom operators. Partner discussion document,
            non-binding.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV.map((item) => (
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
        <InProduction />
        <Problem />
        <Service />
        <Why />
        <Ownership />
        <GetStarted />
        <Faq />
      </main>
      <Session />
      <Footer />
    </div>
  );
}
