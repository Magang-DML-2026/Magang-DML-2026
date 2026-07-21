"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export type B2BState = {
  error?: string;
  success?: boolean;
} | null;

export async function submitB2BDocuments(
  _prevState: B2BState,
  formData: FormData
): Promise<B2BState> {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return { error: "Unauthorized" };
    }

    const companyName = formData.get("companyName") as string;
    const nibFile = formData.get("nibDoc") as File;
    const npwpFile = formData.get("npwpDoc") as File;
    const ktpFile = formData.get("ktpDoc") as File;

    if (!companyName || companyName.trim() === "") {
      return { error: "Nama perusahaan wajib diisi" };
    }

    if (!nibFile || nibFile.size === 0 || !npwpFile || npwpFile.size === 0 || !ktpFile || ktpFile.size === 0) {
      return { error: "Ketiga dokumen wajib (NIB, NPWP, KTP) harus diunggah" };
    }

    // Helper to save file locally
    const saveFile = async (file: File, prefix: string) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = path.extname(file.name) || ".pdf";
      const filename = `${prefix}_${session.userId}_${Date.now()}${ext}`;
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      return `/uploads/${filename}`;
    };

    // Save files
    const nibPath = await saveFile(nibFile, "NIB");
    const npwpPath = await saveFile(npwpFile, "NPWP");
    const ktpPath = await saveFile(ktpFile, "KTP");

    // Update user in DB
    await db
      .update(users)
      .set({
        companyName: companyName.trim(),
        b2bStatus: "pending",
        nibDoc: nibPath,
        npwpDoc: npwpPath,
        ktpDoc: ktpPath,
      })
      .where(eq(users.id, session.userId as number));

    revalidatePath("/dashboard/profile");
    return { success: true };
  } catch (error: any) {
    console.error("B2B Submit Error:", error);
    return { error: "Terjadi kesalahan sistem saat mengunggah dokumen." };
  }
}
