"use client";

import { useState } from "react";
import { simulatePayment } from "@/app/actions/checkout";

export default function PinInput({ txId }: { txId: string }) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNumpadClick = (num: string) => {
    if (pin.length < 6) setPin((prev) => prev + num);
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      setLoading(true);
      await simulatePayment(txId);
    } else {
      alert("Masukkan 6 digit PIN");
    }
  };

  return (
    <div className="w-full">
      {/* PIN Boxes */}
      <div className="flex gap-2 sm:gap-3 mb-10 justify-center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index} 
            className={`w-10 h-12 sm:w-12 sm:h-14 bg-zinc-50 border rounded-lg flex items-center justify-center text-2xl font-bold text-zinc-900 transition-colors
              ${pin.length === index ? 'border-[#cc4224] border-2 shadow-sm' : 'border-zinc-200'}
              ${pin.length > index ? 'bg-zinc-100 border-zinc-300' : ''}
            `}
          >
            {pin[index] ? '•' : ''}
          </div>
        ))}
      </div>
      
      {/* Numpad */}
      <div className="grid grid-cols-3 gap-y-4 gap-x-10 mb-10 text-[20px] font-bold text-zinc-700 w-full px-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button 
            key={num}
            type="button"
            onClick={() => handleNumpadClick(num.toString())}
            className="py-2 hover:bg-zinc-50 rounded-full transition-colors text-center"
          >
            {num}
          </button>
        ))}
        <div></div>
        <button 
          type="button"
          onClick={() => handleNumpadClick("0")}
          className="py-2 hover:bg-zinc-50 rounded-full transition-colors text-center"
        >
          0
        </button>
        <button 
          type="button"
          onClick={handleDelete}
          className="py-2 hover:bg-zinc-50 rounded-full transition-colors text-zinc-400 text-center"
        >
          ⌫
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full">
        <button 
          type="submit" 
          disabled={pin.length < 6 || loading}
          className={`w-full py-4 text-white font-bold text-[15px] rounded-xl transition-colors shadow-sm text-center
            ${pin.length === 6 && !loading ? 'bg-[#cc4224] hover:bg-[#b0351b]' : 'bg-zinc-300 cursor-not-allowed'}
          `}
        >
          {loading ? "Memproses..." : "Konfirmasi PIN"}
        </button>
      </form>
    </div>
  );
}
