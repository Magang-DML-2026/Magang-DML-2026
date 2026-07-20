"use client"

import { useState } from "react"
import { 
  Lightbulb, 
  Trash2, 
  PlusCircle, 
  Network, 
  Upload,
  Pencil,
  Factory,
  MoreVertical,
  ImagePlus,
  ExternalLink,
  Eye,
  Save,
  Plus
} from "lucide-react"
import Link from "next/link"

export default function CMSContentPage() {
  const [missions, setMissions] = useState([
    "Mengembangkan teknologi manufaktur karet yang berkelanjutan.",
    "Memberikan solusi teknis yang akurat untuk klien industri otomotif dan konstruksi."
  ])
  const [newMission, setNewMission] = useState("")

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Corporate Identity Editor</h1>
          <p className="text-[15px] text-gray-500 font-medium leading-relaxed">
            Manage the public-facing content for PT Duta Mitra Luhur, including core philosophy, organizational data, and industrial asset galleries.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/admin/cms/preview" className="flex items-center gap-2 px-5 py-3 bg-[#f4f5f6] hover:bg-[#e4e5e7] text-gray-700 text-[15px] font-bold rounded-lg transition-colors border border-gray-200 shadow-sm">
            <Eye className="w-4 h-4" />
            Preview Site
          </Link>
          <button className="flex items-center gap-2 px-5 py-3 bg-[#b73719] hover:bg-[#9a2d14] text-white text-[15px] font-bold rounded-lg transition-colors shadow-md">
            <Save className="w-4 h-4" />
            Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Core Identity */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Visi & Misi Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-7">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ffedd5] text-[#e06822] flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 stroke-[2]" />
                </div>
                <h2 className="text-[22px] font-bold text-gray-900">Visi & Misi</h2>
              </div>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-md">
                Last updated: 2 days ago
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Vision Statement</label>
                <textarea 
                  className="w-full p-4 border border-gray-300 rounded-xl text-[14.5px] font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none h-28 leading-relaxed"
                  defaultValue="Menjadi mitra manufaktur komponen karet terkemuka di tingkat global melalui inovasi presisi dan dedikasi terhadap kualitas tanpa kompromi."
                ></textarea>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Mission List</label>
                <div className="space-y-3">
                  {missions.map((mission, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-1 p-4 border border-gray-300 rounded-xl text-[14.5px] font-medium text-gray-800 bg-white leading-relaxed">
                        {mission}
                      </div>
                      <button className="p-4 text-[#dc2626] hover:bg-red-50 rounded-xl transition-colors shrink-0">
                        <Trash2 className="w-[22px] h-[22px]" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Add New Mission */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="text"
                      placeholder="Add new mission point..."
                      className="flex-1 p-4 border border-gray-300 rounded-xl text-[14.5px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                      value={newMission}
                      onChange={(e) => setNewMission(e.target.value)}
                    />
                    <button className="p-3.5 text-black hover:bg-gray-100 rounded-xl transition-colors shrink-0">
                      <PlusCircle className="w-[26px] h-[26px]" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Struktur Organisasi Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-7">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200 text-gray-700 flex items-center justify-center">
                  <Network className="w-6 h-6 stroke-[2]" />
                </div>
                <h2 className="text-[22px] font-bold text-gray-900">Struktur Organisasi</h2>
              </div>
              <button className="text-[#b73719] hover:text-[#9a2d14] text-sm font-bold transition-colors">
                Re-upload Chart
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer min-h-[180px]">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-lg flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-gray-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Update Org Chart (PDF/PNG)</h3>
                <p className="text-xs font-medium text-gray-400">Max size 5MB</p>
              </div>

              {/* Quick Details */}
              <div>
                <h3 className="text-[13px] font-bold text-gray-700 mb-3">Quick Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 group">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-0.5">CEO</p>
                      <p className="text-[14.5px] font-semibold text-gray-900">Drs. H. M. Luhur</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 group">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-0.5">Operational Director</p>
                      <p className="text-[14.5px] font-semibold text-gray-900">Ir. Ahmad Pratama</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>

                  <button className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[13px] font-bold rounded-xl transition-colors shadow-sm">
                    Manage Full List
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Assets */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Production Machinery Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
            <div className="p-7 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#4a3623] text-[#fcd34d] flex items-center justify-center">
                  <Factory className="w-6 h-6 stroke-[2]" />
                </div>
                <h2 className="text-[22px] font-bold text-gray-900 leading-tight">Production<br/>Machinery</h2>
              </div>
              <button className="w-8 h-8 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              
              {/* Machine 1 */}
              <div className="p-6 flex items-start gap-4">
                <div className="w-[100px] h-[75px] rounded-lg bg-gray-200 overflow-hidden shrink-0 shadow-sm border border-gray-100 relative">
                   <div className="absolute inset-0 bg-[#7a9d70] opacity-80 mix-blend-multiply"></div>
                   {/* Placeholder for an image */}
                   <div className="absolute inset-0 flex items-center justify-center text-white/50">
                     <Factory className="w-6 h-6" />
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-bold text-gray-900 truncate">Hydraulic Press</h3>
                    <button className="text-gray-400 hover:text-gray-600 p-1 -mr-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1 truncate">Main molding station for heavy...</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Heavy Duty</span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Molding</span>
                  </div>
                </div>
              </div>

              {/* Machine 2 */}
              <div className="p-6 flex items-start gap-4">
                <div className="w-[100px] h-[75px] rounded-lg bg-gray-200 overflow-hidden shrink-0 shadow-sm border border-gray-100 relative">
                   <div className="absolute inset-0 bg-[#a65d57] opacity-80 mix-blend-multiply"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-white/50">
                     <Factory className="w-6 h-6" />
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-bold text-gray-900 truncate">Open Mill</h3>
                    <button className="text-gray-400 hover:text-gray-600 p-1 -mr-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1 truncate">Material preparation and...</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Preparation</span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Mixing</span>
                  </div>
                </div>
              </div>

              {/* Machine 3 */}
              <div className="p-6 flex items-start gap-4">
                <div className="w-[100px] h-[75px] rounded-lg bg-gray-200 overflow-hidden shrink-0 shadow-sm border border-gray-100 relative">
                   <div className="absolute inset-0 bg-[#6b8e6b] opacity-80 mix-blend-multiply"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-white/50">
                     <Factory className="w-6 h-6" />
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-bold text-gray-900 truncate">Mesin Potong</h3>
                    <button className="text-gray-400 hover:text-gray-600 p-1 -mr-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1 truncate">Precision cutting for finishing...</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Finishing</span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">Precision</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Add Gallery Button */}
          <button className="w-full py-5 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center gap-3 text-gray-600 hover:text-gray-900 hover:bg-white transition-colors bg-gray-50/50">
            <ImagePlus className="w-5 h-5" />
            <span className="font-bold text-[15px]">Add New Machine Gallery</span>
          </button>

          {/* Public Content Dashboard Card */}
          <div className="relative h-[160px] rounded-2xl overflow-hidden shadow-md group cursor-pointer">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-[#1e293b]">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565515261924-4c4d26f74a00?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white mb-1 drop-shadow-sm">Public Content<br/>Dashboard</h3>
              <p className="text-xs font-medium text-gray-300 drop-shadow-sm">Viewing live site status...</p>
            </div>

            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#b73719] flex items-center justify-center text-white shadow-lg shadow-[#b73719]/30 group-hover:scale-110 transition-transform">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
