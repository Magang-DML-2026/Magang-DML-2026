import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Search, MessageCircle, Mail, ChevronDown, BookOpen, AlertCircle } from "lucide-react";

export default async function SupportPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Header */}
      <div className="bg-[#0f172a] rounded-2xl p-10 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#cc4224] rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-[32px] font-bold text-white tracking-tight mb-3">
            Pusat Bantuan Pelanggan
          </h1>
          <p className="text-[14px] text-zinc-300 mb-8">
            Temukan jawaban untuk pertanyaan umum atau hubungi tim dukungan kami untuk bantuan lebih lanjut.
          </p>
          
          <div className="relative max-w-lg mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Cari topik bantuan (contoh: komplain, pembayaran)..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[14px] text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#cc4224]/50 focus:border-[#cc4224] transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: FAQ */}
        <div className="w-full lg:w-2/3 space-y-4">
          <h2 className="text-[18px] font-bold text-zinc-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#cc4224]" />
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          
          <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
            {/* Accordion Item 1 (Expanded) */}
            <div className="border-b border-zinc-100 last:border-0">
              <button className="w-full px-6 py-5 flex justify-between items-center bg-zinc-50 hover:bg-zinc-100 transition-colors text-left">
                <span className="text-[14px] font-bold text-[#cc4224]">Bagaimana cara melakukan pesanan khusus (Custom B2B)?</span>
                <ChevronDown className="w-5 h-5 text-[#cc4224] rotate-180 transition-transform" />
              </button>
              <div className="px-6 pb-5 pt-2 bg-zinc-50 text-[14px] text-zinc-600 leading-relaxed">
                Untuk pesanan custom B2B, Anda dapat menghubungi tim sales kami langsung melalui email atau WhatsApp. Anda juga bisa mengunggah desain blueprint (CAD) pada form konsultasi, lalu tim kami akan memberikan estimasi biaya (Quotation) dalam waktu 2x24 jam kerja.
              </div>
            </div>

            {/* Accordion Item 2 */}
            <div className="border-b border-zinc-100 last:border-0">
              <button className="w-full px-6 py-5 flex justify-between items-center hover:bg-zinc-50 transition-colors text-left">
                <span className="text-[14px] font-semibold text-zinc-900">Apa syarat pengajuan komplain barang rusak?</span>
                <ChevronDown className="w-5 h-5 text-zinc-400 transition-transform" />
              </button>
            </div>

            {/* Accordion Item 3 */}
            <div className="border-b border-zinc-100 last:border-0">
              <button className="w-full px-6 py-5 flex justify-between items-center hover:bg-zinc-50 transition-colors text-left">
                <span className="text-[14px] font-semibold text-zinc-900">Berapa lama proses produksi dilakukan?</span>
                <ChevronDown className="w-5 h-5 text-zinc-400 transition-transform" />
              </button>
            </div>

            {/* Accordion Item 4 */}
            <div className="border-b border-zinc-100 last:border-0">
              <button className="w-full px-6 py-5 flex justify-between items-center hover:bg-zinc-50 transition-colors text-left">
                <span className="text-[14px] font-semibold text-zinc-900">Bagaimana cara merubah alamat pengiriman?</span>
                <ChevronDown className="w-5 h-5 text-zinc-400 transition-transform" />
              </button>
            </div>
            
            {/* Accordion Item 5 */}
            <div className="border-b border-zinc-100 last:border-0">
              <button className="w-full px-6 py-5 flex justify-between items-center hover:bg-zinc-50 transition-colors text-left">
                <span className="text-[14px] font-semibold text-zinc-900">Apakah saya bisa mencicil pembayaran Invoice?</span>
                <ChevronDown className="w-5 h-5 text-zinc-400 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Contact CTA */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-[18px] font-bold text-zinc-900 mb-2">Butuh Bantuan Lain?</h3>
            <p className="text-[13px] text-zinc-500 mb-8 leading-relaxed">
              Tim dukungan pelanggan kami siap membantu Anda menyelesaikan masalah atau pertanyaan spesifik mengenai pesanan Anda.
            </p>
            
            <div className="space-y-3">
              <Link href="#" className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#25D366] text-white font-bold text-[13px] rounded-lg hover:bg-[#20bd5a] transition-colors shadow-sm">
                <MessageCircle className="w-4 h-4" />
                Chat via WhatsApp
              </Link>
              <Link href="#" className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-zinc-200 text-zinc-700 font-bold text-[13px] rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                <Mail className="w-4 h-4" />
                Kirim Email
              </Link>
            </div>
            
            <p className="text-[11px] text-center text-zinc-400 mt-6">
              Jam Operasional: 08:00 - 17:00 WIB (Senin-Jumat)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
