<script lang="ts">
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import { MailIcon, GithubIcon } from "@lucide/svelte/icons";
	import { goto } from '$app/navigation';
	import ThemeToggle from "$lib/components/theme-toggle.svelte";
	import { signIn } from '$lib/auth-client';
	
	let email = $state('');
	let password = $state('');
	let showEmailForm = $state(false);
	let isLoading = $state(false);
	let error = $state('');
	
	async function handleSocialLogin(provider: string) {
		isLoading = true;
		error = '';
		try {
			await signIn.social({ provider: provider as any });
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred. Please try again.';
			console.error('Social login error:', err);
			isLoading = false;
		}
	}
	
	async function handleEmailLogin() {
		if (!email || !password) return;
		isLoading = true;
		error = '';
		try {
			const result = await signIn.email({ email, password, callbackURL: '/dashboard' });
			if (result.error) {
				const errorMessage = result.error.message || '';
				if (errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('credentials')) {
					error = 'Email or password is incorrect. Please try again.';
				} else if (errorMessage.toLowerCase().includes('not found')) {
					error = 'No account found with this email. Please sign up first.';
				} else {
					error = errorMessage || 'Failed to sign in. Please try again.';
				}
				isLoading = false;
			} else {
				await new Promise(resolve => setTimeout(resolve, 100));
				goto('/dashboard');
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred. Please try again.';
			console.error('Email login error:', err);
			isLoading = false;
		}
	}
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
	<!-- Theme Toggle in top right -->
	<div class="absolute top-4 right-4">
		<ThemeToggle />
	</div>
	
	<div class="flex w-full max-w-sm flex-col gap-6">
		<a href="/" class="flex items-center gap-2 self-center font-medium">
			<div
				class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
			>
				<GalleryVerticalEndIcon class="size-4" />
			</div>
			Acme Inc.
		</a>
		
		<div class="flex flex-col gap-6">
			<div class="text-center">
				<h1 class="text-2xl font-bold">Welcome back</h1>
				<p class="text-muted-foreground">Sign in to your account</p>
			</div>
			
			{#if !showEmailForm}
				{#if import.meta.env.PUBLIC_GOOGLE_CLIENT_ID || import.meta.env.PUBLIC_GITHUB_CLIENT_ID || import.meta.env.PUBLIC_APPLE_CLIENT_ID}
					<!-- Social Login Options -->
					<div class="space-y-3">
						{#if import.meta.env.PUBLIC_GOOGLE_CLIENT_ID}
							<button 
								onclick={() => handleSocialLogin('google')}
								disabled={isLoading}
								class="w-full flex items-center justify-center gap-3 rounded-md border border-input bg-background px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
							>
								<svg class="h-4 w-4" viewBox="0 0 24 24">
									<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
									<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
									<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
									<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
								</svg>
								Continue with Google
							</button>
						{/if}
						
						{#if import.meta.env.PUBLIC_GITHUB_CLIENT_ID}
							<button 
								onclick={() => handleSocialLogin('github')}
								disabled={isLoading}
								class="w-full flex items-center justify-center gap-3 rounded-md border border-input bg-background px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
							>
								<GithubIcon class="h-4 w-4" />
								Continue with GitHub
							</button>
						{/if}
						
						{#if import.meta.env.PUBLIC_APPLE_CLIENT_ID}
							<button 
								onclick={() => handleSocialLogin('apple')}
								disabled={isLoading}
								class="w-full flex items-center justify-center gap-3 rounded-md border border-input bg-background px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
							>
								<svg class="h-4 w-4" viewBox="0 0 24 24">
									<path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
								</svg>
								Continue with Apple
							</button>
						{/if}
					</div>
					
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<span class="w-full border-t"></span>
						</div>
						<div class="relative flex justify-center text-xs uppercase">
							<span class="bg-background px-2 text-muted-foreground">Or continue with</span>
						</div>
					</div>
				{/if}
				
				<button 
					onclick={() => showEmailForm = true}
					class="w-full flex items-center justify-center gap-3 rounded-md border border-input bg-background px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
				>
					<MailIcon class="h-4 w-4" />
				Email login
				</button>
			{:else}
				<!-- Email Form -->
				<div class="space-y-4">
					{#if error}
						<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
							{error}
						</div>
					{/if}
					<div>
						<label for="email" class="text-sm font-medium">Email</label>
						<input 
							id="email" 
							type="email" 
							placeholder="your@email.com" 
							required 
							bind:value={email}
							disabled={isLoading}
							class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						/>
					</div>
					<div>
						<label for="password" class="text-sm font-medium">Password</label>
						<input 
							id="password" 
							type="password" 
							placeholder="Your password" 
							required 
							bind:value={password}
							disabled={isLoading}
							class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						/>
					</div>
					<button 
						onclick={handleEmailLogin}
						disabled={isLoading || !email || !password}
						class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
					>
						{isLoading ? 'Signing in...' : 'Continue'}
					</button>
					<button 
						onclick={() => showEmailForm = false}
						disabled={isLoading}
						class="w-full text-sm text-muted-foreground hover:text-foreground"
					>
						← Go back
					</button>
				</div>
			{/if}
			
			<p class="text-center text-sm text-muted-foreground">
				Don't have an account? <a href="/auth/signup" class="underline-offset-4 hover:underline">Sign up</a>
			</p>
		</div>
	</div>
	<p class="px-6 text-center text-xs text-muted-foreground">
		By clicking continue, you agree to our <a href="/terms" class="underline-offset-4 hover:underline">Terms of Service</a>
		and <a href="/privacy" class="underline-offset-4 hover:underline">Privacy Policy</a>.
	</p>
</div>
