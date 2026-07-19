"use server";

import { db } from "@/db";
import { addresses } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

// --- Types ---
export type AddressState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    label?: string;
    recipientName?: string;
    phone?: string;
    province?: string;
    city?: string;
    district?: string;
    postalCode?: string;
    fullAddress?: string;
  };
} | null;

// --- Validate Address Fields ---
function validateAddressFields(formData: FormData) {
  const label = formData.get("label") as string;
  const recipientName = formData.get("recipientName") as string;
  const phone = formData.get("phone") as string;
  const province = formData.get("province") as string;
  const city = formData.get("city") as string;
  const district = formData.get("district") as string;
  const postalCode = formData.get("postalCode") as string;
  const fullAddress = formData.get("fullAddress") as string;

  const fieldErrors: NonNullable<AddressState>["fieldErrors"] = {};

  if (!label || label.trim().length === 0) fieldErrors.label = "Label harus diisi.";
  if (!recipientName || recipientName.trim().length < 2) fieldErrors.recipientName = "Nama penerima minimal 2 karakter.";
  if (!phone || phone.trim().length < 8) fieldErrors.phone = "Nomor telepon minimal 8 digit.";
  if (!province || province.trim().length === 0) fieldErrors.province = "Provinsi harus diisi.";
  if (!city || city.trim().length === 0) fieldErrors.city = "Kota harus diisi.";
  if (!district || district.trim().length === 0) fieldErrors.district = "Kecamatan harus diisi.";
  if (!postalCode || postalCode.trim().length < 3) fieldErrors.postalCode = "Kode pos harus diisi.";
  if (!fullAddress || fullAddress.trim().length < 10) fieldErrors.fullAddress = "Alamat lengkap minimal 10 karakter.";

  return {
    fieldErrors,
    data: {
      label: label?.trim(),
      recipientName: recipientName?.trim(),
      phone: phone?.trim(),
      province: province?.trim(),
      city: city?.trim(),
      district: district?.trim(),
      postalCode: postalCode?.trim(),
      fullAddress: fullAddress?.trim(),
    },
  };
}

// --- Add Address ---
export async function addAddressAction(
  _prevState: AddressState,
  formData: FormData
): Promise<AddressState> {
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid. Silakan login ulang." };

  const { fieldErrors, data } = validateAddressFields(formData);
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const isDefault = formData.get("isDefault") === "on";

  // If setting as default, unset all other defaults first
  if (isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, session.userId));
  }

  // Check if this is the first address (auto set as default)
  const existingAddresses = await db
    .select({ id: addresses.id })
    .from(addresses)
    .where(eq(addresses.userId, session.userId))
    .limit(1);

  const shouldBeDefault = isDefault || existingAddresses.length === 0;

  await db.insert(addresses).values({
    userId: session.userId,
    ...data,
    isDefault: shouldBeDefault,
  });

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// --- Update Address ---
export async function updateAddressAction(
  _prevState: AddressState,
  formData: FormData
): Promise<AddressState> {
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid. Silakan login ulang." };

  const addressId = Number(formData.get("addressId"));
  if (!addressId) return { error: "ID alamat tidak valid." };

  const { fieldErrors, data } = validateAddressFields(formData);
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const isDefault = formData.get("isDefault") === "on";

  if (isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, session.userId));
  }

  await db
    .update(addresses)
    .set({
      ...data,
      isDefault,
      updatedAt: new Date(),
    })
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, session.userId)));

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// --- Delete Address ---
export async function deleteAddressAction(addressId: number) {
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid." };

  // Get the address to check if it's default
  const addr = await db
    .select({ isDefault: addresses.isDefault })
    .from(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, session.userId)))
    .limit(1);

  if (addr.length === 0) return { error: "Alamat tidak ditemukan." };

  await db
    .delete(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, session.userId)));

  // If deleted address was default, set the first remaining as default
  if (addr[0].isDefault) {
    const remaining = await db
      .select({ id: addresses.id })
      .from(addresses)
      .where(eq(addresses.userId, session.userId))
      .limit(1);

    if (remaining.length > 0) {
      await db
        .update(addresses)
        .set({ isDefault: true })
        .where(eq(addresses.id, remaining[0].id));
    }
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

// --- Set Default Address ---
export async function setDefaultAddressAction(addressId: number) {
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid." };

  // Unset all defaults
  await db
    .update(addresses)
    .set({ isDefault: false })
    .where(eq(addresses.userId, session.userId));

  // Set new default
  await db
    .update(addresses)
    .set({ isDefault: true, updatedAt: new Date() })
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, session.userId)));

  revalidatePath("/dashboard/profile");
  return { success: true };
}
