"use client";

export default function CategoryCTA() {
  return (
    <section className="w-full bg-[#f1f1f1] py-20 px-6">
      <div className="max-w-[800px] mx-auto flex flex-col items-center text-center gap-6">
        
        <h2 className="text-3xl font-bold text-black tracking-tight">
          Butuh Produk Karet Khusus?
        </h2>
        
        <p className="text-zinc-600 text-base max-w-2xl leading-relaxed">
          Tim engineering kami siap membantu merancang dan memproduksi komponen karet sesuai dengan spesifikasi teknis industri Anda.
        </p>

        <div className="flex items-center justify-center gap-4 mt-4 w-full flex-col sm:flex-row">
          <button className="w-full sm:w-auto bg-[#c0391d] text-white px-8 py-3.5 rounded-sm text-sm font-bold tracking-wide hover:bg-[#a63018] transition-colors shadow-md">
            Konsultasi Gratis
          </button>
          <button className="w-full sm:w-auto bg-transparent text-zinc-700 border-2 border-zinc-300 px-8 py-3.5 rounded-sm text-sm font-bold tracking-wide hover:bg-zinc-200 hover:text-black transition-colors">
            Unduh Katalog PDF
          </button>
        </div>

      </div>
    </section>
  );
}
