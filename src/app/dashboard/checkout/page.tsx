import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Truck, ChevronRight, CreditCard, Wallet, Building2, Package } from "lucide-react";
import { getCart } from "@/app/actions/cart";
import { createTransaction } from "@/app/actions/checkout";
import { db } from "@/db";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";

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
  const shippingCost = 1500000; // Default shipping for now
  const total = subtotal + ppn + shippingCost;

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/invoices" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Checkout Pembayaran</h1>
          <p className="text-[13px] text-zinc-500">Selesaikan pembayaran untuk Invoice INV-2026-004</p>
        </div>
      </div>

      <form action={createTransaction} className="flex flex-col lg:flex-row gap-8">
        <input type="hidden" name="addressId" value={defaultAddress?.id || ""} />
        
        {/* Left Column: Order Details */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          {/* 1. Alamat Pengiriman */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-100">
              <h2 className="text-[16px] font-bold text-zinc-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#cc4224]" />
                Alamat Pengiriman
              </h2>
              <Link href="?modal=address" scroll={false} className="text-[13px] font-bold text-[#cc4224] hover:underline">
                Ubah Alamat
              </Link>
            </div>
            <div>
              {defaultAddress ? (
                <>
                  <p className="text-[14px] font-bold text-zinc-900 mb-1">{defaultAddress.recipientName} <span className="font-normal text-zinc-500">({defaultAddress.phone})</span></p>
                  <p className="text-[13px] text-zinc-600 leading-relaxed max-w-lg">
                    {defaultAddress.fullAddress}, {defaultAddress.district}, {defaultAddress.city}, {defaultAddress.province} {defaultAddress.postalCode}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[14px] font-bold text-zinc-900 mb-1">{session.userName} <span className="font-normal text-zinc-500">(+62) 812-3456-7890</span></p>
                  <p className="text-[13px] text-zinc-600 leading-relaxed max-w-lg">
                    Alamat belum diatur. Silakan tambah alamat Anda.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 2. Detail Pesanan */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-4 pb-4 border-b border-zinc-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#cc4224]" />
              Detail Pesanan
            </h2>
            
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                    <div 
                      className="w-full h-full bg-cover bg-center opacity-80 mix-blend-multiply"
                      style={{ backgroundImage: `url(${item.product.imageUrl || 'https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80'})` }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[15px] font-bold text-zinc-900">{item.product.name}</h3>
                        <p className="text-[12px] text-zinc-500 mt-1">Material: {item.product.material || "Rubber"} • Proses: {item.product.process || "Molding"}</p>
                      </div>
                      <p className="text-[15px] font-bold text-zinc-900">Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[12px] font-bold text-zinc-500 bg-zinc-100 px-2 py-1 rounded">Qty: {item.quantity.toLocaleString("id-ID")} Pcs</span>
                      <span className="text-[12px] text-zinc-400">Rp {item.product.price.toLocaleString("id-ID")} / pcs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Metode Pengiriman */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-4 pb-4 border-b border-zinc-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#cc4224]" />
              Metode Pengiriman
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="border-2 p-4 rounded-xl cursor-pointer relative transition-colors has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3] border-zinc-200 bg-white hover:border-zinc-300">
                <input type="radio" name="shipping" value="Kargo Darat (LTL)" className="absolute right-4 top-4 w-4 h-4 accent-[#cc4224]" defaultChecked />
                <h3 className="text-[14px] font-bold text-zinc-900">Kargo Darat (LTL)</h3>
                <p className="text-[12px] text-zinc-500 mt-1 mb-2">Estimasi 2-3 hari kerja</p>
                <p className="text-[14px] font-bold text-zinc-900">Rp 1.500.000</p>
              </label>
              
              <label className="border-2 p-4 rounded-xl cursor-pointer relative transition-colors has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3] border-zinc-200 bg-white hover:border-zinc-300">
                <input type="radio" name="shipping" value="Pengiriman Udara" className="absolute right-4 top-4 w-4 h-4 accent-[#cc4224]" />
                <h3 className="text-[14px] font-bold text-zinc-900">Pengiriman Udara</h3>
                <p className="text-[12px] text-zinc-500 mt-1 mb-2">Estimasi 1 hari kerja</p>
                <p className="text-[14px] font-bold text-zinc-900">Rp 4.500.000</p>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Payment & Summary */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-4">Metode Pembayaran</h2>
            
            <div className="space-y-3">
              {/* Virtual Account */}
              <label className="flex items-center justify-between border-2 p-4 rounded-xl cursor-pointer transition-colors has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3] border-zinc-200 bg-white hover:border-zinc-300">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" value="Virtual Account" className="w-4 h-4 accent-[#cc4224]" defaultChecked />
                  <Building2 className="w-5 h-5 text-[#cc4224]" />
                  <span className="text-[14px] font-bold text-zinc-900">Virtual Account</span>
                </div>
                <div className="w-8 h-4 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg')] bg-contain bg-no-repeat bg-center"></div>
              </label>
              
              {/* Credit Card */}
              <label className="flex items-center justify-between border-2 p-4 rounded-xl cursor-pointer transition-colors has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3] border-zinc-200 bg-white hover:border-zinc-300">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" value="Kartu Kredit" className="w-4 h-4 accent-[#cc4224]" />
                  <CreditCard className="w-5 h-5 text-zinc-500" />
                  <span className="text-[14px] font-bold text-zinc-900">Kartu Kredit</span>
                </div>
                <div className="flex gap-1">
                   <div className="w-6 h-4 bg-zinc-200 rounded"></div>
                   <div className="w-6 h-4 bg-zinc-200 rounded"></div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-4 pb-4 border-b border-zinc-100">Ringkasan Pesanan</h2>
            
            <div className="space-y-6 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                    <div 
                      className="w-full h-full bg-cover bg-center opacity-80 mix-blend-multiply"
                      style={{ backgroundImage: `url(${item.product.imageUrl || 'https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80'})` }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-zinc-900">{item.product.name}</h3>
                    <p className="text-[12px] text-zinc-500 mt-1 mb-2">{item.quantity.toLocaleString("id-ID")} Pcs • Rp {item.product.price.toLocaleString("id-ID")}/pcs</p>
                    <p className="text-[14px] font-bold text-zinc-900">Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-500">Subtotal ({cartItems.length} produk)</span>
                <span className="font-semibold text-zinc-900">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-500">Biaya Pengiriman (LTL)</span>
                <span className="font-semibold text-zinc-900">Rp {shippingCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-500">PPN (11%)</span>
                <span className="font-semibold text-zinc-900">Rp {ppn.toLocaleString("id-ID")}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-4 border-t border-zinc-200 mb-6">
              <span className="text-[14px] font-bold text-zinc-900">Total Tagihan</span>
              <span className="text-[20px] font-bold text-[#cc4224] tracking-tight">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            
            <button type="submit" className="w-full py-4 bg-[#cc4224] text-white font-bold text-[15px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2">
              Bayar Sekarang
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-zinc-400 mt-3 flex items-center justify-center gap-1">
              Pembayaran aman dan terenkripsi <span className="w-3 h-3 bg-zinc-300 rounded-full inline-block"></span>
            </p>
          </div>

        </div>
        
      </form>

      {/* Tambah Alamat Modal */}
      {showModal === 'address' && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
              <div>
                <h2 className="text-[18px] font-bold text-zinc-900">Ubah Alamat Pengiriman</h2>
                <p className="text-[12px] text-zinc-500 mt-0.5">Pilih atau tambahkan alamat baru.</p>
              </div>
              <Link href="/dashboard/checkout" scroll={false} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 text-zinc-400 transition-colors">
                ✕
              </Link>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 bg-zinc-50/50">
              {/* Existing Addresses */}
              {userAddresses.length > 0 ? (
                userAddresses.map(address => (
                  <label key={address.id} className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors border-2 has-[:checked]:border-[#cc4224] has-[:checked]:bg-[#fdf5f3] border-zinc-200 bg-white hover:border-zinc-300">
                    <input type="radio" name="selected_address" value={address.id} className="w-4 h-4 mt-1 accent-[#cc4224]" defaultChecked={address.isDefault || false} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[14px] font-bold text-zinc-900">{address.label}</span>
                        {address.isDefault && (
                          <span className="text-[10px] font-black bg-[#cc4224] text-white px-2 py-0.5 rounded uppercase tracking-wider">Utama</span>
                        )}
                      </div>
                      <p className="text-[13px] font-bold text-zinc-900 mb-1">{address.recipientName} ({address.phone})</p>
                      <p className="text-[13px] text-zinc-600 leading-relaxed">
                        {address.fullAddress}, {address.district}, {address.city}, {address.province} {address.postalCode}
                      </p>
                    </div>
                  </label>
                ))
              ) : (
                <div className="text-center py-4 text-zinc-500 text-sm">
                  Anda belum menambahkan alamat satupun.
                </div>
              )}

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-50/50 px-2 text-[12px] text-zinc-400 font-bold uppercase tracking-wider">Atau</span>
                </div>
              </div>

              {/* Form Tambah Alamat */}
              <div className="space-y-4">
                <h3 className="text-[14px] font-bold text-zinc-900 mb-2">Tambah Alamat Baru</h3>
                
                <div>
                  <label className="block text-[12px] font-bold text-zinc-700 mb-1.5">Label Alamat</label>
                  <input type="text" placeholder="Contoh: Gudang 2" className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg text-[13px] focus:outline-none focus:border-[#cc4224]" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-zinc-700 mb-1.5">Nama Penerima</label>
                    <input type="text" placeholder="Nama Lengkap" className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg text-[13px] focus:outline-none focus:border-[#cc4224]" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-zinc-700 mb-1.5">No. Telepon</label>
                    <input type="text" placeholder="08..." className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg text-[13px] focus:outline-none focus:border-[#cc4224]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-zinc-700 mb-1.5">Alamat Lengkap</label>
                  <textarea rows={3} placeholder="Nama jalan, gedung, no. rumah" className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg text-[13px] focus:outline-none focus:border-[#cc4224] resize-none"></textarea>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-zinc-100 flex justify-end gap-3 bg-white">
              <Link href="/dashboard/checkout" scroll={false} className="px-6 py-2.5 bg-white border border-zinc-300 text-zinc-700 font-bold text-[13px] rounded-lg hover:bg-zinc-50 transition-colors">
                Batal
              </Link>
              <Link href="/dashboard/checkout" scroll={false} className="px-6 py-2.5 bg-[#cc4224] text-white font-bold text-[13px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm">
                Simpan Alamat
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
