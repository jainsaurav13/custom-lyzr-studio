import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDot,
  Minus,
  RotateCcw,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  BLOCKS,
  CASES,
  COMPARE,
  ENGAGEMENTS,
  FOOTNOTES,
  FOUNDATION,
  KEEP_CONNECT_ADD,
  LIFECYCLE,
  METRICS,
  OWNERSHIP,
  PATHS,
  SESSION_AGENDA,
  YOURS_ALONE,
  YOUR_STACK,
  BOOKING_URL,
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
 * 1 — The strategic shift
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
          eyebrow="The strategic shift"
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
 * 2 — Three paths
 * ------------------------------------------------------------------ */

export function PathsSection() {
  return (
    <Section id="paths" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow="Three paths to applied AI"
          title="Where are you on your AI roadmap?"
          lede="Launch a product, harden the agents you already have, or extend the platform you already run. Every path ends in the same place — AI products that complete work under your brand."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PATHS.map((path, index) => (
          <Reveal key={path.key} delay={index * 0.06}>
            <Panel className="flex h-full flex-col p-6">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{
                    background: "var(--st-accent-soft)",
                    color: "var(--st-accent-ink)",
                  }}
                >
                  {path.stage}
                </span>
              </div>
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

      <Reveal delay={0.1}>
        <p className="mt-6 text-sm" style={{ color: "var(--st-text-faint)" }}>
          You could be at any of these stages — or at all three, across different teams.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 3 — What you can OEM (the stack)
 * ------------------------------------------------------------------ */

export function OemSection() {
  const [active, setActive] = useState(BLOCKS[0].key);
  const block = BLOCKS.find((item) => item.key === active) ?? BLOCKS[0];

  return (
    <Section id="oem" tone="invert">
      <Reveal>
        <SectionHead
          tone="invert"
          eyebrow="What you can OEM"
          title={
            <>
              Your customers see your product.{" "}
              <span className="italic" style={{ fontFamily: "var(--ab-serif)", fontWeight: 400 }}>
                AgentBlocks operates underneath it.
              </span>
            </>
          }
          lede="Embed a white-labeled agent builder, governance layer, runtime, deployment and observability. Take the complete lifecycle, or license only the blocks your existing stack is missing."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <div className="space-y-2.5">
            {/* Top plate — the part of the arrangement that is never ours. */}
            <div
              className="rounded-[var(--st-radius-lg)] border p-5"
              style={{
                borderColor: "var(--ab-ink-border-strong)",
                background: "var(--ab-ink-raised)",
              }}
            >
              <Label tone="invert">Your customer-facing product</Label>
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
                          color: on ? "var(--ab-ink)" : "var(--ab-ink-faint)",
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
                <Label tone="invert">Shared foundation · included with every block</Label>
                {FOUNDATION.map((item) => (
                  <span key={item} className="text-[11px]" style={{ color: "var(--ab-ink-muted)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Rung />

            {/* Bottom plate — what you already run, untouched. */}
            <div
              className="rounded-[var(--st-radius-lg)] border p-5"
              style={{
                borderColor: "var(--ab-ink-border-strong)",
                background: "var(--ab-ink-raised)",
              }}
            >
              <Label tone="invert">Your existing stack</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {YOUR_STACK.map((item) => (
                  <Chip key={item} tone="invert">
                    {item}
                  </Chip>
                ))}
              </div>
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

/** The connector between two plates of the stack diagram. */
function Rung() {
  return (
    <div className="flex justify-center py-0.5" aria-hidden="true">
      <span className="h-4 w-px" style={{ background: "var(--ab-ink-border-strong)" }} />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 4 — No rip-and-replace
 * ------------------------------------------------------------------ */

export function NoRipSection() {
  return (
    <Section id="keep" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow="No rip-and-replace"
          title={
            <>
              Keep what works. <Accent>Add only the blocks you need.</Accent>
            </>
          }
          lede="Your existing architecture stays the foundation. AgentBlocks connects to it and supplies the modules you choose — embedded behind your brand. Start with one block, or combine them into the complete OEM production layer."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {KEEP_CONNECT_ADD.map((column, index) => (
          <Reveal key={column.key} delay={index * 0.06}>
            <Panel
              className="h-full p-6"
              style={
                column.key === "add"
                  ? {
                      background: "var(--st-accent-soft)",
                      borderColor: "var(--st-accent-ink)",
                    }
                  : undefined
              }
            >
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {column.verb}
              </h3>
              <p className="mt-1.5 text-sm" style={{ color: "var(--st-text-muted)" }}>
                {column.line}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {column.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 5 — One governed lifecycle
 * ------------------------------------------------------------------ */

export function LifecycleSection() {
  return (
    <Section id="how" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow="How it works"
          title="One governed lifecycle behind every agent your customers use."
          lede="Build with AgentBlocks or connect an agent you already run. Then validate it, deploy it, operate it and improve it through a single versioned, auditable loop."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-4">
        {LIFECYCLE.map((stage, index) => (
          <Reveal key={stage.step} delay={index * 0.06}>
            <Panel className="relative h-full p-5">
              <span
                className="text-xs font-semibold tracking-[0.14em]"
                style={{ color: "var(--st-accent-ink)" }}
              >
                {stage.step}
              </span>
              <h3
                className="mt-2 text-base font-semibold"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text-muted)" }}>
                {stage.body}
              </p>
              {index < LIFECYCLE.length - 1 ? (
                <ArrowRight
                  className="absolute -right-3.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block"
                  style={{ color: "var(--st-text-faint)" }}
                  aria-hidden="true"
                />
              ) : null}
            </Panel>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p
          className="mt-6 flex items-center gap-2 text-sm"
          style={{ color: "var(--st-text-muted)" }}
        >
          <RotateCcw className="h-4 w-4" style={{ color: "var(--st-accent-ink)" }} />
          Back to the beginning — every version, evaluation and rollback is written to the audit
          trail.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 6 — Platform + pod
 * ------------------------------------------------------------------ */

export function PodSection() {
  return (
    <Section id="pod" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow="Platform + applied AI"
          title={
            <>
              The platform runs it. <Accent>The pod gets you there.</Accent>
            </>
          }
          lede="Reusable infrastructure under your brand, plus a temporary launch team that ships the first workflow and then hands it over. A launch accelerator — not a permanent services dependency."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal>
          <Panel className="h-full p-6">
            <Label>AgentBlocks platform</Label>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text)" }}>
              Builder, runtime, governance, deployment and observability — embedded behind your
              brand, operated under support and SLA.
            </p>
          </Panel>
        </Reveal>
        <Reveal delay={0.06}>
          <Panel className="h-full p-6">
            <Label>Applied AI pod</Label>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text)" }}>
              Product and engineering capacity to launch the first workflow, then transfer it to
              your team.
            </p>
          </Panel>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Label>Your product grows</Label>
          {["First workflow", "Branded workbench", "Agent marketplace"].map((stage, index) => (
            <span key={stage} className="flex items-center gap-3">
              {index > 0 ? (
                <ArrowRight className="h-3.5 w-3.5" style={{ color: "var(--st-text-faint)" }} />
              ) : null}
              <Chip>{stage}</Chip>
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {OWNERSHIP.map((row, index) => (
          <Reveal key={row.who} delay={index * 0.06}>
            <div
              className="h-full border-t pt-5"
              style={{ borderColor: "var(--st-border-strong)" }}
            >
              <Label>{row.who}</Label>
              <h3
                className="mt-2 text-lg font-semibold"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {row.what}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text-muted)" }}>
                {row.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 text-sm" style={{ color: "var(--st-text-faint)" }}>
          After launch, your team owns the roadmap. Lyzr keeps supporting the platform under SLA.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 7 — Proof
 * ------------------------------------------------------------------ */

export function ProofSection() {
  return (
    <Section id="proof" tone="invert">
      <Reveal>
        <SectionHead
          tone="invert"
          align="center"
          eyebrow="In production today"
          title="The infrastructure behind AgentBlocks is already running in production."
        />
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {METRICS.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.08}>
            <div className="text-center">
              <p
                className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--ab-ink-text)" }}
              >
                {metric.value}
                <sup
                  className="ml-1 align-super text-base font-normal"
                  style={{ color: "var(--ab-ink-faint)" }}
                >
                  {index + 1}
                </sup>
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--ab-ink-muted)" }}>
                {metric.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <ol
        className="mx-auto mt-12 max-w-3xl space-y-1 text-center text-[11px]"
        style={{ color: "var(--ab-ink-faint)" }}
      >
        {FOOTNOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 8 — Case studies
 * ------------------------------------------------------------------ */

export function CasesSection() {
  return (
    <Section id="cases" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow="Case studies"
          title="Same building blocks. Different starting points."
          lede="One customer launching a new product line, one hardening advisory workflows that were already live. Both keep their own platform, data and domain expertise."
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
              <p className="mt-1.5 text-xs" style={{ color: "var(--st-text-faint)" }}>
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

      <Reveal delay={0.1}>
        <p className="mt-6 text-[11px]" style={{ color: "var(--st-text-faint)" }}>
          ARR per Anaplan engagement documentation, April 2026. Per-engagement reporting;
          customer-approved wording pending.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 9 — Ways to engage
 * ------------------------------------------------------------------ */

export function EngageSection() {
  return (
    <Section id="engage" tone="paper">
      <Reveal>
        <SectionHead
          eyebrow="Ways to engage"
          title="Choose the level of support that matches your team."
          lede="Use the platform directly, or add an Applied AI pod when you need launch capacity. Every model preserves the same OEM principle: your brand, your customer, your economics."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {ENGAGEMENTS.map((option, index) => (
          <Reveal key={option.key} delay={index * 0.06}>
            <Panel className="flex h-full flex-col p-6">
              <span
                className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ background: "var(--st-raised)", color: "var(--st-text-muted)" }}
              >
                <CircleDot className="h-3 w-3" />
                {option.support}
              </span>
              <h3
                className="mt-4 text-lg font-semibold"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {option.title}
              </h3>
              <p
                className="mt-2 flex-1 text-sm leading-relaxed"
                style={{ color: "var(--st-text-muted)" }}
              >
                {option.body}
              </p>
              <p
                className="mt-5 border-t pt-4 text-xs"
                style={{ borderColor: "var(--ab-rule)", color: "var(--st-text-faint)" }}
              >
                {option.fit}
              </p>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 10 — How the routes compare
 * ------------------------------------------------------------------ */

const COLUMNS = [
  { key: "build", label: "Build it yourself" },
  { key: "hyperscaler", label: "Hyperscaler platforms" },
  { key: "point", label: "Point tools" },
  { key: "agentblocks", label: "AgentBlocks" },
] as const;

export function CompareSection() {
  return (
    <Section id="compare" tone="plain">
      <Reveal>
        <SectionHead
          eyebrow="How the routes compare"
          title="Build, hyperscaler, point tools, AgentBlocks — often in combination."
          lede="Most customers keep their hyperscaler and point-tool investments and add AgentBlocks for brand, cross-stack governance and customer-controlled deployment."
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
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
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 11 — Next step
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
              Define the OEM agent platform{" "}
              <span className="italic" style={{ fontFamily: "var(--ab-serif)", fontWeight: 400 }}>
                behind your product.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base" style={{ color: "var(--ab-ink-muted)" }}>
              In one working session we map what stays, what AgentBlocks adds and how you launch
              under your brand. Bring your architecture — leave with a plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={BOOKING_URL} variant="invert">
                Book an OEM architecture session
                <ArrowUpRight className="h-4 w-4" />
              </Cta>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--ab-ink-border-strong)", color: "var(--ab-ink-text)" }}
              >
                Open a branded workbench
                <ArrowRight className="h-4 w-4" />
              </a>
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
