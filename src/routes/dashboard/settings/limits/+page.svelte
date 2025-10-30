<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold">Limits</h1>
		<p class="text-muted-foreground">View and manage your account limits and quotas.</p>
	</div>
	
	<div class="grid gap-6">
		<!-- Current Limits -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Current Limits</h2>
			<div class="space-y-6">
				<div>
					<div class="flex justify-between text-sm mb-2">
						<span>API Requests per month</span>
						<span>12,450 / 50,000</span>
					</div>
					<div class="h-3 w-full rounded-full bg-muted">
						<div class="h-3 w-1/4 rounded-full bg-primary"></div>
					</div>
					<div class="text-xs text-muted-foreground mt-1">24.9% used</div>
				</div>
				
				<div>
					<div class="flex justify-between text-sm mb-2">
						<span>Storage</span>
						<span>2.1 GB / 10 GB</span>
					</div>
					<div class="h-3 w-full rounded-full bg-muted">
						<div class="h-3 w-1/5 rounded-full bg-primary"></div>
					</div>
					<div class="text-xs text-muted-foreground mt-1">21% used</div>
				</div>
				
				<div>
					<div class="flex justify-between text-sm mb-2">
						<span>Team Members</span>
						<span>3 / 10</span>
					</div>
					<div class="h-3 w-full rounded-full bg-muted">
						<div class="h-3 w-3/10 rounded-full bg-primary"></div>
					</div>
					<div class="text-xs text-muted-foreground mt-1">30% used</div>
				</div>
				
				<div>
					<div class="flex justify-between text-sm mb-2">
						<span>Projects</span>
						<span>5 / 25</span>
					</div>
					<div class="h-3 w-full rounded-full bg-muted">
						<div class="h-3 w-1/5 rounded-full bg-primary"></div>
					</div>
					<div class="text-xs text-muted-foreground mt-1">20% used</div>
				</div>
			</div>
		</div>

		<!-- Plan Comparison -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Plan Comparison</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="border rounded-lg p-4">
					<div class="font-semibold mb-2">Free</div>
					<div class="text-2xl font-bold mb-4">$0<span class="text-sm font-normal text-muted-foreground">/month</span></div>
					<ul class="space-y-2 text-sm">
						<li>• 1,000 API requests</li>
						<li>• 1 GB storage</li>
						<li>• 1 team member</li>
						<li>• 3 projects</li>
					</ul>
				</div>
				
				<div class="border rounded-lg p-4 border-primary bg-primary/5">
					<div class="font-semibold mb-2">Pro <span class="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Current</span></div>
					<div class="text-2xl font-bold mb-4">$29<span class="text-sm font-normal text-muted-foreground">/month</span></div>
					<ul class="space-y-2 text-sm">
						<li>• 50,000 API requests</li>
						<li>• 10 GB storage</li>
						<li>• 10 team members</li>
						<li>• 25 projects</li>
					</ul>
				</div>
				
				<div class="border rounded-lg p-4">
					<div class="font-semibold mb-2">Enterprise</div>
					<div class="text-2xl font-bold mb-4">$99<span class="text-sm font-normal text-muted-foreground">/month</span></div>
					<ul class="space-y-2 text-sm">
						<li>• Unlimited API requests</li>
						<li>• 100 GB storage</li>
						<li>• Unlimited team members</li>
						<li>• Unlimited projects</li>
					</ul>
					<button class="w-full mt-4 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
						Upgrade
					</button>
				</div>
			</div>
		</div>

		<!-- Usage Alerts -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Usage Alerts</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Email notifications</div>
						<p class="text-sm text-muted-foreground">Get notified when approaching limits</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Alert at 80% usage</div>
						<p class="text-sm text-muted-foreground">Receive alerts when any limit reaches 80%</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Alert at 95% usage</div>
						<p class="text-sm text-muted-foreground">Receive critical alerts when any limit reaches 95%</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
			</div>
		</div>
	</div>
</div>
