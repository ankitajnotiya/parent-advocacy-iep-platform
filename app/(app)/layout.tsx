import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink lg:flex-row">
      <Sidebar />
      <main className="dotgrid min-w-0 flex-1">{children}</main>
    </div>
  );
}
