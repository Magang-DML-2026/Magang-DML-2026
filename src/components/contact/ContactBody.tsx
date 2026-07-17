"use client";

import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactBody() {
  return (
    <section className="w-full bg-[#f9fafb] py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Contact Info & Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          
          {/* Card 1: Kantor Pusat */}
          <div className="bg-white border border-zinc-200 rounded-xl p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#b3401a] rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-bold text-black leading-none">Kantor Pusat</h3>
                <p className="text-sm text-zinc-500 leading-relaxed uppercase">
                  Kawasan Industri Sentra Bitung, Tangerang<br />
                  JL. BAITUSSAADAH RT 01/03, KADU, CURUG,<br />
                  TANGERANG, BANTEN
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-zinc-100"></div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#b3401a]" />
                <span className="text-sm font-semibold text-zinc-700">021 2951 4148</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#b3401a]" />
                <span className="text-sm font-semibold text-zinc-700">021 2951 4149</span>
              </div>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white border border-zinc-200 rounded-xl p-8 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 bg-[#0b1120] rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">Email Respon Cepat</span>
               <span className="text-lg font-bold text-black break-all">duta_mitraluhur@yahoo.co.id</span>
             </div>
          </div>

          {/* Card 3: WhatsApp CTA */}
          <button className="w-full bg-[#e6f7ef] border border-[#a7e8c3] rounded-xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all group text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#106c3a]">Dukungan WhatsApp</span>
                <span className="text-sm text-[#1b8e4e]">Klik untuk chat dengan admin kami</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#106c3a] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Card 4: Map Iframe */}
          <div className="w-full h-[250px] bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm p-2">
            <div className="w-full h-full rounded-lg overflow-hidden bg-zinc-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d15865.174151770068!2d106.536965!3d-6.224976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fe000d6faebd%3A0x2a912bb6ea8494f1!2sKawasan%20Industri%20Sentra%20Bitung!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="bg-white border border-zinc-200 rounded-xl p-8 md:p-10 shadow-sm flex flex-col h-full"
        >
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl font-bold text-black">Formulir Pertanyaan</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Sampaikan kebutuhan manufaktur Anda, dan tim kami akan menghubungi Anda dalam waktu 1x24 jam.
            </p>
          </div>

          <form className="flex flex-col gap-6 flex-1">
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-600">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm outline-none focus:border-[#b3401a] focus:ring-1 focus:ring-[#b3401a] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-600">Nama Perusahaan (Opsional)</label>
                <input 
                  type="text" 
                  placeholder="Instansi/Perusahaan"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm outline-none focus:border-[#b3401a] focus:ring-1 focus:ring-[#b3401a] transition-all"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-600">Email Bisnis</label>
                <input 
                  type="email" 
                  placeholder="nama@perusahaan.com"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm outline-none focus:border-[#b3401a] focus:ring-1 focus:ring-[#b3401a] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-600">Nomor Telepon</label>
                <input 
                  type="tel" 
                  placeholder="Contoh: 0812..."
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm outline-none focus:border-[#b3401a] focus:ring-1 focus:ring-[#b3401a] transition-all"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-600">Kategori Layanan</label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm outline-none focus:border-[#b3401a] focus:ring-1 focus:ring-[#b3401a] transition-all appearance-none bg-white text-zinc-700">
                  <option>Inquiry B2B (Manufaktur Skala Besar)</option>
                  <option>Konsultasi Teknis</option>
                  <option>Kemitraan Distributor</option>
                  <option>Lainnya</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-zinc-600">Pesan / Detail Kebutuhan</label>
              <textarea 
                placeholder="Gambarkan spesifikasi produk karet atau pertanyaan Anda secara detail..."
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-sm outline-none focus:border-[#b3401a] focus:ring-1 focus:ring-[#b3401a] transition-all resize-none flex-1 min-h-[120px]"
              ></textarea>
            </div>

            {/* Submit Row */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <button 
                type="button" 
                className="w-full sm:w-auto bg-[#b3401a] hover:bg-[#8f3113] text-white px-8 py-3 rounded-md text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                Kirim Pesan
                <Send className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-zinc-500 flex-1 leading-relaxed text-center sm:text-left">
                *Data Anda akan dijaga kerahasiaannya sesuai kebijakan privasi kami.
              </p>
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
