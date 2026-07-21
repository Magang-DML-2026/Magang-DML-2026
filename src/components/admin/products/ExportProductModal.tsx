"use client";

import { useState, useEffect } from "react";
import { FileText, CheckCircle2, Loader2, Circle, X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ExportProductModal({ isOpen, onClose }: Props) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setStep(1);
      return;
    }

    // Simulate progress
    const timer1 = setTimeout(() => {
      setProgress(15);
      setStep(1);
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(45);
      setStep(2);
    }, 1500);

    const timer3 = setTimeout(() => {
      setProgress(85);
      setStep(3);
    }, 3500);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setStep(4);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={step === 4 ? onClose : undefined} />
      
      {/* Modal */}
      <div className="bg-[#f9fafb] shadow-2xl w-full max-w-[500px] rounded-xl overflow-hidden relative flex flex-col animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-white px-6 py-5 border-b border-zinc-200 flex items-center gap-4">
          <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-black text-black leading-tight">Exporting Product Data</h2>
            <p className="text-[11px] text-zinc-500 font-medium">Generating DML_Inventory_Export_Q4.csv</p>
          </div>
          {step === 4 && (
            <button onClick={onClose} className="p-1 hover:bg-zinc-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-black uppercase tracking-widest">Current Progress</span>
              <span className="text-[#d94a26] font-black">{progress}%</span>
            </div>
            <div className="h-3 w-full bg-zinc-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#b2391b] to-[#d94a26] transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>

          {/* Process Log */}
          <div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 block">PROCESS LOG</span>
            
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
              
              {/* Step 1 */}
              <div className={`p-4 border-b border-zinc-200 flex gap-4 items-center transition-colors ${step === 1 ? 'bg-orange-50/50' : ''}`}>
                {step > 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-[#d94a26]" />
                ) : (
                  <Loader2 className="w-5 h-5 text-[#d94a26] animate-spin" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-sm ${step >= 1 ? 'text-black' : 'text-zinc-400'}`}>Validating Records</h4>
                  <p className="text-[10px] text-zinc-500">1,248 items checked for integrity</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{step > 1 ? '0.4s' : 'Running'}</span>
              </div>

              {/* Step 2 */}
              <div className={`p-4 border-b border-zinc-200 flex gap-4 items-center transition-colors ${step === 2 ? 'bg-orange-50' : ''}`}>
                {step > 2 ? (
                  <CheckCircle2 className="w-5 h-5 text-[#d94a26]" />
                ) : step === 2 ? (
                  <Loader2 className="w-5 h-5 text-[#d94a26] animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-300" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-sm ${step >= 2 ? (step === 2 ? 'text-[#d94a26]' : 'text-black') : 'text-zinc-400'}`}>Compiling SKU Data</h4>
                  <p className={`text-[10px] ${step === 2 ? 'text-[#d94a26]/70' : 'text-zinc-500'}`}>Mapping pricing and manufacturing logs...</p>
                </div>
                <span className={`text-[10px] font-mono ${step === 2 ? 'text-[#d94a26]' : 'text-zinc-400'}`}>{step > 2 ? '1.8s' : step === 2 ? 'Running' : 'Waiting'}</span>
              </div>

              {/* Step 3 */}
              <div className={`p-4 flex gap-4 items-center transition-colors ${step === 3 ? 'bg-orange-50' : ''}`}>
                {step > 3 ? (
                  <CheckCircle2 className="w-5 h-5 text-[#d94a26]" />
                ) : step === 3 ? (
                  <Loader2 className="w-5 h-5 text-[#d94a26] animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-300" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-sm ${step >= 3 ? 'text-black' : 'text-zinc-400'}`}>Finalizing File</h4>
                  <p className="text-[10px] text-zinc-500">Compressing and generating secure link</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{step > 3 ? '1.2s' : step === 3 ? 'Running' : 'Waiting'}</span>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-zinc-200 p-4 px-6 flex justify-between items-center">
          <p className="text-[10px] text-zinc-500 max-w-[200px] leading-tight">
            Please do not close this window until the export is complete.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              disabled={step === 4}
              className="px-4 py-2 bg-white border border-zinc-300 hover:bg-zinc-50 text-black font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              disabled={step < 4}
              className={`px-4 py-2 font-bold text-xs rounded-lg transition-colors shadow-sm ${
                step === 4 
                ? 'bg-black text-white hover:bg-zinc-800' 
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Download Ready
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
