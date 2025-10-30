import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { createConvexHttpClient } from '@mmailaender/convex-better-auth-svelte/sveltekit';
import { api } from '$convex/_generated/api';

export async function protectRoute(event: RequestEvent) {
	if (!event.locals.token) {
		console.log('[protectRoute] No token found in locals');
		throw redirect(302, '/login');
	}

	try {
		const client = createConvexHttpClient({ token: event.locals.token });
		const user = await client.query(api.auth.getCurrentUser, {});

		if (!user) {
			console.error('[protectRoute] No user found');
			throw redirect(302, '/login');
		}

		console.log('[protectRoute] User authenticated:', user.email);
		return { user };
	} catch (error: any) {
		if (error?.status >= 300 && error?.status < 400) {
			throw error;
		}
		console.error('[protectRoute] Failed to fetch user:', error);
		throw redirect(302, '/login');
	}
}
