import { createAuthClient } from "better-auth/svelte";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
  plugins: [convexClient(), polarClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
