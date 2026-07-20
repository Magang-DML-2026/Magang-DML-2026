import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PhoneCall, Mail, MessageSquare, Clock, Download, BadgeCheck, Map, ExternalLink } from "lucide-react";

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
  const complaintId = resolvedParams.id;
  const resolvedSearchParams = await searchParams;
  const isSuccess = resolvedSearchParams.success === "true";

  if (isSuccess) {
    return (
      <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen flex flex-col justify-center items-center py-12">
        <div className="w-full max-w-[650px] bg-white border border-zinc-200 rounded-2xl p-12 text-center shadow-sm">
           <div className="mx-auto w-16 h-16 rounded-full border-[3px] border-emerald-500 flex items-center justify-center mb-8 p-1">
             <div className="w-full h-full bg-emerald-500 rounded-full flex items-center justify-center">
                <BadgeCheck className="w-8 h-8 text-white" />
             </div>
           </div>
           
           <h2 className="text-[26px] font-bold text-zinc-900 mb-4 tracking-tight">
             Permintaan Berhasil Dikirim
           </h2>
           <p className="text-[14px] text-zinc-500 mb-10 leading-relaxed max-w-[450px] mx-auto">
             Terima kasih telah menghubungi kami. <strong>Bpk. Aditya Pratama</strong> akan segera menghubungi Anda kembali pada waktu yang Anda tentukan untuk mendiskusikan kebutuhan proyek Anda.
           </p>
           
           <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 mb-10 text-left">
             <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-4">Ringkasan Permintaan</p>
             <div className="space-y-3">
               <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                 <span className="text-[13px] text-zinc-600">Tipe Konsultasi</span>
                 <span className="text-[13px] font-bold text-zinc-900">Project Consultation</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[13px] text-zinc-600">Waktu Panggilan</span>
                 <span className="text-[13px] font-bold text-zinc-900">24 Mei 2024, 14:00 WIB</span>
               </div>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-8">
             <Link 
               href={`/dashboard`} 
               className="w-full flex items-center justify-center gap-2 py-4 bg-[#b0351b] text-white font-bold text-[13px] rounded-lg hover:bg-[#8b2915] transition-colors shadow-sm"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
               Kembali ke Dashboard
             </Link>
             
             <Link 
               href={`/dashboard/complaints/${complaintId}/chat`} 
               className="w-full flex items-center justify-center gap-2 py-4 bg-white border-2 border-zinc-900 text-zinc-900 font-bold text-[13px] rounded-lg hover:bg-zinc-50 transition-colors"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/></svg>
               Hubungi Customer Service
             </Link>
           </div>
           
           <div className="flex items-center justify-center gap-8 pt-6 border-t border-zinc-200">
             <div className="flex items-center gap-2 text-zinc-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               <span className="text-[10px] font-medium">Sistem Keamanan Terjamin</span>
             </div>
             <div className="flex items-center gap-2 text-zinc-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
               <span className="text-[10px] font-medium">Industrial Standards</span>
             </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1000px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-8">
        <span className="text-zinc-400">Portal</span>
        <span className="text-zinc-300">›</span>
        <span className="text-[#c54b2c]">Account Support</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Left Column: Manager Profile */}
        <div className="w-full md:w-5/12 flex flex-col gap-4">
          
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm relative">
            <div className="h-28 bg-black"></div>
            
            <div className="px-8 pb-8 relative">
              <div className="absolute -top-12 border-4 border-white rounded-xl overflow-hidden w-24 h-24 bg-white shadow-sm">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              
              <div className="pt-16">
                <h2 className="text-[22px] font-bold text-zinc-900 mb-1 tracking-tight">
                  Bpk. Aditya Pratama
                </h2>
                <p className="text-[10px] font-bold text-[#c54b2c] uppercase tracking-wider mb-4">
                  Senior Key Account Manager
                </p>
                
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-6">
                  Specialist in Large-Scale Industrial Molding & Extrusion Projects. Dedicated to ensuring your manufacturing timeline and quality standards are met with precision.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-4 border border-zinc-200 rounded-lg p-3">
                    <div className="w-8 h-8 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-600 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Email Office</p>
                      <p className="text-[12px] font-bold text-zinc-900">aditya.p@dutamitraluhur.co.id</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border border-zinc-200 rounded-lg p-3">
                    <div className="w-8 h-8 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-600 shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Whatsapp Business</p>
                      <p className="text-[12px] font-bold text-zinc-900">+62 812-3456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border border-zinc-200 rounded-lg p-3">
                    <div className="w-8 h-8 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Office Hours (GMT+7)</p>
                      <p className="text-[12px] font-bold text-zinc-900">Mon - Fri: 08:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-2">
               <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full"></span>
               <span className="text-[12px] font-bold text-zinc-700">Currently Online</span>
             </div>
             <span className="text-[11px] text-zinc-500 font-medium">Response time: ~15 mins</span>
          </div>

        </div>

        {/* Right Column: Content */}
        <div className="w-full md:w-7/12 flex flex-col gap-6">
          
          {/* Request Callback Form */}
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-[18px] font-bold text-zinc-900 mb-2">
              Request Callback
            </h3>
            <p className="text-[13px] text-zinc-500 mb-8 leading-relaxed">
              Cannot reach us right now? Schedule a call and Aditya will get back to you shortly.
            </p>
            
            <form action={`/dashboard/complaints/${complaintId}/escalate`} className="space-y-6">
              <input type="hidden" name="success" value="true" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">
                    Purpose of Call
                  </label>
                  <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-md text-[13px] text-zinc-700 focus:outline-none focus:border-zinc-400 appearance-none cursor-pointer">
                    <option value="consultation">Project Consultation</option>
                    <option value="complaint">Complaint Escalation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">
                    Preferred Time
                  </label>
                  <input 
                    type="text" 
                    placeholder="--:-- --" 
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-md text-[13px] text-zinc-700 focus:outline-none focus:border-zinc-400 placeholder-zinc-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-zinc-900 mb-2 uppercase tracking-wider">
                  Quick Message (Optional)
                </label>
                <textarea 
                  rows={3} 
                  placeholder="Briefly describe what you'd like to discuss..."
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-md text-[13px] text-zinc-700 focus:outline-none focus:border-zinc-400 resize-none placeholder-zinc-400"
                ></textarea>
              </div>

              <div>
                <button type="submit" className="px-6 py-3 bg-[#b0351b] text-white font-bold text-[12px] rounded-md hover:bg-[#8b2915] transition-colors shadow-sm flex items-center justify-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
          
          {/* Action Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111827] text-white p-6 rounded-xl relative overflow-hidden group cursor-pointer shadow-sm">
              <Download className="w-5 h-5 text-blue-400 mb-6" />
              <h4 className="text-[16px] font-bold mb-2">Catalog 2024</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">Download full industrial rubber product specifications.</p>
            </div>
            
            <div className="bg-[#e5e7eb] text-zinc-900 p-6 rounded-xl relative overflow-hidden group cursor-pointer shadow-sm">
              <BadgeCheck className="w-5 h-5 text-[#c54b2c] mb-6" />
              <h4 className="text-[16px] font-bold mb-2">Quality Certs</h4>
              <p className="text-[11px] text-zinc-600 leading-relaxed">View ISO 9001:2015 and industrial safety certifications.</p>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center justify-between shadow-sm hover:bg-zinc-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-600">
                <Map className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-zinc-900">Headquarters - Banten Office</h4>
                <p className="text-[11px] text-zinc-500">Kawasan Industri Sentra Bitung, Blok A-14, Cikupa, Banten.</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400" />
          </div>

        </div>

      </div>
    </div>
  );
}
