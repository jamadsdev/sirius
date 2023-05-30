/** @type {import('./$types').PageServerLoad} */
import { serializeNonPOJOs } from '$lib/utils';
import * as api from '$lib/wxc_api';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const fetchFiles = async () => {
		const { items } = await locals.pb.collection('uploads').getList(1, 5, {
			filter: 'service = "wxc" && type = "locations"',
			sort: '-created'
		});

		// console.log(results.items);
		let files = serializeNonPOJOs(items);
		return files;
	};

	const fetchLocations = async () => {
		const { items } = await api.get('locations', locals.user.access);
		return items;
	};

	return {
		files: fetchFiles(),
		streamed: {
			locations: fetchLocations()
		}
	};
};

export const actions = {
	addLoc: async ({ request, locals }) => {
		let data = await request.formData();

		let locData = JSON.stringify({
			name: data.get('name'),
			timeZone: data.get('timeZone'),
			preferredLanguage: data.get('preferredLanguage'),
			announcementLanguage: data.get('announcementLanguage'),
			address: {
				address1: data.get('address1'),
				address2: data.get('address2'),
				city: data.get('city'),
				state: data.get('state'),
				postalCode: data.get('postalCode'),
				country: data.get('country')
			}
		});
		const result = await api.post('locations', locData, locals.user.access);
		if (result.errors) return fail(400, result);
	}
};
