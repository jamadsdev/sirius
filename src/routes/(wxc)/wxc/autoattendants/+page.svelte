<script>
	import { invalidateAll } from '$app/navigation';
	import { applyAction } from '$app/forms';

	import FileUpload from '$lib/components/utils/FileUpload.svelte';

	export let data;

	async function handleUpload(event) {
		switch (event.detail.type) {
			case 'success':
				console.log('It was a success');
				await invalidateAll();
				break;
			case 'error':
				break;
			default:
				await applyAction(event.detail);
		}
		// loading = false;
	}
</script>

<FileUpload on:message={handleUpload} />

{#if data.files}
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Job Name</th>
					<th>Job ID</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each data.files as file, i}
					<tr>
						<td>{file.jobName}</td>
						<td>{file}.id}</td>
						<td>Actions Here</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

{#each data.files as { id, type, jobName }}
	<h3>{jobName}</h3>
{/each}
