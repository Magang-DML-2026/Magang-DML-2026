"use client";

import { useState } from "react";
import { Check, Plus, Package, Truck, Info, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/db/schema";

export default function NewPurchaseOrderClient({
  products
}: {
  products: Product[];
}) {
  const router = useRouter();

  // State
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(500);
  const [material, setMaterial] = useState<string>("Standard EPDM (Black)");
  const [notes, setNotes] = useState<string>("");
  const [warehouse, setWarehouse] = useState<string>("cikarang"); // cikarang or surabaya
  const [shippingMethod, setShippingMethod] = useState<string>("internal"); // internal or 3rdparty
  const [paymentTerms, setPaymentTerms] = useState<string>("Net 30 Days");

  // PIN Modal state
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Calculations
  const subtotal = selectedProduct ? selectedProduct.price * quantity : 0;
  
  // Calculate Bulk Discount (example logic: 5% if qty >= 500)
  let discountPercent = 0;
  if (quantity >= 500) discountPercent = 5;
  const discountAmount = Math.floor(subtotal * (discountPercent / 100));

  // Shipping Cost (example logic)
  const shippingCost = shippingMethod === "internal" ? 1200000 : 0; // Rp 1.2M internally, 0 for 3rd party pickup

  // VAT 11%
  const taxableAmount = subtotal - discountAmount + shippingCost;
  const vatAmount = Math.floor(taxableAmount * 0.11);

  const grandTotal = taxableAmount + vatAmount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleConfirmOrder = () => {
    if (!selectedProduct) return alert("Please select a product first.");
    if (quantity < 1) return alert("Quantity must be at least 1.");
    setShowPinModal(true);
  };

  const handleNumpadClick = (num: string) => {
    if (pin.length < 6) setPin((prev) => prev + num);
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      setIsProcessing(true);
      // Simulate network request
      setTimeout(() => {
        setIsProcessing(false);
        setShowPinModal(false);
        router.push(`/dashboard/transactions/success?id=PO-4922&total=${grandTotal}`);
      }, 1000);
    } else {
      alert("Masukkan 6 digit PIN");
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans bg-white min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight">Create New Purchase Order</h1>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[14px] text-zinc-500">
            Configure your industrial rubber product requirements for bulk fulfillment.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-bold text-[#cc4224] px-4 py-2 bg-[#fdf5f3] rounded-md border border-[#f5d9d3]">
              Draft PO #4922
            </span>
            <button 
              onClick={() => {
                setSelectedProductId(null);
                setQuantity(500);
                setNotes("");
              }}
              className="text-[13px] font-bold text-zinc-600 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="flex items-center justify-between relative max-w-2xl mx-auto mb-16 z-0 px-2">
        {/* Background line */}
        <div className="absolute top-4 left-8 right-8 h-[2px] bg-zinc-200 -z-10"></div>
        {/* Active progress */}
        <div className="absolute top-4 left-8 w-[33%] h-[2px] bg-[#cc4224] -z-10"></div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#cc4224] text-white flex items-center justify-center text-[13px] font-bold">1</div>
          <span className="text-[11px] font-bold text-[#cc4224]">Catalog</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center text-[13px] font-bold border border-zinc-200">2</div>
          <span className="text-[11px] font-bold text-zinc-600">Config</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center text-[13px] font-bold border border-zinc-200">3</div>
          <span className="text-[11px] font-bold text-zinc-600">Logistics</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center text-[13px] font-bold border border-zinc-200">4</div>
          <span className="text-[11px] font-bold text-zinc-600">Review</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content (Left) */}
        <div className="flex-1 space-y-8">
          
          {/* Step 1: Catalog */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[#cc4224]" />
              <h2 className="text-[16px] font-bold text-zinc-900">Step 1: Select Products</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.slice(0, 4).map((p) => {
                const isSelected = selectedProductId === p.id;
                return (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${isSelected ? 'border-[#cc4224] ring-1 ring-[#cc4224] bg-orange-50/20' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}
                  >
                    <div className="w-full h-32 bg-zinc-100 rounded-lg mb-4 overflow-hidden">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400">No Image</div>
                      )}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[15px] font-bold text-zinc-900 leading-tight pr-2">{p.name}</h3>
                      <span className="text-[9px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                        {p.category || 'MOLDING'}
                      </span>
                    </div>
                    <p className="text-[12px] text-zinc-500 mb-4 line-clamp-2">
                      {p.description || "High-temperature resistant components designed for industrial systems."}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-[15px] font-bold text-[#cc4224]">
                        {formatCurrency(p.price)} <span className="text-[10px] text-zinc-400 font-normal">/unit</span>
                      </p>
                      <button 
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-[#cc4224] text-white' : 'bg-black text-white'}`}
                      >
                        {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Config */}
          <div className="border border-zinc-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#cc4224]"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              <h2 className="text-[16px] font-bold text-zinc-900">Step 2: Order Configuration</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-2">Order Quantity (Units)</label>
                <input 
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224]"
                />
                {quantity >= 500 && (
                  <p className="text-[11px] font-medium text-[#cc4224] mt-2">
                    Tier 2 Discount Applied (-5%)
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-2">Material Specification</label>
                <select 
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] bg-white"
                >
                  <option value="Standard EPDM (Black)">Standard EPDM (Black)</option>
                  <option value="High-Temp Viton">High-Temp Viton</option>
                  <option value="Food Grade Silicone">Food Grade Silicone</option>
                  <option value="NBR Oil Resistant">NBR Oil Resistant</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-zinc-700 mb-2">Custom Manufacturing Notes</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add specific requirements or reference internal production codes..."
                className="w-full border border-zinc-300 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] min-h-[80px] resize-y"
              ></textarea>
            </div>
          </div>

          {/* Step 3: Logistics */}
          <div className="border border-zinc-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Truck className="w-5 h-5 text-[#cc4224]" />
              <h2 className="text-[16px] font-bold text-zinc-900">Step 3: Logistics & Shipping</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Warehouse */}
              <div>
                <h3 className="text-[13px] font-medium text-zinc-700 mb-3">Delivery Warehouse</h3>
                <div className="space-y-3">
                  <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${warehouse === "cikarang" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <input 
                      type="radio" 
                      name="warehouse" 
                      value="cikarang" 
                      checked={warehouse === "cikarang"}
                      onChange={(e) => setWarehouse(e.target.value)}
                      className="mt-1 w-4 h-4 text-[#cc4224] focus:ring-[#cc4224]" 
                    />
                    <div className="ml-3">
                      <p className="text-[14px] font-bold text-zinc-900">Cikarang Main Hub</p>
                      <p className="text-[11px] text-zinc-500 mt-1">Jl. Jababeka XVII No. 4, Bekasi, West Java</p>
                    </div>
                  </label>
                  <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${warehouse === "surabaya" ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <input 
                      type="radio" 
                      name="warehouse" 
                      value="surabaya" 
                      checked={warehouse === "surabaya"}
                      onChange={(e) => setWarehouse(e.target.value)}
                      className="mt-1 w-4 h-4 text-[#cc4224] focus:ring-[#cc4224]" 
                    />
                    <div className="ml-3">
                      <p className="text-[14px] font-bold text-zinc-900">Surabaya Satellite</p>
                      <p className="text-[11px] text-zinc-500 mt-1">Kawasan Industri SIER, Surabaya</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h3 className="text-[13px] font-medium text-zinc-700 mb-3">Shipping Method</h3>
                <div className="space-y-3">
                  <div 
                    onClick={() => setShippingMethod("internal")}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${shippingMethod === "internal" ? "border-[#0a1526] bg-[#0a1526] text-white" : "border-zinc-200 hover:border-zinc-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 opacity-80" />
                      <div>
                        <p className={`text-[14px] font-bold ${shippingMethod === "internal" ? "text-white" : "text-zinc-900"}`}>DML Internal Logistics</p>
                        <p className={`text-[11px] mt-0.5 ${shippingMethod === "internal" ? "text-zinc-400" : "text-zinc-500"}`}>Preferred partner carrier</p>
                      </div>
                    </div>
                    {shippingMethod === "internal" && (
                      <Check className="w-5 h-5 text-[#cc4224]" />
                    )}
                  </div>
                  <div 
                    onClick={() => setShippingMethod("3rdparty")}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${shippingMethod === "3rdparty" ? "border-[#0a1526] bg-[#0a1526] text-white" : "border-zinc-200 hover:border-zinc-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 16v-6"/><path d="M9 10 7 8"/><path d="M15 16v-6"/><path d="M15 10l2-2"/></svg>
                      <div>
                        <p className={`text-[14px] font-bold ${shippingMethod === "3rdparty" ? "text-white" : "text-zinc-900"}`}>3rd Party Pickup</p>
                        <p className={`text-[11px] mt-0.5 ${shippingMethod === "3rdparty" ? "text-zinc-400" : "text-zinc-500"}`}>Ex-Works terms apply</p>
                      </div>
                    </div>
                    {shippingMethod === "3rdparty" && (
                      <Check className="w-5 h-5 text-[#cc4224]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Order Summary) */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-[#0a1526] rounded-xl p-6 text-white sticky top-6 shadow-xl">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-[16px] font-medium">Order Summary</h2>
              <span className="text-[11px] font-bold text-[#cc4224] bg-[#2a1b18] px-2 py-1 rounded">PO #4922</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <span className="text-[13px] text-zinc-400">
                  {selectedProduct?.name || 'No Product Selected'}
                </span>
                {selectedProduct && (
                  <span className="text-[13px] font-bold bg-zinc-800 px-1.5 py-0.5 rounded ml-2">x{quantity}</span>
                )}
                <span className="text-[13px] font-medium text-white ml-2 text-right">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-4 space-y-3 mb-6">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-zinc-300">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-400">Bulk Discount ({discountPercent}%)</span>
                <span className="text-[#cc4224] font-medium">-{formatCurrency(discountAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-400">Shipping ({shippingMethod === "internal" ? "Internal" : "Pickup"})</span>
                <span className="text-zinc-300">{formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-zinc-400">Estimated VAT (11%)</span>
                <span className="text-zinc-300">{formatCurrency(vatAmount)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 mb-8 border-t border-zinc-800">
              <span className="text-[14px] text-zinc-400">Grand Total</span>
              <span className="text-[24px] font-bold text-[#cc4224]">{formatCurrency(grandTotal)}</span>
            </div>

            <div className="mb-6">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Payment Terms</label>
              <select 
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full bg-[#111e30] border border-zinc-700 rounded-md px-3 py-2.5 text-[14px] text-white outline-none focus:border-[#cc4224]"
              >
                <option value="Net 30 Days">Net 30 Days</option>
                <option value="Net 60 Days">Net 60 Days</option>
                <option value="Payment in Advance">Payment in Advance</option>
              </select>
            </div>

            <button 
              onClick={handleConfirmOrder}
              disabled={!selectedProduct}
              className="w-full bg-[#cc4224] text-white font-bold text-[14px] py-3 rounded-md hover:bg-[#b0351b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Confirm Purchase Order
            </button>
            <button className="w-full bg-transparent text-zinc-400 font-medium text-[13px] py-2 hover:text-white transition-colors">
              Save as Draft
            </button>

            <div className="mt-6 flex items-start gap-2 bg-[#111e30] border border-zinc-800 rounded-lg p-3">
              <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                Pricing is based on contractual agreement #DML-AST-2024.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-[400px] w-full shadow-2xl relative">
            <button 
              onClick={() => {
                setShowPinModal(false);
                setPin("");
              }} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-8 mt-2">
              <h3 className="text-[20px] font-bold text-zinc-900 mb-2">Security Verification</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                Masukkan 6 digit PIN keamanan Anda untuk mengkonfirmasi pesanan ini.
              </p>
            </div>
            
            {/* PIN Boxes */}
            <div className="flex gap-2 sm:gap-3 mb-8 justify-center">
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
            <div className="grid grid-cols-3 gap-y-4 gap-x-6 mb-8 text-[20px] font-bold text-zinc-700 w-full px-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button 
                  key={num}
                  type="button"
                  onClick={() => handleNumpadClick(num.toString())}
                  className="py-3 hover:bg-zinc-50 rounded-full transition-colors text-center"
                >
                  {num}
                </button>
              ))}
              <div></div>
              <button 
                type="button"
                onClick={() => handleNumpadClick("0")}
                className="py-3 hover:bg-zinc-50 rounded-full transition-colors text-center"
              >
                0
              </button>
              <button 
                type="button"
                onClick={handleDelete}
                className="py-3 hover:bg-zinc-50 rounded-full transition-colors text-zinc-400 text-center flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 4-9 9 9 9"/><path d="m11 4-9 9 9 9"/></svg>
              </button>
            </div>
            
            <button 
              onClick={handlePinSubmit}
              disabled={pin.length < 6 || isProcessing}
              className={`w-full py-3.5 text-white font-bold text-[14px] rounded-xl transition-colors shadow-sm text-center flex items-center justify-center gap-2
                ${pin.length === 6 && !isProcessing ? 'bg-[#cc4224] hover:bg-[#b0351b]' : 'bg-zinc-300 cursor-not-allowed'}
              `}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : "Konfirmasi Pesanan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
