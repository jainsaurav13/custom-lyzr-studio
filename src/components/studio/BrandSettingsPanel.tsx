import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  Loader2,
  RotateCcw,
  FileText,
  Save,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useBrand } from "./brand/BrandProvider";
import {
  analyseBrief,
  briefAgentPlan,
  briefSystems,
  industryLabel,
  INDUSTRIES,
} from "./brand/brief";
import { readBriefFile } from "./brand/brief-file";
import { fileToLogo, rankBrandColors } from "./brand/image";
import {
  deleteDemo,
  FONT_OPTIONS,
  loadDemos,
  LYZR_KIT,
  PRESETS,
  saveDemo,
  companyFromHost,
  type SavedDemo,
} from "./brand/kit";
import type { BrandKit, ScanResult } from "./brand/types";
import { Badge, Button, Field, inputClass, SegmentedControl, Tabs, Toggle } from "./ui";

type PanelTab = "brand" | "content" | "theme" | "type" | "share";

export function BrandSettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { kit, update, reset, link, setKit } = useBrand();
  const [tab, setTab] = useState<PanelTab>("brand");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col border-l border-[var(--st-border)] bg-[var(--st-surface)] text-[var(--st-text)] shadow-2xl"
            style={{ fontFamily: "var(--st-font-body)" }}
            role="dialog"
            aria-label="Brand Studio"
          >
            <header className="flex items-start justify-between gap-3 border-b border-[var(--st-border)] px-5 py-4">
              <div>
                <h2
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ fontFamily: "var(--st-font-head)" }}
                >
                  <Sparkles className="h-4 w-4 text-[var(--st-primary-ink)]" /> Brand Studio
                </h2>
                <p className="mt-1 text-xs text-[var(--st-text-muted)]">
                  Re-skin this studio for a prospect, then share the link.
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </header>

            <div className="px-3 pt-1">
              <Tabs
                value={tab}
                onChange={setTab}
                options={[
                  { value: "brand", label: "Brand" },
                  { value: "content", label: "Content" },
                  { value: "theme", label: "Theme" },
                  { value: "type", label: "Type" },
                  { value: "share", label: "Share" },
                ]}
              />
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              {tab === "brand" ? <BrandTab kit={kit} update={update} /> : null}
              {tab === "content" ? <ContentTab kit={kit} update={update} /> : null}
              {tab === "theme" ? <ThemeTab kit={kit} update={update} /> : null}
              {tab === "type" ? <TypeTab kit={kit} update={update} /> : null}
              {tab === "share" ? <ShareTab kit={kit} link={link} setKit={setKit} /> : null}
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-[var(--st-border)] px-5 py-3">
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" /> Reset to Lyzr
              </Button>
              <CopyLinkButton link={link} />
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */

function CopyLinkButton({ link, className }: { link: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="primary"
      size="sm"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(link);
        } catch {
          window.prompt("Copy this link", link);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Link copied" : "Copy share link"}
    </Button>
  );
}

function Swatch({
  color,
  active,
  onClick,
  title,
}: {
  color: string;
  active?: boolean;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? color}
      className={cn(
        "h-8 w-8 rounded-full border-2 transition-transform hover:scale-105",
        active ? "border-[var(--st-text)]" : "border-[var(--st-border)]",
      )}
      style={{ background: color }}
    />
  );
}

function ColorRow({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-12 cursor-pointer rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-transparent p-1"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#000000"
          className={cn(inputClass, "font-mono text-xs uppercase")}
        />
      </div>
    </Field>
  );
}

/* ------------------------------------------------------------------ *
 * Tab 1 — logo upload + website scan
 * ------------------------------------------------------------------ */

function BrandTab({ kit, update }: { kit: BrandKit; update: (patch: Partial<BrandKit>) => void }) {
  const [mode, setMode] = useState<"upload" | "website">("upload");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [logoColors, setLogoColors] = useState<string[]>([]);
  const [website, setWebsite] = useState(kit.sourceUrl);
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const logo = await fileToLogo(file);
      const ranked = rankBrandColors(logo.colors);
      setLogoColors(ranked);
      const patch: Partial<BrandKit> = { logoUrl: logo.dataUrl };
      // A logo alone is enough — take its two strongest colours as the theme.
      if (ranked[0]) patch.primary = ranked[0];
      if (ranked[1]) patch.accent = ranked[1];
      if (kit.company === LYZR_KIT.company) {
        // "northwind-bank_logo.svg" -> "Northwind Bank"
        patch.company = file.name
          .replace(/\.[a-z0-9]+$/i, "")
          .replace(/[-_]+/g, " ")
          .replace(/\b(logo|logotype|mark|wordmark|brand)\b/gi, "")
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")
          .slice(0, 28);
      }
      update(patch);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "That file could not be read.");
    } finally {
      setBusy(false);
    }
  };

  const runScan = async () => {
    if (!website.trim()) return;
    setError("");
    setBusy(true);
    setScan(null);
    try {
      const response = await fetch(`/api/brand-scan?url=${encodeURIComponent(website.trim())}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error ?? "That site could not be read.");
      const result = payload as ScanResult;
      setScan(result);
      applyScan(result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "That site could not be read.");
      // Still give the rep something usable rather than a dead end.
      update({ company: companyFromHost(website), sourceUrl: website.trim() });
    } finally {
      setBusy(false);
    }
  };

  const applyScan = (result: ScanResult) => {
    update({
      company: result.company || companyFromHost(result.url),
      logoUrl: result.logoUrl || kit.logoUrl,
      primary: result.primary || kit.primary,
      accent: result.accent || kit.accent,
      mode: result.mode ?? kit.mode,
      fontHeading: result.fontHeading || kit.fontHeading,
      fontBody: result.fontBody || result.fontHeading || kit.fontBody,
      sourceUrl: result.url,
      background: "",
    });
  };

  return (
    <div className="space-y-5">
      <SegmentedControl
        className="w-full"
        value={mode}
        onChange={setMode}
        options={[
          {
            value: "upload",
            label: (
              <span className="flex items-center justify-center gap-1.5">
                <Upload className="h-3.5 w-3.5" /> Upload logo
              </span>
            ),
          },
          {
            value: "website",
            label: (
              <span className="flex items-center justify-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> Use their website
              </span>
            ),
          },
        ]}
      />

      {mode === "upload" ? (
        <div className="space-y-4">
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              handleFile(event.dataTransfer.files?.[0]);
            }}
            onClick={() => fileInput.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--st-radius)] border-2 border-dashed px-5 py-8 text-center transition-colors",
              dragging
                ? "border-[var(--st-primary)] bg-[var(--st-primary-soft)]"
                : "border-[var(--st-border-strong)] hover:border-[var(--st-primary)]",
            )}
          >
            {kit.logoUrl ? (
              <img
                src={kit.logoUrl}
                alt="Uploaded logo"
                className="max-h-16 max-w-[180px] object-contain"
              />
            ) : (
              <ImageIcon className="h-6 w-6 text-[var(--st-text-faint)]" />
            )}
            <p className="text-sm font-medium">
              {kit.logoUrl ? "Replace logo" : "Drop a logo here"}
            </p>
            <p className="text-xs text-[var(--st-text-muted)]">
              SVG, PNG or JPG · colours are read automatically
            </p>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0] ?? undefined)}
          />

          {logoColors.length ? (
            <div>
              <p className="mb-2 text-xs font-medium">Colours found in the logo</p>
              <div className="flex flex-wrap gap-2">
                {logoColors.map((color) => (
                  <Swatch
                    key={color}
                    color={color}
                    active={color.toLowerCase() === kit.primary.toLowerCase()}
                    onClick={() => update({ primary: color })}
                    title={`Use ${color} as the primary colour`}
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[var(--st-text-faint)]">
                Click a swatch to make it the primary colour.
              </p>
            </div>
          ) : null}

          {kit.logoUrl ? (
            <Button variant="ghost" size="sm" onClick={() => update({ logoUrl: "" })}>
              <Trash2 className="h-3.5 w-3.5" /> Remove logo
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          <Field label="Prospect's website" hint="we read it live">
            <div className="flex gap-2">
              <input
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") runScan();
                }}
                placeholder="acme.com"
                className={inputClass}
              />
              <Button variant="primary" onClick={runScan} disabled={busy}>
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Scan
              </Button>
            </div>
          </Field>

          {scan ? (
            <div className="space-y-4 rounded-[var(--st-radius)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-4">
              <div className="flex items-center gap-3">
                {scan.logoUrl ? (
                  <img src={scan.logoUrl} alt="" className="h-9 max-w-[120px] object-contain" />
                ) : null}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{scan.company}</p>
                  <p className="truncate text-[11px] text-[var(--st-text-faint)]">{scan.url}</p>
                </div>
              </div>

              {scan.colors?.length ? (
                <div>
                  <p className="mb-2 text-xs font-medium">Palette detected</p>
                  <div className="flex flex-wrap gap-2">
                    {scan.colors.map((color) => (
                      <Swatch
                        key={color}
                        color={color}
                        active={color.toLowerCase() === kit.primary.toLowerCase()}
                        onClick={() => update({ primary: color })}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {scan.logoCandidates?.length > 1 ? (
                <div>
                  <p className="mb-2 text-xs font-medium">Other logos on the page</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {scan.logoCandidates.slice(0, 6).map((candidate) => (
                      <button
                        key={candidate}
                        type="button"
                        onClick={() => update({ logoUrl: candidate })}
                        className="rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface)] p-1.5"
                      >
                        <img src={candidate} alt="" className="h-6 max-w-[72px] object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {scan.fontHeading ? (
                <p className="text-[11px] text-[var(--st-text-muted)]">
                  Typeface detected:{" "}
                  <span className="font-medium text-[var(--st-text)]">{scan.fontHeading}</span>
                  {scan.fontBody && scan.fontBody !== scan.fontHeading ? ` + ${scan.fontBody}` : ""}
                </p>
              ) : null}

              {scan.notes?.map((note) => (
                <p key={note} className="text-[11px] text-[var(--st-text-faint)]">
                  {note}
                </p>
              ))}

              <Button variant="outline" size="sm" onClick={() => applyScan(scan)}>
                <Check className="h-3.5 w-3.5" /> Re-apply everything
              </Button>
            </div>
          ) : null}

          <p className="text-[11px] text-[var(--st-text-faint)]">
            Some sites block automated reads. If the scan comes back thin, upload the logo instead —
            colours are pulled straight out of the image.
          </p>
        </div>
      )}

      {error ? (
        <p className="rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-3 text-xs text-[var(--st-warning)]">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 border-t border-[var(--st-border)] pt-5 sm:grid-cols-2">
        <Field label="Company name">
          <input
            value={kit.company}
            onChange={(event) => update({ company: event.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Product label" hint="next to the logo">
          <input
            value={kit.product}
            onChange={(event) => update({ product: event.target.value })}
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Tab 2 — colour, surface, chrome
 * ------------------------------------------------------------------ */

function ThemeTab({ kit, update }: { kit: BrandKit; update: (patch: Partial<BrandKit>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-medium">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => update(preset.kit)}
              className="flex items-center gap-2 rounded-full border border-[var(--st-border)] px-3 py-1.5 text-xs transition-colors hover:border-[var(--st-primary)]"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: preset.kit.primary as string }}
              />
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <ColorRow
        label="Primary"
        value={kit.primary}
        onChange={(next) => update({ primary: next })}
      />
      <ColorRow label="Accent" value={kit.accent} onChange={(next) => update({ accent: next })} />

      <Field label="Background" hint={kit.background ? "custom" : "derived from primary"}>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(kit.background) ? kit.background : "#0b0d12"}
            onChange={(event) => update({ background: event.target.value })}
            className="h-9 w-12 cursor-pointer rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-transparent p-1"
          />
          <input
            value={kit.background}
            placeholder="auto"
            onChange={(event) => update({ background: event.target.value })}
            className={cn(inputClass, "font-mono text-xs uppercase")}
          />
          {kit.background ? (
            <Button variant="ghost" size="sm" onClick={() => update({ background: "" })}>
              Auto
            </Button>
          ) : null}
        </div>
      </Field>

      <Field label="Appearance">
        <SegmentedControl
          className="w-full"
          value={kit.mode}
          onChange={(next) => update({ mode: next, background: "" })}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ]}
        />
      </Field>

      <Field label="Sidebar">
        <SegmentedControl
          className="w-full"
          value={kit.sidebar}
          onChange={(next) => update({ sidebar: next })}
          options={[
            { value: "tinted", label: "Tinted" },
            { value: "contrast", label: "Contrast" },
            { value: "brand", label: "Brand fill" },
          ]}
        />
      </Field>

      <Field label="Background treatment">
        <SegmentedControl
          className="w-full"
          value={kit.texture}
          onChange={(next) => update({ texture: next })}
          options={[
            { value: "none", label: "Flat" },
            { value: "glow", label: "Glow" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </Field>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Tab 3 — typography and shape
 * ------------------------------------------------------------------ */

function TypeTab({ kit, update }: { kit: BrandKit; update: (patch: Partial<BrandKit>) => void }) {
  const options = [...new Set([kit.fontHeading, kit.fontBody, ...FONT_OPTIONS])].filter(Boolean);
  return (
    <div className="space-y-5">
      <Field label="Heading typeface">
        <select
          value={kit.fontHeading}
          onChange={(event) => update({ fontHeading: event.target.value })}
          className={inputClass}
        >
          {options.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Body typeface">
        <select
          value={kit.fontBody}
          onChange={(event) => update({ fontBody: event.target.value })}
          className={inputClass}
        >
          {options.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </Field>

      <div className="rounded-[var(--st-radius)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-4">
        <p className="text-lg" style={{ fontFamily: "var(--st-font-head)" }}>
          {kit.company} Studio
        </p>
        <p
          className="mt-1 text-xs text-[var(--st-text-muted)]"
          style={{ fontFamily: "var(--st-font-body)" }}
        >
          Build, test and govern AI agents on your own data.
        </p>
      </div>

      <Field label="Corner radius" hint={`${kit.radius}px`}>
        <input
          type="range"
          min={0}
          max={24}
          step={1}
          value={kit.radius}
          onChange={(event) => update({ radius: Number(event.target.value) })}
          className="mt-2 w-full accent-[var(--st-primary)]"
        />
      </Field>

      <Toggle
        checked={kit.density === "compact"}
        onChange={(next) => update({ density: next ? "compact" : "comfortable" })}
        label="Compact density"
        description="Tighter rows and spacing, closer to an enterprise console"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Tab 4 — the shareable link
 * ------------------------------------------------------------------ */

function ShareTab({
  kit,
  link,
  setKit,
}: {
  kit: BrandKit;
  link: string;
  setKit: (next: BrandKit) => void;
}) {
  const [demos, setDemos] = useState<SavedDemo[]>([]);
  useEffect(() => setDemos(loadDemos()), []);

  const long = link.length > 6000;

  return (
    <div className="space-y-5">
      <div className="rounded-[var(--st-radius)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-4">
        <p className="text-xs font-medium">Share link for {kit.company}</p>
        <p className="mt-1 text-[11px] text-[var(--st-text-muted)]">
          Everything — logo, colours, type — travels inside the URL. No login, nothing to deploy.
        </p>
        <textarea
          readOnly
          value={link}
          rows={3}
          onFocus={(event) => event.currentTarget.select()}
          className={cn(
            inputClass,
            "mt-3 resize-none break-all font-mono text-[10px] leading-relaxed",
          )}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <CopyLinkButton link={link} />
          <Button variant="outline" size="sm" onClick={() => window.open(link, "_blank")}>
            <ExternalLink className="h-3.5 w-3.5" /> Preview
          </Button>
          <Badge tone={long ? "warning" : "neutral"}>{link.length.toLocaleString()} chars</Badge>
        </div>
        {long ? (
          <p className="mt-2 text-[11px] text-[var(--st-warning)]">
            That is a long link — some chat apps truncate it. Upload a smaller logo (or an SVG) to
            shorten it.
          </p>
        ) : null}
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium">Saved demos</p>
          <Button variant="secondary" size="sm" onClick={() => setDemos(saveDemo(kit))}>
            <Save className="h-3.5 w-3.5" /> Save this one
          </Button>
        </div>
        <p className="mt-1 text-[11px] text-[var(--st-text-muted)]">
          Kept in this browser only — handy when you are running several accounts at once.
        </p>
        <ul className="mt-3 space-y-2">
          {demos.length === 0 ? (
            <li className="rounded-[var(--st-radius-sm)] border border-dashed border-[var(--st-border-strong)] px-4 py-5 text-center text-xs text-[var(--st-text-muted)]">
              Nothing saved yet.
            </li>
          ) : null}
          {demos.map((demo) => (
            <li
              key={demo.id}
              className="flex items-center justify-between gap-3 rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] px-3 py-2"
            >
              <button
                type="button"
                onClick={() => setKit(demo.kit)}
                className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
              >
                <span
                  className="h-6 w-6 shrink-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${demo.kit.primary}, ${demo.kit.accent})`,
                  }}
                />
                <span className="min-w-0">
                  <span className="block truncate text-xs font-medium">{demo.name}</span>
                  <span className="block text-[10px] text-[var(--st-text-faint)]">
                    {new Date(demo.savedAt).toLocaleDateString()}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setDemos(deleteDemo(demo.id))}
                className="text-[var(--st-text-faint)] hover:text-[var(--st-danger)]"
                aria-label={`Delete ${demo.name}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Tab 2 — the account brief that drives the sample content
 * ------------------------------------------------------------------ */

function ContentTab({
  kit,
  update,
}: {
  kit: BrandKit;
  update: (patch: Partial<BrandKit>) => void;
}) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [reading, setReading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const brief = kit.brief;
  const plan = briefAgentPlan(brief, kit.company);

  const analyse = (raw: string) => {
    const clean = raw.trim();
    if (clean.length < 80) {
      setError("That is a bit short to read anything from — paste a few paragraphs.");
      return;
    }
    setError("");
    update({ brief: analyseBrief(clean) });
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setReading(true);
    try {
      const raw = await readBriefFile(file);
      setText(raw);
      analyse(raw);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "That file could not be read.");
    } finally {
      setReading(false);
    }
  };

  const drop = (id: string) => {
    if (!brief) return;
    update({ brief: { ...brief, useCases: brief.useCases.filter((entry) => entry !== id) } });
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-[var(--st-text-muted)]">
        Paste the account brief you already wrote. The studio reads the industry, the workloads and
        the systems, then fills the agents, knowledge base and connectors to match — so the demo is
        about their business, not ours.
      </p>

      <div
        onClick={() => (reading ? undefined : fileInput.current?.click())}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 rounded-[var(--st-radius-sm)] border border-dashed border-[var(--st-border-strong)] px-4 py-3 text-xs text-[var(--st-text-muted)] transition-colors hover:border-[var(--st-primary)]",
          reading && "pointer-events-none opacity-60",
        )}
      >
        {reading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Reading the brief…
          </>
        ) : (
          <>
            <FileText className="h-3.5 w-3.5" /> Drop a brief here — PDF, Word, txt or md
          </>
        )}
      </div>
      <input
        ref={fileInput}
        type="file"
        accept=".pdf,.docx,.txt,.md,.markdown,.csv,.json,application/pdf,text/plain"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0] ?? undefined)}
      />

      <Field label="Or paste the brief" hint={text ? `${text.length} chars` : "a few paragraphs"}>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={7}
          placeholder="Acme Telecom serves 12 million subscribers across three markets. Support handles 40k tickets a month in Zendesk, churn in prepaid is the board priority this year…"
          className={cn(inputClass, "resize-y text-xs leading-relaxed")}
        />
      </Field>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={() => analyse(text)}>
          <Sparkles className="h-3.5 w-3.5" /> Read the brief
        </Button>
        {brief ? (
          <Button variant="ghost" size="sm" onClick={() => update({ brief: undefined })}>
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </Button>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-3 text-xs text-[var(--st-warning)]">
          {error}
        </p>
      ) : null}

      {brief ? (
        <div className="space-y-4 rounded-[var(--st-radius)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-4">
          <div>
            <p className="text-xs font-medium">What the studio took from it</p>
            <p className="mt-1 text-[11px] italic text-[var(--st-text-muted)]">
              &ldquo;{brief.note}&rdquo;
            </p>
          </div>

          <Field label="Industry">
            <select
              value={brief.industry}
              onChange={(event) => update({ brief: { ...brief, industry: event.target.value } })}
              className={inputClass}
            >
              <option value="">Not specific</option>
              {Object.entries(INDUSTRIES).map(([key, entry]) => (
                <option key={key} value={key}>
                  {entry.label}
                </option>
              ))}
            </select>
          </Field>

          <div>
            <p className="mb-2 text-xs font-medium">
              Agents we can build for {kit.company} · {plan.length}
            </p>
            <ul className="space-y-1.5">
              {plan.map((proposal) => (
                <li
                  key={proposal.id}
                  className="flex items-start gap-2 rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface)] px-2.5 py-2"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium text-[var(--st-text)]">
                      {proposal.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-[var(--st-text-muted)]">
                      {proposal.role}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => drop(proposal.id)}
                    title="Remove this agent"
                    aria-label={`Remove ${proposal.name}`}
                    className="mt-0.5 shrink-0 text-[var(--st-text-faint)] transition-colors hover:text-[var(--st-text)]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-[var(--st-text-faint)]">
              These fill the registry, the store shelf, the blueprints and the home screen.
            </p>
          </div>

          {briefSystems(brief).length ? (
            <div>
              <p className="mb-2 text-xs font-medium">Systems shown as connected</p>
              <div className="flex flex-wrap gap-1.5">
                {briefSystems(brief)
                  .slice(0, 10)
                  .map((system) => (
                    <Badge key={system} tone="neutral">
                      {system}
                    </Badge>
                  ))}
              </div>
            </div>
          ) : null}

          {brief.metrics.length ? (
            <div>
              <p className="mb-2 text-xs font-medium">Numbers picked up</p>
              <div className="flex flex-wrap gap-1.5">
                {brief.metrics.map((metric) => (
                  <Badge key={metric} tone="accent">
                    {metric}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <p className="text-[11px] text-[var(--st-text-faint)]">
            {industryLabel(brief) || "No industry detected"} · only this summary travels in the
            share link, never the brief text.
          </p>
        </div>
      ) : null}
    </div>
  );
}
