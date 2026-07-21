"use client";

import { useState } from "react";
import { Search, Bell, UserCog, ShieldCheck, Laptop, BellRing, AlertTriangle, RotateCcw } from "lucide-react";

// Helper component for Toggle Switch
function Toggle({ label, isActive, onChange }: { label: string, isActive: boolean, onChange: () => void }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm text-zinc-600">{label}</span>
      <button 
        onClick={onChange}
        className={`w-[42px] h-[24px] rounded-full p-[2px] transition-colors duration-200 ease-in-out relative ${isActive ? 'bg-[#b2391b]' : 'bg-zinc-300'}`}
      >
        <div 
          className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isActive ? 'translate-x-[18px]' : 'translate-x-0'}`} 
        />
      </button>
    </div>
  );
}

export function SettingsClient({ adminName, adminAvatar }: { adminName: string, adminAvatar?: string }) {
  
  // States for toggles
  const [toggles, setToggles] = useState({
    rfq: true,
    status: true,
    laporan: false,
    stok: true,
    loginBaru: true,
    updateKeamanan: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#fafafa]">
      
      {/* ── Page Header ─────────────── */}
      <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <span className="text-black font-black text-xl tracking-tight">Admin Portal</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari pengaturan..."
              className="pl-9 pr-4 py-2 w-[240px] bg-zinc-100 border border-zinc-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#f05c35]/30 focus:bg-white transition-all"
            />
          </div>
          <button className="relative text-zinc-500 hover:text-black transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {adminAvatar ? (
              <img src={adminAvatar} alt={adminName} className="w-8 h-8 rounded-full border border-zinc-200 object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                <span className="text-xs font-bold">{adminName.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-6xl mx-auto w-full">
        
        {/* Title Area */}
        <div className="mb-8">
          <h1 className="text-[32px] font-black text-black tracking-tight mb-2">Pengaturan Sistem</h1>
          <p className="text-[15px] text-zinc-500 font-medium">Kelola profil Anda, keamanan akun, dan preferensi notifikasi pabrik.</p>
        </div>

        {/* Top Grid (Profile & Security) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
          
          {/* Left Column: Profil Pengguna */}
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <UserCog className="w-6 h-6 text-[#b2391b]" />
              <h2 className="text-xl font-bold text-black">Profil Pengguna</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Photo Column */}
              <div className="flex flex-col items-center gap-4 w-[140px] shrink-0">
                <div className="w-[120px] h-[120px] rounded-xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop" alt="Budi Santoso" className="w-full h-full object-cover" />
                </div>
                <button className="text-sm font-bold text-[#b2391b] hover:text-[#912d14] transition-colors">Ganti Foto Profil</button>
                <button className="w-full mt-4 py-3 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-lg transition-colors shadow-sm">
                  Simpan Perubahan
                </button>
              </div>

              {/* Fields Column */}
              <div className="flex-1 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      defaultValue="Budi Santoso"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-sm text-black outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">Posisi / Jabatan</label>
                    <input 
                      type="text" 
                      defaultValue="Kepala Operasional Produksi"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-sm text-black outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Email Perusahaan</label>
                  <input 
                    type="email" 
                    defaultValue="budi.santoso@dmluhur.co.id"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-sm text-black outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Bio Singkat</label>
                  <textarea 
                    rows={4}
                    defaultValue="Bertanggung jawab atas integrasi supply chain dan kontrol kualitas produk rubber molding untuk klien otomotif."
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Security Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Keamanan Akun */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <div className="flex gap-3 items-center mb-4">
                <ShieldCheck className="w-5 h-5 text-[#b2391b]" />
                <h3 className="font-bold text-black text-sm">Keamanan Akun</h3>
              </div>
              <div className="w-full h-px bg-zinc-200 mb-4"></div>
              <p className="text-[11px] text-zinc-500 mb-4">Terakhir diubah: 3 bulan yang lalu</p>
              <button className="w-full py-2.5 border border-[#b2391b] hover:bg-orange-50 text-[#b2391b] font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Ubah Kata Sandi
              </button>
            </div>

            {/* 2FA */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-black text-xs uppercase tracking-widest">OTENTIKASI 2 FAKTOR</h3>
                <span className="bg-[#e6f4ea] text-[#1e8e3e] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">AKTIF</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed mb-5">
                Gunakan aplikasi autentikasi untuk menambahkan lapisan keamanan ekstra pada akun Anda.
              </p>
              <button className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-black font-bold text-sm rounded-lg transition-colors">
                Konfigurasi 2FA
              </button>
            </div>

            {/* Sesi Aktif */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-black text-sm mb-4">Sesi Aktif</h3>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-zinc-200 rounded-lg flex items-center justify-center shrink-0">
                  <Laptop className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <p className="font-bold text-black text-[13px] mb-0.5">Jakarta, Indonesia</p>
                  <p className="text-[10px] text-zinc-500 font-medium">Chrome di macOS • Sedang Aktif</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Preferensi Notifikasi */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <BellRing className="w-6 h-6 text-[#b2391b]" />
            <h2 className="text-xl font-bold text-black">Preferensi Notifikasi</h2>
          </div>
          <div className="w-full h-px bg-zinc-200 mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1 */}
            <div>
              <h4 className="font-bold text-black text-[13px] mb-4">Pesanan & RFQ</h4>
              <div className="space-y-3">
                <Toggle label="RFQ Baru Masuk" isActive={toggles.rfq} onChange={() => handleToggle('rfq')} />
                <Toggle label="Status Pesanan Berubah" isActive={toggles.status} onChange={() => handleToggle('status')} />
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h4 className="font-bold text-black text-[13px] mb-4">Operasional Pabrik</h4>
              <div className="space-y-3">
                <Toggle label="Laporan Produksi Harian" isActive={toggles.laporan} onChange={() => handleToggle('laporan')} />
                <Toggle label="Peringatan Stok Rendah" isActive={toggles.stok} onChange={() => handleToggle('stok')} />
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold text-black text-[13px] mb-4">Sistem & Keamanan</h4>
              <div className="space-y-3">
                <Toggle label="Login Dari Perangkat Baru" isActive={toggles.loginBaru} onChange={() => handleToggle('loginBaru')} />
                <Toggle label="Update Keamanan" isActive={toggles.updateKeamanan} onChange={() => handleToggle('updateKeamanan')} />
              </div>
            </div>
          </div>
        </div>

        {/* Zona Berbahaya */}
        <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#be123c]" />
            <h2 className="text-xl font-bold text-[#be123c]">Zona Berbahaya</h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm font-medium text-[#9f1239]">
              Menonaktifkan akun akan memutus akses Anda ke seluruh portal manufaktur dan riwayat RFQ.
            </p>
            <button className="px-6 py-3 bg-[#be123c] hover:bg-[#9f1239] text-white font-bold text-sm rounded-lg transition-colors shrink-0 shadow-sm border border-[#9f1239]">
              Nonaktifkan Akun
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
