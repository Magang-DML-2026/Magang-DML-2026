"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Package, Wallet, UploadCloud, ChevronRight } from "lucide-react";

export function ProductFormClient({ adminName }: { adminName: string }) {
  const router = useRouter();
  const [pubStatus, setPubStatus] = useState("draft");

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#f9fafb]">
      
      {/* ── Page Header ─────────────── */}
      <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0 relative z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-bold text-black">
            <span>Admin Portal</span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-500">Add Product</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search product catalogue..."
              className="pl-9 pr-4 py-2 w-[280px] bg-white border border-zinc-200 rounded-full text-sm outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26]"
            />
          </div>
          <button className="relative text-zinc-500 hover:text-black transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full border border-zinc-200 bg-zinc-50 text-black flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-[1200px] w-full mx-auto pb-24">
        
        {/* Title Bar */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-3">
              <span className="cursor-pointer hover:text-black transition-colors" onClick={() => router.push("/admin/products")}>Products</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black">Add New Product</span>
            </div>
            <h1 className="text-3xl font-black text-black tracking-tight mb-2">Catalogue Entry</h1>
            <p className="text-sm text-zinc-600">Register new manufacturing units into the global inventory system.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push("/admin/products")}
              className="px-6 py-2.5 rounded-lg border border-zinc-300 bg-white text-black font-semibold text-sm hover:bg-zinc-50 transition-colors shadow-sm"
            >
              Cancel Changes
            </button>
            <button 
              onClick={() => router.push("/admin/products")}
              className="px-6 py-2.5 rounded-lg bg-[#b2391b] hover:bg-[#912d14] text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
          
          {/* Left Column: Form */}
          <div className="space-y-6">
            
            {/* General Specs */}
            <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-5 h-5 text-[#b2391b]" />
                <h2 className="text-lg font-bold text-black">General Specifications</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-zinc-600 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Industrial Seal X-400"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-[13px] text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-zinc-600 mb-2">SKU Identifier</label>
                  <input 
                    type="text" 
                    placeholder="DML-RBR-001"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-[13px] text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-zinc-600 mb-2">Manufacturing Category</label>
                  <div className="relative">
                    <select className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-[13px] text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] appearance-none transition-shadow">
                      <option>Molding</option>
                      <option>Extrusion</option>
                      <option>Compounding</option>
                      <option>Finishing</option>
                    </select>
                    <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-zinc-600 mb-2">Base Material</label>
                  <input 
                    type="text" 
                    placeholder="Natural Rubber, EPDM, Silicone..."
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-[13px] text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Commercial Framework */}
            <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-5 h-5 text-[#b2391b]" />
                <h2 className="text-lg font-bold text-black">Commercial Framework</h2>
              </div>
              
              <div className="mb-6">
                <label className="block text-[13px] font-bold text-zinc-600 mb-2">B2C Unit Price (IDR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-zinc-500">Rp</span>
                  <input 
                    type="text" 
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 rounded-lg text-[13px] font-bold text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-zinc-600 mb-3">B2B Wholesale Tiers</label>
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex gap-4">
                  <div className="flex-1 bg-white border border-zinc-200 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-bold text-black text-sm">100+ Units</p>
                      <p className="text-[10px] text-zinc-500">Tier 1 discount</p>
                    </div>
                    <div className="relative w-32">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-zinc-400">Rp</span>
                      <input 
                        type="text" 
                        placeholder="Discount Price"
                        className="w-full pl-8 pr-2 py-1.5 bg-white border border-zinc-200 rounded text-[11px] font-bold text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26]"
                      />
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-zinc-200 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-bold text-black text-sm">500+ Units</p>
                      <p className="text-[10px] text-zinc-500">Tier 2 discount</p>
                    </div>
                    <div className="relative w-32">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-zinc-400">Rp</span>
                      <input 
                        type="text" 
                        placeholder="Discount Price"
                        className="w-full pl-8 pr-2 py-1.5 bg-white border border-zinc-200 rounded text-[11px] font-bold text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26]"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Assets & Status */}
          <div className="space-y-6">
            
            {/* Product Asset */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-black mb-6">Product Asset</h2>
              
              <div className="border-2 border-dashed border-zinc-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer group mb-6">
                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-zinc-200 transition-colors text-zinc-600">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-bold text-black text-sm mb-1">Upload Production Photo</p>
                <p className="text-[10px] text-zinc-500 mb-4 uppercase tracking-widest">PNG, JPG up to 10MB</p>
                <button className="px-5 py-2 bg-zinc-200 hover:bg-zinc-300 text-black font-bold text-[11px] rounded transition-colors">
                  Browse Files
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square rounded-lg border border-zinc-200 overflow-hidden bg-white p-2">
                  <img src="https://images.unsplash.com/photo-1590497556755-f203875ec803?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-contain" alt="Asset 1" />
                </div>
                <div className="aspect-square rounded-lg border border-zinc-200 overflow-hidden bg-zinc-100">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Asset 2" />
                </div>
              </div>
            </div>

            {/* Publication Status */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-black mb-6">Publication Status</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="pt-1">
                    <input 
                      type="radio" 
                      name="pubStatus" 
                      value="draft"
                      checked={pubStatus === "draft"}
                      onChange={(e) => setPubStatus(e.target.value)}
                      className="w-4 h-4 text-black focus:ring-black accent-black" 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-black">Draft Mode</p>
                    <p className="text-[11px] text-zinc-500">Hidden from public catalogue</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="pt-1">
                    <input 
                      type="radio" 
                      name="pubStatus" 
                      value="active"
                      checked={pubStatus === "active"}
                      onChange={(e) => setPubStatus(e.target.value)}
                      className="w-4 h-4 text-black focus:ring-black accent-black" 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-black">Active / Published</p>
                    <p className="text-[11px] text-zinc-500">Live for all B2B/B2C users</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="pt-1">
                    <input 
                      type="radio" 
                      name="pubStatus" 
                      value="archived"
                      checked={pubStatus === "archived"}
                      onChange={(e) => setPubStatus(e.target.value)}
                      className="w-4 h-4 text-black focus:ring-black accent-black" 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-black">Archived</p>
                    <p className="text-[11px] text-zinc-500">Historical data preservation only</p>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Manufacturing Lifecycle Phase */}
        <div className="mt-6 bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-8">Manufacturing Lifecycle Phase</h2>
          
          <div className="relative max-w-4xl mx-auto px-4">
            {/* Connecting line */}
            <div className="absolute top-4 left-[10%] right-[10%] h-[3px] bg-zinc-200 z-0">
              <div className="h-full bg-[#d94a26] w-0"></div> {/* Adjust w-% for progress */}
            </div>

            <div className="flex justify-between relative z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d94a26] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-500/20 ring-4 ring-white">1</div>
                <span className="text-xs font-bold text-black">Registration</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-zinc-300 text-zinc-500 flex items-center justify-center font-bold text-sm ring-4 ring-white">2</div>
                <span className="text-xs font-medium text-zinc-500">Mold Design</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-zinc-300 text-zinc-500 flex items-center justify-center font-bold text-sm ring-4 ring-white">3</div>
                <span className="text-xs font-medium text-zinc-500">Prototypes</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-zinc-300 text-zinc-500 flex items-center justify-center font-bold text-sm ring-4 ring-white">4</div>
                <span className="text-xs font-medium text-zinc-500">Mass Prod</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
