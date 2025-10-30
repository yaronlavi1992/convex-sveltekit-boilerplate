import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Note: Better Auth component manages its own auth tables (users, sessions, accounts, verificationTokens)
// Don't define those here - the component handles them automatically

export default defineSchema({
  // Custom app tables
  subscriptions: defineTable({
    userId: v.string(), // This will reference the Better Auth user ID
    polarCustomerId: v.optional(v.string()),
    polarSubscriptionId: v.optional(v.string()),
    polarProductId: v.string(),
    productName: v.string(), // 'free', 'plus', 'pro', etc.
    status: v.string(), // 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid'
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_polarCustomerId", ["polarCustomerId"])
    .index("by_polarSubscriptionId", ["polarSubscriptionId"]),
});
