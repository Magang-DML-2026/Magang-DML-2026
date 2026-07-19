import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { getCart } from "@/app/actions/cart";
import CartItemUI from "@/components/dashboard/CartItemUI";
import EmptyCartUI from "@/components/dashboard/EmptyCartUI";

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const cartItems = await getCart();
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const ppn = subtotal * 0.11;
  const total = subtotal + ppn;

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-[#cc4224]" />
          Keranjang Anda <span className="text-[16px] font-normal text-zinc-500 mt-2">({cartItems.length} item)</span>
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
          </div>

          {cartItems.length === 0 ? (
            <EmptyCartUI />
          ) : (
            cartItems.map((item) => (
              <CartItemUI key={item.id} item={item} />
            ))
          )}
          
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-6 pb-4 border-b border-zinc-100">Ringkasan Belanja</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-zinc-500">Subtotal ({cartItems.length} produk)</span>
                <span className="font-semibold text-zinc-900">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-zinc-500">PPN (11%)</span>
                <span className="font-semibold text-zinc-900">Rp {ppn.toLocaleString("id-ID")}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-4 border-t border-zinc-200 mb-6">
              <span className="text-[14px] font-bold text-zinc-900">Total Tagihan</span>
              <span className="text-[24px] font-bold text-[#cc4224] tracking-tight">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            
            <Link 
              href={cartItems.length > 0 ? "/dashboard/checkout" : "#"} 
              className={`w-full py-4 font-bold text-[15px] rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 ${cartItems.length > 0 ? 'bg-[#cc4224] text-white hover:bg-[#b0351b]' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
            >
              Lanjut ke Pembayaran
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
