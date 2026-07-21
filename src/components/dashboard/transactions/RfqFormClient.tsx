"use client";

import { useState } from "react";
import { Send, Settings, FileText, CheckCircle, ShieldCheck, UploadCloud, ChevronDown, Check, File as FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RfqFormClient() {
  const router = useRouter();

  // Form states
  const [projectName, setProjectName] = useState("Rubber Seal Komponen Otomotif X-24");
  const [category, setCategory] = useState("Custom Molding");
  const [quantity, setQuantity] = useState("1000");
  const [material, setMaterial] = useState("");
  const [hardness, setHardness] = useState(60);
  const [notes, setNotes] = useState("");

  // Dropdown state
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categories = [
    "Custom Molding",
    "Extrusion Parts",
    "Industrial Rollers",
    "Vibration Bushings",
    "Rubber Seals",
    "Automotive Components"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/transactions/rfq/success");
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans bg-[#F9FAFB] min-h-screen">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight mb-2">Request for Quotation (RFQ)</h1>
        <p className="text-[14px] text-zinc-500 max-w-2xl leading-relaxed">
          Ajukan penawaran custom order untuk kebutuhan industri Anda. Tim engineering kami akan melakukan review teknis berdasarkan spesifikasi yang Anda berikan.
        </p>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-8 relative">
        <h2 className="text-[11px] font-bold text-[#cc4224] tracking-widest uppercase mb-8">Alur Proses RFQ</h2>
        <div className="flex items-center justify-between relative max-w-4xl mx-auto z-0 px-4">
          {/* Connecting line */}
          <div className="absolute top-6 left-12 right-12 h-[2px] bg-zinc-100 -z-10"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#cc4224] text-white flex items-center justify-center shadow-md shadow-[#cc4224]/30 ring-4 ring-white">
              <Send className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-[13px] font-bold text-zinc-900">Submit RFQ</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Lengkapi form teknis</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 text-zinc-400 flex items-center justify-center ring-4 ring-white">
              <Settings className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-[13px] font-bold text-zinc-400">Technical Review</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Estimasi 24-48 jam</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 text-zinc-400 flex items-center justify-center ring-4 ring-white">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-[13px] font-bold text-zinc-400">Quotation Issued</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Penawaran Harga Resmi</p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 text-zinc-400 flex items-center justify-center ring-4 ring-white">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-[13px] font-bold text-zinc-400">Sample Production</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Validasi Kualitas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Form Detail Proyek */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
              <FileText className="w-5 h-5 text-[#cc4224]" />
              <h2 className="text-[16px] font-bold text-zinc-900">Detail Proyek & Spesifikasi</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-zinc-700 mb-2">Nama Proyek / Identitas Pesanan</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Contoh: Rubber Seal Komponen Otomotif X-24"
                  className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-[14px] text-zinc-900 outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] bg-zinc-50 focus:bg-white transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-[13px] font-bold text-zinc-700 mb-2">Kategori Produk</label>
                  <div 
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className={`w-full border rounded-lg px-4 py-3 text-[14px] flex items-center justify-between cursor-pointer transition-colors ${isCategoryOpen ? 'border-[#cc4224] ring-1 ring-[#cc4224] bg-white' : 'border-zinc-300 bg-zinc-50'}`}
                  >
                    <span className={category ? "text-zinc-900 font-medium" : "text-zinc-400"}>
                      {category || "Pilih Kategori"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-xl z-20 py-2 overflow-hidden">
                      {categories.map((cat) => (
                        <div 
                          key={cat}
                          onClick={() => {
                            setCategory(cat);
                            setIsCategoryOpen(false);
                          }}
                          className={`px-4 py-3 text-[14px] flex items-center justify-between cursor-pointer transition-colors hover:bg-zinc-50 ${category === cat ? 'text-[#cc4224] font-bold bg-orange-50/50' : 'text-zinc-700'}`}
                        >
                          {cat}
                          {category === cat && <Check className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-zinc-700 mb-2">Kuantitas Pesanan (Estimasi)</label>
                  <input 
                    type="text" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Min. 1000"
                    className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-[14px] text-zinc-900 outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] bg-zinc-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-zinc-700 mb-2">Spesifikasi Material / Material Grade</label>
                  <input 
                    type="text" 
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="Contoh: NBR, EPDM, Silicone"
                    className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-[14px] text-zinc-900 outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] bg-zinc-50 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-zinc-700 mb-2 flex items-center justify-between">
                    Hardness (Shore A)
                    <span className="text-[#cc4224]">{hardness}</span>
                  </label>
                  <div className="pt-2">
                    <input 
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={hardness}
                      onChange={(e) => setHardness(parseInt(e.target.value))}
                      className="w-full accent-[#cc4224]"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                    <span>Soft (10)</span>
                    <span>Hard (100)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-zinc-700 mb-2">Instruksi Tambahan & Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sebutkan toleransi dimensi atau requirement khusus lainnya..."
                  className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-[14px] text-zinc-900 outline-none focus:border-[#cc4224] focus:ring-1 focus:ring-[#cc4224] bg-zinc-50 focus:bg-white transition-colors min-h-[100px] resize-y"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Dokumen Teknis */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
              <UploadCloud className="w-5 h-5 text-[#cc4224]" />
              <h2 className="text-[16px] font-bold text-zinc-900">Dokumen Teknis & Blueprints</h2>
            </div>
            
            <div className="border-2 border-dashed border-zinc-300 rounded-xl p-10 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer mb-4">
              <UploadCloud className="w-10 h-10 text-zinc-400 mb-4" />
              <p className="text-[14px] text-zinc-700 font-medium mb-1">
                Tarik dan lepas file di sini, atau <span className="text-[#cc4224] font-bold">Pilih File</span>
              </p>
              <p className="text-[12px] text-zinc-400">
                Dukungan format: PDF, DWG, STEP, JPG (Maks. 20MB)
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-[#fdf5f3] border border-[#f5d9d3] px-4 py-3 rounded-lg w-max">
              <FileIcon className="w-4 h-4 text-[#cc4224]" />
              <span className="text-[13px] font-bold text-[#cc4224]">technical_drawing_v2.dwg</span>
            </div>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="w-full">
          <div className="bg-[#0a1526] rounded-2xl text-white overflow-hidden shadow-xl sticky top-6">
            <div className="p-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#cc4224]" />
              </div>
              <h3 className="text-[20px] font-bold mb-4">Standar ISO 9001:2015</h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed mb-6">
                Seluruh proses custom molding kami mengikuti protokol manajemen mutu internal ketat guna memastikan presisi dimensi dan durabilitas material rubber.
              </p>
              
              <ul className="space-y-4 text-[13px] text-zinc-300 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#cc4224] rounded-full mt-1.5 shrink-0"></div>
                  Simulasi pembebanan material
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#cc4224] rounded-full mt-1.5 shrink-0"></div>
                  Uji kuat tarik (Tensile) & ketahanan aus
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#cc4224] rounded-full mt-1.5 shrink-0"></div>
                  Toleransi presisi tinggi hingga ±0.1mm
                </li>
              </ul>
            </div>
            
            <div className="h-40 bg-zinc-800 relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                alt="Factory" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1526] to-transparent"></div>
              <p className="absolute bottom-4 left-6 right-6 text-[11px] text-zinc-400 leading-relaxed italic">
                *Fasilitas rekayasa karet dari DML Rubber Industry disiapkan untuk memproduksi komponen kustom spesifikasi khusus.
              </p>
            </div>
            
            <div className="p-8 bg-white border-t border-zinc-200 text-zinc-900 rounded-b-2xl">
              <p className="text-[12px] font-bold text-zinc-500 mb-3 text-center uppercase tracking-widest">
                Siap mengirimkan pengajuan?
              </p>
              <button 
                onClick={handleSubmit}
                className="w-full bg-[#cc4224] text-white font-bold text-[14px] py-4 rounded-xl hover:bg-[#b0351b] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                SUBMIT RFQ SEKARANG
              </button>
              <p className="text-[11px] text-zinc-400 text-center mt-3 leading-relaxed">
                Tim Referensi akan ditugaskan ke dalam vendor submit.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
