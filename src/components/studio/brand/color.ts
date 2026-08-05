/**
 * Small, dependency-free colour maths used to turn a single brand colour into a
 * complete UI theme. Everything works in sRGB hex in / hex out so the values can
 * be dropped straight into CSS custom properties.
 */

export type Rgb = { r: number; g: number; b: number };
export type Hsl = { h: number; s: number; l: number };

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export function normalizeHex(input: string): string | null {
  if (!input) return null;
  let hex = input.trim().toLowerCase();
  if (!hex.startsWith("#")) hex = `#${hex}`;
  if (/^#[0-9a-f]{3}$/.test(hex)) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  if (/^#[0-9a-f]{8}$/.test(hex)) return hex.slice(0, 7);
  if (/^#[0-9a-f]{6}$/.test(hex)) return hex;
  return null;
}

export function hexToRgb(hex: string): Rgb {
  const safe = normalizeHex(hex) ?? "#000000";
  return {
    r: parseInt(safe.slice(1, 3), 16),
    g: parseInt(safe.slice(3, 5), 16),
    b: parseInt(safe.slice(5, 7), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const c = (n: number) =>
    Math.round(clamp(n, 0, 255))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h *= 60;
  }
  return { h, s, l };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s);
  const lig = clamp(l);
  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lig - c / 2;
  let rgb: [number, number, number];
  if (hue < 60) rgb = [c, x, 0];
  else if (hue < 120) rgb = [x, c, 0];
  else if (hue < 180) rgb = [0, c, x];
  else if (hue < 240) rgb = [0, x, c];
  else if (hue < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return {
    r: (rgb[0] + m) * 255,
    g: (rgb[1] + m) * 255,
    b: (rgb[2] + m) * 255,
  };
}

export const hexToHsl = (hex: string) => rgbToHsl(hexToRgb(hex));
export const hslToHex = (hsl: Hsl) => rgbToHex(hslToRgb(hsl));

export function adjust(hex: string, { h = 0, s = 0, l = 0 }: Partial<Hsl>): string {
  const base = hexToHsl(hex);
  return hslToHex({
    h: base.h + h,
    s: clamp(base.s + s),
    l: clamp(base.l + l),
  });
}

export function setLightness(hex: string, l: number, s?: number): string {
  const base = hexToHsl(hex);
  return hslToHex({ h: base.h, s: s === undefined ? base.s : s, l });
}

export function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const k = clamp(t);
  return rgbToHex({
    r: ca.r + (cb.r - ca.r) * k,
    g: ca.g + (cb.g - ca.g) * k,
    b: ca.b + (cb.b - ca.b) * k,
  });
}

export function alpha(hex: string, a: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${clamp(a)})`;
}

/** WCAG relative luminance. */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Pick the ink (near-black or near-white) that reads best on `bg`. */
export function readableInk(bg: string, dark = "#0B0D12", light = "#FFFFFF") {
  return contrast(bg, dark) >= contrast(bg, light) ? dark : light;
}

/**
 * Nudge `fg` until it clears `ratio` against `bg`, walking lightness in the
 * direction that helps. Used so a customer's pale-yellow brand colour still
 * produces legible links and labels.
 */
export function ensureContrast(fg: string, bg: string, ratio = 4.5): string {
  if (contrast(fg, bg) >= ratio) return fg;
  const bgLum = luminance(bg);
  const dir = bgLum > 0.35 ? -1 : 1;
  const base = hexToHsl(fg);
  for (let step = 1; step <= 24; step++) {
    const candidate = hslToHex({
      h: base.h,
      s: base.s,
      l: clamp(base.l + dir * step * 0.035),
    });
    if (contrast(candidate, bg) >= ratio) return candidate;
  }
  return dir > 0 ? "#FFFFFF" : "#0B0D12";
}

/** Chroma-ish score used to reject greys when mining colours off a website. */
export function vividness(hex: string): number {
  const { s, l } = hexToHsl(hex);
  const midness = 1 - Math.abs(l - 0.5) * 2;
  return s * (0.35 + 0.65 * midness);
}

export function isNeutral(hex: string): boolean {
  const { s, l } = hexToHsl(hex);
  return s < 0.12 || l < 0.06 || l > 0.96;
}

/** Perceptual distance, good enough for de-duplicating scraped palettes. */
export function distance(a: string, b: string): number {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return Math.sqrt(
    (ca.r - cb.r) ** 2 * 0.3 + (ca.g - cb.g) ** 2 * 0.59 + (ca.b - cb.b) ** 2 * 0.11,
  );
}

/** A single-hue ramp from the brand colour — used for charts and meters. */
export function ramp(hex: string, steps: number, mode: "dark" | "light"): string[] {
  const { h, s } = hexToHsl(hex);
  const from = mode === "dark" ? 0.32 : 0.86;
  const to = mode === "dark" ? 0.78 : 0.36;
  return Array.from({ length: steps }, (_, i) => {
    const t = steps === 1 ? 0.5 : i / (steps - 1);
    return hslToHex({ h, s: clamp(s * (0.65 + 0.35 * t)), l: from + (to - from) * t });
  });
}
