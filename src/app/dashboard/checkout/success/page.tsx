import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, FileText, HelpCircle, Building2, CreditCard, Receipt, Download, ArrowRight, Home } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex flex-col">
      
      {/* Main Content Area */}
      <div className="flex-1 w-full py-16 px-4 flex flex-col items-center">
          
          {/* Success Card */}
          <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
            
            <div className="p-10 flex flex-col items-center text-center">
              {/* Check Icon */}
              <div className="w-16 h-16 bg-[#ff623d] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#ff623d]/20">
                <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={3} />
              </div>

              <h1 className="text-[26px] font-bold text-zinc-900 mb-3 tracking-tight">Payment Successful!</h1>
              <p className="text-[12px] text-zinc-500 leading-relaxed mb-8 max-w-[300px]">
                Your order <strong className="text-zinc-700">#{txId}</strong> has been placed and is being processed.
              </p>

              {/* Summary Box */}
              <div className="w-full bg-[#f8f9fa] rounded-xl p-5 border border-zinc-100 text-left mb-8">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200">
                  <Receipt className="w-4 h-4 text-zinc-700" />
                  <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">Transaction Summary</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-zinc-500 font-medium">Total Paid</span>
                    <span className="text-[13px] font-bold text-[#cc4224]">IDR {tx.totalAmount.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-zinc-500 font-medium">Payment Method</span>
                    <span className="text-[12px] font-bold text-zinc-800 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-zinc-400" /> Bank Transfer
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-zinc-500 font-medium">Transaction Date</span>
                    <span className="text-[12px] font-bold text-zinc-800">
                      {tx.paidAt ? tx.paidAt.toLocaleString("id-ID", { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB' : new Date().toLocaleString("id-ID", { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-zinc-500 font-medium">Status</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded tracking-wider">VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <Link href={`/dashboard/transactions/${txId}/tracking`} className="flex-1 bg-[#cc4224] hover:bg-[#b0351b] text-white py-3 rounded-lg text-[13px] font-bold transition-colors flex items-center justify-center gap-2">
                  View Order Status <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/dashboard" className="flex-1 bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 py-3 rounded-lg text-[13px] font-bold transition-colors flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" /> Back to Home
                </Link>
              </div>
            </div>

            {/* Dark Blue Footer in Card */}
            <div className="bg-[#1e293b] w-full p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 text-slate-300">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed max-w-[200px]">
                  An invoice has been sent to your registered email address.
                </p>
              </div>
              <div className="flex gap-4 text-[11px] font-medium text-slate-300">
                <Link href={`/dashboard/invoices/preview?txId=${txId}`} className="hover:text-white transition-colors border-b border-slate-600 hover:border-slate-400 pb-0.5">Download PDF</Link>
                <Link href="/dashboard/support" className="hover:text-white transition-colors border-b border-slate-600 hover:border-slate-400 pb-0.5">Need Help?</Link>
              </div>
            </div>

          </div>
        </div>

      {/* Global Footer */}
      <div className="w-full bg-[#000000] flex justify-between items-center p-8 px-12 text-zinc-400 mt-auto">
        <div>
          <div className="text-[13px] font-bold text-white mb-1">Duta Mitra Luhur</div>
          <div className="text-[11px]">© 2024 PT Duta Mitra Luhur. Precision Engineered Industrial Solutions.</div>
        </div>
        <div className="flex gap-6 text-[12px]">
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
      </div>

    </div>
  );
}
