import { POLAR_ACCESS_TOKEN, POLAR_SERVER } from '$env/static/private';
import { PUBLIC_CONVEX_SITE_URL } from '$env/static/public';
import { Polar } from '@polar-sh/sdk';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ request }: RequestEvent) {
    const polarConfigured = !!(POLAR_ACCESS_TOKEN && POLAR_ACCESS_TOKEN.trim() !== '');

    if (!polarConfigured) {
        return { polarConfigured, plans: [] };
    }

    const polar = new Polar({
        accessToken: POLAR_ACCESS_TOKEN,
        ...(POLAR_SERVER && POLAR_SERVER.trim() !== ''
            ? { server: POLAR_SERVER as 'production' | 'sandbox' }
            : {}),
    });

    const plans: Array<{
        name: string;
        price: number;
        interval: string;
        productId: string;
        features: string[];
        current?: boolean;
        isFree?: boolean;
    }> = [];

    try {
        const response = await polar.products.list({ limit: 100 });
        const items = response.result?.items ?? [];
        
        for (const product of items) {
            if (!product.isArchived) {
                const prices = product.prices ?? [];
                const firstPrice = prices[0];
                if (!firstPrice) continue;

                const cents = (firstPrice as any).priceAmount ?? 0;
                const interval = (firstPrice as any).recurringInterval ?? 'month';
                const description: string = product.description ?? '';
                const features = description
                    .split('\n')
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0);

                plans.push({
                    name: product.name,
                    price: Math.round(cents / 100),
                    interval,
                    productId: product.id,
                    features,
                    current: false,
                    isFree: cents === 0,
                });
            }
        }
    } catch (e) {
        console.error('Failed to fetch Polar products:', e);
        return { polarConfigured, plans: [] };
    }

    let customerState = null;
    const cookie = request.headers.get('cookie');
    
    try {
        const [customerStateResponse] = await Promise.all([
            fetch(`${PUBLIC_CONVEX_SITE_URL}/api/auth/customer/state`, {
                headers: {
                    cookie: cookie || '',
                },
            })
        ]);

        if (customerStateResponse.ok) {
            customerState = await customerStateResponse.json();
            
            if (customerState?.subscription?.productId) {
                const currentProductId = customerState.subscription.productId;
                const planIndex = plans.findIndex(p => p.productId === currentProductId);
                if (planIndex >= 0) {
                    plans[planIndex].current = true;
                }
            }
        }
    } catch (e) {
        console.error('Failed to fetch customer state:', e);
    }

    return {
        polarConfigured,
        plans,
        customerState,
    };
}
