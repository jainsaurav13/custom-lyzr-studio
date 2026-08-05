import { useState } from "react";
import { Download, Search, Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { useBrand } from "../brand/BrandProvider";
import { makeStoreAgents } from "../data";
import { Badge, Button, Card, inputClass } from "../ui";

export function StoreView() {
  const { kit } = useBrand();
  const items = makeStoreAgents(kit.company);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  const filtered = items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      (!query || item.name.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-[var(--st-gap)]">
      <Card className="relative overflow-hidden p-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(520px 180px at 12% 0%, var(--st-primary-a15), transparent 70%)",
          }}
        />
        <div className="relative">
          <h1
            className="text-xl font-semibold text-[var(--st-text)]"
            style={{ fontFamily: "var(--st-font-head)" }}
          >
            Agent Store
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--st-text-muted)]">
            Pre-built agents you can install into the {kit.company} workspace in one click, then
            adapt with your own instructions, knowledge and guardrails.
          </p>
          <div className="relative mt-4 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--st-text-faint)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the store"
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              item === category
                ? "border-[var(--st-primary)] bg-[var(--st-primary-soft)] text-[var(--st-primary-ink)]"
                : "border-[var(--st-border)] text-[var(--st-text-muted)] hover:text-[var(--st-text)]",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-[var(--st-gap)] md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[var(--st-radius-sm)] text-sm font-semibold"
                style={{
                  background: "var(--st-primary-soft)",
                  color: "var(--st-primary-ink)",
                }}
              >
                {item.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="flex items-center gap-1 text-xs text-[var(--st-text-muted)]">
                <Star className="h-3.5 w-3.5 fill-[var(--st-accent)] text-[var(--st-accent)]" />
                {item.rating.toFixed(1)}
              </span>
            </div>
            <h3
              className="mt-3 text-sm font-semibold text-[var(--st-text)]"
              style={{ fontFamily: "var(--st-font-head)" }}
            >
              {item.name}
            </h3>
            <p className="mt-1 text-[11px] text-[var(--st-text-faint)]">by {item.publisher}</p>
            <p className="mt-3 flex-1 text-xs text-[var(--st-text-muted)]">{item.description}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <Badge tone="neutral">{item.installs} installs</Badge>
              <Button size="sm" variant="primary">
                <Download className="h-3.5 w-3.5" /> Install
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
