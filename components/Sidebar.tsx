"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  CalendarCheck,
  FileLock2,
  FolderKanban,
  HeartHandshake,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Route,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { Bar } from "./ui";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/advocates", label: "Find Advocates", icon: Users },
  { href: "/booking", label: "Book Consultation", icon: CalendarCheck },
  { href: "/cases", label: "My Cases", icon: FolderKanban },
  { href: "/tracker", label: "Milestone Tracker", icon: Route },
  { href: "/documents", label: "Document Vault", icon: FileLock2 },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/advocate", label: "Advocate View", icon: Briefcase },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export default function Sidebar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-edge bg-side p-4 lg:flex">
        <Link href="/dashboard" className="mb-6 flex items-center gap-3 px-2 pt-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 shadow-[0_0_28px_rgba(99,102,241,.55)]">
            <HeartHandshake size={22} />
          </span>
          <span className="text-xl font-bold tracking-tight">IEP Connect</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {nav.map((item) => {
            const active = path === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium transition-colors ${
                  active ? "border border-edge bg-white/[0.06] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {active && <span className="absolute -left-4 h-6 w-1 rounded-r-full bg-brand-400" />}
                <Icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-3 rounded-2xl border border-edge bg-panel p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-semibold">Next deadline</span>
            <span className="text-sm font-semibold text-brand-400">12 days</span>
          </div>
          <Bar value={62} color="bg-emerald-400" />
          <p className="mt-2 text-xs text-slate-500">IEP meeting · Nov 25 · reminders at 7 / 3 / 1 days</p>
        </div>
      </aside>

      <div className="sticky top-0 z-30 border-b border-edge bg-side/95 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <HeartHandshake size={20} className="text-brand-400" />
            IEP Connect
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 place-items-center rounded-xl border border-edge bg-panel"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="grid grid-cols-2 gap-2 border-t border-edge p-3 sm:grid-cols-3">
            {nav.map((item) => {
              const active = path === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                    active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} className="shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </>
  );
}
