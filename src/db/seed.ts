import { db } from "./index";
import { products } from "./schema";

async function seed() {
  console.log("Seeding database...");
  
  // Insert EPDM Rubber Seals
  const newProducts = await db.insert(products).values([
    {
      name: "EPDM Rubber Seals",
      description: "Rubber seal high quality untuk industri otomotif dan manufaktur.",
      material: "EPDM 70 ShA",
      process: "Injection Molding",
      price: 10000,
      imageUrl: "https://images.unsplash.com/photo-1621252179022-297eb0981e64?q=80&w=200&auto=format&fit=crop",
      stock: 1000000,
    }
  ]).returning();

  console.log("Products seeded:", newProducts);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding DB:", err);
  process.exit(1);
});
