import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users, addresses } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ArrowLeft, Mail, Shield } from "lucide-react";
import ProfileForm from "@/components/dashboard/ProfileForm";
import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";
import AddressList from "@/components/dashboard/AddressList";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Get full user data including phone
  const userData = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  const user = userData[0];
  if (!user) redirect("/login");

  // Get user addresses
  const userAddresses = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, session.userId))
    .orderBy(addresses.createdAt);

  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      {/* Back + Title */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900">Kelola Profil</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Atur informasi akun dan alamat pengiriman Anda
        </p>
      </div>

      {/* Read-only Info (Email & Role) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-zinc-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
            <Mail className="w-4 h-4 text-zinc-500" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider">
              Email
            </p>
            <p className="text-sm font-medium text-zinc-900">{user.email}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
            <Shield className="w-4 h-4 text-zinc-500" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider">
              Role
            </p>
            <p className="text-sm font-medium text-zinc-900 capitalize">
              {user.role}
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Profile Form */}
        <ProfileForm initialName={user.name} initialPhone={user.phone} />

        {/* Change Password */}
        <ChangePasswordForm />

        {/* Addresses */}
        <AddressList addresses={userAddresses} />
      </div>
    </div>
  );
}
