import { ShoppingCart } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import Pagination from "@/components/products/Pagination";

// Map some keywords to specific categories for visual purposes, since our DB schema has 'material'/'process' but not a strict 'category'.
function getVisualCategory(name: string) {
  const n = name.toLowerCase();
  if (n.includes("seal") || n.includes("ring") || n.includes("gasket")) return "RUBBER SEALS";
  if (n.includes("sole") || n.includes("sepatu")) return "RUBBER SOLES";
  if (n.includes("mudguard") || n.includes("karpet")) return "MUDGUARDS";
  return "CUSTOM PARTS";
}

export default async function B2CProductGrid() {
  const productList = await db.select().from(products);
  
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-zinc-500 font-medium">
          Menampilkan <span className="text-black font-bold">{productList.length}</span> produk untuk anda
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-zinc-700 font-medium">Urutkan:</span>
          <select className="appearance-none bg-white border border-zinc-200 text-zinc-900 text-[13px] font-medium rounded-lg pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-black/10 cursor-pointer shadow-sm">
            <option>Terbaru</option>
            <option>Harga: Rendah ke Tinggi</option>
            <option>Harga: Tinggi ke Rendah</option>
            <option>Paling Populer</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {productList.map((product, i) => {
          const category = getVisualCategory(product.name);
          const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);
          const isNew = i === 0 || i === 4; // Mocking 'BARU' badge for the first and 5th items

          return (
            <div key={product.id} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              {/* Image Box */}
              <div className="w-full aspect-[4/3] bg-zinc-100 relative overflow-hidden flex items-center justify-center p-6">
                {isNew && (
                  <div className="absolute top-3 left-3 bg-black text-white text-[9px] font-black px-2 py-1 rounded shadow-sm tracking-widest z-10">
                    BARU
                  </div>
                )}
                {product.imageUrl ? (
                  // Use a regular img tag if next/image isn't configured for external domains
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-[12px] border-zinc-800 shadow-lg group-hover:scale-110 transition-transform duration-500"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 mb-1.5">{category}</span>
                <h3 className="text-[15px] font-bold text-zinc-900 leading-snug mb-2 line-clamp-2">{product.name}</h3>
                
                {/* Simulated 5 stars */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-3 h-3 text-[#cc4224]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-400 font-medium">({Math.floor(Math.random() * 80) + 12})</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
                  <span className="font-bold text-[16px] text-zinc-900">{formattedPrice.replace('Rp', 'IDR')}</span>
                  <button className="w-9 h-9 bg-[#cc4224] text-white rounded-lg flex items-center justify-center hover:bg-[#b0351b] transition-colors shadow-sm">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination at the bottom */}
      <div className="mt-8 mb-4 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
}
