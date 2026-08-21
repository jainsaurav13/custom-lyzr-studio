import { createFileRoute } from "@tanstack/react-router";

import { TelcoPage } from "@/components/telco/TelcoPage";

const TITLE = "Launch your sovereign AI platform — Lyzr for telecom operators";
const DESCRIPTION =
  "How a telecom operator launches a locally governed AI platform under its own brand: what customers buy, the five revenue lines, the sovereignty controls and a 90-day lighthouse launch.";

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
