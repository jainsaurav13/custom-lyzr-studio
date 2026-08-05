import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Studio primitives. Everything paints from `--st-*` custom properties so a
 * single brand kit repaints the whole app — no component knows a colour.
 */

type Variant = "primary" | "secondary" | "ghost" | "outline" | "accent";
type Size = "sm" | "md" | "lg" | "icon";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--st-primary)] text-[var(--st-primary-on)] hover:bg-[var(--st-primary-hover)] shadow-sm",
  accent: "bg-[var(--st-accent)] text-[var(--st-accent-on)] hover:opacity-90",
  secondary:
    "bg-[var(--st-raised)] text-[var(--st-text)] hover:bg-[var(--st-border)] border border-[var(--st-border)]",
  outline:
    "border border-[var(--st-border-strong)] text-[var(--st-text)] hover:bg-[var(--st-raised)]",
  ghost: "text-[var(--st-text-muted)] hover:bg-[var(--st-raised)] hover:text-[var(--st-text)]",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-3.5 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
  icon: "h-9 w-9 justify-center",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-[var(--st-radius-sm)] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--st-ring)]",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--st-radius)] border border-[var(--st-border)] bg-[var(--st-surface)]",
        "shadow-[var(--st-shadow)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-4 pb-3", className)}>
      <div className="min-w-0">
        <h3 className="font-[var(--st-font-head)] text-sm font-semibold text-[var(--st-text)]">
          {title}
        </h3>
        {subtitle ? <p className="mt-0.5 text-xs text-[var(--st-text-muted)]">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

type Tone = "neutral" | "brand" | "accent" | "success" | "warning" | "danger";

const TONES: Record<Tone, string> = {
  neutral: "bg-[var(--st-raised)] text-[var(--st-text-muted)] border-[var(--st-border)]",
  brand: "bg-[var(--st-primary-soft)] text-[var(--st-primary-ink)] border-[var(--st-primary-a30)]",
  accent: "bg-[var(--st-accent-soft)] text-[var(--st-accent-ink)] border-[var(--st-accent-soft)]",
  success: "bg-[var(--st-raised)] text-[var(--st-success)] border-[var(--st-border)]",
  warning: "bg-[var(--st-raised)] text-[var(--st-warning)] border-[var(--st-border)]",
  danger: "bg-[var(--st-raised)] text-[var(--st-danger)] border-[var(--st-border)]",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-5",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({
  tone = "success",
}: {
  tone?: "success" | "warning" | "danger" | "muted";
}) {
  const color =
    tone === "success"
      ? "var(--st-success)"
      : tone === "warning"
        ? "var(--st-warning)"
        : tone === "danger"
          ? "var(--st-danger)"
          : "var(--st-text-faint)";
  return (
    <span
      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
      style={{
        background: color,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 22%, transparent)`,
      }}
    />
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-center justify-between gap-2 text-xs font-medium text-[var(--st-text)]">
        {label}
        {hint ? <span className="font-normal text-[var(--st-text-faint)]">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

export const inputClass = cn(
  "w-full rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)]",
  "px-3 py-2 text-sm text-[var(--st-text)] placeholder:text-[var(--st-text-faint)]",
  "focus:border-[var(--st-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--st-ring)]",
);

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
  description?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-start justify-between gap-3 text-left"
    >
      <span className="min-w-0">
        <span className="block text-sm text-[var(--st-text)]">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-[var(--st-text-muted)]">{description}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors",
          checked ? "bg-[var(--st-primary)]" : "bg-[var(--st-border-strong)]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
            checked ? "left-[1.125rem]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  className,
}: {
  value: T;
  options: Array<{ value: T; label: ReactNode }>;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-0.5",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 rounded-[calc(var(--st-radius-sm)-2px)] px-2.5 py-1.5 text-xs font-medium transition-colors",
            option.value === value
              ? "bg-[var(--st-primary)] text-[var(--st-primary-on)]"
              : "text-[var(--st-text-muted)] hover:text-[var(--st-text)]",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Tabs<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Array<{ value: T; label: ReactNode }>;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-[var(--st-border)]">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "relative whitespace-nowrap px-3 py-2 text-sm transition-colors",
            option.value === value
              ? "text-[var(--st-text)]"
              : "text-[var(--st-text-muted)] hover:text-[var(--st-text)]",
          )}
        >
          {option.label}
          {option.value === value ? (
            <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--st-primary)]" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

export function Avatar({ name, src, size = 32 }: { name: string; src?: string; size?: number }) {
  const label = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--st-primary-soft)] text-[11px] font-semibold text-[var(--st-primary-ink)]"
      style={{ width: size, height: size }}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : label}
    </span>
  );
}

export function Meter({ value, tone = "brand" }: { value: number; tone?: "brand" | "accent" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--st-raised)]">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: tone === "brand" ? "var(--st-primary)" : "var(--st-accent)",
        }}
      />
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[var(--st-radius)] border border-dashed border-[var(--st-border-strong)] px-5 py-8 text-center text-sm text-[var(--st-text-muted)]">
      {children}
    </div>
  );
}
