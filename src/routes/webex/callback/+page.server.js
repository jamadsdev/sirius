import { redirect } from '@sveltejs/kit';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';

const token_uri = 'https://webexapis.com/v1/access_token';
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = REDIRECT_URI;

export async function load({ fetch, url, locals }) {
	const code = url.searchParams.get('code');
	console.log('Code', code);
	const state = url.searchParams.get('state');
	const params = await getParams(code);

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

	fetch(`${token_uri}?${params}`, {
		method: 'POST',
		headers: myHeaders
	})
		.then((res) => res.json())
		.then(async (data) => {
			// console.log(data.access_token);
			console.log('UserId: ', locals.user['id']);
			try {
				console.log('Data', data);
				await locals.pb.collection('users').update(locals?.user['id'], {
					access: data.access_token,
					refresh: data.refresh_token
				});
			} catch (err) {
				console.log('Create Error: ', err);
			}
		});
	throw redirect(302, state);
}

function getParams(code) {
	const payload = {
		grant_type: 'authorization_code',
		client_id: client_id,
		client_secret: client_secret,
		code: code,
		redirect_uri: redirect_uri
	};
	// Parameterize
	const data = Object.keys(payload)
		.map((key) => `${key}=${encodeURIComponent(payload[key])}`)
		.join('&');

	return data;
}
