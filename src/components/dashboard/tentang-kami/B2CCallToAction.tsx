"use client";

export default function B2CCallToAction() {
  return (
    <section className="w-full bg-[#f05c35] py-16 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
            Siap Memulai Proyek Bersama?
          </h2>
          <p className="text-black/80 text-sm md:text-base font-medium">
            Hubungi tim ahli kami untuk solusi manufaktur karet berkualitas tinggi.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto flex-col sm:flex-row">
          <button className="w-full sm:w-auto bg-black text-white px-8 py-3.5 rounded-md text-sm font-bold tracking-wide hover:bg-zinc-800 transition-colors shadow-lg">
            Hubungi Kami
          </button>
          <button className="w-full sm:w-auto bg-transparent text-black border-2 border-black px-8 py-3.5 rounded-md text-sm font-bold tracking-wide hover:bg-black/5 transition-colors">
            Lihat Produk
          </button>
        </div>

      </div>
    </section>
  );
}
