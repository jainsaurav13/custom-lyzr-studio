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
          <ButtonLink href="#start">See the three partnership models</ButtonLink>
          <ButtonLink href="#problem" variant="outline">
            Why not build it yourself
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

const PROOF_LOGOS = ["JPMorganChase", "WTW", "USA.gov", "Verifone", "KPMG"];

function InProduction() {
  return (
    <Section
      id="production"
      eyebrow="Agents in production"
      title="The platform underneath is already carrying regulated enterprises."
      lede="Sovereignty arguments are won on operating evidence, not architecture diagrams. The agent platform an operator would license is the one already running inside institutions with the same risk posture as its own enterprise accounts."
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
            A billion-dollar enterprise planning SaaS runs its own agent platform on Lyzr — under
            its own brand.
          </h3>
          <Body className="mt-5">
            It is the same motion an operator is considering: a company with the engineers to build
            the layer itself licensed it instead, and shipped the product its customers were
            actually waiting for.
          </Body>
        </div>
        <Card>
          <div className="space-y-5">
            {[
              [
                "What their customers see",
                "Their brand, their product, their agent workbench and marketplace",
              ],
              [
                "What stays theirs",
                "The platform proposition, the data model, the customer relationship and the roadmap",
              ],
              [
                "What Lyzr provides",
                "The white-labeled build, governance and runtime layer underneath",
              ],
              ["Where it runs", "Their own cloud, and their customers' managed AWS, Azure or GCP"],
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
      lede="Enterprise AI is creating a control point above connectivity and cloud: the platform through which organizations build, approve, run and monitor agents. An operator can own that layer — the question is not whether its engineers could build it, but whether they should."
    >
      <div className="grid gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
        <div>
          <Heading3>What the operator already brings</Heading3>
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
          <Heading3>What it does not bring</Heading3>
          <Body className="mt-3">
            A governed agent platform: the builder, the runtime, the policy layer and the lifecycle
            around them. That is the piece this partnership supplies — and the piece no enterprise
            customer will ever pay a line item for.
          </Body>
          <div className="mt-6 space-y-4">
            {[
              [
                "This is not cloud resale",
                "The telco is the market-facing provider of the service.",
              ],
              [
                "Hyperscalers stay in place",
                "Approved compute, models and infrastructure underneath.",
              ],
              [
                "Lyzr stays underneath",
                "Technology and enablement, never the customer relationship.",
              ],
            ].map(([label, detail]) => (
              <div
                key={label}
                className="border-t pt-4 first:border-t-0 first:pt-0"
                style={{ borderColor: "var(--ab-rule)" }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                  {label}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--st-text-faint)" }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <BuildTable />
      </div>

      <InkPanel className="mt-12">
        <Eyebrow onInk>The better roadmap</Eyebrow>
        <Display className="mt-4 max-w-3xl" onInk>
          Own the offer. License the platform underneath it.
        </Display>
        <Body className="mt-5 max-w-2xl" onInk>
          The operator&rsquo;s advantage is its enterprise relationships, its regulated-market
          trust, its local infrastructure and its ability to sell and support a service. None of
          that is produced by writing an agent runtime.
        </Body>
      </InkPanel>
    </Section>
  );
}

function Service() {
  const capabilities: [string, string][] = [
    ["Agent building and orchestration", "Across approved models, tools and enterprise systems."],
    ["Governed runtime", "Deploy and operate production agents under policy."],
    [
      "Guardrails and evaluation",
      "Observability, auditability and policy enforcement as defaults.",
    ],
    ["Reusable blueprints", "Connectors and solution components that keep delivery repeatable."],
    [
      "Deployment flexibility",
      "Telco cloud, sovereign cloud, customer environments, approved hyperscalers.",
    ],
    [
      "Tenant administration and APIs",
      "Integration with identity, security, billing and service management.",
    ],
    [
      "Enablement and support",
      "Reference architecture, platform upgrades, and L2/L3 support behind the operator.",
    ],
  ];
  return (
    <Section
      id="service"
      eyebrow="What's inside"
      title="What the telco owns, what Lyzr supplies, what stays exactly as it is."
      lede="The service should be explained as three bands, not as a product diagram. Nothing in the operator's estate gets ripped out to make room for the platform layer."
    >
      <ServiceStack />

      <div className="mt-12">
        <Heading3>What the Lyzr layer actually contains</Heading3>
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
        <Body className="mt-8 max-w-3xl">
          Every claim on this page should be met with a product demonstration, an architecture
          document, a security response or customer evidence. The proposal becomes credible when the
          operating proof is as clear as the strategic narrative.
        </Body>
      </div>
    </Section>
  );
}

function Why() {
  const reasons: [string, string][] = [
    [
      "It goes to market as the telco's service",
      "Brand, service tiers, pricing, contracts and billing are the operator's. Lyzr appears in the partnership agreement, not in the customer's product.",
    ],
    [
      "It complements the cloud partnerships already in place",
      "Approved hyperscalers, model providers and local infrastructure keep operating underneath. This is a product and policy layer across those environments, not a replacement for them.",
    ],
    [
      "Sovereignty is defined, not asserted",
      "Data, operations, models, infrastructure, policy, commercials and exit are each specified for the deployment before anyone uses the word sovereign.",
    ],
    [
      "It runs where the regulator requires",
      "Telco cloud, sovereign cloud, a customer-controlled environment or an approved hyperscaler — including single-tenant and on-premises for regulated accounts.",
    ],
    [
      "The operator starts at its own readiness",
      "A managed service, a private deployment or a full platform launch are three entry points into the same technology, not three different products.",
    ],
    [
      "There is a way out",
      "Customer data, agent configurations and agreed artifacts can be exported or moved under contractual terms. The reason to stay should be that it works.",
    ],
  ];
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
      id="why"
      eyebrow="Why Lyzr"
      title="Built for sovereignty, and against lock-in — the operator's as much as the customer's."
      lede="Sovereignty is an operating outcome produced by architecture, governance and contracts. It is broader than data residency, and it does not require every component to be domestically developed."
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

      <div className="mt-16">
        <Heading3>The seven boundaries to define before the word is used</Heading3>
        <div className="mt-6 border-t" style={{ borderColor: "var(--ab-rule)" }}>
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
      eyebrow="Ownership"
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

function GetStarted() {
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
  const lighthouses: [string, string][] = [
    [
      "Customer operations",
      "Governed service, sales or retention agents, integrated with contact-centre and customer systems.",
    ],
    [
      "Enterprise productivity",
      "Knowledge, service-desk, employee-support or workflow agents connected to approved company data.",
    ],
    [
      "Telco operations",
      "Network, field-service, incident or assurance agents that prove the platform on the operator's own work.",
    ],
    [
      "Regulated workflows",
      "Auditable agents for government, financial services, healthcare or critical infrastructure.",
    ],
  ];
  const terms: [string, string][] = [
    [
      "Model 1",
      "OEM or platform licence, minimum commitment, capacity or usage tiers, support and optional marketplace economics.",
    ],
    [
      "Model 2",
      "Platform subscription, implementation and enablement fees, managed-service economics and agreed usage charges.",
    ],
    [
      "Model 3",
      "Dedicated-deployment licence, infrastructure capacity, security and operations, support and tenant or environment fees.",
    ],
  ];
  return (
    <Section
      id="start"
      eyebrow="Get started"
      title="Start where you are. We'll meet you there."
      lede="Three partnership models, each preserving the same principle: the telco's brand, the telco's customer, the telco's economics. Model 1 is the destination; it does not have to be the starting point."
    >
      <BlueprintCards />
      <BlueprintLegend className="mt-10" />

      <InkPanel className="mt-12">
        <Eyebrow onInk>Recommended progression</Eyebrow>
        <Display className="mt-4 max-w-3xl" onInk>
          Enter where the operator is ready. Consolidate into the platform later.
        </Display>
        <Body className="mt-5 max-w-2xl" onInk>
          Begin with Model 2, Model 3 or both, prove demand with lighthouse customers, then fold
          those offers into a telco-owned platform.
        </Body>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            ["Enter", "Model 2 or Model 3, on a defined deployment boundary."],
            ["Prove", "Two or three lighthouse customers with measured outcomes."],
            ["Consolidate", "A telco-owned, telco-branded sovereign platform."],
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

      <div className="mt-16">
        <Heading3>The phases behind whichever model you pick</Heading3>
        <div className="mt-6 grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
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
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <Heading3>What to launch first</Heading3>
          <Body className="mt-3">
            Lead with a small number of high-value solutions rather than a generic agent builder.
            Every lighthouse needs a business owner, a production boundary, a measurable outcome,
            security approval and a path to a repeatable offer.
          </Body>
          <div className="mt-6 border-t" style={{ borderColor: "var(--ab-rule)" }}>
            {lighthouses.map(([name, detail], index) => (
              <div key={name} className="border-b py-4" style={{ borderColor: "var(--ab-rule)" }}>
                <div className="flex items-baseline gap-3">
                  <Numeral value={index + 1} />
                  <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                    {name}
                  </p>
                </div>
                <Body className="mt-1.5">{detail}</Body>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Heading3>How the commercials follow the model</Heading3>
          <Body className="mt-3">
            Terms should create predictable platform economics for Lyzr and real product, services
            and infrastructure margin for the telco — and stop every customer from becoming a
            bespoke engineering project.
          </Body>
          <div className="mt-6 border-t" style={{ borderColor: "var(--ab-rule)" }}>
            {terms.map(([model, detail], index) => (
              <div key={model} className="border-b py-4" style={{ borderColor: "var(--ab-rule)" }}>
                <div className="flex items-baseline gap-3">
                  <Numeral value={index + 1} />
                  <p className="text-sm font-semibold" style={{ color: "var(--st-text)" }}>
                    {model}
                  </p>
                </div>
                <Body className="mt-1.5">{detail}</Body>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does this replace our hyperscaler and cloud partnerships?",
    a: "No, and it should not be positioned that way internally either. Approved hyperscalers, model providers and local infrastructure suppliers keep providing compute, models and related services. Lyzr adds a deployable product and policy-enforcement layer across those approved environments, which is what turns them into a service you can sell under your own brand.",
  },
  {
    q: "Is 'sovereign' just another word for data residency?",
    a: "No. Residency is one of seven boundaries — data, operational, model, infrastructure, policy, commercial and exit. A proposal should only use the word sovereign once each of those is defined for the specific deployment, because a customer's risk team will test all seven and residency alone will not survive the conversation.",
  },
  {
    q: "Can we govern agents our teams already built?",
    a: "Yes, and that is usually where the first value shows up. Agents built elsewhere are connected and then governed like any other: registered, evaluated, versioned and observable inside the same policy layer, across approved models and clouds.",
  },
  {
    q: "Who runs it in production, and who answers the customer?",
    a: "The operator owns L1 and the customer relationship. Lyzr provides platform engineering, upgrades and L2/L3 behind you, under agreed service levels. The split — SLA, incident, change, backup and disaster recovery — is published in the agreement rather than discovered during the first outage.",
  },
  {
    q: "Will every customer turn into a bespoke engineering project?",
    a: "Only if the offer is designed that way. Standard editions, blueprints, connectors, deployment patterns and support boundaries are what protect the margin, and they are part of the partnership design in Phase 0 — not something retrofitted after the third custom build.",
  },
  {
    q: "Do we have the operating capacity to run this?",
    a: "That is a fair question to answer honestly before signing anything. It needs product sales, solution engineering and managed operations. Where the appetite for a platform launch is not there yet, Model 2 or Model 3 gives the same technology with far less operating surface, and a path to Model 1 once the evidence exists.",
  },
  {
    q: "What happens if we want to leave?",
    a: "Data, agent configurations, local IP and exit rights are made explicit in the contract. Customer data and agreed artifacts can be exported or moved under those terms. The commercial argument for staying should be that the platform works, never that leaving is impossible.",
  },
  {
    q: "How will we know the partnership is working?",
    a: "Through a joint steering structure with measures agreed up front: qualified pipeline and lighthouse conversions; active production agents and successful executions; time to deploy and support volume; availability, latency and policy violations; gross margin and attached cloud, network and security revenue; and the sovereignty controls themselves — approved deployment, access, model, logging, retention, audit and portability.",
  },
];

function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="The questions we expect you to ask."
      lede="Most of these come up in the first hour with an operator's strategy, security or commercial team. None of them have a comfortable non-answer."
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
                className="text-[1.0625rem] leading-snug"
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

      <div className="mt-16">
        <Heading3>The four routes an operator is really choosing between</Heading3>
        <div className="mt-6">
          <ComparisonTable />
        </div>
      </div>
    </Section>
  );
}

const AGENDA: [string, string][] = [
  ["Scope", "Target market, deployment boundary, model catalogue and sovereignty requirements."],
  ["Architecture", "What you keep, what we connect, what we add, and where it deploys."],
  ["Commercials", "Partnership model, licence mechanism, ownership split, support and SLA."],
  ["Launch plan", "Two or three lighthouse use cases, success criteria, owners and milestones."],
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
          <Display className="mt-6 max-w-3xl" onInk>
            Own the enterprise AI service. Skip the platform build underneath it.
          </Display>
          <Body className="mt-5 max-w-2xl" onInk>
            Phase 0 is one working session, not a proposal: what you keep, what Lyzr adds, where it
            deploys and how you take it to market. Bring your architecture and your two or three
            candidate accounts; leave with a plan.
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
            non-binding, and to be tailored for each operator.
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
