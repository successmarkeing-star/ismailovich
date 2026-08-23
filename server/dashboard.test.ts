import { describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  getCustomerDashboardData: vi.fn(async () => ({ shipments: [], orders: [] })),
  getCustomerShipmentByTracking: vi.fn(async () => undefined),
}));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function makeContext(user: AuthenticatedUser | null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

const user: AuthenticatedUser = {
  id: 21,
  openId: "dashboard-test-user",
  email: "dashboard@example.com",
  name: "Dashboard Test User",
  loginMethod: "test",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

describe("dashboard access", () => {
  it("requires an authenticated customer for the overview", async () => {
    const caller = appRouter.createCaller(makeContext(null));
    await expect(caller.dashboard.overview()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("returns the customer-scoped dashboard shape", async () => {
    const caller = appRouter.createCaller(makeContext(user));
    const result = await caller.dashboard.overview();
    expect(result).toEqual({ shipments: [], orders: [] });
  });

  it("validates tracking number input", async () => {
    const caller = appRouter.createCaller(makeContext(user));
    await expect(caller.dashboard.shipmentByTracking({ trackingNumber: "" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
