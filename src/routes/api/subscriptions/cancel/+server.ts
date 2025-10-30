import { json } from '@sveltejs/kit';
import { POLAR_ACCESS_TOKEN, POLAR_SERVER } from '$env/static/private';
import { Polar } from '@polar-sh/sdk';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { subscriptionId } = await request.json();

        if (!subscriptionId) {
            return json({ error: 'Subscription ID is required' }, { status: 400 });
        }

        const polar = new Polar({
            accessToken: POLAR_ACCESS_TOKEN,
            ...(POLAR_SERVER && POLAR_SERVER.trim() !== ''
                ? { server: POLAR_SERVER as 'production' | 'sandbox' }
                : {}),
        });

        await polar.subscriptions.update({
            id: subscriptionId,
            subscriptionUpdate: {
                cancelAtPeriodEnd: true
            }
        });

        return json({ success: true });
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
        return json({ error: 'Failed to cancel subscription' }, { status: 500 });
    }
};
