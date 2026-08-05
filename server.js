/**
 * Production server: static assets from dist/client, everything else to the
 * TanStack Start SSR + API handler in dist/server.
 *
 *   npm run build && npm start
 *
 * Deliberately dependency-free so it runs on any Node host — Render, Railway,
 * Fly, a container, a VM. Platforms that build the app themselves (Vercel,
 * Netlify) do not need this file.
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const clientDir = join(root, "dist", "client");
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

const { default: ssr } = await import("./dist/server/server.js");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

async function serveStatic(req, res, pathname) {
  // normalize() keeps "../" from escaping dist/client.
  const filePath = join(clientDir, normalize(decodeURIComponent(pathname)));
  if (!filePath.startsWith(clientDir)) return false;

  let info;
  try {
    info = await stat(filePath);
  } catch {
    return false;
  }
  if (!info.isFile()) return false;

  const ext = extname(filePath).toLowerCase();
  res.writeHead(200, {
    "content-type": MIME[ext] ?? "application/octet-stream",
    "content-length": info.size,
    // Hashed asset filenames are safe to cache hard; everything else is not.
    "cache-control": filePath.includes(`${join("assets")}`)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=3600",
  });
  createReadStream(filePath).pipe(res);
  return true;
}

function toWebRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  return new Request(url, {
    method: req.method,
    headers: req.headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, "http://localhost").pathname;
    if (req.method === "GET" && (await serveStatic(req, res, pathname))) return;

    const response = await ssr.fetch(toWebRequest(req), {}, {});
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) Readable.fromWeb(response.body).pipe(res);
    else res.end();
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal server error");
  }
});

server.listen(port, host, () => {
  console.log(`Brand Studio running on http://${host}:${port}`);
});
