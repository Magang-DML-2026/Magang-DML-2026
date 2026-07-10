# Setup Lanjutan

Project ini sudah include: Next.js (App Router) + TypeScript + Tailwind CSS + Drizzle ORM.

## 1. Install dependencies
```bash
npm install
```

## 2. Setup Database
Butuh PostgreSQL. Paling gampang pakai layanan gratis:
- **Neon** (neon.tech) — serverless Postgres, gratis, cocok banget buat Next.js
- **Supabase** (supabase.com) — Postgres + fitur tambahan (storage, realtime)
- Atau install PostgreSQL lokal kalau mau full local dev

Copy `.env.example` jadi `.env.local`, lalu isi `DATABASE_URL` dengan connection string dari provider kamu.

## 3. Push schema ke database
```bash
npm run db:push
```
Ini akan langsung sync schema di `src/db/schema.ts` ke database (bagus untuk development awal).

Untuk production, pakai migration proper:
```bash
npm run db:generate   # generate file migrasi
npm run db:migrate    # jalankan migrasi
```

## 4. Cek data dengan Drizzle Studio
```bash
npm run db:studio
```
Buka GUI di browser buat lihat/edit data langsung.

## 5. Setup shadcn/ui (jalankan di komputer kamu, bukan di sandbox ini)
```bash
npx shadcn@latest init
npx shadcn@latest add button card input
```

## 6. Jalankan development server
```bash
npm run dev
```

## Langkah selanjutnya yang perlu dipikirkan
- [ ] Setup autentikasi (Auth.js atau Clerk)
- [ ] Rancang schema database lengkap sesuai fitur produk
- [ ] Setup deployment ke Vercel (connect repo GitHub → auto deploy)
- [ ] Tambah validasi input (misal pakai Zod)
