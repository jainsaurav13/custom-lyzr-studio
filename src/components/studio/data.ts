/**
 * Mock content for the studio. Most of it is generated from the prospect's
 * company name so a branded demo reads like their own workspace, not ours.
 */

export interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  status: "live" | "draft" | "paused";
  runs: number;
  successRate: number;
  latency: string;
  updated: string;
  tools: string[];
  knowledge: string[];
  owner: string;
  category: string;
}

export interface StoreAgent {
  id: string;
  name: string;
  publisher: string;
  description: string;
  category: string;
  installs: string;
  rating: number;
}

export interface KnowledgeDoc {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "URL" | "CSV" | "Confluence";
  chunks: number;
  status: "indexed" | "processing" | "failed";
  size: string;
  updated: string;
}

export interface ToolIntegration {
  id: string;
  name: string;
  category: string;
  connected: boolean;
  description: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  tone: "neutral" | "success" | "warning";
}

export const MODELS = [
  "GPT-5.1",
  "Claude Opus 4.6",
  "Gemini 3 Pro",
  "Llama 4 70B",
  "Mistral Large 3",
  "Azure GPT-4.1",
];

export function makeAgents(company: string): Agent[] {
  return [
    {
      id: "support-triage",
      name: `${company} Support Triage`,
      role: "Classifies inbound tickets, drafts a first reply and routes to the right queue.",
      model: "GPT-5.1",
      status: "live",
      runs: 18420,
      successRate: 96,
      latency: "1.2s",
      updated: "12 min ago",
      tools: ["Zendesk", "Slack", "Jira"],
      knowledge: [`${company} Help Centre`, "Refund policy v4"],
      owner: "Priya N.",
      category: "Customer support",
    },
    {
      id: "rfp-responder",
      name: "RFP Responder",
      role: "Answers security and procurement questionnaires from approved sources only.",
      model: "Claude Opus 4.6",
      status: "live",
      runs: 942,
      successRate: 92,
      latency: "3.4s",
      updated: "2 hours ago",
      tools: ["SharePoint", "Google Drive"],
      knowledge: ["Security whitepaper", "SOC 2 evidence pack"],
      owner: "Daniel R.",
      category: "Revenue",
    },
    {
      id: "onboarding-copilot",
      name: `${company} Onboarding Copilot`,
      role: "Walks new customers through setup and books the right specialist when stuck.",
      model: "GPT-5.1",
      status: "live",
      runs: 6310,
      successRate: 94,
      latency: "0.9s",
      updated: "Yesterday",
      tools: ["HubSpot", "Calendly", "Postgres"],
      knowledge: [`${company} product handbook`],
      owner: "Ana M.",
      category: "Customer success",
    },
    {
      id: "finance-close",
      name: "Month-End Close Analyst",
      role: "Reconciles ledgers, flags variances above threshold and drafts the commentary.",
      model: "Claude Opus 4.6",
      status: "paused",
      runs: 214,
      successRate: 89,
      latency: "6.1s",
      updated: "3 days ago",
      tools: ["Snowflake", "NetSuite", "Excel"],
      knowledge: ["Close checklist Q3"],
      owner: "Marcus T.",
      category: "Finance",
    },
    {
      id: "field-sales-brief",
      name: "Field Sales Briefing",
      role: "Builds a pre-call brief from CRM history, news and open support tickets.",
      model: "Gemini 3 Pro",
      status: "live",
      runs: 3877,
      successRate: 97,
      latency: "2.0s",
      updated: "4 hours ago",
      tools: ["Salesforce", "Web search", "Gmail"],
      knowledge: ["Account plans FY26"],
      owner: "Priya N.",
      category: "Revenue",
    },
    {
      id: "policy-qa",
      name: "HR Policy Q&A",
      role: "Answers employee questions on leave, benefits and travel with citations.",
      model: "Llama 4 70B",
      status: "draft",
      runs: 0,
      successRate: 0,
      latency: "—",
      updated: "Just now",
      tools: ["Workday"],
      knowledge: ["Employee handbook 2026"],
      owner: "You",
      category: "People",
    },
  ];
}

export function makeStoreAgents(company: string): StoreAgent[] {
  return [
    {
      id: "kb-builder",
      name: "Knowledge Base Builder",
      publisher: "Lyzr",
      description: "Crawls your docs, de-duplicates and keeps the index fresh nightly.",
      category: "Knowledge",
      installs: "12.4k",
      rating: 4.8,
    },
    {
      id: "sdr",
      name: "Outbound SDR",
      publisher: "Lyzr",
      description: "Researches accounts, writes the first touch and books meetings.",
      category: "Revenue",
      installs: "9.1k",
      rating: 4.6,
    },
    {
      id: "invoice",
      name: "Invoice Processor",
      publisher: "Lyzr Labs",
      description: "Extracts line items from PDFs and posts them to your ERP.",
      category: "Finance",
      installs: "7.8k",
      rating: 4.7,
    },
    {
      id: "qa-eval",
      name: "Conversation QA Scorer",
      publisher: "Lyzr",
      description: "Grades every transcript against your own rubric and flags drift.",
      category: "Quality",
      installs: "5.2k",
      rating: 4.9,
    },
    {
      id: "sql",
      name: "Text-to-SQL Analyst",
      publisher: "Lyzr",
      description: "Answers business questions over a governed warehouse schema.",
      category: "Data",
      installs: "11.0k",
      rating: 4.5,
    },
    {
      id: "compliance",
      name: "Policy Compliance Checker",
      publisher: `${company} internal`,
      description: "Reviews content against your regulatory playbook before it ships.",
      category: "Risk",
      installs: "Private",
      rating: 5,
    },
  ];
}

export function makeDocs(company: string): KnowledgeDoc[] {
  return [
    {
      id: "d1",
      name: `${company} product handbook.pdf`,
      type: "PDF",
      chunks: 1284,
      status: "indexed",
      size: "8.4 MB",
      updated: "Today",
    },
    {
      id: "d2",
      name: "Refund & returns policy v4.docx",
      type: "DOCX",
      chunks: 96,
      status: "indexed",
      size: "412 KB",
      updated: "Today",
    },
    {
      id: "d3",
      name: `help.${company.toLowerCase().replace(/\s+/g, "")}.com/*`,
      type: "URL",
      chunks: 3910,
      status: "indexed",
      size: "—",
      updated: "2 hours ago",
    },
    {
      id: "d4",
      name: "Security whitepaper 2026.pdf",
      type: "PDF",
      chunks: 240,
      status: "indexed",
      size: "2.1 MB",
      updated: "Yesterday",
    },
    {
      id: "d5",
      name: "Enterprise pricing matrix.csv",
      type: "CSV",
      chunks: 58,
      status: "processing",
      size: "180 KB",
      updated: "1 min ago",
    },
    {
      id: "d6",
      name: "Engineering runbooks (space: OPS)",
      type: "Confluence",
      chunks: 1502,
      status: "indexed",
      size: "—",
      updated: "3 days ago",
    },
    {
      id: "d7",
      name: "Legacy FAQ export.pdf",
      type: "PDF",
      chunks: 0,
      status: "failed",
      size: "22 MB",
      updated: "5 days ago",
    },
  ];
}

export const TOOLS: ToolIntegration[] = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    connected: true,
    description: "Read and write opportunities, contacts and cases.",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Messaging",
    connected: true,
    description: "Post updates and run agents from a channel.",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    category: "Data",
    connected: true,
    description: "Governed SQL access with row-level policies.",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Email",
    connected: true,
    description: "Draft, send and thread replies on behalf of a user.",
  },
  {
    id: "jira",
    name: "Jira",
    category: "Ticketing",
    connected: false,
    description: "Create and transition issues from agent runs.",
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    category: "Documents",
    connected: true,
    description: "Index sites and libraries with permission mirroring.",
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    category: "ITSM",
    connected: false,
    description: "Open incidents and fetch CMDB records.",
  },
  {
    id: "sap",
    name: "SAP",
    category: "ERP",
    connected: false,
    description: "Read master data and post journal entries.",
  },
  {
    id: "postgres",
    name: "Postgres",
    category: "Data",
    connected: true,
    description: "Query application databases with a read replica.",
  },
  {
    id: "websearch",
    name: "Web Search",
    category: "Research",
    connected: true,
    description: "Grounded search with domain allow-lists.",
  },
  {
    id: "twilio",
    name: "Twilio",
    category: "Voice & SMS",
    connected: false,
    description: "Give an agent a phone number.",
  },
  {
    id: "docusign",
    name: "DocuSign",
    category: "Contracts",
    connected: false,
    description: "Prepare and track envelopes.",
  },
];

export function makeActivity(company: string): ActivityItem[] {
  return [
    {
      id: "a1",
      actor: "Priya N.",
      action: "published version 12 of",
      target: `${company} Support Triage`,
      time: "12 min ago",
      tone: "success",
    },
    {
      id: "a2",
      actor: "Guardrail",
      action: "blocked a response containing",
      target: "customer PII",
      time: "38 min ago",
      tone: "warning",
    },
    {
      id: "a3",
      actor: "Ana M.",
      action: "connected",
      target: "HubSpot",
      time: "1 hour ago",
      tone: "neutral",
    },
    {
      id: "a4",
      actor: "Knowledge sync",
      action: "re-indexed",
      target: `help.${company.toLowerCase().replace(/\s+/g, "")}.com`,
      time: "2 hours ago",
      tone: "neutral",
    },
    {
      id: "a5",
      actor: "Daniel R.",
      action: "ran an evaluation on",
      target: "RFP Responder",
      time: "4 hours ago",
      tone: "success",
    },
    {
      id: "a6",
      actor: "Marcus T.",
      action: "paused",
      target: "Month-End Close Analyst",
      time: "3 days ago",
      tone: "warning",
    },
  ];
}

/** 30 days of conversation volume — deterministic so the demo never jitters. */
export const USAGE_SERIES: Array<{ day: string; value: number }> = Array.from(
  { length: 30 },
  (_, i) => {
    const base = 620 + i * 24;
    const wave = Math.sin(i / 2.4) * 130 + Math.sin(i / 6) * 90;
    const weekend = i % 7 === 5 || i % 7 === 6 ? -230 : 0;
    return {
      day: `${((i + 6) % 30) + 1}`,
      value: Math.max(180, Math.round(base + wave + weekend)),
    };
  },
);

export const AGENT_VOLUME = [
  { name: "Support Triage", value: 18420 },
  { name: "Onboarding Copilot", value: 6310 },
  { name: "Field Sales Briefing", value: 3877 },
  { name: "RFP Responder", value: 942 },
  { name: "Close Analyst", value: 214 },
];

export const SPARK_TRENDS: Record<string, number[]> = {
  agents: [3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 11],
  conversations: [12, 18, 15, 22, 26, 24, 31, 35, 33, 42, 47, 52],
  latency: [22, 20, 21, 18, 19, 17, 16, 17, 15, 14, 14, 13],
  savings: [4, 6, 9, 11, 14, 17, 19, 24, 28, 31, 36, 41],
};

export function makeConversation(company: string) {
  return [
    {
      role: "user" as const,
      text: `A customer says their ${company} invoice was charged twice this month. What do I tell them?`,
    },
    {
      role: "agent" as const,
      text: `I checked the billing records for that account. There are two successful charges on 3 Aug for the same subscription — the second one is a duplicate created by a retry after a gateway timeout.\n\nSuggested reply: confirm the duplicate, tell them the refund is already queued, and note it lands in 3–5 business days.`,
      citations: ["Refund & returns policy v4", `${company} product handbook`],
      actions: ["Issue refund in Stripe", "Reply in Zendesk #48213"],
    },
  ];
}

export const WORKFLOW_NODES = [
  { id: "in", label: "Inbound ticket", kind: "trigger" as const, x: 0, y: 1 },
  { id: "classify", label: "Classify intent", kind: "agent" as const, x: 1, y: 1 },
  { id: "kb", label: "Search knowledge", kind: "tool" as const, x: 2, y: 0 },
  { id: "crm", label: "Fetch account", kind: "tool" as const, x: 2, y: 2 },
  { id: "draft", label: "Draft response", kind: "agent" as const, x: 3, y: 1 },
  { id: "guard", label: "Guardrail check", kind: "guard" as const, x: 4, y: 1 },
  { id: "send", label: "Send & log", kind: "output" as const, x: 5, y: 1 },
];

export const WORKFLOW_EDGES: Array<[string, string]> = [
  ["in", "classify"],
  ["classify", "kb"],
  ["classify", "crm"],
  ["kb", "draft"],
  ["crm", "draft"],
  ["draft", "guard"],
  ["guard", "send"],
];
