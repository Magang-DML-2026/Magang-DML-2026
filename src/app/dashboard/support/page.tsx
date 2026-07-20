import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SupportClient from "./SupportClient";

export default async function SupportPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return <SupportClient />;
}
