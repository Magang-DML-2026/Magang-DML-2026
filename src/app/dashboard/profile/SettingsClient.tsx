"use client";

import { useState } from "react";
import { User, Bell, Lock, CheckCircle } from "lucide-react";
import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";

export default function SettingsClient({ user }: { user: any }) {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [isB2b, setIsB2b] = useState(user.role === "b2b");

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [show2faToast, setShow2faToast] = useState(false);

  const toggle2FA = () => {
    setIs2faEnabled(!is2faEnabled);
    setShow2faToast(true);
    setTimeout(() => setShow2faToast(false), 3000);
  };

  return (
    <div className="p-8 max-w-[1100px] mx-auto font-sans bg-[#F9FAFB] min-h-screen relative">
      {/* 2FA Toast */}
      {show2faToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-top-5">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span className="font-semibold text-sm">
            {is2faEnabled ? "Autentikasi Dua Faktor (2FA) Berhasil Diaktifkan!" : "Autentikasi Dua Faktor (2FA) Dinonaktifkan."}
          </span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-zinc-900 tracking-tight">Settings</h1>
        <p className="text-[13px] text-zinc-500 mt-1">
          Manage your account preferences, company details, and security.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="w-full lg:w-[280px] shrink-0 bg-white rounded-xl border border-zinc-200 p-8 flex flex-col items-center text-center shadow-sm">
          <div className="w-24 h-24 bg-zinc-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-[16px] font-bold text-zinc-900">{name}</h2>
          <p className="text-[12px] text-zinc-500 mb-4">{isB2b ? "Procurement Director" : "Customer"}</p>
          <div className="px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-md uppercase tracking-wider">
            {isB2b ? "B2B Access" : "B2C Access"}
          </div>
        </div>

        {/* Right Column: Settings Blocks */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Profile Settings */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
              <User className="w-5 h-5 text-zinc-700" />
              <h3 className="text-[15px] font-bold text-zinc-900">Profile Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-md text-[13px] text-zinc-900 focus:outline-none focus:border-[#cc4224] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-md text-[13px] text-zinc-900 focus:outline-none focus:border-[#cc4224] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-8 bg-zinc-50 p-4 rounded-lg border border-zinc-100">
              <div>
                <h4 className="text-[13px] font-bold text-zinc-900">Ubah Customer Bisnis</h4>
                <p className="text-[11px] text-zinc-500">Upload dokumen untuk merubah akun menjadi B2B.</p>
              </div>
              <button 
                onClick={() => setIsB2b(!isB2b)}
                className={`w-10 h-5 rounded-full relative transition-colors ${isB2b ? 'bg-[#cc4224]' : 'bg-zinc-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isB2b ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>

            <div className="flex justify-end">
              <button className="px-6 py-2.5 bg-[#cc4224] text-white text-[12px] font-bold rounded-md hover:bg-[#b0351b] transition-colors shadow-sm">
                Save Profile
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
              <Bell className="w-5 h-5 text-zinc-700" />
              <h3 className="text-[15px] font-bold text-zinc-900">Notification Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-50">
                <div>
                  <h4 className="text-[13px] font-bold text-zinc-900">Email Notifications</h4>
                  <p className="text-[11px] text-zinc-500">Receive order updates and invoices via email.</p>
                </div>
                <button 
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${emailNotif ? 'bg-[#cc4224]' : 'bg-zinc-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${emailNotif ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-zinc-50">
                <div>
                  <h4 className="text-[13px] font-bold text-zinc-900">Push Notifications</h4>
                  <p className="text-[11px] text-zinc-500">Real-time alerts in the portal for urgent changes.</p>
                </div>
                <button 
                  onClick={() => setPushNotif(!pushNotif)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${pushNotif ? 'bg-[#cc4224]' : 'bg-zinc-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${pushNotif ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-bold text-zinc-900">SMS Alerts</h4>
                  <p className="text-[11px] text-zinc-500">Get text messages for critical shipment delays.</p>
                </div>
                <button 
                  onClick={() => setSmsNotif(!smsNotif)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${smsNotif ? 'bg-[#cc4224]' : 'bg-zinc-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${smsNotif ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
              <Lock className="w-5 h-5 text-zinc-700" />
              <h3 className="text-[15px] font-bold text-zinc-900">Security</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-50">
                <div>
                  <h4 className="text-[13px] font-bold text-zinc-900">Password</h4>
                  <p className="text-[11px] text-zinc-500">Last changed 45 days ago.</p>
                </div>
                <button 
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-[11px] font-bold rounded-md hover:bg-zinc-50 transition-colors"
                >
                  {showPasswordForm ? "Cancel" : "Change Password"}
                </button>
              </div>
              
              {showPasswordForm && (
                <div className="pt-2 pb-6 border-b border-zinc-50">
                  <ChangePasswordForm />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-bold text-zinc-900">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[11px] text-zinc-500">Add an extra layer of security to your account.</p>
                </div>
                <button 
                  onClick={toggle2FA}
                  className={`px-4 py-2 border text-[11px] font-bold rounded-md transition-colors ${
                    is2faEnabled 
                      ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" 
                      : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {is2faEnabled ? "Disable 2FA" : "Enable 2FA"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
