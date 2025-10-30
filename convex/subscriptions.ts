import { v, ConvexError } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { requireAuth, requireAuthMatch } from "./authHelpers";
import { throwNotFoundError } from "./errors";

export const getUserSubscription = query({
  args: { userId: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("subscriptions"),
      userId: v.string(),
      polarCustomerId: v.optional(v.string()),
      polarSubscriptionId: v.optional(v.string()),
      polarProductId: v.string(),
      productName: v.string(),
      status: v.string(),
      currentPeriodStart: v.optional(v.number()),
      currentPeriodEnd: v.optional(v.number()),
      cancelAtPeriodEnd: v.optional(v.boolean()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    await requireAuthMatch(ctx, args.userId);

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    return subscription;
  },
});

export const assignFreePlan = internalMutation({
  args: {
    userId: v.string(),
    polarProductId: v.string(),
  },
  returns: v.id("subscriptions"),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      return existing._id;
    }

    const subscriptionId = await ctx.db.insert("subscriptions", {
      userId: args.userId,
      polarProductId: args.polarProductId,
      productName: "free",
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return subscriptionId;
  },
});

export const createSubscription = mutation({
  args: {
    userId: v.string(),
    polarCustomerId: v.string(),
    polarSubscriptionId: v.string(),
    polarProductId: v.string(),
    productName: v.string(),
    status: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
  },
  returns: v.id("subscriptions"),
  handler: async (ctx, args) => {
    await requireAuthMatch(ctx, args.userId);

    const subscriptionId = await ctx.db.insert("subscriptions", {
      userId: args.userId,
      polarCustomerId: args.polarCustomerId,
      polarSubscriptionId: args.polarSubscriptionId,
      polarProductId: args.polarProductId,
      productName: args.productName,
      status: args.status,
      currentPeriodStart: args.currentPeriodStart,
      currentPeriodEnd: args.currentPeriodEnd,
      cancelAtPeriodEnd: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return subscriptionId;
  },
});

export const updateSubscription = mutation({
  args: {
    polarSubscriptionId: v.string(),
    status: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  },
  returns: v.union(
    v.object({
      _id: v.id("subscriptions"),
      userId: v.string(),
      polarCustomerId: v.optional(v.string()),
      polarSubscriptionId: v.optional(v.string()),
      polarProductId: v.string(),
      productName: v.string(),
      status: v.string(),
      currentPeriodStart: v.optional(v.number()),
      currentPeriodEnd: v.optional(v.number()),
      cancelAtPeriodEnd: v.optional(v.boolean()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const { polarSubscriptionId, ...updates } = args;

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_polarSubscriptionId", (q) =>
        q.eq("polarSubscriptionId", polarSubscriptionId),
      )
      .first();

    if (!subscription) {
      throwNotFoundError("Subscription");
      return null;
    }

    await ctx.db.patch(subscription._id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(subscription._id);
  },
});

export const cancelSubscription = mutation({
  args: {
    polarSubscriptionId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("subscriptions"),
      userId: v.string(),
      polarCustomerId: v.optional(v.string()),
      polarSubscriptionId: v.optional(v.string()),
      polarProductId: v.string(),
      productName: v.string(),
      status: v.string(),
      currentPeriodStart: v.optional(v.number()),
      currentPeriodEnd: v.optional(v.number()),
      cancelAtPeriodEnd: v.optional(v.boolean()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_polarSubscriptionId", (q) =>
        q.eq("polarSubscriptionId", args.polarSubscriptionId),
      )
      .first();

    if (!subscription) {
      throwNotFoundError("Subscription");
      return null;
    }

    await ctx.db.patch(subscription._id, {
      cancelAtPeriodEnd: true,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(subscription._id);
  },
});
