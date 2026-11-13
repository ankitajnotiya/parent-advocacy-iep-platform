"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, MapPin, Search, Star } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Avatar, Badge, ease } from "@/components/ui";
import { advocates, availOpts, avatar, specs, states } from "@/lib/data";

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-2xl border border-edge bg-panel px-4 py-3 text-sm hover:border-brand-500/50 focus:border-brand-500"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export default function Advocates() {
  const [q, setQ] = useState("");
  const [state, setState] = useState(states[0]);
  const [spec, setSpec] = useState(specs[0]);
  const [avail, setAvail] = useState(availOpts[0]);

  const list = useMemo(
    () =>
      advocates.filter(
        (a) =>
          (state === states[0] || a.state === state) &&
          (spec === specs[0] || a.spec.includes(spec)) &&
          (avail === availOpts[0] || a.avail === avail) &&
          (!q || (a.name + a.district).toLowerCase().includes(q.toLowerCase())),
      ),
    [q, state, spec, avail],
  );

  return (
    <>
      <Topbar title="Find an advocate" sub="Filter by state, district, specialization and availability" />

      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or school district…"
              className="w-full rounded-2xl border border-edge bg-panel py-3 pl-11 pr-4 text-sm focus:border-brand-500"
            />
          </div>
          <Select value={state} onChange={setState} options={states} />
          <Select value={spec} onChange={setSpec} options={specs} />
          <Select value={avail} onChange={setAvail} options={availOpts} />
        </div>

        <motion.p layout className="mt-5 text-sm text-slate-400">
          {list.length} advocate{list.length !== 1 && "s"} found
        </motion.p>

        <motion.div layout className="mt-4 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((a, i) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                whileHover={{ y: -5, borderColor: "rgba(129,140,248,.4)" }}
                className="group rounded-[28px] border border-edge bg-panel/80 p-6"
              >
                <div className="flex items-start gap-4">
                  <Avatar src={avatar(a.img)} size={64} ring />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-lg font-bold">{a.name}</h3>
                      <BadgeCheck size={17} className="shrink-0 text-brand-400" />
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin size={12} /> {a.district}, {a.state}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <b>{a.rating}</b>
                      <span className="text-slate-500">· {a.cases} cases</span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-400">{a.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {a.spec.map((s) => (
                    <Badge key={s} tone="slate">{s}</Badge>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-edge pt-4">
                  <div>
                    <div className="text-xl font-bold">${a.rate}<span className="text-xs font-normal text-slate-500"> / hr</span></div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className={`h-1.5 w-1.5 rounded-full ${a.avail === "Today" ? "animate-pulseDot bg-emerald-400" : "bg-amber-400"}`} />
                      Available {a.avail.toLowerCase()}
                    </div>
                  </div>
                  <Link href="/booking">
                    <motion.span whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} className="inline-block rounded-2xl bg-brand-600 px-5 py-2.5 text-sm font-semibold">
                      Book call
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 text-center text-slate-500">
            No advocates match these filters. Try widening your search.
          </motion.div>
        )}
      </div>
    </>
  );
}
