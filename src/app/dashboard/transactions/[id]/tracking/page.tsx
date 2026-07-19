import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle2, FileText, ClipboardList, MapPin, Receipt } from "lucide-react";
import { db } from "@/db";
import { transactions, transactionItems, products, addresses } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await params;
  const transactionId = resolvedParams.id;

  const txList = await db.select().from(transactions).where(eq(transactions.id, transactionId)).limit(1);
  if (txList.length === 0) redirect("/dashboard");
  const tx = txList[0];
  
  let deliveryAddress = null;
  if (tx.addressId) {
    const addrList = await db.select().from(addresses).where(eq(addresses.id, tx.addressId)).limit(1);
    deliveryAddress = addrList[0];
  } else {
    // Fallback for old transactions before addressId was saved
    const userAddresses = await db.select().from(addresses).where(eq(addresses.userId, tx.userId));
    deliveryAddress = userAddresses.find(a => a.isDefault) || userAddresses[0];
  }

  const items = await db.select({
    id: transactionItems.id,
    productName: transactionItems.productName,
    priceAtPurchase: transactionItems.priceAtPurchase,
    quantity: transactionItems.quantity,
    imageUrl: products.imageUrl,
  }).from(transactionItems)
  .leftJoin(products, eq(transactionItems.productId, products.id))
  .where(eq(transactionItems.transactionId, transactionId));

  const isPaid = tx.status !== "Menunggu Pembayaran";
  const isProcessing = ["Diproses", "Dikirim", "Selesai"].includes(tx.status);
  const isShipped = ["Dikirim", "Selesai"].includes(tx.status);
  const isFinished = tx.status === "Selesai";

  return (
    <div className="p-8 max-w-[1000px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/dashboard`} className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Status Pesanan</h1>
          <p className="text-[13px] text-zinc-500">Lacak pengiriman untuk pesanan #{transactionId}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Timeline */}
        <div className="w-full lg:w-7/12">
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-[16px] font-bold text-zinc-900 mb-8 pb-4 border-b border-zinc-100">Riwayat Status</h2>
            
            <div className="relative pl-6 space-y-8">
              {/* Vertical line */}
              <div className="absolute left-10 top-4 bottom-4 w-[2px] bg-zinc-100"></div>
              
              {/* Step 1: Dibuat */}
              <div className={`relative z-10 flex gap-6`}>
                <div className="w-9 h-9 rounded-full bg-[#cc4224] flex items-center justify-center text-white ring-4 ring-white shrink-0 mt-1">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Pesanan Dibuat</h3>
                  <p className="text-[12px] text-zinc-500 mt-1">Pesanan Anda telah kami terima.</p>
                  <p className="text-[11px] text-zinc-400 mt-2 font-medium">{tx.createdAt.toLocaleString("id-ID")}</p>
                </div>
              </div>
              
              {/* Step 2: Dibayar */}
              <div className={`relative z-10 flex gap-6 ${!isPaid ? 'opacity-40' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-white shrink-0 mt-1 ${isPaid ? 'bg-[#cc4224] text-white' : 'bg-zinc-100 border-2 border-zinc-200 text-zinc-400'}`}>
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Pembayaran Berhasil</h3>
                  {isPaid ? (
                    <>
                      <p className="text-[12px] text-zinc-500 mt-1">Pembayaran sebesar Rp {tx.totalAmount.toLocaleString("id-ID")} telah kami terima.</p>
                      <p className="text-[11px] text-zinc-400 mt-2 font-medium">{tx.paidAt?.toLocaleString("id-ID")}</p>
                    </>
                  ) : (
                    <p className="text-[12px] text-zinc-500 mt-1">Menunggu pembayaran.</p>
                  )}
                </div>
              </div>

              {/* Step 3: Diproses */}
              <div className={`relative z-10 flex gap-6 ${!isProcessing ? 'opacity-40' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-white shrink-0 mt-1 ${isProcessing ? (isShipped ? 'bg-[#cc4224] text-white' : 'bg-blue-500 text-white ring-blue-50 shadow-lg shadow-blue-500/30') : 'bg-zinc-100 border-2 border-zinc-200 text-zinc-400'}`}>
                  <Package className={`w-4 h-4 ${isProcessing && !isShipped ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <h3 className={`text-[14px] font-bold ${isProcessing && !isShipped ? 'text-blue-600' : 'text-zinc-900'}`}>Pesanan Diproses</h3>
                  {isProcessing && !isShipped && (
                    <p className="text-[12px] text-zinc-600 mt-1 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 mt-3">
                      Pesanan Anda sedang dalam tahap produksi dan Quality Control. Pabrik kami sedang mempersiapkan barang untuk pengiriman.
                    </p>
                  )}
                  {!isProcessing && (
                     <p className="text-[12px] text-zinc-500 mt-1">Pesanan akan diproses setelah pembayaran.</p>
                  )}
                </div>
              </div>

              {/* Step 4: Dikirim */}
              <div className={`relative z-10 flex gap-6 ${!isShipped ? 'opacity-40' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-white shrink-0 mt-1 ${isShipped ? (isFinished ? 'bg-[#cc4224] text-white' : 'bg-blue-500 text-white ring-blue-50 shadow-lg shadow-blue-500/30') : 'bg-zinc-100 border-2 border-zinc-200 text-zinc-400'}`}>
                  <Truck className={`w-4 h-4 ${isShipped && !isFinished ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <h3 className={`text-[14px] font-bold ${isShipped && !isFinished ? 'text-blue-600' : 'text-zinc-900'}`}>Pesanan Dikirim</h3>
                  <p className="text-[12px] text-zinc-500 mt-1">Barang diserahkan ke kurir pengiriman.</p>
                </div>
              </div>

              {/* Step 5: Selesai */}
              <div className={`relative z-10 flex gap-6 ${!isFinished ? 'opacity-40' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-white shrink-0 mt-1 ${isFinished ? 'bg-emerald-500 text-white' : 'bg-zinc-100 border-2 border-zinc-200 text-zinc-400'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Selesai</h3>
                  <p className="text-[12px] text-zinc-500 mt-1">Barang telah diterima oleh pembeli.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full lg:w-5/12 space-y-6">
          
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[14px] font-bold text-zinc-900 mb-4 pb-3 border-b border-zinc-100">Informasi Pengiriman</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Kurir</p>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-zinc-500" />
                  <span className="text-[14px] font-bold text-zinc-900">{tx.shippingMethod || "Kargo Darat (LTL)"}</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">No. Resi</p>
                <span className="text-[14px] font-medium text-zinc-900 bg-zinc-50 px-2 py-1 rounded border border-zinc-200">
                  {tx.resiNumber || 'Menunggu Pengiriman'}
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Alamat Tujuan</p>
                {deliveryAddress ? (
                  <p className="text-[13px] text-zinc-700 leading-relaxed font-medium">
                    {deliveryAddress.recipientName} ({deliveryAddress.phone})<br/>
                    {deliveryAddress.fullAddress}, {deliveryAddress.district}, {deliveryAddress.city}, {deliveryAddress.province} {deliveryAddress.postalCode}
                  </p>
                ) : (
                  <p className="text-[13px] text-zinc-700 leading-relaxed font-medium">
                    {session.userName}<br/>
                    Alamat tidak tersedia
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[14px] font-bold text-zinc-900 mb-4 pb-3 border-b border-zinc-100">Rincian Produk</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-zinc-50 pb-2 last:border-0">
                  <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                    <div 
                      className="w-full h-full bg-cover bg-center opacity-80 mix-blend-multiply"
                      style={{ backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80'})` }}
                    ></div>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-zinc-900">{item.productName}</h3>
                    <p className="text-[12px] text-zinc-500 mt-1 mb-2">{item.quantity.toLocaleString("id-ID")} Pcs • Rp {item.priceAtPurchase.toLocaleString("id-ID")}/pcs</p>
                    <p className="text-[14px] font-bold text-[#cc4224]">Rp {(item.priceAtPurchase * item.quantity).toLocaleString("id-ID")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
