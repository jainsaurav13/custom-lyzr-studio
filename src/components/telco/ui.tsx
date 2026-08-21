import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Primitives for the telco partnership page. This page is deliberately outside
 * the white-label studio: it is Lyzr's own document, so it paints from a fixed
 * palette taken from the partnership diagrams — Lyzr purple for Lyzr, telco
 * blue for the operator, green for the enterprise customer — rather than from
 * the `--st-*` brand kit.
 */

export const TONE = {
  lyzr: {
    ink: "#4C1D95",
    line: "#6D28D9",
    soft: "#F5F1FE",
    border: "#DDD1FA",
  },
  telco: {
    ink: "#1E3A8A",
    line: "#1D4ED8",
    soft: "#EFF4FE",
    border: "#C7DAFB",
  },
  enterprise: {
    ink: "#166534",
    line: "#16A34A",
    soft: "#F0FAF2",
    border: "#C6E9CE",
  },
} as const;

export type ToneName = keyof typeof TONE;

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  tint = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-t border-slate-200/80 py-16 sm:py-20", tint && "bg-white")}
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.16em] text-[#6D28D9] uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
          {lede ? <p className="mt-4 text-base leading-relaxed text-slate-600">{lede}</p> : null}
        </header>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}

export function Panel({
  tone,
  className,
  children,
}: {
  tone?: ToneName;
  className?: string;
  children: ReactNode;
}) {
  const t = tone ? TONE[tone] : null;
  return (
    <div
      className={cn("rounded-2xl border bg-white p-6", className)}
      style={{
        borderColor: t ? t.border : "#E2E8F0",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -18px rgba(15, 23, 42, 0.25)",
      }}
    >
      {children}
    </div>
  );
}

/** A bullet list with the small check marks used across the blueprint cards. */
export function CheckList({
  items,
  tone = "lyzr",
  className,
}: {
  items: ReactNode[];
  tone?: ToneName;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-relaxed text-slate-700">
          <span
            aria-hidden
            className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: TONE[tone].line }}
          >
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pill({ tone = "lyzr", children }: { tone?: ToneName; children: ReactNode }) {
  const t = TONE[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
      style={{ background: t.soft, borderColor: t.border, color: t.ink }}
    >
      {children}
    </span>
  );
}
