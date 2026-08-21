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
      { name: "theme-color", content: "#fafbfc" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: TelcoPage,
});
