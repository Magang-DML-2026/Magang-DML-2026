"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type AuthState } from "@/app/actions/auth";
import { Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";
import { useState } from "react";
import { BubbleAnimation } from "@/components/ui/bubble-animation";

export default function RegisterPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    registerAction,
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
        <BubbleAnimation />
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 right-20 w-72 h-72 bg-[#f05c35]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-20 w-96 h-96 bg-[#f05c35]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-[#f05c35]/5 rounded-full blur-2xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link
            href="/"
            className="text-3xl font-bold text-white mb-6 tracking-tight"
          >
            Duta Mitra Luhur
          </Link>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
            Bergabunglah dan kelola bisnis karet Anda dengan sistem modern dan
            terintegrasi.
          </p>
          <div className="mt-12 space-y-4">
            {[
              "Dashboard manajemen lengkap",
              "Pengelolaan produk real-time",
              "Laporan dan analitik bisnis",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f05c35]/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#f05c35]" />
                </div>
                <span className="text-zinc-400 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link
              href="/"
              className="text-2xl font-bold text-black tracking-tight"
            >
              Duta Mitra Luhur
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full text-xs font-medium text-zinc-600 mb-4">
              <UserPlus className="w-3.5 h-3.5" />
              Buat akun baru
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Daftar akun
            </h1>
            <p className="mt-2 text-zinc-500">
              Mulai kelola bisnis Anda hari ini
            </p>
          </div>

          {/* Global Error */}
          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-red-500 text-lg">!</span>
              </div>
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={action} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
              />
              {state?.fieldErrors?.name && (
                <p className="mt-1.5 text-xs text-red-500">
                  {state.fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nama@email.com"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
              />
              {state?.fieldErrors?.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
              {state?.fieldErrors?.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {state.fieldErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Ulangi password"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:border-[#f05c35] transition-all placeholder:text-zinc-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
              {state?.fieldErrors?.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  {state.fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 px-6 rounded-xl text-sm font-semibold hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900/20 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {pending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Buat Akun
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400">atau</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-zinc-500">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-[#f05c35] font-semibold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>

          {/* Back to home */}
          <p className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              ← Kembali ke halaman utama
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
