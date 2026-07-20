"use client";

type Props = {
  paidPct: number;
  pendingPct: number;
  overduePct: number;
};

export default function PaymentStatusCard({ paidPct, pendingPct, overduePct }: Props) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 flex flex-col gap-6 shadow-sm">
      <h3 className="text-sm font-bold text-black">Payment Status</h3>

      <div className="flex flex-col gap-5 mt-2">
        {/* Paid */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              <span className="text-zinc-600 font-medium">Paid</span>
            </div>
            <span className="font-bold text-black">{paidPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${paidPct}%` }}></div>
          </div>
        </div>

        {/* Pending */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
              <span className="text-zinc-600 font-medium">Pending</span>
            </div>
            <span className="font-bold text-black">{pendingPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#f97316] rounded-full" style={{ width: `${pendingPct}%` }}></div>
          </div>
        </div>

        {/* Overdue */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
              <span className="text-zinc-600 font-medium">Overdue</span>
            </div>
            <span className="font-bold text-black">{overduePct}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#ef4444] rounded-full" style={{ width: `${overduePct}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
