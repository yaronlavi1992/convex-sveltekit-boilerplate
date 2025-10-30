<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { MoonIcon, SunIcon } from '@lucide/svelte/icons';
	import { Button } from '$lib/components/ui/button/index.js';
	
	function toggleTheme() {
		toggleMode();
	}
</script>

<Button
	variant="outline"
	size="icon"
	onclick={toggleTheme}
	class="h-9 w-9 rounded-md hover:bg-accent"
	title="Toggle theme"
>
	<SunIcon class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<MoonIcon class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">Toggle theme</span>
</Button>
