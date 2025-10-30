import { signOut as signOutClient } from "$lib/auth-client";
import { goto } from "$app/navigation";

export async function signOut(): Promise<void> {
  try {
    await signOutClient();
    await goto("/auth/signin");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to sign out";
    console.error("Sign out error:", message);
    throw new Error(message);
  }
}
