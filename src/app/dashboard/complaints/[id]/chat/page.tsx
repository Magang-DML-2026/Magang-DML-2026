import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Send, Paperclip, MoreVertical, Image as ImageIcon } from "lucide-react";

export default async function ComplaintChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await params;
  const complaintId = resolvedParams.id;

  return (
    <div className="p-4 sm:p-8 max-w-[1200px] mx-auto font-sans bg-[#F9FAFB] h-[calc(100vh-64px)] flex flex-col">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6 shrink-0">
        <Link href={`/dashboard/complaints/${complaintId}`} className="hover:text-zinc-800 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali
        </Link>
        <span className="text-zinc-300">|</span>
        <span className="text-zinc-400">Live Chat - Tiket #{complaintId}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Panel: Ticket Info (Hidden on small screens) */}
        <div className="hidden lg:flex w-1/3 bg-white border border-zinc-200 rounded-xl flex-col shadow-sm overflow-hidden">
           <div className="p-6 border-b border-zinc-100 bg-zinc-50">
             <h2 className="text-[16px] font-bold text-zinc-900">Info Tiket</h2>
           </div>
           <div className="p-6 space-y-6 overflow-y-auto">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Nomor Pesanan</p>
                <Link href="/dashboard/transactions/98332" className="text-[14px] font-semibold text-[#cc4224] hover:underline">#98332</Link>
              </div>
              
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Status Laporan</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Sedang Diproses
                </span>
              </div>
              
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Kategori Masalah</p>
                <p className="text-[14px] font-medium text-zinc-900">Barang Cacat / Rusak</p>
              </div>
              
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Rincian Keluhan</p>
                <p className="text-[13px] text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                  Karet seal yang diterima pada batch #DM-9022 ada beberapa yang sobek pada bagian sisinya. Kami membutuhkan penggantian secepatnya.
                </p>
              </div>
           </div>
        </div>
        
        {/* Main Chat Panel */}
        <div className="w-full lg:w-2/3 bg-white border border-zinc-200 rounded-xl shadow-sm flex flex-col overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between bg-white shrink-0">
             <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center ring-2 ring-zinc-100"></div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-zinc-900">Sarah Wijaya</h3>
                  <p className="text-[12px] text-zinc-500 font-medium">Customer Service Specialist</p>
                </div>
             </div>
             <button className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors">
               <MoreVertical className="w-5 h-5" />
             </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/50">
             
             {/* System Message */}
             <div className="flex justify-center mb-6">
                <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                  Hari ini, 15:00 WIB
                </span>
             </div>
             
             {/* Customer (User) Message */}
             <div className="flex flex-col items-end gap-1">
                <div className="max-w-[80%] sm:max-w-[70%] bg-zinc-900 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm">
                  <p className="text-[14px] leading-relaxed">
                    Halo, saya ingin menanyakan status keluhan saya untuk pesanan #98332. Bukti foto sudah saya lampirkan di form tadi.
                  </p>
                </div>
                <span className="text-[11px] text-zinc-400 font-medium mr-1">15:05 WIB • Dibaca</span>
             </div>
             
             {/* Agent Message */}
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center shrink-0 mt-1"></div>
                <div className="flex flex-col items-start gap-1">
                   <div className="max-w-[80%] sm:max-w-[70%] bg-white border border-zinc-200 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                     <p className="text-[14px] text-zinc-800 leading-relaxed">
                       Halo Bapak/Ibu {session.userName}, selamat siang. Mohon maaf atas ketidaknyamanan yang terjadi pada pesanan Anda.
                     </p>
                   </div>
                   <span className="text-[11px] text-zinc-400 font-medium ml-1">15:10 WIB</span>
                </div>
             </div>
             
             {/* Agent Message 2 */}
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full opacity-0 shrink-0"></div> {/* Spacer for alignment */}
                <div className="flex flex-col items-start gap-1">
                   <div className="max-w-[80%] sm:max-w-[70%] bg-white border border-zinc-200 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                     <p className="text-[14px] text-zinc-800 leading-relaxed">
                       Saya telah memeriksa foto yang dilampirkan. Tim gudang kami sedang memverifikasi batch produksi tersebut. Proses verifikasi biasanya memakan waktu sekitar 1-2 jam. Kami akan segera mengabari Anda jika unit pengganti siap dikirimkan.
                     </p>
                   </div>
                   <span className="text-[11px] text-zinc-400 font-medium ml-1">15:11 WIB</span>
                </div>
             </div>
             
          </div>
          
          {/* Chat Input Area */}
          <div className="p-4 bg-white border-t border-zinc-200 shrink-0">
             <div className="flex items-end gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-[#cc4224]/20 focus-within:border-[#cc4224] transition-all">
                <button className="p-2.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors shrink-0">
                   <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors shrink-0">
                   <ImageIcon className="w-5 h-5" />
                </button>
                
                <textarea 
                  rows={1}
                  placeholder="Ketik pesan Anda di sini..."
                  className="w-full bg-transparent text-[14px] text-zinc-800 placeholder-zinc-400 focus:outline-none resize-none py-2.5 max-h-32"
                  style={{ minHeight: '44px' }}
                />
                
                <button className="p-2.5 bg-[#cc4224] text-white hover:bg-[#b0351b] rounded-lg transition-colors shrink-0 shadow-sm">
                   <Send className="w-5 h-5" />
                </button>
             </div>
             <p className="text-[10px] text-center text-zinc-400 mt-2">
               Layanan pelanggan beroperasi pada jam 08:00 - 17:00 WIB (Senin-Jumat).
             </p>
          </div>

        </div>

      </div>
    </div>
  );
}
