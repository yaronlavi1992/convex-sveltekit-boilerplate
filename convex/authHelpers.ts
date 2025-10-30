import { ConvexError } from "convex/values";
import type { GenericCtx } from "@convex-dev/better-auth";
import type { DataModel } from "./_generated/dataModel";

export async function requireAuth(ctx: GenericCtx<DataModel>) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Authentication required");
  }
  return identity;
}

export async function requireAuthMatch(
  ctx: GenericCtx<DataModel>,
  userId: string,
) {
  const identity = await requireAuth(ctx);
  if (identity.subject !== userId) {
    throw new ConvexError("Unauthorized access");
  }
  return identity;
}
