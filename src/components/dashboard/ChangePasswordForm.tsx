"use client";

import { useActionState } from "react";
import {
  changePasswordAction,
  type PasswordState,
} from "@/app/actions/profile";
import { Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState<PasswordState, FormData>(
    changePasswordAction,
    null
  );
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-1">
        Ganti Password
      </h2>
      <p className="text-sm text-zinc-500 mb-6">
        Pastikan menggunakan password yang kuat
      </p>

      {state?.success && (
        <div className="mb-5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Password berhasil diubah.
        </div>
      )}

      {state?.error && (
        <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-5">
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Password Saat Ini
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              required
              placeholder="Masukkan password saat ini"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showCurrent ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {state?.fieldErrors?.currentPassword && (
            <p className="mt-1.5 text-xs text-red-500">
              {state.fieldErrors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Password Baru
          </label>
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showNew ? "text" : "password"}
              required
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {state?.fieldErrors?.newPassword && (
            <p className="mt-1.5 text-xs text-red-500">
              {state.fieldErrors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <input
              id="confirmNewPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              required
              placeholder="Ulangi password baru"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {state?.fieldErrors?.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-500">
              {state.fieldErrors.confirmPassword}
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
            <Lock className="w-4 h-4" />
          )}
          Ubah Password
        </button>
      </form>
    </div>
  );
}
