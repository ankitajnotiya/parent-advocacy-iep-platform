"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, FileText, History, Lock, UploadCloud } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Badge, Card } from "@/components/ui";
import { annotations, docs } from "@/lib/data";

export default function Documents() {
  const [sel, setSel] = useState(0);
  const [active, setActive] = useState<number | null>(1);
  const [progress, setProgress] = useState<number | null>(null);

  const upload = () => {
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 8 + Math.random() * 10;
      if (p >= 100) {
        clearInterval(t);
        setProgress(100);
        setTimeout(() => setProgress(null), 1200);
      } else setProgress(Math.round(p));
    }, 140);
  };

  const d = docs[sel];

  return (
    <>
      <Topbar title="Document vault" sub="Encrypted · versioned · every view is audit logged" />

      <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[320px_1fr_340px]">
        {/* list */}
        <div className="space-y-4">
          <motion.button
            onClick={upload}
            whileHover={{ scale: 1.02, borderColor: "rgba(129,140,248,.7)" }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full overflow-hidden rounded-[28px] border-2 border-dashed border-edge bg-panel/60 p-6 text-center"
          >
            <UploadCloud className="mx-auto mb-2 animate-floaty text-brand-400" size={30} />
            <div className="font-semibold">Upload a document</div>
            <div className="text-xs text-slate-500">IEP, 504, evaluation, correspondence</div>
            {progress !== null && (
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full bg-brand-400" animate={{ width: `${progress}%` }} />
                </div>
                <div className="mt-1 text-xs text-brand-300">{progress === 100 ? "Encrypted & saved as new version" : `Uploading securely… ${progress}%`}</div>
              </div>
            )}
          </motion.button>

          {docs.map((x, i) => (
            <motion.button
              key={x.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ x: 4 }}
              onClick={() => setSel(i)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left ${sel === i ? "border-brand-500/60 bg-brand-500/[0.08]" : "border-edge bg-panel/70"}`}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/5"><FileText size={20} className="text-brand-300" /></div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{x.name}</div>
                <div className="text-xs text-slate-500">{x.size} · {x.date}</div>
              </div>
              <Badge tone="slate">v{x.ver}</Badge>
            </motion.button>
          ))}
        </div>

        {/* viewer */}
        <Card hover={false} delay={0.1} className="min-h-[560px]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{d.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500"><Lock size={12} className="text-emerald-400" /> Signed URL · expires in 15 min</div>
            </div>
            <Badge tone="brand"><Eye size={12} /> Version {d.ver}</Badge>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 rounded-2xl bg-slate-100 p-8 text-slate-800 shadow-inner">
              <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">Individualized Education Program</div>
              <div className="mb-5 text-lg font-bold">Student: Aarav N. · Grade 4</div>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                Present levels of academic achievement indicate steady progress in reading comprehension with persistent difficulty in expressive language.
              </p>
              {annotations.map((a, i) => (
                <motion.div
                  key={a.id}
                  onClick={() => setActive(a.id)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className={`mb-3 cursor-pointer rounded-lg border-l-4 px-3 py-2.5 text-sm font-medium transition-all ${
                    active === a.id ? "scale-[1.02] bg-amber-200 shadow-md" : "bg-amber-100/70"
                  } ${a.tag === "Missing" ? "border-rose-500" : a.tag === "Strong" ? "border-emerald-500" : "border-amber-500"}`}
                >
                  <span className="mr-2 text-[10px] font-bold text-slate-500">p.{a.page}</span>
                  {a.clause}
                </motion.div>
              ))}
              <div className="mt-4 space-y-2">
                {[90, 75, 82].map((w, i) => <div key={i} className="h-2 rounded bg-slate-300" style={{ width: `${w}%` }} />)}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* annotations */}
        <div className="space-y-6">
          <Card delay={0.15} hover={false}>
            <h3 className="mb-4 text-lg font-bold">Advocate notes</h3>
            <div className="space-y-3">
              {annotations.map((a) => (
                <motion.div
                  key={a.id}
                  animate={{ scale: active === a.id ? 1.02 : 1, opacity: active === null || active === a.id ? 1 : 0.55 }}
                  onClick={() => setActive(a.id)}
                  className={`cursor-pointer rounded-2xl border p-4 ${a.color}`}
                >
                  <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide">
                    <span>{a.tag}</span><span className="opacity-70">Page {a.page}</span>
                  </div>
                  <div className="text-sm text-white/90">{a.note}</div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card delay={0.25} hover={false}>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold"><History size={16} /> Version history</h3>
            {[3, 2, 1].map((v, i) => (
              <div key={v} className="flex items-center justify-between border-b border-edge py-3 text-sm last:border-0">
                <span className={i === 0 ? "font-semibold" : "text-slate-400"}>Version {v}</span>
                <span className="text-xs text-slate-500">{["Nov 10", "Oct 30", "Oct 21"][i]}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}
