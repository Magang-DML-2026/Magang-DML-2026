"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

// --- Types ---
export type AuthState = {
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
} | null;

// --- Register ---
export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate
  const fieldErrors: NonNullable<AuthState>["fieldErrors"] = {};

  if (!name || name.trim().length < 2) {
    fieldErrors.name = "Nama minimal 2 karakter.";
  }
  if (!email || !email.includes("@")) {
    fieldErrors.email = "Email tidak valid.";
  }
  if (!password || password.length < 6) {
    fieldErrors.password = "Password minimal 6 karakter.";
  }
  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = "Password tidak sama.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  // Check if email already exists
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email.toLowerCase().trim()))
    .limit(1);

  if (existing.length > 0) {
    return { error: "Email sudah terdaftar." };
  }

  // Hash password & create user
  const hashedPassword = await hashPassword(password);

  const result = await db
    .insert(users)
    .values({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    })
    .returning({ id: users.id });

  const user = result[0];
  if (!user) {
    return { error: "Gagal membuat akun. Coba lagi." };
  }

  // Create session & redirect
  await createSession(user.id);
  redirect("/dashboard");
}

// --- Login ---
export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate
  if (!email || !password) {
    return { error: "Email dan password harus diisi." };
  }

  // Find user
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase().trim()))
    .limit(1);

  const user = result[0];

  if (!user) {
    return { error: "Email atau password salah." };
  }

  // Verify password
  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return { error: "Email atau password salah." };
  }

  // Create session & redirect
  await createSession(user.id);
  redirect("/dashboard");
}

// --- Logout ---
export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
