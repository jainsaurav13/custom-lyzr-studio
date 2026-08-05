import { useMemo, useState } from "react";

/**
 * Hand-rolled SVG charts. Single series everywhere — identity is never carried
 * by colour alone, marks stay thin, the grid stays recessive, and every chart
 * ships a hover layer.
 */

export function Sparkline({
  points,
  height = 32,
  invert = false,
}: {
  points: number[];
  height?: number;
  invert?: boolean;
}) {
  const width = 96;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const path = points
    .map((value, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke = invert ? "var(--st-accent)" : "var(--st-primary)";
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className="overflow-visible"
    >
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={width}
        cy={height - ((points[points.length - 1] - min) / span) * (height - 4) - 2}
        r={2.5}
        fill={stroke}
      />
    </svg>
  );
}

export function UsageAreaChart({
  data,
  label = "Conversations",
}: {
  data: Array<{ day: string; value: number }>;
  label?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 720;
  const height = 220;
  const pad = { top: 16, right: 12, bottom: 26, left: 40 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const max = Math.ceil(Math.max(...data.map((d) => d.value)) / 200) * 200;
  const x = (i: number) => pad.left + (i / (data.length - 1)) * innerW;
  const y = (v: number) => pad.top + innerH - (v / max) * innerH;

  const { line, area } = useMemo(() => {
    const l = data
      .map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(d.value).toFixed(1)}`)
      .join(" ");
    const a = `${l} L${x(data.length - 1).toFixed(1)} ${pad.top + innerH} L${pad.left} ${pad.top + innerH} Z`;
    return { line: l, area: a };
  }, [data, max]);

  const ticks = [0, max / 2, max];
  const active = hover === null ? null : data[hover];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label={`${label} per day over the last 30 days`}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const px = ((event.clientX - rect.left) / rect.width) * width;
          const idx = Math.round(((px - pad.left) / innerW) * (data.length - 1));
          setHover(Math.max(0, Math.min(data.length - 1, idx)));
        }}
      >
        <defs>
          <linearGradient id="st-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--st-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--st-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--st-grid-line)"
              strokeWidth={1}
            />
            <text
              x={pad.left - 8}
              y={y(tick) + 4}
              textAnchor="end"
              fontSize={10}
              fill="var(--st-text-faint)"
            >
              {tick >= 1000 ? `${tick / 1000}k` : tick}
            </text>
          </g>
        ))}

        <path d={area} fill="url(#st-area)" />
        <path
          d={line}
          fill="none"
          stroke="var(--st-primary)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {[0, 7, 14, 21, 29].map((i) => (
          <text
            key={i}
            x={x(i)}
            y={height - 8}
            textAnchor="middle"
            fontSize={10}
            fill="var(--st-text-faint)"
          >
            {i === 29 ? "today" : `d${i + 1}`}
          </text>
        ))}

        {hover !== null ? (
          <g>
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={pad.top}
              y2={pad.top + innerH}
              stroke="var(--st-border-strong)"
              strokeWidth={1}
            />
            <circle
              cx={x(hover)}
              cy={y(data[hover].value)}
              r={4.5}
              fill="var(--st-primary)"
              stroke="var(--st-surface)"
              strokeWidth={2}
            />
          </g>
        ) : null}
      </svg>

      {active ? (
        <div
          className="pointer-events-none absolute top-2 rounded-[var(--st-radius-sm)] border border-[var(--st-border)] bg-[var(--st-surface-2)] px-2.5 py-1.5 text-xs shadow-[var(--st-shadow)]"
          style={{ left: `${(x(hover!) / width) * 100}%`, transform: "translateX(-50%)" }}
        >
          <span className="text-[var(--st-text-faint)]">Day {active.day} · </span>
          <span className="font-semibold text-[var(--st-text)]">
            {active.value.toLocaleString()}
          </span>
          <span className="text-[var(--st-text-muted)]"> {label.toLowerCase()}</span>
        </div>
      ) : null}
    </div>
  );
}

export function BarList({
  data,
  unit = "runs",
}: {
  data: Array<{ name: string; value: number }>;
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ul className="space-y-3">
      {data.map((row) => (
        <li key={row.name} className="group">
          <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate text-[var(--st-text)]">{row.name}</span>
            <span className="tabular-nums text-[var(--st-text-muted)]">
              {row.value.toLocaleString()} {unit}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--st-raised)]">
            <div
              className="h-2 rounded-full bg-[var(--st-primary)] transition-[width] duration-500 group-hover:opacity-90"
              style={{ width: `${(row.value / max) * 100}%` }}
              title={`${row.name}: ${row.value.toLocaleString()} ${unit}`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DonutMeter({
  value,
  caption,
  sublabel,
}: {
  value: number;
  caption: string;
  sublabel?: string;
}) {
  const size = 132;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, value)) / 100) * circumference;
  return (
    <div className="flex items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${caption}: ${value}%`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--st-raised)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--st-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={26}
          fontWeight={600}
          fill="var(--st-text)"
        >
          {value}%
        </text>
      </svg>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--st-text)]">{caption}</p>
        {sublabel ? <p className="mt-1 text-xs text-[var(--st-text-muted)]">{sublabel}</p> : null}
      </div>
    </div>
  );
}
