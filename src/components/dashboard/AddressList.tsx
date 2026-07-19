"use client";

import { useState, useTransition } from "react";
import type { Address } from "@/db/schema";
import {
  deleteAddressAction,
  setDefaultAddressAction,
} from "@/app/actions/address";
import AddressForm from "./AddressForm";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
  Phone,
  User,
} from "lucide-react";

type Props = {
  addresses: Address[];
};

export default function AddressList({ addresses }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (addressId: number) => {
    if (!confirm("Yakin ingin menghapus alamat ini?")) return;
    startTransition(async () => {
      await deleteAddressAction(addressId);
    });
  };

  const handleSetDefault = (addressId: number) => {
    startTransition(async () => {
      await setDefaultAddressAction(addressId);
    });
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-1">
            Alamat Pengiriman
          </h2>
          <p className="text-sm text-zinc-500">
            Kelola alamat untuk pengiriman pesanan
          </p>
        </div>
        {!showForm && !editingAddress && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#f05c35] text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-[#d94a28] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Alamat</span>
          </button>
        )}
      </div>

      {/* Add Form */}
      {showForm && (
        <AddressForm
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingAddress && (
        <AddressForm
          address={editingAddress}
          onClose={() => setEditingAddress(null)}
        />
      )}

      {/* Address Cards */}
      {addresses.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7 text-zinc-400" />
          </div>
          <p className="text-zinc-500 text-sm mb-4">
            Belum ada alamat pengiriman
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-[#f05c35] font-semibold hover:underline cursor-pointer"
          >
            + Tambah alamat pertama
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`relative border rounded-xl p-5 transition-all ${
                addr.isDefault
                  ? "border-[#f05c35]/30 bg-[#f05c35]/[0.02]"
                  : "border-zinc-200 hover:border-zinc-300"
              } ${isPending ? "opacity-60 pointer-events-none" : ""}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-full">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-xs font-semibold bg-[#f05c35]/10 text-[#f05c35] px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Utama
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-zinc-400 hover:text-[#f05c35] transition-colors p-1.5 rounded-lg hover:bg-zinc-50 cursor-pointer"
                      title="Set sebagai alamat utama"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingAddress(addr);
                    }}
                    className="text-zinc-400 hover:text-zinc-700 transition-colors p-1.5 rounded-lg hover:bg-zinc-50 cursor-pointer"
                    title="Edit alamat"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-zinc-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-zinc-50 cursor-pointer"
                    title="Hapus alamat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Recipient Info */}
              <div className="flex items-center gap-4 mb-2 text-sm">
                <span className="flex items-center gap-1.5 text-zinc-700 font-medium">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  {addr.recipientName}
                </span>
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  {addr.phone}
                </span>
              </div>

              {/* Address */}
              <p className="text-sm text-zinc-600 leading-relaxed">
                {addr.fullAddress}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                {addr.district}, {addr.city}, {addr.province} {addr.postalCode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
