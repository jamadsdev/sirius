/** @type {import('./$types').PageServerLoad} */
import * as api from '$lib/wxc_api';
// import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const fetchUsers = async () => {
		const { items } = await api.get('people?callingData=true', locals.user.access);
		console.log('Users', items);
		return items;
	};

	return {
		streamed: {
			users: fetchUsers()
		}
	};
};
