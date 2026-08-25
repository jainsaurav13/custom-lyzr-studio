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

import { alpha, mix, readableInk } from "@/components/studio/brand/color";
import {
  ALREADY_YOURS,
  BOX_H,
  BOX_W,
  CORE,
  GROUPS,
  GROUP_LABELS,
  HEX_W,
  PLACED,
  cq,
  px,
  py,
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
 * One block, as a slab of tinted glass cut to a hexagon. Depth comes from a lit
 * top face, a shaded foot and the colour bleeding out beneath it, all derived
 * from the block's own hue so the whole field stays one material.
 */
function LitHex({ item }: { item: Placed }) {
  const { color } = item;
  const ink = readableInk(color, mix(color, "#140F0B", 0.82), "#FFFFFF");
  const lit = mix(color, "#FFFFFF", 0.22);
  const shade = mix(color, "#2A1B12", 0.34);

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: HEX_CLIP,
          background: color,
          filter: "blur(0.7cqw)",
          transform: "translateY(6%) scale(0.94)",
          opacity: 0.42,
        }}
      />
      <div
        className="relative flex h-full w-full flex-col items-center justify-center px-[14%] text-center"
        style={{
          clipPath: HEX_CLIP,
          color: ink,
          background: `linear-gradient(152deg, ${lit} 0%, ${color} 34%, ${shade} 100%)`,
        }}
      >
        {/* Wet sheen across the top face, and one glint where the light lands. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(163deg, ${alpha("#FFFFFF", 0.58)} 0%, ${alpha("#FFFFFF", 0.16)} 26%, ${alpha("#FFFFFF", 0)} 48%)`,
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[16%] left-[26%] h-[6%] w-[42%] -rotate-[9deg] rounded-full"
          style={{ background: alpha("#FFFFFF", 0.36), filter: "blur(0.35cqw)" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-[14%]"
          style={{
            background: `linear-gradient(180deg, ${alpha("#FFFFFF", 0)}, ${alpha("#FFFFFF", 0.3)})`,
            filter: "blur(0.3cqw)",
          }}
        />

        <Icon name={item.block.icon} size="2.15cqw" />
        <span
          className="relative mt-[0.3cqw] leading-[1.15] font-semibold"
          style={{ fontFamily: "var(--st-font-head)", fontSize: "1.02cqw" }}
        >
          {item.block.name}
        </span>
      </div>
    </>
  );
}

/** The same footprint, drawn as the hole where the block is missing. */
function EmptyHex({ item }: { item: Placed }) {
  return (
    <div className="relative h-full w-full">
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          clipPath: HEX_CLIP,
          background: "color-mix(in srgb, var(--st-text) 20%, var(--st-surface))",
        }}
      />
      <div
        className="absolute inset-[0.14cqw] flex flex-col items-center justify-center px-[14%] text-center"
        style={{
          clipPath: HEX_CLIP,
          background: "color-mix(in srgb, var(--st-text) 5%, var(--st-surface))",
          color: "var(--st-text-faint)",
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
    <div
      className="ab-hexbox relative w-full"
      style={{ aspectRatio: `${BOX_W} / ${BOX_H}`, containerType: "inline-size" }}
    >
      {/* The core the families close around, and the ring they close on. */}
      {whole ? (
        <>
          <span
            aria-hidden="true"
            className="ab-ring pointer-events-none absolute rounded-[50%] border border-dashed"
            style={{
              left: "8%",
              right: "8%",
              top: "10%",
              bottom: "10%",
              borderColor: "var(--ab-warm-rule)",
            }}
          />
          <div
            className="ab-core absolute flex flex-col items-center justify-center"
            style={{
              left: `${px(CORE.x)}%`,
              top: `${py(CORE.y)}%`,
              width: `${(CORE.w / BOX_W) * 100}%`,
              aspectRatio: "1 / 1.1547",
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                clipPath: HEX_CLIP,
                background: "var(--st-text)",
                boxShadow: `0 ${cq(18)}cqw ${cq(40)}cqw ${alpha("#2A1B12", 0.32)}`,
              }}
            />
            <div className="relative flex flex-col items-center" style={{ color: "var(--st-bg)" }}>
              <Icon name="Boxes" size="4cqw" />
              <span
                className="mt-[0.6cqw] leading-none font-semibold"
                style={{ fontFamily: "var(--st-font-head)", fontSize: "1.9cqw" }}
              >
                AgentBlocks
              </span>
              <span
                className="mt-[0.35cqw] leading-none font-semibold tracking-[0.26em] uppercase"
                style={{ fontSize: "0.85cqw", opacity: 0.62 }}
              >
                Platform
              </span>
            </div>
          </div>

          {GROUP_LABELS.map(({ group, x, y }) => (
            <div
              key={group.key}
              className="ab-group absolute -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap"
              style={{ left: `${px(x)}%`, top: `${py(y)}%` }}
            >
              <span
                className="block leading-none font-semibold tracking-[0.24em] uppercase"
                style={{ fontSize: "1.05cqw", color: group.color }}
              >
                {group.label}
              </span>
              <span
                className="mt-[0.35cqw] block leading-none"
                style={{ fontSize: "0.88cqw", color: "var(--st-text-faint)" }}
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
              left: `${px(item.from.x)}%`,
              top: `${py(item.from.y)}%`,
              width: `${(HEX_W / BOX_W) * 100}%`,
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
            <span className="text-[0.75rem]" style={{ color: "var(--st-text-faint)" }}>
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
                  color: readableInk(item.color, mix(item.color, "#140F0B", 0.82), "#FFFFFF"),
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
