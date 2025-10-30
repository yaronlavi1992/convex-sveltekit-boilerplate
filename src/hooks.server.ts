import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Read the JWT token directly from cookies
  const token = event.cookies.get('better-auth.convex_jwt') || 
                event.cookies.get('__Secure-better-auth.convex_jwt') ||
                event.cookies.get('__Host-better-auth.convex_jwt');
  
  event.locals.token = token;

  return resolve(event);
};
