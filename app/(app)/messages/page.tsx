"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Paperclip, Send } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Avatar } from "@/components/ui";
import { avatar, chats } from "@/lib/data";

type Msg = { me: boolean; text: string; time: string };

const seed: Msg[] = [
  { me: false, text: "Hi Priya! I've reviewed Aarav's IEP v3 and added notes on pages 3, 4 and 6.", time: "10:02" },
  { me: true, text: "Thank you! The speech therapy frequency worried me.", time: "10:05" },
  { me: false, text: "Good catch — 30 min/month is too low given the evaluation. We'll request weekly sessions.", time: "10:07" },
  { me: false, text: "Please upload the latest progress report before Friday so I can attach it to our request.", time: "10:08" },
];

export default function Messages() {
  const [sel, setSel] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = () => {
    if (!text.trim()) return;
    const t = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    setMsgs((m) => [...m, { me: true, text, time: t }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { me: false, text: "Got it — I'll update the case notes and follow up shortly. ✅", time: t }]);
    }, 1800);
  };

  const c = chats[sel];

  return (
    <>
      <Topbar title="Secure messages" sub="One encrypted thread per case" />

      <div className="grid gap-4 p-4 sm:gap-6 sm:p-8 lg:h-[calc(100vh-97px)] lg:min-h-[560px] lg:grid-cols-[320px_1fr]">
        <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-0">
          {chats.map((x, i) => (
            <motion.button
              key={x.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSel(i)}
              className={`flex min-w-[240px] flex-1 items-center gap-3 rounded-2xl border p-3 text-left sm:p-4 lg:min-w-0 lg:flex-none ${sel === i ? "border-brand-500/60 bg-brand-500/[0.08]" : "border-edge bg-panel/70"}`}
            >
              <Avatar src={avatar(x.img)} size={46} />
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{x.name}</div>
                <div className="text-xs text-brand-300">{x.case}</div>
                <div className="truncate text-xs text-slate-500">{x.last}</div>
              </div>
              {x.unread > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-600 text-[11px] font-bold">{x.unread}</span>}
            </motion.button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex h-[60vh] min-h-[380px] flex-col rounded-[28px] border border-edge bg-panel/80 sm:h-[65vh] lg:h-auto lg:min-h-0">
          <div className="flex items-center gap-3 border-b border-edge p-4 sm:p-5">
            <Avatar src={avatar(c.img)} size={44} ring />
            <div className="flex-1">
              <div className="font-bold">{c.name}</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-emerald-400" /> Online · {c.case}</div>
            </div>
            <div className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex"><Lock size={12} /> End-to-end encrypted</div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            <AnimatePresence initial={false}>
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`flex ${m.me ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${m.me ? "rounded-br-md bg-brand-600" : "rounded-bl-md border border-edge bg-ink/70"}`}>
                    {m.text}
                    <div className="mt-1 text-right text-[10px] opacity-60">{m.time}</div>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-edge bg-ink/70 px-4 py-3.5">
                    {[0, 1, 2].map((k) => (
                      <motion.span key={k} className="h-2 w-2 rounded-full bg-slate-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: k * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={end} />
          </div>

          <div className="flex items-center gap-3 border-t border-edge p-4">
            <button className="grid h-11 w-11 place-items-center rounded-xl border border-edge text-slate-400 hover:text-white"><Paperclip size={17} /></button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 rounded-2xl border border-edge bg-ink px-4 py-3 text-sm focus:border-brand-500"
            />
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88, rotate: -12 }} onClick={send} className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600">
              <Send size={17} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
