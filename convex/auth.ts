import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

const siteUrl = process.env.SITE_URL!;
const polarAccessToken = process.env.POLAR_ACCESS_TOKEN;
const polarWebhookSecret = process.env.POLAR_WEBHOOK_SECRET;
const polarServer = process.env.POLAR_SERVER as "production" | "sandbox" | undefined;

if (!siteUrl) {
  throw new Error("SITE_URL environment variable is required");
}

export const authComponent = createClient<DataModel>(components.betterAuth, {
  verbose: true,
});

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false },
) => {
  const plugins: any[] = [convex()];

  if (polarAccessToken && polarAccessToken.trim() !== "") {
    const polarClient = new Polar({
      accessToken: polarAccessToken,
      ...(polarServer ? { server: polarServer } : {}),
    });

    const polarPluginsList = [
      checkout({
        successUrl: `${siteUrl}/dashboard/settings/billing?success=true`,
        authenticatedUsersOnly: false,
      }),
      portal(),
      webhooks({
        secret: polarWebhookSecret || "",
        onCustomerCreated: async (payload) => {
          console.log("Customer created:", payload.data);
        },
        onOrderPaid: async (payload) => {
          console.log("Order paid:", payload.data);
        },
        onSubscriptionActive: async (payload) => {
          console.log("Subscription active:", payload.data);
        },
        onSubscriptionCanceled: async (payload) => {
          console.log("Subscription canceled:", payload.data);
        },
        onCustomerStateChanged: async (payload) => {
          console.log("Customer state changed:", payload.data);
        },
      }),
    ];

    plugins.push(
      polar({
        client: polarClient,
        createCustomerOnSignUp: false,
        use: polarPluginsList as any,
      })
    );
  }

  return betterAuth({
    logger: {
      disabled: optionsOnly,
    },
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins,
  });
};

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
