import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  return <div className={`rounded-[28px] border border-edge bg-panel/80 p-6 backdrop-blur ${className}`}>{children}</div>;
}

export function CountUp({ to, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  return (
    <>
      {to}
      {suffix}
    </>
  );
}

export function Badge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "green" | "amber" | "rose" | "slate" }) {
  const tones = {
    brand: "bg-brand-500/15 text-brand-300 border-brand-500/30",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    slate: "bg-white/5 text-slate-300 border-white/10",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function Avatar({ src, size = 40, ring = false }: { src: string; size?: number; ring?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size }}
      className={`rounded-full bg-edge object-cover ${ring ? "ring-2 ring-brand-500/60 ring-offset-2 ring-offset-panel" : ""}`}
    />
  );
}

export function Bar({ value, color = "bg-brand-400" }: { value: number; color?: string; delay?: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function Gauge({ value, max, label, sub }: { value: number; max: number; label?: string; sub: string }) {
  const N = 72;
  const cx = 150;
  const cy = 150;
  const r1 = 98;
  const r2 = 128;
  const filled = Math.round((value / max) * N);
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <svg viewBox="0 0 300 270" className="w-full">
        <defs>
          <filter id="g">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: N }).map((_, i) => {
          const a = ((-210 + (i / (N - 1)) * 240) * Math.PI) / 180;
          const on = i < filled;
          return (
            <line
              key={i}
              x1={cx + r1 * Math.cos(a)}
              y1={cy + r1 * Math.sin(a)}
              x2={cx + r2 * Math.cos(a)}
              y2={cy + r2 * Math.sin(a)}
              strokeWidth={4}
              strokeLinecap="round"
              stroke={on ? "#818cf8" : "#222a3d"}
              filter={on ? "url(#g)" : undefined}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
        <div className="text-6xl font-bold tracking-tight">
          <CountUp to={value} />
          {label}
        </div>
        <div className="mt-1 text-sm text-slate-400">{sub}</div>
      </div>
    </div>
  );
}
