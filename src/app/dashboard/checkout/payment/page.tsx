import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";
import PinInput from "@/components/dashboard/PinInput";

export default async function PaymentVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ txId?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const resolvedParams = await searchParams;
  const txId = resolvedParams.txId;
  if (!txId) redirect("/dashboard/cart");

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
            Masukkan 6 digit PIN keamanan untuk mengkonfirmasi pembayaran untuk tagihan <strong className="text-zinc-900">{txId}</strong>.
          </p>
          
          {/* Interactive PIN Component */}
          <PinInput txId={txId} />
          
        </div>
      </div>
      
    </div>
  );
}
