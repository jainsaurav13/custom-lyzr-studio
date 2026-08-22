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
 * Spelling is British throughout, matching the rest of this repo's copy, with
 * one exception: "white-labeled" is the spelling the market searches for.
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
    emphasis: "fully sovereign, white-labeled",
    tail: "enterprise AI agent platform.",
  },
  sub: "With AgentBlocks, adopt the complete platform or embed production-grade SDKs into your existing product, while maintaining your own brand.",
  chips: ["Sovereign deployment", "Your brand, end to end", "Your existing agents, connected"],
};

/* ------------------------------------------------------------------ *
 * 2 — Credibility
 * ------------------------------------------------------------------ */

/**
 * The credibility block carries two kinds of proof and nothing else: the
 * enterprises whose products already run on Lyzr, and one flagship OEM an ISV
 * can see themselves in.
 */
export const CREDIBILITY = {
  eyebrow: "Agents in production",
  title: "Already in production under Fortune 500s.",
};

/**
 * The flagship OEM reference, described rather than named: the account is not
 * cleared for public use yet, so the page carries the shape of the deal and
 * offers the name under NDA.
 */
export const FLAGSHIP = {
  label: "The reference that matters for ISVs",
  headline: {
    lead: "A billion-dollar enterprise planning SaaS is using Lyzr’s infrastructure",
    accent: "to power their agent platform.",
  },
  facts: [
    {
      label: "What their customers see",
      value: "Their brand, their product, their agent workbench and marketplace",
    },
    {
      label: "What stays theirs",
      value: "The platform, the data model, the customer relationship and the roadmap",
    },
    {
      label: "What Lyzr provides",
      value: "The white-labeled build, governance and runtime layer underneath",
    },
    {
      label: "Where it runs",
      value: "Their own cloud, and their customers’ managed AWS, Azure or GCP",
    },
  ],
  punchline:
    "They had the engineers to build this layer themselves. They licensed it and shipped the product instead.",
};

/** The logo strip: enterprises whose products already run on Lyzr. */
export const TRUSTED_BY = {
  label: "Running on Lyzr underneath",
  names: ["JPMorganChase", "WTW", "USA.gov", "Verifone", "KPMG"],
};

/* ------------------------------------------------------------------ *
 * 3 — The problem
 * ------------------------------------------------------------------ */

/**
 * The section is a fork in the road, so the data is shaped like one: a ledger
 * of what building it yourself costs, and the alternative, each closing on a
 * "total" line. The six items are deliberately the hard ones: a registry, a
 * guardrail filter, prompt versioning and tracing are all commodity now, and
 * claiming credit for them invites the reader to dismiss the rest.
 */
export const PROBLEM = {
  eyebrow: "The problem",
  title: "The agent is the easy part.",
  lede: "You’re already building or extending your agent platform. The question isn’t whether you can build the production infrastructure it needs.",
  ledeKicker: "It’s whether you should.",

  build: {
    label: "If you build it yourself",
    lede: "The six hardest pieces, and not one of them is what your customers buy.",
    items: [
      {
        item: "Per-tenant isolation",
        need: "No enterprise customer will share a data boundary with another",
      },
      {
        item: "Customer-managed deployment",
        need: "Your largest accounts will want it running in their own cloud",
      },
      {
        item: "Delegated permissions",
        need: "The agent inherits what each user is allowed to do, in every system",
      },
      {
        item: "Regression gating",
        need: "The model changes underneath you, and customers notice first",
      },
      { item: "Audit evidence", need: "Their risk team audits you, not your model vendor" },
      { item: "Per-tenant cost control", need: "Token spend is your cost of goods now" },
    ],
    total: "Nine to eighteen months, and no customer will ever pay you for it.",
  },

  withLabel: "With AgentBlocks",

  answer: {
    label: "The better roadmap",
    title: { lead: "Build what differentiates you.", accent: "License what doesn’t." },
    body: "AgentBlocks provides the production infrastructure your agent platform needs, so your engineers can focus on the AI products and experiences your customers actually pay for.",
    total: "All six, from day one.",
    cta: "See the AgentBlocks layer",
  },
};

/* ------------------------------------------------------------------ *
 * 4 — The infrastructure
 * ------------------------------------------------------------------ */

export interface Block {
  key: string;
  num: string;
  name: string;
  /** One line, as an executive would repeat it. */
  blurb: string;
  /** Name of the lucide icon the card draws. Resolved in `sections.tsx`. */
  icon: string;
  /** The face colour of this block's carton, from the AgentBlocks poster. */
  color: string;
}

/** The catalogue: every block that can be licensed, in the order it is sold. */
export const BLOCKS: Block[] = [
  {
    key: "surfaces",
    num: "01",
    name: "Workbench & Marketplace",
    blurb: "OEM surfaces to package and deliver agent experiences.",
    icon: "Store",
    color: "#C0503C",
  },
  {
    key: "builder",
    num: "02",
    name: "Agent Builder",
    blurb: "White-labeled tools to design and ship production agents.",
    icon: "Wrench",
    color: "#D07A2E",
  },
  {
    key: "registry",
    num: "03",
    name: "Registry & Governance",
    blurb: "Record, policy and audit for every agent.",
    icon: "ShieldCheck",
    color: "#4F6F63",
  },
  {
    key: "evaluation",
    num: "04",
    name: "Evaluation & Guardrails",
    blurb: "Quality gates and safety before launch.",
    icon: "Gauge",
    color: "#CBC3B6",
  },
  {
    key: "runtime",
    num: "05",
    name: "Runtime & Memory",
    blurb: "Secure execution with data boundary and context.",
    icon: "Database",
    color: "#C4544A",
  },
  {
    key: "deployment",
    num: "06",
    name: "Deployment & Rollback",
    blurb: "Versioned releases with safe rollback at any time.",
    icon: "CloudUpload",
    color: "#4C7A82",
  },
  {
    key: "observability",
    num: "07",
    name: "Observability",
    blurb: "Runs, cost and quality insights in real time.",
    icon: "LineChart",
    color: "#DDA23C",
  },
  {
    key: "identity",
    num: "08",
    name: "Identity & Access",
    blurb: "Users, roles and trust with SSO support.",
    icon: "UserCheck",
    color: "#8A9C82",
  },
  {
    key: "permissions",
    num: "09",
    name: "Permissions",
    blurb: "Granular access control across agents and data.",
    icon: "Lock",
    color: "#B79BC0",
  },
  {
    key: "audit",
    num: "10",
    name: "Audit Trail",
    blurb: "Immutable records for every action and change.",
    icon: "FileClock",
    color: "#D6C6AC",
  },
  {
    key: "integrations",
    num: "11",
    name: "Tool Integrations",
    blurb: "Native connectors to tools, APIs and enterprise systems.",
    icon: "Puzzle",
    color: "#5E82A0",
  },
  {
    key: "voice",
    num: "12",
    name: "Voice AI",
    blurb: "Conversational agents with voice input and output.",
    icon: "Mic",
    color: "#9BA55C",
  },
  {
    key: "safety",
    num: "13",
    name: "Safety Guardrails",
    blurb: "Built-in compliance, content filtering and risk controls.",
    icon: "ShieldAlert",
    color: "#C39A6B",
  },
  {
    key: "scale",
    num: "14",
    name: "Scalable Runtime",
    blurb: "Auto-scale infrastructure built for enterprise demand.",
    icon: "Boxes",
    color: "#BFBAB2",
  },
];

/** The claim that has to survive the catalogue: nothing here replaces you. */
export const WIRED_IN = {
  title: "Wired in. Not rebuilt.",
  body: "Your data, tools and agents stay yours.",
};

/** Bottom of the stack: what stays yours, untouched. */
export const YOUR_STACK = [
  { label: "Frameworks", icon: "Code2" },
  { label: "Models", icon: "Cpu" },
  { label: "Cloud", icon: "Cloud" },
  { label: "Databases", icon: "Database" },
  { label: "Telemetry", icon: "Activity" },
  { label: "CI/CD", icon: "GitBranch" },
  { label: "IAM & SSO", icon: "KeyRound" },
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

/**
 * The three OEM engagement models, as one progression: how much of the stack
 * Lyzr supplies grows from a few blocks, to the whole platform, to the platform
 * plus the people who build the workflows on it. `layers` drives the little
 * architecture diagram on each card, so the picture and the words cannot drift.
 */
export const ENGAGEMENTS = [
  {
    key: "modular",
    step: "01",
    tier: "Modular",
    title: "Fill the gaps in your platform",
    fit: "You already have an agent platform and need specific production capabilities.",
    gets: [
      "License only the AgentBlocks you need",
      "Integrate through APIs and SDKs",
      "Keep your existing architecture and platform",
    ],
    /** Blocks lit in the diagram, out of six, and whether the team layer shows. */
    lit: 2,
    team: false,
    platformLabel: "Individual AgentBlocks",
    takeaway: { lead: "Your platform.", accent: "Our blocks." },
  },
  {
    key: "platform",
    step: "02",
    tier: "Platform",
    title: "White-label the complete agent platform",
    fit: "You want to launch or extend an agent platform without building the infrastructure underneath it.",
    gets: [
      "Complete white-labeled Lyzr agent platform",
      "Integration into your existing product and architecture",
      "Implementation support from Lyzr engineers",
    ],
    lit: 6,
    team: false,
    platformLabel: "The complete platform",
    takeaway: { lead: "Your product.", accent: "Our platform." },
  },
  {
    key: "turnkey",
    step: "03",
    tier: "Turnkey",
    title: "Launch complete agentic solutions",
    fit: "You want the platform and the expertise to identify, build and launch agentic workflows for your customers.",
    gets: [
      "Complete white-labeled Lyzr agent platform",
      "End-to-end implementation",
      "Applied AI team to scope and build agentic workflows",
      "Support through production launch",
    ],
    lit: 6,
    team: true,
    platformLabel: "The complete platform",
    takeaway: { lead: "Your customers.", accent: "We help build the solution." },
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
  { href: "#production", label: "In production" },
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
