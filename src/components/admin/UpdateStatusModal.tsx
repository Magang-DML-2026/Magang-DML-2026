import { useState } from "react"
import { X, RefreshCw } from "lucide-react"

interface UpdateStatusModalProps {
  orderId: string;
  onClose: () => void;
}

export function UpdateStatusModal({ orderId, onClose }: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState("processing")

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center animate-in fade-in duration-200 p-4">
      <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Update Status</h2>
            <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">Order {orderId}</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-[13px] text-gray-600 font-medium">
            Select the current operational status for this order. This will trigger notifications to the production floor and client dashboard.
          </p>

          <div className="space-y-3">
            {/* Processing Option */}
            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${selectedStatus === 'processing' ? 'bg-[#ffedd5]/50 border-[#c2410c]' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex-shrink-0 ml-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedStatus === 'processing' ? 'border-[#c2410c]' : 'border-gray-300'}`}>
                  {selectedStatus === 'processing' && <div className="w-2.5 h-2.5 rounded-full bg-[#c2410c]"></div>}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-sm">Processing</div>
                <div className="text-[12px] text-gray-500 font-medium mt-0.5">Currently in the manufacturing queue</div>
              </div>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m7 19 5 3 5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 17 3-5-3-5"/></svg>
              </div>
            </label>

            {/* Shipped Option */}
            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${selectedStatus === 'shipped' ? 'bg-[#ffedd5]/50 border-[#c2410c]' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex-shrink-0 ml-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedStatus === 'shipped' ? 'border-[#c2410c]' : 'border-gray-300'}`}>
                  {selectedStatus === 'shipped' && <div className="w-2.5 h-2.5 rounded-full bg-[#c2410c]"></div>}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-sm">Shipped</div>
                <div className="text-[12px] text-gray-500 font-medium mt-0.5">Handed over to logistics carrier</div>
              </div>
            </label>

            {/* Delivered Option */}
            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${selectedStatus === 'delivered' ? 'bg-[#ffedd5]/50 border-[#c2410c]' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex-shrink-0 ml-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedStatus === 'delivered' ? 'border-[#c2410c]' : 'border-gray-300'}`}>
                  {selectedStatus === 'delivered' && <div className="w-2.5 h-2.5 rounded-full bg-[#c2410c]"></div>}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-sm">Delivered</div>
                <div className="text-[12px] text-gray-500 font-medium mt-0.5">Confirmed arrival at destination</div>
              </div>
            </label>

            {/* On Hold Option */}
            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${selectedStatus === 'on_hold' ? 'bg-[#ffedd5]/50 border-[#c2410c]' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex-shrink-0 ml-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedStatus === 'on_hold' ? 'border-[#c2410c]' : 'border-gray-300'}`}>
                  {selectedStatus === 'on_hold' && <div className="w-2.5 h-2.5 rounded-full bg-[#c2410c]"></div>}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-sm">On Hold</div>
                <div className="text-[12px] text-gray-500 font-medium mt-0.5">Production paused awaiting material</div>
              </div>
            </label>
          </div>

          <div className="pt-2">
            <label className="block text-[11px] font-bold text-gray-700 mb-2">Internal Notes (Optional)</label>
            <textarea 
              className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-lg text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none transition-shadow"
              placeholder="Add specific details for the ops team..."
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#fcfcfd] border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="flex items-center gap-2 px-5 py-2.5 bg-[#b73719] hover:bg-[#9a2d14] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" />
            Update Status
          </button>
        </div>

      </div>
    </div>
  )
}
