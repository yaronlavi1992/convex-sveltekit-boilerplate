<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { authClient } from '$lib/auth-client';
	import { getSession } from '$lib/session-store.svelte';
	import CheckIcon from "@lucide/svelte/icons/check";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

    let { data }: { data: { polarConfigured: boolean; plans?: Array<{ name: string; price: number; interval: string; productId: string; features: string[]; current?: boolean; isFree?: boolean }>; customerState?: any } } = $props();

	const session = getSession();
	let user = $state<any>(null);
	
	$effect(() => {
		if (browser && session) {
			user = session.value?.data?.user;
		}
	});
    const polarConfigured = data.polarConfigured;
    const basePlans = [...(data.plans ?? [])].reverse();
    let plans = $state([...basePlans]);
    let currentPlan = $state<string | null>(null);
    let hasActiveSubscription = $state(false);
    let showSuccessMessage = $state(false);

    // Initialize plans with current subscription status (runs once on mount)
    function updatePlansFromCustomerState(customerState: any) {
        if (!customerState) return;
        
        const activeSubscriptions = (customerState as any).subscriptions?.filter((s: any) => 
            s.status === 'active' || s.status === 'trialing'
        ) ?? [];
        
        if (activeSubscriptions.length > 0) {
            hasActiveSubscription = true;
            const currentSub = activeSubscriptions[0];
            const productId = currentSub?.product?.id;
            
            if (productId) {
                currentPlan = productId;
                plans = basePlans.map((p) => ({ ...p, current: p.productId === productId }));
            }
        } else {
            const freeProductId = "82627e54-40e6-4dec-ba8f-58ad8f610767";
            currentPlan = freeProductId;
            hasActiveSubscription = false;
            plans = basePlans.map((p) => ({ ...p, current: p.productId === freeProductId }));
        }
    }

    // Initialize on component creation
    if (polarConfigured && data.customerState) {
        updatePlansFromCustomerState(data.customerState);
    }

    let isRefreshing = $state(false);
    
    async function refreshCustomerState() {
        if (!polarConfigured || !browser) return;
        
        try {
            isRefreshing = true;
            const client = authClient as any;
            if (client.customer?.state) {
                const stateResponse = await client.customer.state();
                const freshCustomerState = stateResponse?.data;
                
                if (freshCustomerState) {
                    updatePlansFromCustomerState(freshCustomerState);
                } else if (stateResponse?.error) {
                    // Handle case where customer doesn't exist yet in Polar
                    console.log('Customer state not available:', stateResponse.error.message);
                    // User is on free plan
                    hasActiveSubscription = false;
                    const freeProductId = "82627e54-40e6-4dec-ba8f-58ad8f610767";
                    currentPlan = freeProductId;
                    plans = basePlans.map((p) => ({ ...p, current: p.productId === freeProductId }));
                }
            }
        } catch (error) {
            console.error('Failed to refresh customer state:', error);
            // Don't throw - just log and keep current state
        } finally {
            isRefreshing = false;
        }
    }

    onMount(() => {
        if (!polarConfigured) return;
        
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            showSuccessMessage = true;
            const url = new URL(window.location.href);
            url.searchParams.delete('success');
            window.history.replaceState({}, '', url.pathname);
            
            let pollCount = 0;
            const maxPolls = 10;
            
            const pollInterval = setInterval(async () => {
                pollCount++;
                await refreshCustomerState();
                
                if (hasActiveSubscription || pollCount >= maxPolls) {
                    clearInterval(pollInterval);
                }
            }, 1000);
            
            const hideTimeout = setTimeout(() => {
                showSuccessMessage = false;
            }, 5000);

            return () => {
                clearInterval(pollInterval);
                clearTimeout(hideTimeout);
            };
        }
    });

	async function handleCheckout(productId: string) {
		if (!polarConfigured) {
			console.error('Polar is not configured');
			return;
		}

		try {
			// Use Better Auth Polar checkout method
			const client = authClient as any;
			if (client.checkout) {
				await client.checkout({
					products: [productId],
					redirect: true
				});
			}
		} catch (error) {
			console.error('Checkout failed:', error);
		}
	}

	async function openCustomerPortal() {
		if (!polarConfigured) {
			console.error('Polar is not configured');
			return;
		}

		try {
			// Opens the Polar customer portal where users can manage subscriptions
			const client = authClient as any;
			if (client.customer?.portal) {
				await client.customer.portal();
			}
		} catch (error) {
			console.error('Failed to open customer portal:', error);
		}
	}

	async function cancelSubscription() {
		if (!polarConfigured || !hasActiveSubscription) {
			return;
		}

		if (!confirm('Are you sure you want to cancel your subscription? You will be downgraded to the Free plan at the end of your billing period.')) {
			return;
		}

		try {
			// Get active subscription to cancel
			const client = authClient as any;
			const state = client.customer ? await client.customer.state() : null;
			const customerState = state?.data;
			const activeSubscriptions = (customerState as any)?.subscriptions?.filter((s: any) => 
				s.status === 'active' || s.status === 'trialing'
			) ?? [];

			if (activeSubscriptions.length > 0) {
				const subscriptionId = activeSubscriptions[0].id;
				
				// Cancel via our API endpoint
				const response = await fetch('/api/subscriptions/cancel', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ subscriptionId }),
				});

				if (response.ok) {
					alert('Subscription canceled successfully. You will retain access until the end of your billing period.');
					window.location.reload();
				} else {
					throw new Error('Failed to cancel subscription');
				}
			}
		} catch (error) {
			console.error('Failed to cancel subscription:', error);
			alert('Failed to cancel subscription. Please try using the Customer Portal.');
		}
	}
</script>

<svelte:head>
	<title>Billing - Convex Boilerplate</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold tracking-tight">Billing</h1>
		<p class="text-muted-foreground">Manage your subscription and billing information</p>
	</div>

	{#if showSuccessMessage}
		<Card class="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
			<div class="flex items-center gap-3">
				<CheckCircle2Icon class="h-5 w-5 text-green-600 dark:text-green-400" />
				<div class="flex-1">
					<h3 class="font-semibold text-green-900 dark:text-green-100">Subscription Updated Successfully!</h3>
					<p class="text-sm text-green-700 dark:text-green-300">
						{#if isRefreshing}
							Syncing your subscription details...
						{:else}
							Your subscription has been activated. Welcome to your new plan!
						{/if}
					</p>
				</div>
				{#if isRefreshing}
					<div class="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
				{/if}
			</div>
		</Card>
	{/if}

	{#if !polarConfigured}
		<!-- Billing Not Configured -->
		<Card class="p-6">
			<div class="flex items-start gap-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
					<AlertCircleIcon class="h-6 w-6 text-muted-foreground" />
				</div>
				<div class="flex-1">
					<h2 class="text-xl font-semibold mb-2">Billing Features Not Configured</h2>
					<p class="text-muted-foreground mb-4">
						To enable billing and subscription management, you need to configure Polar.sh (Merchant of Record with built-in tax compliance).
					</p>
					<div class="rounded-md bg-muted p-4 mb-4">
						<p class="text-sm font-medium mb-2">Setup Instructions:</p>
						<ol class="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
							<li>Sign up for a Polar account at <a href="https://polar.sh/signup" target="_blank" rel="noopener noreferrer" class="underline">polar.sh</a></li>
							<li>Create an organization and create products in your dashboard</li>
							<li>Get your Access Token from <a href="https://polar.sh/settings" target="_blank" rel="noopener noreferrer" class="underline">Settings</a></li>
							<li>Set up a webhook endpoint and get the Webhook Secret from <a href="https://polar.sh/settings/webhooks" target="_blank" rel="noopener noreferrer" class="underline">Webhook Settings</a></li>
							<li>Add the following to your <code class="bg-background px-1 rounded">.env.local</code> file:</li>
						</ol>
						<pre class="mt-2 text-xs bg-background p-2 rounded overflow-x-auto">POLAR_ACCESS_TOKEN=polar_at_...
POLAR_WEBHOOK_SECRET=whsec_...</pre>
						<p class="text-sm text-muted-foreground mt-3">
							<strong>Note:</strong> The Better Auth Polar plugin automatically:
						</p>
						<ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2 mt-1">
							<li>Creates Polar customers when users sign up</li>
							<li>Syncs customer data between Better Auth and Polar</li>
							<li>Handles webhooks for subscription events</li>
							<li>Provides customer portal for subscription management</li>
						</ul>
					</div>
					<p class="text-sm text-muted-foreground">
						After configuration, restart your development server to enable billing features.
					</p>
				</div>
			</div>
		</Card>
	{:else}
		<!-- Current Plan -->
		<Card class="p-6">
			<div class="mb-4 flex items-center justify-between">
				<div>
					<h2 class="text-xl font-semibold">Current Plan</h2>
					<p class="text-sm text-muted-foreground">Account: {user?.email}</p>
				</div>
				<div class="flex items-center gap-2">
					<Button 
						variant="ghost" 
						size="sm"
						onclick={refreshCustomerState}
						disabled={isRefreshing}
						class="h-8 w-8 p-0"
						title="Refresh subscription status"
					>
						<RefreshCwIcon class={cn("h-4 w-4", isRefreshing && "animate-spin")} />
					</Button>
					<Badge>{hasActiveSubscription ? 'Paid' : 'Free'}</Badge>
				</div>
			</div>
			<div class="mt-6 flex items-center justify-between">
				<div>
					<p class="text-3xl font-bold">
						{#if hasActiveSubscription}
							{plans.find(p => p.current)?.name || 'Your subscription'}
						{:else}
							Free Plan
						{/if}
					</p>
					<p class="mt-2 text-sm text-muted-foreground">
						{#if hasActiveSubscription}
							Manage your subscription or cancel anytime
						{:else}
							Upgrade to unlock premium features
						{/if}
					</p>
				</div>
				<div class="flex gap-2">
					<Button variant="outline" onclick={openCustomerPortal}>
						<CreditCardIcon class="mr-2 h-4 w-4" />
						Manage Subscription
					</Button>
					{#if hasActiveSubscription}
						<Button variant="destructive" onclick={cancelSubscription}>
							Cancel Subscription
						</Button>
					{/if}
				</div>
			</div>
		</Card>

		<!-- Available Plans -->
		<div>
			<h2 class="mb-4 text-2xl font-semibold">Available Plans</h2>
			<div class="grid gap-6 md:grid-cols-3">
				{#each plans as plan}
					<Card class={cn('relative p-6 h-full flex flex-col', plan.current && 'border-primary')}>
						{#if plan.current}
							<Badge class="absolute -top-3 right-4">Current Plan</Badge>
						{/if}
						<div class="mb-4">
							<h3 class="text-2xl font-bold">{plan.name}</h3>
							<div class="mt-2">
								<span class="text-4xl font-bold">${plan.price}</span>
								<span class="text-muted-foreground">/{plan.interval}</span>
							</div>
						</div>
						<ul class="mb-6 space-y-3">
							{#each plan.features as feature}
								<li class="flex items-start gap-2">
									<CheckIcon class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
									<span class="text-sm">{feature}</span>
								</li>
							{/each}
						</ul>
						<Button
							class="w-full mt-auto"
							variant={plan.current ? 'outline' : 'default'}
							disabled={plan.current || plan.isFree}
							onclick={() => handleCheckout(plan.productId)}
						>
							{plan.current ? 'Current Plan' : plan.isFree ? 'Free' : 'Upgrade'}
						</Button>
					</Card>
				{/each}
			</div>
		</div>

		<!-- Info Card -->
		<Card class="p-6 bg-muted/50">
			<div class="flex items-start gap-4">
				<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
					<AlertCircleIcon class="h-5 w-5 text-primary" />
				</div>
				<div class="flex-1">
					<h3 class="font-semibold mb-1">Powered by Polar.sh</h3>
					<p class="text-sm text-muted-foreground">
						All billing is handled by Polar.sh, a Merchant of Record that handles global tax compliance, 
						secure payments, and subscription management. Click "Manage Subscription" to view your orders, 
						invoices, and subscription details in the customer portal.
					</p>
				</div>
			</div>
		</Card>
	{/if}
</div>
