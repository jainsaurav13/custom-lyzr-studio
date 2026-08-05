import { useState } from "react";
import { Check, Plug, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { useBrand } from "../brand/BrandProvider";
import { TOOLS } from "../data";
import { Badge, Button, Card } from "../ui";

export function ToolsView() {
  const { kit } = useBrand();
  const [connected, setConnected] = useState<string[]>(
    TOOLS.filter((tool) => tool.connected).map((tool) => tool.id),
  );

  return (
    <div className="space-y-[var(--st-gap)]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1
            className="text-xl font-semibold text-[var(--st-text)]"
            style={{ fontFamily: "var(--st-font-head)" }}
          >
            Tools & connectors
          </h1>
          <p className="mt-1 text-sm text-[var(--st-text-muted)]">
            {connected.length} of {TOOLS.length} connected in the {kit.company} tenant. Credentials
            are stored in your own vault.
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4" /> Add custom tool
        </Button>
      </div>

      <div className="grid gap-[var(--st-gap)] sm:grid-cols-2 xl:grid-cols-3">
        {TOOLS.map((tool) => {
          const on = connected.includes(tool.id);
          return (
            <Card key={tool.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--st-radius-sm)] text-xs font-semibold"
                    style={{ background: "var(--st-raised)", color: "var(--st-text)" }}
                  >
                    {tool.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--st-text)]">
                      {tool.name}
                    </p>
                    <p className="text-[11px] text-[var(--st-text-faint)]">{tool.category}</p>
                  </div>
                </div>
                {on ? (
                  <Badge tone="success">
                    <Check className="h-3 w-3" /> connected
                  </Badge>
                ) : null}
              </div>
              <p className="mt-3 flex-1 text-xs text-[var(--st-text-muted)]">{tool.description}</p>
              <Button
                className={cn("mt-4 w-full justify-center")}
                variant={on ? "outline" : "primary"}
                size="sm"
                onClick={() =>
                  setConnected((prev) =>
                    on ? prev.filter((id) => id !== tool.id) : [...prev, tool.id],
                  )
                }
              >
                <Plug className="h-3.5 w-3.5" /> {on ? "Manage" : "Connect"}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
