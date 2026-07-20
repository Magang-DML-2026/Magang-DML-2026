"use client";

import { useRouter } from "next/navigation";
import AddressForm from "./AddressForm";
import { X } from "lucide-react";

export default function CheckoutAddressModal() {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/dashboard/checkout", { scroll: false });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button 
          onClick={handleClose}
          className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-900 transition-colors bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-8 pb-4">
          <h2 className="text-[20px] font-bold text-zinc-900">Add New Address</h2>
          <p className="text-[13px] text-zinc-500 mt-1">Enter your shipping details below.</p>
        </div>
        <div className="px-8 pb-8">
          <AddressForm onClose={handleClose} />
        </div>
      </div>
    </div>
  );
}
