"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Plus, X } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Avatar, Badge, Bar, Card } from "@/components/ui";
import { advocates, avatar, initialCases, stages, type Case } from "@/lib/data";

export default function Cases() {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState(false);
  const [child, setChild] = useState("");
  const [district, setDistrict] = useState("Austin ISD");
  const [advId, setAdvId] = useState(advocates[0].id);

  const add = () => {
    if (!child.trim()) return;
    const a = advocates.find((x) => x.id === advId)!;
    setCases((c) => [
      { id: `C-${1060 + c.length}`, child, district, stage: 0, advocate: a.name, adv: a.img, next: "Initial review pending", progress: 5 },
      ...c,
    ]);
    setSel(0);
    setChild("");
    setOpen(false);
  };

  const c = cases[sel] ?? cases[0];

  return (
    <>
      <Topbar title="My cases" sub={`${cases.length} cases · one secure place for every record`} />

      <div className="p-5 sm:p-8">
        <div className="mb-6 flex justify-end">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-bold">
            <Plus size={16} /> New case
          </motion.button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {cases.map((x, i) => (
                <motion.button
                  layout
                  key={x.id}
                  initial={{ opacity: 0, y: -20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  onClick={() => setSel(i)}
                  whileHover={{ y: -3 }}
                  className={`block w-full rounded-[28px] border p-6 text-left ${sel === i ? "border-brand-500/60 bg-brand-500/[0.07]" : "border-edge bg-panel/80"}`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar src={avatar(x.adv)} size={52} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">{x.child}</h3>
                        <span className="text-xs text-slate-500">{x.id}</span>
                      </div>
                      <div className="text-sm text-slate-400">{x.district} · Advocate: {x.advocate}</div>
                    </div>
                    <Badge tone={x.stage === 3 ? "green" : "brand"}>{stages[x.stage]}</Badge>
                  </div>
                  <div className="mt-5">
                    <Bar value={x.progress} color={x.stage === 3 ? "bg-emerald-400" : "bg-brand-400"} />
                    <div className="mt-2 flex justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><CalendarClock size={12} /> {x.next}</span>
                      <span>{x.progress}%</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <Card hover={false} delay={0.15} className="h-fit xl:sticky xl:top-6">
            <AnimatePresence mode="wait">
              <motion.div key={c.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div className="text-xs text-slate-500">{c.id}</div>
                <h3 className="text-2xl font-bold">{c.child}&apos;s case</h3>
                <p className="text-sm text-slate-400">{c.district}</p>

                <div className="mt-6 space-y-4">
                  {stages.map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.08, type: "spring" }}
                        className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                          i < c.stage ? "bg-emerald-500" : i === c.stage ? "bg-brand-600 shadow-[0_0_20px_rgba(99,102,241,.7)]" : "border border-edge text-slate-500"
                        }`}
                      >
                        {i < c.stage ? "✓" : i + 1}
                      </motion.span>
                      <span className={i <= c.stage ? "font-semibold" : "text-slate-500"}>{s}</span>
                    </div>
                  ))}
                </div>

                <Link href="/tracker">
                  <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8 block rounded-2xl bg-brand-600 py-3 text-center text-sm font-bold">
                    Open milestone tracker
                  </motion.span>
                </Link>
                <Link href="/documents" className="mt-3 block rounded-2xl border border-edge py-3 text-center text-sm hover:border-brand-500/50">
                  View documents
                </Link>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-[28px] border border-edge bg-panel p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">Create a new case</h3>
                <button onClick={() => setOpen(false)}><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <input value={child} onChange={(e) => setChild(e.target.value)} placeholder="Child's first name" className="w-full rounded-2xl border border-edge bg-ink px-4 py-3 text-sm focus:border-brand-500" />
                <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="School district" className="w-full rounded-2xl border border-edge bg-ink px-4 py-3 text-sm focus:border-brand-500" />
                <select value={advId} onChange={(e) => setAdvId(Number(e.target.value))} className="w-full rounded-2xl border border-edge bg-ink px-4 py-3 text-sm">
                  {advocates.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <motion.button whileTap={{ scale: 0.96 }} onClick={add} className="mt-5 w-full rounded-2xl bg-brand-600 py-3 text-sm font-bold">Create case</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
