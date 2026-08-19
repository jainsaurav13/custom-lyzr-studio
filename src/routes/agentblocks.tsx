import { createFileRoute } from "@tanstack/react-router";

import { AgentBlocksPage } from "@/components/agentblocks/AgentBlocksPage";
import { FONT_HREF } from "@/components/agentblocks/theme";

const TITLE = "AgentBlocks — OEM agent infrastructure for ISVs";
const DESCRIPTION =
  "AgentBlocks gives ISVs the production building blocks to launch, govern and scale AI products under their own brand, without replacing what already works.";

/**
 * The AgentBlocks pitch, as a page an executive can be sent cold. The studio at
 * `/` is the product this page is selling, and the two share one palette.
 */
export const Route = createFileRoute("/agentblocks")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#FBFAF8" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    // Loaded in the SSR HTML so the serif accents never swap in mid-scroll.
    links: [{ rel: "stylesheet", href: FONT_HREF }],
  }),
  component: AgentBlocksPage,
});
