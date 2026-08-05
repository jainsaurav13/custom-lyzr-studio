/**
 * Account briefs → demo content.
 *
 * A rep pastes the brief they already wrote for a target account; we pull out
 * the industry, the use cases, the systems they run and a couple of headline
 * numbers, and the studio fills itself with agents, knowledge sources and
 * connectors that match. Only the small derived profile travels in the share
 * link — never the brief itself.
 */

export interface BriefProfile {
  industry: string;
  useCases: string[];
  systems: string[];
  metrics: string[];
  note: string;
}

export interface UseCase {
  id: string;
  match: RegExp;
  agent: string;
  role: string;
  category: string;
  tools: string[];
  doc: string;
  suggestion: string;
}

/* ------------------------------------------------------------------ *
 * Libraries
 * ------------------------------------------------------------------ */

export const USE_CASES: UseCase[] = [
  {
    id: "support",
    match: /support|ticket|helpdesk|service desk|csat|contact cent|call cent|complaint/i,
    agent: "Support Triage",
    role: "Classifies inbound tickets, drafts a first reply and routes to the right queue.",
    category: "Customer support",
    tools: ["Zendesk", "Slack", "Jira"],
    doc: "Support macros & escalation matrix.pdf",
    suggestion: "Handle customer support questions for my company",
  },
  {
    id: "churn",
    match: /churn|retention|win.?back|loyalty|attrition/i,
    agent: "Retention Save Desk",
    role: "Spots at-risk accounts and prepares a save offer the rep can send in one click.",
    category: "Revenue",
    tools: ["Salesforce", "Snowflake", "Gmail"],
    doc: "Retention offer matrix FY26.xlsx",
    suggestion: "Flag accounts about to churn and draft a save offer",
  },
  {
    id: "collections",
    match: /collection|dunning|overdue|receivable|arrears|payment reminder/i,
    agent: "Collections Outreach",
    role: "Sequences reminders across email and voice, and books a payment plan when asked.",
    category: "Finance",
    tools: ["Twilio", "NetSuite", "Gmail"],
    doc: "Collections policy & tone of voice.docx",
    suggestion: "Chase overdue invoices without annoying good customers",
  },
  {
    id: "onboarding",
    match: /onboard|kyc|know your customer|activation|provision|sign.?up/i,
    agent: "Onboarding Copilot",
    role: "Walks a new customer through setup, checks documents and escalates exceptions.",
    category: "Customer success",
    tools: ["HubSpot", "SharePoint", "Postgres"],
    doc: "Onboarding checklist & KYC rules.pdf",
    suggestion: "Guide new customers through onboarding and document checks",
  },
  {
    id: "claims",
    match: /claim|underwrit|policyholder|adjuster|settlement/i,
    agent: "Claims Intake",
    role: "Reads the claim and attachments, checks cover and prepares the adjuster's summary.",
    category: "Operations",
    tools: ["Guidewire", "SharePoint", "Snowflake"],
    doc: "Policy wordings & exclusions.pdf",
    suggestion: "Read incoming claims and prepare the adjuster summary",
  },
  {
    id: "rfp",
    match: /rfp|rfi|tender|procurement|questionnaire|bid/i,
    agent: "RFP Responder",
    role: "Answers security and procurement questionnaires from approved sources only.",
    category: "Revenue",
    tools: ["SharePoint", "Google Drive"],
    doc: "Security whitepaper & SOC 2 evidence.pdf",
    suggestion: "Answer security questionnaires from our approved docs",
  },
  {
    id: "fraud",
    match: /fraud|aml|money launder|suspicious|risk scor/i,
    agent: "Fraud Review Assistant",
    role: "Summarises flagged cases with the evidence trail so analysts decide faster.",
    category: "Risk",
    tools: ["Snowflake", "ServiceNow"],
    doc: "AML red flags & escalation SOP.pdf",
    suggestion: "Summarise flagged transactions for the fraud analyst",
  },
  {
    id: "network",
    match: /network|outage|incident|downtime|noc|sre|latency|fault/i,
    agent: "Incident Copilot",
    role: "Correlates alerts, drafts the incident note and suggests the runbook step.",
    category: "Operations",
    tools: ["ServiceNow", "Slack", "Postgres"],
    doc: "Engineering runbooks (space: OPS)",
    suggestion: "Correlate alerts and draft the incident note",
  },
  {
    id: "field",
    match: /field|technician|dispatch|site visit|installation|engineer visit/i,
    agent: "Field Dispatch Assistant",
    role: "Briefs the technician before a visit and files the report after it.",
    category: "Operations",
    tools: ["Salesforce", "Twilio", "Calendly"],
    doc: "Field service handbook.pdf",
    suggestion: "Brief technicians before each site visit",
  },
  {
    id: "sales",
    match: /pipeline|prospect|lead|sdr|quota|cross.?sell|upsell|account executive/i,
    agent: "Pipeline Research",
    role: "Builds a pre-call brief from CRM history, news and open support tickets.",
    category: "Revenue",
    tools: ["Salesforce", "Web Search", "Gmail"],
    doc: "Account plans & battlecards FY26.pdf",
    suggestion: "Build a pre-call brief for every meeting on my calendar",
  },
  {
    id: "marketing",
    match: /campaign|marketing|content|brand voice|seo|newsletter/i,
    agent: "Campaign Copy Assistant",
    role: "Drafts campaign copy in the approved voice and checks claims against legal.",
    category: "Marketing",
    tools: ["Google Drive", "Web Search"],
    doc: "Brand voice & claims guidelines.pdf",
    suggestion: "Draft campaign copy in our approved brand voice",
  },
  {
    id: "hr",
    match: /\bhr\b|employee|recruit|payroll|leave policy|people team|talent/i,
    agent: "People Helpdesk",
    role: "Answers policy questions on leave, benefits and travel with citations.",
    category: "People",
    tools: ["Workday", "SharePoint"],
    doc: "Employee handbook 2026.pdf",
    suggestion: "Answer employee policy questions with citations",
  },
  {
    id: "compliance",
    match: /complian|regulat|audit|gdpr|hipaa|dpdp|sox|governance/i,
    agent: "Compliance Reviewer",
    role: "Reviews content and decisions against the regulatory playbook before they ship.",
    category: "Risk",
    tools: ["SharePoint", "Jira"],
    doc: "Regulatory playbook & control library.pdf",
    suggestion: "Check content against our regulatory playbook",
  },
  {
    id: "billing",
    match: /billing|invoice|charge|refund|subscription|plan change/i,
    agent: "Billing Query Agent",
    role: "Explains charges, spots duplicates and prepares refunds for approval.",
    category: "Finance",
    tools: ["NetSuite", "Zendesk", "Postgres"],
    doc: "Billing rules & refund policy.docx",
    suggestion: "Explain charges and prepare refunds for approval",
  },
  {
    id: "supply",
    match: /supply|inventory|logistics|warehouse|shipment|procure|vendor/i,
    agent: "Supply Signal Watch",
    role: "Watches orders and supplier signals, then flags what will slip and why.",
    category: "Operations",
    tools: ["SAP", "Snowflake", "Slack"],
    doc: "Supplier SLAs & escalation paths.xlsx",
    suggestion: "Flag shipments that are about to slip",
  },
  {
    id: "analytics",
    match: /report|dashboard|analytic|insight|data team|self.?serve|bi\b/i,
    agent: "Insights Analyst",
    role: "Answers business questions over the governed warehouse and shows its working.",
    category: "Data",
    tools: ["Snowflake", "Postgres"],
    doc: "Metric definitions & data dictionary.csv",
    suggestion: "Answer business questions over our warehouse",
  },
  {
    id: "voice",
    match: /ivr|voice|inbound call|outbound call|telephony|speech/i,
    agent: "Voice Front Desk",
    role: "Takes the call, identifies the caller and resolves or routes without a menu tree.",
    category: "Voice",
    tools: ["Twilio", "Salesforce"],
    doc: "Call handling scripts.docx",
    suggestion: "Answer inbound calls and route without a menu tree",
  },
];

export const INDUSTRIES: Record<
  string,
  { label: string; match: RegExp; docs: string[]; systems: string[]; useCases: string[] }
> = {
  banking: {
    label: "Banking & financial services",
    match: /bank|lending|mortgage|credit union|fintech|wealth|brokerage|payments/i,
    docs: ["Product terms & fee schedule.pdf", "KYC and AML procedures.pdf"],
    systems: ["Snowflake", "Salesforce", "ServiceNow"],
    useCases: ["support", "fraud", "collections", "compliance"],
  },
  telecom: {
    label: "Telecom",
    match: /telecom|telco|subscriber|mobile network|broadband|5g|spectrum|operator/i,
    docs: ["Tariff plans & fair-use policy.pdf", "Network incident runbooks"],
    systems: ["Amdocs", "ServiceNow", "Snowflake", "Twilio"],
    useCases: ["support", "churn", "network", "billing"],
  },
  insurance: {
    label: "Insurance",
    match: /insur|policyholder|actuari|reinsur|underwriting/i,
    docs: ["Policy wordings library.pdf", "Claims handling SOP.pdf"],
    systems: ["Guidewire", "SharePoint", "Snowflake"],
    useCases: ["claims", "support", "compliance", "onboarding"],
  },
  healthcare: {
    label: "Healthcare",
    match: /health|hospital|patient|clinic|pharma|provider network|payer/i,
    docs: ["Care pathways & triage protocol.pdf", "Patient privacy policy.pdf"],
    systems: ["Epic", "ServiceNow", "SharePoint"],
    useCases: ["support", "onboarding", "compliance", "analytics"],
  },
  retail: {
    label: "Retail & e-commerce",
    match: /retail|e.?commerce|merchandis|storefront|omnichannel|shopper|basket/i,
    docs: ["Returns & refunds policy.pdf", "Product catalogue export.csv"],
    systems: ["Shopify", "NetSuite", "Snowflake"],
    useCases: ["support", "billing", "supply", "marketing"],
  },
  manufacturing: {
    label: "Manufacturing",
    match: /manufactur|factory|plant|oem|production line|industrial/i,
    docs: ["Maintenance runbooks.pdf", "Quality standards & tolerances.pdf"],
    systems: ["SAP", "Snowflake", "Jira"],
    useCases: ["supply", "field", "analytics", "compliance"],
  },
  logistics: {
    label: "Logistics",
    match: /logistic|freight|courier|last.?mile|fleet|3pl|shipping line/i,
    docs: ["Service levels by lane.xlsx", "Exception handling playbook.pdf"],
    systems: ["SAP", "Twilio", "Postgres"],
    useCases: ["supply", "support", "field", "billing"],
  },
  software: {
    label: "Software & SaaS",
    match: /saas|software|platform|developer|api product|subscription business/i,
    docs: ["Product handbook.pdf", "API reference & limits"],
    systems: ["Jira", "Zendesk", "Snowflake", "Slack"],
    useCases: ["support", "onboarding", "rfp", "sales"],
  },
  energy: {
    label: "Energy & utilities",
    match: /energy|utility|utilities|grid|power|oil|gas|renewable/i,
    docs: ["Outage communication policy.pdf", "Field safety procedures.pdf"],
    systems: ["SAP", "ServiceNow", "Snowflake"],
    useCases: ["field", "network", "billing", "compliance"],
  },
  public: {
    label: "Public sector",
    match: /government|public sector|citizen|ministry|municipal|agency/i,
    docs: ["Citizen service charter.pdf", "Records retention policy.pdf"],
    systems: ["ServiceNow", "SharePoint"],
    useCases: ["support", "compliance", "onboarding", "analytics"],
  },
};

const SYSTEMS = [
  "Salesforce",
  "ServiceNow",
  "Zendesk",
  "Freshdesk",
  "SAP",
  "Oracle",
  "Snowflake",
  "Databricks",
  "Workday",
  "Jira",
  "Confluence",
  "SharePoint",
  "Slack",
  "Teams",
  "Twilio",
  "Genesys",
  "Amdocs",
  "Guidewire",
  "Epic",
  "Shopify",
  "NetSuite",
  "HubSpot",
  "Postgres",
  "MongoDB",
  "Kafka",
  "Tableau",
  "Power BI",
  "Google Drive",
  "Gmail",
  "Outlook",
  "DocuSign",
  "Stripe",
  "Zoho",
  "Marketo",
  "Segment",
];

/* ------------------------------------------------------------------ *
 * Analysis
 * ------------------------------------------------------------------ */

/** Headline numbers a rep would say out loud: "2M subscribers", "$4.2B revenue". */
const METRIC_TAIL = new Set([
  "last",
  "this",
  "next",
  "financial",
  "fiscal",
  "of",
  "in",
  "the",
  "a",
  "an",
  "and",
  "per",
  "at",
  "over",
  "about",
  "roughly",
  "around",
  "were",
  "was",
]);

function tidyMetric(raw: string): string {
  const words = raw.replace(/\s+/g, " ").trim().split(" ");
  while (words.length > 1 && METRIC_TAIL.has(words[words.length - 1].toLowerCase())) words.pop();
  return words.join(" ");
}

function findMetrics(text: string): string[] {
  const out: string[] = [];
  const patterns = [
    /[$₹€£]\s?\d[\d,.]*\s?(?:k|m|bn?|billion|million|crore|lakh)?\b(?:\s+[a-z]{3,14}){0,2}/gi,
    /\b\d[\d,.]*\s?(?:k|m|bn?|million|billion|crore|lakh)?\+?\s+(?:customers?|subscribers?|users?|employees?|stores?|agents?|tickets?|claims?|accounts?|branches?|sites?)\b/gi,
    /\b\d{1,3}(?:\.\d+)?%\s+(?:of\s+)?[a-z]{3,14}(?:\s+[a-z]{3,14})?/gi,
  ];
  patterns.forEach((pattern) => {
    (text.match(pattern) ?? []).forEach((raw) => {
      const clean = tidyMetric(raw);
      if (clean.length > 3 && clean.length < 44 && out.length < 4) {
        if (!out.some((existing) => existing.toLowerCase() === clean.toLowerCase()))
          out.push(clean);
      }
    });
  });
  return out;
}

/** The line the studio shows back so the rep can see what was understood. */
function findNote(text: string, industryLabelText: string): string {
  // Headers ("ACCOUNT BRIEF — Acme") carry no sentence-ending punctuation and
  // would otherwise glue themselves to the first real sentence.
  const body = text
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      const isHeading = trimmed.length < 70 && !/[.!?]$/.test(trimmed);
      const isShouty = trimmed === trimmed.toUpperCase() && trimmed.length < 90;
      return !isHeading && !isShouty;
    })
    .join(" ");

  const sentences = body
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 40 && sentence.length < 200);

  const best =
    sentences.find((sentence) =>
      /priorit|goal|objective|initiative|agent|automat|board|focus/i.test(sentence),
    ) ?? sentences[0];
  return best ?? `${industryLabelText} account brief`;
}

export function analyseBrief(text: string): BriefProfile {
  const body = text.slice(0, 200_000);

  let industry = "";
  let bestScore = 0;
  Object.entries(INDUSTRIES).forEach(([key, entry]) => {
    const score = (body.match(new RegExp(entry.match.source, "gi")) ?? []).length;
    if (score > bestScore) {
      bestScore = score;
      industry = key;
    }
  });

  const scored = USE_CASES.map((useCase) => ({
    id: useCase.id,
    hits: (body.match(new RegExp(useCase.match.source, "gi")) ?? []).length,
  }))
    .filter((entry) => entry.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  let useCases = scored.slice(0, 5).map((entry) => entry.id);
  // A brief that never names a workload still deserves a plausible workspace.
  if (useCases.length < 3 && industry) {
    INDUSTRIES[industry].useCases.forEach((id) => {
      if (useCases.length < 4 && !useCases.includes(id)) useCases.push(id);
    });
  }
  if (!useCases.length) useCases = ["support", "onboarding", "analytics"];

  const systems = SYSTEMS.filter((system) =>
    new RegExp(`\\b${system.replace(/\s+/g, "\\s*")}\\b`, "i").test(body),
  ).slice(0, 8);

  const label = industry ? INDUSTRIES[industry].label : "";

  return {
    industry,
    useCases,
    systems,
    metrics: findMetrics(body),
    note: findNote(body, label || "Account"),
  };
}

/* ------------------------------------------------------------------ *
 * Profile → content
 * ------------------------------------------------------------------ */

export const findUseCase = (id: string) => USE_CASES.find((entry) => entry.id === id);

export function industryLabel(profile: BriefProfile | undefined): string {
  if (!profile?.industry) return "";
  return INDUSTRIES[profile.industry]?.label ?? "";
}

/** Systems worth showing as already connected: whatever the brief named. */
export function briefSystems(profile: BriefProfile | undefined): string[] {
  if (!profile) return [];
  const fromIndustry = profile.industry ? INDUSTRIES[profile.industry].systems : [];
  const fromUseCases = profile.useCases.flatMap((id) => findUseCase(id)?.tools ?? []);
  return [...new Set([...profile.systems, ...fromIndustry, ...fromUseCases])];
}

export function briefDocs(profile: BriefProfile | undefined): string[] {
  if (!profile) return [];
  const fromIndustry = profile.industry ? INDUSTRIES[profile.industry].docs : [];
  const fromUseCases = profile.useCases
    .map((id) => findUseCase(id)?.doc)
    .filter((doc): doc is string => Boolean(doc));
  return [...new Set([...fromUseCases, ...fromIndustry])];
}

export function briefSuggestions(profile: BriefProfile | undefined): string[] {
  if (!profile) return [];
  return profile.useCases
    .map((id) => findUseCase(id)?.suggestion)
    .filter((suggestion): suggestion is string => Boolean(suggestion))
    .slice(0, 3);
}
