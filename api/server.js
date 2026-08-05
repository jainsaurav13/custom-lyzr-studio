/**
 * Vercel serverless entry point.
 *
 * Vercel serves `dist/client` from its CDN and rewrites everything else here
 * (see vercel.json), so this only has to hand the request to the TanStack Start
 * SSR + API handler and write the response back. `server.js` in the repo root
 * does the same job for hosts that run a long-lived Node process.
 *
 * The import below is deliberately static: Vercel traces it to work out which
 * files and dependencies to ship in the function, and a computed specifier
 * would hide the whole server bundle from that trace.
 */
import { Readable } from "node:stream";

import ssr from "../dist/server/server.js";

function toWebRequest(req) {
  const url = new URL(req.url, `https://${req.headers.host ?? "localhost"}`);
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  return new Request(url, {
    method: req.method,
    headers: req.headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

export default async function handler(req, res) {
  try {
    const response = await ssr.fetch(toWebRequest(req), {}, {});
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) Readable.fromWeb(response.body).pipe(res);
    else res.end();
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal server error");
  }
}
