"use client";

import { BarChart3, MessageSquare } from "lucide-react";

export type B2BOrder = {
  id: string;
  clientName: string;
  projectName: string;
  items: number;
  unitType: string;
  material: string;
  estimatedValue: string;
  status: "Negotiation" | "Pending Admin" | "Awaiting Specs";
};

export const mockOrders: B2BOrder[] = [
  {
    id: "RFQ #2024-0089",
    clientName: "Indo-Machine Parts Ltd.",
    projectName: "Custom Seals",
    items: 5000,
    unitType: "Units",
    material: "EPDM Rubber Molding",
    estimatedValue: "145.5M",
    status: "Negotiation",
  },
  {
    id: "RFQ #2024-0102",
    clientName: "Surya Automotives",
    projectName: "Engine Mounts",
    items: 1200,
    unitType: "Units",
    material: "Natural Rubber Extrusion",
    estimatedValue: "82.2M",
    status: "Pending Admin",
  },
  {
    id: "RFQ #2024-0115",
    clientName: "Mega Build Solutions",
    projectName: "Bridge Bearings",
    items: 150,
    unitType: "Units",
    material: "Heavy Duty Neoprene",
    estimatedValue: "210.0M",
    status: "Awaiting Specs",
  },
];

const StatusBadge = ({ status }: { status: B2BOrder["status"] }) => {
  switch (status) {
    case "Negotiation":
      return <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">Negotiation</span>;
    case "Pending Admin":
      return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full whitespace-nowrap">Pending Admin</span>;
    case "Awaiting Specs":
      return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full whitespace-nowrap">Awaiting Specs</span>;
  }
};

type Props = {
  onOpenChat: (order: B2BOrder) => void;
  onOpenSPK: (order: B2BOrder) => void;
  onOpenFilter: () => void;
  onOpenApproval: (order: B2BOrder) => void;
  onOpenExport: () => void;
};

export function B2BOrdersTable({ onOpenChat, onOpenSPK, onOpenFilter, onOpenApproval, onOpenExport }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#f05c35]" />
          <h2 className="font-semibold text-black">Pending B2B RFQs</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onOpenFilter}
            className="px-4 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-semibold rounded-md transition-colors"
          >
            Filter
          </button>
          <button
            onClick={onOpenExport}
            className="px-4 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-semibold rounded-md transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Client / Project</th>
              <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Items &amp; Volume</th>
              <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Estimated Value</th>
              <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-5 align-top">
                  <div className="font-bold text-black text-sm">{order.clientName}</div>
                  <div className="text-xs text-zinc-500 mt-1">{order.id} • {order.projectName}</div>
                </td>
                <td className="px-6 py-5 align-top">
                  <div className="text-sm font-semibold text-black">{order.items.toLocaleString("en-US")} {order.unitType}</div>
                  <div className="text-xs text-zinc-500 mt-1 max-w-[120px] leading-tight">{order.material}</div>
                </td>
                <td className="px-6 py-5 align-top">
                  <div className="text-xs font-bold text-black">IDR</div>
                  <div className="text-base font-black text-black">{order.estimatedValue}</div>
                </td>
                <td className="px-6 py-5 align-top">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-5 align-top">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onOpenChat(order)}
                      className="p-1.5 text-zinc-400 hover:text-black transition-colors"
                      title="Open Chat"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onOpenApproval(order)}
                      className="px-3 py-1.5 bg-[#d94a26] hover:bg-[#c24222] text-white text-xs font-bold rounded shadow-sm transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onOpenSPK(order)}
                      className="px-3 py-1.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-black text-xs font-bold rounded shadow-sm transition-colors"
                    >
                      SPK
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
