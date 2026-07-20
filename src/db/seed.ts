import { db } from "./index";
import { products, users, transactions, addresses } from "./schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../lib/auth";

async function seed() {
  console.log("Seeding database...");
  
  await db.delete(transactions);
  await db.delete(addresses);
  await db.delete(users);
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

  // Users
  const hashedPassword = await hashPassword("password123");
  const USERS = [
    { name: "Bambang S.", email: "admin@dml.com", password: hashedPassword, role: "admin" },
    { name: "Indo Rubber Corp", email: "procurement@indorubber.com", password: hashedPassword, role: "user" },
    { name: "Adi Wijaya", email: "adi@retail.com", password: hashedPassword, role: "user" },
    { name: "Tunas Logistik PT", email: "supply@tunaslogistik.com", password: hashedPassword, role: "user" },
  ];
  const newUsers = await db.insert(users).values(USERS).returning();
  console.log("Users seeded:", newUsers.length);

  // Address
  const newAddress = await db.insert(addresses).values({
    userId: newUsers[1].id,
    label: "Kantor Pusat",
    recipientName: "Bpk. Budi",
    phone: "08123456789",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    district: "Setiabudi",
    postalCode: "12920",
    fullAddress: "Jl. Sudirman Kav 21",
    isDefault: true,
  }).returning();

  // Transactions
  // We need recent dates for charts (e.g. today, yesterday)
  const now = new Date();
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(now); twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const TRANSACTIONS = [
    {
      id: "#DML-2023-981",
      userId: newUsers[1].id,
      addressId: newAddress[0].id,
      shippingCost: 500000,
      taxAmount: 14500000,
      subtotal: 130200000,
      totalAmount: 145200000,
      status: "Paid",
      shippingMethod: "BULK",
      paymentMethod: "Bank Transfer",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "#DML-2023-982",
      userId: newUsers[2].id,
      addressId: newAddress[0].id,
      shippingCost: 50000,
      taxAmount: 245000,
      subtotal: 2155000,
      totalAmount: 2450000,
      status: "Pending",
      shippingMethod: "UNIT",
      paymentMethod: "Virtual Account",
      createdAt: yesterday,
      updatedAt: yesterday,
    },
    {
      id: "#DML-2023-983",
      userId: newUsers[3].id,
      addressId: newAddress[0].id,
      shippingCost: 200000,
      taxAmount: 6780000,
      subtotal: 60820000,
      totalAmount: 67800000,
      status: "Paid",
      shippingMethod: "BATCH",
      paymentMethod: "Bank Transfer",
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    },
    {
      id: "#DML-2023-984",
      userId: newUsers[1].id,
      addressId: newAddress[0].id,
      shippingCost: 0,
      taxAmount: 5000000,
      subtotal: 45000000,
      totalAmount: 50000000,
      status: "Overdue",
      shippingMethod: "BULK",
      paymentMethod: "Credit",
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    }
  ];

  const newTransactions = await db.insert(transactions).values(TRANSACTIONS).returning();
  console.log("Transactions seeded:", newTransactions.length);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding DB:", err);
  process.exit(1);
});
