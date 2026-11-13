"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, Check, FileCheck2, MessageSquare, Video } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Avatar, Badge, Bar, Card, CountUp, Gauge } from "@/components/ui";
import { activity, stages, upcoming } from "@/lib/data";

const week = [2, 0, 3, 5, 6, 5, 2];
const days = ["S", "M", "T", "W", "T", "F", "S"];

export default function Dashboard() {
  const [items, setItems] = useState([
    { t: "Upload latest report card", d: "Nov 17", done: true },
    { t: "Sign records release form", d: "Nov 19", done: false },
    { t: "Review advocate notes on IEP v3", d: "Nov 21", done: false },
    { t: "Prepare questions for district meeting", d: "Nov 24", done: false },
  ]);
  const toggle = (i: number) => setItems((s) => s.map((x, k) => (k === i ? { ...x, done: !x.done } : x)));

  const stats = [
    { l: "Active cases", v: 3, i: FileCheck2 },
    { l: "Documents", v: 14, i: FileCheck2 },
    { l: "Unread messages", v: 2, i: MessageSquare },
    { l: "Meetings this month", v: 4, i: CalendarClock },
  ];

  return (
    <>
      <Topbar
        title="Hello, Priya Nair"
        sub={
          <>
            Today&apos;s summary: <span className="font-semibold text-brand-400">2 new</span> advisor notes on your case
          </>
        }
        action={{ label: "Find advocate", href: "/advocates" }}
      />

      <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[1fr_380px]">
        {/* hero */}
        <Card className="relative overflow-hidden p-8" hover={false}>
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="grid items-center gap-6 md:grid-cols-[1fr_320px]">
            <div>
              <Badge tone="green">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-emerald-400" /> Case on track
              </Badge>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                <CountUp to={12} /> days
                <br />
                to your IEP
                <br />
                meeting
              </h2>
              <p className="mt-5 max-w-sm text-slate-400">Finish your 3 pending action items so Dr. Kapoor can complete the strategy prep.</p>
            </div>
            <Gauge value={62} max={100} label="%" sub="case progress" />
          </div>

          <div className="mt-8 flex items-end gap-6 border-t border-edge pt-6">
            <div>
              <div className="text-4xl font-bold">
                <CountUp to={23} />
              </div>
              <div className="text-sm text-slate-400">case activities<br />this week</div>
            </div>
            <div className="flex h-16 items-end gap-2">
              {week.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <motion.div
                    className={`w-6 rounded-md ${h ? "bg-brand-400" : "bg-white/10"}`}
                    initial={{ height: 0 }}
                    animate={{ height: Math.max(4, h * 9) }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                  />
                  <span className="text-[10px] text-slate-500">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* funnel */}
        <Card delay={0.1}>
          <h3 className="text-xl font-bold">Your case journey</h3>
          <p className="text-sm text-slate-400">Case C-1042 · Aarav</p>
          <div className="mt-6 space-y-6">
            {stages.map((s, i) => {
              const val = [100, 55, 0, 0][i];
              return (
                <div key={s}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-medium">{s}</span>
                    <span className="text-lg font-bold">{val}%</span>
                  </div>
                  <Bar value={val} color={i === 0 ? "bg-emerald-400" : "bg-brand-400"} delay={0.3 + i * 0.15} />
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl border border-edge bg-ink/60 p-4 text-sm text-slate-400">
            Next up: <span className="font-semibold text-white">School District Meeting</span> after strategy prep completes.
          </div>
        </Card>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-4 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={s.l} delay={0.15 + i * 0.07} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{s.l}</span>
              <s.i size={16} className="text-brand-400" />
            </div>
            <div className="mt-2 text-4xl font-bold">
              <CountUp to={s.v} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-3">
        <Card delay={0.2}>
          <h3 className="mb-4 text-lg font-bold">Upcoming</h3>
          <div className="space-y-4">
            {upcoming.map((u, i) => (
              <motion.div key={u.t} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3">
                <Avatar src={`https://i.pravatar.cc/120?img=${u.img}`} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{u.t}</div>
                  <div className="text-xs text-slate-400">{u.who} · {u.when}</div>
                </div>
                <Video size={16} className="text-brand-400" />
              </motion.div>
            ))}
          </div>
        </Card>

        <Card delay={0.28}>
          <h3 className="mb-4 text-lg font-bold">Action items</h3>
          <div className="space-y-3">
            {items.map((it, i) => (
              <button key={it.t} onClick={() => toggle(i)} className="flex w-full items-center gap-3 rounded-2xl border border-edge bg-ink/50 p-3 text-left transition-colors hover:border-brand-500/40">
                <motion.span
                  animate={{ backgroundColor: it.done ? "#10b981" : "rgba(255,255,255,0.05)", scale: it.done ? [1, 1.25, 1] : 1 }}
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-edge"
                >
                  {it.done && <Check size={14} />}
                </motion.span>
                <span className={`flex-1 text-sm ${it.done ? "text-slate-500 line-through" : ""}`}>{it.t}</span>
                <span className="text-xs text-slate-500">{it.d}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card delay={0.36}>
          <h3 className="mb-4 text-lg font-bold">Recent activity</h3>
          <div className="relative space-y-5 border-l border-edge pl-5">
            {activity.map((a, i) => (
              <motion.div key={a.a} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="relative">
                <span className={`absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-current ${a.c}`} />
                <div className="text-sm">{a.a}</div>
                <div className="text-xs text-slate-500">{a.t}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
