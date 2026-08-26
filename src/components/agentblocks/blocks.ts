import { mix } from "@/components/studio/brand/color";

/* ------------------------------------------------------------------ *
 * The catalogue, and the geometry it settles into
 * ------------------------------------------------------------------ */

/**
 * Thirty-three blocks, in seven families. Scattered, they are the parts list a
 * platform team is quietly holding: each one a thing somebody has to build,
 * buy or go without. Drawn together, they are one platform, and the families
 * are what the platform actually does.
 */

export type GroupKey =
  "build" | "govern" | "operate" | "observe" | "secure" | "scale" | "integrate";

export interface Group {
  key: GroupKey;
  label: string;
  /** What the family is for, in four or five words. */
  note: string;
  /** The family's hue. Every member is a shade of it. */
  color: string;
  /** Where the family settles once the platform closes, in degrees. */
  angle: number;
}

/** Seven families, spaced evenly around the core, clockwise from top left. */
export const GROUPS: Group[] = [
  { key: "build", label: "Build", note: "Design and ship agents", color: "#C1503A", angle: 244.1 },
  {
    key: "govern",
    label: "Govern",
    note: "Every agent on the record",
    color: "#4D7D73",
    angle: -64.3,
  },
  { key: "operate", label: "Operate", note: "Where the work runs", color: "#986C0F", angle: -12.9 },
  {
    key: "observe",
    label: "Observe",
    note: "Runs, cost and quality",
    color: "#4C7A91",
    angle: 38.5,
  },
  {
    key: "scale",
    label: "Scale",
    note: "Enterprise load, absorbed",
    color: "#AA613D",
    angle: 89.9,
  },
  { key: "secure", label: "Secure", note: "Who may do what", color: "#595B66", angle: 141.3 },
  {
    key: "integrate",
    label: "Integrate",
    note: "Connect what you already run",
    color: "#4E7A8D",
    angle: 192.7,
  },
];

export interface Block {
  key: string;
  name: string;
  group: GroupKey;
  /** Name of the lucide icon the hex draws. Resolved in `HexField.tsx`. */
  icon: string;
}

/** The roster, listed family by family. The field scatters it. */
export const BLOCKS: Block[] = [
  { key: "marketplace", name: "Marketplace", group: "build", icon: "Store" },
  { key: "builder", name: "Agent Builder", group: "build", icon: "Wrench" },
  { key: "workflow", name: "Workflow", group: "build", icon: "Workflow" },
  { key: "prompts", name: "Prompt Mgmt", group: "build", icon: "MessageSquare" },
  { key: "knowledge", name: "Knowledge", group: "build", icon: "BookOpen" },

  { key: "registry", name: "Registry", group: "govern", icon: "ScrollText" },
  { key: "guardrails", name: "Guardrails", group: "govern", icon: "ShieldCheck" },
  { key: "policy", name: "Policy Engine", group: "govern", icon: "Scale" },
  { key: "audit", name: "Audit Trail", group: "govern", icon: "FileClock" },
  { key: "evals", name: "Evaluations", group: "govern", icon: "Gauge" },

  { key: "runtime", name: "Runtime", group: "operate", icon: "Cpu" },
  { key: "memory", name: "Memory", group: "operate", icon: "Brain" },
  { key: "deployment", name: "Deployment", group: "operate", icon: "CloudUpload" },
  { key: "voice", name: "Voice AI", group: "operate", icon: "Mic" },
  { key: "human", name: "Human in Loop", group: "operate", icon: "UserCheck" },

  { key: "observability", name: "Observability", group: "observe", icon: "Activity" },
  { key: "analytics", name: "Analytics", group: "observe", icon: "LineChart" },
  { key: "logging", name: "Logging", group: "observe", icon: "FileText" },
  { key: "tracing", name: "Tracing", group: "observe", icon: "Route" },
  { key: "alerts", name: "Alerts", group: "observe", icon: "Bell" },

  { key: "identity", name: "Identity", group: "secure", icon: "KeyRound" },
  { key: "permissions", name: "Permissions", group: "secure", icon: "Lock" },
  { key: "secrets", name: "Secrets Mgmt", group: "secure", icon: "ShieldAlert" },
  { key: "pii", name: "PII Masking", group: "secure", icon: "EyeOff" },
  { key: "filter", name: "Content Filter", group: "secure", icon: "Filter" },

  { key: "tenancy", name: "Tenancy", group: "scale", icon: "Building2" },
  { key: "quotas", name: "Quotas", group: "scale", icon: "PieChart" },
  { key: "limits", name: "Rate Limits", group: "scale", icon: "Timer" },
  { key: "cost", name: "Cost Control", group: "scale", icon: "Wallet" },

  { key: "connectors", name: "Data Connectors", group: "integrate", icon: "Database" },
  { key: "tooling", name: "Tooling", group: "integrate", icon: "Puzzle" },
  { key: "models", name: "Model Mgmt", group: "integrate", icon: "Boxes" },
  { key: "apis", name: "API Mgmt", group: "integrate", icon: "Code2" },
];

/** The blocks a platform team has usually built for itself already. */
export const ALREADY_YOURS = new Set(["builder", "runtime", "tooling", "logging", "connectors"]);

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

/** The box every coordinate below is expressed in, before it becomes a %. */
export const BOX_W = 1240;
export const BOX_H = 870;

/**
 * The height the box needs while it is still a parts list, which is a good
 * deal less than the closed platform needs. The box grows into the second as
 * the families draw together, so the scattered state does not sit in a frame
 * sized for something else.
 */
export const OPEN_H = 660;

/** Pointy-top hexagon: height over width. */
const RATIO = 1.1547;

/** One hexagon, wide enough that a two-word name still reads inside it. */
export const HEX_W = 94;
const HEX_H = HEX_W * RATIO;

/** Scattered: a loose honeycomb with the air still in it. */
const SCATTER_ROWS = [7, 6, 7, 6, 7];
const SCATTER_STEP_X = 132;
const SCATTER_STEP_Y = 122;
const SCATTER_TOP = 86;

/** Drawn together: seven clumps packed tight on an ellipse round the core. */
const CLUMP_STEP_X = 96;
const CLUMP_STEP_Y = 81;
const RING_RX = 450;
const RING_RY = 292;

/** The core the families close around. */
export const CORE = { x: BOX_W / 2, y: 435, w: 210 };

export interface Placed {
  block: Block;
  group: Group;
  color: string;
  /** Where it sits while the platform is still a parts list. */
  from: { x: number; y: number };
  /** Where it settles once the platform closes. */
  to: { x: number; y: number };
}

/** Rows a clump of n packs into, top row first. */
function clumpRows(n: number): number[] {
  if (n >= 5) return [2, 3];
  if (n === 4) return [2, 2];
  if (n === 3) return [1, 2];
  return [n];
}

/**
 * Every block's two addresses. Scattered order interleaves the families, so
 * the parts list reads as a jumble and closing it is what sorts them.
 */
function place(): Placed[] {
  const byGroup = new Map<GroupKey, Block[]>();
  for (const group of GROUPS) {
    byGroup.set(
      group.key,
      BLOCKS.filter((block) => block.group === group.key),
    );
  }

  /* Where each block ends up: a tight honeycomb clump at its family's bearing. */
  const to = new Map<string, { x: number; y: number }>();
  for (const group of GROUPS) {
    const members = byGroup.get(group.key) ?? [];
    const radians = (group.angle * Math.PI) / 180;
    const cx = CORE.x + RING_RX * Math.cos(radians);
    const cy = CORE.y + RING_RY * Math.sin(radians);
    const rows = clumpRows(members.length);
    let index = 0;
    rows.forEach((count, row) => {
      // Rows of equal length need a nudge to interlock; unequal ones already do.
      const stagger = rows[0] === rows[1] ? (row === 0 ? -0.5 : 0.5) * (CLUMP_STEP_X / 2) : 0;
      const y = cy + (row - (rows.length - 1) / 2) * CLUMP_STEP_Y;
      for (let i = 0; i < count; i += 1) {
        const member = members[index];
        index += 1;
        if (!member) return;
        to.set(member.key, {
          x: cx + (i - (count - 1) / 2) * CLUMP_STEP_X + stagger,
          y,
        });
      }
    });
  }

  /* Where each block starts: dealt round the families, row by row. */
  const queues = GROUPS.map((group) => [...(byGroup.get(group.key) ?? [])]);
  const dealt: Block[] = [];
  while (dealt.length < BLOCKS.length) {
    for (const queue of queues) {
      const next = queue.shift();
      if (next) dealt.push(next);
    }
  }

  const placed: Placed[] = [];
  let cursor = 0;
  SCATTER_ROWS.forEach((count, row) => {
    for (let i = 0; i < count; i += 1) {
      const block = dealt[cursor];
      cursor += 1;
      if (!block) return;
      const group = GROUPS.find((candidate) => candidate.key === block.group)!;
      placed.push({
        block,
        group,
        color: shade(group.color),
        from: {
          x: BOX_W / 2 + (i - (count - 1) / 2) * SCATTER_STEP_X,
          y: SCATTER_TOP + row * SCATTER_STEP_Y,
        },
        to: to.get(block.key) ?? { x: CORE.x, y: CORE.y },
      });
    }
  });
  return placed;
}

/**
 * A family prints in one ink. Tonal variation between its members would only
 * cost the lightest of them its contrast against the warm off-white type, and
 * the press already gives each impression a character of its own.
 */
function shade(base: string): string {
  return base;
}

export const PLACED: Placed[] = place();

/**
 * Where a family's name sits: clear of its own clump vertically, and pushed
 * outward from the core horizontally so the families on the flanks do not put
 * their names over their neighbours' blocks.
 */
export const GROUP_LABELS = GROUPS.map((group) => {
  const radians = (group.angle * Math.PI) / 180;
  const cx = CORE.x + RING_RX * Math.cos(radians);
  const cy = CORE.y + RING_RY * Math.sin(radians);
  const above = Math.sin(radians) < 0;
  const rows = clumpRows(BLOCKS.filter((block) => block.group === group.key).length).length;
  const reach = ((rows - 1) / 2) * CLUMP_STEP_Y + HEX_H / 2 + 26;
  return {
    group,
    /** The clump's own centre, which is also where its light falls. */
    cx,
    cy,
    x: cx + Math.cos(radians) * 82,
    y: above ? cy - reach : cy + reach,
    above,
  };
});

/**
 * Any coordinate or distance in the design box, as container-width units. The
 * box's height changes as the platform closes, so nothing vertical can be a
 * percentage: everything is measured against the one dimension that holds.
 */
export const cq = (d: number) => (d / BOX_W) * 100;

/** The ring the families close on, as a box: left, top, width, height. */
export const RING = {
  x: CORE.x - RING_RX - 44,
  y: CORE.y - RING_RY - 44,
  w: (RING_RX + 44) * 2,
  h: (RING_RY + 44) * 2,
};
