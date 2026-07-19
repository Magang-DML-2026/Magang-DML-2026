"use client";

import { useActionState } from "react";
import { updateProfileAction, type ProfileState } from "@/app/actions/profile";
import { Save, CheckCircle } from "lucide-react";

type Props = {
  initialName: string;
  initialPhone: string | null;
};

export default function ProfileForm({ initialName, initialPhone }: Props) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(
    updateProfileAction,
    null
  );

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-1">
        Informasi Profil
      </h2>
      <p className="text-sm text-zinc-500 mb-6">
        Kelola informasi dasar akun Anda
      </p>

      {state?.success && (
        <div className="mb-5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Profil berhasil diperbarui.
        </div>
      )}

      {state?.error && (
        <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-5">
        <div>
          <label
            htmlFor="profile-name"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Nama Lengkap
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            required
            defaultValue={initialName}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all"
          />
          {state?.fieldErrors?.name && (
            <p className="mt-1.5 text-xs text-red-500">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="profile-phone"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Nomor Telepon{" "}
            <span className="text-zinc-400 font-normal">(opsional)</span>
          </label>
          <input
            id="profile-phone"
            name="phone"
            type="tel"
            defaultValue={initialPhone || ""}
            placeholder="08xxxxxxxxxx"
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
          />
          {state?.fieldErrors?.phone && (
            <p className="mt-1.5 text-xs text-red-500">
              {state.fieldErrors.phone}
            </p>
          )}
        </div>

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
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
