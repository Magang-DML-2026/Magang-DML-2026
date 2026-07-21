"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, LogOut, ShoppingCart, Menu, X, Bell, Settings } from "lucide-react";

type NavbarProps = {
  activeTab?: "profile" | "products" | "services" | "contact" | "none" | "kategori" | "proyek" | "tentang-kami";
  showSearch?: boolean;
  dashboardMode?: boolean;
  onToggleSidebar?: () => void;
  user?: {
    name: string;
    email: string;
    role?: string;
    companyName?: string;
  } | null;
};

export default function Navbar({
  activeTab,
  showSearch = true,
  dashboardMode = false,
  onToggleSidebar,
  user = null,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (trimmed) {
      router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/products");
    }
    setMobileSearchOpen(false);
    setMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };


  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50">
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-6 max-w-[1400px] mx-auto">
        {/* Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {dashboardMode && onToggleSidebar && (
            <button 
              onClick={onToggleSidebar}
              className="p-2 -ml-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-md transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          {user?.role === "b2b" && dashboardMode ? (
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="text-zinc-900 font-bold">Industrial Portal</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500">Dashboard Mitra B2B</span>
            </div>
          ) : (
            <Link href="/" className="text-xl font-bold tracking-tight text-black whitespace-nowrap">
              Duta Mitra Luhur
            </Link>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium ml-8">
          {user?.role === "b2b" && dashboardMode ? null : dashboardMode ? (
            <>
              <Link
                href="/dashboard/katalog"
                className={`relative group transition-all duration-300 ${activeTab === "products" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Products
                {activeTab === "products" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
              <Link
                href="/dashboard/kategori"
                className={`relative group transition-all duration-300 ${activeTab === "kategori" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Kategori
                {activeTab === "kategori" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
              <Link
                href="/dashboard/proyek"
                className={`relative group transition-all duration-300 ${activeTab === "proyek" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Proyek
                {activeTab === "proyek" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
              <Link
                href="/dashboard/tentang-kami"
                className={`relative group transition-all duration-300 ${activeTab === "tentang-kami" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Tentang Kami
                {activeTab === "tentang-kami" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`relative group transition-all duration-300 ${activeTab === "profile" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Profile
                {activeTab === "profile" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
              <Link
                href="/products"
                className={`relative group transition-all duration-300 ${activeTab === "products" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Products
                {activeTab === "products" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
              <Link
                href="/services"
                className={`relative group transition-all duration-300 ${activeTab === "services" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Services
                {activeTab === "services" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
              <Link
                href="/contact"
                className={`relative group transition-all duration-300 ${activeTab === "contact" ? "text-[#f05c35] drop-shadow-[0_0_8px_rgba(240,92,53,0.6)]" : "text-zinc-500 hover:text-black"}`}
              >
                Contact
                {activeTab === "contact" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35] shadow-[0_0_8px_rgba(240,92,53,0.8)]"></span>}
              </Link>
            </>
          )}
        </div>

        {/* Right Side: Search & Login/User */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {showSearch && (
            <div className="relative flex items-center group">
              <Search
                className="w-4 h-4 absolute left-3 text-zinc-400 cursor-pointer"
                onClick={() => handleSearch(searchQuery)}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={user?.role === "b2b" ? "Search orders, docs..." : "Search catalog..."}
                className={`pl-9 pr-4 py-2 bg-zinc-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/50 transition-all ${user?.role === "b2b" ? "w-[260px] focus:w-[300px]" : "w-[200px] focus:w-[260px]"}`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              {user?.role === "b2b" && dashboardMode ? (
                <>
                  <button className="relative p-2 text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors mr-2">
                    <Settings className="w-5 h-5" />
                  </button>
                </>
              ) : dashboardMode && (
                <Link href="/dashboard/cart" className="text-zinc-600 hover:text-black transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </Link>
              )}
              
              <Link
                href="/dashboard"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity pl-4 border-l border-zinc-200"
              >
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[13px] font-bold text-zinc-900 leading-tight">
                    {user.name}
                  </span>
                  {user?.role === "b2b" && (
                    <span className="text-[11px] text-zinc-500 leading-tight">
                      Production Manager
                    </span>
                  )}
                </div>
                {user?.role === "b2b" ? (
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Profile" className="w-9 h-9 rounded-full object-cover border border-zinc-200" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f05c35] to-[#d94a28] flex items-center justify-center text-white font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
              <form action="/api/logout" method="POST">
                <button
                  type="button"
                  onClick={async () => {
                    const { logoutAction } = await import("@/app/actions/auth");
                    await logoutAction();
                  }}
                  className="text-zinc-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-zinc-100 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-black text-white hover:bg-zinc-800 rounded px-6 py-2 h-auto text-sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto flex items-center gap-4">
          {showSearch && (
            <button
              className="text-zinc-500 hover:text-black transition-colors"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                setTimeout(() => mobileInputRef.current?.focus(), 50);
              }}
            >
              <Search className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 -mr-2">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && showSearch && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-3 flex items-center gap-3 shadow-sm">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={mobileInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search catalog..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-zinc-400 hover:text-zinc-700">
              <X className="w-4 h-4" />
            </button>
          )}
          <Button
            size="sm"
            className="bg-black text-white hover:bg-zinc-800 h-8 px-4 text-xs rounded"
            onClick={() => handleSearch(searchQuery)}
          >
            Search
          </Button>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full">
          {dashboardMode ? (
            <>
              <Link
                href="/dashboard/katalog"
                className={`font-medium ${activeTab === "products" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/dashboard/kategori"
                className={`font-medium ${activeTab === "kategori" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Kategori
              </Link>
              <Link
                href="/dashboard/proyek"
                className={`font-medium ${activeTab === "proyek" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Proyek
              </Link>
              <Link
                href="/dashboard/tentang-kami"
                className={`font-medium ${activeTab === "tentang-kami" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Tentang Kami
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`font-medium ${activeTab === "profile" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/products"
                className={`font-medium ${activeTab === "products" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/services"
                className={`font-medium ${activeTab === "services" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className={`font-medium ${activeTab === "contact" ? "text-[#f05c35]" : "text-zinc-600"}`}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </>
          )}
          <div className="pt-4 border-t border-zinc-100">
            {user ? (
              <div className="flex items-center justify-between">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f05c35] to-[#d94a28] flex items-center justify-center text-white font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-zinc-700">
                    {user.name}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    const { logoutAction } = await import("@/app/actions/auth");
                    await logoutAction();
                  }}
                  className="text-zinc-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded py-2 h-auto text-sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
