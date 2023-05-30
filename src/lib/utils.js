import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';

const token_uri = 'https://webexapis.com/v1/access_token';
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const refreshToken = async (token) => {
	const params = await getParams(token);

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

	const results = await fetch(`${token_uri}?${params}`, {
		method: 'POST',
		headers: myHeaders
	});
	const newTokens = await results.json();
	return newTokens;
};

function getParams(token) {
	const payload = {
		grant_type: 'refresh_token',
		client_id: client_id,
		client_secret: client_secret,
		refresh_token: token
	};
	// Parameterize
	const data = Object.keys(payload)
		.map((key, index) => `${key}=${encodeURIComponent(payload[key])}`)
		.join('&');

	return data;
}
