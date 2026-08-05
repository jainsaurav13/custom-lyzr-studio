import { distance, hexToHsl, isNeutral, normalizeHex, rgbToHex, vividness } from "./color";

export interface LogoResult {
  dataUrl: string;
  colors: string[];
  width: number;
  height: number;
}

const MAX_EDGE = 320;

/** Pull the dominant brand colours out of pixel data, greys and near-whites dropped. */
export function paletteFromImageData(data: Uint8ClampedArray): string[] {
  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // 4 bits per channel keeps shades together without merging distinct hues.
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
    const entry = buckets.get(key);
    if (entry) {
      entry.count += 1;
      entry.r += r;
      entry.g += g;
      entry.b += b;
    } else {
      buckets.set(key, { count: 1, r, g, b });
    }
  }

  const scored = [...buckets.values()]
    .map((bucket) => {
      const hex = rgbToHex({
        r: bucket.r / bucket.count,
        g: bucket.g / bucket.count,
        b: bucket.b / bucket.count,
      });
      return { hex, score: bucket.count * (0.15 + vividness(hex)) };
    })
    .filter((entry) => !isNeutral(entry.hex))
    .sort((a, b) => b.score - a.score);

  const picked: string[] = [];
  scored.forEach((entry) => {
    if (picked.length >= 6) return;
    if (picked.some((hex) => distance(hex, entry.hex) < 42)) return;
    picked.push(entry.hex);
  });
  return picked;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not read that image"));
    image.src = src;
  });
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.readAsDataURL(file);
  });
}

function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.readAsText(file);
  });
}

/**
 * Turn an uploaded logo into something that can live inside a share URL:
 * downscaled, re-encoded, and mined for the brand's colours.
 * SVGs are kept as-is (they are already tiny and scale perfectly).
 */
export async function fileToLogo(file: File): Promise<LogoResult> {
  if (file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")) {
    const [dataUrl, text] = await Promise.all([readAsDataUrl(file), readAsText(file)]);

    // Rasterise a copy so colours can be ranked by how much of the logo they
    // actually cover; source order in the file says nothing about that.
    const rasterised = await paletteFromUrl(dataUrl);
    if (rasterised.length) return { dataUrl, colors: rasterised, width: 0, height: 0 };

    const hexes = (text.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [])
      .map((hex) => normalizeHex(hex))
      .filter((hex): hex is string => Boolean(hex))
      .filter((hex) => !isNeutral(hex));
    const colors: string[] = [];
    hexes.forEach((hex) => {
      if (colors.length >= 6) return;
      if (colors.some((existing) => distance(existing, hex) < 42)) return;
      colors.push(hex);
    });
    return { dataUrl, colors, width: 0, height: 0 };
  }

  const source = await readAsDataUrl(file);
  const image = await loadImage(source);
  const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is unavailable in this browser");
  ctx.drawImage(image, 0, 0, width, height);

  const { data } = ctx.getImageData(0, 0, width, height);
  const colors = paletteFromImageData(data);

  // WebP first (much smaller in the share URL), PNG when the browser says no.
  let dataUrl = canvas.toDataURL("image/webp", 0.85);
  if (!dataUrl.startsWith("data:image/webp")) dataUrl = canvas.toDataURL("image/png");
  if (dataUrl.length > source.length) dataUrl = source;

  return { dataUrl, colors, width, height };
}

/** Colours from an already-hosted image (used for logos found by the scanner). */
export async function paletteFromUrl(url: string): Promise<string[]> {
  try {
    const image = await loadImage(url);
    // SVGs without intrinsic dimensions report 0 — give them a canvas anyway.
    const naturalW = image.naturalWidth || image.width || 256;
    const naturalH = image.naturalHeight || image.height || 256;
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 160 / Math.max(naturalW, naturalH));
    canvas.width = Math.max(1, Math.round(naturalW * scale));
    canvas.height = Math.max(1, Math.round(naturalH * scale));
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return [];
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return paletteFromImageData(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
  } catch {
    return [];
  }
}

/**
 * Colours arrive ranked by how much of the logo they cover, which is usually
 * the right answer. This only demotes ones that make poor UI primaries — near
 * whites, near blacks and washed-out tints — leaving the order otherwise.
 */
export function rankBrandColors(colors: string[]): string[] {
  const penalty = (hex: string) => {
    const { s, l } = hexToHsl(hex);
    let score = 0;
    if (l < 0.16 || l > 0.86) score += 2;
    if (s < 0.25) score += 1;
    if (vividness(hex) < 0.18) score += 1;
    return score;
  };
  return colors
    .map((hex, index) => ({ hex, index, penalty: penalty(hex) }))
    .sort((a, b) => a.penalty - b.penalty || a.index - b.index)
    .map((entry) => entry.hex);
}
