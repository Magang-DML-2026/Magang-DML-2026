"use server";

import { db } from "@/db";
import { transactions, transactionItems, cartItems, products } from "@/db/schema";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getCart } from "./cart";

export async function createTransaction(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  
  const userId = session.userId as number;
  
  const cart = await getCart();
  if (cart.length === 0) {
    redirect("/dashboard/cart");
  }

  const shippingMethod = formData.get("shipping")?.toString() || "Kargo Darat (LTL)";
  const paymentMethod = formData.get("payment")?.toString() || "Virtual Account";
  
  const addressIdStr = formData.get("addressId")?.toString();
  const addressId = addressIdStr ? parseInt(addressIdStr) : null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const ppn = subtotal * 0.11;
  const shippingCost = shippingMethod === "Pengiriman Udara" ? 4500000 : 1500000;
  const total = subtotal + ppn + shippingCost;

  // Generate short ID
  const txId = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  // Insert Transaction
  await db.insert(transactions).values({
    id: txId,
    userId,
    addressId,
    shippingCost,
    taxAmount: ppn,
    subtotal,
    totalAmount: total,
    status: "Menunggu Pembayaran",
    shippingMethod,
    paymentMethod,
  });

  // Insert Transaction Items
  for (const item of cart) {
    await db.insert(transactionItems).values({
      transactionId: txId,
      productId: item.product.id,
      productName: item.product.name,
      priceAtPurchase: item.product.price,
      quantity: item.quantity,
    });
  }

  // Clear Cart
  await db.delete(cartItems).where(eq(cartItems.userId, userId));

  // Redirect to Payment Screen with txId
  redirect(`/dashboard/checkout/payment?txId=${txId}`);
}

export async function simulatePayment(txId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // Update transaction status to "Diproses" (Simulasi sukses)
  await db.update(transactions)
    .set({ 
      status: "Diproses",
      paidAt: new Date(),
    })
    .where(eq(transactions.id, txId));

  redirect(`/dashboard/checkout/success?txId=${txId}`);
}
