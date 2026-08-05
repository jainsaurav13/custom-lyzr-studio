import { createFileRoute } from "@tanstack/react-router";
import { inflateRawSync } from "node:zlib";

/**
 * Pulls the text out of a .docx so a rep can upload the brief they already
 * have. A .docx is a ZIP holding word/document.xml, and Node can inflate that
 * with no dependency — PDFs are handled in the browser by pdf.js instead.
 */

const MAX_BYTES = 12_000_000;

interface ZipEntry {
  name: string;
  method: number;
  offset: number;
  compressedSize: number;
}

function readCentralDirectory(buffer: Buffer): ZipEntry[] {
  // The end-of-central-directory record lives in the last 64KB, after a
  // variable-length comment, so scan backwards for its signature.
  let eocd = -1;
  const from = Math.max(0, buffer.length - 66_000);
  for (let i = buffer.length - 22; i >= from; i -= 1) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("Not a ZIP archive");

  const count = buffer.readUInt16LE(eocd + 10);
  let pointer = buffer.readUInt32LE(eocd + 16);
  const entries: ZipEntry[] = [];

  for (let i = 0; i < count; i += 1) {
    if (buffer.readUInt32LE(pointer) !== 0x02014b50) break;
    const method = buffer.readUInt16LE(pointer + 10);
    const compressedSize = buffer.readUInt32LE(pointer + 20);
    const nameLength = buffer.readUInt16LE(pointer + 28);
    const extraLength = buffer.readUInt16LE(pointer + 30);
    const commentLength = buffer.readUInt16LE(pointer + 32);
    const offset = buffer.readUInt32LE(pointer + 42);
    const name = buffer.toString("utf8", pointer + 46, pointer + 46 + nameLength);
    entries.push({ name, method, offset, compressedSize });
    pointer += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function readEntry(buffer: Buffer, entry: ZipEntry): Buffer {
  if (buffer.readUInt32LE(entry.offset) !== 0x04034b50) throw new Error("Bad ZIP entry");
  const nameLength = buffer.readUInt16LE(entry.offset + 26);
  const extraLength = buffer.readUInt16LE(entry.offset + 28);
  const start = entry.offset + 30 + nameLength + extraLength;
  const data = buffer.subarray(start, start + entry.compressedSize);
  return entry.method === 0 ? data : inflateRawSync(data);
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
};

/** Word XML → plain text, keeping paragraph and table-cell boundaries. */
function documentXmlToText(xml: string): string {
  return xml
    .replace(/<w:tab\b[^>]*\/>/g, "\t")
    .replace(/<w:br\b[^>]*\/>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<\/w:tc>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? " ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const Route = createFileRoute("/api/brief-extract")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const bytes = await request.arrayBuffer();
          if (!bytes.byteLength) {
            return Response.json({ error: "No file received." }, { status: 400 });
          }
          if (bytes.byteLength > MAX_BYTES) {
            return Response.json({ error: "That file is too large to read." }, { status: 413 });
          }

          const buffer = Buffer.from(bytes);
          const entries = readCentralDirectory(buffer);
          const main =
            entries.find((entry) => entry.name === "word/document.xml") ??
            entries.find((entry) => entry.name.endsWith("document.xml"));
          if (!main) {
            return Response.json(
              { error: "That does not look like a Word document." },
              { status: 415 },
            );
          }

          const text = documentXmlToText(readEntry(buffer, main).toString("utf8"));
          if (text.length < 40) {
            return Response.json(
              { error: "That document has almost no text in it." },
              { status: 422 },
            );
          }
          return Response.json({ text: text.slice(0, 200_000) });
        } catch {
          return Response.json(
            { error: "That file could not be read — paste the text instead." },
            { status: 400 },
          );
        }
      },
    },
  },
});
