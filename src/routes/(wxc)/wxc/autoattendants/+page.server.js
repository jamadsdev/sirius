/** @type {import('./$types').PageServerLoad} */
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	const { items } = await locals.pb.collection('uploads').getList(1, 5, {
		sort: '-created'
	});
	// console.log(results.items);
	let files = serializeNonPOJOs(items);
	return { files };
};

export const actions = {
	upload: async ({ request, locals }) => {
		let data = await request.formData();
		console.log('Data', data);
		data.append('userId', locals?.user?.id);
		data.append('service', 'wxc');

		try {
			await locals.pb.collection('uploads').create(data);
			// const record = await locals.pb.collection('uploads').getOne(id);
			// const firstFilename = record.document;
			// const url = await locals.pb.getFileUrl(record, firstFilename);
			// console.log('URL: ', url);

			// locals.user.wxcFileUrl = url;
			// locals.user.jobName = description;
		} catch (err) {
			console.log('Error: ', err);
			throw error(400, 'Someting went wrong with the file upload');
		}

		return {
			success: true
		};
	}
};
