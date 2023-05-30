<script>
	import { AppBar, Avatar, popup, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	// Components
	import Icon from '$lib/components/icon/Icon.svelte';

	export let loggedin;

	let avatarMenu = {
		event: 'click',
		target: 'avatarMenu',
		placement: 'bottom',
		closeQuery: '.listbox-item'
		// state: (e: any) => console.log('tooltip', e)
	};
	let avatarValue;
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="btn btn-sm">
			<span><Icon name="coffee" height="2em" width="2em" /></span>
			<span class="pl-2 text-xl uppercase font-bold">UCLabs</span>
		</a>
	</svelte:fragment>
	<!-- Trailing Slot -->
	<svelte:fragment slot="trail">
		<!-- {#if !data.user} -->
		{#if !loggedin}
			<a href="/register" class="btn btn-sm variant-ghost-surface">
				<span><Icon name="edit-3" height="1em" width="2em" /></span>
				<span>Register</span>
			</a>
			<a href="/login" class="btn btn-sm variant-ghost-surface">
				<span><Icon name="log-in" height="1em" width="2em" /></span>
				<span>Login</span>
			</a>
		{:else}
			<!-- <h3>Welcome, {user?.fname}</h3> -->
			<a href="/settings" class="btn btn-sm variant-ghost-surface">
				<span><Icon name="settings" height="1em" width="2em" /></span>
				<span>Settings</span>
			</a>
			<form action="/logout" method="post">
				<button class="btn btn-sm variant-ghost-surface">
					<span><Icon name="log-out" height="1em" width="2em" /></span>
					<span>Logout</span>
				</button>
			</form>
		{/if}
	</svelte:fragment>
</AppBar>
