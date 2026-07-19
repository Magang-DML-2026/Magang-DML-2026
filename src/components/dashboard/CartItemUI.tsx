"use client";

import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { updateCartItemQty, removeCartItem } from "@/app/actions/cart";

export default function CartItemUI({ item }: { item: any }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (newQty: number) => {
    if (newQty < 1) return;
    setIsUpdating(true);
    await updateCartItemQty(item.id, newQty);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await removeCartItem(item.id);
  };

  return (
    <div className={`bg-white border border-zinc-200 rounded-xl p-6 shadow-sm transition-opacity ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex gap-4 sm:gap-6">
        <div className="flex items-start pt-2 shrink-0">
          <input type="checkbox" className="w-5 h-5 accent-[#cc4224] rounded cursor-pointer" defaultChecked />
        </div>
        
        <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-80 mix-blend-multiply"
            style={{ backgroundImage: `url(${item.product.imageUrl || 'https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80'})` }}
          ></div>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-[16px] font-bold text-zinc-900">{item.product.name}</h3>
              <p className="text-[18px] font-bold text-zinc-900 shrink-0">
                Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
              </p>
            </div>
            <p className="text-[13px] text-zinc-500 mt-1">
              Material: {item.product.material || '-'} • Proses: {item.product.process || '-'}
            </p>
            <p className="text-[13px] font-bold text-[#cc4224] mt-2">
              Rp {item.product.price.toLocaleString("id-ID")} <span className="text-zinc-500 font-normal">/ pcs</span>
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <button 
              onClick={handleRemove}
              disabled={isUpdating}
              className="text-[13px] font-bold text-[#cc4224] hover:underline flex items-center gap-1 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
            <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => handleUpdate(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-colors disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="px-4 py-1.5 text-[14px] font-bold text-zinc-900 border-l border-r border-zinc-200 bg-white">
                {item.quantity}
              </div>
              <button 
                onClick={() => handleUpdate(item.quantity + 1)}
                disabled={isUpdating}
                className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
