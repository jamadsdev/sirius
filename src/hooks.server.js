import Pocketbase from 'pocketbase';
import { ENVIRONMENT } from '$env/static/private';
import { serializeNonPOJOs } from '$lib/utils';

export const handle = async ({ event, resolve }) => {
	event.locals.pb = new Pocketbase('http://10.7.20.89:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: ENVIRONMENT === 'production',
			sameSite: 'lax',
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 4
		})
	);

	return response;
};
