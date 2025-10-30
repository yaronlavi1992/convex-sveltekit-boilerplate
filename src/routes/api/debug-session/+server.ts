import { PUBLIC_CONVEX_SITE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ request }: RequestEvent) {
	try {
		const cookie = request.headers.get('cookie');
		
		const sessionResponse = await fetch(`${PUBLIC_CONVEX_SITE_URL}/api/auth/session`, {
			headers: {
				cookie: cookie || '',
			},
		});

		const sessionData = await sessionResponse.json();
		
		let customerState = null;
		let customerStateError = null;
		
		try {
			const customerStateResponse = await fetch(`${PUBLIC_CONVEX_SITE_URL}/api/auth/customer/state`, {
				headers: {
					cookie: cookie || '',
				},
			});

			if (customerStateResponse.ok) {
				customerState = await customerStateResponse.json();
			} else {
				customerStateError = {
					status: customerStateResponse.status,
					statusText: customerStateResponse.statusText,
					body: await customerStateResponse.text(),
				};
			}
		} catch (e: any) {
			customerStateError = e.message;
		}

		return json({
			session: sessionData,
			customerState,
			customerStateError,
		});
	} catch (error: any) {
		return json({ error: error.message }, { status: 500 });
	}
}
