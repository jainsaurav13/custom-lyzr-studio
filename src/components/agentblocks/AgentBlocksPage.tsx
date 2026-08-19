import { useMemo } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BOOKING_URL, HERO, NAV_LINKS, PROOF_STRIP, WORKBENCH_DEMO_URL } from "./content";
import { Chip, Container, Cta, Reveal } from "./primitives";
import {
  CasesSection,
  CompareSection,
  EngageSection,
  OemSection,
  PathsSection,
  SessionSection,
  ShiftSection,
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
        <a href="#top" className="flex items-baseline gap-2">
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

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors"
              style={{ color: "var(--st-text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Cta href={BOOKING_URL} className="hidden px-4 py-2 sm:inline-flex">
          Plan your AI product
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
        <div className="grid items-center gap-14 pb-14 sm:pb-16 lg:grid-cols-[1.12fr_1fr]">
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
                className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[3.2rem]"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                {HERO.headline}
                <br />
                <span
                  className="italic"
                  style={{
                    fontFamily: "var(--ab-serif)",
                    fontWeight: 400,
                    color: "var(--st-accent-ink)",
                  }}
                >
                  {HERO.headlineAccent}
                </span>
              </h1>

              <p
                className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--st-text-muted)" }}
              >
                {HERO.sub}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 flex flex-wrap gap-2">
                {HERO.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href={BOOKING_URL}>
                  Plan your AI product
                  <ArrowUpRight className="h-4 w-4" />
                </Cta>
                <Cta href="#oem" variant="quiet">
                  See how AgentBlocks fits your stack
                  <ArrowRight className="h-4 w-4" />
                </Cta>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div>
              <WorkbenchPreview />
              <p className="mt-4 text-xs" style={{ color: "var(--st-text-muted)" }}>
                Example: the workbench wearing one customer&apos;s logo, palette and typeface.{" "}
                <a
                  href={WORKBENCH_DEMO_URL}
                  className="underline underline-offset-2"
                  style={{ color: "var(--st-accent-ink)" }}
                >
                  Open a live one
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Proof, before the reader has to scroll for it. */}
      <div className="border-t" style={{ borderColor: "var(--ab-rule)" }}>
        <Container>
          <dl className="grid gap-x-10 gap-y-6 py-8 sm:grid-cols-3">
            {PROOF_STRIP.map((item) => (
              <div key={item.label}>
                <dt
                  className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "var(--st-accent-ink)" }}
                >
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug" style={{ color: "var(--st-text)" }}>
                  {item.fact}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
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
              Plan your AI product
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

/**
 * The AgentBlocks page: outcome-led hero, proof, why ownership matters, where
 * you start, what you get, who has bought it, how to engage, and the session to
 * book. It wears the same palette, type and component language as the product
 * it is selling.
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
        <ShiftSection />
        <PathsSection />
        <OemSection />
        <CasesSection />
        <EngageSection />
        <CompareSection />
        <SessionSection />
      </main>
      <Footer />
    </div>
  );
}
