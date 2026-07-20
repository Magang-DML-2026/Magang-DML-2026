import { db } from "./index";
import { products } from "./schema";

async function seed() {
  console.log("Seeding database...");
  
  await db.delete(products);

  const PRODUCTS = [
    {
      name: "Steering Wheel Cover",
      category: "Automotive",
      price: 185000,
      description: "High-grip polymer cover with universal 38cm fit and heat resistance.",
      tags: ["automotive", "steering", "wheel", "cover", "grip", "polymer"],
      featured: true,
    },
    {
      name: "Heavy-Duty Mudguards",
      category: "Automotive",
      price: 320000,
      description: "Reinforced rubber mudguards for SUVs and trucks.",
      tags: ["automotive", "mudguard", "suv", "truck", "heavy", "duty"],
    },
    {
      name: "Precision Seals",
      category: "Industrial",
      price: 12500,
      description: "Nitrile O-rings and gaskets for pressure containment.",
      tags: ["industrial", "seal", "o-ring", "gasket", "nitrile", "precision"],
    },
    {
      name: "Anti-Slip Safety Soles",
      category: "Custom Molding",
      price: 45000,
      description: "Engineered for industrial safety footwear with superior traction on oil and moisture-heavy surfaces.",
      tags: ["molding", "sole", "safety", "footwear", "anti-slip", "vulcanized"],
      featured: true,
    },
    {
      name: "Rubber Mat Flooring",
      category: "Industrial",
      price: 150000,
      description: "Durable anti-fatigue matting for workshops and factories.",
      tags: ["industrial", "mat", "flooring", "anti-fatigue", "workshop"],
    },
    {
      name: "Vibration Isolators",
      category: "Industrial",
      price: 75000,
      description: "Cylindrical mounts to reduce noise and vibration in heavy machinery.",
      tags: ["industrial", "vibration", "isolator", "mount", "machinery"],
    },
    {
      name: "Silicone Tubing",
      category: "Automotive",
      price: 85000,
      description: "High temperature silicone hose for automotive cooling systems.",
      tags: ["automotive", "silicone", "tubing", "hose", "cooling"],
    },
    {
      name: "Custom Rubber Gaskets",
      category: "Custom Molding",
      price: 25000,
      description: "Made-to-order gaskets for specific engine applications.",
      tags: ["molding", "gasket", "custom", "engine"],
    },
    {
      name: "Heavy-Duty Conveyor Belt",
      category: "Industrial",
      price: 500000,
      description: "Multi-ply rubber conveyor belt for high-tension industrial applications.",
      tags: ["industrial", "conveyor", "belt", "heavy", "tension"],
      featured: true,
    },
    {
      name: "O-Ring Assortment Kit",
      category: "Industrial",
      price: 120000,
      description: "Comprehensive kit of standard nitrile O-rings in various sizes.",
      tags: ["industrial", "o-ring", "kit", "assortment", "nitrile"],
    },
    {
      name: "Rubber Bumper Guards",
      category: "Automotive",
      price: 65000,
      description: "Impact-resistant rubber guards for automotive doors and bumpers.",
      tags: ["automotive", "bumper", "guard", "impact", "door"],
    },
    {
      name: "Custom Extruded Profiles",
      category: "Custom Molding",
      price: 35000,
      description: "Customized extruded rubber profiles for specialized sealing.",
      tags: ["molding", "extruded", "profile", "seal", "custom"],
    },
  ];

  const newProducts = await db.insert(products).values(PRODUCTS).returning();

  console.log("Products seeded:", newProducts.length);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding DB:", err);
  process.exit(1);
});
