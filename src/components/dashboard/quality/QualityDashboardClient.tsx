"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Bell, 
  Settings, 
  Filter, 
  Download, 
  Eye, 
  ChevronDown, 
  Check, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  FolderArchive,
  ArrowLeft,
  Share2,
  Minus,
  Plus,
  Maximize,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  LayoutGrid,
  List
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "All Categories",
  "ISO Certifications",
  "Technical Data Sheets (TDS)",
  "COA - Material Analysis",
  "Lab Test Results"
];


export default function QualityDashboardClient() {
  const [listDocuments] = useState([
    { id: 1, name: "TDS - EPDM Grade 70 Shore A", category: "Technical Data Sheets (TDS)", date: "Oct 12, 2023", tag: "Material" }
  ]);

  const [gridDocuments] = useState([
    {
      id: "TDS-EPDM-502",
      type: "TDS",
      typeName: "Technical Specification Sheet",
      title: "EPDM-502 Compound",
      description: "Complete technical breakdown of EPDM material properties including tensile strength, elongation, and heat resistance.",
      version: "v2.1",
      date: "Feb 2024"
    }
  ]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Simulate download progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showDownloadModal) {
      setDownloadProgress(0);
      interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5; // Random chunk 5-20%
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [showDownloadModal]);

  const filteredDocs = selectedCategory === "All Categories" 
    ? listDocuments 
    : listDocuments.filter(d => d.category === selectedCategory);

  // PDF Viewer View
  if (activeReport) {
    return (
      <div className="flex flex-col h-full min-h-screen bg-[#f3f4f6]">
        {/* Top Navigation */}
        <div className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveReport(null)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </button>
            <div>
              <p className="text-[12px] text-zinc-500 font-bold mb-0.5">Quality Documents › Q3 2024</p>
              <h1 className="text-[18px] font-bold text-zinc-900">Comprehensive Durability Report - Q3 2024</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="flex items-center gap-2 px-4 py-2 bg-[#cc4224] text-white rounded-lg text-[13px] font-bold hover:bg-[#b0351b] transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main PDF Canvas Area */}
          <div className="flex-1 overflow-y-auto bg-zinc-200 p-6 flex flex-col items-center">
            
            {/* Viewer Controls */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm mb-6 flex items-center p-1">
              <div className="flex items-center gap-1 border-r border-zinc-200 pr-2 mr-2">
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-600"><Minus className="w-4 h-4" /></button>
                <span className="text-[13px] font-bold text-zinc-700 px-2 w-14 text-center">100%</span>
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-600"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-600 mr-2 border-r border-zinc-200 pr-3"><Maximize className="w-4 h-4" /></button>
              <div className="flex items-center gap-1">
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-400"><ChevronLeft className="w-4 h-4" /></button>
                <span className="text-[13px] font-bold text-zinc-700 px-2">Page 1 of 12</span>
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-600"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Simulated PDF Page */}
            <div className="w-[800px] bg-white shadow-lg p-12 shrink-0 aspect-[1/1.414]">
              <h1 className="text-[32px] font-black text-zinc-900 mb-2 leading-tight">Comprehensive Durability<br/>Report</h1>
              <div className="flex justify-between items-end mb-12 border-b-2 border-zinc-900 pb-4">
                <p className="text-[16px] text-zinc-500">Industrial Rubber Components - Q3 2024</p>
                <div className="text-right">
                  <p className="text-[14px] font-bold text-zinc-900">PT Duta Mitra Luhur</p>
                  <p className="text-[12px] text-zinc-500">Document Ref: DML-QA-24-098</p>
                </div>
              </div>

              <h2 className="text-[14px] font-bold tracking-widest uppercase mb-4">1. Executive Summary</h2>
              <p className="text-[13px] text-zinc-700 leading-relaxed mb-8">
                This report details the rigorous durability testing conducted on the Q3 2024 production batch of industrial-grade extruded rubber seals. Testing protocols strictly adhered to ISO 9001:2015 standards, focusing on tensile strength, thermal resistance, and prolonged compression set evaluation. Results indicate absolute compliance across all operational metrics, ensuring maximum operational lifespan in extreme manufacturing environments.
              </p>

              <div className="flex gap-6 mb-12">
                <div className="flex-1 bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                  <h3 className="text-[12px] font-bold mb-3">Test Protocol</h3>
                  <ul className="text-[12px] text-zinc-600 space-y-1.5">
                    <li>Thermal Cycling (-40°C to +120°C)</li>
                    <li>Accelerated Aging (500 hours)</li>
                    <li>Dynamic Fatigue Resistance</li>
                  </ul>
                </div>
                <div className="flex-1 bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                  <h3 className="text-[12px] font-bold mb-3">Material Specification</h3>
                  <ul className="text-[12px] text-zinc-600 space-y-1.5">
                    <li>Compound: EPDM High-Density</li>
                    <li>Shore Hardness: 70A ±5</li>
                    <li>Batch ID: EPDM-70-2023-B</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-[14px] font-bold tracking-widest uppercase mb-6">2. Tensile Strength Analysis</h2>
              
              <div className="border border-zinc-200 rounded-xl p-6 mb-12">
                <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                  <span className="text-[11px] text-zinc-400 font-mono">Laporan PDF / Pengujian Material</span>
                  <span className="text-[11px] text-zinc-400 font-mono">Profil Pengguna</span>
                </div>
                <h4 className="text-center font-bold text-[#1e3a8a] mb-1">TENSILE STRENGTH CONSISTENCY - 500 HR TESTING</h4>
                <p className="text-center text-[10px] text-zinc-500 mb-8">Material: Advanced Composite (M-9) | Period: 0 - 500 hours</p>
                
                {/* Simulated Chart */}
                <div className="relative h-48 w-full border-l border-b border-zinc-300 ml-4 mb-4">
                  <div className="absolute top-0 -left-6 text-[10px] text-zinc-400">540</div>
                  <div className="absolute top-1/4 -left-6 text-[10px] text-zinc-400">520</div>
                  <div className="absolute top-2/4 -left-6 text-[10px] text-zinc-400">500</div>
                  <div className="absolute top-3/4 -left-6 text-[10px] text-zinc-400">480</div>
                  <div className="absolute bottom-0 -left-6 text-[10px] text-zinc-400">460</div>
                  
                  <div className="absolute top-1/2 -left-16 text-[10px] text-zinc-400 -rotate-90 origin-center whitespace-nowrap">TENSILE STRENGTH (MPa)</div>
                  
                  <div className="absolute top-1/4 w-full border-t border-zinc-100"></div>
                  <div className="absolute top-2/4 w-full border-t border-zinc-100"></div>
                  <div className="absolute top-3/4 w-full border-t border-zinc-100"></div>

                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <polyline 
                      points="0,96 80,70 160,75 240,90 320,105 400,90 480,75 560,110 640,105" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="2" 
                    />
                    <circle cx="0" cy="96" r="3" fill="#3b82f6" />
                    <circle cx="80" cy="70" r="3" fill="#3b82f6" />
                    <circle cx="160" cy="75" r="3" fill="#3b82f6" />
                    <circle cx="240" cy="90" r="3" fill="#3b82f6" />
                    <circle cx="320" cy="105" r="3" fill="#3b82f6" />
                    <circle cx="400" cy="90" r="3" fill="#3b82f6" />
                    <circle cx="480" cy="75" r="3" fill="#3b82f6" />
                    <circle cx="560" cy="110" r="3" fill="#3b82f6" />
                    <circle cx="640" cy="105" r="3" fill="#3b82f6" />
                  </svg>
                  
                  <div className="absolute bottom-14 left-16 bg-white border border-zinc-200 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm">502</div>
                  <div className="absolute bottom-16 left-36 bg-white border border-zinc-200 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm">501</div>
                  <div className="absolute bottom-20 left-[230px] bg-white border border-zinc-200 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm">499</div>
                  <div className="absolute bottom-16 right-[150px] bg-white border border-zinc-200 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm">503</div>
                  
                  <div className="absolute -bottom-6 left-[10px] text-[10px] text-zinc-400">Tensile Strength (MPa)</div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-20 pt-6 border-t border-zinc-200">
                <span className="text-[10px] text-zinc-400 font-mono">Confidential - Do Not Distribute</span>
                <span className="text-[10px] text-zinc-400 font-mono">Page 1 / 12</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar Details */}
          <div className="w-[320px] bg-white border-l border-zinc-200 p-6 flex flex-col shrink-0 overflow-y-auto">
            <h2 className="text-[18px] font-bold text-zinc-900 mb-6">Document Details</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <div>
                <p className="text-[13px] font-bold text-green-900 leading-tight">Status: Approved</p>
                <p className="text-[11px] text-green-700 font-medium">Passed All Standards</p>
              </div>
            </div>

            <div className="space-y-6 border-b border-zinc-100 pb-8 mb-8">
              <div>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Issue Date</p>
                <p className="text-[14px] font-bold text-zinc-900">October 12, 2024</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Document Type</p>
                <p className="text-[14px] font-bold text-zinc-900">Durability & Stress Report</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Associated Product Line</p>
                <span className="inline-block px-3 py-1 bg-zinc-100 rounded-lg text-[12px] font-bold text-zinc-700">Extruded Seals</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Authorizing Department</p>
                <p className="text-[14px] font-bold text-zinc-900">Quality Assurance Div.</p>
              </div>
            </div>

            <h3 className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Signatures</h3>
            <div className="space-y-3">
              <div className="border border-zinc-200 rounded-xl p-3 flex items-center gap-3 bg-white">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[14px]">HK</div>
                <div>
                  <p className="text-[13px] font-bold text-zinc-900">Hendra Kusuma</p>
                  <p className="text-[11px] text-zinc-500">Lead QA Engineer</p>
                </div>
              </div>
              <div className="border border-zinc-200 rounded-xl p-3 flex items-center gap-3 bg-white">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center font-bold text-[14px]">AS</div>
                <div>
                  <p className="text-[13px] font-bold text-zinc-900">Arief Setiawan</p>
                  <p className="text-[11px] text-zinc-500">Plant Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Background patterned texture to mimic the mockup's background images */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none flex flex-wrap" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
          </div>
          
          <div className="bg-white w-full max-w-[500px] rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
              <FolderArchive className="w-10 h-10 text-zinc-700" />
            </div>
            
            <h2 className="text-[28px] font-black text-zinc-900 mb-4">Preparing Download</h2>
            <p className="text-[14px] text-zinc-500 max-w-xs mb-10 leading-relaxed">
              Compiling <span className="font-mono text-zinc-700">Quality_Full_Archive_2024.zip</span>.<br/>This process secures and compresses all requested documents.
            </p>

            <div className="w-full mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] font-bold text-zinc-500 tracking-widest uppercase">Progress</span>
                <span className="text-[14px] font-black text-zinc-900">{downloadProgress}%</span>
              </div>
              <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#cc4224] rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
              <p className="text-left text-[11px] text-zinc-500 mt-2 italic">Gathering files...</p>
            </div>

            <button 
              onClick={() => setShowDownloadModal(false)}
              className="px-6 py-3 border border-zinc-200 rounded-xl text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center gap-2 mt-4"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Documents
            </button>
          </div>
        </div>
      )}
      


      <div className="max-w-7xl mx-auto p-8">
        {/* Main Content Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h1 className="text-[32px] font-black text-zinc-900 mb-3">Dokumen Mutu</h1>
            <p className="text-[15px] text-zinc-600 leading-relaxed">
              Access current ISO certifications, technical data sheets (TDS), and lab-verified test results for all industrial rubber products.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative mr-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search certificates..." 
                className="w-[260px] bg-zinc-100 border-none rounded-xl pl-10 pr-4 py-3 text-[13px] outline-none focus:ring-2 focus:ring-zinc-200 transition-all"
              />
            </div>

            <div className="bg-zinc-100 p-1 rounded-xl flex items-center mr-2">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-5 py-3.5 border border-zinc-300 rounded-xl text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                <Filter className="w-4 h-4" /> 
                <span className="max-w-[100px] truncate">{selectedCategory === "All Categories" ? "Filter By Category" : selectedCategory}</span>
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-zinc-200 rounded-2xl shadow-xl z-20 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Categories</p>
                  </div>
                  {categories.map((cat) => (
                    <div 
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                      className="px-4 py-3 text-[13px] flex items-center justify-between cursor-pointer hover:bg-zinc-50 text-zinc-700 transition-colors"
                    >
                      {cat}
                      {selectedCategory === cat && <Check className="w-4 h-4 text-[#cc4224]" />}
                    </div>
                  ))}
                  {selectedCategory !== "All Categories" && (
                    <div 
                      onClick={() => { setSelectedCategory("All Categories"); setIsFilterOpen(false); }}
                      className="px-4 py-3 mt-1 border-t border-zinc-100 text-[12px] font-bold text-red-500 cursor-pointer hover:bg-red-50 text-center transition-colors"
                    >
                      Clear Filter
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowDownloadModal(true)}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#cc4224] text-white rounded-xl text-[13px] font-bold hover:bg-[#b0351b] transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Download All (ZIP)
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          /* ============================================================== */
          /* GRID VIEW (Pusat Dokumen Mutu)                                  */
          /* ============================================================== */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              
              {gridDocuments.map((doc) => (
                <div key={doc.id} className="border border-zinc-200 rounded-3xl p-6 bg-white flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#cc4224]" />
                      </div>
                      <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{doc.type}</span>
                    </div>
                    <p className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-2">{doc.typeName}</p>
                    <h3 className="text-[20px] font-bold text-zinc-900 mb-3 leading-tight">{doc.title}</h3>
                    <p className="text-[13px] text-zinc-600 leading-relaxed line-clamp-4">
                      {doc.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-zinc-100">
                    <span className="text-[11px] text-zinc-400">{doc.version} • {doc.date}</span>
                    <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-2 text-[#cc4224] hover:bg-orange-50 rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              
            </div>

            {/* Bottom Banner */}
            <div className="bg-zinc-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
                  <ActivityIcon className="w-8 h-8 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-zinc-900 mb-1">Need specific technical data?</h3>
                  <p className="text-[14px] text-zinc-600">Our engineering team can provide customized test results upon request.</p>
                </div>
              </div>
              <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-6 py-3.5 bg-white border border-zinc-300 rounded-xl text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm whitespace-nowrap">
                Request Custom Lab Test
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* LIST VIEW (Pilih Kategori Dokumen)                              */
          /* ============================================================== */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50">
                      <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Document Name</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Date Issued</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-[#cc4224]" />
                            </div>
                            <span className="text-[14px] font-bold text-zinc-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-zinc-100 rounded-full text-[12px] text-zinc-600 font-medium">
                            {doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[13px] text-zinc-600">{doc.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="p-2 text-zinc-400 hover:text-[#cc4224] hover:bg-orange-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredDocs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                          No documents found for this category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="border-t border-zinc-200 px-6 py-4 flex items-center justify-between bg-white">
                <span className="text-[13px] text-zinc-500">
                  Showing {filteredDocs.length} of 42 documents
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-3 py-1.5 border border-zinc-200 rounded-lg text-[13px] font-medium text-zinc-400 cursor-not-allowed">
                    Previous
                  </button>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 flex items-center justify-center bg-[#0f172a] text-white rounded-lg text-[13px] font-bold shadow-sm">
                    1
                  </button>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 rounded-lg text-[13px] font-medium transition-colors">
                    2
                  </button>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 rounded-lg text-[13px] font-medium transition-colors">
                    3
                  </button>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-3 py-1.5 border border-zinc-200 rounded-lg text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


    </div>
  );
}

// Custom icon since lucide-react Activity looks different
function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
