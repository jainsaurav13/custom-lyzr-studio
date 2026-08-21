import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  BLOCKS,
  BOOKING_URL,
  CTA_LABEL,
  COMPARE,
  CONNECTED,
  CREDIBILITY,
  FLAGSHIP,
  ENGAGEMENTS,
  FAQS,
  FOUNDATION,
  PROBLEM,
  REASONS,
  SESSION_AGENDA,
  YOURS_ALONE,
  TRUSTED_BY,
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

/** The green "solved" mark that answers every red-dotted row. */
function IncludedPill() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full py-1 pr-3 pl-2.5"
      style={{ background: "color-mix(in srgb, var(--st-success) 11%, transparent)" }}
    >
      <Check className="h-3 w-3" style={{ color: "var(--st-success)" }} aria-hidden="true" />
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: "var(--st-success)" }}
      >
        Included
      </span>
    </span>
  );
}

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

      {/* One ledger, read left to right: the numbered item, what it costs you
          (red dot), and the same item already solved (green pill). The status
          colours are the studio's own, so the signal stays in the house
          language rather than becoming paint. */}
      <Reveal delay={0.06}>
        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-4">
            <div>
              <span className="flex items-center gap-2">
                <StatusDot tone="danger" />
                <Label>{PROBLEM.build.label}</Label>
              </span>
              <p className="mt-1.5 text-sm" style={{ color: "var(--st-text-muted)" }}>
                {PROBLEM.build.lede}
              </p>
            </div>
            <span className="flex items-center gap-2">
              <StatusDot tone="success" />
              <Label>{PROBLEM.withLabel}</Label>
            </span>
          </div>

          <dl>
            {PROBLEM.build.items.map((row, index) => (
              <div
                key={row.item}
                className="grid items-center gap-x-6 gap-y-2 border-t py-3.5 sm:grid-cols-[14rem_1fr_auto]"
                style={{
                  borderColor: index === 0 ? "var(--st-border-strong)" : "var(--ab-rule)",
                }}
              >
                <dt className="flex items-baseline gap-2.5">
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: "var(--st-text-faint)" }}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--st-text)" }}>
                    {row.item}
                  </span>
                </dt>
                <dd className="flex items-center gap-2.5">
                  <StatusDot tone="danger" />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--st-text-muted)" }}
                  >
                    {row.need}
                  </span>
                </dd>
                <dd className="sm:justify-self-end">
                  <IncludedPill />
                </dd>
              </div>
            ))}
          </dl>

          {/* The totals meet on one row, coloured by what they mean. */}
          <div
            className="grid items-baseline gap-x-6 gap-y-1 border-t py-5 sm:grid-cols-[14rem_1fr_auto]"
            style={{ borderColor: "var(--st-text)" }}
          >
            <span>
              <Label>Total</Label>
            </span>
            <p
              className="text-lg leading-snug"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-danger)" }}
            >
              {PROBLEM.build.total}
            </p>
            <p
              className="text-lg leading-snug sm:text-right"
              style={{ fontFamily: "var(--ab-serif)", color: "var(--st-success)" }}
            >
              {PROBLEM.answer.total}
            </p>
          </div>
        </div>
      </Reveal>

      {/* The conclusion as a typographic band, matching the closing section's
          heading-left, detail-right layout rather than sitting in a box. */}
      <Reveal delay={0.1}>
        <div
          className="mt-14 grid gap-x-14 gap-y-6 border-t pt-8 lg:grid-cols-2"
          style={{ borderColor: "var(--st-border-strong)" }}
        >
          <div>
            <Label>{PROBLEM.answer.label}</Label>
            <h3
              className="mt-3 text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              {PROBLEM.answer.title.lead}
              <br />
              <span
                className="italic"
                style={{
                  fontFamily: "var(--ab-serif)",
                  fontWeight: 400,
                  color: "var(--st-accent-ink)",
                }}
              >
                {PROBLEM.answer.title.accent}
              </span>
            </h3>
          </div>
          <div className="lg:pt-1">
            <p className="text-sm leading-relaxed" style={{ color: "var(--st-text-muted)" }}>
              {PROBLEM.answer.body}
            </p>
            <a
              href="#blocks"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--st-accent-ink)" }}
            >
              {PROBLEM.answer.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 4 — The infrastructure
 * ------------------------------------------------------------------ */

/** The connector between two plates of the stack diagram. */
function Rung({ note }: { note?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-0.5">
      <span className="h-4 w-px" style={{ background: "var(--ab-ink-border-strong)" }} />
      {note ? (
        <span className="text-[11px]" style={{ color: "var(--ab-ink-faint)" }}>
          {note}
        </span>
      ) : null}
    </div>
  );
}

export function BlocksSection() {
  const [active, setActive] = useState(BLOCKS[0].key);
  const block = BLOCKS.find((item) => item.key === active) ?? BLOCKS[0];

  return (
    <Section id="blocks" tone="invert">
      <Reveal>
        <SectionHead
          tone="invert"
          eyebrow="What’s inside"
          title="What you can OEM"
          lede="Take the complete lifecycle, or license only the blocks your stack is missing. Your existing architecture stays the foundation. Nothing gets ripped out to make room."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <div className="space-y-1">
            {/* Top plate — the part of the arrangement that is never ours. */}
            <div
              className="rounded-[var(--st-radius-lg)] border p-5"
              style={{
                borderColor: "var(--ab-ink-border-strong)",
                background: "var(--ab-ink-raised)",
              }}
            >
              <Label tone="invert">Yours alone: the AI products you sell</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {YOURS_ALONE.map((item) => (
                  <Chip key={item} tone="invert">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>

            <Rung />

            {/* Middle plate — the blocks themselves. */}
            <div
              className="rounded-[var(--st-radius-lg)] border p-5"
              style={{
                borderColor: "var(--ab-accent-on-ink)",
                background: "color-mix(in srgb, var(--st-accent) 10%, transparent)",
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--ab-ink-text)", fontFamily: "var(--st-font-head)" }}
                >
                  AgentBlocks
                </span>
                <span className="text-[11px]" style={{ color: "var(--ab-ink-muted)" }}>
                  Pick one. Pick several. Pick all seven.
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {BLOCKS.map((item) => {
                  const on = item.key === active;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActive(item.key)}
                      aria-pressed={on}
                      className={cn(
                        "rounded-[var(--st-radius-sm)] border px-3.5 py-3 text-left transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--st-ring)]",
                      )}
                      style={{
                        borderColor: on ? "transparent" : "var(--ab-ink-border)",
                        background: on ? "var(--ab-ink-text)" : "var(--ab-ink)",
                        color: on ? "var(--ab-ink)" : "var(--ab-ink-text)",
                      }}
                    >
                      <span className="block text-[13px] font-semibold leading-tight">
                        {item.name}
                      </span>
                      <span
                        className="mt-0.5 block text-[11px]"
                        style={{
                          color: on ? "var(--ab-ink)" : "var(--ab-ink-muted)",
                          opacity: on ? 0.7 : 1,
                        }}
                      >
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[var(--st-radius-sm)] border border-dashed px-3.5 py-2.5"
                style={{ borderColor: "var(--ab-ink-border)" }}
              >
                <Label tone="invert">Included with every block</Label>
                {FOUNDATION.map((item) => (
                  <span key={item} className="text-[11px]" style={{ color: "var(--ab-ink-muted)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Rung note="connected through supported adapters" />

            {/* Bottom plate — what you already run, untouched. */}
            <div
              className="rounded-[var(--st-radius-lg)] border p-5"
              style={{
                borderColor: "var(--ab-ink-border-strong)",
                background: "var(--ab-ink-raised)",
              }}
            >
              <Label tone="invert">Stays in place: your existing platform</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {YOUR_STACK.map((item) => (
                  <Chip key={item} tone="invert">
                    {item}
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-[11px]" style={{ color: "var(--ab-ink-muted)" }}>
                Wired in, not rebuilt: {CONNECTED.join(", ").toLowerCase()}.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="sticky top-24 rounded-[var(--st-radius-lg)] border p-6"
            style={{ borderColor: "var(--ab-ink-border)", background: "var(--ab-ink-raised)" }}
          >
            <Label tone="invert">{block.tag}</Label>
            <h3
              className="mt-2 text-xl font-semibold"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--ab-ink-text)" }}
            >
              {block.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ab-ink-muted)" }}>
              {block.summary}
            </p>

            <ul className="mt-5 space-y-2.5">
              {block.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-sm">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--ab-accent-on-ink)" }}
                  />
                  <span style={{ color: "var(--ab-ink-muted)" }}>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--ab-ink-border)" }}>
              <Label tone="invert">What your customer experiences</Label>
              <p className="mt-1.5 text-sm" style={{ color: "var(--ab-ink-text)" }}>
                {block.customerSees}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 5 — Why AgentBlocks
 * ------------------------------------------------------------------ */

export function WhySection() {
  return (
    <Section id="why" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow="Why AgentBlocks"
          title="Built to fit, not lock you in"
          lede="Use the infrastructure you need, without giving up control of your product, stack, deployment, or customer."
        />
      </Reveal>

      <div className="mt-12 grid gap-x-14 md:grid-cols-2">
        {REASONS.map((reason, index) => (
          <Reveal key={reason.key} delay={(index % 2) * 0.06}>
            <div
              className="border-t py-7"
              style={{ borderColor: index < 2 ? "var(--st-border-strong)" : "var(--ab-rule)" }}
            >
              <h3
                className="text-lg font-semibold leading-snug"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text-muted)" }}>
                {reason.body}
              </p>
            </div>
          </Reveal>
        ))}
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

export function SessionSection() {
  return (
    <Section id="session" tone="invert">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <div>
            <Eyebrow tone="invert">Next step</Eyebrow>
            <h2
              className="mt-3 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--ab-ink-text)" }}
            >
              Own the product.
              <br />
              <span className="italic" style={{ fontFamily: "var(--ab-serif)", fontWeight: 400 }}>
                Skip the agent infrastructure build.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base" style={{ color: "var(--ab-ink-muted)" }}>
              One working session: what you keep, what AgentBlocks adds, and how you launch under
              your brand. Bring your architecture, leave with a plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={BOOKING_URL} variant="invert">
                {CTA_LABEL}
                <ArrowUpRight className="h-4 w-4" />
              </Cta>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="space-y-5">
            {SESSION_AGENDA.map((item) => (
              <li
                key={item.step}
                className="flex gap-4 border-t pt-5"
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
                  <p className="mt-1 text-sm" style={{ color: "var(--ab-ink-muted)" }}>
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
