"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Navbar({ activeTab = "profile", showSearch = true }: { activeTab?: "profile" | "products" | "services" | "contact", showSearch?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50">
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-6 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-black whitespace-nowrap">
          Duta Mitra Luhur
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium ml-8">
          <Link 
            href="/" 
            className={`relative group transition-colors ${activeTab === "profile" ? "text-[#f05c35]" : "text-zinc-500 hover:text-black"}`}
          >
            Profile
            {activeTab === "profile" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35]"></span>}
          </Link>
          <Link 
            href="/products" 
            className={`relative group transition-colors ${activeTab === "products" ? "text-[#f05c35]" : "text-zinc-500 hover:text-black"}`}
          >
            Products
            {activeTab === "products" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35]"></span>}
          </Link>
          <Link 
            href="/services" 
            className={`relative group transition-colors ${activeTab === "services" ? "text-[#f05c35]" : "text-zinc-500 hover:text-black"}`}
          >
            Services
            {activeTab === "services" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35]"></span>}
          </Link>
          <Link 
            href="/contact" 
            className={`relative group transition-colors ${activeTab === "contact" ? "text-[#f05c35]" : "text-zinc-500 hover:text-black"}`}
          >
            Contact
            {activeTab === "contact" && <span className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-[#f05c35]"></span>}
          </Link>
        </div>

        {/* Right Side: Search & Login */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {showSearch && (
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search catalog..." 
                className="pl-9 pr-4 py-2 bg-zinc-100 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/50 transition-all w-[200px]"
              />
            </div>
          )}
          <Button className="bg-black text-white hover:bg-zinc-800 rounded px-6 py-2 h-auto text-sm">
            Login
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto flex items-center gap-4">
          {showSearch && (
            <button className="text-zinc-500 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 -mr-2">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full">
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
          <div className="pt-4 border-t border-zinc-100">
            <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded py-2 h-auto text-sm">
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
