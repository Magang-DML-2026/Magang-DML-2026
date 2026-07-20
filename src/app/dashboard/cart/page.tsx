import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getCart } from "@/app/actions/cart";
import CartItemUI from "@/components/dashboard/CartItemUI";
import EmptyCartUI from "@/components/dashboard/EmptyCartUI";

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const cartItems = await getCart();
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const ppn = subtotal * 0.11;
  const shippingEst = 45000; // Mock estimate for visual purposes
  const total = subtotal + ppn + shippingEst;

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen pt-12">
      
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight">
          Keranjang Belanja Anda
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-2/3">
          
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between text-[13px] font-bold">
              <div className="w-[45%]">Produk</div>
              <div className="w-[15%] text-center">Harga</div>
              <div className="w-[20%] text-center">Kuantitas</div>
              <div className="w-[15%] text-right">Total</div>
              <div className="w-[5%]"></div>
            </div>

            {/* Items List */}
            <div className="divide-y divide-zinc-100">
              {cartItems.length === 0 ? (
                <EmptyCartUI />
              ) : (
                cartItems.map((item) => (
                  <CartItemUI key={item.id} item={item} />
                ))
              )}
            </div>
          </div>

          <div className="mt-6">
            <Link href="/dashboard/katalog" className="text-[#cc4224] text-[14px] font-semibold flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Lanjut Belanja
            </Link>
          </div>
          
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-[#F1F1F1] rounded-xl p-6 border border-zinc-200 shadow-sm">
            <h2 className="text-[18px] font-bold text-zinc-900 mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-600">Subtotal</span>
                <span className="font-semibold text-zinc-900">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-600">Ongkir (Est.)</span>
                <span className="font-semibold text-zinc-900">Rp {shippingEst.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-600">Pajak (PPN 11%)</span>
                <span className="font-semibold text-zinc-900">Rp {ppn.toLocaleString("id-ID")}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-4 border-t border-zinc-300/50 mb-8">
              <span className="text-[15px] font-bold text-zinc-900">Total Tagihan</span>
              <span className="text-[20px] font-bold text-[#cc4224] tracking-tight">Rp {total.toLocaleString("id-ID")}</span>
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-medium text-zinc-500 mb-2">Kode Promo (Opsional)</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Masukkan kode" className="flex-1 px-3 py-2 text-[13px] bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-[#cc4224]" />
                <button className="px-4 py-2 bg-black text-white text-[13px] font-bold rounded-lg hover:bg-zinc-800 transition-colors">Apply</button>
              </div>
            </div>
            
            <Link 
              href={cartItems.length > 0 ? "/dashboard/checkout" : "#"} 
              className={`w-full py-3.5 font-bold text-[14px] rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 ${cartItems.length > 0 ? 'bg-[#cc4224] text-white hover:bg-[#b0351b]' : 'bg-zinc-300 text-zinc-400 cursor-not-allowed'}`}
            >
              Lanjut ke Pembayaran &rarr;
            </Link>

            {/* Placeholder boxes */}
            <div className="flex justify-center gap-3 mt-4">
              <div className="w-8 h-5 bg-zinc-200 rounded"></div>
              <div className="w-8 h-5 bg-zinc-200 rounded"></div>
              <div className="w-8 h-5 bg-zinc-200 rounded"></div>
            </div>
          </div>

          {/* Our Process Graphic */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[12px] font-bold text-zinc-900 mb-4">Proses Kami</h3>
            <div className="flex items-center justify-between relative">
              <div className="absolute left-6 right-6 top-4 h-[2px] bg-zinc-200 z-0"></div>
              <div className="absolute left-6 w-1/3 top-4 h-[2px] bg-[#cc4224] z-0"></div>
              
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#cc4224] text-white flex items-center justify-center text-[12px] font-bold">1</div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase">Design</span>
              </div>
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#cc4224] text-white flex items-center justify-center text-[12px] font-bold">2</div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase">Prototype</span>
              </div>
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-400 flex items-center justify-center text-[12px] font-bold">3</div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Production</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
