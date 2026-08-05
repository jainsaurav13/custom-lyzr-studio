import { createRootRoute, HeadContent, Outlet, Scripts, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

const TITLE = "Agent Studio — white-label preview";
const DESCRIPTION =
  "An interactive agent studio themed with your own logo, colours and typography.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#0B0C12" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: "/studio-og.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/studio-og.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: Outlet,
  notFoundComponent: NotFound,
  errorComponent: ErrorScreen,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Frame({ title, body, action }: { title: string; body: string; action: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0C12] px-6 text-center text-[#F4F4F7]">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-[#A6A6B6]">{body}</p>
        <div className="mt-6 flex justify-center gap-3">{action}</div>
      </div>
    </div>
  );
}

const buttonClass =
  "inline-flex items-center rounded-lg bg-[#6D5AE6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7d6bf0]";

function NotFound() {
  return (
    <Frame
      title="Page not found"
      body="There is only one page here — the studio itself."
      action={
        <a href="/" className={buttonClass}>
          Open the studio
        </a>
      }
    />
  );
}

function ErrorScreen({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <Frame
      title="This page didn't load"
      body="Something went wrong rendering the studio. If you opened a share link, it may have been truncated in transit — ask for it again."
      action={
        <>
          <button
            className={buttonClass}
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-sm text-[#F4F4F7]"
          >
            Start fresh
          </a>
        </>
      }
    />
  );
}
