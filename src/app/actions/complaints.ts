"use server";

import { db } from "@/db";
import { complaints, complaintMessages } from "@/db/schema";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createComplaint(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const userId = session.userId as number;
  const transactionId = formData.get("transactionId")?.toString();
  const category = formData.get("category")?.toString();
  const description = formData.get("description")?.toString();

  if (!transactionId || !category || !description) {
    throw new Error("Missing required fields");
  }

  // Generate short ID for complaint
  const complaintId = `C-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

  await db.insert(complaints).values({
    id: complaintId,
    userId,
    transactionId,
    category,
    description,
    status: "Menunggu Tanggapan",
  });

  // Automatically insert the first message as user's description
  await db.insert(complaintMessages).values({
    complaintId,
    sender: "user",
    message: description,
  });

  redirect(`/dashboard/complaints/${complaintId}/chat`);
}

export async function sendComplaintMessage(complaintId: string, message: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await db.insert(complaintMessages).values({
    complaintId,
    sender: "user",
    message,
  });

  // Update complaint updatedAt
  await db.update(complaints)
    .set({ updatedAt: new Date() })
    .where(eq(complaints.id, complaintId));
}
