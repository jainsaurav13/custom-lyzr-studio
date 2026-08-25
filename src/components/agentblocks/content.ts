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
  label: "Trusted by",
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
  /** The block's colour: the poster's hue, deepened so white type clears it. */
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
    color: "#B76D2B",
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
    color: "#737A80",
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
    color: "#A47626",
  },
  {
    key: "identity",
    num: "08",
    name: "Identity & Access",
    blurb: "Users, roles and trust with SSO support.",
    icon: "UserCheck",
    color: "#6F8366",
  },
  {
    key: "permissions",
    num: "09",
    name: "Permissions",
    blurb: "Granular access control across agents and data.",
    icon: "Lock",
    color: "#9A6EA8",
  },
  {
    key: "audit",
    num: "10",
    name: "Audit Trail",
    blurb: "Immutable records for every action and change.",
    icon: "FileClock",
    color: "#9D783D",
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
    color: "#7A8344",
  },
  {
    key: "safety",
    num: "13",
    name: "Safety Guardrails",
    blurb: "Built-in compliance, content filtering and risk controls.",
    icon: "ShieldAlert",
    color: "#A7743B",
  },
  {
    key: "scale",
    num: "14",
    name: "Scalable Runtime",
    blurb: "Auto-scale infrastructure built for enterprise demand.",
    icon: "Boxes",
    color: "#7C7268",
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

/**
 * The ownership promise, which is the only question an ISV's own lawyers will
 * ask twice: what, exactly, do we own when we build our product on someone
 * else's infrastructure. The section answers it as a split rather than a list
 * of reasons, because the shape of the split is the argument.
 */
export const OWNERSHIP = {
  eyebrow: "The promise",
  title: { lead: "Your product.", accent: "Your IP." },
  lede: "AgentBlocks powers the infrastructure underneath. Everything that makes the product yours stays yours.",

  yours: {
    label: "Yours, outright",
    items: [
      { item: "Agents, prompts & workflows", note: "Everything you or your customers build." },
      {
        item: "Your data & customer data",
        note: "Never used for training. Never leaves your deployment boundary.",
      },
      { item: "Domain intelligence", note: "Your models, knowledge and evaluations." },
      {
        item: "Brand & customer relationship",
        note: "Your brand, pricing, contracts and customers.",
      },
      { item: "Deployment & credentials", note: "Your cloud, models, credentials and admins." },
    ],
  },

  ours: {
    label: "Lyzr, licensed to you",
    items: [
      { item: "AgentBlocks platform", note: "Licensed for the term of the agreement." },
      {
        item: "Platform improvements",
        note: "Updates and improvements included throughout the agreement.",
      },
    ],
  },

  protections: {
    label: "Your protections",
    items: [
      {
        title: "No training on your data",
        body: "Your data is never used to train our models or anyone else’s.",
      },
      {
        title: "Open export path",
        body: "Agents, configurations, evaluations and audit history remain exportable.",
      },
      {
        title: "Source escrow available",
        body: "Protection for the platform code your product depends on.",
      },
    ],
  },
};

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

/**
 * The last section is the conversion path, so the form lives in it rather than
 * behind a link. The agenda stays beside the form: it is what the reader is
 * agreeing to spend an hour on.
 */
export const SESSION = {
  eyebrow: "Next step",
  title: { lead: "Own the product.", accent: "Skip the agent infrastructure build." },
  lede: "Book a working session with one of our technical architects. Bring your architecture; leave with a plan for what you keep, what AgentBlocks adds, and how you launch under your brand.",
  agendaLabel: "What we cover, in about an hour",
  agenda: [
    { step: "01", title: "Scope", body: "Full platform, or the specific blocks you are missing." },
    {
      step: "02",
      title: "Architecture",
      body: "What you keep, what we connect, what we add, and where it deploys.",
    },
    { step: "03", title: "Commercials", body: "OEM rights, pricing, ownership, support and SLA." },
    { step: "04", title: "Launch plan", body: "Engagement model, owners and milestones." },
  ],
  form: {
    title: "Book a demo with a technical architect",
    note: "An architect, not a sales engineer. We reply within one business day.",
    stageLabel: "Where are you today?",
    stages: [
      "Exploring, nothing built yet",
      "Prototypes in progress",
      "Agent platform in production",
      "Extending an existing platform",
    ],
    submit: "Book my session",
    privacy: "We use these details to prepare for the session and nothing else.",
  },
};

export const NAV_LINKS = [
  { href: "#production", label: "In production" },
  { href: "#problem", label: "The problem" },
  { href: "#blocks", label: "What’s inside" },
  { href: "#ownership", label: "Ownership" },
  { href: "#start", label: "Get started" },
  { href: "#faq", label: "FAQ" },
];

/** The words on every call to action. Kept here so all four stay in step. */
export const CTA_LABEL = "Accelerate your agent roadmap";

/** Every CTA on the page scrolls to the form in the closing section. */
export const BOOKING_URL = "#session";

/**
 * Where the demo request is POSTed.
 *
 * NOT YET WIRED. This must become a real endpoint before the page goes out: a
 * HubSpot/Marketo form URL, or an internal route that writes to the CRM. It is
 * the only value on the page that lives outside the repo.
 */
export const FORM_ENDPOINT = "https://example.com/agentblocks-demo-request";
