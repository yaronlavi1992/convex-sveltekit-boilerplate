import { query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { requireAuth } from "./authHelpers";

export const getCurrentUser = query({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    await requireAuth(ctx);
    return await authComponent.getAuthUser(ctx);
  },
});
