import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Minus, X } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  BLOCKS,
  BOOKING_URL,
  COMPARE,
  CONNECTED,
  CREDIBILITY,
  ENGAGEMENTS,
  FAQS,
  FOUNDATION,
  OWNERSHIP,
  PARTNERS,
  PROBLEM,
  REASONS,
  SESSION_AGENDA,
  YOURS_ALONE,
  YOUR_STACK,
} from "./content";
import { Chip, Cta, Eyebrow, Label, Panel, Reveal, Section, SectionHead } from "./primitives";

/* ------------------------------------------------------------------ *
 * 2 — Credibility
 * ------------------------------------------------------------------ */

export function PartnersSection() {
  return (
    <Section id="partners" tone="paper">
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow={CREDIBILITY.eyebrow}
            title={CREDIBILITY.title}
            lede={CREDIBILITY.lede}
            className="max-w-2xl"
          />
          <div className="shrink-0 lg:text-right">
            <p
              className="text-5xl font-semibold tracking-[-0.04em]"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              {CREDIBILITY.stat.value}
            </p>
            <p className="mt-1 max-w-[16rem] text-sm" style={{ color: "var(--st-text-muted)" }}>
              {CREDIBILITY.stat.label}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {PARTNERS.map((partner, index) => (
          <Reveal key={partner.key} delay={index * 0.08}>
            <Panel className="flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3
                  className="text-2xl font-semibold tracking-[-0.02em]"
                  style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                >
                  {partner.name}
                </h3>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ background: "var(--st-accent-soft)", color: "var(--st-accent-ink)" }}
                >
                  {partner.status}
                </span>
              </div>
              <p className="mt-1 text-xs" style={{ color: "var(--st-text-muted)" }}>
                {partner.meta}
              </p>
              <p
                className="mt-4 text-base leading-snug"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {partner.headline}
              </p>

              <dl
                className="mt-5 space-y-3 border-t pt-4"
                style={{ borderColor: "var(--ab-rule)" }}
              >
                {partner.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>
                      <Label>{fact.label}</Label>
                    </dt>
                    <dd className="mt-1 text-sm" style={{ color: "var(--st-text-muted)" }}>
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 3 — The problem
 * ------------------------------------------------------------------ */

export function ProblemSection() {
  return (
    <Section id="problem" tone="plain">
      <Reveal>
        <SectionHead eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} lede={PROBLEM.lede} />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <div>
            <Label>What your team ends up building instead of product</Label>
            <ul className="mt-4 space-y-3">
              {PROBLEM.burden.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--st-danger)" }}
                    aria-hidden="true"
                  />
                  <span style={{ color: "var(--st-text)" }}>{item}</span>
                </li>
              ))}
            </ul>
            <p
              className="mt-6 border-t pt-5 text-lg leading-snug sm:text-xl"
              style={{
                borderColor: "var(--ab-rule)",
                fontFamily: "var(--ab-serif)",
                color: "var(--st-text)",
              }}
            >
              {PROBLEM.punchline}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Panel
            className="p-7"
            style={{ background: "var(--st-accent-soft)", borderColor: "var(--st-accent-ink)" }}
          >
            <Label>The answer</Label>
            <h3
              className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.02em]"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              {PROBLEM.answer.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--st-text)" }}>
              {PROBLEM.answer.body}
            </p>
            <a
              href="#blocks"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--st-accent-ink)" }}
            >
              See what is inside
              <ArrowRight className="h-4 w-4" />
            </a>
          </Panel>
        </Reveal>
      </div>
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
          eyebrow="What's inside"
          title="What you can OEM"
          lede="Take the complete lifecycle, or license only the blocks your stack is missing. Your existing architecture stays the foundation — nothing gets ripped out to make room."
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
              <Label tone="invert">Yours alone — the AI products you sell</Label>
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
              <Label tone="invert">Stays in place — your existing platform</Label>
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
          lede="Every one of these is a decision you would otherwise have to make yourself, defend to a customer's procurement team, and then maintain."
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
 * The ownership split. Three columns divided by hairlines, each headed by the
 * possessive rather than a label — the argument of the whole panel is that the
 * first column says "Yours" and never changes hands.
 */
function OwnershipSplit() {
  return (
    <div
      className="mt-12 overflow-hidden rounded-[var(--st-radius-lg)] border"
      style={{ background: "var(--st-surface-2)", borderColor: "var(--st-border)" }}
    >
      <div
        className="flex flex-wrap items-baseline justify-between gap-2 border-b px-6 py-4"
        style={{ borderColor: "var(--ab-rule)" }}
      >
        <Label>Who owns what, once the launch team rolls off</Label>
        <span className="text-xs" style={{ color: "var(--st-text-muted)" }}>
          Written into the agreement, not assumed
        </span>
      </div>

      <dl className="grid sm:grid-cols-3">
        {OWNERSHIP.map((row, index) => {
          const yours = index === 0;
          return (
            <div
              key={row.who}
              className={cn("flex flex-col p-6", index > 0 && "border-t sm:border-l sm:border-t-0")}
              style={{
                borderColor: "var(--ab-rule)",
                background: yours ? "var(--st-accent-soft)" : undefined,
              }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: yours ? "var(--st-accent-ink)" : "var(--st-text-faint)" }}
              >
                {row.holder}
              </span>
              <dt
                className="mt-2 text-2xl leading-none"
                style={{
                  fontFamily: "var(--ab-serif)",
                  color: yours ? "var(--st-accent-ink)" : "var(--st-text)",
                }}
              >
                {row.what}
              </dt>
              <dd
                className="mt-3 flex-1 text-sm leading-relaxed"
                style={{ color: "var(--st-text-muted)" }}
              >
                {row.body}
              </dd>
              <p
                className="mt-4 border-t pt-3 text-xs font-medium"
                style={{ borderColor: "var(--ab-rule)", color: "var(--st-text)" }}
              >
                {row.who}
              </p>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export function StartSection() {
  return (
    <Section id="start" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow="Get started"
          title="Start where you are. We’ll meet you there."
          lede="Every one preserves the same principle — your brand, your customer, your economics."
        />
      </Reveal>

      <div className="mt-12">
        {ENGAGEMENTS.map((option, index) => (
          <Reveal key={option.key} delay={index * 0.06}>
            <div
              className="grid gap-x-8 gap-y-2 border-t py-7 md:grid-cols-[3rem_12rem_1fr_13rem]"
              style={{ borderColor: "var(--st-border-strong)" }}
            >
              <span
                className="text-xs font-semibold tracking-[0.14em]"
                style={{ color: "var(--st-accent-ink)" }}
              >
                {option.step}
              </span>
              <div>
                <Label>{option.support}</Label>
                <h3
                  className="mt-1.5 text-lg font-semibold"
                  style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                >
                  {option.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--st-text-muted)" }}>
                {option.body}
              </p>
              <p className="text-sm" style={{ color: "var(--st-text-muted)" }}>
                {option.fit}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <OwnershipSplit />
      </Reveal>
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
              Stop building infrastructure.{" "}
              <span className="italic" style={{ fontFamily: "var(--ab-serif)", fontWeight: 400 }}>
                Start shipping the product.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base" style={{ color: "var(--ab-ink-muted)" }}>
              One working session: what you keep, what AgentBlocks adds, and how you launch under
              your brand. Bring your architecture — leave with a plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={BOOKING_URL} variant="invert">
                Plan your AI product
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
