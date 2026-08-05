import { createFileRoute } from "@tanstack/react-router";

import {
  distance,
  hexToHsl,
  isNeutral,
  luminance,
  normalizeHex,
  rgbToHex,
  vividness,
} from "@/components/studio/brand/color";

/**
 * Reads a prospect's public website and derives a starting brand kit: logo,
 * palette, typefaces and light/dark leaning. Runs on the server so there is no
 * CORS problem and so the chosen logo can be inlined into the share link.
 */

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const MAX_HTML = 900_000;
const MAX_CSS = 400_000;
const MAX_LOGO_BYTES = 140_000;

interface Weighted {
  hex: string;
  score: number;
}

function toUrl(input: string): URL | null {
  try {
    const trimmed = input.trim();
    return new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
}

async function fetchText(url: string, limit: number, signal: AbortSignal): Promise<string> {
  const response = await fetch(url, {
    headers: { "user-agent": UA, accept: "text/html,text/css,*/*" },
    redirect: "follow",
    signal,
  });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
  const text = await response.text();
  return text.slice(0, limit);
}

function attr(tag: string, name: string): string {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match ? match[1].trim() : "";
}

function metaContent(html: string, key: string): string {
  const re = new RegExp(`<meta[^>]+(?:name|property)\\s*=\\s*["']${key}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0];
  return tag ? attr(tag, "content") : "";
}

function absolute(href: string, base: URL): string {
  try {
    return new URL(href, base).toString();
  } catch {
    return "";
  }
}

/** Every colour literal in a blob of CSS/HTML, with hits near brand tokens weighted up. */
function mineColors(css: string): Map<string, number> {
  const counts = new Map<string, number>();
  const bump = (raw: string | null, weight: number) => {
    const hex = normalizeHex(raw ?? "");
    if (!hex || isNeutral(hex)) return;
    counts.set(hex, (counts.get(hex) ?? 0) + weight);
  };

  (css.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) ?? []).forEach((hex) => bump(hex, 1));

  const rgbRe = /rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/g;
  let match: RegExpExecArray | null;
  while ((match = rgbRe.exec(css))) {
    bump(rgbToHex({ r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) }), 1);
  }

  // Colours declared as brand-ish custom properties are the real answer far more
  // often than the most frequent colour on the page.
  const varRe =
    /--[a-z0-9-]*(brand|primary|accent|main|theme|action|cta)[a-z0-9-]*\s*:\s*([^;}]+)/gi;
  while ((match = varRe.exec(css))) {
    const value = match[2].trim();
    const hex = value.match(/#[0-9a-fA-F]{3,8}/)?.[0] ?? null;
    if (hex) bump(hex, 26);
    const rgb = value.match(/rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/);
    if (rgb) bump(rgbToHex({ r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) }), 26);
  }

  // Buttons and links carry the action colour.
  const actionRe =
    /(?:\.btn|\.button|button|\[class\*="button"\]|\.cta)[^{}]{0,120}\{[^}]{0,400}\}/gi;
  while ((match = actionRe.exec(css))) {
    (match[0].match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) ?? []).forEach((hex) => bump(hex, 8));
  }

  return counts;
}

function rankColors(counts: Map<string, number>): Weighted[] {
  const scored = [...counts.entries()]
    .map(([hex, count]) => ({ hex, score: count * (0.3 + vividness(hex)) }))
    .sort((a, b) => b.score - a.score);

  const picked: Weighted[] = [];
  scored.forEach((entry) => {
    if (picked.length >= 8) return;
    if (picked.some((existing) => distance(existing.hex, entry.hex) < 34)) return;
    picked.push(entry);
  });
  return picked;
}

function mineFonts(css: string): string[] {
  const families = new Map<string, number>();
  const re = /font-family\s*:\s*([^;}]+)/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(css))) {
    const first = match[1].split(",")[0].replace(/['"]/g, "").trim();
    if (!first || first.length > 32) continue;
    if (
      /^(inherit|initial|unset|var\(|sans-serif|serif|monospace|system-ui|-apple-system|ui-)/i.test(
        first,
      )
    )
      continue;
    families.set(first, (families.get(first) ?? 0) + 1);
  }
  return [...families.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([family]) => family)
    .slice(0, 6);
}

function mineGoogleFonts(html: string): string[] {
  const out: string[] = [];
  const re = /fonts\.googleapis\.com\/css2?\?([^"']+)/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const params = match[1].replace(/&amp;/g, "&");
    (params.match(/family=([^&:]+)/g) ?? []).forEach((entry) => {
      const family = decodeURIComponent(entry.replace("family=", "")).replace(/\+/g, " ").trim();
      if (family && !out.includes(family)) out.push(family);
    });
  }
  return out;
}

function findLogos(html: string, base: URL): string[] {
  const out: string[] = [];
  const push = (href: string) => {
    const url = absolute(href, base);
    if (url && !out.includes(url)) out.push(url);
  };

  // Anything that calls itself a logo, in DOM order (headers come first).
  const imgRe = /<img[^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = imgRe.exec(html))) {
    const tag = match[0];
    const haystack =
      `${attr(tag, "class")} ${attr(tag, "id")} ${attr(tag, "alt")} ${attr(tag, "src")}`.toLowerCase();
    if (!haystack.includes("logo") && !haystack.includes("brand")) continue;
    const src = attr(tag, "src") || attr(tag, "data-src") || attr(tag, "srcset").split(" ")[0];
    if (src && !src.startsWith("data:")) push(src);
  }

  const linkRe = /<link[^>]*>/gi;
  const icons: Array<{ href: string; size: number }> = [];
  while ((match = linkRe.exec(html))) {
    const tag = match[0];
    const rel = attr(tag, "rel").toLowerCase();
    if (!/(apple-touch-icon|icon|mask-icon)/.test(rel)) continue;
    const href = attr(tag, "href");
    if (!href || href.startsWith("data:")) continue;
    const size = Number(attr(tag, "sizes").split("x")[0]) || (rel.includes("apple") ? 180 : 32);
    icons.push({ href, size });
  }
  icons.sort((a, b) => b.size - a.size).forEach((icon) => push(icon.href));

  const og = metaContent(html, "og:logo") || metaContent(html, "og:image");
  if (og) push(og);

  push(`/favicon.ico`);
  return out.slice(0, 8);
}

async function inlineLogo(url: string, signal: AbortSignal): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: { "user-agent": UA },
      redirect: "follow",
      signal,
    });
    if (!response.ok) return "";
    const type = response.headers.get("content-type") ?? "image/png";
    if (!type.startsWith("image/")) return "";
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_LOGO_BYTES) return "";
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
    const base64 = btoa(binary);
    return `data:${type.split(";")[0]};base64,${base64}`;
  } catch {
    return "";
  }
}

function titleToCompany(html: string, host: string): string {
  const siteName = metaContent(html, "og:site_name");
  if (siteName) return siteName.trim().slice(0, 40);
  const title = html.match(/<title[^>]*>([^<]{2,120})<\/title>/i)?.[1] ?? "";
  const cleaned = title.split(/[|–—·—-]/)[0].trim();
  if (cleaned && cleaned.length <= 40) return cleaned;
  const stem = host.replace(/^www\./, "").split(".")[0];
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}

async function scan(target: URL) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  const notes: string[] = [];

  try {
    const html = await fetchText(target.toString(), MAX_HTML, controller.signal);

    const sheetRe = /<link[^>]+rel\s*=\s*["']stylesheet["'][^>]*>/gi;
    const sheets: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = sheetRe.exec(html)) && sheets.length < 4) {
      const href = attr(match[0], "href");
      if (!href) continue;
      const url = absolute(href, target);
      if (url) sheets.push(url);
    }

    const cssParts = await Promise.all(
      sheets.map(async (url) => {
        try {
          return await fetchText(url, MAX_CSS, controller.signal);
        } catch {
          return "";
        }
      }),
    );
    if (cssParts.every((part) => !part) && sheets.length) {
      notes.push("Stylesheets could not be read; colours came from the page itself.");
    }

    const inlineStyles = (html.match(/<style[\s\S]*?<\/style>/gi) ?? []).join("\n");
    const corpus = [inlineStyles, ...cssParts, html].join("\n");

    const counts = mineColors(corpus);
    const themeColor = normalizeHex(metaContent(html, "theme-color"));
    if (themeColor && !isNeutral(themeColor)) {
      counts.set(themeColor, (counts.get(themeColor) ?? 0) + 40);
    }
    const ranked = rankColors(counts);

    const primary = ranked[0]?.hex ?? "#6D5AE6";
    const primaryHue = hexToHsl(primary).h;
    const accent =
      ranked.slice(1).find((entry) => {
        const diff = Math.abs(hexToHsl(entry.hex).h - primaryHue);
        return Math.min(diff, 360 - diff) > 25;
      })?.hex ??
      ranked[1]?.hex ??
      "";

    // Page background: whatever body/html asks for, else assume a light site.
    const bodyBg =
      corpus.match(
        /(?:^|[\s,{])(?:body|html)[^{}]{0,60}\{[^}]*background(?:-color)?\s*:\s*([^;!}]+)/i,
      )?.[1] ?? "";
    const bgHex = normalizeHex(bodyBg.match(/#[0-9a-fA-F]{3,8}/)?.[0] ?? "");
    const mode: "dark" | "light" = bgHex && luminance(bgHex) < 0.2 ? "dark" : "light";

    const cssFonts = mineFonts(corpus);
    const googleFonts = mineGoogleFonts(html);
    const fonts = [...new Set([...googleFonts, ...cssFonts])];

    const logoCandidates = findLogos(html, target);
    let logoUrl = "";
    for (const candidate of logoCandidates) {
      if (/\.(svg|png|webp|jpg|jpeg)(\?|$)/i.test(candidate) || candidate.includes("logo")) {
        const inlined = await inlineLogo(candidate, controller.signal);
        if (inlined) {
          logoUrl = inlined;
          break;
        }
      }
    }
    if (!logoUrl && logoCandidates.length) {
      logoUrl = logoCandidates[0];
      notes.push("Logo is linked from the site rather than embedded.");
    }
    if (!logoCandidates.length) notes.push("No logo found — upload one for the best result.");

    return {
      url: target.toString(),
      company: titleToCompany(html, target.hostname),
      logoUrl,
      logoCandidates,
      colors: ranked.map((entry) => entry.hex),
      primary,
      accent,
      background: "",
      mode,
      fontHeading: fonts[0] ?? "",
      fontBody: fonts[1] ?? fonts[0] ?? "",
      notes,
    };
  } finally {
    clearTimeout(timer);
  }
}

export const Route = createFileRoute("/api/brand-scan")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const target = toUrl(new URL(request.url).searchParams.get("url") ?? "");
        if (!target || !/^https?:$/.test(target.protocol)) {
          return Response.json({ error: "Enter a valid website address." }, { status: 400 });
        }
        try {
          return Response.json(await scan(target));
        } catch (error) {
          const message =
            error instanceof Error && error.name === "AbortError"
              ? "That site took too long to respond."
              : `Could not read ${target.hostname}. It may block automated requests — upload a logo instead.`;
          return Response.json({ error: message }, { status: 502 });
        }
      },
    },
  },
});
