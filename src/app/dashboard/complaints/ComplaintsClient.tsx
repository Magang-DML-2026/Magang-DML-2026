"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, UploadCloud, ShieldCheck, CheckCircle2, FileText, ChevronDown, Check, AlertTriangle, ArrowRight, Home } from "lucide-react";

// @ts-ignore - Mengabaikan error IDE untuk import yang tidak dikenali pada ghost file
import { createComplaint } from "@/app/actions/complaints";

export default function ComplaintsClient({ 
  transactions, 
  complaints 
}: { 
  transactions: any[], 
  complaints: any[] 
}) {
  return null;
}
