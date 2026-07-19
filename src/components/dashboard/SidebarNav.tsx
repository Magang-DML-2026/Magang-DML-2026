"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  AlertTriangle,
  Receipt,
  HelpCircle,
  Settings,
} from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Order History", href: "#", icon: History },
    { name: "Pengajuan Komplain", href: "/dashboard/complaints", icon: AlertTriangle },
    { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
    { name: "Support", href: "/dashboard/support", icon: HelpCircle },
    { name: "Setting", href: "/dashboard/profile", icon: Settings },
  ];

  return (
    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      {links.map((link) => {
        const isActive =
          link.href === "/dashboard"
            ? pathname === "/dashboard"
            : link.href !== "#" && pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#cc4224] text-white"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            <link.icon className="w-4 h-4" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
