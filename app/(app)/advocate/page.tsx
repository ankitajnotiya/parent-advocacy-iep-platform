"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Video } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Avatar, Badge, Bar, Card, CountUp } from "@/components/ui";
import { avatar, stages } from "@/lib/data";

const caseload = [
  { c: "Aarav N.", id: "C-1042", d: "Austin ISD", s: 1, due: "Nov 21", img: 5, p: 48 },
  { c: "Maya R.", id: "C-1019", d: "Austin ISD", s: 2, due: "Nov 25", img: 9, p: 74 },
  { c: "Ethan P.", id: "C-1063", d: "Round Rock ISD", s: 0, due: "Nov 19", img: 11, p: 15 },
  { c: "Zoya K.", id: "C-0997", d: "Pflugerville ISD", s: 3, due: "—", img: 20, p: 100 },
  { c: "Leo T.", id: "C-1071", d: "Austin ISD", s: 1, due: "Nov 30", img: 14, p: 40 },
];

const schedule = [
  { t: "09:30", w: "Maya R. · Strategy session", k: "video" },
  { t: "11:00", w: "Ethan P. · Intro call", k: "video" },
  { t: "14:30", w: "Aarav N. · IEP review", k: "video" },
  { t: "16:30", w: "Review Zoya's final letter", k: "task" },
];

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["9", "11", "1", "3", "5"];

export default function Advocate() {
  const [avail, setAvail] = useState<boolean[][]>(
    dayNames.map((_, d) => hours.map((_, h) => (d + h) % 3 !== 0)),
  );
  const toggle = (d: number, h: number) => setAvail((a) => a.map((r, i) => (i === d ? r.map((v, j) => (j === h ? !v : v)) : r)));

  const stats = [
    { l: "Active cases", v: 18 },
    { l: "Meetings today", v: 3 },
    { l: "Pending reviews", v: 5 },
    { l: "Deadlines this week", v: 4 },
  ];

  return (
    <>
      <Topbar title="Good morning, Dr. Kapoor" sub="3 consultations today · 4 deadlines this week" />

      <div className="space-y-6 p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Card key={s.l} delay={i * 0.07} className="p-5">
              <div className="text-sm text-slate-400">{s.l}</div>
              <div className="mt-2 text-5xl font-bold"><CountUp to={s.v} /></div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <Card hover={false} delay={0.1}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold"><Users size={17} className="text-brand-400" /> Active caseload</h3>
              <Badge>Sorted by deadline</Badge>
            </div>
            <div className="space-y-2">
              {caseload.map((x, i) => (
                <motion.div
                  key={x.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,.04)" }}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-transparent p-3 hover:border-edge sm:grid-cols-[auto_1.2fr_1fr_90px_80px]"
                >
                  <Avatar src={avatar(x.img + 20)} size={42} />
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{x.c}</div>
                    <div className="truncate text-xs text-slate-500">{x.id} · {x.d}</div>
                  </div>
                  <div className="hidden sm:block"><Bar value={x.p} color={x.s === 3 ? "bg-emerald-400" : "bg-brand-400"} delay={0.4 + i * 0.07} /></div>
                  <div className="hidden sm:block"><Badge tone={x.s === 3 ? "green" : "brand"}>{stages[x.s].split(" ")[0]}</Badge></div>
                  <div className="text-right text-xs text-slate-400">Due {x.due}</div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card hover={false} delay={0.2}>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold"><Clock size={17} className="text-brand-400" /> Today</h3>
            <div className="relative space-y-5 border-l border-edge pl-5">
              {schedule.map((s, i) => (
                <motion.div key={s.t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-400" />
                  <div className="text-xs font-bold text-brand-300">{s.t}</div>
                  <div className="flex items-center gap-2 text-sm">{s.k === "video" && <Video size={14} className="text-slate-500" />}{s.w}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        <Card hover={false} delay={0.3}>
          <h3 className="mb-1 text-lg font-bold">Manage availability</h3>
          <p className="mb-5 text-sm text-slate-400">Click a block to open or close it for parent booking.</p>
          <div className="grid grid-cols-[50px_repeat(5,1fr)] gap-2">
            <div />
            {dayNames.map((d) => <div key={d} className="text-center text-xs font-semibold text-slate-400">{d}</div>)}
            {hours.map((h, hi) => (
              <div key={h} className="contents">
                <div className="grid place-items-center text-xs text-slate-500">{h}:00</div>
                {dayNames.map((_, di) => (
                  <motion.button
                    key={di}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggle(di, hi)}
                    animate={{ backgroundColor: avail[di][hi] ? "rgba(99,102,241,.55)" : "rgba(255,255,255,.04)" }}
                    className="h-11 rounded-xl border border-edge"
                  />
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
