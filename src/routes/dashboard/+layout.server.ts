import { protectRoute } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { user } = await protectRoute(event);
	
	console.log('[Dashboard Layout] User data:', JSON.stringify(user, null, 2));

	return {
		user,
	};
};
