import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Contoh tabel users — sesuaikan/tambah tabel lain sesuai kebutuhan produk kamu
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
