import { redirect } from '@sveltejs/kit';
import { CLIENT_ID, REDIRECT_URI } from '$env/static/private';

const target = 'https://webexapis.com/v1/authorize';
const client_id = CLIENT_ID;
const redirect_uri = REDIRECT_URI;
const scope = `spark-admin:people_read spark-admin:people_write spark-admin:workspaces_read spark-admin:workspaces_write spark-admin:organizations_read spark-admin:telephony_config_read spark-admin:telephony_config_write`;

export function load({ url }) {
	let state = '/docs/howto';
	if (url.searchParams.get('source')) {
		state = url.searchParams.get('source');
	}
	throw redirect(
		302,
		`${target}?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`
	);
}
