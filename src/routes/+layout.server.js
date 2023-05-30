export const load = ({ fetch, locals }) => {
	if (locals.user) {
		// console.log(locals.user);

		const fetchOrgs = async () => {
			const myHeaders = new Headers();
			myHeaders.append('Authorization', `Bearer ${locals.user.access}`);

			let url = 'https://webexapis.com/v1/organizations';
			const response = await fetch(url, {
				method: 'GET',
				headers: myHeaders
			});
			if (response.status == '200') {
				const { items } = await response.json();
				if (items.length === 1) {
					return items[0].displayName;
				} else if (items.length > 1) {
					return 'alert';
				} else {
					return undefined;
				}
			}
		};

		return {
			user: locals.user,
			orgs: fetchOrgs()
		};
	} else {
		return {
			user: undefined,
			orgs: undefined
		};
	}
};
