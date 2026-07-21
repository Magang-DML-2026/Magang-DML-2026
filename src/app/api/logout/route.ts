import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  await deleteSession();
  return NextResponse.redirect(new URL("/login", request.nextUrl.origin), {
    status: 302,
  });
}
