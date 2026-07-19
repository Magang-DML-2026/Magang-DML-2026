"use client";

import { useActionState, useEffect } from "react";
import {
  addAddressAction,
  updateAddressAction,
  type AddressState,
} from "@/app/actions/address";
import type { Address } from "@/db/schema";
import { Save, X } from "lucide-react";

type Props = {
  address?: Address | null;
  onClose: () => void;
};

export default function AddressForm({ address, onClose }: Props) {
  const isEdit = !!address;

  const [state, action, pending] = useActionState<AddressState, FormData>(
    isEdit ? updateAddressAction : addAddressAction,
    null
  );

  // If success, close the form
  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state?.success, onClose]);

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-zinc-900">
          {isEdit ? "Edit Alamat" : "Tambah Alamat Baru"}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        {isEdit && (
          <input type="hidden" name="addressId" value={address.id} />
        )}

        {/* Row 1: Label + Recipient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="addr-label"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Label Alamat
            </label>
            <select
              id="addr-label"
              name="label"
              defaultValue={address?.label || "Rumah"}
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all"
            >
              <option value="Rumah">Rumah</option>
              <option value="Kantor">Kantor</option>
              <option value="Apartemen">Apartemen</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            {state?.fieldErrors?.label && (
              <p className="mt-1 text-xs text-red-500">
                {state.fieldErrors.label}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="addr-recipient"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Nama Penerima
            </label>
            <input
              id="addr-recipient"
              name="recipientName"
              type="text"
              required
              defaultValue={address?.recipientName || ""}
              placeholder="Nama lengkap penerima"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
            />
            {state?.fieldErrors?.recipientName && (
              <p className="mt-1 text-xs text-red-500">
                {state.fieldErrors.recipientName}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone */}
        <div>
          <label
            htmlFor="addr-phone"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Nomor Telepon
          </label>
          <input
            id="addr-phone"
            name="phone"
            type="tel"
            required
            defaultValue={address?.phone || ""}
            placeholder="08xxxxxxxxxx"
            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
          />
          {state?.fieldErrors?.phone && (
            <p className="mt-1 text-xs text-red-500">
              {state.fieldErrors.phone}
            </p>
          )}
        </div>

        {/* Row 3: Province + City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="addr-province"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Provinsi
            </label>
            <input
              id="addr-province"
              name="province"
              type="text"
              required
              defaultValue={address?.province || ""}
              placeholder="Jawa Barat"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
            />
            {state?.fieldErrors?.province && (
              <p className="mt-1 text-xs text-red-500">
                {state.fieldErrors.province}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="addr-city"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Kota / Kabupaten
            </label>
            <input
              id="addr-city"
              name="city"
              type="text"
              required
              defaultValue={address?.city || ""}
              placeholder="Bandung"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
            />
            {state?.fieldErrors?.city && (
              <p className="mt-1 text-xs text-red-500">
                {state.fieldErrors.city}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: District + Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="addr-district"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Kecamatan
            </label>
            <input
              id="addr-district"
              name="district"
              type="text"
              required
              defaultValue={address?.district || ""}
              placeholder="Coblong"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
            />
            {state?.fieldErrors?.district && (
              <p className="mt-1 text-xs text-red-500">
                {state.fieldErrors.district}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="addr-postal"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Kode Pos
            </label>
            <input
              id="addr-postal"
              name="postalCode"
              type="text"
              required
              defaultValue={address?.postalCode || ""}
              placeholder="40132"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
            />
            {state?.fieldErrors?.postalCode && (
              <p className="mt-1 text-xs text-red-500">
                {state.fieldErrors.postalCode}
              </p>
            )}
          </div>
        </div>

        {/* Row 5: Full Address */}
        <div>
          <label
            htmlFor="addr-full"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Alamat Lengkap
          </label>
          <textarea
            id="addr-full"
            name="fullAddress"
            required
            rows={3}
            defaultValue={address?.fullAddress || ""}
            placeholder="Jl. Nama Jalan No. 123, RT/RW, Kelurahan"
            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400 resize-none"
          />
          {state?.fieldErrors?.fullAddress && (
            <p className="mt-1 text-xs text-red-500">
              {state.fieldErrors.fullAddress}
            </p>
          )}
        </div>

        {/* Default checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isDefault"
            defaultChecked={address?.isDefault || false}
            className="w-4 h-4 rounded border-zinc-300 text-[#f05c35] focus:ring-[#f05c35]/30"
          />
          <span className="text-sm text-zinc-700">
            Jadikan alamat utama
          </span>
        </label>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 bg-zinc-900 text-white py-2.5 px-5 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {pending ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEdit ? "Simpan Perubahan" : "Tambah Alamat"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors cursor-pointer py-2.5 px-4"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
