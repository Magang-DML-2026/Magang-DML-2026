import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { printLogs } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { documentName, documentType, destination, status } = body;

    if (!documentName || !documentType || !destination || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const log = await db.insert(printLogs).values({
      userId: session.userId as number,
      documentName,
      documentType,
      destination,
      status,
    }).returning();

    return NextResponse.json({ success: true, log: log[0] });
  } catch (error) {
    console.error("Print log error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
