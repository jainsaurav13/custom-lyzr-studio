import { CloudUpload, Database, FileText, Globe, RefreshCw, Table2 } from "lucide-react";

import { useBrand } from "../brand/BrandProvider";
import { makeDocs, type KnowledgeDoc } from "../data";
import { Badge, Button, Card, CardHeader, Meter, StatusDot } from "../ui";

const ICONS: Record<KnowledgeDoc["type"], typeof FileText> = {
  PDF: FileText,
  DOCX: FileText,
  URL: Globe,
  CSV: Table2,
  Confluence: Database,
};

export function KnowledgeView() {
  const { kit } = useBrand();
  const docs = makeDocs(kit.company, kit.brief);
  const indexed = docs.filter((doc) => doc.status === "indexed").length;

  return (
    <div className="space-y-[var(--st-gap)]">
      <div className="grid gap-[var(--st-gap)] xl:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader
            title={`${kit.company} knowledge base`}
            subtitle="Sources your agents can retrieve from, with permissions mirrored from the source system"
            action={
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <RefreshCw className="h-3.5 w-3.5" /> Re-index
                </Button>
                <Button size="sm" variant="primary">
                  <CloudUpload className="h-3.5 w-3.5" /> Add source
                </Button>
              </div>
            }
          />
          <div className="overflow-x-auto border-t border-[var(--st-border)]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[var(--st-surface-2)] text-xs uppercase tracking-wide text-[var(--st-text-faint)]">
                <tr>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Chunks</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc) => {
                  const Icon = ICONS[doc.type];
                  return (
                    <tr
                      key={doc.id}
                      className="border-t border-[var(--st-border)] hover:bg-[var(--st-surface-2)]"
                    >
                      <td className="px-5 py-[var(--st-row-pad)]">
                        <span className="flex items-center gap-2.5 text-[var(--st-text)]">
                          <Icon className="h-4 w-4 shrink-0 text-[var(--st-primary-ink)]" />
                          <span className="truncate">{doc.name}</span>
                        </span>
                      </td>
                      <td className="px-4 py-[var(--st-row-pad)] text-[var(--st-text-muted)]">
                        {doc.type}
                      </td>
                      <td className="px-4 py-[var(--st-row-pad)] tabular-nums text-[var(--st-text-muted)]">
                        {doc.chunks.toLocaleString()}
                      </td>
                      <td className="px-4 py-[var(--st-row-pad)] text-[var(--st-text-muted)]">
                        {doc.size}
                      </td>
                      <td className="px-4 py-[var(--st-row-pad)]">
                        <span className="flex items-center gap-2 text-xs text-[var(--st-text-muted)]">
                          <StatusDot
                            tone={
                              doc.status === "indexed"
                                ? "success"
                                : doc.status === "processing"
                                  ? "warning"
                                  : "danger"
                            }
                          />
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-[var(--st-row-pad)] text-[var(--st-text-faint)]">
                        {doc.updated}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-[var(--st-gap)]">
          <Card className="p-5">
            <p className="text-xs text-[var(--st-text-muted)]">Index health</p>
            <p
              className="mt-2 text-2xl font-semibold text-[var(--st-text)]"
              style={{ fontFamily: "var(--st-font-head)" }}
            >
              {indexed}/{docs.length} sources
            </p>
            <div className="mt-3">
              <Meter value={(indexed / docs.length) * 100} />
            </div>
            <dl className="mt-4 space-y-2 text-xs">
              {[
                ["Vector store", "Lyzr managed · pgvector"],
                ["Embedding model", "text-embedding-3-large"],
                ["Chunk size", "800 tokens · 120 overlap"],
                ["Refresh", "Nightly at 02:00 IST"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-[var(--st-text-faint)]">{label}</dt>
                  <dd className="text-right text-[var(--st-text-muted)]">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="border-dashed p-6 text-center">
            <CloudUpload className="mx-auto h-6 w-6 text-[var(--st-primary-ink)]" />
            <p className="mt-3 text-sm font-medium text-[var(--st-text)]">Drop files to index</p>
            <p className="mt-1 text-xs text-[var(--st-text-muted)]">
              PDF, DOCX, CSV, HTML — or connect a live source
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {["SharePoint", "Confluence", "Drive", "S3", "Website"].map((source) => (
                <Badge key={source} tone="neutral">
                  {source}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
