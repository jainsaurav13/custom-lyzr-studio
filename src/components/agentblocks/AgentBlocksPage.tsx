import { useMemo } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BOOKING_URL, NAV_LINKS } from "./content";
import { Chip, Container, Cta, Reveal } from "./primitives";
import {
  CasesSection,
  CompareSection,
  EngageSection,
  LifecycleSection,
  NoRipSection,
  OemSection,
  PathsSection,
  PodSection,
  ProofSection,
  SessionSection,
  ShiftSection,
} from "./sections";
import { agentBlocksVars } from "./theme";
import { WorkbenchPreview } from "./WorkbenchPreview";

const HERO_CHIPS = [
  "Start fresh or bring existing agents",
  "Co-build, integrate, or self-operate",
  "Full platform or modular blocks",
];

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
          <span className="text-xs" style={{ color: "var(--st-text-faint)" }}>
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

        <Cta href="#session" className="hidden px-4 py-2 sm:inline-flex">
          Book a session
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
      className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24"
      style={{ background: "var(--ab-hero-bg), var(--st-bg)" }}
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
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
                For independent software vendors
              </span>

              <h1
                className="mt-6 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[3.4rem]"
                style={{ fontFamily: "var(--st-font-head)", color: "var(--st-text)" }}
              >
                OEM agent infrastructure,
                <br />
                <span
                  className="italic"
                  style={{
                    fontFamily: "var(--ab-serif)",
                    fontWeight: 400,
                    color: "var(--st-accent-ink)",
                  }}
                >
                  under your own brand.
                </span>
              </h1>

              <p
                className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--st-text-muted)" }}
              >
                AgentBlocks gives ISVs the production building blocks to launch, govern and scale AI
                products your customers experience as <em>yours</em> — without replacing what
                already works.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 flex flex-wrap gap-2">
                {HERO_CHIPS.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href="#session">
                  Book an OEM architecture session
                  <ArrowUpRight className="h-4 w-4" />
                </Cta>
                <Cta href="/" variant="quiet">
                  See a branded workbench
                  <ArrowRight className="h-4 w-4" />
                </Cta>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div>
              <WorkbenchPreview />
              <p className="mt-4 text-xs" style={{ color: "var(--st-text-faint)" }}>
                The same workbench, wearing a customer&apos;s logo, palette and typeface. Your brand
                on the surface; AgentBlocks underneath.
              </p>
            </div>
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
              AgentBlocks <span style={{ color: "var(--st-text-faint)" }}>by Lyzr</span>
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--st-text-faint)" }}>
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
              Book a session
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

/**
 * The AgentBlocks page: one scroll that takes an executive from "why does this
 * matter to my platform" to "here is the session I should book", using the same
 * palette, type and component language as the product it is selling.
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
        <NoRipSection />
        <LifecycleSection />
        <PodSection />
        <ProofSection />
        <CasesSection />
        <EngageSection />
        <CompareSection />
        <SessionSection />
      </main>
      <Footer />
    </div>
  );
}
