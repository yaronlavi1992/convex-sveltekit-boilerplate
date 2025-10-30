<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import UsersIcon from "@lucide/svelte/icons/users";
	import DollarSignIcon from "@lucide/svelte/icons/dollar-sign";
	import ActivityIcon from "@lucide/svelte/icons/activity";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";

	const stats = [
		{
			title: 'Total Revenue',
			value: '$45,231.89',
			change: '+20.1% from last month',
			icon: DollarSignIcon
		},
		{
			title: 'Active Users',
			value: '+2,350',
			change: '+180.1% from last month',
			icon: UsersIcon
		},
		{
			title: 'Subscriptions',
			value: '+12,234',
			change: '+19% from last month',
			icon: CreditCardIcon
		},
		{
			title: 'Active Now',
			value: '+573',
			change: '+201 since last hour',
			icon: ActivityIcon
		}
	];
</script>

<svelte:head>
	<title>Dashboard - Convex Boilerplate</title>
</svelte:head>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
			<p class="text-muted-foreground">Welcome back! Here's your overview.</p>
		</div>
		<Button>
			<ArrowUpRightIcon class="mr-2 h-4 w-4" />
			View Reports
		</Button>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each stats as stat}
			<Card class="p-6">
				<div class="flex items-center justify-between">
					<p class="text-sm font-medium text-muted-foreground">{stat.title}</p>
					<svelte:component this={stat.icon} class="h-4 w-4 text-muted-foreground" />
				</div>
				<div class="mt-2">
					<p class="text-2xl font-bold">{stat.value}</p>
					<p class="text-xs text-muted-foreground">{stat.change}</p>
				</div>
			</Card>
		{/each}
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<Card class="col-span-4 p-6">
			<div>
				<h3 class="text-lg font-semibold">Overview</h3>
				<p class="text-sm text-muted-foreground">Your app's performance metrics</p>
			</div>
			<div class="mt-8 h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
				<p class="text-muted-foreground">Chart placeholder - integrate with your data</p>
			</div>
		</Card>

		<Card class="col-span-3 p-6">
			<div>
				<h3 class="text-lg font-semibold">Recent Activity</h3>
				<p class="text-sm text-muted-foreground">Latest user activities</p>
			</div>
			<div class="mt-8 space-y-4">
				{#each Array(5) as _, i}
					<div class="flex items-center gap-4">
						<div class="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
							<span class="text-sm font-medium">U{i + 1}</span>
						</div>
						<div class="flex-1 space-y-1">
							<p class="text-sm font-medium leading-none">User Activity {i + 1}</p>
							<p class="text-sm text-muted-foreground">{Math.floor(Math.random() * 60)} minutes ago</p>
						</div>
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>
