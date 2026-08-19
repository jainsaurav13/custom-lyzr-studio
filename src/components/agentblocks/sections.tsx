import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  BLOCKS,
  BOOKING_URL,
  CASES,
  COMPARE,
  CONNECTED,
  ENGAGEMENTS,
  FOUNDATION,
  LIFECYCLE,
  OWNERSHIP,
  PATHS,
  SESSION_AGENDA,
  YOURS_ALONE,
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

/* ------------------------------------------------------------------ *
 * Why ownership matters
 * ------------------------------------------------------------------ */

function Flow({ steps, tone }: { steps: string[]; tone: "own" | "lose" }) {
  return (
    <ol className="mt-5 space-y-2">
      {steps.map((step, index) => {
        // The middle rung is the one under contention — the AI layer itself.
        const highlight = index === 1;
        return (
          <li key={step}>
            <div
              className="rounded-[var(--st-radius-sm)] border px-3.5 py-2.5 text-sm"
              style={{
                background: highlight
                  ? tone === "own"
                    ? "var(--st-primary)"
                    : "var(--st-raised)"
                  : "var(--st-surface)",
                borderColor: highlight && tone === "own" ? "transparent" : "var(--st-border)",
                color: highlight && tone === "own" ? "var(--st-primary-on)" : "var(--st-text)",
                borderStyle: highlight && tone === "lose" ? "dashed" : "solid",
              }}
            >
              {step}
            </div>
            {index < steps.length - 1 ? (
              <ArrowDown
                className="mx-auto my-1 h-3.5 w-3.5"
                style={{ color: "var(--st-text-faint)" }}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function ShiftSection() {
  return (
    <Section id="shift" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow="Why it matters"
          title={
            <>
              Applied AI creates a new platform layer. <Accent>Who owns it?</Accent>
            </>
          }
          lede="As software moves from answering questions to completing work, the customer interaction will stay inside your platform — or move somewhere else. Whoever owns that interaction owns the usage context, the economics and, eventually, the relationship."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Panel className="h-full p-6">
            <Label>Outcome A</Label>
            <h3
              className="mt-2 text-lg font-semibold"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              You own the platform layer
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text-muted)" }}>
              You keep the experience, the usage context, the customer relationship and the
              economics.
            </p>
            <Flow
              steps={[
                "Customer",
                "Your branded AI layer",
                "Your data and workflows",
                "Work completed",
              ]}
              tone="own"
            />
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <Panel className="h-full p-6">
            <Label>Outcome B</Label>
            <h3
              className="mt-2 text-lg font-semibold"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              Another layer owns it
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text-muted)" }}>
              A competitor, a horizontal platform or a layer your own customer builds controls the
              interaction — and the monetisation.
            </p>
            <Flow
              steps={["Customer", "External AI layer", "Your product as an API or data source"]}
              tone="lose"
            />
          </Panel>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <p
          className="mx-auto mt-12 max-w-3xl text-center text-xl leading-snug sm:text-2xl"
          style={{ fontFamily: "var(--ab-serif)", color: "var(--st-text)" }}
        >
          You do not lose the customer overnight. You lose the workflow,{" "}
          <span className="italic" style={{ color: "var(--st-accent-ink)" }}>
            one action at a time.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Where you start
 * ------------------------------------------------------------------ */

export function PathsSection() {
  return (
    <Section id="paths" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow="Where you start"
          title="Launch, harden, or extend."
          lede="Three entry points, one destination — AI products that complete work under your brand. You could be at any of them, or at all three, across different teams."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PATHS.map((path, index) => (
          <Reveal key={path.key} delay={index * 0.06}>
            <Panel className="flex h-full flex-col p-6">
              <span
                className="w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ background: "var(--st-accent-soft)", color: "var(--st-accent-ink)" }}
              >
                {path.stage}
              </span>
              <p
                className="mt-4 min-h-[4.75rem] text-sm leading-relaxed"
                style={{ color: "var(--st-text)" }}
              >
                {path.goal}
              </p>
              <div
                className="mt-5 space-y-3 border-t pt-4 text-sm"
                style={{ borderColor: "var(--ab-rule)" }}
              >
                <div>
                  <Label>You start from</Label>
                  <p className="mt-1" style={{ color: "var(--st-text-muted)" }}>
                    {path.from}
                  </p>
                </div>
                <div>
                  <Label>AgentBlocks adds</Label>
                  <p className="mt-1" style={{ color: "var(--st-text-muted)" }}>
                    {path.adds}
                  </p>
                </div>
                <div>
                  <Label>You keep</Label>
                  <p className="mt-1" style={{ color: "var(--st-text-muted)" }}>
                    {path.keeps}
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * What AgentBlocks adds — and what stays
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

export function OemSection() {
  const [active, setActive] = useState(BLOCKS[0].key);
  const block = BLOCKS.find((item) => item.key === active) ?? BLOCKS[0];

  return (
    <Section id="oem" tone="invert">
      <Reveal>
        <SectionHead
          tone="invert"
          eyebrow="What you get"
          title={
            <>
              Your customers see your product.{" "}
              <span className="italic" style={{ fontFamily: "var(--ab-serif)", fontWeight: 400 }}>
                AgentBlocks operates underneath it.
              </span>
            </>
          }
          lede="Your existing architecture stays the foundation. Take the complete lifecycle, or license only the blocks your stack is missing — nothing gets ripped out to make room."
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
              <Label tone="invert">Yours alone — your customer-facing product</Label>
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
                  What AgentBlocks adds
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
              <Label tone="invert">Stays in place — your existing stack</Label>
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

      {/* The lifecycle, as a rail rather than a section of its own. */}
      <Reveal delay={0.1}>
        <div className="mt-14 border-t pt-8" style={{ borderColor: "var(--ab-ink-border)" }}>
          <Label tone="invert">One governed lifecycle behind every agent</Label>
          <ol className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {LIFECYCLE.map((stage, index) => (
              <li key={stage.step} className="relative">
                <span
                  className="text-xs font-semibold tracking-[0.14em]"
                  style={{ color: "var(--ab-accent-on-ink)" }}
                >
                  {stage.step}
                </span>
                <p
                  className="mt-1.5 text-sm font-semibold"
                  style={{ color: "var(--ab-ink-text)", fontFamily: "var(--st-font-head)" }}
                >
                  {stage.title}
                </p>
                <p className="mt-1 text-sm" style={{ color: "var(--ab-ink-muted)" }}>
                  {stage.body}
                </p>
                {index < LIFECYCLE.length - 1 ? (
                  <ArrowRight
                    className="absolute -right-4 top-1 hidden h-3.5 w-3.5 lg:block"
                    style={{ color: "var(--ab-ink-faint)" }}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Customers
 * ------------------------------------------------------------------ */

export function CasesSection() {
  return (
    <Section id="cases" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow="Customers"
          title="Same building blocks. Different starting points."
          lede="One ISV launching a new product line, one enterprise hardening advisory workflows that were already live. Both keep their own platform, data and domain expertise."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {CASES.map((study, index) => (
          <Reveal key={study.key} delay={index * 0.08}>
            <Panel className="flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3
                  className="text-2xl font-semibold tracking-[-0.02em]"
                  style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                >
                  {study.customer}
                </h3>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ background: "var(--st-accent-soft)", color: "var(--st-accent-ink)" }}
                >
                  {study.status}
                </span>
              </div>
              <p className="mt-1.5 text-xs" style={{ color: "var(--st-text-muted)" }}>
                {study.meta}
              </p>

              <dl className="mt-5 space-y-3.5">
                {study.rows.map((row) => (
                  <div key={row.label}>
                    <dt>
                      <Label>{row.label}</Label>
                    </dt>
                    <dd
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: "var(--st-text)" }}
                    >
                      {row.value}
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
 * Ways to engage
 * ------------------------------------------------------------------ */

export function EngageSection() {
  return (
    <Section id="engage" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow="Ways to engage"
          title="Reusable infrastructure, and as much launch help as you want."
          lede="Every model preserves the same principle — your brand, your customer, your economics. What changes is how much of the first launch we do alongside you."
        />
      </Reveal>

      {/* A rule-separated list, not a third grid of cards. */}
      <div className="mt-12">
        {ENGAGEMENTS.map((option, index) => (
          <Reveal key={option.key} delay={index * 0.06}>
            <div
              className="grid gap-x-8 gap-y-2 border-t py-7 md:grid-cols-[12rem_1fr_13rem]"
              style={{ borderColor: "var(--st-border-strong)" }}
            >
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
        <Panel className="mt-10 p-6">
          <Label>Who owns what, once the launch team rolls off</Label>
          <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-3">
            {OWNERSHIP.map((row) => (
              <div key={row.who}>
                <dt
                  className="text-sm font-semibold"
                  style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
                >
                  {row.who}
                </dt>
                <dd
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--st-text-muted)" }}
                >
                  {row.body}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Buyer's guide — collapsed, off the main scroll
 * ------------------------------------------------------------------ */

const COLUMNS = [
  { key: "build", label: "Build it yourself" },
  { key: "hyperscaler", label: "Hyperscaler platforms" },
  { key: "point", label: "Point tools" },
  { key: "agentblocks", label: "AgentBlocks" },
] as const;

export function CompareSection() {
  return (
    <Section id="compare" tone="plain" className="py-12 sm:py-14">
      <Reveal>
        <details className="group">
          <summary
            className="flex cursor-pointer list-none items-center gap-3 text-sm font-medium marker:content-none"
            style={{ color: "var(--st-text)" }}
          >
            <ChevronDown
              className="h-4 w-4 transition-transform group-open:rotate-180"
              style={{ color: "var(--st-accent-ink)" }}
            />
            For the buyer&apos;s guide: how this compares to building it yourself, a hyperscaler, or
            point tools
          </summary>

          <div className="-mx-6 mt-8 overflow-x-auto px-6 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="w-56 py-3 pr-4 align-bottom">
                    <Label>Route</Label>
                  </th>
                  {COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-3 align-bottom text-sm font-semibold"
                      style={{
                        color:
                          column.key === "agentblocks" ? "var(--st-accent-ink)" : "var(--st-text)",
                        background:
                          column.key === "agentblocks" ? "var(--st-accent-soft)" : undefined,
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
            <p className="mt-4 text-xs" style={{ color: "var(--st-text-muted)" }}>
              Most customers keep their hyperscaler and point-tool investments and add AgentBlocks
              for brand, cross-stack governance and customer-controlled deployment.
            </p>
          </div>
        </details>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Next step
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
              Plan the AI product{" "}
              <span className="italic" style={{ fontFamily: "var(--ab-serif)", fontWeight: 400 }}>
                behind your brand.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base" style={{ color: "var(--ab-ink-muted)" }}>
              One working session: what stays, what AgentBlocks adds, and how you launch. Bring your
              architecture — leave with a plan.
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
