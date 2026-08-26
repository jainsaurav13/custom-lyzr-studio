import type { CSSProperties } from "react";
import {
  Activity,
  Bell,
  BookOpen,
  Boxes,
  Brain,
  Building2,
  CloudUpload,
  Code2,
  Cpu,
  Database,
  EyeOff,
  FileClock,
  FileText,
  Filter,
  Gauge,
  KeyRound,
  LineChart,
  Lock,
  MessageSquare,
  Mic,
  PieChart,
  Puzzle,
  Route,
  Scale,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Store,
  Timer,
  UserCheck,
  Wallet,
  Workflow,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { alpha, mix } from "@/components/studio/brand/color";
import {
  ALREADY_YOURS,
  BOX_H,
  BOX_W,
  CORE,
  GROUPS,
  GROUP_LABELS,
  HEX_W,
  OPEN_H,
  PLACED,
  RING,
  cq,
} from "./blocks";
import type { Placed } from "./blocks";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  Bell,
  BookOpen,
  Boxes,
  Brain,
  Building2,
  CloudUpload,
  Code2,
  Cpu,
  Database,
  EyeOff,
  FileClock,
  FileText,
  Filter,
  Gauge,
  KeyRound,
  LineChart,
  Lock,
  MessageSquare,
  Mic,
  PieChart,
  Puzzle,
  Route,
  Scale,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Store,
  Timer,
  UserCheck,
  Wallet,
  Workflow,
  Wrench,
};

function Icon({ name, size }: { name: string; size: string }) {
  const Glyph = ICONS[name] ?? Boxes;
  return <Glyph style={{ width: size, height: size }} strokeWidth={1.7} aria-hidden="true" />;
}

/** The hexagon's own silhouette, pointy top, used by every layer that draws one. */
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/**
 * Print grain. Flat ink laid on paper is never quite even, and that unevenness
 * is most of what separates a printed mark from a filled rectangle. Generated
 * rather than fetched, so the frozen snapshot carries it.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E\")";

/**
 * One block, as a slab of tinted glass cut to a hexagon. Depth comes from a lit
 * top face, a shaded foot and the colour bleeding out beneath it, all derived
 * from the block's own hue so the whole field stays one material.
 */
function LitHex({ item }: { item: Placed }) {
  const { color } = item;

  return (
    <div className="relative h-full w-full" style={{ clipPath: HEX_CLIP, background: color }}>
      {/* The ink, unevenly taken. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, mixBlendMode: "overlay", opacity: 0.22 }}
      />
      {/* A press leaves its edges a shade heavier than its middle. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(closest-side, ${alpha("#FFFFFF", 0.07)}, ${alpha("#241A12", 0)} 62%, ${alpha("#241A12", 0.16)} 100%)`,
        }}
      />

      <div
        className="relative flex h-full w-full flex-col items-center justify-center px-[15%] text-center"
        style={{ color: "#FFFFFF" }}
      >
        <Icon name={item.block.icon} size="2.15cqw" />
        <span
          className="mt-[0.3cqw] leading-[1.15] font-semibold"
          style={{ fontFamily: "var(--st-font-head)", fontSize: "1.02cqw" }}
        >
          {item.block.name}
        </span>
      </div>
    </div>
  );
}

/** The same footprint, drawn as the hole where the block is missing. */
function EmptyHex({ item }: { item: Placed }) {
  return (
    <div className="relative h-full w-full">
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: HEX_CLIP, background: "var(--ab-press-rule)" }}
      />
      <div
        className="absolute flex flex-col items-center justify-center px-[15%] text-center"
        style={{
          inset: "0.13cqw",
          clipPath: HEX_CLIP,
          background: "var(--ab-press-hollow)",
          color: "var(--ab-press-faint)",
        }}
      >
        <Icon name={item.block.icon} size="2.15cqw" />
        <span
          className="mt-[0.3cqw] leading-[1.15] font-semibold"
          style={{ fontFamily: "var(--st-font-head)", fontSize: "1.02cqw" }}
        >
          {item.block.name}
        </span>
      </div>
    </div>
  );
}

/**
 * The field: thirty-three blocks at their scattered addresses, each carrying
 * the vector to the place it settles once the platform closes. Nothing here
 * reflows; the whole animation is one translation per hexagon, so it runs the
 * same in the page and in a frozen snapshot of it.
 */
export function HexField({ state }: { state: "without" | "with" }) {
  const whole = state === "with";

  return (
    <div className="w-full" style={{ containerType: "inline-size" }}>
      <div
        className="ab-hexbox relative w-full"
        style={
          {
            ["--ab-h-open" as string]: `${cq(OPEN_H)}cqw`,
            ["--ab-h-done" as string]: `${cq(BOX_H)}cqw`,
          } as CSSProperties
        }
      >
        {/* The core the families close around, the ring they close on, and
            the lines that say which family answers to it. */}
        {whole ? (
          <>
            <svg
              aria-hidden="true"
              className="ab-ring pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${BOX_W} ${BOX_H}`}
              preserveAspectRatio="none"
            >
              <ellipse
                cx={CORE.x}
                cy={CORE.y}
                rx={RING.w / 2}
                ry={RING.h / 2}
                fill="none"
                stroke="var(--ab-press-rule)"
                strokeWidth={1.6}
                strokeDasharray="7 9"
              />
              {GROUP_LABELS.map(({ group, cx, cy }) => {
                // The line runs from the core's edge to just short of the
                // clump, so the family reads as answering to the middle.
                const dx = cx - CORE.x;
                const dy = cy - CORE.y;
                const len = Math.hypot(dx, dy) || 1;
                const ux = dx / len;
                const uy = dy / len;
                // Measured in pixels, not fractions: the clumps sit at
                // different distances, and a fraction would start some of
                // these lines inside the core and end others inside a block.
                const from = 124;
                const to = len - 132;
                return (
                  <g key={`${group.key}-wire`}>
                    <line
                      x1={CORE.x + ux * from}
                      y1={CORE.y + uy * from}
                      x2={CORE.x + ux * to}
                      y2={CORE.y + uy * to}
                      stroke={group.color}
                      strokeWidth={1.8}
                    />
                    <circle
                      cx={CORE.x + ux * to}
                      cy={CORE.y + uy * to}
                      r={5.5}
                      fill={group.color}
                    />
                    <circle
                      cx={CORE.x + Math.cos(Math.atan2(dy, dx)) * (RING.w / 2)}
                      cy={CORE.y + Math.sin(Math.atan2(dy, dx)) * (RING.h / 2)}
                      r={4.5}
                      fill={group.color}
                    />
                  </g>
                );
              })}
            </svg>

            <div
              className="ab-core absolute flex flex-col items-center justify-center"
              style={{
                left: `${cq(CORE.x)}cqw`,
                top: `${cq(CORE.y)}cqw`,
                width: `${cq(CORE.w)}cqw`,
                aspectRatio: "1 / 1.1547",
              }}
            >
              {/* The press did not quite register: the sheet shows a sliver of
                  the colour plate under the paper one. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-[1.4%] translate-y-[1.8%]"
                style={{ clipPath: HEX_CLIP, background: GROUPS[0].color, opacity: 0.85 }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{ clipPath: HEX_CLIP, background: "var(--ab-press-ink)" }}
              />
              <span
                aria-hidden="true"
                className="absolute"
                style={{
                  inset: "0.18cqw",
                  clipPath: HEX_CLIP,
                  background: "var(--ab-press-paper)",
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{
                  inset: "0.18cqw",
                  clipPath: HEX_CLIP,
                  backgroundImage: GRAIN,
                  mixBlendMode: "multiply",
                  opacity: 0.12,
                }}
              />
              <div
                className="relative flex flex-col items-center"
                style={{ color: "var(--ab-press-ink)" }}
              >
                <Icon name="Boxes" size="4cqw" />
                <span
                  className="mt-[0.6cqw] leading-none font-semibold"
                  style={{ fontFamily: "var(--st-font-head)", fontSize: "1.9cqw" }}
                >
                  AgentBlocks
                </span>
                <span
                  className="mt-[0.35cqw] leading-none font-semibold tracking-[0.26em] uppercase"
                  style={{ fontSize: "0.85cqw", opacity: 0.55 }}
                >
                  Platform
                </span>
              </div>
            </div>

            {GROUP_LABELS.map(({ group, x, y }) => (
              <div
                key={group.key}
                className="ab-group absolute -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap"
                style={{ left: `${cq(x)}cqw`, top: `${cq(y)}cqw` }}
              >
                <span
                  className="block leading-none font-semibold tracking-[0.24em] uppercase"
                  style={{ fontSize: "1.05cqw", color: group.color }}
                >
                  {group.label}
                </span>
                <span
                  className="mt-[0.35cqw] block leading-none"
                  style={{ fontSize: "0.88cqw", color: "var(--ab-press-faint)" }}
                >
                  {group.note}
                </span>
              </div>
            ))}
          </>
        ) : null}

        {PLACED.map((item, index) => (
          <div
            key={item.block.key}
            className="ab-hex absolute"
            style={
              {
                left: `${cq(item.from.x)}cqw`,
                top: `${cq(item.from.y)}cqw`,
                width: `${cq(HEX_W)}cqw`,
                ["--ab-dx" as string]: `${cq(item.to.x - item.from.x)}cqw`,
                ["--ab-dy" as string]: `${cq(item.to.y - item.from.y)}cqw`,
                ["--ab-i" as string]: index,
              } as CSSProperties
            }
          >
            {whole || ALREADY_YOURS.has(item.block.key) ? (
              <LitHex item={item} />
            ) : (
              <EmptyHex item={item} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The same catalogue where the field cannot go: seven families, named, with
 * their blocks listed under them. No interaction, and none needed.
 */
export function BlockGroupList() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {GROUPS.map((group) => (
        <li key={group.key}>
          <div className="flex items-baseline gap-2">
            <span
              className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase"
              style={{ color: group.color }}
            >
              {group.label}
            </span>
            <span className="text-[0.75rem]" style={{ color: "var(--ab-press-faint)" }}>
              {group.note}
            </span>
          </div>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {PLACED.filter((item) => item.block.group === group.key).map((item) => (
              <li
                key={item.block.key}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-medium"
                style={{
                  background: item.color,
                  color: "#FFFFFF",
                }}
              >
                <Icon name={item.block.icon} size="0.8125rem" />
                {item.block.name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
