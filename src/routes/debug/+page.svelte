<script lang="ts">
	import { onMount } from 'svelte';
	
	let sessionData = $state<any>(null);
	let customerState = $state<any>(null);
	let error = $state<string | null>(null);
	let loading = $state(true);
	
	onMount(async () => {
		try {
			const response = await fetch('/api/debug-session');
			if (response.ok) {
				const data = await response.json();
				sessionData = data.session;
				customerState = data.customerState;
				if (data.customerStateError) {
					error = JSON.stringify(data.customerStateError, null, 2);
				}
			} else {
				error = `HTTP ${response.status}: ${response.statusText}`;
			}
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Debug Session</title>
</svelte:head>

<div class="container mx-auto p-8 max-w-4xl">
	<h1 class="text-3xl font-bold mb-6">Session Debug Information</h1>
	
	{#if loading}
		<p>Loading...</p>
	{:else}
		<div class="space-y-6">
			<div class="border rounded-lg p-4">
				<h2 class="text-xl font-semibold mb-3">Session Data</h2>
				<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm">{JSON.stringify(sessionData, null, 2)}</pre>
			</div>
			
			<div class="border rounded-lg p-4">
				<h2 class="text-xl font-semibold mb-3">Customer State</h2>
				<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm">{JSON.stringify(customerState, null, 2)}</pre>
			</div>
			
			{#if error}
				<div class="border border-red-500 rounded-lg p-4 bg-red-50 dark:bg-red-950">
					<h2 class="text-xl font-semibold mb-3 text-red-700 dark:text-red-300">Customer State Error</h2>
					<pre class="text-sm text-red-800 dark:text-red-200">{error}</pre>
				</div>
			{/if}
		</div>
	{/if}
</div>
