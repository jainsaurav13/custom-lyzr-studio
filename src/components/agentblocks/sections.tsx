import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Cloud,
  CloudUpload,
  Code2,
  Cpu,
  Database,
  FileClock,
  Gauge,
  GitBranch,
  KeyRound,
  LineChart,
  Lock,
  Mic,
  Minus,
  Puzzle,
  ShieldAlert,
  ShieldCheck,
  Store,
  UserCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { alpha, mix, readableInk } from "@/components/studio/brand/color";
import { cn } from "@/lib/utils";

import {
  BLOCKS,
  BOOKING_URL,
  CTA_LABEL,
  COMPARE,
  COMPARISON,
  CREDIBILITY,
  FLAGSHIP,
  ENGAGEMENTS,
  FAQS,
  PROBLEM,
  OWNERSHIP,
  FORM_ENDPOINT,
  SESSION,
  TRUSTED_BY,
  WIRED_IN,
  YOUR_STACK,
} from "./content";
import {
  Accent,
  Chip,
  Cta,
  Eyebrow,
  Label,
  Panel,
  Reveal,
  Section,
  SectionHead,
} from "./primitives";
import { StatusDot } from "@/components/studio/ui";

/* ------------------------------------------------------------------ *
 * 2 — Credibility
 * ------------------------------------------------------------------ */

export function ProductionSection() {
  return (
    <Section id="production" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow={CREDIBILITY.eyebrow}
          title={CREDIBILITY.title}
          // Wide enough that the heading holds one line on a laptop.
          className="max-w-none"
        />
      </Reveal>

      {/* Names, not logos: nothing here pretends to a brand asset we would have
          to chase approval for, and the wordmarks read as one quiet line. */}
      <Reveal delay={0.06}>
        <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--st-text)" }}>
          <Label>{TRUSTED_BY.label}</Label>
          <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-4">
            {TRUSTED_BY.names.map((name) => (
              <li
                key={name}
                className="text-lg font-semibold tracking-[-0.02em] sm:text-xl"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text-muted)" }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* The flagship, and the loudest thing in the section: the account cannot
          be named yet, so the shape of the deal has to do the work the logo
          would have done. */}
      <Reveal delay={0.12}>
        <Panel
          className="mt-12 overflow-hidden"
          style={{ background: "var(--st-surface)", borderColor: "var(--st-border-strong)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6 sm:px-9 sm:pt-8">
            <Label>{FLAGSHIP.label}</Label>
            <span className="inline-flex items-center gap-2">
              <StatusDot tone="success" />
              <span
                className="text-[10px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: "var(--st-success)" }}
              >
                Live, embedded OEM
              </span>
            </span>
          </div>

          <h3
            className="mt-5 px-6 text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.03em] text-balance sm:px-9 sm:text-[2.05rem]"
            style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
          >
            {FLAGSHIP.headline.lead} <Accent>{FLAGSHIP.headline.accent}</Accent>
          </h3>

          <dl
            className="mt-8 grid border-t sm:grid-cols-2"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            {FLAGSHIP.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  "border-b px-6 py-5 sm:px-9",
                  index % 2 === 1 && "sm:border-l",
                  index >= FLAGSHIP.facts.length - 2 && "sm:border-b-0",
                  index === FLAGSHIP.facts.length - 1 && "border-b-0",
                )}
                style={{ borderColor: "var(--ab-rule)" }}
              >
                <dt>
                  <Label>{fact.label}</Label>
                </dt>
                <dd
                  className="mt-1.5 text-[0.9375rem] leading-snug"
                  style={{ color: "var(--st-text)" }}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* The line an ISV is meant to leave with, set apart from the facts. */}
          <div
            className="border-t px-6 py-7 sm:px-9"
            style={{ borderColor: "var(--st-text)", background: "var(--st-surface-2)" }}
          >
            <p
              className="max-w-3xl text-lg leading-snug text-balance italic sm:text-[1.375rem]"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
            >
              {FLAGSHIP.punchline}
            </p>
          </div>
        </Panel>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 3 — The problem
 * ------------------------------------------------------------------ */

/**
 * The production layer, set as a specification sheet: two columns, hairline
 * rules, no ornament. The capability carries the weight and the requirements
 * sit beside it as the technical detail they are, so the section reads like
 * the architecture of a runtime rather than a comparison of features.
 */
export function ProblemSection() {
  return (
    <Section id="problem" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow={PROBLEM.eyebrow}
          title={PROBLEM.title}
          lede={
            <>
              {PROBLEM.lede}
              <span className="mt-3 block font-medium" style={{ color: "var(--st-text)" }}>
                {PROBLEM.ledeKicker}
              </span>
            </>
          }
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-16">
          <div
            className="hidden grid-cols-[minmax(0,15rem)_1fr] gap-x-10 border-b pb-3 sm:grid"
            style={{ borderColor: "var(--st-text)" }}
          >
            <Label>{PROBLEM.spec.layerLabel}</Label>
            <Label>{PROBLEM.spec.needLabel}</Label>
          </div>

          <dl>
            {PROBLEM.spec.rows.map((row, index) => (
              <div
                key={row.layer}
                className={cn(
                  "grid gap-x-10 gap-y-2 py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-baseline",
                  index > 0 && "border-t",
                  index === 0 && "sm:border-t-0 border-t sm:pt-6",
                )}
                style={{
                  borderColor: index === 0 ? "var(--st-text)" : "var(--ab-rule)",
                }}
              >
                <dt
                  className="text-[1.25rem] leading-tight font-semibold tracking-[-0.02em]"
                  style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                >
                  {row.layer}
                </dt>
                <dd className="flex flex-wrap items-baseline gap-y-1.5">
                  {row.need.map((item, itemIndex) => (
                    // Item and separator travel together, so a wrapped line
                    // never opens on a stray middot.
                    <span key={item} className="flex items-baseline">
                      <span
                        className="text-[0.9375rem] leading-snug"
                        style={{ color: "var(--st-text-muted)" }}
                      >
                        {item}
                      </span>
                      {itemIndex < row.need.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="px-3 text-[0.9375rem]"
                          style={{ color: "var(--st-text-faint)" }}
                        >
                          ·
                        </span>
                      ) : null}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          {/* The two ways to acquire the layer above, stated and left alone. */}
          <div
            className="grid gap-6 border-t pt-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-x-10"
            style={{ borderColor: "var(--st-text)" }}
          >
            <div>
              <Label>{PROBLEM.footer.build.label}</Label>
              <p
                className="mt-2 text-[0.9375rem] leading-snug"
                style={{ color: "var(--st-text-muted)" }}
              >
                {PROBLEM.footer.build.value}
              </p>
            </div>
            <div className="flex items-start gap-4">
              <ArrowRight
                className="hidden h-4 w-4 shrink-0 translate-y-1 sm:block"
                style={{ color: "var(--st-text-faint)" }}
                aria-hidden="true"
              />
              <div>
                <Label>{PROBLEM.footer.licensed.label}</Label>
                <p
                  className="mt-2 text-[0.9375rem] leading-snug font-medium"
                  style={{ color: "var(--st-text)" }}
                >
                  {PROBLEM.footer.licensed.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 4 — The infrastructure
 * ------------------------------------------------------------------ */

/**
 * Every icon the catalogue draws, resolved by name so the block list stays
 * plain data in `content.ts`.
 */
const ICONS: Record<string, LucideIcon> = {
  Activity,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  CloudUpload,
  Database,
  FileClock,
  Gauge,
  GitBranch,
  KeyRound,
  LineChart,
  Lock,
  Mic,
  Puzzle,
  ShieldAlert,
  ShieldCheck,
  Store,
  UserCheck,
  Wrench,
};

function BlockIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Boxes;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}

/**
 * One block, as a slab of tinted glass sitting proud of the page. There is no
 * projection here: the tile faces the reader square-on and gets its depth from
 * a lit top edge, a shaded bottom one and a coloured glow beneath, so it reads
 * as raised rather than turned. Every value is derived from the block's own
 * colour, so the whole set stays one material.
 */
function BlockTile({
  block,
  index,
  linkRight,
  linkDown,
}: {
  block: (typeof BLOCKS)[number];
  index: number;
  linkRight?: boolean;
  linkDown?: boolean;
}) {
  const { color } = block;
  const ink = readableInk(color, mix(color, "#140F0B", 0.82), "#FFFFFF");
  const lit = mix(color, "#FFFFFF", 0.2);
  const shade = mix(color, "#2A1B12", 0.32);

  return (
    <div className="ab-piece relative" style={{ ["--ab-i" as string]: index } as CSSProperties}>
      {/* The colour bleeding out from under the slab, which is what makes it
          read as lit glass sitting above the page rather than printed on it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-4 bottom-0 rounded-[26px] blur-lg"
        style={{ background: color, opacity: 0.45 }}
      />

      <div
        className="relative flex aspect-square flex-col rounded-[24px] p-3.5"
        style={{
          color: ink,
          background: `linear-gradient(152deg, ${lit} 0%, ${color} 52%, ${shade} 100%)`,
          boxShadow: [
            // The bevel: a lit top edge and a shaded bottom one.
            `inset 0 2px 0 ${alpha("#FFFFFF", 0.7)}`,
            `inset 2px 0 0 ${alpha("#FFFFFF", 0.3)}`,
            `inset -1.5px 0 0 ${alpha("#FFFFFF", 0.14)}`,
            `inset 0 -3px 4px ${alpha("#2A1B12", 0.24)}`,
            `inset 0 -14px 20px -12px ${alpha("#FFFFFF", 0.45)}`,
            // The lift.
            `0 1px 1px ${alpha("#2A1B12", 0.14)}`,
            `0 14px 24px -10px ${alpha("#2A1B12", 0.35)}`,
          ].join(", "),
        }}
      >
        {/* Wet sheen across the top, and one glint where the light lands. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[24px]"
          style={{
            background: `linear-gradient(163deg, ${alpha("#FFFFFF", 0.62)} 0%, ${alpha("#FFFFFF", 0.2)} 22%, ${alpha("#FFFFFF", 0)} 44%)`,
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[7%] left-[14%] h-[7%] w-[46%] -rotate-[9deg] rounded-full blur-[6px]"
          style={{ background: alpha("#FFFFFF", 0.34) }}
        />

        <div className="relative flex items-start justify-between gap-2">
          <BlockIcon name={block.icon} className="h-[1.8rem] w-[1.8rem]" />
          <span className="text-[10px] font-semibold tabular-nums" style={{ opacity: 0.6 }}>
            {block.num}
          </span>
        </div>

        <div className="relative mt-auto">
          <h3
            className="text-[0.72rem] leading-tight font-semibold"
            style={{ fontFamily: "var(--st-font-head)" }}
          >
            {block.name}
          </h3>
          {/* A few words, not a sentence: what the block is for, on the block. */}
          <p className="mt-1 text-[0.625rem] leading-tight" style={{ opacity: 0.75 }}>
            {block.tagline}
          </p>
        </div>
      </div>

      {/* The joints. Each tab is drawn in its own block's glass, overlaps that
          block's edge and runs under the neighbour, which the neighbour paints
          over: a tenon seated in the piece beside it rather than a dot in the
          gap between them. */}
      {linkRight ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-[18px] hidden h-[9px] w-[24px] -translate-y-1/2 rounded-full lg:block"
          style={{
            background: `linear-gradient(90deg, ${mix(color, "#FFFFFF", 0.1)}, ${shade})`,
            boxShadow: `inset 0 1px 0 ${alpha("#FFFFFF", 0.55)}, 0 1px 2px ${alpha("#2A1B12", 0.28)}`,
          }}
        />
      ) : null}
      {linkDown ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[18px] left-1/2 hidden h-[24px] w-[9px] -translate-x-1/2 rounded-full lg:block"
          style={{
            background: `linear-gradient(180deg, ${mix(color, "#FFFFFF", 0.1)}, ${shade})`,
            boxShadow: `inset 1px 0 0 ${alpha("#FFFFFF", 0.45)}, 0 1px 2px ${alpha("#2A1B12", 0.28)}`,
          }}
        />
      ) : null}
    </div>
  );
}

/** The blocks a platform team has usually built for itself already. */
const ALREADY_YOURS = new Set(["builder", "runtime", "integrations"]);

/** The same footprint as a block, drawn as the hole where one is missing. */
function GapTile({ block }: { block: (typeof BLOCKS)[number] }) {
  return (
    <div
      className="flex aspect-square flex-col rounded-[24px] border border-dashed p-3.5"
      style={{ borderColor: "var(--st-border-strong)", color: "var(--st-text-faint)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <BlockIcon name={block.icon} className="h-[1.8rem] w-[1.8rem] opacity-40" />
        <span className="text-[10px] font-semibold tabular-nums opacity-50">{block.num}</span>
      </div>
      <div className="mt-auto">
        <p
          className="text-[0.72rem] leading-tight font-semibold opacity-70"
          style={{ fontFamily: "var(--st-font-head)" }}
        >
          {block.name}
        </p>
        <p className="mt-1 text-[0.625rem] leading-tight opacity-50">{block.tagline}</p>
      </div>
    </div>
  );
}

/** The fourteen tiles, in the state the given side of the divider shows. */
function BlockField({ state }: { state: "without" | "with" }) {
  const whole = state === "with";
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {BLOCKS.map((block, index) =>
        whole || ALREADY_YOURS.has(block.key) ? (
          <BlockTile
            key={block.key}
            block={block}
            index={index}
            // Only the complete set interlocks. Left of the divider the pieces
            // sit apart, which is the whole of the argument.
            linkRight={whole && (index + 1) % 7 !== 0}
            linkDown={whole && index + 7 < BLOCKS.length}
          />
        ) : (
          <GapTile key={block.key} block={block} />
        ),
      )}
    </div>
  );
}

/**
 * The catalogue, as one field the reader drags a divider across: to the left of
 * it, the three or four blocks a platform team has already built and the holes
 * where the rest should be; to the right, the complete set. The blocks, the
 * colours and the glass are the same on both sides, which is the point.
 */
export function BlocksSection() {
  const [reveal, setReveal] = useState(50);
  const complete = reveal >= 99;

  return (
    <Section id="blocks" tone="warm">
      <Reveal>
        <SectionHead
          eyebrow="What’s inside"
          title="What you can OEM"
          lede="License the blocks your platform is missing, or take the complete set."
          className="max-w-2xl"
        />
        <p
          className="mt-6 border-l-2 pl-4 text-[1rem] leading-snug xl:text-[1.0625rem]"
          style={{ borderColor: "var(--st-accent-ink)", color: "var(--st-text)" }}
        >
          {COMPARISON.stakes}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <div
          data-ab-platform=""
          data-complete={complete ? "true" : undefined}
          className="mt-12 overflow-hidden rounded-[var(--st-radius-lg)] border"
          style={
            {
              background: "var(--st-surface)",
              borderColor: "var(--ab-warm-rule)",
              ["--ab-reveal" as string]: `${reveal}%`,
            } as CSSProperties
          }
        >
          <div
            className="flex flex-wrap items-start justify-between gap-4 border-b px-5 py-4 sm:px-7"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text-muted)" }}
              >
                {COMPARISON.without.label}
              </p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--st-text-faint)" }}>
                {COMPARISON.without.note}
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {COMPARISON.with.label}
              </p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--st-accent-ink)" }}>
                {COMPARISON.with.note}
              </p>
            </div>
          </div>

          {/* Both states are rendered in full and the divider decides how much
              of the finished one you can see, so nothing reflows as it moves. */}
          <div className="relative px-5 py-6 sm:px-7">
            <BlockField state="without" />

            <div
              className="pointer-events-none absolute inset-0 px-5 py-6 sm:px-7"
              // Opaque, so the finished platform underneath does not read
              // through the holes this state is meant to show.
              style={{
                clipPath: "inset(0 calc(100% - var(--ab-reveal)) 0 0)",
                background: "var(--st-surface)",
              }}
              aria-hidden="true"
            >
              <BlockField state="with" />
            </div>

            <span
              aria-hidden="true"
              className="ab-sweep pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 opacity-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${alpha("#FFFFFF", 0.6)}, transparent)`,
              }}
            />

            <span
              aria-hidden="true"
              className="ab-divider pointer-events-none absolute inset-y-0 z-10 w-px"
              style={{ left: "var(--ab-reveal)", background: "var(--st-accent-ink)" }}
            />
            <span
              aria-hidden="true"
              className="ab-divider pointer-events-none absolute top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
              style={{
                left: "var(--ab-reveal)",
                background: "var(--st-surface)",
                borderColor: "var(--st-accent-ink)",
                boxShadow: "0 4px 12px -4px rgba(35,24,16,0.35)",
              }}
            >
              <ChevronLeft className="h-3 w-3" style={{ color: "var(--st-accent-ink)" }} />
              <ChevronRight className="h-3 w-3" style={{ color: "var(--st-accent-ink)" }} />
            </span>

            {/* Drag the field itself, or the track under it: both write the
                same value, and the track carries the keyboard focus. */}
            <input
              type="range"
              min={0}
              max={100}
              value={reveal}
              onChange={(event) => setReveal(Number(event.target.value))}
              data-ab-reveal=""
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          <div
            className="border-t px-5 pt-5 pb-1 sm:px-7"
            style={{ borderColor: "var(--ab-rule)" }}
          >
            <input
              type="range"
              min={0}
              max={100}
              value={reveal}
              onChange={(event) => setReveal(Number(event.target.value))}
              data-ab-reveal=""
              aria-label={COMPARISON.hint}
              className="ab-track w-full"
            />
          </div>

          <p
            className="relative border-t px-5 py-3 text-center text-[11px] font-semibold tracking-[0.14em] uppercase sm:px-7"
            style={{ borderColor: "var(--ab-rule)", color: "var(--st-text-faint)" }}
          >
            <span className="ab-when-open">{COMPARISON.hint}</span>
            <span className="ab-when-complete" style={{ color: "var(--st-accent-ink)" }}>
              {COMPARISON.complete}
            </span>
          </p>
        </div>
      </Reveal>

      {/* The poster's footer bar: the claim the catalogue provokes, answered
          once, across the full width of the sheet. */}
      <Reveal delay={0.24}>
        <div
          className="mt-12 flex flex-col gap-4 rounded-[var(--st-radius-lg)] border border-dashed p-5 lg:flex-row lg:items-center lg:justify-between"
          style={{ borderColor: "var(--st-accent-ink)" }}
        >
          <div>
            <Label>Stays in place: your existing platform</Label>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {YOUR_STACK.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-1.5 text-[0.8125rem]"
                  style={{ color: "var(--st-text-muted)" }}
                >
                  <BlockIcon name={item.icon} className="h-3.5 w-3.5 text-[var(--st-text-faint)]" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0 border-l-2 pl-4" style={{ borderColor: "var(--st-accent-ink)" }}>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              {WIRED_IN.title}
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--st-accent-ink)" }}>
              {WIRED_IN.body}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 5 — The ownership promise
 * ------------------------------------------------------------------ */

/**
 * The ownership boundary, as one comparison a reader can settle in five
 * seconds: five things are theirs outright, on the charcoal card that takes
 * nearly two thirds of the width, and two are licensed, on the smaller card
 * beside it. The protections sit under the licensed side, deliberately quieter
 * than the comparison they backstop.
 */
export function OwnershipSection() {
  return (
    <Section id="ownership" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow={OWNERSHIP.eyebrow}
          title={
            <>
              {OWNERSHIP.title.lead} <Accent>{OWNERSHIP.title.accent}</Accent>
            </>
          }
          lede={OWNERSHIP.lede}
          className="max-w-xl"
        />
      </Reveal>

      <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[62fr_38fr]">
        <Reveal className="h-full">
          <Panel
            tone="invert"
            className="flex h-full flex-col p-7 sm:p-9"
            style={{ background: "var(--ab-ink)", borderColor: "var(--ab-ink-border-strong)" }}
          >
            <Label tone="invert">{OWNERSHIP.yours.label}</Label>
            {/* The rows share whatever height the licensed column sets, so the
                two cards start and finish level with no slack at the foot. */}
            <dl className="mt-6 flex flex-1 flex-col justify-between">
              {OWNERSHIP.yours.items.map((row, index) => (
                <div
                  key={row.item}
                  className={cn("py-3.5", index > 0 && "border-t")}
                  style={{ borderColor: "var(--ab-ink-border)" }}
                >
                  <dt className="flex items-baseline gap-3">
                    <Check
                      className="h-4 w-4 shrink-0 translate-y-0.5"
                      style={{ color: "var(--ab-accent-on-ink)" }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[1.125rem] leading-snug font-semibold"
                      style={{ fontFamily: "var(--st-font-head)", color: "var(--ab-ink-text)" }}
                    >
                      {row.item}
                    </span>
                  </dt>
                  <dd
                    className="mt-1 pl-7 text-sm leading-snug"
                    style={{ color: "var(--ab-ink-muted)" }}
                  >
                    {row.note}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <Panel className="flex h-full flex-col p-7 sm:p-8">
            <Label>{OWNERSHIP.ours.label}</Label>
            <dl className="mt-6">
              {OWNERSHIP.ours.items.map((row, index) => (
                <div
                  key={row.item}
                  className={cn("py-3.5", index > 0 && "border-t")}
                  style={{ borderColor: "var(--ab-rule)" }}
                >
                  <dt
                    className="text-[1rem] leading-snug font-semibold"
                    style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                  >
                    {row.item}
                  </dt>
                  <dd
                    className="mt-1 text-[0.8125rem] leading-snug"
                    style={{ color: "var(--st-text-muted)" }}
                  >
                    {row.note}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto border-t pt-6" style={{ borderColor: "var(--st-text)" }}>
              <Label>{OWNERSHIP.protections.label}</Label>
              <ul className="mt-4 space-y-3.5">
                {OWNERSHIP.protections.items.map((item) => (
                  <li key={item.title} className="flex gap-2.5">
                    <Check
                      className="mt-[3px] h-3.5 w-3.5 shrink-0"
                      style={{ color: "var(--st-accent-ink)" }}
                      aria-hidden="true"
                    />
                    <span>
                      <span
                        className="block text-[0.8125rem] leading-snug font-semibold"
                        style={{ color: "var(--st-text)" }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="mt-0.5 block text-[0.75rem] leading-snug"
                        style={{ color: "var(--st-text-muted)" }}
                      >
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 6 — How to get started
 * ------------------------------------------------------------------ */

/**
 * The little architecture picture on each engagement card. Every card draws the
 * same three-layer stack, so the only thing that changes between them is how
 * much of it Lyzr supplies: your product is always the base, the AgentBlocks
 * layer lights up two of six or all six, and the Applied AI team appears only
 * on Turnkey.
 */
function EngagementStack({
  lit,
  team,
  platformLabel,
}: {
  lit: number;
  team: boolean;
  platformLabel: string;
}) {
  const full = lit >= 6;
  return (
    <div className="flex h-[8.25rem] flex-col justify-end gap-2" aria-hidden="true">
      {team ? (
        <div
          className="flex h-11 items-center rounded-[10px] px-3"
          style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
        >
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase">
            Applied AI team
          </span>
        </div>
      ) : null}

      <div
        className="flex h-11 items-center justify-between gap-3 rounded-[10px] border px-3"
        style={{
          background: full ? "var(--st-accent-soft)" : "var(--st-surface)",
          borderColor: full ? "var(--st-accent-ink)" : "var(--st-border-strong)",
        }}
      >
        <span
          className="text-[10px] font-semibold tracking-[0.12em] uppercase"
          style={{ color: "var(--st-accent-ink)" }}
        >
          {platformLabel}
        </span>
        <span className="flex shrink-0 gap-1">
          {Array.from({ length: 6 }, (_, index) => (
            <span
              key={index}
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{
                background: index < lit ? "var(--st-accent-ink)" : "transparent",
                boxShadow: index < lit ? undefined : "inset 0 0 0 1px var(--st-border-strong)",
              }}
            />
          ))}
        </span>
      </div>

      <div
        className="flex h-11 items-center rounded-[10px] border border-dashed px-3"
        style={{ borderColor: "var(--st-border-strong)" }}
      >
        <span
          className="text-[10px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: "var(--st-text-faint)" }}
        >
          Your product
        </span>
      </div>
    </div>
  );
}

export function StartSection() {
  return (
    <Section id="start" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow="Engagement models"
          title="Start where you are. We’ll meet you there."
          lede="Three levels of Lyzr involvement. Every one of them preserves the same principle: your brand, your customer, your economics."
          // Full container width, so the lede holds one line on a laptop.
          className="max-w-none"
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {ENGAGEMENTS.map((option, index) => (
          <Reveal key={option.key} delay={index * 0.08} className="h-full">
            <Panel className="flex h-full flex-col overflow-hidden">
              <div className="p-6">
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-xs font-semibold tracking-[0.14em]"
                    style={{ color: "var(--st-accent-ink)" }}
                  >
                    {option.step}
                  </span>
                  <h3
                    className="text-[1.6rem] leading-none font-semibold tracking-[0.02em] uppercase"
                    style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                  >
                    {option.tier}
                  </h3>
                </div>

                {/* Fixed heights so the three diagrams share one baseline. */}
                <p
                  className="mt-4 text-[1.0625rem] leading-snug font-semibold lg:min-h-[3.25rem]"
                  style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                >
                  {option.title}
                </p>
                <p
                  className="mt-2 text-sm leading-snug lg:min-h-[4.25rem]"
                  style={{ color: "var(--st-text-muted)" }}
                >
                  {option.fit}
                </p>

                <div className="mt-6">
                  <EngagementStack
                    lit={option.lit}
                    team={option.team}
                    platformLabel={option.platformLabel}
                  />
                </div>
              </div>

              <div className="flex-1 border-t px-6 py-5" style={{ borderColor: "var(--ab-rule)" }}>
                <Label>What you get</Label>
                <ul className="mt-3 space-y-2">
                  {option.gets.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-snug"
                      style={{ color: "var(--st-text)" }}
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        style={{ color: "var(--st-accent-ink)" }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="flex min-h-[5rem] items-center border-t px-6 py-5"
                style={{ borderColor: "var(--st-text)", background: "var(--st-surface)" }}
              >
                <p
                  className="text-lg italic"
                  style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
                >
                  {option.takeaway.lead} <Accent>{option.takeaway.accent}</Accent>
                </p>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 7 — FAQ
 * ------------------------------------------------------------------ */

const COLUMNS = [
  { key: "build", label: "Build it yourself" },
  { key: "hyperscaler", label: "Hyperscaler platforms" },
  { key: "point", label: "Point tools" },
  { key: "agentblocks", label: "AgentBlocks" },
] as const;

function CompareTable() {
  return (
    <div className="-mx-6 mt-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="w-52 py-3 pr-4 align-bottom">
              <Label>Route</Label>
            </th>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 align-bottom text-sm font-semibold"
                style={{
                  color: column.key === "agentblocks" ? "var(--st-accent-ink)" : "var(--st-text)",
                  background: column.key === "agentblocks" ? "var(--st-accent-soft)" : undefined,
                  fontFamily: "var(--st-font-head)",
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE.map((row) => (
            <tr
              key={row.question}
              className="border-t align-top"
              style={{ borderColor: "var(--ab-rule)" }}
            >
              <th
                scope="row"
                className="py-4 pr-4 text-sm font-medium"
                style={{ color: "var(--st-text)" }}
              >
                {row.question}
              </th>
              {COLUMNS.map((column) => {
                const own = column.key === "agentblocks";
                return (
                  <td
                    key={column.key}
                    className="px-4 py-4 text-sm"
                    style={{
                      color: own ? "var(--st-text)" : "var(--st-text-muted)",
                      background: own ? "var(--st-accent-soft)" : undefined,
                    }}
                  >
                    <span className="flex gap-2">
                      {own ? (
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--st-accent-ink)" }}
                        />
                      ) : (
                        <Minus
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--st-text-faint)" }}
                        />
                      )}
                      {row[column.key]}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqSection() {
  return (
    <Section id="faq" tone="plain">
      <Reveal>
        <SectionHead eyebrow="FAQ" title="The questions we expect you to ask" />
      </Reveal>

      <div className="mt-12">
        {FAQS.map((faq, index) => (
          <Reveal key={faq.q} delay={Math.min(index, 3) * 0.04}>
            <details
              className="group border-t"
              style={{ borderColor: index === 0 ? "var(--st-border-strong)" : "var(--ab-rule)" }}
            >
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-start gap-4 py-5 marker:content-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--st-ring)]",
                )}
              >
                <ChevronDown
                  className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                  style={{ color: "var(--st-accent-ink)" }}
                />
                <span
                  className="text-base font-medium leading-snug"
                  style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                >
                  {faq.q}
                </span>
              </summary>
              <div className="pb-6 pl-8">
                <p
                  className="max-w-3xl text-sm leading-relaxed"
                  style={{ color: "var(--st-text-muted)" }}
                >
                  {faq.a}
                </p>
                {faq.table ? <CompareTable /> : null}
              </div>
            </details>
          </Reveal>
        ))}
        <div className="border-t" style={{ borderColor: "var(--ab-rule)" }} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 8 — Call to action
 * ------------------------------------------------------------------ */

/** One field of the demo request, styled for the ink band it sits on. */
function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  children?: ReactNode;
}) {
  const style = {
    background: "var(--ab-ink)",
    borderColor: "var(--ab-ink-border-strong)",
    color: "var(--ab-ink-text)",
  };
  return (
    <label className="block">
      <span
        className="text-[11px] font-semibold tracking-[0.1em] uppercase"
        style={{ color: "var(--ab-ink-faint)" }}
      >
        {label}
      </span>
      {children ? (
        <select
          name={name}
          required
          defaultValue=""
          className="mt-1.5 w-full appearance-none rounded-[10px] border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[var(--ab-accent-on-ink)] focus-visible:outline-none"
          style={style}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="mt-1.5 w-full rounded-[10px] border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[var(--ab-accent-on-ink)] focus-visible:outline-none"
          style={style}
        />
      )}
    </label>
  );
}

/**
 * The closing section, and the only conversion path on the page: the form is
 * here rather than behind a link, and it asks for a session with an architect
 * rather than a call with sales.
 */
export function SessionSection() {
  return (
    <Section id="session" tone="invert">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <div>
            <Eyebrow tone="invert">{SESSION.eyebrow}</Eyebrow>
            <h2
              className="mt-3 text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.6rem]"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--ab-ink-text)" }}
            >
              {SESSION.title.lead}
              <br />
              <span className="italic" style={{ fontFamily: "var(--ab-serif)", fontWeight: 400 }}>
                {SESSION.title.accent}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base" style={{ color: "var(--ab-ink-muted)" }}>
              {SESSION.lede}
            </p>

            <div className="mt-10">
              <Label tone="invert">{SESSION.agendaLabel}</Label>
              <ol className="mt-4">
                {SESSION.agenda.map((item) => (
                  <li
                    key={item.step}
                    className="flex gap-4 border-t py-3.5"
                    style={{ borderColor: "var(--ab-ink-border)" }}
                  >
                    <span
                      className="text-xs font-semibold tracking-[0.14em]"
                      style={{ color: "var(--ab-accent-on-ink)" }}
                    >
                      {item.step}
                    </span>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--ab-ink-text)", fontFamily: "var(--st-font-head)" }}
                      >
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm" style={{ color: "var(--ab-ink-muted)" }}>
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="rounded-[var(--st-radius-lg)] border p-6 sm:p-8"
            style={{
              background: "var(--ab-ink-raised)",
              borderColor: "var(--ab-ink-border-strong)",
            }}
          >
            <h3
              className="text-xl leading-snug font-semibold"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--ab-ink-text)" }}
            >
              {SESSION.form.title}
            </h3>
            <p className="mt-2 text-sm" style={{ color: "var(--ab-accent-on-ink)" }}>
              {SESSION.form.note}
            </p>

            <form action={FORM_ENDPOINT} method="post" className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" placeholder="Jane Okafor" />
                <Field
                  label="Company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Acme Corp"
                />
              </div>
              <Field
                label="Work email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@acme.com"
              />
              <Field label={SESSION.form.stageLabel} name="stage">
                <option value="" disabled>
                  Select one
                </option>
                {SESSION.form.stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </Field>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--ab-accent-on-ink)] focus-visible:outline-none"
                style={{
                  background: "var(--ab-ink-text)",
                  color: "var(--ab-ink)",
                  borderColor: "transparent",
                }}
              >
                {SESSION.form.submit}
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-xs" style={{ color: "var(--ab-ink-faint)" }}>
                {SESSION.form.privacy}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
