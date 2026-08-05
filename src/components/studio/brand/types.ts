export type ThemeMode = "dark" | "light";
export type SidebarStyle = "tinted" | "contrast" | "brand";
export type Density = "comfortable" | "compact";
export type Texture = "none" | "glow" | "grid";

export type { BriefProfile } from "./brief";

/**
 * Everything that makes the studio look like the prospect's own product.
 * Kept deliberately small and flat — the whole kit is serialised into the
 * share URL, so every field costs characters.
 */
export interface BrandKit {
  v: 1;
  company: string;
  product: string;
  logoUrl: string;
  primary: string;
  accent: string;
  background: string;
  mode: ThemeMode;
  sidebar: SidebarStyle;
  radius: number;
  density: Density;
  fontHeading: string;
  fontBody: string;
  texture: Texture;
  sourceUrl: string;
  /** Derived from an uploaded account brief; drives the sample content. */
  brief?: import("./brief").BriefProfile;
}

export interface ScanResult {
  url: string;
  company: string;
  logoUrl: string;
  logoCandidates: string[];
  colors: string[];
  primary: string;
  accent: string;
  background: string;
  mode: ThemeMode;
  fontHeading: string;
  fontBody: string;
  notes: string[];
}
