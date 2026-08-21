import { createFileRoute } from "@tanstack/react-router";

import { TelcoPage } from "@/components/telco/TelcoPage";

const TITLE = "Lyzr × Telco — sovereign agent platform partnership";
const DESCRIPTION =
  "How a telecom operator becomes a provider of governed enterprise AI services with Lyzr: three partnership models, the sovereignty boundary, the reference architecture and a phased route to market.";

export const Route = createFileRoute("/telco")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#F8FAFC" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: TelcoPage,
});
