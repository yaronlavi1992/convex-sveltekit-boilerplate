<script lang="ts">
	type User = {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};

	let { data }: { data: { user: User } } = $props();
</script>

<svelte:head>
	<title>Settings - Convex Boilerplate</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold">Settings</h1>
		<p class="text-muted-foreground">Manage your account settings and preferences.</p>
	</div>
	
	<div class="grid gap-6">
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Account Settings</h2>
			{#if data.user}
				<div class="space-y-4">
					<div>
						<div class="text-sm font-medium">Email</div>
						<p class="text-sm text-muted-foreground">{data.user.email ?? 'Not available'}</p>
					</div>
					<div>
						<div class="text-sm font-medium">Name</div>
						<p class="text-sm text-muted-foreground">{data.user.name ?? data.user.email?.split('@')[0] ?? 'Not set'}</p>
					</div>
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">Loading account information...</p>
			{/if}
		</div>
		
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Preferences</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Email notifications</div>
						<p class="text-sm text-muted-foreground">Receive email updates</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Push notifications</div>
						<p class="text-sm text-muted-foreground">Receive push notifications</p>
					</div>
					<input type="checkbox" class="rounded" />
				</div>
			</div>
		</div>
	</div>
</div>
