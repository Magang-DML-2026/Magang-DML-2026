"use client";

import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/app/actions/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmptyCartUI() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSimulateAdd = async () => {
    setLoading(true);
    // Hardcoded Product ID 1 (EPDM Rubber Seals) from our seeder
    await addToCart(1, 5000); 
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-10 shadow-sm text-center">
      <ShoppingCart className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-zinc-900 mb-2">Keranjang Belanja Kosong</h3>
      <p className="text-zinc-500 text-[14px] mb-6">Anda belum menambahkan produk apapun ke dalam keranjang.</p>
      
      <button 
        onClick={handleSimulateAdd}
        disabled={loading}
        className="px-6 py-3 bg-[#cc4224] text-white font-bold text-[14px] rounded-lg hover:bg-[#b0351b] transition-colors disabled:opacity-50"
      >
        {loading ? "Menambahkan..." : "Simulasikan Tambah EPDM Rubber Seals (5.000 Pcs)"}
      </button>
    </div>
  );
}
