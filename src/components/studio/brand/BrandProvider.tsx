import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  deriveTheme,
  encodeKit,
  LYZR_KIT,
  mergeKit,
  SHARE_PARAM,
  shareUrl,
  type StudioTheme,
} from "./kit";
import type { BrandKit } from "./types";

interface BrandContextValue {
  kit: BrandKit;
  theme: StudioTheme;
  setKit: (next: BrandKit) => void;
  update: (patch: Partial<BrandKit>) => void;
  reset: () => void;
  link: string;
  isBranded: boolean;
}

const BrandContext = createContext<BrandContextValue | null>(null);

/** Google Fonts are loaded on demand so a customer's typeface shows up live. */
function useWebFonts(families: string[]) {
  const key = families.join("|");
  useEffect(() => {
    if (typeof document === "undefined") return;
    key
      .split("|")
      .filter(Boolean)
      .forEach((family) => {
        const id = `st-font-${family.replace(/\W+/g, "-").toLowerCase()}`;
        if (document.getElementById(id)) return;
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
          family,
        )}:wght@400;500;600;700&display=swap`;
        document.head.appendChild(link);
      });
  }, [key]);
}

export function BrandProvider({
  initialKit,
  children,
}: {
  initialKit?: BrandKit | null;
  children: ReactNode;
}) {
  const [kit, setKitState] = useState<BrandKit>(() => mergeKit(initialKit ?? undefined));

  const theme = useMemo(() => deriveTheme(kit), [kit]);
  // Instrument Serif is the italic accent in the hero headline, whatever the brand.
  useWebFonts([kit.fontHeading, kit.fontBody, "Instrument Serif"]);

  const link = useMemo(() => shareUrl(kit), [kit]);

  // The address bar always *is* the share link — no separate publish step.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const encoded = encodeKit(kit);
    const url = new URL(window.location.href);
    if (encoded) url.searchParams.set(SHARE_PARAM, encoded);
    else url.searchParams.delete(SHARE_PARAM);
    window.history.replaceState(null, "", url.toString());
  }, [kit]);

  const setKit = useCallback((next: BrandKit) => setKitState(mergeKit(next)), []);
  const update = useCallback(
    (patch: Partial<BrandKit>) => setKitState((prev) => ({ ...prev, ...patch })),
    [],
  );
  const reset = useCallback(() => setKitState(LYZR_KIT), []);

  const value = useMemo<BrandContextValue>(
    () => ({
      kit,
      theme,
      setKit,
      update,
      reset,
      link,
      isBranded: kit.company !== LYZR_KIT.company || Boolean(kit.logoUrl),
    }),
    [kit, theme, setKit, update, reset, link],
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used inside <BrandProvider>");
  return ctx;
}
