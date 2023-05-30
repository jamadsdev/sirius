<script>
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, Modal } from '@skeletonlabs/skeleton';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import Navbar from '$lib/components/navigation/Navbar.svelte';

	import { storeCurrentUrl } from '$lib/stores';

	export let data;

	let loggedin = false;

	if (data.user) {
		console.log('Logged In');
		loggedin = true;
	}

	afterNavigate((params) => {
		// Store current page route URL
		storeCurrentUrl.set($page.url.pathname);
		// Scroll to top
		const isNewPage = params.from && params.to && params.from.route.id !== params.to.route.id;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});

	function matchPathWhitelist(pageUrlPath) {
		// If homepage route
		if (pageUrlPath === '/' || pageUrlPath === '/login' || pageUrlPath === '/register') return true;
		// If any blog route
		if (pageUrlPath.includes('/blog')) return true;
		return false;
	}

	$: slotSidebarLeft = matchPathWhitelist($page.url.pathname)
		? 'w-0'
		: 'bg-surface-50-900-token lg:w-auto';
</script>

<Modal />

<AppShell {slotSidebarLeft}>
	<svelte:fragment slot="header"><Navbar {loggedin} /></svelte:fragment>
	<svelte:fragment slot="sidebarLeft"
		><Sidebar class="hidden lg:grid w-[360px] overflow-hidden" /></svelte:fragment
	>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>
