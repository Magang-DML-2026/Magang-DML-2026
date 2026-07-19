import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle2, FileText, ClipboardList, MapPin, Receipt } from "lucide-react";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await params;
  const transactionId = resolvedParams.id;

  return (
    <div className="p-8 max-w-[1000px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/dashboard/transactions/${transactionId}`} className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
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
              <div className="relative z-10 flex gap-6">
                <div className="w-9 h-9 rounded-full bg-[#cc4224] flex items-center justify-center text-white ring-4 ring-white shrink-0 mt-1">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Pesanan Dibuat</h3>
                  <p className="text-[12px] text-zinc-500 mt-1">Pesanan Anda telah kami terima dan menunggu pembayaran.</p>
                  <p className="text-[11px] text-zinc-400 mt-2 font-medium">18 Okt 2026, 09:00 WIB</p>
                </div>
              </div>
              
              {/* Step 2: Dibayar */}
              <div className="relative z-10 flex gap-6">
                <div className="w-9 h-9 rounded-full bg-[#cc4224] flex items-center justify-center text-white ring-4 ring-white shrink-0 mt-1">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Pembayaran Berhasil</h3>
                  <p className="text-[12px] text-zinc-500 mt-1">Pembayaran sebesar Rp 57.000.000 telah kami terima.</p>
                  <p className="text-[11px] text-zinc-400 mt-2 font-medium">19 Okt 2026, 16:00 WIB</p>
                </div>
              </div>

              {/* Step 3: Diproses (Active) */}
              <div className="relative z-10 flex gap-6">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white ring-4 ring-blue-50 shrink-0 mt-1 shadow-lg shadow-blue-500/30">
                  <Package className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-blue-600">Pesanan Diproses</h3>
                  <p className="text-[12px] text-zinc-600 mt-1 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 mt-3">
                    Pesanan Anda sedang dalam tahap produksi dan Quality Control. Pabrik kami sedang mempersiapkan barang (EPDM Rubber Seals - 5.000 Pcs) untuk pengiriman.
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-3 font-medium">20 Okt 2026, 08:30 WIB</p>
                </div>
              </div>

              {/* Step 4: Dikirim (Pending) */}
              <div className="relative z-10 flex gap-6 opacity-40">
                <div className="w-9 h-9 rounded-full bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center text-zinc-400 ring-4 ring-white shrink-0 mt-1">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900">Pesanan Dikirim</h3>
                  <p className="text-[12px] text-zinc-500 mt-1">Barang diserahkan ke kurir pengiriman.</p>
                </div>
              </div>

              {/* Step 5: Selesai (Pending) */}
              <div className="relative z-10 flex gap-6 opacity-40">
                <div className="w-9 h-9 rounded-full bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center text-zinc-400 ring-4 ring-white shrink-0 mt-1">
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
                  <span className="text-[14px] font-bold text-zinc-900">Kargo Darat (LTL)</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">No. Resi</p>
                <span className="text-[14px] font-medium text-zinc-900 bg-zinc-50 px-2 py-1 rounded border border-zinc-200">
                  DML-268892110
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Alamat Tujuan</p>
                <p className="text-[13px] text-zinc-700 leading-relaxed font-medium">
                  {session.userName} (+62 812-3456-7890)<br/>
                  PT Duta Mitra Luhur, Jl. Kawasan Industri No. 12, Cikarang Selatan, Bekasi 17530
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-[14px] font-bold text-zinc-900 mb-4 pb-3 border-b border-zinc-100">Rincian Produk</h2>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-multiply"></div>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-zinc-900">EPDM Rubber Seals</h3>
                <p className="text-[12px] text-zinc-500 mt-1 mb-2">5.000 Pcs • Rp 10.000/pcs</p>
                <p className="text-[14px] font-bold text-[#cc4224]">Rp 50.000.000</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
