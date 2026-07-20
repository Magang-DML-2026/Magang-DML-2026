"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import SidebarNav from "@/components/dashboard/SidebarNav";
import { User, PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function DashboardClientWrapper({ 
  children, 
  user 
}: { 
  children: React.ReactNode;
  user: { name: string; email: string; } | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  let activeTab: "profile" | "products" | "services" | "contact" | "none" | "kategori" | "proyek" | "tentang-kami" = "none";
  if (pathname.includes('/katalog')) activeTab = 'products';
  else if (pathname.includes('/tentang-kami')) activeTab = 'tentang-kami';
  else if (pathname.includes('/kategori')) activeTab = 'kategori';
  else if (pathname.includes('/proyek')) activeTab = 'proyek';

  return (
    <div className="h-screen overflow-hidden bg-[#F9FAFB] font-sans flex flex-col">
      {/* Global Navbar */}
      <Navbar 
        activeTab={activeTab} 
        dashboardMode={true} 
        user={user} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">


        {/* Sidebar */}
        <aside 
          className={`absolute top-0 bottom-0 left-0 z-30 w-[260px] bg-white border-r border-zinc-200 transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
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
          <SidebarNav />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white/50 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
