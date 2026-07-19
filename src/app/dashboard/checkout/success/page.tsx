import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight, FileText, Search, Package, MapPin } from "lucide-react";
import { db } from "@/db";
import { transactions, transactionItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ txId?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const resolvedParams = await searchParams;
  const txId = resolvedParams.txId;
  if (!txId) redirect("/dashboard/cart");

  const txList = await db.select().from(transactions).where(eq(transactions.id, txId)).limit(1);
  if (txList.length === 0) redirect("/dashboard");
  const tx = txList[0];

  const items = await db.select().from(transactionItems).where(eq(transactionItems.transactionId, txId));

  return (
    <div className="p-8 max-w-[1000px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-8">
        <Link href="/dashboard" className="hover:text-zinc-800 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-[#cc4224]">Bukti Lunas</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Receipt Panel */}
        <div className="w-full lg:w-5/12 bg-white rounded-2xl border border-zinc-200 p-10 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
           {/* Top Decor */}
           <div className="absolute top-0 left-0 w-full h-2 bg-[#cc4224]"></div>
           
           <div className="w-20 h-20 bg-[#fdf5f3] rounded-full flex items-center justify-center mb-6">
             <CheckCircle2 className="w-10 h-10 text-[#cc4224]" />
           </div>
           
           <h1 className="text-[22px] font-bold text-zinc-900 mb-2">Pembayaran Berhasil!</h1>
           <p className="text-[13px] text-zinc-500 mb-8">Terima kasih, pembayaran untuk pesanan Anda telah kami terima.</p>
           
           <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-6 mb-8 text-left space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">Nomor Pesanan</span>
                <span className="text-[14px] font-bold text-zinc-900">{tx.id}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">Waktu Pembayaran</span>
                <span className="text-[14px] font-medium text-zinc-900">{tx.paidAt ? tx.paidAt.toLocaleString("id-ID") : '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">Total Dibayar</span>
                <span className="text-[16px] font-bold text-[#cc4224]">Rp {tx.totalAmount.toLocaleString("id-ID")}</span>
              </div>
           </div>
           
           <Link href="/dashboard" className="w-full py-3.5 bg-white border-2 border-zinc-200 text-zinc-700 font-bold text-[14px] rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
             Kembali ke Dashboard
           </Link>
        </div>

        {/* Status / Tracking Panel */}
        <div className="w-full lg:w-7/12 space-y-6">
           
           <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
              <h2 className="text-[16px] font-bold text-zinc-900 mb-8 pb-4 border-b border-zinc-100">
                Status Pemrosesan
              </h2>
              
              <div className="flex justify-between items-center relative px-2 mb-8">
                 <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-zinc-100 -translate-y-1/2 z-0"></div>
                 <div className="absolute top-1/2 left-6 right-1/2 h-[2px] bg-[#cc4224] -translate-y-1/2 z-0"></div>
                 
                 <div className="relative z-10 flex flex-col items-center gap-2">
                   <div className="w-10 h-10 bg-[#cc4224] rounded-full flex items-center justify-center text-white ring-4 ring-white shadow-sm">
                     <FileText className="w-4 h-4" />
                   </div>
                   <span className="text-[11px] font-bold text-[#cc4224]">Dibayar</span>
                 </div>
                 
                 <div className="relative z-10 flex flex-col items-center gap-2">
                   <div className="w-10 h-10 bg-[#cc4224] rounded-full flex items-center justify-center text-white ring-4 ring-white shadow-md shadow-[#cc4224]/30 animate-pulse">
                     <Package className="w-4 h-4" />
                   </div>
                   <span className="text-[11px] font-bold text-[#cc4224]">Diproses</span>
                 </div>
                 
                 <div className="relative z-10 flex flex-col items-center gap-2 opacity-40">
                   <div className="w-10 h-10 bg-white border-2 border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 ring-4 ring-white">
                     <MapPin className="w-4 h-4" />
                   </div>
                   <span className="text-[11px] font-bold text-zinc-400">Dikirim</span>
                 </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 animate-pulse"></div>
                 <div>
                   <h3 className="text-[13px] font-bold text-blue-900 mb-1">Pesanan sedang dipersiapkan</h3>
                   <p className="text-[12px] text-blue-700 leading-relaxed">
                      Pabrik kami sedang mengemas pesanan Anda ({items.length} macam barang) untuk diserahkan kepada pihak {tx.shippingMethod}.
                   </p>
                 </div>
              </div>
           </div>
           
           <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 bg-[url('https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center rounded-lg border border-zinc-200 opacity-80 mix-blend-multiply shrink-0"></div>
              <div className="flex-1">
                 <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Total {items.reduce((acc, item) => acc + item.quantity, 0).toLocaleString("id-ID")} Items</p>
                 <h3 className="text-[15px] font-bold text-zinc-900">{items[0]?.productName || 'Produk'} {items.length > 1 ? `dan ${items.length - 1} lainnya` : ''}</h3>
                 <p className="text-[12px] text-zinc-500 mt-0.5">Rp {tx.totalAmount.toLocaleString("id-ID")}</p>
              </div>
              <Link href={`/dashboard/transactions/${tx.id}/tracking`} className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-[12px] font-bold rounded-lg hover:bg-zinc-50 transition-colors">
                Lacak Pesanan
              </Link>
           </div>

        </div>
        
      </div>
      
    </div>
  );
}
