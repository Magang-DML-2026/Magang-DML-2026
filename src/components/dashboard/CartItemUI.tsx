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

  const sku = `SKU: RS-${item.product.name.substring(0,4).toUpperCase()}-CUST`;

  return (
    <div className={`px-6 py-5 bg-white transition-opacity flex items-center justify-between hover:bg-zinc-50 ${isUpdating ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Product Image & Info */}
      <div className="w-[45%] flex items-center gap-4 pr-4">
        <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-90 mix-blend-multiply"
            style={{ backgroundImage: `url(${item.product.imageUrl || 'https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80'})` }}
          ></div>
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-zinc-900">{item.product.name}</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5 tracking-wide">{sku}</p>
        </div>
      </div>

      {/* Price */}
      <div className="w-[15%] text-center">
        <p className="text-[13px] font-semibold text-zinc-600">Rp {item.product.price.toLocaleString("id-ID")}</p>
      </div>

      {/* Quantity */}
      <div className="w-[20%] flex justify-center">
        <div className="flex items-center border border-zinc-300 rounded overflow-hidden shadow-sm h-8">
          <button 
            onClick={() => handleUpdate(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
            className="w-8 h-full bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-600 transition-colors disabled:opacity-50"
          >
            <Minus className="w-3 h-3" />
          </button>
          <div className="w-10 text-center text-[12px] font-bold text-zinc-900 border-l border-r border-zinc-300 bg-white">
            {item.quantity}
          </div>
          <button 
            onClick={() => handleUpdate(item.quantity + 1)}
            disabled={isUpdating}
            className="w-8 h-full bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-600 transition-colors disabled:opacity-50"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="w-[15%] text-right">
        <p className="text-[13px] font-bold text-zinc-900">Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}</p>
      </div>

      {/* Action */}
      <div className="w-[5%] flex justify-end">
        <button 
          onClick={handleRemove}
          disabled={isUpdating}
          className="text-[#cc4224] hover:text-[#b0351b] transition-colors p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
          title="Remove Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
