import {
  ArrowRight,
  Building2,
  CircuitBoard,
  Database,
  Layers,
  RadioTower,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";

import { BlueprintCards, BlueprintLegend, LyzrGlyph, ValueChain } from "./diagrams";
import { CheckList, Panel, Pill, Section, TONE, type ToneName } from "./ui";

const NAV = [
  { id: "opportunity", label: "Opportunity" },
  { id: "models", label: "Models" },
  { id: "platform", label: "Platform" },
  { id: "sovereignty", label: "Sovereignty" },
  { id: "ownership", label: "Ownership" },
  { id: "architecture", label: "Architecture" },
  { id: "route-to-market", label: "Route to market" },
];

function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <LyzrGlyph size={24} />
          <span className="text-sm font-bold tracking-tight text-slate-900">Lyzr</span>
          <span className="hidden text-sm text-slate-400 sm:inline">× Telco</span>
        </a>
        <nav className="hidden min-w-0 flex-1 items-center gap-5 overflow-x-auto lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 text-xs font-medium whitespace-nowrap text-slate-500 transition-colors hover:text-[#6D28D9]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#next-steps"
          className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#5B21B6] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#6D28D9] lg:ml-0"
        >
          <span className="hidden sm:inline">Talk to partnerships</span>
          <span className="sm:hidden">Get in touch</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 30% 100%, #EDE4FE 0%, transparent 70%), radial-gradient(50% 100% at 75% 100%, #DEEAFD 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-14 sm:pt-24">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="lyzr">Partnership blueprint</Pill>
          <Pill tone="telco">Partner discussion document</Pill>
          <Pill tone="enterprise">Non-binding · tailored per operator</Pill>
        </div>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          From telecom provider to{" "}
          <span className="text-[#5B21B6]">sovereign AI agent provider</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          Telecom operators can become providers of governed enterprise AI services — not merely
          distributors of third-party AI products. Lyzr supplies the deployable agent platform and
          operating enablement; the operator keeps the customer relationship, brand, commercial
          offer and sovereign operating policy.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#models"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9]"
          >
            See the three partnership models
            <ArrowRight size={16} />
          </a>
          <a
            href="#route-to-market"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            Phased route to market
          </a>
        </div>

        <div className="mt-14">
          <ValueChain />
        </div>
      </div>
    </header>
  );
}

function Opportunity() {
  return (
    <Section
      id="opportunity"
      eyebrow="1. The opportunity"
      title="A new control point is forming above connectivity and cloud"
      lede="Enterprise AI is creating a layer through which organizations build, approve, run and monitor agents. If a hyperscaler or software vendor owns that layer outright, the operator keeps infrastructure and implementation revenue — but not the primary product relationship."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel tone="telco">
          <p className="text-sm font-bold text-slate-900">
            The assets an operator already has, packaged as a governed agent service
          </p>
          <CheckList
            tone="telco"
            className="mt-4"
            items={[
              "Enterprise and public-sector customer relationships.",
              "Local data centres, cloud, edge, network and cybersecurity services.",
              "Identity, service management, billing and customer support.",
              "In-country operations and regulated-sector credibility.",
              "Partner, developer, system-integrator and SMB distribution channels.",
            ]}
          />
        </Panel>
        <Panel tone="lyzr">
          <p className="text-sm font-bold text-slate-900">This is not cloud resale</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The telco becomes the market-facing provider of the service, while approved cloud, model
            and infrastructure partners continue to operate underneath it.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { label: "Telco is the merchant", detail: "Brand, contract, pricing and support." },
              {
                label: "Lyzr is the platform",
                detail: "Builder, runtime, governance and enablement.",
              },
              {
                label: "Hyperscalers stay in place",
                detail: "Approved compute, models and infrastructure underneath.",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3"
              >
                <p className="text-sm font-semibold text-slate-900">{row.label}</p>
                <p className="mt-0.5 text-xs text-slate-600">{row.detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Section>
  );
}

function Thesis() {
  const rows: { tone: ToneName; who: string; owns: string[] }[] = [
    {
      tone: "telco",
      who: "The telco",
      owns: [
        "Brand, service tiers, pricing and target segments",
        "The customer contract and route to market",
      ],
    },
    {
      tone: "lyzr",
      who: "Lyzr",
      owns: [
        "Reusable agent platform and reference architecture",
        "Platform lifecycle and advanced technical support",
      ],
    },
    {
      tone: "telco",
      who: "Approved partners",
      owns: [
        "Hyperscalers, model providers and local infrastructure",
        "Compute, models and related services",
      ],
    },
    {
      tone: "enterprise",
      who: "The enterprise customer",
      owns: ["Their data, credentials and business policy", "Customer-specific agent assets"],
    },
  ];
  return (
    <Section
      eyebrow="2. Partnership thesis"
      title="Provider, not reseller"
      lede="The proposition is framed around telco product ownership, not vendor displacement. Lyzr complements the operator's existing cloud and model partnerships: it adds a deployable product and policy-enforcement layer across those approved environments rather than asking the operator to replace them."
      tint
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((row) => (
          <Panel key={row.who} tone={row.tone}>
            <p className="text-sm font-bold" style={{ color: TONE[row.tone].ink }}>
              {row.who}
            </p>
            <ul className="mt-3 space-y-2">
              {row.owns.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </Section>
  );
}

function Models() {
  return (
    <Section
      id="models"
      eyebrow="3. Three viable partnership models"
      title="Three ways a telco can take sovereign enterprise AI agents to market with Lyzr"
      lede="Model 1 is the strategic destination. Model 2 is the fastest commercial entry. Model 3 addresses isolated, regulated environments. An operator can start with any of them."
    >
      <BlueprintCards />
      <BlueprintLegend className="mt-6" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel tone="enterprise">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} color={TONE.enterprise.line} />
            <p className="text-sm font-bold text-slate-900">All deployments can be sovereign</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Every motion can run private and compliant — inside the telco's own infrastructure or
            the customer's — under an agreed deployment boundary and model catalogue.
          </p>
        </Panel>
        <Panel tone="lyzr">
          <p className="text-sm font-bold text-slate-900">Recommended progression</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Model 1 should remain the strategic destination, but it should not be imposed as the
            only starting point. Begin with Model 2, Model 3 or both, validate demand and operating
            readiness, then consolidate those offers into a telco-owned platform.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-lg bg-[#EFF4FE] px-3 py-1.5 text-[#1E3A8A]">
              Model 2 or 3 — enter
            </span>
            <ArrowRight size={14} className="text-slate-400" />
            <span className="rounded-lg bg-[#F0FAF2] px-3 py-1.5 text-[#166534]">
              Lighthouse evidence
            </span>
            <ArrowRight size={14} className="text-slate-400" />
            <span className="rounded-lg bg-[#F5F1FE] px-3 py-1.5 text-[#4C1D95]">
              Model 1 — telco-owned platform
            </span>
          </div>
        </Panel>
      </div>
    </Section>
  );
}

function Platform() {
  const capabilities = [
    {
      title: "Agent building & orchestration",
      detail: "Across approved models, tools and enterprise systems.",
    },
    {
      title: "Governed runtime",
      detail: "Deploy and operate production agents under policy.",
    },
    {
      title: "Guardrails & evaluation",
      detail: "Observability, auditability and policy enforcement.",
    },
    {
      title: "Reusable blueprints",
      detail: "Connectors and solution components that avoid bespoke builds.",
    },
    {
      title: "Deployment flexibility",
      detail: "Telco cloud, sovereign cloud, customer environments, approved hyperscalers.",
    },
    {
      title: "Tenant administration & APIs",
      detail: "Integration with identity, security, billing and service management.",
    },
    {
      title: "Enablement & support",
      detail: "Reference architecture, platform upgrades and L2/L3 support.",
    },
  ];
  return (
    <Section
      id="platform"
      eyebrow="4. What Lyzr provides"
      title="A deployable agent platform — not a model vendor or a bespoke integrator"
      lede="Each external claim should be supported by a product demonstration, architecture document, security response or customer evidence. The proposal becomes credible when the operating proof is as clear as the strategic narrative."
      tint
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability) => (
          <div
            key={capability.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#DDD1FA]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F1FE]">
              <CircuitBoard size={17} color={TONE.lyzr.line} />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-900">{capability.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{capability.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Sovereignty() {
  const dimensions = [
    {
      name: "Data",
      detail:
        "Prompts, files, memory, logs, embeddings and metadata stay in approved locations under defined retention and access rules.",
    },
    {
      name: "Operational",
      detail:
        "Approved local teams control administration, incidents, support, change and recovery.",
    },
    {
      name: "Model",
      detail:
        "The operator and customer determine which private, open, local or hyperscaler models may be used.",
    },
    {
      name: "Infrastructure",
      detail:
        "Workloads run on approved telco, sovereign-cloud, regional or customer-controlled infrastructure.",
    },
    {
      name: "Policy",
      detail: "Access, guardrails, evaluation, audit and routing rules are locally governed.",
    },
    {
      name: "Commercial",
      detail: "The telco owns the offer, customer relationship, pricing and route to market.",
    },
    {
      name: "Exit",
      detail:
        "Customer data, agent configurations and agreed artifacts can be exported or moved under contractual terms.",
    },
  ];
  return (
    <Section
      id="sovereignty"
      eyebrow="5. What sovereign AI means here"
      title="Sovereignty is an operating outcome created by architecture, governance and contracts"
      lede="It is broader than data residency, and it does not require every component to be domestically developed. A proposal should only use the word sovereign once these boundaries are defined for the specific deployment."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dimensions.map((dimension) => (
          <div
            key={dimension.name}
            className="rounded-2xl border border-slate-200 bg-white p-5"
            style={{ borderLeft: `3px solid ${TONE.telco.line}` }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} color={TONE.telco.line} />
              <p className="text-sm font-bold text-slate-900">{dimension.name} sovereignty</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{dimension.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Ownership() {
  const columns: { tone: ToneName; icon: ReactNode; who: string; items: string[] }[] = [
    {
      tone: "telco",
      icon: <RadioTower size={18} color={TONE.telco.line} strokeWidth={1.8} />,
      who: "The telecom operator owns",
      items: [
        "Customer relationship, brand, commercial offer, pricing, contracts and billing.",
        "Sovereign operating policy, approved deployment boundary and model catalogue.",
        "Enterprise channel, local partnerships, customer success and L1 service.",
        "Local infrastructure and security integration where included in the offer.",
      ],
    },
    {
      tone: "lyzr",
      icon: <LyzrGlyph size={18} />,
      who: "Lyzr owns",
      items: [
        "Core platform intellectual property and product roadmap.",
        "Agent builder, orchestration, runtime, governance and platform engineering.",
        "Reference architecture, platform enablement, upgrades and L2/L3 support.",
        "Standard reusable capabilities supplied under the partnership agreement.",
      ],
    },
    {
      tone: "enterprise",
      icon: <Building2 size={18} color={TONE.enterprise.line} strokeWidth={1.8} />,
      who: "The enterprise customer controls",
      items: [
        "Business data, credentials, permissions, records and source-system access.",
        "Business policy and approval of production agent behaviour.",
        "Customer-specific agent assets and portability rights as defined contractually.",
      ],
    },
    {
      tone: "lyzr",
      icon: <Layers size={18} color={TONE.lyzr.line} strokeWidth={1.8} />,
      who: "Joint responsibilities",
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
      id="ownership"
      eyebrow="6. Target ownership and operating model"
      title="Who owns what"
      lede="Separating platform ownership from market-facing product ownership is what makes the model durable."
      tint
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <Panel key={column.who} tone={column.tone} className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: TONE[column.tone].soft }}
              >
                {column.icon}
              </span>
              <p className="text-sm font-bold" style={{ color: TONE[column.tone].ink }}>
                {column.who}
              </p>
            </div>
            <CheckList tone={column.tone} className="mt-4" items={column.items} />
          </Panel>
        ))}
      </div>
    </Section>
  );
}

function Architecture() {
  const layers: { tone: ToneName; name: string; detail: string }[] = [
    {
      tone: "enterprise",
      name: "Customer & channel layer",
      detail:
        "Telco enterprise accounts, SMB channels, government relationships, partners and customer success.",
    },
    {
      tone: "telco",
      name: "Branded service layer",
      detail: "Portal, solution catalogue, service tiers, commercial packaging and SLAs.",
    },
    {
      tone: "lyzr",
      name: "Lyzr agent platform layer",
      detail:
        "Builder, orchestration, runtime, tools, memory, guardrails, evaluation, observability and governance.",
    },
    {
      tone: "telco",
      name: "Enterprise systems layer",
      detail: "Identity, business applications, data, permissions, knowledge and workflows.",
    },
    {
      tone: "telco",
      name: "Model & compute layer",
      detail:
        "Approved private, open, local or hyperscaler models and the selected infrastructure.",
    },
    {
      tone: "enterprise",
      name: "Sovereign operations layer",
      detail: "IAM, SOC, audit, support, backup, disaster recovery, change and portability.",
    },
  ];
  return (
    <Section
      id="architecture"
      eyebrow="7. Reference service architecture"
      title="The service, explained as six layers"
      lede="Enterprise users and partners access the telco-branded service; the Lyzr platform governs agent execution; approved models, tools and enterprise data are used within the agreed deployment boundary; the telco operates the customer service and local policy."
    >
      <div className="space-y-3">
        {layers.map((layer, index) => (
          <div
            key={layer.name}
            className="flex flex-col gap-2 rounded-2xl border bg-white px-5 py-4 sm:flex-row sm:items-center sm:gap-6"
            style={{
              borderColor: TONE[layer.tone].border,
              background: layer.name.startsWith("Lyzr") ? TONE.lyzr.soft : "#FFFFFF",
            }}
          >
            <div className="flex shrink-0 items-center gap-3 sm:w-72">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: TONE[layer.tone].line }}
              >
                {index + 1}
              </span>
              <p className="text-sm font-bold" style={{ color: TONE[layer.tone].ink }}>
                {layer.name}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{layer.detail}</p>
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
        "Agree target market, deployment boundary, model catalogue and sovereignty requirements.",
        "Select the initial partnership model and commercial mechanism.",
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
        "Progress toward Model 1 where the operator began through Model 2 or 3.",
      ],
    },
  ];
  return (
    <Section
      id="route-to-market"
      eyebrow="8. Phased route to market"
      title="From partnership design to platform expansion"
      tint
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {phases.map((phase, index) => (
          <div
            key={phase.phase}
            className="relative rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
              style={{
                background: `linear-gradient(90deg, ${TONE.lyzr.line}, ${TONE.telco.line})`,
                opacity: 0.35 + index * 0.2,
              }}
            />
            <p className="text-xs font-semibold tracking-[0.14em] text-slate-400 uppercase">
              {phase.phase}
            </p>
            <p className="mt-1 text-base font-bold text-slate-900">{phase.name}</p>
            <ul className="mt-4 space-y-2.5">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: TONE.telco.line }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
        "Governed service, sales or retention agents integrated with contact-centre and customer systems.",
    },
    {
      name: "Enterprise productivity",
      detail:
        "Knowledge, service-desk, employee-support or workflow agents connected to approved company data.",
    },
    {
      name: "Telco operations",
      detail:
        "Network, field-service, incident or assurance agents that demonstrate the platform internally.",
    },
    {
      name: "Regulated workflows",
      detail:
        "Auditable agents for government, financial services, healthcare or critical infrastructure.",
    },
  ];
  return (
    <Section
      eyebrow="9. Lighthouse use-case strategy"
      title="Lead with solutions, not with a generic agent builder"
      lede="Each lighthouse should have a business owner, a production boundary, a measurable outcome, security approval and a clear path to a repeatable commercial offer."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {cases.map((useCase) => (
          <Panel key={useCase.name} tone="enterprise">
            <div className="flex items-center gap-2">
              <Database size={17} color={TONE.enterprise.line} />
              <p className="text-sm font-bold text-slate-900">{useCase.name}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{useCase.detail}</p>
          </Panel>
        ))}
      </div>
    </Section>
  );
}

function Commercial() {
  const terms: { tone: ToneName; model: string; detail: string }[] = [
    {
      tone: "lyzr",
      model: "Model 1",
      detail:
        "OEM or platform licence, minimum commitment, capacity or usage tiers, support and optional marketplace economics.",
    },
    {
      tone: "telco",
      model: "Model 2",
      detail:
        "Platform subscription, implementation and enablement fees, managed-service economics and agreed usage charges.",
    },
    {
      tone: "enterprise",
      model: "Model 3",
      detail:
        "Dedicated-deployment licence, infrastructure capacity, security and operations, support and tenant or environment-based fees.",
    },
  ];
  return (
    <Section
      id="commercial"
      eyebrow="10. Commercial framework"
      title="Predictable platform economics for Lyzr; product, services and infrastructure margin for the telco"
      lede="The commercial design should prevent every customer from becoming a bespoke engineering project. Standard editions, blueprints, connectors, deployment patterns and support boundaries are essential to margin and scale."
      tint
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {terms.map((term) => (
          <Panel key={term.model} tone={term.tone}>
            <p className="text-sm font-bold" style={{ color: TONE[term.tone].ink }}>
              {term.model}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{term.detail}</p>
          </Panel>
        ))}
      </div>
    </Section>
  );
}

function Governance() {
  const measures = [
    {
      name: "Business outcomes",
      detail:
        "Qualified pipeline, lighthouse conversions, active enterprise customers and recurring revenue.",
    },
    {
      name: "Platform adoption",
      detail:
        "Active production agents, successful executions, reusable solutions and expansion across business units.",
    },
    {
      name: "Delivery performance",
      detail: "Time to deploy, release frequency, support volume and implementation effort.",
    },
    {
      name: "Service quality",
      detail: "Availability, latency, incident resolution, policy violations and recovery.",
    },
    {
      name: "Economics",
      detail:
        "Gross margin, platform consumption, services revenue and attached cloud, network or security revenue.",
    },
    {
      name: "Sovereignty assurance",
      detail:
        "Approved deployment, access, model, logging, retention, audit and portability controls.",
    },
  ];
  const risks = [
    "Complement existing hyperscaler relationships; do not position the partnership as a forced replacement.",
    "Define sovereignty precisely; do not use residency as a substitute for operational and contractual control.",
    "Separate platform ownership from market-facing product ownership.",
    "Publish L1/L2/L3, SLA, incident, change, backup and disaster-recovery responsibilities.",
    "Standardize the offer to avoid a bespoke-services trap.",
    "Validate the telco's product sales, solution engineering and managed-operations capacity.",
    "Start with measurable lighthouse customers before building a broad marketplace.",
    "Make data, agent-asset, local-IP and exit rights explicit in the contract.",
  ];
  return (
    <Section
      id="governance"
      eyebrow="11–12. Governance, success measures and risks"
      title="Run the partnership on evidence"
      lede="A joint steering structure, supported by product, commercial, security and service-management workstreams, keeps the offer honest as it scales."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {measures.map((measure) => (
            <div key={measure.name} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-bold text-slate-900">{measure.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{measure.detail}</p>
            </div>
          ))}
        </div>
        <Panel tone="lyzr">
          <p className="text-sm font-bold text-slate-900">Design principles and risks</p>
          <CheckList tone="lyzr" className="mt-4" items={risks} />
        </Panel>
      </div>
    </Section>
  );
}

function NextSteps() {
  return (
    <section id="next-steps" className="scroll-mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div
          className="overflow-hidden rounded-3xl px-8 py-12 text-white sm:px-12"
          style={{ background: "linear-gradient(105deg, #3B0764 0%, #5B21B6 55%, #1E3A8A 100%)" }}
        >
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            Lyzr provides the technology. The telco owns the market.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            The next step is Phase 0: agree the target market, deployment boundary and model
            catalogue, choose two or three lighthouse use cases, and validate the architecture,
            security and support model for your environment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:partnerships@lyzr.ai?subject=Telco%20sovereign%20agent%20platform%20partnership"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#3B0764] transition-colors hover:bg-white/90"
            >
              Talk to the Lyzr partnerships team
              <ArrowRight size={16} />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See the platform in your brand
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          Partner discussion document. Non-binding, and to be tailored for each telecom operator.
          Every capability claim in this document should be backed by a product demonstration,
          architecture document, security response or customer evidence before it is used in a
          proposal.
        </p>
      </div>
    </section>
  );
}

export function TelcoPage() {
  // The studio runs dark; this document is Lyzr's own light-mode page, so the
  // overscroll area has to be repainted or the page flashes near-black.
  useEffect(() => {
    const root = document.documentElement;
    const previous = { html: root.style.background, body: document.body.style.background };
    root.style.background = "#F8FAFC";
    document.body.style.background = "#F8FAFC";
    return () => {
      root.style.background = previous.html;
      document.body.style.background = previous.body;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 [color-scheme:light]">
      <TopBar />
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
