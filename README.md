# Lyzr Brand Studio

A mock of the Lyzr agent studio that can be re-skinned for a prospect in about
thirty seconds and handed over as a link. The prospect sees the platform wearing
*their* logo, colours and typeface, filled with *their* company name, instead of
imagining it.

The app is a single page: the studio itself, at `/`.

## Quick start

```bash
npm install
npm run dev          # http://127.0.0.1:5173
```

Other scripts: `npm run build`, `npm run preview`, `npm run typecheck`,
`npm run lint`, `npm run format`.

## Using it on a call

1. Open the app and hit **Brand Studio** — top bar, sidebar, or the footer link.
2. Brand it, either way round:
   - **Upload logo** — drop in a PNG or SVG. The logo's own colours are read out
     of the pixels and become the primary and accent colours immediately.
   - **Use their website** — type `acme.com`. The server fetches the page and
     pulls out the logo, palette, typefaces and whether the site runs light or
     dark, then applies the lot.
3. Adjust anything on **Theme** (colours, background, sidebar treatment) and
   **Type** (typefaces, corner radius, density).
4. **Share → Copy share link**, and send it. The recipient needs no account.

Nothing is stored server-side: the entire brand kit is encoded into the URL, so
the link *is* the demo. *Saved demos* on the Share tab keeps recent kits in the
rep's own browser (localStorage) for juggling several accounts.

Every screen carries a small strip saying the workspace is illustrative and the
data is sample data. Leave it in place.

## Deploying

`npm run build` produces `dist/client` (static assets) and `dist/server` (the
SSR + API handler). `server.js` in the repo root wires those together into an
ordinary Node server:

```bash
npm run build
npm start                # http://localhost:3000 — honours PORT and HOST
```

That runs anywhere Node does: Render, Railway, Fly, a container, a VM. Set the
start command to `npm start` and the build command to `npm install && npm run
build`. Platforms that build the app themselves (Vercel, Netlify) can import the
repo directly and ignore `server.js`.

`npm run preview` serves the same production build locally without `server.js`.

The one server-side piece is `/api/brand-scan`, which reads a prospect's website.
It needs outbound HTTPS. Everything else is static.

Share links are `https://<your-domain>/?b=<encoded-kit>`. A link generated on
`localhost` only opens on your own machine — deploy before sending one out.

## How it works

```
src/
  routes/
    __root.tsx          document shell, meta, error and 404 screens
    index.tsx           the studio, reads ?b= into a brand kit
    api/brand-scan.ts   server-side website reader (no CORS to fight)
  components/studio/
    brand/
      types.ts          BrandKit shape — this is what travels in the URL
      color.ts          hex/HSL maths, contrast, ramps; no dependencies
      kit.ts            defaults, presets, theme derivation, URL encode/decode
      image.ts          logo downscaling + palette extraction from pixels
      BrandProvider.tsx context, CSS-variable injection, web fonts, URL sync
    BrandSettingsPanel.tsx   the Brand Studio drawer
    BrandMark.tsx            logo rendering, wordmark and dark-sidebar handling
    StudioShell.tsx          sidebar, top bar, view switching
    views/                   Home, Agents, Agent Builder, Store, Knowledge,
                             Tools, Workflows, Analytics, Settings
    charts.tsx, ui.tsx       themed primitives — nothing hard-codes a colour
    data.ts                  sample content, generated from the prospect's name
```

**Theming.** One brand colour drives everything. `deriveTheme()` in
`brand/kit.ts` turns a kit into ~40 CSS custom properties (`--st-*`) set on the
studio's root element: surfaces are the brand hue mixed toward black or white,
borders and muted text are steps off those surfaces, and any colour used for text
is pushed until it clears 4.5:1 against what sits behind it. Components only ever
reference the variables, so a new kit repaints every screen with no per-component
work. Charts stay single-series for the same reason — identity never depends on
telling two customer-derived hues apart.

**Website scanning.** `/api/brand-scan` fetches the page and up to four of its
stylesheets, then mines: the logo (`<img class="logo">`, apple-touch-icon,
`og:image`), the palette (hex and rgb literals, with `--brand-*` / `--primary-*`
custom properties and `theme-color` weighted far above raw frequency), typefaces
(Google Fonts links plus `font-family` counts), and the body background to decide
light or dark. The chosen logo is inlined as a data URL so the share link keeps
working even if the customer's CDN blocks hotlinking.

## Known limits

- A site that blocks bots, or renders entirely client-side, yields a thin scan.
  The panel says so and points at the logo-upload path instead.
- Uploaded logos are downscaled to 320px and re-encoded to WebP before going into
  the URL; SVGs are kept as-is. A very large PNG makes a long link, and the Share
  tab warns past 6,000 characters.
- Typefaces load from Google Fonts. A brand font that isn't there falls back to
  the system stack.
- The studio content is a reconstruction of Lyzr Studio's structure (agents,
  agent store, knowledge base, tools, workflows, guardrails, credits), not a
  copy of the live product. Adjust `data.ts` and the nav in `StudioShell.tsx` as
  the real product moves.
