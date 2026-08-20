/**
 * Everything the AgentBlocks page says, in one place.
 *
 * The page is a sales asset before it is code: the copy changes far more often
 * than the layout, so the wording lives here as data and the section components
 * stay dumb.
 *
 * Order of the page: what it is and who it is for → who already runs it → the
 * problem → the infrastructure that answers it → why this one → how to start →
 * FAQ → call to action.
 *
 * Spelling is British throughout, matching the rest of this repo's copy.
 */

/* ------------------------------------------------------------------ *
 * 1 — What it is, who it is for
 * ------------------------------------------------------------------ */

/**
 * The definition, verbatim, as the cover line. It is split into three parts so
 * the middle clause — the claim that actually differentiates the product — can
 * carry the serif emphasis without breaking the sentence.
 */
export const HERO = {
  eyebrow: "For ISVs and software platforms",
  definition: {
    lead: "Launch a",
    emphasis: "fully sovereign, white-labelled",
    tail: "enterprise AI agent platform.",
  },
  sub: "With AgentBlocks, adopt the complete platform or embed production-grade SDKs into your existing product, while maintaining your own brand.",
  chips: ["Sovereign deployment", "Your brand, end to end", "Your existing agents, connected"],
};

/* ------------------------------------------------------------------ *
 * 2 — Credibility
 * ------------------------------------------------------------------ */

export const CREDIBILITY = {
  eyebrow: "Already in production",
  title: "Software companies are shipping on this today.",
  lede: "Not a reference architecture. The same infrastructure runs behind enterprise products your customers’ teams already use every day.",
  stat: { value: "1M+", label: "agent instances deployed on the Lyzr platform" },
};

export interface Partner {
  key: string;
  name: string;
  meta: string;
  status: string;
  headline: string;
  facts: Array<{ label: string; value: string }>;
}

export const PARTNERS: Partner[] = [
  {
    key: "anaplan",
    name: "Anaplan",
    meta: "ISV · enterprise planning platform",
    status: "Embedded OEM",
    headline: "The Anaplan Agentic Workbench and Marketplace run on AgentBlocks.",
    facts: [
      { label: "Stays theirs", value: "Platform, data model, customer UX and brand" },
      { label: "AgentBlocks provides", value: "The white-labelled lifecycle behind both surfaces" },
      { label: "Runs in", value: "Anaplan cloud, plus customer-managed AWS, Azure or GCP" },
    ],
  },
  {
    key: "wtw",
    name: "WTW",
    meta: "Enterprise · global advisory & broking",
    status: "In production",
    headline: "Governed advisory agents, on a two-year agreement.",
    facts: [
      { label: "Stays theirs", value: "Data, domain models and advisory methodology" },
      { label: "AgentBlocks provides", value: "Governance for retirement advisory and billing" },
      {
        label: "Result",
        value: "Advisory usage moved off consumer ChatGPT and back into WTW’s product",
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * 3 — The problem
 * ------------------------------------------------------------------ */

export const PROBLEM = {
  eyebrow: "The problem",
  title: "Two weeks to build. A year to ship.",
  lede: "Most software companies are already building or extending their agent platforms. The challenge isn’t whether they can build the production infrastructure around them, it’s whether they should.",
  /** What teams end up building instead of product. */
  burden: [
    "A registry, because nobody knows what is running or who owns it",
    "An evaluation harness, because “it looked fine in the demo” is not a release gate",
    "Guardrails, because the agent can reach real systems and real data",
    "Versioning and rollback, because a bad prompt is now a production incident",
    "Per-tenant isolation, because your customers will not share a data boundary",
    "Traces and cost attribution, because someone has to answer for the bill",
  ],
  punchline:
    "That is nine to eighteen months of platform engineering that no customer will ever pay you for.",
  answer: {
    label: "The better roadmap",
    title: "Build what differentiates you. License what doesn’t.",
    body: "AgentBlocks provides the production infrastructure your agent platform needs, so your engineers can focus on the AI products and experiences your customers actually pay for.",
    cta: "See the AgentBlocks layer",
  },
};

/* ------------------------------------------------------------------ *
 * 4 — The infrastructure
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
      "The screens your customers actually use, shipped in your product’s shell rather than ours.",
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
      "A visual builder your customers, or your own delivery team, use to create agents without writing a platform.",
    customerSees: "They describe the work; an agent is drafted, tested and published.",
    bullets: [
      "Describe-to-build authoring, plus full control for engineers",
      "Tools, knowledge and memory attached without custom plumbing",
      "Reusable blueprints so the tenth agent costs less than the first",
      "Every draft lands in the registry, so nothing ships off the books",
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
      "Evidence your customers’ risk and compliance teams will accept",
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
      "Where the work actually happens: in your cloud, or inside your customer’s own AWS, Azure or GCP.",
    customerSees: "Their data stays where their policy says it has to stay.",
    bullets: [
      "Deploy to your cloud or the customer’s environment",
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
    summary: "What every agent did, what it cost and whether it was any good, per tenant.",
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

/* ------------------------------------------------------------------ *
 * 5 — Why AgentBlocks
 * ------------------------------------------------------------------ */

export const REASONS = [
  {
    key: "brand",
    title: "It ships as your product, not ours",
    body: "OEM is the design, not a rebrand toggle. Your customers see your brand, your UX and your pricing. They never learn our name, and the relationship stays yours.",
  },
  {
    key: "keep",
    title: "It works with what you already run",
    body: "Model-, framework- and cloud-agnostic. It governs agents your team built elsewhere just as readily as ones created in the builder. Nothing is ripped out to make room.",
  },
  {
    key: "where",
    title: "It runs where your customer requires",
    body: "Your cloud, or inside the customer’s own AWS, Azure or GCP. A data boundary you can put in front of a procurement team without a caveat.",
  },
  {
    key: "modular",
    title: "You take only what you are missing",
    body: "Already have a runtime but no evaluation? Take evaluation. Starting from nothing? Take the lot. The blocks are priced and adopted independently.",
  },
  {
    key: "governed",
    title: "Governance is the default, not a roadmap item",
    body: "Every agent is registered, evaluated, versioned and audited before it reaches a customer. The evidence exists because the platform produced it, not because someone wrote a document.",
  },
  {
    key: "exit",
    title: "There is a way out",
    body: "An export path ships with every block. The commercial argument for staying should be that it works, never that leaving is impossible.",
  },
];

/* ------------------------------------------------------------------ *
 * 6 — How to get started
 * ------------------------------------------------------------------ */

export const ENGAGEMENTS = [
  {
    key: "self-serve",
    step: "01",
    support: "Self-serve",
    title: "License and operate",
    body: "Your team embeds the platform, or selected blocks, through APIs and SDKs. Support and SLA from Lyzr; everything else is yours.",
    fit: "Mature product and engineering teams",
  },
  {
    key: "integrate",
    step: "02",
    support: "Targeted support",
    title: "Integrate with us",
    body: "A small launch team connects the blocks you select to your existing architecture and rolls out on your release process, then steps back.",
    fit: "Teams with prototypes, or an existing platform to extend",
  },
  {
    key: "build",
    step: "03",
    support: "Full support",
    title: "Build with us",
    body: "A full launch team, product and engineering working alongside yours, ships your first agentic product end to end, then hands it over.",
    fit: "Teams launching their first agentic product",
  },
];

/* ------------------------------------------------------------------ *
 * 7 — FAQ
 * ------------------------------------------------------------------ */

export interface Faq {
  q: string;
  a: string;
  /** Set on the one answer that also renders the comparison table. */
  table?: boolean;
}

export const FAQS: Faq[] = [
  {
    q: "Do we have to replace our current stack?",
    a: "No. Your frameworks, models, cloud, IAM, CI/CD and telemetry stay exactly as they are. AgentBlocks connects to them through supported adapters and supplies only the modules you select. Most customers keep everything and add two or three blocks.",
  },
  {
    q: "Can we bring agents we have already built?",
    a: "Yes, that is the common case. Agents built on other frameworks are connected and then governed like any other: registered, evaluated, versioned and observable. You keep your prompts, your orchestration and your domain logic.",
  },
  {
    q: "Where does it run, and where does customer data live?",
    a: "In your cloud, or inside your customer’s own AWS, Azure or GCP. Conversation history, traces and logs stay inside whichever boundary you deploy into. This is usually the first question an enterprise procurement team asks, and it is why deployment is configurable rather than fixed.",
  },
  {
    q: "Will our customers know they are using Lyzr?",
    a: "No. The workbench, the marketplace and the builder render in your shell: your palette, typography, component language, domain. Lyzr appears in your contract, not in your product.",
  },
  {
    q: "How is this different from building it ourselves, using a hyperscaler, or buying point tools?",
    a: "Those are real options, and most customers keep some of them. The difference is what happens at the seams: brand, cross-stack governance and where it deploys.",
    table: true,
  },
  {
    q: "What happens if we want to leave?",
    a: "Every block ships with an export path, and it is part of the agreement rather than a favour. Agents, configuration and audit history come with you. We would rather win the renewal on the product than on switching costs.",
  },
  {
    q: "Who runs it in production?",
    a: "Lyzr operates the infrastructure under support and SLA: runtime, governance, deployment and observability. You own the product, the roadmap and the customer relationship. If you would rather run it yourself, the self-serve model exists for exactly that.",
  },
  {
    q: "What does the commercial arrangement look like?",
    a: "OEM licensing, priced by the blocks you take and the scale you run them at, with the ownership split written into the agreement. The specifics depend on scope, so they are set in the architecture session rather than guessed at here.",
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
    build: "Yes, you build all of it",
    hyperscaler: "Their console, their ecosystem",
    point: "Vendor-branded surfaces",
    agentblocks: "White-label and OEM by design",
  },
  {
    question: "Works with agents you already built",
    build: "Yes, plus everything else",
    hyperscaler: "Strongest on their own stack",
    point: "One tool per problem",
    agentblocks: "Governs heterogeneous stacks; every agent has an export path",
  },
  {
    question: "Runs in your customer’s environment",
    build: "If you engineer it",
    hyperscaler: "Their cloud",
    point: "Mostly SaaS-only",
    agentblocks: "Your cloud, or the customer’s AWS / Azure / GCP",
  },
  {
    question: "Time before the first customer sees it",
    build: "Nine to eighteen months of platform work first",
    hyperscaler: "Fast to prototype, slow to white-label",
    point: "Fast per tool, slow to assemble",
    agentblocks: "The infrastructure already exists, so you build the product",
  },
];

/* ------------------------------------------------------------------ *
 * 8 — Call to action
 * ------------------------------------------------------------------ */

export const SESSION_AGENDA = [
  { step: "01", title: "Scope", body: "Full platform, or the specific blocks you are missing." },
  {
    step: "02",
    title: "Architecture",
    body: "What you keep, what we connect, what we add, and where it deploys.",
  },
  { step: "03", title: "Commercials", body: "OEM rights, pricing, ownership, support and SLA." },
  { step: "04", title: "Launch plan", body: "Engagement model, owners and milestones." },
];

export const NAV_LINKS = [
  { href: "#partners", label: "Customers" },
  { href: "#problem", label: "The problem" },
  { href: "#blocks", label: "What’s inside" },
  { href: "#why", label: "Why AgentBlocks" },
  { href: "#start", label: "Get started" },
  { href: "#faq", label: "FAQ" },
];

/** The words on every call to action. Kept here so all four stay in step. */
export const CTA_LABEL = "Accelerate your agent roadmap";

/**
 * Every CTA on the page points here.
 *
 * NOT YET WIRED. This must become a dedicated scheduler or a short
 * qualification form before the page goes out — a homepage link is not a
 * conversion path. It is the only value on the page that lives outside the
 * repo, so it is the only thing to change.
 */
export const BOOKING_URL = "https://www.lyzr.ai/";
