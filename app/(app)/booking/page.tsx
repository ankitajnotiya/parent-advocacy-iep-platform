"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Globe, Mic, Video } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Avatar, Badge, Card } from "@/components/ui";
import { advocates, avatar } from "@/lib/data";

const slots = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];
const taken: Record<number, string[]> = { 0: ["10:00", "14:30"], 1: ["09:00", "11:30", "16:00"], 3: ["13:00"] };

export default function Booking() {
  const adv = advocates[0];
  const days = useMemo(() => {
    const base = new Date("2026-11-16T00:00:00");
    return Array.from({ length: 10 }).map((_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }, []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [mode, setMode] = useState<"video" | "audio">("video");
  const [done, setDone] = useState(false);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <Topbar title="Book a consultation" sub="Pick a slot — double-booking is impossible by design" />

      <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[360px_1fr]">
        <Card hover={false}>
          <Avatar src={avatar(adv.img)} size={84} ring />
          <h2 className="mt-4 text-2xl font-bold">{adv.name}</h2>
          <p className="text-sm text-slate-400">{adv.district}, {adv.state}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {adv.spec.map((s) => <Badge key={s}>{s}</Badge>)}
          </div>
          <p className="mt-4 text-sm text-slate-400">{adv.bio}</p>
          <div className="mt-6 space-y-3 border-t border-edge pt-5 text-sm">
            <div className="flex items-center gap-3"><Clock size={16} className="text-brand-400" /> 60 minute session</div>
            <div className="flex items-center gap-3"><Globe size={16} className="text-brand-400" /> Times shown in {tz}</div>
            <div className="text-2xl font-bold">${adv.rate}<span className="text-sm font-normal text-slate-500"> / hour</span></div>
          </div>
        </Card>

        <Card hover={false} delay={0.1} className="relative min-h-[480px] overflow-hidden">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="pick" exit={{ opacity: 0, y: -20 }}>
                <h3 className="text-lg font-bold">Select a date</h3>
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {days.map((d, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => { setDay(i); setSlot(null); }}
                      className={`relative w-[72px] shrink-0 rounded-2xl border px-3 py-3 text-center ${day === i ? "border-brand-500 bg-brand-500/15" : "border-edge bg-ink/60"}`}
                    >
                      <div className="text-xs text-slate-400">{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className="text-2xl font-bold">{d.getDate()}</div>
                      <div className="text-xs text-slate-500">{d.toLocaleDateString("en-US", { month: "short" })}</div>
                    </motion.button>
                  ))}
                </div>

                <h3 className="mb-4 mt-8 text-lg font-bold">Available times</h3>
                <motion.div key={day} initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.05 } } }} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {slots.map((s) => {
                    const isTaken = (taken[day] ?? []).includes(s);
                    return (
                      <motion.button
                        key={s}
                        variants={{ h: { opacity: 0, y: 12 }, s: { opacity: 1, y: 0 } }}
                        disabled={isTaken}
                        whileHover={isTaken ? undefined : { scale: 1.05 }}
                        whileTap={isTaken ? undefined : { scale: 0.95 }}
                        onClick={() => setSlot(s)}
                        className={`rounded-2xl border py-3 text-sm font-semibold ${
                          isTaken ? "cursor-not-allowed border-edge text-slate-600 line-through" : slot === s ? "border-brand-500 bg-brand-600" : "border-edge bg-ink/60 hover:border-brand-500/50"
                        }`}
                      >
                        {s}
                      </motion.button>
                    );
                  })}
                </motion.div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-6">
                  <div className="flex gap-2">
                    {([["video", Video], ["audio", Mic]] as const).map(([m, Icon]) => (
                      <button key={m} onClick={() => setMode(m)} className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm capitalize ${mode === m ? "border-brand-500 bg-brand-500/15" : "border-edge"}`}>
                        <Icon size={15} /> {m}
                      </button>
                    ))}
                  </div>
                  <motion.button
                    disabled={!slot}
                    whileHover={slot ? { scale: 1.04 } : undefined}
                    whileTap={slot ? { scale: 0.96 } : undefined}
                    onClick={() => setDone(true)}
                    className="rounded-2xl bg-brand-600 px-7 py-3 text-sm font-bold disabled:opacity-40"
                  >
                    Confirm booking
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="grid h-24 w-24 place-items-center rounded-full bg-emerald-500 shadow-[0_0_60px_rgba(16,185,129,.5)]"
                >
                  <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                    <Check size={46} strokeWidth={3} />
                  </motion.span>
                </motion.div>
                <h3 className="mt-6 text-3xl font-bold">You&apos;re booked!</h3>
                <p className="mt-2 text-slate-400">
                  {days[day].toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {slot} · {mode} call
                </p>
                <p className="mt-1 text-sm text-slate-500">A confirmation email with the meeting link is on its way.</p>
                <div className="mt-8 flex gap-3">
                  <Link href="/dashboard" className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold">Go to dashboard</Link>
                  <button onClick={() => { setDone(false); setSlot(null); }} className="rounded-2xl border border-edge px-6 py-3 text-sm">Book another</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </>
  );
}
