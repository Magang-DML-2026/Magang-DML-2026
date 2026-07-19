import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Trash2, ShoppingCart, Minus, Plus, ChevronRight } from "lucide-react";

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-[#cc4224]" />
          Keranjang Anda <span className="text-[16px] font-normal text-zinc-500 mt-2">(1 item)</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-2/3 space-y-4">
          
          <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-[#cc4224] rounded cursor-pointer" defaultChecked />
              <span className="text-[14px] font-bold text-zinc-900">Pilih Semua</span>
            </label>
            <button className="text-[13px] font-bold text-[#cc4224] hover:underline flex items-center gap-1">
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 sm:gap-6">
              <div className="flex items-start pt-2 shrink-0">
                <input type="checkbox" className="w-5 h-5 accent-[#cc4224] rounded cursor-pointer" defaultChecked />
              </div>
              
              <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-multiply"></div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-[16px] font-bold text-zinc-900">EPDM Rubber Seals</h3>
                    <p className="text-[18px] font-bold text-zinc-900 shrink-0">Rp 50.000.000</p>
                  </div>
                  <p className="text-[13px] text-zinc-500 mt-1">Material: EPDM 70 ShA • Proses: Injection Molding</p>
                  <p className="text-[13px] font-bold text-[#cc4224] mt-2">Rp 10.000 <span className="text-zinc-500 font-normal">/ pcs</span></p>
                </div>
                
                <div className="flex items-center justify-end mt-4">
                  <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                    <button className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="px-4 py-1.5 text-[14px] font-bold text-zinc-900 border-l border-r border-zinc-200 bg-white">
                      5000
                    </div>
                    <button className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-6 pb-4 border-b border-zinc-100">Ringkasan Belanja</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-zinc-500">Subtotal (1 produk)</span>
                <span className="font-semibold text-zinc-900">Rp 50.000.000</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-zinc-500">PPN (11%)</span>
                <span className="font-semibold text-zinc-900">Rp 5.500.000</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-4 border-t border-zinc-200 mb-6">
              <span className="text-[14px] font-bold text-zinc-900">Total Tagihan</span>
              <span className="text-[24px] font-bold text-[#cc4224] tracking-tight">Rp 55.500.000</span>
            </div>
            
            <Link href="/dashboard/checkout" className="w-full py-4 bg-[#cc4224] text-white font-bold text-[15px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2">
              Lanjut ke Pembayaran
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
