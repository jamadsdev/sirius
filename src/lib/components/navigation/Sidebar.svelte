<script>
	import { AppRail, AppRailTile, filter } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import Icon from '$lib/components/icon/Icon.svelte';

	import { menuLinks } from './links';

	// Stores
	import { storeCurrentUrl } from '$lib/stores';

	// Local
	const categoryValue = writable('docs');
	let filteredMenu = menuLinks;

	// Filter Links
	function setCategory(c) {
		categoryValue.set(c);
		switch ($categoryValue) {
			case 'docs':
				filteredMenu = menuLinks.filter((linkSet) => linkSet.id === 'docs');
				break;
			case 'wxc':
				filteredMenu = menuLinks.filter((linkSet) =>
					['wxc_admin', 'wxc_userpref'].includes(linkSet.id)
				);
				break;
			case 'wxcc':
				filteredMenu = menuLinks.filter((linkSet) => linkSet.id === 'wxcc');
				break;
			case 'ooobot':
				filteredMenu = menuLinks.filter((linkSet) => linkSet.id === 'ooobot');
				break;
		}
	}

	page.subscribe((p) => {
		let pathMatch = p.url.pathname.split('/')[1];
		if (!pathMatch) return;
		// if (['components', 'actions'].includes(pathMatch)) pathMatch = 'svelte';
		setCategory(pathMatch);
	});
	categoryValue.subscribe((c) => setCategory(c));

	// Reactive
	$: classesActive = (href) => ($storeCurrentUrl?.includes(href) ? 'bg-primary-active-token' : '');
</script>

<div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ??
		''}"
>
	<AppRail
		selected={categoryValue}
		background="bg-transparent"
		border="border-r border-surface-500/30"
		width="w-[96px]"
	>
		<AppRailTile label="Docs" title="Docs" value={'docs'}
			><Icon name="book-open" width="2em" height="2em" /></AppRailTile
		>
		<hr class="opacity-30" />
		<AppRailTile label="Webex Calling" value={'wxc'}>
			<Icon name="phone-call" width="2em" height="2em" />
		</AppRailTile>
		<AppRailTile label="Webex Contact Center" value={'wxcc'}>
			<Icon name="headphones" width="2em" height="2em" />
		</AppRailTile>
		<AppRailTile label="Out of Office Bot" value={'ooobot'}>
			<Icon name="terminal" width="2em" height="2em" />
		</AppRailTile>
	</AppRail>
	<section class="p-4 pb-20 space-y-4 overflow-y-auto">
		{#each filteredMenu as { id, title, list }, i}
			{#if list.length > 0}
				<!-- Title -->
				<div {id} class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">
					{title}
				</div>
				<!-- Navigation List -->
				<nav class="list-nav">
					<ul>
						{#each list as { href, label, badge }}
							<li>
								<a {href} class={classesActive(href)}>
									<span class="flex-auto">{@html label}</span>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				<!-- Divider -->
				{#if i + 1 < filteredMenu.length}<hr class="!my-6 opacity-50" />{/if}
			{/if}
		{/each}
	</section>
</div>
