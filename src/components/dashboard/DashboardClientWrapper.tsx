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
        {/* Fixed Toggle Button (Alternative if not in Navbar) - We'll just put it floating here for ease of access */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-4 z-40 p-2 bg-white border border-zinc-200 rounded-r-md shadow-sm text-zinc-600 hover:text-black hover:bg-zinc-50 transition-all ${sidebarOpen ? 'left-[260px]' : 'left-0'}`}
          title="Toggle Sidebar"
        >
          {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
        </button>

        {/* Sidebar */}
        <aside 
          className={`w-[260px] bg-white border-r border-zinc-200 shrink-0 transition-all duration-300 flex flex-col ${sidebarOpen ? 'ml-0' : '-ml-[260px]'}`}
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
