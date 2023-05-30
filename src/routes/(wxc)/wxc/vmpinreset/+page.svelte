<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="p-5">
	{#await data.streamed.users}
		<div class="grid grid-cols-4 gap-4">
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
		</div>
	{:then users}
		<div class="table-container">
			<table class="table-compact table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Phone Number</th>
						<th>Location</th>
					</tr>
				</thead>
				<tbody>
					{#each users as user, i}
						<tr>
							<td>{user.displayName}</td>
							<td>{user.emails[0]}</td>
							<td>{user.phoneNumbers[0].value}</td>
							<td>{user.locationId}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/await}
</div>
