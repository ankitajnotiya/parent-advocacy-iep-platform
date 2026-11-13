"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, Check, ChevronRight } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Badge, Card } from "@/components/ui";
import { stages } from "@/lib/data";

type Ev = { from: string; to: string; actor: string; at: string };

export default function Tracker() {
  const [stage, setStage] = useState(1);
  const [events, setEvents] = useState<Ev[]>([
    { from: "—", to: "Initial Review", actor: "Priya Nair", at: "Oct 28, 10:12 AM" },
    { from: "Initial Review", to: "Strategy Prep", actor: "Dr. Meera Kapoor", at: "Nov 09, 03:40 PM" },
  ]);
  const [items, setItems] = useState([
    { t: "Collect last 2 years of report cards", d: "Nov 17", off: [7, 3, 1], done: true },
    { t: "Sign records release form", d: "Nov 19", off: [7, 3, 1], done: false },
    { t: "Written request for re-evaluation", d: "Nov 22", off: [3, 1], done: false },
    { t: "Finalize accommodation wish-list", d: "Nov 24", off: [7, 1], done: false },
  ]);

  const advance = () => {
    if (stage >= 3) return;
    const now = new Date().toLocaleString("en-US", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    setEvents((e) => [...e, { from: stages[stage], to: stages[stage + 1], actor: "Dr. Meera Kapoor", at: now }]);
    setStage(stage + 1);
  };

  return (
    <>
      <Topbar title="Milestone tracker" sub="Case C-1042 · Aarav · Austin ISD" />

      <div className="space-y-6 p-5 sm:p-8">
        {/* stepper */}
        <Card hover={false} className="overflow-hidden p-5 sm:p-8">
          <div className="relative grid grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-6 h-1 rounded-full bg-white/10" />
            <motion.div
              className="absolute left-[12.5%] top-6 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-brand-400"
              animate={{ width: `${(stage / 3) * 75}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            {stages.map((s, i) => (
              <div key={s} className="relative flex flex-col items-center text-center">
                <motion.div
                  animate={{ scale: i === stage ? [1, 1.12, 1] : 1 }}
                  transition={{ repeat: i === stage ? Infinity : 0, duration: 2 }}
                  className={`z-10 grid h-12 w-12 place-items-center rounded-full border-2 text-sm font-bold ${
                    i < stage ? "border-emerald-400 bg-emerald-500" : i === stage ? "border-brand-400 bg-brand-600 shadow-[0_0_28px_rgba(99,102,241,.75)]" : "border-edge bg-ink text-slate-500"
                  }`}
                >
                  {i < stage ? <Check size={20} /> : i + 1}
                </motion.div>
                <div className={`mt-3 max-w-[140px] break-words text-xs font-semibold sm:text-sm ${i <= stage ? "" : "text-slate-500"}`}>{s}</div>
                {i === stage && <Badge>Current</Badge>}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-edge bg-ink/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-400">
              {stage < 3 ? <>Next allowed move: <b className="text-white">{stages[stage + 1]}</b></> : "All stages complete — accommodations approved 🎉"}
            </span>
            <motion.button
              disabled={stage >= 3}
              whileHover={stage < 3 ? { scale: 1.05 } : undefined}
              whileTap={stage < 3 ? { scale: 0.95 } : undefined}
              onClick={advance}
              className="flex items-center justify-center gap-1 self-start whitespace-nowrap rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold disabled:opacity-40 sm:self-auto"
            >
              Advance stage <ChevronRight size={16} />
            </motion.button>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card delay={0.1}>
            <h3 className="mb-4 text-lg font-bold">Action items & reminders</h3>
            <div className="space-y-3">
              {items.map((it, i) => (
                <motion.button
                  layout
                  key={it.t}
                  onClick={() => setItems((s) => s.map((x, k) => (k === i ? { ...x, done: !x.done } : x)))}
                  className="flex w-full items-start gap-3 rounded-2xl border border-edge bg-ink/50 p-4 text-left hover:border-brand-500/40"
                >
                  <motion.span animate={{ backgroundColor: it.done ? "#10b981" : "rgba(255,255,255,.05)" }} className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-edge">
                    {it.done && <Check size={14} />}
                  </motion.span>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${it.done ? "text-slate-500 line-through" : ""}`}>{it.t}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      Due {it.d}
                      <BellRing size={12} className="text-amber-400" />
                      {it.off.map((o) => <Badge key={o} tone="amber">{o}d before</Badge>)}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>

          <Card delay={0.18}>
            <h3 className="mb-4 text-lg font-bold">Stage history <span className="text-sm font-normal text-slate-500">(audit trail)</span></h3>
            <div className="relative space-y-5 border-l border-edge pl-6">
              <AnimatePresence initial={false}>
                {[...events].reverse().map((e) => (
                  <motion.div key={e.to} initial={{ opacity: 0, x: -20, height: 0 }} animate={{ opacity: 1, x: 0, height: "auto" }} className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-brand-400 shadow-[0_0_12px_#818cf8]" />
                    <div className="text-sm font-semibold">{e.from} → {e.to}</div>
                    <div className="text-xs text-slate-500">{e.actor} · {e.at}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
