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
 * One block, as a slab of tinted glass cut to a hexagon. Depth comes from a lit
 * top face, a shaded foot and the colour bleeding out beneath it, all derived
 * from the block's own hue so the whole field stays one material.
 */
function LitHex({ item }: { item: Placed }) {
  const { color } = item;
  // These fills are too light to carry white type, so each family inks its
  // blocks in a very deep version of its own colour instead.
  const ink = mix(item.group.color, "#1A1626", 0.9);

  return (
    <>
      {/* Contact shadow, sitting low and tight. A wide coloured bloom here is
          what makes a field of these read as haze rather than as glass. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: HEX_CLIP,
          background: mix(color, "#1A1626", 0.42),
          filter: "blur(0.45cqw)",
          transform: "translateY(9%) scale(0.93)",
          opacity: 0.26,
        }}
      />

      {/* The rim is the thickness of the glass, and it does nearly all the
          work. Being clipped to the hexagon, one gradient lights the two roof
          edges white and lights the two foot edges again where light that has
          crossed the block gathers on its way out. */}
      <div
        className="relative h-full w-full"
        style={{
          clipPath: HEX_CLIP,
          background: `linear-gradient(170deg, ${alpha("#FFFFFF", 0.99)} 0%, ${mix(color, "#FFFFFF", 0.74)} 5%, ${mix(color, "#FFFFFF", 0.2)} 26%, ${mix(color, "#1A1626", 0.24)} 72%, ${mix(color, "#FFFFFF", 0.5)} 93%, ${mix(color, "#FFFFFF", 0.92)} 100%)`,
          filter: `drop-shadow(0 0.07cqw 0.1cqw ${alpha("#1A1626", 0.24)}) drop-shadow(0 0.5cqw 0.8cqw ${alpha("#1A1626", 0.14)})`,
        }}
      >
        <div
          className="absolute flex flex-col items-center justify-center px-[15%] text-center"
          style={{
            inset: "0.3cqw",
            clipPath: HEX_CLIP,
            color: ink,
            background: `linear-gradient(176deg, ${mix(color, "#FFFFFF", 0.24)} 0%, ${color} 54%, ${mix(color, "#1A1626", 0.26)} 95%, ${mix(color, "#1A1626", 0.16)} 100%)`,
          }}
        >
          {/* The dome: a bright upper face falling away quickly, which is what
              makes a block read as curved rather than as a tinted panel. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${alpha("#FFFFFF", 0.5)} 4%, ${alpha("#FFFFFF", 0.78)} 11%, ${alpha("#FFFFFF", 0.36)} 22%, ${alpha("#FFFFFF", 0.12)} 33%, ${alpha("#FFFFFF", 0)} 44%)`,
            }}
          />
          {/* The seam. One dark line under the roof and one above the foot, so
              the rim reads as an edge with thickness rather than a soft ramp.
              This is the difference between glass and a tinted panel. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${alpha("#1A1626", 0.26)} 0%, ${alpha("#1A1626", 0)} 6%), linear-gradient(0deg, ${alpha("#1A1626", 0.22)} 0%, ${alpha("#1A1626", 0)} 7%)`,
            }}
          />

          <div
            className="relative flex flex-col items-center"
            style={{ filter: `drop-shadow(0 0.05cqw 0.09cqw ${alpha("#FFFFFF", 0.5)})` }}
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
        style={{ clipPath: HEX_CLIP, background: alpha("#FFFFFF", 0.16) }}
      />
      <div
        className="absolute flex flex-col items-center justify-center px-[15%] text-center"
        style={{
          inset: "0.13cqw",
          clipPath: HEX_CLIP,
          background: alpha("#FFFFFF", 0.045),
          color: alpha("#FFFFFF", 0.44),
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
        {/* The core the families close around, and the ring they close on. */}
        {whole ? (
          <>
            <span
              aria-hidden="true"
              className="ab-ring pointer-events-none absolute rounded-[50%] border border-dashed"
              style={{
                left: `${cq(RING.x)}cqw`,
                top: `${cq(RING.y)}cqw`,
                width: `${cq(RING.w)}cqw`,
                height: `${cq(RING.h)}cqw`,
                borderColor: alpha("#FFFFFF", 0.11),
              }}
            />

            {/* The light each family throws onto the ground once it settles. */}
            {GROUP_LABELS.map(({ group, cx, cy }) => (
              <span
                key={`${group.key}-glow`}
                aria-hidden="true"
                className="ab-glow pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${cq(cx)}cqw`,
                  top: `${cq(cy)}cqw`,
                  width: `${cq(430)}cqw`,
                  height: `${cq(380)}cqw`,
                  background: `radial-gradient(closest-side, ${alpha(group.color, 0.32)}, ${alpha(group.color, 0.1)} 52%, transparent 78%)`,
                }}
              />
            ))}
            <div
              className="ab-core absolute flex flex-col items-center justify-center"
              style={{
                left: `${cq(CORE.x)}cqw`,
                top: `${cq(CORE.y)}cqw`,
                width: `${cq(CORE.w)}cqw`,
                aspectRatio: "1 / 1.1547",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[20%] rounded-full"
                style={{
                  background: `radial-gradient(closest-side, ${alpha("#FFFFFF", 0.2)}, transparent 72%)`,
                }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  clipPath: HEX_CLIP,
                  background: `linear-gradient(168deg, ${alpha("#FFFFFF", 0.99)} 0%, #F4F1FB 8%, #D9D0EC 62%, #FFFFFF 100%)`,
                }}
              />
              <span
                aria-hidden="true"
                className="absolute"
                style={{
                  inset: "0.55cqw",
                  clipPath: HEX_CLIP,
                  background:
                    "linear-gradient(176deg, #FFFFFF 0%, #F7F4FD 46%, #E2DBF1 93%, #F1ECFA 100%)",
                }}
              />
              <div className="relative flex flex-col items-center" style={{ color: "#15121F" }}>
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
                style={{ left: `${cq(x)}cqw`, top: `${cq(y)}cqw` }}
              >
                <span
                  className="block leading-none font-semibold tracking-[0.24em] uppercase"
                  style={{ fontSize: "1.05cqw", color: mix(group.color, "#FFFFFF", 0.32) }}
                >
                  {group.label}
                </span>
                <span
                  className="mt-[0.35cqw] block leading-none"
                  style={{ fontSize: "0.88cqw", color: alpha("#FFFFFF", 0.42) }}
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
              style={{ color: mix(group.color, "#FFFFFF", 0.32) }}
            >
              {group.label}
            </span>
            <span className="text-[0.75rem]" style={{ color: alpha("#FFFFFF", 0.42) }}>
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
                  color: mix(group.color, "#1A1626", 0.9),
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
