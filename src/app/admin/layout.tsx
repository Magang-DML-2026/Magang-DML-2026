"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  ShoppingCart, 
  Ticket, 
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Eye,
  ListRestart,
  ClipboardList,
  Activity
} from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPreviewMode = pathname === '/admin/cms/preview';

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "CMS Content", href: "/admin/cms", icon: FileText },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Work Orders", href: "/admin/work-orders", icon: ClipboardList },
    { name: "Tickets", href: "/admin/tickets", icon: Ticket },
    { name: "Activity Logs", href: "/admin/activity-logs", icon: Activity },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Preview Mode Top Bar */}
      {isPreviewMode && (
        <div className="fixed top-0 left-0 right-0 h-12 bg-[#1e2329] z-[100] flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white font-bold tracking-widest text-[13px]">
              <Eye className="w-5 h-5 text-[#f05c35]" />
              PREVIEW MODE
            </div>
            <span className="px-2 py-0.5 bg-transparent border border-gray-600 text-gray-400 text-[10px] font-bold rounded uppercase tracking-wider">
              Live Staging
            </span>
          </div>
          <Link href="/admin/cms" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors">
            <ListRestart className="w-3.5 h-3.5" />
            Return to Editor
          </Link>
        </div>
      )}

      <div className={`flex min-h-screen w-full bg-[#fcfcfd] ${isPreviewMode ? 'pt-12' : ''}`}>
        {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#f4f5f6] border-r border-gray-200 flex flex-col hidden md:flex">
        {/* Logo Area */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">DML Admin</h1>
          <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">Manufacturing Portal</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 mt-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-3 px-6 py-2.5 text-sm ${
                  isActive 
                    ? "font-bold text-[#b73719] bg-white border-l-[3px] border-[#b73719] shadow-sm relative" 
                    : "font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 pl-7 border-l-[3px] border-transparent"
                }`}
              >
                <Icon 
                  className={`w-[18px] h-[18px] ${isActive ? "text-[#e06822]" : "text-gray-500"}`} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="py-4 border-t border-gray-300 space-y-1 mt-auto">
          <Link href="#" className="flex items-center gap-3 pl-7 pr-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200/50">
            <HelpCircle className="w-[18px] h-[18px] text-gray-500" strokeWidth={2} />
            Help Center
          </Link>
          <Link href="#" className="flex items-center gap-3 pl-7 pr-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200/50">
            <LogOut className="w-[18px] h-[18px] text-gray-500" strokeWidth={2} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-[72px] border-b border-gray-200 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {pathname !== '/admin' && (
                <Link href="/admin" className="p-1 -ml-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </Link>
              )}
              <h2 className="text-[22px] font-bold text-gray-900 tracking-tight flex items-center">
                Admin Portal
                {pathname === '/admin/cms' && (
                  <>
                    <span className="text-gray-300 font-light mx-4 text-2xl mb-1">|</span>
                    <span className="text-sm font-bold text-gray-500 mt-1">CMS Content Management</span>
                  </>
                )}
              </h2>
            </div>
            
            <div className="relative hidden lg:block ml-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
              <input 
                type="text" 
                placeholder={pathname === '/admin/cms' ? "Search resources..." : "Search orders, invoices..."}
                className="pl-10 pr-4 py-2 bg-[#f4f5f6] border border-gray-200 rounded-full text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 w-[300px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-[8px] h-[8px] bg-[#d93f21] rounded-full border border-white"></span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden md:block">DML Admin</span>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" strokeWidth={2.5} />
            </div>
          </div>
        </header>

        {/* Page Content Wrapper */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
    </>
  )
}
