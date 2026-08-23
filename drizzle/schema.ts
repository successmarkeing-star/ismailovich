import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/** Core user table backing the Manus OAuth flow. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const shipments = mysqlTable("shipments", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId").notNull(),
  trackingNumber: varchar("trackingNumber", { length: 64 }).notNull().unique(),
  orderNumber: varchar("orderNumber", { length: 64 }),
  productName: varchar("productName", { length: 255 }).notNull(),
  origin: varchar("origin", { length: 128 }).notNull(),
  destination: varchar("destination", { length: 128 }).notNull(),
  mode: mysqlEnum("mode", ["sea", "air", "road"]).notNull(),
  status: mysqlEnum("status", ["quote", "sourcing", "processing", "inTransit", "customs", "outForDelivery", "delivered"]).default("processing").notNull(),
  progress: int("progress").default(0).notNull(),
  currentLocation: varchar("currentLocation", { length: 128 }),
  estimatedArrival: timestamp("estimatedArrival"),
  lastUpdated: timestamp("lastUpdated").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId").notNull(),
  orderNumber: varchar("orderNumber", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["inquiry", "confirmed", "sourcing", "shipping", "completed", "cancelled"]).default("inquiry").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Shipment = typeof shipments.$inferSelect;
export type InsertShipment = typeof shipments.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
