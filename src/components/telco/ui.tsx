import type { CSSProperties, ReactNode } from "react";

import { deriveTheme, LYZR_KIT } from "@/components/studio/brand/kit";
import { cn } from "@/lib/utils";

/**
 * Primitives for the telco partnership page, built on the same look as the
 * AgentBlocks page: Lyzr's own kit — near-black actions, one warm accent — with
 * a serif display face and ink panels for the moments that need weight.
 */

const theme = deriveTheme({ ...LYZR_KIT, radius: 14 });

const SERIF = '"Instrument Serif", "Playfair Display", Georgia, serif';

/** The page's own tokens, applied once on the root element. */
export const PAGE_VARS = {
  ...theme.vars,
  "--ab-paper": "#f6f5f4",
  "--ab-ink": "#131011",
  "--ab-ink-raised": "#211e1f",
  "--ab-ink-border": "rgba(255, 255, 255, 0.12)",
  "--ab-ink-text": "#f7f4f2",
  "--ab-ink-muted": "rgba(247, 244, 242, 0.78)",
  "--ab-ink-faint": "rgba(247, 244, 242, 0.6)",
  "--ab-accent-on-ink": "#b69b85",
  "--ab-rule": "rgba(20, 25, 36, 0.1)",
  "--ab-serif": SERIF,
  "--ab-hero-bg":
    "radial-gradient(900px 520px at 8% -20%, rgba(122, 74, 34, 0.14), transparent 62%), radial-gradient(720px 460px at 96% -8%, rgba(20, 25, 36, 0.07), transparent 60%)",
} as CSSProperties;

export const PAGE_BG = theme.vars["--st-bg"];

/** Page gutter: every band lines up on this container. */
export function Shell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, onInk = false }: { children: ReactNode; onInk?: boolean }) {
  return (
    <p
      className="text-[11px] font-semibold tracking-[0.16em] uppercase"
      style={{ color: onInk ? "var(--ab-accent-on-ink)" : "var(--st-accent-ink)" }}
    >
      {children}
    </p>
  );
}

export function Display({
  children,
  className,
  onInk = false,
}: {
  children: ReactNode;
  className?: string;
  onInk?: boolean;
}) {
  return (
    <h2
      className={cn(
        "text-[1.85rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.35rem]",
        className,
      )}
      style={{
        fontFamily: "var(--ab-serif)",
        color: onInk ? "var(--ab-ink-text)" : "var(--st-text)",
      }}
    >
      {children}
    </h2>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn("max-w-2xl text-[1.0625rem] leading-snug", className)}
      style={{ color: "var(--st-text-muted)" }}
    >
      {children}
    </p>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  rule = true,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  rule?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-14 sm:py-18", rule && "border-t")}
      style={rule ? { borderColor: "var(--ab-rule)" } : undefined}
    >
      <Shell>
        <header className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display className="mt-3 text-balance">{title}</Display>
          {lede ? <Lede className="mt-4">{lede}</Lede> : null}
        </header>
        {children ? <div className="mt-10">{children}</div> : null}
      </Shell>
    </section>
  );
}

export function Card({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("rounded-[var(--st-radius)] border p-6", className)}
      style={{
        borderColor: "var(--st-border)",
        background: "var(--st-surface-2)",
        boxShadow: "var(--st-shadow)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The inverted panel the AgentBlocks page uses for its heaviest statements. */
export function InkPanel({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("rounded-[var(--st-radius-lg)] p-8 sm:p-10", className)}
      style={{ background: "var(--ab-ink)", color: "var(--ab-ink-text)", ...style }}
    >
      {children}
    </div>
  );
}

export function Heading3({
  children,
  className,
  onInk = false,
}: {
  children: ReactNode;
  className?: string;
  onInk?: boolean;
}) {
  return (
    <h3
      className={cn("text-[15px] font-semibold tracking-[-0.01em]", className)}
      style={{
        fontFamily: "var(--st-font-head)",
        color: onInk ? "var(--ab-ink-text)" : "var(--st-text)",
      }}
    >
      {children}
    </h3>
  );
}

export function Body({
  children,
  className,
  onInk = false,
}: {
  children: ReactNode;
  className?: string;
  onInk?: boolean;
}) {
  return (
    <p
      className={cn("text-[13px] leading-relaxed", className)}
      style={{ color: onInk ? "var(--ab-ink-muted)" : "var(--st-text-muted)" }}
    >
      {children}
    </p>
  );
}

/** Hairline-marked list — the page's workhorse, in place of coloured bullets. */
export function RuleList({
  items,
  className,
  onInk = false,
}: {
  items: ReactNode[];
  className?: string;
  onInk?: boolean;
}) {
  return (
    <ul className={cn("divide-y", className)} style={{ borderColor: "transparent" }}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 py-2 text-[13px] leading-relaxed first:pt-0 last:pb-0"
          style={{
            color: onInk ? "var(--ab-ink-muted)" : "var(--st-text-muted)",
            borderColor: onInk ? "var(--ab-ink-border)" : "var(--ab-rule)",
            borderTopWidth: index === 0 ? 0 : 1,
          }}
        >
          <span
            aria-hidden
            className="mt-2 h-px w-3 shrink-0"
            style={{ background: onInk ? "var(--ab-accent-on-ink)" : "var(--st-accent)" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Two-part numeral, set the way the AgentBlocks tables number their rows. */
export function Numeral({ value, onInk = false }: { value: number; onInk?: boolean }) {
  return (
    <span
      className="inline-flex items-baseline gap-0.5 text-xs font-semibold tracking-[0.12em] tabular-nums"
      style={{ color: onInk ? "var(--ab-accent-on-ink)" : "var(--st-accent-ink)" }}
    >
      <span style={{ opacity: 0.5 }}>0</span>
      <span>{value}</span>
    </span>
  );
}

export function Pill({ children, onInk = false }: { children: ReactNode; onInk?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
      style={
        onInk
          ? {
              borderColor: "var(--ab-ink-border)",
              color: "var(--ab-ink-muted)",
              background: "var(--ab-ink-raised)",
            }
          : {
              borderColor: "var(--st-border)",
              color: "var(--st-text-muted)",
              background: "var(--st-surface)",
            }
      }
    >
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "on-ink";
  className?: string;
}) {
  const styles: Record<string, CSSProperties> = {
    primary: { background: "var(--st-primary)", color: "var(--st-primary-on)" },
    outline: {
      border: "1px solid var(--st-border-strong)",
      color: "var(--st-text)",
      background: "transparent",
    },
    "on-ink": { background: "var(--ab-ink-text)", color: "var(--ab-ink)" },
  };
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--st-radius-sm)] px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90",
        className,
      )}
      style={styles[variant]}
    >
      {children}
    </a>
  );
}
