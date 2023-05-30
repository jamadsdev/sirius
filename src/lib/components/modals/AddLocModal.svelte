<script>
	export let parent;

	import { enhance } from '$app/forms';
	import { modalStore } from '@skeletonlabs/skeleton';

	const formData = {
		name: '',
		timeZone: '',
		preferredLanguage: 'en_us',
		announcementLanguage: 'en_us',
		address: {
			address1: '',
			address2: '',
			city: '',
			state: '',
			postalCode: '',
			country: ''
		}
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

<div class={cBase}>
	<header class={cHeader}>{$modalStore[0]?.title ?? '(title missing)'}</header>
	<article>{$modalStore[0]?.body ?? '(body missing)'}</article>
	<!-- Enable for debugging: -->
	<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
	<form action="?/addLoc" method="POST" class="modal-form {cForm}" use:enhance={onFormSubmit}>
		<label class="label">
			<span>Location Name</span>
			<input
				class="input"
				type="text"
				id="name"
				name="name"
				bind:value={formData.name}
				placeholder="Headquarters"
			/>
		</label>
		<label class="label">
			<span>Time Zone</span>
			<input
				class="input"
				type="text"
				id="timeZone"
				name="timeZone"
				bind:value={formData.timeZone}
				placeholder="America/New_York"
			/>
		</label>
		<div class="w-full grid grid-cols-2 gap-4">
			<label class="label">
				<span>Preferred Language</span>
				<input
					class="input"
					type="text"
					id="preferredLanguage"
					name="preferredLanguage"
					bind:value={formData.preferredLanguage}
					placeholder="en_us"
				/>
			</label>
			<label class="label">
				<span>Announcement Language</span>
				<input
					class="input"
					type="text"
					id="announcementLanguage"
					name="announcementLanguage"
					bind:value={formData.announcementLanguage}
					placeholder="en_us"
				/>
			</label>
		</div>
		<hr />
		<label class="label">
			<span>Address</span>
			<input
				class="input"
				type="text"
				id="address1"
				name="address1"
				bind:value={formData.address['address1']}
				placeholder="8765 NE First St."
			/>
			<input
				class="input"
				type="text"
				id="address2"
				name="address2"
				bind:value={formData.address['address2']}
				placeholder="Suite 400 (optional)"
			/>
		</label>
		<div class="w-full grid grid-cols-2 gap-4">
			<label class="label">
				<span>City</span>
				<input
					class="input"
					type="text"
					id="city"
					name="city"
					bind:value={formData.address['city']}
					placeholder="East Detroit"
				/>
			</label>
			<label class="label">
				<span>State</span>
				<input
					class="input"
					type="text"
					id="state"
					name="state"
					bind:value={formData.address['state']}
					placeholder="MI"
				/>
			</label>
			<label class="label">
				<span>Postal Code</span>
				<input
					class="input"
					type="text"
					id="postalCode"
					name="postalCode"
					bind:value={formData.address['postalCode']}
					placeholder="55555"
				/>
			</label>
			<label class="label">
				<span>Country</span>
				<input
					class="input"
					type="text"
					id="country"
					name="country"
					bind:value={formData.address['country']}
					placeholder="US"
				/>
			</label>
		</div>

		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <!-- <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Upload</button> -->
		<button class="btn {parent.buttonPositive}">Add Location</button>
    </footer>
	</form>
</div>
