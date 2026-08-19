import { deriveTheme, LYZR_KIT } from "@/components/studio/brand/kit";
import { alpha, mix } from "@/components/studio/brand/color";
import type { BrandKit } from "@/components/studio/brand/types";

/**
 * The AgentBlocks page wears the same shell as the studio it is selling: the
 * `--st-*` custom properties come straight out of `deriveTheme()`, so the page
 * and the product it links to are painted from one palette.
 *
 * A marketing page needs two things the product does not — an inverted "ink"
 * band for the sections that have to land hard, and a warmer paper tone for
 * the long reading stretches — so those are derived here and shipped as extra
 * `--ab-*` properties rather than forked into a second design system.
 */

/** Lyzr's own look: near-black actions on warm paper, one copper accent. */
export const AGENTBLOCKS_KIT: BrandKit = {
  ...LYZR_KIT,
  product: "AgentBlocks",
  radius: 14,
};

export function agentBlocksVars(): Record<string, string> {
  const theme = deriveTheme(AGENTBLOCKS_KIT);
  const { vars } = theme;
  const bg = vars["--st-bg"];
  const text = vars["--st-text"];
  const accent = vars["--st-accent"];

  // The ink band: a near-black ground warmed by the accent, with its own
  // border/muted pair so components can flip context without special-casing.
  const ink = mix("#0B0C10", accent, 0.07);
  const inkText = mix("#FFFFFF", accent, 0.06);

  return {
    ...vars,
    "--ab-paper": mix(bg, accent, 0.035),
    "--ab-ink": ink,
    "--ab-ink-raised": mix(ink, "#FFFFFF", 0.06),
    "--ab-ink-border": alpha("#FFFFFF", 0.12),
    "--ab-ink-border-strong": alpha("#FFFFFF", 0.24),
    "--ab-ink-text": inkText,
    "--ab-ink-muted": alpha(inkText, 0.62),
    "--ab-ink-faint": alpha(inkText, 0.42),
    "--ab-accent-on-ink": mix(accent, "#FFFFFF", 0.45),
    "--ab-rule": alpha(text, 0.1),
    "--ab-serif": '"Instrument Serif", "Playfair Display", Georgia, serif',
    // Ambience behind the hero — the same radial wash the studio uses on glow.
    "--ab-hero-bg": [
      `radial-gradient(900px 520px at 8% -20%, ${alpha(accent, 0.14)}, transparent 62%)`,
      `radial-gradient(720px 460px at 96% -8%, ${alpha(text, 0.07)}, transparent 60%)`,
    ].join(", "),
  };
}

/** Google Fonts the page needs in the SSR HTML, so nothing reflows on load. */
export const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap";
