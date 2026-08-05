import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Blocks,
  Check,
  Loader2,
  MessageSquare,
  Mic,
  Network,
  Paperclip,
  Phone,
  SendHorizontal,
  Sparkles,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useBrand } from "../brand/BrandProvider";
import {
  ARCHITECT_STEPS,
  BLUEPRINTS,
  BUILD_MODES,
  COMPOSER_PROMPTS,
  PREBUILT,
  SUGGESTIONS,
  type Agent,
} from "../data";
import { Badge, Button, Card } from "../ui";

const MODE_ICONS = {
  agent: MessageSquare,
  managerial: Network,
  superflow: Workflow,
  voice: Phone,
} as const;

/**
 * The studio's front door: describe the agent you want and the Architect builds
 * it. Everything under the composer is the same set of shortcuts the product
 * offers — build modes, blueprints, pre-built agents.
 */
export function HomeView({
  agents,
  onOpenAgent,
  onArchitect,
}: {
  agents: Agent[];
  onOpenAgent: (id: string) => void;
  onArchitect: (prompt: string) => void;
}) {
  const { kit } = useBrand();
  const [prompt, setPrompt] = useState("");
  const [building, setBuilding] = useState<string | null>(null);
  const placeholder = useTypedPlaceholder(prompt.length === 0);

  const submit = (text: string) => {
    const clean = text.trim();
    if (!clean || building) return;
    setBuilding(clean);
  };

  if (building) {
    return <ArchitectBuilding prompt={building} onDone={() => onArchitect(building)} />;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-1 pb-10 pt-6 sm:pt-10">
      <div className="flex flex-col items-center text-center">
        <button className="inline-flex items-center gap-1.5 rounded-full border border-[var(--st-border-strong)] bg-[var(--st-surface)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--st-raised)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--st-accent-ink)]" />
          Explore Architect
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
        </button>

        <h1
          className="mt-7 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--st-text)] sm:text-5xl"
          style={{ fontFamily: "var(--st-font-head)" }}
        >
          Build agents. Automate your work.
          <br />
          <span
            className="italic"
            style={{
              fontFamily: '"Instrument Serif", "Playfair Display", Georgia, serif',
              color: "var(--st-accent-ink)",
              fontWeight: 400,
            }}
          >
            Reclaim
          </span>{" "}
          your life.
        </h1>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--st-text-muted)]">
          Describe what you want to build. We&apos;ll bring it to life.
          <Badge tone="neutral">Beta</Badge>
        </p>
      </div>

      <Card className="mt-7 overflow-hidden">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit(prompt);
            }
          }}
          rows={3}
          placeholder={placeholder}
          aria-label="Describe the agent you want to build"
          className="w-full resize-none bg-transparent px-5 pb-2 pt-5 text-[15px] leading-relaxed text-[var(--st-text)] placeholder:text-[var(--st-text-faint)] focus:outline-none"
        />
        <div className="flex items-center justify-between gap-3 px-4 pb-4">
          <button
            className="rounded-full p-2 text-[var(--st-text-faint)] transition-colors hover:bg-[var(--st-raised)] hover:text-[var(--st-text)]"
            aria-label="Attach a file"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1">
            <button
              className="rounded-full p-2 text-[var(--st-text-faint)] transition-colors hover:bg-[var(--st-raised)] hover:text-[var(--st-text)]"
              aria-label="Dictate"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={() => submit(prompt)}
              disabled={!prompt.trim()}
              aria-label="Build this agent"
              className="rounded-[var(--st-radius-sm)] p-2.5 transition-opacity disabled:opacity-40"
              style={{ background: "var(--st-primary)", color: "var(--st-primary-on)" }}
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => submit(suggestion)}
            className="rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface)] px-4 py-2.5 text-sm text-[var(--st-text-muted)] transition-colors hover:border-[var(--st-border-strong)] hover:text-[var(--st-text)]"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <Section title="Build">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {BUILD_MODES.map((mode) => {
            const Icon = MODE_ICONS[mode.id];
            return (
              <Card
                key={mode.id}
                className="cursor-pointer p-4 transition-colors hover:border-[var(--st-border-strong)]"
                onClick={() =>
                  submit(`Create a ${mode.name.toLowerCase()} agent for ${kit.company}`)
                }
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[var(--st-radius-sm)] bg-[var(--st-raised)]">
                  <Icon className="h-4 w-4 text-[var(--st-text)]" />
                </span>
                <p
                  className="mt-3 text-sm font-semibold text-[var(--st-text)]"
                  style={{ fontFamily: "var(--st-font-head)" }}
                >
                  {mode.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--st-text-muted)]">
                  {mode.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionTitle>Blueprints</SectionTitle>
          <div className="mt-3 space-y-3">
            {BLUEPRINTS.map((blueprint) => (
              <Card key={blueprint.id} className="flex items-start gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--st-radius-sm)] bg-[var(--st-raised)]">
                  <Blocks className="h-4 w-4 text-[var(--st-text)]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[var(--st-text)]">
                    {blueprint.name}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--st-text-muted)]">
                    {blueprint.description}
                  </span>
                  <span className="mt-2 block text-[11px] text-[var(--st-text-faint)]">
                    {blueprint.steps} steps
                  </span>
                </span>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Pre-built agents</SectionTitle>
          <div className="mt-3 space-y-3">
            {PREBUILT.map((item) => (
              <Card key={item.id} className="flex items-start gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--st-radius-sm)] bg-[var(--st-primary-soft)] text-xs font-semibold text-[var(--st-primary-ink)]">
                  {item.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-[var(--st-text)]">
                      {item.name}
                    </span>
                    <Badge tone="neutral">{item.tag}</Badge>
                  </span>
                  <span className="mt-1 block text-xs text-[var(--st-text-muted)]">
                    {item.description}
                  </span>
                </span>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Section title={`Your agents at ${kit.company}`}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {agents.slice(0, 3).map((agent) => (
            <Card
              key={agent.id}
              onClick={() => onOpenAgent(agent.id)}
              className="cursor-pointer p-4 transition-colors hover:border-[var(--st-border-strong)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-[var(--st-text)]">
                  {agent.name}
                </span>
                <Badge tone={agent.status === "live" ? "success" : "neutral"}>{agent.status}</Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-[var(--st-text-muted)]">{agent.role}</p>
              <p className="mt-3 text-[11px] text-[var(--st-text-faint)]">
                {agent.runs.toLocaleString()} runs · updated {agent.updated}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-sm font-semibold text-[var(--st-text)]"
      style={{ fontFamily: "var(--st-font-head)" }}
    >
      {children}
    </h2>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Cycles through example prompts, typing and deleting, like the real studio. */
function useTypedPlaceholder(active: boolean): string {
  const [text, setText] = useState("");
  const state = useRef({ index: 0, char: 0, deleting: false });

  useEffect(() => {
    if (!active) return;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = COMPOSER_PROMPTS[state.current.index % COMPOSER_PROMPTS.length];
      const { deleting } = state.current;
      state.current.char += deleting ? -1 : 1;
      setText(current.slice(0, Math.max(0, state.current.char)));

      let delay = deleting ? 24 : 52;
      if (!deleting && state.current.char >= current.length) {
        state.current.deleting = true;
        delay = 2200;
      } else if (deleting && state.current.char <= 0) {
        state.current.deleting = false;
        state.current.index += 1;
        delay = 420;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [active]);

  return active ? text || "Describe the agent you want…" : "";
}

/** The short "Architect is working" beat between prompt and builder. */
function ArchitectBuilding({ prompt, onDone }: { prompt: string; onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = ARCHITECT_STEPS.map((_, index) =>
      setTimeout(() => setStep(index + 1), 620 * (index + 1)),
    );
    const finish = setTimeout(onDone, 620 * ARCHITECT_STEPS.length + 700);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-1 pt-16 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--st-primary-soft)]">
        <Sparkles className="h-5 w-5 text-[var(--st-primary-ink)]" />
      </span>
      <h1
        className="mt-5 text-2xl font-semibold tracking-tight text-[var(--st-text)]"
        style={{ fontFamily: "var(--st-font-head)" }}
      >
        Architect is building your agent
      </h1>
      <p className="mt-2 max-w-lg text-sm text-[var(--st-text-muted)]">&ldquo;{prompt}&rdquo;</p>

      <Card className="mt-8 w-full p-5 text-left">
        <ul className="space-y-3">
          {ARCHITECT_STEPS.map((label, index) => {
            const done = step > index;
            const active = step === index;
            return (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    done
                      ? "border-transparent bg-[var(--st-primary)] text-[var(--st-primary-on)]"
                      : "border-[var(--st-border-strong)]",
                  )}
                >
                  {done ? (
                    <Check className="h-3 w-3" />
                  ) : active ? (
                    <Loader2 className="h-3 w-3 animate-spin text-[var(--st-text-muted)]" />
                  ) : null}
                </span>
                <span
                  className={
                    done || active ? "text-[var(--st-text)]" : "text-[var(--st-text-faint)]"
                  }
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      <Button variant="ghost" size="sm" className="mt-4" onClick={onDone}>
        Skip
      </Button>
    </div>
  );
}
