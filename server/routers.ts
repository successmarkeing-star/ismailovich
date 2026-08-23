import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getCustomerDashboardData, getCustomerShipmentByTracking } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  dashboard: router({
    overview: protectedProcedure.query(({ ctx }) => getCustomerDashboardData(ctx.user.id)),
    shipmentByTracking: protectedProcedure.input(z.object({ trackingNumber: z.string().trim().min(2).max(64) })).query(({ ctx, input }) => getCustomerShipmentByTracking(ctx.user.id, input.trackingNumber)),
  }),
});

export type AppRouter = typeof appRouter;
