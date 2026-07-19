import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  LayoutDashboard,
  History,
  AlertTriangle,
  Receipt,
  HelpCircle,
  Settings,
  User,
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      {/* Global Navbar */}
      <Navbar activeTab="none" user={{ name: session.userName, email: session.userEmail }} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[260px] bg-white border-r border-zinc-200 flex flex-col shrink-0 hidden md:flex">
          {/* Company Context */}
          <div className="p-6 border-b border-zinc-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 leading-tight">
                Customer Portal
              </p>
              <p className="text-xs text-zinc-500">PT Duta Mitra Luhur</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#cc4224] text-white text-sm font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-sm font-medium transition-colors"
            >
              <History className="w-4 h-4" />
              Order History
            </Link>
            
            <Link
              href="/dashboard/complaints"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-sm font-medium transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              Pengajuan Komplain
            </Link>
            
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-sm font-medium transition-colors"
            >
              <Receipt className="w-4 h-4" />
              Invoices
            </Link>
            
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-sm font-medium transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Support
            </Link>
            
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-sm font-medium transition-colors"
            >
              <Settings className="w-4 h-4" />
              Setting
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white/50">
          {children}
        </main>
      </div>
    </div>
  );
}
