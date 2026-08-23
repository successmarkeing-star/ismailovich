import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { ENV } from "./_core/env";
import { orders, shipments, type InsertUser, users } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] === undefined) continue;
    const normalized = user[field] ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getCustomerDashboardData(customerId: number) {
  const db = await getDb();
  if (!db) return { shipments: [], orders: [] };
  const [customerShipments, customerOrders] = await Promise.all([
    db.select().from(shipments).where(eq(shipments.customerId, customerId)).orderBy(desc(shipments.lastUpdated)),
    db.select().from(orders).where(eq(orders.customerId, customerId)).orderBy(desc(orders.updatedAt)),
  ]);
  return { shipments: customerShipments, orders: customerOrders };
}

export async function getCustomerShipmentByTracking(customerId: number, trackingNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(shipments).where(and(eq(shipments.customerId, customerId), eq(shipments.trackingNumber, trackingNumber))).limit(1);
  return result[0];
}
