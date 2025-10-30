<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldSeparator,
	} from "$lib/components/ui/field/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { signIn } from '$lib/auth-client';
	import { z } from 'zod';

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const id = $props.id();

	const signInSchema = z.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(1, 'Password is required'),
	});

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');
	let validationErrors = $state<Record<string, string>>({});

	function validateForm(): boolean {
		const result = signInSchema.safeParse({ email, password });
		if (!result.success) {
			const fieldErrors = result.error.flatten().fieldErrors;
			const errors: Record<string, string> = {};
			Object.entries(fieldErrors).forEach(([key, messages]) => {
				errors[key] = messages?.[0] ?? 'Invalid value';
			});
			validationErrors = errors;
			return false;
		}
		validationErrors = {};
		return true;
	}

	async function handleEmailSignIn() {
		if (!validateForm()) return;

		loading = true;
		error = '';
		try {
			console.log('Attempting sign in...');
			const result = await signIn.email({ email, password, callbackURL: '/dashboard' });
			console.log('Sign in result:', result);
			
			if (result.error) {
				const errorMessage = result.error.message || '';
				console.error('Sign in error:', errorMessage);
				if (errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('credentials')) {
					error = 'Email or password is incorrect. Please try again.';
				} else if (errorMessage.toLowerCase().includes('not found')) {
					error = 'No account found with this email. Please sign up first.';
				} else {
					error = errorMessage || 'Failed to sign in. Please try again.';
				}
				loading = false;
			} else {
				console.log('Sign in successful, redirecting to dashboard...');
				window.location.href = '/dashboard';
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
			error = message;
			console.error('Sign in error (caught):', err);
			loading = false;
		}
	}

	async function handleGoogleSignIn() {
		loading = true;
		error = '';
		try {
			await signIn.social({ provider: 'google' });
		} catch (err) {
			const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
			error = message;
			console.error('Google sign in error:', err);
			loading = false;
		}
	}
</script>

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Welcome back</Card.Title>
			<Card.Description>Login with your Google account or email</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if error}
				<div class="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
					{error}
				</div>
			{/if}

			<form>
				<FieldGroup>
					<Field>
						<Button variant="outline" type="button" onclick={handleGoogleSignIn} disabled={loading}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									fill="currentColor"
								/>
							</svg>
							Login with Google
						</Button>
					</Field>
					<FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
						Or continue with
					</FieldSeparator>
					<Field>
						<FieldLabel for="email-{id}">Email</FieldLabel>
						<Input 
							id="email-{id}" 
							type="email" 
							placeholder="m@example.com" 
							bind:value={email}
							required 
							disabled={loading}
							aria-invalid={!!validationErrors.email}
						/>
						{#if validationErrors.email}
							<p class="text-xs text-destructive">{validationErrors.email}</p>
						{/if}
					</Field>
					<Field>
						<div class="flex items-center">
							<FieldLabel for="password-{id}">Password</FieldLabel>
							<a href="##" class="ml-auto text-sm underline-offset-4 hover:underline">
								Forgot your password?
							</a>
						</div>
						<Input 
							id="password-{id}" 
							type="password" 
							bind:value={password}
							required 
							disabled={loading}
							aria-invalid={!!validationErrors.password}
						/>
						{#if validationErrors.password}
							<p class="text-xs text-destructive">{validationErrors.password}</p>
						{/if}
					</Field>
					<Field>
						<button type="button" onclick={handleEmailSignIn} disabled={loading} class="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50">
							{loading ? 'Signing in...' : 'Login'}
						</button>
						<FieldDescription class="text-center">
							Don't have an account? <a href="/auth/signup">Sign up</a>
						</FieldDescription>
					</Field>
				</FieldGroup>
			</form>
		</Card.Content>
	</Card.Root>
	<FieldDescription class="px-6 text-center">
		By clicking continue, you agree to our <a href="##">Terms of Service</a>
		and <a href="##">Privacy Policy</a>.
	</FieldDescription>
</div>
