"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { heroImg } from "@/lib/data";

export default function Login() {
  const [role, setRole] = useState<"parent" | "advocate">("parent");
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <div className="dotgrid grid min-h-screen bg-ink lg:grid-cols-2">
      {/* left visual */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-indigo-950/60" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 shadow-[0_0_28px_rgba(99,102,241,.6)]">
              <HeartHandshake size={22} />
            </div>
            <span className="text-xl font-bold">IEP Connect</span>
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl font-bold leading-[1.1] tracking-tight"
            >
              Every record.
              <br />
              Every deadline.
              <br />
              <span className="glow-text animate-shimmer">One advocate by your side.</span>
            </motion.h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { i: ShieldCheck, t: "Encrypted vault" },
                { i: Sparkles, t: "Verified advocates" },
                { i: Lock, t: "Private case chat" },
              ].map((c, k) => (
                <motion.div
                  key={c.t}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + k * 0.15 }}
                  className="flex animate-floaty items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur"
                  style={{ animationDelay: `${k * 0.8}s` }}
                >
                  <c.i size={15} className="text-brand-300" />
                  {c.t}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-[32px] border border-edge bg-panel/80 p-8 backdrop-blur"
        >
          <h1 className="text-3xl font-bold tracking-tight">{mode === "in" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to continue to your case dashboard.</p>

          <div className="relative mt-6 grid grid-cols-2 rounded-2xl border border-edge bg-ink p-1">
            <motion.div
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-xl bg-brand-600"
              animate={{ x: role === "parent" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
            {(["parent", "advocate"] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)} className="relative z-10 py-2.5 text-sm font-semibold capitalize">
                {r === "parent" ? "Parent / Guardian" : "Advocate"}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-edge bg-white/[0.04] py-3 text-sm font-semibold hover:border-brand-500/50"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
            </svg>
            Continue with Google
          </motion.button>

          <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
            <div className="h-px flex-1 bg-edge" /> or with email <div className="h-px flex-1 bg-edge" />
          </div>

          <div className="space-y-3">
            {mode === "up" && (
              <input placeholder="Full name" className="w-full rounded-2xl border border-edge bg-ink px-4 py-3 text-sm focus:border-brand-500" />
            )}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input placeholder="Email address" className="w-full rounded-2xl border border-edge bg-ink py-3 pl-11 pr-4 text-sm focus:border-brand-500" />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="password" placeholder="Password" className="w-full rounded-2xl border border-edge bg-ink py-3 pl-11 pr-4 text-sm focus:border-brand-500" />
            </div>
          </div>

          <Link href={role === "parent" ? "/dashboard" : "/advocate"}>
            <motion.span
              whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(99,102,241,.55)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-5 block w-full rounded-2xl bg-brand-600 py-3.5 text-center text-sm font-bold"
            >
              {mode === "in" ? "Sign in" : "Create account"} as {role}
            </motion.span>
          </Link>

          <p className="mt-5 text-center text-sm text-slate-400">
            {mode === "in" ? "New here?" : "Already registered?"}{" "}
            <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="font-semibold text-brand-400 hover:underline">
              {mode === "in" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
