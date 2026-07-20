"use client";

import Link from "next/link";
import { Transaction } from "@/db/schema";

// We extend Transaction with some joined fields for UI
type OrderRow = Transaction & {
  clientName: string;
  clientRole: string; // to distinguish B2B/Enterprise/Retail
};

type Props = {
  orders: OrderRow[];
};

export default function LiveOrdersTable({ orders }: Props) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };

  const getClientInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col w-full">
      <div className="p-6 flex items-center justify-between border-b border-zinc-100">
        <h3 className="text-lg font-bold text-black">Live Incoming Orders</h3>
        <Link href="/admin/orders" className="text-sm font-semibold text-[#f05c35] hover:underline">
          View All Orders
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">Order ID</th>
              <th className="py-4 px-6 font-semibold">Client / Entity</th>
              <th className="py-4 px-6 font-semibold">Type</th>
              <th className="py-4 px-6 font-semibold">Category</th>
              <th className="py-4 px-6 font-semibold text-right">Amount</th>
              <th className="py-4 px-6 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-bold text-black whitespace-nowrap">
                  {order.id}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#1a2332] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {getClientInitials(order.clientName)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-black">{order.clientName}</span>
                      <span className="text-[11px] text-zinc-500">
                        {order.clientRole === "admin" ? "Internal" : order.clientRole === "user" && order.shippingMethod === "BULK" ? "Enterprise B2B" : "Retail B2C"}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded uppercase tracking-wider">
                    {order.shippingMethod || "UNIT"}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-zinc-700">
                  {order.shippingMethod === "BULK" ? "Molding" : order.shippingMethod === "UNIT" ? "Extrusion" : "Custom Seal"}
                </td>
                <td className="py-4 px-6 text-sm font-bold text-black text-right whitespace-nowrap">
                  {formatRupiah(order.totalAmount)}
                </td>
                <td className="py-4 px-6 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-zinc-500 text-sm">
                  No incoming orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
