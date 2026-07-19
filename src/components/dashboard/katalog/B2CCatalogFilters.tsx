"use client";

export default function B2CCatalogFilters() {
  return (
    <div className="w-full flex flex-col gap-6 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <h2 className="text-[16px] font-bold text-zinc-900">Filter</h2>
        <button className="text-[12px] font-bold text-[#cc4224] hover:underline">Reset</button>
      </div>

      {/* Kategori */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[12px] font-bold text-zinc-900">Kategori</h3>
        <div className="flex flex-col gap-2.5">
          {["Rubber Seals", "Rubber Soles", "Mudguards", "Custom Parts"].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#cc4224] focus:ring-[#cc4224]" />
              <span className="text-[13px] text-zinc-700 group-hover:text-zinc-900">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rentang Harga */}
      <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100">
        <h3 className="text-[12px] font-bold text-zinc-900">Rentang Harga (IDR)</h3>
        <div className="pt-2">
          {/* Simulated Range Slider Track */}
          <div className="w-full h-1 bg-zinc-200 rounded-full relative mb-4">
            <div className="absolute left-[10%] right-[30%] h-full bg-[#cc4224] rounded-full"></div>
            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#cc4224] rounded-full shadow-sm"></div>
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#cc4224] rounded-full shadow-sm"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-medium">Rp 0</span>
            <span className="text-[10px] text-zinc-500 font-medium">Rp 2.500.000+</span>
          </div>
        </div>
      </div>

      {/* Standar Industri */}
      <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100">
        <h3 className="text-[12px] font-bold text-zinc-900">Standar Industri</h3>
        <div className="flex flex-wrap gap-2">
          {["ISO 9001", "ASTM", "Automotive Grade"].map((std) => (
            <span key={std} className="px-3 py-1.5 bg-zinc-100 text-zinc-600 text-[11px] font-medium rounded-md border border-zinc-200 cursor-pointer hover:bg-zinc-200 transition-colors">
              {std}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
