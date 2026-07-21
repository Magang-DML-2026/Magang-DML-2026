"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { B2BOrdersTable, type B2BOrder } from "@/components/admin/orders/B2BOrdersTable";
import { B2CReceiptValidation } from "@/components/admin/orders/B2CReceiptValidation";
import type { Receipt } from "@/components/admin/orders/receiptData";
import { OrderStatsCards } from "@/components/admin/orders/OrderStatsCards";
import { ChatModal } from "@/components/admin/orders/ChatModal";
import { SPKModal } from "@/components/admin/orders/SPKModal";
import { FilterModal } from "@/components/admin/orders/FilterModal";
import { ApprovalModal } from "@/components/admin/orders/ApprovalModal";
import { ExportModal } from "@/components/admin/orders/ExportModal";
import { RejectModal } from "@/components/admin/orders/RejectModal";

export default function OrdersPage() {
  const [selectedChatOrder, setSelectedChatOrder] = useState<B2BOrder | null>(null);
  const [selectedSPKOrder, setSelectedSPKOrder] = useState<B2BOrder | null>(null);
  const [selectedApprovalOrder, setSelectedApprovalOrder] = useState<B2BOrder | null>(null);
  const [selectedRejectReceipt, setSelectedRejectReceipt] = useState<Receipt | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const user = { name: "Admin User", email: "admin@dml.com" };

  return (
    <>
      <AdminHeader title="Admin Portal" user={user} />

      <main className="flex-1 overflow-hidden flex flex-col bg-white">

        {/* Page Header */}
        <div className="px-8 py-6 border-b border-zinc-200 shrink-0">
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-2">
            <span className="font-bold text-black">Order Management</span>
            <span>Reports</span>
          </div>
          <h1 className="text-3xl font-bold text-black tracking-tight mb-1">Order Management</h1>
          <p className="text-sm text-zinc-500">
            Review B2C transactions and negotiate B2B RFQs.
          </p>
        </div>

        {/* Main Content — Split View */}
        <div className="flex-1 flex overflow-hidden">

          {/* Left Column */}
          <div className="flex-1 flex flex-col p-8 gap-8 overflow-y-auto">

            {/* Summary Widgets */}
            <div className="flex gap-4 mb-2">
              <div className="bg-white border-2 border-orange-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm min-w-[180px]">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pending B2B</p>
                  <p className="text-sm font-black text-black">12 RFQs</p>
                </div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm min-w-[180px]">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Awaiting B2C</p>
                  <p className="text-sm font-black text-black">28 Rects</p>
                </div>
              </div>
            </div>

            <B2BOrdersTable
              onOpenChat={setSelectedChatOrder}
              onOpenSPK={setSelectedSPKOrder}
              onOpenApproval={setSelectedApprovalOrder}
              onOpenFilter={() => setIsFilterOpen(true)}
              onOpenExport={() => setIsExportOpen(true)}
            />

            <OrderStatsCards />
            <div className="h-4 shrink-0" />
          </div>

          {/* Right Column — B2C Receipts (Verify Payment now navigates to its own page) */}
          <B2CReceiptValidation
            onOpenReject={setSelectedRejectReceipt}
          />

        </div>
      </main>

      {/* ── Modals ── */}
      <ChatModal
        isOpen={!!selectedChatOrder}
        onClose={() => setSelectedChatOrder(null)}
        order={selectedChatOrder}
      />

      <SPKModal
        isOpen={!!selectedSPKOrder}
        onClose={() => setSelectedSPKOrder(null)}
        order={selectedSPKOrder}
      />

      <ApprovalModal
        isOpen={!!selectedApprovalOrder}
        onClose={() => setSelectedApprovalOrder(null)}
        order={selectedApprovalOrder}
        onConfirmed={(id) => console.log("Approved order:", id)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <RejectModal
        isOpen={!!selectedRejectReceipt}
        onClose={() => setSelectedRejectReceipt(null)}
        receipt={selectedRejectReceipt}
        onConfirmed={(id, reason, notes) => {
          console.log("Rejected receipt:", id, "Reason:", reason, "Notes:", notes);
          // TODO: call API to persist rejection
        }}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}
