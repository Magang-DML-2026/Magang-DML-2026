"use server";

import { db } from "@/db";
import { cartItems, products } from "@/db/schema";
import { getSession } from "@/lib/session";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: number, quantity: number = 1) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const userId = session.userId as number;

  // Cek apakah barang sudah ada di keranjang
  const existingItem = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    .limit(1);

  if (existingItem.length > 0) {
    // Update quantity
    await db
      .update(cartItems)
      .set({ quantity: existingItem[0].quantity + quantity })
      .where(eq(cartItems.id, existingItem[0].id));
  } else {
    // Insert new item
    await db.insert(cartItems).values({
      userId,
      productId,
      quantity,
    });
  }

  revalidatePath("/dashboard/cart");
}

export async function updateCartItemQty(cartItemId: number, quantity: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  
  if (quantity < 1) return removeCartItem(cartItemId);

  await db
    .update(cartItems)
    .set({ quantity })
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, session.userId as number)));

  revalidatePath("/dashboard/cart");
  revalidatePath("/dashboard/checkout");
}

export async function removeCartItem(cartItemId: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await db
    .delete(cartItems)
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, session.userId as number)));

  revalidatePath("/dashboard/cart");
  revalidatePath("/dashboard/checkout");
}

export async function getCart() {
  const session = await getSession();
  if (!session) return [];

  const items = await db
    .select({
      id: cartItems.id,
      quantity: cartItems.quantity,
      product: {
        id: products.id,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
        material: products.material,
        process: products.process,
      },
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.userId, session.userId as number));

  return items;
}
