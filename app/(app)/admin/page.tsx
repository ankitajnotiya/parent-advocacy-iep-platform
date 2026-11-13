"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, X } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Avatar, Badge, Card, CountUp } from "@/components/ui";
import { avatar } from "@/lib/data";

const pending0 = [
  { id: 1, n: "Priya Menon", c: "BCBA · 8 yrs", st: "Texas", img: 25 },
  { id: 2, n: "Daniel Okafor", c: "Special Ed Law Cert.", st: "New York", img: 33 },
  { id: 3, n: "Elena Petrova", c: "School Psychologist", st: "California", img: 44 },
];

const months = [
  { m: "Jun", v: 34 }, { m: "Jul", v: 52 }, { m: "Aug", v: 71 }, { m: "Sep", v: 96 }, { m: "Oct", v: 128 }, { m: "Nov", v: 154 },
];

const audit = [
  { u: "Priya Nair", a: "VIEWED", o: "document #1 (IEP v3)", ip: "103.21.4.18", t: "11:02" },
  { u: "Dr. Kapoor", a: "ANNOTATED", o: "document_version #3", ip: "73.18.201.7", t: "10:48" },
  { u: "Admin", a: "VERIFIED", o: "advocate #41", ip: "10.0.0.5", t: "10:31" },
  { u: "Priya Nair", a: "DOWNLOADED", o: "document #2 (504)", ip: "103.21.4.18", t: "09:57" },
];

export default function Admin() {
  const [pending, setPending] = useState(pending0);
  const [log, setLog] = useState<string[]>([]);
  const decide = (id: number, ok: boolean, n: string) => {
    setPending((p) => p.filter((x) => x.id !== id));
    setLog((l) => [`${ok ? "Verified" : "Rejected"} ${n}`, ...l]);
  };
  const max = Math.max(...months.map((m) => m.v));

  return (
    <>
      <Topbar title="Admin console" sub="Advocate verification, disputes and platform analytics" />

      <div className="space-y-6 p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { l: "Total families", v: 1284 },
            { l: "Verified advocates", v: 96 },
            { l: "Consultations / mo", v: 412 },
            { l: "Open disputes", v: 3 },
          ].map((s, i) => (
            <Card key={s.l} delay={i * 0.07} className="p-5">
              <div className="text-sm text-slate-400">{s.l}</div>
              <div className="mt-2 text-4xl font-bold"><CountUp to={s.v} duration={1.6} /></div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card hover={false} delay={0.1}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold"><ShieldCheck size={17} className="text-brand-400" /> Pending verification</h3>
              <Badge tone="amber">{pending.length} waiting</Badge>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {pending.map((p) => (
                  <motion.div
                    layout
                    key={p.id}
                    exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0 }}
                    className="flex items-center gap-3 rounded-2xl border border-edge bg-ink/50 p-4"
                  >
                    <Avatar src={avatar(p.img)} size={46} />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">{p.n}</div>
                      <div className="text-xs text-slate-500">{p.c} · {p.st}</div>
                    </div>
                    <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.85 }} onClick={() => decide(p.id, true, p.n)} className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300"><Check size={18} /></motion.button>
                    <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.85 }} onClick={() => decide(p.id, false, p.n)} className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/20 text-rose-300"><X size={18} /></motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {pending.length === 0 && <div className="py-8 text-center text-sm text-slate-500">All caught up 🎉</div>}
              {log.map((l) => <motion.div key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400">✓ {l}</motion.div>)}
            </div>
          </Card>

          <Card hover={false} delay={0.18}>
            <h3 className="mb-1 text-lg font-bold">New families per month</h3>
            <p className="mb-6 text-sm text-slate-400">Platform growth, last 6 months</p>
            <div className="flex h-52 items-end gap-4">
              {months.map((m, i) => (
                <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-brand-300">{m.v}</span>
                  <motion.div
                    className="w-full rounded-t-xl bg-gradient-to-t from-brand-600 to-brand-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.v / max) * 150}px` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="text-xs text-slate-500">{m.m}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card hover={false} delay={0.25}>
          <h3 className="mb-4 text-lg font-bold">Audit log</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr><th className="pb-3">User</th><th className="pb-3">Action</th><th className="pb-3">Object</th><th className="pb-3">IP</th><th className="pb-3">Time</th></tr>
              </thead>
              <tbody>
                {audit.map((r, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }} className="border-t border-edge">
                    <td className="py-3 font-medium">{r.u}</td>
                    <td><Badge tone="slate">{r.a}</Badge></td>
                    <td className="text-slate-400">{r.o}</td>
                    <td className="text-slate-500">{r.ip}</td>
                    <td className="text-slate-500">{r.t}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
