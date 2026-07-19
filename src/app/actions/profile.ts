"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// --- Types ---
export type ProfileState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string;
    phone?: string;
  };
} | null;

export type PasswordState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
} | null;

// --- Update Profile ---
export async function updateProfileAction(
  _prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid. Silakan login ulang." };

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  // Validate
  const fieldErrors: NonNullable<ProfileState>["fieldErrors"] = {};

  if (!name || name.trim().length < 2) {
    fieldErrors.name = "Nama minimal 2 karakter.";
  }
  if (phone && phone.trim().length > 0 && phone.trim().length < 8) {
    fieldErrors.phone = "Nomor telepon minimal 8 digit.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  await db
    .update(users)
    .set({
      name: name.trim(),
      phone: phone?.trim() || null,
    })
    .where(eq(users.id, session.userId));

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");

  return { success: true };
}

// --- Change Password ---
export async function changePasswordAction(
  _prevState: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid. Silakan login ulang." };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate
  const fieldErrors: NonNullable<PasswordState>["fieldErrors"] = {};

  if (!currentPassword) {
    fieldErrors.currentPassword = "Password lama harus diisi.";
  }
  if (!newPassword || newPassword.length < 6) {
    fieldErrors.newPassword = "Password baru minimal 6 karakter.";
  }
  if (newPassword !== confirmPassword) {
    fieldErrors.confirmPassword = "Password tidak sama.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  // Get current user
  const result = await db
    .select({ password: users.password })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  const user = result[0];
  if (!user) return { error: "User tidak ditemukan." };

  // Verify current password
  const valid = await verifyPassword(currentPassword, user.password);
  if (!valid) {
    return { fieldErrors: { currentPassword: "Password lama salah." } };
  }

  // Hash and update new password
  const hashedPassword = await hashPassword(newPassword);
  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, session.userId));

  return { success: true };
}
