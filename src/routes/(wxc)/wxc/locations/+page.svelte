<script>
	/** @type {import('./$types').PageData} */
	import { modalStore, Accordion, AccordionItem, TabGroup, Tab } from '@skeletonlabs/skeleton';
	import UploadModal from '$lib/components/modals/UploadModal.svelte';
	import AddLocModal from '$lib/components/modals/AddLocModal.svelte';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let data;

	function uploadModal() {
		const c = { ref: UploadModal };
		const d = {
			type: 'component',
			title: 'File Upload',
			body: 'Complete the form below and then press upload.',
			component: c,
			response: (r) => {
				if (r) console.log('response:', r);
			}
		};
		modalStore.trigger(d);
	}
	function addLocModal() {
		const c = { ref: AddLocModal };
		const d = {
			type: 'component',
			title: 'Add New Location',
			body: 'Complete the form below and then press upload.',
			component: c,
			response: (r) => {
				if (r) console.log('response:', r);
			}
		};
		modalStore.trigger(d);
	}
	function fileName(fileName) {
		let parsedName = fileName.split('_');
		return parsedName[0] + '.csv';
	}

	let tabSet = 0;
</script>

<div class="p-5">
	<TabGroup>
		<Tab bind:group={tabSet} name="Current" value={0}>Manage Locations</Tab>
		<Tab bind:group={tabSet} name="Bulk" value={1}>Bulk Add</Tab>
		<svelte:fragment slot="panel">
			{#if tabSet === 1}
				<div class="pb-2">
					<button class="btn variant-ghost-surface" on:click={uploadModal}>File Upload</button>
				</div>
				<Accordion>
					<AccordionItem open>
						<svelte:fragment slot="summary">Last 5 Uploaded Files</svelte:fragment>
						<svelte:fragment slot="content">
							{#if data.files}
								<div class="table-container">
									<table class="table table-compact table-hover">
										<thead>
											<tr>
												<th>Description</th>
												<th>File Name</th>
												<th>Date Uploaded</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{#each data.files as file, i}
												<tr>
													<td>{file.jobName}</td>
													<td>{fileName(file.document)}</td>
													<td>{file.created}</td>
													<td>
														<div class="flex gap-3">
															<div>
																<Icon
																	name="book-open"
																	title="Display File"
																	height="1.5em"
																	width="1.5em"
																/>
															</div>
															<div>
																<Icon name="play" title="Run Job" height="1.5em" width="1.5em" />
															</div>
															<div>
																<Icon name="x" title="Delete" height="1.5em" width="1.5em" />
															</div>
														</div>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			{:else if tabSet === 0}
				<div class="pb-2">
					<button class="btn variant-ghost-surface" on:click={addLocModal}>
						<span><Icon name="plus" height="1.5em" width="1.5em" /></span>
						<span>Add Location</span>
					</button>
				</div>
				{#await data.streamed.locations}
					<div class="grid grid-cols-4 gap-4">
						<div class="placeholder animate-pulse" />
						<div class="placeholder animate-pulse" />
						<div class="placeholder animate-pulse" />
						<div class="placeholder animate-pulse" />
					</div>
				{:then locations}
					<div class="table-container">
						<table class="table table-compact table-hover">
							<thead>
								<tr>
									<th>Name</th>
									<th>Address</th>
									<th>Time Zone</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{#each locations as location, i}
									<tr>
										<td>{location.name}</td>
										<td
											>{location.address['address1']}
											{#if location.address['address2']}
												{location.address['address2']}
											{/if}
											<br />
											{location.address['city']}, {location.address['state']}
											{location.address['postalCode']}</td
										>
										<td>{location.timeZone}</td>
										<td>
											<div class="flex gap-3">
												<div>
													<Icon name="edit-2" title="Edit" height="1.5em" width="1.5em" />
												</div>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:catch}
					<p>Error Loading Locations</p>
				{/await}
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
