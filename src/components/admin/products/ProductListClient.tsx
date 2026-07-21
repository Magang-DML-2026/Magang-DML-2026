"use client";

import { useState } from "react";
import { Search, Bell, Download, Plus, LayoutGrid, AlertTriangle, Building2, TrendingUp, ChevronLeft, ChevronRight, Edit2, Trash2, Settings, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ExportProductModal } from "@/components/admin/products/ExportProductModal";

export function ProductListClient({ adminName }: { adminName: string }) {
  const router = useRouter();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [stockFilterOpen, setStockFilterOpen] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Precision Gasket Seal X-90",
      sku: "DML-SEAL-9022",
      category: "MOLDING",
      stock: 12400,
      stockStatus: "in-stock",
      image: "https://images.unsplash.com/photo-1590497556755-f203875ec803?q=80&w=150&auto=format&fit=crop",
      b2cPrice: "190000",
      b2b100: "155000",
      b2b500: "125000"
    },
    {
      id: 2,
      name: "Commercial Truck Mudguard",
      sku: "DML-MUD-H102",
      category: "EXTRUSION",
      stock: 142,
      stockStatus: "low-stock",
      image: "https://images.unsplash.com/photo-1582294406183-b91c0e35dc8c?q=80&w=150&auto=format&fit=crop",
      b2cPrice: "680000",
      b2b100: "585000",
      b2b500: "485000"
    },
    {
      id: 3,
      name: "Vibra-Grip Shoe Outsole",
      sku: "DML-SOLE-V8",
      category: "MOLDING",
      stock: 4850,
      stockStatus: "in-stock",
      image: "https://images.unsplash.com/photo-1605336644265-d0554c000ff3?q=80&w=150&auto=format&fit=crop",
      b2cPrice: "135000",
      b2b100: "100000",
      b2b500: "80000"
    }
  ]);

  const handlePriceChange = (id: number, field: string, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
    setHasChanges(true);
  };

  const handleUpdateInventory = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#f9fafb] relative pb-24">
      
      {/* ── Page Header ─────────────── */}
      <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0 relative z-20">
        <div className="flex items-center gap-6">
          <span className="text-black font-black text-xl tracking-tight">Admin Portal</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search products, SKUs..."
              className="pl-9 pr-4 py-2 w-[280px] bg-zinc-100 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30"
            />
          </div>
          <button className="relative text-zinc-500 hover:text-black transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
            <span className="text-xs font-bold">{adminName.charAt(0)}</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-[1200px] w-full mx-auto">
        
        {/* Title Bar */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-black tracking-tight mb-2">Product & Price Management</h1>
            <p className="text-sm text-zinc-600">Configure B2C retail prices and B2B wholesale tiers for global inventory.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsExportModalOpen(true)}
              className="px-5 py-2.5 rounded-lg border border-zinc-300 bg-white text-black font-semibold text-sm hover:bg-zinc-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={() => router.push("/admin/products/new")}
              className="px-5 py-2.5 rounded-lg bg-black hover:bg-zinc-800 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-600">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#d94a26]">+4.2%</span>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">TOTAL SKUS</p>
            <p className="text-2xl font-black text-black">1,482</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Action Required</span>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">LOW STOCK ALERTS</p>
            <p className="text-2xl font-black text-black">12 Items</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">B2B TIERED ITEMS</p>
            <p className="text-2xl font-black text-black">840</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">AVG. MARGIN</p>
            <p className="text-2xl font-black text-black">28.4%</p>
          </div>
        </div>

        {/* Filters & Table Wrapper */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm mb-6">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-zinc-200 flex justify-between items-center relative z-10">
            <div className="flex gap-3 relative">
              {/* Category Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}
                  className="px-4 py-2 bg-white border border-zinc-300 rounded text-xs font-bold text-zinc-700 flex items-center gap-2 hover:bg-zinc-50"
                >
                  All Categories
                </button>
                {categoryFilterOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border border-zinc-200 shadow-lg rounded-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 border-b border-zinc-100 flex items-center gap-2 bg-orange-50/50">
                      <LayoutGrid className="w-3.5 h-3.5 text-[#d94a26]" />
                      <span className="text-xs font-bold text-[#d94a26]">All Categories</span>
                    </div>
                    <ul className="py-1 text-sm text-zinc-700">
                      <li className="px-8 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-3">
                        <div className="w-3.5 h-3.5 border border-zinc-400 rounded-sm"></div> Molding
                      </li>
                      <li className="px-8 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-3">
                        <div className="w-3.5 h-3.5 border border-zinc-400 rounded-sm"></div> Extrusion
                      </li>
                      <li className="px-8 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-3">
                        <div className="w-3.5 h-3.5 border border-zinc-400 rounded-sm"></div> Compounding
                      </li>
                      <li className="px-8 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-3">
                        <div className="w-3.5 h-3.5 border border-zinc-400 rounded-sm"></div> Finishing
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Stock Level Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setStockFilterOpen(!stockFilterOpen)}
                  className="px-4 py-2 bg-white border border-zinc-300 rounded text-xs font-bold text-zinc-700 flex items-center gap-2 hover:bg-zinc-50"
                >
                  Stock Level: All
                </button>
                {stockFilterOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[160px] bg-white border border-zinc-200 shadow-lg rounded-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
                    <ul className="py-1 text-sm text-zinc-700">
                      <li className="px-4 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#d94a26]"></div> Low Stock
                      </li>
                      <li className="px-4 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div> Out of Stock
                      </li>
                      <li className="px-4 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> In Stock
                      </li>
                      <div className="w-full h-px bg-zinc-100 my-1"></div>
                      <li className="px-4 py-2 bg-orange-50/50 cursor-pointer flex items-center justify-between text-[#d94a26] font-bold">
                        All Levels <CheckCircle2 className="w-3.5 h-3.5" />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
              Showing 1-10 of 1,482 products
              <div className="flex gap-1">
                <button className="w-7 h-7 border border-zinc-300 rounded bg-white hover:bg-zinc-50 flex items-center justify-center"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-7 h-7 border border-zinc-300 rounded bg-white hover:bg-zinc-50 flex items-center justify-center"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full relative z-0">
            <div className="grid grid-cols-[minmax(300px,_1fr)_120px_160px_240px_80px] bg-zinc-50/80 border-b border-zinc-200 px-6 py-4 text-xs font-bold text-black">
              <div>Product Info</div>
              <div>Stock Level</div>
              <div>B2C Unit Price</div>
              <div>B2B Tiers (Wholesale)</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="divide-y divide-zinc-200">
              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-[minmax(300px,_1fr)_120px_160px_240px_80px] px-6 py-6 items-center hover:bg-zinc-50/30 transition-colors">
                  
                  {/* Product Info */}
                  <div className="flex gap-4 items-center">
                    <div className="w-[60px] h-[60px] border border-zinc-200 rounded-lg overflow-hidden shrink-0 bg-white p-1">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-[13px] mb-1">{product.name}</h4>
                      <p className="text-[11px] text-zinc-500 mb-2">SKU: {product.sku}</p>
                      <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Stock Level */}
                  <div>
                    <div className="w-16 h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full ${product.stockStatus === 'low-stock' ? 'bg-[#d94a26] w-1/4' : 'bg-black w-3/4'}`}
                      />
                    </div>
                    <p className={`text-[13px] ${product.stockStatus === 'low-stock' ? 'text-[#d94a26] font-black' : 'text-black font-bold'}`}>
                      {product.stock.toLocaleString("en-US")} <span className="text-xs text-zinc-500 font-medium">units</span>
                    </p>
                  </div>

                  {/* B2C Unit Price */}
                  <div>
                    <div className="relative w-[120px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">Rp</span>
                      <input 
                        type="text" 
                        value={product.b2cPrice}
                        onChange={(e) => handlePriceChange(product.id, 'b2cPrice', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded text-xs font-bold text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26] transition-shadow"
                      />
                    </div>
                  </div>

                  {/* B2B Tiers */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-[10px] font-bold text-black">100+ u:</span>
                      <div className="relative w-[100px]">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-500">Rp</span>
                        <input 
                          type="text" 
                          value={product.b2b100}
                          onChange={(e) => handlePriceChange(product.id, 'b2b100', e.target.value)}
                          className="w-full pl-7 pr-2 py-1.5 bg-white border border-zinc-300 rounded text-[11px] font-bold text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-[10px] font-bold text-black">500+ u:</span>
                      <div className="relative w-[100px]">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-500">Rp</span>
                        <input 
                          type="text" 
                          value={product.b2b500}
                          onChange={(e) => handlePriceChange(product.id, 'b2b500', e.target.value)}
                          className="w-full pl-7 pr-2 py-1.5 bg-white border border-zinc-300 rounded text-[11px] font-bold text-black outline-none focus:border-[#d94a26] focus:ring-1 focus:ring-[#d94a26]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 text-zinc-400">
                    <button className="hover:text-black transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bulk Edit Footer */}
      <div className={`fixed bottom-0 left-[240px] right-0 bg-zinc-50 border-t border-zinc-200 p-4 transition-transform duration-300 z-40 ${hasChanges ? 'translate-y-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]' : 'translate-y-[100%]'}`}>
        <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center px-6">
          <div className="flex items-center gap-2 text-zinc-600 font-medium text-sm">
            <Settings className="w-4 h-4" /> Bulk Edit Prices
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setHasChanges(false)}
              className="px-6 py-2.5 bg-white border border-zinc-300 text-black font-bold text-sm rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Cancel Changes
            </button>
            <button 
              onClick={handleUpdateInventory}
              disabled={isSaving}
              className="px-8 py-2.5 bg-[#b2391b] hover:bg-[#912d14] text-white font-bold text-sm rounded-lg transition-colors shadow-sm min-w-[160px] flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
              ) : (
                'Update Inventory'
              )}
            </button>
          </div>
        </div>
      </div>

      <ExportProductModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
}
