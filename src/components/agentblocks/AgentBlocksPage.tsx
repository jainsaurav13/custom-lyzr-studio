import { useMemo } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BOOKING_URL, CTA_LABEL, HERO, NAV_LINKS } from "./content";
import { Chip, Container, Cta, Reveal } from "./primitives";
import {
  BlocksSection,
  FaqSection,
  ProofSection,
  ProblemSection,
  SessionSection,
  StartSection,
  WhySection,
} from "./sections";
import { agentBlocksVars } from "./theme";
import { WorkbenchPreview } from "./WorkbenchPreview";

function Nav() {
  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur"
      style={{
        borderColor: "var(--ab-rule)",
        background: "color-mix(in srgb, var(--st-bg) 82%, transparent)",
      }}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex shrink-0 items-baseline gap-2">
          <span
            className="text-[15px] font-semibold tracking-[-0.02em]"
            style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
          >
            AgentBlocks
          </span>
          <span className="text-xs" style={{ color: "var(--st-text-muted)" }}>
            by Lyzr
          </span>
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm transition-colors"
              style={{ color: "var(--st-text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Cta
          href={BOOKING_URL}
          className="hidden shrink-0 whitespace-nowrap px-4 py-2 sm:inline-flex"
        >
          {CTA_LABEL}
          <ArrowRight className="h-3.5 w-3.5" />
        </Cta>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 sm:pt-24"
      style={{ background: "var(--ab-hero-bg), var(--st-bg)" }}
    >
      <Container>
        {/* Headline and screenshot share one row: the h1 is sized to the column
            it sits in, so the preview stays beside it rather than below. */}
        <div className="grid items-center gap-10 pb-16 sm:pb-20 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
          <div>
            <Reveal>
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{
                  borderColor: "var(--st-border-strong)",
                  color: "var(--st-accent-ink)",
                  background: "var(--st-surface)",
                }}
              >
                {HERO.eyebrow}
              </span>

              <h1
                className="mt-5 text-balance text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[2.7rem]"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {HERO.definition.lead}{" "}
                <span
                  className="italic"
                  style={{
                    fontFamily: "var(--ab-serif)",
                    fontWeight: 400,
                    color: "var(--st-accent-ink)",
                  }}
                >
                  {HERO.definition.emphasis}
                </span>{" "}
                {HERO.definition.tail}
              </h1>

              <p
                className="mt-5 max-w-xl text-base leading-relaxed"
                style={{ color: "var(--st-text-muted)" }}
              >
                {HERO.sub}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-6 flex flex-wrap gap-2">
                {HERO.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Cta href={BOOKING_URL}>
                  {CTA_LABEL}
                  <ArrowUpRight className="h-4 w-4" />
                </Cta>
                <Cta href="#blocks" variant="quiet">
                  See what’s inside
                  <ArrowRight className="h-4 w-4" />
                </Cta>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <WorkbenchPreview />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--st-bg)" }}>
      <Container>
        <div
          className="flex flex-col gap-6 border-t py-10 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--ab-rule)" }}
        >
          <div>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
            >
              AgentBlocks <span style={{ color: "var(--st-text-muted)" }}>by Lyzr</span>
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--st-text-muted)" }}>
              OEM agent infrastructure for independent software vendors.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs"
                style={{ color: "var(--st-text-muted)" }}
              >
                {link.label}
              </a>
            ))}
            <a href={BOOKING_URL} className="text-xs" style={{ color: "var(--st-accent-ink)" }}>
              {CTA_LABEL}
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

/**
 * The AgentBlocks page, in the order a stranger needs it: what it is and who it
 * is for, who already runs it, the problem it exists for, the infrastructure
 * that answers that problem, why this one, how to start, the questions that
 * come up, and the session to book. It wears the same palette, type and
 * component language as the product it is selling.
 */
export function AgentBlocksPage() {
  const vars = useMemo(() => agentBlocksVars(), []);

  return (
    <div
      style={{
        ...vars,
        fontFamily: "var(--st-font-body)",
        background: "var(--st-bg)",
        color: "var(--st-text)",
      }}
      className="min-h-screen antialiased"
    >
      <Nav />
      <main>
        <Hero />
        <ProofSection />
        <ProblemSection />
        <BlocksSection />
        <WhySection />
        <StartSection />
        <FaqSection />
        <SessionSection />
      </main>
      <Footer />
    </div>
  );
}
