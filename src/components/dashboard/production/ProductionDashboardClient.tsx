"use client";

import { useState } from "react";
import { 
  Search, Filter, ChevronDown, Check, ArrowUpRight, Activity, 
  CalendarClock, Download, CloudDownload, Archive, ArrowLeft, 
  Settings, LayoutDashboard, Wrench, MoreVertical, Layers, 
  CheckCircle2, Factory, FileText, ArrowRight, X, AlertTriangle, 
  AlertCircle, Clock, Truck, Plus, Eye
} from "lucide-react";

// --- Types ---
export interface ActiveBatch {
  id: string;
  product: string;
  machine: string;
  machineIcon: React.ReactNode;
  estCompletion: string;
  statusText: string;
  statusColor: string;
  progress: number;
  yieldProgress: number;
  targetYield: string;
  material: string;
}

export interface EquipmentStatus {
  id: string;
  name: string;
  statusText: string;
  statusColorClass: string;
  dotColorClass: string;
}

export interface MaintenanceAlert {
  id: string;
  machine: string;
  hoursLeft: number;
  urgent: boolean;
  message: string;
  oilViscosity: string;
  healthPercentage: number;
}

export interface ScheduleOrder {
  id: string;
  product: string;
  machine: string;
  statusText: string;
  statusColorClass: string;
  progress: number;
  progressColorClass: string;
}

export interface MaintenanceLog {
  date: string;
  machineId: string;
  type: string;
  technician: string;
  statusText: string;
  statusColorClass: string;
}

export default function ProductionDashboardClient({
  activeBatchesProp,
  productionMetrics,
  serviceLevel
}: {
  activeBatchesProp?: ActiveBatch[];
  productionMetrics?: {
    activeCount: number;
    dailyVolume: string;
    yieldRate: number;
    uptime: number;
  };
  serviceLevel?: {
    deliveryOntime: number;
    deliveryTarget: number;
  };
} = {}) {
  const [activeTab, setActiveTab] = useState<"tracking" | "batches" | "stages" | "schedule" | "performance" | "maintenance">("tracking");
  const [showReportModal, setShowReportModal] = useState(false);
  const [isStageFilterOpen, setIsStageFilterOpen] = useState(false);
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [perfTimeframe, setPerfTimeframe] = useState("7 Hari");
  
  const stages = ["All Stages", "Kneading", "Molding", "Trimming", "Cutting", "Quality Control"];

  // --- MOCK DATA (1 item each for UI templating) ---
  const timelineStages = ["Kneading", "Open Mill", "Press/Molding", "QC Inspection", "Shipping"];
  
  const [activeBatches] = useState<ActiveBatch[]>(activeBatchesProp || [
    {
      id: "DM-2083",
      product: "Heavy Duty Belting",
      machine: "Line A - Kneader",
      machineIcon: <Factory className="w-5 h-5 text-[#cc4224]" />,
      estCompletion: "Today, 14:30",
      statusText: "In Molding Stage",
      statusColor: "text-[#cc4224]",
      progress: 50,
      yieldProgress: 33,
      targetYield: "15,000 units",
      material: "Nitrile Butadiene (NBR)"
    }
  ]);

  const [equipmentList] = useState<EquipmentStatus[]>([
    {
      id: "eq-1",
      name: "HP Rubber #01",
      statusText: "Operating",
      statusColorClass: "text-green-600",
      dotColorClass: "bg-green-500"
    }
  ]);

  const [maintenanceAlerts] = useState<MaintenanceAlert[]>([
    {
      id: "ma-1",
      machine: "Hydraulic Press Rubber #03",
      hoursLeft: 12,
      urgent: true,
      message: "Seal Replacement Required - Urgent",
      oilViscosity: "Optimal",
      healthPercentage: 80
    }
  ]);

  const [scheduleOrders] = useState<ScheduleOrder[]>([
    {
      id: "ORD-9021",
      product: "Industrial Gasket Type B",
      machine: "Extruder 01",
      statusText: "In Progress",
      statusColorClass: "bg-orange-50 text-orange-700 border-orange-100",
      progress: 65,
      progressColorClass: "bg-orange-500"
    }
  ]);

  const [maintenanceLogs] = useState<MaintenanceLog[]>([
    {
      date: "10 Okt 2024",
      machineId: "Hydraulic Press A1",
      type: "Routine Check",
      technician: "Budi Santoso",
      statusText: "Completed",
      statusColorClass: "bg-green-50 text-green-700 border-green-100"
    }
  ]);

  const renderTabs = () => (
    <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-zinc-200">
      <button onClick={() => setActiveTab("tracking")} className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === "tracking" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
        <Activity className="w-4 h-4" /> Tracking
      </button>
      <button onClick={() => setActiveTab("batches")} className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === "batches" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
        <Layers className="w-4 h-4" /> Active Batches
      </button>
      <button onClick={() => setActiveTab("stages")} className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === "stages" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
        <CheckCircle2 className="w-4 h-4" /> Stages
      </button>
      <button onClick={() => setActiveTab("schedule")} className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === "schedule" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
        <CalendarClock className="w-4 h-4" /> Schedule
      </button>
      <button onClick={() => setActiveTab("performance")} className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === "performance" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
        <FileText className="w-4 h-4" /> Performance
      </button>
      <button onClick={() => setActiveTab("maintenance")} className={`pb-4 px-4 text-[14px] font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === "maintenance" ? 'border-[#cc4224] text-[#cc4224]' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
        <Wrench className="w-4 h-4" /> Maintenance
      </button>
    </div>
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans min-h-screen bg-[#F9FAFB]">
      {renderTabs()}

      {/* 1. TRACKING TAB */}
      {activeTab === "tracking" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Production Tracking</h1>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Active Batches</p>
              <p className="text-[36px] font-black text-zinc-900 leading-none">{productionMetrics ? productionMetrics.activeCount : 42}</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Production Volume</p>
              <p className="text-[36px] font-black text-zinc-900 leading-none flex items-baseline gap-2">
                {productionMetrics ? productionMetrics.dailyVolume : "12.4k"} <span className="text-[14px] font-bold text-zinc-400">Units/Day</span>
              </p>
            </div>
            <div className="bg-[#0a1526] rounded-2xl p-6 shadow-sm text-white flex items-center justify-between">
              <div>
                <p className="text-[16px] font-bold mb-1">Delivery Ontime Performance</p>
                <p className="text-[12px] text-zinc-400 max-w-[180px]">
                  {serviceLevel 
                    ? `Current delivery ontime is ${serviceLevel.deliveryOntime.toFixed(1)}% (Target: ${serviceLevel.deliveryTarget.toFixed(1)}%)`
                    : "Exceeding B2B target by 1.2% this quarter."}
                </p>
              </div>
              <button 
                onClick={() => setActiveTab("performance")}
                className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-[13px] font-bold border border-white/20"
              >
                Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real-time Batch Tracking */}
            <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#cc4224]" />
                  <h2 className="text-[16px] font-bold text-zinc-900">Real-time Batch Tracking</h2>
                </div>
                <div className="bg-green-50 text-green-700 font-bold px-3 py-1 rounded-full text-[11px] flex items-center gap-1.5 border border-green-100">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Live System
                </div>
              </div>

              <div className="p-6 space-y-8">
                {activeBatches.map((batch, index) => (
                  <div key={batch.id} className={index !== activeBatches.length - 1 ? "border-b border-zinc-100 pb-8" : ""}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-[14px] font-bold text-zinc-900 mb-1">Batch #{batch.id} - {batch.product}</h3>
                        <div className="flex items-center gap-4 text-[12px] text-zinc-500">
                          <span className="flex items-center gap-1"><Factory className="w-3.5 h-3.5" /> {batch.machine}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Est. Completion: {batch.estCompletion}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Current Status</p>
                        <p className={`text-[13px] font-bold ${batch.statusColor}`}>{batch.statusText}</p>
                      </div>
                    </div>
                    {/* Timeline */}
                    <div className="relative flex justify-between items-start px-2">
                      <div className="absolute top-4 left-12 right-12 h-[2px] bg-zinc-200 -translate-y-1/2 z-0">
                        <div className="absolute top-0 left-0 h-full bg-[#cc4224]" style={{ width: `${batch.progress}%` }}></div>
                      </div>
                      
                      {timelineStages.map((stage, i) => {
                        const isCompleted = (i * 25) < batch.progress;
                        const isCurrent = (i * 25) === batch.progress;
                        return (
                          <div key={stage} className="relative z-10 flex flex-col items-center gap-2 w-20">
                            {isCompleted ? (
                              <div className="w-8 h-8 rounded-full bg-[#cc4224] text-white flex items-center justify-center ring-4 ring-white"><Check className="w-4 h-4" /></div>
                            ) : isCurrent ? (
                              <div className="w-8 h-8 rounded-full border-2 border-[#cc4224] bg-white flex items-center justify-center ring-4 ring-white">
                                <div className="w-2.5 h-2.5 bg-[#cc4224] rounded-full"></div>
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center ring-4 ring-white"></div>
                            )}
                            <span className={`text-[11px] font-bold text-center leading-tight ${isCompleted ? 'text-zinc-900' : isCurrent ? 'text-[#cc4224]' : 'text-zinc-400 font-medium'}`}>{stage}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setActiveTab("batches")}
                className="w-full p-4 text-[13px] font-bold text-[#cc4224] hover:bg-orange-50 transition-colors border-t border-zinc-100 rounded-b-2xl text-center flex items-center justify-center gap-1"
              >
                View All Active Production Batches <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Maintenance & Equipment */}
            <div className="space-y-6">
              {maintenanceAlerts.map(alert => (
                <div key={alert.id} className="bg-[#fef2f2] border border-[#fecaca] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h3 className="text-[14px] font-bold text-red-900 mb-2">Preventive Maintenance</h3>
                      <p className="text-[12px] text-red-700 mb-4 leading-relaxed">
                        "{alert.machine}" is scheduled for maintenance in <strong>{alert.hoursLeft} operating hours</strong>.
                        <br/>
                        <span className="italic">{alert.message}</span>
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-red-900">Oil Viscosity</span>
                          <span className="text-green-600">{alert.oilViscosity}</span>
                        </div>
                        <div className="h-1.5 w-full bg-red-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${alert.healthPercentage}%` }}></div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab("maintenance")}
                        className="w-full bg-[#0a1526] text-white py-2.5 rounded-lg text-[12px] font-bold hover:bg-zinc-800 transition-colors"
                      >
                        Manage Maintenance
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-[14px] font-bold text-zinc-900 mb-4">Equipment Status Monitor</h2>
                <div className="grid grid-cols-2 gap-3">
                  {equipmentList.map(eq => (
                    <div key={eq.id} className="border border-zinc-200 bg-zinc-50 rounded-lg p-3">
                      <p className="text-[11px] font-bold text-zinc-900 mb-1">{eq.name}</p>
                      <div className={`text-[10px] flex items-center gap-1 ${eq.statusColorClass}`}><div className={`w-1.5 h-1.5 rounded-full ${eq.dotColorClass}`}></div> {eq.statusText}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACTIVE BATCHES TAB */}
      {activeTab === "batches" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Seluruh Batch Produksi Aktif</h1>
            <button 
              onClick={() => setShowReportModal(true)}
              className="bg-[#cc4224] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#b0351b] transition-colors shadow-sm"
            >
              Generate Report
            </button>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search Batch ID, Machine, Product..." className="w-full border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-[13px] outline-none focus:border-[#cc4224]" />
            </div>
            <div className="relative w-full md:w-48">
              <div 
                onClick={() => setIsStageFilterOpen(!isStageFilterOpen)}
                className={`w-full border rounded-xl px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer transition-colors bg-white ${isStageFilterOpen ? 'border-[#cc4224] ring-1 ring-[#cc4224]' : 'border-zinc-300'}`}
              >
                <span className="text-zinc-900 font-bold">{stageFilter}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </div>
              {isStageFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-xl z-20 py-2">
                  {stages.map((stage) => (
                    <div 
                      key={stage}
                      onClick={() => { setStageFilter(stage); setIsStageFilterOpen(false); }}
                      className={`px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer hover:bg-zinc-50 ${stageFilter === stage ? 'text-[#cc4224] font-bold bg-orange-50/50' : 'text-zinc-700'}`}
                    >
                      <div className="flex items-center gap-2">
                        {stage !== "All Stages" && <div className="w-1.5 h-1.5 bg-[#cc4224] rounded-full"></div>}
                        {stage}
                      </div>
                      {stageFilter === stage && <Check className="w-4 h-4" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-4 py-2.5 border border-zinc-300 rounded-xl text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBatches.map(batch => (
              <div key={batch.id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">#{batch.id}</span>
                  {batch.machineIcon}
                </div>
                <h3 className="text-[16px] font-bold text-zinc-900 mb-1">{batch.product}</h3>
                <p className="text-[12px] text-zinc-500 mb-6">Machine: {batch.machine}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span className="text-zinc-500">Progress</span>
                    <span className="text-zinc-900">{batch.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#cc4224] rounded-full" style={{ width: `${batch.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase mb-1">Est. Completion</p>
                    <p className="text-[13px] font-bold text-zinc-900">{batch.estCompletion}</p>
                  </div>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-[12px] font-bold text-[#cc4224] hover:underline flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2.5 STAGES TAB */}
      {activeTab === "stages" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            
            {/* Left Main Column */}
            <div className="flex-1 w-full space-y-6">
              
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search Batch ID, Machine, Product..." className="w-full border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-[13px] outline-none focus:border-[#cc4224]" />
                </div>
                <div className="relative w-full md:w-48">
                  <div 
                    onClick={() => setIsStageFilterOpen(!isStageFilterOpen)}
                    className={`w-full border rounded-xl px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer transition-colors bg-white ${isStageFilterOpen ? 'border-[#cc4224] ring-1 ring-[#cc4224]' : 'border-zinc-300'}`}
                  >
                    <span className="text-zinc-900 font-bold">{stageFilter}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  </div>
                  {isStageFilterOpen && (
                    <div className="absolute top-full right-0 mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-xl z-20 py-2">
                      {stages.map((stage) => (
                        <div 
                          key={stage}
                          onClick={() => { setStageFilter(stage); setIsStageFilterOpen(false); }}
                          className={`px-4 py-2.5 text-[13px] flex items-center justify-between cursor-pointer hover:bg-zinc-50 ${stageFilter === stage ? 'text-[#cc4224] font-bold bg-orange-50/50' : 'text-zinc-700'}`}
                        >
                          <div className="flex items-center gap-2">
                            {stage !== "All Stages" && <div className="w-1.5 h-1.5 bg-[#cc4224] rounded-full"></div>}
                            {stage}
                          </div>
                          {stageFilter === stage && <Check className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-4 py-2.5 border border-zinc-300 rounded-xl text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </button>
              </div>

              {/* Detailed Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
                {activeBatches.map(batch => (
                  <div key={batch.id}>
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase">Batch #{batch.id}</span>
                      <MoreVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />
                    </div>
                    
                    <h2 className="text-[24px] font-bold text-zinc-900 mb-6">{batch.product}</h2>
                    
                    <div className="flex flex-wrap gap-8 mb-8 border-b border-zinc-100 pb-8">
                      <div>
                        <p className="text-[12px] text-zinc-500 font-bold mb-1">Material</p>
                        <p className="text-[14px] font-bold text-zinc-900 whitespace-pre-line">{batch.material}</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-zinc-500 font-bold mb-1">Target Yield</p>
                        <p className="text-[14px] font-bold text-zinc-900">{batch.targetYield}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
                        <span>Molding</span>
                        <span className="text-[#cc4224]">{batch.statusText}</span>
                        <span>Trimming</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 rounded-full flex overflow-hidden mb-4">
                        <div className="h-full bg-[#cc4224]" style={{ width: `${batch.yieldProgress}%` }}></div>
                        <div className="h-full bg-[#cc4224] opacity-60" style={{ width: `${batch.yieldProgress}%` }}></div>
                      </div>
                      <div className="text-right text-[12px]">
                        <span className="text-zinc-500">Est. Completion: </span><span className="font-bold text-zinc-900">{batch.estCompletion}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="w-full md:w-[320px] space-y-6 shrink-0">
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-500 mb-2">Active Lines</h3>
                  <p className="text-[28px] font-black text-zinc-900">8/12</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Factory className="w-6 h-6 text-zinc-400" />
                </div>
              </div>

              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-[14px] font-bold text-red-900">Quality Alerts</h3>
                </div>
                <p className="text-[32px] font-black text-red-700 leading-none mb-1">2</p>
                <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest">Needs Attention</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. SCHEDULE TAB */}
      {activeTab === "schedule" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Main Content */}
            <div className="flex-1 w-full bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-bold text-zinc-900 mb-1">Production Schedule</h2>
                  <p className="text-[13px] text-zinc-500">Active runs across all facilities</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative hidden md:block">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search orders..." className="w-[240px] border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-[13px] outline-none focus:border-[#cc4224]" />
                  </div>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-4 py-2.5 border border-zinc-300 rounded-xl text-[13px] font-bold text-zinc-900 hover:bg-zinc-50 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters <span className="bg-zinc-100 px-2 py-0.5 rounded-full text-[10px]">2</span>
                  </button>
                </div>
              </div>

              {/* Applied Filters Pills */}
              <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex gap-2">
                <span className="bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-[11px] font-bold text-zinc-700 flex items-center gap-2 shadow-sm">
                  Machine: Molding Press 12 <X className="w-3 h-3 text-zinc-400 cursor-pointer hover:text-red-500" />
                </span>
                <span className="bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-[11px] font-bold text-zinc-700 flex items-center gap-2 shadow-sm">
                  Priority: Standard <X className="w-3 h-3 text-zinc-400 cursor-pointer hover:text-red-500" />
                </span>
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-[11px] font-bold text-[#cc4224] hover:underline px-2">Clear All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#0a1526] text-[11px] uppercase tracking-widest text-white/80">
                      <th className="py-4 px-6 font-bold">Order ID</th>
                      <th className="py-4 px-6 font-bold">Product</th>
                      <th className="py-4 px-6 font-bold">Machine</th>
                      <th className="py-4 px-6 font-bold">Status</th>
                      <th className="py-4 px-6 font-bold w-[200px]">Completion</th>
                      <th className="py-4 px-6 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {scheduleOrders.map(order => (
                      <tr key={order.id} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-zinc-900">#{order.id}</td>
                        <td className="py-4 px-6 text-zinc-700">{order.product}</td>
                        <td className="py-4 px-6 text-zinc-500">{order.machine}</td>
                        <td className="py-4 px-6">
                          <span className={`font-bold px-3 py-1 rounded-full text-[11px] border ${order.statusColorClass}`}>{order.statusText}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-1.5 flex-1 bg-zinc-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${order.progressColorClass}`} style={{ width: `${order.progress}%` }}></div>
                            </div>
                            <span className="font-bold text-zinc-900 w-8 text-right">{order.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-zinc-400 hover:text-zinc-900"><MoreVertical className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar Filters */}
            <div className="w-full lg:w-[320px] bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 shrink-0">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
                <h3 className="text-[16px] font-bold text-zinc-900">Filters</h3>
                <X className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-zinc-900" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-900 mb-2">Date Range</label>
                  <div className="flex gap-2">
                    <input type="date" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-[12px] text-zinc-700 focus:border-[#cc4224] outline-none" />
                    <input type="date" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-[12px] text-zinc-700 focus:border-[#cc4224] outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-900 mb-3">Machine Assignment</label>
                  <div className="space-y-3 text-[13px] text-zinc-700">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded bg-[#cc4224] text-white flex items-center justify-center"><Check className="w-3 h-3" /></div>
                      <span className="group-hover:text-[#cc4224] transition-colors">Extruder Line A</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded bg-[#cc4224] text-white flex items-center justify-center"><Check className="w-3 h-3" /></div>
                      <span className="group-hover:text-[#cc4224] transition-colors">Extruder Line B</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-zinc-300 bg-white group-hover:border-[#cc4224] transition-colors"></div>
                      <span className="group-hover:text-[#cc4224] transition-colors">Molding Presses</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-zinc-300 bg-white group-hover:border-[#cc4224] transition-colors"></div>
                      <span className="group-hover:text-[#cc4224] transition-colors">Assembly Station</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-900 mb-2">Priority Level</label>
                  <div className="relative">
                    <select className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-[13px] appearance-none focus:border-[#cc4224] outline-none font-medium">
                      <option>Standard</option>
                      <option>High Priority</option>
                      <option>Critical</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex gap-3">
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="flex-1 bg-white border border-zinc-300 text-zinc-700 font-bold text-[13px] py-2.5 rounded-lg hover:bg-zinc-50 transition-colors">Clear All</button>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="flex-1 bg-[#cc4224] text-white font-bold text-[13px] py-2.5 rounded-lg hover:bg-[#b0351b] transition-colors">Apply Filters</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. PERFORMANCE TAB */}
      {activeTab === "performance" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Laporan Kinerja Produksi</h1>
              <p className="text-[13px] text-zinc-500">Real-time monitoring of manufacturing metrics.</p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-zinc-200 p-1 rounded-xl shadow-sm">
              <button onClick={() => setPerfTimeframe("7 Hari")} className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${perfTimeframe === "7 Hari" ? 'bg-[#0a1526] text-white' : 'text-zinc-500 hover:text-zinc-900'}`}>7 Hari</button>
              <button onClick={() => setPerfTimeframe("30 Hari")} className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${perfTimeframe === "30 Hari" ? 'bg-[#0a1526] text-white' : 'text-zinc-500 hover:text-zinc-900'}`}>30 Hari</button>
              <button onClick={() => setPerfTimeframe("Tahun Ini")} className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${perfTimeframe === "Tahun Ini" ? 'bg-[#0a1526] text-white' : 'text-zinc-500 hover:text-zinc-900'}`}>Tahun Ini <CalendarClock className="w-3.5 h-3.5 inline ml-1" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1">
                <h2 className="text-[18px] font-bold text-zinc-900 mb-4">Delivery Ontime<br/>Performance</h2>
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-6">
                  Our commitment to precision scheduling ensures client operations remain uninterrupted. Current SLA compliance indicates exceptional stability in logistics and final QA release.
                </p>
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-full text-[11px] border border-blue-100">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +2.4% vs Last Month
                </div>
              </div>
              <div className="w-48 h-48 rounded-full border-[12px] border-zinc-100 relative flex flex-col items-center justify-center shrink-0">
                {/* Simulated circular progress */}
                <div className="absolute inset-0 rounded-full border-[12px] border-[#cc4224] rotate-45" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', borderTopColor: 'transparent', borderRightColor: 'transparent'}}></div>
                <p className="text-[40px] font-black text-zinc-900 leading-none">
                  {serviceLevel ? Math.round(serviceLevel.deliveryOntime) : (perfTimeframe === "7 Hari" ? "98" : perfTimeframe === "Tahun Ini" ? "99" : "95.2")}%
                </p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Success Rate</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Yield Rate (First Pass)</p>
                <p className="text-[32px] font-black text-zinc-900 leading-none mb-3">{productionMetrics ? productionMetrics.yieldRate : 94.2}%</p>
                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${productionMetrics ? productionMetrics.yieldRate : 94.2}%` }}></div>
                </div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Machine Uptime</p>
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-[32px] font-black text-zinc-900 leading-none mb-1">{productionMetrics ? productionMetrics.uptime : 98.5}%</p>
                <p className="text-[12px] font-medium text-orange-600">2 Alerts</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[16px] font-bold text-zinc-900">Production Volume Trends</h3>
                <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-[12px] font-bold text-[#cc4224] hover:underline">Export CSV</button>
              </div>
              {/* Dummy Bar Chart */}
              <div className="h-[200px] flex items-end justify-between px-4 gap-2">
                <div className="w-full bg-zinc-100 rounded-t-md h-[40%] hover:bg-zinc-200 transition-colors relative group"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded">4k</div></div>
                <div className="w-full bg-zinc-100 rounded-t-md h-[60%] hover:bg-zinc-200 transition-colors relative group"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded">6k</div></div>
                <div className="w-full bg-zinc-100 rounded-t-md h-[55%] hover:bg-zinc-200 transition-colors relative group"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded">5.5k</div></div>
                <div className="w-full bg-zinc-100 rounded-t-md h-[80%] hover:bg-zinc-200 transition-colors relative group"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded">8k</div></div>
                <div className="w-full bg-blue-100 rounded-t-md h-[90%] relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#cc4224]"></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase mt-4 px-4">
                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-zinc-900 mb-6">Batch Cycle Time</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-zinc-100 rounded-xl bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <Factory className="w-4 h-4 text-zinc-400" />
                    <div>
                      <p className="text-[12px] font-bold text-zinc-900">Molding Line A</p>
                      <p className="text-[10px] text-zinc-500">Extrusion</p>
                    </div>
                  </div>
                  <span className="font-black text-[16px] text-zinc-900">42<span className="text-[12px] text-zinc-400 font-medium">m</span></span>
                </div>
                <div className="flex items-center justify-between p-3 border border-zinc-100 rounded-xl bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <Factory className="w-4 h-4 text-zinc-400" />
                    <div>
                      <p className="text-[12px] font-bold text-zinc-900">Molding Line B</p>
                      <p className="text-[10px] text-zinc-500">Pressing</p>
                    </div>
                  </div>
                  <span className="font-black text-[16px] text-zinc-900">55<span className="text-[12px] text-zinc-400 font-medium">m</span></span>
                </div>
                <div className="flex items-center justify-between p-3 border border-red-100 rounded-xl bg-red-50/50">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <div>
                      <p className="text-[12px] font-bold text-red-900">Finishing</p>
                      <p className="text-[10px] text-red-600 font-bold">Curing Delay</p>
                    </div>
                  </div>
                  <span className="font-black text-[16px] text-red-600">1h 12<span className="text-[12px] text-red-400 font-medium">m</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MAINTENANCE TAB */}
      {activeTab === "maintenance" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Manajemen Pemeliharaan Peralatan</h1>
              <p className="text-[13px] text-zinc-500">Monitor status mesin, jadwalkan perbaikan, dan tinjau log historis.</p>
            </div>
            <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="bg-[#0a1526] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <CalendarClock className="w-4 h-4" /> Schedule New Maintenance
            </button>
          </div>

          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-[16px] font-bold text-red-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Preventive Maintenance Alerts
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              {maintenanceAlerts.map(alertItem => (
                <div key={alertItem.id} className={`flex-1 bg-white rounded-xl p-4 flex items-center justify-between border ${alertItem.urgent ? 'border-red-100' : 'border-orange-100'} shadow-sm`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${alertItem.urgent ? 'bg-red-50' : 'bg-orange-50'} flex items-center justify-center`}>
                      <Factory className={`w-5 h-5 ${alertItem.urgent ? 'text-red-500' : 'text-orange-500'}`} />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-zinc-900">{alertItem.machine}</p>
                      <p className={`text-[12px] font-medium ${alertItem.urgent ? 'text-red-600' : 'text-orange-600'}`}>{alertItem.message}</p>
                    </div>
                  </div>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-[12px] font-bold text-zinc-700 hover:text-zinc-900 bg-zinc-100 px-4 py-2 rounded-lg">Review</button>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-[18px] font-bold text-zinc-900 mb-4 mt-8">Machine Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-zinc-300 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[16px] font-bold text-zinc-900 mb-2">Hydraulic Press A1</h3>
                  <span className="bg-green-50 text-green-700 font-bold px-2.5 py-1 rounded-md text-[10px] flex items-center gap-1 w-max"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Operating</span>
                </div>
                <MoreVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div className="bg-zinc-50 rounded-lg p-3">
                  <p className="text-zinc-500 mb-1">Temp inside</p>
                  <p className="font-bold text-zinc-900 text-[14px]">78°C</p>
                </div>
                <div className="bg-zinc-50 rounded-lg p-3">
                  <p className="text-zinc-500 mb-1">Oil Viscosity</p>
                  <p className="font-bold text-green-600 text-[14px]">Normal</p>
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 mt-4">Last Maintained: 12 Aug 2024</p>
            </div>

            <div className="bg-white border-2 border-red-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10"></div>
              <div className="flex justify-between items-start mb-6 z-10 relative">
                <div>
                  <h3 className="text-[16px] font-bold text-zinc-900 mb-2">HP Rubber #03</h3>
                  <span className="bg-red-50 text-red-700 font-bold px-2.5 py-1 rounded-md text-[10px] flex items-center gap-1 w-max"><Wrench className="w-3 h-3" /> Maintenance Task</span>
                </div>
                <MoreVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px] z-10 relative">
                <div className="bg-white border border-red-100 rounded-lg p-3">
                  <p className="text-zinc-500 mb-1">Temp inside</p>
                  <p className="font-bold text-red-600 text-[14px]">Offline</p>
                </div>
                <div className="bg-white border border-red-100 rounded-lg p-3">
                  <p className="text-zinc-500 mb-1">Pressure</p>
                  <p className="font-bold text-red-600 text-[14px]">0 PSI</p>
                </div>
              </div>
              <p className="text-[11px] font-bold text-[#cc4224] mt-4 text-center border-t border-red-100 pt-3">Est. Completion: 16:00 Today</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-zinc-300 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[16px] font-bold text-zinc-900 mb-2">Extruder Line C</h3>
                  <span className="bg-zinc-100 text-zinc-600 font-bold px-2.5 py-1 rounded-md text-[10px] flex items-center gap-1 w-max"><div className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div> Idle</span>
                </div>
                <MoreVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div className="bg-zinc-50 rounded-lg p-3">
                  <p className="text-zinc-500 mb-1">Power Status</p>
                  <p className="font-bold text-zinc-900 text-[14px]">Standby</p>
                </div>
                <div className="bg-zinc-50 rounded-lg p-3">
                  <p className="text-zinc-500 mb-1">Uptime</p>
                  <p className="font-bold text-zinc-900 text-[14px]">0h</p>
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 mt-4">Scheduled Start: Tomorrow 07:00</p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-zinc-900">Historical Maintenance Log</h3>
              <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="text-[13px] font-bold text-zinc-900 flex items-center gap-1 hover:underline">View All <ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 text-[10px] uppercase tracking-widest text-zinc-400">
                    <th className="py-4 px-6 font-bold">Date</th>
                    <th className="py-4 px-6 font-bold">Machine ID</th>
                    <th className="py-4 px-6 font-bold">Type</th>
                    <th className="py-4 px-6 font-bold">Technician</th>
                    <th className="py-4 px-6 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {maintenanceLogs.map((log, index) => (
                    <tr key={index} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="py-4 px-6 text-zinc-500">{log.date}</td>
                      <td className="py-4 px-6 font-bold text-zinc-900">{log.machineId}</td>
                      <td className="py-4 px-6 text-zinc-700">{log.type}</td>
                      <td className="py-4 px-6 text-zinc-700">{log.technician}</td>
                      <td className="py-4 px-6"><span className={`font-bold px-3 py-1 rounded-full text-[10px] border ${log.statusColorClass}`}>{log.statusText}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL (Image 6) */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-[500px] w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowReportModal(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-zinc-700" />
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-zinc-900">Generate Report</h2>
                <p className="text-[12px] text-zinc-500">Configure parameters for active production batches</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-bold text-zinc-900 mb-3">File Format</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="border-2 border-[#cc4224] rounded-xl p-3 bg-orange-50/30 cursor-pointer relative">
                    <div className="w-4 h-4 rounded-full border-4 border-[#cc4224] absolute top-3 right-3 bg-white"></div>
                    <FileText className="w-5 h-5 text-[#cc4224] mb-2" />
                    <p className="font-bold text-[13px] text-zinc-900">PDF</p>
                    <p className="text-[10px] text-zinc-500">Presentation-ready</p>
                  </div>
                  <div className="border border-zinc-200 rounded-xl p-3 hover:border-zinc-300 cursor-pointer relative">
                    <div className="w-4 h-4 rounded-full border border-zinc-300 absolute top-3 right-3 bg-white"></div>
                    <LayoutDashboard className="w-5 h-5 text-green-600 mb-2" />
                    <p className="font-bold text-[13px] text-zinc-900">Excel</p>
                    <p className="text-[10px] text-zinc-500">Data analysis</p>
                  </div>
                  <div className="border border-zinc-200 rounded-xl p-3 hover:border-zinc-300 cursor-pointer relative">
                    <div className="w-4 h-4 rounded-full border border-zinc-300 absolute top-3 right-3 bg-white"></div>
                    <Settings className="w-5 h-5 text-zinc-600 mb-2" />
                    <p className="font-bold text-[13px] text-zinc-900">CSV</p>
                    <p className="text-[10px] text-zinc-500">Raw system import</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-zinc-900 mb-3">Date Range</label>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-zinc-500 mb-1 block">Start Date</label>
                    <input type="date" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-[12px] focus:border-[#cc4224] outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-zinc-500 mb-1 block">End Date</label>
                    <input type="date" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-[12px] focus:border-[#cc4224] outline-none" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-3 py-1 bg-zinc-100 rounded-md text-[11px] font-bold text-zinc-600 hover:bg-zinc-200">Today</button>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-3 py-1 bg-zinc-100 rounded-md text-[11px] font-bold text-zinc-600 hover:bg-zinc-200">Last 7 Days</button>
                  <button onClick={() => alert('Fitur ini sedang dalam pengembangan')} className="px-3 py-1 bg-zinc-100 rounded-md text-[11px] font-bold text-zinc-600 hover:bg-zinc-200">This Month</button>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-zinc-900 mb-3">Include Metrics</label>
                <div className="space-y-2 bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="w-5 h-5 rounded bg-[#cc4224] text-white flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" /></div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">Cycle Time</p>
                      <p className="text-[11px] text-zinc-500">Average time per production batch</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <div className="w-5 h-5 rounded bg-[#cc4224] text-white flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" /></div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">Yield Rate</p>
                      <p className="text-[11px] text-zinc-500">Percentage of acceptable products</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <div className="w-5 h-5 rounded border border-zinc-300 bg-white shrink-0 mt-0.5"></div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">Machine Uptime</p>
                      <p className="text-[11px] text-zinc-500">Operational hours vs downtime</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button onClick={() => setShowReportModal(false)} className="px-6 py-2.5 bg-white border border-zinc-300 text-zinc-700 font-bold text-[13px] rounded-lg hover:bg-zinc-50">Cancel</button>
                <button onClick={() => setShowReportModal(false)} className="px-6 py-2.5 bg-[#cc4224] text-white font-bold text-[13px] rounded-lg hover:bg-[#b0351b] flex items-center gap-2"><Download className="w-4 h-4" /> Download Report</button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
