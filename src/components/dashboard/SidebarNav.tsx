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
  ShoppingCart,
  ShoppingBag,
  LogOut,
  Wrench,
  ShieldCheck,
  PackageSearch
} from "lucide-react";

export default function SidebarNav({ role = "user" }: { role?: string }) {
  const pathname = usePathname();

  const links = role === "b2b" ? [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Custom Orders", href: "/dashboard/transactions", icon: PackageSearch },
    { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
    { name: "Production", href: "/dashboard/production", icon: Wrench },
    { name: "Quality", href: "/dashboard/quality", icon: ShieldCheck },
    { name: "Setting", href: "/dashboard/profile", icon: Settings },
    { name: "Support", href: "/dashboard/support", icon: HelpCircle },
  ] : [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Katalog", href: "/dashboard/katalog", icon: ShoppingBag },
    { name: "Keranjang", href: "/dashboard/cart", icon: ShoppingCart },
    { name: "Order History", href: "/dashboard/transactions", icon: History },
    { name: "Pengajuan Komplain", href: "/dashboard/complaints", icon: AlertTriangle },
    { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
    { name: "Support", href: "/dashboard/support", icon: HelpCircle },
    { name: "Setting", href: "/dashboard/profile", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full">
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

      {/* Logout Button at bottom */}
      <div className="p-4 border-t border-zinc-100">
        <form action="/api/logout" method="POST">
          <button
            type="button"
            onClick={async () => {
              const { logoutAction } = await import("@/app/actions/auth");
              await logoutAction();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </form>
      </div>
    </div>
  );
}
