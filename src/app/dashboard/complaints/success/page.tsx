import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Check, Clock, Headset } from "lucide-react";

export default async function ComplaintSuccessPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen py-16">
      
      <div className="bg-white rounded-xl border border-zinc-200 p-12 shadow-sm text-center max-w-3xl mx-auto mb-8">
        <div className="w-20 h-20 bg-[#F15A24] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Check className="w-10 h-10 text-[#4E1E0F] stroke-[3]" />
        </div>
        
        <h1 className="text-[28px] font-bold text-zinc-900 mb-4 tracking-tight">
          Laporan Berhasil Dikirim
        </h1>
        
        <p className="text-[15px] text-zinc-600 max-w-md mx-auto mb-10 leading-relaxed">
          Tim kami akan meninjau laporan Anda dalam waktu 24 jam kerja. Anda dapat melacak status komplain di Dashboard.
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-10 max-w-xl mx-auto text-left">
          <div className="flex-1">
            <p className="text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-widest">Nomor Tiket</p>
            <p className="text-[16px] font-bold text-zinc-900">#CMP-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</p>
          </div>
          <div className="flex-1 md:pl-8">
            <p className="text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-widest">Tanggal Pengiriman</p>
            <p className="text-[16px] font-bold text-zinc-900">{today}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/dashboard" 
            className="px-8 py-3.5 bg-[#b0351b] text-white font-bold text-[14px] rounded-lg hover:bg-[#8b2915] transition-colors shadow-sm"
          >
            Kembali ke Dashboard
          </Link>
          <Link 
            href="/dashboard/complaints" 
            className="px-8 py-3.5 text-[#b0351b] font-bold text-[14px] hover:bg-orange-50 rounded-lg transition-colors"
          >
            Lihat Detail Laporan
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 flex items-start gap-5">
          <div className="mt-0.5">
            <Clock className="w-5 h-5 text-zinc-900" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-zinc-900 mb-2">Waktu Respon Cepat</h4>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              Kami berkomitmen untuk memberikan resolusi awal atau tanggapan teknis dalam satu hari kerja penuh.
            </p>
          </div>
        </div>
        
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 flex items-start gap-5">
          <div className="mt-0.5">
            <Headset className="w-5 h-5 text-zinc-900" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-zinc-900 mb-2">Dukungan Prioritas</h4>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              Laporan Anda ditangani langsung oleh tim Penjaminan Mutu (QA) kami untuk memastikan standar produksi tetap terjaga.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
