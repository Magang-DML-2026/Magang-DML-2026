"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { LayoutDashboard, FileText, Package, ShoppingCart, Ticket, Settings, HelpCircle, LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "CMS Content", href: "#", icon: FileText },
    { name: "Products", href: "#", icon: Package },
    { name: "Orders", href: "#", icon: ShoppingCart },
    { name: "Tickets", href: "#", icon: Ticket },
    { name: "Settings", href: "#", icon: Settings },
  ];

  return (
    <aside className="w-[240px] h-screen bg-[#f8f9fa] border-r border-zinc-200 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-black tracking-tight">DML Admin</h1>
        <p className="text-xs text-zinc-500 font-medium tracking-wider mt-1">Manufacturing Portal</p>
      </div>

      <nav className="flex-1 mt-4">
        <ul className="flex flex-col gap-1 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white text-[#f05c35] shadow-sm border-l-[3px] border-[#f05c35]"
                      : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-zinc-200 mt-auto">
        <ul className="flex flex-col gap-1">
          <li>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 hover:text-black hover:bg-zinc-100 transition-colors">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </Link>
          </li>
          <li>
            <button
              onClick={() => startTransition(() => logoutAction())}
              disabled={isPending}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isPending ? "Signing out..." : "Sign Out"}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
