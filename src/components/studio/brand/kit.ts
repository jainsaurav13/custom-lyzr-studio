import type { BrandKit, ThemeMode } from "./types";
import {
  adjust,
  alpha,
  ensureContrast,
  hexToHsl,
  hslToHex,
  luminance,
  mix,
  normalizeHex,
  ramp,
  readableInk,
  setLightness,
} from "./color";

/** The un-branded studio: Lyzr's own look, and the starting point of every demo. */
export const LYZR_KIT: BrandKit = {
  v: 1,
  company: "Lyzr",
  product: "Studio",
  logoUrl: "",
  primary: "#6D5AE6",
  accent: "#22D3A6",
  background: "",
  mode: "dark",
  sidebar: "tinted",
  radius: 14,
  density: "comfortable",
  fontHeading: "Inter",
  fontBody: "Inter",
  texture: "glow",
  sourceUrl: "",
};

export const FONT_OPTIONS = [
  "Inter",
  "Manrope",
  "DM Sans",
  "Space Grotesk",
  "Sora",
  "Poppins",
  "IBM Plex Sans",
  "Work Sans",
  "Figtree",
  "Outfit",
  "Playfair Display",
  "Lora",
  "Source Serif 4",
  "IBM Plex Mono",
] as const;

export const SYSTEM_FONT_STACK =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

/** One-click looks for a rep who just wants something plausible fast. */
export const PRESETS: Array<{ name: string; kit: Partial<BrandKit> }> = [
  {
    name: "Lyzr",
    kit: {
      primary: "#6D5AE6",
      accent: "#22D3A6",
      mode: "dark",
      sidebar: "tinted",
      texture: "glow",
      fontHeading: "Inter",
      fontBody: "Inter",
      radius: 14,
    },
  },
  {
    name: "Enterprise blue",
    kit: {
      primary: "#1F6FEB",
      accent: "#00B4D8",
      mode: "light",
      sidebar: "contrast",
      texture: "none",
      fontHeading: "Inter",
      fontBody: "Inter",
      radius: 8,
    },
  },
  {
    name: "Fintech ink",
    kit: {
      primary: "#0F766E",
      accent: "#A3E635",
      mode: "dark",
      sidebar: "brand",
      texture: "grid",
      fontHeading: "Space Grotesk",
      fontBody: "Inter",
      radius: 6,
    },
  },
  {
    name: "Healthcare calm",
    kit: {
      primary: "#2563EB",
      accent: "#14B8A6",
      mode: "light",
      sidebar: "tinted",
      texture: "none",
      fontHeading: "Figtree",
      fontBody: "Figtree",
      radius: 18,
    },
  },
  {
    name: "Retail warm",
    kit: {
      primary: "#E2571F",
      accent: "#F5B301",
      mode: "light",
      sidebar: "brand",
      texture: "none",
      fontHeading: "Outfit",
      fontBody: "DM Sans",
      radius: 20,
    },
  },
  {
    name: "Bank classic",
    kit: {
      primary: "#8B1E3F",
      accent: "#C9A227",
      mode: "light",
      sidebar: "contrast",
      texture: "none",
      fontHeading: "Playfair Display",
      fontBody: "Source Serif 4",
      radius: 4,
    },
  },
];

/* ------------------------------------------------------------------ *
 * Theme derivation
 * ------------------------------------------------------------------ */

export interface StudioTheme {
  vars: Record<string, string>;
  chart: string[];
  ink: string;
  mode: ThemeMode;
}

/**
 * Turn a brand kit into the full set of CSS custom properties the studio reads.
 * Every surface, border and state colour is derived from the brand hue so an
 * uploaded logo and one hex code are enough for a believable white-label.
 */
export function deriveTheme(kit: BrandKit): StudioTheme {
  const dark = kit.mode === "dark";
  const primary = normalizeHex(kit.primary) ?? LYZR_KIT.primary;
  const accent = normalizeHex(kit.accent) ?? adjust(primary, { h: 42, s: 0.05 });
  const { h, s } = hexToHsl(primary);

  // Neutral surfaces carry a trace of the brand hue so the whole UI feels owned.
  const tint = Math.min(0.22, Math.max(0.06, s * 0.35));
  const bgAuto = dark
    ? hslToHex({ h, s: tint, l: 0.055 })
    : hslToHex({ h, s: Math.min(0.5, tint + 0.12), l: 0.985 });
  const bg = normalizeHex(kit.background) ?? bgAuto;
  const bgIsDark = luminance(bg) < 0.28;

  const surface = bgIsDark ? mix(bg, "#FFFFFF", 0.05) : mix(bg, "#FFFFFF", 0.7);
  const surface2 = bgIsDark ? mix(bg, "#FFFFFF", 0.09) : mix(bg, "#FFFFFF", 1);
  const raised = bgIsDark ? mix(bg, "#FFFFFF", 0.13) : mix(bg, primary, 0.05);
  const border = bgIsDark ? mix(bg, "#FFFFFF", 0.14) : mix(bg, primary, 0.14);
  const borderStrong = bgIsDark ? mix(bg, "#FFFFFF", 0.24) : mix(bg, primary, 0.26);
  const text = bgIsDark ? mix("#FFFFFF", primary, 0.06) : hslToHex({ h, s: 0.28, l: 0.11 });
  const textMuted = bgIsDark ? mix(text, bg, 0.42) : mix(text, bg, 0.4);
  const textFaint = bgIsDark ? mix(text, bg, 0.62) : mix(text, bg, 0.58);

  const primaryOn = readableInk(primary);
  const primaryHover = bgIsDark ? adjust(primary, { l: 0.06 }) : adjust(primary, { l: -0.05 });
  const primarySoft = bgIsDark ? mix(bg, primary, 0.22) : mix(bg, primary, 0.12);
  const primaryInk = ensureContrast(primary, surface, 4.5);
  const accentInk = ensureContrast(accent, surface, 4.5);

  // Sidebar can sit quiet (tinted), inverted (contrast) or fully brand-filled.
  let sidebarBg = bgIsDark ? mix(bg, "#000000", 0.35) : mix(bg, primary, 0.05);
  let sidebarText = text;
  let sidebarBorder = border;
  let sidebarActiveBg = bgIsDark ? mix(bg, primary, 0.3) : mix(bg, primary, 0.16);
  let sidebarActiveText = bgIsDark ? mix("#FFFFFF", primary, 0.25) : primaryInk;
  if (kit.sidebar === "contrast") {
    sidebarBg = bgIsDark
      ? hslToHex({ h, s: tint * 0.8, l: 0.03 })
      : hslToHex({ h, s: Math.min(0.35, s * 0.5), l: 0.12 });
    sidebarText = mix("#FFFFFF", primary, 0.12);
    sidebarBorder = alpha("#FFFFFF", 0.1);
    sidebarActiveBg = alpha(primary, 0.28);
    sidebarActiveText = "#FFFFFF";
  } else if (kit.sidebar === "brand") {
    sidebarBg = bgIsDark ? mix(primary, "#000000", 0.55) : primary;
    sidebarText = alpha(readableInk(sidebarBg), 0.82);
    sidebarBorder = alpha(readableInk(sidebarBg), 0.14);
    sidebarActiveBg = alpha(readableInk(sidebarBg), 0.16);
    sidebarActiveText = readableInk(sidebarBg);
  }

  const success = ensureContrast("#16A34A", surface, 3);
  const warning = ensureContrast("#D97706", surface, 3);
  const danger = ensureContrast("#DC2626", surface, 3);

  const headingFamily = `"${kit.fontHeading}", ${SYSTEM_FONT_STACK}`;
  const bodyFamily = `"${kit.fontBody}", ${SYSTEM_FONT_STACK}`;

  const gap = kit.density === "compact" ? "0.75rem" : "1.25rem";
  const rowPad = kit.density === "compact" ? "0.5rem" : "0.75rem";

  const vars: Record<string, string> = {
    "--st-bg": bg,
    "--st-surface": surface,
    "--st-surface-2": surface2,
    "--st-raised": raised,
    "--st-border": border,
    "--st-border-strong": borderStrong,
    "--st-text": text,
    "--st-text-muted": textMuted,
    "--st-text-faint": textFaint,
    "--st-primary": primary,
    "--st-primary-hover": primaryHover,
    "--st-primary-on": primaryOn,
    "--st-primary-soft": primarySoft,
    "--st-primary-ink": primaryInk,
    "--st-primary-a15": alpha(primary, 0.15),
    "--st-primary-a30": alpha(primary, 0.3),
    "--st-accent": accent,
    "--st-accent-ink": accentInk,
    "--st-accent-soft": bgIsDark ? mix(bg, accent, 0.2) : mix(bg, accent, 0.14),
    "--st-accent-on": readableInk(accent),
    "--st-ring": alpha(primary, 0.55),
    "--st-success": success,
    "--st-warning": warning,
    "--st-danger": danger,
    "--st-sidebar-bg": sidebarBg,
    "--st-sidebar-text": sidebarText,
    "--st-sidebar-border": sidebarBorder,
    "--st-sidebar-active-bg": sidebarActiveBg,
    "--st-sidebar-active-text": sidebarActiveText,
    "--st-radius": `${kit.radius}px`,
    "--st-radius-sm": `${Math.max(2, Math.round(kit.radius * 0.55))}px`,
    "--st-radius-lg": `${Math.round(kit.radius * 1.5)}px`,
    "--st-font-head": headingFamily,
    "--st-font-body": bodyFamily,
    "--st-gap": gap,
    "--st-row-pad": rowPad,
    "--st-shadow": bgIsDark
      ? `0 1px 0 ${alpha("#FFFFFF", 0.04)} inset, 0 18px 40px -24px ${alpha("#000000", 0.9)}`
      : `0 1px 2px ${alpha(primary, 0.06)}, 0 18px 36px -28px ${alpha(primary, 0.45)}`,
    "--st-grid-line": alpha(text, bgIsDark ? 0.07 : 0.08),
  };

  // Page ambience behind the app frame.
  if (kit.texture === "glow") {
    vars["--st-page-bg"] = [
      `radial-gradient(900px 520px at 12% -10%, ${alpha(primary, bgIsDark ? 0.3 : 0.16)}, transparent 60%)`,
      `radial-gradient(760px 480px at 96% 4%, ${alpha(accent, bgIsDark ? 0.16 : 0.12)}, transparent 62%)`,
      `linear-gradient(180deg, ${bg}, ${bgIsDark ? mix(bg, "#000000", 0.25) : mix(bg, primary, 0.04)})`,
    ].join(", ");
  } else if (kit.texture === "grid") {
    vars["--st-page-bg"] = [
      `linear-gradient(${alpha(text, bgIsDark ? 0.05 : 0.05)} 1px, transparent 1px)`,
      `linear-gradient(90deg, ${alpha(text, bgIsDark ? 0.05 : 0.05)} 1px, transparent 1px)`,
      `radial-gradient(800px 500px at 20% -10%, ${alpha(primary, bgIsDark ? 0.22 : 0.12)}, transparent 60%)`,
      `linear-gradient(180deg, ${bg}, ${bg})`,
    ].join(", ");
    vars["--st-page-bg-size"] = "48px 48px, 48px 48px, auto, auto";
  } else {
    vars["--st-page-bg"] = `linear-gradient(180deg, ${bg}, ${bg})`;
  }

  return {
    vars,
    chart: ramp(primary, 5, bgIsDark ? "dark" : "light"),
    ink: text,
    mode: bgIsDark ? "dark" : "light",
  };
}

/* ------------------------------------------------------------------ *
 * Share-link serialisation
 * ------------------------------------------------------------------ */

export const SHARE_PARAM = "b";

type KitPatch = Partial<BrandKit>;

export function mergeKit(patch: KitPatch | null | undefined): BrandKit {
  return { ...LYZR_KIT, ...(patch ?? {}), v: 1 };
}

/** Only the fields that differ from the Lyzr default travel in the URL. */
function minimize(kit: BrandKit): KitPatch {
  const out: Record<string, unknown> = {};
  (Object.keys(kit) as Array<keyof BrandKit>).forEach((key) => {
    if (key === "v") return;
    if (kit[key] !== LYZR_KIT[key]) out[key] = kit[key];
  });
  return out as KitPatch;
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  const b64 =
    typeof btoa === "function" ? btoa(binary) : Buffer.from(text, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): string {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  if (typeof atob === "function") {
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(padded, "base64").toString("utf8");
}

export function encodeKit(kit: BrandKit): string {
  return toBase64Url(JSON.stringify(minimize(kit)));
}

export function decodeKit(encoded: string | null | undefined): BrandKit | null {
  if (!encoded) return null;
  try {
    const parsed = JSON.parse(fromBase64Url(encoded)) as KitPatch;
    if (!parsed || typeof parsed !== "object") return null;
    return mergeKit(parsed);
  } catch {
    return null;
  }
}

export function shareUrl(kit: BrandKit, origin?: string): string {
  const base =
    origin ??
    (typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}`);
  const encoded = encodeKit(kit);
  return encoded ? `${base}?${SHARE_PARAM}=${encoded}` : base;
}

/* ------------------------------------------------------------------ *
 * Saved demos (rep-local, never shared)
 * ------------------------------------------------------------------ */

const STORE_KEY = "lyzr-studio-demos";

export interface SavedDemo {
  id: string;
  name: string;
  savedAt: number;
  kit: BrandKit;
}

export function loadDemos(): SavedDemo[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? (JSON.parse(raw) as SavedDemo[]) : [];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.savedAt - a.savedAt) : [];
  } catch {
    return [];
  }
}

export function saveDemo(kit: BrandKit): SavedDemo[] {
  if (typeof localStorage === "undefined") return [];
  const demos = loadDemos().filter((demo) => demo.name.toLowerCase() !== kit.company.toLowerCase());
  const next: SavedDemo[] = [
    { id: `${Date.now()}`, name: kit.company || "Untitled demo", savedAt: Date.now(), kit },
    ...demos,
  ].slice(0, 12);
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

export function deleteDemo(id: string): SavedDemo[] {
  if (typeof localStorage === "undefined") return [];
  const next = loadDemos().filter((demo) => demo.id !== id);
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

/* ------------------------------------------------------------------ *
 * Misc helpers
 * ------------------------------------------------------------------ */

export function initials(name: string): string {
  const parts = name
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean);
  if (!parts.length) return "AI";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function prettyHost(url: string): string {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Best-effort company name from a bare domain: "acme-bank.com" -> "Acme Bank". */
export function companyFromHost(host: string): string {
  const stem = prettyHost(host).split(".")[0] ?? host;
  return stem
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export { setLightness };
