import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// console.log('Ran layout auth check');
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	return {
		user: locals.user
	};
};
