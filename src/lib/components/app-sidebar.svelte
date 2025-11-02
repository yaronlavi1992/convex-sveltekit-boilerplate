<script lang="ts" module>
	import AudioWaveformIcon from "@lucide/svelte/icons/audio-waveform";
	import CommandIcon from "@lucide/svelte/icons/command";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";

	const data = {
		teams: [
			{
				name: "Acme Inc",
				logo: GalleryVerticalEndIcon,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: AudioWaveformIcon,
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				logo: CommandIcon,
				plan: "Free",
			},
		],
		navMain: [
			{
				title: "Dashboard",
				url: "/dashboard",
				icon: SquareTerminalIcon,
				isActive: true,
			},
			{
				title: "Settings",
				url: "/dashboard/settings",
				icon: Settings2Icon,
				items: [
					{
						title: "General",
						url: "/dashboard/settings",
					},
					{
						title: "Team",
						url: "/dashboard/settings/team",
					},
					{
						title: "Billing",
						url: "/dashboard/settings/billing",
					},
					{
						title: "Notifications",
						url: "/dashboard/settings/notifications",
					},
					{
						title: "Limits",
						url: "/dashboard/settings/limits",
					},
				],
			},
		],
	};
</script>

<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavUser from "./nav-user.svelte";
	import TeamSwitcher from "./team-switcher.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";

	type User = {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};

	let {
		ref = $bindable(null),
		collapsible = "icon",
		user,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { user?: User | null } = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if user}
			<NavUser {user} />
		{/if}
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
