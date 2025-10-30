<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold">Team</h1>
		<p class="text-muted-foreground">Manage your team members and their permissions.</p>
	</div>
	
	<div class="grid gap-6">
		<!-- Team Members -->
		<div class="bg-card rounded-lg border p-6">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-semibold">Team Members</h2>
				<button class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
					Invite Member
				</button>
			</div>
			<div class="space-y-4">
				<div class="flex items-center justify-between border-b pb-4">
					<div class="flex items-center gap-3">
						<div class="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
							JD
						</div>
						<div>
							<div class="font-medium">John Doe</div>
							<div class="text-sm text-muted-foreground">john@example.com</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Admin</span>
						<button class="text-sm text-muted-foreground hover:text-foreground">Edit</button>
					</div>
				</div>
				<div class="flex items-center justify-between border-b pb-4">
					<div class="flex items-center gap-3">
						<div class="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-medium">
							JS
						</div>
						<div>
							<div class="font-medium">Jane Smith</div>
							<div class="text-sm text-muted-foreground">jane@example.com</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">Member</span>
						<button class="text-sm text-muted-foreground hover:text-foreground">Edit</button>
					</div>
				</div>
				<div class="flex items-center justify-between border-b pb-4">
					<div class="flex items-center gap-3">
						<div class="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
							MJ
						</div>
						<div>
							<div class="font-medium">Mike Johnson</div>
							<div class="text-sm text-muted-foreground">mike@example.com</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Pending</span>
						<button class="text-sm text-muted-foreground hover:text-foreground">Resend</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Team Settings -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Team Settings</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Allow member invitations</div>
						<p class="text-sm text-muted-foreground">Members can invite other members</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Require approval for new members</div>
						<p class="text-sm text-muted-foreground">New members need admin approval</p>
					</div>
					<input type="checkbox" class="rounded" />
				</div>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Two-factor authentication required</div>
						<p class="text-sm text-muted-foreground">All members must use 2FA</p>
					</div>
					<input type="checkbox" checked class="rounded" />
				</div>
			</div>
		</div>

		<!-- Team Usage -->
		<div class="bg-card rounded-lg border p-6">
			<h2 class="text-xl font-semibold mb-4">Team Usage</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="text-center">
					<div class="text-2xl font-bold">3</div>
					<div class="text-sm text-muted-foreground">Active Members</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold">1</div>
					<div class="text-sm text-muted-foreground">Pending Invites</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold">7</div>
					<div class="text-sm text-muted-foreground">Available Slots</div>
				</div>
			</div>
		</div>
	</div>
</div>
