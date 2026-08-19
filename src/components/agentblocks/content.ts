/**
 * Everything the AgentBlocks page says, in one place.
 *
 * The page is a sales asset before it is code: the copy changes far more often
 * than the layout, so the wording lives here as data and the section components
 * stay dumb.
 *
 * Spelling is British throughout, matching the rest of this repo's copy.
 */

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: "OEM agent infrastructure for ISVs",
  headline: "Launch AI products",
  headlineAccent: "under your brand.",
  sub: "AgentBlocks provides the production infrastructure to build, govern and scale them — without replacing your existing platform.",
  chips: [
    "Start fresh or bring existing agents",
    "Co-build, integrate, or self-operate",
    "Full platform or modular blocks",
  ],
};

/**
 * The proof strip that sits directly under the hero. Deliberately three facts
 * about what is in production — not company growth figures, which say nothing
 * about whether the thing works for a customer.
 */
export const PROOF_STRIP = [
  { label: "Deployed", fact: "1M+ agent instances running on the Lyzr platform" },
  { label: "Anaplan", fact: "Embedded OEM across the full lifecycle" },
  { label: "WTW", fact: "Governed advisory agents in production" },
];

/* ------------------------------------------------------------------ *
 * Where you start
 * ------------------------------------------------------------------ */

export interface Path {
  key: string;
  stage: string;
  from: string;
  goal: string;
  adds: string;
  keeps: string;
}

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

/* ------------------------------------------------------------------ *
 * What AgentBlocks adds — and what stays
 * ------------------------------------------------------------------ */

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

export const BLOCKS: Block[] = [
  {
    key: "surfaces",
    name: "Workbench & Marketplace",
    tag: "OEM surfaces",
    summary:
      "The screens your customers actually use, shipped in your product's shell rather than ours.",
    customerSees: "A workbench and an agent catalogue that feel native to your product.",
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
    tag: "White-labelled creation",
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

/** Ships with every block, whether you take one module or the whole lifecycle. */
export const FOUNDATION = ["Identity", "Permissions", "Audit trail", "Export path"];

/** Bottom of the stack: what stays yours, untouched. */
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

/** The middle ground — neither replaced nor rebuilt, just wired in. */
export const CONNECTED = [
  "Data sources",
  "Existing tools",
  "Agents already in production",
  "Your release pipeline",
];

export const LIFECYCLE = [
  { step: "01", title: "Build or connect", body: "A new agent, or one you already run." },
  { step: "02", title: "Govern & validate", body: "Registered, evaluated, signed off by name." },
  { step: "03", title: "Deploy & operate", body: "Released to your customers, then watched." },
  { step: "04", title: "Improve safely", body: "Ship the next version, or roll back in minutes." },
];

/* ------------------------------------------------------------------ *
 * Customers
 * ------------------------------------------------------------------ */

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
    meta: "ISV · enterprise planning platform · embedded OEM, full lifecycle",
    status: "Current programme",
    rows: [
      { label: "Started at", value: "Launch — first agentic product line, Office of the CFO" },
      { label: "Stays in place", value: "Anaplan's platform, data model and customer UX" },
      {
        label: "AgentBlocks adds",
        value:
          "The white-labelled lifecycle powering the Anaplan Agentic Workbench and Marketplace",
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
        label: "Started at",
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

/* ------------------------------------------------------------------ *
 * Ways to engage
 * ------------------------------------------------------------------ */

export const ENGAGEMENTS = [
  {
    key: "self-serve",
    support: "Self-serve",
    title: "License and operate",
    body: "Your team embeds the platform or selected blocks through APIs and SDKs, with support and SLA from Lyzr.",
    fit: "Mature product and engineering organisations",
  },
  {
    key: "integrate",
    support: "Targeted support",
    title: "Integrate with us",
    body: "A small launch team connects the blocks you select to your existing architecture and rolls out on your release process.",
    fit: "ISVs with prototypes or an existing platform",
  },
  {
    key: "build",
    support: "Most support",
    title: "Build with us",
    body: "A full launch team — product and engineering, working alongside yours — ships your first agentic product, then hands it over.",
    fit: "ISVs launching their first agentic product",
  },
];

/** Who owns what once the launch team rolls off. */
export const OWNERSHIP = [
  {
    who: "You own",
    body: "The business: product, brand, customer relationship, pricing and roadmap.",
  },
  {
    who: "The launch team delivers",
    body: "The first workflow — designed, built and shipped, then transferred to your team.",
  },
  {
    who: "Lyzr operates",
    body: "The infrastructure: runtime, governance, deployment and observability, under SLA.",
  },
];

/* ------------------------------------------------------------------ *
 * Buyer's guide (collapsed — not part of the main scroll)
 * ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ *
 * Next step
 * ------------------------------------------------------------------ */

export const SESSION_AGENDA = [
  { step: "01", title: "Scope", body: "Full platform or selected AgentBlocks." },
  {
    step: "02",
    title: "Architecture",
    body: "What you keep, what we connect, what we add — and where it deploys.",
  },
  { step: "03", title: "Commercials", body: "OEM rights, pricing, ownership, support and SLA." },
  { step: "04", title: "Launch plan", body: "Engagement model, owners and milestones." },
];

export const NAV_LINKS = [
  { href: "#shift", label: "Why it matters" },
  { href: "#paths", label: "Where you start" },
  { href: "#oem", label: "What you get" },
  { href: "#cases", label: "Customers" },
  { href: "#engage", label: "Ways to engage" },
];

/**
 * Every CTA on the page points here.
 *
 * NOT YET WIRED. This must become a dedicated scheduler or a short
 * qualification form before the page goes out — a homepage link is not a
 * conversion path. It is the only value on the page that lives outside the
 * repo, so it is the only thing to change.
 */
export const BOOKING_URL = "https://www.lyzr.ai/";

/** Where "see an example workbench" goes — the live white-label demo. */
export const WORKBENCH_DEMO_URL = "/";
