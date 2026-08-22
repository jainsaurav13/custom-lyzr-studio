import { motion, useReducedMotion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Layout and typographic primitives for the AgentBlocks page. Nothing here
 * knows a colour: every surface reads a `--st-*` or `--ab-*` property, exactly
 * like the studio's own components.
 */

/** Section rhythm. One container width for the whole page keeps the eye still. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}>{children}</div>;
}

/** Slides content up as it enters the viewport, unless the reader opted out. */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  tone = "ink",
  children,
}: {
  tone?: "ink" | "invert";
  children: ReactNode;
}) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: tone === "invert" ? "var(--ab-accent-on-ink)" : "var(--st-accent-ink)" }}
    >
      {children}
    </p>
  );
}

/** The serif italic the studio uses to lift one phrase out of a headline. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span
      className="italic"
      style={{ fontFamily: "var(--ab-serif)", fontWeight: 400, color: "var(--st-accent-ink)" }}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "ink",
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "ink" | "invert";
  align?: "left" | "center";
  className?: string;
}) {
  const invert = tone === "invert";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className="mt-3 text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.35rem]"
        style={{
          fontFamily: "var(--st-font-head)",
          color: invert ? "var(--ab-ink-text)" : "var(--st-text)",
        }}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className="mt-4 text-base leading-relaxed sm:text-[1.0625rem]"
          style={{ color: invert ? "var(--ab-ink-muted)" : "var(--st-text-muted)" }}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Printed-paper tooth for the warm band, inline so nothing is fetched. */
const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' " +
  "stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E" +
  "%3Crect width='180' height='180' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")";

/** A page section. `tone="invert"` paints the full-bleed ink band. */
export function Section({
  id,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  tone?: "paper" | "invert" | "plain" | "warm";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-20 sm:py-28", className)}
      style={{
        background:
          tone === "invert"
            ? "var(--ab-ink)"
            : tone === "paper"
              ? "var(--ab-paper)"
              : tone === "warm"
                ? `${PAPER_GRAIN}, var(--ab-warm)`
                : "var(--st-bg)",
        color: tone === "invert" ? "var(--ab-ink-text)" : "var(--st-text)",
      }}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** A bordered card that adapts to whichever band it is dropped into. */
export function Panel({
  tone = "ink",
  className,
  style,
  children,
  ...rest
}: {
  tone?: "ink" | "invert";
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">) {
  const invert = tone === "invert";
  return (
    <div
      className={cn("rounded-[var(--st-radius-lg)] border", className)}
      // Caller overrides win, but only for the properties they actually set.
      style={{
        background: invert ? "var(--ab-ink-raised)" : "var(--st-surface-2)",
        borderColor: invert ? "var(--ab-ink-border)" : "var(--st-border)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Small caps label used above lists and inside cards. */
export function Label({
  tone = "ink",
  children,
}: {
  tone?: "ink" | "invert";
  children: ReactNode;
}) {
  return (
    <span
      className="text-[10px] font-semibold uppercase tracking-[0.16em]"
      style={{ color: tone === "invert" ? "var(--ab-ink-faint)" : "var(--st-text-faint)" }}
    >
      {children}
    </span>
  );
}

export function Chip({
  tone = "ink",
  className,
  children,
}: {
  tone?: "ink" | "invert";
  className?: string;
  children: ReactNode;
}) {
  const invert = tone === "invert";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        className,
      )}
      style={{
        background: invert ? "var(--ab-ink-raised)" : "var(--st-surface)",
        borderColor: invert ? "var(--ab-ink-border)" : "var(--st-border)",
        color: invert ? "var(--ab-ink-muted)" : "var(--st-text-muted)",
      }}
    >
      {children}
    </span>
  );
}

type CtaProps = {
  href: string;
  variant?: "primary" | "quiet" | "invert";
  className?: string;
  children: ReactNode;
};

export function Cta({ href, variant = "primary", className, children }: CtaProps) {
  const style =
    variant === "primary"
      ? {
          background: "var(--st-primary)",
          color: "var(--st-primary-on)",
          borderColor: "transparent",
        }
      : variant === "invert"
        ? { background: "var(--ab-ink-text)", color: "var(--ab-ink)", borderColor: "transparent" }
        : {
            background: "transparent",
            color: "var(--st-text)",
            borderColor: "var(--st-border-strong)",
          };
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium",
        "transition-transform duration-200 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--st-ring)]",
        className,
      )}
      style={style}
    >
      {children}
    </a>
  );
}
