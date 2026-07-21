import { pgTable, serial, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";

// Tabel users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  phone: varchar("phone", { length: 30 }),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  companyName: varchar("company_name", { length: 255 }),
  b2bStatus: varchar("b2b_status", { length: 20 }).notNull().default("none"), // none, pending, approved, rejected
  nibDoc: varchar("nib_doc", { length: 500 }),
  npwpDoc: varchar("npwp_doc", { length: 500 }),
  ktpDoc: varchar("ktp_doc", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel sessions
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel addresses (alamat pengiriman)
export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  label: varchar("label", { length: 50 }).notNull(), // Rumah, Kantor, dll
  recipientName: varchar("recipient_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  province: varchar("province", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  district: varchar("district", { length: 100 }).notNull(),
  postalCode: varchar("postal_code", { length: 10 }).notNull(),
  fullAddress: text("full_address").notNull(),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;

// Tabel products (Katalog Barang B2B)
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  tags: text("tags").array(), // Use array for tags
  material: varchar("material", { length: 100 }),
  process: varchar("process", { length: 100 }),
  price: integer("price").notNull(), // Harga satuan dalam Rupiah
  imageUrl: text("image_url"),
  stock: integer("stock").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel cart_items (Keranjang Belanja)
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel transactions (Order Utama)
export const transactions = pgTable("transactions", {
  id: varchar("id", { length: 50 }).primaryKey(), // ID custom spt 'INV-2026-004' atau string random
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  addressId: integer("address_id")
    .references(() => addresses.id, { onDelete: "set null" }), // Alamat pengiriman terpilih
  shippingCost: integer("shipping_cost").notNull().default(0),
  taxAmount: integer("tax_amount").notNull().default(0),
  subtotal: integer("subtotal").notNull().default(0),
  totalAmount: integer("total_amount").notNull().default(0),
  status: varchar("status", { length: 50 }).notNull().default("Menunggu Pembayaran"), // Menunggu Pembayaran, Dibayar, Diproses, Dikirim, Selesai
  shippingMethod: varchar("shipping_method", { length: 100 }), // Kargo Darat LTL
  paymentMethod: varchar("payment_method", { length: 100 }), // Virtual Account dll
  resiNumber: varchar("resi_number", { length: 100 }),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel transaction_items (Rincian Produk dalam Transaksi)
export const transactionItems = pgTable("transaction_items", {
  id: serial("id").primaryKey(),
  transactionId: varchar("transaction_id", { length: 50 })
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "set null" }),
  productName: varchar("product_name", { length: 255 }).notNull(), // Snapshot nama barang
  priceAtPurchase: integer("price_at_purchase").notNull(), // Snapshot harga saat dibeli
  quantity: integer("quantity").notNull(),
});

export type Product = typeof products.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type TransactionItem = typeof transactionItems.$inferSelect;

// Tabel complaints (Daftar Komplain)
export const complaints = pgTable("complaints", {
  id: varchar("id", { length: 50 }).primaryKey(), // ID custom spt 'C-98332'
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  transactionId: varchar("transaction_id", { length: 50 })
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 100 }).notNull(), // Barang Cacat/Rusak, Pengiriman Terlambat, dll
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("Menunggu Tanggapan"), // Menunggu Tanggapan, Diproses, Selesai
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel complaint_messages (Chat Log Komplain)
export const complaintMessages = pgTable("complaint_messages", {
  id: serial("id").primaryKey(),
  complaintId: varchar("complaint_id", { length: 50 })
    .notNull()
    .references(() => complaints.id, { onDelete: "cascade" }),
  sender: varchar("sender", { length: 50 }).notNull(), // 'user' atau 'admin'
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Complaint = typeof complaints.$inferSelect;
export type ComplaintMessage = typeof complaintMessages.$inferSelect;

export const printLogs = pgTable("print_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  documentName: varchar("document_name", { length: 255 }).notNull(),
  documentType: varchar("document_type", { length: 50 }).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PrintLog = typeof printLogs.$inferSelect;
