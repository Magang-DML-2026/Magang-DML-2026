"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type AuthState } from "@/app/actions/auth";
import { Eye, EyeOff, User, Mail, Phone, Lock, KeyRound } from "lucide-react";
import { useState } from "react";

export default function RegisterClient() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    registerAction,
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay to make the card pop */}
        <div className="absolute inset-0 bg-[#0f172a]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px] bg-white rounded-xl shadow-2xl p-8 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight mb-2">
              Duta Mitra Luhur
            </h1>
            <p className="text-[12px] text-zinc-500 leading-relaxed max-w-[280px] mx-auto">
              Buat akun B2C untuk mulai belanja produk industri berkualitas
            </p>
          </div>

          {/* Global Error */}
          {state?.error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs text-center">
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={action} className="space-y-4">
            
            {/* Nama Lengkap */}
            <div>
              <label htmlFor="name" className="block text-[11px] font-bold text-zinc-700 mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-[#f05c35] focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
                />
              </div>
              {state?.fieldErrors?.name && (
                <p className="mt-1 text-[11px] text-red-500">{state.fieldErrors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-zinc-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="contoh@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-[#f05c35] focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
                />
              </div>
              {state?.fieldErrors?.email && (
                <p className="mt-1 text-[11px] text-red-500">{state.fieldErrors.email}</p>
              )}
            </div>

            {/* Nomor Telepon */}
            <div>
              <label htmlFor="phone" className="block text-[11px] font-bold text-zinc-700 mb-1.5">
                Nomor Telepon
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-[#f05c35] focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
                />
              </div>
              {state?.fieldErrors?.phone && (
                <p className="mt-1 text-[11px] text-red-500">{state.fieldErrors.phone}</p>
              )}
            </div>

            {/* Kata Sandi */}
            <div>
              <label htmlFor="password" className="block text-[11px] font-bold text-zinc-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min. 8 karakter"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-zinc-200 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-[#f05c35] focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {state?.fieldErrors?.password && (
                <p className="mt-1 text-[11px] text-red-500">{state.fieldErrors.password}</p>
              )}
            </div>

            {/* Konfirmasi Kata Sandi */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[11px] font-bold text-zinc-700 mb-1.5">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Ulangi kata sandi"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-zinc-200 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-[#f05c35] focus:border-[#f05c35] transition-all placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {state?.fieldErrors?.confirmPassword && (
                <p className="mt-1 text-[11px] text-red-500">{state.fieldErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#f05c35] text-white py-2.5 rounded-md text-[13px] font-bold hover:bg-[#d94a26] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-4"
            >
              {pending ? "Memproses..." : "Daftar Sekarang"}
            </button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-[12px] text-zinc-500">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-[#f05c35] font-semibold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
          
        </div>
        
        {/* Footer Text */}
        <div className="mt-8 text-center text-zinc-400/80 text-[10px] max-w-[300px]">
          © 2024 PT Duta Mitra Luhur. All rights reserved. Industrial Excellence through Precision.
        </div>
      </div>
    </div>
  );
}
