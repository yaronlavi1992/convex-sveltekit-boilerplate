<script lang="ts">
	import { goto } from '$app/navigation';
	import { useSession } from '$lib/auth-client';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	const convexConfigured = PUBLIC_CONVEX_URL && PUBLIC_CONVEX_URL.trim() !== '';
	
	let session: ReturnType<typeof useSession> | null = null;
	let user = $state<any>(null);
	let isLoading = $state(true);
	
	if (browser) {
		session = useSession();
	}
	
	$effect(() => {
		if (browser && session) {
			user = session.value?.data?.user;
			isLoading = session.value?.isPending ?? true;
		}
	});
	
	let hasRedirected = $state(false);
	
	$effect(() => {
		if (browser && convexConfigured && !hasRedirected && !isLoading) {
			hasRedirected = true;
			if (user) {
				goto('/dashboard');
			} else {
				goto('/login');
			}
		}
	});
	
	// Fallback timeout in case session is stuck loading
	onMount(() => {
		if (convexConfigured) {
			const timeout = setTimeout(() => {
				if (!hasRedirected) {
					hasRedirected = true;
					goto('/login');
				}
			}, 2000);
			
			return () => clearTimeout(timeout);
		}
	});
</script>

{#if !convexConfigured}
	<div class="flex min-h-screen items-center justify-center p-6">
		<div class="max-w-2xl text-center space-y-6">
			<div class="space-y-2">
				<h1 class="text-4xl font-bold">Welcome to Convex SvelteKit Boilerplate! 🚀</h1>
				<p class="text-xl text-muted-foreground">Let's get you set up in under 2 minutes</p>
			</div>
			
			<div class="bg-muted rounded-lg p-6 text-left space-y-4">
				<h2 class="text-2xl font-semibold">Setup Steps:</h2>
				
				<div class="space-y-3">
					<div class="flex gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">1</span>
						<div>
							<p class="font-medium">Run Convex Dev (in Terminal 1):</p>
							<code class="block mt-2 bg-background px-3 py-2 rounded text-sm">pnpm convex dev</code>
							<p class="text-sm text-muted-foreground mt-1">Follow prompts to create a Convex account and deployment</p>
						</div>
					</div>
					
					<div class="flex gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">2</span>
						<div>
							<p class="font-medium">Set environment variables (in Terminal 2):</p>
							<code class="block mt-2 bg-background px-3 py-2 rounded text-sm">pnpm setup:convex</code>
							<p class="text-sm text-muted-foreground mt-1">On Windows, use PowerShell to run this command</p>
						</div>
					</div>
					
					<div class="flex gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">3</span>
						<div>
							<p class="font-medium">Refresh this page!</p>
							<p class="text-sm text-muted-foreground">Your app will be ready to use</p>
						</div>
					</div>
				</div>
			</div>
			
			<p class="text-sm text-muted-foreground">
				Need help? Check the <a href="https://github.com/your-repo" class="underline">README</a> or <a href="https://docs.convex.dev" class="underline" target="_blank" rel="noopener noreferrer">Convex docs</a>
			</p>
		</div>
	</div>
{:else if isLoading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
	</div>
{/if}
