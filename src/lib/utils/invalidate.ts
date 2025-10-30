import { invalidateAll } from "$app/navigation";

export async function invalidateAuth() {
  return invalidateAll();
}

export async function invalidateUser() {
  return invalidateAll();
}
