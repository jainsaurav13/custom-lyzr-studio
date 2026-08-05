import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { BrandProvider, useBrand } from "@/components/studio/brand/BrandProvider";
import { decodeKit, SHARE_PARAM } from "@/components/studio/brand/kit";
import { StudioShell } from "@/components/studio/StudioShell";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    b: typeof search[SHARE_PARAM] === "string" ? (search[SHARE_PARAM] as string) : undefined,
  }),
  component: StudioRoute,
});

/** Keeps the browser chrome in step with the customer's brand. */
function DocumentBrand() {
  const { kit, theme } = useBrand();
  useEffect(() => {
    document.title = `${kit.company} ${kit.product}`;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme.vars["--st-bg"]);
    // Matches the overscroll area to the theme so the page never flashes black.
    document.body.style.background = theme.vars["--st-bg"];
  }, [kit.company, kit.product, theme]);
  return null;
}

function StudioRoute() {
  const search = Route.useSearch();
  const initialKit = decodeKit(search.b);

  return (
    <BrandProvider initialKit={initialKit}>
      <DocumentBrand />
      <StudioShell />
    </BrandProvider>
  );
}
