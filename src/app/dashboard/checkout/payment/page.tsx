import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

export default async function PaymentVerificationPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex items-center justify-center p-4">
      
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm max-w-[450px] w-full relative">
        <Link href="/dashboard/checkout" className="absolute left-8 top-8 text-zinc-400 hover:text-zinc-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
            <Lock className="w-8 h-8" />
          </div>
          
          <h1 className="text-[22px] font-bold text-zinc-900 mb-2">Verifikasi Pembayaran</h1>
          <p className="text-[13px] text-zinc-500 mb-8 max-w-[280px]">
            Masukkan 6 digit PIN keamanan untuk mengkonfirmasi pembayaran sebesar <strong className="text-zinc-900">Rp 57.000.000</strong>.
          </p>
          
          {/* PIN Boxes (Mock) */}
          <div className="flex gap-2 sm:gap-3 mb-10">
            <div className="w-10 h-12 sm:w-12 sm:h-14 bg-zinc-50 border-2 border-[#cc4224] rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-900"></div>
            <div className="w-10 h-12 sm:w-12 sm:h-14 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-900"></div>
            <div className="w-10 h-12 sm:w-12 sm:h-14 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-900"></div>
            <div className="w-10 h-12 sm:w-12 sm:h-14 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-900"></div>
            <div className="w-10 h-12 sm:w-12 sm:h-14 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-900"></div>
            <div className="w-10 h-12 sm:w-12 sm:h-14 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-900"></div>
          </div>
          
          {/* Numpad (Mock visual) */}
          <div className="grid grid-cols-3 gap-y-4 gap-x-10 mb-10 text-[20px] font-bold text-zinc-700 w-full px-8">
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">1</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">2</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">3</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">4</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">5</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">6</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">7</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">8</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">9</button>
            <div></div>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors">0</button>
            <button className="py-2 hover:bg-zinc-50 rounded-full transition-colors text-zinc-400">⌫</button>
          </div>
          
          <Link href="/dashboard/checkout/success" className="w-full py-4 bg-[#cc4224] text-white font-bold text-[15px] rounded-xl hover:bg-[#b0351b] transition-colors shadow-sm text-center">
            Konfirmasi PIN
          </Link>
          
        </div>
      </div>
      
    </div>
  );
}
