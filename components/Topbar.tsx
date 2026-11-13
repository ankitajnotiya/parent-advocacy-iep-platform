import type { ReactNode } from "react";
import { Bell, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar } from "./ui";

export default function Topbar({ title, sub, action }: { title: string; sub?: ReactNode; action?: { label: string; href: string } }) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-edge px-4 py-4 sm:gap-4 sm:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{title}</h1>
        {sub && <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">{sub}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button type="button" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-2xl border border-edge bg-panel hover:border-brand-500/50 sm:h-11 sm:w-11">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 animate-pulseDot rounded-full bg-rose-500" />
        </button>
        {action && (
          <Link href={action.href} className="hidden rounded-2xl border border-edge bg-panel px-5 py-3 text-sm font-semibold hover:border-brand-500/50 sm:inline-block">
            {action.label}
          </Link>
        )}
        <Avatar src="https://i.pravatar.cc/160?img=5" size={40} ring />
        <Link
          href="/login"
          aria-label="Log out"
          title="Log out"
          className="grid h-10 w-10 place-items-center rounded-2xl border border-edge bg-panel text-slate-300 hover:border-rose-500/50 hover:text-rose-300 sm:h-11 sm:w-11"
        >
          <LogOut size={18} />
        </Link>
      </div>
    </header>
  );
}
