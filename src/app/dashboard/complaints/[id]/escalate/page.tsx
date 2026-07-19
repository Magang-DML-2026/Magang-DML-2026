import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PhoneCall, CalendarClock, Phone, CheckCircle2 } from "lucide-react";

export default async function EscalateManagerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const complaintId = resolvedParams.id;
  const isSuccess = resolvedSearchParams.success === "true";

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-[calc(100vh-64px)] flex flex-col justify-center items-center py-12">
      
      {!isSuccess ? (
        <div className="w-full max-w-[800px]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-8">
            <Link href={`/dashboard/complaints/${complaintId}`} className="hover:text-zinc-800 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Detail
            </Link>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-400">Hubungi Manager</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Left Col: Manager Profile */}
            <div className="w-full md:w-5/12 bg-[#0f172a] p-8 text-white relative overflow-hidden flex flex-col justify-between">
              {/* Decor */}
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              
              <div>
                <h2 className="text-[20px] font-bold text-white mb-8 relative z-10">
                  Hubungi Manager
                </h2>
                
                <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl">
                   <div className="w-16 h-16 rounded-full bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center mb-4 ring-2 ring-white/20"></div>
                   <h3 className="text-[16px] font-bold text-white">Bpk. Aditya Pratama</h3>
                   <p className="text-[12px] text-blue-300 mt-1 mb-4 font-medium">Quality Assurance Manager</p>
                   
                   <p className="text-[13px] text-zinc-300 leading-relaxed border-t border-white/10 pt-4">
                     "Kepuasan pelanggan adalah prioritas utama kami. Jika solusi dari CS belum memuaskan, saya siap membantu Anda secara langsung."
                   </p>
                </div>
              </div>
            </div>

            {/* Right Col: Form */}
            <div className="w-full md:w-7/12 p-8">
              <h3 className="text-[18px] font-bold text-zinc-900 mb-2">
                Jadwalkan Panggilan Balik
              </h3>
              <p className="text-[13px] text-zinc-500 mb-8 leading-relaxed">
                Masalah Anda belum terselesaikan? Ajukan permintaan panggilan balik agar Manager kami dapat menghubungi Anda secara langsung terkait Tiket <strong>#{complaintId}</strong>.
              </p>
              
              <form action={`/dashboard/complaints/${complaintId}/escalate`} className="space-y-6">
                <input type="hidden" name="success" value="true" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">
                      Jadwal Panggilan
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <CalendarClock className="w-4 h-4" />
                      </div>
                      <select className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] font-medium text-zinc-900 focus:outline-none focus:border-[#cc4224] transition-colors appearance-none cursor-pointer">
                        <option value="today">Hari ini</option>
                        <option value="tomorrow">Besok</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">
                      Waktu
                    </label>
                    <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] font-medium text-zinc-900 focus:outline-none focus:border-[#cc4224] transition-colors appearance-none cursor-pointer">
                      <option value="morning">10:00 - 12:00</option>
                      <option value="afternoon">13:00 - 15:00</option>
                      <option value="evening">15:00 - 17:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Contoh: 08123456789" 
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[13px] font-medium text-zinc-900 focus:outline-none focus:border-[#cc4224] transition-colors"
                      defaultValue="081234567890"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-2">Pastikan nomor ini aktif dan dapat menerima panggilan.</p>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-3.5 bg-[#cc4224] text-white font-bold text-[14px] rounded-lg hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2">
                    <PhoneCall className="w-4 h-4" />
                    Jadwalkan Panggilan
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="w-full max-w-[500px] bg-white border border-zinc-200 rounded-2xl p-10 text-center shadow-sm">
           <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
             <CheckCircle2 className="w-10 h-10 text-emerald-500" />
           </div>
           
           <h2 className="text-[22px] font-bold text-zinc-900 mb-3">
             Permintaan Panggilan Balik Berhasil
           </h2>
           <p className="text-[14px] text-zinc-500 mb-8 leading-relaxed">
             Jadwal Anda telah kami terima. Manager kami (Bpk. Aditya) akan segera menghubungi Anda pada waktu yang telah ditentukan.
           </p>
           
           <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5 mb-8 text-left space-y-4">
             <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
               <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">Jadwal Panggilan</span>
               <span className="text-[14px] font-semibold text-zinc-900">Hari ini, 13:00 - 15:00</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">No. Telepon</span>
               <span className="text-[14px] font-semibold text-zinc-900">081234567890</span>
             </div>
           </div>
           
           <Link 
             href={`/dashboard/complaints/${complaintId}`} 
             className="w-full inline-block py-3.5 bg-white border-2 border-zinc-200 text-zinc-700 font-bold text-[14px] rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
           >
             Kembali ke Detail Tiket
           </Link>
        </div>
      )}
      
    </div>
  );
}
