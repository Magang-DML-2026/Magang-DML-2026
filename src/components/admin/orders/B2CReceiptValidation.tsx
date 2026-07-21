"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { ImageLightbox } from "@/components/admin/orders/ImageLightbox";
import { Receipt, mockReceipts } from "@/components/admin/orders/receiptData";

type Props = {
  onOpenReject: (receipt: Receipt) => void;
};

export function B2CReceiptValidation({ onOpenReject }: Props) {
  const router = useRouter();
  const [zoomedReceipt, setZoomedReceipt] = useState<Receipt | null>(null);

  return (
    <>
      <div className="w-[320px] shrink-0 flex flex-col h-full bg-[#f8f9fa] border-l border-zinc-200">
        <div className="p-4 border-b border-zinc-200 flex items-center gap-2">
          <FileText className="w-5 h-5 text-black" />
          <h2 className="font-semibold text-black text-sm">B2C Receipt Validation</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {mockReceipts.map((receipt) => (
            <div key={receipt.id} className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-xs shrink-0">
                    {receipt.customerInitials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-black leading-tight">{receipt.customerName}</h3>
                    <p className="text-xs text-zinc-500">{receipt.orderId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#f05c35]">IDR</p>
                  <p className="text-sm font-bold text-[#f05c35]">{receipt.amount}</p>
                </div>
              </div>

              {/* Clickable Receipt Thumbnail */}
              <button
                type="button"
                onClick={() => setZoomedReceipt(receipt)}
                className="w-full relative h-[120px] bg-zinc-100 rounded-lg overflow-hidden group mb-4 focus:outline-none focus:ring-2 focus:ring-[#d94a26] focus:ring-offset-2"
                title="Click to zoom receipt"
              >
                <img
                  src={receipt.imageUrl}
                  alt={`Receipt for ${receipt.orderId}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                  <span className="text-white text-xs font-semibold">Click to Zoom Receipt</span>
                </div>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => onOpenReject(receipt)}
                  className="flex-1 py-2 bg-zinc-100 hover:bg-red-50 hover:text-red-700 hover:border hover:border-red-200 text-black font-semibold text-xs rounded-md transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => router.push(`/admin/orders/verify/${receipt.id}`)}
                  className="flex-1 py-2 bg-black hover:bg-zinc-800 text-white font-semibold text-xs rounded-md transition-colors"
                >
                  Verify Payment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative empty state bottom */}
        <div className="h-16 bg-gradient-to-t from-zinc-100 to-transparent pointer-events-none mt-auto" />
      </div>

      {/* Lightbox — rendered outside sidebar to cover full screen */}
      <ImageLightbox
        src={zoomedReceipt?.imageUrl ?? ""}
        alt={`Receipt ${zoomedReceipt?.orderId}`}
        label={`PAYMENT_RECEIPT_${zoomedReceipt?.customerInitials}_88.JPG  •  ${zoomedReceipt?.customerName}  •  IDR ${zoomedReceipt?.amount}`}
        isOpen={!!zoomedReceipt}
        onClose={() => setZoomedReceipt(null)}
      />
    </>
  );
}
