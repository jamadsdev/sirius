<script>
	export let parent;
	export let type;

	import { enhance } from '$app/forms';
	import { modalStore } from '@skeletonlabs/skeleton';

	const formData = {
		taskName: 'Task Name',
		type: type
	};

	const onFormSubmit = () => {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	};
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<div class="modal-example-form {cBase}">
	<header class={cHeader}>{$modalStore[0]?.title ?? '(title missing)'}</header>
	<article>{$modalStore[0]?.body ?? '(body missing)'}</article>
	<!-- Enable for debugging: -->
	<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
	<form
		action="/uploads?/upload"
		method="POST"
		enctype="multipart/form-data"
		class="modal-form {cForm}"
		use:enhance={onFormSubmit}
	>
		<label class="label">
			<span>Task Name</span>
			<input
				class="input"
				type="text"
				id="jobName"
				name="jobName"
				bind:value={formData.taskname}
				placeholder="Enter task name..."
			/>
		</label>
		<label class="label">
			<span>Config Type</span>
			<select class="select" id="type" name="type">
				<option value="locations">Locations</option>
				<option value="schedules">Schedules</option>
				<option value="autoattendants">Auto Attendant</option>
			</select>
		</label>
		<label class="label">
			<span>Select File</span>
			<input type="file" name="document" id="document" accept="text/csv" />
		</label>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <!-- <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Upload</button> -->
		<button class="btn {parent.buttonPositive}">Upload</button>
    </footer>
	</form>
</div>
