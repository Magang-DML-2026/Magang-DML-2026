"use client";

type Props = {
  totalOrders: number;
  b2bCount: number;
  b2cCount: number;
};

export default function StatCard({ totalOrders, b2bCount, b2cCount }: Props) {
  return (
    <div className="bg-[#1a2332] rounded-xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute right-0 bottom-0 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="100" fill="white" />
          <rect x="50" width="50" height="60" fill="white" />
        </svg>
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Today&apos;s Orders</span>
        <span className="text-5xl font-bold tracking-tight">{totalOrders}</span>
      </div>

      <div className="flex items-center gap-8 mt-10 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-zinc-400 font-medium">B2B (Direct)</span>
          <span className="text-xl font-bold">{b2bCount}</span>
        </div>
        <div className="w-[1px] h-8 bg-zinc-700"></div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-zinc-400 font-medium">B2C (Store)</span>
          <span className="text-xl font-bold">{b2cCount}</span>
        </div>
      </div>
    </div>
  );
}
