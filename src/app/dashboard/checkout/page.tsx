import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Lock, CreditCard, Wallet, Building2, HelpCircle } from "lucide-react";
import { getCart } from "@/app/actions/cart";
import { createTransaction } from "@/app/actions/checkout";
import { db } from "@/db";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";
import CheckoutAddressModal from "@/components/dashboard/CheckoutAddressModal";
import HorizontalScrollContainer from "@/components/dashboard/HorizontalScrollContainer";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ modal?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const resolvedParams = await searchParams;
  const showModal = resolvedParams.modal;

  const cartItems = await getCart();
  if (cartItems.length === 0) {
    redirect("/dashboard/cart");
  }

  const userAddresses = await db.select().from(addresses).where(eq(addresses.userId, session.userId as number));
  const defaultAddress = userAddresses.find(a => a.isDefault) || userAddresses[0];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const ppn = subtotal * 0.11;
  const shippingCost = 45000; // Mock estimate to match cart
  const total = subtotal + ppn + shippingCost;

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans pb-16">
      
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-8 h-[72px] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#cc4224] rounded-lg flex items-center justify-center text-white font-bold text-[18px]">
              D
            </div>
            <span className="font-bold text-[18px] text-zinc-900 tracking-tight">Duta Mitra Luhur</span>
          </Link>
          
          <div className="flex items-center gap-6 text-[13px] font-semibold text-zinc-600">
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4" /> Secure Checkout
            </span>
            <span className="w-[1px] h-4 bg-zinc-300"></span>
            <Link href="/dashboard/cart" className="hover:text-zinc-900 transition-colors">Cancel and Return</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 mt-8 mb-6">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-zinc-500">
          <Link href="/dashboard/cart" className="hover:text-zinc-800 transition-colors">Cart</Link>
          <span className="text-zinc-300">›</span>
          <span className="text-[#cc4224]">Checkout</span>
          <span className="text-zinc-300">›</span>
          <span>Payment</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8">
        <form action={createTransaction} className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Forms */}
          <div className="w-full lg:w-[65%] space-y-8">
            
            {/* Shipping Information Box */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-bold text-zinc-900 tracking-tight">Shipping Information</h2>
                <Link href="?modal=address" scroll={false} className="text-[12px] font-bold text-[#cc4224] border border-[#cc4224] px-4 py-2 rounded hover:bg-[#fdf5f3] transition-colors">
                  + Add New Address
                </Link>
              </div>
              <HorizontalScrollContainer className="flex overflow-x-auto gap-4 pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-zinc-100 [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                {userAddresses.length > 0 ? (
                  userAddresses.map((addr) => (
                    <label key={addr.id} className="w-[320px] shrink-0 border-2 rounded-lg p-5 cursor-pointer bg-white transition-colors border-zinc-200 hover:border-zinc-300 has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3]/30 relative block">
                      <input type="radio" name="addressId" value={addr.id} className="peer hidden" defaultChecked={addr.id === defaultAddress?.id} />
                      <div className="absolute top-5 right-5 w-4 h-4 rounded-full border-2 border-zinc-300 peer-checked:border-4 peer-checked:border-[#cc4224] bg-white transition-all"></div>
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded mb-3 ${addr.isDefault ? 'bg-[#cc4224]/10 text-[#cc4224]' : 'bg-zinc-100 text-zinc-500'}`}>
                        {addr.label || (addr.isDefault ? 'Primary' : 'Address')}
                      </span>
                      <p className="text-[13px] font-bold text-zinc-900 mb-2">{addr.recipientName}</p>
                      <p className="text-[12px] text-zinc-600 leading-relaxed mb-4 pr-6 min-h-[55px]">
                        {addr.fullAddress}, {addr.district}<br/>
                        {addr.city}, {addr.province} {addr.postalCode}<br/>
                        Indonesia
                      </p>
                      <p className="text-[12px] font-medium text-zinc-900">{addr.phone}</p>
                    </label>
                  ))
                ) : (
                  <div className="w-full border-2 border-dashed border-zinc-200 rounded-lg p-5 text-center">
                    <p className="text-[13px] font-bold text-zinc-900 mb-2">{session.userName}</p>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">
                      Belum ada alamat pengiriman. Silakan tambah alamat baru.
                    </p>
                  </div>
                )}
              </HorizontalScrollContainer>
            </div>

            {/* Payment Method Box */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-[18px] font-bold text-zinc-900 tracking-tight mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                
                {/* Method 1 */}
                <label className="flex items-center gap-4 p-5 border-2 rounded-lg cursor-pointer bg-white transition-colors border-zinc-200 hover:border-zinc-300 has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3]/20">
                  <input type="radio" name="payment" value="Virtual Account" className="w-4 h-4 accent-[#cc4224]" defaultChecked />
                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded shrink-0">
                    <Building2 className="w-5 h-5 text-zinc-700" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-zinc-900">Bank Transfer (Virtual Account)</p>
                    <p className="text-[12px] text-zinc-500 mt-0.5">BCA, Mandiri, BNI, or BRI. Automatic verification.</p>
                  </div>
                </label>

                {/* Method 2 */}
                <label className="flex items-center gap-4 p-5 border-2 rounded-lg cursor-pointer bg-white transition-colors border-zinc-200 hover:border-zinc-300 has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3]/20">
                  <input type="radio" name="payment" value="Credit Card" className="w-4 h-4 accent-[#cc4224]" />
                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded shrink-0">
                    <CreditCard className="w-5 h-5 text-zinc-700" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-zinc-900">Credit / Debit Card</p>
                    <p className="text-[12px] text-zinc-500 mt-0.5">Visa, Mastercard, or JCB. Secured by 256-bit encryption.</p>
                  </div>
                </label>

                {/* Method 3 */}
                <label className="flex items-center gap-4 p-5 border-2 rounded-lg cursor-pointer bg-white transition-colors border-zinc-200 hover:border-zinc-300 has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3]/20">
                  <input type="radio" name="payment" value="E-Wallet" className="w-4 h-4 accent-[#cc4224]" />
                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded shrink-0">
                    <Wallet className="w-5 h-5 text-zinc-700" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-zinc-900">E-Wallet</p>
                    <p className="text-[12px] text-zinc-500 mt-0.5">GoPay, OVO, or Dana. Fast one-click payment.</p>
                  </div>
                </label>
              </div>

              {/* Secure Info */}
              <div className="bg-slate-50 border-l-4 border-slate-300 rounded-r-lg p-4 flex gap-3 items-start">
                <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Your transaction is 100% secure. We utilize industry-standard TLS encryption to protect your financial data and never store your full card details on our servers.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Dark Order Summary */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-[#111827] rounded-xl shadow-xl overflow-hidden sticky top-[104px]">
              
              <div className="p-8">
                <h2 className="text-[18px] font-bold text-white tracking-tight mb-8">Your Order</h2>
                
                {/* Items List */}
                <div className="space-y-6 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-white/10 rounded overflow-hidden shrink-0">
                        <div 
                          className="w-full h-full bg-cover bg-center mix-blend-screen opacity-90"
                          style={{ backgroundImage: `url(${item.product.imageUrl || 'https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80'})` }}
                        ></div>
                      </div>
                      <div className="flex-1 text-white">
                        <h3 className="text-[13px] font-bold leading-snug mb-1">{item.product.name}</h3>
                        <p className="text-[11px] text-zinc-400 mb-1.5">{item.product.material || 'Standard'} | {item.quantity}pcs</p>
                        <p className="text-[13px] font-bold">IDR {(item.product.price * item.quantity).toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation */}
                <div className="space-y-3 mb-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="font-semibold text-zinc-300">IDR {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-zinc-400">Shipping (Express)</span>
                    <span className="font-semibold text-zinc-300">IDR {shippingCost.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-zinc-400">Tax (VAT 11%)</span>
                    <span className="font-semibold text-zinc-300">IDR {ppn.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10 mb-8">
                  <span className="text-[14px] font-bold text-zinc-300">Total<br/>Amount</span>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-white mr-1.5">IDR</span>
                    <span className="text-[26px] font-bold text-white tracking-tight">{total.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {/* Promo Code Input Dark */}
                <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-lg border border-white/10 focus-within:border-white/30 transition-colors">
                  <input type="text" placeholder="Promo Code" className="flex-1 bg-transparent px-3 py-1.5 text-[13px] text-white placeholder-zinc-500 focus:outline-none" />
                  <button type="button" className="px-4 py-1.5 bg-[#cc4224] text-white text-[12px] font-bold rounded hover:bg-[#b0351b] transition-colors">Apply</button>
                </div>

                {/* Pay Button */}
                <button type="submit" className="w-full py-4 bg-[#cc4224] hover:bg-[#b0351b] text-white font-bold text-[15px] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#cc4224]/20 mb-6">
                  <Lock className="w-4 h-4" />
                  Pay Now
                </button>

                <p className="text-center text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                  Secured by PT Duta Mitra Luhur Payment Gateway
                </p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-[12px] text-zinc-600">Need assistance? <Link href="/dashboard/complaints" className="text-[#cc4224] hover:underline">Contact Support</Link></p>
            </div>
          </div>

        </form>
      </div>

      {/* Modal Overlay */}
      {showModal === "address" && <CheckoutAddressModal />}
    </div>
  );
}
