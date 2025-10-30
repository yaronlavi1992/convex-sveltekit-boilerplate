<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold">Notifications</h1>
		<p class="text-muted-foreground">Manage your notification preferences and settings.</p>
	</div>
	
	<div class="grid gap-6">
		<!-- Email Notifications -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Email Notifications</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Account updates</div>
						<p class="text-sm text-muted-foreground">Password changes, email updates, and security alerts</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Billing notifications</div>
						<p class="text-sm text-muted-foreground">Payment confirmations, invoice reminders, and subscription changes</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Product updates</div>
						<p class="text-sm text-muted-foreground">New features, improvements, and maintenance notifications</p>
					</div>
					<input type="checkbox" class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Marketing emails</div>
						<p class="text-sm text-muted-foreground">Tips, best practices, and promotional content</p>
					</div>
					<input type="checkbox" class="rounded" />
				</div>
			</div>
		</div>

		<!-- Push Notifications -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Push Notifications</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Browser notifications</div>
						<p class="text-sm text-muted-foreground">Show notifications in your browser</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Desktop notifications</div>
						<p class="text-sm text-muted-foreground">Show notifications on your desktop</p>
					</div>
					<input type="checkbox" class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Mobile notifications</div>
						<p class="text-sm text-muted-foreground">Show notifications on your mobile device</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
			</div>
		</div>

		<!-- Notification Frequency -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Notification Frequency</h2>
			<div class="space-y-4">
				<div>
					<label for="email-frequency" class="text-sm font-medium">Email frequency</label>
					<select id="email-frequency" class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
						<option>Immediately</option>
						<option selected>Daily digest</option>
						<option>Weekly digest</option>
						<option>Never</option>
					</select>
				</div>
				<div>
					<label for="push-frequency" class="text-sm font-medium">Push notification frequency</label>
					<select id="push-frequency" class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
						<option selected>Immediately</option>
						<option>Hourly</option>
						<option>Daily</option>
						<option>Never</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Quiet Hours -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Quiet Hours</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Enable quiet hours</div>
						<p class="text-sm text-muted-foreground">Pause notifications during specified times</p>
					</div>
					<input type="checkbox" class="rounded" />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="start-time" class="text-sm font-medium">Start time</label>
						<input id="start-time" type="time" value="22:00" class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
					</div>
					<div>
						<label for="end-time" class="text-sm font-medium">End time</label>
						<input id="end-time" type="time" value="08:00" class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
					</div>
				</div>
			</div>
		</div>

		<!-- Notification History -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Recent Notifications</h2>
			<div class="space-y-3">
				<div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
					<div class="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
					<div class="flex-1">
						<div class="text-sm font-medium">Payment successful</div>
						<div class="text-xs text-muted-foreground">Your Pro plan subscription has been renewed</div>
						<div class="text-xs text-muted-foreground mt-1">2 hours ago</div>
					</div>
				</div>
				<div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
					<div class="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
					<div class="flex-1">
						<div class="text-sm font-medium">New feature available</div>
						<div class="text-xs text-muted-foreground">Check out the new analytics dashboard</div>
						<div class="text-xs text-muted-foreground mt-1">1 day ago</div>
					</div>
				</div>
				<div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
					<div class="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
					<div class="flex-1">
						<div class="text-sm font-medium">Storage warning</div>
						<div class="text-xs text-muted-foreground">You're using 80% of your storage quota</div>
						<div class="text-xs text-muted-foreground mt-1">3 days ago</div>
					</div>
				</div>
			</div>
			<button class="mt-4 text-sm text-primary hover:underline">
				View all notifications
			</button>
		</div>
	</div>
</div>
