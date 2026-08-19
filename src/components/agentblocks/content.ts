/**
 * Everything the AgentBlocks page says, in one place.
 *
 * The page is a sales asset before it is code: the copy changes far more often
 * than the layout, so the deck's wording lives here as data and the section
 * components stay dumb. Figures carry their footnote with them — see FOOTNOTES.
 */

export interface Path {
  key: string;
  stage: string;
  from: string;
  goal: string;
  adds: string;
  keeps: string;
}

/** "Where are you on your AI roadmap?" — the three entry points. */
export const PATHS: Path[] = [
  {
    key: "launch",
    stage: "Launch",
    from: "Your first agent product",
    goal: "Validate the workflow and the business case, then launch your first agent product.",
    adds: "OEM platform + launch support",
    keeps: "Nothing to migrate — you start on the platform.",
  },
  {
    key: "harden",
    stage: "Harden",
    from: "Prototypes or existing agents",
    goal: "Add evaluation, governance, security, deployment, rollback and observability.",
    adds: "Connect your agents. Keep the core logic.",
    keeps: "Your agents, your prompts, your orchestration.",
  },
  {
    key: "extend",
    stage: "Extend",
    from: "Live agents + platform",
    goal: "Unify policy, audit, quality and cost visibility across everything already running.",
    adds: "Add selected blocks. Keep your stack.",
    keeps: "Your platform and every agent already in production.",
  },
];

export interface Block {
  key: string;
  name: string;
  tag: string;
  /** One line an executive can repeat in a board meeting. */
  summary: string;
  /** What the ISV's own customer experiences because the block is there. */
  customerSees: string;
  bullets: string[];
}

/** The OEM modules — the middle layer of the stack, and the heart of the page. */
export const BLOCKS: Block[] = [
  {
    key: "surfaces",
    name: "Workbench & Marketplace",
    tag: "OEM surfaces",
    summary:
      "The screens your customers actually use, shipped in your product's shell rather than ours.",
    customerSees: "A workbench and an agent catalogue that look like the rest of your product.",
    bullets: [
      "Branded workbench where your customers configure and run agents",
      "A marketplace shelf for the agents your team publishes",
      "Themed to your palette, typography and component language",
      "Embedded in your app, or served on your own domain",
    ],
  },
  {
    key: "builder",
    name: "Agent Builder",
    tag: "White-labeled creation",
    summary:
      "A visual builder your customers — or your own delivery team — use to create agents without writing a platform.",
    customerSees: "They describe the work; an agent is drafted, tested and published.",
    bullets: [
      "Describe-to-build authoring, plus full control for engineers",
      "Tools, knowledge and memory attached without custom plumbing",
      "Reusable blueprints so the tenth agent costs less than the first",
      "Every draft lands in the registry — nothing ships off the books",
    ],
  },
  {
    key: "registry",
    name: "Registry & Governance",
    tag: "Record · policy · audit",
    summary:
      "The system of record for every agent your customers run: who owns it, what it may touch, what it did.",
    customerSees: "An answer to “what is running, on whose authority, against what data”.",
    bullets: [
      "One registry across agents you built and agents you inherited",
      "Policy applied at the agent, not bolted onto each integration",
      "Immutable audit trail spanning versions, evaluations and rollbacks",
      "Evidence your customers' risk and compliance teams will accept",
    ],
  },
  {
    key: "evaluation",
    name: "Evaluation & Guardrails",
    tag: "Quality gates",
    summary: "The gate between a promising prototype and something a customer is exposed to.",
    customerSees: "Agents that behave the same on the thousandth run as on the demo.",
    bullets: [
      "Test suites run on every version, not once before launch",
      "Guardrails on inputs, outputs, tools and data reach",
      "Sign-off recorded against a named owner before release",
      "Regressions caught in the pipeline instead of in production",
    ],
  },
  {
    key: "runtime",
    name: "Runtime & Memory",
    tag: "Execution · data boundary",
    summary:
      "Where the work actually happens — in your cloud, or inside your customer's own AWS, Azure or GCP.",
    customerSees: "Their data stays where their policy says it has to stay.",
    bullets: [
      "Deploy to your cloud or the customer's environment",
      "Durable memory and state, scoped by tenant",
      "A clear data boundary you can put in front of a procurement team",
      "Model- and framework-agnostic execution",
    ],
  },
  {
    key: "deployment",
    name: "Deployment & Rollback",
    tag: "Versioned releases",
    summary: "Agents released like software: versioned, promoted through stages, reversible.",
    customerSees: "Improvements arrive steadily, and a bad one disappears in minutes.",
    bullets: [
      "Versioned releases with staged promotion",
      "Instant rollback to any previously signed-off version",
      "Fits your existing release process and CI/CD",
      "Every promotion and reversal written to the audit trail",
    ],
  },
  {
    key: "observability",
    name: "Observability",
    tag: "Runs · cost · quality",
    summary: "What every agent did, what it cost and whether it was any good — per tenant.",
    customerSees: "Usage and value they can see, which is what renewals are argued from.",
    bullets: [
      "Run-level traces: tool calls, reasoning steps, handoffs",
      "Cost attributed by tenant, agent and workflow",
      "Quality tracked over time, not sampled by hand",
      "Feeds your existing telemetry rather than replacing it",
    ],
  },
];

/** The foundation strip that ships with every block, single module or full platform. */
export const FOUNDATION = ["Identity", "Permissions", "Audit trail", "Export path"];

/** Bottom of the stack: what stays yours. */
export const YOUR_STACK = [
  "Frameworks",
  "Models",
  "Cloud",
  "Data",
  "IAM & SSO",
  "CI/CD",
  "Telemetry",
];

/** Top of the stack: what the OEM arrangement never touches. */
export const YOURS_ALONE = ["Your brand", "Your UX", "Your pricing", "Your customer relationship"];

export const KEEP_CONNECT_ADD = [
  {
    key: "keep",
    verb: "Keep",
    line: "Existing components stay in place where supported.",
    items: [
      "Frameworks",
      "Models",
      "Cloud",
      "Domain logic",
      "Your product UX",
      "Customer relationship",
      "IAM & SSO",
      "CI/CD",
      "Telemetry",
    ],
  },
  {
    key: "connect",
    verb: "Connect",
    line: "Integrate with your systems through supported adapters.",
    items: ["Data sources", "Existing tools", "Agents already in production", "Release pipeline"],
  },
  {
    key: "add",
    verb: "Add",
    line: "Select only the AgentBlocks capabilities you need.",
    items: [
      "Registry",
      "Evaluation",
      "Governance",
      "Deployment",
      "Observability",
      "Memory",
      "OEM surfaces",
    ],
  },
];

export const LIFECYCLE = [
  {
    step: "01",
    title: "Build or connect",
    body: "Create a new agent in the builder, or bring in one you already run.",
  },
  {
    step: "02",
    title: "Govern & validate",
    body: "Register it, evaluate it against your suites, and get a named sign-off.",
  },
  {
    step: "03",
    title: "Deploy & operate",
    body: "Release it into your customers' environments, then watch it in production.",
  },
  {
    step: "04",
    title: "Improve safely",
    body: "Ship the next version — or roll back instantly to the last one that passed.",
  },
];

export const OWNERSHIP = [
  {
    who: "You own",
    what: "The business",
    body: "Product, brand, customer relationship, pricing and roadmap.",
  },
  {
    who: "The pod delivers",
    what: "The launch",
    body: "Design, build and ship the first workflow, then hand it to your team.",
  },
  {
    who: "AgentBlocks operates",
    what: "The infrastructure",
    body: "Runtime, governance, deployment and observability, under support and SLA.",
  },
];

export const ENGAGEMENTS = [
  {
    key: "self-serve",
    support: "Self-serve",
    title: "License and operate",
    body: "Your team embeds the platform or selected blocks through APIs and SDKs, with support and SLA from Lyzr.",
    fit: "For mature product and engineering organizations",
  },
  {
    key: "integrate",
    support: "Targeted support",
    title: "Integrate with us",
    body: "A targeted pod connects the blocks you select to your existing architecture and rolls out on your release process.",
    fit: "For ISVs with prototypes or an existing platform",
  },
  {
    key: "build",
    support: "Most support",
    title: "Build with us",
    body: "A full Applied AI pod works with your team to launch your first agentic product — then hands it over.",
    fit: "For ISVs launching their first agentic product",
  },
];

export interface Metric {
  value: string;
  label: string;
  note: string;
}

export const METRICS: Metric[] = [
  {
    value: "1M+",
    label: "Deployed agent instances",
    note: "Agent instances deployed on the Lyzr platform, cumulative.",
  },
  {
    value: "300%",
    label: "QoQ revenue growth",
    note: "Revenue growth across two consecutive quarters, Q1–Q2 2026.",
  },
  {
    value: "Zero",
    label: "Enterprise churn",
    note: "No enterprise account ($100K+) has churned since founding, 2023.",
  },
];

export interface CaseStudy {
  key: string;
  customer: string;
  meta: string;
  status: string;
  rows: Array<{ label: string; value: string }>;
}

export const CASES: CaseStudy[] = [
  {
    key: "anaplan",
    customer: "Anaplan",
    meta: "ISV · $1.2B-ARR planning platform · embedded OEM, full lifecycle",
    status: "Current program",
    rows: [
      { label: "Starting point", value: "Launch — first agentic product line, Office of the CFO" },
      { label: "Stays in place", value: "Anaplan's platform, data model and customer UX" },
      {
        label: "AgentBlocks adds",
        value:
          "White-labeled full lifecycle powering the Anaplan Agentic Workbench and Marketplace",
      },
      { label: "Deployment", value: "Anaplan cloud, plus customer-managed AWS, Azure or GCP" },
      {
        label: "Measured on",
        value: "Daily active users on the Workbench — 40 agents targeted in six months",
      },
    ],
  },
  {
    key: "wtw",
    customer: "WTW",
    meta: "Enterprise · global advisory & broking · two-year agreement",
    status: "In production",
    rows: [
      {
        label: "Starting point",
        value: "Harden — advisory workflows needed governance before customer exposure",
      },
      { label: "Stays in place", value: "WTW's data, domain models and advisory methodology" },
      {
        label: "AgentBlocks adds",
        value: "Governed agents for retirement advisory and billing automation",
      },
      {
        label: "Outcome",
        value:
          "End-customer advisory usage moved from consumer ChatGPT back into WTW's governed product",
      },
      { label: "Selected over", value: "Replicant" },
    ],
  },
];

export interface CompareRow {
  question: string;
  build: string;
  hyperscaler: string;
  point: string;
  agentblocks: string;
}

export const COMPARE: CompareRow[] = [
  {
    question: "Ships under your brand",
    build: "Yes — you build all of it",
    hyperscaler: "Their console, their ecosystem",
    point: "Vendor-branded surfaces",
    agentblocks: "White-label and OEM by design",
  },
  {
    question: "Works with agents you already built",
    build: "Yes, plus everything else",
    hyperscaler: "Strongest on their own stack",
    point: "One tool per problem",
    agentblocks: "Governs heterogeneous stacks; supported agents have an export path",
  },
  {
    question: "Runs in your customer's environment",
    build: "If you engineer it",
    hyperscaler: "Their cloud",
    point: "Mostly SaaS-only",
    agentblocks: "Your cloud, or the customer's AWS / Azure / GCP",
  },
  {
    question: "Adoption model",
    build: "All or nothing — you own the roadmap",
    hyperscaler: "Deep adoption of their stack",
    point: "Assemble and integrate yourself",
    agentblocks: "Modular — individual blocks or the full lifecycle",
  },
];

export const SESSION_AGENDA = [
  { step: "01", title: "Scope", body: "Full platform or selected AgentBlocks." },
  {
    step: "02",
    title: "Architecture",
    body: "What you keep, what we connect, what we add — and where it deploys.",
  },
  {
    step: "03",
    title: "Commercials",
    body: "OEM rights, pricing, ownership, support and SLA.",
  },
  { step: "04", title: "Launch plan", body: "Engagement model, owners and milestones." },
];

export const FOOTNOTES = METRICS.map((metric, index) => `${index + 1}. ${metric.note}`);

export const NAV_LINKS = [
  { href: "#shift", label: "Why now" },
  { href: "#oem", label: "What you OEM" },
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Proof" },
  { href: "#engage", label: "Ways to engage" },
];

/**
 * Where both "book a session" buttons point.
 *
 * Replace this with the real scheduling link (Calendly, HubSpot meetings, or
 * whatever sales is using) before the page goes out — it is the one value on
 * the page that has to be wired to something outside the repo.
 */
export const BOOKING_URL = "https://www.lyzr.ai/";
