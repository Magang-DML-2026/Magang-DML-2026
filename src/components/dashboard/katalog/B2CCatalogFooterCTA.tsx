"use client";

export default function B2CCatalogFooterCTA() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Butuh Solusi Karet Kustom?</h2>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
          Tim ahli kami siap membantu Anda merancang dan memproduksi komponen karet sesuai spesifikasi teknis industri Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button className="bg-[#cc4224] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#b0351b] transition-colors w-full sm:w-auto">
            Hubungi Sales Kami
          </button>
          <button className="bg-transparent text-white border border-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto">
            Pelajari Layanan
          </button>
        </div>
      </div>
    </section>
  );
}
