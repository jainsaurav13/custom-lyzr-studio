import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CornerDownLeft,
  FileText,
  Play,
  Rocket,
  Settings2,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useBrand } from "../brand/BrandProvider";
import { BrandMark } from "../BrandMark";
import { makeConversation, MODELS, TOOLS, type Agent } from "../data";
import { Badge, Button, Card, CardHeader, Field, inputClass, Tabs, Toggle } from "../ui";

type BuilderTab = "instructions" | "knowledge" | "tools" | "guardrails" | "deploy";

export function AgentBuilderView({
  agent,
  architectPrompt,
  onBack,
}: {
  agent: Agent;
  architectPrompt?: string;
  onBack: () => void;
}) {
  const { kit } = useBrand();
  const [tab, setTab] = useState<BuilderTab>("instructions");
  const [model, setModel] = useState(agent.model);
  const [temperature, setTemperature] = useState(0.3);
  const [name, setName] = useState(agent.name);
  const [instructions, setInstructions] = useState(
    `You are the ${agent.name} for ${kit.company}.${architectPrompt ? `\n\nWhat you were asked to do: ${architectPrompt}` : ""}\n\nAlways ground answers in the connected knowledge base and cite the source. If the answer is not in the knowledge base, say so and offer to route the request to a human. Never share pricing that is not in the approved matrix. Keep replies under 120 words unless the customer asks for detail.`,
  );
  const [guardrails, setGuardrails] = useState({
    pii: true,
    toxicity: true,
    hallucination: true,
    escalate: false,
  });
  const [selectedTools, setSelectedTools] = useState<string[]>(
    TOOLS.filter((tool) => tool.connected)
      .slice(0, 4)
      .map((tool) => tool.id),
  );

  useEffect(() => {
    setName(agent.name);
    setModel(agent.model);
  }, [agent.id]);

  return (
    <div className="space-y-[var(--st-gap)] pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back to agents">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <h1
              className="flex items-center gap-2 truncate text-lg font-semibold text-[var(--st-text)]"
              style={{ fontFamily: "var(--st-font-head)" }}
            >
              <span className="truncate">{name}</span>
              {architectPrompt ? <Badge tone="brand">Draft</Badge> : null}
            </h1>
            <p className="text-xs text-[var(--st-text-faint)]">
              {architectPrompt
                ? "Drafted by Architect · not yet published"
                : `v12 · saved ${agent.updated} · ${agent.owner}`}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Play className="h-4 w-4" /> Run evaluation
          </Button>
          <Button variant="primary">
            <Rocket className="h-4 w-4" /> Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-[var(--st-gap)] xl:grid-cols-[1.15fr_1fr]">
        <Card className="overflow-hidden">
          <div className="px-2 pt-1">
            <Tabs
              value={tab}
              onChange={setTab}
              options={[
                { value: "instructions", label: "Instructions" },
                { value: "knowledge", label: "Knowledge" },
                { value: "tools", label: "Tools" },
                { value: "guardrails", label: "Responsible AI" },
                { value: "deploy", label: "Deploy" },
              ]}
            />
          </div>

          <div className="space-y-5 p-5">
            {tab === "instructions" ? (
              <>
                <Field label="Agent name">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="System instructions" hint={`${instructions.length} chars`}>
                  <textarea
                    value={instructions}
                    onChange={(event) => setInstructions(event.target.value)}
                    rows={9}
                    className={cn(inputClass, "resize-y font-mono text-xs leading-relaxed")}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Model">
                    <select
                      value={model}
                      onChange={(event) => setModel(event.target.value)}
                      className={inputClass}
                    >
                      {MODELS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Temperature" hint={temperature.toFixed(2)}>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={temperature}
                      onChange={(event) => setTemperature(Number(event.target.value))}
                      className="mt-3 w-full accent-[var(--st-primary)]"
                    />
                  </Field>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Toggle
                    checked
                    label="Short-term memory"
                    description="Remember the last 20 turns"
                    onChange={() => {}}
                  />
                  <Toggle
                    checked
                    label="Long-term memory"
                    description="Per-user profile across sessions"
                    onChange={() => {}}
                  />
                </div>
              </>
            ) : null}

            {tab === "knowledge" ? (
              <div className="space-y-3">
                <p className="text-xs text-[var(--st-text-muted)]">
                  Sources this agent may cite. Retrieval respects the permissions of the signed-in
                  user.
                </p>
                {[...agent.knowledge, `${kit.company} Help Centre`].map((source) => (
                  <div
                    key={source}
                    className="flex items-center justify-between gap-3 rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] px-4 py-3"
                  >
                    <span className="flex min-w-0 items-center gap-2.5 text-sm text-[var(--st-text)]">
                      <BookOpen className="h-4 w-4 shrink-0 text-[var(--st-primary-ink)]" />
                      <span className="truncate">{source}</span>
                    </span>
                    <Badge tone="success">
                      <Check className="h-3 w-3" /> indexed
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm">
                  <FileText className="h-3.5 w-3.5" /> Attach another source
                </Button>
              </div>
            ) : null}

            {tab === "tools" ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {TOOLS.slice(0, 8).map((tool) => {
                  const on = selectedTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() =>
                        setSelectedTools((prev) =>
                          on ? prev.filter((id) => id !== tool.id) : [...prev, tool.id],
                        )
                      }
                      className={cn(
                        "flex items-start gap-3 rounded-[var(--st-radius-sm)] border p-3 text-left transition-colors",
                        on
                          ? "border-[var(--st-primary)] bg-[var(--st-primary-soft)]"
                          : "border-[var(--st-border)] bg-[var(--st-surface-2)] hover:border-[var(--st-border-strong)]",
                      )}
                    >
                      <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[var(--st-primary-ink)]" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-[var(--st-text)]">
                          {tool.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-[var(--st-text-muted)]">
                          {tool.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {tab === "guardrails" ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--st-primary-ink)]" />
                  <p className="text-xs text-[var(--st-text-muted)]">
                    Every response is checked before it reaches a {kit.company} customer. Blocked
                    responses are logged with the offending span for review.
                  </p>
                </div>
                <Toggle
                  checked={guardrails.pii}
                  onChange={(next) => setGuardrails((prev) => ({ ...prev, pii: next }))}
                  label="PII redaction"
                  description="Mask emails, card numbers and national IDs in prompts and replies"
                />
                <Toggle
                  checked={guardrails.hallucination}
                  onChange={(next) => setGuardrails((prev) => ({ ...prev, hallucination: next }))}
                  label="Groundedness check"
                  description="Reject answers not supported by a retrieved passage"
                />
                <Toggle
                  checked={guardrails.toxicity}
                  onChange={(next) => setGuardrails((prev) => ({ ...prev, toxicity: next }))}
                  label="Toxicity filter"
                  description="Block unsafe or abusive language in both directions"
                />
                <Toggle
                  checked={guardrails.escalate}
                  onChange={(next) => setGuardrails((prev) => ({ ...prev, escalate: next }))}
                  label="Human in the loop"
                  description="Route low-confidence answers to an approver queue"
                />
              </div>
            ) : null}

            {tab === "deploy" ? (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Web widget", "Slack app", "REST API", "Microsoft Teams"].map((channel) => (
                    <div
                      key={channel}
                      className="rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] p-4"
                    >
                      <p className="text-sm font-medium text-[var(--st-text)]">{channel}</p>
                      <p className="mt-1 text-[11px] text-[var(--st-text-muted)]">
                        {channel === "Web widget"
                          ? `Embedded on ${kit.company.toLowerCase().replace(/\s+/g, "")}.com`
                          : "Not connected"}
                      </p>
                    </div>
                  ))}
                </div>
                <Field label="Endpoint">
                  <input
                    readOnly
                    value={`https://api.${kit.company.toLowerCase().replace(/\s+/g, "")}.ai/v1/agents/${agent.id}/chat`}
                    className={cn(inputClass, "font-mono text-xs")}
                  />
                </Field>
              </div>
            ) : null}
          </div>
        </Card>

        <TestPanel agentName={name} />
      </div>
    </div>
  );
}

function TestPanel({ agentName }: { agentName: string }) {
  const { kit } = useBrand();
  const script = useMemo(() => makeConversation(kit.company), [kit.company]);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "agent"; text: string; citations?: string[]; actions?: string[] }>
  >([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMessages([]);
    setThinking(false);
    timers.current.push(
      setTimeout(() => setMessages([script[0]]), 500),
      setTimeout(() => setThinking(true), 900),
      setTimeout(() => {
        setThinking(false);
        setMessages(script);
      }, 2600),
    );
    return () => timers.current.forEach(clearTimeout);
  }, [script]);

  const send = () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    setDraft("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setThinking(true);
    timers.current.push(
      setTimeout(() => {
        setThinking(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            text: `Here's what I found in the ${kit.company} knowledge base. This is a demo workspace, so the answer is illustrative — in your tenant this would run against your live sources with the same guardrails applied.`,
            citations: [`${kit.company} product handbook`],
          },
        ]);
      }, 1400),
    );
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader title="Test" subtitle={agentName} action={<Badge tone="brand">Preview</Badge>} />
      <div className="flex-1 space-y-4 overflow-y-auto border-t border-[var(--st-border)] p-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn("flex gap-3", message.role === "user" ? "justify-end" : "")}
          >
            {message.role === "agent" ? <BrandMark size={28} className="mt-0.5" /> : null}
            <div
              className={cn(
                "max-w-[85%] rounded-[var(--st-radius)] px-4 py-3 text-sm",
                message.role === "user"
                  ? "bg-[var(--st-primary)] text-[var(--st-primary-on)]"
                  : "border border-[var(--st-border)] bg-[var(--st-surface-2)] text-[var(--st-text)]",
              )}
            >
              <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
              {message.citations?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[var(--st-border)] pt-2.5">
                  {message.citations.map((citation) => (
                    <Badge key={citation} tone="neutral">
                      <FileText className="h-3 w-3" /> {citation}
                    </Badge>
                  ))}
                </div>
              ) : null}
              {message.actions?.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {message.actions.map((action) => (
                    <Badge key={action} tone="accent">
                      <Settings2 className="h-3 w-3" /> {action}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {thinking ? (
          <div className="flex items-center gap-3">
            <BrandMark size={28} />
            <div className="flex gap-1 rounded-full border border-[var(--st-border)] bg-[var(--st-surface-2)] px-3 py-2.5">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--st-text-faint)]"
                  style={{ animationDelay: `${dot * 120}ms` }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-[var(--st-border)] p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Ask the agent something…"
            className={cn(inputClass, "max-h-28 resize-none")}
          />
          <Button variant="primary" size="icon" onClick={send} aria-label="Send">
            <CornerDownLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
