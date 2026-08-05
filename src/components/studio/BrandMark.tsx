import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { useBrand } from "./brand/BrandProvider";
import { initials } from "./brand/kit";

/** Aspect ratio of the current logo — decides wordmark vs. square treatment. */
function useLogoAspect(logoUrl: string): number | null {
  const [aspect, setAspect] = useState<number | null>(null);
  useEffect(() => {
    if (!logoUrl || typeof Image === "undefined") {
      setAspect(null);
      return;
    }
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (!cancelled && image.naturalHeight > 0) {
        setAspect(image.naturalWidth / image.naturalHeight);
      }
    };
    image.onerror = () => {
      if (!cancelled) setAspect(null);
    };
    image.src = logoUrl;
    return () => {
      cancelled = true;
    };
  }, [logoUrl]);
  return aspect;
}

const WORDMARK_RATIO = 2.2;

/**
 * The customer's logo wherever a product icon would sit. Wide wordmarks would
 * shrink to nothing in a square, so those fall back to a monogram built from
 * the brand colours — the same trade-off real white-label products make.
 */
export function BrandMark({ size = 32, className }: { size?: number; className?: string }) {
  const { kit } = useBrand();
  const aspect = useLogoAspect(kit.logoUrl);
  const usable = kit.logoUrl && (aspect === null || aspect < WORDMARK_RATIO);

  if (usable) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <img
          src={kit.logoUrl}
          alt={`${kit.company} logo`}
          className="h-full w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center font-semibold", className)}
      style={{
        width: size,
        height: size,
        borderRadius: "calc(var(--st-radius-sm) + 2px)",
        background: "linear-gradient(135deg, var(--st-primary), var(--st-accent))",
        color: "var(--st-primary-on)",
        fontSize: size * 0.4,
        letterSpacing: "-0.02em",
      }}
    >
      {initials(kit.company)}
    </span>
  );
}

/**
 * Logo + company name, as it appears at the top of the sidebar. On a dark or
 * brand-filled sidebar the logo sits on a light plate, because a customer's
 * logo is usually drawn in their own brand colour and would vanish otherwise.
 */
export function BrandLockup({
  size = 32,
  showProduct = true,
  plate = false,
  className,
}: {
  size?: number;
  showProduct?: boolean;
  plate?: boolean;
  className?: string;
}) {
  const { kit } = useBrand();
  const aspect = useLogoAspect(kit.logoUrl);
  const isWordmark = Boolean(kit.logoUrl) && aspect !== null && aspect >= WORDMARK_RATIO;
  const plateClass = plate ? "rounded-[var(--st-radius-sm)] bg-white/92 px-2 py-1.5" : "";

  if (isWordmark) {
    return (
      <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
        <img
          src={kit.logoUrl}
          alt={`${kit.company} logo`}
          className={cn("w-auto max-w-[150px] object-contain", plateClass)}
          style={{ height: plate ? size * 0.85 + 12 : size * 0.85 }}
        />
        {showProduct ? (
          <span
            className="shrink-0 border-l pl-2.5 text-[11px] opacity-60"
            style={{ borderColor: "currentColor" }}
          >
            {kit.product}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <span className={cn("inline-flex items-center", kit.logoUrl ? plateClass : "")}>
        <BrandMark size={size} />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className="block truncate text-sm font-semibold"
          style={{ fontFamily: "var(--st-font-head)" }}
        >
          {kit.company}
        </span>
        {showProduct ? (
          <span className="block truncate text-[11px] opacity-60">{kit.product}</span>
        ) : null}
      </span>
    </span>
  );
}
