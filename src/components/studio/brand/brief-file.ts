/**
 * Getting text out of whatever the rep drags in. Plain text is free, PDFs are
 * read in the browser with pdf.js, and Word documents go to the server (a .docx
 * is a ZIP, which Node can open without a dependency).
 */

const MAX_CHARS = 200_000;

async function pdfToText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages: string[] = [];
  const limit = Math.min(doc.numPages, 40);
  for (let index = 1; index <= limit; index += 1) {
    const page = await doc.getPage(index);
    const content = await page.getTextContent();
    // Keep the page's line structure: headings are only distinguishable from
    // body text by sitting on their own line, and the brief reader relies on it.
    let line = "";
    const lines: string[] = [];
    content.items.forEach((item) => {
      if (!("str" in item)) return;
      line += item.str;
      if (item.hasEOL) {
        lines.push(line.replace(/\s{2,}/g, " ").trim());
        line = "";
      }
    });
    if (line.trim()) lines.push(line.replace(/\s{2,}/g, " ").trim());
    pages.push(lines.filter(Boolean).join("\n"));
  }
  doc.cleanup();
  return pages.join("\n\n").trim();
}

async function docxToText(file: File): Promise<string> {
  const response = await fetch("/api/brief-extract", {
    method: "POST",
    headers: { "content-type": "application/octet-stream" },
    body: await file.arrayBuffer(),
  });
  const payload = (await response.json()) as { text?: string; error?: string };
  if (!response.ok || !payload.text) {
    throw new Error(payload.error ?? "That document could not be read.");
  }
  return payload.text;
}

export async function readBriefFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  let text = "";

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    text = await pdfToText(file);
    if (text.length < 40) {
      throw new Error(
        "That PDF has no selectable text — it is probably a scan. Paste the text instead.",
      );
    }
  } else if (name.endsWith(".docx")) {
    text = await docxToText(file);
  } else if (name.endsWith(".doc")) {
    throw new Error("Old .doc files aren't supported — save as .docx or paste the text.");
  } else {
    text = await file.text();
  }

  return text.slice(0, MAX_CHARS);
}
