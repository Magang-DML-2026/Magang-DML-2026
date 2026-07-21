"use client";

import { Search, Bell } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  user: { name: string; email: string } | null;
};

export default function AdminHeader({ title, user }: Props) {
  return (
    <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 w-full">
      <h2 className="text-xl font-bold text-black">{title}</h2>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search orders, clients..."
            className="pl-9 pr-4 py-2 w-[300px] bg-zinc-100 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 transition-shadow"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-zinc-500 hover:text-black transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#f05c35] rounded-full border border-white"></span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden flex items-center justify-center">
              {/* Fallback avatar */}
              <span className="text-xs font-bold text-zinc-500">{user?.name?.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium text-zinc-700">{user?.name || "Admin"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
