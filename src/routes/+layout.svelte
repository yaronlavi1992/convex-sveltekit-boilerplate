<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { initPostHog } from '$lib/analytics';
	import { browser } from '$app/environment';
	
	let { children } = $props();

	if (browser) {
		initPostHog();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
{@render children?.()}
