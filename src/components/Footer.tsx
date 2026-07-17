"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-white pt-20 pb-12 relative border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col gap-16">
        
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Column 1: Brand (Spans 4 cols) */}
          <div className="flex flex-col gap-6 md:col-span-4 pr-4">
            <h2 className="text-xl font-bold tracking-tight">Duta Mitra Luhur</h2>
            <div className="text-zinc-400 text-xs leading-relaxed flex flex-col gap-4">
              <p>
                © 2024 PT Duta Mitra Luhur. All rights reserved. Precision in Rubber Manufacturing. Produsen terkemuka komponen karet berkualitas tinggi untuk berbagai sektor industri.
              </p>
            </div>
          </div>

          {/* Column 2: TAUTAN CEPAT (Spans 2 cols) */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">TAUTAN CEPAT</h3>
            <ul className="flex flex-col gap-3 text-xs text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Product Catalog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Column 3: LEGAL (Spans 2 cols) */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">LEGAL</h3>
            <ul className="flex flex-col gap-3 text-xs text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Headquarters (Spans 4 cols) */}
          <div className="flex flex-col gap-6 md:col-span-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Headquarters</h3>
            <div className="flex flex-col gap-4 text-xs text-zinc-400">
              <p className="leading-relaxed">
                Kawasan Industri Sentra Bitung, Blok A-14<br />
                Cikupa, Banten, Indonesia
              </p>
              <div className="flex gap-4 items-center mt-2">
                <Link href="#" className="hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
