import { useEffect } from "react";

import { BlueprintCards, BlueprintLegend, LyzrGlyph, ValueChain } from "./diagrams";
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

const NAV = [
  { id: "opportunity", label: "The opportunity" },
  { id: "models", label: "Three models" },
  { id: "platform", label: "What Lyzr provides" },
  { id: "sovereignty", label: "Sovereignty" },
  { id: "route-to-market", label: "Route to market" },
  { id: "commercial", label: "Commercial" },
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
              className="text-sm whitespace-nowrap transition-colors hover:opacity-70"
              style={{ color: "var(--st-text-muted)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#next-steps"
          className="inline-flex shrink-0 items-center rounded-[var(--st-radius-sm)] px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
        >
          Start Phase 0
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
          className="mt-6 max-w-4xl text-[2.1rem] leading-[1.1] tracking-[-0.03em] text-balance sm:text-[2.9rem]"
          style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
        >
          Become the provider of{" "}
          <span style={{ color: "var(--st-accent-ink)" }}>governed enterprise AI services</span>,
          not a distributor of someone else&rsquo;s.
        </h1>
        <Lede className="mt-6">
          Lyzr supplies the deployable agent platform and the operating enablement around it. The
          operator keeps the customer relationship, the brand, the commercial offer and the
          sovereign operating policy — and sells a service its market already trusts it to run.
        </Lede>
        <div className="mt-7 flex flex-wrap gap-2">
          {HERO_POINTS.map((point) => (
            <Pill key={point}>{point}</Pill>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#models">See the three partnership models</ButtonLink>
          <ButtonLink href="#route-to-market" variant="outline">
            Phased route to market
          </ButtonLink>
        </div>

        <div className="mt-14">
          <ValueChain />
        </div>
        <p className="mt-6 text-sm" style={{ color: "var(--st-text-faint)" }}>
          Lyzr provides the technology. The telco owns the market.
        </p>
      </Shell>
    </section>
  );
}

function Opportunity() {
  return (
    <Section
      id="opportunity"
      eyebrow="The opportunity"
      title="Connectivity and cloud are no longer the top of the stack."
      lede="Enterprise AI is creating a new control point above them: the platform through which organizations build, approve, run and monitor agents. If a hyperscaler or software vendor owns that layer outright, the operator keeps infrastructure and implementation revenue — but never the primary product relationship."
      rule={false}
    >
      <div className="grid gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
        <div>
          <Heading3>What the operator already owns</Heading3>
          <RuleList
            className="mt-4"
            items={[
              "Enterprise and public-sector customer relationships.",
              "Local data centres, cloud, edge, network and cybersecurity services.",
              "Identity, service management, billing and customer support.",
              "In-country operations and regulated-sector credibility.",
              "Partner, developer, system-integrator and SMB distribution channels.",
            ]}
          />
        </div>
        <Card>
          <Heading3>This is not cloud resale</Heading3>
          <Body className="mt-3">
            The telco becomes the market-facing provider of the service. Approved cloud, model and
            infrastructure partners keep operating underneath it.
          </Body>
          <div className="mt-6 space-y-4">
            {[
              { label: "The telco is the merchant", detail: "Brand, contract, pricing, support." },
              {
                label: "Lyzr is the platform",
                detail: "Builder, runtime, governance, enablement.",
              },
              {
                label: "Hyperscalers stay in place",
                detail: "Approved compute, models and infrastructure.",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="border-t pt-4 first:border-t-0 first:pt-0"
                style={{ borderColor: "var(--ab-rule)" }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                  {row.label}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--st-text-faint)" }}>
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Thesis() {
  const rows = [
    {
      who: "The telco",
      owns: "Brand, service tiers, pricing, target segments, the customer contract and the route to market.",
    },
    {
      who: "Lyzr",
      owns: "The reusable agent platform, reference architecture, platform lifecycle and advanced technical support.",
    },
    {
      who: "Approved partners",
      owns: "Hyperscalers, model providers and local infrastructure suppliers: compute, models and related services.",
    },
    {
      who: "The enterprise customer",
      owns: "Its own data, credentials, business policy and customer-specific agent assets.",
    },
  ];
  return (
    <Section
      eyebrow="Partnership thesis"
      title="Provider, not reseller."
      lede="The proposition is framed around telco product ownership, not vendor displacement. Lyzr complements the operator's existing cloud and model partnerships: it adds a deployable product and policy-enforcement layer across those approved environments rather than asking anyone to replace them."
    >
      <div className="border-t" style={{ borderColor: "var(--ab-rule)" }}>
        {rows.map((row, index) => (
          <div
            key={row.who}
            className="grid gap-2 border-b py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <div className="flex items-baseline gap-3">
              <Numeral value={index + 1} />
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--st-text)", fontFamily: "var(--st-font-head)" }}
              >
                {row.who}
              </p>
            </div>
            <Body>{row.owns}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Models() {
  return (
    <Section
      id="models"
      eyebrow="Three partnership models"
      title="Three ways to take sovereign enterprise AI agents to market."
      lede="Model 1 is the strategic destination. Model 2 is the fastest commercial entry. Model 3 addresses isolated, regulated environments. An operator can start with any of them — and should not be asked to start with all of them."
    >
      <BlueprintCards />
      <BlueprintLegend className="mt-10" />

      <InkPanel className="mt-12">
        <Eyebrow onInk>Recommended progression</Eyebrow>
        <Display className="mt-4 max-w-3xl" onInk>
          Enter where the operator is ready. Consolidate into the platform later.
        </Display>
        <Body className="mt-5 max-w-2xl" onInk>
          Model 1 should remain the destination, but imposing it as the only starting point stalls
          the conversation. Begin with Model 2, Model 3 or both, prove demand with lighthouse
          customers, then fold those offers into a telco-owned platform.
        </Body>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { step: "Enter", detail: "Model 2 or Model 3, on a defined deployment boundary." },
            { step: "Prove", detail: "Two or three lighthouse customers with measured outcomes." },
            { step: "Consolidate", detail: "A telco-owned, telco-branded sovereign platform." },
          ].map((phase, index) => (
            <div
              key={phase.step}
              className="border-t pt-4"
              style={{ borderColor: "var(--ab-ink-border)" }}
            >
              <Numeral value={index + 1} onInk />
              <p
                className="mt-2 text-sm font-semibold"
                style={{ color: "var(--ab-ink-text)", fontFamily: "var(--st-font-head)" }}
              >
                {phase.step}
              </p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--ab-ink-faint)" }}>
                {phase.detail}
              </p>
            </div>
          ))}
        </div>
      </InkPanel>
    </Section>
  );
}

function Platform() {
  const capabilities = [
    {
      title: "Agent building and orchestration",
      detail: "Across approved models, tools and enterprise systems.",
    },
    { title: "Governed runtime", detail: "Deploy and operate production agents under policy." },
    {
      title: "Guardrails and evaluation",
      detail: "Observability, auditability and policy enforcement as defaults.",
    },
    {
      title: "Reusable blueprints",
      detail: "Connectors and solution components that keep delivery repeatable.",
    },
    {
      title: "Deployment flexibility",
      detail: "Telco cloud, sovereign cloud, customer environments, approved hyperscalers.",
    },
    {
      title: "Tenant administration and APIs",
      detail: "Integration with identity, security, billing and service management.",
    },
    {
      title: "Enablement and support",
      detail: "Reference architecture, platform upgrades, and L2/L3 support behind the operator.",
    },
  ];
  return (
    <Section
      id="platform"
      eyebrow="What Lyzr provides"
      title="A deployable agent platform — not a model vendor, not a bespoke integrator."
      lede="Each claim below should be met with a product demonstration, an architecture document, a security response or customer evidence. The proposal becomes credible when the operating proof is as clear as the strategic narrative."
    >
      <div
        className="grid gap-x-10 gap-y-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: "var(--ab-rule)" }}
      >
        {capabilities.map((capability, index) => (
          <div key={capability.title}>
            <Numeral value={index + 1} />
            <Heading3 className="mt-2">{capability.title}</Heading3>
            <Body className="mt-1.5">{capability.detail}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Sovereignty() {
  const dimensions: [string, string][] = [
    [
      "Data",
      "Prompts, files, memory, logs, embeddings and metadata stay in approved locations under defined retention and access rules.",
    ],
    [
      "Operational",
      "Approved local teams control administration, incidents, support, change and recovery.",
    ],
    [
      "Model",
      "The operator and the customer decide which private, open, local or hyperscaler models may be used.",
    ],
    [
      "Infrastructure",
      "Workloads run on approved telco, sovereign-cloud, regional or customer-controlled infrastructure.",
    ],
    ["Policy", "Access, guardrails, evaluation, audit and routing rules are locally governed."],
    ["Commercial", "The telco owns the offer, the customer relationship, pricing and the channel."],
    [
      "Exit",
      "Customer data, agent configurations and agreed artifacts can be exported or moved under contractual terms.",
    ],
  ];
  return (
    <Section
      id="sovereignty"
      eyebrow="What sovereign actually means"
      title="Sovereignty is an operating outcome, produced by architecture, governance and contracts."
      lede="It is broader than data residency, and it does not require every component to be domestically developed. Use the word only once these seven boundaries are defined for the specific deployment."
    >
      <div className="border-t" style={{ borderColor: "var(--ab-rule)" }}>
        {dimensions.map(([name, detail], index) => (
          <div
            key={name}
            className="grid gap-2 border-b py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <div className="flex items-baseline gap-3">
              <Numeral value={index + 1} />
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--st-text)", fontFamily: "var(--st-font-head)" }}
              >
                {name} sovereignty
              </p>
            </div>
            <Body>{detail}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Ownership() {
  const columns: { who: string; items: string[] }[] = [
    {
      who: "The telecom operator owns",
      items: [
        "Customer relationship, brand, commercial offer, pricing, contracts and billing.",
        "Sovereign operating policy, approved deployment boundary and model catalogue.",
        "Enterprise channel, local partnerships, customer success and L1 service.",
        "Local infrastructure and security integration where the offer includes it.",
      ],
    },
    {
      who: "Lyzr owns",
      items: [
        "Core platform intellectual property and product roadmap.",
        "Agent builder, orchestration, runtime, governance and platform engineering.",
        "Reference architecture, platform enablement, upgrades and L2/L3 support.",
        "Standard reusable capabilities supplied under the partnership agreement.",
      ],
    },
    {
      who: "The enterprise customer controls",
      items: [
        "Business data, credentials, permissions, records and source-system access.",
        "Business policy and approval of production agent behaviour.",
        "Customer-specific agent assets and portability rights, as defined contractually.",
      ],
    },
    {
      who: "Held jointly",
      items: [
        "Lighthouse-account selection, solution design and launch planning.",
        "Service levels, incident response, security reviews and change governance.",
        "Local blueprints, connectors, marketplace terms and go-to-market enablement.",
        "Success measures, operating reviews and expansion decisions.",
      ],
    },
  ];
  return (
    <Section
      eyebrow="Ownership and operating model"
      title="Who owns what."
      lede="Separating platform ownership from market-facing product ownership is what makes this durable — for the operator, for Lyzr and for the customer's risk team."
    >
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
        {columns.map((column) => (
          <div key={column.who} className="border-t pt-6" style={{ borderColor: "var(--ab-rule)" }}>
            <Heading3>{column.who}</Heading3>
            <RuleList className="mt-4" items={column.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Architecture() {
  const layers: { name: string; detail: string; lyzr?: boolean }[] = [
    {
      name: "Customer and channel",
      detail:
        "Telco enterprise accounts, SMB channels, government relationships, partners and customer success.",
    },
    {
      name: "Branded service",
      detail: "Portal, solution catalogue, service tiers, commercial packaging and SLAs.",
    },
    {
      name: "Lyzr agent platform",
      detail:
        "Builder, orchestration, runtime, tools, memory, guardrails, evaluation, observability and governance.",
      lyzr: true,
    },
    {
      name: "Enterprise systems",
      detail: "Identity, business applications, data, permissions, knowledge and workflows.",
    },
    {
      name: "Model and compute",
      detail:
        "Approved private, open, local or hyperscaler models, on the selected infrastructure.",
    },
    {
      name: "Sovereign operations",
      detail: "IAM, SOC, audit, support, backup, disaster recovery, change and portability.",
    },
  ];
  return (
    <Section
      eyebrow="Reference service architecture"
      title="The service, explained as six layers."
      lede="Enterprise users and partners access the telco-branded service; the Lyzr platform governs agent execution; approved models, tools and enterprise data are used inside the agreed deployment boundary; the telco operates the customer service and the local policy."
    >
      <div
        className="overflow-hidden rounded-[var(--st-radius)] border"
        style={{ borderColor: "var(--st-border)" }}
      >
        {layers.map((layer, index) => (
          <div
            key={layer.name}
            className="flex flex-col gap-2 border-b px-6 py-5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-8"
            style={{
              borderColor: layer.lyzr ? "var(--ab-ink)" : "var(--ab-rule)",
              background: layer.lyzr ? "var(--ab-ink)" : "var(--st-surface-2)",
            }}
          >
            <div className="flex shrink-0 items-baseline gap-3 sm:w-64">
              <Numeral value={index + 1} onInk={layer.lyzr} />
              <p
                className="text-sm font-semibold"
                style={{
                  color: layer.lyzr ? "var(--ab-ink-text)" : "var(--st-text)",
                  fontFamily: "var(--st-font-head)",
                }}
              >
                {layer.name}
              </p>
            </div>
            <Body onInk={layer.lyzr}>{layer.detail}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function RouteToMarket() {
  const phases = [
    {
      phase: "Phase 0",
      name: "Partnership design",
      items: [
        "Agree the target market, deployment boundary, model catalogue and sovereignty requirements.",
        "Select the initial partnership model and the commercial mechanism.",
        "Choose two or three lighthouse use cases and define success criteria.",
        "Validate architecture, security, support and integration requirements.",
      ],
    },
    {
      phase: "Phase 1",
      name: "Lighthouse deployment",
      items: [
        "Deploy a controlled Lyzr environment in the agreed infrastructure.",
        "Integrate identity, models, priority systems, monitoring and service management.",
        "Launch production agents with selected internal or external customers.",
        "Measure reliability, adoption, time to deploy, customer value and operating effort.",
      ],
    },
    {
      phase: "Phase 2",
      name: "Commercial launch",
      items: [
        "Create telco-branded packages, pricing, contracts and service levels.",
        "Train enterprise sellers, solution engineers, support teams and delivery partners.",
        "Launch repeatable horizontal and industry-specific offers.",
        "Establish joint governance, customer-success and product-feedback processes.",
      ],
    },
    {
      phase: "Phase 3",
      name: "Platform expansion",
      items: [
        "Add models, connectors, solution packs, partners and regulated deployment patterns.",
        "Expand through enterprise, SMB, public-sector and developer channels.",
        "Introduce marketplace economics once supply and demand are repeatable.",
        "Progress toward Model 1 where the operator began at Model 2 or 3.",
      ],
    },
  ];
  return (
    <Section
      id="route-to-market"
      eyebrow="Phased route to market"
      title="From partnership design to platform expansion."
      lede="Each phase ends with evidence the next one can be argued from — not with a document."
    >
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {phases.map((phase, index) => (
          <div
            key={phase.phase}
            className="border-t pt-6"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <div className="flex items-baseline gap-3">
              <Numeral value={index} />
              <p
                className="text-[11px] font-semibold tracking-[0.16em] uppercase"
                style={{ color: "var(--st-text-faint)" }}
              >
                {phase.phase}
              </p>
            </div>
            <h3
              className="mt-3 text-[1.25rem] leading-tight"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {phase.name}
            </h3>
            <RuleList className="mt-4" items={phase.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Lighthouses() {
  const cases = [
    {
      name: "Customer operations",
      detail:
        "Governed service, sales or retention agents, integrated with contact-centre and customer systems.",
    },
    {
      name: "Enterprise productivity",
      detail:
        "Knowledge, service-desk, employee-support or workflow agents connected to approved company data.",
    },
    {
      name: "Telco operations",
      detail:
        "Network, field-service, incident or assurance agents that prove the platform on the operator's own work.",
    },
    {
      name: "Regulated workflows",
      detail:
        "Auditable agents for government, financial services, healthcare or critical infrastructure.",
    },
  ];
  return (
    <Section
      eyebrow="Lighthouse strategy"
      title="Lead with solutions, not with a generic agent builder."
      lede="Every lighthouse needs a business owner, a production boundary, a measurable outcome, security approval and a visible path to a repeatable commercial offer."
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {cases.map((useCase, index) => (
          <div
            key={useCase.name}
            className="border-t pt-6"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <Numeral value={index + 1} />
            <Heading3 className="mt-2">{useCase.name}</Heading3>
            <Body className="mt-1.5">{useCase.detail}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Commercial() {
  const terms = [
    {
      model: "Model 1",
      detail:
        "OEM or platform licence, minimum commitment, capacity or usage tiers, support and optional marketplace economics.",
    },
    {
      model: "Model 2",
      detail:
        "Platform subscription, implementation and enablement fees, managed-service economics and agreed usage charges.",
    },
    {
      model: "Model 3",
      detail:
        "Dedicated-deployment licence, infrastructure capacity, security and operations, support and tenant or environment fees.",
    },
  ];
  return (
    <Section
      id="commercial"
      eyebrow="Commercial framework"
      title="Predictable platform economics for Lyzr. Real product margin for the telco."
      lede="The commercial design has one job beyond price: stopping every customer from becoming a bespoke engineering project. Standard editions, blueprints, connectors, deployment patterns and support boundaries are what protect the margin."
    >
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-3">
        {terms.map((term, index) => (
          <div key={term.model} className="border-t pt-6" style={{ borderColor: "var(--ab-rule)" }}>
            <Numeral value={index + 1} />
            <Heading3 className="mt-2">{term.model}</Heading3>
            <Body className="mt-1.5">{term.detail}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Governance() {
  const measures: [string, string][] = [
    [
      "Business outcomes",
      "Qualified pipeline, lighthouse conversions, active enterprise customers, recurring revenue.",
    ],
    [
      "Platform adoption",
      "Active production agents, successful executions, reusable solutions, expansion across business units.",
    ],
    [
      "Delivery performance",
      "Time to deploy, release frequency, support volume, implementation effort.",
    ],
    ["Service quality", "Availability, latency, incident resolution, policy violations, recovery."],
    [
      "Economics",
      "Gross margin, platform consumption, services revenue, attached cloud, network and security revenue.",
    ],
    [
      "Sovereignty assurance",
      "Approved deployment, access, model, logging, retention, audit and portability controls.",
    ],
  ];
  const risks = [
    "Complement existing hyperscaler relationships; do not position the partnership as a forced replacement.",
    "Define sovereignty precisely; residency is not a substitute for operational and contractual control.",
    "Separate platform ownership from market-facing product ownership.",
    "Publish L1/L2/L3, SLA, incident, change, backup and disaster-recovery responsibilities.",
    "Standardize the offer to avoid the bespoke-services trap.",
    "Validate the telco's product sales, solution engineering and managed-operations capacity.",
    "Start with measurable lighthouse customers before building a marketplace.",
    "Make data, agent-asset, local-IP and exit rights explicit in the contract.",
  ];
  return (
    <Section
      eyebrow="Governance, measures and risks"
      title="Run the partnership on evidence."
      lede="A joint steering structure, supported by product, commercial, security and service-management workstreams, is what keeps the offer honest as it scales."
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="border-t" style={{ borderColor: "var(--ab-rule)" }}>
          {measures.map(([name, detail]) => (
            <div
              key={name}
              className="grid gap-1 border-b py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
              style={{ borderColor: "var(--ab-rule)" }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--st-text)", fontFamily: "var(--st-font-head)" }}
              >
                {name}
              </p>
              <Body>{detail}</Body>
            </div>
          ))}
        </div>
        <Card style={{ background: "var(--ab-paper)" }}>
          <Heading3>Design principles and risks</Heading3>
          <RuleList className="mt-4" items={risks} />
        </Card>
      </div>
    </Section>
  );
}

function NextSteps() {
  return (
    <section id="next-steps" className="scroll-mt-20 pb-16 sm:pb-20">
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
          <Display className="mt-6 max-w-3xl" onInk>
            Lyzr provides the technology. The telco owns the market.
          </Display>
          <Body className="mt-5 max-w-2xl" onInk>
            Phase 0 is a working session, not a proposal: agree the target market, the deployment
            boundary and the model catalogue, pick two or three lighthouse use cases, and validate
            the architecture, security and support model for your environment.
          </Body>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="mailto:partnerships@lyzr.ai?subject=Telco%20sovereign%20agent%20platform%20partnership"
              variant="on-ink"
            >
              Talk to the Lyzr partnerships team
            </ButtonLink>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-[var(--st-radius-sm)] border px-5 py-3 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ borderColor: "var(--ab-ink-border)", color: "var(--ab-ink-text)" }}
            >
              See the platform in your brand
            </a>
          </div>
        </InkPanel>
        <p
          className="mt-8 max-w-3xl text-xs leading-relaxed"
          style={{ color: "var(--st-text-faint)" }}
        >
          Partner discussion document. Non-binding, and to be tailored for each telecom operator.
          Every capability claim here should be backed by a product demonstration, architecture
          document, security response or customer evidence before it appears in a proposal.
        </p>
      </Shell>
    </section>
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
        <Opportunity />
        <Thesis />
        <Models />
        <Platform />
        <Sovereignty />
        <Ownership />
        <Architecture />
        <RouteToMarket />
        <Lighthouses />
        <Commercial />
        <Governance />
      </main>
      <NextSteps />
    </div>
  );
}
